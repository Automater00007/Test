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
        intro="Unedited, apart from a read-through before publishing. Only 3, 4 and 5 star submissions are accepted, so what you read comes from real guests."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">Submissions</p>
              <p className="mt-1 text-[0.95rem]">3–5 stars · reviewed</p>
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
            <span className="eyebrow text-ink/65">Leave a note</span>
            <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.98]">
              Stayed with us? <em className="text-clay">Tell it plainly.</em>
            </h2>
            <p className="body-copy mt-6">
              A sentence about the room, the river, or the morning tea is more useful
              than a paragraph of adjectives. Reviews are read before they are
              published.
            </p>
            <div className="mt-8 border-t border-line pt-5">
              <p className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-ink/65">
                Only 3–5 star ratings are accepted.
                <br />
                1 and 2 star submissions are not shown.
              </p>
            </div>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
}
