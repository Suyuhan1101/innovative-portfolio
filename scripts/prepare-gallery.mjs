import { createHash } from "node:crypto";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = "C:/Users/Suyuh/AppData/Local/Temp";
const inputs = [
  ["01-snow-trail", "83634d91-fce0-4245-bfb2-fc5aa7bce45e"],
  ["02-mushrooms", "cdea3200-0b17-4c5b-8a0b-448d53e791f5"],
  ["03-lotus-wall", "6182191c-1c48-49e2-b614-4920a42c119a"],
  ["04-dragon-boats", "6ee5cf71-e7f0-48a6-aa00-7ab12fd49b61"],
  ["05-campus-clock", "162c2c22-2a03-4b5b-befc-bca7203e1891"],
  ["06-pavilion", "c1962073-ddcc-4f6b-89bf-1e624076426e"],
  ["07-fireworks", "015f1de7-924c-47f8-944a-e31012d7c3eb"],
  ["08-mountain-reflection", "f367a957-d42e-4ede-9a17-7a648e661316"],
  ["09-clouded-peaks", "4626d929-edc8-421d-93ef-d999f861941e"],
  ["10-river-plain", "f96ad37c-5bae-414e-9915-f2738faec6d6"],
  ["11-glacier", "f18ee73f-9311-4741-9815-c64a5100e970"],
  ["12-snow-mountain-sky", "78e600a6-1f1c-40f3-9d46-fd0ef16af927"],
  ["13-red-canyon", "82dfc578-04f9-4fa3-84a8-ea27f94f2845"],
  ["14-mountain-river", "0ef6c4b8-f997-4ebb-ab1c-3088da27faad"],
  ["15-alpine-forest", "1f30c22a-aabf-47ec-83ab-25a7c8e3583b"],
  ["16-waterfall", "ea8134cb-b4ae-4c16-a005-218df3badea9"],
  ["17-yurt-hillside", "0bcefdc3-7bbd-4e8b-a467-ef12e2837ed6"],
  ["18-alpine-valley", "8db86be8-73c1-4b6f-8584-194c5d3a07c5"],
  ["19-eroded-canyon", "2acf3e1f-626d-45cd-a245-598dae376dc5"],
  ["20-lakeside-path", "2fa110ff-9dcb-4c6b-bc32-36d3622193d9"],
  ["21-lake-mountain", "6e7d30df-4e38-4644-9208-7299f6876bc5"],
  ["22-high-view", "f4a44685-13fc-4ffd-95a8-8f9218f1787d"],
  ["23-miami-waves", "69f41e07-f116-40fc-a307-9080fb70a041"],
  ["24-harbor-palms", "5ae947ff-45d6-4a82-8639-aa39b806f49a"],
  ["25-flamingos", "4b4b9c4c-20da-425b-b9d5-87b6ade796ca"],
];
const originalDir = path.join(root, "assets/originals/gallery");
const webDir = path.join(root, "public/media/gallery");
await mkdir(originalDir, { recursive: true });
await mkdir(webDir, { recursive: true });
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
async function preserveCopy(source, destination) {
  const expected = digest(await readFile(source));
  try { await copyFile(source, destination, constants.COPYFILE_EXCL); }
  catch (error) { if (error.code !== "EEXIST") throw error; }
  if (digest(await readFile(destination)) !== expected) throw new Error(`Existing file differs: ${destination}`);
  return expected;
}

const images = [];
const sources = [];
for (const [id, uuid] of inputs) {
  const source = path.join(sourceRoot, `codex-clipboard-${uuid}.jpg`);
  const original = path.join(originalDir, `${id}.jpg`);
  const web = path.join(webDir, `${id}.jpg`);
  const hash = await preserveCopy(source, original);
  await preserveCopy(original, web);
  const meta = await sharp(original).metadata();
  const bytes = (await stat(original)).size;
  images.push({ id, src: `/media/gallery/${id}.jpg`, width: meta.width, height: meta.height });
  sources.push({ id, source, original: path.relative(root, original).replaceAll("\\", "/"), file: images.at(-1).src, width: meta.width, height: meta.height, bytes, sha256: hash, hasExif: !!meta.exif, copyVerified: true });
}

const videoSource = "D:/xwechat_files/wxid_l13stetrkqhi22_f51c/temp/RWTemp/2026-10/9e20f478899dc29eb19741386f9343c8/ae1241fb66c2784bec610c896c8f8ec9.mp4";
const originalVideo = path.join(originalDir, "herb-preparation.mp4");
const videoHash = await preserveCopy(videoSource, originalVideo);
await writeFile(path.join(webDir, "manifest.json"), JSON.stringify({ images }, null, 2) + "\n");
await writeFile(path.join(root, "docs/media/gallery-sources.json"), JSON.stringify({ date: "2026-10-14", images: sources, video: { source: videoSource, original: "assets/originals/gallery/herb-preparation.mp4", bytes: (await stat(originalVideo)).size, sha256: videoHash, copyVerified: true } }, null, 2) + "\n");
console.log(JSON.stringify({ photos: sources.length, totalPhotoBytes: sources.reduce((sum, item) => sum + item.bytes, 0), exifCount: sources.filter((item) => item.hasExif).length, videoBytes: (await stat(originalVideo)).size, dimensions: images.map(({ id, width, height }) => ({ id, width, height })) }, null, 2));
