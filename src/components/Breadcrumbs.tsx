import { breadcrumbLd } from "@/lib/seo";

import { JsonLd } from "./JsonLd";

/**
 * The page's place in the site, for search engines only (BreadcrumbList). The visible trail was dropped: under the
 * floating header it read as clutter, and the menu already says where a page lives.
 */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[]; dark?: boolean }) {
  return <JsonLd data={breadcrumbLd(items)} />;
}
