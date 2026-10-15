export type PlayMode = "once" | "loop" | "shuffle";
export const playModes: readonly PlayMode[] = ["once", "loop", "shuffle"];
export const modeLabels: Record<PlayMode, string> = { once: "Play once", loop: "Loop all", shuffle: "Shuffle" };
export const modeDescriptions: Record<PlayMode, string> = {
  once: "Stop when this track finishes.",
  loop: "Play the whole list in order, then start again.",
  shuffle: "Keep playing other tracks at random.",
};

export function nextTrackIndex(current: number, count: number, mode: PlayMode, ended = false, random = Math.random): number | null {
  if (count < 1 || (ended && mode === "once")) return null;
  if (count === 1) return 0;
  if (mode === "shuffle") {
    // Choose from every index except the current one, without retry loops.
    const choice = Math.min(count - 2, Math.max(0, Math.floor(random() * (count - 1))));
    return choice >= current ? choice + 1 : choice;
  }
  return (current + 1) % count;
}

export function nextPlayMode(mode: PlayMode): PlayMode {
  return playModes[(playModes.indexOf(mode) + 1) % playModes.length];
}
