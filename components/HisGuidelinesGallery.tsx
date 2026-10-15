"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassPlusIcon, XIcon } from "@phosphor-icons/react";
import { hisGuidelines } from "@/content/his-guidelines";
import styles from "./HisGuidelinesGallery.module.css";

export default function HisGuidelinesGallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const enlarge = useRef<HTMLButtonElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const image = hisGuidelines[index];

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    // Scroll only the thumbnail strip; keep the reader's page position stable.
    const strip = thumbnails.current;
    const selected = strip?.querySelector<HTMLButtonElement>(`[data-index="${index}"]`);
    if (strip && selected) {
      if (selected.offsetLeft < strip.scrollLeft) strip.scrollLeft = selected.offsetLeft;
      else if (selected.offsetLeft + selected.offsetWidth > strip.scrollLeft + strip.clientWidth) {
        strip.scrollLeft = selected.offsetLeft + selected.offsetWidth - strip.clientWidth;
      }
    }
    viewport.current?.scrollTo(0, 0);
  }, [index, zoomed]);

  const select = (next: number) => { setIndex((next + hisGuidelines.length) % hisGuidelines.length); setZoomed(false); };
  const close = () => { setOpen(false); setZoomed(false); requestAnimationFrame(() => enlarge.current?.focus({ preventScroll: true })); };
  const counter = `${String(index + 1).padStart(2, "0")} / ${hisGuidelines.length}`;

  return <section className={styles.gallery} aria-labelledby="his-guidelines-title" aria-roledescription="carousel" onKeyDown={(event) => {
    if (open || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    select(index + (event.key === "ArrowLeft" ? -1 : 1));
  }}>
    <header className={styles.header}>
      <h3 id="his-guidelines-title">HIS 2.0 Change Guidelines</h3>
      <p>Annotated change requests, from clinical workflows to clinic operations.</p>
    </header>
    <figure>
      <button ref={enlarge} type="button" className={styles.stage} style={{ maxWidth: image.width }} aria-label={`Enlarge guideline ${image.code}: ${image.title}`} aria-haspopup="dialog" onClick={() => { setZoomed(false); setOpen(true); }}>
        <Image key={image.id} className={styles.image} src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized />
        <span className={styles.enlarge}><MagnifyingGlassPlusIcon size={18} aria-hidden="true" />Enlarge</span>
      </button>
      <figcaption className={styles.caption} aria-live="polite" aria-atomic="true">
        <p className={styles.title}><span className={styles.code}>{image.code}</span>{image.title}</p>
        <p className={styles.description}>{image.description}</p>
      </figcaption>
    </figure>
    <div className={styles.navigation}>
      <p>{hisGuidelines.length} annotated screens</p>
      <div className={styles.arrows}>
        <button type="button" className="icon-button" aria-label="Previous guideline" onClick={() => select(index - 1)}><ArrowLeftIcon size={23} aria-hidden="true" /></button>
        <span className={styles.counter} aria-label={`Guideline ${index + 1} of ${hisGuidelines.length}`}>{counter}</span>
        <button type="button" className="icon-button" aria-label="Next guideline" onClick={() => select(index + 1)}><ArrowRightIcon size={23} aria-hidden="true" /></button>
      </div>
    </div>
    <div ref={thumbnails} className={styles.thumbnails} role="group" aria-label="Select a change guideline">
      {hisGuidelines.map((item, position) => <button key={item.id} type="button" className={styles.thumbnail} data-index={position} aria-label={`Show guideline ${item.code}: ${item.title}`} aria-pressed={position === index} onClick={() => select(position)}>
        <Image src={item.src} alt="" width={108} height={62} sizes="108px" />
        <span>{item.code}</span>
      </button>)}
    </div>
    <dialog ref={dialog} className={styles.dialog} aria-label="HIS 2.0 guideline viewer" onCancel={(event) => { event.preventDefault(); close(); }} onKeyDown={(event) => {
      if (zoomed || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
      event.preventDefault();
      event.stopPropagation();
      select(index + (event.key === "ArrowLeft" ? -1 : 1));
    }}>
      {open && <>
        <div className={styles.viewerHeader}>
          <p>{image.code} · {image.title}</p>
          <div className={styles.viewerActions}>
            <button type="button" className={styles.zoom} aria-pressed={zoomed} onClick={() => setZoomed((value) => !value)}>{zoomed ? "Fit to view" : "Original size"}</button>
            <button type="button" className="icon-button" aria-label="Close guideline viewer" onClick={close}><XIcon size={27} weight="light" aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={viewport} className={styles.viewport} data-zoomed={zoomed} tabIndex={zoomed ? 0 : undefined} role={zoomed ? "region" : undefined} aria-label={zoomed ? "Original image; scroll to read annotations" : undefined}>
          <Image key={image.id} src={image.src} alt={image.alt} width={image.width} height={image.height} unoptimized style={zoomed ? { width: image.width, height: image.height } : undefined} />
        </div>
        <div className={styles.viewerFooter}>
          <button type="button" className="icon-button" aria-label="Previous guideline in viewer" onClick={() => select(index - 1)}><ArrowLeftIcon size={23} aria-hidden="true" /></button>
          <p aria-live="polite" aria-atomic="true"><span className={styles.counter}>{counter}</span><span>{zoomed ? "Scroll to explore the original image." : "Original annotations preserved."}</span></p>
          <button type="button" className="icon-button" aria-label="Next guideline in viewer" onClick={() => select(index + 1)}><ArrowRightIcon size={23} aria-hidden="true" /></button>
        </div>
      </>}
    </dialog>
  </section>;
}
