// src/lib/bing/bingSearch.ts

// Search results: you won't need all these fields, but FYI this is what's available
interface SearchResult {
  id: string;
  name: string;
  url: string;
  datePublished: string;
  datePublishedDisplayText: string;
  isFamilyFriendly: true;
  displayUrl: string;
  snippet: string;
  dateLastCrawled: string;
  openGraphImage: {
    contentUrl: string;
    width: number;
    height: number;
  };
  fixedPosition: boolean;
  language: 'en';
  isNavigational: boolean;
  richCaptionGoBigHints: {
    title: string;
    publishDateDisplayText: string;
  };
  noCache: boolean;
  siteName: string;
}

export async function fetchBingResults(query: string) {
  const res = await fetch(`/api/bingSearch?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    throw new Error(`Error fetching results: ${res.statusText}`);
  }

  const data = await res.json();
  return data['webPages']['value'] as SearchResult[];
}

export async function formattedSearchResults(query: string) {
  const searchResults = await fetchBingResults(query);
  return searchResults
    .map(
      ({ name, snippet, url }) =>
        `<page><name>${name}</name><snippet>${snippet}</snippet><url>${url}</url></page`
    )
    .join('\n');
}
