/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useMemo } from 'react';

export const pricingMatrix = {
  currencies: { INR: 1, USD: 0.012, EUR: 0.011 },
  billingCycles: { monthly: 1, annual: 0.8 }, // 20% discount
  tiers: [
    { name: "Starter", basePrice: 99 },
    { name: "Pro", basePrice: 299 },
    { name: "Enterprise", basePrice: 999 }
  ]
};

export type CurrencyType = 'INR' | 'USD' | 'EUR';
export type BillingCycleType = 'monthly' | 'annual';

export function usePricing() {
  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pricing-currency');
      if (saved === 'INR' || saved === 'USD' || saved === 'EUR') {
        return saved as CurrencyType;
      }
    }
    return 'USD'; // default to USD for standard global presentation, but can load INR or EUR
  });

  const [billingCycle, setBillingCycle] = useState<BillingCycleType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pricing-billing');
      if (saved === 'monthly' || saved === 'annual') {
        return saved as BillingCycleType;
      }
    }
    return 'monthly';
  });

  const changeCurrency = useCallback((currency: CurrencyType) => {
    setActiveCurrency(currency);
    localStorage.setItem('pricing-currency', currency);
  }, []);

  const changeBillingCycle = useCallback((cycle: BillingCycleType) => {
    setBillingCycle(cycle);
    localStorage.setItem('pricing-billing', cycle);
  }, []);

  // Calculate prices based on the requested formula: basePrice * currencyRate * billingCycle
  const tierPrices = useMemo(() => {
    const rate = pricingMatrix.currencies[activeCurrency];
    const cycleFactor = pricingMatrix.billingCycles[billingCycle];

    return pricingMatrix.tiers.reduce((acc, tier) => {
      const finalPrice = tier.basePrice * rate * cycleFactor;
      acc[tier.name.toLowerCase()] = finalPrice;
      return acc;
    }, {} as Record<string, number>);
  }, [activeCurrency, billingCycle]);

  const currencyConfig = useMemo(() => {
    const symbols = { INR: '₹', USD: '$', EUR: '€' };
    return {
      code: activeCurrency,
      symbol: symbols[activeCurrency],
      rate: pricingMatrix.currencies[activeCurrency]
    };
  }, [activeCurrency]);

  const formatPrice = useCallback((amount: number, curr: CurrencyType = activeCurrency) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€' };
    const symbol = symbols[curr];
    
    if (curr === 'INR') {
      return `${symbol}${amount.toLocaleString(undefined, {
        minimumFractionDigits: amount % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1
      })}`;
    }
    
    return `${symbol}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }, [activeCurrency]);

  return {
    billingCycle,
    activeCurrency,
    currencyConfig,
    tierPrices,
    changeCurrency,
    changeBillingCycle,
    formatPrice
  };
}
