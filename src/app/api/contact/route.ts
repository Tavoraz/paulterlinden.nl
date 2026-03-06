import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

import type { ContactFormPayload, ContactFormResult } from "@/lib/types";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(180),
  organization: z.string().trim().max(180).optional(),
  role: z.string().trim().max(180).optional(),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional(),
  locale: z.string().trim().min(2).max(10),
});

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !port || !user || !pass || !from || !to) {
    return null;
  }

  return {
    host,
    port: Number(port),
    user,
    pass,
    from,
    to,
  };
}

function createError(message: string, status: number, fieldErrors?: ContactFormResult["fieldErrors"]) {
  return NextResponse.json<ContactFormResult>(
    {
      ok: false,
      message,
      fieldErrors,
    },
    { status },
  );
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactFormPayload;
  const parsed = payloadSchema.safeParse(body);

  if (!parsed.success) {
    const formatted = parsed.error.format();

    return createError("Controleer je invoer en probeer opnieuw.", 400, {
      name: formatted.name?._errors[0],
      email: formatted.email?._errors[0],
      message: formatted.message?._errors[0],
      consent: formatted.consent?._errors[0],
    });
  }

  const payload = parsed.data;

  // Honeypot field is kept hidden for users and catches simple bots.
  if (payload.honeypot) {
    return NextResponse.json<ContactFormResult>({
      ok: true,
      message: "Bedankt. Je bericht is ontvangen.",
    });
  }

  const config = smtpConfig();
  const isVercelPreview = process.env.VERCEL_ENV === "preview";

  if (!config) {
    if (process.env.NODE_ENV !== "production" || isVercelPreview) {
      console.info("Contact form submission (SMTP not configured):", payload);

      return NextResponse.json<ContactFormResult>({
        ok: true,
        message:
          "Je bericht is ontvangen (preview-modus zonder SMTP). Configureer SMTP om e-mails te versturen.",
      });
    }

    return createError(
      "Contactservice is tijdelijk niet beschikbaar. Probeer later opnieuw.",
      503,
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject: `Nieuwe aanvraag via paulterlinden.nl van ${payload.name}`,
      replyTo: payload.email,
      text: [
        `Naam: ${payload.name}`,
        `E-mail: ${payload.email}`,
        `Organisatie: ${payload.organization || "-"}`,
        `Rol: ${payload.role || "-"}`,
        `Taal: ${payload.locale}`,
        "",
        "Bericht:",
        payload.message,
      ].join("\n"),
    });

    return NextResponse.json<ContactFormResult>({
      ok: true,
      message:
        "Bedankt, je bericht is ontvangen. Je ontvangt binnen twee werkdagen een reactie.",
    });
  } catch (error) {
    console.error("Contact API send failure:", error);

    return createError(
      "Verzenden is niet gelukt. Probeer het later opnieuw of neem direct contact op per e-mail.",
      500,
    );
  }
}
