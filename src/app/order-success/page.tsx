import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <section className="section-padding">
      <div className="lbc-container max-w-2xl rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-4xl font-black [font-family:var(--font-baloo)]">
          Your reading adventure is on its way.
        </h1>
        <p className="mt-4 text-[#333333]/85">
          Thank you for choosing Little Book Club. We&apos;re excited to curate your books and will
          send delivery updates by email.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="lbc-btn-primary rounded-full px-5 py-3">
            Continue Shopping
          </Link>
          <Link href="/#join-the-club" className="rounded-full border border-[#f28c38] px-5 py-3 font-bold">
            Join the Club
          </Link>
        </div>
      </div>
    </section>
  );
}
