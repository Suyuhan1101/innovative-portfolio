import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = "C:/Users/Suyuh/AppData/Local/Temp";
const inputs = [
  ["clinic-corridor", "a1caa995-5633-4e76-b574-8ebb9674e749"],
  ["outside-clinic", "a42a89da-468d-4a6f-8290-d2e5fdd15ac6"],
  ["dispensary-visit", "072b839a-0571-427b-83ff-64463487036b"],
  ["visit-conversation", "d9c376e6-d0d2-4ee9-9e1c-1101890131ff"],
  ["outreach-consultation", "0a3f5ecc-7c7c-4c25-9e6b-91211a437d88"],
  ["during-visit", "dad440f4-7fed-4848-b3e1-5ff8805cba59"],
  ["team-in-tibet", "5e8b9357-1f5f-4e0e-abbe-07091b472973"],
];
const originalDir = path.join(root, "assets/originals/community");
const webDir = path.join(root, "public/media/community");
await mkdir(originalDir, { recursive: true });
await mkdir(webDir, { recursive: true });
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
async function preserveCopy(source, destination) {
  const hash = digest(await readFile(source));
  try { await copyFile(source, destination, constants.COPYFILE_EXCL); }
  catch (error) { if (error.code !== "EEXIST") throw error; }
  if (digest(await readFile(destination)) !== hash) throw new Error(`Existing photograph differs: ${destination}`);
  return hash;
}

const images = [];
const sources = [];
for (const [id, uuid] of inputs) {
  const source = path.join(sourceRoot, `codex-clipboard-${uuid}.jpg`);
  const original = path.join(originalDir, `${id}.jpg`);
  const web = path.join(webDir, `${id}.jpg`);
  const sha256 = await preserveCopy(source, original);
  const metadata = await sharp(original).metadata();
  if (metadata.exif) throw new Error(`Review photograph metadata before publishing: ${id}`);
  await preserveCopy(original, web);
  images.push({ id, src: `/media/community/${id}.jpg`, width: metadata.width, height: metadata.height });
  sources.push({ ...images.at(-1), source, original: path.relative(root, original).replaceAll("\\", "/"), bytes: (await stat(original)).size, sha256, hasExif: false, copyVerified: true });
}
await writeFile(path.join(webDir, "manifest.json"), JSON.stringify({ images }, null, 2) + "\n");
await writeFile(path.join(root, "docs/media/community-sources.json"), JSON.stringify({ date: "2026-10-15", images: sources }, null, 2) + "\n");
console.log(JSON.stringify({ photographs: images.length, totalBytes: sources.reduce((sum, image) => sum + image.bytes, 0), images }, null, 2));
