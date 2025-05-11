import { mainnet, polygon } from 'wagmi/chains';
import { createClient, configureChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { publicProvider } from 'wagmi/providers/public';

const projectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '1c5dd8f50d6570e96ffc64ffb2e762a2';

// Configure chains with providers
const { chains, provider } = configureChains(
  [polygon, mainnet],
  [publicProvider()]
);

// Create wagmi client
export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Polylender',
      },
    }),
  ],
}); 