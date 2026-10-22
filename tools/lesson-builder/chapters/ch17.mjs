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
        { type: "p", html: `แต่ละ component อ่านค่าด้วยเมธอดต่างกัน และได้ชนิดข้อมูลต่างกัน จำตารางนี้ไว้ใช้ทั้งบท` },
        { type: "table", head: ["Component", "อ่านค่า", "ชนิดที่ได้"], rows: [
          ["JTextField / JTextArea", "<code>getText()</code>", "String"],
          ["JPasswordField", "<code>getPassword()</code>", "char[] → <code>new String(...)</code>"],
          ["JComboBox&lt;String&gt;", "<code>getSelectedItem()</code> / <code>getSelectedIndex()</code>", "Object (cast เป็น String) / int"],
          ["JRadioButton / JCheckBox", "<code>isSelected()</code>", "boolean"],
          ["JSpinner (ตัวเลข)", "<code>(int) spinner.getValue()</code>", "Integer"],
          ["JSlider", "<code>getValue()</code>", "int"],
          ["JList", "<code>getSelectedValue()</code> / <code>getSelectedValuesList()</code>", "E / List&lt;E&gt;"],
        ] },
        { type: "p", html: `ตัวอย่างนี้อ่านค่าจากทุกชนิดเมื่อคลิก Preview แล้วแสดงรวมกัน ยังไม่ตรวจความถูกต้อง` },
        { type: "run", title: "อ่านทุกช่องแล้วสรุปใน text area", gui: true, actions: "type field:0 JHope Jung\nselect combo:0 1\nclick Female\ncheck Newsletter\nclick Preview\nshot", captions: ["กรอกข้อมูลแล้วคลิก Preview"],
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
                            String gender = male.isSelected() ? "Male"                            // ตรวจทีละปุ่ม
                                          : female.isSelected() ? "Female" : "(not chosen)";     // อาจยังไม่เลือกเลย
                            out.setText("Name: " + name.getText()                                 // String
                                + "\nYear: " + year.getSelectedItem() + " (index " + year.getSelectedIndex() + ")"
                                + "\nGender: " + gender
                                + "\nAge: " + (int) age.getValue()                                // Object → cast เป็น int
                                + "\nNewsletter: " + news.isSelected());                          // boolean
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
          },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: อ่านหลายรายการที่เลือกจาก JList", blocks: [
          { type: "p", html: `JList เลือกได้หลายรายการ (กด Ctrl ค้าง) อ่านด้วย <code>getSelectedValuesList()</code> ได้เป็น List ตัวอย่างนี้ตั้งค่าเลือกไว้ล่วงหน้าด้วย <code>setSelectedIndices</code>` },
          { type: "run", title: "วิชาเลือกที่ติ๊กไว้", gui: true, actions: "click Show selected\nshot",
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
                          list.setSelectedIndices(new int[]{0, 2, 3});              // เลือกไว้ก่อน 3 รายการ
                          JLabel result = new JLabel(" ");
                          JButton show = new JButton("Show selected");
                          show.addActionListener(e -> {
                              List<String> chosen = list.getSelectedValuesList();   // ทุกรายการที่เลือก
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
            },
        ] },
        { type: "check", title: "ชนิดที่ได้", html: `<p>ช่องกรอกอายุเป็น JTextField ผู้ใช้พิมพ์ <code>20</code> — <code>ageField.getText() + 1</code> ได้อะไร</p>`, answer: `<p><strong>"201"</strong> — getText() คืน String จึงเป็นการต่อข้อความ ต้อง <code>Integer.parseInt(ageField.getText().trim()) + 1</code> จึงได้ 21</p>` },
      ],
    },
    {
      num: "17.2", toc: "ตรวจข้อมูลว่างและรูปแบบ", title: "ตรวจข้อมูลว่าง รูปแบบ และช่วงค่า",
      blocks: [
        { type: "p", html: `อย่าเชื่อข้อมูลจากผู้ใช้จนกว่าจะตรวจแล้ว ตรวจตามลำดับ: <strong>ว่างไหม → แปลงชนิดได้ไหม → อยู่ในช่วงไหม</strong> แต่ละขั้นให้ข้อความ error ที่ตรงกับปัญหา` },
        { type: "table", title: "การตรวจที่พบบ่อย", head: ["ตรวจ", "วิธี"], rows: [
          ["ว่าง", "<code>text.trim().isEmpty()</code> หรือ <code>text.isBlank()</code>"],
          ["เป็นจำนวนเต็ม/ทศนิยม", "<code>Integer.parseInt</code> / <code>Double.parseDouble</code> ใน try-catch"],
          ["ช่วงค่า", "<code>value &gt;= min &amp;&amp; value &lt;= max</code>"],
          ["ความยาว", "<code>text.length() &gt;= 8</code>"],
          ["รูปแบบ (เช่น อีเมล, เบอร์โทร)", "<code>text.matches(\"regex\")</code>"],
          ["เลือกแล้วหรือยัง", "<code>combo.getSelectedIndex() &gt; 0</code> (ถ้ารายการแรกคือ “-- เลือก --”), radio ใด isSelected"],
        ] },
        { type: "p", html: `เขียนการตรวจเป็นเมธอดที่รับ String และคืนข้อความ error หรือ <code>null</code> ถ้าผ่าน แล้วทดสอบใน console ให้ครบทุกกรณีก่อนนำไปใช้กับหน้าจอ` },
        { type: "run", title: "ทดสอบเมธอดตรวจอายุใน console",
          code: j`
            public class Validators {
                public static void main(String[] args) {
                    String[] ages = {"20", "", "  ", "abc", "-3", "150", " 45 "};   // ปกติ ว่าง ไม่ใช่ตัวเลข นอกช่วง
                    for (String a : ages) {
                        String err = checkAge(a);
                        System.out.printf("%-8s -> %s%n", "\"" + a + "\"", err == null ? "OK" : err);
                    }
                }

                static String checkAge(String text) {                 // null = ผ่าน
                    if (text == null || text.isBlank()) return "Age is required";      // 1. ว่าง
                    int age;
                    try {
                        age = Integer.parseInt(text.trim());           // 2. แปลง (" 45 " ผ่านเพราะ trim)
                    } catch (NumberFormatException e) {
                        return "Age must be a whole number";
                    }
                    if (age < 1 || age > 120) return "Age must be between 1 and 120";   // 3. ช่วงค่า
                    return null;
                }
            }`,
          },

        { type: "h", text: "ตรวจรูปแบบด้วย regular expression" },
        { type: "p", html: `<code>text.matches(regex)</code> ตรวจว่าข้อความ<strong>ทั้งก้อน</strong>ตรงกับรูปแบบ เหมาะกับอีเมล รหัสนักศึกษา เบอร์โทร` },
        { type: "table", head: ["regex", "ความหมาย"], rows: [
          ["<code>\\\\d</code>", "ตัวเลข 1 ตัว"], ["<code>\\\\w</code>", "ตัวอักษร ตัวเลข หรือ _"],
          ["<code>+</code>", "ตัวก่อนหน้า 1 ตัวขึ้นไป"], ["<code>{3}</code>", "ตัวก่อนหน้า 3 ตัวพอดี"],
          ["<code>-?</code>", "มีขีดหรือไม่ก็ได้"], ["<code>[A-Za-z]</code>", "ตัวอักษรภาษาอังกฤษ"],
        ] },
        { type: "run", title: "อีเมล เบอร์โทร และรหัสนักศึกษา",
          code: j`
            public class PatternCheck {
                static final String EMAIL = "[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+";      // ชื่อ@โดเมน.นามสกุล
                static final String PHONE = "0\\d{1,2}-?\\d{3}-?\\d{4}";           // 0 + 1-2 หลัก, ขีดใส่หรือไม่ก็ได้
                static final String STUDENT_ID = "66\\d{6}";                       // 66 + ตัวเลข 6 ตัวพอดี

                public static void main(String[] args) {
                    test("email", EMAIL, "jhope@mail.com", "jhope.j@uni.ac.th", "jhope@", "@mail.com");
                    test("phone", PHONE, "081-234-5678", "0812345678", "02-123-4567", "81234");
                    test("id", STUDENT_ID, "66012345", "65012345", "6601234");
                }

                static void test(String label, String regex, String... samples) {   // String... = กี่ตัวก็ได้ (อาเรย์)
                    for (String s : samples) {
                        System.out.printf("%-6s %-18s %s%n", label, s, s.matches(regex) ? "valid" : "INVALID");
                    }
                }
            }`,
          },
        { type: "tip", html: `regex อีเมลแบบง่ายนี้พอสำหรับฟอร์มทั่วไป แต่ไม่ครอบคลุมทุกกรณีตามมาตรฐาน` },

        { type: "h", text: "ตรวจหลายช่อง แสดง error ทั้งหมดในครั้งเดียว" },
        { type: "p", html: `รวบรวม error ทุกช่องลงรายการโดยไม่หยุดที่ข้อแรก แล้วแสดงพร้อมกัน ผู้ใช้แก้ได้ในรอบเดียว` },
        { type: "run", title: "ฟอร์มลงทะเบียน 3 ช่อง", gui: true, actions: "type field:0 \ntype field:1 jhope@\ntype field:2 abc\nclick Register\nshot\ntype field:0 JHope\ntype field:1 jhope@mail.com\ntype field:2 19\nclick Register\nshot", captions: ["กรอกผิดทุกช่องแล้วคลิก Register", "แก้ให้ถูกแล้วคลิกอีกครั้ง"],
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
                            ArrayList<String> errors = new ArrayList<>();                 // เก็บทุกข้อ
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
                                messages.setText("<html>" + String.join("<br>", errors) + "</html>");   // ข้อละบรรทัด
                            }
                            frame.pack();                                                  // ปรับขนาดตามข้อความใหม่
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
          },
        { type: "check", title: "ลำดับการตรวจ", html: `<p>ทำไมต้องตรวจ “ว่าง” ก่อน “แปลงเป็นตัวเลข” และตรวจ “แปลงได้” ก่อน “ช่วงค่า”</p>`, answer: `<p>เพื่อให้ข้อความ error ตรงกับปัญหาจริง (ช่องว่างควรได้ “กรุณากรอก” ไม่ใช่ “ไม่ใช่ตัวเลข”) และการตรวจช่วงค่าทำได้ก็ต่อเมื่อมีตัวเลขแล้วเท่านั้น</p>` },
      ],
    },
    {
      num: "17.3", toc: "แจ้ง error ให้ผู้ใช้", title: "แจ้ง error ให้ผู้ใช้: JOptionPane และข้อความในฟอร์ม",
      blocks: [
        { type: "p", html: `แจ้ง error ได้สองแบบ: เปิด <strong>dialog</strong> ด้วย JOptionPane (ผู้ใช้ต้องกด OK ก่อน) หรือแสดง<strong>ข้อความข้างช่องที่ผิด</strong>ในฟอร์ม` },
        { type: "table", head: ["เมธอดของ JOptionPane", "ใช้เมื่อ", "คืนค่า"], rows: [
          ["<code>showMessageDialog(parent, msg, title, type)</code>", "แจ้งข้อมูล/คำเตือน/error", "-"],
          ["<code>showConfirmDialog(parent, msg, title, options)</code>", "ถามยืนยัน Yes/No(/Cancel)", "int เช่น YES_OPTION"],
          ["<code>showInputDialog(parent, msg)</code>", "ถามข้อความสั้น ๆ หนึ่งค่า", "String หรือ null ถ้ากด Cancel"],
        ] },
        { type: "run", title: "dialog แจ้ง error", gui: true, actions: "type field:0 12a\nclick Check",
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
                                    "Invalid quantity", JOptionPane.ERROR_MESSAGE);    // ไอคอน error
                                qty.requestFocusInWindow();                            // กลับไปที่ช่อง
                                qty.selectAll();                                       // พิมพ์ทับได้ทันที
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
          },
        { type: "tip", html: `ส่ง <code>frame</code> เป็น parent ทำให้ dialog อยู่กลางหน้าต่างหลัก dialog เป็น <strong>modal</strong>: ผู้ใช้ต้องกด OK ก่อนจึงกลับไปที่หน้าต่างหลักได้` },

        { type: "h", text: "ถามยืนยันก่อนทำสิ่งที่ย้อนกลับไม่ได้" },
        { type: "run", title: "ยืนยันก่อนลบทั้งหมด", gui: true, actions: "click Delete all",
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
                                "Delete all " + notes.size() + " notes? This cannot be undone.",   // บอกผลกระทบชัดเจน
                                "Confirm delete", JOptionPane.YES_NO_OPTION, JOptionPane.WARNING_MESSAGE);
                            if (answer == JOptionPane.YES_OPTION) {          // กด No หรือปิด dialog = ไม่ลบ
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
          },

        { type: "h", text: "แสดง error ข้างช่องที่ผิด" },
        { type: "p", html: `dialog ขัดจังหวะผู้ใช้ทุกครั้ง ฟอร์มยาวจึงนิยมแสดงข้อความสีแดงข้างช่องที่ผิดและเปลี่ยนขอบเป็นสีแดง ผู้ใช้เห็นทุกปัญหาพร้อมกัน` },
        { type: "run", title: "ขอบแดงและข้อความข้างช่อง", gui: true, actions: "type field:0 ab\ntype field:1 12345\nclick Sign up\nshot",
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
                        JLabel userErr = errorLabel();                                // ข้อความ error ของแต่ละช่อง
                        JLabel passErr = errorLabel();
                        JButton signUp = new JButton("Sign up");
                        signUp.addActionListener(e -> {
                            String u = user.getText().trim();
                            String p = new String(pass.getPassword());               // char[] → String
                            boolean ok = mark(user, userErr, u.length() >= 4 ? null : "at least 4 characters");
                            ok &= mark(pass, passErr, p.length() >= 8 && p.matches(".*\\d.*") && p.matches(".*[A-Za-z].*")
                                ? null : "8+ chars with letters and digits");        // &= ตรวจครบแม้ช่องแรกผิด
                            if (ok) JOptionPane.showMessageDialog(frame, "Welcome, " + u + "!");
                        });
                        JPanel form = new JPanel(new GridLayout(0, 3, 6, 6));        // ป้าย | ช่อง | error
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

                static boolean mark(JTextField field, JLabel errorLabel, String error) {   // error == null = ผ่าน
                    if (error == null) {
                        field.setBorder(UIManager.getBorder("TextField.border"));         // คืนขอบปกติ
                        errorLabel.setText(" ");
                        return true;
                    }
                    field.setBorder(BorderFactory.createLineBorder(ERROR, 2));            // ขอบแดง หนา 2
                    errorLabel.setText(error);
                    return false;
                }
            }`,
          },
        { type: "tip", html: `<code>".*\\\\d.*"</code> หมายถึง “มีตัวเลขอย่างน้อยหนึ่งตัวที่ตำแหน่งใดก็ได้”` },
        { type: "more", title: "ตัวอย่างเพิ่มเติม: showInputDialog ถามซ้ำจนได้ค่าที่ถูกต้อง", blocks: [
          { type: "p", html: `showInputDialog คืน String หรือ <code>null</code> เมื่อผู้ใช้กด Cancel ต้องจัดการทั้งสองกรณี และวนถามใหม่เมื่อค่าไม่ถูกต้อง ภาพแสดง dialog เตือนหลังป้อน −50` },
          { type: "run", title: "ตั้งงบประมาณ", gui: true, actions: "click Set budget\ntype field:0 -50\nclick OK",
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
                              if (value != null) budget.setText(String.format("Budget: %,.2f", value));   // null = ยกเลิก
                          });
                          JPanel p = new JPanel();
                          p.add(budget);
                          p.add(set);
                          frame.add(p);
                          frame.pack();
                          frame.setVisible(true);
                      });
                  }

                  static Double askPositiveNumber(JFrame parent, String prompt) {    // Double (ห่อ) คืน null ได้
                      while (true) {                                                // ถามจนได้ค่าถูกหรือยกเลิก
                          String text = JOptionPane.showInputDialog(parent, prompt);
                          if (text == null) return null;                            // กด Cancel
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
            },
        ] },
        { type: "note", title: "เขียนข้อความ error ที่ดี", html: `<ul><li>บอก<strong>ช่องไหน</strong>: “Email format is invalid” ไม่ใช่ “Invalid input”</li><li>บอก<strong>ต้องทำอย่างไร</strong>: “Age must be 15-99” ไม่ใช่ “Wrong age”</li><li>ไม่โทษผู้ใช้ และไม่แสดง stack trace หรือชื่อ exception</li><li>เก็บค่าที่ผู้ใช้พิมพ์ไว้ ไม่ล้างฟอร์มเมื่อผิด ให้แก้เฉพาะจุด</li></ul>` },
      ],
    },
    {
      num: "17.4", toc: "แยก validation เป็น method", title: "แยก validation เป็นเมธอดและคลาส",
      blocks: [
        { type: "p", html: `เมื่อฟอร์มใหญ่ขึ้น listener ที่อ่าน ตรวจ และบันทึกในที่เดียวจะยาวและทดสอบยาก ให้แบ่งงานเป็นสามส่วน` },
        { type: "table", head: ["ส่วน", "หน้าที่", "รู้จัก Swing ไหม"], rows: [
          ["UI (listener)", "อ่านค่าจากหน้าจอ ส่งให้ validator แล้วแสดงผล", "รู้"],
          ["validator", "รับค่าเป็น String คืนรายการ error", "ไม่รู้"],
          ["กฎทางธุรกิจ", "คำนวณ เช่น คิดราคา", "ไม่รู้"],
        ] },
        { type: "p", html: `ส่วนที่ไม่รู้จัก Swing ทดสอบใน console ได้ทุกกรณีโดยไม่ต้องคลิกหน้าจอ` },
        { type: "run", title: "Validator พร้อมชุดทดสอบ",
          code: j`
            import java.util.ArrayList;
            import java.util.List;

            public class BookingValidatorTest {
                public static void main(String[] args) {
                    test("JHope", "2", "3", true);                    // ปกติ
                    test("", "2", "3", true);                         // ชื่อว่าง
                    test("Suga", "0", "3", false);                    // guests นอกช่วง
                    test("RM", "5", "x", true);                       // nights ไม่ใช่ตัวเลข
                    test("Jungkook", "11", "31", false);              // นอกช่วงทั้งคู่
                }

                static void test(String name, String guests, String nights, boolean breakfast) {
                    List<String> errors = BookingValidator.validate(name, guests, nights);
                    System.out.printf("%-8s g=%-3s n=%-3s -> %s%n", name, guests, nights, errors.isEmpty() ? "OK" : errors);
                }
            }

            class BookingValidator {
                static List<String> validate(String name, String guests, String nights) {
                    List<String> errors = new ArrayList<>();
                    if (name.isBlank()) errors.add("name required");
                    Integer g = parseInRange(guests, 1, 10, "guests", errors);       // null เมื่อใช้ไม่ได้
                    Integer n = parseInRange(nights, 1, 30, "nights", errors);
                    if (g != null && n != null && g * n > 60) errors.add("too many guest-nights");   // กฎข้ามช่อง
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
          },
        { type: "tip", html: `<code>parseInRange</code> คืน <code>Integer</code> ซึ่งเป็น null ได้ จึงตรวจกฎข้ามช่อง (guests × nights ≤ 60) เฉพาะเมื่อทั้งสองค่าใช้ได้` },

        { type: "h", text: "ใช้ validator ในฟอร์ม" },
        { type: "p", html: `listener สั้นลงมาก: อ่านค่า → เรียก validate → ถ้ามี error แสดงแล้ว return → ถ้าไม่มี คำนวณราคาด้วยกฎใน <code>BookingRules</code>` },
        { type: "run", title: "ฟอร์มจองห้องพัก", gui: true, actions: "type field:0 JHope\ntype field:1 2\ntype field:2 3\nclick Book\nshot", captions: ["กรอกถูกต้องแล้วคลิก Book"],
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
                                return;                                           // ไม่คำนวณต่อ
                            }
                            int g = Integer.parseInt(guests.getText().trim());    // ตรวจแล้ว แปลงได้แน่นอน
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

            class BookingRules {                                          // ไม่มีโค้ด Swing
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
                    double room = 1200 * nights * Math.ceil(guests / 2.0);            // ห้องละ 2 คน ปัดขึ้น
                    return room + (breakfast ? 250.0 * guests * nights : 0);         // อาหารเช้าต่อคนต่อคืน
                }
            }`,
          },
        { type: "p", html: `2 คน 3 คืน = 1 ห้อง × 3 คืน × 1,200 = 3,600 บาท` },
      ],
    },
    {
      num: "17.5", toc: "ล้างและ reset form", title: "ล้างและ reset ฟอร์ม",
      blocks: [
        { type: "p", html: `หลังบันทึกสำเร็จ หรือเมื่อผู้ใช้กด Clear ให้คืนทุก component เป็นค่าเริ่มต้น รวมไว้ในเมธอด <code>resetForm()</code> เดียวเพื่อไม่ลืมช่องใด` },
        { type: "table", head: ["component", "คืนค่าเริ่มต้นด้วย"], rows: [
          ["JTextField", "<code>setText(\"\")</code>"],
          ["JComboBox", "<code>setSelectedIndex(0)</code>"],
          ["JRadioButton", "<code>defaultButton.setSelected(true)</code>"],
          ["JCheckBox", "<code>setSelected(false)</code>"],
          ["ข้อความ error", "<code>setText(\" \")</code>"],
          ["โฟกัส", "<code>firstField.requestFocusInWindow()</code>"],
        ] },
        { type: "run", title: "บันทึกลงรายการแล้ว reset", gui: true, actions: "type field:0 JHope\nselect combo:0 2\nclick Gold\nclick Save\ntype field:0 Suga\nclick Save\nshot", captions: ["บันทึก JHope (Engineering, Gold) แล้วบันทึก Suga (ค่าเริ่มต้น)"],
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class MemberEntry {
                private final JTextField name = new JTextField(12);
                private final JComboBox<String> faculty = new JComboBox<>(new String[]{"Science", "Arts", "Engineering"});
                private final JRadioButton basic = new JRadioButton("Basic", true);
                private final JRadioButton gold = new JRadioButton("Gold");
                private final JLabel error = new JLabel(" ");
                private final DefaultListModel<String> saved = new DefaultListModel<>();     // รายการที่บันทึกแล้ว

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
                        name.requestFocusInWindow();                  // พาไปช่องที่ผิด
                        return;                                       // ผิด → ไม่ล้างฟอร์ม
                    }
                    String p = gold.isSelected() ? "Gold" : "Basic";
                    saved.addElement(n + " - " + faculty.getSelectedItem() + " - " + p);
                    resetForm();                                      // สำเร็จ → พร้อมรับคนถัดไป
                }

                private void resetForm() {                            // คืนทุกช่องในที่เดียว
                    name.setText("");
                    faculty.setSelectedIndex(0);
                    basic.setSelected(true);
                    error.setText(" ");
                    name.requestFocusInWindow();
                }
            }`,
          },
        { type: "p", html: `Suga ถูกบันทึกด้วยค่าเริ่มต้น (Science, Basic) แสดงว่า resetForm() คืนทุกช่องจริงหลังบันทึก JHope` },
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
                        // ช่องว่าง → กล่องแจ้งข้อผิดพลาด
                        if (name.getText().isBlank()) {
                            // ไอคอนข้อผิดพลาด
                            JOptionPane.showMessageDialog(frame, "Please enter your name", "Missing name", JOptionPane.ERROR_MESSAGE);
                        } else {
                            // ไอคอนข้อมูลทั่วไป
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
                // รวมค่าขอบ 0, 100 และค่าผิด
                String[] inputs = {"85", "0", "100", "-1", "101", "", "eighty", " 72 "};
                for (String in : inputs) {
                    String err = checkScore(in);
                    System.out.printf("%-10s %s%n", "\"" + in + "\"", err == null ? "OK" : err);
                }
            }

            static String checkScore(String text) {
                // ว่าง
                if (text == null || text.isBlank()) return "Score is required";
                try {
                    // ข้อความที่ไม่ใช่ตัวเลข → catch
                    int s = Integer.parseInt(text.trim());
                    // นอกช่วง
                    if (s < 0 || s > 100) return "Score must be 0-100";
                    // null = ผ่าน
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
                // อาเรย์คู่ขนาน: สกุลเงินและอัตรา
                String[] codes = {"USD", "EUR", "JPY"};
                double[] rates = {35.5, 38.2, 0.24};
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Exchange");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField amount = new JTextField(10);
                    JComboBox<String> currency = new JComboBox<>(codes);
                    JButton convert = new JButton("Convert");
                    JLabel result = new JLabel(" ");
                    // จำกรอบเดิมไว้คืนค่าภายหลัง
                    javax.swing.border.Border normal = amount.getBorder();
                    convert.addActionListener(e -> {
                        try {
                            double baht = Double.parseDouble(amount.getText().trim());
                            // ค่า ≤ 0 ใช้ catch เดียวกัน
                            if (baht <= 0) throw new NumberFormatException();
                            int i = currency.getSelectedIndex();
                            // ค่าถูก → คืนกรอบปกติ
                            amount.setBorder(normal);
                            result.setForeground(new Color(0, 120, 0));
                            result.setText(String.format("%,.2f THB = %,.2f %s", baht, baht / rates[i], codes[i]));
                        } catch (NumberFormatException ex) {
                            // ค่าผิด → กรอบแดง
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
                        // ไม่มีข้อความ → ปิดได้เลย
                        if (notes.getText().isBlank()) {
                            // ปิดหน้าต่าง
                            frame.dispose();
                            return;
                        }
                        // ถาม 3 ทาง: Yes / No / Cancel
                        int answer = JOptionPane.showConfirmDialog(frame, "Save your note before exit?", "Unsaved note",
                            JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.QUESTION_MESSAGE);
                        if (answer == JOptionPane.YES_OPTION) {
                            JOptionPane.showMessageDialog(frame, "Saved " + notes.getText().length() + " characters.");
                            frame.dispose();
                        // No = ปิดโดยไม่บันทึก
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
      spec: ["ใช้ regex: <code>[A-Za-z0-9]{4,12}</code>, รูปแบบอีเมลจากหัวข้อ 17.2, <code>0\\\\d{2}-\\\\d{3}-\\\\d{4}</code>", "เขียนเมธอด <code>boolean show(JLabel err, String msg)</code> ที่ตั้งข้อความและคืนว่าผ่านหรือไม่", "ภาพตัวอย่าง: username สั้นเกิน, อีเมลถูก, เบอร์ผิด, ไม่ติ๊ก"], gui: true, actions: "type field:0 ab\ntype field:1 rm@mail.com\ntype field:2 0812345678\nclick Submit\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class SignupForm {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Sign up");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    // ประกาศหลายตัวในบรรทัดเดียว
                    JTextField user = new JTextField(12), email = new JTextField(12), phone = new JTextField(12);
                    JCheckBox terms = new JCheckBox("I accept the terms");
                    JLabel eUser = err(), eEmail = err(), ePhone = err(), eTerms = err();
                    JButton submit = new JButton("Submit");
                    submit.addActionListener(e -> {
                        // ตัวอักษรหรือตัวเลข 4-12 ตัว
                        boolean ok = show(eUser, user.getText().trim().matches("[A-Za-z0-9]{4,12}") ? null : "4-12 letters/digits");
                        // &= ตรวจทุกช่อง
                        ok &= show(eEmail, email.getText().trim().matches("[\\w.+-]+@[\\w-]+(\\.[\\w-]+)+") ? null : "invalid email");
                        // รูปแบบ 0XX-XXX-XXXX
                        ok &= show(ePhone, phone.getText().trim().matches("0\\d{2}-\\d{3}-\\d{4}") ? null : "use 0XX-XXX-XXXX");
                        // ต้องติ๊กยอมรับเงื่อนไข
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

            // แสดงข้อความ และคืนว่าผ่านหรือไม่
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
            // ตัวเลือกสินค้ามาจาก OrderRules
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
                // ?: ค่าส่งตามแบบที่เลือก
                int shipping = express.isSelected() ? 90 : 40;
                // ตรวจข้อมูลด้วยคลาสกฎ
                List<String> errors = OrderRules.validate(p, address.getText(), coupon.getText());
                if (!errors.isEmpty()) {
                    // แสดงข้อผิดพลาดทั้งหมดในกล่องเดียว
                    JOptionPane.showMessageDialog(frame, String.join("\n", errors), "Please fix", JOptionPane.ERROR_MESSAGE);
                    return;
                }
                double total = OrderRules.total(p, q, shipping, coupon.getText().trim());
                // สรุปคำสั่งซื้อก่อนยืนยัน
                String summary = String.format("%s x %d%nShipping: %d%nCoupon: %s%nTotal: %,.2f baht%n%nConfirm order?",
                    OrderRules.NAMES[p], q, shipping, coupon.getText().isBlank() ? "-" : coupon.getText().trim(), total);
                // ยืนยันแล้วจึงบันทึก
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
            // ช่องแรกคือคำแนะนำ ไม่ใช่สินค้า
            static final String[] NAMES = {"-- choose --", "Keyboard", "Mouse", "Headset"};
            static final double[] PRICES = {0, 890, 390, 1290};

            static List<String> validate(int productIndex, String address, String coupon) {
                List<String> errors = new ArrayList<>();
                // ยังไม่ได้เลือกสินค้า
                if (productIndex <= 0) errors.add("Choose a product");
                if (address.trim().length() < 10) errors.add("Address must be at least 10 characters");
                String c = coupon.trim();
                // คูปองว่างได้ แต่ถ้ากรอกต้องถูกต้อง
                if (!c.isEmpty() && !c.equals("SAVE10") && !c.equals("SAVE50")) errors.add("Unknown coupon: " + c);
                return errors;
            }

            static double total(int productIndex, int qty, int shipping, String coupon) {
                double goods = PRICES[productIndex] * qty;
                // ลด 10%
                if (coupon.equals("SAVE10")) goods *= 0.9;
                // ลด 50 บาท ไม่ให้ติดลบ
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
            // ข้อมูลจริง
            private final ArrayList<Product> products = new ArrayList<>();
            // ข้อความที่แสดงบน JList
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
                // -1 = เพิ่มใหม่
                add.addActionListener(e -> save(-1));
                // ส่ง index ที่เลือก = แก้ไข
                update.addActionListener(e -> save(list.getSelectedIndex()));
                delete.addActionListener(e -> delete());
                clear.addActionListener(e -> clearForm());
                // เลือกรายการ → ดึงข้อมูลมาใส่ฟอร์ม
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
                try {  // ราคาผิดรูปแบบ → ใช้ -1 แทน
                    p = Double.parseDouble(price.getText().trim());
                } catch (NumberFormatException ex) {
                    p = -1;
                }
                String error = null;
                // ตรวจทีละเงื่อนไข เก็บข้อผิดพลาดแรก
                if (n.isEmpty()) error = "Name is required";
                // ห้ามชื่อซ้ำ
                else if (isDuplicate(n, editIndex)) error = "Name already exists";
                else if (p <= 0) error = "Price must be a number > 0";
                if (error != null) {
                    status.setForeground(Color.RED);
                    status.setText(error);
                    return;
                }
                // เพิ่มใหม่
                if (editIndex < 0) products.add(new Product(n, p));
                // แทนที่ตำแหน่งเดิม
                else products.set(editIndex, new Product(n, p));
                status.setForeground(new Color(0, 110, 0));
                status.setText(editIndex < 0 ? "Added " + n : "Updated " + n);
                refreshList();  // สร้างรายการแสดงผลใหม่
                clearForm();
            }

            private boolean isDuplicate(String n, int ignoreIndex) {
                for (int i = 0; i < products.size(); i++) {
                    // ข้ามตัวที่กำลังแก้ไข
                    if (i != ignoreIndex && products.get(i).name.equalsIgnoreCase(n)) return true;
                }
                return false;
            }

            private void delete() {
                int i = list.getSelectedIndex();
                if (i < 0) return;
                // ยืนยันก่อนลบ
                if (JOptionPane.showConfirmDialog(frame, "Delete " + products.get(i).name + "?", "Confirm",
                        JOptionPane.YES_NO_OPTION) == JOptionPane.YES_OPTION) {
                    products.remove(i);
                    refreshList();
                    clearForm();
                }
            }

            private void refreshList() {
                model.clear();  // ล้างแล้วสร้างจากข้อมูลจริงทุกครั้ง
                for (Product p : products) model.addElement(String.format("%-8s %8.2f", p.name, p.price));
            }

            private void clearForm() {
                list.clearSelection();
                name.setText("");
                price.setText("");
                updateButtons();
            }

            private void updateButtons() {
                // ปุ่มแก้ไข/ลบใช้ได้เมื่อเลือกรายการ
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
