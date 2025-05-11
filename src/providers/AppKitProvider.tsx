import React, { useEffect } from 'react';
import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { polygon, mainnet, base, type AppKitNetwork } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Get projectId from environment variables
const projectId = '1c5dd8f50d6570e96ffc64ffb2e762a2';

// Create metadata object
const metadata = {
  name: 'Polylender',
  description: 'Decentralized P2P Lending Platform',
  url: 'https://polylender.com',
  icons: ['https://polylender.com/logo.png']
};

// Set the networks - prioritize Polygon
const networks = [polygon, mainnet, base] as [AppKitNetwork, ...AppKitNetwork[]];

// Create Wagmi Adapter with proper configuration
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false
});

// Initialize AppKit with proper configuration
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
    swaps: true,
    email: false,           
    socials: []
  }
});

// Add custom CSS for the appkit-button styling
const addCustomStyles = () => {
  // Check if our custom styles already exist
  if (!document.getElementById('appkit-custom-styles')) {
    const style = document.createElement('style');
    style.id = 'appkit-custom-styles';
    style.textContent = `
      /* Global CSS variables that may affect shadow DOM */
      :root {
        --w3m-accent-color: #8a2be2 !important;
        --w3m-accent-fill-color: white !important;
        --w3m-button-border-radius: 8px !important;
        --w3m-background-color: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
        --w3m-container-opacity: 1 !important;
        --w3m-container-visibility: visible !important;
      }
      
      /* Force visibility for all appkit elements */
      appkit-button,
      appkit-account-button,
      wui-account-button,
      wui-button,
      appkit-button * {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
      
      /* Target all the possible elements that could be the connected wallet button */
      appkit-account-button,
      appkit-button appkit-account-button {
        background: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
      }
      
      wui-account-button,
      button.wui-connect-button,
      [data-testid="account-button"] {
        background: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
        border: none !important;
        box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
      }
      
      /* Target button elements inside the account button */
      appkit-account-button button,
      wui-account-button button,
      appkit-button button {
        background: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
        color: white !important;
        border: none !important;
      }
      
      /* For non-connected state, ensure the button is visible */
      appkit-button:not([connected]):not([data-connected="true"]) {
        border: 1px solid #8a2be2 !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);
    
    // Apply classes directly to any existing appkit-buttons
    const styleExistingButtons = () => {
      // Apply to all appkit buttons to ensure visibility
      const appkitButtons = document.querySelectorAll('appkit-button');
      appkitButtons.forEach(button => {
        (button as HTMLElement).style.opacity = '1';
        (button as HTMLElement).style.visibility = 'visible';
        (button as HTMLElement).style.display = 'block';
      });
      
      // Apply to all account buttons
      const accountButtons = document.querySelectorAll('appkit-account-button, wui-account-button');
      accountButtons.forEach(button => {
        (button as HTMLElement).style.background = 'linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%)';
        (button as HTMLElement).style.borderRadius = '50%';
        (button as HTMLElement).style.boxShadow = '0 2px 8px rgba(138, 43, 226, 0.5)';
        (button as HTMLElement).style.opacity = '1';
        (button as HTMLElement).style.visibility = 'visible';
      });
      
      // Apply to any button with account-button in the data-testid
      const testButtons = document.querySelectorAll('[data-testid="account-button"]');
      testButtons.forEach(button => {
        (button as HTMLElement).style.background = 'linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%)';
        (button as HTMLElement).style.opacity = '1';
        (button as HTMLElement).style.visibility = 'visible';
      });
      
      // Try to apply styles directly to shadow DOM elements
      document.querySelectorAll('appkit-button').forEach(button => {
        try {
          if ((button as any).shadowRoot) {
            const shadowRoot = (button as any).shadowRoot;
            
            // Remove any existing style element to avoid duplicates
            const existingStyle = shadowRoot.querySelector('#appkit-shadow-styles');
            if (existingStyle) {
              existingStyle.remove();
            }
            
            const shadowStyle = document.createElement('style');
            shadowStyle.id = 'appkit-shadow-styles';
            shadowStyle.textContent = `
              wui-account-button,
              appkit-account-button {
                background: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
                border-radius: 8px !important;
                box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
              }
              
              button.wui-connect-button,
              [data-testid="account-button"] {
                background: linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%) !important;
                border: none !important;
                color: white !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
              }
              
              /* Make sure everything is visible */
              * {
                opacity: 1 !important;
                visibility: visible !important;
              }
            `;
            shadowRoot.appendChild(shadowStyle);
            
            // Apply styles directly to elements in shadow DOM
            const internalButtons = shadowRoot.querySelectorAll('button');
            internalButtons.forEach((btn: HTMLButtonElement) => {
              btn.style.background = 'linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%)';
              btn.style.color = 'white';
              btn.style.opacity = '1';
              btn.style.visibility = 'visible';
            });
            
            const accountBtns = shadowRoot.querySelectorAll('appkit-account-button, wui-account-button');
            accountBtns.forEach((btn: HTMLElement) => {
              (btn as HTMLElement).style.background = 'linear-gradient(90deg, #8a2be2 0%, #7b68ee 100%)';
              (btn as HTMLElement).style.opacity = '1';
              (btn as HTMLElement).style.visibility = 'visible';
            });
          }
        } catch (e) {
          console.warn('Failed to access shadow DOM:', e);
        }
      });
    };
    
    // Run once and set interval to keep checking (some frameworks render these components asynchronously)
    styleExistingButtons();
    const styleInterval = setInterval(styleExistingButtons, 1000);
    
    // Clear interval after 30 seconds to avoid performance issues but ensure styles are applied
    setTimeout(() => clearInterval(styleInterval), 30000);
  }
};

export function AppKitProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Make sure the appkit is initialized
    const loadWallet = () => {
      // Check if custom element is defined
      if (!customElements.get('appkit-button')) {
        // Log missing appkit custom element
        console.warn("AppKit custom elements not registered yet, initializing...");
        
        // Try to force load it
        createAppKit({
          adapters: [wagmiAdapter],
          networks,
          projectId,
          metadata,
          features: {
            analytics: true,
            swaps: true,
            email: false,
            socials: []
          }
        });
      }

      // Add our custom styles
      addCustomStyles();
    };
    
    // Run once on mount
    loadWallet();
    
    // Also run after a bit, to ensure DOM is fully loaded
    const timeoutId = setTimeout(loadWallet, 1000);
    
    // Set up a MutationObserver to watch for new buttons and connection changes
    const bodyObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Check if any new appkit-buttons were added
          mutation.addedNodes.forEach(node => {
            if (node.nodeName === 'APPKIT-BUTTON') {
              const button = node as HTMLElement;
              const isConnected = button.hasAttribute('connected') || 
                                button.getAttribute('data-connected') === 'true';
              
              if (isConnected) {
                button.setAttribute('style', `
                  background: linear-gradient(90deg, rgba(138, 43, 226, 0.9) 0%, rgba(123, 104, 238, 0.9) 100%) !important;
                  color: white !important;
                  border: none !important;
                  box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3) !important;
                `);
              }
              
              // Add observer for connection status changes
              const buttonObserver = new MutationObserver((buttonMutations) => {
                buttonMutations.forEach(bMutation => {
                  if (bMutation.type === 'attributes' && 
                     (bMutation.attributeName === 'connected' || 
                      bMutation.attributeName === 'data-connected')) {
                    
                    const isNowConnected = button.hasAttribute('connected') || 
                                        button.getAttribute('data-connected') === 'true';
                    
                    if (isNowConnected) {
                      button.setAttribute('style', `
                        background: linear-gradient(90deg, rgba(138, 43, 226, 0.9) 0%, rgba(123, 104, 238, 0.9) 100%) !important;
                        color: white !important;
                        border: none !important;
                        box-shadow: 0 2px 8px rgba(138, 43, 226, 0.3) !important;
                      `);
                    } else {
                      button.removeAttribute('style');
                    }
                  }
                });
              });
              
              buttonObserver.observe(button, {
                attributes: true,
                attributeFilter: ['connected', 'data-connected']
              });
            }
          });
        }
      });
    });
    
    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      bodyObserver.disconnect();
      
      // Remove custom styles on unmount
      const customStyles = document.getElementById('appkit-custom-styles');
      if (customStyles) {
        customStyles.remove();
      }
    };
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 