/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, memo } from 'react';
import { usePricing, CurrencyType } from '../hooks/usePricing';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  HelpCircle, 
  CreditCard,
} from 'lucide-react';

const pricingTiersData = [
    {
      id: 'starter',
      name: 'Starter',
      basePrice: 99,
      description: 'Perfect for prototyping, custom tool builders, and individual hackers exploring next-gen LLMs.',
      buttonText: 'Deploy Starter',
      features: [
        '1.5 Million tokens per month',
        'Rate limit: 15 Requests / minute',
        'Access to Synthetix Flash-Core model',
        'Local state & client-side persistence',
        'Community Discord Support',
        'Standard SSL Gateway integration',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      basePrice: 299,
      description: 'Advanced autonomous agent workspace with higher token limits and specialized reasoning models.',
      buttonText: 'Upgrade to Pro',
      isPopular: true,
      badge: 'Most Popular',
      features: [
        '50 Million tokens per month',
        'No rate limits on Flash or Vision models',
        'Access to Synthetix Reasoning-Pro model',
        'Collaborative shared team sandboxes',
        'Developer API keys & Webhook routers',
        'Advanced JSON structure schema enforcement',
        'Priority ticketing support (under 4 hours)',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      basePrice: 999,
      description: 'Bespoke corporate cluster hosting, dedicated TPU quotas, and custom fine-tuning modules.',
      buttonText: 'Contact Sales',
      badge: 'Custom Scale',
      features: [
        'Unlimited elastic token pools',
        'Custom fine-tuned adapters & model hosting',
        'SLA guarantee of 99.99% uptime',
        'Isolated VPC peering & SOC2 Type II security',
        'Dedicated LLMOps integration architect',
        'Custom SSO/SAML user provisioning',
        '24/7 Phone and secure channel support',
      ],
    },
  ];

  // Static matrix details
  const matrixFeatures = [
    { category: 'Compute & Model Access', name: 'Synthetix Flash Core Model', starter: 'Yes', pro: 'Yes', enterprise: 'Yes' },
    { category: 'Compute & Model Access', name: 'Synthetix Reasoning Pro Model', starter: 'No', pro: 'Yes', enterprise: 'Yes' },
    { category: 'Compute & Model Access', name: 'Bespoke Fine-tuned Adapters', starter: 'No', pro: 'No', enterprise: 'Yes' },
    
    { category: 'Limits & Performance', name: 'Context Window Size', starter: '128k Tokens', pro: '1M Tokens', enterprise: 'Unlimited Elastic' },
    { category: 'Limits & Performance', name: 'Max Concurrences', starter: '5 tasks', pro: '50 tasks', enterprise: 'Dedicated TPUs' },
    { category: 'Limits & Performance', name: 'Rate Limits', starter: '15 req / min', pro: 'Unlimited', enterprise: 'Unlimited' },
    
    { category: 'Security & Enterprise', name: 'PII Scrubbing Proxy', starter: 'Basic', pro: 'Advanced', enterprise: 'VPC Custom Scrub' },
    { category: 'Security & Enterprise', name: 'SAML / SSO Provisioning', starter: 'No', pro: 'No', enterprise: 'Yes' },
    { category: 'Security & Enterprise', name: 'SOC2 Type II Isolation', starter: 'No', pro: 'No', enterprise: 'Yes' },
    
    { category: 'Support', name: 'Response Time Guarantee', starter: 'Community forum', pro: '< 4 hours priority', enterprise: '< 15 mins (Dedicated SLA)' },
    { category: 'Support', name: 'Symmetric SLA uptime', starter: '99%', pro: '99.9%', enterprise: '99.99%' },
  ];

function PricingMatrix() {
  const {
    billingCycle,
    activeCurrency,
    tierPrices,
    changeCurrency,
    changeBillingCycle,
    formatPrice,
  } = usePricing();

  const [selectedTierId, setSelectedTierId] = useState<string>('pro');

  return (
    <section className="py-24 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden" id="pricing">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7c3aed]/5 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-white/[0.03] border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-white/70 mb-4 animate-float">
            <CreditCard className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Elastic Pricing Engine</span>
          </div>
          <h2 className="text-fluid-h2 font-display font-black tracking-tighter uppercase text-white mb-4">
            Pricing Built To Scale
          </h2>
          <p className="text-white/60 text-fluid-body">
            Choose a tier and observe real-time dynamic conversions. Selected plans are cached locally with secure, automated, 20% annual bulk rate deductions.
          </p>
        </div>

        {/* Pricing Dashboard Controls */}
        <div className="glass-card max-w-4xl mx-auto p-6 rounded-none border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-[#0a0a0a]">
          
          {/* Billing Toggle (Monthly / Annual) */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 font-bold">Billing Interval</span>
            <div className="inline-flex bg-white/[0.02] p-1 rounded-none border border-white/10">
              <button
                id="billing-monthly-btn"
                onClick={() => changeBillingCycle('monthly')}
                aria-label="Switch pricing matrix to monthly billing cycle"
                className={`px-4 py-2 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ease-out cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#7C3AED] text-white shadow-md font-black'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Monthly Rates
              </button>
              <button
                id="billing-annual-btn"
                onClick={() => changeBillingCycle('annual')}
                aria-label="Switch pricing matrix to annual billing cycle with a twenty percent discount"
                className={`px-4 py-2 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ease-out relative cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-[#7C3AED] text-white shadow-md font-black'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Annual Plan
                <span className="absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded-none bg-emerald-500 text-[8px] text-black font-sans font-black tracking-normal uppercase">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Prompt/Info Display */}
          <div className="flex-1 w-full max-w-md flex flex-col justify-center text-center md:text-left border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
            <div className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-1 font-bold">Billing Compliance Proxy</div>
            <p className="text-white/50 text-[11px] leading-relaxed">
              Dynamically calculating rates using the formula: <code className="text-white font-mono bg-white/5 px-1.5 py-0.5">basePrice × currencyRate × billingCycle</code>.
            </p>
          </div>

          {/* Currency selection */}
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 font-bold">Active Currency</span>
            <div className="flex bg-white/[0.02] p-1 rounded-none border border-white/10">
              {(['INR', 'USD', 'EUR'] as const).map((curr) => (
                <button
                  key={curr}
                  id={`currency-btn-${curr}`}
                  onClick={() => changeCurrency(curr)}
                  aria-label={`Switch pricing matrix currency representation to ${curr}`}
                  className={`px-3 py-1.5 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ease-out cursor-pointer ${
                    activeCurrency === curr
                      ? 'bg-white/10 text-[#7C3AED] font-black'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {pricingTiersData.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            const priceValue = tierPrices[tier.name.toLowerCase()];
            const isPro = tier.id === 'pro';

            return (
              <article
                key={tier.id}
                id={`pricing-card-${tier.id}`}
                className={`rounded-none p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-200 ease-out ${
                  isPro 
                    ? 'bg-white/[0.03] border-2 border-[#7C3AED] shadow-[0_0_30px_rgba(124,58,237,0.15)]' 
                    : 'bg-[#0a0a0a] border border-white/10'
                }`}
              >
                {/* Popular Glow Header */}
                {isPro && (
                  <div className="absolute top-0 right-0 left-0 bg-[#7C3AED] h-1 shadow-[0_2px_10px_#7C3AED]"></div>
                )}

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono font-black uppercase tracking-widest text-[#7C3AED]">
                      {tier.id === 'starter' ? '01 // Starter' : tier.id === 'pro' ? '02 // Pro' : '03 // Enterprise'}
                    </span>
                    {tier.badge && (
                      <span className="px-2.5 py-0.5 rounded-none bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[9px] font-mono font-bold tracking-widest uppercase text-[#7C3AED]">
                        {tier.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-fluid-h3 font-display font-black uppercase text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Price display with calculations and Smooth Easing Transitions */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-1 relative overflow-hidden h-12">
                      <AnimatePresence mode="popLayout">
                        <motion.div
                          key={`${tier.id}-${priceValue}-${activeCurrency}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="flex items-baseline"
                        >
                          <span className="text-fluid-price font-display font-black text-white tracking-tighter uppercase">
                            {formatPrice(priceValue)}
                          </span>
                        </motion.div>
                      </AnimatePresence>
                      <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider ml-1 align-baseline self-end mb-1">
                        / {billingCycle === 'monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>

                    {/* Breakdown details */}
                    <div className="mt-2 space-y-0.5">
                      <span className="text-[9px] text-white/30 font-mono block uppercase tracking-wider">
                        Base: {formatPrice(tier.basePrice, 'INR')} INR / mo
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-white/70 leading-normal">
                        <div className="p-0.5 rounded-none bg-[#7C3AED]/10 border border-[#7C3AED]/20 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#7C3AED]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action CTA Button */}
                <button
                  id={`tier-checkout-btn-${tier.id}`}
                  onClick={() => setSelectedTierId(tier.id)}
                  aria-label={`Select and deploy the ${tier.name} package`}
                  className={`w-full py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-150 ease-out rounded-none cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black border border-white'
                      : isPro
                        ? 'bg-[#7C3AED] hover:bg-white hover:text-black text-white hover:border-white border border-transparent'
                        : 'border border-white/20 hover:border-white bg-transparent text-white/60 hover:text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {isSelected ? 'Active Plan' : tier.buttonText}
                </button>
              </article>
            );
          })}
        </div>

        {/* Detailed Comparison Matrix */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-xl font-display font-black uppercase text-white mb-2">Capabilities Matrix</h3>
            <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest">Raw performance thresholds and isolation compliance bounds</p>
          </div>

          <div className="overflow-x-auto rounded-none border border-white/10 bg-white/[0.01]">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-white/40 font-mono uppercase tracking-widest text-[9px]">
                  <th className="p-4 pl-6">Feature Name</th>
                  <th className="p-4">Starter</th>
                  <th className="p-4">Pro</th>
                  <th className="p-4 pr-6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {matrixFeatures.map((feat, index) => {
                  return (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 pl-6 font-semibold text-white">
                        <span className="block text-[8px] text-[#7C3AED]/80 font-mono mb-0.5 uppercase font-black tracking-wider">{feat.category}</span>
                        {feat.name}
                      </td>
                      <td className="p-4 text-white/50">
                        {feat.starter === 'Yes' ? (
                          <Check className="w-4 h-4 text-[#7C3AED]" />
                        ) : feat.starter === 'No' ? (
                          <span className="text-white/20">—</span>
                        ) : (
                          <span className="font-mono text-white/75">{feat.starter}</span>
                        )}
                      </td>
                      <td className="p-4 text-[#7C3AED] font-bold">
                        {feat.pro === 'Yes' ? (
                          <Check className="w-4 h-4 text-[#7C3AED]" />
                        ) : feat.pro === 'No' ? (
                          <span className="text-white/20">—</span>
                        ) : (
                          <span className="font-mono text-[#7C3AED]/90">{feat.pro}</span>
                        )}
                      </td>
                      <td className="p-4 text-white font-semibold">
                        {feat.enterprise === 'Yes' ? (
                          <Check className="w-4 h-4 text-teal-400 font-bold" />
                        ) : (
                          <span className="font-mono text-teal-300">{feat.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

export default memo(PricingMatrix);
