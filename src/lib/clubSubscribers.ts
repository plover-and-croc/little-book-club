import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export type ClubSubscriberSource = "newsletter" | "checkout";

export async function upsertClubSubscriber(params: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source: ClubSubscriberSource;
  tags: string[];
  orderId?: string;
  subscribed?: boolean;
}) {
  const supabase = getSupabaseAdmin();
  const email = params.email.toLowerCase();

  const { data: existing } = await supabase
    .from("club_subscribers")
    .select("first_name, last_name, phone, source, tags")
    .eq("email", email)
    .maybeSingle();

  const mergedTags = [...new Set([...(existing?.tags ?? []), ...params.tags])];
  const source =
    existing?.source === "checkout" || params.source === "checkout" ? "checkout" : params.source;

  const { error } = await supabase.from("club_subscribers").upsert(
    {
      email,
      first_name: params.firstName || existing?.first_name || null,
      last_name: params.lastName || existing?.last_name || null,
      phone: params.phone || existing?.phone || null,
      source,
      tags: mergedTags,
      subscribed: params.subscribed ?? true,
      order_id: params.orderId ?? null,
    },
    { onConflict: "email" },
  );

  if (error) {
    throw error;
  }

  return { ok: true as const };
}
