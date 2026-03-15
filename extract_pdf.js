const fs = require('fs');
const buf = fs.readFileSync('mavhungu_presskit.pdf');
const text = buf.toString('latin1');
const matches = text.match(/[\x20-\x7E]{5,}/g) || [];
const seen = new Set();
matches.forEach(function(m) {
  const t = m.trim();
  if (t.length > 6 && !seen.has(t)) {
    seen.add(t);
    console.log(t);
  }
});
