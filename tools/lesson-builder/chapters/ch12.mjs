import { j, c, pre, jpre } from "../lib.mjs";

export default {
  num: 12, file: "chapter-12.html",
  pageTitle: "บทที่ 12: จัดระเบียบคลาสและปกป้องข้อมูล", shortName: "บทที่ 12",
  tocLabel: "บทที่ 12 · ออกแบบคลาสให้ดูแลง่าย", sidebarBottom: "ซ่อนข้อมูล เปิดเฉพาะสิ่งที่จำเป็น",
  kicker: "บทที่ 12 · ปกป้องข้อมูลและนำโค้ดกลับมาใช้", h1: "จัดระเบียบคลาสและปกป้องข้อมูล",
  lead: "ใช้ access modifier ซ่อนข้อมูลภายใน ตรวจความถูกต้องก่อนเปลี่ยน state ประกอบคลาสเข้าด้วยกัน และสืบทอดพฤติกรรมด้วย inheritance",
  goals: ["ใช้ private/public และ getter/setter", "รักษา invariant ด้วย validation", "เลือกระหว่าง composition และ inheritance", "override method และใช้ polymorphism"],
  prev: { href: "chapter-11.html", label: "← บทที่ 11" },
  next: { href: "chapter-13.html", label: "บทที่ 13: ArrayList →" },
  footer: "บทที่ 12 · ออบเจ็กต์ควรดูแล state ของตัวเอง",
  introHeading: "12. ทำไมต้องปกป้องข้อมูลในออบเจ็กต์",
  introHtml: `<p>ในบทที่ 11 โค้ดภายนอกแก้ field ได้โดยตรง เช่น <code>account.balance = -5000;</code> ซึ่งทำให้ออบเจ็กต์อยู่ในสถานะที่ผิดกฎ บทนี้จะเรียนวิธีให้ออบเจ็กต์<strong>ควบคุม state ของตัวเอง</strong> และวิธีจัดความสัมพันธ์ระหว่างคลาสเพื่อนำโค้ดกลับมาใช้</p>`,
  topics: [
    {
      num: "12.1", toc: "access modifier", title: "access modifier: กำหนดว่าใครเข้าถึงได้",
      blocks: [
        { type: "p", html: `คำที่ใส่หน้า field หรือเมธอด เช่น <code>private</code> และ <code>public</code> เรียกว่า <strong>access modifier</strong> บอกว่าโค้ดส่วนไหนเข้าถึงได้บ้าง` },
        { type: "table", head: ["modifier", "เข้าถึงได้จาก", "ใช้กับ"], rows: [
          ["<code>private</code>", "ภายในคลาสเดียวกันเท่านั้น", "field เกือบทั้งหมด, เมธอดช่วยภายใน"],
          ["(ไม่ระบุ) package-private", "คลาสใน package เดียวกัน", "ตัวอย่างในบทก่อน ๆ"],
          ["<code>protected</code>", "package เดียวกัน + subclass", "สมาชิกที่ subclass ต้องใช้"],
          ["<code>public</code>", "ทุกที่", "constructor และเมธอดที่เป็น “บริการ” ของคลาส"],
        ] },
        { type: "p", html: `เมื่อ field เป็น private คลาสอื่นจะอ่านหรือเขียนตรง ๆ ไม่ได้เลย compiler ไม่ยอม` },
        { type: "run", label: "ทดลอง error 12.1.1", title: "เข้าถึง private field จากภายนอก", expect: "compile-error",
          code: j`
            public class PrivateAccess {
                public static void main(String[] args) {
                    Account acc = new Account();
                    acc.balance = -5000;
                    System.out.println(acc.balance);
                }
            }

            class Account {
                private double balance;
            }`,
          },
        { type: "p", html: `นี่คือสิ่งที่ต้องการ: คนนอกต้องแก้ข้อมูลผ่าน<strong>เมธอด public ที่เราควบคุม</strong> ซึ่งตรวจกฎก่อนเปลี่ยนค่า` },

        { type: "h", text: "private field + public method" },
        { type: "run", title: "บัญชีที่ยอดเงินติดลบไม่ได้",
          code: j`
            public class PublicMethods {
                public static void main(String[] args) {
                    Account acc = new Account("JHope");
                    acc.deposit(500);                         // 500
                    acc.deposit(-100);                        // ปฏิเสธ: ค่าติดลบ
                    acc.withdraw(800);                        // ปฏิเสธ: เกินยอด
                    acc.withdraw(200);                        // 300
                    System.out.println(acc.getOwner() + " balance: " + acc.getBalance());
                }
            }

            class Account {
                private String owner;                     // ภายนอกคลาสเข้าถึงไม่ได้
                private double balance;

                public Account(String owner) {
                    this.owner = owner;
                }

                public void deposit(double amount) {      // ทางเดียวที่ภายนอกเพิ่มยอดได้
                    if (amount <= 0) {
                        System.out.println("Deposit must be positive");
                        return;                           // ออกจากเมธอด ไม่แก้ balance
                    }
                    balance += amount;
                }

                public void withdraw(double amount) {
                    if (amount > balance) {
                        System.out.println("Insufficient funds");
                        return;
                    }
                    balance -= amount;
                }

                public String getOwner() { return owner; }       // อ่านค่าผ่านเมธอด
                public double getBalance() { return balance; }
            }`,
          },
        { type: "check", title: "ใครเข้าถึงได้", html: `<p>field <code>private int score;</code> ในคลาส Student — เมธอด <code>Student.compare(Student other)</code> อ่าน <code>other.score</code> ได้หรือไม่</p>`, answer: `<p><strong>ได้</strong> — private จำกัดที่<em>คลาส</em> ไม่ใช่ที่ออบเจ็กต์ เมธอดในคลาส Student อ่าน private field ของ Student ตัวอื่นได้</p>` },
      ],
    },
    {
      num: "12.2", toc: "encapsulation", title: "encapsulation: getter และ setter",
      blocks: [
        { type: "p", html: `<strong>Encapsulation</strong> คือห่อข้อมูลไว้ข้างใน (private) แล้วเปิดช่องทางที่ควบคุมได้ ช่องทางมาตรฐานมีสองแบบ` },
        { type: "table", head: ["ชนิด", "ชื่อ", "หน้าที่"], rows: [
          ["getter", "<code>getName()</code>, <code>isMember()</code> (boolean)", "คืนค่า field ให้อ่าน"],
          ["setter", "<code>setName(value)</code>", "ตรวจค่าก่อน แล้วจึงเขียนลง field"],
        ] },
        { type: "p", html: `ไม่จำเป็นต้องมี setter ทุก field field ที่ไม่ควรเปลี่ยนหลังสร้าง เช่น รหัส ให้ใส่ <code>final</code> และมีแค่ getter` },
        { type: "run", title: "getter/setter พร้อมตรวจสอบ",
          code: j`
            public class GetterSetter {
                public static void main(String[] args) {
                    Student s = new Student("6601", "JHope");
                    s.setScore(85);
                    System.out.println(s.getId() + " " + s.getName() + " " + s.getScore());   // 6601 JHope 85
                    s.setScore(150);                          // ปฏิเสธ คะแนนยังเป็น 85
                    s.setName("  ");                          // ปฏิเสธ ชื่อยังเป็น JHope
                    System.out.println(s.getId() + " " + s.getName() + " " + s.getScore());
                }
            }

            class Student {
                private final String id;                  // final: กำหนดได้ครั้งเดียวใน constructor
                private String name;
                private int score;

                public Student(String id, String name) {
                    this.id = id;
                    this.name = name;
                }

                public String getId() { return id; }      // มี getter แต่ไม่มี setter
                public String getName() { return name; }
                public int getScore() { return score; }

                public void setName(String name) {
                    if (name == null || name.isBlank()) {   // ว่างหรือมีแต่ช่องว่าง
                        System.out.println("Name cannot be blank");
                        return;
                    }
                    this.name = name.trim();
                }

                public void setScore(int score) {
                    if (score < 0 || score > 100) {
                        System.out.println("Score must be 0-100");
                        return;
                    }
                    this.score = score;
                }
            }`,
          },

        { type: "h", text: "ซ่อนวิธีเก็บข้อมูลไว้ข้างใน" },
        { type: "p", html: `ผู้ใช้คลาสเห็นแค่เมธอด ข้างในจะเก็บข้อมูลแบบไหนก็ได้ คลาสนี้เก็บเวลาเป็น “นาทีทั้งหมด” ค่าเดียว แต่ให้บริการเป็นชั่วโมงและนาที ถ้าวันหนึ่งเปลี่ยนไปเก็บเป็นวินาที โค้ดใน main ไม่ต้องแก้เลย` },
        { type: "run", title: "Duration เก็บเป็นนาทีรวม",
          code: j`
            public class HiddenRepresentation {
                public static void main(String[] args) {
                    Duration d = new Duration(1, 50);         // เก็บเป็น 110 นาที
                    d.addMinutes(25);                         // 135 นาที
                    System.out.println(d.getHours() + " h " + d.getMinutes() + " min");   // 2 h 15 min
                    System.out.println("Total minutes: " + d.getTotalMinutes());
                    System.out.println(d);                    // 2:15
                }
            }

            class Duration {
                private int totalMinutes;                 // field เดียว

                public Duration(int hours, int minutes) {
                    totalMinutes = hours * 60 + minutes;
                }

                public void addMinutes(int m) { totalMinutes += m; }
                public int getHours() { return totalMinutes / 60; }       // คำนวณเมื่อถูกถาม
                public int getMinutes() { return totalMinutes % 60; }
                public int getTotalMinutes() { return totalMinutes; }

                @Override
                public String toString() {
                    return String.format("%d:%02d", getHours(), getMinutes());   // %02d เติม 0 ให้ครบ 2 หลัก
                }
            }`,
          },
        { type: "check", title: "setter", html: `<p>คลาส Product มี field <code>price</code> ควรมี setter ที่ยอมให้ตั้งราคาติดลบได้หรือไม่ ถ้าไม่ควรจัดการอย่างไร</p>`, answer: `<p>ไม่ควร — setter ควรปฏิเสธค่าติดลบ (แจ้งเตือนหรือโยน exception) เพื่อให้ออบเจ็กต์อยู่ในสถานะที่ถูกต้องเสมอ</p>` },
      ],
    },
    {
      num: "12.3", toc: "validation และ invariant", title: "validation และ invariant",
      blocks: [
        { type: "p", html: `<strong>Invariant</strong> คือกฎที่ต้องเป็นจริงตลอดอายุของออบเจ็กต์ เช่น “ยอดเงินไม่ติดลบ” ทุก constructor และทุกเมธอดที่เปลี่ยน state ต้องรักษากฎนี้` },
        { type: "p", html: `แทนการพิมพ์ข้อความเตือนเอง วิธีที่นิยมใน Java คือ<strong>โยน exception</strong>: <code>throw new IllegalArgumentException("ข้อความ")</code> เมธอดหยุดทันที และผู้เรียกรู้แน่ว่าล้มเหลว จะจัดการด้วย try-catch ก็ได้` },
        { type: "run", title: "โยน IllegalArgumentException",
          code: j`
            public class ThrowValidation {
                public static void main(String[] args) {
                    Product p = new Product("Pen", 12, 50);
                    try {
                        p.sell(20);                                       // สำเร็จ เหลือ 30
                        System.out.println("Sold 20, stock = " + p.getStock());
                        p.sell(40);                                       // เกินสต็อก → โยน exception
                        System.out.println("This line is skipped");       // ถูกข้าม กระโดดไป catch
                    } catch (IllegalArgumentException e) {
                        System.out.println("Error: " + e.getMessage());   // ข้อความที่ส่งตอน throw
                    }
                    try {
                        Product bad = new Product("", -5, 10);            // ผิดตั้งแต่ตอนสร้าง
                    } catch (IllegalArgumentException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    System.out.println("Final stock = " + p.getStock());  // 30  state ไม่เสีย
                }
            }

            class Product {
                private final String name;
                private final double price;
                private int stock;

                public Product(String name, double price, int stock) {
                    if (name.isBlank()) throw new IllegalArgumentException("name is required");
                    if (price < 0) throw new IllegalArgumentException("price must not be negative");
                    if (stock < 0) throw new IllegalArgumentException("stock must not be negative");
                    this.name = name;                     // ถึงตรงนี้ได้ = ทุกค่าถูกต้อง
                    this.price = price;
                    this.stock = stock;
                }

                public void sell(int qty) {
                    if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                    if (qty > stock) throw new IllegalArgumentException("only " + stock + " left");
                    stock -= qty;                         // ผ่านทุกเงื่อนไขแล้วจึงแก้ค่า
                }

                public int getStock() { return stock; }
            }`,
          },
        { type: "tip", title: "ตรวจก่อน แล้วค่อยเปลี่ยน", html: `ถ้าเปลี่ยน field ก่อนแล้วจึงตรวจ เมื่อ exception ถูกโยน field ก็ถูกแก้เป็นค่าผิดไปแล้ว ให้ตรวจทุกเงื่อนไขก่อนบรรทัดที่กำหนดค่าเสมอ` },

        { type: "h", text: "กฎที่เกี่ยวกับหลาย field" },
        { type: "p", html: `บางกฎเกี่ยวกับหลาย field พร้อมกัน เช่น min ต้องไม่เกิน max ต้องตรวจทุกครั้งที่ field ใด field หนึ่งเปลี่ยน รวมการตรวจไว้ในเมธอด private ตัวเดียวแล้วเรียกซ้ำ` },
        { type: "run", title: "ช่วงคะแนน min ≤ max",
          code: j`
            public class RangeInvariant {
                public static void main(String[] args) {
                    ScoreRange r = new ScoreRange(40, 80);
                    System.out.println(r);                    // [40, 80]
                    r.setMax(90);
                    System.out.println(r);                    // [40, 90]
                    try {
                        r.setMin(95);                         // 95 > 90 → ปฏิเสธ
                    } catch (IllegalArgumentException e) {
                        System.out.println("Rejected: " + e.getMessage());
                    }
                    System.out.println(r + " contains 85? " + r.contains(85));
                }
            }

            class ScoreRange {
                private int min;
                private int max;

                public ScoreRange(int min, int max) {
                    check(min, max);
                    this.min = min;
                    this.max = max;
                }

                private static void check(int min, int max) {     // ใช้ภายในคลาสเท่านั้น
                    if (min > max) throw new IllegalArgumentException("min " + min + " > max " + max);
                }

                public void setMin(int min) { check(min, max); this.min = min; }   // ตรวจกับ max ปัจจุบัน
                public void setMax(int max) { check(min, max); this.max = max; }
                public boolean contains(int x) { return x >= min && x <= max; }

                @Override
                public String toString() { return "[" + min + ", " + max + "]"; }
            }`,
          },
        { type: "check", title: "ลำดับการตรวจ", html: jpre(`
          public void setAge(int age) {
              this.age = age;
              if (age < 0) throw new IllegalArgumentException("negative");
          }`) + `<p>เมธอดนี้มีปัญหาอะไร</p>`, answer: `<p>เปลี่ยนค่า<strong>ก่อน</strong>ตรวจ ถ้า age ติดลบ exception ถูกโยนแต่ field ถูกแก้เป็นค่าผิดไปแล้ว — ต้องตรวจก่อนกำหนดค่า</p>` },
      ],
    },
    {
      num: "12.4", toc: "composition", title: "composition: คลาสประกอบด้วยคลาสอื่น",
      blocks: [
        { type: "p", html: `<strong>Composition</strong> คือความสัมพันธ์แบบ “<strong>มี</strong>” (has-a): คลาสหนึ่งมีออบเจ็กต์ของอีกคลาสเป็น field เช่น <em>รถยนต์มีเครื่องยนต์</em> หรือ<em>ใบสั่งซื้อมีรายการสินค้า</em> แต่ละคลาสดูแลงานของตัวเอง แล้วร่วมมือกันผ่านเมธอด` },
        { type: "table", head: ["คลาส", "มีอะไร", "รับผิดชอบ"], rows: [
          ["<code>Customer</code>", "name, member", "บอกว่าเป็นสมาชิกไหม"],
          ["<code>OrderLine</code>", "item, price, qty", "คิดยอดของบรรทัดตัวเอง <code>subtotal()</code>"],
          ["<code>Order</code>", "Customer 1 คน + OrderLine หลายบรรทัด", "รวมยอด ลดราคาสมาชิก พิมพ์ใบเสร็จ"],
        ] },
        { type: "run", title: "Order มี Customer และ OrderLine",
          code: j`
            public class CompositionDemo {
                public static void main(String[] args) {
                    Customer c = new Customer("JHope", true);
                    OrderLine[] lines = {
                        new OrderLine("Latte", 55, 2),
                        new OrderLine("Croissant", 45, 1),
                        new OrderLine("Water", 15, 3)
                    };
                    Order order = new Order(c, lines);            // ประกอบจากออบเจ็กต์อื่น
                    order.printReceipt();
                }
            }

            class Customer {
                private final String name;
                private final boolean member;

                public Customer(String name, boolean member) {
                    this.name = name;
                    this.member = member;
                }

                public String getName() { return name; }
                public boolean isMember() { return member; }
            }

            class OrderLine {
                private final String item;
                private final double price;
                private final int qty;

                public OrderLine(String item, double price, int qty) {
                    this.item = item;
                    this.price = price;
                    this.qty = qty;
                }

                public double subtotal() { return price * qty; }

                @Override
                public String toString() {
                    return String.format("%-10s %3d x %6.2f = %7.2f", item, qty, price, subtotal());
                }
            }

            class Order {
                private final Customer customer;              // has-a Customer
                private final OrderLine[] lines;              // has-a OrderLine หลายตัว

                public Order(Customer customer, OrderLine[] lines) {
                    this.customer = customer;
                    this.lines = lines;
                }

                public double total() {
                    double sum = 0;
                    for (OrderLine line : lines) sum += line.subtotal();   // 110 + 45 + 45 = 200
                    return customer.isMember() ? sum * 0.9 : sum;          // สมาชิกลด 10% → 180
                }

                public void printReceipt() {
                    System.out.println("Customer: " + customer.getName() + (customer.isMember() ? " (member -10%)" : ""));
                    for (OrderLine line : lines) System.out.println("  " + line);
                    System.out.printf("Total: %.2f%n", total());
                }
            }`,
          },
        { type: "tip", html: `Order ไม่ต้องรู้วิธีคิดราคาแต่ละบรรทัด แค่ถาม <code>subtotal()</code> คลาสเล็กที่มีหน้าที่เดียวเข้าใจง่ายและทดสอบแยกกันได้` },
        { type: "check", title: "has-a", html: `<p>ความสัมพันธ์ใดเป็น composition: (ก) ห้องเรียน–นักศึกษา (ข) รถยนต์–ยานพาหนะ (ค) บ้าน–ห้อง</p>`, answer: `<p>(ก) และ (ค) เป็น “มี” (has-a) ส่วน (ข) รถยนต์ “เป็น” ยานพาหนะ (is-a) ซึ่งเหมาะกับ inheritance ในหัวข้อถัดไป</p>` },
      ],
    },
    {
      num: "12.5", toc: "inheritance และ override", title: "inheritance และ method override",
      blocks: [
        { type: "p", html: `<strong>Inheritance</strong> คือความสัมพันธ์แบบ “<strong>เป็น</strong>” (is-a): คลาสลูก (subclass) <code>extends</code> คลาสแม่ (superclass) แล้วได้ field และเมธอดของแม่มาทั้งหมดโดยไม่ต้องเขียนซ้ำ จากนั้นเพิ่มของใหม่ หรือ<strong>override</strong> (เขียนทับ) เมธอดเดิมได้` },
        { type: "table", head: ["คำ", "ความหมาย"], rows: [
          ["<code>class Manager extends Employee</code>", "Manager เป็น Employee ชนิดหนึ่ง"],
          ["<code>super(name, salary)</code>", "เรียก constructor ของคลาสแม่ ต้องเป็นบรรทัดแรกของ constructor ลูก"],
          ["<code>@Override</code>", "บอก compiler ว่าตั้งใจเขียนทับเมธอดของแม่ (ถ้าสะกดชื่อผิด compiler จะเตือน)"],
          ["<code>super.monthlyPay()</code>", "เรียกเวอร์ชันของคลาสแม่"],
          ["<code>protected</code>", "คลาสลูกเข้าถึง field นี้ได้"],
        ] },
        { type: "run", title: "Manager เป็น Employee ที่มีโบนัส",
          code: j`
            public class InheritanceDemo {
                public static void main(String[] args) {
                    Employee e = new Employee("Suga", 25000);
                    Manager m = new Manager("JHope", 40000, 8000);
                    System.out.println(e.describe());
                    System.out.println(m.describe());             // 40,000 + 8,000
                    m.raise(10);                                  // raise ได้มาจาก Employee
                    System.out.println(m.describe());             // 44,000 + 8,000
                }
            }

            class Employee {
                protected String name;                        // คลาสลูกเข้าถึงได้
                protected double baseSalary;

                public Employee(String name, double baseSalary) {
                    this.name = name;
                    this.baseSalary = baseSalary;
                }

                public double monthlyPay() {
                    return baseSalary;
                }

                public void raise(double percent) {
                    baseSalary *= 1 + percent / 100;
                }

                public String describe() {                    // monthlyPay() จะได้เวอร์ชันของคลาสจริง
                    return String.format("%-6s %-8s %,10.2f", name, getClass().getSimpleName(), monthlyPay());
                }
            }

            class Manager extends Employee {
                private double bonus;                         // field เพิ่มเฉพาะ Manager

                public Manager(String name, double baseSalary, double bonus) {
                    super(name, baseSalary);                  // ให้คลาสแม่กำหนด name และ baseSalary
                    this.bonus = bonus;
                }

                @Override
                public double monthlyPay() {
                    return super.monthlyPay() + bonus;        // เวอร์ชันของแม่ + โบนัส
                }
            }`,
          },
        { type: "warn", title: "ลืมเรียก super(...)", html: `ถ้าไม่เขียน <code>super(...)</code> Java จะเรียก <code>super()</code> แบบไม่มี parameter ให้เอง ถ้าคลาสแม่ไม่มี constructor แบบนั้น จะคอมไพล์ไม่ผ่าน` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อลืม super(...)", blocks: [
          { type: "run", label: "ทดลอง error 12.5.2", title: "ลืมเรียก super(...)", expect: "compile-error",
            code: j`
              public class MissingSuper {
                  public static void main(String[] args) {
                      Dog d = new Dog("Lucky");
                  }
              }

              class Animal {
                  protected String name;

                  public Animal(String name) {
                      this.name = name;
                  }
              }

              class Dog extends Animal {
                  public Dog(String name) {
                      this.name = name;
                  }
              }`,
            after: "Animal มีแค่ Animal(String) แก้โดยเขียน super(name); เป็นบรรทัดแรกของ constructor ของ Dog" },
        ] },
        { type: "check", title: "override", html: `<p>ถ้า Manager ไม่ override monthlyPay() แล้วเรียก <code>m.monthlyPay()</code> จะได้ค่าอะไร</p>`, answer: `<p>ได้ <strong>baseSalary</strong> จากเวอร์ชันของ Employee (ไม่รวม bonus)</p>` },
      ],
    },
    {
      num: "12.6", toc: "polymorphism", title: "polymorphism: ชนิดเดียว หลายพฤติกรรม",
      blocks: [
        { type: "p", html: `ตัวแปรชนิดคลาสแม่ชี้ไปยังออบเจ็กต์ของคลาสลูกได้ เช่น <code>Shape s = new Circle(2);</code> เมื่อเรียก <code>s.area()</code> Java เลือกเวอร์ชันตาม<strong>ชนิดจริงของออบเจ็กต์</strong>ขณะรัน โค้ดชุดเดียวจึงจัดการได้หลายชนิด` },
        { type: "p", html: `คลาสแม่ที่ไม่ควรถูกสร้างตรง ๆ (รูปทรงทั่วไปคำนวณพื้นที่ไม่ได้) ประกาศเป็น <code>abstract</code> และประกาศเมธอด abstract ที่ไม่มี body เพื่อบังคับให้คลาสลูกทุกตัวเขียนเอง` },
        { type: "run", title: "ลูปเดียวคำนวณพื้นที่ทุกรูปทรง",
          code: j`
            public class PolymorphismDemo {
                public static void main(String[] args) {
                    Shape[] shapes = {                            // ชนิด Shape เก็บคลาสลูกได้ทุกตัว
                        new Circle(1.5),
                        new Rectangle(4, 2.5),
                        new Triangle(3, 4, 5)
                    };
                    double total = 0;
                    for (Shape s : shapes) {
                        System.out.printf("%-10s area = %6.2f%n", s.getName(), s.area());   // area() ของคลาสจริง
                        total += s.area();
                    }
                    System.out.printf("Total area = %.2f%n", total);
                }
            }

            abstract class Shape {                            // new Shape() ไม่ได้
                public abstract double area();                // ไม่มี body: ลูกต้องเขียนเอง

                public String getName() {
                    return getClass().getSimpleName();        // ชื่อคลาสจริง
                }
            }

            class Circle extends Shape {
                private final double r;
                public Circle(double r) { this.r = r; }
                @Override public double area() { return Math.PI * r * r; }
            }

            class Rectangle extends Shape {
                private final double w, h;
                public Rectangle(double w, double h) { this.w = w; this.h = h; }
                @Override public double area() { return w * h; }
            }

            class Triangle extends Shape {
                private final double a, b, c;
                public Triangle(double a, double b, double c) { this.a = a; this.b = b; this.c = c; }
                @Override public double area() {
                    double s = (a + b + c) / 2;                   // สูตรเฮรอน
                    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
                }
            }`,
          },
        { type: "tip", html: `เพิ่มรูปทรงใหม่ เช่น Square ได้โดยเขียนคลาสใหม่คลาสเดียว ลูปใน main ไม่ต้องแก้` },

        { type: "h", text: "interface และ instanceof" },
        { type: "p", html: `<code>interface</code> คือรายการเมธอดที่คลาสต้องมี ใช้กับคลาสที่<em>ไม่ได้</em>สืบทอดกันแต่มีความสามารถร่วมกัน คลาสประกาศ <code>implements</code> เพื่อสัญญาว่าจะเขียนทุกเมธอด ส่วน <code>instanceof</code> ตรวจชนิดจริงขณะรัน` },
        { type: "run", title: "Invoice และ Salary เป็น Payable ทั้งคู่",
          code: j`
            public class InterfaceDemo {
                public static void main(String[] args) {
                    Payable[] bills = {                           // ชนิด interface เก็บได้ทุกคลาสที่ implements
                        new Invoice("Internet", 599),
                        new Salary("Suga", 25000),
                        new Invoice("Electricity", 1240.5)
                    };
                    double sum = 0;
                    for (Payable p : bills) {
                        System.out.printf("%-24s %,10.2f%n", p.describe(), p.amountDue());
                        sum += p.amountDue();
                        if (p instanceof Salary s) {              // ถ้าเป็น Salary ได้ตัวแปร s มาใช้เลย
                            System.out.println("   (tax withheld: " + s.tax() + ")");   // tax() มีเฉพาะ Salary
                        }
                    }
                    System.out.printf("%-24s %,10.2f%n", "TOTAL", sum);
                }
            }

            interface Payable {
                double amountDue();
                String describe();
            }

            class Invoice implements Payable {
                private final String service;
                private final double amount;
                Invoice(String service, double amount) { this.service = service; this.amount = amount; }
                public double amountDue() { return amount; }
                public String describe() { return "Invoice: " + service; }
            }

            class Salary implements Payable {
                private final String employee;
                private final double gross;
                Salary(String employee, double gross) { this.employee = employee; this.gross = gross; }
                public double tax() { return gross * 0.05; }
                public double amountDue() { return gross - tax(); }   // หักภาษี 5%
                public String describe() { return "Salary: " + employee; }
            }`,
          },
        { type: "table", title: "สรุป: เลือกใช้อะไรเมื่อไร", head: ["ต้องการ", "ใช้"], rows: [["ซ่อนข้อมูล บังคับกฎ", "private field + public method"], ["คลาสหนึ่ง “มี” อีกคลาส", "composition (field เป็นออบเจ็กต์)"], ["คลาสหนึ่ง “เป็น” อีกคลาส และใช้โค้ดร่วม", "inheritance (extends)"], ["คลาสแม่ที่ไม่ควรสร้างตรง ๆ", "abstract class"], ["ความสามารถร่วมของคลาสที่ไม่เกี่ยวกัน", "interface (implements)"]] },
        { type: "check", title: "polymorphism", html: `<p><code>Shape s = new Circle(2);</code> เรียก <code>s.area()</code> ได้เวอร์ชันของใคร และเรียกเมธอดที่มีเฉพาะใน Circle (เช่น getRadius) ผ่าน s ได้หรือไม่</p>`, answer: `<p>ได้ area() ของ <strong>Circle</strong> (ตามชนิดจริง) แต่เรียก getRadius() ผ่าน s <strong>ไม่ได้</strong> เพราะ compiler มองตามชนิดตัวแปร (Shape) — ต้องใช้ instanceof/cast ก่อน</p>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "BankAccount แบบ encapsulated", html: `<p>สร้างคลาส <code>BankAccount</code> ที่มี field <code>private</code> คือ เลขบัญชี (final), ชื่อเจ้าของ และยอดเงิน มี getter ทั้งสาม และเมธอด <code>deposit</code>/<code>withdraw</code> ที่คืน <code>boolean</code> บอกว่าสำเร็จหรือไม่ (ปฏิเสธจำนวน ≤ 0 และการถอนเกินยอด)</p>`,
      spec: ["ไม่มี setter ของยอดเงิน", "main ทดสอบทั้งกรณีสำเร็จและล้มเหลวแล้วพิมพ์ผล true/false", "แสดงยอดสุดท้าย"],
      solution: j`
        public class BankApp {
            public static void main(String[] args) {
                BankAccount acc = new BankAccount("001-2-34567", "JHope", 1000);
                System.out.println("deposit 500: " + acc.deposit(500));
                // ฝากติดลบ → false
                System.out.println("deposit -50: " + acc.deposit(-50));
                System.out.println("withdraw 2000: " + acc.withdraw(2000));
                System.out.println("withdraw 300: " + acc.withdraw(300));
                System.out.println(acc.getNumber() + " " + acc.getOwner() + " balance " + acc.getBalance());
            }
        }

        class BankAccount {
            private final String number;
            private String owner;
            private double balance;

            public BankAccount(String number, String owner, double balance) {
                this.number = number;
                this.owner = owner;
                this.balance = balance;
            }

            public String getNumber() { return number; }
            public String getOwner() { return owner; }
            public double getBalance() { return balance; }

            public boolean deposit(double amount) {
                // คืน false เมื่อข้อมูลผิด
                if (amount <= 0) return false;
                balance += amount;
                return true;
            }

            public boolean withdraw(double amount) {
                // จำนวนผิด หรือเกินยอด
                if (amount <= 0 || amount > balance) return false;
                balance -= amount;
                return true;
            }
        }` },
    { level: 1, title: "setter ที่ตรวจข้อมูล", html: `<p>สร้างคลาส <code>Person</code> มี field private <code>name</code> และ <code>age</code> setter ของ name ต้องไม่ว่าง (trim ก่อนเก็บ) setter ของ age ต้องอยู่ใน 0–150 ถ้าผิดให้โยน <code>IllegalArgumentException</code> พร้อมข้อความ ใน main ทดลองตั้งค่าที่ถูกและผิด แล้วดักด้วย try-catch</p>`,
      spec: ["constructor เรียก setter เพื่อใช้กฎชุดเดียวกัน", "พิมพ์ข้อความ error จาก e.getMessage()"],
      solution: j`
        public class PersonApp {
            public static void main(String[] args) {
                // ชื่อจะถูก trim ใน setter
                Person p = new Person("  JHope ", 19);
                System.out.println(p.getName() + ", " + p.getAge());
                try {
                    p.setAge(200);  // อายุผิดช่วง → exception
                } catch (IllegalArgumentException e) {
                    System.out.println("Error: " + e.getMessage());
                }
                try {
                    p.setName("   ");
                } catch (IllegalArgumentException e) {
                    System.out.println("Error: " + e.getMessage());
                }
                System.out.println(p.getName() + ", " + p.getAge());
            }
        }

        class Person {
            private String name;
            private int age;

            public Person(String name, int age) {
                // constructor เรียก setter เพื่อใช้การตรวจชุดเดียวกัน
                setName(name);
                setAge(age);
            }

            public String getName() { return name; }
            public int getAge() { return age; }

            public void setName(String name) {
                // ข้อความอธิบายข้อผิดพลาด
                if (name == null || name.isBlank()) throw new IllegalArgumentException("name must not be blank");
                this.name = name.trim();
            }

            public void setAge(int age) {
                if (age < 0 || age > 150) throw new IllegalArgumentException("age must be 0-150, got " + age);
                this.age = age;
            }
        }` },
    { level: 2, title: "คลังสินค้ากับ invariant", html: `<p>สร้างคลาส <code>Inventory</code> เก็บชื่อสินค้าและจำนวน (0–999) มีเมธอด <code>add(int qty)</code>, <code>remove(int qty)</code> ที่โยน exception เมื่อทำให้จำนวนออกนอกช่วงหรือ qty ≤ 0 และ <code>isLow()</code> คืน true เมื่อเหลือน้อยกว่า 10 ให้ main ประมวลผลคำสั่งชุดหนึ่งตามตัวอย่าง (บวกคือรับเข้า ลบคือเบิกออก) โดยคำสั่งที่ล้มเหลวต้องไม่ทำให้หยุดทั้งโปรแกรม</p>`,
      spec: ["คำสั่ง: +50, −45, −10, +990, +500, −3", "แต่ละคำสั่งอยู่ใน try-catch ของตัวเอง", "แสดงจำนวนหลังทุกคำสั่งและคำเตือน LOW STOCK"],
      solution: j`
        public class InventoryApp {
            public static void main(String[] args) {
                Inventory inv = new Inventory("Paper A4", 20);
                // บวก = รับเข้า, ลบ = จ่ายออก
                int[] commands = {50, -45, -10, 990, 500, -3};
                for (int cmd : commands) {
                    try {
                        if (cmd > 0) inv.add(cmd);
                        // -cmd ทำให้เป็นจำนวนบวก
                        else inv.remove(-cmd);
                        // %+5d แสดงเครื่องหมาย + หรือ -
                        System.out.printf("%+5d -> %3d%s%n", cmd, inv.getQuantity(), inv.isLow() ? "  LOW STOCK" : "");
                    } catch (IllegalArgumentException e) {
                        System.out.printf("%+5d -> rejected: %s%n", cmd, e.getMessage());
                    }
                }
            }
        }

        class Inventory {
            private final String item;
            private int quantity;

            public Inventory(String item, int quantity) {
                // ตรวจตั้งแต่สร้าง
                if (quantity < 0 || quantity > 999) throw new IllegalArgumentException("invalid start quantity");
                this.item = item;
                this.quantity = quantity;
            }

            public int getQuantity() { return quantity; }

            public void add(int qty) {
                if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                // ห้ามเกินความจุ 999
                if (quantity + qty > 999) throw new IllegalArgumentException("would exceed 999");
                quantity += qty;
            }

            public void remove(int qty) {
                if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                // ห้ามจ่ายเกินที่มี
                if (qty > quantity) throw new IllegalArgumentException("only " + quantity + " left");
                quantity -= qty;
            }

            // ต่ำกว่า 10 ถือว่าใกล้หมด
            public boolean isLow() { return quantity < 10; }
        }` },
    { level: 2, title: "Composition: ห้องเรียนและนักศึกษา", html: `<p>สร้างคลาส <code>Student</code> (ชื่อ, คะแนน) และ <code>Classroom</code> ที่<strong>มี</strong>อาเรย์ <code>Student[]</code> ขนาดคงที่ (ความจุ) และตัวนับจำนวนคนปัจจุบัน มีเมธอด <code>enroll(Student s)</code> (คืน false ถ้าเต็ม), <code>average()</code>, <code>top()</code> (คืนออบเจ็กต์ Student ที่คะแนนสูงสุด) และ <code>printRoster()</code></p>`,
      spec: ["Classroom ความจุ 4 ลงทะเบียน 5 คน คนที่ 5 ต้องถูกปฏิเสธ", "average และ top คิดจากเฉพาะคนที่ลงทะเบียนแล้ว (index 0 ถึง count − 1)", "field ทั้งหมดเป็น private"],
      solution: j`
        public class ClassroomApp {
            public static void main(String[] args) {
                Classroom room = new Classroom("CS101", 4);
                String[] names = {"JHope", "Suga", "RM", "Jungkook", "Mark"};
                int[] scores = {78, 65, 92, 81, 70};
                for (int i = 0; i < names.length; i++) {
                    // เพิ่มนักเรียนจนเต็มความจุ
                    boolean ok = room.enroll(new Student(names[i], scores[i]));
                    System.out.println("enroll " + names[i] + ": " + (ok ? "OK" : "FULL"));
                }
                room.printRoster();
                System.out.printf("Average: %.2f%n", room.average());
                System.out.println("Top: " + room.top().getName());
            }
        }

        class Student {
            private final String name;
            private final int score;
            public Student(String name, int score) { this.name = name; this.score = score; }
            public String getName() { return name; }
            public int getScore() { return score; }
        }

        class Classroom {
            private final String code;
            private final Student[] students;
            private int count;  // จำนวนที่ใช้จริงในอาเรย์

            public Classroom(String code, int capacity) {
                this.code = code;
                // อาเรย์ขนาดเท่าความจุ
                this.students = new Student[capacity];
            }

            public boolean enroll(Student s) {
                // เต็มแล้ว
                if (count == students.length) return false;
                // ใส่ช่องว่างถัดไป
                students[count] = s;
                count++;
                return true;
            }

            public double average() {
                if (count == 0) return 0;
                int sum = 0;
                // รวมเฉพาะช่องที่มีข้อมูล
                for (int i = 0; i < count; i++) sum += students[i].getScore();
                return (double) sum / count;
            }

            public Student top() {
                Student best = students[0];
                for (int i = 1; i < count; i++) {
                    // เจอคะแนนสูงกว่า → จำคนนี้
                    if (students[i].getScore() > best.getScore()) best = students[i];
                }
                return best;
            }

            public void printRoster() {
                System.out.println("== " + code + " (" + count + "/" + students.length + ") ==");
                for (int i = 0; i < count; i++) {
                    System.out.printf("%d. %-8s %3d%n", i + 1, students[i].getName(), students[i].getScore());
                }
            }
        }` },
    { level: 2, title: "Vehicle และคลาสลูก", html: `<p>สร้างคลาสแม่ <code>Vehicle</code> (ทะเบียน, ชั่วโมงที่จอด) มีเมธอด <code>parkingFee()</code> คิดชั่วโมงละ 20 บาท และคลาสลูก <code>Motorcycle</code> (ชั่วโมงละ 10 บาท) และ <code>Truck</code> (ชั่วโมงละ 50 บาท + ค่าบริการ 100 บาท) ที่ override parkingFee() แล้วใช้อาเรย์ <code>Vehicle[]</code> คำนวณรายได้รวมของลานจอด</p>`,
      spec: ["ใช้ protected หรือ getter ให้คลาสลูกเข้าถึงชั่วโมงได้", "ใช้ @Override", "แสดงชนิดด้วย <code>getClass().getSimpleName()</code>"],
      solution: j`
        public class ParkingLot {
            public static void main(String[] args) {
                Vehicle[] lot = {  // อาเรย์ชนิดแม่ เก็บคลาสลูกได้
                    new Vehicle("1AB-234", 3),
                    new Motorcycle("9KK-11", 5),
                    new Truck("80-1234", 2),
                    new Vehicle("2CD-567", 1)
                };
                double income = 0;
                for (Vehicle v : lot) {
                    // เรียก parkingFee() ของคลาสจริง
                    System.out.printf("%-10s %-10s %2d h %7.2f%n", v.getClass().getSimpleName(), v.plate, v.hours, v.parkingFee());
                    income += v.parkingFee();
                }
                System.out.printf("Total income: %.2f%n", income);
            }
        }

        class Vehicle {
            protected final String plate;
            protected final int hours;
            public Vehicle(String plate, int hours) { this.plate = plate; this.hours = hours; }
            // รถยนต์ ชม.ละ 20
            public double parkingFee() { return hours * 20; }
        }

        class Motorcycle extends Vehicle {
            public Motorcycle(String plate, int hours) { super(plate, hours); }
            // มอเตอร์ไซค์ถูกกว่า
            @Override public double parkingFee() { return hours * 10; }
        }

        class Truck extends Vehicle {
            public Truck(String plate, int hours) { super(plate, hours); }
            // รถบรรทุกมีค่าแรกเข้า 100
            @Override public double parkingFee() { return hours * 50 + 100; }
        }` },
    { level: 2, title: "toString, equals และ super.toString()", html: `<p>สร้างคลาส <code>Book</code> (ISBN, ชื่อเรื่อง, ราคา) override <code>toString()</code> และ <code>equals(Object o)</code> โดยถือว่าหนังสือสองเล่มเท่ากันเมื่อ ISBN ตรงกัน จากนั้นสร้างคลาสลูก <code>EBook</code> เพิ่ม field ขนาดไฟล์ (MB) และ override toString() โดยเรียก <code>super.toString()</code> แล้วต่อท้ายข้อมูลขนาดไฟล์</p>`,
      spec: ["equals ตรวจ <code>o instanceof Book other</code> ก่อนเปรียบเทียบ", "ทดสอบ == กับ equals ของหนังสือสองเล่มที่ ISBN เดียวกัน", "พิมพ์ทั้ง Book และ EBook"],
      solution: j`
        public class BookEquality {
            public static void main(String[] args) {
                Book a = new Book("978-1", "Java Basics", 350);
                // ISBN เดียวกับ a แต่คนละออบเจ็กต์
                Book b = new Book("978-1", "Java Basics (2nd print)", 360);
                Book c = new EBook("978-2", "Swing in Action", 199, 12.5);
                System.out.println(a);
                System.out.println(c);
                // คนละออบเจ็กต์ → false
                System.out.println("a == b ? " + (a == b));
                // equals ที่เราเขียน เทียบ ISBN
                System.out.println("a.equals(b) ? " + a.equals(b));
                System.out.println("a.equals(c) ? " + a.equals(c));
            }
        }

        class Book {
            private final String isbn;
            private final String title;
            private final double price;

            public Book(String isbn, String title, double price) {
                this.isbn = isbn;
                this.title = title;
                this.price = price;
            }

            @Override
            // รับ Object เพื่อ override ให้ถูกต้อง
            public boolean equals(Object o) {
                // ไม่ใช่ Book → ไม่เท่ากัน
                if (!(o instanceof Book other)) return false;
                // เท่ากันเมื่อ ISBN ตรงกัน
                return isbn.equals(other.isbn);
            }

            @Override
            // override hashCode คู่กับ equals เสมอ
            public int hashCode() { return isbn.hashCode(); }

            @Override
            public String toString() {
                return String.format("[%s] %s %.2f baht", isbn, title, price);
            }
        }

        class EBook extends Book {
            private final double sizeMb;

            public EBook(String isbn, String title, double price, double sizeMb) {
                super(isbn, title, price);
                this.sizeMb = sizeMb;
            }

            @Override
            public String toString() {
                // ต่อจาก toString ของคลาสแม่
                return super.toString() + " (e-book, " + sizeMb + " MB)";
            }
        }`, explain: "เมื่อ override equals ควร override hashCode ด้วยเสมอ (จำเป็นเมื่อใช้กับ HashMap/HashSet ในอนาคต)" },
    { level: 3, title: "ระบบเงินเดือนด้วย abstract class", html: `<p>สร้าง abstract class <code>Employee</code> (ชื่อ, รหัส) มี abstract method <code>monthlyPay()</code> และเมธอดปกติ <code>payslip()</code> ที่คืนข้อความสรุป แล้วสร้างคลาสลูก 3 แบบ:</p><ul><li><code>FullTime</code> — เงินเดือนคงที่</li><li><code>PartTime</code> — ค่าจ้างต่อชั่วโมง × ชั่วโมง (ชั่วโมงที่เกิน 80 ได้ 1.5 เท่า)</li><li><code>SalesPerson</code> — ฐานเงินเดือน + ค่าคอมมิชชัน 3% ของยอดขาย</li></ul><p>ใน main สร้างพนักงานหลายแบบในอาเรย์เดียว พิมพ์สลิปทุกคน ยอดรวม และพนักงานที่ได้มากที่สุด</p>`,
      spec: ["field ทุกตัว private (ใช้ getter ใน payslip)", "ห้าม new Employee ตรง ๆ", "constructor ตรวจค่าติดลบโดยโยน IllegalArgumentException", "จัดรูปแบบตัวเลขด้วย %,.2f"],
      solution: j`
        public class Payroll {
            public static void main(String[] args) {
                // อาเรย์ชนิด Employee เก็บพนักงานทุกแบบ
                Employee[] staff = {
                    new FullTime("E01", "JHope", 32000),
                    new PartTime("E02", "Suga", 120, 92),
                    new SalesPerson("E03", "RM", 15000, 480000),
                    new PartTime("E04", "Mark", 150, 40)
                };
                double total = 0;
                Employee top = staff[0];
                for (Employee e : staff) {
                    System.out.println(e.payslip());
                    // monthlyPay ของแต่ละคลาส
                    total += e.monthlyPay();
                    if (e.monthlyPay() > top.monthlyPay()) top = e;
                }
                System.out.printf("Total payroll: %,.2f%n", total);
                System.out.println("Highest: " + top.getName());
            }
        }

        // abstract: ไม่มีพนักงานแบบ Employee ตรง ๆ
        abstract class Employee {
            private final String id;
            private final String name;

            // protected: ให้คลาสลูกเรียกผ่าน super
            protected Employee(String id, String name) {
                this.id = id;
                this.name = name;
            }

            public String getId() { return id; }
            public String getName() { return name; }
            // คลาสลูกต้องกำหนดวิธีคิดเงินเดือน
            public abstract double monthlyPay();

            public String payslip() {
                return String.format("%s %-8s %-12s %,12.2f", id, name, getClass().getSimpleName(), monthlyPay());
            }

            // ตัวช่วยตรวจค่า ใช้ร่วมกันทุกคลาสลูก
            protected static void requireNonNegative(double v, String what) {
                if (v < 0) throw new IllegalArgumentException(what + " must not be negative");
            }
        }

        class FullTime extends Employee {
            private final double salary;
            public FullTime(String id, String name, double salary) {
                super(id, name);
                requireNonNegative(salary, "salary");
                this.salary = salary;
            }
            @Override public double monthlyPay() { return salary; }
        }

        class PartTime extends Employee {
            private final double rate;
            private final int hours;
            public PartTime(String id, String name, double rate, int hours) {
                super(id, name);
                requireNonNegative(rate, "rate");
                requireNonNegative(hours, "hours");
                this.rate = rate;
                this.hours = hours;
            }
            @Override public double monthlyPay() {
                // 80 ชั่วโมงแรก
                int normal = Math.min(hours, 80);
                // ชั่วโมงที่เกิน 80
                int extra = Math.max(0, hours - 80);
                // ส่วนที่เกินได้ 1.5 เท่า
                return normal * rate + extra * rate * 1.5;
            }
        }

        class SalesPerson extends Employee {
            private final double base;
            private final double sales;
            public SalesPerson(String id, String name, double base, double sales) {
                super(id, name);
                requireNonNegative(base, "base");
                requireNonNegative(sales, "sales");
                this.base = base;
                this.sales = sales;
            }
            // ฐาน + ค่าคอมมิชชัน 3%
            @Override public double monthlyPay() { return base + sales * 0.03; }
        }` },
    { level: 3, title: "interface สำหรับสิ่งที่คิดภาษีได้", html: `<p>สร้าง interface <code>Taxable</code> มีเมธอด <code>double taxableAmount()</code> และ <code>default double tax()</code> ที่คืน 7% ของ taxableAmount() จากนั้นสร้างคลาสที่ไม่เกี่ยวข้องกัน 2 คลาส: <code>Product</code> (ราคา × จำนวน) และ <code>Service</code> (ชั่วโมง × อัตรา + ค่าเดินทาง แต่ค่าเดินทางไม่เสียภาษี) ที่ implements Taxable แล้วรวมภาษีทั้งหมดในใบแจ้งหนี้</p>`,
      spec: ["Service override tax() ไม่ได้ — ให้ taxableAmount() คืนเฉพาะส่วนที่เสียภาษี", "เพิ่มเมธอด total() ในแต่ละคลาส (ยอดรวมทั้งหมด + ภาษี)", "ใช้อาเรย์ Taxable[] และแสดงตาราง"],
      solution: j`
        public class TaxInvoice {
            public static void main(String[] args) {
                Taxable[] items = {  // อาเรย์ชนิด interface
                    new Product("Monitor", 4590, 2),
                    new Service("Installation", 3, 450, 300),
                    new Product("Cable", 120, 4)
                };
                double grand = 0, taxSum = 0;
                for (Taxable t : items) {
                    // tax() มาจาก default method
                    System.out.printf("%-14s taxable %,9.2f  tax %,8.2f%n", t.label(), t.taxableAmount(), t.tax());
                    taxSum += t.tax();
                    grand += t.total();
                }
                System.out.printf("VAT total  : %,10.2f%n", taxSum);
                System.out.printf("Grand total: %,10.2f%n", grand);
            }
        }

        interface Taxable {  // interface กำหนดเมธอดที่ต้องมี
            double taxableAmount();
            double total();
            String label();

            // default: มีโค้ดให้แล้ว คลาสไม่ต้องเขียนเอง
            default double tax() {
                return taxableAmount() * 0.07;
            }
        }

        class Product implements Taxable {
            private final String name;
            private final double price;
            private final int qty;
            Product(String name, double price, int qty) { this.name = name; this.price = price; this.qty = qty; }
            public double taxableAmount() { return price * qty; }
            public double total() { return taxableAmount() + tax(); }
            public String label() { return name; }
        }

        class Service implements Taxable {
            private final String name;
            private final double hours, rate, travel;
            Service(String name, double hours, double rate, double travel) {
                this.name = name; this.hours = hours; this.rate = rate; this.travel = travel;
            }
            public double taxableAmount() { return hours * rate; }
            // ค่าเดินทางไม่คิด VAT
            public double total() { return taxableAmount() + travel + tax(); }
            public String label() { return name; }
        }`, explain: "default method ใน interface ให้พฤติกรรมเริ่มต้นแก่ทุกคลาสที่ implements โดยไม่ต้องเขียนซ้ำ" },
    { level: 3, title: "ระบบห้องสมุด: ยืม-คืนและค่าปรับ", html: `<p>ออกแบบคลาสต่อไปนี้: <code>Item</code> (abstract: รหัส, ชื่อ, สถานะถูกยืม, abstract <code>loanDays()</code> และ <code>finePerDay()</code>), คลาสลูก <code>BookItem</code> (ยืม 14 วัน ปรับวันละ 5 บาท) และ <code>DvdItem</code> (ยืม 3 วัน ปรับวันละ 20 บาท) และ <code>Member</code> ที่ยืมได้ไม่เกิน 3 ชิ้น (composition: มีอาเรย์ Item[]) เขียนเมธอด <code>borrow(Item)</code> และ <code>giveBack(Item, int daysKept)</code> ที่คืนค่าปรับ พร้อมตรวจกฎทั้งหมดด้วย exception</p>`,
      spec: ["กฎ: ยืมของที่ถูกยืมอยู่ไม่ได้, ยืมเกิน 3 ชิ้นไม่ได้, คืนของที่ไม่ได้ยืมไม่ได้", "ค่าปรับ = max(0, daysKept − loanDays()) × finePerDay()", "main ทำลำดับเหตุการณ์ตามตัวอย่าง และพิมพ์ผลหรือข้อความ error ของแต่ละเหตุการณ์"],
      solution: j`
        public class Library {
            public static void main(String[] args) {
                Item b1 = new BookItem("B1", "Java Basics");
                Item b2 = new BookItem("B2", "Data Structures");
                Item d1 = new DvdItem("D1", "Coding Movie");
                Item b3 = new BookItem("B3", "Algorithms");
                Member jhope = new Member("JHope");
                Member suga = new Member("Suga");
                // lambda: ส่ง "งาน" ให้ run ทำ
                run(() -> jhope.borrow(b1));
                run(() -> jhope.borrow(d1));
                run(() -> suga.borrow(b1));
                run(() -> jhope.borrow(b2));
                run(() -> jhope.borrow(b3));
                // คืนสินค้าช้า → ค่าปรับ
                run(() -> System.out.println("  fine = " + jhope.giveBack(d1, 6)));
                run(() -> System.out.println("  fine = " + jhope.giveBack(b1, 10)));
                run(() -> suga.giveBack(b2, 1));
                run(() -> suga.borrow(b1));
            }

            // Runnable คืองานที่สั่ง run() ได้
            static void run(Runnable action) {
                try {
                    action.run();  // ทำงานที่ส่งมา
                // จับข้อผิดพลาดของทุกงานในที่เดียว
                } catch (IllegalStateException e) {
                    System.out.println("  ERROR: " + e.getMessage());
                }
            }
        }

        abstract class Item {
            private final String code;
            private final String title;
            private boolean onLoan;  // สถานะถูกยืมอยู่หรือไม่

            protected Item(String code, String title) { this.code = code; this.title = title; }
            public String getCode() { return code; }
            public boolean isOnLoan() { return onLoan; }
            // ไม่มี public: ใช้ได้ในแพ็กเกจเดียวกัน
            void setOnLoan(boolean v) { onLoan = v; }
            // แต่ละชนิดกำหนดจำนวนวันยืมเอง
            public abstract int loanDays();
            public abstract int finePerDay();

            @Override
            public String toString() { return code + " " + title; }
        }

        class BookItem extends Item {
            BookItem(String code, String title) { super(code, title); }
            public int loanDays() { return 14; }
            public int finePerDay() { return 5; }
        }

        class DvdItem extends Item {
            DvdItem(String code, String title) { super(code, title); }
            public int loanDays() { return 3; }
            public int finePerDay() { return 20; }
        }

        class Member {
            private final String name;
            // ยืมได้สูงสุด 3 ชิ้น
            private final Item[] items = new Item[3];
            private int count;

            Member(String name) { this.name = name; }

            public void borrow(Item item) {
                System.out.println(name + " borrows " + item);
                // ถูกยืมไปแล้ว
                if (item.isOnLoan()) throw new IllegalStateException(item.getCode() + " is already on loan");
                // ยืมครบ 3 ชิ้นแล้ว
                if (count == items.length) throw new IllegalStateException(name + " already has 3 items");
                // ใส่ช่อง count แล้วเพิ่ม count
                items[count++] = item;
                item.setOnLoan(true);
                System.out.println("  OK (" + count + "/3)");
            }

            public int giveBack(Item item, int daysKept) {
                System.out.println(name + " returns " + item + " after " + daysKept + " days");
                int index = -1;
                // หาตำแหน่งของสินค้าที่ยืม
                for (int i = 0; i < count; i++) {
                    // == เทียบว่าเป็นออบเจ็กต์เดียวกัน
                    if (items[i] == item) index = i;
                }
                if (index == -1) throw new IllegalStateException(name + " did not borrow " + item.getCode());
                // ย้ายตัวสุดท้ายมาแทนช่องที่ว่าง
                items[index] = items[count - 1];
                items[count - 1] = null;
                count--;
                item.setOnLoan(false);
                // วันที่เกินกำหนด × ค่าปรับต่อวัน
                return Math.max(0, daysKept - item.loanDays()) * item.finePerDay();
            }
        }`, explain: "เฉลยใช้ lambda <code>() -&gt; ...</code> ส่งงานแต่ละเหตุการณ์ให้เมธอด run ซึ่งรวม try-catch ไว้ที่เดียว (จะเรียน lambda ละเอียดในบทที่ 16) ถ้ายังไม่ถนัดให้เขียน try-catch แยกทุกเหตุการณ์ก็ได้" },
  ],
};
