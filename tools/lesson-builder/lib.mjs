// Chapter page generator: compiles/runs every Java example so outputs are real.
import { spawnSync } from "node:child_process";
import { createCipheriv, createHash, pbkdf2Sync } from "node:crypto";
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

/* ---------------- Java syntax highlighting (static, at build time) ---------------- */
const JAVA_KEYWORDS = new Set(("abstract assert break case catch class continue default do else enum extends final finally for if implements import "
  + "instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws "
  + "transient try volatile while var record yield sealed permits non-sealed "
  + "boolean byte char double float int long short void").split(" "));
const JAVA_LITERALS = new Set(["true", "false", "null"]);
const JAVA_TOKEN = new RegExp([
  /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)/,                                     // 1 comment
  /("""[\s\S]*?"""|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])+')/,           // 2 string / char
  /(@[A-Za-z_]\w*)/,                                                   // 3 annotation
  /(\b(?:0[xX][0-9a-fA-F_]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)[lLfFdD]?\b)/, // 4 number
  /([A-Za-z_$][\w$]*)(?=(\s*\()?)/,                                    // 5 word, 6 followed by "("
].map((r) => r.source).join("|"), "g");

export function highlightJava(code) {
  let html = "", last = 0;
  const span = (cls, s) => `<span class="tok-${cls}">${esc(s)}</span>`;
  for (const m of code.matchAll(JAVA_TOKEN)) {
    html += esc(code.slice(last, m.index));
    last = m.index + m[0].length;
    const [text, com, str, ann, num, word, call] = m;
    if (com) html += span("com", text);
    else if (str) html += span("str", text);
    else if (ann) html += span("ann", text);
    else if (num) html += span("num", text);
    else if (JAVA_KEYWORDS.has(word)) html += span("kw", text);
    else if (JAVA_LITERALS.has(word)) html += span("num", text);
    else if (/^[A-Z][A-Z0-9_]+$/.test(word)) html += span("const", text);
    else if (/^[A-Z]/.test(word)) html += span("type", text);
    else if (call !== undefined) html += span("fn", text);
    else html += esc(text);
  }
  return html + esc(code.slice(last));
}

// Code panel: header bar with the file name (copy button is added there by lesson.js) + highlighted source
export const codeBlock = (code, cls = "source-code") =>
  `<div class="code-block"><div class="code-head"><span class="code-file">${className(code)}.java</span></div><pre class="${cls}"><code>${highlightJava(code)}</code></pre></div>`;

// Java snippet that is not run (syntax, fragment): same colored panel; header shows the class file if any
export function jpre(src, file) {
  const code = dedent(src);
  const m = code.match(/\bclass\s+(\w+)/);
  const name = file || (m ? m[1] + ".java" : "Java");
  return `<div class="code-block"><div class="code-head"><span class="code-file">${esc(name)}</span></div><pre class="copyable"><code>${highlightJava(code)}</code></pre></div>`;
}

/* Flowchart / pseudocode / text diagrams: colored by role, not Java syntax.
   Thai pseudocode keywords (เริ่มต้น/รับ/ถ้า ...) are colored only for "รหัสเทียม" and "Flowchart" panels. */
const FLOW_TOKEN = new RegExp([
  /(\/\/[^\n]*|←[^\n]*)/,                                              // 1 note
  /(\((?:วงรี|ด้านขนาน|สี่เหลี่ยม[^)\n]*|เริ่มต้น|จบ)\))/,                     // 2 flowchart shape
  /(เริ่มต้น|จบ)/,                                                     // 3 start / end
  /(รับ|แสดง)/,                                                        // 4 input / output
  /(มิฉะนั้น|ถ้า|ขณะที่|ทำซ้ำ)/,                                          // 5 control
  /(ไม่ใช่|ใช่)/,                                                       // 6 branch label
  /(◇)/,                                                               // 7 decision
  /([→↑↓↙↘↖↗▼▲▶◀─│┌┐└┘├┤┬┴┼⏎␣]+|-->|--)/,                               // 8 arrows / lines
  /("[^"\n]*")/,                                                       // 9 string
  /(\b\d+(?:\.\d+)?\b)/,                                               // 10 number
  /([A-Za-z_]\w*)(?=(\s*\()?)/,                                        // 11 word, 12 followed by "("
].map((r) => r.source).join("|"), "g");

