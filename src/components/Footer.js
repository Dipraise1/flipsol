'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-[rgba(var(--color-primary),0.15)] py-8">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-12 left-1/4 w-40 h-40 bg-[rgba(var(--color-primary),0.03)] rounded-full filter blur-2xl"></div>
        <div className="absolute -bottom-12 right-1/4 w-40 h-40 bg-[rgba(var(--color-secondary),0.03)] rounded-full filter blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo and description - spans full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[rgba(var(--color-surface),0.5)] rounded-lg">
                <span className="text-xl">🎰</span>
              </div>
              <span className="text-lg font-black tracking-wider">
                <span className="gradient-text">FLIP</span>
                <span className="text-white">SOL</span>
              </span>
            </div>
            <p className="text-[rgb(var(--color-text-secondary))] text-sm mb-3 max-w-md">
              The ultimate degen gambling experience on Solana. Double your tokens or go bust.
            </p>
            <div className="flex space-x-3">
              {[
                { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com' },
                { name: 'Discord', icon: 'discord', href: 'https://discord.com' },
                { name: 'GitHub', icon: 'github', href: 'https://github.com' }
              ].map((social) => (
                <a 
                  key={social.name}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(var(--color-surface),0.5)] text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] hover:bg-[rgba(var(--color-primary),0.1)] transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon === 'twitter' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  )}
                  {social.icon === 'discord' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  )}
                  {social.icon === 'github' && (
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links - 2 columns on small screens, 1 column on medium+ */}
          <div className="col-span-1">
            <h3 className="text-white font-bold uppercase tracking-wider mb-2 text-xs">Quick Links</h3>
            <ul className="space-y-1">
              {[
                { name: 'Home', href: '/' },
                { name: 'How to Play', href: '/how-to-play' },
                { name: 'Leaderboard', href: '/leaderboard' },
                { name: 'Rewards', href: '/rewards' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200 flex items-center text-sm"
                  >
                    <svg className="h-1.5 w-1.5 mr-1.5 flex-shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-white font-bold uppercase tracking-wider mb-2 text-xs">Resources</h3>
            <ul className="space-y-1">
              {[
                { name: 'Solana', href: 'https://solana.com', external: true },
                { name: 'Phantom Wallet', href: 'https://phantom.app', external: true },
                { name: 'Documentation', href: '#', external: false },
                { name: 'FAQ', href: '#', external: false },
                { 
                  name: 'Whitepaper', 
                  href: '#', 
                  external: false,
                  badge: 'New'
                }
              ].map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href} 
                    target={resource.external ? "_blank" : undefined}
                    rel={resource.external ? "noopener noreferrer" : undefined}
                    className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200 flex items-center text-sm"
                  >
                    <svg className="h-1.5 w-1.5 mr-1.5 flex-shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{resource.name}</span>
                    {resource.external && (
                      <svg className="ml-1 h-1.5 w-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                    {resource.badge && (
                      <span className="ml-1 inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))]">
                        {resource.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright and legal links */}
        <div className="mt-6 pt-4 border-t border-[rgba(var(--color-primary),0.15)]">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[rgb(var(--color-text-secondary))] text-xs">
              © {currentYear} FlipSOL. All rights reserved.
            </p>
            <div className="mt-2 sm:mt-0 flex flex-wrap justify-center gap-4">
              {[
                { name: 'Terms', href: '#' },
                { name: 'Privacy', href: '#' },
                { name: 'Contact', href: '#' }
              ].map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] text-xs transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className="text-xs text-[rgb(var(--color-text-secondary))]">
              Play responsibly on Solana Devnet.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}