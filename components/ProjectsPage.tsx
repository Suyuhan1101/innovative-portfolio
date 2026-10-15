"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, PlayIcon, XIcon } from "@phosphor-icons/react";
import { additionalProjects, ardsMetrics, projectCases, type ProjectImage } from "@/content/projects";
import { caseStudiesFor, type CaseStudyEntry } from "@/content/case-studies";
import { useMusic } from "./MusicProvider";
import RevealText from "./RevealText";
import HisGuidelinesGallery from "./HisGuidelinesGallery";
import CaseStudyGallery from "./CaseStudyGallery";
import styles from "./ProjectsPage.module.css";

type Props = { onHome: (element: HTMLElement) => void; onPhoto: (index: number) => void; onCaseStudy: (entry: CaseStudyEntry, element: HTMLElement) => void };

function ProjectFigure({ image, detail = false }: { image: ProjectImage; detail?: boolean }) {
  return <figure className={detail ? styles.detailFigure : styles.preview}>
    <a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${image.alt}`}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={detail ? "(max-width: 900px) 90vw, 1000px" : "(max-width: 900px) 90vw, 480px"} /></a>
    <figcaption>{image.caption}<a href={image.src} target="_blank" rel="noreferrer" aria-label={`View full size: ${image.alt}`}><ArrowUpRightIcon size={17} /></a></figcaption>
  </figure>;
}

function ResearchPresentation({ visible }: { visible: boolean }) {
  const { pause, status } = useMusic();
  const [playing, setPlaying] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!visible || status === "playing" || status === "loading") setPlaying(false);
  }, [visible, status]);

  const close = () => {
    setPlaying(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  return <section className={styles.presentation} aria-labelledby="ards-presentation-title">
    <div className={styles.presentationHeader}>
      <div><h3 id="ards-presentation-title">Research presentation</h3><p>Cincinnati Children's · Division of Biomedical Informatics</p></div>
      {playing && visible && <button type="button" className="icon-button" aria-label="Close research presentation" onClick={close}><XIcon size={22} weight="light" aria-hidden="true" /></button>}
    </div>
    <div className={styles.presentationFrame}>
      {playing && visible ? <iframe ref={frame} title="ARDS research presentation" src="https://www.youtube-nocookie.com/embed/zc97gzaXZJo?start=50&autoplay=1&playsinline=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => frame.current?.focus()} /> : <button ref={trigger} type="button" className={styles.presentationCover} aria-label="Watch my presentation" onClick={() => { pause(); setPlaying(true); }}>
        <Image src="https://i.ytimg.com/vi/zc97gzaXZJo/hqdefault.jpg" alt="" width={480} height={360} unoptimized />
        <span className={styles.presentationPlay}><PlayIcon size={25} weight="fill" aria-hidden="true" /></span>
        <span className={styles.presentationWatch}>Watch my presentation</span>
      </button>}
    </div>
  </section>;
}

export function ProjectCaseStudy({ id, onPhoto }: { id: string; onPhoto: (index: number) => void }) {
      const project = projectCases.find((item) => item.id === id)!;
      return <section className={`${styles.content} ${styles.caseStudy}`} aria-labelledby={`${project.id}-title`}>
        <div className={styles.hero} data-reveal><ProjectFigure image={project.preview} detail /></div>
        <div className={styles.caseOverview}>
          <div className={styles.caseCopy}>
            <div className={styles.projectMeta} data-reveal><span className={styles.status}>{project.status}</span><span>{project.dates}</span></div>
            <h2 id={`${project.id}-title`} data-reveal>About the project</h2>
            <p className={styles.context} data-reveal>{project.context}</p>
            <p className={styles.role} data-reveal>{project.role}</p>
            <RevealText text={project.summary} />
            <ul className={styles.technologies} aria-label={`${project.title} technologies`} data-reveal>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
          </div>
        </div>
        <div className={styles.caseDetails}>
            <div className={styles.detailText}>{project.sections.map((section) => <section key={section.heading} data-reveal><h3>{section.heading}</h3>{section.paragraphs.map((text) => <p key={text}>{text}</p>)}</section>)}</div>
            {project.id === "ards" && <div className={styles.evaluation} data-reveal>
              <table><caption>Selected run · Report-level evaluation against LLM judge labels</caption><thead><tr><th scope="col">Metric</th><th scope="col">Value</th></tr></thead><tbody>{[["Accuracy", ardsMetrics.accuracyPercent], ["Precision", ardsMetrics.precisionPercent], ["Recall", ardsMetrics.recallPercent], ["F1", ardsMetrics.f1Percent]].map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}%</td></tr>)}</tbody></table>
              <p>{ardsMetrics.totalReportsJudged.toLocaleString("en-US")} reports judged · {ardsMetrics.binaryEvaluableReports.toLocaleString("en-US")} used for binary metrics · {ardsMetrics.excludedUncertainReports} uncertain labels excluded.</p>
            </div>}
            {project.detailImage && <ProjectFigure image={project.detailImage} detail />}
            {project.id === "clinic" && <HisGuidelinesGallery />}
            {project.id === "ards" && <><ResearchPresentation visible /><div className={styles.artifactLinks}><button type="button" className={`text-link ${styles.posterButton}`} onClick={() => onPhoto(4)}>View research poster<ArrowUpRightIcon size={18} /></button></div></>}
        </div>
      </section>;

}

export default function ProjectsPage({ onHome, onCaseStudy }: Props) {
  return <div className={styles.content}>
    <CaseStudyGallery id="project-cases" title="Research & software" kind="projects" items={caseStudiesFor("projects")} onOpen={onCaseStudy} />
    <section className={styles.additional} aria-labelledby="more-projects-title">
      <h2 id="more-projects-title" data-reveal>More things I've explored</h2>
      <div className={styles.additionalGrid}>{additionalProjects.map((project) => <article className={styles.smallProject} key={project.id} aria-labelledby={`${project.id}-title`}>
        <div data-reveal><span className={styles.status}>{project.status}</span><h3 id={`${project.id}-title`}>{project.title}</h3><p className={styles.context}>{project.context}</p><p className={styles.role}>{project.role}</p><p className={styles.dates}>{project.dates}</p></div>
        {project.paragraphs.map((text) => <RevealText key={text} text={text} />)}
        <ul className={styles.technologies} aria-label={`${project.title} topics`} data-reveal>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        {"link" in project && <a href={project.link.href} className="text-link" target="_blank" rel="noreferrer" data-reveal>{project.link.label}<ArrowUpRightIcon size={18} /></a>}
      </article>)}</div>
    </section>
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onHome(event.currentTarget); }}>Back to my world<ArrowRightIcon size={23} weight="light" /></a>
  </div>;
}
