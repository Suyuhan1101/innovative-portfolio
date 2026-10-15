"use client";

import Image from "next/image";
import { ArrowsOutSimpleIcon, ArrowRightIcon, PauseIcon, PlayIcon, RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, SpeakerHighIcon, XIcon } from "@phosphor-icons/react";
import { modeDescriptions, modeLabels, nextPlayMode } from "./music-playback";
import { useMusic } from "./MusicProvider";

export const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
const statusText = (status: string) => status === "playing" ? "Playing" : status === "loading" ? "Loading…" : status === "paused" ? "Paused" : status === "ended" ? "Finished · play again" : "Press play when you feel like listening.";

function ModeButton({ compact = false, disabled = false }: { compact?: boolean; disabled?: boolean }) {
  const { mode, cycleMode } = useMusic();
  const Icon = mode === "shuffle" ? ShuffleIcon : mode === "loop" ? RepeatIcon : ArrowRightIcon;
  return <button type="button" className={`music-mode ${compact ? "is-compact" : ""}`} data-mode={mode} disabled={disabled} onClick={cycleMode} aria-label={`Playback mode: ${modeLabels[mode]}. Switch to ${modeLabels[nextPlayMode(mode)]}.`} title={`${modeLabels[mode]}: ${modeDescriptions[mode]} Click to switch.`}><Icon size={21} aria-hidden="true" /><span className={compact ? "sr-only" : undefined}>{modeLabels[mode]}</span></button>;
}

export function MusicPlayer({ floating = false }: { floating?: boolean }) {
  const music = useMusic();
  const { track } = music;
  const running = music.status === "playing" || music.status === "loading";
  return <section className={`music-player ${floating ? "is-floating" : ""}`} aria-label="Music player" data-reveal={floating ? undefined : true}>
    <div className="music-artwork"><Image src={track.cover} alt={`Cover artwork for ${track.title}`} width={640} height={640} sizes="(max-width: 900px) 220px, 260px" /><span>A little atmosphere.</span></div>
    <div className="music-track"><div><h3>{track.title}</h3><p>{track.artist}</p></div><button type="button" className="music-play" aria-label={`${running ? "Pause" : music.status === "error" ? "Retry" : "Play"} ${track.title}`} onClick={running ? music.pause : music.play}>{running ? <PauseIcon size={25} weight="fill" aria-hidden="true" /> : <PlayIcon size={25} weight="fill" aria-hidden="true" />}</button></div>
    <p className={`music-status ${music.error ? "music-error" : ""}`} role="status">{music.error ?? statusText(music.status)}</p>
    <label className="music-progress"><span className="sr-only">Track position</span><input type="range" min={0} max={music.duration} step={.1} value={Math.min(music.time, music.duration)} disabled={!music.ready} onChange={(event) => music.seek(Number(event.target.value))} aria-valuetext={`${timeLabel(music.time)} of ${timeLabel(music.duration)}`} /><span className="music-times" aria-hidden="true"><span>{timeLabel(music.time)}</span><span>{timeLabel(music.duration)}</span></span></label>
    <div className="music-options"><ModeButton /><div className="music-skips"><button type="button" className="icon-button" aria-label="Previous track" onClick={music.previous}><SkipBackIcon size={23} weight="fill" aria-hidden="true" /></button><button type="button" className="icon-button" aria-label="Next track" onClick={music.next}><SkipForwardIcon size={23} weight="fill" aria-hidden="true" /></button></div></div>
    <span className="sr-only" role="status">{modeLabels[music.mode]}. {modeDescriptions[music.mode]}</span>
    <label className="music-volume"><SpeakerHighIcon size={20} aria-hidden="true" /><span className="sr-only">Music volume</span><input type="range" min={0} max={1} step={.05} value={music.volume} onChange={(event) => music.setVolume(Number(event.target.value))} aria-valuetext={`${Math.round(music.volume * 100)} percent`} /><span aria-hidden="true">{Math.round(music.volume * 100)}%</span></label>
  </section>;
}

export function MusicTransport({ onStop, onExpand, disabled = false }: { onStop: () => void; onExpand: (element: HTMLElement) => void; disabled?: boolean }) {
  const music = useMusic();
  const { track } = music;
  const running = music.status === "playing" || music.status === "loading";
  return <section className="music-transport" aria-label="Music controls" data-music-dock onClick={(event) => { if (!disabled && !(event.target as HTMLElement).closest("button")) onExpand(event.currentTarget); }}>
    <button type="button" className="music-open" aria-label="Expand music player" aria-haspopup="dialog" aria-controls="music-player-panel" title="Expand player" disabled={disabled} onClick={(event) => onExpand(event.currentTarget)}><span className="music-small-cover"><Image src={track.cover} alt="" width={44} height={44} /><ArrowsOutSimpleIcon className="music-expand-hint" size={15} aria-hidden="true" /></span><span className="music-transport-copy"><strong>{track.title}</strong><span>{music.error ? "Couldn't load · retry" : `${track.artist} · ${music.status === "loading" ? "Loading…" : music.status === "paused" ? "Paused" : music.status === "ended" ? "Finished" : timeLabel(music.time)}`}</span></span></button>
    <span className="sr-only" role="status">{music.error ?? statusText(music.status)}</span>
    <ModeButton compact disabled={disabled} />
    <button type="button" className="music-play" aria-label={`${running ? "Pause" : music.status === "error" ? "Retry" : "Play"} ${track.title}`} onClick={running ? music.pause : music.play}>{running ? <PauseIcon size={20} weight="fill" aria-hidden="true" /> : <PlayIcon size={20} weight="fill" aria-hidden="true" />}</button>
    <button type="button" className="icon-button music-stop" aria-label="Stop music and close player" onClick={() => { music.stop(); onStop(); }}><XIcon size={20} aria-hidden="true" /></button>
  </section>;
}
