// Local stand-in for the n8n workflow, for testing /api/ask without touching a real n8n server.
//
// It does NOT re-implement the workflow: it loads n8n/ask-portfolio.workflow.json and runs the
// workflow's own Config values and Code-node sources (Validate, Build request, Shape response), so a
// change to the workflow is exercised here too. Only the webhook plumbing and the Header Auth check
// are emulated.
//
//   N8N_ASK_SECRET=test-secret node scripts/mock-n8n.mjs
//   GEMINI_API_KEY=... N8N_ASK_SECRET=test-secret node scripts/mock-n8n.mjs   (real Gemini calls)
//   MOCK_GEMINI_FAIL=1 ...                                                    (simulate an outage)
//
// Then point the app at it: N8N_ASK_URL=http://localhost:5678/webhook/ask-portfolio

import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const workflow = JSON.parse(
  readFileSync(new URL("../n8n/ask-portfolio.workflow.json", import.meta.url), "utf8"),
);
const node = (name) => workflow.nodes.find((n) => n.name === name);

const config = Object.fromEntries(
  node("Config").parameters.assignments.assignments.map((a) => [a.name, a.value]),
);
const sources = {
  validate: node("Validate").parameters.jsCode,
  build: node("Build request").parameters.jsCode,
  shape: node("Shape response").parameters.jsCode,
};

// Runs a Code node source the way n8n does: `$('Config')` and `$input.first().json`.
function runCode(source, input) {
  const $ = (name) => {
    if (name !== "Config") throw new Error("mock only knows the Config node");
    return { first: () => ({ json: config }) };
  };
  const $input = { first: () => ({ json: input }) };
  return new Function("$", "$input", `return (function () {\n${source}\n})();`)($, $input)[0].json;
}

const secret = process.env.N8N_ASK_SECRET;
const geminiKey = process.env.GEMINI_API_KEY;
const port = Number(process.env.MOCK_N8N_PORT ?? 5678);

async function callGemini(body) {
  if (process.env.MOCK_GEMINI_FAIL) throw new Error("simulated outage");
  if (!geminiKey) {
    return {
      candidates: [{ content: { parts: [{ text: "Mock reply: no GEMINI_API_KEY was set." }] } }],
    };
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  return res.json();
}

const send = (res, status, json) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(json));
};

createServer(async (req, res) => {
  if (req.method !== "POST" || req.url !== "/webhook/ask-portfolio") return send(res, 404, {});
  // n8n's Header Auth credential rejects a missing or wrong value with 403.
  if (!secret || req.headers["x-portfolio-secret"] !== secret) {
    return send(res, 403, { message: "Authorization data is wrong!" });
  }
  let raw = "";
  for await (const chunk of req) raw += chunk;
  let body = {};
  try {
    body = JSON.parse(raw);
  } catch {}

  const started = Date.now();
  const checked = runCode(sources.validate, { body });
  if (!checked.valid) return send(res, 400, { error: checked.error });

  const built = runCode(sources.build, checked);
  try {
    const data = await callGemini(built.body);
    const shaped = runCode(sources.shape, data);
    res.setHeader("X-Mock-Ms", String(Date.now() - started));
    return send(res, 200, { reply: shaped.reply });
  } catch {
    return send(res, 502, { error: "Sorry, I couldn't answer that just now." });
  }
}).listen(port, () => {
  console.log(`mock n8n on :${port} (${geminiKey ? "real Gemini" : "canned replies"}, model ${config.model})`);
});
