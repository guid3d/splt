import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!
);

const RATE_LIMIT = 20; // max requests per IP per window
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(RATE_LIMIT, "60 s"),
  prefix: "emoji-suggest",
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
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
