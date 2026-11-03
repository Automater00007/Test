"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function SignatureIntro() {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);
  const finished = useRef(false);
  const reduce = useReducedMotion();

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem("jr-intro", "1");
    } catch {
      /* private mode */
    }
    document.documentElement.removeAttribute("data-intro");
    document.documentElement.classList.remove("intro-lock");
    window.dispatchEvent(new Event("jr:intro-done"));
    setGone(true);
  }, []);

  useEffect(() => {
    const should =
      document.documentElement.getAttribute("data-intro") === "1" && !reduce;

    if (!should) {
      window.dispatchEvent(new Event("jr:intro-done"));
      setGone(true);
      return;
    }

    document.documentElement.classList.add("intro-lock");

    const openTimer = window.setTimeout(() => setOpening(true), 1100);
    const doneTimer = window.setTimeout(finish, 1750);

    let skipTimer = 0;
    const skip = () => {
      setOpening(true);
      skipTimer = window.setTimeout(finish, 620);
    };

    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(skipTimer);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [finish, reduce]);

  if (gone) return null;

  return (
    <div
      className="intro-stage fixed inset-0 z-[100] bg-forest"
      aria-hidden="true"
      data-intro-stage
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-forest"
        initial={false}
        animate={{ y: opening ? "-101%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-forest"
        initial={false}
        animate={{ y: opening ? "101%" : "0%" }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.03 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col justify-between bg-forest px-[clamp(1.2rem,4vw,4rem)] py-8 text-paper"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between">
          <span className="eyebrow text-paper">Defoy Hotels &amp; Resorts</span>
          <span className="eyebrow text-paper">Est. Pahalgam</span>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1000px] flex-col items-center">
          <svg
            viewBox="0 0 1000 120"
            className="absolute left-1/2 top-1/2 h-[120px] w-[112%] -translate-x-1/2 -translate-y-1/2 opacity-90"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              className="intro-line"
              pathLength={1}
              d="M0 76 C 140 76, 160 26, 300 38 S 470 104, 610 82 S 820 20, 1000 34"
              stroke="#A87850"
              strokeWidth="1.4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="intro-line intro-line-2"
              pathLength={1}
              d="M0 86 C 160 86, 190 40, 330 50 S 500 112, 640 90 S 850 34, 1000 46"
              stroke="#FBF8F3"
              strokeOpacity="0.24"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div className="relative overflow-hidden px-2">
            <h1 className="intro-title text-center font-display text-[clamp(2.6rem,9.5vw,8.5rem)] font-light leading-[0.9] tracking-[-0.04em] text-paper">
              Jade River
            </h1>
          </div>

          <p className="intro-fade mt-5 text-center font-display text-[clamp(1.1rem,2.2vw,1.8rem)] italic text-paper/90">
            Life, slowed by the river.
          </p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <span className="eyebrow leading-[1.9] text-paper">
            <span className="block">Pahalgam · Jammu &amp; Kashmir</span>
            <span className="block">33.8834° N, 75.2698° E</span>
          </span>
          <span className="eyebrow text-paper">Click to skip</span>
        </div>
      </motion.div>
    </div>
  );
}
