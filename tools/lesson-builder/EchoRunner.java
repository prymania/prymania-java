import java.io.*;
import java.lang.reflect.*;
import java.nio.charset.StandardCharsets;

public class EchoRunner {
    public static void main(String[] args) throws Throwable {
        final byte[] data = System.in.readAllBytes();
        final PrintStream out = new PrintStream(new FileOutputStream(FileDescriptor.out), true, StandardCharsets.UTF_8);
        System.setOut(out);
        System.setErr(new PrintStream(new FileOutputStream(FileDescriptor.err), true, StandardCharsets.UTF_8));
        System.setIn(new InputStream() {
            int pos = 0;
            int serve(byte[] b, int off, int len) {
                if (pos >= data.length) return -1;
                int end = pos;
                while (end < data.length && data[end] != '\n') end++;
                if (end < data.length) end++;
                int n = Math.min(len, end - pos);
                out.print("\u0001" + new String(data, pos, n, StandardCharsets.UTF_8) + "\u0002");
                System.arraycopy(data, pos, b, off, n);
                pos += n;
                return n;
            }
            public int read() {
                byte[] one = new byte[1];
                return serve(one, 0, 1) == -1 ? -1 : (one[0] & 0xff);
            }
            public int read(byte[] b, int off, int len) { return serve(b, off, len); }
            public int available() { return 0; }
        });
        Class<?> c = Class.forName(args[0]);
        Method m = c.getMethod("main", String[].class);
        try {
            m.invoke(null, (Object) new String[0]);
        } catch (InvocationTargetException e) {
            throw e.getCause();
        }
        out.flush();
    }
}
