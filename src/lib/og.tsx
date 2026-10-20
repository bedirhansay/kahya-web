import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded share card: pine field, the Kahya mark, one headline. */
export async function ogImage({ title, kicker }: { title: string; kicker: string }) {
  const [bold, semi, mark] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/PJS-800.ttf")),
    readFile(join(process.cwd(), "src/assets/PJS-600.ttf")),
    readFile(join(process.cwd(), "public/brand/kahya-mark.svg"), "base64"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(90% 90% at 80% 110%, #14625b 0%, #0a2b28 45%, #061b19 100%)",
          color: "#f8f6ef",
          fontFamily: "Jakarta",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${mark}`} width={64} height={64} alt="" />
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>Kahya</div>
          <div style={{ fontSize: 24, fontWeight: 600, color: "rgba(248,246,239,0.55)", marginTop: 8 }}>by biHesap</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#e3b261" }}>{kicker}</div>
          <div style={{ fontSize: title.length > 48 ? 60 : 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2.5, maxWidth: 1000 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: bold, weight: 800, style: "normal" },
        { name: "Jakarta", data: semi, weight: 600, style: "normal" },
      ],
    },
  );
}
