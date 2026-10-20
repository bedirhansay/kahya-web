import { Img } from "@/components/Img";

import { cn } from "@/lib/cn";

/** Real app screenshot in a minimal window frame. Desktop shots are 16:10. */
export function Frame({
  src,
  alt,
  phone,
  dark,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: {
  src: string;
  alt: string;
  phone?: boolean;
  dark?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (phone) {
    return (
      <div className={cn("mx-auto w-full max-w-[19rem] rounded-[2.4rem] bg-ink p-2.5 shadow-2xl", className)}>
        <Img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          sizes="(min-width: 768px) 19rem, 80vw"
          priority={priority}
          className="h-auto w-full rounded-[1.9rem]"
        />
      </div>
    );
  }
  return (
    <figure className={cn("frame", dark && "frame-dark", className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-mist px-3" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
        <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
        <span className="size-2.5 rounded-full bg-[#e5e9e7]" />
      </div>
      <Img src={src} alt={alt} width={2000} height={1250} sizes={sizes} priority={priority} className="h-auto w-full" />
    </figure>
  );
}
