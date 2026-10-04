import { j, c, pre } from "../lib.mjs";

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
        { type: "table", head: ["modifier", "เข้าถึงได้จาก", "ใช้กับ"], rows: [
          ["<code>private</code>", "ภายในคลาสเดียวกันเท่านั้น", "field เกือบทั้งหมด, เมธอดช่วยภายใน"],
          ["(ไม่ระบุ) package-private", "คลาสใน package เดียวกัน", "ตัวอย่างในบทก่อน ๆ"],
          ["<code>protected</code>", "package เดียวกัน + subclass", "สมาชิกที่ subclass ต้องใช้"],
          ["<code>public</code>", "ทุกที่", "constructor และเมธอดที่เป็น “บริการ” ของคลาส"],
        ] },
        { type: "run", label: "ทดลอง error 12.1.1", title: "เข้าถึง private field จากภายนอก", level: "พื้นฐาน", expect: "compile-error",
          concept: "เมื่อ field เป็น private compiler จะไม่ยอมให้คลาสอื่นอ่านหรือเขียนตรง ๆ",
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
          steps: ["<code>balance has private access in Account</code> ทั้งการเขียนและการอ่าน", "นี่คือสิ่งที่ต้องการ: บังคับให้คนนอกต้องผ่านเมธอดที่เราควบคุม"] },
        { type: "run", title: "private field + public method", level: "ต่อยอด",
          concept: "เปิดเฉพาะเมธอดที่มีกฎตรวจสอบ ส่วนข้อมูลภายในแก้ได้จากภายในคลาสเท่านั้น",
          code: j`
            public class PublicMethods {
                public static void main(String[] args) {
                    Account acc = new Account("Mali");
                    acc.deposit(500);
                    acc.deposit(-100);
                    acc.withdraw(800);
                    acc.withdraw(200);
                    System.out.println(acc.getOwner() + " balance: " + acc.getBalance());
                }
            }

            class Account {
                private String owner;
                private double balance;

                public Account(String owner) {
                    this.owner = owner;
                }

                public void deposit(double amount) {
                    if (amount <= 0) {
                        System.out.println("Deposit must be positive");
                        return;
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

                public String getOwner() { return owner; }
                public double getBalance() { return balance; }
            }`,
          steps: ["ฝาก −100 ถูกปฏิเสธในเมธอด", "ถอน 800 เกินยอด 500 → ปฏิเสธ", "ถอน 200 สำเร็จ → 300", "ไม่มีทางทำให้ balance ติดลบจากภายนอก"] },
        { type: "check", title: "ใครเข้าถึงได้", html: `<p>field <code>private int score;</code> ในคลาส Student — เมธอด <code>Student.compare(Student other)</code> อ่าน <code>other.score</code> ได้หรือไม่</p>`, answer: `<p><strong>ได้</strong> — private จำกัดที่<em>คลาส</em> ไม่ใช่ที่ออบเจ็กต์ เมธอดในคลาส Student อ่าน private field ของ Student ตัวอื่นได้</p>` },
      ],
    },
    {
      num: "12.2", toc: "encapsulation", title: "encapsulation: getter และ setter",
      blocks: [
        { type: "p", html: `<strong>Encapsulation</strong> คือการห่อข้อมูลไว้ภายในและเปิดช่องทางที่ควบคุมได้ นิยมใช้ <strong>getter</strong> (<code>getX()</code> / <code>isX()</code> สำหรับ boolean) เพื่ออ่าน และ <strong>setter</strong> (<code>setX(value)</code>) เพื่อเขียนพร้อมตรวจสอบ ไม่จำเป็นต้องมี setter ทุก field — field ที่ไม่ควรเปลี่ยนหลังสร้าง (เช่น รหัส) ให้มีแค่ getter` },
        { type: "run", title: "getter/setter พร้อมตรวจสอบ", level: "พื้นฐาน",
          concept: "setter เป็นจุดเดียวที่ค่าเปลี่ยนได้ จึงใส่กฎไว้ที่นี่ที่เดียว",
          code: j`
            public class GetterSetter {
                public static void main(String[] args) {
                    Student s = new Student("6601", "Mali");
                    s.setScore(85);
                    System.out.println(s.getId() + " " + s.getName() + " " + s.getScore());
                    s.setScore(150);
                    s.setName("  ");
                    System.out.println(s.getId() + " " + s.getName() + " " + s.getScore());
                }
            }

            class Student {
                private final String id;
                private String name;
                private int score;

                public Student(String id, String name) {
                    this.id = id;
                    this.name = name;
                }

                public String getId() { return id; }
                public String getName() { return name; }
                public int getScore() { return score; }

                public void setName(String name) {
                    if (name == null || name.isBlank()) {
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
          steps: ["id เป็น <code>final</code> — กำหนดได้ครั้งเดียวใน constructor และไม่มี setter", "setScore(150) ถูกปฏิเสธ ค่าเดิม 85 ยังอยู่", "setName ช่องว่างถูกปฏิเสธ"] },
        { type: "run", title: "ซ่อนรายละเอียดภายใน: เปลี่ยนการเก็บข้อมูลได้โดยไม่กระทบผู้ใช้", level: "ประยุกต์",
          concept: "ผู้ใช้คลาสเห็นแค่เมธอด จะเก็บข้อมูลแบบไหนข้างในก็ได้ — คลาสนี้เก็บเวลาเป็น “นาทีทั้งหมด” แต่ให้บริการเป็นชั่วโมง/นาที",
          code: j`
            public class HiddenRepresentation {
                public static void main(String[] args) {
                    Duration d = new Duration(1, 50);
                    d.addMinutes(25);
                    System.out.println(d.getHours() + " h " + d.getMinutes() + " min");
                    System.out.println("Total minutes: " + d.getTotalMinutes());
                    System.out.println(d);
                }
            }

            class Duration {
                private int totalMinutes;

                public Duration(int hours, int minutes) {
                    totalMinutes = hours * 60 + minutes;
                }

                public void addMinutes(int m) { totalMinutes += m; }
                public int getHours() { return totalMinutes / 60; }
                public int getMinutes() { return totalMinutes % 60; }
                public int getTotalMinutes() { return totalMinutes; }

                @Override
                public String toString() {
                    return String.format("%d:%02d", getHours(), getMinutes());
                }
            }`,
          steps: ["ภายในมี field เดียว totalMinutes", "getHours/getMinutes คำนวณเมื่อถูกเรียก", "ถ้าวันหนึ่งเปลี่ยนไปเก็บเป็นวินาที โค้ดใน main ไม่ต้องแก้เลย"] },
        { type: "check", title: "setter", html: `<p>คลาส Product มี field <code>price</code> ควรมี setter ที่ยอมให้ตั้งราคาติดลบได้หรือไม่ ถ้าไม่ควรจัดการอย่างไร</p>`, answer: `<p>ไม่ควร — setter ควรปฏิเสธค่าติดลบ (แจ้งเตือนหรือโยน exception) เพื่อให้ออบเจ็กต์อยู่ในสถานะที่ถูกต้องเสมอ</p>` },
      ],
    },
    {
      num: "12.3", toc: "validation และ invariant", title: "validation และ invariant",
      blocks: [
        { type: "p", html: `<strong>Invariant</strong> คือกฎที่ต้องเป็นจริงตลอดอายุของออบเจ็กต์ เช่น “ยอดเงินไม่ติดลบ” หรือ “จำนวนสินค้าในคลัง 0–999” ทุก constructor และทุกเมธอดที่เปลี่ยน state ต้องรักษากฎนี้ วิธีที่นิยมใน Java คือ<strong>โยน exception</strong> เมื่อได้รับค่าผิด ด้วย <code>throw new IllegalArgumentException("ข้อความ")</code> ให้ผู้เรียกตัดสินใจจัดการด้วย try-catch` },
        { type: "run", title: "โยน IllegalArgumentException", level: "ต่อยอด",
          concept: "แทนการพิมพ์ข้อความเอง ให้คลาสโยน exception — ผู้เรียกจะรู้แน่ว่าการทำงานล้มเหลว",
          code: j`
            public class ThrowValidation {
                public static void main(String[] args) {
                    Product p = new Product("Pen", 12, 50);
                    try {
                        p.sell(20);
                        System.out.println("Sold 20, stock = " + p.getStock());
                        p.sell(40);
                        System.out.println("This line is skipped");
                    } catch (IllegalArgumentException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    try {
                        Product bad = new Product("", -5, 10);
                    } catch (IllegalArgumentException e) {
                        System.out.println("Error: " + e.getMessage());
                    }
                    System.out.println("Final stock = " + p.getStock());
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
                    this.name = name;
                    this.price = price;
                    this.stock = stock;
                }

                public void sell(int qty) {
                    if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                    if (qty > stock) throw new IllegalArgumentException("only " + stock + " left");
                    stock -= qty;
                }

                public int getStock() { return stock; }
            }`,
          steps: ["sell(20) สำเร็จ เหลือ 30", "sell(40) โยน exception → ข้ามไปที่ catch บรรทัดถัดไปใน try ไม่ทำ", "constructor ตรวจทุกค่าก่อนกำหนด → ไม่มีออบเจ็กต์ที่ผิดกฎเกิดขึ้นได้", "stock ยังเป็น 30 — การล้มเหลวไม่ทำให้ state เสีย"] },
        { type: "run", title: "invariant ที่เกี่ยวพันหลาย field", level: "ประยุกต์",
          concept: "บางกฎเกี่ยวกับหลาย field พร้อมกัน เช่น วันเริ่มต้องไม่หลังวันสิ้นสุด — ต้องตรวจทุกครั้งที่ field ใด field หนึ่งเปลี่ยน",
          code: j`
            public class RangeInvariant {
                public static void main(String[] args) {
                    ScoreRange r = new ScoreRange(40, 80);
                    System.out.println(r);
                    r.setMax(90);
                    System.out.println(r);
                    try {
                        r.setMin(95);
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

                private static void check(int min, int max) {
                    if (min > max) throw new IllegalArgumentException("min " + min + " > max " + max);
                }

                public void setMin(int min) { check(min, max); this.min = min; }
                public void setMax(int max) { check(min, max); this.max = max; }
                public boolean contains(int x) { return x >= min && x <= max; }

                @Override
                public String toString() { return "[" + min + ", " + max + "]"; }
            }`,
          steps: ["เมธอด private check ใช้ซ้ำทั้งใน constructor และ setter", "setMin(95) ทำให้ min > max → ถูกปฏิเสธก่อนเปลี่ยนค่า", "ลำดับสำคัญ: <strong>ตรวจก่อน แล้วค่อยเปลี่ยน</strong>"] },
        { type: "check", title: "ลำดับการตรวจ", html: pre(`
          public void setAge(int age) {
              this.age = age;
              if (age < 0) throw new IllegalArgumentException("negative");
          }`) + `<p>เมธอดนี้มีปัญหาอะไร</p>`, answer: `<p>เปลี่ยนค่า<strong>ก่อน</strong>ตรวจ ถ้า age ติดลบ exception ถูกโยนแต่ field ถูกแก้เป็นค่าผิดไปแล้ว — ต้องตรวจก่อนกำหนดค่า</p>` },
      ],
    },
    {
      num: "12.4", toc: "composition", title: "composition: คลาสประกอบด้วยคลาสอื่น",
      blocks: [
        { type: "p", html: `<strong>Composition</strong> (ความสัมพันธ์แบบ “มี” / has-a) คือคลาสหนึ่งมีออบเจ็กต์ของอีกคลาสเป็น field เช่น <em>รถยนต์มีเครื่องยนต์</em>, <em>ใบสั่งซื้อมีรายการสินค้า</em> แต่ละคลาสดูแลงานของตัวเอง แล้วร่วมมือกันผ่านเมธอด` },
        { type: "run", title: "Order มี Customer และอาเรย์ของ OrderLine", level: "ประยุกต์",
          concept: "Order ไม่ต้องรู้วิธีคิดราคาของแต่ละบรรทัด — ถาม OrderLine ผ่าน subtotal() แทน",
          code: j`
            public class CompositionDemo {
                public static void main(String[] args) {
                    Customer c = new Customer("Mali", true);
                    OrderLine[] lines = {
                        new OrderLine("Latte", 55, 2),
                        new OrderLine("Croissant", 45, 1),
                        new OrderLine("Water", 15, 3)
                    };
                    Order order = new Order(c, lines);
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
                private final Customer customer;
                private final OrderLine[] lines;

                public Order(Customer customer, OrderLine[] lines) {
                    this.customer = customer;
                    this.lines = lines;
                }

                public double total() {
                    double sum = 0;
                    for (OrderLine line : lines) sum += line.subtotal();
                    return customer.isMember() ? sum * 0.9 : sum;
                }

                public void printReceipt() {
                    System.out.println("Customer: " + customer.getName() + (customer.isMember() ? " (member -10%)" : ""));
                    for (OrderLine line : lines) System.out.println("  " + line);
                    System.out.printf("Total: %.2f%n", total());
                }
            }`,
          steps: ["Order <em>มี</em> Customer หนึ่งคน และ OrderLine หลายบรรทัด", "total() ถาม subtotal() จากแต่ละบรรทัด และถาม isMember() จากลูกค้า", "รวม 110 + 45 + 45 = 200 ลด 10% → 180.00", "แต่ละคลาสเล็กและทดสอบแยกกันได้"] },
        { type: "check", title: "has-a", html: `<p>ความสัมพันธ์ใดเป็น composition: (ก) ห้องเรียน–นักศึกษา (ข) รถยนต์–ยานพาหนะ (ค) บ้าน–ห้อง</p>`, answer: `<p>(ก) และ (ค) เป็น “มี” (has-a) ส่วน (ข) รถยนต์ “เป็น” ยานพาหนะ (is-a) ซึ่งเหมาะกับ inheritance ในหัวข้อถัดไป</p>` },
      ],
    },
    {
      num: "12.5", toc: "inheritance และ override", title: "inheritance และ method override",
      blocks: [
        { type: "p", html: `<strong>Inheritance</strong> (ความสัมพันธ์แบบ “เป็น” / is-a) ให้คลาสลูก (subclass) รับ field และเมธอดจากคลาสแม่ (superclass) ด้วยคำว่า <code>extends</code> แล้วเพิ่มหรือ<strong>override</strong> (เขียนทับ) พฤติกรรมได้ ใช้ <code>super(...)</code> เรียก constructor ของคลาสแม่ และ <code>super.method()</code> เรียกเมธอดเวอร์ชันของคลาสแม่` },
        { type: "concept", title: "โครงสร้าง", html: pre(`
          class Employee {                       // superclass
              protected String name;
              protected double baseSalary;
              double monthlyPay() { return baseSalary; }
          }

          class Manager extends Employee {       // subclass: Manager "เป็น" Employee
              private double bonus;
              @Override
              double monthlyPay() { return super.monthlyPay() + bonus; }
          }`) },
        { type: "run", title: "extends, super และ @Override", level: "ต่อยอด",
          concept: "Manager ได้ name และ baseSalary จาก Employee โดยไม่ต้องประกาศซ้ำ และ override การคำนวณเงินเดือน",
          code: j`
            public class InheritanceDemo {
                public static void main(String[] args) {
                    Employee e = new Employee("Beam", 25000);
                    Manager m = new Manager("Mali", 40000, 8000);
                    System.out.println(e.describe());
                    System.out.println(m.describe());
                    m.raise(10);
                    System.out.println(m.describe());
                }
            }

            class Employee {
                protected String name;
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

                public String describe() {
                    return String.format("%-6s %-8s %,10.2f", name, getClass().getSimpleName(), monthlyPay());
                }
            }

            class Manager extends Employee {
                private double bonus;

                public Manager(String name, double baseSalary, double bonus) {
                    super(name, baseSalary);
                    this.bonus = bonus;
                }

                @Override
                public double monthlyPay() {
                    return super.monthlyPay() + bonus;
                }
            }`,
          steps: ["<code>super(name, baseSalary)</code> ต้องเป็นบรรทัดแรกของ constructor ลูก", "Manager ไม่ได้เขียน raise และ describe แต่ใช้ได้เพราะสืบทอดมา", "describe เรียก monthlyPay() — สำหรับ Manager จะได้เวอร์ชันที่ override (48,000)", "raise 10% เพิ่มเฉพาะ baseSalary → 44,000 + 8,000 = 52,000"] },
        { type: "run", label: "ทดลอง error 12.5.2", title: "ลืมเรียก super(...)", level: "ประยุกต์", expect: "compile-error",
          concept: "ถ้าคลาสแม่ไม่มี constructor ไม่มี parameter คลาสลูกต้องเรียก super(...) ให้ถูกต้องเสมอ",
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
          steps: ["Java พยายามเรียก <code>super()</code> (ไม่มี parameter) ให้อัตโนมัติ", "แต่ Animal มีแค่ Animal(String) → <code>constructor Animal in class Animal cannot be applied to given types</code>", "แก้: <code>super(name);</code>"] },
        { type: "check", title: "override", html: `<p>ถ้า Manager ไม่ override monthlyPay() แล้วเรียก <code>m.monthlyPay()</code> จะได้ค่าอะไร</p>`, answer: `<p>ได้ <strong>baseSalary</strong> จากเวอร์ชันของ Employee (ไม่รวม bonus)</p>` },
      ],
    },
    {
      num: "12.6", toc: "polymorphism", title: "polymorphism: ชนิดเดียว หลายพฤติกรรม",
      blocks: [
        { type: "p", html: `ตัวแปรชนิดคลาสแม่ชี้ไปยังออบเจ็กต์ของคลาสลูกได้ (<code>Shape s = new Circle(2);</code>) เมื่อเรียกเมธอด Java จะเลือกเวอร์ชันตาม<strong>ชนิดจริงของออบเจ็กต์</strong>ขณะรัน ทำให้เขียนโค้ดเดียวจัดการได้หลายชนิด คลาสแม่ที่ไม่ควรถูกสร้างตรง ๆ ประกาศเป็น <code>abstract</code> และบังคับให้คลาสลูกเขียนเมธอดที่เป็น abstract` },
        { type: "run", title: "abstract class และอาเรย์ของ Shape", level: "ประยุกต์",
          concept: "ลูปเดียวเรียก area() กับทุกรูปทรง แต่ละชนิดคำนวณด้วยสูตรของตัวเอง",
          code: j`
            public class PolymorphismDemo {
                public static void main(String[] args) {
                    Shape[] shapes = {
                        new Circle(1.5),
                        new Rectangle(4, 2.5),
                        new Triangle(3, 4, 5)
                    };
                    double total = 0;
                    for (Shape s : shapes) {
                        System.out.printf("%-10s area = %6.2f%n", s.getName(), s.area());
                        total += s.area();
                    }
                    System.out.printf("Total area = %.2f%n", total);
                }
            }

            abstract class Shape {
                public abstract double area();

                public String getName() {
                    return getClass().getSimpleName();
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
                    double s = (a + b + c) / 2;
                    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
                }
            }`,
          steps: ["<code>abstract double area();</code> ไม่มี body — บังคับทุกคลาสลูกต้องเขียน", "<code>new Shape()</code> ไม่ได้ เพราะเป็น abstract", "ตัวแปร s เป็นชนิด Shape แต่เรียก area() ของ Circle/Rectangle/Triangle ตามชนิดจริง", "เพิ่มรูปทรงใหม่ได้โดยไม่ต้องแก้ลูปใน main"] },
        { type: "run", title: "instanceof และ interface", level: "ท้าทาย",
          concept: "<code>interface</code> กำหนด “ความสามารถ” ที่หลายคลาสซึ่งไม่ได้สืบทอดกันมีร่วมกันได้ ส่วน <code>instanceof</code> ตรวจชนิดจริงขณะรัน",
          code: j`
            public class InterfaceDemo {
                public static void main(String[] args) {
                    Payable[] bills = {
                        new Invoice("Internet", 599),
                        new Salary("Beam", 25000),
                        new Invoice("Electricity", 1240.5)
                    };
                    double sum = 0;
                    for (Payable p : bills) {
                        System.out.printf("%-24s %,10.2f%n", p.describe(), p.amountDue());
                        sum += p.amountDue();
                        if (p instanceof Salary s) {
                            System.out.println("   (tax withheld: " + s.tax() + ")");
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
                public double amountDue() { return gross - tax(); }
                public String describe() { return "Salary: " + employee; }
            }`,
          steps: ["Invoice และ Salary ไม่ได้เป็นแม่ลูกกัน แต่ทั้งคู่ implements Payable", "อาเรย์ Payable[] เก็บได้ทั้งสองชนิด", "<code>p instanceof Salary s</code> ตรวจชนิดและได้ตัวแปร s ชนิด Salary มาใช้เมธอด tax() (Java 16+)"] },
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
                BankAccount acc = new BankAccount("001-2-34567", "Mali", 1000);
                System.out.println("deposit 500: " + acc.deposit(500));
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
                if (amount <= 0) return false;
                balance += amount;
                return true;
            }

            public boolean withdraw(double amount) {
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
                Person p = new Person("  Mali ", 19);
                System.out.println(p.getName() + ", " + p.getAge());
                try {
                    p.setAge(200);
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
                setName(name);
                setAge(age);
            }

            public String getName() { return name; }
            public int getAge() { return age; }

            public void setName(String name) {
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
                int[] commands = {50, -45, -10, 990, 500, -3};
                for (int cmd : commands) {
                    try {
                        if (cmd > 0) inv.add(cmd);
                        else inv.remove(-cmd);
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
                if (quantity < 0 || quantity > 999) throw new IllegalArgumentException("invalid start quantity");
                this.item = item;
                this.quantity = quantity;
            }

            public int getQuantity() { return quantity; }

            public void add(int qty) {
                if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                if (quantity + qty > 999) throw new IllegalArgumentException("would exceed 999");
                quantity += qty;
            }

            public void remove(int qty) {
                if (qty <= 0) throw new IllegalArgumentException("qty must be positive");
                if (qty > quantity) throw new IllegalArgumentException("only " + quantity + " left");
                quantity -= qty;
            }

            public boolean isLow() { return quantity < 10; }
        }` },
    { level: 2, title: "Composition: ห้องเรียนและนักศึกษา", html: `<p>สร้างคลาส <code>Student</code> (ชื่อ, คะแนน) และ <code>Classroom</code> ที่<strong>มี</strong>อาเรย์ <code>Student[]</code> ขนาดคงที่ (ความจุ) และตัวนับจำนวนคนปัจจุบัน มีเมธอด <code>enroll(Student s)</code> (คืน false ถ้าเต็ม), <code>average()</code>, <code>top()</code> (คืนออบเจ็กต์ Student ที่คะแนนสูงสุด) และ <code>printRoster()</code></p>`,
      spec: ["Classroom ความจุ 4 ลงทะเบียน 5 คน คนที่ 5 ต้องถูกปฏิเสธ", "average และ top คิดจากเฉพาะคนที่ลงทะเบียนแล้ว (index 0 ถึง count − 1)", "field ทั้งหมดเป็น private"],
      solution: j`
        public class ClassroomApp {
            public static void main(String[] args) {
                Classroom room = new Classroom("CS101", 4);
                String[] names = {"Mali", "Beam", "Nida", "Ploy", "Tan"};
                int[] scores = {78, 65, 92, 81, 70};
                for (int i = 0; i < names.length; i++) {
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
            private int count;

            public Classroom(String code, int capacity) {
                this.code = code;
                this.students = new Student[capacity];
            }

            public boolean enroll(Student s) {
                if (count == students.length) return false;
                students[count] = s;
                count++;
                return true;
            }

            public double average() {
                if (count == 0) return 0;
                int sum = 0;
                for (int i = 0; i < count; i++) sum += students[i].getScore();
                return (double) sum / count;
            }

            public Student top() {
                Student best = students[0];
                for (int i = 1; i < count; i++) {
                    if (students[i].getScore() > best.getScore()) best = students[i];
                }
                return best;
            }

            public void printRoster() {
                System.out.println("== " + code + " (" + count + "/" + students.length + ") ==");
                for (int i = 0; i < count; i++) {
                    System.out.printf("%d. %-5s %3d%n", i + 1, students[i].getName(), students[i].getScore());
                }
            }
        }` },
    { level: 2, title: "Vehicle และคลาสลูก", html: `<p>สร้างคลาสแม่ <code>Vehicle</code> (ทะเบียน, ชั่วโมงที่จอด) มีเมธอด <code>parkingFee()</code> คิดชั่วโมงละ 20 บาท และคลาสลูก <code>Motorcycle</code> (ชั่วโมงละ 10 บาท) และ <code>Truck</code> (ชั่วโมงละ 50 บาท + ค่าบริการ 100 บาท) ที่ override parkingFee() แล้วใช้อาเรย์ <code>Vehicle[]</code> คำนวณรายได้รวมของลานจอด</p>`,
      spec: ["ใช้ protected หรือ getter ให้คลาสลูกเข้าถึงชั่วโมงได้", "ใช้ @Override", "แสดงชนิดด้วย <code>getClass().getSimpleName()</code>"],
      solution: j`
        public class ParkingLot {
            public static void main(String[] args) {
                Vehicle[] lot = {
                    new Vehicle("1AB-234", 3),
                    new Motorcycle("9KK-11", 5),
                    new Truck("80-1234", 2),
                    new Vehicle("2CD-567", 1)
                };
                double income = 0;
                for (Vehicle v : lot) {
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
            public double parkingFee() { return hours * 20; }
        }

        class Motorcycle extends Vehicle {
            public Motorcycle(String plate, int hours) { super(plate, hours); }
            @Override public double parkingFee() { return hours * 10; }
        }

        class Truck extends Vehicle {
            public Truck(String plate, int hours) { super(plate, hours); }
            @Override public double parkingFee() { return hours * 50 + 100; }
        }` },
    { level: 2, title: "toString, equals และ super.toString()", html: `<p>สร้างคลาส <code>Book</code> (ISBN, ชื่อเรื่อง, ราคา) override <code>toString()</code> และ <code>equals(Object o)</code> โดยถือว่าหนังสือสองเล่มเท่ากันเมื่อ ISBN ตรงกัน จากนั้นสร้างคลาสลูก <code>EBook</code> เพิ่ม field ขนาดไฟล์ (MB) และ override toString() โดยเรียก <code>super.toString()</code> แล้วต่อท้ายข้อมูลขนาดไฟล์</p>`,
      spec: ["equals ตรวจ <code>o instanceof Book other</code> ก่อนเปรียบเทียบ", "ทดสอบ == กับ equals ของหนังสือสองเล่มที่ ISBN เดียวกัน", "พิมพ์ทั้ง Book และ EBook"],
      solution: j`
        public class BookEquality {
            public static void main(String[] args) {
                Book a = new Book("978-1", "Java Basics", 350);
                Book b = new Book("978-1", "Java Basics (2nd print)", 360);
                Book c = new EBook("978-2", "Swing in Action", 199, 12.5);
                System.out.println(a);
                System.out.println(c);
                System.out.println("a == b ? " + (a == b));
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
            public boolean equals(Object o) {
                if (!(o instanceof Book other)) return false;
                return isbn.equals(other.isbn);
            }

            @Override
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
                return super.toString() + " (e-book, " + sizeMb + " MB)";
            }
        }`, explain: "เมื่อ override equals ควร override hashCode ด้วยเสมอ (จำเป็นเมื่อใช้กับ HashMap/HashSet ในอนาคต)" },
    { level: 3, title: "ระบบเงินเดือนด้วย abstract class", html: `<p>สร้าง abstract class <code>Employee</code> (ชื่อ, รหัส) มี abstract method <code>monthlyPay()</code> และเมธอดปกติ <code>payslip()</code> ที่คืนข้อความสรุป แล้วสร้างคลาสลูก 3 แบบ:</p><ul><li><code>FullTime</code> — เงินเดือนคงที่</li><li><code>PartTime</code> — ค่าจ้างต่อชั่วโมง × ชั่วโมง (ชั่วโมงที่เกิน 80 ได้ 1.5 เท่า)</li><li><code>SalesPerson</code> — ฐานเงินเดือน + ค่าคอมมิชชัน 3% ของยอดขาย</li></ul><p>ใน main สร้างพนักงานหลายแบบในอาเรย์เดียว พิมพ์สลิปทุกคน ยอดรวม และพนักงานที่ได้มากที่สุด</p>`,
      spec: ["field ทุกตัว private (ใช้ getter ใน payslip)", "ห้าม new Employee ตรง ๆ", "constructor ตรวจค่าติดลบโดยโยน IllegalArgumentException", "จัดรูปแบบตัวเลขด้วย %,.2f"],
      solution: j`
        public class Payroll {
            public static void main(String[] args) {
                Employee[] staff = {
                    new FullTime("E01", "Mali", 32000),
                    new PartTime("E02", "Beam", 120, 92),
                    new SalesPerson("E03", "Nida", 15000, 480000),
                    new PartTime("E04", "Tan", 150, 40)
                };
                double total = 0;
                Employee top = staff[0];
                for (Employee e : staff) {
                    System.out.println(e.payslip());
                    total += e.monthlyPay();
                    if (e.monthlyPay() > top.monthlyPay()) top = e;
                }
                System.out.printf("Total payroll: %,.2f%n", total);
                System.out.println("Highest: " + top.getName());
            }
        }

        abstract class Employee {
            private final String id;
            private final String name;

            protected Employee(String id, String name) {
                this.id = id;
                this.name = name;
            }

            public String getId() { return id; }
            public String getName() { return name; }
            public abstract double monthlyPay();

            public String payslip() {
                return String.format("%s %-5s %-12s %,12.2f", id, name, getClass().getSimpleName(), monthlyPay());
            }

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
                int normal = Math.min(hours, 80);
                int extra = Math.max(0, hours - 80);
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
            @Override public double monthlyPay() { return base + sales * 0.03; }
        }` },
    { level: 3, title: "interface สำหรับสิ่งที่คิดภาษีได้", html: `<p>สร้าง interface <code>Taxable</code> มีเมธอด <code>double taxableAmount()</code> และ <code>default double tax()</code> ที่คืน 7% ของ taxableAmount() จากนั้นสร้างคลาสที่ไม่เกี่ยวข้องกัน 2 คลาส: <code>Product</code> (ราคา × จำนวน) และ <code>Service</code> (ชั่วโมง × อัตรา + ค่าเดินทาง แต่ค่าเดินทางไม่เสียภาษี) ที่ implements Taxable แล้วรวมภาษีทั้งหมดในใบแจ้งหนี้</p>`,
      spec: ["Service override tax() ไม่ได้ — ให้ taxableAmount() คืนเฉพาะส่วนที่เสียภาษี", "เพิ่มเมธอด total() ในแต่ละคลาส (ยอดรวมทั้งหมด + ภาษี)", "ใช้อาเรย์ Taxable[] และแสดงตาราง"],
      solution: j`
        public class TaxInvoice {
            public static void main(String[] args) {
                Taxable[] items = {
                    new Product("Monitor", 4590, 2),
                    new Service("Installation", 3, 450, 300),
                    new Product("Cable", 120, 4)
                };
                double grand = 0, taxSum = 0;
                for (Taxable t : items) {
                    System.out.printf("%-14s taxable %,9.2f  tax %,8.2f%n", t.label(), t.taxableAmount(), t.tax());
                    taxSum += t.tax();
                    grand += t.total();
                }
                System.out.printf("VAT total  : %,10.2f%n", taxSum);
                System.out.printf("Grand total: %,10.2f%n", grand);
            }
        }

        interface Taxable {
            double taxableAmount();
            double total();
            String label();

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
                Member mali = new Member("Mali");
                Member beam = new Member("Beam");
                run(() -> mali.borrow(b1));
                run(() -> mali.borrow(d1));
                run(() -> beam.borrow(b1));
                run(() -> mali.borrow(b2));
                run(() -> mali.borrow(b3));
                run(() -> System.out.println("  fine = " + mali.giveBack(d1, 6)));
                run(() -> System.out.println("  fine = " + mali.giveBack(b1, 10)));
                run(() -> beam.giveBack(b2, 1));
                run(() -> beam.borrow(b1));
            }

            static void run(Runnable action) {
                try {
                    action.run();
                } catch (IllegalStateException e) {
                    System.out.println("  ERROR: " + e.getMessage());
                }
            }
        }

        abstract class Item {
            private final String code;
            private final String title;
            private boolean onLoan;

            protected Item(String code, String title) { this.code = code; this.title = title; }
            public String getCode() { return code; }
            public boolean isOnLoan() { return onLoan; }
            void setOnLoan(boolean v) { onLoan = v; }
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
            private final Item[] items = new Item[3];
            private int count;

            Member(String name) { this.name = name; }

            public void borrow(Item item) {
                System.out.println(name + " borrows " + item);
                if (item.isOnLoan()) throw new IllegalStateException(item.getCode() + " is already on loan");
                if (count == items.length) throw new IllegalStateException(name + " already has 3 items");
                items[count++] = item;
                item.setOnLoan(true);
                System.out.println("  OK (" + count + "/3)");
            }

            public int giveBack(Item item, int daysKept) {
                System.out.println(name + " returns " + item + " after " + daysKept + " days");
                int index = -1;
                for (int i = 0; i < count; i++) {
                    if (items[i] == item) index = i;
                }
                if (index == -1) throw new IllegalStateException(name + " did not borrow " + item.getCode());
                items[index] = items[count - 1];
                items[count - 1] = null;
                count--;
                item.setOnLoan(false);
                return Math.max(0, daysKept - item.loanDays()) * item.finePerDay();
            }
        }`, explain: "เฉลยใช้ lambda <code>() -&gt; ...</code> ส่งงานแต่ละเหตุการณ์ให้เมธอด run ซึ่งรวม try-catch ไว้ที่เดียว (จะเรียน lambda ละเอียดในบทที่ 16) ถ้ายังไม่ถนัดให้เขียน try-catch แยกทุกเหตุการณ์ก็ได้" },
  ],
};
