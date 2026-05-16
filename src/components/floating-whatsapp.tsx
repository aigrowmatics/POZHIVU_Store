import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const number = process.env.WHATSAPP_NUMBER || "919876543210";
  return (
    <a
      href={`https://wa.me/${number}`}
      aria-label="WhatsApp support"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-forest text-cream shadow-luxury transition hover:scale-105 dark:bg-gold dark:text-charcoal"
    >
      <MessageCircle />
    </a>
  );
}
