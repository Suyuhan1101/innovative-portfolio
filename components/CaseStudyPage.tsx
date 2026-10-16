"use client";

import Link from "next/link";
import { ArrowLeftIcon, InfoIcon } from "@phosphor-icons/react";
import { type CaseStudyEntry } from "@/content/case-studies";
import styles from "./CaseStudyPage.module.css";

type Props = { entry: CaseStudyEntry; onBack: (element: HTMLElement) => void; children: React.ReactNode };
export default function CaseStudyPage({ entry, onBack, children }: Props) {
  const sectionTitle = { projects: "Projects", community: "Community", hobby: "Hobby" }[entry.section];
  const back = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); onBack(event.currentTarget);
  };
  return <article className={styles.page} data-case-study={entry.id}>
    <Link href={`/${entry.section}`} className={styles.back} data-reveal onClick={back}><ArrowLeftIcon size={21} aria-hidden="true" />Back to {sectionTitle}</Link>
    <header className={styles.banner} data-page-title>
      <h1 tabIndex={-1}>{entry.section === "hobby" ? entry.title : <><span>Case study:</span> {entry.title}</>}</h1><InfoIcon size={25} weight="light" aria-hidden="true" />
    </header>
    <div className={styles.body}>{children}</div>
    <Link href={`/${entry.section}`} className={styles.backBottom} data-reveal onClick={back}><ArrowLeftIcon size={21} aria-hidden="true" />Back to {sectionTitle}</Link>
  </article>;
}
