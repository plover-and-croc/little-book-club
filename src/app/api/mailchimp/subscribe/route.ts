import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { syncMailchimpContact } from "@/lib/mailchimp";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = newsletterSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase();
    const result = await syncMailchimpContact({
      email,
      subscribed: true,
      tags: ["newsletter", "website"],
    });

    try {
      const supabase = getSupabaseAdmin();
      await supabase.from("mailchimp_sync_log").insert({
        email,
        event_type: "newsletter_signup",
        tags: ["newsletter", "website"],
        status: result.skipped ? "skipped" : "success",
        error_message: result.skipped ? result.reason : null,
      });
    } catch {
      // Non-blocking log failure.
    }

    return NextResponse.json({ ok: true, skipped: result.skipped });
  } catch {
    return NextResponse.json({ error: "Could not subscribe right now." }, { status: 500 });
  }
}
