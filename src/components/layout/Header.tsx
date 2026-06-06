import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-orange-100/80 bg-[#fff8f0]/95 backdrop-blur">
      <div className="lbc-container flex h-16 items-center justify-between gap-3 md:gap-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/lbc-logo.png"
            alt="Little Book Club"
            width={160}
            height={48}
            className="h-9 w-auto md:h-10"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-semibold lg:flex xl:gap-5">
          <Link href="/#how-it-works" className="hover:text-[#f28c38]">
            How it works
          </Link>
          <Link href="/#faqs" className="hover:text-[#f28c38]">
            FAQs
          </Link>
          <Link href="/about" className="hover:text-[#f28c38]">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-[#f28c38]">
            Contact
          </Link>
          <Link href="/#join-the-club" className="hover:text-[#f28c38]">
            Join the Club
          </Link>
        </nav>

        <Link
          href="/checkout"
          className="lbc-btn-primary shrink-0 rounded-full px-4 py-2 text-sm md:px-5"
        >
          Build Your Bundle
        </Link>
      </div>
    </header>
  );
}
