import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

import { HeaderShell } from "./HeaderShell";
import { Logo } from "./Logo";
import { MegaPanel } from "./MegaPanel";
import { MobileMenu } from "./MobileMenu";
import { mainNav } from "./nav";

export function Header() {
  return (
    <HeaderShell>
      <a
        href="#icerik"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-petrol focus:px-3 focus:py-2 focus:text-white"
      >
        İçeriğe geç
      </a>
      <div className="wrap flex h-16 items-center gap-8">
        <Logo />
        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.94rem] font-medium text-ink/75">
            {mainNav.map((item) => (
              <li key={item.href} className={cn("flex h-16 items-center", item.mega && "group")}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 hover:text-ink group-hover:text-ink"
                >
                  {item.label}
                  {item.mega && (
                    <ChevronDown size={14} aria-hidden className="opacity-60 transition group-hover:rotate-180" />
                  )}
                </Link>
                {item.mega && <MegaPanel menu={item.mega} />}
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <a href={site.app.login} className="btn px-3 text-ink/80 hover:text-ink">
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
