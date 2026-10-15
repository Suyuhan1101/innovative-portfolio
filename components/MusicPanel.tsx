"use client";

import { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import type { Ref } from "react";
import Image from "next/image";
import { animate } from "motion";
import { ArrowsInSimpleIcon } from "@phosphor-icons/react";
import { useMusicSelection } from "./MusicProvider";
import { motionEase } from "@/content/motion";
import { MusicPlayer } from "./MusicPlayer";

export type MusicPanelHandle = { open: (trigger: HTMLElement) => void; close: () => void; isOpen: () => boolean };
type Phase = "closed" | "opening" | "open" | "closing";
type Rect = { left: number; top: number; width: number; height: number };
const rectOf = (element: Element): Rect => {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { left, top, width, height };
};
const easeBack: [number, number, number, number] = [1 - motionEase.move[2], 1 - motionEase.move[3], 1 - motionEase.move[0], 1 - motionEase.move[1]];

export default function MusicPanel({ ref, reduced, routeKey, active, onVisibilityChange }: { ref: Ref<MusicPanelHandle>; reduced: boolean; routeKey: string; active: boolean; onVisibilityChange: (visible: boolean) => void }) {
  const { track } = useMusicSelection();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLImageElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const minimizeRef = useRef<HTMLButtonElement>(null);
  const originRef = useRef<HTMLElement | null>(null);
  const focusRef = useRef<HTMLElement | null>(null);
  const visibilityRef = useRef("");
  const sourceRectRef = useRef<Rect | null>(null);
  const sourceCoverRef = useRef<Rect | null>(null);
  const phaseRef = useRef<Phase>("closed");
  const animationsRef = useRef<ReturnType<typeof animate>[]>([]);
  const operationRef = useRef(0);
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const [phase, setPhase] = useState<Phase>("closed");

  const changePhase = (next: Phase) => { phaseRef.current = next; setPhase(next); };
  const cancel = () => { ++operationRef.current; animationsRef.current.forEach((animation) => animation.stop()); animationsRef.current = []; };
  const assignRect = (element: HTMLElement, rect: Rect) => {
    element.style.left = `${rect.left}px`; element.style.top = `${rect.top}px`;
    element.style.width = `${rect.width}px`; element.style.height = `${rect.height}px`;
  };
  const placeAtTarget = (): Rect | null => {
    const frame = frameRef.current; const content = contentRef.current;
    if (!frame || !content) return null;
    // The root's actual box excludes the reserved scrollbar gutter, even while
    // overflow is locked. Use the same coordinate space as the fixed dock.
    const viewportWidth = document.documentElement.getBoundingClientRect().width;
    const width = Math.min(370, viewportWidth - 40);
    content.style.width = `${width - 2}px`;
    const height = content.offsetHeight + 2;
    const right = Math.max(20, Math.min(74, viewportWidth * .041));
    const target = { left: viewportWidth - right - width, top: Math.max(20, (window.innerHeight - height) / 2), width, height };
    assignRect(frame, target);
    return target;
  };
  const restoreSource = () => {
    if (originRef.current) originRef.current.style.visibility = visibilityRef.current;
    originRef.current = null;
  };
  const snapshotDock = (dock: HTMLElement, rect: Rect) => {
    const snapshot = dock.cloneNode(true) as HTMLElement;
    snapshot.inert = true; snapshot.setAttribute("aria-hidden", "true");
    snapshot.querySelectorAll("button").forEach((button) => { button.disabled = true; });
    snapshot.removeAttribute("data-music-dock");
    snapshot.style.visibility = "visible";
    snapshot.style.width = `${rect.width - 2}px`; snapshot.style.border = "0"; snapshot.style.boxShadow = "none";
    snapshot.querySelectorAll("img").forEach((image) => { image.style.visibility = "hidden"; });
    ghostRef.current?.replaceChildren(snapshot);
  };
  const reset = (restoreFocus = true) => {
    cancel(); restoreSource();
    ghostRef.current?.replaceChildren();
    dialogRef.current?.close();
    changePhase("closed"); onVisibilityChange(false);
    if (restoreFocus) {
      const target = focusRef.current?.isConnected ? focusRef.current : document.querySelector<HTMLElement>("main h1");
      target?.focus({ preventScroll: true });
    }
    focusRef.current = null;
  };
  const run = (element: HTMLElement | null, keyframes: Parameters<typeof animate>[1], duration: number, delay = 0, reverse = false) => {
    if (!element) return Promise.resolve();
    const animation = animate(element, keyframes, { duration: reducedRef.current ? .12 : duration, delay: reducedRef.current ? 0 : delay, ease: reverse ? easeBack : motionEase.move });
    animationsRef.current.push(animation);
    return animation.finished;
  };

  const open = (trigger: HTMLElement) => {
    if (phaseRef.current !== "closed") return;
    const origin = trigger.closest<HTMLElement>("[data-music-dock]");
    const dialog = dialogRef.current; const frame = frameRef.current; const content = contentRef.current; const ghost = ghostRef.current; const cover = coverRef.current;
    if (!origin || !dialog || !frame || !content || !ghost || !cover) return;
    cancel(); const operation = operationRef.current;
    const from = rectOf(origin); const sourceImage = origin.querySelector("img");
    const fromCover = sourceImage ? rectOf(sourceImage) : from;
    originRef.current = origin; visibilityRef.current = origin.style.visibility;
    focusRef.current = origin.querySelector<HTMLElement>(".music-open") ?? trigger;
    sourceRectRef.current = from; sourceCoverRef.current = fromCover;
    // The ghost is a visual snapshot only; it has no listeners or accessible controls.
    snapshotDock(origin, from);
    dialog.showModal();
    const target = placeAtTarget();
    if (!target) { reset(); return; }
    const targetImage = content.querySelector(".music-artwork img");
    const toCover = targetImage ? rectOf(targetImage) : target;
    assignRect(frame, from); assignRect(cover, fromCover);
    frame.style.opacity = "1"; frame.style.backgroundColor = "var(--paper)";
    ghost.style.opacity = "1"; content.style.opacity = "0"; cover.style.opacity = "1";
    if (minimizeRef.current) minimizeRef.current.style.opacity = "0";
    if (shadeRef.current) shadeRef.current.style.opacity = "0";
    origin.style.visibility = "hidden";
    changePhase("opening"); onVisibilityChange(true);
    void Promise.all([
      run(frame, { ...target, backgroundColor: "#f0efe7" }, 1.1),
      run(cover, toCover, 1.1),
      run(ghost, { opacity: [1, 0] }, .35),
      run(content, { opacity: [0, 1] }, .5, .6),
      run(minimizeRef.current, { opacity: [0, 1] }, .5, .6),
      run(shadeRef.current, { opacity: [0, 1] }, 1.1),
    ]).then(() => {
      if (operation !== operationRef.current) return;
      cover.style.opacity = "0";
      changePhase("open");
    }).catch(() => { if (operation === operationRef.current) reset(); });
  };

  const close = () => {
    if (phaseRef.current === "closed" || phaseRef.current === "closing") return;
    cancel(); const operation = operationRef.current;
    const frame = frameRef.current; const content = contentRef.current; const cover = coverRef.current;
    if (!frame || !content || !cover) { reset(); return; }
    const dock = originRef.current?.isConnected ? originRef.current : Array.from(document.querySelectorAll<HTMLElement>("[data-music-dock]")).find((element) => element.getBoundingClientRect().width > 0);
    const target = dock ? rectOf(dock) : sourceRectRef.current;
    const dockImage = dock?.querySelector("img");
    const targetCover = dockImage ? rectOf(dockImage) : sourceCoverRef.current;
    if (!target || !targetCover) { reset(); return; }
    if (dock) snapshotDock(dock, target);
    if (phaseRef.current === "open") {
      const image = content.querySelector(".music-artwork img");
      if (image) assignRect(cover, rectOf(image));
      cover.style.opacity = "1";
    }
    changePhase("closing");
    void Promise.all([
      run(frame, { ...target, backgroundColor: "#faf9f4" }, 1.1, 0, true),
      run(cover, targetCover, 1.1, 0, true),
      run(content, { opacity: 0 }, .5, 0, true),
      run(minimizeRef.current, { opacity: 0 }, .5, 0, true),
      run(ghostRef.current, { opacity: 1 }, .35, .75, true),
      run(shadeRef.current, { opacity: 0 }, 1.1, 0, true),
    ]).then(() => { if (operation === operationRef.current) reset(); }).catch(() => { if (operation === operationRef.current) reset(); });
  };

  useImperativeHandle(ref, () => ({ open, close, isOpen: () => phaseRef.current !== "closed" }));
  useLayoutEffect(() => {
    if (phase === "closed") return;
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = overflow; };
  }, [phase !== "closed"]);
  useEffect(() => { if (!active && phaseRef.current !== "closed") reset(); }, [active]);
  useEffect(() => { if (phaseRef.current !== "closed") close(); }, [routeKey]);
  useEffect(() => {
    const resize = () => {
      if (phaseRef.current === "closed") return;
      if (phaseRef.current === "closing") { reset(); return; }
      cancel(); placeAtTarget();
      if (contentRef.current) contentRef.current.style.opacity = "1";
      if (minimizeRef.current) minimizeRef.current.style.opacity = "1";
      if (coverRef.current) coverRef.current.style.opacity = "0";
      if (ghostRef.current) ghostRef.current.style.opacity = "0";
      if (shadeRef.current) shadeRef.current.style.opacity = "1";
      changePhase("open");
    };
    window.addEventListener("resize", resize);
    const observer = new ResizeObserver(() => { if (phaseRef.current === "open") placeAtTarget(); });
    if (contentRef.current) observer.observe(contentRef.current);
    return () => { window.removeEventListener("resize", resize); observer.disconnect(); cancel(); restoreSource(); };
  }, []);

  return <dialog ref={dialogRef} className="music-panel-dialog" id="music-player-panel" aria-label="Expanded music player" data-music-phase={phase} onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => { if (phaseRef.current !== "closed") reset(); }} onKeyDown={(event) => {
    // A music dialog opened from the menu owns Escape and Tab while on top.
    event.stopPropagation();
    if (event.key !== "Tab") return;
    const controls = Array.from(frameRef.current?.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled)") ?? []);
    const first = controls[0]; const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }}>
    <div ref={shadeRef} className="music-panel-shade" aria-hidden="true" onClick={close} />
    <div ref={frameRef} className="music-panel-frame"><div ref={ghostRef} className="music-panel-ghost" aria-hidden="true" /><button ref={minimizeRef} className="icon-button music-minimize" aria-label="Minimize music player" onClick={close} autoFocus><ArrowsInSimpleIcon size={23} weight="light" /></button><div ref={contentRef} className="music-panel-content"><MusicPlayer floating /></div></div>
    <Image ref={coverRef} className="music-panel-cover" src={track.cover} alt="" width={640} height={640} sizes="210px" aria-hidden="true" />
  </dialog>;
}
