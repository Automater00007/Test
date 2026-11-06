import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact & Direct Booking",
  description:
    "Reserve directly with Jade River Resort, Pahalgam. Choose a room, add dates and guests, and send a pre-filled WhatsApp message to +91 9541898820. No OTAs.",
  alternates: { canonical: "/jade-river-resort/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;

  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Contact", path: "/jade-river-resort/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Contact · Direct only"
        title={
          <>
            Tell us when.
            <br />
            We’ll keep the <em className="text-clay">river ready.</em>
          </>
        }
        intro="No booking engine, no OTA, no commission. Choose a room and send us the details — the message opens directly in WhatsApp with the resort team."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">Direct line</p>
              <a href={site.phoneHref} className="link-line mt-1 block font-display text-[1.5rem]">
                {site.phone}
              </a>
            </div>
            <span className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
              Phone &amp; WhatsApp
            </span>
          </div>
        }
      />

      <section className="shell pb-24 md:pb-32">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal="zoom">
            <BookingForm initialRoom={room} />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="md:sticky md:top-28 space-y-8" data-reveal="zoom" style={{ ["--reveal-delay" as string]: "100ms" }}>
              <div className="border-t border-line pt-5">
                <p className="eyebrow text-ink/65">The resort</p>
                <p className="mt-4 font-display text-[1.5rem] leading-tight">
                  Jade River Resort
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/70">
                  {site.address}
                  <br />
                  {site.coords}
                </p>
                <a href={`mailto:${site.email}`} className="link-line mt-4 inline-block text-[0.95rem]">
                  {site.email}
                </a>
              </div>

              <div className="border-t border-line pt-5">
                <p className="eyebrow text-ink/65">Reservations &amp; policies</p>
                <p className="mt-4 text-[0.9rem] leading-[1.8] text-ink/70">
                  Group reservations, policy, GST &amp; invoices:
                  <br />
                  <a href={`mailto:${site.email}`} className="link-line text-ink">
                    {site.email}
                  </a>
                </p>
              </div>

              <div className="border-t border-line pt-5">
                <p className="eyebrow text-ink/65">Before you book</p>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "50% advance confirms the booking",
                    "Check-in 2:00 PM · out 12:00 noon",
                    "Government photo ID required",
                    "Free cancellation 15+ days out",
                  ].map((item) => (
                    <li key={item} className="flex items-baseline gap-3 text-[0.9rem] text-ink/70">
                      <span className="h-1 w-1 shrink-0 translate-y-[-2px] bg-copper" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/policies" className="link-line mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.18em]">
                  Full policies →
                </Link>
              </div>

              <div className="bg-forest p-6 text-paper" data-reveal="zoom">
                <p className="eyebrow text-paper/65">Prefer to talk?</p>
                <p className="mt-3 font-display text-[1.5rem] leading-tight">
                  A direct line to the people who run the place.
                </p>
                <a href={site.phoneHref} className="link-line mt-4 inline-block font-mono text-[11px] tracking-[0.14em]">
                  {site.phone}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
