'use client';

import React, { useState } from 'react';

export const Rewards = () => {
  const [activeTab, setActiveTab] = useState('tiers');
  
  const rewardTiers = [
    {
      name: "Bronze",
      flips: "50+",
      rewards: [
        "Access to exclusive Discord channels",
        "Bronze badge on your profile",
        "1% cashback on losses"
      ],
      icon: "🥉",
      color: "from-[#CD7F32] to-[#8B4513]"
    },
    {
      name: "Silver",
      flips: "200+",
      rewards: [
        "All Bronze rewards",
        "Silver badge on your profile",
        "3% cashback on losses",
        "Weekly bonus token drops"
      ],
      icon: "🥈",
      color: "from-[#C0C0C0] to-[#A9A9A9]"
    },
    {
      name: "Gold",
      flips: "500+",
      rewards: [
        "All Silver rewards",
        "Gold badge on your profile",
        "5% cashback on losses",
        "Daily bonus token drops",
        "Exclusive NFT rewards"
      ],
      icon: "🥇",
      color: "from-[#FFD700] to-[#DAA520]"
    },
    {
      name: "Diamond",
      flips: "1000+",
      rewards: [
        "All Gold rewards",
        "Diamond badge on your profile",
        "10% cashback on losses",
        "VIP access to new features",
        "Custom profile themes",
        "Exclusive merchandise"
      ],
      icon: "💎",
      color: "from-[#B9F2FF] to-[#56CCF2]"
    }
  ];
  
  const weeklyRewards = [
    {
      rank: "Top 3",
      reward: "500 FlipSOL + Exclusive NFT",
      icon: "🏆"
    },
    {
      rank: "Top 10",
      reward: "250 FlipSOL",
      icon: "🎖️"
    },
    {
      rank: "Top 25",
      reward: "100 FlipSOL",
      icon: "🏅"
    },
    {
      rank: "Top 50",
      reward: "50 FlipSOL",
      icon: "🎗️"
    },
    {
      rank: "Top 100",
      reward: "25 FlipSOL",
      icon: "🎁"
    }
  ];
  
  return (
    <section id="rewards" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(var(--color-accent),0.03)] to-transparent pointer-events-none"></div>
      
      {/* Decorative elements - reduced for less distraction */}
      <div className="absolute top-20 left-10 text-3xl animate-float opacity-20" style={{ animationDelay: '0.3s' }}>💰</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-float opacity-20" style={{ animationDelay: '1.8s' }}>💎</div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Rewards Program</span>
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
            Earn exclusive rewards, bonuses, and special perks based on your activity and performance.
          </p>
        </div>
        
        {/* Tab navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[rgba(var(--color-surface),0.5)] rounded-lg">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'tiers'
                  ? 'bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]'
                  : 'text-[rgb(var(--color-text-secondary))] hover:text-white'
              }`}
              onClick={() => setActiveTab('tiers')}
            >
              Loyalty Tiers
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'weekly'
                  ? 'bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]'
                  : 'text-[rgb(var(--color-text-secondary))] hover:text-white'
              }`}
              onClick={() => setActiveTab('weekly')}
            >
              Weekly Competitions
            </button>
          </div>
        </div>
        
        {/* Loyalty Tiers */}
        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTiers.map((tier, index) => (
              <div 
                key={tier.name}
                className="glass-card hover-glow hover-scale relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 left-0 h-1 bg-gradient-to-r ${tier.color}`}></div>
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-3">{tier.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <p className="text-sm text-[rgb(var(--color-text-secondary))]">{tier.flips} flips</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {tier.rewards.map((reward, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[rgb(var(--color-primary))] mr-2">✓</span>
                      <span className="text-[rgb(var(--color-text-secondary))]">{reward}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button className="secondary-button w-full hover-scale">
                    {index === 0 ? 'Your Current Tier' : 'View Details'}
                  </button>
                </div>
                
                {/* Progress indicator for first tier */}
                {index === 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-[rgb(var(--color-text-secondary))] mb-1">
                      <span>Progress: 32/50 flips</span>
                      <span>64%</span>
                    </div>
                    <div className="w-full bg-[rgba(var(--color-surface),0.5)] rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-[rgba(var(--color-primary),0.7)] to-[rgba(var(--color-secondary),0.7)]"
                        style={{ width: '64%' }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Weekly Competitions */}
        {activeTab === 'weekly' && (
          <div className="glass-card hover-glow">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Weekly Profit Competition</h3>
              <p className="text-[rgb(var(--color-text-secondary))]">
                Every week, the top players with the highest profits will receive special rewards. The competition resets every Monday at 00:00 UTC.
              </p>
            </div>
            
            <div className="space-y-4">
              {weeklyRewards.map((item) => (
                <div 
                  key={item.rank}
                  className="flex items-center p-4 bg-[rgba(var(--color-surface),0.5)] rounded-lg border border-[rgba(var(--color-primary),0.1)] hover-scale"
                >
                  <div className="text-3xl mr-4">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white">{item.rank}</h4>
                    <p className="text-[rgb(var(--color-text-secondary))]">{item.reward}</p>
                  </div>
                  <div className="hidden md:block">
                    <button className="secondary-button">Claim</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-[rgba(var(--color-primary),0.05)] border border-[rgba(var(--color-primary),0.1)] rounded-lg">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🔔</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Your Current Ranking</h4>
                  <p className="text-[rgb(var(--color-text-secondary))]">
                    You are currently ranked <span className="text-[rgb(var(--color-primary))] font-bold">37th</span> this week with a profit of <span className="text-[rgb(var(--color-primary))] font-bold">+86.5 FlipSOL</span>. Keep flipping to climb the ranks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Referral program - simplified */}
        <div className="mt-16">
          <div className="glass-card hover-glow">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/4 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-3 gradient-text">Refer Friends, Earn Rewards</h3>
                <p className="text-[rgb(var(--color-text-secondary))] mb-4">
                  Invite your friends to join FlipSOL and earn 5% of their flips as rewards. Both you and your friend will receive a bonus of 10 FlipSOL tokens when they sign up.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="text" 
                    value="https://flipsol.io/ref/yourname" 
                    readOnly
                    className="flex-1 bg-[rgba(var(--color-surface),0.8)] border border-[rgba(var(--color-primary),0.2)] rounded-md px-4 py-2 text-sm font-mono"
                  />
                  <button className="primary-button whitespace-nowrap hover-scale">
                    Copy Link
                  </button>
                </div>
              </div>
              <div className="md:w-1/4 flex justify-center">
                <div className="text-6xl animate-float">🔗</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 