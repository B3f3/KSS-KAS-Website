import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Fetch data from Binance API
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error(`Binance API returned ${response.status}: ${response.statusText}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Extract symbols (coin pairs) and filter for USDT pairs
        const coins = data.symbols
            .filter((symbol: { symbol: string }) => symbol.symbol.endsWith('USDT'))
            .map((symbol: { symbol: string }) => symbol.symbol);

        // Return the coin list
        return NextResponse.json({ coins });
    } catch (error) {
        console.error('Error fetching coins:', error);
        return NextResponse.json({ error: 'Failed to fetch coins' }, { status: 500 });
    }
}
