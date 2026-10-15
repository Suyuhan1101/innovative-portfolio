"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowsOutSimpleIcon, PlayIcon, XIcon } from "@phosphor-icons/react";
import { communityOutreach, communityPage, communityTutoring } from "@/content/community";
import { caseStudiesFor, type CaseStudyEntry } from "@/content/case-studies";
import { type PageId } from "@/content/sections";
import { useMusic } from "./MusicProvider";
import RevealText from "./RevealText";
import CaseStudyGallery from "./CaseStudyGallery";
import styles from "./CommunityPage.module.css";

type Props = {
  onHome: (element: HTMLElement) => void;
  onNavigate: (page: PageId, element: HTMLElement) => void;
  onCaseStudy: (entry: CaseStudyEntry, element: HTMLElement) => void;
};

function ClinicFilm() {
  const { pause, status } = useMusic();
  const [playing, setPlaying] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const video = communityPage.video;

  useEffect(() => {
    if (status === "playing" || status === "loading") setPlaying(false);
  }, [status]);

  const close = () => {
    setPlaying(false);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  return <figure className={styles.film} data-reveal>
    <div className={styles.videoFrame}>
      {playing ? <iframe ref={frame} title={video.label} src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => frame.current?.focus()} /> : <button ref={trigger} type="button" className={styles.videoCover} aria-label="Watch my clinic introduction" onClick={() => { pause(); setPlaying(true); }}>
        <Image src={video.thumbnail} alt="" width={480} height={360} unoptimized />
        <span className={styles.playButton}><PlayIcon size={25} weight="fill" aria-hidden="true" /></span>
        <span className={styles.watchLabel}>Watch my clinic introduction</span>
      </button>}
    </div>
    <figcaption>
      <div><h3>{video.title}</h3><p>{video.description}</p></div>
      {playing && <button type="button" className="icon-button" aria-label="Close clinic introduction" onClick={close}><XIcon size={22} weight="light" aria-hidden="true" /></button>}
    </figcaption>
  </figure>;
}

function OutreachPhoto({ index, onOpen }: { index: number; onOpen: (index: number) => void }) {
  const photo = communityOutreach.photos[index];
  return <figure className={index === 0 ? styles.outreachFeatured : styles.outreachPhoto} role={index === 0 ? undefined : "listitem"} data-reveal>
          <button type="button" className={styles.photoButton} aria-label={`Open photograph: ${photo.title}`} onClick={() => onOpen(index)}>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={index === 0 ? "(max-width: 1050px) 90vw, 1000px" : "(max-width: 600px) 90vw, (max-width: 900px) 44vw, 320px"} />
            <span className={styles.expandHint} aria-hidden="true"><ArrowsOutSimpleIcon size={20} weight="light" /></span>
          </button>
          <figcaption>{photo.title}</figcaption>
        </figure>;
}

export function CommunityCaseStudy({ id, onOutreachPhoto }: { id: string; onOutreachPhoto: (index: number) => void }) {
  return <div className={styles.content}>
    {id === "tutoring" && <section className={styles.tutoring} aria-labelledby="community-tutoring-title">
      <figure className={styles.chapterImage} data-reveal>
        <Image src={communityTutoring.image.src} alt={communityTutoring.image.alt} width={communityTutoring.image.width} height={communityTutoring.image.height} unoptimized />
        <figcaption>{communityTutoring.image.caption}</figcaption>
      </figure>
      <div className={styles.tutoringHeader}>
        <div>
          <div className={styles.role} data-reveal><span>{communityTutoring.role}</span><span>{communityTutoring.location}</span></div>
          <h2 id="community-tutoring-title" data-reveal>{communityTutoring.title}</h2>
          <p className={styles.tutoringDates} data-reveal>{communityTutoring.dates}</p>
        </div>
        <RevealText text={communityTutoring.introduction} />
      </div>

      <div className={styles.tutoringDetails}>
        {communityTutoring.experiences.map((experience, index) => <section key={experience.heading} aria-labelledby={`community-tutoring-${index}`}>
          <h3 id={`community-tutoring-${index}`} data-reveal>{experience.heading}</h3>
          <RevealText text={experience.text} />
        </section>)}
      </div>
    </section>}

    {id === "clinic" && <><section className={styles.clinic} aria-labelledby="community-clinic-title">
      <ClinicFilm />
      <div className={styles.clinicCopy}>
        <div className={styles.role} data-reveal><span>{communityPage.role}</span><span>{communityPage.location}</span></div>
        <h2 id="community-clinic-title" data-reveal><span>{communityPage.clinic.name}</span>{communityPage.clinic.type}</h2>
        <RevealText text={communityPage.introduction} />
        <dl className={styles.dates} data-reveal>
          <div><dt>When</dt><dd>{communityPage.dates}</dd></div>
          <div><dt>Time at the clinic</dt><dd>{communityPage.duration}</dd></div>
        </dl>
      </div>
    </section>

    <div className={styles.experiences}>{communityPage.experiences.map((experience, index) => <section key={experience.heading} aria-labelledby={`community-experience-${index}`}>
      <h3 id={`community-experience-${index}`} data-reveal>{experience.heading}</h3>
      {experience.paragraphs.map((paragraph) => <RevealText key={paragraph} text={paragraph} />)}
    </section>)}</div></>}

    {id === "outreach" && <section className={styles.outreach} aria-labelledby="community-outreach-title">
      <div className={styles.outreachHero}><OutreachPhoto index={0} onOpen={onOutreachPhoto} /></div>
      <div className={styles.outreachHeader}>
        <div><h2 id="community-outreach-title" data-reveal>{communityOutreach.title}</h2><p className={styles.outreachMeta} data-reveal>{communityOutreach.location}<span>{communityOutreach.schedule}</span></p></div>
        <RevealText text={communityOutreach.description} />
      </div>
      <div className={styles.outreachPhotos} role="list" aria-label="Hospital outreach photographs">
        {communityOutreach.photos.slice(1).map((photo, index) => <OutreachPhoto key={photo.id} index={index + 1} onOpen={onOutreachPhoto} />)}
      </div>
    </section>}
  </div>;
}

export default function CommunityPage({ onHome, onNavigate, onCaseStudy }: Props) {
  return <div className={styles.content}>
    <CaseStudyGallery id="community-cases" title="Community activities" kind="community" items={caseStudiesFor("community")} onOpen={onCaseStudy} />

    <div className={styles.footer}>
      <a href="/projects" className="text-link" data-reveal onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); onNavigate("projects", event.currentTarget);
      }}>Related project: Clinic information system<ArrowRightIcon size={21} weight="light" aria-hidden="true" /></a>
      <a href="/" className="text-link back-home" data-reveal onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault(); onHome(event.currentTarget);
      }}>Back to my world<ArrowRightIcon size={23} weight="light" aria-hidden="true" /></a>
    </div>
  </div>;
}
