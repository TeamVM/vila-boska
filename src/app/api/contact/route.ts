import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  fullName: z.string().optional().default(""),
  email: z.string().email(),
  accommodation: z.string().min(1),
  adults: z.coerce.number().int().positive(),
  children: z.coerce.number().int().min(0).default(0),
  message: z.string().min(10),
  consent: z.boolean().refine((value) => value === true),
});

const rateLimit = new Map<string, number>();

const accommodationCapacityByName: Record<string, { adults: number; children: number }> = {
  "Studio 1": { adults: 2, children: 1 },
  "Studio 2": { adults: 2, children: 1 },
  "Apartman 3": { adults: 4, children: 0 },
  "Apartman 4": { adults: 6, children: 0 },
  "Soba 5": { adults: 2, children: 0 },
  "Soba 6": { adults: 2, children: 0 },
  "Soba 7": { adults: 3, children: 0 },
  "Soba 9": { adults: 2, children: 0 },
  "Soba 10": { adults: 2, children: 0 },
  "Apartman 12": { adults: 4, children: 0 },
  "Duplex 1": { adults: 4, children: 0 },
  "Duplex 2": { adults: 3, children: 0 },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ code: "invalidRequest" }, { status: 400 });
    }

    const { email, accommodation, adults, children, message, fullName } = parsed.data;
    const capacity = accommodationCapacityByName[accommodation];

    if (!capacity) {
      return NextResponse.json({ code: "invalidUnit" }, { status: 400 });
    }

    if (adults > capacity.adults) {
      return NextResponse.json({ code: "adultsCapacity", count: capacity.adults }, { status: 400 });
    }

    if (children > capacity.children) {
      return NextResponse.json({ code: "childrenCapacity", count: capacity.children }, { status: 400 });
    }

    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const lastAttempt = rateLimit.get(ip) || 0;

    if (now - lastAttempt < 30_000) {
      return NextResponse.json({ code: "rateLimited" }, { status: 429 });
    }
    rateLimit.set(ip, now);

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL || "vilaboska@gmail.com";

    if (!apiKey) {
      return NextResponse.json({ code: "notConfigured" }, { status: 503 });
    }

    const resend = new Resend(apiKey);
    const emailResponse = await resend.emails.send({
      from: "Vila Boska Palić <no-reply@resend.dev>",
      to: [recipient],
      subject: `Nova poruka za ${accommodation}`,
      html: `
        <h2>Nova poruka sa web sajta</h2>
        <p><strong>Ime:</strong> ${fullName || "Nije navedeno"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Smestaj:</strong> ${accommodation}</p>
        <p><strong>Odrasli:</strong> ${adults}</p>
        <p><strong>Deca:</strong> ${children}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message}</p>
      `,
    });

    if (emailResponse.error) {
      return NextResponse.json({ code: "emailFailed" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ code: "emailFailed" }, { status: 500 });
  }
}
