import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="pt-[68px] md:pt-[80px]">
      <div className="shell">
        <div className="flex items-center justify-between border-b border-line py-5">
          <span className="eyebrow text-ink/50">{eyebrow}</span>
          <span className="eyebrow text-ink/35">Jade River Resort</span>
        </div>

        <div className="grid gap-10 pt-12 pb-14 md:grid-cols-12 md:pt-20 md:pb-20">
          <div className="md:col-span-8">
            <h1
              className="text-[clamp(2.9rem,8vw,8rem)] leading-[0.88] tracking-[-0.05em]"
              data-reveal
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-col justify-end gap-6 md:col-span-4">
            {intro ? (
              <p className="body-copy max-w-md" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
                {intro}
              </p>
            ) : null}
            {aside}
          </div>
        </div>

        {children}
      </div>
    </header>
  );
}
