import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
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
      {/* Logo | menu in the true centre | sign-in and start, like a product's own bar. */}
      <div className="wrap pt-2.5">
        <div className="hdr-pill relative grid h-[56px] grid-cols-[1fr_auto] items-center gap-6 rounded-[18px] pl-4 pr-1.5 xl:grid-cols-[1fr_auto_1fr] lg:pl-5">
          <Logo tone="dark" />
          <nav aria-label="Ana menü" className="hidden xl:block">
            <ul className="flex items-center gap-1 text-[0.95rem] font-medium text-ink/70">
              {mainNav.map((item) => (
                <li key={item.href} className={cn("flex h-[56px] items-center", item.mega && "group")}>
                  <Link
                    href={item.href}
                    className="relative inline-flex items-center gap-1 rounded-lg px-3.5 py-2 transition-colors hover:bg-ink/[0.04] hover:text-ink group-hover:text-ink"
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        size={14}
                        aria-hidden
                        className="opacity-60 transition duration-300 group-hover:rotate-180"
                      />
                    )}
                  </Link>
                  {item.mega && <MegaPanel menu={item.mega} />}
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center justify-end gap-2.5">
            <a
              href={site.app.login}
              className="hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-line px-3.5 text-[0.93rem] font-medium text-ink/85 transition-colors hover:border-ink/25 hover:text-ink sm:inline-flex"
            >
              Giriş yap
              <ArrowUpRight size={15} aria-hidden className="opacity-60" />
            </a>
            <a
              href={site.app.register}
              className="btn btn-brass group/cta hidden h-10 min-h-10 gap-1.5 whitespace-nowrap sm:inline-flex"
            >
              Ücretsiz başlayın
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
              />
            </a>
            <MobileMenu />
          </div>
        </div>
      </div>
    </HeaderShell>
  );
}
