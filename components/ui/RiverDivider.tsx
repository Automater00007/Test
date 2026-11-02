"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function RiverDivider({
  className,
  stroke = "currentColor",
  height = 90,
  flip = false,
}: {
  className?: string;
  stroke?: string;
  height?: number;
  flip?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 45%"],
  });
  const length = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={cn("w-full", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        className="w-full"
        style={{ height }}
        fill="none"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            flip
              ? "M0 40 C 160 40, 200 92, 360 86 S 560 22, 720 42 S 980 104, 1200 62"
              : "M0 74 C 150 74, 190 26, 350 36 S 570 104, 730 82 S 990 24, 1200 44"
          }
          stroke={stroke}
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: length }}
        />
        <motion.path
          d={
            flip
              ? "M0 50 C 170 50, 215 101, 375 95 S 575 32, 735 52 S 990 113, 1200 72"
              : "M0 84 C 160 84, 205 37, 365 47 S 585 113, 745 92 S 1000 35, 1200 55"
          }
          stroke={stroke}
          strokeOpacity="0.28"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: length }}
        />
      </svg>
    </div>
  );
}
