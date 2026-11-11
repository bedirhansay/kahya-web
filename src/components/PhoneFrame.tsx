import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * An iPhone drawn in CSS around a real 390 × 844 screenshot. Every measure (bezel, corner radius, Dynamic Island,
 * status bar) is a share of the phone's own width (container units), so a 170 px phone beside the laptop and a
 * 260 px one in "Bir ofis günü" keep the same proportions. The screenshot is never stretched: it sits at full width
 * under a status bar, the way the installed app clears the island, and its height follows from its own ratio.
 */
export function PhoneFrame({ time, className, children }: { time: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("phone", className)}>
      <div className="phone-body">
        <div className="phone-screen">
          <div aria-hidden className="phone-status">
            <span className="phone-time">{time}</span>
            <span className="phone-island" />
            <span className="phone-battery" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
