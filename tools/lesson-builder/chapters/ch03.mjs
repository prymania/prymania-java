import { j, c, pre, jpre } from "../lib.mjs";

export default {
  num: 3, file: "chapter-03.html",
  pageTitle: "บทที่ 3: ตัวแปรและการคำนวณ", shortName: "บทที่ 3",
  tocLabel: "บทที่ 3 · เก็บและคำนวณข้อมูล", sidebarBottom: "เลือกชนิดข้อมูลให้เหมาะ ก่อนคำนวณ",
  kicker: "บทที่ 3 · ข้อมูลที่โปรแกรมนำไปใช้", h1: "ตัวแปร ชนิดข้อมูล และการคำนวณ",
  lead: "ตั้งชื่อให้ข้อมูล เก็บค่าที่โปรแกรมต้องใช้ แล้วคำนวณอย่างถูกต้อง เข้าใจความต่างระหว่างจำนวนเต็มกับทศนิยมตั้งแต่ต้น",
  goals: ["ประกาศและกำหนดค่าตัวแปร", "เลือกชนิดข้อมูลพื้นฐานได้เหมาะสม", "ใช้ตัวดำเนินการและลำดับการคำนวณ", "หลีกเลี่ยงการหารจำนวนเต็มโดยไม่ตั้งใจ"],
  prev: { href: "chapter-02.html", label: "← บทที่ 2" },
  next: { href: "chapter-04.html", label: "บทที่ 4: รับข้อมูลและแสดงผล →" },
  footer: "บทที่ 3 · ตรวจผลคำนวณด้วยมือเสมอ",
  introHeading: "3. เก็บข้อมูลและคำนวณด้วย Java",
  introHtml: `<p>ตัวแปรเปรียบเหมือน<strong>กล่องที่มีชื่อและชนิด</strong> ค่าในกล่องเปลี่ยนได้ระหว่างที่โปรแกรมทำงาน แต่ชนิดข้อมูลจะกำหนดว่ากล่องนั้นเก็บอะไรได้และนำไปคำนวณแบบใด ในบทนี้ทุกตัวอย่างใช้ค่าที่กำหนดในโค้ด ส่วนการรับค่าจากผู้ใช้จะเรียนในบทที่ 4</p>`,
  topics: [
    {
      num: "3.1", toc: "ตัวแปรและการกำหนดค่า", title: "ตัวแปรและการกำหนดค่า",
      blocks: [
        { type: "p", html: `การ<strong>ประกาศตัวแปร</strong>ระบุชนิดและชื่อ เช่น <code>int bookCount;</code> จากนั้นใช้เครื่องหมาย <code>=</code> <strong>กำหนดค่า</strong> หรือทำทั้งสองอย่างในบรรทัดเดียว <code>int bookCount = 3;</code>` },
        { type: "concept", title: "รูปแบบการประกาศตัวแปร", html: jpre(`
          ชนิด ชื่อ;              // ประกาศอย่างเดียว      int age;
          ชื่อ = ค่า;             // กำหนดค่าภายหลัง        age = 19;
          ชนิด ชื่อ = ค่า;        // ประกาศพร้อมกำหนดค่า    int age = 19;`) + `<p><code>=</code> ใน Java แปลว่า <strong>“นำค่าด้านขวามาเก็บในตัวแปรด้านซ้าย”</strong> ไม่ใช่ “เท่ากับ” แบบคณิตศาสตร์ ดังนั้น <code>x = x + 1</code> จึงถูกต้อง: คำนวณ x + 1 ก่อน แล้วเก็บกลับลงใน x</p>` },
        { type: "run", title: "ประกาศ กำหนดค่า และพิมพ์", level: "พื้นฐาน",
          concept: "ตัวแปรใช้แทนค่าได้ทุกที่ เมื่อพิมพ์ตัวแปร Java พิมพ์<em>ค่า</em>ที่อยู่ข้างใน ไม่ใช่ชื่อ",
          code: j`
            public class FirstVariables {
                public static void main(String[] args) {
                    // ประกาศตัวแปรชนิด int พร้อมค่าเริ่มต้น
                    int age = 19;
                    String name = "Mali";      // ข้อความต้องอยู่ใน "..."
                    System.out.println(name);  // ไม่มี "" → แสดงค่าในตัวแปร
                    System.out.println(age);
                    // มี "" → แสดงคำว่า name ตรงตัว
                    System.out.println("name");
                    // + ต่อข้อความกับค่าตัวแปร
                    System.out.println("Name: " + name + ", age " + age);
                }
            }`,
          steps: ["<code>println(name)</code> พิมพ์ค่า Mali", "<code>println(\"name\")</code> มีเครื่องหมายคำพูด จึงพิมพ์คำว่า name ตรงตัว", "<code>+</code> ระหว่างข้อความกับค่า คือการ<strong>ต่อข้อความ</strong>"] },
        { type: "run", title: "ค่าเปลี่ยนได้ตามลำดับคำสั่ง", level: "ต่อยอด",
          concept: "ตัวแปรเก็บได้ทีละค่า ค่าใหม่จะเขียนทับค่าเก่า ต้องไล่ค่าตามลำดับบรรทัด",
          code: j`
            public class ChangingValues {
                public static void main(String[] args) {
                    int bookCount = 3;  // ค่าเริ่มต้น 3
                    System.out.println("Start: " + bookCount);
                    // อ่านค่าเดิม (3) + 2 แล้วเก็บกลับ
                    bookCount = bookCount + 2;
                    System.out.println("After +2: " + bookCount);
                    bookCount = 10;  // เขียนทับค่าเดิม
                    System.out.println("Reset: " + bookCount);
                    bookCount = bookCount * 2 - 1;  // 10 * 2 - 1 = 19
                    System.out.println("Final: " + bookCount);
                }
            }`,
          steps: ["เริ่มที่ 3", "<code>bookCount + 2</code> = 5 แล้วเก็บกลับ → 5", "กำหนดใหม่เป็น 10 (ค่า 5 หายไป)", "10 × 2 − 1 = 19"] },
        { type: "table", cls: "trace-table", title: "Trace table ของตัวอย่างด้านบน", head: ["บรรทัด", "คำสั่ง", "bookCount"], rows: [["3", "int bookCount = 3;", "3"], ["5", "bookCount = bookCount + 2;", "5"], ["7", "bookCount = 10;", "10"], ["9", "bookCount = bookCount * 2 - 1;", "19"]] },
        { type: "run", title: "สลับค่าตัวแปรสองตัว", level: "ประยุกต์",
          concept: "ถ้าเขียน <code>a = b; b = a;</code> ค่าเดิมของ a จะหายก่อน จึงต้องใช้ตัวแปรชั่วคราว (temp) เก็บไว้ก่อน",
          code: j`
            public class SwapValues {
                public static void main(String[] args) {
                    int a = 5;  // ค่าเริ่มต้นก่อนสลับ
                    int b = 8;
                    System.out.println("Before: a=" + a + ", b=" + b);

                    int temp = a;  // เก็บค่า a ไว้ก่อน
                    a = b;         // a ได้ 8
                    b = temp;      // b ได้ค่าเดิมของ a คือ 5

                    System.out.println("After:  a=" + a + ", b=" + b);
                }
            }`,
          steps: ["temp = 5", "a = 8 (ค่า 5 ของ a ถูกทับ แต่ยังอยู่ใน temp)", "b = temp = 5", "สลับสำเร็จ"],
          tryIt: "ลบบรรทัด temp ออกแล้วเขียน a = b; b = a; — ทั้งสองตัวจะกลายเป็น 8" },
        { type: "run", label: "ทดลอง error 3.1.4", title: "ใช้ตัวแปรที่ยังไม่มีค่า", level: "ประยุกต์", expect: "compile-error",
          concept: "Java ไม่ยอมให้อ่านค่าตัวแปรที่ประกาศแล้วแต่ยังไม่ได้กำหนดค่า",
          code: j`
            public class VariableErrors {
                public static void main(String[] args) {
                    int score;
                    int bonus = 5;
                    System.out.println(score + bonus);
                }
            }`,
          steps: ["<code>variable score might not have been initialized</code> — score ประกาศแล้วแต่ยังไม่มีค่า", "แก้: กำหนดค่าเริ่มต้น เช่น <code>int score = 0;</code>"], after: "ถ้าใช้ตัวแปรที่<strong>ไม่เคยประกาศ</strong>เลย เช่น <code>total = 10;</code> จะได้ error อีกแบบคือ <code>cannot find symbol ... variable total</code>" },
        { type: "note", title: "กฎการตั้งชื่อตัวแปร", html: `<ul><li>ประกอบด้วยตัวอักษร ตัวเลข <code>_</code> หรือ <code>$</code> แต่<strong>ห้ามขึ้นต้นด้วยตัวเลข</strong> (<code>2score</code> ผิด)</li><li>ห้ามมีช่องว่าง และห้ามใช้คำสงวน เช่น <code>class</code>, <code>int</code>, <code>public</code></li><li>ตัวพิมพ์ใหญ่-เล็กต่างกัน: <code>score</code> กับ <code>Score</code> คนละตัว</li><li>นิยมใช้ <strong>camelCase</strong>: คำแรกตัวเล็ก คำถัดไปขึ้นต้นตัวใหญ่ เช่น <code>studentScore</code>, <code>totalPrice</code></li><li>ตั้งชื่อให้สื่อความหมาย: <code>studentScore</code> ดีกว่า <code>x</code></li></ul>` },
        { type: "check", title: "trace ค่า", html: jpre(`
          int x = 4;
          int y = x * 2;
          x = y + x;
          y = y - 1;`) + `<p>สุดท้าย x และ y มีค่าเท่าไร</p>`, answer: `<p>y = 8 → x = 8 + 4 = 12 → y = 7 ดังนั้น <strong>x = 12, y = 7</strong></p>` },
      ],
    },
    {
      num: "3.2", toc: "ชนิดข้อมูล", title: "ชนิดข้อมูลพื้นฐาน",
      blocks: [
        { type: "p", html: `เลือกชนิดข้อมูลจากลักษณะของค่า: <code>int</code> สำหรับจำนวนเต็ม, <code>double</code> สำหรับทศนิยม, <code>char</code> สำหรับอักขระหนึ่งตัว และ <code>boolean</code> เก็บ <code>true</code> หรือ <code>false</code> ส่วน <code>String</code> ใช้เก็บข้อความและไม่ใช่ชนิด primitive (เป็นคลาส จึงขึ้นต้นด้วยตัวใหญ่)` },
        { type: "table", head: ["ชนิด", "ตัวอย่าง", "เหมาะกับ", "ช่วงค่า/หมายเหตุ"], rows: [
          ["<code>int</code>", "<code>int age = 19;</code>", "จำนวนเต็ม เช่น อายุ จำนวนชิ้น", "ประมาณ ±2,100 ล้าน"],
          ["<code>long</code>", "<code>long population = 66000000L;</code>", "จำนวนเต็มขนาดใหญ่", "ลงท้ายด้วย L"],
          ["<code>double</code>", "<code>double height = 165.5;</code>", "ตัวเลขทศนิยม เช่น ส่วนสูง ราคา", "ความละเอียดประมาณ 15 หลัก"],
          ["<code>char</code>", "<code>char grade = 'A';</code>", "อักขระหนึ่งตัว", "ใช้ single quote <code>' '</code>"],
          ["<code>boolean</code>", "<code>boolean isReady = true;</code>", "สถานะจริง/เท็จ", "มีแค่ true, false"],
          ["<code>String</code>", "<code>String name = \"Mali\";</code>", "ข้อความ", "ใช้ double quote <code>\" \"</code>"],
        ] },
        { type: "steps", title: "เลือกชนิดข้อมูลด้วยคำถาม 4 ข้อ", items: [
          "เป็นข้อความหรือไม่? → <code>String</code> (ถ้าตัวอักษรเดียวและต้องการแบบอักขระ → <code>char</code>)",
          "เป็นใช่/ไม่ใช่หรือไม่? → <code>boolean</code>",
          "มีทศนิยมได้หรือไม่? → <code>double</code>",
          "เป็นจำนวนนับ/จำนวนเต็มเสมอ → <code>int</code> (ถ้าใหญ่มาก → <code>long</code>)",
        ] },
        { type: "run", title: "ข้อมูลนักศึกษาหลายชนิด", level: "พื้นฐาน",
          concept: "ข้อมูลแต่ละอย่างมีลักษณะต่างกัน จึงใช้ชนิดต่างกัน",
          code: j`
            public class StudentData {
                public static void main(String[] args) {
                    String name = "Nida";  // String: ข้อความ
                    int age = 20;          // int: จำนวนเต็ม
                    double gpa = 3.25;     // double: ทศนิยม
                    // char: อักขระเดียว ใช้ '...'
                    char section = 'B';
                    // boolean: true หรือ false
                    boolean registered = true;

                    System.out.println("Name: " + name);
                    System.out.println("Age: " + age);
                    System.out.println("GPA: " + gpa);
                    System.out.println("Section: " + section);
                    System.out.println("Registered: " + registered);
                }
            }`,
          steps: ["ชื่อเป็นข้อความ → String", "อายุนับเป็นปีเต็ม → int", "เกรดเฉลี่ยมีทศนิยม → double", "กลุ่มเรียนเป็นตัวอักษรเดียว → char", "สถานะลงทะเบียน → boolean"] },
        { type: "run", title: "int กับ double แสดงผลต่างกัน", level: "ต่อยอด",
          concept: "double แสดงจุดทศนิยมเสมอ (เช่น <code>5.0</code>) และ int เก็บลง double ได้อัตโนมัติ แต่ double เก็บลง int ตรง ๆ ไม่ได้",
          code: j`
            public class IntVsDouble {
                public static void main(String[] args) {
                    int whole = 5;         // int เก็บจำนวนเต็ม
                    double decimal = 5;    // int 5 ถูกขยายเป็น 5.0
                    double price = 19.99;  // double เก็บทศนิยมได้
                    System.out.println(whole);
                    System.out.println(decimal);
                    System.out.println(price);
                    // ทศนิยมฐานสองคลาดเคลื่อนเล็กน้อย
                    System.out.println(0.1 + 0.2);
                }
            }`,
          steps: ["<code>whole</code> แสดง 5", "<code>decimal</code> แสดง 5.0 แม้กำหนดด้วยเลข 5", "<code>0.1 + 0.2</code> ได้ 0.30000000000000004 เพราะ double เก็บทศนิยมฐานสองแบบประมาณ — ใช้ printf จัดทศนิยมเวลาแสดงผล (บทที่ 4)"] },
        { type: "run", label: "ทดลอง error 3.2.3", title: "ชนิดไม่ตรงกัน", level: "ประยุกต์", expect: "compile-error",
          concept: "ค่าต้องเข้ากับชนิดของตัวแปร Java ตรวจตั้งแต่ตอนคอมไพล์ (strongly typed)",
          code: j`
            public class TypeMismatch {
                public static void main(String[] args) {
                    int count = 2.5;
                    String code = 'A';
                    char letter = "B";
                    boolean done = "true";
                }
            }`,
          steps: ["<code>int count = 2.5</code> — double ใส่ int ไม่ได้ เพราะจะเสียทศนิยม (<code>lossy conversion</code>)", "<code>'A'</code> เป็น char ใส่ String ไม่ได้", "<code>\"B\"</code> เป็น String ใส่ char ไม่ได้", "<code>\"true\"</code> เป็นข้อความ ไม่ใช่ค่า boolean <code>true</code>"] },
        { type: "note", title: "เครื่องหมาย quote สำคัญ", html: `<p><code>'A'</code> เป็น <code>char</code>; <code>\"A\"</code> เป็น <code>String</code>; <code>true</code> (ไม่มี quote) เป็น boolean แม้หน้าตาคล้ายกันแต่คนละชนิด</p>` },
        { type: "check", title: "เลือกชนิด", html: `<p>เลือกชนิดข้อมูลสำหรับ: (ก) จำนวนพนักงาน (ข) อุณหภูมิ (ค) รหัสไปรษณีย์ 10330 (ง) มีส่วนลดหรือไม่</p>`, answer: `<p>(ก) <code>int</code> (ข) <code>double</code> (ค) <code>String</code> — แม้เป็นตัวเลขแต่ไม่ได้นำไปคำนวณ และอาจขึ้นต้นด้วย 0 ได้ (ง) <code>boolean</code></p>` },
      ],
    },
    {
      num: "3.3", toc: "ตัวดำเนินการ", title: "ตัวดำเนินการและลำดับการคำนวณ",
      blocks: [
        { type: "p", html: `ตัวดำเนินการ (operator) คือเครื่องหมายที่สั่งให้คำนวณ เช่น บวก ลบ คูณ หาร ส่วนที่มือใหม่พลาดบ่อยคือ <strong>การหารจำนวนเต็ม</strong> และ <strong>ลำดับการคำนวณ</strong>` },

        { type: "h", text: "ตัวดำเนินการคณิตศาสตร์" },
        { type: "table", head: ["ตัวดำเนินการ", "ความหมาย", "ตัวอย่าง", "ผลลัพธ์"], rows: [
          ["<code>+</code>", "บวก", "<code>17 + 5</code>", "22"],
          ["<code>-</code>", "ลบ", "<code>17 - 5</code>", "12"],
          ["<code>*</code>", "คูณ", "<code>17 * 5</code>", "85"],
          ["<code>/</code>", "หาร", "<code>17 / 5</code>", "3 (จำนวนเต็ม!)"],
          ["<code>%</code>", "เศษจากการหาร (modulo)", "<code>17 % 5</code>", "2"],
        ] },
        { type: "run", title: "ลองทุกตัวดำเนินการ",
          code: j`
            public class Arithmetic {
                public static void main(String[] args) {
                    int a = 17, b = 5;
                    System.out.println(a + b);      // 22
                    System.out.println(a - b);      // 12
                    System.out.println(a * b);      // 85
                    System.out.println(a / b);      // 3     int / int ได้ int (ตัดเศษทิ้ง)
                    System.out.println(a % b);      // 2     เศษ: 17 - 5×3 = 2
                    System.out.println(17.0 / 5);   // 3.4   มี double อย่างน้อยหนึ่งตัว
                }
            }`,
          },
        { type: "tip", title: "จำง่าย ๆ", html: `จำนวนเต็มหารจำนวนเต็ม ได้จำนวนเต็มเสมอ Java <strong>ตัดเศษทิ้ง ไม่ปัดเศษ</strong> ถ้าต้องการทศนิยม ให้มีค่า <code>double</code> อย่างน้อยหนึ่งตัว เช่น <code>17.0 / 5</code>` },

        { type: "h", text: "ลำดับการคำนวณ" },
        { type: "p", html: `คูณ หาร และหารเอาเศษทำก่อนบวกลบ ถ้าระดับเท่ากันทำจากซ้ายไปขวา และวงเล็บทำก่อนเสมอ` },
        { type: "table", head: ["ลำดับ", "ตัวดำเนินการ", "ทิศทาง"], rows: [["1", "<code>( )</code> วงเล็บ", "ในสุดก่อน"], ["2", "<code>*</code> <code>/</code> <code>%</code>", "ซ้าย → ขวา"], ["3", "<code>+</code> <code>-</code>", "ซ้าย → ขวา"], ["4", "<code>=</code> <code>+=</code> <code>-=</code> …", "ทำสุดท้าย"]] },
        { type: "run", title: "คำนวณอะไรก่อน",
          code: j`
            public class Precedence {
                public static void main(String[] args) {
                    System.out.println(2 + 3 * 4);          // 14        * ก่อน +
                    System.out.println((2 + 3) * 4);        // 20        วงเล็บก่อนเสมอ
                    System.out.println(20 / 4 * 2);         // 10        ระดับเท่ากัน ทำซ้าย → ขวา
                    System.out.println("Sum: " + 2 + 3);    // Sum: 23   ต่อข้อความทีละตัว
                    System.out.println("Sum: " + (2 + 3));  // Sum: 5    วงเล็บบวกเลขก่อน
                }
            }`,
          },
        { type: "warn", html: `เมื่อด้านซ้ายของ <code>+</code> เป็นข้อความ (String) Java จะ<strong>ต่อข้อความ</strong>แทนการบวก <code>"Sum: " + 2 + 3</code> จึงได้ <code>Sum: 23</code> ใส่วงเล็บรอบการคำนวณทุกครั้งที่พิมพ์คู่กับข้อความ` },

        { type: "h", text: "กำหนดค่าแบบย่อ และ ++ / --" },
        { type: "p", html: `<code>x += 5</code> คือ <code>x = x + 5</code> แบบเขียนสั้น ส่วน <code>x++</code> เพิ่มทีละ 1 และ <code>x--</code> ลดทีละ 1 ใช้บ่อยมากในลูป (บทที่ 6)` },
        { type: "run", title: "เขียนสั้นแต่ความหมายเดิม",
          code: j`
            public class Shorthand {
                public static void main(String[] args) {
                    int points = 10;
                    points += 5;   // 15   points = points + 5
                    points -= 3;   // 12
                    points *= 2;   // 24
                    points /= 5;   // 4    ยังเป็นการหาร int
                    points %= 3;   // 1
                    System.out.println("points = " + points);

                    int count = 0;
                    count++;       // 1
                    count++;       // 2
                    count--;       // 1
                    System.out.println("count = " + count);
                }
            }`,
          },
        { type: "tip", html: `เขียน <code>count++;</code> เป็นคำสั่งเดี่ยวในบรรทัดของตัวเอง อย่านำไปปนในนิพจน์อื่น จะอ่านง่ายและไม่สับสน` },

        { type: "h", text: "ใช้ / และ % แยกหลักตัวเลข" },
        { type: "p", html: `<code>% 10</code> ได้หลักขวาสุด และ <code>/ 10</code> ตัดหลักขวาสุดทิ้ง ใช้สองตัวนี้คู่กันจะแยกตัวเลขได้ทีละหลัก` },
        { type: "run", title: "แยก 4729 ทีละหลัก",
          code: j`
            public class DigitSplit {
                public static void main(String[] args) {
                    int number = 4729;
                    int ones = number % 10;             // 9
                    int tens = number / 10 % 10;        // 2    472 % 10
                    int hundreds = number / 100 % 10;   // 7    47 % 10
                    int thousands = number / 1000;      // 4
                    System.out.println(thousands + " " + hundreds + " " + tens + " " + ones);
                    System.out.println("Digit sum: " + (thousands + hundreds + tens + ones));
                }
            }`,
          },
        { type: "try", html: `เปลี่ยน <code>number</code> เป็น 9051 แล้วทำนายผลทั้งสองบรรทัดก่อนรัน` },

        { type: "warn", title: "หารจำนวนเต็มด้วย 0", html: `<code>100 / 0</code> กับ <code>int</code> คอมไพล์ผ่าน แต่ตอนรันโปรแกรมจะหยุดทันทีด้วย <code>ArithmeticException: / by zero</code> (ถ้าเป็น <code>double</code> จะได้ <code>Infinity</code>) ในบทที่ 5 จะใช้ <code>if</code> ตรวจก่อนหาร` },
        { type: "more", title: "ดูตัวอย่าง: โปรแกรมหยุดเมื่อหารด้วย 0", blocks: [
          { type: "run", label: "ทดลอง error 3.3.5", title: "หารจำนวนเต็มด้วยศูนย์", expect: "runtime-error",
            code: j`
              public class DivideByZero {
                  public static void main(String[] args) {
                      int total = 100;
                      int people = 0;
                      System.out.println("Before division");
                      int share = total / people;
                      System.out.println("Share: " + share);
                  }
              }`,
            after: "บรรทัดแรกพิมพ์ได้ตามปกติ แต่ถึงบรรทัดที่หารด้วย 0 โปรแกรมหยุด บรรทัด Share จึงไม่ถูกทำ ข้อความ <code>DivideByZero.java:6</code> บอกบรรทัดที่เกิดปัญหา" },
        ] },

        { type: "check", title: "คำนวณในใจ", html: jpre(`
          System.out.println(7 + 8 / 3 * 2);
          System.out.println(25 % 7 + 1);
          System.out.println("A" + 1 + 2);
          System.out.println(1 + 2 + "A");`), answer: `<p><code>8 / 3</code> = 2 → × 2 = 4 → 7 + 4 = <strong>11</strong>; 25 % 7 = 4 → <strong>5</strong>; <strong>A12</strong> (ต่อข้อความตั้งแต่ต้น); <strong>3A</strong> (บวกเลขก่อนแล้วจึงต่อข้อความ)</p>` },
      ],
    },
    {
      num: "3.4", toc: "ค่าคงที่และการแปลงชนิด", title: "ค่าคงที่และการแปลงชนิดข้อมูล",
      blocks: [
        { type: "p", html: `ค่าที่ไม่ต้องการให้เปลี่ยนประกาศด้วย <code>final</code> เช่นอัตราภาษี นิยมตั้งชื่อด้วยตัวพิมพ์ใหญ่คั่นด้วย <code>_</code> (<code>TAX_RATE</code>) ส่วนการแปลงชนิด (type casting) ใช้เมื่อต้องการเปลี่ยน int ↔ double อย่างตั้งใจ` },
        { type: "concept", title: "การแปลงชนิด 2 แบบ", html: `<ul><li><strong>Widening (อัตโนมัติ):</strong> ชนิดเล็กไปใหญ่ เช่น <code>int → double</code> ไม่เสียข้อมูล Java ทำให้เอง <code>double d = 7;</code></li><li><strong>Narrowing (ต้อง cast):</strong> ชนิดใหญ่ไปเล็ก เช่น <code>double → int</code> อาจเสียทศนิยม ต้องเขียน <code>(int)</code> เพื่อยืนยัน <code>int n = (int) 7.9;</code> ได้ 7 (ตัดทิ้ง ไม่ปัด)</li></ul>` },
        { type: "run", title: "ค่าคงที่ด้วย final", level: "พื้นฐาน",
          concept: "ตั้งค่าที่ใช้หลายที่ไว้เป็นค่าคงที่ ถ้าอัตราเปลี่ยนก็แก้ที่เดียว และ compiler กันไม่ให้เผลอแก้",
          code: j`
            public class TaxConstant {
                public static void main(String[] args) {
                    // final = ค่าคงที่ แก้ภายหลังไม่ได้
                    final double TAX_RATE = 0.07;
                    double price = 35.50;
                    int quantity = 3;

                    double subtotal = price * quantity;  // 35.50 × 3
                    // ใช้ค่าคงที่แทนการพิมพ์ 0.07 ตรง ๆ
                    double tax = subtotal * TAX_RATE;
                    double total = subtotal + tax;

                    System.out.println("Subtotal: " + subtotal);
                    System.out.println("Tax: " + tax);
                    System.out.println("Total: " + total);
                }
            }`,
          steps: ["subtotal = 35.50 × 3 = 106.5", "tax = 106.5 × 0.07 = 7.455 (Java แสดง 7.455000000000001 เพราะ double เก็บทศนิยมแบบประมาณ)", "total = 113.955 (บทที่ 4 จะจัดเป็นทศนิยม 2 ตำแหน่ง)"],
          tryIt: "เพิ่มบรรทัด TAX_RATE = 0.1; แล้วดูว่า compiler แจ้งอะไร (cannot assign a value to final variable)" },
        { type: "run", title: "กับดักการหารจำนวนเต็มเมื่อหาค่าเฉลี่ย", level: "ต่อยอด",
          concept: "Java คำนวณด้านขวาของ <code>=</code> ให้เสร็จก่อน แล้วค่อยเก็บ ถ้าด้านขวาเป็น int หาร int ทศนิยมหายไปก่อนจะถึง double",
          code: j`
            public class AverageTrap {
                public static void main(String[] args) {
                    int total = 7;
                    int count = 2;

                    // int / int = 3 แล้วจึงแปลงเป็น 3.0
                    double wrong = total / count;
                    // หารด้วย 2.0 → ได้ทศนิยม
                    double right1 = total / 2.0;
                    // แปลง total เป็น double ก่อนหาร
                    double right2 = (double) total / count;
                    // หารเสร็จ (3) แล้วค่อยแปลง → ยังผิด
                    double stillWrong = (double) (total / count);

                    System.out.println("wrong      = " + wrong);
                    System.out.println("right1     = " + right1);
                    System.out.println("right2     = " + right2);
                    System.out.println("stillWrong = " + stillWrong);
                }
            }`,
          steps: ["<code>7 / 2</code> = 3 (int) → เก็บใน double เป็น 3.0 ❌", "<code>7 / 2.0</code> = 3.5 ✔", "<code>(double) total / count</code> → cast total เป็น 7.0 ก่อน แล้วหาร → 3.5 ✔", "<code>(double)(total / count)</code> → หารในวงเล็บได้ 3 ก่อน แล้วค่อย cast → 3.0 ❌"] },
        { type: "run", title: "cast ทศนิยมเป็นจำนวนเต็ม และปัดเศษ", level: "ประยุกต์",
          concept: "<code>(int)</code> ตัดทศนิยมทิ้งเสมอ ถ้าต้องการปัดเศษให้ใช้ <code>Math.round</code>",
          code: j`
            public class CastAndRound {
                public static void main(String[] args) {
                    double price = 49.75;
                    // (int) ตัดทศนิยมทิ้ง ไม่ปัดเศษ
                    int cut = (int) price;
                    // ปัดเป็นจำนวนเต็มที่ใกล้ที่สุด
                    long rounded = Math.round(price);
                    // เทคนิคปัดทศนิยม 2 ตำแหน่ง
                    double twoDecimals = Math.round(3.14159 * 100) / 100.0;

                    System.out.println("cast  : " + cut);
                    System.out.println("round : " + rounded);
                    System.out.println("2 dp  : " + twoDecimals);
                    // รหัส 'A' + 1 แล้วแปลงกลับเป็น char
                    System.out.println("char 'A' + 1 = " + (char) ('A' + 1));
                    // ดูรหัสตัวเลขของ 'A'
                    System.out.println("(int) 'A' = " + (int) 'A');
                }
            }`,
          steps: ["<code>(int) 49.75</code> → 49 (ตัดทิ้ง)", "<code>Math.round(49.75)</code> → 50", "ปัด 2 ตำแหน่ง: 3.14159 × 100 = 314.159 → round 314 → ÷ 100.0 = 3.14", "char เก็บเป็นรหัสตัวเลข: 'A' คือ 65, 'A' + 1 = 66 → cast กลับเป็น 'B'"] },
        { type: "run", title: "ใช้เมธอดใน Math ช่วยคำนวณ", level: "ท้าทาย",
          concept: "คลาส <code>Math</code> มีเมธอดสำเร็จรูป เช่น <code>Math.sqrt</code> (รากที่สอง), <code>Math.pow</code> (ยกกำลัง), <code>Math.PI</code>, <code>Math.abs</code>, <code>Math.max</code>",
          code: j`
            public class MathTools {
                public static void main(String[] args) {
                    double radius = 3;
                    // πr² ด้วย Math.pow
                    double area = Math.PI * Math.pow(radius, 2);
                    System.out.println("Circle area: " + area);

                    double a = 6, b = 8;
                    // รากที่สองของ a² + b²
                    double hyp = Math.sqrt(a * a + b * b);
                    System.out.println("Hypotenuse: " + hyp);

                    // ค่าสัมบูรณ์
                    System.out.println("abs(-12) = " + Math.abs(-12));
                    // ค่าที่มากกว่า
                    System.out.println("max(7, 3) = " + Math.max(7, 3));
                    System.out.println("min(7, 3) = " + Math.min(7, 3));
                }
            }`,
          steps: ["<code>Math.pow(3, 2)</code> = 9.0 → π × 9 ≈ 28.27", "ทฤษฎีบทพีทาโกรัส √(36 + 64) = √100 = 10.0", "abs คืนค่าสัมบูรณ์, max/min คืนค่าที่มาก/น้อยกว่า"] },
        { type: "check", title: "cast", html: `<p><code>int x = (int) 9.99;</code> และ <code>double y = 9 / 4;</code> ได้ค่าเท่าไร</p>`, answer: `<p>x = <strong>9</strong> (ตัดทิ้ง), y = <strong>2.0</strong> (9/4 เป็น int = 2 ก่อน แล้วขยายเป็น double)</p>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "นับจำนวนหนังสือ", html: `<p>ชั้นหนังสือมีหนังสือ 4 เล่ม แล้วได้รับเพิ่มอีก 3 เล่ม จากนั้นให้เพื่อนยืมไป 2 เล่ม จงเขียนโปรแกรมที่ใช้ตัวแปร<strong>ตัวเดียว</strong>ชื่อ <code>books</code> ติดตามจำนวนหนังสือ และพิมพ์จำนวนหลังทุกเหตุการณ์</p>`,
      spec: ["ประกาศ <code>int books = 4;</code>", "อัปเดตค่าด้วย <code>books = books + ...</code> หรือ <code>+=</code>, <code>-=</code>", "พิมพ์ 3 บรรทัดตามตัวอย่าง"],
      solution: j`
        public class BookCounter {
            public static void main(String[] args) {
                int books = 4;
                System.out.println("Start: " + books);
                books += 3;  // books = books + 3
                System.out.println("After receiving: " + books);
                books -= 2;  // books = books - 2
                System.out.println("After lending: " + books);
            }
        }` },
    { level: 1, title: "ประกาศข้อมูลนักศึกษา", html: `<p>เลือกชนิดข้อมูลให้เหมาะสมและประกาศตัวแปรสำหรับ: ชื่อ <code>Nida</code>, อายุ 20 ปี, คะแนนเฉลี่ย 3.25, เพศ <code>F</code> (อักขระเดียว) และสถานะ “ลงทะเบียนแล้ว” แล้วแสดงผลตามตัวอย่าง</p>`,
      spec: ["ใช้ชนิดข้อมูลครบ 5 ชนิด: String, int, double, char, boolean", "ตั้งชื่อตัวแปรแบบ camelCase", "แสดงผลในรูปแบบ <code>ชื่อหัวข้อ: ค่า</code>"],
      solution: j`
        public class StudentInfo {
            public static void main(String[] args) {
                String name = "Nida";
                int age = 20;
                double gpa = 3.25;
                char gender = 'F';
                boolean isRegistered = true;
                System.out.println("Name: " + name);
                System.out.println("Age: " + age);
                System.out.println("GPA: " + gpa);
                System.out.println("Gender: " + gender);
                System.out.println("Registered: " + isRegistered);
            }
        }` },
    { level: 1, title: "แบ่งส้มให้เท่ากัน", html: `<p>มีส้ม 23 ผล แบ่งให้เพื่อน 4 คนเท่า ๆ กัน จงหาจำนวนส้มที่แต่ละคนได้ และจำนวนที่เหลือ</p>`,
      spec: ["เก็บ 23 และ 4 ในตัวแปร", "ใช้ <code>/</code> หาส่วนแบ่ง และ <code>%</code> หาเศษ", "ตรวจด้วยมือ: ส่วนแบ่ง × คน + เศษ ต้องเท่ากับ 23"],
      solution: j`
        public class ShareOranges {
            public static void main(String[] args) {
                int oranges = 23;
                int friends = 4;
                int each = oranges / friends;  // จำนวนเต็มที่แต่ละคนได้
                int left = oranges % friends;  // เศษที่เหลือ
                System.out.println("Each friend gets " + each + " oranges");
                System.out.println("Left over: " + left);
            }
        }`, explain: "5 × 4 + 3 = 23 ถูกต้อง" },
    { level: 2, title: "ยอดซื้อรวมภาษี", html: `<p>สินค้าราคาชิ้นละ 35.50 บาท ซื้อ 3 ชิ้น คำนวณยอดก่อนภาษี ภาษีมูลค่าเพิ่ม 7% และยอดสุทธิ</p>`,
      spec: ["ประกาศอัตราภาษีเป็น <code>final double VAT = 0.07;</code>", "คำนวณ 3 ค่า: subtotal, vat, total", "แสดงทศนิยม 2 ตำแหน่งด้วยวิธี <code>Math.round(x * 100) / 100.0</code>"],
      solution: j`
        public class VatTotal {
            public static void main(String[] args) {
                final double VAT = 0.07;  // ค่าคงที่ VAT 7%
                double price = 35.50;
                int qty = 3;
                double subtotal = price * qty;
                double vat = subtotal * VAT;
                double total = subtotal + vat;
                // ปัดทศนิยม 2 ตำแหน่ง
                System.out.println("Subtotal: " + Math.round(subtotal * 100) / 100.0);
                System.out.println("VAT 7%: " + Math.round(vat * 100) / 100.0);
                System.out.println("Total: " + Math.round(total * 100) / 100.0);
            }
        }` },
    { level: 2, title: "แปลงวินาทีเป็นชั่วโมง นาที วินาที", html: `<p>แปลง 3,665 วินาทีเป็นชั่วโมง นาที และวินาที โดยใช้การหารจำนวนเต็มและเศษจากการหาร</p>`,
      spec: ["1 ชั่วโมง = 3600 วินาที, 1 นาที = 60 วินาที", "หา hours ก่อน แล้วนำ<strong>เศษ</strong>ไปหา minutes และ seconds", "แสดงผลรูปแบบ <code>1 h 1 m 5 s</code>"],
      solution: j`
        public class SecondsToTime {
            public static void main(String[] args) {
                int total = 3665;
                int hours = total / 3600;   // 3600 วินาที = 1 ชั่วโมง
                int remain = total % 3600;  // วินาทีที่เหลือหลังหักชั่วโมง
                int minutes = remain / 60;
                int seconds = remain % 60;  // เศษจากนาที = วินาที
                System.out.println(total + " seconds = " + hours + " h " + minutes + " m " + seconds + " s");
            }
        }` },
    { level: 2, title: "ค่าเฉลี่ยแบบทศนิยม", html: `<p>มีคะแนน 8, 9 และ 10 เก็บในตัวแปรชนิด <code>int</code> ทั้งสามตัว จงหาค่าเฉลี่ยให้ได้ทศนิยมที่ถูกต้อง <strong>และ</strong>แสดงผลแบบผิดเพื่อเปรียบเทียบ</p>`,
      spec: ["คำนวณผลรวมเป็น int", "แสดงค่าเฉลี่ยแบบผิด (หาร int ด้วย int) และแบบถูก (cast หรือหารด้วย 3.0)", "ใช้คะแนน 8, 9, 9 แทนดูด้วย ว่าแบบผิดให้ผลต่างจากแบบถูกอย่างไร (ในตัวอย่างใช้ 8, 9, 10)"],
      solution: j`
        public class DecimalAverage {
            public static void main(String[] args) {
                int s1 = 8, s2 = 9, s3 = 10;
                int sum = s1 + s2 + s3;
                double wrong = sum / 3;    // int / int ตัดเศษ
                double right = sum / 3.0;  // หารด้วย 3.0 ได้ทศนิยม
                System.out.println("Sum = " + sum);
                System.out.println("Wrong average = " + wrong);
                System.out.println("Right average = " + right);
                int t1 = 8, t2 = 9, t3 = 9;
                int sum2 = t1 + t2 + t3;
                // ชุดนี้หารไม่ลงตัว เห็นความต่างชัด
                System.out.println("8,9,9 wrong = " + (sum2 / 3) + ", right = " + ((double) sum2 / 3));
            }
        }`, explain: "กับ 8, 9, 10 ผลรวม 27 หาร 3 ลงตัว ทั้งสองแบบจึงได้ 9 เท่ากัน — อย่าเชื่อการทดสอบชุดเดียว! กับ 8, 9, 9 แบบผิดได้ 8 แต่แบบถูกได้ 8.67" },
    { level: 2, title: "ดัชนีมวลกาย (BMI)", html: `<p>คำนวณ BMI จากน้ำหนัก 68.5 กิโลกรัม และส่วนสูง 172 <strong>เซนติเมตร</strong> ด้วยสูตร BMI = น้ำหนัก ÷ (ส่วนสูงเป็นเมตร)²</p>`,
      spec: ["แปลงเซนติเมตรเป็นเมตรก่อน (÷ 100.0)", "ใช้ <code>Math.pow</code> หรือคูณตัวเองก็ได้", "แสดง BMI ทศนิยม 2 ตำแหน่ง"],
      solution: j`
        public class BmiCalc {
            public static void main(String[] args) {
                double weight = 68.5;
                int heightCm = 172;
                // 100.0 ทำให้ได้ 1.72 ไม่ใช่ 1
                double heightM = heightCm / 100.0;
                // น้ำหนัก ÷ ส่วนสูง²
                double bmi = weight / Math.pow(heightM, 2);
                System.out.println("Height (m): " + heightM);
                System.out.println("BMI: " + Math.round(bmi * 100) / 100.0);
            }
        }`, explain: "ถ้าเขียน <code>heightCm / 100</code> จะได้ 1 (int) แทน 1.72 ทำให้ BMI ผิดมาก" },
    { level: 3, title: "แยกหลักและกลับตัวเลข", html: `<p>กำหนดจำนวนเต็ม 3 หลัก <code>number = 582</code> จงแยกหลักร้อย สิบ หน่วย แล้วสร้าง<strong>ตัวเลขกลับหลัก</strong> (285) และหาผลรวมของหลัก โดยใช้เฉพาะ <code>/</code>, <code>%</code>, <code>*</code>, <code>+</code> (ห้ามใช้ String)</p>`,
      spec: ["หลักหน่วย = number % 10, หลักสิบ = number / 10 % 10, หลักร้อย = number / 100", "ตัวเลขกลับหลัก = หน่วย × 100 + สิบ × 10 + ร้อย", "แสดงผลตามตัวอย่าง และลองเปลี่ยนเป็น 907 ว่าได้ 709 หรือไม่"],
      solution: j`
        public class ReverseDigits {
            public static void main(String[] args) {
                int number = 582;
                // หลักร้อย
                int hundreds = number / 100;
                // หลักสิบ
                int tens = number / 10 % 10;
                // หลักหน่วย
                int ones = number % 10;
                // สลับตำแหน่งหลัก
                int reversed = ones * 100 + tens * 10 + hundreds;
                System.out.println("Digits: " + hundreds + ", " + tens + ", " + ones);
                System.out.println("Reversed: " + reversed);
                System.out.println("Digit sum: " + (hundreds + tens + ones));
            }
        }` },
    { level: 3, title: "ทอนเงินด้วยธนบัตรและเหรียญ", html: `<p>ลูกค้าซื้อของ 1,263 บาท จ่ายด้วยเงิน 2,000 บาท จงคำนวณเงินทอนแล้วแตกเป็นธนบัตร/เหรียญ 500, 100, 50, 20, 10, 5, 1 ให้ได้<strong>จำนวนใบน้อยที่สุด</strong></p>`,
      spec: ["เงินทอน = 2000 − 1263", "คำนวณจากชนิดใหญ่ไปเล็ก: จำนวน = เงินที่เหลือ / ชนิด แล้ว เงินที่เหลือ = เงินที่เหลือ % ชนิด", "ใช้ตัวแปร <code>remain</code> ตัวเดียวอัปเดตไปเรื่อย ๆ", "ตรวจผล: ผลรวมของ (ชนิด × จำนวน) ต้องเท่ากับเงินทอน"],
      solution: j`
        public class ChangeBreakdown {
            public static void main(String[] args) {
                int price = 1263;
                int paid = 2000;
                int change = paid - price;  // 2000 - 1263 = 737
                System.out.println("Change: " + change);
                int remain = change;
                // จำนวนใบ แล้วเก็บเศษไว้คิดต่อ
                int b500 = remain / 500; remain %= 500;
                int b100 = remain / 100; remain %= 100;
                int b50 = remain / 50;   remain %= 50;
                int b20 = remain / 20;   remain %= 20;
                int c10 = remain / 10;   remain %= 10;
                int c5 = remain / 5;     remain %= 5;
                int c1 = remain;  // ที่เหลือเป็นเหรียญ 1 บาท
                System.out.println("500 x " + b500);
                System.out.println("100 x " + b100);
                System.out.println("50 x " + b50);
                System.out.println("20 x " + b20);
                System.out.println("10 x " + c10);
                System.out.println("5 x " + c5);
                System.out.println("1 x " + c1);
            }
        }`, explain: "737 = 500 + 2×100 + 20 + 10 + 5 + 2×1" },
    { level: 3, title: "ค่าโทรศัพท์รายเดือน", html: `<p>บริษัทคิดค่าโทรดังนี้: ค่าบริการรายเดือน 199 บาท โทรฟรี 150 นาที นาทีที่เกินคิดนาทีละ 1.50 บาท และค่าอินเทอร์เน็ต 12.5 GB คิด GB ละ 20 บาท รวมแล้วบวก VAT 7% เดือนนี้โทร 237 นาที</p><p><strong>ข้อจำกัด:</strong> ยังไม่ได้เรียน if ให้หานาทีที่เกินด้วย <code>Math.max(0, นาทีที่โทร − 150)</code></p>`,
      spec: ["ประกาศค่าคงที่ทั้งหมดด้วย final (ค่าบริการ, นาทีฟรี, ราคาต่อนาที, ราคาต่อ GB, VAT)", "คำนวณ: นาทีที่เกิน, ค่าโทรส่วนเกิน, ค่าเน็ต, ยอดก่อน VAT, VAT, ยอดสุทธิ", "แสดงทศนิยม 2 ตำแหน่ง", "ทดลองเปลี่ยนนาทีที่โทรเป็น 120 แล้วตรวจว่าค่าโทรส่วนเกินเป็น 0"],
      solution: j`
        public class PhoneBill {
            public static void main(String[] args) {
                // ค่าคงที่ทั้งหมดอยู่ด้านบน แก้ง่าย
                final double BASE_FEE = 199;
                final int FREE_MINUTES = 150;
                final double PER_MINUTE = 1.50;
                final double PER_GB = 20;
                final double VAT = 0.07;

                int minutesUsed = 237;
                double gbUsed = 12.5;

                // ไม่ให้ติดลบเมื่อใช้ไม่ถึง 150 นาที
                int extraMinutes = Math.max(0, minutesUsed - FREE_MINUTES);
                double callCharge = extraMinutes * PER_MINUTE;
                double dataCharge = gbUsed * PER_GB;
                // รวมก่อนคิด VAT
                double beforeVat = BASE_FEE + callCharge + dataCharge;
                double vat = beforeVat * VAT;
                double total = beforeVat + vat;

                System.out.println("Extra minutes: " + extraMinutes);
                System.out.println("Call charge: " + Math.round(callCharge * 100) / 100.0);
                System.out.println("Data charge: " + Math.round(dataCharge * 100) / 100.0);
                System.out.println("Before VAT: " + Math.round(beforeVat * 100) / 100.0);
                System.out.println("VAT: " + Math.round(vat * 100) / 100.0);
                System.out.println("Total: " + Math.round(total * 100) / 100.0);
            }
        }` },
  ],
};
