import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import RoomShowcase from "@/components/rooms/RoomShowcase";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { rooms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rooms & Suites",
  description:
    "Thirteen rooms at Jade River Resort, Pahalgam: nine Premium Balcony Rooms, two Executive Suites, and two Executive Duplex Family Rooms. Direct booking only.",
  alternates: { canonical: "/jade-river-resort/rooms" },
};

export default function RoomsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Rooms", path: "/jade-river-resort/rooms" },
        ])}
      />
      <PageHeader
        eyebrow="Stay · 13 rooms"
        title={
          <>
            Thirteen rooms.
            <br />
            Three ways to <em className="text-clay">slow down.</em>
          </>
        }
        intro="Nine balcony rooms, two suites, two duplex family rooms. Each one opens toward the water or the pines, and none of them are in a hurry."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <div>
              <p className="eyebrow text-ink/65">From</p>
              <p className="mt-1 font-display text-[1.9rem] leading-none">₹6,000</p>
            </div>
            <Link href="/contact" className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
              Check dates →
            </Link>
          </div>
        }
      />
      <RoomShowcase />

      <section className="bg-forest py-16 text-paper md:py-20">
        <div className="shell grid gap-10 md:grid-cols-12 md:items-center">
          <p className="font-display text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.05] md:col-span-7">
            Not sure which room? Tell us who is coming and we will{" "}
            <em className="text-clay">place you properly.</em>
          </p>
          <div className="flex flex-wrap gap-4 md:col-span-5 md:justify-end">
            <Link href="/contact" className="btn border-paper/30 text-paper">
              Reserve directly
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

      <section className="shell py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {rooms.map((room) => (
            <div key={room.slug} className="border-t border-line pt-4">
              <p className="eyebrow text-ink/65">{room.count}</p>
              <p className="mt-2 text-[0.95rem]">{room.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
