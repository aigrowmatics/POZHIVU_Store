"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { benefits, testimonials } from "@/data/content";
import { products } from "@/data/products";

const heroImages = [
  {
    src: "/Products/All_products.jpeg",
    alt: "POZHIVU all products"
  },
  {
    src: "/Products/background_final.png",
    alt: "POZHIVU product background"
  },
  {
    src: "/Products/brand_abmsdr.jpeg",
    alt: "POZHIVU brand ambassador"
  }
];

export function Hero() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-cream dark:bg-[#11160f]">
      <div className="luxury-container grid min-h-[calc(80vh-76px)] py-14 items-center gap-10   py-6 md:grid-cols-[0.95fr_1.05fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Premium organic skincare</p>
          <h1 className="mt-3 font-serif text-6xl font-bold leading-none text-forest dark:text-cream md:text-8xl">Nature's Essence in Every Bar</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal/70 dark:text-cream/70">Handmade donkey milk soaps enriched with botanicals, creamy oils and quiet luxury for everyday skin rituals.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/collection" className="focus-ring inline-flex items-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream hover:bg-charcoal dark:bg-gold dark:text-charcoal">Shop Collection <ArrowRight size={18} /></Link>
            <Link href="/support" className="focus-ring inline-flex items-center gap-2 rounded-full border border-forest/20 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-forest hover:bg-beige dark:border-cream/20 dark:text-cream">Talk to Care</Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex min-h-[360px] items-center justify-center md:min-h-[520px]"
        >
          <div className="absolute inset-x-0 bottom-6 top-6 rounded-full bg-gold/25 blur-3xl" />

          <div className="relative h-[320px] w-full max-w-[520px] overflow-hidden rounded-lg shadow-luxury md:h-[500px] md:max-w-[680px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroImages[activeHeroImage].src}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[activeHeroImage].src}
                  alt={heroImages[activeHeroImage].alt}
                  fill
                  className="object-cover object-center"
                  priority={activeHeroImage === 0}
                  sizes="(max-width: 768px) 100vw, 52vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  return <section className="py-20"><div className="luxury-container"><SectionTitle eyebrow="Featured collection" title="Handmade bars for every ritual" /><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>;
}

export function Benefits() {
  return <section className="bg-beige py-20 dark:bg-cream/5"><div className="luxury-container"><SectionTitle eyebrow="Why POZHIVU" title="Clean care, crafted with restraint" /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{benefits.map((item) => <div key={item.title} className="rounded-lg border border-charcoal/10 bg-cream p-6 dark:border-cream/10 dark:bg-[#11160f]"><item.icon className="text-gold" /><h3 className="mt-5 font-serif text-2xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-charcoal/65 dark:text-cream/65">{item.text}</p></div>)}</div></div></section>;
}

export function About() {
  return (
    <section className="py-20">
      <div className="luxury-container grid gap-4 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg"><Image src="https://images.unsplash.com/photo-1607006483224-44b9b55b4563?auto=format&fit=crop&w=1000&q=85" alt="Handmade soap process" fill className="object-cover" /></div>
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Small batch process</p>
          <h2 className="mt-4 font-serif text-5xl font-bold text-forest dark:text-cream">Milk proteins, botanical oils and slow curing.</h2>
          <p className="mt-5 text-lg leading-8 text-charcoal/70 dark:text-cream/70">POZHIVU bars are shaped around a creamy donkey milk base, natural oils and careful finishing. The result is a polished bar with a soft lather, gentle cleanse and gift-ready presence.</p>
          <div className="mt-8 grid grid-cols-3 gap-4"><Counter value="6" label="Soap variants" /><Counter value="21" label="Day cure" /><Counter value="0" label="Parabens" /></div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return <section className="bg-forest py-20 text-cream"><div className="luxury-container"><SectionTitle eyebrow="Reviews" title="Loved by sensitive-skin customers" light /><div className="mt-10 grid gap-6 md:grid-cols-3">{testimonials.map((item) => <figure key={item.name} className="rounded-lg border border-cream/10 p-6"><div className="flex gap-1 text-gold">{Array.from({ length: item.rating }).map((_, i) => <Sparkles key={i} size={16} />)}</div><blockquote className="mt-5 text-lg leading-8">"{item.quote}"</blockquote><figcaption className="mt-5 text-sm text-cream/65">{item.name}, {item.city}</figcaption></figure>)}</div><div className="mt-10 flex flex-wrap gap-4 text-sm text-cream/75"><span className="inline-flex items-center gap-2"><ShieldCheck size={18} /> Secure payments</span><span className="inline-flex items-center gap-2"><Truck size={18} /> Shiprocket ready</span><span className="inline-flex items-center gap-2"><CheckCircle2 size={18} /> Quality checked batches</span></div></div></section>;
}

export function InstagramGallery() {
  return <section className="py-20"><div className="luxury-container"><SectionTitle eyebrow="Instagram" title="Quiet luxury, bath-side" /><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">{products.slice(0, 5).map((product) => <div key={product.id} className="relative aspect-square overflow-hidden rounded-lg"><Image src={product.image} alt={`${product.name} social post`} fill className="object-cover transition hover:scale-105" /></div>)}</div></div></section>;
}

export function Newsletter() {
  return <section className="bg-beige py-20 dark:bg-cream/5"><div className="luxury-container grid gap-8 md:grid-cols-2 md:items-center"><div><p className="text-sm uppercase tracking-[0.28em] text-gold">Contact & newsletter</p><h2 className="mt-4 font-serif text-5xl font-bold text-forest dark:text-cream">Skin rituals, launch drops and care support.</h2></div><form className="grid gap-3"><input className="rounded-lg border border-charcoal/10 bg-cream px-4 py-4 dark:bg-[#11160f]" placeholder="Name" /><input className="rounded-lg border border-charcoal/10 bg-cream px-4 py-4 dark:bg-[#11160f]" placeholder="Email" /><input className="rounded-lg border border-charcoal/10 bg-cream px-4 py-4 dark:bg-[#11160f]" placeholder="Phone" /><textarea className="min-h-28 rounded-lg border border-charcoal/10 bg-cream px-4 py-4 dark:bg-[#11160f]" placeholder="Message" /><div className="grid gap-3 sm:grid-cols-2"><button className="rounded-full bg-forest px-5 py-4 font-semibold text-cream dark:bg-gold dark:text-charcoal" type="button"><Mail className="mr-2 inline" size={18} />Subscribe</button><a className="rounded-full border border-forest/20 px-5 py-4 text-center font-semibold text-forest dark:border-cream/20 dark:text-cream" href="https://wa.me/919876543210"><MessageCircle className="mr-2 inline" size={18} />WhatsApp</a></div></form></div></section>;
}

function SectionTitle({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return <div><p className="text-sm uppercase tracking-[0.28em] text-gold">{eyebrow}</p><h2 className={`mt-3 max-w-3xl font-serif text-5xl font-bold ${light ? "text-cream" : "text-forest dark:text-cream"}`}>{title}</h2></div>;
}

function Counter({ value, label }: { value: string; label: string }) {
  return <div><div className="font-serif text-5xl font-bold text-gold">{value}</div><div className="mt-1 text-sm uppercase tracking-[0.16em] text-charcoal/55 dark:text-cream/55">{label}</div></div>;
}