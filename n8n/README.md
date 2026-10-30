# "Ask my portfolio": n8n workflow

`ask-portfolio.workflow.json` is the n8n side of the chat. The flow is:

```
Browser widget -> /api/ask (Next.js) -> n8n webhook -> Gemini API
                  limits, secret,        rules +        answer
                  site content           the call
```

The browser only talks to `/api/ask`. That route does the cheap checks (size, shape, rate limits,
bot challenge, kill switch), adds the site content as a plain-text corpus, and forwards to n8n with
the header `X-Portfolio-Secret`. The workflow holds the assistant's rules and the Gemini call. The
content lives in the repo (`src/data/portfolio.ts` and `src/data/resume.ts`), not in n8n, so it
cannot drift from the page.

This is an AI assistant that knows my work. The content is small, so all of it is put into every
prompt. That is context stuffing, not RAG.

## What the workflow does

| Node | Purpose |
|---|---|
| Webhook | `POST /webhook/ask-portfolio`, Header Auth, responds through the Respond to Webhook nodes |
| Config | The only place to change the model name and limits |
| Validate | Checks the messages (at most 6, roles `user` and `model`, last message from the user and at most 500 characters), the total size, and that the corpus is present and under 60,000 characters |
| Valid? | Branches: invalid goes to `Respond 400` |
| Build request | The assistant's rules plus the corpus as `systemInstruction`, history as Gemini `contents` |
| Gemini call | HTTP Request to `generateContent`, 25 s timeout, error output enabled |
| Shape response | Pulls out the text. Empty, blocked or cut-off answers become a short fallback with my email |
| Respond 200 / 502 | `{ reply }` on success, a friendly `{ error }` if the Gemini call fails |

Workflow settings: timeout 30 s, successful executions are not saved, failed executions are not
saved either (they would contain visitor questions), manual test runs are not saved.

**Why an HTTP Request node instead of the native Google Gemini node:** I need a system instruction,
multi-turn history, `generationConfig`, and control over the failure branch, and the HTTP node gives
all of that the same way across n8n versions. The API key is a credential, never part of the JSON.

## Setup (about 10 minutes)

You only need the n8n editor in the browser. No server access is needed.

1. **Gemini key.** Create an API key in Google AI Studio, ideally in a project used only for this.
2. **Two credentials in n8n** (Credentials, Create credential, "Header Auth"):
   - `Portfolio ask secret`: Name `X-Portfolio-Secret`, Value a long random string (for example
     64 hex characters). Keep a copy; the same value goes into Vercel.
   - `Gemini API key`: Name `x-goog-api-key`, Value the key from step 1.
3. **Import** `ask-portfolio.workflow.json` (Workflows, the three-dot menu, Import from file).
4. **Attach credentials.** Open `Webhook` and choose `Portfolio ask secret`. Open `Gemini call` and
   choose `Gemini API key` (Authentication is already set to Header Auth).
5. **Check the settings** (workflow Settings): Save successful production executions = Do not save,
   Timeout = 30 s. They are in the JSON, but confirm after import.
6. **Activate** the workflow. Copy the **Production** URL from the Webhook node. It ends in
   `/webhook/ask-portfolio`. The Test URL (`/webhook-test/...`) will not work for the site.
7. **Vercel environment variables** (Project, Settings, Environment Variables):
   `N8N_ASK_URL` (the production URL), `N8N_ASK_SECRET` (the same random string), `ASK_ENABLED=true`.
   Optional: `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` from a Cloudflare Turnstile
   widget, and the Redis variables from Vercel's Upstash Redis integration for rate limiting.
8. Redeploy, then run the checks below.

## Places most likely to need a small fix after import

I could not test this against your n8n instance (1.120.4), so these are the likeliest spots:

- **Credentials not attached.** Import leaves the two credential slots empty; the nodes show a red
  warning until you pick them.
