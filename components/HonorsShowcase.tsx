"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeftIcon, CertificateIcon, CodeIcon, GraduationCapIcon, HandHeartIcon, LightbulbIcon, PaintBrushIcon, PianoKeysIcon, RobotIcon, TrophyIcon } from "@phosphor-icons/react";
import { aboutHonors } from "@/content/about-me";
import styles from "./HonorsShowcase.module.css";

const symbols = { robotics: RobotIcon, academics: GraduationCapIcon, computing: CodeIcon, innovation: LightbulbIcon, service: HandHeartIcon, research: CertificateIcon, piano: PianoKeysIcon, painting: PaintBrushIcon };
const honors = aboutHonors.flatMap((group) => group.entries.map((entry) => ({ ...entry, group: group.id, groupTitle: group.title })));
const positions = honors.map((_, index) => {
  const angle = index / honors.length * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + 41 * Math.cos(angle), y: 50 + 37 * Math.sin(angle), mx: index % 2 ? 84 : 16, my: (index % 2 ? 15.25 : 7) + Math.floor(index / 2) * 16.5 };
});
type DragSession = { id: string; pointer: number; button: HTMLButtonElement; startX: number; startY: number; offsetX: number; offsetY: number; moving: boolean };
type DragPosition = { id: string; x: number; y: number; over: boolean };

