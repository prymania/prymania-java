import { j, c, pre } from "../lib.mjs";

export default {
  num: 5, file: "chapter-05.html",
  pageTitle: "บทที่ 5: เงื่อนไขและการตัดสินใจ", shortName: "บทที่ 5",
  tocLabel: "บทที่ 5 · ให้โปรแกรมตัดสินใจ", sidebarBottom: "เงื่อนไขเปลี่ยนข้อมูลให้เป็นการตัดสินใจ",
  kicker: "บทที่ 5 · ให้โปรแกรมเลือกทำงาน", h1: "เงื่อนไขและการตัดสินใจ",
  lead: "สอนให้โปรแกรมตอบสนองต่อข้อมูลที่แตกต่างกัน ด้วย boolean การเปรียบเทียบ และโครงสร้าง if หรือ switch",
  goals: ["อ่านผลนิพจน์เปรียบเทียบเป็น true หรือ false", "รวมเงื่อนไขด้วย &amp;&amp;, || และ !", "เลือกใช้ if/else กับ switch", "จัดลำดับเงื่อนไขไม่ให้กรณีสำคัญถูกบัง"],
  prev: { href: "chapter-04.html", label: "← บทที่ 4" },
  next: { href: "chapter-06.html", label: "บทที่ 6: การทำซ้ำ →" },
  footer: "บทที่ 5 · ทดสอบค่าขอบทุกเงื่อนไข",
  introHeading: "5. เปลี่ยนเงื่อนไขให้เป็นเส้นทางของโปรแกรม",
  introHtml: `<p>เงื่อนไขคือนิพจน์ที่ให้ผลเป็น <code>true</code> หรือ <code>false</code> โปรแกรมใช้ผลนี้เลือกคำสั่งที่จะทำต่อ — เหมือนข้าวหลามตัดใน Flowchart บทที่ 1 บทนี้เริ่มจากการสร้างค่า boolean ไปจนถึงการเลือกทางหลายทาง</p>`,
  topics: [
    {
      num: "5.1", toc: "ค่าจริงและการเปรียบเทียบ", title: "boolean และตัวดำเนินการเปรียบเทียบ",
      blocks: [
        { type: "p", html: `<code>boolean</code> เก็บได้เพียง <code>true</code> หรือ <code>false</code> นิพจน์เปรียบเทียบ เช่น <code>score &gt;= 50</code> จะ<em>คำนวณ</em>ออกมาเป็นค่า boolean ที่นำไปเก็บในตัวแปรหรือใช้ใน if ได้` },
        { type: "table", head: ["ตัวดำเนินการ", "ความหมาย", "ตัวอย่าง (x = 7)", "ผล"], rows: [
          ["<code>==</code>", "เท่ากับ", "<code>x == 7</code>", "true"], ["<code>!=</code>", "ไม่เท่ากับ", "<code>x != 7</code>", "false"],
          ["<code>&gt;</code>", "มากกว่า", "<code>x &gt; 10</code>", "false"], ["<code>&lt;</code>", "น้อยกว่า", "<code>x &lt; 10</code>", "true"],
          ["<code>&gt;=</code>", "มากกว่าหรือเท่ากับ", "<code>x &gt;= 7</code>", "true"], ["<code>&lt;=</code>", "น้อยกว่าหรือเท่ากับ", "<code>x &lt;= 6</code>", "false"],
        ] },
        { type: "run", title: "นิพจน์เปรียบเทียบให้ค่า boolean", level: "พื้นฐาน",
          concept: "เปรียบเทียบได้ผลเป็นค่า true/false ที่เก็บในตัวแปรหรือพิมพ์ออกมาได้เหมือนค่าอื่น",
          code: j`
            public class Comparisons {
                public static void main(String[] args) {
                    int score = 72;
                    boolean passed = score >= 50;
                    boolean perfect = score == 100;
                    System.out.println("passed = " + passed);
                    System.out.println("perfect = " + perfect);
                    System.out.println("score < 80 ? " + (score < 80));
                    System.out.println("score != 72 ? " + (score != 72));
                }
            }`,
          steps: ["72 ≥ 50 → true", "72 == 100 → false", "ต้องมีวงเล็บรอบนิพจน์เปรียบเทียบเมื่อต่อข้อความ"] },
        { type: "run", label: "ทดลอง error 5.1.2", title: "ใช้ = แทน ==", level: "ต่อยอด", expect: "compile-error",
          concept: "<code>=</code> คือการกำหนดค่า ส่วน <code>==</code> คือการเปรียบเทียบ if ต้องการค่า boolean จึงคอมไพล์ไม่ผ่าน",
          code: j`
            public class AssignInIf {
                public static void main(String[] args) {
                    int score = 72;
                    if (score = 100) {
                        System.out.println("Perfect!");
                    }
                }
            }`,
          steps: ["<code>score = 100</code> มีชนิดเป็น int", "if ต้องการ boolean → <code>int cannot be converted to boolean</code>", "แก้เป็น <code>score == 100</code>"] },
        { type: "run", title: "เปรียบเทียบ String ต้องใช้ equals", level: "ประยุกต์", stdin: "admin",
          concept: "<code>==</code> กับ String เปรียบเทียบว่าเป็น<em>ออบเจ็กต์เดียวกัน</em>หรือไม่ ไม่ใช่เนื้อหา ต้องใช้ <code>.equals()</code> (หรือ <code>.equalsIgnoreCase()</code> ถ้าไม่สนตัวพิมพ์)",
          code: j`
            import java.util.Scanner;

            public class StringCompare {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Username: ");
                    String user = input.next();
                    System.out.println("user == \"admin\"      -> " + (user == "admin"));
                    System.out.println("user.equals(\"admin\") -> " + user.equals("admin"));
                    System.out.println("equalsIgnoreCase(\"ADMIN\") -> " + user.equalsIgnoreCase("ADMIN"));
                }
            }`,
          steps: ["ผู้ใช้พิมพ์ admin", "<code>==</code> ได้ false เพราะ String ที่อ่านจาก Scanner เป็นคนละออบเจ็กต์กับ \"admin\" ในโค้ด", "<code>equals</code> เปรียบเทียบตัวอักษร → true", "จำไว้: <strong>String ใช้ equals เสมอ</strong>"] },
        { type: "run", title: "เปรียบเทียบ double อย่างปลอดภัย", level: "ท้าทาย",
          concept: "double เก็บค่าแบบประมาณ ห้ามใช้ <code>==</code> ตรง ๆ ให้ตรวจว่า “ต่างกันน้อยมาก” ด้วย <code>Math.abs(a - b) &lt; 1e-9</code>",
          code: j`
            public class DoubleCompare {
                public static void main(String[] args) {
                    double a = 0.1 + 0.2;
                    double b = 0.3;
                    System.out.println("a = " + a);
                    System.out.println("a == b ? " + (a == b));
                    System.out.println("close enough ? " + (Math.abs(a - b) < 1e-9));
                }
            }`,
          steps: ["0.1 + 0.2 ได้ 0.30000000000000004", "<code>==</code> จึงได้ false", "ผลต่าง 0.00000000000000004 น้อยกว่า 0.000000001 → ถือว่าเท่ากัน"] },
        { type: "check", title: "ผลของนิพจน์", html: `<p>ถ้า <code>int a = 5, b = 8;</code> ผลของ <code>a * 2 &gt; b</code>, <code>a + 3 == b</code>, <code>b % a != 3</code> คืออะไร</p>`, answer: `<p>10 &gt; 8 → <strong>true</strong>; 8 == 8 → <strong>true</strong>; 8 % 5 = 3, 3 != 3 → <strong>false</strong></p>` },
      ],
    },
    {
      num: "5.2", toc: "ตัวดำเนินการตรรกะ", title: "รวมเงื่อนไขด้วย AND, OR และ NOT",
      blocks: [
        { type: "p", html: `<code>&amp;&amp;</code> (AND) เป็นจริงเมื่อ<strong>ทั้งสอง</strong>เงื่อนไขเป็นจริง, <code>||</code> (OR) เป็นจริงเมื่อ<strong>อย่างน้อยหนึ่ง</strong>เงื่อนไขเป็นจริง และ <code>!</code> (NOT) กลับค่าจริงเป็นเท็จ` },
        { type: "table", head: ["A", "B", "A &amp;&amp; B", "A || B", "!A"], rows: [["true", "true", "true", "true", "false"], ["true", "false", "false", "true", "false"], ["false", "true", "false", "true", "true"], ["false", "false", "false", "false", "true"]] },
        { type: "run", title: "ตรวจช่วงตัวเลขด้วย &&", level: "พื้นฐาน",
          concept: "ภาษาคณิตศาสตร์เขียน 18 ≤ age ≤ 25 ได้ แต่ Java ต้องแยกเป็นสองเงื่อนไขแล้วเชื่อมด้วย <code>&amp;&amp;</code>",
          code: j`
            public class RangeCheck {
                public static void main(String[] args) {
                    int age = 19;
                    boolean inRange = age >= 18 && age <= 25;
                    boolean outOfRange = age < 18 || age > 25;
                    System.out.println("18-25? " + inRange);
                    System.out.println("outside? " + outOfRange);
                    System.out.println("not in range? " + !inRange);
                }
            }`,
          steps: ["19 ≥ 18 true และ 19 ≤ 25 true → true", "นอกช่วงคือ “น้อยกว่า 18 <em>หรือ</em> มากกว่า 25” → false", "<code>!inRange</code> ให้ผลเท่ากับ outOfRange"] },
        { type: "run", title: "สิทธิ์ส่วนลด: ผสม && กับ ||", level: "ต่อยอด",
          concept: "<code>&amp;&amp;</code> ทำก่อน <code>||</code> เสมอ ใช้วงเล็บเพื่อบอกความหมายให้ชัด",
          code: j`
            public class DiscountRule {
                public static void main(String[] args) {
                    boolean isStudent = false;
                    boolean hasPass = true;
                    int age = 16;

                    boolean ruleA = (isStudent || hasPass) && age >= 18;
                    boolean ruleB = isStudent || hasPass && age >= 18;
                    boolean ruleC = isStudent || (hasPass && age >= 18);

                    System.out.println("A = " + ruleA);
                    System.out.println("B = " + ruleB);
                    System.out.println("C = " + ruleC);
                }
            }`,
          steps: ["A: (false || true) = true, && (16 ≥ 18 false) → false", "B: ไม่มีวงเล็บ && ทำก่อน → false || (true && false) → false", "C: เขียนวงเล็บแบบเดียวกับ B จึงได้ผลเท่ากัน", "ลอง isStudent = true: A เป็น false (อายุไม่ถึง) แต่ B, C เป็น true — ความหมายต่างกันจริง"],
          tryIt: "เปลี่ยน isStudent = true แล้วดูว่า A กับ B ต่างกันอย่างไร" },
        { type: "run", title: "Short-circuit: หยุดตรวจเมื่อรู้คำตอบแล้ว", level: "ประยุกต์",
          concept: "ถ้าด้านซ้ายของ <code>&amp;&amp;</code> เป็น false Java ไม่ตรวจด้านขวาเลย ใช้ป้องกันการหารด้วยศูนย์ได้",
          code: j`
            public class ShortCircuit {
                public static void main(String[] args) {
                    int total = 100;
                    int count = 0;
                    if (count != 0 && total / count > 10) {
                        System.out.println("Average above 10");
                    } else {
                        System.out.println("No data or average too low");
                    }
                }
            }`,
          steps: ["<code>count != 0</code> เป็น false", "เนื่องจาก false && อะไรก็ได้ = false Java จึงข้าม <code>total / count</code>", "ไม่เกิด ArithmeticException", "ถ้าสลับเป็น <code>total / count &gt; 10 &amp;&amp; count != 0</code> จะ error ทันที"] },
        { type: "run", title: "ปีอธิกสุรทิน: เงื่อนไขซับซ้อน", level: "ท้าทาย",
          concept: "ปีอธิกสุรทิน = หารด้วย 4 ลงตัว <em>และ</em> ไม่ลงตัวด้วย 100 <em>หรือ</em> หารด้วย 400 ลงตัว",
          code: j`
            public class LeapYear {
                public static void main(String[] args) {
                    int[] years = {2024, 2025, 1900, 2000};
                    for (int year : years) {
                        boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
                        System.out.println(year + " leap? " + leap);
                    }
                }
            }`,
          steps: ["2024: หาร 4 ลงตัว ไม่ลงตัวด้วย 100 → true", "2025: หาร 4 ไม่ลงตัว และไม่ลงตัวด้วย 400 → false", "1900: หาร 100 ลงตัว ทำให้วงเล็บแรก false และ 1900 % 400 ≠ 0 → false", "2000: หาร 400 ลงตัว → true"],
          after: "ตัวอย่างนี้ใช้อาเรย์และลูปวนทดสอบหลายปี (จะเรียนในบทที่ 6 และ 8) เพื่อให้เห็นทุกกรณีพร้อมกัน ตอนนี้ให้โฟกัสที่บรรทัด boolean leap" },
        { type: "check", title: "De Morgan", html: `<p><code>!(a &gt; 0 &amp;&amp; b &gt; 0)</code> เขียนใหม่โดยไม่ใช้ ! ด้านนอกได้อย่างไร</p>`, answer: `<p><code>a &lt;= 0 || b &lt;= 0</code> — กลับ && เป็น || และกลับเงื่อนไขย่อยทุกตัว (กฎของ De Morgan)</p>` },
      ],
    },
    {
      num: "5.3", toc: "if, else if และ else", title: "if, else if และ else",
      blocks: [
        { type: "concept", title: "รูปแบบของ if ทั้ง 3 แบบ", html: pre(`
          if (เงื่อนไข) {              if (เงื่อนไข) {              if (เงื่อนไข1) {
              ทำเมื่อจริง                 ทำเมื่อจริง                  ...
          }                           } else {                     } else if (เงื่อนไข2) {
                                          ทำเมื่อเท็จ                  ...
                                      }                            } else {
          ① ทางเลือกเดียว             ② สองทาง                         ทำเมื่อไม่ตรงข้อใด
                                                                   }
                                                                   ③ หลายทาง`) + `<p>if-else if ตรวจ<strong>จากบนลงล่าง</strong> และทำเฉพาะกรณีแรกที่เป็นจริง กรณีที่เหลือถูกข้ามทั้งหมด</p>` },
        { type: "run", title: "if อย่างเดียว: แจ้งเตือนเมื่อเกินกำหนด", level: "พื้นฐาน", stdin: "38.2",
          concept: "เมื่อต้องทำอะไรเพิ่ม<em>เฉพาะบางกรณี</em> และกรณีอื่นไม่ต้องทำอะไร ใช้ if อย่างเดียว",
          code: j`
            import java.util.Scanner;

            public class FeverAlert {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Temperature: ");
                    double temp = input.nextDouble();
                    if (temp >= 37.5) {
                        System.out.println("Warning: fever!");
                    }
                    System.out.println("Recorded " + temp);
                }
            }`,
          steps: ["38.2 ≥ 37.5 → true → พิมพ์ Warning", "บรรทัด Recorded อยู่นอก if จึงทำทุกครั้ง"] },
        { type: "run", title: "if-else: คู่หรือคี่", level: "พื้นฐาน", stdin: "17",
          concept: "สองทางที่ไม่ซ้อนทับกัน — ทำทางใดทางหนึ่งเสมอ",
          code: j`
            import java.util.Scanner;

            public class EvenOdd {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Number: ");
                    int n = input.nextInt();
                    if (n % 2 == 0) {
                        System.out.println(n + " is even");
                    } else {
                        System.out.println(n + " is odd");
                    }
                }
            }`,
          steps: ["17 % 2 = 1 ไม่เท่ากับ 0", "ไปทาง else → odd"] },
        { type: "run", title: "else-if: ตัดเกรดและลำดับเงื่อนไข", level: "ต่อยอด", stdin: "85",
          concept: "ตรวจจากคะแนนสูงลงต่ำ แต่ละขั้นจึงไม่ต้องเขียนขอบบน (เพราะกรณีที่สูงกว่าถูกดักไปแล้ว)",
          code: j`
            import java.util.Scanner;

            public class GradeIf {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();
                    String grade;
                    if (score >= 80) {
                        grade = "A";
                    } else if (score >= 70) {
                        grade = "B";
                    } else if (score >= 60) {
                        grade = "C";
                    } else if (score >= 50) {
                        grade = "D";
                    } else {
                        grade = "F";
                    }
                    System.out.println("Grade: " + grade);
                }
            }`,
          steps: ["85 ≥ 80 → grade = A แล้วข้ามทั้งหมด", "ถ้าเรียง score ≥ 50 ไว้ก่อน คะแนน 85 จะได้ D ทันที เพราะ 85 ≥ 50 เป็นจริงก่อน", "else สุดท้ายรับทุกกรณีที่เหลือ ตัวแปร grade จึงมีค่าแน่นอน"] },
        { type: "run", label: "ทดลองบั๊ก 5.3.4", title: "เงื่อนไขเรียงผิด: กรณีสำคัญถูกบัง", level: "ต่อยอด", stdin: "92",
          concept: "โค้ดคอมไพล์ผ่าน แต่ให้ผลผิด (logic error) เพราะเงื่อนไขที่กว้างกว่าถูกตรวจก่อน",
          code: j`
            import java.util.Scanner;

            public class WrongOrder {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();
                    if (score >= 50) {
                        System.out.println("Pass");
                    } else if (score >= 90) {
                        System.out.println("Excellent");
                    }
                }
            }`,
          steps: ["92 ≥ 50 เป็นจริงตั้งแต่เงื่อนไขแรก → Pass", "เงื่อนไข ≥ 90 ไม่มีทางถูกตรวจเลย", "แก้: ย้าย ≥ 90 ขึ้นก่อน"] },
        { type: "run", title: "if ซ้อน และตัวดำเนินการ ?:", level: "ประยุกต์", stdin: "1200\ny",
          concept: "if ซ้อน (nested) ใช้เมื่อการตัดสินใจชั้นที่สองขึ้นกับชั้นแรก ส่วน <code>เงื่อนไข ? ค่า1 : ค่า2</code> (ternary) ใช้เลือก<em>ค่า</em>สั้น ๆ",
          code: j`
            import java.util.Scanner;

            public class ShippingFee {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Order total: ");
                    double total = input.nextDouble();
                    System.out.print("Member (y/n): ");
                    String member = input.next();

                    double shipping;
                    if (total >= 1000) {
                        shipping = 0;
                    } else {
                        if (member.equals("y")) {
                            shipping = 20;
                        } else {
                            shipping = 50;
                        }
                    }
                    String label = shipping == 0 ? "FREE" : shipping + " baht";
                    System.out.println("Shipping: " + label);
                }
            }`,
          steps: ["ยอด 1200 ≥ 1000 → ส่งฟรี ไม่ต้องดูสถานะสมาชิกเลย", "ถ้ายอดไม่ถึง จึงค่อยตรวจสมาชิก (if ชั้นใน)", "ternary เลือกข้อความ: 0 → \"FREE\""],
          tryIt: "ป้อน 800 และ y → 20 baht, ป้อน 800 และ n → 50 baht" },
        { type: "note", title: "ใส่วงเล็บปีกกาเสมอ และอย่าใส่ ; หลัง if", html: pre(`
          if (score >= 50);              // ← ; ทำให้ if ไม่มีผลต่อบรรทัดถัดไป
              System.out.println("Pass");  // ← ทำงานทุกครั้ง!`) + `<p>แม้มีคำสั่งเดียวก็ควรใส่ <code>{ }</code> เพื่อให้เห็นขอบเขตชัดและป้องกันการเพิ่มคำสั่งผิดตำแหน่ง</p>` },
        { type: "check", title: "trace if-else if", html: pre(`
          int x = 15;
          if (x > 20) System.out.println("A");
          else if (x > 10) System.out.println("B");
          else if (x > 5) System.out.println("C");
          else System.out.println("D");`), answer: `<p>พิมพ์ <strong>B</strong> เท่านั้น แม้ x &gt; 5 ก็จริง แต่ถูกข้ามเพราะเจอกรณีที่จริงก่อนแล้ว</p>` },
      ],
    },
    {
      num: "5.4", toc: "เลือกทางด้วย switch", title: "เลือกทางด้วย switch",
      blocks: [
        { type: "p", html: `<code>switch</code> เหมาะเมื่อเปรียบเทียบ<strong>ค่าเดียว</strong>กับตัวเลือกที่เป็นค่าแน่นอนหลายค่า เช่น รหัสเมนู วันในสัปดาห์ ใช้กับ <code>int</code>, <code>char</code>, <code>String</code> ได้ (แต่ไม่ใช้กับช่วงค่า เช่น ≥ 80 — กรณีนั้นใช้ if)` },
        { type: "concept", title: "switch แบบดั้งเดิม vs แบบลูกศร (Java 14+)", html: pre(`
          switch (day) {                       switch (day) {
              case 1:                              case 1 -> name = "Mon";
                  name = "Mon";                    case 2 -> name = "Tue";
                  break;                           default -> name = "?";
              case 2:                          }
                  name = "Tue";
                  break;                       // ไม่ต้องมี break ไม่มี fall-through
              default:
                  name = "?";
          }`) },
        { type: "run", title: "switch แบบดั้งเดิม: ชื่อวัน", level: "พื้นฐาน", stdin: "3",
          concept: "Java กระโดดไปที่ case ที่ค่าตรงกัน ทำคำสั่งจนเจอ <code>break</code> ถ้าไม่มี case ใดตรงจะไป <code>default</code>",
          code: j`
            import java.util.Scanner;

            public class DayName {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Day (1-7): ");
                    int day = input.nextInt();
                    String name;
                    switch (day) {
                        case 1: name = "Monday"; break;
                        case 2: name = "Tuesday"; break;
                        case 3: name = "Wednesday"; break;
                        case 4: name = "Thursday"; break;
                        case 5: name = "Friday"; break;
                        case 6: name = "Saturday"; break;
                        case 7: name = "Sunday"; break;
                        default: name = "Unknown day";
                    }
                    System.out.println(name);
                }
            }`,
          steps: ["day = 3 → กระโดดไป case 3", "name = \"Wednesday\" แล้ว break ออกจาก switch"] },
        { type: "run", label: "ทดลองบั๊ก 5.4.2", title: "ลืม break: fall-through", level: "ต่อยอด",
          concept: "ถ้าไม่มี break จะ “ไหล” ไปทำ case ถัดไปทั้งหมดจนจบหรือเจอ break",
          code: j`
            public class FallThrough {
                public static void main(String[] args) {
                    int level = 2;
                    switch (level) {
                        case 1:
                            System.out.println("Bronze");
                        case 2:
                            System.out.println("Silver");
                        case 3:
                            System.out.println("Gold");
                        default:
                            System.out.println("End");
                    }
                }
            }`,
          steps: ["เริ่มที่ case 2 พิมพ์ Silver", "ไม่มี break ไหลไป case 3 พิมพ์ Gold", "ไหลต่อไป default พิมพ์ End"] },
        { type: "run", title: "ใช้ fall-through อย่างตั้งใจ: จัดกลุ่ม case", level: "ประยุกต์", stdin: "4",
          concept: "หลาย case ที่ให้ผลเหมือนกันวางเรียงกันได้ — ในแบบลูกศรเขียน <code>case 12, 1, 2 -&gt;</code>",
          code: j`
            import java.util.Scanner;

            public class Season {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Month (1-12): ");
                    int month = input.nextInt();
                    String season = switch (month) {
                        case 3, 4, 5 -> "Summer";
                        case 6, 7, 8, 9, 10 -> "Rainy";
                        case 11, 12, 1, 2 -> "Winter";
                        default -> "Invalid month";
                    };
                    System.out.println("Season: " + season);
                }
            }`,
          steps: ["เดือน 4 ตรงกับ case 3, 4, 5", "switch แบบลูกศรคืนค่าได้ (switch expression) จึงเขียน <code>String season = switch ...;</code> (มี ; ปิดท้าย)", "ไม่ต้องมี break"] },
        { type: "run", title: "switch กับ char: เครื่องคิดเลขขนาดเล็ก", level: "ท้าทาย", stdin: "12 * 4",
          concept: "รับนิพจน์ <code>ตัวเลข ตัวดำเนินการ ตัวเลข</code> แล้วเลือกคำนวณตามตัวดำเนินการ พร้อมดักการหารด้วยศูนย์",
          code: j`
            import java.util.Scanner;

            public class MiniCalculator {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Expression (a op b): ");
                    double a = input.nextDouble();
                    char op = input.next().charAt(0);
                    double b = input.nextDouble();

                    switch (op) {
                        case '+' -> System.out.println("= " + (a + b));
                        case '-' -> System.out.println("= " + (a - b));
                        case '*', 'x' -> System.out.println("= " + (a * b));
                        case '/' -> {
                            if (b == 0) {
                                System.out.println("Cannot divide by zero");
                            } else {
                                System.out.println("= " + (a / b));
                            }
                        }
                        default -> System.out.println("Unknown operator: " + op);
                    }
                }
            }`,
          steps: ["อ่าน 12, \"*\" และ 4", "<code>.charAt(0)</code> ดึงอักขระแรกจาก String เป็น char", "case '*' ทำงาน → 48.0", "case '/' มีหลายคำสั่งจึงใช้ <code>{ }</code>"] },
        { type: "table", title: "เลือก if หรือ switch", head: ["สถานการณ์", "ควรใช้"], rows: [["ตรวจช่วงค่า (≥, &lt;)", "if-else if"], ["เงื่อนไขหลายตัวแปรรวมกัน (&amp;&amp;, ||)", "if"], ["ค่าเดียวเทียบกับค่าคงที่หลายค่า", "switch"], ["เมนูตัวเลข/ตัวอักษร", "switch"]] },
        { type: "check", title: "switch output", html: pre(`
          int n = 1;
          switch (n) {
              case 1: System.out.print("one ");
              case 2: System.out.print("two "); break;
              case 3: System.out.print("three ");
          }`), answer: `<p><strong>one two</strong> — case 1 ไม่มี break จึงไหลไป case 2 แล้วหยุดที่ break</p>` },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "บวก ลบ หรือศูนย์", html: `<p>รับจำนวนเต็มหนึ่งจำนวน แล้วแสดงว่าเป็น <code>positive</code>, <code>negative</code> หรือ <code>zero</code></p>`,
      spec: ["ใช้ if – else if – else", "ทดสอบทั้ง 3 กรณี"], runs: ["15", "-4", "0"],
      solution: j`
        import java.util.Scanner;

        public class SignCheck {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Number: ");
                int n = input.nextInt();
                if (n > 0) {
                    System.out.println("positive");
                } else if (n < 0) {
                    System.out.println("negative");
                } else {
                    System.out.println("zero");
                }
            }
        }` },
    { level: 1, title: "ค่าสัมบูรณ์โดยไม่ใช้ Math.abs", html: `<p>รับจำนวนเต็ม แล้วแสดงค่าสัมบูรณ์ โดย<strong>ห้ามใช้</strong> <code>Math.abs</code> ให้ใช้ if แทน</p>`,
      spec: ["ถ้าค่าน้อยกว่า 0 ให้คูณด้วย −1", "แสดงผลรูปแบบ <code>|x| = y</code>"], runs: ["-27", "8"],
      solution: j`
        import java.util.Scanner;

        public class AbsoluteValue {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Number: ");
                int x = input.nextInt();
                int result = x;
                if (x < 0) {
                    result = -x;
                }
                System.out.println("|" + x + "| = " + result);
            }
        }` },
    { level: 1, title: "เลือกเครื่องดื่ม", html: `<p>แสดงเมนู 1 = Tea, 2 = Coffee, 3 = Water รับหมายเลขเมนู แล้วแสดงชื่อเครื่องดื่มและราคา (25, 40, 10 บาท) ถ้าเป็นเลขอื่นให้แสดง <code>Invalid menu</code></p>`,
      spec: ["ใช้ switch", "มี default สำหรับเลขที่ไม่ถูกต้อง"], runs: ["2", "9"],
      solution: j`
        import java.util.Scanner;

        public class DrinkMenu {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.println("1) Tea  2) Coffee  3) Water");
                System.out.print("Choose: ");
                int choice = input.nextInt();
                switch (choice) {
                    case 1 -> System.out.println("Tea - 25 baht");
                    case 2 -> System.out.println("Coffee - 40 baht");
                    case 3 -> System.out.println("Water - 10 baht");
                    default -> System.out.println("Invalid menu");
                }
            }
        }` },
    { level: 2, title: "ตรวจช่วงอายุและสิทธิ์", html: `<p>รับอายุ แล้วแสดงประเภทตั๋ว: อายุต่ำกว่า 0 หรือเกิน 120 แสดง <code>Invalid age</code>, 0–3 ปี <code>Free</code>, 4–12 ปี <code>Child 60 baht</code>, 13–59 ปี <code>Adult 120 baht</code>, 60 ปีขึ้นไป <code>Senior 70 baht</code></p>`,
      spec: ["ตรวจกรณีข้อมูลผิดก่อน", "ใช้ else-if เรียงช่วงอย่างถูกต้อง", "ทดสอบค่าขอบ 3, 4, 12, 13, 59, 60"], runs: ["3", "13", "60", "-5"],
      solution: j`
        import java.util.Scanner;

        public class TicketType {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Age: ");
                int age = input.nextInt();
                if (age < 0 || age > 120) {
                    System.out.println("Invalid age");
                } else if (age <= 3) {
                    System.out.println("Free");
                } else if (age <= 12) {
                    System.out.println("Child 60 baht");
                } else if (age <= 59) {
                    System.out.println("Adult 120 baht");
                } else {
                    System.out.println("Senior 70 baht");
                }
            }
        }` },
    { level: 2, title: "ส่วนลดตามยอดซื้อและบัตรสมาชิก", html: `<p>รับยอดซื้อและสถานะสมาชิก (y/n) คิดส่วนลดดังนี้: ยอดตั้งแต่ 2000 ลด 15%, ตั้งแต่ 1000 ลด 10%, ต่ำกว่านั้นไม่ลด และ<strong>สมาชิกได้ลดเพิ่มอีก 5%</strong> (บวกกับเปอร์เซ็นต์ข้างต้น) แสดงเปอร์เซ็นต์ส่วนลด จำนวนเงินที่ลด และยอดสุทธิ</p>`,
      spec: ["หาเปอร์เซ็นต์ส่วนลดจากยอดก่อน แล้วค่อยบวกส่วนของสมาชิก", "เปรียบเทียบ String ด้วย <code>equalsIgnoreCase</code>", "แสดงเงินทศนิยม 2 ตำแหน่ง"], runs: ["2500\ny", "800\nY", "1500\nn"],
      solution: j`
        import java.util.Scanner;

        public class MemberDiscount {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Total: ");
                double total = input.nextDouble();
                System.out.print("Member (y/n): ");
                String member = input.next();
                int percent;
                if (total >= 2000) {
                    percent = 15;
                } else if (total >= 1000) {
                    percent = 10;
                } else {
                    percent = 0;
                }
                if (member.equalsIgnoreCase("y")) {
                    percent += 5;
                }
                double discount = total * percent / 100;
                System.out.printf("Discount %d%% = %.2f%n", percent, discount);
                System.out.printf("Net = %.2f%n", total - discount);
            }
        }` },
    { level: 2, title: "ค่าที่มากที่สุดจาก 3 จำนวน", html: `<p>รับจำนวนเต็ม 3 จำนวน แล้วแสดงค่าที่มากที่สุดและน้อยที่สุด โดย<strong>ห้ามใช้</strong> Math.max/Math.min</p>`,
      spec: ["สมมติให้ค่าแรกเป็นค่ามากสุด แล้วเทียบกับค่าที่เหลือทีละค่า", "ทำแบบเดียวกันกับค่าน้อยสุด", "ทดสอบกรณีมีค่าซ้ำ"], runs: ["12 45 7", "9 9 3"],
      solution: j`
        import java.util.Scanner;

        public class MaxMinOfThree {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Enter 3 numbers: ");
                int a = input.nextInt(), b = input.nextInt(), c = input.nextInt();
                int max = a;
                if (b > max) max = b;
                if (c > max) max = c;
                int min = a;
                if (b < min) min = b;
                if (c < min) min = c;
                System.out.println("Max = " + max);
                System.out.println("Min = " + min);
            }
        }`, explain: "ใช้ if แยกกัน (ไม่ใช่ else if) เพราะต้องเทียบทุกค่า" },
    { level: 2, title: "ตรวจรหัสผ่านและชื่อผู้ใช้", html: `<p>รับชื่อผู้ใช้และรหัสผ่าน (คำเดียว) ระบบมีบัญชีเดียวคือ <code>student</code> / <code>java2026</code> แสดงผลดังนี้</p><ul><li>ถูกทั้งคู่ → <code>Login successful</code></li><li>ชื่อถูก รหัสผิด → <code>Wrong password</code></li><li>ชื่อผิด → <code>User not found</code></li></ul>`,
      spec: ["เปรียบเทียบด้วย equals (ชื่อผู้ใช้ไม่สนตัวพิมพ์ ใช้ equalsIgnoreCase)", "ใช้ if ซ้อนหรือ else-if ก็ได้"], runs: ["Student\njava2026", "student\n1234", "teacher\njava2026"],
      solution: j`
        import java.util.Scanner;

        public class LoginCheck {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Username: ");
                String user = input.next();
                System.out.print("Password: ");
                String pass = input.next();
                if (user.equalsIgnoreCase("student")) {
                    if (pass.equals("java2026")) {
                        System.out.println("Login successful");
                    } else {
                        System.out.println("Wrong password");
                    }
                } else {
                    System.out.println("User not found");
                }
            }
        }` },
    { level: 3, title: "ค่าไฟฟ้าแบบอัตราก้าวหน้า", html: `<p>คิดค่าไฟตามจำนวนหน่วยแบบขั้นบันได: 150 หน่วยแรก หน่วยละ 3.25 บาท, หน่วยที่ 151–400 หน่วยละ 4.22 บาท, ส่วนที่เกิน 400 หน่วยละ 4.42 บาท บวกค่าบริการ 38.22 บาท แล้วบวก VAT 7% ของยอดทั้งหมด</p><p>เช่น 450 หน่วย = 150×3.25 + 250×4.22 + 50×4.42</p>`,
      spec: ["แยกคิดตามช่วงด้วย if-else if (ระวัง: ไม่ใช่คิดทุกหน่วยด้วยอัตราสูงสุด)", "แสดงค่าไฟก่อน VAT, VAT และยอดสุทธิ ทศนิยม 2 ตำแหน่ง", "ทดสอบ 120, 300 และ 450 หน่วย"], runs: ["120", "300", "450"],
      solution: j`
        import java.util.Scanner;

        public class ElectricBill {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Units: ");
                int units = input.nextInt();
                double energy;
                if (units <= 150) {
                    energy = units * 3.25;
                } else if (units <= 400) {
                    energy = 150 * 3.25 + (units - 150) * 4.22;
                } else {
                    energy = 150 * 3.25 + 250 * 4.22 + (units - 400) * 4.42;
                }
                double beforeVat = energy + 38.22;
                double vat = beforeVat * 0.07;
                System.out.printf("Energy charge: %.2f%n", energy);
                System.out.printf("Before VAT: %.2f%n", beforeVat);
                System.out.printf("VAT: %.2f%n", vat);
                System.out.printf("Total: %.2f%n", beforeVat + vat);
            }
        }` },
    { level: 3, title: "ประเภทสามเหลี่ยม", html: `<p>รับความยาวด้าน 3 ด้าน (จำนวนเต็ม) ตรวจก่อนว่าประกอบเป็นสามเหลี่ยมได้หรือไม่ (ผลบวกของสองด้านใด ๆ ต้องมากกว่าด้านที่เหลือ และทุกด้านต้องมากกว่า 0) ถ้าได้ ให้บอกว่าเป็น <code>Equilateral</code> (ด้านเท่า), <code>Isosceles</code> (หน้าจั่ว) หรือ <code>Scalene</code> (ด้านไม่เท่า) และบอกเพิ่มว่าเป็น<strong>สามเหลี่ยมมุมฉาก</strong>หรือไม่ (a² + b² = c² เมื่อ c เป็นด้านยาวสุด)</p>`,
      spec: ["ใช้ && และ || รวมเงื่อนไข", "หาด้านที่ยาวที่สุดก่อนตรวจมุมฉาก", "ทดสอบ 3 4 5, 5 5 5, 2 2 3, 1 2 3"], runs: ["3 4 5", "5 5 5", "1 2 3"],
      solution: j`
        import java.util.Scanner;

        public class TriangleType {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Sides: ");
                int a = input.nextInt(), b = input.nextInt(), c = input.nextInt();
                boolean valid = a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
                if (!valid) {
                    System.out.println("Not a triangle");
                } else {
                    if (a == b && b == c) {
                        System.out.println("Equilateral");
                    } else if (a == b || b == c || a == c) {
                        System.out.println("Isosceles");
                    } else {
                        System.out.println("Scalene");
                    }
                    int longest = Math.max(a, Math.max(b, c));
                    int sumSquares = a * a + b * b + c * c - longest * longest;
                    if (sumSquares == longest * longest) {
                        System.out.println("Right triangle: yes");
                    } else {
                        System.out.println("Right triangle: no");
                    }
                }
            }
        }`, explain: "ผลรวมกำลังสองของสองด้านสั้น = ผลรวมกำลังสองทั้งหมด − กำลังสองของด้านยาวสุด วิธีนี้ไม่ต้องรู้ว่าด้านไหนยาวสุด" },
    { level: 3, title: "เครื่องคิดเลข BMI พร้อมคำแนะนำ", html: `<p>รับเพศ (M/F) น้ำหนัก (กก.) และส่วนสูง (ซม.) คำนวณ BMI แล้วจัดกลุ่มตามเกณฑ์เอเชีย: ต่ำกว่า 18.5 <code>Underweight</code>, 18.5–22.9 <code>Normal</code>, 23–24.9 <code>Overweight</code>, 25–29.9 <code>Obese I</code>, ตั้งแต่ 30 <code>Obese II</code></p><p>นอกจากนี้ให้คำนวณ<strong>น้ำหนักที่ควรลด/เพิ่ม</strong>เพื่อให้ BMI อยู่ในช่วงปกติ (ใช้ขอบ 18.5 หรือ 22.9) และถ้าข้อมูลไม่สมเหตุสมผล (น้ำหนัก ≤ 0, ส่วนสูง &lt; 50 หรือ &gt; 250, เพศไม่ใช่ M/F) ให้แสดง <code>Invalid input</code> แล้วไม่คำนวณต่อ</p>`,
      spec: ["ตรวจความถูกต้องของข้อมูลก่อน", "เพศใช้ <code>char</code> ผ่าน <code>next().toUpperCase().charAt(0)</code>", "น้ำหนักเป้าหมาย = BMI ขอบ × (ส่วนสูงเมตร)²", "แสดงผลทศนิยม 1–2 ตำแหน่งตามตัวอย่าง"], runs: ["F 52 160", "M 92 175", "X 60 170"],
      solution: j`
        import java.util.Scanner;

        public class BmiAdvisor {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Gender weight height: ");
                char gender = input.next().toUpperCase().charAt(0);
                double weight = input.nextDouble();
                double heightCm = input.nextDouble();
                if ((gender != 'M' && gender != 'F') || weight <= 0 || heightCm < 50 || heightCm > 250) {
                    System.out.println("Invalid input");
                } else {
                    double h = heightCm / 100;
                    double bmi = weight / (h * h);
                    String group;
                    if (bmi < 18.5) group = "Underweight";
                    else if (bmi < 23) group = "Normal";
                    else if (bmi < 25) group = "Overweight";
                    else if (bmi < 30) group = "Obese I";
                    else group = "Obese II";
                    System.out.printf("BMI = %.2f (%s)%n", bmi, group);
                    if (bmi < 18.5) {
                        System.out.printf("Gain about %.1f kg%n", 18.5 * h * h - weight);
                    } else if (bmi >= 23) {
                        System.out.printf("Lose about %.1f kg%n", weight - 22.9 * h * h);
                    } else {
                        System.out.println("Keep it up!");
                    }
                }
            }
        }` },
    { level: 3, title: "วันถัดไปในปฏิทิน", html: `<p>รับวัน เดือน ปี (ค.ศ.) แล้วแสดง<strong>วันถัดไป</strong> โดยคำนึงถึงจำนวนวันในแต่ละเดือนและปีอธิกสุรทิน (กุมภาพันธ์มี 29 วัน) ถ้าวันที่ไม่มีจริง (เช่น 31/4 หรือ 29/2/2025) ให้แสดง <code>Invalid date</code></p>`,
      spec: ["หาจำนวนวันของเดือนด้วย switch (เดือน 4, 6, 9, 11 มี 30 วัน, เดือน 2 ขึ้นกับปีอธิกสุรทิน, ที่เหลือ 31)", "ตรวจความถูกต้องของวันที่ก่อน", "จัดการกรณีขึ้นเดือนใหม่และขึ้นปีใหม่", "ทดสอบ 28/2/2024, 28/2/2025, 31/12/2025, 31/4/2025"], runs: ["28 2 2024", "28 2 2025", "31 12 2025", "31 4 2025"],
      solution: j`
        import java.util.Scanner;

        public class NextDay {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Date (d m y): ");
                int d = input.nextInt(), m = input.nextInt(), y = input.nextInt();
                boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
                int daysInMonth = switch (m) {
                    case 4, 6, 9, 11 -> 30;
                    case 2 -> leap ? 29 : 28;
                    case 1, 3, 5, 7, 8, 10, 12 -> 31;
                    default -> 0;
                };
                if (daysInMonth == 0 || d < 1 || d > daysInMonth) {
                    System.out.println("Invalid date");
                } else {
                    d++;
                    if (d > daysInMonth) {
                        d = 1;
                        m++;
                        if (m > 12) {
                            m = 1;
                            y++;
                        }
                    }
                    System.out.println("Next day: " + d + "/" + m + "/" + y);
                }
            }
        }` },
  ],
};
