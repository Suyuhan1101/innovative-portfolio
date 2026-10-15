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
