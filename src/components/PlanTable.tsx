import { Minus } from "lucide-react";
import Link from "next/link";

import { planNames, planRows, type PlanCell } from "@/content/plans";

function Cell({ v }: { v: PlanCell }) {
  if (v === true) return <span className="text-sm font-medium text-brand">Dahil</span>;
  if (v === false) return <Minus size={16} className="mx-auto text-muted/50" aria-label="Yok" />;
  if (v === "ek") return <span className="text-sm text-muted">Ek hizmet</span>;
  return <span className="font-semibold">{v}</span>;
}

/** The packages side by side; on a phone the table scrolls sideways with its first column held. */
export function PlanTable() {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-frame)] border border-line bg-surface">
      <table className="w-full min-w-[640px] border-collapse text-[0.95rem]">
        <caption className="sr-only">Paketlere göre kullanıcı, alan ve modüller</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="sticky left-0 bg-surface px-4 py-4 text-left font-semibold">
              Paket
            </th>
            {planNames.map((n) => (
              <th key={n} scope="col" className="px-3 py-4 text-center font-display text-[1.05rem] font-bold">
                {n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planRows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="sticky left-0 bg-surface px-4 py-2 text-left font-medium">
                {r.href ? (
                  <Link href={r.href} className="underline decoration-brand/50 underline-offset-4 hover:text-brand">
                    {r.label}
                  </Link>
                ) : (
                  r.label
                )}
                {r.hint && <span className="block text-sm font-normal text-muted">{r.hint}</span>}
              </th>
              {r.cells.map((c, i) => (
                <td key={planNames[i]} className="px-3 py-2 text-center">
                  <Cell v={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
