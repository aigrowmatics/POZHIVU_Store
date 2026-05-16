"use client";

import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart-store";

export default function WishlistPage() {
  const wishlist = useCartStore((state) => state.wishlist);
  const selected = products.filter((product) => wishlist.includes(product.id));
  return <section className="py-16"><div className="luxury-container"><h1 className="font-serif text-6xl font-bold text-forest dark:text-cream">Wishlist</h1><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{selected.length ? selected.map((product) => <ProductCard key={product.id} product={product} />) : <p>No saved soaps yet.</p>}</div></div></section>;
}
