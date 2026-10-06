// Chapter page generator: compiles/runs every Java example so outputs are real.
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WORK = path.join(HERE, "work");
const RUNNER = path.join(HERE, "runner");
const CACHE_FILE = path.join(HERE, "cache.json");
let cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")) : {};

// Compile the helper programs (stdin echo runner, Swing screenshot harness) when missing or outdated
(function compileRunners() {
  const sources = ["EchoRunner.java", "GuiShot.java"];
  const stale = sources.some((s) => {
    const cls = path.join(RUNNER, s.replace(".java", ".class"));
    return !fs.existsSync(cls) || fs.statSync(cls).mtimeMs < fs.statSync(path.join(HERE, s)).mtimeMs;
  });
  if (!stale) return;
  const r = spawnSync("javac", ["-encoding", "UTF-8", "-d", RUNNER, ...sources], { cwd: HERE, encoding: "utf8" });
  if (r.status !== 0) throw new Error("Cannot compile helper runners (is the JDK installed?)\n" + (r.stderr || r.error));
})();
export const saveCache = () => fs.writeFileSync(CACHE_FILE, JSON.stringify(cache));

export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
export const c = (s) => `<code>${esc(s)}</code>`;
export const j = String.raw;

export function dedent(src) {
  const lines = String(src).replace(/\r\n/g, "\n").replace(/^\n+|\s+$/g, "").split("\n");
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent)).join("\n");
}

// <pre> for syntax templates (not copyable) or real snippets (copyable)
export const pre = (src, copyable = false) => `<pre${copyable ? ' class="copyable"' : ""}><code>${esc(dedent(src))}</code></pre>`;

function className(code) {
  const m = code.match(/public\s+(?:final\s+)?class\s+(\w+)/) || code.match(/class\s+(\w+)/);
  if (!m) throw new Error("No class found in:\n" + code.slice(0, 200));
  return m[1];
}

const cleanTrace = (s) => s.split("\n")
  .filter((l) => !/jdk\.internal\.reflect|java\.lang\.reflect|EchoRunner|^\s+at java\.(base|desktop)\//.test(l))
  .join("\n");

/** Compile (and optionally run) Java source. Returns {kind, text}. */
export function runJava(code, { stdin = "", compileOnly = false, expect = "ok" } = {}) {
  code = dedent(code);
  const key = createHash("sha1").update(JSON.stringify([code, stdin, compileOnly])).digest("hex");
  if (cache[key]) return check(cache[key], expect, code);
  const cls = className(code);
  const dir = path.join(WORK, key.slice(0, 12));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, cls + ".java"), code);
  const comp = spawnSync("javac", ["-encoding", "UTF-8", "-g", "-Xlint:none", "-nowarn", cls + ".java"], { cwd: dir, encoding: "utf8" });
  let result;
  if (comp.status !== 0) {
    result = { kind: "compile-error", text: (comp.stderr + comp.stdout).replace(/\r\n/g, "\n").replace(/^Note:.*$/gm, "").trim() };
  } else if (compileOnly) {
    result = { kind: "ok", text: "" };
  } else {
    const run = spawnSync("java", ["-Dfile.encoding=UTF-8", "-Dstdout.encoding=UTF-8", "-Djava.awt.headless=true", "-cp", `${dir}${path.delimiter}${RUNNER}`, "EchoRunner", cls],
      { input: stdin, encoding: "utf8", timeout: 15000 });
    const out = (run.stdout || "").replace(/\r\n/g, "\n").replace(/\n\u0002/g, "\u0002\n");
    const err = cleanTrace((run.stderr || "").replace(/\r\n/g, "\n")).trim();
    if (run.error) throw new Error(`Run failed (${run.error.code}) for ${cls}`);
    result = run.status === 0 ? { kind: "ok", text: out.replace(/\s+$/, "") }
      : { kind: "runtime-error", text: (out.replace(/\s+$/, "") + (out.trim() ? "\n" : "") + err).trim() };
  }
  cache[key] = result;
  return check(result, expect, code);
}

