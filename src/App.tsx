import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/open-design-enhancements.css';
import './styles/identity-unified.css';
import { NavbarUnified } from './components/NavbarUnified';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Hero } from './components/Hero';
import { DemoPreview } from './components/DemoPreview';
import { BeforeAfter } from './components/BeforeAfter';
import { ProductShowcase } from './components/ProductShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { Pricing } from './components/Pricing';
import { Integrations } from './components/Integrations';
import { Comparison } from './components/Comparison';
import { TrustSection } from './components/TrustSection';
import { FAQ as FaqSection } from './components/FAQ';
import { CTASection } from './components/CTASection';
import DirectAccess from './components/EarlyAccess';
import { FooterEnhanced } from './components/FooterEnhanced';
import { PrivacyPolicy, TermsOfService, Disclaimer } from './components/LegalPages';
import { Documentation } from './components/Documentation';
import { Changelog } from './components/Changelog';
import { LanguageProvider } from './contexts/LanguageContext';
import { ParticleNetwork } from './components/ParticleNetwork';
import { GlitchScanEffect } from './components/GlitchScanEffect';
import { TerminalNotifications } from './components/TerminalNotifications';
import { SoundDesign } from './components/SoundDesign';
import { ShaderEffects } from './components/WebGLShaders';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';

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
      <DirectAccess />
      <Pricing />
      <Integrations />
      <Comparison />
      <TrustSection />
      <FaqSection />
      <CTASection />
    </main>
  );
}

// Register service worker for PWA
function useServiceWorker() {
  useEffect(() => {
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
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

// Wrapper component to provide navigate function to legal pages
function LegalPageWrapper({ Component }: { Component: React.ComponentType<{ onBack: () => void }> }) {
  const navigate = useNavigate();
  return <Component onBack={() => navigate(-1)} />;
}

function App() {
  useServiceWorker();
  const location = useLocation();

  return (
    <ErrorBoundary>
      <LanguageProvider>
      <div className="min-h-screen bg-anarchy-dark overflow-x-hidden">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Background Effects */}
        <ShaderEffects />
        <ParticleNetwork />
        <GlitchScanEffect />
        <TerminalNotifications />
        <SoundDesign />

        <NavbarUnified />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } />
            <Route path="/docs" element={
              <PageTransition>
                <Documentation />
              </PageTransition>
            } />
            <Route path="/changelog" element={
              <PageTransition>
                <Changelog />
              </PageTransition>
            } />
            <Route path="/privacy" element={
              <PageTransition>
                <LegalPageWrapper Component={PrivacyPolicy} />
              </PageTransition>
            } />
            <Route path="/terms" element={
              <PageTransition>
                <LegalPageWrapper Component={TermsOfService} />
              </PageTransition>
            } />
            <Route path="/disclaimer" element={
              <PageTransition>
                <LegalPageWrapper Component={Disclaimer} />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
        <FooterEnhanced />
      </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
