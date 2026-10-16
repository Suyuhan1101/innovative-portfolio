"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeftIcon, CertificateIcon, CodeIcon, GraduationCapIcon, HandHeartIcon, LightbulbIcon, PaintBrushIcon, PianoKeysIcon, RobotIcon } from "@phosphor-icons/react";
import { aboutHonors } from "@/content/about-me";
import styles from "./HonorsShowcase.module.css";

const symbols = { robotics: RobotIcon, academics: GraduationCapIcon, computing: CodeIcon, innovation: LightbulbIcon, service: HandHeartIcon, research: CertificateIcon, piano: PianoKeysIcon, painting: PaintBrushIcon };
const honors = aboutHonors.flatMap((group) => group.entries.map((entry) => ({ ...entry, group: group.id, groupTitle: group.title })));

// Four / three / four on wide screens; alternating two / one on phones.
const positions = honors.map((_, index) => {
  const wideRow = index < 4 ? 0 : index < 7 ? 1 : 2;
  const wideIndex = index - (wideRow === 0 ? 0 : wideRow === 1 ? 4 : 7);
  const narrowGroup = Math.floor(index / 3);
  const narrowIndex = index % 3;
  return {
    "--wide-column": wideIndex * 2 + 1 + wideRow % 2,
    "--wide-row": wideRow + 1,
    "--narrow-column": narrowIndex === 2 ? 2 : narrowIndex * 2 + 1,
    "--narrow-row": narrowGroup * 2 + (narrowIndex === 2 ? 2 : 1),
  } as CSSProperties;
});

export default function HonorsShowcase() {
  const section = useRef<HTMLElement>(null);
  const hive = useRef<HTMLUListElement>(null);
  const details = useRef<HTMLElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const origin = useRef<HTMLButtonElement | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ id: string } | null>(null);
  const preview = honors.find((entry) => entry.id === previewId);
  const selected = honors.find((entry) => entry.id === selection?.id);
  const scrollBehavior = (): ScrollBehavior => section.current?.closest(".portfolio")?.getAttribute("data-motion") === "reduced" ? "auto" : "smooth";

  useEffect(() => {
    const dismissPreview = (event: KeyboardEvent) => { if (event.key === "Escape") setPreviewId(null); };
    document.addEventListener("keydown", dismissPreview);
    return () => document.removeEventListener("keydown", dismissPreview);
  }, []);

  useEffect(() => {
    if (!selection) return;
    const frame = requestAnimationFrame(() => {
      details.current?.focus({ preventScroll: true });
      details.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [selection]);

  return <section ref={section} className={styles.showcase} aria-labelledby="about-honors-title" data-honors-showcase data-reveal>
    <header className={styles.header}>
      <div><p className={styles.period}>2023 — 2026</p><h2 id="about-honors-title">Honors & awards.</h2></div>
      <ul className={styles.legend} aria-label="Award categories">{aboutHonors.map((group) => <li key={group.id} data-group={group.id}><i aria-hidden="true" />{group.id === "awards" ? "Honors" : group.id === "research-certifications" ? "Research" : "Music & arts"}</li>)}</ul>
    </header>
    <p id="honors-help" className={styles.instructions}><span className={styles.mouseHint}>Hover to preview. Choose a hexagon to explore.</span><span className={styles.touchHint}>Tap a hexagon to explore.</span></p>
    <div className={styles.preview} id="honors-preview" data-active={Boolean(preview)}>
      <div><span className={styles.previewLabel}>{preview?.label ?? "A collection of milestones"}</span><span className={styles.previewYear}>{preview?.years ?? "11 stories"}</span></div>
      <p key={preview?.id ?? "intro"}>{preview?.summary ?? "Learning, creating, and giving back — one milestone at a time."}</p>
    </div>
    <div className={styles.hiveContainer}>
      <ul ref={hive} className={styles.honeycomb} role="list" aria-label="Explore all 11 honors, awards and certifications" data-honors-honeycomb>
        {honors.map((entry, index) => {
          const Symbol = symbols[entry.symbol];
          return <li key={entry.id} className={styles.hexPosition} style={positions[index]}>
            <button ref={(element) => { if (element) buttons.current.set(entry.id, element); else buttons.current.delete(entry.id); }} type="button" className={styles.hexagon} data-honor-node={entry.id} data-group={entry.group} data-selected={selected?.id === entry.id} aria-label={`${entry.title}, ${entry.years}`} aria-describedby={previewId === entry.id ? "honors-preview" : "honors-help"} aria-controls="honor-details" aria-expanded={selected?.id === entry.id}
              onPointerEnter={(event) => { if (event.pointerType !== "touch") setPreviewId(entry.id); }}
              onPointerLeave={(event) => { if (document.activeElement !== event.currentTarget) setPreviewId((value) => value === entry.id ? null : value); }}
              onFocus={() => setPreviewId(entry.id)} onBlur={() => setPreviewId((value) => value === entry.id ? null : value)}
              onClick={(event) => { origin.current = event.currentTarget; setPreviewId(null); setSelection({ id: entry.id }); }}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
                if (step) { event.preventDefault(); buttons.current.get(honors[(index + step + honors.length) % honors.length].id)?.focus(); }
              }}>
              <span className={styles.hexFace}><Symbol size={36} weight="light" aria-hidden="true" /><span className={styles.label}>{entry.label}</span><span className={styles.year}>{entry.years}</span></span>
            </button>
          </li>;
        })}
      </ul>
    </div>
    <section ref={details} id="honor-details" className={styles.details} tabIndex={-1} hidden={!selected} aria-labelledby="honor-details-title">
      {selected && <><div className={styles.detailHeading}><p>{selected.groupTitle}<span>{selected.years}</span></p><h3 id="honor-details-title">{selected.title}</h3></div>
        {selected.description && <p className={styles.detailDescription}>{selected.description}</p>}
        {selected.results && <ul className={styles.results}>{selected.results.map((result) => <li key={result.event}><strong>{result.award} — {result.place}</strong><p>{result.event}<span>{result.year}</span></p></li>)}</ul>}
        <button type="button" className={styles.back} onClick={() => { setSelection(null); setPreviewId(null); origin.current?.focus({ preventScroll: true }); hive.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" }); }}><ArrowLeftIcon size={18} aria-hidden="true" />Back to awards</button></>}
    </section>
  </section>;
}
