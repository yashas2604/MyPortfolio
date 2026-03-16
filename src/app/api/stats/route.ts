import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // using counterapi.dev as requested, but from the backend to bypass adblockers
    const res = await fetch("https://api.counterapi.dev/v1/yashas2604/portfolio/up", {
      cache: 'no-store', // ensuring we don't cache the request so it always increments
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch count: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    
    return NextResponse.json({ count: data.count });
  } catch (error) {
    console.error("API Route Error (stats):", error);
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
