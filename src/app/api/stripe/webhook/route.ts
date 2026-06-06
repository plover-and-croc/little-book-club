import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { syncMailchimpContact } from "@/lib/mailchimp";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { getStripeServer } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripeServer();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !secret) {
    return NextResponse.json({ received: true, skipped: "Stripe not configured." });
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid stripe signature." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const { data: order } = await supabase
        .from("orders")
        .update({
          order_status: "paid",
          payment_status: "paid",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        })
        .eq("id", orderId)
        .select("*")
        .single();

      if (order?.marketing_opt_in) {
        await syncMailchimpContact({
          email: order.email,
          subscribed: true,
          tags: ["customer", "checkout", "marketing-opt-in", "website"],
          firstName: order.first_name,
          lastName: order.last_name ?? undefined,
        });
      }
    }
  } else if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await supabase
      .from("orders")
      .update({ payment_status: "failed" })
      .eq("stripe_payment_intent_id", paymentIntent.id);
  } else if (event.type === "charge.refunded") {
    const charge = event.data.object as Stripe.Charge;
    await supabase
      .from("orders")
      .update({ payment_status: "refunded", order_status: "refunded" })
      .eq("stripe_payment_intent_id", charge.payment_intent);
  }

  return NextResponse.json({ received: true });
}
