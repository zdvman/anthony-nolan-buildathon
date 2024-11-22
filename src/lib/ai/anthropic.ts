// src/lib/ai/anthropic.ts

import Anthropic from '@anthropic-ai/sdk';
import { getFormattedChatHistory } from '@/lib/storage/chatHistory';
import { updateChatHistory } from '@/lib/storage/chatHistory';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

/**
 * Transforms local storage chat history to match the MessageParam format expected by Anthropic API.
 * @param chatHistory - The chat history from local storage.
 * @returns Transformed chat history.
 */
const transformChatHistoryToMessageParam = (
  chatHistory: { role: string; content: string }[]
): {
  role: 'user' | 'assistant';
  content: { type: 'text'; text: string }[];
}[] => {
  return chatHistory.map((message) => ({
    role: message.role as 'user' | 'assistant', // Explicitly cast to match expected type
    content: [{ type: 'text', text: message.content }], // Wrap content as an array of blocks
  }));
};

/**
 * Fetches a streaming response from Anthropic's API and streams it to the UI.
 *
 * @param systemPrompt - The system prompt constructed with context.
 * @param newUserMessage - The user's latest question.
 * @param onStream - A callback to handle streaming updates.
 */
export const fetchAnthropicResponse = async (
  systemPrompt: string,
  newUserMessage: string,
  onStream: (streamedText: string) => void
): Promise<void> => {
  // Step 1: Get current chat history and add the new user message
  const currentChatHistory = getFormattedChatHistory(newUserMessage);

  // Step 2: Transform chat history to match Anthropic's expected format
  const messages = transformChatHistoryToMessageParam(currentChatHistory);

  // Step 3: Fetch a streaming response from Anthropic's API
  try {
    const stream = anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      temperature: 0.7,
      system: systemPrompt,
      messages,
    });

    // Handle streamed text updates
    stream.on('text', (textDelta: string) => {
      console.log('textDelta: ', textDelta);
      onStream(textDelta); // Pass the streamed text to the UI callback
    });

    const finalText = await stream.finalText();
    console.log('finalText', finalText);

    // Update chat history with the final response
    updateChatHistory(finalText, currentChatHistory);
  } catch (error) {
    console.error('Error fetching Anthropic response:', error);
    throw error;
  }
};
