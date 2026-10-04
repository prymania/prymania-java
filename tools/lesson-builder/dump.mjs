import fs from "node:fs";
const f = process.argv[2];
const h = fs.readFileSync(new URL("../../chapters/" + f, import.meta.url), "utf8");
const strip = (s) => s.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"');
for (const m of h.matchAll(/<h4>([^<]*)[\s\S]*?<div class="source-output[^"]*"><span>[^<]*<\/span>(?:<pre>([\s\S]*?)<\/pre>|<div)/g)) console.log("## " + strip(m[1]) + "\n" + strip(m[2] || "[gui]"));
for (const m of h.matchAll(/<span class="exercise-id">([^<]*)<\/span>([^<]*)[\s\S]*?(?:<div class="ex-sample">([\s\S]*?)<\/div>(?:<\/div>)?<|<div class="answer-gate)/g)) console.log("## " + m[1] + " " + m[2] + "\n" + strip(m[3] || "(no sample)"));
