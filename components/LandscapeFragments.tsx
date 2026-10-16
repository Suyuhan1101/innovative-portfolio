"use client";

import { useEffect, useRef } from "react";
import type { IntroStage } from "./InstrumentIntro";
import { createLandscapeStream } from "./landscape-particles";
import styles from "./InstrumentIntro.module.css";

type Props = { reduced: boolean; stage: IntroStage };
const directions = ["up", "down"] as const;
const photographs = ["snow", "lake", "canyon", "valley"];

export default function LandscapeFragments({ reduced, stage }: Props) {
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const mode = useRef({ reduced, stage });
  const update = useRef<(() => void) | null>(null);

  useEffect(() => {
    let disposed = false, frame = 0, seconds = 0;
    let previous: number | null = null;
    let streams: ReturnType<typeof createLandscapeStream>[] = [];
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = null; };
    const draw = () => streams.forEach(stream => stream.draw(seconds));
    const running = () => !mode.current.reduced && mode.current.stage !== "exiting" && !document.hidden;
    const tick = (now: number) => {
      frame = 0;
      if (disposed || !running()) return;
      if (previous !== null) seconds += Math.min((now - previous) / 1000, .05);
      previous = now;
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      stop();
      if (!streams.length || disposed || document.hidden) return;
      draw();
      if (running()) frame = requestAnimationFrame(tick);
    };
    const resize = () => { streams.forEach(stream => stream.resize()); sync(); };
    const observer = new ResizeObserver(resize);
    update.current = sync;
    document.addEventListener("visibilitychange", sync);

    void Promise.all(photographs.map(async name => {
      const image = new window.Image();
      image.src = `/media/intro/${name}.webp`;
      try { await image.decode(); return image; } catch { return null; }
    })).then(loaded => {
      if (disposed) return;
      const images = loaded.filter((image): image is HTMLImageElement => image !== null);
      if (!images.length) return;
      streams = canvases.current.flatMap((canvas, index) => canvas ? [createLandscapeStream(canvas, images, directions[index])] : []);
      canvases.current.forEach(canvas => { if (canvas) observer.observe(canvas); });
      resize();
    });

    return () => {
      disposed = true; stop(); observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      update.current = null;
      streams.forEach(stream => stream.dispose());
    };
  }, []);

  useEffect(() => { mode.current = { reduced, stage }; update.current?.(); }, [reduced, stage]);

  return <div className={styles.landscapeFlow} aria-hidden="true" data-landscape-flow data-flow-state={reduced ? "static" : "moving"}>
    {directions.map((direction, index) => <div key={direction} className={styles.landscapeStream} data-flow-direction={direction}>
      <canvas className={styles.landscapeCanvas} ref={node => { canvases.current[index] = node; }} />
    </div>)}
  </div>;
}
