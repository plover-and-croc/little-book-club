import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { NewsletterSignup } from "@/components/sections/NewsletterSignup";
import { PricePerBook } from "@/components/ui/PricePerBook";
import { bundles, formatTHB, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Little Book Club | Curated pre-loved English children's books Thailand",
  description:
    "Curated bundles of quality pre-loved English children's books in Thailand to help families build home libraries.",
  alternates: { canonical: siteUrl },
};

const heroTrustItems = [
  {
    label: "Curated by age and interest",
    icon: "/illustrations/builder-reading-level.png",
  },
  {
    label: "Quality, affordable preloved books",
    icon: "/illustrations/affordable-reading-friendly.png",
  },
  {
    label: "Delivered across Thailand",
    icon: "/illustrations/delivered-thailand.png",
  },
] as const;

const heroGalleryImages = [
  "/illustrations/lbc-image-boy-reading-outside.png",
  "/illustrations/lbc-image-girl-teepee.png",
  "/illustrations/lbc-image-two-children-reading-inside.png",
  "/illustrations/lbc-image-reading-toy-room.png",
  "/illustrations/lbc-image-reading-library.png",
] as const;

const readerBenefits = [
  {
    title: "More Reading",
    copy: "Build reading habits and routines — one story at a time",
    icon: "/illustrations/lbc-content-reading-tips.png",
  },
  {
    title: "More Discovery",
    copy: "Find stories your child may never pick alone.",
    icon: "/illustrations/lbc-content-book-recommendations.png",
  },
  {
    title: "More Imagination",
    copy: "Create calm screen-free moments at home.",
    icon: "/illustrations/lbc-image-inspiration.png",
  },
] as const;

const howItWorksSteps = [
  {
    step: 1,
    title: "Choose Their Age",
    icon: "/illustrations/builder-age-range.png",
  },
  {
    step: 2,
    title: "Select Their Reading Level",
    icon: "/illustrations/builder-reading-level.png",
  },
  {
    step: 3,
    title: "Pick Their Interests",
    icon: "/illustrations/builder-interests.png",
  },
  {
    step: 4,
    title: "Choose Your Bundle",
    icon: "/illustrations/builder-bundle-selection.png",
  },
  {
    step: 5,
    title: "Enjoy the Adventure",
    icon: "/illustrations/lbc-image-bag.png",
  },
] as const;

