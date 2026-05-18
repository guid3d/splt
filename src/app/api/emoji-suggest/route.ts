import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!
);

// In-memory store: IP → { request count, window expiry }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // max requests per IP per window
const WINDOW_MS = 60_000; // 1 minute

// Returns true if IP has exceeded the rate limit. Prunes expired entries on each call.
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  for (const [key, val] of rateLimitMap) {
    if (now > val.resetAt) rateLimitMap.delete(key);
  }
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  let name: unknown;
  try {
    ({ name } = await req.json());
  } catch {
    return NextResponse.json({ emojis: [] });
  }

  if (!String(name ?? "").trim()) return NextResponse.json({ emojis: [] });

  // Sanitize: cap length and strip quote chars to prevent prompt injection
  const safeName = String(name).trim().slice(0, 100).replace(/["\\`]/g, "");
  if (!safeName) return NextResponse.json({ emojis: [] });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    const result = await model.generateContent(
      `Given the transaction name: "${safeName}", suggest 5 relevant emojis. Reply with ONLY the 5 emojis separated by spaces, nothing else. No words, no punctuation, just emojis.`
    );
    const text = result.response.text().trim();
    // Segment by grapheme cluster so multi-codepoint emojis (e.g. 👨‍👩‍👧) aren't split,
    // then keep only pictographic emojis (excludes digits/punctuation that match \p{Emoji})
    const emojis = [...new Intl.Segmenter().segment(text)]
      .map((s) => s.segment)
      .filter((s) => /\p{Extended_Pictographic}/u.test(s))
      .slice(0, 5);

    return NextResponse.json({ emojis });
  } catch {
    return NextResponse.json({ emojis: [] });
  }
}
