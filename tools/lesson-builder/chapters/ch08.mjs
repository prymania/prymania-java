import { j, c, pre } from "../lib.mjs";

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
        { type: "p", html: `ชนิดอาเรย์เขียนเป็น <code>ชนิดข้อมูล[]</code> สมาชิกตัวแรกอยู่ที่ <strong>index 0</strong> ไม่ใช่ 1 อาเรย์ที่สร้างแล้วมี<strong>ขนาดคงที่</strong> และตรวจจำนวนสมาชิกได้ด้วย <code>ชื่ออาเรย์.length</code> (ไม่มีวงเล็บ)` },
        { type: "concept", title: "Syntax: ประกาศ สร้าง และอ้างสมาชิก", html: pre(`
          int[] scores;                    // ① ประกาศตัวแปรอาเรย์ (ยังไม่มีช่อง)
          scores = new int[3];             // ② สร้างพื้นที่ 3 ช่อง ค่าเริ่มต้นเป็น 0
          scores[0] = 80;                  // ③ กำหนดค่าช่อง index 0
          int[] other = {80, 75, 92};      // ประกาศ + สร้าง + กำหนดค่าในบรรทัดเดียว

          index:     0    1    2
          other:  [ 80 | 75 | 92 ]     other.length = 3`) + `<p>ค่าเริ่มต้นเมื่อใช้ <code>new</code>: ตัวเลข → 0, double → 0.0, boolean → false, char → '\\u0000', String/ออบเจ็กต์ → null</p>` },
        { type: "run", title: "อ่านและแก้ค่าสมาชิก", level: "พื้นฐาน",
          concept: "ใช้ <code>ชื่อ[index]</code> เหมือนตัวแปรปกติ ทั้งอ่านและกำหนดค่า",
          code: j`
            public class ArrayBasics {
                public static void main(String[] args) {
                    int[] scores = {80, 75, 92, 88};
                    System.out.println("First: " + scores[0]);
                    System.out.println("Last: " + scores[3]);
                    System.out.println("Length: " + scores.length);

                    scores[1] = 100;
                    scores[2] += 5;
                    System.out.println("scores[1] = " + scores[1]);
                    System.out.println("scores[2] = " + scores[2]);
                    System.out.println("Last via length-1: " + scores[scores.length - 1]);
                }
            }`,
          steps: ["index 0 คือ 80, index 3 คือ 88", "length = 4 แต่ index สุดท้ายคือ 3", "แก้ช่อง 1 เป็น 100 และเพิ่มช่อง 2 อีก 5 → 97", "<code>scores[scores.length - 1]</code> เป็นวิธีอ้างตัวสุดท้ายที่ไม่ขึ้นกับขนาด"] },
        { type: "run", title: "สร้างด้วย new แล้วเติมค่าภายหลัง", level: "ต่อยอด",
          concept: "เมื่อรู้ขนาดแต่ยังไม่รู้ค่า ใช้ <code>new ชนิด[ขนาด]</code> แล้วค่อยกำหนดค่า ช่องที่ยังไม่กำหนดจะเป็นค่าเริ่มต้น",
          code: j`
            public class NewArray {
                public static void main(String[] args) {
                    double[] prices = new double[4];
                    String[] names = new String[3];
                    boolean[] done = new boolean[2];

                    prices[0] = 19.5;
                    prices[2] = 7.25;
                    names[0] = "Pen";

                    System.out.println(prices[0] + " " + prices[1] + " " + prices[2] + " " + prices[3]);
                    System.out.println(names[0] + " " + names[1]);
                    System.out.println(done[0]);
                }
            }`,
          steps: ["prices[1] และ prices[3] ยังไม่กำหนด → 0.0", "names[1] ยังไม่กำหนด → null", "boolean เริ่มต้นเป็น false"] },
        { type: "run", title: "รับค่าจากผู้ใช้ใส่อาเรย์", level: "ประยุกต์", stdin: "4\n29.5 31 30.2 28.8",
          concept: "ให้ผู้ใช้กำหนดขนาด แล้วใช้ลูปอ่านค่าลงแต่ละช่อง — รูปแบบนี้ใช้บ่อยที่สุด",
          code: j`
            import java.util.Scanner;

            public class ReadIntoArray {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("How many days? ");
                    int n = input.nextInt();
                    double[] temps = new double[n];
                    System.out.print("Temperatures: ");
                    for (int i = 0; i < temps.length; i++) {
                        temps[i] = input.nextDouble();
                    }
                    for (int i = 0; i < temps.length; i++) {
                        System.out.println("Day " + (i + 1) + ": " + temps[i]);
                    }
                }
            }`,
          steps: ["สร้างอาเรย์ขนาด n = 4", "ลูปแรกอ่านค่าใส่ index 0–3", "ลูปที่สองแสดงผล โดยแสดงเลขวันเป็น i + 1 ให้คนอ่านเริ่มนับที่ 1"] },
        { type: "run", label: "ทดลอง error 8.1.4", title: "index เกินขอบเขต", level: "ประยุกต์", expect: "runtime-error",
          concept: "โปรแกรมคอมไพล์ผ่าน แต่ตอนรันจะเกิด <code>ArrayIndexOutOfBoundsException</code> เมื่ออ่านช่องที่ไม่มี",
          code: j`
            public class OutOfBounds {
                public static void main(String[] args) {
                    int[] scores = {80, 75, 92};
                    for (int i = 0; i <= scores.length; i++) {
                        System.out.println(scores[i]);
                    }
                }
            }`,
          steps: ["พิมพ์ 80, 75, 92 ได้ปกติ", "เงื่อนไข <code>&lt;=</code> ทำให้ i = 3 เข้าลูปด้วย", "<code>Index 3 out of bounds for length 3</code> บอกทั้ง index ที่ผิดและขนาดจริง", "แก้: ใช้ <code>i &lt; scores.length</code>"] },
        { type: "check", title: "trace อาเรย์", html: pre(`
          int[] a = {5, 10, 15, 20};
          a[0] = a[3] - a[1];
          a[2] = a[a.length - 2] / 5;`) + `<p>อาเรย์ a มีค่าอะไรบ้าง</p>`, answer: `<p>a[0] = 20 − 10 = 10, a[2] = a[2] / 5 = 15 / 5 = 3 → <strong>{10, 10, 3, 20}</strong></p>` },
      ],
    },
    {
      num: "8.2", toc: "วนอ่าน รวม และค้นหา", title: "วนอ่าน รวม และค้นหาสมาชิก",
      blocks: [
        { type: "p", html: `ใช้ลูป <code>for</code> ตั้งแต่ index 0 ถึง <code>length - 1</code> ถ้าต้องการแค่<em>ค่า</em>และไม่ต้องใช้ index ให้ใช้ <strong>enhanced for (for-each)</strong>: <code>for (int s : scores)</code> อ่านว่า “สำหรับ s แต่ละตัวใน scores”` },
        { type: "run", title: "for ปกติ vs for-each", level: "พื้นฐาน",
          concept: "for-each อ่านง่ายกว่าเมื่อไม่ต้องใช้ index แต่แก้ค่าในอาเรย์ไม่ได้และไม่รู้ตำแหน่ง",
          code: j`
            public class TwoLoops {
                public static void main(String[] args) {
                    String[] fruits = {"Apple", "Banana", "Cherry"};
                    for (int i = 0; i < fruits.length; i++) {
                        System.out.println(i + ": " + fruits[i]);
                    }
                    for (String f : fruits) {
                        System.out.println("I like " + f);
                    }
                }
            }`,
          steps: ["for ปกติรู้ทั้ง index และค่า", "for-each ได้ค่าทีละตัวในตัวแปร f"] },
        { type: "run", title: "ผลรวม ค่าเฉลี่ย และนับตามเงื่อนไข", level: "ต่อยอด",
          concept: "รวม (accumulate) และนับ (count) เป็นสองรูปแบบพื้นฐานที่ใช้กับอาเรย์เกือบทุกโจทย์",
          code: j`
            public class SumAndCount {
                public static void main(String[] args) {
                    int[] scores = {72, 45, 88, 91, 50, 39, 67};
                    int sum = 0;
                    int passed = 0;
                    for (int s : scores) {
                        sum += s;
                        if (s >= 50) {
                            passed++;
                        }
                    }
                    double average = (double) sum / scores.length;
                    System.out.println("Sum = " + sum);
                    System.out.printf("Average = %.2f%n", average);
                    System.out.println("Passed = " + passed + " / " + scores.length);
                }
            }`,
          steps: ["sum สะสมทุกค่า = 452", "passed นับเฉพาะค่าที่ ≥ 50 = 5", "หารด้วย length ไม่ใช่เลขตายตัว — ถ้าอาเรย์เปลี่ยนขนาดโค้ดยังถูก"] },
        { type: "run", title: "หาค่ามากสุด น้อยสุด และตำแหน่ง", level: "ต่อยอด",
          concept: "เริ่มจากสมาชิกตัวแรก แล้วเทียบกับตัวที่เหลือ เก็บทั้ง<em>ค่า</em>และ <em>index</em> ที่พบ",
          code: j`
            public class FindMax {
                public static void main(String[] args) {
                    double[] sales = {1200.5, 980.0, 1530.25, 760.0, 1490.0};
                    int maxIndex = 0;
                    int minIndex = 0;
                    for (int i = 1; i < sales.length; i++) {
                        if (sales[i] > sales[maxIndex]) maxIndex = i;
                        if (sales[i] < sales[minIndex]) minIndex = i;
                    }
                    System.out.println("Best day: " + (maxIndex + 1) + " (" + sales[maxIndex] + ")");
                    System.out.println("Worst day: " + (minIndex + 1) + " (" + sales[minIndex] + ")");
                }
            }`,
          steps: ["สมมติ index 0 เป็นทั้ง max และ min", "เริ่มเทียบที่ i = 1", "เก็บ index แทนค่า ทำให้รู้ทั้งตำแหน่งและค่า (sales[maxIndex])"] },
        { type: "run", title: "ค้นหาแบบเชิงเส้น (linear search)", level: "ประยุกต์", stdin: "Nida",
          concept: "ไล่ตรวจทีละตัวจนเจอ ถ้าไม่เจอให้ใช้ค่าพิเศษ เช่น −1 แทนตำแหน่ง",
          code: j`
            import java.util.Scanner;

            public class LinearSearch {
                public static void main(String[] args) {
                    String[] students = {"Mali", "Beam", "Nida", "Ploy", "Tan"};
                    Scanner input = new Scanner(System.in);
                    System.out.print("Search name: ");
                    String target = input.next();

                    int found = -1;
                    for (int i = 0; i < students.length; i++) {
                        if (students[i].equalsIgnoreCase(target)) {
                            found = i;
                            break;
                        }
                    }
                    if (found >= 0) {
                        System.out.println(target + " is at index " + found);
                    } else {
                        System.out.println(target + " not found");
                    }
                }
            }`,
          steps: ["found = −1 หมายถึง “ยังไม่เจอ”", "เทียบ String ด้วย equalsIgnoreCase", "เจอที่ index 2 → break ไม่ต้องหาต่อ", "หลังลูปตรวจ found เพื่อเลือกข้อความ"] },
        { type: "run", title: "กับดัก: = ไม่ได้คัดลอกอาเรย์", level: "ท้าทาย",
          concept: "ตัวแปรอาเรย์เก็บ<strong>การอ้างอิง (reference)</strong> ไปยังข้อมูล <code>b = a</code> ทำให้สองชื่อชี้ข้อมูลชุดเดียวกัน ถ้าต้องการสำเนาจริงใช้ <code>a.clone()</code> หรือ <code>Arrays.copyOf</code>",
          code: j`
            import java.util.Arrays;

            public class ArrayReference {
                public static void main(String[] args) {
                    int[] a = {1, 2, 3};
                    int[] b = a;
                    int[] c = a.clone();
                    b[0] = 99;
                    System.out.println("a = " + Arrays.toString(a));
                    System.out.println("b = " + Arrays.toString(b));
                    System.out.println("c = " + Arrays.toString(c));
                    System.out.println("a == b ? " + (a == b));
                    System.out.println("a == c ? " + (a == c));
                    System.out.println("Arrays.equals(a, c) ? " + Arrays.equals(a, c));
                }
            }`,
          steps: ["b = a → ชี้ข้อมูลเดียวกัน แก้ b[0] จึงเห็นใน a ด้วย", "c เป็นสำเนา ไม่ได้รับผลกระทบ", "<code>Arrays.toString</code> แสดงอาเรย์ทั้งชุด (ถ้า println(a) ตรง ๆ จะได้ข้อความแปลก ๆ เช่น [I@1b6d3586)", "<code>==</code> เทียบว่าเป็นชุดเดียวกันไหม, <code>Arrays.equals</code> เทียบเนื้อหา"] },
        { type: "check", title: "นับ", html: pre(`
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
        { type: "p", html: `อาเรย์สองมิติเก็บข้อมูลแบบ<strong>ตาราง</strong> (แถว × คอลัมน์) เช่น คะแนนนักศึกษาหลายคน หลายวิชา อ้างสมาชิกด้วย <code>ชื่อ[แถว][คอลัมน์]</code> จริง ๆ แล้วเป็น “อาเรย์ของอาเรย์”: <code>grid.length</code> คือจำนวนแถว และ <code>grid[r].length</code> คือจำนวนคอลัมน์ของแถว r` },
        { type: "concept", title: "ภาพของอาเรย์ 2 มิติ", html: pre(`
          int[][] scores = {
              {80, 75, 90},     // แถว 0 (นักศึกษาคนที่ 1)
              {60, 85, 70}      // แถว 1 (นักศึกษาคนที่ 2)
          };
                      col 0  col 1  col 2
          row 0   [   80  |  75  |  90  ]
          row 1   [   60  |  85  |  70  ]

          scores[1][2] = 70     scores.length = 2     scores[0].length = 3`) },
        { type: "run", title: "อ่านทั้งตารางด้วยลูปซ้อน", level: "พื้นฐาน",
          concept: "ลูปนอกวนแถว ลูปในวนคอลัมน์ — เหมือนการพิมพ์รูปทรงในบทที่ 6",
          code: j`
            public class Grid2D {
                public static void main(String[] args) {
                    int[][] scores = {
                        {80, 75, 90},
                        {60, 85, 70}
                    };
                    System.out.println("rows = " + scores.length + ", cols = " + scores[0].length);
                    System.out.println("scores[1][2] = " + scores[1][2]);
                    for (int r = 0; r < scores.length; r++) {
                        for (int c = 0; c < scores[r].length; c++) {
                            System.out.printf("%4d", scores[r][c]);
                        }
                        System.out.println();
                    }
                }
            }`,
          steps: ["scores.length = 2 แถว", "scores[0].length = 3 คอลัมน์", "ลูปซ้อนพิมพ์ทีละแถว"] },
        { type: "run", title: "ผลรวมแต่ละแถวและแต่ละคอลัมน์", level: "ต่อยอด",
          concept: "ผลรวมแถว: ลูปนอกคือแถว ผลรวมรีเซ็ตทุกแถว / ผลรวมคอลัมน์: สลับให้ลูปนอกเป็นคอลัมน์",
          code: j`
            public class RowColSums {
                public static void main(String[] args) {
                    String[] students = {"Mali", "Beam", "Nida"};
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
                        int rowSum = 0;
                        System.out.printf("%-6s", students[r]);
                        for (int c = 0; c < s[r].length; c++) {
                            System.out.printf("%6d", s[r][c]);
                            rowSum += s[r][c];
                        }
                        System.out.printf("%7d%n", rowSum);
                    }
                    System.out.printf("%-6s", "Avg");
                    for (int c = 0; c < subjects.length; c++) {
                        int colSum = 0;
                        for (int r = 0; r < s.length; r++) {
                            colSum += s[r][c];
                        }
                        System.out.printf("%6.1f", (double) colSum / s.length);
                    }
                    System.out.println();
                }
            }`,
          steps: ["อาเรย์ 1 มิติ students, subjects ใช้เป็นหัวแถว/หัวคอลัมน์ที่ index ตรงกับตาราง", "rowSum ประกาศ<em>ใน</em>ลูปนอก จึงเริ่มที่ 0 ทุกแถว", "ค่าเฉลี่ยคอลัมน์: ลูปนอกวน c ลูปในวน r"] },
        { type: "run", title: "ที่นั่งโรงภาพยนตร์: แก้ไขค่าในตาราง", level: "ประยุกต์", stdin: "1 2\n0 0\n1 2",
          concept: "ใช้ boolean[][] เก็บสถานะที่นั่ง จองแล้วเปลี่ยนเป็น true และตรวจว่าว่างก่อนจอง",
          code: j`
            import java.util.Scanner;

            public class SeatBooking {
                public static void main(String[] args) {
                    boolean[][] booked = new boolean[3][4];
                    Scanner input = new Scanner(System.in);
                    for (int k = 0; k < 3; k++) {
                        System.out.print("Book row col: ");
                        int r = input.nextInt(), c = input.nextInt();
                        if (booked[r][c]) {
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
          steps: ["new boolean[3][4] → 3 แถว 4 คอลัมน์ ทุกช่องเป็น false", "จอง (1,2) และ (0,0) สำเร็จ", "จอง (1,2) ซ้ำ → พบว่าเป็น true แล้ว", "แสดงผัง X = จองแล้ว"] },
        { type: "check", title: "index 2 มิติ", html: pre(`
          int[][] m = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
          int sum = 0;
          for (int i = 0; i < m.length; i++) sum += m[i][i];`), answer: `<p>บวกเส้นทแยงมุม m[0][0] + m[1][1] + m[2][2] = 1 + 5 + 9 = <strong>15</strong></p>` },
      ],
    },
    {
      num: "8.4", toc: "อาเรย์กับเมธอด", title: "อาเรย์กับเมธอด และคลาส Arrays",
      blocks: [
        { type: "p", html: `อาเรย์ส่งเป็น argument และคืนจากเมธอดได้ เนื่องจากส่ง<strong>การอ้างอิง</strong> เมธอดที่แก้สมาชิกในอาเรย์จะทำให้ผู้เรียกเห็นการเปลี่ยนแปลงด้วย (ต่างจากตัวแปร int ในบทที่ 7) คลาส <code>java.util.Arrays</code> มีเมธอดสำเร็จรูป เช่น <code>toString</code>, <code>sort</code>, <code>fill</code>, <code>copyOf</code>` },
        { type: "run", title: "เมธอดรับอาเรย์และคืนค่า", level: "ต่อยอด",
          concept: "เขียนเมธอดที่ใช้ซ้ำได้กับอาเรย์ทุกขนาด เพราะใช้ <code>.length</code> แทนเลขตายตัว",
          code: j`
            public class ArrayMethods {
                public static void main(String[] args) {
                    int[] a = {4, 9, 1, 7};
                    int[] b = {10, 20};
                    System.out.println("sum(a) = " + sum(a) + ", max(a) = " + max(a));
                    System.out.println("sum(b) = " + sum(b) + ", max(b) = " + max(b));
                    doubleAll(b);
                    System.out.println("after doubleAll: b[0]=" + b[0] + ", b[1]=" + b[1]);
                }

                static int sum(int[] values) {
                    int total = 0;
                    for (int v : values) total += v;
                    return total;
                }

                static int max(int[] values) {
                    int best = values[0];
                    for (int v : values) if (v > best) best = v;
                    return best;
                }

                static void doubleAll(int[] values) {
                    for (int i = 0; i < values.length; i++) {
                        values[i] *= 2;
                    }
                }
            }`,
          steps: ["sum และ max ใช้ได้กับอาเรย์ทุกขนาด", "doubleAll แก้สมาชิกผ่านการอ้างอิง → b ใน main เปลี่ยนจริง", "doubleAll ต้องใช้ for ปกติ เพราะ for-each แก้ค่าในอาเรย์ไม่ได้"] },
        { type: "run", title: "Arrays.sort, toString, fill, copyOf", level: "ประยุกต์",
          concept: "ไม่ต้องเขียนการเรียงลำดับเองในงานทั่วไป — แต่ควรเข้าใจว่าเรียงแล้วอาเรย์เดิมถูกเปลี่ยน",
          code: j`
            import java.util.Arrays;

            public class ArraysUtility {
                public static void main(String[] args) {
                    int[] nums = {42, 7, 19, 3, 25};
                    int[] backup = Arrays.copyOf(nums, nums.length);
                    Arrays.sort(nums);
                    System.out.println("sorted : " + Arrays.toString(nums));
                    System.out.println("backup : " + Arrays.toString(backup));
                    System.out.println("median : " + nums[nums.length / 2]);

                    String[] names = {"Ploy", "Beam", "Mali"};
                    Arrays.sort(names);
                    System.out.println("names  : " + Arrays.toString(names));

                    int[] zeros = new int[5];
                    Arrays.fill(zeros, 7);
                    System.out.println("filled : " + Arrays.toString(zeros));
                    int[] bigger = Arrays.copyOf(backup, 7);
                    System.out.println("bigger : " + Arrays.toString(bigger));
                }
            }`,
          steps: ["copyOf ทำสำเนาก่อน sort เพื่อเก็บลำดับเดิม", "sort เรียงจากน้อยไปมาก (String เรียงตามตัวอักษร)", "หลังเรียง ค่ากลาง (median) อยู่ที่ index length/2", "copyOf ที่ขนาดใหญ่กว่าเดิมเติม 0 ให้ช่องใหม่"] },
        { type: "run", title: "เรียงลำดับเองด้วย Bubble Sort", level: "ท้าทาย",
          concept: "สลับคู่ที่ติดกันซึ่งเรียงผิด ทำซ้ำหลายรอบ ค่าที่มากที่สุดจะ “ลอย” ไปท้ายทีละตัว",
          code: j`
            import java.util.Arrays;

            public class BubbleSort {
                public static void main(String[] args) {
                    int[] a = {5, 2, 9, 1, 6};
                    System.out.println("start  " + Arrays.toString(a));
                    for (int pass = 0; pass < a.length - 1; pass++) {
                        for (int i = 0; i < a.length - 1 - pass; i++) {
                            if (a[i] > a[i + 1]) {
                                int temp = a[i];
                                a[i] = a[i + 1];
                                a[i + 1] = temp;
                            }
                        }
                        System.out.println("pass " + (pass + 1) + " " + Arrays.toString(a));
                    }
                }
            }`,
          steps: ["แต่ละ pass เทียบคู่ (i, i+1) และสลับถ้าเรียงผิด — ใช้เทคนิค temp จากบทที่ 3", "หลัง pass 1 ค่า 9 ไปอยู่ท้ายสุดแล้ว", "จึงลดขอบเขตลูปในลง pass ละ 1 (<code>- pass</code>)", "n ค่าใช้ไม่เกิน n − 1 pass"] },
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
                System.out.println("Day 2: " + temps[1]);
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
                for (int i = 0; i < values.length; i++) {
                    System.out.println("[" + i + "] = " + values[i]);
                }
                for (int v : values) {
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
                int[] scores = new int[n];
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) {
                    scores[i] = input.nextInt();
                }
                int sum = 0;
                for (int s : scores) sum += s;
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
                    scores[i] = input.nextInt();
                    sum += scores[i];
                }
                double avg = (double) sum / n;
                System.out.printf("Average = %.2f%n", avg);
                int count = 0;
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
                String[] items = {"Pen", "Pencil", "Eraser", "Ruler", "Notebook"};
                double[] prices = {12, 6, 8.5, 15, 35};
                Scanner input = new Scanner(System.in);
                System.out.print("Item: ");
                String name = input.next();
                System.out.print("Qty: ");
                int qty = input.nextInt();
                int found = -1;
                for (int i = 0; i < items.length; i++) {
                    if (items[i].equalsIgnoreCase(name)) {
                        found = i;
                        break;
                    }
                }
                if (found == -1) {
                    System.out.println("Item not found");
                } else {
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
                for (int i = 0; i < a.length / 2; i++) {
                    int j = a.length - 1 - i;
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
                int[] freq = new int[11];
                System.out.print("Scores: ");
                for (int i = 0; i < n; i++) {
                    int score = input.nextInt();
                    freq[score]++;
                }
                for (int s = 0; s <= 10; s++) {
                    if (freq[s] > 0) {
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
                int[][] scores = new int[rows][cols];
                for (int r = 0; r < rows; r++) {
                    System.out.print("Student " + (r + 1) + ": ");
                    for (int c = 0; c < cols; c++) {
                        scores[r][c] = input.nextInt();
                    }
                }
                int bestRow = 0, bestTotal = -1;
                for (int r = 0; r < rows; r++) {
                    int total = 0;
                    System.out.printf("S%-3d", r + 1);
                    for (int c = 0; c < cols; c++) {
                        System.out.printf("%5d", scores[r][c]);
                        total += scores[r][c];
                    }
                    System.out.printf(" | %4d %6.2f%n", total, (double) total / cols);
                    if (total > bestTotal) {
                        bestTotal = total;
                        bestRow = r;
                    }
                }
                System.out.print("Avg ");
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
                int[] result = new int[a.length + b.length];
                int i = 0, j = 0, k = 0;
                while (i < a.length && j < b.length) {
                    if (a[i] <= b[j]) {
                        result[k++] = a[i++];
                    } else {
                        result[k++] = b[j++];
                    }
                }
                while (i < a.length) result[k++] = a[i++];
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
                char[][] board = new char[3][3];
                for (int r = 0; r < 3; r++) {
                    System.out.print("Row " + r + ": ");
                    String line = input.next();
                    for (int c = 0; c < 3; c++) board[r][c] = line.charAt(c);
                }
                for (char[] row : board) {
                    System.out.println(" " + row[0] + " | " + row[1] + " | " + row[2]);
                }
                char w = winner(board);
                if (w != '-') System.out.println("Winner: " + w);
                else if (isFull(board)) System.out.println("Draw");
                else System.out.println("Game continues");
            }

            static char winner(char[][] b) {
                for (int i = 0; i < 3; i++) {
                    if (b[i][0] != '.' && b[i][0] == b[i][1] && b[i][1] == b[i][2]) return b[i][0];
                    if (b[0][i] != '.' && b[0][i] == b[1][i] && b[1][i] == b[2][i]) return b[0][i];
                }
                if (b[1][1] != '.' && b[0][0] == b[1][1] && b[1][1] == b[2][2]) return b[1][1];
                if (b[1][1] != '.' && b[0][2] == b[1][1] && b[1][1] == b[2][0]) return b[1][1];
                return '-';
            }

            static boolean isFull(char[][] b) {
                for (char[] row : b)
                    for (char cell : row)
                        if (cell == '.') return false;
                return true;
            }
        }` },
  ],
};
