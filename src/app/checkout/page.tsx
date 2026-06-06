import type { Metadata } from "next";
import { BundleBuilder } from "@/components/checkout/BundleBuilder";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Build Your Bundle | Little Book Club",
  description: "Personalise your bundle by age range, reading stage and interests.",
  alternates: { canonical: `${siteUrl}/checkout` },
};

export default function CheckoutPage() {
  return (
    <section className="section-padding">
      <div className="lbc-container">
        <BundleBuilder />
      </div>
    </section>
  );
}
