import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "../lib/site";
import { Price } from "./sections";

/**
 * A product from Jessica's Selar store: real cover, what it is, and the price
 * up front. Covers come in many shapes, so each sits whole inside a fixed
 * frame over a blurred copy of itself.
 */
export function ProductCard({ product, dark = false }: { product: Product; dark?: boolean }) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noreferrer"
      className={`product-card group flex h-full flex-col overflow-hidden rounded-[1.8rem] border transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 ${
        dark
          ? "border-white/12 bg-white/[0.07] hover:bg-white/[0.11]"
          : "border-[#4B1530]/8 bg-white shadow-[0_14px_45px_rgba(70,33,54,0.07)] hover:shadow-[0_26px_60px_rgba(70,33,54,0.14)]"
      }`}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-[#F4E4E9]">
        <Image src={product.cover} alt="" fill sizes="120px" aria-hidden="true" className="scale-125 object-cover opacity-60 blur-2xl" />
        <Image
          src={product.cover}
          alt={`${product.title} cover`}
          fill
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
          className="object-contain p-4 drop-shadow-[0_12px_24px_rgba(42,17,30,0.25)] transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#6A2044] backdrop-blur">
          {product.kind}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className={`text-xl font-bold leading-tight tracking-[-0.025em] ${dark ? "text-white" : "text-[#381626]"}`}>{product.title}</h3>
        <p className={`mt-3 flex-1 text-sm leading-relaxed ${dark ? "text-white/66" : "text-[#67545D]"}`}>{product.blurb}</p>
        <div className={`mt-5 flex items-end justify-between gap-3 border-t pt-4 ${dark ? "border-white/12" : "border-[#4B1530]/10"}`}>
          <Price ngn={product.ngn} usd={product.usd} wasNgn={product.wasNgn} light={dark} />
          <span className={`inline-flex shrink-0 items-center gap-1 text-sm font-bold ${dark ? "text-[#F6B7C9]" : "text-[#8D2F5B]"}`}>
            Get it <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
