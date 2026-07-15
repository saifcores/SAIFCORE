#!/usr/bin/env node
/**
 * Compile CV LaTeX sources with tectonic and copy PDFs into public/.
 *
 * Usage:
 *   node scripts/build-cv.mjs          # one-shot
 *   node scripts/build-cv.mjs --watch  # rebuild on .tex changes
 */
import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cvDir = join(root, "cv");
const publicDir = join(root, "public");

const jobs = [
  { tex: "cv-en.tex", out: "cv-en.pdf", dest: "resume-en.pdf" },
  { tex: "cv-fr.tex", out: "cv-fr.pdf", dest: "resume-fr.pdf" },
];

function hasTectonic() {
  const r = spawnSync("tectonic", ["--version"], { encoding: "utf8" });
  return r.status === 0;
}

function buildOne(job) {
  const texPath = join(cvDir, job.tex);
  if (!existsSync(texPath)) {
    console.error(`Missing ${job.tex}`);
    return false;
  }

  console.log(`→ tectonic ${job.tex}`);
  const r = spawnSync(
    "tectonic",
    [job.tex, "-o", cvDir],
    { cwd: cvDir, stdio: "inherit", encoding: "utf8" },
  );
  if (r.status !== 0) {
    console.error(`Failed: ${job.tex}`);
    return false;
  }

  const from = join(cvDir, job.out);
  const to = join(publicDir, job.dest);
  copyFileSync(from, to);
  console.log(`  copied → public/${job.dest}`);
  return true;
}

function buildAll() {
  if (!hasTectonic()) {
    console.error(
      "tectonic not found. Install with: brew install tectonic\nSee cv/README.md",
    );
    process.exit(1);
  }

  const started = Date.now();
  let ok = true;
  for (const job of jobs) {
    if (!buildOne(job)) ok = false;
  }
  if (!ok) process.exit(1);
  console.log(`✓ CV PDFs ready (${Date.now() - started}ms)`);
}

const watchMode = process.argv.includes("--watch");

buildAll();

if (watchMode) {
  console.log("Watching cv/*.tex — Ctrl+C to stop");
  let timer = null;
  watch(cvDir, { persistent: true }, (_event, filename) => {
    if (!filename?.endsWith(".tex")) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`\nChanged: ${filename}`);
      try {
        buildAll();
      } catch (err) {
        console.error(err);
      }
    }, 300);
  });
}
