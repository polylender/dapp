import React, { useEffect, useRef } from 'react';
import './ConnectWallet.css';

export function ConnectWallet() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to directly style wallet button elements
    const styleWalletUI = () => {
      // Target all possible web3modal elements in the DOM
      const webModalElements = document.querySelectorAll(
        'w3m-core-button, wui-connect-button, wui-account-button, button[data-testid="button"]'
      );
      
      // Apply flat violet color directly to all found elements
      webModalElements.forEach((el: Element) => {
        (el as HTMLElement).style.background = '#8a2be2';
        (el as HTMLElement).style.borderRadius = '50px';
        (el as HTMLElement).style.boxShadow = '0 2px 8px rgba(138, 43, 226, 0.5)';
        (el as HTMLElement).style.border = 'none';
      });
      
      // Find all text elements inside web3modal components
      const textElements = document.querySelectorAll(
        'wui-text, wui-flex, w3m-address-text, w3m-address-text span, w3m-address-text div'
      );
      
      // Force all text to white
      textElements.forEach((el: Element) => {
        (el as HTMLElement).style.color = 'white';
        (el as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
        (el as HTMLElement).style.fontWeight = '500';
      });
      
      // Apply styles to shadow DOM elements
      document.querySelectorAll('*').forEach((host: Element) => {
        if ((host as any).shadowRoot) {
          try {
            const shadowRoot = (host as any).shadowRoot;
            
            // Add style to shadow DOM
            const styleTag = document.createElement('style');
            styleTag.textContent = `
              /* Force all web3modal buttons to have violet color */
              wui-connect-button, 
              wui-account-button,
              wui-button[data-variant="fill"],
              button[data-testid="button"],
              w3m-core-button,
              [data-testid="account-button"] {
                background: #8a2be2 !important;
                border-radius: 50px !important;
                box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
                border: none !important;
              }
              
              /* Force all text to be white */
              wui-text, 
              wui-flex,
              w3m-address-text,
              span, div, p {
                color: white !important;
                font-weight: 500 !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
              }
            `;
            shadowRoot.appendChild(styleTag);
            
            // Apply direct styles to all elements in shadow DOM
            const shadowButtons = shadowRoot.querySelectorAll(
              'wui-connect-button, wui-account-button, button[data-testid="button"]'
            );
            
            shadowButtons.forEach((el: Element) => {
              (el as HTMLElement).style.background = '#8a2be2';
              (el as HTMLElement).style.borderRadius = '50px';
              (el as HTMLElement).style.boxShadow = '0 2px 8px rgba(138, 43, 226, 0.5)';
              (el as HTMLElement).style.border = 'none';
            });
            
            const shadowText = shadowRoot.querySelectorAll(
              'wui-text, wui-flex, span, div, p, w3m-address-text'
            );
            
            shadowText.forEach((el: Element) => {
              (el as HTMLElement).style.color = 'white';
              (el as HTMLElement).style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.2)';
              (el as HTMLElement).style.fontWeight = '500';
            });
          } catch (e) {
            // Ignore errors accessing shadow DOM
          }
        }
      });
    };
    
    // Configure appkit-button when component mounts
    const configureButton = () => {
      const container = buttonRef.current;
      if (!container) return;

      // Clear any existing content
      container.innerHTML = '';

      // Create the appkit-button element
      const button = document.createElement('appkit-button');
      
      // Set preferred network (Polygon)
      button.setAttribute('network', 'polygon');
      
      // Set button styles directly - flat violet color
      button.setAttribute('style', `
        background: #8a2be2 !important;
        border-radius: 50px !important;
        box-shadow: 0 2px 8px rgba(138, 43, 226, 0.5) !important;
        border: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      `);
      
      // Append button to container
      container.appendChild(button);
      
      // Style all web3modal elements
      styleWalletUI();
      
      // Watch for button changes to re-apply styles
      const observer = new MutationObserver(() => {
        styleWalletUI();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
      });
      
      // Run style application repeatedly to ensure components are styled
      const styleInterval = setInterval(styleWalletUI, 500);
      
      // Stop repeated styling after 60 seconds
      setTimeout(() => clearInterval(styleInterval), 60000);
    };

    configureButton();

    // Cleanup function
    return () => {
      if (buttonRef.current) {
        buttonRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="wallet-connection">
      <div ref={buttonRef} className="appkit-button-wrapper"></div>
    </div>
  );
} 