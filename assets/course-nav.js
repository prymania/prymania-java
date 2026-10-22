// เมนูด้านซ้าย: คลิกชื่อบทเพื่อกาง/พับหัวข้อย่อย (ใช้ <details> จึงไม่เปลี่ยนหน้า)
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".course-nav");
  if (!nav) return;
  const aside = nav.closest("aside");
  const toggle = aside.querySelector(".nav-toggle");

  // จอเล็ก: ปุ่มเปิด/ปิดสารบัญ
  toggle?.addEventListener("click", () => {
    const open = aside.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest(".nav-topics a") && aside.classList.contains("nav-open")) {
      aside.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  // คงตำแหน่งเมนูไว้เมื่อคลิกไปหน้าอื่น: จำ scroll ของเมนูก่อนออกจากหน้า แล้วคืนค่าเมื่อเปิดหน้าใหม่
  const KEY = "course-nav-scroll";
  const save = () => { try { sessionStorage.setItem(KEY, String(aside.scrollTop)); } catch {} };
  nav.addEventListener("click", (event) => { if (event.target.closest("a")) save(); });
  addEventListener("pagehide", save);

  const current = nav.querySelector(".nav-chapter[open]");
  let saved = null;
  try { saved = sessionStorage.getItem(KEY); } catch {}
  if (saved !== null) aside.scrollTop = Number(saved);
  // เปิดหน้านี้ตรง ๆ (ไม่ได้คลิกมาจากเมนู): เลื่อนให้เห็นบทปัจจุบัน
  else if (current && aside.scrollHeight > aside.clientHeight) aside.scrollTop = current.offsetTop - 90;

  // ไฮไลต์หัวข้อย่อยที่กำลังอ่านอยู่
  if (!current || !("IntersectionObserver" in window)) return;
  const links = new Map();
  current.querySelectorAll('.nav-topics a[href^="#"]').forEach((a) => {
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (target && target.id !== "lesson-content") links.set(target, a);
  });
  const visible = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    const first = [...links.keys()].find((t) => visible.has(t));
    links.forEach((a, t) => a.classList.toggle("is-active", t === first));
  }, { rootMargin: "0px 0px -60% 0px" });
  links.forEach((_, target) => observer.observe(target));
});
