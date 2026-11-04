"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { img, site } from "@/lib/content";

export default function FilmSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);

  useEffect(() => {
    document.documentElement.classList.toggle("ri-lock", open);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("ri-lock");
    };
  }, [open]);

  return (
    <>
      <section
        ref={ref}
        className="relative flex min-h-[76svh] items-end overflow-hidden bg-forest text-paper"
        aria-labelledby="film-heading"
      >
        <motion.div className="absolute inset-[-10%] " style={{ y }}>
          <Image
            src={img.aerial}
            alt="Aerial view of the river and pine forest around Jade River Resort"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-forest/45" aria-hidden="true" />

        <div
          className="absolute inset-x-0 top-0 flex items-center justify-between p-[clamp(1.15rem,4.2vw,5rem)] pt-8"
          data-reveal="fade"
        >
          <span className="eyebrow text-paper/70">06 — Film</span>
          <span className="eyebrow text-paper/65">Pahalgam · 2026</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group absolute left-1/2 top-1/2 flex h-[clamp(100px,12vw,150px)] w-[clamp(100px,12vw,150px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/25 bg-walnut text-paper transition-colors duration-300 hover:bg-walnut-brown"
          aria-label="Play film"

        >
          <span className="absolute inset-0 rounded-full border border-paper/40 transition-transform duration-[1200ms] ease-out group-hover:scale-125" />
          <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden="true" className="ml-1">
            <path d="M25 15L1 29V1L25 15Z" fill="currentColor" />
          </svg>
          <span className="absolute -bottom-8 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-paper/70">
            Play film
          </span>
        </button>

        <div className="relative z-10 flex w-full flex-col gap-6 p-[clamp(1.15rem,4.2vw,5rem)] pb-10 md:flex-row md:items-end md:justify-between">
          <h2
            id="film-heading"
            className="max-w-[13ch] text-[clamp(2.4rem,5.4vw,5.2rem)] leading-[0.94] text-paper"
            data-reveal
          >
            The property, <em className="text-paper/70">in motion.</em>
          </h2>
          <p className="max-w-sm text-[0.95rem] leading-[1.7] text-paper/70" data-reveal>
            Drone passes over the wooden roofs, the stream, and the pines behind. The
            film is being cut from the property’s own footage.
          </p>
        </div>
      </section>

      {open && (
        <motion.div
          key="film-lightbox"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-forest/95 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Property film"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-clay hover:bg-walnut-brown"
              aria-label="Close film"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-current" />
                <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-current" />
              </span>
            </button>

            <motion.div
              className="w-full max-w-3xl border border-paper/15 bg-paper p-8 text-ink md:p-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow text-ink/65">A note from the property</span>
              <p className="mt-5 font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.02] tracking-[-0.04em]">
                The film is still in the <em className="text-clay">cutting room.</em>
              </p>
              <p className="mt-5 max-w-lg text-[0.95rem] leading-[1.7] text-ink/70">
                Real property footage is on its way. Until the first cut is ready, the
                gallery has the frames — or message us and we will send it to you
                directly.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/gallery"
                  onClick={() => setOpen(false)}
                  className="btn"

                >
                  Open the gallery
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
                    "Hello Jade River Resort, could you send me the latest property film?",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"
                >
                  Request the film →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
    </>
  );
}
