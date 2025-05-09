import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';

interface BaseOffer {
  id: string;
  amount: string;
  interest: string;
  duration: string;
  createdAt: string;
}

interface LendingOffer extends BaseOffer {
  lender: string;
}

interface BorrowingOffer extends BaseOffer {
  borrower: string;
  collateral: string;
}

const mockLendingOffers: LendingOffer[] = [
  {
    id: 'LO-001',
    lender: '0x1234...5678',
    amount: '1.5 ETH',
    interest: '5%',
    duration: '30 days',
    createdAt: '2024-02-20',
  },
  {
    id: 'LO-002',
    lender: '0x8765...4321',
    amount: '2.0 ETH',
    interest: '7%',
    duration: '60 days',
    createdAt: '2024-02-19',
  },
];

const mockBorrowingOffers: BorrowingOffer[] = [
  {
    id: 'BO-001',
    borrower: '0xabcd...efgh',
    amount: '1.0 ETH',
    collateral: '2.0 ETH',
    interest: '6%',
    duration: '45 days',
    createdAt: '2024-02-20',
  },
  {
    id: 'BO-002',
    borrower: '0xijkl...mnop',
    amount: '2.5 ETH',
    collateral: '5.0 ETH',
    interest: '4%',
    duration: '90 days',
    createdAt: '2024-02-19',
  },
];

export function Market() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('lending');
  const [sortBy, setSortBy] = useState('interest');
  const [sortOrder, setSortOrder] = useState('asc');

  if (!isConnected) {
    return <ConnectWallet />;
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const renderOffers = () => {
    const offers = activeTab === 'lending' ? mockLendingOffers : mockBorrowingOffers;
    return (
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    {activeTab === 'lending' ? 'Lender' : 'Borrower'}
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  {activeTab === 'borrowing' && (
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Collateral
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('interest')}
                  >
                    Interest {renderSortIcon('interest')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('duration')}
                  >
                    Duration {renderSortIcon('duration')}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    Created {renderSortIcon('createdAt')}
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {offer.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {'lender' in offer ? offer.lender : offer.borrower}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.amount}</td>
                    {activeTab === 'borrowing' && (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {'collateral' in offer ? offer.collateral : ''}
                      </td>
                    )}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.interest}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.duration}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.createdAt}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        type="button"
                        className="text-polylender-purple hover:text-opacity-90"
                        onClick={() => {
                          // TODO: Implement accept offer logic
                          console.log('Accept offer:', offer.id);
                        }}
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-polylender-black">Market</h1>
            <p className="mt-2 text-sm text-gray-700">
              Browse available lending and borrowing offers.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-polylender-purple focus:ring-polylender-purple"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="lending">Lending Offers</option>
              <option value="borrowing">Borrowing Requests</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('lending')}
                  className={`${
                    activeTab === 'lending'
                      ? 'border-polylender-purple text-polylender-purple'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  Lending Offers
                </button>
                <button
                  onClick={() => setActiveTab('borrowing')}
                  className={`${
                    activeTab === 'borrowing'
                      ? 'border-polylender-purple text-polylender-purple'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  Borrowing Requests
                </button>
              </nav>
            </div>
          </div>
        </div>

        {renderOffers()}
      </div>
    </div>
  );
} 