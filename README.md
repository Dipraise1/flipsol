# FlipSOL Frontend

A modern, responsive dApp for the FlipSOL coin flip game on Solana blockchain.

## Features

- **Provably Fair Gambling**: Double or nothing coin flip game on Solana
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Wallet Integration**: Connect with popular Solana wallets
- **Leaderboard**: Track top players and your own stats
- **Rewards Program**: Earn rewards based on your gameplay

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Solana Web3.js
- Wallet Adapter

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- A Solana wallet (Phantom, Solflare, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flipsol-frontend.git
   cd flipsol-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with your environment variables:
   ```
   NEXT_PUBLIC_PROGRAM_ID=your_program_id
   NEXT_PUBLIC_FLIPSOL_MINT=your_token_mint_address
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app can be deployed to Vercel or any other Next.js-compatible hosting service.

```bash
npm run build
# or
yarn build
```

## License

MIT

## Acknowledgements

- Solana Foundation
- Next.js Team
- Tailwind CSS
