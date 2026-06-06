"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BuilderSectionHeader } from "@/components/checkout/BuilderSectionHeader";
import { PricePerBook } from "@/components/ui/PricePerBook";
import {
  ageRangeOptions,
  bundles,
  flatRateShippingTHB,
  formatTHB,
  interests,
  orderTotal,
  readingStages,
} from "@/lib/site";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postcode: string;
  country: string;
  bundleId: string;
  ageRanges: string[];
  readingStages: string[];
  interests: string[];
  preferences: string;
  deliveryNotes: string;
  marketingOptIn: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  postcode: "",
  country: "Thailand",
  bundleId: "",
  ageRanges: [],
  readingStages: [],
  interests: [],
  preferences: "",
  deliveryNotes: "",
  marketingOptIn: false,
};

function toggleInList(list: string[], value: string, max?: number): string[] {
  if (list.includes(value)) return list.filter((item) => item !== value);
  if (max !== undefined && list.length >= max) return list;
  return [...list, value];
}

function selectionClass(selected: boolean): string {
  return selected
    ? "border-[#f28c38] bg-[#fff8f0]"
    : "border-[#f3e6d0] bg-white hover:border-[#e8cdb0]";
}

export function BundleBuilder() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedBundle = useMemo(
    () => bundles.find((bundle) => bundle.id === form.bundleId),
    [form.bundleId],
  );

  const selectedReadingLabels = readingStages
    .filter((stage) => form.readingStages.includes(stage.id))
    .map((stage) => stage.label);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/checkout/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || "Checkout failed.");

      window.location.href = data.checkoutUrl;
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Checkout failed.");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form onSubmit={onSubmit} className="space-y-8 lg:col-span-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black [font-family:var(--font-baloo)] md:text-3xl">
            Build Your Bundle
          </h2>
          <p className="mt-3 max-w-2xl text-[#333333]/85">
            Tell us a little about your child (or children) and the books they love, and we&apos;ll create
            a reading adventure they&apos;ll be excited to open.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <BuilderSectionHeader
            title="How old is your child? *"
            description="Select every age range that applies — helpful if you are building a bundle for more than one child."
            iconSrc="/illustrations/builder-age-range.png"
          />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {ageRangeOptions.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    ageRanges: toggleInList(prev.ageRanges, range.id),
                  }))
                }
                className={`rounded-xl border px-4 py-3 text-left ${selectionClass(form.ageRanges.includes(range.id))}`}
              >
                <p className="font-semibold">{range.label}</p>
                <p className="text-xs text-[#333333]/70">{range.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <BuilderSectionHeader
            title="What books does your child currently enjoy? *"
            description="Help us choose books that are the right fit. Select all that apply."
            iconSrc="/illustrations/builder-reading-level.png"
          />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {readingStages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    readingStages: toggleInList(prev.readingStages, stage.id),
                  }))
                }
                className={`rounded-xl border px-4 py-3 text-left ${selectionClass(form.readingStages.includes(stage.id))}`}
              >
                <p className="font-semibold">{stage.label}</p>
                <p className="text-xs text-[#333333]/70">{stage.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <BuilderSectionHeader
            title="What does your child love?"
            description="Choose up to five interests."
            iconSrc="/illustrations/builder-interests.png"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    interests: toggleInList(prev.interests, interest, 5),
                  }))
                }
                className={`rounded-full border px-3 py-2 text-sm ${selectionClass(form.interests.includes(interest))}`}
              >
                {interest}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <BuilderSectionHeader
            title="Choose Your Bundle *"
            description="Select the bundle size that best fits your family."
            iconSrc="/illustrations/builder-bundle-selection.png"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {bundles.map((bundle) => (
              <button
                key={bundle.id}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, bundleId: bundle.id }))}
                className={`relative rounded-2xl border p-4 text-center ${selectionClass(form.bundleId === bundle.id)}`}
              >
                {bundle.badge ? (
                  <span className="absolute top-3 right-3 rounded-full bg-[#7e9c72]/15 px-2 py-1 text-xs font-bold text-[#5f7a55]">
                    {bundle.badge}
                  </span>
                ) : null}
                <Image
                  src={bundle.image}
                  alt=""
                  width={80}
                  height={80}
                  className="mx-auto h-16 w-16 object-contain"
                />
                <p className="mt-2 font-bold">{bundle.name}</p>
                <p className="text-sm">{bundle.books} books</p>
                <p className="text-sm font-semibold">{formatTHB(bundle.price)}</p>
                <p className="text-xs">
                  <PricePerBook amount={bundle.pricePerBook} />
                </p>
                <p className="mt-2 text-xs text-[#333333]/80">{bundle.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="font-black [font-family:var(--font-baloo)]">Anything else we should know?</h3>
          <p className="mt-1 text-sm text-[#333333]/80">
            Favourite characters, topics or books to avoid, books they already own, reading preferences,
            or anything else that might help us curate their bundle.
          </p>
          <textarea
            placeholder="Optional notes for our curators"
            className="mt-3 w-full rounded-xl border border-[#f3e6d0] p-3"
            rows={3}
            value={form.preferences}
            onChange={(e) => setForm((prev) => ({ ...prev, preferences: e.target.value }))}
          />
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <BuilderSectionHeader
            title="Checkout details"
            description="We'll send order updates to your email."
            iconSrc="/illustrations/builder-cart.png"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <input
              placeholder="First name *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.firstName}
              onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
            />
            <input
              placeholder="Last name"
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.lastName}
              onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            />
            <input
              placeholder="Phone *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <input
              placeholder="Address line 1 *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3 sm:col-span-2"
              value={form.address1}
              onChange={(e) => setForm((prev) => ({ ...prev, address1: e.target.value }))}
            />
            <input
              placeholder="Address line 2"
              className="rounded-xl border border-[#f3e6d0] p-3 sm:col-span-2"
              value={form.address2}
              onChange={(e) => setForm((prev) => ({ ...prev, address2: e.target.value }))}
            />
            <input
              placeholder="City *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.city}
              onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
            />
            <input
              placeholder="Province *"
              required
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.province}
              onChange={(e) => setForm((prev) => ({ ...prev, province: e.target.value }))}
            />
            <input
              placeholder="Postcode"
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.postcode}
              onChange={(e) => setForm((prev) => ({ ...prev, postcode: e.target.value }))}
            />
            <input
              placeholder="Country"
              className="rounded-xl border border-[#f3e6d0] p-3"
              value={form.country}
              onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
            />
            <textarea
              placeholder="Delivery notes (optional)"
              className="rounded-xl border border-[#f3e6d0] p-3 sm:col-span-2"
              rows={2}
              value={form.deliveryNotes}
              onChange={(e) => setForm((prev) => ({ ...prev, deliveryNotes: e.target.value }))}
            />
          </div>

          <p className="mt-5 font-semibold">Would you like to Join the Little Book Club?</p>
          <label className="mt-2 flex w-full max-w-none items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 shrink-0"
              checked={form.marketingOptIn}
              onChange={(e) => setForm((prev) => ({ ...prev, marketingOptIn: e.target.checked }))}
            />
            <span className="min-w-0 flex-1">
              Yes, please send me reading tips, activity ideas, special offers and Little Book Club
              updates.
            </span>
          </label>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={
              !form.ageRanges.length ||
              !form.readingStages.length ||
              !form.bundleId ||
              submitting
            }
            className="lbc-btn-primary mt-5 rounded-full px-6 py-3 disabled:opacity-50"
          >
            {submitting ? "Preparing checkout..." : "Continue to Checkout"}
          </button>
        </section>
      </form>

      <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h3 className="font-black [font-family:var(--font-baloo)]">Your Bundle</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="font-semibold">Age Range</dt>
            <dd>{form.ageRanges.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Reading Stage</dt>
            <dd>{selectedReadingLabels.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Interests</dt>
            <dd>{form.interests.join(", ") || "—"}</dd>
          </div>
          <div>
            <dt className="font-semibold">Bundle</dt>
            <dd>{selectedBundle?.name || "—"}</dd>
          </div>
        </dl>
        <hr className="my-4 border-[#f3e6d0]" />
        <div className="space-y-2 text-sm">
          <p>
            Bundle Price:{" "}
            <span className="font-bold">{selectedBundle ? formatTHB(selectedBundle.price) : "—"}</span>
          </p>
          <p>
            Shipping (nationwide):{" "}
            <span className="font-bold">{formatTHB(flatRateShippingTHB)}</span>
          </p>
          <p className="text-xs text-[#333333]/70">
            One flat rate across Thailand. We keep delivery simple — and a larger bundle often
            means better value per book.
          </p>
          <p>
            Total:{" "}
            <span className="font-bold">
              {selectedBundle ? formatTHB(orderTotal(selectedBundle.price)) : "—"}
            </span>
          </p>
        </div>
        <ul className="mt-4 space-y-1 text-xs text-[#333333]/75">
          <li>✓ Curated by age and interests</li>
          <li>✓ Quality checked books</li>
          <li>✓ Delivered across Thailand</li>
          <li>✓ Secure checkout</li>
        </ul>
      </aside>
    </div>
  );
}
