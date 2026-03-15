import { readFileSync, writeFileSync } from 'fs';
import { createCanvas } from 'canvas';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const data = new Uint8Array(readFileSync('./mavhungu_presskit.pdf'));
const pdf  = await getDocument({ data, useWorkerFetch: false, isEvalSupported: false }).promise;

console.log(`Rendering ${pdf.numPages} pages...`);

for (let i = 1; i <= pdf.numPages; i++) {
  const page     = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 1.5 });
  const canvas   = createCanvas(viewport.width, viewport.height);
  const ctx      = canvas.getContext('2d');

  await page.render({
    canvasContext: ctx,
    viewport,
  }).promise;

  const buf = canvas.toBuffer('image/png');
  writeFileSync(`./presskit_page_${i}.png`, buf);
  console.log(`  Saved presskit_page_${i}.png`);
}
