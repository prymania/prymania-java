import { j, c, pre } from "../lib.mjs";

export default {
  num: "S1", file: "side-quest-random.html", idPrefix: "S1", passPrefix: "side", utility: "SIDE QUEST 01",
  pageTitle: "บทเสริม: Random และเกมทายตัวเลข", shortName: "บทเสริม Random",
  tocLabel: "บทเสริม · Random", sidebarBottom: "สุ่มช่วงปิดทั้งสองด้านอย่างระวัง",
  kicker: "บทเสริม · Random", h1: "สุ่มตัวเลขและเกมทายคำตอบ",
  lead: "สร้างค่าที่เปลี่ยนได้ตามการรัน แล้วนำไปฝึกเงื่อนไข ลูป และการรับข้อมูลด้วยเกมทายตัวเลข",
  goals: ["เข้าใจช่วงค่าที่ Math.random คืน", "สุ่มจำนวนเต็มในช่วงที่กำหนด", "ใช้ Random object และ seed เพื่อทดสอบได้", "ออกแบบ loop เกมทายเลขพร้อมคำใบ้"],
  prev: { href: "../index.html#extras", label: "← บทเสริมทั้งหมด" },
  next: { href: "side-quest-timer.html", label: "Timer และ Thread →" },
  footer: "บทเสริม Random · เช็กขอบเขตช่วงสุ่มทุกครั้ง",
  introHeading: "สุ่มค่าอย่างตั้งใจ",
  introHtml: `<p>ก่อนเขียนสูตร ให้ระบุขอบเขตล่างและบนก่อนว่าแต่ละค่า<strong>รวมอยู่ในช่วงหรือไม่</strong> ความผิดพลาดเรื่อง inclusive/exclusive เป็นบั๊กที่พบบ่อย</p>
<div class="note-box"><span class="box-title">เกี่ยวกับ output ของการสุ่ม</span><p>ตัวอย่างที่ใช้ <code>Math.random()</code> หรือ <code>new Random()</code> แบบไม่กำหนด seed จะได้ผลต่างกันทุกครั้งที่รัน ผลที่แสดงเป็นเพียงการรันครั้งหนึ่ง ส่วนตัวอย่างที่ใช้ <code>new Random(seed)</code> จะได้ผลเหมือนกันทุกครั้ง จึงใช้ทดสอบได้</p></div>`,
  topics: [
    {
      num: "S1.1", toc: "สุ่มค่าด้วย Math.random", title: "Math.random และช่วง [0, 1)",
      blocks: [
        { type: "p", html: `<code>Math.random()</code> คืนค่า double ตั้งแต่ 0.0 <strong>รวม</strong> แต่ต่ำกว่า 1.0 (<strong>ไม่รวม</strong>) — เขียนแบบคณิตศาสตร์ว่า [0, 1)` },
        { type: "steps", title: "สร้างสูตรสุ่มจำนวนเต็ม min ถึง max (รวมทั้งสองขอบ)", items: [
          "นับจำนวนค่าที่เป็นไปได้: <code>count = max - min + 1</code> (1–6 มี 6 ค่า)",
          "คูณ: <code>Math.random() * count</code> ได้ช่วง [0, count)",
          "cast เป็น int ตัดเศษ: ได้ 0, 1, …, count − 1",
          "บวก min: ได้ min, …, max",
          "สูตร: <code>int v = min + (int) (Math.random() * (max - min + 1));</code>",
        ] },
        { type: "run", title: "ค่าดิบจาก Math.random", level: "พื้นฐาน",
          concept: "ดูหน้าตาค่าที่ได้ — ทุกค่าอยู่ระหว่าง 0 ถึงน้อยกว่า 1",
          code: j`
            public class RawRandom {
                public static void main(String[] args) {
                    for (int i = 1; i <= 5; i++) {
                        double r = Math.random();
                        System.out.printf("r = %.4f   r*6 = %.4f   (int)(r*6)+1 = %d%n", r, r * 6, (int) (r * 6) + 1);
                    }
                }
            }`,
          steps: ["r อยู่ใน [0, 1)", "r × 6 อยู่ใน [0, 6)", "(int) ตัดเศษ → 0–5 แล้ว + 1 → 1–6", "รันซ้ำจะได้ตัวเลขต่างจากนี้"] },
        { type: "run", title: "ทอยลูกเต๋า 6000 ครั้ง ตรวจว่ากระจายเท่ากัน", level: "ต่อยอด",
          concept: "ใช้อาเรย์นับความถี่ (บทที่ 8) แต่ละหน้าควรออกใกล้ 1000 ครั้ง ถ้าหน้า 6 ไม่เคยออกแปลว่าสูตรผิด",
          code: j`
            public class DiceFrequency {
                public static void main(String[] args) {
                    int[] count = new int[7];
                    for (int i = 0; i < 6000; i++) {
                        int roll = (int) (Math.random() * 6) + 1;
                        count[roll]++;
                    }
                    for (int face = 1; face <= 6; face++) {
                        System.out.printf("%d: %4d %s%n", face, count[face], "#".repeat(count[face] / 50));
                    }
                }
            }`,
          steps: ["count[roll]++ ใช้ค่าที่สุ่มเป็น index", "index 0 ไม่ใช้ จึงสร้างขนาด 7", "ความถี่ใกล้ 1000 แต่ไม่เท่ากันพอดี — นั่นคือธรรมชาติของการสุ่ม"] },
        { type: "run", label: "ทดลองบั๊ก S1.1.3", title: "ลืม +1 หรือวาง cast ผิดที่", level: "ประยุกต์",
          concept: "สองบั๊กที่พบบ่อย: ไม่บวก 1 (ได้ 0–5) และ cast ก่อนคูณ (ได้ 0 เสมอ)",
          code: j`
            public class RandomBugs {
                public static void main(String[] args) {
                    int min1 = 99, max1 = -1, min2 = 99, max2 = -1;
                    for (int i = 0; i < 10000; i++) {
                        int a = (int) (Math.random() * 6);
                        int b = (int) Math.random() * 6;
                        min1 = Math.min(min1, a); max1 = Math.max(max1, a);
                        min2 = Math.min(min2, b); max2 = Math.max(max2, b);
                    }
                    System.out.println("(int)(Math.random() * 6) range: " + min1 + " to " + max1);
                    System.out.println("(int) Math.random() * 6 range: " + min2 + " to " + max2);
                }
            }`,
          steps: ["แบบแรกได้ 0–5 (ลืม +1)", "แบบที่สอง: cast ทำก่อนคูณ (int) 0.xx = 0 → 0 × 6 = 0 ทุกครั้ง", "เทคนิคตรวจสูตร: สุ่มหลายพันครั้งแล้วดูค่าต่ำสุดและสูงสุดที่ได้"] },
        { type: "check", title: "สูตร", html: `<p>เขียนสูตรสุ่มจำนวนเต็มตั้งแต่ −5 ถึง 5</p>`, answer: `<p>count = 5 − (−5) + 1 = 11 → <code>int v = -5 + (int) (Math.random() * 11);</code></p>` },
      ],
    },
    {
      num: "S1.2", toc: "ใช้ java.util.Random", title: "ใช้ java.util.Random",
      blocks: [
        { type: "table", head: ["เมธอด", "คืนค่า"], rows: [
          ["<code>nextInt(bound)</code>", "int ใน [0, bound)"], ["<code>nextInt(origin, bound)</code> (Java 17+)", "int ใน [origin, bound)"],
          ["<code>nextDouble()</code>", "double ใน [0, 1)"], ["<code>nextBoolean()</code>", "true หรือ false"],
        ] },
        { type: "run", title: "สุ่มจำนวนเต็มในช่วงด้วย nextInt", level: "พื้นฐาน",
          concept: "สร้าง Random หนึ่งตัวแล้วเรียกซ้ำ — <code>nextInt(11) + 20</code> ได้ 20–30",
          code: j`
            import java.util.Random;

            public class RandomRange {
                public static void main(String[] args) {
                    Random rng = new Random();
                    for (int i = 0; i < 8; i++) {
                        System.out.print((rng.nextInt(11) + 20) + " ");
                    }
                    System.out.println();
                    System.out.println("coin: " + (rng.nextBoolean() ? "heads" : "tails"));
                    System.out.println("1-6 (Java 17+): " + rng.nextInt(1, 7));
                }
            }`,
          steps: ["nextInt(11) → 0–10, + 20 → 20–30", "nextBoolean จำลองการโยนเหรียญ", "nextInt(1, 7) → ขอบบนไม่รวม จึงได้ 1–6"] },
        { type: "run", title: "seed: สุ่มแบบทำซ้ำได้", level: "ต่อยอด",
          concept: "<code>new Random(42)</code> ให้ลำดับตัวเลขเดิมทุกครั้งที่รัน — ใช้ทดสอบโปรแกรมที่มีการสุ่ม และ output ด้านขวาจึงเหมือนกับที่นิสิตรันได้",
          code: j`
            import java.util.Random;

            public class SeededRandom {
                public static void main(String[] args) {
                    Random a = new Random(42);
                    Random b = new Random(42);
                    Random c = new Random(7);
                    for (int i = 0; i < 6; i++) {
                        System.out.printf("a=%d  b=%d  c=%d%n", a.nextInt(100), b.nextInt(100), c.nextInt(100));
                    }
                }
            }`,
          steps: ["a และ b ใช้ seed เดียวกัน → ได้ลำดับเดียวกันทุกค่า", "c ใช้ seed ต่าง → ลำดับต่าง", "ตัวเลขเหล่านี้จะเหมือนเดิมทุกครั้งที่รัน"] },
        { type: "run", title: "สุ่มเลือกจากอาเรย์และสับไพ่", level: "ประยุกต์",
          concept: "สุ่ม index แทนการสุ่มค่าโดยตรง: <code>arr[rng.nextInt(arr.length)]</code> และใช้ <code>Collections.shuffle</code> สับลำดับรายการ",
          code: j`
            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;
            import java.util.Random;

            public class PickAndShuffle {
                public static void main(String[] args) {
                    Random rng = new Random(2026);
                    String[] menu = {"Pad Thai", "Fried rice", "Som tam", "Khao man gai", "Noodle soup"};
                    System.out.println("Today's lunch: " + menu[rng.nextInt(menu.length)]);

                    List<String> students = new ArrayList<>(List.of("Mali", "Beam", "Nida", "Ploy", "Tan", "Pim"));
                    Collections.shuffle(students, rng);
                    System.out.println("Shuffled: " + students);
                    System.out.println("Team A: " + students.subList(0, 3));
                    System.out.println("Team B: " + students.subList(3, 6));
                }
            }`,
          steps: ["nextInt(menu.length) → index 0–4 ถูกต้องเสมอแม้เปลี่ยนจำนวนเมนู", "shuffle(list, rng) ใช้ seed ทำให้ผลทำซ้ำได้", "subList แบ่งทีมหลังสับแล้ว"] },
        { type: "check", title: "nextInt", html: `<p><code>rng.nextInt(5) * 2 + 1</code> ได้ค่าอะไรได้บ้าง</p>`, answer: `<p>nextInt(5) ได้ 0–4 → × 2 + 1 → <strong>1, 3, 5, 7, 9</strong> (เลขคี่ 1–9)</p>` },
      ],
    },
    {
      num: "S1.3", toc: "เกมทายตัวเลข", title: "เกมทายตัวเลข",
      blocks: [
        { type: "steps", title: "ออกแบบเกม", items: ["สุ่มคำตอบ 1–100 หนึ่งครั้งก่อนเริ่มลูป", "วน: รับคำทาย → นับครั้ง → เทียบกับคำตอบ → บอก Too high/Too low", "หยุดเมื่อทายถูก แล้วสรุปจำนวนครั้ง", "เพิ่มเติม: จำกัดจำนวนครั้ง, ตรวจค่านอกช่วง, เล่นใหม่"] },
        { type: "run", title: "เกมพื้นฐาน (ใช้ seed เพื่อให้ทดสอบได้)", level: "ต่อยอด", stdin: "50\n25\n40\n35\n37",
          concept: "while วนจนทายถูก — ใช้ seed 7 ทำให้คำตอบเหมือนเดิมทุกครั้ง จึงเขียน input ทดสอบล่วงหน้าได้ (ในเกมจริงใช้ new Random())",
          code: j`
            import java.util.Random;
            import java.util.Scanner;

            public class GuessGame {
                public static void main(String[] args) {
                    Random rng = new Random(7);
                    int secret = rng.nextInt(100) + 1;
                    Scanner input = new Scanner(System.in);
                    int tries = 0;
                    int guess = 0;
                    while (guess != secret) {
                        System.out.print("Guess (1-100): ");
                        guess = input.nextInt();
                        tries++;
                        if (guess > secret) System.out.println("  Too high");
                        else if (guess < secret) System.out.println("  Too low");
                    }
                    System.out.println("Correct! " + secret + " in " + tries + " tries");
                }
            }`,
          steps: ["สุ่มคำตอบครั้งเดียวก่อนลูป (ถ้าสุ่มในลูปคำตอบจะเปลี่ยนทุกรอบ!)", "ทายแบบแบ่งครึ่ง (binary search) ช่วยให้ได้ภายใน 7 ครั้งเสมอ", "guess เริ่มที่ 0 ซึ่งไม่ใช่คำตอบที่เป็นไปได้ จึงเข้าลูปครั้งแรกแน่นอน"] },
        { type: "run", title: "จำกัดจำนวนครั้งและตรวจค่านอกช่วง", level: "ประยุกต์", stdin: "150\n40\n80\n60\n70\n65",
          concept: "for นับครั้ง + break เมื่อถูก ค่านอกช่วงไม่นับเป็นครั้ง (ใช้ continue หลังลดตัวนับ) และเฉลยเมื่อหมดสิทธิ์",
          code: j`
            import java.util.Random;
            import java.util.Scanner;

            public class LimitedGuess {
                public static void main(String[] args) {
                    final int MAX_TRIES = 5;
                    int secret = new Random(99).nextInt(100) + 1;
                    Scanner input = new Scanner(System.in);
                    boolean won = false;
                    for (int t = 1; t <= MAX_TRIES; t++) {
                        System.out.print("Try " + t + "/" + MAX_TRIES + ": ");
                        int g = input.nextInt();
                        if (g < 1 || g > 100) {
                            System.out.println("  Out of range, not counted");
                            t--;
                            continue;
                        }
                        if (g == secret) {
                            won = true;
                            System.out.println("  Correct!");
                            break;
                        }
                        System.out.println(g > secret ? "  Too high" : "  Too low");
                    }
                    if (!won) System.out.println("Out of tries. The number was " + secret);
                }
            }`,
          steps: ["150 นอกช่วง → t-- แล้ว continue ไม่เสียสิทธิ์", "ทายครบ 5 ครั้งไม่ถูก → แสดงคำตอบ", "won เป็น flag แยกกรณีชนะ/แพ้หลังลูป"] },
      ],
    },
    {
      num: "S1.4", toc: "จำนวนครั้งและทดสอบ", title: "ทดสอบโปรแกรมที่มีการสุ่ม",
      blocks: [
        { type: "p", html: "โปรแกรมที่สุ่มทดสอบยาก เพราะผลไม่เหมือนเดิม เทคนิคหลัก: (1) แยกการสุ่มออกจาก logic — ให้เมธอดรับค่าที่สุ่มแล้วเป็น parameter (2) ใช้ seed (3) ทดสอบด้วยการรันจำนวนมากแล้วตรวจคุณสมบัติ เช่น ค่าทั้งหมดอยู่ในช่วง" },
        { type: "run", title: "แยก logic ออกจากการสุ่ม แล้วทดสอบ logic ตรง ๆ", level: "ประยุกต์",
          concept: "เมธอด <code>hint(guess, secret)</code> ไม่สุ่มเอง จึงทดสอบทุกกรณีได้แน่นอน ส่วน <code>randomInRange</code> ทดสอบด้วยการรันหมื่นครั้งดูว่าได้ครบทุกค่าและไม่หลุดช่วง",
          code: j`
            import java.util.Random;

            public class RandomTesting {
                public static void main(String[] args) {
                    System.out.println(hint(30, 42) + " / " + hint(50, 42) + " / " + hint(42, 42));

                    Random rng = new Random();
                    int min = Integer.MAX_VALUE, max = Integer.MIN_VALUE;
                    boolean[] seen = new boolean[11];
                    for (int i = 0; i < 10000; i++) {
                        int v = randomInRange(rng, 5, 10);
                        min = Math.min(min, v);
                        max = Math.max(max, v);
                        seen[v] = true;
                    }
                    boolean allSeen = true;
                    for (int v = 5; v <= 10; v++) allSeen &= seen[v];
                    System.out.println("range check: min=" + min + " max=" + max + " allValuesSeen=" + allSeen);
                }

                static String hint(int guess, int secret) {
                    if (guess > secret) return "Too high";
                    if (guess < secret) return "Too low";
                    return "Correct";
                }

                static int randomInRange(Random rng, int min, int max) {
                    return min + rng.nextInt(max - min + 1);
                }
            }`,
          steps: ["hint ทดสอบได้ตรง ๆ ทุกกรณี", "randomInRange ถูกต้องเมื่อ min=5, max=10 และทุกค่า 5–10 ปรากฏ", "แม้ไม่ใช้ seed ผลการตรวจคุณสมบัติก็เหมือนเดิมทุกครั้ง"] },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "สุ่มเลขสองหลัก", html: `<p>สุ่มจำนวนเต็มตั้งแต่ 10 ถึง 99 จำนวน 10 ค่าด้วย <code>Math.random()</code> พิมพ์ในบรรทัดเดียว แล้วตรวจด้วยการสุ่ม 100,000 ครั้งว่าค่าต่ำสุดคือ 10 และสูงสุดคือ 99</p>`,
      spec: ["ใช้สูตร min + (int)(Math.random() * (max − min + 1))", "ผลลัพธ์ 10 ค่าแรกจะต่างจากตัวอย่าง แต่บรรทัดตรวจช่วงต้องได้ 10 และ 99"],
      solution: j`
        public class TwoDigit {
            public static void main(String[] args) {
                for (int i = 0; i < 10; i++) {
                    System.out.print(10 + (int) (Math.random() * 90) + " ");
                }
                System.out.println();
                int min = 100, max = 0;
                for (int i = 0; i < 100000; i++) {
                    int v = 10 + (int) (Math.random() * 90);
                    min = Math.min(min, v);
                    max = Math.max(max, v);
                }
                System.out.println("min = " + min + ", max = " + max);
            }
        }` },
    { level: 1, title: "โยนเหรียญ", html: `<p>ใช้ <code>new Random(5)</code> โยนเหรียญ 20 ครั้ง แสดงผลเป็น H/T ต่อกัน นับจำนวนหัวและก้อย และหาจำนวนครั้งที่ออกหน้าเดิม<strong>ติดกันยาวที่สุด</strong></p>`,
      spec: ["ใช้ nextBoolean()", "เพราะใช้ seed 5 ผลต้องตรงกับตัวอย่างทุกตัวอักษร"],
      solution: j`
        import java.util.Random;

        public class CoinFlips {
            public static void main(String[] args) {
                Random rng = new Random(5);
                int heads = 0, longest = 0, run = 0;
                char prev = ' ';
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < 20; i++) {
                    char f = rng.nextBoolean() ? 'H' : 'T';
                    sb.append(f);
                    if (f == 'H') heads++;
                    run = (f == prev) ? run + 1 : 1;
                    longest = Math.max(longest, run);
                    prev = f;
                }
                System.out.println(sb);
                System.out.println("Heads: " + heads + ", Tails: " + (20 - heads));
                System.out.println("Longest streak: " + longest);
            }
        }` },
    { level: 2, title: "เกมเป่ายิ้งฉุบกับคอมพิวเตอร์", html: `<p>ผู้ใช้ป้อน rock / paper / scissors (หรือ quit เพื่อจบ) คอมพิวเตอร์สุ่มเลือก (<code>new Random(3)</code>) แสดงว่าใครชนะในแต่ละรอบ และสรุปสถิติ ชนะ/แพ้/เสมอ เมื่อจบ ถ้าป้อนคำอื่นให้แจ้งว่าไม่ถูกต้องและไม่นับรอบ</p>`,
      spec: ["เก็บตัวเลือกในอาเรย์ String", "เขียนเมธอด <code>int judge(int user, int cpu)</code> คืน 1 ชนะ, −1 แพ้, 0 เสมอ", "สุ่มหลังตรวจว่า input ถูกต้องแล้วเท่านั้น"], stdin: "rock\npaper\nlizard\nscissors\nrock\nquit",
      solution: j`
        import java.util.Random;
        import java.util.Scanner;

        public class RockPaperScissors {
            static final String[] CHOICES = {"rock", "paper", "scissors"};

            public static void main(String[] args) {
                Random rng = new Random(3);
                Scanner in = new Scanner(System.in);
                int win = 0, lose = 0, draw = 0;
                while (true) {
                    System.out.print("Your move: ");
                    String move = in.next().toLowerCase();
                    if (move.equals("quit")) break;
                    int user = indexOf(move);
                    if (user < 0) {
                        System.out.println("  invalid move");
                        continue;
                    }
                    int cpu = rng.nextInt(3);
                    int r = judge(user, cpu);
                    System.out.println("  CPU: " + CHOICES[cpu] + " -> " + (r > 0 ? "you win" : r < 0 ? "you lose" : "draw"));
                    if (r > 0) win++; else if (r < 0) lose++; else draw++;
                }
                System.out.println("Win " + win + ", Lose " + lose + ", Draw " + draw);
            }

            static int indexOf(String move) {
                for (int i = 0; i < CHOICES.length; i++) if (CHOICES[i].equals(move)) return i;
                return -1;
            }

            static int judge(int user, int cpu) {
                if (user == cpu) return 0;
                return (user - cpu + 3) % 3 == 1 ? 1 : -1;
            }
        }`, explain: "<code>(user − cpu + 3) % 3 == 1</code> คือผู้ใช้ชนะ เพราะในลำดับ rock(0) → paper(1) → scissors(2) ตัวที่อยู่ถัดไปหนึ่งตำแหน่ง (วนรอบ) ชนะตัวก่อนหน้า" },
    { level: 2, title: "สุ่มรหัสผ่านตามกฎ", html: `<p>เขียนเมธอด <code>String generatePassword(Random rng, int length)</code> สร้างรหัสผ่านยาว length (≥ 8) ที่<strong>รับประกัน</strong>ว่ามีตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ (!@#$%) อย่างน้อยอย่างละหนึ่งตัว ตำแหน่งต้องสุ่มด้วย (ไม่ใช่ขึ้นต้นด้วยตัวพิมพ์ใหญ่เสมอ) ใช้ seed 2026 สร้าง 3 รหัสยาว 10 และตรวจกฎด้วยโค้ด</p>`,
      spec: ["เลือกอักขระบังคับ 4 ตัวก่อน ที่เหลือสุ่มจากทุกกลุ่ม แล้วสลับตำแหน่ง (shuffle)", "เขียนเมธอดตรวจ <code>boolean isValid(String pw)</code>"],
      solution: j`
        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;
        import java.util.Random;

        public class PasswordGenerator {
            static final String UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ", LOWER = "abcdefghijkmnopqrstuvwxyz",
                DIGITS = "23456789", SPECIAL = "!@#$%";

            public static void main(String[] args) {
                Random rng = new Random(2026);
                for (int i = 0; i < 3; i++) {
                    String pw = generatePassword(rng, 10);
                    System.out.println(pw + "  valid=" + isValid(pw));
                }
            }

            static String generatePassword(Random rng, int length) {
                String all = UPPER + LOWER + DIGITS + SPECIAL;
                List<Character> chars = new ArrayList<>();
                for (String group : new String[]{UPPER, LOWER, DIGITS, SPECIAL}) chars.add(pick(rng, group));
                while (chars.size() < length) chars.add(pick(rng, all));
                Collections.shuffle(chars, rng);
                StringBuilder sb = new StringBuilder();
                for (char c : chars) sb.append(c);
                return sb.toString();
            }

            static char pick(Random rng, String s) {
                return s.charAt(rng.nextInt(s.length()));
            }

            static boolean isValid(String pw) {
                boolean u = false, l = false, d = false, s = false;
                for (char c : pw.toCharArray()) {
                    if (Character.isUpperCase(c)) u = true;
                    else if (Character.isLowerCase(c)) l = true;
                    else if (Character.isDigit(c)) d = true;
                    else if (SPECIAL.indexOf(c) >= 0) s = true;
                }
                return pw.length() >= 8 && u && l && d && s;
            }
        }`, explain: "ตัดตัวอักษรที่สับสนง่ายอย่าง O/0, I/l/1 ออกจากกลุ่มอักขระ เพื่อให้ผู้ใช้อ่านรหัสได้ถูก" },
    { level: 3, title: "จำลองมอนติคาร์โล: ประมาณค่า π", html: `<p>สุ่มจุด (x, y) ในสี่เหลี่ยมจัตุรัส [0, 1) × [0, 1) จำนวน N จุด นับจุดที่อยู่ในวงกลมหนึ่งในสี่ (x² + y² ≤ 1) แล้วประมาณ π ≈ 4 × (จุดในวง / N) ทำสำหรับ N = 100, 10,000 และ 1,000,000 ด้วย <code>new Random(1)</code> แสดงค่าประมาณ และความคลาดเคลื่อนจาก Math.PI</p>`,
      spec: ["เขียนเมธอด <code>double estimatePi(Random rng, int n)</code>", "แสดงตาราง N, ค่าประมาณ, error ทศนิยม 5 ตำแหน่ง", "อธิบายว่าทำไม N มากขึ้นค่าจึงแม่นขึ้น"],
      solution: j`
        import java.util.Random;

        public class MonteCarloPi {
            public static void main(String[] args) {
                Random rng = new Random(1);
                System.out.printf("%10s %10s %10s%n", "N", "estimate", "error");
                for (int n : new int[]{100, 10_000, 1_000_000}) {
                    double pi = estimatePi(rng, n);
                    System.out.printf("%,10d %10.5f %10.5f%n", n, pi, Math.abs(pi - Math.PI));
                }
            }

            static double estimatePi(Random rng, int n) {
                int inside = 0;
                for (int i = 0; i < n; i++) {
                    double x = rng.nextDouble(), y = rng.nextDouble();
                    if (x * x + y * y <= 1) inside++;
                }
                return 4.0 * inside / n;
            }
        }`, explain: "พื้นที่วงกลมหนึ่งในสี่ = π/4 ของสี่เหลี่ยม สัดส่วนจุดที่ตกในวงจึงเข้าใกล้ π/4 เมื่อจำนวนจุดมากขึ้น (กฎของจำนวนมาก) — ความคลาดเคลื่อน<em>โดยเฉลี่ย</em>ลดลงตาม N แต่การรันครั้งหนึ่งอาจไม่ดีขึ้นทุกขั้น ดังที่เห็นในตัวอย่างว่า N = 1,000,000 คลาดเคลื่อนพอ ๆ กับ 10,000" },
    { level: 3, title: "เกมทายตัวเลขแบบหลายรอบพร้อมสถิติ", html: `<p>ขยายเกมทายตัวเลขให้เล่นได้หลายรอบ: แต่ละรอบสุ่มคำตอบใหม่ (ใช้ <code>new Random(11)</code> ตัวเดียวตลอดเกม) จำกัด 7 ครั้งต่อรอบ จบรอบแล้วถาม <code>Play again? (y/n)</code> เมื่อเลิกเล่นให้สรุป: จำนวนรอบ, ชนะกี่รอบ, จำนวนครั้งเฉลี่ยในรอบที่ชนะ และสถิติดีที่สุด</p>`,
      spec: ["แยกเมธอด <code>int playRound(Scanner in, int secret)</code> คืนจำนวนครั้งที่ใช้ หรือ −1 ถ้าแพ้", "เก็บผลของรอบที่ชนะใน ArrayList&lt;Integer&gt;", "ตัวอย่างใช้ seed 11: คำตอบรอบแรกคือ 39 รอบที่สองคือ 69 (ตัวอย่างแพ้รอบที่สอง)"], stdin: "50\n25\n37\n39\ny\n50\n75\n62\n68\n70\n71\n72\nn",
      solution: j`
        import java.util.ArrayList;
        import java.util.Random;
        import java.util.Scanner;

        public class MultiRoundGuess {
            public static void main(String[] args) {
                Random rng = new Random(11);
                Scanner in = new Scanner(System.in);
                ArrayList<Integer> wins = new ArrayList<>();
                int rounds = 0;
                String again;
                do {
                    rounds++;
                    System.out.println("== Round " + rounds + " ==");
                    int result = playRound(in, rng.nextInt(100) + 1);
                    if (result > 0) wins.add(result);
                    System.out.print("Play again? (y/n) ");
                    again = in.next();
                } while (again.equalsIgnoreCase("y"));
                System.out.println("Rounds: " + rounds + ", Wins: " + wins.size());
                if (!wins.isEmpty()) {
                    int sum = 0, best = Integer.MAX_VALUE;
                    for (int w : wins) { sum += w; best = Math.min(best, w); }
                    System.out.printf("Average tries: %.2f, Best: %d%n", (double) sum / wins.size(), best);
                }
            }

            static int playRound(Scanner in, int secret) {
                for (int t = 1; t <= 7; t++) {
                    System.out.print("Guess " + t + ": ");
                    int g = in.nextInt();
                    if (g == secret) {
                        System.out.println("  Correct in " + t);
                        return t;
                    }
                    System.out.println(g > secret ? "  Too high" : "  Too low");
                }
                System.out.println("  Lost! It was " + secret);
                return -1;
            }
        }` },
  ],
};
