import ClientWalletProvider from '../components/WalletProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';
import './animations.css';

export const metadata = {
  title: '🎰 FlipSOL | Double or Nothing on Solana',
  description: 'The ultimate degen gambling experience on Solana. Double your tokens or go bust with our provably fair coin flip game.',
  keywords: ['Solana', 'Blockchain', 'Cryptocurrency', 'Gambling', 'dApp', 'Web3', 'DeFi', 'Degen', 'Casino'],
  authors: [{ name: 'FlipSOL Team' }],
  openGraph: {
    title: '🎰 FlipSOL | Double or Nothing on Solana',
    description: 'Double your tokens or go bust with our provably fair coin flip game!',
    images: [
      {
        url: 'https://i.imgur.com/XYNFr0z.png',
        width: 1200,
        height: 630,
        alt: 'FlipSOL Casino'
      }
    ]
  }
};

export const viewport = {
  colorScheme: 'dark',
  themeColor: '#00f260',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎰</text></svg>" />
      </head>
      <body>
        <ClientWalletProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </ClientWalletProvider>
      </body>
    </html>
  );
}