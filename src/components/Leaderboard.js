'use client';

import React, { useState } from 'react';

export const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('daily');
  
  // Mock data for the leaderboard
  const leaderboardData = {
    daily: [
      { rank: 1, address: '8xDc...3Fgh', flips: 42, winRate: 68, profit: 235.5 },
      { rank: 2, address: '9aRt...7Jkl', flips: 37, winRate: 62, profit: 187.2 },
      { rank: 3, address: '5mNp...2Qrs', flips: 53, winRate: 55, profit: 156.8 },
      { rank: 4, address: '3bCd...8Tuv', flips: 29, winRate: 59, profit: 124.5 },
      { rank: 5, address: '7xYz...1Abc', flips: 45, winRate: 51, profit: 98.3 },
    ],
    weekly: [
      { rank: 1, address: '4kLm...9Def', flips: 186, winRate: 61, profit: 752.8 },
      { rank: 2, address: '8xDc...3Fgh', flips: 142, winRate: 58, profit: 635.4 },
      { rank: 3, address: '2gHi...6Jkl', flips: 203, winRate: 52, profit: 521.7 },
      { rank: 4, address: '7xYz...1Abc', flips: 167, winRate: 54, profit: 487.2 },
      { rank: 5, address: '5mNp...2Qrs', flips: 195, winRate: 50, profit: 412.9 },
    ],
    monthly: [
      { rank: 1, address: '2gHi...6Jkl', flips: 842, winRate: 57, profit: 2845.6 },
      { rank: 2, address: '4kLm...9Def', flips: 756, winRate: 55, profit: 2367.1 },
      { rank: 3, address: '8xDc...3Fgh', flips: 912, winRate: 52, profit: 2156.8 },
      { rank: 4, address: '1oPq...5Rst', flips: 678, winRate: 53, profit: 1897.4 },
      { rank: 5, address: '7xYz...1Abc', flips: 825, winRate: 51, profit: 1752.3 },
    ],
    allTime: [
      { rank: 1, address: '2gHi...6Jkl', flips: 3842, winRate: 54, profit: 12845.6 },
      { rank: 2, address: '8xDc...3Fgh', flips: 4156, winRate: 52, profit: 10367.2 },
      { rank: 3, address: '4kLm...9Def', flips: 3578, winRate: 53, profit: 9856.4 },
      { rank: 4, address: '7xYz...1Abc', flips: 3912, winRate: 51, profit: 8752.9 },
      { rank: 5, address: '1oPq...5Rst', flips: 3245, winRate: 52, profit: 7634.5 },
    ]
  };
  
  const timeframeOptions = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'allTime', label: 'All Time' }
  ];
  
  return (
    <section id="leaderboard" className="py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(var(--color-secondary),0.03)] to-transparent pointer-events-none"></div>
      
      {/* Trophy decoration - reduced for less distraction */}
      <div className="absolute top-20 right-10 text-4xl animate-float opacity-20" style={{ animationDelay: '0.7s' }}>🏆</div>
      <div className="absolute bottom-20 left-10 text-3xl animate-float opacity-20" style={{ animationDelay: '1.5s' }}>🥇</div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Leaderboard</span>
          </h2>
          <p className="text-lg text-[rgb(var(--color-text-secondary))] max-w-2xl mx-auto">
            The top FlipSOL players with the highest profits. Do you have what it takes to make it to the top?
          </p>
        </div>
        
        {/* Timeframe selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[rgba(var(--color-surface),0.5)] rounded-lg">
            {timeframeOptions.map((option) => (
              <button
                key={option.id}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  timeframe === option.id
                    ? 'bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]'
                    : 'text-[rgb(var(--color-text-secondary))] hover:text-white'
                }`}
                onClick={() => setTimeframe(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Leaderboard table */}
        <div className="glass-card hover-glow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--color-primary),0.1)]">
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                    Flips
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--color-text-secondary))] uppercase tracking-wider">
                    Profit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--color-primary),0.05)]">
                {leaderboardData[timeframe].map((player, index) => (
                  <tr 
                    key={player.rank}
                    className={`hover:bg-[rgba(var(--color-primary),0.05)] transition-colors ${
                      index === 0 ? 'bg-[rgba(var(--color-primary),0.08)]' : ''
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        index === 0 
                          ? 'bg-[rgba(255,215,0,0.2)] text-[#FFD700]' 
                          : index === 1 
                            ? 'bg-[rgba(192,192,192,0.2)] text-[#C0C0C0]' 
                            : index === 2 
                              ? 'bg-[rgba(205,127,50,0.2)] text-[#CD7F32]' 
                              : 'bg-[rgba(var(--color-surface),0.5)] text-white'
                      }`}>
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : player.rank}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-mono text-sm">
                      {player.address}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {player.flips}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-[rgba(var(--color-surface),0.5)] rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-[rgba(var(--color-primary),0.7)] to-[rgba(var(--color-secondary),0.7)]"
                            style={{ width: `${player.winRate}%` }}
                          ></div>
                        </div>
                        <span>{player.winRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap font-bold text-[rgb(var(--color-primary))]">
                      +{player.profit.toFixed(1)} <span className="text-xs font-normal">FlipSOL</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Your stats card - simplified */}
        <div className="mt-8">
          <div className="glass-card hover-glow">
            <h3 className="text-xl font-bold mb-4">Your Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="stat-card hover-scale">
                <span className="stat-label">Your Rank</span>
                <span className="stat-value">
                  <span className="neon-text">42</span>
                  <span className="text-xs ml-1 text-[rgb(var(--color-text-secondary))]">/ 1,248</span>
                </span>
              </div>
              <div className="stat-card hover-scale">
                <span className="stat-label">Total Flips</span>
                <span className="stat-value">
                  <span className="neon-text">128</span>
                </span>
              </div>
              <div className="stat-card hover-scale">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value">
                  <span className="neon-text">52.3</span>
                  <span className="text-xs ml-1 text-[rgb(var(--color-text-secondary))]">%</span>
                </span>
              </div>
              <div className="stat-card hover-scale">
                <span className="stat-label">Net Profit</span>
                <span className="stat-value">
                  <span className="neon-text">+86.5</span>
                  <span className="text-xs ml-1 text-[rgb(var(--color-text-secondary))]">FlipSOL</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 