import Image from "next/image";
import { Check, Gift } from "lucide-react";
import { freeGuide } from "../lib/site";
import { GuideForm } from "./guide-form";
import { Reveal } from "./reveal";

const inside = ["Direct, playful and planned ways to begin", "Private codes only the two of you know", "Kindness, touch and conversation that build desire"];

/**
 * The low-commitment step: a free guide in exchange for a first name, email
 * and phone number. What it is on the left, the form on the right.
 */
export function GuideSignup() {
  return (
    <section id="free-guide" className="section-pad bg-[#3D162A] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10">
        <Reveal>
          <p className="eyebrow flex items-center gap-2 text-[#F3A6BD]"><Gift size={15} /> Free guide · {freeGuide.edition}</p>
          <h2 className="section-title mt-4">20 ways to initiate, without the <em className="font-display italic text-[#F6B7C9]">awkwardness.</em></h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/72">
            A {freeGuide.pages} page guide from Coach Jessica, written for married couples.
          </p>

          <div className="mt-9 grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
            <div className="guide-booklet relative mx-auto w-full max-w-sm sm:mx-0">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-[0_26px_60px_rgba(0,0,0,0.45)]">
                <Image src={freeGuide.cover} alt={`Cover of the free guide, ${freeGuide.title}`} fill sizes="(max-width: 639px) 85vw, 360px" className="object-cover" />
              </div>
            </div>
            <ul className="space-y-3">
              {inside.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/85"><Check size={18} className="mt-1 shrink-0 text-[#F6B7C9]" /> {item}</li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-sm font-semibold text-white/55">Frank, grown up language. For married adults.</p>
        </Reveal>

        <Reveal delay={0.08}>
          <GuideForm />
        </Reveal>
      </div>
    </section>
  );
}
