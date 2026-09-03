// Cattura specimen.html su desktop e mobile.
// Uso: LOCAL_FONT_CSS=/tmp/urbanist.css node screenshot.js ../specimen.html /tmp/shots
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

(async () => {
  const [, , htmlArg, outArg] = process.argv;
  if (!htmlArg || !outArg) { console.error('uso: node screenshot.js <specimen.html> <cartella-output>'); process.exit(2); }
  const file = 'file://' + path.resolve(htmlArg);
  const out = path.resolve(outArg);
  fs.mkdirSync(out, { recursive: true });
  const localCss = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : null;
  const executablePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const sections = [['app', '.app'], ['phones', '.phones'], ['colori', '#colori'], ['kit', '#kit'], ['sfide', '#sfide'], ['processo', '#processo'], ['editor', '.editor'], ['footer', '.footer']];
  for (const [name, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark', reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    if (localCss) await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: localCss }));
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(file, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth,
      h: document.documentElement.scrollHeight,
      fonts: Array.from(document.fonts).filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight),
    }));
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    if (name === 'desktop') {
      for (const [n, sel] of sections) { const el = await page.$(sel); if (el) await el.screenshot({ path: `${out}/${n}.png` }); else console.log('manca', sel); }
    }
    console.log(name, JSON.stringify(m), errors.length ? errors : 'nessun errore');
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
