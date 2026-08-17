const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");

fs.mkdirSync(dist, { recursive: true });

const files = ["index.html", "style.css", "script.js", "xlsx.full.min.js"];
for (const file of files) {
  const src = path.join(root, file);
  const dest = path.join(dist, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}
console.log("Synchronized frontend assets to dist/");
