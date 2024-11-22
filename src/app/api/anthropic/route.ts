// src/app/api/anthropic/route.ts

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: NextRequest) {
  try {
    const {
      systemPrompt,
      chatHistory,
    }: {
      systemPrompt: string;
      chatHistory: Array<{ role: 'user' | 'assistant'; content: string }>;
    } = await req.json();

    if (!systemPrompt || !chatHistory) {
      return NextResponse.json(
        { error: 'Missing systemPrompt or chatHistory' },
        { status: 400 }
      );
    }

    // Создаем поток
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const aiStream = await anthropic.messages.stream({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            temperature: 0.7,
            system: systemPrompt,
            messages: chatHistory,
          });

          aiStream.on('text', (chunk) => {
            controller.enqueue(new TextEncoder().encode(chunk));
          });

          aiStream.on('end', () => {
            controller.close();
          });

          aiStream.on('error', (err) => {
            controller.error(err);
          });
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
