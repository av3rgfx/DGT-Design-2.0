// Rigenera le catture di `screenshot/`: la lista dei parametri sta qui, non nella memoria di chi lavora.
// Uso (dalla radice o da qualunque cartella):
//   PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/scatta.js
//   ... node scatta.js console          solo le catture della Console (quelle con la barra in cima)
//   ... node scatta.js --in /tmp/out    scrive altrove, per il confronto prima/dopo
// Le catture non elencate qui si fanno a mano e sono dichiarate in FUORI: le direzioni B e C (2026-09-04, catturate con un
// altro font locale) e la pellicola del moto dell'orbe (script mai entrato nel repository).
const path = require('path'), fs = require('fs');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const QUI = __dirname;

const FUORI = [
  'b-11.png', 'b-40.png', 'c-11.png', 'c-40.png',       // direzioni B e C, 2026-09-04: catturate con un altro font locale
  'avatar-orbe-pellicola.png',                          // la pellicola del moto: script mai entrato nel repository
  'avatar-identita.png', 'avatar-pelli.png', 'avatar-confronto.png',   // le pagine di studio dell'avatar
  'mobile*.png',                                        // il telefono, catture vecchie: mobile.html con CLICK/EVAL (le nuove sono i gruppi `quadro` e `dip`)
  'a-costi-*.png', 'a-agenda-*.png', 'a-chat-filo.png', // le sezioni per elemento (non portano la barra)
  'a-barra-momenti*.png', 'a-barra-misura*.png',        // le due strade scartate dello studio della barra (versione 16)
  'a-barra-console-momenti.png', 'a-barra-console-misura.png', 'a-barra-passi-prima.png',
];

/* Una cattura: nome, pagina, query, e il modo.
   `pagina intera` (predefinito): screenshot-page.js, larghezza `w` (1440) e viewport `h` (900).
   `sel`: cattura di un elemento (screenshot-elementi.js) con `scala` (2) e viewport `h`; `clic` e `eval` prima dello scatto. */
