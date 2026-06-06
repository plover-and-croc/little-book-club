import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteUrl, tagline } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Little Book Club",
  description:
    "Learn about Little Book Club — a family reading brand helping families in Thailand build home libraries children love.",
  alternates: { canonical: `${siteUrl}/about` },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#f3e6d0]/50 pt-14 pb-16 md:pt-16 md:pb-20">
        <div className="lbc-container relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#f28c38]">About Us</p>
          <h1 className="mt-3 text-4xl font-black [font-family:var(--font-baloo)]">
            Helping families build home libraries children love
          </h1>
          <p className="mt-4 text-lg text-[#333333]/85">{tagline}</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="lbc-container">
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
            <div className="max-w-none space-y-5 lg:col-span-2">
              <h2 className="text-2xl font-black [font-family:var(--font-baloo)]">Who we are</h2>
              <p className="max-w-2xl text-[#333333]/85">
                Little Book Club began when our family moved to Thailand and discovered how difficult
                it could be to find affordable, quality English children&apos;s books. Like many expat and
                bilingual families, we wanted to build a home library our children would love — without
                paying full price for every title or spending hours hunting through second-hand shops.
              </p>
              <p className="max-w-2xl text-[#333333]/85">
                What started as filling our own shelves grew into a mission: to help other families in
                Thailand access curated pre-loved English books, raise readers, and create more screen-free
                moments at home.
              </p>

              <h2 className="pt-2 text-2xl font-black [font-family:var(--font-baloo)]">Our mission</h2>
              <p className="max-w-2xl text-[#333333]/85">
                Little Book Club helps families build home libraries children love through affordable,
                carefully curated pre-loved English-language children&apos;s books. We serve
                English-speaking and bilingual families across Thailand who want quality stories without
                the price tag of buying everything new.
              </p>
              <p className="max-w-2xl text-[#333333]/85">
                We are not a traditional bookstore. We do not sell individual titles. We sell curated
                reading experiences — bundles shaped around your child&apos;s age, reading stage, and
                interests — so you can trust us to do the choosing.
              </p>

              <h2 className="pt-2 text-2xl font-black [font-family:var(--font-baloo)]">
                More than second-hand books
              </h2>
              <p className="max-w-2xl text-[#333333]/85">
                Little Book Club is a family reading brand. Pre-loved books are how we deliver the
                outcome — but what families are really buying is more reading, more discovery, and a
                home library that grows with their child. We want children to feel excited when a bundle
                arrives, and parents to feel confident that every book has been chosen with care.
              </p>

              <h2 className="pt-2 text-2xl font-black [font-family:var(--font-baloo)]">What we believe</h2>
              <ul className="max-w-2xl space-y-3 text-[#333333]/85">
                <li>
                  <strong className="text-[#333333]">Reading first.</strong> Books are adventures,
                  memories, and opportunities — not just products on a shelf.
                </li>
                <li>
                  <strong className="text-[#333333]">Accessible learning.</strong> Every family should
                  be able to afford quality English books for their children.
                </li>
                <li>
                  <strong className="text-[#333333]">Trusted curation.</strong> Parents should not need
                  hours searching — we select books families can feel good about at home.
                </li>
                <li>
                  <strong className="text-[#333333]">Community.</strong> We are building a club of
                  families who love books, reading tips, and raising readers together.
                </li>
              </ul>

              <h2 className="pt-2 text-2xl font-black [font-family:var(--font-baloo)]">
                Our long-term vision
              </h2>
              <p className="max-w-2xl text-[#333333]/85">
                We want to become Thailand&apos;s most loved family reading brand — helping thousands of
                families build home libraries, encourage reading, reduce screen time, and raise lifelong
                readers. Everything we do should reinforce that mission.
              </p>

              <Link
                href="/checkout"
                className="lbc-btn-primary mt-4 inline-block rounded-full px-6 py-3"
              >
                Build Your Bundle
              </Link>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-square w-full overflow-hidden rounded-3xl border border-[#f3e6d0] bg-[#f3e6d0]/40 p-2">
                  <Image
                    src="/images/family-photo.jpeg"
                    alt="The Little Book Club family"
                    width={600}
                    height={600}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
