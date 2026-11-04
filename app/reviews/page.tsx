import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ReviewForm from "@/components/ReviewForm";
import { reviews } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Notes left by guests of Jade River Resort, Pahalgam — on the river, the balcony rooms, the duplex family rooms, the bonfire evenings, and the quiet.",
  alternates: { canonical: "/jade-river-resort/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Reviews", path: "/jade-river-resort/reviews" },
        ])}
      />
      <PageHeader
        eyebrow="Guest notes · Moderated"
        title={
          <>
            Notes left by <em className="text-clay">guests.</em>
          </>
        }
        intro=""
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">Submissions</p>
            </div>
            <a href="#write" className="link-line mb-1 font-mono text-[10px] uppercase tracking-[0.18em]">
              Leave a note →
            </a>
          </div>
        }
      />

      <section className="shell pb-20">
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {reviews.map((review, i) => (
            <article
              key={review.name}
              className={`group border-t border-line pt-6 ${
                i === 0 || i === 3 ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-6" : ""
              }`}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-[13px] tracking-[0.18em] text-clay"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {"★".repeat(review.rating)}
                    <span className="text-ink/15">{"★".repeat(5 - review.rating)}</span>
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                    {review.date}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[clamp(1.5rem,2.2vw,2.1rem)] leading-[1.05] tracking-[-0.03em] transition-colors duration-500 group-hover:text-clay">
                  {review.title}
                </h2>
              </div>
              <div>
                <p className="mt-4 text-[0.96rem] leading-[1.75] text-ink/70">
                  {review.body}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <p className="text-[0.9rem]">{review.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                    {review.from}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="eyebrow text-ink/65" data-reveal>
              Leave a note
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.98]" data-reveal>
              Stayed with us? <em className="text-clay">Tell it plainly.</em>
            </h2>
            <p className="body-copy mt-6" data-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
              A sentence about the room, the river, or the morning tea is more useful
              than a paragraph of adjectives.
            </p>
            <div
              className="mt-8 border-t border-line pt-5"
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >

            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6" data-reveal="zoom">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
