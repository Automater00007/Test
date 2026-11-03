"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-svh items-center justify-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/65">
        Loading Studio…
      </p>
    </div>
  ),
});

export default function StudioLoader() {
  return <Studio />;
}
