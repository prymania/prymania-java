import { j, c, pre } from "../lib.mjs";

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
        { type: "p", html: `<strong>JDK</strong> (Java Development Kit) คือชุดเครื่องมือพัฒนา มี compiler ชื่อ <code>javac</code> และ JVM อยู่ในตัว ส่วน <strong>JVM</strong> (Java Virtual Machine) ใช้รัน bytecode ในไฟล์ <code>.class</code> ขณะที่ <strong>IDE</strong> (เช่น IntelliJ IDEA, NetBeans, VS Code) คือโปรแกรมช่วยเขียนโค้ด ไฮไลต์ error และกดปุ่มเดียวเพื่อเรียก javac และ JVM ให้` },
        { type: "example", title: "ภาพรวมการทำงาน", html: pre(`
          ไฟล์ Hello.java  →  javac (compiler)  →  Hello.class (bytecode)  →  JVM  →  ผลลัพธ์บนจอ
             เราเขียน            ตรวจ+แปล             ไฟล์ที่ได้               รัน`) + `<p>เราแก้เฉพาะไฟล์ <code>.java</code> เท่านั้น ไฟล์ <code>.class</code> ถูกสร้างใหม่ทุกครั้งที่คอมไพล์</p>` },
        { type: "steps", title: "ลำดับเหตุการณ์เมื่อกด Run ใน IDE", items: [
          "IDE บันทึกไฟล์ <code>.java</code>",
          "IDE เรียก <code>javac</code> ตรวจไวยากรณ์ ถ้าผิดจะหยุดและแสดง <strong>compile error</strong> (ยังไม่ได้รันเลย)",
          "ถ้าผ่าน javac สร้างไฟล์ <code>.class</code> ที่มี bytecode",
          "IDE เรียก JVM ให้โหลดคลาสและเริ่มทำงานที่เมธอด <code>main</code>",
          "ผลลัพธ์แสดงในหน้าต่าง Console/Output ถ้าเกิดปัญหาระหว่างรันจะเป็น <strong>runtime error</strong>",
        ] },
        { type: "table", head: ["คำ", "คืออะไร", "เปรียบเทียบ"], rows: [
          ["JDK", "ชุดเครื่องมือสำหรับนักพัฒนา (javac, java, เครื่องมืออื่น)", "กล่องเครื่องมือช่าง"],
          ["javac", "compiler แปล .java → .class และตรวจไวยากรณ์", "บรรณาธิการตรวจคำผิดก่อนพิมพ์"],
          ["JVM", "เครื่องจำลองที่รัน bytecode ได้บนทุกระบบปฏิบัติการ", "ล่ามที่อ่าน bytecode ให้เครื่องเข้าใจ"],
          ["IDE", "โปรแกรมช่วยเขียนโค้ดที่รวมทุกอย่างไว้ที่เดียว", "โต๊ะทำงานที่จัดเครื่องมือไว้ครบ"],
        ] },
        { type: "note", title: "ทำไม Java รันได้หลายระบบ", html: `<p>bytecode ไม่ผูกกับ Windows/macOS/Linux ระบบใดที่มี JVM ก็รันไฟล์ <code>.class</code> เดียวกันได้ จึงเป็นที่มาของคำว่า <em>“Write once, run anywhere”</em></p>` },
        { type: "check", title: "ใครทำงานเมื่อไร", html: `<p>ถ้าลืม <code>;</code> แล้วกด Run — ข้อผิดพลาดถูกพบโดย javac หรือ JVM? โปรแกรมได้เริ่มทำงานหรือยัง?</p>`, answer: `<p>พบโดย <strong>javac</strong> ตอนคอมไพล์ โปรแกรมยังไม่ได้เริ่มทำงานเลย เพราะไม่มีไฟล์ .class ใหม่ให้ JVM รัน</p>` },
      ],
    },
    {
      num: "2.2", toc: "โครงสร้างโปรแกรม Java", title: "โครงสร้างของโปรแกรม Java และการแสดงผล",
      blocks: [
        { type: "p", html: `โปรแกรมเริ่มจาก<strong>คลาส</strong> ภายในคลาสมีเมธอด <code>main</code> ซึ่งเป็นจุดเริ่มทำงาน คำสั่งแต่ละคำสั่งลงท้ายด้วย <code>;</code> และบล็อกคำสั่งอยู่ระหว่างวงเล็บปีกกา <code>{ }</code>` },
        { type: "concept", title: "แยกส่วนประกอบของโปรแกรมแรก", html: pre(`
          public class Hello {                          // ① ประกาศคลาสชื่อ Hello
              public static void main(String[] args) {  // ② เมธอด main = จุดเริ่มทำงาน
                  System.out.println("Hello, Java!");   // ③ คำสั่ง: พิมพ์ข้อความแล้วขึ้นบรรทัดใหม่
              }                                         // ④ ปิดเมธอด main
          }                                             // ⑤ ปิดคลาส`) + `<ul><li><code>public class Hello</code> — ชื่อคลาสต้องตรงกับชื่อไฟล์ <code>Hello.java</code> (ตัวพิมพ์เล็ก-ใหญ่ต้องตรงด้วย)</li><li><code>public static void main(String[] args)</code> — ต้องเขียนแบบนี้ทุกตัวอักษร ความหมายของแต่ละคำจะเรียนในบทเมธอดและคลาส</li><li><code>System.out.println(...)</code> — สั่งพิมพ์ค่าในวงเล็บไปที่ console</li><li>ข้อความ (String) ต้องอยู่ใน <code>" "</code> เครื่องหมายคำพูดคู่</li></ul>` },
        { type: "run", title: "โปรแกรมแรก: Hello, Java!", level: "พื้นฐาน",
          concept: "โปรแกรมที่สั้นที่สุดที่มีครบทุกส่วน: คลาส → main → คำสั่งหนึ่งคำสั่ง",
          code: j`
            public class Hello {
                public static void main(String[] args) {
                    System.out.println("Hello, Java!");
                }
            }`,
          steps: ["JVM เริ่มที่ <code>main</code>", "ทำคำสั่ง println หนึ่งครั้ง พิมพ์ <code>Hello, Java!</code> และขึ้นบรรทัดใหม่", "ถึง <code>}</code> ของ main → โปรแกรมจบ"] },
        { type: "run", title: "หลายคำสั่ง ทำงานจากบนลงล่าง", level: "พื้นฐาน",
          concept: "คำสั่งใน main ทำงานเรียงตามลำดับบรรทัด (sequence) ทีละคำสั่ง",
          code: j`
            public class AboutMe {
                public static void main(String[] args) {
                    System.out.println("Name: Mali");
                    System.out.println("Major: Computer Science");
                    System.out.println("Year: 1");
                }
            }`,
          steps: ["บรรทัดแรกพิมพ์ชื่อ", "บรรทัดที่สองพิมพ์สาขา", "บรรทัดที่สามพิมพ์ชั้นปี — ลำดับใน output ตรงกับลำดับในโค้ดเสมอ"],
          tryIt: "สลับบรรทัด Name กับ Year แล้วดูว่า output เปลี่ยนตามหรือไม่" },
        { type: "run", title: "print กับ println ต่างกันอย่างไร", level: "ต่อยอด",
          concept: "<code>print</code> พิมพ์แล้ว<strong>อยู่บรรทัดเดิม</strong> ส่วน <code>println</code> พิมพ์แล้ว<strong>ขึ้นบรรทัดใหม่</strong> และ <code>println()</code> เปล่า ๆ ใช้เว้นบรรทัด",
          code: j`
            public class PrintVsPrintln {
                public static void main(String[] args) {
                    System.out.print("A");
                    System.out.print("B");
                    System.out.println("C");
                    System.out.println("D");
                    System.out.println();
                    System.out.print("E ");
                    System.out.println("F");
                }
            }`,
          steps: ["print A และ B ต่อกันในบรรทัดเดิม → <code>AB</code>", "println C ต่อท้ายแล้วขึ้นบรรทัด → บรรทัดแรกคือ <code>ABC</code>", "println D อยู่บรรทัดที่สอง", "<code>println()</code> ว่าง ทำให้เกิดบรรทัดว่าง", "print \"E \" (มีช่องว่าง) แล้ว println F → <code>E F</code>"] },
        { type: "run", title: "Comment: ข้อความที่ compiler ไม่สนใจ", level: "ต่อยอด",
          concept: "comment ใช้อธิบายโค้ดให้คนอ่าน <code>//</code> ใช้บรรทัดเดียว <code>/* ... */</code> ใช้หลายบรรทัด โค้ดที่อยู่ใน comment จะไม่ทำงาน",
          code: j`
            /*
             * โปรแกรมนี้ใช้ทดลอง comment
             * ผู้เขียน: Mali
             */
            public class CommentDemo {
                public static void main(String[] args) {
                    // พิมพ์บรรทัดแรก
                    System.out.println("Line 1");
                    // System.out.println("Line 2");  <- บรรทัดนี้ถูกปิดไว้
                    System.out.println("Line 3"); // comment ท้ายบรรทัดก็ได้
                }
            }`,
          steps: ["ส่วน <code>/* ... */</code> ด้านบนไม่ถูกคอมไพล์", "<code>Line 2</code> ไม่ถูกพิมพ์เพราะทั้งบรรทัดเป็น comment", "comment ท้ายบรรทัดไม่กระทบคำสั่งก่อนหน้า"],
          after: "เทคนิค “comment out” (ปิดบรรทัดชั่วคราว) มีประโยชน์มากเวลาหาว่าบรรทัดไหนทำให้เกิดปัญหา" },
        { type: "table", title: "Escape sequence: อักขระพิเศษในข้อความ", head: ["เขียนว่า", "ความหมาย", "ตัวอย่าง", "ผลลัพธ์"], rows: [
          ["<code>\\n</code>", "ขึ้นบรรทัดใหม่", "<code>\"A\\nB\"</code>", "A<br>B"],
          ["<code>\\t</code>", "แท็บ (เว้นช่องเป็นคอลัมน์)", "<code>\"A\\tB\"</code>", "A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;B"],
          ["<code>\\\"</code>", "เครื่องหมาย \" ในข้อความ", "<code>\"Say \\\"Hi\\\"\"</code>", "Say \"Hi\""],
          ["<code>\\\\</code>", "เครื่องหมาย \\ หนึ่งตัว", "<code>\"C:\\\\java\"</code>", "C:\\java"],
        ] },
        { type: "run", title: "จัดรูปแบบผลลัพธ์ด้วย escape sequence", level: "ประยุกต์",
          concept: "ใช้ <code>\\t</code> ทำตาราง ใช้ <code>\\n</code> ขึ้นบรรทัดในคำสั่งเดียว และใช้ <code>\\\"</code> เมื่อต้องการแสดงเครื่องหมายคำพูด",
          code: j`
            public class ReceiptHeader {
                public static void main(String[] args) {
                    System.out.println("==== \"Java Cafe\" ====");
                    System.out.println("Item\tQty\tPrice");
                    System.out.println("Latte\t2\t90");
                    System.out.println("Cake\t1\t65");
                    System.out.println("Thank you!\nSee you again.");
                    System.out.println("Saved at C:\\receipts");
                }
            }`,
          steps: ["<code>\\\"</code> ทำให้ชื่อร้านมีเครื่องหมายคำพูดครอบ", "<code>\\t</code> ดันข้อความไปคอลัมน์ถัดไป ทำให้ Qty และ Price ตรงกัน", "<code>\\n</code> แบ่งข้อความเป็น 2 บรรทัดในคำสั่งเดียว", "<code>\\\\</code> แสดงเป็น <code>\\</code> หนึ่งตัว"] },
        { type: "note", title: "ชื่อไฟล์ต้องตรงกับคลาส public", html: `<p>ถ้าประกาศ <code>public class Hello</code> ต้องบันทึกเป็น <code>Hello.java</code> ไม่ใช่ <code>hello.java</code> หรือ <code>Hello.txt</code> และชื่อคลาสนิยมขึ้นต้นด้วยตัวพิมพ์ใหญ่ทุกคำ (PascalCase) เช่น <code>StudentReport</code></p>` },
        { type: "check", title: "ทำนาย output", html: pre(`
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
        { type: "p", html: `ถ้าใช้ command line ให้เปิด terminal ในโฟลเดอร์ที่มีไฟล์ จากนั้นคอมไพล์ก่อนแล้วจึงรัน คำสั่งที่ขาดเครื่องหมายหรือสะกดชื่อผิดทำให้ compiler แจ้ง <strong>ชื่อไฟล์ เลขบรรทัด และชนิดปัญหา</strong> ซึ่งเป็นเบาะแสที่ดีที่สุดในการแก้` },
        { type: "example", title: "คำสั่งพื้นฐานบน command line", html: pre(`
          javac Hello.java     ← คอมไพล์ ได้ไฟล์ Hello.class
          java Hello           ← รัน (ไม่ต้องเติม .class)`) + `<p>ตั้งแต่ Java 11 สามารถรันไฟล์เดียวโดยตรงด้วย <code>java Hello.java</code> ได้ด้วย (คอมไพล์ในหน่วยความจำให้อัตโนมัติ)</p>` },
        { type: "steps", title: "วิธีอ่าน error อย่างเป็นขั้นตอน", items: [
          "อ่านบรรทัดแรกของ error: <code>Hello.java:3: error: ';' expected</code> → ไฟล์ Hello.java บรรทัด 3 ขาด <code>;</code>",
          "ดูบรรทัดที่ javac คัดลอกมาและเครื่องหมาย <code>^</code> ที่ชี้ตำแหน่ง",
          "ตรวจบรรทัดนั้น <em>และบรรทัดก่อนหน้า</em> เพราะบางครั้งต้นเหตุอยู่ก่อนจุดที่ถูกชี้",
          "แก้<strong>ทีละจุด</strong>โดยเริ่มจาก error แรก แล้วคอมไพล์ใหม่ — error ตัวหลัง ๆ มักเป็นผลพวงของตัวแรก",
        ] },
        { type: "run", label: "ทดลอง error 2.3.1", title: "ลืม semicolon", level: "พื้นฐาน", expect: "compile-error",
          concept: "ทุกคำสั่งต้องจบด้วย <code>;</code> javac ชี้ตำแหน่งท้ายคำสั่งที่ขาด",
          code: j`
            public class MissingSemicolon {
                public static void main(String[] args) {
                    System.out.println("Start")
                    System.out.println("End");
                }
            }`,
          steps: ["<code>MissingSemicolon.java:3</code> บอกว่าปัญหาอยู่บรรทัด 3", "<code>';' expected</code> บอกชนิดปัญหา: ขาด semicolon", "<code>^</code> ชี้ตำแหน่งท้าย <code>\"Start\")</code> → เติม <code>;</code> ตรงนั้น"] },
        { type: "run", label: "ทดลอง error 2.3.2", title: "สะกดชื่อผิด (ตัวพิมพ์ใหญ่-เล็ก)", level: "ต่อยอด", expect: "compile-error",
          concept: "Java แยกตัวพิมพ์ใหญ่-เล็ก (case-sensitive) <code>system</code> กับ <code>System</code> คือคนละชื่อ",
          code: j`
            public class WrongCase {
                public static void main(String[] args) {
                    system.out.println("Hello");
                    System.out.printn("World");
                }
            }`,
          steps: ["error แรก: <code>package system does not exist</code> — compiler ไม่รู้จัก <code>system</code> ตัวเล็ก ต้องเป็น <code>System</code>", "error ที่สอง: <code>cannot find symbol</code> ชี้ที่ <code>printn</code> — ไม่มีเมธอดชื่อนี้ ต้องเป็น <code>println</code>", "<code>cannot find symbol</code> เป็น error ที่พบบ่อยที่สุด มักแปลว่า “สะกดผิด” หรือ “ยังไม่ได้ประกาศ”"] },
        { type: "run", label: "ทดลอง error 2.3.3", title: "วงเล็บปีกกาไม่ครบคู่", level: "ประยุกต์", expect: "compile-error",
          concept: "ทุก <code>{</code> ต้องมี <code>}</code> คู่กัน ถ้าขาด javac จะอ่านไปจนสุดไฟล์แล้วจึงแจ้ง",
          code: j`
            public class MissingBrace {
                public static void main(String[] args) {
                    System.out.println("Open");
                    System.out.println("Close");

            }`,
          steps: ["<code>reached end of file while parsing</code> แปลว่าอ่านถึงท้ายไฟล์แล้วยังปิดบล็อกไม่ครบ", "error ถูกรายงานที่บรรทัดสุดท้าย แต่จุดที่ต้องแก้คือ <code>}</code> ของ main ที่หายไป", "การจัดย่อหน้า (indent) ให้สม่ำเสมอทำให้เห็นวงเล็บที่ขาดได้ง่าย"] },
        { type: "run", label: "ทดลอง error 2.3.4", title: "ข้อความไม่ปิดเครื่องหมายคำพูด", level: "ประยุกต์", expect: "compile-error",
          concept: "String ต้องเปิดและปิดด้วย <code>\"</code> ในบรรทัดเดียวกัน",
          code: j`
            public class UnclosedString {
                public static void main(String[] args) {
                    System.out.println("Hello);
                }
            }`,
          steps: ["<code>unclosed string literal</code> → เปิด <code>\"</code> แล้วไม่ปิด", "compiler มองว่า <code>);</code> เป็นส่วนหนึ่งของข้อความ คำสั่งจึงไม่สมบูรณ์", "แก้เป็น <code>\"Hello\");</code>"] },
        { type: "table", title: "สรุป error ที่พบบ่อยในบทนี้", head: ["ข้อความ error", "สาเหตุที่เป็นไปได้", "วิธีแก้"], rows: [
          ["<code>';' expected</code>", "ลืม semicolon", "เติม ; ท้ายคำสั่ง"],
          ["<code>cannot find symbol</code>", "สะกดชื่อผิด/ตัวพิมพ์ผิด", "ตรวจตัวสะกด เช่น println, System"],
          ["<code>reached end of file while parsing</code>", "ขาด <code>}</code>", "นับคู่วงเล็บ จัด indent"],
          ["<code>unclosed string literal</code>", "ไม่ปิด <code>\"</code>", "ปิดเครื่องหมายคำพูด"],
          ["<code>class X is public, should be declared in a file named X.java</code>", "ชื่อไฟล์ไม่ตรงชื่อคลาส", "เปลี่ยนชื่อไฟล์หรือชื่อคลาสให้ตรงกัน"],
        ] },
        { type: "check", title: "หา error", html: pre(`
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
                System.out.println("Computer Programming 1");
                System.out.println("Mali Jaidee");
                System.out.println("Ready to learn Java");
            }
        }` },
    { level: 1, title: "print ต่อบรรทัด", html: `<p>ใช้ <code>System.out.print</code> อย่างน้อย 3 คำสั่งเพื่อพิมพ์คำว่า <code>I</code>, <code>love</code>, <code>Java</code> ให้อยู่ในบรรทัดเดียวกันโดยมีช่องว่างคั่น แล้วใช้ println พิมพ์ <code>Done</code> ในบรรทัดถัดไป</p>`,
      spec: ["ห้ามเขียนทั้งประโยคในคำสั่งเดียว", "ระวังช่องว่างระหว่างคำ", "ต้องขึ้นบรรทัดใหม่ก่อนพิมพ์ Done"],
      solution: j`
        public class PrintSameLine {
            public static void main(String[] args) {
                System.out.print("I ");
                System.out.print("love ");
                System.out.print("Java");
                System.out.println();
                System.out.println("Done");
            }
        }`, explain: "<code>println()</code> เปล่า ๆ ทำหน้าที่ขึ้นบรรทัดใหม่หลังจาก print ชุดแรก" },
    { level: 2, title: "หาข้อผิดพลาดและแก้ไข", html: `<p>โค้ดต่อไปนี้คอมไพล์ไม่ผ่าน มี<strong>ข้อผิดพลาด 3 จุด</strong> ให้ระบุว่าแต่ละจุดผิดอย่างไร javac จะแจ้งว่าอย่างไร แล้วเขียนโค้ดที่ถูกต้อง</p>` + pre(`
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
                System.out.println("Teacher said \"Practice every day\"");
                System.out.println("File: C:\\java\\Hello.java");
                System.out.println("Line A\nLine B");
            }
        }` },
    { level: 2, title: "ตารางเวลาเรียนด้วย \\t", html: `<p>แสดงตารางเรียน 3 วิชา โดยใช้ <code>\\t</code> จัดคอลัมน์ให้ตรงกัน มีหัวตาราง และเส้นคั่นด้วยเครื่องหมาย <code>-</code></p>`,
      spec: ["หัวตารางมี 3 คอลัมน์: Day, Time, Subject", "มีเส้นคั่นใต้หัวตาราง", "ข้อมูล 3 แถวตามตัวอย่าง (เปลี่ยนวิชาเป็นของตนเองได้)"],
      solution: j`
        public class Timetable {
            public static void main(String[] args) {
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
                System.out.println("Pen\t\t15");
                System.out.println("Notebook\t35");
                System.out.println("---------------------");
                System.out.println("Total\t\t50");
                System.out.println("=====================");
                System.out.println();
                System.out.println("Thank you!");
            }
        }`, explain: "<code>Pen</code> สั้นกว่า <code>Notebook</code> จึงใช้ <code>\\t\\t</code> เพื่อให้ราคาอยู่คอลัมน์เดียวกัน" },
    { level: 3, title: "วาดรูปด้วยตัวอักษร", html: `<p>ใช้ println แสดงรูปบ้านด้วยตัวอักษรตามตัวอย่าง รูปมีหลังคา (<code>/</code> และ <code>\\</code>) ผนัง และประตู</p>`,
      spec: ["ต้องแสดง backslash ให้ถูกต้อง (ใช้ <code>\\\\</code>)", "จัดช่องว่างนำหน้าให้รูปสมมาตร", "อธิบายว่าทำไมบรรทัดหลังคาในโค้ดดูยาวกว่าผลลัพธ์"],
      solution: j`
        public class AsciiHouse {
            public static void main(String[] args) {
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
                System.out.println("| Mali Jaidee                  |");
                System.out.println("| Junior Java Developer        |");
                System.out.println("| mali@example.com             |");
                System.out.println("|                              |");
                System.out.println("| \"Code a little every day.\"   |");
                System.out.println("+------------------------------+");
            }
        }`, explain: "บรรทัดคำคมในโค้ดมี <code>\\\"</code> 2 ที่ ดูยาวกว่าบรรทัดอื่น 2 ตัวอักษร แต่ผลลัพธ์กว้างเท่ากัน" },
    { level: 3, title: "แก้โปรแกรมที่มีหลาย error", html: `<p>โค้ดนี้บันทึกในไฟล์ <code>Report.java</code> แต่มีข้อผิดพลาด<strong>อย่างน้อย 4 จุด</strong> ให้คอมไพล์ อ่าน error ทีละตัว แก้ทีละจุดจนรันได้ผลตามตัวอย่าง และบันทึกว่าแก้อะไรตามลำดับ</p>` + pre(`
        public class report {
            public static void main(String[] args) {
                System.out.println("Student Report")
                System.out.println("Name:\tMali");
                System.out.printline("Score:\t85");
                System.out.println("Status: "Pass"");
        }`),
      spec: ["เริ่มแก้จาก error แรกที่ javac รายงาน แล้วคอมไพล์ใหม่ทุกครั้ง", "ผลลัพธ์บรรทัดสุดท้ายต้องมีเครื่องหมายคำพูดรอบคำว่า Pass", "เขียนสรุปว่าแต่ละ error มีข้อความว่าอะไร"],
      solution: j`
        public class Report {
            public static void main(String[] args) {
                System.out.println("Student Report");
                System.out.println("Name:\tMali");
                System.out.println("Score:\t85");
                System.out.println("Status: \"Pass\"");
            }
        }`, explain: "จุดที่แก้: (1) ชื่อคลาส <code>report</code> → <code>Report</code> ให้ตรงชื่อไฟล์ (2) เติม <code>;</code> บรรทัด 3 (3) <code>printline</code> → <code>println</code> (4) ใช้ <code>\\\"</code> รอบ Pass (5) เติม <code>}</code> ปิดคลาส" },
  ],
};
