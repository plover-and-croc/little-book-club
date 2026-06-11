import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Little Book Club",
  description: "Get in touch with Little Book Club by email, Facebook, or WhatsApp.",
  alternates: { canonical: `${siteUrl}/contact` },
};

const contactLinks = [
  {
    label: "Email us",
    href: "#",
    description: "Questions about bundles, delivery, or your order.",
  },
  {
    label: "Facebook",
    href: "#",
    description: "Follow along and send us a message.",
  },
  {
    label: "WhatsApp",
    href: "#",
    description: "Chat with us.",
  },
] as const;

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#f3e6d0]/50 pt-14 pb-12 md:pt-16 md:pb-14">
        <div className="lbc-container mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#f28c38]">Contact</p>
          <h1 className="mt-3 text-4xl font-black [font-family:var(--font-baloo)]">We&apos;d love to hear from you</h1>
          <p className="mt-4 text-[#333333]/85">
            Whether you have a question about building your bundle, delivery across Thailand, or joining
            the club — reach out and we&apos;ll get back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="lbc-container max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {contactLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex h-full flex-col rounded-2xl border border-[#f3e6d0] bg-white p-5 text-center shadow-sm transition hover:border-[#f28c38]"
              >
                <span className="text-lg font-bold text-[#f28c38]">{item.label}</span>
                <span className="mt-2 flex-1 text-sm text-[#333333]/80">{item.description}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#333333]/70">
            Prefer to start reading straight away?{" "}
            <Link href="/checkout" className="font-bold text-[#f28c38] hover:underline">
              Build your bundle
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
