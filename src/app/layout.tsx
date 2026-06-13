import type { Metadata } from "next";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://pozhivu.com"),
  title: { default: "POZHIVU | Premium Handmade Donkey Milk Soap", template: "%s | POZHIVU" },
  description: "Luxury handmade donkey milk soaps crafted with natural botanicals, sustainable packaging and skin-kind formulas.",
  openGraph: {
    title: "POZHIVU Premium Donkey Milk Soap",
    description: "Nature's Essence in Every Bar.",
    url: "/",
    siteName: "POZHIVU",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
