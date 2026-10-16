"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretDoubleRightIcon, CodeIcon, PuzzlePieceIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { caseStudyHref, type CaseStudyEntry, type CaseStudySection } from "@/content/case-studies";
import styles from "./CaseStudyGallery.module.css";

type Props = {
  id: string;
  title: string;
  kind: CaseStudySection;
  items: CaseStudyEntry[];
  actionLabel?: string;
  onOpen: (entry: CaseStudyEntry, element: HTMLElement) => void;
};

const icons = { projects: CodeIcon, community: UsersThreeIcon, hobby: PuzzlePieceIcon };

export default function CaseStudyGallery({ id, title, kind, items, actionLabel = "See case study", onOpen }: Props) {
  const Icon = icons[kind];
  return <section className={styles.browser} aria-labelledby={`${id}-heading`}>
    <header className={styles.banner} data-reveal>
      <h2 id={`${id}-heading`}>{title}</h2><Icon size={28} weight="bold" aria-hidden="true" />
    </header>
    <div className={styles.grid}>
      {items.map((item, index) => <Link key={item.id} href={caseStudyHref(item)} className={styles.card} data-featured={index === 0} data-case-card={item.id} data-reveal aria-label={`${actionLabel}: ${item.title}`} onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); onOpen(item, event.currentTarget);
      }}>
        <Image className={styles.cardImage} src={item.image.src} alt={item.image.alt} fill unoptimized sizes="(max-width: 700px) 90vw, 45vw" style={{ objectFit: item.image.fit ?? "cover", objectPosition: item.image.position }} />
        <span className={styles.wash} aria-hidden="true" />
        <span className={styles.cardCopy}><span className={styles.cardTitle}>{item.title}</span><span className={styles.action}>{actionLabel}<CaretDoubleRightIcon size={18} weight="bold" aria-hidden="true" /></span></span>
      </Link>)}
    </div>
  </section>;
}
