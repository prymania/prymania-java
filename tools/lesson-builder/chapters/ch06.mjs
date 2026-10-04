import { j, c, pre } from "../lib.mjs";

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
        { type: "p", html: `<code>while</code> เหมาะเมื่อยังไม่รู้จำนวนรอบแน่นอน แต่รู้เงื่อนไขที่ต้องทำต่อ เช่น “ทำต่อขณะที่ยังมีข้อมูล” ก่อนเข้ารอบทุกครั้ง Java ตรวจนิพจน์ในวงเล็บ ซึ่งต้องได้ค่า <code>boolean</code>` },
        { type: "steps", title: "ลำดับการทำงานของ while", intro: pre(`
          while (condition) {
              // คำสั่งที่ทำซ้ำ
              // เปลี่ยนค่าที่มีผลต่อ condition
          }`), items: ["ตรวจ <code>condition</code> ก่อนเข้ารอบ", "ถ้าเป็น <code>true</code> ทำคำสั่งในวงเล็บปีกกา", "จบรอบแล้วกลับไปตรวจ condition ใหม่", "ถ้าเป็น <code>false</code> ข้าม body ไปทำคำสั่งถัดจากลูป"], after: "ถ้า condition เป็น false ตั้งแต่ครั้งแรก body จะไม่ทำงานเลย (zero iterations)" },
        { type: "run", title: "นับ 1 ถึง 5", level: "พื้นฐาน",
          concept: "ตัวนับเริ่มที่ 1 เพิ่มทีละ 1 และหยุดเมื่อเกิน 5",
          code: j`
            public class CountUp {
                public static void main(String[] args) {
                    int number = 1;
                    while (number <= 5) {
                        System.out.println(number);
                        number++;
                    }
                    System.out.println("After loop: number = " + number);
                }
            }`,
          steps: ["ตรวจ 1 ≤ 5 → พิมพ์ 1, number = 2", "ทำต่อจนพิมพ์ 5 แล้ว number = 6", "ตรวจ 6 ≤ 5 → false ออกจากลูป", "หลังลูป number มีค่า 6 (ไม่ใช่ 5)"] },
        { type: "run", title: "นับถอยหลังด้วย while (i > 0)", level: "พื้นฐาน",
          concept: "เงื่อนไขต้องสอดคล้องกับทิศทางการอัปเดต: ลดค่า → ใช้ &gt; หรือ &gt;=",
          code: j`
            public class WhilePositive {
                public static void main(String[] args) {
                    int i = 3;
                    while (i > 0) {
                        System.out.println(i);
                        i--;
                    }
                    System.out.println("Done");
                }
            }`,
          steps: ["3 > 0 → พิมพ์ 3, i = 2", "2 > 0 → พิมพ์ 2, i = 1", "1 > 0 → พิมพ์ 1, i = 0", "0 > 0 false → ออก พิมพ์ Done"] },
        { type: "run", title: "สะสมผลรวม (accumulator)", level: "ต่อยอด",
          concept: "รูปแบบสำคัญที่สุดของลูป: ตัวแปรผลรวมเริ่มที่ 0 แล้วบวกค่าของแต่ละรอบเข้าไป",
          code: j`
            public class SumToN {
                public static void main(String[] args) {
                    int n = 5;
                    int number = 1;
                    int sum = 0;
                    while (number <= n) {
                        sum += number;
                        System.out.println("add " + number + " -> sum = " + sum);
                        number++;
                    }
                    System.out.println("1 + ... + " + n + " = " + sum);
                }
            }`,
          steps: ["sum เริ่ม 0 (ถ้าเริ่มค่าอื่นผลรวมจะผิด)", "แต่ละรอบ sum += number", "พิมพ์ระหว่างทางช่วยให้เห็นการเปลี่ยนแปลง (เทคนิค debug)", "ผลรวม 15 ตรงกับสูตร n(n+1)/2"] },
        { type: "run", title: "ไม่รู้จำนวนรอบ: นับหลักของตัวเลข", level: "ประยุกต์", stdin: "907215",
          concept: "จำนวนรอบขึ้นกับข้อมูล — หาร 10 ไปเรื่อย ๆ จนเหลือ 0 นี่คือจุดที่ while เหมาะกว่า for",
          code: j`
            import java.util.Scanner;

            public class CountDigits {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Number: ");
                    int n = input.nextInt();
                    int digits = 0;
                    int digitSum = 0;
                    int temp = n;
                    while (temp > 0) {
                        digitSum += temp % 10;
                        temp /= 10;
                        digits++;
                    }
                    System.out.println(n + " has " + digits + " digits, digit sum = " + digitSum);
                }
            }`,
          steps: ["temp = 907215 → หลักหน่วย 5, temp = 90721", "ทำซ้ำ: 1, 2, 7, 0, 9", "temp เป็น 0 → หยุด นับได้ 6 หลัก ผลรวม 24", "ใช้ temp แทน n เพื่อเก็บค่าเดิมไว้แสดงผล"] },
        { type: "run", title: "while (true) กับ break", level: "ประยุกต์",
          concept: "บางครั้งเขียนลูปที่ตั้งใจไม่หยุดเอง แล้วใช้ <code>break</code> ออกเมื่อถึงเงื่อนไข — ต้องแน่ใจว่า break ไปถึงได้จริง",
          code: j`
            public class WhileTrueBreak {
                public static void main(String[] args) {
                    int attempt = 1;
                    while (true) {
                        System.out.println("Attempt " + attempt);
                        if (attempt >= 3) {
                            break;
                        }
                        attempt++;
                    }
                    System.out.println("Stopped safely");
                }
            }`,
          steps: ["ลูปพิมพ์ Attempt 1, 2, 3", "เมื่อ attempt = 3 เงื่อนไข if จริง → break", "ไปทำคำสั่งหลังลูป"] },
        { type: "run", label: "ทดลอง error 6.1.6", title: "assignment ไม่ใช่เงื่อนไข", level: "ประยุกต์", expect: "compile-error",
          concept: "<code>while (i = 3)</code> เป็นการกำหนดค่า ได้ชนิด int ไม่ใช่ boolean",
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
          steps: ["compiler แจ้ง <code>int cannot be converted to boolean</code>", "ต้องการเปรียบเทียบใช้ <code>==</code> แต่ในกรณีนี้ควรเป็น <code>i &gt; 0</code>"] },
        { type: "note", title: "Logic error: ลูปไม่รู้จบ (อย่ากด Run)", html: pre(`
          int i = 3;
          while (i > 0) {
              System.out.println(i);
              i++;       // ผิดทิศ: 3, 4, 5, ... เงื่อนไข true ตลอด
          }

          int number = 1;
          while (number <= 5) {
              System.out.println(number);
              // ลืม number++  → number = 1 ตลอดไป
          }`) + `<p>ทั้งสองแบบคอมไพล์ผ่าน แต่ไม่จบ ถ้าเผลอรันใน IDE ให้กดปุ่ม Stop (■) วิธีป้องกันคือ trace 3 รอบแรกด้วยมือและตรวจว่าค่าเคลื่อนเข้าหาเงื่อนไขหยุด</p>` },
        { type: "check", title: "นับรอบ", html: pre(`
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
        { type: "p", html: `<code>for</code> รวมจุดเริ่ม เงื่อนไข และการอัปเดตไว้ในบรรทัดเดียว ทำให้อ่านแล้วรู้จำนวนรอบทันที` },
        { type: "steps", title: "Syntax และ flow ของ for", intro: pre(`
          for (initialization; condition; update) {
              // loop body
          }`), items: ["ทำ <code>initialization</code> ครั้งเดียวก่อนเริ่มลูป", "ตรวจ <code>condition</code>; ถ้า false ออกจากลูป", "ถ้า true ทำ body", "ทำ <code>update</code> แล้วกลับไปข้อ 2"], after: "ตัวแปรที่ประกาศในส่วนเริ่มต้น เช่น <code>int i</code> ใช้ได้เฉพาะภายในลูปนั้น" },
        { type: "run", title: "อ่าน header ของ for ตามลำดับ", level: "พื้นฐาน",
          concept: "ก่อนรัน ให้ทำนายค่าเริ่มต้น จำนวนรอบ และผลรวม",
          code: j`
            public class ForFlow {
                public static void main(String[] args) {
                    int sum = 0;
                    for (int i = 1; i <= 3; i++) {
                        sum += i;
                        System.out.println("i=" + i + ", sum=" + sum);
                    }
                    System.out.println("After loop, sum=" + sum);
                }
            }`,
          steps: ["i = 1 → ตรวจ 1 ≤ 3 → body → i++", "i = 2, 3 ทำเช่นเดียวกัน", "i = 4 → เงื่อนไข false → ออก", "<code>i</code> ใช้นอกลูปไม่ได้ เพราะประกาศใน header"] },
        { type: "run", title: "ขยับทีละมากกว่า 1 และนับถอยหลัง", level: "พื้นฐาน",
          concept: "ส่วน update เป็นนิพจน์ใดก็ได้ เช่น <code>i += 2</code>, <code>i--</code>, <code>i *= 2</code>",
          code: j`
            public class ForSteps {
                public static void main(String[] args) {
                    System.out.print("Even: ");
                    for (int i = 2; i <= 10; i += 2) {
                        System.out.print(i + " ");
                    }
                    System.out.println();

                    System.out.print("Countdown: ");
                    for (int i = 5; i >= 1; i--) {
                        System.out.print(i + " ");
                    }
                    System.out.println("Go!");

                    System.out.print("Powers of 2: ");
                    for (int p = 1; p <= 100; p *= 2) {
                        System.out.print(p + " ");
                    }
                    System.out.println();
                }
            }`,
          steps: ["<code>i += 2</code> → 2, 4, 6, 8, 10", "<code>i--</code> → 5, 4, 3, 2, 1", "<code>p *= 2</code> → 1, 2, 4, …, 64 (128 เกิน 100)"] },
        { type: "run", title: "ตารางสูตรคูณจากค่าที่ผู้ใช้ป้อน", level: "ต่อยอด", stdin: "7",
          concept: "รู้จำนวนรอบแน่นอน (12 แถว) → for เหมาะที่สุด ใช้ printf จัดคอลัมน์",
          code: j`
            import java.util.Scanner;

            public class MultiplicationTable {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Table of: ");
                    int n = input.nextInt();
                    for (int m = 1; m <= 12; m++) {
                        System.out.printf("%d x %2d = %3d%n", n, m, n * m);
                    }
                }
            }`,
          steps: ["m เดินจาก 1 ถึง 12", "<code>%2d</code> และ <code>%3d</code> ทำให้ตัวเลขชิดขวาตรงกัน"] },
        { type: "run", title: "หาค่ามาก/น้อยสุดและค่าเฉลี่ยจากข้อมูล n ค่า", level: "ประยุกต์", stdin: "5\n72 88 65 91 79",
          concept: "รูปแบบ “ติดตามค่าที่ดีที่สุด”: กำหนดค่าเริ่มจากข้อมูลตัวแรก แล้วเทียบกับตัวถัดไปทีละตัว",
          code: j`
            import java.util.Scanner;

            public class MinMaxAverage {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("How many scores? ");
                    int n = input.nextInt();
                    System.out.print("Scores: ");
                    int first = input.nextInt();
                    int max = first, min = first, sum = first;
                    for (int i = 2; i <= n; i++) {
                        int score = input.nextInt();
                        sum += score;
                        if (score > max) max = score;
                        if (score < min) min = score;
                    }
                    System.out.printf("Max=%d Min=%d Avg=%.2f%n", max, min, (double) sum / n);
                }
            }`,
          steps: ["อ่านค่าแรก (72) ก่อนลูป ตั้งเป็น max, min, sum", "ลูปเริ่ม i = 2 อ่านค่าที่เหลืออีก 4 ค่า", "แต่ละรอบปรับ max/min ถ้าเจอค่าที่ดีกว่า", "cast sum เป็น double ก่อนหาร"] },
        { type: "run", label: "ทดลองบั๊ก 6.2.5", title: "semicolon ทำให้ body ว่าง", level: "ประยุกต์",
          concept: "โค้ดคอมไพล์ผ่าน แต่ <code>;</code> หลัง header ทำให้ลูปไม่มี body บล็อกถัดไปทำครั้งเดียว",
          code: j`
            public class EmptyForBody {
                public static void main(String[] args) {
                    for (int i = 1; i <= 3; i++);
                    {
                        System.out.println("Hello");
                    }
                }
            }`,
          steps: ["ลูปวน 3 รอบโดยไม่ทำอะไร", "บล็อก { } เป็นบล็อกธรรมดาหลังลูป → พิมพ์ Hello ครั้งเดียว", "แก้: ลบ ; หลังวงเล็บ"] },
        { type: "note", title: "เลือก for หรือ while", html: `<p>ใช้ <code>for</code> เมื่อรู้ช่วงหรือจำนวนรอบชัดเจน (นับ 1–100, วนตามจำนวนข้อมูล) ใช้ <code>while</code> เมื่อทำซ้ำจนกว่าเหตุการณ์หนึ่งจะเกิด (ผู้ใช้ป้อน 0, ตัวเลขหารจนเหลือ 0) ทั้งคู่ทำงานแทนกันได้ แต่รูปแบบที่ตรงโจทย์อ่านง่ายกว่า</p>` },
        { type: "check", title: "นับรอบของ for", html: `<p><code>for (int i = 10; i &lt; 50; i += 7)</code> ทำกี่รอบ และ i ค่าสุดท้ายที่เข้า body คือเท่าไร</p>`, answer: `<p>i = 10, 17, 24, 31, 38, 45 → <strong>6 รอบ</strong> ค่าสุดท้ายคือ <strong>45</strong> (52 ไม่ผ่านเงื่อนไข)</p>` },
      ],
    },
    {
      num: "6.3", toc: "do-while และ sentinel", title: "do-while และการทำซ้ำด้วย sentinel",
      blocks: [
        { type: "p", html: `<code>do-while</code> ตรวจเงื่อนไข<strong>หลัง</strong>ทำ body จึงทำอย่างน้อยหนึ่งครั้ง เหมาะกับการแสดงเมนูหรือถามข้อมูลก่อน แล้วค่อยตรวจว่าต้องทำต่อหรือไม่ ส่วน <strong>sentinel</strong> คือค่าพิเศษที่ใช้สั่งหยุด เช่น ป้อน 0 หรือ -1` },
        { type: "steps", title: "Syntax และ flow ของ do-while", intro: pre(`
          do {
              // คำสั่งที่ต้องทำอย่างน้อยหนึ่งครั้ง
          } while (condition);   // ← มี ; ปิดท้าย`), items: ["เข้าทำ body ทันทีโดยยังไม่ตรวจเงื่อนไข", "ทำคำสั่งใน body และปรับค่าที่เกี่ยวข้อง", "ตรวจ condition ที่ท้ายลูป", "ถ้า true กลับไปเริ่ม body; ถ้า false ออกจากลูป"] },
        { type: "run", title: "ทำอย่างน้อยหนึ่งครั้ง", level: "พื้นฐาน",
          concept: "แม้เงื่อนไขเป็น false ตั้งแต่แรก body ก็ทำไปแล้วหนึ่งครั้ง — ต่างจาก while",
          code: j`
            public class DoWhileOnce {
                public static void main(String[] args) {
                    int count = 10;
                    do {
                        System.out.println("do-while body, count = " + count);
                        count++;
                    } while (count <= 3);

                    int k = 10;
                    while (k <= 3) {
                        System.out.println("while body");
                        k++;
                    }
                    System.out.println("Finished");
                }
            }`,
          steps: ["do-while ทำ body ก่อน (count = 10) แล้วตรวจ 11 ≤ 3 → false จบ", "while ตรวจ 10 ≤ 3 ก่อน → false ไม่ทำเลย", "ผลจึงต่างกัน 1 รอบ"] },
        { type: "run", title: "บังคับป้อนค่าในช่วงที่ถูกต้อง (input validation)", level: "ต่อยอด", stdin: "150\n-5\n87",
          concept: "ต้องถามอย่างน้อยหนึ่งครั้งเสมอ แล้วถามซ้ำถ้าค่าไม่ถูกต้อง → do-while พอดี",
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
                    } while (score < 0 || score > 100);
                    System.out.println("Accepted: " + score);
                }
            }`,
          steps: ["150 นอกช่วง → แจ้งเตือนและวนใหม่", "-5 นอกช่วง → วนใหม่", "87 ในช่วง → เงื่อนไขท้าย false → ออก", "ต้องใช้ <code>||</code> ไม่ใช่ <code>&amp;&amp;</code>: ไม่มีคะแนนใดน้อยกว่า 0 และมากกว่า 100 พร้อมกัน"] },
        { type: "run", title: "รวมค่าจนป้อน sentinel 0", level: "ประยุกต์", stdin: "12\n7\n30\n0",
          concept: "อ่านค่าก่อนตรวจ (priming read) แล้วอ่านค่าถัดไปที่ท้าย body — sentinel จะไม่ถูกบวกเข้าไป",
          code: j`
            import java.util.Scanner;

            public class SentinelSum {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int sum = 0, count = 0;
                    System.out.print("Number (0 to stop): ");
                    int number = input.nextInt();
                    while (number != 0) {
                        sum += number;
                        count++;
                        System.out.print("Number (0 to stop): ");
                        number = input.nextInt();
                    }
                    System.out.println("Count = " + count + ", Sum = " + sum);
                    if (count > 0) {
                        System.out.printf("Average = %.2f%n", (double) sum / count);
                    }
                }
            }`,
          steps: ["อ่าน 12 ก่อนเข้าลูป", "บวก 12, 7, 30 ตามลำดับ", "อ่าน 0 → เงื่อนไข false ออกก่อนบวก", "ตรวจ count > 0 ก่อนหาร ป้องกันการหารด้วยศูนย์"] },
        { type: "run", title: "เมนูวนซ้ำด้วย do-while + switch", level: "ท้าทาย", stdin: "1\n500\n2\n200\n3\n0",
          concept: "โครงสร้างพื้นฐานของโปรแกรมเมนู: แสดงเมนู → รับตัวเลือก → ทำตามตัวเลือก → วนจนกว่าจะเลือกออก",
          code: j`
            import java.util.Scanner;

            public class BankMenu {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    double balance = 1000;
                    int choice;
                    do {
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
                    } while (choice != 0);
                }
            }`,
          steps: ["เมนูแสดงอย่างน้อยหนึ่งครั้งเสมอ", "ฝาก 500 → 1500, ถอน 200 → 1300", "เลือก 3 แสดงยอด", "เลือก 0 พิมพ์ Goodbye แล้วเงื่อนไข choice != 0 เป็น false → จบ"] },
        { type: "run", label: "ทดลอง error 6.3.5", title: "do-while ขาด semicolon", level: "ท้าทาย", expect: "compile-error",
          concept: "รูปแบบ do-while ต้องลงท้าย <code>while (เงื่อนไข);</code> เสมอ",
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
          steps: ["compiler แจ้ง <code>';' expected</code> ที่ท้ายบรรทัด while", "เติม ; แล้วโปรแกรมจะพิมพ์ 1, 2, 3"] },
        { type: "check", title: "do-while", html: pre(`
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
        { type: "p", html: `ก่อนเขียน nested loop ให้เริ่มจากสิ่งที่ต้องการเห็น แล้วแบ่งงานเป็น<strong>รอบนอก</strong> (มักคุมแถว) กับ<strong>งานที่ทำซ้ำในแต่ละรอบ</strong> (มักคุมคอลัมน์) ลูปในจะทำครบทุกรอบก่อนที่ลูปนอกจะขยับหนึ่งครั้ง` },
        { type: "run", title: "ลูปเดียว: หนึ่งรอบต่อหนึ่งตัวเลข", level: "พื้นฐาน",
          concept: "โจทย์ตั้งต้น — แสดงเลข 1–5 บรรทัดละหนึ่งเลข ลูปเดียวพอ",
          code: j`
            public class OneLoop {
                public static void main(String[] args) {
                    for (int i = 1; i <= 5; i++) {
                        System.out.println(i);
                    }
                }
            }`,
          steps: ["i เปลี่ยนจาก 1 ถึง 5", "แต่ละรอบพิมพ์ i หนึ่งครั้งแล้วขึ้นบรรทัด"] },
        { type: "run", title: "เพิ่มความต้องการ: พิมพ์แต่ละเลขซ้ำ 10 ครั้ง", level: "ต่อยอด",
          concept: "ตอนนี้มีสองหน้าที่: i เลือกเลข (ลูปนอก) และ j นับจำนวนครั้งที่พิมพ์เลขนั้น (ลูปใน)",
          code: j`
            public class RepeatEachNumber {
                public static void main(String[] args) {
                    for (int i = 1; i <= 5; i++) {
                        for (int j = 1; j <= 10; j++) {
                            System.out.print(i + " ");
                        }
                        System.out.println();
                    }
                }
            }`,
          steps: ["i = 1: j วิ่ง 1–10 พิมพ์ 1 สิบครั้ง แล้ว println ขึ้นบรรทัด", "i = 2: j เริ่มใหม่ที่ 1 อีกครั้ง", "รวมทั้งหมด 5 × 10 = 50 ครั้ง"] },
        { type: "run", title: "สามเหลี่ยมดาว: ลูปในขึ้นกับลูปนอก", level: "ต่อยอด",
          concept: "จำนวนรอบของลูปในไม่จำเป็นต้องคงที่ — ใช้ค่า row ของลูปนอกเป็นขอบเขต",
          code: j`
            public class StarTriangle {
                public static void main(String[] args) {
                    int height = 5;
                    for (int row = 1; row <= height; row++) {
                        for (int col = 1; col <= row; col++) {
                            System.out.print("* ");
                        }
                        System.out.println();
                    }
                }
            }`,
          steps: ["row 1 → ดาว 1 ดวง", "row 2 → 2 ดวง … row 5 → 5 ดวง", "เคล็ดลับ: เขียนตาราง “แถว → จำนวนดาว” ก่อน แล้วหาความสัมพันธ์"] },
        { type: "run", title: "พีระมิด: ช่องว่างลดลง ดาวเพิ่มขึ้น", level: "ประยุกต์",
          concept: "ในแต่ละแถวมีลูปในสองชุด: ชุดแรกพิมพ์ช่องว่าง (height − row) ชุดที่สองพิมพ์ดาว (2 × row − 1)",
          code: j`
            public class StarPyramid {
                public static void main(String[] args) {
                    int height = 4;
                    for (int row = 1; row <= height; row++) {
                        for (int s = 1; s <= height - row; s++) {
                            System.out.print(" ");
                        }
                        for (int k = 1; k <= 2 * row - 1; k++) {
                            System.out.print("*");
                        }
                        System.out.println();
                    }
                }
            }`,
          steps: ["row 1: ช่องว่าง 3, ดาว 1", "row 2: ช่องว่าง 2, ดาว 3", "row 4: ช่องว่าง 0, ดาว 7"] },
        { type: "table", cls: "trace-table", head: ["row", "ช่องว่าง = 4 − row", "ดาว = 2·row − 1"], rows: [["1", "3", "1"], ["2", "2", "3"], ["3", "1", "5"], ["4", "0", "7"]] },
        { type: "concept", title: "break และ continue", html: `<ul><li><code>break;</code> ออกจากลูป<strong>ชั้นในสุด</strong>ที่กำลังทำ แล้วไปคำสั่งหลังลูปนั้น</li><li><code>continue;</code> ข้ามส่วนที่เหลือของรอบนี้ แล้วเริ่มรอบใหม่ — ใน for ส่วน update ยังทำงาน แต่ใน while ถ้า update อยู่หลัง continue จะถูกข้าม (เสี่ยงลูปไม่รู้จบ)</li></ul>` },
        { type: "run", title: "continue ข้ามเลขคู่, break ที่ 7", level: "ประยุกต์",
          concept: "continue ทำให้ข้ามการพิมพ์เลขคู่ ส่วน break ออกจากลูปเมื่อเจอ 7",
          code: j`
            public class BreakContinue {
                public static void main(String[] args) {
                    for (int number = 1; number <= 10; number++) {
                        if (number % 2 == 0) {
                            continue;
                        }
                        if (number == 7) {
                            break;
                        }
                        System.out.println(number);
                    }
                    System.out.println("After loop");
                }
            }`,
          steps: ["1 พิมพ์, 2 ข้าม, 3 พิมพ์, 4 ข้าม, 5 พิมพ์, 6 ข้าม", "7 เป็นคี่ ผ่าน continue แต่ break ทำงาน → ออก", "8–10 ไม่ถูกตรวจเลย"] },
        { type: "run", title: "หาจำนวนเฉพาะ: ลูปซ้อน + break", level: "ท้าทาย",
          concept: "สำหรับแต่ละ n ลองหารด้วย 2 ถึง √n ถ้าเจอตัวหารลงตัวก็ break ทันที (ไม่ต้องลองต่อ)",
          code: j`
            public class PrimesUpTo50 {
                public static void main(String[] args) {
                    int count = 0;
                    for (int n = 2; n <= 50; n++) {
                        boolean isPrime = true;
                        for (int d = 2; d * d <= n; d++) {
                            if (n % d == 0) {
                                isPrime = false;
                                break;          // ออกเฉพาะลูป d
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
          steps: ["ลูปนอกเลือก n ทีละค่า", "ตั้งสมมติฐาน isPrime = true แล้วพยายามหาตัวหาร (flag pattern)", "break ออกเฉพาะลูปใน ลูปนอกยังทำ n ถัดไป", "<code>d * d &lt;= n</code> เทียบเท่า d ≤ √n ลดจำนวนรอบได้มาก"] },
        { type: "run", label: "ทดลอง error 6.4.7", title: "unreachable statement", level: "ท้าทาย", expect: "compile-error",
          concept: "คำสั่งหลัง break ในบล็อกเดียวกันไม่มีทางทำงาน compiler จึงไม่ยอม",
          code: j`
            public class UnreachableAfterBreak {
                public static void main(String[] args) {
                    while (true) {
                        break;
                        System.out.println("Never reached");
                    }
                }
            }`,
          steps: ["<code>unreachable statement</code> ชี้ที่ println", "ย้าย println ไปหลังลูป หรือใส่ break ไว้ใน if"] },
        { type: "note", title: "Logic error: continue ข้าม update ใน while", html: pre(`
          int i = 1;
          while (i <= 5) {
              if (i % 2 == 0) continue;   // i = 2 → continue ก่อน i++ → ค้างที่ 2 ตลอด
              System.out.println(i);
              i++;
          }`) + `<p>แก้โดยย้าย <code>i++</code> ขึ้นไปก่อน continue หรือเปลี่ยนเป็น for loop</p>` },
        { type: "check", title: "นับรอบลูปซ้อน", html: pre(`
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
                    sum += i;
                    i++;
                }
                System.out.println("Loop sum = " + sum);
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
                    i -= 2;
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
                int rows = input.nextInt();
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
                long fact = 1;
                System.out.print(n + "! = 1");
                for (int i = 2; i <= n; i++) {
                    fact *= i;
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
                    if (score < 0 || score > 100) {
                        System.out.println("Out of range!");
                        wrong++;
                    }
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
                int max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;
                System.out.print("Scores (-1 to stop): ");
                int score = input.nextInt();
                while (score != -1) {
                    count++;
                    sum += score;
                    if (score > max) max = score;
                    if (score < min) min = score;
                    if (score >= 50) passed++;
                    score = input.nextInt();
                }
                if (count == 0) {
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
                    reversed = reversed * 10 + temp % 10;
                    temp /= 10;
                }
                System.out.println("Reversed: " + reversed);
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
                for (int attempt = 1; attempt <= 6; attempt++) {
                    System.out.print("Guess #" + attempt + ": ");
                    int guess = input.nextInt();
                    if (guess == secret) {
                        System.out.println("Correct! You used " + attempt + " guesses.");
                        found = true;
                        break;
                    } else if (guess > secret) {
                        System.out.println("Too high");
                    } else {
                        System.out.println("Too low");
                    }
                }
                if (!found) {
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
                for (int c = 1; c <= n; c++) System.out.printf("%4d", c);
                System.out.println();
                System.out.println("-".repeat(5 + 4 * n));
                for (int r = 1; r <= n; r++) {
                    System.out.printf("%3d |", r);
                    for (int c = 1; c <= n; c++) {
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
                for (int k = 1; k <= h; k++) printRow(k, h);
                for (int k = h - 1; k >= 1; k--) printRow(k, h);
            }

            static void printRow(int k, int h) {
                for (int s = 1; s <= h - k; s++) System.out.print(" ");
                for (int i = 1; i <= k; i++) System.out.print(i);
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
                    if (n < 2) continue;
                    boolean prime = true;
                    for (int d = 2; d * d <= n; d++) {
                        if (n % d == 0) { prime = false; break; }
                    }
                    if (prime) { System.out.print(n + " "); primeCount++; }
                }
                System.out.println("(" + primeCount + ")");
                System.out.print("Perfect: ");
                for (int n = Math.max(a, 2); n <= b; n++) {
                    int sum = 0;
                    for (int d = 1; d < n; d++) {
                        if (n % d == 0) sum += d;
                    }
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
                while (balance < goal) {
                    year++;
                    if (year >= 2) {
                        balance += YEARLY_DEPOSIT;
                        deposited += YEARLY_DEPOSIT;
                    }
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
