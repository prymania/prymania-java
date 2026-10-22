import { j, c, pre, jpre } from "../lib.mjs";

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
        { type: "p", html: `<strong>class</strong> เป็นพิมพ์เขียวที่บอกว่าของชนิดหนึ่งมีข้อมูลอะไร (<strong>field</strong>) และทำอะไรได้ (<strong>method</strong>) ส่วน <strong>object</strong> คือของจริงที่สร้างจากพิมพ์เขียวนั้น สร้างได้หลายตัว แต่ละตัวมีค่า field ของตัวเอง` },
        { type: "table", head: ["คลาส (พิมพ์เขียว)", "field (มีอะไร)", "method (ทำอะไร)", "object (ของจริง)"], rows: [
          ["<code>Book</code>", "title, author, pages", "describe(), isThick()", "หนังสือ “Java Basics” 320 หน้า"],
          ["<code>BankAccount</code>", "owner, balance", "deposit(), withdraw()", "บัญชีของ JHope ยอด 1000"],
          ["<code>Student</code>", "name, score", "isPassed()", "Suga คะแนน 72"],
        ] },
        { type: "concept", title: "โครงสร้างของคลาส", html: jpre(`
          class Student {               // ชื่อคลาส: PascalCase
              String name;              // field (ข้อมูล)
              int score;

              void describe() {         // method (พฤติกรรม) — ไม่มี static
                  System.out.println(name + ": " + score);
              }
          }`) },
        { type: "p", html: `ตัวอย่างในบทนี้วางหลายคลาสไว้ในไฟล์เดียว คลาสที่มี main เป็น <code>public</code> และคลาสอื่นไม่ใส่ public ส่วนในโปรเจกต์จริงนิยมแยกไฟล์ละคลาส` },
        { type: "run", title: "คลาสแรก: Book",
          code: j`
            public class BookDemo {
                public static void main(String[] args) {
                    Book b = new Book();                  // สร้างออบเจ็กต์จากคลาส Book
                    b.title = "Java Basics";              // เข้าถึง field ด้วยจุด (.)
                    b.author = "JHope";
                    b.pages = 320;
                    System.out.println(b.title + " by " + b.author + ", " + b.pages + " pages");
                }
            }

            class Book {                                  // พิมพ์เขียว: ทุก Book มี 3 field นี้
                String title;
                String author;
                int pages;
            }`,
          },

        { type: "h", text: "เพิ่มพฤติกรรมด้วย method" },
        { type: "p", html: `เมธอดในคลาส<strong>ไม่มี static</strong> เพราะเป็นของแต่ละออบเจ็กต์ และใช้ field ของออบเจ็กต์ที่ถูกเรียกได้ทันที ไม่ต้องส่งเป็น parameter` },
        { type: "run", title: "เมธอดใช้ field ของตัวเอง",
          code: j`
            public class BookMethods {
                public static void main(String[] args) {
                    Book b = new Book();
                    b.title = "Java Basics";
                    b.pages = 320;
                    b.describe();                                                    // Book: Java Basics (320 pages)
                    System.out.println("Reading time: " + b.readingHours(40) + " hours");  // 320 / 40 = 8.0
                    System.out.println("Thick book? " + b.isThick());                // true
                }
            }

            class Book {
                String title;
                int pages;

                void describe() {                         // ใช้ title และ pages ของ b
                    System.out.println("Book: " + title + " (" + pages + " pages)");
                }

                double readingHours(int pagesPerHour) {   // รับ parameter และคืนค่าได้ตามปกติ
                    return (double) pages / pagesPerHour;
                }

                boolean isThick() {
                    return pages > 300;
                }
            }`,
          },
        { type: "warn", title: "เรียกเมธอดที่ไม่มี static ผ่านชื่อคลาส", html: `<code>Counter.increase()</code> คอมไพล์ไม่ผ่าน (<code>non-static method … cannot be referenced from a static context</code>) เพราะไม่รู้ว่าจะใช้ field ของออบเจ็กต์ไหน ต้องสร้างออบเจ็กต์ก่อน: <code>Counter c = new Counter(); c.increase();</code>` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อเรียกผ่านชื่อคลาส", blocks: [
          { type: "run", label: "ทดลอง error 11.1.3", title: "เรียก instance method จาก static context", expect: "compile-error",
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
            },
        ] },
        { type: "check", title: "class vs object", html: `<p>ในประโยค “แมวชื่อส้มของฉัน อายุ 3 ปี” อะไรคือ class อะไรคือ object และอะไรคือ field</p>`, answer: `<p>class = <strong>Cat</strong> (แมวทั่วไป), object = <strong>แมวตัวที่ชื่อส้ม</strong>, field = <strong>name ("ส้ม") และ age (3)</strong></p>` },
      ],
    },
    {
      num: "11.2", toc: "สร้าง object ด้วย new", title: "สร้าง object ด้วย new และตัวแปรอ้างอิง",
      blocks: [
        { type: "p", html: `<code>new Product()</code> สร้างออบเจ็กต์ในหน่วยความจำ ตัวแปร <code>Product p</code> ไม่ได้เก็บออบเจ็กต์ไว้ข้างใน แต่เก็บ<strong>การอ้างอิง (reference)</strong> ที่ชี้ไปหาออบเจ็กต์ เหมือนอาเรย์ในบทที่ 8` },
        { type: "p", html: `field ที่ยังไม่กำหนดค่าได้<strong>ค่าเริ่มต้น</strong>อัตโนมัติ ต่างจากตัวแปร local ในเมธอดที่ต้องกำหนดค่าก่อนใช้` },
        { type: "run", title: "ค่าเริ่มต้นของ field",
          code: j`
            public class DefaultFields {
                public static void main(String[] args) {
                    Product p = new Product();                    // ยังไม่ได้กำหนด field ใดเลย
                    System.out.println("name = " + p.name);       // null
                    System.out.println("price = " + p.price);     // 0.0
                    System.out.println("stock = " + p.stock);     // 0
                    System.out.println("onSale = " + p.onSale);   // false
                }
            }

            class Product {
                String name;
                double price;
                int stock;
                boolean onSale;
            }`,
          },

        { type: "h", text: "สองตัวแปรชี้ออบเจ็กต์เดียวกัน" },
        { type: "p", html: `<code>b = a</code> คัดลอก<em>การอ้างอิง</em> ไม่ได้สร้างออบเจ็กต์ใหม่ แก้ผ่าน b ก็เห็นผ่าน a ด้วย ต้องใช้ <code>new</code> เท่านั้นจึงได้ออบเจ็กต์ใหม่` },
        { type: "run", title: "คัดลอกการอ้างอิง vs สร้างใหม่",
          code: j`
            public class SharedReference {
                public static void main(String[] args) {
                    Product a = new Product();
                    a.name = "Pen";
                    a.stock = 10;

                    Product b = a;                                // b ชี้ออบเจ็กต์เดียวกับ a
                    b.stock = 3;                                  // แก้ผ่าน b

                    Product c = new Product();                    // ออบเจ็กต์ใหม่อีกตัว
                    c.name = "Pen";
                    c.stock = 3;

                    System.out.println("a.stock = " + a.stock);   // 3   a เห็นค่าที่แก้ผ่าน b
                    System.out.println("a == b ? " + (a == b));   // true   ชี้ตัวเดียวกัน
                    System.out.println("a == c ? " + (a == c));   // false  ค่าเหมือนแต่คนละตัว
                }
            }

            class Product {
                String name;
                int stock;
            }`,
          },
        { type: "tip", html: `<code>==</code> กับออบเจ็กต์เทียบว่า<strong>ชี้ตัวเดียวกัน</strong>หรือไม่ ไม่ได้เทียบค่าใน field เหมือนที่ต้องใช้ equals กับ String ในบทที่ 9` },

        { type: "h", text: "ส่งออบเจ็กต์ให้เมธอด" },
        { type: "p", html: `เมธอดที่รับออบเจ็กต์ได้สำเนาของ<em>การอ้างอิง</em> จึงชี้ออบเจ็กต์ตัวจริงและแก้ field ได้ ต่างจากการส่ง int ในบทที่ 7 ที่แก้ค่าเดิมไม่ได้` },
        { type: "run", title: "เมธอดแก้ field ของออบเจ็กต์ตัวจริง",
          code: j`
            public class PassObject {
                public static void main(String[] args) {
                    Product p = new Product();
                    p.name = "Notebook";
                    p.price = 40;
                    applyDiscount(p, 25);                         // item กับ p ชี้ตัวเดียวกัน
                    System.out.println(p.name + " now costs " + p.price);   // 30.0
                }

                static void applyDiscount(Product item, double percent) {
                    item.price = item.price * (100 - percent) / 100;   // 40 × 75 / 100
                }
            }

            class Product {
                String name;
                double price;
            }`,
          },
        { type: "warn", title: "ลืม new → NullPointerException", html: `<code>new Product[2]</code> สร้างแค่อาเรย์ 2 ช่องที่เป็น <code>null</code> ยังไม่มี Product สักตัว ต้อง <code>new Product()</code> ใส่ทีละช่องก่อนใช้` },
        { type: "more", title: "ดูตัวอย่าง: NullPointerException เมื่อลืม new", blocks: [
          { type: "run", label: "ทดลอง error 11.2.4", title: "NullPointerException: ลืม new", expect: "runtime-error",
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
            },
        ] },
        { type: "check", title: "reference", html: jpre(`
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
        { type: "p", html: `การกำหนด field ทีละบรรทัดหลัง new ยาวและลืมง่าย <strong>constructor</strong> คือเมธอดพิเศษที่ทำงานอัตโนมัติตอน <code>new</code> ใช้กำหนดค่าเริ่มต้นให้ field` },
        { type: "table", head: ["กฎของ constructor", ""], rows: [
          ["ชื่อ", "เหมือนชื่อคลาสทุกตัวอักษร"],
          ["ชนิดผลลัพธ์", "ไม่มี (ไม่ใส่แม้แต่ void)"],
          ["เรียกเมื่อไร", "อัตโนมัติตอน <code>new</code> พร้อม argument ในวงเล็บ"],
          ["<code>this</code>", "หมายถึง “ออบเจ็กต์ตัวนี้” ใช้แยก field กับ parameter ที่ชื่อซ้ำกัน"],
        ] },
        { type: "run", title: "constructor กำหนดค่าตั้งแต่สร้าง",
          code: j`
            public class ConstructorDemo {
                public static void main(String[] args) {
                    Student a = new Student("JHope", 85);     // ส่ง argument ให้ constructor
                    Student b = new Student("Suga", 72);
                    a.describe();
                    b.describe();
                }
            }

            class Student {
                String name;
                int score;

                Student(String name, int score) {         // ชื่อเดียวกับคลาส ไม่มีชนิดผลลัพธ์
                    this.name = name;                     // this.name = field, name = parameter
                    this.score = score;
                }

                void describe() {
                    System.out.println(name + " scored " + score);
                }
            }`,
          },
        { type: "warn", title: "ลืม this", html: `ถ้าเขียน <code>name = name;</code> ทั้งสองฝั่งคือ parameter (ตัวที่ใกล้ที่สุดบัง field ที่ชื่อเดียวกัน) field จึงยังเป็น null และ 0 คอมไพล์ผ่านแต่ผลผิด` },
        { type: "more", title: "ดูตัวอย่าง: ลืม this", blocks: [
          { type: "run", label: "ทดลองบั๊ก 11.3.2", title: "ลืม this: field ไม่ถูกกำหนดค่า",
            code: j`
              public class ForgotThis {
                  public static void main(String[] args) {
                      Student s = new Student("JHope", 85);
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
            },
        ] },

        { type: "h", text: "หลาย constructor และ this(...)" },
        { type: "p", html: `คลาสมี constructor หลายตัวได้ ถ้าจำนวนหรือชนิดของ parameter ต่างกัน (overloading) ตัวที่สั้นกว่าเรียกตัวหลักด้วย <code>this(...)</code> เพื่อไม่ต้องเขียนโค้ดซ้ำ` },
        { type: "run", title: "สี่เหลี่ยมสร้างได้ 3 แบบ",
          code: j`
            public class OverloadedConstructors {
                public static void main(String[] args) {
                    Rectangle a = new Rectangle(4, 3);        // ใช้ constructor 2 ค่า
                    Rectangle b = new Rectangle(5);           // จัตุรัส 5 x 5
                    Rectangle c = new Rectangle();            // ค่าเริ่มต้น 1 x 1
                    System.out.println(a.info());
                    System.out.println(b.info());
                    System.out.println(c.info());
                }
            }

            class Rectangle {
                double width;
                double height;

                Rectangle(double width, double height) {  // constructor หลัก
                    this.width = width;
                    this.height = height;
                }

                Rectangle(double side) {
                    this(side, side);                     // เรียก constructor หลัก
                }

                Rectangle() {
                    this(1);                              // → this(1, 1)
                }

                double area() {
                    return width * height;
                }

                String info() {
                    return width + " x " + height + " = " + area();   // เรียกเมธอดในคลาสเดียวกันได้ตรง ๆ
                }
            }`,
          },

        { type: "h", text: "toString: ให้ออบเจ็กต์อธิบายตัวเอง" },
        { type: "p", html: `ถ้าคลาสมีเมธอด <code>public String toString()</code> การ println ออบเจ็กต์หรือต่อกับ String จะเรียกเมธอดนี้ให้อัตโนมัติ` },
        { type: "run", title: "Point ที่พิมพ์ออกมาอ่านง่าย",
          code: j`
            public class ToStringDemo {
                public static void main(String[] args) {
                    Point p = new Point(3, 4);
                    Point q = new Point(-1, 2);
                    System.out.println(p);                        // เรียก p.toString() → (3, 4)
                    System.out.println("q is " + q);              // ต่อ String ก็เรียก toString()
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

                double distanceTo(Point other) {              // รับออบเจ็กต์ชนิดเดียวกัน
                    int dx = x - other.x;                     // x ของตัวเอง − x ของ other = 4
                    int dy = y - other.y;                     // 2
                    return Math.sqrt(dx * dx + dy * dy);      // √20
                }

                @Override                                     // ตั้งใจเขียนทับ toString ที่มีอยู่แล้ว (บทที่ 12)
                public String toString() {
                    return "(" + x + ", " + y + ")";
                }
            }`,
          },
        { type: "try", html: `ลบเมธอด toString ออก แล้วดูว่า <code>println(p)</code> พิมพ์อะไร (จะได้ประมาณ <code>Point@1b6d3586</code>)` },
        { type: "check", title: "constructor", html: `<p>ถ้าคลาสมีเฉพาะ constructor <code>Car(String model)</code> คำสั่ง <code>new Car()</code> จะคอมไพล์ผ่านหรือไม่</p>`, answer: `<p><strong>ไม่ผ่าน</strong> — Java สร้าง constructor ไม่มี parameter ให้อัตโนมัติก็ต่อเมื่อคลาส<em>ไม่มี constructor เลย</em> เมื่อเราเขียนเองแล้ว ต้องเขียน Car() เพิ่มเองถ้าต้องการ</p>` },
      ],
    },
    {
      num: "11.4", toc: "หลาย object หลาย state", title: "หลาย object หลาย state",
      blocks: [
        { type: "p", html: `ค่าของ field ทั้งหมดในออบเจ็กต์ ณ ขณะหนึ่งเรียกว่า <strong>state</strong> ออบเจ็กต์แต่ละตัวมี state ของตัวเอง เรียกเมธอดบนตัวหนึ่งจะเปลี่ยนเฉพาะตัวนั้น` },
        { type: "run", title: "บัญชีธนาคารสองบัญชี",
          code: j`
            public class TwoAccounts {
                public static void main(String[] args) {
                    BankAccount jhope = new BankAccount("JHope", 1000);
                    BankAccount suga = new BankAccount("Suga", 500);
                    jhope.deposit(250);                       // jhope: 1250
                    suga.withdraw(200);                       // suga: 300   jhope ไม่เปลี่ยน
                    suga.withdraw(1000);                      // เกินยอด → ปฏิเสธ
                    jhope.printBalance();
                    suga.printBalance();
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
                    if (amount > balance) {                   // กฎอยู่ในคลาส main ไม่ต้องตรวจเอง
                        System.out.println(owner + ": insufficient funds for " + amount);
                    } else {
                        balance -= amount;
                    }
                }

                void printBalance() {
                    System.out.printf("%s: %.2f%n", owner, balance);
                }
            }`,
          },

        { type: "h", text: "อาเรย์ของออบเจ็กต์" },
        { type: "p", html: `แทนอาเรย์คู่ขนานหลายชุด (ชื่อชุดหนึ่ง คะแนนอีกชุด) ใช้อาเรย์ของออบเจ็กต์ชุดเดียว ข้อมูลของแต่ละคนอยู่ด้วยกันเสมอ ไม่ต้องระวังให้ index ตรงกัน` },
        { type: "run", title: "หาคนคะแนนสูงสุดและนับคนผ่าน",
          code: j`
            public class StudentArray {
                public static void main(String[] args) {
                    Student[] list = {                        // อาเรย์ 4 ช่อง แต่ละช่องชี้ Student หนึ่งคน
                        new Student("JHope", 85),
                        new Student("Suga", 62),
                        new Student("RM", 91),
                        new Student("Jungkook", 48)
                    };
                    Student best = list[0];                   // เริ่มจากคนแรก
                    int passed = 0;
                    for (Student s : list) {                  // s = ทีละคน
                        System.out.println(s);                // เรียก toString()
                        if (s.score > best.score) best = s;   // จำคนที่คะแนนสูงกว่า
                        if (s.isPassed()) passed++;
                    }
                    System.out.println("Top: " + best.name);  // RM
                    System.out.println("Passed: " + passed + "/" + list.length);   // 3/4
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
                    return String.format("%-8s %3d %s", name, score, isPassed() ? "PASS" : "FAIL");
                }
            }`,
          },

        { type: "h", text: "static field: ข้อมูลของทั้งคลาส" },
        { type: "p", html: `field ที่ใส่ <code>static</code> มี<strong>ชุดเดียว</strong>สำหรับทั้งคลาส ทุกออบเจ็กต์ใช้ร่วมกัน เรียกผ่านชื่อคลาส เช่น <code>Ticket.issued</code> เหมาะกับตัวนับหรือการออกเลขอัตโนมัติ` },
        { type: "run", title: "ออกเลขตั๋วอัตโนมัติ",
          code: j`
            public class StaticCounter {
                public static void main(String[] args) {
                    Ticket t1 = new Ticket("Concert");
                    Ticket t2 = new Ticket("Concert");
                    Ticket t3 = new Ticket("Movie");
                    System.out.println(t1);                                   // Ticket #1 for Concert
                    System.out.println(t2);
                    System.out.println(t3);
                    System.out.println("Tickets issued: " + Ticket.issued);   // 3
                }
            }

            class Ticket {
                static int issued = 0;                    // ของคลาส: มีตัวเดียว ใช้ร่วมกัน
                int number;                               // ของแต่ละใบ
                String event;

                Ticket(String event) {
                    issued++;                             // นับเพิ่มทุกครั้งที่ new
                    this.number = issued;                 // ใช้เป็นเลขของใบนี้
                    this.event = event;
                }

                public String toString() {
                    return "Ticket #" + number + " for " + event;
                }
            }`,
          },
        { type: "check", title: "state", html: jpre(`
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
                // เรียกเมธอดในนิพจน์ได้ทันที
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

            double area() {  // คำนวณจาก field ของตัวเอง
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
                a.birthday();  // เปลี่ยนสถานะของออบเจ็กต์ a
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
                age++;  // อายุเพิ่ม 1 ปี
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
                // คำสั่งสั้นเขียนบรรทัดเดียวกันได้
                a.click(); a.click(); a.click();
                b.click();
                System.out.println("A=" + a.getCount() + " B=" + b.getCount());
                a.reset();  // reset เฉพาะ a
                a.click();
                System.out.println("A=" + a.getCount() + " B=" + b.getCount());
            }
        }

        class ClickCounter {
            int count;  // ตัวนับของแต่ละออบเจ็กต์ เริ่มที่ 0

            void click() {
                count++;
            }

            void reset() {
                count = 0;
            }

            int getCount() {  // getter คืนค่า field
                return count;
            }
        }` },
    { level: 2, title: "คลาส Temperature แปลงหน่วย", html: `<p>สร้างคลาส <code>Temperature</code> เก็บค่าเป็นองศาเซลเซียสเท่านั้น มี constructor รับเซลเซียส และเมธอด <code>toFahrenheit()</code>, <code>toKelvin()</code>, <code>isFreezing()</code> (≤ 0 °C) และ <code>static Temperature fromFahrenheit(double f)</code> ที่สร้างออบเจ็กต์จากฟาเรนไฮต์ แล้วแสดงตารางของ 4 ค่า</p>`,
      spec: ["fromFahrenheit คำนวณ C = (F − 32) × 5 / 9 แล้ว return new Temperature(c)", "ใช้อาเรย์ของ Temperature และลูปแสดงผล", "จัดตารางด้วย printf"],
      solution: j`
        public class TemperatureApp {
            public static void main(String[] args) {
                Temperature[] temps = {
                    // สร้างจากองศาฟาเรนไฮต์ผ่านเมธอด static
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

            // factory method: สร้างและคืนออบเจ็กต์
            static Temperature fromFahrenheit(double f) {
                // แปลง F → C ก่อนสร้าง
                return new Temperature((f - 32) * 5 / 9);
            }

            double toFahrenheit() {
                return celsius * 9 / 5 + 32;
            }

            double toKelvin() {
                return celsius + 273.15;
            }

            boolean isFreezing() {
                return celsius <= 0;  // ไม่เกิน 0 องศา = เยือกแข็ง
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
                // อาเรย์ขนาด n ยังไม่มีออบเจ็กต์
                Item[] cart = new Item[n];
                for (int i = 0; i < n; i++) {
                    System.out.print("name price qty: ");
                    // สร้างออบเจ็กต์ใส่แต่ละช่อง
                    cart[i] = new Item(in.next(), in.nextDouble(), in.nextInt());
                }
                double total = 0;
                System.out.println("-".repeat(32));
                for (Item it : cart) {
                    System.out.printf("%-10s %6.2f x %-3d %8.2f%n", it.name, it.price, it.qty, it.subtotal());
                    total += it.subtotal();  // รวมยอดของทุกรายการ
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

            double subtotal() {  // ยอดย่อยของรายการนี้
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
                    a.tick();  // เดินทีละนาที
                    System.out.println("tick -> " + a);
                }
                Clock b = new Clock(9, 45);
                b.addMinutes(135);  // บวกหลายนาทีพร้อมกัน
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
                if (minute == 60) {  // ครบ 60 นาที → ขึ้นชั่วโมงใหม่
                    minute = 0;
                    // % 24 ทำให้ 24 กลับเป็น 0
                    hour = (hour + 1) % 24;
                }
            }

            void addMinutes(int m) {
                // แปลงเป็นนาทีทั้งหมดก่อน
                int total = hour * 60 + minute + m;
                // แปลงกลับเป็นชั่วโมง วนรอบ 24
                hour = (total / 60) % 24;
                minute = total % 60;
            }

            public String toString() {
                // %02d เติม 0 ข้างหน้าให้ครบ 2 หลัก
                return String.format("%02d:%02d", hour, minute);
            }
        }` },
    { level: 2, title: "ทะเบียนนักศึกษาพร้อมรหัสอัตโนมัติ", html: `<p>สร้างคลาส <code>Student</code> ที่มี static field <code>nextId</code> เริ่มที่ 6601 ทุกครั้งที่สร้างนักศึกษาใหม่ให้ได้รหัสถัดไปอัตโนมัติ มี field ชื่อและ GPA และ static method <code>count()</code> คืนจำนวนนักศึกษาที่สร้างแล้ว</p>`,
      spec: ["constructor รับเฉพาะชื่อและ GPA", "รหัสกำหนดจาก nextId แล้วเพิ่ม nextId", "แสดงรายชื่อและจำนวนทั้งหมด"],
      solution: j`
        public class RegistryApp {
            public static void main(String[] args) {
                // รหัสออกให้อัตโนมัติ
                Student[] list = {new Student("JHope", 3.45), new Student("Suga", 2.80), new Student("RM", 3.92)};
                for (Student s : list) System.out.println(s);
                System.out.println("Total students: " + Student.count());
            }
        }

        class Student {
            static int nextId = 6601;  // รหัสถัดไป (ใช้ร่วมกันทุกคน)
            int id;
            String name;
            double gpa;

            Student(String name, double gpa) {
                this.id = nextId;  // ใช้รหัสปัจจุบัน
                nextId++;          // เตรียมรหัสของคนถัดไป
                this.name = name;
                this.gpa = gpa;
            }

            static int count() {
                return nextId - 6601;  // จำนวนที่ออกรหัสไปแล้ว
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
                // toString ถูกเรียกเมื่อต่อข้อความ
                System.out.println(a + " + " + b + " = " + a.add(b));
                Fraction c = new Fraction(3, 4), d = new Fraction(5, 6);
                System.out.println(c + " - " + d + " = " + c.subtract(d));
                Fraction e = new Fraction(2, 3), f = new Fraction(9, 4);
                System.out.println(e + " * " + f + " = " + e.multiply(f));
                Fraction g = new Fraction(-3, 4);
                System.out.println(a + " / " + g + " = " + a.divide(g));
                // ตัวส่วนติดลบถูกจัดให้เป็นบวก
                System.out.println("6/-8 = " + new Fraction(6, -8));
            }
        }

        class Fraction {
            int num;
            int den;

            Fraction(int num, int den) {
                if (den < 0) {  // ย้ายเครื่องหมายลบไปที่ตัวเศษ
                    num = -num;
                    den = -den;
                }
                int g = gcd(Math.abs(num), den);  // ตัวหารร่วมมาก
                // ทอนเป็นเศษส่วนอย่างต่ำ
                this.num = num / g;
                this.den = den / g;
            }

            static int gcd(int a, int b) {
                while (b != 0) {  // ขั้นตอนวิธีของยุคลิด
                    int t = a % b;
                    a = b;
                    b = t;
                }
                return a == 0 ? 1 : a;  // กรณี 0 → ใช้ 1 กันหารด้วย 0
            }

            Fraction add(Fraction o) {
                // a/b + c/d = (ad + cb) / bd
                return new Fraction(num * o.den + o.num * den, den * o.den);
            }

            Fraction subtract(Fraction o) {
                return new Fraction(num * o.den - o.num * den, den * o.den);
            }

            Fraction multiply(Fraction o) {
                return new Fraction(num * o.num, den * o.den);
            }

            Fraction divide(Fraction o) {
                // หารคือคูณด้วยส่วนกลับ
                return new Fraction(num * o.den, den * o.num);
            }

            public String toString() {
                // ตัวส่วนเป็น 1 แสดงเป็นจำนวนเต็ม
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
                // ห้อง small จอง 10:00 สำหรับ 4 คน
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
            // ชั่วโมง 9:00-17:00 = 9 ช่อง
            boolean[] booked = new boolean[9];

            Room(String name, int capacity) {
                this.name = name;
                this.capacity = capacity;
            }

            String book(int hour, int people) {
                // นอกเวลาทำการ
                if (hour < 9 || hour > 17) return name + " " + hour + ":00 -> outside opening hours";
                // เกินความจุ
                if (people > capacity) return name + " " + hour + ":00 -> too many people (max " + capacity + ")";
                // ชั่วโมง 9 อยู่ในช่อง 0
                if (booked[hour - 9]) return name + " " + hour + ":00 -> already booked";
                // บันทึกการจอง
                booked[hour - 9] = true;
                return name + " " + hour + ":00 -> booked for " + people;
            }

            String freeHours() {
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < booked.length; i++) {
                    // แปลง index กลับเป็นชั่วโมง
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
                // ตัวแปรอ้างอิงถึงผู้โจมตีและผู้ป้องกัน
                Fighter attacker = a, defender = b;
                int turn = 1;
                // สู้จนกว่าจะมีฝ่ายหนึ่งแพ้
                while (a.isAlive() && b.isAlive()) {
                    System.out.print("Turn " + turn + ": ");
                    attacker.attack(defender);
                    Fighter temp = attacker;  // สลับบทบาทด้วย temp
                    attacker = defender;
                    defender = temp;
                    turn++;
                }
                // ?: เลือกผู้ชนะ
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
                // ความเสียหายอย่างน้อย 1
                int damage = Math.max(1, raw - defense);
                // HP ไม่ติดลบ
                hp = Math.max(0, hp - damage);
                return damage;
            }

            void attack(Fighter target) {
                // ให้เป้าหมายรับความเสียหาย
                int dmg = target.takeDamage(attack);
                System.out.println(name + " hits " + target.name + " for " + dmg + " (" + target.name + " HP " + target.hp + ")");
            }
        }`, explain: "การสลับ attacker/defender ใช้เทคนิค temp เหมือนสลับค่า int แต่ที่สลับคือการอ้างอิงไปยังออบเจ็กต์" },
  ],
};
