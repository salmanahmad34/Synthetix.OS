/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, memo } from 'react';
import { Cpu, Terminal, ShieldAlert, Sparkles, Database } from 'lucide-react';

function Footer() {
  const handleScrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-16 text-white/40 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Brand Col */}
        <div className="md:col-span-5 space-y-4">
          <button
            id="footer-logo-btn"
            onClick={() => handleScrollToSection('hero')}
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity cursor-pointer text-left"
          >
            <div className="p-2 rounded-none bg-[#7C3AED] text-white">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-display font-black tracking-tighter text-lg uppercase">
              Synthetix<span className="text-[#7C3AED]">.AI</span>
            </span>
          </button>
          
          <p className="text-white/50 text-xs leading-relaxed max-w-sm">
            Synthetix is the premiere autonomous model compilation and gateway pipeline. Enabling robust, cost-effective routing and compliance proxy layers for enterprise LLM workloads.
          </p>

          <p className="text-white/30 text-[9px] font-mono leading-normal uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Synthetix AI Technologies, Inc. All rights reserved. <br />
            Constructed for modern Edge-Core execution.
          </p>
        </div>

        {/* Links Col 1 */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block font-black">Sandbox Nodes</span>
          <ul className="space-y-2">
            <li>
              <button
                id="footer-link-features"
                onClick={() => handleScrollToSection('features')}
                className="hover:text-[#7C3AED] text-white/40 transition-colors cursor-pointer text-left font-mono text-[10px] uppercase tracking-wider"
              >
                Bento Accordion
              </button>
            </li>
            <li>
              <button
                id="footer-link-pricing"
                onClick={() => handleScrollToSection('pricing')}
                className="hover:text-[#7C3AED] text-white/40 transition-colors cursor-pointer text-left font-mono text-[10px] uppercase tracking-wider"
              >
                Pricing Matrix
              </button>
            </li>
            <li>
              <button
                id="footer-link-faq"
                onClick={() => handleScrollToSection('faq')}
                className="hover:text-[#7C3AED] text-white/40 transition-colors cursor-pointer text-left font-mono text-[10px] uppercase tracking-wider"
              >
                Specs & FAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="md:col-span-2 space-y-3">
          <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block font-black">Legal & Security</span>
          <ul className="space-y-2">
            <li><a href="#faq" className="hover:text-[#7C3AED] text-white/40 transition-colors font-mono text-[10px] uppercase tracking-wider">Privacy Charter</a></li>
            <li><a href="#faq" className="hover:text-[#7C3AED] text-white/40 transition-colors font-mono text-[10px] uppercase tracking-wider">Terms of Interface</a></li>
            <li><a href="#faq" className="hover:text-[#7C3AED] text-white/40 transition-colors font-mono text-[10px] uppercase tracking-wider">Compliance Gateway</a></li>
            <li><a href="#faq" className="hover:text-[#7C3AED] text-white/40 transition-colors font-mono text-[10px] uppercase tracking-wider">SLA Agreement</a></li>
          </ul>
        </div>

        {/* Status indicator Col */}
        <div className="md:col-span-3 space-y-4">
          <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest block font-black">Secure Gateway Status</span>
          
          <div className="bg-white/[0.02] p-4 rounded-none border border-white/10 space-y-3 font-mono text-[9px] uppercase tracking-wider">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-none bg-emerald-400 animate-ping"></span>
                GATEWAY_ONLINE
              </span>
              <span className="font-bold">100% SECURE</span>
            </div>
            
            <div className="text-[8px] text-white/30 space-y-1">
              <p>Network latency: <strong className="text-white font-bold">8.4ms</strong></p>
              <p>Scrub Rate: <strong className="text-white font-bold">12,489 / sec</strong></p>
              <p>Active peering: <strong className="text-white font-bold">TLS v1.3</strong></p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default memo(Footer);
