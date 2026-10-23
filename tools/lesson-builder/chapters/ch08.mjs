import { j, c, pre, jpre, fpre } from "../lib.mjs";

export default {
  num: 8, file: "chapter-08.html",
  pageTitle: "บทที่ 8: อาเรย์และชุดข้อมูล", shortName: "บทที่ 8",
  tocLabel: "บทที่ 8 · ข้อมูลหลายค่า", sidebarBottom: "index เริ่มที่ 0 และจบที่ length − 1",
  kicker: "บทที่ 8 · เก็บข้อมูลหลายค่าเป็นชุด", h1: "อาเรย์และชุดข้อมูล",
  lead: "เก็บข้อมูลชนิดเดียวกันหลายค่าในโครงสร้างเดียว แล้วใช้ index และลูปเข้าถึงสมาชิกทีละตัว",
  goals: ["ประกาศและกำหนดค่าอาเรย์", "ใช้ index และ length อย่างถูกต้อง", "วนอ่าน รวม และค้นหาค่าสมาชิก", "อ่านข้อมูลแบบแถวและคอลัมน์ และส่งอาเรย์ให้เมธอด"],
  prev: { href: "chapter-07.html", label: "← บทที่ 7" },
  next: { href: "chapter-09.html", label: "บทที่ 9: String →" },
  footer: "บทที่ 8 · วาดตาราง index ทุกครั้งที่สับสน",
  introHeading: "8. มองข้อมูลหลายค่าเป็นชุดเดียว",
  introHtml: `<p>ถ้าต้องเก็บคะแนนนักศึกษา 100 คน การสร้างตัวแปร 100 ตัว (<code>score1</code>, <code>score2</code>, …) ทำให้จัดการยากและวนลูปไม่ได้ <strong>อาเรย์ (array)</strong> ให้เราใช้ชื่อตัวแปรเดียวและเลข <strong>index</strong> เพื่อเลือกสมาชิกแต่ละตำแหน่ง</p>`,
  topics: [
    {
      num: "8.1", toc: "สร้างและเข้าถึงอาเรย์", title: "สร้างและเข้าถึงอาเรย์",
      blocks: [
        { type: "p", html: `อาเรย์คือกล่องที่แบ่งเป็นช่องเรียงกัน ทุกช่องเก็บข้อมูล<strong>ชนิดเดียวกัน</strong> แต่ละช่องมีเลขประจำตำแหน่งเรียกว่า <strong>index</strong> ซึ่ง<strong>เริ่มที่ 0</strong> และอาเรย์มีขนาดคงที่หลังสร้าง` },
        { type: "cells", name: "int[] scores = {80, 75, 92, 88};", caption: "→ 4 ช่อง index 0 ถึง 3", values: [80, 75, 92, 88] },
        { type: "run", title: "อ่านและแก้ค่าในแต่ละช่อง",
          code: j`
            public class ArrayBasics {
                public static void main(String[] args) {
                    int[] scores = {80, 75, 92, 88};       // สร้างพร้อมใส่ค่า 4 ช่อง

                    System.out.println(scores[0]);           // 80    ช่องแรกคือ index 0
                    System.out.println(scores[3]);           // 88    ช่องสุดท้ายคือ index 3
                    System.out.println(scores.length);       // 4     length ไม่มีวงเล็บ

                    scores[1] = 100;                         // เขียนทับช่อง index 1
                    scores[2] += 5;                          // 92 + 5
                    System.out.println(scores[1]);           // 100
                    System.out.println(scores[2]);           // 97
                    System.out.println(scores[scores.length - 1]);   // 88  ช่องสุดท้ายเสมอ
                }
            }`,
          },
        { type: "tip", html: `ช่องสุดท้ายอยู่ที่ <code>length - 1</code> เสมอ เขียน <code>scores[scores.length - 1]</code> แทนเลขตายตัว โค้ดจะยังถูกแม้อาเรย์เปลี่ยนขนาด` },

        { type: "h", text: "สร้างด้วย new แล้วใส่ค่าภายหลัง" },
        { type: "p", html: `ถ้ารู้จำนวนช่องแต่ยังไม่รู้ค่า ให้ใช้ <code>new ชนิด[ขนาด]</code> ช่องที่ยังไม่ได้ใส่ค่าจะมี<strong>ค่าเริ่มต้น</strong>ตามชนิดข้อมูล` },
        { type: "table", head: ["ชนิดสมาชิก", "ค่าเริ่มต้นเมื่อสร้างด้วย new"], rows: [
          ["<code>int</code>, <code>long</code>, <code>short</code>, <code>byte</code>", "<code>0</code>"],
          ["<code>double</code>, <code>float</code>", "<code>0.0</code>"],
          ["<code>boolean</code>", "<code>false</code>"],
          ["<code>char</code>", "<code>'\\u0000'</code> (อักขระว่าง)"],
          ["<code>String</code> และออบเจ็กต์อื่น", "<code>null</code>"],
        ] },
        { type: "run", title: "ช่องที่ไม่ได้ใส่ค่าได้ค่าเริ่มต้น",
          code: j`
            public class NewArray {
                public static void main(String[] args) {
                    double[] prices = new double[4];    // 4 ช่อง ทุกช่องเป็น 0.0
                    String[] names = new String[3];     // ทุกช่องเป็น null
                    boolean[] done = new boolean[2];    // ทุกช่องเป็น false

                    prices[0] = 19.5;
                    prices[2] = 7.25;
                    names[0] = "Pen";

                    System.out.println(prices[0] + " " + prices[1] + " " + prices[2] + " " + prices[3]);
                    System.out.println(names[0] + " " + names[1]);   // Pen null
                    System.out.println(done[0]);                      // false
                }
            }`,
          },

        { type: "h", text: "รับค่าจากผู้ใช้ใส่อาเรย์" },
        { type: "p", html: `ให้ผู้ใช้บอกขนาดก่อน แล้วใช้ลูปอ่านค่าลงทีละช่อง ตั้งแต่ index 0 ถึง <code>length - 1</code> รูปแบบนี้ใช้บ่อยที่สุด` },
        { type: "run", title: "อ่านอุณหภูมิ n วัน", stdin: "4\n29.5 31 30.2 28.8",
          code: j`
            import java.util.Scanner;

            public class ReadIntoArray {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("How many days? ");
                    int n = input.nextInt();
                    double[] temps = new double[n];                 // ขนาดมาจากผู้ใช้

                    System.out.print("Temperatures: ");
                    for (int i = 0; i < temps.length; i++) {
                        temps[i] = input.nextDouble();              // ใส่ทีละช่อง
                    }
                    for (int i = 0; i < temps.length; i++) {
                        System.out.println("Day " + (i + 1) + ": " + temps[i]);   // คนอ่านนับจาก 1
                    }
                }
            }`,
          },
        { type: "warn", title: "index เกินขอบเขต", html: `index ที่ใช้ได้คือ 0 ถึง <code>length - 1</code> เท่านั้น ถ้าเขียนเงื่อนไขลูปเป็น <code>i &lt;= scores.length</code> รอบสุดท้ายจะอ่านช่องที่ไม่มี โปรแกรมหยุดด้วย <code>ArrayIndexOutOfBoundsException</code> ใช้ <code>i &lt; scores.length</code> เสมอ` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อ index เกิน", blocks: [
          { type: "run", label: "ทดลอง error 8.1.4", title: "index เกินขอบเขต", expect: "runtime-error",
            code: j`
              public class OutOfBounds {
                  public static void main(String[] args) {
                      int[] scores = {80, 75, 92};
                      for (int i = 0; i <= scores.length; i++) {
                          System.out.println(scores[i]);
                      }
                  }
              }`,
            after: "พิมพ์ 80, 75, 92 ได้ปกติ แต่เงื่อนไข <code>&lt;=</code> ทำให้ i = 3 เข้าลูปด้วย ข้อความ <code>Index 3 out of bounds for length 3</code> บอกทั้ง index ที่ผิดและขนาดจริงของอาเรย์" },
        ] },
        { type: "practice", level: 1, title: "สลับตัวแรกกับตัวสุดท้าย",
          html: `<p>รับจำนวน n แล้วรับตัวเลข n ตัวใส่อาเรย์ แสดงอาเรย์ก่อนสลับ สลับค่าตัวแรกกับตัวสุดท้าย แล้วแสดงอีกครั้ง</p>`,
          spec: ["อ้างตัวสุดท้ายด้วย <code>arr.length - 1</code> ไม่ใช้เลขตายตัว", "สลับค่าโดยใช้ตัวแปรชั่วคราว (temp)", "แสดงอาเรย์ด้วยลูป รูปแบบ <code>Before: 3 8 1 9 4</code>"],
          runs: ["5\n3 8 1 9 4", "1\n7"],
          hint: "คำใบ้: temp = arr[0]; arr[0] = arr[last]; arr[last] = temp; — ถ้าเขียน arr[0] = arr[last] ก่อนโดยไม่มี temp ค่าเดิมของ arr[0] จะหายไป",
          solution: j`
            import java.util.Scanner;

            public class SwapEnds {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("n = ");
                    int n = input.nextInt();
                    int[] arr = new int[n];
                    System.out.print("Values: ");
                    for (int i = 0; i < arr.length; i++) {
                        arr[i] = input.nextInt();
                    }

                    System.out.print("Before:");
                    for (int i = 0; i < arr.length; i++) System.out.print(" " + arr[i]);
                    System.out.println();

                    int last = arr.length - 1;
                    int temp = arr[0];                        // เก็บค่าเดิมไว้ก่อน
                    arr[0] = arr[last];
                    arr[last] = temp;

                    System.out.print("After: ");
                    for (int i = 0; i < arr.length; i++) System.out.print(" " + arr[i]);
                    System.out.println();
                }
            }`,
          explain: "เมื่อมีสมาชิกตัวเดียว ตัวแรกกับตัวสุดท้ายคือช่องเดียวกัน (index 0) การสลับจึงไม่เปลี่ยนอะไรและไม่เกิด error เพราะใช้ arr.length - 1 แทนเลขตายตัว" },
        { type: "check", title: "trace อาเรย์", html: jpre(`
          int[] a = {5, 10, 15, 20};
          a[0] = a[3] - a[1];
          a[2] = a[a.length - 2] / 5;`) + `<p>อาเรย์ a มีค่าอะไรบ้าง</p>`, answer: `<p>a[0] = 20 − 10 = 10, a[2] = a[2] / 5 = 15 / 5 = 3 → <strong>{10, 10, 3, 20}</strong></p>` },
      ],
    },
    {
      num: "8.2", toc: "วนอ่าน รวม และค้นหา", title: "วนอ่าน รวม และค้นหาสมาชิก",
      blocks: [
        { type: "p", html: `อ่านอาเรย์ทุกช่องด้วยลูปได้ 2 แบบ เลือกตามว่าต้องใช้ index หรือไม่` },
        { type: "table", head: ["", "for ปกติ", "for-each"], rows: [
          ["รูปแบบ", "<code>for (int i = 0; i &lt; a.length; i++)</code>", "<code>for (int x : a)</code>"],
          ["รู้ index", "ได้", "ไม่ได้"],
          ["แก้ค่าในช่อง", "ได้ (<code>a[i] = ...</code>)", "ไม่ได้"],
          ["ใช้เมื่อ", "ต้องรู้ตำแหน่ง หรือต้องแก้ค่า", "อ่านอย่างเดียว"],
        ] },
        { type: "run", title: "วนอ่าน รวม และนับ",
          code: j`
            public class ArrayLoop {
                public static void main(String[] args) {
                    int[] scores = {72, 45, 88, 91, 50, 39, 67};

                    // for ปกติ: ได้ทั้ง index และค่า
                    for (int i = 0; i < scores.length; i++) {
                        System.out.print(i + ":" + scores[i] + " ");
                    }
                    System.out.println();

                    // for-each: อ่านทีละค่า เหมาะกับการรวมและนับ
                    int sum = 0, passed = 0;
                    for (int s : scores) {
                        sum += s;                  // สะสมผลรวม
                        if (s >= 50) passed++;     // นับเฉพาะที่ผ่าน
                    }
                    double avg = (double) sum / scores.length;     // หารด้วย length ไม่ใช่เลข 7
                    System.out.printf("sum %d, avg %.2f, passed %d/%d%n", sum, avg, passed, scores.length);
                }
            }`,
          },
        { type: "tip", html: `รวม (sum) และนับ (count) เป็นสองรูปแบบที่ใช้กับอาเรย์แทบทุกโจทย์: ตัวแปรเริ่มที่ 0 ก่อนลูป แล้วบวกหรือเพิ่มในลูป` },

        { type: "h", text: "หาค่ามากสุด น้อยสุด และตำแหน่ง" },
        { type: "p", html: `สมมติให้ช่องแรกเป็นทั้งค่ามากสุดและน้อยสุด แล้วเทียบกับช่องที่เหลือ เก็บ <strong>index</strong> ไว้แทนค่า จะได้รู้ทั้งตำแหน่งและค่า` },
        { type: "run", title: "วันที่ขายดีที่สุดและแย่ที่สุด",
          code: j`
            public class FindMax {
                public static void main(String[] args) {
                    double[] sales = {1200.5, 980.0, 1530.25, 760.0, 1490.0};
                    int maxIndex = 0, minIndex = 0;            // เริ่มจากช่องแรก

                    for (int i = 1; i < sales.length; i++) {   // เริ่ม i = 1
                        if (sales[i] > sales[maxIndex]) maxIndex = i;
                        if (sales[i] < sales[minIndex]) minIndex = i;
                    }
                    System.out.println("Best day: " + (maxIndex + 1) + " (" + sales[maxIndex] + ")");   // วันที่ 3
                    System.out.println("Worst day: " + (minIndex + 1) + " (" + sales[minIndex] + ")");  // วันที่ 4
                }
            }`,
          },

        { type: "h", text: "ค้นหาแบบเชิงเส้น (linear search)" },
        { type: "p", html: `ไล่ตรวจทีละช่องจนเจอ ใช้ค่า <code>-1</code> แทนความหมายว่า “ยังไม่เจอ” และ <code>break</code> ออกจากลูปทันทีที่เจอ` },
        { type: "run", title: "ค้นหาชื่อในรายชื่อ", stdin: "RM",
          code: j`
            import java.util.Scanner;

            public class LinearSearch {
                public static void main(String[] args) {
                    String[] students = {"JHope", "Suga", "RM", "Jungkook", "Mark"};
                    Scanner input = new Scanner(System.in);
                    System.out.print("Search name: ");
                    String target = input.next();

                    int found = -1;                                     // -1 = ยังไม่เจอ
                    for (int i = 0; i < students.length; i++) {
                        if (students[i].equalsIgnoreCase(target)) {
                            found = i;
                            break;                                      // เจอแล้ว หยุดค้น
                        }
                    }
                    if (found >= 0) System.out.println(target + " is at index " + found);
                    else System.out.println(target + " not found");
                }
            }`,
          },

        { type: "h", text: "= ไม่ได้คัดลอกอาเรย์" },
        { type: "p", html: `ตัวแปรอาเรย์เก็บ<strong>ที่อยู่ (reference)</strong> ของข้อมูล ไม่ได้เก็บข้อมูลเอง <code>b = a</code> จึงทำให้ทั้งสองชื่อชี้ข้อมูลชุดเดียวกัน` },
        { type: "run", title: "ชี้ชุดเดียวกัน vs สำเนาจริง",
          code: j`
            import java.util.Arrays;

            public class ArrayReference {
                public static void main(String[] args) {
                    int[] a = {1, 2, 3};
                    int[] b = a;              // b ชี้ข้อมูลชุดเดียวกับ a
                    int[] c = a.clone();      // c เป็นสำเนาใหม่
                    b[0] = 99;                // แก้ผ่าน b

                    System.out.println(Arrays.toString(a));        // [99, 2, 3]  a เปลี่ยนด้วย!
                    System.out.println(Arrays.toString(c));        // [1, 2, 3]   สำเนาไม่เปลี่ยน
                    System.out.println(a == b);                    // true   ชุดเดียวกัน
                    System.out.println(Arrays.equals(a, c));       // false  ค่าในช่องต่างกันแล้ว
                }
            }`,
          },
        { type: "warn", html: `ถ้าต้องการสำเนาจริงให้ใช้ <code>a.clone()</code> หรือ <code>Arrays.copyOf(a, a.length)</code> และถ้าพิมพ์ <code>println(a)</code> ตรง ๆ จะได้ข้อความแปลก ๆ เช่น <code>[I@1b6d3586</code> ให้ใช้ <code>Arrays.toString(a)</code>` },
        { type: "practice", level: 2, title: "ค่าที่ใกล้ค่าเฉลี่ยที่สุด",
          html: `<p>รับจำนวน n และตัวเลข n ตัว หาค่าเฉลี่ย แล้วหาว่าตัวเลขตัวใดอยู่<strong>ใกล้ค่าเฉลี่ยที่สุด</strong> แสดงค่านั้นพร้อม index ถ้าใกล้เท่ากันให้เลือกตัวที่อยู่ก่อน</p>`,
          spec: ["วนรอบแรกหาผลรวมเพื่อคำนวณค่าเฉลี่ย (double)", "วนรอบที่สองหา index ที่ระยะห่าง <code>Math.abs(arr[i] - avg)</code> น้อยที่สุด", "แสดงค่าเฉลี่ยทศนิยม 2 ตำแหน่ง"],
          runs: ["5\n2 9 6 1 9", "4\n10 20 30 40"],
          hint: "คำใบ้: เก็บ index ที่ดีที่สุดไว้ เริ่มที่ 0 แล้วเปลี่ยนเมื่อพบตัวที่ห่างน้อยกว่า (ใช้ &lt; ไม่ใช่ &lt;= จึงได้ตัวที่อยู่ก่อนเมื่อเสมอ)",
          solution: j`
            import java.util.Scanner;

            public class ClosestToAverage {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("n = ");
                    int n = input.nextInt();
                    int[] arr = new int[n];
                    System.out.print("Values: ");
                    int sum = 0;
                    for (int i = 0; i < n; i++) {
                        arr[i] = input.nextInt();
                        sum += arr[i];
                    }
                    double avg = (double) sum / n;

                    int best = 0;                                     // index ที่ใกล้ที่สุดจนถึงตอนนี้
                    for (int i = 1; i < n; i++) {
                        if (Math.abs(arr[i] - avg) < Math.abs(arr[best] - avg)) {
                            best = i;
                        }
                    }
                    System.out.printf("Average = %.2f%n", avg);
                    System.out.println("Closest to average: " + arr[best] + " at index " + best);
                }
            }`,
          explain: "ต้องรู้ค่าเฉลี่ยก่อนจึงจะวัดระยะห่างได้ จึงต้องวนสองรอบ ชุดที่สองค่าเฉลี่ย 25 ห่างจาก 20 และ 30 เท่ากัน (5) เงื่อนไข < ทำให้ได้ 20 ซึ่งอยู่ก่อน" },
        { type: "check", title: "นับ", html: jpre(`
          int[] v = {3, 8, 2, 8, 5, 8};
          int count = 0, last = -1;
          for (int i = 0; i < v.length; i++) {
              if (v[i] == 8) { count++; last = i; }
          }`), answer: `<p>count = <strong>3</strong>, last = <strong>5</strong> (ตำแหน่งสุดท้ายที่พบเลข 8)</p>` },
      ],
    },
    {
      num: "8.3", toc: "อาเรย์สองมิติ", title: "อาเรย์สองมิติ",
      blocks: [
        { type: "p", html: `อาเรย์สองมิติเก็บข้อมูลแบบ<strong>ตาราง</strong> (แถว × คอลัมน์) อ้างช่องด้วย <code>ชื่อ[แถว][คอลัมน์]</code> โดย <code>ชื่อ.length</code> คือจำนวนแถว และ <code>ชื่อ[r].length</code> คือจำนวนคอลัมน์ของแถว r` },
        { type: "cells", name: "int[][] scores = {{80, 75, 90}, {60, 85, 70}};", caption: "→ 2 แถว 3 คอลัมน์ เช่น scores[1][2] = 70", values: [[80, 75, 90], [60, 85, 70]] },
        { type: "run", title: "อ่านทั้งตารางด้วยลูปซ้อน",
          code: j`
            public class Grid2D {
                public static void main(String[] args) {
                    int[][] scores = {
                        {80, 75, 90},      // แถว 0
                        {60, 85, 70}       // แถว 1
                    };
                    System.out.println(scores.length);      // 2    จำนวนแถว
                    System.out.println(scores[0].length);   // 3    จำนวนคอลัมน์
                    System.out.println(scores[1][2]);       // 70   แถว 1 คอลัมน์ 2

                    for (int r = 0; r < scores.length; r++) {             // ลูปนอก: แถว
                        for (int c = 0; c < scores[r].length; c++) {      // ลูปใน: คอลัมน์
                            System.out.printf("%4d", scores[r][c]);
                        }
                        System.out.println();                             // จบแถว ขึ้นบรรทัดใหม่
                    }
                }
            }`,
          },

        { type: "h", text: "ผลรวมแต่ละแถวและแต่ละคอลัมน์" },
        { type: "p", html: `รวมตามแถว: ลูปนอกเป็นแถว และตั้งผลรวมเป็น 0 ใหม่ทุกแถว ส่วนรวมตามคอลัมน์ให้สลับลูปนอกเป็นคอลัมน์` },
        { type: "run", title: "ตารางคะแนน: รวมรายคน เฉลี่ยรายวิชา",
          code: j`
            public class RowColSums {
                public static void main(String[] args) {
                    String[] students = {"JHope", "Suga", "RM"};
                    String[] subjects = {"Math", "Sci", "Eng"};
                    int[][] s = {
                        {78, 85, 90},
                        {62, 70, 58},
                        {95, 88, 92}
                    };
                    System.out.printf("%-6s", "");
                    for (String sub : subjects) System.out.printf("%6s", sub);
                    System.out.printf("%7s%n", "Total");

                    for (int r = 0; r < s.length; r++) {
                        int rowSum = 0;                              // เริ่มใหม่ทุกแถว
                        System.out.printf("%-6s", students[r]);
                        for (int c = 0; c < s[r].length; c++) {
                            System.out.printf("%6d", s[r][c]);
                            rowSum += s[r][c];
                        }
                        System.out.printf("%7d%n", rowSum);
                    }

                    System.out.printf("%-6s", "Avg");
                    for (int c = 0; c < subjects.length; c++) {      // ลูปนอกเป็นคอลัมน์
                        int colSum = 0;
                        for (int r = 0; r < s.length; r++) colSum += s[r][c];
                        System.out.printf("%6.1f", (double) colSum / s.length);
                    }
                    System.out.println();
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: จองที่นั่งด้วย boolean[][]", blocks: [
          { type: "run", title: "ที่นั่งโรงภาพยนตร์", stdin: "1 2\n0 0\n1 2",
            code: j`
              import java.util.Scanner;

              public class SeatBooking {
                  public static void main(String[] args) {
                      boolean[][] booked = new boolean[3][4];      // 3 แถว 4 ที่นั่ง ทุกช่องเป็น false
                      Scanner input = new Scanner(System.in);
                      for (int k = 0; k < 3; k++) {
                          System.out.print("Book row col: ");
                          int r = input.nextInt(), c = input.nextInt();
                          if (booked[r][c]) {                       // true = มีคนจองแล้ว
                              System.out.println("  Seat taken!");
                          } else {
                              booked[r][c] = true;
                              System.out.println("  Booked.");
                          }
                      }
                      for (int r = 0; r < booked.length; r++) {
                          for (int c = 0; c < booked[r].length; c++) {
                              System.out.print(booked[r][c] ? "[X]" : "[ ]");
                          }
                          System.out.println();
                      }
                  }
              }`,
            after: "จอง (1,2) และ (0,0) สำเร็จ พอจอง (1,2) ซ้ำจะพบว่าช่องนั้นเป็น <code>true</code> แล้ว" },
        ] },
        { type: "practice", level: 2, title: "ผลรวมแนวทแยง",
          html: `<p>รับขนาด n แล้วรับตาราง n × n แสดงตาราง ผลรวมของ<strong>แนวทแยงหลัก</strong> (ซ้ายบนไปขวาล่าง) และ<strong>แนวทแยงรอง</strong> (ขวาบนไปซ้ายล่าง) และบอกว่าสองค่านี้เท่ากันหรือไม่</p>`,
          spec: ["ใช้อาเรย์ 2 มิติ <code>int[][] m = new int[n][n];</code>", "แนวทแยงทั้งสองใช้ลูปชั้นเดียว ไม่ต้องวนทุกช่อง", "แสดงตารางโดยจัดคอลัมน์ด้วย <code>%4d</code>"],
          runs: ["3\n2 7 6\n9 5 1\n4 3 8", "3\n1 2 3\n4 5 6\n7 8 10"],
          hint: "คำใบ้: แนวทแยงหลักคือ m[i][i] แนวทแยงรองคือ m[i][n - 1 - i]",
          solution: j`
            import java.util.Scanner;

            public class Diagonals {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("n = ");
                    int n = input.nextInt();
                    int[][] m = new int[n][n];
                    for (int r = 0; r < n; r++) {
                        for (int c = 0; c < n; c++) {
                            m[r][c] = input.nextInt();
                        }
                    }

                    for (int r = 0; r < n; r++) {
                        for (int c = 0; c < n; c++) {
                            System.out.printf("%4d", m[r][c]);
                        }
                        System.out.println();
                    }

                    int mainSum = 0, antiSum = 0;
                    for (int i = 0; i < n; i++) {
                        mainSum += m[i][i];                    // (0,0) (1,1) (2,2)
                        antiSum += m[i][n - 1 - i];            // (0,2) (1,1) (2,0)
                    }
                    System.out.println("Main diagonal: " + mainSum);
                    System.out.println("Anti diagonal: " + antiSum);
                    System.out.println("Equal? " + (mainSum == antiSum));
                }
            }`,
          explain: "บนแนวทแยงหลักเลขแถวเท่ากับเลขคอลัมน์ ส่วนแนวทแยงรองผลรวมของเลขแถวกับคอลัมน์เท่ากับ n - 1 เสมอ จึงไม่ต้องใช้ลูปซ้อนเพื่อหาช่องเหล่านี้" },
        { type: "check", title: "index 2 มิติ", html: jpre(`
          int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
          int sum = 0;
          for (int i = 0; i < m.length; i++) sum += m[i][i];`), answer: `<p>บวกเส้นทแยงมุม m[0][0] + m[1][1] + m[2][2] = 1 + 5 + 9 = <strong>15</strong></p>` },
      ],
    },
    {
      num: "8.4", toc: "อาเรย์กับเมธอด", title: "อาเรย์กับเมธอด และคลาส Arrays",
      blocks: [
        { type: "p", html: `ส่งอาเรย์ให้เมธอดได้เหมือนตัวแปรทั่วไป แต่สิ่งที่ส่งไปคือ<strong>ที่อยู่ของอาเรย์</strong> ถ้าเมธอดแก้ค่าในช่อง ผู้เรียกจะเห็นการเปลี่ยนแปลงด้วย (ต่างจาก <code>int</code> ในบทที่ 7)` },
        { type: "run", title: "เมธอดที่ใช้ได้กับอาเรย์ทุกขนาด",
          code: j`
            public class ArrayMethods {
                public static void main(String[] args) {
                    int[] a = {4, 9, 1, 7};
                    int[] b = {10, 20};
                    System.out.println(sum(a) + " " + max(a));     // 21 9
                    System.out.println(sum(b) + " " + max(b));     // 30 20
                    doubleAll(b);
                    System.out.println(b[0] + " " + b[1]);         // 20 40   b เปลี่ยนจริง
                }

                static int sum(int[] values) {          // รับอาเรย์เป็น parameter
                    int total = 0;
                    for (int v : values) total += v;
                    return total;
                }

                static int max(int[] values) {
                    int best = values[0];
                    for (int v : values) if (v > best) best = v;
                    return best;
                }

                static void doubleAll(int[] values) {   // แก้ช่องในอาเรย์ที่ส่งมา
                    for (int i = 0; i < values.length; i++) values[i] *= 2;
                }
            }`,
          },
        { type: "tip", html: `ใช้ <code>values.length</code> แทนเลขตายตัว เมธอดเดียวจึงใช้ได้กับอาเรย์ทุกขนาด และ <code>doubleAll</code> ต้องใช้ for ปกติ เพราะ for-each แก้ค่าในช่องไม่ได้` },

        { type: "h", text: "คลาส java.util.Arrays" },
        { type: "p", html: `Java มีเมธอดสำเร็จรูปสำหรับงานที่ทำกับอาเรย์บ่อย ๆ ต้อง <code>import java.util.Arrays;</code> ก่อนใช้` },
        { type: "table", head: ["เมธอด", "ทำอะไร"], rows: [
          ["<code>Arrays.toString(a)</code>", "แปลงทั้งอาเรย์เป็นข้อความ <code>[1, 2, 3]</code>"],
          ["<code>Arrays.sort(a)</code>", "เรียงจากน้อยไปมาก (แก้อาเรย์เดิม)"],
          ["<code>Arrays.copyOf(a, n)</code>", "สำเนา n ช่องแรก ถ้า n ใหญ่กว่าเดิม ช่องที่เกินเป็นค่าเริ่มต้น"],
          ["<code>Arrays.fill(a, v)</code>", "ใส่ค่า v ทุกช่อง"],
          ["<code>Arrays.equals(a, b)</code>", "เทียบค่าทุกช่องว่าเท่ากันหรือไม่"],
        ] },
        { type: "run", title: "ใช้เมธอดของ Arrays",
          code: j`
            import java.util.Arrays;

            public class ArraysUtility {
                public static void main(String[] args) {
                    int[] nums = {42, 7, 19, 3, 25};
                    int[] backup = Arrays.copyOf(nums, nums.length);   // สำรองก่อนเรียง
                    Arrays.sort(nums);                                  // เรียงน้อยไปมาก

                    System.out.println(Arrays.toString(nums));          // [3, 7, 19, 25, 42]
                    System.out.println(Arrays.toString(backup));        // [42, 7, 19, 3, 25]
                    System.out.println(nums[nums.length / 2]);          // 19   ค่ากลาง

                    String[] names = {"Jungkook", "Suga", "JHope"};
                    Arrays.sort(names);                                 // เรียงตามตัวอักษร
                    System.out.println(Arrays.toString(names));         // [JHope, Jungkook, Suga]

                    int[] filled = new int[5];
                    Arrays.fill(filled, 7);
                    System.out.println(Arrays.toString(filled));        // [7, 7, 7, 7, 7]
                    int[] bigger = Arrays.copyOf(backup, 7);            // ช่องที่เกินเป็น 0
                    System.out.println(Arrays.toString(bigger));        // [42, 7, 19, 3, 25, 0, 0]
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เขียนการเรียงลำดับเองด้วย Bubble Sort", blocks: [
          { type: "p", html: `สลับคู่ที่ติดกันซึ่งเรียงผิด ทำซ้ำหลายรอบ ค่าที่มากที่สุดจะ “ลอย” ไปอยู่ท้ายทีละตัว` },
          { type: "run", title: "Bubble Sort ทีละรอบ",
            code: j`
              import java.util.Arrays;

              public class BubbleSort {
                  public static void main(String[] args) {
                      int[] a = {5, 2, 9, 1, 6};
                      System.out.println("start  " + Arrays.toString(a));
                      for (int pass = 0; pass < a.length - 1; pass++) {           // n - 1 รอบ
                          for (int i = 0; i < a.length - 1 - pass; i++) {         // ช่องท้ายเรียงแล้ว ไม่ต้องเทียบ
                              if (a[i] > a[i + 1]) {                              // คู่นี้เรียงผิด → สลับ
                                  int temp = a[i];
                                  a[i] = a[i + 1];
                                  a[i + 1] = temp;
                              }
                          }
                          System.out.println("pass " + (pass + 1) + " " + Arrays.toString(a));
                      }
                  }
              }`,
            after: "หลังรอบแรก 9 ไปอยู่ท้ายสุดแล้ว รอบถัดไปจึงเทียบน้อยลงรอบละ 1 คู่ (<code>- pass</code>)" },
        ] },
      ],
    },
    {
      num: "8.5", toc: "ระบบจองที่นั่งรถตู้", title: "ลงมือเขียน: ระบบจองที่นั่งรถตู้",
      blocks: [
        { type: "p", html: `หัวข้อนี้รวมอาเรย์กับเมธอดเป็นโปรแกรมเดียว ด้วยขั้นตอนเดียวกับหัวข้อ 7.6: อ่านโจทย์ → เขียนรหัสเทียม → เลือกเมธอด → เขียนและทดสอบทีละขั้น` },
        { type: "h", text: "โจทย์" },
        { type: "concept", title: "รถตู้ 10 ที่นั่ง", html: `<ul><li>ที่นั่งมีหมายเลข <strong>1 ถึง 10</strong> เริ่มต้นว่างทุกที่</li><li>เมนู: <code>1) Show</code> แสดงผังที่นั่งและจำนวนที่ว่าง, <code>2) Book</code> จองที่นั่ง, <code>3) Cancel</code> ยกเลิก, <code>0) Exit</code> ออก</li><li>จองที่นั่งที่มีคนจองแล้วไม่ได้ ยกเลิกที่นั่งที่ยังไม่ได้จองก็ไม่ได้</li><li>หมายเลขที่นั่งนอก 1–10 ให้แจ้งว่าไม่มีที่นั่งนั้น</li></ul>` },
        { type: "p", html: `ผังที่นั่งแสดงหมายเลขที่ว่าง และ <code>XX</code> แทนที่นั่งที่จองแล้ว เช่น เมื่อจองที่ 2 และ 5:` },
        { type: "example", title: "ผังที่นั่ง", html: pre(`[ 1][XX][ 3][ 4][XX][ 6][ 7][ 8][ 9][10]
Free seats: 8`) },

        { type: "h", text: "แนวคิดในการเขียนโปรแกรม" },
        { type: "p", html: `ข้อมูลหลักคือ “ที่นั่งไหนจองแล้วบ้าง” ซึ่งเป็นคำตอบใช่/ไม่ใช่ 10 ค่า จึงเก็บใน <code>boolean[] booked = new boolean[10]</code> ทุกช่องเริ่มเป็น <code>false</code> (ว่าง) ตามค่าเริ่มต้นของอาเรย์` },
        { type: "warn", title: "หมายเลขที่นั่ง ≠ index", html: `ผู้ใช้นับที่นั่งจาก 1 แต่อาเรย์เริ่มที่ index 0 ที่นั่งหมายเลข <code>seat</code> จึงอยู่ที่ <code>booked[seat - 1]</code> ให้แปลงในเมธอดที่เดียว ส่วนอื่นของโปรแกรมใช้หมายเลขที่นั่งตามที่ผู้ใช้เห็น` },
        { type: "example", title: "ขั้นตอนของโปรแกรม", html: fpre(`
          เริ่มต้น
          สร้าง booked 10 ช่อง (ว่างทั้งหมด)
          ทำ
              แสดงเมนู แล้วรับ choice
              ถ้า choice = 1   แสดงผังและจำนวนที่ว่าง        ← งาน: แสดงผัง, นับที่ว่าง
              ถ้า choice = 2   ถามหมายเลขที่นั่ง              ← งาน: ถามหมายเลข
                               ตรวจว่ามีที่นั่งนี้ไหม           ← งาน: ตรวจหมายเลข
                               จอง แล้วแจ้งผล                   ← งาน: จอง (สำเร็จ/ไม่สำเร็จ)
              ถ้า choice = 3   ถาม ตรวจ แล้วยกเลิก              ← งาน: ยกเลิก
          ขณะที่ choice ไม่ใช่ 0
          จบ`, "รหัสเทียม") },

        { type: "h", text: "ควรมีเมธอดอะไรบ้าง" },
        { type: "table", head: ["เมธอด", "หน้าที่", "รับอะไร", "คืนอะไร"], rows: [
          ["<code>printSeats</code>", "แสดงผังที่นั่ง", "<code>boolean[] booked</code>", "<code>void</code>"],
          ["<code>countFree</code>", "นับที่นั่งว่าง", "<code>boolean[] booked</code>", "<code>int</code>"],
          ["<code>isValidSeat</code>", "หมายเลขอยู่ใน 1 ถึงจำนวนที่นั่งไหม", "<code>int seat, int total</code>", "<code>boolean</code>"],
          ["<code>book</code>", "จองที่นั่ง ถ้าว่างอยู่", "<code>boolean[] booked, int seat</code>", "<code>boolean</code> จองสำเร็จไหม"],
          ["<code>cancel</code>", "ยกเลิก ถ้าจองไว้", "<code>boolean[] booked, int seat</code>", "<code>boolean</code> ยกเลิกสำเร็จไหม"],
          ["<code>askSeat</code>", "ถามหมายเลขที่นั่ง", "<code>Scanner input</code>", "<code>int</code>"],
        ] },
        { type: "tip", title: "ทำไม book คืน boolean", html: `book ไม่พิมพ์ข้อความเอง แค่บอกว่าสำเร็จหรือไม่ main เป็นคนเลือกข้อความ เมธอดจึงทดสอบง่ายและนำไปใช้กับหน้าจอแบบอื่น (เช่น GUI) ได้โดยไม่ต้องแก้` },

        { type: "h", text: "ขั้นที่ 1: printSeats และ countFree" },
        { type: "p", html: `เริ่มจากเมธอดที่แค่อ่านอาเรย์ ทดสอบด้วยอาเรย์ที่ตั้งค่าเองให้ที่นั่ง 2 และ 5 ถูกจอง ผลต้องตรงกับผังในโจทย์` },
        { type: "run", title: "แสดงผังและนับที่ว่าง",
          code: j`
            public class SeatStep1 {
                public static void main(String[] args) {
                    boolean[] booked = new boolean[10];           // false ทุกช่อง = ว่าง
                    booked[1] = true;                             // ที่นั่ง 2
                    booked[4] = true;                             // ที่นั่ง 5
                    printSeats(booked);
                    System.out.println("Free seats: " + countFree(booked));   // 8
                }

                static void printSeats(boolean[] booked) {
                    for (int i = 0; i < booked.length; i++) {
                        if (booked[i]) {
                            System.out.print("[XX]");
                        } else {
                            System.out.printf("[%2d]", i + 1);    // แสดงหมายเลขที่นั่ง = index + 1
                        }
                    }
                    System.out.println();
                }

                static int countFree(boolean[] booked) {
                    int count = 0;
                    for (boolean b : booked) {
                        if (!b) count++;                          // false = ว่าง
                    }
                    return count;
                }
            }`,
          },

        { type: "h", text: "ขั้นที่ 2: isValidSeat, book และ cancel" },
        { type: "p", html: `เมธอดที่<strong>แก้</strong>อาเรย์ได้ เพราะ parameter ชี้อาเรย์ชุดเดียวกับใน main (หัวข้อ 8.4) ทดสอบทั้งกรณีสำเร็จและไม่สำเร็จ แล้วดูว่าอาเรย์ใน main เปลี่ยนจริง` },
        { type: "run", title: "ทดสอบจอง จองซ้ำ ยกเลิก และหมายเลขผิด",
          code: j`
            public class SeatStep2 {
                public static void main(String[] args) {
                    boolean[] booked = new boolean[10];
                    System.out.println(book(booked, 3));                  // true
                    System.out.println("booked[2] = " + booked[2]);       // true  อาเรย์ใน main เปลี่ยนแล้ว
                    System.out.println(book(booked, 3));                  // false จองซ้ำ
                    System.out.println(cancel(booked, 3));                // true
                    System.out.println(cancel(booked, 3));                // false ไม่ได้จองไว้
                    System.out.println(isValidSeat(10, booked.length));   // true
                    System.out.println(isValidSeat(11, booked.length));   // false
                }

                static boolean isValidSeat(int seat, int total) {
                    return seat >= 1 && seat <= total;
                }

                static boolean book(boolean[] booked, int seat) {
                    if (booked[seat - 1]) return false;                   // มีคนจองแล้ว
                    booked[seat - 1] = true;                              // หมายเลข → index
                    return true;
                }

                static boolean cancel(boolean[] booked, int seat) {
                    if (!booked[seat - 1]) return false;                  // ยังไม่ได้จอง
                    booked[seat - 1] = false;
                    return true;
                }
            }`,
          },
        { type: "warn", html: `book และ cancel เชื่อว่าหมายเลขถูกต้องแล้ว ต้องเรียก isValidSeat ก่อนเสมอ ถ้าส่ง 11 เข้า book ตรง ๆ จะเกิด <code>ArrayIndexOutOfBoundsException</code>` },

        { type: "h", text: "ขั้นที่ 3: ประกอบเป็นโปรแกรมเมนู" },
        { type: "p", html: `main วนเมนูด้วย do-while แล้วเรียกเมธอดตาม choice ทดสอบครบทุกกรณี: จองสำเร็จ จองซ้ำ หมายเลขผิด ยกเลิกที่ไม่ได้จอง` },
        { type: "run", title: "ระบบจองที่นั่งฉบับสมบูรณ์", stdin: "2\n3\n2\n3\n2\n15\n3\n5\n2\n10\n1\n0",
          code: j`
            import java.util.Scanner;

            public class VanBooking {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    boolean[] booked = new boolean[10];
                    int choice;
                    do {
                        System.out.print("\n1) Show  2) Book  3) Cancel  0) Exit : ");
                        choice = input.nextInt();
                        switch (choice) {
                            case 1 -> {
                                printSeats(booked);
                                System.out.println("Free seats: " + countFree(booked));
                            }
                            case 2 -> {
                                int seat = askSeat(input);
                                if (!isValidSeat(seat, booked.length)) {
                                    System.out.println("No seat " + seat);
                                } else if (book(booked, seat)) {
                                    System.out.println("Booked seat " + seat);
                                } else {
                                    System.out.println("Seat " + seat + " is already taken");
                                }
                            }
                            case 3 -> {
                                int seat = askSeat(input);
                                if (!isValidSeat(seat, booked.length)) {
                                    System.out.println("No seat " + seat);
                                } else if (cancel(booked, seat)) {
                                    System.out.println("Cancelled seat " + seat);
                                } else {
                                    System.out.println("Seat " + seat + " was not booked");
                                }
                            }
                            case 0 -> System.out.println("Bye");
                            default -> System.out.println("Invalid menu");
                        }
                    } while (choice != 0);
                }

                static int askSeat(Scanner input) {
                    System.out.print("Seat number (1-10): ");
                    return input.nextInt();
                }

                static void printSeats(boolean[] booked) {
                    for (int i = 0; i < booked.length; i++) {
                        if (booked[i]) {
                            System.out.print("[XX]");
                        } else {
                            System.out.printf("[%2d]", i + 1);
                        }
                    }
                    System.out.println();
                }

                static int countFree(boolean[] booked) {
                    int count = 0;
                    for (boolean b : booked) {
                        if (!b) count++;
                    }
                    return count;
                }

                static boolean isValidSeat(int seat, int total) {
                    return seat >= 1 && seat <= total;
                }

                static boolean book(boolean[] booked, int seat) {
                    if (booked[seat - 1]) return false;
                    booked[seat - 1] = true;
                    return true;
                }

                static boolean cancel(boolean[] booked, int seat) {
                    if (!booked[seat - 1]) return false;
                    booked[seat - 1] = false;
                    return true;
                }
            }`,
          },
        { type: "p", html: `สังเกตว่า main ไม่มีโค้ดแปลงหมายเลขเป็น index หรือวนลูปอาเรย์เลย ทุกอย่างเกี่ยวกับอาเรย์อยู่ในเมธอด ถ้าวันหนึ่งรถมี 12 ที่นั่ง แก้แค่ <code>new boolean[12]</code> ส่วนอื่นใช้ <code>booked.length</code> อยู่แล้ว` },
        { type: "check", title: "ประกาศอาเรย์ที่ไหน", html: `<p>ถ้าย้าย <code>boolean[] booked = new boolean[10];</code> เข้าไปไว้ใน do-while จะเกิดอะไรขึ้น</p>`, answer: `<p>ทุกรอบเมนูจะได้อาเรย์ใหม่ที่ว่างทั้งหมด การจองในรอบก่อนหายไป เลือก Show จะเห็นที่นั่งว่างทุกที่เสมอ ข้อมูลที่ต้องจำข้ามรอบต้องประกาศไว้นอกลูป</p>` },
        { type: "practice", level: 2, title: "หาที่นั่งว่างติดกัน 2 ที่",
          html: `<p>ครอบครัวมา 2 คนต้องการนั่งติดกัน เขียนเมธอด <code>static int findPair(boolean[] booked)</code> คืน<strong>หมายเลขที่นั่งตัวแรก</strong>ของคู่ที่นั่งว่างติดกันคู่แรกที่พบ (เช่น ว่างทั้งที่ 6 และ 7 → คืน 6) ถ้าไม่มีให้คืน −1 แล้วทดสอบใน main ด้วยผังที่กำหนด: จองคู่ที่พบ แล้วหาคู่ถัดไปซ้ำจนไม่มี</p>`,
          spec: ["ตั้งผังเริ่มต้นให้ที่นั่ง 2, 4, 5 และ 8 ถูกจองแล้ว", "findPair ห้ามแก้อาเรย์ ทำหน้าที่ค้นหาอย่างเดียว", "main วนลูป: เรียก findPair ถ้าได้ค่าไม่ใช่ −1 ให้จองทั้งสองที่ด้วย book แล้วแสดงผัง ถ้าได้ −1 ให้แสดง <code>No 2 seats together</code> แล้วจบ", "ใช้ printSeats และ book จากตัวอย่างโดยไม่แก้"],
          hint: "คำใบ้: วน i ตั้งแต่ 0 ถึง booked.length - 2 (เพราะต้องดู i + 1 ด้วย) ถ้า !booked[i] && !booked[i + 1] ให้คืน i + 1",
          solution: j`
            public class FindPair {
                public static void main(String[] args) {
                    boolean[] booked = new boolean[10];
                    booked[1] = true;                                 // ที่นั่ง 2
                    booked[3] = true;                                 // ที่นั่ง 4
                    booked[4] = true;                                 // ที่นั่ง 5
                    booked[7] = true;                                 // ที่นั่ง 8
                    printSeats(booked);

                    int seat = findPair(booked);
                    while (seat != -1) {
                        book(booked, seat);
                        book(booked, seat + 1);
                        System.out.println("Booked seats " + seat + " and " + (seat + 1));
                        printSeats(booked);
                        seat = findPair(booked);
                    }
                    System.out.println("No 2 seats together");
                }

                static int findPair(boolean[] booked) {
                    for (int i = 0; i < booked.length - 1; i++) {   // ไม่เกิน length - 2 เพราะดู i + 1
                        if (!booked[i] && !booked[i + 1]) {
                            return i + 1;                             // index → หมายเลขที่นั่ง
                        }
                    }
                    return -1;
                }

                static void printSeats(boolean[] booked) {
                    for (int i = 0; i < booked.length; i++) {
                        if (booked[i]) {
                            System.out.print("[XX]");
                        } else {
                            System.out.printf("[%2d]", i + 1);
                        }
                    }
                    System.out.println();
                }

                static boolean book(boolean[] booked, int seat) {
                    if (booked[seat - 1]) return false;
                    booked[seat - 1] = true;
                    return true;
                }
            }`,
          explain: "เงื่อนไขลูป i < booked.length - 1 กันไม่ให้ booked[i + 1] เกินขอบอาเรย์ในรอบสุดท้าย ผังเริ่มต้นมีคู่ว่าง 6–7 และ 9–10 ส่วนที่นั่ง 1 และ 3 ว่างแต่ไม่มีเพื่อนข้าง ๆ จึงหาคู่ไม่ได้" },
        { type: "try", html: `เพิ่มเมนู <code>4) Book 2 together</code> ในโปรแกรมฉบับสมบูรณ์ โดยใช้ findPair จากโจทย์ฝึก` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "เก็บอุณหภูมิ", html: `<p>สร้างอาเรย์ <code>double</code> เก็บอุณหภูมิ 5 วัน: 29.5, 31.0, 30.2, 28.8, 32.1 แล้วแสดงอุณหภูมิของวันที่สอง วันสุดท้าย (โดยใช้ length) และจำนวนวัน</p>`,
      spec: ["ประกาศพร้อมกำหนดค่าด้วย <code>{ }</code>", "วันสุดท้ายต้องใช้ <code>temps[temps.length - 1]</code>"],
      solution: j`
        public class Temperatures {
            public static void main(String[] args) {
                double[] temps = {29.5, 31.0, 30.2, 28.8, 32.1};
                // index 1 คือวันที่ 2
                System.out.println("Day 2: " + temps[1]);
                // ช่องสุดท้ายคือ length - 1
                System.out.println("Last day: " + temps[temps.length - 1]);
                System.out.println("Days: " + temps.length);
            }
        }` },
    { level: 1, title: "แสดงทุกค่าโดยไม่เกินขอบเขต", html: `<p>อาเรย์ <code>{4, 8, 12, 16, 20}</code> จงเขียน for ปกติแสดงค่าพร้อม index และเขียน for-each แสดงค่าแบบต่อกันในบรรทัดเดียว</p>`,
      spec: ["เงื่อนไขลูปต้องใช้ <code>i &lt; values.length</code>", "ผลลัพธ์รูปแบบ <code>[0] = 4</code>", "บรรทัดสุดท้ายแสดงค่าทั้งหมดคั่นด้วยช่องว่าง"],
      solution: j`
        public class PrintAll {
            public static void main(String[] args) {
                int[] values = {4, 8, 12, 16, 20};
                // for แบบ index
                for (int i = 0; i < values.length; i++) {
                    System.out.println("[" + i + "] = " + values[i]);
                }
                for (int v : values) {  // for-each
                    System.out.print(v + " ");
                }
                System.out.println();
            }
        }` },
    { level: 1, title: "รวมและเฉลี่ยคะแนนที่ป้อน", html: `<p>รับจำนวนนักศึกษา n แล้วรับคะแนน n ค่าเก็บในอาเรย์ แสดงคะแนนทั้งหมด ผลรวม และค่าเฉลี่ย</p>`,
      spec: ["สร้างอาเรย์ขนาด n ด้วย new", "ใช้ลูปอ่านค่า และอีกลูปคำนวณ", "แสดงค่าเฉลี่ย 2 ตำแหน่ง"], stdin: "5\n70 82 65 90 77",
      solution: j`
        import java.util.Arrays;
        import java.util.Scanner;

        public class ScoreArray {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                // สร้างอาเรย์ตามจำนวนที่ผู้ใช้ป้อน
                int[] scores = new int[n];
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) {
                    scores[i] = input.nextInt();  // อ่านค่าลงช่องที่ i
                }
                int sum = 0;
                for (int s : scores) sum += s;  // for-each รวมค่า
                System.out.println("Scores: " + Arrays.toString(scores));
                System.out.println("Sum: " + sum);
                System.out.printf("Average: %.2f%n", (double) sum / n);
            }
        }` },
    { level: 2, title: "คะแนนสูงกว่าค่าเฉลี่ย", html: `<p>รับคะแนน n ค่า หาค่าเฉลี่ย แล้วแสดงรายการคะแนนที่<strong>สูงกว่าค่าเฉลี่ย</strong>พร้อมลำดับที่ของนักศึกษา (เริ่มนับที่ 1) และจำนวนคนที่สูงกว่าค่าเฉลี่ย</p>`,
      spec: ["ต้องเก็บคะแนนในอาเรย์ เพราะต้องวนสองรอบ (หาค่าเฉลี่ยก่อน แล้วจึงเทียบ)", "แสดงในรูปแบบ <code>Student 2: 88</code>"], stdin: "6\n55 88 72 91 60 79",
      solution: j`
        import java.util.Scanner;

        public class AboveAverage {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                int[] scores = new int[n];
                int sum = 0;
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) {
                    // เก็บค่าไว้ก่อน เพื่อใช้เทียบภายหลัง
                    scores[i] = input.nextInt();
                    sum += scores[i];  // รวมไปพร้อมกัน
                }
                double avg = (double) sum / n;
                System.out.printf("Average = %.2f%n", avg);
                int count = 0;
                // วนรอบที่ 2: เทียบกับค่าเฉลี่ย
                for (int i = 0; i < n; i++) {
                    if (scores[i] > avg) {
                        System.out.println("Student " + (i + 1) + ": " + scores[i]);
                        count++;
                    }
                }
                System.out.println("Above average: " + count);
            }
        }`, explain: "นี่คือเหตุผลที่ต้องใช้อาเรย์ — ถ้าอ่านแล้วทิ้งเลย จะย้อนกลับไปเทียบกับค่าเฉลี่ยไม่ได้" },
    { level: 2, title: "ค้นหาสินค้าและราคา", html: `<p>มีอาเรย์คู่ขนาน (parallel arrays) <code>String[] items = {"Pen", "Pencil", "Eraser", "Ruler", "Notebook"}</code> และ <code>double[] prices = {12, 6, 8.5, 15, 35}</code> ให้ผู้ใช้ป้อนชื่อสินค้าและจำนวน แล้วแสดงราคารวม ถ้าไม่พบสินค้าให้แสดง <code>Item not found</code></p>`,
      spec: ["ค้นหาแบบไม่สนตัวพิมพ์ด้วย equalsIgnoreCase", "index ของ items และ prices ต้องสอดคล้องกัน", "ใช้ found = −1 เป็นค่าเริ่มต้น"], runs: ["ruler\n3", "Glue\n1"],
      solution: j`
        import java.util.Scanner;

        public class PriceLookup {
            public static void main(String[] args) {
                // อาเรย์คู่ขนาน: index เดียวกัน = สินค้าเดียวกัน
                String[] items = {"Pen", "Pencil", "Eraser", "Ruler", "Notebook"};
                double[] prices = {12, 6, 8.5, 15, 35};
                Scanner input = new Scanner(System.in);
                System.out.print("Item: ");
                String name = input.next();
                System.out.print("Qty: ");
                int qty = input.nextInt();
                int found = -1;
                for (int i = 0; i < items.length; i++) {
                    // หาตำแหน่งของสินค้า
                    if (items[i].equalsIgnoreCase(name)) {
                        found = i;
                        break;
                    }
                }
                if (found == -1) {
                    System.out.println("Item not found");
                } else {
                    // ใช้ index เดียวกันดึงราคา
                    System.out.printf("%s x %d = %.2f baht%n", items[found], qty, prices[found] * qty);
                }
            }
        }` },
    { level: 2, title: "กลับลำดับอาเรย์ในที่เดิม", html: `<p>เขียนเมธอด <code>static void reverse(int[] a)</code> ที่กลับลำดับสมาชิก<strong>ในอาเรย์เดิม</strong> (ไม่สร้างอาเรย์ใหม่) โดยสลับตัวแรกกับตัวสุดท้าย ตัวที่สองกับตัวรองสุดท้าย … แล้วทดสอบกับอาเรย์ขนาดคู่และขนาดคี่</p>`,
      spec: ["ลูปวนแค่ครึ่งอาเรย์ (<code>i &lt; a.length / 2</code>)", "ตำแหน่งคู่สลับคือ <code>a.length - 1 - i</code>", "แสดงผลด้วย Arrays.toString ก่อนและหลัง"],
      solution: j`
        import java.util.Arrays;

        public class ReverseInPlace {
            public static void main(String[] args) {
                int[] even = {1, 2, 3, 4, 5, 6};
                int[] odd = {10, 20, 30, 40, 50};
                System.out.println("before: " + Arrays.toString(even) + " " + Arrays.toString(odd));
                reverse(even);
                reverse(odd);
                System.out.println("after : " + Arrays.toString(even) + " " + Arrays.toString(odd));
            }

            static void reverse(int[] a) {
                // วนแค่ครึ่งเดียว
                for (int i = 0; i < a.length / 2; i++) {
                    // ตำแหน่งคู่จากด้านท้าย
                    int j = a.length - 1 - i;
                    // สลับช่อง i กับ j
                    int temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                }
            }
        }`, explain: "ถ้าวนครบทั้งอาเรย์ จะสลับกลับไปเป็นลำดับเดิม! ขนาดคี่ ตัวกลางไม่ต้องสลับ" },
    { level: 2, title: "ความถี่ของคะแนน (histogram)", html: `<p>รับคะแนนแบบจำนวนเต็ม 0–10 จำนวน n ค่า แล้วนับว่าแต่ละคะแนนปรากฏกี่ครั้ง โดยใช้อาเรย์ <code>int[] freq = new int[11]</code> ซึ่ง index คือคะแนน แสดงผลเป็นแผนภูมิดาวเฉพาะคะแนนที่มีคนได้</p>`,
      spec: ["ใช้ค่าคะแนนเป็น index โดยตรง: <code>freq[score]++</code>", "ข้ามคะแนนที่มีความถี่เป็น 0", "แสดงดาวด้วย <code>\"*\".repeat(freq[s])</code>"], stdin: "12\n7 8 7 10 5 8 7 9 6 8 7 10",
      solution: j`
        import java.util.Scanner;

        public class ScoreHistogram {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                // ช่อง 0-10 เก็บจำนวนครั้งของแต่ละคะแนน
                int[] freq = new int[11];
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) {
                    int score = input.nextInt();
                    freq[score]++;  // ใช้คะแนนเป็น index แล้วนับเพิ่ม
                }
                for (int s = 0; s <= 10; s++) {
                    if (freq[s] > 0) {
                        // repeat วาดแท่งตามความถี่
                        System.out.printf("%2d | %-6s (%d)%n", s, "*".repeat(freq[s]), freq[s]);
                    }
                }
            }
        }` },
    { level: 3, title: "ตารางคะแนนรายวิชาแบบ 2 มิติ", html: `<p>รับจำนวนนักศึกษา (แถว) และจำนวนวิชา (คอลัมน์) แล้วรับคะแนนลงอาเรย์ 2 มิติ จากนั้นแสดงตารางที่มี (1) คะแนนรวมและค่าเฉลี่ยของนักศึกษาแต่ละคน (2) ค่าเฉลี่ยของแต่ละวิชา และ (3) ลำดับที่ของนักศึกษาที่ได้คะแนนรวมสูงสุด</p>`,
      spec: ["ใช้ <code>int[][] scores = new int[rows][cols]</code>", "แต่ละแถวคำนวณ total ใหม่ (ประกาศในลูปนอก)", "ค่าเฉลี่ยวิชาใช้ลูปนอกเป็นคอลัมน์", "จัดคอลัมน์ด้วย printf"], stdin: "3 4\n70 80 65 90\n88 92 79 85\n60 55 72 68",
      solution: j`
        import java.util.Scanner;

        public class ScoreTable {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("students subjects: ");
                int rows = input.nextInt(), cols = input.nextInt();
                // ขนาดอาเรย์ 2 มิติจากผู้ใช้
                int[][] scores = new int[rows][cols];
                for (int r = 0; r < rows; r++) {
                    System.out.print("Student " + (r + 1) + ": ");
                    for (int c = 0; c < cols; c++) {
                        // อ่านคะแนนลงตาราง
                        scores[r][c] = input.nextInt();
                    }
                }
                int bestRow = 0, bestTotal = -1;
                for (int r = 0; r < rows; r++) {
                    int total = 0;  // ผลรวมของนักเรียนคนนี้
                    System.out.printf("S%-3d", r + 1);
                    for (int c = 0; c < cols; c++) {
                        System.out.printf("%5d", scores[r][c]);
                        total += scores[r][c];
                    }
                    System.out.printf(" | %4d %6.2f%n", total, (double) total / cols);
                    if (total > bestTotal) {  // จำแถวที่คะแนนรวมสูงสุด
                        bestTotal = total;
                        bestRow = r;
                    }
                }
                System.out.print("Avg ");
                // ค่าเฉลี่ยรายวิชา (ตามคอลัมน์)
                for (int c = 0; c < cols; c++) {
                    int sum = 0;
                    for (int r = 0; r < rows; r++) sum += scores[r][c];
                    System.out.printf("%5.1f", (double) sum / rows);
                }
                System.out.println();
                System.out.println("Top student: S" + (bestRow + 1) + " (" + bestTotal + ")");
            }
        }` },
    { level: 3, title: "รวมอาเรย์ที่เรียงแล้วสองชุด", html: `<p>เขียนเมธอด <code>static int[] merge(int[] a, int[] b)</code> ที่รับอาเรย์สองชุดที่<strong>เรียงจากน้อยไปมากแล้ว</strong> และคืนอาเรย์ใหม่ที่มีสมาชิกทั้งหมดเรียงจากน้อยไปมาก <strong>ห้ามใช้ Arrays.sort</strong> ให้ใช้ตัวชี้ (index) สองตัวเดินไปพร้อมกัน</p>`,
      spec: ["อาเรย์ผลลัพธ์ขนาด a.length + b.length", "เทียบ a[i] กับ b[j] ตัวที่น้อยกว่าใส่ผลลัพธ์ แล้วขยับตัวชี้นั้น", "เมื่ออาเรย์หนึ่งหมด ให้คัดลอกส่วนที่เหลือของอีกอาเรย์", "ทดสอบกรณีอาเรย์หนึ่งว่าง"],
      solution: j`
        import java.util.Arrays;

        public class MergeSorted {
            public static void main(String[] args) {
                int[] a = {1, 4, 7, 10};
                int[] b = {2, 3, 8, 12, 15};
                System.out.println(Arrays.toString(merge(a, b)));
                System.out.println(Arrays.toString(merge(new int[0], b)));
            }

            static int[] merge(int[] a, int[] b) {
                // ขนาดผลลัพธ์ = ผลรวมความยาว
                int[] result = new int[a.length + b.length];
                // i ชี้ใน a, j ชี้ใน b, k ชี้ใน result
                int i = 0, j = 0, k = 0;
                // ทั้งสองอาเรย์ยังมีค่าเหลือ
                while (i < a.length && j < b.length) {
                    // เลือกค่าที่น้อยกว่าก่อน
                    if (a[i] <= b[j]) {
                        result[k++] = a[i++];
                    } else {
                        result[k++] = b[j++];
                    }
                }
                // คัดลอกค่าที่เหลือของ a
                while (i < a.length) result[k++] = a[i++];
                // คัดลอกค่าที่เหลือของ b
                while (j < b.length) result[k++] = b[j++];
                return result;
            }
        }`, explain: "<code>result[k++] = a[i++];</code> คือใช้ค่า k และ i ปัจจุบันก่อน แล้วจึงเพิ่มทั้งคู่ทีละ 1" },
    { level: 3, title: "เกม Tic-Tac-Toe: ตรวจผู้ชนะ", html: `<p>กระดาน 3×3 เก็บใน <code>char[][] board</code> (ค่า 'X', 'O' หรือ '.') ให้ผู้ใช้ป้อนกระดาน 3 บรรทัด (บรรทัดละ 3 ตัวอักษร) แล้วเขียนเมธอด <code>static char winner(char[][] b)</code> คืน 'X' หรือ 'O' ถ้ามีผู้ชนะ (เรียงกัน 3 ตัวในแถว คอลัมน์ หรือทแยง) หรือ '-' ถ้ายังไม่มี จากนั้นแสดงกระดานและผล</p>`,
      spec: ["อ่านแต่ละบรรทัดด้วย <code>next()</code> แล้วใช้ <code>charAt(c)</code> เติมลงอาเรย์", "ตรวจ 3 แถว 3 คอลัมน์ด้วยลูป และทแยง 2 เส้น", "ช่องว่าง '.' ไม่นับเป็นผู้ชนะ", "ถ้าไม่มีผู้ชนะและไม่มี '.' เหลือ ให้แสดง Draw"], runs: ["XOX\nOXO\nOOX", "XOX\nXOO\nOXX", "XO.\n.X.\nO.."],
      solution: j`
        import java.util.Scanner;

        public class TicTacToe {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                char[][] board = new char[3][3];  // ตาราง 3×3
                for (int r = 0; r < 3; r++) {
                    System.out.print("Row " + r + ": ");
                    String line = input.next();
                    // แยกตัวอักษรแต่ละตัวลงช่อง
                    for (int c = 0; c < 3; c++) board[r][c] = line.charAt(c);
                }
                // for-each กับอาเรย์ 2 มิติ: ทีละแถว
                for (char[] row : board) {
                    System.out.println(" " + row[0] + " | " + row[1] + " | " + row[2]);
                }
                char w = winner(board);  // '-' หมายถึงยังไม่มีผู้ชนะ
                if (w != '-') System.out.println("Winner: " + w);
                else if (isFull(board)) System.out.println("Draw");
                else System.out.println("Game continues");
            }

            static char winner(char[][] b) {
                for (int i = 0; i < 3; i++) {
                    // แถวที่ i เหมือนกันทั้งแถว
                    if (b[i][0] != '.' && b[i][0] == b[i][1] && b[i][1] == b[i][2]) return b[i][0];
                    // คอลัมน์ที่ i
                    if (b[0][i] != '.' && b[0][i] == b[1][i] && b[1][i] == b[2][i]) return b[0][i];
                }
                // แนวทแยง ซ้ายบน → ขวาล่าง
                if (b[1][1] != '.' && b[0][0] == b[1][1] && b[1][1] == b[2][2]) return b[1][1];
                // แนวทแยง ขวาบน → ซ้ายล่าง
                if (b[1][1] != '.' && b[0][2] == b[1][1] && b[1][1] == b[2][0]) return b[1][1];
                return '-';
            }

            // มีช่องว่าง '.' เหลือ → ยังไม่เต็ม
            static boolean isFull(char[][] b) {
                for (char[] row : b)
                    for (char cell : row)
                        if (cell == '.') return false;
                return true;
            }
        }` },
  ],
};
