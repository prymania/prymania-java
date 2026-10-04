import { j, c, pre } from "../lib.mjs";

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
        { type: "p", html: `<code>print</code> แสดงข้อความโดยไม่ขึ้นบรรทัดใหม่, <code>println</code> แสดงแล้วขึ้นบรรทัดใหม่ ส่วน <code>printf</code> (print formatted) ใช้<strong>แม่แบบ (format string)</strong> ที่มีช่องว่างให้เติมค่า เรียกว่า format specifier ทำให้กำหนดจำนวนทศนิยม ความกว้าง และการจัดชิดได้` },
        { type: "table", title: "Format specifier ที่ใช้บ่อย", head: ["specifier", "ใช้กับ", "ตัวอย่าง", "ผลลัพธ์"], rows: [
          ["<code>%d</code>", "จำนวนเต็ม (int, long)", "<code>printf(\"%d\", 42)</code>", "42"],
          ["<code>%f</code>", "ทศนิยม (double) ค่าเริ่มต้น 6 ตำแหน่ง", "<code>printf(\"%f\", 3.5)</code>", "3.500000"],
          ["<code>%.2f</code>", "ทศนิยม 2 ตำแหน่ง (ปัดเศษ)", "<code>printf(\"%.2f\", 3.456)</code>", "3.46"],
          ["<code>%s</code>", "ข้อความ (String)", "<code>printf(\"%s\", \"Mali\")</code>", "Mali"],
          ["<code>%c</code>", "อักขระ (char)", "<code>printf(\"%c\", 'A')</code>", "A"],
          ["<code>%n</code>", "ขึ้นบรรทัดใหม่", "<code>printf(\"A%nB\")</code>", "A↵B"],
          ["<code>%,d</code>", "จำนวนเต็มมีจุลภาคคั่นหลักพัน", "<code>printf(\"%,d\", 1500000)</code>", "1,500,000"],
          ["<code>%8d</code> / <code>%-8s</code>", "กว้าง 8 ช่อง ชิดขวา / ชิดซ้าย (มี -)", "<code>printf(\"[%5d]\", 42)</code>", "[&nbsp;&nbsp;&nbsp;42]"],
        ] },
        { type: "run", title: "print ต่อกับ println", level: "พื้นฐาน",
          concept: "print ไม่ขึ้นบรรทัด จึงใช้ทำ prompt ที่ให้ผู้ใช้พิมพ์ต่อท้ายในบรรทัดเดียวกัน",
          code: j`
            public class PrintExample {
                public static void main(String[] args) {
                    System.out.print("Good ");
                    System.out.println("morning");
                    System.out.println("Next line");
                }
            }`,
          steps: ["print \"Good \" แล้วเคอร์เซอร์รออยู่บรรทัดเดิม", "println \"morning\" ต่อท้าย แล้วขึ้นบรรทัด", "\"Next line\" อยู่บรรทัดใหม่"] },
        { type: "run", title: "printf กับ specifier พื้นฐาน", level: "พื้นฐาน",
          concept: "เขียนแม่แบบหนึ่งชุด แล้วส่งค่าตามลำดับ specifier ตัวที่ 1 ได้ค่าแรก ตัวที่ 2 ได้ค่าที่สอง …",
          code: j`
            public class PrintfBasics {
                public static void main(String[] args) {
                    String name = "Mali";
                    int score = 87;
                    double average = 3.456;
                    System.out.printf("Student: %s%n", name);
                    System.out.printf("Score: %d points%n", score);
                    System.out.printf("Average: %.2f%n", average);
                    System.out.printf("%s got %d (avg %.1f)%n", name, score, average);
                }
            }`,
          steps: ["<code>%s</code> ถูกแทนด้วย Mali", "<code>%d</code> ถูกแทนด้วย 87", "<code>%.2f</code> ปัด 3.456 → 3.46", "บรรทัดสุดท้ายมี 3 specifier จับคู่กับ name, score, average ตามลำดับ", "<code>%n</code> ขึ้นบรรทัด (printf ไม่ขึ้นบรรทัดเองเหมือน println)"] },
        { type: "run", title: "จัดรูปแบบราคารวม", level: "ต่อยอด",
          concept: "เงินควรแสดง 2 ตำแหน่งเสมอ และตัวเลขใหญ่ควรมีจุลภาคคั่นหลักพัน",
          code: j`
            public class PrintTotal {
                public static void main(String[] args) {
                    int quantity = 3;
                    double unitPrice = 12.5;
                    double total = quantity * unitPrice;
                    System.out.println("Total (println): " + total);
                    System.out.printf("Total (printf): %.2f baht%n", total);

                    double salary = 1234567.891;
                    System.out.printf("Salary: %,.2f baht%n", salary);
                    System.out.printf("Discount: %d%%%n", 15);
                }
            }`,
          steps: ["println แสดง 37.5 (ทศนิยมตามค่าจริง)", "printf <code>%.2f</code> แสดง 37.50", "<code>%,.2f</code> → 1,234,567.89", "ถ้าต้องการแสดงเครื่องหมาย % ให้เขียน <code>%%</code>"],
          tryIt: "เปลี่ยน %.2f เป็น %.1f หรือ %.0f แล้วเปรียบเทียบผล" },
        { type: "run", title: "ตารางที่คอลัมน์ตรงกันด้วยความกว้าง", level: "ประยุกต์",
          concept: "ใส่ตัวเลขความกว้างหน้า specifier: <code>%-10s</code> ข้อความกว้าง 10 ชิดซ้าย, <code>%5d</code> ตัวเลขกว้าง 5 ชิดขวา, <code>%8.2f</code> กว้าง 8 ทศนิยม 2",
          code: j`
            public class AlignedTable {
                public static void main(String[] args) {
                    System.out.printf("%-10s %5s %8s%n", "Item", "Qty", "Price");
                    System.out.printf("%-10s %5d %8.2f%n", "Pen", 12, 5.5);
                    System.out.printf("%-10s %5d %8.2f%n", "Notebook", 3, 45.0);
                    System.out.printf("%-10s %5d %8.2f%n", "Bag", 1, 399.75);
                    System.out.println("-".repeat(25));
                    System.out.printf("%-10s %14.2f%n", "Total", 12 * 5.5 + 3 * 45.0 + 399.75);
                }
            }`,
          steps: ["ชื่อสินค้าชิดซ้ายกว้าง 10 ช่อง ไม่ว่าชื่อยาวเท่าไร คอลัมน์ถัดไปก็เริ่มที่เดียวกัน", "ตัวเลขชิดขวา หลักหน่วยจึงตรงกัน อ่านง่าย", "<code>\"-\".repeat(25)</code> สร้างเส้น 25 ตัว"] },
        { type: "run", label: "ทดลอง error 4.1.5", title: "specifier ไม่ตรงชนิด", level: "ท้าทาย", expect: "runtime-error",
          concept: "printf ตรวจชนิดตอน<strong>รัน</strong> ไม่ใช่ตอนคอมไพล์ ถ้าใช้ <code>%d</code> กับ double โปรแกรมจะหยุดด้วย <code>IllegalFormatConversionException</code>",
          code: j`
            public class WrongSpecifier {
                public static void main(String[] args) {
                    double price = 19.5;
                    System.out.printf("Price: %.2f%n", price);
                    System.out.printf("Price: %d%n", price);
                }
            }`,
          steps: ["บรรทัดแรกถูกต้อง พิมพ์ 19.50", "บรรทัดที่สองใช้ %d กับ double → <code>d != java.lang.Double</code>", "จำคู่: %d ↔ int, %f ↔ double, %s ↔ String"] },
        { type: "check", title: "ทำนาย printf", html: pre(`
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
        { type: "steps", title: "ขั้นตอนใช้ Scanner", items: [
          "นำเข้าคลาสไว้บนสุดของไฟล์: <code>import java.util.Scanner;</code>",
          "สร้างออบเจ็กต์หนึ่งครั้งใน main: <code>Scanner input = new Scanner(System.in);</code>",
          "พิมพ์ prompt ด้วย <code>print</code> เพื่อบอกผู้ใช้ว่าต้องป้อนอะไร",
          "เรียกเมธอดอ่านให้ตรงกับชนิด แล้วเก็บในตัวแปร: <code>int age = input.nextInt();</code>",
          "นำค่าไปคำนวณและแสดงผล",
        ] },
        { type: "table", head: ["เมธอด", "อ่านอะไร", "เก็บใน"], rows: [
          ["<code>nextInt()</code>", "จำนวนเต็มหนึ่งค่า (token)", "<code>int</code>"],
          ["<code>nextDouble()</code>", "ทศนิยมหนึ่งค่า (รับ 2 ก็ได้ จะกลายเป็น 2.0)", "<code>double</code>"],
          ["<code>next()</code>", "ข้อความหนึ่งคำ (จนถึงช่องว่าง)", "<code>String</code>"],
          ["<code>nextLine()</code>", "ข้อความทั้งบรรทัด (รวมช่องว่าง)", "<code>String</code>"],
          ["<code>nextBoolean()</code>", "true หรือ false", "<code>boolean</code>"],
        ] },
        { type: "run", title: "รับจำนวนเต็มหนึ่งค่า", level: "พื้นฐาน",
          concept: "โปรแกรมหยุดรอที่ <code>nextInt()</code> จนผู้ใช้พิมพ์แล้วกด Enter",
          stdin: "2007",
          code: j`
            import java.util.Scanner;

            public class AgeFromYear {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Birth year (A.D.): ");
                    int birthYear = input.nextInt();
                    int age = 2026 - birthYear;
                    System.out.println("You are about " + age + " years old.");
                }
            }`,
          steps: ["พิมพ์ prompt แล้วรอ", "ผู้ใช้ป้อน 2007 → birthYear = 2007", "age = 2026 − 2007 = 19"] },
        { type: "run", title: "รับทศนิยมสองค่าแล้วคำนวณ", level: "ต่อยอด",
          concept: "ผู้ใช้ต้องป้อนตามลำดับที่โปรแกรมถาม และใช้จุดเป็นทศนิยม (4.5)",
          stdin: "4.5\n2",
          code: j`
            import java.util.Scanner;

            public class RectangleArea {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Width: ");
                    double width = input.nextDouble();
                    System.out.print("Height: ");
                    double height = input.nextDouble();
                    double area = width * height;
                    double perimeter = 2 * (width + height);
                    System.out.printf("Area: %.2f%n", area);
                    System.out.printf("Perimeter: %.2f%n", perimeter);
                }
            }`,
          steps: ["width = 4.5", "height = 2 (nextDouble รับเลขจำนวนเต็มได้ กลายเป็น 2.0)", "พื้นที่ 9.00 และเส้นรอบรูป 13.00"] },
        { type: "run", title: "ป้อนหลายค่าในบรรทัดเดียว", level: "ประยุกต์",
          concept: "nextInt/nextDouble อ่านทีละ <strong>token</strong> (คั่นด้วยช่องว่างหรือ Enter) ผู้ใช้จึงพิมพ์ <code>8 9 10</code> ในบรรทัดเดียวได้",
          stdin: "8 9 10",
          code: j`
            import java.util.Scanner;

            public class ThreeScores {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Enter 3 scores: ");
                    int a = input.nextInt();
                    int b = input.nextInt();
                    int c = input.nextInt();
                    int sum = a + b + c;
                    double average = sum / 3.0;
                    System.out.printf("Sum = %d, Average = %.2f%n", sum, average);
                }
            }`,
          steps: ["nextInt ครั้งแรกได้ 8 ส่วน \"9 10\" ยังค้างใน input", "ครั้งที่สองได้ 9 และครั้งที่สามได้ 10 โดยไม่ต้องรอผู้ใช้อีก", "หารด้วย 3.0 เพื่อให้ได้ทศนิยม"] },
        { type: "run", label: "ทดลอง error 4.2.4", title: "ป้อนชนิดข้อมูลไม่ตรง", level: "ประยุกต์", expect: "runtime-error", stdin: "12.5",
          concept: "โปรแกรมคาดว่าจะได้จำนวนเต็ม ถ้าผู้ใช้ป้อน 12.5 จะเกิด <code>InputMismatchException</code> ระหว่างรัน",
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
          steps: ["nextInt พบ token \"12.5\" ซึ่งไม่ใช่จำนวนเต็ม", "โปรแกรมหยุดทันที บรรทัด Value ไม่ทำงาน", "แก้: ป้อน 12 หรือเปลี่ยนเป็น <code>double</code> + <code>nextDouble()</code> (บทที่ 10 จะสอนดักจับ error แบบนี้)"] },
        { type: "note", title: "ใช้ Scanner ตัวเดียวทั้งโปรแกรม", html: `<p>สร้าง <code>new Scanner(System.in)</code> เพียงครั้งเดียวแล้วใช้ซ้ำ ไม่ต้องสร้างใหม่ทุกครั้งที่จะอ่าน และไม่ต้องเรียก <code>close()</code> กับ Scanner ของ System.in ในโปรแกรมฝึกหัด</p>` },
        { type: "check", title: "token", html: `<p>ถ้าโปรแกรมเรียก <code>nextInt()</code> 2 ครั้ง แล้วผู้ใช้พิมพ์ <code>5 7 9</code> กด Enter ครั้งเดียว ค่าที่อ่านได้คืออะไร และ 9 ไปไหน</p>`, answer: `<p>ได้ 5 และ 7 ส่วน 9 ยังค้างอยู่ใน input รอให้คำสั่งอ่านถัดไป (ถ้ามี) อ่านต่อ</p>` },
      ],
    },
    {
      num: "4.3", toc: "ตัวเลขและข้อความ", title: "อ่านข้อความและจัดการบรรทัด",
      blocks: [
        { type: "p", html: `<code>next()</code> อ่านเพียงคำเดียว ถ้าข้อความมีช่องว่างให้ใช้ <code>nextLine()</code> ซึ่งอ่านทั้งบรรทัด หากอ่านตัวเลขด้วย <code>nextInt()</code> ก่อน ตัวกด Enter ที่ตามมาจะยังค้างอยู่และถูก <code>nextLine()</code> อ่านทันที` },
        { type: "concept", title: "ภาพในหน่วยความจำ: เกิดอะไรขึ้นกับ Enter", html: pre(`
          ผู้ใช้พิมพ์:   2 0 ⏎ M a l i ␣ N i d a ⏎
          nextInt()  →  อ่าน "20"         เหลือ:  ⏎ M a l i ␣ N i d a ⏎
          nextLine() →  อ่านถึง ⏎ แรก = ""  (ค่าว่าง!)
          ----------------------------------------------------------
          แก้: เรียก nextLine() ทิ้งหนึ่งครั้งหลัง nextInt()
          nextLine() →  ทิ้ง ⏎            เหลือ:  M a l i ␣ N i d a ⏎
          nextLine() →  "Mali Nida"  ✔`) },
        { type: "run", title: "next() อ่านแค่คำแรก", level: "พื้นฐาน",
          concept: "เมื่อชื่อมีช่องว่าง next() จะได้แค่คำแรก ส่วนที่เหลือค้างอยู่",
          stdin: "Mali Nida",
          code: j`
            import java.util.Scanner;

            public class NextWord {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Full name: ");
                    String first = input.next();
                    String rest = input.nextLine();
                    System.out.println("next()     = [" + first + "]");
                    System.out.println("nextLine() = [" + rest + "]");
                }
            }`,
          steps: ["next() ได้ \"Mali\"", "nextLine() อ่านส่วนที่เหลือของบรรทัดคือ \" Nida\" (มีช่องว่างนำหน้า)", "วงเล็บ [ ] ช่วยให้เห็นช่องว่างชัดเจน"] },
        { type: "run", label: "ทดลองบั๊ก 4.3.2", title: "อ่านชื่อได้ค่าว่าง", level: "ต่อยอด", stdin: "20\nMali",
          concept: "nextLine() ต่อจาก nextInt() ทันที จะอ่านได้ Enter ที่ค้าง → ค่าว่าง และโปรแกรมไม่รอให้ผู้ใช้พิมพ์ชื่อ",
          code: j`
            import java.util.Scanner;

            public class EmptyNameBug {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Age: ");
                    int age = input.nextInt();
                    System.out.print("Full name: ");
                    String name = input.nextLine();
                    System.out.println("Name is [" + name + "]");
                }
            }`,
          steps: ["nextInt อ่าน 20 แต่ไม่อ่าน Enter", "nextLine อ่านถึง Enter ที่ค้าง → \"\" ทันที", "Output เห็น \"Full name: \" ตามด้วย \"Name is []\" โดยที่ชื่อ Mali ไม่ถูกอ่านเลย"] },
        { type: "run", title: "แก้บั๊กด้วย nextLine() ทิ้งหนึ่งครั้ง", level: "ต่อยอด", stdin: "20\nMali Nida",
          concept: "หลังอ่านตัวเลข ให้เรียก <code>input.nextLine();</code> เปล่า ๆ เพื่อเคลียร์ Enter ก่อนอ่านข้อความทั้งบรรทัด",
          code: j`
            import java.util.Scanner;

            public class FullName {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Age: ");
                    int age = input.nextInt();
                    input.nextLine();               // เคลียร์ Enter ที่ค้าง
                    System.out.print("Full name: ");
                    String name = input.nextLine();
                    System.out.println("Hello, " + name + "!");
                    System.out.println("Age: " + age);
                }
            }`,
          steps: ["nextInt อ่าน 20", "nextLine แรกทิ้ง Enter", "nextLine ที่สองอ่าน \"Mali Nida\" ครบพร้อมช่องว่าง"] },
        { type: "run", title: "อีกทางเลือก: อ่านทุกอย่างเป็นบรรทัดแล้วแปลง", level: "ประยุกต์", stdin: "Mali Nida\n20\n3.75",
          concept: "อ่านทุกค่าด้วย nextLine() แล้วแปลงเป็นตัวเลขด้วย <code>Integer.parseInt</code> / <code>Double.parseDouble</code> — ไม่มีปัญหา Enter ค้างเลย",
          code: j`
            import java.util.Scanner;

            public class ReadAllLines {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Full name: ");
                    String name = input.nextLine();
                    System.out.print("Age: ");
                    int age = Integer.parseInt(input.nextLine());
                    System.out.print("GPA: ");
                    double gpa = Double.parseDouble(input.nextLine());
                    System.out.printf("%s, %d years, GPA %.2f%n", name, age, gpa);
                }
            }`,
          steps: ["ทุกคำสั่งอ่านใช้ nextLine() จึงกิน Enter ทุกครั้ง", "<code>Integer.parseInt(\"20\")</code> แปลงข้อความเป็น int 20", "<code>Double.parseDouble(\"3.75\")</code> แปลงเป็น double"],
          after: "วิธีนี้จะใช้มากในบทที่ 9 (String) และในโปรแกรม GUI ที่ช่องกรอกข้อมูลให้ค่าเป็นข้อความเสมอ" },
        { type: "note", title: "จำเป็นคู่", html: `<p>ใช้ <code>next()</code> สำหรับ token เดียว เช่น รหัสที่ไม่มีช่องว่าง และใช้ <code>nextLine()</code> สำหรับชื่อเต็มหรือประโยค อย่าเรียก <code>nextLine()</code> ต่อจาก <code>nextInt()</code>/<code>nextDouble()</code> โดยไม่จัดการ Enter ที่ค้าง</p>` },
        { type: "check", title: "Enter ค้าง", html: `<p>โปรแกรมเรียก <code>nextDouble()</code> แล้วตามด้วย <code>next()</code> จะเจอปัญหา Enter ค้างหรือไม่</p>`, answer: `<p><strong>ไม่</strong> เพราะ <code>next()</code> ข้ามช่องว่างและ Enter ที่อยู่ข้างหน้าก่อนอ่าน token ปัญหาเกิดกับ <code>nextLine()</code> เท่านั้น</p>` },
      ],
    },
    {
      num: "4.4", toc: "จัดการบรรทัดข้อมูล", title: "รวมทุกอย่าง: ออกแบบโปรแกรมโต้ตอบที่สมบูรณ์",
      blocks: [
        { type: "steps", title: "ขั้นตอนเขียนโปรแกรมรับ-คำนวณ-แสดงผล", items: [
          "เขียน IPO: ต้องถามอะไรบ้าง ชนิดอะไร ต้องแสดงอะไร",
          "ตัดสินใจลำดับการถาม — ถ้ามีทั้งข้อความยาวและตัวเลข ให้ระวัง Enter ค้าง",
          "เขียน prompt ที่บอกหน่วย เช่น <code>Weight (kg): </code>",
          "คำนวณโดยระวังการหารจำนวนเต็ม",
          "แสดงผลด้วย printf พร้อมหน่วยและจำนวนทศนิยมที่เหมาะสม",
          "ทดสอบด้วยข้อมูลอย่างน้อย 2 ชุดที่คำนวณคำตอบด้วยมือไว้แล้ว",
        ] },
        { type: "run", title: "ใบเสร็จร้านกาแฟ", level: "ประยุกต์", stdin: "Iced Latte\n2\n65",
          concept: "รับชื่อสินค้า (มีช่องว่าง) จำนวน และราคา แล้วคิด VAT 7% แสดงเป็นตาราง",
          code: j`
            import java.util.Scanner;

            public class CafeReceipt {
                public static void main(String[] args) {
                    final double VAT = 0.07;
                    Scanner input = new Scanner(System.in);
                    System.out.print("Menu name: ");
                    String menu = input.nextLine();
                    System.out.print("Quantity: ");
                    int qty = input.nextInt();
                    System.out.print("Price per cup: ");
                    double price = input.nextDouble();

                    double subtotal = qty * price;
                    double vat = subtotal * VAT;
                    double total = subtotal + vat;

                    System.out.println("=".repeat(28));
                    System.out.printf("%-14s x%d%n", menu, qty);
                    System.out.printf("%-14s %10.2f%n", "Subtotal", subtotal);
                    System.out.printf("%-14s %10.2f%n", "VAT 7%", vat);
                    System.out.printf("%-14s %10.2f%n", "Total", total);
                    System.out.println("=".repeat(28));
                }
            }`,
          steps: ["อ่านชื่อเมนูก่อนด้วย nextLine() — ยังไม่มีตัวเลขมาก่อน จึงไม่มี Enter ค้าง", "อ่านจำนวนและราคาด้วย nextInt/nextDouble", "คำนวณ 2 × 65 = 130, VAT 9.10, รวม 139.10", "จัดคอลัมน์ด้วย %-14s และ %10.2f"],
          after: "สังเกต <code>\"VAT 7%\"</code> ถูกส่งเป็น<em>ค่า</em>ให้ %s จึงไม่ต้องเขียน %% — ต้องใช้ %% เฉพาะเมื่อ % อยู่ใน format string" },
        { type: "run", title: "แปลงสกุลเงินพร้อมค่าธรรมเนียม", level: "ท้าทาย", stdin: "Nida\n5000\n35.42",
          concept: "โจทย์หลายขั้น: คำนวณค่าธรรมเนียม 1.5% ก่อน แล้วจึงแปลงเงินที่เหลือ แสดงผลทั้งจำนวนเต็มคั่นหลักพันและทศนิยม",
          code: j`
            import java.util.Scanner;

            public class CurrencyExchange {
                public static void main(String[] args) {
                    final double FEE_RATE = 0.015;
                    Scanner input = new Scanner(System.in);
                    System.out.print("Customer: ");
                    String customer = input.nextLine();
                    System.out.print("Thai baht: ");
                    double baht = input.nextDouble();
                    System.out.print("Rate (THB per USD): ");
                    double rate = input.nextDouble();

                    double fee = baht * FEE_RATE;
                    double usd = (baht - fee) / rate;

                    System.out.printf("Hello %s%n", customer);
                    System.out.printf("Amount : %,10.2f THB%n", baht);
                    System.out.printf("Fee    : %,10.2f THB%n", fee);
                    System.out.printf("You get: %,10.2f USD%n", usd);
                }
            }`,
          steps: ["fee = 5000 × 0.015 = 75", "เหลือ 4925 บาท ÷ 35.42 ≈ 139.05 USD", "<code>%,10.2f</code> = มีจุลภาค กว้าง 10 ทศนิยม 2"] },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "พิมพ์ผลคะแนนสองแบบ", html: `<p>มีชื่อนักศึกษา <code>Beam</code> และคะแนน <code>91</code> เก็บในตัวแปร จงแสดงผลสองบรรทัดด้วย <code>println</code> และแสดงซ้ำอีกสองบรรทัดด้วย <code>printf</code> ให้ได้ผลเหมือนกัน</p>`,
      spec: ["ใช้ตัวแปร <code>String name</code> และ <code>int score</code>", "บรรทัด 1–2 ใช้ println กับการต่อข้อความ", "บรรทัด 3–4 ใช้ printf กับ %s และ %d"],
      solution: j`
        public class PrintScore {
            public static void main(String[] args) {
                String name = "Beam";
                int score = 91;
                System.out.println("Student: " + name);
                System.out.println("Score: " + score + " points");
                System.out.printf("Student: %s%n", name);
                System.out.printf("Score: %d points%n", score);
            }
        }` },
    { level: 1, title: "ทักทายตามชื่อ", html: `<p>รับชื่อเล่น (คำเดียว) และปีเกิด ค.ศ. จากผู้ใช้ แล้วแสดงคำทักทายพร้อมอายุโดยประมาณในปี 2026</p>`,
      spec: ["ใช้ <code>next()</code> อ่านชื่อเล่น และ <code>nextInt()</code> อ่านปีเกิด", "อายุ = 2026 − ปีเกิด", "ข้อความ prompt ต้องตรงตามตัวอย่าง"],
      stdin: "Ploy\n2006",
      solution: j`
        import java.util.Scanner;

        public class GreetByName {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Nickname: ");
                String nick = input.next();
                System.out.print("Birth year: ");
                int year = input.nextInt();
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
                double f = c * 9 / 5 + 32;
                double k = c + 273.15;
                System.out.printf("%.1f C = %.1f F = %.1f K%n", c, f, k);
            }
        }` },
    { level: 2, title: "บัตรแนะนำตัว", html: `<p>ถามอายุเป็นจำนวนเต็มก่อน แล้วถามชื่อเต็มที่มีช่องว่าง และคณะ (มีช่องว่างได้) แสดงประโยคแนะนำตัวที่มีทั้งชื่อ อายุ และคณะ</p>`,
      spec: ["ลำดับการถาม: อายุ → ชื่อเต็ม → คณะ", "ต้องจัดการ Enter ที่ค้างหลัง nextInt() ให้ถูกต้อง", "ชื่อและคณะต้องได้ครบทุกคำ"],
      stdin: "19\nMali Jaidee\nFaculty of Science",
      solution: j`
        import java.util.Scanner;

        public class IntroCard {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Age: ");
                int age = input.nextInt();
                input.nextLine();
                System.out.print("Full name: ");
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
                double hours = distance / speed;
                int totalMinutes = (int) Math.round(hours * 60);
                System.out.printf("Time: %.2f hours%n", hours);
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

                double tip = food * tipPercent / 100;
                double total = food + tip;
                double each = total / people;
                int eachRounded = (int) Math.ceil(each);
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
      stdin: "Computer Programming\nMali Jaidee\n35 21.5 24",
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
                double work = input.nextDouble();
                double mid = input.nextDouble();
                double fin = input.nextDouble();
                double total = work + mid + fin;

                System.out.println("=".repeat(36));
                System.out.printf("%s%n%s%n", course, student);
                System.out.println("-".repeat(36));
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

                double down = price * downPercent / 100;
                double financed = price - down;
                double interest = financed * rate / 100 * months;
                double monthly = (financed + interest) / months;
                double paid = down + financed + interest;
                double extra = paid - price;

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
