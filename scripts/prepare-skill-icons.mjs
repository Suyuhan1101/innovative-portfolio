import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const destination = new URL("../public/media/skills/", import.meta.url);
await mkdir(destination, { recursive: true });
const revisionResponse = await fetch("https://api.github.com/repos/devicons/devicon/commits/master");
if (!revisionResponse.ok) throw new Error(`Devicon revision: ${revisionResponse.status}`);
const { sha } = await revisionResponse.json();
const names = ["java", "python", "react", "typescript", "postgresql", "supabase", "figma", "github", "vercel", "cloudflare"];
const results = await Promise.allSettled(names.map(async (name) => {
  const source = `https://raw.githubusercontent.com/devicons/devicon/${sha}/icons/${name}/${name}-original.svg`;
  const response = await fetch(source);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  const svg = await response.text();
  if (!svg.includes("<svg") || /<script|<foreignObject|\son\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:|data:)/i.test(svg)) {
    throw new Error(`Unexpected SVG content: ${name}`);
  }
  await writeFile(new URL(`${name}.svg`, destination), svg);
  return { name, source };
}));
const failures = results.filter((result) => result.status === "rejected");
if (failures.length) throw new AggregateError(failures.map((result) => result.reason), "Icon download failed");
const licenseResponse = await fetch(`https://raw.githubusercontent.com/devicons/devicon/${sha}/LICENSE`);
if (!licenseResponse.ok) throw new Error(`Devicon license: ${licenseResponse.status}`);
await writeFile(new URL("DEVICON-LICENSE.txt", destination), await licenseResponse.text());
await writeFile(new URL("sources.json", destination), JSON.stringify({
  library: "Devicon", revision: sha, license: "MIT; brand marks belong to their respective owners",
  icons: results.map((result) => result.value),
}, null, 2) + "\n");
console.log(`Saved ${names.length} SVG icons to ${fileURLToPath(destination)}`);
