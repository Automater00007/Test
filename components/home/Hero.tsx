"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { img } from "@/lib/content";

const lines = [
  { text: "Life,", italic: false },
  { text: "slowed by", italic: true },
  { text: "the river.", italic: false },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-intro")) {
      const t = window.setTimeout(() => setReady(true), 80);
      return () => window.clearTimeout(t);
    }
    const done = () => setReady(true);
    window.addEventListener("jr:intro-done", done);
    const fallback = window.setTimeout(done, 2000);
    return () => {
      window.removeEventListener("jr:intro-done", done);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={ref} className="relative pt-[68px] md:pt-[80px]">
      <div className="shell flex items-center justify-between gap-4 py-4 md:py-5">
        <p className="eyebrow text-ink/70">Pahalgam · Jammu &amp; Kashmir</p>
        <p className="eyebrow hidden italic text-ink/65 md:block">
          Life, slowed by the river
        </p>
        <p className="eyebrow text-ink/70">
          <span className="text-walnut">13</span> rooms
        </p>
      </div>

      <div className="shell">
        <div
          className={`relative overflow-hidden bg-forest ${ready ? "is-ready" : ""}`}
          style={{ height: "calc(100svh - 172px)", minHeight: "540px" }}
        >
          <motion.div className="absolute inset-0" style={{ y }}>
            <motion.div className="absolute inset-[-3%]" style={{ scale }}>
              <div className="relative h-full w-full">
                {/* Instant poster — never delayed, keeps LCP fast */}
                <Image
                  src={img.hero}
                  alt="A wooden boat on still jade water beneath the mountains of the Kashmir valley"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover object-[50%_58%]"
                />

                {/* Video fades in only when it can actually play */}
                {ready && !reduce && (
                  <video
                    className={`absolute inset-0 h-full w-full object-cover object-[50%_58%] transition-opacity duration-700 ${
                      videoReady ? "opacity-100" : "opacity-0"
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={img.hero}
                    aria-hidden="true"
                    onCanPlay={() => setVideoReady(true)}
                  >
                    <source src="/video/hero.webm" type="video/webm" />
                    <source src="/video/hero.mp4" type="video/mp4" />
                  </video>
                )}
              </div>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 bg-forest/25" aria-hidden="true" />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-[clamp(1rem,2.4vw,2rem)]">
            <span className="eyebrow text-paper/80">01 — The property</span>
            <span className="eyebrow hidden text-right leading-[1.9] text-paper/70 sm:block">
              33.8834° N
              <br />
              75.2698° E
            </span>
          </div>

          <motion.div
            className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-8 p-[clamp(1rem,2.6vw,2.4rem)] pb-[clamp(1.4rem,3vw,2.6rem)] lg:flex-row lg:items-end"
            style={{ y: textY, opacity: fade }}
          >
            <div>
              <h1
                className="text-paper"
                style={{
                  fontSize: "clamp(3.3rem, 10.4vw, 10.2rem)",
                  lineHeight: 0.88,
                }}
              >
                {lines.map((line, i) => (
                  <span key={line.text} className="line-mask">
                    <span
                      className="line-inner"
                      style={{ transitionDelay: `${140 + i * 90}ms` }}
                    >
                      {line.italic ? (
                        <em className="font-light text-paper/90">{line.text}</em>
                      ) : (
                        line.text
                      )}
                      {i === 2 && (
                        <span className="ml-[0.06em] inline-block h-[0.11em] w-[0.11em] translate-y-[-0.72em] bg-copper" />
                      )}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="w-full max-w-[330px] bg-paper p-6 text-ink">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/65">
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
                >
                  Explore rooms
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 bg-walnut px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-walnut-brown"
                >
                  Reserve
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="arrow-static"
                  >
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between px-[clamp(1rem,2.6vw,2.4rem)] pb-4">
            <span className="eyebrow hidden text-paper/65 lg:block">Scroll</span>
            <span className="relative hidden h-12 w-px overflow-hidden bg-paper/25 lg:block">
              <motion.span
                className="absolute left-0 top-0 h-5 w-px bg-copper"
                animate={{ y: ["-120%", "260%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </div>
        </div>
      </div>

      <div className="shell grid gap-6 border-b border-line py-8 md:grid-cols-12 md:items-end md:py-10">
        <p className="eyebrow text-ink/65 md:col-span-4" data-reveal>
          Defoy Hotels &amp; Resorts
        </p>
        <p
          className="body-copy max-w-xl md:col-span-5 md:col-start-6"
          data-reveal
          style={{ ["--reveal-delay" as string]: "90ms" }}
        >
          A boutique property of thirteen rooms on the banks of the Lidder River.
          Not a hotel to tick off. A place to stay longer than you planned.
        </p>
        <a
          href="https://wa.me/917780868926"
          className="link-line justify-self-start font-mono text-[10px] uppercase tracking-[0.2em] md:col-span-2 md:col-start-11 md:justify-self-end"
          data-reveal="fade"
          style={{ ["--reveal-delay" as string]: "160ms" }}
        >
          WhatsApp →
        </a>
      </div>
    </section>
  );
}
