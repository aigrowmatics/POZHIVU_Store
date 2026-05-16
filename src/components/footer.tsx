import Link from "next/link";

const links = [
  ["Privacy Policy", "/legal/privacy-policy"],
  ["Terms & Conditions", "/legal/terms-and-conditions"],
  ["Refund & Return Policy", "/legal/refund-return-policy"],
  ["Shipping Policy", "/legal/shipping-policy"],
  ["Contact Information", "/legal/contact-information"]
];

export function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-forest text-cream dark:border-cream/10">
      <div className="luxury-container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-4xl font-bold">POZHIVU</h2>
          <p className="mt-4 max-w-sm text-cream/75">Premium handmade donkey milk soaps crafted for slow, skin-kind rituals.</p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Legal</h3>
          <div className="mt-4 grid gap-3 text-sm text-cream/75">{links.map(([label, href]) => <Link key={href} href={href} className="hover:text-gold">{label}</Link>)}</div>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-[0.2em] text-gold">Support</h3>
          <p className="mt-4 text-sm text-cream/75">care@pozhivu.com<br />+91 98765 43210<br />Kochi, Kerala, India</p>
        </div>
      </div>
    </footer>
  );
}
