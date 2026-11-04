import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

export function Logo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Link href="/" aria-label="Kahya ana sayfa" className={cn("inline-flex min-h-11 items-center", className)}>
      <Image
        src={tone === "light" ? "/brand/kahya-lockup.svg" : "/brand/kahya-lockup-light.svg"}
        alt="Kahya"
        width={120}
        height={40}
        priority
        unoptimized
        className="h-8 w-auto"
      />
    </Link>
  );
}
