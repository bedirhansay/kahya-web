import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Next 16 keeps a Turbopack build cache in .next/cache; Coolify's railpack keeps that folder between deploys.
    // On 2026-11-11 a deploy reused a stale stylesheet from it (new markup, old CSS), so production builds compile
    // from scratch. A full build takes a few seconds; the cache bought nothing.
    turbopackFileSystemCacheForBuild: false,
  },
  poweredByHeader: false,
  images: {
    // WebP only: AVIF encoding took seconds per image on first request, and
    // the sources are already WebP.
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // CRM is a solution, not a feature page; its old feature address lands on the solution.
    return [{ source: "/ozellikler/crm", destination: "/cozumler/crm", permanent: true }];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Always re-fetched, so the old app's worker is replaced on the next visit.
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache, no-store, must-revalidate" }] },
      {
        // Media is rebuilt by `pnpm media` with the same names; a week keeps
        // re-renders reachable without a cache-busting step.
        source: "/(media|screens|brand)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
