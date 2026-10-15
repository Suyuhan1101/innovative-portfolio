"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { slides } from "@/content/media";
import { sections, PageId, pageHref } from "@/content/sections";
import { TileFace } from "./Tile";
import HomeHeading from "./HomeHeading";

type Props = { slide: number; selectSlide: (index: number) => void; paused: boolean; togglePause: () => void; navigate: (page: PageId, element: HTMLElement, origin?: "home" | "header") => void; reduced: boolean; hiddenTile: PageId | null; hiddenTitle: boolean };

export default function HomePage({ slide, selectSlide, paused, togglePause, navigate, reduced, hiddenTile, hiddenTitle }: Props) {
  const image = slides[slide];
  return <>
    <section className="home-hero" data-home-reveal>
      <div className="hero-copy"><HomeHeading hidden={hiddenTitle} /><p className="home-tagline">Code, research and everyday curiosity.</p></div>
      <div className="hero-gallery">
        <figure className="slide-frame" aria-label="Personal photo slideshow" data-slide-index={slide}>
          <AnimatePresence initial={false} mode="sync"><motion.div className="slide-photo" key={image.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.6 }}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 92vw, 50vw" priority={slide === 0} style={{ objectFit: image.fit }} /></motion.div></AnimatePresence>
          <figcaption>{image.label}</figcaption>
        </figure>
        <div className="slideshow-controls"><div className="slide-dots" role="group" aria-label="Choose a photograph">{slides.map((item, index) => <button key={item.name} className={`slide-dot ${slide === index ? "selected" : ""}`} aria-label={`Photo ${index + 1}: ${item.alt}`} aria-pressed={slide === index} onClick={() => selectSlide(index)} />)}</div><button className="slideshow-pause icon-button" onClick={togglePause} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>{paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}</button></div>
      </div>
    </section>
    <nav className="home-tiles" aria-label="Explore my world" data-home-reveal>{sections.map(({ id }) => <a className="tile" href={pageHref(id)} key={id} data-page={id} style={{ visibility: hiddenTile === id ? "hidden" : "visible" }} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(id, event.currentTarget, "home"); }}><TileFace page={id} interactive /></a>)}</nav>
    <section className="featured-project" data-home-reveal>
      <div><p className="feature-label">Featured project</p><h2>Making sense of clinical text</h2><p className="project-stat">ARDS report extraction · 2,000 reports</p><p className="project-keywords">Schema · Inclusion / Exclusion · LLM judge · Error analysis</p><a className="text-link" href="/projects" onClick={(event) => { event.preventDefault(); navigate("projects", event.currentTarget, "header"); }}>Read the project <ArrowRightIcon aria-hidden="true" size={25} weight="light" /></a></div>
      <div className="feature-art"><Image src="/media/research-process.png" alt="Research process: include imaging evidence, exclude unrelated findings, and evaluate with an independent LLM judge" fill sizes="(max-width: 900px) 92vw, 50vw" /></div>
    </section>
  </>;
}
