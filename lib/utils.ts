import { site } from "@/lib/content";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const clamp = (min: number, max: number, v: number) =>
  Math.min(max, Math.max(min, v));

export const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const mapsHref = `https://www.google.com/maps/dir/?api=1&destination=${site.coords.replace(/\s/g, "")}`;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * The site is served under `/jade-river-resort` in production, and the
 * pathname can arrive with a trailing slash depending on how the host
 * rewrites the request. Treat every form of the home URL the same so the
 * "Back" control never appears on the homepage.
 */
const HOME_PATHS = new Set(["/", "/home", "/jade-river-resort"]);

export function isHomePath(pathname: string | null | undefined) {
  if (!pathname) return true;
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return HOME_PATHS.has(normalized);
}
