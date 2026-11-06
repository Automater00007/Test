import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new Response("SANITY_REVALIDATE_SECRET is not configured", { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(request, secret);

    if (isValidSignature !== true) {
      return new Response("Invalid signature", { status: 401 });
    }

    revalidateTag("post");
    revalidatePath("/");
    revalidatePath("/post");
    revalidatePath("/sitemap.xml");
    // Cover new and removed slugs even when the webhook payload has no slug.
    revalidatePath("/post/[slug]", "page");

    if (body?.slug?.current) {
      revalidatePath(`/post/${body.slug.current}`);
    }

    // Guest reviews: approving a review in the Studio should update the site
    // immediately instead of waiting for the short fetch window.
    if (body?._type === "review") {
      revalidateTag("reviews");
      revalidatePath("/reviews");
      revalidatePath("/review");
      revalidatePath("/");
    }

    return Response.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : "Error revalidating",
      { status: 500 },
    );
  }
}
