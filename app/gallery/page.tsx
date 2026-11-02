import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import GalleryGrid from "@/components/GalleryGrid";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs of Jade River Resort and the Lidder valley: wooden architecture, the river, pine forest, the lawn, and the light at different hours.",
  alternates: { canonical: "/jade-river-resort/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb([
          { name: "Home", path: "/jade-river-resort" },
          { name: "Gallery", path: "/jade-river-resort/gallery" },
        ])}
      />
      <PageHeader
        eyebrow="Gallery · The property"
        title={
          <>
            A frame every <em className="text-clay">few steps.</em>
          </>
        }
        intro="Wooden facades, a stream in front, pine forest behind. The light changes every hour and never repeats itself."
        aside={
          <div className="flex items-end justify-between border-t border-line pt-5">
            <p className="font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-ink/45">
              Property photography
              <br />
              Pahalgam · Kashmir
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/35">
              12 frames
            </span>
          </div>
        }
      />

      <section className="shell pb-24 md:pb-32">
        <GalleryGrid />
      </section>

      <section className="border-t border-line py-14">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <p className="max-w-[26ch] font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[1.05]">
            The photographs only get you halfway. The{" "}
            <em className="text-clay">sound</em> does the rest.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/contact" className="btn">
              Reserve directly
            </Link>
            <Link
              href="/experiences"
              className="link-line self-center font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              See experiences →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
