import Image from "next/image";
import { trustedLogos } from "../lib/site";
import { Reveal } from "./reveal";

export function TrustedBy({
  title = "Organisations and communities that value honest conversations.",
  text = "The Intimacy Masters has reached businesses, schools, wellness communities, and professional organisations.",
  stats = ["ELOY Awards 2022", "20,000+ women educated", "5,000+ men reached", "187,000+ on Instagram"],
}: {
  title?: string;
  text?: string;
  stats?: string[];
}) {
  return (
    <section aria-labelledby="trusted-title" className="overflow-hidden border-y border-white/10 bg-[#2A111E] py-20 text-white sm:py-24">
      <Reveal className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <p className="eyebrow text-[#F3A6BD]">Trusted by</p>
        <h2 id="trusted-title" className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">{text}</p>
      </Reveal>

      <div className="mt-14 space-y-4 sm:mt-16 sm:space-y-5">
        {[trustedLogos.slice(0, 15), trustedLogos.slice(15)].map((row, rowIndex) => (
          <div key={rowIndex} className="logo-marquee">
            <div className={`logo-marquee-track ${rowIndex === 1 ? "logo-marquee-track-reverse" : ""}`}>
              {[...row, ...row].map((logo, index) => {
                const duplicate = index >= row.length;
                return (
                  <div key={`${logo.name}-${index}`} data-duplicate={duplicate} className="logo-card" aria-hidden={duplicate || undefined}>
                    <Image src={logo.src} alt={duplicate ? "" : `${logo.name} logo`} fill sizes="(max-width: 640px) 144px, 184px" className="object-contain p-4" />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-xs font-bold uppercase tracking-[0.14em] text-white/65 sm:text-sm">
        {stats.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
