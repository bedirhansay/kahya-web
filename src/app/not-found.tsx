import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <section className="bg-paper">
      <div className="wrap py-24 md:py-36">
        <p className="font-semibold text-brand">404</p>
        <h1 className="display mt-4 max-w-2xl">Bu sayfa yok ya da taşındı</h1>
        <p className="lead mt-5 max-w-xl text-muted">Adresi kontrol edin ya da aşağıdan devam edin.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-petrol">
            Ana sayfaya dön
          </Link>
          <Link href="/features" className="btn btn-line">
            Özellikler
          </Link>
        </div>
      </div>
    </section>
  );
}
