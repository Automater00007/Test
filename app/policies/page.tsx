import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { policies, site } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Reservation & Stay Policies",
  description:
    "Cancellation, payment, check-in and identification policies for Jade River Resort, Pahalgam. Full refund 15+ days before arrival, 50% retention 15–10 days, 100% within 10 days.",
  alternates: { canonical: "/jade-river-resort/policies" },
};

export default function PoliciesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Policies", path: "/jade-river-resort/policies" },
        ])}
      />
      <PageHeader
        eyebrow="Policies · The fine print"
        title={
          <>
            The fine print,
            <br />
            without the <em className="text-clay">fog.</em>
          </>
        }
        intro="Cancellation, payment, check-in and identification. Short, specific, and the same for everyone. If anything is unclear, call the resort before you book."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">Policy queries</p>
              <a href={`mailto:${site.email}`} className="link-line mt-1 block text-[0.95rem]">
                {site.email}
              </a>
            </div>
            <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
              Defoy Hotels
            </span>
          </div>
        }
      />

      <section className="shell pb-24 md:pb-32">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-28" data-reveal="fade">
              <p className="eyebrow text-ink/65">On this page</p>
              <ul className="mt-5 space-y-3">
                {policies.map((p, i) => (
                  <li key={p.title}>
                    <a
                      href={`#${p.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="link-line flex items-baseline gap-3 text-[0.92rem] text-ink/70 hover:text-ink"
                    >
                      <span className="num text-ink/65">0{i + 1}</span>
                      {p.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-line pt-5">
                <p className="eyebrow text-ink/65">GST &amp; invoices</p>
                <a href={`mailto:${site.email}`} className="link-line mt-2 inline-block text-[0.9rem]">
                  {site.email}
                </a>
              </div>
            </div>
          </aside>

          <div className="md:col-span-8 md:col-start-5">
            {policies.map((section, i) => {
              const id = section.title.toLowerCase().replace(/[^a-z]+/g, "-");
              return (
                <section
                  key={section.title}
                  id={id}
                  className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0 md:py-14"
                  data-reveal="zoom"
                  style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
                >
                  <div className="flex items-baseline justify-between gap-6">
                    <h2 className="text-[clamp(1.9rem,3.4vw,3.2rem)] leading-none">
                      {section.title}
                    </h2>
                    <span className="num text-ink/65">0{i + 1}</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-4 border-b border-line pb-4 text-[1rem] leading-relaxed text-ink/70"
                      >
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-copper" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <div className="border-t border-line pt-8" data-reveal>
              <p className="font-mono text-[9px] uppercase leading-[2] tracking-[0.16em] text-ink/65">
                This page reflects the reservation and stay policy supplied by Defoy
                Hotels &amp; Resorts. The complete policy document is provided with
                your booking confirmation. For policy questions, GST, or invoices email{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
                . For direct stay enquiries, contact the resort on{" "}
                <a href={site.phoneHref} className="underline">
                  {site.phone}
                </a>
                .
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4" data-reveal="zoom">
              <Link href="/faq" className="btn">
                Read the FAQ
              </Link>
              <Link
                href="/contact"
                className="link-line self-center font-mono text-[10px] uppercase tracking-[0.2em]"
              >
                Book directly →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
