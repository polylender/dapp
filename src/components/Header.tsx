import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ConnectWallet.css';
// ethereum type is defined in src/types/ethereum.d.ts

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  products: [
    { name: 'Lend', href: '/lend' },
    { name: 'Borrow', href: '/borrow' },
    { name: 'Market', href: '/market' },
    { name: 'Dashboard', href: '/dashboard' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQs', href: '/help' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Risk Disclosure', href: '/risk' },
  ],
};

export default function Header() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const walletContainerRef = useRef<HTMLDivElement>(null);

  // Initialize and configure the wallet button
  useEffect(() => {
    if (walletContainerRef.current) {
      // Clear any existing content
      walletContainerRef.current.innerHTML = '';
      
      // Create the appkit-button element
      const walletButton = document.createElement('appkit-button');
      
      // Configure the button
      walletButton.setAttribute('network', 'polygon');
      walletButton.setAttribute('theme', 'dark');
      walletButton.setAttribute('size', 'md');
      
      // Add to the DOM
      walletContainerRef.current.appendChild(walletButton);
    }
  }, []);

  // Check wallet connection status
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check for MetaMask or any injected provider
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setIsWalletConnected(true);
            return;
          }
        } catch (err) {
          setIsWalletConnected(false);
        }
      }

      // Check for appkit-button connection
      const walletButton = document.querySelector('appkit-button');
      if (walletButton) {
        const isConnected = walletButton.hasAttribute('connected') || 
                           walletButton.getAttribute('data-connected') === 'true';
        setIsWalletConnected(isConnected);
      } else {
        setIsWalletConnected(false);
      }
    };

    // Initial check
    checkWalletConnection();

    // Set up observer for changes
    const observer = new MutationObserver(checkWalletConnection);
    const walletButton = document.querySelector('appkit-button');
    
    if (walletButton) {
      observer.observe(walletButton, { 
        attributes: true, 
        attributeFilter: ['connected', 'data-connected'] 
      });
    }

    // Listen for MetaMask account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', checkWalletConnection);
      window.ethereum.on('connect', checkWalletConnection);
      window.ethereum.on('disconnect', checkWalletConnection);
    }

    return () => {
      observer.disconnect();
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', checkWalletConnection);
        window.ethereum.removeListener('connect', checkWalletConnection);
        window.ethereum.removeListener('disconnect', checkWalletConnection);
      }
    };
  }, []);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Handle navigation based on wallet connection
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isWalletConnected && 
        (e.currentTarget.getAttribute('href') === '#dashboard' || 
         e.currentTarget.getAttribute('href') === '#transactions')) {
      e.preventDefault();
      alert("Please connect your wallet to access this feature");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black text-white border-b border-gray-800 shadow-sm px-6 flex items-center justify-between">
      {/* Left: Logo */}
      <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Polylender
              </span>
      </a>

      {/* Center: Menu (hidden on small screens) */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6 font-medium text-base">
        <a 
          href="#dashboard" 
          className={`hover:underline ${!isWalletConnected ? 'opacity-50' : ''}`}
          onClick={handleNavClick}
        >
          Dashboard
        </a>
        <a 
          href="#transactions" 
          className={`hover:underline ${!isWalletConnected ? 'opacity-50' : ''}`}
          onClick={handleNavClick}
        >
          Transactions
        </a>
        <a href="#help" className="hover:underline">Help</a>
              </div>
              
      {/* Right: Wallet connect button */}
      <div className="min-w-[140px] flex justify-end">
        <div ref={walletContainerRef} className="wallet-button-container"></div>
          </div>
    </header>
  );
} 