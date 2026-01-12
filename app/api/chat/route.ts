import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is in your .env.local
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // or "gpt-3.5-turbo"
      messages: [
        {
          role: "system",
          content: "You are RunAsh AI, a helpful infrastructure assistant. You help developers with Live Streaming, AI Processing, and Payment APIs. Be concise and technical."
        },
        ...messages,
      ],
      temperature: 0.7,
    })

    return NextResponse.json({ 
      content: response.choices[0].message.content 
    })

  } catch (error) {
    console.error("AI Error:", error)
    return NextResponse.json({ error: "Failed to connect to AI" }, { status: 500 })
  }
}
