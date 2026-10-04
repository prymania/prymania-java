import { j, c, pre } from "../lib.mjs";

export default {
  num: 13, file: "chapter-13.html",
  pageTitle: "บทที่ 13: ArrayList และชุดข้อมูล", shortName: "บทที่ 13",
  tocLabel: "บทที่ 13 · รายการที่ยืดหดได้", sidebarBottom: "size() เปลี่ยนได้ ต่างจาก length ของอาเรย์",
  kicker: "บทที่ 13 · เก็บข้อมูลแบบยืดหยุ่น", h1: "ArrayList และชุดข้อมูล",
  lead: "ใช้รายการที่เพิ่มและลบสมาชิกได้ตลอดเวลา เลือกระหว่าง Array กับ ArrayList และเก็บออบเจ็กต์หลายตัวเพื่อจัดการเป็นระบบ",
  goals: ["เลือกใช้ Array หรือ ArrayList ได้เหมาะสม", "ใช้ generic type และ wrapper class", "เพิ่ม อ่าน แก้ ลบ และค้นหาในรายการ", "เก็บและประมวลผลออบเจ็กต์ในรายการ"],
  prev: { href: "chapter-12.html", label: "← บทที่ 12" },
  next: { href: "chapter-14.html", label: "บทที่ 14: Swing →" },
  footer: "บทที่ 13 · ระวัง index เลื่อนเมื่อลบสมาชิก",
  introHeading: "13. เมื่อไม่รู้ล่วงหน้าว่าจะมีข้อมูลกี่ตัว",
  introHtml: `<p>อาเรย์ต้องกำหนดขนาดตอนสร้างและเปลี่ยนไม่ได้ ถ้าไม่รู้ว่าผู้ใช้จะเพิ่มสินค้ากี่ชิ้น เราต้องเดาขนาดและนับจำนวนเอง (เหมือน Classroom ในบทที่ 12) <code>ArrayList</code> จากแพ็กเกจ <code>java.util</code> คือรายการที่<strong>ขยายและหดตัวเองอัตโนมัติ</strong> พร้อมเมธอดเพิ่ม ลบ ค้นหา สำเร็จรูป</p>`,
  topics: [
    {
      num: "13.1", toc: "Array หรือ ArrayList", title: "Array หรือ ArrayList",
      blocks: [
        { type: "table", head: ["", "Array", "ArrayList"], rows: [
          ["ขนาด", "คงที่ตอนสร้าง", "เปลี่ยนได้ตลอด"],
          ["ประกาศ", "<code>int[] a = new int[5];</code>", "<code>ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();</code>"],
          ["จำนวนสมาชิก", "<code>a.length</code>", "<code>list.size()</code>"],
          ["อ่าน / เขียน", "<code>a[i]</code> / <code>a[i] = x</code>", "<code>list.get(i)</code> / <code>list.set(i, x)</code>"],
          ["เพิ่ม / ลบ", "ทำเองยาก", "<code>add</code>, <code>remove</code>"],
          ["ชนิดข้อมูล", "primitive หรือออบเจ็กต์", "ออบเจ็กต์เท่านั้น (ใช้ Integer แทน int)"],
          ["เหมาะกับ", "จำนวนแน่นอน ตาราง 2 มิติ ประสิทธิภาพสูง", "รายการที่เพิ่ม/ลบระหว่างทำงาน"],
        ] },
        { type: "run", title: "ArrayList แรก", level: "พื้นฐาน",
          concept: "สร้างรายการว่าง เพิ่มทีละตัวด้วย add แล้วพิมพ์ทั้งรายการได้ทันที (ArrayList มี toString ในตัว)",
          code: j`
            import java.util.ArrayList;

            public class FirstList {
                public static void main(String[] args) {
                    ArrayList<String> fruits = new ArrayList<>();
                    System.out.println("Empty? " + fruits.isEmpty() + ", size = " + fruits.size());
                    fruits.add("Apple");
                    fruits.add("Banana");
                    fruits.add("Cherry");
                    System.out.println(fruits);
                    System.out.println("size = " + fruits.size());
                    System.out.println("first = " + fruits.get(0));
                    System.out.println("last = " + fruits.get(fruits.size() - 1));
                }
            }`,
          steps: ["ต้อง <code>import java.util.ArrayList;</code>", "เริ่มว่าง size = 0", "add ต่อท้ายทีละตัว size เพิ่มเอง", "println แสดง [Apple, Banana, Cherry] โดยไม่ต้องใช้ Arrays.toString"] },
        { type: "run", title: "อาเรย์เทียบกับ ArrayList: รับข้อมูลจนกว่าจะพอ", level: "ต่อยอด", stdin: "72\n85\n90\n64\n-1",
          concept: "ไม่ต้องถามจำนวนล่วงหน้า — เพิ่มลงรายการจนกว่าผู้ใช้จะป้อน sentinel",
          code: j`
            import java.util.ArrayList;
            import java.util.Scanner;

            public class ReadUntilSentinel {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    ArrayList<Integer> scores = new ArrayList<>();
                    while (true) {
                        System.out.print("Score (-1 to stop): ");
                        int s = input.nextInt();
                        if (s == -1) break;
                        scores.add(s);
                    }
                    System.out.println("Scores: " + scores);
                    System.out.println("Count: " + scores.size());
                }
            }`,
          steps: ["ไม่รู้ว่าจะมีกี่คะแนน → อาเรย์ไม่สะดวก", "add ทุกครั้งที่ได้ค่าใหม่", "size() บอกจำนวนจริง"] },
        { type: "check", title: "เลือกโครงสร้าง", html: `<p>ควรใช้ Array หรือ ArrayList: (ก) อุณหภูมิ 7 วันในสัปดาห์ (ข) รายการสินค้าในตะกร้าที่ผู้ใช้เพิ่ม/ลบได้ (ค) กระดานหมากรุก 8×8</p>`, answer: `<p>(ก) Array — จำนวนแน่นอน (ข) ArrayList — เปลี่ยนจำนวนตลอด (ค) Array 2 มิติ</p>` },
      ],
    },
    {
      num: "13.2", toc: "Generic type", title: "Generic type และ wrapper class",
      blocks: [
        { type: "p", html: `<code>&lt;String&gt;</code> ใน <code>ArrayList&lt;String&gt;</code> เรียกว่า <strong>type parameter</strong> (generic) บอกว่ารายการนี้เก็บชนิดใด compiler จะตรวจให้ว่าไม่เผลอใส่ชนิดอื่น ArrayList เก็บได้เฉพาะออบเจ็กต์ จึงใช้ <strong>wrapper class</strong> แทน primitive: <code>Integer</code> (int), <code>Double</code> (double), <code>Character</code> (char), <code>Boolean</code> (boolean) Java แปลงไปมาให้อัตโนมัติ (autoboxing / unboxing)` },
        { type: "run", title: "Integer และ Double ในรายการ", level: "พื้นฐาน",
          concept: "เขียน <code>list.add(5)</code> ได้เลย Java แปลง int เป็น Integer ให้ และแปลงกลับเมื่อนำไปคำนวณ",
          code: j`
            import java.util.ArrayList;

            public class WrapperDemo {
                public static void main(String[] args) {
                    ArrayList<Integer> nums = new ArrayList<>();
                    nums.add(5);
                    nums.add(12);
                    nums.add(8);
                    int sum = 0;
                    for (int n : nums) {
                        sum += n;
                    }
                    System.out.println(nums + " sum = " + sum);

                    ArrayList<Double> prices = new ArrayList<>();
                    prices.add(19.5);
                    prices.add(7.25);
                    double first = prices.get(0);
                    System.out.println("first price x 2 = " + first * 2);
                }
            }`,
          steps: ["add(5) → autoboxing เป็น Integer", "for-each ด้วยตัวแปร int → unboxing อัตโนมัติ", "get(0) คืน Double เก็บลง double ได้ตรง ๆ"] },
        { type: "run", label: "ทดลอง error 13.2.2", title: "ใช้ primitive หรือใส่ผิดชนิด", level: "ต่อยอด", expect: "compile-error",
          concept: "generic ต้องเป็นคลาส และ compiler กันไม่ให้ใส่ชนิดที่ไม่ตรง",
          code: j`
            import java.util.ArrayList;

            public class GenericErrors {
                public static void main(String[] args) {
                    ArrayList<int> numbers = new ArrayList<>();
                    ArrayList<String> names = new ArrayList<>();
                    names.add(42);
                }
            }`,
          steps: ["<code>ArrayList&lt;int&gt;</code> → <code>unexpected type ... required: reference, found: int</code> ใช้ Integer แทน", "<code>names.add(42)</code> → int ไม่ใช่ String", "ข้อดีของ generic: ผิดตั้งแต่ตอนคอมไพล์ ไม่ต้องรอไปพังตอนรัน"] },
        { type: "run", label: "ทดลองบั๊ก 13.2.3", title: "เปรียบเทียบ Integer ด้วย ==", level: "ประยุกต์",
          concept: "Integer เป็นออบเจ็กต์ <code>==</code> เทียบการอ้างอิง ค่าเล็ก (−128 ถึง 127) บังเอิญถูกเพราะ Java แคชไว้ แต่ค่าใหญ่จะผิด — ใช้ <code>equals</code> หรือแปลงเป็น int ก่อน",
          code: j`
            import java.util.ArrayList;

            public class IntegerEquality {
                public static void main(String[] args) {
                    ArrayList<Integer> list = new ArrayList<>();
                    list.add(100);
                    list.add(100);
                    list.add(1000);
                    list.add(1000);
                    System.out.println("100 == 100   ? " + (list.get(0) == list.get(1)));
                    System.out.println("1000 == 1000 ? " + (list.get(2) == list.get(3)));
                    System.out.println("equals       ? " + list.get(2).equals(list.get(3)));
                    int a = list.get(2), b = list.get(3);
                    System.out.println("int a == b   ? " + (a == b));
                }
            }`,
          steps: ["100 อยู่ในช่วงแคช → == ได้ true (บังเอิญ)", "1000 เป็นคนละออบเจ็กต์ → == ได้ false", "equals เทียบค่า → true", "unbox เป็น int แล้ว == ถูกต้อง"] },
        { type: "check", title: "wrapper", html: `<p>ประกาศรายการสำหรับเก็บ (ก) ตัวอักษรเกรด (ข) ราคาสินค้า (ค) สถานะเปิด/ปิด ได้อย่างไร</p>`, answer: `<p>(ก) <code>ArrayList&lt;Character&gt;</code> (ข) <code>ArrayList&lt;Double&gt;</code> (ค) <code>ArrayList&lt;Boolean&gt;</code></p>` },
      ],
    },
    {
      num: "13.3", toc: "เพิ่ม อ่าน แก้ข้อมูล", title: "เพิ่ม อ่าน แก้ และค้นหาข้อมูล",
      blocks: [
        { type: "table", head: ["เมธอด", "ทำอะไร"], rows: [
          ["<code>add(x)</code>", "ต่อท้าย"], ["<code>add(i, x)</code>", "แทรกที่ตำแหน่ง i (สมาชิกเดิมเลื่อนไปขวา)"],
          ["<code>get(i)</code>", "อ่านสมาชิกตำแหน่ง i"], ["<code>set(i, x)</code>", "แทนที่สมาชิกตำแหน่ง i (คืนค่าเดิม)"],
          ["<code>size()</code> / <code>isEmpty()</code>", "จำนวน / ว่างไหม"], ["<code>contains(x)</code>", "มี x ไหม (ใช้ equals)"],
          ["<code>indexOf(x)</code> / <code>lastIndexOf(x)</code>", "ตำแหน่งแรก/สุดท้ายของ x หรือ −1"], ["<code>clear()</code>", "ลบทั้งหมด"],
        ] },
        { type: "run", title: "add, add(i, x), set และ get", level: "พื้นฐาน",
          concept: "add(i, x) แทรก (สมาชิกเดิมเลื่อน) ส่วน set(i, x) แทนที่ (จำนวนเท่าเดิม)",
          code: j`
            import java.util.ArrayList;

            public class AddSetGet {
                public static void main(String[] args) {
                    ArrayList<String> queue = new ArrayList<>();
                    queue.add("Mali");
                    queue.add("Beam");
                    queue.add("Nida");
                    System.out.println("start   " + queue);
                    queue.add(1, "Ploy");
                    System.out.println("insert  " + queue);
                    String old = queue.set(0, "Tan");
                    System.out.println("set     " + queue + " (replaced " + old + ")");
                    System.out.println("get(2)  " + queue.get(2));
                    System.out.println("size    " + queue.size());
                }
            }`,
          steps: ["แทรก Ploy ที่ index 1 → Beam และ Nida เลื่อนไป index 2, 3", "set(0, \"Tan\") แทน Mali และคืนค่าเดิมกลับมา", "size เพิ่มจาก add แต่ไม่เพิ่มจาก set"] },
        { type: "run", title: "contains และ indexOf", level: "ต่อยอด", stdin: "Banana\nMango",
          concept: "ค้นหาด้วยเมธอดสำเร็จรูป ซึ่งใช้ equals เปรียบเทียบ (ตรงตัวพิมพ์)",
          code: j`
            import java.util.ArrayList;
            import java.util.Scanner;

            public class SearchList {
                public static void main(String[] args) {
                    ArrayList<String> stock = new ArrayList<>();
                    stock.add("Apple");
                    stock.add("Banana");
                    stock.add("Cherry");
                    stock.add("Banana");
                    Scanner input = new Scanner(System.in);
                    for (int k = 0; k < 2; k++) {
                        System.out.print("Find: ");
                        String item = input.next();
                        if (stock.contains(item)) {
                            System.out.println("  first at " + stock.indexOf(item) + ", last at " + stock.lastIndexOf(item));
                        } else {
                            System.out.println("  not in stock -> adding");
                            stock.add(item);
                        }
                    }
                    System.out.println(stock);
                }
            }`,
          steps: ["Banana มีอยู่ → indexOf 1, lastIndexOf 3", "Mango ไม่มี → เพิ่มต่อท้าย", "รายการสุดท้ายมี 5 ตัว"] },
        { type: "run", label: "ทดลอง error 13.3.3", title: "get เกินขอบเขต", level: "ประยุกต์", expect: "runtime-error",
          concept: "index ที่ใช้ได้คือ 0 ถึง size() − 1 เหมือนอาเรย์ แต่ exception ชื่อ <code>IndexOutOfBoundsException</code>",
          code: j`
            import java.util.ArrayList;

            public class ListOutOfBounds {
                public static void main(String[] args) {
                    ArrayList<Integer> list = new ArrayList<>();
                    list.add(10);
                    list.add(20);
                    System.out.println(list.get(1));
                    System.out.println(list.get(2));
                }
            }`,
          steps: ["size = 2 → index ใช้ได้ 0, 1", "get(2) → <code>Index 2 out of bounds for length 2</code>", "ArrayList ใหม่ที่ว่างเปล่า get(0) ก็ error เช่นกัน"] },
        { type: "check", title: "add vs set", html: pre(`
          ArrayList<Integer> a = new ArrayList<>();
          a.add(1); a.add(2); a.add(3);
          a.add(0, 9);
          a.set(2, 7);`), answer: `<p>[1,2,3] → add(0,9) → [9,1,2,3] → set(2,7) → <strong>[9, 1, 7, 3]</strong></p>` },
      ],
    },
    {
      num: "13.4", toc: "ลบและ index ที่เลื่อน", title: "ลบสมาชิกและ index ที่เลื่อน",
      blocks: [
        { type: "p", html: `<code>remove(int index)</code> ลบตามตำแหน่ง และ <code>remove(Object o)</code> ลบตามค่า (ตัวแรกที่พบ) หลังลบ สมาชิกทางขวา<strong>เลื่อนมาทางซ้าย</strong>หนึ่งตำแหน่ง — ต้องระวังเมื่อลบระหว่างวนลูป` },
        { type: "run", title: "remove ตามตำแหน่งและตามค่า", level: "พื้นฐาน",
          concept: "กับ ArrayList&lt;Integer&gt; ระวัง: <code>remove(2)</code> คือลบ <em>index</em> 2 ถ้าต้องการลบ<em>ค่า</em> 2 ใช้ <code>remove(Integer.valueOf(2))</code>",
          code: j`
            import java.util.ArrayList;

            public class RemoveDemo {
                public static void main(String[] args) {
                    ArrayList<String> names = new ArrayList<>();
                    names.add("Mali"); names.add("Beam"); names.add("Nida"); names.add("Beam");
                    names.remove(0);
                    System.out.println("remove(0)       " + names);
                    names.remove("Beam");
                    System.out.println("remove(\"Beam\")  " + names);

                    ArrayList<Integer> nums = new ArrayList<>();
                    nums.add(5); nums.add(2); nums.add(9); nums.add(2);
                    nums.remove(2);
                    System.out.println("remove(2)       " + nums);
                    nums.remove(Integer.valueOf(2));
                    System.out.println("remove(value 2) " + nums);
                }
            }`,
          steps: ["ลบ index 0 → Beam เลื่อนมาเป็น index 0", "remove(\"Beam\") ลบตัวแรกที่พบเท่านั้น", "nums.remove(2) ลบ index 2 (ค่า 9)", "remove(Integer.valueOf(2)) ลบค่า 2 ตัวแรก"] },
        { type: "run", label: "ทดลองบั๊ก 13.4.2", title: "ลบในลูปแล้วข้ามสมาชิก", level: "ต่อยอด",
          concept: "ลบที่ index i แล้วสมาชิกถัดไปเลื่อนมาอยู่ที่ i แต่ลูปเพิ่ม i ไปแล้ว → ตัวที่เลื่อนมาถูกข้าม",
          code: j`
            import java.util.ArrayList;

            public class RemoveSkipBug {
                public static void main(String[] args) {
                    ArrayList<Integer> scores = new ArrayList<>();
                    scores.add(45); scores.add(30); scores.add(80); scores.add(20); scores.add(10); scores.add(90);
                    for (int i = 0; i < scores.size(); i++) {
                        if (scores.get(i) < 50) {
                            scores.remove(i);
                        }
                    }
                    System.out.println("Expected [80, 90] but got " + scores);
                }
            }`,
          steps: ["i=0 ลบ 45 → 30 เลื่อนมาที่ index 0 แต่ i กลายเป็น 1 → 30 ถูกข้าม", "i=1 คือ 80 ไม่ลบ, i=2 ลบ 20 → 10 เลื่อนมา แล้วถูกข้ามอีก", "ผลลัพธ์ยังเหลือ 30 และ 10"] },
        { type: "run", title: "สามวิธีลบอย่างถูกต้อง", level: "ประยุกต์",
          concept: "(1) วนจากท้ายไปหน้า (2) ไม่เพิ่ม i เมื่อลบ (3) ใช้ <code>removeIf</code> กับ lambda",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class RemoveCorrectly {
                public static void main(String[] args) {
                    List<Integer> data = List.of(45, 30, 80, 20, 10, 90);

                    ArrayList<Integer> a = new ArrayList<>(data);
                    for (int i = a.size() - 1; i >= 0; i--) {
                        if (a.get(i) < 50) a.remove(i);
                    }
                    System.out.println("backward : " + a);

                    ArrayList<Integer> b = new ArrayList<>(data);
                    int i = 0;
                    while (i < b.size()) {
                        if (b.get(i) < 50) b.remove(i);
                        else i++;
                    }
                    System.out.println("while    : " + b);

                    ArrayList<Integer> c = new ArrayList<>(data);
                    c.removeIf(score -> score < 50);
                    System.out.println("removeIf : " + c);
                }
            }`,
          steps: ["<code>new ArrayList&lt;&gt;(data)</code> คัดลอกรายการตั้งต้น", "วนถอยหลัง: การเลื่อนเกิดกับสมาชิกที่ตรวจไปแล้วเท่านั้น", "while: เพิ่ม i เฉพาะเมื่อไม่ได้ลบ", "removeIf: สั้นที่สุด อ่านว่า “ลบทุก score ที่ score &lt; 50”"] },
        { type: "run", label: "ทดลอง error 13.4.4", title: "ลบระหว่าง for-each", level: "ท้าทาย", expect: "runtime-error",
          concept: "แก้โครงสร้างรายการ (add/remove) ระหว่าง for-each จะเกิด <code>ConcurrentModificationException</code>",
          code: j`
            import java.util.ArrayList;

            public class ForEachRemove {
                public static void main(String[] args) {
                    ArrayList<String> items = new ArrayList<>();
                    items.add("keep"); items.add("drop"); items.add("keep"); items.add("drop");
                    for (String s : items) {
                        if (s.equals("drop")) {
                            items.remove(s);
                        }
                    }
                    System.out.println(items);
                }
            }`,
          steps: ["for-each ใช้ iterator ที่ตรวจว่ารายการถูกแก้ระหว่างวนหรือไม่", "เมื่อพบการแก้ → exception", "แก้ด้วยวิธีใดวิธีหนึ่งในตัวอย่างก่อนหน้า"] },
        { type: "check", title: "index เลื่อน", html: pre(`
          ArrayList<String> s = new ArrayList<>(List.of("A", "B", "C", "D", "E"));
          s.remove(1);
          s.remove(2);`), answer: `<p>remove(1) ลบ B → [A, C, D, E] แล้ว remove(2) ลบ D (ไม่ใช่ C!) → <strong>[A, C, E]</strong></p>` },
      ],
    },
    {
      num: "13.5", toc: "วนอ่านรายการ", title: "วนอ่าน ประมวลผล และเรียงรายการ",
      blocks: [
        { type: "run", title: "for ปกติ, for-each และ forEach", level: "พื้นฐาน",
          concept: "เลือกแบบที่เหมาะ: ต้องใช้ index → for ปกติ, อ่านอย่างเดียว → for-each, สั้นที่สุด → <code>list.forEach(...)</code>",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class IterateList {
                public static void main(String[] args) {
                    ArrayList<String> tasks = new ArrayList<>(List.of("Read", "Code", "Test"));
                    for (int i = 0; i < tasks.size(); i++) {
                        System.out.println((i + 1) + ". " + tasks.get(i));
                    }
                    for (String t : tasks) {
                        System.out.print(t.toUpperCase() + " ");
                    }
                    System.out.println();
                    tasks.forEach(t -> System.out.println("- " + t));
                }
            }`,
          steps: ["for ปกติแสดงลำดับที่", "for-each แปลงทีละตัว", "forEach รับ lambda ทำกับทุกสมาชิก (บทที่ 16 อธิบาย lambda ละเอียด)"] },
        { type: "run", title: "สถิติจากรายการ: รวม ค่าเฉลี่ย สูงสุด กรอง", level: "ต่อยอด",
          concept: "รูปแบบเดียวกับอาเรย์ในบทที่ 8 แต่ใช้ size() และ get() — และสร้างรายการใหม่จากการกรองได้ง่าย",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class ListStats {
                public static void main(String[] args) {
                    ArrayList<Double> temps = new ArrayList<>(List.of(31.5, 29.0, 33.2, 35.1, 30.4, 34.0));
                    double sum = 0, max = temps.get(0);
                    ArrayList<Double> hotDays = new ArrayList<>();
                    for (double t : temps) {
                        sum += t;
                        if (t > max) max = t;
                        if (t >= 33) hotDays.add(t);
                    }
                    System.out.printf("Average %.2f, Max %.1f%n", sum / temps.size(), max);
                    System.out.println("Hot days (>= 33): " + hotDays + " -> " + hotDays.size() + " days");
                }
            }`,
          steps: ["วนครั้งเดียวคำนวณได้หลายค่า", "hotDays เป็นรายการใหม่ที่เพิ่มเฉพาะค่าที่ผ่านเงื่อนไข — ไม่ต้องรู้ขนาดล่วงหน้า"] },
        { type: "run", title: "Collections: sort, reverse, max, min, frequency", level: "ประยุกต์",
          concept: "คลาส <code>java.util.Collections</code> มีเครื่องมือสำเร็จรูปสำหรับรายการ เทียบได้กับ Arrays ของอาเรย์",
          code: j`
            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;

            public class CollectionsTools {
                public static void main(String[] args) {
                    ArrayList<Integer> nums = new ArrayList<>(List.of(42, 7, 19, 7, 3, 25, 7));
                    System.out.println("max " + Collections.max(nums) + ", min " + Collections.min(nums));
                    System.out.println("frequency of 7: " + Collections.frequency(nums, 7));
                    Collections.sort(nums);
                    System.out.println("sorted   " + nums);
                    Collections.reverse(nums);
                    System.out.println("reversed " + nums);

                    ArrayList<String> names = new ArrayList<>(List.of("ploy", "Beam", "mali", "Nida"));
                    Collections.sort(names);
                    System.out.println("sorted names           " + names);
                    names.sort(String.CASE_INSENSITIVE_ORDER);
                    System.out.println("case-insensitive order " + names);
                }
            }`,
          steps: ["max/min/frequency ไม่ต้องเขียนลูปเอง", "sort เรียงในรายการเดิม", "String เรียงตามรหัสอักขระ: ตัวใหญ่มาก่อนตัวเล็ก", "<code>String.CASE_INSENSITIVE_ORDER</code> เรียงโดยไม่สนตัวพิมพ์"] },
        { type: "check", title: "กรอง", html: `<p>มี <code>ArrayList&lt;String&gt; words</code> จะสร้างรายการใหม่ที่มีเฉพาะคำยาวกว่า 4 ตัวอักษรได้อย่างไร</p>`, answer: pre(`
          ArrayList<String> longWords = new ArrayList<>();
          for (String w : words) {
              if (w.length() > 4) longWords.add(w);
          }`) },
      ],
    },
    {
      num: "13.6", toc: "เก็บ object ในรายการ", title: "เก็บ object ในรายการ",
      blocks: [
        { type: "p", html: `ArrayList ของออบเจ็กต์ (เช่น <code>ArrayList&lt;Student&gt;</code>) คือรูปแบบหลักของโปรแกรมจัดการข้อมูล: เพิ่ม ค้นหา แก้ไข ลบ รายงาน — และเป็นพื้นฐานของ model ในโปรแกรม GUI บทที่ 14–19` },
        { type: "run", title: "รายชื่อนักศึกษา: เพิ่ม ค้นหา แก้ไข", level: "ประยุกต์",
          concept: "ค้นหาออบเจ็กต์ด้วย field (เช่น รหัส) แล้วแก้ไขผ่านเมธอดของออบเจ็กต์นั้น — การแก้มีผลกับออบเจ็กต์ในรายการจริง",
          code: j`
            import java.util.ArrayList;

            public class StudentList {
                public static void main(String[] args) {
                    ArrayList<Student> list = new ArrayList<>();
                    list.add(new Student("6601", "Mali", 78));
                    list.add(new Student("6602", "Beam", 55));
                    list.add(new Student("6603", "Nida", 91));

                    Student s = findById(list, "6602");
                    if (s != null) s.setScore(65);

                    System.out.println(findById(list, "9999"));
                    for (Student st : list) System.out.println(st);
                }

                static Student findById(ArrayList<Student> list, String id) {
                    for (Student s : list) {
                        if (s.getId().equals(id)) return s;
                    }
                    return null;
                }
            }

            class Student {
                private final String id;
                private final String name;
                private int score;

                Student(String id, String name, int score) {
                    this.id = id;
                    this.name = name;
                    this.score = score;
                }

                String getId() { return id; }
                int getScore() { return score; }
                void setScore(int score) { this.score = score; }

                @Override
                public String toString() {
                    return id + " " + name + " " + score;
                }
            }`,
          steps: ["findById คืนออบเจ็กต์ที่พบ หรือ null", "s ชี้ออบเจ็กต์เดียวกับในรายการ → setScore มีผลจริง", "ผู้เรียกต้องตรวจ null ก่อนใช้"] },
        { type: "run", title: "เรียงออบเจ็กต์ด้วย Comparator", level: "ท้าทาย",
          concept: "บอกวิธีเรียงด้วย <code>Comparator.comparing(...)</code> — เรียงตามคะแนน, ตามชื่อ, หรือกลับลำดับด้วย <code>.reversed()</code>",
          code: j`
            import java.util.ArrayList;
            import java.util.Comparator;

            public class SortObjects {
                public static void main(String[] args) {
                    ArrayList<Product> items = new ArrayList<>();
                    items.add(new Product("Mouse", 390, 25));
                    items.add(new Product("Keyboard", 890, 30));
                    items.add(new Product("Cable", 120, 60));
                    items.add(new Product("Monitor", 4590, 5));

                    items.sort(Comparator.comparing(Product::getPrice));
                    System.out.println("By price:       " + items);
                    items.sort(Comparator.comparing(Product::getStock).reversed());
                    System.out.println("By stock desc:  " + items);
                    items.sort(Comparator.comparing(Product::getName));
                    System.out.println("By name:        " + items);

                    double value = 0;
                    for (Product p : items) value += p.getPrice() * p.getStock();
                    System.out.printf("Inventory value: %,.2f%n", value);
                }
            }

            class Product {
                private final String name;
                private final double price;
                private final int stock;

                Product(String name, double price, int stock) {
                    this.name = name;
                    this.price = price;
                    this.stock = stock;
                }

                String getName() { return name; }
                double getPrice() { return price; }
                int getStock() { return stock; }

                @Override
                public String toString() { return name; }
            }`,
          steps: ["<code>Product::getPrice</code> คือ method reference: “ใช้ getPrice ของแต่ละตัวเป็นเกณฑ์”", "<code>.reversed()</code> กลับเป็นมากไปน้อย", "มูลค่าคลังรวมราคา × จำนวนของทุกรายการ"] },
        { type: "run", title: "เมนูจัดการรายการสิ่งที่ต้องทำ (To-do)", level: "ท้าทาย", stdin: "1\nRead chapter 13\n1\nWrite code\n1\nTest program\n3\n2\n2\n3\n0",
          concept: "รวมทุกอย่าง: ArrayList + เมนู do-while + การลบด้วย index ที่ผู้ใช้เลือก (ผู้ใช้นับจาก 1 โค้ดต้องลบ 1)",
          code: j`
            import java.util.ArrayList;
            import java.util.Scanner;

            public class TodoApp {
                public static void main(String[] args) {
                    Scanner in = new Scanner(System.in);
                    ArrayList<String> todos = new ArrayList<>();
                    int choice;
                    do {
                        System.out.print("[1] Add [2] Done [3] List [0] Exit: ");
                        choice = in.nextInt();
                        in.nextLine();
                        switch (choice) {
                            case 1 -> {
                                System.out.print("  Task: ");
                                todos.add(in.nextLine());
                            }
                            case 2 -> {
                                System.out.print("  Task number: ");
                                int n = in.nextInt();
                                if (n >= 1 && n <= todos.size()) {
                                    System.out.println("  Completed: " + todos.remove(n - 1));
                                } else {
                                    System.out.println("  No such task");
                                }
                            }
                            case 3 -> {
                                if (todos.isEmpty()) System.out.println("  (empty)");
                                for (int i = 0; i < todos.size(); i++) {
                                    System.out.println("  " + (i + 1) + ". " + todos.get(i));
                                }
                            }
                            case 0 -> System.out.println("Bye");
                            default -> System.out.println("  Invalid");
                        }
                    } while (choice != 0);
                }
            }`,
          steps: ["เพิ่ม 3 งาน", "แสดงรายการ: เลขลำดับ = index + 1", "ทำงานที่ 2 เสร็จ → remove(1) คืนค่าที่ลบออกมาแสดง", "แสดงอีกครั้ง: Test program เลื่อนเป็นข้อ 2"] },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "รายชื่อเพื่อน", html: `<p>สร้าง <code>ArrayList&lt;String&gt;</code> เพิ่มชื่อเพื่อน 4 คน แล้ว (1) แสดงทั้งรายการและจำนวน (2) แทรกชื่อใหม่ที่ตำแหน่งแรก (3) เปลี่ยนชื่อคนสุดท้าย (4) แสดงผลอีกครั้ง</p>`,
      spec: ["ใช้ add, add(0, x), set, size, get", "ตำแหน่งสุดท้ายใช้ <code>size() - 1</code>"],
      solution: j`
        import java.util.ArrayList;

        public class FriendList {
            public static void main(String[] args) {
                ArrayList<String> friends = new ArrayList<>();
                friends.add("Mali");
                friends.add("Beam");
                friends.add("Nida");
                friends.add("Ploy");
                System.out.println(friends + " (" + friends.size() + ")");
                friends.add(0, "Tan");
                friends.set(friends.size() - 1, "Pim");
                System.out.println(friends + " (" + friends.size() + ")");
                System.out.println("First: " + friends.get(0) + ", Last: " + friends.get(friends.size() - 1));
            }
        }` },
    { level: 1, title: "รับตัวเลขจนกว่าจะป้อน 0", html: `<p>รับจำนวนเต็มไปเรื่อย ๆ จนกว่าผู้ใช้ป้อน 0 เก็บลง ArrayList แล้วแสดง รายการทั้งหมด ผลรวม ค่าเฉลี่ย ค่ามากสุดและน้อยสุด (ใช้ Collections.max/min ได้)</p>`,
      spec: ["0 ไม่เก็บในรายการ", "ถ้าไม่มีข้อมูลให้แสดง No numbers"], runs: ["8 -3 15 4 0", "0"],
      solution: j`
        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.Scanner;

        public class NumberList {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                ArrayList<Integer> nums = new ArrayList<>();
                System.out.print("Numbers (0 to stop): ");
                int n = in.nextInt();
                while (n != 0) {
                    nums.add(n);
                    n = in.nextInt();
                }
                if (nums.isEmpty()) {
                    System.out.println("No numbers");
                    return;
                }
                int sum = 0;
                for (int x : nums) sum += x;
                System.out.println("List: " + nums);
                System.out.printf("Sum: %d, Average: %.2f%n", sum, (double) sum / nums.size());
                System.out.println("Max: " + Collections.max(nums) + ", Min: " + Collections.min(nums));
            }
        }` },
    { level: 1, title: "ลบสมาชิกตามค่าและตามตำแหน่ง", html: `<p>รายการ <code>[10, 20, 30, 20, 40, 50]</code> (ArrayList&lt;Integer&gt;) ให้ (1) ลบค่า 20 ตัวแรก (2) ลบสมาชิกที่ index 2 (3) ลบค่า 50 แล้วแสดงรายการหลังแต่ละขั้น อธิบายว่าขั้น (2) ลบค่าอะไรและทำไม</p>`,
      spec: ["ลบตามค่าต้องใช้ <code>Integer.valueOf(...)</code>", "สร้างรายการเริ่มต้นด้วย <code>new ArrayList&lt;&gt;(List.of(...))</code>"],
      solution: j`
        import java.util.ArrayList;
        import java.util.List;

        public class RemoveSteps {
            public static void main(String[] args) {
                ArrayList<Integer> list = new ArrayList<>(List.of(10, 20, 30, 20, 40, 50));
                System.out.println("start          " + list);
                list.remove(Integer.valueOf(20));
                System.out.println("remove value 20 " + list);
                list.remove(2);
                System.out.println("remove index 2  " + list);
                list.remove(Integer.valueOf(50));
                System.out.println("remove value 50 " + list);
            }
        }`, explain: "หลังขั้น (1) รายการเป็น [10, 30, 20, 40, 50] index 2 จึงเป็นค่า 20 (ตัวที่สอง) ไม่ใช่ 30" },
    { level: 2, title: "กรองคะแนนที่ไม่ผ่าน", html: `<p>รับคะแนน n ค่าลงรายการ จากนั้น (1) สร้างรายการใหม่ของคะแนนที่ผ่าน (≥ 50) (2) <strong>ลบ</strong>คะแนนที่ไม่ผ่านออกจากรายการเดิมโดยวนลูปถอยหลัง (3) แสดงทั้งสองรายการ และจำนวนที่ถูกลบ</p>`,
      spec: ["ห้ามใช้ removeIf ในข้อนี้ (ฝึกวนถอยหลัง)", "เก็บขนาดเดิมไว้คำนวณจำนวนที่ถูกลบ"], stdin: "8\n45 72 30 50 49 88 12 65",
      solution: j`
        import java.util.ArrayList;
        import java.util.Scanner;

        public class FilterScores {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                System.out.print("n = ");
                int n = in.nextInt();
                ArrayList<Integer> scores = new ArrayList<>();
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) scores.add(in.nextInt());

                ArrayList<Integer> passed = new ArrayList<>();
                for (int s : scores) if (s >= 50) passed.add(s);

                int before = scores.size();
                for (int i = scores.size() - 1; i >= 0; i--) {
                    if (scores.get(i) < 50) scores.remove(i);
                }
                System.out.println("Passed (new list): " + passed);
                System.out.println("Original after remove: " + scores);
                System.out.println("Removed: " + (before - scores.size()));
            }
        }` },
    { level: 2, title: "นับคำซ้ำในประโยค", html: `<p>รับประโยคภาษาอังกฤษ แยกคำ (ตัวพิมพ์เล็กทั้งหมด ไม่รวมเครื่องหมายวรรคตอน) แล้วสร้าง ArrayList ของ<strong>คำที่ไม่ซ้ำ</strong>ตามลำดับที่พบ และ ArrayList&lt;Integer&gt; คู่ขนานเก็บจำนวนครั้งที่พบแต่ละคำ แสดงผลเรียงตามลำดับที่พบ</p>`,
      spec: ["ใช้ indexOf หาว่าคำนี้เคยพบหรือยัง", "ถ้าพบแล้วใช้ set เพิ่มจำนวน ถ้ายังให้ add ทั้งสองรายการ", "แสดงคำที่พบบ่อยที่สุด"], stdin: "The cat and the dog and THE bird.",
      solution: j`
        import java.util.ArrayList;
        import java.util.Scanner;

        public class WordCount {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                System.out.print("Sentence: ");
                String[] tokens = in.nextLine().toLowerCase().replaceAll("[^a-z ]", "").trim().split("\\s+");
                ArrayList<String> words = new ArrayList<>();
                ArrayList<Integer> counts = new ArrayList<>();
                for (String t : tokens) {
                    int idx = words.indexOf(t);
                    if (idx >= 0) {
                        counts.set(idx, counts.get(idx) + 1);
                    } else {
                        words.add(t);
                        counts.add(1);
                    }
                }
                int best = 0;
                for (int i = 0; i < words.size(); i++) {
                    System.out.println(words.get(i) + ": " + counts.get(i));
                    if (counts.get(i) > counts.get(best)) best = i;
                }
                System.out.println("Most frequent: " + words.get(best));
            }
        }`, explain: "เมื่อเรียน HashMap ในวิชาถัดไป งานแบบนี้จะเขียนได้สั้นกว่า แต่หลักการเหมือนกัน" },
    { level: 2, title: "คิวร้านอาหาร", html: `<p>จำลองคิวร้านอาหารด้วย ArrayList&lt;String&gt; รับคำสั่งทีละบรรทัด: <code>join ชื่อ</code> (ต่อท้ายคิว), <code>vip ชื่อ</code> (แทรกหน้าสุด), <code>serve</code> (เรียกคนแรกออกจากคิว), <code>leave ชื่อ</code> (ออกจากคิว), <code>show</code> (แสดงคิว), <code>end</code> (จบ) จัดการกรณีคิวว่างและชื่อที่ไม่อยู่ในคิว</p>`,
      spec: ["แยกคำสั่งกับชื่อด้วย split(\" \", 2)", "serve ใช้ remove(0)", "leave ใช้ remove(Object) ซึ่งคืน boolean"], stdin: "join Mali\njoin Beam\nvip Nida\nshow\nserve\nleave Tan\nleave Mali\nshow\nserve\nserve\nend",
      solution: j`
        import java.util.ArrayList;
        import java.util.Scanner;

        public class RestaurantQueue {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                ArrayList<String> queue = new ArrayList<>();
                while (true) {
                    System.out.print("> ");
                    String[] parts = in.nextLine().trim().split(" ", 2);
                    String cmd = parts[0];
                    if (cmd.equals("end")) break;
                    switch (cmd) {
                        case "join" -> queue.add(parts[1]);
                        case "vip" -> queue.add(0, parts[1]);
                        case "serve" -> System.out.println(queue.isEmpty() ? "  queue is empty" : "  serving " + queue.remove(0));
                        case "leave" -> {
                            if (!queue.remove(parts[1])) System.out.println("  " + parts[1] + " is not in queue");
                        }
                        case "show" -> System.out.println("  " + queue);
                        default -> System.out.println("  unknown command");
                    }
                }
                System.out.println("Remaining: " + queue.size());
            }
        }` },
    { level: 3, title: "สมุดรายชื่อติดต่อ (Contact Book)", html: `<p>สร้างคลาส <code>Contact</code> (ชื่อ, เบอร์โทร, อีเมล) และคลาส <code>ContactBook</code> ที่<strong>มี</strong> <code>ArrayList&lt;Contact&gt;</code> พร้อมเมธอด: <code>add(Contact)</code> (ปฏิเสธชื่อซ้ำ ไม่สนตัวพิมพ์), <code>findByName(String)</code>, <code>search(String keyword)</code> (คืนรายการที่ชื่อหรืออีเมลมีคำค้น), <code>remove(String name)</code> และ <code>listSorted()</code> (เรียงตามชื่อ) แล้วสาธิตทุกเมธอดใน main</p>`,
      spec: ["field ใน Contact เป็น private + getter + toString", "search คืน <code>ArrayList&lt;Contact&gt;</code> ใหม่", "เรียงด้วย <code>Comparator.comparing(Contact::getName, String.CASE_INSENSITIVE_ORDER)</code>"],
      solution: j`
        import java.util.ArrayList;
        import java.util.Comparator;

        public class ContactApp {
            public static void main(String[] args) {
                ContactBook book = new ContactBook();
                System.out.println(book.add(new Contact("Nida", "081-111-2222", "nida@mail.com")));
                System.out.println(book.add(new Contact("beam", "089-333-4444", "beam@work.co.th")));
                System.out.println(book.add(new Contact("Mali", "086-555-6666", "mali@mail.com")));
                System.out.println(book.add(new Contact("NIDA", "080-000-0000", "x@x.com")));
                System.out.println("Find Mali: " + book.findByName("mali"));
                System.out.println("Search 'mail': " + book.search("mail"));
                System.out.println("Remove Beam: " + book.remove("Beam"));
                System.out.println("Sorted: " + book.listSorted());
            }
        }

        class Contact {
            private final String name, phone, email;
            Contact(String name, String phone, String email) { this.name = name; this.phone = phone; this.email = email; }
            String getName() { return name; }
            String getEmail() { return email; }
            @Override public String toString() { return name + " (" + phone + ")"; }
        }

        class ContactBook {
            private final ArrayList<Contact> contacts = new ArrayList<>();

            String add(Contact c) {
                if (findByName(c.getName()) != null) return "Duplicate: " + c.getName();
                contacts.add(c);
                return "Added: " + c.getName();
            }

            Contact findByName(String name) {
                for (Contact c : contacts) {
                    if (c.getName().equalsIgnoreCase(name)) return c;
                }
                return null;
            }

            ArrayList<Contact> search(String keyword) {
                ArrayList<Contact> result = new ArrayList<>();
                String k = keyword.toLowerCase();
                for (Contact c : contacts) {
                    if (c.getName().toLowerCase().contains(k) || c.getEmail().toLowerCase().contains(k)) result.add(c);
                }
                return result;
            }

            boolean remove(String name) {
                Contact c = findByName(name);
                return c != null && contacts.remove(c);
            }

            ArrayList<Contact> listSorted() {
                ArrayList<Contact> copy = new ArrayList<>(contacts);
                copy.sort(Comparator.comparing(Contact::getName, String.CASE_INSENSITIVE_ORDER));
                return copy;
            }
        }`, explain: "listSorted เรียงสำเนา เพื่อไม่เปลี่ยนลำดับการเพิ่มในรายการจริง" },
    { level: 3, title: "ตะกร้าสินค้าพร้อมคูปอง", html: `<p>สร้างคลาส <code>CartItem</code> (ชื่อ, ราคา, จำนวน) และ <code>ShoppingCart</code> ที่มี ArrayList&lt;CartItem&gt; เมธอด: <code>add(name, price, qty)</code> (ถ้ามีสินค้าชื่อเดิมให้เพิ่มจำนวนแทนการเพิ่มบรรทัดใหม่), <code>removeItem(name)</code>, <code>changeQty(name, qty)</code> (qty = 0 คือลบ), <code>subtotal()</code>, <code>applyCoupon(String code)</code> รองรับ <code>SAVE10</code> (ลด 10%), <code>MINUS100</code> (ลด 100 บาทเมื่อซื้อครบ 1000) และ <code>printReceipt()</code></p>`,
      spec: ["รหัสคูปองไม่ถูกต้องให้แจ้งเตือนและไม่ลด", "ส่วนลดต้องไม่ทำให้ยอดติดลบ", "ใบเสร็จแสดงทุกบรรทัด ยอดก่อนลด ส่วนลด ยอดสุทธิ"],
      solution: j`
        import java.util.ArrayList;

        public class CartWithCoupon {
            public static void main(String[] args) {
                ShoppingCart cart = new ShoppingCart();
                cart.add("Mouse", 390, 1);
                cart.add("Cable", 120, 2);
                cart.add("Mouse", 390, 1);
                cart.add("Pad", 250, 1);
                cart.changeQty("Cable", 3);
                cart.removeItem("Pad");
                cart.applyCoupon("FREE50");
                cart.applyCoupon("MINUS100");
                cart.printReceipt();
            }
        }

        class CartItem {
            final String name;
            final double price;
            int qty;
            CartItem(String name, double price, int qty) { this.name = name; this.price = price; this.qty = qty; }
            double total() { return price * qty; }
        }

        class ShoppingCart {
            private final ArrayList<CartItem> items = new ArrayList<>();
            private double discount = 0;

            private CartItem find(String name) {
                for (CartItem it : items) if (it.name.equalsIgnoreCase(name)) return it;
                return null;
            }

            void add(String name, double price, int qty) {
                CartItem it = find(name);
                if (it != null) it.qty += qty;
                else items.add(new CartItem(name, price, qty));
            }

            void removeItem(String name) {
                CartItem it = find(name);
                if (it != null) items.remove(it);
            }

            void changeQty(String name, int qty) {
                CartItem it = find(name);
                if (it == null) return;
                if (qty <= 0) items.remove(it);
                else it.qty = qty;
            }

            double subtotal() {
                double sum = 0;
                for (CartItem it : items) sum += it.total();
                return sum;
            }

            void applyCoupon(String code) {
                double sub = subtotal();
                switch (code) {
                    case "SAVE10" -> discount = sub * 0.10;
                    case "MINUS100" -> {
                        if (sub >= 1000) discount = 100;
                        else System.out.println("MINUS100 needs at least 1000");
                    }
                    default -> System.out.println("Invalid coupon: " + code);
                }
                discount = Math.min(discount, sub);
            }

            void printReceipt() {
                for (CartItem it : items) {
                    System.out.printf("%-8s %3d x %7.2f = %8.2f%n", it.name, it.qty, it.price, it.total());
                }
                System.out.printf("%-26s %8.2f%n", "Subtotal", subtotal());
                System.out.printf("%-26s %8.2f%n", "Discount", -discount);
                System.out.printf("%-26s %8.2f%n", "Net", subtotal() - discount);
            }
        }` },
    { level: 3, title: "ระบบลงทะเบียนรายวิชา", html: `<p>สร้างคลาส <code>Course</code> (รหัสวิชา, ชื่อ, หน่วยกิต, จำนวนที่นั่ง, <code>ArrayList&lt;String&gt;</code> รหัสนักศึกษาที่ลงทะเบียน และ <code>ArrayList&lt;String&gt;</code> waitlist) เมธอด <code>enroll(studentId)</code>: ถ้าที่นั่งว่างให้ลงทะเบียน ถ้าเต็มให้เข้า waitlist (ห้ามซ้ำทั้งสองรายการ), <code>drop(studentId)</code>: ถอนแล้วเลื่อนคนแรกใน waitlist เข้ามาแทนอัตโนมัติ, <code>status()</code> แสดงรายชื่อทั้งสองรายการ แล้วจำลองเหตุการณ์ตามตัวอย่าง</p>`,
      spec: ["enroll/drop คืน String อธิบายผล", "drop ของคนที่อยู่ใน waitlist ให้ลบจาก waitlist ได้ด้วย", "ใช้ contains, add, remove(Object), remove(0)"],
      solution: j`
        import java.util.ArrayList;

        public class Registration {
            public static void main(String[] args) {
                Course c = new Course("CS201", "OOP", 3, 3);
                String[] ids = {"6601", "6602", "6603", "6604", "6605", "6602"};
                for (String id : ids) System.out.println(c.enroll(id));
                System.out.println(c.status());
                System.out.println(c.drop("6601"));
                System.out.println(c.drop("6605"));
                System.out.println(c.drop("9999"));
                System.out.println(c.status());
            }
        }

        class Course {
            private final String code, name;
            private final int credits, seats;
            private final ArrayList<String> enrolled = new ArrayList<>();
            private final ArrayList<String> waitlist = new ArrayList<>();

            Course(String code, String name, int credits, int seats) {
                this.code = code; this.name = name; this.credits = credits; this.seats = seats;
            }

            String enroll(String id) {
                if (enrolled.contains(id) || waitlist.contains(id)) return id + ": already registered";
                if (enrolled.size() < seats) {
                    enrolled.add(id);
                    return id + ": enrolled (" + enrolled.size() + "/" + seats + ")";
                }
                waitlist.add(id);
                return id + ": course full, waitlist #" + waitlist.size();
            }

            String drop(String id) {
                if (waitlist.remove(id)) return id + ": removed from waitlist";
                if (!enrolled.remove(id)) return id + ": not found";
                String msg = id + ": dropped";
                if (!waitlist.isEmpty()) {
                    String next = waitlist.remove(0);
                    enrolled.add(next);
                    msg += ", " + next + " moved from waitlist";
                }
                return msg;
            }

            String status() {
                return code + " " + name + " (" + credits + " cr) enrolled=" + enrolled + " waitlist=" + waitlist;
            }
        }` },
  ],
};
