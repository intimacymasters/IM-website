import Image from "next/image";

export function BrandLogo({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
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
