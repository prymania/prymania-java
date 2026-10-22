import { j, c, pre, fpre } from "../lib.mjs";

export default {
  num: 14, file: "chapter-14.html",
  pageTitle: "บทที่ 14: เริ่มต้นสร้าง GUI ด้วย Swing", shortName: "บทที่ 14",
  tocLabel: "บทที่ 14 · หน้าต่างแรก", sidebarBottom: "สร้าง GUI บน Event Dispatch Thread เสมอ",
  kicker: "บทที่ 14 · เริ่มต้น GUI ด้วย javax.swing", h1: "หน้าต่างแรกของเรา",
  lead: "เปลี่ยนจากโปรแกรมที่รับ/แสดงข้อความใน console ไปเป็นหน้าต่างที่มีพื้นที่วางส่วนควบคุม และตอบสนองเหตุการณ์ของผู้ใช้",
  goals: ["อธิบาย JFrame, container และ component", "สร้างหน้าต่างและกำหนดการปิด", "เพิ่ม JPanel เป็นพื้นที่จัดกลุ่ม component", "เริ่ม GUI บน Event Dispatch Thread"],
  prev: { href: "chapter-13.html", label: "← บทที่ 13" },
  next: { href: "chapter-15.html", label: "บทที่ 15: Components และ Layout →" },
  footer: "บทที่ 14 · ลองรันทุกตัวอย่างเพื่อเห็นหน้าต่างจริง",
  introHeading: "14. จากผลลัพธ์ใน console สู่หน้าต่าง GUI",
  introHtml: `<p>GUI (Graphical User Interface) ให้ผู้ใช้เห็นหน้าต่าง ปุ่ม ช่องกรอกข้อมูล และผลลัพธ์ แทนการพิมพ์คำสั่งใน console <strong>Swing</strong> (แพ็กเกจ <code>javax.swing</code>) เป็นชุด component มาตรฐานใน Java SE สำหรับสร้าง GUI</p>
<div class="note-box"><span class="box-title">เกี่ยวกับภาพผลลัพธ์ในบท GUI</span><p>ภาพหน้าต่างทางขวาของทุกตัวอย่าง<strong>ถ่ายจากการรันโค้ดนั้นจริง</strong> (ใช้ look and feel มาตรฐานของ Swing ชื่อ Metal) แถบชื่อหน้าต่างวาดเพิ่มให้ดู ถ้ารันบนเครื่องของนิสิต กรอบหน้าต่างจะเป็นแบบของระบบปฏิบัติการ แต่เนื้อหาภายในเหมือนกัน บางตัวอย่างมีภาพ “หลังผู้ใช้กระทำ” ซึ่งได้จากการจำลองพิมพ์/คลิกด้วยโปรแกรม</p></div>`,
  topics: [
    {
      num: "14.1", toc: "Console กับ GUI", title: "หน้าต่าง, container และ component",
      blocks: [
        { type: "p", html: `หน้าจอ GUI ประกอบจากชิ้นส่วนสามระดับ ซ้อนกันเป็นชั้น ๆ` },
        { type: "table", head: ["ระดับ", "คลาส", "หน้าที่"], rows: [
          ["หน้าต่าง", "<code>JFrame</code>", "กรอบนอกสุด มีแถบชื่อและปุ่มปิด"],
          ["container", "<code>JPanel</code>", "พื้นที่บรรจุและจัดกลุ่ม component"],
          ["component", "<code>JLabel</code>, <code>JTextField</code>, <code>JButton</code> …", "สิ่งที่มองเห็นหรือโต้ตอบได้"],
        ] },
        { type: "example", title: "แผนผังส่วนประกอบ (component tree)", html: fpre(`
          JFrame (หน้าต่าง)
          └── content pane / JPanel (พื้นที่จัดกลุ่ม)
              ├── JLabel     (ข้อความ)
              ├── JTextField (ช่องกรอก)
              └── JButton    (ปุ่มกด)`) },

        { type: "h", text: "Console กับ GUI ต่างกันอย่างไร" },
        { type: "table", head: ["", "Console", "GUI"], rows: [
          ["ลำดับการทำงาน", "โปรแกรมกำหนด: ถาม → รอ → ถามต่อ", "ผู้ใช้กำหนด: คลิก/พิมพ์อะไรก่อนก็ได้"],
          ["รับข้อมูล", "Scanner อ่านทีละบรรทัด", "อ่านจาก component เมื่อเกิดเหตุการณ์"],
          ["แสดงผล", "println ต่อท้ายไปเรื่อย ๆ", "เปลี่ยนข้อความใน label/area ที่มีอยู่"],
          ["โครงสร้างโค้ด", "main ทำงานจากบนลงล่างจนจบ", "main สร้างหน้าต่างแล้วจบ ที่เหลือขับเคลื่อนด้วย event"],
        ] },
        { type: "p", html: `เทียบโปรแกรมเดียวกันสองแบบ แบบแรกพิมพ์ข้อความลง console` },
        { type: "run", title: "เวอร์ชัน console",
          code: j`
            public class ConsoleGreeting {
                public static void main(String[] args) {
                    String name = "JHope";
                    System.out.println("Welcome to Java GUI course");     // ต่อท้ายใน console
                    System.out.println("Student: " + name);
                }
            }`,
          },
        { type: "p", html: `แบบที่สองแสดงข้อความเดียวกันในหน้าต่าง: สร้าง JFrame → สร้าง JPanel → ใส่ JLabel ลง panel → ใส่ panel ลงหน้าต่าง → แสดง` },
        { type: "run", title: "เวอร์ชัน GUI", gui: true,
          code: j`
            import javax.swing.*;                                     // * = ทุกคลาสในแพ็กเกจ swing

            public class GuiGreeting {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {                // สร้าง GUI บน EDT (หัวข้อ 14.4)
                        JFrame frame = new JFrame("Greeting");        // ชื่อบนแถบหัว
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // ปิดหน้าต่าง = จบโปรแกรม
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Welcome to Java GUI course"));
                        panel.add(new JLabel("Student: JHope"));
                        frame.add(panel);                             // วาง panel ลงหน้าต่าง
                        frame.pack();                                 // ขนาดพอดีเนื้อหา
                        frame.setVisible(true);                       // แสดง (เรียกท้ายสุด)
                    });
                }
            }`,
          },
        { type: "tip", html: `main จบทันทีหลังสร้างหน้าต่าง แต่หน้าต่างยังเปิดอยู่จนกว่าผู้ใช้จะปิด` },
        { type: "check", title: "บทบาท", html: `<p>ในหน้าจอ login: กรอบหน้าต่าง, พื้นที่จัดกลุ่ม, คำว่า “Username”, ช่องพิมพ์ชื่อ, ปุ่ม Login ตรงกับคลาสใดของ Swing</p>`, answer: `<p>JFrame, JPanel, JLabel, JTextField, JButton ตามลำดับ</p>` },
      ],
    },
    {
      num: "14.2", toc: "สร้าง JFrame", title: "สร้าง JFrame และกำหนดวงจรชีวิต",
      blocks: [
        { type: "p", html: `ทุกโปรแกรม GUI เปิดหน้าต่างด้วยขั้นตอนเดียวกัน` },
        { type: "steps", title: "ลำดับการเปิดหน้าต่าง", items: [
          "สร้าง <code>new JFrame(\"ชื่อหน้าต่าง\")</code>",
          "กำหนดการปิด <code>setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)</code>",
          "เพิ่ม content และ component",
          "กำหนดขนาด: <code>setSize(w, h)</code> หรือ <code>pack()</code>",
          "วางตำแหน่ง <code>setLocationRelativeTo(null)</code> (กลางจอ)",
          "เรียก <code>setVisible(true)</code> <strong>เป็นขั้นสุดท้าย</strong>",
        ] },
        { type: "run", title: "หน้าต่างว่างด้วย setSize", gui: true,
          code: j`
            import javax.swing.JFrame;                                // import ทีละคลาสก็ได้
            import javax.swing.SwingUtilities;

            public class FirstWindow {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("My First GUI");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        frame.setSize(360, 160);                      // กว้าง 360 สูง 160 พิกเซล (รวมขอบ)
                        frame.setLocationRelativeTo(null);            // null = กึ่งกลางจอ
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "warn", title: "ลืม EXIT_ON_CLOSE", html: `ค่าเริ่มต้นคือ <code>HIDE_ON_CLOSE</code> กดปิดแล้วหน้าต่างแค่ถูกซ่อน โปรแกรมยังทำงานค้างอยู่เบื้องหลัง` },

        { type: "h", text: "setSize หรือ pack()" },
        { type: "p", html: `<code>setSize</code> กำหนดขนาดตายตัว ส่วน <code>pack()</code> ถามขนาดที่ component ข้างในต้องการ แล้วปรับหน้าต่างให้พอดี จึงไม่ตัดข้อความแม้ฟอนต์ของแต่ละเครื่องต่างกัน` },
        { type: "run", title: "หน้าต่างที่พอดีเนื้อหา", gui: true,
          code: j`
            import javax.swing.*;

            public class PackDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Packed");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("This window is exactly as big as its content."));
                        frame.add(panel);
                        frame.pack();                                 // เรียกหลัง add ครบทุกตัว
                        frame.setLocationRelativeTo(null);
                        frame.setVisible(true);
                    });
                }
            }`,
          },

        { type: "h", text: "คลาสที่สืบทอด JFrame" },
        { type: "p", html: `โปรแกรมที่ใหญ่ขึ้นนิยมสร้างคลาสหน้าต่างเองด้วย <code>extends JFrame</code> (inheritance จากบทที่ 12) แล้วจัดหน้าจอใน constructor เรียก <code>setSize</code>, <code>add</code> ได้ตรง ๆ เพราะเป็นเมธอดที่สืบทอดมา` },
        { type: "run", title: "ProfileWindow", gui: true,
          code: j`
            import javax.swing.*;

            public class ProfileWindow extends JFrame {               // คลาสนี้คือหน้าต่าง
                public ProfileWindow(String student) {
                    super("Student Profile");                         // ส่งชื่อหน้าต่างให้ JFrame
                    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    panel.add(new JLabel("Name: " + student));        // รับข้อมูลผ่าน constructor
                    panel.add(new JLabel("Faculty: Science"));
                    add(panel);                                       // add ของตัวเอง
                    setSize(320, 100);
                    setLocationRelativeTo(null);
                }

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new ProfileWindow("JHope").setVisible(true));
                }
            }`,
          },
        { type: "table", title: "ค่าที่ใช้กับ setDefaultCloseOperation", head: ["ค่า", "ผลเมื่อกดปิด", "ใช้กับ"], rows: [
          ["<code>EXIT_ON_CLOSE</code>", "ปิดหน้าต่างและจบโปรแกรม", "หน้าต่างหลัก"],
          ["<code>DISPOSE_ON_CLOSE</code>", "ปิดเฉพาะหน้าต่างนี้", "หน้าต่างรอง (บทที่ 18)"],
          ["<code>HIDE_ON_CLOSE</code>", "ซ่อน แต่โปรแกรมยังทำงาน (ค่าเริ่มต้น)", "มักเป็นบั๊กของผู้เริ่มต้น"],
        ] },
        { type: "check", title: "ลำดับ", html: `<p>ถ้าเรียก <code>setVisible(true)</code> ก่อน <code>add(panel)</code> และไม่เรียก pack() อาจเกิดอะไรขึ้น</p>`, answer: `<p>หน้าต่างอาจแสดงว่างหรือขนาดผิด เพราะ component ถูกเพิ่มหลังจากหน้าต่างคำนวณ layout ไปแล้ว — จึงควรตั้งค่าทุกอย่างก่อน setVisible(true) (ถ้าจำเป็นต้องเพิ่มทีหลังให้เรียก revalidate() และ repaint())</p>` },
      ],
    },
    {
      num: "14.3", toc: "Container และ JPanel", title: "JPanel เป็น container สำหรับ component",
      blocks: [
        { type: "p", html: `ใส่ component ลง panel แล้วใส่ panel ลงหน้าต่าง แต่ละ container มี <strong>layout manager</strong> คอยจัดตำแหน่งให้ JPanel ใช้ <code>FlowLayout</code> เป็นค่าเริ่มต้น: เรียงซ้ายไปขวาตามลำดับที่ add และขึ้นบรรทัดใหม่เมื่อเต็ม (layout อื่นอยู่ในบทที่ 15)` },
        { type: "run", title: "หลาย component ใน panel เดียว", gui: true,
          code: j`
            import javax.swing.*;

            public class LoginPanel {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Login");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();                  // FlowLayout: ซ้าย → ขวา
                        panel.add(new JLabel("Username:"));           // ลำดับ add = ลำดับบนจอ
                        panel.add(new JTextField(10));                // กว้างประมาณ 10 ตัวอักษร
                        panel.add(new JButton("Login"));
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "tip", html: `ตอนนี้กดปุ่มแล้วยังไม่มีอะไรเกิดขึ้น บทที่ 16 จะเพิ่มการตอบสนองต่อ event` },

        { type: "h", text: "ตกแต่ง: สี ขอบ และฟอนต์" },
        { type: "table", head: ["เมธอด", "ตัวอย่าง"], rows: [
          ["<code>setBackground(color)</code>", "<code>new Color(229, 244, 207)</code> ค่า R, G, B 0–255"],
          ["<code>setForeground(color)</code>", "สีตัวอักษร เช่น <code>Color.WHITE</code>"],
          ["<code>setFont(font)</code>", "<code>new Font(\"SansSerif\", Font.BOLD, 22)</code> (PLAIN, BOLD, ITALIC)"],
          ["<code>setBorder(border)</code>", "<code>BorderFactory.createEmptyBorder(บน, ซ้าย, ล่าง, ขวา)</code>"],
        ] },
        { type: "run", title: "panel สีเขียวอ่อนกับหัวข้อตัวหนา", gui: true,
          code: j`
            import javax.swing.*;
            import java.awt.*;                                        // Color, Font อยู่ใน java.awt

            public class StyledPanel {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Styled");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.setBackground(new Color(229, 244, 207));
                        panel.setBorder(BorderFactory.createEmptyBorder(16, 24, 16, 24));   // ระยะขอบด้านใน
                        JLabel title = new JLabel("Java Cafe");
                        title.setFont(new Font("SansSerif", Font.BOLD, 22));
                        title.setForeground(new Color(8, 125, 134));
                        panel.add(title);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },

        { type: "h", text: "panel ซ้อน panel" },
        { type: "p", html: `แบ่งหน้าจอเป็นส่วน ๆ ด้วย panel หลายตัว แต่ละส่วนตกแต่งแยกกันได้ ตัวอย่างนี้วาง panel หัวไว้ด้านบน (<code>BorderLayout.NORTH</code>) และ panel เนื้อหาไว้ตรงกลาง (<code>CENTER</code>) ของหน้าต่าง` },
        { type: "run", title: "ส่วนหัวกับส่วนเนื้อหา", gui: true,
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class NestedPanels {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Course Card");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                        JPanel header = new JPanel();                 // ส่วนหัว: พื้นเข้ม ตัวอักษรขาว
                        header.setBackground(new Color(32, 44, 40));
                        JLabel title = new JLabel("CS101 Programming");
                        title.setForeground(Color.WHITE);
                        header.add(title);

                        JPanel body = new JPanel();                   // ส่วนเนื้อหา
                        body.add(new JLabel("Credits: 3"));
                        body.add(new JLabel("Seats: 40"));
                        body.add(new JButton("Enroll"));

                        frame.add(header, BorderLayout.NORTH);        // แถบบน
                        frame.add(body, BorderLayout.CENTER);         // พื้นที่หลัก
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "check", title: "FlowLayout", html: `<p>ถ้าหน้าต่าง FlowLayout แคบเกินไปสำหรับ component ทั้งหมดในแถวเดียว จะเกิดอะไรขึ้น</p>`, answer: `<p>component ที่ไม่พอจะถูกย้ายไปบรรทัดถัดไป (wrap) — ถ้าหน้าต่างสูงไม่พอก็จะมองไม่เห็นบางส่วน จึงควรใช้ pack() หรือ layout ที่เหมาะสม</p>` },
      ],
    },
    {
      num: "14.4", toc: "Event Dispatch Thread", title: "Event Dispatch Thread (EDT)",
      blocks: [
        { type: "p", html: `Swing มี thread พิเศษชื่อ <strong>Event Dispatch Thread (EDT)</strong> ทำหน้าที่วาดหน้าจอและรับเหตุการณ์ทั้งหมด ทุกการสร้างและแก้ไข component ต้องทำบน EDT เพราะ Swing ไม่ปลอดภัยเมื่อถูกใช้จากหลาย thread พร้อมกัน` },
        { type: "p", html: `วิธีมาตรฐานคือห่อโค้ดสร้าง GUI ด้วย <code>SwingUtilities.invokeLater(() -&gt; { ... });</code> ซึ่งส่ง “งาน” ไปเข้าคิวของ EDT` },
        { type: "concept", title: "invokeLater ทำอะไร", html: fpre(`
          main thread                      Event Dispatch Thread
          ───────────                      ─────────────────────
          main() เริ่ม
          invokeLater(งานสร้าง GUI) ──────▶ คิวงาน: [สร้าง GUI]
          main() จบ                        ทำ "สร้าง GUI" → แสดงหน้าต่าง
                                           รอ event: คลิก, พิมพ์, วาดใหม่ ...`) + `<p><code>() -&gt; { ... }</code> คือ lambda หรือ “งานชิ้นหนึ่ง” ที่ส่งให้ EDT ทำภายหลัง (บทที่ 16)</p>` },
        { type: "run", title: "ดูชื่อ thread ที่ทำงาน", gui: true,
          code: j`
            import javax.swing.*;

            public class WhichThread {
                public static void main(String[] args) {
                    String mainThread = Thread.currentThread().getName();     // "main"
                    SwingUtilities.invokeLater(() -> {
                        String edt = Thread.currentThread().getName();        // "AWT-EventQueue-0" = EDT
                        JFrame frame = new JFrame("Threads");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("main ran on: " + mainThread));
                        panel.add(new JLabel("GUI built on: " + edt));
                        panel.add(new JLabel("isEDT = " + SwingUtilities.isEventDispatchThread()));   // true
                        frame.add(panel);
                        frame.setSize(260, 110);                              // แคบ → FlowLayout ตัดบรรทัด
                        frame.setVisible(true);
                    });
                }
            }`,
          },

        { type: "h", text: "โครงโปรแกรม GUI มาตรฐาน" },
        { type: "p", html: `แยกการสร้างหน้าต่างไว้ในเมธอด <code>createAndShowGui()</code> และแยกการจัดเนื้อหาไว้ใน <code>buildContent()</code> แล้วให้ main เรียกผ่าน invokeLater โครงนี้ใช้ได้กับทุกบทถัดไป` },
        { type: "run", title: "GuiTemplate", gui: true,
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class GuiTemplate {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(GuiTemplate::createAndShowGui);   // method reference: สั้นกว่า lambda
                }

                private static void createAndShowGui() {                     // ตั้งค่าหน้าต่าง
                    JFrame frame = new JFrame("App Template");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    frame.setContentPane(buildContent());                    // ใช้ panel ของเราเป็นเนื้อหา
                    frame.pack();
                    frame.setLocationRelativeTo(null);
                    frame.setVisible(true);
                }

                private static JPanel buildContent() {                       // จัดหน้าตา
                    JPanel panel = new JPanel(new BorderLayout(8, 8));       // เว้นระยะ 8 พิกเซล
                    panel.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
                    panel.add(new JLabel("Header goes here"), BorderLayout.NORTH);
                    panel.add(new JTextArea("Main content area", 4, 24), BorderLayout.CENTER);   // 4 แถว 24 คอลัมน์
                    panel.add(new JButton("Action"), BorderLayout.SOUTH);
                    return panel;
                }
            }`,
          },
        { type: "warn", title: "งานหนักห้ามทำบน EDT", html: `ถ้าโค้ดบน EDT ทำงานนาน เช่น ลูปคำนวณหลายวินาที หรือ Thread.sleep หน้าต่างจะค้าง กดอะไรไม่ได้ เพราะ EDT ไม่ว่างวาดหน้าจอ บทเสริม “Timer, Thread และ Swing” อธิบายวิธีแก้ด้วย Swing Timer และ SwingWorker` },
      ],
    },
  ],
  exercisesIntro: "ทุกข้อเป็นโปรแกรม GUI ให้รันแล้วเทียบหน้าต่างกับภาพตัวอย่าง (ขนาดและฟอนต์อาจต่างเล็กน้อยตามเครื่อง) ทุกโปรแกรมต้องสร้าง GUI ใน SwingUtilities.invokeLater",
  exercises: [
    { level: 1, title: "หน้าต่าง Student Profile", html: `<p>สร้างหน้าต่างชื่อ <code>Student Profile</code> ขนาด 400 × 150 เปิดกลางจอ และปิดแล้วจบโปรแกรม ภายในมีข้อความ <code>Name: (ชื่อของคุณ)</code></p>`,
      spec: ["ใช้ setSize, setLocationRelativeTo(null), EXIT_ON_CLOSE", "ใส่ JLabel ผ่าน JPanel"], gui: true,
      solution: j`
        import javax.swing.*;

        public class StudentProfile {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Student Profile");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    panel.add(new JLabel("Name: JHope Jung"));
                    frame.add(panel);
                    frame.setSize(400, 150);  // กำหนดขนาดเอง
                    frame.setLocationRelativeTo(null);
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 1, title: "ป้ายข้อความสามบรรทัดด้วย pack()", html: `<p>สร้างหน้าต่าง <code>About</code> ที่มี JLabel 3 ตัว: ชื่อโปรแกรม, เวอร์ชัน และผู้พัฒนา ใช้ <code>pack()</code> แทน setSize และสังเกตว่า FlowLayout วางข้อความในแถวเดียวกัน</p>`,
      spec: ["ใช้ JPanel ค่าเริ่มต้น (FlowLayout)", "เรียก pack() หลัง add ทั้งหมด", "ตอบคำถาม: ถ้าอยากให้อยู่คนละบรรทัดต้องทำอย่างไร (ดูเฉลย)"], gui: true,
      solution: j`
        import javax.swing.*;

        public class AboutWindow {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("About");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    panel.add(new JLabel("Grade Calculator"));
                    panel.add(new JLabel("v1.0"));
                    panel.add(new JLabel("by JHope"));
                    frame.add(panel);
                    frame.pack();  // ปรับขนาดตามเนื้อหา
                    frame.setVisible(true);
                });
            }
        }`, explain: "ถ้าต้องการให้แต่ละ label อยู่คนละบรรทัด ใช้ layout อื่น เช่น <code>new JPanel(new GridLayout(0, 1))</code> หรือ BoxLayout (บทที่ 15)" },
    { level: 1, title: "หน้าต่างล็อกอิน (ยังไม่ทำงาน)", html: `<p>สร้างหน้าต่าง <code>Login</code> ที่มี JLabel “Username:”, JTextField กว้าง 12, JLabel “Password:”, <code>JPasswordField</code> กว้าง 12 และปุ่ม <code>Sign in</code> ปรับความกว้างหน้าต่างให้ช่องเรียงเป็น 2 แถวตามภาพ</p>`,
      spec: ["JPasswordField แสดงจุดแทนตัวอักษร", "ใช้ setSize ให้แคบพอที่ FlowLayout จะตัดขึ้นแถวใหม่ (ประมาณ 300 × 130)", "ยังไม่ต้องมี event"], gui: true, actions: "type field:0 jhope\ntype field:1 secret",
      solution: j`
        import javax.swing.*;

        public class LoginWindow {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Login");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    panel.add(new JLabel("Username:"));
                    panel.add(new JTextField(12));
                    panel.add(new JLabel("Password:"));
                    // ช่องรหัสผ่าน แสดงเป็นจุด
                    panel.add(new JPasswordField(12));
                    panel.add(new JButton("Sign in"));
                    frame.add(panel);
                    frame.setSize(300, 130);
                    frame.setLocationRelativeTo(null);
                    frame.setVisible(true);
                });
            }
        }`, explain: "ภาพตัวอย่างจำลองการพิมพ์ชื่อและรหัสผ่านแล้ว — JPasswordField เป็นคลาสลูกของ JTextField จึงพิมพ์ได้เหมือนกันแต่แสดงเป็นจุด" },
    { level: 2, title: "นามบัตรแบบมีสี", html: `<p>สร้างหน้าต่าง <code>Business Card</code> ที่มีพื้นหลังสีเข้ม (เช่น RGB 32, 44, 40) ชื่อเป็นตัวหนาขนาด 20 สีขาว และตำแหน่งงานสีเขียวอ่อน มีระยะขอบภายใน 20 พิกเซลทุกด้าน</p>`,
      spec: ["ใช้ setBackground, setForeground, setFont, BorderFactory.createEmptyBorder", "จัดชื่อและตำแหน่งให้อยู่คนละบรรทัดด้วย <code>new JPanel(new GridLayout(2, 1))</code>", "ใช้ pack()"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class BusinessCardGui {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Business Card");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    // GridLayout 2 แถว 1 คอลัมน์
                    JPanel card = new JPanel(new GridLayout(2, 1, 0, 6));
                    card.setBackground(new Color(32, 44, 40));
                    card.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
                    JLabel name = new JLabel("JHope Jung");
                    name.setFont(new Font("SansSerif", Font.BOLD, 20));
                    name.setForeground(Color.WHITE);
                    JLabel role = new JLabel("Junior Java Developer");
                    role.setForeground(new Color(180, 223, 57));
                    card.add(name);
                    card.add(role);
                    // ใช้ card เป็นเนื้อหาทั้งหมดของหน้าต่าง
                    frame.setContentPane(card);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 2, title: "หน้าต่างจากคลาสที่สืบทอด JFrame", html: `<p>สร้างคลาส <code>MessageWindow extends JFrame</code> ที่ constructor รับชื่อหน้าต่างและข้อความ แล้วแสดงข้อความนั้นในหน้าต่างขนาดพอดี (pack) ใน main สร้างหน้าต่าง 2 บานจากคลาสเดียวกัน วางตำแหน่งไม่ให้ซ้อนกันด้วย <code>setLocation(x, y)</code></p>`,
      spec: ["เรียก super(title) ใน constructor", "หน้าต่างแรกที่ (100, 100) หน้าต่างที่สองที่ (100, 220)", "ทั้งสองใช้ EXIT_ON_CLOSE (ปิดบานใดก็จบโปรแกรม)"], gui: true,
      solution: j`
        import javax.swing.*;

        public class MessageWindow extends JFrame {
            // ส่งชื่อหน้าต่างและข้อความผ่าน constructor
            public MessageWindow(String title, String message) {
                super(title);
                setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JPanel panel = new JPanel();
                panel.setBorder(BorderFactory.createEmptyBorder(10, 16, 10, 16));
                panel.add(new JLabel(message));
                add(panel);
                pack();  // ขนาดพอดีเนื้อหา
            }

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    // สร้างหน้าต่างบานที่ 1
                    MessageWindow a = new MessageWindow("Reminder", "Submit lab 14 before Friday");
                    // กำหนดตำแหน่งบนจอ
                    a.setLocation(100, 100);
                    a.setVisible(true);
                    // คลาสเดียวสร้างได้หลายบาน
                    MessageWindow b = new MessageWindow("Tip", "Use pack() to fit content");
                    b.setLocation(100, 220);
                    b.setVisible(true);
                });
            }
        }`, explain: "ภาพตัวอย่างแสดงหน้าต่างทั้งสองบาน — คลาสเดียวสร้างออบเจ็กต์ได้หลายตัว (บทที่ 11)" },
    { level: 2, title: "หน้าต่างแบ่ง 3 ส่วน", html: `<p>สร้างหน้าต่าง <code>Dashboard</code> ที่แบ่งเป็น 3 ส่วนด้วย panel: ส่วนหัว (NORTH) พื้นสีเข้มมีชื่อแอป, ส่วนกลาง (CENTER) มีข้อความ “Welcome back!”, ส่วนล่าง (SOUTH) มีปุ่ม 3 ปุ่ม: Home, Reports, Settings</p>`,
      spec: ["ใช้ BorderLayout ของ content pane", "แต่ละส่วนเป็น JPanel ของตัวเอง", "หน้าต่างกว้างประมาณ 360"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class Dashboard {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Dashboard");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel header = new JPanel();  // ส่วนหัว
                    header.setBackground(new Color(8, 125, 134));
                    JLabel appName = new JLabel("Study Tracker");
                    appName.setForeground(Color.WHITE);
                    appName.setFont(new Font("SansSerif", Font.BOLD, 16));
                    header.add(appName);

                    JPanel center = new JPanel();  // ส่วนกลาง
                    center.setBorder(BorderFactory.createEmptyBorder(30, 10, 30, 10));
                    center.add(new JLabel("Welcome back!"));

                    // ส่วนท้าย: ปุ่มเรียงแถว
                    JPanel footer = new JPanel();
                    footer.add(new JButton("Home"));
                    footer.add(new JButton("Reports"));
                    footer.add(new JButton("Settings"));

                    // BorderLayout: NORTH / CENTER / SOUTH
                    frame.add(header, BorderLayout.NORTH);
                    frame.add(center, BorderLayout.CENTER);
                    frame.add(footer, BorderLayout.SOUTH);
                    frame.setSize(360, 200);
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 3, title: "ตารางเวลาเรียนจากอาเรย์", html: `<p>มีอาเรย์ <code>String[] days</code> และ <code>String[] subjects</code> (5 วัน) ให้สร้างหน้าต่างที่แสดงตาราง 2 คอลัมน์ด้วย <code>GridLayout(0, 2)</code> โดย<strong>สร้าง JLabel ด้วยลูป</strong> หัวตารางเป็นตัวหนา และแถววันเสาร์อาทิตย์ (ถ้ามี) เป็นสีแดง</p>`,
      spec: ["ข้อมูลอยู่ในอาเรย์ ไม่เขียน label ทีละบรรทัด", "หัวตาราง “Day” และ “Subject” ใช้ Font.BOLD", "เว้นระยะระหว่างช่องด้วย GridLayout(0, 2, 12, 4)", "ใส่ EmptyBorder รอบ panel"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class TimetableGui {
            public static void main(String[] args) {
                // ข้อมูลจากอาเรย์คู่ขนาน
                String[] days = {"Mon", "Tue", "Wed", "Thu", "Sat"};
                String[] subjects = {"Programming", "Calculus", "Physics", "English", "Lab (make-up)"};
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Timetable");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    // 0 แถว = ไม่จำกัด, 2 คอลัมน์
                    JPanel grid = new JPanel(new GridLayout(0, 2, 12, 4));
                    grid.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));
                    JLabel h1 = new JLabel("Day");
                    JLabel h2 = new JLabel("Subject");
                    // ฟอนต์ตัวหนาจากฟอนต์เดิม
                    Font bold = h1.getFont().deriveFont(Font.BOLD);
                    h1.setFont(bold);
                    h2.setFont(bold);
                    grid.add(h1);
                    grid.add(h2);
                    // สร้าง label ทีละแถวจากอาเรย์
                    for (int i = 0; i < days.length; i++) {
                        JLabel d = new JLabel(days[i]);
                        JLabel s = new JLabel(subjects[i]);
                        // วันหยุดเป็นสีแดง
                        if (days[i].equals("Sat") || days[i].equals("Sun")) {
                            d.setForeground(Color.RED);
                            s.setForeground(Color.RED);
                        }
                        grid.add(d);
                        grid.add(s);
                    }
                    frame.add(grid);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "<code>deriveFont(Font.BOLD)</code> สร้างฟอนต์ใหม่จากฟอนต์เดิมโดยเปลี่ยนแค่รูปแบบ ทำให้ขนาดเท่าเดิม" },
    { level: 3, title: "ปุ่มตัวเลขแบบเครื่องคิดเลข", html: `<p>สร้างหน้าต่าง <code>Keypad</code> ที่มีช่องแสดงผล (JTextField ไม่ให้แก้ไขด้วย <code>setEditable(false)</code> ชิดขวา) ด้านบน และปุ่ม 16 ปุ่มในตาราง 4 × 4: <code>7 8 9 /</code>, <code>4 5 6 *</code>, <code>1 2 3 -</code>, <code>0 . = +</code> สร้างปุ่มด้วยลูปจากอาเรย์ String และทำปุ่ม <code>=</code> ให้มีสีพื้นต่างจากปุ่มอื่น</p>`,
      spec: ["ช่องแสดงผลอยู่ NORTH, ตารางปุ่มอยู่ CENTER", "ใช้ <code>GridLayout(4, 4, 4, 4)</code>", "ตั้งข้อความเริ่มต้นในช่องเป็น 0 ชิดขวาด้วย <code>setHorizontalAlignment(JTextField.RIGHT)</code>", "ยังไม่ต้องทำให้ปุ่มคำนวณได้ (ทำในบทที่ 16)"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class KeypadGui {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Keypad");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    // ช่องแสดงผล ค่าเริ่มต้น "0"
                    JTextField display = new JTextField("0", 12);
                    // อ่านอย่างเดียว
                    display.setEditable(false);
                    // ชิดขวาเหมือนเครื่องคิดเลข
                    display.setHorizontalAlignment(JTextField.RIGHT);
                    display.setFont(new Font("Monospaced", Font.BOLD, 20));

                    // ข้อความบนปุ่มเรียงทีละแถว
                    String[] keys = {"7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"};
                    // ตาราง 4×4 เว้นระยะ 4 พิกเซล
                    JPanel pad = new JPanel(new GridLayout(4, 4, 4, 4));
                    // สร้างปุ่มด้วยลูป
                    for (String k : keys) {
                        JButton b = new JButton(k);
                        if (k.equals("=")) {
                            // ปุ่ม = สีเขียว
                            b.setBackground(new Color(180, 223, 57));
                        }
                        pad.add(b);
                    }
                    // จอแสดงผลด้านบน ปุ่มตรงกลาง
                    JPanel root = new JPanel(new BorderLayout(6, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(display, BorderLayout.NORTH);
                    root.add(pad, BorderLayout.CENTER);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
  ],
};
