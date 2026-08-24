"use client";

import { useState, type FormEvent } from "react";

const SERVICES = [
  "Digital Marketing", "Social Media Marketing", "SEO", "Google Ads",
  "Meta Ads", "Website Design", "Branding", "Performance Marketing",
];
const BUDGETS = ["Under ₹2L / mo", "₹2L – ₹5L / mo", "₹5L – ₹10L / mo", "₹10L+ / mo"];

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="font-display text-2xl">
        Thanks — we&apos;ll be in touch within one business day.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Field label="Name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Company" name="company" />
      <Field label="Phone" name="phone" type="tel" />

      <SelectField label="Service" name="service" options={SERVICES} />
      <SelectField label="Budget" name="budget" options={BUDGETS} />

      <div className="md:col-span-2">
        <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-ink/50">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full border-b border-ink/20 bg-transparent py-2 outline-none transition-colors focus:border-ink"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "submitting" ? "Sending…" : "Start a Project"} <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong — please try again or email hello@grownfoster.com.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-ink/50">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border-b border-ink/20 bg-transparent py-2 outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.1em] text-ink/50">
        {label}
      </label>
      <select
        name={name}
        defaultValue=""
        className="w-full border-b border-ink/20 bg-transparent py-2 outline-none transition-colors focus:border-ink"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
