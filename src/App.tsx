/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { useLayoutState } from './hooks/useLayoutState';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

const BentoAccordion = lazy(() => import('./components/BentoAccordion'));
const PricingMatrix = lazy(() => import('./components/PricingMatrix'));
const CTASection = lazy(() => import('./components/CTASection'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  const {
    activeBentoId,
    mobileMenuOpen,
    activeSection,
    isHeaderScrolled,
    toggleMobileMenu,
    closeMobileMenu,
    changeBentoId,
  } = useLayoutState('agent-hub');

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between selection:bg-[#7C3AED]/30 selection:text-white" id="app-container">
      
      {/* Scroll-spy Header Navigation */}
      <Header
        activeSection={activeSection}
        isScrolled={isHeaderScrolled}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />

      {/* Primary Semantic Landing Sections */}
      <main className="flex-1" id="main-content">
        
        {/* Hero Section with Live Telemetry */}
        <HeroSection />

        {/* Feature 2: Bento Accordion Interactive Playground */}
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs font-mono text-white/30">Loading interactive sandbox...</div>}>
          <BentoAccordion
            activeId={activeBentoId}
            onActiveIdChange={changeBentoId}
          />
        </Suspense>

        {/* Feature 1: Interactive Pricing Matrix with Seats Slider */}
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-xs font-mono text-white/30">Loading pricing matrix...</div>}>
          <PricingMatrix />
        </Suspense>

        {/* Call to Action Section & FAQ */}
        <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center text-xs font-mono text-white/30">Loading access request...</div>}>
          <CTASection />
        </Suspense>

      </main>

      {/* Global Brand Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

    </div>
  );
}
