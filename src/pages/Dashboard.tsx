import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';

const stats = [
  { name: 'Total Value Locked', value: '$1.2M', change: '+12.3%', changeType: 'increase' },
  { name: 'Active Loans', value: '24', change: '+4', changeType: 'increase' },
  { name: 'Total Interest Earned', value: '$45.2K', change: '+8.1%', changeType: 'increase' },
  { name: 'Default Rate', value: '0.5%', change: '-0.2%', changeType: 'decrease' },
];

const recentActivity = [
  {
    id: 1,
    type: 'loan_created',
    amount: '5,000 USDC',
    interest: '8.5%',
    duration: '30 days',
    timestamp: '2 hours ago',
    status: 'active',
  },
  {
    id: 2,
    type: 'loan_repaid',
    amount: '2,500 USDC',
    interest: '7.2%',
    duration: '15 days',
    timestamp: '5 hours ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'collateral_added',
    amount: '1.5 ETH',
    value: '$3,000',
    timestamp: '1 day ago',
    status: 'completed',
  },
];

export function Dashboard() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-screen p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
        <p className="text-gray-600 mb-6">Please connect your wallet in the header to view your dashboard</p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Here's an overview of your lending and borrowing activity.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
                <div className={`mt-2 text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {['overview', 'active loans', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab
                      ? 'border-polylender-purple text-polylender-purple'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                  <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Type</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Details</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
                              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {recentActivity.map((activity) => (
                              <tr key={activity.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                  {activity.type.replace('_', ' ').toUpperCase()}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{activity.amount}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {activity.interest && `${activity.interest} / ${activity.duration}`}
                                  {activity.value && activity.value}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{activity.timestamp}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                    activity.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {activity.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'active loans' && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No active loans</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new loan.</p>
                <div className="mt-6">
                  <Link
                    to="/lend"
                    className="inline-flex items-center rounded-md bg-polylender-purple px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-polylender-purple/90"
                  >
                    Create Loan
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No history</h3>
                <p className="mt-1 text-sm text-gray-500">Your loan history will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 