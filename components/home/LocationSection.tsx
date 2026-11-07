"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/lib/content";
import { mapsHref } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";

const attractions = ["Aru Valley", "Betaab Valley", "Chandanwari"];

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section className="relative py-20 md:py-32" aria-labelledby="location-heading">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <span className="eyebrow text-ink/65" data-reveal>
              07 — Location
            </span>
            <h2
              id="location-heading"
              className="mt-4 text-[clamp(2.3rem,4.8vw,4.6rem)] leading-[0.95]"
              data-reveal
            >
              The road ends. <em className="text-clay">The river keeps going.</em>
            </h2>

            <p className="body-copy mt-8 max-w-md" data-reveal>
              Pahalgam sits at 2,130 metres in the Lidder valley. Srinagar Airport is
              96 km away — roughly two and a half to three hours by road, and a
              different world by the time you arrive.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8">
              <div data-reveal="zoom">
                <dt className="eyebrow text-ink/65">Airport</dt>
                <dd className="mt-2 text-[0.95rem]">Srinagar · 96 km</dd>
              </div>
              <div data-reveal="zoom" style={{ ["--reveal-delay" as string]: "60ms" }}>
                <dt className="eyebrow text-ink/65">Drive</dt>
                <dd className="mt-2 text-[0.95rem]">2.5 – 3 hours</dd>
              </div>
              <div data-reveal="zoom" style={{ ["--reveal-delay" as string]: "120ms" }}>
                <dt className="eyebrow text-ink/65">Coordinates</dt>
                <dd className="mt-2 font-mono text-[0.8rem] tracking-tight">
                  {site.coords}
                </dd>
              </div>
              <div data-reveal="zoom" style={{ ["--reveal-delay" as string]: "180ms" }}>
                <dt className="eyebrow text-ink/65">Address</dt>
                <dd className="mt-2 text-[0.95rem]">{site.address}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal="zoom" style={{ ["--reveal-delay" as string]: "140ms" }}>
              <Magnetic>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"

                >
                  Get directions
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="arrow-static">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </a>
              </Magnetic>
              <Link href="/location" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
                More on location →
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7" ref={ref}>
            <div
              className="relative overflow-hidden border border-line bg-paper-2 p-4 md:p-6"
              data-reveal="zoom"
            >
              <div className="flex items-center justify-between pb-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                  Route sketch
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                  Not to scale
                </span>
              </div>

              <svg
                viewBox="0 0 560 520"
                className="w-full"
                fill="none"
                role="img"
                aria-label="Sketch of the route from Srinagar Airport to Pahalgam, where Jade River Resort sits"
              >
                {/* contour lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <path
                    key={i}
                    d={`M-20 ${120 + i * 74} C 120 ${60 + i * 80}, 220 ${230 + i * 60}, 360 ${150 + i * 74} S 520 ${90 + i * 86}, 600 ${160 + i * 82}`}
                    stroke="#201B17"
                    strokeOpacity={0.08}
                    strokeWidth="1"
                  />
                ))}

                {/* the Lidder, running past the property */}
                <path
                  d="M-20 476 C 110 458, 210 486, 330 456 S 500 432, 590 458"
                  stroke="#201B17"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />

                <path
                  d="M70 430 C 150 395, 165 340, 250 318 S 365 285, 410 230"
                  stroke="#201B17"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="2 8"
                />

                <motion.path
                  d="M70 430 C 150 395, 165 340, 250 318 S 365 285, 410 230"
                  stroke="#A87850"
                  strokeWidth="1.6"
                  style={{ pathLength: reduce ? 1 : draw }}
                />

                {/* Pahalgam town boundary — the resort sits inside it */}
                <circle
                  cx="410"
                  cy="230"
                  r="54"
                  stroke="#201B17"
                  strokeOpacity="0.22"
                  strokeDasharray="2 6"
                />
                <path
                  d="M410 230 L438 206"
                  stroke="#A87850"
                  strokeWidth="1.2"
                  strokeDasharray="2 4"
                />

                <circle cx="70" cy="430" r="4" fill="#201B17" />
                <circle cx="70" cy="430" r="11" stroke="#201B17" strokeOpacity="0.2" />

                <circle cx="410" cy="230" r="4" fill="#201B17" />
                <circle cx="410" cy="230" r="11" stroke="#201B17" strokeOpacity="0.2" />

                <circle cx="438" cy="206" r="5" fill="#A87850" />
                <motion.circle
                  cx="438"
                  cy="206"
                  r="10"
                  stroke="#A87850"
                  strokeOpacity="0.5"
                  initial={false}
                  animate={reduce ? {} : { r: [10, 24], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />

                <text x="58" y="468" fill="#201B17" fillOpacity="0.65" fontSize="11" fontFamily="monospace" letterSpacing="2">
                  SRINAGAR AIRPORT
                </text>
                <text x="300" y="306" fill="#201B17" fillOpacity="0.65" fontSize="11" fontFamily="monospace" letterSpacing="2">
                  PAHALGAM
                </text>
                <text x="300" y="320" fill="#201B17" fillOpacity="0.5" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
                  2,130 M
                </text>
                <text x="410" y="168" fill="#A87850" fontSize="11" fontFamily="monospace" letterSpacing="2">
                  JADE RIVER
                </text>
                <text x="410" y="182" fill="#201B17" fillOpacity="0.55" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
                  RESORT · IN PAHALGAM
                </text>

                <text x="72" y="492" fill="#201B17" fillOpacity="0.45" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
                  96 KM · 2.5–3 HRS
                </text>
              </svg>

              <div className="flex items-end justify-between border-t border-line pt-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                    Exact location
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-tight">
                    {site.coords}
                  </p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center border border-line">
                  <span className="block h-2 w-2 bg-copper" />
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {attractions.map((a, i) => (
                <div
                  key={a}
                  className="flex items-baseline gap-3 border-b border-line pb-3"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
                >
                  <span className="num text-ink/65">0{i + 1}</span>
                  <span className="text-[0.92rem]">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
