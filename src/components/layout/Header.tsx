"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/#join-the-club", label: "Join the Club" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100/80 bg-[#fff8f0]/95 backdrop-blur">
      <div className="lbc-container flex h-16 items-center justify-between gap-3 md:gap-4">
        <Link href="/" className="shrink-0" onClick={closeMenu}>
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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-[#f28c38]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link href="/checkout" className="lbc-btn-primary rounded-full px-4 py-2 text-sm md:px-5">
            Build Your Bundle
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcc9ad] text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-orange-100/80 bg-white px-4 py-4 lg:hidden"
        >
          <ul className="space-y-3 text-center text-sm font-semibold">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-1 hover:text-[#f28c38]"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
