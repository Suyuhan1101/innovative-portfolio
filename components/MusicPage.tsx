"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowUpRightIcon, ArrowsOutSimpleIcon, PauseIcon, PlayIcon, XIcon } from "@phosphor-icons/react";
import { musicPage } from "@/content/music";
import { musicTracks } from "@/content/music-tracks";
import { slides } from "@/content/media";
import { useMusic } from "./MusicProvider";
import { MusicPlayer, timeLabel } from "./MusicPlayer";
import RevealText from "./RevealText";
import styles from "./MusicPage.module.css";

type Props = { onHome: (element: HTMLElement) => void; onPhoto: (index: number) => void };

function Performances() {
  const music = useMusic();
  const [activeId, setActiveId] = useState<string | null>(null);
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({});
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Starting the shared music again also stops a competition video.
    if (music.status === "playing" || music.status === "loading") setActiveId(null);
  }, [music.status]);

  const open = (id: string) => { music.pause(); setActiveId(id); };
  const close = (id: string) => {
    setActiveId(null);
    requestAnimationFrame(() => buttons.current[id]?.focus());
  };

  return <section className={styles.performances} aria-labelledby="music-performances-title">
    <div className={styles.sectionHeader} data-reveal><h2 id="music-performances-title">Early performances</h2><p>Two piano competitions from my childhood.</p></div>
    <div className={styles.performanceGrid}>
      {musicPage.performances.map((performance) => <article key={performance.id} className={styles.performance} data-reveal>
        <div className={styles.videoFrame}>
          {activeId === performance.id ? <iframe ref={frame} title={performance.label} src={`https://www.youtube-nocookie.com/embed/${performance.id}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" onLoad={() => frame.current?.focus()} /> : <button type="button" className={styles.videoCover} ref={(element) => { buttons.current[performance.id] = element; }} aria-label={`Watch ${performance.label}`} onClick={() => open(performance.id)}>
            <Image src={performance.thumbnail} alt="" width={480} height={360} unoptimized />
            <span className={styles.playButton}><PlayIcon size={25} weight="fill" aria-hidden="true" /></span>
            <span className={styles.watchLabel}>Watch performance</span>
          </button>}
        </div>
        <div className={styles.performanceCaption}>
          <div><h3>{performance.label}</h3><p>{performance.title}</p></div>
          {activeId === performance.id && <button type="button" className="icon-button" aria-label={`Close ${performance.year} performance`} onClick={() => close(performance.id)}><XIcon size={22} weight="light" aria-hidden="true" /></button>}
        </div>
        <a href={`https://www.youtube.com/watch?v=${performance.id}`} target="_blank" rel="noopener noreferrer" className={styles.youtubeLink}>Open on YouTube<ArrowUpRightIcon size={17} weight="light" aria-hidden="true" /><span className="sr-only">: {performance.label} (opens a new tab)</span></a>
      </article>)}
    </div>
  </section>;
}

function Playlist() {
  const music = useMusic();
  const running = music.status === "playing" || music.status === "loading";
  return <section className={styles.pieces} aria-labelledby="music-pieces-title">
    <div className={styles.sectionHeader} data-reveal><h2 id="music-pieces-title">Pieces I love to play</h2><p>Choose a recording to listen.</p></div>
    <ul>{musicTracks.map((track) => {
      const selected = track.id === music.track.id;
      const playing = selected && running;
      return <li key={track.id} data-reveal><button type="button" className={styles.piece} data-selected={selected && music.started} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`} onClick={() => playing ? music.pause() : music.playTrack(track.id)}>
        <Image src={track.cover} alt="" width={60} height={60} sizes="60px" />
        <span className={styles.pieceCopy}><span className={styles.pieceTitle}>{track.title}</span><span className={styles.pieceArtist}>{track.artist}</span></span>
        <span className={styles.pieceDuration} aria-hidden="true">{timeLabel(track.duration)}</span>
        <span className={styles.piecePlay}>{playing ? <PauseIcon size={19} weight="fill" aria-hidden="true" /> : <PlayIcon size={19} weight="fill" aria-hidden="true" />}</span>
      </button></li>;
    })}</ul>
  </section>;
}

export default function MusicPage({ onHome, onPhoto }: Props) {
  const concertIndex = slides.findIndex((slide) => slide.name === "04-orchestra");
  const concert = slides[concertIndex];
  return <div className={styles.content}>
    <section className={styles.introduction} aria-labelledby="music-introduction-title">
      <div><h2 id="music-introduction-title" data-reveal>{musicPage.title}</h2><RevealText text={musicPage.introduction} /></div>
      <dl className={styles.instruments} data-reveal>{musicPage.instruments.map((instrument) => <div key={instrument.label}><dt>{instrument.label}</dt><dd>{instrument.value}{"detail" in instrument && <span>{instrument.detail}</span>}</dd></div>)}</dl>
    </section>

    <section className={styles.practice} aria-labelledby="music-practice-title">
      <h2 id="music-practice-title" data-reveal>{musicPage.practiceTitle}</h2><RevealText text={musicPage.practice} />
    </section>

    <Performances />

    <Playlist />

    <section className={styles.listening} aria-labelledby="music-listening-title">
      <div className={styles.listeningCopy}><h2 id="music-listening-title" data-reveal>What I listen to</h2>{musicPage.listening.map((paragraph) => <RevealText key={paragraph} text={paragraph} />)}</div>
      <MusicPlayer />
    </section>

    <section className={styles.concert} aria-labelledby="music-concert-title">
      <div><h2 id="music-concert-title" data-reveal>An evening of live music</h2><RevealText text={musicPage.concert} /></div>
      <figure data-reveal><button type="button" className={styles.concertImage} aria-label="Open photograph of my friend's symphonic concert" onClick={() => onPhoto(concertIndex)}><Image src={concert.src} alt={concert.alt} width={concert.width} height={concert.height} sizes="(max-width: 700px) 90vw, 48vw" /><span><ArrowsOutSimpleIcon size={19} weight="light" aria-hidden="true" />View full size</span></button></figure>
    </section>

    <a href="/" className={`text-link back-home ${styles.backHome}`} data-reveal onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); onHome(event.currentTarget);
    }}>Back to my world<ArrowRightIcon size={23} weight="light" aria-hidden="true" /></a>
  </div>;
}
