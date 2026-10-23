import { j, c, pre, fpre, flowchart, shapeIcon } from "../lib.mjs";

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
        { type: "p", html: `ก่อนเขียนโค้ด ให้แยกโจทย์เป็น 3 ส่วน: <strong>Input</strong> ข้อมูลที่ต้องมีก่อนเริ่ม, <strong>Process</strong> สูตรหรือกฎที่ใช้คำนวณ และ <strong>Output</strong> คำตอบที่โจทย์ถาม` },
        { type: "table", head: ["โจทย์", "Input", "Process", "Output"], rows: [
          ["ซื้อสมุด 3 เล่ม เล่มละ 18 บาท จ่ายเท่าไร", "จำนวนเล่ม, ราคาต่อเล่ม", "รวม = จำนวน × ราคา", "ราคารวม"],
          ["หาพื้นที่สี่เหลี่ยมผืนผ้า", "กว้าง, ยาว", "พื้นที่ = กว้าง × ยาว", "พื้นที่"],
          ["หาคะแนนเฉลี่ยจากสอบ 3 ครั้ง", "คะแนน 3 ค่า", "เฉลี่ย = (ค1 + ค2 + ค3) ÷ 3", "คะแนนเฉลี่ย"],
          ["ซื้อครบ 500 บาทลด 10% ต้องจ่ายเท่าไร", "ยอดซื้อ", "ถ้ายอด ≥ 500 ลด 10%", "ยอดที่ต้องจ่าย"],
        ] },
        { type: "tip", title: "วิธีหา IPO", html: `หาคำถามของโจทย์ก่อน (มักอยู่ท้ายประโยค เช่น “จงหา…”) นั่นคือ <strong>Output</strong> แล้วถามตัวเองว่า “ต้องรู้อะไรบ้างจึงจะคำนวณได้” นั่นคือ <strong>Input</strong> ที่เหลือคือ <strong>Process</strong>` },
        { type: "h", text: "จาก IPO สู่โค้ด" },
        { type: "p", html: `แต่ละส่วนของ IPO กลายเป็นโค้ดหนึ่งกลุ่ม ยังไม่ต้องจำไวยากรณ์ Java ตอนนี้ ให้สังเกตว่าแผนตรงกับบรรทัดไหน` },
        { type: "run", title: "IPO ของราคาสมุด",
          code: j`
            public class NotebookPrice {
                public static void main(String[] args) {
                    // Input
                    int quantity = 3;                      // จำนวนเล่ม
                    int pricePerBook = 18;                 // ราคาต่อเล่ม

                    // Process
                    int total = quantity * pricePerBook;   // 3 × 18 = 54

                    // Output
                    System.out.println("Total = " + total + " baht");
                }
            }`,
          },
        { type: "warn", html: `อย่าใส่คำตอบไว้ใน Input (คำตอบคือสิ่งที่ได้หลังคำนวณ) และเขียน Process เป็นสูตรชัด ๆ เช่น “รวม = จำนวน × ราคา” ไม่ใช่ “คำนวณราคา” ส่วนค่าที่รู้อยู่แล้ว เช่น ภาษี 7% เป็นค่าคงที่ใน Process ไม่ต้องรับจากผู้ใช้` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: รับ Input จากผู้ใช้", blocks: [
          { type: "p", html: `โจทย์จริงมักให้ผู้ใช้ป้อน Input แทนการเขียนค่าตายตัว ผลลัพธ์จึงเปลี่ยนตามข้อมูลที่ป้อน` },
          { type: "run", title: "คะแนนเฉลี่ย 3 ครั้ง", stdin: "70\n85\n90",
            code: j`
              import java.util.Scanner;

              public class AverageScore {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);     // เตรียมรับข้อมูลจากคีย์บอร์ด
                      System.out.print("Score 1: ");
                      double s1 = input.nextDouble();
                      System.out.print("Score 2: ");
                      double s2 = input.nextDouble();
                      System.out.print("Score 3: ");
                      double s3 = input.nextDouble();

                      double average = (s1 + s2 + s3) / 3;        // วงเล็บ: บวกให้ครบก่อน แล้วจึงหาร
                      System.out.println("Average = " + average);
                  }
              }`,
            after: "ถ้าลบวงเล็บเป็น <code>s1 + s2 + s3 / 3</code> จะได้ 70 + 85 + 30 = 185 ซึ่งผิด เพราะการหารทำก่อนการบวก" },
        ] },
        { type: "check", title: "ค่าน้ำประปา", html: `<p>“ค่าน้ำหน่วยละ 12 บาท บวกค่าบริการรายเดือน 30 บาท จงหาค่าน้ำที่ต้องจ่ายเมื่อทราบจำนวนหน่วยที่ใช้” — Input, Process, Output คืออะไร</p>`,
          answer: `<p><strong>Input:</strong> จำนวนหน่วยที่ใช้ · <strong>Process:</strong> ค่าน้ำ = หน่วย × 12 + 30 (12 และ 30 เป็นค่าคงที่ ไม่ใช่ Input) · <strong>Output:</strong> ค่าน้ำที่ต้องจ่าย</p>` },
      ],
    },
    {
      num: "1.2", toc: "ขั้นตอนวิธีและรหัสเทียม", title: "ขั้นตอนวิธีและรหัสเทียม (Pseudocode)",
      blocks: [
        { type: "p", html: `<strong>ขั้นตอนวิธี (algorithm)</strong> คือวิธีแก้ปัญหาที่เรียงเป็นขั้น ส่วน <strong>รหัสเทียม (pseudocode)</strong> คือการเขียนขั้นตอนนั้นด้วยภาษาคนอย่างเป็นระเบียบ ช่วยให้คิด logic ได้โดยยังไม่ต้องกังวลเรื่อง <code>;</code> หรือวงเล็บ` },
        { type: "table", head: ["ขั้นตอนวิธีที่ดีต้อง", "ตัวอย่าง"], rows: [
          ["ชัดเจน ตีความได้แบบเดียว", "“เติมเกลือ 1 ช้อนชา” ไม่ใช่ “เติมเกลือนิดหน่อย”"],
          ["มีลำดับแน่นอน", "รับข้อมูลก่อน แล้วจึงคำนวณ"],
          ["มีจุดจบ", "ทำครบแล้วหยุดได้เสมอ"],
          ["ให้ผลถูกต้อง", "ทุก Input ที่ถูกต้องได้ Output ที่ถูกต้อง"],
        ] },
        { type: "h", text: "เขียนรหัสเทียม" },
        { type: "p", html: `เริ่มด้วย <code>เริ่มต้น</code> จบด้วย <code>จบ</code> ใช้คำกริยาชัด ๆ คือ <code>รับ</code> (Input), <code>คำนวณ</code> หรือ <code>ตัวแปร = สูตร</code> (Process) และ <code>แสดง</code> (Output) บรรทัดละหนึ่งเรื่อง` },
        { type: "html", html: fpre(`
          เริ่มต้น
              รับ totalMinutes
              hours = totalMinutes หารเอาส่วนจำนวนเต็มด้วย 60
              minutes = totalMinutes เศษจากการหารด้วย 60
              แสดง hours และ minutes
          จบ`, "รหัสเทียม") },
        { type: "p", html: `แต่ละบรรทัดของรหัสเทียมกลายเป็นคำสั่ง Java หนึ่งบรรทัด “หารเอาส่วนจำนวนเต็ม” คือ <code>/</code> และ “เศษ” คือ <code>%</code>` },
        { type: "run", title: "แปลงนาทีเป็นชั่วโมงและนาที", stdin: "135",
          code: j`
            import java.util.Scanner;

            public class MinutesToHours {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Total minutes: ");
                    int totalMinutes = input.nextInt();     // รับ totalMinutes  → 135

                    int hours = totalMinutes / 60;          // หารเอาส่วนจำนวนเต็ม → 2
                    int minutes = totalMinutes % 60;        // เศษจากการหาร → 15

                    System.out.println(hours + " hours " + minutes + " minutes");   // แสดง
                }
            }`,
          },
        { type: "try", html: `ป้อน 59 และ 60 แล้วทำนายผลก่อนรัน ค่าขอบแบบนี้ควรนำไปทดสอบทุกครั้ง` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: ขั้นตอนที่ซ้ำรูปแบบเดิม (ทอนธนบัตร)", blocks: [
          { type: "p", html: `หาจำนวนธนบัตรใบใหญ่ก่อน แล้วนำ “เงินที่เหลือ” ไปคิดใบถัดไป ขั้น “หาร แล้วเก็บเศษ” จึงซ้ำกัน 3 ครั้ง (บทที่ 6 จะใช้ลูปลดโค้ดซ้ำแบบนี้)` },
          { type: "run", title: "ทอนเงินเป็นธนบัตร", stdin: "1370",
            code: j`
              import java.util.Scanner;

              public class BanknoteChange {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Amount: ");
                      int amount = input.nextInt();      // 1370

                      int thousand = amount / 1000;      // 1 ใบ
                      amount = amount % 1000;            // เหลือ 370
                      int hundred = amount / 100;        // 3 ใบ
                      amount = amount % 100;             // เหลือ 70
                      int twenty = amount / 20;          // 3 ใบ
                      amount = amount % 20;              // เหลือ 10 เป็นเหรียญ

                      System.out.println("1000 x " + thousand);
                      System.out.println("100 x " + hundred);
                      System.out.println("20 x " + twenty);
                      System.out.println("coins left: " + amount);
                  }
              }`,
            },
        ] },
        { type: "check", title: "dry run", html: `<p>ใช้รหัสเทียมแปลงนาทีด้านบนกับ Input <code>200</code> จะแสดงอะไร</p>`, answer: `<p>200 ÷ 60 = 3 เศษ 20 → แสดง <code>3 ชั่วโมง 20 นาที</code></p>` },
      ],
    },
    {
      num: "1.3", toc: "สัญลักษณ์ Flowchart", title: "สัญลักษณ์และลำดับของ Flowchart",
      blocks: [
        { type: "p", html: `Flowchart (ผังงาน) คือแผนภาพลำดับการทำงาน รูปทรงบอกหน้าที่ของแต่ละขั้น และลูกศรบอกทิศทาง เหมาะกับการมองภาพรวม โดยเฉพาะเมื่อมีทางแยกหรือการวนซ้ำ` },
        { type: "table", head: ["สัญลักษณ์", "หน้าที่", "ตัวอย่าง", "ใน Java"], rows: [
          [shapeIcon("terminal") + "วงรี", "เริ่มต้น / สิ้นสุด", "เริ่มต้น, จบ", "<code>main</code> เริ่ม / จบ"],
          [shapeIcon("io") + "สี่เหลี่ยมด้านขนาน", "รับข้อมูล / แสดงผล", "รับความกว้าง, แสดงพื้นที่", "<code>Scanner</code>, <code>println</code>"],
          [shapeIcon("process") + "สี่เหลี่ยมผืนผ้า", "คำนวณ / กำหนดค่า", "พื้นที่ = กว้าง × ยาว", "<code>area = w * h;</code>"],
          [shapeIcon("decision") + "ข้าวหลามตัด", "ตรวจเงื่อนไข ใช่ / ไม่ใช่", "คะแนน ≥ 50 ?", "<code>if</code>, <code>while</code>"],
          [shapeIcon("arrow") + "ลูกศร", "ทิศทางการทำงาน", "บนลงล่าง", "ลำดับคำสั่ง"],
        ] },
        { type: "h", text: "จาก Flowchart สู่โค้ด" },
        { type: "p", html: `อ่านโค้ดจากบนลงล่างเหมือนเดินตามลูกศร รูปแต่ละรูปตรงกับคำสั่งหนึ่งกลุ่ม` },
        { type: "html", html: flowchart({ caption: "พื้นที่สี่เหลี่ยมผืนผ้า: ลำดับ 5 ขั้นจากบนลงล่าง", nodes: {
          start: ["terminal", "เริ่มต้น", 0, 0],
          input: ["io", "รับ width, height", 0, 1],
          calc: ["process", "area = width × height", 0, 2, 196],
          show: ["io", "แสดง area", 0, 3],
          end: ["terminal", "จบ", 0, 4],
        }, edges: [["start", "input"], ["input", "calc"], ["calc", "show"], ["show", "end"]] }) },
        { type: "run", title: "พื้นที่สี่เหลี่ยมผืนผ้า", stdin: "4.5\n2",
          code: j`
            import java.util.Scanner;

            public class RectangleArea {
                public static void main(String[] args) {         // (วงรี) เริ่มต้น
                    Scanner input = new Scanner(System.in);
                    System.out.print("Width: ");
                    double width = input.nextDouble();           // (ด้านขนาน) รับ
                    System.out.print("Height: ");
                    double height = input.nextDouble();

                    double area = width * height;                // (สี่เหลี่ยม) คำนวณ → 9.0

                    System.out.println("Area = " + area);        // (ด้านขนาน) แสดง
                }                                                // (วงรี) จบ
            }`,
          },
        { type: "tip", html: `วาด Flowchart จากรหัสเทียมได้ทันที: บรรทัด <em>รับ/แสดง</em> เป็นสี่เหลี่ยมด้านขนาน, <em>คำนวณ</em> เป็นสี่เหลี่ยมผืนผ้า, <em>ถ้า…</em> เป็นข้าวหลามตัด แล้วตรวจว่าทุกเส้นทางไปถึง “จบ” ได้` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: สูตรหลายขั้น (แปลงอุณหภูมิ)", blocks: [
          { type: "run", title: "เซลเซียสเป็นฟาเรนไฮต์", stdin: "37",
            code: j`
              import java.util.Scanner;

              public class CelsiusToFahrenheit {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Celsius: ");
                      double c = input.nextDouble();               // (ด้านขนาน) รับ → 37

                      double f = c * 9 / 5 + 32;                   // (สี่เหลี่ยม) ×9 → ÷5 → +32 = 98.6

                      System.out.println("Fahrenheit = " + f);     // (ด้านขนาน) แสดง
                  }
              }`,
            after: "ทดสอบด้วย 0 (ควรได้ 32) และ 100 (ควรได้ 212) ซึ่งเป็นค่าที่รู้คำตอบแน่นอน" },
        ] },
        { type: "check", title: "เลือกสัญลักษณ์", html: `<p>ขั้น “ราคาสุทธิ = ราคา − ส่วนลด” และ “ถ้าราคาสุทธิ > 1000” ควรใช้รูปทรงใด</p>`, answer: `<p>บรรทัดแรกเป็นการคำนวณ → <strong>สี่เหลี่ยมผืนผ้า</strong> บรรทัดที่สองเป็นเงื่อนไข → <strong>ข้าวหลามตัด</strong> ที่มีลูกศรออก 2 ทาง</p>` },
      ],
    },
    {
      num: "1.4", toc: "ทางเลือกและการทำซ้ำ", title: "ทางเลือกและการทำซ้ำในผังงาน",
      blocks: [
        { type: "p", html: `โปรแกรมเกือบทุกโปรแกรมประกอบจาก 3 โครงสร้าง: <strong>ลำดับ</strong> (ทำทีละขั้น), <strong>ทางเลือก</strong> (แยกทางตามเงื่อนไข) และ <strong>การทำซ้ำ</strong> (วนกลับไปทำใหม่)` },
        { type: "h", text: "ทางเลือก: ข้าวหลามตัดกลายเป็น if ... else" },
        { type: "html", html: flowchart({ caption: "ข้าวหลามตัดแยกเป็น 2 ทาง แล้วมาบรรจบกันก่อนทำขั้นถัดไป", nodes: {
          start: ["terminal", "เริ่มต้น", 1, 0],
          input: ["io", "รับ score", 1, 1],
          check: ["decision", "score ≥ 50 ?", 1, 2],
          pass: ["io", "แสดง \"ผ่าน\"", 0, 3],
          fail: ["io", "แสดง \"ไม่ผ่าน\"", 2, 3],
          done: ["io", "แสดง \"จบการตรวจ\"", 1, 4],
          end: ["terminal", "จบ", 1, 5],
        }, edges: [
          ["start", "input"], ["input", "check"],
          ["check", "pass", { out: "left", label: "ใช่" }],
          ["check", "fail", { out: "right", label: "ไม่ใช่" }],
          ["pass", "done"], ["fail", "done"], ["done", "end"],
        ] }) },
        { type: "run", title: "ตรวจสอบการสอบผ่าน", stdin: "42",
          code: j`
            import java.util.Scanner;

            public class PassOrFail {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();

                    if (score >= 50) {                       // ◇ score ≥ 50 ?
                        System.out.println("ผ่าน");          // ทาง "ใช่"
                    } else {
                        System.out.println("ไม่ผ่าน");       // ทาง "ไม่ใช่" ← 42 มาทางนี้
                    }
                    System.out.println("จบการตรวจ");        // ทั้งสองทางมาบรรจบที่นี่
                }
            }`,
          },
        { type: "try", html: `ทดสอบค่าขอบ 49, 50 และ 51 ค่า 50 ต้องได้ “ผ่าน” เพราะเงื่อนไขใช้ ≥` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: ทางเลือกหลายชั้น (ตัดเกรด)", blocks: [
          { type: "p", html: `เมื่อมีมากกว่า 2 ผลลัพธ์ ให้ต่อข้าวหลามตัดเป็นทอด ๆ ตรวจจากช่วงสูงลงต่ำ ทางแรกที่ตอบ “ใช่” ได้ผลนั้นและไม่ตรวจต่อ` },
          { type: "html", html: flowchart({ rowH: 96, caption: "ตรวจจากช่วงสูงลงต่ำ ทางแรกที่ตอบ “ใช่” ได้เกรดนั้นแล้วไปที่จบทันที", nodes: {
            start: ["terminal", "เริ่มต้น", 0, 0],
            input: ["io", "รับ score", 0, 1],
            a: ["decision", "score ≥ 80 ?", 0, 2],
            b: ["decision", "score ≥ 70 ?", 0, 3],
            c: ["decision", "score ≥ 60 ?", 0, 4],
            ga: ["io", "แสดง Grade A", 1.25, 2],
            gb: ["io", "แสดง Grade B", 1.25, 3],
            gc: ["io", "แสดง Grade C", 1.25, 4],
            gf: ["io", "แสดง Grade F", 0, 5],
            end: ["terminal", "จบ", 0, 6],
          }, edges: [
            ["start", "input"], ["input", "a"],
            ["a", "ga", { out: "right", in: "left", label: "ใช่" }], ["a", "b", { label: "ไม่ใช่" }],
            ["b", "gb", { out: "right", in: "left", label: "ใช่" }], ["b", "c", { label: "ไม่ใช่" }],
            ["c", "gc", { out: "right", in: "left", label: "ใช่" }], ["c", "gf", { label: "ไม่ใช่" }],
            ["ga", "end", { out: "right", in: "right", via: [[1.87, 2], [1.87, 6]] }],
            ["gb", "end", { out: "right", in: "right", via: [[1.87, 3], [1.87, 6]] }],
            ["gc", "end", { out: "right", in: "right", via: [[1.87, 4], [1.87, 6]] }],
            ["gf", "end"],
          ] }) },
          { type: "run", title: "ตัดเกรด", stdin: "73",
            code: j`
              import java.util.Scanner;

              public class GradeChain {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Score: ");
                      int score = input.nextInt();

                      if (score >= 80) {                 // ◇ 73 ≥ 80 ? ไม่ใช่
                          System.out.println("Grade A");
                      } else if (score >= 70) {          // ◇ 73 ≥ 70 ? ใช่ → จบที่นี่
                          System.out.println("Grade B");
                      } else if (score >= 60) {
                          System.out.println("Grade C");
                      } else {
                          System.out.println("Grade F");
                      }
                  }
              }`,
            },
        ] },
        { type: "h", text: "การทำซ้ำ: ลูกศรวนกลับกลายเป็น while" },
        { type: "p", html: `รวมตัวเลขที่ผู้ใช้ป้อนไปเรื่อย ๆ จนกว่าจะป้อน 0 ค่า 0 นี้เรียกว่า <strong>ค่าหยุด (sentinel)</strong>` },
        { type: "html", html: flowchart({ rowH: 96, caption: "ลูกศรจากล่างวนกลับขึ้นไปที่ข้าวหลามตัด คือการทำซ้ำ (while)", nodes: {
          start: ["terminal", "เริ่มต้น", 1, 0],
          init: ["process", "total = 0", 1, 1],
          first: ["io", "รับ number", 1, 2],
          check: ["decision", "number ≠ 0 ?", 1, 3],
          add: ["process", "total = total + number", 1, 4, 200],
          next: ["io", "รับ number", 1, 5],
          show: ["io", "แสดง total", 2.25, 3],
          end: ["terminal", "จบ", 2.25, 4],
        }, edges: [
          ["start", "init"], ["init", "first"], ["first", "check"],
          ["check", "add", { label: "ใช่" }], ["add", "next"],
          ["next", "check", { out: "left", in: "left", via: [[0.35, 5], [0.35, 3]] }],
          ["check", "show", { out: "right", in: "left", label: "ไม่ใช่" }],
          ["show", "end"],
        ] }) },
        { type: "run", title: "รวมตัวเลขจนกว่าจะป้อน 0", stdin: "5\n12\n8\n0",
          code: j`
            import java.util.Scanner;

            public class SumUntilZero {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int total = 0;                            // ผลรวมเริ่มที่ 0
                    System.out.print("Number (0 = stop): ");
                    int number = input.nextInt();             // รับค่าแรกก่อนเข้าวงซ้ำ

                    while (number != 0) {                     // ◇ number ≠ 0 ?
                        total = total + number;               // บวกสะสม
                        System.out.print("Number (0 = stop): ");
                        number = input.nextInt();             // รับค่าใหม่ แล้ววนกลับไปตรวจ
                    }
                    System.out.println("Total = " + total);   // ออกจากวงเมื่อป้อน 0
                }
            }`,
          },
        { type: "table", cls: "trace-table", title: "Trace table: ไล่ค่าทีละรอบ", head: ["รอบ", "number ที่รับ", "number ≠ 0 ?", "total หลังรอบ"], rows: [
          ["1", "5", "ใช่", "5"], ["2", "12", "ใช่", "17"], ["3", "8", "ใช่", "25"], ["4", "0", "ไม่ใช่ → ออก", "25"],
        ] },
        { type: "warn", html: `ทุกวงซ้ำต้องมีขั้นที่ทำให้เงื่อนไขเปลี่ยนได้ ในตัวอย่างนี้คือ “รับ number ใหม่” ถ้าลืมขั้นนี้ เงื่อนไขจะจริงตลอดไปและเกิด <strong>วงซ้ำไม่รู้จบ</strong>` },
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
                // Process: บวกก่อนแล้วจึงหาร
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
                final double PI = 3.14159;  // ค่าคงที่ ไม่ใช่ Input
                System.out.print("Radius: ");
                double r = input.nextDouble();
                double area = PI * r * r;           // πr²
                double circumference = 2 * PI * r;  // 2πr
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
                // หารเอาส่วนจำนวนเต็ม
                int minutes = totalSeconds / 60;
                int seconds = totalSeconds % 60;  // เศษจากการหาร
                System.out.println(minutes + " minutes " + seconds + " seconds");
            }
        }`,
      answerHtml: fpre(`
        เริ่มต้น
            รับ totalSeconds
            minutes = totalSeconds หารเอาส่วนจำนวนเต็มด้วย 60
            seconds = totalSeconds เศษจากการหารด้วย 60
            แสดง minutes และ seconds
        จบ`, "รหัสเทียม") },
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
                // (สี่เหลี่ยมผืนผ้า) คำนวณ
                double f = c * 9 / 5 + 32;
                System.out.println("F = " + f);  // (ด้านขนาน) แสดง
            }
        }`,
      answerHtml: flowchart({ nodes: {
        start: ["terminal", "เริ่มต้น", 0, 0],
        input: ["io", "รับ C", 0, 1],
        calc: ["process", "F = C × 9 / 5 + 32", 0, 2, 196],
        show: ["io", "แสดง F", 0, 3],
        end: ["terminal", "จบ", 0, 4],
      }, edges: [["start", "input"], ["input", "calc"], ["calc", "show"], ["show", "end"]] }) },
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
                // ความยาวรั้ว: ต้องคำนวณก่อน
                double fence = 2 * (width + length);
                // ใช้ fence ที่ได้จากบรรทัดบน
                double cost = fence * price;
                System.out.println("Fence length = " + fence + " m");
                System.out.println("Cost = " + cost + " baht");
            }
        }`,
      answerHtml: fpre(`
        เริ่มต้น
            รับ width, length, price
            fence = 2 × (width + length)
            cost = fence × price
            แสดง fence และ cost
        จบ`, "รหัสเทียม") + `<p>ต้องคำนวณ fence ก่อน เพราะ cost ใช้ค่า fence — ถ้าสลับลำดับจะใช้ค่าที่ยังไม่มี</p>` },
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
                if (hours <= 1) {  // ◇ ไม่เกิน 1 ชั่วโมง ?
                    fee = 0;       // ใช่: ฟรี
                } else {
                    fee = 20;  // ไม่ใช่: เหมา 20 บาท
                }
                System.out.println("Fee = " + fee + " baht");
            }
        }`,
      answerHtml: fpre(`
        เริ่มต้น
            รับ hours
            ถ้า hours ≤ 1
                fee = 0
            มิฉะนั้น
                fee = 20
            แสดง fee
        จบ`, "รหัสเทียม") },
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
                    pay = hours * 100;  // อัตราปกติทั้งหมด
                } else {
                    // 40 ชม.แรก + ส่วนที่เกิน
                    pay = 40 * 100 + (hours - 40) * 150;
                }
                System.out.println("Pay = " + pay + " baht");
            }
        }`,
      answerHtml: fpre(`
        เริ่มต้น
            รับ hours
            ถ้า hours ≤ 40
                pay = hours × 100
            มิฉะนั้น
                pay = 40 × 100 + (hours − 40) × 150
            แสดง pay
        จบ`, "รหัสเทียม") + `<p>45 ชั่วโมง: 4000 + 5 × 150 = 4750 บาท</p>` },
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
                if (avg >= 80) grade = "A";  // ตรวจจากสูงลงต่ำ
                else if (avg >= 70) grade = "B";
                else if (avg >= 60) grade = "C";
                else if (avg >= 50) grade = "D";
                else grade = "F";
                // ทศนิยม 2 ตำแหน่ง
                System.out.printf("Average = %.2f%n", avg);
                System.out.println("Grade = " + grade);
                if (grade.equals("F")) System.out.println("ไม่ผ่าน");
                else System.out.println("ผ่าน");
            }
        }`,
      answerHtml: fpre(`
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
        จบ`, "รหัสเทียม") + `<p>ถ้าตรวจจากต่ำไปสูง เช่น ตรวจ ≥ 50 ก่อน คะแนน 90 ก็จะได้ D ทันที เพราะ 90 ≥ 50 เป็นจริงและไม่ตรวจต่อ</p>` },
    { level: 3, title: "รวม นับ และเฉลี่ยจนกว่าจะป้อน 0", html: `<p>รับจำนวนเต็มบวกไปเรื่อย ๆ จนกว่าผู้ใช้จะป้อน 0 (ค่า 0 ไม่นับเป็นข้อมูล) จากนั้นแสดง <strong>ผลรวม</strong>, <strong>จำนวนค่าที่ป้อน</strong> และ <strong>ค่าเฉลี่ย</strong> ถ้าป้อน 0 ตั้งแต่แรกให้แสดง “ไม่มีข้อมูล”</p>`,
      spec: ["วาด Flowchart ที่มีลูกศรวนกลับ", "ต้องมีตัวแปรอย่างน้อย 2 ตัวที่เปลี่ยนค่าในวงซ้ำ (ผลรวม, ตัวนับ)", "จัดการกรณีไม่มีข้อมูล เพื่อไม่ให้หารด้วย 0", "ทำ trace table กับข้อมูล 4, 10, 7, 0"],
      runs: ["4\n10\n7\n0", "0"], answerFirst: true,
      solution: j`
        import java.util.Scanner;

        public class SumCountAverage {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                int total = 0;  // ผลรวม
                int count = 0;  // ตัวนับจำนวนค่า
                System.out.print("Number: ");
                int number = input.nextInt();
                while (number != 0) {  // 0 คือค่าหยุด (sentinel)
                    total = total + number;
                    count = count + 1;
                    System.out.print("Number: ");
                    number = input.nextInt();
                }
                if (count == 0) {  // ป้องกันการหารด้วย 0
                    System.out.println("ไม่มีข้อมูล");
                } else {
                    System.out.println("Sum = " + total);
                    System.out.println("Count = " + count);
                    // แปลงเป็น double ก่อนหาร
                    System.out.println("Average = " + (double) total / count);
                }
            }
        }`,
      answerHtml: fpre(`
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
        จบ`, "รหัสเทียม") },
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
                if (paid < price) {  // ◇ เงินไม่พอ ?
                    System.out.println("เงินไม่พอ ขาดอีก " + (price - paid) + " บาท");
                } else {
                    int change = paid - price;
                    System.out.println("Change = " + change);
                    int ten = change / 10;  // เหรียญใหญ่ก่อน
                    change = change % 10;   // เก็บเศษไว้คิดต่อ
                    int five = change / 5;
                    change = change % 5;
                    int one = change;  // ที่เหลือเป็นเหรียญ 1 บาททั้งหมด
                    System.out.println("10 baht x " + ten);
                    System.out.println("5 baht x " + five);
                    System.out.println("1 baht x " + one);
                }
            }
        }`,
      answerHtml: fpre(`
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
        จบ`, "รหัสเทียม") + `<p>เงินทอน 37: 10 × 3 (เหลือ 7) → 5 × 1 (เหลือ 2) → 1 × 2</p>` },
  ],
};
