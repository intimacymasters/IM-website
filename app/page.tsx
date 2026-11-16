"use client";

import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Heart,
  Mail,
  Menu,
  MessageCircleHeart,
  Quote,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const bookingUrl = "https://selar.co/bookacallwithcoachjess";
const consultationUrl = "https://selar.co/IntimateConsultation";
const calendlyUrl = "https://calendly.com/theintimacymasters/30min";

const audiences = [
  {
    icon: Heart,
    title: "Wives & individuals",
    text: "Find your voice, understand your needs, and approach intimacy with confidence rather than shame.",
    color: "bg-[#FDE2E8]",
  },
  {
    icon: Users,
    title: "Couples",
    text: "Make space for honest conversations, renewed closeness, and a relationship that feels like home again.",
    color: "bg-[#F2E7FF]",
  },
  {
    icon: School,
    title: "Parents & communities",
    text: "Build age-appropriate conversations about bodies, boundaries, consent, and growing up safely.",
    color: "bg-[#E3F5EE]",
  },
];

const trustedLogos = [
  { name: "Craftsman", src: "/logos/craftsman.jpg" },
  { name: "DataKirk", src: "/logos/datakirk.png" },
  { name: "DKT International Nigeria", src: "/logos/dkt-international.jpg" },
  { name: "The Dr. Rachael Institute", src: "/logos/dr-rachael-institute.jpg" },
  { name: "Dr. Seyil Absolute Wellness", src: "/logos/dr-seyil.png" },
  { name: "Eat 2 Live", src: "/logos/eat2live.png" },
  { name: "Engraced Life", src: "/logos/engraced-life.jpg" },
  { name: "Exquisite Magazine", src: "/logos/exquisite-magazine.jpg" },
  { name: "Food World Emporium", src: "/logos/food-world-emporium.png" },
  { name: "Goz", src: "/logos/goz.png" },
  { name: "JPosh Services", src: "/logos/jposh-services.png" },
  { name: "JR Scents", src: "/logos/jr-scents.png" },
  { name: "Kiss Lube Gel", src: "/logos/kiss-lube-gel.jpg" },
  { name: "Kudos Healthy Living", src: "/logos/kudos-healthy-living.png" },
  { name: "LadyCare", src: "/logos/ladycare.jpg" },
  { name: "Laurels Property", src: "/logos/laurels-property.png" },
  { name: "Learnify Africa", src: "/logos/learnify-africa.png" },
  { name: "Mmiri", src: "/logos/mmiri.png" },
  { name: "NGH", src: "/logos/ngh.png" },
  { name: "Oasis Global Properties", src: "/logos/oasis-global-properties.jpg" },
  { name: "Opus Homes", src: "/logos/opus-homes.png" },
  { name: "Peadville Schools", src: "/logos/peadville-schools.jpg" },
  { name: "Rotary District 9111", src: "/logos/rotary-district-9111.jpg" },
  { name: "Segz", src: "/logos/segz.png" },
  { name: "Senora Secrets", src: "/logos/senora-secrets.png" },
  { name: "SexTalk with Soulspice", src: "/logos/sextalk.png" },
  { name: "Triple S Fabrics", src: "/logos/triple-s-fabrics.png" },
  { name: "True Envy", src: "/logos/true-envy.png" },
  { name: "Zuife Naturals", src: "/logos/zuife-naturals.png" },
];

const services = [
  {
    number: "01",
    title: "Discovery call",
    text: "A gentle first conversation to understand what you need and choose a clear next step.",
    href: calendlyUrl,
    cta: "Book a discovery call",
    booking: true,
  },
  {
    number: "02",
    title: "Private consultation",
    text: "Personal support for intimacy, relationship, and sexuality concerns, whether individually or as a couple.",
    href: consultationUrl,
    cta: "Book a consultation",
  },
  {
    number: "03",
    title: "Speaking & workshops",
    text: "Thoughtful sessions for churches, schools, events, and organisations, shaped around your audience.",
    href: "mailto:Intimacymasters@gmail.com?subject=Speaking%20and%20workshop%20enquiry",
    cta: "Plan a session",
  },
  {
    number: "04",
    title: "Books & resources",
    text: "Practical tools for marriage, intimacy, parenting conversations, and healthier connection at home.",
    href: "https://selar.co/womansexwasmadeforyoutoo",
    cta: "Explore resources",
  },
];

