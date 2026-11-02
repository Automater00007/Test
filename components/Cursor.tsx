"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("View");
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    document.documentElement.classList.add("cursor-on");

    const loop = () => {
      x.set(target.current.x);
      y.set(target.current.y);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    const move = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button, [role='button']",
      ) as HTMLElement | null;
      if (el) {
        setHover(true);
        setLabel(el.dataset.cursor || "Open");
      } else {
        setHover(false);
      }
    };

    const leave = () => setVisible(false);
    const resetHover = () => {
      setHover(false);
      setLabel("View");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", resetHover, { passive: true });

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", resetHover);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[130] hidden md:block"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <div
        className="cursor-dot -translate-x-1/2 -translate-y-1/2"
        data-hover={hover}
      >
        <span className="cursor-label">{label}</span>
      </div>
    </motion.div>
  );
}
