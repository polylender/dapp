import React from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useParams, useNavigate } from 'react-router-dom';
import { ConnectWallet } from '../components/ConnectWallet';

interface LoanDetails {
  id: string;
  type: 'lending' | 'borrowing';
  amount: string;
  collateral?: string;
  interest: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'repaid' | 'liquidated';
  lender: string;
  borrower: string;
  repayments: {
    date: string;
    amount: string;
    type: 'principal' | 'interest';
  }[];
}

const mockLoanDetails: LoanDetails = {
  id: 'PLID-001',
  type: 'borrowing',
  amount: '1.5 ETH',
  collateral: '3.0 ETH',
  interest: '5%',
  duration: '30 days',
  startDate: '2024-02-15',
  endDate: '2024-03-16',
  status: 'active',
  lender: '0x1234...5678',
  borrower: '0xabcd...efgh',
  repayments: [
    {
      date: '2024-02-20',
      amount: '0.5 ETH',
      type: 'principal',
    },
    {
      date: '2024-02-20',
      amount: '0.025 ETH',
      type: 'interest',
    },
  ],
};

export function LoanDetails() {
  const { isConnected } = useAccount();
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();

  if (!isConnected) {
    return <ConnectWallet />;
  }

  const handleRepay = () => {
    // TODO: Implement repayment logic
    console.log('Repay loan:', loanId);
  };

  const handleLiquidate = () => {
    // TODO: Implement liquidation logic
    console.log('Liquidate loan:', loanId);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-sm font-medium text-polylender-purple hover:text-opacity-90"
            >
              ← Back
            </button>
            <h1 className="mt-2 text-2xl font-semibold text-polylender-black">
              Loan Details - {mockLoanDetails.id}
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              View detailed information about this loan.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Loan Information</h3>
              <dl className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{mockLoanDetails.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.amount}</dd>
                </div>
                {mockLoanDetails.collateral && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Collateral</dt>
                    <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.collateral}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-sm font-medium text-gray-500">Interest Rate</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.interest}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                        mockLoanDetails.status === 'active'
                          ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                          : mockLoanDetails.status === 'repaid'
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                          : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                      }`}
                    >
                      {mockLoanDetails.status.charAt(0).toUpperCase() + mockLoanDetails.status.slice(1)}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Participants</h3>
              <dl className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Lender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.lender}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Borrower</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.borrower}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.startDate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">End Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{mockLoanDetails.endDate}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Repayment History</h3>
              <div className="mt-4 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Amount
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Type
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockLoanDetails.repayments.map((repayment, index) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
                              {repayment.date}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {repayment.amount}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                              {repayment.type}
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

        {mockLoanDetails.status === 'active' && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleRepay}
              className="inline-flex justify-center rounded-md border border-transparent bg-polylender-purple py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-polylender-purple focus:ring-offset-2"
            >
              Repay Loan
            </button>
            {mockLoanDetails.type === 'lending' && (
              <button
                type="button"
                onClick={handleLiquidate}
                className="inline-flex justify-center rounded-md border border-red-300 bg-white py-2 px-4 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Liquidate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 