"use client";

import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/ui/Button";

type SubmitState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const [formStartedAt] = useState(() => Date.now());

  const canSubmit = useMemo(() => {
    return name.trim().length >= 2 && EMAIL_RE.test(email.trim()) && message.trim().length >= 10;
  }, [name, email, message]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitState({ status: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          website,
          formStartedAt,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitState({
        status: "success",
        message: data.message || "Thanks for reaching out. I will get back to you shortly.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (error) {
      const fallback = "Unable to submit your message right now. Please email me directly.";
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : fallback,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-head">
        <h3>Project inquiry</h3>
        <p>Share scope, timeline, and expected outcome. Response time is usually within one business day.</p>
      </div>

      <label className="hp-field" aria-hidden="true">
        <span>Website</span>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="Leave this field empty"
        />
      </label>

      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          minLength={2}
          placeholder="Your full name"
        />
        <small className="input-hint">Use the name you want referenced in follow-up communication.</small>
      </label>

      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="you@example.com"
        />
        <small className="input-hint">A confirmation and next-step outline will be sent here.</small>
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
          minLength={10}
          rows={5}
          placeholder="Tell me about your project goals, timeline, and expected outcome."
        />
        <small className="input-hint">Include context like team size, stack, and target launch window.</small>
      </label>

      <Button className="contact-submit" type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

      {submitState.status === "success" ? (
        <p className="form-status success" role="status">
          {submitState.message}
        </p>
      ) : null}

      {submitState.status === "error" ? (
        <p className="form-status error" role="alert">
          {submitState.message}
        </p>
      ) : null}

      <p className="contact-meta">By sending this form, you agree to be contacted regarding your project request.</p>
    </form>
  );
}
