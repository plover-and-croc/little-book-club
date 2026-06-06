"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/club/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full min-w-0">
      <h2 className="text-2xl font-black [font-family:var(--font-baloo)] md:text-3xl">Join the Club</h2>
      <p className="mt-2 w-full text-sm text-[#333333]/80 md:text-base">
        Get reading tips, family activities, age-appropriate recommendations, and Little Book Club
        updates.
      </p>
      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-[#e7d8c0] bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#f28c38]"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="lbc-btn-primary shrink-0 rounded-full px-8 py-3 whitespace-nowrap disabled:opacity-70 sm:min-w-[11.5rem]"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Join the Club"}
        </button>
      </form>
      {status === "success" ? (
        <p className="mt-2 text-sm text-[#7e9c72]">
          Thanks for joining Little Book Club. Keep an eye on your inbox for reading tips, activity
          ideas, and updates from us.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-2 text-sm text-red-600">Could not subscribe right now. Please try again.</p>
      ) : null}
    </div>
  );
}
