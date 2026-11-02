"use client";

import Link from "next/link";
import { site } from "@/lib/content";
import Magnetic from "@/components/ui/Magnetic";

const words = ["Life", "slowed", "by", "the", "river"];

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-clay text-paper" aria-labelledby="cta-heading">
      <div className="marquee-host overflow-hidden border-y border-paper/20 py-4">
        <div className="jr-marquee flex w-max items-center gap-8 whitespace-nowrap">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-display text-[clamp(1.5rem,2.8vw,2.6rem)] italic">
                Life, slowed by the river
              </span>
              <span className="h-1.5 w-1.5 bg-paper/60" />
            </span>
          ))}
        </div>
      </div>

      <div className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="eyebrow text-paper/55" data-reveal>
              11 — Reserve directly
            </span>
            <h2
              id="cta-heading"
              className="mt-5 text-[clamp(3.2rem,10vw,9.6rem)] leading-[0.86] tracking-[-0.05em]"
              data-reveal
            >
              Come
              <br />
              <em className="text-paper/80">slow</em> down.
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="max-w-[30ch] text-[1rem] leading-[1.7] text-paper/75" data-reveal>
              Thirteen rooms. One river. A direct line to the people who actually run
              the place — no booking engines in between.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6" data-reveal>
              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-4 bg-paper px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink transition-colors duration-500 hover:bg-ink hover:text-paper"
                  data-cursor="Book"
                >
                  Reserve directly
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </Link>
              </Magnetic>

              <a
                href={site.phoneHref}
                className="link-line font-display text-[1.3rem] italic text-paper"
                data-cursor="Call"
              >
                {site.phone}
              </a>
            </div>

            <div className="mt-10 border-t border-paper/25 pt-5" data-reveal>
              <p className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-paper/55">
                Check-in 2:00 PM · Check-out 12:00 noon
                <br />
                50% advance confirms the booking
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="shell flex flex-col gap-4 border-t border-paper/25 py-5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <span>{site.address}</span>
          <span>Direct bookings only — no OTAs</span>
          <a href={`https://wa.me/${site.whatsapp}`} className="link-line hover:text-paper" data-cursor="Chat">
            WhatsApp us
          </a>
        </div>

        <a
          href="/contact"
          aria-label="Reserve directly"
          className="group absolute -top-16 right-[clamp(1.15rem,4.2vw,5rem)] hidden h-32 w-32 items-center justify-center rounded-full border border-paper/35 text-paper transition-colors duration-500 hover:bg-paper hover:text-clay md:flex"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-spin"
            style={{ animationDuration: "30s" }}
            aria-hidden="true"
          >
            <defs>
              <path
                id="cta-circle"
                d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
                fill="none"
              />
            </defs>
            <text fontSize="6.6" letterSpacing="1.8" fill="currentColor" fontFamily="var(--font-mono)">
              <textPath href="#cta-circle">
                RESERVE DIRECTLY · JADE RIVER RESORT ·&nbsp;
              </textPath>
            </text>
          </svg>
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.1" />
          </svg>
        </a>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <p className="jr-marquee-slow flex w-max items-center gap-10 whitespace-nowrap pb-2 font-display text-[clamp(4rem,13vw,13rem)] leading-[0.8] tracking-[-0.05em] text-paper/[0.09]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              {words.map((w) => (
                <span key={w} className="italic">
                  {w}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
