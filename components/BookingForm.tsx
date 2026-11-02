"use client";

import { useMemo, useState } from "react";
import { rooms, site } from "@/lib/content";
import { formatPrice } from "@/lib/utils";

export default function BookingForm({ initialRoom }: { initialRoom?: string }) {
  const [room, setRoom] = useState(
    rooms.some((r) => r.slug === initialRoom) ? initialRoom! : rooms[0].slug,
  );
  const [name, setName] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("2");
  const [notes, setNotes] = useState("");

  const selected = rooms.find((r) => r.slug === room) ?? rooms[0];

  const message = useMemo(() => {
    const lines = [
      `Hello Jade River Resort, I would like to enquire about a stay.`,
      ``,
      `Room: ${selected.name} (${formatPrice(selected.price)} / night)`,
      name ? `Name: ${name}` : null,
      checkin ? `Check-in: ${checkin}` : null,
      checkout ? `Check-out: ${checkout}` : null,
      `Guests: ${guests}`,
      notes ? `Notes: ${notes}` : null,
      ``,
      `Please confirm availability and the next steps.`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [selected, name, checkin, checkout, guests, notes]);

  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <form
      className="grid gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <fieldset className="grid gap-3">
        <legend className="eyebrow mb-1 text-ink/45">01 — Choose a room</legend>
        <div className="grid gap-2">
          {rooms.map((r) => (
            <label
              key={r.slug}
              className={`group flex cursor-pointer items-center justify-between gap-4 border px-4 py-4 transition-colors duration-300 ${
                room === r.slug
                  ? "border-ink bg-ink text-paper"
                  : "border-line hover:border-ink/40"
              }`}
            >
              <span className="flex items-center gap-4">
                <input
                  type="radio"
                  name="room"
                  value={r.slug}
                  checked={room === r.slug}
                  onChange={() => setRoom(r.slug)}
                  className="sr-only"
                />
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                    room === r.slug ? "border-paper" : "border-ink/30"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-transform ${
                      room === r.slug ? "scale-100 bg-clay" : "scale-0"
                    }`}
                  />
                </span>
                <span>
                  <span className="block font-display text-[1.1rem] leading-tight">{r.name}</span>
                  <span
                    className={`mt-0.5 block font-mono text-[9px] uppercase tracking-[0.14em] ${
                      room === r.slug ? "text-paper/50" : "text-ink/40"
                    }`}
                  >
                    {r.count} · {r.bestFor}
                  </span>
                </span>
              </span>
              <span className="whitespace-nowrap font-mono text-[10px] tracking-[0.08em]">
                {formatPrice(r.price)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="02 — Your name" htmlFor="name">
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            className="w-full bg-transparent py-3 text-[1rem] outline-none placeholder:text-ink/25"
          />
        </Field>
        <Field label="03 — Guests" htmlFor="guests">
          <select
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full appearance-none bg-transparent py-3 text-[1rem] outline-none"
          >
            {["1", "2", "3", "4", "5", "6+"].map((g) => (
              <option key={g} value={g}>
                {g} {g === "1" ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </Field>
        <Field label="04 — Check-in (optional)" htmlFor="checkin">
          <input
            id="checkin"
            type="date"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="w-full bg-transparent py-3 text-[1rem] outline-none"
          />
        </Field>
        <Field label="05 — Check-out (optional)" htmlFor="checkout">
          <input
            id="checkout"
            type="date"
            value={checkout}
            onChange={(e) => setCheckout(e.target.value)}
            className="w-full bg-transparent py-3 text-[1rem] outline-none"
          />
        </Field>
      </div>

      <Field label="06 — Anything we should know" htmlFor="notes">
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Anniversary, children's ages, a pickup from Srinagar…"
          className="w-full resize-none bg-transparent py-3 text-[1rem] outline-none placeholder:text-ink/25"
        />
      </Field>

      <div className="border-t border-line pt-6">
        <p className="eyebrow text-ink/40">Your message</p>
        <pre className="mt-3 whitespace-pre-wrap font-mono text-[11px] leading-[1.8] text-ink/55">
          {message}
        </pre>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-clay" data-cursor="Send">
          Send on WhatsApp
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <a href={site.phoneHref} className="link-line font-mono text-[10px] uppercase tracking-[0.2em]">
          Or call {site.phone}
        </a>
      </div>

      <p className="max-w-lg font-mono text-[9px] uppercase leading-[1.9] tracking-[0.16em] text-ink/35">
        Direct booking only. A 50% advance confirms the stay. Check-in 2:00 PM,
        check-out 12:00 noon. Cancellation within 10 days carries 100% retention.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group border-b border-line pb-1 focus-within:border-clay">
      <label htmlFor={htmlFor} className="eyebrow block text-ink/45">
        {label}
      </label>
      {children}
    </div>
  );
}
