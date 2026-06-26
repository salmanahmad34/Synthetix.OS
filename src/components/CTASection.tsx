/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, FormEvent, memo } from 'react';
import { Sparkles, ArrowRight, CheckCircle, Mail, HelpCircle, ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How does Synthetix route model queries?",
    a: "Our smart model router intercepts incoming requests and evaluates their complexity against dynamic semantic thresholds. Simple tasks are routed to high-speed Flash nodes, while complex deductive queries go to specialized Reasoning nodes, ensuring up to a 60% savings in overall token costs."
  },
  {
    q: "Is there support for local persistent databases?",
    a: "Yes! Synthetix is built with an offline-first architecture, enabling automatic synchronization with indexed browser databases, local storage models, and cloud Firestore containers so state holds across sessions and drops gracefully during network cuts."
  },
  {
    q: "Do I need to sign up for multiple API providers?",
    a: "No. The Synthetix Platform consolidates models (Flash-Core, Vision-Perception, Reasoning-Pro) into a single gateway system. You pay one bill in your currency of choice, managed directly from our developer console."
  },
  {
    q: "What security compliance models are in place?",
    a: "We scrub sensitive PII, passwords, emails, and database coordinates on an isolated edge before requests leave your server network. Enterprise packages support direct dedicated VPC peering and SOC2 Type II containment."
  }
];

function CTASection() {
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  // FAQ Accordion states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubscribe = useCallback((e: FormEvent) => {
    e.preventDefault();
    setError('');

    // basic regex email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email address is required');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email format');
      return;
    }

    setIsSubmitted(true);
    setEmail('');
  }, [email]);

  const toggleFaq = useCallback((index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" id="faq">
      
      {/* Decorative gradient radial elements */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#7c3aed]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Core CTA Block */}
        <div className="glass-card rounded-none border border-white/10 p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden mb-24 shadow-[0_0_50px_rgba(124,58,237,0.05)] bg-white/[0.02]">
          {/* Subtle background circle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#7c3aed]/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center space-y-6">
            <div className="p-3 bg-[#7C3AED]/10 rounded-none border border-[#7C3AED]/20 text-[#7C3AED] mb-2 animate-float">
              <Sparkles className="w-5 h-5" />
            </div>

            <h2 className="text-fluid-h2 font-display font-black tracking-tighter uppercase text-white text-center">
              Launch Your Intelligent Agent Fleet Today
            </h2>
            <p className="text-white/60 text-fluid-body leading-relaxed text-center">
              Create a free developer account, inspect the multi-agent sandbox logs, and integrate our edge SDKs with less than five lines of typescript.
            </p>

            {/* Email Form with Success / Error State */}
            {isSubmitted ? (
              <div className="flex flex-col items-center p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-none w-full max-w-md animate-fade-in-up">
                <CheckCircle className="w-8 h-8 text-emerald-400 mb-3" />
                <h4 className="text-sm font-bold uppercase tracking-wide text-white">You're on the whitelist!</h4>
                <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wider">We've reserved your keys. We'll invite you to the private platform cluster soon.</p>
                <button
                  id="reset-submitted-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-3 text-[9px] font-mono text-[#7C3AED] hover:text-[#7C3AED]/80 uppercase tracking-widest font-black underline"
                >
                  Join with another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} aria-label="Synthetix developer whitelist newsletter subscription" className="w-full max-w-md space-y-3 pt-2">
                <div className="relative flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-white/40">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <input
                      type="email"
                      id="cta-email-input"
                      placeholder="developer@domain.com"
                      aria-label="Developer email address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-none text-xs font-mono text-white focus:outline-none focus:border-[#7C3AED] placeholder-white/30 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    id="cta-subscribe-submit"
                    aria-label="Submit request for access keys"
                    className="py-3 px-6 rounded-none bg-[#7C3AED] hover:bg-white hover:text-black font-mono text-xs font-black text-white uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-150 ease-out cursor-pointer"
                  >
                    <span>Request Keys</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
                {error && (
                  <p className="text-xs font-mono text-rose-500 text-left pl-1 uppercase tracking-wide">{error}</p>
                )}
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-wider">
                  No credit card required. Free platform sandbox access opens immediately.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/70 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Developer Knowledge Base</span>
            </div>
            <h3 className="text-fluid-h3 font-display font-black uppercase text-white mb-2">Frequently Answered Specs</h3>
            <p className="text-xs text-white/40 font-mono uppercase tracking-widest">Deep-dives into routing algorithms, offline synchronization, and edge firewalls.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  id={`faq-item-${idx}`}
                  className="rounded-none border border-white/10 bg-[#0a0a0a] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    id={`faq-trigger-${idx}`}
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-[#7C3AED] transition-colors cursor-pointer"
                  >
                    <span className="font-display font-black uppercase text-sm sm:text-base tracking-tight leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-150 ease-out ${isOpen ? 'transform rotate-180 text-[#7C3AED]' : ''}`} aria-hidden="true" />
                  </button>
                  
                  {/* Pure CSS collapsible style fallback or React conditional rendering */}
                  {isOpen && (
                    <div id={`faq-answer-${idx}`} role="region" aria-labelledby={`faq-trigger-${idx}`} className="px-6 pb-6 text-xs sm:text-sm text-white/60 leading-relaxed border-t border-white/10 pt-4 animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(CTASection);
