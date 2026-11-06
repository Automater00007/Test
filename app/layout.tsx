import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, DM_Mono } from "next/font/google";
import "./globals.css";
import PreviewBridge from "@/components/PreviewBridge";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://defoyhotelsandresorts.com"),
  title: {
    default: "Jade River Resort — Life, Slowed by the River",
    template: "%s — Jade River Resort",
  },
  description: site.description,
  applicationName: "Jade River Resort",
  authors: [{ name: "Defoy Hotels & Resorts" }],
  keywords: [
    "Jade River Resort",
    "Pahalgam resort",
    "luxury resort Kashmir",
    "Lidder River hotel",
    "boutique hotel Pahalgam",
    "Jammu and Kashmir stay",
    "Defoy Hotels",
  ],
  alternates: { canonical: "/jade-river-resort" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/jade-river-resort",
    siteName: "Jade River Resort",
    title: "Jade River Resort — Life, Slowed by the River",
    description: site.description,
    images: [
      {
        url: "/images/jade/gallery-07.webp",
        width: 1672,
        height: 941,
        alt: "Jade River Resort at dusk in snow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jade River Resort — Life, Slowed by the River",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f3",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Jade River Resort",
  description: site.description,
  url: "https://defoyhotelsandresorts.com/jade-river-resort",
  telephone: "+917780868926",
  email: "hello@jaderiverresort.example",
  priceRange: "₹6,000 – ₹13,000",
  numberOfRooms: 13,
  parentOrganization: { "@type": "Organization", name: "Defoy Hotels & Resorts" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pahalgam",
    addressLocality: "Pahalgam",
    addressRegion: "Jammu & Kashmir",
    postalCode: "192125",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.lat, longitude: site.lng },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Riverside setting", value: true },
    { "@type": "LocationFeatureSpecification", name: "Private balconies", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bonfire evenings", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Room service", value: true },
    { "@type": "LocationFeatureSpecification", name: "Family rooms", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free parking", value: true },
  ],
  checkinTime: "14:00",
  checkoutTime: "12:00",
};

const introScript = `(function(){try{var seen=sessionStorage.getItem('jr-intro');var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!seen&&!reduce){document.documentElement.setAttribute('data-intro','1');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${dmMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[120] -translate-y-24 bg-forest px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>

        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}[data-reveal] .reveal-media{clip-path:none!important;transform:none!important}.intro-stage{display:none!important}`}</style>
        </noscript>

        <SiteChrome>{children}</SiteChrome>
        <PreviewBridge />
      </body>
    </html>
  );
}
