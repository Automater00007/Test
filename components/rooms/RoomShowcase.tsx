"use client";

import Image from "next/image";
import Link from "next/link";
import { rooms } from "@/lib/content";
import { formatPrice } from "@/lib/utils";
import TiltCard from "@/components/ui/TiltCard";

export default function RoomShowcase() {
  return (
    <section className="shell pb-24 md:pb-32">
      <div className="flex flex-col">
        {rooms.map((room, i) => {
          const flip = i % 2 === 1;
          return (
            <article
              key={room.slug}
              className="grid gap-8 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-16"
            >
              <div
                className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
                data-reveal="zoom"
              >
                <TiltCard max={4}>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="group relative block aspect-[4/3] overflow-hidden bg-paper-2"

                  >
                    <Image
                      src={room.image}
                      alt={`${room.name} at Jade River Resort`}
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="reveal-media object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 flex items-end justify-between p-5">
                      <span className="bg-paper px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em]">
                        {room.count}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/50 text-paper transition-all duration-500 group-hover:border-clay group-hover:bg-walnut-brown">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="arrow-static">
                          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </div>

              <div
                className={`flex flex-col justify-between md:col-span-4 ${
                  flip ? "md:order-1 md:col-start-1 md:row-start-1" : "md:col-start-9"
                }`}
                data-reveal="zoom"
                style={{ ["--reveal-delay" as string]: "80ms" }}
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="num text-ink/65">0{i + 1}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                      {room.bestFor}
                    </span>
                  </div>
                  <h2 className="mt-4 text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96]">
                    {room.name}
                  </h2>
                  <p className="body-copy mt-5">{room.long}</p>

                  <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-line pt-6">
                    {room.amenities.slice(0, 6).map((a) => (
                      <li
                        key={a}
                        className="flex items-baseline gap-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-ink/65"
                      >
                        <span className="h-1 w-1 shrink-0 translate-y-[-2px] bg-copper" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 flex items-end justify-between border-t border-line pt-5">
                  <div>
                    <p className="font-display text-[1.6rem] leading-none">{formatPrice(room.price)}</p>
                    <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
                      per night
                    </p>
                  </div>
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="link-line font-mono text-[10px] uppercase tracking-[0.2em]"

                  >
                    View room →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
