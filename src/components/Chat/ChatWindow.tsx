'use client';

import React, { useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import {
  getFormattedChatHistory,
  updateChatHistory,
} from '@/lib/storage/chatHistory';
import { generateSystemPrompt } from '@/lib/ai/generateSystemPrompt';
import styles from './ChatWindow.module.css';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSendMessage = async (userMessage: string) => {
    const currentHistory = getFormattedChatHistory(userMessage);
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);

    setIsStreaming(true);

    try {
      const systemPrompt = await generateSystemPrompt(userMessage);

      // Запускаем стриминг
      const response = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          chatHistory: currentHistory,
        }),
      });

      if (!response.body) {
        throw new Error('No response body from API');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let aiMessage = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, aiMessage]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        aiMessage.content += chunk;

        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1] = aiMessage;
          return updatedMessages;
        });
      }

      // Обновляем историю после завершения стриминга
      updateChatHistory(aiMessage.content, currentHistory);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Error generating response. Please try again.',
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>Chat Assistant</div>
      <ChatMessages messages={messages} isStreaming={isStreaming} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
