import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { ConnectWallet } from './ConnectWallet';
import './ConnectWallet.css';

export function ModernHeader() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { isConnected } = useAccount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync wallet connection status with wagmi
  useEffect(() => {
    setIsWalletConnected(isConnected);
    
    // Check for appkit-button connection
    const checkAppKitConnection = () => {
      const walletButton = document.querySelector('appkit-button');
      if (walletButton) {
        const isConnected = walletButton.hasAttribute('connected') || 
                           walletButton.getAttribute('data-connected') === 'true';
        setIsWalletConnected(isConnected);
      }
    };
    
    // Initial check
    checkAppKitConnection();
    
    // Set up observer for changes
    const observer = new MutationObserver(checkAppKitConnection);
    const walletButton = document.querySelector('appkit-button');
    
    if (walletButton) {
      observer.observe(walletButton, { 
        attributes: true, 
        attributeFilter: ['connected', 'data-connected'] 
      });
    }
    
    return () => observer.disconnect();
  }, [isConnected]);

  // Handle navigation based on wallet connection
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    if (!isWalletConnected && 
        (target.getAttribute('href') === '/dashboard' || 
         target.getAttribute('href') === '/transactions')) {
      e.preventDefault();
      alert("Please connect your wallet to access this feature");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0A0A0A] text-white border-b border-gray-800 shadow-lg px-6 py-0 flex items-center justify-between">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-2">
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Polylender
        </span>
      </Link>

      {/* Center: Menu (hidden on small screens) */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6 font-medium text-base">
        <Link 
          to="/dashboard" 
          className={`hover:text-purple-400 transition-colors ${!isWalletConnected ? 'opacity-50' : ''}`}
          onClick={handleNavClick}
        >
          Dashboard
        </Link>
        <Link 
          to="/lend" 
          className={`hover:text-purple-400 transition-colors ${!isWalletConnected ? 'opacity-50' : ''}`}
          onClick={handleNavClick}
        >
          Lend
        </Link>
        <Link 
          to="/borrow" 
          className={`hover:text-purple-400 transition-colors ${!isWalletConnected ? 'opacity-50' : ''}`}
          onClick={handleNavClick}
        >
          Borrow
        </Link>
        <Link 
          to="/market" 
          className="hover:text-purple-400 transition-colors"
        >
          Market
        </Link>
        <Link 
          to="/help" 
          className="hover:text-purple-400 transition-colors"
        >
          Help
        </Link>
      </div>

      {/* Right: Wallet connect button */}
      <div className="flex items-center gap-4">
        <ConnectWallet />
        
        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#0A0A0A] border-b border-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/dashboard" 
              className={`block px-3 py-2 rounded-md ${!isWalletConnected ? 'opacity-50' : 'text-white hover:bg-gray-700'}`}
              onClick={handleNavClick}
            >
              Dashboard
            </Link>
            <Link 
              to="/lend" 
              className={`block px-3 py-2 rounded-md ${!isWalletConnected ? 'opacity-50' : 'text-white hover:bg-gray-700'}`}
              onClick={handleNavClick}
            >
              Lend
            </Link>
            <Link 
              to="/borrow" 
              className={`block px-3 py-2 rounded-md ${!isWalletConnected ? 'opacity-50' : 'text-white hover:bg-gray-700'}`}
              onClick={handleNavClick}
            >
              Borrow
            </Link>
            <Link 
              to="/market" 
              className="block px-3 py-2 rounded-md text-white hover:bg-gray-700"
            >
              Market
            </Link>
            <Link 
              to="/help" 
              className="block px-3 py-2 rounded-md text-white hover:bg-gray-700"
            >
              Help
            </Link>
          </div>
        </div>
      )}
    </header>
  );
} 