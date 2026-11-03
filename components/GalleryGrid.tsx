"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { gallery } from "@/lib/content";

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const next = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    document.documentElement.classList.toggle("ri-lock", index !== null);
    return () => document.documentElement.classList.remove("ri-lock");
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, close, next, prev]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {gallery.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden bg-paper-2 text-left"

            data-reveal="mask"
            aria-label={`Open image: ${item.alt}`}
          >
            <div
              className={`relative w-full ${
                item.span === "wide"
                  ? "aspect-[4/3]"
                  : item.span === "tall"
                    ? "aspect-[3/4]"
                    : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="reveal-media object-cover transition-transform duration-[1300ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
            </div>
            <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/20" />
            <span className="absolute bottom-4 left-4 max-w-[80%] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-90">
              {item.alt}
            </span>
            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 text-paper opacity-0 transition-all duration-500 group-hover:opacity-100">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <motion.div
          key="gallery-lightbox"
          className="fixed inset-0 z-[110] flex flex-col bg-forest/97 text-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65">
                {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-clay hover:bg-walnut-brown"
                aria-label="Close gallery"
              >
                <span className="relative block h-4 w-4">
                  <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <div className="relative flex-1 px-4 pb-4">
              <motion.div
                key={index}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={gallery[index].src}
                  alt={gallery[index].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-6 border-t border-paper/15 px-5 py-5">
              <p className="max-w-[50ch] font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-paper/70">
                {gallery[index].alt}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-clay hover:bg-walnut-brown"
                  aria-label="Previous image"
                >
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.1" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 transition-colors hover:border-clay hover:bg-walnut-brown"
                  aria-label="Next image"
                >
                  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.1" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
    </>
  );
}
