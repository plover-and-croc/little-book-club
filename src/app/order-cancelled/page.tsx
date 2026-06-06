import Link from "next/link";

export default function OrderCancelledPage() {
  return (
    <section className="section-padding">
      <div className="lbc-container max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-4xl font-black [font-family:var(--font-baloo)]">Checkout cancelled</h1>
        <p className="mt-4 text-[#333333]/85">
          No payment was taken. You can return to your bundle anytime and continue when ready.
        </p>
        <Link href="/checkout" className="lbc-btn-primary mt-6 inline-block rounded-full px-5 py-3">
          Return to Checkout
        </Link>
      </div>
    </section>
  );
}
