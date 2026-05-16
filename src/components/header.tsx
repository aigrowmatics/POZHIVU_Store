"use client";

import Link from "next/link";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart-store";

const nav = [
  { href: "/collection", label: "Collection" },
  { href: "/support", label: "Support" },
  { href: "/legal/shipping-policy", label: "Shipping" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const items = useCartStore((state) => state.items);
  const wishlist = useCartStore((state) => state.wishlist);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-cream/85 backdrop-blur-xl dark:border-cream/10 dark:bg-[#11160f]/85">
      <div className="luxury-container flex h-[72px] items-center justify-between py-4">
        <Link href="/" className="font-serif text-3xl font-bold tracking-normal text-forest dark:text-cream">POZHIVU</Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-charcoal/70 dark:text-cream/70 md:flex">
          {nav.map((item) => <Link key={item.href} href={item.href} className="hover:text-forest dark:hover:text-gold">{item.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <IconButton label="Search"><Search size={18} /></IconButton>
          <Link href="/wishlist" aria-label="Wishlist" className="relative rounded-full p-3 hover:bg-beige dark:hover:bg-cream/10"><Heart size={18} />{wishlist.length > 0 && <Badge>{wishlist.length}</Badge>}</Link>
          <Link href="/login" aria-label="Account" className="rounded-full p-3 hover:bg-beige dark:hover:bg-cream/10"><User size={18} /></Link>
          <Link href="/cart" aria-label="Cart" className="relative rounded-full p-3 hover:bg-beige dark:hover:bg-cream/10"><ShoppingBag size={18} />{count > 0 && <Badge>{count}</Badge>}</Link>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="rounded-full p-3 hover:bg-beige dark:hover:bg-cream/10">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        </div>
        <button className="rounded-full p-3 md:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-cream p-6 dark:bg-[#11160f] md:hidden">
          <div className="flex items-center justify-between"><span className="font-serif text-3xl font-bold">POZHIVU</span><button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button></div>
          <nav className="mt-10 grid gap-6 text-2xl font-serif">
            {[...nav, { href: "/cart", label: "Cart" }, { href: "/wishlist", label: "Wishlist" }, { href: "/login", label: "Account" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return <button aria-label={label} title={label} className="rounded-full p-3 hover:bg-beige dark:hover:bg-cream/10">{children}</button>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-xs font-bold text-charcoal">{children}</span>;
}
