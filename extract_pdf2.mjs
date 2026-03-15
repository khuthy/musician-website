import { readFileSync } from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const data = new Uint8Array(readFileSync('./mavhungu_presskit.pdf'));
const pdf  = await getDocument({ data, useWorkerFetch: false, isEvalSupported: false }).promise;

console.log(`Pages: ${pdf.numPages}`);

for (let i = 1; i <= pdf.numPages; i++) {
  const page    = await pdf.getPage(i);
  const content = await page.getTextContent();
  const text    = content.items.map(item => ('str' in item ? item.str : '')).join(' ');
  console.log(`\n--- PAGE ${i} ---`);
  console.log(text);
}
