import Link from "next/link";
import { site } from "@/lib/content";

const explore = [
  { label: "Rooms & Suites", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Gallery", href: "/gallery" },
  { label: "Journal", href: "/post" },
  { label: "Reviews", href: "/reviews" },
];

const practical = [
  { label: "Location", href: "/location" },
  { label: "Policies", href: "/policies" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Book directly", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="shell pt-20 pb-8 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <span className="eyebrow text-paper/45">Jade River Resort</span>
            <p className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.04em]">
              Life, slowed by the <em className="text-clay">river.</em>
            </p>
            <p className="mt-8 max-w-sm font-mono text-[11px] uppercase leading-[2.1] tracking-[0.16em] text-paper/45">
              {site.address}
              <br />
              {site.coords}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-4 md:col-start-8">
            <nav aria-label="Explore">
              <p className="eyebrow mb-6 text-paper/35">Explore</p>
              <ul className="space-y-3.5">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-line text-[0.95rem] text-paper/70 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Practical">
              <p className="eyebrow mb-6 text-paper/35">Practical</p>
              <ul className="space-y-3.5">
                {practical.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-line text-[0.95rem] text-paper/70 transition-colors hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-6 text-paper/35">Direct</div>
            <ul className="space-y-6">
              <li>
                <a
                  href={site.phoneHref}
                  className="link-line text-[0.95rem] text-paper/75 hover:text-paper"
                >
                  {site.phone}
                </a>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/35">
                  Phone &amp; WhatsApp
                </p>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-line text-[0.95rem] text-paper/75 hover:text-paper"
                >
                  {site.email}
                </a>
                <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/35">
                  Direct enquiries
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-line-light pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Defoy Hotels &amp; Resorts. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/policies" className="hover:text-paper/70">
              Cancellation &amp; stay
            </Link>
            <span>Direct booking only — no OTAs</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden"
        style={{ marginBottom: "-0.16em" }}
      >
        <p
          className="whitespace-nowrap text-center font-display text-[clamp(5rem,18.5vw,19rem)] leading-[0.8] tracking-[-0.055em]"
          style={{ color: "transparent", WebkitTextStroke: "1px rgba(236,229,214,0.18)" }}
        >
          Jade River
        </p>
      </div>
    </footer>
  );
}
