'use client';

import React from 'react';

export const HowToPlay = () => {
  const steps = [
    {
      title: "Connect Your Wallet",
      description: "Connect your Solana wallet to get started. We support Phantom, Solflare, and other Solana wallets.",
      icon: "👛"
    },
    {
      title: "Get FlipSOL Tokens",
      description: "You'll need FlipSOL tokens to play. You can get them by swapping SOL or other tokens on Jupiter.",
      icon: "💰"
    },
    {
      title: "Place Your Bet",
      description: "Enter the amount of FlipSOL tokens you want to bet. The minimum bet is 1 FlipSOL.",
      icon: "🎯"
    },
    {
      title: "Flip the Coin",
      description: "Click the 'Flip' button to flip the coin. Heads you win, tails you lose!",
      icon: "🪙"
    },
    {
      title: "Collect Your Winnings",
      description: "If you win, your winnings will be automatically sent to your wallet. If you lose, better luck next time!",
      icon: "🏆"
    }
  ];

  const faqs = [
    {
      question: "What are the odds?",
      answer: "The odds are 50/50 for heads or tails. If you win, you get 1.95x your bet amount."
    },
    {
      question: "Is there a minimum or maximum bet?",
      answer: "The minimum bet is 1 FlipSOL token. The maximum bet depends on the current liquidity in the pool."
    },
    {
      question: "How do I get FlipSOL tokens?",
      answer: "You can swap SOL or other tokens for FlipSOL on Jupiter Exchange or other Solana DEXs."
    },
    {
      question: "Are there any fees?",
      answer: "There is a 2.5% fee on all bets, which goes towards maintaining the platform and funding the rewards program."
    },
    {
      question: "Is FlipSOL safe?",
      answer: "FlipSOL uses a verifiably fair system based on Solana's blockchain. All transactions are transparent and can be verified on-chain."
    }
  ];

  return (
    <section id="how-to-play" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(var(--color-accent),0.03)] to-transparent pointer-events-none"></div>
      
      {/* Decorative elements - reduced for less distraction */}
      <div className="absolute top-40 left-20 text-3xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>🪙</div>
      <div className="absolute bottom-40 right-20 text-3xl animate-float opacity-20" style={{ animationDelay: '1.5s' }}>🎲</div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">How to Play</span>
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
            FlipSOL is a simple coin flip game on Solana. Bet FlipSOL tokens, flip the coin, and win 1.95x your bet!
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="glass-card hover-glow hover-scale relative">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[rgba(var(--color-primary),0.2)] flex items-center justify-center text-[rgb(var(--color-primary))] font-bold">
                {index + 1}
              </div>
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-[rgb(var(--color-text-secondary))]">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Game mechanics */}
        <div className="glass-card hover-glow mb-16">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">Game Mechanics</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[rgb(var(--color-primary))] mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-bold">Provably Fair</h4>
                    <p className="text-[rgb(var(--color-text-secondary))]">
                      FlipSOL uses Solana&apos;s blockchain to ensure all flips are provably fair and transparent.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[rgb(var(--color-primary))] mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-bold">Instant Payouts</h4>
                    <p className="text-[rgb(var(--color-text-secondary))]">
                      Winnings are automatically sent to your wallet as soon as the flip is confirmed on-chain.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-[rgb(var(--color-primary))] mr-2 mt-1">•</span>
                  <div>
                    <h4 className="font-bold">Low Fees</h4>
                    <p className="text-[rgb(var(--color-text-secondary))]">
                      Only 2.5% fee on all bets, much lower than traditional gambling platforms.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[rgba(var(--color-primary),0.7)] to-[rgba(var(--color-secondary),0.7)] animate-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl animate-float">🪙</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQs */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card hover-glow hover-scale">
                <h4 className="text-lg font-bold mb-2">{faq.question}</h4>
                <p className="text-[rgb(var(--color-text-secondary))]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="glass-card hover-glow inline-block px-8 py-6 max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">Ready to Try Your Luck?</h3>
            <p className="text-[rgb(var(--color-text-secondary))] mb-6">
              Connect your wallet and start flipping now. New players get 10 free FlipSOL tokens!
            </p>
            <button className="primary-button hover-scale text-lg px-8 py-3">
              Start Flipping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}; 