/** Run a Swing program in the GuiShot harness; returns capture groups [[{file,title,w,h,kind}]] */
const GUI_DIR = path.resolve(HERE, "../../assets/gui");
export const usedGuiFiles = new Set();
export function runGui(code, actions = "") {
  code = dedent(code);
  actions = dedent(actions || "");
  const key = createHash("sha1").update(JSON.stringify(["gui", code, actions])).digest("hex");
  const prefix = "g" + key.slice(0, 10);
  const cached = cache[key];
  if (cached && cached.flat().every((s) => fs.existsSync(path.join(GUI_DIR, s.file)))) {
    cached.flat().forEach((s) => usedGuiFiles.add(s.file));
    return cached;
  }
  runJava(code, { compileOnly: true });
  const cls = className(code);
  const dir = path.join(WORK, createHash("sha1").update(JSON.stringify([code, "", true])).digest("hex").slice(0, 12));
  fs.mkdirSync(GUI_DIR, { recursive: true });
  const actFile = path.join(dir, "actions.txt");
  fs.writeFileSync(actFile, actions);
  const run = spawnSync("java", ["-Dfile.encoding=UTF-8", "-Dsun.java2d.uiScale=1", "-cp", `${dir}${path.delimiter}${RUNNER}`, "GuiShot", cls, path.join(GUI_DIR, prefix), actFile],
    { encoding: "utf8", timeout: 30000 });
  if (run.status !== 0) throw new Error(`GUI run failed for ${cls}:\n${run.stderr}`);
  if (run.stderr && run.stderr.trim()) throw new Error(`GUI run stderr for ${cls}:\n${run.stderr}`);
  const groups = [];
  for (const line of run.stdout.replace(/\r/g, "").split("\n")) {
    if (line === "GROUP") groups.push([]);
    else if (line.startsWith("SHOT|")) {
      const [, file, title, w, h, kind] = line.split("|");
      groups[groups.length - 1].push({ file, title, w: +w, h: +h, kind });
    }
  }
  if (!groups.length || !groups[0].length) throw new Error(`No window captured for ${cls}`);
  cache[key] = groups;
  groups.flat().forEach((s) => usedGuiFiles.add(s.file));
  return groups;
}

export function guiHtml(groups, captions = []) {
  return groups.map((g, i) => `<div class="gui-group">${captions[i] ? `<p class="gui-caption">${captions[i]}</p>` : ""}${g.map((s) =>
    `<figure class="gui-shot${s.kind === "dialog" ? " is-dialog" : ""}"><div class="gui-titlebar">${esc(s.title || (s.kind === "dialog" ? "Dialog" : ""))}</div><img src="../assets/gui/${s.file}" width="${s.w}" height="${s.h}" alt="ภาพหน้าต่าง ${esc(s.title)}" loading="lazy"></figure>`).join("")}</div>`).join("");
}

function check(result, expect, code) {
  if (result.kind !== expect) {
    throw new Error(`Expected ${expect} but got ${result.kind}:\n${result.text}\n--- code ---\n${code}`);
  }
  return result;
}

/** Turn runner output into HTML: stdin echo markers -> <b class="stdin"> */
export function outputHtml(text) {
  return esc(text).replace(/\u0001([\s\S]*?)\u0002/g, (_, s) => {
    const nl = s.endsWith("\n") ? "\n" : "";
    return `<b class="stdin">${s.replace(/\n$/, "")}</b>${nl}`;
  }).replace(/[\u0001\u0002]/g, "");
}

const LEVEL = { 1: "★ ง่าย", 2: "★★ ปานกลาง", 3: "★★★ ท้าทาย" };

