import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.PrintStream;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.text.JTextComponent;

/**
 * Runs a Swing program, optionally performs scripted actions, then captures every visible window.
 * args: mainClass outPrefix [actionsFile]
 * Action lines: type field:N text | click Text | select combo:N index | check Text | wait ms | shot
 * Writes <outPrefix>-K.png per window and prints "SHOT|file|title|w|h" lines to stdout.
 */
public class GuiShot {
    static int shotIndex = 0;
    static final List<String> seen = new ArrayList<>();
    static PrintStream out;

    public static void main(String[] args) throws Exception {
        out = new PrintStream(new java.io.FileOutputStream(java.io.FileDescriptor.out), true, StandardCharsets.UTF_8);
        System.setOut(new PrintStream(new java.io.OutputStream() { public void write(int b) {} }));
        UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
        String prefix = args[1];
        List<String> actions = args.length > 2 ? Files.readAllLines(Path.of(args[2]), StandardCharsets.UTF_8) : List.of();
        Class<?> c = Class.forName(args[0]);
        Method m = c.getMethod("main", String[].class);
        new Thread(() -> {
            try { m.invoke(null, (Object) new String[0]); } catch (Exception e) { e.printStackTrace(); }
        }).start();
        Thread.sleep(900);
        boolean shotTaken = false;
        for (String line : actions) {
            line = line.strip();
            if (line.isEmpty()) continue;
            String[] p = line.split(" ", 3);
            switch (p[0]) {
                case "wait" -> Thread.sleep(Integer.parseInt(p[1]));
                case "shot" -> { capture(prefix); shotTaken = true; }
                default -> {
                    final String[] fp = p;
                    SwingUtilities.invokeLater(() -> perform(fp));
                    Thread.sleep(450);
                }
            }
        }
        if (!shotTaken || !actions.isEmpty() && !actions.get(actions.size() - 1).strip().equals("shot")) capture(prefix);
        System.exit(0);
    }

    static void perform(String[] p) {
        try {
            Window w = activeWindow();
            switch (p[0]) {
                case "type" -> {
                    JTextComponent t = (JTextComponent) find(w, p[1]);
                    t.setText(p.length > 2 ? p[2] : "");
                }
                case "click" -> ((AbstractButton) findButton(w, line(p))).doClick();
                case "check" -> ((AbstractButton) findButton(w, line(p))).doClick();
                case "select" -> {
                    String[] q = (p[1] + " " + (p.length > 2 ? p[2] : "")).trim().split(" ");
                    Component comp = find(w, q[0]);
                    if (comp instanceof JComboBox<?> cb) cb.setSelectedIndex(Integer.parseInt(q[1]));
                    if (comp instanceof JList<?> li) li.setSelectedIndex(Integer.parseInt(q[1]));
                }
                default -> System.err.println("unknown action " + p[0]);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static String line(String[] p) {
        return p.length == 3 ? p[1] + " " + p[2] : p[1];
    }

    static Window activeWindow() {
        Window best = null;
        for (Window w : Window.getWindows()) {
            if (w.isShowing()) best = w;
        }
        return best;
    }

    static Component find(Window w, String spec) {
        String[] s = spec.split(":");
        int n = Integer.parseInt(s[1]);
        List<Component> all = new ArrayList<>();
        collect(w, all);
        int k = 0;
        for (Component c : all) {
            boolean match = switch (s[0]) {
                case "field" -> c instanceof JTextField;
                case "area" -> c instanceof JTextArea;
                case "combo" -> c instanceof JComboBox;
                case "list" -> c instanceof JList;
                case "spinner" -> c instanceof JSpinner;
                default -> false;
            };
            if (match && k++ == n) return c;
        }
        throw new IllegalArgumentException("not found: " + spec);
    }

    static Component findButton(Window w, String text) {
        List<Component> all = new ArrayList<>();
        collect(w, all);
        for (Component c : all) {
            if (c instanceof AbstractButton b && text.equals(b.getText()) && b.isShowing()) return c;
        }
        throw new IllegalArgumentException("button not found: " + text);
    }

    static void collect(Container c, List<Component> all) {
        for (Component ch : c.getComponents()) {
            all.add(ch);
            if (ch instanceof Container cc) collect(cc, all);
        }
    }

    static void capture(String prefix) throws Exception {
        final List<String> lines = new ArrayList<>();
        lines.add("GROUP");
        SwingUtilities.invokeAndWait(() -> {
            for (Window w : Window.getWindows()) {
                if (!w.isShowing()) continue;
                JRootPane root = w instanceof RootPaneContainer rpc ? rpc.getRootPane() : null;
                Component target = root != null ? root : w;
                int width = target.getWidth(), height = target.getHeight();
                if (width <= 0 || height <= 0) continue;
                BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
                Graphics2D g = img.createGraphics();
                g.setColor(target.getBackground() != null ? target.getBackground() : Color.WHITE);
                g.fillRect(0, 0, width, height);
                target.printAll(g);
                g.dispose();
                String file = prefix + "-" + (shotIndex++) + ".png";
                try { ImageIO.write(img, "png", new File(file)); } catch (Exception e) { throw new RuntimeException(e); }
                String title = w instanceof Frame f ? f.getTitle() : w instanceof Dialog d ? d.getTitle() : "";
                lines.add("SHOT|" + new File(file).getName() + "|" + (title == null ? "" : title) + "|" + width + "|" + height
                    + "|" + (w instanceof Dialog ? "dialog" : "frame"));
            }
        });
        for (String l : lines) out.println(l);
    }
}
