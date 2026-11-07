import { cpSync, copyFileSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, ".cloudflare-public");
const allowedFiles = ["index.html", "portfolio-runtime.js", "portfolio.css", "robots.txt", "sitemap.xml", "_headers"];
const allowedAssetDirectories = ["brand", "layers", "optimized", "remote", "social"];

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

for (const name of allowedFiles) {
  const src = join(root, name);
  if (!existsSync(src) || !statSync(src).isFile()) throw new Error("Missing public file: " + name);
  copyFileSync(src, join(target, name));
}

for (const name of allowedAssetDirectories) {
  const src = join(root, "assets", name);
  if (!existsSync(src) || !statSync(src).isDirectory()) throw new Error("Missing public asset directory: " + name);
  cpSync(src, join(target, "assets", name), { recursive: true });
}

console.log("GIOVANNI_CLOUDFLARE_PUBLIC_ASSETS_BUILT");
