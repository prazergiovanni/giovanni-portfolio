import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicPath = join(root, ".cloudflare-public");
const publicAssetDirectories = ["brand", "layers", "optimized", "remote", "social"];

test("canonical Cloudflare build preserves the deployed public entrypoints byte-for-byte", () => {
  for (const name of ["index.html", "portfolio-runtime.js", "portfolio.css", "robots.txt", "sitemap.xml", "_headers"]) {
    const source = createHash("sha256").update(readFileSync(join(root, name))).digest("hex");
    const result = createHash("sha256").update(readFileSync(join(publicPath, name))).digest("hex");
    assert.equal(result, source, name);
  }
});

test("only explicitly public asset directories become Workers static assets", () => {
  for (const name of publicAssetDirectories) assert.equal(existsSync(join(publicPath, "assets", name)), true, name);
  for (const name of [".git", ".netlify", "saved", "docs", ".vercel", "tools", "cloudflare", "scripts", "resumes"])
    assert.equal(existsSync(join(publicPath, name)), false, name);
});

test("worker has no route or secret configured before Zone DNS Edit permission", () => {
  const c = JSON.parse(readFileSync(join(root, "cloudflare", "wrangler.jsonc"), "utf8"));
  assert.equal(c.name, "giovanni-portfolio-canonical-r1");
  assert.equal(c.routes, undefined);
  assert.equal(c.assets.run_worker_first, true);
});
