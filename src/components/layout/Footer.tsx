import Image from "next/image";
import Link from "next/link";
import { tagline } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white">
      <div className="lbc-container grid gap-8 py-10 md:grid-cols-4">
        <div>
          <Image
            src="/lbc-logo.png"
            alt="Little Book Club"
            width={140}
            height={42}
            className="h-8 w-auto"
          />
          <p className="mt-2 text-sm text-[#333333]/80">{tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Shop</p>
          <Link href="/checkout">Build Your Bundle</Link>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">About</p>
          <div className="flex flex-col gap-2">
            <Link href="/about">About Us</Link>
            <Link href="/#faqs">FAQs</Link>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Community</p>
          <Link href="/#join-the-club">Join the Club</Link>
        </div>
      </div>
    </footer>
  );
}