function highlightFlow(code, thaiKeywords) {
  let html = "", last = 0;
  const span = (cls, s) => `<span class="tok-${cls}">${esc(s)}</span>`;
  for (const m of code.matchAll(FLOW_TOKEN)) {
    const [text, note, shape, start, io, ctl, yes, dec, arrow, str, num, word, call] = m;
    const keyword = start || io || ctl || yes;
    if (keyword && !thaiKeywords) continue;
    html += esc(code.slice(last, m.index));
    last = m.index + text.length;
    if (note) html += span("com", text);
    else if (shape) html += span("shape", text);
    else if (start) html += span("start", text);
    else if (io) html += span("io", text);
    else if (ctl) html += span("ctl", text);
    else if (yes) html += span("yes", text);
    else if (dec) html += span("dec", text);
    else if (arrow) html += span("arrow", text);
    else if (str) html += span("str", text);
    else if (num) html += span("num", text);
    else if (/^[A-Z][A-Z0-9_]+$/.test(word)) html += span("const", text);
    else if (/^[A-Z]/.test(word)) html += span("type", text);
    else if (call !== undefined) html += span("fn", text);
    else html += esc(text);
  }
  return html + esc(code.slice(last));
}

export const fpre = (src, label = "แผนภาพ") =>
  `<div class="code-block is-flow"><div class="code-head"><span class="code-file">${esc(label)}</span></div><pre><code>${highlightFlow(dedent(src), label === "รหัสเทียม" || label === "Flowchart")}</code></pre></div>`;

