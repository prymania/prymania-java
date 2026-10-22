// เมนูด้านซ้าย (สารบัญทุกบท) ที่ใช้ร่วมกันใน index.html และทุกหน้าบท
// คลิกชื่อบทเพื่อกาง/พับหัวข้อย่อยในเมนู โดยไม่เปลี่ยนหน้า
import fs from "node:fs";
import path from "node:path";

// ลำดับกลุ่มและชื่อสั้นที่แสดงในเมนู — หัวข้อย่อยดึงจาก topics ของแต่ละบทอัตโนมัติ
export const NAV_GROUPS = [
  { label: "เริ่มต้น", items: [
    ["chapter-01.html", "01", "คิดเป็นขั้นตอน · Flowchart"],
    ["chapter-02.html", "02", "รู้จัก Java"],
    ["chapter-03.html", "03", "ตัวแปรและชนิดข้อมูล"],
    ["chapter-04.html", "04", "รับข้อมูลและแสดงผล"],
  ] },
  { label: "ฝึกเขียนโปรแกรม", items: [
    ["chapter-05.html", "05", "เงื่อนไข"],
    ["chapter-06.html", "06", "การทำซ้ำ"],
    ["chapter-07.html", "07", "เมธอด"],
    ["chapter-08.html", "08", "อาเรย์"],
    ["chapter-09.html", "09", "ข้อความและ String"],
  ] },
  { label: "ต่อยอดด้วย Java", items: [
    ["chapter-10.html", "10", "ทดสอบและแก้บั๊ก"],
    ["chapter-11.html", "11", "คลาสและออบเจ็กต์"],
    ["chapter-12.html", "12", "จัดระเบียบโค้ด"],
    ["chapter-13.html", "13", "ArrayList"],
    ["chapter-14.html", "14", "เริ่มต้นกับ Swing"],
    ["chapter-15.html", "15", "Components และ Layout"],
    ["chapter-16.html", "16", "เหตุการณ์และปุ่ม"],
    ["chapter-17.html", "17", "ฟอร์มและตรวจข้อมูล"],
    ["chapter-18.html", "18", "หลายหน้าจอ"],
    ["chapter-19.html", "19", "โปรเจกต์ GUI"],
  ] },
  { label: "บทเสริม · เลือกอ่าน", items: [
    ["side-quest-random.html", "+", "Random และเกมทายเลข"],
    ["side-quest-timer.html", "+", "Timer และ Thread"],
  ] },
];

export const topicId = (num) => `topic-${num.replace(".", "-")}`;

// chapters: ข้อมูลบททั้งหมด, base: path ไปโฟลเดอร์ chapters/ จากหน้าที่แสดง, current: ไฟล์ของหน้านี้ (ถ้าเป็นหน้าบท)
export function renderCourseNav(chapters, { base = "", current = null } = {}) {
  const byFile = new Map(chapters.map((ch) => [ch.file, ch]));
  const groups = NAV_GROUPS.map((g) => {
    const items = g.items.map(([file, number, label]) => {
      const ch = byFile.get(file);
      if (!ch) throw new Error(`nav.mjs: no chapter data for ${file}`);
      const here = file === current;
      const href = (hash) => (here ? hash : `${base}${file}${hash === "#lesson-content" ? "" : hash}`);
      const links = [
        `<a href="${href("#lesson-content")}"><span class="toc-number">${number === "+" ? ch.num : Number(number)}</span>ภาพรวมของบท</a>`,
        ...ch.topics.map((t) => `<a href="${href("#" + topicId(t.num))}"><span class="toc-number">${t.num}</span>${t.toc}</a>`),
        `<a href="${href("#chapter-exercises")}"><span class="toc-number">ฝึก</span>แบบฝึกหัดท้ายบท</a>`,
      ];
      return `<details class="nav-chapter" name="course-nav"${here ? " open" : ""}><summary${here ? ' aria-current="page"' : ""}><span class="nav-number">${number}</span><span class="nav-title">${label}</span></summary><div class="nav-topics">${links.join("")}</div></details>`;
    });
    return `<p class="nav-label">${g.label}</p>\n${items.join("\n")}`;
  });
  return `<!-- course-nav -->
<button class="nav-toggle" type="button" aria-expanded="false">☰ สารบัญทุกบท</button>
<nav class="course-nav" aria-label="สารบัญรายวิชา">
${groups.join("\n")}
</nav>
<!-- /course-nav -->`;
}

const MARKER = /<!-- course-nav -->[\s\S]*?<!-- \/course-nav -->/;

// เขียนเมนูใหม่ลงทุกหน้า (index.html และ chapters/*.html) ระหว่าง marker
export function syncCourseNav(root, chapters) {
  const pages = [["index.html", { base: "chapters/" }], ...chapters.map((ch) => [path.join("chapters", ch.file), { current: ch.file }])];
  for (const [rel, opts] of pages) {
    const file = path.join(root, rel);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    if (!MARKER.test(html)) throw new Error(`${rel}: missing <!-- course-nav --> marker`);
    const next = html.replace(MARKER, () => renderCourseNav(chapters, opts));
    if (next !== html) fs.writeFileSync(file, next);
  }
}
