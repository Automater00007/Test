import Link from "next/link";
import { site } from "@/lib/content";

export default function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden bg-paper-2 text-ink"
      aria-labelledby="cta-heading"
    >
      <div className="shell py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <span className="eyebrow text-ink/70" data-reveal>
              10 — Reserve directly
            </span>
            <h2
              id="cta-heading"
              className="mt-5 text-[clamp(3.2rem,10vw,9.6rem)] leading-[0.86] tracking-[-0.05em]"
              data-reveal
            >
              Come
              <br />
              <em className="text-ink/80">slow</em> down.
            </h2>
          </div>

          <div className="md:col-span-4">
            <p className="max-w-[30ch] text-[1rem] leading-[1.7] text-ink/75" data-reveal>
              Thirteen rooms. One river. A direct line to the people who actually
              run the place — no booking engines in between.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6" data-reveal="zoom" style={{ ["--reveal-delay" as string]: "100ms" }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-paper px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:bg-walnut-brown hover:text-paper"
              >
                Reserve directly
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="arrow-static"
                >
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>

              <a
                href={site.phoneHref}
                className="link-line font-display text-[1.3rem] text-ink"
              >
                {site.phone}
              </a>
            </div>

            <div className="mt-10 border-t border-line pt-5" data-reveal="fade" style={{ ["--reveal-delay" as string]: "160ms" }}>
              <p className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-ink/70">
                Check-in 2:00 PM · Check-out 12:00 noon
                <br />
                50% advance confirms the booking
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-line py-5 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/70 sm:flex-row sm:items-center sm:justify-between" data-reveal="fade">
        <span>{site.address}</span>
        <span>Direct bookings only — no OTAs</span>
        <a href={`https://wa.me/${site.whatsapp}`} className="link-line hover:text-ink">
          WhatsApp us
        </a>
      </div>
    </section>
  );
}
