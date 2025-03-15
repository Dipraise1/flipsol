'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { connected, publicKey } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Update authentication state when wallet connection changes
    setIsAuthenticated(connected && publicKey);
  }, [connected, publicKey]);

  // Redirect to home if not authenticated
  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      router.push('/');
      return null;
    }
    return callback();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 