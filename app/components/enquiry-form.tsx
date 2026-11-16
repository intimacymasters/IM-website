"use client";

import { Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { mailtoLink, whatsappLink } from "../lib/site";

const eventTypes = ["Church or faith community", "School programme", "Conference or corporate event", "Bridal shower or intimacy class", "Something else"];

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/18 bg-white/[0.07] px-4 py-3.5 text-base text-white placeholder:text-white/40 focus:border-[#F6B7C9] focus:outline-none focus:ring-2 focus:ring-[#F6B7C9]/40";

/**
 * Speaking enquiry without a mail app or a server. The visitor fills in the
 * details and sends them through WhatsApp or email, already written out.
 * Nothing is stored on this site.
 */
export function EnquiryForm() {
  const [form, setForm] = useState({ name: "", organisation: "", type: eventTypes[0], date: "", audience: "", details: "" });
  const [touched, setTouched] = useState(false);
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const details = [
    `Name: ${form.name}`,
    form.organisation && `Organisation: ${form.organisation}`,
    `Type of event: ${form.type}`,
    form.date && `Date or month: ${form.date}`,
    form.audience && `Audience: ${form.audience}`,
    form.details && `Details: ${form.details}`,
  ].filter(Boolean);
  const message = ["Hello Jessica, I would like to enquire about a speaking session.", "", ...details].join("\n");

  const ready = form.name.trim().length > 1;
  const guard = (event: React.MouseEvent) => {
    if (!ready) {
      event.preventDefault();
      setTouched(true);
      document.getElementById("enquiry-name")?.focus();
    }
  };

  return (
    <form className="rounded-[2.2rem] border border-white/14 bg-white/[0.06] p-6 sm:p-9" onSubmit={(event) => event.preventDefault()} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold text-white/85">
          Your name
          <input id="enquiry-name" value={form.name} onChange={update("name")} autoComplete="name" required aria-invalid={touched && !ready} aria-describedby={touched && !ready ? "enquiry-name-error" : undefined} className={fieldClass} placeholder="Full name" />
          {touched && !ready && <span id="enquiry-name-error" className="mt-2 block text-sm font-semibold text-[#FFB4C6]">Please add your name so Jessica knows who is writing.</span>}
        </label>
        <label className="block text-sm font-bold text-white/85">
          Organisation <span className="font-semibold text-white/50">(optional)</span>
          <input value={form.organisation} onChange={update("organisation")} autoComplete="organization" className={fieldClass} placeholder="Church, school or company" />
        </label>
        <label className="block text-sm font-bold text-white/85">
          Type of event
          <select value={form.type} onChange={update("type")} className={`${fieldClass} appearance-none`}>
            {eventTypes.map((type) => (
              <option key={type} value={type} className="text-[#381626]">{type}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-bold text-white/85">
          Date or month <span className="font-semibold text-white/50">(optional)</span>
          <input value={form.date} onChange={update("date")} className={fieldClass} placeholder="For example, March 2027" />
        </label>
        <label className="block text-sm font-bold text-white/85 sm:col-span-2">
          Who is the audience? <span className="font-semibold text-white/50">(optional)</span>
          <input value={form.audience} onChange={update("audience")} className={fieldClass} placeholder="For example, 200 married couples, or parents of primary pupils" />
        </label>
        <label className="block text-sm font-bold text-white/85 sm:col-span-2">
          Anything else we should know? <span className="font-semibold text-white/50">(optional)</span>
          <textarea value={form.details} onChange={update("details")} rows={4} className={`${fieldClass} resize-y`} placeholder="Theme, location, what you hope people leave with" />
        </label>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noreferrer"
          onClick={guard}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1FAF5A] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#178F49]"
        >
          <MessageCircle size={17} /> Send on WhatsApp
        </a>
        <a
          href={mailtoLink("Speaking and workshop enquiry", message)}
          onClick={guard}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
        >
          <Mail size={17} /> Send by email
        </a>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-white/55">
        Your message opens in WhatsApp or your email app, already written, for you to send. Nothing you type here is stored on this website.
      </p>
    </form>
  );
}
