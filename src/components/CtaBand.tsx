import { site } from "@/lib/site";

export function CtaBand({
  title = "Ofisinizi Kahya’ya taşıyın",
  body = "Hesabınızı birkaç dakikada açabilirsiniz. Sorunuz varsa bize yazın, biz dönelim.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-petrol text-white">
      <div className="wrap flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-2xl">
          <h2 className="title">{title}</h2>
          <p className="lead mt-4 text-white/80">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={site.app.register} className="btn btn-brass">
            Hemen başla
          </a>
          <a href={`mailto:${site.email}?subject=Kahya%20hakk%C4%B1nda`} className="btn btn-line-dark">
            Bize yazın
          </a>
        </div>
      </div>
    </section>
  );
}
