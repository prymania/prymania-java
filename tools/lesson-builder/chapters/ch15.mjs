import { j, c, pre } from "../lib.mjs";

export default {
  num: 15, file: "chapter-15.html",
  pageTitle: "บทที่ 15: Components และ Layout", shortName: "บทที่ 15",
  tocLabel: "บทที่ 15 · ชิ้นส่วนและการจัดวาง", sidebarBottom: "ให้ layout manager คำนวณตำแหน่งแทนเรา",
  kicker: "บทที่ 15 · สร้างส่วนต่าง ๆ บนหน้าต่าง", h1: "Components และ Layout",
  lead: "เลือก component ให้ตรงกับข้อมูล และใช้ layout manager จัดตำแหน่งโดยไม่กำหนดพิกัดทุกชิ้นด้วยตัวเอง",
  goals: ["เลือก JLabel, JButton, JTextField และ JTextArea", "ใช้ JScrollPane กับเนื้อหาที่ยาว", "รับตัวเลือกด้วย JComboBox, JCheckBox, JRadioButton", "เลือกระหว่าง Flow, Border, Grid และ Box layout แล้วประกอบหลาย panel"],
  prev: { href: "chapter-14.html", label: "← บทที่ 14" },
  next: { href: "chapter-16.html", label: "บทที่ 16: เหตุการณ์ →" },
  footer: "บทที่ 15 · ร่างหน้าจอบนกระดาษก่อนเลือก layout",
  introHeading: "15. ประกอบหน้าจอจากชิ้นส่วน Swing",
  introHtml: `<p>หน้าจอแบ่งเป็น <strong>component</strong> ที่แสดงหรือรับข้อมูล กับ <strong>container</strong> ที่บรรจุ component อีกที แต่ละ container มี <strong>layout manager</strong> คำนวณตำแหน่งให้ตามขนาดหน้าต่าง ทำให้หน้าจอยังดูดีเมื่อผู้ใช้ย่อขยายหน้าต่างหรือใช้ฟอนต์ต่างกัน บทนี้ยังไม่ทำให้ปุ่มตอบสนอง (บทที่ 16) แต่บางภาพจำลองการพิมพ์หรือเลือกค่าเพื่อให้เห็นสถานะของ component</p>`,
  topics: [
    {
      num: "15.1", toc: "Label, Button และ Panel", title: "JLabel, JButton และ JPanel",
      blocks: [
        { type: "table", head: ["Component", "ใช้ทำอะไร", "เมธอดที่ใช้บ่อย"], rows: [
          ["<code>JLabel</code>", "แสดงข้อความ (ผู้ใช้แก้ไม่ได้)", "<code>setText</code>, <code>getText</code>, <code>setFont</code>, <code>setForeground</code>"],
          ["<code>JButton</code>", "ปุ่มให้ผู้ใช้กด", "<code>setText</code>, <code>setEnabled</code>, <code>setToolTipText</code>, <code>addActionListener</code> (บทที่ 16)"],
          ["<code>JPanel</code>", "container จัดกลุ่ม", "<code>add</code>, <code>setLayout</code>, <code>setBorder</code>, <code>setBackground</code>"],
        ] },
        { type: "run", title: "label และปุ่มหลายสถานะ", level: "พื้นฐาน", gui: true,
          concept: "ปุ่มที่ <code>setEnabled(false)</code> จะเป็นสีเทาและกดไม่ได้ ใช้บอกผู้ใช้ว่ายังทำขั้นนั้นไม่ได้",
          code: j`
            import javax.swing.*;

            public class LabelButtons {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Step 1 of 3");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Welcome to registration"));
                        JButton back = new JButton("Back");
                        back.setEnabled(false);
                        JButton next = new JButton("Next");
                        next.setToolTipText("Go to step 2");
                        panel.add(back);
                        panel.add(next);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["Back ถูกปิดเพราะอยู่หน้าแรก", "Next มี tooltip แสดงเมื่อเอาเมาส์ชี้"] },
        { type: "run", title: "label แบบ HTML และการจัดแนว", level: "ต่อยอด", gui: true,
          concept: "JLabel รับข้อความ HTML อย่างง่ายได้ (ขึ้นบรรทัดด้วย &lt;br&gt;, ตัวหนา, สี) และจัดแนวข้อความด้วย <code>SwingConstants</code>",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class HtmlLabel {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Notice");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel label = new JLabel("<html><b>Exam schedule</b><br>Midterm: 12 Oct<br>"
                            + "<font color='red'>Final: 15 Dec</font></html>");
                        label.setHorizontalAlignment(SwingConstants.CENTER);
                        label.setBorder(BorderFactory.createEmptyBorder(12, 30, 12, 30));
                        frame.add(label, BorderLayout.CENTER);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ข้อความขึ้นต้น &lt;html&gt; จะถูกตีความเป็น HTML", "&lt;br&gt; ขึ้นบรรทัด &lt;b&gt; ตัวหนา &lt;font color&gt; สี", "ใช้เท่าที่จำเป็น: ข้อความธรรมดาอ่านและดูแลง่ายกว่า"] },
        { type: "check", title: "component", html: `<p>ต้องการแสดงผลลัพธ์การคำนวณที่ผู้ใช้<strong>ไม่ควรแก้ไข</strong> ควรใช้ JLabel หรือ JTextField</p>`, answer: `<p>JLabel เหมาะที่สุด (หรือ JTextField ที่ setEditable(false) ถ้าต้องการให้ผู้ใช้คัดลอกข้อความได้)</p>` },
      ],
    },
    {
      num: "15.2", toc: "รับและแสดงข้อความ", title: "JTextField, JTextArea และ JScrollPane",
      blocks: [
        { type: "p", html: `<code>JTextField</code> เหมาะกับข้อความบรรทัดเดียว เช่น ชื่อหรือรหัส; <code>JPasswordField</code> สำหรับรหัสผ่าน; <code>JTextArea</code> รับข้อความหลายบรรทัด และควรใส่ใน <code>JScrollPane</code> เพื่อเลื่อนดูเมื่อข้อความยาว ค่าที่อ่านได้จากช่องเหล่านี้เป็น <strong>String เสมอ</strong> (ตัวเลขต้อง parse แบบบทที่ 9)` },
        { type: "run", title: "ช่องกรอกบรรทัดเดียวพร้อมข้อความที่ผู้ใช้พิมพ์", level: "พื้นฐาน", gui: true, actions: "type field:0 Mali Jaidee\ntype field:1 6601234",
          concept: "JTextField(คอลัมน์) กำหนดความกว้างโดยประมาณ ภาพนี้จำลองว่าผู้ใช้พิมพ์ข้อมูลลงไปแล้ว",
          code: j`
            import javax.swing.*;

            public class TextFields {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Student");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Name:"));
                        panel.add(new JTextField(12));
                        panel.add(new JLabel("ID:"));
                        panel.add(new JTextField(7));
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ช่องแรกกว้าง 12 คอลัมน์ ช่องที่สองกว้าง 7", "ค่าที่พิมพ์อ่านได้ด้วย <code>getText()</code> (บทที่ 16–17)"] },
        { type: "run", title: "JTextArea ใน JScrollPane", level: "ต่อยอด", gui: true,
          concept: "ตั้งจำนวนแถว/คอลัมน์ เปิดการตัดคำด้วย <code>setLineWrap(true)</code> และ <code>setWrapStyleWord(true)</code> แล้วห่อด้วย JScrollPane",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class NotesArea {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Notes");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextArea notes = new JTextArea(5, 24);
                        notes.setLineWrap(true);
                        notes.setWrapStyleWord(true);
                        StringBuilder sb = new StringBuilder();
                        for (int i = 1; i <= 8; i++) {
                            sb.append("Line ").append(i).append(": remember to practice Java every day.\n");
                        }
                        notes.setText(sb.toString());
                        notes.setCaretPosition(0);
                        frame.add(new JScrollPane(notes), BorderLayout.CENTER);
                        frame.add(new JLabel("8 lines - scroll to read more"), BorderLayout.SOUTH);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["JTextArea(5, 24) แสดง 5 แถว กว้าง 24 คอลัมน์", "ข้อความ 8 บรรทัดยาวเกิน จึงมี scrollbar", "<code>setCaretPosition(0)</code> เลื่อนไปบนสุด", "ถ้าไม่ห่อด้วย JScrollPane หน้าต่างจะขยายหรือข้อความล้น"] },
        { type: "run", title: "ช่องอ่านอย่างเดียว ช่องรหัสผ่าน และการจัดแนว", level: "ประยุกต์", gui: true, actions: "type field:1 hunter2",
          concept: "<code>setEditable(false)</code> ใช้แสดงค่าที่คำนวณได้, JPasswordField แสดงจุดแทนตัวอักษร, <code>setHorizontalAlignment</code> จัดตัวเลขชิดขวา",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class FieldVariants {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Field types");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel panel = new JPanel(new GridLayout(3, 2, 6, 6));
                        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        JTextField total = new JTextField("1,250.00");
                        total.setEditable(false);
                        total.setHorizontalAlignment(JTextField.RIGHT);
                        panel.add(new JLabel("Total (read-only):"));
                        panel.add(total);
                        panel.add(new JLabel("Password:"));
                        panel.add(new JPasswordField(10));
                        JTextField qty = new JTextField("3");
                        qty.setHorizontalAlignment(JTextField.RIGHT);
                        panel.add(new JLabel("Quantity:"));
                        panel.add(qty);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ช่อง Total พื้นเทา แก้ไม่ได้ แต่คัดลอกได้", "JPasswordField ซ่อนตัวอักษร — อ่านค่าด้วย getPassword() ซึ่งคืน char[]", "GridLayout(3, 2) จัดป้ายกับช่องเป็นคู่ ๆ"] },
        { type: "check", title: "เลือก component", html: `<p>เลือก component สำหรับ: ที่อยู่ (หลายบรรทัด), รหัสไปรษณีย์, รหัส PIN, ผลรวมที่คำนวณได้</p>`, answer: `<p>JTextArea ใน JScrollPane, JTextField, JPasswordField, JLabel หรือ JTextField ที่ setEditable(false)</p>` },
      ],
    },
    {
      num: "15.3", toc: "ComboBox", title: "ตัวเลือก: JComboBox, JCheckBox และ JRadioButton",
      blocks: [
        { type: "table", head: ["Component", "เหมาะกับ", "อ่านค่า"], rows: [
          ["<code>JComboBox&lt;String&gt;</code>", "เลือก 1 จากรายการยาว (เมนูดรอปดาวน์)", "<code>getSelectedItem()</code>, <code>getSelectedIndex()</code>"],
          ["<code>JRadioButton</code> + <code>ButtonGroup</code>", "เลือก 1 จากตัวเลือกน้อย ๆ ที่อยากให้เห็นทั้งหมด", "<code>isSelected()</code>"],
          ["<code>JCheckBox</code>", "เปิด/ปิดแต่ละตัวเลือกอิสระ (เลือกได้หลายอัน)", "<code>isSelected()</code>"],
        ] },
        { type: "run", title: "JComboBox จากอาเรย์", level: "พื้นฐาน", gui: true, actions: "select combo:0 2",
          concept: "สร้าง combo box จากอาเรย์ String ภาพจำลองว่าผู้ใช้เลือกรายการที่ index 2",
          code: j`
            import javax.swing.*;

            public class FacultyCombo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Faculty");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        String[] faculties = {"Science", "Engineering", "Education", "Arts"};
                        JComboBox<String> combo = new JComboBox<>(faculties);
                        JPanel panel = new JPanel();
                        panel.add(new JLabel("Faculty:"));
                        panel.add(combo);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["<code>JComboBox&lt;String&gt;</code> ใช้ generic เหมือน ArrayList", "ค่าเริ่มต้นเลือกตัวแรก", "อ่านค่าด้วย <code>(String) combo.getSelectedItem()</code>"] },
        { type: "run", title: "radio button ในกลุ่มเดียวกัน และ check box", level: "ต่อยอด", gui: true, actions: "click Large\ncheck Extra shot\ncheck Oat milk",
          concept: "radio ใน <code>ButtonGroup</code> เดียวกันเลือกได้ทีละอัน ส่วน check box เลือกได้อิสระ",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class DrinkOptions {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Drink options");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JRadioButton small = new JRadioButton("Small", true);
                        JRadioButton medium = new JRadioButton("Medium");
                        JRadioButton large = new JRadioButton("Large");
                        ButtonGroup sizes = new ButtonGroup();
                        sizes.add(small);
                        sizes.add(medium);
                        sizes.add(large);

                        JPanel sizePanel = new JPanel();
                        sizePanel.setBorder(BorderFactory.createTitledBorder("Size"));
                        sizePanel.add(small);
                        sizePanel.add(medium);
                        sizePanel.add(large);

                        JPanel extraPanel = new JPanel();
                        extraPanel.setBorder(BorderFactory.createTitledBorder("Extras"));
                        extraPanel.add(new JCheckBox("Extra shot"));
                        extraPanel.add(new JCheckBox("Oat milk"));
                        extraPanel.add(new JCheckBox("Less sugar"));

                        frame.add(sizePanel, BorderLayout.NORTH);
                        frame.add(extraPanel, BorderLayout.SOUTH);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["เริ่มต้นเลือก Small (parameter true)", "ภาพจำลองคลิก Large → Small ถูกยกเลิกอัตโนมัติเพราะอยู่กลุ่มเดียวกัน", "เลือก Extra shot และ Oat milk พร้อมกันได้", "<code>createTitledBorder</code> วาดกรอบพร้อมหัวข้อ ช่วยจัดกลุ่มให้อ่านง่าย"] },
        { type: "run", title: "JSpinner และ JSlider สำหรับตัวเลขในช่วง", level: "ประยุกต์", gui: true,
          concept: "เมื่อค่าเป็นตัวเลขในช่วงจำกัด ใช้ spinner (ปุ่มขึ้นลง) หรือ slider (แถบเลื่อน) แทนช่องพิมพ์ ช่วยลดข้อมูลผิดรูปแบบ",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class NumberInputs {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Order");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JSpinner qty = new JSpinner(new SpinnerNumberModel(2, 1, 20, 1));
                        JSlider sweet = new JSlider(0, 100, 50);
                        sweet.setMajorTickSpacing(25);
                        sweet.setPaintTicks(true);
                        sweet.setPaintLabels(true);
                        JPanel panel = new JPanel(new GridLayout(2, 2, 8, 8));
                        panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        panel.add(new JLabel("Quantity (1-20):"));
                        panel.add(qty);
                        panel.add(new JLabel("Sweetness %:"));
                        panel.add(sweet);
                        frame.add(panel);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["SpinnerNumberModel(ค่าเริ่ม, ต่ำสุด, สูงสุด, ขั้น)", "JSlider(ต่ำสุด, สูงสุด, ค่าเริ่ม) พร้อมขีดและตัวเลขทุก 25", "อ่านค่า: <code>(int) qty.getValue()</code>, <code>sweet.getValue()</code>"] },
        { type: "check", title: "เลือกตัวเลือก", html: `<p>ฟอร์มสมัครสมาชิกต้องการ: เพศ (3 ตัวเลือก), จังหวัด (77 จังหวัด), ความสนใจ (เลือกได้หลายข้อ) ควรใช้ component ใด</p>`, answer: `<p>เพศ → JRadioButton + ButtonGroup, จังหวัด → JComboBox, ความสนใจ → JCheckBox หลายตัว</p>` },
      ],
    },
    {
      num: "15.4", toc: "Layout Manager", title: "Layout Manager: Flow, Border, Grid และ Box",
      blocks: [
        { type: "table", head: ["Layout", "จัดอย่างไร", "เหมาะกับ"], rows: [
          ["<code>FlowLayout</code>", "เรียงซ้าย→ขวา ตัดบรรทัดเมื่อเต็ม ขนาดตาม preferred size", "แถวปุ่ม, แถบเครื่องมือเล็ก ๆ"],
          ["<code>BorderLayout</code>", "5 พื้นที่: NORTH, SOUTH, EAST, WEST, CENTER (CENTER ยืดเต็มที่เหลือ)", "โครงหน้าจอหลัก"],
          ["<code>GridLayout(r, c)</code>", "ตารางที่ทุกช่องขนาดเท่ากัน", "ปุ่มเครื่องคิดเลข, ฟอร์มป้าย–ช่อง"],
          ["<code>BoxLayout</code>", "เรียงแนวตั้งหรือแนวนอนแถวเดียว ไม่ยืดเท่ากัน", "รายการแนวตั้ง, ฟอร์มที่ต้องการระยะห่างอิสระ"],
        ] },
        { type: "run", title: "BorderLayout: 5 พื้นที่", level: "พื้นฐาน", gui: true,
          concept: "ใส่ปุ่มทั้ง 5 ตำแหน่งให้เห็นว่าแต่ละพื้นที่ขยายตัวอย่างไร — CENTER ได้พื้นที่ที่เหลือทั้งหมด",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class BorderDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("BorderLayout");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel p = new JPanel(new BorderLayout(4, 4));
                        p.add(new JButton("NORTH"), BorderLayout.NORTH);
                        p.add(new JButton("SOUTH"), BorderLayout.SOUTH);
                        p.add(new JButton("WEST"), BorderLayout.WEST);
                        p.add(new JButton("EAST"), BorderLayout.EAST);
                        p.add(new JButton("CENTER"), BorderLayout.CENTER);
                        frame.setContentPane(p);
                        frame.setSize(340, 200);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["NORTH/SOUTH ยืดเต็มความกว้าง สูงเท่าที่จำเป็น", "WEST/EAST ยืดเต็มความสูงที่เหลือ กว้างเท่าที่จำเป็น", "CENTER ได้พื้นที่ที่เหลือทั้งหมด", "BorderLayout(4, 4) เว้นช่องว่างระหว่างพื้นที่"] },
        { type: "run", title: "GridLayout: ทุกช่องเท่ากัน", level: "ต่อยอด", gui: true,
          concept: "GridLayout(แถว, คอลัมน์) — ใส่ 0 ที่แถวเพื่อให้เพิ่มแถวอัตโนมัติตามจำนวน component",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class GridDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("GridLayout");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel grid = new JPanel(new GridLayout(0, 3, 5, 5));
                        grid.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        for (int i = 1; i <= 8; i++) {
                            grid.add(new JButton("Seat " + i));
                        }
                        frame.setContentPane(grid);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["3 คอลัมน์ แถวเพิ่มเองเป็น 3 แถวสำหรับ 8 ปุ่ม", "ทุกปุ่มขนาดเท่ากัน (ตามปุ่มที่ใหญ่ที่สุด)", "สร้างปุ่มด้วยลูป — ดีกว่าเขียนทีละบรรทัด"] },
        { type: "run", title: "BoxLayout แนวตั้งพร้อมระยะห่าง", level: "ประยุกต์", gui: true,
          concept: "BoxLayout.Y_AXIS วางเป็นแนวตั้ง ใช้ <code>Box.createVerticalStrut(n)</code> เว้นระยะ และ <code>setAlignmentX</code> จัดชิดซ้าย",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class BoxDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Settings");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JPanel box = new JPanel();
                        box.setLayout(new BoxLayout(box, BoxLayout.Y_AXIS));
                        box.setBorder(BorderFactory.createEmptyBorder(12, 16, 12, 16));
                        JLabel title = new JLabel("Notifications");
                        title.setFont(title.getFont().deriveFont(Font.BOLD, 15f));
                        box.add(title);
                        box.add(Box.createVerticalStrut(8));
                        box.add(new JCheckBox("Email me when grades are posted", true));
                        box.add(new JCheckBox("Remind me before deadlines", true));
                        box.add(new JCheckBox("Weekly summary"));
                        box.add(Box.createVerticalStrut(12));
                        box.add(new JButton("Save"));
                        for (Component c : box.getComponents()) {
                            ((JComponent) c).setAlignmentX(Component.LEFT_ALIGNMENT);
                        }
                        frame.setContentPane(box);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["component เรียงลงมาทีละแถว ขนาดตามธรรมชาติ (ไม่ยืดเท่ากันแบบ Grid)", "strut เว้นระยะแนวตั้งคงที่", "ทุก component ต้อง alignment เดียวกัน ไม่เช่นนั้นจะเยื้องกัน"] },
        { type: "run", title: "FlowLayout ชิดขวาสำหรับแถวปุ่ม", level: "ประยุกต์", gui: true,
          concept: "<code>new FlowLayout(FlowLayout.RIGHT)</code> เหมาะกับแถวปุ่ม OK/Cancel ด้านล่างของฟอร์ม",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ButtonBar {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Confirm");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel msg = new JLabel("Save changes before closing?", SwingConstants.CENTER);
                        msg.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
                        JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT));
                        buttons.add(new JButton("Don't save"));
                        buttons.add(new JButton("Cancel"));
                        buttons.add(new JButton("Save"));
                        frame.add(msg, BorderLayout.CENTER);
                        frame.add(buttons, BorderLayout.SOUTH);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ข้อความอยู่ CENTER, แถวปุ่มอยู่ SOUTH", "FlowLayout.RIGHT ดันปุ่มไปชิดขวา", "รูปแบบนี้พบในโปรแกรมทั่วไป ผู้ใช้คุ้นเคย"] },
        { type: "check", title: "เลือก layout", html: `<p>หน้าจอแชต: รายการข้อความเต็มพื้นที่, ช่องพิมพ์และปุ่มส่งด้านล่าง ควรจัดอย่างไร</p>`, answer: `<p>panel หลักใช้ BorderLayout: JScrollPane(รายการข้อความ) ที่ CENTER และ panel ล่าง (BorderLayout อีกชั้น: ช่องพิมพ์ CENTER, ปุ่มส่ง EAST) ที่ SOUTH</p>` },
      ],
    },
    {
      num: "15.5", toc: "ประกอบหลาย Panel", title: "ประกอบหลาย panel เป็นหน้าจอเดียว",
      blocks: [
        { type: "steps", title: "ขั้นตอนออกแบบหน้าจอ", items: [
          "ร่างหน้าจอบนกระดาษ แล้วตีกรอบเป็นสี่เหลี่ยมตามกลุ่มของข้อมูล",
          "แต่ละกรอบคือ panel หนึ่งตัว เลือก layout ตามลักษณะของกรอบนั้น (ฟอร์ม → Grid, แถวปุ่ม → Flow, รายการ → Box)",
          "panel ใหญ่ที่สุด (content pane) มักใช้ BorderLayout วางกรอบย่อยตามตำแหน่ง",
          "แยกการสร้างแต่ละ panel เป็นเมธอด เช่น <code>buildForm()</code>, <code>buildButtons()</code>",
          "ทดสอบย่อ/ขยายหน้าต่าง ว่าส่วนที่ควรยืดยืดจริง",
        ] },
        { type: "run", title: "ฟอร์มลงทะเบียนจาก 3 panel", level: "ประยุกต์", gui: true, actions: "type field:0 Mali Jaidee\ntype field:1 mali@mail.com\nselect combo:0 1\ntype area:0 Interested in GUI programming.",
          concept: "หัวเรื่อง (NORTH) + ฟอร์ม GridLayout (CENTER) + แถวปุ่ม FlowLayout (SOUTH) แต่ละส่วนสร้างในเมธอดของตัวเอง",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class RegistrationForm {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(RegistrationForm::show);
                }

                static void show() {
                    JFrame frame = new JFrame("Registration");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel root = new JPanel(new BorderLayout(8, 8));
                    root.setBorder(BorderFactory.createEmptyBorder(10, 12, 10, 12));
                    root.add(buildHeader(), BorderLayout.NORTH);
                    root.add(buildForm(), BorderLayout.CENTER);
                    root.add(buildButtons(), BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                }

                static JComponent buildHeader() {
                    JLabel title = new JLabel("Workshop Registration");
                    title.setFont(title.getFont().deriveFont(Font.BOLD, 16f));
                    return title;
                }

                static JComponent buildForm() {
                    JPanel form = new JPanel(new BorderLayout(6, 6));
                    JPanel fields = new JPanel(new GridLayout(3, 2, 6, 6));
                    fields.add(new JLabel("Full name:"));
                    fields.add(new JTextField(16));
                    fields.add(new JLabel("Email:"));
                    fields.add(new JTextField(16));
                    fields.add(new JLabel("Session:"));
                    fields.add(new JComboBox<>(new String[]{"Morning", "Afternoon", "Evening"}));
                    form.add(fields, BorderLayout.NORTH);
                    JTextArea note = new JTextArea(3, 20);
                    note.setLineWrap(true);
                    JScrollPane scroll = new JScrollPane(note);
                    scroll.setBorder(BorderFactory.createTitledBorder("Note"));
                    form.add(scroll, BorderLayout.CENTER);
                    return form;
                }

                static JComponent buildButtons() {
                    JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT, 6, 0));
                    buttons.add(new JButton("Clear"));
                    buttons.add(new JButton("Submit"));
                    return buttons;
                }
            }`,
          steps: ["แต่ละเมธอดคืน component ที่ประกอบเสร็จ อ่านง่ายและแก้แยกได้", "ฟอร์มซ้อน: GridLayout สำหรับป้าย–ช่อง ภายใน BorderLayout ที่มี Note ยืดตรงกลาง", "ภาพจำลองการกรอกข้อมูลครบทุกช่อง", "บทที่ 16–17 จะทำให้ Submit อ่านค่าและตรวจสอบได้"] },
        { type: "run", title: "หน้าจอแชตแบบ 2 ชั้นของ BorderLayout", level: "ท้าทาย", gui: true, actions: "type field:0 See you at the lab!",
          concept: "BorderLayout ซ้อนกัน: ชั้นนอกวางรายการข้อความ (CENTER) กับแถบพิมพ์ (SOUTH), ชั้นในของแถบพิมพ์วางช่อง (CENTER) กับปุ่ม (EAST) ทำให้ช่องพิมพ์ยืดตามความกว้างหน้าต่าง",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ChatLayout {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Class Chat");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                        DefaultListModel<String> messages = new DefaultListModel<>();
                        messages.addElement("Mali: Has anyone finished lab 15?");
                        messages.addElement("Beam: Almost, stuck on BoxLayout");
                        messages.addElement("Nida: Remember setAlignmentX!");
                        JList<String> list = new JList<>(messages);

                        JPanel inputBar = new JPanel(new BorderLayout(6, 0));
                        inputBar.add(new JTextField(), BorderLayout.CENTER);
                        inputBar.add(new JButton("Send"), BorderLayout.EAST);

                        JPanel root = new JPanel(new BorderLayout(0, 8));
                        root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        root.add(new JScrollPane(list), BorderLayout.CENTER);
                        root.add(inputBar, BorderLayout.SOUTH);
                        frame.setContentPane(root);
                        frame.setSize(340, 220);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["<code>JList</code> + <code>DefaultListModel</code> แสดงรายการที่เพิ่ม/ลบได้ (คล้าย ArrayList)", "รายการข้อความยืดเต็มพื้นที่ CENTER", "ช่องพิมพ์ยืดตามความกว้าง ปุ่ม Send กว้างคงที่ทางขวา"] },
        { type: "note", title: "ทำไมไม่ใช้ setBounds กำหนดพิกัดเอง", html: `<p>การใช้ <code>setLayout(null)</code> กับ <code>setBounds(x, y, w, h)</code> ดูง่ายในตอนแรก แต่หน้าจอจะพังเมื่อผู้ใช้ขยายหน้าต่าง เปลี่ยนขนาดฟอนต์ หรือรันบนระบบปฏิบัติการอื่น layout manager คำนวณใหม่ให้ทุกครั้งโดยอัตโนมัติ</p>` },
      ],
    },
  ],
  exercisesIntro: "สร้างหน้าจอให้ใกล้เคียงภาพตัวอย่าง (ไม่ต้องตรงทุกพิกเซล) เน้นเลือก component และ layout ให้เหมาะสม ภาพบางข้อจำลองการกรอกข้อมูลไว้แล้ว ยังไม่ต้องทำให้ปุ่มทำงาน",
  exercises: [
    { level: 1, title: "หัวหน้าต่างโปรไฟล์", html: `<p>สร้างหน้าต่างที่มี JLabel ชื่อหน้า “Student Profile” ตัวหนาขนาด 16 และปุ่ม <code>Edit</code> กับปุ่ม <code>Delete</code> ที่ถูกปิดใช้งาน (setEnabled(false)) เรียงในแถวเดียว</p>`,
      spec: ["ใช้ JPanel (FlowLayout)", "ปุ่ม Delete ต้องเป็นสีเทา"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class ProfileHeader {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Profile");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel panel = new JPanel();
                    JLabel title = new JLabel("Student Profile");
                    title.setFont(new Font("SansSerif", Font.BOLD, 16));
                    JButton delete = new JButton("Delete");
                    delete.setEnabled(false);
                    panel.add(title);
                    panel.add(new JButton("Edit"));
                    panel.add(delete);
                    frame.add(panel);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 1, title: "ช่องความคิดเห็นที่เลื่อนได้", html: `<p>สร้างหน้าต่าง <code>Feedback</code> ที่มี JLabel “Your comments:” ด้านบน และ JTextArea ขนาด 6 แถว × 30 คอลัมน์ที่ตัดคำ (wrap) อยู่ใน JScrollPane ตรงกลาง และปุ่ม Send ด้านล่าง</p>`,
      spec: ["ใช้ BorderLayout: NORTH, CENTER, SOUTH", "setLineWrap(true) และ setWrapStyleWord(true)"], gui: true, actions: "type area:0 The lab on layouts was very helpful. I would like more examples of nested panels and BoxLayout please!",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class FeedbackWindow {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Feedback");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextArea area = new JTextArea(6, 30);
                    area.setLineWrap(true);
                    area.setWrapStyleWord(true);
                    JPanel root = new JPanel(new BorderLayout(6, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(new JLabel("Your comments:"), BorderLayout.NORTH);
                    root.add(new JScrollPane(area), BorderLayout.CENTER);
                    root.add(new JButton("Send"), BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 1, title: "เลือกขนาดเสื้อ", html: `<p>สร้างหน้าต่างที่มี radio button ขนาดเสื้อ S, M, L, XL ในกลุ่มเดียวกัน (เริ่มต้นเลือก M) อยู่ในกรอบ TitledBorder “Size” และ combo box สีเสื้อ (White, Black, Navy, Red)</p>`,
      spec: ["ใช้ ButtonGroup", "สร้าง radio ด้วยลูปจากอาเรย์ String", "combo box อยู่ในอีก panel หนึ่ง"], gui: true, actions: "click XL\nselect combo:0 2",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class ShirtOptions {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("T-Shirt");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel sizes = new JPanel();
                    sizes.setBorder(BorderFactory.createTitledBorder("Size"));
                    ButtonGroup group = new ButtonGroup();
                    for (String s : new String[]{"S", "M", "L", "XL"}) {
                        JRadioButton r = new JRadioButton(s, s.equals("M"));
                        group.add(r);
                        sizes.add(r);
                    }
                    JPanel colorPanel = new JPanel();
                    colorPanel.add(new JLabel("Color:"));
                    colorPanel.add(new JComboBox<>(new String[]{"White", "Black", "Navy", "Red"}));
                    frame.add(sizes, BorderLayout.NORTH);
                    frame.add(colorPanel, BorderLayout.SOUTH);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "ภาพตัวอย่างจำลองการเลือก XL และสี Navy" },
    { level: 2, title: "ฟอร์มข้อมูลติดต่อด้วย GridLayout", html: `<p>สร้างฟอร์ม <code>Contact</code> ที่มีป้ายกับช่องเป็นคู่ 4 แถว: Name, Phone, Email, Province (combo box 5 จังหวัด) ใช้ <code>GridLayout(0, 2, 8, 6)</code> และมีแถวปุ่ม Cancel/Save ชิดขวาด้านล่าง</p>`,
      spec: ["ฟอร์มกับแถวปุ่มเป็นคนละ panel", "content pane ใช้ BorderLayout", "เว้นขอบ 10 พิกเซลด้วย EmptyBorder"], gui: true, actions: "type field:0 Nida\ntype field:1 081-234-5678\ntype field:2 nida@mail.com\nselect combo:0 3",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class ContactForm {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Contact");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel form = new JPanel(new GridLayout(0, 2, 8, 6));
                    form.add(new JLabel("Name:"));
                    form.add(new JTextField(14));
                    form.add(new JLabel("Phone:"));
                    form.add(new JTextField(14));
                    form.add(new JLabel("Email:"));
                    form.add(new JTextField(14));
                    form.add(new JLabel("Province:"));
                    form.add(new JComboBox<>(new String[]{"Bangkok", "Chiang Mai", "Khon Kaen", "Phuket", "Songkhla"}));

                    JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT, 6, 0));
                    buttons.add(new JButton("Cancel"));
                    buttons.add(new JButton("Save"));

                    JPanel root = new JPanel(new BorderLayout(0, 10));
                    root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                    root.add(form, BorderLayout.CENTER);
                    root.add(buttons, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 2, title: "แผงตั้งค่าแนวตั้งด้วย BoxLayout", html: `<p>สร้างหน้าต่าง <code>Preferences</code> เรียงแนวตั้ง: หัวข้อ “Display” ตัวหนา, check box 2 ตัว, เว้นระยะ, หัวข้อ “Font size” ตัวหนา, slider 10–24 ค่าเริ่ม 14 มีตัวเลขทุก 2, เว้นระยะ และปุ่ม Apply ทุก component ชิดซ้าย</p>`,
      spec: ["ใช้ BoxLayout.Y_AXIS", "เว้นระยะด้วย Box.createVerticalStrut", "ตั้ง setAlignmentX(LEFT_ALIGNMENT) ด้วยลูป"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class PreferencesPanel {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Preferences");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JPanel box = new JPanel();
                    box.setLayout(new BoxLayout(box, BoxLayout.Y_AXIS));
                    box.setBorder(BorderFactory.createEmptyBorder(12, 14, 12, 14));
                    box.add(heading("Display"));
                    box.add(new JCheckBox("Dark mode"));
                    box.add(new JCheckBox("Show line numbers", true));
                    box.add(Box.createVerticalStrut(10));
                    box.add(heading("Font size"));
                    JSlider size = new JSlider(10, 24, 14);
                    size.setMajorTickSpacing(2);
                    size.setPaintTicks(true);
                    size.setPaintLabels(true);
                    box.add(size);
                    box.add(Box.createVerticalStrut(10));
                    box.add(new JButton("Apply"));
                    for (Component c : box.getComponents()) {
                        ((JComponent) c).setAlignmentX(Component.LEFT_ALIGNMENT);
                    }
                    frame.setContentPane(box);
                    frame.pack();
                    frame.setVisible(true);
                });
            }

            static JLabel heading(String text) {
                JLabel l = new JLabel(text);
                l.setFont(l.getFont().deriveFont(Font.BOLD));
                return l;
            }
        }`, explain: "แยกเมธอด heading() เพราะสร้างหัวข้อแบบเดียวกันสองครั้ง" },
    { level: 2, title: "ผังที่นั่งโรงภาพยนตร์", html: `<p>สร้างผังที่นั่ง 5 แถว (A–E) × 8 ที่นั่ง ด้วย GridLayout ปุ่มแต่ละปุ่มมีข้อความเช่น <code>A1</code> ที่นั่งในอาเรย์ <code>String[] booked = {"A3", "A4", "C5", "E1"}</code> ให้แสดงเป็นปุ่มที่ปิดใช้งาน ด้านบนมี label “SCREEN” อยู่กลาง</p>`,
      spec: ["สร้างปุ่มด้วยลูปซ้อน: แถว char จาก 'A' ถึง 'E', ที่นั่ง 1–8", "ตรวจว่าที่นั่งอยู่ใน booked หรือไม่ด้วยลูปหรือ <code>Arrays.asList(booked).contains(code)</code>", "GridLayout(5, 8, 3, 3)"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.Arrays;
        import java.util.List;

        public class SeatMap {
            public static void main(String[] args) {
                List<String> booked = Arrays.asList("A3", "A4", "C5", "E1");
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Seat Map");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JLabel screen = new JLabel("SCREEN", SwingConstants.CENTER);
                    screen.setOpaque(true);
                    screen.setBackground(Color.DARK_GRAY);
                    screen.setForeground(Color.WHITE);
                    JPanel seats = new JPanel(new GridLayout(5, 8, 3, 3));
                    for (char row = 'A'; row <= 'E'; row++) {
                        for (int n = 1; n <= 8; n++) {
                            String code = "" + row + n;
                            JButton b = new JButton(code);
                            b.setMargin(new Insets(2, 4, 2, 4));
                            if (booked.contains(code)) b.setEnabled(false);
                            seats.add(b);
                        }
                    }
                    JPanel root = new JPanel(new BorderLayout(0, 10));
                    root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                    root.add(screen, BorderLayout.NORTH);
                    root.add(seats, BorderLayout.CENTER);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "JLabel โปร่งใสโดยปริยาย ต้อง setOpaque(true) ก่อนสีพื้นหลังจึงจะแสดง" },
    { level: 3, title: "หน้าจอสั่งอาหารแบบสมบูรณ์", html: `<p>ออกแบบหน้าจอสั่งอาหารที่ประกอบด้วย panel อย่างน้อย 4 ส่วน:</p><ul><li>หัว (NORTH): ชื่อร้านพื้นสีเข้มตัวอักษรขาว</li><li>ซ้าย (WEST): รายการเมนูใน JList (อย่างน้อย 6 รายการ) อยู่ใน JScrollPane ที่มี TitledBorder “Menu”</li><li>กลาง (CENTER): ตัวเลือก ขนาด (radio), เพิ่มเติม (check box 3 ตัว), จำนวน (spinner 1–10) และหมายเหตุ (text area)</li><li>ล่าง (SOUTH): ป้ายยอดรวม “Total: 0.00 baht” ชิดซ้าย และปุ่ม Add to cart ชิดขวา</li></ul>`,
      spec: ["แยกการสร้างแต่ละส่วนเป็นเมธอด", "ใช้ layout อย่างน้อย 3 ชนิด", "หน้าต่างขนาดประมาณ 560 × 360 และส่วนกลางยืดได้"], gui: true, actions: "select list:0 2\nclick Large\ncheck Extra cheese",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class FoodOrderScreen {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(FoodOrderScreen::show);
            }

            static void show() {
                JFrame frame = new JFrame("Order");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JPanel root = new JPanel(new BorderLayout(8, 8));
                root.add(header(), BorderLayout.NORTH);
                root.add(menu(), BorderLayout.WEST);
                root.add(options(), BorderLayout.CENTER);
                root.add(footer(), BorderLayout.SOUTH);
                frame.setContentPane(root);
                frame.setSize(560, 360);
                frame.setVisible(true);
            }

            static JComponent header() {
                JLabel title = new JLabel("  Java Pizza House");
                title.setOpaque(true);
                title.setBackground(new Color(32, 44, 40));
                title.setForeground(Color.WHITE);
                title.setFont(title.getFont().deriveFont(Font.BOLD, 18f));
                title.setPreferredSize(new Dimension(0, 40));
                return title;
            }

            static JComponent menu() {
                String[] items = {"Margherita", "Pepperoni", "Hawaiian", "Seafood", "Veggie", "Four Cheese", "BBQ Chicken"};
                JScrollPane scroll = new JScrollPane(new JList<>(items));
                scroll.setBorder(BorderFactory.createTitledBorder("Menu"));
                scroll.setPreferredSize(new Dimension(160, 0));
                return scroll;
            }

            static JComponent options() {
                JPanel p = new JPanel();
                p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
                JPanel size = new JPanel(new FlowLayout(FlowLayout.LEFT));
                size.setBorder(BorderFactory.createTitledBorder("Size"));
                ButtonGroup g = new ButtonGroup();
                for (String s : new String[]{"Small", "Medium", "Large"}) {
                    JRadioButton r = new JRadioButton(s, s.equals("Medium"));
                    g.add(r);
                    size.add(r);
                }
                JPanel extras = new JPanel(new FlowLayout(FlowLayout.LEFT));
                extras.setBorder(BorderFactory.createTitledBorder("Extras"));
                extras.add(new JCheckBox("Extra cheese"));
                extras.add(new JCheckBox("Thin crust"));
                extras.add(new JCheckBox("Spicy"));
                JPanel qty = new JPanel(new FlowLayout(FlowLayout.LEFT));
                qty.add(new JLabel("Quantity:"));
                qty.add(new JSpinner(new SpinnerNumberModel(1, 1, 10, 1)));
                JScrollPane note = new JScrollPane(new JTextArea(3, 20));
                note.setBorder(BorderFactory.createTitledBorder("Note"));
                p.add(size);
                p.add(extras);
                p.add(qty);
                p.add(note);
                for (Component c : p.getComponents()) ((JComponent) c).setAlignmentX(Component.LEFT_ALIGNMENT);
                return p;
            }

            static JComponent footer() {
                JPanel p = new JPanel(new BorderLayout());
                p.setBorder(BorderFactory.createEmptyBorder(0, 8, 8, 8));
                p.add(new JLabel("Total: 0.00 baht"), BorderLayout.WEST);
                p.add(new JButton("Add to cart"), BorderLayout.EAST);
                return p;
            }
        }` },
    { level: 3, title: "เครื่องคิดเลขแบบมีประวัติ", html: `<p>สร้างหน้าจอเครื่องคิดเลขที่มี (1) ช่องแสดงผลด้านบน อ่านอย่างเดียว ตัวเลขชิดขวา ฟอนต์ใหญ่ (2) ปุ่มตัวเลขและเครื่องหมาย 4 × 4 ตรงกลาง (3) แผงประวัติการคำนวณทางขวาเป็น JTextArea อ่านอย่างเดียวใน JScrollPane ที่มีหัว “History” โดยใส่ข้อความตัวอย่างประวัติ 3 บรรทัด และ (4) แถวล่างมีปุ่ม C และ Clear history</p>`,
      spec: ["root ใช้ BorderLayout: NORTH, CENTER, EAST, SOUTH", "ปุ่มสร้างด้วยลูปจากอาเรย์", "ให้ปุ่มเครื่องหมาย (/ * - + =) มีสีพื้นต่างจากปุ่มตัวเลข", "ยังไม่ต้องคำนวณจริง"], gui: true,
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class CalculatorLayout {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Calculator");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

                    JTextField display = new JTextField("128", 10);
                    display.setEditable(false);
                    display.setHorizontalAlignment(JTextField.RIGHT);
                    display.setFont(new Font("Monospaced", Font.BOLD, 22));

                    String[] keys = {"7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"};
                    JPanel pad = new JPanel(new GridLayout(4, 4, 4, 4));
                    for (String k : keys) {
                        JButton b = new JButton(k);
                        if ("/*-+=".contains(k)) b.setBackground(new Color(217, 243, 243));
                        pad.add(b);
                    }

                    JTextArea history = new JTextArea("12 * 8 = 96\n96 + 32 = 128\n128 / 4 = 32", 6, 12);
                    history.setEditable(false);
                    JScrollPane historyPane = new JScrollPane(history);
                    historyPane.setBorder(BorderFactory.createTitledBorder("History"));

                    JPanel bottom = new JPanel(new FlowLayout(FlowLayout.LEFT, 4, 0));
                    bottom.add(new JButton("C"));
                    bottom.add(new JButton("Clear history"));

                    JPanel root = new JPanel(new BorderLayout(6, 6));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(display, BorderLayout.NORTH);
                    root.add(pad, BorderLayout.CENTER);
                    root.add(historyPane, BorderLayout.EAST);
                    root.add(bottom, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "<code>\"/*-+=\".contains(k)</code> เป็นเทคนิคสั้น ๆ ตรวจว่า k เป็นหนึ่งในเครื่องหมายหรือไม่" },
  ],
};
