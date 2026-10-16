"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { aboutHonors } from "@/content/about-me";
import styles from "./HonorsShowcase.module.css";

const honors = aboutHonors.flatMap((group) => group.entries.map((entry) => ({ ...entry, group: group.id, groupTitle: group.title })));
const positions = honors.map((_, index) => {
  const wideRow = index < 4 ? 0 : index < 7 ? 1 : 2;
  const wideIndex = index - (wideRow === 0 ? 0 : wideRow === 1 ? 4 : 7);
  const narrowRow = Math.floor(index / 3);
  return {
    "--wide-column": wideIndex * 2 + 1 + wideRow % 2,
    "--wide-row": wideRow + 1,
    "--narrow-column": (index % 3) * 2 + 1 + narrowRow % 2,
    "--narrow-row": narrowRow + 1,
  } as CSSProperties;
});

export default function HonorsShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const detailId = useId();
  const active = honors.find((entry) => entry.id === activeId);

  return <section className={styles.showcase} aria-labelledby="about-honors-title" data-honors-showcase>
    <header className={styles.header} data-reveal>
      <div><h2 id="about-honors-title">Honors & awards</h2><p>Hover, focus or tap an award to see more.</p></div>
      <ul className={styles.legend} aria-label="Award categories">{aboutHonors.map((group) => <li key={group.id} data-group={group.id}><i className={styles.mark} aria-hidden="true" />{group.id === "awards" ? "Honors" : group.id === "research-certifications" ? "Research" : "Arts"}</li>)}</ul>
    </header>
    <div className={styles.explorer}>
      <div className={styles.hiveContainer} data-reveal>
        <ul className={styles.honeycomb} role="list" aria-label="Explore all 11 honors, awards and certifications" data-honors-honeycomb>
          {honors.map((entry, index) => <li key={entry.id} className={styles.hexPosition} style={positions[index]}>
            <button ref={(element) => { if (element) buttons.current.set(entry.id, element); else buttons.current.delete(entry.id); }} type="button" className={styles.hexagon} data-honor-node={entry.id} data-group={entry.group} data-current={activeId === entry.id} aria-label={`${entry.title}, ${entry.years}`} aria-pressed={activeId === entry.id} aria-controls={detailId}
              onPointerEnter={(event) => { if (event.pointerType !== "touch") setActiveId(entry.id); }} onFocus={() => setActiveId(entry.id)} onClick={() => setActiveId(entry.id)}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
                if (step) { event.preventDefault(); buttons.current.get(honors[(index + step + honors.length) % honors.length].id)?.focus(); }
              }}>
              <span className={styles.hexFace} aria-hidden="true"><span className={styles.year}>{entry.years}</span><span className={styles.label}><span className={styles.fullLabel}>{entry.label}</span><span className={styles.compactLabel}>{entry.compactLabel ?? entry.label}</span></span><i className={styles.mark} /></span>
            </button>
          </li>)}
        </ul>
      </div>
      <div className={styles.details} data-reveal>
        <div id={detailId} role="status" aria-live="polite" aria-atomic="true">
          <div className={styles.detailContent} key={active?.id ?? "intro"} data-honor-details>
            {active ? <><p className={styles.group}>{active.groupTitle}</p><h3>{active.title}</h3><p className={styles.detailYear} data-group={active.group}><i className={styles.mark} aria-hidden="true" />{active.years}</p>
              {active.description && <p className={styles.note}>{active.description}</p>}
              {active.results && <ul className={styles.results}>{active.results.map((result) => <li key={result.event}><strong>{result.award} — {result.place}</strong><p>{result.event}<span>{result.year}</span></p></li>)}</ul>}
            </> : <><p className={styles.group}>2023 — 2026</p><h3>Choose a milestone.</h3><p className={styles.note}>Explore 11 honors, awards and certifications across academics, research, service and the arts.</p></>}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
