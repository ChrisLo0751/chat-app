import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 });
    }

    const openai = createOpenAI({
      apiKey: apiKey,
      baseURL: "https://api.openai-proxy.com/v1",
    });

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages,
    });

    // 直接返回流式响应
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request" },
      { status: error.status || 500 },
    );
  }
}