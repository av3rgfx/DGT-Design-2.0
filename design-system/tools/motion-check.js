// Verifica del moto dello specimen: video, fotogrammi chiave di ogni transizione, CLS, moto ridotto.
// Uso: LOCAL_FONT_CSS=/tmp/urbanist.css node motion-check.js ../specimen.html /tmp/moto
// Richiede playwright-core e un Chromium locale (CHROME_PATH). Il video (webm) finisce in <out>/video.
const { chromium } = require('playwright-core');
const path = require('path'); const fs = require('fs');
const [, , htmlArg, outArg] = process.argv;
if (!htmlArg || !outArg) { console.error('uso: node motion-check.js <specimen.html> <cartella-output>'); process.exit(2); }
const FILE = 'file://' + path.resolve(htmlArg); const OUT = path.resolve(outArg); fs.mkdirSync(OUT, { recursive: true });
const localCss = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : null;
const executablePath = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await chromium.launch({ executablePath, args: ['--no-sandbox'] });
  const mk = async (reduce, video) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark', reducedMotion: reduce ? 'reduce' : 'no-preference', recordVideo: video ? { dir: OUT + '/video', size: { width: 1440, height: 1000 } } : undefined });
    const page = await ctx.newPage();
    if (localCss) await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: localCss }));
    const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    // CLS: somma degli spostamenti di layout non causati dall'utente, con la sorgente
    await page.addInitScript(() => { window.__cls = 0; window.__shifts = []; try { new PerformanceObserver(l => l.getEntries().forEach(e => { if (!e.hadRecentInput) { window.__cls += e.value; window.__shifts.push({ v: +e.value.toFixed(4), t: Math.round(e.startTime), src: (e.sources || []).map(s => s.node && (s.node.className ? String(s.node.className).slice(0, 30) : s.node.tagName)) }); } })).observe({ type: 'layout-shift', buffered: true }); } catch (e) {} });
    return { ctx, page, errors };
  };
  const clipOf = async (page, sel, pad = 12, extra = {}) => { const b = await page.locator(sel).first().boundingBox(); return { x: Math.max(0, b.x - pad + (extra.dx || 0)), y: Math.max(0, b.y - pad + (extra.dy || 0)), width: b.width + 2 * pad + (extra.dw || 0), height: b.height + 2 * pad + (extra.dh || 0) }; };
  const snap = async (page, name, sel, pad, extra) => page.screenshot({ path: `${OUT}/${name}.png`, clip: await clipOf(page, sel, pad, extra) });
  const POS = "[...document.querySelectorAll('.stat span:not(.badge), .shead h3, .cards, .app .rail, .sched .t')].map(e => { const b = e.getBoundingClientRect(); return [Math.round(b.left + scrollX), Math.round(b.top + scrollY)]; })";

  // ---- 1. moto normale, con video ----
  let { ctx, page, errors } = await mk(false, true);
  await page.goto(FILE, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => scrollTo(0, document.querySelector('.app').getBoundingClientRect().top + scrollY - 20));
  const t0 = Date.now();
  for (const t of [60, 200, 400, 900]) { await sleep(Math.max(0, t - (Date.now() - t0))); await snap(page, `01-popin-${t}ms`, '.stats', 16, { dw: 30 }); }
  await sleep(500);
  const posBefore = await page.evaluate(POS);
  await page.click('.app .tr .bell'); await sleep(400); await snap(page, '02-badge-off', '.app .tr .bell', 10);
  await page.click('.app .tr .bell'); await sleep(110); await snap(page, '02-badge-on-110ms', '.app .tr .bell', 10); await sleep(600); await snap(page, '02-badge-on', '.app .tr .bell', 10);
  await page.click('.cards .task.lime .sel'); await sleep(80); await snap(page, '03-swap-exit-80ms', '.cards .task.lime .st', 4);
  await sleep(140); await snap(page, '03-swap-enter-220ms', '.cards .task.lime .st', 4); await sleep(500);
  await page.click('.cards .task.lime .sel'); await sleep(180); await snap(page, '04-check-180ms', '.cards .task.lime .st', 4);
  await sleep(180); await snap(page, '04-check-360ms', '.cards .task.lime .st', 4); await sleep(500); await snap(page, '04-check-done', '.cards .task.lime .st', 4);
  await page.click('.app .summary .h .rb.ghost'); await sleep(170); await snap(page, '05-panel-closing-170ms', '.app .overlay', 0);
  await sleep(500); await snap(page, '05-panel-closed', '.app .overlay', 0);
  await page.click('.app .summary .h .rb.ghost'); await sleep(200); await snap(page, '05-panel-opening-200ms', '.app .overlay', 0); await sleep(600);
  await page.click('.app .call .top .r .rb:last-child'); await sleep(170); await snap(page, '06-call-closing-170ms', '.app .overlay', 0); await sleep(500); await snap(page, '06-call-closed', '.app .overlay', 0);
  await page.click('.cards .task.lime .rb.black'); await sleep(110); await snap(page, '07-modal-110ms', '.app', 0);
  await sleep(400); await snap(page, '07-modal-open', '.app', 0);
  await page.keyboard.press('Escape'); await sleep(90); await snap(page, '07-modal-closing-90ms', '.app', 0); await sleep(500); await snap(page, '07-modal-closed-call-back', '.app .overlay', 0);
  await page.hover('.sched .tl .ev .pair .av:first-child'); await sleep(400); await snap(page, '08-avatar-hover', '.sched .tl .ev', 10);
  await page.mouse.move(700, 700); await sleep(110); await snap(page, '08-avatar-return-110ms', '.sched .tl .ev', 10); await sleep(400);
  await page.click('.app .shead .fbtn'); await sleep(110); await snap(page, '09-filter-swap-110ms', '.app .shead .fbtn', 8);
  await sleep(300); await snap(page, '09-filter-swapped', '.app .shead', 8, { dw: -700 });
  await page.click('.app .filters .pill:nth-child(2)'); await sleep(120); await snap(page, '09-pill-120ms', '.app .filters', 4, { dw: -500 }); await sleep(300);
  await page.click('.app .rail .rb:nth-child(3)'); await sleep(110); await snap(page, '09-rail-110ms', '.app .rail', 8); await sleep(300); await snap(page, '09-rail-done', '.app .rail', 8);
  await page.click('.cards .lead:nth-child(1) .name'); await sleep(110); await snap(page, '10-resize-110ms', '.cards', 6, { dw: -520, dh: 40 });
  await sleep(400); await snap(page, '10-resize-lead-done', '.cards', 6, { dw: -520, dh: 40 });
  await page.click('.cards .task.gray .body'); await sleep(110); await snap(page, '10-resize-task-110ms', '.cards .task.gray', 6, { dh: 40 }); await sleep(500); await snap(page, '10-resize-task-done', '.cards .task.gray', 6, { dh: 40 });
  const posAfter = await page.evaluate(POS);
  const overflowing = await page.evaluate(() => [...document.querySelectorAll('.more .mi')].filter(e => e.scrollWidth > e.clientWidth).map(e => e.textContent));
  for (const t of [0, 30000, 60000, 90000]) { await page.evaluate(t => { document.getAnimations().filter(a => a.animationName === 'now-advance').forEach(a => { a.pause(); a.currentTime = t; }); }, t); await sleep(80); await snap(page, `11-marker-${t / 1000}s`, '.tl .live', 14, { dy: -8, dh: 8 }); }
  await page.evaluate(() => document.getAnimations().filter(a => a.animationName === 'now-advance').forEach(a => a.play()));
  await page.locator('.editor').scrollIntoViewIfNeeded(); await sleep(900);
  for (let i = 0; i < 3; i++) { await snap(page, `12-editor-flow-${i}`, '.editor .canvas', 0); await sleep(400); }
  await page.click('.editor .rtile.plus'); await sleep(350); await snap(page, '12-editor-plus-swapped', '.editor .rail', 0);
  const info = await page.evaluate(() => ({ cls: +window.__cls.toFixed(4), shifts: window.__shifts.filter(s => s.v > 0), anims: document.getAnimations().length, now: document.querySelector('.tl .now b').textContent }));
  console.log('moto normale:', JSON.stringify(info));
  console.log('posizioni invariate dopo le interazioni:', JSON.stringify(posBefore) === JSON.stringify(posAfter), '· testi .more che sbordano:', overflowing.length ? overflowing : 'nessuno', '· errori:', errors.length ? errors : 'nessuno');
  await ctx.close(); console.log('video:', fs.readdirSync(OUT + '/video').map(f => OUT + '/video/' + f));

  // ---- 2. moto ridotto: nessuna animazione attiva, tutto visibile, stati istantanei ----
  ({ ctx, page, errors } = await mk(true, false));
  await page.goto(FILE, { waitUntil: 'load' }); await page.evaluate(() => document.fonts.ready); await sleep(800);
  await page.evaluate(() => scrollTo(0, document.querySelector('.app').getBoundingClientRect().top + scrollY - 20));
  const rmInfo = await page.evaluate(() => { const cs = s => getComputedStyle(document.querySelector(s)); return { anims: document.getAnimations().length, digitOp: cs('.stat .t-digit').opacity, badgeOp: cs('.stat .badge').opacity, dotOp: cs('.app .tr .nb .dot').opacity, nowLeft: cs('.tl .now').left, flowDisplay: cs('.edges .flow').display, okOffset: cs('.editor .node .ok svg').strokeDashoffset, cls: +window.__cls.toFixed(4) }; });
  await page.click('.cards .task.lime .sel'); await page.click('.cards .task.lime .sel'); await sleep(60);
  const rmSel = await page.evaluate(() => { const cs = s => getComputedStyle(document.querySelector(s)); return { text: document.querySelector('.cards .task.lime .sel .t-text-swap').textContent, checkOp: cs('.cards .task.lime .okc').opacity, checkOffset: cs('.cards .task.lime .okc path').strokeDashoffset, anims: document.getAnimations().length }; });
  await page.click('.app .summary .h .rb.ghost'); await sleep(60); await snap(page, '13-reduced-app', '.app', 0);
  console.log('moto ridotto:', JSON.stringify(rmInfo), JSON.stringify(rmSel), '· errori:', errors.length ? errors : 'nessuno');
  await ctx.close(); await browser.close();
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
