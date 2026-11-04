import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { experiences, img } from "@/lib/content";
import { slugify } from "@/lib/utils";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Bonfire evenings beside the Lidder, river walks, Pahalgam sightseeing, photography, family days and quiet luxury at Jade River Resort.",
  alternates: { canonical: "/jade-river-resort/experiences" },
};

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Experiences", path: "/jade-river-resort/experiences" },
        ])}
      />
      <PageHeader
        eyebrow="Experiences · Pahalgam"
        title={
          <>
            Six ways to do nothing{" "}
            <em className="text-clay">very well.</em>
          </>
        }
        intro="A fire is lit after dark. A path follows the water. The valley does the rest. None of it is scheduled for you."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <p className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-ink/65">
              Inclusive of the property
              <br />
              Ask us to arrange the rest
            </p>
            <Link href="/contact" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
              Enquire →
            </Link>
          </div>
        }
      />

      <section className="shell pb-24 md:pb-32">
        {experiences.map((exp, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={exp.title}
              id={slugify(exp.title)}
              className="grid scroll-mt-28 gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-16"
            >
              <div
                className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
                data-reveal="zoom"
              >
                <div className="group relative aspect-[16/11] overflow-hidden bg-paper-2">
                  <Image
                    src={exp.image}
                    alt={exp.subtitle}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="reveal-media object-cover transition-transform duration-[1300ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-5 top-5 bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em]">
                    {exp.meta}
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col justify-center md:col-span-4 ${
                  flip ? "md:order-1 md:col-start-1 md:row-start-1" : "md:col-start-9"
                }`}
                data-reveal="zoom"
                style={{ ["--reveal-delay" as string]: "90ms" }}
              >
                <span className="num text-ink/65">0{i + 1}</span>
                <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.5rem)] leading-[0.96]">
                  {exp.title}
                </h2>
                <p className="mt-4 font-display text-[1.15rem] italic leading-snug text-clay">
                  {exp.subtitle}
                </p>
                <p className="body-copy mt-5">{exp.body}</p>
                <div className="mt-7 flex items-center gap-4">
                  <span className="h-px w-10 bg-line" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                    {exp.meta}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="relative overflow-hidden bg-forest py-20 text-paper" data-reveal="zoom">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="eyebrow text-paper/65" data-reveal>
              One more thing
            </span>
            <p
              className="mt-5 max-w-[22ch] font-display text-[clamp(2rem,4.2vw,4rem)] leading-[1]"
              data-reveal
            >
              The best thing here is the thing we{" "}
              <em className="text-clay">can’t schedule.</em>
            </p>
          </div>
          <div className="flex flex-wrap gap-4" data-reveal="zoom" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <Link href="/contact" className="btn border-paper/30 text-paper">
              Plan your stay
            </Link>
            <a
              href="https://wa.me/917780868926"
              className="link-line self-center font-mono text-[10px] uppercase tracking-[0.2em] text-paper/70"
            >
              WhatsApp us →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