/* ---------------- block renderers ---------------- */
const blockRenderers = {
  p: (b) => `<p>${b.html}</p>`,
  html: (b) => b.html,
  concept: (b) => `<div class="concept-box"><span class="box-title">${b.title}</span>${b.html}</div>`,
  note: (b) => `<div class="note-box"><span class="box-title">${b.title}</span>${b.html}</div>`,
  example: (b) => `<div class="example-box"><span class="box-title">${b.title}</span>${b.html}</div>`,
  steps: (b) => `<div class="concept-box"><span class="box-title">${b.title}</span>${b.intro ? `<p>${b.intro}</p>` : ""}<ol class="step-list">${b.items.map((i) => `<li>${i}</li>`).join("")}</ol>${b.after ? `<p>${b.after}</p>` : ""}</div>`,
  table: (b) => `${b.title ? `<h4>${b.title}</h4>` : ""}<table class="comparison-table${b.cls ? " " + b.cls : ""}"><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((d) => `<td>${d}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  check: (b) => `<div class="quick-check"><strong>ลองคิดก่อน · ${b.title}</strong><div>${b.html}</div><details><summary>ดูคำตอบ</summary><div>${b.answer}</div></details></div>`,
  run: renderRun,
  practice: renderPractice,
};

let exampleCounter = {};
function renderRun(b, ctx) {
  const n = (exampleCounter[ctx.topic] = (exampleCounter[ctx.topic] || 0) + 1);
  const label = b.label || `ตัวอย่าง ${ctx.topic}.${n}`;
  const code = dedent(b.code);
  let outputBlock;
  if (b.gui) {
    const groups = runGui(code, b.actions);
    const console = b.console ? `<pre class="gui-console">${esc(b.console)}</pre>` : "";
    outputBlock = `<div class="source-output is-gui"><span>${b.outputLabel || "หน้าต่างที่ได้ (ภาพจากโปรแกรมจริง)"}</span><div class="gui-stage">${guiHtml(groups, b.captions)}${console}</div></div>`;
  } else {
    const expect = b.expect || "ok";
    const res = runJava(code, { stdin: b.stdin ? b.stdin + "\n" : "", expect });
    let text = res.text;
    if (expect === "compile-error") text = text.replace(/\s*\n\d+ errors?$/, "");
    const lbl = b.outputLabel || (expect === "compile-error" ? "Compile error (จาก javac จริง)" : expect === "runtime-error" ? "Output + Runtime error" : b.stdin ? "Output (ตัวที่ขีดเส้นใต้ = ค่าที่ผู้ใช้พิมพ์)" : "Output");
    outputBlock = `<div class="source-output${expect !== "ok" ? " is-error" : ""}"><span>${lbl}</span><pre>${outputHtml(text) || "(ไม่มีผลลัพธ์)"}</pre></div>`;
  }
  const file = className(code) + ".java";
  const steps = b.steps ? `<div class="walkthrough"><strong>อธิบายทีละขั้น</strong><ol>${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>` : "";
  return `<div class="source-example"><h4>${label} · ${b.title}${b.level ? ` <span class="example-level">${b.level}</span>` : ""}</h4>`
    + (b.concept ? `<p class="concept-line"><strong>แนวคิด:</strong> ${b.concept}</p>` : "")
    + `<div class="source-example-grid"><div class="source-field"><span>Java source · ${file}</span><pre class="source-code">${esc(code)}</pre></div>${outputBlock}</div>`
    + steps + (b.after ? `<p>${b.after}</p>` : "") + (b.tryIt ? `<p class="try-it">${b.tryIt}</p>` : "") + `</div>`;
}

function renderBlocks(blocks, ctx) {
  return blocks.map((b) => {
    const r = blockRenderers[b.type];
    if (!r) throw new Error("Unknown block type " + b.type);
    return r(b, ctx);
  }).join("\n");
}

