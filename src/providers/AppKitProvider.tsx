import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { client } from '../config/wagmi';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Add custom CSS for the wallet button styling
const addCustomStyles = () => {
  // Check if our custom styles already exist
  if (!document.getElementById('wallet-custom-styles')) {
    const style = document.createElement('style');
    style.id = 'wallet-custom-styles';
    style.textContent = `
      /* Global CSS variables that may affect shadow DOM */
      :root {
        --w3m-accent-color: #8a2be2 !important;
        --w3m-accent-fill-color: white !important;
        --w3m-button-border-radius: 50% !important;
        --w3m-background-color: #8a2be2 !important;
        --w3m-container-opacity: 1 !important;
        --w3m-container-visibility: visible !important;
      }
      
      /* Force all web3modal elements to have consistent styling */
      wui-connect-button, 
      wui-account-button,
      wui-button[data-variant="fill"],
      button[data-testid="button"],
      w3m-core-button,
      [data-testid="account-button"] {
        background: #8a2be2 !important;
        border-radius: 50% !important;
        box-shadow: 0 0 8px 2px rgba(138, 43, 226, 0.6) !important;
        border: none !important;
        width: 44px !important;
        height: 44px !important;
        min-width: 44px !important;
        min-height: 44px !important;
        max-width: 44px !important;
        max-height: 44px !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
      }
      
      /* Hide text in connect button to ensure circular shape */
      wui-connect-button span:not(:first-child),
      wui-connect-button div:not(:first-child),
      button[data-testid="button"] > span:not(:first-child),
      button[data-testid="button"] span + span,
      w3m-core-button span:not(:first-child),
      w3m-core-button div:not(:first-child),
      wui-account-button span:not(:first-child),
      wui-account-button div:not(:first-child) {
        font-size: 0 !important;
        width: 0 !important;
        height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        opacity: 0 !important;
        display: none !important;
      }
      
      /* Show only icon in buttons */
      wui-connect-button span:first-child,
      wui-connect-button div:first-child,
      button[data-testid="button"] span:first-child,
      w3m-core-button span:first-child,
      w3m-core-button div:first-child,
      wui-account-button span:first-child,
      wui-account-button div:first-child {
        font-size: 24px !important;
        color: white !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
    `;
    document.head.appendChild(style);
  }
};

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Add our custom styles
    addCustomStyles();
    
    // Run check periodically for dynamically loaded elements
    const styleInterval = setInterval(() => {
      const buttons = document.querySelectorAll('button[data-testid="button"], wui-connect-button, wui-account-button, w3m-core-button');
      if (buttons.length > 0) {
        addCustomStyles();
      }
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(styleInterval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={client}>
        {children}
      </WagmiConfig>
    </QueryClientProvider>
  );
} 