import { j, c, pre, dedent } from "../lib.mjs";

// Shared model used across examples (kept identical so readers see one design)
const MODEL = dedent(j`
  class Course {
      private final String code;
      private final String name;
      private final int credits;

      Course(String code, String name, int credits) {
          this.code = code;
          this.name = name;
          this.credits = credits;
      }

      String getCode() { return code; }
      String getName() { return name; }
      int getCredits() { return credits; }

      @Override
      public String toString() {
          return String.format("%-7s %-22s %d cr", code, name, credits);
      }
  }

  class CoursePlanner {
      static final int MAX_CREDITS = 22;
      private final ArrayList<Course> courses = new ArrayList<>();

      boolean containsCode(String code) {
          for (Course c : courses) {
              if (c.getCode().equalsIgnoreCase(code)) return true;
          }
          return false;
      }

      int getTotalCredits() {
          int total = 0;
          for (Course c : courses) total += c.getCredits();
          return total;
      }

      /** Validates raw text input; returns an error message or null if OK. */
      String validate(String code, String name, String creditsText) {
          if (code.isEmpty() || name.isEmpty() || creditsText.isEmpty()) return "Please fill in every field";
          if (!code.matches("[A-Za-z]{2,4}\\d{3}")) return "Code must look like CS101";
          int credits;
          try {
              credits = Integer.parseInt(creditsText);
          } catch (NumberFormatException e) {
              return "Credits must be a whole number";
          }
          if (credits < 1 || credits > 6) return "Credits must be 1-6";
          if (containsCode(code)) return "Course " + code.toUpperCase() + " already exists";
          if (getTotalCredits() + credits > MAX_CREDITS) return "Total would exceed " + MAX_CREDITS + " credits";
          return null;
      }

      void add(Course c) {
          if (containsCode(c.getCode())) throw new IllegalArgumentException("duplicate " + c.getCode());
          courses.add(c);
      }

      void remove(int index) { courses.remove(index); }

      List<Course> getCourses() { return Collections.unmodifiableList(courses); }
  }`);

const APP_IMPORTS = dedent(j`
  import javax.swing.*;
  import java.awt.*;
  import java.util.ArrayList;
  import java.util.Collections;
  import java.util.List;
`);

const APP_BODY = dedent(j`
  public class CoursePlannerApp {
      static final String HOME = "HOME", FORM = "FORM", LIST = "LIST";
      private final CoursePlanner planner = new CoursePlanner();
      private final CardLayout layout = new CardLayout();
      private final JPanel pages = new JPanel(layout);
      private final JLabel homeSummary = new JLabel("", SwingConstants.CENTER);
      private final JTextField codeField = new JTextField(10);
      private final JTextField nameField = new JTextField(16);
      private final JTextField creditsField = new JTextField(4);
      private final JLabel formError = new JLabel(" ");
      private final DefaultListModel<Course> listModel = new DefaultListModel<>();
      private final JList<Course> courseList = new JList<>(listModel);
      private final JLabel listTotal = new JLabel();
      private final JButton removeButton = new JButton("Remove selected");
      private JFrame frame;

      public static void main(String[] args) {
          SwingUtilities.invokeLater(() -> new CoursePlannerApp().show());
      }

      private void show() {
          frame = new JFrame("Course Planner");
          frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
          pages.add(buildHome(), HOME);
          pages.add(buildForm(), FORM);
          pages.add(buildList(), LIST);
          pages.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
          frame.setContentPane(pages);
          goTo(HOME);
          frame.setSize(420, 260);
          frame.setLocationRelativeTo(null);
          frame.setVisible(true);
      }

      private void goTo(String page) {
          refresh();
          layout.show(pages, page);
          if (page.equals(FORM)) codeField.requestFocusInWindow();
      }

      private void refresh() {
          int n = planner.getCourses().size();
          int total = planner.getTotalCredits();
          homeSummary.setText("<html><center><b>" + n + " course(s)</b><br>" + total + " / "
              + CoursePlanner.MAX_CREDITS + " credits planned</center></html>");
          listModel.clear();
          for (Course c : planner.getCourses()) listModel.addElement(c);
          listTotal.setText("Total: " + total + " credits");
          removeButton.setEnabled(courseList.getSelectedIndex() >= 0);
      }

      private JPanel buildHome() {
          JPanel p = new JPanel(new BorderLayout(0, 10));
          JLabel title = new JLabel("Course Planner", SwingConstants.CENTER);
          title.setFont(title.getFont().deriveFont(Font.BOLD, 20f));
          homeSummary.setFont(homeSummary.getFont().deriveFont(15f));
          JButton add = new JButton("Add course");
          JButton view = new JButton("View list");
          add.addActionListener(e -> goTo(FORM));
          view.addActionListener(e -> goTo(LIST));
          JPanel buttons = new JPanel();
          buttons.add(add);
          buttons.add(view);
          p.add(title, BorderLayout.NORTH);
          p.add(homeSummary, BorderLayout.CENTER);
          p.add(buttons, BorderLayout.SOUTH);
          return p;
      }

      private JPanel buildForm() {
          JPanel fields = new JPanel(new GridLayout(3, 2, 8, 8));
          fields.add(new JLabel("Code (e.g. CS101):")); fields.add(codeField);
          fields.add(new JLabel("Name:")); fields.add(nameField);
          fields.add(new JLabel("Credits (1-6):")); fields.add(creditsField);
          formError.setForeground(Color.RED);
          JButton save = new JButton("Save");
          JButton cancel = new JButton("Cancel");
          save.addActionListener(e -> save());
          creditsField.addActionListener(e -> save());
          cancel.addActionListener(e -> { clearForm(); goTo(HOME); });
          JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT, 6, 0));
          buttons.add(cancel);
          buttons.add(save);
          JPanel south = new JPanel(new BorderLayout());
          south.add(formError, BorderLayout.NORTH);
          south.add(buttons, BorderLayout.SOUTH);
          JPanel p = new JPanel(new BorderLayout(8, 8));
          JLabel title = new JLabel("Add course");
          title.setFont(title.getFont().deriveFont(Font.BOLD, 16f));
          p.add(title, BorderLayout.NORTH);
          p.add(fields, BorderLayout.CENTER);
          p.add(south, BorderLayout.SOUTH);
          return p;
      }

      private JPanel buildList() {
          courseList.setFont(new Font("Monospaced", Font.PLAIN, 13));
          courseList.addListSelectionListener(e -> removeButton.setEnabled(courseList.getSelectedIndex() >= 0));
          removeButton.addActionListener(e -> removeSelected());
          JButton home = new JButton("Home");
          JButton another = new JButton("Add another");
          home.addActionListener(e -> goTo(HOME));
          another.addActionListener(e -> goTo(FORM));
          JPanel buttons = new JPanel(new FlowLayout(FlowLayout.RIGHT, 6, 0));
          buttons.add(removeButton);
          buttons.add(another);
          buttons.add(home);
          JPanel south = new JPanel(new BorderLayout());
          south.add(listTotal, BorderLayout.NORTH);
          south.add(buttons, BorderLayout.SOUTH);
          JPanel p = new JPanel(new BorderLayout(0, 8));
          p.add(new JScrollPane(courseList), BorderLayout.CENTER);
          p.add(south, BorderLayout.SOUTH);
          return p;
      }

      private void save() {
          String code = codeField.getText().trim();
          String name = nameField.getText().trim();
          String creditsText = creditsField.getText().trim();
          String error = planner.validate(code, name, creditsText);
          if (error != null) {
              formError.setText(error);
              return;
          }
          planner.add(new Course(code.toUpperCase(), name, Integer.parseInt(creditsText)));
          clearForm();
          goTo(LIST);
      }

      private void removeSelected() {
          int i = courseList.getSelectedIndex();
          if (i < 0) return;
          Course c = planner.getCourses().get(i);
          int ok = JOptionPane.showConfirmDialog(frame, "Remove " + c.getCode() + "?", "Confirm", JOptionPane.YES_NO_OPTION);
          if (ok == JOptionPane.YES_OPTION) {
              planner.remove(i);
              refresh();
          }
      }

      private void clearForm() {
          codeField.setText("");
          nameField.setText("");
          creditsField.setText("");
          formError.setText(" ");
      }
  }
`);

