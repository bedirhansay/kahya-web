import { site } from "@/lib/site";

/**
 * The closing call. `tex` gives it the home hero's pine ground (Paket G pages); the training pages keep the plain
 * band until they are redesigned.
 */
export function CtaBand({
  title = "Ofisinizi Kahya’ya taşıyın",
  body = "Hesabınızı birkaç dakikada açabilirsiniz. Sorunuz varsa bize yazın, biz dönelim.",
  tex = false,
}: {
  title?: string;
  body?: string;
  tex?: boolean;
}) {
  return (
    <section className={tex ? "band-dark pine-tex" : "band-dark"}>
      <div className="wrap flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="title">{title}</h2>
          <p className="lead mt-4 text-ink/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.app.register} className="btn btn-brass">
            Ücretsiz başlayın
          </a>
          <a href="/iletisim" className="btn btn-line-dark">
            Bize yazın
          </a>
        </div>
      </div>
    </section>
  );
}