- **Webhook node.** If Header Auth is not offered or the node shows a version mismatch, delete it,
  add a fresh Webhook (POST, path `ask-portfolio`, Authentication Header Auth, Respond: "Using
  'Respond to Webhook' node") and reconnect it to `Config`.
- **Gemini call.** If you get a 400 or 404, open the node: the URL uses
  `$('Config').first().json.model`, so check the model name in `Config`. If you get an auth error,
  the credential name must be `x-goog-api-key`.
- **Set node (`Config`).** If the numbers show as text, set their type to Number.
- **Respond to Webhook.** If the JSON body comes back as `[object Object]`, switch "Respond With"
  to JSON and keep the expression as is.
- **Empty answers.** The Flash-Lite models can spend tokens on reasoning before they write. The
  output cap is 800 so there is headroom. If you still get the fallback message on every question,
  raise `maxOutputTokens` in `Config` or add a `thinkingConfig` to `generationConfig` in `Build
  request` (the setting differs between model generations; check ai.google.dev for your model).
- **Model name.** `gemini-3.1-flash-lite` is a current stable Flash-tier model. Change it in `Config`
  only.

## Privacy

- n8n is self-hosted by someone else. Visitor questions and answers pass through that server, and
  whoever runs it can read its database, logs and credentials. Saving of executions is off in the
  workflow, but a reverse proxy in front could still log requests. Tell visitors not to enter
  personal information (the widget does) and use a Gemini key that exists only for this.
- Google's free tier: Google may use prompts and responses to improve its products, and human
  reviewers may read them. The widget note says so in short. A paid tier changes this.

## Local testing without n8n

`scripts/mock-n8n.mjs` loads this JSON and runs its real Code-node logic, so you can test the whole
chain locally:

```
N8N_ASK_SECRET=test-secret node scripts/mock-n8n.mjs                     # canned replies
GEMINI_API_KEY=... N8N_ASK_SECRET=test-secret node scripts/mock-n8n.mjs  # real Gemini
```

Then run the app with `ASK_ENABLED=true`, `N8N_ASK_URL=http://localhost:5678/webhook/ask-portfolio`,
`N8N_ASK_SECRET=test-secret`, `ASK_IP_LIMIT=1000`, and run `node scripts/ask-test.mjs
http://localhost:3000` for the question list.

## Testing from the Windows terminal (PowerShell)

The `VAR=value command` form above is for bash. In PowerShell, set variables with `$env:NAME` first.
They only last for that terminal window. Run each block from the project folder, in its own window.

**Window 1: the n8n stand-in** (prompts for your Gemini key so it does not land in your history):

```powershell
$env:N8N_ASK_SECRET = "test-secret"; $env:GEMINI_API_KEY = Read-Host "Gemini API key"; node scripts/mock-n8n.mjs
```

Leave `GEMINI_API_KEY` out (`$env:GEMINI_API_KEY = ""`) to get canned replies instead of real Gemini.

**Window 2: the app** (port 3200 so it does not clash with another dev server):

```powershell
$env:ASK_ENABLED = "true"; $env:N8N_ASK_URL = "http://localhost:5678/webhook/ask-portfolio"; $env:N8N_ASK_SECRET = "test-secret"; $env:ASK_IP_LIMIT = "1000"; $env:ASK_DAILY_CAP = "1000"; npm run dev -- -p 3200
```

**Window 3: the 15 questions:**

```powershell
node scripts/ask-test.mjs http://localhost:3200
```

When you are done, close the windows, or clear the key: `Remove-Item Env:GEMINI_API_KEY`.

**Quickest way to test the n8n webhook:** `scripts/test-webhook.ps1` runs six checks in one go (no secret and a wrong secret are refused, three bad inputs get a 400, a valid request gets a 200 with a reply). Activate the workflow first and use the Production URL:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\test-webhook.ps1 -Url "https://YOUR-N8N-HOST/webhook/ask-portfolio"
```

It asks for the secret. `-ExecutionPolicy Bypass` only applies to that one run.

**Test the n8n workflow on its own** (click "Listen for test event" on the Webhook node first, and use
the Test URL, which ends in `/webhook-test/ask-portfolio`). `curl` in Windows PowerShell is an alias
for something else, so use `Invoke-RestMethod`:

```powershell
$url = "https://YOUR-N8N-HOST/webhook-test/ask-portfolio"; $body = @{ messages = @(@{ role = "user"; content = "Where have you worked?" }); corpus = ("x" * 300) } | ConvertTo-Json -Depth 5; Invoke-RestMethod -Method Post -Uri $url -Headers @{ "X-Portfolio-Secret" = "YOUR-SECRET" } -ContentType "application/json" -Body $body
```

The same request without the secret should be refused. This prints the status code (expect 403):

```powershell
try { Invoke-RestMethod -Method Post -Uri $url -ContentType "application/json" -Body $body } catch { $_.Exception.Response.StatusCode.value__ }
```

**Check a deployed site** (a Vercel preview or production). Expect 200, or 503 if the kill switch is off:

```powershell
try { (Invoke-WebRequest -Uri "https://YOUR-SITE/api/ask" -UseBasicParsing).StatusCode } catch { $_.Exception.Response.StatusCode.value__ }
```

Run the question list against it with `node scripts/ask-test.mjs https://YOUR-SITE`. The real limit is
10 messages per 10 minutes per visitor, so raise `ASK_IP_LIMIT` on the preview deployment while testing.

## Agent + RAG variant (`ask-portfolio-agent.workflow.json`)

An alternative to the single Gemini call. An n8n **AI Agent** answers from a short profile plus a
**vector store tool** it searches for details. Use it as a learning build, or if the content grows a lot.
For today's content size the plain workflow above is simpler, cheaper and usually more accurate (it sees
everything at once; retrieval can miss pieces). I could not test the agent workflow on your n8n, and the
vector-store behaviour below is unverified.

