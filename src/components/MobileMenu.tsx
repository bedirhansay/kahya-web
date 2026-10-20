"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { site } from "@/lib/site";

import { mainNav } from "./nav";

export function MobileMenu() {
  const pathname = usePathname();
  // Remember the page the menu was opened on: navigating away closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenOn((typeof next === "function" ? next(open) : next) ? pathname : null);

  // Lock page scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="ml-auto lg:hidden sm:ml-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobil-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="grid size-11 place-items-center rounded-lg text-white hover:bg-white/8"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      {open && (
        <div id="mobil-menu" className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-pine-950 px-5 pb-10 pt-4">
          <nav aria-label="Mobil menü">
            <ul className="divide-y divide-white/8 text-lg font-bold">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block py-4 text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tanitim-filmi" className="block py-4 text-white">
                  Tanıtım filmi
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
            <a href={site.app.register} className="btn btn-brass w-full">
              Hemen başla
            </a>
            <a href={site.app.login} className="btn btn-line-dark w-full">
              Giriş yap
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
