"use client";

import { LoaderCircle, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };
    const nextErrors: FieldErrors = {};
    if (values.name.length < 2) nextErrors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = "Please enter a valid email address.";
    if (values.message.length < 12) nextErrors.message = "Please add a little more detail (at least 12 characters).";
    setErrors(nextErrors);
    setFeedback("");
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Something went wrong. Please try again.");
      form.reset();
      setStatus("success");
      setFeedback(result.message ?? "Thanks—your message is on its way.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form__field">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        {errors.name ? <p id="contact-name-error" className="field-error" role="alert">{errors.name}</p> : null}
      </div>
      <div className="contact-form__field">
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        {errors.email ? <p id="contact-email-error" className="field-error" role="alert">{errors.email}</p> : null}
      </div>
      <div className="contact-form__field contact-form__field--message">
        <label htmlFor="contact-message">How can I help?</label>
        <textarea id="contact-message" name="message" rows={5} placeholder="Tell me a little about the opportunity, challenge, or idea." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
        {errors.message ? <p id="contact-message-error" className="field-error" role="alert">{errors.message}</p> : null}
      </div>
      <div className="contact-form__bottom">
        <button className="button button--primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? <><LoaderCircle className="spin" size={17} aria-hidden="true" /> Sending</> : <><Send size={16} aria-hidden="true" /> Send message</>}
        </button>
        <p className={status === "success" ? "form-feedback form-feedback--success" : status === "error" ? "form-feedback form-feedback--error" : "form-feedback"} role="status" aria-live="polite">
          {feedback}
        </p>
      </div>
    </form>
  );
}
