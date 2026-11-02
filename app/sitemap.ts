import type { MetadataRoute } from "next";
import { posts, rooms } from "@/lib/content";

const base = "https://defoyhotelsandresorts.com/jade-river-resort";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/rooms",
    "/experiences",
    "/gallery",
    "/location",
    "/contact",
    "/policies",
    "/faq",
    "/post",
    "/reviews",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const roomRoutes = rooms.map((room) => ({
    url: `${base}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${base}/post/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...roomRoutes, ...postRoutes];
}
