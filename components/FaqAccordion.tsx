"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/lib/content";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className="border-b border-line">
            <h2>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="group flex w-full items-baseline gap-5 py-6 text-left md:gap-10"
              >
                <span
                  className={`num shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-clay" : "text-ink/65 group-hover:text-ink/70"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 font-display text-[clamp(1.2rem,2vw,1.75rem)] leading-[1.2] tracking-[-0.02em] transition-colors duration-300 ${
                    isOpen ? "text-clay" : "group-hover:text-ink/70"
                  }`}
                >
                  {faq.q}
                </span>
                <span
                  className={`relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-4 bg-current" />
                  <span className="absolute h-4 w-px bg-current" />
                </span>
              </button>
            </h2>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[70ch] pb-8 pl-[2.1rem] text-[0.98rem] leading-[1.8] text-ink/65 md:pl-[3.4rem]">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
