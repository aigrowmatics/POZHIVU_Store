"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  wishlist: string[];
  coupon: string | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleWishlist: (id: string) => void;
  setCoupon: (coupon: string | null) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      wishlist: [],
      coupon: null,
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return { items: state.items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)) };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)) })),
      toggleWishlist: (id) =>
        set((state) => ({ wishlist: state.wishlist.includes(id) ? state.wishlist.filter((item) => item !== id) : [...state.wishlist, id] })),
      setCoupon: (coupon) => set({ coupon }),
      clearCart: () => set({ items: [], coupon: null })
    }),
    { name: "pozhivu-cart" }
  )
);

export function cartTotals(items: CartItem[], coupon: string | null) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon?.toUpperCase() === "POZHIVU10" ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal - discount >= 999 || subtotal === 0 ? 0 : 79;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}
