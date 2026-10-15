import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/case-studies";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((entry) => ({ section: entry.section, caseStudy: entry.slug }));
}
type Props = { params: Promise<{ section: string; caseStudy: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, caseStudy } = await params;
  const entry = caseStudies.find((item) => item.section === section && item.slug === caseStudy);
  return { title: entry?.title ?? "Page not found", description: entry?.description };
}
export default async function CaseStudyRoute({ params }: Props) {
  const { section, caseStudy } = await params;
  if (!caseStudies.some((entry) => entry.section === section && entry.slug === caseStudy)) notFound();
  return null;
}
