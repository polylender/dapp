import React, { useEffect, useState, useRef } from 'react';
import './ConnectWallet.css';
// ethereum type is defined in src/types/ethereum.d.ts

export function WalletDemo() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
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
      walletButton.setAttribute('display-balance', 'true');
      walletButton.setAttribute('display-network', 'true');
      
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
            setWalletAddress(accounts[0]);
            return;
          }
        } catch (err) {
          setIsWalletConnected(false);
          setWalletAddress(null);
        }
      }

      // Check for appkit-button connection
      const walletButton = document.querySelector('appkit-button');
      if (walletButton) {
        const isConnected = walletButton.hasAttribute('connected') || 
                           walletButton.getAttribute('data-connected') === 'true';
        setIsWalletConnected(isConnected);
        const address = walletButton.getAttribute('address');
        if (address) {
          setWalletAddress(address);
        }
      } else {
        setIsWalletConnected(false);
        setWalletAddress(null);
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
        attributeFilter: ['connected', 'data-connected', 'address'] 
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
    <div className="wallet-demo p-8 rounded-lg bg-gradient-to-r from-purple-800 to-blue-900 shadow-xl max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Wallet Connection Demo
      </h2>
      
      <div className="flex justify-center mb-6">
        <div ref={walletContainerRef} className="wallet-button-container"></div>
      </div>
      
      {isWalletConnected && walletAddress && (
        <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Connected Account</h3>
          <div className="overflow-hidden text-ellipsis">
            <span className="font-mono text-sm bg-gray-800 px-2 py-1 rounded">
              {walletAddress}
            </span>
          </div>
          
          <div className="mt-6 text-gray-300 text-center text-sm">
            <p>Your wallet is now connected!</p>
            <p>The button above provides full wallet functionality:</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Network switching</li>
              <li>Balance display</li>
              <li>Send/receive tokens</li>
              <li>Swap tokens</li>
              <li>Buy crypto</li>
            </ul>
          </div>
        </div>
      )}
      
      {!isWalletConnected && (
        <div className="text-center text-gray-300">
          <p>Click the button above to connect your wallet</p>
        </div>
      )}
    </div>
  );
} 