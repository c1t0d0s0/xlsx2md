/**
 * Reads scripts/icon-master.png, center-crops to a square, resizes to 256×256,
 * then writes build/icon.ico (multi-size) via png-to-ico.
 */
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pngToIco = require("png-to-ico");

const root = path.join(__dirname, "..");
const input = path.join(__dirname, "icon-master.png");
const output = path.join(root, "build", "icon.ico");

function centerCropSquare256(buf) {
  const src = PNG.sync.read(buf);
  const w = src.width;
  const h = src.height;
  const side = Math.min(w, h);
  const sx = Math.floor((w - side) / 2);
  const sy = Math.floor((h - side) / 2);
  const outSize = 256;
  const dst = new PNG({ width: outSize, height: outSize });

  for (let y = 0; y < outSize; y++) {
    for (let x = 0; x < outSize; x++) {
      const srcX = Math.min(
        sx + Math.floor(((x + 0.5) * side) / outSize),
        w - 1
      );
      const srcY = Math.min(
        sy + Math.floor(((y + 0.5) * side) / outSize),
        h - 1
      );
      const iSrc = (src.width * srcY + srcX) << 2;
      const iDst = (outSize * y + x) << 2;
      dst.data.set(src.data.subarray(iSrc, iSrc + 4), iDst);
    }
  }

  return PNG.sync.write(dst);
}

const raw = fs.readFileSync(input);
const square256 = centerCropSquare256(raw);

pngToIco(square256)
  .then((icoBuf) => {
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, icoBuf);
    console.log("Wrote", output);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