// ---- Flowcharts drawn as real shapes (inline SVG) ----
// nodes: { id: [shape, text, col, row, width?] }  shape = terminal | io | process | decision
// edges: [from, to, { out, in, label, via }]  out/in = top | bottom | left | right (default bottom → top)
//        via = extra corner points in grid units [[col, row], ...] for loop-backs and side lanes
const FC = { colW: 200, rowH: 80, pad: 14, h: { terminal: 40, io: 44, process: 44, decision: 66 }, w: { terminal: 120, io: 176, process: 176, decision: 170 }, skew: 14 };
function fcShape(shape, cx, cy, w, h) {
  const x = cx - w / 2, y = cy - h / 2, s = FC.skew;
  if (shape === "terminal") return `<rect class="fc-terminal" x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}"/>`;
  if (shape === "io") return `<polygon class="fc-io" points="${x + s},${y} ${x + w},${y} ${x + w - s},${y + h} ${x},${y + h}"/>`;
  if (shape === "decision") return `<polygon class="fc-decision" points="${cx},${y} ${x + w},${cy} ${cx},${y + h} ${x},${cy}"/>`;
  return `<rect class="fc-process" x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/>`;
}
function fcText(text, cx, cy, cls = "fc-text") {
  const lines = String(text).split("\n");
  const top = cy - (lines.length - 1) * 8.5;
  return `<text class="${cls}" x="${cx}" y="${top}" text-anchor="middle" dominant-baseline="central">`
    + lines.map((l, i) => `<tspan x="${cx}" dy="${i ? 17 : 0}">${esc(l)}</tspan>`).join("") + `</text>`;
}
export function flowchart({ nodes, edges = [], caption = "", label = "Flowchart", rowH = FC.rowH }) {
  const box = {};
  let maxX = 0, maxY = 0;
  for (const [id, [shape, text, col, row, wOverride]] of Object.entries(nodes)) {
    const w = wOverride || FC.w[shape], h = FC.h[shape];
    const cx = FC.pad + col * FC.colW + FC.colW / 2, cy = FC.pad + row * rowH + rowH / 2;
    box[id] = { shape, text, cx, cy, w, h };
    maxX = Math.max(maxX, cx + w / 2); maxY = Math.max(maxY, cy + h / 2);
  }
  const grid = ([col, row]) => ({ x: FC.pad + col * FC.colW + FC.colW / 2, y: FC.pad + row * rowH + rowH / 2 });
  const anchor = (b, side) => {
    const inset = b.shape === "io" ? FC.skew / 2 : 0;
    if (side === "top") return { x: b.cx, y: b.cy - b.h / 2 };
    if (side === "left") return { x: b.cx - b.w / 2 + inset, y: b.cy };
    if (side === "right") return { x: b.cx + b.w / 2 - inset, y: b.cy };
    return { x: b.cx, y: b.cy + b.h / 2 };
  };
  const vertical = (side) => side === "top" || side === "bottom";
  let paths = "", labels = "";
  for (const [from, to, opt = {}] of edges) {
    const outSide = opt.out || "bottom", inSide = opt.in || "top";
    const a = anchor(box[from], outSide), b = anchor(box[to], inSide);
    const via = (opt.via || []).map(grid);
    const targets = [...via, b];
    const pts = [a];
    targets.forEach((q, i) => {
      const p = pts[pts.length - 1];
      if (p.x !== q.x && p.y !== q.y) {
        const first = i === 0, last = i === targets.length - 1;
        if (first && last && vertical(outSide) === vertical(inSide)) {   // S-shaped: two corners
          if (vertical(outSide)) { const m = (p.y + q.y) / 2; pts.push({ x: p.x, y: m }, { x: q.x, y: m }); }
          else { const m = (p.x + q.x) / 2; pts.push({ x: m, y: p.y }, { x: m, y: q.y }); }
        } else {
          const horizontalFirst = first ? !vertical(outSide) : last ? vertical(inSide) : true;
          pts.push(horizontalFirst ? { x: q.x, y: p.y } : { x: p.x, y: q.y });
        }
      }
      pts.push(q);
    });
    paths += `<path class="fc-edge" d="M${pts.map((p) => `${p.x},${p.y}`).join(" L")}" marker-end="url(#fc-arrow)"/>`;
    if (opt.label) {
      const dx = outSide === "left" ? -8 : 8, dy = vertical(outSide) ? 15 : -7;
      const cls = /^(ใช่|yes|true)/i.test(opt.label) ? "fc-label fc-yes" : /^(ไม่|no|false)/i.test(opt.label) ? "fc-label fc-no" : "fc-label";
      labels += `<text class="${cls}" x="${a.x + dx}" y="${a.y + dy}" text-anchor="${outSide === "left" ? "end" : "start"}">${esc(opt.label)}</text>`;
    }
    for (const p of pts) { maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y); }
  }
  const shapes = Object.values(box).map((b) => fcShape(b.shape, b.cx, b.cy, b.w, b.h) + fcText(b.text, b.cx, b.cy)).join("");
  const W = Math.ceil(maxX + FC.pad), H = Math.ceil(maxY + FC.pad);
  const title = Object.values(box).map((b) => b.text.replace(/\n/g, " ")).join(" → ");
  return `<figure class="flow-figure"><figcaption>${esc(label)}${caption ? ` <small>${caption}</small>` : ""}</figcaption>`
    + `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">`
    + `<defs><marker id="fc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fc-arrowhead"/></marker></defs>`
    + paths + shapes + labels + `</svg></figure>`;
}

// small shape for tables (e.g. the symbol list in chapter 1)
export function shapeIcon(shape) {
  const w = 58, h = 30;
  const body = shape === "arrow"
    ? `<path class="fc-edge" d="M6,15 L50,15" marker-end="url(#fc-arrow-i)"/>`
    : fcShape(shape, w / 2, h / 2, shape === "terminal" ? 50 : shape === "decision" ? 54 : 52, shape === "decision" ? 28 : 24);
  return `<svg class="shape-icon" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><defs><marker id="fc-arrow-i" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="fc-arrowhead"/></marker></defs>${body}</svg>`;
}

