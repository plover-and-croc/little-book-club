import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { bundles, flatRateShippingTHB, orderTotal, siteUrl } from "@/lib/site";
import { getStripeServer } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = checkoutSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json({ error: "Please check required checkout fields." }, { status: 400 });
    }

    const payload = parsed.data;
    const bundle = bundles.find((item) => item.id === payload.bundleId);
    if (!bundle) {
      return NextResponse.json({ error: "Invalid bundle selected." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: customer } = await supabase
      .from("customers")
      .upsert(
        {
          email: payload.email.toLowerCase(),
          first_name: payload.firstName,
          last_name: payload.lastName || null,
          phone: payload.phone,
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customer?.id || null,
        email: payload.email.toLowerCase(),
        first_name: payload.firstName,
        last_name: payload.lastName || null,
        phone: payload.phone,
        delivery_address_line_1: payload.address1,
        delivery_address_line_2: payload.address2 || null,
        city: payload.city,
        province: payload.province,
        postcode: payload.postcode || null,
        country: payload.country || "Thailand",
        bundle_type: payload.bundleId,
        child_age_range: payload.ageRanges[0],
        child_reading_stage: payload.readingStages[0],
        child_interests: payload.interests,
        preferences: JSON.stringify({
          notes: payload.preferences || "",
          ageRanges: payload.ageRanges,
          readingStages: payload.readingStages,
        }),
        avoid_topics: null,
        gift_message: null,
        delivery_notes: payload.deliveryNotes || null,
        marketing_opt_in: payload.marketingOptIn,
        order_status: "awaiting_payment",
        payment_status: "pending",
        total_amount: orderTotal(bundle.price),
        currency: "THB",
        source: "website",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Could not create order draft." }, { status: 500 });
    }

    const stripe = getStripeServer();
    if (!stripe) {
      return NextResponse.json({
        checkoutUrl: `${siteUrl}/order-success?mock=1&orderId=${order.id}`,
        mocked: true,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/order-cancelled`,
      metadata: { orderId: order.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "thb",
            unit_amount: bundle.price * 100,
            product_data: {
              name: `${bundle.name} Bundle`,
              description: `${bundle.books} curated pre-loved children's books`,
            },
          },
        },
        {
          quantity: 1,
          price_data: {
            currency: "thb",
            unit_amount: flatRateShippingTHB * 100,
            product_data: {
              name: "Delivery (Thailand)",
              description: "Flat-rate nationwide shipping",
            },
          },
        },
      ],
      customer_email: payload.email,
    });

    await supabase
      .from("orders")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", order.id);

    return NextResponse.json({ checkoutUrl: session.url });
  } catch {
    return NextResponse.json({ error: "Unexpected checkout error." }, { status: 500 });
  }
}
