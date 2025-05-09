import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'When you use Polylender, we collect certain information to provide and improve our services:',
      'Wallet addresses and transaction history',
      'Network information and device data',
      'Usage patterns and preferences',
      'Communication data when you contact our support team',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'We use the collected information for the following purposes:',
      'To provide and maintain our lending and borrowing services',
      'To process transactions and manage your account',
      'To improve our platform and user experience',
      'To communicate with you about your account and our services',
      'To comply with legal obligations and prevent fraud',
    ],
  },
  {
    title: 'Information Sharing',
    content: [
      'We may share your information with:',
      'Service providers who assist in operating our platform',
      'Legal authorities when required by law',
      'Third parties with your explicit consent',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    title: 'Data Security',
    content: [
      'We implement appropriate security measures to protect your information:',
      'Encryption of sensitive data',
      'Regular security audits and updates',
      'Access controls and authentication mechanisms',
      'Secure data storage and transmission',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'You have the right to:',
      'Access your personal information',
      'Correct inaccurate data',
      'Request deletion of your data',
      'Opt-out of marketing communications',
      'Export your data in a portable format',
    ],
  },
  {
    title: 'Cookies and Tracking',
    content: [
      'We use cookies and similar technologies to:',
      'Remember your preferences',
      'Analyze platform usage',
      'Improve our services',
      'You can control cookie settings through your browser.',
    ],
  },
]

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Last updated: March 15, 2024
          </p>
        </div>

        {/* Introduction */}
        <div className="mt-12 prose prose-purple mx-auto">
          <p>
            At Polylender, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, and protect your personal information when you use our decentralized lending platform.
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
              If you have any questions about this Privacy Policy or our data practices, please contact
              us at:
            </p>
            <div className="mt-6">
              <a
                href="mailto:privacy@polylender.com"
                className="text-purple-600 hover:text-purple-500"
              >
                privacy@polylender.com
              </a>
            </div>
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