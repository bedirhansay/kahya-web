import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid-bg bg-pine-950 text-white">
      <div className="wrap py-28 md:py-40">
        <p className="font-bold text-brass">404</p>
        <h1 className="title mt-4 max-w-2xl">Bu sayfa yok ya da taşındı</h1>
        <p className="lead mt-5 max-w-xl text-white/70">Adresi kontrol edin ya da aşağıdan devam edin.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-brass">
            Ana sayfaya dön
          </Link>
          <Link href="/ozellikler" className="btn btn-line-dark">
            Özellikler
          </Link>
        </div>
      </div>
    </section>
  );
}
