export type MusicTrack = { id: string; title: string; artist: string; cover: string; src: string; duration: number };

export const musicTracks: readonly MusicTrack[] = [
  { id: "flower-dance", title: "Flower Dance", artist: "DJ Okawari", cover: "/media/about-me/flower-dance-cover.png", src: "/media/about-me/flower-dance-320.mp3", duration: 265.8 },
  { id: "luv-letter", title: "Luv Letter", artist: "DJ Okawari", cover: "/media/music/luv-letter.png", src: "/media/music/luv-letter-320.mp3", duration: 268.3297959183673 },
  { id: "ballade-pour-adeline", title: "Ballade pour Adeline", artist: "Richard Clayderman", cover: "/media/music/ballade-pour-adeline.png", src: "/media/music/ballade-pour-adeline-320.mp3", duration: 157.98666666666668 },
  { id: "mariage-d-amour", title: "Mariage d'Amour", artist: "Richard Clayderman", cover: "/media/music/mariage-d-amour.png", src: "/media/music/mariage-d-amour-320.mp3", duration: 160.92 },
  { id: "senbonzakura", title: "Senbonzakura", artist: "Masque_Jupiter", cover: "/media/music/senbonzakura.png", src: "/media/music/senbonzakura-320.mp3", duration: 260.80002267573695 },
  { id: "the-battle-of-waterloo", title: "The Battle of Waterloo", artist: "Various artists", cover: "/media/music/the-battle-of-waterloo.png", src: "/media/music/the-battle-of-waterloo-320.mp3", duration: 241.17333333333335 },
];
