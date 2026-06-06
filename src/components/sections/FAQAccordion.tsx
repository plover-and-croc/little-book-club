"use client";

import Link from "next/link";
import { useState } from "react";
import { faqs, type FaqItem } from "@/lib/faqs";

function FaqCard({
  item,
  index,
  openIndex,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  openIndex: number;
  onToggle: (index: number) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <div className="w-full rounded-2xl border border-[#f3e6d0] bg-white p-4">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 text-left font-semibold"
        onClick={() => onToggle(index)}
      >
        {item.q}
        <span className="shrink-0 text-[#f28c38]">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen ? (
        <p className="mt-3 text-sm text-[#333333]/80">
          {item.a}
          {item.contactLink ? (
            <>
              {" "}
              <Link href="/contact" className="font-semibold text-[#f28c38] hover:underline">
                Contact us
              </Link>{" "}
              with your order details and we will be happy to help.
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(-1);
  const splitAt = Math.ceil(faqs.length / 2);
  const leftColumn = faqs.slice(0, splitAt);
  const rightColumn = faqs.slice(splitAt);

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? -1 : index));
  }

  return (
    <div className="flex w-full max-w-none flex-col gap-3 md:flex-row md:items-start md:gap-6">
      <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
        {leftColumn.map((item, columnIndex) => (
          <FaqCard
            key={item.q}
            item={item}
            index={columnIndex}
            openIndex={openIndex}
            onToggle={toggle}
          />
        ))}
      </div>
      <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
        {rightColumn.map((item, columnIndex) => (
          <FaqCard
            key={item.q}
            item={item}
            index={splitAt + columnIndex}
            openIndex={openIndex}
            onToggle={toggle}
          />
        ))}
      </div>
    </div>
  );
}
