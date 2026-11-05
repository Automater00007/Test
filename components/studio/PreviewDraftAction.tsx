"use client";

import { EyeOpenIcon } from "@sanity/icons";
import type { DocumentActionComponent } from "sanity";
import { useRouter } from "sanity/router";

/**
 * Opens the current post in the Studio's Presentation preview. Sanity saves
 * drafts automatically, so this gives editors an explicit "preview what I just
 * changed" action without changing the draft model.
 */
export const PreviewDraftAction: DocumentActionComponent = (props) => {
  const router = useRouter();
  const document = props.draft ?? props.published;
  const slug =
    document && typeof document === "object" && "slug" in document
      ? (document.slug as { current?: string } | undefined)?.current
      : undefined;

  return {
    label: "Preview draft",
    title: "Open this post in the site preview",
    icon: EyeOpenIcon,
    group: ["paneActions"],
    onHandle: () => {
      router.navigateIntent("edit", {
        id: props.id,
        type: props.type,
        mode: "presentation",
        preview: slug ? `/post/${slug}` : "/post",
      });
      props.onComplete();
    },
  };
};
