"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Room } from "@/lib/content";
import { formatPrice } from "@/lib/utils";

export default function RoomHero({ room }: { room: Room }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);

  return (
    <section ref={ref} className="relative pt-[68px] md:pt-[80px]">
      <div className="relative h-[calc(100svh-172px)] min-h-[480px] overflow-hidden bg-ink">
        <motion.div className="absolute inset-[-10%]" style={{ y }}>
          <Image
            src={room.image}
            alt={`${room.name} at Jade River Resort`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-[clamp(1.15rem,4.2vw,3rem)]">
          <span className="eyebrow text-paper/65">Room · {room.count}</span>
          <span className="eyebrow text-paper/45">{room.bestFor}</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-[clamp(1.15rem,4.2vw,3rem)] pb-10 md:flex-row md:items-end md:justify-between">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="max-w-[16ch] text-[clamp(2.4rem,7vw,7rem)] leading-[0.9] text-paper"
            >
              {room.name}
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="shrink-0 bg-paper px-6 py-4 text-ink"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">From</p>
            <p className="mt-1 font-display text-[1.7rem] leading-none">
              {formatPrice(room.price)}
              <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink/40">
                / night
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
