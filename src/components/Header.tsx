import Link from "next/link";

import { features } from "@/content/features";
import { site } from "@/lib/site";

import { HeaderShell } from "./HeaderShell";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { mainNav } from "./nav";

export function Header() {
  return (
    <HeaderShell>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-brass focus:px-3 focus:py-2 focus:text-pine-950"
      >
        İçeriğe geç
      </a>
      <div className="wrap flex h-16 items-center gap-8">
        <Logo tone="dark" />
        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.94rem] font-medium text-muted">
            <li className="group relative">
              <Link href="/ozellikler" className="rounded-md px-3 py-2 hover:text-ink">
                Özellikler
              </Link>
              <div className="invisible absolute left-0 top-full pt-2 group-focus-within:visible group-hover:visible">
                <ul className="grid w-[34rem] grid-cols-2 gap-x-2 rounded-lg border border-line bg-white p-2 shadow-lg">
                  {features.map((f) => (
                    <li key={f.slug}>
                      <Link href={`/ozellikler/${f.slug}`} className="block rounded-lg px-3 py-2.5 hover:bg-mist">
                        <span className="block text-[0.92rem] font-semibold text-ink">{f.name}</span>
                        <span className="block text-[0.8rem] text-muted">{f.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-md px-3 py-2 hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a href={site.app.login} className="btn px-3 text-muted hover:text-ink">
            Giriş yap
          </a>
          <a href={site.app.register} className="btn btn-petrol">
            Hemen başla
          </a>
        </div>
        <MobileMenu />
      </div>
    </HeaderShell>
  );
}
