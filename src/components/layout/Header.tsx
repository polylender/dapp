import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../ConnectWallet.css';
// ethereum type is defined in src/types/ethereum.d.ts

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Lend', href: '/lend' },
  { name: 'Borrow', href: '/borrow' },
  { name: 'Help Center', href: '/help' },
  { name: 'About Us', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
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
      walletButton.setAttribute('theme', 'light'); // Light theme for light header
      walletButton.setAttribute('size', 'md');
      
      // Try direct styling approaches
      walletButton.setAttribute('style', `
        --appkit-button-background: #f8f9fa;
        --appkit-button-color: #333;
      `);
      
      // Add to the DOM
      walletContainerRef.current.appendChild(walletButton);
      
      // Add a MutationObserver to add a class when connected and apply direct styling
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && 
             (mutation.attributeName === 'connected' || 
              mutation.attributeName === 'data-connected')) {
            const isConnected = walletButton.hasAttribute('connected') || 
                              walletButton.getAttribute('data-connected') === 'true';
            
            if (isConnected) {
              walletButton.classList.add('connected');
              // Apply multiple layers of styling to get it to work
              walletButton.setAttribute('style', `
                --appkit-button-background: linear-gradient(90deg, rgba(138, 43, 226, 0.9) 0%, rgba(123, 104, 238, 0.9) 100%) !important;
                --appkit-button-color: white !important;
                --appkit-button-border: none !important;
                --appkit-button-shadow: 0 2px 8px rgba(138, 43, 226, 0.3) !important;
                background: linear-gradient(90deg, rgba(138, 43, 226, 0.9) 0%, rgba(123, 104, 238, 0.9) 100%) !important;
                color: white !important;
                border: none !important;
                box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3) !important;
              `);
              
              // As a last resort, try wrapping the button in a styled div
              if (walletButton.parentNode) {
                const parent = walletButton.parentNode as HTMLElement;
                parent.style.background = 'linear-gradient(90deg, rgba(138, 43, 226, 0.9) 0%, rgba(123, 104, 238, 0.9) 100%)';
                parent.style.borderRadius = '8px';
              }
            } else {
              walletButton.classList.remove('connected');
              if (walletButton.parentNode) {
                const parent = walletButton.parentNode as HTMLElement;
                parent.style.background = 'transparent';
              }
            }
          }
        });
      });
      
      observer.observe(walletButton, {
        attributes: true,
        attributeFilter: ['connected', 'data-connected']
      });
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

  return (
    <header className="bg-white">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/logo.png"
                alt="Polylender"
              />
              <span className="ml-2 text-xl font-bold text-polylender-black">Polylender</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-base font-medium ${
                  location.pathname === item.href
                    ? 'text-polylender-purple'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            {/* Connect Wallet Button */}
            <div className="min-w-[140px] flex justify-end">
              <div ref={walletContainerRef} className="wallet-button-container"></div>
            </div>
            
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="ml-4 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-polylender-purple md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    location.pathname === item.href
                      ? 'bg-polylender-purple text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 