import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";
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
          <ul className="flex items-center gap-1 text-[0.94rem] font-medium text-white/75">
            {mainNav.map((item) => (
              <li key={item.href} className="group relative">
                <Link href={item.href} className="inline-flex items-center gap-1 rounded-md px-3 py-2 hover:text-white">
                  {item.label}
                  {item.children && <ChevronDown size={14} aria-hidden className="opacity-60" />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full pt-2 group-focus-within:visible group-hover:visible">
                    <ul
                      className={cn(
                        "grid gap-x-2 rounded-xl border border-line bg-white p-2 shadow-xl",
                        item.children.length > 6 ? "w-[34rem] grid-cols-2" : "w-[22rem]",
                      )}
                    >
                      {item.children.map((c) => (
                        <li key={c.href + c.label}>
                          <Link href={c.href} className="block rounded-lg px-3 py-2.5 hover:bg-mist">
                            <span className="block text-[0.92rem] font-semibold text-ink">{c.label}</span>
                            {c.hint && <span className="block text-[0.8rem] text-muted">{c.hint}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a href={site.app.login} className="btn px-3 text-white/80 hover:text-white">
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
