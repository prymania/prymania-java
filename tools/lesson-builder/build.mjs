import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildChapter, allExerciseIds, allPracticeIds } from "./lib.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const CHAPTER_DATA = path.join(HERE, "chapters");
const only = process.argv.slice(2);
const files = fs.readdirSync(CHAPTER_DATA).filter((f) => /^ch.*\.mjs$/.test(f)).sort()
  .filter((f) => !only.length || only.some((o) => f.includes(o)));
if (!files.length) {
  console.error("No chapter data file matches: " + only.join(" "));
  process.exit(1);
}

for (const f of files) {
  const ch = (await import(pathToFileURL(path.join(CHAPTER_DATA, f)).href + `?t=${Date.now()}`)).default;
  const r = buildChapter(ch, path.join(ROOT, "chapters"));
  console.log(`${r.file}: ${r.exercises} exercises, ${(r.bytes / 1024).toFixed(1)} KB`);
}

// merge passwords: keep existing entries, add/overwrite built ones (same pattern as before)
const pwFile = path.join(ROOT, "password.js");
const src = fs.readFileSync(pwFile, "utf8");
const pw = only.length ? JSON.parse(src.slice(src.indexOf("{"), src.lastIndexOf("}") + 1)) : {};
for (const [id, prefix] of allExerciseIds) pw[id] = prefix + id.replace(/[^0-9]/g, "");
const sortKey = (k) => { const m = k.match(/^(S?)(\d+)\.(\d+)$/); return m ? [m[1] ? 1 : 0, +m[2], +m[3]] : [2, 0, 0]; };
const keys = Object.keys(pw).sort((a, b) => { const x = sortKey(a), y = sortKey(b); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; });
fs.writeFileSync(pwFile, "window.EXERCISE_PASSWORDS = {\n" + keys.map((k) => `  "${k}": "${pw[k]}"`).join(",\n") + "\n};");

// merge practice passwords (in-topic "practice" blocks) into their own file, kept apart from end-of-chapter exercises
const ppwFile = path.join(ROOT, "password_practice.js");
const psrc = fs.existsSync(ppwFile) ? fs.readFileSync(ppwFile, "utf8") : "window.PRACTICE_EXERCISE_PASSWORDS = {};";
const ppw = only.length ? JSON.parse(psrc.slice(psrc.indexOf("{"), psrc.lastIndexOf("}") + 1)) : {};
for (const [id, prefix] of allPracticeIds) ppw[id] = prefix + id.replace(/[^0-9]/g, "");
const pkeys = Object.keys(ppw).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
fs.writeFileSync(ppwFile, "window.PRACTICE_EXERCISE_PASSWORDS = {\n" + pkeys.map((k) => `  "${k}": "${ppw[k]}"`).join(",\n") + "\n};");

// full build: remove screenshots no longer referenced by any page
if (!only.length) {
  const { usedGuiFiles } = await import("./lib.mjs");
  const dir = path.join(ROOT, "assets", "gui");
  let removed = 0;
  for (const f of fs.readdirSync(dir)) {
    if (!usedGuiFiles.has(f)) { fs.unlinkSync(path.join(dir, f)); removed++; }
  }
  console.log(`gui images: ${usedGuiFiles.size} used, ${removed} removed`);
}
