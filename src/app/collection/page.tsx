import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export const metadata = { title: "Soap Collection" };

export default function CollectionPage() {
  return (
    <section className="py-16">
      <div className="luxury-container">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Collection</p>
        <h1 className="mt-4 font-serif text-6xl font-bold text-forest dark:text-cream">Premium donkey milk soaps</h1>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-beige px-4 py-2 dark:bg-cream/10">Cruelty free</span>
          <span className="rounded-full bg-beige px-4 py-2 dark:bg-cream/10">Paraben free</span>
          <span className="rounded-full bg-beige px-4 py-2 dark:bg-cream/10">Handmade</span>
          <span className="rounded-full bg-beige px-4 py-2 dark:bg-cream/10">Eco packaged</span>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </div>
    </section>
  );
}
