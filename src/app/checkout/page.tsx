"use client";

import { CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart-store";

const steps = [{ icon: MapPin, title: "Address" }, { icon: CreditCard, title: "Payment" }, { icon: ShieldCheck, title: "Confirmation" }];

type RazorpayPaymentResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  handler: (response: RazorpayPaymentResponse) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => { open: () => void };
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, coupon, clearCart } = useCartStore();
  const totals = cartTotals(items, coupon);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      address: String(form.get("address") || ""),
      city: String(form.get("city") || ""),
      state: String(form.get("state") || ""),
      pincode: String(form.get("pincode") || "")
    };
    const paymentMethod = "Razorpay";
    const orderItems = items.map((item) => ({ name: item.name, price: item.price, quantity: item.quantity }));

    const razorpayOrderResponse = await fetch("/api/payments/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totals.total * 100,
        currency: "INR",
        receipt: `POZ-${Date.now()}`
      })
    });

    if (!razorpayOrderResponse.ok) {
      setStatus("error");
      return;
    }

    const razorpayOrder = await razorpayOrderResponse.json();
    const scriptLoaded = await loadRazorpayScript();
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    if (!scriptLoaded || !window.Razorpay || !razorpayKey) {
      setStatus("error");
      return;
    }

    const razorpay = new window.Razorpay({
      key: razorpayKey,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "POZHIVU",
      description: "Donkey milk soap order",
      order_id: razorpayOrder.id,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone
      },
      handler: async (paymentResponse) => {
        const emailResponse = await fetch("/api/orders/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer,
            paymentMethod,
            payment: {
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpayOrderId: paymentResponse.razorpay_order_id,
              razorpaySignature: paymentResponse.razorpay_signature
            },
            items: orderItems,
            totals
          })
        });

        if (!emailResponse.ok) {
          setStatus("error");
          return;
        }

        clearCart();
        router.push("/order-success");
      }
    });

    razorpay.open();
    setStatus("idle");
  }

  return (
    <section className="py-16">
      <div className="luxury-container">
        <h1 className="font-serif text-6xl font-bold text-forest dark:text-cream">Checkout</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">{steps.map((step) => <div key={step.title} className="rounded-lg border border-charcoal/10 p-4 dark:border-cream/10"><step.icon className="text-gold" /><div className="mt-3 font-semibold">{step.title}</div></div>)}</div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-charcoal/10 p-6 dark:border-cream/10">
            <input name="name" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Full name" required />
            <input name="email" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Email" type="email" required />
            <input name="phone" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Phone" required />
            <input name="address" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Address line 1" required />
            <div className="grid gap-4 sm:grid-cols-3"><input name="city" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="City" required /><input name="state" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="State" required /><input name="pincode" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Pincode" required /></div>
            <select name="paymentMethod" className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3"><option>Razorpay secure payment</option></select>
            <button disabled={status === "loading" || items.length === 0} type="submit" className="rounded-full bg-forest px-6 py-4 font-semibold text-cream disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gold dark:text-charcoal">{status === "loading" ? "Opening payment..." : "Proceed with payment"}</button>
            {status === "error" && <p className="text-sm text-red-600">Payment or order email could not be completed. Please check Razorpay and SMTP settings.</p>}
          </form>
          <aside className="h-fit rounded-lg bg-beige p-6 dark:bg-cream/10">
            <h2 className="font-serif text-3xl font-semibold">Payment ready</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/65 dark:text-cream/65">After Razorpay payment succeeds, the order summary is emailed to pozhivu.support@gmail.com.</p>
            <div className="mt-5 text-2xl font-bold">{formatPrice(totals.total)}</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
