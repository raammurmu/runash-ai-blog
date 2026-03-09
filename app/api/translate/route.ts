import { NextResponse } from "next/server"

const TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"
const MAX_CHUNK = 1800

type TranslateBody = {
  text?: string
  texts?: string[]
  source?: string
  target?: string
}

const EN_HI_FALLBACK_DICTIONARY: Record<string, string> = {
  hello: "नमस्ते",
  hi: "नमस्ते",
  the: "यह",
  new: "नया",
  era: "युग",
  of: "का",
  social: "सोशल",
  selling: "बिक्री",
  what: "क्या",
  to: "करने",
  expect: "उम्मीद",
  in: "में",
  beta: "बीटा",
  why: "क्यों",
  we: "हम",
  are: "हैं",
  building: "बना रहे",
  this: "इसे",
  article: "लेख",
  product: "उत्पाद",
  launch: "लॉन्च",
  platform: "प्लेटफ़ॉर्म",
  author: "लेखक",
  read: "पढ़ें",
  time: "समय",
  and: "और",
  for: "के लिए",
  your: "आपका",
  with: "के साथ",
  ai: "एआई",
  live: "लाइव",
  video: "वीडियो",
  business: "व्यवसाय",
  users: "उपयोगकर्ता",
}

function splitIntoChunks(text: string, maxLength: number) {
  const sentences = text.split(/(?<=[.!?])\s+/)
  const chunks: string[] = []
  let current = ""

  for (const sentence of sentences) {
    if (!sentence) continue
    const candidate = current ? `${current} ${sentence}` : sentence
    if (candidate.length <= maxLength) {
      current = candidate
      continue
    }

    if (current) chunks.push(current)

    if (sentence.length <= maxLength) {
      current = sentence
    } else {
      for (let i = 0; i < sentence.length; i += maxLength) {
        chunks.push(sentence.slice(i, i + maxLength))
      }
      current = ""
    }
  }

  if (current) chunks.push(current)
  return chunks.length ? chunks : [text]
}

function fallbackTranslateEnToHi(text: string) {
  return text
    .split(/(\b)/)
    .map((token) => {
      const key = token.toLowerCase()
      return EN_HI_FALLBACK_DICTIONARY[key] ?? token
    })
    .join("")
}

async function translateChunk(chunk: string, source: string, target: string) {
  const params = new URLSearchParams({
    client: "gtx",
    sl: source,
    tl: target,
    dt: "t",
    q: chunk,
  })

  const response = await fetch(`${TRANSLATE_URL}?${params.toString()}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Translation request failed")
  }

  const data = (await response.json()) as unknown
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Translation response format invalid")
  }

  return (data[0] as unknown[])
    .map((part) => (Array.isArray(part) ? String(part[0] ?? "") : ""))
    .join("")
}

async function translateText(text: string, source: string, target: string) {
  const chunks = splitIntoChunks(text, MAX_CHUNK)
  const translated = await Promise.all(
    chunks.map(async (chunk) => {
      try {
        return await translateChunk(chunk, source, target)
      } catch {
        if (source === "en" && target === "hi") {
          return fallbackTranslateEnToHi(chunk)
        }
        return chunk
      }
    }),
  )

  return translated.join(" ")
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateBody
    const source = (body.source || "en").trim()
    const target = (body.target || "hi").trim()

    if (Array.isArray(body.texts) && body.texts.length) {
      const translatedTexts = await Promise.all(body.texts.map((item) => translateText(item.trim(), source, target)))
      return NextResponse.json({ translatedTexts })
    }

    const text = body.text?.trim()
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const translatedText = await translateText(text, source, target)
    return NextResponse.json({ translatedText })
  } catch {
    return NextResponse.json({ error: "Unable to translate text" }, { status: 502 })
  }
}
