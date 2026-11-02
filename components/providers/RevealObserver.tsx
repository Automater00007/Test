"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();
    const t = window.setTimeout(scan, 350);

    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
