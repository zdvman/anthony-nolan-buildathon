// src/components/Chat/ChatMessages.tsx

import React from 'react';
import RenderMarkdown from './RenderMarkdown';
import styles from './ChatWindow.module.css';

interface ChatMessagesProps {
  messages: { role: string; content: string }[];
  isStreaming: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isStreaming,
}) => (
  <div className={styles.chatMessages}>
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`${styles.message} ${
          msg.role === 'user' ? styles.userMessage : styles.aiMessage
        }`}
      >
        <div className={styles.messageHeader}>
          {msg.role === 'user' ? 'You' : 'Assistant'}
        </div>
        <RenderMarkdown content={msg.content} />
      </div>
    ))}
    {isStreaming && (
      <div className={`${styles.message} ${styles.aiMessage}`}>...</div>
    )}
  </div>
);

export default ChatMessages;
