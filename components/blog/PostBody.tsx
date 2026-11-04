import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { site } from "@/lib/content";
import { urlFor } from "@/sanity/lib/image";

function sanitizeHtml(html?: string) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .trim();
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-[1.05rem] leading-[1.85] text-ink/75" data-reveal>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="mt-14 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] leading-[1.05] tracking-[-0.03em]"
        data-reveal
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="mt-10 font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.1] tracking-[-0.02em]"
        data-reveal
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-12 border-l border-copper pl-6 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.2] tracking-[-0.03em] md:pl-8"
        data-reveal
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="mt-6 list-disc space-y-3 pl-6 text-[1.05rem] leading-[1.8] text-ink/75 marker:text-copper"
        data-reveal
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="mt-6 list-decimal space-y-3 pl-6 text-[1.05rem] leading-[1.8] text-ink/75 marker:text-copper"
        data-reveal
      >
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string } | undefined)?.href || "#";
      const external = /^https?:\/\//.test(href);
      const newTab = (value as { openInNewTab?: boolean } | undefined)?.openInNewTab;
      const className = "underline decoration-copper/60 underline-offset-4 transition-colors hover:text-copper";

      if (!external) {
        return (
          <Link href={href} className={className}>
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          className={className}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = value?.asset ? urlFor(value)?.width(1600).fit("max").url() : null;
      if (!src) return null;
      return (
        <figure className="my-10 overflow-hidden" data-reveal>
          <Image
            src={src}
            alt={value?.alt || ""}
            width={1600}
            height={1000}
            sizes="(min-width: 768px) 68ch, 100vw"
            className="reveal-media h-auto w-full object-cover"
          />
          {value?.caption ? (
            <figcaption className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    tableBlock: ({ value }) => {
      const headers: string[] = value?.headers ?? [];
      const rows: { cells?: string[] }[] = value?.rows ?? [];
      if (!headers.length && !rows.length) return null;
      return (
        <div className="my-10 overflow-x-auto" data-reveal>
          <table className="w-full border-collapse text-left text-[0.95rem]">
            {headers.length > 0 && (
              <thead>
                <tr>
                  {headers.map((header, i) => (
                    <th
                      key={`${header}-${i}`}
                      className="border-b border-line bg-forest px-4 py-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-paper-2/60" : ""}>
                  {(row.cells ?? []).map((cell, j) => (
                    <td key={j} className="border-b border-line px-4 py-3 align-top text-ink/75">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {value?.caption ? (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-ink/65">
              {value.caption}
            </p>
          ) : null}
        </div>
      );
    },
    ctaButton: ({ value }) => {
      const linkType = value?.linkType;
      let href = "#";
      let external = false;

      if (linkType === "internal") {
        href = value?.internalPath || "#";
      } else if (linkType === "external") {
        href = value?.externalUrl || "#";
        external = true;
      } else if (linkType === "whatsapp") {
        href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
          value?.whatsappMessage || "",
        )}`;
        external = true;
      }

      const alignment =
        value?.align === "center"
          ? "justify-center"
          : value?.align === "right"
            ? "justify-end"
            : "justify-start";

      const style =
        value?.style === "secondary"
          ? "border border-line text-ink hover:border-walnut hover:bg-walnut hover:text-paper"
          : value?.style === "whatsapp"
            ? "bg-forest text-paper hover:bg-walnut-brown"
            : "bg-walnut text-paper hover:bg-walnut-brown";

      const className = `inline-flex items-center gap-3 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${style}`;

      return (
        <div className={`my-8 flex ${alignment}`} data-reveal>
          {external ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {value?.text}
            </a>
          ) : (
            <Link href={href} className={className}>
              {value?.text}
            </Link>
          )}
        </div>
      );
    },
    callout: ({ value }) => {
      const tone = value?.tone;
      const accent =
        tone === "warning"
          ? "border-walnut-brown"
          : tone === "tip"
            ? "border-copper"
            : "border-forest";
      return (
        <aside className={`my-10 border-l-2 bg-paper-2 px-6 py-5 ${accent}`} data-reveal>
          {value?.title ? (
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/65">
              {value.title}
            </p>
          ) : null}
          <p className="mt-2 text-[0.98rem] leading-[1.75] text-ink/75">{value?.content}</p>
        </aside>
      );
    },
    htmlBlock: ({ value }) => {
      const html = sanitizeHtml(value?.html);
      if (!html) return null;
      return (
        <div
          className="my-10 overflow-x-auto text-[0.98rem] leading-[1.8] text-ink/75"
          dangerouslySetInnerHTML={{ __html: html }}
          data-reveal
        />
      );
    },
  },
};

export default function PostBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
