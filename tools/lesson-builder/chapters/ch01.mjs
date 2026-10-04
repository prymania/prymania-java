import { j, c, pre } from "../lib.mjs";

export default {
  num: 1, file: "chapter-01.html",
  pageTitle: "บทที่ 1: คิดแก้ปัญหาและ Flowchart", shortName: "บทที่ 1",
  tocLabel: "บทที่ 1 · คิดก่อนเขียน", sidebarBottom: "คิดให้ชัดก่อนเขียนคำสั่ง",
  kicker: "บทที่ 1 · เริ่มจากการแก้ปัญหา", h1: "คิดแก้ปัญหาและออกแบบ Flowchart",
  lead: "การเขียนโปรแกรมเริ่มก่อนเปิด IDE: ทำความเข้าใจว่าโจทย์ต้องการอะไร วางขั้นตอนให้ชัด แล้วจึงแปลงเป็นคำสั่งของภาษา Java",
  goals: ["แยกข้อมูลเข้า วิธีประมวลผล และผลลัพธ์", "เขียนขั้นตอนวิธีและรหัสเทียม", "เลือกใช้สัญลักษณ์ Flowchart", "ติดตามทางเลือกและการทำซ้ำบนผังงาน"],
  prev: { href: "../index.html", label: "← กลับหน้าสารบัญ" },
  next: { href: "chapter-02.html", label: "บทที่ 2: เริ่มต้นกับ Java →" },
  footer: "บทที่ 1 · ลองคิดก่อนเปิดดูเฉลยทุกครั้ง",
  introHeading: "1. จากโจทย์ไปสู่ขั้นตอน",
  introHtml: `<p>โปรแกรมคือชุดคำสั่งที่บอกคอมพิวเตอร์ให้ทำงานเป็นลำดับ คอมพิวเตอร์ทำตามคำสั่งตรงตัวและไม่เดาใจเรา เราจึงต้องกำหนดให้ชัดว่าเริ่มจากข้อมูลใด ต้องประมวลผลอะไร และต้องแสดงคำตอบแบบไหน</p>
<div class="concept-box"><span class="box-title">กระบวนการแก้ปัญหา 4 ขั้น (ใช้ได้ทุกบท)</span><ol class="step-list"><li><strong>เข้าใจโจทย์</strong> — โจทย์ให้อะไรมา และถามอะไร (แยกเป็น Input/Output)</li><li><strong>วางแผน</strong> — คิดวิธีเปลี่ยน Input ให้เป็น Output เขียนเป็นรหัสเทียมหรือ Flowchart</li><li><strong>ลงมือเขียน</strong> — แปลงแผนเป็นคำสั่ง Java ทีละขั้น</li><li><strong>ทดสอบ</strong> — ลองข้อมูลหลายแบบ เทียบผลกับการคำนวณด้วยมือ ถ้าไม่ตรงให้ย้อนกลับไปขั้นที่ 2</li></ol></div>
<div class="note-box"><span class="box-title">เกี่ยวกับตัวอย่าง Java ในบทนี้</span><p>บทนี้เน้นการคิด ตัวอย่างหลายชิ้นจึงแสดง <strong>รหัสเทียมคู่กับโปรแกรม Java</strong> เพื่อให้เห็นว่าแผนที่คิดไว้กลายเป็นโค้ดได้อย่างไร ยังไม่ต้องจำไวยากรณ์ Java ตอนนี้ ให้สังเกตว่าแต่ละขั้นของแผนตรงกับบรรทัดใดของโค้ด ไวยากรณ์จะเรียนอย่างละเอียดตั้งแต่บทที่ 2</p></div>`,
  topics: [
    {
      num: "1.1", toc: "แยกโจทย์ด้วย IPO", title: "แยกโจทย์ด้วย Input · Process · Output",
      blocks: [
        { type: "p", html: `ขีดเส้นใต้ข้อมูลที่โจทย์ให้มาและสิ่งที่โจทย์ถาม แล้วจัดลง 3 ส่วน: <strong>Input</strong> คือข้อมูลที่ต้องมีก่อนเริ่มทำงาน, <strong>Process</strong> คือกฎหรือการคำนวณ, <strong>Output</strong> คือคำตอบที่ต้องการ` },
        { type: "steps", title: "ขั้นตอนการแยก IPO", items: [
          "อ่านโจทย์จนจบหนึ่งรอบ ยังไม่ต้องคิดวิธีทำ",
          "หาคำถามของโจทย์ (มักอยู่ท้ายประโยค เช่น “จงหา…”, “แสดง…”) → นี่คือ <strong>Output</strong>",
          "หาข้อมูลที่โจทย์ให้มาหรือที่ต้องถามผู้ใช้ → นี่คือ <strong>Input</strong>",
          "ถามตัวเองว่า “ถ้ามี Input แล้ว ต้องทำอะไรจึงได้ Output?” → นี่คือ <strong>Process</strong> (สูตร เงื่อนไข หรือขั้นตอน)",
          "ตรวจย้อน: Process ใช้เฉพาะข้อมูลที่อยู่ใน Input หรือค่าคงที่ที่รู้แน่นอนเท่านั้นหรือไม่",
        ] },
        { type: "table", title: "ตัวอย่างการแยก IPO จากง่ายไปซับซ้อน", head: ["โจทย์", "Input", "Process", "Output"], rows: [
          ["ซื้อสมุด 3 เล่ม ราคาเล่มละ 18 บาท จ่ายเท่าไร", "จำนวนเล่ม, ราคาต่อเล่ม", "ราคารวม = จำนวน × ราคา", "ราคารวม"],
          ["หาพื้นที่สี่เหลี่ยมผืนผ้า", "กว้าง, ยาว", "พื้นที่ = กว้าง × ยาว", "พื้นที่"],
          ["หาคะแนนเฉลี่ยจากสอบ 3 ครั้ง", "คะแนน 3 ค่า", "เฉลี่ย = (ค1 + ค2 + ค3) ÷ 3", "คะแนนเฉลี่ย"],
          ["ซื้อของแล้วจ่ายเงินสด ต้องทอนเท่าไร", "ราคาสินค้า, เงินที่จ่าย", "เงินทอน = เงินที่จ่าย − ราคา", "เงินทอน"],
          ["ซื้อครบ 500 บาทลด 10% ต้องจ่ายเท่าไร", "ยอดซื้อ", "ถ้ายอด ≥ 500 → ลด 10% มิฉะนั้นไม่ลด", "ยอดที่ต้องจ่าย"],
        ] },
        { type: "run", title: "IPO ของราคาสมุด → Java", level: "พื้นฐาน",
          concept: "Input ทั้งสองค่าถูกเก็บในตัวแปร Process คือบรรทัดที่คูณ และ Output คือบรรทัดที่พิมพ์ผล",
          code: j`
            public class NotebookPrice {
                public static void main(String[] args) {
                    // Input
                    int quantity = 3;
                    int pricePerBook = 18;

                    // Process
                    int total = quantity * pricePerBook;

                    // Output
                    System.out.println("Total = " + total + " baht");
                }
            }`,
          steps: ["บรรทัด Input เก็บจำนวนเล่ม (3) และราคาต่อเล่ม (18)", "บรรทัด Process คำนวณ 3 × 18 = 54 แล้วเก็บใน <code>total</code>", "บรรทัด Output แสดงข้อความพร้อมค่า 54"],
          tryIt: "เปลี่ยน quantity เป็น 5 แล้วทำนายผลก่อนดูเฉลยในหัว (ควรได้ 90)" },
        { type: "run", title: "IPO ที่รับค่าจากผู้ใช้: คะแนนเฉลี่ย", level: "ต่อยอด",
          concept: "โจทย์จริงมัก <em>ถาม</em> Input จากผู้ใช้ แทนการเขียนค่าตายตัวในโปรแกรม ผลลัพธ์จึงเปลี่ยนตามข้อมูลที่ป้อน",
          stdin: "70\n85\n90",
          code: j`
            import java.util.Scanner;

            public class AverageScore {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    // Input: คะแนน 3 ครั้ง
                    System.out.print("Score 1: ");
                    double s1 = input.nextDouble();
                    System.out.print("Score 2: ");
                    double s2 = input.nextDouble();
                    System.out.print("Score 3: ");
                    double s3 = input.nextDouble();

                    // Process
                    double average = (s1 + s2 + s3) / 3;

                    // Output
                    System.out.println("Average = " + average);
                }
            }`,
          steps: ["โปรแกรมถามคะแนนทีละครั้ง ผู้ใช้พิมพ์ 70, 85, 90", "Process รวมก่อน (245) แล้วจึงหารด้วย 3 — ต้องมีวงเล็บ เพราะการหารทำก่อนการบวก", "Output แสดง 81.666… ซึ่งตรงกับการคำนวณด้วยมือ"],
          tryIt: "ถ้าลบวงเล็บออกเป็น s1 + s2 + s3 / 3 ผลจะกลายเป็น 70 + 85 + 30 = 185 ซึ่งผิด นี่คือเหตุผลที่ต้องเขียน Process ให้ชัดก่อนเขียนโค้ด" },
        { type: "note", title: "ข้อผิดพลาดที่พบบ่อย", html: `<ul><li><strong>เอาคำตอบไปใส่ใน Input</strong> — คำตอบที่คำนวณเสร็จแล้วไม่ใช่ Input เพราะ Input ต้องมีก่อนเริ่มทำงาน</li><li><strong>Process คลุมเครือ</strong> เช่น “คำนวณราคา” ควรเขียนเป็นสูตรชัด ๆ ว่า “ราคารวม = จำนวน × ราคาต่อหน่วย”</li><li><strong>ลืมค่าคงที่</strong> เช่น ภาษี 7% เป็นค่าที่รู้อยู่แล้ว ไม่ต้องรับจากผู้ใช้ แต่ต้องระบุใน Process</li></ul>` },
        { type: "check", title: "ค่าน้ำประปา", html: `<p>“ค่าน้ำหน่วยละ 12 บาท บวกค่าบริการรายเดือน 30 บาท จงหาค่าน้ำที่ต้องจ่ายเมื่อทราบจำนวนหน่วยที่ใช้” — Input, Process, Output คืออะไร</p>`,
          answer: `<p><strong>Input:</strong> จำนวนหน่วยที่ใช้ · <strong>Process:</strong> ค่าน้ำ = หน่วย × 12 + 30 (12 และ 30 เป็นค่าคงที่ ไม่ใช่ Input) · <strong>Output:</strong> ค่าน้ำที่ต้องจ่าย</p>` },
      ],
    },
    {
      num: "1.2", toc: "ขั้นตอนวิธีและรหัสเทียม", title: "ขั้นตอนวิธีและรหัสเทียม (Pseudocode)",
      blocks: [
        { type: "p", html: `<strong>ขั้นตอนวิธี (algorithm)</strong> คือวิธีแก้ปัญหาที่เรียงเป็นขั้น ทุกขั้นชัดเจน และมีจุดจบ ส่วน <strong>รหัสเทียม (pseudocode)</strong> คือการเขียนขั้นตอนด้วยภาษาคนอย่างเป็นระเบียบ โดยยังไม่ยึดไวยากรณ์ของภาษาใด ช่วยให้คิด logic ได้โดยไม่ต้องกังวลเรื่อง <code>;</code> หรือวงเล็บ` },
        { type: "concept", title: "คุณสมบัติของขั้นตอนวิธีที่ดี", html: `<ul><li><strong>ชัดเจน</strong> — แต่ละขั้นตีความได้แบบเดียว (“เติมเกลือนิดหน่อย” ไม่ชัด, “เติมเกลือ 1 ช้อนชา” ชัด)</li><li><strong>มีลำดับ</strong> — ทำขั้นใดก่อนหลังต้องแน่นอน</li><li><strong>มีจุดจบ</strong> — ทำครบแล้วต้องหยุดได้เสมอ</li><li><strong>ให้ผลถูกต้อง</strong> — ทุก Input ที่ถูกต้องต้องได้ Output ที่ถูกต้อง</li></ul>` },
        { type: "steps", title: "วิธีเขียนรหัสเทียมทีละขั้น", items: [
          "เริ่มด้วยคำว่า <code>เริ่มต้น</code> และจบด้วย <code>จบ</code>",
          "ขั้นแรกเกือบทุกครั้งคือ <code>รับ ...</code> (Input) ตั้งชื่อข้อมูลให้สื่อความหมาย เช่น <code>totalMinutes</code>",
          "ขั้นกลางคือ <code>คำนวณ ...</code> หรือ <code>ตัวแปร = สูตร</code> (Process) หนึ่งบรรทัดทำหนึ่งเรื่อง",
          "ขั้นสุดท้ายคือ <code>แสดง ...</code> (Output)",
          "เยื้องบรรทัดเพื่อบอกว่าคำสั่งใดอยู่ภายใต้เงื่อนไขหรือการทำซ้ำ",
          "ทดสอบรหัสเทียมด้วยมือ (dry run) โดยสมมติค่า Input แล้วเดินทีละบรรทัด",
        ] },
        { type: "example", title: "รหัสเทียม: แปลงนาทีเป็นชั่วโมงและนาทีที่เหลือ", html: pre(`
          เริ่มต้น
              รับ totalMinutes
              hours = totalMinutes หารเอาส่วนจำนวนเต็มด้วย 60
              minutes = totalMinutes เศษจากการหารด้วย 60
              แสดง hours และ minutes
          จบ`) + `<p>Dry run ด้วย 135 นาที: 135 ÷ 60 ได้ 2 เศษ 15 → แสดง “2 ชั่วโมง 15 นาที”</p>` },
        { type: "run", title: "รหัสเทียมแปลงนาที → Java", level: "พื้นฐาน",
          concept: "แต่ละบรรทัดของรหัสเทียมกลายเป็นคำสั่ง Java หนึ่งบรรทัด “หารเอาส่วนจำนวนเต็ม” คือ <code>/</code> กับจำนวนเต็ม และ “เศษ” คือ <code>%</code>",
          stdin: "135",
          code: j`
            import java.util.Scanner;

            public class MinutesToHours {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Total minutes: ");
                    int totalMinutes = input.nextInt();      // รับ totalMinutes

                    int hours = totalMinutes / 60;           // หารเอาส่วนจำนวนเต็ม
                    int minutes = totalMinutes % 60;         // เศษจากการหาร

                    System.out.println(hours + " hours " + minutes + " minutes");
                }
            }`,
          steps: ["<code>totalMinutes</code> = 135", "<code>135 / 60</code> กับจำนวนเต็มได้ 2 (ตัดทศนิยมทิ้ง)", "<code>135 % 60</code> ได้เศษ 15", "แสดง <code>2 hours 15 minutes</code>"],
          tryIt: "ป้อน 59 หรือ 60 แล้วดูว่าได้อะไร — ค่าขอบแบบนี้ควรนำไปทดสอบทุกครั้ง" },
        { type: "run", title: "ขั้นตอนวิธีหลายขั้น: ทอนเงินเป็นธนบัตร", level: "ประยุกต์",
          concept: "เมื่อโจทย์ซับซ้อนขึ้น ให้แตกเป็นขั้นที่ซ้ำรูปแบบเดิม: หาจำนวนธนบัตรใบใหญ่ก่อน แล้วนำ “เงินที่เหลือ” ไปคิดใบถัดไป",
          stdin: "1370",
          code: j`
            import java.util.Scanner;

            public class BanknoteChange {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Amount: ");
                    int amount = input.nextInt();

                    int thousand = amount / 1000;   // จำนวนใบ 1000
                    amount = amount % 1000;         // เงินที่เหลือ
                    int hundred = amount / 100;     // จำนวนใบ 100
                    amount = amount % 100;
                    int twenty = amount / 20;       // จำนวนใบ 20
                    amount = amount % 20;

                    System.out.println("1000 x " + thousand);
                    System.out.println("100 x " + hundred);
                    System.out.println("20 x " + twenty);
                    System.out.println("coins left: " + amount);
                }
            }`,
          steps: ["รหัสเทียมคือ: รับ amount → ใบ1000 = amount ÷ 1000 → amount = เศษ → ใบ100 = amount ÷ 100 → … → แสดงผล", "1370 ÷ 1000 = 1 ใบ เหลือ 370", "370 ÷ 100 = 3 ใบ เหลือ 70", "70 ÷ 20 = 3 ใบ เหลือ 10 (เป็นเหรียญ)"],
          after: "สังเกตว่าขั้น “หาร แล้วเก็บเศษ” ซ้ำกัน 3 ครั้ง การมองเห็นรูปแบบที่ซ้ำเป็นทักษะสำคัญ ในบทที่ 6 จะใช้ลูปลดโค้ดซ้ำแบบนี้" },
        { type: "note", title: "รหัสเทียมที่อ่านง่าย", html: `<p>ใช้คำกริยาชัด ๆ เช่น รับ, คำนวณ, เปรียบเทียบ, แสดง และเยื้องบรรทัดเพื่อบอกว่าคำสั่งใดเป็นขั้นย่อย หลีกเลี่ยงประโยคยาวที่ทำหลายเรื่องในบรรทัดเดียว</p>` },
        { type: "check", title: "dry run", html: `<p>ใช้รหัสเทียมแปลงนาทีด้านบนกับ Input <code>200</code> จะแสดงอะไร</p>`, answer: `<p>200 ÷ 60 = 3 เศษ 20 → แสดง <code>3 ชั่วโมง 20 นาที</code></p>` },
      ],
    },
    {
      num: "1.3", toc: "สัญลักษณ์ Flowchart", title: "สัญลักษณ์และลำดับของ Flowchart",
      blocks: [
        { type: "p", html: "Flowchart (ผังงาน) คือแผนภาพแสดงลำดับการทำงาน ลูกศรบอกทิศทาง และรูปทรงบอกหน้าที่ของแต่ละขั้น เหมาะสำหรับมองภาพรวมและอธิบายให้คนอื่นเข้าใจ โดยเฉพาะเมื่อมีทางแยกหรือการวนซ้ำ" },
        { type: "table", head: ["สัญลักษณ์", "หน้าที่", "ตัวอย่าง", "ตรงกับ Java (จะได้เรียน)"], rows: [
          ["วงรี", "เริ่มต้นหรือสิ้นสุด", "เริ่มต้น, จบ", "<code>main</code> เริ่ม / จบ"],
          ["สี่เหลี่ยมด้านขนาน", "รับข้อมูลหรือแสดงผล", "รับความกว้าง, แสดงพื้นที่", "<code>Scanner</code>, <code>println</code>"],
          ["สี่เหลี่ยมผืนผ้า", "ประมวลผลหรือกำหนดค่า", "พื้นที่ = กว้าง × ยาว", "<code>area = w * h;</code>"],
          ["สี่เหลี่ยมข้าวหลามตัด", "ตรวจสอบเงื่อนไข (ใช่/ไม่ใช่)", "คะแนน ≥ 50?", "<code>if</code>, <code>while</code>"],
          ["ลูกศร", "เชื่อมและกำหนดทิศทาง", "บนลงล่างหรือซ้ายไปขวา", "ลำดับคำสั่ง"],
        ] },
        { type: "steps", title: "ขั้นตอนวาด Flowchart จากรหัสเทียม", items: [
          "วาดวงรี “เริ่มต้น” ด้านบนสุด",
          "แปลงบรรทัด <em>รับ/แสดง</em> เป็นสี่เหลี่ยมด้านขนาน",
          "แปลงบรรทัด <em>คำนวณ/กำหนดค่า</em> เป็นสี่เหลี่ยมผืนผ้า",
          "แปลงบรรทัด <em>ถ้า…</em> เป็นข้าวหลามตัด แล้วเขียนป้ายบนลูกศรขาออกทั้งสองเส้น (ใช่/ไม่ใช่)",
          "เชื่อมทุกรูปด้วยลูกศร ตรวจว่าทุกเส้นทางไปถึงวงรี “จบ” ได้",
        ] },
        { type: "example", title: "Flowchart: พื้นที่สี่เหลี่ยมผืนผ้า (ลำดับตรง ไม่มีทางแยก)", html: pre(`
          (วงรี) เริ่มต้น
              ↓
          (ด้านขนาน) รับ width, height
              ↓
          (สี่เหลี่ยม) area = width × height
              ↓
          (ด้านขนาน) แสดง area
              ↓
          (วงรี) จบ`) },
        { type: "run", title: "Flowchart พื้นที่ → Java", level: "พื้นฐาน",
          concept: "รูปแต่ละรูปในผังงานตรงกับคำสั่งหนึ่งกลุ่มในโค้ด อ่านโค้ดจากบนลงล่างเหมือนเดินตามลูกศร",
          stdin: "4.5\n2",
          code: j`
            import java.util.Scanner;

            public class RectangleArea {
                public static void main(String[] args) {           // (วงรี) เริ่มต้น
                    Scanner input = new Scanner(System.in);
                    System.out.print("Width: ");
                    double width = input.nextDouble();             // (ด้านขนาน) รับ
                    System.out.print("Height: ");
                    double height = input.nextDouble();

                    double area = width * height;                  // (สี่เหลี่ยม) คำนวณ

                    System.out.println("Area = " + area);          // (ด้านขนาน) แสดง
                }                                                  // (วงรี) จบ
            }`,
          steps: ["เริ่มที่ <code>main</code>", "รับ width = 4.5 และ height = 2", "คำนวณ area = 9.0", "แสดงผลแล้วจบโปรแกรม"] },
        { type: "run", title: "Flowchart แปลงอุณหภูมิ (สูตรหลายขั้น)", level: "ต่อยอด",
          concept: "สูตร F = C × 9 ÷ 5 + 32 อยู่ในสี่เหลี่ยมผืนผ้ากล่องเดียว แต่ต้องระวังลำดับการคำนวณ",
          stdin: "37",
          code: j`
            import java.util.Scanner;

            public class CelsiusToFahrenheit {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Celsius: ");
                    double c = input.nextDouble();

                    double f = c * 9 / 5 + 32;

                    System.out.println("Fahrenheit = " + f);
                }
            }`,
          steps: ["รับ c = 37", "คำนวณจากซ้ายไปขวา: 37 × 9 = 333 → ÷ 5 = 66.6 → + 32 = 98.6", "แสดง 98.6"],
          tryIt: "ทดสอบด้วย 0 (ควรได้ 32) และ 100 (ควรได้ 212) ซึ่งเป็นค่าที่รู้คำตอบแน่นอน" },
        { type: "check", title: "เลือกสัญลักษณ์", html: `<p>ขั้น “ราคาสุทธิ = ราคา − ส่วนลด” และ “ถ้าราคาสุทธิ > 1000” ควรใช้รูปทรงใด</p>`, answer: `<p>บรรทัดแรกเป็นการคำนวณ → <strong>สี่เหลี่ยมผืนผ้า</strong> บรรทัดที่สองเป็นเงื่อนไข → <strong>ข้าวหลามตัด</strong> ที่มีลูกศรออก 2 ทาง</p>` },
      ],
    },
    {
      num: "1.4", toc: "ทางเลือกและการทำซ้ำ", title: "ทางเลือกและการทำซ้ำในผังงาน",
      blocks: [
        { type: "p", html: `เมื่อมี <strong>ทางเลือก</strong> ให้ใช้รูปข้าวหลามตัดเขียนคำถามที่ตอบได้ว่า ใช่/ไม่ใช่ แล้ววาดลูกศรแยกทาง ส่วน <strong>การทำซ้ำ</strong> ใช้ลูกศรวนกลับไปยังเงื่อนไขที่ต้องตรวจใหม่ โปรแกรมเกือบทุกโปรแกรมประกอบจาก 3 โครงสร้างนี้: <em>ลำดับ (sequence)</em>, <em>ทางเลือก (selection)</em> และ <em>การทำซ้ำ (repetition)</em>` },
        { type: "example", title: "ทางเลือก 2 ทาง: ตรวจสอบการสอบผ่าน", html: pre(`
          (เริ่มต้น) → / รับ score / → ◇ score ≥ 50 ?
                                            ↙ ใช่       ไม่ใช่ ↘
                                / แสดง "ผ่าน" /   / แสดง "ไม่ผ่าน" /
                                            ↘             ↙
                                                 (จบ)`) + `<p>เงื่อนไขต้องมีทางออกครบทุกกรณี มิฉะนั้นบางค่าอาจไม่มีขั้นตอนรองรับ</p>` },
        { type: "run", title: "ทางเลือก 2 ทาง → Java", level: "พื้นฐาน",
          concept: "ข้าวหลามตัดกลายเป็น <code>if ... else</code> ทาง “ใช่” อยู่ใน <code>if</code> ทาง “ไม่ใช่” อยู่ใน <code>else</code>",
          stdin: "42",
          code: j`
            import java.util.Scanner;

            public class PassOrFail {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();

                    if (score >= 50) {
                        System.out.println("ผ่าน");
                    } else {
                        System.out.println("ไม่ผ่าน");
                    }
                    System.out.println("จบการตรวจ");
                }
            }`,
          steps: ["รับ score = 42", "ตรวจ 42 ≥ 50 → ไม่ใช่", "ไปทาง else แสดง “ไม่ผ่าน”", "ทั้งสองทางมาบรรจบกันที่ “จบการตรวจ”"],
          tryIt: "ทดสอบค่าขอบ 49, 50 และ 51 — ค่า 50 ต้องได้ “ผ่าน” เพราะใช้ ≥" },
        { type: "run", title: "ทางเลือกหลายชั้น: ตัดเกรด", level: "ต่อยอด",
          concept: "เมื่อมีมากกว่า 2 ผลลัพธ์ ให้ต่อข้าวหลามตัดเป็นทอด ๆ ตรวจช่วงคะแนนจากสูงลงต่ำ ทางที่ตอบ “ใช่” ก่อนจะได้ผลนั้นและไม่ตรวจต่อ",
          stdin: "73",
          code: j`
            import java.util.Scanner;

            public class GradeChain {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();

                    if (score >= 80) {
                        System.out.println("Grade A");
                    } else if (score >= 70) {
                        System.out.println("Grade B");
                    } else if (score >= 60) {
                        System.out.println("Grade C");
                    } else {
                        System.out.println("Grade F");
                    }
                }
            }`,
          steps: ["◇ score ≥ 80? 73 → ไม่ใช่ ไปข้าวหลามตัดถัดไป", "◇ score ≥ 70? 73 → ใช่ แสดง Grade B", "ไม่ตรวจเงื่อนไขที่เหลือ ไปที่จบเลย"],
          after: pre(`
            ◇ ≥80? ─ใช่→ / A /
              │ไม่ใช่
            ◇ ≥70? ─ใช่→ / B /
              │ไม่ใช่
            ◇ ≥60? ─ใช่→ / C /
              │ไม่ใช่
            / F /            (ทุกทางไปที่ จบ)`) },
        { type: "example", title: "การวนซ้ำ: รวมตัวเลขจนกว่าจะป้อน 0", html: `<p>เมื่อป้อนค่าที่ไม่ใช่ 0 ให้บวกเข้าผลรวม แล้วกลับไปรับค่าถัดไป; เมื่อป้อน 0 จึงออกจากวงซ้ำ</p>` + pre(`
          [กำหนด total = 0] → / รับ number / → ◇ number ≠ 0 ?
                                                ↙ ใช่          ไม่ใช่ ↘
                                   [total = total + number]   / แสดง total /
                                                ↓                 ↓
                                          / รับ number /        (จบ)
                                                ↖ กลับไปตรวจเงื่อนไข`) + `<p>วงซ้ำต้องมีทางออก ในตัวอย่างนี้ค่า 0 เป็นค่าหยุด (sentinel) ถ้าไม่มีวันป้อน 0 โปรแกรมก็จะรับข้อมูลต่อไปเรื่อย ๆ</p>` },
        { type: "run", title: "วงซ้ำด้วย sentinel → Java", level: "ประยุกต์",
          concept: "ลูกศรวนกลับคือ <code>while</code> เงื่อนไขในข้าวหลามตัดคือ <code>number != 0</code>",
          stdin: "5\n12\n8\n0",
          code: j`
            import java.util.Scanner;

            public class SumUntilZero {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int total = 0;
                    System.out.print("Number (0 = stop): ");
                    int number = input.nextInt();

                    while (number != 0) {
                        total = total + number;
                        System.out.print("Number (0 = stop): ");
                        number = input.nextInt();
                    }
                    System.out.println("Total = " + total);
                }
            }`,
          steps: ["total = 0, รับ 5 → 5 ≠ 0 จริง → total = 5", "รับ 12 → total = 17", "รับ 8 → total = 25", "รับ 0 → เงื่อนไขเท็จ ออกจากวง แสดง Total = 25"],
          after: "ลองทำ <strong>trace table</strong> ด้วยมือก่อนดู output:" },
        { type: "table", cls: "trace-table", head: ["รอบ", "number ที่รับ", "number ≠ 0 ?", "total หลังรอบ"], rows: [
          ["เริ่ม", "5", "ใช่", "5"], ["2", "12", "ใช่", "17"], ["3", "8", "ใช่", "25"], ["4", "0", "ไม่ใช่ → ออก", "25"],
        ] },
        { type: "check", title: "ทางออกของวงซ้ำ", html: `<p>ถ้าในผังงานรวมตัวเลข ลืมกล่อง “รับ number” ที่อยู่ในวงซ้ำ จะเกิดอะไรขึ้นเมื่อป้อนค่าแรกเป็น 5</p>`, answer: `<p>number จะเป็น 5 ตลอดไป เงื่อนไข number ≠ 0 จริงเสมอ เกิด <strong>วงซ้ำไม่รู้จบ (infinite loop)</strong> — ทุกวงซ้ำต้องมีขั้นที่ทำให้เงื่อนไขเปลี่ยนได้</p>` },
      ],
    },
  ],
  exercisesIntro: "บทนี้ยังไม่บังคับเขียน Java ให้ตอบเป็น IPO, รหัสเทียม หรือ Flowchart ตามที่โจทย์กำหนด ตัวอย่างผลลัพธ์แสดงว่าโปรแกรมที่ออกแบบถูกต้องควรทำงานอย่างไร เฉลยมีทั้งแผนและโค้ด Java ให้อ่านล่วงหน้า",
  exercises: [
    { level: 1, title: "IPO ของค่าเฉลี่ยคะแนน", html: `<p>โปรแกรมรับคะแนนสอบ 3 ครั้ง (เป็นทศนิยมได้) แล้วรายงานคะแนนเฉลี่ย</p>`,
      spec: ["ระบุ Input: มีกี่ค่า แต่ละค่าคืออะไร", "ระบุ Process เป็นสูตรที่ชัดเจน (ระวังลำดับการบวกและหาร)", "ระบุ Output", "ยังไม่ต้องเขียน Java"],
      stdin: "70\n80\n96", hideCode: false, answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class Average3 {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Score 1: ");
                double a = input.nextDouble();
                System.out.print("Score 2: ");
                double b = input.nextDouble();
                System.out.print("Score 3: ");
                double c = input.nextDouble();
                double average = (a + b + c) / 3;
                System.out.println("Average = " + average);
            }
        }`,
      answerHtml: `<p><strong>Input:</strong> คะแนนครั้งที่ 1, 2, 3 · <strong>Process:</strong> เฉลี่ย = (คะแนน1 + คะแนน2 + คะแนน3) ÷ 3 · <strong>Output:</strong> คะแนนเฉลี่ย</p><p>โค้ด Java สำหรับอ่านล่วงหน้า:</p>` },
    { level: 1, title: "IPO ของพื้นที่และเส้นรอบวงกลม", html: `<p>รับรัศมีของวงกลม แล้วแสดงทั้ง <strong>พื้นที่</strong> (πr²) และ <strong>เส้นรอบวง</strong> (2πr) ใช้ π = 3.14159</p>`,
      spec: ["ระบุ Input (มีกี่ค่า?)", "ระบุ Process สองสูตร และบอกว่า π เป็น Input หรือค่าคงที่", "ระบุ Output (มีกี่ค่า?)"],
      stdin: "7", answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class CircleIPO {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                final double PI = 3.14159;
                System.out.print("Radius: ");
                double r = input.nextDouble();
                double area = PI * r * r;
                double circumference = 2 * PI * r;
                System.out.println("Area = " + area);
                System.out.println("Circumference = " + circumference);
            }
        }`,
      answerHtml: `<p><strong>Input:</strong> รัศมี r (ค่าเดียว) · <strong>Process:</strong> พื้นที่ = π × r × r, เส้นรอบวง = 2 × π × r โดย π เป็น<em>ค่าคงที่</em> ไม่ต้องรับจากผู้ใช้ · <strong>Output:</strong> 2 ค่า คือพื้นที่และเส้นรอบวง</p>` },
    { level: 1, title: "รหัสเทียมแปลงวินาที", html: `<p>เขียนรหัสเทียมรับจำนวนวินาทีทั้งหมด แล้วแปลงเป็นจำนวนนาทีเต็มและวินาทีที่เหลือ เช่น 130 วินาทีเป็น 2 นาที 10 วินาที</p>`,
      spec: ["เริ่มด้วย “เริ่มต้น” จบด้วย “จบ”", "ใช้คำว่า “หารเอาส่วนจำนวนเต็ม” และ “เศษจากการหาร” ให้ถูกที่", "dry run รหัสเทียมของตัวเองด้วย 130 และ 59 ก่อนเปิดเฉลย"],
      runs: ["130", "59"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class SecondsToMinutes {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Seconds: ");
                int totalSeconds = input.nextInt();
                int minutes = totalSeconds / 60;
                int seconds = totalSeconds % 60;
                System.out.println(minutes + " minutes " + seconds + " seconds");
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ totalSeconds
            minutes = totalSeconds หารเอาส่วนจำนวนเต็มด้วย 60
            seconds = totalSeconds เศษจากการหารด้วย 60
            แสดง minutes และ seconds
        จบ`) },
    { level: 2, title: "Flowchart แปลงอุณหภูมิ", html: `<p>วางลำดับ Flowchart สำหรับรับอุณหภูมิเซลเซียส คำนวณฟาเรนไฮต์ด้วยสูตร <code>F = C × 9 / 5 + 32</code> แล้วแสดงผล</p>`,
      spec: ["เขียนชื่อสัญลักษณ์ของทุกขั้น (วงรี, ด้านขนาน, สี่เหลี่ยมผืนผ้า)", "เรียงจากเริ่มต้นถึงจบด้วยลูกศร", "ทดสอบด้วยค่า 0, 100 และ 37"],
      runs: ["0", "100", "37"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class TempFlow {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("C = ");
                double c = input.nextDouble();
                double f = c * 9 / 5 + 32;
                System.out.println("F = " + f);
            }
        }`,
      answerHtml: pre(`
        (วงรี) เริ่มต้น
          ↓
        (ด้านขนาน) รับ C
          ↓
        (สี่เหลี่ยมผืนผ้า) F = C × 9 / 5 + 32
          ↓
        (ด้านขนาน) แสดง F
          ↓
        (วงรี) จบ`) },
    { level: 2, title: "รั้วสวนผัก", html: `<p>สวนผักเป็นรูปสี่เหลี่ยมผืนผ้า ต้องการล้อมรั้วรอบสวน รับความกว้างและความยาว (เมตร) และ<strong>ราคารั้วต่อเมตร</strong> แล้วหาความยาวรั้วทั้งหมดและค่ารั้วรวม (ไม่คิดประตู)</p>`,
      spec: ["เขียน IPO ให้ครบ (Input มี 3 ค่า, Output มี 2 ค่า)", "เขียนรหัสเทียม โดยคำนวณความยาวรั้วก่อน แล้วนำไปใช้คำนวณราคา", "บอกว่าทำไมต้องคำนวณตามลำดับนี้"],
      stdin: "12\n8\n150", answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class GardenFence {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Width (m): ");
                double width = input.nextDouble();
                System.out.print("Length (m): ");
                double length = input.nextDouble();
                System.out.print("Price per meter: ");
                double price = input.nextDouble();
                double fence = 2 * (width + length);
                double cost = fence * price;
                System.out.println("Fence length = " + fence + " m");
                System.out.println("Cost = " + cost + " baht");
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ width, length, price
            fence = 2 × (width + length)
            cost = fence × price
            แสดง fence และ cost
        จบ`) + `<p>ต้องคำนวณ fence ก่อน เพราะ cost ใช้ค่า fence — ถ้าสลับลำดับจะใช้ค่าที่ยังไม่มี</p>` },
    { level: 2, title: "ค่าจอดรถ (ทางเลือก 2 ทาง)", html: `<p>ลานจอดรถคิดค่าบริการดังนี้: จอด<strong>ไม่เกิน 1 ชั่วโมงฟรี</strong> ถ้าเกิน 1 ชั่วโมงคิด<strong>เหมา 20 บาท</strong> รับจำนวนชั่วโมงที่จอด (จำนวนเต็ม) แล้วแสดงค่าจอด</p>`,
      spec: ["เขียนรหัสเทียมที่มีคำว่า “ถ้า … มิฉะนั้น …”", "วาด Flowchart ที่มีข้าวหลามตัด 1 อัน พร้อมป้าย ใช่/ไม่ใช่", "ทดสอบค่าขอบ 1 และ 2 ชั่วโมง"],
      runs: ["1", "2"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class ParkingFee {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Hours: ");
                int hours = input.nextInt();
                int fee;
                if (hours <= 1) {
                    fee = 0;
                } else {
                    fee = 20;
                }
                System.out.println("Fee = " + fee + " baht");
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ hours
            ถ้า hours ≤ 1
                fee = 0
            มิฉะนั้น
                fee = 20
            แสดง fee
        จบ`) },
    { level: 2, title: "ค่าจ้างและค่าล่วงเวลา", html: `<p>ค่าจ้างปกติชั่วโมงละ 100 บาท สำหรับ 40 ชั่วโมงแรก ชั่วโมงที่<strong>เกิน 40</strong> ได้ชั่วโมงละ 150 บาท รับจำนวนชั่วโมงทำงานในสัปดาห์ แล้วแสดงค่าจ้างรวม</p>`,
      spec: ["แยกกรณี “ไม่เกิน 40” และ “เกิน 40”", "กรณีเกิน: ค่าจ้าง = 40 × 100 + (ชั่วโมง − 40) × 150", "dry run ด้วย 38 และ 45 ชั่วโมง"],
      runs: ["38", "45"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class OvertimePay {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Hours worked: ");
                int hours = input.nextInt();
                int pay;
                if (hours <= 40) {
                    pay = hours * 100;
                } else {
                    pay = 40 * 100 + (hours - 40) * 150;
                }
                System.out.println("Pay = " + pay + " baht");
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ hours
            ถ้า hours ≤ 40
                pay = hours × 100
            มิฉะนั้น
                pay = 40 × 100 + (hours − 40) × 150
            แสดง pay
        จบ`) + `<p>45 ชั่วโมง: 4000 + 5 × 150 = 4750 บาท</p>` },
    { level: 3, title: "สรุปผลสอบและเกรด", html: `<p>รับคะแนน 3 วิชา (เต็มวิชาละ 100) หาค่าเฉลี่ย แล้วตัดเกรดตามเกณฑ์: ≥ 80 ได้ A, ≥ 70 ได้ B, ≥ 60 ได้ C, ≥ 50 ได้ D, ต่ำกว่า 50 ได้ F พร้อมแสดง “ผ่าน” ถ้าเกรดไม่ใช่ F</p>`,
      spec: ["เขียน IPO", "เขียนรหัสเทียมที่ตรวจช่วงคะแนนจากสูงไปต่ำ", "วาด Flowchart ที่มีข้าวหลามตัดต่อกันหลายชั้น", "อธิบายว่าทำไมต้องตรวจจากสูงลงต่ำ"],
      runs: ["85\n78\n90", "40\n55\n50"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class ExamSummary {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Subject 1: ");
                double s1 = input.nextDouble();
                System.out.print("Subject 2: ");
                double s2 = input.nextDouble();
                System.out.print("Subject 3: ");
                double s3 = input.nextDouble();
                double avg = (s1 + s2 + s3) / 3;
                String grade;
                if (avg >= 80) grade = "A";
                else if (avg >= 70) grade = "B";
                else if (avg >= 60) grade = "C";
                else if (avg >= 50) grade = "D";
                else grade = "F";
                System.out.printf("Average = %.2f%n", avg);
                System.out.println("Grade = " + grade);
                if (grade.equals("F")) System.out.println("ไม่ผ่าน");
                else System.out.println("ผ่าน");
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ s1, s2, s3
            avg = (s1 + s2 + s3) ÷ 3
            ถ้า avg ≥ 80 → grade = A
            มิฉะนั้น ถ้า avg ≥ 70 → grade = B
            มิฉะนั้น ถ้า avg ≥ 60 → grade = C
            มิฉะนั้น ถ้า avg ≥ 50 → grade = D
            มิฉะนั้น → grade = F
            แสดง avg, grade
            ถ้า grade = F แสดง "ไม่ผ่าน" มิฉะนั้น แสดง "ผ่าน"
        จบ`) + `<p>ถ้าตรวจจากต่ำไปสูง เช่น ตรวจ ≥ 50 ก่อน คะแนน 90 ก็จะได้ D ทันที เพราะ 90 ≥ 50 เป็นจริงและไม่ตรวจต่อ</p>` },
    { level: 3, title: "รวม นับ และเฉลี่ยจนกว่าจะป้อน 0", html: `<p>รับจำนวนเต็มบวกไปเรื่อย ๆ จนกว่าผู้ใช้จะป้อน 0 (ค่า 0 ไม่นับเป็นข้อมูล) จากนั้นแสดง <strong>ผลรวม</strong>, <strong>จำนวนค่าที่ป้อน</strong> และ <strong>ค่าเฉลี่ย</strong> ถ้าป้อน 0 ตั้งแต่แรกให้แสดง “ไม่มีข้อมูล”</p>`,
      spec: ["วาด Flowchart ที่มีลูกศรวนกลับ", "ต้องมีตัวแปรอย่างน้อย 2 ตัวที่เปลี่ยนค่าในวงซ้ำ (ผลรวม, ตัวนับ)", "จัดการกรณีไม่มีข้อมูล เพื่อไม่ให้หารด้วย 0", "ทำ trace table กับข้อมูล 4, 10, 7, 0"],
      runs: ["4\n10\n7\n0", "0"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class SumCountAverage {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                int total = 0;
                int count = 0;
                System.out.print("Number: ");
                int number = input.nextInt();
                while (number != 0) {
                    total = total + number;
                    count = count + 1;
                    System.out.print("Number: ");
                    number = input.nextInt();
                }
                if (count == 0) {
                    System.out.println("ไม่มีข้อมูล");
                } else {
                    System.out.println("Sum = " + total);
                    System.out.println("Count = " + count);
                    System.out.println("Average = " + (double) total / count);
                }
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            total = 0, count = 0
            รับ number
            ขณะที่ number ≠ 0
                total = total + number
                count = count + 1
                รับ number
            ถ้า count = 0
                แสดง "ไม่มีข้อมูล"
            มิฉะนั้น
                แสดง total, count, total ÷ count
        จบ`) },
    { level: 3, title: "ตู้กดน้ำทอนเหรียญ", html: `<p>ตู้กดน้ำขายน้ำขวดละ <strong>ราคาที่ผู้ใช้กำหนด</strong> รับราคาและเงินที่หยอด (จำนวนเต็ม) ถ้าเงินไม่พอให้แสดง “เงินไม่พอ ขาดอีก … บาท” ถ้าพอให้ทอนเงินโดยใช้<strong>เหรียญ 10, 5, 1 บาท ให้จำนวนเหรียญน้อยที่สุด</strong></p>`,
      spec: ["เขียน IPO", "ออกแบบรหัสเทียมที่มีทั้งทางเลือก (เงินพอ/ไม่พอ) และขั้นตอนทอนเหรียญแบบ “หาร แล้วเก็บเศษ”", "dry run กับราคา 13 เงิน 50 และราคา 25 เงิน 20"],
      runs: ["13\n50", "25\n20"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class VendingChange {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Price: ");
                int price = input.nextInt();
                System.out.print("Paid: ");
                int paid = input.nextInt();
                if (paid < price) {
                    System.out.println("เงินไม่พอ ขาดอีก " + (price - paid) + " บาท");
                } else {
                    int change = paid - price;
                    System.out.println("Change = " + change);
                    int ten = change / 10;
                    change = change % 10;
                    int five = change / 5;
                    change = change % 5;
                    int one = change;
                    System.out.println("10 baht x " + ten);
                    System.out.println("5 baht x " + five);
                    System.out.println("1 baht x " + one);
                }
            }
        }`,
      answerHtml: pre(`
        เริ่มต้น
            รับ price, paid
            ถ้า paid < price
                แสดง "เงินไม่พอ ขาดอีก" (price − paid)
            มิฉะนั้น
                change = paid − price
                ten = change ÷ 10 (ส่วนจำนวนเต็ม);  change = เศษ
                five = change ÷ 5;  change = เศษ
                one = change
                แสดง ten, five, one
        จบ`) + `<p>เงินทอน 37: 10 × 3 (เหลือ 7) → 5 × 1 (เหลือ 2) → 1 × 2</p>` },
  ],
};
