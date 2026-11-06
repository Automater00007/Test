#!/usr/bin/env node
/**
 * Generates the guest-review QR code.
 *
 *   npm run review-qr
 *   npm run review-qr -- https://your-domain.com
 *   npm run review-qr -- https://your-domain.com/jade-river-resort
 *
 * The URL is `<base>/review` unless the base already ends in `/review`.
 * Outputs:
 *   public/qr/review.png   (1200 px, forest on ivory, for print)
 *   public/qr/review.svg   (vector, for larger print runs)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const fallback = "https://test-kappa-lovat-59.vercel.app";
const base = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || fallback)
  .trim()
  .replace(/\/+$/, "");

const url = /\/review$/.test(base) ? base : `${base}/review`;
const outDir = path.join(process.cwd(), "public", "qr");

const options = {
  errorCorrectionLevel: "H",
  margin: 4,
  color: {
    dark: "#213329",
    light: "#FBF8F3",
  },
};

await mkdir(outDir, { recursive: true });

await QRCode.toFile(path.join(outDir, "review.png"), url, {
  ...options,
  type: "png",
  width: 1200,
});

await QRCode.toFile(path.join(outDir, "review.svg"), url, {
  ...options,
  type: "svg",
  width: 1200,
});

console.log(`Review QR code points to: ${url}`);
console.log(`Wrote ${path.join("public", "qr", "review.png")}`);
console.log(`Wrote ${path.join("public", "qr", "review.svg")}`);
