import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';

const offerTypes = [
  { id: 'lending', name: 'Lending Offer', description: 'Create an offer to lend your assets' },
  { id: 'borrowing', name: 'Borrowing Request', description: 'Create a request to borrow assets' },
];

const durationOptions = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
];

export function CreateOffer() {
  const { isConnected } = useAccount();
  const [offerType, setOfferType] = useState('lending');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [duration, setDuration] = useState('30');
  const [collateral, setCollateral] = useState('');

  if (!isConnected) {
    return <ConnectWallet />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement offer creation logic
    console.log({
      offerType,
      amount,
      interest,
      duration,
      collateral: offerType === 'borrowing' ? collateral : undefined,
    });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-polylender-black">Create Offer</h1>
            <p className="mt-2 text-sm text-gray-700">
              Create a new lending offer or borrowing request.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="space-y-6">
            <div>
              <label className="text-base font-semibold text-gray-900">Offer Type</label>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
                {offerTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                      offerType === type.id
                        ? 'border-polylender-purple ring-2 ring-polylender-purple'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setOfferType(type.id)}
                  >
                    <div className="flex flex-1">
                      <div className="flex flex-col">
                        <span className="block text-sm font-medium text-gray-900">{type.name}</span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          {type.description}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center ${
                        offerType === type.id
                          ? 'border-polylender-purple'
                          : 'border-transparent'
                      }`}
                    >
                      {offerType === type.id && (
                        <div className="h-2.5 w-2.5 rounded-full bg-polylender-purple" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount (ETH)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    step="0.01"
                    min="0"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-polylender-purple focus:ring-polylender-purple sm:text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                  Interest Rate (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="interest"
                    id="interest"
                    step="0.1"
                    min="0"
                    required
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-polylender-purple focus:ring-polylender-purple sm:text-sm"
                    placeholder="0.0"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <div className="mt-1">
                  <select
                    id="duration"
                    name="duration"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-polylender-purple focus:ring-polylender-purple sm:text-sm"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {offerType === 'borrowing' && (
                <div>
                  <label htmlFor="collateral" className="block text-sm font-medium text-gray-700">
                    Collateral Amount (ETH)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="collateral"
                      id="collateral"
                      step="0.01"
                      min="0"
                      required
                      value={collateral}
                      onChange={(e) => setCollateral(e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-polylender-purple focus:ring-polylender-purple sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}

              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-polylender-purple focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-polylender-purple py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-polylender-purple focus:ring-offset-2"
                  >
                    Create Offer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 