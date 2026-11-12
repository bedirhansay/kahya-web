import { NextResponse, type NextRequest } from "next/server";

import { addons } from "@/content/addons";
import { features } from "@/content/features";
import { guides } from "@/content/guides";
import { sectors } from "@/content/sectors";
import { solutions } from "@/content/solutions";
import { tutorials } from "@/content/tutorials";

/**
 * Every slug under these sections is known at build time. With `cacheComponents` on, a page cannot opt out of
 * unknown params (`dynamicParams` is refused), so an unknown slug would stream a 200 shell and only then hit
 * `notFound()`: crawlers record a soft 404 on the first visit. Answering here, before rendering, keeps the
 * not-found screen and gives the real 404 status.
 */
const known: Record<string, Set<string>> = {
  solutions: new Set([...solutions, ...addons].map((s) => s.slug)),
  features: new Set(features.map((f) => f.slug)),
  sectors: new Set(sectors.map((s) => s.slug)),
  guides: new Set(guides.map((g) => g.slug)),
  training: new Set(tutorials.map((t) => t.slug)),
};

export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const slugs = known[section];
  if (slugs && slug && rest.length === 0 && !slugs.has(decodeURIComponent(slug))) {
    // A path no route owns: Next serves the prerendered not-found page with status 404.
    const url = request.nextUrl.clone();
    url.pathname = "/_kahya/not-found";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/solutions/:slug", "/features/:slug", "/sectors/:slug", "/guides/:slug", "/training/:slug"],
};
