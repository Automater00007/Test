"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const VisualEditing = dynamic(
  () => import("next-sanity/visual-editing").then((mod) => mod.VisualEditing),
  { ssr: false },
);

/**
 * Loads Sanity's visual editing bridge only when the site is rendered inside
 * the Studio Presentation iframe. Keeping this out of the normal page bundle
 * and avoiding `draftMode()` in the root layout preserves static rendering.
 */
export default function PreviewBridge() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    setIsPreview(
      window.self !== window.top &&
        !window.location.pathname.startsWith("/studio"),
    );
  }, []);

  if (!isPreview) return null;

  return <VisualEditing />;
}
