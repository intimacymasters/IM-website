"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { navLinks, whatsappLink } from "../lib/site";
import { BookingButton, useBooking } from "./booking";
import { BrandLogo } from "./brand";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#C20C78]"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
      />
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6" style={{ viewTransitionName: "site-header" }}>
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/70 bg-[#fff8f5]/80 px-5 py-3 shadow-[0_12px_45px_rgba(67,20,42,0.09)] backdrop-blur-xl"
        >
          <Link href="/" className="flex items-center gap-2.5" aria-label="The Intimacy Masters home">
            <BrandLogo compact />
          </Link>

          <div className="hidden items-center gap-6 text-sm font-semibold text-[#4F3A44] xl:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined} className={`nav-link ${active ? "nav-link-active text-[#8D2F5B]" : ""}`}>
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <BookingButton>Free discovery call</BookingButton>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-11 place-items-center rounded-full bg-[#4B1530] text-white sm:bg-[#F4E4E9] sm:text-[#4B1530] xl:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && <SiteMenu pathname={pathname} onClose={() => setMenuOpen(false)} reduceMotion={!!reduceMotion} />}
      </AnimatePresence>
    </>
  );
}

function SiteMenu({ pathname, onClose, reduceMotion }: { pathname: string; onClose: () => void; reduceMotion: boolean }) {
  const { open } = useBooking();
  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3.25rem) 3.25rem)" }}
      animate={reduceMotion ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 3.25rem) 3.25rem)" }}
      exit={reduceMotion ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 3.25rem) 3.25rem)" }}
      transition={{ duration: reduceMotion ? 0.15 : 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-40 overflow-y-auto bg-[#2A111E] text-white"
    >
      <div className="relative mx-auto flex min-h-full max-w-7xl flex-col px-6 pb-10 pt-28 sm:px-10">
        <p className="eyebrow text-[#F3A6BD]">Where would you like to go?</p>
        <ul className="mt-6 flex-1">
          {[{ href: "/", label: "Home", note: "Start here" }, ...navLinks].map((link, index) => {
            const active = pathname === link.href;
            return (
              <motion.li
                key={link.href}
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.18 + index * 0.045, type: "spring", bounce: 0, duration: 0.6 }}
                className="border-b border-white/10"
              >
                <Link href={link.href} onClick={onClose} aria-current={active ? "page" : undefined} className="group flex items-baseline justify-between gap-4 py-3.5 sm:py-4">
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 text-xs font-bold text-[#F3A6BD]/70">{String(index + 1).padStart(2, "0")}</span>
                    <span className={`font-display text-[2rem] font-semibold leading-none tracking-[-0.04em] transition-colors group-hover:text-[#F6B7C9] sm:text-5xl ${active ? "italic text-[#F6B7C9]" : ""}`}>
                      {link.label}
                    </span>
                  </span>
                  <span className="hidden text-sm font-semibold text-white/50 sm:block">{link.note}</span>
                  <ArrowUpRight size={18} className="text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:hidden" />
                </Link>
              </motion.li>
            );
          })}
        </ul>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.6 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={() => {
              onClose();
              open();
            }}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#F6B7C9] px-6 py-3 text-sm font-bold text-[#381626]"
          >
            Book a free discovery call
          </button>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white"
          >
            <MessageCircle size={17} /> Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
