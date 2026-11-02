"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { experiences } from "@/lib/content";
import { slugify } from "@/lib/utils";
import RiverDivider from "@/components/ui/RiverDivider";

export default function Experiences() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });
  const listRef = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX - 150);
    y.set(e.clientY - 210);
  };

  useEffect(() => {
    const clear = () => setActive(null);
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, []);

  return (
    <section className="relative pt-20 md:pt-32" aria-labelledby="experiences-heading">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-ink/50" data-reveal>
              04 — Experiences
            </span>
            <h2
              id="experiences-heading"
              className="mt-4 text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[0.94]"
              data-reveal
            >
              Six ways to do nothing{" "}
              <em className="text-clay">very well.</em>
            </h2>
          </div>
          <p className="body-copy max-w-sm md:col-span-4 md:col-start-9" data-reveal>
            Nothing here is scheduled for you. A fire is lit, a path follows the
            water, and the valley does the rest.
          </p>
        </div>

        <div
          ref={listRef}
          className="mt-14 md:mt-20"
          onPointerMove={move}
          onPointerLeave={() => setActive(null)}
        >
          {experiences.map((exp, i) => (
            <Link
              key={exp.title}
              href={`/experiences#${slugify(exp.title)}`}
              className="group relative block border-t border-line py-[clamp(1.2rem,2.4vw,2rem)] last:border-b"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setActive(i);
              }}
              data-cursor="View"
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[4rem_1fr_auto_auto] md:gap-8">
                <span className="num transition-colors duration-500 group-hover:text-clay">
                  0{i + 1}
                </span>

                <div className="overflow-hidden">
                  <h3 className="origin-left font-display text-[clamp(1.7rem,4.2vw,3.8rem)] leading-[1.02] tracking-[-0.035em] transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-clay md:group-hover:translate-x-6">
                    {exp.title}
                  </h3>
                </div>

                <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 md:block">
                  {exp.meta}
                </span>

                <div className="relative h-16 w-12 overflow-hidden md:h-24 md:w-20">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                </div>
              </div>
              <p className="mt-2 max-w-md pl-9 font-display text-[0.98rem] italic leading-snug text-ink/45 transition-colors duration-500 group-hover:text-ink/65 md:hidden">
                {exp.subtitle}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/experiences"
            className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"
            data-cursor="All"
          >
            All experiences →
          </Link>
        </div>
      </div>

      <div className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block">
        <motion.div style={{ x: sx, y: sy }} className="relative h-[400px] w-[300px]">
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                className="absolute inset-0 overflow-hidden bg-ink"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={experiences[active].image}
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/20" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/60">
                    0{active + 1} — Pahalgam
                  </p>
                  <p className="mt-2 font-display text-[1.3rem] leading-tight text-paper">
                    {experiences[active].subtitle}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <RiverDivider className="mt-24 text-ink/30" height={80} flip />
    </section>
  );
}