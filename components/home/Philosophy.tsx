import RiverDivider from "@/components/ui/RiverDivider";
import { site } from "@/lib/content";

const copy =
  "Pahalgam is not a place you rush. The Lidder has run this valley longer than any of us. Thirteen rooms beside it — wooden walls, amber light, pine behind, water in front.";

export default function Philosophy() {
  return (
    <section className="relative pt-6 md:pt-10">
      <RiverDivider className="text-ink/65" height={84} />

      <div className="shell py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28">
              <span className="eyebrow text-ink/65" data-reveal>
                02 — Philosophy
              </span>
              <div className="mt-5 h-px w-24 bg-line" data-reveal="fade" />
              <dl
                className="mt-6 space-y-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65"
                data-reveal="zoom"
                style={{ ["--reveal-delay" as string]: "90ms" }}
              >
                <div className="flex justify-between gap-6 border-b border-line pb-2">
                  <dt>Latitude</dt>
                  <dd>{site.latDisplay}</dd>
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
            </div>
          </aside>

          <div className="md:col-span-9 md:col-start-4">
            <h2
              className="max-w-[16ch] text-[clamp(2.1rem,4.8vw,4.3rem)] leading-[0.98]"
              data-reveal
            >
              A resort built around a river,{" "}
              <em className="text-clay">not a lobby.</em>
            </h2>

            <div className="mt-8 md:mt-12">
              <p
                className="max-w-[34ch] font-display text-[clamp(1.5rem,2.7vw,2.5rem)] leading-[1.24] tracking-[-0.025em] text-warm-grey"
                data-reveal="zoom"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                {copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
