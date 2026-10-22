import { j, c, pre, jpre } from "../lib.mjs";

export default {
  num: 9, file: "chapter-09.html",
  pageTitle: "บทที่ 9: ข้อความและ String", shortName: "บทที่ 9",
  tocLabel: "บทที่ 9 · ทำงานกับข้อความ", sidebarBottom: "String เปลี่ยนไม่ได้ ทุกเมธอดคืนข้อความใหม่",
  kicker: "บทที่ 9 · จัดการข้อมูลตัวอักษร", h1: "ข้อความและ String",
  lead: "เปรียบเทียบ ค้นหา ตัด แปลง และสร้างข้อความ เพื่อจัดการข้อมูลที่ผู้ใช้ป้อนเข้ามาให้ถูกต้อง",
  goals: ["เปรียบเทียบและต่อข้อความอย่างถูกวิธี", "ค้นหาและตัดข้อความด้วย indexOf และ substring", "แปลงข้อความเป็นตัวเลขและกลับกัน", "ทำงานกับ char และสร้างข้อความด้วย StringBuilder"],
  prev: { href: "chapter-08.html", label: "← บทที่ 8" },
  next: { href: "chapter-10.html", label: "บทที่ 10: ทดสอบและแก้บั๊ก →" },
  footer: "บทที่ 9 · ใช้ equals เปรียบเทียบข้อความเสมอ",
  introHeading: "9. ข้อความคือชุดของอักขระที่มีตำแหน่ง",
  introHtml: `<p><code>String</code> คือลำดับของอักขระ (char) แต่ละตัวมีตำแหน่ง (index) เริ่มที่ 0 เหมือนอาเรย์ สิ่งสำคัญที่ต้องจำคือ String เป็น <strong>immutable</strong> — สร้างแล้วเปลี่ยนไม่ได้ เมธอดอย่าง <code>toUpperCase()</code> หรือ <code>replace()</code> จะ<em>คืนข้อความใหม่</em> ข้อความเดิมยังเหมือนเดิม</p>`
    + jpre(`
      String s = "Java Code";
      index:   0 1 2 3 4 5 6 7 8
      char:    J a v a   C o d e        s.length() = 9   (ต่างจากอาเรย์: length มีวงเล็บ)`),
  topics: [
    {
      num: "9.1", toc: "เปรียบเทียบและต่อข้อความ", title: "เปรียบเทียบและต่อข้อความ",
      blocks: [
        { type: "p", html: `String มีเมธอดสำเร็จรูปมากมาย เรียกด้วย <code>ข้อความ.เมธอด()</code> ส่วนที่ต้องจำคือ String <strong>เปลี่ยนไม่ได้ (immutable)</strong> เมธอดอย่าง <code>trim()</code> หรือ <code>toUpperCase()</code> คืนข้อความ<em>ใหม่</em> ต้องเก็บผลลัพธ์เอง` },
        { type: "table", head: ["เมธอด", "ทำอะไร", "ตัวอย่าง", "ผล"], rows: [
          ["<code>length()</code>", "จำนวนอักขระ", "<code>\"Hello\".length()</code>", "5"],
          ["<code>toUpperCase()</code> / <code>toLowerCase()</code>", "แปลงตัวพิมพ์", "<code>\"Java\".toUpperCase()</code>", "JAVA"],
          ["<code>trim()</code>", "ตัดช่องว่างหัวท้าย", "<code>\"  hi  \".trim()</code>", "hi"],
          ["<code>isEmpty()</code> / <code>isBlank()</code>", "ว่างไหม / มีแต่ช่องว่างไหม", "<code>\"  \".isBlank()</code>", "true"],
          ["<code>equals(s)</code>", "เนื้อหาเท่ากันไหม", "<code>\"abc\".equals(\"abc\")</code>", "true"],
          ["<code>equalsIgnoreCase(s)</code>", "เท่ากันโดยไม่สนตัวพิมพ์", "<code>\"Yes\".equalsIgnoreCase(\"YES\")</code>", "true"],
          ["<code>compareTo(s)</code>", "ลำดับพจนานุกรม (ลบ / 0 / บวก)", "<code>\"apple\".compareTo(\"banana\")</code>", "ค่าลบ"],
        ] },
        { type: "run", title: "เรียกเมธอดแล้วต้องเก็บผลลัพธ์",
          code: j`
            public class StringBasics {
                public static void main(String[] args) {
                    String name = "  JHope Jung  ";
                    System.out.println("[" + name + "] length " + name.length());   // 14   นับช่องว่างด้วย
                    name.trim();                                                     // ไม่เก็บผล → name ไม่เปลี่ยน
                    System.out.println("after name.trim(): [" + name + "]");
                    name = name.trim();                                              // เก็บผลกลับ → เปลี่ยนแล้ว
                    System.out.println("after name = name.trim(): [" + name + "]");
                    System.out.println(name.toUpperCase());                          // JHOPE JUNG
                    System.out.println(name.toLowerCase());                          // jhope jung
                    System.out.println("name still: " + name);                       // ตัวเดิมไม่เปลี่ยน
                }
            }`,
          },

        { type: "h", text: "เปรียบเทียบข้อความ" },
        { type: "p", html: `ใช้ <code>equals</code> เทียบเนื้อหา (ห้ามใช้ <code>==</code>) และใช้ <code>compareTo</code> เมื่อต้องการรู้ว่าคำไหนมาก่อนตามลำดับตัวอักษร: ค่าลบ = มาก่อน, 0 = เท่ากัน, บวก = มาทีหลัง` },
        { type: "run", title: "equals และ compareTo", stdin: "yes\nbanana",
          code: j`
            import java.util.Scanner;

            public class CompareStrings {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Continue? ");
                    String answer = input.next();
                    System.out.println("equals(\"YES\")           : " + answer.equals("YES"));            // false
                    System.out.println("equalsIgnoreCase(\"YES\") : " + answer.equalsIgnoreCase("YES"));  // true

                    System.out.print("A fruit: ");
                    String fruit = input.next();
                    int result = fruit.compareTo("cherry");                 // ลบ เพราะ 'b' มาก่อน 'c'
                    System.out.println("compareTo(\"cherry\") = " + result);
                    if (result < 0) System.out.println(fruit + " comes before cherry");
                    else if (result > 0) System.out.println(fruit + " comes after cherry");
                    else System.out.println("same word");
                }
            }`,
          },

        { type: "h", text: "ต่อข้อความ" },
        { type: "table", head: ["วิธี", "ตัวอย่าง", "ผล"], rows: [
          ["<code>+</code>", "<code>\"JHope\" + \" \" + 19</code>", "JHope 19"],
          ["<code>String.format(...)</code>", "<code>String.format(\"%.2f\", 3.456)</code>", "\"3.46\" (เหมือน printf แต่คืนเป็น String)"],
          ["<code>String.join(sep, ...)</code>", "<code>String.join(\", \", \"A\", \"B\")</code>", "A, B"],
          ["<code>repeat(n)</code>", "<code>\"Ha\".repeat(3)</code>", "HaHaHa"],
        ] },
        { type: "run", title: "สร้างข้อความหลายแบบ",
          code: j`
            public class JoinStrings {
                public static void main(String[] args) {
                    String first = "JHope", last = "Jung";
                    int age = 19;
                    double gpa = 3.456;

                    String full = first + " " + last;
                    String info = full + " (" + age + ")";
                    String card = String.format("%-12s GPA %.2f", full, gpa);
                    String joined = String.join(", ", "Math", "Science", "English");

                    System.out.println(full);               // JHope Jung
                    System.out.println(info);               // JHope Jung (19)
                    System.out.println("[" + card + "]");   // [JHope Jung   GPA 3.46]
                    System.out.println(joined);             // Math, Science, English
                    System.out.println("Ha".repeat(3));     // HaHaHa
                }
            }`,
          },
        { type: "warn", title: "null กับ String", html: `ตัวแปร String ที่เป็น <code>null</code> (ยังไม่ได้ชี้ข้อความใด) เรียกเมธอดไม่ได้ จะเกิด <code>NullPointerException</code> เขียนค่าคงที่ไว้หน้า equals จะปลอดภัย: <code>"Suga".equals(name)</code>` },
        { type: "more", title: "ดูตัวอย่าง: NullPointerException กับ String", blocks: [
          { type: "run", label: "ทดลองบั๊ก 9.1.4", title: "NullPointerException กับ String", expect: "runtime-error",
            code: j`
              public class NullString {
                  public static void main(String[] args) {
                      String[] names = new String[2];
                      names[0] = "Suga";
                      System.out.println("\"Suga\".equals(names[1]) = " + "Suga".equals(names[1]));
                      System.out.println(names[1].length());
                  }
              }`,
            },
        ] },
        { type: "check", title: "immutable", html: jpre(`
          String s = "hello";
          s.toUpperCase();
          s = s + "!";
          System.out.println(s);`), answer: `<p><strong>hello!</strong> — บรรทัดที่สองไม่ได้เก็บผลลัพธ์ จึงไม่เปลี่ยน s</p>` },
      ],
    },
    {
      num: "9.2", toc: "ค้นหาและตัดข้อความ", title: "ค้นหาและตัดข้อความ",
      blocks: [
        { type: "p", html: `อักขระใน String มี index เริ่มที่ 0 เหมือนอาเรย์ ใช้ index ค้นหาและตัดข้อความได้` },
        { type: "cells", name: "String s = \"banana\";", caption: "→ length() = 6", values: ["b", "a", "n", "a", "n", "a"] },
        { type: "table", head: ["เมธอด", "ทำอะไร", "ตัวอย่างกับ \"banana\"", "ผล"], rows: [
          ["<code>charAt(i)</code>", "อักขระที่ index i", "<code>charAt(2)</code>", "'n'"],
          ["<code>indexOf(s)</code>", "ตำแหน่งแรกที่พบ (−1 ถ้าไม่พบ)", "<code>indexOf(\"an\")</code>", "1"],
          ["<code>lastIndexOf(s)</code>", "ตำแหน่งสุดท้ายที่พบ", "<code>lastIndexOf(\"an\")</code>", "3"],
          ["<code>contains(s)</code>", "มีข้อความนี้ไหม", "<code>contains(\"nan\")</code>", "true"],
          ["<code>substring(a, b)</code>", "ตัด index a ถึง <strong>b − 1</strong>", "<code>substring(1, 4)</code>", "\"ana\""],
          ["<code>substring(a)</code>", "ตัดตั้งแต่ a ถึงท้าย", "<code>substring(3)</code>", "\"ana\""],
          ["<code>replace(a, b)</code>", "แทนที่ทุกตำแหน่ง", "<code>replace(\"a\", \"o\")</code>", "\"bonono\""],
          ["<code>split(sep)</code>", "แยกเป็นอาเรย์", "<code>\"a,b,c\".split(\",\")</code>", "{\"a\", \"b\", \"c\"}"],
        ] },
        { type: "run", title: "charAt, indexOf และ substring",
          code: j`
            public class FindAndCut {
                public static void main(String[] args) {
                    String s = "banana";
                    System.out.println("charAt(0) = " + s.charAt(0));                       // b
                    System.out.println("charAt(last) = " + s.charAt(s.length() - 1));       // a   ตัวสุดท้าย = length - 1
                    System.out.println("indexOf(\"an\") = " + s.indexOf("an"));             // 1
                    System.out.println("lastIndexOf(\"an\") = " + s.lastIndexOf("an"));     // 3
                    System.out.println("indexOf(\"x\") = " + s.indexOf("x"));               // -1  ไม่พบ
                    System.out.println("substring(1, 4) = " + s.substring(1, 4));           // ana (index 1, 2, 3)
                    System.out.println("substring(3) = " + s.substring(3));                 // ana
                    System.out.println("contains(\"nan\") = " + s.contains("nan"));         // true
                }
            }`,
          },
        { type: "tip", title: "จำ substring", html: `<code>substring(a, b)</code> รวมตำแหน่ง a แต่<strong>ไม่รวม</strong> b ความยาวผลลัพธ์คือ b − a และใช้ <code>b = length()</code> เป็นขอบปลายได้` },

        { type: "h", text: "หาตัวคั่นแล้วตัดซ้าย-ขวา" },
        { type: "p", html: `ใช้ <code>indexOf</code> หาตำแหน่งตัวคั่น (ช่องว่าง, @) แล้วใช้ <code>substring</code> ตัดส่วนซ้ายและขวา` },
        { type: "run", title: "แยกชื่อ-นามสกุลและอีเมล", stdin: "JHope Jung\njhope.j@example.co.th",
          code: j`
            import java.util.Scanner;

            public class SplitParts {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Full name: ");
                    String full = input.nextLine().trim();
                    int space = full.indexOf(' ');                         // 5
                    String first = full.substring(0, space);               // "JHope"
                    String last = full.substring(space + 1);               // "Jung"
                    System.out.println("First: " + first + ", Last: " + last);
                    System.out.println("Initials: " + first.charAt(0) + "." + last.charAt(0) + ".");

                    System.out.print("Email: ");
                    String email = input.nextLine().trim();
                    int at = email.indexOf('@');
                    System.out.println("User: " + email.substring(0, at));         // ซ้ายของ @
                    System.out.println("Domain: " + email.substring(at + 1));      // ขวาของ @
                    System.out.println("Ends with .th? " + email.endsWith(".th"));
                }
            }`,
          },
        { type: "warn", html: `ถ้าไม่พบตัวคั่น <code>indexOf</code> คืน −1 แล้ว <code>substring(0, -1)</code> จะเกิด <code>StringIndexOutOfBoundsException</code> ควรตรวจ <code>if (space &gt;= 0)</code> ก่อนตัด` },

        { type: "h", text: "split: แยกข้อมูลที่คั่นด้วยเครื่องหมาย" },
        { type: "run", title: "แยก CSV และนับคำ", stdin: "JHope,19,3.45,Science",
          code: j`
            import java.util.Scanner;

            public class SplitCsv {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("CSV: ");
                    String line = input.nextLine();
                    String[] parts = line.split(",");                      // ได้อาเรย์ 4 ช่อง (ยังเป็น String)
                    System.out.println("Fields: " + parts.length);
                    for (int i = 0; i < parts.length; i++) {
                        System.out.println("  [" + i + "] " + parts[i]);
                    }
                    String sentence = "  Java   is   really fun  ";
                    String[] words = sentence.trim().split("\\s+");        // \\s+ = ช่องว่าง 1 ตัวขึ้นไป
                    System.out.println("Word count: " + words.length);     // 4
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: นับคำที่พบ และ error เมื่อ index เกิน", blocks: [
          { type: "p", html: `วนใช้ <code>indexOf(word, from)</code> โดยเลื่อน from ไปหลังตำแหน่งที่เพิ่งพบ จนกว่าจะได้ −1` },
          { type: "run", title: "นับจำนวนครั้งที่พบคำ", stdin: "the cat and the hat and the bat\nthe",
            code: j`
              import java.util.Scanner;

              public class CountOccurrences {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Text: ");
                      String text = input.nextLine();
                      System.out.print("Find: ");
                      String word = input.nextLine();

                      int count = 0;
                      int pos = text.indexOf(word);                          // ตำแหน่งแรก
                      while (pos != -1) {
                          System.out.println("found at " + pos);
                          count++;
                          pos = text.indexOf(word, pos + word.length());     // ค้นต่อหลังคำที่พบ
                      }
                      System.out.println("Total: " + count);
                      System.out.println(text.replace(word, word.toUpperCase()));
                  }
              }`,
            },
          { type: "run", label: "ทดลอง error 9.2.5", title: "index ของ String เกินขอบเขต", expect: "runtime-error",
            code: j`
              public class SubstringError {
                  public static void main(String[] args) {
                      String code = "CS101";
                      System.out.println(code.substring(2, 5));
                      System.out.println(code.substring(2, 6));
                  }
              }`,
            after: "substring(2, 5) ถูกต้อง (5 = length ใช้เป็นขอบปลายได้) แต่ substring(2, 6) เกิน length 5 ข้อความ error บอก begin, end และ length ให้ตรวจ" },
        ] },
        { type: "check", title: "substring", html: `<p><code>String s = "Programming";</code> ค่าของ <code>s.substring(3, 7)</code>, <code>s.indexOf("m")</code> และ <code>s.substring(s.length() - 3)</code> คืออะไร</p>`, answer: `<p><strong>"gram"</strong> (index 3–6), <strong>6</strong>, <strong>"ing"</strong></p>` },
      ],
    },
    {
      num: "9.3", toc: "แปลงข้อความเป็นตัวเลข", title: "แปลงข้อความเป็นตัวเลขและกลับกัน",
      blocks: [
        { type: "p", html: `ข้อมูลที่อ่านเป็นบรรทัดหรือได้จาก split ยังเป็น String เสมอ <code>"10" + "20"</code> จึงได้ <code>"1020"</code> ต้องแปลงเป็นตัวเลขก่อนคำนวณ` },
        { type: "table", head: ["ต้องการ", "ใช้", "ตัวอย่าง"], rows: [
          ["String → int", "<code>Integer.parseInt(s)</code>", "<code>Integer.parseInt(\"42\")</code> → 42"],
          ["String → double", "<code>Double.parseDouble(s)</code>", "<code>Double.parseDouble(\"3.5\")</code> → 3.5"],
          ["String → boolean", "<code>Boolean.parseBoolean(s)</code>", "<code>\"true\"</code> → true"],
          ["ตัวเลข → String", "<code>String.valueOf(x)</code> หรือ <code>\"\" + x</code>", "<code>String.valueOf(42)</code> → \"42\""],
        ] },
        { type: "run", title: "แปลงแล้วคำนวณ",
          code: j`
            public class ParseNumbers {
                public static void main(String[] args) {
                    String a = "10", b = "20";
                    System.out.println("a + b (String) = " + a + b);         // 1020   ต่อข้อความ
                    int x = Integer.parseInt(a);
                    int y = Integer.parseInt(b);
                    System.out.println("x + y (int) = " + (x + y));          // 30

                    double price = Double.parseDouble("49.75");
                    System.out.println("price * 2 = " + price * 2);          // 99.5

                    String back = String.valueOf(x + y);                     // "30"
                    System.out.println("length of \"" + back + "\" = " + back.length());   // 2
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: แยก CSV แล้วแปลงแต่ละช่อง", blocks: [
          { type: "run", title: "split + parse", stdin: "JHope,19,3.45",
            code: j`
              import java.util.Scanner;

              public class CsvRecord {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("name,age,gpa: ");
                      String[] p = input.nextLine().split(",");
                      String name = p[0].trim();
                      int age = Integer.parseInt(p[1].trim());               // "19" → 19
                      double gpa = Double.parseDouble(p[2].trim());          // "3.45" → 3.45
                      System.out.printf("%s will be %d next year. GPA x 25 = %.1f%n", name, age + 1, gpa * 25);
                  }
              }`,
            },
        ] },

        { type: "h", text: "แปลงไม่ได้: NumberFormatException" },
        { type: "p", html: `ถ้าข้อความไม่ใช่ตัวเลขที่ถูกต้อง เช่น <code>"abc"</code> หรือ <code>"12.5"</code> กับ parseInt โปรแกรมจะหยุดด้วย <code>NumberFormatException</code> ล้อมด้วย <code>try { } catch (NumberFormatException e) { }</code> เพื่อจัดการแทนการหยุด` },
        { type: "run", title: "ถามจนกว่าจะได้ตัวเลขที่ถูกต้อง", stdin: "abc\n-5\n25",
          code: j`
            import java.util.Scanner;

            public class SafeParse {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    int age = -1;                                      // -1 = ยังไม่ได้ค่าที่ถูกต้อง
                    while (age < 0) {
                        System.out.print("Age: ");
                        String text = input.nextLine();
                        try {
                            age = Integer.parseInt(text);              // "abc" → กระโดดไป catch
                            if (age < 0) System.out.println("  Age cannot be negative");
                        } catch (NumberFormatException e) {
                            System.out.println("  '" + text + "' is not a number");
                        }
                    }
                    System.out.println("OK, age = " + age);
                }
            }`,
          },
        { type: "more", title: "ดูตัวอย่าง: NumberFormatException ที่ไม่ได้ดักจับ", blocks: [
          { type: "run", label: "ทดลอง error 9.3.4", title: "NumberFormatException", expect: "runtime-error",
            code: j`
              public class BadParse {
                  public static void main(String[] args) {
                      System.out.println(Integer.parseInt("123"));
                      System.out.println(Double.parseDouble("12.5"));
                      System.out.println(Integer.parseInt("12.5"));
                  }
              }`,
            },
        ] },
        { type: "check", title: "แปลงชนิด", html: `<p><code>"5" + 3</code>, <code>Integer.parseInt("5") + 3</code> และ <code>"5" + 3 + 2</code> ได้อะไร</p>`, answer: `<p><strong>"53"</strong>, <strong>8</strong>, <strong>"532"</strong></p>` },
      ],
    },
    {
      num: "9.4", toc: "char และ Character", title: "char และคลาส Character",
      blocks: [
        { type: "p", html: `<code>char</code> เก็บอักขระหนึ่งตัวใน <code>' '</code> และเก็บเป็นรหัสตัวเลข จึงเปรียบเทียบและบวกลบได้ ส่วนคลาส <code>Character</code> มีเมธอดตรวจชนิดอักขระ` },
        { type: "table", head: ["เมธอด", "ตรวจ / ทำอะไร"], rows: [["<code>Character.isDigit(ch)</code>", "เป็นตัวเลข 0–9"], ["<code>Character.isLetter(ch)</code>", "เป็นตัวอักษร"], ["<code>Character.isUpperCase(ch)</code> / <code>isLowerCase</code>", "ตัวพิมพ์ใหญ่ / เล็ก"], ["<code>Character.isWhitespace(ch)</code>", "ช่องว่าง แท็บ ขึ้นบรรทัด"], ["<code>Character.toUpperCase(ch)</code>", "แปลงเป็นตัวพิมพ์ใหญ่"]] },
        { type: "run", title: "วนอ่านทีละอักขระแล้วนับประเภท", stdin: "Java 21 is Great!",
          code: j`
            import java.util.Scanner;

            public class CountChars {
                public static void main(String[] args) {
                    Scanner input = new Scanner(System.in);
                    System.out.print("Text: ");
                    String text = input.nextLine();
                    int letters = 0, digits = 0, spaces = 0, upper = 0, others = 0;
                    for (int i = 0; i < text.length(); i++) {
                        char ch = text.charAt(i);                      // ทีละตัว
                        if (Character.isLetter(ch)) {
                            letters++;
                            if (Character.isUpperCase(ch)) upper++;    // J และ G
                        } else if (Character.isDigit(ch)) {
                            digits++;
                        } else if (Character.isWhitespace(ch)) {
                            spaces++;
                        } else {
                            others++;
                        }
                    }
                    System.out.println("Letters: " + letters + " (upper " + upper + ")");
                    System.out.println("Digits: " + digits);
                    System.out.println("Spaces: " + spaces);
                    System.out.println("Others: " + others);
                }
            }`,
          },
        { type: "h", text: "char คือตัวเลข" },
        { type: "p", html: `<code>'A'</code> = 65, <code>'a'</code> = 97, <code>'0'</code> = 48 จึงคำนวณตำแหน่งตัวอักษรหรือแปลงอักขระตัวเลขเป็นค่าได้ ผลบวกของ char กับ int เป็น int ต้อง cast กลับเป็น char` },
        { type: "run", title: "คณิตศาสตร์กับ char",
          code: j`
            public class CharMath {
                public static void main(String[] args) {
                    char c = 'C';
                    System.out.println("(int) 'C' = " + (int) c);                          // 67
                    System.out.println("position in alphabet = " + (c - 'A' + 1));        // 3
                    System.out.println("next letter = " + (char) (c + 1));                 // D
                    System.out.println("lowercase = " + (char) (c + ('a' - 'A')));         // c   ห่างกัน 32 เสมอ
                    char digit = '7';
                    System.out.println("'7' - '0' = " + (digit - '0'));                    // 7
                    for (char ch = 'a'; ch <= 'e'; ch++) {                                 // วนตัวอักษรได้
                        System.out.print(ch + " ");
                    }
                    System.out.println();
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: รหัสซีซาร์ (Caesar cipher)", blocks: [
          { type: "p", html: `เลื่อนตัวอักษรไป k ตำแหน่ง วนกลับเมื่อเกิน Z ด้วย <code>% 26</code> อักขระอื่นคงเดิม ถอดรหัสด้วยการเลื่อน 26 − k` },
          { type: "run", title: "เข้ารหัสและถอดรหัส", stdin: "Hello, World!\n3",
            code: j`
              import java.util.Scanner;

              public class Caesar {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Text: ");
                      String text = input.nextLine();
                      System.out.print("Shift: ");
                      int k = input.nextInt();
                      String encoded = shift(text, k);
                      System.out.println("Encoded: " + encoded);
                      System.out.println("Decoded: " + shift(encoded, 26 - k));
                  }

                  static String shift(String s, int k) {
                      String result = "";
                      for (int i = 0; i < s.length(); i++) {
                          char ch = s.charAt(i);
                          if (Character.isUpperCase(ch)) {
                              ch = (char) ('A' + (ch - 'A' + k) % 26);     // 'H' → 'K'
                          } else if (Character.isLowerCase(ch)) {
                              ch = (char) ('a' + (ch - 'a' + k) % 26);
                          }
                          result += ch;
                      }
                      return result;
                  }
              }`,
            },
        ] },
        { type: "check", title: "char", html: `<p><code>char ch = 'b';</code> ค่าของ <code>ch + 1</code>, <code>(char)(ch + 1)</code> และ <code>Character.toUpperCase(ch)</code> คืออะไร</p>`, answer: `<p><strong>99</strong> (int), <strong>'c'</strong>, <strong>'B'</strong></p>` },
      ],
    },
    {
      num: "9.5", toc: "StringBuilder", title: "StringBuilder: สร้างข้อความทีละส่วน",
      blocks: [
        { type: "p", html: `การต่อ String ด้วย <code>+=</code> ในลูปสร้างข้อความใหม่ทุกรอบ <code>StringBuilder</code> เป็นข้อความที่<strong>แก้ไขได้</strong> ต่อเสร็จแล้วแปลงกลับเป็น String ด้วย <code>toString()</code>` },
        { type: "table", head: ["เมธอด", "ทำอะไร"], rows: [
          ["<code>append(x)</code>", "ต่อท้าย (รับได้ทุกชนิด)"],
          ["<code>insert(i, x)</code>", "แทรกที่ตำแหน่ง i"],
          ["<code>reverse()</code>", "กลับลำดับ"],
          ["<code>setCharAt(i, c)</code>", "เปลี่ยนอักขระที่ตำแหน่ง i"],
          ["<code>deleteCharAt(i)</code>", "ลบอักขระที่ตำแหน่ง i"],
          ["<code>toString()</code>", "แปลงเป็น String"],
        ] },
        { type: "run", title: "ต่อข้อความในลูป",
          code: j`
            public class BuilderBasics {
                public static void main(String[] args) {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 1; i <= 5; i++) {
                        sb.append(i);                         // ต่อท้าย
                        if (i < 5) {
                            sb.append(" -> ");                // ไม่ใส่ลูกศรหลังตัวสุดท้าย
                        }
                    }
                    String result = sb.toString();            // 1 -> 2 -> 3 -> 4 -> 5
                    System.out.println(result);
                    System.out.println("length = " + sb.length());
                }
            }`,
          },
        { type: "h", text: "StringBuilder แก้ตัวมันเอง" },
        { type: "p", html: `ต่างจาก String เมธอดของ StringBuilder <strong>เปลี่ยนตัวมันเอง</strong> จึงไม่ต้องเก็บผลลัพธ์กลับ` },
        { type: "run", title: "reverse, insert, setCharAt, deleteCharAt",
          code: j`
            public class BuilderEdit {
                public static void main(String[] args) {
                    StringBuilder sb = new StringBuilder("Java");
                    sb.reverse();
                    System.out.println("reverse     : " + sb);     // avaJ
                    sb.reverse();
                    sb.insert(0, "I love ");
                    System.out.println("insert      : " + sb);     // I love Java
                    sb.setCharAt(0, 'U');
                    System.out.println("setCharAt   : " + sb);     // U love Java
                    sb.deleteCharAt(sb.length() - 1);
                    System.out.println("deleteCharAt: " + sb);     // U love Jav
                    sb.append("!!!");
                    System.out.println("append      : " + sb);     // U love Jav!!!
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: ตรวจพาลินโดรม และใส่จุลภาคคั่นหลัก", blocks: [
          { type: "run", title: "ตรวจพาลินโดรมแบบไม่สนช่องว่างและเครื่องหมาย", stdin: "A man, a plan, a canal: Panama",
            code: j`
              import java.util.Scanner;

              public class PalindromeText {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Text: ");
                      String text = input.nextLine();
                      StringBuilder clean = new StringBuilder();
                      for (char ch : text.toCharArray()) {                   // วน for-each ทีละอักขระ
                          if (Character.isLetterOrDigit(ch)) {
                              clean.append(Character.toLowerCase(ch));
                          }
                      }
                      String forward = clean.toString();                    // เก็บไว้ก่อน reverse
                      String backward = clean.reverse().toString();         // reverse แก้ clean ด้วย
                      System.out.println("Cleaned : " + forward);
                      System.out.println("Reversed: " + backward);
                      System.out.println(forward.equals(backward) ? "Palindrome!" : "Not a palindrome");
                  }
              }`,
            },
          { type: "run", title: "แทรกจุลภาคทุก 3 หลัก", stdin: "1234567",
            code: j`
              import java.util.Scanner;

              public class AddCommas {
                  public static void main(String[] args) {
                      Scanner input = new Scanner(System.in);
                      System.out.print("Number: ");
                      String digits = input.next();
                      StringBuilder sb = new StringBuilder(digits);
                      for (int i = sb.length() - 3; i > 0; i -= 3) {         // ไล่จากขวาทีละ 3 หลัก
                          sb.insert(i, ',');
                      }
                      System.out.println("Formatted: " + sb);
                      System.out.println("Check with printf: " + String.format("%,d", Long.parseLong(digits)));
                  }
              }`,
            },
        ] },
      ],
    },
  ],
  exercises: [
    { level: 1, title: "ข้อมูลของข้อความ", html: `<p>รับข้อความหนึ่งบรรทัด แล้วแสดง: ความยาว, ตัวอักษรแรกและตัวสุดท้าย, ข้อความแบบตัวพิมพ์ใหญ่ และข้อความหลังตัดช่องว่างหัวท้าย พร้อมความยาวใหม่</p>`,
      spec: ["อ่านด้วย nextLine()", "ใช้ length(), charAt(), toUpperCase(), trim()", "แสดงข้อความในวงเล็บ [ ] เพื่อให้เห็นช่องว่าง"], stdin: "  Hello Java  ",
      solution: j`
        import java.util.Scanner;

        public class TextInfo {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Text: ");
                String text = input.nextLine();
                System.out.println("Length: " + text.length());
                // ตัวสุดท้ายคือ length() - 1
                System.out.println("First: [" + text.charAt(0) + "], Last: [" + text.charAt(text.length() - 1) + "]");
                System.out.println("Upper: [" + text.toUpperCase() + "]");
                String trimmed = text.trim();  // ตัดช่องว่างหัวท้าย
                System.out.println("Trimmed: [" + trimmed + "] length " + trimmed.length());
            }
        }` },
    { level: 1, title: "ตอบ yes/no แบบยืดหยุ่น", html: `<p>ถามผู้ใช้ว่า <code>Do you like Java?</code> ยอมรับคำตอบ <code>y</code>, <code>yes</code> (ไม่สนตัวพิมพ์และช่องว่างหัวท้าย) เป็นใช่, <code>n</code>, <code>no</code> เป็นไม่ใช่ นอกนั้นแสดง <code>Please answer yes or no</code></p>`,
      spec: ["trim และ toLowerCase ก่อนเปรียบเทียบ", "ใช้ equals (ห้ามใช้ ==)"], runs: ["  YES ", "n", "maybe"],
      solution: j`
        import java.util.Scanner;

        public class YesNo {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Do you like Java? ");
                // ทำให้เป็นรูปแบบเดียวกันก่อนเทียบ
                String ans = input.nextLine().trim().toLowerCase();
                if (ans.equals("y") || ans.equals("yes")) {
                    System.out.println("Great!");
                } else if (ans.equals("n") || ans.equals("no")) {
                    System.out.println("You will soon!");
                } else {
                    System.out.println("Please answer yes or no");
                }
            }
        }` },
    { level: 1, title: "นับสระ", html: `<p>รับข้อความภาษาอังกฤษ แล้วนับจำนวนสระ a, e, i, o, u (ไม่สนตัวพิมพ์) และแสดงจำนวนของแต่ละสระ</p>`,
      spec: ["แปลงเป็นตัวพิมพ์เล็กก่อน", "ใช้ switch กับ char หรือ if หลายเงื่อนไข", "แสดงผลรวมและแยกแต่ละสระ"], stdin: "Programming in Java is educational",
      solution: j`
        import java.util.Scanner;

        public class CountVowels {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Text: ");
                String text = input.nextLine().toLowerCase();
                int a = 0, e = 0, i = 0, o = 0, u = 0;
                for (int k = 0; k < text.length(); k++) {
                    // เลือกตามอักขระที่ตำแหน่ง k
                    switch (text.charAt(k)) {
                        case 'a' -> a++;
                        case 'e' -> e++;
                        case 'i' -> i++;
                        case 'o' -> o++;
                        case 'u' -> u++;
                        default -> { }  // อักขระอื่นไม่ต้องทำอะไร
                    }
                }
                System.out.println("a=" + a + " e=" + e + " i=" + i + " o=" + o + " u=" + u);
                System.out.println("Total vowels: " + (a + e + i + o + u));
            }
        }` },
    { level: 2, title: "ชื่อย่อและรูปแบบชื่อ", html: `<p>รับชื่อเต็ม 2–3 คำ (เช่น ชื่อ ชื่อกลาง นามสกุล) ซึ่งผู้ใช้อาจพิมพ์ตัวพิมพ์ปนกันและมีช่องว่างหลายตัว แสดง (1) ชื่อที่จัดรูปแบบให้ขึ้นต้นตัวพิมพ์ใหญ่ทุกคำ (2) อักษรย่อ (3) รูปแบบ <code>นามสกุล, ชื่อ</code></p>`,
      spec: ["ใช้ <code>trim().split(\"\\\\s+\")</code> แยกคำ", "ขึ้นต้นตัวใหญ่: <code>w.substring(0,1).toUpperCase() + w.substring(1).toLowerCase()</code>", "นามสกุลคือคำสุดท้ายของอาเรย์"], runs: ["  jHOPE   jung ", "john ronald TOLKIEN"],
      solution: j`
        import java.util.Scanner;

        public class NameFormat {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Full name: ");
                // แยกเป็นคำ (ช่องว่างกี่ตัวก็ได้)
                String[] words = input.nextLine().trim().split("\\s+");
                StringBuilder proper = new StringBuilder();
                StringBuilder initials = new StringBuilder();
                for (String w : words) {
                    // ตัวแรกตัวใหญ่ ที่เหลือตัวเล็ก
                    String cap = w.substring(0, 1).toUpperCase() + w.substring(1).toLowerCase();
                    // append ต่อกันเป็นทอดได้
                    proper.append(cap).append(" ");
                    initials.append(cap.charAt(0)).append(".");
                }
                // ตัดช่องว่างท้ายสุดออก
                String formatted = proper.toString().trim();
                String last = words[words.length - 1];
                String lastCap = last.substring(0, 1).toUpperCase() + last.substring(1).toLowerCase();
                // ทุกคำยกเว้นคำสุดท้าย
                String firstPart = formatted.substring(0, formatted.lastIndexOf(' '));
                System.out.println("Proper  : " + formatted);
                System.out.println("Initials: " + initials);
                System.out.println("Listing : " + lastCap + ", " + firstPart);
            }
        }` },
    { level: 2, title: "ตรวจความแข็งแรงของรหัสผ่าน", html: `<p>รับรหัสผ่านแล้วตรวจตามเกณฑ์ 5 ข้อ: (1) ยาวอย่างน้อย 8 ตัว (2) มีตัวพิมพ์ใหญ่ (3) มีตัวพิมพ์เล็ก (4) มีตัวเลข (5) มีอักขระพิเศษ (ไม่ใช่ตัวอักษรหรือตัวเลข) แสดงผลแต่ละข้อเป็น ✓/✗ และระดับ: ผ่าน 5 ข้อ = Strong, 3–4 ข้อ = Medium, น้อยกว่านั้น = Weak</p>`,
      spec: ["วนตรวจทีละอักขระด้วย Character.isUpperCase ฯลฯ", "ใช้ตัวแปร boolean สำหรับแต่ละเกณฑ์", "นับจำนวนเกณฑ์ที่ผ่าน"], runs: ["abc123", "Java@2026"],
      solution: j`
        import java.util.Scanner;

        public class PasswordStrength {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Password: ");
                String pw = input.nextLine();
                boolean upper = false, lower = false, digit = false, special = false;
                for (char ch : pw.toCharArray()) {  // ตรวจทีละอักขระ
                    if (Character.isUpperCase(ch)) upper = true;
                    else if (Character.isLowerCase(ch)) lower = true;
                    else if (Character.isDigit(ch)) digit = true;
                    else special = true;
                }
                // ความยาวอย่างน้อย 8
                boolean longEnough = pw.length() >= 8;
                // รวมผลตรวจไว้ในอาเรย์ เพื่อวนแสดงผล
                boolean[] checks = {longEnough, upper, lower, digit, special};
                String[] labels = {"8+ characters", "uppercase", "lowercase", "digit", "special char"};
                int passed = 0;
                for (int i = 0; i < checks.length; i++) {
                    System.out.println((checks[i] ? "✓ " : "✗ ") + labels[i]);
                    if (checks[i]) passed++;
                }
                // ?: ซ้อนกัน 2 ชั้น
                String level = passed == 5 ? "Strong" : passed >= 3 ? "Medium" : "Weak";
                System.out.println("Strength: " + level + " (" + passed + "/5)");
            }
        }` },
    { level: 2, title: "นับคำและหาคำที่ยาวที่สุด", html: `<p>รับประโยคภาษาอังกฤษ นับจำนวนคำ หาคำที่ยาวที่สุด (ถ้ายาวเท่ากันเอาคำแรก) และความยาวเฉลี่ยของคำ โดยตัดเครื่องหมายวรรคตอน . , ! ? ออกก่อน</p>`,
      spec: ["ใช้ replace หรือ replaceAll ลบเครื่องหมาย", "split ด้วย \"\\\\s+\" หลัง trim", "แสดงความยาวเฉลี่ย 2 ตำแหน่ง"], stdin: "Java is a powerful, versatile and popular language!",
      solution: j`
        import java.util.Scanner;

        public class WordStats {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Sentence: ");
                // ลบเครื่องหมายวรรคตอน (regex)
                String text = input.nextLine().replaceAll("[.,!?]", "").trim();
                String[] words = text.split("\\s+");
                String longest = words[0];  // เริ่มจากคำแรก
                int totalLetters = 0;
                for (String w : words) {
                    totalLetters += w.length();
                    // เจอคำที่ยาวกว่า → จำไว้
                    if (w.length() > longest.length()) longest = w;
                }
                System.out.println("Words: " + words.length);
                System.out.println("Longest: " + longest + " (" + longest.length() + ")");
                System.out.printf("Average length: %.2f%n", (double) totalLetters / words.length);
            }
        }`, explain: "<code>replaceAll(\"[.,!?]\", \"\")</code> ใช้ regular expression: วงเล็บเหลี่ยมหมายถึง “อักขระใดก็ได้ในกลุ่มนี้”" },
    { level: 2, title: "ตรวจเลขบัตรประชาชน (รูปแบบ)", html: `<p>รับเลขบัตรประชาชนไทยในรูปแบบ <code>1-2345-67890-12-1</code> (มีขีดหรือไม่มีก็ได้) ตรวจว่าหลังลบขีดแล้วเป็นตัวเลข 13 หลัก และ<strong>หลักสุดท้ายถูกต้องตามสูตร</strong>: นำ 12 หลักแรกคูณด้วย 13, 12, …, 2 ตามลำดับ รวมกัน หาร 11 เอาเศษ แล้ว (11 − เศษ) % 10 ต้องเท่ากับหลักที่ 13</p>`,
      spec: ["ลบขีดด้วย replace(\"-\", \"\")", "ตรวจความยาวและว่าเป็นตัวเลขทุกตัว", "ใช้ <code>ch - '0'</code> แปลงอักขระเป็นตัวเลข", "แสดง Valid / Invalid format / Invalid checksum"], runs: ["1-1037-02071-81-1", "1103702071812", "12345"],
      solution: j`
        import java.util.Scanner;

        public class ThaiIdCheck {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("ID: ");
                // ลบขีดออกก่อนตรวจ
                String id = input.nextLine().trim().replace("-", "");
                if (id.length() != 13 || !allDigits(id)) {
                    System.out.println("Invalid format");
                    return;  // ข้อมูลผิด → จบ main ทันที
                }
                int sum = 0;
                for (int i = 0; i < 12; i++) {
                    // หลักที่ i คูณน้ำหนัก 13, 12, ..., 2
                    sum += (id.charAt(i) - '0') * (13 - i);
                }
                // สูตรหาหลักตรวจสอบ
                int check = (11 - sum % 11) % 10;
                // แปลงอักขระตัวสุดท้ายเป็นตัวเลข
                int last = id.charAt(12) - '0';
                System.out.println("Computed check digit: " + check);
                System.out.println(check == last ? "Valid" : "Invalid checksum");
            }

            static boolean allDigits(String s) {
                for (char ch : s.toCharArray()) {
                    if (!Character.isDigit(ch)) return false;
                }
                return true;
            }
        }`, explain: "<code>return;</code> ในเมธอด void ใช้จบเมธอดก่อนถึงบรรทัดสุดท้าย (ในที่นี้คือจบ main)" },
    { level: 3, title: "บีบอัดข้อความแบบ Run-Length", html: `<p>เขียนเมธอด <code>compress(String s)</code> ที่แทนอักขระที่ซ้ำติดกันด้วยอักขระตามด้วยจำนวน เช่น <code>aaabccdddd</code> → <code>a3b1c2d4</code> และเมธอด <code>decompress</code> ที่แปลงกลับ (สมมติจำนวนซ้ำไม่เกิน 9) แล้วแสดงอัตราส่วนความยาวหลังบีบอัด</p>`,
      spec: ["ใช้ StringBuilder สร้างผลลัพธ์", "compress: นับจำนวนที่ซ้ำ เมื่อเจออักขระใหม่ให้ append ของเดิม", "decompress: อ่านทีละคู่ (อักขระ, ตัวเลข) แล้ว repeat", "จัดการกรณีข้อความว่าง"], runs: ["aaabccdddd", "abc"],
      solution: j`
        import java.util.Scanner;

        public class RunLength {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Text: ");
                String s = input.nextLine();
                String packed = compress(s);
                System.out.println("Compressed  : " + packed);
                System.out.println("Decompressed: " + decompress(packed));
                System.out.printf("Ratio: %d -> %d (%.0f%%)%n", s.length(), packed.length(), 100.0 * packed.length() / s.length());
            }

            static String compress(String s) {
                if (s.isEmpty()) return "";  // สตริงว่าง → คืนสตริงว่าง
                StringBuilder sb = new StringBuilder();
                char current = s.charAt(0);  // อักขระที่กำลังนับ
                int count = 1;
                for (int i = 1; i < s.length(); i++) {
                    // ซ้ำกับตัวก่อน → นับเพิ่ม
                    if (s.charAt(i) == current) {
                        count++;
                    } else {
                        // เปลี่ยนอักขระ → บันทึกตัวเดิมกับจำนวน
                        sb.append(current).append(count);
                        current = s.charAt(i);
                        count = 1;
                    }
                }
                sb.append(current).append(count);  // บันทึกกลุ่มสุดท้าย
                return sb.toString();
            }

            static String decompress(String s) {
                StringBuilder sb = new StringBuilder();
                // อ่านทีละคู่: อักขระ + จำนวน
                for (int i = 0; i + 1 < s.length(); i += 2) {
                    char ch = s.charAt(i);
                    // แปลงหลักตัวเลขเป็น int
                    int n = s.charAt(i + 1) - '0';
                    // ทำซ้ำอักขระ n ครั้ง
                    sb.append(String.valueOf(ch).repeat(n));
                }
                return sb.toString();
            }
        }`, explain: "ข้อความที่ไม่มีอักขระซ้ำ (abc) บีบแล้วยาวขึ้น 2 เท่า — การบีบอัดแบบนี้เหมาะกับข้อมูลที่ซ้ำกันมาก" },
    { level: 3, title: "เครื่องคิดเลขจากข้อความ", html: `<p>รับนิพจน์บวกลบหลายตัวในบรรทัดเดียว เช่น <code>12 + 7 - 3 + 40</code> (มีช่องว่างคั่นทุก token) แล้วคำนวณผลจากซ้ายไปขวา ถ้ามี token ที่ไม่ใช่ตัวเลขในตำแหน่งตัวเลข หรือตัวดำเนินการไม่ใช่ + / − ให้แสดงข้อความ error ที่ระบุ token ที่ผิด</p>`,
      spec: ["split ด้วยช่องว่าง: token คู่ (index 0, 2, 4…) ต้องเป็นตัวเลข token คี่เป็นตัวดำเนินการ", "ใช้ try-catch ดัก NumberFormatException", "จำนวน token ต้องเป็นเลขคี่", "แสดงขั้นตอนการคำนวณ"], runs: ["12 + 7 - 3 + 40", "5 * 2", "10 + abc"],
      solution: j`
        import java.util.Scanner;

        public class TextCalculator {
            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Expression: ");
                // แยกเป็นตัวเลขและเครื่องหมาย
                String[] t = input.nextLine().trim().split("\\s+");
                // ต้องเป็น ตัวเลข op ตัวเลข ... (จำนวนคี่)
                if (t.length % 2 == 0) {
                    System.out.println("Error: incomplete expression");
                    return;
                }
                try {
                    // ตัวเลขแรก
                    int result = Integer.parseInt(t[0]);
                    // อ่านทีละคู่: เครื่องหมาย + ตัวเลข
                    for (int i = 1; i < t.length; i += 2) {
                        String op = t[i];
                        int value = Integer.parseInt(t[i + 1]);
                        if (op.equals("+")) {
                            result += value;
                        } else if (op.equals("-")) {
                            result -= value;
                        } else {
                            System.out.println("Error: unknown operator '" + op + "'");
                            return;
                        }
                        System.out.println("  " + op + " " + value + " -> " + result);
                    }
                    System.out.println("Result = " + result);
                // มีส่วนที่ไม่ใช่ตัวเลข
                } catch (NumberFormatException e) {
                    System.out.println("Error: not a number in " + e.getMessage());
                }
            }
        }` },
    { level: 3, title: "แปลงตัวเลขเป็นคำอ่านภาษาอังกฤษ", html: `<p>รับจำนวนเต็ม 0–9999 แล้วแสดงคำอ่านภาษาอังกฤษ เช่น 0 → <code>zero</code>, 15 → <code>fifteen</code>, 342 → <code>three hundred forty-two</code>, 7008 → <code>seven thousand eight</code></p>`,
      spec: ["ใช้อาเรย์ String สำหรับ ones (0–19) และ tens (20, 30, …, 90)", "เขียนเมธอด <code>below100(int n)</code> และ <code>below1000(int n)</code> แล้วประกอบกัน", "ใช้ขีด - ระหว่างหลักสิบและหลักหน่วย (forty-two)", "ใช้ StringBuilder และ trim ผลลัพธ์"], runs: ["0", "15", "342", "7008", "9999"],
      solution: j`
        import java.util.Scanner;

        public class NumberToWords {
            // คำอ่าน 0-19 (index = ตัวเลข)
            static final String[] ONES = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};
            // คำอ่านหลักสิบ
            static final String[] TENS = {"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"};

            public static void main(String[] args) {
                Scanner input = new Scanner(System.in);
                System.out.print("Number (0-9999): ");
                int n = input.nextInt();
                System.out.println(toWords(n));
            }

            static String toWords(int n) {
                if (n == 0) return "zero";  // กรณีพิเศษ
                StringBuilder sb = new StringBuilder();
                if (n >= 1000) {  // หลักพัน
                    sb.append(ONES[n / 1000]).append(" thousand ");
                    n %= 1000;  // เก็บเฉพาะส่วนที่เหลือ
                }
                if (n > 0) sb.append(below1000(n));
                return sb.toString().trim();
            }

            static String below1000(int n) {
                StringBuilder sb = new StringBuilder();
                if (n >= 100) {  // หลักร้อย
                    sb.append(ONES[n / 100]).append(" hundred ");
                    n %= 100;
                }
                if (n > 0) sb.append(below100(n));
                return sb.toString().trim();
            }

            static String below100(int n) {
                if (n < 20) return ONES[n];  // ต่ำกว่า 20 มีคำเฉพาะ
                String word = TENS[n / 10];
                // มีหลักหน่วย → ต่อด้วยขีด
                if (n % 10 != 0) word += "-" + ONES[n % 10];
                return word;
            }
        }` },
  ],
};
