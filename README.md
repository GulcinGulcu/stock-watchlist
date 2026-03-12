# Stock Watchlist

A simple web application for tracking stock information by symbol.  
Users can build a personal watchlist, view key stock metrics, and manage their tracked stocks in a clean interface.

## Features

- Add stocks to a personal watchlist by entering a stock symbol
- View stock price, daily change, high, and low values
- Remove stocks from the watchlist
- Refresh stock data manually
- Persistent watchlist using `localStorage`
- Loading state while restoring saved stocks
- Error handling for invalid symbols or API failures
- Responsive card-based UI

## Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **SCSS**
- **Lucide Icons**
- **Massive (Polygon) API**

## Data Handling

Stock data is retrieved using the Massive (Polygon) API.

If an API key is not provided, the application falls back to mock stock data to allow the UI to function without external dependencies.

## Project Structure

```text
src
├─ app
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.scss
│  └─ favicon.ico
│
├─ components
│  ├─ Header
│  │  ├─ Header.tsx
│  │  └─ Header.scss
│  │
│  ├─ StockInput
│  │  ├─ StockInput.tsx
│  │  └─ StockInput.scss
│  │
│  ├─ StockList
│  │  ├─ StockList.tsx
│  │  └─ StockList.scss
│  │
│  ├─ StockCard
│  │  ├─ StockCard.tsx
│  │  └─ StockCard.scss
│  │
│  └─ Loader
│     ├─ Loader.tsx
│     └─ Loader.scss
│
├─ services
│  └─ stockService.ts
│
├─ data
│  └─ mockStocks.ts
│
└─ types
   └─ stock.ts

```

## Getting Started

Install Dependencies

```bash
npm istall
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Environment Variables

To enable live stock data, create a .env.local file in the project root and add your API key:

```bash
NEXT_PUBLIC_POLYGON_API_KEY=your_api_key_here
```

If no API key is provided, the application will use mock data instead.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
