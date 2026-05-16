"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { discountPercent, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const wished = useCartStore((state) => state.wishlist.includes(product.id));

  return (
    <article className="group overflow-hidden rounded-lg border border-charcoal/10 bg-cream shadow-sm transition hover:-translate-y-1 hover:shadow-luxury dark:border-cream/10 dark:bg-cream/5">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-beige">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-forest">{discountPercent(product.price, product.compareAt)}% off</span>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}`} className="font-serif text-2xl font-semibold text-forest dark:text-cream">{product.name}</Link>
            <p className="mt-1 text-sm text-charcoal/65 dark:text-cream/65">{product.tagline}</p>
          </div>
          <button aria-label="Toggle wishlist" onClick={() => toggleWishlist(product.id)} className="rounded-full p-2 hover:bg-beige dark:hover:bg-cream/10">
            <Heart size={18} className={wished ? "fill-gold text-gold" : ""} />
          </button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm"><Star className="fill-gold text-gold" size={16} /> {product.rating}</div>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div><span className="text-lg font-bold">{formatPrice(product.price)}</span><span className="ml-2 text-sm text-charcoal/45 line-through dark:text-cream/45">{formatPrice(product.compareAt)}</span></div>
          <button onClick={() => addItem(product)} className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream hover:bg-charcoal dark:bg-gold dark:text-charcoal" aria-label="Add to cart"><ShoppingBag size={18} /></button>
        </div>
      </div>
    </article>
  );
}
