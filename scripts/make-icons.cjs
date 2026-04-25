/**
 * Reads scripts/icon-master.png, center-crops to a square, resizes to 512x512 and 256x256,
 * then writes build/icon.png and build/icon.ico (multi-size) via png-to-ico.
 */
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");
const pngToIco = require("png-to-ico");

const root = path.join(__dirname, "..");
const input = path.join(__dirname, "icon-master.png");
const outputIco = path.join(root, "build", "icon.ico");
const outputPng = path.join(root, "build", "icon.png");

function centerCropSquare(buf, outSize) {
  const src = PNG.sync.read(buf);
  const w = src.width;
  const h = src.height;
  const side = Math.min(w, h);
  const sx = Math.floor((w - side) / 2);
  const sy = Math.floor((h - side) / 2);
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
const square512 = centerCropSquare(raw, 512);
const square256 = centerCropSquare(raw, 256);

fs.mkdirSync(path.dirname(outputPng), { recursive: true });
fs.writeFileSync(outputPng, square512);
console.log("Wrote", outputPng);

pngToIco(square256)
  .then((icoBuf) => {
    fs.writeFileSync(outputIco, icoBuf);
    console.log("Wrote", outputIco);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
