import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { VideoPlayer } from "@/components/VideoPlayer";
import { clock, filmTranscripts } from "@/content/tutorials";
import { pageMetadata, videoLd } from "@/lib/seo";

const description =
  "Kahya’nın tanıtım filmi: bir ofisin günü Ana Sayfa’dan e-postaya, görevlerden cari bakiyelere, izinlerden Kahya AI’a kadar iki dakikada.";

export const metadata: Metadata = pageMetadata({
  path: "/tanitim-filmi",
  title: "Tanıtım filmi",
  description,
  type: "video.other",
  image: { url: "/media/film/kahya-tanitim.webp", width: 1280, height: 720, alt: "Kahya tanıtım filmi" },
});

export default function FilmPage() {
  const cues = filmTranscripts.tanitim;
  return (
    <>
      <JsonLd
        data={[
          videoLd({
            name: "Kahya tanıtım filmi",
            description,
            seconds: 131,
            contentUrl: "/media/film/kahya-tanitim.mp4",
            thumbnailUrl: "/media/film/kahya-tanitim.webp",
            pagePath: "/tanitim-filmi",
            transcript: cues.map((c) => c.text).join(" "),
          }),
          videoLd({
            name: "Kahya reklam filmi",
            description: "Kahya’yı yarım dakikada anlatan reklam filmi.",
            seconds: 36,
            contentUrl: "/media/film/kahya-reklam.mp4",
            thumbnailUrl: "/media/film/kahya-reklam.webp",
            pagePath: "/tanitim-filmi",
            transcript: filmTranscripts.reklam.map((c) => c.text).join(" "),
          }),
        ]}
      />
      <PageHero
        crumbs={[{ name: "Tanıtım filmi", path: "/tanitim-filmi" }]}
        title="Kahya, iki dakikada"
        lead="Bir ofisin günü, baştan sona. Görüntüler uygulamanın kendisi, firma ve kişiler örnek veridir."
      />
      <section className="bg-paper pb-16 pt-10 md:pb-24">
        <div className="wrap">
          <VideoPlayer
            src="/media/film/kahya-tanitim.mp4"
            poster="/media/film/kahya-tanitim.webp"
            captions="/media/film/kahya-tanitim.vtt"
            title="Kahya tanıtım filmi"
            duration={clock(131)}
            priority
          />
        </div>
      </section>
      <section aria-labelledby="metin" className="bg-paper">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
          <div>
            <h2 id="metin" className="title">
              Film metni
            </h2>
            <p className="mt-4 max-w-xs text-[0.95rem] text-muted">
              Seslendirme yapay zekâ ile üretilmiştir. Filmdeki her ekranın nasıl kullanıldığını{" "}
              <Link href="/egitim" className="link">
                eğitim videolarında
              </Link>{" "}
              bulabilirsiniz.
            </p>
          </div>
          <ol className="max-w-2xl space-y-4">
            {cues.map((c) => (
              <li key={c.t + c.text} className="grid grid-cols-[3.5rem_1fr] gap-4 leading-relaxed">
                <time className="pt-0.5 text-sm font-bold text-muted tabular-nums">{clock(c.t)}</time>
                <p className="text-lg">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="kisa" className="border-t border-line bg-mist">
        <div className="wrap grid gap-10 py-16 md:py-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center">
          <div>
            <h2 id="kisa" className="title">
              Yarım dakikalık sürüm
            </h2>
            <p className="lead mt-4 text-muted">Acelesi olanlar için. Dikey sürümü telefonda daha rahat izlenir.</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-end gap-4 md:gap-6">
            <VideoPlayer
              src="/media/film/kahya-reklam.mp4"
              poster="/media/film/kahya-reklam.webp"
              captions="/media/film/kahya-reklam.vtt"
              title="Reklam filmi"
              duration="0:36"
            />
            <VideoPlayer
              src="/media/film/kahya-reklam-dikey.mp4"
              poster="/media/film/kahya-reklam-dikey.webp"
              captions="/media/film/kahya-reklam-dikey.vtt"
              title="Dikey"
              aspect="9/16"
              className="w-28 sm:w-40"
            />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
