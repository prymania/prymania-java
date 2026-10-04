import { j, c, pre } from "../lib.mjs";

export default {
  num: 10, file: "chapter-10.html",
  pageTitle: "บทที่ 10: ทดสอบและแก้บั๊ก", shortName: "บทที่ 10",
  tocLabel: "บทที่ 10 · หาและแก้ข้อผิดพลาด", sidebarBottom: "error คือเบาะแส ไม่ใช่ศัตรู",
  kicker: "บทที่ 10 · เปลี่ยนข้อผิดพลาดให้เป็นเบาะแส", h1: "ทดสอบ อ่าน error และแก้บั๊ก",
  lead: "จำแนกชนิดของข้อผิดพลาด อ่านข้อความจาก compiler และ JVM ไล่ค่าตัวแปรอย่างเป็นระบบ และออกแบบกรณีทดสอบก่อนส่งงาน",
  goals: ["แยก syntax, runtime และ logic error", "อ่าน compiler diagnostics และ stack trace", "trace ค่าตัวแปรและใช้ debugger", "ออกแบบ test case รวมถึงค่าขอบ"],
  prev: { href: "chapter-09.html", label: "← บทที่ 9" },
  next: { href: "chapter-11.html", label: "บทที่ 11: คลาสและออบเจ็กต์ →" },
  footer: "บทที่ 10 · แก้ทีละจุด แล้วทดสอบใหม่ทุกครั้ง",
  introHeading: "10. บั๊กเป็นเรื่องปกติ การหาบั๊กคือทักษะ",
  introHtml: `<p>โปรแกรมเมอร์ทุกคนเขียนโค้ดที่มีบั๊ก สิ่งที่ต่างกันคือ<strong>วิธีหาและแก้</strong> บทนี้รวบรวมเครื่องมือคิดที่ใช้ได้กับทุกบท: รู้ว่า error เป็นชนิดไหน อ่านข้อความให้ได้เบาะแส ไล่ค่าตัวแปรจนเจอจุดที่ผิด และทดสอบให้มั่นใจว่าแก้แล้วไม่พังที่อื่น</p>
<div class="concept-box"><span class="box-title">วงจรการแก้บั๊ก</span><ol class="step-list"><li><strong>ทำให้เกิดซ้ำได้</strong> — หา input ที่ทำให้ผิดทุกครั้ง</li><li><strong>จำกัดขอบเขต</strong> — หาว่าผิดตั้งแต่บรรทัดไหน (อ่าน error, พิมพ์ค่า, ใช้ debugger)</li><li><strong>ตั้งสมมติฐาน</strong> — “น่าจะเพราะ…” แล้วแก้ทีละจุด</li><li><strong>ทดสอบซ้ำ</strong> — ทั้ง input ที่เคยผิดและ input อื่นที่เคยถูก</li></ol></div>`,
  topics: [
    {
      num: "10.1", toc: "จำแนก error", title: "จำแนกชนิดของ error",
      blocks: [
        { type: "table", head: ["ชนิด", "เกิดเมื่อ", "ใครเป็นคนบอก", "ตัวอย่าง"], rows: [
          ["<strong>Syntax / compile error</strong>", "ตอนคอมไพล์", "javac (โปรแกรมยังไม่ได้รัน)", "ขาด ;, สะกดผิด, ชนิดไม่ตรง"],
          ["<strong>Runtime error (exception)</strong>", "ระหว่างรัน", "JVM แสดง stack trace แล้วหยุด", "หารด้วย 0, index เกิน, parse ผิด"],
          ["<strong>Logic error</strong>", "รันจบแต่ผลผิด", "ไม่มีใครบอก! ต้องทดสอบเอง", "ใช้ &gt; แทน &gt;=, หาร int, ลืมรีเซ็ตตัวแปร"],
        ] },
        { type: "run", label: "ตัวอย่าง 10.1.1", title: "Compile error: compiler หยุดตั้งแต่ก่อนรัน", level: "พื้นฐาน", expect: "compile-error",
          concept: "ไม่มี output ใด ๆ จากโปรแกรมเลย แม้บรรทัดแรกจะถูกต้อง เพราะคอมไพล์ไม่ผ่านทั้งไฟล์",
          code: j`
            public class CompileErrorDemo {
                public static void main(String[] args) {
                    System.out.println("Line 1 is fine");
                    int total = "100";
                    System.out.println("Total: " + total);
                }
            }`,
          steps: ["javac พบชนิดไม่ตรงที่บรรทัด 4", "\"Line 1 is fine\" ไม่ถูกพิมพ์ เพราะไม่ได้สร้าง .class"] },
        { type: "run", label: "ตัวอย่าง 10.1.2", title: "Runtime error: ทำงานไปบางส่วนแล้วหยุด", level: "พื้นฐาน", expect: "runtime-error",
          concept: "บรรทัดก่อนจุดผิดทำงานตามปกติ เมื่อถึงบรรทัดที่เกิด exception โปรแกรมหยุดทันที",
          code: j`
            public class RuntimeErrorDemo {
                public static void main(String[] args) {
                    int[] data = {10, 20, 30};
                    System.out.println("Start");
                    for (int i = 0; i <= data.length; i++) {
                        System.out.println("data[" + i + "] = " + data[i]);
                    }
                    System.out.println("End");
                }
            }`,
          steps: ["พิมพ์ Start และ 3 ค่าแรกได้", "i = 3 → ArrayIndexOutOfBoundsException", "End ไม่ถูกพิมพ์"] },
        { type: "run", label: "ตัวอย่าง 10.1.3", title: "Logic error: เงียบแต่ผิด", level: "ต่อยอด",
          concept: "รันจบโดยไม่มี error แต่คำตอบไม่ถูก — อันตรายที่สุดเพราะไม่มีสัญญาณเตือน",
          code: j`
            public class LogicErrorDemo {
                public static void main(String[] args) {
                    int[] scores = {80, 90, 85};
                    int sum = 0;
                    for (int i = 1; i < scores.length; i++) {
                        sum += scores[i];
                    }
                    double average = sum / scores.length;
                    System.out.println("Average = " + average);
                }
            }`,
          steps: ["คำตอบที่ถูกคือ (80 + 90 + 85) / 3 = 85.0", "บั๊กที่ 1: ลูปเริ่ม i = 1 ข้าม scores[0]", "บั๊กที่ 2: หาร int ด้วย int ตัดทศนิยม", "ได้ 175 / 3 = 58 → 58.0 ซึ่งผิด แต่ไม่มีใครเตือน"] },
        { type: "run", label: "ตัวอย่าง 10.1.4", title: "ดักจับ exception ด้วย try-catch", level: "ประยุกต์", stdin: "10\n0\n10\nabc\n10\n4",
          concept: "runtime error บางชนิดคาดการณ์ได้ (ผู้ใช้ป้อนผิด) ใช้ <code>try-catch</code> จัดการให้โปรแกรมทำงานต่อได้ แทนการหยุดทันที",
          code: j`
            import java.util.Scanner;

            public class TryCatchDemo {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    for (int round = 1; round <= 3; round++) {
                        try {
                            System.out.print("a b: ");
                            int a = Integer.parseInt(input.next());
                            int b = Integer.parseInt(input.next());
                            System.out.println("  a / b = " + (a / b));
                        } catch (ArithmeticException e) {
                            System.out.println("  Cannot divide by zero");
                        } catch (NumberFormatException e) {
                            System.out.println("  Not a number: " + e.getMessage());
                        }
                    }
                    System.out.println("Program finished normally");
                }
            }`,
          steps: ["รอบ 1: 10 / 0 → ArithmeticException → ไปที่ catch แรก", "รอบ 2: \"abc\" → NumberFormatException → catch ที่สอง", "รอบ 3: 10 / 4 = 2 ปกติ", "โปรแกรมไม่หยุดกลางคัน"],
          after: "ใช้ try-catch กับสถานการณ์ที่ควบคุมไม่ได้ (ข้อมูลจากผู้ใช้ ไฟล์ เครือข่าย) ไม่ใช่ใช้กลบบั๊กในโค้ดของเราเอง เช่น index เกิน ควรแก้เงื่อนไขลูปแทน" },
        { type: "check", title: "จำแนก", html: `<p>จัดประเภท: (ก) <code>Strin name;</code> (ข) <code>Integer.parseInt("")</code> (ค) คำนวณพื้นที่วงกลมด้วย <code>2 * Math.PI * r</code></p>`, answer: `<p>(ก) compile error — cannot find symbol (ข) runtime error — NumberFormatException (ค) logic error — นั่นคือสูตรเส้นรอบวง</p>` },
      ],
    },
    {
      num: "10.2", toc: "อ่าน compiler diagnostics", title: "อ่าน compiler diagnostics และ stack trace",
      blocks: [
        { type: "concept", title: "กายวิภาคของข้อความ error", html: pre(`
          Compile error:
          Score.java:7: error: cannot find symbol
          ─────┬──── ┬        ────────┬────────
             ไฟล์   บรรทัด         ชนิดปัญหา
                  totl += s;
                  ^          ← ตำแหน่งที่ compiler สะดุด
            symbol:   variable totl     ← ชื่อที่หาไม่เจอ
            location: class Score

          Runtime error (stack trace):
          Exception in thread "main" java.lang.ArithmeticException: / by zero
                                    ─────────┬──────────────────  ────┬────
                                        ชนิด exception              รายละเอียด
              at Stats.average(Stats.java:12)      ← เกิดจริงที่นี่ (อ่านบรรทัดบนสุดก่อน)
              at Stats.main(Stats.java:5)          ← เรียกมาจากที่นี่`) },
        { type: "run", label: "ตัวอย่าง 10.2.1", title: "หลาย error พร้อมกัน — แก้ตัวแรกก่อน", level: "พื้นฐาน", expect: "compile-error",
          concept: "javac รายงานหลาย error ในครั้งเดียว แก้จากบนลงล่างทีละตัวแล้วคอมไพล์ใหม่",
          code: j`
            public class Score {
                public static void main(String[] args) {
                    int[] scores = {7, 9, 8};
                    int total = 0;
                    for (int s : scores) {
                        totl += s;
                    }
                    String result = total;
                    System.out.println("Total: " + result)
                }
            }`,
          steps: ["javac รายงาน <code>';' expected</code> (บรรทัด 9) <em>ก่อน</em> — syntax error ถูกตรวจในรอบแรก ก่อนตรวจชื่อและชนิด", "เมื่อเติม ; แล้วคอมไพล์ใหม่ จะเห็น error ใหม่: <code>cannot find symbol: totl</code> และ <code>int cannot be converted to String</code>", "บทเรียน: จำนวน error ที่เห็นอาจไม่ใช่ทั้งหมด แก้แล้วต้องคอมไพล์ซ้ำเสมอ"] },
        { type: "run", label: "ตัวอย่าง 10.2.2", title: "error ชี้ผิดที่: ต้นเหตุอยู่บรรทัดก่อนหน้า", level: "ต่อยอด", expect: "compile-error",
          concept: "เมื่อวงเล็บไม่ครบ compiler อาจแจ้งที่บรรทัดหลัง ๆ เพราะเพิ่งรู้ตัวว่าโครงสร้างผิด",
          code: j`
            public class WrongPlace {
                public static void main(String[] args) {
                    int x = 5;
                    if (x > 3) {
                        System.out.println("big");
                    else {
                        System.out.println("small");
                    }
                }
            }`,
          steps: ["javac แจ้ง <code>'else' without 'if'</code> ที่บรรทัด 6", "สาเหตุจริงคือบรรทัด 5–6 ขาด <code>}</code> ปิด if ก่อน else", "error ที่สอง <code>reached end of file</code> เป็นผลพวงจากวงเล็บที่ขาดตัวเดียวกัน — แก้จุดเดียวหายทั้งสอง", "เคล็ดลับ: ใช้ IDE จัดย่อหน้าอัตโนมัติ (Format) วงเล็บที่ขาดจะเห็นชัด"] },
        { type: "run", label: "ตัวอย่าง 10.2.3", title: "อ่าน stack trace ข้ามหลายเมธอด", level: "ประยุกต์", expect: "runtime-error",
          concept: "stack trace แสดงลำดับการเรียกเมธอด บรรทัดแรกที่เป็นโค้ดของเราคือจุดเกิดเหตุ บรรทัดล่างบอกว่าใครเรียกมา",
          code: j`
            public class StackTraceDemo {
                public static void main(String[] args) {
                    int[] empty = {};
                    System.out.println("Report:");
                    printAverage(empty);
                }

                static void printAverage(int[] values) {
                    System.out.println("Average = " + average(values));
                }

                static int average(int[] values) {
                    int sum = 0;
                    for (int v : values) sum += v;
                    return sum / values.length;
                }
            }`,
          steps: ["อ่านจากบน: เกิดใน <code>average</code> บรรทัด 15 (หารด้วย length = 0)", "<code>average</code> ถูกเรียกจาก <code>printAverage</code> บรรทัด 9", "ซึ่งถูกเรียกจาก <code>main</code> บรรทัด 5", "แก้ที่ต้นเหตุ: ตรวจ <code>values.length == 0</code> ใน average"] },
        { type: "table", title: "Exception ที่พบบ่อยและความหมาย", head: ["Exception", "สาเหตุที่พบบ่อย"], rows: [
          ["<code>ArithmeticException: / by zero</code>", "หาร int ด้วย 0"],
          ["<code>ArrayIndexOutOfBoundsException</code>", "index &lt; 0 หรือ ≥ length (มัก <code>&lt;=</code> ในลูป)"],
          ["<code>StringIndexOutOfBoundsException</code>", "charAt/substring เกินความยาว"],
          ["<code>NullPointerException</code>", "เรียกเมธอดบนตัวแปรที่เป็น null"],
          ["<code>NumberFormatException</code>", "parseInt/parseDouble กับข้อความที่ไม่ใช่ตัวเลข"],
          ["<code>InputMismatchException</code>", "Scanner.nextInt() เจอข้อมูลที่ไม่ใช่จำนวนเต็ม"],
        ] },
        { type: "check", title: "อ่าน stack trace", html: pre(`
          Exception in thread "main" java.lang.NullPointerException
              at Shop.totalPrice(Shop.java:21)
              at Shop.checkout(Shop.java:14)
              at Shop.main(Shop.java:6)`) + `<p>ควรเปิดดูบรรทัดไหนก่อน และ null น่าจะมาจากที่ใด</p>`, answer: `<p>ดู <strong>Shop.java บรรทัด 21</strong> ใน totalPrice ก่อน ตัวแปรที่เรียกเมธอดในบรรทัดนั้นเป็น null — ค่า null อาจถูกส่งมาจาก checkout (บรรทัด 14) จึงต้องย้อนดูต่อ</p>` },
      ],
    },
    {
      num: "10.3", toc: "trace และ debugger", title: "trace ค่าตัวแปร และใช้ debugger",
      blocks: [
        { type: "p", html: `เมื่อเจอ logic error ให้หาจุดที่<strong>ค่าจริงเริ่มต่างจากค่าที่คาด</strong> มี 3 วิธีที่ใช้ร่วมกัน: (1) trace table ด้วยมือ (2) พิมพ์ค่ากลางทาง (print debugging) (3) debugger ใน IDE` },
        { type: "run", label: "ตัวอย่าง 10.3.1", title: "print debugging: หาว่าผิดตั้งแต่รอบไหน", level: "พื้นฐาน",
          concept: "เพิ่ม println ชั่วคราวในลูปแสดงค่าตัวแปรสำคัญทุกรอบ แล้วเทียบกับ trace table ที่ทำด้วยมือ",
          code: j`
            public class DebugFactorial {
                public static void main(String[] args) {
                    int n = 5;
                    int result = 0;
                    for (int i = 1; i <= n; i++) {
                        result *= i;
                        System.out.println("DEBUG i=" + i + " result=" + result);
                    }
                    System.out.println(n + "! = " + result);
                }
            }`,
          steps: ["คาดว่า i=1 → result=1, i=2 → 2, … i=5 → 120", "แต่ DEBUG แสดง result = 0 ตั้งแต่รอบแรก", "จึงรู้ว่าปัญหาอยู่ที่ค่าเริ่มต้น: ผลคูณต้องเริ่มที่ 1", "แก้แล้วลบบรรทัด DEBUG ออก"] },
        { type: "run", label: "ตัวอย่าง 10.3.2", title: "แก้แล้ว: เทียบ trace ที่คาดกับผลจริง", level: "ต่อยอด",
          concept: "หลังแก้ ให้รันพร้อม trace อีกครั้งเพื่อยืนยันว่าทุกรอบตรงกับที่คาด",
          code: j`
            public class DebugFactorialFixed {
                public static void main(String[] args) {
                    int n = 5;
                    int result = 1;
                    for (int i = 1; i <= n; i++) {
                        result *= i;
                        System.out.printf("i=%d result=%d%n", i, result);
                    }
                    System.out.println(n + "! = " + result);
                }
            }`,
          steps: ["ทุกรอบตรงกับ trace table ด้านล่าง", "ผลลัพธ์ 120 ถูกต้อง"] },
        { type: "table", cls: "trace-table", head: ["i", "result ที่คาด", "ผลจริง (ก่อนแก้)"], rows: [["1", "1", "0"], ["2", "2", "0"], ["3", "6", "0"], ["4", "24", "0"], ["5", "120", "0"]] },
        { type: "steps", title: "ใช้ debugger ใน IDE (IntelliJ / VS Code / NetBeans)", items: [
          "<strong>ตั้ง breakpoint</strong>: คลิกที่ขอบซ้ายของบรรทัดที่สงสัย จะเกิดจุดสีแดง",
          "<strong>รันแบบ Debug</strong> (ไอคอนแมลง 🐞) โปรแกรมจะหยุดเมื่อถึง breakpoint",
          "<strong>ดูหน้าต่าง Variables</strong>: เห็นค่าของทุกตัวแปรในขณะนั้น",
          "<strong>Step Over (F8 / F10)</strong>: ทำบรรทัดปัจจุบันแล้วหยุดที่บรรทัดถัดไป",
          "<strong>Step Into (F7 / F11)</strong>: ถ้าบรรทัดนั้นเรียกเมธอด ให้เข้าไปดูข้างในเมธอด",
          "<strong>Resume</strong>: ทำต่อจนถึง breakpoint ถัดไป — ใช้ <em>conditional breakpoint</em> (เช่น หยุดเมื่อ i == 50) เมื่อลูปมีหลายรอบ",
        ] },
        { type: "run", label: "ตัวอย่าง 10.3.3", title: "บั๊กลูปซ้อน: ลืมรีเซ็ตตัวแปร", level: "ประยุกต์",
          concept: "ผลรวมของแถวแรกถูก แต่แถวถัดไปผิดสะสม — สัญญาณว่าตัวแปรสะสมถูกประกาศนอกลูปนอก",
          code: j`
            public class ResetBug {
                public static void main(String[] args) {
                    int[][] sales = {{5, 3, 2}, {4, 4, 4}, {1, 0, 6}};
                    int rowTotal = 0;
                    for (int r = 0; r < sales.length; r++) {
                        for (int c = 0; c < sales[r].length; c++) {
                            rowTotal += sales[r][c];
                        }
                        System.out.println("Row " + r + " total = " + rowTotal);
                    }
                }
            }`,
          steps: ["คาด: 10, 12, 7", "ได้: 10, 22, 29 — แถว 1 เริ่มจาก 10 แทน 0", "แก้: ย้าย <code>int rowTotal = 0;</code> เข้าไปไว้ต้นลูปนอก", "ใน debugger จะเห็น rowTotal = 10 ตอนเริ่มแถว 1 ทันที"] },
        { type: "run", label: "ตัวอย่าง 10.3.4", title: "เมธอดตรวจสอบสมมติฐาน (assert-style)", level: "ท้าทาย",
          concept: "เขียนเมธอดเล็ก ๆ ตรวจเงื่อนไขที่ “ต้องจริงเสมอ” และแจ้งเตือนทันทีเมื่อผิด ช่วยจับบั๊กใกล้จุดเกิดเหตุ",
          code: j`
            public class CheckInvariant {
                public static void main(String[] args) {
                    int[] stock = {5, 2, 8};
                    sell(stock, 0, 3);
                    sell(stock, 1, 5);
                    sell(stock, 2, 8);
                }

                static void sell(int[] stock, int item, int qty) {
                    stock[item] -= qty;
                    check(stock[item] >= 0, "stock of item " + item + " became " + stock[item]);
                    System.out.println("Sold " + qty + " of item " + item + ", left " + stock[item]);
                }

                static void check(boolean condition, String message) {
                    if (!condition) {
                        System.out.println("!! CHECK FAILED: " + message);
                    }
                }
            }`,
          steps: ["กฎที่ต้องจริงเสมอ: สต็อกต้องไม่ติดลบ", "ขายสินค้า 1 จำนวน 5 ทั้งที่มี 2 → check แจ้งเตือนทันที", "ชี้ว่าบั๊กอยู่ที่ sell ไม่ได้ตรวจก่อนลด (ควรตรวจ qty ≤ stock ก่อน)"] },
        { type: "check", title: "trace", html: pre(`
          int a = 1, b = 1;
          for (int i = 0; i < 4; i++) {
              int t = a + b;
              a = b;
              b = t;
          }`) + `<p>ทำ trace table: a และ b หลังจบลูปมีค่าเท่าไร</p>`, answer: `<p>(a, b): (1,1) → (1,2) → (2,3) → (3,5) → (5,8) ดังนั้น <strong>a = 5, b = 8</strong> (ลำดับฟีโบนัชชี)</p>` },
      ],
    },
    {
      num: "10.4", toc: "ออกแบบ test case", title: "ออกแบบ test case",
      blocks: [
        { type: "p", html: `การทดสอบด้วยค่าที่ “คิดว่าน่าจะใช้” ค่าเดียวไม่พอ ควรเลือก test case ที่ครอบคลุม: <strong>กรณีปกติ</strong>, <strong>ค่าขอบ (boundary)</strong> และ<strong>กรณีผิดปกติ/ข้อมูลไม่ถูกต้อง</strong> แล้วเขียน “ผลที่คาด” ก่อนรันทุกครั้ง` },
        { type: "table", title: "ตัวอย่าง: test case ของฟังก์ชันตัดเกรด (A ≥ 80, B ≥ 70, C ≥ 60, D ≥ 50, F)", head: ["ประเภท", "input", "ผลที่คาด", "เหตุผล"], rows: [
          ["ปกติ", "85, 65", "A, C", "ค่ากลางช่วง"], ["ขอบ", "80, 79", "A, B", "รอยต่อระหว่างเกรด"], ["ขอบ", "50, 49", "D, F", "ขอบผ่าน/ไม่ผ่าน"], ["ขอบสุด", "0, 100", "F, A", "ค่าต่ำ/สูงสุดที่ยอมรับ"], ["ผิดปกติ", "-1, 101", "Invalid", "นอกช่วง"],
        ] },
        { type: "run", label: "ตัวอย่าง 10.4.1", title: "เขียนโค้ดทดสอบแบบตาราง", level: "ต่อยอด",
          concept: "เก็บ input และผลที่คาดในอาเรย์คู่ขนาน แล้ววนเรียกเมธอดเทียบผล — เพิ่ม test ใหม่ได้ง่าย",
          code: j`
            public class GradeTests {
                public static void main(String[] args) {
                    int[] inputs = {85, 65, 80, 79, 50, 49, 0, 100, -1, 101};
                    String[] expected = {"A", "C", "A", "B", "D", "F", "F", "A", "Invalid", "Invalid"};
                    int passed = 0;
                    for (int i = 0; i < inputs.length; i++) {
                        String actual = grade(inputs[i]);
                        boolean ok = actual.equals(expected[i]);
                        if (ok) passed++;
                        System.out.printf("%-4s grade(%d) = %s, expected %s%n", ok ? "OK" : "FAIL", inputs[i], actual, expected[i]);
                    }
                    System.out.println(passed + "/" + inputs.length + " tests passed");
                }

                static String grade(int score) {
                    if (score < 0 || score > 100) return "Invalid";
                    if (score > 80) return "A";
                    if (score >= 70) return "B";
                    if (score >= 60) return "C";
                    if (score >= 50) return "D";
                    return "F";
                }
            }`,
          steps: ["9 จาก 10 ผ่าน", "FAIL ที่ grade(80) ได้ B — test ค่าขอบจับบั๊ก <code>&gt; 80</code> ที่ควรเป็น <code>&gt;= 80</code>", "ถ้าทดสอบแค่ 85 และ 65 จะไม่มีวันเจอบั๊กนี้"] },
        { type: "run", label: "ตัวอย่าง 10.4.2", title: "ทดสอบเมธอดที่คืน double", level: "ประยุกต์",
          concept: "เทียบ double ด้วยค่าคลาดเคลื่อนที่ยอมรับได้ (epsilon) ไม่ใช่ <code>==</code> และทดสอบกรณีพิเศษ เช่น อาเรย์ว่าง",
          code: j`
            public class AverageTests {
                public static void main(String[] args) {
                    test(new double[]{2, 4, 6}, 4.0);
                    test(new double[]{0.1, 0.2}, 0.15);
                    test(new double[]{-5, 5}, 0.0);
                    test(new double[]{7}, 7.0);
                    test(new double[]{}, 0.0);
                }

                static double average(double[] values) {
                    if (values.length == 0) return 0.0;
                    double sum = 0;
                    for (double v : values) sum += v;
                    return sum / values.length;
                }

                static void test(double[] values, double expected) {
                    double actual = average(values);
                    boolean ok = Math.abs(actual - expected) < 1e-9;
                    System.out.printf("%s n=%d actual=%.4f expected=%.4f%n", ok ? "OK  " : "FAIL", values.length, actual, expected);
                }
            }`,
          steps: ["กรณีปกติ, ทศนิยม, ค่าลบ, สมาชิกเดียว, อาเรย์ว่าง", "0.1 + 0.2 ไม่เท่ากับ 0.3 พอดี จึงใช้ epsilon", "กรณีว่างต้องตัดสินใจล่วงหน้าว่าควรคืนอะไร (ที่นี่คืน 0.0)"] },
        { type: "note", title: "Checklist ก่อนส่งงาน", html: `<ul><li>ทดสอบตัวอย่างในโจทย์ทุกตัว และเทียบ output ทีละตัวอักษร (ช่องว่าง ตัวพิมพ์)</li><li>ทดสอบค่าขอบทุกเงื่อนไข (=, ค่าก่อน และค่าหลังขอบ)</li><li>ทดสอบ 0, ค่าติดลบ, ข้อมูลว่าง, ข้อมูลตัวเดียว</li><li>ลบ println ที่ใช้ debug ออก</li><li>ตั้งชื่อตัวแปรและจัดย่อหน้าให้อ่านง่าย</li></ul>` },
        { type: "check", title: "เลือก test case", html: `<p>เมธอด <code>isTeen(int age)</code> คืน true เมื่ออายุ 13–19 ควรทดสอบด้วยค่าใดบ้างอย่างน้อย</p>`, answer: `<p>12, 13, 19, 20 (ค่าขอบสองด้าน) + ค่ากลางเช่น 16 + ค่าผิดปกติเช่น −1 — ผลที่คาด: false, true, true, false, true, false</p>` },
      ],
    },
  ],
  exercisesIntro: "แต่ละข้อมีโค้ดที่มีบั๊กหรือโจทย์ให้ออกแบบการทดสอบ ให้หาสาเหตุด้วยวิธีในบทนี้ (อ่าน error, trace, print debugging) แล้วแก้ให้ได้ผลตามตัวอย่าง",
  exercises: [
    { level: 1, title: "แก้ compile error 3 จุด", html: `<p>โค้ดนี้คอมไพล์ไม่ผ่าน ให้คอมไพล์ อ่าน error ทีละตัว และแก้ให้รันได้ผลตามตัวอย่าง</p>` + pre(`
        public class Rectangle {
            public static void main(String[] args) {
                double width = 4.5
                double height = 2;
                doubel area = width * height;
                System.out.println("Area = " + Area);
            }
        }`),
      spec: ["บันทึกข้อความ error ของแต่ละจุด", "แก้ทีละจุดแล้วคอมไพล์ใหม่"],
      solution: j`
        public class Rectangle {
            public static void main(String[] args) {
                double width = 4.5;
                double height = 2;
                double area = width * height;
                System.out.println("Area = " + area);
            }
        }`, explain: "(1) <code>';' expected</code> บรรทัด 3 (2) <code>cannot find symbol: class doubel</code> (3) <code>cannot find symbol: variable Area</code> — Java แยกตัวพิมพ์ใหญ่เล็ก" },
    { level: 1, title: "จำแนกและอธิบาย error", html: `<p>สำหรับแต่ละโค้ดสั้น ๆ ต่อไปนี้ ให้ระบุว่าเป็น compile, runtime หรือ logic error พร้อมเหตุผลและวิธีแก้ แล้วเขียนโปรแกรมฉบับแก้ไขที่รวมทั้ง 4 ส่วนให้รันได้ผลตามตัวอย่าง</p>` + pre(`
        (1) int count = 10.0;
        (2) String s = "abc";  int n = Integer.parseInt(s);
        (3) int celsius = 30;  double f = celsius * 9 / 5 + 32;   // คาดว่า 86.0 ✓ แต่ถ้า celsius = 31 ได้ 87.0 (ที่ถูก 87.8)
        (4) int[] a = new int[3];  a[3] = 7;`),
      spec: ["ตอบชนิด error ของแต่ละข้อ", "ฉบับแก้ไข: (1) ใช้ int 10 (2) ใช้ \"123\" (3) celsius = 31 ได้ 87.8 (4) กำหนดค่าที่ index 2"],
      solution: j`
        public class ClassifyFix {
            public static void main(String[] args) {
                int count = 10;
                int n = Integer.parseInt("123");
                int celsius = 31;
                double f = celsius * 9.0 / 5 + 32;
                int[] a = new int[3];
                a[2] = 7;
                System.out.println("count = " + count);
                System.out.println("n = " + n);
                System.out.println("f = " + f);
                System.out.println("a[2] = " + a[2]);
            }
        }`, explain: "(1) compile — lossy conversion (2) runtime — NumberFormatException (3) logic — หาร int ตัดทศนิยม (4) runtime — ArrayIndexOutOfBounds" },
    { level: 1, title: "ออกแบบ test case ของ isLeapYear", html: `<p>ออกแบบ test case อย่างน้อย 6 กรณีสำหรับเมธอด <code>isLeapYear(int year)</code> (หาร 4 ลงตัว และไม่ลงตัวด้วย 100 หรือหาร 400 ลงตัว) ครอบคลุมทุกเส้นทางของเงื่อนไข แล้วเขียนโปรแกรมทดสอบแบบตารางที่แสดง OK/FAIL</p>`,
      spec: ["ต้องมีกรณี: หาร 4 ไม่ลงตัว, หาร 4 ลงตัวแต่ไม่ลงตัว 100, หาร 100 ลงตัวแต่ไม่ลงตัว 400, หาร 400 ลงตัว", "เก็บ input/expected ในอาเรย์คู่ขนาน", "สรุปจำนวนที่ผ่าน"],
      solution: j`
        public class LeapYearTests {
            public static void main(String[] args) {
                int[] years = {2023, 2024, 1900, 2000, 2100, 2400};
                boolean[] expected = {false, true, false, true, false, true};
                int passed = 0;
                for (int i = 0; i < years.length; i++) {
                    boolean actual = isLeapYear(years[i]);
                    boolean ok = actual == expected[i];
                    if (ok) passed++;
                    System.out.printf("%-4s %d -> %b%n", ok ? "OK" : "FAIL", years[i], actual);
                }
                System.out.println(passed + "/" + years.length + " passed");
            }

            static boolean isLeapYear(int year) {
                return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
            }
        }` },
    { level: 2, title: "ค่าเฉลี่ยที่ผิด", html: `<p>โปรแกรมนี้ควรรับคะแนน 5 ค่าแล้วแสดงค่าเฉลี่ยทศนิยม 2 ตำแหน่ง แต่ผลผิด เช่น ป้อน 70 80 90 85 76 ได้ <code>Average = 65.00</code> (ที่ถูกคือ 80.20) ให้ใช้ print debugging หาสาเหตุ แก้ให้ถูก และอธิบายว่ามีบั๊กกี่จุด</p>` + pre(`
        Scanner input = new Scanner(System.in);
        int sum = 0;
        int score = 0;
        for (int i = 1; i < 5; i++) {
            score = input.nextInt();
            sum += score;
        }
        double average = sum / 5;
        System.out.printf("Average = %.2f%n", average);`),
      spec: ["เพิ่ม println แสดง i และ sum ในลูปเพื่อดูว่าวนกี่รอบ", "แก้ทั้งจำนวนรอบและการหาร"], stdin: "70 80 90 85 76",
      solution: j`
        import java.util.Scanner;

        public class FixAverage {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("5 scores: ");
                int sum = 0;
                for (int i = 0; i < 5; i++) {
                    sum += input.nextInt();
                }
                double average = sum / 5.0;
                System.out.printf("Average = %.2f%n", average);
            }
        }`, explain: "บั๊ก 2 จุด: (1) ลูป <code>i = 1; i &lt; 5</code> วนแค่ 4 รอบ อ่านแค่ 70 80 90 85 ได้ sum = 325 (2) <code>sum / 5</code> เป็นการหาร int ได้ 65 แล้วจึงกลายเป็น 65.0 ต้องใช้ 5.0" },
    { level: 2, title: "ค้นหาที่หาไม่เจอ", html: `<p>เมธอด <code>indexOf</code> ด้านล่างควรคืนตำแหน่งของ target ในอาเรย์ หรือ −1 ถ้าไม่พบ แต่ทดสอบแล้วได้ผลแปลก: หา 30 ใน {10, 20, 30, 40} ได้ −1 ให้ trace หาบั๊กและแก้ไข พร้อมเขียน test 4 กรณี (ตัวแรก, ตัวกลาง, ตัวสุดท้าย, ไม่มี)</p>` + pre(`
        static int indexOf(int[] a, int target) {
            for (int i = 0; i < a.length; i++) {
                if (a[i] == target) {
                    return i;
                } else {
                    return -1;
                }
            }
            return -1;
        }`),
      spec: ["trace: ลูปวนกี่รอบจริง ๆ", "แก้ให้คืน −1 เฉพาะเมื่อวนครบแล้วไม่พบ", "ทดสอบทั้ง 4 กรณี"],
      solution: j`
        public class FixSearch {
            public static void main(String[] args) {
                int[] a = {10, 20, 30, 40};
                int[] targets = {10, 30, 40, 99};
                int[] expected = {0, 2, 3, -1};
                for (int i = 0; i < targets.length; i++) {
                    int actual = indexOf(a, targets[i]);
                    System.out.printf("%s indexOf(%d) = %d%n", actual == expected[i] ? "OK  " : "FAIL", targets[i], actual);
                }
            }

            static int indexOf(int[] a, int target) {
                for (int i = 0; i < a.length; i++) {
                    if (a[i] == target) {
                        return i;
                    }
                }
                return -1;
            }
        }`, explain: "else return -1 ทำให้เมธอดจบตั้งแต่รอบแรกถ้าตัวแรกไม่ตรง — เป็นบั๊กที่พบบ่อยมาก" },
    { level: 2, title: "Exception จากข้อมูลผู้ใช้", html: `<p>เขียนโปรแกรมรับ “จำนวนสินค้า” และ “ราคารวม” เป็นข้อความ (nextLine) แล้วคำนวณราคาต่อชิ้น ให้ดักทุกกรณีผิดพลาดด้วย try-catch และข้อความที่เป็นมิตร: ป้อนไม่ใช่ตัวเลข, จำนวนเป็น 0, จำนวนติดลบ (ตรวจด้วย if) ถ้าผิดให้ถามใหม่ทั้งชุดจนกว่าจะถูก</p>`,
      spec: ["ใช้ Integer.parseInt และ Double.parseDouble", "catch NumberFormatException", "ตรวจจำนวน ≤ 0 ด้วย if ก่อนหาร", "วนด้วย while จนสำเร็จ"], stdin: "five\n0\n100\n4\n100",
      solution: j`
        import java.util.Scanner;

        public class SafeUnitPrice {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                boolean done = false;
                while (!done) {
                    try {
                        System.out.print("Quantity: ");
                        int qty = Integer.parseInt(input.nextLine().trim());
                        System.out.print("Total price: ");
                        double total = Double.parseDouble(input.nextLine().trim());
                        if (qty <= 0) {
                            System.out.println("  Quantity must be positive. Try again.");
                        } else {
                            System.out.printf("Unit price = %.2f%n", total / qty);
                            done = true;
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("  Please enter numbers only. Try again.");
                    }
                }
            }
        }`, explain: "เมื่อ parseInt โยน exception คำสั่งที่เหลือใน try (รวมถึงคำถาม Total price) จะถูกข้ามทันทีแล้วไปที่ catch" },
    { level: 2, title: "พีระมิดที่เบี้ยว", html: `<p>โค้ดนี้ควรพิมพ์พีระมิดสูง 4 แถวตามตัวอย่าง แต่ได้รูปที่ผิด ให้ทำ trace table ของจำนวนช่องว่างและจำนวนดาวในแต่ละแถว (ที่คาด vs ที่ได้) แล้วแก้ไข</p>` + pre(`
        int h = 4;
        for (int row = 1; row <= h; row++) {
            for (int s = 0; s <= h - row; s++) System.out.print(" ");
            for (int k = 0; k <= 2 * row; k++) System.out.print("*");
            System.out.println();
        }`),
      spec: ["แถวที่ row ควรมีช่องว่าง h − row และดาว 2·row − 1", "ระบุว่าลูปทั้งสองนับเกินไปกี่รอบ"],
      solution: j`
        public class FixPyramid {
            public static void main(String[] args) {
                int h = 4;
                for (int row = 1; row <= h; row++) {
                    for (int s = 0; s < h - row; s++) System.out.print(" ");
                    for (int k = 0; k < 2 * row - 1; k++) System.out.print("*");
                    System.out.println();
                }
            }
        }`, explain: "ลูปที่เริ่ม 0 และใช้ <= วนเกิน 1 รอบ (off-by-one) และจำนวนดาวต้องเป็น 2·row − 1 ไม่ใช่ 2·row + 1" },
    { level: 3, title: "ระบบคิดค่าส่งที่มีบั๊กหลายจุด", html: `<p>กติกา: น้ำหนัก ≤ 1 กก. 40 บาท, > 1 ถึง ≤ 5 กก. 40 บาท + กิโลละ 15 บาทในส่วนที่เกิน 1 กก., > 5 กก. ค่าส่งเหมา 120 บาท + กิโลละ 10 บาทในส่วนที่เกิน 5 กก. สมาชิกลด 10% ของค่าส่ง (ปัดเศษ 2 ตำแหน่ง) น้ำหนัก ≤ 0 ให้คืน −1</p><p>โค้ดด้านล่างมีบั๊ก<strong>อย่างน้อย 3 จุด</strong> ให้เขียน test case ครอบคลุมค่าขอบ (0, 1, 1.5, 5, 5.5, 10 ทั้งสมาชิกและไม่ใช่) หาบั๊กด้วยการทดสอบ แล้วแก้ไข</p>` + pre(`
        static double shipping(double kg, boolean member) {
            double fee;
            if (kg < 0) return -1;
            if (kg < 1) fee = 40;
            else if (kg <= 5) fee = 40 + kg * 15;
            else fee = 120 + (kg - 5) * 10;
            if (member) fee = fee * 0.1;
            return fee;
        }`),
      spec: ["เขียนตารางผลที่คาดด้วยมือก่อนรัน", "โปรแกรมทดสอบแสดง OK/FAIL ทุกกรณี", "หลังแก้ต้องผ่านทุกกรณี"],
      solution: j`
        public class ShippingTests {
            public static void main(String[] args) {
                double[] kg = {0, 1, 1.5, 5, 5.5, 10, 1, 5.5};
                boolean[] member = {false, false, false, false, false, false, true, true};
                double[] expected = {-1, 40, 47.5, 100, 125, 170, 36, 112.5};
                int passed = 0;
                for (int i = 0; i < kg.length; i++) {
                    double actual = shipping(kg[i], member[i]);
                    boolean ok = Math.abs(actual - expected[i]) < 0.001;
                    if (ok) passed++;
                    System.out.printf("%-4s kg=%.1f member=%-5b -> %.2f (expected %.2f)%n", ok ? "OK" : "FAIL", kg[i], member[i], actual, expected[i]);
                }
                System.out.println(passed + "/" + kg.length + " passed");
            }

            static double shipping(double kg, boolean member) {
                if (kg <= 0) return -1;
                double fee;
                if (kg <= 1) fee = 40;
                else if (kg <= 5) fee = 40 + (kg - 1) * 15;
                else fee = 120 + (kg - 5) * 10;
                if (member) fee = fee * 0.9;
                return Math.round(fee * 100) / 100.0;
            }
        }`, explain: "บั๊กที่แก้: (1) <code>kg &lt; 0</code> → <code>kg &lt;= 0</code> (2) <code>kg &lt; 1</code> → <code>kg &lt;= 1</code> (3) ส่วนเกินต้องเป็น <code>(kg − 1) * 15</code> (4) ลด 10% คือคูณ 0.9 ไม่ใช่ 0.1 (5) ไม่ได้ปัดเศษ" },
    { level: 3, title: "Bubble sort ที่เรียงไม่ครบ", html: `<p>โค้ดนี้ควรเรียงอาเรย์จากน้อยไปมาก แต่บางชุดข้อมูลเรียงไม่ถูก ให้ (1) หาชุดข้อมูลที่ทำให้ผิด (2) พิมพ์อาเรย์หลังแต่ละ pass เพื่อหาสาเหตุ (3) แก้ไขและทดสอบกับ: อาเรย์เรียงแล้ว, เรียงกลับ, มีค่าซ้ำ, สมาชิกเดียว, ว่าง</p>` + pre(`
        static void sort(int[] a) {
            for (int pass = 0; pass < a.length - 2; pass++) {
                for (int i = 0; i < a.length - 1 - pass; i++) {
                    if (a[i] > a[i + 1]) {
                        a[i] = a[i + 1];
                        a[i + 1] = a[i];
                    }
                }
            }
        }`),
      spec: ["มีบั๊ก 2 จุด: จำนวน pass และการสลับค่า", "เขียนเมธอด <code>isSorted(int[] a)</code> ใช้ตรวจผลอัตโนมัติ", "แสดงผลทุกชุดทดสอบ"],
      solution: j`
        import java.util.Arrays;

        public class FixBubbleSort {
            public static void main(String[] args) {
                int[][] tests = {{1, 2, 3, 4}, {4, 3, 2, 1}, {3, 1, 3, 2, 1}, {7}, {}};
                for (int[] t : tests) {
                    String before = Arrays.toString(t);
                    sort(t);
                    System.out.printf("%-16s -> %-16s %s%n", before, Arrays.toString(t), isSorted(t) ? "OK" : "FAIL");
                }
            }

            static void sort(int[] a) {
                for (int pass = 0; pass < a.length - 1; pass++) {
                    for (int i = 0; i < a.length - 1 - pass; i++) {
                        if (a[i] > a[i + 1]) {
                            int temp = a[i];
                            a[i] = a[i + 1];
                            a[i + 1] = temp;
                        }
                    }
                }
            }

            static boolean isSorted(int[] a) {
                for (int i = 0; i + 1 < a.length; i++) {
                    if (a[i] > a[i + 1]) return false;
                }
                return true;
            }
        }`, explain: "(1) การสลับไม่มีตัวแปร temp ทำให้ทั้งสองช่องได้ค่าเดียวกัน — ข้อมูลหาย (2) <code>a.length - 2</code> ทำให้ขาดไป 1 pass อาเรย์เรียงกลับขนาด 4 จะไม่เรียงครบ" },
    { level: 3, title: "ตัวตรวจสอบเลขบัญชีพร้อมชุดทดสอบ", html: `<p>เขียนเมธอด <code>String validateAccount(String acc)</code> ตรวจเลขบัญชีรูปแบบ <code>XXX-X-XXXXX-X</code> (ตัวเลข 10 หลัก มีขีดตามตำแหน่งนี้เท่านั้น) คืน <code>"OK"</code> หรือข้อความบอกปัญหาแรกที่พบ: <code>"empty"</code>, <code>"wrong length"</code>, <code>"dash at position N"</code>, <code>"non-digit at position N"</code> (N นับจาก 0) จากนั้นออกแบบชุดทดสอบอย่างน้อย 7 กรณีที่ทำให้ได้ข้อความครบทุกแบบ และแสดงผล OK/FAIL</p>`,
      spec: ["ความยาวที่ถูกคือ 13 ตัวอักษร ขีดอยู่ที่ index 3, 5, 11", "ตรวจตามลำดับ: ว่าง → ความยาว → ทีละตำแหน่ง", "ข้อมูล null ให้ถือเป็น empty", "ทุก test case เขียนผลที่คาดไว้ล่วงหน้า"],
      solution: j`
        public class AccountValidator {
            public static void main(String[] args) {
                String[] inputs = {"123-4-56789-0", "", "123-4-56789", "1234-5-6789-0", "123-4-5678a-0", "12a-4-56789-0", "123-4-56789-01", null};
                String[] expected = {"OK", "empty", "wrong length", "dash at position 3", "non-digit at position 10", "non-digit at position 2", "wrong length", "empty"};
                int passed = 0;
                for (int i = 0; i < inputs.length; i++) {
                    String actual = validateAccount(inputs[i]);
                    boolean ok = actual.equals(expected[i]);
                    if (ok) passed++;
                    System.out.printf("%-4s %-16s -> %s%n", ok ? "OK" : "FAIL", "\"" + inputs[i] + "\"", actual);
                }
                System.out.println(passed + "/" + inputs.length + " passed");
            }

            static String validateAccount(String acc) {
                if (acc == null || acc.isEmpty()) return "empty";
                if (acc.length() != 13) return "wrong length";
                for (int i = 0; i < acc.length(); i++) {
                    char ch = acc.charAt(i);
                    boolean dashPos = i == 3 || i == 5 || i == 11;
                    if (dashPos && ch != '-') return "dash at position " + i;
                    if (!dashPos && !Character.isDigit(ch)) {
                        return ch == '-' ? "dash at position " + i : "non-digit at position " + i;
                    }
                }
                return "OK";
            }
        }`, explain: "ตรวจ <code>acc == null</code> ก่อนเรียก isEmpty() เสมอ (short-circuit ของ || ช่วยป้องกัน NullPointerException)" },
  ],
};
