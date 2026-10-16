"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon, PlayIcon } from "@phosphor-icons/react";
import { legoVideos, roboticsVideo, swimmingVideos, type HobbyVideo } from "@/content/hobby";
import { caseStudiesFor, type CaseStudyEntry } from "@/content/case-studies";
import CaseStudyGallery from "./CaseStudyGallery";
import MusicPage from "./MusicPage";
import styles from "./HobbyPage.module.css";

type Props = { onHome: (element: HTMLElement) => void; onCaseStudy: (entry: CaseStudyEntry, element: HTMLElement) => void };

function Video({ clip, onPlay }: { clip: HobbyVideo; onPlay: (video: HTMLVideoElement) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    return () => { video?.pause(); };
  }, []);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setRequested(true);
    setError(false);
    if (!video.getAttribute("src") || video.error) {
      video.src = clip.src;
      video.load();
    }
    void video.play().then(() => video.focus({ preventScroll: true })).catch(() => setError(true));
  };

  return <figure className={styles.video} data-reveal>
    <div className={styles.videoFrame} style={{ aspectRatio: `${clip.width} / ${clip.height}` } as CSSProperties}>
      <video ref={videoRef} width={clip.width} height={clip.height} poster={clip.poster} preload="none" playsInline muted controls={requested} tabIndex={requested ? 0 : -1} aria-label={clip.title} aria-hidden={!requested} onPlay={(event) => onPlay(event.currentTarget)} onError={() => setError(true)} />
      {!requested && <button type="button" className={styles.videoPlay} aria-label={`Play ${clip.title}`} onClick={play}><span><PlayIcon size={25} weight="fill" aria-hidden="true" /></span></button>}
      {error && <div className={styles.videoError}><p role="alert">The video couldn't load.</p><button type="button" onClick={play}>Try again</button></div>}
    </div>
    <figcaption><div><h3>{clip.title}</h3><p>{clip.description}</p></div><span className={styles.duration}>{clip.duration}</span></figcaption>
  </figure>;
}

export function HobbyCategoryPage({ id, onPhoto }: { id: string; onPhoto: (index: number) => void }) {
  const activeVideo = useRef<HTMLVideoElement | null>(null);
  const playVideo = (video: HTMLVideoElement) => {
    if (activeVideo.current && activeVideo.current !== video) activeVideo.current.pause();
    activeVideo.current = video;
  };

  if (id === "music") return <MusicPage onPhoto={onPhoto} />;

  return <div className={styles.content}>
    {id === "sport" ? <section aria-labelledby="hobby-sport-title">
      <div className={styles.categoryHeader} data-reveal><h2 id="hobby-sport-title">Swimming</h2><p>A few moments in the pool, captured on video.</p></div>
      <div className={styles.swimmingVideos}>{swimmingVideos.map((clip) => <Video key={clip.id} clip={clip} onPlay={playVideo} />)}</div>
    </section> : <section aria-labelledby="hobby-robotics-title">
      <div className={styles.categoryHeader} data-reveal><h2 id="hobby-robotics-title">Robotics &amp; LEGO</h2><p>My interest in coding started with LEGO EV3. I liked the moment a small machine actually did what I had imagined.</p></div>
      <div className={styles.competitionVideo}><Video clip={roboticsVideo} onPlay={playVideo} /></div>
      <section className={styles.legoSection} aria-labelledby="hobby-lego-title">
        <div className={styles.categoryHeader} data-reveal><h2 id="hobby-lego-title">LEGO in motion.</h2><p>Building mechanisms, then seeing them move. Two of my LEGO robots in action.</p></div>
        <div className={styles.legoVideos}>{legoVideos.map((clip) => <Video key={clip.id} clip={clip} onPlay={playVideo} />)}</div>
      </section>
    </section>}
  </div>;
}

export default function HobbyPage({ onHome, onCaseStudy }: Props) {
  return <div className={styles.content}>
    <CaseStudyGallery id="hobby-categories" title="Music, sport & making" kind="hobby" items={caseStudiesFor("hobby")} actionLabel="Explore" onOpen={onCaseStudy} />
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); onHome(event.currentTarget);
    }}>Back to my world<ArrowRightIcon size={23} weight="light" aria-hidden="true" /></a>
  </div>;
}
