// src/lib/storage/chatHistory.ts

import {
  getMessagesFromLocalStorage,
  saveMessagesToLocalStorage,
} from './storage';

/**
 * Fetches chat history from local storage and formats it for the system prompt.
 * @returns The formatted chat history.
 */
export const getFormattedChatHistory = (userMessage: string) => {
  const history = [
    ...getMessagesFromLocalStorage(), // Get chat history from local storage
    { role: 'user', content: userMessage }, // Add the new user message
  ];
  return history;
};

/**
 * Updates the chat history in local storage after a new user query and AI response.
 * @param aiResponse - The AI's response.
 */
export const updateChatHistory = (
  aiResponse: string,
  currentHistory: { role: string; content: string }[]
): void => {
  const updatedHistory = [
    ...currentHistory,
    { role: 'assistant', content: aiResponse }, // Add the AI response
  ];

  saveMessagesToLocalStorage(updatedHistory);
};
