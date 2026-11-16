"use client";

import ReactDOM from "react-dom";

export function CalendlyResourceHints() {
  ReactDOM.preconnect("https://calendly.com");
  ReactDOM.preconnect("https://assets.calendly.com", { crossOrigin: "anonymous" });
  ReactDOM.prefetchDNS("https://calendly.com");
  ReactDOM.prefetchDNS("https://assets.calendly.com");

  return null;
}
