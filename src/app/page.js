'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  PublicKey, 
  Transaction, 
  TransactionInstruction
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { MainNav } from '@/components/MainNav';
import { BackToTop } from '@/components/BackToTop';

// Constants - using environment variables when available with proper validation
let PROGRAM_ID = null;
let FLIPSOL_MINT = null;

try {
  // Only try to create PublicKey if the environment variable exists and is not empty
  if (process.env.NEXT_PUBLIC_PROGRAM_ID) {
    PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID);
  }
} catch (error) {
  console.error("Invalid PROGRAM_ID:", error);
  // Fallback to a default value for development/testing
  // PROGRAM_ID = new PublicKey("11111111111111111111111111111111"); // Uncomment and set a valid key for testing
}

try {
  if (process.env.NEXT_PUBLIC_FLIPSOL_MINT) {
    FLIPSOL_MINT = new PublicKey(process.env.NEXT_PUBLIC_FLIPSOL_MINT);
  }
} catch (error) {
  console.error("Invalid FLIPSOL_MINT:", error);
  // FLIPSOL_MINT = new PublicKey("11111111111111111111111111111111"); // Uncomment and set a valid key for testing
}

export default function Home() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  
  const [stake, setStake] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [configError, setConfigError] = useState(!PROGRAM_ID || !FLIPSOL_MINT);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [coinSide, setCoinSide] = useState('heads');
  
  const confettiRef = useRef(null);
  
  // Generate floating coins on mount - reduced quantity for less distraction
  useEffect(() => {
    if (connected) {
      const coins = [];
      for (let i = 0; i < 5; i++) { // Reduced from 10 to 5
        coins.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${Math.random() * 20 + 10}px`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 5 + 5}s`,
        });
      }
      setFloatingCoins(coins);
    }
  }, [connected]);
  
  // Fetch token balance when user is connected
  useEffect(() => {
    if (connected && publicKey) {
      fetchTokenBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);
  
  // Create confetti elements when user wins
  useEffect(() => {
    if (showConfetti && confettiRef.current) {
      createConfetti();
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  
  // Toast notification system
  const showToast = (status, title, description) => {
    setToastMessage({ status, title, description });
    const timer = setTimeout(() => setToastMessage(null), 5000);
    return () => clearTimeout(timer);
  };
  
  const fetchTokenBalance = async () => {
    try {
      // Simulate fetching token balance from blockchain
      const mockBalance = Math.random() * 100 + 10;
      setBalance(mockBalance);
    } catch (error) {
      console.error('Error fetching token balance:', error);
      showToast('error', 'Balance Error', 'Failed to fetch your token balance');
    }
  };
  
  const createConfetti = () => {
    const container = confettiRef.current;
    const colors = ['#00f260', '#0575e6', '#ff6347', '#f5d742', '#ffffff'];
    
    for (let i = 0; i < 50; i++) { // Reduced from 100 to 50
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.top = '-10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      
      container.appendChild(confetti);
      
      // Remove confetti after animation completes
      setTimeout(() => {
        if (container.contains(confetti)) {
          container.removeChild(confetti);
        }
      }, 5000);
    }
  };
  
  const handleStakeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0.1 && value <= 100) {
      setStake(value);
    }
  };
  
  const incrementStake = () => {
    setStake(prev => Math.min(parseFloat(prev) + 0.1, 100).toFixed(1));
  };
  
  const decrementStake = () => {
    setStake(prev => Math.max(parseFloat(prev) - 0.1, 0.1).toFixed(1));
  };
  
  const flipCoin = async () => {
    if (configError) return;
    
    setLoading(true);
    setIsFlipping(true);
    
    try {
      // Create a transaction (this is a mock implementation)
      const transaction = new Transaction();
      
      // Add a mock instruction
      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: publicKey, isSigner: true, isWritable: true },
        ],
        programId: PROGRAM_ID,
        data: Buffer.from([0]), // Mock data
      });
      
      transaction.add(instruction);
      
      // Send transaction
      const signature = await sendTransaction(transaction, connection);
      
      // Simulate transaction confirmation
      setTimeout(() => {
        // Simulate coin flip result (50% chance to win)
        const win = Math.random() > 0.5;
        const newCoinSide = win ? 'heads' : 'tails';
        setCoinSide(newCoinSide);
        
        if (win) {
          setShowConfetti(true);
          setResult({
            type: 'win',
            amount: stake,
            signature,
          });
          
          // Add to history
          setHistory(prev => [{
            date: new Date().toLocaleTimeString(),
            stake,
            result: 'win',
            payout: stake,
          }, ...prev.slice(0, 9)]);  // Keep only 10 most recent entries
          
          showToast('success', 'You Won!', `Congratulations! You won ${stake} FlipSOL!`);
        } else {
          setResult({
            type: 'lose',
            signature,
          });
          
          // Add to history
          setHistory(prev => [{
            date: new Date().toLocaleTimeString(),
            stake,
            result: 'lose',
            payout: 0,
          }, ...prev.slice(0, 9)]);  // Keep only 10 most recent entries
          
          showToast('error', 'You Lost!', 'Better luck next time!');
        }
        
        // Update balance after flip
        fetchTokenBalance();
        
        setLoading(false);
        setTimeout(() => setIsFlipping(false), 500);
      }, 1500);
      
    } catch (error) {
      console.error('Error flipping coin:', error);
      setResult({
        type: 'error',
        message: error.message || 'Failed to flip coin',
      });
      showToast('error', 'Transaction Failed', error.message || 'Failed to flip coin');
      setLoading(false);
      setIsFlipping(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Back to Top Button */}
      <BackToTop />
      
      {/* Confetti container */}
      {showConfetti && (
        <div ref={confettiRef} className="confetti-container"></div>
      )}
      
      {/* Floating coins - with reduced opacity */}
      {connected && floatingCoins.map(coin => (
        <div 
          key={coin.id}
          className="floating-coin animate-floating-coins"
          style={{
            left: coin.left,
            top: coin.top,
            width: coin.size,
            height: coin.size,
            animationDelay: coin.delay,
            animationDuration: coin.duration,
            opacity: 0.1, // Reduced opacity
          }}
        >
          🪙
        </div>
      ))}
      
      {/* Hero Section */}
      <section className="py-16 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--color-primary),0.05)] to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 relative">
          <span className="gradient-text">FlipSOL</span>
          <span className="ml-2 text-white">Coin Flip</span>
        </h1>
        <p className="text-xl md:text-2xl text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto mb-6">
          Double your tokens or go bust with our provably fair coin flip game!
        </p>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]">
          <span className="mr-1">🔥</span> Degen Approved
        </div>
      </section>
      
      {/* Main Game Card */}
      <section className="mb-16 px-4">
        <div className="glass-card max-w-3xl mx-auto relative overflow-hidden hover-glow">
          {/* Decorative elements - reduced blur for better performance */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[rgba(var(--color-primary),0.03)] rounded-full filter blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[rgba(var(--color-secondary),0.03)] rounded-full filter blur-2xl"></div>
          
          {configError && (
            <div className="p-6 rounded-lg bg-[rgba(var(--color-accent),0.1)] border border-[rgba(var(--color-accent),0.3)] mb-6 animate-slide-up">
              <div className="flex items-start">
                <div className="mr-3 text-2xl">⚠️</div>
                <div>
                  <h3 className="font-bold text-[rgb(var(--color-accent))]">Configuration Error</h3>
                  <p className="text-[rgb(var(--color-text-secondary))]">
                    The application is missing required environment variables. Please set NEXT_PUBLIC_PROGRAM_ID and NEXT_PUBLIC_FLIPSOL_MINT to valid Solana addresses.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!connected ? (
            <div className="flex flex-col items-center py-12 space-y-8">
              <div className="p-6 rounded-full animate-float hover-glow" style={{
                backgroundColor: 'rgba(var(--color-primary), 0.1)',
                border: '1px solid rgba(var(--color-primary), 0.2)',
                boxShadow: '0 0 15px rgba(var(--color-primary), 0.2)'
              }}>
                <svg className="w-16 h-16 text-[rgb(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div className="text-center space-y-3">
                <p className="text-2xl text-white font-bold">Connect your wallet to play</p>
                <p className="text-lg text-[rgb(var(--color-primary))]">Get ready to win big! 🚀</p>
              </div>
              <div className="mt-4">
                <WalletMultiButton />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="stat-card hover-scale hover-glow">
                  <span className="stat-label">Your Address</span>
                  <span className="stat-value font-mono neon-text">
                    {publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-4)}
                  </span>
                </div>
                <div className="stat-card hover-scale hover-glow">
                  <span className="stat-label">FlipSOL Balance</span>
                  <span className="stat-value">
                    <span className="neon-text">{balance !== null ? balance.toFixed(4) : "Loading..."}</span> 
                    <span className="text-xs ml-1 text-[rgb(var(--color-text-secondary))]">tokens</span>
                  </span>
                </div>
              </div>
              
              <div className="border-t border-[rgba(var(--color-primary),0.15)] my-6"></div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center gradient-text">Place Your Bet</h2>
                
                <div className="relative max-w-md mx-auto">
                  <div className="flex items-center">
                    <button 
                      onClick={decrementStake}
                      className="secondary-button py-2 px-4 rounded-l-md hover-scale"
                      disabled={loading}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input 
                      type="number" 
                      className="w-full text-center text-lg py-3 border-x-0 rounded-none"
                      placeholder="Stake amount"
                      value={stake}
                      onChange={handleStakeChange}
                      min="0.1"
                      max="100"
                      step="0.1"
                      disabled={loading}
                    />
                    <button 
                      onClick={incrementStake}
                      className="secondary-button py-2 px-4 rounded-r-md hover-scale"
                      disabled={loading}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center mt-2 text-sm text-[rgb(var(--color-text-secondary))]">
                    Min: 0.1 FlipSOL | Max: 100 FlipSOL
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button 
                    onClick={flipCoin} 
                    className="primary-button relative overflow-hidden group hover-shine"
                    disabled={loading || configError}
                  >
                    <div className="relative z-10 flex items-center justify-center py-1">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          FLIPPING...
                        </>
                      ) : (
                        <>
                          <span className="mr-2 text-xl">🪙</span>
                          FLIP IT!
                        </>
                      )}
                    </div>
                    <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </button>
                </div>
                
                {/* Coin Flip Animation */}
                {isFlipping && (
                  <div className="flex justify-center my-6">
                    <div className="relative w-24 h-24 animate-coin-flip">
                      <div className={`coin-side coin-heads ${coinSide === 'heads' ? 'z-10' : 'z-0'}`}>
                        <span className="text-4xl">H</span>
                      </div>
                      <div className={`coin-side coin-tails ${coinSide === 'tails' ? 'z-10' : 'z-0'}`}>
                        <span className="text-4xl">T</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Result Display */}
                {result && !isFlipping && (
                  <div className={`p-6 rounded-lg ${
                    result.type === 'win' 
                      ? 'bg-[rgba(var(--color-primary),0.1)] border border-[rgba(var(--color-primary),0.3)]' 
                      : result.type === 'lose' 
                        ? 'bg-[rgba(var(--color-accent),0.1)] border border-[rgba(var(--color-accent),0.3)]' 
                        : 'bg-[rgba(var(--color-accent),0.1)] border border-[rgba(var(--color-accent),0.3)]'
                  } animate-slide-up`}>
                    <div className="flex items-center">
                      <div className={`mr-4 text-4xl ${result.type === 'win' ? 'animate-bounce' : 'animate-shake'}`}>
                        {result.type === 'win' 
                          ? '🎉' 
                          : result.type === 'lose' 
                            ? '😢' 
                            : '❌'}
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${
                          result.type === 'win' 
                            ? 'text-[rgb(var(--color-primary))]' 
                            : result.type === 'lose' 
                              ? 'text-[rgb(var(--color-accent))]' 
                              : 'text-[rgb(var(--color-accent))]'
                        }`}>
                          {result.type === 'win' 
                            ? 'You Won!' 
                            : result.type === 'lose' 
                              ? 'You Lost!' 
                              : 'Error!'}
                        </h3>
                        <p className="text-[rgb(var(--color-text-secondary))]">
                          {result.type === 'win' 
                            ? `You won ${result.amount} FlipSOL!` 
                            : result.type === 'lose' 
                              ? 'Better luck next time!' 
                              : result.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* History Section */}
              {history.length > 0 && (
                <div className="mt-8 pt-6 border-t border-[rgba(var(--color-primary),0.15)]">
                  <h3 className="text-xl font-bold mb-4 gradient-text">Recent Flips</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {history.map((flip, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between items-center p-3 rounded-lg bg-[rgba(var(--color-surface),0.5)] border border-[rgba(var(--color-primary),0.1)] hover-scale hover-glow ${index === 0 ? 'animate-slide-up' : ''}`}
                      >
                        <span className="text-sm text-[rgb(var(--color-text-secondary))]">{flip.date}</span>
                        <span className="font-medium">{flip.stake} <span className="text-xs">FlipSOL</span></span>
                        <span className={`font-bold px-2 py-0.5 rounded text-sm ${
                          flip.result === 'win' 
                            ? 'bg-[rgba(var(--color-primary),0.1)] text-[rgb(var(--color-primary))]' 
                            : 'bg-[rgba(var(--color-accent),0.1)] text-[rgb(var(--color-accent))]'
                        }`}>
                          {flip.result === 'win' ? 'WIN' : 'LOSE'}
                        </span>
                        <span className={`font-bold ${
                          flip.result === 'win' 
                            ? 'text-[rgb(var(--color-primary))]' 
                            : 'text-[rgb(var(--color-accent))]'
                        }`}>
                          {flip.result === 'win' ? `+${flip.payout}` : '-0'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Navigation to other pages (only shown when authenticated) */}
      <MainNav />

      {/* Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 max-w-sm animate-slide-up z-50">
          <div className={`glass-card p-5 rounded-xl border ${
            toastMessage.status === 'success' ? 'border-[rgba(var(--color-primary),0.5)]' :
            toastMessage.status === 'error' ? 'border-[rgba(var(--color-accent),0.5)]' :
            toastMessage.status === 'warning' ? 'border-[rgba(255,165,0,0.5)]' :
            'border-[rgba(var(--color-secondary),0.5)]'
          } hover-scale`} style={{
            backgroundColor: toastMessage.status === 'success' ? 'rgba(var(--color-primary), 0.1)' :
                           toastMessage.status === 'error' ? 'rgba(var(--color-accent), 0.1)' :
                           toastMessage.status === 'warning' ? 'rgba(255, 165, 0, 0.1)' :
                           'rgba(var(--color-secondary), 0.1)',
            boxShadow: toastMessage.status === 'success' ? '0 0 15px rgba(var(--color-primary), 0.3)' : 
                      toastMessage.status === 'error' ? '0 0 15px rgba(var(--color-accent), 0.3)' :
                      toastMessage.status === 'warning' ? '0 0 15px rgba(255, 165, 0, 0.3)' :
                      '0 0 15px rgba(var(--color-secondary), 0.3)',
          }}>
            <div className="flex items-center gap-4">
              <div className="text-3xl" style={{
                color: toastMessage.status === 'success' ? 'rgb(var(--color-primary))' :
                       toastMessage.status === 'error' ? 'rgb(var(--color-accent))' :
                       toastMessage.status === 'warning' ? 'rgb(255, 165, 0)' :
                       'rgb(var(--color-secondary))'
              }}>
                {toastMessage.status === 'success' ? '🎉' :
                 toastMessage.status === 'error' ? '❌' :
                 toastMessage.status === 'warning' ? '⚠️' : 'ℹ️'}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg text-white">{toastMessage.title}</p>
                <p className="text-[rgb(var(--color-text-secondary))]">{toastMessage.description}</p>
              </div>
              <button 
                onClick={() => setToastMessage(null)}
                className="text-[rgb(var(--color-text-secondary))] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}