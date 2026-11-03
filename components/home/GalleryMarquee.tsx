"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { gallery } from "@/lib/content";
import { wrap } from "@/lib/utils";

type Item = (typeof gallery)[number];

function Row({
  items,
  speed,
  direction,
}: {
  items: Item[];
  speed: number;
  direction: 1 | -1;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);
  const half = useRef(0);
  const inView = useInView(ref, { margin: "200px 0px" });
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 90, damping: 30, mass: 0.6 });
  const factor = useTransform(smooth, [-1200, 0, 1200], [2.6, 0, 2.6]);
  const skew = useTransform(smooth, [-1600, 0, 1600], [1.6, 0, -1.6]);
  const x = useTransform(baseX, (v) => `${v}px`);

  useEffect(() => {
    const measure = () => {
      if (ref.current) half.current = ref.current.scrollWidth / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 700);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (!inView || reduce || !half.current) return;
    const d = Math.min(delta, 64);
    const move = direction * speed * (d / 1000) * (1 + factor.get());
    baseX.set(wrap(-half.current, 0, baseX.get() + move));
  });

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex w-max gap-[clamp(0.8rem,1.6vw,1.6rem)] will-change-transform"
      >
        {[...items, ...items].map((item, i) => (
          <Link
            key={i}
            href="/gallery"
            className="group relative block h-[clamp(220px,32vh,400px)] w-[clamp(240px,26vw,400px)] shrink-0 overflow-hidden bg-forest"

            aria-hidden={i >= items.length}
            tabIndex={i >= items.length ? -1 : 0}
          >
            <Image
              src={item.src}
              alt={i < items.length ? item.alt : ""}
              fill
              sizes="(min-width: 768px) 26vw, 80vw"
              className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/20" />
            <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/0 transition-colors duration-500 group-hover:text-paper/80">
              {item.span === "wide" ? "Landscape" : item.span === "tall" ? "Portrait" : "Property"}
            </span>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export default function GalleryMarquee() {
  const rowA = gallery.slice(0, 6);
  const rowB = gallery.slice(6);

  return (
    <section className="relative overflow-hidden py-20 md:py-28" aria-labelledby="gallery-heading">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-ink/65" data-reveal>
              05 — Gallery
            </span>
            <h2
              id="gallery-heading"
              className="mt-4 text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[0.94]"
              data-reveal
            >
              Frames the valley <em className="text-clay">already made.</em>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="link-line self-start font-mono text-[10px] uppercase tracking-[0.2em] md:self-end"

          >
            Open full gallery →
          </Link>
        </div>
      </div>

      <div className="mt-12 space-y-[clamp(0.8rem,1.6vw,1.6rem)] md:mt-16">
        <Row items={rowA} speed={38} direction={-1} />
        <Row items={rowB} speed={30} direction={1} />
      </div>

      <p className="shell mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
        Scroll velocity changes the current — try it.
      </p>
    </section>
  );
}
