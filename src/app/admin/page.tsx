import { BarChart3, Boxes, Package, ShoppingCart, Tag, Users } from "lucide-react";

const modules = [
  { title: "Analytics", icon: BarChart3, value: "INR 4.8L", text: "Projected monthly revenue" },
  { title: "Orders", icon: ShoppingCart, value: "128", text: "Open and fulfilled orders" },
  { title: "Products", icon: Package, value: "6", text: "Active soap variants" },
  { title: "Coupons", icon: Tag, value: "3", text: "Launch offers" },
  { title: "Inventory", icon: Boxes, value: "842", text: "Bars available" },
  { title: "Customers", icon: Users, value: "2.4K", text: "Registered accounts" }
];

export const metadata = { title: "Admin Dashboard" };

export default function AdminPage() {
  return <section className="py-16"><div className="luxury-container"><p className="text-sm uppercase tracking-[0.28em] text-gold">Admin</p><h1 className="mt-4 font-serif text-6xl font-bold text-forest dark:text-cream">Commerce control room</h1><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{modules.map((item) => <div key={item.title} className="rounded-lg border border-charcoal/10 p-6 dark:border-cream/10"><item.icon className="text-gold" /><div className="mt-6 text-4xl font-bold">{item.value}</div><h2 className="mt-3 font-serif text-3xl font-semibold">{item.title}</h2><p className="mt-2 text-sm text-charcoal/60 dark:text-cream/60">{item.text}</p></div>)}</div></div></section>;
}
