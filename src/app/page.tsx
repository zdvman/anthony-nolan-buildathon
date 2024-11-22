// src/app/page.tsx

import React from 'react';
import ChatWindow from '@/components/Chat/ChatWindow';

export default function Page() {
  return <ChatWindow />;
}

// 'use client';

// import { useState } from 'react';
// import { fetchBingResults } from '@/lib/bing/bingSearch';
// import { formattedSearchResults } from '@/lib/bing/bingSearch';

// export default function BingSearchPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   const handleSearch = async () => {
//     try {
//       setError(null);
//       const searchResults = await fetchBingResults(query);
//       setResults(searchResults);
//       console.log('searchResults: ', searchResults);
//       const searchResults1 = await formattedSearchResults(query);
//       console.log('searchResults1: ', searchResults1);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Bing Search</h1>
//       <input
//         type='text'
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder='Enter your query'
//       />
//       <button onClick={handleSearch}>Search</button>
//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <div>
//         {results.map((result, index) => (
//           <div key={index}>
//             <h3>{result.name}</h3>
//             <p>{result.snippet}</p>
//             <a href={result.url} target='_blank' rel='noopener noreferrer'>
//               {result.displayUrl}
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import { generateSystemPrompt } from '@/lib/ai/generateSystemPrompt';

// export default function TestGenerateSystemPrompt() {
//   const [query, setQuery] = useState('');
//   const [prompt, setPrompt] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleGeneratePrompt = async () => {
//     try {
//       setError(null);
//       const systemPrompt = await generateSystemPrompt(query);
//       setPrompt(systemPrompt);
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Test System Prompt Generation</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter your query"
//         style={{ width: '300px', marginRight: '10px', padding: '5px' }}
//       />
//       <button onClick={handleGeneratePrompt} style={{ padding: '5px' }}>
//         Generate Prompt
//       </button>

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       {prompt && (
//         <div>
//           <h2>Generated System Prompt:</h2>
//           <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
//             {prompt}
//           </pre>
//         </div>
//       )}
//     </div>
//   );
// }
