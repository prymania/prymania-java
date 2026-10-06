import { j, c, pre } from "../lib.mjs";

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
        { type: "concept", title: "แยกส่วนของ method declaration", html: pre(`
          static  void  printWelcome  ( )  {
            ①      ②         ③        ④   ⑤ body ...
          }`) + `<ol><li><code>static</code> — เรียกผ่านคลาสได้โดยไม่ต้องสร้าง object (ใช้ในบทพื้นฐานนี้ ความหมายเต็มอยู่ในบทที่ 11–12)</li><li><code>void</code> — ชนิดผลลัพธ์: ไม่มีค่าคืนกลับ</li><li>ชื่อเมธอด — lowerCamelCase ขึ้นต้นด้วยคำกริยา เช่น <code>printReceipt</code>, <code>calculateTax</code></li><li><code>( )</code> — ตำแหน่ง parameter ตอนนี้ยังว่าง</li><li><code>{ }</code> — body คือคำสั่งที่ทำเมื่อถูกเรียก</li></ol><p>เมธอดประกาศ<strong>ภายในคลาส แต่นอกเมธอดอื่น</strong> (ไม่ซ้อนอยู่ใน main) และลำดับการประกาศไม่สำคัญ</p>` },
        { type: "run", title: "แยกการแสดงข้อความออกจาก main", level: "พื้นฐาน",
          concept: "ประกาศครั้งเดียว เรียกกี่ครั้งก็ได้ด้วยชื่อตามด้วย <code>()</code>",
          code: j`
            public class Welcome {
                public static void main(String[] args) {
                    printWelcome();
                    System.out.println("(main continues)");
                    printWelcome();
                }

                static void printWelcome() {
                    System.out.println("Welcome to Java");
                }
            }`,
          steps: ["main เจอ <code>printWelcome()</code> จึงพัก main ชั่วคราวแล้วกระโดดไปที่เมธอด", "เมธอดพิมพ์ข้อความแล้วจบ body", "กลับมาที่ main บรรทัด<strong>ถัดจากจุดเรียก</strong>", "เรียกครั้งที่สองก็ทำซ้ำแบบเดิม"] },
        { type: "run", title: "เมธอดเรียกเมธอดอื่นต่อได้", level: "ต่อยอด",
          concept: "เมธอดหนึ่งเรียกเมธอดอื่นได้ โปรแกรมจะจำว่าต้องกลับไปที่ใด (call stack) ลองไล่ลำดับก่อนดู output",
          code: j`
            public class CallChain {
                public static void main(String[] args) {
                    System.out.println("main: start");
                    printHeader();
                    System.out.println("main: end");
                }

                static void printHeader() {
                    printLine();
                    System.out.println("  REPORT");
                    printLine();
                }

                static void printLine() {
                    System.out.println("==========");
                }
            }`,
          steps: ["main พิมพ์ start แล้วเรียก printHeader", "printHeader เรียก printLine → พิมพ์เส้น → กลับมา printHeader", "พิมพ์ REPORT แล้วเรียก printLine อีกครั้ง", "printHeader จบ → กลับมา main พิมพ์ end"] },
        { type: "run", title: "แบ่ง main เป็นขั้นตอนที่มีชื่อ", level: "ประยุกต์",
          concept: "main ที่ดีควรอ่านเหมือนสารบัญ: แต่ละบรรทัดบอกว่าทำอะไร รายละเอียดอยู่ในเมธอด",
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
          steps: ["อ่าน main แล้วรู้ทันทีว่าโปรแกรมมี 3 ส่วน", "ถ้าต้องแก้เมนู แก้เฉพาะ showMenu"] },
        { type: "practice", level: 2, title: "ใบเสร็จร้านมินิมาร์ท (เมธอดเรียกเมธอดซ้ำ)",
          html: `<p>รวมแนวคิดจากตัวอย่าง 7.1.2 (เมธอดเรียกเมธอดอื่นต่อ) และ 7.1.3 (แบ่ง main เป็นขั้นตอน) เข้าด้วยกัน: เขียนโปรแกรมพิมพ์ใบเสร็จร้านค้าที่ main เรียก 4 เมธอดตามลำดับคือ <code>printHeader()</code>, <code>printItems()</code>, <code>printTotal()</code>, <code>printFooter()</code> โดยให้ <code>printHeader()</code>, <code>printTotal()</code> และ <code>printFooter()</code> <strong>เรียกเมธอด <code>printDivider()</code> ซ้ำ</strong> เพื่อพิมพ์เส้นคั่น แทนการพิมพ์เส้นคั่นเองทุกครั้ง</p>`,
          spec: ["ทุกเมธอดเป็น static void ไม่มี parameter (เรายังไม่เรียนเรื่อง parameter ในหัวข้อนี้)", "printDivider() พิมพ์เส้นคั่นหนึ่งบรรทัด แล้วให้เมธอดอื่นเรียกใช้ซ้ำอย่างน้อย 3 ครั้งรวมกัน", "printItems() พิมพ์รายการสินค้า 3 บรรทัด", "printTotal() พิมพ์ยอดรวมของสินค้าทั้ง 3 รายการ"],
          solution: j`
            public class MiniMartReceipt {
                public static void main(String[] args) {
                    printHeader();
                    printItems();
                    printTotal();
                    printFooter();
                }

                static void printDivider() {
                    System.out.println("------------------------");
                }

                static void printHeader() {
                    printDivider();
                    System.out.println("     MINI MART");
                    printDivider();
                }

                static void printItems() {
                    System.out.println("Milk          35");
                    System.out.println("Bread         28");
                    System.out.println("Eggs          92");
                }

                static void printTotal() {
                    printDivider();
                    System.out.println("TOTAL        155");
                }

                static void printFooter() {
                    System.out.println("Thank you!");
                    printDivider();
                }
            }`,
          explain: "ข้อนี้ไม่มี parameter เลย เพราะหัวข้อ 7.1 ยังไม่สอนเรื่องนี้ — จุดที่ยากกว่าตัวอย่างคือต้องวางแผนว่าเมธอดไหน <em>ควรเรียก</em> printDivider() บ้าง แทนที่จะ copy โค้ดเส้นคั่นซ้ำ ๆ" },
        { type: "note", title: "void ไม่ได้แปลว่าไม่มี output", html: `<p>เมธอด void พิมพ์ข้อความได้ตามปกติ “void” หมายถึงไม่<strong>ส่งค่ากลับ</strong>ไปให้ผู้เรียกนำไปใช้ต่อ การแสดงผล (print) กับการคืนค่า (return) เป็นคนละเรื่อง — จะเห็นชัดในหัวข้อ 7.3</p>` },
        { type: "check", title: "ลำดับการเรียก", html: pre(`
          static void a() { System.out.print("A"); b(); System.out.print("a"); }
          static void b() { System.out.print("B"); }
          // ใน main:
          a(); b();`), answer: `<p><strong>ABaB</strong> — a พิมพ์ A, เรียก b พิมพ์ B, กลับมาพิมพ์ a, แล้ว main เรียก b อีกครั้งพิมพ์ B</p>` },
      ],
    },
    {
      num: "7.2", toc: "พารามิเตอร์และ argument", title: "พารามิเตอร์และ argument",
      blocks: [
        { type: "p", html: `<strong>parameter</strong> คือตัวแปรที่ประกาศในวงเล็บของเมธอดเพื่อรับค่า ส่วน <strong>argument</strong> คือค่าจริงที่ส่งเข้าไปตอนเรียก เมื่อเรียก Java จะคัดลอกค่า argument ไปใส่ parameter <em>ตามลำดับตำแหน่ง</em>` },
        { type: "concept", title: "parameter vs argument", html: pre(`
          static void greet(String name, int times) { ... }   // name, times = parameter
          greet("Mali", 3);                                  // "Mali", 3   = argument
                  │      └──→ times = 3
                  └──────────→ name  = "Mali"`) + `<ul><li>จำนวน ชนิด และลำดับของ argument ต้องตรงกับ parameter</li><li>argument เป็นตัวแปร ค่าคงที่ หรือนิพจน์ก็ได้ เช่น <code>greet(user, n + 1)</code></li></ul>` },
        { type: "run", title: "parameter หนึ่งตัว", level: "พื้นฐาน",
          concept: "เมธอดเดียวทำงานกับข้อมูลต่างกันได้ ขึ้นอยู่กับ argument ที่ส่งมา",
          code: j`
            public class GreetParam {
                public static void main(String[] args) {
                    greet("Mali");
                    greet("Beam");
                    String friend = "Nida";
                    greet(friend);
                }

                static void greet(String name) {
                    System.out.println("Hello, " + name + "!");
                }
            }`,
          steps: ["ครั้งแรก name = \"Mali\"", "ครั้งที่สอง name = \"Beam\"", "ครั้งที่สามส่งตัวแปร friend → name ได้ค่า \"Nida\""] },
        { type: "run", title: "หลาย parameter และลูปในเมธอด", level: "ต่อยอด",
          concept: "parameter ใช้ได้เหมือนตัวแปรปกติภายในเมธอด รวมถึงเป็นขอบเขตของลูป",
          code: j`
            public class DrawLine {
                public static void main(String[] args) {
                    drawLine('*', 10);
                    drawLine('-', 4);
                    drawLine('=', 2 * 6);
                }

                static void drawLine(char symbol, int length) {
                    for (int i = 0; i < length; i++) {
                        System.out.print(symbol);
                    }
                    System.out.println();
                }
            }`,
          steps: ["symbol = '*', length = 10 → ดาว 10 ตัว", "argument ที่สามเป็นนิพจน์ 2 * 6 คำนวณได้ 12 ก่อนส่ง", "ลำดับสำคัญ: <code>drawLine(10, '*')</code> จะคอมไพล์ไม่ผ่าน"] },
        { type: "practice", level: 1, title: "printRepeat(String text, int times)",
          html: `<p>เขียนเมธอด <code>printRepeat(String text, int times)</code> ที่พิมพ์ <code>text</code> ซ้ำกัน <code>times</code> ครั้งติดกันบนบรรทัดเดียว (ไม่มีช่องว่างคั่น) แล้วขึ้นบรรทัดใหม่ เหมือนตัวอย่าง 7.2.2 แต่เปลี่ยนจาก <code>char</code> เป็น <code>String</code></p>`,
          spec: ["parameter <code>text</code> (String) คือข้อความที่จะพิมพ์ซ้ำ, <code>times</code> (int) คือจำนวนครั้ง", "ต้องใช้ for loop พิมพ์ทีละครั้ง <strong>ห้ามใช้ <code>text.repeat(times)</code></strong> เพื่อฝึกเขียนลูปในเมธอดเอง", "main เรียก printRepeat(\"Hi\", 3), printRepeat(\"ab\", 5), printRepeat(\"=\", 10)"],
          solution: j`
            public class RepeatText {
                public static void main(String[] args) {
                    printRepeat("Hi", 3);
                    printRepeat("ab", 5);
                    printRepeat("=", 10);
                }

                static void printRepeat(String text, int times) {
                    for (int i = 0; i < times; i++) {
                        System.out.print(text);
                    }
                    System.out.println();
                }
            }` },
        { type: "practice", level: 1, title: "printCountdown(int from)",
          html: `<p>เขียนเมธอด <code>printCountdown(int from)</code> ที่พิมพ์ตัวเลขนับถอยหลังจาก <code>from</code> ลงมาถึง 1 คั่นด้วยช่องว่าง แล้วต่อท้ายด้วย <code>Go!</code> บนบรรทัดเดียวกัน</p>`,
          spec: ["parameter เดียว: <code>from</code> (int) คือเลขเริ่มนับถอยหลัง", "ลูปต้องเดิน<strong>ลดค่าลง</strong> (ตรงข้ามกับตัวอย่าง 7.2.2 ที่เพิ่มค่าขึ้น)", "main เรียก printCountdown(5), printCountdown(3), printCountdown(1)"],
          solution: j`
            public class Countdown {
                public static void main(String[] args) {
                    printCountdown(5);
                    printCountdown(3);
                    printCountdown(1);
                }

                static void printCountdown(int from) {
                    for (int i = from; i >= 1; i--) {
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
                    drawTriangle(1, 5);
                    System.out.println();
                    System.out.println("drawTriangle(2, 4):");
                    drawTriangle(2, 4);
                }

                static void drawTriangle(int style, int length) {
                    for (int i = 1; i <= length; i++) {
                        String digits = String.valueOf(i).repeat(i);
                        if (style == 2) {
                            System.out.print(" ".repeat(length - i));
                        }
                        System.out.println(digits);
                    }
                }
            }`,
          explain: "เพราะ <code>length - i</code> ลดลงทีละ 1 ขณะที่จำนวนหลักเพิ่มขึ้นทีละ 1 พอดี ขอบขวาของทุกแถวจึงตรงกันเสมอ (ช่องว่าง + ตัวเลข = length ทุกแถว)" },
        { type: "run", title: "pass-by-value: เมธอดแก้ค่าตัวแปรของผู้เรียกไม่ได้", level: "ประยุกต์",
          concept: "Java ส่ง<strong>สำเนาของค่า</strong> การเปลี่ยน parameter ภายในเมธอดไม่กระทบตัวแปรใน main",
          code: j`
            public class PassByValue {
                public static void main(String[] args) {
                    int score = 50;
                    addBonus(score);
                    System.out.println("main: score = " + score);
                }

                static void addBonus(int score) {
                    score = score + 10;
                    System.out.println("addBonus: score = " + score);
                }
            }`,
          steps: ["main ส่งค่า 50 ไป", "parameter score ในเมธอดเป็นตัวแปร<em>คนละตัว</em>แม้ชื่อเหมือนกัน", "เปลี่ยนเป็น 60 เฉพาะในเมธอด", "main ยังเป็น 50 — ถ้าต้องการผลลัพธ์ต้องใช้ return (หัวข้อถัดไป)"] },
        { type: "run", label: "ทดลอง error 7.2.4", title: "argument ไม่ตรงกับ parameter", level: "ประยุกต์", expect: "compile-error",
          concept: "compiler ตรวจจำนวนและชนิดของ argument ทุกครั้งที่เรียก",
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
          steps: ["บรรทัด 3 สลับลำดับ: ส่ง 5 (int) ไปที่ parameter แรกซึ่งเป็น char → <code>possible lossy conversion from int to char</code>", "บรรทัด 4 ขาด argument → <code>cannot be applied to given types</code>", "<code>required: char,int</code> / <code>found: char</code> บอกว่าคาดหวังอะไรและได้อะไร", "แก้: <code>drawLine('*', 5);</code>"] },
        { type: "check", title: "ส่งค่า", html: pre(`
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
        { type: "p", html: `เมื่อเมธอดคำนวณค่าที่ผู้เรียกต้องนำไปใช้ต่อ ให้ระบุ<strong>ชนิดผลลัพธ์</strong>แทน void แล้วใช้ <code>return ค่า;</code> ส่งค่ากลับ เมื่อเจอ return เมธอดจะจบทันที` },
        { type: "concept", title: "โครงสร้างเมธอดที่คืนค่า", html: pre(`
          static double calculateArea(double width, double height) {
              double area = width * height;
              return area;                    // ส่งค่า area กลับไปยังจุดที่เรียก
          }

          double a = calculateArea(4, 2.5);   // นำค่าที่คืนมาเก็บในตัวแปร
          System.out.println(calculateArea(3, 3) * 2);  // หรือใช้ในนิพจน์โดยตรง`) + `<p>คิดว่าการเรียกเมธอดที่คืนค่าคือ “นิพจน์” ที่ถูกแทนด้วยค่าที่ return ออกมา</p>` },
        { type: "run", title: "คืนค่าแล้วนำไปใช้ต่อ", level: "พื้นฐาน",
          concept: "ค่าที่คืนกลับมาเก็บในตัวแปร พิมพ์ หรือใช้คำนวณต่อได้",
          code: j`
            public class SquareReturn {
                public static void main(String[] args) {
                    int a = square(4);
                    System.out.println("square(4) = " + a);
                    System.out.println("square(3) + square(4) = " + (square(3) + square(4)));
                    System.out.println("square(square(2)) = " + square(square(2)));
                }

                static int square(int n) {
                    return n * n;
                }
            }`,
          steps: ["square(4) คืน 16 เก็บใน a", "square(3) + square(4) = 9 + 16 = 25", "square(square(2)): ในสุดได้ 4 → square(4) = 16"] },
        { type: "run", title: "print กับ return ต่างกันอย่างไร", level: "ต่อยอด",
          concept: "เมธอดที่<em>พิมพ์</em>ผลลัพธ์ให้คนเห็น แต่โปรแกรมนำค่าไปใช้ต่อไม่ได้ เมธอดที่ <em>return</em> ให้ค่ากับโปรแกรม",
          code: j`
            public class PrintVsReturn {
                public static void main(String[] args) {
                    printTotal(100, 3);
                    double total = getTotal(100, 3);
                    double withVat = total * 1.07;
                    System.out.println("With VAT: " + withVat);
                }

                static void printTotal(double price, int qty) {
                    System.out.println("Total: " + price * qty);
                }

                static double getTotal(double price, int qty) {
                    return price * qty;
                }
            }`,
          steps: ["printTotal แสดง 300.0 แต่ main ไม่ได้ค่ากลับมา", "getTotal คืน 300.0 → main นำไปคูณ VAT ต่อได้", "แนวทาง: เมธอดคำนวณควร return ให้ main เป็นผู้ตัดสินใจว่าจะแสดงผลอย่างไร"] },
        { type: "run", title: "return หลายจุด และคืน boolean", level: "ประยุกต์",
          concept: "เมธอดอาจมี return หลายจุดตามเงื่อนไข แต่<strong>ทุกเส้นทาง</strong>ต้องคืนค่าเสมอ เมธอดที่คืน boolean นิยมตั้งชื่อขึ้นต้นด้วย is/has/can",
          code: j`
            public class ReturnPaths {
                public static void main(String[] args) {
                    System.out.println(gradeOf(85) + " " + gradeOf(72) + " " + gradeOf(40));
                    for (int n = 1; n <= 20; n++) {
                        if (isPrime(n)) {
                            System.out.print(n + " ");
                        }
                    }
                    System.out.println();
                }

                static char gradeOf(int score) {
                    if (score >= 80) return 'A';
                    if (score >= 70) return 'B';
                    if (score >= 60) return 'C';
                    return 'F';
                }

                static boolean isPrime(int n) {
                    if (n < 2) return false;
                    for (int d = 2; d * d <= n; d++) {
                        if (n % d == 0) return false;
                    }
                    return true;
                }
            }`,
          steps: ["gradeOf(85): เจอ return 'A' แล้วจบเมธอดทันที ไม่ตรวจบรรทัดล่าง", "ไม่ต้องใช้ else เพราะ return ออกไปแล้ว", "isPrime เจอตัวหารก็ return false ทันที (ไม่ต้องใช้ break หรือ flag)", "ถ้าวนครบโดยไม่เจอตัวหาร จึง return true"] },
        { type: "practice", level: 2, title: "isLeapYear(int year) และนับปีอธิกสุรทิน",
          html: `<p>เขียนเมธอด <code>boolean isLeapYear(int year)</code> ตรวจว่าปี ค.ศ. ที่รับมาเป็นปีอธิกสุรทินหรือไม่ (หารด้วย 4 ลงตัว <strong>และ</strong> ถ้าหารด้วย 100 ลงตัวต้องหารด้วย 400 ลงตัวด้วย) แล้วใน main ใช้เมธอดนี้ในลูปเพื่อแสดงรายการปีอธิกสุรทินช่วง 2000–2026 พร้อมนับจำนวน เหมือนวิธีที่ตัวอย่าง 7.3.3 ใช้ <code>isPrime</code> ในลูป</p>`,
          spec: ["parameter เดียว: <code>year</code> (int) คือปี ค.ศ. ที่ต้องตรวจ", "isLeapYear ต้องมี return มากกว่า 1 จุดเหมือนตัวอย่าง (ไม่ใช้ else)", "main ห้ามเขียนเงื่อนไขปีอธิกสุรทินเอง ต้องเรียก isLeapYear เท่านั้น", "แสดงปีที่เป็นอธิกสุรทินทั้งหมดในบรรทัดเดียว คั่นด้วยช่องว่าง แล้วแสดงจำนวนรวม"],
          solution: j`
            public class LeapYearCheck {
                public static void main(String[] args) {
                    int count = 0;
                    System.out.print("Leap years: ");
                    for (int year = 2000; year <= 2026; year++) {
                        if (isLeapYear(year)) {
                            System.out.print(year + " ");
                            count++;
                        }
                    }
                    System.out.println();
                    System.out.println("Count: " + count);
                }

                static boolean isLeapYear(int year) {
                    if (year % 4 != 0) return false;
                    if (year % 100 == 0 && year % 400 != 0) return false;
                    return true;
                }
            }`,
          explain: "จุดที่ยากกว่าตัวอย่าง: isPrime มีเงื่อนไขเดียวในลูป แต่ isLeapYear ต้องรวมสองเงื่อนไข (หาร 4 และข้อยกเว้นของหาร 100/400) ให้ครบในลำดับที่ return ค่าถูกทุกกรณี" },
        { type: "run", label: "ทดลอง error 7.3.4", title: "บางเส้นทางไม่มี return", level: "ท้าทาย", expect: "compile-error",
          concept: "ถ้ามีกรณีที่เมธอดจบโดยไม่ return ค่า compiler จะไม่ยอม",
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
          steps: ["กรณี n == 0 หลุดออกจาก if ทั้งหมดโดยไม่มี return", "javac แจ้ง <code>missing return statement</code>", "แก้: เพิ่ม <code>return \"zero\";</code> ท้ายเมธอด"] },
        { type: "check", title: "ค่าที่คืน", html: pre(`
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
        { type: "p", html: `<strong>scope</strong> คือบริเวณที่ตัวแปรถูกมองเห็นและใช้งานได้ ตัวแปรที่ประกาศในบล็อก <code>{ }</code> ใดใช้ได้เฉพาะในบล็อกนั้น (local variable) parameter ก็เป็น local ของเมธอดนั้น ส่วน <strong>overloading</strong> คือการมีหลายเมธอดชื่อเดียวกันแต่ parameter ต่างกัน` },
        { type: "run", title: "ตัวแปรชื่อเดียวกันในคนละเมธอด", level: "พื้นฐาน",
          concept: "ตัวแปรในแต่ละเมธอดแยกกันโดยสิ้นเชิง แม้ชื่อเหมือนกัน",
          code: j`
            public class ScopeDemo {
                public static void main(String[] args) {
                    int count = 1;
                    helper();
                    System.out.println("main count = " + count);
                }

                static void helper() {
                    int count = 99;
                    System.out.println("helper count = " + count);
                }
            }`,
          steps: ["count ใน main และใน helper เป็นคนละตัว", "helper ไม่เห็น count ของ main และแก้ไขไม่ได้"] },
        { type: "run", label: "ทดลอง error 7.4.2", title: "ใช้ตัวแปรนอก scope", level: "ต่อยอด", expect: "compile-error",
          concept: "ตัวแปรที่ประกาศใน for หรือใน if หายไปเมื่อออกจากบล็อก",
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
          steps: ["<code>i</code> ประกาศใน header ของ for ใช้ได้เฉพาะในลูป", "<code>doubled</code> ประกาศใน body ใช้ได้เฉพาะในรอบนั้น", "javac แจ้ง <code>cannot find symbol</code> ทั้งสองจุด", "แก้: ประกาศตัวแปรไว้ก่อนลูปถ้าต้องใช้หลังลูป"] },
        { type: "run", title: "overloading: ชื่อเดียว หลายรูปแบบ", level: "ประยุกต์",
          concept: "compiler เลือกเมธอดจาก<strong>จำนวนและชนิด</strong>ของ argument (เรียกว่า signature) — แบบเดียวกับ <code>println</code> ที่รับได้ทั้ง int, double, String",
          code: j`
            public class OverloadDemo {
                public static void main(String[] args) {
                    System.out.println(max(3, 9));
                    System.out.println(max(2.5, 1.75));
                    System.out.println(max(4, 11, 7));
                    System.out.println(area(5));
                    System.out.println(area(4, 6));
                }

                static int max(int a, int b) {
                    return a > b ? a : b;
                }

                static double max(double a, double b) {
                    return a > b ? a : b;
                }

                static int max(int a, int b, int c) {
                    return max(max(a, b), c);
                }

                static double area(double side) {
                    return side * side;
                }

                static double area(double width, double height) {
                    return width * height;
                }
            }`,
          steps: ["max(3, 9) → เวอร์ชัน int, int", "max(2.5, 1.75) → เวอร์ชัน double, double", "max(4, 11, 7) → เวอร์ชัน 3 parameter ซึ่งเรียกเวอร์ชัน 2 parameter ซ้ำ", "area(5) → สี่เหลี่ยมจัตุรัส, area(4, 6) → สี่เหลี่ยมผืนผ้า", "หมายเหตุ: ชนิดผลลัพธ์อย่างเดียวต่างกันไม่ถือเป็น overload"] },
        { type: "practice", level: 2, title: "overload เมธอด volumeOf",
          html: `<p>เขียนเมธอดชื่อ <code>volumeOf</code> สามแบบ (overload) เหมือนแนวคิดในตัวอย่าง 7.4.3 แต่คำนวณปริมาตรแทนพื้นที่: <code>volumeOf(double side)</code> ปริมาตรลูกบาศก์, <code>volumeOf(double radius, double height)</code> ปริมาตรทรงกระบอก และ <code>volumeOf(double length, double width, double height)</code> ปริมาตรกล่องสี่เหลี่ยม</p>`,
          spec: ["ทุกเวอร์ชัน return double", "ทรงกระบอกใช้ <code>Math.PI * radius * radius * height</code>", "เรียกทั้งสามแบบจาก main ด้วย volumeOf(3), volumeOf(2, 5), volumeOf(2, 3, 4) แสดงผลทศนิยม 2 ตำแหน่ง", "อธิบายในคำตอบว่า compiler แยกแต่ละเวอร์ชันได้อย่างไรทั้งที่ชื่อเดียวกัน"],
          solution: j`
            public class VolumeOverload {
                public static void main(String[] args) {
                    System.out.printf("Cube side=3       : %.2f%n", volumeOf(3));
                    System.out.printf("Cylinder r=2,h=5  : %.2f%n", volumeOf(2, 5));
                    System.out.printf("Box 2x3x4         : %.2f%n", volumeOf(2, 3, 4));
                }

                static double volumeOf(double side) {
                    return side * side * side;
                }

                static double volumeOf(double radius, double height) {
                    return Math.PI * radius * radius * height;
                }

                static double volumeOf(double length, double width, double height) {
                    return length * width * height;
                }
            }`,
          explain: "ยากกว่าตัวอย่าง area ตรงที่ volumeOf(double, double) ของทรงกระบอกใช้สูตรที่ซับซ้อนกว่า และต้องระวังไม่ให้สลับลำดับ parameter กับเวอร์ชัน 3 ตัว" },
        { type: "check", title: "scope", html: pre(`
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
        { type: "steps", title: "ขั้นตอนออกแบบโปรแกรมด้วยเมธอด (top-down)", items: [
          "เขียนสิ่งที่โปรแกรมต้องทำเป็นข้อ ๆ ภาษาคน เช่น รับข้อมูล → คำนวณ → ตัดสิน → แสดงผล",
          "แต่ละข้อที่ทำงานชัดเจนหนึ่งอย่าง → ตั้งเป็นเมธอดหนึ่งตัว ตั้งชื่อด้วยคำกริยา",
          "กำหนดว่าแต่ละเมธอด <em>ต้องรู้อะไร</em> (parameter) และ <em>ให้อะไรกลับ</em> (return type)",
          "เขียน main ให้เรียกเมธอดตามลำดับเหมือนสารบัญ",
          "เขียนและทดสอบเมธอดทีละตัว โดยเรียกจาก main ด้วยค่าที่รู้คำตอบ",
        ] },
        { type: "run", title: "เครื่องคำนวณเกรดจากเมธอดหลายตัว", level: "ประยุกต์", stdin: "Mali\n32 24 27",
          concept: "main ประสานงาน ส่วนเมธอดแต่ละตัวทำหน้าที่เดียว: รวมคะแนน ตัดเกรด และพิมพ์รายงาน",
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

                    double total = totalScore(work, mid, fin);
                    char grade = gradeOf(total);
                    printReport(name, total, grade);
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

                static void printReport(String name, double total, char grade) {
                    System.out.println("-".repeat(24));
                    System.out.printf("%-8s %s%n", "Name", name);
                    System.out.printf("%-8s %.1f%n", "Total", total);
                    System.out.printf("%-8s %c%n", "Grade", grade);
                    System.out.printf("%-8s %s%n", "Result", grade == 'F' ? "Fail" : "Pass");
                    System.out.println("-".repeat(24));
                }
            }`,
          steps: ["main อ่านแล้วเข้าใจทันที: รับข้อมูล → รวม → ตัดเกรด → รายงาน", "totalScore และ gradeOf คืนค่า → ทดสอบแยกได้ง่าย", "printReport เป็น void เพราะหน้าที่คือแสดงผล"] },
        { type: "run", title: "ทดสอบเมธอดด้วยตารางค่าที่รู้คำตอบ", level: "ท้าทาย",
          concept: "เมื่อเมธอด return ค่า เราเขียนโค้ดทดสอบอัตโนมัติได้: เรียกด้วย input ที่รู้คำตอบแล้วเทียบผล",
          code: j`
            public class TestGradeOf {
                public static void main(String[] args) {
                    check(95, 'A');
                    check(80, 'A');
                    check(79.9, 'B');
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
          steps: ["check เรียก gradeOf แล้วเปรียบเทียบกับคำตอบที่คาด", "ทดสอบค่าขอบ 80 และ 79.9 ด้วย — จุดที่มักผิด", "บทที่ 10 จะขยายแนวคิดนี้เป็นการออกแบบ test case"] },
        { type: "practice", level: 3, title: "เครื่องคำนวณ BMI พร้อมชุดทดสอบ",
          html: `<p>รวมทุกแนวคิดของบทนี้: เขียนเมธอด <code>bmiOf(double weightKg, double heightM)</code> คืนค่าดัชนีมวลกาย (BMI = น้ำหนัก ÷ ส่วนสูง²) และ <code>categoryOf(double bmi)</code> คืนประเภทเป็น String (<code>"Underweight"</code> ถ้า BMI &lt; 18.5, <code>"Normal"</code> ถ้า &lt; 25, <code>"Overweight"</code> ถ้า &lt; 30, มิฉะนั้น <code>"Obese"</code>) จากนั้นเขียนเมธอด <code>check(double weight, double height, String expected)</code> ที่เรียกทั้งสองเมธอดต่อกันแล้วเทียบผลกับคำตอบที่คาด แบบเดียวกับตัวอย่าง 7.5.2 (เกณฑ์ตามมาตรฐาน WHO ใช้เพื่อฝึกเขียนโปรแกรมเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์)</p>`,
          spec: ["bmiOf และ categoryOf ต้อง return ค่า ห้ามพิมพ์เอง", "check() เป็น void เรียก bmiOf แล้วส่งผลต่อให้ categoryOf (เมธอดเรียกเมธอด ต่อด้วยอีกเมธอด)", "main เรียก check 4 ครั้งด้วยส่วนสูงคงที่ 1.70 แล้วไล่น้ำหนักให้ครอบคลุมทั้ง 4 ประเภท เพื่อทดสอบค่าขอบเขตเหมือนตัวอย่าง 7.5.2"],
          solution: j`
            public class BmiCalculator {
                public static void main(String[] args) {
                    check(50, 1.70, "Underweight");
                    check(65, 1.70, "Normal");
                    check(85, 1.70, "Overweight");
                    check(100, 1.70, "Obese");
                }

                static double bmiOf(double weightKg, double heightM) {
                    return weightKg / (heightM * heightM);
                }

                static String categoryOf(double bmi) {
                    if (bmi < 18.5) return "Underweight";
                    if (bmi < 25) return "Normal";
                    if (bmi < 30) return "Overweight";
                    return "Obese";
                }

                static void check(double weight, double height, String expected) {
                    double bmi = bmiOf(weight, height);
                    String actual = categoryOf(bmi);
                    String status = actual.equals(expected) ? "PASS" : "FAIL";
                    System.out.printf("%-4s weight=%.1f height=%.2f -> BMI=%.1f (%s, expected %s)%n", status, weight, height, bmi, actual, expected);
                }
            }`,
          explain: "ยากกว่า TestGradeOf เพราะ check() ต้องประสานสองเมธอดที่ return คนละชนิด (double แล้วต่อด้วย String) ก่อนจะเทียบผล — ถ้า bmiOf ผิดแม้เพียงเล็กน้อย categoryOf อาจจัดประเภทผิดไปทั้งหมด" },
        { type: "note", title: "สัญญาณว่าควรแยกเมธอด", html: `<ul><li>มีโค้ดชุดเดิมซ้ำตั้งแต่ 2 ที่ขึ้นไป</li><li>main ยาวเกินหนึ่งหน้าจอ</li><li>ต้องเขียน comment อธิบายว่า “ส่วนนี้ทำ …” — ชื่อเมธอดทำหน้าที่แทน comment ได้</li><li>อยากทดสอบการคำนวณส่วนหนึ่งแยกจากส่วนรับข้อมูล</li></ul>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "พิมพ์ชื่อรายวิชา", html: `<p>สร้างเมธอด <code>printCourseName()</code> ที่แสดง <code>Java Programming</code> แล้วเรียกจาก main สองครั้ง โดยมีบรรทัด <code>---</code> คั่นระหว่างการเรียก (พิมพ์จาก main)</p>`,
      spec: ["เมธอดเป็น static void ไม่มี parameter", "ประกาศเมธอดนอก main"],
      solution: j`
        public class CourseName {
            public static void main(String[] args) {
                printCourseName();
                System.out.println("---");
                printCourseName();
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
                System.out.printf("Average 1 = %.2f%n", averageOf(80, 90, 100));
                System.out.printf("Average 2 = %.2f%n", averageOf(7, 8, 8));
            }

            static double averageOf(double a, double b, double c) {
                return (a + b + c) / 3.0;
            }
        }` },
    { level: 2, title: "แปลงหน่วยด้วยหลายเมธอด", html: `<p>เขียนเมธอดคืนค่า 3 ตัว: <code>cToF(double c)</code>, <code>kmToMile(double km)</code> (1 km = 0.621371 mile) และ <code>kgToPound(double kg)</code> (1 kg = 2.20462 lb) แล้วให้ main รับค่าทั้งสามจากผู้ใช้และแสดงผลแปลงเป็นตาราง</p>`,
      spec: ["ค่าคงที่แปลงหน่วยประกาศเป็น <code>static final</code> ในคลาส", "ทุกเมธอดแปลงหน่วยเป็น static double และ return ค่า", "แสดงผลทศนิยม 2 ตำแหน่ง"], stdin: "30 42.195 65",
      solution: j`
        import java.util.Scanner;

        public class UnitConverter {
            static final double MILE_PER_KM = 0.621371;
            static final double POUND_PER_KG = 2.20462;

            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Celsius km kg: ");
                double c = input.nextDouble();
                double km = input.nextDouble();
                double kg = input.nextDouble();
                System.out.printf("%8.2f C  = %8.2f F%n", c, cToF(c));
                System.out.printf("%8.2f km = %8.2f mi%n", km, kmToMile(km));
                System.out.printf("%8.2f kg = %8.2f lb%n", kg, kgToPound(kg));
            }

            static double cToF(double c) {
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
                System.out.printf("Circle r=3       : %.2f%n", area(3));
                System.out.printf("Rectangle 4x6    : %.2f%n", area(4, 6));
                System.out.printf("Triangle 3,4,5   : %.2f%n", area(3, 4, 5));
            }

            static double area(double r) {
                return Math.PI * r * r;
            }

            static double area(double w, double h) {
                return w * h;
            }

            static double area(double a, double b, double c) {
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
                    double pay = monthlyPayment(principal, rate, months);
                    System.out.printf("%6d %,12.2f %,12.2f%n", months, pay, pay * months - principal);
                }
            }

            static double monthlyPayment(double principal, double annualRate, int months) {
                if (annualRate == 0) return principal / months;
                double r = annualRate / 12 / 100;
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
                    if (isPalindrome(n)) {
                        System.out.printf("%d (sum %d)  ", n, digitSum(n));
                        found++;
                        if (found % 5 == 0) System.out.println();
                    }
                }
                if (found % 5 != 0) System.out.println();
                System.out.println("Found " + found + " palindromes");
            }

            static int digitSum(int n) {
                int sum = 0;
                while (n > 0) {
                    sum += n % 10;
                    n /= 10;
                }
                return sum;
            }

            static int reverse(int n) {
                int rev = 0;
                while (n > 0) {
                    rev = rev * 10 + n % 10;
                    n /= 10;
                }
                return rev;
            }

            static boolean isPalindrome(int n) {
                return n == reverse(n);
            }
        }`, explain: "การแก้ parameter n ใน digitSum และ reverse ไม่กระทบตัวแปร n ใน main เพราะ Java ส่งสำเนาของค่า" },
    { level: 3, title: "ตัวช่วยตรวจการรับข้อมูล", html: `<p>เขียนเมธอด <code>readIntInRange(Scanner in, String prompt, int min, int max)</code> ที่ถามซ้ำจนกว่าผู้ใช้จะป้อนจำนวนเต็มในช่วง [min, max] แล้ว return ค่านั้น จากนั้นใช้เมธอดนี้สร้างโปรแกรมรับวันเกิด (วัน 1–31, เดือน 1–12, ปี ค.ศ. 1900–2026) และคำนวณอายุ ณ วันที่ 4/10/2026 (ถ้ายังไม่ถึงวันเกิดในปีนี้ให้ลบ 1)</p>`,
      spec: ["ส่ง Scanner ตัวเดียวเป็น argument (ไม่สร้างใหม่ในเมธอด)", "แสดง <code>Please enter min-max</code> เมื่อป้อนผิดช่วง", "เขียนเมธอด <code>ageOn(int d, int m, int y, int nowD, int nowM, int nowY)</code> คืนอายุ"], stdin: "45\n15\n13\n8\n2005",
      solution: j`
        import java.util.Scanner;

        public class BirthdayInput {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                int d = readIntInRange(in, "Day: ", 1, 31);
                int m = readIntInRange(in, "Month: ", 1, 12);
                int y = readIntInRange(in, "Year: ", 1900, 2026);
                System.out.println("Born " + d + "/" + m + "/" + y);
                System.out.println("Age on 4/10/2026: " + ageOn(d, m, y, 4, 10, 2026));
            }

            static int readIntInRange(Scanner in, String prompt, int min, int max) {
                int value;
                while (true) {
                    System.out.print(prompt);
                    value = in.nextInt();
                    if (value >= min && value <= max) return value;
                    System.out.println("Please enter " + min + "-" + max);
                }
            }

            static int ageOn(int d, int m, int y, int nowD, int nowM, int nowY) {
                int age = nowY - y;
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
                int first = readRoll(in);
                String result = firstRollResult(first);
                if (result.equals("POINT")) {
                    System.out.println("Point is " + first);
                    boolean win = playForPoint(in, first);
                    System.out.println(win ? "You WIN!" : "You LOSE!");
                } else {
                    System.out.println("You " + result + "!");
                }
            }

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
                if (sum == 7 || sum == 11) return "WIN";
                if (sum == 2 || sum == 3 || sum == 12) return "LOSE";
                return "POINT";
            }

            static boolean playForPoint(Scanner in, int point) {
                while (true) {
                    int sum = readRoll(in);
                    if (sum == point) return true;
                    if (sum == 7) return false;
                }
            }
        }` },
  ],
};
