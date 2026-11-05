import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient } from "@/sanity/lib/client";

const previewClient = getSanityClient({ draft: true });
const enablePresentationPreview = previewClient
  ? defineEnableDraftMode({ client: previewClient })
  : null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Sanity Presentation tool: validate its signed preview secret, enable Next.js
  // draft mode, then redirect to the page being edited.
  if (searchParams.has("sanity-preview-secret")) {
    if (!enablePresentationPreview) {
      return new Response("Sanity preview is not configured", { status: 501 });
    }
    return enablePresentationPreview.GET(request);
  }

  // Manual preview link: /api/draft?slug=...&secret=...
  const slug = searchParams.get("slug");
  const secret = process.env.SANITY_PREVIEW_SECRET;

  if (secret && searchParams.get("secret") !== secret) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();
  redirect(`/post/${slug}`);
}
