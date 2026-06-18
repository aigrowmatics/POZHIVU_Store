"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

type Mode = "login" | "register";
type Status = "idle" | "loading" | "success" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload =
      mode === "register"
        ? {
            name: String(form.get("name") || ""),
            email: String(form.get("email") || ""),
            password: String(form.get("password") || "")
          }
        : {
            email: String(form.get("email") || ""),
            password: String(form.get("password") || "")
          };

    const response = await fetch(`/api/auth/${mode === "register" ? "register" : "login"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    setMessage(mode === "register" ? "Account created successfully." : "Login successful.");
    router.push("/collection");
  }

  return (
    <section className="py-16">
      <div className="luxury-container grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Account</p>
          <h1 className="mt-4 font-serif text-6xl font-bold text-forest dark:text-cream">
            {mode === "register" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-4 text-charcoal/65 dark:text-cream/65">
            Manage orders, wishlist, addresses and skincare preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-charcoal/10 p-6 dark:border-cream/10">
          {mode === "register" && (
            <input
              name="name"
              className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3"
              placeholder="Full name"
              required
            />
          )}

          <input
            name="email"
            className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3"
            placeholder="Email"
            type="email"
            required
          />

          <input
            name="password"
            className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3"
            placeholder="Password"
            type="password"
            minLength={8}
            required
          />

          <button
            className="rounded-full bg-forest px-6 py-4 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gold dark:text-charcoal"
            disabled={status === "loading"}
            type="submit"
          >
            {status === "loading" ? "Please wait..." : mode === "register" ? "Create account" : "Login"}
          </button>

          <button
            className="rounded-full border border-forest/20 px-6 py-4 font-semibold text-forest dark:border-cream/20 dark:text-cream"
            type="button"
            onClick={() => {
              setMode(mode === "register" ? "login" : "register");
              setMessage("");
              setStatus("idle");
            }}
          >
            {mode === "register" ? "Already have an account? Login" : "Create account"}
          </button>

          {message && (
            <p className={`text-sm ${status === "error" ? "text-red-600" : "text-forest dark:text-gold"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
