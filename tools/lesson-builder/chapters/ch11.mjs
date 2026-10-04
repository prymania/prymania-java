import { j, c, pre } from "../lib.mjs";

export default {
  num: 11, file: "chapter-11.html",
  pageTitle: "บทที่ 11: คลาสและออบเจ็กต์", shortName: "บทที่ 11",
  tocLabel: "บทที่ 11 · มองโปรแกรมเป็นวัตถุ", sidebarBottom: "คลาสคือพิมพ์เขียว ออบเจ็กต์คือของจริง",
  kicker: "บทที่ 11 · เริ่มต้นการเขียนโปรแกรมเชิงวัตถุ", h1: "คลาสและออบเจ็กต์",
  lead: "รวมข้อมูลและพฤติกรรมที่เกี่ยวข้องไว้ด้วยกันเป็นคลาส แล้วสร้างออบเจ็กต์หลายตัวที่มีสถานะของตัวเอง",
  goals: ["อธิบายความต่างของ class กับ object", "สร้าง object ด้วย new และเรียก method", "เขียน constructor และใช้ this", "จัดการหลาย object ที่มี state แยกกัน"],
  prev: { href: "chapter-10.html", label: "← บทที่ 10" },
  next: { href: "chapter-12.html", label: "บทที่ 12: จัดระเบียบคลาส →" },
  footer: "บทที่ 11 · ข้อมูลกับพฤติกรรมที่เกี่ยวข้องควรอยู่คลาสเดียวกัน",
  introHeading: "11. จากตัวแปรหลายตัว สู่ออบเจ็กต์เดียว",
  introHtml: `<p>ถ้าต้องเก็บข้อมูลนักศึกษา 3 คน คนละ ชื่อ รหัส คะแนน เราอาจใช้อาเรย์คู่ขนาน 3 ชุด (บทที่ 8) ซึ่งต้องระวังให้ index ตรงกันเสมอ การเขียนโปรแกรมเชิงวัตถุ (OOP) ให้เรา<strong>รวมข้อมูลที่เกี่ยวข้องเป็นก้อนเดียว</strong> พร้อมเมธอดที่ทำงานกับข้อมูลนั้น</p>
<div class="concept-box"><span class="box-title">คำศัพท์หลัก</span><ul><li><strong>class</strong> — พิมพ์เขียว บอกว่าวัตถุชนิดนี้มีข้อมูล (field) และพฤติกรรม (method) อะไร</li><li><strong>object / instance</strong> — ของจริงที่สร้างจากพิมพ์เขียว แต่ละตัวมีค่า field ของตัวเอง</li><li><strong>field</strong> (attribute) — ตัวแปรที่อยู่ในออบเจ็กต์ เช่น name, balance</li><li><strong>method</strong> — สิ่งที่ออบเจ็กต์ทำได้ เช่น deposit(), describe()</li><li><strong>state</strong> — ค่าของ field ทั้งหมด ณ ขณะหนึ่ง</li></ul></div>`,
  topics: [
    {
      num: "11.1", toc: "class เป็นพิมพ์เขียว", title: "class เป็นพิมพ์เขียว",
      blocks: [
        { type: "concept", title: "โครงสร้างของคลาส", html: pre(`
          class Student {               // ชื่อคลาส: PascalCase
              String name;              // field (ข้อมูล)
              int score;

              void describe() {         // method (พฤติกรรม) — ไม่มี static
                  System.out.println(name + ": " + score);
              }
          }`) + `<p>เมธอดในคลาสไม่ใส่ <code>static</code> เพราะเป็นของ<strong>แต่ละออบเจ็กต์</strong> และใช้ field ของออบเจ็กต์ที่ถูกเรียกได้โดยตรง ในตัวอย่างบทนี้วางคลาสหลายคลาสไว้ในไฟล์เดียว (มีเพียงคลาสที่มี main เป็น public) — ในโปรเจกต์จริงนิยมแยกคลาสละไฟล์</p>` },
        { type: "run", title: "คลาสแรก: Book", level: "พื้นฐาน",
          concept: "ประกาศคลาส Book มี field 3 ตัว แล้วสร้างออบเจ็กต์ใน main กำหนดค่า field และพิมพ์ออกมา",
          code: j`
            public class BookDemo {
                public static void main(String[] args) {
                    Book b = new Book();
                    b.title = "Java Basics";
                    b.author = "Mali";
                    b.pages = 320;
                    System.out.println(b.title + " by " + b.author + ", " + b.pages + " pages");
                }
            }

            class Book {
                String title;
                String author;
                int pages;
            }`,
          steps: ["<code>class Book</code> บอกว่าหนังสือมี title, author, pages", "<code>new Book()</code> สร้างออบเจ็กต์ใหม่ในหน่วยความจำ", "<code>b.title = ...</code> ใช้จุด (.) เข้าถึง field ของออบเจ็กต์ b"] },
        { type: "run", title: "เพิ่มพฤติกรรมด้วย method", level: "ต่อยอด",
          concept: "เมธอดในคลาสใช้ field ได้ทันทีโดยไม่ต้องส่งเป็น parameter เพราะรู้อยู่แล้วว่าเป็นของออบเจ็กต์ไหน",
          code: j`
            public class BookMethods {
                public static void main(String[] args) {
                    Book b = new Book();
                    b.title = "Java Basics";
                    b.pages = 320;
                    b.describe();
                    System.out.println("Reading time: " + b.readingHours(40) + " hours");
                    System.out.println("Thick book? " + b.isThick());
                }
            }

            class Book {
                String title;
                int pages;

                void describe() {
                    System.out.println("Book: " + title + " (" + pages + " pages)");
                }

                double readingHours(int pagesPerHour) {
                    return (double) pages / pagesPerHour;
                }

                boolean isThick() {
                    return pages > 300;
                }
            }`,
          steps: ["<code>b.describe()</code> — เรียกเมธอดของออบเจ็กต์ b ข้างในใช้ title และ pages ของ b", "readingHours รับ parameter เพิ่มได้ตามปกติ และคืนค่า", "isThick คืน boolean จากข้อมูลของตัวเอง"] },
        { type: "run", label: "ทดลอง error 11.1.3", title: "เรียก instance method จาก static context", level: "ประยุกต์", expect: "compile-error",
          concept: "เมธอดที่ไม่มี static ต้องเรียกผ่านออบเจ็กต์ เรียกจากชื่อคลาสตรง ๆ ไม่ได้ เพราะไม่รู้ว่าจะใช้ field ของออบเจ็กต์ไหน",
          code: j`
            public class StaticContext {
                public static void main(String[] args) {
                    Counter.increase();
                }
            }

            class Counter {
                int value;

                void increase() {
                    value++;
                }
            }`,
          steps: ["<code>non-static method increase() cannot be referenced from a static context</code>", "แก้: สร้างออบเจ็กต์ก่อน <code>Counter c = new Counter(); c.increase();</code>"] },
        { type: "check", title: "class vs object", html: `<p>ในประโยค “แมวชื่อส้มของฉัน อายุ 3 ปี” อะไรคือ class อะไรคือ object และอะไรคือ field</p>`, answer: `<p>class = <strong>Cat</strong> (แมวทั่วไป), object = <strong>แมวตัวที่ชื่อส้ม</strong>, field = <strong>name ("ส้ม") และ age (3)</strong></p>` },
      ],
    },
    {
      num: "11.2", toc: "สร้าง object ด้วย new", title: "สร้าง object ด้วย new และตัวแปรอ้างอิง",
      blocks: [
        { type: "p", html: `ตัวแปรชนิดคลาส (เช่น <code>Book b</code>) ไม่ได้เก็บออบเจ็กต์ไว้ข้างใน แต่เก็บ<strong>การอ้างอิง (reference)</strong> ที่ชี้ไปยังออบเจ็กต์ในหน่วยความจำ — เหมือนอาเรย์ในบทที่ 8 field ที่ยังไม่กำหนดค่าจะได้ค่าเริ่มต้น (0, 0.0, false, null)` },
        { type: "run", title: "ค่าเริ่มต้นของ field", level: "พื้นฐาน",
          concept: "ต่างจากตัวแปร local ใน main ซึ่งต้องกำหนดค่าก่อนใช้ field ได้ค่าเริ่มต้นอัตโนมัติ",
          code: j`
            public class DefaultFields {
                public static void main(String[] args) {
                    Product p = new Product();
                    System.out.println("name = " + p.name);
                    System.out.println("price = " + p.price);
                    System.out.println("stock = " + p.stock);
                    System.out.println("onSale = " + p.onSale);
                }
            }

            class Product {
                String name;
                double price;
                int stock;
                boolean onSale;
            }`,
          steps: ["String → null", "double → 0.0, int → 0", "boolean → false", "constructor ในหัวข้อถัดไปช่วยกำหนดค่าเริ่มต้นที่มีความหมาย"] },
        { type: "run", title: "สองตัวแปรชี้ออบเจ็กต์เดียวกัน", level: "ต่อยอด",
          concept: "<code>b = a</code> คัดลอก<em>การอ้างอิง</em> ไม่ได้สร้างออบเจ็กต์ใหม่ แก้ผ่าน b ก็เห็นผ่าน a",
          code: j`
            public class SharedReference {
                public static void main(String[] args) {
                    Product a = new Product();
                    a.name = "Pen";
                    a.stock = 10;

                    Product b = a;
                    b.stock = 3;

                    Product c = new Product();
                    c.name = "Pen";
                    c.stock = 3;

                    System.out.println("a.stock = " + a.stock);
                    System.out.println("a == b ? " + (a == b));
                    System.out.println("a == c ? " + (a == c));
                }
            }

            class Product {
                String name;
                int stock;
            }`,
          steps: ["a และ b ชี้ออบเจ็กต์เดียว แก้ b.stock → a.stock เป็น 3 ด้วย", "c เป็นออบเจ็กต์ใหม่แม้ค่าเหมือนกัน", "<code>==</code> เทียบว่าชี้ตัวเดียวกันหรือไม่ (เหมือน String ในบทที่ 9)"] },
        { type: "run", title: "ส่งออบเจ็กต์ให้เมธอด", level: "ประยุกต์",
          concept: "เมธอดที่รับออบเจ็กต์ได้รับสำเนาของการอ้างอิง จึงแก้ field ของออบเจ็กต์ตัวจริงได้",
          code: j`
            public class PassObject {
                public static void main(String[] args) {
                    Product p = new Product();
                    p.name = "Notebook";
                    p.price = 40;
                    applyDiscount(p, 25);
                    System.out.println(p.name + " now costs " + p.price);
                }

                static void applyDiscount(Product item, double percent) {
                    item.price = item.price * (100 - percent) / 100;
                }
            }

            class Product {
                String name;
                double price;
            }`,
          steps: ["main ส่ง p ไปยัง applyDiscount", "item ชี้ออบเจ็กต์เดียวกับ p", "แก้ item.price → p.price เปลี่ยนจริงเป็น 30.0", "ต่างจากการส่ง int ในบทที่ 7 ซึ่งแก้ค่าเดิมไม่ได้"] },
        { type: "run", label: "ทดลอง error 11.2.4", title: "NullPointerException: ลืม new", level: "ประยุกต์", expect: "runtime-error",
          concept: "ประกาศตัวแปรคลาสแล้วยังไม่สร้างออบเจ็กต์ ค่าเป็น null — เข้าถึง field หรือเมธอดไม่ได้",
          code: j`
            public class ForgotNew {
                public static void main(String[] args) {
                    Product[] shelf = new Product[2];
                    shelf[0] = new Product();
                    shelf[0].name = "Pen";
                    System.out.println(shelf[0].name);
                    shelf[1].name = "Ruler";
                }
            }

            class Product {
                String name;
            }`,
          steps: ["<code>new Product[2]</code> สร้างอาเรย์ 2 ช่องที่เป็น null — ยังไม่มี Product สักตัว", "shelf[0] ถูก new แล้ว ใช้ได้", "shelf[1] ยังเป็น null → NullPointerException"] },
        { type: "check", title: "reference", html: pre(`
          Product x = new Product(); x.stock = 5;
          Product y = x;
          y.stock += 2;
          x = new Product(); x.stock = 1;
          // y.stock = ?`), answer: `<p><strong>7</strong> — y ยังชี้ออบเจ็กต์ตัวแรก (5 + 2) ส่วน x ถูกเปลี่ยนให้ชี้ออบเจ็กต์ใหม่</p>` },
      ],
    },
    {
      num: "11.3", toc: "constructor และ this", title: "constructor และ this",
      blocks: [
        { type: "p", html: `<strong>constructor</strong> คือเมธอดพิเศษที่ทำงานอัตโนมัติตอน <code>new</code> ใช้กำหนดค่าเริ่มต้นให้ field มีชื่อเดียวกับคลาส และ<strong>ไม่มีชนิดผลลัพธ์</strong> (ไม่มี void) คำว่า <code>this</code> หมายถึง “ออบเจ็กต์ตัวนี้” ใช้แยก field ออกจาก parameter ที่ชื่อเหมือนกัน` },
        { type: "concept", title: "รูปแบบ constructor", html: pre(`
          class Student {
              String name;
              int score;

              Student(String name, int score) {   // ชื่อเดียวกับคลาส ไม่มี return type
                  this.name = name;               // this.name = field, name = parameter
                  this.score = score;
              }
          }

          Student s = new Student("Mali", 85);    // argument ส่งไปยัง constructor`) },
        { type: "run", title: "constructor กำหนดค่าตั้งแต่สร้าง", level: "พื้นฐาน",
          concept: "สร้างและกำหนดค่าในบรรทัดเดียว ออบเจ็กต์ไม่มีช่วงที่ field เป็นค่าว่าง",
          code: j`
            public class ConstructorDemo {
                public static void main(String[] args) {
                    Student a = new Student("Mali", 85);
                    Student b = new Student("Beam", 72);
                    a.describe();
                    b.describe();
                }
            }

            class Student {
                String name;
                int score;

                Student(String name, int score) {
                    this.name = name;
                    this.score = score;
                }

                void describe() {
                    System.out.println(name + " scored " + score);
                }
            }`,
          steps: ["new Student(\"Mali\", 85) เรียก constructor", "this.name = name เก็บ parameter ลง field", "describe ใช้ field ได้ทันที"] },
        { type: "run", label: "ทดลองบั๊ก 11.3.2", title: "ลืม this: field ไม่ถูกกำหนดค่า", level: "ต่อยอด",
          concept: "ถ้าเขียน <code>name = name;</code> ทั้งสองฝั่งคือ parameter (ตัวที่ใกล้ที่สุด) field จึงยังเป็นค่าเริ่มต้น",
          code: j`
            public class ForgotThis {
                public static void main(String[] args) {
                    Student s = new Student("Mali", 85);
                    System.out.println(s.name + " " + s.score);
                }
            }

            class Student {
                String name;
                int score;

                Student(String name, int score) {
                    name = name;
                    score = score;
                }
            }`,
          steps: ["คอมไพล์ผ่าน แต่ได้ null 0", "parameter <em>บัง</em> (shadow) field ที่ชื่อเดียวกัน", "แก้: ใช้ this.name = name"] },
        { type: "run", title: "หลาย constructor (overloading) และ this(...)", level: "ประยุกต์",
          concept: "มีหลาย constructor ได้ตามจำนวน/ชนิด parameter ใช้ <code>this(...)</code> เรียก constructor อีกตัวเพื่อไม่เขียนโค้ดซ้ำ",
          code: j`
            public class OverloadedConstructors {
                public static void main(String[] args) {
                    Rectangle a = new Rectangle(4, 3);
                    Rectangle b = new Rectangle(5);
                    Rectangle c = new Rectangle();
                    System.out.println(a.info());
                    System.out.println(b.info());
                    System.out.println(c.info());
                }
            }

            class Rectangle {
                double width;
                double height;

                Rectangle(double width, double height) {
                    this.width = width;
                    this.height = height;
                }

                Rectangle(double side) {
                    this(side, side);
                }

                Rectangle() {
                    this(1);
                }

                double area() {
                    return width * height;
                }

                String info() {
                    return width + " x " + height + " = " + area();
                }
            }`,
          steps: ["Rectangle(4, 3) ใช้ constructor หลัก", "Rectangle(5) เรียก this(5, 5) → จัตุรัส", "Rectangle() เรียก this(1) → this(1, 1)", "info() เรียก area() ของออบเจ็กต์เดียวกันได้ตรง ๆ"] },
        { type: "run", title: "toString: ให้ออบเจ็กต์อธิบายตัวเอง", level: "ท้าทาย",
          concept: "ถ้าคลาสมีเมธอด <code>public String toString()</code> การพิมพ์ออบเจ็กต์ด้วย println หรือต่อกับ String จะเรียกเมธอดนี้อัตโนมัติ",
          code: j`
            public class ToStringDemo {
                public static void main(String[] args) {
                    Point p = new Point(3, 4);
                    Point q = new Point(-1, 2);
                    System.out.println(p);
                    System.out.println("q is " + q);
                    System.out.printf("distance = %.2f%n", p.distanceTo(q));
                }
            }

            class Point {
                int x;
                int y;

                Point(int x, int y) {
                    this.x = x;
                    this.y = y;
                }

                double distanceTo(Point other) {
                    int dx = x - other.x;
                    int dy = y - other.y;
                    return Math.sqrt(dx * dx + dy * dy);
                }

                @Override
                public String toString() {
                    return "(" + x + ", " + y + ")";
                }
            }`,
          steps: ["println(p) เรียก p.toString() → (3, 4)", "ต่อ String ก็เรียก toString อัตโนมัติ", "distanceTo รับออบเจ็กต์ชนิดเดียวกัน เข้าถึง other.x ได้", "<code>@Override</code> บอก compiler ว่าตั้งใจเขียนทับเมธอด toString ที่มีอยู่แล้ว (บทที่ 12)"],
          tryIt: "ลบเมธอด toString ออก แล้วดูว่า println(p) พิมพ์อะไร (เช่น Point@1b6d3586)" },
        { type: "check", title: "constructor", html: `<p>ถ้าคลาสมีเฉพาะ constructor <code>Car(String model)</code> คำสั่ง <code>new Car()</code> จะคอมไพล์ผ่านหรือไม่</p>`, answer: `<p><strong>ไม่ผ่าน</strong> — Java สร้าง constructor ไม่มี parameter ให้อัตโนมัติก็ต่อเมื่อคลาส<em>ไม่มี constructor เลย</em> เมื่อเราเขียนเองแล้ว ต้องเขียน Car() เพิ่มเองถ้าต้องการ</p>` },
      ],
    },
    {
      num: "11.4", toc: "หลาย object หลาย state", title: "หลาย object หลาย state",
      blocks: [
        { type: "p", html: `ออบเจ็กต์แต่ละตัวมี field ของตัวเอง การเรียกเมธอดบนออบเจ็กต์หนึ่งเปลี่ยนเฉพาะ state ของตัวนั้น ส่วน field ที่ประกาศเป็น <code>static</code> เป็นของ<strong>คลาส</strong> ใช้ร่วมกันทุกออบเจ็กต์ (เช่น ตัวนับจำนวนออบเจ็กต์ที่ถูกสร้าง)` },
        { type: "run", title: "บัญชีธนาคารสองบัญชี", level: "ต่อยอด",
          concept: "deposit/withdraw บนบัญชีหนึ่งไม่กระทบอีกบัญชี เพราะ balance เป็นของแต่ละออบเจ็กต์",
          code: j`
            public class TwoAccounts {
                public static void main(String[] args) {
                    BankAccount mali = new BankAccount("Mali", 1000);
                    BankAccount beam = new BankAccount("Beam", 500);
                    mali.deposit(250);
                    beam.withdraw(200);
                    beam.withdraw(1000);
                    mali.printBalance();
                    beam.printBalance();
                }
            }

            class BankAccount {
                String owner;
                double balance;

                BankAccount(String owner, double balance) {
                    this.owner = owner;
                    this.balance = balance;
                }

                void deposit(double amount) {
                    balance += amount;
                }

                void withdraw(double amount) {
                    if (amount > balance) {
                        System.out.println(owner + ": insufficient funds for " + amount);
                    } else {
                        balance -= amount;
                    }
                }

                void printBalance() {
                    System.out.printf("%s: %.2f%n", owner, balance);
                }
            }`,
          steps: ["mali ฝาก 250 → 1250", "beam ถอน 200 → 300", "beam ถอน 1000 เกินยอด → ปฏิเสธ (กฎอยู่ในคลาส ไม่ต้องเขียนซ้ำใน main)", "ยอดของแต่ละคนแยกกัน"] },
        { type: "run", title: "อาเรย์ของออบเจ็กต์", level: "ประยุกต์",
          concept: "แทนอาเรย์คู่ขนานหลายชุด ใช้อาเรย์ของออบเจ็กต์ชุดเดียว — ข้อมูลของแต่ละคนอยู่ด้วยกันเสมอ",
          code: j`
            public class StudentArray {
                public static void main(String[] args) {
                    Student[] list = {
                        new Student("Mali", 85),
                        new Student("Beam", 62),
                        new Student("Nida", 91),
                        new Student("Ploy", 48)
                    };
                    Student best = list[0];
                    int passed = 0;
                    for (Student s : list) {
                        System.out.println(s);
                        if (s.score > best.score) best = s;
                        if (s.isPassed()) passed++;
                    }
                    System.out.println("Top: " + best.name);
                    System.out.println("Passed: " + passed + "/" + list.length);
                }
            }

            class Student {
                String name;
                int score;

                Student(String name, int score) {
                    this.name = name;
                    this.score = score;
                }

                boolean isPassed() {
                    return score >= 50;
                }

                public String toString() {
                    return String.format("%-5s %3d %s", name, score, isPassed() ? "PASS" : "FAIL");
                }
            }`,
          steps: ["สร้าง 4 ออบเจ็กต์ในอาเรย์ด้วย initializer", "for-each ได้ทีละออบเจ็กต์ println เรียก toString", "best เก็บการอ้างอิงไปยังนักศึกษาที่คะแนนสูงสุด", "isPassed เป็นกฎของคลาส ใช้ซ้ำได้ทั้งใน toString และ main"] },
        { type: "run", title: "static field: ข้อมูลที่ใช้ร่วมกันทั้งคลาส", level: "ท้าทาย",
          concept: "field ที่เป็น static มีชุดเดียวสำหรับทั้งคลาส ใช้สร้างรหัสอัตโนมัติหรือนับจำนวนออบเจ็กต์",
          code: j`
            public class StaticCounter {
                public static void main(String[] args) {
                    Ticket t1 = new Ticket("Concert");
                    Ticket t2 = new Ticket("Concert");
                    Ticket t3 = new Ticket("Movie");
                    System.out.println(t1);
                    System.out.println(t2);
                    System.out.println(t3);
                    System.out.println("Tickets issued: " + Ticket.issued);
                }
            }

            class Ticket {
                static int issued = 0;
                int number;
                String event;

                Ticket(String event) {
                    issued++;
                    this.number = issued;
                    this.event = event;
                }

                public String toString() {
                    return "Ticket #" + number + " for " + event;
                }
            }`,
          steps: ["issued เป็น static: มีตัวเดียว ทุก Ticket เห็นค่าเดียวกัน", "ทุกครั้งที่ new → issued เพิ่ม แล้วใช้เป็นหมายเลขของตั๋วใบนั้น", "number เป็น field ปกติ แต่ละใบมีค่าของตัวเอง", "เรียก static field ผ่านชื่อคลาส <code>Ticket.issued</code>"] },
        { type: "check", title: "state", html: pre(`
          Counter a = new Counter();   // class Counter { int n; void inc() { n++; } }
          Counter b = new Counter();
          a.inc(); a.inc(); b.inc();
          Counter c = a; c.inc();
          // a.n, b.n = ?`), answer: `<p>a.n = <strong>3</strong> (inc 2 ครั้ง + ผ่าน c อีก 1), b.n = <strong>1</strong></p>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "คลาส Rectangle", html: `<p>สร้างคลาส <code>Rectangle</code> มี field <code>width</code>, <code>height</code> (double) constructor รับค่าทั้งสอง และเมธอด <code>area()</code>, <code>perimeter()</code> ที่คืนค่า ใน main สร้างสี่เหลี่ยม 2 รูปแล้วแสดงผล</p>`,
      spec: ["ใช้ this ใน constructor", "area และ perimeter ต้อง return ไม่พิมพ์เอง", "แสดงทศนิยม 2 ตำแหน่ง"],
      solution: j`
        public class RectangleApp {
            public static void main(String[] args) {
                Rectangle r1 = new Rectangle(4, 2.5);
                Rectangle r2 = new Rectangle(7.2, 3);
                System.out.printf("R1: area=%.2f perimeter=%.2f%n", r1.area(), r1.perimeter());
                System.out.printf("R2: area=%.2f perimeter=%.2f%n", r2.area(), r2.perimeter());
            }
        }

        class Rectangle {
            double width;
            double height;

            Rectangle(double width, double height) {
                this.width = width;
                this.height = height;
            }

            double area() {
                return width * height;
            }

            double perimeter() {
                return 2 * (width + height);
            }
        }` },
    { level: 1, title: "คลาส Pet พร้อม toString", html: `<p>สร้างคลาส <code>Pet</code> มี field ชื่อ ชนิด (เช่น Cat/Dog) และอายุ มี constructor และ <code>toString()</code> ที่คืนข้อความตามตัวอย่าง พร้อมเมธอด <code>birthday()</code> ที่เพิ่มอายุ 1 ปี</p>`,
      spec: ["สร้างสัตว์เลี้ยง 2 ตัว", "เรียก birthday() กับตัวแรก 2 ครั้ง", "พิมพ์ทั้งสองตัวก่อนและหลังด้วย println(pet)"],
      solution: j`
        public class PetApp {
            public static void main(String[] args) {
                Pet a = new Pet("Som", "Cat", 3);
                Pet b = new Pet("Lucky", "Dog", 5);
                System.out.println(a);
                System.out.println(b);
                a.birthday();
                a.birthday();
                System.out.println("After 2 birthdays: " + a);
            }
        }

        class Pet {
            String name;
            String type;
            int age;

            Pet(String name, String type, int age) {
                this.name = name;
                this.type = type;
                this.age = age;
            }

            void birthday() {
                age++;
            }

            public String toString() {
                return name + " the " + type + " (" + age + " years)";
            }
        }` },
    { level: 1, title: "ตัวนับคลิก", html: `<p>สร้างคลาส <code>ClickCounter</code> มี field <code>count</code> และเมธอด <code>click()</code> (เพิ่ม 1), <code>reset()</code> (กลับเป็น 0), <code>getCount()</code> สร้างตัวนับ 2 ตัวแยกกัน แล้วแสดงว่าทั้งสองตัวมี state ของตัวเอง</p>`,
      spec: ["ตัวนับ A คลิก 3 ครั้ง ตัวนับ B คลิก 1 ครั้ง", "reset ตัว A แล้วคลิกอีก 1 ครั้ง", "แสดงค่าทั้งสองหลังแต่ละขั้น"],
      solution: j`
        public class CounterApp {
            public static void main(String[] args) {
                ClickCounter a = new ClickCounter();
                ClickCounter b = new ClickCounter();
                a.click(); a.click(); a.click();
                b.click();
                System.out.println("A=" + a.getCount() + " B=" + b.getCount());
                a.reset();
                a.click();
                System.out.println("A=" + a.getCount() + " B=" + b.getCount());
            }
        }

        class ClickCounter {
            int count;

            void click() {
                count++;
            }

            void reset() {
                count = 0;
            }

            int getCount() {
                return count;
            }
        }` },
    { level: 2, title: "คลาส Temperature แปลงหน่วย", html: `<p>สร้างคลาส <code>Temperature</code> เก็บค่าเป็นองศาเซลเซียสเท่านั้น มี constructor รับเซลเซียส และเมธอด <code>toFahrenheit()</code>, <code>toKelvin()</code>, <code>isFreezing()</code> (≤ 0 °C) และ <code>static Temperature fromFahrenheit(double f)</code> ที่สร้างออบเจ็กต์จากฟาเรนไฮต์ แล้วแสดงตารางของ 4 ค่า</p>`,
      spec: ["fromFahrenheit คำนวณ C = (F − 32) × 5 / 9 แล้ว return new Temperature(c)", "ใช้อาเรย์ของ Temperature และลูปแสดงผล", "จัดตารางด้วย printf"],
      solution: j`
        public class TemperatureApp {
            public static void main(String[] args) {
                Temperature[] temps = {
                    new Temperature(-5), new Temperature(0), new Temperature(36.6), Temperature.fromFahrenheit(212)
                };
                System.out.printf("%8s %8s %8s %s%n", "C", "F", "K", "Freezing");
                for (Temperature t : temps) {
                    System.out.printf("%8.1f %8.1f %8.1f %s%n", t.celsius, t.toFahrenheit(), t.toKelvin(), t.isFreezing());
                }
            }
        }

        class Temperature {
            double celsius;

            Temperature(double celsius) {
                this.celsius = celsius;
            }

            static Temperature fromFahrenheit(double f) {
                return new Temperature((f - 32) * 5 / 9);
            }

            double toFahrenheit() {
                return celsius * 9 / 5 + 32;
            }

            double toKelvin() {
                return celsius + 273.15;
            }

            boolean isFreezing() {
                return celsius <= 0;
            }
        }`, explain: "เมธอด static ที่สร้างออบเจ็กต์ (factory method) เรียกผ่านชื่อคลาสได้โดยไม่ต้องมีออบเจ็กต์ก่อน" },
    { level: 2, title: "ตะกร้าสินค้าด้วยอาเรย์ของออบเจ็กต์", html: `<p>สร้างคลาส <code>Item</code> (ชื่อ, ราคาต่อหน่วย, จำนวน) มีเมธอด <code>subtotal()</code> จากนั้นใน main รับจำนวนรายการ n แล้วรับข้อมูลแต่ละรายการ (ชื่อ ราคา จำนวน — ชื่อเป็นคำเดียว) เก็บในอาเรย์ <code>Item[]</code> แสดงใบเสร็จและยอดรวม</p>`,
      spec: ["สร้างออบเจ็กต์ทุกช่องของอาเรย์ด้วย new ในลูป", "ใบเสร็จจัดคอลัมน์ด้วย printf", "ยอดรวมคำนวณจาก subtotal() ของแต่ละรายการ"], stdin: "3\nPen 12 5\nNotebook 35 2\nBag 450 1",
      solution: j`
        import java.util.Scanner;

        public class CartApp {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                System.out.print("Items: ");
                int n = in.nextInt();
                Item[] cart = new Item[n];
                for (int i = 0; i < n; i++) {
                    System.out.print("name price qty: ");
                    cart[i] = new Item(in.next(), in.nextDouble(), in.nextInt());
                }
                double total = 0;
                System.out.println("-".repeat(32));
                for (Item it : cart) {
                    System.out.printf("%-10s %6.2f x %-3d %8.2f%n", it.name, it.price, it.qty, it.subtotal());
                    total += it.subtotal();
                }
                System.out.println("-".repeat(32));
                System.out.printf("%-23s %8.2f%n", "TOTAL", total);
            }
        }

        class Item {
            String name;
            double price;
            int qty;

            Item(String name, double price, int qty) {
                this.name = name;
                this.price = price;
                this.qty = qty;
            }

            double subtotal() {
                return price * qty;
            }
        }` },
    { level: 2, title: "เวลา (Clock) ที่เดินได้", html: `<p>สร้างคลาส <code>Clock</code> มี hour (0–23), minute (0–59) constructor และเมธอด <code>tick()</code> เพิ่ม 1 นาที (ขึ้นชั่วโมงใหม่และข้ามเที่ยงคืนได้), <code>addMinutes(int m)</code> และ <code>toString()</code> ที่แสดงรูปแบบ <code>HH:MM</code> (เติม 0 ข้างหน้าด้วย <code>%02d</code>)</p>`,
      spec: ["addMinutes เรียก tick() ซ้ำ หรือคำนวณด้วย / และ %", "ทดสอบ: 23:58 tick 3 ครั้ง, 09:45 + 135 นาที"],
      solution: j`
        public class ClockApp {
            public static void main(String[] args) {
                Clock a = new Clock(23, 58);
                for (int i = 0; i < 3; i++) {
                    a.tick();
                    System.out.println("tick -> " + a);
                }
                Clock b = new Clock(9, 45);
                b.addMinutes(135);
                System.out.println("09:45 + 135 min = " + b);
            }
        }

        class Clock {
            int hour;
            int minute;

            Clock(int hour, int minute) {
                this.hour = hour;
                this.minute = minute;
            }

            void tick() {
                minute++;
                if (minute == 60) {
                    minute = 0;
                    hour = (hour + 1) % 24;
                }
            }

            void addMinutes(int m) {
                int total = hour * 60 + minute + m;
                hour = (total / 60) % 24;
                minute = total % 60;
            }

            public String toString() {
                return String.format("%02d:%02d", hour, minute);
            }
        }` },
    { level: 2, title: "ทะเบียนนักศึกษาพร้อมรหัสอัตโนมัติ", html: `<p>สร้างคลาส <code>Student</code> ที่มี static field <code>nextId</code> เริ่มที่ 6601 ทุกครั้งที่สร้างนักศึกษาใหม่ให้ได้รหัสถัดไปอัตโนมัติ มี field ชื่อและ GPA และ static method <code>count()</code> คืนจำนวนนักศึกษาที่สร้างแล้ว</p>`,
      spec: ["constructor รับเฉพาะชื่อและ GPA", "รหัสกำหนดจาก nextId แล้วเพิ่ม nextId", "แสดงรายชื่อและจำนวนทั้งหมด"],
      solution: j`
        public class RegistryApp {
            public static void main(String[] args) {
                Student[] list = {new Student("Mali", 3.45), new Student("Beam", 2.80), new Student("Nida", 3.92)};
                for (Student s : list) System.out.println(s);
                System.out.println("Total students: " + Student.count());
            }
        }

        class Student {
            static int nextId = 6601;
            int id;
            String name;
            double gpa;

            Student(String name, double gpa) {
                this.id = nextId;
                nextId++;
                this.name = name;
                this.gpa = gpa;
            }

            static int count() {
                return nextId - 6601;
            }

            public String toString() {
                return id + " " + name + " GPA " + gpa;
            }
        }` },
    { level: 3, title: "เศษส่วน (Fraction)", html: `<p>สร้างคลาส <code>Fraction</code> มีตัวเศษและตัวส่วน (int) constructor ต้อง<strong>ทำให้เป็นเศษส่วนอย่างต่ำ</strong>เสมอ และย้ายเครื่องหมายลบไปไว้ที่ตัวเศษ มีเมธอด <code>add</code>, <code>subtract</code>, <code>multiply</code>, <code>divide</code> ที่รับ Fraction อีกตัวและ<strong>คืน Fraction ใหม่</strong> (ไม่แก้ตัวเดิม) และ <code>toString()</code> แสดง <code>a/b</code> (ถ้าตัวส่วนเป็น 1 แสดงแค่ a)</p>`,
      spec: ["เขียนเมธอด static <code>gcd(int a, int b)</code> แบบยุคลิด", "ทดสอบ: 1/2 + 1/3, 3/4 − 5/6, 2/3 × 9/4, (1/2) ÷ (−3/4), 6/−8"],
      solution: j`
        public class FractionApp {
            public static void main(String[] args) {
                Fraction a = new Fraction(1, 2);
                Fraction b = new Fraction(1, 3);
                System.out.println(a + " + " + b + " = " + a.add(b));
                Fraction c = new Fraction(3, 4), d = new Fraction(5, 6);
                System.out.println(c + " - " + d + " = " + c.subtract(d));
                Fraction e = new Fraction(2, 3), f = new Fraction(9, 4);
                System.out.println(e + " * " + f + " = " + e.multiply(f));
                Fraction g = new Fraction(-3, 4);
                System.out.println(a + " / " + g + " = " + a.divide(g));
                System.out.println("6/-8 = " + new Fraction(6, -8));
            }
        }

        class Fraction {
            int num;
            int den;

            Fraction(int num, int den) {
                if (den < 0) {
                    num = -num;
                    den = -den;
                }
                int g = gcd(Math.abs(num), den);
                this.num = num / g;
                this.den = den / g;
            }

            static int gcd(int a, int b) {
                while (b != 0) {
                    int t = a % b;
                    a = b;
                    b = t;
                }
                return a == 0 ? 1 : a;
            }

            Fraction add(Fraction o) {
                return new Fraction(num * o.den + o.num * den, den * o.den);
            }

            Fraction subtract(Fraction o) {
                return new Fraction(num * o.den - o.num * den, den * o.den);
            }

            Fraction multiply(Fraction o) {
                return new Fraction(num * o.num, den * o.den);
            }

            Fraction divide(Fraction o) {
                return new Fraction(num * o.den, den * o.num);
            }

            public String toString() {
                return den == 1 ? String.valueOf(num) : num + "/" + den;
            }
        }`, explain: "การคืนออบเจ็กต์ใหม่แทนการแก้ตัวเดิมทำให้ a, b ยังมีค่าเดิมหลังคำนวณ (immutable style แบบเดียวกับ String)" },
    { level: 3, title: "ระบบจองห้องประชุม", html: `<p>สร้างคลาส <code>Room</code> (ชื่อห้อง, ความจุ, อาเรย์ <code>boolean[] booked</code> ขนาด 9 สำหรับช่วงเวลา 9:00–17:00 ชั่วโมงละช่อง) มีเมธอด <code>book(int hour, int people)</code> คืนข้อความผลการจอง (สำเร็จ / เวลานอกช่วง / คนเกินความจุ / ช่วงนี้ถูกจองแล้ว) และ <code>freeHours()</code> คืน String รายชั่วโมงที่ว่าง จากนั้นสร้าง 2 ห้องและทดลองจองตามตัวอย่าง</p>`,
      spec: ["index ของ booked = hour − 9", "ตรวจเงื่อนไขตามลำดับ: เวลา → ความจุ → ว่างหรือไม่", "freeHours ใช้ StringBuilder ต่อเลขชั่วโมงที่ว่าง"],
      solution: j`
        public class RoomBooking {
            public static void main(String[] args) {
                Room small = new Room("Small", 6);
                Room hall = new Room("Hall", 40);
                System.out.println(small.book(10, 4));
                System.out.println(small.book(10, 3));
                System.out.println(small.book(13, 8));
                System.out.println(hall.book(13, 25));
                System.out.println(hall.book(18, 10));
                System.out.println(small.name + " free: " + small.freeHours());
                System.out.println(hall.name + " free: " + hall.freeHours());
            }
        }

        class Room {
            String name;
            int capacity;
            boolean[] booked = new boolean[9];

            Room(String name, int capacity) {
                this.name = name;
                this.capacity = capacity;
            }

            String book(int hour, int people) {
                if (hour < 9 || hour > 17) return name + " " + hour + ":00 -> outside opening hours";
                if (people > capacity) return name + " " + hour + ":00 -> too many people (max " + capacity + ")";
                if (booked[hour - 9]) return name + " " + hour + ":00 -> already booked";
                booked[hour - 9] = true;
                return name + " " + hour + ":00 -> booked for " + people;
            }

            String freeHours() {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < booked.length; i++) {
                    if (!booked[i]) sb.append(i + 9).append(" ");
                }
                return sb.toString().trim();
            }
        }` },
    { level: 3, title: "เกมต่อสู้แบบผลัดตา", html: `<p>สร้างคลาส <code>Fighter</code> (ชื่อ, hp, attack, defense) มีเมธอด <code>isAlive()</code>, <code>takeDamage(int raw)</code> (ความเสียหายจริง = raw − defense แต่ไม่น้อยกว่า 1; hp ไม่ต่ำกว่า 0) และ <code>attack(Fighter target)</code> ที่ทำความเสียหายเท่ากับ attack ของตัวเองให้เป้าหมายและพิมพ์ผล จากนั้นจำลองการต่อสู้ระหว่างนักสู้ 2 คนผลัดกันโจมตีจนมีคนแพ้ แสดงทุกเทิร์นและผู้ชนะ</p>`,
      spec: ["attack ต้องเรียก target.takeDamage — ไม่แก้ hp ของ target ตรง ๆ", "ใช้ while วนจนมีคนไม่ alive", "สลับผู้โจมตีด้วยตัวแปรอ้างอิง (attacker/defender) แล้วสลับกันทุกเทิร์น", "แสดง hp หลังทุกการโจมตี"],
      solution: j`
        public class Battle {
            public static void main(String[] args) {
                Fighter a = new Fighter("Knight", 40, 12, 4);
                Fighter b = new Fighter("Orc", 50, 10, 2);
                Fighter attacker = a, defender = b;
                int turn = 1;
                while (a.isAlive() && b.isAlive()) {
                    System.out.print("Turn " + turn + ": ");
                    attacker.attack(defender);
                    Fighter temp = attacker;
                    attacker = defender;
                    defender = temp;
                    turn++;
                }
                Fighter winner = a.isAlive() ? a : b;
                System.out.println("Winner: " + winner.name + " with " + winner.hp + " HP");
            }
        }

        class Fighter {
            String name;
            int hp, attack, defense;

            Fighter(String name, int hp, int attack, int defense) {
                this.name = name;
                this.hp = hp;
                this.attack = attack;
                this.defense = defense;
            }

            boolean isAlive() {
                return hp > 0;
            }

            int takeDamage(int raw) {
                int damage = Math.max(1, raw - defense);
                hp = Math.max(0, hp - damage);
                return damage;
            }

            void attack(Fighter target) {
                int dmg = target.takeDamage(attack);
                System.out.println(name + " hits " + target.name + " for " + dmg + " (" + target.name + " HP " + target.hp + ")");
            }
        }`, explain: "การสลับ attacker/defender ใช้เทคนิค temp เหมือนสลับค่า int แต่ที่สลับคือการอ้างอิงไปยังออบเจ็กต์" },
  ],
};
