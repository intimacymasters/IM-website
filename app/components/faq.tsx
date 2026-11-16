"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { faqs as defaultFaqs } from "../lib/site";
import { BookingButton, WhatsAppButton } from "./booking";
import { Reveal } from "./reveal";
import { SectionIntro } from "./sections";

export function Faq({ items = defaultFaqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();
  return (
    <section id="faq" className="section-pad bg-[#FFF9F5]">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <Reveal>
          <SectionIntro title="You are allowed to ask." text="No question is too awkward, and you do not need to have everything figured out before you begin." />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <BookingButton>Ask on a free call</BookingButton>
            <WhatsAppButton>Ask on WhatsApp</WhatsAppButton>
          </div>
        </Reveal>
        <Reveal className="divide-y divide-[#4B1530]/12 border-y border-[#4B1530]/12">
          {items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="text-lg font-bold tracking-[-0.02em] text-[#381626] sm:text-xl">{item.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full bg-[#F7E6EB] text-[#4B1530]">
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.36 }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 pr-8 leading-relaxed text-[#67545D]">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
