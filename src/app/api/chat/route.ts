import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    // Elegant fallback stream to simulate the chatbot visually before adding real keys.
    const text = "Hi! I am the portfolio assistant! Currently, the Gemini API key is not configured in the `.env.local` file. Once you provide it, I will seamlessly answer questions about Pranjal's experience, projects, and skills using Next.js and Google Gemini! Let's get building!"
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < text.length; i++) {
            // Vercel AI SDK standard data stream chunk format
            controller.enqueue(encoder.encode(`0:"${text[i]}"\n`))
            await new Promise(r => setTimeout(r, 15)) // typewriter speed
        }
        controller.close()
      }
    })
    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8", "x-vercel-ai-data-stream": "v1" }
    })
  }

  const result = streamText({
    model: google('gemini-1.5-flash'),
    system: `You are a helpful assistant for Pranjal Kautkar's portfolio. 
    Answer questions about their skills, experience, and projects.
    Facts:
    - Pranjal is a highly skilled Full Stack Developer and Next.js Engineer.
    - Expertise includes React, Next.js 15, Supabase, Tailwind CSS v4, and AI SDK integration.
    - Open to work and seeking new software engineering opportunities.
    - Has built scalable architectures, real-time apps, and high-performance e-commerce platforms.
    - Familiar with modern DevOps like GitHub Actions, Vercel, and Docker.
    
    Keep answers under 3 sentences. Be friendly and professional.`,
    messages: messages,
  });

  return result.toTextStreamResponse();
}
