import { OpenAI } from "openai"
import { docContext } from "@/lib/docs-data"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Inject documentation into the system prompt
  const systemPrompt = `
    You are RunAsh AI. Answer questions using this context:
    ${JSON.stringify(docContext)}
    
    If the answer is found in the context, provide a short summary and MUST return the source URL.
    Format your response as a JSON object: 
    { "answer": "...", "sourceUrl": "...", "sourceTitle": "..." }
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    response_format: { type: "json_object" } // Force JSON output
  })

  return new Response(response.choices[0].message.content)
    }
