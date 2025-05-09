import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Agreement to Terms',
    content: [
      'By accessing or using Polylender, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.',
      'These Terms constitute a legally binding agreement between you and Polylender regarding your use of our decentralized lending platform.',
    ],
  },
  {
    title: 'Eligibility',
    content: [
      'To use Polylender, you must:',
      'Be at least 18 years old',
      'Have the legal capacity to enter into binding contracts',
      'Not be prohibited from using the platform under applicable laws',
      'Have a compatible digital wallet and sufficient funds',
    ],
  },
  {
    title: 'Platform Services',
    content: [
      'Polylender provides the following services:',
      'Decentralized lending and borrowing of digital assets',
      'Collateral management and liquidation',
      'Interest rate calculations and payments',
      'Transaction processing and settlement',
      'We reserve the right to modify or discontinue any service at any time.',
    ],
  },
  {
    title: 'User Responsibilities',
    content: [
      'As a user of Polylender, you agree to:',
      'Provide accurate and complete information',
      'Maintain the security of your wallet and credentials',
      'Comply with all applicable laws and regulations',
      'Not engage in any fraudulent or malicious activities',
      'Accept responsibility for all transactions made through your wallet',
    ],
  },
  {
    title: 'Risk Disclosure',
    content: [
      'Using Polylender involves certain risks:',
      'Market volatility and price fluctuations',
      'Smart contract vulnerabilities',
      'Network congestion and transaction delays',
      'Potential loss of funds due to liquidation',
      'You should only use funds you can afford to lose.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content and materials on Polylender are protected by intellectual property rights:',
      'The platform, including its code and design, is owned by Polylender',
      'User content remains the property of the respective users',
      'You may not copy, modify, or distribute our materials without permission',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'Polylender is not liable for:',
      'Loss of funds due to market conditions',
      'Technical issues or service interruptions',
      'Actions of third parties',
      'Indirect or consequential damages',
      'Our liability is limited to the extent permitted by law.',
    ],
  },
  {
    title: 'Termination',
    content: [
      'We may terminate or suspend your access to Polylender:',
      'For violations of these Terms',
      'To comply with legal requirements',
      'For security reasons',
      'At our sole discretion',
      'You may terminate your use of the platform at any time.',
    ],
  },
]

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mt-12 prose prose-purple mx-auto">
          <p>
            Welcome to Polylender. These Terms of Service govern your use of our decentralized lending
            platform. Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
              <div className="mt-4 space-y-2">
                {section.content.map((item, index) => (
                  <p key={index} className="text-gray-600">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-purple-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-gray-500">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-6">
              <a
                href="mailto:legal@polylender.com"
                className="text-purple-600 hover:text-purple-500"
              >
                legal@polylender.com
              </a>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Related Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              to="/privacy"
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Privacy Policy
            </Link>
            <Link
              to="/risk-disclosure"
              className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Risk Disclosure
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 