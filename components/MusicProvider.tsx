"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { musicTracks, type MusicTrack } from "@/content/music-tracks";
import { nextPlayMode, nextTrackIndex, type PlayMode } from "./music-playback";

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";
type Playback = { status: Status; time: number; duration: number; volume: number; ready: boolean; started: boolean; error: string | null };
type Selection = { track: MusicTrack; mode: PlayMode };
type Actions = { play: () => void; pause: () => void; playTrack: (id: string) => void; next: () => void; previous: () => void; cycleMode: () => void; seek: (time: number) => void; setVolume: (volume: number) => void; stop: () => void };
const initial: Playback = { status: "idle", time: 0, duration: musicTracks[0].duration, volume: .65, ready: false, started: false, error: null };
const PlaybackContext = createContext<Playback | null>(null);
const SelectionContext = createContext<Selection | null>(null);
const ActionsContext = createContext<Actions | null>(null);
const ActiveContext = createContext(false);

export function useMusicSelection() {
  const selection = useContext(SelectionContext);
  if (!selection) throw new Error("Music selection needs a MusicProvider.");
  return selection;
}

export function useMusic() {
  const playback = useContext(PlaybackContext);
  const actions = useContext(ActionsContext);
  const selection = useMusicSelection();
  if (!playback || !actions) throw new Error("Music controls need a MusicProvider.");
  return { ...playback, ...selection, ...actions };
}

// The shell subscribes only to visibility; the cover animation only to selection.
export const useMusicActive = () => useContext(ActiveContext);