function renderExerciseCard(ex, id, { idLabel = "Exercise", extraClass = "" } = {}) {
  let samples = "";
  if (ex.solution) {
    const runs = ex.runs || [ex.stdin ?? ""];
    const outs = runs.map((stdin) => {
      if (ex.gui) return null;
      return runJava(ex.solution, { stdin: stdin ? stdin + "\n" : "" }).text;
    });
    if (ex.gui) {
      const groups = runGui(ex.solution, ex.actions);
      samples = `<div class="ex-sample"><strong>${ex.sampleTitle || "ตัวอย่างหน้าจอ (ภาพจากโปรแกรมเฉลย)"}</strong><div class="gui-stage">${guiHtml(groups, ex.captions)}</div></div>`;
    }
    if (!ex.gui && !ex.noSample) {
      const hasInput = runs.some((r) => r);
      samples = `<div class="ex-sample"><strong>ตัวอย่างผลลัพธ์${hasInput ? " (ตัวที่ขีดเส้นใต้ = ค่าที่ผู้ใช้พิมพ์)" : ""}</strong>`
        + (outs.length > 1 ? `<div class="ex-runs">` + outs.map((o, i) => `<div><small>ครั้งที่ ${i + 1}</small><pre>${outputHtml(o)}</pre></div>`).join("") + `</div>` : `<pre>${outputHtml(outs[0])}</pre>`) + `</div>`;
    }
  }
  if (ex.sampleHtml) samples += `<div class="ex-sample"><strong>${ex.sampleTitle || "ตัวอย่างผลลัพธ์"}</strong>${ex.sampleHtml}</div>`;
  const spec = ex.spec ? `<div class="ex-spec"><strong>สิ่งที่ต้องทำ</strong><ol>${ex.spec.map((s) => `<li>${s}</li>`).join("")}</ol></div>` : "";
  const hint = ex.hint ? `<p class="ex-hint">${ex.hint}</p>` : "";
  const answerCode = ex.solution && !ex.hideCode ? `<pre><code>${esc(dedent(ex.solution))}</code></pre>` : "";
  const answer = `<div class="answer-gate" data-answer-id="${id}"><button class="answer-open" type="button">ใส่รหัสเพื่อดูเฉลย</button><form class="password-form" hidden><label>รหัสผ่านของข้อ ${id}<input type="password" autocomplete="off" required></label><button class="password-submit" type="submit">เปิดเฉลย</button><p class="password-message" aria-live="polite"></p></form><div class="answer-content" hidden><h4 tabindex="-1">ตัวอย่างคำตอบ</h4>${ex.answerHtml && ex.answerFirst ? ex.answerHtml : ""}${answerCode}${ex.answerHtml && !ex.answerFirst ? ex.answerHtml : ""}${ex.explain ? `<p>${ex.explain}</p>` : ""}</div></div>`;
  return `<article class="end-exercise${extraClass ? " " + extraClass : ""}" data-level="${ex.level}"><h3><span class="exercise-id">${idLabel} ${id}</span>${ex.title}<span class="level level-${ex.level}">${LEVEL[ex.level]}</span></h3><div class="ex-body">${ex.html}</div>${spec}${samples}${hint}${answer}</article>`;
}

function renderExercise(ex) {
  return renderExerciseCard(ex, ex.id);
}

let practiceCounter = {};
function renderPractice(b, ctx) {
  const n = (practiceCounter[ctx.topic] = (practiceCounter[ctx.topic] || 0) + 1);
  const id = b.id || `${ctx.topic}-P${n}`;
  allPracticeIds.push([id, ctx.practicePassPrefix || "prac"]);
  return renderExerciseCard(b, id, { idLabel: "โจทย์ฝึก", extraClass: "inline-exercise" });
}

export const allExerciseIds = [];
export const allPracticeIds = [];

