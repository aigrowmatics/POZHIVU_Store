"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cartTotals, useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, coupon, setCoupon, updateQuantity, removeItem } = useCartStore();
  const totals = cartTotals(items, coupon);

  return (
    <section className="py-16">
      <div className="luxury-container grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <h1 className="font-serif text-6xl font-bold text-forest dark:text-cream">Cart</h1>
          <div className="mt-8 grid gap-4">
            {items.length === 0 && <p>Your cart is empty. <Link className="text-forest underline dark:text-gold" href="/collection">Shop soaps</Link></p>}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[96px_1fr] gap-4 rounded-lg border border-charcoal/10 p-4 dark:border-cream/10">
                <div className="relative aspect-square overflow-hidden rounded-lg"><Image src={item.image} alt={item.name} fill className="object-cover" /></div>
                <div>
                  <div className="flex justify-between gap-4"><h2 className="font-serif text-2xl font-semibold">{item.name}</h2><button onClick={() => removeItem(item.id)} aria-label="Remove"><Trash2 size={18} /></button></div>
                  <p className="text-sm text-charcoal/60 dark:text-cream/60">{formatPrice(item.price)}</p>
                  <div className="mt-4 inline-flex items-center rounded-full border border-charcoal/10 dark:border-cream/10">
                    <button className="p-3" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={16} /></button>
                    <span className="min-w-10 text-center">{item.quantity}</span>
                    <button className="p-3" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-lg bg-beige p-6 dark:bg-cream/10">
          <h2 className="font-serif text-3xl font-semibold">Order summary</h2>
          <input className="mt-5 w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-3 dark:bg-[#11160f]" placeholder="Coupon code" value={coupon || ""} onChange={(event) => setCoupon(event.target.value || null)} />
          <div className="mt-5 grid gap-3 text-sm">
            <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
            <Row label="Discount" value={`-${formatPrice(totals.discount)}`} />
            <Row label="Shipping" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
            <Row label="Total" value={formatPrice(totals.total)} strong />
          </div>
          <Link href="/checkout" className="mt-6 block rounded-full bg-forest px-6 py-4 text-center font-semibold text-cream dark:bg-gold dark:text-charcoal">Checkout</Link>
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "border-t border-charcoal/10 pt-3 text-lg font-bold dark:border-cream/10" : ""}`}><span>{label}</span><span>{value}</span></div>;
}
