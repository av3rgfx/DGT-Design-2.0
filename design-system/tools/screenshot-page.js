// Cattura una pagina qualsiasi a una larghezza data (pagina intera).
// Uso: LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js <file.html[?n=40]> <out.png> [larghezza] [altezza]
// Con LOCAL_FONT_CSS le richieste a fonts.googleapis.com ricevono quel CSS (font incorporati).
const path = require('path');
const fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');

(async () => {
  const [, , htmlArg, outArg, wArg, hArg] = process.argv;
  if (!htmlArg || !outArg) { console.error('uso: node screenshot-page.js <file.html[?query]> <out.png> [larghezza] [altezza]'); process.exit(2); }
  const [file, query] = htmlArg.split('?');
  const url = 'file://' + path.resolve(file) + (query ? '?' + query : '');
  const localCss = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : null;
  const executablePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: +(wArg || 1440), height: +(hArg || 900) }, colorScheme: 'dark', reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  if (localCss) await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: localCss }));
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const m = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, h: document.documentElement.scrollHeight,
    fonts: Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight) }));
  fs.mkdirSync(path.dirname(path.resolve(outArg)), { recursive: true });
  await page.screenshot({ path: outArg, fullPage: process.env.FULL_PAGE !== '0' });
  console.log(path.basename(outArg), JSON.stringify(m), errors.length ? errors : 'nessun errore');
  await browser.close();
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
