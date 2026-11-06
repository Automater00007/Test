"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const allowed = [1, 2, 3, 4, 5];

type Props = {
  /** "qr" marks submissions that came from the printed QR code. */
  source?: "website" | "qr";
};

export default function ReviewForm({ source = "website" }: Props) {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [body, setBody] = useState("");
  const [company, setCompany] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const reset = () => {
    setRating(5);
    setName("");
    setFrom("");
    setBody("");
    setCompany("");
    setError(null);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    setError(null);
    setSending(true);

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name,
          from,
          body,
          source,
          company,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.error || "We could not save your review. Please try again.",
        );
      }

      setSent(true);
      reset();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not save your review. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="write" className="scroll-mt-28">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-line bg-paper-2 p-8 md:p-10"
          >
            <span className="eyebrow text-ink/65">Thank you</span>
            <p className="mt-4 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.05]">
              Your note has been <em className="text-clay">received.</em>
            </p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="link-line mt-6 font-mono text-[10px] uppercase tracking-[0.18em]"
            >
              Leave another →
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={submit}
            className="grid gap-8"
            noValidate
          >
            <div>
              <p className="eyebrow text-ink/65">Your rating</p>
              <div className="mt-3 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Rating">
                {allowed.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className={`flex min-w-[3rem] flex-col items-center gap-1 border px-2 py-2 transition-all duration-300 ${
                      n <= rating
                        ? "border-walnut bg-walnut text-paper"
                        : "border-line text-ink/65 hover:border-ink/40"
                    }`}
                  >
                    <span className="text-base leading-none">★</span>
                    <span className="font-mono text-[9px] leading-none">{n}</span>
                  </button>
                ))}
                <span className="self-center pl-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">
                  {rating} / 5
                </span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block border-b border-line pb-1 focus-within:border-clay">
                <span className="eyebrow text-ink/65">Your name</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  maxLength={80}
                  className="w-full bg-transparent py-3 outline-none placeholder:text-ink/65"
                  placeholder="First name and initial"
                />
              </label>
              <label className="block border-b border-line pb-1 focus-within:border-clay">
                <span className="eyebrow text-ink/65">Where you came from</span>
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  autoComplete="address-level2"
                  maxLength={80}
                  className="w-full bg-transparent py-3 outline-none placeholder:text-ink/65"
                  placeholder="City"
                />
              </label>
            </div>

            <label className="block border-b border-line pb-1 focus-within:border-clay">
              <span className="eyebrow text-ink/65">Your note</span>
              <textarea
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={1500}
                minLength={10}
                className="w-full resize-none bg-transparent py-3 outline-none placeholder:text-ink/65"
                placeholder="What stayed with you?"
              />
            </label>

            {/* Honeypot: invisible to people, tempting to bots. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Company
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
            </div>

            {error ? (
              <p
                role="alert"
                className="border border-clay/40 bg-clay/5 px-4 py-3 font-mono text-[10px] uppercase leading-[1.8] tracking-[0.14em] text-walnut"
              >
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" className="btn" disabled={sending}>
                {sending ? "Sending…" : "Submit for review"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="arrow-static">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
