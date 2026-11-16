"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { whatsappLink } from "../lib/site";
import { useBooking } from "./booking";

/**
 * Keeps the two lowest-effort actions within reach on every page:
 * a sticky booking bar on phones, and a WhatsApp button from tablet width up
 * (where the header already carries the booking button).
 */
export function FloatingActions() {
  const { open, prepare, isOpen } = useBooking();
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 480);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const show = visible && !isOpen;

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: 90, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.45 }}
            className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
            style={{ viewTransitionName: "mobile-bar" }}
          >
            <div className="mx-auto flex max-w-xl items-center gap-2 rounded-full border border-white/70 bg-[#fff8f5]/92 p-1.5 shadow-[0_14px_50px_rgba(42,17,30,0.28)] backdrop-blur-xl">
              <button
                type="button"
                onClick={open}
                onTouchStart={prepare}
                aria-haspopup="dialog"
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#4B1530] px-5 text-sm font-bold text-white"
              >
                Book a free discovery call <ArrowRight size={16} strokeWidth={2.4} />
              </button>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-[#1FAF5A] text-white"
              >
                <MessageCircle size={21} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-[#1FAF5A] py-3 pl-4 pr-5 text-sm font-bold text-white shadow-[0_14px_40px_rgba(20,90,50,0.35)] sm:flex"
        style={{ viewTransitionName: "whatsapp-fab" }}
      >
        <MessageCircle size={20} /> Chat on WhatsApp
      </motion.a>
    </>
  );
}
