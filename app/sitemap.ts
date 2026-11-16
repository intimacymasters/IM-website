import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/seo";

// Every public page, most important first. Add new pages here.
const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/coaching", priority: 0.9, changeFrequency: "monthly" },
  { path: "/couples", priority: 0.9, changeFrequency: "monthly" },
  { path: "/wives", priority: 0.9, changeFrequency: "monthly" },
  { path: "/parents", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shop", priority: 0.8, changeFrequency: "weekly" },
  { path: "/speaking", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/spice", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((page) => ({ url: absoluteUrl(page.path), lastModified, changeFrequency: page.changeFrequency, priority: page.priority }));
}
