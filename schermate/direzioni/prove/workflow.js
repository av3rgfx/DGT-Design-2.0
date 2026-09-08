// Prova cliccata dei workflow e del perimetro delle consegne (versione 20): l'elenco del dipartimento, il canvas a
// nodi, il nodo che si apre, la firma anticipata che nasce spenta, le pillole del periodo della sezione «Consegne»,
// e la schermata 10 del telefono.
// Sta in un file suo e non dentro console.js apposta: console.js sceglie tre sezioni con `nth-of-type`, e ogni prova
// nuova che ne aggiunge una li sposta. Qui non c'è nessun indice di sezione da rompere.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/workflow.js
const path = require('path'), fs = require('fs');

const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const file = q => 'file://' + path.resolve(__dirname, '../direzione-a.html') + (q ? '?' + q : '');
const tel = q => 'file://' + path.resolve(__dirname, '../mobile.html') + (q ? '?' + q : '');
let ok = 0, ko = 0;
const check = (cond, msg) => { if (cond) { ok++; console.log('  ok  ' + msg); } else { ko++; console.log('  KO  ' + msg); } };
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  const errors = []; page.on('pageerror', e => errors.push(e.message)); page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const txt = async sel => (await page.locator(sel).first().textContent()).replace(/\s+/g, ' ').trim();
  const titolo = () => txt('.a-title');
  const conta = sel => page.locator(sel).count();
  const largo = () => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  /* la sezione si cerca dal titolo, non con nth-of-type: è la lezione della versione 19 */
  const sez = re => `.a-main > section:has(h3:text-matches("${re}"))`;

  console.log('1. il perimetro delle consegne: le tre pillole, e «oggi» che non cambia niente');
  await page.goto(file('pagina=dipartimento&dip=svi&tendina=chiusa')); await page.waitForTimeout(400);
  check(await conta('.a-main > section') === 6, 'la pagina Dipartimento resta a sei sezioni: il perimetro non ne aggiunge');
  check(await txt(sez('^Consegne') + ' h3') === 'Consegne di oggi', 'il titolo dice il perimetro: «Consegne di oggi»');
  const altOggi = await page.evaluate(() => document.documentElement.scrollHeight);
  check(altOggi === 2594, 'Sviluppo a «oggi» è alta 2 594 px, esattamente come nella versione 19: la pagina ferma non cambia (' + altOggi + ')');
  check(await conta(sez('^Consegne') + ' .ncard.task') === 7, 'sette consegne di oggi in Sviluppo, come prima');
  check(await conta(sez('^Consegne') + ' [data-az="cerca"]') === 0, 'niente cerchio «cerca» a «oggi»: sette righe stanno in una schermata');

  await page.click('[data-az="periodo"][data-sez="dip.consegne"][data-v="settimana"]'); await page.waitForTimeout(300);
  check(await txt(sez('^Consegne') + ' h3') === 'Consegne dei sette giorni', 'a sette giorni il titolo cambia');
  check(await conta(sez('^Consegne') + ' .ncard.task') === 9, 'nove consegne: sette di oggi più due richieste decise negli ultimi sette giorni');
  await page.click('[data-az="periodo"][data-sez="dip.consegne"][data-v="mese"]'); await page.waitForTimeout(300);
  check(await txt(sez('^Consegne') + ' h3') === 'Consegne dei trenta giorni', 'a trenta giorni il titolo cambia ancora');
  check(await largo(), 'nessuno sforo orizzontale con il perimetro largo');

  console.log('2. le consegne dei giorni scorsi sono richieste decise, non dati inventati');
  await page.goto(file('pagina=dipartimento&dip=mkt&tendina=chiusa')); await page.waitForTimeout(400);
  await page.click('[data-az="periodo"][data-sez="dip.consegne"][data-v="mese"]'); await page.waitForTimeout(300);
  check(await conta(sez('^Consegne') + ' .ncard.task') === 12, 'Marketing a trenta giorni: dodici consegne');
  const chip = await page.locator(sez('^Consegne') + ' .ncard.task .sel').allTextContents();
  check(chip.some(t => /Modifiche|Rifiutata/.test(t)), 'fra le passate ce ne sono di rimandate indietro: lo stato lo dice con le parole dello storico');
  check(await conta(sez('^Consegne') + ' .pill:text("Da rifare")') === 1, 'e la pillola «Da rifare» le raggiunge (senza, starebbero solo dentro «Tutte»)');
  await page.click(sez('^Consegne') + ' .pill:text("Da rifare")'); await page.waitForTimeout(300);
  const rif = await conta(sez('^Consegne') + ' .ncard.task');
  check(rif > 0 && rif < 12, 'la pillola filtra davvero: ' + rif + ' di 12');

  console.log('3. la soglia della ricerca decide da sola, e a quaranta si accende');
  await page.goto(file('n=40&pagina=dipartimento&dip=mkt&tendina=chiusa')); await page.waitForTimeout(400);
  check(await conta(sez('^Consegne') + ' [data-az="cerca"]') === 0, 'a «oggi», dieci righe: niente cerchio');
  await page.click('[data-az="periodo"][data-sez="dip.consegne"][data-v="mese"]'); await page.waitForTimeout(300);
  check(await conta(sez('^Consegne') + ' .ncard.task') === 17, 'a trenta giorni diciassette consegne');
  check(await conta(sez('^Consegne') + ' [data-az="cerca"]') === 1, 'passate le dodici, il cerchio «cerca» compare da solo');

  console.log('4. dal Dipartimento ai workflow: una pillola, zero sezioni nuove');
  await page.goto(file('pagina=dipartimento&dip=mkt&tendina=chiusa')); await page.waitForTimeout(400);
  const alt = await page.evaluate(() => document.documentElement.scrollHeight);
  check(alt === 2960, 'Marketing resta alta 2 960 px: l\'ingresso ai workflow non costa un pixel (' + alt + ')');
  check(await conta('.shead [data-pagina="workflow"]') === 1, 'la pillola «Workflow» sta nell\'intestazione di «Oggi in Marketing»');
  check((await txt('.shead [data-pagina="workflow"]')).includes('2'), 'e dice quanti sono: due');
  check(await conta('.a-rail .rb') === 6, 'il rail resta a sei cerchi');
  await page.click('.shead [data-pagina="workflow"]'); await page.waitForTimeout(400);
  check(await titolo() === 'WORKFLOW · MARKETING', 'si apre l\'elenco dei workflow del dipartimento');
  check(await conta('.ncard.task[data-az="workflow"]') === 2, 'due card');

  console.log('5. il canvas: nodi, connettori, porte, e il titolare in fondo');
  await page.click('.ncard.task[data-az="workflow"]'); await page.waitForTimeout(400);
  check(await titolo().then(t => t.length > 0), 'si apre il workflow: ' + await titolo());
  const nodi = await conta('.wnode'), archi = await conta('.edges path.arc'), porte = await conta('.wport');
  check(nodi >= 4, nodi + ' nodi sul canvas');
  check(archi === nodi - 1, 'i connettori sono uno in meno dei nodi: ' + archi);
  check(porte > 0, porte + ' porte sotto i nodi (modello e strumenti)');
  check(await conta('.wnode.tit') === 1, 'un nodo solo è il titolare, ed è l\'ultimo della catena');
  check(await txt('.wnode.tit .tt b') === 'Firma del titolare', 'e si chiama «Firma del titolare»');
  check(await largo(), 'il canvas non fa scorrere la pagina di lato');
  check(await conta('.wnode.tit .nic .av, .wnode.tit .av') === 0, 'il nodo del titolare non porta un avatar in tinta: la regola 19 dice che il disco in tinta è un dipendente AI');

  console.log('6. un nodo si apre e mostra i suoi campi: è il gesto con cui si modifica il workflow');
  check(await conta('.wnode.on') === 0, 'all\'apertura nessun nodo è selezionato');
  const primaAlt = await page.evaluate(() => document.querySelector('.wcanvas').getBoundingClientRect().height);
  await page.click('.wnode:not(.tit)'); await page.waitForTimeout(300);
  check(await conta('.wnode.on') === 1, 'il clic apre un nodo solo');
  check(await conta('.wnode.on .campi .fv') >= 2, 'e mostra i suoi campi: modello e strumenti');
  const dopoAlt = await page.evaluate(() => document.querySelector('.wcanvas').getBoundingClientRect().height);
  check(dopoAlt > primaAlt, 'il canvas cresce per far posto ai campi, che se no finirebbero sotto la barra (' + primaAlt + ' → ' + dopoAlt + ')');
  await page.click('.shead [data-az="nodo"][data-n="0"]'); await page.waitForTimeout(300);
  check(await conta('.wnode.on') === 0, '«Tutto il disegno» richiude il nodo');

  console.log('7. la firma anticipata nasce spenta, e si accende un workflow alla volta');
  check((await txt(sez('^La firma') + ' .cnt')).includes('Spenta'), 'nasce spenta: ogni uscita passa dalla coda');
  check(await conta(sez('^La firma') + ' .wfirma .fcard') === 3, 'i tre freni sono dichiarati: soglia, perimetro, scadenza');
  const freni = await page.locator(sez('^La firma') + ' .wfirma .fcard b').allTextContents();
  check(freni[0].includes('€') && freni[2].includes('esecuzioni'), 'e portano numeri: ' + freni.map(t => t.trim()).join(' · '));
  await page.click('[data-az="firma"]'); await page.waitForTimeout(300);
  check((await txt(sez('^La firma') + ' .cnt')).includes('Accesa'), 'il clic la accende');
  check(await conta('.wnode.tit') === 1, 'il canvas resta quello: la firma non toglie il nodo del titolare');
  await page.click('[data-az="firma"]'); await page.waitForTimeout(300);
  check((await txt(sez('^La firma') + ' .cnt')).includes('Spenta'), 'e si rispegne');

  console.log('8. tutti i controlli del canvas fanno quello che promettono (regola 25)');
  const inerti = await page.evaluate(() => document.querySelectorAll('.wcanvas .pill:not([data-az]), .a-main .shead .pill:not([data-az]), .a-main .shead .rb:not([data-az])').length);
  check(inerti === 0, 'zero controlli inerti nella pagina del workflow');
  await page.click('.wbar [data-pagina="esecuzione"]'); await page.waitForTimeout(400);
  check(await titolo().then(t => t.length > 0), '«Vedi l\'esecuzione» porta davvero all\'esecuzione: ' + await titolo());

  console.log('9. il workflow nasce da un\'esecuzione riuscita, e i numeri sono sommati dai passi');
  const m = await page.evaluate(() => {
    const mm = window.DGT_DATI.modello(11);
    return mm.workflowDi(null).map(w => ({ id: w.id, nodi: w.nodi.length, passi: w.passi, costo: w.costo,
      somma: Math.round(10 * w.nodi.filter(n => !n.titolare).reduce((t, n) => t + n.costo, 0)) / 10,
      rotti: w.nodi.filter(n => n.stato === 'errore').length, conclusi: w.conclusi, firma: w.firma }));
  });
  check(m.length === 6, 'sei workflow a undici dipendenti');
  check(m.every(w => w.costo === w.somma), 'il costo di ogni workflow è la somma dei suoi passi, non una stima');
  check(m.every(w => w.rotti === 0), 'nessun workflow nasce da un\'esecuzione con un passo rotto');
  check(m.every(w => w.conclusi >= 2), 'ognuno nasce da almeno due passi conclusi');
  check(m.every(w => w.nodi === w.passi + 1), 'i nodi sono i passi più uno: il titolare');
  check(m.every(w => w.firma === false), 'e tutti nascono con la firma anticipata spenta');

  console.log('10. a quaranta dipendenti');
  await page.goto(file('n=40&pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(400);
  check(await conta('.ncard.task[data-az="workflow"]') === 6, 'sei workflow in Sviluppo a quaranta');
  await page.click('.ncard.task[data-az="workflow"]'); await page.waitForTimeout(400);
  check(await conta('.wnode') >= 4, 'il canvas si apre anche a quaranta');
  check(await largo(), 'e non scorre di lato nemmeno con i workflow più lunghi');

  console.log('11. il telefono: la schermata 10, il workflow girato in colonna');
  await page.goto(tel('schermata=8,10&dip=mkt&workflow=w5')); await page.waitForTimeout(500);
  const schermi = await page.locator('.m-scr').evaluateAll(a => a.map(x => x.dataset.schermata));
  check(schermi.join(',') === '8,10', 'le due schermate: il dipartimento e il workflow');
  check(await conta('.m-scr[data-schermata="8"] [data-az="workflow"]') === 2, 'dal dipartimento si arriva ai due workflow, senza una sezione nuova');
  check(await conta('.m-wn') === 5, 'cinque nodi in colonna');
  check(await conta('.m-warc') === 4, 'quattro connettori fra un nodo e l\'altro');
  check(await conta('.m-wn.tit') === 1, 'e l\'ultimo è il titolare');
  const lato = await page.evaluate(() => [...document.querySelectorAll('.m-scroll')].every(s => s.scrollWidth <= s.clientWidth));
  check(lato, 'nessuno schermo scorre di lato: il canvas si gira, non si stringe');
  await page.click('.m-scr[data-schermata="10"] [data-az="firma"]'); await page.waitForTimeout(300);
  check((await txt('.m-scr[data-schermata="10"] .m-azioni .pill')).includes('Spegni'), 'la firma si accende anche dal telefono, ed è lo stesso stato della Console');

  console.log('\n' + (errors.length ? 'errori in console: ' + errors.join(' | ') : '  ok  nessun errore in console: []'));
  if (!errors.length) ok++; else ko++;
  console.log('\n' + ok + ' ok, ' + ko + ' ko');
  await browser.close();
  process.exit(ko ? 1 : 0);
})();
