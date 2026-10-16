import swimmingMedia from "./swimming-videos.json";
import { slides } from "./media";

export type HobbyVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: string;
};

export const roboticsVideo: HobbyVideo = {
  id: "robotics-competition",
  title: "On the competition floor",
  description: "A recording from a robotics competition.",
  src: "/media/hobby/robotics-competition.mp4",
  poster: "/media/hobby/robotics-competition.jpg",
  width: 960,
  height: 544,
  duration: "2:57",
};

export const legoVideos: HobbyVideo[] = [
  {
    id: "lego-robotic-arm",
    title: "A LEGO robotic arm",
    description: "Moving a mechanical arm with a handheld controller.",
    src: "/media/hobby/lego-robotic-arm.mp4",
    poster: "/media/hobby/lego-robotic-arm.jpg",
    width: 720,
    height: 1280,
    duration: "0:26",
  },
  {
    id: "lego-walking-robot",
    title: "A LEGO walking robot",
    description: "A small walking mechanism built with LEGO.",
    src: "/media/hobby/lego-walking-robot.mp4",
    poster: "/media/hobby/lego-walking-robot.jpg",
    width: 540,
    height: 944,
    duration: "0:10",
  },
];

export const swimmingVideos: HobbyVideo[] = swimmingMedia.map((clip, index) => ({
  id: clip.id,
  title: `Swimming · ${String(index + 1).padStart(2, "0")}`,
  description: ["An indoor swim meet.", "A view across the racing lanes.", "A poolside recording."][index],
  src: clip.src,
  poster: clip.poster,
  width: clip.width,
  height: clip.height,
  duration: `${Math.floor(clip.duration / 60)}:${String(Math.floor(clip.duration % 60)).padStart(2, "0")}`,
}));

const musicImage = slides.find((slide) => slide.name === "04-orchestra")!;

export const hobbyCategories = [
  {
    id: "music", slug: "music", title: "Music",
    description: "Piano, performances, and the music I like to play and listen to.",
    image: { src: musicImage.src, alt: musicImage.alt, position: "50% 45%" },
  },
  {
    id: "sport", slug: "sport", title: "Sport",
    description: "Three swimming videos from the pool.",
    image: { src: swimmingVideos[0].poster, alt: "Swimming lanes at an indoor pool" },
  },
  {
    id: "robotics-lego", slug: "robotics-lego", title: "Robotics & LEGO",
    description: "From a robotics competition to a LEGO robotic arm and walking robot.",
    image: { src: roboticsVideo.poster, alt: "Robotics teams and their machines on the competition floor" },
  },
] as const;
