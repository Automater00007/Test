"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { img } from "@/lib/content";

const lines = [
  { text: "Life,", italic: false },
  { text: "slowed by", italic: true },
  { text: "the river.", italic: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) {
      const t = window.setTimeout(() => setReady(true), 120);
      return () => window.clearTimeout(t);
    }
    const done = () => setReady(true);
    window.addEventListener("jr:intro-done", done);
    const fallback = window.setTimeout(done, 2700);
    return () => {
      window.removeEventListener("jr:intro-done", done);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={ref} className="relative pt-[68px] md:pt-[80px]">
      <div className="shell flex items-center justify-between gap-4 py-4 md:py-5">
        <p className="eyebrow text-ink/55">Pahalgam · Jammu &amp; Kashmir</p>
        <p className="eyebrow hidden italic text-ink/45 md:block">
          Life, slowed by the river
        </p>
        <p className="eyebrow text-ink/55">
          <span className="text-clay">13</span> rooms
        </p>
      </div>

      <div className="shell">
        <div
          className={`relative overflow-hidden bg-ink ${ready ? "is-ready" : ""}`}
          style={{ height: "calc(100svh - 172px)", minHeight: "540px" }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <motion.div className="absolute inset-[-4%]" style={{ scale }}>
              <motion.div
                className="relative h-full w-full"
                initial={{ scale: 1.14 }}
                animate={{ scale: ready ? 1.02 : 1.14 }}
                transition={{ duration: 9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={img.hero}
                  alt="A wooden boat on still jade water beneath the mountains of the Kashmir valley"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-[50%_58%]"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[clamp(1rem,2.4vw,2rem)]">
            <motion.span
              className="eyebrow text-paper/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              01 — The property
            </motion.span>
            <motion.span
              className="eyebrow hidden text-right leading-[1.9] text-paper/70 sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              33.8834° N
              <br />
              75.2698° E
            </motion.span>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-8 p-[clamp(1rem,2.6vw,2.4rem)] pb-[clamp(1.4rem,3vw,2.6rem)] lg:flex-row lg:items-end"
            style={{ y: textY, opacity: fade }}
          >
            <div>
              <h1 className="text-paper" style={{ fontSize: "clamp(3.3rem, 10.4vw, 10.2rem)", lineHeight: 0.88 }}>
                {lines.map((line, i) => (
                  <span key={line.text} className="line-mask">
                    <span
                      className="line-inner"
                      style={{ transitionDelay: `${180 + i * 110}ms` }}
                    >
                      {line.italic ? (
                        <em className="font-light text-paper/90">{line.text}</em>
                      ) : (
                        line.text
                      )}
                      {i === 2 && (
                        <span className="ml-[0.06em] inline-block h-[0.11em] w-[0.11em] translate-y-[-0.72em] bg-clay" />
                      )}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <motion.div
              className="w-full max-w-[330px] bg-paper p-6 text-ink lg:mb-1"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 26 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                The whole idea
              </p>
              <p className="mt-3 font-display text-[1.35rem] leading-[1.18] tracking-[-0.02em]">
                Thirteen rooms on the Lidder. Wood, stone, pine, and the sound of
                water.
              </p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link
                  href="/rooms"
                  className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"
                  data-cursor="Look"
                >
                  Explore rooms
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 bg-ink px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-paper transition-colors duration-500 hover:bg-clay"
                >
                  Reserve
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between px-[clamp(1rem,2.6vw,2.4rem)] pb-4">
            <span className="eyebrow hidden text-paper/50 lg:block">Scroll</span>
            <span className="relative hidden h-12 w-px overflow-hidden bg-paper/25 lg:block">
              <motion.span
                className="absolute left-0 top-0 h-5 w-px bg-clay"
                animate={{ y: ["-120%", "260%"] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="shell grid gap-6 border-b border-line py-8 md:grid-cols-12 md:items-end md:py-10">
        <p className="eyebrow text-ink/45 md:col-span-4">Defoy Hotels &amp; Resorts</p>
        <p className="body-copy max-w-xl md:col-span-5 md:col-start-6">
          A boutique property of thirteen rooms on the banks of the Lidder River.
          Not a hotel to tick off. A place to stay longer than you planned.
        </p>
        <a
          href={"https://wa.me/917780868926"}
          className="link-line justify-self-start font-mono text-[10px] uppercase tracking-[0.2em] md:col-span-2 md:col-start-11 md:justify-self-end"
          data-cursor="Chat"
        >
          WhatsApp →
        </a>
      </div>
    </section>
  );
}
