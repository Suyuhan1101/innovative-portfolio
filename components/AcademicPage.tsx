"use client";

import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { academic } from "@/content/academic";
import { slides } from "@/content/media";
import { pageHref, type PageId } from "@/content/sections";
import CourseHoneycomb from "./CourseHoneycomb";
import RevealText from "./RevealText";
import styles from "./AcademicPage.module.css";

type Props = {
  onNavigate: (page: PageId, element: HTMLElement) => void;
  onHome: (element: HTMLElement) => void;
  onPhoto: (index: number) => void;
};

export default function AcademicPage({ onNavigate, onHome, onPhoto }: Props) {
  const poster = slides[4];
  return <div className={styles.content}>
    <div className={styles.introduction}><RevealText text={academic.introduction} /></div>
    <div className={styles.learningGrid}>
      <section className={styles.mathematics} aria-labelledby="mathematics-heading">
        <h2 id="mathematics-heading" data-reveal>Mathematics & computing</h2>
        <RevealText text={academic.mathematics} />
        <div className={styles.studyRecords}>
          <div className={styles.studyRecord} data-reveal><h3>Calculus III</h3><p>Johns Hopkins University</p><dl><div><dt>Grade</dt><dd>A+</dd></div><div><dt>Credits</dt><dd>4.0</dd></div></dl><p className={styles.recordDate}>Completed December 2025</p></div>
          <div className={styles.independentStudy} data-reveal><h3>AP Calculus BC</h3><p>Completed through self-study</p></div>
        </div>
      </section>
      <section className={styles.learningStory} aria-labelledby="learning-heading"><h2 id="learning-heading" data-reveal>How I learn</h2>{academic.learning.map((text) => <RevealText text={text} key={text} />)}</section>
    </div>
    <section className={styles.research} aria-labelledby="research-heading">
      <div className={styles.researchCopy}>
        <h2 id="research-heading" data-reveal>Research in practice</h2>
        <h3 className={styles.researchTitle} data-reveal>{academic.research.title}</h3>
        <div className={styles.researchContext} data-reveal><p>{academic.research.institution}</p><p>{academic.research.dates}</p><p>Researcher · Mentored by {academic.research.mentor}</p></div>
        {academic.research.paragraphs.map((text) => <RevealText text={text} key={text} />)}
        <div className={styles.researchLinks} data-reveal>
          <a className="text-link" href={pageHref("projects")} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onNavigate("projects", event.currentTarget); }}>Explore the project<ArrowRightIcon size={20} weight="light" /></a>
        </div>
      </div>
      <figure className={styles.poster} data-reveal><button type="button" aria-label="Open ARDS research poster" onClick={() => onPhoto(4)}><Image src={poster.src} alt={poster.alt} width={poster.width} height={poster.height} sizes="(max-width: 900px) 90vw, 360px" /></button><figcaption>My research poster<button type="button" onClick={() => onPhoto(4)}>View full size<ArrowUpRightIcon size={17} /></button></figcaption></figure>
    </section>
    <CourseHoneycomb />
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onHome(event.currentTarget); }}>Back to my world<ArrowRightIcon size={23} weight="light" /></a>
  </div>;
}
