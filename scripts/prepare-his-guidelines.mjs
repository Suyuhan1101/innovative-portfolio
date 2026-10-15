import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = process.argv[2] ?? "D:/Downloads/系统优化2.0";
// Only the 16 images supplied for this gallery; 6.2–6.7 are separate references.
const inputs = [
  ["1", "keyboard-login"],
  ["2.1", "physician-dashboard"],
  ["2.2", "consultation-record"],
  ["2.3", "prescription-entry"],
  ["2.4", "prescription-templates"],
  ["3.1", "booking-intervals"],
  ["3.2", "appointment-list"],
  ["3.3", "patient-selection"],
  ["3.4", "time-slots"],
  ["3.5", "physician-profile"],
  ["3.6", "prescription-billing"],
  ["3.7", "fees-and-commissions"],
  ["4.1", "pharmacy-workflow"],
  ["4.2", "herbal-inventory"],
  ["5", "printer-settings"],
  ["6.1", "finance-reports"],
];
const originalDir = path.join(root, "assets/originals/projects/his-guidelines");
const webDir = path.join(root, "public/media/projects/clinic/guidelines");
await mkdir(originalDir, { recursive: true });
await mkdir(webDir, { recursive: true });
await mkdir(path.join(root, "docs/media"), { recursive: true });
const names = await readdir(sourceRoot);
const digest = (buffer) => createHash("sha256").update(buffer).digest("hex");
async function preserveCopy(source, destination) {
  const expected = digest(await readFile(source));
  try { await copyFile(source, destination, constants.COPYFILE_EXCL); }
  catch (error) { if (error.code !== "EEXIST") throw error; }
  if (digest(await readFile(destination)) !== expected) throw new Error(`Existing image differs: ${destination}`);
  return expected;
}

const images = [];
const sources = [];
for (const [code, id] of inputs) {
  const matches = names.filter((name) => name.endsWith(".png") && name.match(/^\d+(?:\.\d+)?/)?.[0] === code);
  if (matches.length !== 1) throw new Error(`Expected one source for guideline ${code}, found ${matches.length}`);
  const source = path.join(sourceRoot, matches[0]);
  const filename = `${code.replaceAll(".", "-")}-${id}.png`;
  const original = path.join(originalDir, filename);
  const web = path.join(webDir, filename);
  const sha256 = await preserveCopy(source, original);
  const metadata = await sharp(original).metadata();
  await preserveCopy(original, web);
  images.push({ id, code, src: `/media/projects/clinic/guidelines/${filename}`, width: metadata.width, height: metadata.height });
  sources.push({ ...images.at(-1), source, original: path.relative(root, original).replaceAll("\\", "/"), bytes: (await stat(original)).size, sha256, copyVerified: true });
}
await writeFile(path.join(webDir, "manifest.json"), JSON.stringify({ images }, null, 2) + "\n");
await writeFile(path.join(root, "docs/media/his-guidelines-sources.json"), JSON.stringify({ date: "2026-10-15", purpose: "User-supplied annotated HIS 2.0 change guidelines", images: sources }, null, 2) + "\n");
console.log(JSON.stringify({ images: images.length, totalBytes: sources.reduce((sum, image) => sum + image.bytes, 0), dimensions: images.map(({ code, width, height }) => ({ code, width, height })) }, null, 2));
