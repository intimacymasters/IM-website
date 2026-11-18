import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { press, pressCover } from "../lib/site";
import { Reveal } from "./reveal";

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Press coverage, with the magazine cover beside the list of articles. */
export function Press() {
  return (
    <section aria-labelledby="press-title" className="section-pad bg-[#F7E6EB]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-10">
        <Reveal className="mx-auto w-full max-w-[280px] lg:max-w-sm">
          <figure>
            <div className="relative aspect-[670/987] -rotate-2 overflow-hidden rounded-xl bg-white shadow-[0_30px_70px_rgba(75,21,48,0.22)]">
              <Image src={pressCover.src} alt={pressCover.alt} fill sizes="(max-width: 1023px) 280px, 384px" className="object-cover" />
            </div>
            <figcaption className="mt-6 text-center text-sm font-semibold text-[#67545D]">Vanguard Allure, 21 July 2024</figcaption>
          </figure>
        </Reveal>
        <div>
          <Reveal>
            <div className="max-w-3xl">
              <h2 id="press-title" className="section-title text-[#381626]">In the press.</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#5F4B55]">
                A magazine cover, and national coverage of the sex conference Jessica convened in Lagos.
              </p>
            </div>
          </Reveal>
          <ul className="mt-9 divide-y divide-[#4B1530]/14 border-y border-[#4B1530]/14">
            {press.map((item) => (
              <Reveal key={item.href} as="li">
                <a href={item.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-6">
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#8D2F5B]">
                      {item.outlet}
                      {item.date && <span className="text-[#67545D]"> · {formatDate(item.date)}</span>}
                    </span>
                    <span className="mt-2 block text-xl font-bold leading-snug tracking-[-0.025em] text-[#381626] transition-colors group-hover:text-[#8D2F5B] sm:text-2xl">{item.title}</span>
                  </span>
                  <ArrowUpRight size={22} className="mt-1 shrink-0 text-[#8D2F5B] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
