"use client";

import Image from "next/image";
import { ArrowRight, CalendarCheck, Check, ExternalLink, MessageCircle, Pencil, ShieldCheck, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { calendlyUrl, whatsappLink } from "../lib/site";
import { BrandLogo } from "./brand";
import { type Application, DiscoveryApplication, emptyApplication, summarise } from "./discovery-application";

type BookingContextValue = {
  open: () => void;
  prepare: () => void;
  isOpen: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) throw new Error("useBooking must be used inside BookingProvider");
  return value;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const prepare = useCallback(() => setMounted(true), []);
  const open = useCallback(() => {
    setMounted(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, prepare, isOpen }), [open, prepare, isOpen]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <CalendlyModal mounted={mounted} open={isOpen} onClose={close} />
    </BookingContext.Provider>
  );
}

const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4";

const buttonTones = {
  dark: "bg-[#4B1530] text-white hover:bg-[#6A2044] focus-visible:outline-[#4B1530]",
  light: "bg-white text-[#381626] hover:bg-[#FFF4F7] focus-visible:outline-white",
  pink: "bg-[#F6B7C9] text-[#381626] hover:bg-[#F9CAD7] focus-visible:outline-[#F6B7C9]",
  magenta: "bg-[#C20C78] text-white hover:bg-[#A80A68] focus-visible:outline-[#C20C78]",
};

export type ButtonTone = keyof typeof buttonTones;

export function buttonClass(tone: ButtonTone = "dark", extra = "") {
  return `${buttonBase} ${buttonTones[tone]} ${extra}`;
}

