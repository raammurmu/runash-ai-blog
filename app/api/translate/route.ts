import { NextResponse } from "next/server"

const TRANSLATE_URL = "https://translate.googleapis.com/translate_a/single"
const MAX_CHUNK = 1800

type TranslateBody = {
  text?: string
  source?: string
  target?: string
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as TranslateBody
    const text = body.text?.trim()
    const source = (body.source || "en").trim()
    const target = (body.target || "hi").trim()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const chunks = splitIntoChunks(text, MAX_CHUNK)
    const translated = await Promise.all(chunks.map((chunk) => translateChunk(chunk, source, target)))

    return NextResponse.json({ translatedText: translated.join(" ") })
  } catch {
    return NextResponse.json({ error: "Unable to translate text" }, { status: 502 })
  }
}
