import { MessageCircle } from "lucide-react";

import { site } from "@/lib/site";

/** "Bize WhatsApp'tan yazın": a small button at the corner, only once the number is set. */
export function WhatsAppButton() {
  if (!site.whatsapp) return null;
  const text = encodeURIComponent("Merhaba, Kahya hakkında bilgi almak istiyorum.");
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp'tan yazın"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-petrol px-4 font-semibold text-white shadow-[0_18px_40px_-14px_rgb(12_31_28/0.6)] transition-colors hover:bg-petrol-600 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={20} aria-hidden />
      <span className="max-sm:sr-only">WhatsApp</span>
    </a>
  );
}