const learningOffers = [
  {
    title: "Become a Wife Star",
    text: "A guided marriage enrichment programme for wives who want to build connection with confidence and intention.",
    href: "https://selar.co/Becomeawifestar",
    label: "Programme",
    icon: GraduationCap,
  },
  {
    title: "100 Bedroom Tips",
    text: "A practical collection of ideas designed to bring curiosity, warmth, and playfulness into married intimacy.",
    href: "https://selar.co/100bedroomtips",
    label: "Digital guide",
    icon: BookOpen,
  },
  {
    title: "Outercourse",
    text: "A focused resource for couples exploring affectionate and satisfying connection beyond one familiar pattern.",
    href: "https://selar.co/OUTERCOURSE",
    label: "Intimacy resource",
    icon: Heart,
  },
  {
    title: "Shop the book on Amazon",
    text: "Find The Intimacy Masters reading collection through its Amazon listing.",
    href: "https://a.co/d/2TiXvAu",
    label: "Book",
    icon: BookOpen,
  },
  {
    title: "Intimacy Card",
    text: "Conversation prompts that help couples move from assumptions to more open and meaningful dialogue.",
    href: "https://selar.co/Intimacycard",
    label: "Conversation tool",
    icon: MessageCircleHeart,
  },
  {
    title: "Child Education Mini Course",
    text: "A concise starting point for parents preparing to discuss bodies, boundaries, and safety with children.",
    href: "https://selar.co/childeducationminicourse",
    label: "Mini course",
    icon: School,
  },
  {
    title: "Child Education Programme",
    text: "A fuller learning experience for age appropriate sexuality education and safer family conversations.",
    href: "https://selar.co/childeducation",
    label: "Parent learning",
    icon: Users,
  },
  {
    title: "Woman, Sex Was Made for You Too",
    text: "A candid resource for women seeking language, understanding, and confidence around marital intimacy.",
    href: "https://selar.co/womansexwasmadeforyoutoo",
    label: "Featured book",
    icon: Sparkles,
  },
];

const testimonials = [
  {
    quote:
      "I cannot remember the last time I enjoyed myself like this. Thank you for helping us reconnect.",
    label: "Private coaching client",
    tag: "Renewed connection",
  },
  {
    quote:
      "I found you speaking and realised: this is my marriage too. Intimacy can be good for both of us.",
    label: "Community member",
    tag: "Confidence & voice",
  },
  {
    quote:
      "You helped me through a battle I had carried for years. I can now love my wife more intentionally.",
    label: "Anonymous client",
    tag: "Personal breakthrough",
  },
  {
    quote:
      "The practical guidance brought playfulness back into our home. We feel close again.",
    label: "Programme participant",
    tag: "Marriage enrichment",
  },
];

const faqs = [
  {
    q: "Is The Intimacy Masters for Christians?",
    a: "Yes. Our work is faith-centered and creates room to explore emotional and sexual connection while respecting Christian values, personal dignity, and the realities of married life.",
  },
  {
    q: "Do we need to be experiencing a serious problem?",
    a: "Not at all. You can seek support when something feels difficult or simply because you want to invest in communication, closeness, and a more fulfilling relationship.",
  },
  {
    q: "I feel embarrassed talking about sex. Where do I start?",
    a: "You do not need perfect words. Begin with the question or concern that feels most important. The conversation is compassionate, practical, and free of shame.",
  },
  {
    q: "Can I book individual support?",
    a: "Yes. The Intimacy Masters supports individuals and couples, with private guidance shaped around your questions, needs, and relationship experience.",
  },
  {
    q: "Do you work with schools, churches, or organisations?",
    a: "Yes. The Intimacy Masters offers teaching, workshops, group coaching, parent and child communication sessions, and age appropriate sexuality education for schools and communities.",
  },
];

function BrandLogo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`grid shrink-0 place-items-center rounded-full ${compact ? "size-9" : "size-11"} ${inverse ? "bg-white/10" : "bg-white"}`}>
        <Image src="/brand/intimacy-masters-symbol.png" alt="" width={compact ? 31 : 38} height={compact ? 31 : 38} />
      </span>
      <span className={`${compact ? "text-[13px] sm:text-sm" : "text-base"} font-black uppercase leading-[1.04] tracking-[0.08em] ${inverse ? "text-white" : "text-[#381626]"}`}>
        The Intimacy<br />Masters
      </span>
    </span>
  );
}

function ButtonLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      whileTap={{ scale: 0.97 }}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light
          ? "bg-white text-[#381626] hover:bg-[#FFF4F7] focus-visible:outline-white"
          : "bg-[#4B1530] text-white hover:bg-[#6A2044] focus-visible:outline-[#4B1530]"
      }`}
    >
      {children}
      <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
    </motion.a>
  );
}

function BookingButton({
  children,
  light = false,
  onClick,
  onPrepare,
}: {
  children: React.ReactNode;
  light?: boolean;
  onClick: () => void;
  onPrepare: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerEnter={onPrepare}
      onFocus={onPrepare}
      onTouchStart={onPrepare}
      whileTap={{ scale: 0.97 }}
      aria-haspopup="dialog"
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
        light
          ? "bg-white text-[#381626] hover:bg-[#FFF4F7] focus-visible:outline-white"
          : "bg-[#4B1530] text-white hover:bg-[#6A2044] focus-visible:outline-[#4B1530]"
      }`}
    >
      {children}
      <ArrowRight size={17} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}

function CalendlyModal({
  mounted,
  open,
  onClose,
}: {
  mounted: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!mounted) return null;

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
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-labelledby="calendly-title"
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.985 }}
        transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0 : 0.38 }}
        className="flex h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] border border-white/80 bg-[#FFF9F5] shadow-[0_35px_100px_rgba(30,6,18,0.34)] sm:h-[88dvh] sm:rounded-[2.2rem]"
      >
            <div className="flex items-center justify-between gap-4 border-b border-[#4B1530]/10 px-5 py-4 sm:px-7">
              <div>
                <BrandLogo compact />
                <p id="calendly-title" className="sr-only">Book a discovery call with The Intimacy Masters</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-full bg-[#F4E4E9] text-[#4B1530] transition-colors hover:bg-[#EFCFD9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B1530]"
                aria-label="Close booking calendar"
              >
                <X size={19} />
              </button>
            </div>
            <div className="grid min-h-0 flex-1 lg:grid-cols-[300px_1fr]">
              <aside className="hidden flex-col justify-between bg-[#3D162A] p-8 text-white lg:flex">
                <div>
                  <Image src="/brand/intimacy-masters-symbol.png" alt="" width={82} height={82} className="brightness-0 invert" />
                  <p className="eyebrow mt-8 text-[#F3A6BD]">Discovery call</p>
                  <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em]">
                    A private first conversation.
                  </h2>
                  <p className="mt-5 leading-relaxed text-white/68">
                    Share what is on your mind, ask questions, and choose a clear next step without pressure.
                  </p>
                </div>
                <div className="space-y-3 border-t border-white/14 pt-6 text-sm font-semibold text-white/72">
                  <p className="flex items-center gap-2"><Check size={16} className="text-[#F3A6BD]" /> 30 minutes</p>
                  <p className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#F3A6BD]" /> Private and confidential</p>
                </div>
              </aside>
              <div className="relative min-h-0 bg-white" aria-busy={!iframeLoaded}>
                <div
                  className={`absolute inset-0 z-20 grid place-items-center bg-[#FFF9F5] p-8 text-center transition-opacity duration-300 ${
                    iframeLoaded ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="max-w-sm">
                    <div className="relative mx-auto size-12">
                      <span className="absolute inset-0 rounded-full border-4 border-[#EFD9E1]" />
                      <motion.span
                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#8D2F5B]"
                        animate={reduceMotion ? undefined : { rotate: 360 }}
                        transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
                      />
                    </div>
                    <p className="mt-5 text-base font-bold text-[#4B1530]">Preparing the available times</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#806A74]">
                      The secure booking calendar may take a moment on slower connections.
                    </p>
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#8D2F5B] underline underline-offset-4"
                    >
                      Open Calendly directly <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
                <iframe
                  title="The Intimacy Masters booking calendar"
                  src={`${calendlyUrl}?hide_gdpr_banner=1&background_color=fff9f5&text_color=381626&primary_color=c20c78`}
                  loading="eager"
                  onLoad={() => setIframeLoaded(true)}
                  className={`relative z-10 h-full min-h-[580px] w-full bg-white transition-opacity duration-300 sm:min-h-0 ${
                    iframeLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-[#4B1530]/10 px-5 py-3 text-center text-xs font-semibold text-[#725B66]">
              <span>
                Having trouble with the calendar?{" "}
                <a href={calendlyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#8D2F5B] underline underline-offset-2">
                  Open Calendly <ExternalLink size={12} />
                </a>
              </span>
              <a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#8D2F5B] underline underline-offset-2">
                Alternate booking page <ExternalLink size={12} />
              </a>
            </div>
      </motion.section>
    </motion.div>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow text-[#8D2F5B]">{eyebrow}</p>
      <h2 className="section-title mt-4 text-[#381626]">{title}</h2>
      {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#67545D]">{text}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [calendlyMounted, setCalendlyMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isDraggingTestimonials, setIsDraggingTestimonials] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);
  const testimonialDragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const reduceMotion = useReducedMotion();

  const prepareCalendly = () => setCalendlyMounted(true);
  const openCalendly = () => {
    setCalendlyMounted(true);
    setCalendlyOpen(true);
  };

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetToTop = () => {
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
      window.scrollTo(0, 0);
    };

    resetToTop();
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(resetToTop);
    });
    window.addEventListener("load", resetToTop, { once: true });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.removeEventListener("load", resetToTop);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(() => setCalendlyMounted(true), { timeout: 2500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timerId = setTimeout(() => setCalendlyMounted(true), 1800);
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const track = testimonialTrackRef.current;
    if (!track) return;

    const updateCarousel = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const progress = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
      const cards = Array.from(track.children) as HTMLElement[];
      const firstCard = cards[0];
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
      const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth;
      const nearestIndex = Math.min(cards.length - 1, Math.max(0, Math.round(track.scrollLeft / step)));

      setTestimonialProgress(Math.min(1, Math.max(0, progress)));
      setActiveTestimonial(nearestIndex);
    };

    updateCarousel();
    track.addEventListener("scroll", updateCarousel, { passive: true });
    window.addEventListener("resize", updateCarousel);

    return () => {
      track.removeEventListener("scroll", updateCarousel);
      window.removeEventListener("resize", updateCarousel);
    };
  }, []);

  const moveTestimonials = (direction: -1 | 1) => {
    const track = testimonialTrackRef.current;
    const firstCard = track?.firstElementChild as HTMLElement | null;
    if (!track || !firstCard) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
    track.scrollBy({
      left: direction * (firstCard.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const beginTestimonialDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = testimonialTrackRef.current;
    if (!track) return;

    testimonialDragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
    };
    setIsDraggingTestimonials(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const dragTestimonials = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!testimonialDragRef.current.active) return;
    const track = testimonialTrackRef.current;
    if (!track) return;
    track.scrollLeft = testimonialDragRef.current.startScroll - (event.clientX - testimonialDragRef.current.startX);
  };

  const endTestimonialDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!testimonialDragRef.current.active) return;
    testimonialDragRef.current.active = false;
    setIsDraggingTestimonials(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { type: "spring" as const, bounce: 0, duration: 0.65 },
      };

  return (
    <main className="overflow-hidden">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-[#fff8f5]/80 px-5 py-3 shadow-[0_12px_45px_rgba(67,20,42,0.09)] backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2.5" aria-label="The Intimacy Masters home">
            <BrandLogo compact />
          </a>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#4F3A44] lg:flex">
            <a href="#about" className="nav-link">About Jessica</a>
            <a href="#support" className="nav-link">Who we serve</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#stories" className="nav-link">Stories</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="hidden lg:block">
            <BookingButton onClick={openCalendly} onPrepare={prepareCalendly}>Let&apos;s talk</BookingButton>
          </div>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full bg-[#4B1530] text-white lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="mx-auto mt-2 grid max-w-7xl gap-1 rounded-[2rem] border border-white/80 bg-[#fff8f5]/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              {[
                ["About Jessica", "#about"],
                ["Who we serve", "#support"],
                ["Services", "#services"],
                ["Testimonials", "#stories"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-bold text-[#381626] hover:bg-[#FDE2E8]"
                >
                  {label}
                </a>
              ))}
              <div className="mt-2"><BookingButton onClick={openCalendly} onPrepare={prepareCalendly}>Book a discovery call</BookingButton></div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <section id="top" className="relative min-h-[820px] bg-[#F6B7C9] pt-28 sm:min-h-[900px]">
        <Image
          src="/images/jessica-hero.jpg"
          alt="Jessica Sampson smiling in a professional portrait"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[57%_56%] sm:object-[58%_27%]"
        />
        <div className="hero-mobile-veil absolute inset-0 bg-[linear-gradient(90deg,rgba(255,243,238,0.97)_0%,rgba(255,243,238,0.82)_39%,rgba(255,243,238,0.12)_68%,rgba(75,21,48,0.12)_100%)] max-md:bg-[linear-gradient(180deg,rgba(255,243,238,0.96)_0%,rgba(255,243,238,0.72)_49%,rgba(75,21,48,0.08)_100%)]" />
        <div className="relative mx-auto flex min-h-[690px] max-w-7xl items-start px-6 pt-20 sm:px-8 md:items-center md:pt-4 lg:px-10">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 26 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.75 }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4B1530]/10 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4B1530] backdrop-blur-md">
              <Sparkles size={14} /> Faith-centered intimacy guidance
            </div>
            <h1 className="hero-title text-[#321321]">
              A deeper connection.<br />
              <span className="text-[#8D2F5B]">A more fulfilling marriage.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#4F3A44] sm:text-xl">
              Honest conversations and practical support for Christians who want to reconnect emotionally, relationally, and physically.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookingButton onClick={openCalendly} onPrepare={prepareCalendly}>Book a discovery call</BookingButton>
              <motion.a
                href="#services"
                whileTap={{ scale: 0.97 }}
                className="hero-mobile-support inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#4B1530]/20 bg-white/65 px-6 py-3 text-sm font-bold text-[#4B1530] backdrop-blur-md hover:bg-white"
              >
                Explore support <ChevronDown size={17} />
              </motion.a>
            </div>
            <div className="hero-mobile-proof mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-[#5B4650]">
              {["Compassionate", "Confidential", "Practical"].map((item) => (
                <span key={item} className="hero-mobile-proof-item flex items-center gap-2"><Check size={15} /> {item}</span>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-[#4B1530] backdrop-blur-lg md:flex">
          <ShieldCheck size={15} /> A shame-free space for honest questions
        </div>
      </section>

      <section aria-labelledby="trusted-title" className="overflow-hidden border-y border-white/10 bg-[#2A111E] py-20 text-white sm:py-24">
        <motion.div {...reveal} className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <p className="eyebrow text-[#F3A6BD]">Trusted by</p>
          <h2 id="trusted-title" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            Organisations and communities that value honest conversations.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
            The Intimacy Masters has reached businesses, schools, wellness communities, and professional organisations.
          </p>
        </motion.div>

        <div className="mt-14 space-y-4 sm:mt-16 sm:space-y-5">
          {[trustedLogos.slice(0, 15), trustedLogos.slice(15)].map((row, rowIndex) => (
            <div key={rowIndex} className="logo-marquee">
              <div className={`logo-marquee-track ${rowIndex === 1 ? "logo-marquee-track-reverse" : ""}`}>
                {[...row, ...row].map((logo, index) => {
                  const duplicate = index >= row.length;
                  return (
                    <motion.div
                      key={`${logo.name}-${index}`}
                      data-duplicate={duplicate}
                      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.025 }}
                      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                      className="logo-card"
                      aria-hidden={duplicate || undefined}
                    >
                      <Image
                        src={logo.src}
                        alt={duplicate ? "" : `${logo.name} logo`}
                        fill
                        sizes="(max-width: 640px) 144px, 184px"
                        className="object-contain p-4"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 text-xs font-bold uppercase tracking-[0.14em] text-white/65 sm:text-sm">
          {["ELOY Awards 2022", "20,000+ women educated", "5,000+ men reached"].map((item) => (
            <span key={item} className="flex items-center gap-2"><Heart size={12} fill="currentColor" className="text-[#F3A6BD]" /> {item}</span>
          ))}
        </div>
      </section>

      <section id="about" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-10">
          <motion.div {...reveal} className="relative">
            <div className="relative aspect-[2/3] overflow-hidden rounded-[2.4rem] bg-[#F6B7C9] shadow-[0_30px_80px_rgba(75,21,48,0.14)]">
              <Image
                src="/images/jessica-about-professional.jpg"
                alt="Jessica Sampson, founder of The Intimacy Masters"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 max-w-[235px] rounded-[1.6rem] border border-white bg-white/88 p-5 shadow-xl backdrop-blur-xl sm:-right-6">
              <p className="font-display text-4xl font-semibold text-[#8D2F5B]">25,000+</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-[#5B4650]">women and men educated on healthier intimacy and relationships</p>
            </div>
          </motion.div>

          <motion.div {...reveal}>
            <SectionIntro
              eyebrow="Meet Jessica"
              title="The woman behind the honest conversations."
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#5F4B55]">
              <p>
                Jessica Sampson is an award-winning licensed clinical sexologist, family life practitioner, author, and founder of The Intimacy Masters.
              </p>
              <p>
                She helps couples and individuals find language for questions that are often hard to say out loud, including marriage, desire, emotional connection, and sexual wellbeing.
              </p>
              <p>
                Her approach brings faith-centered understanding together with practical intimacy education, creating room for your values, your questions, and your desire for something better.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Clinical sexologist", "Family life practitioner", "Author", "Sexual assault referral practitioner"].map((tag) => (
                <span key={tag} className="rounded-full bg-[#F7E6EB] px-4 py-2 text-sm font-bold text-[#6A2044]">{tag}</span>
              ))}
            </div>
            <div className="mt-9"><BookingButton onClick={openCalendly} onPrepare={prepareCalendly}>Find your next step</BookingButton></div>
          </motion.div>
        </div>
      </section>

      <section id="support" className="section-pad bg-[#F5EBFF]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal}>
            <SectionIntro
              eyebrow="Who we serve"
              title="Support for the season you are in."
              text="Whether you are finding your voice, navigating disconnection, or preparing a child for the world, there is a thoughtful place to begin."
            />
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {audiences.map((audience, index) => (
              <motion.article
                key={audience.title}
                {...reveal}
                transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.08 }}
                className="group rounded-[2rem] border border-white/70 bg-white/65 p-7 shadow-[0_18px_55px_rgba(70,33,74,0.07)] backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className={`grid size-14 place-items-center rounded-2xl ${audience.color} text-[#4B1530]`}>
                  <audience.icon size={25} />
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.03em] text-[#381626]">{audience.title}</h3>
                <p className="mt-4 leading-relaxed text-[#67545D]">{audience.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section-pad bg-[#3D162A] text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal}>
            <p className="eyebrow text-[#F3A6BD]">Services & resources</p>
            <h2 className="section-title mt-4 max-w-3xl text-white">Choose the support that meets you where you are.</h2>
          </motion.div>
          <div className="mt-14 divide-y divide-white/15 border-y border-white/15">
            {services.map((service) => {
              const content = (
                <>
                  <span className="font-display text-4xl text-[#F3A6BD]">{service.number}</span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.03em] sm:text-3xl">{service.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-white/66">{service.text}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition-colors group-hover:bg-white group-hover:text-[#3D162A]">
                    {service.cta}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </>
              );

              return service.booking ? (
                <motion.button
                  key={service.number}
                  type="button"
                  onClick={openCalendly}
                  onPointerEnter={prepareCalendly}
                  onFocus={prepareCalendly}
                  onTouchStart={prepareCalendly}
                  {...reveal}
                  whileTap={{ scale: 0.995 }}
                  className="group grid w-full gap-5 py-8 text-left sm:grid-cols-[75px_1fr_auto] sm:items-center sm:py-10"
                  aria-haspopup="dialog"
                >
                  {content}
                </motion.button>
              ) : (
                <motion.a
                  key={service.number}
                  href={service.href}
                  target={service.href.startsWith("http") ? "_blank" : undefined}
                  rel={service.href.startsWith("http") ? "noreferrer" : undefined}
                  {...reveal}
                  whileTap={{ scale: 0.995 }}
                  className="group grid gap-5 py-8 sm:grid-cols-[75px_1fr_auto] sm:items-center sm:py-10"
                >
                  {content}
                </motion.a>
              );
            })}
          </div>

          <motion.div {...reveal} className="mt-20 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#F3A6BD]">Learn at your pace</p>
              <h3 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl">
                Every course, book, and practical resource in one place.
              </h3>
            </div>
            <p className="max-w-md text-base leading-relaxed text-white/64">
              Choose a focused next step for marriage, intimacy, parenting conversations, or personal learning.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {learningOffers.map((offer, index) => (
              <motion.a
                key={offer.href}
                href={offer.href}
                target="_blank"
                rel="noreferrer"
                {...reveal}
                transition={{ type: "spring", bounce: 0, duration: 0.5, delay: (index % 4) * 0.05 }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                whileTap={{ scale: 0.985 }}
                className="group flex min-h-[275px] flex-col rounded-[1.8rem] border border-white/12 bg-white/[0.075] p-6 transition-colors hover:bg-white/[0.12]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#F6B7C9] text-[#4B1530]"><offer.icon size={20} /></span>
                  <ExternalLink size={17} className="text-white/45 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-[#F3A6BD]">{offer.label}</p>
                <h4 className="mt-3 text-xl font-bold tracking-[-0.025em] text-white">{offer.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-white/62">{offer.text}</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 grid gap-5 rounded-[2.3rem] bg-[#F6B7C9] p-7 text-[#381626] md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="eyebrow text-[#6A2044]">Keep learning</p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Honest reflections for marriage and family life.</h3>
              <p className="mt-3 max-w-2xl text-[#644452]">Join The Intimacy Masters newsletter for thoughtful guidance you can return to at your own pace.</p>
            </div>
            <ButtonLink href="https://theintimacymasters.substack.com/">Read the newsletter</ButtonLink>
          </div>
        </div>
      </section>

      <section id="stories" className="section-pad bg-[#FFF9F5]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <motion.div {...reveal} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionIntro
              eyebrow="Real stories"
              title="Small conversations. Meaningful change."
              text="Shared anonymously and lightly edited for clarity to protect the privacy of clients and community members."
            />
            <div className="hidden items-center gap-2 text-sm font-bold text-[#6A2044] sm:flex"><MessageCircleHeart size={18} /> In their own words</div>
          </motion.div>

          <div
            ref={testimonialTrackRef}
            onPointerDown={beginTestimonialDrag}
            onPointerMove={dragTestimonials}
            onPointerUp={endTestimonialDrag}
            onPointerCancel={endTestimonialDrag}
            className={`testimonial-scroll mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 ${isDraggingTestimonials ? "is-dragging" : ""}`}
            aria-label="Client testimonials"
          >
            {testimonials.map((item, index) => (
              <motion.blockquote
                key={item.quote}
                {...reveal}
                transition={{ type: "spring", bounce: 0, duration: 0.55, delay: index * 0.05 }}
                whileHover={reduceMotion ? undefined : { y: -7, rotate: index % 2 ? 0.25 : -0.25 }}
                className={`min-w-[86%] snap-start rounded-[2rem] p-7 transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(78,28,52,0.11)] sm:min-w-[58%] lg:min-w-[38%] ${index % 2 ? "bg-[#F2E7FF]" : "bg-[#FDE2E8]"}`}
              >
                <Quote size={30} className="text-[#8D2F5B]" fill="currentColor" />
                <p className="mt-8 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-[#381626] sm:text-3xl">“{item.quote}”</p>
                <footer className="mt-9 flex items-end justify-between gap-4 border-t border-[#4B1530]/12 pt-5">
                  <div>
                    <p className="text-sm font-bold text-[#4B1530]">{item.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#7A626D]">{item.tag}</p>
                  </div>
                  <Heart size={19} className="text-[#8D2F5B]" />
                </footer>
              </motion.blockquote>
            ))}
          </div>
          <div className="mt-7 flex items-center gap-4 sm:gap-6">
            <div className="min-w-0 flex-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-[#E9D9E0]" aria-hidden="true">
                <motion.div
                  className="h-full origin-left rounded-full bg-[#8D2F5B]"
                  animate={{ scaleX: (1 + testimonialProgress * (testimonials.length - 1)) / testimonials.length }}
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", bounce: 0, duration: 0.35 }}
                />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-[#806A74]">
                {String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <motion.button
                type="button"
                onClick={() => moveTestimonials(-1)}
                disabled={testimonialProgress <= 0.01}
                whileTap={{ scale: 0.92 }}
                className="grid size-12 place-items-center rounded-full border border-[#4B1530]/15 bg-white text-[#4B1530] shadow-[0_8px_28px_rgba(78,28,52,0.08)] transition-colors hover:bg-[#FDE2E8] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={19} />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => moveTestimonials(1)}
                disabled={testimonialProgress >= 0.99}
                whileTap={{ scale: 0.92 }}
                className="grid size-12 place-items-center rounded-full bg-[#4B1530] text-white shadow-[0_10px_30px_rgba(78,28,52,0.2)] transition-colors hover:bg-[#6A2044] disabled:cursor-not-allowed disabled:opacity-35"
                aria-label="Next testimonial"
              >
                <ArrowRight size={19} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-pad bg-[#E3F5EE]">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <motion.div {...reveal}>
            <SectionIntro eyebrow="Good questions" title="You are allowed to ask." text="No question is too awkward, and you do not need to have everything figured out before you begin." />
            <div className="mt-8"><BookingButton onClick={openCalendly} onPrepare={prepareCalendly}>Ask your question</BookingButton></div>
          </motion.div>
          <motion.div {...reveal} className="divide-y divide-[#315547]/20 border-y border-[#315547]/20">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-5 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-bold tracking-[-0.02em] text-[#263E35] sm:text-xl">{item.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="grid size-9 shrink-0 place-items-center rounded-full bg-white/70">
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.36 }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-8 leading-relaxed text-[#516A60]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F6B7C9] px-6 py-8 sm:px-8 lg:px-10">
        <motion.div
          {...reveal}
          className="relative mx-auto min-h-[620px] max-w-7xl overflow-hidden rounded-[2.6rem] bg-[#4B1530] p-8 text-white sm:p-12 lg:p-16"
        >
          <div className="absolute inset-0 md:left-auto md:w-[62%]">
            <Image
              src="/images/jessica-pink-suit.jpg"
              alt="Jessica Sampson in a pink suit"
              fill
              sizes="(max-width: 767px) 100vw, 62vw"
              className="object-cover object-[50%_28%]"
            />
          </div>
          <div className="final-cta-veil absolute inset-0" />
          <Image
            src="/brand/intimacy-masters-symbol.png"
            alt=""
            width={360}
            height={360}
            className="absolute -bottom-12 -left-12 opacity-[0.08]"
          />
          <div className="relative z-10 flex min-h-[500px] max-w-3xl flex-col justify-center">
            <p className="eyebrow text-[#F6B7C9]">Your next chapter</p>
            <h2 className="final-cta-title mt-5 font-display text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              A closer relationship can begin with one honest conversation.
            </h2>
            <p className="final-cta-description mt-7 max-w-2xl text-lg leading-relaxed text-white/72">
              You do not have to figure it all out before reaching out. Let&apos;s find the right place for you to begin.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BookingButton onClick={openCalendly} onPrepare={prepareCalendly} light>Book a discovery call</BookingButton>
              <motion.a
                href={consultationUrl}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.97 }}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
              >
                Book a private consultation
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="bg-[#2A111E] px-6 pb-8 pt-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div>
              <BrandLogo inverse />
              <p className="mt-6 max-w-md leading-relaxed text-white/62">Faith-centered guidance. Honest conversations. Practical intimacy education for marriage and family life.</p>
              <div className="mt-7 flex gap-3">
                <a href="https://www.instagram.com/theintimacymasters/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-[#2A111E]"><Camera size={18} /></a>
                <a href="mailto:Intimacymasters@gmail.com" aria-label="Email" className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-[#2A111E]"><Mail size={18} /></a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Explore</p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-white/70">
                <a href="#about" className="hover:text-white">About Jessica</a>
                <a href="#support" className="hover:text-white">Who we serve</a>
                <a href="#services" className="hover:text-white">Services & resources</a>
                <a href="#stories" className="hover:text-white">Testimonials</a>
                <a href="#faq" className="hover:text-white">FAQ</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Work with us</p>
              <div className="mt-5 grid gap-3 text-sm font-semibold text-white/70">
                <button
                  type="button"
                  onClick={openCalendly}
                  onPointerEnter={prepareCalendly}
                  onFocus={prepareCalendly}
                  onTouchStart={prepareCalendly}
                  className="w-fit text-left hover:text-white"
                >
                  Discovery call
                </button>
                <a href={consultationUrl} target="_blank" rel="noreferrer" className="hover:text-white">Private consultation</a>
                <a href="mailto:Intimacymasters@gmail.com" className="hover:text-white">Speaking and workshops</a>
                <a href="tel:+2348034206121" className="hover:text-white">+234 803 420 6121</a>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} The Intimacy Masters. All rights reserved.</p>
            <p>Education and coaching are not a substitute for emergency, medical, or psychiatric care.</p>
          </div>
        </div>
      </footer>
      <CalendlyModal mounted={calendlyMounted} open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </main>
  );
}
