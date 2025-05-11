import React from 'react';
import Header from '../components/Header';
import { WalletDemo } from '../components/WalletDemo';
import { AppKitProvider } from '../providers/AppKitProvider';

export default function DemoPage() {
  return (
    <AppKitProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        
        <main className="pt-24 px-4 pb-12">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Polylender Platform
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                A decentralized P2P lending platform that connects borrowers and lenders directly through blockchain technology.
              </p>
            </div>
            
            <div className="mt-12">
              <WalletDemo />
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Lend Assets</h2>
                <p className="text-gray-300">Earn interest by lending your crypto assets to verified borrowers. Set your terms and rates.</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
                  Start Lending
                </button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Borrow Assets</h2>
                <p className="text-gray-300">Get quick access to crypto loans with competitive rates and flexible repayment terms.</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Apply for Loan
                </button>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
                <p className="text-gray-300">Explore the current lending and borrowing rates across different assets and terms.</p>
                <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  View Market
                </button>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-8 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2023 Polylender. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </AppKitProvider>
  );
}