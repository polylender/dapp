import React, { useState } from 'react';
import { useConnect, useAccount } from 'wagmi';
import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected, metaMask, walletConnect, coinbaseWallet } from 'wagmi/connectors';
import { Loading } from './Loading';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  connector: any;
}

const walletOptions: WalletOption[] = [
  {
    id: 'injected',
    name: 'Browser Wallet',
    icon: '🌐',
    connector: injected(),
  },
  {
    id: 'metaMask',
    name: 'MetaMask',
    icon: '🦊',
    connector: metaMask(),
  },
  {
    id: 'walletConnect',
    name: 'WalletConnect',
    icon: '🔗',
    connector: walletConnect({ projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID }),
  },
  {
    id: 'coinbaseWallet',
    name: 'Coinbase Wallet',
    icon: '💰',
    connector: coinbaseWallet({ appName: 'Polylender' }),
  },
];

export function ConnectWallet() {
  const { connect, isPending, error } = useConnect();
  const { address, isConnected } = useAccount();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const handleConnect = async (connector: any) => {
    try {
      setSelectedWallet(connector.id);
      await connect({ connector });
    } catch (err) {
      console.error('Connection error:', err);
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => {}}
      >
        Connect Wallet
      </button>

      <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg">
        <div className="py-1">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleConnect(wallet.connector)}
              disabled={isPending}
            >
              <span className="mr-2">{wallet.icon}</span>
              {wallet.name}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
} 