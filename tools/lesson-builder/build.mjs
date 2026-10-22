import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildChapter, allExerciseIds } from "./lib.mjs";
import { syncCourseNav } from "./nav.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const CHAPTER_DATA = path.join(HERE, "chapters");
const only = process.argv.slice(2);
const allFiles = fs.readdirSync(CHAPTER_DATA).filter((f) => /^ch.*\.mjs$/.test(f)).sort();
const files = allFiles.filter((f) => !only.length || only.some((o) => f.includes(o)));
if (!files.length) {
  console.error("No chapter data file matches: " + only.join(" "));
  process.exit(1);
}

// load every chapter (cheap: nothing runs until buildChapter) so the sidebar can list all of them
const chapters = {};
for (const f of allFiles) chapters[f] = (await import(pathToFileURL(path.join(CHAPTER_DATA, f)).href + `?t=${Date.now()}`)).default;

for (const f of files) {
  const r = buildChapter(chapters[f], path.join(ROOT, "chapters"));
  console.log(`${r.file}: ${r.exercises} exercises, ${(r.bytes / 1024).toFixed(1)} KB`);
}

// sidebar menu: rewrite on every page (incl. index.html) so all pages stay in sync
syncCourseNav(ROOT, Object.values(chapters));

// merge passwords: keep existing entries, add/overwrite built ones (same pattern as before)
const pwFile = path.join(ROOT, "assets", "password.js");
const src = fs.readFileSync(pwFile, "utf8");
const pw = only.length ? JSON.parse(src.slice(src.indexOf("{"), src.lastIndexOf("}") + 1)) : {};
for (const [id, prefix] of allExerciseIds) pw[id] = prefix + id.replace(/[^0-9]/g, "");
const sortKey = (k) => { const m = k.match(/^(S?)(\d+)\.(\d+)$/); return m ? [m[1] ? 1 : 0, +m[2], +m[3]] : [2, 0, 0]; };
const keys = Object.keys(pw).sort((a, b) => { const x = sortKey(a), y = sortKey(b); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; });
fs.writeFileSync(pwFile, "window.EXERCISE_PASSWORDS = {\n" + keys.map((k) => `  "${k}": "${pw[k]}"`).join(",\n") + "\n};");

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
