import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/content";
import { slugify } from "@/lib/utils";
import RiverDivider from "@/components/ui/RiverDivider";

export default function Experiences() {
  return (
    <section className="relative pt-20 md:pt-32" aria-labelledby="experiences-heading">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="eyebrow text-ink/65" data-reveal>
              04 — Experiences
            </span>
            <h2
              id="experiences-heading"
              className="mt-4 text-[clamp(2.3rem,5.6vw,5.4rem)] leading-[0.94]"
              data-reveal
            >
              Six ways to do nothing{" "}
              <em className="text-clay">very well.</em>
            </h2>
          </div>
          <p className="body-copy max-w-sm md:col-span-4 md:col-start-9" data-reveal>
            Nothing here is scheduled. A fire is lit at dusk, a path follows the
            river, and the valley does the rest.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          {experiences.map((exp, i) => (
            <Link
              key={exp.title}
              href={`/experiences#${slugify(exp.title)}`}
              className="group relative block border-t border-line py-[clamp(1.2rem,2.4vw,2rem)] last:border-b"
              data-reveal="zoom"
              style={{ ["--reveal-delay" as string]: `${Math.min(i * 65, 260)}ms` }}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-[4rem_1fr_auto_auto] md:gap-8">
                <span className="num transition-colors duration-300 group-hover:text-copper">
                  0{i + 1}
                </span>

                <div className="overflow-hidden">
                  <h3 className="origin-left font-display text-[clamp(1.7rem,4.2vw,3.8rem)] leading-[1.02] tracking-[-0.035em] transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-3 group-hover:text-copper md:group-hover:translate-x-6">
                    {exp.title}
                  </h3>
                </div>

                <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65 md:block">
                  {exp.meta}
                </span>

                <div className="relative h-16 w-12 overflow-hidden md:h-24 md:w-20">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="80px"
                    className="reveal-media object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                </div>
              </div>
              <p className="mt-2 max-w-md pl-9 font-display text-[0.98rem] leading-snug text-ink/65 transition-colors duration-300 group-hover:text-ink/65 md:hidden">
                {exp.subtitle}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-end" data-reveal="fade">
          <Link
            href="/experiences"
            className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"
          >
            All experiences →
          </Link>
        </div>
      </div>

      <RiverDivider className="mt-24 text-ink/65" height={80} flip />
    </section>
  );
}
