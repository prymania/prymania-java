import { j, c, pre, jpre, fpre } from "../lib.mjs";

const BA = ["ก่อนคลิก", "หลังคลิก"];

export default {
  num: 16, file: "chapter-16.html",
  pageTitle: "บทที่ 16: เหตุการณ์และการตอบสนอง", shortName: "บทที่ 16",
  tocLabel: "บทที่ 16 · ทำให้ปุ่มทำงาน", sidebarBottom: "event → listener → อัปเดต UI",
  kicker: "บทที่ 16 · Event-driven programming", h1: "เหตุการณ์และการตอบสนอง",
  lead: "เชื่อมการกระทำของผู้ใช้ (คลิก พิมพ์ เลือก) เข้ากับโค้ดของเรา ผ่าน listener และ lambda แล้วอัปเดตหน้าจออย่างถูกต้องบน EDT",
  goals: ["อธิบาย event source, event object และ listener", "เขียน ActionListener ด้วย anonymous class และ lambda", "อ่านค่าจาก component แล้วแสดงผลลัพธ์", "เก็บ state ของโปรแกรมและอัปเดต UI บน EDT"],
  prev: { href: "chapter-15.html", label: "← บทที่ 15" },
  next: { href: "chapter-17.html", label: "บทที่ 17: ฟอร์ม →" },
  footer: "บทที่ 16 · โปรแกรม GUI ไม่ได้ทำงานจากบนลงล่าง แต่ตอบสนองต่อเหตุการณ์",
  introHeading: "16. จากหน้าจอนิ่ง สู่หน้าจอที่ตอบสนอง",
  introHtml: `<p>ในบทที่ 14–15 ปุ่มกดแล้วไม่มีอะไรเกิดขึ้น เพราะยังไม่ได้บอกโปรแกรมว่า “เมื่อคลิกแล้วให้ทำอะไร” บทนี้จะเรียน<strong>การเขียนโปรแกรมแบบขับเคลื่อนด้วยเหตุการณ์ (event-driven)</strong> ภาพผลลัพธ์ส่วนใหญ่มี 2 ภาพ คือก่อนและหลังการกระทำ ซึ่งได้จากการรันโปรแกรมจริงแล้วจำลองการพิมพ์/คลิก</p>
<div class="concept-box"><span class="box-title">3 ส่วนของระบบเหตุการณ์</span><ol class="step-list"><li><strong>Event source</strong> — component ที่เกิดเหตุการณ์ เช่น JButton</li><li><strong>Event object</strong> — ข้อมูลของเหตุการณ์ เช่น ActionEvent (ใครเป็นต้นเหตุ เมื่อไร)</li><li><strong>Listener</strong> — โค้ดของเราที่ “ลงทะเบียน” ไว้กับ source และถูกเรียกเมื่อเกิดเหตุการณ์</li></ol></div>`,
  topics: [
    {
      num: "16.1", toc: "Event source และ listener", title: "Event source และ listener",
      blocks: [
        { type: "p", html: `โปรแกรม GUI ไม่ได้ทำงานจากบนลงล่างจนจบ main แค่สร้างหน้าต่างแล้ว<strong>รอ</strong> เมื่อผู้ใช้คลิกหรือพิมพ์ จึงเกิด <strong>event</strong> และโค้ดที่เราลงทะเบียนไว้ (listener) จะถูกเรียก` },
        { type: "concept", title: "ลำดับเหตุการณ์เมื่อผู้ใช้คลิกปุ่ม", html: fpre(`
          ผู้ใช้คลิกปุ่ม
              │
              ▼
          ระบบปฏิบัติการ → JVM → EDT สร้าง ActionEvent
              │
              ▼
          JButton (source) เรียก listener ทุกตัวที่ลงทะเบียนไว้
              │
              ▼
          actionPerformed(ActionEvent e) { ...โค้ดของเรา... }   ← ทำงานบน EDT
              │
              ▼
          เราเปลี่ยนข้อความ label → Swing วาดหน้าจอใหม่`) },
        { type: "p", html: `ลงทะเบียนด้วย <code>button.addActionListener(e -&gt; { ... })</code> โค้ดในวงเล็บปีกกา<strong>ยังไม่ทำงานตอนนี้</strong> จะทำงานทุกครั้งที่ผู้ใช้คลิก` },
        { type: "run", title: "ปุ่มแรกที่ทำงาน: นับจำนวนคลิก", gui: true, actions: "shot\nclick Click me\nclick Click me\nclick Click me\nshot", captions: ["เริ่มต้น", "หลังคลิก 3 ครั้ง"],
          code: j`
            import javax.swing.*;

            public class ClickCounter {
                private static int count = 0;                     // field: ค่าคงอยู่ระหว่างการคลิก

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Counter");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel label = new JLabel("Clicks: 0");
                        JButton button = new JButton("Click me");
                        button.addActionListener(e -> {           // ลงทะเบียน: ทำเมื่อคลิก
                            count++;
                            label.setText("Clicks: " + count);    // อัปเดตหน้าจอ
                        });
                        JPanel panel = new JPanel();
                        panel.add(button);
                        panel.add(label);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);                   // main จบ หน้าต่างรอเหตุการณ์
                    });
                }
            }`,
          },
        { type: "warn", title: "ตัวนับต้องเป็น field", html: `lambda แก้ค่าตัวแปร local ไม่ได้ (คอมไพล์ไม่ผ่าน) และตัวแปร local หายไปเมื่อเมธอดจบ ค่าที่ต้องจำข้ามการคลิกจึงต้องเก็บใน field` },

        { type: "h", text: "หลายปุ่ม แก้ state ชุดเดียวกัน" },
        { type: "p", html: `แต่ละปุ่มมี listener ของตัวเอง ทุก listener แก้ค่า <code>value</code> แล้วเรียก <code>refresh()</code> ซึ่งเป็นจุดเดียวที่วาดหน้าจอจากค่าปัจจุบัน หน้าจอจึงตรงกับข้อมูลเสมอ` },
        { type: "run", title: "ปุ่ม + − Reset", gui: true, actions: "click +\nclick +\nclick +\nclick -\nshot\nclick Reset\nshot", captions: ["หลัง + สามครั้ง และ − หนึ่งครั้ง", "หลังกด Reset"],
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class StepperApp {
                private static int value = 0;                     // state ที่ทุกปุ่มใช้ร่วมกัน
                private static JLabel display;                    // field: refresh() เข้าถึงได้

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(StepperApp::createGui);
                }

                private static void createGui() {
                    JFrame frame = new JFrame("Stepper");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    display = new JLabel("0", SwingConstants.CENTER);
                    display.setFont(new Font("SansSerif", Font.BOLD, 28));
                    JButton minus = new JButton("-");
                    JButton plus = new JButton("+");
                    JButton reset = new JButton("Reset");
                    minus.addActionListener(e -> { value--; refresh(); });   // แก้ state แล้ววาดใหม่
                    plus.addActionListener(e -> { value++; refresh(); });
                    reset.addActionListener(e -> { value = 0; refresh(); });
                    JPanel buttons = new JPanel();
                    buttons.add(minus);
                    buttons.add(plus);
                    buttons.add(reset);
                    frame.add(display, BorderLayout.CENTER);
                    frame.add(buttons, BorderLayout.SOUTH);
                    frame.setSize(220, 140);
                    frame.setVisible(true);
                }

                private static void refresh() {                   // วาดหน้าจอจาก state
                    display.setText(String.valueOf(value));
                    display.setForeground(value < 0 ? Color.RED : Color.BLACK);   // ติดลบเป็นสีแดง
                }
            }`,
          },
        { type: "check", title: "เมื่อไรโค้ดทำงาน", html: jpre(`
          JButton b = new JButton("Go");
          b.addActionListener(e -> System.out.println("clicked"));
          System.out.println("listener added");`) + `<p>ข้อความใดถูกพิมพ์ก่อน และ “clicked” ถูกพิมพ์เมื่อไร</p>`, answer: `<p>“listener added” พิมพ์ทันที ส่วน “clicked” พิมพ์ <strong>ทุกครั้งที่ผู้ใช้คลิก</strong>ปุ่ม (อาจไม่พิมพ์เลยถ้าไม่มีใครคลิก)</p>` },
      ],
    },
    {
      num: "16.2", toc: "ActionListener", title: "ActionListener: สามวิธีเขียน",
      blocks: [
        { type: "p", html: `<code>ActionListener</code> เป็น interface ที่มีเมธอดเดียว <code>actionPerformed(ActionEvent e)</code> เขียนได้ 3 แบบ ผลเหมือนกัน แบบ lambda สั้นที่สุดและนิยมที่สุด` },
        { type: "concept", title: "เปรียบเทียบ 3 แบบ", html: jpre(`
          // (1) คลาสที่ implements ActionListener
          class GreetHandler implements ActionListener {
              public void actionPerformed(ActionEvent e) { label.setText("Hi"); }
          }
          button.addActionListener(new GreetHandler());

          // (2) anonymous class — สร้างคลาสไม่มีชื่อ ณ จุดที่ใช้
          button.addActionListener(new ActionListener() {
              @Override
              public void actionPerformed(ActionEvent e) { label.setText("Hi"); }
          });

          // (3) lambda — เขียนเฉพาะ parameter และ body
          button.addActionListener(e -> label.setText("Hi"));`) },

        { type: "h", text: "อ่านค่า → ประมวลผล → แสดงผล" },
        { type: "p", html: `รูปแบบพื้นฐานที่สุดของ GUI: เมื่อคลิก อ่านข้อความจากช่องด้วย <code>getText()</code> ประมวลผล แล้ว <code>setText()</code> ให้ label ตัวอย่างนี้เขียนแบบ anonymous class ให้เห็นเมธอด actionPerformed ชัด ๆ` },
        { type: "run", title: "ทักทายตามชื่อที่พิมพ์", gui: true, actions: "type field:0 JHope\nshot\nclick Greet\nshot", captions: BA,
          code: j`
            import javax.swing.*;
            import java.awt.event.ActionEvent;
            import java.awt.event.ActionListener;

            public class GreetApp {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Greeter");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField nameField = new JTextField(10);
                        JButton greet = new JButton("Greet");
                        JLabel result = new JLabel("Type your name");
                        greet.addActionListener(new ActionListener() {        // anonymous class
                            @Override
                            public void actionPerformed(ActionEvent e) {      // ถูกเรียกเมื่อคลิก
                                String name = nameField.getText().trim();     // อ่าน
                                result.setText("Hello, " + name + "!");       // แสดง
                            }
                        });
                        JPanel panel = new JPanel();
                        panel.add(nameField);
                        panel.add(greet);
                        panel.add(result);
                        frame.add(panel);
                        frame.setSize(380, 80);
                        frame.setVisible(true);
                    });
                }
            }`,
          },

        { type: "h", text: "แปลงข้อความเป็นตัวเลขก่อนคำนวณ" },
        { type: "p", html: `ค่าจาก JTextField เป็น String เสมอ ต้อง <code>Double.parseDouble</code> ก่อนคำนวณ (บทที่ 9) และจัดรูปแบบด้วย <code>String.format</code> ก่อนแสดง` },
        { type: "run", title: "แปลงอุณหภูมิ °C เป็น °F", gui: true, actions: "type field:0 37.5\nclick Convert\nshot", captions: ["หลังพิมพ์ 37.5 แล้วคลิก Convert"],
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class TempConverter {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("C to F");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField celsius = new JTextField(6);
                        JButton convert = new JButton("Convert");
                        JLabel output = new JLabel("? °F");
                        convert.addActionListener(e -> {
                            double c = Double.parseDouble(celsius.getText().trim());   // "37.5" → 37.5
                            double f = c * 9 / 5 + 32;                                 // 99.5
                            output.setText(String.format("%.1f °F", f));
                        });
                        JPanel p = new JPanel(new FlowLayout());
                        p.add(new JLabel("°C:"));
                        p.add(celsius);
                        p.add(convert);
                        p.add(output);
                        frame.add(p);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "warn", html: `ถ้าผู้ใช้พิมพ์ <code>abc</code> จะเกิด NumberFormatException บทที่ 17 จะตรวจข้อมูลก่อนแปลง` },

        { type: "h", text: "listener เดียว หลายปุ่ม" },
        { type: "p", html: `เก็บ listener ไว้ในตัวแปรแล้วลงทะเบียนกับหลายปุ่ม แยกว่าใครกดด้วย <code>e.getActionCommand()</code> (ข้อความบนปุ่ม) หรือ <code>e.getSource()</code> (ออบเจ็กต์ปุ่ม)` },
        { type: "run", title: "แบบทดสอบ 3 ตัวเลือก", gui: true, actions: "click B\nshot", captions: ["หลังคลิกปุ่ม B"],
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.awt.event.ActionListener;

            public class QuizButtons {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Quiz");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel question = new JLabel("Which keyword creates an object?  A) class  B) new  C) void");
                        JLabel feedback = new JLabel(" ");
                        ActionListener answer = e -> {                        // listener เดียว
                            String choice = e.getActionCommand();             // "A", "B" หรือ "C"
                            if (choice.equals("B")) {
                                feedback.setText("Correct! 'new' creates an object.");
                                feedback.setForeground(new Color(0, 128, 0));
                            } else {
                                feedback.setText(choice + " is wrong, try again.");
                                feedback.setForeground(Color.RED);
                            }
                            ((JButton) e.getSource()).setEnabled(false);      // ปิดปุ่มที่ถูกคลิก
                        };
                        JPanel buttons = new JPanel();
                        for (String opt : new String[]{"A", "B", "C"}) {
                            JButton b = new JButton(opt);
                            b.addActionListener(answer);                      // ทุกปุ่มใช้ตัวเดียวกัน
                            buttons.add(b);
                        }
                        JPanel root = new JPanel(new GridLayout(3, 1, 4, 4));
                        root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        root.add(question);
                        root.add(buttons);
                        root.add(feedback);
                        frame.setContentPane(root);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "check", title: "lambda", html: `<p>เขียน listener แบบ lambda สำหรับปุ่ม <code>clear</code> ที่ล้างช่อง <code>input</code> และเปลี่ยน label <code>status</code> เป็น “Cleared”</p>`, answer: jpre(`
          clear.addActionListener(e -> {
              input.setText("");
              status.setText("Cleared");
          });`) },
      ],
    },
    {
      num: "16.3", toc: "Lambda และ callback", title: "Lambda, callback และ event ชนิดอื่น",
      blocks: [
        { type: "p", html: `<strong>Lambda</strong> คือเมธอดสั้น ๆ ที่ไม่มีชื่อ ใช้กับ interface ที่มีเมธอด abstract เดียว (functional interface) เช่น ActionListener และ Runnable เขียนเป็น <code>(parameter) -&gt; นิพจน์</code> หรือ <code>(parameter) -&gt; { คำสั่ง; }</code>` },
        { type: "p", html: `โค้ดที่ส่งให้คนอื่น “เรียกกลับ” ภายหลังแบบนี้เรียกว่า <strong>callback</strong> การสร้าง lambda ไม่ได้ทำงานทันที ทำเมื่อถูกเรียกเท่านั้น` },
        { type: "table", head: ["Listener", "event", "เกิดเมื่อ"], rows: [
          ["<code>ActionListener</code>", "ActionEvent", "คลิกปุ่ม, กด Enter ใน JTextField, เลือก JComboBox, คลิก check/radio"],
          ["<code>ItemListener</code>", "ItemEvent", "check box / radio / combo เปลี่ยนสถานะ"],
          ["<code>ChangeListener</code>", "ChangeEvent", "JSlider, JSpinner เปลี่ยนค่า"],
          ["<code>DocumentListener</code>", "DocumentEvent", "ข้อความในช่องเปลี่ยนทุกตัวอักษร"],
          ["<code>MouseListener</code> / <code>KeyListener</code>", "MouseEvent / KeyEvent", "คลิก/เลื่อนเมาส์, กดแป้นพิมพ์"],
        ] },

        { type: "h", text: "Enter ในช่องกรอกทำงานเหมือนคลิกปุ่ม" },
        { type: "p", html: `JTextField ส่ง ActionEvent เมื่อกด Enter ลงทะเบียน listener ตัวเดียวกับทั้งปุ่มและช่องกรอก ผู้ใช้เลือกวิธีที่สะดวกได้ รายการแสดงด้วย <code>JList</code> ซึ่งวาดใหม่เองเมื่อ <code>DefaultListModel</code> เปลี่ยน` },
        { type: "run", title: "รายการด่วน", gui: true, actions: "type field:0 Buy milk\nclick Add\ntype field:0 Read chapter 16\nclick Add\ntype field:0 Submit lab\nclick Add\nshot", captions: ["หลังเพิ่ม 3 รายการ"],
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.awt.event.ActionListener;

            public class QuickList {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Quick list");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField input = new JTextField(14);
                        JButton add = new JButton("Add");
                        DefaultListModel<String> model = new DefaultListModel<>();   // ข้อมูลของ JList
                        JList<String> list = new JList<>(model);

                        ActionListener addItem = e -> {
                            String text = input.getText().trim();
                            if (!text.isEmpty()) {                                    // ไม่เพิ่มข้อความว่าง
                                model.addElement((model.size() + 1) + ". " + text);   // JList อัปเดตเอง
                                input.setText("");
                            }
                            input.requestFocusInWindow();                             // พิมพ์รายการถัดไปได้ทันที
                        };
                        add.addActionListener(addItem);                               // คลิกปุ่ม
                        input.addActionListener(addItem);                             // กด Enter

                        JPanel top = new JPanel(new BorderLayout(4, 0));
                        top.add(input, BorderLayout.CENTER);
                        top.add(add, BorderLayout.EAST);
                        JPanel root = new JPanel(new BorderLayout(0, 6));
                        root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        root.add(top, BorderLayout.NORTH);
                        root.add(new JScrollPane(list), BorderLayout.CENTER);
                        frame.setContentPane(root);
                        frame.setSize(280, 200);
                        frame.setVisible(true);
                    });
                }
            }`,
          },

        { type: "h", text: "ChangeListener: คำนวณใหม่ทันทีที่เลื่อน" },
        { type: "p", html: `ไม่ต้องมีปุ่มคำนวณ ใช้ <code>addChangeListener</code> กับ slider คำนวณใหม่ทุกครั้งที่ค่าเปลี่ยน งานคำนวณเก็บไว้ใน <code>Runnable</code> เพื่อเรียกซ้ำด้วย <code>run()</code>` },
        { type: "run", title: "คำนวณทิป", gui: true,
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class TipCalculator {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Tip");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        double bill = 840.0;
                        JSlider tip = new JSlider(0, 25, 10);                 // 0–25% เริ่มที่ 10
                        tip.setMajorTickSpacing(5);
                        tip.setPaintTicks(true);
                        tip.setPaintLabels(true);
                        JLabel result = new JLabel();
                        Runnable update = () -> {                             // งานที่เรียกซ้ำได้
                            int percent = tip.getValue();
                            double t = bill * percent / 100;
                            result.setText(String.format("Bill 840.00 + tip %d%% = %.2f baht", percent, bill + t));
                        };
                        tip.addChangeListener(e -> update.run());             // ทุกครั้งที่ค่าเปลี่ยน
                        tip.setValue(15);                                     // เปลี่ยนในโค้ดก็เรียก listener
                        JPanel root = new JPanel(new BorderLayout(0, 8));
                        root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        root.add(tip, BorderLayout.CENTER);
                        root.add(result, BorderLayout.SOUTH);
                        frame.setContentPane(root);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เลือกจาก combo box แล้วแสดงรายละเอียด", blocks: [
          { type: "p", html: `JComboBox ส่ง ActionEvent เมื่อเลือกรายการใหม่ ใช้ index ที่เลือกไปดึงข้อมูลจากอาเรย์คู่ขนาน และเรียก <code>setSelectedIndex(0)</code> ตอนเริ่มเพื่อให้ label มีข้อความตั้งแต่แรก` },
          { type: "run", title: "ข้อมูลรายวิชา", gui: true, actions: "select combo:0 2\nshot", captions: ["หลังเลือก Calculus"],
            code: j`
              import javax.swing.*;
              import java.awt.*;

              public class CourseInfo {
                  public static void main(String[] args) {
                      String[] names = {"Programming", "Physics", "Calculus", "English"};   // อาเรย์คู่ขนาน
                      int[] credits = {3, 4, 3, 2};
                      String[] rooms = {"Lab 2", "SC-101", "SC-204", "LA-310"};
                      SwingUtilities.invokeLater(() -> {
                          JFrame frame = new JFrame("Course info");
                          frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                          JComboBox<String> combo = new JComboBox<>(names);
                          JLabel detail = new JLabel();
                          combo.addActionListener(e -> {
                              int i = combo.getSelectedIndex();             // index เดียวใช้กับทุกอาเรย์
                              detail.setText(names[i] + ": " + credits[i] + " credits, room " + rooms[i]);
                          });
                          combo.setSelectedIndex(0);                        // กระตุ้น listener ตอนเริ่ม
                          JPanel root = new JPanel(new GridLayout(2, 1, 4, 4));
                          root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                          root.add(combo);
                          root.add(detail);
                          frame.setContentPane(root);
                          frame.setSize(300, 100);
                          frame.setVisible(true);
                      });
                  }
              }`,
            },
        ] },
        { type: "check", title: "callback", html: `<p><code>Runnable r = () -&gt; System.out.println("A");</code> แล้วบรรทัดต่อไปคือ <code>System.out.println("B"); r.run(); r.run();</code> ผลลัพธ์คืออะไร</p>`, answer: `<p><strong>B A A</strong> — การสร้าง lambda ไม่ได้ทำงานทันที ทำเมื่อเรียก run()</p>` },
      ],
    },
    {
      num: "16.4", toc: "อัปเดต UI บน EDT", title: "เก็บ state และอัปเดต UI บน EDT",
      blocks: [
        { type: "p", html: `listener ทุกตัวทำงานบน EDT จึงแก้ component ได้อย่างปลอดภัย แต่มีหลักสองข้อ` },
        { type: "table", head: ["หลัก", "เหตุผล"], rows: [
          ["<strong>แยก model ออกจาก UI</strong>: listener แก้ model แล้วเรียกเมธอดเดียวที่วาดหน้าจอจาก model", "กฎของข้อมูลอยู่ที่เดียว และทดสอบ model ได้โดยไม่ต้องมีหน้าจอ"],
          ["<strong>อย่าทำงานนาน</strong>ใน listener", "EDT ไม่ว่างวาดหน้าจอ โปรแกรมจะค้าง"],
        ] },
        { type: "run", title: "กระปุกออมสิน: model แยกจาก UI", gui: true, actions: "type field:0 500\nclick Deposit\ntype field:0 120\nclick Withdraw\ntype field:0 1000\nclick Withdraw\nshot", captions: ["ฝาก 500, ถอน 120, แล้วลองถอน 1000"],
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class PiggyBankApp {
                private final PiggyBank bank = new PiggyBank();           // model
                private final JTextField amountField = new JTextField(8); // component เป็น field
                private final JLabel balanceLabel = new JLabel();
                private final JLabel message = new JLabel(" ");

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new PiggyBankApp().show());
                }

                private void show() {
                    JFrame frame = new JFrame("Piggy Bank");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JButton deposit = new JButton("Deposit");
                    JButton withdraw = new JButton("Withdraw");
                    deposit.addActionListener(e -> act(true));            // ทั้งสองปุ่มเรียกเมธอดเดียว
                    withdraw.addActionListener(e -> act(false));
                    JPanel input = new JPanel();
                    input.add(new JLabel("Amount:"));
                    input.add(amountField);
                    input.add(deposit);
                    input.add(withdraw);
                    JPanel root = new JPanel(new GridLayout(3, 1));
                    root.setBorder(BorderFactory.createEmptyBorder(6, 10, 6, 10));
                    root.add(balanceLabel);
                    root.add(input);
                    root.add(message);
                    frame.setContentPane(root);
                    refresh();
                    frame.pack();
                    frame.setVisible(true);
                }

                private void act(boolean isDeposit) {
                    try {
                        double amount = Double.parseDouble(amountField.getText().trim());
                        if (isDeposit) bank.deposit(amount);              // model ตรวจกฎเอง
                        else bank.withdraw(amount);
                        message.setText((isDeposit ? "Deposited " : "Withdrew ") + amount);
                        message.setForeground(new Color(0, 110, 0));
                    } catch (NumberFormatException ex) {                  // พิมพ์ไม่ใช่ตัวเลข
                        message.setText("Please enter a number");
                        message.setForeground(Color.RED);
                    } catch (IllegalArgumentException ex) {               // model ปฏิเสธ
                        message.setText(ex.getMessage());
                        message.setForeground(Color.RED);
                    }
                    amountField.setText("");
                    refresh();
                }

                private void refresh() {                                  // วาดยอดจาก model เสมอ
                    balanceLabel.setText(String.format("Balance: %,.2f baht", bank.getBalance()));
                }
            }

            class PiggyBank {                                             // ไม่รู้จัก Swing เลย
                private double balance;

                double getBalance() { return balance; }

                void deposit(double amount) {
                    if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
                    balance += amount;
                }

                void withdraw(double amount) {
                    if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
                    if (amount > balance) throw new IllegalArgumentException("Not enough money (have " + balance + ")");
                    balance -= amount;
                }
            }`,
          },
        { type: "tip", html: `UI เป็นออบเจ็กต์ (ไม่ใช้ static) component จึงเป็น field ที่ทุกเมธอดเข้าถึงได้ ภาพแสดงการถอน 1000 ถูกปฏิเสธด้วยข้อความจากกฎของ PiggyBank` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: เกมทายตัวเลขแบบ GUI", blocks: [
          { type: "p", html: `รวมทุกอย่าง: state หลายตัว (คำตอบ จำนวนครั้ง) ประวัติใน JTextArea ปิดปุ่มเมื่อจบเกม และปุ่มเริ่มใหม่ คำตอบกำหนดเป็น 37 เพื่อให้ทดสอบได้ บทเสริม Random จะสุ่มแทน` },
          { type: "run", title: "Guess the Number", gui: true, actions: "type field:0 50\nclick Guess\ntype field:0 25\nclick Guess\ntype field:0 37\nclick Guess\nshot", captions: ["หลังทาย 50, 25, 37"],
            code: j`
              import javax.swing.*;
              import java.awt.*;

              public class GuessGui {
                  private int secret = 37;                                // state ของเกม
                  private int tries = 0;
                  private final JTextField input = new JTextField(5);
                  private final JButton guess = new JButton("Guess");
                  private final JTextArea history = new JTextArea(5, 22);
                  private final JLabel status = new JLabel("Guess a number 1-100");

                  public static void main(String[] args) {
                      SwingUtilities.invokeLater(() -> new GuessGui().show());
                  }

                  private void show() {
                      JFrame frame = new JFrame("Guess the Number");
                      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                      history.setEditable(false);
                      JButton restart = new JButton("New game");
                      guess.addActionListener(e -> onGuess());            // คลิกปุ่ม
                      input.addActionListener(e -> onGuess());            // หรือกด Enter
                      restart.addActionListener(e -> restart());
                      JPanel top = new JPanel();
                      top.add(input);
                      top.add(guess);
                      top.add(restart);
                      JPanel root = new JPanel(new BorderLayout(4, 4));
                      root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                      root.add(top, BorderLayout.NORTH);
                      root.add(new JScrollPane(history), BorderLayout.CENTER);
                      root.add(status, BorderLayout.SOUTH);
                      frame.setContentPane(root);
                      frame.pack();
                      frame.setVisible(true);
                  }

                  private void onGuess() {
                      int g;
                      try {
                          g = Integer.parseInt(input.getText().trim());
                      } catch (NumberFormatException ex) {
                          status.setText("Numbers only!");
                          return;                                         // ไม่นับครั้ง
                      }
                      tries++;
                      if (g == secret) {
                          history.append(g + " -> correct!\n");           // ต่อท้ายประวัติ
                          status.setText("You got it in " + tries + " tries");
                          guess.setEnabled(false);                        // จบเกม: ปิดการทายต่อ
                          input.setEnabled(false);
                      } else {
                          String hint = g > secret ? "too high" : "too low";
                          history.append(g + " -> " + hint + "\n");
                          status.setText("Try #" + (tries + 1));
                      }
                      input.setText("");
                  }

                  private void restart() {                                // ล้าง state และ UI
                      tries = 0;
                      history.setText("");
                      status.setText("Guess a number 1-100");
                      guess.setEnabled(true);
                      input.setEnabled(true);
                  }
              }`,
            },
        ] },
        { type: "warn", title: "อย่าใช้ Thread.sleep ใน listener", html: jpre(`
          button.addActionListener(e -> {
              label.setText("Working...");
              try { Thread.sleep(3000); } catch (InterruptedException ex) { }   // ❌ หน้าจอค้าง 3 วินาที
              label.setText("Done");                                          //    และไม่เคยเห็น "Working..."
          });`) + `<p>EDT ถูกบล็อกจึงไม่มีโอกาสวาดข้อความ “Working...” ให้เห็น งานที่ต้องรอหรือทำซ้ำตามเวลาให้ใช้ <code>javax.swing.Timer</code> หรือ <code>SwingWorker</code> (บทเสริม Timer และ Thread)</p>` },
      ],
    },
    {
      num: "16.5", toc: "เครื่องคำนวณ GPA", title: "ลงมือเขียน: เครื่องคำนวณเกรดเฉลี่ย (GPA) แบบ GUI",
      blocks: [
        { type: "p", html: `หัวข้อนี้สร้างโปรแกรม GUI ตั้งแต่ต้นจนจบด้วยขั้นตอนเดียวกับหัวข้อ 7.6 จุดสำคัญคือ<strong>เขียนและทดสอบส่วนคำนวณใน console ให้ถูกก่อน</strong> แล้วค่อยต่อหน้าจอ ตามหลัก “แยก model ออกจาก UI” ในหัวข้อ 16.4` },
        { type: "h", text: "โจทย์" },
        { type: "concept", title: "เครื่องคำนวณ GPA", html: `<ul><li>ผู้ใช้กรอก<strong>รหัสวิชา</strong> เลือก<strong>เกรด</strong> (A, B+, B, C+, C, D+, D, F) และ<strong>หน่วยกิต</strong> (1–4) แล้วกด Add (หรือกด Enter ในช่องรหัสวิชา)</li><li>รายวิชาทั้งหมดแสดงในรายการ เลือกรายการแล้วกด Remove เพื่อลบได้</li><li>ด้านล่างแสดงหน่วยกิตรวมและ GPA ทศนิยม 2 ตำแหน่ง อัปเดตทันทีทุกครั้งที่เพิ่มหรือลบ</li><li>ไม่กรอกรหัสวิชา หรือกด Remove โดยไม่ได้เลือก ให้แสดงข้อความเตือนสีแดง</li></ul>` },
        { type: "table", title: "ค่าคะแนนของเกรด", head: ["เกรด", "A", "B+", "B", "C+", "C", "D+", "D", "F"], rows: [["คะแนน", "4.0", "3.5", "3.0", "2.5", "2.0", "1.5", "1.0", "0.0"]] },
        { type: "p", html: `GPA = ผลรวมของ (คะแนนเกรด × หน่วยกิต) ÷ หน่วยกิตรวม เช่น CS101 A 3 หน่วยกิต, MA102 B+ 4 หน่วยกิต, EN103 C 2 หน่วยกิต:` },
        { type: "table", cls: "trace-table", head: ["วิชา", "เกรด", "หน่วยกิต", "คะแนน × หน่วยกิต"], rows: [
          ["CS101", "A (4.0)", "3", "12.0"], ["MA102", "B+ (3.5)", "4", "14.0"], ["EN103", "C (2.0)", "2", "4.0"], ["<strong>รวม</strong>", "", "<strong>9</strong>", "<strong>30.0</strong> → GPA = 30 ÷ 9 = <strong>3.33</strong>"],
        ] },

        { type: "h", text: "แนวคิดในการเขียนโปรแกรม" },
        { type: "p", html: `โปรแกรมแบ่งเป็นสองส่วนที่ไม่ปนกัน` },
        { type: "table", head: ["ส่วน", "ทำอะไร", "รู้จัก Swing ไหม"], rows: [
          ["model: <code>GpaBook</code> และ <code>CourseGrade</code>", "เก็บรายวิชา คิดหน่วยกิตรวมและ GPA", "ไม่รู้ ทดสอบใน console ได้"],
          ["UI: <code>GpaCalculator</code>", "สร้างหน้าจอ รับ event อ่านค่าจาก component แล้วสั่ง model", "รู้"],
        ] },
        { type: "example", title: "เมื่อผู้ใช้กด Add", html: fpre(`
          ผู้ใช้กด Add (หรือ Enter)
          อ่านรหัสวิชา เกรด หน่วยกิต จาก component
          ถ้า รหัสว่าง → แสดงคำเตือนสีแดง แล้วหยุด
          สั่ง model เพิ่มรายวิชา                       ← model: add
          ล้างช่องรหัสวิชา
          วาดหน้าจอใหม่จาก model                         ← UI: refresh
              ล้างรายการ แล้วเติมทุกวิชาจาก model
              แสดง หน่วยกิตรวม และ GPA                  ← model: totalCredits, gpa`, "รหัสเทียม") },

        { type: "h", text: "ควรมีคลาสและเมธอดอะไรบ้าง" },
        { type: "table", head: ["คลาส / เมธอด", "หน้าที่", "คืนอะไร"], rows: [
          ["<code>CourseGrade</code>", "ข้อมูลหนึ่งวิชา (รหัส เกรด หน่วยกิต) + <code>points()</code> คะแนนของเกรด", "–"],
          ["<code>GpaBook.add(code, grade, credits)</code>", "เพิ่มวิชา", "<code>void</code>"],
          ["<code>GpaBook.remove(index)</code>", "ลบวิชาตามตำแหน่ง", "<code>void</code>"],
          ["<code>GpaBook.totalCredits()</code>", "หน่วยกิตรวม", "<code>int</code>"],
          ["<code>GpaBook.gpa()</code>", "เกรดเฉลี่ย (0 ถ้ายังไม่มีวิชา)", "<code>double</code>"],
          ["<code>GpaCalculator.addCourse()</code>", "listener ของปุ่ม Add", "<code>void</code>"],
          ["<code>GpaCalculator.removeSelected()</code>", "listener ของปุ่ม Remove", "<code>void</code>"],
          ["<code>GpaCalculator.refresh()</code>", "วาดรายการและ GPA จาก model (จุดเดียวที่อัปเดตหน้าจอ)", "<code>void</code>"],
        ] },

        { type: "h", text: "ขั้นที่ 1: แปลงเกรดเป็นคะแนน" },
        { type: "p", html: `เริ่มจากส่วนเล็กที่สุดใน console ใช้ switch แบบลูกศรที่คืนค่า (หัวข้อ 5.4) ทดสอบเกรดทุกตัว` },
        { type: "run", title: "ทดสอบ pointsOf ทุกเกรด",
          code: j`
            public class GpaStep1 {
                public static void main(String[] args) {
                    String[] grades = {"A", "B+", "B", "C+", "C", "D+", "D", "F"};
                    for (String g : grades) {
                        System.out.print(g + "=" + pointsOf(g) + "  ");
                    }
                    System.out.println();
                }

                static double pointsOf(String grade) {
                    return switch (grade) {
                        case "A" -> 4.0;
                        case "B+" -> 3.5;
                        case "B" -> 3.0;
                        case "C+" -> 2.5;
                        case "C" -> 2.0;
                        case "D+" -> 1.5;
                        case "D" -> 1.0;
                        default -> 0.0;                               // F
                    };
                }
            }`,
          },

        { type: "h", text: "ขั้นที่ 2: model คิด GPA ใน console" },
        { type: "p", html: `สร้าง GpaBook ที่มี <code>ArrayList&lt;CourseGrade&gt;</code> (composition, บทที่ 12) แล้วทดสอบกับตัวอย่างในโจทย์ ผลต้องได้ 9 หน่วยกิต GPA 3.33 และหลังลบ EN103 ต้องได้ 26 ÷ 7 = 3.71` },
        { type: "run", title: "ทดสอบ GpaBook โดยไม่มีหน้าจอ",
          code: j`
            import java.util.ArrayList;

            public class GpaStep2 {
                public static void main(String[] args) {
                    GpaBook book = new GpaBook();
                    System.out.printf("empty: GPA %.2f%n", book.gpa());          // 0.00 ไม่หารด้วย 0
                    book.add("CS101", "A", 3);
                    book.add("MA102", "B+", 4);
                    book.add("EN103", "C", 2);
                    for (CourseGrade c : book.getCourses()) System.out.println(c);
                    System.out.printf("credits %d, GPA %.2f%n", book.totalCredits(), book.gpa());   // 9, 3.33
                    book.remove(2);                                               // ลบ EN103
                    System.out.printf("credits %d, GPA %.2f%n", book.totalCredits(), book.gpa());   // 7, 3.71
                }
            }

            class CourseGrade {
                private final String code;
                private final String grade;
                private final int credits;

                CourseGrade(String code, String grade, int credits) {
                    this.code = code;
                    this.grade = grade;
                    this.credits = credits;
                }

                int getCredits() { return credits; }

                double points() {
                    return switch (grade) {
                        case "A" -> 4.0;
                        case "B+" -> 3.5;
                        case "B" -> 3.0;
                        case "C+" -> 2.5;
                        case "C" -> 2.0;
                        case "D+" -> 1.5;
                        case "D" -> 1.0;
                        default -> 0.0;
                    };
                }

                @Override
                public String toString() {
                    return String.format("%-8s %-3s %d cr", code, grade, credits);
                }
            }

            class GpaBook {
                private final ArrayList<CourseGrade> courses = new ArrayList<>();

                void add(String code, String grade, int credits) { courses.add(new CourseGrade(code, grade, credits)); }
                void remove(int index) { courses.remove(index); }
                ArrayList<CourseGrade> getCourses() { return courses; }

                int totalCredits() {
                    int sum = 0;
                    for (CourseGrade c : courses) sum += c.getCredits();
                    return sum;
                }

                double gpa() {
                    int credits = totalCredits();
                    if (credits == 0) return 0.0;                                 // ยังไม่มีวิชา
                    double sum = 0;
                    for (CourseGrade c : courses) sum += c.points() * c.getCredits();
                    return sum / credits;
                }
            }`,
          },
        { type: "tip", html: `ถ้า GPA ผิด ปัญหาอยู่ใน model แน่นอน เพราะยังไม่มีหน้าจอเลย การแยกทดสอบแบบนี้ทำให้หาบั๊กง่ายกว่าตอนรวมกับ GUI มาก` },

        { type: "h", text: "ขั้นที่ 3: ต่อหน้าจอและ event" },
        { type: "p", html: `UI เป็นออบเจ็กต์ที่มี component เป็น field (เหมือน PiggyBankApp ในหัวข้อ 16.4) listener ทุกตัวสั้น: อ่านค่า → สั่ง model → <code>refresh()</code> ส่วน model ใช้คลาสเดิมจากขั้นที่ 2 โดยไม่แก้เลย ภาพจำลองการเพิ่ม 3 วิชาตามตัวอย่างในโจทย์ แล้วเลือก EN103 และกด Remove` },
        { type: "run", title: "เครื่องคำนวณ GPA ฉบับสมบูรณ์", gui: true,
          actions: "type field:0 CS101\nselect combo:0 0\nselect combo:1 2\nclick Add\ntype field:0 MA102\nselect combo:0 1\nselect combo:1 3\nclick Add\ntype field:0 EN103\nselect combo:0 4\nselect combo:1 1\nclick Add\nshot\nselect list:0 2\nclick Remove\nshot",
          captions: ["เพิ่ม CS101 A 3, MA102 B+ 4, EN103 C 2", "เลือก EN103 แล้วคลิก Remove"],
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.util.ArrayList;

            public class GpaCalculator {
                static final String[] GRADES = {"A", "B+", "B", "C+", "C", "D+", "D", "F"};
                private final GpaBook book = new GpaBook();                       // model
                private final JTextField codeField = new JTextField(7);
                private final JComboBox<String> gradeBox = new JComboBox<>(GRADES);
                private final JComboBox<Integer> creditBox = new JComboBox<>(new Integer[]{1, 2, 3, 4});
                private final DefaultListModel<String> listModel = new DefaultListModel<>();
                private final JList<String> courseList = new JList<>(listModel);
                private final JLabel gpaLabel = new JLabel();
                private final JLabel message = new JLabel(" ");

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new GpaCalculator().show());
                }

                private void show() {
                    JFrame frame = new JFrame("GPA Calculator");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JButton add = new JButton("Add");
                    JButton remove = new JButton("Remove");
                    add.addActionListener(e -> addCourse());
                    codeField.addActionListener(e -> addCourse());                 // Enter = Add
                    remove.addActionListener(e -> removeSelected());

                    JPanel top = new JPanel(new FlowLayout(FlowLayout.LEFT));
                    top.add(new JLabel("Course:"));
                    top.add(codeField);
                    top.add(gradeBox);
                    top.add(creditBox);
                    top.add(new JLabel("cr"));
                    top.add(add);

                    courseList.setFont(new Font("Monospaced", Font.PLAIN, 13));   // คอลัมน์ตรงกัน
                    gpaLabel.setFont(gpaLabel.getFont().deriveFont(Font.BOLD, 14f));
                    message.setForeground(Color.RED);
                    JPanel bottom = new JPanel(new BorderLayout(6, 4));
                    bottom.add(gpaLabel, BorderLayout.CENTER);
                    bottom.add(remove, BorderLayout.EAST);
                    bottom.add(message, BorderLayout.SOUTH);

                    JPanel root = new JPanel(new BorderLayout(6, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(top, BorderLayout.NORTH);
                    root.add(new JScrollPane(courseList), BorderLayout.CENTER);
                    root.add(bottom, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    refresh();
                    frame.setSize(420, 300);
                    frame.setVisible(true);
                }

                private void addCourse() {
                    String code = codeField.getText().trim();
                    if (code.isEmpty()) {
                        message.setText("Please enter a course code");
                        return;                                                   // ไม่แตะ model
                    }
                    book.add(code.toUpperCase(), (String) gradeBox.getSelectedItem(), (Integer) creditBox.getSelectedItem());
                    codeField.setText("");
                    codeField.requestFocusInWindow();
                    refresh();
                }

                private void removeSelected() {
                    int i = courseList.getSelectedIndex();                       // -1 = ไม่ได้เลือก
                    if (i < 0) {
                        message.setText("Select a course to remove");
                        return;
                    }
                    book.remove(i);                                               // ลำดับใน JList = ลำดับใน model
                    refresh();
                }

                private void refresh() {                                          // วาดใหม่จาก model ทั้งหมด
                    listModel.clear();
                    for (CourseGrade c : book.getCourses()) listModel.addElement(c.toString());
                    gpaLabel.setText(String.format("Credits: %d    GPA: %.2f", book.totalCredits(), book.gpa()));
                    message.setText(" ");
                }
            }

            class CourseGrade {
                private final String code;
                private final String grade;
                private final int credits;

                CourseGrade(String code, String grade, int credits) {
                    this.code = code;
                    this.grade = grade;
                    this.credits = credits;
                }

                int getCredits() { return credits; }

                double points() {
                    return switch (grade) {
                        case "A" -> 4.0;
                        case "B+" -> 3.5;
                        case "B" -> 3.0;
                        case "C+" -> 2.5;
                        case "C" -> 2.0;
                        case "D+" -> 1.5;
                        case "D" -> 1.0;
                        default -> 0.0;
                    };
                }

                @Override
                public String toString() {
                    return String.format("%-8s %-3s %d cr", code, grade, credits);
                }
            }

            class GpaBook {
                private final ArrayList<CourseGrade> courses = new ArrayList<>();

                void add(String code, String grade, int credits) { courses.add(new CourseGrade(code, grade, credits)); }
                void remove(int index) { courses.remove(index); }
                ArrayList<CourseGrade> getCourses() { return courses; }

                int totalCredits() {
                    int sum = 0;
                    for (CourseGrade c : courses) sum += c.getCredits();
                    return sum;
                }

                double gpa() {
                    int credits = totalCredits();
                    if (credits == 0) return 0.0;
                    double sum = 0;
                    for (CourseGrade c : courses) sum += c.points() * c.getCredits();
                    return sum / credits;
                }
            }`,
          },
        { type: "check", title: "ทำไมใช้ index เดียวกันได้", html: `<p>removeSelected ส่ง index ที่เลือกใน JList ไปลบใน model ตรง ๆ ทำไมถึงลบถูกวิชา</p>`, answer: `<p>เพราะ refresh() สร้างรายการใน JList ใหม่ทั้งหมดจาก model ตามลำดับเดียวกันทุกครั้ง ตำแหน่งที่ i ในหน้าจอจึงตรงกับตำแหน่งที่ i ใน model เสมอ ถ้าแก้ JList เองโดยไม่ผ่าน refresh ลำดับอาจไม่ตรงกัน</p>` },
        { type: "practice", level: 2, title: "ห้ามวิชาซ้ำ และแสดงเกียรตินิยม",
          html: `<p>ต่อยอดเครื่องคำนวณ GPA: (1) ถ้าเพิ่มรหัสวิชาที่มีอยู่แล้ว ให้แสดง <code>CS101 is already in the list</code> และไม่เพิ่ม (2) ใต้ GPA แสดงระดับเกียรตินิยมเมื่อหน่วยกิตรวมอย่างน้อย 6: GPA ≥ 3.60 <code>First-class honors</code>, GPA ≥ 3.25 <code>Second-class honors</code> นอกนั้นไม่แสดง (ภาพตัวอย่างจำลองการเพิ่ม CS101 A 3, MA102 B+ 4 แล้วเพิ่ม cs101 ซ้ำ)</p>`,
          spec: ["เพิ่มเมธอด <code>boolean contains(String code)</code> ใน GpaBook และให้ <code>add</code> คืน <code>boolean</code> (false เมื่อซ้ำ)", "เพิ่มเมธอด <code>static String honorOf(double gpa, int credits)</code> ใน GpaCalculator คืนข้อความหรือสตริงว่าง ห้ามแตะ component", "refresh() เป็นจุดเดียวที่แสดงข้อความเกียรตินิยม", "เทียบรหัสวิชาแบบไม่สนตัวพิมพ์ (โค้ดเดิมแปลงเป็นตัวพิมพ์ใหญ่ก่อนเพิ่มอยู่แล้ว)"],
          gui: true,
          actions: "type field:0 CS101\nselect combo:0 0\nselect combo:1 2\nclick Add\ntype field:0 MA102\nselect combo:0 1\nselect combo:1 3\nclick Add\ntype field:0 cs101\nclick Add\nshot",
          captions: ["เพิ่ม CS101 และ MA102 แล้วลองเพิ่ม cs101 ซ้ำ"],
          hint: "คำใบ้: ใน addCourse ให้เรียก book.add แล้วตรวจค่าที่คืน ถ้า false ให้ตั้งข้อความเตือนแล้ว return ก่อน refresh (เพราะ refresh ล้างข้อความเตือน)",
          solution: j`
            import javax.swing.*;
            import java.awt.*;
            import java.util.ArrayList;

            public class GpaHonors {
                static final String[] GRADES = {"A", "B+", "B", "C+", "C", "D+", "D", "F"};
                private final GpaBook book = new GpaBook();
                private final JTextField codeField = new JTextField(7);
                private final JComboBox<String> gradeBox = new JComboBox<>(GRADES);
                private final JComboBox<Integer> creditBox = new JComboBox<>(new Integer[]{1, 2, 3, 4});
                private final DefaultListModel<String> listModel = new DefaultListModel<>();
                private final JList<String> courseList = new JList<>(listModel);
                private final JLabel gpaLabel = new JLabel();
                private final JLabel honorLabel = new JLabel(" ");
                private final JLabel message = new JLabel(" ");

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new GpaHonors().show());
                }

                private void show() {
                    JFrame frame = new JFrame("GPA Calculator");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JButton add = new JButton("Add");
                    JButton remove = new JButton("Remove");
                    add.addActionListener(e -> addCourse());
                    codeField.addActionListener(e -> addCourse());
                    remove.addActionListener(e -> removeSelected());

                    JPanel top = new JPanel(new FlowLayout(FlowLayout.LEFT));
                    top.add(new JLabel("Course:"));
                    top.add(codeField);
                    top.add(gradeBox);
                    top.add(creditBox);
                    top.add(new JLabel("cr"));
                    top.add(add);

                    courseList.setFont(new Font("Monospaced", Font.PLAIN, 13));
                    gpaLabel.setFont(gpaLabel.getFont().deriveFont(Font.BOLD, 14f));
                    honorLabel.setForeground(new Color(0, 110, 0));
                    message.setForeground(Color.RED);
                    JPanel info = new JPanel(new GridLayout(3, 1));
                    info.add(gpaLabel);
                    info.add(honorLabel);
                    info.add(message);
                    JPanel bottom = new JPanel(new BorderLayout(6, 4));
                    bottom.add(info, BorderLayout.CENTER);
                    JPanel removeBox = new JPanel();                              // ปุ่มคงขนาดปกติ ไม่ยืดตามความสูง
                    removeBox.add(remove);
                    bottom.add(removeBox, BorderLayout.EAST);

                    JPanel root = new JPanel(new BorderLayout(6, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(top, BorderLayout.NORTH);
                    root.add(new JScrollPane(courseList), BorderLayout.CENTER);
                    root.add(bottom, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    refresh();
                    frame.setSize(420, 320);
                    frame.setVisible(true);
                }

                private void addCourse() {
                    String code = codeField.getText().trim().toUpperCase();
                    if (code.isEmpty()) {
                        message.setText("Please enter a course code");
                        return;
                    }
                    boolean added = book.add(code, (String) gradeBox.getSelectedItem(), (Integer) creditBox.getSelectedItem());
                    if (!added) {
                        message.setText(code + " is already in the list");
                        return;                                                   // ไม่ refresh จึงไม่ลบข้อความเตือน
                    }
                    codeField.setText("");
                    refresh();
                }

                private void removeSelected() {
                    int i = courseList.getSelectedIndex();
                    if (i < 0) {
                        message.setText("Select a course to remove");
                        return;
                    }
                    book.remove(i);
                    refresh();
                }

                static String honorOf(double gpa, int credits) {
                    if (credits < 6) return "";
                    if (gpa >= 3.60) return "First-class honors";
                    if (gpa >= 3.25) return "Second-class honors";
                    return "";
                }

                private void refresh() {
                    listModel.clear();
                    for (CourseGrade c : book.getCourses()) listModel.addElement(c.toString());
                    gpaLabel.setText(String.format("Credits: %d    GPA: %.2f", book.totalCredits(), book.gpa()));
                    String honor = honorOf(book.gpa(), book.totalCredits());
                    honorLabel.setText(honor.isEmpty() ? " " : honor);           // " " กันไม่ให้แถวยุบ
                    message.setText(" ");
                }
            }

            class CourseGrade {
                private final String code;
                private final String grade;
                private final int credits;

                CourseGrade(String code, String grade, int credits) {
                    this.code = code;
                    this.grade = grade;
                    this.credits = credits;
                }

                String getCode() { return code; }
                int getCredits() { return credits; }

                double points() {
                    return switch (grade) {
                        case "A" -> 4.0;
                        case "B+" -> 3.5;
                        case "B" -> 3.0;
                        case "C+" -> 2.5;
                        case "C" -> 2.0;
                        case "D+" -> 1.5;
                        case "D" -> 1.0;
                        default -> 0.0;
                    };
                }

                @Override
                public String toString() {
                    return String.format("%-8s %-3s %d cr", code, grade, credits);
                }
            }

            class GpaBook {
                private final ArrayList<CourseGrade> courses = new ArrayList<>();

                boolean contains(String code) {
                    for (CourseGrade c : courses) {
                        if (c.getCode().equalsIgnoreCase(code)) return true;
                    }
                    return false;
                }

                boolean add(String code, String grade, int credits) {
                    if (contains(code)) return false;                             // กฎ “ห้ามซ้ำ” อยู่ใน model
                    courses.add(new CourseGrade(code, grade, credits));
                    return true;
                }

                void remove(int index) { courses.remove(index); }
                ArrayList<CourseGrade> getCourses() { return courses; }

                int totalCredits() {
                    int sum = 0;
                    for (CourseGrade c : courses) sum += c.getCredits();
                    return sum;
                }

                double gpa() {
                    int credits = totalCredits();
                    if (credits == 0) return 0.0;
                    double sum = 0;
                    for (CourseGrade c : courses) sum += c.points() * c.getCredits();
                    return sum / credits;
                }
            }`,
          explain: "กฎห้ามวิชาซ้ำอยู่ใน model (GpaBook.add) ไม่ใช่ใน listener ถ้าวันหนึ่งมีวิธีเพิ่มวิชาทางอื่น กฎก็ยังทำงาน honorOf เป็น static ที่รับตัวเลขอย่างเดียว จึงทดสอบได้โดยไม่ต้องเปิดหน้าจอ CS101 A 3 + MA102 B+ 4 ได้ GPA 26 ÷ 7 = 3.71 จึงเป็น First-class honors" },
        { type: "try", html: `เพิ่มปุ่ม <code>Clear all</code> ที่ถามยืนยันด้วย showConfirmDialog (บทที่ 17) ก่อนล้างทุกวิชา ต้องเพิ่มเมธอดใดใน GpaBook บ้าง` },
      ],
    },
  ],
  exercisesIntro: "ทุกข้อเป็นโปรแกรม GUI ที่ตอบสนองต่อผู้ใช้ ภาพตัวอย่างได้จากการรันเฉลยแล้วจำลองการกระทำตามคำบรรยายใต้ภาพ ให้ทดลองกดปุ่มด้วยลำดับเดียวกันแล้วเทียบผล",
  exercises: [
    { level: 1, title: "ปุ่มเปลี่ยนข้อความ", html: `<p>สร้างหน้าต่างที่มี label “Hello” และปุ่ม 2 ปุ่ม: <code>English</code> เปลี่ยน label เป็น “Hello” และ <code>Thai</code> เปลี่ยนเป็น “สวัสดี”</p>`,
      spec: ["ใช้ lambda กับ addActionListener", "ภาพตัวอย่างแสดงหลังคลิก Thai"], gui: true, actions: "click Thai\nshot", captions: ["หลังคลิก Thai"],
      solution: j`
        import javax.swing.*;

        public class LanguageSwitch {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Language");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JLabel label = new JLabel("Hello");
                    JButton en = new JButton("English");
                    JButton th = new JButton("Thai");
                    // lambda บรรทัดเดียว
                    en.addActionListener(e -> label.setText("Hello"));
                    // เปลี่ยนข้อความบน label เดิม
                    th.addActionListener(e -> label.setText("สวัสดี"));
                    JPanel p = new JPanel();
                    p.add(label);
                    p.add(en);
                    p.add(th);
                    frame.add(p);
                    frame.setSize(260, 80);
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 1, title: "นับคลิกขึ้นและลง พร้อมรีเซ็ต", html: `<p>สร้างตัวนับที่มีปุ่ม <code>+1</code>, <code>+5</code>, <code>-1</code> และ <code>Reset</code> แสดงค่าปัจจุบันตัวใหญ่ตรงกลาง ค่าต้องไม่ต่ำกว่า 0 (ถ้ากด -1 ตอนเป็น 0 ให้คงเป็น 0)</p>`,
      spec: ["เก็บค่าใน field", "เขียนเมธอด refresh() อัปเดต label ที่เดียว", "ใช้ Math.max(0, value - 1)"], gui: true, actions: "click +5\nclick +5\nclick +1\nclick -1\nclick -1\nshot", captions: ["หลังกด +5, +5, +1, −1, −1"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class MultiCounter {
            // field static เพื่อให้ lambda แก้ค่าได้
            private static int value = 0;
            private static JLabel display;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Counter");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    display = new JLabel("0", SwingConstants.CENTER);
                    display.setFont(new Font("SansSerif", Font.BOLD, 32));
                    JPanel buttons = new JPanel();
                    // ส่ง "วิธีเปลี่ยนค่า" เป็น lambda
                    addButton(buttons, "+1", () -> value++);
                    addButton(buttons, "+5", () -> value += 5);
                    // ไม่ให้ติดลบ
                    addButton(buttons, "-1", () -> value = Math.max(0, value - 1));
                    addButton(buttons, "Reset", () -> value = 0);
                    frame.add(display, BorderLayout.CENTER);
                    frame.add(buttons, BorderLayout.SOUTH);
                    frame.setSize(300, 150);
                    frame.setVisible(true);
                });
            }

            // Runnable change = งานเฉพาะของแต่ละปุ่ม
            static void addButton(JPanel panel, String text, Runnable change) {
                JButton b = new JButton(text);
                b.addActionListener(e -> {
                    // ทำงานของปุ่มนี้
                    change.run();
                    // ส่วนที่ทุกปุ่มทำเหมือนกัน
                    display.setText(String.valueOf(value));
                });
                panel.add(b);
            }
        }`, explain: "เมธอด addButton รับ Runnable (lambda) ที่บอกว่าแต่ละปุ่มเปลี่ยน value อย่างไร ทำให้ไม่ต้องเขียน listener ซ้ำ 4 ครั้ง" },
    { level: 1, title: "เครื่องคิดเลขบวกสองจำนวน", html: `<p>สร้างหน้าต่างที่มีช่องกรอกตัวเลข 2 ช่อง ปุ่ม <code>=</code> และ label ผลลัพธ์ เมื่อคลิกให้แสดงผลบวก (รองรับทศนิยม) ในรูปแบบ <code>12.5 + 7 = 19.5</code></p>`,
      spec: ["ใช้ Double.parseDouble", "ข้อนี้ยังไม่ต้องตรวจข้อมูลผิดรูปแบบ (ทำในบทที่ 17)"], gui: true, actions: "type field:0 12.5\ntype field:1 7\nclick =\nshot", captions: ["หลังกรอก 12.5 และ 7 แล้วคลิก ="],
      solution: j`
        import javax.swing.*;

        public class AddTwo {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Add");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField a = new JTextField(5);
                    JTextField b = new JTextField(5);
                    JButton eq = new JButton("=");
                    JLabel result = new JLabel("?");
                    eq.addActionListener(e -> {
                        // อ่านค่าจากช่องกรอกตอนคลิก
                        double x = Double.parseDouble(a.getText().trim());
                        double y = Double.parseDouble(b.getText().trim());
                        // วงเล็บให้บวกเลขก่อนต่อข้อความ
                        result.setText(x + " + " + y + " = " + (x + y));
                    });
                    JPanel p = new JPanel();
                    p.add(a);
                    p.add(new JLabel("+"));
                    p.add(b);
                    p.add(eq);
                    p.add(result);
                    frame.add(p);
                    frame.setSize(380, 80);
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 2, title: "เครื่องคำนวณ BMI แบบ GUI", html: `<p>สร้างหน้าต่างรับน้ำหนัก (กก.) และส่วนสูง (ซม.) ปุ่ม <code>Calculate</code> แสดง BMI ทศนิยม 2 ตำแหน่งและกลุ่ม (Underweight &lt; 18.5, Normal &lt; 23, Overweight &lt; 25, Obese ≥ 25) โดยสีของข้อความผลลัพธ์เปลี่ยนตามกลุ่ม (น้ำเงิน, เขียว, ส้ม, แดง)</p>`,
      spec: ["แยกเมธอด static <code>category(double bmi)</code> คืน String", "ใช้ GridLayout จัดฟอร์ม", "กด Enter ในช่องส่วนสูงให้คำนวณได้ด้วย"], gui: true, actions: "type field:0 72\ntype field:1 170\nclick Calculate\nshot", captions: ["น้ำหนัก 72 ส่วนสูง 170"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.awt.event.ActionListener;

        public class BmiGui {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("BMI");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField weight = new JTextField(6);
                    JTextField height = new JTextField(6);
                    JButton calc = new JButton("Calculate");
                    JLabel result = new JLabel(" ");
                    // listener เดียว ใช้กับปุ่มและ Enter
                    ActionListener compute = e -> {
                        double w = Double.parseDouble(weight.getText().trim());
                        // แปลงเซนติเมตรเป็นเมตร
                        double h = Double.parseDouble(height.getText().trim()) / 100;
                        double bmi = w / (h * h);
                        // แยก logic ไปเป็นเมธอด
                        String cat = category(bmi);
                        result.setText(String.format("BMI %.2f - %s", bmi, cat));
                        // switch แบบนิพจน์ เลือกสีตามกลุ่ม
                        result.setForeground(switch (cat) {
                            case "Underweight" -> Color.BLUE;
                            case "Normal" -> new Color(0, 128, 0);
                            case "Overweight" -> new Color(230, 120, 0);
                            default -> Color.RED;
                        });
                    };
                    calc.addActionListener(compute);  // คลิกปุ่ม
                    // กด Enter ในช่องส่วนสูง
                    height.addActionListener(compute);
                    JPanel form = new JPanel(new GridLayout(0, 2, 6, 6));
                    form.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                    form.add(new JLabel("Weight (kg):"));
                    form.add(weight);
                    form.add(new JLabel("Height (cm):"));
                    form.add(height);
                    form.add(calc);
                    form.add(result);
                    frame.setContentPane(form);
                    frame.pack();
                    frame.setVisible(true);
                });
            }

            // คืนชื่อกลุ่มตามช่วง BMI
            static String category(double bmi) {
                if (bmi < 18.5) return "Underweight";
                if (bmi < 23) return "Normal";
                if (bmi < 25) return "Overweight";
                return "Obese";
            }
        }` },
    { level: 2, title: "สั่งเครื่องดื่มคำนวณราคาทันที", html: `<p>หน้าจอสั่งเครื่องดื่มที่มี combo box เมนู (Espresso 45, Latte 55, Mocha 60), radio ขนาด (S +0, M +10, L +20), check box “Extra shot +15” และ spinner จำนวน 1–10 ทุกครั้งที่ผู้ใช้เปลี่ยนตัวเลือกใด ๆ ให้คำนวณราคารวมใหม่<strong>ทันที</strong>โดยไม่ต้องกดปุ่ม</p>`,
      spec: ["เขียนเมธอด updatePrice() เพียงตัวเดียว", "ลงทะเบียน listener ที่เรียก updatePrice กับทุก component (ActionListener สำหรับ combo/radio/check, ChangeListener สำหรับ spinner)", "แสดงสูตรการคำนวณใน label เช่น <code>(55 + 20 + 15) x 2 = 180</code>"], gui: true, actions: "select combo:0 1\nclick L\ncheck Extra shot +15\nshot", captions: ["Latte ขนาด L เพิ่ม Extra shot"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class DrinkPricing {
            // เมนูและราคาเป็นอาเรย์คู่ขนาน
            static final String[] MENU = {"Espresso", "Latte", "Mocha"};
            static final int[] PRICE = {45, 55, 60};
            // component เป็น field ให้ทุกเมธอดใช้ได้
            static JComboBox<String> menu;
            static JRadioButton s, m, l;
            static JCheckBox extra;
            static JSpinner qty;
            static JLabel total;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(DrinkPricing::show);
            }

            static void show() {
                JFrame frame = new JFrame("Drink order");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                menu = new JComboBox<>(MENU);
                s = new JRadioButton("S", true);
                m = new JRadioButton("M");
                l = new JRadioButton("L");
                ButtonGroup g = new ButtonGroup();
                g.add(s); g.add(m); g.add(l);  // ขนาดเลือกได้ทีละหนึ่ง
                extra = new JCheckBox("Extra shot +15");
                qty = new JSpinner(new SpinnerNumberModel(1, 1, 10, 1));
                total = new JLabel();
                // ทุก component สั่งคำนวณราคาใหม่
                menu.addActionListener(e -> updatePrice());
                // AbstractButton = แม่ของ JRadioButton และ JCheckBox
                for (AbstractButton b : new AbstractButton[]{s, m, l, extra}) b.addActionListener(e -> updatePrice());
                // spinner ใช้ ChangeListener
                qty.addChangeListener(e -> updatePrice());

                JPanel row1 = new JPanel(new FlowLayout(FlowLayout.LEFT));
                row1.add(menu); row1.add(s); row1.add(m); row1.add(l);
                JPanel row2 = new JPanel(new FlowLayout(FlowLayout.LEFT));
                row2.add(extra); row2.add(new JLabel("Qty:")); row2.add(qty);
                JPanel root = new JPanel(new GridLayout(3, 1));
                root.add(row1); root.add(row2); root.add(total);
                root.setBorder(BorderFactory.createEmptyBorder(6, 8, 6, 8));
                updatePrice();  // คำนวณครั้งแรกตอนเปิด
                frame.setContentPane(root);
                frame.pack();
                frame.setVisible(true);
            }

            static void updatePrice() {
                // ราคาตามเมนูที่เลือก
                int base = PRICE[menu.getSelectedIndex()];
                // M +10, L +20
                int size = m.isSelected() ? 10 : l.isSelected() ? 20 : 0;
                int shot = extra.isSelected() ? 15 : 0;
                // getValue() คืน Object จึงต้อง cast
                int n = (int) qty.getValue();
                total.setText(String.format("(%d + %d + %d) x %d = %d baht", base, size, shot, n, (base + size + shot) * n));
            }
        }` },
    { level: 2, title: "รายการสิ่งที่ต้องทำ: เพิ่มและลบ", html: `<p>สร้างแอป To-do ที่มีช่องกรอก ปุ่ม <code>Add</code> (และกด Enter ได้), JList แสดงรายการ, ปุ่ม <code>Remove selected</code> ลบรายการที่เลือก และ label ด้านล่างแสดงจำนวนรายการ ปุ่ม Remove ต้องถูกปิดเมื่อไม่มีรายการใดถูกเลือก</p>`,
      spec: ["ใช้ DefaultListModel", "ฟังการเลือกด้วย <code>list.addListSelectionListener(e -&gt; ...)</code>", "เขียนเมธอด updateStatus() อัปเดต label และสถานะปุ่ม"], gui: true, actions: "type field:0 Read chapter 16\nclick Add\ntype field:0 Do exercises\nclick Add\ntype field:0 Submit lab\nclick Add\nselect list:0 1\nshot\nclick Remove selected\nshot", captions: ["เพิ่ม 3 รายการ แล้วเลือกรายการที่ 2", "หลังกด Remove selected"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.awt.event.ActionListener;

        public class TodoGui {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("To-do");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField input = new JTextField(14);
                    JButton add = new JButton("Add");
                    DefaultListModel<String> model = new DefaultListModel<>();
                    JList<String> list = new JList<>(model);
                    JButton remove = new JButton("Remove selected");
                    JLabel status = new JLabel();

                    // งานอัปเดตสถานะ ใช้ซ้ำหลายที่
                    Runnable updateStatus = () -> {
                        status.setText(model.size() + " task(s)");
                        // เลือกรายการแล้วจึงลบได้
                        remove.setEnabled(list.getSelectedIndex() >= 0);
                    };
                    ActionListener addTask = e -> {
                        String t = input.getText().trim();
                        // ไม่เพิ่มงานว่าง
                        if (!t.isEmpty()) model.addElement(t);
                        input.setText("");
                        updateStatus.run();
                    };
                    add.addActionListener(addTask);
                    input.addActionListener(addTask);
                    remove.addActionListener(e -> {
                        // -1 = ไม่ได้เลือก
                        int i = list.getSelectedIndex();
                        if (i >= 0) model.remove(i);
                        updateStatus.run();
                    });
                    // ทำงานเมื่อเลือกรายการใน JList
                    list.addListSelectionListener(e -> updateStatus.run());

                    JPanel top = new JPanel(new BorderLayout(4, 0));
                    top.add(input, BorderLayout.CENTER);
                    top.add(add, BorderLayout.EAST);
                    JPanel bottom = new JPanel(new BorderLayout());
                    bottom.add(status, BorderLayout.WEST);
                    bottom.add(remove, BorderLayout.EAST);
                    JPanel root = new JPanel(new BorderLayout(0, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(top, BorderLayout.NORTH);
                    root.add(new JScrollPane(list), BorderLayout.CENTER);
                    root.add(bottom, BorderLayout.SOUTH);
                    updateStatus.run();
                    frame.setContentPane(root);
                    frame.setSize(320, 240);
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 3, title: "เครื่องคิดเลขที่คำนวณได้จริง", html: `<p>ต่อยอดหน้าจอ Keypad ในบทที่ 14 ให้คำนวณได้: ปุ่มตัวเลขและจุดต่อท้ายตัวเลขในจอ, ปุ่ม + − × ÷ เก็บตัวเลขแรกและเครื่องหมาย, ปุ่ม = คำนวณแล้วแสดงผล, ปุ่ม C ล้างทั้งหมด การหารด้วย 0 ให้แสดง <code>Error</code></p>`,
      spec: ["state: <code>double first</code>, <code>String op</code>, <code>boolean startNew</code> (ตัวเลขถัดไปเริ่มใหม่หรือไม่)", "ใช้ listener ตัวเดียวสำหรับปุ่มตัวเลขทั้งหมด (getActionCommand)", "แสดงผลแบบตัด .0 ออกเมื่อเป็นจำนวนเต็ม", "ภาพตัวอย่าง: 12 × 3 = แล้วต่อด้วย − 6 ="], gui: true, actions: "click 1\nclick 2\nclick *\nclick 3\nclick =\nshot\nclick -\nclick 6\nclick =\nshot", captions: ["12 × 3 =", "ต่อด้วย − 6 ="],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.awt.event.ActionListener;

        public class WorkingCalculator {
            private double first = 0;  // ตัวเลขแรกที่จำไว้
            private String op = "";    // เครื่องหมายที่รอคำนวณ
            // true = ตัวเลขถัดไปเริ่มใหม่
            private boolean startNew = true;
            private final JTextField display = new JTextField("0", 12);

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new WorkingCalculator().show());
            }

            private void show() {
                JFrame frame = new JFrame("Calculator");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                display.setEditable(false);
                display.setHorizontalAlignment(JTextField.RIGHT);
                display.setFont(new Font("Monospaced", Font.BOLD, 20));
                ActionListener digit = e -> {  // ปุ่มตัวเลขและจุด
                    String d = e.getActionCommand();
                    if (startNew) {  // เริ่มตัวเลขใหม่แทนค่าเดิม
                        display.setText(d.equals(".") ? "0." : d);
                        startNew = false;
                    // ห้ามมีจุดทศนิยมซ้ำ
                    } else if (!(d.equals(".") && display.getText().contains("."))) {
                        display.setText(display.getText() + d);
                    }
                };
                ActionListener operator = e -> {  // ปุ่ม + - * /
                    // คำนวณค่าที่ค้างอยู่ก่อน
                    calculate();
                    op = e.getActionCommand();
                    startNew = true;
                };
                String[] keys = {"7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"};
                JPanel pad = new JPanel(new GridLayout(4, 4, 4, 4));
                for (String k : keys) {
                    JButton b = new JButton(k);
                    // ปุ่ม = คำนวณแล้วล้างเครื่องหมาย
                    if (k.equals("=")) b.addActionListener(e -> { calculate(); op = ""; startNew = true; });
                    // ตรวจว่าเป็นเครื่องหมายหรือไม่
                    else if ("/*-+".contains(k)) b.addActionListener(operator);
                    else b.addActionListener(digit);
                    pad.add(b);
                }
                JButton clear = new JButton("C");
                // C ล้างทุกอย่าง
                clear.addActionListener(e -> { first = 0; op = ""; startNew = true; display.setText("0"); });
                JPanel root = new JPanel(new BorderLayout(4, 4));
                root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                root.add(display, BorderLayout.NORTH);
                root.add(pad, BorderLayout.CENTER);
                root.add(clear, BorderLayout.SOUTH);
                frame.setContentPane(root);
                frame.pack();
                frame.setVisible(true);
            }

            private void calculate() {
                // อยู่ในสถานะ error ไม่คำนวณต่อ
                if (display.getText().equals("Error")) return;
                double current = Double.parseDouble(display.getText());
                // ยังไม่มีเครื่องหมาย → จำเป็นตัวเลขแรก
                if (op.isEmpty()) {
                    first = current;
                    return;
                }
                switch (op) {
                    case "+" -> first += current;
                    case "-" -> first -= current;
                    case "*" -> first *= current;
                    case "/" -> {
                        // หารด้วย 0 → แสดง Error
                        if (current == 0) { display.setText("Error"); op = ""; return; }
                        first /= current;
                    }
                }
                display.setText(format(first));
            }

            private static String format(double v) {
                // ไม่มีทศนิยมแสดงเป็นจำนวนเต็ม
                return v == Math.rint(v) ? String.valueOf((long) v) : String.valueOf(v);
            }
        }` },
    { level: 3, title: "แบบทดสอบหลายข้อแบบ GUI", html: `<p>สร้างคลาส <code>Question</code> (โจทย์, ตัวเลือก 4 ข้อ, index คำตอบที่ถูก) และหน้าจอแบบทดสอบที่แสดงทีละข้อ ตัวเลือกเป็น radio button ปุ่ม <code>Submit</code> ตรวจคำตอบแล้วแสดงถูก/ผิด, ปุ่ม <code>Next</code> ไปข้อถัดไป (ใช้ได้หลังส่งคำตอบแล้วเท่านั้น) เมื่อจบให้แสดงคะแนนรวม มีอย่างน้อย 3 ข้อ</p>`,
      spec: ["เก็บคำถามใน <code>ArrayList&lt;Question&gt;</code>", "state: index ข้อปัจจุบัน, คะแนน, ส่งคำตอบข้อนี้แล้วหรือยัง", "เขียนเมธอด showQuestion() อัปเดตโจทย์และข้อความบน radio ทั้ง 4", "เคลียร์การเลือกด้วย <code>group.clearSelection()</code>"], gui: true, actions: "click new\nclick Submit\nshot\nclick Next\nclick String\nclick Submit\nclick Next\nclick length\nclick Submit\nshot", captions: ["ข้อ 1 ตอบ new แล้ว Submit", "หลังตอบครบ 3 ข้อ (ข้อ 3 ตอบผิด)"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.ArrayList;

        public class QuizGui {
            // รายการคำถาม
            private final ArrayList<Question> questions = new ArrayList<>();
            // ข้อที่กำลังทำ และคะแนน
            private int index = 0, score = 0;
            private boolean answered = false;
            private final JLabel prompt = new JLabel();
            // ตัวเลือก 4 ข้อ
            private final JRadioButton[] options = new JRadioButton[4];
            // เลือกได้ทีละข้อ
            private final ButtonGroup group = new ButtonGroup();
            private final JLabel feedback = new JLabel(" ");
            private final JButton submit = new JButton("Submit");
            private final JButton next = new JButton("Next");

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new QuizGui().show());
            }

            private void show() {
                // คำถาม, ตัวเลือก, index คำตอบที่ถูก
                questions.add(new Question("Which keyword creates an object?", new String[]{"class", "new", "void", "static"}, 1));
                questions.add(new Question("Which type stores text?", new String[]{"char", "int", "String", "boolean"}, 2));
                questions.add(new Question("First index of an array?", new String[]{"1", "-1", "length", "0"}, 3));

                JFrame frame = new JFrame("Java Quiz");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JPanel optionPanel = new JPanel(new GridLayout(4, 1));
                // สร้าง radio button 4 ตัว
                for (int i = 0; i < 4; i++) {
                    options[i] = new JRadioButton();
                    group.add(options[i]);
                    optionPanel.add(options[i]);
                }
                submit.addActionListener(e -> onSubmit());
                // ไปข้อถัดไป
                next.addActionListener(e -> { index++; showQuestion(); });
                JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT));
                buttons.add(submit);
                buttons.add(next);
                JPanel south = new JPanel(new BorderLayout());
                south.add(feedback, BorderLayout.WEST);
                south.add(buttons, BorderLayout.EAST);
                JPanel root = new JPanel(new BorderLayout(6, 6));
                root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                root.add(prompt, BorderLayout.NORTH);
                root.add(optionPanel, BorderLayout.CENTER);
                root.add(south, BorderLayout.SOUTH);
                frame.setContentPane(root);
                showQuestion();  // แสดงข้อแรก
                frame.setSize(420, 230);
                frame.setVisible(true);
            }

            private void showQuestion() {
                Question q = questions.get(index);  // คำถามข้อปัจจุบัน
                prompt.setText("Q" + (index + 1) + "/" + questions.size() + ": " + q.text);
                // ใส่ข้อความตัวเลือกของข้อนี้
                for (int i = 0; i < 4; i++) options[i].setText(q.choices[i]);
                // ล้างตัวเลือกที่เลือกไว้
                group.clearSelection();
                answered = false;
                feedback.setText(" ");
                submit.setEnabled(true);
                next.setEnabled(false);
            }

            private void onSubmit() {
                int chosen = -1;
                // หาตัวเลือกที่ถูกเลือก
                for (int i = 0; i < 4; i++) if (options[i].isSelected()) chosen = i;
                // ยังไม่ได้เลือก
                if (chosen == -1) {
                    feedback.setText("Choose an answer first");
                    return;
                }
                Question q = questions.get(index);
                if (chosen == q.answer) {  // เทียบกับ index คำตอบ
                    score++;
                    feedback.setText("Correct!");
                    feedback.setForeground(new Color(0, 128, 0));
                } else {
                    feedback.setText("Wrong - answer: " + q.choices[q.answer]);
                    feedback.setForeground(Color.RED);
                }
                answered = true;
                // ตอบแล้วส่งซ้ำไม่ได้
                submit.setEnabled(false);
                // ยังไม่ใช่ข้อสุดท้าย
                if (index < questions.size() - 1) {
                    next.setEnabled(true);
                } else {
                    // ข้อสุดท้าย → แสดงคะแนนรวม
                    feedback.setText(feedback.getText() + "   Final score: " + score + "/" + questions.size());
                }
            }
        }

        class Question {  // เก็บข้อมูลคำถามหนึ่งข้อ
            final String text;
            final String[] choices;
            final int answer;

            Question(String text, String[] choices, int answer) {
                this.text = text;
                this.choices = choices;
                this.answer = answer;
            }
        }` },
  ],
};
