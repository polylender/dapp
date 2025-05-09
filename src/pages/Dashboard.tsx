import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { ConnectWallet } from '../components/ConnectWallet';
import { Link } from 'react-router-dom';

const tabs = [
  { name: 'Active Loans', current: true },
  { name: 'My Offers', current: false },
  { name: 'History', current: false },
];

const mockActiveLoans = [
  {
    id: 'PLID-001',
    type: 'Borrowing',
    amount: '1.5 ETH',
    collateral: '3.0 ETH',
    interest: '5%',
    duration: '30 days',
    status: 'Active',
  },
  {
    id: 'PLID-002',
    type: 'Lending',
    amount: '2.0 ETH',
    collateral: '4.0 ETH',
    interest: '7%',
    duration: '60 days',
    status: 'Active',
  },
];

const mockOffers = [
  {
    id: 'OFFER-001',
    type: 'Lending',
    amount: '1.0 ETH',
    interest: '6%',
    duration: '45 days',
    status: 'Open',
  },
  {
    id: 'OFFER-002',
    type: 'Borrowing',
    amount: '2.5 ETH',
    collateral: '5.0 ETH',
    interest: '4%',
    duration: '90 days',
    status: 'Open',
  },
];

const mockHistory = [
  {
    id: 'PLID-003',
    type: 'Borrowing',
    amount: '0.5 ETH',
    interest: '5%',
    duration: '30 days',
    status: 'Repaid',
    date: '2024-02-15',
  },
  {
    id: 'PLID-004',
    type: 'Lending',
    amount: '1.0 ETH',
    interest: '7%',
    duration: '60 days',
    status: 'Liquidated',
    date: '2024-02-10',
  },
];

const stats = [
  { name: 'Total Value Locked', value: '$25,000', change: '+12.5%', changeType: 'positive' },
  { name: 'Active Loans', value: '3', change: '+1', changeType: 'positive' },
  { name: 'Total Interest Earned', value: '$1,250', change: '+8.3%', changeType: 'positive' },
  { name: 'Available to Borrow', value: '$15,000', change: '-5.2%', changeType: 'negative' },
]

const recentActivity = [
  {
    id: 1,
    type: 'Lending',
    amount: '$10,000',
    asset: 'USDC',
    date: '2024-03-15',
    status: 'Active',
  },
  {
    id: 2,
    type: 'Borrowing',
    amount: '$5,000',
    asset: 'ETH',
    date: '2024-03-10',
    status: 'Active',
  },
  {
    id: 3,
    type: 'Repayment',
    amount: '$2,500',
    asset: 'USDC',
    date: '2024-03-05',
    status: 'Completed',
  },
]

const activeLoans = [
  {
    id: 1,
    type: 'Lending',
    amount: '$10,000',
    asset: 'USDC',
    interest: '8.5%',
    duration: '90 days',
    startDate: '2024-03-15',
    endDate: '2024-06-13',
    status: 'Active',
  },
  {
    id: 2,
    type: 'Borrowing',
    amount: '$5,000',
    asset: 'ETH',
    interest: '12%',
    duration: '60 days',
    startDate: '2024-03-10',
    endDate: '2024-05-09',
    status: 'Active',
  },
]

export function Dashboard() {
  const { isConnected } = useAccount();
  const [selectedTab, setSelectedTab] = useState('Active Loans');

  if (!isConnected) {
    return <ConnectWallet />;
  }

  const renderContent = () => {
    switch (selectedTab) {
      case 'Active Loans':
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
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Collateral
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Interest
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Duration
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockActiveLoans.map((loan) => (
                      <tr key={loan.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {loan.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.type}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.collateral}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.interest}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.duration}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'My Offers':
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
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Interest
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Duration
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockOffers.map((offer) => (
                      <tr key={offer.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {offer.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.type}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.interest}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{offer.duration}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                            {offer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'History':
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
                        Type
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Interest
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Duration
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockHistory.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {item.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.type}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.amount}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.interest}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.duration}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                              item.status === 'Repaid'
                                ? 'bg-green-50 text-green-700 ring-green-600/20'
                                : 'bg-red-50 text-red-700 ring-red-600/20'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-purple-500 p-3">
                  <span className="text-white">📊</span>
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Active Loans */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Active Loans</h2>
              <p className="mt-2 text-sm text-gray-700">
                A list of all your active lending and borrowing positions.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                to="/market"
                className="block rounded-md bg-purple-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                View Market
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Type
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Interest
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Duration
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {activeLoans.map((loan) => (
                        <tr key={loan.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {loan.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {loan.amount} {loan.asset}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.interest}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{loan.duration}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                              {loan.status}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link to={`/loan/${loan.id}`} className="text-purple-600 hover:text-purple-900">
                              View<span className="sr-only">, {loan.id}</span>
                            </Link>
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

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-base font-semibold leading-6 text-gray-900">Recent Activity</h2>
              <p className="mt-2 text-sm text-gray-700">
                A list of your recent lending and borrowing activities.
              </p>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Type
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Amount
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {recentActivity.map((activity) => (
                        <tr key={activity.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {activity.type}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {activity.amount} {activity.asset}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{activity.date}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                activity.status === 'Active'
                                  ? 'bg-green-50 text-green-700'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
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
      </div>
    </div>
  );
} 