import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';
import { config } from './config/wagmi';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Lend } from './pages/Lend';
import { Borrow } from './pages/Borrow';
import { Dashboard } from './pages/Dashboard';
import { Market } from './pages/Market';
import { CreateOffer } from './pages/CreateOffer';
import { LoanDetails } from './pages/LoanDetails';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RouteErrorBoundary } from './components/RouteErrorBoundary';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import HelpCenter from './pages/HelpCenter';
import Documentation from './pages/Documentation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RiskDisclosure from './pages/RiskDisclosure';

export function App() {
  return (
    <WagmiConfig config={config}>
      <Router>
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/lend" element={<Lend />} />
                <Route path="/borrow" element={<Borrow />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/market" element={<Market />} />
                <Route path="/create-offer" element={<CreateOffer />} />
                <Route path="/loan/:loanId" element={<LoanDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/risk" element={<RiskDisclosure />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </Router>
    </WagmiConfig>
  );
}

export default App; 