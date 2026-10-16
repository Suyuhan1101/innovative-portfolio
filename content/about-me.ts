export const aboutMe = {
  greeting: "Hi, I'm Yuhan Su.",
  introduction: "A high school student who likes making things work — and a few little things that make me, me.",
  facts: [
    { label: "Current chapter", value: "High school" },
    { label: "Birthday", value: "November 1" },
    { label: "Favorite colors", value: "Black & white" },
    { label: "Favorite season", value: "Autumn" },
  ],
  coding: [
    "My interest in coding started with LEGO EV3. Every week, I made something small: a spinning top launcher, Tetris, a robot that played pool. My favorite part was the moment the machine actually worked.",
    "Over time, I started building things for my own needs, including a small program for saving passwords. I once considered studying medicine, which led me to a project connecting healthcare and programming. These days, I'm more drawn to coding.",
  ],
  outside: [
    "Music keeps me company when I'm writing or spending time on my own. I enjoy lossless audio and have more than a hundred tracks in my collection. I love the atmosphere of Flower Dance, and I play it on piano just for the joy of it.",
    "I also love high places, good food and trips with something unexpected to see — like watching alligators from a small boat in a swamp.",
  ],
  email: "caesium6s@zohomail.com",
} as const;

export const aboutMedia = {
  scorpio: "/media/about-me/scorpio-constellation.png",
  yinYang: "/media/about-me/yin-yang.png",
  fiveElements: "/media/about-me/five-elements-reference.png",
  ev3: "/media/about-me/ev3-sumo-reference.png",
} as const;

export type AboutHonor = {
  id: string;
  symbol: "robotics" | "academics" | "computing" | "innovation" | "service" | "research" | "piano" | "painting";
  title: string;
  years: string;
  description?: string;
  results?: { event: string; year: string; award: string; place: string; metal: "bronze" | "silver" }[];
};

type AboutHonorGroup = {
  id: string;
  title: string;
  entries: AboutHonor[];
};

export const aboutHonors: AboutHonorGroup[] = [
  {
    id: "awards",
    title: "Honors & awards",
    entries: [
      {
        id: "ftc-robotics",
        symbol: "robotics",
        title: "FTC Robotics — Summit Knights 14365",
        years: "2024–2025",
        description: "Team awards at Ohio FTC State Championship qualifiers.",
        results: [
          { event: "OH Miami University Qualifier", year: "2024", award: "Inspire Award", place: "3rd Place", metal: "bronze" },
          { event: "Cincinnati Walnut Hills Qualifier", year: "2025", award: "Inspire Award", place: "2nd Place", metal: "silver" },
        ],
      },
      {
        id: "directors-list",
        symbol: "academics",
        title: "Director’s List with High Honors",
        years: "2024–2025",
        description: "Awarded to the top 10% of students by GPA.",
      },
      { id: "usaco", symbol: "computing", title: "USA Computing Olympiad (USACO) — Silver Award", years: "2026" },
      { id: "conrad", symbol: "innovation", title: "Conrad Challenge — Innovator Award", years: "2026" },
      {
        id: "nhs",
        symbol: "service",
        title: "National Honor Society",
        years: "2026",
        description: "Recognized for high GPA, leadership, service and character.",
      },
      { id: "ap-scholar", symbol: "academics", title: "AP Scholar with Distinction", years: "2026" },
    ],
  },
  {
    id: "research-certifications",
    title: "Research certifications",
    entries: [
      { id: "good-clinical-practice", symbol: "research", title: "Good Clinical Practice", years: "2026", description: "CITI Program certification" },
      { id: "human-subjects-research", symbol: "research", title: "Human Subjects Research", years: "2026", description: "CITI Program certification" },
      { id: "research-coordinator", symbol: "research", title: "Clinical Research Coordinator Foundations", years: "2026", description: "CITI certificate" },
    ],
  },
  {
    id: "music-and-arts",
    title: "Music & arts",
    entries: [
      { id: "piano-grade-eight", symbol: "piano", title: "Grade 8 Piano", years: "2023", description: "China Conservatory of Music" },
      { id: "landscape-painting", symbol: "painting", title: "Grade 4 Award in Chinese Landscape Painting", years: "2023" },
    ],
  },
];
