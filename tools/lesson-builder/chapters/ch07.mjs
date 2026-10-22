import { j, c, pre, jpre, fpre } from "../lib.mjs";

export default {
  num: 7, file: "chapter-07.html",
  pageTitle: "บทที่ 7: เมธอดและการแบ่งโปรแกรม", shortName: "บทที่ 7",
  tocLabel: "บทที่ 7 · แบ่งโปรแกรมเป็นส่วน", sidebarBottom: "หนึ่งเมธอด หนึ่งหน้าที่ที่อธิบายได้",
  kicker: "บทที่ 7 · จัดกลุ่มคำสั่งให้เรียกใช้ซ้ำ", h1: "เมธอด: แบ่งโปรแกรมเป็นส่วน",
  lead: "เมธอดช่วยตั้งชื่อให้การทำงานหนึ่งอย่าง เรียกใช้ซ้ำได้ และทำให้ main ไม่ต้องรับผิดชอบทุกขั้นตอนเอง",
  goals: ["ประกาศและเรียกใช้ static method", "ส่งข้อมูลผ่าน parameter", "คืนผลลัพธ์ด้วย return", "อธิบายขอบเขตของตัวแปรและการ overload"],
  prev: { href: "chapter-06.html", label: "← บทที่ 6" },
  next: { href: "chapter-08.html", label: "บทที่ 8: อาเรย์ →" },
  footer: "บทที่ 7 · ให้แต่ละเมธอดทำงานที่อธิบายได้ด้วยประโยคสั้น ๆ",
  introHeading: "7. ย้ายงานย่อยไปไว้ในเมธอด",
  introHtml: `<p><strong>เมธอด (method)</strong> คือชุดคำสั่งที่ตั้งชื่อไว้เพื่อทำงานหนึ่งอย่าง เช่น คำนวณราคา หรือพิมพ์ใบเสร็จ เมื่อโปรแกรมยาวขึ้น เราแยกงานเป็นเมธอดเล็ก ๆ เพื่อให้อ่านง่าย เรียกซ้ำได้ และตรวจข้อผิดพลาดทีละส่วนได้ จริง ๆ แล้วเราใช้เมธอดมาตั้งแต่บทแรก: <code>main</code>, <code>println</code>, <code>nextInt</code>, <code>Math.sqrt</code> ล้วนเป็นเมธอด บทนี้จะเขียนเมธอดของเราเอง</p>`,
  topics: [
    {
      num: "7.1", toc: "ประกาศและเรียกเมธอด", title: "ประกาศและเรียกใช้เมธอด",
      blocks: [
        { type: "p", html: `เมธอดคือชุดคำสั่งที่ตั้งชื่อไว้ทำงานหนึ่งอย่าง ประกาศ<strong>ในคลาส แต่นอกเมธอดอื่น</strong> (ไม่ซ้อนใน main) แล้วเรียกด้วยชื่อตามด้วย <code>()</code> กี่ครั้งก็ได้` },
        { type: "table", head: ["ส่วน", "ความหมาย"], rows: [
          ["<code>static</code>", "เรียกได้โดยไม่ต้องสร้าง object (ความหมายเต็มอยู่ในบทที่ 11–12)"],
          ["<code>void</code>", "ชนิดผลลัพธ์: ไม่ส่งค่ากลับ"],
          ["<code>printWelcome</code>", "ชื่อเมธอด lowerCamelCase ขึ้นต้นด้วยคำกริยา"],
          ["<code>( )</code>", "parameter (ตอนนี้ยังว่าง)"],
          ["<code>{ ... }</code>", "body: คำสั่งที่ทำเมื่อถูกเรียก"],
        ] },
        { type: "run", title: "แยกการแสดงข้อความออกจาก main",
          code: j`
            public class Welcome {
                public static void main(String[] args) {
                    printWelcome();                           // กระโดดไปทำ แล้วกลับมาบรรทัดถัดไป
                    System.out.println("(main continues)");
                    printWelcome();                           // เรียกซ้ำได้
                }

                static void printWelcome() {
                    System.out.println("Welcome to Java");
                }
            }`,
          },
        { type: "h", text: "เมธอดเรียกเมธอดอื่นต่อได้" },
        { type: "p", html: `โปรแกรมจำไว้เสมอว่าต้องกลับไปที่ใด เมื่อเมธอดทำงานจบจะกลับไปทำต่อที่บรรทัดถัดจากจุดที่เรียก` },
        { type: "run", title: "ไล่ลำดับการเรียก",
          code: j`
            public class CallChain {
                public static void main(String[] args) {
                    System.out.println("main: start");      // 1
                    printHeader();                          // 2 → ไปที่ printHeader
                    System.out.println("main: end");        // 6
                }

                static void printHeader() {
                    printLine();                            // 3 → ไปที่ printLine
                    System.out.println("  REPORT");         // 4
                    printLine();                            // 5
                }

                static void printLine() {
                    System.out.println("==========");
                }
            }`,
          },
        { type: "tip", html: `main ที่ดีอ่านเหมือนสารบัญ: แต่ละบรรทัดบอกว่าทำอะไร ส่วนรายละเอียดอยู่ในเมธอด ถ้าต้องแก้เมนูก็แก้เฉพาะเมธอดเมนู` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: แบ่ง main เป็นขั้นตอนที่มีชื่อ", blocks: [
          { type: "run", title: "เมนูร้านกาแฟ 3 ส่วน",
            code: j`
              public class ShopSteps {
                  public static void main(String[] args) {
                      showBanner();
                      showMenu();
                      showFooter();
                  }

                  static void showBanner() {
                      System.out.println("*** JAVA CAFE ***");
                  }

                  static void showMenu() {
                      System.out.println("1. Espresso   45");
                      System.out.println("2. Latte      55");
                      System.out.println("3. Mocha      60");
                  }

                  static void showFooter() {
                      System.out.println("Open 8:00-18:00");
                  }
              }`,
            },
        ] },
        { type: "practice", level: 2, title: "ใบเสร็จร้านมินิมาร์ท (เมธอดเรียกเมธอดซ้ำ)",
          html: `<p>รวมแนวคิดจากตัวอย่าง 7.1.2 (เมธอดเรียกเมธอดอื่นต่อ) และ 7.1.3 (แบ่ง main เป็นขั้นตอน) เข้าด้วยกัน: เขียนโปรแกรมพิมพ์ใบเสร็จร้านค้าที่ main เรียก 4 เมธอดตามลำดับคือ <code>printHeader()</code>, <code>printItems()</code>, <code>printTotal()</code>, <code>printFooter()</code> โดยให้ <code>printHeader()</code>, <code>printTotal()</code> และ <code>printFooter()</code> <strong>เรียกเมธอด <code>printDivider()</code> ซ้ำ</strong> เพื่อพิมพ์เส้นคั่น แทนการพิมพ์เส้นคั่นเองทุกครั้ง</p>`,
          spec: ["ทุกเมธอดเป็น static void ไม่มี parameter (เรายังไม่เรียนเรื่อง parameter ในหัวข้อนี้)", "printDivider() พิมพ์เส้นคั่นหนึ่งบรรทัด แล้วให้เมธอดอื่นเรียกใช้ซ้ำอย่างน้อย 3 ครั้งรวมกัน", "printItems() พิมพ์รายการสินค้า 3 บรรทัด", "printTotal() พิมพ์ยอดรวมของสินค้าทั้ง 3 รายการ"],
          solution: j`
            public class MiniMartReceipt {
                public static void main(String[] args) {
                    printHeader();  // main เรียกเมธอดตามลำดับของใบเสร็จ
                    printItems();
                    printTotal();
                    printFooter();
                }

                static void printDivider() {  // เมธอดเส้นคั่น ใช้ซ้ำหลายที่
                    System.out.println("------------------------");
                }

                static void printHeader() {
                    printDivider();  // เมธอดเรียกเมธอดอื่นได้
                    System.out.println("     MINI MART");
                    printDivider();
                }

                static void printItems() {
                    System.out.println("Milk          35");
                    System.out.println("Bread         28");
                    System.out.println("Eggs          92");
                }

                static void printTotal() {  // ยอดรวมมีเส้นคั่นด้านบน
                    printDivider();
                    System.out.println("TOTAL        155");
                }

                static void printFooter() {
                    System.out.println("Thank you!");
                    printDivider();
                }
            }`,
          explain: "ข้อนี้ไม่มี parameter เลย เพราะหัวข้อ 7.1 ยังไม่สอนเรื่องนี้ — จุดที่ยากกว่าตัวอย่างคือต้องวางแผนว่าเมธอดไหน <em>ควรเรียก</em> printDivider() บ้าง แทนที่จะ copy โค้ดเส้นคั่นซ้ำ ๆ" },
        { type: "warn", title: "void ไม่ได้แปลว่าไม่มี output", html: `เมธอด void พิมพ์ข้อความได้ตามปกติ “void” หมายถึงไม่<strong>ส่งค่ากลับ</strong>ให้ผู้เรียกนำไปใช้ต่อ การแสดงผล (print) กับการคืนค่า (return) เป็นคนละเรื่อง จะเห็นชัดในหัวข้อ 7.3` },
        { type: "check", title: "ลำดับการเรียก", html: jpre(`
          static void a() { System.out.print("A"); b(); System.out.print("a"); }
          static void b() { System.out.print("B"); }
          // ใน main:
          a(); b();`), answer: `<p><strong>ABaB</strong> — a พิมพ์ A, เรียก b พิมพ์ B, กลับมาพิมพ์ a, แล้ว main เรียก b อีกครั้งพิมพ์ B</p>` },
      ],
    },
    {
      num: "7.2", toc: "พารามิเตอร์และ argument", title: "พารามิเตอร์และ argument",
      blocks: [
        { type: "p", html: `<strong>parameter</strong> คือตัวแปรในวงเล็บของเมธอดที่รอรับค่า ส่วน <strong>argument</strong> คือค่าจริงที่ส่งเข้าไปตอนเรียก Java คัดลอก argument ไปใส่ parameter <em>ตามลำดับตำแหน่ง</em>` },
        { type: "html", html: jpre(`
          static void greet(String name, int times) { ... }   // name, times = parameter
          greet("JHope", 3);                                  // "JHope", 3   = argument
                  │      └──→ times = 3
                  └──────────→ name  = "JHope"`) },
        { type: "run", title: "เมธอดเดียว ใช้กับข้อมูลต่างกัน",
          code: j`
            public class GreetParam {
                public static void main(String[] args) {
                    greet("JHope");                  // Hello, JHope!
                    greet("Suga");                   // Hello, Suga!
                    String friend = "RM";
                    greet(friend);                   // ส่งค่าในตัวแปรก็ได้
                }

                static void greet(String name) {     // name รับค่าที่ส่งมา
                    System.out.println("Hello, " + name + "!");
                }
            }`,
          },
        { type: "h", text: "หลาย parameter" },
        { type: "p", html: `จำนวน ชนิด และลำดับของ argument ต้องตรงกับ parameter และ argument เป็นนิพจน์ได้ ซึ่งจะคำนวณก่อนส่ง` },
        { type: "run", title: "วาดเส้นด้วยอักขระและความยาวที่กำหนด",
          code: j`
            public class DrawLine {
                public static void main(String[] args) {
                    drawLine('*', 10);               // **********
                    drawLine('-', 4);                // ----
                    drawLine('=', 2 * 6);            // 12 ตัว  (คำนวณ 2 * 6 ก่อนส่ง)
                }

                static void drawLine(char symbol, int length) {
                    for (int i = 0; i < length; i++) {
                        System.out.print(symbol);
                    }
                    System.out.println();
                }
            }`,
          },
        { type: "practice", level: 1, title: "printRepeat(String text, int times)",
          html: `<p>เขียนเมธอด <code>printRepeat(String text, int times)</code> ที่พิมพ์ <code>text</code> ซ้ำกัน <code>times</code> ครั้งติดกันบนบรรทัดเดียว (ไม่มีช่องว่างคั่น) แล้วขึ้นบรรทัดใหม่ เหมือนตัวอย่าง 7.2.2 แต่เปลี่ยนจาก <code>char</code> เป็น <code>String</code></p>`,
          spec: ["parameter <code>text</code> (String) คือข้อความที่จะพิมพ์ซ้ำ, <code>times</code> (int) คือจำนวนครั้ง", "ต้องใช้ for loop พิมพ์ทีละครั้ง <strong>ห้ามใช้ <code>text.repeat(times)</code></strong> เพื่อฝึกเขียนลูปในเมธอดเอง", "main เรียก printRepeat(\"Hi\", 3), printRepeat(\"ab\", 5), printRepeat(\"=\", 10)"],
          solution: j`
            public class RepeatText {
                public static void main(String[] args) {
                    // ส่งข้อความและจำนวนครั้งเป็น argument
                    printRepeat("Hi", 3);
                    printRepeat("ab", 5);
                    printRepeat("=", 10);
                }

                // parameter 2 ตัว: ข้อความกับจำนวนครั้ง
                static void printRepeat(String text, int times) {
                    for (int i = 0; i < times; i++) {
                        // print ต่อกันในบรรทัดเดียว
                        System.out.print(text);
                    }
                    System.out.println();  // จบแล้วขึ้นบรรทัดใหม่
                }
            }` },
        { type: "practice", level: 1, title: "printCountdown(int from)",
          html: `<p>เขียนเมธอด <code>printCountdown(int from)</code> ที่พิมพ์ตัวเลขนับถอยหลังจาก <code>from</code> ลงมาถึง 1 คั่นด้วยช่องว่าง แล้วต่อท้ายด้วย <code>Go!</code> บนบรรทัดเดียวกัน</p>`,
          spec: ["parameter เดียว: <code>from</code> (int) คือเลขเริ่มนับถอยหลัง", "ลูปต้องเดิน<strong>ลดค่าลง</strong> (ตรงข้ามกับตัวอย่าง 7.2.2 ที่เพิ่มค่าขึ้น)", "main เรียก printCountdown(5), printCountdown(3), printCountdown(1)"],
          solution: j`
            public class Countdown {
                public static void main(String[] args) {
                    printCountdown(5);  // เรียกเมธอดเดิมด้วยค่าต่างกัน
                    printCountdown(3);
                    printCountdown(1);
                }

                // from = เลขเริ่มนับถอยหลัง
                static void printCountdown(int from) {
                    for (int i = from; i >= 1; i--) {  // นับลงจนถึง 1
                        System.out.print(i + " ");
                    }
                    System.out.println("Go!");
                }
            }`,
          explain: "printCountdown(1) ต้องพิมพ์ \"1 Go!\" ได้โดยไม่ต้องแยกเขียนกรณีพิเศษ เพราะเงื่อนไข <code>i >= 1</code> ของ for ครอบคลุมอยู่แล้ว" },
        { type: "practice", level: 2, title: "drawTriangle(int style, int length)",
          html: `<p>เขียนเมธอด <code>drawTriangle(int style, int length)</code> วาดสามเหลี่ยมตัวเลขสูง <code>length</code> แถว แถวที่ <code>i</code> พิมพ์เลข <code>i</code> ซ้ำกัน <code>i</code> ตัว (แถว 1 → "1", แถว 2 → "22", แถว 3 → "333" ...) โดย <code>style</code> กำหนดการจัดแนว: <strong>1 = ชิดซ้าย</strong>, <strong>2 = ชิดขวา</strong> (เติมช่องว่างด้านหน้าให้ขอบขวาของทุกแถวตรงกัน)</p>`,
          spec: ["parameter <code>style</code>: 1 = ชิดซ้าย, 2 = ชิดขวา", "parameter <code>length</code>: จำนวนแถว (ใช้ค่าไม่เกิน 9 เพื่อให้ตัวเลขแต่ละแถวเป็นหลักเดียว)", "แถว i ใช้ <code>String.valueOf(i).repeat(i)</code> สร้างข้อความตัวเลขซ้ำ", "ถ้า style เป็น 2 ให้เติมช่องว่างนำหน้าแถว i จำนวน <code>length - i</code> ตัวก่อนพิมพ์ตัวเลข"],
          solution: j`
            public class TriangleDrawer {
                public static void main(String[] args) {
                    System.out.println("drawTriangle(1, 5):");
                    drawTriangle(1, 5);  // แบบที่ 1: ชิดซ้าย
                    System.out.println();
                    System.out.println("drawTriangle(2, 4):");
                    drawTriangle(2, 4);  // แบบที่ 2: ชิดขวา
                }

                // style เลือกรูปแบบ, length = จำนวนแถว
                static void drawTriangle(int style, int length) {
                    for (int i = 1; i <= length; i++) {
                        // เลข i ซ้ำ i ครั้ง
                        String digits = String.valueOf(i).repeat(i);
                        // แบบที่ 2 เติมช่องว่างด้านหน้า
                        if (style == 2) {
                            // ช่องว่างลดลงทีละแถว
                            System.out.print(" ".repeat(length - i));
                        }
                        System.out.println(digits);
                    }
                }
            }`,
          explain: "เพราะ <code>length - i</code> ลดลงทีละ 1 ขณะที่จำนวนหลักเพิ่มขึ้นทีละ 1 พอดี ขอบขวาของทุกแถวจึงตรงกันเสมอ (ช่องว่าง + ตัวเลข = length ทุกแถว)" },
        { type: "h", text: "pass-by-value: ส่งสำเนาของค่า" },
        { type: "p", html: `Java ส่ง<strong>สำเนาของค่า</strong>ให้ parameter การแก้ parameter ในเมธอดจึงไม่กระทบตัวแปรของผู้เรียก แม้ชื่อเหมือนกัน ถ้าต้องการผลลัพธ์กลับมาต้องใช้ return (หัวข้อถัดไป)` },
        { type: "run", title: "เมธอดแก้ค่าตัวแปรของ main ไม่ได้",
          code: j`
            public class PassByValue {
                public static void main(String[] args) {
                    int score = 50;
                    addBonus(score);                                   // ส่งสำเนาของ 50
                    System.out.println("main: score = " + score);      // ยังเป็น 50
                }

                static void addBonus(int score) {                      // คนละตัวกับ score ใน main
                    score = score + 10;
                    System.out.println("addBonus: score = " + score);  // 60
                }
            }`,
          },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อ argument ไม่ตรงกับ parameter", blocks: [
          { type: "run", label: "ทดลอง error 7.2.4", title: "argument ไม่ตรงกับ parameter", expect: "compile-error",
            code: j`
              public class WrongArguments {
                  public static void main(String[] args) {
                      drawLine(5, '*');
                      drawLine('*');
                  }

                  static void drawLine(char symbol, int length) {
                      System.out.println(String.valueOf(symbol).repeat(length));
                  }
              }`,
            after: "บรรทัด 3 สลับลำดับ ส่ง int ไปที่ parameter char และบรรทัด 4 ขาด argument ไปหนึ่งตัว ข้อความ <code>required: char,int</code> / <code>found: char</code> บอกว่าคาดหวังอะไรและได้อะไร แก้เป็น <code>drawLine('*', 5);</code>" },
        ] },
        { type: "check", title: "ส่งค่า", html: jpre(`
          static void show(int a, int b) { System.out.println(a + "-" + b); }
          // main
          int x = 3, y = 8;
          show(y, x);
          show(x + y, x * y);`), answer: `<p><strong>8-3</strong> และ <strong>11-24</strong> — ค่าจับคู่ตามตำแหน่ง ไม่ใช่ตามชื่อตัวแปร</p>` },
      ],
    },
    {
      num: "7.3", toc: "return value", title: "return value: เมธอดที่คืนผลลัพธ์",
      blocks: [
        { type: "p", html: `ถ้าเมธอดคำนวณค่าที่ผู้เรียกต้องใช้ต่อ ให้ระบุ<strong>ชนิดผลลัพธ์</strong>แทน void แล้วใช้ <code>return ค่า;</code> ส่งค่ากลับ เมื่อเจอ return เมธอดจบทันที การเรียกเมธอดจึงเหมือน “นิพจน์” ที่ถูกแทนด้วยค่าที่คืนมา` },
        { type: "run", title: "คืนค่าแล้วนำไปใช้ต่อ",
          code: j`
            public class SquareReturn {
                public static void main(String[] args) {
                    int a = square(4);                                       // 16
                    System.out.println("square(4) = " + a);
                    System.out.println("square(3) + square(4) = " + (square(3) + square(4)));   // 9 + 16 = 25
                    System.out.println("square(square(2)) = " + square(square(2)));            // square(4) = 16
                }

                static int square(int n) {        // int = ชนิดของค่าที่คืน
                    return n * n;
                }
            }`,
          },
        { type: "h", text: "print กับ return ต่างกันอย่างไร" },
        { type: "table", head: ["", "เมธอดที่ print", "เมธอดที่ return"], rows: [
          ["ใครได้ผลลัพธ์", "คนที่ดูหน้าจอ", "โปรแกรม (ผู้เรียก)"],
          ["นำไปคำนวณต่อได้ไหม", "ไม่ได้", "ได้"],
          ["ชนิดผลลัพธ์", "<code>void</code>", "<code>int</code>, <code>double</code>, ..."],
        ] },
        { type: "run", title: "ยอดรวมแล้วคิด VAT ต่อ",
          code: j`
            public class PrintVsReturn {
                public static void main(String[] args) {
                    printTotal(100, 3);                       // แสดง Total: 300.0 แต่ main ไม่ได้ค่า
                    double total = getTotal(100, 3);          // ได้ 300.0 กลับมา
                    double withVat = total * 1.07;            // นำไปคำนวณต่อได้
                    System.out.println("With VAT: " + withVat);
                }

                static void printTotal(double price, int qty) {
                    System.out.println("Total: " + price * qty);
                }

                static double getTotal(double price, int qty) {
                    return price * qty;
                }
            }`,
          },
        { type: "tip", html: `เมธอดที่คำนวณควร return ค่า แล้วให้ main เป็นผู้ตัดสินใจว่าจะแสดงผลอย่างไร เมธอดแบบนี้นำไปใช้ซ้ำและทดสอบได้ง่ายกว่า` },
        { type: "h", text: "return หลายจุด" },
        { type: "p", html: `เมธอดมี return ได้หลายจุดตามเงื่อนไข แต่<strong>ทุกเส้นทาง</strong>ต้องคืนค่า เมธอดที่คืน boolean นิยมตั้งชื่อขึ้นต้นด้วย is / has / can` },
        { type: "run", title: "ตัดเกรด และตรวจจำนวนเฉพาะ",
          code: j`
            public class ReturnPaths {
                public static void main(String[] args) {
                    System.out.println(gradeOf(85) + " " + gradeOf(72) + " " + gradeOf(40));   // A B F
                    for (int n = 1; n <= 20; n++) {
                        if (isPrime(n)) {
                            System.out.print(n + " ");
                        }
                    }
                    System.out.println();
                }

                static char gradeOf(int score) {
                    if (score >= 80) return 'A';          // return แล้วจบเมธอดทันที ไม่ต้องมี else
                    if (score >= 70) return 'B';
                    if (score >= 60) return 'C';
                    return 'F';
                }

                static boolean isPrime(int n) {
                    if (n < 2) return false;
                    for (int d = 2; d * d <= n; d++) {
                        if (n % d == 0) return false;     // เจอตัวหาร → ตอบได้ทันที
                    }
                    return true;                          // วนครบไม่เจอตัวหาร
                }
            }`,
          },
        { type: "practice", level: 2, title: "isLeapYear(int year) และนับปีอธิกสุรทิน",
          html: `<p>เขียนเมธอด <code>boolean isLeapYear(int year)</code> ตรวจว่าปี ค.ศ. ที่รับมาเป็นปีอธิกสุรทินหรือไม่ (หารด้วย 4 ลงตัว <strong>และ</strong> ถ้าหารด้วย 100 ลงตัวต้องหารด้วย 400 ลงตัวด้วย) แล้วใน main ใช้เมธอดนี้ในลูปเพื่อแสดงรายการปีอธิกสุรทินช่วง 2000–2026 พร้อมนับจำนวน เหมือนวิธีที่ตัวอย่าง 7.3.3 ใช้ <code>isPrime</code> ในลูป</p>`,
          spec: ["parameter เดียว: <code>year</code> (int) คือปี ค.ศ. ที่ต้องตรวจ", "isLeapYear ต้องมี return มากกว่า 1 จุดเหมือนตัวอย่าง (ไม่ใช้ else)", "main ห้ามเขียนเงื่อนไขปีอธิกสุรทินเอง ต้องเรียก isLeapYear เท่านั้น", "แสดงปีที่เป็นอธิกสุรทินทั้งหมดในบรรทัดเดียว คั่นด้วยช่องว่าง แล้วแสดงจำนวนรวม"],
          solution: j`
            public class LeapYearCheck {
                public static void main(String[] args) {
                    int count = 0;
                    System.out.print("Leap years: ");
                    for (int year = 2000; year <= 2026; year++) {
                        // ใช้เมธอดที่คืน boolean เป็นเงื่อนไข
                        if (isLeapYear(year)) {
                            System.out.print(year + " ");
                            count++;
                        }
                    }
                    System.out.println();
                    System.out.println("Count: " + count);
                }

                static boolean isLeapYear(int year) {
                    // หาร 4 ไม่ลงตัว → ไม่ใช่
                    if (year % 4 != 0) return false;
                    // หาร 100 ลงตัวแต่ 400 ไม่ลงตัว → ไม่ใช่
                    if (year % 100 == 0 && year % 400 != 0) return false;
                    // ผ่านทุกเงื่อนไข → เป็นปีอธิกสุรทิน
                    return true;
                }
            }`,
          explain: "จุดที่ยากกว่าตัวอย่าง: isPrime มีเงื่อนไขเดียวในลูป แต่ isLeapYear ต้องรวมสองเงื่อนไข (หาร 4 และข้อยกเว้นของหาร 100/400) ให้ครบในลำดับที่ return ค่าถูกทุกกรณี" },
        { type: "warn", title: "ทุกเส้นทางต้อง return", html: `ถ้ามีกรณีที่เมธอดจบโดยไม่ return ค่า เช่น if-else if ที่ไม่ครอบคลุม n == 0 compiler จะแจ้ง <code>missing return statement</code> แก้โดยเพิ่ม return ท้ายเมธอด` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อบางเส้นทางไม่มี return", blocks: [
          { type: "run", label: "ทดลอง error 7.3.4", title: "บางเส้นทางไม่มี return", expect: "compile-error",
            code: j`
              public class MissingReturn {
                  public static void main(String[] args) {
                      System.out.println(sign(5));
                  }

                  static String sign(int n) {
                      if (n > 0) {
                          return "positive";
                      } else if (n < 0) {
                          return "negative";
                      }
                  }
              }`,
            },
        ] },
        { type: "check", title: "ค่าที่คืน", html: jpre(`
          static int f(int x) {
              if (x % 2 == 0) return x / 2;
              return 3 * x + 1;
          }
          // f(6), f(7), f(f(5))`), answer: `<p>f(6) = 3, f(7) = 22, f(5) = 16 → f(16) = <strong>8</strong></p>` },
      ],
    },
    {
      num: "7.4", toc: "scope และ overload", title: "scope ของตัวแปร และ method overloading",
      blocks: [
        { type: "p", html: `<strong>scope</strong> คือบริเวณที่ตัวแปรใช้งานได้ ตัวแปรที่ประกาศในบล็อก <code>{ }</code> ใดใช้ได้เฉพาะในบล็อกนั้น (local variable) parameter ก็เป็น local ของเมธอดนั้น` },
        { type: "run", title: "ตัวแปรชื่อเดียวกันในคนละเมธอด",
          code: j`
            public class ScopeDemo {
                public static void main(String[] args) {
                    int count = 1;                                  // count ของ main
                    helper();
                    System.out.println("main count = " + count);    // 1   helper แตะไม่ได้
                }

                static void helper() {
                    int count = 99;                                 // คนละตัวกับของ main
                    System.out.println("helper count = " + count);
                }
            }`,
          },
        { type: "warn", title: "ตัวแปรหายเมื่อออกจากบล็อก", html: `ตัวแปรที่ประกาศใน for (รวมถึง <code>int i</code> ใน header) หรือใน if ใช้หลังบล็อกไม่ได้ จะได้ <code>cannot find symbol</code> ถ้าต้องใช้หลังลูปให้ประกาศไว้ก่อนลูป` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อใช้ตัวแปรนอก scope", blocks: [
          { type: "run", label: "ทดลอง error 7.4.2", title: "ใช้ตัวแปรนอก scope", expect: "compile-error",
            code: j`
              public class OutOfScope {
                  public static void main(String[] args) {
                      for (int i = 0; i < 3; i++) {
                          int doubled = i * 2;
                      }
                      System.out.println(i);
                      System.out.println(doubled);
                  }
              }`,
            },
        ] },
        { type: "h", text: "overloading: ชื่อเดียว หลายรูปแบบ" },
        { type: "p", html: `หลายเมธอดชื่อเดียวกันได้ถ้า parameter ต่างกัน compiler เลือกตัวที่<strong>จำนวนและชนิด</strong>ของ argument ตรงกัน แบบเดียวกับ <code>println</code> ที่รับได้ทั้ง int, double และ String (ชนิดผลลัพธ์ต่างกันอย่างเดียวไม่นับ)` },
        { type: "run", title: "max และ area หลายแบบ",
          code: j`
            public class OverloadDemo {
                public static void main(String[] args) {
                    System.out.println(max(3, 9));          // 9      max(int, int)
                    System.out.println(max(2.5, 1.75));     // 2.5    max(double, double)
                    System.out.println(max(4, 11, 7));      // 11     max(int, int, int)
                    System.out.println(area(5));            // 25.0   สี่เหลี่ยมจัตุรัส
                    System.out.println(area(4, 6));         // 24.0   สี่เหลี่ยมผืนผ้า
                }

                static int max(int a, int b) {
                    return a > b ? a : b;
                }

                static double max(double a, double b) {
                    return a > b ? a : b;
                }

                static int max(int a, int b, int c) {
                    return max(max(a, b), c);               // ใช้เวอร์ชัน 2 ตัวซ้อนกัน
                }

                static double area(double side) {
                    return side * side;
                }

                static double area(double width, double height) {
                    return width * height;
                }
            }`,
          },
        { type: "practice", level: 2, title: "overload เมธอด volumeOf",
          html: `<p>เขียนเมธอดชื่อ <code>volumeOf</code> สามแบบ (overload) เหมือนแนวคิดในตัวอย่าง 7.4.3 แต่คำนวณปริมาตรแทนพื้นที่: <code>volumeOf(double side)</code> ปริมาตรลูกบาศก์, <code>volumeOf(double radius, double height)</code> ปริมาตรทรงกระบอก และ <code>volumeOf(double length, double width, double height)</code> ปริมาตรกล่องสี่เหลี่ยม</p>`,
          spec: ["ทุกเวอร์ชัน return double", "ทรงกระบอกใช้ <code>Math.PI * radius * radius * height</code>", "เรียกทั้งสามแบบจาก main ด้วย volumeOf(3), volumeOf(2, 5), volumeOf(2, 3, 4) แสดงผลทศนิยม 2 ตำแหน่ง", "อธิบายในคำตอบว่า compiler แยกแต่ละเวอร์ชันได้อย่างไรทั้งที่ชื่อเดียวกัน"],
          solution: j`
            public class VolumeOverload {
                public static void main(String[] args) {
                    // 1 argument → ลูกบาศก์
                    System.out.printf("Cube side=3       : %.2f%n", volumeOf(3));
                    // 2 argument → ทรงกระบอก
                    System.out.printf("Cylinder r=2,h=5  : %.2f%n", volumeOf(2, 5));
                    // 3 argument → กล่อง
                    System.out.printf("Box 2x3x4         : %.2f%n", volumeOf(2, 3, 4));
                }

                // ชื่อเดียวกัน ต่างกันที่จำนวน parameter
                static double volumeOf(double side) {
                    return side * side * side;
                }

                // πr²h
                static double volumeOf(double radius, double height) {
                    return Math.PI * radius * radius * height;
                }

                static double volumeOf(double length, double width, double height) {
                    return length * width * height;
                }
            }`,
          explain: "ยากกว่าตัวอย่าง area ตรงที่ volumeOf(double, double) ของทรงกระบอกใช้สูตรที่ซับซ้อนกว่า และต้องระวังไม่ให้สลับลำดับ parameter กับเวอร์ชัน 3 ตัว" },
        { type: "check", title: "scope", html: jpre(`
          int total = 0;
          for (int i = 1; i <= 3; i++) {
              int temp = i * 10;
              total += temp;
          }
          // บรรทัดนี้ใช้ตัวแปรใดได้บ้าง: total, i, temp ?`), answer: `<p>ใช้ได้เฉพาะ <strong>total</strong> (มีค่า 60) ส่วน i และ temp หมด scope เมื่อออกจากลูป</p>` },
      ],
    },
    {
      num: "7.5", toc: "ประกอบโปรแกรมจากเมธอด", title: "ประกอบโปรแกรมจากเมธอด",
      blocks: [
        { type: "p", html: `ออกแบบจากบนลงล่าง (top-down): เขียนงานเป็นข้อ ๆ ภาษาคน แต่ละข้อที่ทำงานเดียวกลายเป็นเมธอดหนึ่งตัว แล้วกำหนดว่าเมธอดต้องรู้อะไร (parameter) และให้อะไรกลับ (return type) สุดท้าย main เรียกตามลำดับเหมือนสารบัญ` },
        { type: "run", title: "รายงานเกรดจากเมธอดหลายตัว", stdin: "JHope\n32 24 27",
          code: j`
            import java.util.Scanner;

            public class GradeReport {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Name: ");
                    String name = input.nextLine();
                    System.out.print("Work Mid Final: ");
                    double work = input.nextDouble();
                    double mid = input.nextDouble();
                    double fin = input.nextDouble();

                    double total = totalScore(work, mid, fin);   // รวม → 83.0
                    char grade = gradeOf(total);                 // ตัดเกรด → A
                    printReport(name, total, grade);             // แสดงผล
                }

                static double totalScore(double work, double mid, double fin) {
                    return work + mid + fin;
                }

                static char gradeOf(double total) {
                    if (total >= 80) return 'A';
                    if (total >= 70) return 'B';
                    if (total >= 60) return 'C';
                    if (total >= 50) return 'D';
                    return 'F';
                }

                static void printReport(String name, double total, char grade) {   // void: หน้าที่คือแสดงผล
                    System.out.println("-".repeat(24));
                    System.out.printf("%-8s %s%n", "Name", name);
                    System.out.printf("%-8s %.1f%n", "Total", total);
                    System.out.printf("%-8s %c%n", "Grade", grade);
                    System.out.printf("%-8s %s%n", "Result", grade == 'F' ? "Fail" : "Pass");
                    System.out.println("-".repeat(24));
                }
            }`,
          },
        { type: "h", text: "ทดสอบเมธอดด้วยค่าที่รู้คำตอบ" },
        { type: "p", html: `เมื่อเมธอด return ค่า เราเขียนโค้ดทดสอบได้: เรียกด้วย input ที่รู้คำตอบแล้วเทียบผล ควรทดสอบค่าขอบ เช่น 80 และ 79.9 ด้วย` },
        { type: "run", title: "ชุดทดสอบ gradeOf",
          code: j`
            public class TestGradeOf {
                public static void main(String[] args) {
                    check(95, 'A');
                    check(80, 'A');                       // ค่าขอบ
                    check(79.9, 'B');                     // ค่าขอบ
                    check(60, 'C');
                    check(49, 'F');
                }

                static void check(double score, char expected) {
                    char actual = gradeOf(score);
                    String status = actual == expected ? "PASS" : "FAIL";
                    System.out.printf("%-4s gradeOf(%.1f) = %c (expected %c)%n", status, score, actual, expected);
                }

                static char gradeOf(double total) {
                    if (total >= 80) return 'A';
                    if (total >= 70) return 'B';
                    if (total >= 60) return 'C';
                    if (total >= 50) return 'D';
                    return 'F';
                }
            }`,
          },
        { type: "practice", level: 3, title: "เครื่องคำนวณ BMI พร้อมชุดทดสอบ",
          html: `<p>รวมทุกแนวคิดของบทนี้: เขียนเมธอด <code>bmiOf(double weightKg, double heightM)</code> คืนค่าดัชนีมวลกาย (BMI = น้ำหนัก ÷ ส่วนสูง²) และ <code>categoryOf(double bmi)</code> คืนประเภทเป็น String (<code>"Underweight"</code> ถ้า BMI &lt; 18.5, <code>"Normal"</code> ถ้า &lt; 25, <code>"Overweight"</code> ถ้า &lt; 30, มิฉะนั้น <code>"Obese"</code>) จากนั้นเขียนเมธอด <code>check(double weight, double height, String expected)</code> ที่เรียกทั้งสองเมธอดต่อกันแล้วเทียบผลกับคำตอบที่คาด แบบเดียวกับตัวอย่าง 7.5.2 (เกณฑ์ตามมาตรฐาน WHO ใช้เพื่อฝึกเขียนโปรแกรมเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์)</p>`,
          spec: ["bmiOf และ categoryOf ต้อง return ค่า ห้ามพิมพ์เอง", "check() เป็น void เรียก bmiOf แล้วส่งผลต่อให้ categoryOf (เมธอดเรียกเมธอด ต่อด้วยอีกเมธอด)", "main เรียก check 4 ครั้งด้วยส่วนสูงคงที่ 1.70 แล้วไล่น้ำหนักให้ครอบคลุมทั้ง 4 ประเภท เพื่อทดสอบค่าขอบเขตเหมือนตัวอย่าง 7.5.2"],
          solution: j`
            public class BmiCalculator {
                public static void main(String[] args) {
                    check(50, 1.70, "Underweight");  // ทดสอบทุกกลุ่ม
                    check(65, 1.70, "Normal");
                    check(85, 1.70, "Overweight");
                    check(100, 1.70, "Obese");
                }

                // คำนวณอย่างเดียว คืนค่า BMI
                static double bmiOf(double weightKg, double heightM) {
                    return weightKg / (heightM * heightM);
                }

                // แปลงค่า BMI เป็นชื่อกลุ่ม
                static String categoryOf(double bmi) {
                    // return แล้วจบเมธอดทันที
                    if (bmi < 18.5) return "Underweight";
                    if (bmi < 25) return "Normal";
                    if (bmi < 30) return "Overweight";
                    return "Obese";
                }

                // ตัวช่วยทดสอบ: เทียบผลจริงกับที่คาด
                static void check(double weight, double height, String expected) {
                    double bmi = bmiOf(weight, height);
                    String actual = categoryOf(bmi);
                    // ตรงกัน → PASS
                    String status = actual.equals(expected) ? "PASS" : "FAIL";
                    System.out.printf("%-4s weight=%.1f height=%.2f -> BMI=%.1f (%s, expected %s)%n", status, weight, height, bmi, actual, expected);
                }
            }`,
          explain: "ยากกว่า TestGradeOf เพราะ check() ต้องประสานสองเมธอดที่ return คนละชนิด (double แล้วต่อด้วย String) ก่อนจะเทียบผล — ถ้า bmiOf ผิดแม้เพียงเล็กน้อย categoryOf อาจจัดประเภทผิดไปทั้งหมด" },
        { type: "tip", title: "สัญญาณว่าควรแยกเมธอด", html: `มีโค้ดชุดเดิมซ้ำตั้งแต่ 2 ที่ขึ้นไป, main ยาวเกินหนึ่งหน้าจอ, ต้องเขียน comment อธิบายว่า “ส่วนนี้ทำ …” (ชื่อเมธอดทำหน้าที่แทนได้) หรืออยากทดสอบการคำนวณแยกจากการรับข้อมูล` },
      ],
    },
    {
      num: "7.6", toc: "เกมทายตัวเลข", title: "ลงมือเขียน: เกมทายตัวเลขด้วยเมธอด",
      blocks: [
        { type: "p", html: `หัวข้อนี้นำทุกอย่างในบทมาสร้างโปรแกรมเดียว ตั้งแต่อ่านโจทย์ แบ่งงานเป็นเมธอด แล้วเขียนและทดสอบทีละขั้น` },
        { type: "h", text: "โจทย์" },
        { type: "concept", title: "เกมกล่องลับ", html: `<ul><li>กล่องลับเก็บ<strong>เลขสุ่ม 1–20</strong> ผู้เล่นต้องทายว่าในกล่องคือเลขอะไร</li><li>ทุกครั้งเกมบอกช่วงที่ต้องทาย เช่น <code>Guess a number from 1 to 20:</code></li><li>ทายผิด เกมบอกว่า<strong>น้อยไป</strong> (Too low) หรือ<strong>มากไป</strong> (Too high) แล้ว<strong>ปรับช่วง min–max</strong> ให้แคบลง</li><li>ทายถูก เกมจบ และบอกว่าเล่นไปทั้งหมด<strong>กี่ครั้ง</strong></li></ul>` },
        { type: "p", html: `ตัวอย่างการเล่น เมื่อเลขในกล่องคือ 13:` },
        { type: "table", cls: "trace-table", head: ["ครั้งที่", "ช่วงที่บอก", "ทาย", "เกมตอบ", "ช่วงใหม่"], rows: [
          ["1", "1 – 20", "10", "Too low", "11 – 20"],
          ["2", "11 – 20", "15", "Too high", "11 – 14"],
          ["3", "11 – 14", "12", "Too low", "13 – 14"],
          ["4", "13 – 14", "13", "Correct!", "จบเกม: 4 ครั้ง"],
        ] },
        { type: "tip", title: "ปรับช่วงอย่างไร", html: `ทาย 10 แล้วน้อยไป แปลว่าคำตอบมากกว่า 10 ช่วงใหม่จึงเริ่มที่ <code>min = guess + 1</code> ถ้ามากไป ช่วงใหม่จบที่ <code>max = guess - 1</code>` },

        { type: "h", text: "แนวคิดในการเขียนโปรแกรม" },
        { type: "p", html: `เขียนขั้นตอนเป็นภาษาคนก่อน (รหัสเทียม) แล้วดูว่าส่วนไหนเป็น “งานหนึ่งอย่าง” ที่ตั้งชื่อได้` },
        { type: "example", title: "ขั้นตอนของเกม", html: fpre(`
          เริ่มต้น
          สุ่มเลขลับ 1 ถึง 20                         ← งาน: สุ่ม
          ตั้ง min = 1, max = 20, จำนวนครั้ง = 0
          ขณะที่ ยังทายไม่ถูก
              ถามคำทายในช่วง min ถึง max              ← งาน: ถามจนได้ค่าในช่วง
              จำนวนครั้ง = จำนวนครั้ง + 1
              บอกผล Too low / Too high / Correct      ← งาน: ตัดสินคำทาย
              ถ้า น้อยไป  ให้ min = คำทาย + 1
              ถ้า มากไป  ให้ max = คำทาย − 1
          แสดง จำนวนครั้ง
          จบ`, "รหัสเทียม") },
        { type: "p", html: `ลูกศรแต่ละอันคืองานที่แยกเป็นเมธอดได้ และลูปทั้งก้อนคือ “เล่นหนึ่งเกม” ซึ่งเป็นเมธอดได้อีกตัว main จึงเหลือแค่สั่งเรียงลำดับ` },

        { type: "h", text: "ควรมีเมธอดอะไรบ้าง" },
        { type: "table", head: ["เมธอด", "หน้าที่ (ประโยคเดียว)", "รับอะไร (parameter)", "คืนอะไร (return)"], rows: [
          ["<code>hint</code>", "ตัดสินว่าคำทายน้อยไป มากไป หรือถูก", "<code>int guess, int secret</code>", "<code>String</code>"],
          ["<code>askGuess</code>", "ถามซ้ำจนได้ตัวเลขในช่วง min–max", "<code>Scanner input, int min, int max</code>", "<code>int</code> คำทายที่ใช้ได้"],
          ["<code>randomSecret</code>", "สุ่มเลขลับในช่วง", "<code>Random rng, int min, int max</code>", "<code>int</code>"],
          ["<code>playGame</code>", "เล่นหนึ่งเกมจนทายถูก", "<code>Scanner input, int secret, int min, int max</code>", "<code>int</code> จำนวนครั้ง"],
          ["<code>main</code>", "เตรียมของ แล้วเรียกเมธอดตามลำดับ", "–", "–"],
        ] },
        { type: "tip", title: "ทำไมแบ่งแบบนี้", html: `<code>hint</code> ไม่รับข้อมูลจากผู้ใช้และไม่พิมพ์เอง จึงทดสอบได้ทันที ส่วน <code>playGame</code> รับเลขลับเป็น parameter แทนการสุ่มเอง ระหว่างพัฒนาจึงส่งเลขที่รู้คำตอบเข้าไปทดสอบได้ เขียนจากเมธอดเล็กที่สุดขึ้นไปหาใหญ่ และทดสอบทุกขั้นก่อนไปขั้นถัดไป` },

        { type: "h", text: "ขั้นที่ 1: hint ตัดสินคำทาย" },
        { type: "p", html: `เริ่มจากเมธอดที่ง่ายที่สุด รับคำทายกับเลขลับ แล้ว return ข้อความ ทดสอบใน main ด้วยค่าที่รู้คำตอบครบทั้ง 3 กรณี ยังไม่ต้องมี Scanner` },
        { type: "run", title: "เขียนและทดสอบ hint",
          code: j`
            public class GuessStep1 {
                public static void main(String[] args) {
                    System.out.println(hint(5, 13));      // Too low
                    System.out.println(hint(18, 13));     // Too high
                    System.out.println(hint(13, 13));     // Correct!
                }

                static String hint(int guess, int secret) {
                    if (guess < secret) return "Too low";
                    if (guess > secret) return "Too high";
                    return "Correct!";                    // ไม่น้อย ไม่มาก = เท่ากัน
                }
            }`,
          },

        { type: "h", text: "ขั้นที่ 2: askGuess ถามจนได้ค่าในช่วง" },
        { type: "p", html: `เมธอดนี้บอกช่วงให้ผู้เล่นเห็น อ่านคำทาย ถ้าอยู่นอกช่วงให้ถามใหม่ (while) จนได้ค่าที่ใช้ได้แล้วจึง return ส่ง Scanner ตัวเดียวจาก main เข้ามาเป็น parameter` },
        { type: "run", title: "ทดสอบ askGuess ด้วยค่านอกช่วง", stdin: "25\n0\n7",
          code: j`
            import java.util.Scanner;

            public class GuessStep2 {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int g = askGuess(input, 1, 20);
                    System.out.println("You guessed " + g);           // 7
                }

                static int askGuess(Scanner input, int min, int max) {
                    System.out.print("Guess a number from " + min + " to " + max + ": ");
                    int guess = input.nextInt();
                    while (guess < min || guess > max) {              // 25 และ 0 นอกช่วง → ถามใหม่
                        System.out.print("  Out of range. Enter " + min + "-" + max + ": ");
                        guess = input.nextInt();
                    }
                    return guess;                                     // ถึงตรงนี้ได้ = อยู่ในช่วงแน่นอน
                }
            }`,
          },
        { type: "warn", title: "อย่าสร้าง Scanner ในเมธอด", html: `ถ้า askGuess สร้าง <code>new Scanner(System.in)</code> ทุกครั้งที่ถูกเรียก จะมี Scanner หลายตัวแย่งอ่าน input เดียวกัน ข้อมูลอาจหาย ให้สร้างครั้งเดียวใน main แล้วส่งต่อ` },

        { type: "h", text: "ขั้นที่ 3: playGame วนจนทายถูก" },
        { type: "p", html: `ประกอบสองเมธอดแรกเข้าในลูป นับครั้ง และปรับ min/max หลังทายผิด ขั้นนี้ยัง<strong>ไม่สุ่ม</strong> ส่งเลขลับ 13 เข้าไปตรง ๆ ผลจึงต้องตรงกับตารางการเล่นด้านบนทุกบรรทัด` },
        { type: "run", title: "เล่นด้วยเลขลับที่รู้คำตอบ", stdin: "10\n15\n12\n13",
          code: j`
            import java.util.Scanner;

            public class GuessStep3 {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int tries = playGame(input, 13, 1, 20);           // เลขลับคงที่ ไว้ทดสอบ
                    System.out.println("Tries: " + tries);            // 4
                }

                static int playGame(Scanner input, int secret, int min, int max) {
                    int tries = 0;
                    int guess = 0;                                    // 0 ไม่ใช่คำตอบ → เข้าลูปแน่นอน
                    while (guess != secret) {
                        guess = askGuess(input, min, max);            // เรียกเมธอดจากขั้นที่ 2
                        tries++;
                        System.out.println("  " + hint(guess, secret));   // เรียกเมธอดจากขั้นที่ 1
                        if (guess < secret) min = guess + 1;          // น้อยไป → ขยับขอบล่าง
                        else if (guess > secret) max = guess - 1;     // มากไป → ขยับขอบบน
                    }
                    return tries;
                }

                static int askGuess(Scanner input, int min, int max) {
                    System.out.print("Guess a number from " + min + " to " + max + ": ");
                    int guess = input.nextInt();
                    while (guess < min || guess > max) {
                        System.out.print("  Out of range. Enter " + min + "-" + max + ": ");
                        guess = input.nextInt();
                    }
                    return guess;
                }

                static String hint(int guess, int secret) {
                    if (guess < secret) return "Too low";
                    if (guess > secret) return "Too high";
                    return "Correct!";
                }
            }`,
          },
        { type: "tip", title: "min และ max เป็นของ playGame", html: `min กับ max เป็น parameter จึงเป็นตัวแปร local ของ playGame (หัวข้อ 7.4) แก้ค่าในเมธอดได้โดยไม่กระทบตัวแปรใน main และทุกครั้งที่เรียก playGame จะได้ช่วงเริ่มต้นใหม่` },

        { type: "h", text: "ขั้นที่ 4: สุ่มเลขลับ แล้วประกอบเป็นเกมจริง" },
        { type: "p", html: `ใช้คลาส <code>Random</code> (<code>import java.util.Random;</code>) สุ่มจำนวนเต็ม: <code>rng.nextInt(n)</code> คืน 0 ถึง n − 1 ดังนั้นช่วง min–max เขียนเป็น <code>min + rng.nextInt(max - min + 1)</code> (รายละเอียดอยู่ใน<a href="side-quest-random.html">บทเสริม Random</a>)` },
        { type: "p", html: `ระหว่างทดสอบใส่ <strong>seed</strong> เช่น <code>new Random(7)</code> จะได้เลขลับเดิมทุกครั้งที่รัน (seed 7 ได้ 17) เมื่อเล่นจริงให้ลบ seed ออกเป็น <code>new Random()</code>` },
        { type: "run", title: "เกมทายตัวเลขฉบับสมบูรณ์", stdin: "10\n15\n5\n18\n16\n17",
          code: j`
            import java.util.Random;
            import java.util.Scanner;

            public class GuessNumberGame {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    Random rng = new Random(7);                       // ทดสอบ: seed 7 → 17 ทุกครั้ง (เล่นจริงใช้ new Random())
                    final int MIN = 1, MAX = 20;

                    System.out.println("=== Mystery Box: guess the number ===");
                    int secret = randomSecret(rng, MIN, MAX);
                    int tries = playGame(input, secret, MIN, MAX);
                    System.out.println("The secret number was " + secret + ". You played " + tries + " times.");
                }

                static int randomSecret(Random rng, int min, int max) {
                    return min + rng.nextInt(max - min + 1);          // nextInt(20) ได้ 0-19 → +1 ได้ 1-20
                }

                static int playGame(Scanner input, int secret, int min, int max) {
                    int tries = 0;
                    int guess = 0;
                    while (guess != secret) {
                        guess = askGuess(input, min, max);
                        tries++;                                      // ค่านอกช่วงไม่ถูกนับ เพราะ askGuess ไม่คืนค่านั้น
                        System.out.println("  " + hint(guess, secret));
                        if (guess < secret) min = guess + 1;
                        else if (guess > secret) max = guess - 1;
                    }
                    return tries;
                }

                static int askGuess(Scanner input, int min, int max) {
                    System.out.print("Guess a number from " + min + " to " + max + ": ");
                    int guess = input.nextInt();
                    while (guess < min || guess > max) {
                        System.out.print("  Out of range. Enter " + min + "-" + max + ": ");
                        guess = input.nextInt();
                    }
                    return guess;
                }

                static String hint(int guess, int secret) {
                    if (guess < secret) return "Too low";
                    if (guess > secret) return "Too high";
                    return "Correct!";
                }
            }`,
          },
        { type: "p", html: `สังเกตว่า main อ่านแล้วเข้าใจทั้งเกมได้ในสามบรรทัด: สุ่มเลขลับ → เล่น → สรุป รายละเอียดแต่ละเรื่องอยู่ในเมธอดที่ชื่อบอกหน้าที่` },
        { type: "check", title: "ทายกี่ครั้งพอ", html: `<p>ถ้าผู้เล่นทายตรงกลางช่วงเสมอ (ช่วง 1–20 ทาย 10 ก่อน) ต้องทายอย่างมากกี่ครั้งจึงรับประกันว่าถูก</p>`, answer: `<p><strong>5 ครั้ง</strong> — แต่ละครั้งตัดช่วงเหลือประมาณครึ่ง: 20 → 10 → 5 → 2 → 1 ตัวเลือก วิธีนี้เรียกว่า binary search</p>` },
        { type: "try", html: `เปลี่ยน <code>MAX</code> เป็น 100 โดยไม่แก้เมธอดอื่นเลย แล้วลองเพิ่มเมธอด <code>boolean askPlayAgain(Scanner input)</code> ให้ main วนเล่นใหม่ได้หลายรอบ` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "พิมพ์ชื่อรายวิชา", html: `<p>สร้างเมธอด <code>printCourseName()</code> ที่แสดง <code>Java Programming</code> แล้วเรียกจาก main สองครั้ง โดยมีบรรทัด <code>---</code> คั่นระหว่างการเรียก (พิมพ์จาก main)</p>`,
      spec: ["เมธอดเป็น static void ไม่มี parameter", "ประกาศเมธอดนอก main"],
      solution: j`
        public class CourseName {
            public static void main(String[] args) {
                printCourseName();  // เรียกเมธอดครั้งที่ 1
                System.out.println("---");
                printCourseName();  // เรียกครั้งที่ 2 ได้ผลเหมือนเดิม
            }

            static void printCourseName() {
                System.out.println("Java Programming");
            }
        }` },
    { level: 1, title: "กล่องข้อความ", html: `<p>สร้างเมธอด <code>printBox(String text)</code> ที่พิมพ์ข้อความในกรอบที่กว้างพอดีกับข้อความ (ซ้ายขวามีช่องว่าง 1 ตัว) แล้วเรียกด้วยข้อความ 2 แบบ</p>`,
      spec: ["ความกว้างกรอบ = text.length() + 4", "ใช้ <code>\"-\".repeat(n)</code> สร้างเส้น", "เรียก printBox(\"Hi\") และ printBox(\"Java Methods\")"],
      solution: j`
        public class TextBox {
            public static void main(String[] args) {
                printBox("Hi");
                printBox("Java Methods");
            }

            static void printBox(String text) {
                // ความยาวกรอบขึ้นกับความยาวข้อความ
                String line = "+" + "-".repeat(text.length() + 2) + "+";
                System.out.println(line);
                System.out.println("| " + text + " |");
                System.out.println(line);
            }
        }` },
    { level: 1, title: "เมธอดคำนวณค่าเฉลี่ย", html: `<p>เขียนเมธอด <code>averageOf(double a, double b, double c)</code> ที่<strong>คืนค่า</strong>เฉลี่ยของ 3 จำนวน แล้วใน main เรียกใช้กับข้อมูล 2 ชุด และแสดงผลทศนิยม 2 ตำแหน่ง</p>`,
      spec: ["เมธอดต้อง return ค่า ไม่พิมพ์เอง", "main เป็นผู้พิมพ์ผล", "ชุดข้อมูล: (80, 90, 100) และ (7, 8, 8)"],
      solution: j`
        public class AverageMethod {
            public static void main(String[] args) {
                // ส่งคะแนน 3 ค่า รับค่าเฉลี่ยกลับมา
                System.out.printf("Average 1 = %.2f%n", averageOf(80, 90, 100));
                System.out.printf("Average 2 = %.2f%n", averageOf(7, 8, 8));
            }

            static double averageOf(double a, double b, double c) {
                return (a + b + c) / 3.0;  // 3.0 ทำให้ได้ทศนิยม
            }
        }` },
    { level: 2, title: "แปลงหน่วยด้วยหลายเมธอด", html: `<p>เขียนเมธอดคืนค่า 3 ตัว: <code>cToF(double c)</code>, <code>kmToMile(double km)</code> (1 km = 0.621371 mile) และ <code>kgToPound(double kg)</code> (1 kg = 2.20462 lb) แล้วให้ main รับค่าทั้งสามจากผู้ใช้และแสดงผลแปลงเป็นตาราง</p>`,
      spec: ["ค่าคงที่แปลงหน่วยประกาศเป็น <code>static final</code> ในคลาส", "ทุกเมธอดแปลงหน่วยเป็น static double และ return ค่า", "แสดงผลทศนิยม 2 ตำแหน่ง"], stdin: "30 42.195 65",
      solution: j`
        import java.util.Scanner;

        public class UnitConverter {
            // ค่าคงที่ระดับคลาส ใช้ได้ทุกเมธอด
            static final double MILE_PER_KM = 0.621371;
            static final double POUND_PER_KG = 2.20462;

            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Celsius km kg: ");
                double c = input.nextDouble();
                double km = input.nextDouble();
                double kg = input.nextDouble();
                // เรียกเมธอดแปลงหน่วยใน printf
                System.out.printf("%8.2f C  = %8.2f F%n", c, cToF(c));
                System.out.printf("%8.2f km = %8.2f mi%n", km, kmToMile(km));
                System.out.printf("%8.2f kg = %8.2f lb%n", kg, kgToPound(kg));
            }

            static double cToF(double c) {  // เมธอดละหนึ่งการแปลง
                return c * 9 / 5 + 32;
            }

            static double kmToMile(double km) {
                return km * MILE_PER_KM;
            }

            static double kgToPound(double kg) {
                return kg * POUND_PER_KG;
            }
        }` },
    { level: 2, title: "isEven, isPrime และนับจำนวน", html: `<p>เขียนเมธอด <code>boolean isEven(int n)</code> และ <code>boolean isPrime(int n)</code> แล้วใน main รับช่วง a ถึง b และใช้สองเมธอดนี้นับว่ามีเลขคู่กี่ตัวและจำนวนเฉพาะกี่ตัว พร้อมแสดงรายการจำนวนเฉพาะ</p>`,
      spec: ["isPrime คืน false สำหรับ n &lt; 2", "main ห้ามมีโค้ดตรวจจำนวนเฉพาะเอง ต้องเรียกเมธอด", "ทดสอบช่วง 10 ถึง 30"], stdin: "10 30",
      solution: j`
        import java.util.Scanner;

        public class CountWithMethods {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("a b: ");
                int a = input.nextInt(), b = input.nextInt();
                int evens = 0, primes = 0;
                System.out.print("Primes: ");
                for (int n = a; n <= b; n++) {
                    // ใช้เมธอดเป็นเงื่อนไขของ if
                    if (isEven(n)) evens++;
                    if (isPrime(n)) {
                        primes++;
                        System.out.print(n + " ");
                    }
                }
                System.out.println();
                System.out.println("Even count: " + evens);
                System.out.println("Prime count: " + primes);
            }

            // คืนผลของนิพจน์ boolean ได้โดยตรง
            static boolean isEven(int n) {
                return n % 2 == 0;
            }

            static boolean isPrime(int n) {
                if (n < 2) return false;
                for (int d = 2; d * d <= n; d++) {
                    if (n % d == 0) return false;
                }
                return true;
            }
        }`, explain: "<code>return n % 2 == 0;</code> คืนผลของนิพจน์ boolean ได้โดยตรง ไม่ต้องเขียน if" },
    { level: 2, title: "overload เมธอดคำนวณพื้นที่", html: `<p>เขียนเมธอดชื่อ <code>area</code> สามแบบ (overload): <code>area(double r)</code> พื้นที่วงกลม, <code>area(double w, double h)</code> พื้นที่สี่เหลี่ยมผืนผ้า และ <code>area(double a, double b, double c)</code> พื้นที่สามเหลี่ยมจากความยาวด้านด้วยสูตรเฮรอน (s = (a+b+c)/2, พื้นที่ = √(s(s−a)(s−b)(s−c)))</p>`,
      spec: ["ใช้ Math.PI และ Math.sqrt", "เรียกทั้งสามแบบจาก main ด้วยค่าในตัวอย่าง", "อธิบายว่า compiler รู้ได้อย่างไรว่าต้องเรียกแบบไหน"],
      solution: j`
        public class AreaOverload {
            public static void main(String[] args) {
                // เลือก area ตามจำนวน argument
                System.out.printf("Circle r=3       : %.2f%n", area(3));
                System.out.printf("Rectangle 4x6    : %.2f%n", area(4, 6));
                System.out.printf("Triangle 3,4,5   : %.2f%n", area(3, 4, 5));
            }

            static double area(double r) {  // วงกลม: πr²
                return Math.PI * r * r;
            }

            // สี่เหลี่ยม: กว้าง × ยาว
            static double area(double w, double h) {
                return w * h;
            }

            // สามเหลี่ยม: สูตรเฮรอน
            static double area(double a, double b, double c) {
                // ครึ่งหนึ่งของเส้นรอบรูป
                double s = (a + b + c) / 2;
                return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            }
        }`, explain: "compiler ดูจากจำนวน argument (1, 2 หรือ 3 ตัว) เพื่อเลือกเมธอดที่ signature ตรงกัน" },
    { level: 2, title: "ตารางเงินกู้ด้วยเมธอด", html: `<p>เขียนเมธอด <code>monthlyPayment(double principal, double annualRate, int months)</code> คืนค่างวดรายเดือนด้วยสูตร P × r / (1 − (1 + r)<sup>−n</sup>) โดย r = อัตราต่อปี ÷ 12 ÷ 100 ถ้าอัตราเป็น 0 ให้คืน principal ÷ months จากนั้นใน main แสดงค่างวดของเงินกู้ 500,000 บาทที่ระยะเวลา 12, 24, 36, 48, 60 เดือน ดอกเบี้ย 6% ต่อปี</p>`,
      spec: ["ใช้ <code>Math.pow(1 + r, -n)</code>", "ใช้ลูปใน main เรียกเมธอดซ้ำ", "แสดงค่างวดและดอกเบี้ยรวม (ค่างวด × เดือน − เงินต้น)"],
      solution: j`
        public class LoanTable {
            public static void main(String[] args) {
                double principal = 500000;
                double rate = 6;
                System.out.printf("%6s %12s %12s%n", "Months", "Payment", "Interest");
                for (int months = 12; months <= 60; months += 12) {
                    // คำนวณค่างวดของแต่ละระยะเวลา
                    double pay = monthlyPayment(principal, rate, months);
                    System.out.printf("%6d %,12.2f %,12.2f%n", months, pay, pay * months - principal);
                }
            }

            static double monthlyPayment(double principal, double annualRate, int months) {
                // ไม่มีดอกเบี้ย → หารเท่า ๆ กัน
                if (annualRate == 0) return principal / months;
                // ดอกเบี้ยต่อเดือนเป็นทศนิยม
                double r = annualRate / 12 / 100;
                // สูตรผ่อนชำระแบบลดต้นลดดอก
                return principal * r / (1 - Math.pow(1 + r, -months));
            }
        }` },
    { level: 3, title: "เครื่องมือตัวเลข: digitSum, reverse, isPalindrome", html: `<p>เขียนเมธอด 3 ตัวที่ทำงานกับจำนวนเต็มบวกโดยไม่ใช้ String: <code>int digitSum(int n)</code>, <code>int reverse(int n)</code> และ <code>boolean isPalindrome(int n)</code> (ต้องเรียก reverse) จากนั้นให้ main หาจำนวนพาลินโดรมทั้งหมดในช่วง 100–200 และแสดงผลรวมหลักของแต่ละตัว</p>`,
      spec: ["isPalindrome ต้องใช้ reverse ไม่เขียนลูปซ้ำ", "แสดงผลในรูปแบบ <code>121 (sum 4)</code> บรรทัดละ 5 ตัว", "สรุปจำนวนพาลินโดรมที่พบ"],
      solution: j`
        public class NumberTools {
            public static void main(String[] args) {
                int found = 0;
                for (int n = 100; n <= 200; n++) {
                    if (isPalindrome(n)) {  // ใช้เมธอดเป็นเงื่อนไข
                        System.out.printf("%d (sum %d)  ", n, digitSum(n));
                        found++;
                        // ขึ้นบรรทัดใหม่ทุก 5 ตัว
                        if (found % 5 == 0) System.out.println();
                    }
                }
                if (found % 5 != 0) System.out.println();
                System.out.println("Found " + found + " palindromes");
            }

            static int digitSum(int n) {
                int sum = 0;  // ผลรวมหลัก
                while (n > 0) {
                    sum += n % 10;  // บวกหลักขวาสุด
                    n /= 10;        // ตัดหลักขวาสุดทิ้ง
                }
                return sum;
            }

            static int reverse(int n) {
                int rev = 0;
                while (n > 0) {
                    // เลื่อนหลักเดิมไปซ้ายแล้วเติมหลักใหม่
                    rev = rev * 10 + n % 10;
                    n /= 10;
                }
                return rev;
            }

            static boolean isPalindrome(int n) {
                return n == reverse(n);  // เลขกลับหน้าหลังเท่าเดิม
            }
        }`, explain: "การแก้ parameter n ใน digitSum และ reverse ไม่กระทบตัวแปร n ใน main เพราะ Java ส่งสำเนาของค่า" },
    { level: 3, title: "ตัวช่วยตรวจการรับข้อมูล", html: `<p>เขียนเมธอด <code>readIntInRange(Scanner in, String prompt, int min, int max)</code> ที่ถามซ้ำจนกว่าผู้ใช้จะป้อนจำนวนเต็มในช่วง [min, max] แล้ว return ค่านั้น จากนั้นใช้เมธอดนี้สร้างโปรแกรมรับวันเกิด (วัน 1–31, เดือน 1–12, ปี ค.ศ. 1900–2026) และคำนวณอายุ ณ วันที่ 4/10/2026 (ถ้ายังไม่ถึงวันเกิดในปีนี้ให้ลบ 1)</p>`,
      spec: ["ส่ง Scanner ตัวเดียวเป็น argument (ไม่สร้างใหม่ในเมธอด)", "แสดง <code>Please enter min-max</code> เมื่อป้อนผิดช่วง", "เขียนเมธอด <code>ageOn(int d, int m, int y, int nowD, int nowM, int nowY)</code> คืนอายุ"], stdin: "45\n15\n13\n8\n2005",
      solution: j`
        import java.util.Scanner;

        public class BirthdayInput {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                // เมธอดเดียวใช้ตรวจช่วงได้หลายแบบ
                int d = readIntInRange(in, "Day: ", 1, 31);
                int m = readIntInRange(in, "Month: ", 1, 12);
                int y = readIntInRange(in, "Year: ", 1900, 2026);
                System.out.println("Born " + d + "/" + m + "/" + y);
                System.out.println("Age on 4/10/2026: " + ageOn(d, m, y, 4, 10, 2026));
            }

            // อ่านจนกว่าจะได้ค่าในช่วง
            static int readIntInRange(Scanner in, String prompt, int min, int max) {
                int value;
                while (true) {
                    System.out.print(prompt);
                    value = in.nextInt();
                    // ค่าถูก → return ออกจากลูปและเมธอด
                    if (value >= min && value <= max) return value;
                    System.out.println("Please enter " + min + "-" + max);
                }
            }

            static int ageOn(int d, int m, int y, int nowD, int nowM, int nowY) {
                int age = nowY - y;
                // ยังไม่ถึงวันเกิดของปีนี้
                if (nowM < m || (nowM == m && nowD < d)) {
                    age--;
                }
                return age;
            }
        }` },
    { level: 3, title: "เกมลูกเต๋าแบบแบ่งเมธอด", html: `<p>สร้างเกมลูกเต๋าสองลูกแบบ “ผลลัพธ์กำหนดไว้” (ใช้ค่าจากผู้ใช้แทนการสุ่ม เพื่อให้ทดสอบได้) ผู้เล่นป้อนผลทอยทีละคู่ กติกา: ทอยครั้งแรกได้ผลรวม 7 หรือ 11 ชนะทันที, 2, 3, 12 แพ้ทันที, ค่าอื่นกลายเป็น “แต้มเป้าหมาย” แล้วทอยต่อไปจนได้แต้มเป้าหมาย (ชนะ) หรือได้ 7 (แพ้)</p>`,
      spec: ["เมธอด <code>int readRoll(Scanner in)</code> อ่านลูกเต๋า 2 ลูก ตรวจว่าแต่ละลูกอยู่ใน 1–6 แล้วคืนผลรวม", "เมธอด <code>String firstRollResult(int sum)</code> คืน \"WIN\", \"LOSE\" หรือ \"POINT\"", "เมธอด <code>boolean playForPoint(Scanner in, int point)</code> วนทอยจนรู้ผล คืน true ถ้าชนะ", "main เรียกเมธอดเหล่านี้และแสดงผลทุกการทอย"], runs: ["4 2\n3 5\n5 1", "6 6"],
      solution: j`
        import java.util.Scanner;

        public class DiceGame {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                int first = readRoll(in);  // อ่านผลทอยครั้งแรก
                String result = firstRollResult(first);
                if (result.equals("POINT")) {
                    System.out.println("Point is " + first);
                    // ทอยต่อจนกว่าจะได้แต้มหรือ 7
                    boolean win = playForPoint(in, first);
                    System.out.println(win ? "You WIN!" : "You LOSE!");
                } else {
                    System.out.println("You " + result + "!");
                }
            }

            // อ่านแต้มลูกเต๋า 2 ลูกจนกว่าจะถูกต้อง
            static int readRoll(Scanner in) {
                while (true) {
                    System.out.print("Roll (two dice): ");
                    int a = in.nextInt(), b = in.nextInt();
                    if (a >= 1 && a <= 6 && b >= 1 && b <= 6) {
                        System.out.println("  sum = " + (a + b));
                        return a + b;
                    }
                    System.out.println("  dice must be 1-6");
                }
            }

            static String firstRollResult(int sum) {
                // 7 หรือ 11 ชนะทันที
                if (sum == 7 || sum == 11) return "WIN";
                // 2, 3, 12 แพ้ทันที
                if (sum == 2 || sum == 3 || sum == 12) return "LOSE";
                return "POINT";
            }

            // ทอยซ้ำจนรู้ผล
            static boolean playForPoint(Scanner in, int point) {
                while (true) {
                    int sum = readRoll(in);
                    // ได้แต้มเดิม → ชนะ
                    if (sum == point) return true;
                    if (sum == 7) return false;  // ได้ 7 → แพ้
                }
            }
        }` },
  ],
};
