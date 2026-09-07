// Affianca due (o più) catture in una sola immagine, con l'occhiello di ognuna: serve per i prima/dopo.
// Uso:  node design-system/tools/affianca.js <uscita.png> "Prima|/percorso/a.png" "Dopo|/percorso/b.png" [...]
//       COL=2   quante colonne (predefinito: una per immagine, tutte in fila)
//       FONDO=#000  il fondo (predefinito nero, come le pagine della Console)
//       TIT="Le frecce di riga"  un titolo sopra la fila
// Stesse variabili degli altri strumenti: PLAYWRIGHT_MODULE, NODE_PATH, CHROME_PATH, LOCAL_FONT_CSS.
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const [uscita, ...coppie] = process.argv.slice(2);
if (!uscita || !coppie.length) { console.error('uso: affianca.js <uscita.png> "Occhiello|/percorso.png" ...'); process.exit(1); }

const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const fondo = process.env.FONDO || '#000000';
const titolo = process.env.TIT || '';
const col = +(process.env.COL || coppie.length);

const pezzi = coppie.map(c => {
  const i = c.indexOf('|');
  const lb = i < 0 ? '' : c.slice(0, i);
  const f = i < 0 ? c : c.slice(i + 1);
  if (!fs.existsSync(f)) { console.error('manca:', f); process.exit(1); }
  return { lb, src: 'data:image/png;base64,' + fs.readFileSync(f).toString('base64') };
});

const html = `<!doctype html><meta charset="utf-8"><style>
${css}
*{box-sizing:border-box}
body{margin:0;background:${fondo};font-family:"Urbanist",-apple-system,sans-serif;color:#FCFCFC;padding:28px}
h1{font-size:22px;font-weight:300;margin:0 0 20px;letter-spacing:.01em}
.griglia{display:grid;grid-template-columns:repeat(${col},max-content);gap:24px;align-items:start}
figure{margin:0;display:grid;gap:12px;justify-items:start}
figcaption{display:inline-flex;align-items:center;height:32px;padding:0 14px;border-radius:9999px;background:#FCFCFC;color:#0A0A0A;font-size:13px;white-space:nowrap}
figure.dopo figcaption{background:#B8FC64}
img{display:block;border-radius:10px}
</style>
${titolo ? `<h1>${titolo}</h1>` : ''}
<div class="griglia">${pezzi.map((p, i) => `<figure class="${i % 2 ? 'dopo' : ''}"><figcaption>${p.lb}</figcaption><img src="${p.src}"></figure>`).join('')}</div>`;

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 2400, height: 1200 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.waitForTimeout(300);
  const b = await page.evaluate(() => { const d = document.documentElement; return { w: Math.ceil(d.scrollWidth), h: Math.ceil(d.scrollHeight) }; });
  await page.setViewportSize({ width: b.w, height: b.h });
  await page.waitForTimeout(150);
  fs.mkdirSync(path.dirname(path.resolve(uscita)), { recursive: true });
  await page.screenshot({ path: path.resolve(uscita) });
  await browser.close();
  console.log(path.resolve(uscita), b.w + '×' + b.h);
})();
