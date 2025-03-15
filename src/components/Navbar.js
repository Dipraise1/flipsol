'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { connected } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current?.contains(event.target) &&
        !(event.target.closest('.wallet-adapter-button'))
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Handle resize to close mobile menu on larger screens
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[rgba(var(--color-background),0.85)] backdrop-blur-xl border-b border-[rgba(var(--color-primary),0.15)]' 
            : 'bg-transparent'
        }`}
        style={{
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo with enhanced styling */}
          <Link href="/" className="flex items-center group z-50">
            <div className="mr-2 text-2xl transform group-hover:scale-110 transition-transform duration-300">🎰</div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-2xl font-bold gradient-text">FlipSOL</span>
                <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-full">BETA</span>
              </div>
              <span className="hidden sm:block text-[10px] text-[rgb(var(--color-text-secondary))] uppercase tracking-widest">Double or Nothing</span>
            </div>
          </Link>

          {/* Desktop Navigation with hover effects */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="relative group px-3 py-2">
              <span className="text-sm font-medium uppercase tracking-wider group-hover:text-[rgb(var(--color-primary))] transition-colors duration-300">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--color-primary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link href="/how-to-play" className="relative group px-3 py-2">
                  <span className="text-sm font-medium uppercase tracking-wider group-hover:text-[rgb(var(--color-primary))] transition-colors duration-300">How to Play</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--color-primary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </Link>
                <Link href="/leaderboard" className="relative group px-3 py-2">
                  <span className="text-sm font-medium uppercase tracking-wider group-hover:text-[rgb(var(--color-primary))] transition-colors duration-300">Leaderboard</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--color-primary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </Link>
                <Link href="/rewards" className="relative group px-3 py-2">
                  <span className="text-sm font-medium uppercase tracking-wider group-hover:text-[rgb(var(--color-primary))] transition-colors duration-300">
                    Rewards
                    <span className="absolute -top-1 -right-4 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--color-primary))] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[rgb(var(--color-primary))]"></span>
                    </span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[rgb(var(--color-primary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </Link>
              </>
            )}
            
            <div className="wallet-button-wrapper">
              <WalletMultiButton />
            </div>
          </div>

          {/* Mobile Menu Button and Wallet */}
          <div className="flex items-center md:hidden z-50">
            <div className="wallet-button-wrapper mr-3">
              <WalletMultiButton />
            </div>
            <button
              ref={menuButtonRef}
              className="p-2 rounded-lg hover:bg-[rgba(var(--color-primary),0.15)] transition-all duration-300 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end relative">
                <span className={`h-0.5 rounded-full bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                <span className={`h-0.5 rounded-full bg-white transition-all duration-300 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4 opacity-100'}`}></span>
                <span className={`h-0.5 rounded-full bg-white transform transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay with improved opacity transition */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu with enhanced styling and animations */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[rgba(var(--color-background),0.97)] backdrop-blur-2xl border-l border-[rgba(var(--color-primary),0.15)] transform transition-all duration-400 ease-in-out z-50 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            {/* Logo in menu */}
            <div className="flex items-center">
              <span className="text-2xl mr-2">🎰</span>
              <span className="text-lg font-bold gradient-text">FlipSOL</span>
            </div>
            
            {/* Close button */}
            <button
              className="p-2 rounded-full hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {/* Menu Items with enhanced animations */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block py-4 px-4 rounded-xl hover:bg-[rgba(var(--color-primary),0.15)] transition-all duration-300 transform hover:translate-x-1 mobile-menu-item"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <span className="text-xl mr-4">🏠</span>
                <span className="font-medium">Home</span>
              </div>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  href="/how-to-play"
                  className="block py-4 px-4 rounded-xl hover:bg-[rgba(var(--color-primary),0.15)] transition-all duration-300 transform hover:translate-x-1 mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-4">📖</span>
                    <span className="font-medium">How to Play</span>
                  </div>
                </Link>
                <Link
                  href="/leaderboard"
                  className="block py-4 px-4 rounded-xl hover:bg-[rgba(var(--color-primary),0.15)] transition-all duration-300 transform hover:translate-x-1 mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-4">🏆</span>
                    <span className="font-medium">Leaderboard</span>
                  </div>
                </Link>
                <Link
                  href="/rewards"
                  className="block py-4 px-4 rounded-xl hover:bg-[rgba(var(--color-primary),0.15)] transition-all duration-300 transform hover:translate-x-1 mobile-menu-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-4">💎</span>
                    <span className="font-medium">Rewards</span>
                    <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-[rgb(var(--color-primary))]"></span>
                  </div>
                </Link>
              </>
            )}
          </div>
          
          {/* Footer section */}
          <div className="mt-auto pt-6 border-t border-[rgba(var(--color-primary),0.15)]">
            <div className="flex items-center space-x-3 text-[rgb(var(--color-text-secondary))]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Powered by Solana</span>
            </div>
            <p className="text-xs text-[rgb(var(--color-text-secondary))] mt-4">
              © 2025 FlipSOL. Play responsibly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;