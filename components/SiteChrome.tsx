"use client";

import { usePathname } from "next/navigation";
import BackToHome from "@/components/BackToHome";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import SignatureIntro from "@/components/SignatureIntro";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import RevealObserver from "@/components/providers/RevealObserver";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { isHomePath } from "@/lib/utils";

/**
 * Wraps every public page with the site chrome. The Sanity Studio is served
 * from the same app but must not inherit the marketing nav, footer or motion.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio") ?? false;
  const isHome = isHomePath(pathname);
  // The QR review page is opened from a phone at the table. Skip the cinematic
  // intro so the form is usable immediately.
  const isQuickReview = pathname === "/review";

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
      {!isQuickReview && <SignatureIntro />}

      <SiteNav />
      <main id="main">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
      {!isHome && (
        <BackToHome
          className="fixed bottom-5 left-5 z-40 rounded-full bg-paper/90 px-4 py-3 text-[9px] shadow-[0_10px_40px_rgba(33,51,41,0.18)] backdrop-blur transition-transform hover:-translate-y-0.5 md:bottom-8 md:left-8"
        />
      )}
    </>
  );
}