```
Webhook -> Config -> Validate -> Valid? -> Build prompt -> AI Agent -> Shape response -> Respond 200
                                     |                       |  (error output) -> Respond 502
                                     +-> Respond 400         +- Google Gemini Chat Model
                                                             +- Portfolio search (vector store tool)
                                                                  +- Embeddings Google Gemini
```

What changes:

- The site sends only a ~1.7 KB `profile` instead of the full 14 KB `corpus`. Set `ASK_MODE=agent` in Vercel.
  (Default is `stuffing`, which is what `ask-portfolio.workflow.json` expects.)
- `Validate` requires `profile`, not `corpus`. Everything else about the request is the same.
- The agent is stateless: the site already sends the conversation, and `Build prompt` folds it into the
  prompt. There is no Simple Memory node (the docs say it does not work in n8n queue mode).
- Each question costs about 3 to 4 Gemini API calls (embedding + 2 to 3 model calls) instead of 1. Lower
  `ASK_DAILY_CAP` to roughly a quarter of what you had.

### Setup

1. **Credential:** the Gemini sub-nodes use a different credential type from the HTTP node: **Google Gemini
   (PaLM) API**. Create it with the same AI Studio key. Keep the `Portfolio ask secret` Header Auth
   credential for the Webhook.
2. **Import** `ask-portfolio-agent.workflow.json`. Attach `Portfolio ask secret` to `Webhook`, and the
   Gemini credential to `Google Gemini Chat Model` and `Embeddings Google Gemini`.
3. **Fill the vector store** (the ingest step, below). Without it the tool finds nothing and the agent will
   say it does not know.
4. Set `ASK_MODE=agent` and redeploy. Test with
   `scripts/test-webhook.ps1 -Url ... -Mode agent` (the dummy content means the reply will be vague; the
   checks still prove the secret, validation and the agent run end to end).

If you run both workflows, they use the same webhook path, so keep only one **active** at a time.

### Ingest by hand (no ingest workflow is generated)

Build a second workflow, "Ask my portfolio (ingest)", and run it once, and again whenever the content changes.

1. **Manual Trigger.**
2. **HTTP Request**, GET `https://YOUR-SITE/api/corpus`, Authentication Header Auth with the
   `Portfolio ask secret` credential. The endpoint returns `{ count, profile, chunks: [{ id, type, title, text }] }`
   (30 chunks, each under 800 characters, each starting with its own title). It returns 403 without the
   secret and 404 if `N8N_ASK_SECRET` is not set on the site. The site must be deployed for this to work.
3. **Code**, to turn the chunks into one item each:
   ```js
   const chunks = $input.first().json.chunks || [];
   if (!chunks.length) throw new Error('No chunks returned. Check the URL and the secret.');
   return chunks.map((c) => ({ json: { id: c.id, type: c.type, title: c.title, text: c.text } }));
   ```
4. **Simple Vector Store**, Operation "Insert Documents", Memory Key `ask-portfolio`, **Clear Store** on.
   Attach **Embeddings Google Gemini** (the same model as in the agent workflow) and a
   **Default Data Loader** (Type of Data: JSON, Mode: Load Specific Data, Data: `{{ $json.text }}`; add
   metadata `title` = `{{ $json.title }}` and `type` = `{{ $json.type }}`). The chunks are already small, so
   no extra text splitter is needed.
5. Click **Execute workflow**. Expect 30 items inserted.

I could not read the Simple Vector Store docs page. I believe it keeps data in n8n's memory, so a restart of
your friend's server empties it and the agent quietly loses its knowledge. Add a **Schedule Trigger** (daily)
to the ingest workflow and keep it active, or use a persistent store (Supabase, Pinecone) instead.

### If an imported node shows an error

Delete it, add it fresh from the node panel with these settings, and reconnect it to the same neighbours.

| Node | Settings |
|---|---|
| AI Agent | Source for Prompt: Define below, Prompt `{{ $json.chatInput }}`; Options: System Message `{{ $json.systemMessage }}`, Max Iterations 3; On Error: continue (using error output) |
| Google Gemini Chat Model | Model `gemini-3.1-flash-lite`, Temperature 0.3, Max Tokens 800 (connected to the agent's Chat Model input) |
| Portfolio search | Simple Vector Store, Operation "Retrieve Documents (As Tool for AI Agent)", Name `portfolio_search`, a description of what it searches, Memory Key `ask-portfolio`, Limit 4 (connected to the agent's Tool input) |
| Embeddings Google Gemini | Same model as the ingest workflow (connected to the vector store) |

### Test with n8n's own chat

Duplicate the workflow, add a **Chat Trigger** and a Code node that outputs
`{ body: { messages: [{ role: 'user', content: $json.chatInput }], profile: '<paste the profile here>' } }`
into `Config`. Run a few questions and read `AI Agent` and `Shape response` on the canvas. The profile text
is the `profile` field returned by `/api/corpus`.
