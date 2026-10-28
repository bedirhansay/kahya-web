import { Img } from "@/components/Img";

import { cn } from "@/lib/cn";

/** Real app screenshot with a thin border. Desktop shots are 16:10. */
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
      <div className={cn("ui mx-auto w-full max-w-[19rem] rounded-[2rem] border border-line bg-white p-2", className)}>
        <Img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          sizes="(min-width: 768px) 19rem, 80vw"
          priority={priority}
          className="h-auto w-full rounded-[1.6rem]"
        />
      </div>
    );
  }
  return (
    <figure className={cn("frame", dark && "frame-dark", className)}>
      <Img src={src} alt={alt} width={2000} height={1250} sizes={sizes} priority={priority} className="h-auto w-full" />
    </figure>
  );
}
