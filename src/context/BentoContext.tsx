/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

export interface BentoContextType {
  openItems: Record<string, boolean>;
  activeId: string;
  toggleItem: (id: string) => void;
  setActiveId: (id: string) => void;
}

const BentoContext = createContext<BentoContextType | null>(null);

export function BentoProvider({ children }: { children: ReactNode }) {
  // Track which accordion items are open on mobile (multiple can be open, or toggleable)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bento-open-items');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          // fallback
        }
      }
    }
    return { 'agent-hub': true }; // default first item open
  });

  // Track active item for desktop/tablet
  const [activeId, setActiveIdState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bento-active-id');
      if (saved) return saved;
    }
    return 'agent-hub';
  });

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem('bento-open-items', JSON.stringify(next));
      return next;
    });
  }, []);

  const setActiveId = useCallback((id: string) => {
    setActiveIdState(id);
    localStorage.setItem('bento-active-id', id);
  }, []);

  const value = useMemo(() => ({
    openItems,
    activeId,
    toggleItem,
    setActiveId,
  }), [openItems, activeId, toggleItem, setActiveId]);

  return <BentoContext.Provider value={value}>{children}</BentoContext.Provider>;
}

export function useBento() {
  const context = useContext(BentoContext);
  if (!context) {
    throw new Error('useBento must be used within a BentoProvider');
  }
  return context;
}
