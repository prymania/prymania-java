import { j, c, pre, jpre } from "../lib.mjs";

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
        { type: "p", html: `<code>boolean</code> เก็บได้แค่ <code>true</code> หรือ <code>false</code> การเปรียบเทียบ เช่น <code>score &gt;= 50</code> ให้ผลเป็นค่า boolean ซึ่งเก็บในตัวแปรหรือใช้ใน if ได้` },
        { type: "table", head: ["ตัวดำเนินการ", "ความหมาย", "ตัวอย่าง (x = 7)", "ผล"], rows: [
          ["<code>==</code>", "เท่ากับ", "<code>x == 7</code>", "true"], ["<code>!=</code>", "ไม่เท่ากับ", "<code>x != 7</code>", "false"],
          ["<code>&gt;</code>", "มากกว่า", "<code>x &gt; 10</code>", "false"], ["<code>&lt;</code>", "น้อยกว่า", "<code>x &lt; 10</code>", "true"],
          ["<code>&gt;=</code>", "มากกว่าหรือเท่ากับ", "<code>x &gt;= 7</code>", "true"], ["<code>&lt;=</code>", "น้อยกว่าหรือเท่ากับ", "<code>x &lt;= 6</code>", "false"],
        ] },
        { type: "run", title: "ผลการเปรียบเทียบคือ true หรือ false",
          code: j`
            public class Comparisons {
                public static void main(String[] args) {
                    int score = 72;
                    boolean passed = score >= 50;                         // true
                    boolean perfect = score == 100;                       // false
                    System.out.println("passed = " + passed);
                    System.out.println("perfect = " + perfect);
                    System.out.println("score < 80 ? " + (score < 80));   // true   ต่อข้อความต้องมีวงเล็บ
                    System.out.println("score != 72 ? " + (score != 72)); // false
                }
            }`,
          },
        { type: "warn", title: "= กับ ==", html: `<code>=</code> คือการ<strong>ใส่ค่า</strong> ส่วน <code>==</code> คือการ<strong>เปรียบเทียบ</strong> เขียน <code>if (score = 100)</code> จะคอมไพล์ไม่ผ่าน (<code>int cannot be converted to boolean</code>)` },
        { type: "more", title: "ดูตัวอย่าง: error เมื่อใช้ = แทน ==", blocks: [
          { type: "run", label: "ทดลอง error 5.1.2", title: "ใช้ = แทน ==", expect: "compile-error",
            code: j`
              public class AssignInIf {
                  public static void main(String[] args) {
                      int score = 72;
                      if (score = 100) {
                          System.out.println("Perfect!");
                      }
                  }
              }`,
            },
        ] },

        { type: "h", text: "เปรียบเทียบ String ต้องใช้ equals" },
        { type: "p", html: `<code>==</code> กับ String ตรวจว่าเป็น<em>ออบเจ็กต์เดียวกัน</em>หรือไม่ ไม่ได้ดูตัวอักษร ให้ใช้ <code>.equals()</code> หรือ <code>.equalsIgnoreCase()</code> ถ้าไม่สนตัวพิมพ์เล็ก-ใหญ่` },
        { type: "run", title: "ผู้ใช้พิมพ์ admin", stdin: "admin",
          code: j`
            import java.util.Scanner;

            public class StringCompare {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Username: ");
                    String user = input.next();
                    System.out.println("user == \"admin\"      -> " + (user == "admin"));        // false
                    System.out.println("user.equals(\"admin\") -> " + user.equals("admin"));     // true
                    System.out.println("equalsIgnoreCase(\"ADMIN\") -> " + user.equalsIgnoreCase("ADMIN"));
                }
            }`,
          },
        { type: "tip", html: `จำไว้: <strong>String ใช้ equals เสมอ</strong> และ double ห้ามใช้ <code>==</code> ตรง ๆ เพราะเก็บค่าแบบประมาณ ให้ตรวจว่า “ต่างกันน้อยมาก” แทน: <code>Math.abs(a - b) &lt; 1e-9</code>` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เปรียบเทียบ double อย่างปลอดภัย", blocks: [
          { type: "run", title: "0.1 + 0.2 ไม่เท่ากับ 0.3 พอดี",
            code: j`
              public class DoubleCompare {
                  public static void main(String[] args) {
                      double a = 0.1 + 0.2;
                      double b = 0.3;
                      System.out.println("a = " + a);                                         // 0.30000000000000004
                      System.out.println("a == b ? " + (a == b));                             // false
                      System.out.println("close enough ? " + (Math.abs(a - b) < 1e-9));       // true
                  }
              }`,
            },
        ] },
        { type: "check", title: "ผลของนิพจน์", html: `<p>ถ้า <code>int a = 5, b = 8;</code> ผลของ <code>a * 2 &gt; b</code>, <code>a + 3 == b</code>, <code>b % a != 3</code> คืออะไร</p>`, answer: `<p>10 &gt; 8 → <strong>true</strong>; 8 == 8 → <strong>true</strong>; 8 % 5 = 3, 3 != 3 → <strong>false</strong></p>` },
      ],
    },
    {
      num: "5.2", toc: "ตัวดำเนินการตรรกะ", title: "รวมเงื่อนไขด้วย AND, OR และ NOT",
      blocks: [
        { type: "p", html: `ใช้รวมหลายเงื่อนไขเข้าด้วยกัน` },
        { type: "table", head: ["ตัวดำเนินการ", "ชื่อ", "เป็นจริงเมื่อ"], rows: [
          ["<code>&amp;&amp;</code>", "AND", "ทั้งสองข้างเป็นจริง"],
          ["<code>||</code>", "OR", "อย่างน้อยหนึ่งข้างเป็นจริง"],
          ["<code>!</code>", "NOT", "กลับค่า จริง ↔ เท็จ"],
        ] },
        { type: "run", title: "ตรวจช่วงอายุ 18–25",
          code: j`
            public class RangeCheck {
                public static void main(String[] args) {
                    int age = 19;
                    boolean inRange = age >= 18 && age <= 25;        // true    ต้องจริงทั้งสองข้าง
                    boolean outOfRange = age < 18 || age > 25;       // false   จริงข้างเดียวก็พอ
                    System.out.println("18-25? " + inRange);
                    System.out.println("outside? " + outOfRange);
                    System.out.println("not in range? " + !inRange); // false
                }
            }`,
          },
        { type: "warn", html: `คณิตศาสตร์เขียน 18 ≤ age ≤ 25 ได้ แต่ Java ต้องแยกเป็นสองเงื่อนไขแล้วเชื่อมด้วย <code>&amp;&amp;</code> เสมอ เขียน <code>18 &lt;= age &lt;= 25</code> จะคอมไพล์ไม่ผ่าน` },

        { type: "h", text: "ลำดับของ && และ ||" },
        { type: "p", html: `<code>&amp;&amp;</code> ทำก่อน <code>||</code> เสมอ เหมือนคูณก่อนบวก ถ้าต้องการลำดับอื่นหรือให้อ่านง่าย ให้ใส่วงเล็บ` },
        { type: "run", title: "สิทธิ์ส่วนลด: วงเล็บเปลี่ยนความหมาย",
          code: j`
            public class DiscountRule {
                public static void main(String[] args) {
                    boolean isStudent = false;
                    boolean hasPass = true;
                    int age = 16;

                    boolean ruleA = (isStudent || hasPass) && age >= 18;   // (false || true) && false → false
                    boolean ruleB = isStudent || hasPass && age >= 18;     // false || (true && false) → false
                    boolean ruleC = isStudent || (hasPass && age >= 18);   // เหมือน B แต่อ่านง่ายกว่า

                    System.out.println("A = " + ruleA);
                    System.out.println("B = " + ruleB);
                    System.out.println("C = " + ruleC);
                }
            }`,
          },
        { type: "try", html: `เปลี่ยน <code>isStudent = true</code> แล้วดูว่า A กับ B ต่างกันอย่างไร (A ยังเป็น false เพราะอายุไม่ถึง แต่ B เป็น true)` },

        { type: "h", text: "Short-circuit: หยุดตรวจเมื่อรู้คำตอบแล้ว" },
        { type: "p", html: `ถ้าด้านซ้ายของ <code>&amp;&amp;</code> เป็น false คำตอบต้องเป็น false แน่นอน Java จึงไม่ตรวจด้านขวาเลย ใช้ป้องกันการหารด้วยศูนย์ได้` },
        { type: "run", title: "ตรวจ count ก่อนหาร",
          code: j`
            public class ShortCircuit {
                public static void main(String[] args) {
                    int total = 100;
                    int count = 0;
                    if (count != 0 && total / count > 10) {      // count != 0 เป็น false → ไม่หารเลย
                        System.out.println("Average above 10");
                    } else {
                        System.out.println("No data or average too low");
                    }
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เงื่อนไขปีอธิกสุรทิน", blocks: [
          { type: "p", html: `ปีอธิกสุรทิน = หารด้วย 4 ลงตัว <em>และ</em> ไม่ลงตัวด้วย 100 <em>หรือ</em> หารด้วย 400 ลงตัว (ตัวอย่างนี้ใช้อาเรย์และลูปวนทดสอบหลายปี ซึ่งจะเรียนในบทที่ 6 และ 8 ให้โฟกัสที่บรรทัด <code>boolean leap</code>)` },
          { type: "run", title: "ปีอธิกสุรทิน",
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
            },
        ] },
        { type: "practice", level: 1, title: "ร้านเปิดอยู่ไหม",
          html: `<p>ร้านหนังสือเปิด<strong>จันทร์–ศุกร์ 9:00–17:59</strong> และ<strong>เสาร์ 10:00–14:59</strong> วันอาทิตย์ปิด รับวัน (1 = จันทร์ … 7 = อาทิตย์) และชั่วโมง (0–23) แล้วแสดงว่าร้าน <code>OPEN</code> หรือ <code>CLOSED</code></p>`,
          spec: ["ใช้ if-else เพียงชุดเดียว เงื่อนไขเปิดร้านเขียนเป็นนิพจน์เดียวที่รวม <code>&amp;&amp;</code> และ <code>||</code>", "ใส่วงเล็บแยกกลุ่ม “วันธรรมดา” กับ “วันเสาร์” ให้ชัด", "แสดงผลรูปแบบ <code>Day 3, 10:00 -&gt; OPEN</code>"],
          runs: ["3\n10", "3\n18", "6\n12", "7\n12"],
          hint: "คำใบ้: (วันธรรมดา และ อยู่ในช่วงเวลาวันธรรมดา) || (วันเสาร์ และ อยู่ในช่วงเวลาวันเสาร์)",
          solution: j`
            import java.util.Scanner;

            public class StoreHours {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Day (1=Mon ... 7=Sun): ");
                    int day = input.nextInt();
                    System.out.print("Hour (0-23): ");
                    int hour = input.nextInt();

                    boolean open = (day >= 1 && day <= 5 && hour >= 9 && hour < 18)   // จันทร์-ศุกร์
                                || (day == 6 && hour >= 10 && hour < 15);             // เสาร์

                    if (open) {
                        System.out.println("Day " + day + ", " + hour + ":00 -> OPEN");
                    } else {
                        System.out.println("Day " + day + ", " + hour + ":00 -> CLOSED");
                    }
                }
            }`,
          explain: "เก็บเงื่อนไขไว้ในตัวแปร boolean ชื่อ open ทำให้ if อ่านง่าย วงเล็บสองกลุ่มจำเป็นเพราะ && ทำก่อน || ถ้าไม่ใส่ก็ยังได้ผลเดียวกันในข้อนี้ แต่ผู้อ่านจะต้องจำลำดับเอง วันอาทิตย์ไม่ต้องเขียนเงื่อนไขเพราะไม่เข้ากลุ่มใดเลยจึงได้ false" },
        { type: "check", title: "De Morgan", html: `<p><code>!(a &gt; 0 &amp;&amp; b &gt; 0)</code> เขียนใหม่โดยไม่ใช้ ! ด้านนอกได้อย่างไร</p>`, answer: `<p><code>a &lt;= 0 || b &lt;= 0</code> — กลับ && เป็น || และกลับเงื่อนไขย่อยทุกตัว (กฎของ De Morgan)</p>` },
      ],
    },
    {
      num: "5.3", toc: "if, else if และ else", title: "if, else if และ else",
      blocks: [
        { type: "p", html: `<code>if</code> ทำคำสั่งในบล็อกเมื่อเงื่อนไขเป็นจริง มี 3 รูปแบบตามจำนวนทางเลือก` },
        { type: "table", head: ["รูปแบบ", "ใช้เมื่อ"], rows: [
          ["<code>if (...) { }</code>", "ทำเพิ่มเฉพาะบางกรณี กรณีอื่นไม่ต้องทำอะไร"],
          ["<code>if (...) { } else { }</code>", "มีสองทาง ทำทางใดทางหนึ่งเสมอ"],
          ["<code>if (...) { } else if (...) { } else { }</code>", "หลายทาง ตรวจจากบนลงล่าง ทำเฉพาะทางแรกที่จริง"],
        ] },
        { type: "run", title: "if อย่างเดียว: แจ้งเตือนเมื่อมีไข้", stdin: "38.2",
          code: j`
            import java.util.Scanner;

            public class FeverAlert {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Temperature: ");
                    double temp = input.nextDouble();
                    if (temp >= 37.5) {                              // 38.2 ≥ 37.5 → true
                        System.out.println("Warning: fever!");
                    }
                    System.out.println("Recorded " + temp);          // อยู่นอก if → ทำทุกครั้ง
                }
            }`,
          },
        { type: "run", title: "if-else: คู่หรือคี่", stdin: "17",
          code: j`
            import java.util.Scanner;

            public class EvenOdd {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Number: ");
                    int n = input.nextInt();
                    if (n % 2 == 0) {                                // 17 % 2 = 1 → false
                        System.out.println(n + " is even");
                    } else {
                        System.out.println(n + " is odd");           // ← มาทางนี้
                    }
                }
            }`,
          },

        { type: "h", text: "else if: ตรวจจากบนลงล่าง" },
        { type: "p", html: `ตรวจจากช่วงสูงลงต่ำ แต่ละขั้นจึงไม่ต้องเขียนขอบบน เพราะกรณีที่สูงกว่าถูกดักไปแล้ว และ <code>else</code> สุดท้ายรับทุกกรณีที่เหลือ` },
        { type: "run", title: "ตัดเกรด", stdin: "85",
          code: j`
            import java.util.Scanner;

            public class GradeIf {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Score: ");
                    int score = input.nextInt();
                    String grade;
                    if (score >= 80) {               // 85 ≥ 80 → A แล้วข้ามที่เหลือทั้งหมด
                        grade = "A";
                    } else if (score >= 70) {        // มาถึงนี่แปลว่า score < 80
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
          },
        { type: "warn", title: "ลำดับเงื่อนไขสำคัญ", html: `ถ้าเอาเงื่อนไขที่กว้างกว่าไว้ก่อน เช่น <code>score &gt;= 50</code> ก่อน <code>score &gt;= 90</code> คะแนน 92 จะเข้าทางแรกเสมอ เงื่อนไข ≥ 90 ไม่มีวันถูกตรวจ โค้ดคอมไพล์ผ่านแต่ผลผิด (logic error)` },
        { type: "more", title: "ดูตัวอย่าง: เงื่อนไขเรียงผิด", blocks: [
          { type: "run", label: "ทดลองบั๊ก 5.3.4", title: "เงื่อนไขเรียงผิด: กรณีสำคัญถูกบัง", stdin: "92",
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
            after: "แก้โดยย้ายเงื่อนไข ≥ 90 ขึ้นไปไว้ก่อน" },
        ] },

        { type: "h", text: "if ซ้อน และตัวดำเนินการ ?:" },
        { type: "p", html: `if ซ้อนใช้เมื่อการตัดสินใจชั้นที่สองขึ้นกับชั้นแรก ส่วน <code>เงื่อนไข ? ค่า1 : ค่า2</code> (ternary) ใช้เลือก<em>ค่า</em>สั้น ๆ` },
        { type: "run", title: "ค่าส่งตามยอดซื้อและสถานะสมาชิก", stdin: "1200\ny",
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
                    if (total >= 1000) {                     // ยอดถึง 1000 → ส่งฟรี ไม่ต้องดูสมาชิก
                        shipping = 0;
                    } else {
                        if (member.equals("y")) {            // if ซ้อน: ตรวจสมาชิกเฉพาะยอดไม่ถึง
                            shipping = 20;
                        } else {
                            shipping = 50;
                        }
                    }
                    String label = shipping == 0 ? "FREE" : shipping + " baht";   // ?: เลือกข้อความ
                    System.out.println("Shipping: " + label);
                }
            }`,
          },
        { type: "warn", title: "อย่าใส่ ; หลัง if", html: jpre(`
          if (score >= 50);              // ← ; ทำให้ if ไม่มีผลต่อบรรทัดถัดไป
              System.out.println("Pass");  // ← ทำงานทุกครั้ง!`) + `<p>และควรใส่ <code>{ }</code> เสมอแม้มีคำสั่งเดียว เพื่อให้เห็นขอบเขตชัด</p>` },
        { type: "practice", level: 1, title: "คำทักทายตามเวลา",
          html: `<p>รับชั่วโมง (0–23) แล้วแสดงคำทักทาย: 5–11 <code>Good morning</code>, 12–16 <code>Good afternoon</code>, 17–20 <code>Good evening</code>, 21–23 และ 0–4 <code>Good night</code> ถ้านอกช่วง 0–23 แสดง <code>Invalid hour</code></p>`,
          spec: ["ใช้ if / else if / else ชุดเดียว และตรวจค่าที่ใช้ไม่ได้ก่อน", "เรียงเงื่อนไขจากชั่วโมงน้อยไปมาก ให้แต่ละเงื่อนไขมีแค่ <code>&lt;</code> ตัวเดียว"],
          runs: ["7", "13", "19", "23", "3", "25"],
          hint: "คำใบ้: หลังตรวจค่าใช้ไม่ได้แล้ว hour อยู่ใน 0–23 แน่นอน ถ้าเริ่มจาก hour &lt; 5 ก่อน กลุ่ม night ช่วงดึกจะไปตกที่ else สุดท้ายเอง",
          solution: j`
            import java.util.Scanner;

            public class Greeting {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Hour (0-23): ");
                    int hour = input.nextInt();

                    if (hour < 0 || hour > 23) {
                        System.out.println("Invalid hour");
                    } else if (hour < 5) {                    // 0-4
                        System.out.println("Good night");
                    } else if (hour < 12) {                   // 5-11
                        System.out.println("Good morning");
                    } else if (hour < 17) {                   // 12-16
                        System.out.println("Good afternoon");
                    } else if (hour < 21) {                   // 17-20
                        System.out.println("Good evening");
                    } else {                                  // 21-23
                        System.out.println("Good night");
                    }
                }
            }`,
          explain: "แต่ละ else if ทำงานได้ก็ต่อเมื่อเงื่อนไขก่อนหน้าเป็นเท็จทั้งหมด จึงไม่ต้องเขียนขอบล่างซ้ำ (เช่น hour >= 5 && hour < 12) Good night ปรากฏสองที่เพราะช่วงเวลากลางคืนข้ามเที่ยงคืน" },
        { type: "check", title: "trace if-else if", html: jpre(`
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
        { type: "p", html: `<code>switch</code> เหมาะเมื่อเปรียบเทียบ<strong>ค่าเดียว</strong>กับตัวเลือกที่เป็นค่าแน่นอนหลายค่า เช่น รหัสเมนู วันในสัปดาห์ ใช้กับ <code>int</code>, <code>char</code>, <code>String</code> ได้ แต่ใช้กับช่วงค่า (≥ 80) ไม่ได้` },
        { type: "table", head: ["สถานการณ์", "ควรใช้"], rows: [["ตรวจช่วงค่า (≥, &lt;)", "if-else if"], ["เงื่อนไขหลายตัวแปรรวมกัน (&amp;&amp;, ||)", "if"], ["ค่าเดียวเทียบกับค่าคงที่หลายค่า", "switch"], ["เมนูตัวเลข / ตัวอักษร", "switch"]] },
        { type: "h", text: "switch แบบลูกศร (Java 14+)" },
        { type: "p", html: `เขียนแบบ <code>case ค่า -&gt; คำสั่ง</code> ไม่ต้องมี <code>break</code> ใส่หลายค่าใน case เดียวได้ และคืนค่าได้ (มี <code>;</code> ปิดท้าย)` },
        { type: "run", title: "ฤดูจากเดือน", stdin: "4",
          code: j`
            import java.util.Scanner;

            public class Season {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Month (1-12): ");
                    int month = input.nextInt();
                    String season = switch (month) {          // switch คืนค่ามาเก็บในตัวแปร
                        case 3, 4, 5 -> "Summer";             // 4 ตรง case นี้
                        case 6, 7, 8, 9, 10 -> "Rainy";
                        case 11, 12, 1, 2 -> "Winter";
                        default -> "Invalid month";           // ไม่ตรง case ใดเลย
                    };
                    System.out.println("Season: " + season);
                }
            }`,
          },

        { type: "h", text: "switch แบบดั้งเดิมและ break" },
        { type: "p", html: `แบบดั้งเดิมเขียน <code>case ค่า:</code> แล้วต้องปิดด้วย <code>break;</code> ถ้าลืม break จะ “ไหล” (fall-through) ไปทำ case ถัดไปด้วย` },
        { type: "run", title: "ชื่อวันจากตัวเลข", stdin: "3",
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
                        case 3: name = "Wednesday"; break;      // ← day = 3 แล้ว break ออก
                        case 4: name = "Thursday"; break;
                        case 5: name = "Friday"; break;
                        case 6: name = "Saturday"; break;
                        case 7: name = "Sunday"; break;
                        default: name = "Unknown day";
                    }
                    System.out.println(name);
                }
            }`,
          },
        { type: "more", title: "ดูตัวอย่าง: ลืม break แล้วไหลต่อ", blocks: [
          { type: "run", label: "ทดลองบั๊ก 5.4.3", title: "ลืม break: fall-through",
            code: j`
              public class FallThrough {
                  public static void main(String[] args) {
                      int level = 2;
                      switch (level) {
                          case 1:
                              System.out.println("Bronze");
                          case 2:                                   // เริ่มที่นี่
                              System.out.println("Silver");
                          case 3:                                   // ไม่มี break → ไหลลงมา
                              System.out.println("Gold");
                          default:
                              System.out.println("End");
                      }
                  }
              }`,
            },
        ] },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เครื่องคิดเลขด้วย switch กับ char", blocks: [
          { type: "run", title: "เครื่องคิดเลขขนาดเล็ก", stdin: "12 * 4",
            code: j`
              import java.util.Scanner;

              public class MiniCalculator {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Expression (a op b): ");
                      double a = input.nextDouble();
                      char op = input.next().charAt(0);              // อักขระแรกของคำ
                      double b = input.nextDouble();

                      switch (op) {
                          case '+' -> System.out.println("= " + (a + b));
                          case '-' -> System.out.println("= " + (a - b));
                          case '*', 'x' -> System.out.println("= " + (a * b));
                          case '/' -> {                              // หลายคำสั่ง → ใช้ { }
                              if (b == 0) System.out.println("Cannot divide by zero");
                              else System.out.println("= " + (a / b));
                          }
                          default -> System.out.println("Unknown operator: " + op);
                      }
                  }
              }`,
            },
        ] },
        { type: "practice", level: 2, title: "จำนวนวันในเดือน",
          html: `<p>รับเดือน (1–12) และปี ค.ศ. แล้วแสดงจำนวนวันของเดือนนั้น เดือนกุมภาพันธ์มี 29 วันในปีอธิกสุรทิน (หารด้วย 4 ลงตัวแต่หารด้วย 100 ไม่ลงตัว หรือหารด้วย 400 ลงตัว) ถ้าเดือนไม่อยู่ใน 1–12 แสดง <code>Invalid month</code></p>`,
          spec: ["ใช้ switch แบบลูกศร โดยรวมเดือนที่มีจำนวนวันเท่ากันไว้ใน case เดียว เช่น <code>case 4, 6, 9, 11 -&gt;</code>", "กรณีกุมภาพันธ์ใช้ if-else ตรวจปีอธิกสุรทิน", "แสดงผลรูปแบบ <code>2/2024 has 29 days</code>"],
          runs: ["2 2024", "2 1900", "4 2025", "13 2025"],
          hint: "คำใบ้: ตั้ง int days = 0 ไว้ก่อน switch แล้วให้แต่ละ case กำหนดค่า ส่วน default ใช้ค่าพิเศษ เช่น -1 เพื่อบอกว่าเดือนใช้ไม่ได้",
          solution: j`
            import java.util.Scanner;

            public class DaysInMonth {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Month Year: ");
                    int month = input.nextInt();
                    int year = input.nextInt();

                    int days = 0;
                    switch (month) {
                        case 1, 3, 5, 7, 8, 10, 12 -> days = 31;
                        case 4, 6, 9, 11 -> days = 30;
                        case 2 -> {
                            boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
                            if (leap) {
                                days = 29;
                            } else {
                                days = 28;
                            }
                        }
                        default -> days = -1;                 // เดือนใช้ไม่ได้
                    }

                    if (days == -1) {
                        System.out.println("Invalid month");
                    } else {
                        System.out.println(month + "/" + year + " has " + days + " days");
                    }
                }
            }`,
          explain: "การรวมหลายค่าใน case เดียวทำให้ไม่ต้องเขียน 12 กรณี ปี 1900 หารด้วย 4 ลงตัวแต่หารด้วย 100 ลงตัวด้วยและหาร 400 ไม่ลงตัว จึงไม่ใช่ปีอธิกสุรทิน เป็นค่าขอบที่ควรทดสอบ" },
        { type: "check", title: "switch output", html: jpre(`
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
                if (n > 0) {  // มากกว่า 0
                    System.out.println("positive");
                } else if (n < 0) {  // น้อยกว่า 0
                    System.out.println("negative");
                } else {  // ที่เหลือคือ 0
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
                int result = x;  // เริ่มจากค่าเดิม
                if (x < 0) {     // ถ้าติดลบ จึงกลับเครื่องหมาย
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
                switch (choice) {  // เลือกเมนูตามหมายเลข
                    case 1 -> System.out.println("Tea - 25 baht");
                    case 2 -> System.out.println("Coffee - 40 baht");
                    case 3 -> System.out.println("Water - 10 baht");
                    // เลขที่ไม่มีในเมนู
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
                if (age < 0 || age > 120) {  // ตรวจค่าผิดปกติก่อน
                    System.out.println("Invalid age");
                } else if (age <= 3) {  // ตรวจช่วงอายุจากน้อยไปมาก
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
                if (total >= 2000) {  // ส่วนลดตามยอดซื้อ
                    percent = 15;
                } else if (total >= 1000) {
                    percent = 10;
                } else {
                    percent = 0;
                }
                // if แยก: สมาชิกได้เพิ่มอีก 5%
                if (member.equalsIgnoreCase("y")) {
                    percent += 5;
                }
                // คิดส่วนลดจากเปอร์เซ็นต์รวม
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
                int max = a;           // สมมติว่าตัวแรกมากที่สุด
                if (b > max) max = b;  // เจอค่าที่มากกว่า → เปลี่ยน
                if (c > max) max = c;
                int min = a;  // ทำแบบเดียวกันกับค่าน้อยสุด
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
                // ตรวจชื่อผู้ใช้ก่อน
                if (user.equalsIgnoreCase("student")) {
                    // ชื่อถูกจึงตรวจรหัสผ่าน
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
                if (units <= 150) {  // ขั้นที่ 1: 150 หน่วยแรก
                    energy = units * 3.25;
                } else if (units <= 400) {  // ขั้นที่ 2: หน่วยที่ 151-400
                    energy = 150 * 3.25 + (units - 150) * 4.22;
                } else {  // ขั้นที่ 3: เกิน 400 หน่วย
                    energy = 150 * 3.25 + 250 * 4.22 + (units - 400) * 4.42;
                }
                // บวกค่าบริการรายเดือน
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
                // ทุกด้านเป็นบวก และผลรวม 2 ด้านยาวกว่าด้านที่เหลือ
                boolean valid = a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
                if (!valid) {
                    System.out.println("Not a triangle");
                } else {
                    if (a == b && b == c) {  // เท่ากันทั้ง 3 ด้าน
                        System.out.println("Equilateral");
                    // เท่ากันบางคู่
                    } else if (a == b || b == c || a == c) {
                        System.out.println("Isosceles");
                    } else {
                        System.out.println("Scalene");
                    }
                    // ด้านยาวที่สุด
                    int longest = Math.max(a, Math.max(b, c));
                    int sumSquares = a * a + b * b + c * c - longest * longest;
                    // ตรวจตามทฤษฎีบทพีทาโกรัส
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
                // แปลงเป็นตัวใหญ่แล้วเอาตัวแรก
                char gender = input.next().toUpperCase().charAt(0);
                double weight = input.nextDouble();
                double heightCm = input.nextDouble();
                // ตรวจข้อมูลผิดก่อนคำนวณ
                if ((gender != 'M' && gender != 'F') || weight <= 0 || heightCm < 50 || heightCm > 250) {
                    System.out.println("Invalid input");
                } else {
                    // แปลงเซนติเมตรเป็นเมตร
                    double h = heightCm / 100;
                    double bmi = weight / (h * h);
                    String group;
                    // ไม่มี { } ได้เมื่อมีคำสั่งเดียว
                    if (bmi < 18.5) group = "Underweight";
                    else if (bmi < 23) group = "Normal";
                    else if (bmi < 25) group = "Overweight";
                    else if (bmi < 30) group = "Obese I";
                    else group = "Obese II";
                    System.out.printf("BMI = %.2f (%s)%n", bmi, group);
                    if (bmi < 18.5) {
                        // น้ำหนักที่ควรเพิ่มให้ถึง 18.5
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
                // เงื่อนไขปีอธิกสุรทิน
                boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
                // จำนวนวันของแต่ละเดือน
                int daysInMonth = switch (m) {
                    case 4, 6, 9, 11 -> 30;
                    // กุมภาพันธ์ขึ้นกับปีอธิกสุรทิน
                    case 2 -> leap ? 29 : 28;
                    case 1, 3, 5, 7, 8, 10, 12 -> 31;
                    default -> 0;
                };
                // ตรวจวันที่ไม่ถูกต้อง
                if (daysInMonth == 0 || d < 1 || d > daysInMonth) {
                    System.out.println("Invalid date");
                } else {
                    d++;
                    // เกินจำนวนวัน → ขึ้นเดือนใหม่
                    if (d > daysInMonth) {
                        d = 1;
                        m++;
                        if (m > 12) {  // เกินเดือน 12 → ขึ้นปีใหม่
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
