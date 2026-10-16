"use client";

import { useEffect, useRef, useState } from "react";
import { CertificateIcon, CodeIcon, GraduationCapIcon, HandHeartIcon, LightbulbIcon, PaintBrushIcon, PianoKeysIcon, RobotIcon, SealCheckIcon, TrophyIcon } from "@phosphor-icons/react";
import { aboutHonors, type AboutHonor } from "@/content/about-me";
import styles from "./HonorsShowcase.module.css";

const symbols = {
  robotics: RobotIcon,
  academics: GraduationCapIcon,
  computing: CodeIcon,
  innovation: LightbulbIcon,
  service: HandHeartIcon,
  research: CertificateIcon,
  piano: PianoKeysIcon,
  painting: PaintBrushIcon,
};

function HonorCard({ entry, group }: { entry: AboutHonor; group: string }) {
  const Symbol = symbols[entry.symbol];
  const featured = Boolean(entry.results);
  const art = group === "music-and-arts";
  return <li className={styles.card} data-honor={entry.id} data-group={group} data-featured={featured}>
    <div className={styles.cardTop}>
      <span className={styles.emblem} aria-hidden="true"><Symbol weight="light" size={29} /></span>
      <span className={styles.year}>{entry.years}</span>
    </div>
    {art && <span className={styles.artGrade} aria-hidden="true">{entry.symbol === "piano" ? "08" : "04"}</span>}
    <div className={styles.cardCopy}>
      <h4>{entry.title}</h4>
      {entry.description && <p>{entry.description}</p>}
    </div>
    {entry.results && <ul className={styles.prizes} aria-label="FTC Inspire Award results">
      {entry.results.map((result) => <li key={result.event} className={styles.prize} data-metal={result.metal}>
        <div className={styles.medal} aria-hidden="true"><span>{result.place.slice(0, 3)}<small>place</small></span></div>
        <div className={styles.prizeCopy}><strong>{result.award}</strong><span>{result.place}</span><p>{result.event}<span>{result.year}</span></p></div>
      </li>)}
    </ul>}
    {group === "research-certifications" && <SealCheckIcon className={styles.certificateSeal} weight="light" size={40} aria-hidden="true" />}
    <span className={styles.gleam} aria-hidden="true" />
  </li>;
}

export default function HonorsShowcase() {
  const section = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!section.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.01 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return <section ref={section} className={styles.showcase} data-honors-showcase data-entered={entered} aria-labelledby="about-honors-title" data-reveal>
    <div className={styles.header}>
      <div className={styles.heading}>
        <p className={styles.period}>2023 — 2026</p>
        <h2 id="about-honors-title">Honors & awards.</h2>
        <p className={styles.introduction}>Academic distinctions, research credentials and the arts.</p>
      </div>
      <div className={styles.crest} aria-hidden="true"><span className={styles.crestRing}><TrophyIcon size={61} weight="light" /><span className={styles.crestStar}>✦</span></span></div>
    </div>
    {aboutHonors.map((group) => <div className={styles.group} key={group.id} data-honor-group={group.id}>
      <div className={group.id === "awards" ? "sr-only" : styles.groupHeading}>
        <h3 id={`about-${group.id}`}>{group.title}</h3>
        {group.id !== "awards" && <span aria-hidden="true">✦</span>}
      </div>
      <ul className={styles.cards} data-group={group.id} role="list" aria-labelledby={`about-${group.id}`}>
        {group.entries.map((entry) => <HonorCard key={entry.id} entry={entry} group={group.id} />)}
      </ul>
    </div>)}
    <div className={styles.footerOrnament} aria-hidden="true"><span />✦<span /></div>
  </section>;
}
