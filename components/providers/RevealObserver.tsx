"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "[data-reveal]";

/**
 * Adds `.is-in` to every `[data-reveal]` element the first time it enters the
 * viewport. CSS handles the actual animation (opacity + transform only), so the
 * observer itself is cheap enough to run on mobile.
 *
 * It also re-scans when new nodes mount (client navigation, lazy sections) and
 * skips all motion when the user prefers reduced motion.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let io: IntersectionObserver | null = null;
    const timers: number[] = [];
    const seen = new WeakSet<Element>();

    const showAll = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        el.classList.add("is-in");
      });
    };

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io?.unobserve(entry.target);
        }
      },
      // Start slightly before the element is fully on screen and stop
      // observing immediately after the reveal, so there is no idle work.
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    const scan = () => {
      // Reduced motion: show everything immediately and skip observation.
      if (reduce.matches) {
        showAll();
        return;
      }

      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.classList.contains("is-in")) return;
        seen.add(el);
        io?.observe(el);
      });
    };

    scan();

    // Catch content that mounts after hydration (client-side route changes,
    // lazy sections, filtered lists) without polling.
    const mo = new MutationObserver(() => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Handle a live preference change: show everything when reduced motion is
    // switched on, resume observing anything still hidden when it is switched
    // off.
    const onReduceChange = () => {
      if (reduce.matches) {
        showAll();
      } else {
        scan();
      }
    };
    reduce.addEventListener("change", onReduceChange);

    // Layout can settle after fonts load; a couple of cheap re-scans make
    // sure nothing was missed.
    timers.push(window.setTimeout(scan, 350));
    timers.push(window.setTimeout(scan, 1200));

    return () => {
      mo.disconnect();
      io?.disconnect();
      reduce.removeEventListener("change", onReduceChange);
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [pathname]);

  return null;
}
