import Link from "next/link";
import { sanityConfigured } from "@/sanity/env";
import StudioLoader from "./StudioLoader";

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <div className="mx-auto flex min-h-svh max-w-xl flex-col justify-center px-6 py-20">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/65">
          Jade River Resort · CMS
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] tracking-[-0.03em]">
          The Studio needs a Sanity project.
        </h1>
        <p className="mt-5 text-[1rem] leading-[1.75] text-ink/65">
          Add the project credentials to <code className="font-mono text-[0.9em]">.env.local</code>{" "}
          and restart the server:
        </p>
        <pre className="mt-5 overflow-x-auto bg-paper-2 p-5 font-mono text-[11px] leading-[1.9] text-ink/70">
          {`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id\nNEXT_PUBLIC_SANITY_DATASET=production\nSANITY_API_TOKEN=your_read_token`}
        </pre>
        <p className="mt-6 text-[0.92rem] leading-[1.75] text-ink/70">
          Until then the public journal keeps using the built-in sample posts.
        </p>
        <Link
          href="/"
          className="link-line mt-8 inline-block font-mono text-[10px] uppercase tracking-[0.2em]"
        >
          ← Back to the site
        </Link>
      </div>
    );
  }

  return <StudioLoader />;
}
