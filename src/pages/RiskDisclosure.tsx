import { Link } from 'react-router-dom'

const riskCategories = [
  {
    title: 'Market Risks',
    items: [
      {
        title: 'Price Volatility',
        description:
          'Cryptocurrency prices are highly volatile and can change rapidly. This volatility can affect the value of your collateral and borrowed assets.',
      },
      {
        title: 'Liquidation Risk',
        description:
          'If the value of your collateral falls below the required threshold, your position may be liquidated to protect lenders.',
      },
      {
        title: 'Interest Rate Fluctuations',
        description:
          'Interest rates on loans can change based on market conditions, affecting your borrowing costs or lending returns.',
      },
    ],
  },
  {
    title: 'Technical Risks',
    items: [
      {
        title: 'Smart Contract Risk',
        description:
          'While our smart contracts are audited, there is always a risk of vulnerabilities or bugs that could lead to loss of funds.',
      },
      {
        title: 'Network Congestion',
        description:
          'High network congestion can lead to delayed transactions and higher gas fees, potentially affecting your ability to manage positions.',
      },
      {
        title: 'Technical Failures',
        description:
          'System failures, bugs, or technical issues could temporarily prevent access to the platform or affect transaction processing.',
      },
    ],
  },
  {
    title: 'Operational Risks',
    items: [
      {
        title: 'Wallet Security',
        description:
          'You are responsible for securing your wallet and private keys. Loss of access to your wallet could result in permanent loss of funds.',
      },
      {
        title: 'User Error',
        description:
          'Mistakes in transaction inputs, such as incorrect amounts or addresses, can lead to permanent loss of funds.',
      },
      {
        title: 'Regulatory Changes',
        description:
          'Changes in regulations or legal requirements could affect the availability or terms of our services in your jurisdiction.',
      },
    ],
  },
  {
    title: 'Protocol Risks',
    items: [
      {
        title: 'Liquidity Risk',
        description:
          'Insufficient liquidity in the protocol could affect your ability to enter or exit positions at desired prices.',
      },
      {
        title: 'Protocol Upgrades',
        description:
          'Protocol upgrades or changes could affect the terms of existing positions or require user action to maintain functionality.',
      },
      {
        title: 'Oracle Risk',
        description:
          'Price feeds and oracles used by the protocol may have delays or inaccuracies, potentially affecting position management.',
      },
    ],
  },
]

const riskMitigation = [
  {
    title: 'Security Measures',
    items: [
      'Regular smart contract audits by reputable firms',
      'Bug bounty program for security researchers',
      'Multi-signature wallet controls for protocol funds',
      'Emergency pause functionality for critical situations',
    ],
  },
  {
    title: 'User Protection',
    items: [
      'Clear documentation and educational resources',
      'Warning systems for risky operations',
      'Gradual liquidation process to minimize losses',
      'Transparent fee structure and terms',
    ],
  },
  {
    title: 'Best Practices',
    items: [
      'Never share your private keys or seed phrase',
      'Use hardware wallets for large amounts',
      'Start with small amounts to test the platform',
      'Monitor your positions regularly',
      'Keep sufficient collateral buffer',
    ],
  },
]

export default function RiskDisclosure() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Risk Disclosure
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mt-12 prose prose-purple mx-auto">
          <p>
            This Risk Disclosure Statement outlines the various risks associated with using Polylender.
            Please read this document carefully before using our platform. By using Polylender, you
            acknowledge and accept these risks.
          </p>
        </div>

        {/* Risk Categories */}
        <div className="mt-12 space-y-12">
          {riskCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{category.title}</h2>
              <div className="mt-6 space-y-6">
                {category.items.map((item) => (
                  <div key={item.title}>
                    <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Risk Mitigation */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Risk Mitigation</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {riskMitigation.map((section) => (
              <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex h-6 items-center">
                        <svg
                          className="h-5 w-5 text-purple-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-purple-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Important Disclaimer</h2>
            <p className="mt-4 text-gray-600">
              This Risk Disclosure Statement is not exhaustive and does not cover all risks associated
              with using Polylender. Cryptocurrency lending and borrowing involve significant risks,
              and you should only use funds you can afford to lose. We recommend consulting with
              financial and legal professionals before using our platform.
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Related Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/terms"
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 