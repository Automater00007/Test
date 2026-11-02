"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 180,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div style={{ perspective: 1100 }} className={cn("group", className)}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