export default function HonorsShowcase() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const trophy = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLElement>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const session = useRef<DragSession | null>(null);
  const clickAfterDrag = useRef(0);
  const origin = useRef<HTMLButtonElement | null>(null);
  const [drag, setDrag] = useState<DragPosition | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selection, setSelection] = useState<{ id: string } | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const selected = honors.find((entry) => entry.id === selection?.id);

  const scrollBehavior = (): ScrollBehavior => section.current?.closest(".portfolio")?.getAttribute("data-motion") === "reduced" ? "auto" : "smooth";
  const cancelDrag = () => {
    const current = session.current;
    session.current = null;
    if (current?.button.hasPointerCapture(current.pointer)) current.button.releasePointerCapture(current.pointer);
    if (current?.moving) clickAfterDrag.current = performance.now() + 400;
    setDrag(null);
  };

  useEffect(() => {
    const cancel = (event: KeyboardEvent) => { if (event.key === "Escape") { setPreview(null); if (session.current) { event.preventDefault(); cancelDrag(); setAnnouncement("Drag cancelled. The award returned to its place."); } } };
    document.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("keydown", cancel);
      const current = session.current;
      session.current = null;
      if (current?.button.hasPointerCapture(current.pointer)) current.button.releasePointerCapture(current.pointer);
    };
  }, []);

  useEffect(() => {
    if (!selection) return;
    const frame = requestAnimationFrame(() => {
      details.current?.focus({ preventScroll: true });
      details.current?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [selection]);

  const openAward = (id: string, button: HTMLButtonElement) => {
    origin.current = button;
    setPreview(null);
    setSelection({ id });
    setAnnouncement("Award selected. Details are shown below the trophy.");
  };

  const locate = (event: ReactPointerEvent<HTMLButtonElement>, current: DragSession): DragPosition | null => {
    if (!stage.current || !trophy.current) return null;
    const board = stage.current.getBoundingClientRect();
    const target = trophy.current.getBoundingClientRect();
    const x = event.clientX - current.offsetX;
    const y = event.clientY - current.offsetY;
    const dx = (x - target.left - target.width / 2) / (target.width / 2 + 8);
    const dy = (y - target.top - target.height / 2) / (target.height / 2 + 8);
    return { id: current.id, x: (x - board.left) / board.width * 100, y: (y - board.top) / board.height * 100, over: dx * dx + dy * dy <= 1 };
  };

  const startDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    if (!event.isPrimary || event.button !== 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    session.current = { id, pointer: event.pointerId, button: event.currentTarget, startX: event.clientX, startY: event.clientY, offsetX: event.clientX - rect.left - rect.width / 2, offsetY: event.clientY - rect.top - rect.height / 2, moving: false };
    setPreview(null);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = session.current;
    if (!current || current.pointer !== event.pointerId) return;
    if (!current.moving && Math.hypot(event.clientX - current.startX, event.clientY - current.startY) < 6) return;
    current.moving = true;
    setPreview(null);
    setDrag(locate(event, current));
  };
  const endDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = session.current;
    if (!current || current.pointer !== event.pointerId) return;
    const point = locate(event, current);
    session.current = null;
    if (current.button.hasPointerCapture(current.pointer)) current.button.releasePointerCapture(current.pointer);
    setDrag(null);
    if (!current.moving) return;
    clickAfterDrag.current = performance.now() + 400;
    if (point?.over) openAward(current.id, current.button);
    else setAnnouncement("The award returned to its place. Release it over the trophy to open its details.");
  };

  const renderConnections = (mobile: boolean) => honors.map((entry, index) => {
    const point = positions[index];
    const moving = drag?.id === entry.id ? drag : null;
    return <line key={entry.id} x1="50" y1="50" x2={moving?.x ?? (mobile ? point.mx : point.x)} y2={moving?.y ?? (mobile ? point.my : point.y)} data-group={entry.group} data-active={preview === entry.id || selected?.id === entry.id || Boolean(moving)} vectorEffect="non-scaling-stroke" />;
  });

  return <section ref={section} className={styles.showcase} aria-labelledby="about-honors-title" data-honors-showcase data-reveal>
    <header className={styles.header}>
      <div><p className={styles.period}>2023 — 2026</p><h2 id="about-honors-title">Honors & awards.</h2></div>
      <ul className={styles.legend} aria-label="Award categories">{aboutHonors.map((group) => <li key={group.id} data-group={group.id}><i aria-hidden="true" />{group.id === "awards" ? "Honors" : group.id === "research-certifications" ? "Research" : "Music & arts"}</li>)}</ul>
    </header>
    <p id="honors-help" className={styles.instructions}><span className={styles.mouseHint}>Hover to preview. Drag a symbol into the trophy, or click it to explore.</span><span className={styles.touchHint}>Tap a symbol, or drag it into the trophy, to explore.</span></p>
    <div ref={stage} className={styles.stage} data-award-stage data-dragging={Boolean(drag)}>
      <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <g className={styles.desktopLines}><ellipse cx="50" cy="50" rx="41" ry="37" className={styles.orbit} />{renderConnections(false)}</g>
        <g className={styles.mobileLines}>{renderConnections(true)}</g>
      </svg>
      <div className={styles.hub}>
        <div ref={trophy} className={styles.trophy} data-trophy-target data-over={drag?.over ?? false}><TrophyIcon size={78} weight="light" aria-hidden="true" /></div>
        <span className={styles.hubTitle}>{drag?.over ? "Release to explore" : drag ? "Bring it here" : "A collection of milestones"}</span>
      </div>
      <ul className={styles.nodes} role="list" aria-label="Explore all 11 honors, awards and certifications">
        {honors.map((entry, index) => {
          const Symbol = symbols[entry.symbol];
          const point = positions[index];
          const moving = drag?.id === entry.id ? drag : null;
          const showingPreview = preview === entry.id && !drag;
          return <li key={entry.id} className={styles.nodePosition} data-honor-node={entry.id} data-moving={Boolean(moving)} data-preview={showingPreview} style={{ "--x": `${moving?.x ?? point.x}%`, "--y": `${moving?.y ?? point.y}%`, "--mx": `${moving?.x ?? point.mx}%`, "--my": `${moving?.y ?? point.my}%` } as CSSProperties}>
            <button ref={(element) => { if (element) buttons.current.set(entry.id, element); else buttons.current.delete(entry.id); }} type="button" className={styles.node} data-group={entry.group} data-selected={selected?.id === entry.id} aria-label={`${entry.title}, ${entry.years}`} aria-describedby={showingPreview ? `honor-preview-${entry.id}` : "honors-help"} aria-controls="honor-details" aria-expanded={selected?.id === entry.id} draggable={false}
              onPointerEnter={() => { if (!session.current?.moving) setPreview(entry.id); }}
              onPointerLeave={(event) => { if (document.activeElement !== event.currentTarget) setPreview((value) => value === entry.id ? null : value); }}
              onFocus={() => setPreview(entry.id)} onBlur={() => setPreview((value) => value === entry.id ? null : value)}
              onPointerDown={(event) => startDrag(event, entry.id)} onPointerMove={moveDrag} onPointerUp={endDrag} onPointerCancel={cancelDrag} onLostPointerCapture={() => { if (session.current?.id === entry.id) cancelDrag(); }}
              onClick={(event) => { if (event.detail > 0 && performance.now() < clickAfterDrag.current) return; openAward(entry.id, event.currentTarget); }}
              onKeyDown={(event) => {
                const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
                if (step) { event.preventDefault(); buttons.current.get(honors[(index + step + honors.length) % honors.length].id)?.focus(); }
              }}>
              <Symbol size={29} weight="light" aria-hidden="true" /><span className={styles.nodeLabel}>{entry.label}</span>
            </button>
            {showingPreview && <div role="tooltip" id={`honor-preview-${entry.id}`} className={styles.preview} data-side={point.x > 50 ? "left" : "right"} data-mobile-side={point.mx > 50 ? "left" : "right"}><strong>{entry.label}<span>{entry.years}</span></strong><p>{entry.summary}</p></div>}
          </li>;
        })}
      </ul>
    </div>
    <p className="sr-only" role="status">{announcement}</p>
    <section ref={details} id="honor-details" className={styles.details} tabIndex={-1} hidden={!selected} aria-labelledby="honor-details-title">
      {selected && <><div className={styles.detailHeading}><p>{selected.groupTitle}<span>{selected.years}</span></p><h3 id="honor-details-title">{selected.title}</h3></div>
        {selected.description && <p className={styles.detailDescription}>{selected.description}</p>}
        {selected.results && <ul className={styles.results}>{selected.results.map((result) => <li key={result.event}><strong>{result.award} — {result.place}</strong><p>{result.event}<span>{result.year}</span></p></li>)}</ul>}
        <button type="button" className={styles.back} onClick={() => { setSelection(null); setPreview(null); origin.current?.focus({ preventScroll: true }); stage.current?.scrollIntoView({ behavior: scrollBehavior(), block: "start" }); }}><ArrowLeftIcon size={18} aria-hidden="true" />Back to awards</button></>}
    </section>
  </section>;
}
