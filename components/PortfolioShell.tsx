"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { animate } from "motion";
import { useReducedMotion } from "motion/react";
import { CodeIcon, SquaresFourIcon, XIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { menuPages, PageId, pageFromPath, pageHref, sections } from "@/content/sections";
import { caseStudies, caseStudyFromPath, caseStudyHref, type CaseStudyEntry, type CaseStudySection } from "@/content/case-studies";
import { slides } from "@/content/media";
import { galleryPhotos } from "@/content/gallery";
import { communityOutreach } from "@/content/community";
import { motionEase, motionTiming as timing } from "@/content/motion";
import HomePage from "./HomePage";
import SectionPage from "./SectionPage";
import { TileFace } from "./Tile";
import HomeHeading from "./HomeHeading";
import { aboutMe, aboutMedia } from "@/content/about-me";
import { useMusicActive } from "./MusicProvider";
import { MusicTransport } from "./MusicPlayer";
import MusicPanel, { MusicPanelHandle } from "./MusicPanel";

type Rect = { left: number; top: number; width: number; height: number };
type HomeTitleLayout = { width: number; height: number; fontSize: string; lineHeight: number; letterSpacing: string };
type Flight = { page: PageId; rect: Rect; appearance: "home" | "section" | "menu"; returnToGrid: boolean; homeTitle?: HomeTitleLayout };
type HomeRevealHooks = { onGridVisible?: () => Promise<void>; onHeroVisible?: () => Promise<void> };
type MenuState = "closed" | "opening" | "open" | "closing" | "navigating";
type MotionPreview = "full" | "system" | "reduced";
type Frames = Record<string, number | string | number[] | string[]>;
const motionPreviewKey = "portfolio:motion-preview";
const isMotionPreview = (value: string | null): value is MotionPreview => value === "full" || value === "system" || value === "reduced";
const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const musicActive = useMusicActive();
  const [musicPanelOpen, setMusicPanelOpen] = useState(false);
  const musicPanelRef = useRef<MusicPanelHandle>(null);
  const prefersReducedMotion = useReducedMotion();
  const [motionPreview, setMotionPreview] = useState<MotionPreview>(process.env.NODE_ENV === "development" ? "full" : "system");
  const reduced = motionPreview === "reduced" || (motionPreview === "system" && Boolean(prefersReducedMotion));
  const [page, setPage] = useState<PageId>(() => pageFromPath(pathname));
  const [viewPath, setViewPath] = useState(pathname);
  const [entered, setEntered] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState("intro");
  const [entering, setEntering] = useState(true);
  const [menu, setMenu] = useState<MenuState>("closed");
  const [flight, setFlight] = useState<Flight | null>(null);
  const [hideTile, setHideTile] = useState(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dialog, setDialog] = useState<{ type: "contact" } | { type: "photo"; index: number } | { type: "gallery"; index: number; ids: string[] } | { type: "outreach"; index: number } | { type: "graphic" } | null>(null);
  const [loadedPhoto, setLoadedPhoto] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLButtonElement>(null);
  const introTextRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const flightRef = useRef<HTMLDivElement>(null);
  const homeSurfaceRef = useRef<HTMLDivElement>(null);
  const homeFaceRef = useRef<HTMLDivElement>(null);
  const homeTitleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const menuGridRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const graphicTriggerRef = useRef<HTMLElement | null>(null);
  const operationRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);
  const enteredRef = useRef(false);
  const displayedRef = useRef(page);
  const displayedPathRef = useRef(pathname);
  const listReturnRef = useRef<Record<string, { y: number; cardId: string }>>({});
  const expectedPathRef = useRef<string | null>(null);
  const routeReadyRef = useRef<{ path: string; resolve: () => void } | null>(null);
  const menuScrollRef = useRef({ x: 0, y: 0 });
  const traceRef = useRef<string[]>(["intro"]);
  const startedAtRef = useRef(0);
  const elapsedRef = useRef(0);

  // Development previews show the designed timing by default. Remember an
  // explicit QA choice for this tab because internal routes omit the query.
  // Production never reads this override and follows the system preference.
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const requested = new URLSearchParams(window.location.search).get("qa-motion");
    let saved: string | null = null;
    try { saved = window.sessionStorage.getItem(motionPreviewKey); } catch { /* Preview also works with storage disabled. */ }
    const preference = isMotionPreview(requested) ? requested : isMotionPreview(saved) ? saved : "full";
    setMotionPreview(preference);
    try { window.sessionStorage.setItem(motionPreviewKey, preference); } catch { /* Keep the default usable without storage. */ }
  }, []);

  const mark = (next: string) => { traceRef.current.push(next); elapsedRef.current = Math.round(performance.now() - startedAtRef.current); setPhase(next); };
  const startOperation = () => {
    operationRef.current?.abort();
    const controller = new AbortController();
    operationRef.current = controller;
    busyRef.current = true;
    setBusy(true);
    traceRef.current = [];
    startedAtRef.current = performance.now();
    return controller.signal;
  };
  const tween = async (element: HTMLElement | null, frames: Frames, duration: number, signal: AbortSignal, delay = 0, ease = motionEase.reveal) => {
    if (!element) return;
    if (signal.aborted) throw new Error("Animation cancelled");
    const control = animate(element, frames, { duration: reduced ? Math.min(duration, 0.12) : duration, delay: reduced ? 0 : delay, ease });
    let rejectAbort: (error: Error) => void = () => {};
    const aborted = new Promise<never>((_, reject) => { rejectAbort = reject; });
    const onAbort = () => { control.stop(); rejectAbort(new Error("Animation cancelled")); };
    signal.addEventListener("abort", onAbort, { once: true });
    try { await Promise.race([control.finished, aborted]); }
    finally { signal.removeEventListener("abort", onAbort); }
    if (signal.aborted) throw new Error("Animation cancelled");
  };
  const finish = () => { busyRef.current = false; setBusy(false); setEntering(false); mark("idle"); };
  const recover = (signal: AbortSignal) => {
    if (signal.aborted) return;
    const currentPage = pageFromPath(window.location.pathname);
    expectedPathRef.current = null;
    displayedRef.current = currentPage;
    setPage(currentPage);
    displayedPathRef.current = window.location.pathname;
    setViewPath(window.location.pathname);
    setFlight(null); setHideTile(false); setMenu("closed");
    if (mainRef.current) {
      mainRef.current.style.opacity = "1";
      mainRef.current.querySelectorAll<HTMLElement>("[data-home-reveal], [data-page-title], [data-reveal]").forEach((item) => {
        item.style.opacity = "1"; item.style.transform = "none"; item.style.clipPath = "none";
      });
    }
    headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]").forEach((item) => { item.style.opacity = "1"; item.style.transform = "none"; });
    finish();
  };
  const revealPage = async (destination: PageId, signal: AbortSignal, homeHooks: HomeRevealHooks = {}) => {
    const main = mainRef.current;
    if (!main) return;
    main.style.opacity = "1";
    if (destination === "home") {
      mark("home-enter");
      const groups = Array.from(main.querySelectorAll<HTMLElement>("[data-home-reveal]"));
      await Promise.all(groups.map(async (element, index) => {
        await tween(element, { opacity: [0, 1], y: [20, 0] }, timing.homeEnter, signal, index * timing.homeStagger);
        if (element.classList.contains("home-tiles")) await homeHooks.onGridVisible?.();
        if (element.classList.contains("home-hero")) await homeHooks.onHeroVisible?.();
      }));
    } else if (caseStudyFromPath(displayedPathRef.current)) {
      mark("case-study-enter");
      setEntering(false);
      await nextFrame();
      await tween(main, { opacity: [0, 1] }, .5, signal);
    } else {
      mark("title-enter");
      const heading = main.querySelector<HTMLElement>("[data-page-title]");
      await tween(heading, {
        opacity: [0, 1], x: [reduced ? 0 : -20, 0],
        clipPath: reduced ? ["inset(0 0% 0 0)", "inset(0 0% 0 0)"] : ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      }, timing.titleEnter, signal);
      if (heading) heading.style.clipPath = "none";
      mark("body-enter");
      const lines = Array.from(main.querySelectorAll<HTMLElement>("[data-reveal]"));
      // Column layout orders the DOM down each column; reveal this gallery
      // by visual position so its first row appears before lower photographs.
      if (destination === "gallery") {
        const positions = new Map(lines.map((element) => [element, element.getBoundingClientRect()]));
        lines.sort((a, b) => positions.get(a)!.top - positions.get(b)!.top || positions.get(a)!.left - positions.get(b)!.left);
      }
      const gap = Math.min(timing.lineStagger, timing.maxLineStaggerSpan / Math.max(1, lines.length - 1));
      await Promise.all(lines.map((element, index) => tween(element, { opacity: [0, 1], y: [12, 0] }, timing.bodyEnter, signal, index * gap)));
    }
  };

  useLayoutEffect(() => {
    if (entered && !busy && menu === "closed") return;
    const original = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = original; };
  }, [entered, busy, menu]);

  useEffect(() => {
    if (!entered || page !== "home" || busy || menu !== "closed" || paused || dialog || musicPanelOpen) return;
    const interval = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(interval);
  }, [entered, page, busy, menu, paused, dialog, slide, musicPanelOpen]);

  useEffect(() => {
    sections.forEach(({ id }) => router.prefetch(pageHref(id)));
    caseStudies.forEach((entry) => router.prefetch(caseStudyHref(entry)));
  }, [router]);
  useEffect(() => () => operationRef.current?.abort(), []);

  // Native history changes cancel the previous sequence, preserve entered state,
  // and reveal the correct destination without replaying the welcome screen.
  useEffect(() => {
    if (expectedPathRef.current === pathname) {
      routeReadyRef.current?.resolve();
      routeReadyRef.current = null;
      expectedPathRef.current = null;
      return;
    }
    const destination = pageFromPath(pathname);
    if (pathname === displayedPathRef.current) return;
    operationRef.current?.abort();
    expectedPathRef.current = null;
    busyRef.current = false;
    setBusy(false); setFlight(null); setHideTile(false); setMenu("closed");
    displayedRef.current = destination;
    displayedPathRef.current = pathname;
    setViewPath(pathname);
    setPage(destination);
    setEntering(!enteredRef.current);
    if (mainRef.current) mainRef.current.style.opacity = enteredRef.current ? "1" : "0";
    headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]").forEach((item) => { item.style.opacity = "1"; item.style.transform = "none"; });
    mark(enteredRef.current ? "idle" : "intro");
    if (enteredRef.current) void nextFrame().then(() => {
      if (displayedPathRef.current !== pathname) return;
      const saved = listReturnRef.current[pathname];
      if (saved) {
        window.scrollTo(0, saved.y);
        mainRef.current?.querySelector<HTMLElement>(`[data-case-card="${saved.cardId}"]`)?.focus({ preventScroll: true });
      } else mainRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    });
  }, [pathname]);

  useEffect(() => {
    const element = dialogRef.current;
    if (dialog && element && !element.open) element.showModal();
    if (!dialog && element?.open) element.close();
    if (!dialog && graphicTriggerRef.current) {
      graphicTriggerRef.current.focus({ preventScroll: true });
      graphicTriggerRef.current = null;
    }
  }, [dialog]);

  async function enterWorld() {
    if (busyRef.current || enteredRef.current) return;
    const signal = startOperation();
    try {
      await document.fonts.ready;
      const text = introTextRef.current;
      const brand = brandRef.current;
      if (!text || !brand) return;
      mark("welcome-move");
      const from = text.getBoundingClientRect();
      const to = brand.getBoundingClientRect();
      text.style.position = "fixed";
      text.style.left = `${from.left}px`;
      text.style.top = `${from.top}px`;
      text.style.width = `${from.width}px`;
      text.style.transformOrigin = "0 0";
      headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]").forEach((item) => { item.style.opacity = "0"; });
      await tween(text, { x: to.left - from.left, y: to.top - from.top, scale: to.width / from.width }, timing.welcomeMove, signal, 0, motionEase.move);
      enteredRef.current = true;
      setEntered(true);
      brand.style.opacity = "1";
      if (headerRef.current) headerRef.current.style.opacity = "1";
      await tween(introRef.current, { opacity: 0 }, timing.introExit, signal);
      setIntroVisible(false);
      mark("header-enter");
      const headerItems = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]") ?? []).filter((item) => item !== brand);
      await Promise.all(headerItems.map((item, index) => tween(item, { opacity: [0, 1], x: [-10, 0] }, timing.headerEnter, signal, index * timing.headerStagger)));
      if (page !== "home") await tween(targetRef.current, { opacity: [0, 1] }, timing.tileLand, signal);
      await revealPage(page, signal);
      finish();
      await nextFrame();
      if (!signal.aborted) mainRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    } catch { recover(signal); }
  }

  async function openMenu() {
    if (busyRef.current || !enteredRef.current || menu !== "closed") return;
    const signal = startOperation();
    menuScrollRef.current = { x: window.scrollX, y: window.scrollY };
    setMenu("opening");
    try {
      await nextFrame();
      mark("menu-cover");
      await tween(coverRef.current, { scaleY: [0, 1] }, timing.menuCover, signal, 0, motionEase.move);
      mark("menu-items-enter");
      if (menuGridRef.current) menuGridRef.current.style.opacity = "1";
      const tiles = Array.from(menuGridRef.current?.querySelectorAll<HTMLElement>(".tile") ?? []);
      await Promise.all([
        ...tiles.map((tile, index) => tween(tile, { opacity: [0, 1], y: [20, 0] }, timing.menuItemEnter, signal, index * timing.menuItemStagger)),
        tween(closeRef.current, { opacity: [0, 1] }, timing.menuItemEnter, signal),
      ]);
      setMenu("open"); busyRef.current = false; setBusy(false); mark("menu-open");
      menuRef.current?.querySelector<HTMLElement>(`[data-page="${page}"]`)?.focus({ preventScroll: true });
    } catch { recover(signal); }
  }

  async function closeMenu() {
    if (busyRef.current || menu !== "open") return;
    const signal = startOperation();
    setMenu("closing"); mark("menu-exit");
    try {
      await tween(menuRef.current, { opacity: [1, 0], y: [0, 60] }, timing.menuExit, signal, 0, motionEase.exit);
      setMenu("closed"); setBusy(false);
      await nextFrame();
      window.scrollTo(menuScrollRef.current.x, menuScrollRef.current.y);
      menuButtonRef.current?.focus({ preventScroll: true });
      finish();
    } catch { recover(signal); }
  }

  useEffect(() => {
    if (menu !== "open") return;
    const keyboard = (event: KeyboardEvent) => {
      if (musicPanelRef.current?.isOpen()) return;
      if (event.key === "Escape") { event.preventDefault(); void closeMenu(); }
      if (event.key !== "Tab") return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)") ?? []);
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, [menu]);

  async function navigate(destination: PageId, element: HTMLElement, origin: "home" | "header" | "menu" = "home") {
    if (busyRef.current || !enteredRef.current) return;
    if (pageHref(destination) === displayedPathRef.current && origin !== "menu") return;
    const signal = startOperation();
    const homeTitleMorph = destination === "home" && origin === "menu";
    const returningPage = destination === "home" && origin === "header" && page !== "home" ? page : null;
    const appearance = origin === "menu" ? "menu" : returningPage ? "section" : "home";
    let source = element;
    if (origin === "header") source = mainRef.current?.querySelector<HTMLElement>(`.home-tiles [data-page="${destination}"]`) ?? targetRef.current ?? element;
    const measured = source.getBoundingClientRect();
    // Small responsive tiles still fly from their real position and size.
    // Only a text link needs a synthetic square as its transition source.
    const rect = source.matches(".tile") ? { left: measured.left, top: measured.top, width: measured.width, height: measured.height } : { left: measured.left, top: measured.bottom + 12, width: 110, height: 110 };
    // A scrolled-away section badge returns from just below the sticky header,
    // keeping its identity visible rather than starting outside the viewport.
    if (returningPage && measured.bottom <= (headerRef.current?.getBoundingClientRect().bottom ?? 0)) {
      rect.top = (headerRef.current?.getBoundingClientRect().bottom ?? 0) + 28;
    }
    setFlight({ page: returningPage ?? destination, rect, appearance, returnToGrid: Boolean(returningPage) });
    mark("selected");
    try {
      await nextFrame();
      if (origin === "menu") {
        setMenu("navigating");
        headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]").forEach((item) => { item.style.opacity = "0"; });
        mark("menu-items-exit");
        await Promise.all([tween(menuGridRef.current, { opacity: 0 }, timing.menuItemsExit, signal, 0, motionEase.exit), tween(closeRef.current, { opacity: 0 }, timing.menuItemsExit, signal)]);
        if (mainRef.current) mainRef.current.style.opacity = "0";
        if (coverRef.current) coverRef.current.style.backgroundColor = "var(--paper)";
      } else {
        source.style.visibility = "hidden";
        mark("content-exit");
        await tween(mainRef.current, { opacity: 0 }, timing.contentExit, signal, 0, motionEase.exit);
        source.style.visibility = "";
      }
      window.scrollTo(0, 0);
      displayedRef.current = destination;
      setEntering(true); setHideTile(true); setPage(destination);
      const href = pageHref(destination);
      displayedPathRef.current = href;
      setViewPath(href);
      expectedPathRef.current = href;
      const routeReady = window.location.pathname === href ? Promise.resolve() : new Promise<void>((resolve, reject) => {
        const cleanup = () => { window.clearTimeout(timer); signal.removeEventListener("abort", abort); routeReadyRef.current = null; };
        const abort = () => { cleanup(); reject(new Error("Navigation cancelled")); };
        const timer = window.setTimeout(() => { cleanup(); reject(new Error("Navigation timed out")); }, 15000);
        signal.addEventListener("abort", abort, { once: true });
        routeReadyRef.current = { path: href, resolve: () => { cleanup(); resolve(); } };
      });
      router.push(href, { scroll: false });
      await nextFrame();
      await routeReady;
      await document.fonts.ready;
      if (origin === "menu") {
        mark("header-enter");
        const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("[data-header-item]") ?? []);
        await Promise.all(items.map((item, index) => tween(item, { opacity: [0, 1], x: [-12, 0] }, timing.headerEnter, signal, index * timing.headerStagger)));
      }
      const destinationTile = homeTitleMorph
        ? mainRef.current?.querySelector<HTMLElement>(".home-title")
        : returningPage
        ? mainRef.current?.querySelector<HTMLElement>(`.home-tiles [data-page="${returningPage}"]`)
        : targetRef.current;
      const movingTile = flightRef.current;
      const target = destinationTile?.getBoundingClientRect();
      if (!target || !destinationTile || !movingTile) throw new Error("Destination not ready");

      if (homeTitleMorph) {
        const titleStyle = getComputedStyle(destinationTile);
        setFlight((current) => current ? { ...current, homeTitle: {
          width: target.width, height: target.height, fontSize: titleStyle.fontSize,
          lineHeight: parseFloat(titleStyle.lineHeight) / parseFloat(titleStyle.fontSize),
          letterSpacing: titleStyle.letterSpacing,
        } } : null);
        // Home can also be selected while already on Home. Reset the previous
        // completed animations instead of letting old inline opacity reveal it.
        mainRef.current?.querySelectorAll<HTMLElement>("[data-home-reveal]").forEach((group) => {
          group.style.opacity = "0"; group.style.transform = "none";
        });
        if (mainRef.current) mainRef.current.style.opacity = "1";
        await nextFrame();
        const surface = homeSurfaceRef.current;
        const face = homeFaceRef.current;
        const title = homeTitleRef.current;
        if (!surface || !face || !title) throw new Error("Home title not ready");
        const faceRect = face.getBoundingClientRect();
        const uniformScale = Math.min(target.width / rect.width, target.height / rect.height);
        mark("home-panel-move");
        await Promise.all([
          tween(movingTile, { x: target.left - rect.left, y: target.top - rect.top }, timing.tileMove, signal, 0, motionEase.move),
          tween(surface, { scaleX: target.width / rect.width, scaleY: target.height / rect.height }, timing.tileMove, signal, 0, motionEase.move),
          tween(face, {
            x: (target.width - faceRect.width * uniformScale) / 2 - (faceRect.left - rect.left),
            y: (target.height - faceRect.height * uniformScale) / 2 - (faceRect.top - rect.top),
            scale: uniformScale,
          }, timing.tileMove, signal, 0, motionEase.move),
          tween(coverRef.current, { opacity: [1, 0] }, timing.coverExit, signal, timing.tileMove - timing.coverExit),
        ]);
        setMenu("closed");
        mark("home-title-morph");
        const paper = getComputedStyle(document.documentElement).getPropertyValue("--paper").trim();
        const green = getComputedStyle(surface).backgroundColor;
        await Promise.all([
          tween(surface, { backgroundColor: [green, paper], borderColor: [green, "rgba(23, 73, 45, 0)"] }, timing.homeSurfaceMorph, signal),
          tween(face, { opacity: [1, 0] }, timing.homeFaceExit, signal, timing.homeFaceExitDelay, motionEase.exit),
          tween(title, { opacity: [0, 1], clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"] }, timing.homeTitleMorph, signal, timing.homeTitleMorphDelay),
        ]);
        // Keep the completed headline visible while the image and tagline
        // appear. Hand off only after the real hero reaches its final position.
        await revealPage(destination, signal, { onHeroVisible: async () => {
          setHideTile(false);
          await nextFrame();
          await tween(movingTile, { opacity: [1, 0] }, timing.tileLand, signal);
          if (!signal.aborted) setFlight(null);
        } });
        finish();
        await nextFrame();
        if (!signal.aborted) mainRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
        return;
      }

      // Keep the source's layout fixed throughout flight. Only transforms move
      // and shrink it; changing width/height reflows container-based labels.
      const scaleX = target.width / rect.width;
      const scaleY = target.height / rect.height;
      const faceMotions: (() => Promise<void>)[] = [];
      if (destination !== "home" || returningPage) {
        for (const selector of [".tile-icon", ".tile-label", ".tile-arrow"]) {
          const fromElement = movingTile.querySelector<HTMLElement>(selector);
          const toElement = destinationTile.querySelector<HTMLElement>(selector);
          if (!fromElement || !toElement) continue;
          const from = fromElement.getBoundingClientRect();
          const to = toElement.getBoundingClientRect();
          fromElement.style.transformOrigin = "0 0";
          if (to.width === 0 || to.height === 0) {
            faceMotions.push(() => tween(fromElement, { opacity: [1, 0] }, timing.tileMove * 0.4, signal, timing.tileMove * 0.5));
          } else {
            faceMotions.push(() => tween(fromElement, {
              x: (to.left - target.left) / scaleX - (from.left - rect.left),
              y: (to.top - target.top) / scaleY - (from.top - rect.top),
              scaleX: to.width / (from.width * scaleX),
              scaleY: to.height / (from.height * scaleY),
            }, timing.tileMove, signal, 0, motionEase.move));
            if (returningPage && selector === ".tile-arrow") {
              faceMotions.push(() => tween(fromElement, { opacity: [0, 1] }, timing.tileMove * 0.4, signal, timing.tileMove * 0.5));
            }
          }
          if (returningPage) {
            // SVG color needs an explicit starting keyframe. Otherwise Motion
            // can resolve a CSS-variable color as transparent during the delay.
            const fromColor = getComputedStyle(fromElement).color;
            const toColor = getComputedStyle(toElement).color;
            faceMotions.push(() => tween(fromElement, { color: [fromColor, toColor] }, timing.tileMove * 0.35, signal, timing.tileMove * 0.65));
          }
        }
      }
      if (returningPage) {
        const targetStyle = getComputedStyle(destinationTile);
        const sourceStyle = getComputedStyle(movingTile);
        const colors = {
          backgroundColor: [sourceStyle.backgroundColor, targetStyle.backgroundColor],
          color: [sourceStyle.color, targetStyle.color],
          borderColor: [sourceStyle.borderColor, targetStyle.borderColor],
        };
        faceMotions.push(() => tween(movingTile, colors, timing.tileMove * 0.35, signal, timing.tileMove * 0.65));
      }
      if (mainRef.current) mainRef.current.style.opacity = "1";
      mark("tile-move");
      await Promise.all([
        tween(movingTile, { x: target.left - rect.left, y: target.top - rect.top, scaleX, scaleY }, timing.tileMove, signal, 0, motionEase.move),
        ...faceMotions.map((run) => run()),
        ...(origin === "menu" ? [tween(coverRef.current, { opacity: [1, 0] }, timing.coverExit, signal, timing.tileMove - timing.coverExit)] : []),
      ]);
      if (origin === "menu") setMenu("closed");
      mark("tile-land");
      if (returningPage) {
        // Keep the returned badge in its real home slot while the hero appears.
        // Only hand it over after the grid itself has finished fading in.
        await revealPage(destination, signal, { onGridVisible: async () => {
          setHideTile(false);
          await nextFrame();
          await tween(movingTile, { opacity: [1, 0] }, timing.tileLand, signal);
          if (!signal.aborted) setFlight(null);
        } });
      } else {
        if (destination !== "home") destinationTile.style.opacity = "0";
        setHideTile(false);
        await nextFrame();
        const land = Promise.all([
          tween(movingTile, { opacity: [1, 0] }, timing.tileLand, signal),
          ...(destination !== "home" ? [tween(destinationTile, { opacity: [0, 1] }, timing.tileLand, signal)] : []),
        ]).then(() => { if (!signal.aborted) setFlight(null); });
        await Promise.all([land, revealPage(destination, signal)]);
      }
      finish();
      await nextFrame();
      if (!signal.aborted) mainRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    } catch { recover(signal); }
  }

  async function navigateCase(entry: CaseStudyEntry | null, section: CaseStudySection) {
    if (busyRef.current || !enteredRef.current) return;
    const href = entry ? caseStudyHref(entry) : `/${section}`;
    if (href === displayedPathRef.current) return;
    if (entry) listReturnRef.current[`/${section}`] = { y: window.scrollY, cardId: entry.id };
    const signal = startOperation();
    try {
      mark("case-study-exit");
      await tween(mainRef.current, { opacity: [1, 0] }, .28, signal);
      displayedRef.current = section;
      displayedPathRef.current = href;
      setPage(section); setViewPath(href); setEntering(false); setHideTile(false);
      expectedPathRef.current = href;
      const ready = new Promise<void>((resolve, reject) => {
        const cleanup = () => { window.clearTimeout(timer); signal.removeEventListener("abort", abort); routeReadyRef.current = null; };
        const abort = () => { cleanup(); reject(new Error("Navigation cancelled")); };
        const timer = window.setTimeout(() => { cleanup(); reject(new Error("Navigation timed out")); }, 15000);
        signal.addEventListener("abort", abort, { once: true });
        routeReadyRef.current = { path: href, resolve: () => { cleanup(); resolve(); } };
      });
      router.push(href, { scroll: false });
      await ready;
      await nextFrame();
      await document.fonts.ready;
      if (signal.aborted) return;
      const saved = !entry ? listReturnRef.current[href] : undefined;
      window.scrollTo(0, saved?.y ?? 0);
      mark("case-study-enter");
      await tween(mainRef.current, { opacity: [0, 1] }, .5, signal);
      finish();
      await nextFrame();
      if (signal.aborted) return;
      window.scrollTo(0, saved?.y ?? 0);
      const focus = saved
        ? mainRef.current?.querySelector<HTMLElement>(`[data-case-card="${saved.cardId}"]`)
        : mainRef.current?.querySelector<HTMLElement>("h1");
      focus?.focus({ preventScroll: true });
    } catch { recover(signal); }
  }

  const knownRoute = pathname === "/" || sections.some(({ id }) => pathname === `/${id}`) || Boolean(caseStudyFromPath(pathname));
  const caseStudy = caseStudyFromPath(viewPath);
  if (!knownRoute) return <>{children}</>;
  const menuMounted = menu !== "closed";
  const menuNavigation = menu === "navigating";
  // During navigation the transport must leave the menu's lower stacking context.
  const musicInMenu = menuMounted && !flight && !menuNavigation;
  const dialogPhotos = dialog?.type === "outreach" ? communityOutreach.photos : dialog?.type === "gallery" ? dialog.ids.map((id) => galleryPhotos.find((photo) => photo.id === id)!) : slides;
  const dialogImage = dialog?.type === "photo" || dialog?.type === "gallery" || dialog?.type === "outreach" ? dialogPhotos[dialog.index] : null;
  const movePhotograph = (direction: number) => setDialog((current) => {
    if (current?.type !== "photo" && current?.type !== "gallery" && current?.type !== "outreach") return current;
    const count = current.type === "outreach" ? communityOutreach.photos.length : current.type === "gallery" ? current.ids.length : slides.length;
    return { ...current, index: (current.index + direction + count) % count };
  });
  const homeTitleFlight = flight?.page === "home" && flight.appearance === "menu";
  const expandMusic = (element: HTMLElement) => { if (!busyRef.current) musicPanelRef.current?.open(element); };
  const restoreTransportFocus = () => {
    if (dialog) dialogRef.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
    else if (menuMounted) closeRef.current?.focus();
    else mainRef.current?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
  };

  return <div className="portfolio" data-entered={entered} data-music-active={musicActive} data-phase={phase} data-motion={entered ? (reduced ? "reduced" : "full") : "pending"} data-transition-ms={elapsedRef.current} data-transition-sequence={traceRef.current.join(",")}>
    <header className={`site-header ${menuNavigation ? "over-menu" : ""}`} ref={headerRef} inert={!entered || (menuMounted && !menuNavigation)}>
      <div className="brand-group"><button className="brand-button" aria-label="Return to Home" disabled={busy} onClick={(event) => void navigate("home", event.currentTarget, "header")}><span className="brand-text" ref={brandRef} data-header-item>Welcome to My World</span></button><CodeIcon className="brand-code" weight="light" aria-hidden="true" data-header-item /></div>
      <div className="header-actions"><button className="contact-button" data-header-item disabled={busy} onClick={() => setDialog({ type: "contact" })}>Contact</button><button className="menu-trigger icon-button" data-header-item aria-label="Open menu" aria-haspopup="dialog" aria-expanded={menuMounted} aria-controls="site-menu" onClick={() => void openMenu()} disabled={busy} ref={menuButtonRef}><SquaresFourIcon size={29} weight="fill" /></button></div>
    </header>
    <main ref={mainRef} id="main-content" className="main-shell" data-entering={entering} inert={!entered || busy || menuMounted}>
      <div key={viewPath}>{page === "home" ? <HomePage slide={slide} selectSlide={setSlide} paused={paused} togglePause={() => setPaused((value) => !value)} navigate={(next, element, origin) => void navigate(next, element, origin)} reduced={reduced} hiddenTile={hideTile && flight?.returnToGrid ? flight.page : null} hiddenTitle={hideTile && homeTitleFlight} /> : <SectionPage caseStudy={caseStudy} onCaseStudy={(entry) => void navigateCase(entry, entry.section)} onCaseStudyBack={() => { if (caseStudy) void navigateCase(null, caseStudy.section); }} page={page} targetRef={targetRef} hideTile={hideTile} onHome={(element) => void navigate("home", element, "header")} onPhoto={(index) => setDialog({ type: "photo", index })} onGalleryPhoto={(index, ids) => setDialog({ type: "gallery", index, ids })} onOutreachPhoto={(index) => setDialog({ type: "outreach", index })} onNavigate={(next, element) => void navigate(next, element)} onGraphic={(element) => { graphicTriggerRef.current = element; setDialog({ type: "graphic" }); }} />}</div>
    </main>
    {musicActive && entered && (page !== "about-me" || busy) && !musicInMenu && !dialog && <div className="music-floating"><MusicTransport onStop={restoreTransportFocus} onExpand={expandMusic} disabled={busy} /></div>}
    {menuMounted && <div ref={menuRef} className={`menu-layer ${musicActive ? "has-music" : ""}`} id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu"><div className="menu-cover" ref={coverRef} /><button ref={closeRef} className="menu-close icon-button" aria-label="Close menu" disabled={busy} onClick={() => void closeMenu()}><XIcon size={36} weight="light" /></button><div className="menu-grid" ref={menuGridRef}>{menuPages.map((id) => <a href={pageHref(id)} className={`tile ${id === page ? "active" : ""}`} aria-current={id === page ? "page" : undefined} key={id} data-page={id} tabIndex={menu === "open" ? 0 : -1} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey) return; event.preventDefault(); void navigate(id, event.currentTarget, "menu"); }}><TileFace page={id} interactive /></a>)}</div>{musicActive && musicInMenu && <div className="music-overlay"><MusicTransport onStop={restoreTransportFocus} onExpand={expandMusic} disabled={busy} /></div>}</div>}
    {flight && <div ref={flightRef} className={`tile active floating-tile from-${flight.appearance} ${homeTitleFlight ? "home-morph" : ""}`} style={{ left: flight.rect.left, top: flight.rect.top, width: flight.rect.width, height: flight.rect.height }} aria-hidden="true">{homeTitleFlight ? <><div className="home-morph-surface" ref={homeSurfaceRef} /><div className="home-morph-face" ref={homeFaceRef}><TileFace page="home" /></div>{flight.homeTitle && <div className="home-morph-title" ref={homeTitleRef} style={{ width: flight.homeTitle.width, height: flight.homeTitle.height }}><HomeHeading style={{ fontSize: flight.homeTitle.fontSize, lineHeight: flight.homeTitle.lineHeight, letterSpacing: flight.homeTitle.letterSpacing }} /></div>}</> : <TileFace page={flight.page} />}</div>}
    {introVisible && <button className="intro-screen" ref={introRef} onClick={() => void enterWorld()} disabled={busy} aria-label="Enter Yuhan Su's world"><span className="intro-button"><span className="intro-title" ref={introTextRef}>Welcome to My World</span><span className="intro-hint">Click to enter <ArrowRightIcon size={22} weight="light" /></span></span></button>}
    <dialog ref={dialogRef} className={`media-dialog ${dialog?.type === "contact" ? "contact-dialog" : ""} ${musicActive ? "has-music" : ""}`} aria-label={dialog?.type === "contact" ? "Contact Yuhan Su" : dialog?.type === "graphic" ? "Five elements diagram" : "Photograph viewer"} onClose={() => setDialog(null)} onCancel={() => setDialog(null)} onKeyDown={(event) => { if ((dialog?.type === "photo" || dialog?.type === "gallery" || dialog?.type === "outreach") && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); movePhotograph(event.key === "ArrowLeft" ? -1 : 1); } }}>
      <button className="dialog-close icon-button" aria-label="Close dialog" onClick={() => setDialog(null)}><XIcon size={29} weight="light" /></button>
      {dialog?.type === "contact" && <div className="contact-content"><h2>Let's connect.</h2><p>Say hello — I'd love to hear from you.</p><a className="text-link contact-email" href={`mailto:${aboutMe.email}`}>{aboutMe.email}<ArrowUpRightIcon size={20} /></a><a className="text-link" href="https://github.com/Suyuhan1101" target="_blank" rel="noreferrer">View GitHub <ArrowUpRightIcon size={22} /></a></div>}
      {dialog?.type === "graphic" && <><Image className="lightbox-image" src={aboutMedia.fiveElements} alt="Five elements reference diagram showing wood, fire, earth, metal and water" width={2000} height={2000} sizes="(max-width: 600px) 90vw, 700px" /><p className="graphic-caption">Five elements · a reference for my Wood element.</p></>}
      {dialogImage && <><Image key={dialogImage.src} className="lightbox-image" src={dialogImage.src} alt={dialogImage.alt} width={dialogImage.width} height={dialogImage.height} sizes="(max-width: 600px) 90vw, 880px" data-ready={loadedPhoto === dialogImage.src} style={{ opacity: loadedPhoto === dialogImage.src ? 1 : 0 }} onLoad={() => setLoadedPhoto(dialogImage.src)} /><span className="sr-only" role="status">{loadedPhoto !== dialogImage.src ? "Loading photograph…" : ""}</span><div className="lightbox-controls"><button className="icon-button" aria-label="Previous photograph" onClick={() => movePhotograph(-1)}><ArrowLeftIcon size={25} /></button><p>{dialogImage.label}{(dialog?.type === "gallery" || dialog?.type === "outreach") && <span className="lightbox-counter">{dialog.index + 1} / {dialogPhotos.length}</span>}</p><button className="icon-button" aria-label="Next photograph" onClick={() => movePhotograph(1)}><ArrowRightIcon size={25} /></button></div></>}
      {musicActive && dialog && <div className="dialog-music"><MusicTransport onStop={restoreTransportFocus} onExpand={expandMusic} disabled={busy} /></div>}
    </dialog>
    <MusicPanel ref={musicPanelRef} reduced={reduced} routeKey={pathname} active={musicActive} onVisibilityChange={setMusicPanelOpen} />
    <noscript><div className="no-script"><h1>Yuhan Su</h1><p>Code, research and everyday curiosity.</p><p>This portfolio uses JavaScript for its interactive navigation. Enable JavaScript to explore the seven sections.</p></div></noscript>
  </div>;
}
