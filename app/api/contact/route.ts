import { NextResponse } from "next/server";

type ContactPayload = { name?: unknown; email?: unknown; message?: unknown };

const emailPattern = /^\S+@\S+\.\S+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Please send a valid message." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (name.length < 2 || !emailPattern.test(email) || message.length < 12) {
    return NextResponse.json({ message: "Please check your name, email, and message." }, { status: 400 });
  }

  // Connect a delivery provider here. For example, forward this payload to a
  // Formspree endpoint, or add the Resend SDK and use RESEND_API_KEY server-side.
  // This starter intentionally never exposes provider secrets to the browser.
  if (!process.env.FORMSPREE_ENDPOINT && !process.env.RESEND_API_KEY) {
    return NextResponse.json({
      delivered: false,
      message: "Thanks—your message is validated. Connect a mail provider in app/api/contact/route.ts to receive submissions.",
    }, { status: 202 });
  }

  // Keep a safe, explicit response until a provider implementation is added.
  return NextResponse.json({
    delivered: false,
    message: "Your message is ready for delivery. Finish the provider adapter in app/api/contact/route.ts to send it.",
  }, { status: 202 });
}