const CATTURE = [
  /* --- la Console: le 25 pagine che portano la barra «Oggi in azienda» in cima --- */
  { g: 'console', nome: 'a-11', q: '' },
  { g: 'console', nome: 'a-40', q: 'n=40&tendina=chiusa' },
  { g: 'console', nome: 'a-1920', q: 'pagina=dipendente&id=4&tendina=chiusa', w: 1920, h: 1080, viewport: true },
  { g: 'console', nome: 'a-11-avatar-kit', q: 'avatar=kit' },
  { g: 'console', nome: 'a-tendina-chiusa', q: 'tendina=chiusa' },
  { g: 'console', nome: 'a-tendina-aperta', q: 'tendina=aperta' },
  { g: 'console', nome: 'a-tendina-estesa', q: 'tendina=estesa' },
  { g: 'console', nome: 'a-riepilogo', q: 'pannello=riepilogo' },
  { g: 'console', nome: 'a-richieste', q: 'pagina=richieste&tendina=chiusa' },
  { g: 'console', nome: 'a-dipartimento', q: 'pagina=dipartimento&dip=svi&tendina=chiusa' },
  { g: 'console', nome: 'a-dipendente', q: 'pagina=dipendente&id=4&tendina=chiusa' },
  { g: 'console', nome: 'a-dipendente-ruolo', q: 'pagina=dipendente&id=5&tendina=chiusa' },
  { g: 'console', nome: 'a-dipendente-dossier', q: 'pagina=dipendente&id=4&tendina=dossier' },
  { g: 'console', nome: 'a-dipendente-confronto', q: 'pagina=dipendente&id=4&confronto=6,7&tendina=chiusa' },
  { g: 'console', nome: 'a-dipendente-nuovo', q: 'editor=nuovo' },
  { g: 'console', nome: 'a-dipendente-modifica', q: 'editor=4' },
  { g: 'console', nome: 'a-esecuzione', q: 'pagina=esecuzione&id=4&tendina=chiusa' },
  { g: 'console', nome: 'a-esecuzione-errore', q: 'pagina=esecuzione&id=3&tendina=chiusa' },
  { g: 'console', nome: 'a-esecuzione-attesa', q: 'pagina=esecuzione&id=5&tendina=chiusa' },
  { g: 'console', nome: 'a-costi', q: 'pagina=costi' },
  { g: 'console', nome: 'a-costi-40', q: 'pagina=costi&n=40&tendina=chiusa' },
  { g: 'console', nome: 'a-agenda', q: 'pagina=agenda&tendina=chiusa' },
  { g: 'console', nome: 'a-agenda-40', q: 'pagina=agenda&n=40&tendina=chiusa' },
  { g: 'console', nome: 'a-chat', q: 'pagina=chat&tendina=chiusa' },
  { g: 'console', nome: 'a-chat-nora', q: 'pagina=chat&filo=4&tendina=chiusa' },
  /* --- lo studio della barra (versione 16): la barra scelta e quella di prima, sole e dentro la Console.
         Le due strade scartate («i tre momenti», «la giornata a misura») non sono più nel codice: restano nelle catture
         `a-barra-momenti*.png` e `a-barra-misura*.png` e in DIREZIONI.md, «Versione 16». --- */
  { g: 'barra', nome: 'a-barra-stato', q: '', sel: '.a-sched', h: 1100 },
  { g: 'barra', nome: 'a-barra-stato-40', q: 'n=40', sel: '.a-sched', h: 1100 },
  { g: 'barra', nome: 'a-barra-oggi', q: 'barra=0', sel: '.a-sched', h: 1100 },
  { g: 'barra', nome: 'a-barra-oggi-40', q: 'barra=0&n=40', sel: '.a-sched', h: 1100 },
  { g: 'barra', nome: 'a-barra-console-stato', q: '', h: 620, viewport: true },
  { g: 'barra', nome: 'a-barra-console-oggi', q: 'barra=0', h: 620, viewport: true },
  { g: 'barra', nome: 'a-barra-passi', q: 'pagina=esecuzione&id=1&tendina=chiusa', sel: '.etesta .a-sched', h: 1400 },
  /* --- versione 17: il quadro del giorno sul telefono (la forma scelta e le due scartate) e la tab Dipartimenti --- */
  { g: 'quadro', nome: 'm-quadro-niente', file: 'mobile.html', q: 'schermata=1&quadro=0', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-riga', file: 'mobile.html', q: 'schermata=1', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-riga-40', file: 'mobile.html', q: 'schermata=1&n=40', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-piani', file: 'mobile.html', q: 'schermata=1&quadro=1', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-duedue', file: 'mobile.html', q: 'schermata=1&quadro=2', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimenti', file: 'mobile.html', q: 'schermata=7', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimenti-40', file: 'mobile.html', q: 'schermata=7&n=40', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimento', file: 'mobile.html', q: 'schermata=8&dip=mkt', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimento-giu', file: 'mobile.html', q: 'schermata=8&dip=mkt', sel: '.m-tel', h: 1100, eval: "document.querySelector('.m-scroll').scrollTop=560" },
  { g: 'dip', nome: 'm-dipartimento-amm', file: 'mobile.html', q: 'schermata=8&dip=amm', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-chat-cerca', file: 'mobile.html', q: 'schermata=4', sel: '.m-tel', h: 1100, clic: '[data-az="mcerca"]', eval: "(()=>{const i=document.querySelector('input[data-mcerca]');i.value='mar';i.dispatchEvent(new Event('input',{bubbles:true}))})()" },
  /* --- versione 17: i controlli delle intestazioni di sezione, la regola applicata --- */
  { g: 'controlli', nome: 'a-sez-dipendenti', q: 'tendina=chiusa', sel: '.a-main section:nth-of-type(3) .shead', h: 1400 },
  { g: 'controlli', nome: 'a-sez-cerca', q: 'tendina=chiusa', sel: '.a-main section:nth-of-type(3)', h: 1400, clic: '[data-az="cerca"][data-sez="home.dipendenti"]', eval: "(()=>{const i=document.querySelector('input[data-cerca]');i.value='ma';i.dispatchEvent(new Event('input',{bubbles:true}))})()" },
  { g: 'controlli', nome: 'a-sez-log', q: 'pagina=esecuzione&id=4&tendina=chiusa', sel: '.a-main section:nth-of-type(3) .shead', h: 1400, clic: '[data-az="cerca"][data-sez="esec.log"]' },
  { g: 'controlli', nome: 'a-sez-costo-passo', q: 'pagina=esecuzione&id=4&tendina=chiusa', sel: '.a-main section:nth-of-type(5)', h: 1400, clic: '[data-az="sez"][data-sez="esec.costo"][data-v="passo"]' },
  { g: 'controlli', nome: 'a-sez-spesa-oggi', q: 'pagina=dipartimento&dip=svi&tendina=chiusa', sel: '.a-main section:nth-of-type(5)', h: 1400, clic: '[data-az="periodo"][data-sez="dip.spesa"][data-v="oggi"]' },
];

(async () => {
  const arg = process.argv.slice(2);
  const iOut = arg.indexOf('--in');
  const out = iOut >= 0 ? path.resolve(arg[iOut + 1]) : path.join(QUI, 'screenshot');
  const gruppi = arg.filter((a, i) => !a.startsWith('--') && arg[i - 1] !== '--in');
  const lista = CATTURE.filter(c => !gruppi.length || gruppi.includes(c.g) || gruppi.includes(c.nome));
  if (!lista.length) { console.error('niente da catturare'); process.exit(1); }
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const errori = [];
  for (const c of lista) {
    const w = c.w || 1440, h = c.h || 1120, scala = c.sel ? (c.scala || 2) : 1;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark', reducedMotion: 'reduce', deviceScaleFactor: scala });
    const page = await ctx.newPage();
    if (css) await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
    page.on('pageerror', e => errori.push(c.nome + ': ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errori.push(c.nome + ': ' + m.text()); });
    await page.goto('file://' + path.join(QUI, (c.file || 'direzione-a.html')) + (c.q ? '?' + c.q : ''), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(600);
    if (c.clic) for (const s of c.clic.split('|')) { await page.click(s); await page.waitForTimeout(300); }
    if (c.eval) { await page.evaluate(c.eval); await page.waitForTimeout(300); }
    const file = path.join(out, c.nome + '.png');
    if (c.sel) await page.locator(c.sel).first().screenshot({ path: file });
    else await page.screenshot({ path: file, fullPage: !c.viewport });
    console.log(c.nome + '.png');
    await ctx.close();
  }
  await browser.close();
  if (errori.length) { console.error('errori in console:', errori); process.exit(1); }
  console.log(lista.length + ' catture in ' + out);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
