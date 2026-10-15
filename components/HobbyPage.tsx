"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRightIcon, HeadphonesIcon, PlayIcon, PuzzlePieceIcon, RobotIcon } from "@phosphor-icons/react";
import { legoVideos, roboticsVideo, type HobbyVideo } from "@/content/hobby";
import MusicPage from "./MusicPage";
import styles from "./HobbyPage.module.css";

const categories = [
  { id: "music", label: "Music", icon: HeadphonesIcon },
  { id: "robotics", label: "Robotics", icon: RobotIcon },
  { id: "lego", label: "LEGO", icon: PuzzlePieceIcon },
] as const;
type Category = (typeof categories)[number]["id"];
type Props = { onHome: (element: HTMLElement) => void; onPhoto: (index: number) => void };

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

  return <figure className={styles.video}>
    <div className={styles.videoFrame} style={{ aspectRatio: `${clip.width} / ${clip.height}` } as CSSProperties}>
      <video ref={videoRef} width={clip.width} height={clip.height} poster={clip.poster} preload="none" playsInline muted controls={requested} tabIndex={requested ? 0 : -1} aria-label={clip.title} aria-hidden={!requested} onPlay={(event) => onPlay(event.currentTarget)} onError={() => setError(true)} />
      {!requested && <button type="button" className={styles.videoPlay} aria-label={`Play ${clip.title}`} onClick={play}><span><PlayIcon size={25} weight="fill" aria-hidden="true" /></span></button>}
      {error && <div className={styles.videoError}><p role="alert">The video couldn't load.</p><button type="button" onClick={play}>Try again</button></div>}
    </div>
    <figcaption><div><h3>{clip.title}</h3><p>{clip.description}</p></div><span className={styles.duration}>{clip.duration}</span></figcaption>
  </figure>;
}

export default function HobbyPage({ onHome, onPhoto }: Props) {
  const [category, setCategory] = useState<Category>("music");
  const activeVideo = useRef<HTMLVideoElement | null>(null);
  const playVideo = (video: HTMLVideoElement) => {
    if (activeVideo.current && activeVideo.current !== video) activeVideo.current.pause();
    activeVideo.current = video;
  };

  return <div className={styles.content}>
    <div className={styles.categories} role="group" aria-label="Choose a hobby" data-reveal>{categories.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-pressed={category === id} aria-controls="hobby-content" onClick={() => setCategory(id)}><Icon size={22} weight="light" aria-hidden="true" />{label}</button>)}</div>
    <div id="hobby-content" key={category}>
      {category === "music" ? <MusicPage onPhoto={onPhoto} /> : category === "robotics" ? <section aria-labelledby="hobby-robotics-title">
        <div className={styles.categoryHeader}><h2 id="hobby-robotics-title">Robotics</h2><p>My interest in coding started with LEGO EV3. I liked the moment a small machine actually did what I had imagined.</p></div>
        <Video clip={roboticsVideo} onPlay={playVideo} />
      </section> : <section aria-labelledby="hobby-lego-title">
        <div className={styles.categoryHeader}><h2 id="hobby-lego-title">LEGO in motion.</h2><p>Building mechanisms, then seeing them move. Two of my LEGO robots in action.</p></div>
        <div className={styles.legoVideos}>{legoVideos.map((clip) => <Video key={clip.id} clip={clip} onPlay={playVideo} />)}</div>
      </section>}
    </div>
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); onHome(event.currentTarget);
    }}>Back to my world<ArrowRightIcon size={23} weight="light" aria-hidden="true" /></a>
  </div>;
}
