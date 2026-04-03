import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const systemPrompt = `You are the AeroGlass Concierge, an elite AI assistant for Mohd Sayeed S Mulla's professional portfolio. You provide fast, precise, and highly competent answers focusing on AI, aerospace engineering, VTOL drone systems, and full-stack Flutter/Next.js architectures. Output concisely.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error("AI Routing Error:", error);
    return new Response(JSON.stringify({ error: "Secure channel interrupted or missing credentials." }), { status: 500 });
  }
}
