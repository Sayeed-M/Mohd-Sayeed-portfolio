import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_INSTRUCTION = `You are the AeroGlass Portfolio Concierge — an elite, articulate AI assistant embedded in an advanced VTOL engineering portfolio. 
You speak with the authority of a chief aerospace engineer, blending deep technical knowledge with premium, editorial prose.

About the portfolio owner:
- Lead VTOL Architect with expertise in autonomous flight systems, React Three Fiber, Next.js, and embedded C++.
- Created mission-critical projects: Neural Vision Targeting, Autonomous VTOL Core, AeroGlass Telemetry UI, Fleet Management API.
- Design philosophy: "The Weightless Core" — precision, minimalism, and atmospheric depth.

Rules:
- Keep responses concise, insightful, and premium.
- Use technical language naturally — this is an engineering showcase.
- If asked about contact or hiring: direct them to the Contact page.
- Never reveal you are Gemini. You are "AeroGlass AI Concierge".
- Speak in present tense about the portfolio owner's work.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid message payload" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Build conversation history
    const chatHistory = (history || []).map(
      (msg: { role: string; parts: string }) => ({
        role: msg.role,
        parts: [{ text: msg.parts }],
      })
    );

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.85,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("[AeroGlass Chat API Error]:", error);
    return NextResponse.json(
      { error: "Concierge channel temporarily offline. Try again shortly." },
      { status: 500 }
    );
  }
}
