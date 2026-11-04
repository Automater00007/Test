import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs, site } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Where is Jade River Resort, how many rooms, rates, direct booking, cancellation, check-in times, IDs, airport distance and nearby places — answered plainly.",
  alternates: { canonical: "/jade-river-resort/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", path: "/jade-river-resort" },
            { name: "FAQ", path: "/jade-river-resort/faq" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />
      <PageHeader
        eyebrow="FAQ · Plain answers"
        title={
          <>
            Everything, <em className="text-clay">plainly.</em>
          </>
        }
        intro="Location, rates, booking, cancellation, IDs, and what there is to do. Written to be read by people — and understood by answer engines."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">Still unsure?</p>
              <a href={site.phoneHref} className="link-line mt-1 block text-[0.95rem]">
                {site.phone}
              </a>
            </div>
            <a href={`mailto:${site.email}`} className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
              Email us
            </a>
          </div>
        }
      />

      <section className="shell pb-24 md:pb-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="md:sticky md:top-28" data-reveal="zoom">
              <p className="eyebrow text-ink/65">12 questions</p>
              <p className="mt-5 max-w-[22ch] text-[0.95rem] leading-[1.7] text-ink/70">
                The same answers we give on the phone. If yours isn’t here, ask us
                directly.
              </p>
              <Link href="/contact" className="btn mt-6 w-full justify-center">
                Ask the resort
              </Link>
            </div>
          </div>
          <div className="md:col-span-8 md:col-start-5" data-reveal="zoom" style={{ ["--reveal-delay" as string]: "90ms" }}>
            <FaqAccordion />
            <div className="mt-12 flex flex-wrap gap-6">
              <Link href="/policies" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
                Full policies →
              </Link>
              <Link href="/rooms" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
                See the rooms →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
