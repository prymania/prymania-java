import { j, c, pre, jpre, flowchart } from "../lib.mjs";

export default {
  num: 6, file: "chapter-06.html",
  pageTitle: "บทที่ 6: การทำซ้ำด้วยลูป", shortName: "บทที่ 6",
  tocLabel: "บทที่ 6 · ทำงานซ้ำอย่างมีจุดจบ", sidebarBottom: "ทุกลูปต้องมีเงื่อนไขที่ไปถึงจุดหยุดได้",
  kicker: "บทที่ 6 · ให้โปรแกรมทำงานซ้ำ", h1: "การทำซ้ำด้วยลูป",
  lead: "ลดคำสั่งที่ต้องเขียนซ้ำ โดยกำหนดว่าจะทำซ้ำเมื่อใด ต้องปรับค่าอะไร และจะออกจากลูปอย่างไร",
  goals: ["เขียน while และ for ได้ครบองค์ประกอบ", "เลือก do-while เมื่อต้องทำอย่างน้อยหนึ่งครั้ง", "ใช้ลูปซ้อนกับรูปแบบข้อมูล", "ควบคุมและป้องกันลูปไม่รู้จบ"],
  prev: { href: "chapter-05.html", label: "← บทที่ 5" },
  next: { href: "chapter-07.html", label: "บทที่ 7: เมธอด →" },
  footer: "บทที่ 6 · ทำนายจำนวนรอบก่อนรันทุกครั้ง",
  introHeading: "6. ทำซ้ำโดยไม่เขียนคำสั่งเดิมหลายชุด",
  introHtml: `<p>สมมติต้องพิมพ์คะแนนของนักศึกษา 100 คน ถ้าไม่มีลูปเราต้องเขียนคำสั่งซ้ำ 100 ชุด ซึ่งยาว แก้ยาก และพลาดได้ง่าย ลูปช่วยให้เขียนขั้นตอนครั้งเดียวแล้วให้โปรแกรมทำซ้ำตามเงื่อนไข</p>
<div class="concept-box"><span class="box-title">องค์ประกอบ 4 อย่างของลูปที่ดี</span><ol class="step-list"><li><strong>ค่าเริ่มต้น (initialization)</strong> — ตัวนับหรือตัวแปรควบคุมเริ่มที่ค่าใด</li><li><strong>เงื่อนไข (condition)</strong> — ทำต่อขณะที่อะไรเป็นจริง</li><li><strong>งานที่ทำซ้ำ (body)</strong> — สิ่งที่ทำในแต่ละรอบ</li><li><strong>การอัปเดต (update)</strong> — เปลี่ยนค่าที่ทำให้เงื่อนไขเข้าใกล้ false ถ้าขาดข้อนี้จะเกิดลูปไม่รู้จบ</li></ol></div>`,
  topics: [
    {
      num: "6.1", toc: "while และการอัปเดตค่า", title: "while: ทำซ้ำขณะเงื่อนไขเป็นจริง",
      blocks: [
        { type: "p", html: `<code>while</code> ตรวจเงื่อนไข<strong>ก่อน</strong>เข้าทุกรอบ ถ้าจริงทำ body แล้วกลับไปตรวจใหม่ ถ้าเท็จออกจากลูป เหมาะเมื่อยังไม่รู้จำนวนรอบแน่นอน` },
        { type: "html", html: jpre(`
          while (condition) {
              // คำสั่งที่ทำซ้ำ
              // เปลี่ยนค่าที่มีผลต่อ condition
          }`) },
        { type: "html", html: flowchart({ rowH: 90, caption: "while ตรวจเงื่อนไขก่อน ทำ body แล้ววนกลับไปตรวจใหม่", nodes: {
          start: ["terminal", "เริ่มต้น", 1, 0],
          init: ["process", "number = 1", 1, 1],
          check: ["decision", "number ≤ 5 ?", 1, 2],
          show: ["io", "แสดง number", 1, 3],
          update: ["process", "number++", 1, 4],
          after: ["io", "แสดง After loop", 2.25, 2],
          end: ["terminal", "จบ", 2.25, 3],
        }, edges: [
          ["start", "init"], ["init", "check"],
          ["check", "show", { label: "ใช่" }], ["show", "update"],
          ["update", "check", { out: "left", in: "left", via: [[0.35, 4], [0.35, 2]] }],
          ["check", "after", { out: "right", in: "left", label: "ไม่ใช่" }], ["after", "end"],
        ] }) },
        { type: "run", title: "นับ 1 ถึง 5",
          code: j`
            public class CountUp {
                public static void main(String[] args) {
                    int number = 1;                    // ค่าเริ่มต้น
                    while (number <= 5) {              // ตรวจก่อนเข้าทุกรอบ
                        System.out.println(number);
                        number++;                      // อัปเดต: ขาดบรรทัดนี้จะวนไม่รู้จบ
                    }
                    System.out.println("After loop: number = " + number);   // 6 ไม่ใช่ 5
                }
            }`,
          },
        { type: "tip", title: "ลูปที่ดีมี 4 ส่วน", html: `ค่าเริ่มต้น → เงื่อนไข → งานที่ทำซ้ำ → การอัปเดตที่ทำให้เงื่อนไขเข้าใกล้ false ถ้าเงื่อนไขเป็น false ตั้งแต่แรก body จะไม่ทำเลยสักรอบ` },

        { type: "h", text: "สะสมผลรวม (accumulator)" },
        { type: "p", html: `รูปแบบที่ใช้บ่อยที่สุด: ตัวแปรผลรวมเริ่มที่ 0 ก่อนลูป แล้วบวกค่าของแต่ละรอบเข้าไป` },
        { type: "run", title: "1 + 2 + ... + 5",
          code: j`
            public class SumToN {
                public static void main(String[] args) {
                    int n = 5;
                    int number = 1;
                    int sum = 0;                                       // เริ่มที่ 0
                    while (number <= n) {
                        sum += number;                                 // 1, 3, 6, 10, 15
                        System.out.println("add " + number + " -> sum = " + sum);
                        number++;
                    }
                    System.out.println("1 + ... + " + n + " = " + sum);
                }
            }`,
          },
        { type: "tip", html: `พิมพ์ค่าระหว่างทางแบบตัวอย่างนี้ช่วยให้เห็นว่าลูปทำงานถูกไหม เป็นเทคนิค debug ที่ง่ายที่สุด` },

        { type: "h", text: "ไม่รู้จำนวนรอบล่วงหน้า" },
        { type: "p", html: `หาร 10 ไปเรื่อย ๆ จนเหลือ 0 จำนวนรอบขึ้นกับจำนวนหลักของข้อมูล งานแบบนี้ while เหมาะที่สุด` },
        { type: "run", title: "นับหลักและรวมหลักของตัวเลข", stdin: "907215",
          code: j`
            import java.util.Scanner;

            public class CountDigits {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Number: ");
                    int n = input.nextInt();
                    int digits = 0, digitSum = 0;
                    int temp = n;                       // ใช้สำเนา เก็บ n ไว้แสดงผล
                    while (temp > 0) {
                        digitSum += temp % 10;          // หลักขวาสุด: 5, 1, 2, 7, 0, 9
                        temp /= 10;                     // ตัดหลักขวาสุดทิ้ง
                        digits++;
                    }
                    System.out.println(n + " has " + digits + " digits, digit sum = " + digitSum);
                }
            }`,
          },
        { type: "warn", title: "ลูปไม่รู้จบ", html: jpre(`
          int i = 3;
          while (i > 0) {
              System.out.println(i);
              i++;       // ผิดทิศ: 3, 4, 5, ... เงื่อนไข true ตลอด
          }`) + `<p>คอมไพล์ผ่านแต่ไม่จบ (ถ้าเผลอรันให้กดปุ่ม Stop ■) ป้องกันโดย trace 3 รอบแรกด้วยมือ และตรวจว่าค่าเคลื่อนเข้าหาเงื่อนไขหยุด</p>` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: while (true) กับ break และ error ที่พบบ่อย", blocks: [
          { type: "p", html: `บางครั้งเขียนลูปที่ไม่หยุดเอง แล้วใช้ <code>break</code> ออกเมื่อถึงเงื่อนไข ต้องแน่ใจว่า break ไปถึงได้จริง` },
          { type: "run", title: "while (true) กับ break",
            code: j`
              public class WhileTrueBreak {
                  public static void main(String[] args) {
                      int attempt = 1;
                      while (true) {
                          System.out.println("Attempt " + attempt);
                          if (attempt >= 3) {
                              break;                  // ออกจากลูปทันที
                          }
                          attempt++;
                      }
                      System.out.println("Stopped safely");
                  }
              }`,
            },
          { type: "run", label: "ทดลอง error 6.1.6", title: "assignment ไม่ใช่เงื่อนไข", expect: "compile-error",
            code: j`
              public class WhileConditionError {
                  public static void main(String[] args) {
                      int i = 3;
                      while (i = 3) {
                          System.out.println(i);
                          i--;
                      }
                  }
              }`,
            after: "<code>i = 3</code> เป็นการใส่ค่า ไม่ใช่เงื่อนไข ในกรณีนี้ควรเขียน <code>i &gt; 0</code>" },
        ] },
        { type: "practice", level: 2, title: "ลำดับ Collatz",
          html: `<p>รับจำนวนเต็มบวก n แล้วทำซ้ำจนกว่า n จะเป็น 1: ถ้า n เป็นเลขคู่ให้ n = n / 2 ถ้าเป็นเลขคี่ให้ n = 3n + 1 แสดงทุกค่าในบรรทัดเดียว และบอกว่าใช้กี่ขั้น ไม่มีใครรู้ล่วงหน้าว่าจะวนกี่รอบ</p>`,
          spec: ["ใช้ while ที่มีเงื่อนไข <code>n != 1</code>", "พิมพ์ค่าเริ่มต้นก่อนเข้าลูป แล้วพิมพ์ค่าใหม่ทุกครั้งที่เปลี่ยน", "นับจำนวนขั้นด้วยตัวแปรสะสม"],
          runs: ["6", "7", "1"],
          hint: "คำใบ้: ใช้ n % 2 == 0 ตรวจเลขคู่ และถ้าป้อน 1 ลูปจะไม่ทำงานเลย ได้ Steps: 0",
          solution: j`
            import java.util.Scanner;

            public class Collatz {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("n = ");
                    int n = input.nextInt();
                    int steps = 0;

                    System.out.print(n);                      // ค่าเริ่มต้น
                    while (n != 1) {
                        if (n % 2 == 0) {
                            n = n / 2;
                        } else {
                            n = 3 * n + 1;
                        }
                        System.out.print(" " + n);
                        steps++;
                    }
                    System.out.println();
                    System.out.println("Steps: " + steps);
                }
            }`,
          explain: "นี่คือกรณีที่ while เหมาะกว่า for เพราะจำนวนรอบขึ้นกับค่าที่เปลี่ยนในลูป ตัวแปรในเงื่อนไข (n) ต้องถูกแก้ทุกรอบ ลูปจึงมีโอกาสจบ" },
        { type: "check", title: "นับรอบ", html: jpre(`
          int x = 20;
          int rounds = 0;
          while (x > 1) {
              x = x / 2;
              rounds++;
          }`) + `<p>เมื่อจบลูป x และ rounds มีค่าเท่าไร</p>`, answer: `<p>x: 20 → 10 → 5 → 2 → 1 → หยุด ดังนั้น <strong>x = 1, rounds = 4</strong></p>` },
      ],
    },
    {
      num: "6.2", toc: "for เมื่อรู้จำนวนรอบ", title: "for: เมื่อรู้จำนวนรอบหรือตัวนับชัดเจน",
      blocks: [
        { type: "p", html: `<code>for</code> รวมค่าเริ่ม เงื่อนไข และการอัปเดตไว้ในบรรทัดเดียว อ่านแล้วรู้จำนวนรอบทันที` },
        { type: "html", html: jpre(`
          for (int i = 1; i <= 3; i++) {    // ค่าเริ่ม ; เงื่อนไข ; อัปเดต
              // loop body
          }`) },
        { type: "html", html: flowchart({ rowH: 90, caption: "for รวม 4 ส่วนนี้ไว้ในบรรทัดเดียว: ค่าเริ่มทำครั้งเดียว ส่วนอัปเดตทำท้ายทุกรอบ", nodes: {
          start: ["terminal", "เริ่มต้น", 1, 0],
          sum: ["process", "sum = 0", 1, 1],
          init: ["process", "ค่าเริ่ม: int i = 1", 1, 2],
          check: ["decision", "เงื่อนไข: i <= 3 ?", 1, 3, 190],
          body: ["process", "body: sum += i, แสดง", 1, 4, 196],
          update: ["process", "อัปเดต: i++", 1, 5],
          after: ["io", "แสดง sum", 2.25, 3],
          end: ["terminal", "จบ", 2.25, 4],
        }, edges: [
          ["start", "sum"], ["sum", "init"], ["init", "check"],
          ["check", "body", { label: "ใช่" }], ["body", "update"],
          ["update", "check", { out: "left", in: "left", via: [[0.33, 5], [0.33, 3]] }],
          ["check", "after", { out: "right", in: "left", label: "ไม่ใช่" }], ["after", "end"],
        ] }) },
        { type: "run", title: "ทำนายรอบก่อนรัน",
          code: j`
            public class ForFlow {
                public static void main(String[] args) {
                    int sum = 0;
                    for (int i = 1; i <= 3; i++) {             // i = 1, 2, 3 แล้วออกเมื่อ i = 4
                        sum += i;
                        System.out.println("i=" + i + ", sum=" + sum);
                    }
                    System.out.println("After loop, sum=" + sum);   // ใช้ i ตรงนี้ไม่ได้ (ประกาศใน for)
                }
            }`,
          },
        { type: "table", head: ["ส่วน update", "ค่าของตัวนับ"], rows: [
          ["<code>i++</code>", "1, 2, 3, ..."],
          ["<code>i += 2</code>", "2, 4, 6, 8, 10"],
          ["<code>i--</code>", "5, 4, 3, 2, 1 (นับถอยหลัง)"],
          ["<code>p *= 2</code>", "1, 2, 4, 8, ..."],
        ] },
        { type: "run", title: "ขยับทีละมากกว่า 1 และนับถอยหลัง",
          code: j`
            public class ForSteps {
                public static void main(String[] args) {
                    for (int i = 2; i <= 10; i += 2) System.out.print(i + " ");     // 2 4 6 8 10
                    System.out.println();
                    for (int i = 5; i >= 1; i--) System.out.print(i + " ");         // 5 4 3 2 1
                    System.out.println("Go!");
                    for (int p = 1; p <= 100; p *= 2) System.out.print(p + " ");    // 1 2 4 ... 64
                    System.out.println();
                }
            }`,
          },

        { type: "h", text: "ใช้ for กับข้อมูล n ค่า" },
        { type: "p", html: `รู้จำนวนข้อมูลล่วงหน้า จึงวนด้วย for ได้ และใช้รูปแบบ “ติดตามค่าที่ดีที่สุด”: ตั้งค่าเริ่มจากข้อมูลตัวแรก แล้วเทียบกับตัวถัดไปทีละตัว` },
        { type: "run", title: "ค่ามาก น้อย และค่าเฉลี่ย", stdin: "5\n72 88 65 91 79",
          code: j`
            import java.util.Scanner;

            public class MinMaxAverage {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("How many scores? ");
                    int n = input.nextInt();
                    System.out.print("Scores: ");
                    int first = input.nextInt();
                    int max = first, min = first, sum = first;       // ค่าแรกเป็นจุดตั้งต้น
                    for (int i = 2; i <= n; i++) {                   // เริ่ม 2 เพราะอ่านค่าแรกแล้ว
                        int score = input.nextInt();
                        sum += score;
                        if (score > max) max = score;
                        if (score < min) min = score;
                    }
                    System.out.printf("Max=%d Min=%d Avg=%.2f%n", max, min, (double) sum / n);
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: ตารางสูตรคูณ และบั๊ก ; หลัง for", blocks: [
          { type: "run", title: "ตารางสูตรคูณ", stdin: "7",
            code: j`
              import java.util.Scanner;

              public class MultiplicationTable {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Table of: ");
                      int n = input.nextInt();
                      for (int m = 1; m <= 12; m++) {
                          System.out.printf("%d x %2d = %3d%n", n, m, n * m);    // %2d %3d จัดคอลัมน์
                      }
                  }
              }`,
            },
          { type: "run", label: "ทดลองบั๊ก 6.2.5", title: "semicolon ทำให้ body ว่าง",
            code: j`
              public class EmptyForBody {
                  public static void main(String[] args) {
                      for (int i = 1; i <= 3; i++);
                      {
                          System.out.println("Hello");
                      }
                  }
              }`,
            after: "<code>;</code> หลังวงเล็บทำให้ลูปไม่มี body บล็อก <code>{ }</code> ถัดมาจึงทำครั้งเดียว แก้โดยลบ <code>;</code>" },
        ] },
        { type: "table", title: "เลือก for หรือ while", head: ["โจทย์", "ใช้"], rows: [
          ["รู้จำนวนรอบ เช่น นับ 1–100, วนตามจำนวนข้อมูล", "<code>for</code>"],
          ["ทำซ้ำจนกว่าเหตุการณ์หนึ่งจะเกิด เช่น ผู้ใช้ป้อน 0", "<code>while</code>"],
          ["ต้องทำอย่างน้อยหนึ่งครั้ง เช่น เมนู ถามซ้ำ", "<code>do-while</code> (หัวข้อถัดไป)"],
        ] },
        { type: "check", title: "นับรอบของ for", html: `<p><code>for (int i = 10; i &lt; 50; i += 7)</code> ทำกี่รอบ และ i ค่าสุดท้ายที่เข้า body คือเท่าไร</p>`, answer: `<p>i = 10, 17, 24, 31, 38, 45 → <strong>6 รอบ</strong> ค่าสุดท้ายคือ <strong>45</strong> (52 ไม่ผ่านเงื่อนไข)</p>` },
      ],
    },
    {
      num: "6.3", toc: "do-while และ sentinel", title: "do-while และการทำซ้ำด้วย sentinel",
      blocks: [
        { type: "p", html: `<code>do-while</code> ทำ body ก่อนแล้ว<strong>ตรวจเงื่อนไขทีหลัง</strong> จึงทำอย่างน้อยหนึ่งครั้งเสมอ (อย่าลืม <code>;</code> หลัง <code>while (...)</code>)` },
        { type: "html", html: flowchart({ rowH: 90, caption: "do-while: body อยู่ก่อนข้าวหลามตัด จึงทำอย่างน้อย 1 ครั้งเสมอ", nodes: {
          start: ["terminal", "เริ่มต้น", 1, 0],
          init: ["process", "count = 10", 1, 1],
          show: ["io", "แสดง count", 1, 2],
          update: ["process", "count++", 1, 3],
          check: ["decision", "count <= 3 ?", 1, 4],
          end: ["terminal", "จบ", 1, 5],
        }, edges: [
          ["start", "init"], ["init", "show"], ["show", "update"], ["update", "check"],
          ["check", "show", { out: "left", in: "left", label: "ใช่", via: [[0.35, 4], [0.35, 2]] }],
          ["check", "end", { label: "ไม่ใช่" }],
        ] }) },
        { type: "run", title: "do-while กับ while เมื่อเงื่อนไขเป็นเท็จตั้งแต่แรก",
          code: j`
            public class DoWhileOnce {
                public static void main(String[] args) {
                    int count = 10;
                    do {
                        System.out.println("do-while body, count = " + count);   // ทำ 1 ครั้ง
                        count++;
                    } while (count <= 3);                                         // ; ปิดท้าย

                    int k = 10;
                    while (k <= 3) {                                              // ตรวจก่อน → ไม่เข้าเลย
                        System.out.println("while body");
                        k++;
                    }
                    System.out.println("Finished");
                }
            }`,
          },
        { type: "h", text: "ถามซ้ำจนได้ค่าที่ถูกต้อง" },
        { type: "p", html: `ต้องถามอย่างน้อยหนึ่งครั้งเสมอ แล้วถามซ้ำถ้าค่าไม่ถูกต้อง งานนี้ do-while พอดี` },
        { type: "run", title: "บังคับป้อนคะแนน 0–100", stdin: "150\n-5\n87",
          code: j`
            import java.util.Scanner;

            public class ValidScore {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int score;
                    do {
                        System.out.print("Score (0-100): ");
                        score = input.nextInt();
                        if (score < 0 || score > 100) {
                            System.out.println("  Invalid, try again.");
                        }
                    } while (score < 0 || score > 100);        // 150, -5 → ถามใหม่ ; 87 → ออก
                    System.out.println("Accepted: " + score);
                }
            }`,
          },
        { type: "tip", html: `เงื่อนไข “นอกช่วง” ใช้ <code>||</code> ไม่ใช่ <code>&amp;&amp;</code> เพราะไม่มีคะแนนใดน้อยกว่า 0 <em>และ</em>มากกว่า 100 พร้อมกัน` },

        { type: "h", text: "ค่าหยุด (sentinel)" },
        { type: "p", html: `อ่านค่าแรก<strong>ก่อน</strong>เข้าลูป แล้วอ่านค่าถัดไปที่<strong>ท้าย</strong>ลูป ค่าหยุด (เช่น 0) จึงไม่ถูกนำไปคำนวณ` },
        { type: "run", title: "รวมจนกว่าจะป้อน 0", stdin: "12\n7\n30\n0",
          code: j`
            import java.util.Scanner;

            public class SentinelSum {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int sum = 0, count = 0;
                    System.out.print("Number (0 to stop): ");
                    int number = input.nextInt();                    // อ่านค่าแรกก่อนเข้าลูป
                    while (number != 0) {
                        sum += number;                               // 12, 19, 49
                        count++;
                        System.out.print("Number (0 to stop): ");
                        number = input.nextInt();                    // อ่านค่าถัดไปท้ายลูป
                    }
                    System.out.println("Count = " + count + ", Sum = " + sum);
                    if (count > 0) {                                 // กันหารด้วย 0
                        System.out.printf("Average = %.2f%n", (double) sum / count);
                    }
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เมนูวนซ้ำด้วย do-while + switch", blocks: [
          { type: "run", title: "เมนูบัญชีธนาคาร", stdin: "1\n500\n2\n200\n3\n0",
            code: j`
              import java.util.Scanner;

              public class BankMenu {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      double balance = 1000;
                      int choice;
                      do {                                                    // แสดงเมนูอย่างน้อย 1 ครั้ง
                          System.out.println("[1] Deposit [2] Withdraw [3] Balance [0] Exit");
                          System.out.print("Choice: ");
                          choice = input.nextInt();
                          switch (choice) {
                              case 1 -> {
                                  System.out.print("Amount: ");
                                  balance += input.nextDouble();
                              }
                              case 2 -> {
                                  System.out.print("Amount: ");
                                  double amount = input.nextDouble();
                                  if (amount <= balance) balance -= amount;
                                  else System.out.println("Insufficient funds");
                              }
                              case 3 -> System.out.printf("Balance: %.2f%n", balance);
                              case 0 -> System.out.println("Goodbye");
                              default -> System.out.println("Invalid choice");
                          }
                      } while (choice != 0);                                  // เลือก 0 จึงออก
                  }
              }`,
            },
          { type: "run", label: "ทดลอง error 6.3.5", title: "do-while ขาด semicolon", expect: "compile-error",
            code: j`
              public class DoWhileSyntaxError {
                  public static void main(String[] args) {
                      int count = 1;
                      do {
                          System.out.println(count);
                          count++;
                      } while (count <= 3)
                  }
              }`,
            },
        ] },
        { type: "practice", level: 2, title: "ตู้กดน้ำหยอดเหรียญ",
          html: `<p>น้ำราคา 25 บาท ตู้รับเหรียญ 1, 2, 5 และ 10 บาท ให้วนรับเหรียญจนยอดรวมถึง 25 บาท เหรียญอื่นให้ปฏิเสธโดยไม่นับยอด เมื่อครบแล้วแสดงเงินทอน</p>`,
          spec: ["ใช้ do-while เพราะต้องรับเหรียญอย่างน้อย 1 ครั้งเสมอ", "เหรียญที่รับได้ แสดง <code>Total: …</code> เหรียญที่ไม่รับ แสดง <code>Rejected: …</code>", "ประกาศราคาเป็นค่าคงที่ <code>final int PRICE = 25;</code>"],
          runs: ["10\n3\n5\n10", "10\n10\n20\n10"],
          hint: "คำใบ้: เหรียญใช้ได้เมื่อ coin == 1 || coin == 2 || coin == 5 || coin == 10 และเงื่อนไขของ do-while คือยอดยังไม่ถึงราคา",
          solution: j`
            import java.util.Scanner;

            public class VendingMachine {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    final int PRICE = 25;
                    int total = 0;

                    do {
                        System.out.print("Insert coin (1, 2, 5, 10): ");
                        int coin = input.nextInt();
                        if (coin == 1 || coin == 2 || coin == 5 || coin == 10) {
                            total += coin;
                            System.out.println("  Total: " + total);
                        } else {
                            System.out.println("  Rejected: " + coin);   // ไม่นับยอด
                        }
                    } while (total < PRICE);

                    System.out.println("Dispensing drink. Change: " + (total - PRICE) + " baht");
                }
            }`,
          explain: "do-while ทำ body ก่อนแล้วจึงตรวจเงื่อนไข เหมาะกับงานที่ต้องเกิดอย่างน้อยหนึ่งครั้ง ครั้งที่สองหยอด 10 + 10 + 10 = 30 จึงทอน 5 บาท ส่วนเหรียญ 20 ถูกปฏิเสธ" },
        { type: "check", title: "do-while", html: jpre(`
          int n = 5;
          do {
              System.out.print(n + " ");
              n -= 2;
          } while (n > 0);`), answer: `<p>พิมพ์ <strong>5 3 1</strong> แล้ว n = -1 ทำให้เงื่อนไขเท็จ</p>` },
      ],
    },
    {
      num: "6.4", toc: "ลูปซ้อนและคำสั่งควบคุม", title: "ลูปซ้อน, break และ continue",
      blocks: [
        { type: "p", html: `ลูปซ้อน (nested loop) คือลูปอยู่ในลูป มักให้<strong>ลูปนอกคุมแถว</strong>และ<strong>ลูปในคุมคอลัมน์</strong> ลูปในทำครบทุกรอบก่อนที่ลูปนอกจะขยับหนึ่งครั้ง` },
        { type: "run", title: "พิมพ์แต่ละเลขซ้ำ 10 ครั้ง",
          code: j`
            public class RepeatEachNumber {
                public static void main(String[] args) {
                    for (int i = 1; i <= 5; i++) {                 // ลูปนอก: เลือกเลข (แถว)
                        for (int j = 1; j <= 10; j++) {            // ลูปใน: พิมพ์ 10 ครั้ง
                            System.out.print(i + " ");
                        }
                        System.out.println();                      // จบแถว ขึ้นบรรทัดใหม่
                    }
                }
            }`,
          },
        { type: "h", text: "ลูปในขึ้นกับลูปนอก: รูปทรงด้วยดาว" },
        { type: "p", html: `จำนวนรอบของลูปในไม่ต้องคงที่ ใช้ค่าแถวของลูปนอกเป็นขอบเขตได้ เคล็ดลับคือเขียนตาราง “แถว → จำนวนที่ต้องพิมพ์” ก่อน แล้วหาความสัมพันธ์` },
        { type: "table", cls: "trace-table", head: ["row", "ช่องว่าง = 4 − row", "ดาว = 2·row − 1"], rows: [["1", "3", "1"], ["2", "2", "3"], ["3", "1", "5"], ["4", "0", "7"]] },
        { type: "run", title: "พีระมิดดาว",
          code: j`
            public class StarPyramid {
                public static void main(String[] args) {
                    int height = 4;
                    for (int row = 1; row <= height; row++) {
                        for (int s = 1; s <= height - row; s++) {       // ช่องว่าง 3, 2, 1, 0
                            System.out.print(" ");
                        }
                        for (int k = 1; k <= 2 * row - 1; k++) {        // ดาว 1, 3, 5, 7
                            System.out.print("*");
                        }
                        System.out.println();
                    }
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: สามเหลี่ยมดาว", blocks: [
          { type: "run", title: "แถวที่ row มีดาว row ดวง",
            code: j`
              public class StarTriangle {
                  public static void main(String[] args) {
                      int height = 5;
                      for (int row = 1; row <= height; row++) {
                          for (int col = 1; col <= row; col++) {         // จำนวนดาว = เลขแถว
                              System.out.print("* ");
                          }
                          System.out.println();
                      }
                  }
              }`,
            },
        ] },

        { type: "h", text: "break และ continue" },
        { type: "table", head: ["คำสั่ง", "ทำอะไร"], rows: [
          ["<code>break;</code>", "ออกจากลูป<strong>ชั้นในสุด</strong>ที่กำลังทำทันที"],
          ["<code>continue;</code>", "ข้ามส่วนที่เหลือของรอบนี้ แล้วเริ่มรอบถัดไป"],
        ] },
        { type: "run", title: "ข้ามเลขคู่ และหยุดที่ 7",
          code: j`
            public class BreakContinue {
                public static void main(String[] args) {
                    for (int number = 1; number <= 10; number++) {
                        if (number % 2 == 0) {
                            continue;                     // เลขคู่ → ข้ามไปรอบถัดไป
                        }
                        if (number == 7) {
                            break;                        // เจอ 7 → ออกจากลูป (8–10 ไม่ถูกตรวจ)
                        }
                        System.out.println(number);       // 1 3 5
                    }
                    System.out.println("After loop");
                }
            }`,
          },
        { type: "warn", title: "continue ใน while", html: `ใน <code>for</code> ส่วน update ยังทำงานหลัง continue แต่ใน <code>while</code> ถ้า <code>i++</code> อยู่หลัง continue จะถูกข้าม เช่น <code>if (i % 2 == 0) continue;</code> ก่อน <code>i++</code> จะค้างที่ i = 2 ตลอดไป แก้โดยย้าย i++ ขึ้นไปก่อน หรือใช้ for` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: หาจำนวนเฉพาะด้วยลูปซ้อน + break", blocks: [
          { type: "p", html: `สำหรับแต่ละ n ลองหารด้วย 2 ถึง √n ถ้าเจอตัวหารลงตัวก็ break ทันที break ออกเฉพาะลูปใน ลูปนอกยังทำ n ถัดไป` },
          { type: "run", title: "จำนวนเฉพาะไม่เกิน 50",
            code: j`
              public class PrimesUpTo50 {
                  public static void main(String[] args) {
                      int count = 0;
                      for (int n = 2; n <= 50; n++) {
                          boolean isPrime = true;                  // สมมติว่าเป็นก่อน
                          for (int d = 2; d * d <= n; d++) {       // d ≤ √n พอ
                              if (n % d == 0) {
                                  isPrime = false;
                                  break;                           // ออกเฉพาะลูป d
                              }
                          }
                          if (isPrime) {
                              System.out.print(n + " ");
                              count++;
                          }
                      }
                      System.out.println();
                      System.out.println("Total primes: " + count);
                  }
              }`,
            },
          { type: "run", label: "ทดลอง error 6.4.7", title: "unreachable statement", expect: "compile-error",
            code: j`
              public class UnreachableAfterBreak {
                  public static void main(String[] args) {
                      while (true) {
                          break;
                          System.out.println("Never reached");
                      }
                  }
              }`,
            after: "คำสั่งหลัง break ในบล็อกเดียวกันไม่มีทางทำงาน compiler จึงไม่ยอม ย้าย println ไปหลังลูป หรือใส่ break ไว้ใน if" },
        ] },
        { type: "practice", level: 2, title: "กระดานหมากรุก",
          html: `<p>รับขนาด n แล้วพิมพ์กระดาน n × n ที่สลับ <code>#</code> กับ <code>.</code> ทุกช่อง โดยมุมซ้ายบนเป็น <code>#</code> และแถวถัดไปเริ่มด้วยสัญลักษณ์ตรงข้ามกับแถวก่อน</p>`,
          spec: ["ใช้ for ซ้อน 2 ชั้น: ชั้นนอกคือแถว ชั้นในคือคอลัมน์", "เลือกสัญลักษณ์จากผลรวมของเลขแถวและเลขคอลัมน์ (ไม่ต้องจำว่าช่องก่อนหน้าเป็นอะไร)"],
          runs: ["5", "4"],
          hint: "คำใบ้: ช่อง (row, col) เป็น # เมื่อ (row + col) เป็นเลขคู่",
          solution: j`
            import java.util.Scanner;

            public class Checkerboard {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Size: ");
                    int n = input.nextInt();

                    for (int row = 0; row < n; row++) {
                        for (int col = 0; col < n; col++) {
                            if ((row + col) % 2 == 0) {       // ผลรวมคู่ = #
                                System.out.print("#");
                            } else {
                                System.out.print(".");
                            }
                        }
                        System.out.println();                 // จบแถว
                    }
                }
            }`,
          explain: "row + col เพิ่มขึ้น 1 ทุกครั้งที่ขยับไปทางขวาหรือลงล่างหนึ่งช่อง ความเป็นคู่/คี่จึงสลับกันเอง การคำนวณจากตำแหน่งแบบนี้ง่ายกว่าการใช้ตัวแปรจำสัญลักษณ์ล่าสุด เพราะต้นแถวใหม่จะถูกต้องโดยอัตโนมัติ" },
        { type: "check", title: "นับรอบลูปซ้อน", html: jpre(`
          int count = 0;
          for (int a = 1; a <= 4; a++)
              for (int b = a; b <= 4; b++)
                  count++;`), answer: `<p>a = 1 → 4 รอบ, a = 2 → 3, a = 3 → 2, a = 4 → 1 รวม <strong>10</strong></p>` },
      ],
    },
  ],
  exercisesIntro: "ทำนายจำนวนรอบและค่าตัวแปรก่อนรัน แล้วตรวจเทียบกับผลจริง ข้อที่ยากขึ้นจะต้องผสมลูปกับเงื่อนไขและลูปซ้อน",
  exercises: [
    { level: 1, title: "รวมเลข 1 ถึง n", html: `<p>รับจำนวนเต็มบวก n แล้วใช้ <code>while</code> รวม 1 + 2 + … + n และแสดงผล พร้อมตรวจกับสูตร n(n+1)/2</p>`,
      spec: ["ใช้ while (ไม่ใช่ for)", "แสดงผลรวมจากลูปและจากสูตรเพื่อเปรียบเทียบ"], runs: ["5", "100"],
      solution: j`
        import java.util.Scanner;

        public class SumWhile {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                int i = 1, sum = 0;
                while (i <= n) {
                    sum += i;  // บวกสะสม
                    i++;
                }
                System.out.println("Loop sum = " + sum);
                // สูตรตรวจคำตอบ
                System.out.println("Formula  = " + n * (n + 1) / 2);
            }
        }` },
    { level: 1, title: "นับถอยหลังทีละสอง", html: `<p>ใช้ <code>while (i &gt; 0)</code> แสดง 10, 8, 6, 4, 2 ในบรรทัดเดียวกันคั่นด้วยช่องว่าง แล้วแสดง <code>Lift off!</code> ในบรรทัดถัดไป</p>`,
      spec: ["เริ่มที่ 10 ลดทีละ 2", "อธิบายในคำตอบว่าทำไม 0 ไม่ถูกพิมพ์"],
      solution: j`
        public class CountdownByTwo {
            public static void main(String[] args) {
                int i = 10;
                while (i > 0) {
                    System.out.print(i + " ");
                    i -= 2;  // ลดทีละ 2
                }
                System.out.println();
                System.out.println("Lift off!");
            }
        }`, explain: "หลังพิมพ์ 2 ค่า i ลดเป็น 0 เงื่อนไข i &gt; 0 จึงเป็น false ก่อนเข้ารอบถัดไป" },
    { level: 1, title: "ตารางสูตรคูณแบบกำหนดช่วง", html: `<p>รับแม่สูตรคูณ n และจำนวนแถว rows แล้วใช้ <code>for</code> แสดงสูตรคูณ n × 1 ถึง n × rows จัดคอลัมน์ให้ตรง</p>`,
      spec: ["ใช้ printf จัดความกว้าง เช่น <code>%2d</code>, <code>%3d</code>", "ทดสอบ n = 9, rows = 6"], stdin: "9 6",
      solution: j`
        import java.util.Scanner;

        public class TableRange {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n rows: ");
                int n = input.nextInt();
                int rows = input.nextInt();  // รับ 2 ค่าในบรรทัดเดียว
                for (int m = 1; m <= rows; m++) {
                    System.out.printf("%d x %2d = %3d%n", n, m, n * m);
                }
            }
        }` },
    { level: 1, title: "แฟกทอเรียล", html: `<p>รับ n (0–20) แล้วคำนวณ n! = 1 × 2 × … × n โดยกำหนด 0! = 1 ใช้ตัวแปรชนิด <code>long</code> เพราะผลโตเร็วมาก</p>`,
      spec: ["ผลคูณเริ่มที่ 1 (ไม่ใช่ 0)", "แสดงขั้นตอนการคูณ เช่น <code>5! = 1 x 2 x 3 x 4 x 5 = 120</code>"], runs: ["5", "0"],
      solution: j`
        import java.util.Scanner;

        public class Factorial {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                long fact = 1;  // long รองรับค่าใหญ่กว่า int
                System.out.print(n + "! = 1");
                for (int i = 2; i <= n; i++) {
                    fact *= i;  // คูณสะสม
                    System.out.print(" x " + i);
                }
                System.out.println(" = " + fact);
            }
        }`, explain: "เมื่อ n = 0 หรือ 1 ลูปไม่ทำงานเลย ผลจึงเป็น 1 ตามนิยาม" },
    { level: 2, title: "รับคะแนนจนกว่าจะถูกต้อง แล้วตัดเกรด", html: `<p>ใช้ <code>do-while</code> ถามคะแนนซ้ำเมื่อคะแนนต่ำกว่า 0 หรือมากกว่า 100 (แสดงข้อความเตือนทุกครั้งที่ผิด) เมื่อได้คะแนนที่ถูกต้องแล้วให้ตัดเกรด A/B/C/D/F (80/70/60/50) และบอกว่าป้อนผิดไปกี่ครั้ง</p>`,
      spec: ["ใช้ do-while สำหรับการรับค่า", "นับจำนวนครั้งที่ป้อนผิด", "ตัดเกรดหลังออกจากลูป"], stdin: "120\n-3\n74",
      solution: j`
        import java.util.Scanner;

        public class ValidateAndGrade {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                int score;
                int wrong = 0;
                do {
                    System.out.print("Score: ");
                    score = input.nextInt();
                    // ค่าผิดช่วง → นับจำนวนครั้งที่ผิด
                    if (score < 0 || score > 100) {
                        System.out.println("Out of range!");
                        wrong++;
                    }
                // วนจนกว่าจะได้ค่าในช่วง
                } while (score < 0 || score > 100);
                char grade;
                if (score >= 80) grade = 'A';
                else if (score >= 70) grade = 'B';
                else if (score >= 60) grade = 'C';
                else if (score >= 50) grade = 'D';
                else grade = 'F';
                System.out.println("Grade " + grade + " (invalid attempts: " + wrong + ")");
            }
        }` },
    { level: 2, title: "สถิติจนกว่าจะป้อน -1", html: `<p>รับคะแนน (จำนวนเต็ม 0–100) ไปเรื่อย ๆ จนผู้ใช้ป้อน <code>-1</code> แล้วแสดงจำนวนข้อมูล ค่าสูงสุด ค่าต่ำสุด ค่าเฉลี่ย และจำนวนคนที่ได้ ≥ 50 ถ้าไม่มีข้อมูลเลยให้แสดง <code>No data</code></p>`,
      spec: ["-1 เป็น sentinel ห้ามนำไปคำนวณ", "ค่า max/min เริ่มต้นได้จากข้อมูลตัวแรก หรือใช้ <code>Integer.MIN_VALUE</code>/<code>MAX_VALUE</code>", "ป้องกันการหารด้วย 0"], runs: ["67 45 88 92 50 -1", "-1"],
      solution: j`
        import java.util.Scanner;

        public class ScoreStats {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                int count = 0, sum = 0, passed = 0;
                // ค่าเริ่มที่ทำให้ค่าแรกชนะเสมอ
                int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
                System.out.print("Scores (-1 to stop): ");
                int score = input.nextInt();
                while (score != -1) {  // -1 คือค่าหยุด
                    count++;
                    sum += score;
                    if (score > max) max = score;
                    if (score < min) min = score;
                    if (score >= 50) passed++;
                    // อ่านค่าถัดไปก่อนตรวจเงื่อนไข
                    score = input.nextInt();
                }
                if (count == 0) {  // ป้องกันการหารด้วย 0
                    System.out.println("No data");
                } else {
                    System.out.println("Count: " + count);
                    System.out.println("Max: " + max + ", Min: " + min);
                    System.out.printf("Average: %.2f%n", (double) sum / count);
                    System.out.println("Passed: " + passed);
                }
            }
        }` },
    { level: 2, title: "กลับหลักตัวเลขและตรวจพาลินโดรม", html: `<p>รับจำนวนเต็มบวก แล้วใช้ลูปสร้างตัวเลขกลับหลัก (เช่น 12345 → 54321) โดยใช้ <code>%</code> และ <code>/</code> เท่านั้น (ห้ามแปลงเป็น String) จากนั้นบอกว่าเป็น<strong>พาลินโดรม</strong> (อ่านกลับแล้วเท่าเดิม) หรือไม่</p>`,
      spec: ["reversed = reversed × 10 + (temp % 10) แล้ว temp /= 10", "เก็บค่าเดิมไว้เปรียบเทียบ"], runs: ["12345", "12321"],
      solution: j`
        import java.util.Scanner;

        public class ReverseNumber {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Number: ");
                int n = input.nextInt();
                int temp = n, reversed = 0;
                while (temp > 0) {
                    // เลื่อนหลักเดิมไปซ้าย แล้วเติมหลักขวาสุดของ temp
                    reversed = reversed * 10 + temp % 10;
                    // ตัดหลักขวาสุดทิ้ง
                    temp /= 10;
                }
                System.out.println("Reversed: " + reversed);
                // ?: เลือกข้อความตามเงื่อนไข
                System.out.println(n == reversed ? "Palindrome" : "Not palindrome");
            }
        }` },
    { level: 2, title: "เกมทายตัวเลข (กำหนดคำตอบ)", html: `<p>กำหนดคำตอบในโปรแกรมเป็น <code>secret = 37</code> ให้ผู้ใช้ทายได้ไม่เกิน 6 ครั้ง ทุกครั้งที่ทายให้บอก <code>Too high</code> หรือ <code>Too low</code> ถ้าทายถูกให้แสดงจำนวนครั้งที่ใช้แล้วจบทันที ถ้าครบ 6 ครั้งยังไม่ถูกให้เฉลยคำตอบ</p>`,
      spec: ["ใช้ for นับจำนวนครั้ง + break เมื่อทายถูก", "ใช้ตัวแปร boolean ติดตามว่าทายถูกหรือยัง", "บทเสริม Random จะสุ่มคำตอบแทนการกำหนดตายตัว"], runs: ["50\n25\n37", "1\n2\n3\n4\n5\n6"],
      solution: j`
        import java.util.Scanner;

        public class GuessNumber {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                int secret = 37;
                boolean found = false;
                // ทายได้ไม่เกิน 6 ครั้ง
                for (int attempt = 1; attempt <= 6; attempt++) {
                    System.out.print("Guess #" + attempt + ": ");
                    int guess = input.nextInt();
                    if (guess == secret) {
                        System.out.println("Correct! You used " + attempt + " guesses.");
                        found = true;
                        break;  // ทายถูก → ออกจากลูป
                    } else if (guess > secret) {
                        System.out.println("Too high");
                    } else {
                        System.out.println("Too low");
                    }
                }
                if (!found) {  // ใช้ครบ 6 ครั้งแล้วยังไม่ถูก
                    System.out.println("Out of guesses. The answer was " + secret);
                }
            }
        }` },
    { level: 3, title: "ตารางสูตรคูณ 2 มิติ", html: `<p>รับ n แล้วแสดงตารางสูตรคูณขนาด n × n ที่มีหัวแถวและหัวคอลัมน์ ช่องในตารางเป็นผลคูณของหัวแถวกับหัวคอลัมน์ จัดให้ทุกคอลัมน์กว้าง 4 ตัวอักษร</p>`,
      spec: ["แถวแรกเป็นหัวคอลัมน์ 1..n โดยมุมซ้ายบนเป็นช่องว่าง", "ใช้ลูปซ้อน: ลูปนอกคือแถว ลูปในคือคอลัมน์", "มีเส้นคั่นใต้หัวคอลัมน์และ <code>|</code> หลังหัวแถว"], stdin: "6",
      solution: j`
        import java.util.Scanner;

        public class TimesTable2D {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("n = ");
                int n = input.nextInt();
                System.out.print("    |");
                // หัวตาราง
                for (int c = 1; c <= n; c++) System.out.printf("%4d", c);
                System.out.println();
                System.out.println("-".repeat(5 + 4 * n));
                for (int r = 1; r <= n; r++) {  // ลูปนอก: แถว
                    System.out.printf("%3d |", r);
                    for (int c = 1; c <= n; c++) {  // ลูปใน: คอลัมน์
                        System.out.printf("%4d", r * c);
                    }
                    System.out.println();
                }
            }
        }` },
    { level: 3, title: "รูปข้าวหลามตัดตัวเลข", html: `<p>รับความสูงครึ่งบน h แล้วพิมพ์รูปข้าวหลามตัดที่ประกอบด้วยตัวเลข แถวที่ k ของครึ่งบนแสดงเลข 1 ขึ้นไปถึง k แล้วลดกลับลงมาที่ 1 (เช่น <code>1234321</code>) ครึ่งล่างสะท้อนครึ่งบนโดยไม่ซ้ำแถวกลาง</p>`,
      spec: ["แต่ละแถวมีลูปย่อย 3 ชุด: ช่องว่าง, ตัวเลขขาขึ้น, ตัวเลขขาลง", "ครึ่งบนแถว 1..h, ครึ่งล่างแถว h−1..1", "ทดสอบ h = 4"], stdin: "4",
      solution: j`
        import java.util.Scanner;

        public class NumberDiamond {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("h = ");
                int h = input.nextInt();
                // ครึ่งบน: แถวยาวขึ้น
                for (int k = 1; k <= h; k++) printRow(k, h);
                // ครึ่งล่าง: แถวสั้นลง
                for (int k = h - 1; k >= 1; k--) printRow(k, h);
            }

            // เมธอดพิมพ์ 1 แถว (บทที่ 7)
            static void printRow(int k, int h) {
                // เว้นวรรคด้านหน้า
                for (int s = 1; s <= h - k; s++) System.out.print(" ");
                // นับขึ้น 1..k
                for (int i = 1; i <= k; i++) System.out.print(i);
                // นับลง k-1..1
                for (int i = k - 1; i >= 1; i--) System.out.print(i);
                System.out.println();
            }
        }`, explain: "เฉลยแยกการพิมพ์หนึ่งแถวเป็นเมธอด printRow เพื่อไม่ต้องเขียนลูปซ้ำสองชุด (จะเรียนเมธอดในบทที่ 7) ถ้ายังไม่ถนัดก็เขียนลูปครึ่งบนและครึ่งล่างแยกกันได้" },
    { level: 3, title: "จำนวนสมบูรณ์และจำนวนเฉพาะในช่วง", html: `<p>รับช่วง a ถึง b แล้วแสดง (1) จำนวนเฉพาะทั้งหมดในช่วง (2) จำนวนสมบูรณ์ (perfect number: ผลรวมตัวหารแท้เท่ากับตัวมันเอง เช่น 6 = 1 + 2 + 3) ทั้งหมดในช่วง และ (3) จำนวนของแต่ละประเภท</p>`,
      spec: ["ลูปนอกวน n จาก a ถึง b", "ตรวจจำนวนเฉพาะด้วยลูปตัวหารถึง √n และ break เมื่อเจอตัวหาร", "หาผลรวมตัวหารแท้ด้วยลูปอีกชุด", "จำนวนที่น้อยกว่า 2 ไม่ใช่จำนวนเฉพาะ"], stdin: "1 30",
      solution: j`
        import java.util.Scanner;

        public class PrimeAndPerfect {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Range a b: ");
                int a = input.nextInt(), b = input.nextInt();
                int primeCount = 0, perfectCount = 0;
                System.out.print("Primes: ");
                for (int n = a; n <= b; n++) {
                    if (n < 2) continue;  // 0 และ 1 ไม่ใช่จำนวนเฉพาะ
                    boolean prime = true;
                    // ตรวจตัวหารถึงรากที่สองของ n
                    for (int d = 2; d * d <= n; d++) {
                        if (n % d == 0) { prime = false; break; }
                    }
                    if (prime) { System.out.print(n + " "); primeCount++; }
                }
                System.out.println("(" + primeCount + ")");
                System.out.print("Perfect: ");
                for (int n = Math.max(a, 2); n <= b; n++) {
                    int sum = 0;
                    // ผลรวมตัวหารที่น้อยกว่า n
                    for (int d = 1; d < n; d++) {
                        if (n % d == 0) sum += d;
                    }
                    // ผลรวมตัวหารเท่ากับตัวเอง = จำนวนสมบูรณ์
                    if (sum == n) { System.out.print(n + " "); perfectCount++; }
                }
                System.out.println("(" + perfectCount + ")");
            }
        }` },
    { level: 3, title: "จำลองเงินฝากดอกเบี้ยทบต้น", html: `<p>รับเงินต้น อัตราดอกเบี้ยต่อปี (%) และเงินที่ต้องการมี (เป้าหมาย) ดอกเบี้ยทบต้นปีละครั้ง และ<strong>ฝากเพิ่มทุกต้นปีที่ 2 เป็นต้นไป</strong>อีกปีละ 12,000 บาท ให้แสดงตารางยอดเงินแต่ละปีจนกว่ายอดจะถึงเป้าหมาย แล้วสรุปว่าใช้กี่ปี ฝากเงินเองรวมเท่าไร และได้ดอกเบี้ยรวมเท่าไร</p>`,
      spec: ["ใช้ while เพราะไม่รู้จำนวนปีล่วงหน้า", "ลำดับในแต่ละปี: (ถ้าปี ≥ 2) ฝากเพิ่ม → คิดดอกเบี้ย → แสดงยอดสิ้นปี", "ป้องกันลูปไม่รู้จบ: ถ้าดอกเบี้ย ≤ 0 และไม่มีการฝากเพิ่มจะไม่มีทางถึง (ในโจทย์นี้มีการฝากเพิ่มเสมอ)", "จัดตารางด้วย printf และ <code>%,.2f</code>"], stdin: "50000\n3.5\n120000",
      solution: j`
        import java.util.Scanner;

        public class CompoundSavings {
            public static void main(String[] args) {
                final double YEARLY_DEPOSIT = 12000;
                Scanner input = new Scanner(System.in);
                System.out.print("Principal: ");
                double balance = input.nextDouble();
                System.out.print("Rate (% per year): ");
                double rate = input.nextDouble();
                System.out.print("Goal: ");
                double goal = input.nextDouble();

                double deposited = balance;
                int year = 0;
                System.out.printf("%4s %12s %12s%n", "Year", "Interest", "Balance");
                while (balance < goal) {  // ทำซ้ำจนกว่าจะถึงเป้าหมาย
                    year++;
                    if (year >= 2) {  // ฝากเพิ่มตั้งแต่ปีที่ 2
                        balance += YEARLY_DEPOSIT;
                        deposited += YEARLY_DEPOSIT;
                    }
                    // ดอกเบี้ยทบต้นจากยอดปัจจุบัน
                    double interest = balance * rate / 100;
                    balance += interest;
                    System.out.printf("%4d %,12.2f %,12.2f%n", year, interest, balance);
                }
                System.out.println("Years needed: " + year);
                System.out.printf("You deposited: %,.2f%n", deposited);
                System.out.printf("Total interest: %,.2f%n", balance - deposited);
            }
        }` },
  ],
};
