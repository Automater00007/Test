"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { rooms, type Room } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import TiltCard from "@/components/ui/TiltCard";

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <TiltCard max={4} className="h-full">
      <Link
        href={`/rooms/${room.slug}`}
        className="group flex h-full flex-col"
      >
        <div className="relative overflow-hidden bg-forest">
          <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-auto md:h-[54vh]">
            <Image
              src={room.image}
              alt={`${room.name} at Jade River Resort`}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-forest/10 transition-opacity duration-700 group-hover:opacity-0" />
          </div>
          <div className="absolute left-5 top-5 bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink">
            {room.count}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 text-paper">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
              {room.bestFor}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 transition-all duration-500 group-hover:border-clay group-hover:bg-walnut-brown">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 pt-5">
          <div>
            <div className="flex items-baseline gap-3">
              <span className="num text-paper/65">0{index + 1}</span>
              <h3 className="font-display text-[clamp(1.3rem,1.9vw,1.8rem)] leading-none text-paper">
                {room.name}
              </h3>
            </div>
            <p className="mt-2 max-w-[34ch] text-[0.9rem] leading-relaxed text-paper/65">
              {room.description}
            </p>
          </div>
          <p className="shrink-0 whitespace-nowrap pt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-paper/70">
            {formatPrice(room.price)}
            <span className="block text-right text-[8px] text-paper/65">per night</span>
          </p>
        </div>
      </Link>
    </TiltCard>
  );
}

export default function RoomsRail() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.4 });
  const line = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(rooms.length - 1, Math.max(0, Math.floor(v * rooms.length + 0.15)));
    setActive(i);
  });

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 24));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = window.setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={section}
      id="stay"
      className="relative bg-forest text-paper md:h-[260vh]"
      aria-labelledby="stay-heading"
    >
      {/* desktop pinned rail */}
      <div className="hidden md:sticky md:top-0 md:block md:h-screen md:overflow-hidden">
        <div className="flex h-full flex-col">
          <div className="shell flex items-end justify-between gap-8 pt-24 pb-8 lg:pt-28">
            <div>
              <span className="eyebrow text-paper/65" data-reveal>
                03 — Stay
              </span>
              <h2
                id="stay-heading"
                className="mt-3 text-[clamp(2rem,3.4vw,3.4rem)] leading-[0.95] text-paper"
                data-reveal
                style={{ ["--reveal-delay" as string]: "70ms" }}
              >
                Three shapes of <em className="text-clay">quiet.</em>
              </h2>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-mono text-[11px] tracking-[0.12em] text-paper/65">
                0{active + 1} <span className="text-paper/65">/ 03</span>
              </span>
              <Link
                href="/rooms"
                className="link-line font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70"
              >
                All rooms
              </Link>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <motion.div
              ref={track}
              style={{ x: smoothX }}
              className="flex h-full items-center gap-[clamp(1.5rem,3vw,3rem)] pl-[clamp(1.15rem,4.2vw,5rem)] pr-[12vw] will-change-transform"
            >
              <div className="w-[26vw] shrink-0 self-start pt-[6vh]">
                <p className="font-display text-[clamp(2.6rem,4.5vw,4.5rem)] leading-[0.98] tracking-[-0.04em] text-paper/90">
                  Thirteen
                  <br />
                  rooms.
                  <br />
                  <em className="text-clay">No more.</em>
                </p>
                <p className="mt-6 max-w-[26ch] text-[0.92rem] leading-relaxed text-paper/65">
                  A balcony, a suite, or two floors for the family. Every room opens
                  toward water or pine.
                </p>
                <div className="mt-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/65">
                  <span className="inline-block h-px w-8 bg-paper/25" />
                  Scroll to move sideways
                </div>
              </div>

              {rooms.map((room, i) => (
                <div key={room.slug} className="w-[40vw] shrink-0">
                  <RoomCard room={room} index={i} />
                </div>
              ))}

              <div className="w-[24vw] shrink-0 self-end pb-[8vh]">
                <p className="font-display text-[clamp(1.8rem,3vw,3rem)] italic leading-[1.1] text-paper/70">
                  “We stayed an extra night. Then another.”
                </p>
                <Link
                  href="/reviews"
                  className="link-line mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-paper/65"
                >
                  Read guest notes
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="shell flex items-center gap-6 pb-8 pt-4">
            <div className="relative h-px flex-1 bg-paper/15">
              <motion.div
                className="absolute inset-y-0 left-0 w-full origin-left bg-copper"
                style={{ scaleX: line }}
              />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/65">
              Pinned scroll
            </span>
          </div>
        </div>
      </div>

      {/* mobile stack */}
      <div className="px-[clamp(1.15rem,4.2vw,5rem)] py-20 md:hidden">
        <span className="eyebrow text-paper/65" data-reveal>
          03 — Stay
        </span>
        <h2
          id="stay-heading-mobile"
          className="mt-3 text-[clamp(2.2rem,8vw,3rem)] leading-[0.98] text-paper"
          data-reveal
        >
          Three shapes of <em className="text-clay">quiet.</em>
        </h2>
        <div className="mt-10 flex flex-col gap-14">
          {rooms.map((room, i) => (
            <div
              key={room.slug}
              data-reveal="zoom"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <RoomCard room={room} index={i} />
            </div>
          ))}
        </div>
        <Link
          href="/rooms"
          className="btn mt-12 w-full justify-center border-paper/30 text-paper"
          data-reveal="fade"
        >
          All rooms
        </Link>
      </div>
    </section>
  );
}
