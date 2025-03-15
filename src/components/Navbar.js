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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[rgba(var(--color-background),0.85)] backdrop-blur-xl border-b border-[rgba(var(--color-primary),0.15)]' 
            : 'bg-transparent'
        }`}
        style={{
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.15)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with enhanced styling */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[rgba(var(--color-primary),0.2)] to-[rgba(var(--color-secondary),0.2)] mr-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🎰</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold gradient-text">FlipSOL</span>
                    <span className="ml-2 px-1.5 py-0.5 text-xs font-bold bg-[rgba(var(--color-primary),0.2)] text-[rgb(var(--color-primary))] rounded-full">BETA</span>
                  </div>
                  <span className="hidden sm:block text-[10px] text-[rgb(var(--color-text-secondary))] uppercase tracking-widest">Double or Nothing</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Horizontal Menu */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <div className="flex space-x-6 items-center">
                <Link 
                  href="/" 
                  className="px-3 py-2 text-sm font-medium text-white hover:text-[rgb(var(--color-primary))] transition-colors duration-200 relative group"
                >
                  <span>Home</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link 
                      href="/how-to-play" 
                      className="px-3 py-2 text-sm font-medium text-white hover:text-[rgb(var(--color-primary))] transition-colors duration-200 relative group"
                    >
                      <span>How to Play</span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </Link>
                    
                    <Link 
                      href="/leaderboard" 
                      className="px-3 py-2 text-sm font-medium text-white hover:text-[rgb(var(--color-primary))] transition-colors duration-200 relative group"
                    >
                      <span>Leaderboard</span>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </Link>
                    
                    <Link 
                      href="/rewards" 
                      className="px-3 py-2 text-sm font-medium text-white hover:text-[rgb(var(--color-primary))] transition-colors duration-200 relative group"
                    >
                      <div className="flex items-center">
                        <span>Rewards</span>
                        <span className="ml-1.5 flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--color-primary))] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--color-primary))]"></span>
                        </span>
                      </div>
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                    </Link>
                  </>
                )}
              </div>
              
              <div className="wallet-button-wrapper ml-4">
                <WalletMultiButton />
              </div>
            </div>

            {/* Mobile Menu Button and Wallet */}
            <div className="flex items-center md:hidden">
              <div className="wallet-button-wrapper mr-3">
                <WalletMultiButton />
              </div>
              <button
                ref={menuButtonRef}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 focus:outline-none"
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
        </div>

        {/* Mobile Menu - Slide from top */}
        <div
          className={`md:hidden fixed inset-0 z-40 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        <div
          ref={mobileMenuRef}
          className={`md:hidden fixed top-0 inset-x-0 z-50 bg-[rgba(var(--color-background),0.97)] backdrop-blur-xl border-b border-[rgba(var(--color-primary),0.2)] shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="px-4 pt-5 pb-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🎰</span>
                <span className="text-lg font-bold gradient-text">FlipSOL</span>
              </div>
              <button
                className="rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link
                href="/"
                className="flex items-center p-3 rounded-lg hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 mobile-menu-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-xl mr-3">🏠</span>
                <span className="font-medium">Home</span>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    href="/how-to-play"
                    className="flex items-center p-3 rounded-lg hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">📖</span>
                    <span className="font-medium">How to Play</span>
                  </Link>
                  
                  <Link
                    href="/leaderboard"
                    className="flex items-center p-3 rounded-lg hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">🏆</span>
                    <span className="font-medium">Leaderboard</span>
                  </Link>
                  
                  <Link
                    href="/rewards"
                    className="flex items-center p-3 rounded-lg hover:bg-[rgba(var(--color-primary),0.15)] transition-colors duration-200 mobile-menu-item"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-xl mr-3">💎</span>
                    <span className="font-medium">Rewards</span>
                    <span className="ml-2 h-2 w-2 rounded-full bg-[rgb(var(--color-primary))]"></span>
                  </Link>
                </>
              )}
            </div>
            
            <div className="pt-4 border-t border-[rgba(var(--color-primary),0.15)]">
              <div className="flex items-center justify-center space-x-2 text-[rgb(var(--color-text-secondary))]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm">Powered by Solana</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;