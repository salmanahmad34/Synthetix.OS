/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PricingTier, CurrencyConfig, FeatureItem } from './types';

export const CURRENCIES: Record<'USD' | 'EUR' | 'GBP', CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79 },
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter Developer',
    description: 'Perfect for prototyping, custom tool builders, and individual hackers exploring next-gen LLMs.',
    priceMonthly: 0,
    priceYearly: 0,
    buttonText: 'Start for Free',
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
    name: 'Neural Professional',
    description: 'Advanced autonomous agent workspace with higher token limits and specialized reasoning models.',
    priceMonthly: 49,
    priceYearly: 39, // per month, billed annually
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
    name: 'Cognitive Enterprise',
    description: 'Bespoke corporate cluster hosting, dedicated TPU quotas, and custom fine-tuning modules.',
    priceMonthly: 199,
    priceYearly: 159, // per month, billed annually
    buttonText: 'Contact Enterprise Sales',
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

export const BENTO_FEATURES: FeatureItem[] = [
  {
    id: 'agent-hub',
    title: 'Autonomous Multi-Agent Orchestrator',
    subtitle: 'Zero-shot task breakdown',
    category: 'Agent Orchestration',
    description: 'Deploy stateful autonomous agent loops that coordinate with each other over virtual message brokers, refining outputs recursively.',
    badge: 'Core Engine',
    accentColor: 'indigo',
    gridClass: 'md:col-span-2 md:row-span-2',
    demoType: 'text',
  },
  {
    id: 'vision-copilot',
    title: 'Multimodal Vision Analytics',
    subtitle: 'Real-time spatial perception',
    category: 'Computer Vision',
    description: 'Analyze real-time viewport, video feeds, or document mockups with instant pixel-level OCR, element tracking, and semantic understanding.',
    badge: 'New Model',
    accentColor: 'cyan',
    gridClass: 'md:col-span-1 md:row-span-1',
    demoType: 'vision',
  },
  {
    id: 'orchestrator',
    title: 'Smart Model Routing',
    subtitle: 'Minimize latency & token cost',
    category: 'LLMOps Router',
    description: 'Dynamically routes API requests across model architectures depending on the complexity of the query, lowering API overheads by up to 60%.',
    accentColor: 'purple',
    gridClass: 'md:col-span-1 md:row-span-1',
    demoType: 'orchestrator',
  },
  {
    id: 'developer-sdk',
    title: 'Server-Side SDK & Webhooks',
    subtitle: 'One-line code deployment',
    category: 'Developer Tools',
    description: 'Deploy streaming inference directly on the edge. Generate type-safe React UI components on-the-fly with our direct websocket bindings.',
    badge: 'SDK v3.1',
    accentColor: 'teal',
    gridClass: 'md:col-span-2 md:row-span-1',
    demoType: 'developer',
  },
  {
    id: 'security-guardrails',
    title: 'PII Scrubbing & Guardrails',
    subtitle: 'Enterprise-grade firewalling',
    category: 'Compliance',
    description: 'Enforce real-time enterprise safety gates, ensuring PII content, keys, or sensitive financial data are scrubbed before reaching core engines.',
    accentColor: 'indigo',
    gridClass: 'md:col-span-1 md:row-span-1',
    demoType: 'security',
  }
];
