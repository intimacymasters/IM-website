import Link from "next/link";
import { Camera, Mail, MessageCircle, Music2 } from "lucide-react";
import { contact, mailtoLink, navLinks, whatsappLink } from "../lib/site";
import { BookingTextButton } from "./booking";
import { BrandLogo } from "./brand";

const socialClass = "grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-[#2A111E]";

export function Footer() {
  return (
    <footer className="bg-[#2A111E] px-6 pb-28 pt-16 text-white sm:px-8 sm:pb-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1.4fr_0.8fr_0.9fr]">
          <div>
            <BrandLogo inverse />
            <p className="mt-6 max-w-md leading-relaxed text-white/62">
              Rooting for your intimacy, your relationship and your marriage. Faith-centered guidance, honest conversations, and practical education for couples, wives and parents.
            </p>
            <div className="mt-7 flex gap-3">
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className={socialClass}><Camera size={18} /></a>
              <a href={contact.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" className={socialClass}><Music2 size={18} /></a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={socialClass}><MessageCircle size={18} /></a>
              <a href={mailtoLink("Website enquiry")} aria-label="Email" className={socialClass}><Mail size={18} /></a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Explore</p>
            <div className="mt-4 grid text-sm font-semibold text-white/70">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="py-2 hover:text-white">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F6B7C9]">Talk to us</p>
            <div className="mt-4 grid text-sm font-semibold text-white/70">
              <BookingTextButton className="w-fit py-2 text-left hover:text-white">Free discovery call</BookingTextButton>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="py-2 hover:text-white">WhatsApp {contact.phoneDisplay}</a>
              <a href={contact.phoneHref} className="py-2 hover:text-white">Call {contact.phoneDisplay}</a>
              <a href={mailtoLink("Website enquiry")} className="break-all py-2 hover:text-white">{contact.email}</a>
              <a href={contact.newsletter} target="_blank" rel="noreferrer" className="py-2 hover:text-white">Weekly newsletter</a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} The Intimacy Masters. All rights reserved.{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy policy</Link>
          </p>
          <p>Education and coaching are not a substitute for emergency, medical, or psychiatric care.</p>
        </div>
      </div>
    </footer>
  );
}
