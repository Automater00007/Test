import type { NextRequest } from "next/server";
import { getSanityWriteClient } from "@/sanity/lib/client";

export const runtime = "nodejs";

type Submission = {
  name?: unknown;
  from?: unknown;
  rating?: unknown;
  title?: unknown;
  body?: unknown;
  contact?: unknown;
  source?: unknown;
  company?: unknown;
};

type CleanSubmission = {
  name: string;
  from: string;
  rating: number;
  title: string;
  body: string;
  contact: string;
  source: "website" | "qr";
};

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_PER_WINDOW) return false;

  entry.count += 1;
  return true;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(input: Submission): { data: CleanSubmission } | { error: string } {
  const name = text(input.name, 80);
  const from = text(input.from, 80);
  const title = text(input.title, 120);
  const body = text(input.body, 1500);
  const contact = text(input.contact, 160);
  const rating = Number(input.rating);

  if (name.length < 2) {
    return { error: "Please add your name." };
  }

  if (!Number.isInteger(rating) || rating < 3 || rating > 5) {
    return { error: "Please choose a rating between 3 and 5 stars." };
  }

  if (body.length < 10) {
    return { error: "Please write at least a sentence about your stay." };
  }

  return {
    data: {
      name,
      from,
      rating,
      title,
      body,
      contact,
      source: input.source === "qr" ? "qr" : "website",
    },
  };
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return Response.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  let input: Submission;

  try {
    input = (await request.json()) as Submission;
  } catch {
    return Response.json(
      { ok: false, error: "Could not read that submission." },
      { status: 400 },
    );
  }

  // Hidden field filled by bots. Pretend it worked so they do not retry.
  if (text(input.company, 200)) {
    return Response.json({ ok: true }, { status: 201 });
  }

  const result = validate(input);
  if ("error" in result) {
    return Response.json({ ok: false, error: result.error }, { status: 422 });
  }

  const client = getSanityWriteClient();
  if (!client) {
    console.error(
      "[reviews] Missing Sanity project or write token. Set SANITY_WRITE_TOKEN (or an Editor SANITY_API_TOKEN).",
    );
    return Response.json(
      {
        ok: false,
        error: "Review submissions are not configured yet. Please try again later.",
      },
      { status: 503 },
    );
  }

  try {
    await client.create({
      _type: "review",
      status: "pending",
      name: result.data.name,
      location: result.data.from || undefined,
      rating: result.data.rating,
      title: result.data.title || undefined,
      body: result.data.body,
      contact: result.data.contact || undefined,
      source: result.data.source,
      submittedAt: new Date().toISOString(),
    });

    return Response.json(
      { ok: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[reviews] Could not create the review submission.", error);
    return Response.json(
      { ok: false, error: "We could not save your review. Please try again." },
      { status: 502 },
    );
  }
}
