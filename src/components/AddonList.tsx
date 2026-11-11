import Image from "next/image";
import Link from "next/link";

import { addons } from "@/content/addons";
import { extras } from "@/content/solutions";

const quote = (what: string) =>
  `/contact?konu=fiyat&cozum=${encodeURIComponent(what)}`;

/** Every add-on the app sells, in one ruled list: the screen where there is one, what it holds, which package, how to ask. */
export function AddonList({ className }: { className?: string }) {
  return (
    <ul
      className={`grid gap-x-10 border-t border-line md:grid-cols-2 ${className ?? ""}`}
    >
      {extras.map((e) => {
        const a = addons.find((x) => x.name === e.name);
        return (
          <li
            key={e.name}
            className={
              a?.screen
                ? "grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-5 border-b border-line py-6 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]"
                : "border-b border-line py-6"
            }
          >
            {a?.screen && (
              <Link
                href={`/solutions/${a.slug}`}
                className="block self-start overflow-hidden rounded-[10px] border border-line bg-surface"
                tabIndex={-1}
                aria-hidden
              >
                <Image
                  src={a.screen.src}
                  alt=""
                  width={a.screen.width}
                  height={a.screen.height}
                  sizes="12rem"
                  className="aspect-[16/10] h-auto w-full object-cover object-left-top"
                />
              </Link>
            )}
            <div className="min-w-0">
              <h3 className="text-lg font-bold">
                {a ? (
                  <Link
                    href={`/solutions/${a.slug}`}
                    className="hover:text-brand"
                  >
                    {e.name}
                  </Link>
                ) : (
                  e.name
                )}
              </h3>
              <p className="mt-1 leading-relaxed text-muted">{e.body}</p>
              <p className="mt-2 text-[0.95rem]">
                <span className="font-semibold">Hangi pakette:</span>{" "}
                <span className="text-muted">{e.plan}</span>
              </p>
              <a
                href={quote(e.name)}
                className="link inline-flex min-h-11 items-center"
              >
                {e.name} için talep edin
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
