// Prova cliccata delle approvazioni da mobile (versioni 11 e 12): i tre telefoni, la riga della revisione, le frecce, il rifiuto con motivo,
// la prova della revisione del soul prompt, le approvazioni fino allo stato vuoto, quaranta. A ogni passo: nessuno schermo che scorre di lato, console pulita.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/mobile.js
const path = require('path'), fs = require('fs');

// Font locali: LOCAL_FONT_CSS (vedi design-system/tools/fetch-fonts.py); Playwright globale: PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const file = q => 'file://' + path.resolve(__dirname, '../mobile.html') + (q ? '?' + q : '');
let ok = 0, ko = 0;
const check = (cond, msg) => { if (cond) { ok++; console.log('  ok  ' + msg); } else { ko++; console.log('  KO  ' + msg); } };
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const txt = async sel => (await page.locator(sel).first().textContent()).replace(/\s+/g, ' ').trim();
  const conta = sel => page.locator(sel).count();
  const clic = async (sel, ms) => { await page.click(sel); await page.waitForTimeout(ms || 250); };
  const tel = k => `.m-tel[data-n="${k}"] `;
  const schermata = k => page.getAttribute(tel(k) + '.m-scr', 'data-schermata');
  /* lo schermo del telefono non deve poter scorrere di lato: nessun .m-scr con scrollWidth > clientWidth */
  const sfori = () => page.evaluate(() => [...document.querySelectorAll('.m-scr')].filter(s => s.scrollWidth > s.clientWidth).length);
  const passo = async msg => check(await sfori() === 0 && errors.length === 0, msg + ': nessuno schermo scorre di lato, console pulita' + (errors.length ? ' ' + JSON.stringify(errors) : ''));
  /* la coda del telefono (DGT_MOBILE.coda sul `modello` di mobile.html), con il tipo della revisione */
  const coda = () => page.evaluate(() => DGT_MOBILE.coda(modello).map(r => ({ id: r.id, tipo: r.tipo, cosa: r.cosa, rv: r.tipo === 'revisione' ? modello.revisioneDi(r).tipo : null })));
  const richiesta = id => page.evaluate(id => { const r = modello.richieste.find(x => x.id === id); return { stato: r.stato, commento: r.commento || '', rv: r.tipo === 'revisione' ? modello.revisioneDi(r).stato : null }; }, id);

  console.log('1. i tre telefoni');
  await page.goto(file('')); await page.waitForTimeout(500);
  check(await conta('.m-tel') === 3, 'tre telefoni');
  check(await schermata(1) === '1' && await schermata(2) === '2' && await schermata(3) === '3', 'schermate 1, 2 e 3');
  let c = await coda(); console.log('    coda:', c.map(r => r.cosa).join(' | '));
  check(c.length === 4, 'quattro richieste in coda');
  check(await txt(tel(1) + '.m-h1') === 'DA APPROVARE' && (await txt(tel(1) + '.m-stat .num')).startsWith('4'), 'titolo e numero «da approvare»');
  check(await txt(tel(1) + '.meet .n') === '4' && await conta(tel(1) + '.m-coda .qrow[data-az="apri"]') === 4, 'campanella con 4, quattro righe in coda');
  check(await conta(tel(1) + '.task.lime') === 1 && (await txt(tel(1) + '.task .tt')) === c[0].cosa, 'la card lime della richiesta corrente');
  check(await txt(tel(2) + '.m-tit h2') === c[0].cosa, 'il telefono 2 mostra la stessa richiesta: ' + c[0].cosa);
  check(await txt(tel(3) + '.m-rh h4') === 'Riepilogo di oggi' && await conta(tel(3) + '.m-rie .voce') === 5 && await conta(tel(3) + '.dcard') === 2, 'il Riepilogo: due card e cinque voci del diario');
  await passo('apertura');

  console.log('2. la riga della revisione e le frecce');
  const iMod = c.findIndex(r => r.rv === 'modello'); check(iMod >= 0, 'in coda c\'è la revisione del modello');
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iMod}"]`);
  check(await schermata(1) === '2' && await conta(tel(1) + '.m-scr.rev') === 1, 'la riga apre la revisione sul telefono 1');
  check(await conta(tel(2) + '.m-scr.rev') === 1 && (await txt(tel(2) + '.m-tit h2')).includes('Standard'), 'il telefono 2 segue: «Da Standard a Esperto»');
  check(await conta(tel(2) + '.m-doc.ver') === 2 && await conta(tel(2) + '.m-det') === 5 && await conta(tel(2) + '.m-bar .pill.on') === 1, 'due versioni, cinque card, la pillola «Prova»');
  check((await txt(tel(2) + '.m-pager')) === `${iMod + 1} di 4`, 'contatore ' + (iMod + 1) + ' di 4');
  await clic(tel(2) + '[data-az="succ"]');
  check((await txt(tel(2) + '.m-pager')) === `${(iMod + 1) % 4 + 1} di 4`, 'la freccia avanti');
  await clic(tel(2) + '[data-az="prec"]');
  check((await txt(tel(2) + '.m-pager')) === `${iMod + 1} di 4`, 'la freccia indietro');
  await passo('revisione e frecce');

  console.log('3. il rifiuto con motivo');
  await clic(tel(2) + '.m-bar [data-az="rifiuta"]');
  check(await conta(tel(2) + '.m-scr.motivo') === 1 && await page.evaluate(() => document.activeElement && document.activeElement.dataset.campo === 'motivo'), 'il campo del motivo appare con il fuoco');
  await clic(tel(2) + '[data-az="rifiuta-conferma"]');
  check(await conta(tel(2) + 'input.manca') === 1 && (await richiesta(c[iMod].id)).stato === 'attesa', 'conferma vuota: bordo rosso, la richiesta resta in attesa');
  await page.type(tel(2) + 'input[data-campo="motivo"]', 'Prima una prova su venti'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const rif = await richiesta(c[iMod].id);
  check(rif.stato === 'rifiutata' && rif.commento === 'Prima una prova su venti' && rif.rv === 'rifiutata', 'motivo + Invio: rifiutata con il motivo, anche nella revisione');
  check(await conta('.m-scr.motivo') === 0 && (await coda()).length === 3, 'il campo si chiude, tre in coda');
  await passo('rifiuto');

  console.log('4. la prova della revisione del soul prompt');
  c = await coda(); const iPr = c.findIndex(r => r.rv === 'prompt'); check(iPr >= 0, 'in coda c\'è la revisione del soul prompt');
  await clic(tel(1) + '[data-az="indietro"]');
  check(await schermata(1) === '1', 'indietro: il telefono 1 torna alla coda');
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iPr}"]`);
  check((await txt(tel(2) + '.m-tit h2')).includes('v7') && await conta(tel(2) + '.m-doc .dif p.chg') > 0 && await conta(tel(2) + '.m-doc mark.add') > 0, 'il soul prompt v7 → v8 con le differenze per paragrafo e per parola');
  await clic(tel(2) + '[data-az="prova"]');
  const pr = await richiesta(c[iPr].id);
  check(pr.stato === 'approvata' && pr.commento === 'Prova su 20 esecuzioni' && pr.rv === 'prova', 'prova: approvata con «Prova su 20 esecuzioni», la revisione è in prova');
  check((await coda()).length === 2, 'due in coda');
  await passo('prova');

  console.log('5. approva le altre fino allo stato vuoto');
  await clic(tel(1) + '[data-az="indietro"]');
  for (let i = 0; i < 4 && (await coda()).length; i++) await clic(tel(1) + '.task [data-az="approva"]');
  check((await coda()).length === 0, 'coda vuota');
  check(await conta(tel(1) + '.m-vuoto') === 1 && await conta(tel(1) + '.m-scr.rie') === 1 && await conta(tel(1) + '.m-rie') === 1, 'telefono 1: «Niente da approvare» sul fondo del Riepilogo, con la linea del tempo sotto');
  check(await conta(tel(1) + '.meet .n') === 0 && await conta(tel(2) + '.m-vuoto') === 1, 'niente numero sulla campanella, telefono 2 vuoto');
  check((await txt(tel(3) + '.m-coda .qrow')).includes('niente in attesa') && (await txt(tel(3) + '.m-stat:nth-child(2) .num')) === '0', 'il Riepilogo dice «niente in attesa»');
  await clic(tel(2) + '.m-bnav [data-az="schermata"][data-s="1"]');
  check(await schermata(2) === '1' && await conta(tel(2) + '.m-vuoto') === 1, 'la navigazione in basso porta a «Da approvare» (vuoto)');
  await passo('stato vuoto');

  console.log('6. quaranta');
  await page.goto(file('n=40')); await page.waitForTimeout(600);
  c = await coda(); console.log('    in coda a 40:', c.length);
  check(c.length === 7 && await txt(tel(1) + '.meet .n') === '7' && await conta(tel(1) + '.m-coda .qrow[data-az="apri"]') === 7, 'sette in coda, «7» sulla campanella');
  /* il numero a due cifre sulla campanella: scritto a mano, deve stare nel badge senza sforare */
  const badge = await page.evaluate(() => { const b = document.querySelector('.m-tel[data-n="1"] .meet .n'); b.textContent = '12'; return { largo: b.scrollWidth <= b.clientWidth + 1, w: b.getBoundingClientRect().width }; });
  check(badge.largo && badge.w >= 22, '«12» sta nel badge della campanella (larghezza ' + Math.round(badge.w) + ')');
  const iLungo = c.reduce((b, r, i) => r.cosa.length > c[b].cosa.length ? i : b, 0);
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iLungo}"]`);
  check(await txt(tel(2) + '.m-tit h2') === c[iLungo].cosa, 'il titolo più lungo: ' + c[iLungo].cosa);
  await passo('quaranta');
  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
