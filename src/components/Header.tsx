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
        <Logo />
        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.94rem] font-semibold text-white/80">
            <li className="group relative">
              <Link href="/ozellikler" className="nav-link rounded-md px-3 py-2 hover:text-white">
                Özellikler
              </Link>
              <div className="invisible absolute left-0 top-full translate-y-2 pt-3 opacity-0 transition-[opacity,translate] duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <ul className="grid w-[34rem] grid-cols-2 gap-x-2 rounded-xl border border-white/10 bg-pine-900 p-2 shadow-2xl">
                  {features.map((f) => (
                    <li key={f.slug}>
                      <Link href={`/ozellikler/${f.slug}`} className="block rounded-lg px-3 py-2.5 hover:bg-white/6">
                        <span className="block text-[0.92rem] text-white">{f.name}</span>
                        <span className="block text-[0.8rem] font-medium text-white/55">{f.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link rounded-md px-3 py-2 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a href={site.app.login} className="btn px-3 text-white/85 hover:text-white">
            Giriş yap
          </a>
          <a href={site.app.register} className="btn btn-brass">
            Hemen başla
          </a>
        </div>
        <MobileMenu />
      </div>
    </HeaderShell>
  );
}
