const fs = require('fs');
const buf = fs.readFileSync('./mavhungu_presskit.pdf');

// JPEG magic bytes: FF D8 FF
const jpegStart = Buffer.from([0xFF, 0xD8, 0xFF]);
const jpegEnd   = Buffer.from([0xFF, 0xD9]);

let count = 0;
let pos   = 0;

while (pos < buf.length) {
  const start = buf.indexOf(jpegStart, pos);
  if (start === -1) break;

  const end = buf.indexOf(jpegEnd, start + 3);
  if (end === -1) break;

  const jpeg = buf.slice(start, end + 2);
  // Only save if reasonably sized (> 20KB — skip thumbnails)
  if (jpeg.length > 20000) {
    const filename = 'presskit_img_' + (++count) + '.jpg';
    fs.writeFileSync(filename, jpeg);
    console.log('Saved ' + filename + ' (' + Math.round(jpeg.length / 1024) + ' KB)');
  }
  pos = end + 2;
}

console.log('Done. ' + count + ' images extracted.');
