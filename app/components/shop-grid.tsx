"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { type Audience, products } from "../lib/site";
import { ProductCard } from "./product-card";

const filters: { id: Audience | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "couples", label: "For couples" },
  { id: "wives", label: "For wives" },
  { id: "parents", label: "For parents" },
  { id: "sessions", label: "Private sessions" },
];

export function ShopGrid() {
  const [filter, setFilter] = useState<Audience | "all">("all");
  const reduceMotion = useReducedMotion();
  const visible = filter === "all" ? products : products.filter((product) => product.audiences.includes(filter));

  return (
    <div>
      <div role="tablist" aria-label="Filter resources" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filters.map((item) => {
          const selected = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item.id)}
              className={`relative min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition-colors ${selected ? "text-white" : "bg-white text-[#4B1530] hover:bg-[#FDE2E8]"}`}
            >
              {selected && (
                <motion.span
                  layoutId="shop-filter"
                  className="absolute inset-0 rounded-full bg-[#4B1530]"
                  transition={{ type: "spring", bounce: 0.15, duration: reduceMotion ? 0 : 0.45 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 text-sm font-semibold text-[#6F5863]" aria-live="polite">
        {visible.length} {visible.length === 1 ? "resource" : "resources"}. Prices are shown in naira and US dollars; checkout is on Selar, which also shows your local currency.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.div
              key={product.slug}
              layout={!reduceMotion}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0.1 : 0.45 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
