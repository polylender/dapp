import { Link } from 'react-router-dom'

const jobs = [
  {
    id: 1,
    title: 'Senior Smart Contract Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our team to build and maintain secure, efficient smart contracts for our lending protocol.',
    requirements: [
      '5+ years of experience in software development',
      'Strong knowledge of Solidity and smart contract security',
      'Experience with DeFi protocols and blockchain development',
      'Familiarity with testing frameworks and best practices',
    ],
  },
  {
    id: 2,
    title: 'DeFi Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    description: 'Lead the development of new features and improvements for our lending platform.',
    requirements: [
      '3+ years of product management experience',
      'Deep understanding of DeFi and blockchain technology',
      'Strong analytical and problem-solving skills',
      'Experience with user research and data analysis',
    ],
  },
  {
    id: 3,
    title: 'Blockchain Security Engineer',
    department: 'Security',
    location: 'Remote',
    type: 'Full-time',
    description: 'Ensure the security and reliability of our smart contracts and platform.',
    requirements: [
      '4+ years of experience in security engineering',
      'Expertise in smart contract security and auditing',
      'Knowledge of common vulnerabilities and attack vectors',
      'Experience with security tools and frameworks',
    ],
  },
]

const benefits = [
  {
    name: 'Remote First',
    description: 'Work from anywhere in the world with our distributed team.',
    icon: '🌍',
  },
  {
    name: 'Competitive Salary',
    description: 'We offer competitive salaries and token-based compensation.',
    icon: '💰',
  },
  {
    name: 'Learning & Development',
    description: 'Continuous learning opportunities and conference attendance.',
    icon: '📚',
  },
  {
    name: 'Flexible Hours',
    description: "Work when you're most productive with flexible scheduling.",
    icon: '⏰',
  },
  {
    name: 'Health & Wellness',
    description: 'Comprehensive health coverage and wellness programs.',
    icon: '🏥',
  },
  {
    name: 'Team Events',
    description: 'Regular team meetups and virtual events.',
    icon: '🎉',
  },
]

export default function Careers() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Join Our Team</h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Help us build the future of decentralized finance. We're looking for passionate individuals who want to make a difference in the DeFi space.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Why Join Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Benefits & Perks
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe in taking care of our team members and providing an environment where they can thrive.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <span className="text-2xl">{benefit.icon}</span>
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Job listings section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Open Positions</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Current Job Openings
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Check out our current openings and find the perfect role for you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{job.title}</h3>
                <div className="mt-4 flex items-center gap-x-4 text-sm">
                  <span className="rounded-full bg-purple-50 px-3 py-1 font-medium text-purple-600">
                    {job.department}
                  </span>
                  <span className="text-gray-500">{job.location}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{job.type}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{job.description}</p>
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-900">Requirements:</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                    {job.requirements.map((requirement, index) => (
                      <li key={index}>{requirement}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <Link
                    to={`/careers/${job.id}`}
                    className="text-sm font-semibold leading-6 text-purple-600 hover:text-purple-500"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Don&apos;t see the right role?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/contact"
              className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 