import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
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
