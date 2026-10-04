import { j, c, pre } from "../lib.mjs";

export default {
  num: 17, file: "chapter-17.html",
  pageTitle: "บทที่ 17: ฟอร์มและการตรวจสอบข้อมูล", shortName: "บทที่ 17",
  tocLabel: "บทที่ 17 · ฟอร์มที่ไว้ใจได้", sidebarBottom: "อย่าเชื่อข้อมูลจากผู้ใช้จนกว่าจะตรวจแล้ว",
  kicker: "บทที่ 17 · รับข้อมูลอย่างเป็นมิตร", h1: "ฟอร์มและการตรวจสอบข้อมูล",
  lead: "อ่านค่าจากทุกชนิดของ component ตรวจความถูกต้องก่อนใช้งาน แจ้งปัญหาให้ผู้ใช้เข้าใจและแก้ได้ และล้างฟอร์มเมื่อทำงานเสร็จ",
  goals: ["อ่านค่าจาก text field, combo, radio, check box, spinner", "ตรวจข้อมูลว่าง รูปแบบ และช่วงค่า", "แจ้ง error ด้วย JOptionPane และข้อความในฟอร์ม", "แยก validation เป็นเมธอดและ reset ฟอร์ม"],
  prev: { href: "chapter-16.html", label: "← บทที่ 16" },
  next: { href: "chapter-18.html", label: "บทที่ 18: หลายหน้าจอ →" },
  footer: "บทที่ 17 · ข้อความ error ที่ดีบอกว่าผิดที่ไหนและต้องแก้อย่างไร",
  introHeading: "17. ฟอร์มคือสัญญาระหว่างผู้ใช้กับโปรแกรม",
  introHtml: `<p>ผู้ใช้อาจเว้นช่องว่าง พิมพ์ตัวอักษรในช่องตัวเลข หรือป้อนค่าที่เป็นไปไม่ได้ ถ้าโปรแกรมนำค่าไปใช้ทันทีจะเกิด exception หรือบันทึกข้อมูลผิด บทนี้รวมเทคนิคจากบทที่ 9 (parse), บทที่ 10 (try-catch) และบทที่ 12 (validation) มาใช้กับ GUI</p>
<div class="concept-box"><span class="box-title">ลำดับการประมวลผลฟอร์มเมื่อกด Submit</span><ol class="step-list"><li><strong>อ่าน</strong>ค่าจากทุก component (ยังเป็น String/สถานะ)</li><li><strong>ตรวจ</strong>ว่าไม่ว่าง → รูปแบบถูก → แปลงชนิด → อยู่ในช่วงที่ยอมรับ</li><li>ถ้าผิด: <strong>แจ้ง</strong>ผู้ใช้ให้ชัดว่าช่องไหนผิดอย่างไร แล้วหยุด (ไม่บันทึก)</li><li>ถ้าถูกทั้งหมด: <strong>ทำงาน</strong> (คำนวณ/บันทึก) แล้วแจ้งผลสำเร็จ และ <strong>reset</strong> ฟอร์มถ้าเหมาะสม</li></ol></div>`,
  topics: [
    {
      num: "17.1", toc: "อ่านค่าจาก component", title: "อ่านค่าจาก component",
      blocks: [
        { type: "table", head: ["Component", "อ่านค่า", "ชนิดที่ได้"], rows: [
          ["JTextField / JTextArea", "<code>getText()</code>", "String"],
          ["JPasswordField", "<code>getPassword()</code>", "char[] → <code>new String(...)</code>"],
          ["JComboBox&lt;String&gt;", "<code>getSelectedItem()</code> / <code>getSelectedIndex()</code>", "Object (cast เป็น String) / int"],
          ["JRadioButton / JCheckBox", "<code>isSelected()</code>", "boolean"],
          ["JSpinner (ตัวเลข)", "<code>(int) spinner.getValue()</code>", "Integer"],
          ["JSlider", "<code>getValue()</code>", "int"],
          ["JList", "<code>getSelectedValue()</code> / <code>getSelectedValuesList()</code>", "E / List&lt;E&gt;"],
        ] },
        { type: "run", title: "อ่านทุกช่องแล้วสรุปใน text area", level: "พื้นฐาน", gui: true, actions: "type field:0 Mali Jaidee\nselect combo:0 1\nclick Female\ncheck Newsletter\nclick Preview\nshot", captions: ["กรอกข้อมูลแล้วคลิก Preview"],
          concept: "เมื่อคลิก Preview โปรแกรมอ่านค่าจาก component ทุกชนิดแล้วแสดงรวมกัน — ยังไม่ตรวจความถูกต้อง",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ReadForm {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Read values");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField name = new JTextField(12);
                        JComboBox<String> year = new JComboBox<>(new String[]{"Year 1", "Year 2", "Year 3", "Year 4"});
                        JRadioButton male = new JRadioButton("Male");
                        JRadioButton female = new JRadioButton("Female");
                        ButtonGroup g = new ButtonGroup();
                        g.add(male);
                        g.add(female);
                        JCheckBox news = new JCheckBox("Newsletter");
                        JSpinner age = new JSpinner(new SpinnerNumberModel(18, 15, 60, 1));
                        JTextArea out = new JTextArea(5, 26);
                        out.setEditable(false);
                        JButton preview = new JButton("Preview");
                        preview.addActionListener(e -> {
                            String gender = male.isSelected() ? "Male" : female.isSelected() ? "Female" : "(not chosen)";
                            out.setText("Name: " + name.getText()
                                + "\nYear: " + year.getSelectedItem() + " (index " + year.getSelectedIndex() + ")"
                                + "\nGender: " + gender
                                + "\nAge: " + (int) age.getValue()
                                + "\nNewsletter: " + news.isSelected());
                        });
                        JPanel form = new JPanel(new GridLayout(0, 2, 4, 4));
                        form.add(new JLabel("Name:")); form.add(name);
                        form.add(new JLabel("Year:")); form.add(year);
                        JPanel gp = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
                        gp.add(male); gp.add(female);
                        form.add(new JLabel("Gender:")); form.add(gp);
                        form.add(new JLabel("Age:")); form.add(age);
                        form.add(news); form.add(preview);
                        JPanel root = new JPanel(new BorderLayout(6, 6));
                        root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        root.add(form, BorderLayout.NORTH);
                        root.add(new JScrollPane(out), BorderLayout.CENTER);
                        frame.setContentPane(root);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["getText() ได้ String", "getSelectedItem() ได้ Object ซึ่งเป็น \"Year 2\"", "radio ต้องเช็ค isSelected ทีละปุ่ม — ถ้าไม่เลือกเลยต้องจัดการกรณีนี้", "spinner คืน Integer cast เป็น int"] },
        { type: "run", title: "อ่านรายการที่เลือกหลายรายการจาก JList", level: "ต่อยอด", gui: true, actions: "click Show selected\nshot",
          concept: "JList เลือกได้หลายรายการ (กด Ctrl ค้าง) อ่านด้วย <code>getSelectedValuesList()</code> ได้ List — ตัวอย่างตั้งค่าเลือกไว้ล่วงหน้าด้วย setSelectedIndices",
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.util.List;

            public class MultiSelect {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Electives");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        String[] courses = {"AI Basics", "Mobile Apps", "Web Design", "Databases", "Game Dev"};
                        JList<String> list = new JList<>(courses);
                        list.setSelectedIndices(new int[]{0, 2, 3});
                        JLabel result = new JLabel(" ");
                        JButton show = new JButton("Show selected");
                        show.addActionListener(e -> {
                            List<String> chosen = list.getSelectedValuesList();
                            result.setText(chosen.size() + " chosen: " + String.join(", ", chosen));
                        });
                        JPanel root = new JPanel(new BorderLayout(4, 4));
                        root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                        root.add(new JScrollPane(list), BorderLayout.CENTER);
                        root.add(show, BorderLayout.EAST);
                        root.add(result, BorderLayout.SOUTH);
                        frame.setContentPane(root);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["setSelectedIndices เลือก index 0, 2, 3 ไว้ก่อน", "getSelectedValuesList() คืน List&lt;String&gt; ของที่เลือก", "String.join ต่อรายการด้วยตัวคั่น"] },
        { type: "check", title: "ชนิดที่ได้", html: `<p>ช่องกรอกอายุเป็น JTextField ผู้ใช้พิมพ์ <code>20</code> — <code>ageField.getText() + 1</code> ได้อะไร</p>`, answer: `<p><strong>"201"</strong> — getText() คืน String จึงเป็นการต่อข้อความ ต้อง <code>Integer.parseInt(ageField.getText().trim()) + 1</code> จึงได้ 21</p>` },
      ],
    },
    {
      num: "17.2", toc: "ตรวจข้อมูลว่างและรูปแบบ", title: "ตรวจข้อมูลว่าง รูปแบบ และช่วงค่า",
      blocks: [
        { type: "table", title: "การตรวจที่พบบ่อย", head: ["ตรวจ", "วิธี"], rows: [
          ["ว่าง", "<code>text.trim().isEmpty()</code> หรือ <code>text.isBlank()</code>"],
          ["เป็นจำนวนเต็ม/ทศนิยม", "<code>Integer.parseInt</code> / <code>Double.parseDouble</code> ใน try-catch"],
          ["ช่วงค่า", "<code>value &gt;= min &amp;&amp; value &lt;= max</code>"],
          ["ความยาว", "<code>text.length() &gt;= 8</code>"],
          ["รูปแบบ (เช่น อีเมล, เบอร์โทร)", "<code>text.matches(\"regex\")</code>"],
          ["เลือกแล้วหรือยัง", "<code>combo.getSelectedIndex() &gt; 0</code> (ถ้ารายการแรกคือ “-- เลือก --”), radio ใด isSelected"],
        ] },
        { type: "run", title: "ฟังก์ชันตรวจข้อมูลทดสอบได้โดยไม่ต้องมีหน้าจอ", level: "พื้นฐาน",
          concept: "เขียนการตรวจเป็นเมธอด static ที่รับ String และคืนข้อความ error (หรือ null ถ้าถูกต้อง) แล้วทดสอบใน console ก่อนนำไปใช้กับ GUI",
          code: j`
            public class Validators {
                public static void main(String[] args) {
                    String[] ages = {"20", "", "  ", "abc", "-3", "150", " 45 "};
                    for (String a : ages) {
                        String err = checkAge(a);
                        System.out.printf("%-8s -> %s%n", "\"" + a + "\"", err == null ? "OK" : err);
                    }
                }

                static String checkAge(String text) {
                    if (text == null || text.isBlank()) return "Age is required";
                    int age;
                    try {
                        age = Integer.parseInt(text.trim());
                    } catch (NumberFormatException e) {
                        return "Age must be a whole number";
                    }
                    if (age < 1 || age > 120) return "Age must be between 1 and 120";
                    return null;
                }
            }`,
          steps: ["ตรวจตามลำดับ: ว่าง → แปลงชนิด → ช่วงค่า", "คืน null หมายถึงผ่าน", "\" 45 \" ผ่านเพราะ trim ก่อน parse", "ทดสอบได้ครบทุกกรณีโดยไม่ต้องคลิกหน้าจอ (บทที่ 10)"] },
        { type: "run", title: "ตรวจรูปแบบด้วย regular expression", level: "ต่อยอด",
          concept: "<code>String.matches(regex)</code> ตรวจว่าข้อความทั้งก้อนตรงกับรูปแบบ — ใช้กับอีเมล รหัสนักศึกษา เบอร์โทร",
          code: j`
            public class PatternCheck {
                static final String EMAIL = "[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+";
                static final String PHONE = "0\\d{1,2}-?\\d{3}-?\\d{4}";
                static final String STUDENT_ID = "66\\d{6}";

                public static void main(String[] args) {
                    test("email", EMAIL, "mali@mail.com", "mali.j@uni.ac.th", "mali@", "@mail.com");
                    test("phone", PHONE, "081-234-5678", "0812345678", "02-123-4567", "81234");
                    test("id", STUDENT_ID, "66012345", "65012345", "6601234");
                }

                static void test(String label, String regex, String... samples) {
                    for (String s : samples) {
                        System.out.printf("%-6s %-18s %s%n", label, s, s.matches(regex) ? "valid" : "INVALID");
                    }
                }
            }`,
          steps: ["<code>\\\\w</code> = ตัวอักษร/ตัวเลข/_, <code>+</code> = หนึ่งตัวขึ้นไป, <code>\\\\d{3}</code> = ตัวเลข 3 ตัว, <code>-?</code> = มีขีดหรือไม่ก็ได้", "รหัสนักศึกษาต้องขึ้นต้น 66 ตามด้วยตัวเลข 6 ตัวพอดี", "regex สำหรับอีเมลแบบง่ายนี้พอสำหรับฟอร์มทั่วไป (ไม่ครอบคลุมทุกกรณีตามมาตรฐาน)", "<code>String...</code> คือ varargs: ส่ง argument กี่ตัวก็ได้ ได้เป็นอาเรย์"] },
        { type: "run", title: "ตรวจหลายช่องแล้วแสดง error ทั้งหมดในครั้งเดียว", level: "ประยุกต์", gui: true, actions: "type field:0 \ntype field:1 mali@\ntype field:2 abc\nclick Register\nshot\ntype field:0 Mali\ntype field:1 mali@mail.com\ntype field:2 19\nclick Register\nshot", captions: ["กรอกผิดทุกช่องแล้วคลิก Register", "แก้ให้ถูกแล้วคลิกอีกครั้ง"],
          concept: "รวบรวม error ทุกช่องใส่ list แล้วแสดงพร้อมกัน ผู้ใช้แก้ได้ในรอบเดียว — ดีกว่าบอกทีละข้อ",
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.util.ArrayList;

            public class MultiFieldValidation {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Register");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField name = new JTextField(14);
                        JTextField email = new JTextField(14);
                        JTextField age = new JTextField(14);
                        JLabel messages = new JLabel(" ");
                        JButton register = new JButton("Register");
                        register.addActionListener(e -> {
                            ArrayList<String> errors = new ArrayList<>();
                            if (name.getText().isBlank()) errors.add("Name is required");
                            if (!email.getText().trim().matches("[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+")) errors.add("Email format is invalid");
                            try {
                                int a = Integer.parseInt(age.getText().trim());
                                if (a < 15 || a > 99) errors.add("Age must be 15-99");
                            } catch (NumberFormatException ex) {
                                errors.add("Age must be a number");
                            }
                            if (errors.isEmpty()) {
                                messages.setForeground(new Color(0, 120, 0));
                                messages.setText("Registered " + name.getText().trim() + "!");
                            } else {
                                messages.setForeground(Color.RED);
                                messages.setText("<html>" + String.join("<br>", errors) + "</html>");
                            }
                            frame.pack();
                        });
                        JPanel form = new JPanel(new GridLayout(0, 2, 6, 6));
                        form.add(new JLabel("Name:")); form.add(name);
                        form.add(new JLabel("Email:")); form.add(email);
                        form.add(new JLabel("Age:")); form.add(age);
                        JPanel root = new JPanel(new BorderLayout(6, 8));
                        root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        root.add(form, BorderLayout.NORTH);
                        root.add(messages, BorderLayout.CENTER);
                        root.add(register, BorderLayout.SOUTH);
                        frame.setContentPane(root);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ตรวจทุกช่องโดยไม่หยุดที่ error แรก", "แสดง error หลายบรรทัดด้วย HTML &lt;br&gt; ใน JLabel", "frame.pack() ปรับขนาดหน้าต่างตามข้อความใหม่", "เมื่อถูกทั้งหมดแสดงข้อความสีเขียว"] },
        { type: "check", title: "ลำดับการตรวจ", html: `<p>ทำไมต้องตรวจ “ว่าง” ก่อน “แปลงเป็นตัวเลข” และตรวจ “แปลงได้” ก่อน “ช่วงค่า”</p>`, answer: `<p>เพื่อให้ข้อความ error ตรงกับปัญหาจริง (ช่องว่างควรได้ “กรุณากรอก” ไม่ใช่ “ไม่ใช่ตัวเลข”) และการตรวจช่วงค่าทำได้ก็ต่อเมื่อมีตัวเลขแล้วเท่านั้น</p>` },
      ],
    },
    {
      num: "17.3", toc: "แจ้ง error ให้ผู้ใช้", title: "แจ้ง error ให้ผู้ใช้: JOptionPane และข้อความในฟอร์ม",
      blocks: [
        { type: "table", head: ["เมธอด", "ใช้เมื่อ", "คืนค่า"], rows: [
          ["<code>showMessageDialog(parent, msg, title, type)</code>", "แจ้งข้อมูล/คำเตือน/error", "-"],
          ["<code>showConfirmDialog(parent, msg, title, options)</code>", "ถามยืนยัน Yes/No(/Cancel)", "int เช่น YES_OPTION"],
          ["<code>showInputDialog(parent, msg)</code>", "ถามข้อความสั้น ๆ หนึ่งค่า", "String หรือ null ถ้ากด Cancel"],
        ] },
        { type: "run", title: "dialog แจ้ง error", level: "พื้นฐาน", gui: true, actions: "type field:0 12a\nclick Check",
          concept: "<code>JOptionPane.ERROR_MESSAGE</code> แสดงไอคอน error — dialog เป็น modal: ผู้ใช้ต้องกด OK ก่อนจึงกลับไปที่หน้าต่างหลักได้",
          code: j`
            import javax.swing.*;

            public class ErrorDialog {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Quantity");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField qty = new JTextField(6);
                        JButton check = new JButton("Check");
                        check.addActionListener(e -> {
                            try {
                                int q = Integer.parseInt(qty.getText().trim());
                                JOptionPane.showMessageDialog(frame, "Quantity = " + q, "OK", JOptionPane.INFORMATION_MESSAGE);
                            } catch (NumberFormatException ex) {
                                JOptionPane.showMessageDialog(frame, "'" + qty.getText() + "' is not a whole number.",
                                    "Invalid quantity", JOptionPane.ERROR_MESSAGE);
                                qty.requestFocusInWindow();
                                qty.selectAll();
                            }
                        });
                        JPanel p = new JPanel();
                        p.add(new JLabel("Quantity:"));
                        p.add(qty);
                        p.add(check);
                        frame.add(p);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["parent = frame ทำให้ dialog อยู่กลางหน้าต่างหลัก", "ภาพแสดงทั้งหน้าต่างหลักและ dialog ที่เปิดขึ้น", "หลังปิด dialog: โฟกัสกลับไปที่ช่องและเลือกข้อความทั้งหมด ผู้ใช้พิมพ์ทับได้ทันที"] },
        { type: "run", title: "ยืนยันก่อนลบด้วย showConfirmDialog", level: "ต่อยอด", gui: true, actions: "click Delete all",
          concept: "การกระทำที่ย้อนกลับไม่ได้ควรถามยืนยัน ตรวจค่าที่คืนกับ <code>JOptionPane.YES_OPTION</code>",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ConfirmDelete {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Notes");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        DefaultListModel<String> notes = new DefaultListModel<>();
                        notes.addElement("Buy milk");
                        notes.addElement("Lab report");
                        notes.addElement("Call mom");
                        JButton deleteAll = new JButton("Delete all");
                        deleteAll.addActionListener(e -> {
                            int answer = JOptionPane.showConfirmDialog(frame,
                                "Delete all " + notes.size() + " notes? This cannot be undone.",
                                "Confirm delete", JOptionPane.YES_NO_OPTION, JOptionPane.WARNING_MESSAGE);
                            if (answer == JOptionPane.YES_OPTION) {
                                notes.clear();
                            }
                        });
                        frame.add(new JScrollPane(new JList<>(notes)), BorderLayout.CENTER);
                        frame.add(deleteAll, BorderLayout.SOUTH);
                        frame.setSize(260, 160);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ข้อความบอกผลกระทบชัดเจน (จำนวนที่จะลบ, ย้อนกลับไม่ได้)", "WARNING_MESSAGE แสดงไอคอนเตือน", "ลบเฉพาะเมื่อผู้ใช้กด Yes — กด No หรือปิด dialog จะไม่ลบ"] },
        { type: "run", title: "แสดง error ข้างช่องและเปลี่ยนสีขอบ", level: "ประยุกต์", gui: true, actions: "type field:0 ab\ntype field:1 12345\nclick Sign up\nshot",
          concept: "dialog ขัดจังหวะผู้ใช้ทุกครั้ง ฟอร์มยาวนิยมแสดง error <strong>ข้างช่องที่ผิด</strong>และไฮไลต์ขอบสีแดงแทน — ผู้ใช้เห็นทุกปัญหาพร้อมกัน",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class InlineErrors {
                static final Color ERROR = new Color(200, 30, 30);

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Sign up");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField user = new JTextField(12);
                        JPasswordField pass = new JPasswordField(12);
                        JLabel userErr = errorLabel();
                        JLabel passErr = errorLabel();
                        JButton signUp = new JButton("Sign up");
                        signUp.addActionListener(e -> {
                            String u = user.getText().trim();
                            String p = new String(pass.getPassword());
                            boolean ok = mark(user, userErr, u.length() >= 4 ? null : "at least 4 characters");
                            ok &= mark(pass, passErr, p.length() >= 8 && p.matches(".*\\d.*") && p.matches(".*[A-Za-z].*")
                                ? null : "8+ chars with letters and digits");
                            if (ok) JOptionPane.showMessageDialog(frame, "Welcome, " + u + "!");
                        });
                        JPanel form = new JPanel(new GridLayout(0, 3, 6, 6));
                        form.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        form.add(new JLabel("Username:")); form.add(user); form.add(userErr);
                        form.add(new JLabel("Password:")); form.add(pass); form.add(passErr);
                        form.add(new JLabel()); form.add(signUp);
                        frame.setContentPane(form);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }

                static JLabel errorLabel() {
                    JLabel l = new JLabel(" ");
                    l.setForeground(ERROR);
                    return l;
                }

                static boolean mark(JTextField field, JLabel errorLabel, String error) {
                    if (error == null) {
                        field.setBorder(UIManager.getBorder("TextField.border"));
                        errorLabel.setText(" ");
                        return true;
                    }
                    field.setBorder(BorderFactory.createLineBorder(ERROR, 2));
                    errorLabel.setText(error);
                    return false;
                }
            }`,
          steps: ["เมธอด mark() ทำงานสองทาง: ถ้า error เป็น null คืนสภาพปกติ ถ้าไม่ใช่ทำขอบแดง+ข้อความ", "<code>ok &amp;= ...</code> ทำให้ตรวจทุกช่องแม้ช่องแรกผิด", "<code>\".*\\\\d.*\"</code> = มีตัวเลขอย่างน้อยหนึ่งตัวที่ใดก็ได้", "อ่านรหัสผ่านด้วย getPassword() แล้วแปลงเป็น String"] },
        { type: "run", title: "showInputDialog ถามค่าเดียวพร้อมตรวจซ้ำ", level: "ท้าทาย", gui: true, actions: "click Set budget\ntype field:0 -50\nclick OK",
          concept: "showInputDialog คืน String หรือ <code>null</code> เมื่อผู้ใช้กด Cancel — ต้องจัดการทั้งสองกรณี และวนถามใหม่เมื่อค่าไม่ถูกต้อง ภาพแสดง dialog error หลังป้อน −50",
          code: j`
            import javax.swing.*;

            public class BudgetPrompt {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Budget");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel budget = new JLabel("Budget: not set");
                        JButton set = new JButton("Set budget");
                        set.addActionListener(e -> {
                            Double value = askPositiveNumber(frame, "Monthly budget (baht):");
                            if (value != null) budget.setText(String.format("Budget: %,.2f", value));
                        });
                        JPanel p = new JPanel();
                        p.add(budget);
                        p.add(set);
                        frame.add(p);
                        frame.pack();
                        frame.setVisible(true);
                    });
                }

                static Double askPositiveNumber(JFrame parent, String prompt) {
                    while (true) {
                        String text = JOptionPane.showInputDialog(parent, prompt);
                        if (text == null) return null;
                        try {
                            double v = Double.parseDouble(text.trim());
                            if (v > 0) return v;
                            JOptionPane.showMessageDialog(parent, "Please enter a number greater than 0", "Invalid", JOptionPane.WARNING_MESSAGE);
                        } catch (NumberFormatException ex) {
                            JOptionPane.showMessageDialog(parent, "'" + text + "' is not a number", "Invalid", JOptionPane.WARNING_MESSAGE);
                        }
                    }
                }
            }`,
          steps: ["คืน Double (wrapper) เพื่อให้คืน null ได้เมื่อยกเลิก", "วน while(true) จนได้ค่าถูกหรือผู้ใช้ยกเลิก", "ภาพ: ผู้ใช้ป้อน −50 แล้วกด OK → dialog เตือนเปิดซ้อน (ซึ่งเมื่อกด OK จะถามใหม่อีกรอบ)"] },
        { type: "note", title: "เขียนข้อความ error ที่ดี", html: `<ul><li>บอก<strong>ช่องไหน</strong>: “Email format is invalid” ไม่ใช่ “Invalid input”</li><li>บอก<strong>ต้องทำอย่างไร</strong>: “Age must be 15-99” ไม่ใช่ “Wrong age”</li><li>ไม่โทษผู้ใช้ และไม่แสดง stack trace หรือชื่อ exception</li><li>เก็บค่าที่ผู้ใช้พิมพ์ไว้ ไม่ล้างฟอร์มเมื่อผิด ให้แก้เฉพาะจุด</li></ul>` },
      ],
    },
    {
      num: "17.4", toc: "แยก validation เป็น method", title: "แยก validation เป็นเมธอดและคลาส",
      blocks: [
        { type: "p", html: `เมื่อฟอร์มใหญ่ขึ้น listener ที่อ่าน-ตรวจ-บันทึกในที่เดียวจะยาวและทดสอบยาก แนวทางที่ดีคือ (1) อ่านค่าจากหน้าจอเป็นออบเจ็กต์ข้อมูล (2) ส่งให้เมธอด/คลาส validator คืนรายการ error (3) listener มีหน้าที่แค่เชื่อมสองส่วนและแสดงผล` },
        { type: "run", title: "Validator แยกจาก UI พร้อมชุดทดสอบ", level: "ประยุกต์",
          concept: "คลาส <code>BookingValidator</code> ไม่รู้จัก Swing เลย จึงทดสอบด้วย console ได้ทุกกรณี แล้วค่อยนำไปใช้ในฟอร์ม",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class BookingValidatorTest {
                public static void main(String[] args) {
                    test("Mali", "2", "3", true);
                    test("", "2", "3", true);
                    test("Beam", "0", "3", false);
                    test("Nida", "5", "x", true);
                    test("Ploy", "11", "31", false);
                }

                static void test(String name, String guests, String nights, boolean breakfast) {
                    List<String> errors = BookingValidator.validate(name, guests, nights);
                    System.out.printf("%-5s g=%-3s n=%-3s -> %s%n", name, guests, nights, errors.isEmpty() ? "OK" : errors);
                }
            }

            class BookingValidator {
                static List<String> validate(String name, String guests, String nights) {
                    List<String> errors = new ArrayList<>();
                    if (name.isBlank()) errors.add("name required");
                    Integer g = parseInRange(guests, 1, 10, "guests", errors);
                    Integer n = parseInRange(nights, 1, 30, "nights", errors);
                    if (g != null && n != null && g * n > 60) errors.add("too many guest-nights");
                    return errors;
                }

                private static Integer parseInRange(String text, int min, int max, String label, List<String> errors) {
                    try {
                        int v = Integer.parseInt(text.trim());
                        if (v < min || v > max) {
                            errors.add(label + " must be " + min + "-" + max);
                            return null;
                        }
                        return v;
                    } catch (NumberFormatException e) {
                        errors.add(label + " must be a number");
                        return null;
                    }
                }
            }`,
          steps: ["parseInRange ใช้ซ้ำได้กับทุกช่องตัวเลข และเพิ่ม error ลงรายการที่ส่งมา", "คืน Integer (null เมื่อผิด) เพื่อให้ตรวจกฎข้ามช่องได้เฉพาะเมื่อทั้งคู่ถูก", "กฎข้ามช่อง: guests × nights ไม่เกิน 60", "ชุดทดสอบครอบคลุมกรณีปกติ ว่าง ค่าขอบ รูปแบบผิด และกฎข้ามช่อง"] },
        { type: "run", title: "ใช้ validator ในฟอร์มจองห้องพัก", level: "ท้าทาย", gui: true, actions: "type field:0 Mali\ntype field:1 2\ntype field:2 3\nclick Book\nshot", captions: ["กรอกถูกต้องแล้วคลิก Book"],
          concept: "listener สั้นลงมาก: อ่านค่า → เรียก validate → แสดง error หรือคำนวณราคา",
          code: j`
            import javax.swing.*;
            import java.awt.*;
            import java.util.ArrayList;
            import java.util.List;

            public class BookingForm {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Hotel booking");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JTextField name = new JTextField(12);
                        JTextField guests = new JTextField(4);
                        JTextField nights = new JTextField(4);
                        JCheckBox breakfast = new JCheckBox("Breakfast (+250/guest/night)");
                        JLabel result = new JLabel(" ");
                        JButton book = new JButton("Book");
                        book.addActionListener(e -> {
                            List<String> errors = BookingRules.validate(name.getText(), guests.getText(), nights.getText());
                            if (!errors.isEmpty()) {
                                result.setForeground(Color.RED);
                                result.setText("Please fix: " + String.join(", ", errors));
                                return;
                            }
                            int g = Integer.parseInt(guests.getText().trim());
                            int n = Integer.parseInt(nights.getText().trim());
                            double total = BookingRules.price(g, n, breakfast.isSelected());
                            result.setForeground(new Color(0, 110, 0));
                            result.setText(String.format("%s: %d guests x %d nights = %,.2f baht", name.getText().trim(), g, n, total));
                        });
                        JPanel form = new JPanel(new GridLayout(0, 2, 6, 6));
                        form.add(new JLabel("Name:")); form.add(name);
                        form.add(new JLabel("Guests (1-10):")); form.add(guests);
                        form.add(new JLabel("Nights (1-30):")); form.add(nights);
                        form.add(breakfast); form.add(book);
                        JPanel root = new JPanel(new BorderLayout(6, 8));
                        root.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        root.add(form, BorderLayout.CENTER);
                        root.add(result, BorderLayout.SOUTH);
                        frame.setContentPane(root);
                        frame.setSize(420, 190);
                        frame.setVisible(true);
                    });
                }
            }

            class BookingRules {
                static List<String> validate(String name, String guests, String nights) {
                    List<String> errors = new ArrayList<>();
                    if (name.isBlank()) errors.add("name");
                    if (!inRange(guests, 1, 10)) errors.add("guests 1-10");
                    if (!inRange(nights, 1, 30)) errors.add("nights 1-30");
                    return errors;
                }

                static boolean inRange(String text, int min, int max) {
                    try {
                        int v = Integer.parseInt(text.trim());
                        return v >= min && v <= max;
                    } catch (NumberFormatException e) {
                        return false;
                    }
                }

                static double price(int guests, int nights, boolean breakfast) {
                    double room = 1200 * nights * Math.ceil(guests / 2.0);
                    return room + (breakfast ? 250.0 * guests * nights : 0);
                }
            }`,
          steps: ["BookingRules รวมกฎทั้งหมด (ตรวจ + คิดราคา) ไม่มีโค้ด Swing", "ห้องพักได้ 2 คน: จำนวนห้อง = ceil(guests / 2)", "2 คน 3 คืน = 1 ห้อง × 3 คืน × 1200 = 3,600"] },
      ],
    },
    {
      num: "17.5", toc: "ล้างและ reset form", title: "ล้างและ reset ฟอร์ม",
      blocks: [
        { type: "p", html: `หลังบันทึกสำเร็จ หรือเมื่อผู้ใช้กดปุ่ม Clear ควรคืนทุก component เป็นค่าเริ่มต้น: ช่องข้อความว่าง, combo กลับรายการแรก, radio กลับค่า default, check box ไม่ติ๊ก, ล้างข้อความ error และย้ายโฟกัสไปช่องแรก รวมไว้ในเมธอด <code>resetForm()</code> เดียวเพื่อไม่ลืมช่องใด` },
        { type: "run", title: "บันทึกลงรายการแล้ว reset", level: "ท้าทาย", gui: true, actions: "type field:0 Mali\nselect combo:0 2\nclick Gold\nclick Save\ntype field:0 Beam\nclick Save\nshot", captions: ["บันทึก Mali (Engineering, Gold) แล้วบันทึก Beam (ค่าเริ่มต้น)"],
          concept: "Save: ตรวจ → เพิ่มลง JList → ถ้าสำเร็จ resetForm() / Clear: resetForm() ทันที — ผู้ใช้กรอกคนถัดไปได้เลย",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class MemberEntry {
                private final JTextField name = new JTextField(12);
                private final JComboBox<String> faculty = new JComboBox<>(new String[]{"Science", "Arts", "Engineering"});
                private final JRadioButton basic = new JRadioButton("Basic", true);
                private final JRadioButton gold = new JRadioButton("Gold");
                private final JLabel error = new JLabel(" ");
                private final DefaultListModel<String> saved = new DefaultListModel<>();

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> new MemberEntry().show());
                }

                private void show() {
                    JFrame frame = new JFrame("Members");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    ButtonGroup g = new ButtonGroup();
                    g.add(basic);
                    g.add(gold);
                    error.setForeground(Color.RED);
                    JButton save = new JButton("Save");
                    JButton clear = new JButton("Clear");
                    save.addActionListener(e -> save());
                    clear.addActionListener(e -> resetForm());
                    JPanel form = new JPanel(new GridLayout(0, 2, 4, 4));
                    form.add(new JLabel("Name:")); form.add(name);
                    form.add(new JLabel("Faculty:")); form.add(faculty);
                    JPanel plan = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
                    plan.add(basic); plan.add(gold);
                    form.add(new JLabel("Plan:")); form.add(plan);
                    form.add(save); form.add(clear);
                    JPanel left = new JPanel(new BorderLayout(0, 4));
                    left.add(form, BorderLayout.NORTH);
                    left.add(error, BorderLayout.CENTER);
                    JPanel root = new JPanel(new BorderLayout(8, 0));
                    root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    root.add(left, BorderLayout.WEST);
                    JScrollPane list = new JScrollPane(new JList<>(saved));
                    list.setPreferredSize(new Dimension(220, 120));
                    root.add(list, BorderLayout.CENTER);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                }

                private void save() {
                    String n = name.getText().trim();
                    if (n.isEmpty()) {
                        error.setText("Name is required");
                        name.requestFocusInWindow();
                        return;
                    }
                    String p = gold.isSelected() ? "Gold" : "Basic";
                    saved.addElement(n + " - " + faculty.getSelectedItem() + " - " + p);
                    resetForm();
                }

                private void resetForm() {
                    name.setText("");
                    faculty.setSelectedIndex(0);
                    basic.setSelected(true);
                    error.setText(" ");
                    name.requestFocusInWindow();
                }
            }`,
          steps: ["Mali ถูกบันทึกพร้อม Engineering และ Gold", "resetForm() คืนทุกช่องเป็นค่าเริ่มต้นทันที", "Beam ถูกบันทึกด้วยค่าเริ่มต้น (Science, Basic) — พิสูจน์ว่า reset ทำงาน", "ไม่ล้างฟอร์มเมื่อบันทึกไม่สำเร็จ"] },
      ],
    },
  ],
  exercisesIntro: "ทุกข้อต้องตรวจข้อมูลก่อนใช้งานและแจ้งปัญหาให้ผู้ใช้ ภาพตัวอย่างได้จากการรันเฉลยพร้อมจำลองการกรอกข้อมูลตามคำบรรยาย ลองป้อนทั้งข้อมูลถูกและผิดเพื่อทดสอบงานของตนเอง",
  exercises: [
    { level: 1, title: "ตรวจช่องว่างก่อนทักทาย", html: `<p>หน้าต่างมีช่องกรอกชื่อและปุ่ม Greet ถ้าช่องว่าง (หรือมีแต่ช่องว่าง) ให้แสดง dialog error “Please enter your name” ถ้าไม่ว่างให้แสดง dialog ข้อความ “Hello, ชื่อ!”</p>`,
      spec: ["ใช้ isBlank()", "ใช้ JOptionPane.ERROR_MESSAGE และ INFORMATION_MESSAGE", "ภาพตัวอย่าง: กด Greet ทั้งที่ช่องมีแต่ช่องว่าง"], gui: true, actions: "type field:0    \nclick Greet",
      solution: j`
        import javax.swing.*;

        public class GreetCheck {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Greet");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField name = new JTextField(10);
                    JButton greet = new JButton("Greet");
                    greet.addActionListener(e -> {
                        if (name.getText().isBlank()) {
                            JOptionPane.showMessageDialog(frame, "Please enter your name", "Missing name", JOptionPane.ERROR_MESSAGE);
                        } else {
                            JOptionPane.showMessageDialog(frame, "Hello, " + name.getText().trim() + "!", "Greeting", JOptionPane.INFORMATION_MESSAGE);
                        }
                    });
                    JPanel p = new JPanel();
                    p.add(new JLabel("Name:"));
                    p.add(name);
                    p.add(greet);
                    frame.add(p);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 1, title: "เมธอดตรวจคะแนน (ทดสอบใน console)", html: `<p>เขียนเมธอด <code>static String checkScore(String text)</code> คืน <code>null</code> ถ้าเป็นจำนวนเต็ม 0–100 มิฉะนั้นคืนข้อความ error ที่เหมาะสม 3 แบบ: ว่าง / ไม่ใช่ตัวเลข / นอกช่วง แล้วทดสอบกับข้อมูลอย่างน้อย 7 ค่าใน main</p>`,
      spec: ["trim ก่อนตรวจ", "ทดสอบค่าขอบ 0, 100, −1, 101", "แสดงผลเป็นตาราง"],
      solution: j`
        public class ScoreValidator {
            public static void main(String[] args) {
                String[] inputs = {"85", "0", "100", "-1", "101", "", "eighty", " 72 "};
                for (String in : inputs) {
                    String err = checkScore(in);
                    System.out.printf("%-10s %s%n", "\"" + in + "\"", err == null ? "OK" : err);
                }
            }

            static String checkScore(String text) {
                if (text == null || text.isBlank()) return "Score is required";
                try {
                    int s = Integer.parseInt(text.trim());
                    if (s < 0 || s > 100) return "Score must be 0-100";
                    return null;
                } catch (NumberFormatException e) {
                    return "Score must be a whole number";
                }
            }
        }` },
    { level: 2, title: "แปลงสกุลเงินพร้อมตรวจข้อมูล", html: `<p>หน้าต่างแปลงเงินบาทเป็นสกุลที่เลือกจาก combo box (USD 35.5, EUR 38.2, JPY 0.24 บาทต่อหน่วย) ช่องจำนวนเงินต้องเป็นตัวเลขมากกว่า 0 ถ้าผิดให้แสดงข้อความสีแดงใต้ฟอร์ม (ไม่ใช้ dialog) และทำให้ขอบช่องเป็นสีแดง ถ้าถูกแสดงผลลัพธ์สีเขียว</p>`,
      spec: ["อัตราแลกเปลี่ยนเก็บในอาเรย์คู่ขนานกับชื่อสกุลเงิน", "ผลลัพธ์ทศนิยม 2 ตำแหน่งพร้อมจุลภาค", "ช่องกลับเป็นขอบปกติเมื่อแก้ถูกแล้ว"], gui: true, actions: "type field:0 abc\nclick Convert\nshot\ntype field:0 10000\nselect combo:0 1\nclick Convert\nshot", captions: ["ป้อน abc", "ป้อน 10000 เลือก EUR"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class CurrencyForm {
            public static void main(String[] args) {
                String[] codes = {"USD", "EUR", "JPY"};
                double[] rates = {35.5, 38.2, 0.24};
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Exchange");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField amount = new JTextField(10);
                    JComboBox<String> currency = new JComboBox<>(codes);
                    JButton convert = new JButton("Convert");
                    JLabel result = new JLabel(" ");
                    javax.swing.border.Border normal = amount.getBorder();
                    convert.addActionListener(e -> {
                        try {
                            double baht = Double.parseDouble(amount.getText().trim());
                            if (baht <= 0) throw new NumberFormatException();
                            int i = currency.getSelectedIndex();
                            amount.setBorder(normal);
                            result.setForeground(new Color(0, 120, 0));
                            result.setText(String.format("%,.2f THB = %,.2f %s", baht, baht / rates[i], codes[i]));
                        } catch (NumberFormatException ex) {
                            amount.setBorder(BorderFactory.createLineBorder(Color.RED, 2));
                            result.setForeground(Color.RED);
                            result.setText("Amount must be a number greater than 0");
                        }
                    });
                    JPanel top = new JPanel();
                    top.add(new JLabel("THB:"));
                    top.add(amount);
                    top.add(currency);
                    top.add(convert);
                    JPanel root = new JPanel(new BorderLayout());
                    root.setBorder(BorderFactory.createEmptyBorder(6, 6, 6, 6));
                    root.add(top, BorderLayout.CENTER);
                    root.add(result, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }`, explain: "โยน NumberFormatException เองเมื่อค่า ≤ 0 เพื่อใช้ catch เดียวกันแสดงข้อความ — เป็นทางลัดที่ยอมรับได้ในฟอร์มเล็ก ๆ" },
    { level: 2, title: "ยืนยันก่อนออกจากโปรแกรม", html: `<p>สร้างโปรแกรมบันทึกโน้ต (JTextArea) ที่มีปุ่ม <code>Exit</code> ถ้ามีข้อความในโน้ต ให้ถามยืนยันด้วย showConfirmDialog แบบ YES_NO_CANCEL: Yes = “บันทึก” (แสดง dialog ว่าบันทึกแล้วจำนวนกี่ตัวอักษร แล้วปิด), No = ปิดโดยไม่บันทึก, Cancel = กลับไปแก้ต่อ ถ้าโน้ตว่างให้ปิดทันที</p>`,
      spec: ["ใช้ frame.dispose() แทน System.exit เพื่อปิดหน้าต่าง", "จัดการทั้ง YES_OPTION, NO_OPTION และกรณีอื่น (Cancel/ปิด dialog)", "ภาพตัวอย่าง: พิมพ์โน้ตแล้วกด Exit"], gui: true, actions: "type area:0 Remember to submit lab 17 on Friday.\nclick Exit",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class ConfirmExit {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Notes");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextArea notes = new JTextArea(5, 24);
                    notes.setLineWrap(true);
                    JButton exit = new JButton("Exit");
                    exit.addActionListener(e -> {
                        if (notes.getText().isBlank()) {
                            frame.dispose();
                            return;
                        }
                        int answer = JOptionPane.showConfirmDialog(frame, "Save your note before exit?", "Unsaved note",
                            JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.QUESTION_MESSAGE);
                        if (answer == JOptionPane.YES_OPTION) {
                            JOptionPane.showMessageDialog(frame, "Saved " + notes.getText().length() + " characters.");
                            frame.dispose();
                        } else if (answer == JOptionPane.NO_OPTION) {
                            frame.dispose();
                        }
                    });
                    frame.add(new JScrollPane(notes), BorderLayout.CENTER);
                    frame.add(exit, BorderLayout.SOUTH);
                    frame.pack();
                    frame.setVisible(true);
                });
            }
        }` },
    { level: 2, title: "ฟอร์มสมัครพร้อม error ข้างช่อง", html: `<p>ฟอร์มมีช่อง Username (4–12 ตัว ตัวอักษร/ตัวเลขเท่านั้น), Email (รูปแบบอีเมล), Phone (รูปแบบ 0XX-XXX-XXXX) และ check box “I accept the terms” (ต้องติ๊ก) แต่ละช่องมี label error สีแดงอยู่ทางขวา ปุ่ม Submit ตรวจทุกช่องพร้อมกัน แสดง error ทุกช่องที่ผิด และแสดง dialog “Registered!” เมื่อถูกทั้งหมด</p>`,
      spec: ["ใช้ regex: <code>[A-Za-z0-9]{4,12}</code>, รูปแบบอีเมลจากหัวข้อ 17.2, <code>0\\\\d{2}-\\\\d{3}-\\\\d{4}</code>", "เขียนเมธอด <code>boolean show(JLabel err, String msg)</code> ที่ตั้งข้อความและคืนว่าผ่านหรือไม่", "ภาพตัวอย่าง: username สั้นเกิน, อีเมลถูก, เบอร์ผิด, ไม่ติ๊ก"], gui: true, actions: "type field:0 ab\ntype field:1 nida@mail.com\ntype field:2 0812345678\nclick Submit\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class SignupForm {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Sign up");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField user = new JTextField(12), email = new JTextField(12), phone = new JTextField(12);
                    JCheckBox terms = new JCheckBox("I accept the terms");
                    JLabel eUser = err(), eEmail = err(), ePhone = err(), eTerms = err();
                    JButton submit = new JButton("Submit");
                    submit.addActionListener(e -> {
                        boolean ok = show(eUser, user.getText().trim().matches("[A-Za-z0-9]{4,12}") ? null : "4-12 letters/digits");
                        ok &= show(eEmail, email.getText().trim().matches("[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+") ? null : "invalid email");
                        ok &= show(ePhone, phone.getText().trim().matches("0\\d{2}-\\d{3}-\\d{4}") ? null : "use 0XX-XXX-XXXX");
                        ok &= show(eTerms, terms.isSelected() ? null : "required");
                        frame.pack();
                        if (ok) JOptionPane.showMessageDialog(frame, "Registered!");
                    });
                    JPanel form = new JPanel(new GridLayout(0, 3, 6, 6));
                    form.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                    form.add(new JLabel("Username:")); form.add(user); form.add(eUser);
                    form.add(new JLabel("Email:")); form.add(email); form.add(eEmail);
                    form.add(new JLabel("Phone:")); form.add(phone); form.add(ePhone);
                    form.add(new JLabel()); form.add(terms); form.add(eTerms);
                    form.add(new JLabel()); form.add(submit);
                    frame.setContentPane(form);
                    frame.pack();
                    frame.setVisible(true);
                });
            }

            static JLabel err() {
                JLabel l = new JLabel(" ");
                l.setForeground(Color.RED);
                return l;
            }

            static boolean show(JLabel label, String message) {
                label.setText(message == null ? " " : message);
                return message == null;
            }
        }` },
    { level: 3, title: "ฟอร์มสั่งซื้อพร้อมสรุปและยืนยัน", html: `<p>ฟอร์มสั่งซื้อสินค้า: combo สินค้า (ตัวแรกเป็น “-- choose --”), spinner จำนวน 1–20, radio การจัดส่ง (Standard 40 / Express 90), ช่องที่อยู่ (JTextArea ต้องมีอย่างน้อย 10 ตัวอักษร), ช่องคูปอง (ว่างได้; ถ้ากรอกต้องเป็น <code>SAVE10</code> หรือ <code>SAVE50</code>) ปุ่ม <code>Place order</code> ตรวจข้อมูลทั้งหมด แล้วแสดง confirm dialog สรุปรายการและยอดเงิน ถ้ากด Yes ให้เพิ่มลงรายการคำสั่งซื้อ (JList) และ reset ฟอร์ม</p>`,
      spec: ["แยกคลาส <code>OrderRules</code> มีเมธอด validate และ total (ไม่มีโค้ด Swing)", "SAVE10 ลด 10% ของค่าสินค้า, SAVE50 ลด 50 บาท (ไม่ต่ำกว่า 0)", "เขียน resetForm()", "ภาพตัวอย่าง: เลือก Mouse จำนวน 1 ส่งแบบ Express กรอกที่อยู่ ใช้คูปอง SAVE10 แล้วกด Place order"], gui: true, actions: "select combo:0 2\nclick Express (90)\ntype area:0 99/1 Moo 4, Muang, Khon Kaen 40000\ntype field:1 SAVE10\nclick Place order",
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.ArrayList;
        import java.util.List;

        public class OrderForm {
            private final JComboBox<String> product = new JComboBox<>(OrderRules.NAMES);
            private final JSpinner qty = new JSpinner(new SpinnerNumberModel(1, 1, 20, 1));
            private final JRadioButton standard = new JRadioButton("Standard (40)", true);
            private final JRadioButton express = new JRadioButton("Express (90)");
            private final JTextArea address = new JTextArea(3, 20);
            private final JTextField coupon = new JTextField(8);
            private final DefaultListModel<String> orders = new DefaultListModel<>();
            private JFrame frame;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new OrderForm().show());
            }

            private void show() {
                frame = new JFrame("Order");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                ButtonGroup g = new ButtonGroup();
                g.add(standard);
                g.add(express);
                JButton place = new JButton("Place order");
                place.addActionListener(e -> place());
                JPanel form = new JPanel(new GridLayout(0, 2, 6, 6));
                form.add(new JLabel("Product:")); form.add(product);
                form.add(new JLabel("Quantity:")); form.add(qty);
                form.add(standard); form.add(express);
                form.add(new JLabel("Coupon:")); form.add(coupon);
                JScrollPane addr = new JScrollPane(address);
                addr.setBorder(BorderFactory.createTitledBorder("Address"));
                JPanel left = new JPanel(new BorderLayout(4, 4));
                left.add(form, BorderLayout.NORTH);
                left.add(addr, BorderLayout.CENTER);
                left.add(place, BorderLayout.SOUTH);
                JScrollPane list = new JScrollPane(new JList<>(orders));
                list.setBorder(BorderFactory.createTitledBorder("Orders"));
                list.setPreferredSize(new Dimension(200, 0));
                JPanel root = new JPanel(new BorderLayout(8, 0));
                root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                root.add(left, BorderLayout.CENTER);
                root.add(list, BorderLayout.EAST);
                frame.setContentPane(root);
                frame.pack();
                frame.setVisible(true);
            }

            private void place() {
                int p = product.getSelectedIndex();
                int q = (int) qty.getValue();
                int shipping = express.isSelected() ? 90 : 40;
                List<String> errors = OrderRules.validate(p, address.getText(), coupon.getText());
                if (!errors.isEmpty()) {
                    JOptionPane.showMessageDialog(frame, String.join("\n", errors), "Please fix", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                double total = OrderRules.total(p, q, shipping, coupon.getText().trim());
                String summary = String.format("%s x %d%nShipping: %d%nCoupon: %s%nTotal: %,.2f baht%n%nConfirm order?",
                    OrderRules.NAMES[p], q, shipping, coupon.getText().isBlank() ? "-" : coupon.getText().trim(), total);
                if (JOptionPane.showConfirmDialog(frame, summary, "Confirm", JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                    orders.addElement(String.format("%s x%d = %,.2f", OrderRules.NAMES[p], q, total));
                    resetForm();
                }
            }

            private void resetForm() {
                product.setSelectedIndex(0);
                qty.setValue(1);
                standard.setSelected(true);
                address.setText("");
                coupon.setText("");
            }
        }

        class OrderRules {
            static final String[] NAMES = {"-- choose --", "Keyboard", "Mouse", "Headset"};
            static final double[] PRICES = {0, 890, 390, 1290};

            static List<String> validate(int productIndex, String address, String coupon) {
                List<String> errors = new ArrayList<>();
                if (productIndex <= 0) errors.add("Choose a product");
                if (address.trim().length() < 10) errors.add("Address must be at least 10 characters");
                String c = coupon.trim();
                if (!c.isEmpty() && !c.equals("SAVE10") && !c.equals("SAVE50")) errors.add("Unknown coupon: " + c);
                return errors;
            }

            static double total(int productIndex, int qty, int shipping, String coupon) {
                double goods = PRICES[productIndex] * qty;
                if (coupon.equals("SAVE10")) goods *= 0.9;
                if (coupon.equals("SAVE50")) goods = Math.max(0, goods - 50);
                return goods + shipping;
            }
        }` },
    { level: 3, title: "แก้ไขรายการด้วยฟอร์มเดียว (Add / Update / Delete)", html: `<p>สร้างโปรแกรมจัดการรายชื่อสินค้า (ชื่อ, ราคา) ที่ใช้ฟอร์มเดียวสำหรับทั้งเพิ่มและแก้ไข: คลิกรายการใน JList แล้วข้อมูลจะถูกเติมลงฟอร์ม ปุ่ม <code>Add</code> เพิ่มใหม่, <code>Update</code> แก้รายการที่เลือก, <code>Delete</code> ลบ (ถามยืนยัน), <code>Clear</code> ล้างฟอร์มและยกเลิกการเลือก ปุ่ม Update/Delete ใช้ได้เฉพาะเมื่อมีรายการถูกเลือก ชื่อห้ามว่างและห้ามซ้ำ ราคาต้องเป็นตัวเลข &gt; 0</p>`,
      spec: ["เก็บข้อมูลจริงใน <code>ArrayList&lt;Product&gt;</code> และให้ DefaultListModel แสดงผล (เรียก refreshList หลังเปลี่ยนแปลง)", "ตรวจชื่อซ้ำโดยไม่นับรายการที่กำลังแก้ไขอยู่", "ใช้ ListSelectionListener เติมฟอร์ม", "ภาพตัวอย่าง: เพิ่ม 3 รายการ แล้วเลือกรายการที่ 2 แก้ราคาเป็น 450"], gui: true, actions: "type field:0 Pen\ntype field:1 15\nclick Add\ntype field:0 Bag\ntype field:1 390\nclick Add\ntype field:0 Ruler\ntype field:1 25\nclick Add\nselect list:0 1\ntype field:1 450\nclick Update\nselect list:0 1\nshot", captions: ["หลังแก้ราคา Bag เป็น 450"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.ArrayList;

        public class ProductEditor {
            private final ArrayList<Product> products = new ArrayList<>();
            private final DefaultListModel<String> model = new DefaultListModel<>();
            private final JList<String> list = new JList<>(model);
            private final JTextField name = new JTextField(10);
            private final JTextField price = new JTextField(6);
            private final JButton update = new JButton("Update");
            private final JButton delete = new JButton("Delete");
            private final JLabel status = new JLabel(" ");
            private JFrame frame;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new ProductEditor().show());
            }

            private void show() {
                frame = new JFrame("Products");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JButton add = new JButton("Add");
                JButton clear = new JButton("Clear");
                add.addActionListener(e -> save(-1));
                update.addActionListener(e -> save(list.getSelectedIndex()));
                delete.addActionListener(e -> delete());
                clear.addActionListener(e -> clearForm());
                list.addListSelectionListener(e -> {
                    int i = list.getSelectedIndex();
                    if (i >= 0) {
                        name.setText(products.get(i).name);
                        price.setText(String.valueOf(products.get(i).price));
                    }
                    updateButtons();
                });
                JPanel form = new JPanel(new GridLayout(0, 2, 4, 4));
                form.add(new JLabel("Name:")); form.add(name);
                form.add(new JLabel("Price:")); form.add(price);
                form.add(add); form.add(update);
                form.add(delete); form.add(clear);
                JPanel left = new JPanel(new BorderLayout(0, 6));
                left.add(form, BorderLayout.NORTH);
                left.add(status, BorderLayout.SOUTH);
                JScrollPane scroll = new JScrollPane(list);
                scroll.setPreferredSize(new Dimension(170, 150));
                JPanel root = new JPanel(new BorderLayout(8, 0));
                root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                root.add(left, BorderLayout.WEST);
                root.add(scroll, BorderLayout.CENTER);
                updateButtons();
                frame.setContentPane(root);
                frame.pack();
                frame.setVisible(true);
            }

            private void save(int editIndex) {
                String n = name.getText().trim();
                double p;
                try {
                    p = Double.parseDouble(price.getText().trim());
                } catch (NumberFormatException ex) {
                    p = -1;
                }
                String error = null;
                if (n.isEmpty()) error = "Name is required";
                else if (isDuplicate(n, editIndex)) error = "Name already exists";
                else if (p <= 0) error = "Price must be a number > 0";
                if (error != null) {
                    status.setForeground(Color.RED);
                    status.setText(error);
                    return;
                }
                if (editIndex < 0) products.add(new Product(n, p));
                else products.set(editIndex, new Product(n, p));
                status.setForeground(new Color(0, 110, 0));
                status.setText(editIndex < 0 ? "Added " + n : "Updated " + n);
                refreshList();
                clearForm();
            }

            private boolean isDuplicate(String n, int ignoreIndex) {
                for (int i = 0; i < products.size(); i++) {
                    if (i != ignoreIndex && products.get(i).name.equalsIgnoreCase(n)) return true;
                }
                return false;
            }

            private void delete() {
                int i = list.getSelectedIndex();
                if (i < 0) return;
                if (JOptionPane.showConfirmDialog(frame, "Delete " + products.get(i).name + "?", "Confirm",
                        JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                    products.remove(i);
                    refreshList();
                    clearForm();
                }
            }

            private void refreshList() {
                model.clear();
                for (Product p : products) model.addElement(String.format("%-8s %8.2f", p.name, p.price));
            }

            private void clearForm() {
                list.clearSelection();
                name.setText("");
                price.setText("");
                updateButtons();
            }

            private void updateButtons() {
                boolean selected = list.getSelectedIndex() >= 0;
                update.setEnabled(selected);
                delete.setEnabled(selected);
            }
        }

        class Product {
            final String name;
            final double price;

            Product(String name, double price) {
                this.name = name;
                this.price = price;
            }
        }`, explain: "ArrayList&lt;Product&gt; เป็นข้อมูลจริง (model) ส่วน DefaultListModel เป็นเพียงสิ่งที่แสดงบนจอ refreshList() สร้างรายการแสดงผลใหม่จากข้อมูลจริงทุกครั้ง ทำให้ทั้งสองไม่ขัดกัน" },
  ],
};
