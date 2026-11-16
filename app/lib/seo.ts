import type { Metadata } from "next";

/**
 * The one address search engines should treat as the real site. Every
 * canonical link, share link and sitemap entry is built from it. Override
 * with NEXT_PUBLIC_SITE_URL only if the domain itself changes.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theintimacymaster.com").replace(/\/$/, "");

export const siteName = "The Intimacy Masters";

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

// The picture shown when a page is shared on WhatsApp, Instagram, X or
// LinkedIn. A page that sets its own openGraph block drops the one inherited
// from the root, so every page names it. Kept under 300 KB for WhatsApp.
export const shareImage = {
  url: "/images/share-card.jpg",
  width: 1200,
  height: 630,
  alt: "The Intimacy Masters. Faith-centered marriage and intimacy coaching with Jessica Sampson.",
};

/**
 * Metadata for one page: title, description, canonical address and the
 * matching share card. `title` gets " | The Intimacy Masters" appended by the
 * root layout unless `absoluteTitle` is set.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName,
      type: "website",
      locale: "en_NG",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },
  };
}
