"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Lock, MailCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { contact, whatsappLink } from "../lib/site";

type Errors = Partial<Record<"firstName" | "email" | "phone", string>>;
type Unlocked = { firstName: string; email: string; guideUrl: string };

const STORAGE_KEY = "tim-free-guide";

const inputClass =
  "mt-2 w-full rounded-2xl border border-[#4B1530]/15 bg-white px-4 py-3.5 text-base text-[#381626] placeholder:text-[#A8959E] focus:border-[#8D2F5B] focus:outline-none focus:ring-2 focus:ring-[#8D2F5B]/25";

/**
 * The gate for the free guide: first name, email and phone, then the guide.
 * The server saves the details before it hands back the link.
 */
export function GuideForm() {
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [unlocked, setUnlocked] = useState<Unlocked | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Someone who already unlocked the guide on this device does not fill the form again.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setUnlocked(JSON.parse(saved) as Unlocked);
    } catch {
      // Private browsing or blocked storage: the form simply shows as normal.
    }
  }, []);

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    if (key !== "company") setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/guide", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, page: window.location.pathname }),
      });
      const data = (await response.json()) as { ok: boolean; errors?: Errors; message?: string; guideUrl?: string };
      if (data.ok && data.guideUrl) {
        const next = { firstName: form.firstName.trim(), email: form.email.trim(), guideUrl: data.guideUrl };
        setUnlocked(next);
        // The card changes height, so bring the unlocked guide back into view.
        window.requestAnimationFrame(() => cardRef.current?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" }));
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Storage unavailable: the guide is still unlocked for this visit.
        }
      } else if (data.errors) {
        setErrors(data.errors);
      } else {
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setMessage("We could not reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div ref={cardRef} className="rounded-[2rem] bg-[#FFF9F5] p-6 text-[#381626] shadow-[0_30px_80px_rgba(0,0,0,0.35)] [overflow-anchor:none] sm:p-9">
        {unlocked ? (
          <motion.div
            key="unlocked"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0, duration: reduceMotion ? 0.15 : 0.5 }}
            aria-live="polite"
          >
            <span className="grid size-14 place-items-center rounded-full bg-[#E3F5EE] text-[#1F5A44]"><Check size={26} strokeWidth={3} /></span>
            <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl">
              It is yours{unlocked.firstName ? `, ${unlocked.firstName}` : ""}.
            </h3>
            <p className="mt-3 text-[#5F4B55]">Read it together tonight, or save it for the weekend.</p>
            <a
              href={unlocked.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#C20C78] px-6 text-base font-bold text-white transition-colors hover:bg-[#A80A68]"
            >
              Open the guide <ArrowUpRight size={18} strokeWidth={2.4} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            {unlocked.email && (
              <a
                href={`${contact.newsletter}subscribe?email=${encodeURIComponent(unlocked.email)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-3 rounded-2xl border border-[#4B1530]/12 bg-white p-4 text-left transition-colors hover:bg-[#FFF4F7]"
              >
                <MailCheck size={22} className="shrink-0 text-[#8D2F5B]" />
                <span className="text-sm leading-snug">
                  <strong className="block text-[#381626]">Confirm Jessica&apos;s weekly letter</strong>
                  <span className="text-[#6F5863]">One tap. Your email is already filled in.</span>
                </span>
                <ArrowUpRight size={16} className="ml-auto shrink-0 text-[#8D2F5B]" />
              </a>
            )}
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="eyebrow flex items-center gap-2 text-[#8D2F5B]"><Lock size={13} /> Free, instant access</p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-4xl">Tell us where to find you.</h3>
            <div className="mt-6 grid gap-4">
              <label className="block text-sm font-bold text-[#4B1530]">
                First name
                <input value={form.firstName} onChange={update("firstName")} autoComplete="given-name" aria-invalid={!!errors.firstName} className={inputClass} />
                {errors.firstName && <span className="mt-1.5 block text-sm font-semibold text-[#B3261E]">{errors.firstName}</span>}
              </label>
              <label className="block text-sm font-bold text-[#4B1530]">
                Email
                <input type="email" inputMode="email" value={form.email} onChange={update("email")} autoComplete="email" aria-invalid={!!errors.email} className={inputClass} />
                {errors.email && <span className="mt-1.5 block text-sm font-semibold text-[#B3261E]">{errors.email}</span>}
              </label>
              <label className="block text-sm font-bold text-[#4B1530]">
                Phone or WhatsApp number
                <input type="tel" inputMode="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" aria-invalid={!!errors.phone} className={inputClass} placeholder="+234" />
                {errors.phone && <span className="mt-1.5 block text-sm font-semibold text-[#B3261E]">{errors.phone}</span>}
              </label>
              {/* Honeypot: hidden from people, tempting to bots. */}
              <input value={form.company} onChange={update("company")} name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
            </div>
            {message && (
              <p role="alert" className="mt-4 rounded-2xl bg-[#FDECEA] px-4 py-3 text-sm font-semibold text-[#8C1D18]">
                {message}{" "}
                <a href={whatsappLink("Hello Jessica, I would like the free guide.")} target="_blank" rel="noreferrer" className="underline underline-offset-2">Message us on WhatsApp</a>
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#4B1530] px-6 text-base font-bold text-white transition-colors hover:bg-[#6A2044] disabled:opacity-60"
            >
              {sending ? "Unlocking" : "Unlock the free guide"}
              {!sending && <ArrowRight size={18} strokeWidth={2.4} className="transition-transform group-hover:translate-x-1" />}
            </button>
            <p className="mt-4 text-sm leading-relaxed text-[#6F5863]">
              You will also get Jessica&apos;s free weekly letter. Unsubscribe any time.{" "}
              <Link href="/privacy" className="font-bold text-[#8D2F5B] underline underline-offset-4">Privacy policy</Link>
            </p>
          </form>
        )}
    </div>
  );
}
