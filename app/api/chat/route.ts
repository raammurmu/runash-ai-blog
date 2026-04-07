import { NextResponse } from "next/server"
import { z } from "zod"

const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(5000),
})

const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(50),
})

type AssistantPayload = {
  answer: string
  sourceUrl: string | null
  sourceTitle: string | null
  error?: string
}

function safeAssistantResponse(payload: Partial<AssistantPayload>): AssistantPayload {
  return {
    answer: payload.answer ?? "Sorry, I couldn't process that request right now.",
    sourceUrl: payload.sourceUrl ?? null,
    sourceTitle: payload.sourceTitle ?? null,
    ...(payload.error ? { error: payload.error } : {}),
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = chatRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        safeAssistantResponse({
          answer: "Please send a valid message so I can help.",
          error: "Invalid request payload",
        }),
        { status: 400 },
      )
    }

    const latestUserMessage = [...parsed.data.messages]
      .reverse()
      .find((message) => message.role === "user")

    if (!latestUserMessage) {
      return NextResponse.json(
        safeAssistantResponse({
          answer: "Please ask a question to start the chat.",
          error: "No user message provided",
        }),
        { status: 400 },
      )
    }

    const answer = `You asked: ${latestUserMessage.content}`

    return NextResponse.json(
      safeAssistantResponse({
        answer,
      }),
    )
  } catch {
    return NextResponse.json(
      safeAssistantResponse({
        answer: "I'm having trouble responding at the moment. Please try again shortly.",
        error: "Unexpected server error",
      }),
      { status: 500 },
    )
  }
}
