import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms, site } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import { JsonLd, breadcrumb } from "@/lib/schema";
import RoomHero from "@/components/rooms/RoomHero";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) return { title: "Room not found" };
  return {
    title: room.name,
    description: `${room.description} From ${formatPrice(room.price)} per night at Jade River Resort, Pahalgam. Direct booking only.`,
    alternates: { canonical: `/jade-river-resort/rooms/${room.slug}` },
    openGraph: {
      title: `${room.name} — Jade River Resort`,
      description: room.description,
      images: [{ url: room.image, width: 1600, height: 900, alt: room.name }],
    },
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = rooms.find((r) => r.slug === slug);
  if (!room) notFound();

  const others = rooms.filter((r) => r.slug !== room.slug);
  const waText = encodeURIComponent(
    `Hello Jade River Resort, I would like to enquire about the ${room.name} (${formatPrice(room.price)} per night).`,
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", path: "/jade-river-resort" },
            { name: "Rooms", path: "/jade-river-resort/rooms" },
            { name: room.name, path: `/jade-river-resort/rooms/${room.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "HotelRoom",
            name: room.name,
            description: room.long,
            image: room.gallery,
            bed: { "@type": "BedDetails", typeOfBed: "King" },
            occupancy: { "@type": "QuantitativeValue", maxValue: 2, unitText: "guests" },
            amenityFeature: room.amenities.map((a) => ({
              "@type": "LocationFeatureSpecification",
              name: a,
              value: true,
            })),
            containedInPlace: {
              "@type": "LodgingBusiness",
              name: site.name,
              address: site.address,
            },
            offers: {
              "@type": "Offer",
              price: room.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url: `${site.url}/rooms/${room.slug}`,
            },
          },
        ]}
      />

      <RoomHero room={room} />

      <section className="shell py-14 md:py-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="eyebrow text-ink/65" data-reveal>
              The room
            </span>
            <p
              className="mt-6 font-display text-[clamp(1.6rem,2.9vw,2.8rem)] leading-[1.18] tracking-[-0.03em]"
              data-reveal
              style={{ ["--reveal-delay" as string]: "70ms" }}
            >
              {room.long}
            </p>

            <div
              className="mt-12 grid gap-10 border-t border-line pt-8 sm:grid-cols-2"
              data-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <div>
                <h2 className="font-display text-[1.5rem]">In the room</h2>
                <ul className="mt-5 space-y-3">
                  {room.amenities.map((a) => (
                    <li key={a} className="flex items-baseline gap-3 border-b border-line pb-2.5 text-[0.93rem]">
                      <span className="h-1 w-1 shrink-0 translate-y-[-2px] bg-copper" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-[1.5rem]">Good to know</h2>
                <dl className="mt-5 space-y-4">
                  {[
                    ["Check-in", "2:00 PM"],
                    ["Check-out", "12:00 noon"],
                    ["Advance", "50% to confirm"],
                    ["Cancellation", "See policy"],
                    ["Best for", room.bestFor],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-6 border-b border-line pb-2.5">
                      <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                        {k}
                      </dt>
                      <dd className="text-right text-[0.9rem]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div
              className="md:sticky md:top-28 border border-line bg-paper-2 p-6"
              data-reveal="zoom"
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <p className="eyebrow text-ink/65">Reserve directly</p>
              <p className="mt-4 font-display text-[2.4rem] leading-none">{formatPrice(room.price)}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                per night · inclusive of taxes as confirmed
              </p>

              <Link
                href={`/contact?room=${room.slug}`}
                className="btn mt-7 w-full justify-center"

              >
                Check availability
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-clay mt-3 w-full justify-center"

              >
                WhatsApp directly
              </a>

              <p className="mt-6 border-t border-line pt-4 text-[0.85rem] leading-relaxed text-ink/70">
                No booking engines, no OTA commission. Your enquiry goes straight to
                the resort team.
              </p>
              <a href={site.phoneHref} className="link-line mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.18em]">
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell pb-20">
        <span className="eyebrow text-ink/65" data-reveal="fade">
          The room, in frames
        </span>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {room.gallery.map((src, i) => (
            <div
              key={src + i}
              className={`relative overflow-hidden bg-paper-2 ${i === 0 ? "aspect-[4/5]" : "aspect-[4/5]"}`}
              data-reveal="zoom"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <Image
                src={src}
                alt={`${room.name} — view ${i + 1}`}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="reveal-media object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="shell">
          <span className="eyebrow text-ink/65" data-reveal="fade">
            Other rooms
          </span>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {others.map((other, i) => (
              <Link
                key={other.slug}
                href={`/rooms/${other.slug}`}
                className="group flex items-center gap-6 border-t border-line pt-6"
                data-reveal="zoom"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-paper-2">
                  <Image
                    src={other.image}
                    alt={other.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1">
                  <p className="eyebrow text-ink/65">{other.count}</p>
                  <h3 className="mt-2 font-display text-[1.6rem] leading-tight transition-colors group-hover:text-clay">
                    {other.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">
                    From {formatPrice(other.price)} / night
                  </p>
                </div>
                <span className="text-2xl">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
