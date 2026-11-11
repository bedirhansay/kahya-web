import { Boxes, CalendarClock, CalendarDays, FileSpreadsheet, FileText, Mail, Truck, Wallet, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { ProblemsMore } from "./ProblemsMore";

type Problem = { icon: LucideIcon; said: string; answer: string; href: string; link: string };

/**
 * Eight everyday office problems, each in the customer's words, each answered by a live Kahya feature.
 * Every answer is a sentence that already stands on a feature page; nothing here is promised ahead.
 */
const problems: Problem[] = [
  {
    icon: Wallet,
    said: "Kim ne borçlu, bilmiyorum.",
    answer: "Her carinin bakiyesi, geciken ödemesi ve sonraki vadesi kendi kartında. Vadesi geçen ana sayfanıza düşer.",
    href: "/features/accounts",
    link: "Cari ve tahsilat",
  },
  {
    icon: FileSpreadsheet,
    said: "Ekstre için her ay Excel’de uğraşıyorum.",
    answer: "Hesap ekstresini müşterinize linkle gönderirsiniz. PDF ya da Excel olarak da alırsınız.",
    href: "/features/accounts",
    link: "Linkle ekstre",
  },
  {
    icon: CalendarDays,
    said: "Puantaj hâlâ kâğıtta.",
    answer: "Günlük puantaj, yevmiye ve aylık hakediş personelin kartında. İzin telefondan istenir, onaylanınca puantaja işlenir.",
    href: "/features/staff-and-leave",
    link: "Personel ve puantaj",
  },
  {
    icon: FileText,
    said: "Teklifi Word’de yazıp PDF yolluyorum.",
    answer: "Teklifi kendi antetinizle hazırlayıp linkle gönderirsiniz. Müşteri linkten kabul eder, teklif satışa döner.",
    href: "/solutions/quotes",
    link: "Teklif",
  },
  {
    icon: Boxes,
    said: "Stok sayımı kafadan yapılıyor.",
    answer: "Ürünler ve depolar tek listede. Kritik seviyeye ineni Kahya işaretler, satışta seçilen ürün stoktan düşer.",
    href: "/solutions/inventory",
    link: "Stok ve depolar",
  },
  {
    icon: Truck,
    said: "Araç masrafları dağınık.",
    answer: "Araçlar, seferler ve her aracın geliri ile gideri tek yerde.",
    href: "/solutions/fleet",
    link: "Filo",
  },
  {
    icon: Mail,
    said: "E-postayla gelen iş unutuluyor.",
    answer: "İş isteyen e-postayı göreve çevirirsiniz: sorumlusu, projesi ve bitiş tarihiyle. E-posta ile görev bağlı kalır.",
    href: "/features/email",
    link: "E-postadan göreve",
  },
  {
    icon: CalendarClock,
    said: "Müşteri aranacaktı, unutuldu.",
    answer: "Görüşmeye takip günü yazarsınız. O gün geldiğinde görüşme ana sayfanızda önünüze çıkar.",
    href: "/solutions/crm",
    link: "Müşteri takibi",
  },
];

function Row({ p: { icon: Icon, said, answer, href, link }, first }: { p: Problem; first?: boolean }) {
  return (
    <li className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 border-b border-line py-6">
      <Icon aria-hidden size={22} strokeWidth={1.7} className="mt-1 text-brand" />
      <div className="min-w-0">
        <p className="font-display text-[1.15rem] font-bold leading-snug tracking-[-0.01em]">“{said}”</p>
        <p className="mt-2 leading-relaxed text-muted">{answer}</p>
        <Link href={href} data-first-more={first || undefined} className="link mt-2 inline-flex min-h-11 items-center gap-1.5">
          {link}
        </Link>
      </div>
    </li>
  );
}

/**
 * "Hangi sorunları çözer": two columns of problem → answer rows, ruled like a ledger. On a phone the last four
 * fold behind "Tümünü gör" (see ProblemsMore); from 640px, and without JavaScript, all eight stand open.
 */
export function Problems() {
  return (
    <section aria-labelledby="sorunlar" className="bg-surface">
      <div className="wrap py-16 md:py-24">
        <div className="max-w-2xl">
          <h2 id="sorunlar" className="title">
            Hangi sorunları çözer
          </h2>
          <p className="lead mt-4 text-muted">Ofislerden en sık duyduğumuz sekiz cümle ve Kahya’daki karşılıkları.</p>
        </div>
        <ul className="mt-10 grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {problems.slice(0, 4).map((p) => (
            <Row key={p.said} p={p} />
          ))}
        </ul>
        <ProblemsMore>
          {problems.slice(4).map((p, i) => (
            <Row key={p.said} p={p} first={i === 0} />
          ))}
        </ProblemsMore>
      </div>
    </section>
  );
}
