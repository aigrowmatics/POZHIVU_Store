"use client";

import { useState } from "react";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { faqs } from "@/data/content";

export default function SupportPage() {
  const [open, setOpen] = useState(0);
  return <section className="py-16"><div className="luxury-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]"><div><p className="text-sm uppercase tracking-[0.28em] text-gold">Customer support</p><h1 className="mt-4 font-serif text-6xl font-bold text-forest dark:text-cream">Care, tracking and product guidance.</h1><div className="mt-8 grid gap-4 text-charcoal/70 dark:text-cream/70"><p><MessageCircle className="mr-2 inline text-gold" /> WhatsApp: +91 98765 43210</p><p><Mail className="mr-2 inline text-gold" /> care@pozhivu.com</p><p><Phone className="mr-2 inline text-gold" /> +91 98765 43210</p><p><MapPin className="mr-2 inline text-gold" /> Kochi, Kerala, India</p></div><div className="mt-8 rounded-lg bg-beige p-5 dark:bg-cream/10">Live chat placeholder ready for Intercom, Tawk.to or WhatsApp widget.</div></div><div className="grid gap-3">{faqs.map((faq, index) => <div key={faq.q} className="rounded-lg border border-charcoal/10 dark:border-cream/10"><button onClick={() => setOpen(index)} className="flex w-full items-center justify-between p-5 text-left font-semibold"><span>{faq.q}</span><ChevronDown /></button>{open === index && <p className="px-5 pb-5 text-charcoal/65 dark:text-cream/65">{faq.a}</p>}</div>)}</div></div></section>;
}
