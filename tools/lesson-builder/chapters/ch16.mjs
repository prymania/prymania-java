import { j, c, pre } from "../lib.mjs";

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
        { type: "concept", title: "ลำดับเหตุการณ์เมื่อผู้ใช้คลิกปุ่ม", html: pre(`
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
        { type: "run", title: "ปุ่มแรกที่ทำงาน: นับจำนวนคลิก", level: "พื้นฐาน", gui: true, actions: "shot\nclick Click me\nclick Click me\nclick Click me\nshot", captions: ["เริ่มต้น", "หลังคลิก 3 ครั้ง"],
          concept: "เรียก <code>addActionListener</code> กับปุ่ม และส่งโค้ดที่ต้องทำเมื่อคลิก (ในรูป lambda) — ตัวนับเก็บใน field เพราะต้องจำค่าข้ามการคลิก",
          code: j`
            import javax.swing.*;

            public class ClickCounter {
                private static int count = 0;

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Counter");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel label = new JLabel("Clicks: 0");
                        JButton button = new JButton("Click me");
                        button.addActionListener(e -> {
                            count++;
                            label.setText("Clicks: " + count);
                        });
                        JPanel panel = new JPanel();
                        panel.add(button);
                        panel.add(label);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["<code>addActionListener(e -&gt; { ... })</code> ลงทะเบียนโค้ดไว้กับปุ่ม — <em>ยังไม่ทำงานตอนนี้</em>", "main จบ หน้าต่างรอเหตุการณ์", "ทุกครั้งที่คลิก โค้ดใน lambda ทำงาน: เพิ่ม count แล้วเปลี่ยนข้อความ label", "count ต้องเป็น field (ไม่ใช่ตัวแปร local) เพราะ lambda แก้ตัวแปร local ไม่ได้ และค่าต้องคงอยู่ระหว่างการคลิก"] },
        { type: "run", title: "หลายปุ่ม หลาย listener", level: "ต่อยอด", gui: true, actions: "click +\nclick +\nclick +\nclick -\nshot\nclick Reset\nshot", captions: ["หลัง + สามครั้ง และ − หนึ่งครั้ง", "หลังกด Reset"],
          concept: "แต่ละปุ่มมี listener ของตัวเอง ทุก listener แก้ state ชุดเดียวกัน (value) แล้วเรียกเมธอดอัปเดตหน้าจอ",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class StepperApp {
                private static int value = 0;
                private static JLabel display;

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
                    minus.addActionListener(e -> { value--; refresh(); });
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

                private static void refresh() {
                    display.setText(String.valueOf(value));
                    display.setForeground(value < 0 ? Color.RED : Color.BLACK);
                }
            }`,
          steps: ["state ของโปรแกรมคือ value ตัวเดียว", "ทุก listener เปลี่ยน state แล้วเรียก refresh()", "refresh() เป็นจุดเดียวที่อัปเดต UI จาก state — ทำให้หน้าจอตรงกับข้อมูลเสมอ", "ค่าลบแสดงเป็นสีแดง"] },
        { type: "check", title: "เมื่อไรโค้ดทำงาน", html: pre(`
          JButton b = new JButton("Go");
          b.addActionListener(e -> System.out.println("clicked"));
          System.out.println("listener added");`) + `<p>ข้อความใดถูกพิมพ์ก่อน และ “clicked” ถูกพิมพ์เมื่อไร</p>`, answer: `<p>“listener added” พิมพ์ทันที ส่วน “clicked” พิมพ์ <strong>ทุกครั้งที่ผู้ใช้คลิก</strong>ปุ่ม (อาจไม่พิมพ์เลยถ้าไม่มีใครคลิก)</p>` },
      ],
    },
    {
      num: "16.2", toc: "ActionListener", title: "ActionListener: สามวิธีเขียน",
      blocks: [
        { type: "p", html: `<code>ActionListener</code> เป็น interface ที่มีเมธอดเดียว <code>actionPerformed(ActionEvent e)</code> เขียนได้ 3 แบบ ผลลัพธ์เหมือนกัน: (1) คลาสแยกที่ implements, (2) anonymous class, (3) lambda (สั้นที่สุด นิยมที่สุด)` },
        { type: "concept", title: "เปรียบเทียบ 3 แบบ", html: pre(`
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
        { type: "run", title: "อ่านค่าจากช่องกรอกแล้วแสดงผล", level: "พื้นฐาน", gui: true, actions: "type field:0 Mali\nshot\nclick Greet\nshot", captions: BA,
          concept: "รูปแบบพื้นฐานที่สุดของ GUI: เมื่อคลิก → <code>getText()</code> จากช่อง → ประมวลผล → <code>setText()</code> ให้ label",
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
                        greet.addActionListener(new ActionListener() {
                            @Override
                            public void actionPerformed(ActionEvent e) {
                                String name = nameField.getText().trim();
                                result.setText("Hello, " + name + "!");
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
          steps: ["ตัวอย่างนี้เขียนแบบ anonymous class เพื่อให้เห็นเมธอด actionPerformed ชัด ๆ", "getText() คืน String ที่ผู้ใช้พิมพ์", "trim() ตัดช่องว่างหัวท้าย", "setText เปลี่ยนข้อความ label ทันที"] },
        { type: "run", title: "แปลงอุณหภูมิ: parse ตัวเลขจากช่องกรอก", level: "ต่อยอด", gui: true, actions: "type field:0 37.5\nclick Convert\nshot", captions: ["หลังพิมพ์ 37.5 แล้วคลิก Convert"],
          concept: "ค่าจาก JTextField เป็น String เสมอ ต้อง <code>Double.parseDouble</code> ก่อนคำนวณ (บทที่ 9) แล้ว <code>String.format</code> ก่อนแสดง",
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
                            double c = Double.parseDouble(celsius.getText().trim());
                            double f = c * 9 / 5 + 32;
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
          steps: ["parseDouble(\"37.5\") → 37.5", "คำนวณ 99.5", "แสดงด้วย String.format ทศนิยม 1 ตำแหน่ง", "ถ้าผู้ใช้พิมพ์ \"abc\" จะเกิด NumberFormatException — บทที่ 17 จะตรวจข้อมูลก่อน"] },
        { type: "run", title: "listener เดียวหลายปุ่ม: getSource / getActionCommand", level: "ประยุกต์", gui: true, actions: "click B\nshot", captions: ["หลังคลิกปุ่ม B"],
          concept: "ปุ่มหลายปุ่มใช้ listener ตัวเดียวได้ แล้วแยกว่าใครกดด้วย <code>e.getActionCommand()</code> (ข้อความบนปุ่ม) หรือ <code>e.getSource()</code> (ออบเจ็กต์ปุ่ม)",
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
                        ActionListener answer = e -> {
                            String choice = e.getActionCommand();
                            if (choice.equals("B")) {
                                feedback.setText("Correct! 'new' creates an object.");
                                feedback.setForeground(new Color(0, 128, 0));
                            } else {
                                feedback.setText(choice + " is wrong, try again.");
                                feedback.setForeground(Color.RED);
                            }
                            ((JButton) e.getSource()).setEnabled(false);
                        };
                        JPanel buttons = new JPanel();
                        for (String opt : new String[]{"A", "B", "C"}) {
                            JButton b = new JButton(opt);
                            b.addActionListener(answer);
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
          steps: ["listener ชื่อ answer เก็บในตัวแปรชนิด ActionListener แล้วใช้กับทั้ง 3 ปุ่ม", "getActionCommand() คืนข้อความของปุ่มที่ถูกกด", "getSource() คืนออบเจ็กต์ที่เป็นต้นเหตุ — cast เป็น JButton แล้วปิดปุ่มนั้น", "ภาพแสดงหลังคลิก B: ปุ่ม B ถูกปิด ข้อความสีเขียว"] },
        { type: "check", title: "lambda", html: `<p>เขียน listener แบบ lambda สำหรับปุ่ม <code>clear</code> ที่ล้างช่อง <code>input</code> และเปลี่ยน label <code>status</code> เป็น “Cleared”</p>`, answer: pre(`
          clear.addActionListener(e -> {
              input.setText("");
              status.setText("Cleared");
          });`) },
      ],
    },
    {
      num: "16.3", toc: "Lambda และ callback", title: "Lambda, callback และ event ชนิดอื่น",
      blocks: [
        { type: "p", html: `<strong>Lambda</strong> คือการเขียนเมธอดสั้น ๆ ที่ไม่มีชื่อ ใช้ได้กับ interface ที่มีเมธอด abstract เดียว (functional interface) เช่น ActionListener, Runnable รูปแบบ <code>(parameter) -&gt; นิพจน์</code> หรือ <code>(parameter) -&gt; { คำสั่ง; }</code> โค้ดที่ส่งไปให้คนอื่น “เรียกกลับ” ภายหลังแบบนี้เรียกว่า <strong>callback</strong>` },
        { type: "table", head: ["Listener", "event", "เกิดเมื่อ"], rows: [
          ["<code>ActionListener</code>", "ActionEvent", "คลิกปุ่ม, กด Enter ใน JTextField, เลือก JComboBox, คลิก check/radio"],
          ["<code>ItemListener</code>", "ItemEvent", "check box / radio / combo เปลี่ยนสถานะ"],
          ["<code>ChangeListener</code>", "ChangeEvent", "JSlider, JSpinner เปลี่ยนค่า"],
          ["<code>DocumentListener</code>", "DocumentEvent", "ข้อความในช่องเปลี่ยนทุกตัวอักษร"],
          ["<code>MouseListener</code> / <code>KeyListener</code>", "MouseEvent / KeyEvent", "คลิก/เลื่อนเมาส์, กดแป้นพิมพ์"],
        ] },
        { type: "run", title: "Enter ในช่องกรอก = คลิกปุ่ม", level: "ต่อยอด", gui: true, actions: "type field:0 Buy milk\nclick Add\ntype field:0 Read chapter 16\nclick Add\ntype field:0 Submit lab\nclick Add\nshot", captions: ["หลังเพิ่ม 3 รายการ"],
          concept: "listener เดียวกันลงทะเบียนกับทั้งปุ่มและช่องกรอก (JTextField ส่ง ActionEvent เมื่อกด Enter) — ผู้ใช้เลือกวิธีที่สะดวก",
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
                        DefaultListModel<String> model = new DefaultListModel<>();
                        JList<String> list = new JList<>(model);

                        ActionListener addItem = e -> {
                            String text = input.getText().trim();
                            if (!text.isEmpty()) {
                                model.addElement((model.size() + 1) + ". " + text);
                                input.setText("");
                            }
                            input.requestFocusInWindow();
                        };
                        add.addActionListener(addItem);
                        input.addActionListener(addItem);

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
          steps: ["DefaultListModel คือข้อมูลของ JList — addElement แล้ว JList วาดใหม่เอง", "ไม่เพิ่มข้อความว่าง", "ล้างช่องและคืนโฟกัสให้พิมพ์รายการถัดไปได้ทันที"] },
        { type: "run", title: "ChangeListener: slider อัปเดตทันทีที่เลื่อน", level: "ประยุกต์", gui: true,
          concept: "ไม่ต้องมีปุ่ม — คำนวณใหม่ทุกครั้งที่ค่า slider เปลี่ยน ใช้ <code>addChangeListener</code>",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class TipCalculator {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Tip");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        double bill = 840.0;
                        JSlider tip = new JSlider(0, 25, 10);
                        tip.setMajorTickSpacing(5);
                        tip.setPaintTicks(true);
                        tip.setPaintLabels(true);
                        JLabel result = new JLabel();
                        Runnable update = () -> {
                            int percent = tip.getValue();
                            double t = bill * percent / 100;
                            result.setText(String.format("Bill 840.00 + tip %d%% = %.2f baht", percent, bill + t));
                        };
                        tip.addChangeListener(e -> update.run());
                        tip.setValue(15);
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
          steps: ["<code>Runnable update</code> เก็บ lambda ไว้เรียกซ้ำ", "ทุกครั้งที่ slider เปลี่ยนค่า listener เรียก update", "<code>tip.setValue(15)</code> ในโค้ดก็กระตุ้น listener เช่นกัน label จึงมีข้อความตั้งแต่แรก"] },
        { type: "run", title: "เลือกจาก combo box แล้วเปลี่ยนรายละเอียด", level: "ประยุกต์", gui: true, actions: "select combo:0 2\nshot", captions: ["หลังเลือก Calculus"],
          concept: "JComboBox ส่ง ActionEvent เมื่อผู้ใช้เลือกรายการใหม่ ใช้ index ที่เลือกไปดึงข้อมูลจากอาเรย์คู่ขนาน",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class CourseInfo {
                public static void main(String[] args) {
                    String[] names = {"Programming", "Physics", "Calculus", "English"};
                    int[] credits = {3, 4, 3, 2};
                    String[] rooms = {"Lab 2", "SC-101", "SC-204", "LA-310"};
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Course info");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JComboBox<String> combo = new JComboBox<>(names);
                        JLabel detail = new JLabel();
                        combo.addActionListener(e -> {
                            int i = combo.getSelectedIndex();
                            detail.setText(names[i] + ": " + credits[i] + " credits, room " + rooms[i]);
                        });
                        combo.setSelectedIndex(0);
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
          steps: ["getSelectedIndex() ให้ index ที่ตรงกับอาเรย์คู่ขนาน", "setSelectedIndex(0) ตอนเริ่มเพื่อให้ label มีข้อความแรก", "ภาพจำลองการเลือก index 2"] },
        { type: "check", title: "callback", html: `<p><code>Runnable r = () -&gt; System.out.println("A");</code> แล้วบรรทัดต่อไปคือ <code>System.out.println("B"); r.run(); r.run();</code> ผลลัพธ์คืออะไร</p>`, answer: `<p><strong>B A A</strong> — การสร้าง lambda ไม่ได้ทำงานทันที ทำเมื่อเรียก run()</p>` },
      ],
    },
    {
      num: "16.4", toc: "อัปเดต UI บน EDT", title: "เก็บ state และอัปเดต UI บน EDT",
      blocks: [
        { type: "p", html: `listener ทุกตัวทำงานบน EDT จึงแก้ component ได้อย่างปลอดภัย แต่ต้องระวัง 2 เรื่อง: (1) <strong>อย่าทำงานนาน</strong>ใน listener เพราะหน้าจอจะค้าง (2) ถ้าโปรแกรมมีข้อมูลซับซ้อน ให้<strong>แยก state (model) ออกจาก UI</strong> — listener แก้ model แล้วเรียกเมธอดเดียวที่วาดหน้าจอจาก model` },
        { type: "run", title: "แยก model ออกจาก UI: กระปุกออมสิน", level: "ประยุกต์", gui: true, actions: "type field:0 500\nclick Deposit\ntype field:0 120\nclick Withdraw\ntype field:0 1000\nclick Withdraw\nshot", captions: ["ฝาก 500, ถอน 120, แล้วลองถอน 1000"],
          concept: "คลาส <code>PiggyBank</code> (model) มีกฎของตัวเองจากบทที่ 12 ส่วน UI ทำหน้าที่รับคำสั่งและแสดงผล — model ทดสอบได้โดยไม่ต้องมีหน้าจอ",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class PiggyBankApp {
                private final PiggyBank bank = new PiggyBank();
                private final JTextField amountField = new JTextField(8);
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
                    deposit.addActionListener(e -> act(true));
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
                        if (isDeposit) bank.deposit(amount);
                        else bank.withdraw(amount);
                        message.setText((isDeposit ? "Deposited " : "Withdrew ") + amount);
                        message.setForeground(new Color(0, 110, 0));
                    } catch (NumberFormatException ex) {
                        message.setText("Please enter a number");
                        message.setForeground(Color.RED);
                    } catch (IllegalArgumentException ex) {
                        message.setText(ex.getMessage());
                        message.setForeground(Color.RED);
                    }
                    amountField.setText("");
                    refresh();
                }

                private void refresh() {
                    balanceLabel.setText(String.format("Balance: %,.2f baht", bank.getBalance()));
                }
            }

            class PiggyBank {
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
          steps: ["UI เป็นออบเจ็กต์ (ไม่ใช้ static) — component เป็น field เข้าถึงได้จากทุกเมธอด", "act() แปลงข้อความ เรียก model และจับ exception มาแสดงเป็นข้อความสีแดง", "refresh() วาดยอดเงินจาก model เสมอ", "ภาพแสดงการถอน 1000 ถูกปฏิเสธด้วยข้อความจากกฎของ PiggyBank"] },
        { type: "run", title: "เกมทายตัวเลขแบบ GUI", level: "ท้าทาย", gui: true, actions: "type field:0 50\nclick Guess\ntype field:0 25\nclick Guess\ntype field:0 37\nclick Guess\nshot", captions: ["หลังทาย 50, 25, 37"],
          concept: "รวมทุกอย่าง: state หลายตัว (คำตอบ, จำนวนครั้ง, จบเกมหรือยัง), ประวัติใน JTextArea, ปิดปุ่มเมื่อจบเกม และปุ่มเริ่มใหม่ (คำตอบกำหนดเป็น 37 เพื่อให้ทดสอบได้ — บทเสริม Random จะสุ่มแทน)",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class GuessGui {
                private int secret = 37;
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
                    guess.addActionListener(e -> onGuess());
                    input.addActionListener(e -> onGuess());
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
                        return;
                    }
                    tries++;
                    if (g == secret) {
                        history.append(g + " -> correct!\n");
                        status.setText("You got it in " + tries + " tries");
                        guess.setEnabled(false);
                        input.setEnabled(false);
                    } else {
                        String hint = g > secret ? "too high" : "too low";
                        history.append(g + " -> " + hint + "\n");
                        status.setText("Try #" + (tries + 1));
                    }
                    input.setText("");
                }

                private void restart() {
                    tries = 0;
                    history.setText("");
                    status.setText("Guess a number 1-100");
                    guess.setEnabled(true);
                    input.setEnabled(true);
                }
            }`,
          steps: ["state: secret, tries — field ของออบเจ็กต์ GuessGui", "<code>history.append</code> ต่อท้ายประวัติ", "ทายถูก → ปิดช่องและปุ่ม ป้องกันการทายต่อ", "New game รีเซ็ต state และ UI ทั้งหมด", "ใช้ return ออกจาก listener ก่อนเมื่อข้อมูลผิด"] },
        { type: "note", title: "อย่าใช้ Thread.sleep ใน listener", html: pre(`
          button.addActionListener(e -> {
              label.setText("Working...");
              try { Thread.sleep(3000); } catch (InterruptedException ex) { }   // ❌ หน้าจอค้าง 3 วินาที
              label.setText("Done");                                          //    และไม่เคยเห็น "Working..."
          });`) + `<p>EDT ถูกบล็อกจึงไม่มีโอกาสวาดข้อความ “Working...” ให้เห็น งานที่ต้องรอหรือทำซ้ำตามเวลาให้ใช้ <code>javax.swing.Timer</code> หรือ <code>SwingWorker</code> (บทเสริม Timer และ Thread)</p>` },
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
                    en.addActionListener(e -> label.setText("Hello"));
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
            private static int value = 0;
            private static JLabel display;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Counter");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    display = new JLabel("0", SwingConstants.CENTER);
                    display.setFont(new Font("SansSerif", Font.BOLD, 32));
                    JPanel buttons = new JPanel();
                    addButton(buttons, "+1", () -> value++);
                    addButton(buttons, "+5", () -> value += 5);
                    addButton(buttons, "-1", () -> value = Math.max(0, value - 1));
                    addButton(buttons, "Reset", () -> value = 0);
                    frame.add(display, BorderLayout.CENTER);
                    frame.add(buttons, BorderLayout.SOUTH);
                    frame.setSize(300, 150);
                    frame.setVisible(true);
                });
            }

            static void addButton(JPanel panel, String text, Runnable change) {
                JButton b = new JButton(text);
                b.addActionListener(e -> {
                    change.run();
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
                        double x = Double.parseDouble(a.getText().trim());
                        double y = Double.parseDouble(b.getText().trim());
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
                    ActionListener compute = e -> {
                        double w = Double.parseDouble(weight.getText().trim());
                        double h = Double.parseDouble(height.getText().trim()) / 100;
                        double bmi = w / (h * h);
                        String cat = category(bmi);
                        result.setText(String.format("BMI %.2f - %s", bmi, cat));
                        result.setForeground(switch (cat) {
                            case "Underweight" -> Color.BLUE;
                            case "Normal" -> new Color(0, 128, 0);
                            case "Overweight" -> new Color(230, 120, 0);
                            default -> Color.RED;
                        });
                    };
                    calc.addActionListener(compute);
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
            static final String[] MENU = {"Espresso", "Latte", "Mocha"};
            static final int[] PRICE = {45, 55, 60};
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
                g.add(s); g.add(m); g.add(l);
                extra = new JCheckBox("Extra shot +15");
                qty = new JSpinner(new SpinnerNumberModel(1, 1, 10, 1));
                total = new JLabel();
                menu.addActionListener(e -> updatePrice());
                for (AbstractButton b : new AbstractButton[]{s, m, l, extra}) b.addActionListener(e -> updatePrice());
                qty.addChangeListener(e -> updatePrice());

                JPanel row1 = new JPanel(new FlowLayout(FlowLayout.LEFT));
                row1.add(menu); row1.add(s); row1.add(m); row1.add(l);
                JPanel row2 = new JPanel(new FlowLayout(FlowLayout.LEFT));
                row2.add(extra); row2.add(new JLabel("Qty:")); row2.add(qty);
                JPanel root = new JPanel(new GridLayout(3, 1));
                root.add(row1); root.add(row2); root.add(total);
                root.setBorder(BorderFactory.createEmptyBorder(6, 8, 6, 8));
                updatePrice();
                frame.setContentPane(root);
                frame.pack();
                frame.setVisible(true);
            }

            static void updatePrice() {
                int base = PRICE[menu.getSelectedIndex()];
                int size = m.isSelected() ? 10 : l.isSelected() ? 20 : 0;
                int shot = extra.isSelected() ? 15 : 0;
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

                    Runnable updateStatus = () -> {
                        status.setText(model.size() + " task(s)");
                        remove.setEnabled(list.getSelectedIndex() >= 0);
                    };
                    ActionListener addTask = e -> {
                        String t = input.getText().trim();
                        if (!t.isEmpty()) model.addElement(t);
                        input.setText("");
                        updateStatus.run();
                    };
                    add.addActionListener(addTask);
                    input.addActionListener(addTask);
                    remove.addActionListener(e -> {
                        int i = list.getSelectedIndex();
                        if (i >= 0) model.remove(i);
                        updateStatus.run();
                    });
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
            private double first = 0;
            private String op = "";
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
                ActionListener digit = e -> {
                    String d = e.getActionCommand();
                    if (startNew) {
                        display.setText(d.equals(".") ? "0." : d);
                        startNew = false;
                    } else if (!(d.equals(".") && display.getText().contains("."))) {
                        display.setText(display.getText() + d);
                    }
                };
                ActionListener operator = e -> {
                    calculate();
                    op = e.getActionCommand();
                    startNew = true;
                };
                String[] keys = {"7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"};
                JPanel pad = new JPanel(new GridLayout(4, 4, 4, 4));
                for (String k : keys) {
                    JButton b = new JButton(k);
                    if (k.equals("=")) b.addActionListener(e -> { calculate(); op = ""; startNew = true; });
                    else if ("/*-+".contains(k)) b.addActionListener(operator);
                    else b.addActionListener(digit);
                    pad.add(b);
                }
                JButton clear = new JButton("C");
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
                if (display.getText().equals("Error")) return;
                double current = Double.parseDouble(display.getText());
                if (op.isEmpty()) {
                    first = current;
                    return;
                }
                switch (op) {
                    case "+" -> first += current;
                    case "-" -> first -= current;
                    case "*" -> first *= current;
                    case "/" -> {
                        if (current == 0) { display.setText("Error"); op = ""; return; }
                        first /= current;
                    }
                }
                display.setText(format(first));
            }

            private static String format(double v) {
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
            private final ArrayList<Question> questions = new ArrayList<>();
            private int index = 0, score = 0;
            private boolean answered = false;
            private final JLabel prompt = new JLabel();
            private final JRadioButton[] options = new JRadioButton[4];
            private final ButtonGroup group = new ButtonGroup();
            private final JLabel feedback = new JLabel(" ");
            private final JButton submit = new JButton("Submit");
            private final JButton next = new JButton("Next");

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new QuizGui().show());
            }

            private void show() {
                questions.add(new Question("Which keyword creates an object?", new String[]{"class", "new", "void", "static"}, 1));
                questions.add(new Question("Which type stores text?", new String[]{"char", "int", "String", "boolean"}, 2));
                questions.add(new Question("First index of an array?", new String[]{"1", "-1", "length", "0"}, 3));

                JFrame frame = new JFrame("Java Quiz");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JPanel optionPanel = new JPanel(new GridLayout(4, 1));
                for (int i = 0; i < 4; i++) {
                    options[i] = new JRadioButton();
                    group.add(options[i]);
                    optionPanel.add(options[i]);
                }
                submit.addActionListener(e -> onSubmit());
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
                showQuestion();
                frame.setSize(420, 230);
                frame.setVisible(true);
            }

            private void showQuestion() {
                Question q = questions.get(index);
                prompt.setText("Q" + (index + 1) + "/" + questions.size() + ": " + q.text);
                for (int i = 0; i < 4; i++) options[i].setText(q.choices[i]);
                group.clearSelection();
                answered = false;
                feedback.setText(" ");
                submit.setEnabled(true);
                next.setEnabled(false);
            }

            private void onSubmit() {
                int chosen = -1;
                for (int i = 0; i < 4; i++) if (options[i].isSelected()) chosen = i;
                if (chosen == -1) {
                    feedback.setText("Choose an answer first");
                    return;
                }
                Question q = questions.get(index);
                if (chosen == q.answer) {
                    score++;
                    feedback.setText("Correct!");
                    feedback.setForeground(new Color(0, 128, 0));
                } else {
                    feedback.setText("Wrong - answer: " + q.choices[q.answer]);
                    feedback.setForeground(Color.RED);
                }
                answered = true;
                submit.setEnabled(false);
                if (index < questions.size() - 1) {
                    next.setEnabled(true);
                } else {
                    feedback.setText(feedback.getText() + "   Final score: " + score + "/" + questions.size());
                }
            }
        }

        class Question {
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
