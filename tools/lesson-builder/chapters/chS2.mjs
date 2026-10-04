import { j, c, pre } from "../lib.mjs";

export default {
  num: "S2", file: "side-quest-timer.html", idPrefix: "S2", passPrefix: "side", utility: "SIDE QUEST 02",
  pageTitle: "บทเสริม: Timer, Thread และ Swing", shortName: "บทเสริม Timer",
  tocLabel: "บทเสริม · Timer และ Thread", sidebarBottom: "งานนานไปทำเบื้องหลัง อัปเดต UI บน EDT",
  kicker: "บทเสริม · งานตามเวลาและงานเบื้องหลัง", h1: "Timer, Thread และ Swing",
  lead: "ทำความเข้าใจว่าทำไม GUI ค้างเมื่อทำงานนานบน event thread และเลือกเครื่องมือที่เหมาะกับนาฬิกานับถอยหลังหรืองานเบื้องหลัง",
  goals: ["อธิบายบทบาทของ Event Dispatch Thread", "ใช้ javax.swing.Timer สำหรับ event ตามช่วงเวลา", "แยกงานที่ใช้เวลานานไปทำเบื้องหลังด้วย Thread และ SwingWorker", "อัปเดต Swing component บน EDT เท่านั้น"],
  prev: { href: "side-quest-random.html", label: "← Random" },
  next: { href: "../index.html", label: "กลับสารบัญรายวิชา →" },
  footer: "บทเสริม Timer · อย่า block EDT",
  introHeading: "ให้หน้าต่างตอบสนองเสมอ",
  introHtml: `<p>Swing event handler ทำงานบน <strong>Event Dispatch Thread (EDT)</strong> ซึ่งมีหน้าที่รับ event และวาด/อัปเดต UI ถ้า handler หยุดรอนาน event อื่นและการวาดหน้าจอจะรอไปด้วย บทนี้เริ่มจาก thread ใน console เพื่อเข้าใจแนวคิด แล้วจึงนำไปใช้กับ Swing ภาพหน้าต่างถ่ายหลังโปรแกรมทำงานไประยะหนึ่ง (ระบุเวลาในคำบรรยายภาพ)</p>`,
  topics: [
    {
      num: "S2.1", toc: "Event Dispatch Thread", title: "Thread และ Event Dispatch Thread",
      blocks: [
        { type: "p", html: `<strong>Thread</strong> คือเส้นทางการทำงานหนึ่งเส้นในโปรแกรม โปรแกรมทั่วไปเริ่มด้วย thread ชื่อ main โปรแกรม Swing มีอีก thread คือ EDT ที่รอ event และวาดหน้าจอ เราสร้าง thread เพิ่มเพื่อทำงานพร้อมกันได้` },
        { type: "run", title: "สอง thread ทำงานสลับกัน (console)", level: "พื้นฐาน",
          concept: "สร้าง Thread ด้วย lambda แล้ว <code>start()</code> — main และ worker ทำงานคู่ขนาน <code>join()</code> รอให้ worker จบก่อนทำต่อ",
          code: j`
            public class TwoThreads {
                public static void main(String[] args) throws InterruptedException {
                    Thread worker = new Thread(() -> {
                        for (int i = 1; i <= 3; i++) {
                            System.out.println("worker step " + i);
                            sleep(120);
                        }
                    });
                    worker.start();
                    for (int i = 1; i <= 3; i++) {
                        System.out.println("main step " + i);
                        sleep(100);
                    }
                    worker.join();
                    System.out.println("both finished");
                }

                static void sleep(int ms) {
                    try { Thread.sleep(ms); } catch (InterruptedException e) { }
                }
            }`,
          steps: ["start() เริ่ม thread ใหม่ทันที main ไม่รอ", "ข้อความของสอง thread สลับกัน ลำดับอาจต่างเล็กน้อยในแต่ละครั้งที่รัน", "join() ทำให้ main รอ worker จบก่อนพิมพ์ “both finished”"] },
        { type: "run", label: "ทดลองบั๊ก S2.1.2", title: "Thread.sleep บน EDT ทำหน้าต่างค้าง", level: "ต่อยอด", gui: true, actions: "click Start (blocking)\nshot", captions: ["ภาพแรกที่จับได้หลังคลิก — ได้เมื่อ EDT ว่างแล้วเท่านั้น (หลัง 2 วินาที)"],
          concept: "listener เปลี่ยนข้อความเป็น Working... แล้ว sleep 2 วินาที — แต่หน้าจอไม่ได้วาดข้อความนั้นเลย เพราะ EDT ถูกบล็อก ปุ่มยังค้างในสถานะถูกกด",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class FrozenUi {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Frozen");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel status = new JLabel("Idle", SwingConstants.CENTER);
                        JButton start = new JButton("Start (blocking)");
                        start.addActionListener(e -> {
                            status.setText("Working...");
                            try {
                                Thread.sleep(2000);
                            } catch (InterruptedException ex) { }
                            status.setText("Done");
                        });
                        frame.add(status, BorderLayout.CENTER);
                        frame.add(start, BorderLayout.SOUTH);
                        frame.setSize(260, 120);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["setText(\"Working...\") แค่บันทึกว่าต้องวาดใหม่ การวาดจริงทำโดย EDT ภายหลัง", "แต่ EDT กำลัง sleep อยู่ใน listener จึงไม่มีโอกาสวาด", "แม้แต่โปรแกรมที่ใช้ถ่ายภาพหน้าจอนี้ก็ต้องรอ EDT ว่าง — ภาพแรกที่ได้จึงเป็น Done ทันที ไม่เคยมีจังหวะที่หน้าจอแสดง Working...", "ระหว่าง 2 วินาทีนั้นหน้าต่างไม่ตอบสนอง ย้าย/ย่อ/กดปุ่มไม่ได้"] },
        { type: "check", title: "ทำไมค้าง", html: `<p>ถ้าระหว่าง listener ข้างต้น sleep ผู้ใช้คลิกปุ่มอื่นอีก 3 ครั้ง จะเกิดอะไรขึ้น</p>`, answer: `<p>การคลิกถูกเก็บไว้ในคิว event และจะถูกประมวลผลต่อกันทันทีหลัง listener แรกจบ — ผู้ใช้จะรู้สึกว่าโปรแกรมไม่ตอบสนองแล้วกระตุก</p>` },
      ],
    },
    {
      num: "S2.2", toc: "Swing Timer", title: "javax.swing.Timer: งานตามช่วงเวลา",
      blocks: [
        { type: "p", html: `<code>new Timer(delayMs, listener)</code> เรียก listener ซ้ำทุก delay มิลลิวินาที <strong>บน EDT</strong> จึงแก้ component ได้ปลอดภัยและไม่บล็อกหน้าจอระหว่างรอ ใช้กับนาฬิกา นับถอยหลัง แอนิเมชันง่าย ๆ (ระวัง: ใช้ <code>javax.swing.Timer</code> ไม่ใช่ <code>java.util.Timer</code>)` },
        { type: "run", title: "นับถอยหลัง 10 วินาที", level: "พื้นฐาน", gui: true, actions: "click Start\nwait 3200\nshot", captions: ["ประมาณ 3 วินาทีหลังคลิก Start"],
          concept: "Timer ทุก 1000 ms ลดตัวเลขทีละ 1 และหยุดตัวเองด้วย <code>timer.stop()</code> เมื่อถึง 0",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class Countdown {
                private static int seconds = 10;

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Countdown");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel label = new JLabel("10", SwingConstants.CENTER);
                        label.setFont(new Font("SansSerif", Font.BOLD, 40));
                        JButton start = new JButton("Start");
                        Timer timer = new Timer(1000, null);
                        timer.addActionListener(e -> {
                            seconds--;
                            label.setText(String.valueOf(seconds));
                            if (seconds == 0) {
                                timer.stop();
                                label.setText("Time's up!");
                                start.setEnabled(true);
                            }
                        });
                        start.addActionListener(e -> {
                            seconds = 10;
                            label.setText("10");
                            start.setEnabled(false);
                            timer.start();
                        });
                        frame.add(label, BorderLayout.CENTER);
                        frame.add(start, BorderLayout.SOUTH);
                        frame.setSize(240, 160);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["สร้าง Timer ก่อน แล้วเพิ่ม listener ทีหลังเพื่อให้ lambda อ้างถึงตัวแปร timer ได้", "ทุกวินาที listener ทำงานบน EDT และแก้ label ได้ตรง ๆ", "ระหว่างรอระหว่าง tick หน้าต่างยังตอบสนองปกติ", "ปุ่ม Start ปิดระหว่างนับ ป้องกันเริ่มซ้อน"] },
        { type: "run", title: "นาฬิกาจับเวลา Start / Stop / Reset", level: "ต่อยอด", gui: true, actions: "click Start\nwait 1600\nclick Stop\nshot", captions: ["Start แล้ว Stop หลังประมาณ 1.6 วินาที"],
          concept: "ใช้ Timer ถี่ (100 ms) เพื่อแสดงทศนิยม แต่คำนวณเวลาจริงจาก <code>System.currentTimeMillis()</code> — แม่นกว่าการนับ tick เพราะ Timer อาจมาช้าเล็กน้อย",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class Stopwatch {
                private static long startMillis;
                private static long accumulated = 0;

                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Stopwatch");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JLabel display = new JLabel("0.0 s", SwingConstants.CENTER);
                        display.setFont(new Font("Monospaced", Font.BOLD, 32));
                        Timer timer = new Timer(100, e -> {
                            long elapsed = accumulated + System.currentTimeMillis() - startMillis;
                            display.setText(String.format("%.1f s", elapsed / 1000.0));
                        });
                        JButton start = new JButton("Start");
                        JButton stop = new JButton("Stop");
                        JButton reset = new JButton("Reset");
                        start.addActionListener(e -> {
                            if (!timer.isRunning()) {
                                startMillis = System.currentTimeMillis();
                                timer.start();
                            }
                        });
                        stop.addActionListener(e -> {
                            if (timer.isRunning()) {
                                timer.stop();
                                accumulated += System.currentTimeMillis() - startMillis;
                            }
                        });
                        reset.addActionListener(e -> {
                            timer.stop();
                            accumulated = 0;
                            display.setText("0.0 s");
                        });
                        JPanel buttons = new JPanel();
                        buttons.add(start);
                        buttons.add(stop);
                        buttons.add(reset);
                        frame.add(display, BorderLayout.CENTER);
                        frame.add(buttons, BorderLayout.SOUTH);
                        frame.setSize(260, 150);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["accumulated เก็บเวลารวมของช่วงก่อนหน้า ทำให้ Start ต่อหลัง Stop ได้", "timer.isRunning() ป้องกันกด Start ซ้ำ", "ตัวเลขในภาพอาจต่างเล็กน้อยจาก 1.6 ตามจังหวะเวลาของเครื่อง"] },
        { type: "run", title: "แอนิเมชัน: แถบความคืบหน้าและสีที่เปลี่ยน", level: "ประยุกต์", gui: true, actions: "wait 1300\nshot", captions: ["ประมาณ 1.3 วินาทีหลังเปิดโปรแกรม"],
          concept: "Timer 50 ms เพิ่มค่า JProgressBar ทีละ 2% และเปลี่ยนสีตามช่วง — เป็นพื้นฐานของแอนิเมชันใน Swing",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ProgressAnimation {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Loading");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JProgressBar bar = new JProgressBar(0, 100);
                        bar.setStringPainted(true);
                        JLabel status = new JLabel("Starting...", SwingConstants.CENTER);
                        Timer timer = new Timer(50, null);
                        timer.addActionListener(e -> {
                            int v = bar.getValue() + 2;
                            bar.setValue(v);
                            bar.setForeground(v < 40 ? new Color(200, 80, 60) : v < 80 ? new Color(230, 160, 30) : new Color(60, 160, 60));
                            status.setText(v < 100 ? "Loading course data..." : "Ready!");
                            if (v >= 100) timer.stop();
                        });
                        timer.start();
                        JPanel p = new JPanel(new GridLayout(2, 1, 6, 6));
                        p.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
                        p.add(bar);
                        p.add(status);
                        frame.setContentPane(p);
                        frame.setSize(300, 120);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["ทุก 50 ms เพิ่ม 2% → ครบ 100% ในประมาณ 2.5 วินาที", "ภาพที่ประมาณ 1.3 วินาทีจึงอยู่ราวครึ่งทาง", "สีเปลี่ยนจากแดง → ส้ม → เขียว ตามค่า", "timer.stop() เมื่อครบ"] },
        { type: "check", title: "Timer", html: `<p>ถ้าใช้ <code>while (seconds &gt; 0) { Thread.sleep(1000); seconds--; label.setText(...); }</code> ใน listener ของปุ่ม แทนการใช้ Timer จะเกิดอะไรขึ้น</p>`, answer: `<p>หน้าต่างค้าง 10 วินาทีและไม่เห็นตัวเลขเปลี่ยนระหว่างนั้น เพราะลูปบล็อก EDT — Timer แบ่งงานเป็นชิ้นสั้น ๆ ทำให้ EDT ว่างวาดหน้าจอระหว่างแต่ละ tick</p>` },
      ],
    },
    {
      num: "S2.3", toc: "งานเบื้องหลัง", title: "งานเบื้องหลังด้วย SwingWorker",
      blocks: [
        { type: "p", html: `งานที่ใช้เวลานานจริง ๆ (คำนวณหนัก อ่านไฟล์ใหญ่ ดาวน์โหลด) ต้องทำบน thread อื่น แต่<strong>ห้ามแก้ component จาก thread นั้น</strong> <code>SwingWorker&lt;T, V&gt;</code> จัดการให้: <code>doInBackground()</code> ทำงานบน thread เบื้องหลัง, <code>publish()</code>/<code>process()</code> ส่งความคืบหน้ากลับมาบน EDT, และ <code>done()</code> ทำงานบน EDT เมื่อเสร็จ` },
        { type: "concept", title: "เมธอดของ SwingWorker ทำงานบน thread ไหน", html: pre(`
          worker.execute()
              │
              ├── doInBackground()   ← background thread  (ห้ามแตะ component)
              │      publish(x) ───┐
              │                    ▼
              ├── process(chunks)   ← EDT  (อัปเดต progress ได้)
              │
              └── done()            ← EDT  (เรียก get() เอาผลลัพธ์ แล้วแสดงผล)`) },
        { type: "run", title: "นับจำนวนเฉพาะเบื้องหลังพร้อม progress", level: "ประยุกต์", gui: true, actions: "click Count primes\nwait 2500\nshot", captions: ["ประมาณ 2.5 วินาทีหลังคลิก (งานเสร็จแล้ว)"],
          concept: "หน้าต่างยังตอบสนองระหว่างคำนวณ ความคืบหน้าส่งผ่าน <code>setProgress</code> ซึ่ง SwingWorker แจ้ง listener บน EDT ให้อัตโนมัติ",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class PrimeWorkerDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Background work");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        JProgressBar bar = new JProgressBar(0, 100);
                        bar.setStringPainted(true);
                        JLabel result = new JLabel("Primes below 2,000,000: ?", SwingConstants.CENTER);
                        JButton go = new JButton("Count primes");
                        go.addActionListener(e -> {
                            go.setEnabled(false);
                            SwingWorker<Integer, Void> worker = new SwingWorker<>() {
                                @Override
                                protected Integer doInBackground() {
                                    int limit = 2_000_000, count = 0;
                                    for (int n = 2; n < limit; n++) {
                                        if (isPrime(n)) count++;
                                        if (n % 20_000 == 0) setProgress(n * 100 / limit);
                                    }
                                    return count;
                                }

                                @Override
                                protected void done() {
                                    try {
                                        result.setText(String.format("Primes below 2,000,000: %,d", get()));
                                    } catch (Exception ex) {
                                        result.setText("Error: " + ex.getMessage());
                                    }
                                    bar.setValue(100);
                                    go.setEnabled(true);
                                }
                            };
                            worker.addPropertyChangeListener(ev -> {
                                if ("progress".equals(ev.getPropertyName())) bar.setValue((Integer) ev.getNewValue());
                            });
                            worker.execute();
                        });
                        JPanel p = new JPanel(new GridLayout(3, 1, 6, 6));
                        p.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));
                        p.add(go);
                        p.add(bar);
                        p.add(result);
                        frame.setContentPane(p);
                        frame.setSize(320, 150);
                        frame.setVisible(true);
                    });
                }

                static boolean isPrime(int n) {
                    for (int d = 2; (long) d * d <= n; d++) if (n % d == 0) return false;
                    return true;
                }
            }`,
          steps: ["doInBackground ทำงานบน thread อื่น ไม่แตะ component เลย", "setProgress (0–100) ปลอดภัยที่จะเรียกจาก background — listener ได้รับบน EDT", "done() ทำงานบน EDT: get() เอาผลลัพธ์แล้วแสดง", "ระหว่างคำนวณ ผู้ใช้ยังย้ายหน้าต่างหรือคลิกส่วนอื่นได้"] },
        { type: "run", title: "invokeLater: ส่งงานกลับมาที่ EDT จาก Thread ธรรมดา", level: "ท้าทาย", gui: true, actions: "click Download\nwait 1500\nshot", captions: ["ประมาณ 1.5 วินาทีหลังคลิก"],
          concept: "ถ้าใช้ Thread เองแทน SwingWorker ทุกการแก้ component ต้องห่อด้วย <code>SwingUtilities.invokeLater</code> เพื่อส่งงานนั้นกลับไปทำบน EDT",
          code: j`
            import javax.swing.*;
            import java.awt.*;

            public class ManualThreadDemo {
                public static void main(String[] args) {
                    SwingUtilities.invokeLater(() -> {
                        JFrame frame = new JFrame("Fake download");
                        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                        DefaultListModel<String> log = new DefaultListModel<>();
                        JButton download = new JButton("Download");
                        download.addActionListener(e -> {
                            download.setEnabled(false);
                            new Thread(() -> {
                                for (int part = 1; part <= 4; part++) {
                                    try { Thread.sleep(250); } catch (InterruptedException ex) { return; }
                                    final int p = part;
                                    SwingUtilities.invokeLater(() -> log.addElement("received part " + p + "/4"));
                                }
                                SwingUtilities.invokeLater(() -> {
                                    log.addElement("download complete");
                                    download.setEnabled(true);
                                });
                            }).start();
                        });
                        frame.add(new JScrollPane(new JList<>(log)), BorderLayout.CENTER);
                        frame.add(download, BorderLayout.SOUTH);
                        frame.setSize(260, 170);
                        frame.setVisible(true);
                    });
                }
            }`,
          steps: ["Thread ใหม่ sleep ได้โดยไม่บล็อกหน้าจอ", "แต่การ addElement ต้องทำบน EDT จึงห่อด้วย invokeLater", "<code>final int p = part</code> เพราะ lambda ใช้ได้เฉพาะตัวแปรที่ไม่เปลี่ยนค่า (effectively final)", "SwingWorker มักง่ายและปลอดภัยกว่าวิธีนี้"] },
      ],
    },
    {
      num: "S2.4", toc: "เลือกเครื่องมือและทดสอบ", title: "เลือกเครื่องมือและทดสอบ",
      blocks: [
        { type: "table", head: ["สถานการณ์", "เครื่องมือ", "เหตุผล"], rows: [
          ["อัปเดตทุก n มิลลิวินาที (นาฬิกา, นับถอยหลัง, แอนิเมชัน)", "<code>javax.swing.Timer</code>", "ทำงานบน EDT แก้ UI ได้ตรง ๆ"],
          ["งานนานครั้งเดียวแล้วแสดงผล", "<code>SwingWorker</code>", "แยก background/EDT ให้ชัด มี progress และ done()"],
          ["งานเบื้องหลังที่ไม่เกี่ยวกับ UI (console)", "<code>Thread</code>", "ง่ายที่สุด"],
          ["ส่งงานจาก thread อื่นมาแก้ UI", "<code>SwingUtilities.invokeLater</code>", "รับประกันว่าทำบน EDT"],
        ] },
        { type: "run", title: "แยก logic เวลาออกจาก Timer เพื่อทดสอบ", level: "ประยุกต์",
          concept: "คลาส <code>CountdownModel</code> ไม่รู้จัก Timer หรือ Swing — มีแค่เมธอด tick() ทดสอบได้ทันทีโดยไม่ต้องรอเวลาจริง แล้วค่อยให้ Timer เรียก tick() ในแอปจริง",
          code: j`
            public class CountdownModelTest {
                public static void main(String[] args) {
                    CountdownModel m = new CountdownModel(3);
                    System.out.println("start: " + m.display() + " finished=" + m.isFinished());
                    for (int i = 0; i < 5; i++) {
                        m.tick();
                        System.out.println("tick " + (i + 1) + ": " + m.display() + " finished=" + m.isFinished());
                    }
                    CountdownModel long1 = new CountdownModel(125);
                    System.out.println("125 s shows " + long1.display());
                }
            }

            class CountdownModel {
                private int remaining;

                CountdownModel(int seconds) { remaining = seconds; }

                void tick() {
                    if (remaining > 0) remaining--;
                }

                boolean isFinished() { return remaining == 0; }

                String display() {
                    return String.format("%02d:%02d", remaining / 60, remaining % 60);
                }
            }`,
          steps: ["tick ไม่ลดต่ำกว่า 0 แม้ถูกเรียกเกิน", "display จัดรูปแบบนาที:วินาที", "ทดสอบ 5 tick ได้ในพริบตา ไม่ต้องรอ 5 วินาที"] },
        { type: "note", title: "Checklist เมื่อใช้ thread กับ Swing", html: `<ul><li>ไม่มี Thread.sleep หรือลูปยาวใน listener</li><li>ไม่แก้ component จาก thread อื่นโดยไม่ผ่าน invokeLater / SwingWorker</li><li>ปิดปุ่มเริ่มระหว่างทำงาน ป้องกันเริ่มงานซ้อน</li><li>หยุด Timer เมื่อไม่ใช้ (stop) เพื่อไม่ให้ทำงานค้างเบื้องหลัง</li></ul>` },
      ],
    },
  ],
  exercisesIntro: "ข้อที่เป็น GUI ภาพตัวอย่างถ่ายหลังจากโปรแกรมทำงานตามเวลาที่ระบุ ตัวเลขที่เกี่ยวกับเวลาอาจต่างเล็กน้อยเมื่อรันบนเครื่องของนิสิต",
  exercises: [
    { level: 1, title: "หาสาเหตุหน้าต่างค้าง", html: `<p>อธิบายว่าทำไมปุ่มที่มี <code>Thread.sleep(5000)</code> ใน ActionListener จึงทำให้หน้าต่างค้าง แล้วเขียนโปรแกรม console ที่สาธิตแนวคิดเดียวกัน: thread หลักทำงานยาว 3 รอบ (รอบละ 200 ms) ขณะที่ thread “ui” พยายามพิมพ์ “refresh” ทุก 100 ms — เวอร์ชันแรกทำงานต่อกันใน thread เดียว เวอร์ชันที่สองแยกเป็นสอง thread ให้เห็นความต่าง</p>`,
      spec: ["ใช้ Thread และ join()", "แสดงผลทั้งสองเวอร์ชันพร้อมหัวข้อ"],
      solution: j`
        public class BlockingDemo {
            public static void main(String[] args) throws InterruptedException {
                System.out.println("== single thread ==");
                longWork();
                for (int i = 0; i < 3; i++) System.out.println("refresh (late)");

                System.out.println("== two threads ==");
                Thread ui = new Thread(() -> {
                    for (int i = 0; i < 6; i++) {
                        System.out.println("refresh");
                        pause(100);
                    }
                });
                ui.start();
                longWork();
                ui.join();
            }

            static void longWork() {
                for (int i = 1; i <= 3; i++) {
                    System.out.println("working " + i);
                    pause(200);
                }
            }

            static void pause(int ms) {
                try { Thread.sleep(ms); } catch (InterruptedException e) { }
            }
        }`, explain: "ใน Swing listener ทำงานบน EDT ซึ่งเป็น thread เดียวที่วาดหน้าจอ การ sleep ใน listener จึงเหมือนเวอร์ชันแรก: “refresh” (การวาดหน้าจอ) ต้องรอจนงานยาวจบ ลำดับข้อความในเวอร์ชันสองอาจสลับต่างเล็กน้อยในแต่ละครั้งที่รัน" },
    { level: 1, title: "นาฬิกาดิจิทัล", html: `<p>สร้างหน้าต่างแสดงเวลาปัจจุบันรูปแบบ <code>HH:mm:ss</code> ตัวใหญ่ อัปเดตทุกวินาทีด้วย javax.swing.Timer และแสดงวันที่ด้านล่าง</p>`,
      spec: ["ใช้ <code>java.time.LocalTime.now()</code> และ <code>DateTimeFormatter.ofPattern(\"HH:mm:ss\")</code>", "เรียกอัปเดตครั้งแรกทันทีก่อน timer.start() เพื่อไม่ให้ว่าง 1 วินาที"], gui: true, actions: "wait 300\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.time.LocalDate;
        import java.time.LocalTime;
        import java.time.format.DateTimeFormatter;

        public class DigitalClock {
            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Clock");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JLabel time = new JLabel("", SwingConstants.CENTER);
                    time.setFont(new Font("Monospaced", Font.BOLD, 36));
                    JLabel date = new JLabel(LocalDate.now().toString(), SwingConstants.CENTER);
                    DateTimeFormatter fmt = DateTimeFormatter.ofPattern("HH:mm:ss");
                    Runnable update = () -> time.setText(LocalTime.now().format(fmt));
                    update.run();
                    new Timer(1000, e -> update.run()).start();
                    frame.add(time, BorderLayout.CENTER);
                    frame.add(date, BorderLayout.SOUTH);
                    frame.setSize(260, 130);
                    frame.setVisible(true);
                });
            }
        }`, explain: "ภาพตัวอย่างแสดงเวลาตอนที่สร้างเอกสารนี้ — เมื่อรันจริงจะเป็นเวลาปัจจุบันของเครื่อง" },
    { level: 2, title: "ตั้งเวลานับถอยหลังจากค่าที่ผู้ใช้ป้อน", html: `<p>ผู้ใช้ป้อนจำนวนวินาที (1–3600) กด Start แล้วแสดงนับถอยหลังรูปแบบ mm:ss ปุ่ม Pause/Resume สลับได้ และเมื่อหมดเวลาให้ข้อความเป็นสีแดง “Time's up!” ตรวจข้อมูลที่ป้อนด้วย (แสดงข้อความ error ถ้าผิด)</p>`,
      spec: ["ใช้ CountdownModel จากหัวข้อ S2.4 แยก logic", "ปุ่มเดียวเปลี่ยนข้อความระหว่าง Pause และ Resume", "ภาพตัวอย่าง: ป้อน 75 กด Start รอประมาณ 2 วินาที"], gui: true, actions: "type field:0 75\nclick Start\nwait 2200\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class CustomCountdown {
            private static CountdownModel model;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Timer");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JTextField input = new JTextField("60", 5);
                    JButton start = new JButton("Start");
                    JButton pause = new JButton("Pause");
                    pause.setEnabled(false);
                    JLabel display = new JLabel("--:--", SwingConstants.CENTER);
                    display.setFont(new Font("Monospaced", Font.BOLD, 34));
                    Timer timer = new Timer(1000, null);
                    timer.addActionListener(e -> {
                        model.tick();
                        display.setText(model.display());
                        if (model.isFinished()) {
                            timer.stop();
                            display.setText("Time's up!");
                            display.setForeground(Color.RED);
                            pause.setEnabled(false);
                            start.setEnabled(true);
                        }
                    });
                    start.addActionListener(e -> {
                        try {
                            int s = Integer.parseInt(input.getText().trim());
                            if (s < 1 || s > 3600) throw new NumberFormatException();
                            model = new CountdownModel(s);
                            display.setForeground(Color.BLACK);
                            display.setText(model.display());
                            timer.start();
                            start.setEnabled(false);
                            pause.setEnabled(true);
                            pause.setText("Pause");
                        } catch (NumberFormatException ex) {
                            display.setForeground(Color.RED);
                            display.setText("1-3600 only");
                        }
                    });
                    pause.addActionListener(e -> {
                        if (timer.isRunning()) { timer.stop(); pause.setText("Resume"); }
                        else { timer.start(); pause.setText("Pause"); }
                    });
                    JPanel top = new JPanel();
                    top.add(new JLabel("Seconds:"));
                    top.add(input);
                    top.add(start);
                    top.add(pause);
                    frame.add(top, BorderLayout.NORTH);
                    frame.add(display, BorderLayout.CENTER);
                    frame.setSize(340, 150);
                    frame.setVisible(true);
                });
            }
        }

        class CountdownModel {
            private int remaining;
            CountdownModel(int seconds) { remaining = seconds; }
            void tick() { if (remaining > 0) remaining--; }
            boolean isFinished() { return remaining == 0; }
            String display() { return String.format("%02d:%02d", remaining / 60, remaining % 60); }
        }` },
    { level: 2, title: "ไฟจราจรด้วย Timer", html: `<p>สร้างไฟจราจรด้วย JLabel 3 ดวง (วงกลมแทนด้วยพื้นหลังสี) ที่เปลี่ยนสถานะตามลำดับ เขียว 3 วินาที → เหลือง 1 วินาที → แดง 3 วินาที วนซ้ำ ดวงที่ไม่ติดแสดงเป็นสีเทาเข้ม และแสดงชื่อสถานะกับวินาทีที่เหลือ</p>`,
      spec: ["Timer tick ทุก 1 วินาที และเก็บ state (index ของไฟ, วินาทีที่เหลือ)", "ระยะเวลาแต่ละสถานะเก็บในอาเรย์ <code>{3, 1, 3}</code>", "JLabel ต้อง setOpaque(true) เพื่อแสดงสีพื้น", "ภาพตัวอย่าง: ประมาณ 3.5 วินาทีหลังเริ่ม (ไฟเหลือง)"], gui: true, actions: "wait 2700\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;

        public class TrafficLight {
            private static int state = 0;
            private static int remaining = 3;
            static final String[] NAMES = {"GREEN", "YELLOW", "RED"};
            static final int[] DURATION = {3, 1, 3};
            static final Color[] ON = {new Color(40, 180, 70), new Color(240, 200, 30), new Color(220, 50, 40)};

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Traffic light");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JLabel[] lamps = new JLabel[3];
                    JPanel pole = new JPanel(new GridLayout(3, 1, 6, 6));
                    pole.setBackground(Color.BLACK);
                    pole.setBorder(BorderFactory.createEmptyBorder(8, 8, 8, 8));
                    for (int i = 2; i >= 0; i--) {
                        lamps[i] = new JLabel();
                        lamps[i].setOpaque(true);
                        lamps[i].setPreferredSize(new Dimension(50, 40));
                    }
                    pole.add(lamps[2]);
                    pole.add(lamps[1]);
                    pole.add(lamps[0]);
                    JLabel status = new JLabel("", SwingConstants.CENTER);
                    Runnable paint = () -> {
                        for (int i = 0; i < 3; i++) lamps[i].setBackground(i == state ? ON[i] : new Color(60, 60, 60));
                        status.setText(NAMES[state] + " (" + remaining + "s)");
                    };
                    paint.run();
                    new Timer(1000, e -> {
                        remaining--;
                        if (remaining == 0) {
                            state = (state + 1) % 3;
                            remaining = DURATION[state];
                        }
                        paint.run();
                    }).start();
                    frame.add(pole, BorderLayout.CENTER);
                    frame.add(status, BorderLayout.SOUTH);
                    frame.setSize(160, 230);
                    frame.setVisible(true);
                });
            }
        }`, explain: "ภาพถ่ายหลังเปิดโปรแกรมรวมประมาณ 3.6 วินาที (มีช่วงเริ่มต้นของ harness ~0.9 วินาที) จึงอยู่ในสถานะเหลือง" },
    { level: 3, title: "เกมจับเวลากดปุ่ม (reaction test)", html: `<p>สร้างเกมทดสอบความไว: กด <code>Ready</code> แล้วรอเวลาสุ่ม 1–3 วินาที (ใช้ Timer แบบครั้งเดียว <code>setRepeats(false)</code>) จากนั้นพื้นหลังเปลี่ยนเป็นสีเขียวพร้อมข้อความ “CLICK!” ผู้เล่นกดปุ่ม <code>Click</code> ให้เร็วที่สุด แสดงเวลาตอบสนองเป็นมิลลิวินาที ถ้ากดก่อนเขียวให้แจ้ง “Too early!” เก็บสถิติเวลาที่ดีที่สุด</p>`,
      spec: ["state: waiting / ready / go", "ใช้ System.nanoTime() วัดเวลา", "สุ่มเวลาด้วย Random", "ภาพตัวอย่าง: กด Click ทันทีหลัง Ready (กดก่อนเวลา)"], gui: true, actions: "click Ready\nclick Click\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.Random;

        public class ReactionTest {
            private enum State { IDLE, WAITING, GO }
            private static State state = State.IDLE;
            private static long goTime;
            private static long best = Long.MAX_VALUE;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Reaction test");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JLabel screen = new JLabel("Press Ready", SwingConstants.CENTER);
                    screen.setOpaque(true);
                    screen.setBackground(Color.LIGHT_GRAY);
                    screen.setFont(screen.getFont().deriveFont(Font.BOLD, 20f));
                    JLabel stats = new JLabel("Best: -");
                    Random rng = new Random();
                    Timer delay = new Timer(1000, e -> {
                        state = State.GO;
                        goTime = System.nanoTime();
                        screen.setBackground(new Color(60, 180, 75));
                        screen.setText("CLICK!");
                    });
                    delay.setRepeats(false);
                    JButton ready = new JButton("Ready");
                    JButton click = new JButton("Click");
                    ready.addActionListener(e -> {
                        state = State.WAITING;
                        screen.setBackground(new Color(200, 60, 50));
                        screen.setText("Wait for green...");
                        delay.setInitialDelay(1000 + rng.nextInt(2000));
                        delay.restart();
                    });
                    click.addActionListener(e -> {
                        if (state == State.WAITING) {
                            delay.stop();
                            screen.setBackground(Color.ORANGE);
                            screen.setText("Too early!");
                        } else if (state == State.GO) {
                            long ms = (System.nanoTime() - goTime) / 1_000_000;
                            best = Math.min(best, ms);
                            screen.setBackground(Color.LIGHT_GRAY);
                            screen.setText(ms + " ms");
                            stats.setText("Best: " + best + " ms");
                        }
                        state = State.IDLE;
                    });
                    JPanel buttons = new JPanel();
                    buttons.add(ready);
                    buttons.add(click);
                    buttons.add(stats);
                    frame.add(screen, BorderLayout.CENTER);
                    frame.add(buttons, BorderLayout.SOUTH);
                    frame.setSize(320, 180);
                    frame.setVisible(true);
                });
            }
        }`, explain: "<code>enum State</code> คือชนิดข้อมูลที่มีค่าได้เฉพาะที่กำหนด (IDLE, WAITING, GO) อ่านง่ายและปลอดภัยกว่าใช้ int 0/1/2" },
    { level: 3, title: "ประมวลผลไฟล์จำลองด้วย SwingWorker แบบยกเลิกได้", html: `<p>จำลองการประมวลผลข้อมูล 50 รายการ (แต่ละรายการใช้เวลา 40 ms ด้วย Thread.sleep ใน doInBackground) แสดง progress bar และรายการที่ประมวลผลแล้วใน JTextArea ผ่าน <code>publish/process</code> มีปุ่ม Cancel ที่หยุดงานได้ทันที (<code>worker.cancel(true)</code>) และเมื่อจบให้แสดงว่า “Completed” หรือ “Cancelled after N items”</p>`,
      spec: ["SwingWorker&lt;Integer, String&gt;: ผลลัพธ์คือจำนวนที่ทำเสร็จ, ข้อมูลกลางทางคือข้อความ", "ใน doInBackground ตรวจ <code>isCancelled()</code> ทุกรอบ", "ใน done() ตรวจ isCancelled() ก่อนเรียก get()", "ภาพตัวอย่าง: Start แล้วกด Cancel หลังประมาณ 0.6 วินาที"], gui: true, actions: "click Start\nwait 600\nclick Cancel\nwait 200\nshot",
      solution: j`
        import javax.swing.*;
        import java.awt.*;
        import java.util.List;

        public class CancellableWorker {
            private static SwingWorker<Integer, String> worker;
            private static int processed = 0;

            public static void main(String[] args) {
                SwingUtilities.invokeLater(() -> {
                    JFrame frame = new JFrame("Processor");
                    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                    JProgressBar bar = new JProgressBar(0, 50);
                    bar.setStringPainted(true);
                    JTextArea log = new JTextArea(6, 22);
                    log.setEditable(false);
                    JLabel status = new JLabel("Ready");
                    JButton start = new JButton("Start");
                    JButton cancel = new JButton("Cancel");
                    cancel.setEnabled(false);
                    start.addActionListener(e -> {
                        processed = 0;
                        log.setText("");
                        start.setEnabled(false);
                        cancel.setEnabled(true);
                        status.setText("Working...");
                        worker = new SwingWorker<>() {
                            @Override
                            protected Integer doInBackground() throws Exception {
                                for (int i = 1; i <= 50 && !isCancelled(); i++) {
                                    Thread.sleep(40);
                                    publish("item " + i + " ok");
                                }
                                return 50;
                            }

                            @Override
                            protected void process(List<String> chunks) {
                                for (String s : chunks) {
                                    log.append(s + "\n");
                                    processed++;
                                }
                                bar.setValue(processed);
                            }

                            @Override
                            protected void done() {
                                status.setText(isCancelled() ? "Cancelled after " + processed + " items" : "Completed");
                                start.setEnabled(true);
                                cancel.setEnabled(false);
                            }
                        };
                        worker.execute();
                    });
                    cancel.addActionListener(e -> worker.cancel(true));
                    JPanel top = new JPanel();
                    top.add(start);
                    top.add(cancel);
                    JPanel root = new JPanel(new BorderLayout(4, 4));
                    root.setBorder(BorderFactory.createEmptyBorder(6, 6, 6, 6));
                    root.add(top, BorderLayout.NORTH);
                    root.add(new JScrollPane(log), BorderLayout.CENTER);
                    JPanel south = new JPanel(new GridLayout(2, 1, 0, 4));
                    south.add(bar);
                    south.add(status);
                    root.add(south, BorderLayout.SOUTH);
                    frame.setContentPane(root);
                    frame.setSize(300, 260);
                    frame.setVisible(true);
                });
            }
        }`, explain: "cancel(true) ขัดจังหวะ Thread.sleep ใน background (เกิด InterruptedException ซึ่ง SwingWorker จัดการให้) และ done() ยังถูกเรียกบน EDT เสมอ จำนวนรายการในภาพอาจต่างเล็กน้อยตามความเร็วเครื่อง" },
  ],
};
