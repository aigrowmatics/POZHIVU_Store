import Link from "next/link";

export default function NotFound() {
  return <section className="py-24"><div className="luxury-container text-center"><h1 className="font-serif text-7xl font-bold text-forest dark:text-cream">404</h1><p className="mt-4 text-charcoal/65 dark:text-cream/65">This page has moved or does not exist.</p><Link href="/" className="mt-8 inline-block rounded-full bg-forest px-6 py-4 font-semibold text-cream dark:bg-gold dark:text-charcoal">Back home</Link></div></section>;
}
