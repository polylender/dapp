import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModernHeader } from './ModernHeader';
import { AppKitProvider } from '../providers/AppKitProvider';

// Example dashboard page
const Dashboard = () => (
  <div className="container mx-auto px-4 pt-20">
    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Portfolio Balance</h2>
        <p className="text-2xl text-purple-400">$1,245.00</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Active Loans</h2>
        <p className="text-2xl text-purple-400">3</p>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Interest Earned</h2>
        <p className="text-2xl text-purple-400">$45.34</p>
      </div>
    </div>
  </div>
);

// Example help page
const Help = () => (
  <div className="container mx-auto px-4 pt-20">
    <h1 className="text-3xl font-bold mb-6">Help Center</h1>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-purple-400">How do I connect my wallet?</h3>
          <p className="mt-2">Click on the "Connect Wallet" button in the header and select your preferred wallet.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-purple-400">Which networks are supported?</h3>
          <p className="mt-2">We currently support Polygon, Ethereum, and Base networks.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-purple-400">How do I create a loan offer?</h3>
          <p className="mt-2">Navigate to the Lend page, connect your wallet, and follow the guided process.</p>
        </div>
      </div>
    </div>
  </div>
);

// Example home page
const Home = () => (
  <div className="container mx-auto px-4 pt-20">
    <div className="flex flex-col items-center justify-center text-center py-12">
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        Decentralized P2P Lending
      </h1>
      <p className="text-xl text-gray-300 max-w-2xl mb-10">
        Connect your wallet to start lending or borrowing crypto assets with competitive rates and flexible terms.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4 text-white">Lend</h2>
          <p className="text-gray-400">Earn interest by lending your crypto assets to borrowers.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4 text-white">Borrow</h2>
          <p className="text-gray-400">Get crypto loans with flexible terms to suit your needs.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4 text-white">Trade</h2>
          <p className="text-gray-400">Explore the marketplace for the best lending and borrowing opportunities.</p>
        </div>
      </div>
    </div>
  </div>
);

export function AppExample() {
  return (
    <AppKitProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <ModernHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/help" element={<Help />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AppKitProvider>
  );
} 