export function BookingButton({
  children = "Book a free discovery call",
  tone = "dark",
  className = "",
}: {
  children?: React.ReactNode;
  tone?: ButtonTone;
  className?: string;
}) {
  const { open, prepare } = useBooking();
  return (
    <motion.button
      type="button"
      onClick={open}
      onPointerEnter={prepare}
      onFocus={prepare}
      onTouchStart={prepare}
      whileTap={{ scale: 0.97 }}
      aria-haspopup="dialog"
      className={buttonClass(tone, className)}
    >
      {children}
      <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

/** Plain text trigger for the booking popup, for footers and inline copy. */
export function BookingTextButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { open, prepare } = useBooking();
  return (
    <button type="button" onClick={open} onPointerEnter={prepare} onFocus={prepare} onTouchStart={prepare} className={className}>
      {children}
    </button>
  );
}

export function WhatsAppButton({
  children = "Chat on WhatsApp",
  message,
  className = "",
  tone = "outline",
}: {
  children?: React.ReactNode;
  message?: string;
  className?: string;
  tone?: "outline" | "outline-light" | "solid";
}) {
  const tones = {
    outline: "border border-[#4B1530]/20 bg-white/70 text-[#4B1530] hover:bg-white",
    "outline-light": "border border-white/30 text-white hover:bg-white/10",
    solid: "bg-[#1FAF5A] text-white hover:bg-[#178F49]",
  };
  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-bold transition-colors ${tones[tone]} ${className}`}
    >
      <MessageCircle size={17} strokeWidth={2.2} />
      {children}
    </motion.a>
  );
}

function CalendlyModal({ mounted, open, onClose }: { mounted: boolean; open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [draft, setDraft] = useState<Application>(emptyApplication);
  const [booked, setBooked] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [embedHost, setEmbedHost] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setEmbedHost(window.location.host);
    // Calendly tells the page when a time has been booked.
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://calendly.com") return;
      const name = (event.data as { event?: string } | null)?.event;
      if (name === "calendly.event_scheduled") setBooked(true);
      // Calendly reports once its calendar has actually drawn.
      if (name === "calendly.event_type_viewed" || name === "calendly.page_height") setIframeLoaded(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      // Keep keyboard focus inside the popup while it is open.
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, iframe")).filter((element) => element.offsetParent !== null);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!mounted || !embedHost) return null;

  // embed_domain and embed_type tell Calendly this is an embed, which is what
  // lets hide_gdpr_banner take effect. name, email and a1 prefill the booking
  // form; a1 is the event's "share anything that will help prepare" question,
  // which is how the team receives the answers to review.
  const src = application
    ? `${calendlyUrl}?${new URLSearchParams({
        embed_domain: embedHost,
        embed_type: "Inline",
        hide_gdpr_banner: "1",
        background_color: "fff9f5",
        text_color: "381626",
        primary_color: "c20c78",
        name: application.name,
        email: application.email,
        a1: summarise(application),
      }).toString()}`
    : "";

  const stage = booked ? "booked" : application ? "calendar" : "application";

  return (
    <motion.div
      aria-hidden={!open}
      className={`fixed inset-0 flex items-end justify-center bg-[#1F0A14]/58 p-0 backdrop-blur-sm sm:items-center sm:p-5 ${
        open ? "visible z-[100]" : "invisible -z-10 pointer-events-none"
      }`}
      initial={false}
      animate={{ opacity: open ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        ref={dialogRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-labelledby="calendly-title"
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.985 }}
        transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0 : 0.38 }}
        className="flex h-[96dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-white/80 bg-[#FFF9F5] shadow-[0_35px_100px_rgba(30,6,18,0.34)] sm:h-[88dvh] sm:rounded-[2.2rem]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#4B1530]/10 px-5 py-3 sm:px-7 sm:py-4">
          <div className="flex items-center gap-3">
            <BrandLogo compact />
            <p id="calendly-title" className="sr-only">Request a free discovery call with The Intimacy Masters</p>
            <span className="whitespace-nowrap rounded-full bg-[#E3F5EE] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F5A44] lg:hidden">Free · 1 hour</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full bg-[#F4E4E9] text-[#4B1530] transition-colors hover:bg-[#EFCFD9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B1530]"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>
        <div className="grid min-h-0 flex-1 lg:grid-cols-[300px_1fr]">
          <aside className="hidden flex-col justify-between bg-[#3D162A] p-8 text-white lg:flex">
            <div>
              <Image src="/brand/intimacy-masters-symbol.png" alt="" width={72} height={72} className="brightness-0 invert" />
              <p className="eyebrow mt-8 text-[#F3A6BD]">Free discovery call</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em]">A private first conversation.</h2>
              <ol className="mt-7 space-y-3 text-sm font-semibold">
                {["Tell us a little", "Choose a time", "We confirm by email"].map((label, index) => {
                  const current = ["application", "calendar", "booked"].indexOf(stage);
                  return (
                    <li key={label} className={`flex items-center gap-3 ${index <= current ? "text-white" : "text-white/45"}`}>
                      <span className={`grid size-7 place-items-center rounded-full text-xs font-black ${index < current ? "bg-[#F6B7C9] text-[#3D162A]" : index === current ? "bg-white text-[#3D162A]" : "border border-white/30"}`}>
                        {index < current ? <Check size={13} strokeWidth={3.5} /> : index + 1}
                      </span>
                      {label}
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="space-y-3 border-t border-white/14 pt-6 text-sm font-semibold text-white/72">
              <p className="flex items-center gap-2"><Check size={16} className="text-[#F3A6BD]" /> Free, no obligation</p>
              <p className="flex items-center gap-2"><Check size={16} className="text-[#F3A6BD]" /> 1 hour, online</p>
              <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#F3A6BD]" /> Private and confidential</p>
            </div>
          </aside>

          <div className="relative min-h-0 bg-[#FFF9F5]">
            {stage === "application" && (
              <DiscoveryApplication
                initial={draft}
                onNavigate={onClose}
                onComplete={(answers) => {
                  setDraft(answers);
                  setIframeLoaded(false);
                  setApplication(answers);
                }}
              />
            )}

            {stage === "calendar" && application && (
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex items-start justify-between gap-3 border-b border-[#4B1530]/10 bg-[#FDF0F3] px-5 py-3 sm:px-7">
                  <p className="text-sm leading-snug text-[#5A3A48]">
                    <strong className="text-[#381626]">Thank you, {application.name}.</strong> Choose a time. The team reviews every request and confirms by email.
                  </p>
                  <button type="button" onClick={() => setApplication(null)} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#8D2F5B] underline underline-offset-4">
                    <Pencil size={13} /> Edit
                  </button>
                </div>
                <div className="relative min-h-0 flex-1" aria-busy={!iframeLoaded}>
                  <div className={`absolute inset-0 z-20 grid place-items-center bg-[#FFF9F5] p-8 text-center transition-opacity duration-300 ${iframeLoaded ? "pointer-events-none opacity-0" : "opacity-100"}`}>
                    <div className="max-w-sm">
                      <div className="relative mx-auto size-12">
                        <span className="absolute inset-0 rounded-full border-4 border-[#EFD9E1]" />
                        <motion.span
                          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#8D2F5B]"
                          animate={reduceMotion ? undefined : { rotate: 360 }}
                          transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                        />
                      </div>
                      <p className="mt-5 text-base font-bold text-[#4B1530]">Finding available times</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#806A74]">This can take a moment on slower connections.</p>
                    </div>
                  </div>
                  <iframe
                    title="Choose a time for your discovery call"
                    src={src}
                    onLoad={() => window.setTimeout(() => setIframeLoaded(true), 4000)}
                    className={`relative z-10 h-full w-full bg-white transition-opacity duration-300 ${iframeLoaded ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
            )}

            {stage === "booked" && (
              <div className="grid h-full place-items-center overflow-y-auto p-7 text-center sm:p-12">
                <div className="max-w-md">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#E3F5EE] text-[#1F5A44]"><CalendarCheck size={30} /></span>
                  <h3 className="mt-6 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-[#381626]">Your request is in.</h3>
                  <p className="mt-4 text-lg leading-relaxed text-[#5F4B55]">
                    Check your email for the details. Jessica&apos;s team reviews every request and will confirm your call, or suggest a better starting point.
                  </p>
                  <ul className="mt-6 space-y-2.5 text-left text-[#4F3A44]">
                    <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-[#C20C78]" /> Find a private, quiet place for the call.</li>
                    <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-[#C20C78]" /> Your spouse is welcome to join, but does not have to.</li>
                    <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-[#C20C78]" /> You never have to share more than you are ready to.</li>
                  </ul>
                  <button type="button" onClick={onClose} className={buttonClass("dark", "mt-8")}>Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {stage !== "booked" && (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 border-t border-[#4B1530]/10 px-5 py-2.5 text-center text-xs font-semibold text-[#725B66]">
            <a href={whatsappLink("Hello Jessica, I would like to ask about a discovery call.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#8D2F5B] underline underline-offset-2">
              Prefer to message first? WhatsApp us <MessageCircle size={12} />
            </a>
            {stage === "calendar" && (
              <a href={calendlyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#8D2F5B] underline underline-offset-2">
                Calendar not loading? Open Calendly <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
      </motion.section>
    </motion.div>
  );
}
