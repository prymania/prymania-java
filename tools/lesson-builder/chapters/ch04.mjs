import { j, c, pre, jpre, fpre } from "../lib.mjs";

export default {
  num: 4, file: "chapter-04.html",
  pageTitle: "บทที่ 4: รับข้อมูลและแสดงผล", shortName: "บทที่ 4",
  tocLabel: "บทที่ 4 · โปรแกรมโต้ตอบ", sidebarBottom: "ถามให้ชัด ตอบให้อ่านง่าย",
  kicker: "บทที่ 4 · โปรแกรมเริ่มโต้ตอบได้", h1: "รับข้อมูลและแสดงผล",
  lead: "ใช้ข้อความถามผู้ใช้ รับค่าจากแป้นพิมพ์ คำนวณ และจัดรูปแบบคำตอบให้อ่านง่าย",
  goals: ["เลือกระหว่าง print, println และ printf", "รับจำนวนเต็ม ทศนิยม และข้อความด้วย Scanner", "อ่านชื่อหรือประโยคที่มีช่องว่างได้", "ป้องกันปัญหาบรรทัดค้างหลังอ่านตัวเลข"],
  prev: { href: "chapter-03.html", label: "← บทที่ 3" },
  next: { href: "chapter-05.html", label: "บทที่ 5: เงื่อนไข →" },
  footer: "บทที่ 4 · ทดสอบโปรแกรมด้วยข้อมูลหลายชุด",
  introHeading: "4. สร้างบทสนทนาระหว่างโปรแกรมกับผู้ใช้",
  introHtml: `<p>โปรแกรมที่รับข้อมูลจากผู้ใช้ต้องแจ้งให้รู้ว่าต้องป้อนอะไร (prompt) และหลังคำนวณเสร็จต้องแสดงคำตอบพร้อมหน่วยหรือคำอธิบายที่ชัดเจน ในตัวอย่างที่มีการรับข้อมูล ช่อง Output จะแสดง<strong>ค่าที่ผู้ใช้พิมพ์แบบขีดเส้นใต้</strong> เหมือนที่เห็นในหน้าต่าง console จริง</p>`,
  topics: [
    {
      num: "4.1", toc: "print · println · printf", title: "แสดงผลด้วย print, println และ printf",
      blocks: [
        { type: "p", html: `<code>printf</code> (print formatted) พิมพ์ตาม<strong>แม่แบบ</strong> ที่มีช่องให้เติมค่า เรียกว่า format specifier ช่วยกำหนดจำนวนทศนิยม ความกว้าง และการจัดชิดได้ ต่างจาก <code>println</code> ที่พิมพ์ค่าตามจริง` },
        { type: "table", head: ["specifier", "ใช้กับ", "ตัวอย่าง", "ผลลัพธ์"], rows: [
          ["<code>%d</code>", "จำนวนเต็ม", "<code>printf(\"%d\", 42)</code>", "42"],
          ["<code>%.2f</code>", "ทศนิยม 2 ตำแหน่ง (ปัดเศษ)", "<code>printf(\"%.2f\", 3.456)</code>", "3.46"],
          ["<code>%s</code>", "ข้อความ", "<code>printf(\"%s\", \"JHope\")</code>", "JHope"],
          ["<code>%c</code>", "อักขระ", "<code>printf(\"%c\", 'A')</code>", "A"],
          ["<code>%n</code>", "ขึ้นบรรทัดใหม่", "<code>printf(\"A%nB\")</code>", "A↵B"],
          ["<code>%,d</code>", "คั่นหลักพัน", "<code>printf(\"%,d\", 1500000)</code>", "1,500,000"],
          ["<code>%%</code>", "เครื่องหมาย % หนึ่งตัว", "<code>printf(\"15%%\")</code>", "15%"],
        ] },
        { type: "run", title: "แม่แบบหนึ่งชุด เติมค่าตามลำดับ",
          code: j`
            public class PrintfBasics {
                public static void main(String[] args) {
                    String name = "JHope";
                    int score = 87;
                    double average = 3.456;
                    System.out.printf("Student: %s%n", name);                 // Student: JHope
                    System.out.printf("Score: %d points%n", score);           // Score: 87 points
                    System.out.printf("Average: %.2f%n", average);            // Average: 3.46
                    System.out.printf("%s got %d (avg %.1f)%n", name, score, average);
                }
            }`,
          },
        { type: "tip", html: `ค่าที่ส่งตามหลังแม่แบบจับคู่กับ specifier <strong>ตามลำดับ</strong> ตัวแรกเข้า % ตัวแรก และ printf ไม่ขึ้นบรรทัดเอง ต้องใส่ <code>%n</code> ท้ายแม่แบบ` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: print ไม่ขึ้นบรรทัด", blocks: [
          { type: "run", title: "print ต่อกับ println",
            code: j`
              public class PrintExample {
                  public static void main(String[] args) {
                      System.out.print("Good ");          // ยังอยู่บรรทัดเดิม
                      System.out.println("morning");      // Good morning แล้วขึ้นบรรทัดใหม่
                      System.out.println("Next line");
                  }
              }`,
            after: "เพราะ print ไม่ขึ้นบรรทัด จึงใช้ทำข้อความถาม (prompt) ที่ให้ผู้ใช้พิมพ์ต่อท้ายในบรรทัดเดียวกัน" },
        ] },

        { type: "h", text: "จัดรูปแบบเงินและตาราง" },
        { type: "p", html: `ใส่ตัวเลขความกว้างหน้า specifier: <code>%-10s</code> ข้อความกว้าง 10 ช่องชิดซ้าย, <code>%5d</code> ตัวเลขกว้าง 5 ชิดขวา, <code>%8.2f</code> กว้าง 8 ทศนิยม 2 คอลัมน์จะตรงกันทุกบรรทัด` },
        { type: "run", title: "ราคาและตารางที่คอลัมน์ตรงกัน",
          code: j`
            public class AlignedTable {
                public static void main(String[] args) {
                    double total = 3 * 12.5;
                    System.out.println("println: " + total);                  // println: 37.5
                    System.out.printf("printf : %.2f baht%n", total);         // printf : 37.50 baht
                    System.out.printf("Salary : %,.2f%n", 1234567.891);       // Salary : 1,234,567.89
                    System.out.printf("Discount %d%%%n", 15);                 // Discount 15%
                    System.out.println();

                    System.out.printf("%-10s %5s %8s%n", "Item", "Qty", "Price");
                    System.out.printf("%-10s %5d %8.2f%n", "Pen", 12, 5.5);
                    System.out.printf("%-10s %5d %8.2f%n", "Notebook", 3, 45.0);
                    System.out.printf("%-10s %5d %8.2f%n", "Bag", 1, 399.75);
                    System.out.println("-".repeat(25));                       // เส้น 25 ตัว
                }
            }`,
          },
        { type: "warn", title: "specifier ต้องตรงชนิด", html: `printf ตรวจชนิดตอน<strong>รัน</strong> ใช้ <code>%d</code> กับค่า double โปรแกรมจะหยุดด้วย <code>IllegalFormatConversionException</code> จำคู่: <code>%d</code> ↔ int, <code>%f</code> ↔ double, <code>%s</code> ↔ String` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อ specifier ไม่ตรงชนิด", blocks: [
          { type: "run", label: "ทดลอง error 4.1.5", title: "specifier ไม่ตรงชนิด", expect: "runtime-error",
            code: j`
              public class WrongSpecifier {
                  public static void main(String[] args) {
                      double price = 19.5;
                      System.out.printf("Price: %.2f%n", price);
                      System.out.printf("Price: %d%n", price);
                  }
              }`,
            after: "บรรทัดแรกพิมพ์ 19.50 ได้ปกติ บรรทัดที่สองใช้ <code>%d</code> กับ double จึงได้ <code>d != java.lang.Double</code>" },
        ] },
        { type: "check", title: "ทำนาย printf", html: jpre(`
          System.out.printf("[%6.1f]%n", 3.14159);
          System.out.printf("[%-6s]%n", "ab");
          System.out.printf("%d + %d = %d%n", 2, 3, 2 + 3);`), answer: pre(`
          [   3.1]
          [ab    ]
          2 + 3 = 5`) },
      ],
    },
    {
      num: "4.2", toc: "Scanner", title: "รับข้อมูลตัวเลขด้วย Scanner",
      blocks: [
        { type: "p", html: `<code>Scanner</code> อ่านสิ่งที่ผู้ใช้พิมพ์ ต้อง <code>import java.util.Scanner;</code> ไว้บนสุดของไฟล์ สร้างครั้งเดียวด้วย <code>new Scanner(System.in)</code> แล้วเรียกเมธอดอ่านให้ตรงกับชนิด` },
        { type: "table", head: ["เมธอด", "อ่านอะไร", "เก็บใน"], rows: [
          ["<code>nextInt()</code>", "จำนวนเต็มหนึ่งค่า", "<code>int</code>"],
          ["<code>nextDouble()</code>", "ทศนิยมหนึ่งค่า (ป้อน 2 ได้ จะเป็น 2.0)", "<code>double</code>"],
          ["<code>next()</code>", "ข้อความหนึ่งคำ (ถึงช่องว่าง)", "<code>String</code>"],
          ["<code>nextLine()</code>", "ข้อความทั้งบรรทัด (มีช่องว่างได้)", "<code>String</code>"],
        ] },
        { type: "run", title: "ถาม รอ แล้วคำนวณ", stdin: "2007",
          code: j`
            import java.util.Scanner;

            public class AgeFromYear {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);          // สร้างครั้งเดียว
                    System.out.print("Birth year (A.D.): ");          // print → ผู้ใช้พิมพ์ต่อบรรทัดเดิม
                    int birthYear = input.nextInt();                  // หยุดรอจนผู้ใช้กด Enter
                    int age = 2026 - birthYear;                       // 2026 - 2007 = 19
                    System.out.println("You are about " + age + " years old.");
                }
            }`,
          },

        { type: "h", text: "รับหลายค่า" },
        { type: "p", html: `<code>nextInt</code> / <code>nextDouble</code> อ่านทีละ <strong>token</strong> (คำที่คั่นด้วยช่องว่างหรือ Enter) ผู้ใช้จึงพิมพ์หลายค่าในบรรทัดเดียวได้` },
        { type: "run", title: "ป้อน 3 คะแนนในบรรทัดเดียว", stdin: "8 9 10",
          code: j`
            import java.util.Scanner;

            public class ThreeScores {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Enter 3 scores: ");
                    int a = input.nextInt();             // 8    ส่วน "9 10" ยังค้างรอ
                    int b = input.nextInt();             // 9    ไม่ต้องรอผู้ใช้อีก
                    int c = input.nextInt();             // 10
                    int sum = a + b + c;
                    double average = sum / 3.0;          // 3.0 ทำให้ได้ทศนิยม
                    System.out.printf("Sum = %d, Average = %.2f%n", sum, average);
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: รับทศนิยมสองค่า", blocks: [
          { type: "run", title: "พื้นที่และเส้นรอบรูป", stdin: "4.5\n2",
            code: j`
              import java.util.Scanner;

              public class RectangleArea {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Width: ");
                      double width = input.nextDouble();
                      System.out.print("Height: ");
                      double height = input.nextDouble();               // ป้อน 2 → 2.0
                      System.out.printf("Area: %.2f%n", width * height);
                      System.out.printf("Perimeter: %.2f%n", 2 * (width + height));
                  }
              }`,
            },
        ] },
        { type: "warn", title: "ป้อนชนิดข้อมูลไม่ตรง", html: `ถ้าโปรแกรมเรียก <code>nextInt()</code> แต่ผู้ใช้ป้อน <code>12.5</code> โปรแกรมจะหยุดด้วย <code>InputMismatchException</code> (บทที่ 10 จะสอนวิธีดักจับ)` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อป้อนชนิดไม่ตรง", blocks: [
          { type: "run", label: "ทดลอง error 4.2.4", title: "ป้อนชนิดข้อมูลไม่ตรง", expect: "runtime-error", stdin: "12.5",
            code: j`
              import java.util.Scanner;

              public class ReadInteger {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Enter an integer: ");
                      int value = input.nextInt();
                      System.out.println("Value: " + value);
                  }
              }`,
            },
        ] },
        { type: "check", title: "token", html: `<p>ถ้าโปรแกรมเรียก <code>nextInt()</code> 2 ครั้ง แล้วผู้ใช้พิมพ์ <code>5 7 9</code> กด Enter ครั้งเดียว ค่าที่อ่านได้คืออะไร และ 9 ไปไหน</p>`, answer: `<p>ได้ 5 และ 7 ส่วน 9 ยังค้างอยู่ใน input รอให้คำสั่งอ่านถัดไป (ถ้ามี) อ่านต่อ</p>` },
      ],
    },
    {
      num: "4.3", toc: "ตัวเลขและข้อความ", title: "อ่านข้อความและจัดการบรรทัด",
      blocks: [
        { type: "p", html: `<code>next()</code> อ่านแค่คำเดียว ถ้าข้อความมีช่องว่าง เช่น ชื่อ-นามสกุล ให้ใช้ <code>nextLine()</code> ซึ่งอ่านทั้งบรรทัด` },
        { type: "run", title: "next() กับ nextLine()", stdin: "JHope RM",
          code: j`
            import java.util.Scanner;

            public class NextWord {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Full name: ");
                    String first = input.next();             // "JHope"   แค่คำแรก
                    String rest = input.nextLine();          // " RM"     ส่วนที่เหลือของบรรทัด
                    System.out.println("next()     = [" + first + "]");
                    System.out.println("nextLine() = [" + rest + "]");
                }
            }`,
          },

        { type: "h", text: "ปัญหา Enter ค้าง" },
        { type: "p", html: `<code>nextInt()</code> อ่านตัวเลขแต่<strong>ไม่อ่านปุ่ม Enter</strong> ที่ตามมา ถ้าเรียก <code>nextLine()</code> ต่อทันที มันจะอ่าน Enter ที่ค้างนั้นได้ข้อความว่าง` },
        { type: "html", html: fpre(`
          ผู้ใช้พิมพ์:   2 0 ⏎ J H o p e ␣ R M ⏎
          nextInt()  →  อ่าน "20"         เหลือ:  ⏎ J H o p e ␣ R M ⏎
          nextLine() →  อ่านถึง ⏎ แรก = ""  (ค่าว่าง!)
          ----------------------------------------------------------
          แก้: เรียก nextLine() ทิ้งหนึ่งครั้งหลัง nextInt()
          nextLine() →  ทิ้ง ⏎            เหลือ:  J H o p e ␣ R M ⏎
          nextLine() →  "JHope RM"  ✔`) },
        { type: "run", title: "แก้ด้วย nextLine() ทิ้งหนึ่งครั้ง", stdin: "20\nJHope RM",
          code: j`
            import java.util.Scanner;

            public class FullName {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Age: ");
                    int age = input.nextInt();
                    input.nextLine();                         // ทิ้ง Enter ที่ค้าง
                    System.out.print("Full name: ");
                    String name = input.nextLine();           // ตอนนี้ได้ "JHope RM" ครบ
                    System.out.println("Hello, " + name + "!");
                    System.out.println("Age: " + age);
                }
            }`,
          },
        { type: "warn", html: `อย่าเรียก <code>nextLine()</code> ต่อจาก <code>nextInt()</code> หรือ <code>nextDouble()</code> โดยไม่ทิ้ง Enter ก่อน ส่วน <code>next()</code> ไม่มีปัญหานี้ เพราะข้ามช่องว่างและ Enter ที่อยู่ข้างหน้าเอง` },
        { type: "more", title: "ดูตัวอย่าง: บั๊กอ่านชื่อได้ค่าว่าง", blocks: [
          { type: "run", label: "ทดลองบั๊ก 4.3.2", title: "อ่านชื่อได้ค่าว่าง", stdin: "20\nJHope",
            code: j`
              import java.util.Scanner;

              public class EmptyNameBug {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Age: ");
                      int age = input.nextInt();
                      System.out.print("Full name: ");
                      String name = input.nextLine();       // ได้ "" เพราะอ่าน Enter ที่ค้าง
                      System.out.println("Name is [" + name + "]");
                  }
              }`,
            after: "โปรแกรมไม่รอให้พิมพ์ชื่อเลย ชื่อ JHope ไม่ถูกอ่าน" },
        ] },
        { type: "tip", title: "อีกทางเลือก", html: `อ่านทุกค่าด้วย <code>nextLine()</code> แล้วแปลงเป็นตัวเลขด้วย <code>Integer.parseInt(...)</code> หรือ <code>Double.parseDouble(...)</code> จะไม่มีปัญหา Enter ค้างเลย วิธีนี้ใช้มากในบทที่ 9 และในโปรแกรม GUI` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: อ่านทุกอย่างเป็นบรรทัดแล้วแปลง", blocks: [
          { type: "run", title: "nextLine + parse", stdin: "JHope RM\n20\n3.75",
            code: j`
              import java.util.Scanner;

              public class ReadAllLines {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Full name: ");
                      String name = input.nextLine();
                      System.out.print("Age: ");
                      int age = Integer.parseInt(input.nextLine());           // "20" → 20
                      System.out.print("GPA: ");
                      double gpa = Double.parseDouble(input.nextLine());      // "3.75" → 3.75
                      System.out.printf("%s, %d years, GPA %.2f%n", name, age, gpa);
                  }
              }`,
            },
        ] },
        { type: "check", title: "Enter ค้าง", html: `<p>โปรแกรมเรียก <code>nextDouble()</code> แล้วตามด้วย <code>next()</code> จะเจอปัญหา Enter ค้างหรือไม่</p>`, answer: `<p><strong>ไม่</strong> เพราะ <code>next()</code> ข้ามช่องว่างและ Enter ที่อยู่ข้างหน้าก่อนอ่าน token ปัญหาเกิดกับ <code>nextLine()</code> เท่านั้น</p>` },
      ],
    },
    {
      num: "4.4", toc: "จัดการบรรทัดข้อมูล", title: "รวมทุกอย่าง: ออกแบบโปรแกรมโต้ตอบที่สมบูรณ์",
      blocks: [
        { type: "p", html: `โปรแกรมรับ-คำนวณ-แสดงผลที่ดี: เขียน IPO ก่อน, ถามข้อความยาวก่อนตัวเลข (หรือทิ้ง Enter ให้ถูก), บอกหน่วยใน prompt, ระวังการหารจำนวนเต็ม และแสดงผลด้วย printf` },
        { type: "run", title: "ใบเสร็จร้านกาแฟ", stdin: "Iced Latte\n2\n65",
          code: j`
            import java.util.Scanner;

            public class CafeReceipt {
                public static void main(String[] args) {
                    final double VAT = 0.07;
                    Scanner input = new Scanner(System.in);
                    System.out.print("Menu name: ");
                    String menu = input.nextLine();                 // ข้อความก่อนตัวเลข → ไม่มี Enter ค้าง
                    System.out.print("Quantity: ");
                    int qty = input.nextInt();
                    System.out.print("Price per cup: ");
                    double price = input.nextDouble();

                    double subtotal = qty * price;                  // 2 × 65 = 130
                    double vat = subtotal * VAT;                    // 9.10
                    double total = subtotal + vat;                  // 139.10

                    System.out.println("=".repeat(28));
                    System.out.printf("%-14s x%d%n", menu, qty);
                    System.out.printf("%-14s %10.2f%n", "Subtotal", subtotal);
                    System.out.printf("%-14s %10.2f%n", "VAT 7%", vat);       // "VAT 7%" เป็นค่า ไม่ต้อง %%
                    System.out.printf("%-14s %10.2f%n", "Total", total);
                    System.out.println("=".repeat(28));
                }
            }`,
          },
        { type: "try", html: `ทดสอบด้วยข้อมูลอย่างน้อย 2 ชุดที่คำนวณคำตอบด้วยมือไว้แล้ว เช่น 3 แก้ว แก้วละ 45 บาท` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: แปลงสกุลเงินพร้อมค่าธรรมเนียม", blocks: [
          { type: "run", title: "แลกเงินบาทเป็นดอลลาร์", stdin: "RM\n5000\n35.42",
            code: j`
              import java.util.Scanner;

              public class CurrencyExchange {
                  public static void main(String[] args) {
                      final double FEE_RATE = 0.015;                  // ค่าธรรมเนียม 1.5%
                      Scanner input = new Scanner(System.in);
                      System.out.print("Customer: ");
                      String customer = input.nextLine();
                      System.out.print("Thai baht: ");
                      double baht = input.nextDouble();
                      System.out.print("Rate (THB per USD): ");
                      double rate = input.nextDouble();

                      double fee = baht * FEE_RATE;                   // 75
                      double usd = (baht - fee) / rate;               // 4925 ÷ 35.42

                      System.out.printf("Hello %s%n", customer);
                      System.out.printf("Amount : %,10.2f THB%n", baht);
                      System.out.printf("Fee    : %,10.2f THB%n", fee);
                      System.out.printf("You get: %,10.2f USD%n", usd);
                  }
              }`,
            },
        ] },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "พิมพ์ผลคะแนนสองแบบ", html: `<p>มีชื่อนักศึกษา <code>Suga</code> และคะแนน <code>91</code> เก็บในตัวแปร จงแสดงผลสองบรรทัดด้วย <code>println</code> และแสดงซ้ำอีกสองบรรทัดด้วย <code>printf</code> ให้ได้ผลเหมือนกัน</p>`,
      spec: ["ใช้ตัวแปร <code>String name</code> และ <code>int score</code>", "บรรทัด 1–2 ใช้ println กับการต่อข้อความ", "บรรทัด 3–4 ใช้ printf กับ %s และ %d"],
      solution: j`
        public class PrintScore {
            public static void main(String[] args) {
                String name = "Suga";
                int score = 91;
                System.out.println("Student: " + name);  // println: ต่อข้อความด้วย +
                System.out.println("Score: " + score + " points");
                System.out.printf("Student: %s%n", name);  // printf: ใช้ %s แทนตำแหน่งค่า
                System.out.printf("Score: %d points%n", score);
            }
        }` },
    { level: 1, title: "ทักทายตามชื่อ", html: `<p>รับชื่อเล่น (คำเดียว) และปีเกิด ค.ศ. จากผู้ใช้ แล้วแสดงคำทักทายพร้อมอายุโดยประมาณในปี 2026</p>`,
      spec: ["ใช้ <code>next()</code> อ่านชื่อเล่น และ <code>nextInt()</code> อ่านปีเกิด", "อายุ = 2026 − ปีเกิด", "ข้อความ prompt ต้องตรงตามตัวอย่าง"],
      stdin: "Jungkook\n2006",
      solution: j`
        import java.util.Scanner;

        public class GreetByName {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Nickname: ");
                String nick = input.next();  // next() อ่านคำเดียว
                System.out.print("Birth year: ");
                int year = input.nextInt();
                // วงเล็บคำนวณอายุก่อนต่อข้อความ
                System.out.println("Hi " + nick + "! You are about " + (2026 - year) + " years old.");
            }
        }` },
    { level: 1, title: "พื้นที่สี่เหลี่ยม", html: `<p>รับความกว้างและความยาวเป็นทศนิยม แล้วแสดงพื้นที่และเส้นรอบรูปด้วยทศนิยม 2 ตำแหน่ง</p>`,
      spec: ["ใช้ <code>nextDouble()</code> สองครั้ง", "พื้นที่ = กว้าง × ยาว, เส้นรอบรูป = 2 × (กว้าง + ยาว)", "ใช้ <code>%.2f</code>"],
      stdin: "3.5\n7.25",
      solution: j`
        import java.util.Scanner;

        public class RectArea {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Width: ");
                double w = input.nextDouble();
                System.out.print("Length: ");
                double l = input.nextDouble();
                // คำนวณใน printf ได้เลย
                System.out.printf("Area: %.2f%n", w * l);
                System.out.printf("Perimeter: %.2f%n", 2 * (w + l));
            }
        }` },
    { level: 2, title: "แปลงอุณหภูมิ", html: `<p>รับอุณหภูมิองศาเซลเซียส คำนวณฟาเรนไฮต์ด้วยสูตร F = C × 9 / 5 + 32 และเคลวินด้วยสูตร K = C + 273.15 แล้วแสดงคำตอบทศนิยม 1 ตำแหน่ง</p>`,
      spec: ["รับค่าเป็น double", "แสดงผลทั้งสามหน่วยในบรรทัดเดียวด้วย printf เดียว", "ทดสอบกับ 36.6 และ -40 (ที่ -40 องศา C และ F เท่ากัน)"],
      runs: ["36.6", "-40"],
      solution: j`
        import java.util.Scanner;

        public class TempConvert {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Celsius: ");
                double c = input.nextDouble();
                double f = c * 9 / 5 + 32;  // ×9 → ÷5 → +32
                double k = c + 273.15;      // องศาเคลวิน
                System.out.printf("%.1f C = %.1f F = %.1f K%n", c, f, k);
            }
        }` },
    { level: 2, title: "บัตรแนะนำตัว", html: `<p>ถามอายุเป็นจำนวนเต็มก่อน แล้วถามชื่อเต็มที่มีช่องว่าง และคณะ (มีช่องว่างได้) แสดงประโยคแนะนำตัวที่มีทั้งชื่อ อายุ และคณะ</p>`,
      spec: ["ลำดับการถาม: อายุ → ชื่อเต็ม → คณะ", "ต้องจัดการ Enter ที่ค้างหลัง nextInt() ให้ถูกต้อง", "ชื่อและคณะต้องได้ครบทุกคำ"],
      stdin: "19\nJHope Jung\nFaculty of Science",
      solution: j`
        import java.util.Scanner;

        public class IntroCard {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Age: ");
                int age = input.nextInt();
                input.nextLine();  // ทิ้ง Enter ที่ค้างจาก nextInt()
                System.out.print("Full name: ");
                // อ่านทั้งบรรทัด (มีช่องว่างได้)
                String name = input.nextLine();
                System.out.print("Faculty: ");
                String faculty = input.nextLine();
                System.out.printf("Hello, I am %s, %d years old, from %s.%n", name, age, faculty);
            }
        }`, explain: "ต้องมี <code>input.nextLine();</code> ทิ้งหนึ่งครั้งหลัง nextInt() เท่านั้น การอ่านชื่อและคณะต่อกันด้วย nextLine() ไม่มีปัญหา" },
    { level: 2, title: "ใบเสร็จสินค้า", html: `<p>รับชื่อสินค้า (มีช่องว่างได้) จำนวนชิ้น และราคาต่อชิ้น แล้วแสดงใบเสร็จที่มีชื่อสินค้า จำนวน ราคาต่อชิ้น และยอดรวม จัดคอลัมน์ให้ตรงกัน</p>`,
      spec: ["อ่านชื่อสินค้าก่อนด้วย nextLine()", "หัวข้อชิดซ้ายกว้าง 12 (<code>%-12s</code>) ตัวเลขชิดขวากว้าง 10", "ยอดรวมแสดงทศนิยม 2 ตำแหน่งพร้อมจุลภาค"],
      stdin: "USB Cable\n12\n159.5",
      solution: j`
        import java.util.Scanner;

        public class ItemReceipt {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Item: ");
                // อ่านชื่อสินค้าก่อนตัวเลข
                String item = input.nextLine();
                System.out.print("Quantity: ");
                int qty = input.nextInt();
                System.out.print("Unit price: ");
                double price = input.nextDouble();
                double total = qty * price;
                System.out.println("-".repeat(23));
                System.out.printf("%-12s %10s%n", "Item", item);
                System.out.printf("%-12s %10d%n", "Quantity", qty);
                System.out.printf("%-12s %10.2f%n", "Unit price", price);
                // %,10.2f มีตัวคั่นหลักพัน
                System.out.printf("%-12s %,10.2f%n", "Total", total);
                System.out.println("-".repeat(23));
            }
        }` },
    { level: 2, title: "เวลาเดินทาง", html: `<p>รับระยะทาง (กิโลเมตร) และความเร็วเฉลี่ย (กม./ชม.) คำนวณเวลาที่ใช้ แล้วแสดงเป็น <strong>ชั่วโมงทศนิยม</strong> และในรูป <strong>ชั่วโมง + นาที</strong> (ปัดนาทีเป็นจำนวนเต็มด้วย Math.round)</p>`,
      spec: ["เวลา (ชม.) = ระยะทาง ÷ ความเร็ว", "แปลงเป็นนาทีทั้งหมด = Math.round(เวลา × 60) แล้วแยกชั่วโมงและนาทีด้วย / และ %", "Math.round คืนค่า long ให้ cast เป็น int"],
      stdin: "350\n80",
      solution: j`
        import java.util.Scanner;

        public class TravelTime {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Distance (km): ");
                double distance = input.nextDouble();
                System.out.print("Speed (km/h): ");
                double speed = input.nextDouble();
                // เวลา = ระยะทาง ÷ ความเร็ว
                double hours = distance / speed;
                // แปลงเป็นนาทีแล้วปัดเศษ
                int totalMinutes = (int) Math.round(hours * 60);
                System.out.printf("Time: %.2f hours%n", hours);
                // / 60 = ชั่วโมง, % 60 = นาทีที่เหลือ
                System.out.printf("Time: %d h %d min%n", totalMinutes / 60, totalMinutes % 60);
            }
        }` },
    { level: 3, title: "แบ่งจ่ายค่าอาหาร", html: `<p>กลุ่มเพื่อนไปทานอาหาร รับยอดค่าอาหาร จำนวนคน และเปอร์เซ็นต์ทิป คำนวณค่าทิป ยอดรวม และค่าใช้จ่ายต่อคน ร้านรับเฉพาะเงินจำนวนเต็ม จึงให้แต่ละคน<strong>จ่ายเป็นจำนวนเต็มที่ปัดขึ้น</strong> แล้วบอกว่าเงินที่เก็บได้เกินยอดจริงเท่าไร</p>`,
      spec: ["ทิป = ยอด × เปอร์เซ็นต์ ÷ 100", "ต่อคน = ยอดรวม ÷ จำนวนคน", "ปัดขึ้นด้วย <code>(int) Math.ceil(ต่อคน)</code>", "เงินเกิน = ปัดขึ้น × จำนวนคน − ยอดรวม", "จัดผลลัพธ์เป็นตารางตามตัวอย่าง"],
      stdin: "1875\n4\n10",
      solution: j`
        import java.util.Scanner;

        public class SplitBill {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Food total: ");
                double food = input.nextDouble();
                System.out.print("People: ");
                int people = input.nextInt();
                System.out.print("Tip (%): ");
                double tipPercent = input.nextDouble();

                // ทิปคิดเป็น % ของค่าอาหาร
                double tip = food * tipPercent / 100;
                double total = food + tip;
                // ค่าที่แต่ละคนต้องจ่ายจริง
                double each = total / people;
                // ceil ปัดขึ้นเป็นจำนวนเต็ม
                int eachRounded = (int) Math.ceil(each);
                // เงินที่เก็บเกินมา
                double extra = eachRounded * people - total;

                System.out.printf("%-16s %10.2f%n", "Tip", tip);
                System.out.printf("%-16s %10.2f%n", "Total", total);
                System.out.printf("%-16s %10.2f%n", "Exact per person", each);
                System.out.printf("%-16s %10d%n", "Each pays", eachRounded);
                System.out.printf("%-16s %10.2f%n", "Extra collected", extra);
            }
        }` },
    { level: 3, title: "สรุปผลการเรียนรายวิชา", html: `<p>รับชื่อวิชา (มีช่องว่าง) ชื่อนักศึกษา (มีช่องว่าง) และคะแนน 3 ส่วน: เก็บ (เต็ม 40) กลางภาค (เต็ม 30) ปลายภาค (เต็ม 30) คำนวณคะแนนรวม ร้อยละของแต่ละส่วนเทียบกับคะแนนเต็มของส่วนนั้น แล้วพิมพ์รายงานตามตัวอย่าง</p>`,
      spec: ["ลำดับการถาม: ชื่อวิชา → ชื่อนักศึกษา → คะแนน 3 ส่วนในบรรทัดเดียว", "ร้อยละ = คะแนน ÷ คะแนนเต็ม × 100 แสดงทศนิยม 1 ตำแหน่ง", "รายงานมีกรอบด้วย <code>=</code> และคอลัมน์ตรงกัน", "ใช้ <code>%%</code> แสดงเครื่องหมาย %"],
      stdin: "Computer Programming\nJHope Jung\n35 21.5 24",
      solution: j`
        import java.util.Scanner;

        public class CourseReport {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Course: ");
                String course = input.nextLine();
                System.out.print("Student: ");
                String student = input.nextLine();
                System.out.print("Scores (work mid final): ");
                // 3 ค่าอยู่ในบรรทัดเดียวกันได้
                double work = input.nextDouble();
                double mid = input.nextDouble();
                double fin = input.nextDouble();
                double total = work + mid + fin;

                System.out.println("=".repeat(36));
                System.out.printf("%s%n%s%n", course, student);
                System.out.println("-".repeat(36));
                // %% ในข้อความ = เครื่องหมาย %
                System.out.printf("%-8s %6.1f / 40  (%5.1f%%)%n", "Work", work, work / 40 * 100);
                System.out.printf("%-8s %6.1f / 30  (%5.1f%%)%n", "Midterm", mid, mid / 30 * 100);
                System.out.printf("%-8s %6.1f / 30  (%5.1f%%)%n", "Final", fin, fin / 30 * 100);
                System.out.println("-".repeat(36));
                System.out.printf("%-8s %6.1f / 100%n", "Total", total);
                System.out.println("=".repeat(36));
            }
        }`, explain: "ชื่อวิชาและชื่อนักศึกษาอ่านด้วย nextLine() ก่อนตัวเลข จึงไม่มีปัญหา Enter ค้าง คะแนน 3 ส่วนอ่านด้วย nextDouble() ได้แม้อยู่ในบรรทัดเดียว" },
    { level: 3, title: "ผ่อนชำระสินค้า", html: `<p>ร้านให้ผ่อนสินค้าแบบดอกเบี้ยคงที่ รับชื่อสินค้า (มีช่องว่าง) ราคา เงินดาวน์ (%) จำนวนเดือน และดอกเบี้ยต่อเดือน (%) แล้วคำนวณ</p><ul><li>เงินดาวน์ = ราคา × ดาวน์% ÷ 100</li><li>ยอดจัด = ราคา − เงินดาวน์</li><li>ดอกเบี้ยรวม = ยอดจัด × ดอกเบี้ย% ÷ 100 × จำนวนเดือน</li><li>ค่างวด = (ยอดจัด + ดอกเบี้ยรวม) ÷ จำนวนเดือน</li><li>ราคารวมที่จ่ายจริง = เงินดาวน์ + ยอดจัด + ดอกเบี้ยรวม</li></ul>`,
      spec: ["ทุกจำนวนเงินแสดงด้วย <code>%,.2f</code>", "แสดงว่าจ่ายแพงกว่าราคาเงินสดกี่บาท และคิดเป็นกี่ %", "ทดสอบตามตัวอย่าง แล้วลองดาวน์ 0% ด้วย"],
      stdin: "Smart Phone X\n32900\n20\n10\n1.25",
      solution: j`
        import java.util.Scanner;

        public class Installment {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Product: ");
                String product = input.nextLine();
                System.out.print("Price: ");
                double price = input.nextDouble();
                System.out.print("Down payment (%): ");
                double downPercent = input.nextDouble();
                System.out.print("Months: ");
                int months = input.nextInt();
                System.out.print("Interest per month (%): ");
                double rate = input.nextDouble();

                // เงินดาวน์
                double down = price * downPercent / 100;
                // ยอดที่ต้องผ่อน
                double financed = price - down;
                // ดอกเบี้ยคงที่ต่อเดือน × จำนวนเดือน
                double interest = financed * rate / 100 * months;
                // ค่างวดต่อเดือน
                double monthly = (financed + interest) / months;
                double paid = down + financed + interest;
                double extra = paid - price;  // จ่ายเกินราคาเท่าไร

                System.out.println("== " + product + " ==");
                System.out.printf("Down payment : %,12.2f%n", down);
                System.out.printf("Financed     : %,12.2f%n", financed);
                System.out.printf("Interest     : %,12.2f%n", interest);
                System.out.printf("Monthly x %-3d: %,12.2f%n", months, monthly);
                System.out.printf("Total paid   : %,12.2f%n", paid);
                System.out.printf("Extra cost   : %,12.2f (%.2f%%)%n", extra, extra / price * 100);
            }
        }` },
  ],
};
