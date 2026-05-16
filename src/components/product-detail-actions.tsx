"use client";

import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export function AddToCartPanel({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
      <button onClick={() => addItem(product)} className="rounded-full bg-forest px-6 py-4 font-semibold uppercase tracking-[0.16em] text-cream hover:bg-charcoal dark:bg-gold dark:text-charcoal">
        <ShoppingBag className="mr-2 inline" size={18} />Add to cart
      </button>
      <button onClick={() => toggleWishlist(product.id)} className="rounded-full border border-forest/20 px-6 py-4 font-semibold text-forest dark:border-cream/20 dark:text-cream">
        <Heart className="mr-2 inline" size={18} />Wishlist
      </button>
    </div>
  );
}
