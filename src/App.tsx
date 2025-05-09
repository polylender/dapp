import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppKitProvider } from './providers/AppKitProvider';
import { Layout } from './components/layout/Layout';
import { About } from './pages/About';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import { Dashboard } from './pages/Dashboard';
import HelpCenter from './pages/HelpCenter';
import Documentation from './pages/Documentation';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import RiskDisclosure from './pages/RiskDisclosure';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <AppKitProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/risk" element={<RiskDisclosure />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </AppKitProvider>
    </ErrorBoundary>
  );
}

export default App; 