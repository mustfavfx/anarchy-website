import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Hero } from './components/Hero';
import { DemoPreview } from './components/DemoPreview';
import { BeforeAfter } from './components/BeforeAfter';
import { ProductShowcase } from './components/ProductShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { UseCases } from './components/UseCases';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Integrations } from './components/Integrations';
import { Comparison } from './components/Comparison';
import { TrustSection } from './components/TrustSection';
import { FAQ } from './components/FAQ';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { PrivacyPolicy, TermsOfService, Disclaimer } from './components/LegalPages';

const presets = [
  'Photorealistic Render', 'Golden Hour', 'Rainy Day', 'Autumn Scene',
  'Night Scene', 'Cozy Night + LEDs', 'Fog', 'Volumetric Rays',
  'Winter / Snow', 'Construction State', 'Developer Finish', 'Match Mood',
  'Photorealistic Render', 'Golden Hour', 'Rainy Day', 'Autumn Scene',
  'Night Scene', 'Cozy Night + LEDs', 'Fog', 'Volumetric Rays',
];

function HomePage() {
  return (
    <main>
      <Hero />

      {/* Presets marquee strip */}
      <div className="relative overflow-hidden py-5 border-t border-b border-white/[0.05]" aria-hidden="true">
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {presets.map((preset, i) => (
            <span
              key={`${preset}-${i}`}
              className="inline-flex items-center gap-2 text-xs text-gray-500 px-4 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.02] flex-shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-anarchy-red/50" />
              {preset}
            </span>
          ))}
        </div>
      </div>

      <DemoPreview />
      <BeforeAfter />
      <ProductShowcase />
      <WorkflowSection />
      <UseCases />
      <Features />
      <Pricing />
      <Integrations />
      <Comparison />
      <TrustSection />
      <FAQ />
      <CTASection />
    </main>
  );
}

// Register service worker for PWA
function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registered:', registration.scope);
        })
        .catch((error) => {
          console.log('[SW] Registration failed:', error);
        });
    }
  }, []);
}

function App() {
  useServiceWorker();

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-anarchy-dark overflow-x-hidden">
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy onBack={() => window.history.back()} />} />
        <Route path="/terms" element={<TermsOfService onBack={() => window.history.back()} />} />
        <Route path="/disclaimer" element={<Disclaimer onBack={() => window.history.back()} />} />
      </Routes>
      <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
