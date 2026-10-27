import { features } from "@/content/features";
import { sectors } from "@/content/sectors";
import { solutions } from "@/content/solutions";

export type NavGroup = {
  href: string;
  label: string;
  children?: { href: string; label: string; hint?: string }[];
};

export const mainNav: NavGroup[] = [
  {
    href: "/cozumler",
    label: "Çözümler",
    children: [
      ...solutions.map((s) => ({ href: `/cozumler/${s.slug}`, label: s.name, hint: s.summary })),
      { href: "/cozumler", label: "Çözümler, ek hizmetler ve hizmetler" },
    ],
  },
  {
    href: "/sektorler",
    label: "Sektörler",
    children: sectors.map((s) => ({ href: `/sektorler/${s.slug}`, label: s.name })),
  },
  {
    href: "/ozellikler",
    label: "Özellikler",
    children: features.map((f) => ({ href: `/ozellikler/${f.slug}`, label: f.name, hint: f.summary })),
  },
  { href: "/egitim", label: "Eğitim" },
  { href: "/sss", label: "Sık sorulanlar" },
];
