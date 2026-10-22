import { j, c, pre, jpre } from "../lib.mjs";

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
        { type: "p", html: `<code>ArrayList</code> คือรายการที่<strong>ยืดและหดได้เอง</strong> เพิ่มสมาชิกเมื่อไรก็ยาวขึ้น ลบเมื่อไรก็สั้นลง ไม่ต้องกำหนดขนาดล่วงหน้าเหมือนอาเรย์` },
        { type: "table", head: ["", "Array", "ArrayList"], rows: [
          ["ขนาด", "คงที่ตอนสร้าง", "เปลี่ยนได้ตลอด"],
          ["ประกาศ", "<code>int[] a = new int[5];</code>", "<code>ArrayList&lt;Integer&gt; list = new ArrayList&lt;&gt;();</code>"],
          ["จำนวนสมาชิก", "<code>a.length</code>", "<code>list.size()</code>"],
          ["อ่าน / เขียน", "<code>a[i]</code> / <code>a[i] = x</code>", "<code>list.get(i)</code> / <code>list.set(i, x)</code>"],
          ["เพิ่ม / ลบ", "ทำเองยาก", "<code>add</code>, <code>remove</code>"],
          ["ชนิดข้อมูล", "primitive หรือออบเจ็กต์", "ออบเจ็กต์เท่านั้น (ใช้ Integer แทน int)"],
          ["เหมาะกับ", "จำนวนแน่นอน ตาราง 2 มิติ", "รายการที่เพิ่ม/ลบระหว่างทำงาน"],
        ] },
        { type: "run", title: "ArrayList แรก",
          code: j`
            import java.util.ArrayList;                               // ต้อง import ก่อนใช้

            public class FirstList {
                public static void main(String[] args) {
                    ArrayList<String> fruits = new ArrayList<>();     // <String> = เก็บได้เฉพาะ String
                    System.out.println("Empty? " + fruits.isEmpty() + ", size = " + fruits.size());   // true, 0
                    fruits.add("Apple");                              // ต่อท้าย รายการยาวขึ้นเอง
                    fruits.add("Banana");
                    fruits.add("Cherry");
                    System.out.println(fruits);                       // [Apple, Banana, Cherry]
                    System.out.println("size = " + fruits.size());    // 3
                    System.out.println("first = " + fruits.get(0));   // get(i) แทน [i]
                    System.out.println("last = " + fruits.get(fruits.size() - 1));
                }
            }`,
          },
        { type: "tip", html: `println รายการได้ทันที ไม่ต้องใช้ <code>Arrays.toString</code> เหมือนอาเรย์` },

        { type: "h", text: "รับข้อมูลโดยไม่รู้จำนวนล่วงหน้า" },
        { type: "p", html: `อาเรย์ต้องถามจำนวนก่อน แต่ ArrayList เพิ่มไปเรื่อย ๆ จนผู้ใช้ป้อนค่าหยุด (sentinel) ได้เลย` },
        { type: "run", title: "อ่านคะแนนจนกว่าจะป้อน -1", stdin: "72\n85\n90\n64\n-1",
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
                        if (s == -1) break;                       // ค่าหยุด
                        scores.add(s);                            // เพิ่มทีละค่า
                    }
                    System.out.println("Scores: " + scores);
                    System.out.println("Count: " + scores.size());    // จำนวนจริงที่ป้อน
                }
            }`,
          },
        { type: "check", title: "เลือกโครงสร้าง", html: `<p>ควรใช้ Array หรือ ArrayList: (ก) อุณหภูมิ 7 วันในสัปดาห์ (ข) รายการสินค้าในตะกร้าที่ผู้ใช้เพิ่ม/ลบได้ (ค) กระดานหมากรุก 8×8</p>`, answer: `<p>(ก) Array — จำนวนแน่นอน (ข) ArrayList — เปลี่ยนจำนวนตลอด (ค) Array 2 มิติ</p>` },
      ],
    },
    {
      num: "13.2", toc: "Generic type", title: "Generic type และ wrapper class",
      blocks: [
        { type: "p", html: `<code>&lt;String&gt;</code> ใน <code>ArrayList&lt;String&gt;</code> เรียกว่า <strong>type parameter</strong> (generic) บอกว่ารายการนี้เก็บชนิดใด compiler จะกันไม่ให้ใส่ชนิดอื่น` },
        { type: "p", html: `generic ต้องเป็น<strong>คลาส</strong> ใช้ primitive อย่าง int ไม่ได้ จึงใช้ <strong>wrapper class</strong> แทน Java แปลงไปมาให้อัตโนมัติ (autoboxing / unboxing)` },
        { type: "table", head: ["primitive", "wrapper class", "ตัวอย่าง"], rows: [
          ["<code>int</code>", "<code>Integer</code>", "<code>ArrayList&lt;Integer&gt;</code>"],
          ["<code>double</code>", "<code>Double</code>", "<code>ArrayList&lt;Double&gt;</code>"],
          ["<code>char</code>", "<code>Character</code>", "<code>ArrayList&lt;Character&gt;</code>"],
          ["<code>boolean</code>", "<code>Boolean</code>", "<code>ArrayList&lt;Boolean&gt;</code>"],
        ] },
        { type: "run", title: "Integer และ Double ในรายการ",
          code: j`
            import java.util.ArrayList;

            public class WrapperDemo {
                public static void main(String[] args) {
                    ArrayList<Integer> nums = new ArrayList<>();
                    nums.add(5);                                  // int → Integer อัตโนมัติ
                    nums.add(12);
                    nums.add(8);
                    int sum = 0;
                    for (int n : nums) {                          // Integer → int อัตโนมัติ
                        sum += n;
                    }
                    System.out.println(nums + " sum = " + sum);   // [5, 12, 8] sum = 25

                    ArrayList<Double> prices = new ArrayList<>();
                    prices.add(19.5);
                    prices.add(7.25);
                    double first = prices.get(0);                 // Double → double
                    System.out.println("first price x 2 = " + first * 2);   // 39.0
                }
            }`,
          },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อใช้ primitive หรือใส่ผิดชนิด", blocks: [
          { type: "run", label: "ทดลอง error 13.2.2", title: "ใช้ primitive หรือใส่ผิดชนิด", expect: "compile-error",
            code: j`
              import java.util.ArrayList;

              public class GenericErrors {
                  public static void main(String[] args) {
                      ArrayList<int> numbers = new ArrayList<>();
                      ArrayList<String> names = new ArrayList<>();
                      names.add(42);
                  }
              }`,
            after: "ข้อดีของ generic: ใส่ผิดชนิดแล้วรู้ตั้งแต่ตอนคอมไพล์ ไม่ต้องรอไปพังตอนรัน" },
        ] },

        { type: "h", text: "เทียบ Integer ด้วย equals" },
        { type: "p", html: `Integer เป็นออบเจ็กต์ <code>==</code> จึงเทียบการอ้างอิง ไม่ใช่ค่า Java แคชค่าเล็ก (−128 ถึง 127) ไว้ใช้ร่วมกัน ค่าเล็กจึงบังเอิญถูก แต่ค่าใหญ่จะผิด` },
        { type: "run", label: "ทดลองบั๊ก 13.2.3", title: "เปรียบเทียบ Integer ด้วย ==",
          code: j`
            import java.util.ArrayList;

            public class IntegerEquality {
                public static void main(String[] args) {
                    ArrayList<Integer> list = new ArrayList<>();
                    list.add(100);
                    list.add(100);
                    list.add(1000);
                    list.add(1000);
                    System.out.println("100 == 100   ? " + (list.get(0) == list.get(1)));   // true  (บังเอิญ: อยู่ในแคช)
                    System.out.println("1000 == 1000 ? " + (list.get(2) == list.get(3)));   // false คนละออบเจ็กต์
                    System.out.println("equals       ? " + list.get(2).equals(list.get(3)));   // true เทียบค่า
                    int a = list.get(2), b = list.get(3);                                    // แปลงเป็น int ก่อน
                    System.out.println("int a == b   ? " + (a == b));                        // true
                }
            }`,
          },
        { type: "warn", html: `เทียบค่าของ Integer, Double หรือออบเจ็กต์ใด ๆ ใช้ <code>equals</code> หรือแปลงเป็น primitive ก่อนแล้วจึงใช้ <code>==</code>` },
        { type: "check", title: "wrapper", html: `<p>ประกาศรายการสำหรับเก็บ (ก) ตัวอักษรเกรด (ข) ราคาสินค้า (ค) สถานะเปิด/ปิด ได้อย่างไร</p>`, answer: `<p>(ก) <code>ArrayList&lt;Character&gt;</code> (ข) <code>ArrayList&lt;Double&gt;</code> (ค) <code>ArrayList&lt;Boolean&gt;</code></p>` },
      ],
    },
    {
      num: "13.3", toc: "เพิ่ม อ่าน แก้ข้อมูล", title: "เพิ่ม อ่าน แก้ และค้นหาข้อมูล",
      blocks: [
        { type: "p", html: `ArrayList มีเมธอดสำเร็จรูปสำหรับงานพื้นฐานทั้งหมด index เริ่มที่ 0 และใช้ได้ถึง <code>size() - 1</code> เหมือนอาเรย์` },
        { type: "table", head: ["เมธอด", "ทำอะไร"], rows: [
          ["<code>add(x)</code>", "ต่อท้าย"], ["<code>add(i, x)</code>", "แทรกที่ตำแหน่ง i (สมาชิกเดิมเลื่อนไปขวา)"],
          ["<code>get(i)</code>", "อ่านสมาชิกตำแหน่ง i"], ["<code>set(i, x)</code>", "แทนที่สมาชิกตำแหน่ง i (คืนค่าเดิม)"],
          ["<code>size()</code> / <code>isEmpty()</code>", "จำนวน / ว่างไหม"], ["<code>contains(x)</code>", "มี x ไหม (ใช้ equals)"],
          ["<code>indexOf(x)</code> / <code>lastIndexOf(x)</code>", "ตำแหน่งแรก/สุดท้ายของ x หรือ −1"], ["<code>clear()</code>", "ลบทั้งหมด"],
        ] },
        { type: "run", title: "แทรก (add) กับแทนที่ (set)",
          code: j`
            import java.util.ArrayList;

            public class AddSetGet {
                public static void main(String[] args) {
                    ArrayList<String> queue = new ArrayList<>();
                    queue.add("JHope");
                    queue.add("Suga");
                    queue.add("RM");
                    System.out.println("start   " + queue);
                    queue.add(1, "Jungkook");                         // แทรก: Suga, RM เลื่อนไปขวา
                    System.out.println("insert  " + queue);
                    String old = queue.set(0, "Mark");                // แทนที่ JHope และคืนค่าเดิม
                    System.out.println("set     " + queue + " (replaced " + old + ")");
                    System.out.println("get(2)  " + queue.get(2));    // Suga
                    System.out.println("size    " + queue.size());    // 4  set ไม่เพิ่มจำนวน
                }
            }`,
          },

        { type: "h", text: "ค้นหาในรายการ" },
        { type: "p", html: `<code>contains</code>, <code>indexOf</code> และ <code>lastIndexOf</code> ใช้ equals เปรียบเทียบ (ตัวพิมพ์ต้องตรง)` },
        { type: "run", title: "contains และ indexOf", stdin: "Banana\nMango",
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
                            stock.add(item);                          // ไม่มี → เพิ่มต่อท้าย
                        }
                    }
                    System.out.println(stock);
                }
            }`,
          },
        { type: "warn", title: "get เกินขอบเขต", html: `รายการที่มี 2 ตัว ใช้ index ได้แค่ 0 และ 1 <code>get(2)</code> จะเกิด <code>IndexOutOfBoundsException</code> รายการว่างแม้แต่ <code>get(0)</code> ก็ error` },
        { type: "more", title: "ดูตัวอย่าง: IndexOutOfBoundsException", blocks: [
          { type: "run", label: "ทดลอง error 13.3.3", title: "get เกินขอบเขต", expect: "runtime-error",
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
            },
        ] },
        { type: "practice", level: 1, title: "รายการซื้อของไม่ซ้ำ",
          html: `<p>รับชื่อของที่ต้องซื้อทีละคำจนกว่าจะพิมพ์ <code>done</code> ถ้าของนั้นมีในรายการแล้วให้แจ้งและไม่เพิ่มซ้ำ สุดท้ายแสดงรายการและจำนวนรายการ</p>`,
          spec: ["เก็บใน <code>ArrayList&lt;String&gt;</code> และอ่านด้วย <code>input.next()</code>", "ใช้ <code>contains</code> ตรวจก่อน add", "ไม่ต้องรู้จำนวนล่วงหน้า วนจนได้คำว่า done"],
          stdin: "milk\neggs\nmilk\nbread\neggs\ndone",
          hint: "คำใบ้: ใช้ while (true) อ่านคำ ถ้าเป็น done ให้ break ระวังเทียบ String ด้วย equals ไม่ใช่ ==",
          solution: j`
            import java.util.ArrayList;
            import java.util.Scanner;

            public class ShoppingList {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    ArrayList<String> list = new ArrayList<>();
                    while (true) {
                        System.out.print("Item (done to finish): ");
                        String item = input.next();
                        if (item.equals("done")) break;
                        if (list.contains(item)) {
                            System.out.println("  " + item + " is already in the list");
                        } else {
                            list.add(item);
                        }
                    }
                    System.out.println("Shopping list: " + list);
                    System.out.println("Items: " + list.size());
                }
            }`,
          explain: "contains ใช้ equals เปรียบเทียบ จึงหาของซ้ำได้ถูกต้อง แต่ตรงตัวพิมพ์ ถ้าอยากให้ Milk กับ milk นับเป็นของเดียวกัน ให้แปลงเป็นตัวพิมพ์เล็กด้วย toLowerCase() ก่อนตรวจและก่อนเพิ่ม" },
        { type: "check", title: "add vs set", html: jpre(`
          ArrayList<Integer> a = new ArrayList<>();
          a.add(1); a.add(2); a.add(3);
          a.add(0, 9);
          a.set(2, 7);`), answer: `<p>[1,2,3] → add(0,9) → [9,1,2,3] → set(2,7) → <strong>[9, 1, 7, 3]</strong></p>` },
      ],
    },
    {
      num: "13.4", toc: "ลบและ index ที่เลื่อน", title: "ลบสมาชิกและ index ที่เลื่อน",
      blocks: [
        { type: "p", html: `ลบได้สองแบบ: <code>remove(int index)</code> ลบตามตำแหน่ง และ <code>remove(Object o)</code> ลบตามค่า (ตัวแรกที่พบ) หลังลบ สมาชิกทางขวา<strong>เลื่อนมาทางซ้าย</strong>หนึ่งช่อง` },
        { type: "run", title: "remove ตามตำแหน่งและตามค่า",
          code: j`
            import java.util.ArrayList;

            public class RemoveDemo {
                public static void main(String[] args) {
                    ArrayList<String> names = new ArrayList<>();
                    names.add("JHope"); names.add("Suga"); names.add("RM"); names.add("Suga");
                    names.remove(0);                                  // ลบ index 0 → Suga เลื่อนมาที่ 0
                    System.out.println("remove(0)       " + names);
                    names.remove("Suga");                             // ลบ "Suga" ตัวแรกที่พบ
                    System.out.println("remove(\"Suga\")  " + names);

                    ArrayList<Integer> nums = new ArrayList<>();
                    nums.add(5); nums.add(2); nums.add(9); nums.add(2);
                    nums.remove(2);                                   // 2 เป็น int → ลบ index 2 (ค่า 9)
                    System.out.println("remove(2)       " + nums);
                    nums.remove(Integer.valueOf(2));                  // ห่อเป็น Integer → ลบค่า 2
                    System.out.println("remove(value 2) " + nums);
                }
            }`,
          },
        { type: "warn", title: "ArrayList<Integer> กับ remove", html: `<code>remove(2)</code> คือลบ <em>index</em> 2 เสมอ ถ้าต้องการลบ<em>ค่า</em> 2 ให้เขียน <code>remove(Integer.valueOf(2))</code>` },

        { type: "h", text: "ลบระหว่างวนลูป" },
        { type: "p", html: `โปรแกรมนี้ต้องการลบคะแนนที่ต่ำกว่า 50 ทั้งหมด ควรเหลือ [80, 90] ดูผลลัพธ์แล้วหาว่าทำไมผิด` },
        { type: "run", label: "ทดลองบั๊ก 13.4.2", title: "ลบในลูปแล้วข้ามสมาชิก",
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
          },
        { type: "practice", level: 2, title: "ลบชื่อที่ขึ้นต้นด้วยตัวอักษรที่กำหนด",
          html: `<p>เริ่มจากรายชื่อ JHope, Suga, RM, Jungkook, Mark, JayB รับตัวอักษรหนึ่งตัวจากผู้ใช้ แล้วลบทุกชื่อที่ขึ้นต้นด้วยตัวอักษรนั้น (ไม่สนตัวพิมพ์เล็ก/ใหญ่) แสดงจำนวนที่ลบและรายชื่อที่เหลือ</p>`,
          spec: ["ลบด้วยลูป for ที่<strong>วนจากท้ายมาหน้า</strong> (ห้ามใช้ removeIf ในข้อนี้)", "เทียบตัวอักษรแรกด้วย <code>Character.toUpperCase</code> ทั้งสองฝั่ง"],
          stdin: "j",
          hint: "คำใบ้: ตัวอักษรที่ผู้ใช้พิมพ์คือ input.next().charAt(0) และตัวแรกของชื่อคือ names.get(i).charAt(0)",
          solution: j`
            import java.util.ArrayList;
            import java.util.List;
            import java.util.Scanner;

            public class RemoveByLetter {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    ArrayList<String> names = new ArrayList<>(List.of("JHope", "Suga", "RM", "Jungkook", "Mark", "JayB"));
                    System.out.println("Names: " + names);
                    System.out.print("Remove names starting with: ");
                    char letter = Character.toUpperCase(input.next().charAt(0));

                    int removed = 0;
                    for (int i = names.size() - 1; i >= 0; i--) {             // วนถอยหลัง: index ที่ยังไม่ตรวจไม่เลื่อน
                        if (Character.toUpperCase(names.get(i).charAt(0)) == letter) {
                            names.remove(i);
                            removed++;
                        }
                    }
                    System.out.println("Removed " + removed + " name(s)");
                    System.out.println("Left: " + names);
                }
            }`,
          explain: "JHope, Jungkook และ JayB ขึ้นต้นด้วย J ถ้าวนจากหน้าไปหลัง เมื่อลบ JHope ที่ index 0 แล้ว Suga จะเลื่อนมาแทน และถ้ามีชื่อขึ้นต้นด้วย J สองชื่อติดกัน ชื่อที่สองจะถูกข้าม การวนถอยหลังไม่มีปัญหานี้" },
        { type: "check", title: "หาบั๊กได้ไหม", html: `<p>ทำไม 30 และ 10 ยังเหลืออยู่</p>`, answer: `<p>i = 0 ลบ 45 → 30 เลื่อนมาอยู่ index 0 แต่ลูปเพิ่ม i เป็น 1 ไปแล้ว 30 จึงไม่ถูกตรวจ เช่นเดียวกับ 10 ที่เลื่อนมาแทน 20 ตัวที่เลื่อนมาแทนที่ถูกข้ามทุกครั้ง</p>` },
        { type: "p", html: `มีสามวิธีที่ถูกต้อง: (1) วนจากท้ายมาหน้า การเลื่อนจะเกิดกับตัวที่ตรวจไปแล้วเท่านั้น (2) เพิ่ม i เฉพาะเมื่อไม่ได้ลบ (3) ใช้ <code>removeIf</code>` },
        { type: "run", title: "สามวิธีลบอย่างถูกต้อง",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class RemoveCorrectly {
                public static void main(String[] args) {
                    List<Integer> data = List.of(45, 30, 80, 20, 10, 90);

                    ArrayList<Integer> a = new ArrayList<>(data);     // คัดลอกรายการตั้งต้น
                    for (int i = a.size() - 1; i >= 0; i--) {         // (1) วนจากท้าย
                        if (a.get(i) < 50) a.remove(i);
                    }
                    System.out.println("backward : " + a);

                    ArrayList<Integer> b = new ArrayList<>(data);
                    int i = 0;
                    while (i < b.size()) {
                        if (b.get(i) < 50) b.remove(i);               // (2) ลบแล้วไม่เพิ่ม i
                        else i++;                                     //     เพราะตัวถัดไปเลื่อนมาแทน
                    }
                    System.out.println("while    : " + b);

                    ArrayList<Integer> c = new ArrayList<>(data);
                    c.removeIf(score -> score < 50);                  // (3) ลบทุก score ที่ score < 50
                    System.out.println("removeIf : " + c);
                }
            }`,
          },
        { type: "more", title: "ดูตัวอย่าง: ลบระหว่าง for-each", blocks: [
          { type: "p", html: `แก้รายการ (add/remove) ระหว่าง for-each จะเกิด <code>ConcurrentModificationException</code> เพราะ for-each ตรวจว่ารายการถูกแก้ระหว่างวนหรือไม่ ใช้วิธีใดวิธีหนึ่งด้านบนแทน` },
          { type: "run", label: "ทดลอง error 13.4.4", title: "ลบระหว่าง for-each", expect: "runtime-error",
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
            },
        ] },
        { type: "check", title: "index เลื่อน", html: jpre(`
          ArrayList<String> s = new ArrayList<>(List.of("A", "B", "C", "D", "E"));
          s.remove(1);
          s.remove(2);`), answer: `<p>remove(1) ลบ B → [A, C, D, E] แล้ว remove(2) ลบ D (ไม่ใช่ C!) → <strong>[A, C, E]</strong></p>` },
      ],
    },
    {
      num: "13.5", toc: "วนอ่านรายการ", title: "วนอ่าน ประมวลผล และเรียงรายการ",
      blocks: [
        { type: "p", html: `วนอ่านรายการได้ 3 แบบ เลือกตามงาน` },
        { type: "table", head: ["แบบ", "เมื่อไร"], rows: [
          ["<code>for (int i = 0; i &lt; list.size(); i++)</code>", "ต้องใช้ index เช่น แสดงลำดับที่ หรือ set ค่า"],
          ["<code>for (String t : list)</code>", "อ่านทีละตัวอย่างเดียว"],
          ["<code>list.forEach(t -&gt; ...)</code>", "สั้นที่สุด (lambda อธิบายละเอียดในบทที่ 16)"],
        ] },
        { type: "run", title: "วนสามแบบ",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class IterateList {
                public static void main(String[] args) {
                    ArrayList<String> tasks = new ArrayList<>(List.of("Read", "Code", "Test"));   // สร้างพร้อมค่าเริ่มต้น
                    for (int i = 0; i < tasks.size(); i++) {
                        System.out.println((i + 1) + ". " + tasks.get(i));    // ลำดับที่ = index + 1
                    }
                    for (String t : tasks) {
                        System.out.print(t.toUpperCase() + " ");
                    }
                    System.out.println();
                    tasks.forEach(t -> System.out.println("- " + t));         // ทำกับทุกตัว
                }
            }`,
          },

        { type: "h", text: "สถิติและการกรอง" },
        { type: "p", html: `รูปแบบเดียวกับอาเรย์ในบทที่ 8 แต่ใช้ <code>size()</code> และ <code>get()</code> ข้อดีคือสร้างรายการใหม่เก็บผลกรองได้ทันทีโดยไม่ต้องรู้ขนาด` },
        { type: "run", title: "ค่าเฉลี่ย สูงสุด และวันที่ร้อน",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class ListStats {
                public static void main(String[] args) {
                    ArrayList<Double> temps = new ArrayList<>(List.of(31.5, 29.0, 33.2, 35.1, 30.4, 34.0));
                    double sum = 0, max = temps.get(0);
                    ArrayList<Double> hotDays = new ArrayList<>();            // รายการผลกรอง
                    for (double t : temps) {
                        sum += t;
                        if (t > max) max = t;
                        if (t >= 33) hotDays.add(t);                          // เก็บเฉพาะที่ผ่านเงื่อนไข
                    }
                    System.out.printf("Average %.2f, Max %.1f%n", sum / temps.size(), max);
                    System.out.println("Hot days (>= 33): " + hotDays + " -> " + hotDays.size() + " days");
                }
            }`,
          },

        { type: "h", text: "Collections: เครื่องมือสำเร็จรูป" },
        { type: "table", head: ["เมธอด", "ทำอะไร"], rows: [
          ["<code>Collections.max(list)</code> / <code>min</code>", "ค่ามากสุด / น้อยสุด"],
          ["<code>Collections.frequency(list, x)</code>", "นับจำนวนครั้งที่พบ x"],
          ["<code>Collections.sort(list)</code>", "เรียงน้อยไปมาก (แก้รายการเดิม)"],
          ["<code>Collections.reverse(list)</code>", "กลับลำดับ"],
        ] },
        { type: "run", title: "sort, reverse, max, min, frequency",
          code: j`
            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;

            public class CollectionsTools {
                public static void main(String[] args) {
                    ArrayList<Integer> nums = new ArrayList<>(List.of(42, 7, 19, 7, 3, 25, 7));
                    System.out.println("max " + Collections.max(nums) + ", min " + Collections.min(nums));   // 42, 3
                    System.out.println("frequency of 7: " + Collections.frequency(nums, 7));               // 3
                    Collections.sort(nums);
                    System.out.println("sorted   " + nums);
                    Collections.reverse(nums);
                    System.out.println("reversed " + nums);

                    ArrayList<String> names = new ArrayList<>(List.of("jungkook", "Suga", "jhope", "RM"));
                    Collections.sort(names);                                  // ตัวใหญ่มาก่อนตัวเล็ก
                    System.out.println("sorted names           " + names);
                    names.sort(String.CASE_INSENSITIVE_ORDER);                // ไม่สนตัวพิมพ์
                    System.out.println("case-insensitive order " + names);
                }
            }`,
          },
        { type: "check", title: "กรอง", html: `<p>มี <code>ArrayList&lt;String&gt; words</code> จะสร้างรายการใหม่ที่มีเฉพาะคำยาวกว่า 4 ตัวอักษรได้อย่างไร</p>`, answer: jpre(`
          ArrayList<String> longWords = new ArrayList<>();
          for (String w : words) {
              if (w.length() > 4) longWords.add(w);
          }`) },
      ],
    },
    {
      num: "13.6", toc: "เก็บ object ในรายการ", title: "เก็บ object ในรายการ",
      blocks: [
        { type: "p", html: `ArrayList ของออบเจ็กต์ เช่น <code>ArrayList&lt;Student&gt;</code> คือรูปแบบหลักของโปรแกรมจัดการข้อมูล: เพิ่ม ค้นหา แก้ไข ลบ และรายงาน และเป็นพื้นฐานของข้อมูลในโปรแกรม GUI บทที่ 14–19` },
        { type: "run", title: "รายชื่อนักศึกษา: เพิ่ม ค้นหา แก้ไข",
          code: j`
            import java.util.ArrayList;

            public class StudentList {
                public static void main(String[] args) {
                    ArrayList<Student> list = new ArrayList<>();
                    list.add(new Student("6601", "JHope", 78));       // สร้างแล้วเพิ่มในบรรทัดเดียว
                    list.add(new Student("6602", "Suga", 55));
                    list.add(new Student("6603", "RM", 91));

                    Student s = findById(list, "6602");
                    if (s != null) s.setScore(65);                    // s ชี้ตัวเดียวกับในรายการ → แก้จริง

                    System.out.println(findById(list, "9999"));       // null  ไม่พบ
                    for (Student st : list) System.out.println(st);
                }

                static Student findById(ArrayList<Student> list, String id) {
                    for (Student s : list) {
                        if (s.getId().equals(id)) return s;           // เจอแล้วคืนทันที
                    }
                    return null;                                      // วนครบแล้วไม่พบ
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
          },
        { type: "warn", html: `เมธอดค้นหาที่คืน <code>null</code> เมื่อไม่พบ ผู้เรียกต้องตรวจ <code>if (s != null)</code> ก่อนใช้ทุกครั้ง ไม่เช่นนั้นจะเกิด NullPointerException` },

        { type: "h", text: "เรียงออบเจ็กต์ด้วย Comparator" },
        { type: "p", html: `ออบเจ็กต์ไม่รู้ว่าควรเรียงตามอะไร ต้องบอกด้วย <code>Comparator.comparing(Product::getPrice)</code> แปลว่า “ใช้ getPrice ของแต่ละตัวเป็นเกณฑ์” และต่อ <code>.reversed()</code> เพื่อเรียงมากไปน้อย` },
        { type: "run", title: "เรียงสินค้าตามราคา จำนวน และชื่อ",
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

                    items.sort(Comparator.comparing(Product::getPrice));              // ราคาน้อย → มาก
                    System.out.println("By price:       " + items);
                    items.sort(Comparator.comparing(Product::getStock).reversed());   // จำนวนมาก → น้อย
                    System.out.println("By stock desc:  " + items);
                    items.sort(Comparator.comparing(Product::getName));               // ตามตัวอักษร
                    System.out.println("By name:        " + items);

                    double value = 0;
                    for (Product p : items) value += p.getPrice() * p.getStock();     // ราคา × จำนวน
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
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เมนูจัดการรายการสิ่งที่ต้องทำ (To-do)", blocks: [
          { type: "p", html: `รวมทุกอย่าง: ArrayList + เมนู do-while + ลบด้วยหมายเลขที่ผู้ใช้เลือก ผู้ใช้นับจาก 1 แต่ index เริ่มที่ 0 จึงต้องลบ 1` },
          { type: "run", title: "To-do app", stdin: "1\nRead chapter 13\n1\nWrite code\n1\nTest program\n3\n2\n2\n3\n0",
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
                          in.nextLine();                                    // ทิ้ง Enter ที่ค้างจาก nextInt()
                          switch (choice) {
                              case 1 -> {
                                  System.out.print("  Task: ");
                                  todos.add(in.nextLine());                 // ชื่องานทั้งบรรทัด
                              }
                              case 2 -> {
                                  System.out.print("  Task number: ");
                                  int n = in.nextInt();
                                  if (n >= 1 && n <= todos.size()) {
                                      System.out.println("  Completed: " + todos.remove(n - 1));   // remove คืนค่าที่ลบ
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
            },
        ] },
        { type: "practice", level: 3, title: "สต็อกสินค้าและการเติมของ",
          html: `<p>สร้างคลาส <code>Item</code> (ชื่อ ราคา จำนวน) แล้วเก็บสินค้า 4 รายการใน ArrayList: Pen 12.00 × 40, Notebook 35.00 × 0, Eraser 8.00 × 25, Ruler 15.00 × 0 แสดงรายการ มูลค่าสต็อกรวม และรายชื่อสินค้าที่หมด จากนั้นรับชื่อสินค้าและจำนวนที่จะเติม เติมของแล้วแสดงมูลค่ารวมใหม่</p>`,
          spec: ["คลาส Item มี field เป็น private พร้อม getter และเมธอด <code>void addStock(int qty)</code>", "เมธอด <code>static double stockValue(ArrayList&lt;Item&gt; items)</code> คืนผลรวมของราคา × จำนวน", "เมธอด <code>static Item findByName(ArrayList&lt;Item&gt; items, String name)</code> คืน null ถ้าไม่พบ และ main ต้องตรวจ null ก่อนเติมของ"],
          stdin: "Ruler 10",
          hint: "คำใบ้: สินค้าที่หมดคือ getQty() == 0 และการเติมของทำผ่านออบเจ็กต์ที่ findByName คืนมา ซึ่งเป็นตัวเดียวกับที่อยู่ในรายการ",
          solution: j`
            import java.util.ArrayList;
            import java.util.Scanner;

            public class StockRoom {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    ArrayList<Item> items = new ArrayList<>();
                    items.add(new Item("Pen", 12.00, 40));
                    items.add(new Item("Notebook", 35.00, 0));
                    items.add(new Item("Eraser", 8.00, 25));
                    items.add(new Item("Ruler", 15.00, 0));

                    for (Item it : items) System.out.println(it);
                    System.out.printf("Stock value: %.2f%n", stockValue(items));
                    System.out.print("Out of stock:");
                    for (Item it : items) {
                        if (it.getQty() == 0) System.out.print(" " + it.getName());
                    }
                    System.out.println();

                    System.out.print("Restock item and quantity: ");
                    String name = input.next();
                    int qty = input.nextInt();
                    Item found = findByName(items, name);
                    if (found == null) {
                        System.out.println("No item named " + name);
                    } else {
                        found.addStock(qty);                  // แก้ออบเจ็กต์ตัวจริงในรายการ
                        System.out.println("Updated: " + found);
                        System.out.printf("Stock value: %.2f%n", stockValue(items));
                    }
                }

                static double stockValue(ArrayList<Item> items) {
                    double total = 0;
                    for (Item it : items) total += it.getPrice() * it.getQty();
                    return total;
                }

                static Item findByName(ArrayList<Item> items, String name) {
                    for (Item it : items) {
                        if (it.getName().equals(name)) return it;
                    }
                    return null;
                }
            }

            class Item {
                private final String name;
                private final double price;
                private int qty;

                Item(String name, double price, int qty) {
                    this.name = name;
                    this.price = price;
                    this.qty = qty;
                }

                String getName() { return name; }
                double getPrice() { return price; }
                int getQty() { return qty; }
                void addStock(int qty) { this.qty += qty; }

                @Override
                public String toString() {
                    return String.format("%-9s %6.2f x %d", name, price, qty);
                }
            }`,
          explain: "มูลค่าเริ่มต้นคือ 12 × 40 + 8 × 25 = 680 เติม Ruler 10 อันเพิ่ม 150 เป็น 830 สังเกตว่า findByName คืนการอ้างอิงไปยังออบเจ็กต์ในรายการ การเรียก addStock จึงเปลี่ยนข้อมูลในรายการจริงโดยไม่ต้อง set กลับ" },
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
                friends.add("JHope");
                friends.add("Suga");
                friends.add("RM");
                friends.add("Jungkook");
                // แสดงรายการพร้อมจำนวน
                System.out.println(friends + " (" + friends.size() + ")");
                // แทรกหน้าสุด
                friends.add(0, "Mark");
                // แทนตัวสุดท้าย
                friends.set(friends.size() - 1, "JayB");
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
                while (n != 0) {  // รับจนกว่าจะป้อน 0
                    nums.add(n);
                    n = in.nextInt();
                }
                if (nums.isEmpty()) {  // ป้องกันการหารด้วย 0
                    System.out.println("No numbers");
                    return;  // จบ main ทันที
                }
                int sum = 0;
                for (int x : nums) sum += x;
                System.out.println("List: " + nums);
                System.out.printf("Sum: %d, Average: %.2f%n", sum, (double) sum / nums.size());
                // Collections.max/min ใช้กับ ArrayList ได้
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
                list.remove(Integer.valueOf(20));  // ลบค่า 20 ตัวแรก
                System.out.println("remove value 20 " + list);
                list.remove(2);  // ลบตาม index
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
                // อ่าน n ค่าใส่รายการ
                for (int i = 0; i < n; i++) scores.add(in.nextInt());

                ArrayList<Integer> passed = new ArrayList<>();
                // วิธีที่ 1: สร้างรายการใหม่เฉพาะที่ผ่าน
                for (int s : scores) if (s >= 50) passed.add(s);

                int before = scores.size();
                // วิธีที่ 2: ลบจากรายการเดิม วนจากท้าย
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
                // ตัวเล็ก ลบเครื่องหมาย แล้วแยกคำ
                String[] tokens = in.nextLine().toLowerCase().replaceAll("[^a-z ]", "").trim().split("\\s+");
                // รายการคู่ขนาน: คำ
                ArrayList<String> words = new ArrayList<>();
                // รายการคู่ขนาน: จำนวนครั้ง
                ArrayList<Integer> counts = new ArrayList<>();
                for (String t : tokens) {
                    int idx = words.indexOf(t);  // เคยพบคำนี้หรือยัง
                    if (idx >= 0) {
                        // เพิ่มจำนวนที่ตำแหน่งเดียวกัน
                        counts.set(idx, counts.get(idx) + 1);
                    } else {
                        words.add(t);  // คำใหม่ → เพิ่มทั้งสองรายการ
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
      spec: ["แยกคำสั่งกับชื่อด้วย split(\" \", 2)", "serve ใช้ remove(0)", "leave ใช้ remove(Object) ซึ่งคืน boolean"], stdin: "join JHope\njoin Suga\nvip RM\nshow\nserve\nleave Mark\nleave JHope\nshow\nserve\nserve\nend",
      solution: j`
        import java.util.ArrayList;
        import java.util.Scanner;

        public class RestaurantQueue {
            public static void main(String[] args) {
                Scanner in = new Scanner(System.in);
                ArrayList<String> queue = new ArrayList<>();
                while (true) {
                    System.out.print("> ");
                    // แยกคำสั่งกับชื่อ (สูงสุด 2 ส่วน)
                    String[] parts = in.nextLine().trim().split(" ", 2);
                    String cmd = parts[0];
                    if (cmd.equals("end")) break;
                    switch (cmd) {
                        // ต่อท้ายคิว
                        case "join" -> queue.add(parts[1]);
                        // แทรกหน้าสุด
                        case "vip" -> queue.add(0, parts[1]);
                        // remove(0) เรียกคิวแรกออก
                        case "serve" -> System.out.println(queue.isEmpty() ? "  queue is empty" : "  serving " + queue.remove(0));
                        case "leave" -> {
                            // remove(Object) คืน false ถ้าไม่พบ
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
                // add คืนข้อความผลลัพธ์
                System.out.println(book.add(new Contact("RM", "081-111-2222", "rm@mail.com")));
                System.out.println(book.add(new Contact("suga", "089-333-4444", "suga@work.co.th")));
                System.out.println(book.add(new Contact("JHope", "086-555-6666", "jhope@mail.com")));
                // ชื่อซ้ำ (ไม่สนตัวพิมพ์)
                System.out.println(book.add(new Contact("rm", "080-000-0000", "x@x.com")));
                System.out.println("Find JHope: " + book.findByName("jhope"));
                System.out.println("Search 'mail': " + book.search("mail"));
                System.out.println("Remove Suga: " + book.remove("Suga"));
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
            // เก็บรายชื่อไว้ภายใน ภายนอกเข้าถึงตรงไม่ได้
            private final ArrayList<Contact> contacts = new ArrayList<>();

            String add(Contact c) {
                // ตรวจชื่อซ้ำก่อนเพิ่ม
                if (findByName(c.getName()) != null) return "Duplicate: " + c.getName();
                contacts.add(c);
                return "Added: " + c.getName();
            }

            Contact findByName(String name) {
                for (Contact c : contacts) {
                    // ไม่สนตัวพิมพ์เล็ก/ใหญ่
                    if (c.getName().equalsIgnoreCase(name)) return c;
                }
                return null;
            }

            ArrayList<Contact> search(String keyword) {
                // รายการผลลัพธ์ใหม่
                ArrayList<Contact> result = new ArrayList<>();
                String k = keyword.toLowerCase();
                for (Contact c : contacts) {
                    // ค้นทั้งชื่อและอีเมล
                    if (c.getName().toLowerCase().contains(k) || c.getEmail().toLowerCase().contains(k)) result.add(c);
                }
                return result;
            }

            boolean remove(String name) {
                Contact c = findByName(name);
                // พบและลบสำเร็จจึงได้ true
                return c != null && contacts.remove(c);
            }

            ArrayList<Contact> listSorted() {
                // สำเนา เพื่อไม่เปลี่ยนลำดับเดิม
                ArrayList<Contact> copy = new ArrayList<>(contacts);
                // เรียงตามชื่อโดยไม่สนตัวพิมพ์
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
                cart.add("Mouse", 390, 1);  // สินค้าเดิม → เพิ่มจำนวน
                cart.add("Pad", 250, 1);
                cart.changeQty("Cable", 3);
                cart.removeItem("Pad");
                cart.applyCoupon("FREE50");  // ไม่มีรหัสนี้
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
            // รายการสินค้าในตะกร้า
            private final ArrayList<CartItem> items = new ArrayList<>();
            private double discount = 0;

            private CartItem find(String name) {
                // หาสินค้าตามชื่อ ไม่พบคืน null
                for (CartItem it : items) if (it.name.equalsIgnoreCase(name)) return it;
                return null;
            }

            void add(String name, double price, int qty) {
                CartItem it = find(name);
                // มีอยู่แล้ว → เพิ่มจำนวน
                if (it != null) it.qty += qty;
                // ยังไม่มี → เพิ่มรายการใหม่
                else items.add(new CartItem(name, price, qty));
            }

            void removeItem(String name) {
                CartItem it = find(name);
                if (it != null) items.remove(it);
            }

            void changeQty(String name, int qty) {
                CartItem it = find(name);
                if (it == null) return;
                // จำนวน 0 หรือติดลบ → ลบออก
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
                // ส่วนลดไม่เกินยอดซื้อ
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
                // ลงทะเบียนเกินจำนวนที่นั่ง และลงซ้ำ
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
            // รายชื่อที่ได้ที่นั่ง
            private final ArrayList<String> enrolled = new ArrayList<>();
            // รายชื่อสำรอง
            private final ArrayList<String> waitlist = new ArrayList<>();

            Course(String code, String name, int credits, int seats) {
                this.code = code; this.name = name; this.credits = credits; this.seats = seats;
            }

            String enroll(String id) {
                // ห้ามลงซ้ำ
                if (enrolled.contains(id) || waitlist.contains(id)) return id + ": already registered";
                // ยังมีที่นั่ง
                if (enrolled.size() < seats) {
                    enrolled.add(id);
                    return id + ": enrolled (" + enrolled.size() + "/" + seats + ")";
                }
                waitlist.add(id);  // เต็มแล้ว → ต่อคิวสำรอง
                return id + ": course full, waitlist #" + waitlist.size();
            }

            String drop(String id) {
                // อยู่ในคิวสำรอง → ลบออกได้เลย
                if (waitlist.remove(id)) return id + ": removed from waitlist";
                if (!enrolled.remove(id)) return id + ": not found";
                String msg = id + ": dropped";
                if (!waitlist.isEmpty()) {  // มีคนรอ → เลื่อนคนแรกขึ้นมา
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
