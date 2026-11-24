// Two Days of Quiet Dread — make.fun entry
// A tiny program that writes one code review comment approving a pull
// request with quiet existential dread to /output/entry.txt
// (or to the path given as the first argument).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One single-line code review comment, at most 140 characters.
// Flat approval up front ("LGTM", "Merging anyway"), dread in the middle:
// the reviewer knows the code will outlast everyone who wrote it, and a
// stranger will one day read it and wonder what kind of people we were.
const COMMENT =
  "LGTM. Tests pass, diff is clean. Someday a stranger will read this code and wonder what kind of people we were. Merging anyway.";

const outPath = process.argv[2] ?? "/output/entry.txt";
const text = COMMENT.trim();

if (text.length < 1 || text.length > 140) {
  throw new Error(`comment must be 1-140 characters, got ${text.length}`);
}
if (text.includes("\n")) {
  throw new Error("comment must be a single line");
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, text, "utf8");
console.log(`wrote ${text.length} characters to ${outPath}`);
