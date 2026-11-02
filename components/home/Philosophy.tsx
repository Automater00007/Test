"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import RiverDivider from "@/components/ui/RiverDivider";

const copy =
  "Pahalgam is not a place you rush. The Lidder has moved through this valley for longer than any of us, at exactly its own pace. We built thirteen rooms beside it. Wooden walls. Warm amber light. A stream at the front, pine forest at the back.";

function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 56%"],
  });

  const words = copy.split(" ");

  return (
    <section className="relative pt-6 md:pt-10">
      <RiverDivider className="text-ink/35" height={96} />

      <div className="shell py-16 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <span className="eyebrow text-ink/50" data-reveal>
                02 — Philosophy
              </span>
              <div className="mt-6 h-px w-24 bg-line" />
              <dl className="mt-8 space-y-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                <div className="flex justify-between gap-6 border-b border-line pb-2">
                  <dt>Latitude</dt>
                  <dd>33.8834° N</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-2">
                  <dt>Elevation</dt>
                  <dd>2,130 m</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-line pb-2">
                  <dt>Rooms</dt>
                  <dd>13</dd>
                </div>
              </dl>
              <p className="mt-10 hidden max-w-[16rem] font-display text-[1.35rem] italic leading-[1.3] text-ink/55 md:block">
                “We are not trying to be the biggest. We are trying to be the only
                one that feels like this.”
              </p>
            </div>
          </aside>

          <div className="md:col-span-9 md:col-start-4">
            <h2
              className="max-w-[15ch] text-[clamp(2.1rem,4.8vw,4.3rem)] leading-[0.98]"
              data-reveal
            >
              A resort built around a river,{" "}
              <em className="text-clay">not a lobby.</em>
            </h2>

            <div ref={ref} className="mt-10 md:mt-16">
              <p className="font-display text-[clamp(1.5rem,2.9vw,2.7rem)] leading-[1.22] tracking-[-0.025em]">
                {words.map((word, i) => {
                  const start = (i / words.length) * 0.85;
                  const end = start + 1.4 / words.length;
                  return (
                    <Word key={`${word}-${i}`} progress={scrollYProgress} start={start} end={end}>
                      {word}
                    </Word>
                  );
                })}
              </p>
            </div>

            <div className="mt-16 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
              {[
                {
                  title: "The water",
                  body: "The Lidder runs the length of the property. You will hear it before you see it, and you will keep hearing it after you leave.",
                },
                {
                  title: "The wood",
                  body: "Warm wooden architecture, stone pathways, amber light after dark. Built to sit inside the forest rather than in front of it.",
                },
                {
                  title: "The quiet",
                  body: "Thirteen rooms, no queues, no lobby theatre. Staff who learn your name and your tea by the second morning.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-reveal-delay
                  style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                >
                  <span className="num">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-[1.35rem] tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="body-copy mt-3 text-[0.94rem]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
