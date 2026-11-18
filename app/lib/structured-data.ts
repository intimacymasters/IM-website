// Builders for the structured data (schema.org) that each page publishes.
// Everything here restates facts already shown on the site.

import { absoluteUrl, siteName, siteUrl } from "./seo";
import { contact, press, type Product } from "./site";

const ORG_ID = `${siteUrl}/#organization`;
const PERSON_ID = `${siteUrl}/#jessica-sampson`;
const WEBSITE_ID = `${siteUrl}/#website`;

type Node = Record<string, unknown>;

/** Published on every page: who runs the site, who Jessica is, and the site itself. */
export function siteGraph(): Node[] {
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/brand/intimacy-masters-logo.png"),
      image: absoluteUrl("/images/jessica-portrait.jpg"),
      description: "Faith-centered marriage and intimacy coaching, courses and books for couples, wives and parents.",
      email: contact.email,
      telephone: "+2348034206121",
      founder: { "@id": PERSON_ID },
      areaServed: [{ "@type": "Country", name: "Nigeria" }, "Worldwide"],
      sameAs: [contact.instagram, contact.tiktok, contact.newsletter, contact.store],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: "+2348034206121",
        email: contact.email,
        availableLanguage: "English",
      },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Jessica Sampson",
      jobTitle: "Licensed clinical sexologist and relationship coach",
      description: "Award-winning licensed clinical sexologist, family life coach, author and founder of The Intimacy Masters.",
      image: absoluteUrl("/images/jessica-portrait.jpg"),
      url: absoluteUrl("/about"),
      worksFor: { "@id": ORG_ID },
      sameAs: [contact.instagram, contact.tiktok, contact.newsletter],
      award: "Best on Couple's Relationship and Intimacy, ELOY Awards 2022",
      subjectOf: press.map((item) => ({
        "@type": "NewsArticle",
        headline: item.title,
        url: item.href,
        ...(item.date ? { datePublished: item.date } : {}),
        publisher: { "@type": "Organization", name: item.outlet },
      })),
      knowsAbout: ["Marriage coaching", "Sexual wellbeing in marriage", "Clinical sexology", "Sexuality education for children and teenagers", "Family life coaching"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: siteUrl,
      name: siteName,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
  ];
}

/** The page itself, plus a breadcrumb trail back to the home page. */
export function pageGraph({ path, name, description, type = "WebPage" }: { path: string; name: string; description: string; type?: string }): Node[] {
  const url = absoluteUrl(path);
  const nodes: Node[] = [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      ...(type === "ProfilePage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
    },
  ];
  if (path !== "/") {
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    });
  }
  return nodes;
}

export function faqGraph(path: string, items: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

const naira = (price: string) => price.replace(/[^\d]/g, "");

function offer(product: Product): Node {
  return {
    "@type": "Offer",
    price: naira(product.ngn),
    priceCurrency: "NGN",
    url: product.href,
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
  };
}

/** A coaching or speaking service, with the paid sessions as offers. */
export function serviceGraph({ path, name, description, serviceType, products = [], freeCall = false }: { path: string; name: string; description: string; serviceType: string; products?: Product[]; freeCall?: boolean }): Node {
  const offers: Node[] = products.map((product) => ({ ...offer(product), name: product.title }));
  if (freeCall) {
    offers.unshift({ "@type": "Offer", name: "Discovery call", price: "0", priceCurrency: "NGN", url: absoluteUrl(path), availability: "https://schema.org/InStock" });
  }
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    provider: { "@id": ORG_ID },
    areaServed: [{ "@type": "Country", name: "Nigeria" }, "Worldwide"],
    ...(offers.length ? { offers } : {}),
  };
}

/** The products on a page, as a list search engines can read prices from. */
export function productListGraph(path: string, name: string, products: Product[]): Node {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#products`,
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        description: product.blurb,
        image: absoluteUrl(product.cover),
        category: product.kind,
        brand: { "@type": "Brand", name: siteName },
        offers: offer(product),
      },
    })),
  };
}
