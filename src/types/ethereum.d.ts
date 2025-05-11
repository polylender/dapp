// Global type definition for Ethereum provider
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<any>;
    on: (event: string, callback: () => void) => void;
    removeListener: (event: string, callback: () => void) => void;
  };
} 