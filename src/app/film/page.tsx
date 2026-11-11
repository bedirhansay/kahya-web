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
  path: "/film",
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
            pagePath: "/film",
            transcript: cues.map((c) => c.text).join(" "),
          }),
          videoLd({
            name: "Kahya reklam filmi",
            description: "Kahya’yı yarım dakikada anlatan reklam filmi.",
            seconds: 36,
            contentUrl: "/media/film/kahya-reklam.mp4",
            thumbnailUrl: "/media/film/kahya-reklam.webp",
            pagePath: "/film",
            transcript: filmTranscripts.reklam.map((c) => c.text).join(" "),
          }),
        ]}
      />
      <PageHero
        crumbs={[{ name: "Tanıtım filmi", path: "/film" }]}
        title="Kahya, iki dakikada"
        lead="Bir ofisin günü, baştan sona. Görüntüler uygulamanın kendisi, firma ve kişiler örnek veridir."
      />
      <section aria-label="Tanıtım filmi" className="bg-surface">
        <div className="wrap py-10 md:py-14">
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
      <section aria-labelledby="kisa" className="bg-mist">
        <div className="wrap grid gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="kisa" className="title">
              Yarım dakikalık sürüm
            </h2>
            <p className="mt-3 text-muted">Acelesi olanlar için. Dikey sürümü telefonda daha rahat izlenir.</p>
            <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-4">
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
                className="w-24 sm:w-32"
              />
            </div>
          </div>
          <div>
            <h2 id="metin" className="title">
              Film metni
            </h2>
            <p className="mt-3 text-muted">
              Seslendirme yapay zekâ ile üretilmiştir. Filmdeki her ekranın nasıl kullanıldığını{" "}
              <Link href="/training" className="link">
                eğitim videolarında
              </Link>{" "}
              bulabilirsiniz.
            </p>
            <details className="group mt-6 border-t border-line">
              <summary className="flex min-h-11 cursor-pointer items-center py-3 font-semibold">
                Metnin tamamını okuyun
              </summary>
              <ol className="space-y-3 pb-2">
                {cues.map((c) => (
                  <li key={c.t + c.text} className="grid grid-cols-[3.5rem_1fr] gap-4 leading-relaxed">
                    <time className="pt-0.5 text-sm font-bold text-muted tabular-nums">{clock(c.t)}</time>
                    <p>{c.text}</p>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </div>
      </section>
      <CtaBand
        tex
        title="Filmde gördüğünüzü kendi ofisinizde açın"
        body="Hesabınızı birkaç dakikada açarsınız. Verilerinizi taşımak isterseniz bize yazın."
      />
    </>
  );
}
