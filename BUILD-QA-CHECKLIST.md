# Little Book Club Build QA Checklist

This checklist maps the current build to the launch acceptance criteria from the technical documentation.

## Completed in code

- Homepage implemented with trust-focused sections and clear CTA.
- Core pages implemented: `/about`, `/how-it-works`, `/faqs`, `/checkout`.
- Checkout form validates required fields on server using Zod.
- Stripe checkout route implemented with graceful placeholder mode when Stripe keys are not set.
- Stripe webhook route implemented for:
  - `checkout.session.completed`
  - `payment_intent.payment_failed`
  - `charge.refunded`
- Supabase order and customer creation implemented server-side.
- Mailchimp newsletter route and checkout sync flow implemented with safe skip behavior when keys are missing.
- Marketing opt-in checkbox is explicit and default unchecked.
- Metadata added for public pages with canonical URLs.
- Mobile-friendly responsive layouts implemented.
- Secrets handled through environment variables and server-only libs.
- Supabase SQL setup script prepared in `supabase-schema.sql`, including RLS baseline and book-history table.

## Pending external setup before full live verification

- Run SQL script in Supabase SQL Editor: `supabase-schema.sql`.
- Add final env values in `.env.local` for:
  - Stripe (secret + webhook + publishable key)
  - Mailchimp (API key + server prefix + audience ID)
- Configure Stripe webhook endpoint to `/api/stripe/webhook`.
- Execute end-to-end payment flow in Stripe test mode.

## Recommended manual smoke test sequence

1. Open homepage and verify sections, CTA links, and navigation.
2. Open checkout and submit:
   - Required field validation case
   - Successful mock checkout case (without Stripe keys)
3. Confirm `customers` and `orders` records in Supabase.
4. Test newsletter signup endpoint.
5. After Stripe keys are added, run full Stripe checkout and confirm webhook status updates.
6. After Mailchimp keys are added, verify newsletter and checkout tags:
   - `newsletter`, `website`
   - `customer`, `checkout`, `marketing-opt-in` (only when opted in)
