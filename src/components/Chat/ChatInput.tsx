// src/components/Chat/ChatInput.tsx

import React, { useState } from 'react';
import styles from './ChatWindow.module.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <input
        type='text'
        className={styles.chatInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Type your message...'
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <button className={styles.chatButton} onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatInput;
