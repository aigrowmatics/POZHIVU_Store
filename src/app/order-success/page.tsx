import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return <section className="py-24"><div className="luxury-container max-w-2xl text-center"><CheckCircle2 className="mx-auto text-gold" size={64} /><h1 className="mt-6 font-serif text-6xl font-bold text-forest dark:text-cream">Order confirmed</h1><p className="mt-4 text-charcoal/65 dark:text-cream/65">Your POZHIVU order details were sent to pozhivu.support@gmail.com. Our team will contact you with the next steps.</p><Link href="/collection" className="mt-8 inline-block rounded-full bg-forest px-6 py-4 font-semibold text-cream dark:bg-gold dark:text-charcoal">Continue shopping</Link></div></section>;
}
