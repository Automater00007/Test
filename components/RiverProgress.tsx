"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function RiverProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const top = useTransform(progress, [0, 1], ["0%", "100%"]);
  const lineY = useTransform(progress, [0, 1], ["0vh", "calc(100vh - 2.5rem)"]);
  const count = useTransform(progress, (v) => String(Math.round(v * 100)).padStart(2, "0"));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-clay"
        style={{ scaleX: progress }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 z-40 hidden h-svh w-16 lg:flex"
      >
        <div className="relative mx-auto h-full w-px bg-line">
          <motion.div
            className="absolute left-1/2 top-0 h-10 w-px -translate-x-1/2 bg-clay"
            style={{ y: lineY }}
          />
          <motion.span
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay"
            style={{ top }}
          />
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="vertical-text font-mono text-[9px] uppercase tracking-[0.26em] text-ink/40">
            The river
          </span>
          <motion.span className="font-mono text-[9px] tracking-[0.12em] text-ink/55">
            {count}
          </motion.span>
        </div>
      </div>
    </>
  );
}
