"use client";

import { Play } from "lucide-react";
import { Img } from "@/components/Img";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";

type Props = {
  src: string;
  poster: string;
  title: string;
  /** "2:05" style label shown on the poster. */
  duration?: string;
  captions?: string;
  aspect?: "16/9" | "9/16";
  className?: string;
  priority?: boolean;
};

/**
 * Poster first, video on demand: nothing heavier than the poster image loads
 * until the visitor presses play.
 */
export function VideoPlayer({ src, poster, title, duration, captions, aspect = "16/9", className, priority }: Props) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div
      className={cn("frame frame-dark on-dark relative bg-paper", className)}
      style={{ aspectRatio: aspect.replace("/", " / ") }}
    >
      {playing ? (
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-contain"
          aria-label={title}
        >
          {captions && <track kind="captions" src={captions} srcLang="tr" label="Türkçe" default />}
        </video>
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full text-left">
          <Img
            src={poster}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-paper/70 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
            <span className="grid size-14 place-items-center rounded-full bg-brass text-paper transition-transform duration-200 group-hover:scale-105 sm:size-16">
              <Play size={24} fill="currentColor" className="translate-x-0.5" />
            </span>
            <span className="text-ink">
              <span className="block font-bold">{title}</span>
              {duration && <span className="block text-sm text-muted">{duration}</span>}
              {/* The button is named by what it shows, plus what it does. */}
              <span className="sr-only"> oynat</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
