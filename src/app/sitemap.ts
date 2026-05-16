import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://pozhivu.com";
  const staticRoutes = ["", "/collection", "/cart", "/checkout", "/support", "/login", "/wishlist", "/legal/privacy-policy", "/legal/terms-and-conditions", "/legal/refund-return-policy", "/legal/shipping-policy", "/legal/contact-information"];
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/product/${product.slug}`, lastModified: new Date() }))
  ];
}
