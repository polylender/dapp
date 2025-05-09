import { Link, useLocation } from 'react-router-dom'
import { ConnectWallet } from './ConnectWallet'
import { useState } from 'react'

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ],
  products: [
    { name: 'Lend', href: '/lend' },
    { name: 'Borrow', href: '/borrow' },
    { name: 'Market', href: '/market' },
    { name: 'Dashboard', href: '/dashboard' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Documentation', href: '/docs' },
    { name: 'FAQs', href: '/help' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Risk Disclosure', href: '/risk' },
  ],
}

export function Header() {
  const location = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  return (
    <header className="bg-[#0A0A0A] border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Polylender
              </span>
            </Link>
            <div className="ml-10 hidden space-x-8 lg:flex">
              {/* Desktop Navigation Dropdowns */}
              {/* Company Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('company')}
                  className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                >
                  Company
                  <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'company' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {navigation.company.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === item.href ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                          }`}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('products')}
                  className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                >
                  Products
                  <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'products' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {navigation.products.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === item.href ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                          }`}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Support Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('support')}
                  className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                >
                  Support
                  <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'support' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {navigation.support.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === item.href ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                          }`}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Legal Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('legal')}
                  className="text-sm font-medium transition-colors duration-200 text-gray-300 hover:text-purple-400"
                >
                  Legal
                  <svg className="ml-1 w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openDropdown === 'legal' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {navigation.legal.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`block px-4 py-2 text-sm ${
                            location.pathname === item.href ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
                          }`}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ConnectWallet />
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Company Section */}
              <div className="py-2">
                <div className="px-3 text-sm font-semibold text-gray-300">Company</div>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-md px-3 py-2 text-base ${
                      location.pathname === item.href ? 'bg-gray-800 text-purple-400' : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Products Section */}
              <div className="py-2">
                <div className="px-3 text-sm font-semibold text-gray-300">Products</div>
                {navigation.products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-md px-3 py-2 text-base ${
                      location.pathname === item.href ? 'bg-gray-800 text-purple-400' : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Support Section */}
              <div className="py-2">
                <div className="px-3 text-sm font-semibold text-gray-300">Support</div>
                {navigation.support.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-md px-3 py-2 text-base ${
                      location.pathname === item.href ? 'bg-gray-800 text-purple-400' : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Legal Section */}
              <div className="py-2">
                <div className="px-3 text-sm font-semibold text-gray-300">Legal</div>
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block rounded-md px-3 py-2 text-base ${
                      location.pathname === item.href ? 'bg-gray-800 text-purple-400' : 'text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 