"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Small, persistent way back. Goes to the previous page when there is
 * history, otherwise falls back to the homepage. Arrows stay static; only
 * colour transitions on hover.
 */
export default function BackToHome({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
        tone === "light"
          ? "text-paper/70 hover:text-paper"
          : "text-ink/65 hover:text-ink",
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
        className="arrow-static"
      >
        <path
          d="M12 7H2M6 3L2 7l4 4"
          stroke="currentColor"
          strokeWidth="1.1"
        />
      </svg>
      <span className="link-line">Back</span>
    </button>
  );
}