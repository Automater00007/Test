"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function SiteNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    if (open) return;
    const prev = scrollY.getPrevious() ?? 0;
    if (y > prev && y > 180) setHidden(true);
    else if (y < prev - 2) setHidden(false);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-lock", open);
    return () => document.documentElement.classList.remove("menu-lock");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper"
        initial={false}
        animate={{ y: hidden ? "-101%" : "0%" }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6 md:h-[80px]">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5"
          >
            <span className="font-display text-[1.4rem] leading-none tracking-[-0.045em] md:text-[1.6rem]">
              Jade<span className="text-clay">.</span>River
            </span>
            <span className="eyebrow hidden pb-[2px] text-[9px] text-ink/65 lg:block">
              Resort
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-line font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                    active ? "text-walnut" : "text-ink/65 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="btn btn-clay hidden !py-3 !px-5 sm:inline-flex"

            >
              Reserve directly
              <Arrow />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="group flex h-10 w-10 flex-col items-end justify-center gap-[5px] lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <span className="block h-px w-7 bg-charcoal transition-all duration-500 group-hover:w-5" />
              <span className="block h-px w-5 bg-charcoal transition-all duration-500 group-hover:w-7" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-forest text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <div className="shell flex h-[68px] items-center justify-between md:h-[80px]">
              <span className="font-display text-[1.4rem] leading-none tracking-[-0.045em]">
                Jade<span className="text-clay">.</span>River
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center"
                aria-label="Close menu"
              >
                <span className="relative block h-4 w-6">
                  <span className="absolute left-0 top-1/2 block h-px w-6 rotate-45 bg-paper" />
                  <span className="absolute left-0 top-1/2 block h-px w-6 -rotate-45 bg-paper" />
                </span>
              </button>
            </div>

            <div className="shell flex flex-1 flex-col justify-center pb-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map(
                  (item, i) => (
                    <div key={item.href} className="overflow-hidden border-b border-line-light">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        transition={{
                          duration: 0.8,
                          ease: EASE,
                          delay: 0.22 + i * 0.06,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline justify-between py-[clamp(0.7rem,2vw,1.1rem)]"
                        >
                          <span className="font-display text-[clamp(2.2rem,7vw,4rem)] leading-[1.05] tracking-[-0.04em] transition-colors group-hover:text-clay">
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.2em] text-paper/65">
                            0{i + 1}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  ),
                )}
              </nav>

              <motion.div
                className="mt-10 flex flex-wrap items-end justify-between gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="eyebrow leading-[1.9] text-paper/65">
                  Pahalgam, Jammu &amp; Kashmir
                  <br />
                  33.8834° N · 75.2698° E
                </div>
                <div className="text-right">
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    className="link-line font-display text-xl italic text-paper"
                  >
                    {site.phone}
                  </a>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
                    Direct bookings only
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
    >
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
