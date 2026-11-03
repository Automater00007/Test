"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const allowed = [5, 4, 3];

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

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
              Your note is with the team for{" "}
              <em className="text-clay">moderation.</em>
            </p>
            <p className="mt-4 max-w-md text-[0.95rem] leading-[1.7] text-ink/70">
              Reviews are read before they are published. If everything is in order,
              your note will appear on this page shortly. We appreciate you taking
              the time.
            </p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName("");
                setFrom("");
                setTitle("");
                setBody("");
              }}
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
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-8"
          >
            <div>
              <p className="eyebrow text-ink/65">Your rating</p>
              <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label="Rating">
                {allowed.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className={`flex h-11 w-11 items-center justify-center border transition-all duration-300 ${
                      rating === n
                        ? "border-walnut bg-walnut text-paper"
                        : "border-line text-ink/65 hover:border-ink/40"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="self-center pl-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/65">
                  {rating} / 5 · 3–5 only
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
                  className="w-full bg-transparent py-3 outline-none placeholder:text-ink/65"
                  placeholder="First name and initial"
                />
              </label>
              <label className="block border-b border-line pb-1 focus-within:border-clay">
                <span className="eyebrow text-ink/65">Where you came from</span>
                <input
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-transparent py-3 outline-none placeholder:text-ink/65"
                  placeholder="City"
                />
              </label>
            </div>

            <label className="block border-b border-line pb-1 focus-within:border-clay">
              <span className="eyebrow text-ink/65">Title</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent py-3 outline-none placeholder:text-ink/65"
                placeholder="A few words"
              />
            </label>

            <label className="block border-b border-line pb-1 focus-within:border-clay">
              <span className="eyebrow text-ink/65">Your note</span>
              <textarea
                required
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full resize-none bg-transparent py-3 outline-none placeholder:text-ink/65"
                placeholder="What stayed with you?"
              />
            </label>

            <div className="flex flex-wrap items-center gap-5">
              <button type="submit" className="btn">
                Submit for review
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              <p className="max-w-xs font-mono text-[9px] uppercase leading-[1.8] tracking-[0.14em] text-ink/65">
                Moderated before publishing. Only genuine guests, please.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
