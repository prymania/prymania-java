import { j, c, pre, jpre, fpre } from "../lib.mjs";

export default {
  num: 2, file: "chapter-02.html",
  pageTitle: "บทที่ 2: เริ่มต้นกับ Java", shortName: "บทที่ 2",
  tocLabel: "บทที่ 2 · โปรแกรมแรก", sidebarBottom: "เขียนโปรแกรมแรกให้รันได้ด้วยตัวเอง",
  kicker: "บทที่ 2 · รู้จักเครื่องมือและภาษา Java", h1: "เริ่มต้นกับ Java และโปรแกรมแรก",
  lead: "รู้จักเส้นทางจากไฟล์ที่เราเขียนไปจนถึงผลลัพธ์บนหน้าจอ แล้วสร้างโปรแกรม Java ขนาดเล็กด้วยตัวเอง",
  goals: ["อธิบายหน้าที่ของ JDK, JVM และ IDE", "อ่านโครงสร้างคลาสและเมธอด main", "ใช้ println, print, comment และ escape sequence", "คอมไพล์ รัน และแก้ syntax error อย่างเป็นขั้นตอน"],
  prev: { href: "chapter-01.html", label: "← บทที่ 1" },
  next: { href: "chapter-03.html", label: "บทที่ 3: ตัวแปรและการคำนวณ →" },
  footer: "บทที่ 2 · บันทึกไฟล์และลองรันด้วยตัวเอง",
  introHeading: "2. จากไฟล์ข้อความเป็นโปรแกรมที่ทำงาน",
  introHtml: `<p>โค้ด Java เป็นข้อความที่มนุษย์เขียนและอ่านได้ ก่อนทำงานต้องแปลงให้อยู่ในรูปที่ Java Virtual Machine (JVM) เข้าใจ ขั้นตอนนี้ช่วยตรวจข้อผิดพลาดด้านไวยากรณ์ก่อนเริ่มรัน บทนี้จะเริ่มจากภาพรวมของเครื่องมือ แล้วค่อย ๆ เขียนโปรแกรมจากบรรทัดเดียวไปจนถึงโปรแกรมที่จัดรูปแบบผลลัพธ์ได้</p>`,
  topics: [
    {
      num: "2.1", toc: "JDK, JVM และ IDE", title: "JDK, JVM และ IDE ทำหน้าที่อะไร",
      blocks: [
        { type: "p", html: `โค้ดที่เราเขียนต้องผ่าน 2 ขั้นก่อนได้ผลลัพธ์: <strong>javac</strong> ตรวจและแปลไฟล์ <code>.java</code> เป็น bytecode (<code>.class</code>) แล้ว <strong>JVM</strong> นำ bytecode ไปรัน` },
        { type: "html", html: fpre(`
          ไฟล์ Hello.java  →  javac (compiler)  →  Hello.class (bytecode)  →  JVM  →  ผลลัพธ์บนจอ
             เราเขียน            ตรวจ+แปล             ไฟล์ที่ได้               รัน`) },
        { type: "table", head: ["คำ", "คืออะไร", "เปรียบเทียบ"], rows: [
          ["JDK", "ชุดเครื่องมือนักพัฒนา มี javac และ JVM อยู่ในตัว", "กล่องเครื่องมือช่าง"],
          ["javac", "compiler: ตรวจไวยากรณ์ แล้วแปล .java → .class", "บรรณาธิการตรวจคำผิดก่อนพิมพ์"],
          ["JVM", "รัน bytecode ได้บนทุกระบบปฏิบัติการ", "ล่ามที่อ่าน bytecode ให้เครื่องเข้าใจ"],
          ["IDE", "โปรแกรมช่วยเขียนโค้ด กดปุ่มเดียวเรียก javac และ JVM ให้", "โต๊ะทำงานที่จัดเครื่องมือไว้ครบ"],
        ] },
        { type: "tip", title: "ทำไม Java รันได้หลายระบบ", html: `bytecode ไม่ผูกกับ Windows, macOS หรือ Linux เครื่องไหนมี JVM ก็รันไฟล์ <code>.class</code> เดียวกันได้ จึงเป็นที่มาของคำว่า <em>“Write once, run anywhere”</em> เราแก้เฉพาะไฟล์ <code>.java</code> เท่านั้น ไฟล์ <code>.class</code> ถูกสร้างใหม่ทุกครั้งที่คอมไพล์` },
        { type: "check", title: "ใครทำงานเมื่อไร", html: `<p>ถ้าลืม <code>;</code> แล้วกด Run — ข้อผิดพลาดถูกพบโดย javac หรือ JVM? โปรแกรมได้เริ่มทำงานหรือยัง?</p>`, answer: `<p>พบโดย <strong>javac</strong> ตอนคอมไพล์ โปรแกรมยังไม่ได้เริ่มทำงานเลย เพราะไม่มีไฟล์ .class ใหม่ให้ JVM รัน</p>` },
      ],
    },
    {
      num: "2.2", toc: "โครงสร้างโปรแกรม Java", title: "โครงสร้างของโปรแกรม Java และการแสดงผล",
      blocks: [
        { type: "p", html: `โปรแกรม Java อยู่ใน<strong>คลาส</strong> ภายในคลาสมีเมธอด <code>main</code> ซึ่งเป็นจุดเริ่มทำงาน ทุกคำสั่งลงท้ายด้วย <code>;</code> และบล็อกคำสั่งอยู่ใน <code>{ }</code>` },
        { type: "html", html: jpre(`
          public class Hello {                          // ① ประกาศคลาสชื่อ Hello
              public static void main(String[] args) {  // ② เมธอด main = จุดเริ่มทำงาน
                  System.out.println("Hello, Java!");   // ③ คำสั่ง: พิมพ์ข้อความแล้วขึ้นบรรทัดใหม่
              }                                         // ④ ปิดเมธอด main
          }                                             // ⑤ ปิดคลาส`) },
        { type: "table", head: ["ส่วน", "ต้องรู้"], rows: [
          ["<code>public class Hello</code>", "ชื่อคลาสต้องตรงกับชื่อไฟล์ <code>Hello.java</code> ทุกตัวอักษร"],
          ["<code>public static void main(String[] args)</code>", "เขียนแบบนี้ทุกครั้ง ความหมายแต่ละคำจะเรียนในบทเมธอดและคลาส"],
          ["<code>System.out.println(...)</code>", "พิมพ์ค่าในวงเล็บไปที่ console แล้วขึ้นบรรทัดใหม่"],
          ["<code>\"Hello, Java!\"</code>", "ข้อความ (String) ต้องอยู่ในเครื่องหมายคำพูดคู่"],
        ] },
        { type: "run", title: "โปรแกรมแรก",
          code: j`
            public class Hello {
                public static void main(String[] args) {
                    System.out.println("Hello, Java!");
                }
            }`,
          },
        { type: "warn", html: `ถ้าประกาศ <code>public class Hello</code> ต้องบันทึกเป็น <code>Hello.java</code> ไม่ใช่ <code>hello.java</code> และชื่อคลาสนิยมขึ้นต้นตัวพิมพ์ใหญ่ทุกคำ (PascalCase) เช่น <code>StudentReport</code>` },

        { type: "h", text: "print กับ println" },
        { type: "table", head: ["คำสั่ง", "ทำอะไร"], rows: [
          ["<code>System.out.println(x)</code>", "พิมพ์ x แล้ว<strong>ขึ้นบรรทัดใหม่</strong>"],
          ["<code>System.out.print(x)</code>", "พิมพ์ x แล้ว<strong>อยู่บรรทัดเดิม</strong>"],
          ["<code>System.out.println()</code>", "ไม่พิมพ์อะไร แค่ขึ้นบรรทัดใหม่ (ได้บรรทัดว่าง)"],
        ] },
        { type: "run", title: "คำสั่งทำงานจากบนลงล่าง",
          code: j`
            public class PrintVsPrintln {
                public static void main(String[] args) {
                    System.out.print("A");          // A
                    System.out.print("B");          // AB     ต่อบรรทัดเดิม
                    System.out.println("C");        // ABC    แล้วขึ้นบรรทัดใหม่
                    System.out.println("D");        // D
                    System.out.println();           // (บรรทัดว่าง)
                    System.out.print("E ");
                    System.out.println("F");        // E F
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: แนะนำตัว 3 บรรทัด", blocks: [
          { type: "run", title: "ลำดับ output ตรงกับลำดับในโค้ด",
            code: j`
              public class AboutMe {
                  public static void main(String[] args) {
                      System.out.println("Name: JHope");
                      System.out.println("Major: Computer Science");
                      System.out.println("Year: 1");
                  }
              }`,
            after: "ลองสลับบรรทัด Name กับ Year แล้วดูว่า output เปลี่ยนตามหรือไม่" },
        ] },

        { type: "h", text: "Comment" },
        { type: "p", html: `comment คือข้อความอธิบายโค้ดสำหรับคนอ่าน compiler ไม่สนใจ <code>//</code> ใช้ถึงท้ายบรรทัด และ <code>/* ... */</code> ใช้หลายบรรทัด` },
        { type: "run", title: "บรรทัดที่อยู่ใน comment ไม่ทำงาน",
          code: j`
            /*
             * โปรแกรมนี้ใช้ทดลอง comment
             * ผู้เขียน: JHope
             */
            public class CommentDemo {
                public static void main(String[] args) {
                    System.out.println("Line 1");
                    // System.out.println("Line 2");     ← ถูกปิดไว้ ไม่ทำงาน
                    System.out.println("Line 3");          // comment ท้ายบรรทัดก็ได้
                }
            }`,
          },
        { type: "tip", html: `เทคนิค “comment out” (ปิดบรรทัดชั่วคราว) ช่วยหาว่าบรรทัดไหนทำให้เกิดปัญหา โดยไม่ต้องลบโค้ดทิ้ง` },

        { type: "h", text: "Escape sequence: อักขระพิเศษในข้อความ" },
        { type: "table", head: ["เขียนว่า", "ความหมาย", "ตัวอย่าง", "ผลลัพธ์"], rows: [
          ["<code>\\n</code>", "ขึ้นบรรทัดใหม่", "<code>\"A\\nB\"</code>", "A<br>B"],
          ["<code>\\t</code>", "แท็บ (เว้นเป็นคอลัมน์)", "<code>\"A\\tB\"</code>", "A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B"],
          ["<code>\\\"</code>", "เครื่องหมาย \" ในข้อความ", "<code>\"Say \\\"Hi\\\"\"</code>", "Say \"Hi\""],
          ["<code>\\\\</code>", "เครื่องหมาย \\ หนึ่งตัว", "<code>\"C:\\\\java\"</code>", "C:\\java"],
        ] },
        { type: "run", title: "หัวใบเสร็จร้านกาแฟ",
          code: j`
            public class ReceiptHeader {
                public static void main(String[] args) {
                    System.out.println("==== \"Java Cafe\" ====");          // \" แสดงเครื่องหมายคำพูด
                    System.out.println("Item\tQty\tPrice");               // \t จัดเป็นคอลัมน์
                    System.out.println("Latte\t2\t90");
                    System.out.println("Cake\t1\t65");
                    System.out.println("Thank you!\nSee you again.");     // \n ขึ้นบรรทัดในคำสั่งเดียว
                    System.out.println("Saved at C:\\receipts");          // \\ แสดง \ หนึ่งตัว
                }
            }`,
          },
        { type: "check", title: "ทำนาย output", html: jpre(`
          System.out.print("Java");
          System.out.println(" is");
          System.out.print("fun\\n!");`), answer: pre(`
          Java is
          fun
          !`) },
      ],
    },
    {
      num: "2.3", toc: "คอมไพล์ รัน และอ่าน error", title: "คอมไพล์ รัน และเริ่มอ่าน error",
      blocks: [
        { type: "p", html: `บน command line ให้คอมไพล์ก่อนแล้วจึงรัน (ตั้งแต่ Java 11 รันไฟล์เดียวตรง ๆ ด้วย <code>java Hello.java</code> ได้ด้วย)` },
        { type: "html", html: pre(`
          javac Hello.java     ← คอมไพล์ ได้ไฟล์ Hello.class
          java Hello           ← รัน (ไม่ต้องเติม .class)`) },
        { type: "h", text: "อ่าน compile error" },
        { type: "p", html: `ถ้าโค้ดผิดไวยากรณ์ javac จะหยุดและบอก<strong>ชื่อไฟล์ เลขบรรทัด และชนิดปัญหา</strong> พร้อมคัดลอกบรรทัดนั้นมาให้ และใช้ <code>^</code> ชี้ตำแหน่ง` },
        { type: "run", label: "ทดลอง error 2.3.1", title: "ลืม semicolon", expect: "compile-error",
          code: j`
            public class MissingSemicolon {
                public static void main(String[] args) {
                    System.out.println("Start")
                    System.out.println("End");
                }
            }`,
          after: "<code>MissingSemicolon.java:3</code> = ไฟล์และบรรทัด, <code>';' expected</code> = ชนิดปัญหา (ขาด semicolon) และ <code>^</code> ชี้ท้าย <code>\"Start\")</code> ซึ่งเป็นจุดที่ต้องเติม <code>;</code>" },
        { type: "tip", title: "แก้ทีละจุด", html: `ตรวจบรรทัดที่ถูกชี้<em>และบรรทัดก่อนหน้า</em> เพราะบางครั้งต้นเหตุอยู่ก่อนจุดที่ถูกชี้ แล้วแก้ error แรกก่อนเสมอ error ตัวหลัง ๆ มักเป็นผลพวงของตัวแรก` },
        { type: "more", title: "ดูตัวอย่าง error อื่น ๆ ที่พบบ่อย", blocks: [
          { type: "run", label: "ทดลอง error 2.3.2", title: "สะกดชื่อผิด (ตัวพิมพ์ใหญ่-เล็ก)", expect: "compile-error",
            code: j`
              public class WrongCase {
                  public static void main(String[] args) {
                      system.out.println("Hello");
                      System.out.printn("World");
                  }
              }`,
            after: "Java แยกตัวพิมพ์ใหญ่-เล็ก <code>system</code> ต้องเป็น <code>System</code> และ <code>printn</code> ต้องเป็น <code>println</code> ข้อความ <code>cannot find symbol</code> มักแปลว่า “สะกดผิด” หรือ “ยังไม่ได้ประกาศ”" },
          { type: "run", label: "ทดลอง error 2.3.3", title: "วงเล็บปีกกาไม่ครบคู่", expect: "compile-error",
            code: j`
              public class MissingBrace {
                  public static void main(String[] args) {
                      System.out.println("Open");
                      System.out.println("Close");

              }`,
            after: "<code>reached end of file while parsing</code> แปลว่าอ่านถึงท้ายไฟล์แล้วยังปิดบล็อกไม่ครบ จุดที่ต้องแก้คือ <code>}</code> ของ main ที่หายไป การจัดย่อหน้าให้สม่ำเสมอช่วยให้เห็นได้ง่าย" },
          { type: "run", label: "ทดลอง error 2.3.4", title: "ข้อความไม่ปิดเครื่องหมายคำพูด", expect: "compile-error",
            code: j`
              public class UnclosedString {
                  public static void main(String[] args) {
                      System.out.println("Hello);
                  }
              }`,
            after: "เปิด <code>\"</code> แล้วไม่ปิด compiler จึงมองว่า <code>);</code> เป็นส่วนหนึ่งของข้อความ แก้เป็น <code>\"Hello\");</code>" },
        ] },
        { type: "table", title: "สรุป error ที่พบบ่อย", head: ["ข้อความ error", "สาเหตุ", "วิธีแก้"], rows: [
          ["<code>';' expected</code>", "ลืม semicolon", "เติม ; ท้ายคำสั่ง"],
          ["<code>cannot find symbol</code>", "สะกดชื่อผิด หรือตัวพิมพ์ผิด", "ตรวจตัวสะกด เช่น println, System"],
          ["<code>reached end of file while parsing</code>", "ขาด <code>}</code>", "นับคู่วงเล็บ จัดย่อหน้า"],
          ["<code>unclosed string literal</code>", "ไม่ปิด <code>\"</code>", "ปิดเครื่องหมายคำพูด"],
          ["<code>class X is public, should be declared in a file named X.java</code>", "ชื่อไฟล์ไม่ตรงชื่อคลาส", "เปลี่ยนให้ตรงกัน"],
        ] },
        { type: "check", title: "หา error", html: jpre(`
          public class Test {
              public static void main(String[] args) {
                  System.out.println("A")
                  System.out.Println("B");
              }
          }`) + `<p>มีกี่จุดที่ผิด อะไรบ้าง</p>`, answer: `<p>2 จุด: บรรทัด 3 ขาด <code>;</code> และบรรทัด 4 <code>Println</code> ต้องเป็น <code>println</code> (ตัวเล็ก)</p>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "ทักทายด้วยโปรแกรมแรก", html: `<p>สร้างคลาสชื่อ <code>Greeting</code> ให้พิมพ์ข้อความ <code>สวัสดี Java</code> หนึ่งบรรทัด</p>`,
      spec: ["ประกาศ <code>public class Greeting</code>", "บันทึกไฟล์ให้ชื่อถูกต้อง (ตอบด้วยว่าชื่อไฟล์คืออะไร)", "ใช้ <code>System.out.println</code> หนึ่งครั้ง"],
      solution: j`
        public class Greeting {
            public static void main(String[] args) {
                System.out.println("สวัสดี Java");
            }
        }`, explain: "ชื่อไฟล์ต้องเป็น <code>Greeting.java</code> ให้ตรงกับชื่อคลาส public" },
    { level: 1, title: "ป้ายต้อนรับ 3 บรรทัด", html: `<p>แสดงข้อความ 3 บรรทัด: ชื่อวิชา, ชื่อของคุณ และ <code>Ready to learn Java</code></p>`,
      spec: ["ใช้ println 3 คำสั่ง", "ใส่ comment บรรทัดบนสุดของ main ว่าโปรแกรมนี้ทำอะไร", "ข้อความในบรรทัดที่ 1–2 เปลี่ยนเป็นของตนเองได้"],
      solution: j`
        public class Welcome {
            public static void main(String[] args) {
                // แสดงป้ายต้อนรับ 3 บรรทัด
                System.out.println("Computer Programming 1");  // println ทีละบรรทัด
                System.out.println("JHope Jung");
                System.out.println("Ready to learn Java");
            }
        }` },
    { level: 1, title: "print ต่อบรรทัด", html: `<p>ใช้ <code>System.out.print</code> อย่างน้อย 3 คำสั่งเพื่อพิมพ์คำว่า <code>I</code>, <code>love</code>, <code>Java</code> ให้อยู่ในบรรทัดเดียวกันโดยมีช่องว่างคั่น แล้วใช้ println พิมพ์ <code>Done</code> ในบรรทัดถัดไป</p>`,
      spec: ["ห้ามเขียนทั้งประโยคในคำสั่งเดียว", "ระวังช่องว่างระหว่างคำ", "ต้องขึ้นบรรทัดใหม่ก่อนพิมพ์ Done"],
      solution: j`
        public class PrintSameLine {
            public static void main(String[] args) {
                System.out.print("I ");  // print ไม่ขึ้นบรรทัดใหม่
                System.out.print("love ");
                System.out.print("Java");
                System.out.println();  // ขึ้นบรรทัดใหม่หลังจบประโยค
                System.out.println("Done");
            }
        }`, explain: "<code>println()</code> เปล่า ๆ ทำหน้าที่ขึ้นบรรทัดใหม่หลังจาก print ชุดแรก" },
    { level: 2, title: "หาข้อผิดพลาดและแก้ไข", html: `<p>โค้ดต่อไปนี้คอมไพล์ไม่ผ่าน มี<strong>ข้อผิดพลาด 3 จุด</strong> ให้ระบุว่าแต่ละจุดผิดอย่างไร javac จะแจ้งว่าอย่างไร แล้วเขียนโค้ดที่ถูกต้อง</p>` + jpre(`
        public class Start {
            public static void main(String[] args) {
                System.out.println("Start")
                system.out.println("Middle");
                System.out.println("End);
            }
        }`),
      spec: ["ระบุเลขบรรทัดและสาเหตุของแต่ละจุด", "แก้ให้คอมไพล์ผ่านและได้ผลลัพธ์ตามตัวอย่าง"],
      solution: j`
        public class Start {
            public static void main(String[] args) {
                System.out.println("Start");
                System.out.println("Middle");
                System.out.println("End");
            }
        }`, explain: "บรรทัด 3 ขาด <code>;</code> (<code>';' expected</code>), บรรทัด 4 <code>system</code> ต้องเป็น <code>System</code> (<code>package system does not exist</code>), บรรทัด 5 ไม่ปิด <code>\"</code> (<code>unclosed string literal</code>)" },
    { level: 2, title: "ข้อความที่มีเครื่องหมายพิเศษ", html: `<p>เขียนโปรแกรมแสดงผล<strong>ให้ตรงตามตัวอย่างทุกตัวอักษร</strong> ซึ่งมีทั้งเครื่องหมายคำพูดและ backslash</p>`,
      spec: ["ใช้ <code>\\\"</code> สำหรับเครื่องหมายคำพูด", "ใช้ <code>\\\\</code> สำหรับ backslash", "บรรทัดที่ 3 และ 4 ต้องเกิดจาก println <strong>คำสั่งเดียว</strong> โดยใช้ <code>\\n</code>"],
      solution: j`
        public class SpecialChars {
            public static void main(String[] args) {
                System.out.println("Teacher said \"Practice every day\"");  // \" แสดงเครื่องหมายคำพูด
                System.out.println("File: C:\\java\\Hello.java");           // \\ แสดง \ หนึ่งตัว
                System.out.println("Line A\nLine B");                       // \n แบ่งเป็น 2 บรรทัด
            }
        }` },
    { level: 2, title: "ตารางเวลาเรียนด้วย \\t", html: `<p>แสดงตารางเรียน 3 วิชา โดยใช้ <code>\\t</code> จัดคอลัมน์ให้ตรงกัน มีหัวตาราง และเส้นคั่นด้วยเครื่องหมาย <code>-</code></p>`,
      spec: ["หัวตารางมี 3 คอลัมน์: Day, Time, Subject", "มีเส้นคั่นใต้หัวตาราง", "ข้อมูล 3 แถวตามตัวอย่าง (เปลี่ยนวิชาเป็นของตนเองได้)"],
      solution: j`
        public class Timetable {
            public static void main(String[] args) {
                // \t จัดหัวตารางเป็นคอลัมน์
                System.out.println("Day\tTime\tSubject");
                System.out.println("-------------------------------");
                System.out.println("Mon\t09:00\tProgramming");
                System.out.println("Tue\t13:00\tMath");
                System.out.println("Wed\t10:00\tEnglish");
            }
        }` },
    { level: 2, title: "ใบเสร็จอย่างง่าย", html: `<p>แสดงใบเสร็จร้านค้าที่มีชื่อร้าน เส้นคั่น ชื่อสินค้า 2 รายการพร้อมราคา ราคารวม และคำว่า <code>Thank you!</code> ตามตัวอย่าง (ยังไม่ต้องคำนวณ ให้พิมพ์ตัวเลขตรง ๆ)</p>`,
      spec: ["ใช้ <code>=</code> ทำเส้นคั่นบนและล่าง", "ใช้ <code>\\t</code> คั่นชื่อสินค้ากับราคา", "มีบรรทัดว่าง 1 บรรทัดก่อน Thank you!"],
      solution: j`
        public class SimpleReceipt {
            public static void main(String[] args) {
                System.out.println("===== MINI MART =====");
                // \t\t: ชื่อสั้นจึงเว้น 2 tab
                System.out.println("Pen\t\t15");
                // ชื่อยาว เว้น 1 tab พอ
                System.out.println("Notebook\t35");
                System.out.println("---------------------");
                System.out.println("Total\t\t50");
                System.out.println("=====================");
                System.out.println();  // บรรทัดว่างคั่น
                System.out.println("Thank you!");
            }
        }`, explain: "<code>Pen</code> สั้นกว่า <code>Notebook</code> จึงใช้ <code>\\t\\t</code> เพื่อให้ราคาอยู่คอลัมน์เดียวกัน" },
    { level: 3, title: "วาดรูปด้วยตัวอักษร", html: `<p>ใช้ println แสดงรูปบ้านด้วยตัวอักษรตามตัวอย่าง รูปมีหลังคา (<code>/</code> และ <code>\\</code>) ผนัง และประตู</p>`,
      spec: ["ต้องแสดง backslash ให้ถูกต้อง (ใช้ <code>\\\\</code>)", "จัดช่องว่างนำหน้าให้รูปสมมาตร", "อธิบายว่าทำไมบรรทัดหลังคาในโค้ดดูยาวกว่าผลลัพธ์"],
      solution: j`
        public class AsciiHouse {
            public static void main(String[] args) {
                // \\ ในโค้ด = \ ตัวเดียวบนจอ
                System.out.println("     /\\");
                System.out.println("    /  \\");
                System.out.println("   /    \\");
                System.out.println("  /______\\");
                System.out.println("  |      |");
                System.out.println("  |  []  |");
                System.out.println("  |______|");
            }
        }`, explain: "ในโค้ด <code>\\\\</code> สองตัวแสดงผลเป็น <code>\\</code> ตัวเดียว บรรทัดในโค้ดจึงยาวกว่าผลลัพธ์หนึ่งตัวอักษร" },
    { level: 3, title: "นามบัตรในกรอบ", html: `<p>สร้างนามบัตรในกรอบที่ทำจาก <code>+</code>, <code>-</code> และ <code>|</code> ภายในมีชื่อ ตำแหน่ง อีเมล และคำคมในเครื่องหมายคำพูด ทุกบรรทัดต้องกว้างเท่ากัน (ขอบขวาตรงกัน)</p>`,
      spec: ["ใช้ภาษาอังกฤษในการ์ดเพื่อให้นับความกว้างได้ง่าย", "บรรทัดคำคมต้องมีเครื่องหมาย <code>\"</code> ครอบ", "นับจำนวนตัวอักษรแต่ละบรรทัดให้เท่ากัน (ในตัวอย่างกว้าง 32 ตัวอักษร)"],
      solution: j`
        public class BusinessCard {
            public static void main(String[] args) {
                System.out.println("+------------------------------+");
                System.out.println("| JHope Jung                  |");
                System.out.println("| Junior Java Developer        |");
                System.out.println("| jhope@example.com             |");
                System.out.println("|                              |");
                // \" ใช้ 2 ตัวอักษรในโค้ด แต่แสดง 1 ตัว
                System.out.println("| \"Code a little every day.\"   |");
                System.out.println("+------------------------------+");
            }
        }`, explain: "บรรทัดคำคมในโค้ดมี <code>\\\"</code> 2 ที่ ดูยาวกว่าบรรทัดอื่น 2 ตัวอักษร แต่ผลลัพธ์กว้างเท่ากัน" },
    { level: 3, title: "แก้โปรแกรมที่มีหลาย error", html: `<p>โค้ดนี้บันทึกในไฟล์ <code>Report.java</code> แต่มีข้อผิดพลาด<strong>อย่างน้อย 4 จุด</strong> ให้คอมไพล์ อ่าน error ทีละตัว แก้ทีละจุดจนรันได้ผลตามตัวอย่าง และบันทึกว่าแก้อะไรตามลำดับ</p>` + jpre(`
        public class report {
            public static void main(String[] args) {
                System.out.println("Student Report")
                System.out.println("Name:\tJHope");
                System.out.printline("Score:\t85");
                System.out.println("Status: "Pass"");
        }`),
      spec: ["เริ่มแก้จาก error แรกที่ javac รายงาน แล้วคอมไพล์ใหม่ทุกครั้ง", "ผลลัพธ์บรรทัดสุดท้ายต้องมีเครื่องหมายคำพูดรอบคำว่า Pass", "เขียนสรุปว่าแต่ละ error มีข้อความว่าอะไร"],
      solution: j`
        public class Report {
            public static void main(String[] args) {
                System.out.println("Student Report");
                System.out.println("Name:\tJHope");  // \t เว้นระยะหลังหัวข้อ
                System.out.println("Score:\t85");
                System.out.println("Status: \"Pass\"");  // \" ครอบคำว่า Pass
            }
        }`, explain: "จุดที่แก้: (1) ชื่อคลาส <code>report</code> → <code>Report</code> ให้ตรงชื่อไฟล์ (2) เติม <code>;</code> บรรทัด 3 (3) <code>printline</code> → <code>println</code> (4) ใช้ <code>\\\"</code> รอบ Pass (5) เติม <code>}</code> ปิดคลาส" },
  ],
};
