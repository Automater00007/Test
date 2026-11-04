"use client";

import { usePathname } from "next/navigation";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import SignatureIntro from "@/components/SignatureIntro";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import RevealObserver from "@/components/providers/RevealObserver";
import SmoothScroll from "@/components/providers/SmoothScroll";

/**
 * Wraps every public page with the site chrome. The Sanity Studio is served
 * from the same app but must not inherit the marketing nav, footer or motion.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;

  if (isStudio) {
    return (
      <main id="main" className="min-h-svh bg-paper">
        {children}
      </main>
    );
  }

  return (
    <>
      <SmoothScroll />
      <RevealObserver />
      <SignatureIntro />

      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
