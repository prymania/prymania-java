const EXAMPLE_NOTES = [
  ["ตัวอย่าง 4.1.1", "สังเกตว่า print ต่อข้อความในบรรทัดเดิม ส่วน println จบด้วยการขึ้นบรรทัดใหม่"],
  ["ตัวอย่าง 4.1.2", "quantity = 3 และ unitPrice = 12.5 จึงได้ยอดรวม 37.50; %.2f แสดงทศนิยมสองตำแหน่ง"],
  ["ตัวอย่าง 4.2.1", "ตัวอย่างนี้รับความกว้าง 4.5 และความสูง 2 ตามลำดับ จึงคำนวณพื้นที่ได้ 9.00"],
  ["ตัวอย่าง 4.2.2", "โค้ดคาดว่าจะได้จำนวนเต็ม ถ้าป้อน 12.5 จะเกิด runtime error ชนิด InputMismatchException"],
  ["ตัวอย่าง 4.3.1", "ตัวอย่างรับอายุ 20 แล้วตามด้วยชื่อเต็ม Mali Nida ซึ่งมีช่องว่าง"],
  ["ตัวอย่าง 4.3.2", "output ว่างเพราะ nextInt ยังเหลือ Enter ใน input; nextLine จึงอ่านบรรทัดที่เหลือทันที"],
  ["ตัวอย่าง 6.1.1", "i เริ่มที่ 3 และลดลงทุกครั้ง; เมื่อ i เป็น 0 เงื่อนไข i > 0 เป็นเท็จ จึงจบลูป"],
  ["ตัวอย่าง 6.1.2", "1 != 0 เป็นจริงเสมอ ตัวอย่างจึงใช้ break หยุดเมื่อ count ถึง 3"],
  ["ตัวอย่าง 6.1.3", "while (true) ไม่มีเงื่อนไขหยุดเอง; break ทำให้ตัวอย่างจบหลังครบสามครั้ง"],
  ["ตัวอย่าง 6.2.1", "หัว for ทำงานตามลำดับ: กำหนด i = 1, ตรวจ i <= 3, ทำ body, แล้วเพิ่ม i"],
  ["ตัวอย่าง 6.2.2", "ส่วน update ใช้ i-- เพื่อนับจาก 5 ลงถึง 1; เมื่อ i เป็น 0 จะหยุดก่อนพิมพ์"],
  ["ตัวอย่าง 6.2.3", "for (;;) เป็นลูปที่ไม่มีเงื่อนไขหยุด; break ที่ count == 3 ทำให้จบได้"],
  ["ตัวอย่าง 6.2.4", "semicolon หลัง for ทำให้ body ว่างเปล่า บล็อกพิมพ์ Hello จึงทำครั้งเดียวหลังลูปจบ"],
  ["ตัวอย่าง 6.3.1", "body ทำก่อนตรวจเงื่อนไข จึงแสดง Run 1 ถึง Run 3 แล้วจบเมื่อ count เป็น 4"],
  ["ตัวอย่าง 6.4.1", "continue ข้ามเลขคู่ ส่วน break ออกจากลูปก่อนพิมพ์เลข 7"],
  ["ทดลอง error · assignment", "Compile error: i = 3 เป็นการกำหนดค่า int แต่ while ต้องการ boolean; การเปรียบเทียบใช้ =="],
  ["ทดลอง error · do-while", "Compile error: syntax ของ do-while ต้องมี semicolon หลัง while (condition)"],
  ["ทดลอง error · unreachable", "Compile error: break ทำให้คำสั่งถัดไปไม่มีทางทำงาน จึงเป็น unreachable statement"]
];

function formatJavaSource(source) {
  let depth = 0;

  return source.replace(/\r\n/g, "\n").trim().split("\n").map((line) => {
    const code = line.trim();
    if (!code) return "";

    const structuralCode = code
      .replace(/"(?:\\.|[^"\\])*"/g, '""')
      .replace(/'(?:\\.|[^'\\])*'/g, "''")
      .replace(/\/\/.*$/, "");
    const leadingClosers = (structuralCode.match(/^}+/) || [""])[0].length;
    const formattedLine = `${"    ".repeat(Math.max(0, depth - leadingClosers))}${code}`;
    const openings = (structuralCode.match(/{/g) || []).length;
    const closings = (structuralCode.match(/}/g) || []).length;
    depth = Math.max(0, depth + openings - closings);

    return formattedLine;
  }).join("\n");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".source-example").forEach((example) => {
    const editor = example.querySelector(".source-editor");
    const field = editor?.closest(".source-field");

    if (editor && field) {
      const label = field.querySelector("span");
      const source = document.createElement("pre");
      source.className = "source-code";
      source.textContent = formatJavaSource(editor.value);

      const readOnlyField = document.createElement("div");
      readOnlyField.className = "source-field";
      if (label) {
        label.textContent = "Java source";
        readOnlyField.append(label);
      }
      readOnlyField.append(source);
      field.replaceWith(readOnlyField);
    }

    example.querySelector(".source-actions")?.remove();
    example.querySelector(".stdin-input")?.remove();
    example.querySelector(".runner-status")?.remove();
    example.querySelector(".runner-post-form")?.remove();
    example.querySelector(".runner-panel")?.remove();

    const title = example.querySelector("h4")?.textContent || "";
    const outputLabel = example.querySelector(".source-output > span");
    if (outputLabel) {
      outputLabel.textContent = title.startsWith("ทดลอง error")
        ? "Compile error ที่คาด"
        : title.startsWith("ตัวอย่าง 4.2.2")
          ? "Runtime error ที่คาด"
          : "ผลลัพธ์ตัวอย่าง";
    }
    const output = example.querySelector(".source-output pre");
    if (output) {
      output.textContent = output.textContent
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    }

    const note = EXAMPLE_NOTES.find(([prefix]) => title.startsWith(prefix));
    if (note) {
      const description = example.querySelector(":scope > p");
      if (description) description.textContent = note[1];
    }
  });
});