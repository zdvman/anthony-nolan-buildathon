import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './ChatWindow.module.css';

const RenderMarkdown: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      a: ({ href, children }) => (
        <a
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link} // Применяем класс
        >
          {children} <span style={{ marginLeft: '4px' }}>🔗</span> ({href})
        </a>
      ),
    }}
  >
    {content}
  </ReactMarkdown>
);

export default RenderMarkdown;
