import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_SUBMIT_DURATION_MS = 2000;

type RateRecord = {
  hits: number[];
};

const rateLimitStore = new Map<string, RateRecord>();

function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip && ip.length > 0 ? ip : "unknown";
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const record = rateLimitStore.get(identifier) ?? { hits: [] };
  const validHits = record.hits.filter((hit) => now - hit < RATE_LIMIT_WINDOW_MS);

  if (validHits.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(identifier, { hits: validHits });
    return true;
  }

  validHits.push(now);
  rateLimitStore.set(identifier, { hits: validHits });
  return false;
}

function validatePayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request body.";
  }

  const { name, email, message, website, formStartedAt } = payload as {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown;
    formStartedAt?: unknown;
  };

  if (typeof website === "string" && website.trim().length > 0) {
    return "Spam detected.";
  }

  if (typeof formStartedAt !== "number" || !Number.isFinite(formStartedAt)) {
    return "Invalid form submission metadata.";
  }

  if (Date.now() - formStartedAt < MIN_SUBMIT_DURATION_MS) {
    return "Submission rejected. Please try again.";
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return "Please provide a valid email address.";
  }

  if (typeof message !== "string" || message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }

  if (message.length > 2000) {
    return "Message is too long.";
  }

  return null;
}

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request);
  if (isRateLimited(identifier)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please wait a few minutes before trying again.",
      },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => null);
  const error = validatePayload(payload);

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }

  const { name, email, message } = payload as {
    name: string;
    email: string;
    message: string;
  };

  // Placeholder for real email/service integration.
  console.info("New portfolio contact request", {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Thanks for reaching out. I will get back to you shortly.",
  });
}
