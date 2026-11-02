import Link from "next/link";

export default function NotFound() {
  return (
    <section className="pt-[68px] md:pt-[80px]">
      <div className="shell flex min-h-[78svh] flex-col justify-center py-20">
        <span className="eyebrow text-ink/45">404 · Off the path</span>
        <h1 className="mt-6 max-w-[16ch] text-[clamp(3rem,8vw,8rem)] leading-[0.9]">
          This way leads <em className="text-clay">nowhere.</em>
        </h1>
        <p className="body-copy mt-8 max-w-md">
          The page you were looking for is not here. The river, however, has not
          moved. Follow it back to somewhere useful.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn">
            Back to the resort
          </Link>
          <Link href="/rooms" className="link-line self-center font-mono text-[10px] uppercase tracking-[0.2em]">
            See the rooms →
          </Link>
        </div>
      </div>
    </section>
  );
}
