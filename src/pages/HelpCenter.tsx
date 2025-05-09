import { useState } from 'react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'How do I start lending on Polylender?',
    answer:
      'To start lending on Polylender, first connect your wallet using the "Connect Wallet" button. Then, navigate to the Market page where you can see available lending opportunities. Choose a loan that matches your risk profile and click "Lend" to provide liquidity.',
  },
  {
    question: 'What are the risks involved in lending?',
    answer:
      'The main risks in lending include borrower default, smart contract vulnerabilities, and market volatility. We mitigate these risks through collateral requirements, smart contract audits, and automated liquidation mechanisms. Always do your own research and never lend more than you can afford to lose.',
  },
  {
    question: 'How do I borrow funds?',
    answer:
      'To borrow funds, you need to provide collateral in the form of supported cryptocurrencies. Navigate to the Borrow page, select the amount you want to borrow, provide the required collateral, and accept the terms. Your loan will be processed once the transaction is confirmed on the blockchain.',
  },
  {
    question: "What happens if I can't repay my loan?",
    answer:
      'If you cannot repay your loan, the collateral you provided will be liquidated to cover the debt. This is an automated process that occurs when the value of your collateral falls below the liquidation threshold. To avoid liquidation, you can either repay the loan or add more collateral.',
  },
  {
    question: 'How are interest rates determined?',
    answer:
      'Interest rates are determined by market forces, including supply and demand for loans, collateral type, and loan duration. Rates are dynamic and can change based on market conditions. You can view current rates on the Market page.',
  },
  {
    question: 'What cryptocurrencies are supported?',
    answer:
      'Polylender currently supports major cryptocurrencies including ETH, USDC, and other ERC-20 tokens. The list of supported assets is regularly updated based on market demand and security considerations. Check the Market page for the most up-to-date list.',
  },
]

const supportCategories = [
  {
    name: 'Getting Started',
    description: 'Learn the basics of using Polylender',
    icon: '🚀',
    link: '/docs/getting-started',
  },
  {
    name: 'Security',
    description: 'Best practices for securing your funds',
    icon: '🔒',
    link: '/docs/security',
  },
  {
    name: 'Troubleshooting',
    description: 'Common issues and their solutions',
    icon: '🔧',
    link: '/docs/troubleshooting',
  },
  {
    name: 'API Documentation',
    description: 'Technical documentation for developers',
    icon: '📚',
    link: '/docs/api',
  },
]

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How can we help you?
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Find answers to common questions and learn how to use Polylender effectively.
          </p>
        </div>

        {/* Support Categories */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Support Categories</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportCategories.map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group relative rounded-lg border border-gray-200 bg-white p-6 hover:border-purple-500 hover:ring-1 hover:ring-purple-500"
              >
                <div>
                  <span className="inline-flex rounded-lg p-3 text-2xl">{category.icon}</span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    <span className="absolute inset-0" />
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white shadow-sm"
              >
                <button
                  className="flex w-full items-start justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className="ml-6 flex h-7 items-center">
                    <svg
                      className={`h-6 w-6 transform ${
                        openFaq === index ? 'rotate-180' : ''
                      } text-gray-400`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-500">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-16 rounded-lg bg-purple-50 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Still need help?</h2>
            <p className="mt-4 text-gray-500">
              Our support team is here to help you with any questions or issues you may have.
            </p>
            <div className="mt-6">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 