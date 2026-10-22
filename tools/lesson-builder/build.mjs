import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomInt } from "node:crypto";
import { buildChapter, setPasswordProvider } from "./lib.mjs";
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

// answer passwords: random and unguessable, created once per exercise and then reused
const SECRET_DIR = path.join(HERE, "secrets");
const SECRET_FILE = path.join(SECRET_DIR, "passwords.json");
const passwords = fs.existsSync(SECRET_FILE) ? JSON.parse(fs.readFileSync(SECRET_FILE, "utf8")) : {};
const ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";   // no look-alikes (i l o 0 1)
let newPasswords = 0;
setPasswordProvider((id) => {
  if (!passwords[id]) {
    passwords[id] = Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]).join("");
    newPasswords++;
  }
  return passwords[id];
});

for (const f of files) {
  const r = buildChapter(chapters[f], path.join(ROOT, "chapters"));
  console.log(`${r.file}: ${r.exercises} exercises, ${(r.bytes / 1024).toFixed(1)} KB`);
}

// sidebar menu: rewrite on every page (incl. index.html) so all pages stay in sync
syncCourseNav(ROOT, Object.values(chapters));

// teacher's password list (kept out of git): written after every build, never pruned
fs.mkdirSync(SECRET_DIR, { recursive: true });
fs.writeFileSync(SECRET_FILE, JSON.stringify(passwords, null, 2) + "\n");
const byId = (a, b) => a.localeCompare(b, undefined, { numeric: true });
const listOf = (ids) => ids.sort(byId).map((id) => `${id.padEnd(10)} ${passwords[id]}`).join("\n");
const practiceIds = Object.keys(passwords).filter((id) => id.includes("-P"));
const exerciseIds = Object.keys(passwords).filter((id) => !id.includes("-P"));
fs.writeFileSync(path.join(SECRET_DIR, "passwords.txt"),
  "รหัสเปิดเฉลย (สร้างโดย build.mjs — อย่าเผยแพร่ไฟล์นี้)\n\n== แบบฝึกหัดท้ายบท ==\n" + listOf(exerciseIds)
  + "\n\n== โจทย์ฝึกกลางเนื้อหา ==\n" + listOf(practiceIds) + "\n");
if (newPasswords) console.log(`passwords: ${newPasswords} new (see tools/lesson-builder/secrets/passwords.txt)`);

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
