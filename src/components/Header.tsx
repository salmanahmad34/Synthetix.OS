/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback } from 'react';
import { Sparkles, Menu, X, Terminal, Cpu } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  isScrolled: boolean;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
}

export default function Header({
  activeSection,
  isScrolled,
  mobileMenuOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: HeaderProps) {
  
  const handleScrollToSection = useCallback((id: string) => {
    onCloseMobileMenu();
    const element = document.getElementById(id);
    if (element) {
      // Offset for header height
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [onCloseMobileMenu]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-350 ease-in-out ${
      isScrolled 
        ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-lg shadow-black/30' 
        : 'bg-transparent py-6'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" id="header-nav" aria-label="Primary Website Navigation">
        
        {/* Brand logo */}
        <button
          id="logo-btn"
          onClick={() => handleScrollToSection('hero')}
          aria-label="Synthetix.OS logo - Scroll back to home screen"
          className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
        >
          <div className="w-5 h-5 bg-[#7C3AED] rounded-sm shadow-[0_0_10px_rgba(124,58,237,0.5)]" aria-hidden="true"></div>
          <span className="font-display font-black tracking-tighter text-lg uppercase">
            Synthetix<span className="text-[#7C3AED]">.OS</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-sm border border-white/10" role="menubar" aria-label="Main navigation items">
          {[
            { id: 'hero', label: '01—Home' },
            { id: 'features', label: '02—Features' },
            { id: 'pricing', label: '03—Pricing' },
            { id: 'faq', label: '04—Specs' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} role="none">
                <button
                  id={`nav-link-${item.id}`}
                  onClick={() => handleScrollToSection(item.id)}
                  aria-label={`Scroll to ${item.label.substring(3)} section`}
                  aria-current={isActive ? "page" : undefined}
                  role="menuitem"
                  className={`px-4 py-1 rounded-sm font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-150 ease-out cursor-pointer ${
                    isActive 
                      ? 'bg-[#7C3AED] text-white shadow-sm' 
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Action button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-action-pricing"
            onClick={() => handleScrollToSection('pricing')}
            aria-label="Read pricing details and hardware specifications"
            className="text-[10px] font-mono tracking-widest uppercase text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            System Specs
          </button>
          <button
            id="nav-action-sandbox"
            onClick={() => handleScrollToSection('features')}
            aria-label="Join our beta program to test features"
            className="border border-white/20 px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-150 ease-out rounded-none cursor-pointer"
          >
            Join Beta
          </button>
        </div>

        {/* Mobile menu triggers */}
        <button
          id="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-drawer"
          className="md:hidden w-12 h-12 flex items-center justify-center rounded-sm border border-white/20 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-150 ease-out cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>

      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-x-0 top-[73px] bottom-0 bg-[#0a0a0a] border-t border-white/10 z-40 p-6 flex flex-col justify-between md:hidden animate-fade-in-up" 
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation menu"
        >
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 block">Navigation Nodes</span>
            <ul className="flex flex-col gap-2" role="menu" aria-label="Mobile navigation links">
              {[
                { id: 'hero', label: '01—Home' },
                { id: 'features', label: '02—Features' },
                { id: 'pricing', label: '03—Pricing' },
                { id: 'faq', label: '04—Specs' },
              ].map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id} role="none">
                    <button
                      id={`mobile-nav-link-${item.id}`}
                      onClick={() => handleScrollToSection(item.id)}
                      aria-label={`Scroll to ${item.label.substring(3)} section`}
                      aria-current={isActive ? "page" : undefined}
                      role="menuitem"
                      className={`w-full text-left p-4 rounded-none font-display font-black text-sm uppercase border transition-all duration-150 ease-out cursor-pointer ${
                        isActive 
                          ? 'bg-[#7C3AED] border-transparent text-white shadow-md' 
                          : 'bg-transparent border-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              id="mobile-nav-sandbox"
              onClick={() => handleScrollToSection('features')}
              aria-label="Launch interactive developer sandbox playground"
              className="w-full py-3.5 border border-white/20 text-white font-mono text-[11px] font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-150 ease-out text-center block cursor-pointer rounded-none"
            >
              Launch Sandbox
            </button>
            <div className="flex justify-between items-center text-[9px] text-white/30 font-mono tracking-wider">
              <span>Platform Spec: v3.2</span>
              <span>Uptime: 99.99%</span>
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
