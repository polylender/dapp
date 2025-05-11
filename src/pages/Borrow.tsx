import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';

const marketStats = [
  { name: 'Available to Borrow', value: '$3.8M', change: '+8.3%', changeType: 'increase' },
  { name: 'Average Interest Rate', value: '7.2%', change: '-0.3%', changeType: 'decrease' },
  { name: 'Active Borrowers', value: '89', change: '+5', changeType: 'increase' },
  { name: 'Average Collateral Ratio', value: '150%', change: '+5%', changeType: 'increase' },
];

const borrowingSteps = [
  {
    name: 'Create Loan Request',
    description: 'Define your borrowing needs including amount, interest rate, duration, and provide collateral.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'Lock Collateral',
    description: 'Your collateral is locked in the smart contract when you create the request.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    name: 'Match with Lender',
    description: 'Lenders can browse and accept your request, or you can browse and accept lender offers.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    name: 'Repay Loan',
    description: 'Repay the principal plus interest before the deadline to reclaim your collateral.',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

export function Borrow() {
  const { isConnected } = useAccount();
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    collateral: '',
  });

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">Please connect your wallet in the header to start borrowing</p>
      </motion.div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Borrowing Request</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount to Borrow
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration (days)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={formData.duration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="collateral" className="block text-sm font-medium text-gray-700">
                Collateral Amount
              </label>
              <input
                type="number"
                name="collateral"
                id="collateral"
                value={formData.collateral}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Borrowing Request
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Market Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Available to Borrow</h3>
              <p className="text-3xl font-bold text-indigo-600">$0.00</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Average Interest Rate</h3>
              <p className="text-3xl font-bold text-indigo-600">0%</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Active Borrowers</h3>
              <p className="text-3xl font-bold text-indigo-600">0</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">Average Collateral Ratio</h3>
              <p className="text-3xl font-bold text-indigo-600">0%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 