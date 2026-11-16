import type { MetadataRoute } from "next";
import { siteName } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Intimacy Masters",
    description: "Faith-centered marriage and intimacy coaching with Jessica Sampson.",
    start_url: "/",
    display: "browser",
    background_color: "#FFF9F5",
    theme_color: "#4B1530",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
