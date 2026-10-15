"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowsOutSimpleIcon, ArrowRightIcon, PlayIcon } from "@phosphor-icons/react";
import { galleryCategories, galleryPhotos, galleryVideo, type GalleryCategory } from "@/content/gallery";
import { useMusic } from "./MusicProvider";
import RevealText from "./RevealText";
import styles from "./GalleryPage.module.css";

type Props = { onHome: (element: HTMLElement) => void; onPhoto: (index: number, ids: string[]) => void };

function GalleryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const music = useMusic();
  useEffect(() => { const video = videoRef.current; return () => { video?.pause(); }; }, []);
  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setRequested(true); setError(null);
    if (!video.getAttribute("src") || video.error) { video.src = galleryVideo.src; video.load(); }
    void video.play().catch(() => setError("The video couldn't start. Press play to try again."));
  };
  return <section className={styles.videoSection} aria-labelledby="gallery-video-title">
    <div className={styles.videoCopy}><h2 id="gallery-video-title" data-reveal>{galleryVideo.title}</h2><RevealText text={galleryVideo.description} /><p className={styles.videoMeta} data-reveal>{galleryVideo.duration} · A short video from my internship</p></div>
    <div className={styles.videoFrame} data-reveal>
      <video ref={videoRef} width={galleryVideo.width} height={galleryVideo.height} poster={galleryVideo.poster} preload="none" playsInline controls={requested} aria-hidden={!requested} aria-label="Preparing herbs during my traditional Chinese medicine internship" onPlay={() => { if (music.status === "playing" || music.status === "loading") music.pause(); }} onError={() => setError("The video couldn't load. Press play to try again.")} />
      {!requested && <button type="button" className={styles.videoPlay} aria-label="Play internship video" onClick={play}><PlayIcon size={29} weight="fill" /><span>Play video</span></button>}
      {error && <div className={styles.videoError}><p role="alert">{error}</p><button type="button" onClick={play}>Try again</button></div>}
    </div>
  </section>;
}

export default function GalleryPage({ onHome, onPhoto }: Props) {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const photographs = category === "all" ? galleryPhotos : galleryPhotos.filter((photo) => photo.category === category);
  return <div className={styles.content}>
    <div className={styles.introduction}><RevealText text="Photographs from my travels and the details I stop to notice. I like high places, open views and small things worth a closer look." /></div>
    <div className={styles.filterBar}>
      <div className={styles.filters} role="group" aria-label="Filter photographs" data-reveal>{galleryCategories.map((filter) => {
        const count = filter.id === "all" ? galleryPhotos.length : galleryPhotos.filter((photo) => photo.category === filter.id).length;
        return <button type="button" key={filter.id} className={styles.filter} aria-pressed={category === filter.id} aria-controls="gallery-photographs" onClick={() => setCategory(filter.id)}>{filter.title}<span>{count}</span></button>;
      })}</div>
      <div className={styles.mediaSummary} data-reveal><p className={styles.photoCount} role="status">{photographs.length} photographs</p><a href="#gallery-video-title" className={styles.videoJump}><PlayIcon size={15} weight="fill" />Watch video</a></div>
    </div>
    <div className={styles.photoGrid} id="gallery-photographs" key={category} role="list" aria-label="Photographs by Yuhan Su">
      {photographs.map((photo) => <figure className={styles.photograph} key={photo.id} role="listitem" data-reveal>
        <button type="button" aria-label={`Open photograph: ${photo.title}`} className={styles.photoButton} style={{ aspectRatio: photo.thumbnailRatio }} onClick={() => onPhoto(photographs.findIndex((item) => item.id === photo.id), photographs.map((item) => item.id))}>
          <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 600px) 92vw, (max-width: 1000px) 45vw, 30vw" style={{ objectPosition: photo.position ?? "50% 50%" }} />
          <span className={styles.expandHint} aria-hidden="true"><ArrowsOutSimpleIcon size={19} weight="light" /></span>
        </button>
        <figcaption><span>{photo.title}</span>{photo.place && <span className={styles.photoPlace}>{photo.place}</span>}</figcaption>
      </figure>)}
    </div>
    <GalleryVideo />
    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); onHome(event.currentTarget); }}>Back to my world<ArrowRightIcon size={23} weight="light" /></a>
  </div>;
}
