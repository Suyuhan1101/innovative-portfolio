// A relaxed, continuous rhythm. Durations are seconds; line delays are capped
// so adding longer content doesn't leave the page locked for an excessive time.
export const motionTiming = {
  welcomeMove: 1.25,
  introExit: 0.24,
  headerEnter: 0.36,
  headerStagger: 0.065,
  homeEnter: 0.7,
  homeStagger: 0.2,
  contentExit: 0.55,
  menuCover: 0.8,
  menuItemEnter: 0.42,
  menuItemStagger: 0.035,
  menuItemsExit: 0.45,
  menuExit: 0.65,
  coverExit: 0.32,
  tileMove: 1.1,
  tileLand: 0.2,
  homeSurfaceMorph: 0.6,
  homeFaceExit: 0.28,
  homeFaceExitDelay: 0.08,
  homeTitleMorph: 0.7,
  homeTitleMorphDelay: 0.14,
  titleEnter: 0.52,
  bodyEnter: 0.5,
  lineStagger: 0.08,
  maxLineStaggerSpan: 0.8,
} as const;

type Bezier = [number, number, number, number];
export const motionEase: Record<"move" | "reveal" | "exit", Bezier> = {
  move: [0.45, 0, 0.2, 1],
  reveal: [0.3, 0, 0.22, 1],
  exit: [0.4, 0, 0.6, 1],
};
