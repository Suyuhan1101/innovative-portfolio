import manifest from "@/public/media/home-gallery/manifest.json";
import order from "@/public/media/home-gallery/playback-order.json";

const captions: Record<string, { label: string; alt: string }> = {
  "06-snow-mountain": { label: "High places, new perspectives.", alt: "A person standing in front of a snow-covered mountain" },
  "07-tennis": { label: "A little energy, outside the classroom.", alt: "Two players on an outdoor tennis court" },
  "04-orchestra": { label: "Harmony and rhythm.", alt: "An orchestra performing with strings, woodwinds and brass" },
  "02-ink-artwork": { label: "Looking a little closer.", alt: "A framed Chinese ink painting of trees and a garden" },
  "01-ards-poster": { label: "Making sense of clinical text.", alt: "ARDS chest imaging criterion extraction research poster" },
  "03-robotics-team": { label: "Ideas become things.", alt: "Three students working together on a robot" },
  "05-food": { label: "Another reason to explore.", alt: "A meal with a main dish and sweet potato fries" },
};

export const slides = order.map((name) => {
  const image = manifest.images.find((item) => item.name === name);
  if (!image) throw new Error(`Missing gallery image: ${name}`);
  return { ...captions[name], name, src: image.file, width: image.output_size.width, height: image.output_size.height, fit: image.fit === "contain" ? "contain" as const : "cover" as const };
});
