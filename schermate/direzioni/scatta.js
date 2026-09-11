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
  /* versione 18: i prima/dopo delle frecce di riga. Il «prima» è l'albero della versione 17 (`git archive HEAD` in una
     cartella a parte), quindi non si rifanno da soli: si compongono con `design-system/tools/affianca.js` dalle catture
     di sezione delle due copie. `m-conta-titolo.png` affianca tre catture del gruppo `quadro`, già qui sotto. */
  'a-frecce-*.png', 'm-conta-titolo.png',
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
  /* versione 32: la pagina Impostazioni, il primo posto del prodotto dove si scrive un numero (decisione 56) */
  { g: 'console', nome: 'a-impostazioni', q: 'pagina=impostazioni&tendina=chiusa' },
  { g: 'console', nome: 'a-impostazioni-40', q: 'pagina=impostazioni&n=40&tendina=chiusa' },
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
  /* --- versione 17: il quadro del giorno sul telefono (la forma scelta, «due per due», e le due scartate) e la tab Dipartimenti --- */
  { g: 'quadro', nome: 'm-quadro-niente', file: 'mobile.html', q: 'schermata=1&quadro=0', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-duedue', file: 'mobile.html', q: 'schermata=1', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-duedue-40', file: 'mobile.html', q: 'schermata=1&n=40', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-piani', file: 'mobile.html', q: 'schermata=1&quadro=1', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-quadro-riga', file: 'mobile.html', q: 'schermata=1&quadro=3', sel: '.m-tel', h: 1100 },
  /* lo studio della misura del conto nel titolo (2026-09-07, dopo la scelta della forma 2): le tre forme messe a
     confronto in `m-conta-titolo.png`. `conta=0` rimette la riga dei due numeri grandi, 1 è la scelta, 2 la strada di mezzo. */
  { g: 'quadro', nome: 'm-conta-riga', file: 'mobile.html', q: 'schermata=1&quadro=2&conta=0', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-conta-26', file: 'mobile.html', q: 'schermata=1&quadro=2&conta=1', sel: '.m-tel', h: 1100 },
  { g: 'quadro', nome: 'm-conta-36', file: 'mobile.html', q: 'schermata=1&quadro=2&conta=2', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimenti', file: 'mobile.html', q: 'schermata=7', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimenti-40', file: 'mobile.html', q: 'schermata=7&n=40', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimento', file: 'mobile.html', q: 'schermata=8&dip=mkt', sel: '.m-tel', h: 1100 },
  { g: 'dip', nome: 'm-dipartimento-giu', file: 'mobile.html', q: 'schermata=8&dip=mkt', sel: '.m-tel', h: 1100, eval: "document.querySelector('.m-scroll').scrollTop=560" },
  { g: 'dip', nome: 'm-dipartimento-amm', file: 'mobile.html', q: 'schermata=8&dip=amm', sel: '.m-tel', h: 1100 },
  /* --- versione 19: le consegne del dipartimento --- */
  { g: 'consegne', nome: 'a-sez-consegne', q: 'pagina=dipartimento&dip=svi&tendina=chiusa', sel: '.a-main section:nth-of-type(2)', h: 1400 },
  { g: 'consegne', nome: 'a-sez-consegne-fatte', q: 'pagina=dipartimento&dip=svi&tendina=chiusa', sel: '.a-main section:nth-of-type(2)', h: 1400, clic: '.a-main section:nth-of-type(2) .pill[data-v="fatte"]' },
  { g: 'consegne', nome: 'a-consegna', q: 'pagina=consegna&consegna=c1-0&tendina=chiusa' },
  { g: 'consegne', nome: 'a-consegna-richiesta', q: 'pagina=consegna&consegna=c4-2&tendina=chiusa' },
  { g: 'consegne', nome: 'a-consegna-sola', q: 'n=40&pagina=consegna&consegna=c7-0&tendina=chiusa' },
  { g: 'consegne', nome: 'm-consegna', file: 'mobile.html', q: 'schermata=9&dip=svi&consegna=c1-0', sel: '.m-tel', h: 1100 },
  { g: 'consegne', nome: 'm-consegna-post', file: 'mobile.html', q: 'schermata=9&dip=mkt&consegna=c4-2', sel: '.m-tel', h: 1100 },
  { g: 'consegne', nome: 'a-dipartimento-40', q: 'pagina=dipartimento&dip=svi&n=40&tendina=chiusa' },
  { g: 'consegne', nome: 'm-consegne', file: 'mobile.html', q: 'schermata=8&dip=svi', sel: '.m-tel', h: 1100, eval: "document.querySelector('.m-scroll').scrollTop=350" },
  /* --- versione 20: i workflow e il perimetro delle consegne (2026-09-08) ---
     Le due sezioni si cercano ancora con `nth-of-type(2)` qui sopra e continuano a valere: la versione 20 **non ha
     aggiunto nessuna sezione** al Dipartimento, e l'ingresso ai workflow e' una pillola dentro l'intestazione della
     prima. Se un domani una sezione si aggiunge, questi indici vanno rifatti dal titolo, come nelle prove. */
  { g: 'workflow', nome: 'a-workflow-elenco', q: 'pagina=workflow&dip=mkt&tendina=chiusa' },
  { g: 'workflow', nome: 'a-workflow', q: 'pagina=workflow&workflow=w1&tendina=chiusa' },
  { g: 'workflow', nome: 'a-workflow-nodo', q: 'pagina=workflow&workflow=w5&nodo=2&tendina=chiusa' },
  { g: 'workflow', nome: 'a-workflow-firma', q: 'pagina=workflow&workflow=w5&tendina=chiusa', clic: '[data-az="firma"]' },
  { g: 'workflow', nome: 'a-workflow-canvas', q: 'pagina=workflow&workflow=w5&nodo=2&tendina=chiusa', sel: '.wcanvas', h: 1400 },
  { g: 'workflow', nome: 'a-workflow-40', q: 'n=40&pagina=workflow&workflow=w3&tendina=chiusa' },
  { g: 'workflow', nome: 'm-workflow', file: 'mobile.html', q: 'schermata=10&dip=mkt&workflow=w5', sel: '.m-tel', h: 1100 },
  { g: 'workflow', nome: 'm-workflow-nodo', file: 'mobile.html', q: 'schermata=10&dip=mkt&workflow=w5&nodo=2', sel: '.m-tel', h: 1100 },
  { g: 'workflow', nome: 'a-sez-consegne-mese', q: 'pagina=dipartimento&dip=mkt&tendina=chiusa', sel: '.a-main section:nth-of-type(2)', h: 1600, clic: '[data-az="periodo"][data-sez="dip.consegne"][data-v="mese"]' },
  { g: 'workflow', nome: 'a-dipartimento-workflow', q: 'pagina=dipartimento&dip=mkt&tendina=chiusa' },
  { g: 'workflow', nome: 'spec-editor', file: '../../design-system/specimen.html', q: '', sel: '.editor', h: 1100 },
  /* --- versione 24: il grafo. I tre gesti della versione 22 non ci sono piu' (l'utente ha scelto il primo,
         decisione 64), quindi le loro tre catture diventano quelle del grafo: la disposizione, un nodo aperto,
         l'innesco col suo permesso e il canvas ingrandito con la mini-mappa. --- */
  { g: 'grafo', nome: 'a-grafo', q: 'pagina=workflow&workflow=w1&ramo=1&tendina=chiusa', sel: '.a-main > section:nth-of-type(2)', h: 1400 },
  { g: 'grafo', nome: 'a-grafo-nodo', q: 'pagina=workflow&workflow=w1&ramo=1&nodo=p2&tendina=chiusa', sel: '.a-main > section:nth-of-type(2)', h: 1400 },
  /* La pillola della versione 30 non e' fotografabile da un indirizzo: col passo a 342 nessun grafo **seminato**
     ha due nodi che si coprono, e nel modello nessuno e' mai stato trascinato. Quindi qui si trascina davvero —
     `p7` sotto `p3`, con eventi veri come farebbe una mano — e poi si scatta. */
  { g: 'grafo', nome: 'a-grafo-coperti', q: 'pagina=workflow&workflow=w1&ramo=1&tendina=chiusa', sel: '.a-main > section:nth-of-type(2)', h: 1400,
    eval: "(()=>{const n=document.querySelector('.wnode[data-id=\"p7\"]'),t=document.querySelector('.wnode[data-id=\"p3\"]');const a=n.getBoundingClientRect(),b=t.getBoundingClientRect();const o=(x,y)=>({bubbles:true,cancelable:true,clientX:x,clientY:y,view:window});n.dispatchEvent(new MouseEvent('mousedown',o(a.left+100,a.top+20)));window.dispatchEvent(new MouseEvent('mousemove',o(a.left+100,b.top+20+40)));window.dispatchEvent(new MouseEvent('mousemove',o(a.left+100,b.top+20+108)));window.dispatchEvent(new MouseEvent('mouseup',o(a.left+100,b.top+20+108)));window.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))})()" },
  { g: 'grafo', nome: 'a-grafo-innesco', q: 'pagina=workflow&workflow=w1&ramo=1&nodo=inn&tendina=chiusa', sel: '.wcanvas', h: 1400 },
  { g: 'grafo', nome: 'a-grafo-zoom', q: 'pagina=workflow&workflow=w1&ramo=1&zoom=1.5&tendina=chiusa', sel: '.wcanvas', h: 1400 },
  { g: 'grafo', nome: 'a-ramo-ultima', q: 'pagina=workflow&workflow=w1&nodo=2&tendina=chiusa', sel: '.a-main > section:nth-of-type(2)', h: 1400 },
  /* versione 27: il telefono porta il canvas vero, e le sue due scale (decisione 73). «m-grafo» e' lo scatto
     d'ingresso «tutto dentro» (0,306), «m-grafo-nodo» la seconda scala — scala 1 centrata sul nodo toccato —
     e «m-workflow» la stessa cosa sulla tab «L'ultima volta», che dalla 27 si ingrandisce anche lei. */
  { g: 'grafo', nome: 'm-grafo', file: 'mobile.html', q: 'schermata=10&dip=svi&workflow=w1&ramo=1', sel: '.m-tel', h: 1100 },
  { g: 'grafo', nome: 'm-grafo-nodo', file: 'mobile.html', q: 'schermata=10&dip=svi&workflow=w1&ramo=1&nodo=p3', sel: '.m-tel', h: 1100 },
  { g: 'routine', nome: 'a-routine-elenco', q: 'pagina=routine&tendina=chiusa' },
  { g: 'routine', nome: 'a-routine', q: 'pagina=routine&routine=rt1&tendina=chiusa' },
  { g: 'routine', nome: 'a-routine-wf', q: 'pagina=routine&routine=rt3&tendina=chiusa' },
  { g: 'dip', nome: 'm-chat-cerca', file: 'mobile.html', q: 'schermata=4', sel: '.m-tel', h: 1100, clic: '[data-az="mcerca"]', eval: "(()=>{const i=document.querySelector('input[data-mcerca]');i.value='mar';i.dispatchEvent(new Event('input',{bubbles:true}))})()" },
  /* --- versione 17: i controlli delle intestazioni di sezione, la regola applicata --- */
  { g: 'controlli', nome: 'a-sez-dipendenti', q: 'tendina=chiusa', sel: '.a-main section:nth-of-type(3) .shead', h: 1400 },
  { g: 'controlli', nome: 'a-sez-cerca', q: 'tendina=chiusa', sel: '.a-main section:nth-of-type(3)', h: 1400, clic: '[data-az="cerca"][data-sez="home.dipendenti"]', eval: "(()=>{const i=document.querySelector('input[data-cerca]');i.value='ma';i.dispatchEvent(new Event('input',{bubbles:true}))})()" },
  { g: 'controlli', nome: 'a-sez-log', q: 'pagina=esecuzione&id=4&tendina=chiusa', sel: '.a-main section:nth-of-type(3) .shead', h: 1400, clic: '[data-az="cerca"][data-sez="esec.log"]' },
  { g: 'controlli', nome: 'a-sez-costo-passo', q: 'pagina=esecuzione&id=4&tendina=chiusa', sel: '.a-main section:nth-of-type(5)', h: 1400, clic: '[data-az="sez"][data-sez="esec.costo"][data-v="passo"]' },
  /* dalla versione 19 la pagina Dipartimento ha sei sezioni: «Spesa del mese» e' la sesta, non piu' la quinta */
  { g: 'controlli', nome: 'a-sez-spesa-oggi', q: 'pagina=dipartimento&dip=svi&tendina=chiusa', sel: '.a-main section:nth-of-type(6)', h: 1400, clic: '[data-az="periodo"][data-sez="dip.spesa"][data-v="oggi"]' },
];

/* Dopo un clic (o un `eval`) non si contano 300 ms fissi. `a-workflow-firma` era l'unica cattura che clicca e usciva
   diversa 2 volte su 11 (versione 31); misurato nella 33: il clic fa scorrere la pagina di 614 px per portare la
   pillola in vista, e la cattura a pagina intera dipinge gli elementi `position:fixed` (le due linguette del
   titolare) **una volta sola**, a 240 px se e' passato almeno un fotogramma dallo scorrimento, a 854 (= 240 + 614)
   se no. Non e' il prodotto: e' Chromium che dipinge il fisso rispetto allo scorrimento del momento. Quindi si
   aspetta la fine di transizioni e animazioni (solo quelle finite: una infinita non finisce mai), si riporta lo
   scorrimento a zero come in tutte le altre catture, e si lasciano passare due fotogrammi. Tetto di 2 s perche'
   una cattura non deve mai restare appesa. */
const fermo = page => page.evaluate(() => Promise.race([
  Promise.all(document.getAnimations().filter(a => { try { return a.effect.getTiming().iterations !== Infinity; } catch (e) { return false; } }).map(a => a.finished.catch(() => {})))
    .then(() => document.fonts.ready)
    .then(() => { window.scrollTo(0, 0); return new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); }),
  new Promise(r => setTimeout(r, 2000)),
]));

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
    if (c.clic) for (const s of c.clic.split('|')) { await page.click(s); await fermo(page); }
    if (c.eval) { await page.evaluate(c.eval); await fermo(page); }
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
