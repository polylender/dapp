import { useState } from 'react'
import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction to Polylender',
        description: 'Learn about the core concepts and features of Polylender',
        link: '/docs/introduction',
      },
      {
        title: 'Quick Start Guide',
        description: 'Get up and running with Polylender in minutes',
        link: '/docs/quickstart',
      },
      {
        title: 'Supported Networks',
        description: 'Overview of supported blockchain networks and tokens',
        link: '/docs/networks',
      },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      {
        title: 'Lending Protocol',
        description: 'Understanding how the lending protocol works',
        link: '/docs/lending-protocol',
      },
      {
        title: 'Collateral Management',
        description: 'How collateral is managed and liquidated',
        link: '/docs/collateral',
      },
      {
        title: 'Interest Rates',
        description: 'How interest rates are calculated and applied',
        link: '/docs/interest-rates',
      },
    ],
  },
  {
    title: 'Smart Contracts',
    items: [
      {
        title: 'Contract Architecture',
        description: 'Overview of the smart contract system',
        link: '/docs/contracts/architecture',
      },
      {
        title: 'Security Audits',
        description: 'Details of security audits and best practices',
        link: '/docs/contracts/security',
      },
      {
        title: 'Contract Addresses',
        description: 'List of deployed contract addresses by network',
        link: '/docs/contracts/addresses',
      },
    ],
  },
  {
    title: 'API Reference',
    items: [
      {
        title: 'REST API',
        description: 'Complete REST API documentation',
        link: '/docs/api/rest',
      },
      {
        title: 'WebSocket API',
        description: 'Real-time data streaming API documentation',
        link: '/docs/api/websocket',
      },
      {
        title: 'SDK Reference',
        description: 'JavaScript/TypeScript SDK documentation',
        link: '/docs/api/sdk',
      },
    ],
  },
]

const codeExamples = [
  {
    title: 'Connect to Polylender',
    language: 'typescript',
    code: `import { PolylenderClient } from '@polylender/sdk'

const client = new PolylenderClient({
  network: 'polygon',
  apiKey: 'your-api-key'
})`,
  },
  {
    title: 'Create a Lending Position',
    language: 'typescript',
    code: `const position = await client.lending.createPosition({
  asset: 'USDC',
  amount: '1000',
  duration: '30d',
  interestRate: '8.5'
})`,
  },
  {
    title: 'Monitor Loan Status',
    language: 'typescript',
    code: `const loan = await client.loans.getStatus(loanId)

client.loans.subscribe(loanId, (update) => {
  console.log('Loan status:', update.status)
  console.log('Current value:', update.currentValue)
})`,
  },
]

export default function Documentation() {
  const [selectedExample, setSelectedExample] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Comprehensive guides and API documentation for Polylender.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
              <div className="mt-4 space-y-4">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    to={item.link}
                    className="block rounded-lg p-4 hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Code Examples */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Code Examples</h2>
          <div className="mt-6">
            <div className="flex space-x-4">
              {codeExamples.map((example, index) => (
                <button
                  key={example.title}
                  onClick={() => setSelectedExample(index)}
                  className={`rounded-md px-4 py-2 text-sm font-medium ${
                    selectedExample === index
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-gray-900 p-4">
              <pre className="overflow-x-auto">
                <code className="text-sm text-gray-100">
                  {codeExamples[selectedExample].code}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 rounded-lg bg-purple-50 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Additional Resources</h2>
            <p className="mt-4 text-gray-500">
              Explore our GitHub repositories, join the community, and stay updated with the latest
              developments.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <Link
                to="https://github.com/polylender"
                className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                GitHub
              </Link>
              <Link
                to="https://discord.gg/polylender"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Discord
              </Link>
              <Link
                to="https://twitter.com/polylender"
                className="inline-flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 