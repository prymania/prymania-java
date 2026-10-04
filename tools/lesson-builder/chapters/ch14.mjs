import { j, c, pre } from "../lib.mjs";

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
        { type: "p", html: `<strong>JFrame</strong> เป็นหน้าต่างหลัก; <strong>container</strong> (เช่น JPanel) ใช้บรรจุและจัดกลุ่ม component; <strong>component</strong> คือสิ่งที่มองเห็นหรือโต้ตอบได้ เช่น label, button และ text field` },
        { type: "example", title: "แผนผังส่วนประกอบ (component tree)", html: pre(`
          JFrame (หน้าต่าง)
          └── content pane / JPanel (พื้นที่จัดกลุ่ม)
              ├── JLabel     (ข้อความ)
              ├── JTextField (ช่องกรอก)
              └── JButton    (ปุ่มกด)`) + `<p>หน้าต่างทำหน้าที่เป็น root container; เรามักเพิ่ม JPanel ก่อน แล้วใส่ component ลงใน panel เพื่อจัด layout</p>` },
        { type: "table", title: "Console กับ GUI ต่างกันอย่างไร", head: ["", "Console", "GUI"], rows: [
          ["ลำดับการทำงาน", "โปรแกรมกำหนด: ถาม → รอ → ถามต่อ", "ผู้ใช้กำหนด: คลิก/พิมพ์อะไรก่อนก็ได้"],
          ["รับข้อมูล", "Scanner อ่านทีละบรรทัด", "อ่านจาก component เมื่อเกิดเหตุการณ์"],
          ["แสดงผล", "println ต่อท้ายไปเรื่อย ๆ", "เปลี่ยนข้อความใน label/area ที่มีอยู่"],
          ["โครงสร้างโค้ด", "main ทำงานจากบนลงล่างจนจบ", "main สร้างหน้าต่างแล้วจบ ที่เหลือขับเคลื่อนด้วย event"],
        ] },
        { type: "run", title: "เทียบโปรแกรมเดียวกัน: เวอร์ชัน console", level: "พื้นฐาน",
          concept: "โปรแกรม console ทำงานตามลำดับที่เขียน ผลลัพธ์ต่อท้ายใน console",
          code: j`
            public class ConsoleGreeting {
                public static void main(String[] args) {
                    String name = "Mali";
                    System.out.println("Welcome to Java GUI course");
                    System.out.println("Student: " + name);
                }
            }`,
          steps: ["ทำบรรทัดแรก แล้วบรรทัดถัดไป จนจบ main", "ไม่มีหน้าต่าง ผลลัพธ์อยู่ใน console"] },
        { type: "run", title: "เวอร์ชัน GUI: ข้อความเดียวกันในหน้าต่าง", level: "พื้นฐาน", gui: true,
          concept: "สร้าง JFrame ใส่ JLabel สองตัวลงใน JPanel แล้วแสดงหน้าต่าง — ข้อความอยู่ในหน้าต่างแทน console",
          code: j`
            import javax.swing.*;

            public class GuiGreeting {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Greeting");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Welcome to Java GUI course"));
                        panel.add(new JLabel("Student: Mali"));
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["<code>import javax.swing.*;</code> นำเข้าคลาส Swing ทั้งหมด", "สร้างหน้าต่าง → สร้าง panel → ใส่ label → ใส่ panel ลงหน้าต่าง", "<code>pack()</code> ปรับขนาดพอดีเนื้อหา แล้ว <code>setVisible(true)</code> แสดง", "main จบทันที แต่หน้าต่างยังอยู่จนกว่าผู้ใช้จะปิด"] },
        { type: "check", title: "บทบาท", html: `<p>ในหน้าจอ login: กรอบหน้าต่าง, พื้นที่จัดกลุ่ม, คำว่า “Username”, ช่องพิมพ์ชื่อ, ปุ่ม Login ตรงกับคลาสใดของ Swing</p>`, answer: `<p>JFrame, JPanel, JLabel, JTextField, JButton ตามลำดับ</p>` },
      ],
    },
    {
      num: "14.2", toc: "สร้าง JFrame", title: "สร้าง JFrame และกำหนดวงจรชีวิต",
      blocks: [
        { type: "steps", title: "ลำดับการเปิดหน้าต่าง", items: [
          "สร้าง <code>new JFrame(\"ชื่อหน้าต่าง\")</code>",
          "กำหนดการปิด <code>setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE)</code> — ไม่เช่นนั้นปิดหน้าต่างแล้วโปรแกรมยังทำงานค้าง",
          "เพิ่ม content และ component",
          "กำหนดขนาด: <code>setSize(w, h)</code> หรือ <code>pack()</code>",
          "วางตำแหน่ง <code>setLocationRelativeTo(null)</code> (กลางจอ)",
          "เรียก <code>setVisible(true)</code> <strong>เป็นขั้นสุดท้าย</strong>",
        ] },
        { type: "run", title: "หน้าต่างขั้นต่ำด้วย setSize", level: "พื้นฐาน", gui: true,
          concept: "หน้าต่างว่างที่มีขนาดตามที่กำหนด — เป็นโครงเริ่มต้นของทุกโปรแกรม GUI",
          code: j`
            import javax.swing.JFrame;
            import javax.swing.SwingUtilities;

            public class FirstWindow {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("My First GUI");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        frame.setSize(360, 160);
                        frame.setLocationRelativeTo(null);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ชื่อหน้าต่างปรากฏในแถบด้านบน", "ขนาด 360 × 160 พิกเซลรวมขอบหน้าต่าง", "EXIT_ON_CLOSE จบโปรแกรมเมื่อกดปิด"] },
        { type: "run", title: "setSize กับ pack()", level: "ต่อยอด", gui: true,
          concept: "<code>pack()</code> คำนวณขนาดจาก preferred size ของ component ข้างใน — ได้หน้าต่างที่พอดีเนื้อหาไม่ว่าฟอนต์ของเครื่องจะเป็นแบบไหน",
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
                        frame.pack();
                        frame.setLocationRelativeTo(null);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ไม่ได้กำหนดขนาดเอง", "pack() ถามขนาดที่ต้องการของ panel และ label แล้วปรับหน้าต่างให้พอดี", "ถ้าเพิ่ม component ต้องเรียก pack() <em>หลัง</em> add ทั้งหมด"] },
        { type: "run", title: "คลาสที่สืบทอด JFrame", level: "ประยุกต์", gui: true,
          concept: "โปรแกรม GUI ขนาดใหญ่นิยมสร้างคลาสของหน้าต่างเองด้วย <code>extends JFrame</code> แล้วจัดหน้าจอใน constructor (ใช้ inheritance จากบทที่ 12)",
          code: j`
            import javax.swing.*;

            public class ProfileWindow extends JFrame {
                public ProfileWindow(String student) {
                    super("Student Profile");
                    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    panel.add(new JLabel("Name: " + student));
                    panel.add(new JLabel("Faculty: Science"));
                    add(panel);
                    setSize(320, 100);
                    setLocationRelativeTo(null);
                }

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new ProfileWindow("Mali").setVisible(true));
                }
            }`,
          steps: ["<code>super(\"Student Profile\")</code> ส่งชื่อหน้าต่างให้ constructor ของ JFrame", "เรียก setSize, add ได้ตรง ๆ เพราะเป็นเมธอดที่สืบทอดมา", "constructor รับ parameter ได้ ทำให้สร้างหน้าต่างหลายแบบจากคลาสเดียว", "main เหลือบรรทัดเดียว"] },
        { type: "note", title: "ค่าที่ใช้กับ setDefaultCloseOperation", html: `<ul><li><code>EXIT_ON_CLOSE</code> — ปิดหน้าต่างแล้วจบโปรแกรม (ใช้กับหน้าต่างหลัก)</li><li><code>DISPOSE_ON_CLOSE</code> — ปิดเฉพาะหน้าต่างนี้ (ใช้กับหน้าต่างรอง บทที่ 18)</li><li><code>HIDE_ON_CLOSE</code> — ค่าเริ่มต้น ซ่อนหน้าต่างแต่โปรแกรมยังทำงาน (มักเป็นบั๊กสำหรับผู้เริ่มต้น)</li></ul>` },
        { type: "check", title: "ลำดับ", html: `<p>ถ้าเรียก <code>setVisible(true)</code> ก่อน <code>add(panel)</code> และไม่เรียก pack() อาจเกิดอะไรขึ้น</p>`, answer: `<p>หน้าต่างอาจแสดงว่างหรือขนาดผิด เพราะ component ถูกเพิ่มหลังจากหน้าต่างคำนวณ layout ไปแล้ว — จึงควรตั้งค่าทุกอย่างก่อน setVisible(true) (ถ้าจำเป็นต้องเพิ่มทีหลังให้เรียก revalidate() และ repaint())</p>` },
      ],
    },
    {
      num: "14.3", toc: "Container และ JPanel", title: "JPanel เป็น container สำหรับ component",
      blocks: [
        { type: "p", html: `เพิ่ม component ลง panel แล้วเพิ่ม panel ไปใน frame ทำให้เปลี่ยน layout หรือสลับเนื้อหาได้ง่าย แต่ละ container มี <strong>layout manager</strong> คอยจัดตำแหน่ง JPanel ใช้ <code>FlowLayout</code> เป็นค่าเริ่มต้น (เรียงซ้ายไปขวา ขึ้นบรรทัดใหม่เมื่อเต็ม) บทที่ 15 จะเรียน layout อื่น ๆ` },
        { type: "run", title: "หลาย component ใน panel เดียว", level: "พื้นฐาน", gui: true,
          concept: "FlowLayout วาง component ตามลำดับที่ add จากซ้ายไปขวา",
          code: j`
            import javax.swing.*;

            public class LoginPanel {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Login");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Username:"));
                        panel.add(new JTextField(10));
                        panel.add(new JButton("Login"));
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["JTextField(10) กำหนดความกว้างประมาณ 10 ตัวอักษร", "ลำดับ add = ลำดับบนหน้าจอ", "ยังกดปุ่มแล้วไม่มีอะไรเกิดขึ้น — บทที่ 16 จะเพิ่ม event"] },
        { type: "run", title: "ตกแต่ง panel: สีพื้นหลัง ขอบ และฟอนต์", level: "ต่อยอด", gui: true,
          concept: "component มีเมธอดปรับหน้าตา เช่น <code>setBackground</code>, <code>setForeground</code>, <code>setFont</code> และ <code>setBorder</code>",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class StyledPanel {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Styled");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.setBackground(new Color(229, 244, 207));
                        panel.setBorder(BorderFactory.createEmptyBorder(16, 24, 16, 24));
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
          steps: ["<code>new Color(r, g, b)</code> กำหนดสีด้วยค่า 0–255 (ต้อง import java.awt.*)", "EmptyBorder เว้นระยะขอบ บน-ซ้าย-ล่าง-ขวา", "Font(ชื่อ, รูปแบบ, ขนาด) — BOLD, ITALIC, PLAIN"] },
        { type: "run", title: "panel ซ้อน panel: แยกส่วนหัวกับส่วนเนื้อหา", level: "ประยุกต์", gui: true,
          concept: "panel ใส่ใน panel ได้ ทำให้แบ่งหน้าจอเป็นส่วน ๆ แต่ละส่วนตกแต่งแยกกันได้ ในตัวอย่างใช้ BorderLayout ของ frame วางส่วนหัวด้านบนและเนื้อหาตรงกลาง",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class NestedPanels {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Course Card");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                        JPanel header = new JPanel();
                        header.setBackground(new Color(32, 44, 40));
                        JLabel title = new JLabel("CS101 Programming");
                        title.setForeground(Color.WHITE);
                        header.add(title);

                        JPanel body = new JPanel();
                        body.add(new JLabel("Credits: 3"));
                        body.add(new JLabel("Seats: 40"));
                        body.add(new JButton("Enroll"));

                        frame.add(header, BorderLayout.NORTH);
                        frame.add(body, BorderLayout.CENTER);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["header และ body เป็น panel แยกกัน", "content pane ของ JFrame ใช้ BorderLayout: NORTH คือแถบบน, CENTER คือพื้นที่หลัก", "เปลี่ยนสีหัวได้โดยไม่กระทบเนื้อหา"] },
        { type: "check", title: "FlowLayout", html: `<p>ถ้าหน้าต่าง FlowLayout แคบเกินไปสำหรับ component ทั้งหมดในแถวเดียว จะเกิดอะไรขึ้น</p>`, answer: `<p>component ที่ไม่พอจะถูกย้ายไปบรรทัดถัดไป (wrap) — ถ้าหน้าต่างสูงไม่พอก็จะมองไม่เห็นบางส่วน จึงควรใช้ pack() หรือ layout ที่เหมาะสม</p>` },
      ],
    },
    {
      num: "14.4", toc: "Event Dispatch Thread", title: "Event Dispatch Thread (EDT)",
      blocks: [
        { type: "p", html: `Swing ไม่ปลอดภัยต่อการใช้งานจากหลาย thread พร้อมกัน ทุกการสร้างและแก้ไข component ต้องทำบน <strong>Event Dispatch Thread (EDT)</strong> ซึ่งเป็น thread เดียวที่วาดหน้าจอและประมวลผลเหตุการณ์ วิธีมาตรฐานคือห่อโค้ดสร้าง GUI ด้วย <code>SwingUtilities.invokeLater(() -&gt; { ... });</code>` },
        { type: "concept", title: "invokeLater ทำอะไร", html: pre(`
          main thread                      Event Dispatch Thread
          ───────────                      ─────────────────────
          main() เริ่ม
          invokeLater(งานสร้าง GUI) ──────▶ คิวงาน: [สร้าง GUI]
          main() จบ                        ทำ "สร้าง GUI" → แสดงหน้าต่าง
                                           รอ event: คลิก, พิมพ์, วาดใหม่ ...`) + `<p><code>() -&gt; { ... }</code> คือ lambda — “งานชิ้นหนึ่ง” ที่ส่งให้ EDT ทำภายหลัง จะเรียนละเอียดในบทที่ 16</p>` },
        { type: "run", title: "ดูชื่อ thread ที่ทำงาน", level: "ต่อยอด", gui: true,
          concept: "แสดงว่าโค้ดใน invokeLater ทำงานบน thread ชื่อ AWT-EventQueue-0 ไม่ใช่ main",
          code: j`
            import javax.swing.*;

            public class WhichThread {
                public static void main(String[] args) {
                    String mainThread = Thread.currentThread().getName();
                    SwingUtilities.invokeLater(() -> {
                        String edt = Thread.currentThread().getName();
                        JFrame frame = new JFrame("Threads");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("main ran on: " + mainThread));
                        panel.add(new JLabel("GUI built on: " + edt));
                        panel.add(new JLabel("isEDT = " + SwingUtilities.isEventDispatchThread()));
                        frame.add(panel);
                        frame.setSize(260, 110);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["main ทำงานบน thread ชื่อ main", "โค้ดใน lambda ทำงานบน AWT-EventQueue-0 (EDT)", "<code>SwingUtilities.isEventDispatchThread()</code> ใช้ตรวจได้ว่าอยู่บน EDT หรือไม่", "สังเกต: setSize(260, …) แคบ FlowLayout จึงตัดขึ้นบรรทัดใหม่"] },
        { type: "run", title: "โครงโปรแกรม GUI มาตรฐานที่จะใช้ทั้งหน่วย", level: "ประยุกต์", gui: true,
          concept: "แยกเมธอด <code>createAndShowGui()</code> แล้วให้ main เรียกผ่าน invokeLater — โครงนี้ใช้ได้กับทุกบทถัดไป",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class GuiTemplate {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(GuiTemplate::createAndShowGui);
                }

                private static void createAndShowGui() {
                    JFrame frame = new JFrame("App Template");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    frame.setContentPane(buildContent());
                    frame.pack();
                    frame.setLocationRelativeTo(null);
                    frame.setVisible(true);
                }

                private static JPanel buildContent() {
                    JPanel panel = new JPanel(new BorderLayout(8, 8));
                    panel.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
                    panel.add(new JLabel("Header goes here"), BorderLayout.NORTH);
                    panel.add(new JTextArea("Main content area", 4, 24), BorderLayout.CENTER);
                    panel.add(new JButton("Action"), BorderLayout.SOUTH);
                    return panel;
                }
            }`,
          steps: ["<code>GuiTemplate::createAndShowGui</code> คือ method reference — สั้นกว่าเขียน lambda", "buildContent() คืน JPanel ที่จัดเสร็จแล้ว แยกส่วนสร้างหน้าตาออกจากส่วนตั้งค่าหน้าต่าง", "setContentPane แทนที่ content pane ด้วย panel ของเรา"] },
        { type: "note", title: "งานหนักห้ามทำบน EDT", html: `<p>ถ้าโค้ดบน EDT ทำงานนาน (เช่น ลูปคำนวณหลายวินาที หรือ Thread.sleep) หน้าต่างจะค้าง กดอะไรไม่ได้ เพราะ EDT ไม่ว่างวาดหน้าจอ บทเสริม “Timer, Thread และ Swing” อธิบายวิธีแก้ด้วย Swing Timer และ SwingWorker</p>` },
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
                    panel.add(new JLabel("Name: Mali Jaidee"));
                    frame.add(panel);
                    frame.setSize(400, 150);
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
                    panel.add(new JLabel("by Mali"));
                    frame.add(panel);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "ถ้าต้องการให้แต่ละ label อยู่คนละบรรทัด ใช้ layout อื่น เช่น <code>new JPanel(new GridLayout(0, 1))</code> หรือ BoxLayout (บทที่ 15)" },
    { level: 1, title: "หน้าต่างล็อกอิน (ยังไม่ทำงาน)", html: `<p>สร้างหน้าต่าง <code>Login</code> ที่มี JLabel “Username:”, JTextField กว้าง 12, JLabel “Password:”, <code>JPasswordField</code> กว้าง 12 และปุ่ม <code>Sign in</code> ปรับความกว้างหน้าต่างให้ช่องเรียงเป็น 2 แถวตามภาพ</p>`,
      spec: ["JPasswordField แสดงจุดแทนตัวอักษร", "ใช้ setSize ให้แคบพอที่ FlowLayout จะตัดขึ้นแถวใหม่ (ประมาณ 300 × 130)", "ยังไม่ต้องมี event"], gui: true, actions: "type field:0 mali\ntype field:1 secret",
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
                    JPanel card = new JPanel(new GridLayout(2, 1, 0, 6));
                    card.setBackground(new Color(32, 44, 40));
                    card.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
                    JLabel name = new JLabel("Mali Jaidee");
                    name.setFont(new Font("SansSerif", Font.BOLD, 20));
                    name.setForeground(Color.WHITE);
                    JLabel role = new JLabel("Junior Java Developer");
                    role.setForeground(new Color(180, 223, 57));
                    card.add(name);
                    card.add(role);
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
            public MessageWindow(String title, String message) {
                super(title);
                setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JPanel panel = new JPanel();
                panel.setBorder(BorderFactory.createEmptyBorder(10, 16, 10, 16));
                panel.add(new JLabel(message));
                add(panel);
                pack();
            }

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    MessageWindow a = new MessageWindow("Reminder", "Submit lab 14 before Friday");
                    a.setLocation(100, 100);
                    a.setVisible(true);
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
                    JPanel header = new JPanel();
                    header.setBackground(new Color(8, 125, 134));
                    JLabel appName = new JLabel("Study Tracker");
                    appName.setForeground(Color.WHITE);
                    appName.setFont(new Font("SansSerif", Font.BOLD, 16));
                    header.add(appName);

                    JPanel center = new JPanel();
                    center.setBorder(BorderFactory.createEmptyBorder(30, 10, 30, 10));
                    center.add(new JLabel("Welcome back!"));

                    JPanel footer = new JPanel();
                    footer.add(new JButton("Home"));
                    footer.add(new JButton("Reports"));
                    footer.add(new JButton("Settings"));

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
                String[] days = {"Mon", "Tue", "Wed", "Thu", "Sat"};
                String[] subjects = {"Programming", "Calculus", "Physics", "English", "Lab (make-up)"};
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Timetable");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel grid = new JPanel(new GridLayout(0, 2, 12, 4));
                    grid.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));
                    JLabel h1 = new JLabel("Day");
                    JLabel h2 = new JLabel("Subject");
                    Font bold = h1.getFont().deriveFont(Font.BOLD);
                    h1.setFont(bold);
                    h2.setFont(bold);
                    grid.add(h1);
                    grid.add(h2);
                    for (int i = 0; i < days.length; i++) {
                        JLabel d = new JLabel(days[i]);
                        JLabel s = new JLabel(subjects[i]);
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
                    JTextField display = new JTextField("0", 12);
                    display.setEditable(false);
                    display.setHorizontalAlignment(JTextField.RIGHT);
                    display.setFont(new Font("Monospaced", Font.BOLD, 20));

                    String[] keys = {"7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"};
                    JPanel pad = new JPanel(new GridLayout(4, 4, 4, 4));
                    for (String k : keys) {
                        JButton b = new JButton(k);
                        if (k.equals("=")) {
                            b.setBackground(new Color(180, 223, 57));
                        }
                        pad.add(b);
                    }
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
