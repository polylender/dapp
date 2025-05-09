import React from 'react';
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainnet, polygon } from 'wagmi/chains';
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { http } from 'viem';

// Setup queryClient
const queryClient = new QueryClient();

// Get projectId from environment variables
const projectId = process.env.VITE_WALLETCONNECT_PROJECT_ID || '';

// Create metadata object
const metadata = {
  name: 'Polylender.com',
  description: 'Decentralized P2P Lending Protocol',
  url: 'https://polylender.com',
  icons: ['https://polylender.com/logo.png']
};

// Set the networks
const networks = [polygon];

const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Polylender' }),
  ],
});

interface Props {
  children: React.ReactNode;
}

export function AppKitProvider({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 