// block-level HTML (a panel, list, table) must not be wrapped in <p>
const para = (h) => (/^\s*<(div|pre|ul|ol|table|figure)\b/.test(h) ? h : `<p>${h}</p>`);

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
  steps: (b) => `<div class="concept-box"><span class="box-title">${b.title}</span>${b.intro ? para(b.intro) : ""}<ol class="step-list">${b.items.map((i) => `<li>${i}</li>`).join("")}</ol>${b.after ? para(b.after) : ""}</div>`,
  table: (b) => `${b.title ? `<h4>${b.title}</h4>` : ""}<table class="comparison-table${b.cls ? " " + b.cls : ""}"><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((d) => `<td>${d}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  check: (b) => `<div class="quick-check"><strong>ลองคิดก่อน · ${b.title}</strong><div>${b.html}</div><details><summary>ดูคำตอบ</summary><div>${b.answer}</div></details></div>`,
  run: renderRun,
  practice: renderPractice,
  h: (b) => `<h4 class="sub">${b.text}</h4>`,
  cells: renderCells,
  tip: (b) => `<div class="callout tip"><span class="box-title">${b.title || "คำแนะนำ"}</span>${para(b.html)}</div>`,
  warn: (b) => `<div class="callout warn"><span class="box-title">${b.title || "ข้อผิดพลาดที่พบบ่อย"}</span>${para(b.html)}</div>`,
  try: (b) => `<div class="callout try"><span class="box-title">${b.title || "ลองทำดู"}</span>${para(b.html)}</div>`,
  more: (b, ctx) => `<details class="more-examples"><summary>${b.title || "ตัวอย่างเพิ่มเติม"}</summary><div class="more-body">${renderBlocks(b.blocks, ctx)}</div></details>`,
};

// array diagram: values = [..] (1-D) or [[..], [..]] (2-D); index labels above / beside each slot
function renderCells(b) {
  const twoD = Array.isArray(b.values[0]);
  const cell = (v, label) => `<div class="cell"><small>${label}</small><b>${v}</b></div>`;
  let body;
  if (!twoD) {
    body = `<div class="cells-row">${b.values.map((v, i) => cell(v, `[${i}]`)).join("")}</div>`;
  } else {
    const cols = b.values[0].length;
    const head = `<div class="cells-row is-head"><span class="row-label"></span>${Array.from({ length: cols }, (_, c) => `<div class="cell col-label"><small>[${c}]</small></div>`).join("")}</div>`;
    body = head + b.values.map((row, r) => `<div class="cells-row"><span class="row-label">[${r}]</span>${row.map((v) => `<div class="cell"><b>${v}</b></div>`).join("")}</div>`).join("");
  }
  return `<figure class="cells${twoD ? " is-2d" : ""}">${b.name ? `<figcaption><code>${b.name}</code>${b.caption ? ` ${b.caption}` : ""}</figcaption>` : ""}${body}</figure>`;
}

let exampleCounter = {};
function renderRun(b, ctx) {
  const n = (exampleCounter[ctx.topic] = (exampleCounter[ctx.topic] || 0) + 1);
  // number is always computed from position; a custom label (e.g. "ทดลอง error 4.1.5") keeps its words only
  const label = b.label ? b.label.replace(/\s*[\dS]+\.\d+\.\d+$/, "") + ` ${ctx.topic}.${n}` : `ตัวอย่าง ${ctx.topic}.${n}`;
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
    const lbl = b.outputLabel || (expect === "compile-error" ? "ข้อความ error จาก javac" : expect === "runtime-error" ? "ผลลัพธ์ + runtime error" : b.stdin ? "ผลลัพธ์ · ตัวที่ขีดเส้นใต้คือค่าที่ผู้ใช้พิมพ์" : "ผลลัพธ์");
    outputBlock = `<div class="source-output${expect !== "ok" ? " is-error" : ""}"><span>${lbl}</span><pre>${outputHtml(text) || "(ไม่มีผลลัพธ์)"}</pre></div>`;
  }
  const steps = b.steps ? `<div class="walkthrough"><strong>อธิบายทีละขั้น</strong><ol>${b.steps.map((s) => `<li>${s}</li>`).join("")}</ol></div>` : "";
  return `<div class="source-example"><h4><span class="ex-num">${label}</span>${b.title}</h4>`
    + (b.concept ? `<p class="concept-line"><strong>แนวคิด:</strong> ${b.concept}</p>` : "")
    + `<div class="source-example-grid"><div class="source-field">${codeBlock(code)}</div>${outputBlock}</div>`
    + steps + (b.after ? para(b.after) : "") + (b.tryIt ? `<p class="try-it">${b.tryIt}</p>` : "") + `</div>`;
}

