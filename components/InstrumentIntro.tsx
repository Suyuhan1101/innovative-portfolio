"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import styles from "./InstrumentIntro.module.css";
import LandscapeFragments from "./LandscapeFragments";

export type IntroStage = "ready" | "booting" | "exiting";
type Props = {
  rootRef: RefObject<HTMLDivElement | null>;
  welcomeRef: RefObject<HTMLSpanElement | null>;
  stage: IntroStage;
  busy: boolean;
  reduced: boolean;
  settings: ReactNode;
  onStart: () => void;
  onSkip: () => void;
};

export default function InstrumentIntro({ rootRef, welcomeRef, stage, busy, reduced, settings, onStart, onSkip }: Props) {
  const startRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (stage === "ready") startRef.current?.focus({ preventScroll: true }); }, [stage]);

  return <div className={`intro-screen ${styles.screen}`} ref={rootRef} data-stage={stage} data-reduced={reduced} role="dialog" aria-modal="true" aria-label="Welcome to Yuhan Su's world">
    <span className={styles.structure} aria-hidden="true" />
    <LandscapeFragments reduced={reduced} stage={stage} />
    <button ref={startRef} type="button" className={styles.start} onClick={onStart} disabled={busy} aria-label="Enter Yuhan Su's world">
      <span className={styles.stage}>
        <svg className={styles.instrument} viewBox="0 0 520 520" fill="none" aria-hidden="true">
          <circle className={styles.guide} cx="260" cy="260" r="164" />
          <g className={styles.arcAssembly}>
            <path className={styles.primaryArc} pathLength="1" d="M 110 172 A 174 174 0 0 1 402 160" />
            <path className={styles.secondaryArc} pathLength="1" d="M 421 328 A 174 174 0 0 1 133 379" />
            <path className={styles.innerArc} pathLength="1" d="M 137 295 A 128 128 0 0 1 328 151" />
          </g>
          <g className={styles.notches}>
            {Array.from({ length: 7 }, (_, index) => <g key={index} transform={`rotate(${index * 360 / 7 - 12} 260 260)`} style={{ "--notch-delay": `${.12 + index * .055}s` } as CSSProperties}>
              <path d="M 260 55 V 70" /><path className={styles.fineTick} d="M 251 62 V 68 M 269 62 V 68" />
            </g>)}
          </g>
          <path className={styles.axis} d="M 248 33 H 272 M 260 28 V 38 M 248 487 H 272 M 260 482 V 492" />
        </svg>
        <span className={styles.identity}><span className={styles.monogram}>YH</span><span className={styles.name}>Yuhan Su</span></span>
        <span className={styles.scan} aria-hidden="true" />
        <span ref={welcomeRef} className={styles.welcome} aria-hidden={stage === "ready"}>Welcome to My World</span>
        <span className={styles.enterLabel}>Enter my world</span>
        <span className={styles.progress} aria-hidden="true"><span /></span>
      </span>
    </button>
    {stage === "booting" && <button className={styles.skip} type="button" onClick={onSkip}>Skip intro</button>}
    {settings}
    <span className="sr-only" role="status" aria-live="polite">{stage === "booting" ? "Opening Yuhan Su's world." : ""}</span>
  </div>;
}