export default function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const intent = useRef<"play" | "pause" | "stop">("stop");
  const attempt = useRef(0);
  const indexRef = useRef(0);
  const modeRef = useRef<PlayMode>("once");
  const historyRef = useRef<number[]>([]);
  const volumeRef = useRef(initial.volume);
  const [playback, setPlayback] = useState<Playback>(initial);
  const [selection, setSelection] = useState<Selection>({ track: musicTracks[0], mode: "once" });

  const currentSource = useCallback(() => {
    const audio = audioRef.current;
    return !!audio && audio.currentSrc === new URL(musicTracks[indexRef.current].src, window.location.href).href;
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const track = musicTracks[indexRef.current];
    intent.current = "play";
    const id = ++attempt.current;
    setPlayback((state) => ({ ...state, started: true, status: "loading", error: null }));
    // Setting a mode or browsing a page never loads audio; playing is explicit.
    if (audio.getAttribute("src") !== track.src || audio.error) {
      audio.setAttribute("src", track.src);
      audio.volume = volumeRef.current;
      audio.load();
    }
    if (audio.ended) audio.currentTime = 0;
    void audio.play().catch((error: unknown) => {
      if (id !== attempt.current || intent.current !== "play") return;
      const blocked = error instanceof DOMException && error.name === "NotAllowedError";
      intent.current = "pause";
      setPlayback((state) => ({ ...state, status: "error", error: blocked ? "Playback was blocked. Press play to try again." : "Music couldn't load. Press play to try again." }));
    });
  }, []);

  const pause = useCallback(() => {
    ++attempt.current;
    if (intent.current === "stop") return;
    intent.current = "pause";
    audioRef.current?.pause();
    setPlayback((state) => ({ ...state, status: "paused" }));
  }, []);

  const selectTrack = useCallback((index: number, autoplay: boolean, remember = true) => {
    if (remember && index !== indexRef.current) historyRef.current = [...historyRef.current.slice(-49), indexRef.current];
    ++attempt.current;
    intent.current = "stop";
    const audio = audioRef.current;
    audio?.pause();
    audio?.removeAttribute("src");
    audio?.load();
    indexRef.current = index;
    const track = musicTracks[index];
    setSelection((state) => ({ ...state, track }));
    setPlayback((state) => ({ ...initial, duration: track.duration, volume: volumeRef.current, started: state.started || autoplay, status: state.started ? "paused" : "idle" }));
    if (autoplay) play();
  }, [play]);

  const playTrack = useCallback((id: string) => {
    const index = musicTracks.findIndex((track) => track.id === id);
    if (index < 0) return;
    if (index === indexRef.current) play();
    else selectTrack(index, true);
  }, [play, selectTrack]);

  const next = useCallback(() => {
    const index = nextTrackIndex(indexRef.current, musicTracks.length, modeRef.current);
    if (index !== null) selectTrack(index, intent.current === "play");
  }, [selectTrack]);

  const previous = useCallback(() => {
    const index = historyRef.current.pop() ?? (indexRef.current + musicTracks.length - 1) % musicTracks.length;
    selectTrack(index, intent.current === "play", false);
  }, [selectTrack]);

  const cycleMode = useCallback(() => {
    modeRef.current = nextPlayMode(modeRef.current);
    setSelection((state) => ({ ...state, mode: modeRef.current }));
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !currentSource() || audio.readyState === 0 || !Number.isFinite(audio.duration)) return;
    const position = Math.min(audio.duration, Math.max(0, time));
    audio.currentTime = position;
    setPlayback((state) => ({ ...state, time: position, status: audio.ended ? "ended" : state.status === "ended" ? "paused" : state.status }));
  }, [currentSource]);

  const setVolume = useCallback((volume: number) => {
    const next = Math.max(0, Math.min(1, volume));
    volumeRef.current = next;
    if (audioRef.current) audioRef.current.volume = next;
    setPlayback((state) => ({ ...state, volume: next }));
  }, []);

  const stop = useCallback(() => {
    ++attempt.current;
    intent.current = "stop";
    const audio = audioRef.current;
    audio?.pause();
    audio?.removeAttribute("src");
    audio?.load();
    setPlayback({ ...initial, duration: musicTracks[indexRef.current].duration, volume: volumeRef.current });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      ++attempt.current;
      intent.current = "stop";
      audio?.pause();
      audio?.removeAttribute("src");
      audio?.load();
    };
  }, []);

  const actions = useMemo(() => ({ play, pause, playTrack, next, previous, cycleMode, seek, setVolume, stop }), [play, pause, playTrack, next, previous, cycleMode, seek, setVolume, stop]);
  return <ActionsContext.Provider value={actions}><SelectionContext.Provider value={selection}><ActiveContext.Provider value={playback.started}><PlaybackContext.Provider value={playback}>
    {children}
    <audio ref={audioRef} preload="none" hidden
      onPlaying={() => {
        if (intent.current !== "play") { audioRef.current?.pause(); return; }
        if (currentSource() && !audioRef.current?.paused) setPlayback((state) => ({ ...state, status: "playing", error: null }));
      }}
      onWaiting={() => { if (intent.current === "play" && currentSource()) setPlayback((state) => ({ ...state, status: "loading" })); }}
      onPause={() => { if (intent.current === "pause" && currentSource()) setPlayback((state) => state.status === "error" ? state : { ...state, status: "paused" }); }}
      onLoadedMetadata={() => {
        const duration = audioRef.current?.duration;
        if (intent.current !== "stop" && currentSource() && duration && Number.isFinite(duration)) setPlayback((state) => ({ ...state, duration, ready: true }));
      }}
      onTimeUpdate={() => { if (intent.current !== "stop" && currentSource()) setPlayback((state) => ({ ...state, time: audioRef.current?.currentTime ?? 0 })); }}
      onVolumeChange={() => { const volume = audioRef.current?.volume; if (volume !== undefined) setPlayback((state) => ({ ...state, volume })); }}
      onEnded={() => {
        if (intent.current !== "play" || !currentSource() || !audioRef.current?.ended) return;
        const index = nextTrackIndex(indexRef.current, musicTracks.length, modeRef.current, true);
        if (index !== null) selectTrack(index, true);
        else { intent.current = "pause"; setPlayback((state) => ({ ...state, status: "ended", time: state.duration })); }
      }}
      onError={() => {
        if (intent.current === "stop" || !currentSource() || !audioRef.current?.error) return;
        intent.current = "pause";
        setPlayback((state) => ({ ...state, status: "error", ready: false, error: "Music couldn't load. Press play to try again." }));
      }} />
  </PlaybackContext.Provider></ActiveContext.Provider></SelectionContext.Provider></ActionsContext.Provider>;
}
