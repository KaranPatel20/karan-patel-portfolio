<#
Tests the n8n "Ask my portfolio" webhook directly from a Windows terminal.

  powershell -ExecutionPolicy Bypass -File .\scripts\test-webhook.ps1 -Url "https://YOUR-N8N-HOST/webhook/ask-portfolio"

It asks for the X-Portfolio-Secret value (or pass -Secret). Use the PRODUCTION URL (/webhook/...) once the
workflow is active: the Test URL (/webhook-test/...) only answers one request per "Listen for test event"
click, so these six checks would need six clicks. Needs Windows PowerShell 5.1 or PowerShell 7.

Use -Mode agent for the AI agent workflow (ask-portfolio-agent.workflow.json). It expects a short "profile"
instead of the full "corpus". With dummy filler the agent has nothing real to search, so its reply will be
vague; the checks still prove the secret, validation and the agent run end to end. Default is -Mode stuffing.

Checks: no secret and a wrong secret are refused, bad input gets a 400, a valid request gets a 200 with a
reply. The corpus sent is dummy filler, so Gemini will say it has no information; that still proves the
whole chain works (secret, validation, Gemini call, response).
#>
param(
  [Parameter(Mandatory = $true)][string]$Url,
  [string]$Secret,
  [ValidateSet("stuffing", "agent")][string]$Mode = "stuffing"
)

if (-not $Secret) {
  $secure = Read-Host "X-Portfolio-Secret" -AsSecureString
  $Secret = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
}

function Send($Headers, $Payload) {
  $body = $Payload | ConvertTo-Json -Depth 6
  $watch = [Diagnostics.Stopwatch]::StartNew()
  try {
    $r = Invoke-WebRequest -Method Post -Uri $Url -Headers $Headers -ContentType "application/json" `
      -Body $body -UseBasicParsing -TimeoutSec 40
    return @{ Status = [int]$r.StatusCode; Body = $r.Content; Ms = $watch.ElapsedMilliseconds }
  } catch {
    $status = 0
    if ($_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
    $text = if ($_.ErrorDetails -and $_.ErrorDetails.Message) { $_.ErrorDetails.Message } else { $_.Exception.Message }
    return @{ Status = $status; Body = $text; Ms = $watch.ElapsedMilliseconds }
  }
}

$corpus = "Karan Patel is a Data Analyst and Software Developer. " * 8   # dummy filler, over 200 characters
$contentKey = if ($Mode -eq "agent") { "profile" } else { "corpus" }
# Body for a request: the messages plus the content field this workflow expects.
function Body($Messages, $WithContent = $true) {
  $b = @{ messages = $Messages }
  if ($WithContent) { $b[$contentKey] = $corpus }
  return $b
}
$ok = @{ "X-Portfolio-Secret" = $Secret }
$user = @{ role = "user"; content = "Where have you worked?" }
$results = @()

function Check($Name, $Expected, $Result) {
  $pass = ($Result.Status -eq $Expected)
  $script:results += $pass
  $colour = if ($pass) { "Green" } else { "Red" }
  $label = if ($pass) { "PASS" } else { "FAIL" }
  Write-Host ("{0}  {1}  (expected {2}, got {3}, {4} ms)" -f $label, $Name, $Expected, $Result.Status, $Result.Ms) -ForegroundColor $colour
  if (-not $pass) { Write-Host ("      " + $Result.Body.Substring(0, [Math]::Min(200, $Result.Body.Length))) }
}

Write-Host "Testing $Url (mode: $Mode)`n"

Check "no secret is refused" 403 (Send @{} (Body @($user)))
Check "wrong secret is refused" 403 (Send @{ "X-Portfolio-Secret" = "wrong-secret" } (Body @($user)))
Check "question over 500 characters gets a 400" 400 (Send $ok (Body @(@{ role = "user"; content = ("x" * 501) })))
Check "missing $contentKey gets a 400" 400 (Send $ok (Body @($user) $false))
Check "role 'assistant' gets a 400 (n8n expects 'model')" 400 (Send $ok (Body @(@{ role = "assistant"; content = "hi" })))

$valid = Send $ok (Body @($user))
Check "valid request gets a 200" 200 $valid
if ($valid.Status -eq 200) {
  try {
    $reply = ($valid.Body | ConvertFrom-Json).reply
    Write-Host "`nReply:`n  $reply"
    Write-Host "Response time: $($valid.Ms) ms"
  } catch { Write-Host "`nThe 200 response was not JSON with a reply field: $($valid.Body)" -ForegroundColor Yellow }
}

$passed = ($results | Where-Object { $_ }).Count
Write-Host "`n$passed/$($results.Count) passed"
if ($passed -ne $results.Count) { exit 1 }
