import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/content";
import { mapsHref } from "@/lib/utils";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Location & Directions",
  description:
    "Jade River Resort is in Pahalgam, Jammu & Kashmir, at 33.883354, 75.269764 and 2,130 metres. Srinagar Airport is 96 km away, roughly 2.5 to 3 hours by road.",
  alternates: { canonical: "/jade-river-resort/location" },
};

const nearby = [
  { name: "Baisaran Valley", note: "Known as Mini Switzerland" },
  { name: "Aru Valley", note: "Meadows and a quiet road" },
  { name: "Betaab Valley", note: "The river bend" },
  { name: "Chandanwari", note: "The road toward Amarnath" },
];

export default function LocationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Location", path: "/jade-river-resort/location" },
        ])}
      />
      <PageHeader
        eyebrow="Location · Pahalgam"
        title={
          <>
            At the end of the{" "}
            <em className="text-clay">valley road.</em>
          </>
        }
        intro="Pahalgam sits at 2,130 metres in the Lidder valley. The last stretch of road follows the river, and then it is just the river."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/40">Coordinates</p>
              <p className="mt-1 font-mono text-[11px] tracking-tight">{site.coords}</p>
            </div>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              Open maps →
            </a>
          </div>
        }
      />

      <section className="shell pb-14">
        <div className="relative overflow-hidden border border-line bg-paper-2">
          <iframe
            title="Map showing Jade River Resort in Pahalgam"
            src="https://www.google.com/maps?q=33.883354,75.269764&z=14&output=embed"
            className="h-[52svh] min-h-[380px] w-full grayscale-[0.85] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute bottom-4 left-4 bg-paper px-4 py-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">
              Jade River Resort
            </p>
            <p className="mt-1 font-display text-[1.1rem] leading-none">Pahalgam, Kashmir</p>
          </div>
        </div>
      </section>

      <section className="shell pb-20 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h2 className="text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02]">
              Getting here is part of the <em className="text-clay">slowing.</em>
            </h2>
            <p className="body-copy mt-6">
              Fly into Srinagar, then drive south through the Lidder valley. The
              road climbs gradually, the air changes, and by the time you turn off
              toward the property, the city feels much further than three hours
              away. We can arrange a pickup with the resort team — just ask before
              you book.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              {[
                ["Airport", "Srinagar · 96 km"],
                ["Drive", "2.5 – 3 hours"],
                ["Elevation", "2,130 m"],
                ["Address", "Pahalgam, J&K 192125"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="eyebrow text-ink/40">{k}</p>
                  <p className="mt-2 text-[0.95rem]">{v}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn">
                Get directions
              </a>
              <a href={site.phoneHref} className="link-line self-center font-mono text-[10px] uppercase tracking-[0.2em]">
                Call the resort →
              </a>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <span className="eyebrow text-ink/45">Nearby, all a short drive</span>
            <div className="mt-6">
              {nearby.map((n, i) => (
                <div
                  key={n.name}
                  className="group flex items-baseline justify-between gap-6 border-t border-line py-5 last:border-b"
                  data-reveal
                  style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="num text-ink/30">0{i + 1}</span>
                    <div>
                      <p className="font-display text-[clamp(1.3rem,2.2vw,1.9rem)] leading-tight transition-colors duration-500 group-hover:text-clay">
                        {n.name}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/35">
                        {n.note}
                      </p>
                    </div>
                  </div>
                  <span className="text-ink/25 transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 border border-line bg-paper-2 p-6">
              <p className="eyebrow text-ink/40">Resort contact</p>
              <div className="mt-4 space-y-3 text-[0.95rem]">
                <p>{site.address}</p>
                <a href={site.phoneHref} className="link-line block">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="link-line block">
                  {site.email}
                </a>
              </div>
              <Link href="/contact" className="btn mt-6 w-full justify-center">
                Reserve directly
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
