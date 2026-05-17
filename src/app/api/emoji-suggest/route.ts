import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY!
);

export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ emojis: [] });

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
  const result = await model.generateContent(
    `Given the transaction name: "${name}", suggest 5 relevant emojis. Reply with ONLY the 5 emojis separated by spaces, nothing else. No words, no punctuation, just emojis.`
  );
  const text = result.response.text().trim();
  const emojis = [...new Intl.Segmenter().segment(text)]
    .map((s) => s.segment)
    .filter((s) => /\p{Emoji}/u.test(s) && s !== " ")
    .slice(0, 5);

  return NextResponse.json({ emojis });
}
