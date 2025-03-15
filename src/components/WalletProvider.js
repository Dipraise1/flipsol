'use client';

import { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

// Custom styles for wallet adapter
const walletStyles = `
  .wallet-adapter-button {
    background-image: linear-gradient(to right, #00f260, #0575e6);
    color: white;
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 15px rgba(0, 242, 96, 0.4);
    transform: translateZ(0);
    transition: all 200ms;
    text-transform: uppercase;
    font-family: 'Rubik', sans-serif;
    letter-spacing: 0.05em;
  }

  .wallet-adapter-button:hover {
    background-image: linear-gradient(to right, #00cf54, #0467d1);
    transform: translateY(-3px);
    box-shadow: 0 6px 15px -1px rgba(0, 0, 0, 0.2), 0 0 15px rgba(0, 242, 96, 0.6);
  }

  .wallet-adapter-button:active {
    transform: translateY(1px);
  }

  .wallet-adapter-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  .wallet-adapter-modal-wrapper {
    backdrop-filter: blur(12px);
    background-color: rgba(13, 17, 28, 0.9);
    border: 1px solid rgba(0, 242, 96, 0.3);
    box-shadow: 0 0 20px rgba(0, 242, 96, 0.2);
  }
  
  .wallet-adapter-modal-button-close {
    background-color: rgba(13, 17, 28, 0.9);
    color: #00f260;
    transition: color 200ms;
  }
  
  .wallet-adapter-modal-button-close:hover {
    color: white;
  }
  
  .wallet-adapter-modal-title {
    color: white;
    font-family: 'Rubik', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .wallet-adapter-modal-content {
    background-color: rgba(13, 17, 28, 0.8);
    border: 1px solid rgba(0, 242, 96, 0.3);
    font-family: 'Rubik', sans-serif;
  }
  
  .wallet-adapter-modal-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .wallet-adapter-modal-list-more {
    color: #00f260;
    font-weight: 600;
  }
  
  .wallet-adapter-modal-list-more:hover {
    color: #00cf54;
  }
  
  .wallet-adapter-modal-list li {
    background-color: rgba(13, 17, 28, 0.9);
    border: 1px solid rgba(0, 242, 96, 0.1);
    transition: all 200ms;
  }
  
  .wallet-adapter-modal-list li:hover {
    background-color: rgba(13, 17, 28, 0.7);
    border-color: rgba(0, 242, 96, 0.3);
    box-shadow: 0 0 10px rgba(0, 242, 96, 0.2);
    transform: translateY(-2px);
  }
  
  .wallet-adapter-dropdown {
    font-family: 'Rubik', sans-serif;
  }
`;

export default function ClientWalletProvider({ children }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <>
      <style jsx global>{walletStyles}</style>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}