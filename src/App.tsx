import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { UseCases } from './components/UseCases';
import { Features } from './components/Features';
import { Integrations } from './components/Integrations';
import { Comparison } from './components/Comparison';
import { PricingPreview } from './components/PricingPreview';
import { Pricing } from './components/Pricing';
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

      <ProductShowcase />
      <WorkflowSection />
      <UseCases />
      <Features />
      <Integrations />
      <Comparison />
      <PricingPreview />
      <div id="pricing-full">
        <Pricing />
      </div>
      <FAQ />
      <CTASection />
    </main>
  );
}

function App() {
  return (
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
  );
}

export default App;