function renderBlocks(blocks, ctx) {
  return blocks.map((b) => {
    const r = blockRenderers[b.type];
    if (!r) throw new Error("Unknown block type " + b.type);
    return r(b, ctx);
  }).join("\n");
}

// Answers are encrypted with the exercise password (AES-256-GCM, key from PBKDF2-SHA256),
// so the page source holds no readable solution. lesson.js decrypts with the same parameters.
export const PBKDF2_ITERATIONS = 100000;
let passwordFor = () => { throw new Error("setPasswordProvider() was not called"); };
export function setPasswordProvider(fn) { passwordFor = fn; }
function encryptAnswer(id, html) {
  const password = passwordFor(id);
  const salt = createHash("sha256").update("javacst-answer:" + id).digest().subarray(0, 16);
  const key = pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, 32, "sha256");
  // deterministic IV (from id, password, content): rebuilding unchanged content gives identical HTML
  const iv = createHash("sha256").update(id + "|" + password + "|" + html).digest().subarray(0, 12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([cipher.update(html, "utf8"), cipher.final(), cipher.getAuthTag()]);
  return Buffer.concat([salt, iv, data]).toString("base64");
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
  const answerCode = ex.solution && !ex.hideCode ? codeBlock(dedent(ex.solution), "answer-code") : "";
  const answerBody = `<h4 tabindex="-1">ตัวอย่างคำตอบ</h4>${ex.answerHtml && ex.answerFirst ? ex.answerHtml : ""}${answerCode}${ex.answerHtml && !ex.answerFirst ? ex.answerHtml : ""}${ex.explain ? `<p>${ex.explain}</p>` : ""}`;
  const answer = `<div class="answer-gate" data-answer-id="${id}"><button class="answer-open" type="button">ใส่รหัสเพื่อดูเฉลย</button><form class="password-form" hidden><label>รหัสผ่านของข้อ ${id}<input type="password" autocomplete="off" required></label><button class="password-submit" type="submit">เปิดเฉลย</button><p class="password-message" aria-live="polite"></p></form><div class="answer-content" hidden data-enc="${encryptAnswer(id, answerBody)}"></div></div>`;
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
  <meta name="theme-color" content="#ffffff">
  <title>${ch.pageTitle} | Java programming by Prymania</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Bai+Jamjuree:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
  <link rel="stylesheet" href="../assets/lesson.css">
  <link rel="stylesheet" href="../assets/course-nav.css">
  <script>document.documentElement.classList.add("js");</script>
</head>
<body>
  <a class="skip-link" href="#lesson-content">ข้ามไปเนื้อหาบทเรียน</a>
  <div class="lesson-shell">
    <aside class="lesson-sidebar" aria-label="เมนูบทเรียน">
      <a class="lesson-brand" href="../index.html"><span class="brand-mark" aria-hidden="true">&lt;/&gt;</span><span><span class="brand-title">Java programming<br>by Prymania</span><span class="brand-caption">LECTURE NOTES</span></span></a>
      <!-- course-nav --><!-- /course-nav -->
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
  <script src="../assets/lesson.js"></script><script src="../assets/course-nav.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, ch.file), html);
  saveCache();
  return { file: ch.file, exercises: ch.exercises.length, bytes: html.length };
}
