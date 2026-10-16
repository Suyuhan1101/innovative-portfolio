import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sections } from "@/content/sections";

export const dynamicParams = false;
export function generateStaticParams() { return sections.map(({ id }) => ({ section: id })); }
export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const item = sections.find(({ id }) => id === section);
  return { description: item?.intro };
}
export default async function SectionRoute({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sections.some(({ id }) => id === section)) notFound();
  return null;
}
