import { NextResponse } from "next/server";

const allowedFields = ["name", "contact", "business", "locations", "message", "consent", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export async function POST(request: Request) {
  const endpoint = process.env.JOOBBY_LEAD_ENDPOINT;
  if (!endpoint) return NextResponse.json({ error: "Lead endpoint is not configured" }, { status: 503 });

  let input: Record<string, unknown>;
  try { input = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  if (!input.contact || !input.business || !input.locations || input.consent !== "on") return NextResponse.json({ error: "Required fields missing" }, { status: 422 });

  const payload = Object.fromEntries(allowedFields.filter((key) => key in input).map((key) => [key, input[key]]));
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", ...(process.env.JOOBBY_LEAD_API_KEY ? { authorization: `Bearer ${process.env.JOOBBY_LEAD_API_KEY}` } : {}) },
    body: JSON.stringify(payload),
    cache: "no-store"
  });
  if (!response.ok) return NextResponse.json({ error: "Upstream rejected request" }, { status: response.status === 429 ? 429 : 502 });
  return NextResponse.json({ ok: true });
}
