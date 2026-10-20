import Image, { type ImageProps } from "next/image";

import blur from "@/content/generated/blur.json";

const previews: Record<string, string> = blur;

/** Blurred preview of a local still (built by `pnpm media`), if there is one. */
export const blurOf = (src: string): string | undefined => previews[src];

/**
 * next/image with the still's own blurred preview as placeholder, so a slow
 * image shows its colours and layout instead of an empty box.
 */
export function Img({ alt, ...props }: ImageProps & { src: string }) {
  const preview = blurOf(props.src);
  return <Image alt={alt} {...props} {...(preview && { placeholder: "blur", blurDataURL: preview })} />;
}
