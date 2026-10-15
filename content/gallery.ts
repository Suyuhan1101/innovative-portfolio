import manifest from "@/public/media/gallery/manifest.json";

export const galleryCategories = [
  { id: "all", title: "All photographs" },
  { id: "landscapes", title: "Landscapes" },
  { id: "places", title: "Places & culture" },
  { id: "details", title: "Small details" },
] as const;
export type GalleryCategory = (typeof galleryCategories)[number]["id"];
type Description = { title: string; alt: string; category: Exclude<GalleryCategory, "all">; place?: string; position?: string };
const descriptions: Record<string, Description> = {
  "01-snow-trail": { title: "A path into the snow", alt: "A rocky walking trail leading toward snow-covered mountains, with a small figure on the path", category: "landscapes", position: "50% 55%" },
  "02-mushrooms": { title: "At the foot of a tree", alt: "Clusters of golden mushrooms growing among bark, ivy and small plants", category: "details", position: "55% 60%" },
  "03-lotus-wall": { title: "Lotus and lettering", alt: "A pond of green lotus leaves in front of a long calligraphy wall with a tiled roof", category: "places" },
  "04-dragon-boats": { title: "Along the river", alt: "Decorated dragon boats and paddlers filling a river lined with spectators and palm trees", category: "places", place: "Near Shenzhen", position: "50% 65%" },
  "05-campus-clock": { title: "Clock and brickwork", alt: "An ornate outdoor clock in front of a brick building, framed by autumn branches", category: "places", position: "65% 60%" },
  "06-pavilion": { title: "Among the trees", alt: "A multi-level pavilion with red tiled roofs among tall conifers and garden rocks", category: "places", position: "50% 45%" },
  "07-fireworks": { title: "After dark", alt: "Golden fireworks above a brightly lit castle at night", category: "places", place: "Disneyland, California", position: "50% 55%" },
  "08-mountain-reflection": { title: "Still water, steep slopes", alt: "A bare mountain slope reflected in the still pale-green water of a lake", category: "landscapes" },
  "09-clouded-peaks": { title: "Clouds over the peaks", alt: "Bright clouds passing over jagged dark peaks with patches of snow", category: "landscapes", position: "50% 60%" },
  "10-river-plain": { title: "Room to wander", alt: "A winding river crossing a green plain beneath a distant snowy mountain range", category: "landscapes", position: "65% 55%" },
  "11-glacier": { title: "4,688 metres", alt: "An altitude sign reading 4688 metres standing in front of a wall of glacier ice", category: "landscapes", position: "45% 55%" },
  "12-snow-mountain-sky": { title: "Under a wide sky", alt: "A broad blue sky with white clouds above snowy mountains and an open paved viewing area", category: "landscapes", position: "50% 50%" },
  "13-red-canyon": { title: "A narrow opening", alt: "Light falling between tall textured red canyon walls above a narrow path", category: "landscapes", position: "50% 50%" },
  "14-mountain-river": { title: "Water over stone", alt: "A pale-blue river rushing past rocks beneath a bare mountain slope", category: "landscapes", position: "50% 65%" },
  "15-alpine-forest": { title: "Into the cloud", alt: "Tall conifers on a green alpine slope beneath snow-patched mountains and low cloud", category: "landscapes", position: "50% 55%" },
  "16-waterfall": { title: "A little cascade", alt: "Water spilling over a low ledge below a grassy bank with yurts", category: "landscapes", position: "50% 60%" },
  "17-yurt-hillside": { title: "A small place on the hillside", alt: "A white yurt and a small hut on a green hillside dotted with conifers", category: "landscapes", position: "50% 68%" },
  "18-alpine-valley": { title: "Weather moving in", alt: "A rocky green mountain valley under dark clouds, with snow patches and wildflowers", category: "landscapes", position: "50% 60%" },
  "19-eroded-canyon": { title: "Lines in the land", alt: "Deeply eroded pale canyon walls forming dense ridges and channels", category: "landscapes", position: "50% 60%" },
  "20-lakeside-path": { title: "Across the lake", alt: "A blue lake with a wooded hillside and a wooden walking path on the opposite shore", category: "landscapes", position: "50% 60%" },
  "21-lake-mountain": { title: "Blue below the mountain", alt: "Rippling deep-blue lake water beneath a rugged mountain and scattered clouds", category: "landscapes", position: "50% 55%" },
  "22-high-view": { title: "The view from up here", alt: "A blue alpine lake seen from a high rocky ridge among mountains and forested slopes", category: "landscapes", position: "50% 65%" },
  "23-miami-waves": { title: "A restless shoreline", alt: "Turquoise waves breaking along a sandy beach beneath a grey sky", category: "landscapes", place: "Miami", position: "50% 65%" },
  "24-harbor-palms": { title: "Through the palms", alt: "A large cruise ship across a harbor, framed by palm tree trunks", category: "places", position: "50% 45%" },
  "25-flamingos": { title: "A pause in the shade", alt: "A group of pale-pink flamingos standing among plants beside shallow water", category: "details", position: "50% 65%" },
};

// Interleave wide views, places and details instead of presenting every mountain together.
const order = ["22-high-view", "04-dragon-boats", "02-mushrooms", "01-snow-trail", "05-campus-clock", "15-alpine-forest", "23-miami-waves", "13-red-canyon", "03-lotus-wall", "17-yurt-hillside", "07-fireworks", "10-river-plain", "25-flamingos", "08-mountain-reflection", "06-pavilion", "19-eroded-canyon", "24-harbor-palms", "11-glacier", "21-lake-mountain", "18-alpine-valley", "14-mountain-river", "09-clouded-peaks", "20-lakeside-path", "16-waterfall", "12-snow-mountain-sky"];

export const galleryPhotos = order.map((id) => {
  const image = manifest.images.find((entry) => entry.id === id);
  const description = descriptions[id];
  if (!image || !description) throw new Error(`Missing gallery photograph: ${id}`);
  const ratio = image.width / image.height;
  return { ...image, ...description, label: `${description.title}${description.place ? ` · ${description.place}` : ""}`, thumbnailRatio: ratio > 1.65 ? "16 / 9" : ratio > 1 ? "4 / 3" : "4 / 5" };
});

export const galleryVideo = {
  src: "/media/gallery/herb-preparation.mp4",
  poster: "/media/gallery/herb-preparation-poster.jpg",
  width: 320,
  height: 568,
  title: "A moment at the dispensary",
  description: "Preparing herbs during my traditional Chinese medicine internship.",
  duration: "0:36",
};
