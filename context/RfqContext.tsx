"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BearingItem } from "@/types/bearing";
import { BEARING_CATALOG } from "@/data/bearings";

interface RfqContextType {
  rfqItems: BearingItem[];
  addToRfq: (item: BearingItem) => void;
  removeFromRfq: (id: string) => void;
  toggleRfq: (item: BearingItem) => void;
  clearRfq: () => void;
  isItemInRfq: (id: string) => boolean;
  rfqCount: number;
}

const RfqContext = createContext<RfqContextType | undefined>(undefined);

export function RfqProvider({ children }: { children: React.ReactNode }) {
  const [rfqItems, setRfqItems] = useState<BearingItem[]>(() => {
    // Default initial seed
    return [BEARING_CATALOG[1]]; // 6204-2RSH/C3 as showcase
  });

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const saved = localStorage.getItem("evo_rfq_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRfqItems(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("evo_rfq_cart", JSON.stringify(rfqItems));
    } catch {
      // ignore
    }
  }, [rfqItems]);

  const addToRfq = (item: BearingItem) => {
    setRfqItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromRfq = (id: string) => {
    setRfqItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleRfq = (item: BearingItem) => {
    setRfqItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      return [...prev, item];
    });
  };

  const clearRfq = () => {
    setRfqItems([]);
  };

  const isItemInRfq = (id: string) => {
    return rfqItems.some((p) => p.id === id);
  };

  return (
    <RfqContext.Provider
      value={{
        rfqItems,
        addToRfq,
        removeFromRfq,
        toggleRfq,
        clearRfq,
        isItemInRfq,
        rfqCount: rfqItems.length,
      }}
    >
      {children}
    </RfqContext.Provider>
  );
}

export function useRfq() {
  const context = useContext(RfqContext);
  if (!context) {
    throw new Error("useRfq must be used within an RfqProvider");
  }
  return context;
}