export function buildChapter(ch, outDir) {
  exampleCounter = {};
  practiceCounter = {};
  const pad = String(ch.num).padStart(2, "0");
  const topicsToc = ch.topics.map((t) => `<a href="#topic-${t.num.replace(".", "-")}"><span class="toc-number">${t.num}</span>${t.toc}</a>`).join("");
  const topicsHtml = ch.topics.map((t) => `<article class="subtopic" id="topic-${t.num.replace(".", "-")}">
<h3>${t.num} ${t.title}</h3>
${renderBlocks(t.blocks, { topic: t.num, practicePassPrefix: ch.practicePassPrefix })}
</article>`).join("\n");
  const levels = [1, 2, 3].map((l) => `<span class="level level-${l}">${LEVEL[l]}</span>`).join("");
  ch.exercises.forEach((e, i) => { e.id = e.id || `${ch.idPrefix || ch.num}.${i + 1}`; allExerciseIds.push([e.id, ch.passPrefix || "java"]); });
  for (let i = 1; i < ch.exercises.length; i++) {
    if (ch.exercises[i].level < ch.exercises[i - 1].level) throw new Error(`Exercise order not by difficulty at ${ch.exercises[i].id}`);
  }
  const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#f5f7f4">
  <title>${ch.pageTitle} | Java programming by Prymania</title>
  <link rel="stylesheet" href="../assets/lesson.css">
</head>
<body>
  <a class="skip-link" href="#lesson-content">ข้ามไปเนื้อหาบทเรียน</a>
  <div class="lesson-shell">
    <aside class="lesson-sidebar" aria-label="เมนูบทเรียน">
      <a class="lesson-brand" href="../index.html"><span class="brand-mark" aria-hidden="true">&lt;/&gt;</span><span><span class="brand-title">Java programming<br>by Prymania</span><span class="brand-caption">LECTURE NOTES</span></span></a>
      <nav class="lesson-toc" aria-label="สารบัญ${ch.shortName}"><p class="toc-label">${ch.tocLabel}</p>${topicsToc}<a href="#chapter-exercises"><span class="toc-number">ฝึก</span>แบบฝึกหัดท้ายบท</a></nav>
      <div class="sidebar-bottom">${ch.sidebarBottom}</div>
    </aside>
    <main class="lesson-main" id="lesson-content">
      <div class="utility-row"><a href="../index.html">← สารบัญรายวิชา</a><span class="utility-code">${ch.utility || `CHAPTER ${pad} / 19`}</span></div>
      <header class="lesson-header"><p class="lesson-kicker">${ch.kicker}</p><h1>${ch.h1}</h1><p>${ch.lead}</p></header>
      <div class="learning-goals"><strong>เมื่อจบบทนี้ นิสิตจะทำได้</strong><ul>${ch.goals.map((g) => `<li>${g}</li>`).join("")}</ul></div>
      <section class="lesson-section" aria-labelledby="section-main">
        <h2 id="section-main">${ch.introHeading}</h2>
        ${ch.introHtml}
${topicsHtml}
      </section>
      <section class="chapter-end" id="chapter-exercises" aria-labelledby="end-heading">
        <h2 id="end-heading">แบบฝึกหัดท้ายบท</h2>
        <p>${ch.exercisesIntro || "ทำตามลำดับจากง่ายไปยาก อ่านโจทย์และตัวอย่างผลลัพธ์ให้ครบก่อนเริ่มเขียน แล้วจึงเปิดเฉลยเพื่อเทียบแนวคิด"}</p>
        <div class="level-legend">ระดับความยาก: ${levels}</div>
${ch.exercises.map((e) => renderExercise(e, ch.num)).join("\n")}
      </section>
      <nav class="lesson-pager" aria-label="นำทางบทเรียน"><a class="pager-link secondary" href="${ch.prev.href}">${ch.prev.label}</a><a class="pager-link" href="${ch.next.href}">${ch.next.label}</a></nav>
      <footer class="lesson-footer">Java programming by Prymania · ${ch.footer}</footer>
    </main>
  </div>
  <script src="../password.js"></script><script src="../password_practice.js"></script><script src="../assets/lesson.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, ch.file), html);
  saveCache();
  return { file: ch.file, exercises: ch.exercises.length, bytes: html.length };
}
