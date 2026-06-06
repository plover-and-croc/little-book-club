import { NextResponse } from "next/server";
import { upsertClubSubscriber } from "@/lib/clubSubscribers";
import { newsletterSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = newsletterSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    await upsertClubSubscriber({
      email: parsed.data.email,
      source: "newsletter",
      tags: ["newsletter", "website"],
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
