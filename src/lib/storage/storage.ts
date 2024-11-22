// src/lib/storage/storage.ts

export const saveMessagesToLocalStorage = (
  messages: { role: string; content: string }[]
): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }
};

export const getMessagesFromLocalStorage = (): {
  role: string;
  content: string;
}[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('chatHistory');
    return data ? JSON.parse(data) : [];
  }
  return [];
};
