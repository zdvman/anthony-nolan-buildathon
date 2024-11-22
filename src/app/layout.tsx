// src/app/layout.tsx

import React from 'react';
import '@/styles/globals.css'; // Подключаем глобальные стили
import '@/app/page.module.css'; // Подключаем стили страницы

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='page'>{children}</body>
    </html>
  );
}