const FULL_APP = APP_IMPORTS + "\n\n" + APP_BODY + "\n\n" + MODEL;
const withModel = (code) => dedent(code) + "\n\n" + MODEL;
const addCourse = (code, name, cr) => `type field:0 ${code}\ntype field:1 ${name}\ntype field:2 ${cr}\nclick Save`;

export default {
  num: 19, file: "chapter-19.html",
  pageTitle: "บทที่ 19: GUI Capstone", shortName: "บทที่ 19",
  tocLabel: "บทที่ 19 · โปรเจกต์ Course Planner", sidebarBottom: "สร้างทีละชั้น ทดสอบทุกชั้น",
  kicker: "บทที่ 19 · ประกอบความรู้ Swing เป็นโปรแกรมจริง", h1: "GUI Capstone: Course Planner",
  lead: "โปรเจกต์นี้รวม class และ object, ArrayList, layout manager, event listener, validation, model และ CardLayout เป็นแอปจัดรายการวิชาที่วางแผนลงทะเบียนได้",
  goals: ["แปลงโจทย์เป็นหน้าจอและ user flow", "แยก Course model จาก Swing components", "ประกอบหลาย panel ด้วย CardLayout", "ตรวจ input อัปเดตผลตาม event และทดสอบอย่างเป็นระบบ"],
  prev: { href: "chapter-18.html", label: "← บทที่ 18" },
  next: { href: "side-quest-random.html", label: "บทเสริม: Random →" },
  footer: "บทที่ 19 · โปรแกรมที่ดีโตทีละขั้นและผ่านการทดสอบทุกขั้น",
  introHeading: "19. สร้าง Course Planner ทีละชั้น",
  introHtml: `<p>เริ่มจากเวอร์ชันเล็ก: เพิ่มรายวิชาด้วยรหัส ชื่อ และหน่วยกิต แสดงรายการ และลบรายการที่เลือกได้ เวอร์ชันแรกเก็บข้อมูลในหน่วยความจำ (ปิดโปรแกรมแล้วข้อมูลหาย) บทนี้เดินตามลำดับที่นักพัฒนาใช้จริง: <strong>ความต้องการ → model → หน้าจอ → event → ทดสอบ → ขยาย</strong> แต่ละขั้นมีโค้ดที่รันได้และภาพผลลัพธ์จริง</p>`,
  topics: [
    {
      num: "19.1", toc: "กำหนดขอบเขตและ flow", title: "กำหนดความต้องการและ user flow",
      blocks: [
        { type: "p", html: "เขียนสิ่งที่ผู้ใช้ทำได้ก่อนคิดเรื่องสีหรือ component วิธีนี้ช่วยตัดสินใจว่าต้องมีหน้าอะไรและข้อมูลใดต้องเก็บ" },
        { type: "concept", title: "ขอบเขตเวอร์ชันแรก (requirements)", html: `<ol><li>หน้า <strong>Home</strong> แสดงจำนวนวิชาและหน่วยกิตรวม</li><li>หน้า <strong>Add Course</strong> รับรหัส ชื่อ และหน่วยกิต ตรวจ: ช่องว่าง, รูปแบบรหัส (เช่น CS101), หน่วยกิตเป็นจำนวนเต็ม 1–6, รหัสไม่ซ้ำ, หน่วยกิตรวมไม่เกิน 22</li><li>หน้า <strong>Course List</strong> แสดงรายการ เลือกวิชาแล้วลบได้ (ถามยืนยัน)</li><li>ข้อมูลอยู่ใน memory; ปิดโปรแกรมแล้วไม่ต้องคงข้อมูล</li></ol>` },
        { type: "example", title: "เส้นทางผู้ใช้ (user flow)", html: pre(`
          HOME   --Add course-->   FORM
          HOME   --View list-->    LIST
          FORM   --Save (valid)--> LIST
          FORM   --Save (invalid)--> แสดง error, อยู่ที่ FORM เดิม
          FORM   --Cancel-->       HOME
          LIST   --Add another-->  FORM
          LIST   --Home-->         HOME`) + `<p>การเขียน flow ให้เห็นเส้นทาง invalid ด้วย ช่วยไม่ให้หน้าเปลี่ยนทั้งที่ข้อมูลยังไม่ผ่าน</p>` },
        { type: "table", title: "Acceptance criteria: เงื่อนไขที่ทดสอบได้", head: ["#", "เมื่อ…", "ผลที่ต้องเห็น"], rows: [
          ["1", "กรอก CS101, Programming, 3 แล้ว Save", "ไปหน้า List เห็น CS101 และ Total 3 credits"],
          ["2", "เว้นชื่อว่างแล้ว Save", "อยู่หน้า Form เห็น “Please fill in every field”"],
          ["3", "หน่วยกิต “abc” หรือ 7", "error เรื่องหน่วยกิต ไม่บันทึก"],
          ["4", "เพิ่ม cs101 ซ้ำ (ตัวพิมพ์ต่าง)", "error “already exists”"],
          ["5", "หน่วยกิตรวมจะเกิน 22", "error “would exceed 22 credits”"],
          ["6", "เลือกวิชาแล้ว Remove → Yes", "วิชาหายจากรายการ Total ลดลง"],
        ] },
        { type: "check", title: "criteria ที่ดี", html: `<p>“หน้าจอต้องใช้งานง่าย” เป็น acceptance criterion ที่ดีหรือไม่ เพราะอะไร</p>`, answer: `<p>ไม่ดี เพราะวัดผลไม่ได้ ควรเขียนเป็นพฤติกรรมที่ทดสอบได้ เช่น “กด Enter ในช่องหน่วยกิตแล้วบันทึกได้เหมือนกด Save”</p>` },
      ],
    },
    {
      num: "19.2", toc: "วาง model และ class", title: "ออกแบบ model และความรับผิดชอบของ class",
      blocks: [
        { type: "table", head: ["Class", "รับผิดชอบ", "ไม่ควรทำ"], rows: [
          ["<code>Course</code>", "ข้อมูลหนึ่งวิชา (immutable)", "รู้จัก Swing"],
          ["<code>CoursePlanner</code>", "เก็บรายการ + กฎทั้งหมด (validate, ห้ามซ้ำ, หน่วยกิตรวม)", "แสดง dialog หรือแก้ component"],
          ["<code>CoursePlannerApp</code>", "สร้างหน้าจอ เชื่อม event กับ planner นำทาง", "เก็บกฎธุรกิจไว้ใน listener"],
        ] },
        { type: "run", title: "ทดสอบ model ใน console ก่อนมีหน้าจอ", level: "ต่อยอด",
          concept: "model ไม่มีโค้ด Swing จึงทดสอบ acceptance criteria เกือบทั้งหมดได้ด้วย console ภายในไม่กี่วินาที — เมื่อผ่านแล้วจึงเริ่มทำ GUI",
          code: withModel(j`
            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;

            public class PlannerModelTest {
                public static void main(String[] args) {
                    CoursePlanner p = new CoursePlanner();
                    check(p, "CS101", "Programming", "3");
                    p.add(new Course("CS101", "Programming", 3));
                    check(p, "MA102", "", "3");
                    check(p, "MA102", "Calculus", "abc");
                    check(p, "MA102", "Calculus", "7");
                    check(p, "cs101", "Programming again", "3");
                    check(p, "C1", "Bad code", "3");
                    for (String[] c : new String[][]{{"MA102", "Calculus", "4"}, {"PH103", "Physics", "4"},
                            {"EN104", "English", "3"}, {"SC105", "Science Lab", "6"}}) {
                        p.add(new Course(c[0], c[1], Integer.parseInt(c[2])));
                    }
                    System.out.println("Total now: " + p.getTotalCredits());
                    check(p, "AR106", "Art", "3");
                    check(p, "AR106", "Art", "2");
                    for (Course c : p.getCourses()) System.out.println("  " + c);
                }

                static void check(CoursePlanner p, String code, String name, String credits) {
                    String err = p.validate(code, name, credits);
                    System.out.printf("validate(%s, %s, %s) -> %s%n", code, name.isEmpty() ? "\"\"" : name, credits, err == null ? "OK" : err);
                }
            }
            `),
          steps: ["validate รับข้อความดิบจากฟอร์ม คืนข้อความ error หรือ null", "ตรวจตามลำดับ: ว่าง → รูปแบบรหัส → แปลงตัวเลข → ช่วง → ซ้ำ → เพดานหน่วยกิต", "เพิ่มวิชาจนรวม 20 หน่วยกิต แล้ว AR106 3 หน่วยกิตเกิน 22 แต่ 2 หน่วยกิตผ่าน", "<code>getCourses()</code> คืน unmodifiable list — ผู้เรียกแก้รายการโดยไม่ผ่านกฎของ planner ไม่ได้"] },
        { type: "note", title: "ทำไม add() ยังตรวจรหัสซ้ำอีกครั้ง", html: `<p>แม้ UI จะเรียก validate ก่อนเสมอ แต่ planner ไม่ควรเชื่อว่าผู้เรียกทุกคนจะทำเช่นนั้น การโยน exception ใน add() ปกป้อง invariant “ไม่มีรหัสซ้ำ” ไว้ในที่เดียว (บทที่ 12)</p>` },
      ],
    },
    {
      num: "19.3", toc: "สร้าง layout", title: "ประกอบหน้าด้วย layout manager",
      blocks: [
        { type: "p", html: "วาง CardLayout เป็น content pane ของ JFrame เพื่อสลับ Home, Form และ List; ภายในแต่ละ panel ใช้ layout ที่เหมาะกับหน้าที่: BorderLayout สำหรับกรอบหลัก, GridLayout สำหรับคู่ป้าย–ช่อง, FlowLayout ชิดขวาสำหรับแถวปุ่ม" },
        { type: "example", title: "โครง container ของแอป", html: pre(`
          JFrame "Course Planner"
          └── pages (CardLayout)
              ├── HOME  (BorderLayout: title / summary / buttons)
              ├── FORM  (BorderLayout: title / GridLayout 3x2 fields / error + buttons)
              └── LIST  (BorderLayout: JScrollPane(JList<Course>) / total + buttons)`) },
        { type: "run", title: "หน้าตาของทั้ง 3 หน้า (แอปเต็ม)", level: "ประยุกต์", gui: true,
          actions: "shot\nclick Add course\nshot\nclick Cancel\nclick View list\nshot", captions: ["HOME", "FORM (หลังคลิก Add course)", "LIST (ยังว่าง)"],
          concept: "โค้ดนี้คือแอปเวอร์ชันแรกที่สมบูรณ์ ส่วน 19.3 ให้สังเกตเมธอด buildHome / buildForm / buildList ซึ่งแต่ละเมธอดคืน panel ของหนึ่งหน้า ส่วน event อธิบายใน 19.4",
          code: FULL_APP,
          steps: ["show() สร้างหน้าต่าง เพิ่ม 3 หน้าลง CardLayout แล้วไปหน้า HOME", "goTo(page) เรียก refresh() ก่อนแสดงทุกครั้ง — ทุกหน้าจึงแสดงข้อมูลล่าสุดจาก planner", "JList&lt;Course&gt; แสดงผลด้วย toString() ของ Course ใช้ฟอนต์ Monospaced ให้คอลัมน์ตรง", "component ที่ต้องอ่าน/แก้จากหลายเมธอดเป็น field ของคลาส"] },
      ],
    },
    {
      num: "19.4", toc: "ต่อ event และ validation", title: "ต่อ event, validation และ model",
      blocks: [
        { type: "steps", title: "ลำดับในเมธอด save() (เรียกจากปุ่ม Save และ Enter ในช่องหน่วยกิต)", items: [
          "อ่านและ normalize: <code>trim()</code> ทุกช่อง",
          "ส่งให้ <code>planner.validate(...)</code> — กฎทั้งหมดอยู่ใน model",
          "ถ้ามี error: แสดงใน label สีแดงแล้ว <code>return</code> (ไม่เปลี่ยนหน้า ไม่แก้ model)",
          "ถ้าผ่าน: สร้าง Course (รหัสเป็นตัวพิมพ์ใหญ่) แล้ว <code>planner.add</code>",
          "ล้างฟอร์ม แล้ว <code>goTo(LIST)</code> ซึ่ง refresh รายการให้เอง",
        ] },
        { type: "run", title: "ทดสอบตาม acceptance criteria ด้วยการจำลองผู้ใช้", level: "ท้าทาย", gui: true,
          actions: ["click Add course", "type field:0 CS101\ntype field:1 \ntype field:2 3\nclick Save\nshot", "type field:1 Programming\nclick Save", "click Add another", addCourse("cs101", "Again", "3"), "shot", addCourse("MA102", "Calculus", "4"), "click Add another", addCourse("PH103", "Physics", "9"), "shot", "type field:2 4\nclick Save\nshot"].join("\n"),
          captions: ["criteria 2: ชื่อว่าง", "criteria 4: รหัสซ้ำ (cs101)", "criteria 3: หน่วยกิต 9", "แก้เป็น 4 แล้ว Save → หน้า LIST"],
          concept: "ใช้โค้ดแอปเดียวกับ 19.3 แต่รอบนี้จำลองการใช้งานตามตาราง acceptance criteria — ทุกภาพคือผลจริงจากโปรแกรม",
          code: FULL_APP,
          steps: ["ชื่อว่าง → error และยังอยู่หน้า Form", "เติมชื่อแล้ว Save → บันทึก CS101 และไปหน้า List", "Add another → พิมพ์ cs101 → ซ้ำ (เทียบแบบไม่สนตัวพิมพ์)", "MA102 ผ่าน → PH103 หน่วยกิต 9 ผิดช่วง → แก้เป็น 4 → ผ่าน รวม 11 หน่วยกิต"] },
        { type: "run", title: "ลบวิชาพร้อม dialog ยืนยัน", level: "ท้าทาย", gui: true,
          actions: ["click Add course", addCourse("CS101", "Programming", "3"), "click Add another", addCourse("MA102", "Calculus", "4"), "select list:0 0", "click Remove selected"].join("\n"),
          captions: ["เลือก CS101 แล้วคลิก Remove selected"],
          concept: "removeSelected() ถาม showConfirmDialog ก่อน ถ้ากด Yes จึงเรียก planner.remove แล้ว refresh — ภาพแสดง dialog ที่เปิดอยู่เหนือหน้า List",
          code: FULL_APP,
          steps: ["ปุ่ม Remove ถูกปิดจนกว่าจะเลือกรายการ (ListSelectionListener)", "index ที่เลือกใน JList ตรงกับ index ใน planner เพราะ refresh สร้างรายการจาก planner ตามลำดับ", "ข้อความยืนยันระบุรหัสวิชาที่จะลบ"] },
      ],
    },
    {
      num: "19.5", toc: "ทดสอบและขยายงาน", title: "ทดสอบและขยายงาน",
      blocks: [
        { type: "table", title: "Checklist ทดสอบก่อนส่ง", head: ["ประเภท", "กรณี"], rows: [
          ["ปกติ", "เพิ่ม 3–4 วิชา, ดูรายการ, กลับ Home เห็นจำนวน/หน่วยกิตถูก"],
          ["ข้อมูลผิด", "ช่องว่างแต่ละช่อง, รหัสผิดรูปแบบ, หน่วยกิต 0/7/abc/2.5, รหัสซ้ำตัวพิมพ์ต่าง"],
          ["ค่าขอบ", "หน่วยกิต 1 และ 6, รวมพอดี 22, รวม 23"],
          ["การนำทาง", "Cancel ไม่บันทึกและล้างฟอร์ม, error เดิมหายเมื่อกลับมาหน้า Form"],
          ["ลบ", "ลบเมื่อไม่ได้เลือก (ปุ่มปิด), กด No แล้วไม่ลบ, ลบแล้ว Total ลด"],
        ] },
        { type: "run", title: "ชุดทดสอบอัตโนมัติของ planner", level: "ท้าทาย",
          concept: "เขียน test แบบตารางจากบทที่ 10 ให้ครอบคลุมกฎทุกข้อ รันได้ทุกครั้งที่แก้โค้ด เพื่อมั่นใจว่าการขยายฟีเจอร์ไม่ทำให้กฎเดิมพัง",
          code: withModel(j`
            import java.util.ArrayList;
            import java.util.Collections;
            import java.util.List;

            public class PlannerTests {
                static int passed = 0, total = 0;

                public static void main(String[] args) {
                    CoursePlanner p = new CoursePlanner();
                    expect(p.validate("CS101", "Programming", "3") == null, "valid course accepted");
                    p.add(new Course("CS101", "Programming", 3));
                    expect(p.getTotalCredits() == 3, "total is 3 after one course");
                    expect(p.validate("", "x", "3") != null, "empty code rejected");
                    expect(p.validate("CS102", "x", "0") != null, "0 credits rejected");
                    expect(p.validate("CS102", "x", "6") == null, "6 credits accepted (boundary)");
                    expect(p.validate("CS102", "x", "2.5") != null, "2.5 credits rejected");
                    expect(p.validate("Cs101", "x", "3") != null, "duplicate with different case rejected");
                    p.add(new Course("MA201", "Math", 6));
                    p.add(new Course("PH201", "Physics", 6));
                    p.add(new Course("EN201", "English", 4));
                    expect(p.validate("AR101", "Art", "3") == null, "exactly 22 credits accepted");
                    expect(p.validate("AR101", "Art", "4") != null, "23 credits rejected");
                    boolean threw = false;
                    try {
                        p.add(new Course("CS101", "dup", 1));
                    } catch (IllegalArgumentException e) {
                        threw = true;
                    }
                    expect(threw, "add() throws on duplicate even without validate");
                    p.remove(0);
                    expect(p.getTotalCredits() == 16 && !p.containsCode("CS101"), "remove updates list and total");
                    System.out.println(passed + "/" + total + " tests passed");
                }

                static void expect(boolean condition, String name) {
                    total++;
                    if (condition) passed++;
                    System.out.println((condition ? "PASS " : "FAIL ") + name);
                }
            }
            `),
          steps: ["แต่ละบรรทัด expect คือ acceptance criterion หนึ่งข้อที่เขียนเป็นโค้ด", "ทดสอบค่าขอบ 6 หน่วยกิต และรวม 22/23", "ทดสอบว่า add() ปกป้องกฎด้วยตัวเอง", "เมื่อเพิ่มฟีเจอร์ในแบบฝึกหัด ให้เพิ่ม test ในไฟล์นี้ด้วย"] },
        { type: "note", title: "แนวทางขยายงาน (ใช้ในแบบฝึกหัด)", html: `<ul><li>แก้ไขวิชาที่มีอยู่ (ใช้ฟอร์มเดียวกับเพิ่ม)</li><li>เรียงรายการตามรหัส/หน่วยกิต และค้นหาด้วยคำค้น</li><li>ประเภทวิชา (บังคับ/เลือก) ด้วย JComboBox และสรุปหน่วยกิตแยกประเภท</li><li>วิชาบังคับก่อน (prerequisite) และตารางเรียนที่เวลาไม่ชนกัน</li><li>ส่งออกรายการเป็นข้อความเพื่อคัดลอก</li></ul>` },
      ],
    },
  ],
  exercisesIntro: "แบบฝึกหัดบทนี้ขยาย Course Planner ทีละฟีเจอร์ เริ่มจาก model (ทดสอบใน console) แล้วจึงต่อเข้ากับ GUI ข้อท้าย ๆ คือการพัฒนาโปรเจกต์เต็มเพื่อส่งงาน",
  exercises: [
    { level: 1, title: "Acceptance criteria ของการลบ", html: `<p>เขียน acceptance criteria อย่างน้อย 4 ข้อสำหรับฟีเจอร์ “ลบวิชา” (รวมกรณีผิดพลาด/ยกเลิก) ในรูปแบบ “เมื่อ… ผลที่ต้องเห็น…” จากนั้นเขียนโปรแกรม console ที่ทดสอบ <code>CoursePlanner.remove</code> ตามข้อที่ทดสอบด้วย model ได้</p>`,
      spec: ["อย่างน้อย 1 ข้อเกี่ยวกับการกด No", "อย่างน้อย 1 ข้อเกี่ยวกับ Total หลังลบ", "ใช้ CoursePlanner จากบทเรียน"],
      solution: withModel(j`
        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;

        public class RemoveCriteria {
            public static void main(String[] args) {
                CoursePlanner p = new CoursePlanner();
                p.add(new Course("CS101", "Programming", 3));
                p.add(new Course("MA102", "Calculus", 4));
                p.add(new Course("EN103", "English", 3));
                System.out.println("Before: " + p.getCourses().size() + " courses, " + p.getTotalCredits() + " cr");
                p.remove(1);
                System.out.println("Remove index 1 -> " + p.getCourses().size() + " courses, " + p.getTotalCredits() + " cr");
                System.out.println("MA102 still there? " + p.containsCode("MA102"));
                System.out.println("Order kept: " + p.getCourses().get(0).getCode() + ", " + p.getCourses().get(1).getCode());
            }
        }
        `),
      answerHtml: `<p>ตัวอย่าง criteria: (1) เมื่อไม่ได้เลือกวิชา ปุ่ม Remove ถูกปิด (2) เลือก MA102 แล้ว Remove → Yes: MA102 หายและ Total ลด 4 (3) เลือกแล้ว Remove → No: รายการเหมือนเดิม (4) ลบแล้วลำดับวิชาที่เหลือไม่เปลี่ยน — ข้อ 2 และ 4 ทดสอบด้วย model ได้ ส่วนข้อ 1 และ 3 ต้องทดสอบบน GUI</p>`, answerFirst: true },
    { level: 1, title: "สรุปหน่วยกิตเป็นข้อความ", html: `<p>เพิ่มเมธอด <code>String summary()</code> ใน CoursePlanner ที่คืนข้อความหลายบรรทัด: รายการทุกวิชา (ใช้ toString ของ Course) เส้นคั่น และบรรทัด <code>Total: X / 22 credits (Y remaining)</code> ถ้าไม่มีวิชาให้คืน <code>No courses planned</code> ทดสอบใน console</p>`,
      spec: ["ใช้ StringBuilder", "remaining = MAX_CREDITS − total"],
      solution: withModel(j`
        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.List;

        public class SummaryTest {
            public static void main(String[] args) {
                CoursePlanner p = new CoursePlanner();
                System.out.println(summary(p));
                p.add(new Course("CS101", "Programming", 3));
                p.add(new Course("MA102", "Calculus", 4));
                p.add(new Course("PH103", "Physics", 4));
                System.out.println(summary(p));
            }

            // In the real project this method belongs inside CoursePlanner
            static String summary(CoursePlanner p) {
                if (p.getCourses().isEmpty()) return "No courses planned";
                StringBuilder sb = new StringBuilder();
                for (Course c : p.getCourses()) sb.append(c).append("\n");
                sb.append("-".repeat(36)).append("\n");
                int total = p.getTotalCredits();
                sb.append("Total: ").append(total).append(" / ").append(CoursePlanner.MAX_CREDITS)
                  .append(" credits (").append(CoursePlanner.MAX_CREDITS - total).append(" remaining)");
                return sb.toString();
            }
        }
        `), explain: "เฉลยเขียนเป็นเมธอด static รับ planner เพื่อให้ใช้คลาส CoursePlanner เดิมได้โดยไม่ต้องคัดลอกใหม่ ในโปรเจกต์จริงให้ย้ายเข้าไปเป็นเมธอดของ CoursePlanner (เปลี่ยน p. เป็นการเรียกตรง)" },
    { level: 2, title: "เรียงและค้นหาวิชา", html: `<p>เพิ่มความสามารถใน model: <code>List&lt;Course&gt; sortedBy(String key)</code> (key = \"code\" หรือ \"credits\" เรียงมากไปน้อย ถ้าเท่ากันเรียงตามรหัส) และ <code>List&lt;Course&gt; search(String keyword)</code> ค้นหาในรหัสหรือชื่อแบบไม่สนตัวพิมพ์ ทั้งสองเมธอดต้องคืนรายการใหม่ ไม่เปลี่ยนลำดับในรายการจริง</p>`,
      spec: ["ใช้ <code>Comparator.comparing(...).reversed().thenComparing(...)</code>", "ทดสอบว่าหลังเรียงแล้ว getCourses() ยังเป็นลำดับเดิม"],
      solution: withModel(j`
        import java.util.ArrayList;
        import java.util.Collections;
        import java.util.Comparator;
        import java.util.List;

        public class SortSearchTest {
            public static void main(String[] args) {
                CoursePlanner p = new CoursePlanner();
                p.add(new Course("PH103", "Physics", 4));
                p.add(new Course("CS101", "Programming", 3));
                p.add(new Course("MA102", "Calculus", 4));
                p.add(new Course("CS205", "Data Structures", 3));
                print("By code", sortedBy(p, "code"));
                print("By credits", sortedBy(p, "credits"));
                print("Search 'cs'", search(p, "cs"));
                print("Search 'cal'", search(p, "cal"));
                print("Original order", p.getCourses());
            }

            static List<Course> sortedBy(CoursePlanner p, String key) {
                List<Course> copy = new ArrayList<>(p.getCourses());
                if (key.equals("credits")) {
                    copy.sort(Comparator.comparing(Course::getCredits).reversed().thenComparing(Course::getCode));
                } else {
                    copy.sort(Comparator.comparing(Course::getCode));
                }
                return copy;
            }

            static List<Course> search(CoursePlanner p, String keyword) {
                String k = keyword.toLowerCase();
                List<Course> result = new ArrayList<>();
                for (Course c : p.getCourses()) {
                    if (c.getCode().toLowerCase().contains(k) || c.getName().toLowerCase().contains(k)) result.add(c);
                }
                return result;
            }

            static void print(String title, List<Course> list) {
                System.out.println(title + ":");
                for (Course c : list) System.out.println("  " + c);
            }
        }
        `) },
    { level: 2, title: "เพิ่มประเภทวิชาและสรุปแยกประเภท", html: `<p>เพิ่ม field <code>type</code> ใน Course (\"Core\" หรือ \"Elective\") ในฟอร์มให้เลือกด้วย JComboBox และหน้า Home แสดงหน่วยกิตแยก: <code>Core: X cr, Elective: Y cr</code> ทำเป็นโปรแกรม GUI สองหน้า (Form + Home) ที่สั้นลงจากบทเรียนได้</p>`,
      spec: ["เพิ่ม getter และแก้ toString ให้แสดงประเภท", "เพิ่มเมธอด <code>int creditsOf(String type)</code> ใน planner", "ภาพตัวอย่าง: เพิ่ม 3 วิชา (2 Core, 1 Elective) แล้วดูหน้า Home"], gui: true,
      actions: "type field:0 CS101\ntype field:1 3\nclick Save\ntype field:0 MA102\ntype field:1 4\nclick Save\ntype field:0 AR110\ntype field:1 2\nselect combo:0 1\nclick Save\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.ArrayList;

        public class TypedPlanner {
            private final ArrayList<TypedCourse> courses = new ArrayList<>();
            private final JTextField code = new JTextField(8);
            private final JTextField credits = new JTextField(4);
            private final JComboBox<String> type = new JComboBox<>(new String[]{"Core", "Elective"});
            private final JLabel summary = new JLabel();
            private final DefaultListModel<TypedCourse> model = new DefaultListModel<>();

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new TypedPlanner().show());
            }

            private void show() {
                JFrame frame = new JFrame("Planner by type");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JButton save = new JButton("Save");
                save.addActionListener(e -> {
                    try {
                        int cr = Integer.parseInt(credits.getText().trim());
                        if (code.getText().isBlank() || cr < 1 || cr > 6) throw new NumberFormatException();
                        TypedCourse c = new TypedCourse(code.getText().trim().toUpperCase(), cr, (String) type.getSelectedItem());
                        courses.add(c);
                        model.addElement(c);
                        code.setText("");
                        credits.setText("");
                        type.setSelectedIndex(0);
                        refresh();
                    } catch (NumberFormatException ex) {
                        summary.setText("Invalid input");
                    }
                });
                JPanel form = new JPanel();
                form.add(new JLabel("Code:")); form.add(code);
                form.add(new JLabel("Cr:")); form.add(credits);
                form.add(type); form.add(save);
                JPanel root = new JPanel(new BorderLayout(0, 6));
                root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                root.add(form, BorderLayout.NORTH);
                root.add(new JScrollPane(new JList<>(model)), BorderLayout.CENTER);
                root.add(summary, BorderLayout.SOUTH);
                refresh();
                frame.setContentPane(root);
                frame.setSize(420, 200);
                frame.setVisible(true);
            }

            private int creditsOf(String t) {
                int sum = 0;
                for (TypedCourse c : courses) if (c.type.equals(t)) sum += c.credits;
                return sum;
            }

            private void refresh() {
                summary.setText("Core: " + creditsOf("Core") + " cr, Elective: " + creditsOf("Elective")
                    + " cr, Total: " + (creditsOf("Core") + creditsOf("Elective")) + " cr");
            }
        }

        class TypedCourse {
            final String code, type;
            final int credits;
            TypedCourse(String code, int credits, String type) { this.code = code; this.credits = credits; this.type = type; }
            @Override public String toString() { return code + " (" + credits + " cr, " + type + ")"; }
        }`, explain: "เฉลยรวม Form กับรายการไว้หน้าเดียวเพื่อให้สั้น ในโปรเจกต์ให้ย้าย field type เข้า Course เดิม และแสดงสรุปที่หน้า Home" },
    { level: 2, title: "แก้ไขวิชาที่มีอยู่", html: `<p>เพิ่มปุ่ม <code>Edit</code> ในหน้า List: เมื่อเลือกวิชาแล้วกด Edit ให้ไปหน้า Form ที่เติมข้อมูลเดิมไว้ ปุ่ม Save จะ<strong>แทนที่</strong>วิชาเดิมแทนการเพิ่มใหม่ การตรวจรหัสซ้ำต้องไม่นับวิชาที่กำลังแก้ และการตรวจเพดานหน่วยกิตต้องหักหน่วยกิตเดิมออกก่อน</p>`,
      spec: ["เก็บ <code>int editingIndex = -1</code> (−1 = โหมดเพิ่ม)", "ใน planner เพิ่ม <code>validate(code, name, credits, ignoreIndex)</code> และ <code>replace(index, course)</code>", "หัวฟอร์มเปลี่ยนเป็น “Edit course” เมื่ออยู่ในโหมดแก้ไข", "ภาพตัวอย่าง: แก้ MA102 จาก 4 เป็น 3 หน่วยกิต"], gui: true,
      actions: "type field:0 CS101\ntype field:1 Programming\ntype field:2 3\nclick Save\ntype field:0 MA102\ntype field:1 Calculus\ntype field:2 4\nclick Save\nselect list:0 1\nclick Edit\nshot\ntype field:2 3\nclick Save\nshot", captions: ["เลือก MA102 แล้วคลิก Edit (ฟอร์มเติมข้อมูลเดิม)", "แก้เป็น 3 หน่วยกิตแล้ว Save"],
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.ArrayList;

        public class EditablePlanner {
            private final ArrayList<String[]> courses = new ArrayList<>();
            private final DefaultListModel<String> model = new DefaultListModel<>();
            private final JList<String> list = new JList<>(model);
            private final JTextField code = new JTextField(7), name = new JTextField(10), credits = new JTextField(3);
            private final JLabel title = new JLabel("Add course");
            private final JLabel status = new JLabel(" ");
            private int editingIndex = -1;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> new EditablePlanner().show());
            }

            private void show() {
                JFrame frame = new JFrame("Editable planner");
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                JButton save = new JButton("Save");
                JButton edit = new JButton("Edit");
                save.addActionListener(e -> save());
                edit.addActionListener(e -> startEdit());
                title.setFont(title.getFont().deriveFont(Font.BOLD));
                JPanel form = new JPanel();
                form.add(title);
                form.add(code); form.add(name); form.add(credits); form.add(save);
                JPanel south = new JPanel(new BorderLayout());
                south.add(status, BorderLayout.WEST);
                south.add(edit, BorderLayout.EAST);
                JPanel root = new JPanel(new BorderLayout(0, 6));
                root.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                root.add(form, BorderLayout.NORTH);
                root.add(new JScrollPane(list), BorderLayout.CENTER);
                root.add(south, BorderLayout.SOUTH);
                frame.setContentPane(root);
                frame.setSize(460, 200);
                frame.setVisible(true);
            }

            private String validate(String c, String n, String cr, int ignoreIndex) {
                if (c.isEmpty() || n.isEmpty()) return "fill every field";
                int credit;
                try { credit = Integer.parseInt(cr); } catch (NumberFormatException e) { return "credits must be a number"; }
                if (credit < 1 || credit > 6) return "credits 1-6";
                int total = 0;
                for (int i = 0; i < courses.size(); i++) {
                    if (i == ignoreIndex) continue;
                    if (courses.get(i)[0].equalsIgnoreCase(c)) return c + " already exists";
                    total += Integer.parseInt(courses.get(i)[2]);
                }
                if (total + credit > 22) return "over 22 credits";
                return null;
            }

            private void save() {
                String c = code.getText().trim().toUpperCase(), n = name.getText().trim(), cr = credits.getText().trim();
                String err = validate(c, n, cr, editingIndex);
                if (err != null) { status.setText("Error: " + err); return; }
                String[] course = {c, n, cr};
                if (editingIndex >= 0) courses.set(editingIndex, course);
                else courses.add(course);
                status.setText(editingIndex >= 0 ? "Updated " + c : "Added " + c);
                editingIndex = -1;
                title.setText("Add course");
                code.setText(""); name.setText(""); credits.setText("");
                model.clear();
                int total = 0;
                for (String[] x : courses) {
                    model.addElement(x[0] + "  " + x[1] + "  " + x[2] + " cr");
                    total += Integer.parseInt(x[2]);
                }
                status.setText(status.getText() + " | total " + total + " cr");
            }

            private void startEdit() {
                int i = list.getSelectedIndex();
                if (i < 0) return;
                editingIndex = i;
                String[] x = courses.get(i);
                code.setText(x[0]); name.setText(x[1]); credits.setText(x[2]);
                title.setText("Edit course");
            }
        }`, explain: "เฉลยใช้ String[] แทน Course เพื่อให้ข้อสั้น — ในโปรเจกต์ให้ใช้ Course และย้าย validate(..., ignoreIndex) กับ replace(...) เข้า CoursePlanner ตามที่โจทย์กำหนด" },
    { level: 3, title: "วิชาบังคับก่อน (prerequisite)", html: `<p>เพิ่มกฎ: วิชาบางวิชามีวิชาบังคับก่อน กำหนดใน model เป็นอาเรย์คู่ เช่น <code>{\"CS201\", \"CS101\"}</code> (CS201 ต้องมี CS101 ก่อน), <code>{\"CS301\", \"CS201\"}</code>, <code>{\"MA201\", \"MA101\"}</code> การเพิ่มวิชาที่ยังไม่มีวิชาบังคับก่อนในแผนต้องถูกปฏิเสธพร้อมบอกว่าขาดวิชาอะไร และ<strong>การลบ</strong>วิชาที่เป็นวิชาบังคับก่อนของวิชาอื่นในแผนก็ต้องถูกปฏิเสธเช่นกัน เขียน model และชุดทดสอบใน console</p>`,
      spec: ["เมธอด <code>String missingPrerequisite(String code)</code> คืนรหัสที่ขาดหรือ null", "เมธอด <code>String blockingDependent(String code)</code> คืนรหัสวิชาที่ต้องใช้วิชานี้", "ชุดทดสอบอย่างน้อย 6 กรณีแสดง PASS/FAIL"],
      solution: j`
        import java.util.ArrayList;

        public class PrerequisitePlanner {
            static final String[][] PREREQ = {{"CS201", "CS101"}, {"CS301", "CS201"}, {"MA201", "MA101"}};
            final ArrayList<String> plan = new ArrayList<>();

            String missingPrerequisite(String code) {
                for (String[] rule : PREREQ) {
                    if (rule[0].equals(code) && !plan.contains(rule[1])) return rule[1];
                }
                return null;
            }

            String blockingDependent(String code) {
                for (String[] rule : PREREQ) {
                    if (rule[1].equals(code) && plan.contains(rule[0])) return rule[0];
                }
                return null;
            }

            String add(String code) {
                String missing = missingPrerequisite(code);
                if (missing != null) return "cannot add " + code + ": needs " + missing;
                plan.add(code);
                return "added " + code;
            }

            String remove(String code) {
                String dep = blockingDependent(code);
                if (dep != null) return "cannot remove " + code + ": required by " + dep;
                plan.remove(code);
                return "removed " + code;
            }

            static int passed = 0, total = 0;

            public static void main(String[] args) {
                PrerequisitePlanner p = new PrerequisitePlanner();
                test(p.add("CS201"), "cannot add CS201: needs CS101");
                test(p.add("CS101"), "added CS101");
                test(p.add("CS201"), "added CS201");
                test(p.add("CS301"), "added CS301");
                test(p.remove("CS101"), "cannot remove CS101: required by CS201");
                test(p.remove("CS301"), "removed CS301");
                test(p.remove("CS201"), "removed CS201");
                test(p.add("MA201"), "cannot add MA201: needs MA101");
                System.out.println("Plan: " + p.plan);
                System.out.println(passed + "/" + total + " passed");
            }

            static void test(String actual, String expected) {
                total++;
                boolean ok = actual.equals(expected);
                if (ok) passed++;
                System.out.println((ok ? "PASS " : "FAIL ") + actual);
            }
        }`, explain: "กฎข้ามรายการแบบนี้ควรอยู่ใน model เท่านั้น — GUI แค่แสดงข้อความที่ model คืนมา" },
    { level: 3, title: "โปรเจกต์เต็ม: Course Planner v2 (ส่งงาน)", html: `<p>พัฒนาแอป Course Planner จากบทเรียนให้เป็นเวอร์ชัน 2 ที่มีอย่างน้อย:</p><ol><li>ทุกฟีเจอร์ของเวอร์ชันแรก (Home / Form / List, validation, ลบพร้อมยืนยัน)</li><li>แก้ไขวิชา (ข้อ 19.5)</li><li>ประเภทวิชา Core/Elective และสรุปแยกประเภทที่หน้า Home (ข้อ 19.4)</li><li>เรียงรายการตามรหัสหรือหน่วยกิตด้วย JComboBox ในหน้า List และช่องค้นหาที่กรองรายการทันทีที่พิมพ์ (DocumentListener) หรือเมื่อกดปุ่ม</li><li>ปุ่ม Export ที่แสดงสรุปทั้งหมด (ข้อ 19.2) ใน JTextArea ของ dialog ให้คัดลอกได้</li><li>ชุดทดสอบ model อัตโนมัติอย่างน้อย 12 กรณี</li></ol><p>ภาพตัวอย่างด้านล่างคือแอปเวอร์ชันแรกจากบทเรียนหลังเพิ่มวิชาครบ 22 หน่วยกิต ใช้เป็นจุดเริ่มต้น</p>`,
      spec: ["แยกไฟล์: Course.java, CoursePlanner.java, CoursePlannerApp.java, PlannerTests.java", "ไม่มีกฎธุรกิจอยู่ใน listener — listener เรียกเมธอดของ planner เท่านั้น", "ส่งพร้อมภาพหน้าจอของทุกหน้า และผลรันชุดทดสอบ", "เขียน README สั้น ๆ: ฟีเจอร์, วิธีรัน, acceptance criteria ที่ทดสอบแล้ว"], gui: true,
      actions: ["click Add course", addCourse("CS101", "Programming", "3"), "click Add another", addCourse("MA102", "Calculus", "4"), "click Add another", addCourse("PH103", "Physics", "4"), "click Add another", addCourse("EN104", "English", "3"), "click Add another", addCourse("SC105", "Science Lab", "6"), "click Add another", addCourse("AR106", "Art", "2"), "shot", "click Home", "shot"].join("\n"),
      captions: ["หน้า LIST เมื่อวางแผนครบ 22 หน่วยกิต", "หน้า HOME"],
      solution: FULL_APP, answerHtml: `<p>เฉลยแสดงโค้ดเวอร์ชันแรก (จุดเริ่มต้น) — ฟีเจอร์เวอร์ชัน 2 ให้พัฒนาต่อโดยใช้คำตอบของข้อ 19.2–19.6 และไม่มีเฉลยเดียวที่ถูกต้อง ผู้สอนประเมินจาก: ทำงานครบตาม requirements, การแยก model/UI, คุณภาพ validation และข้อความ error, และความครอบคลุมของชุดทดสอบ</p>`, answerFirst: true },
  ],
};
