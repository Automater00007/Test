import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, site } from "@/lib/content";
import { JsonLd, breadcrumb } from "@/lib/schema";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/jade-river-resort/post/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image, width: 1600, height: 900, alt: post.title }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const next = posts[(posts.findIndex((p) => p.slug === slug) + 1) % posts.length];

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", path: "/jade-river-resort" },
            { name: "Journal", path: "/jade-river-resort/post" },
            { name: post.title, path: `/jade-river-resort/post/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Jade River Resort" },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/post/${post.slug}`,
          },
        ]}
      />

      <article className="pt-[68px] md:pt-[80px]">
        <header className="shell">
          <div className="flex items-center justify-between border-b border-line py-5">
            <Link href="/post" className="eyebrow text-ink/50 hover:text-ink">
              ← Journal
            </Link>
            <span className="eyebrow text-ink/35">{post.category}</span>
          </div>

          <div className="grid gap-8 pt-12 pb-10 md:grid-cols-12 md:pt-16">
            <div className="md:col-span-9">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/40">
                {post.date} · {post.read} read
              </p>
              <h1
                className="mt-5 text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[0.92] tracking-[-0.05em]"
                data-reveal
              >
                {post.title}
              </h1>
            </div>
            <p className="self-end font-display text-[1.1rem] italic leading-snug text-ink/50 md:col-span-3">
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="shell">
          <div className="relative aspect-[16/9] overflow-hidden bg-paper-2" data-reveal="mask">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="reveal-media object-cover"
            />
          </div>
        </div>

        <div className="shell py-14 md:py-20">
          <div className="mx-auto max-w-[68ch]">
            {post.body.map((para, i) => (
              <div key={i}>
                <p
                  className={`text-[1.05rem] leading-[1.85] text-ink/75 ${
                    i === 0 ? "dropcap" : "mt-6"
                  }`}
                  data-reveal
                >
                  {para}
                </p>
                {i === 1 && (
                  <blockquote
                    className="my-12 border-l border-clay pl-6 md:pl-8"
                    data-reveal
                  >
                    <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] tracking-[-0.03em] text-ink">
                      “{post.quote}”
                    </p>
                  </blockquote>
                )}
              </div>
            ))}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/40">
                Jade River Resort · Pahalgam
              </p>
              <div className="flex gap-6">
                <Link href="/rooms" className="link-line font-mono text-[10px] uppercase tracking-[0.18em]">
                  See the rooms
                </Link>
                <Link href="/contact" className="link-line font-mono text-[10px] uppercase tracking-[0.18em] text-clay">
                  Reserve →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="border-t border-line py-14">
          <div className="shell">
            <p className="eyebrow text-ink/40">Next note</p>
            <Link
              href={`/post/${next.slug}`}
              className="group mt-4 flex items-end justify-between gap-6"
              data-cursor="Read"
            >
              <h2 className="max-w-[18ch] text-[clamp(1.8rem,4vw,4rem)] leading-[0.98] transition-colors duration-500 group-hover:text-clay">
                {next.title}
              </h2>
              <span className="mb-2 text-3xl transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
