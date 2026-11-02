"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { img } from "@/lib/content";

export default function StoryParallax() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-50, 90]);
  const wordY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 30]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-24 text-paper md:py-36"
      aria-labelledby="story-heading"
    >
      <div className="shell relative">
        <div className="flex items-center justify-between gap-6">
          <span className="eyebrow text-paper/40" data-reveal>
            06 — The valley
          </span>
          <span className="eyebrow text-paper/25" data-reveal>
            2,130 metres
          </span>
        </div>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:items-center md:gap-6">
          <motion.div style={{ y: y1 }} className="md:col-span-5 md:mt-20">
            <div
              className="relative aspect-[4/5] overflow-hidden bg-ink-2"
              data-reveal="mask"
            >
              <Image
                src={img.mist}
                alt="Mist resting on the green ridgelines above Pahalgam"
                fill
                sizes="(min-width: 768px) 42vw, 100vw"
                className="reveal-media object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/35">
              Above the valley · 06:14
            </p>
          </motion.div>

          <div className="md:col-span-3 md:px-2">
            <motion.div style={{ y: wordY }}>
              <h2
                id="story-heading"
                className="font-display text-[clamp(2.3rem,3.6vw,3.6rem)] leading-[0.98] tracking-[-0.04em]"
                data-reveal
              >
                The valley doesn’t{" "}
                <em className="text-clay">perform.</em>
              </h2>
              <p className="mt-6 max-w-[28ch] text-[0.95rem] leading-[1.75] text-paper/55" data-reveal>
                It keeps going, whether you are watching or not. Walk out past the
                last wooden building and the only sound left is water moving over
                stone.
              </p>
              <div className="mt-8 h-px w-full bg-paper/15" />
              <Link
                href="/experiences"
                className="link-line mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70"
                data-reveal
              >
                Take the slow route →
              </Link>
            </motion.div>
          </div>

          <motion.div style={{ y: y2 }} className="md:col-span-4 md:-mt-24">
            <div
              className="relative aspect-[3/4] overflow-hidden bg-ink-2"
              data-reveal="mask"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <Image
                src={img.pines}
                alt="Pine trees silhouetted against the last light in Pahalgam"
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="reveal-media object-cover"
              />
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/35">
              Last light through the pines
            </p>
          </motion.div>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[clamp(4rem,15vw,15rem)] italic leading-none tracking-[-0.05em] text-paper/[0.06]"
      >
        slowed
      </p>
    </section>
  );
}
