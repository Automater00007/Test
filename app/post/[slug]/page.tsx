import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackToHome from "@/components/BackToHome";
import PostBody from "@/components/blog/PostBody";
import { site } from "@/lib/content";
import { getAllPostSlugs, getAllPosts, getPostBySlug } from "@/lib/posts";
import { JsonLd, breadcrumb } from "@/lib/schema";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const image = post.seo?.ogImage || post.image;

  return {
    title,
    description,
    keywords: post.seo?.keywords?.length ? post.seo.keywords : undefined,
    alternates: {
      canonical: post.seo?.canonicalUrl || `/jade-river-resort/post/${post.slug}`,
    },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title,
      description,
      publishedTime: post.publishedAt,
      images: [{ url: image, width: 1200, height: 630, alt: post.imageAlt }],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const index = all.findIndex((item) => item.slug === slug);
  const next = index >= 0 && all.length > 1 ? all[(index + 1) % all.length] : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumb([
            { name: "Home", path: "/jade-river-resort" },
            { name: "Blog", path: "/jade-river-resort/post" },
            { name: post.title, path: `/jade-river-resort/post/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.seo?.ogImage || post.image,
            datePublished: post.publishedAt,
            dateModified: post.publishedAt,
            author: {
              "@type": "Organization",
              name: post.author || "Jade River Resort",
            },
            publisher: { "@type": "Organization", name: site.name },
            mainEntityOfPage: `${site.url}/post/${post.slug}`,
          },
        ]}
      />

      <article className="pt-[68px] md:pt-[80px]">
        <header className="shell">
          <div className="flex items-center justify-between gap-4 border-b border-line py-5">
            <div className="flex items-center gap-5">
              <BackToHome />
              <Link href="/post" className="eyebrow text-ink/65 hover:text-ink">
                Blog
              </Link>
            </div>
            <span className="eyebrow hidden shrink-0 text-ink/65 sm:inline">{post.category}</span>
          </div>

          <div className="grid gap-8 pt-12 pb-10 md:grid-cols-12 md:pt-16">
            <div className="md:col-span-9">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                {post.date} · {post.read} read
                {post.author ? ` · ${post.author}` : ""}
              </p>
              <h1
                className="mt-5 text-[clamp(2.6rem,6.4vw,6.4rem)] leading-[0.92] tracking-[-0.05em]"
                data-reveal
              >
                {post.title}
              </h1>
            </div>
            <p
              className="self-end font-display text-[1.1rem] italic leading-snug text-ink/65 md:col-span-3"
              data-reveal
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              {post.excerpt}
            </p>
          </div>
        </header>

        <div className="shell">
          <div className="relative aspect-[16/9] overflow-hidden bg-paper-2" data-reveal="mask">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="100vw"
              className="reveal-media object-cover"
            />
          </div>
        </div>

        <div className="shell py-14 md:py-20">
          <div className="mx-auto max-w-[68ch]">
            {post.portableBody ? (
              <PostBody value={post.portableBody} />
            ) : (
              post.body?.map((para, i) => (
                <div key={i}>
                  <p
                    className={`text-[1.05rem] leading-[1.85] text-ink/75 ${
                      i === 0 ? "dropcap" : "mt-6"
                    }`}
                    data-reveal
                  >
                    {para}
                  </p>
                  {i === 1 && post.quote ? (
                    <blockquote
                      className="my-12 border-l border-clay pl-6 md:pl-8"
                      data-reveal
                    >
                      <p className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] tracking-[-0.03em] text-ink">
                        “{post.quote}”
                      </p>
                    </blockquote>
                  ) : null}
                </div>
              ))
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
                Jade River Resort · Pahalgam
              </p>
              <div className="flex gap-6">
                <Link href="/rooms" className="link-line font-mono text-[10px] uppercase tracking-[0.18em]">
                  See the rooms
                </Link>
                <Link href="/contact" className="link-line font-mono text-[10px] uppercase tracking-[0.18em] text-walnut">
                  Reserve →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {next && next.slug !== post.slug ? (
          <section className="border-t border-line py-14" data-reveal="zoom">
            <div className="shell">
              <p className="eyebrow text-ink/65">Next note</p>
              <Link
                href={`/post/${next.slug}`}
                className="group mt-4 flex items-end justify-between gap-6"
              >
                <h2 className="max-w-[18ch] text-[clamp(1.8rem,4vw,4rem)] leading-[0.98] transition-colors duration-500 group-hover:text-clay">
                  {next.title}
                </h2>
                <span className="mb-2 text-3xl">
                  →
                </span>
              </Link>
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
