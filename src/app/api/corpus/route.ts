import { timingSafeEqual } from "node:crypto";
import { buildChunks, buildProfile } from "@/lib/corpus";

// GET /api/corpus: the site content as small chunks, for the n8n ingest workflow to load into its
// vector store. Guarded by the same shared secret as the n8n webhook (X-Portfolio-Secret), so it is
// not a public scraping endpoint. The content is already public on the site; this just keeps the
// vector store in step with the data module instead of a pasted copy.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "no-store" };

function secretMatches(provided: string | null, expected: string) {
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(request: Request) {
  const secret = process.env.N8N_ASK_SECRET;
  if (!secret) return new Response(null, { status: 404, headers: noStore });
  if (!secretMatches(request.headers.get("x-portfolio-secret"), secret)) {
    return new Response(null, { status: 403, headers: noStore });
  }
  const chunks = buildChunks();
  return Response.json(
    { count: chunks.length, profile: buildProfile(), chunks },
    { headers: noStore },
  );
}
