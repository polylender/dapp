import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

// Function to deeply style wallet button elements
const styleWalletButtons = () => {
  console.log("Applying targeted wallet button styles...");
  
  // Function to apply styles - will be called repeatedly
  const applyStyles = () => {
    // Target specific web3modal/wallet UI elements
    const elementSelectors = [
      'wui-connect-button',
      'wui-account-button',
      'wui-button[data-variant="fill"]',
      'button[data-testid="button"]',
      'w3m-core-button',
      '[data-testid="account-button"]'
    ];
    
    // Apply background gradient to all button elements
    elementSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el: Element) => {
        (el as HTMLElement).style.background = '#8a2be2'; // Flat violet color
        (el as HTMLElement).style.borderRadius = '8px';
        (el as HTMLElement).style.boxShadow = '0 2px 8px rgba(138, 43, 226, 0.5)';
        (el as HTMLElement).style.border = 'none';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.visibility = 'visible';
      });
    });
    
    // Target all text elements within wallet components
    const textSelectors = [
      'wui-text',
      'wui-flex',
      'w3m-address-text',
      'wui-account-button span',
      'wui-account-button div',
      'wui-connect-button span',
      'wui-connect-button div',
      'button[data-testid="button"] span',
      'button[data-testid="button"] div'
    ];
    
    // Force all text to be white
    textSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((el: Element) => {
        (el as HTMLElement).style.color = 'white';
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.visibility = 'visible';
        (el as HTMLElement).style.fontWeight = '500';
        (el as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
      });
    });
    
    // Style shadow DOM elements
    document.querySelectorAll('*').forEach((el: Element) => {
      try {
        // Try to access shadow root
        if ((el as any).shadowRoot) {
          const shadowRoot = (el as any).shadowRoot;
          
          // Add style element to shadow DOM
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            /* Button elements */
            wui-connect-button,
            wui-account-button,
            wui-button[data-variant="fill"],
            button[data-testid="button"],
            w3m-core-button,
            [data-testid="account-button"] {
              background: #8a2be2 !important; /* Flat violet color */
              border-radius: 8px !important;
              box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
              opacity: 1 !important;
              visibility: visible !important;
              border: none !important;
            }
            
            /* Text elements */
            wui-text,
            wui-flex,
            w3m-address-text,
            span, div, p {
              color: white !important;
              opacity: 1 !important;
              visibility: visible !important;
              font-weight: 500 !important;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
            }
          `;
          
          // Remove existing style if it exists
          const existingStyle = shadowRoot.querySelector('#wallet-shadow-styles');
          if (existingStyle) {
            existingStyle.remove();
          }
          
          styleElement.id = 'wallet-shadow-styles';
          shadowRoot.appendChild(styleElement);
          
          // Apply direct styling to shadow DOM elements
          // Buttons
          elementSelectors.forEach(selector => {
            shadowRoot.querySelectorAll(selector).forEach((el: Element) => {
              (el as HTMLElement).style.background = '#8a2be2'; // Flat violet color
              (el as HTMLElement).style.borderRadius = '8px';
              (el as HTMLElement).style.boxShadow = '0 2px 8px rgba(138, 43, 226, 0.5)';
              (el as HTMLElement).style.border = 'none';
            });
          });
          
          // Text
          textSelectors.forEach(selector => {
            shadowRoot.querySelectorAll(selector).forEach((el: Element) => {
              (el as HTMLElement).style.color = 'white';
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.visibility = 'visible';
            });
          });
          
          // Apply to all deeper shadow DOMs recursively
          shadowRoot.querySelectorAll('*').forEach((innerEl: Element) => {
            try {
              if ((innerEl as any).shadowRoot) {
                const innerShadowRoot = (innerEl as any).shadowRoot;
                
                // Apply the same style to inner shadow root
                const innerStyleElement = document.createElement('style');
                innerStyleElement.id = 'wallet-inner-shadow-styles';
                innerStyleElement.textContent = styleElement.textContent;
                
                // Remove existing style if it exists
                const existingInnerStyle = innerShadowRoot.querySelector('#wallet-inner-shadow-styles');
                if (existingInnerStyle) {
                  existingInnerStyle.remove();
                }
                
                innerShadowRoot.appendChild(innerStyleElement);
              }
            } catch (e) {
              // Ignore errors
            }
          });
        }
      } catch (e) {
        // Ignore errors
      }
    });
  };
  
  // Run immediately
  applyStyles();
  
  // Run again after DOM is fully loaded
  window.addEventListener('DOMContentLoaded', applyStyles);
  window.addEventListener('load', applyStyles);
  
  // Set up a continuous interval to keep applying styles
  const interval = setInterval(applyStyles, 500);
  
  // Clear interval after 60 seconds
  setTimeout(() => {
    clearInterval(interval);
    console.log("Stopped wallet button style application");
  }, 60000);
};

// Start styling the wallet buttons
styleWalletButtons();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
); 