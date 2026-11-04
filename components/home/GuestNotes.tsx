"use client";

import Link from "next/link";
import { useRef } from "react";
import { reviews, stats } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function GuestNotes() {
  const rail = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    rail.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="relative border-t border-line-light bg-forest py-20 text-paper md:py-28" aria-labelledby="reviews-heading">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-paper/65" data-reveal>
              09 — Guest notes
            </span>
            <h2
              id="reviews-heading"
              className="mt-4 text-[clamp(2.3rem,5.2vw,5rem)] leading-[0.94]"
              data-reveal
            >
              Small numbers. <em className="text-clay">That’s the point.</em>
            </h2>
          </div>
          <p className="body-copy max-w-sm text-paper/80 md:col-span-4 md:col-start-9" data-reveal>
            Thirteen rooms, a handful of staff, and guests who tend to stay longer
            than they planned. These are their notes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-line-light py-10 md:grid-cols-4 md:gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="md:border-l md:border-line-light md:pl-6 md:first:border-l-0 md:first:pl-0"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <p className="font-display text-[clamp(2.6rem,4.6vw,4.6rem)] leading-none tracking-[-0.04em]">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/65">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-end justify-between gap-6">
          <span className="eyebrow text-paper/65">Notes from guests</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous reviews"
              className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-walnut hover:bg-walnut hover:text-paper"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next reviews"
              className="flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-walnut hover:bg-walnut hover:text-paper"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={rail}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1.15rem,4.2vw,5rem)] pb-4"
      >
        {reviews.map((review, i) => (
          <article
            key={review.name}
            className="group w-[min(84vw,360px)] shrink-0 snap-start border border-line bg-paper p-6 transition-colors duration-500 hover:border-ink/40"
            data-reveal="zoom"
            style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] tracking-[0.18em] text-clay" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
                <span className="text-ink/15">{"★".repeat(5 - review.rating)}</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                {review.date}
              </span>
            </div>
            <h3 className="mt-6 font-display text-[1.45rem] leading-[1.1] tracking-[-0.03em] transition-colors duration-500 group-hover:text-clay">
              {review.title}
            </h3>
            <p className="mt-4 text-[0.93rem] leading-[1.7] text-ink/70">{review.body}</p>
            <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
              <p className="text-[0.9rem]">{review.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                {review.from}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="shell mt-8 flex flex-wrap items-center justify-between gap-4">
        <p
          className="max-w-md font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-paper/65"
          data-reveal="fade"
        >
          Reviews are moderated. Only 3, 4 and 5 star submissions are accepted, so
          what you read comes from real guests.
        </p>
        <div className="flex gap-6">
          <Link href="/reviews" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
            All reviews
          </Link>
          <Link href="/reviews#write" className="link-line font-mono text-[10px] uppercase tracking-[0.2em] text-walnut">
            Leave a note →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={dir === "left" ? "rotate-180" : ""}
    >
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
