// Cattura singoli elementi di una pagina (per selettore) a piena risoluzione: utile per le card, le tendine, le cornici del telefono.
// Variabili: LOCAL_FONT_CSS (font locali), MOTION=no-preference (avatar in moto: fermarli con DGT_AVATAR_ORBE.fermo/fotogramma), SCALE=2, W=1440, H=900 (viewport: alto abbastanza da non far scorrere la pagina, così le catture dopo un clic non si spostano), CLICK="sel1|sel2" (clic prima della cattura), EVAL="codice" (JavaScript eseguito nella pagina prima della cattura, es. per scorrere un elemento).
// Uso: node screenshot-elementi.js <file.html[?query]> <prefisso-out> <selettore1> [selettore2 ...]
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright-core');
(async () => {
  const [, , htmlArg, prefix, ...sels] = process.argv;
  const [file, query] = htmlArg.split('?');
  const url = 'file://' + path.resolve(file) + (query ? '?' + query : '');
  const localCss = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : null;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: +(process.env.W || 1440), height: +(process.env.H || 900) }, colorScheme: 'dark', reducedMotion: process.env.MOTION || 'reduce', deviceScaleFactor: +(process.env.SCALE || 1) });
  const page = await ctx.newPage();
  if (localCss) await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: localCss }));
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(600);
  if (process.env.CLICK) { for (const c of process.env.CLICK.split('|')) { await page.click(c); await page.waitForTimeout(300); } }
  if (process.env.EVAL) { await page.evaluate(process.env.EVAL); await page.waitForTimeout(300); }
  for (let i = 0; i < sels.length; i++) { const out = `${prefix}-${i}.png`; await page.locator(sels[i]).first().screenshot({ path: out }); console.log(out); }
  console.log(errors.length ? errors : 'nessun errore');
  await browser.close();
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
