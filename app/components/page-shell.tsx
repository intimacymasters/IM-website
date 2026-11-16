import { ViewTransition } from "react";
import { Footer } from "./footer";

/**
 * Wraps every page so route changes animate: the old page lifts away and the
 * new one rises in (see the ::view-transition rules in globals.css). It has to
 * live in each page rather than the layout, because layouts persist across
 * navigations and would never enter or exit.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
        <main className="overflow-hidden">{children}</main>
        <Footer />
      </div>
    </ViewTransition>
  );
}
