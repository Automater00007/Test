"use client";

import Image from "next/image";
import Link from "next/link";
import { posts } from "@/lib/content";
import TiltCard from "@/components/ui/TiltCard";

export default function JournalTeaser() {
  return (
    <section className="relative py-20 md:py-28" aria-labelledby="journal-heading">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow text-ink/50" data-reveal>
              08 — Journal
            </span>
            <h2
              id="journal-heading"
              className="mt-4 text-[clamp(2.3rem,5.2vw,5rem)] leading-[0.94]"
              data-reveal
            >
              Notes from the <em className="text-clay">slow side.</em>
            </h2>
          </div>
          <Link
            href="/post"
            className="link-line self-start font-mono text-[10px] uppercase tracking-[0.2em] md:self-end"
            data-cursor="Read"
          >
            All journal entries →
          </Link>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-12">
          {posts.map((post, i) => (
            <TiltCard
              key={post.slug}
              max={3.2}
              className={
                i === 0
                  ? "md:col-span-6"
                  : i === 1
                    ? "md:col-span-3"
                    : "md:col-span-3"
              }
            >
              <Link
                href={`/post/${post.slug}`}
                className="group block"
                data-cursor="Read"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 48vw, 100vw" : "(min-width: 768px) 24vw, 100vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 bg-paper px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em]">
                    {post.category}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/40">
                      {post.date} · {post.read} read
                    </p>
                    <h3 className="mt-3 max-w-[22ch] font-display text-[clamp(1.35rem,1.9vw,2rem)] leading-[1.06] tracking-[-0.03em] transition-colors duration-500 group-hover:text-clay">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-[36ch] text-[0.9rem] leading-relaxed text-ink/55">
                      {post.excerpt}
                    </p>
                  </div>
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </div>
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
