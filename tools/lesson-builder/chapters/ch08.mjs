import { j, c, pre, jpre } from "../lib.mjs";

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
