import type { Sector } from "@/content/sectors";

import { MeetingsMock, PaymentPlanMock, StockMock, TaskSummaryMock } from "./screens";

export function SectorMock({ kind, className }: { kind: Sector["mock"]; className?: string }) {
  if (kind === "meetings") return <MeetingsMock className={className} />;
  if (kind === "plan") return <PaymentPlanMock className={className} />;
  if (kind === "stock") return <StockMock className={className} />;
  return <TaskSummaryMock className={className} />;
}
