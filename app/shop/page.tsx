import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/page-shell";
import { ShopGrid } from "../components/shop-grid";
import { Accent, FinalCta } from "../components/sections";
import { amazonLinks, contact } from "../lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Books, courses, tools and private sessions from Jessica Sampson and The Intimacy Masters, for couples, wives and parents. Prices from ₦1,000.",
};

export default function ShopPage() {
  return (
    <PageShell>
      <section className="bg-[#FFF3EE] pb-16 pt-36 sm:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="hero-rise max-w-3xl">
            <p className="eyebrow text-[#8D2F5B]">Shop</p>
            <h1 className="page-title mt-5 text-[#321321]">Learn from Jessica, <Accent>at your own pace.</Accent></h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4F3A44] sm:text-xl">
              Sixteen books, courses, tools and sessions. Choose who it is for and begin today.
            </p>
          </div>
          <div className="hero-rise hero-rise-late mt-12">
            <ShopGrid />
          </div>
          <div className="mt-10 flex flex-col gap-3 rounded-[1.6rem] bg-[#F7E6EB] p-6 text-[#4B1530] sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold">Outside Nigeria? Outercourse is also on Amazon.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
              <a href={amazonLinks.outercourseForHer} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">Edition for her <ArrowUpRight size={15} /></a>
              <a href={amazonLinks.outercourseForHim} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">Edition for him <ArrowUpRight size={15} /></a>
              <a href={contact.store} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">Full store on Selar <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </div>
      </section>
      <FinalCta title="Would you rather talk it through?" text="Request a free, private discovery call. One hour, no obligation." />
    </PageShell>
  );
}
