import type { Metadata } from "next";
import Link from "next/link";
import ReviewForm from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Leave a review",
  description:
    "Tell Jade River Resort about your stay. Reviews are read by the team and published after approval.",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <section className="relative min-h-svh pt-[68px] md:pt-[80px]">
      <div className="shell grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-24">
        <div className="md:col-span-5">
          <span className="eyebrow text-ink/65" data-reveal>
            Guest notes · Jade River
          </span>
          <h1
            className="mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[-0.045em]"
            data-reveal
          >
            How was <em className="text-clay">your stay?</em>
          </h1>
          <p
            className="body-copy mt-6 max-w-sm"
            data-reveal
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            A sentence about the room, the river, or the morning tea is more
            useful than a paragraph of adjectives.
          </p>

          <Link
            href="/reviews"
            className="link-line mt-6 inline-block font-mono text-[10px] uppercase tracking-[0.18em]"
          >
            Read guest notes →
          </Link>
        </div>

        <div
          className="md:col-span-6 md:col-start-7"
          data-reveal="zoom"
          style={{ ["--reveal-delay" as string]: "120ms" }}
        >
          <ReviewForm source="qr" />
        </div>
      </div>
    </section>
  );
}
