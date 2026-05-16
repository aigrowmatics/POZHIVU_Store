import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartPanel } from "@/components/product-detail-actions";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name || "Product", description: product?.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return (
    <section className="py-16">
      <div className="luxury-container grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-beige"><Image src={product.image} alt={product.name} fill className="object-cover" priority /></div>
        <div className="md:pt-10">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Handmade donkey milk soap</p>
          <h1 className="mt-4 font-serif text-6xl font-bold text-forest dark:text-cream">{product.name}</h1>
          <p className="mt-4 text-xl text-charcoal/70 dark:text-cream/70">{product.tagline}</p>
          <div className="mt-6 flex items-baseline gap-3"><span className="text-3xl font-bold">{formatPrice(product.price)}</span><span className="text-lg text-charcoal/45 line-through dark:text-cream/45">{formatPrice(product.compareAt)}</span></div>
          <p className="mt-6 text-lg leading-8 text-charcoal/70 dark:text-cream/70">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{product.notes.map((note) => <span key={note} className="rounded-full bg-beige px-4 py-2 text-sm dark:bg-cream/10">{note}</span>)}</div>
          <AddToCartPanel product={product} />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: product.image, offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: 128 } }) }} />
    </section>
  );
}