export default function HomePage() {
  return (
    <div>
      <section className="pt-16 pb-10 md:pt-20 md:pb-12">
        <div className="lbc-container">
          <div className="relative z-10 mx-auto max-w-3xl px-4 py-8 text-center md:py-12">
            <p className="text-sm font-bold uppercase tracking-wide text-[#f28c38]">Little Book Club</p>
            <h1 className="mt-4 text-4xl font-black leading-tight [font-family:var(--font-baloo)] md:text-5xl">
              Adventures for today.
              <br />
              Readers for life.
            </h1>
            <p className="mt-5 text-lg text-[#333333]/85">
              Curated bundles of quality pre-loved English children&apos;s books for ages 0–12.
              <br />
              <span className="font-bold text-[#333333]">
                Helping families build home libraries children love.
              </span>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/checkout" className="lbc-btn-primary rounded-full px-6 py-3">
                Build Your Bundle
              </Link>
              <Link
                href="#join-the-club"
                className="rounded-full border border-[#f28c38] px-6 py-3 font-bold"
              >
                Join the Club
              </Link>
            </div>
          </div>

          <div className="mt-8 grid w-full grid-cols-5 gap-4 px-1 sm:gap-6 md:mt-10 md:gap-8 lg:gap-10">
            {heroGalleryImages.map((src) => (
              <div key={src} className="relative h-[100px] w-full px-1 sm:px-2">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 20vw, 25vw"
                  quality={90}
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#dcc9ad] py-2.5 md:py-3">
        <div className="lbc-container">
          <ul className="flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-10">
            {heroTrustItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm font-semibold text-[#333333]">
                <Image
                  src={item.icon}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 object-contain"
                />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="lbc-container">
          <h2 className="text-center text-3xl font-black [font-family:var(--font-baloo)]">
            Helping Families Raise Readers
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#333333]/80">
            We make it easier for families to fill their shelves with stories, discovery, and
            imagination.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {readerBenefits.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-3xl border border-[#f3e6d0] bg-[#fff8f0] p-5"
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={72}
                  height={72}
                  className="h-16 w-16 shrink-0 object-contain"
                />
                <div>
                  <h3 className="text-xl font-black [font-family:var(--font-baloo)]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#333333]/80">{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-padding scroll-mt-20">
        <div className="lbc-container text-center">
          <h2 className="text-3xl font-black [font-family:var(--font-baloo)]">How Little Book Club Works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {howItWorksSteps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col items-center rounded-2xl border border-[#f3e6d0] bg-white p-4 shadow-sm sm:p-5"
              >
                <Image
                  src={step.icon}
                  alt=""
                  width={96}
                  height={96}
                  className="h-16 w-16 object-contain md:h-20 md:w-20"
                />
                <p className="mt-3 text-sm font-bold text-[#f28c38]">Step {step.step}</p>
                <p className="mt-1 text-center text-sm font-semibold">{step.title}</p>
              </div>
            ))}
          </div>
          <Link
            href="/checkout"
            className="mt-8 inline-block lbc-btn-primary rounded-full px-6 py-3"
          >
            Build Your Bundle
          </Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="lbc-container">
          <h2 className="text-center text-3xl font-black [font-family:var(--font-baloo)]">
            Choose Your Bundle
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="relative rounded-3xl border border-[#f3e6d0] bg-[#fff8f0] p-6 text-center"
              >
                {bundle.badge ? (
                  <span className="absolute top-4 right-4 rounded-full bg-[#7e9c72]/15 px-2.5 py-1 text-xs font-bold text-[#5f7a55]">
                    {bundle.badge}
                  </span>
                ) : null}
                <Image
                  src={bundle.image}
                  alt=""
                  width={120}
                  height={120}
                  className="mx-auto h-24 w-24 object-contain"
                />
                <h3 className="mt-4 text-xl font-black [font-family:var(--font-baloo)]">{bundle.name}</h3>
                <p className="text-sm">{bundle.books} books</p>
                <p className="mt-2 font-bold">{formatTHB(bundle.price)}</p>
                <p className="text-sm">
                  <PricePerBook amount={bundle.pricePerBook} />
                </p>
                <p className="mt-2 text-sm text-[#333333]/80">{bundle.description}</p>
                <Link
                  href="/checkout"
                  className="mt-4 inline-block rounded-full border border-[#f28c38] px-5 py-2 text-sm font-bold text-[#f28c38] hover:bg-[#f28c38] hover:text-white"
                >
                  Choose bundle
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#f3e6d0]/60">
        <div className="lbc-container grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black [font-family:var(--font-baloo)]">
              Building Home Libraries Children Love
            </h2>
            <p className="mt-4 text-[#333333]/85">
              Little Book Club is not a traditional bookstore. We do not sell individual titles. We help
              families build home libraries through curated bundles of quality pre-loved English
              children&apos;s books — so reading feels like an adventure, not another chore.
            </p>
            <p className="mt-4 text-[#333333]/85">
              Every bundle is designed to bring more stories into your home: books children return to
              again and again, discoveries they might never have chosen alone, and calm screen-free
              moments that help them fall in love with reading.
            </p>
            <p className="mt-4 font-semibold text-[#333333]">Fill their shelves. Fuel their imagination.</p>
            <p className="mt-3 text-[#333333]/85">
              Whether you are starting small or building a family library that grows with your child,
              we make it easier to raise readers — affordably, thoughtfully, and with books you can
              feel good about.
            </p>
            <Link
              href="/checkout"
              className="mt-6 inline-block lbc-btn-primary rounded-full px-6 py-3"
            >
              Build Your Bundle
            </Link>
          </div>
          <Image
            src="/illustrations/lbc-image-children-reading-outside.png"
            alt="Children reading outside"
            width={560}
            height={560}
            className="h-auto w-full max-w-md object-contain md:ml-auto"
          />
        </div>
      </section>

      <section id="join-the-club" className="section-padding scroll-mt-20 bg-white">
        <div className="lbc-container">
          <div className="rounded-3xl bg-[#f3e6d0] p-6 md:p-8 lg:flex lg:items-stretch lg:gap-8">
            <div className="flex shrink-0 items-center justify-center lg:w-1/5">
              <Image
                src="/illustrations/lbc-image-dinosaurs.png"
                alt="Dinosaur illustration with books"
                width={200}
                height={200}
                className="h-auto w-full max-w-[112px] object-contain lg:max-w-[min(100%,9rem)]"
              />
            </div>
            <div className="mt-6 min-w-0 flex-1 lg:mt-0">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      <section id="faqs" className="section-padding scroll-mt-20">
        <div className="lbc-container">
          <h2 className="text-center text-3xl font-black [font-family:var(--font-baloo)]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#333333]/80">
            Everything you need to know before building your bundle.
          </p>
          <div className="mt-6 w-full max-w-none">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="lbc-container text-center">
          <Image
            src="/illustrations/lbc-image-rocket.png"
            alt=""
            width={160}
            height={160}
            className="mx-auto h-28 w-28 object-contain md:h-32 md:w-32"
          />
          <h2 className="mt-4 text-3xl font-black [font-family:var(--font-baloo)]">Ready to start?</h2>
          <p className="mt-2 text-[#333333]/80">Adventures for today. Readers for life.</p>
          <Link
            href="/checkout"
            className="mt-5 inline-block lbc-btn-primary rounded-full px-6 py-3"
          >
            Build Your Bundle
          </Link>
        </div>
      </section>
    </div>
  );
}
