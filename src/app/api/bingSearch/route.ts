import { NextResponse } from 'next/server';

const BING_API_KEY = process.env.BING_API_KEY || '';
const BING_CUSTOM_CONFIG_ID = process.env.BING_CUSTOM_CONFIG_ID || '';

export async function GET(req: Request) {
  // Проверка наличия ключей
  if (!BING_API_KEY || !BING_CUSTOM_CONFIG_ID) {
    return NextResponse.json(
      { error: 'Bing API key or custom config ID is missing' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Missing query parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.bing.microsoft.com/v7.0/custom/search?q=${encodeURIComponent(
        query
      )}&customconfig=${BING_CUSTOM_CONFIG_ID}&mkt=en-GB&count=5&offset=0&safeSearch=Strict`,
      {
        cache: 'default',
        credentials: 'omit',
        headers: {
          'Ocp-Apim-Subscription-Key': BING_API_KEY || '',
          'Accept-Language': 'en-GB,en;q=0.9',
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
        },
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        referrerPolicy: 'strict-origin-when-cross-origin',
      }
    );

    if (!response.ok) {
      throw new Error(`Bing API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
