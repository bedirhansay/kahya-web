import { site } from "@/lib/site";

export function CtaBand({
  title = "Ofisinizi bugün Kahya’ya taşıyın.",
  body = "Ücretsiz planla hemen başlayın. Ücretli planlar 30 gün ücretsiz denenir.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-petrol text-white">
      <div className="wrap flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="title">{title}</h2>
          <p className="lead mt-4 text-white/75">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.app.register} className="btn btn-brass">
            Ücretsiz başla
          </a>
          <a href={`mailto:${site.email}?subject=Kahya%20hakk%C4%B1nda`} className="btn btn-line-dark">
            Bize yazın
          </a>
        </div>
      </div>
    </section>
  );
}
