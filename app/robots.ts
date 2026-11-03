import type { MetadataRoute } from "next";

const aiBots = [
  "GPTBot",
  "ClaudeBot",
  "Claude-Web",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "Bytespider",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/"] },
      ...aiBots.map((bot) => ({ userAgent: bot, allow: "/" })),
    ],
    sitemap:
      "https://defoyhotelsandresorts.com/jade-river-resort/sitemap.xml",
    host: "https://defoyhotelsandresorts.com",
  };
}
