import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

import { site } from "@/lib/site";

export function CtaBand({
  title = "Ofisinizi bugün Kahya’ya taşıyın",
  body = "Hesabınızı birkaç dakikada açın; sorunuz varsa bize yazın.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-petrol text-white">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="aurora -right-24 -top-24 size-[28rem] bg-brass/25" />
      <div aria-hidden className="aurora -bottom-40 left-10 size-[30rem] bg-sage/30" style={{ animationDelay: "-9s" }} />
      <div className="wrap relative flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-24">
        <div data-reveal className="max-w-2xl">
          <h2 className="title">{title}</h2>
          <p className="lead mt-4 text-white/75">{body}</p>
        </div>
        <div data-reveal style={{ "--d": "120ms" } as CSSProperties} className="flex flex-wrap gap-3">
          <a href={site.app.register} className="btn btn-brass group shadow-[0_10px_40px_-10px_rgb(227_178_97/0.7)]">
            Hemen başla
            <ArrowRight size={18} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href={`mailto:${site.email}?subject=Kahya%20hakk%C4%B1nda`} className="btn btn-line-dark">
            Bize yazın
          </a>
        </div>
      </div>
    </section>
  );
}
