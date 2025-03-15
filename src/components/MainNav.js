'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export const MainNav = () => {
  const { isAuthenticated } = useAuth();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const links = [
    {
      title: "How to Play",
      description: "Learn the rules and get started with FlipSOL",
      icon: "📖",
      href: "/how-to-play",
      color: "from-[rgba(var(--color-secondary),0.7)] to-[rgba(var(--color-primary),0.7)]"
    },
    {
      title: "Leaderboard",
      description: "See who's winning big and check your ranking",
      icon: "🏆",
      href: "/leaderboard",
      color: "from-[rgba(var(--color-accent),0.7)] to-[rgba(var(--color-primary),0.7)]",
      badge: "LIVE"
    },
    {
      title: "Rewards",
      description: "Discover the perks and bonuses you can earn",
      icon: "💎",
      href: "/rewards",
      color: "from-[rgba(var(--color-primary),0.7)] to-[rgba(var(--color-accent),0.7)]",
      isNew: true
    }
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-10 px-4 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          <span className="gradient-text">Explore FlipSOL</span>
          <div className="w-24 h-1 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] mx-auto mt-3 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {links.map((link, index) => (
            <Link 
              key={index}
              href={link.href}
              className="glass-card hover-glow hover-scale group relative overflow-hidden p-5 sm:p-6 rounded-xl border border-[rgba(var(--color-primary),0.15)]"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${link.color}`}></div>
              
              {/* Animated background glow */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl bg-gradient-to-br ${link.color}`}
                style={{
                  transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.5s ease-out'
                }}
              ></div>
              
              <div className="flex items-start relative z-10">
                {/* Icon circle with bounce effect */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(var(--color-surface),0.8), rgba(var(--color-background),0.5))`,
                    transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-[rgb(var(--color-primary))] transition-colors duration-300">
                      {link.title}
                    </h3>
                    
                    {/* Conditionally show NEW tag */}
                    {link.isNew && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-full">
                        NEW
                      </span>
                    )}
                    
                    {/* Conditionally show LIVE badge */}
                    {link.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-[rgba(var(--color-accent),0.2)] text-[rgb(var(--color-accent))] rounded-full flex items-center">
                        <span className="w-1.5 h-1.5 bg-[rgb(var(--color-accent))] rounded-full mr-1 animate-pulse"></span>
                        {link.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[rgb(var(--color-text-secondary))]">
                    {link.description}
                  </p>
                </div>
              </div>
              
              {/* Arrow indicator with animation */}
              <div 
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  transform: hoveredIndex === index ? 'translateX(0)' : 'translateX(-10px)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease'
                }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(var(--color-primary),0.2)]">
                  <svg className="w-5 h-5 text-[rgb(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              {/* Interactive hover effect on mobile */}
              <div className="absolute inset-0 bg-transparent sm:hidden"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};