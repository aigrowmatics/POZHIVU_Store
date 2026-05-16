"use client";

import { CreditCard, MapPin, PackageCheck, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart-store";

const steps = [{ icon: MapPin, title: "Address" }, { icon: PackageCheck, title: "Shipping" }, { icon: CreditCard, title: "Payment" }, { icon: ShieldCheck, title: "Confirmation" }];

export default function CheckoutPage() {
  const { items, coupon } = useCartStore();
  const totals = cartTotals(items, coupon);
  return (
    <section className="py-16">
      <div className="luxury-container">
        <h1 className="font-serif text-6xl font-bold text-forest dark:text-cream">Checkout</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-4">{steps.map((step) => <div key={step.title} className="rounded-lg border border-charcoal/10 p-4 dark:border-cream/10"><step.icon className="text-gold" /><div className="mt-3 font-semibold">{step.title}</div></div>)}</div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <form className="grid gap-4 rounded-lg border border-charcoal/10 p-6 dark:border-cream/10">
            <input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Full name" />
            <input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Email" />
            <input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Phone" />
            <input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Address line 1" />
            <div className="grid gap-4 sm:grid-cols-3"><input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="City" /><input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="State" /><input className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3" placeholder="Pincode" /></div>
            <select className="rounded-lg border border-charcoal/10 bg-transparent px-4 py-3"><option>Razorpay</option><option>Stripe</option><option>UPI</option><option>Cards</option><option>Cash on Delivery</option></select>
            <button type="button" className="rounded-full bg-forest px-6 py-4 font-semibold text-cream dark:bg-gold dark:text-charcoal">Create secure order</button>
          </form>
          <aside className="h-fit rounded-lg bg-beige p-6 dark:bg-cream/10">
            <h2 className="font-serif text-3xl font-semibold">Payment ready</h2>
            <p className="mt-3 text-sm leading-6 text-charcoal/65 dark:text-cream/65">Connect Razorpay, Stripe and Shiprocket keys in environment variables. The API routes define the production integration boundary.</p>
            <div className="mt-5 text-2xl font-bold">{formatPrice(totals.total)}</div>
          </aside>
        </div>
      </div>
    </section>
  );
}
