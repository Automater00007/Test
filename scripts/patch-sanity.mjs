// Applies a small patch to sanity's compiled useDocumentForm to prevent
// Portable Text block edit dialogs from collapsing while typing.
// See: https://github.com/sanity-io/sanity/pull/13924
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const file = "node_modules/sanity/lib/index.js";
if (!existsSync(file)) {
  console.log("patch-sanity: sanity not installed, skipping");
  process.exit(0);
}

const src = readFileSync(file, "utf8");
const oldStr = "      } else\n        handleSetOpenPath(pathFor(nextFocusPath_0.slice(0, -1)));";
const newStr = "      } else if (nextFocusPath_0.toString() !== openPath.toString())\n        handleSetOpenPath(pathFor(nextFocusPath_0.slice(0, -1)));";

if (src.includes(newStr)) {
  console.log("patch-sanity: already applied");
  process.exit(0);
}
if (!src.includes(oldStr)) {
  console.warn("patch-sanity: target pattern not found; skipping");
  process.exit(0);
}
writeFileSync(file, src.replace(oldStr, newStr, 1), "utf8");
console.log("patch-sanity: applied");
