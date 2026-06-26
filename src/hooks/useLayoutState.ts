/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';

export function useLayoutState(defaultBentoId: string = 'agent-hub') {
  const [activeBentoId, setActiveBentoId] = useState<string>(defaultBentoId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollYPosition, setScrollYPosition] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const changeBentoId = useCallback((id: string) => {
    setActiveBentoId(id);
  }, []);

  // Update scroll position safely
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrollYPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Is header glassmorphic (scrolled past 20px)
  const isHeaderScrolled = useMemo(() => {
    return scrollYPosition > 20;
  }, [scrollYPosition]);

  // Section Observer (Scroll-Spy) to identify which part of the landing page is current
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sections = ['hero', 'features', 'pricing', 'faq'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200; // offset for triggers
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // run once initially

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
    };
  }, []);

  return {
    activeBentoId,
    mobileMenuOpen,
    scrollYPosition,
    activeSection,
    isHeaderScrolled,
    toggleMobileMenu,
    closeMobileMenu,
    changeBentoId,
  };
}
