/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PricingTier {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  isPopular?: boolean;
  description: string;
  buttonText: string;
  badge?: string;
}

export interface CurrencyConfig {
  code: 'USD' | 'EUR' | 'GBP';
  symbol: string;
  rate: number; // Conversion rate from USD
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  badge?: string;
  accentColor: string; // Indigo, Purple, Teal, Cyan, etc.
  gridClass: string;   // For Tailwind Grid sizing
  demoType: 'text' | 'vision' | 'orchestrator' | 'developer' | 'security';
}
