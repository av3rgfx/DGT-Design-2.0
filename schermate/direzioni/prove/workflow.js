// Prova cliccata dei workflow e del perimetro delle consegne (versione 20): l'elenco del dipartimento, il canvas a
// nodi, il nodo che si apre, la firma anticipata che nasce spenta, le pillole del periodo della sezione «Consegne»,
// e la schermata 10 del telefono.
// Sta in un file suo e non dentro console.js apposta: console.js sceglie tre sezioni con `nth-of-type`, e ogni prova
// nuova che ne aggiunge una li sposta. Qui non c'è nessun indice di sezione da rompere.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/workflow.js
const path = require('path'), fs = require('fs');

const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const vis = require('./visibile.js');
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
  /* Il numero era 2 594 px fino alla versione 20. La banda riservata della versione 21 stringe la colonna da 1312 a
     1008 px e la pagina si allunga: il prezzo misurato del non avere più controlli sotto la tendina. Resta il senso
     dell'asserzione — a «oggi» la pagina non si muove — e infatti la si rilegge sotto, dopo le pillole del periodo. */
  check(altOggi === 3198, 'Sviluppo a «oggi» è alta 3 198 px: 3 130 più i 68 px dell\'intestazione a due righe della versione 22, e da lì non si muove (' + altOggi + ')');
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
  /* 2 960 px fino alla versione 20; 3 526 con la banda riservata. L'ingresso ai workflow continua a non costare un
     pixel: la differenza è tutta della colonna più stretta, non della pillola. */
  check(alt === 3594, 'Marketing è alta 3 594 px: l\'ingresso ai workflow non costa un pixel, la banda riservata e l\'intestazione a due righe sì (' + alt + ')');
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
  /* ---- 8. le routine: il record che prima non c'era (versione 21) ----
     Il primo giro non costruisce nessuna interfaccia: si etichettano le routine che il modello ha già e si guarda
     se la lista sta in piedi. Le «otto voci» censite dall'analisi sono, contate, **tre routine viste da otto lati**
     più un lavoro una tantum che routine non è. */
  console.log('\n8. il record della routine (versione 21): tre, non otto');
  await page.goto(file('tendina=chiusa')); await page.waitForTimeout(300);
  const rt11 = await page.evaluate(() => {
    const m = DGT_DATI.modello(11);
    return {
      n: m.routine.length,
      nomi: m.routine.map(r => r.nome),
      inneschi: m.routine.map(r => r.innesco.testo),
      clausole: m.routine.map(r => r.clausola),
      rodaggi: m.routine.map(r => m.rodaggioDi(r)),
      /* i lati da cui le tre si vedevano prima di avere un record */
      obiettiviRicorrenti: m.obiettivi.filter(o => /^ogni /.test(o.scadenza || '')).length,
      pianificati: m.dipendenti.filter(e => e.stato === 'pianificato').length,
      decise: m.richieste.filter(r => r.deciso).length,
      /* il Tester QA delle 15:00 non è una routine: il diario dice che l'ha pianificato MR, ieri, per oggi */
      testerHaRoutine: m.routineDi(m.byId[2]).length,
      tetto: m.tettoAzienda(), soffittoVen: m.soffittoDi('ven'), soffittoSvi: m.soffittoDi('svi'),
      modo: m.tetti.modo, ferma: m.tetti.fermaPrimaDelPasso, somma: m.sommaSoffitti(),
    };
  });
  check(rt11.n === 3, 'le routine di undici sono tre, non otto: le otto voci erano tre routine viste da otto lati (' + rt11.n + ')');
  check(rt11.obiettiviRicorrenti + rt11.pianificati + rt11.decise === 8, 'e gli otto lati ci sono ancora tutti: ' + rt11.obiettiviRicorrenti + ' obiettivi che si ripetono + ' + rt11.pianificati + ' pianificati + ' + rt11.decise + ' richieste decise senza il titolare');
  check(rt11.testerHaRoutine === 0, 'il Tester QA delle 15:00 non è una routine: MR l\'ha pianificato ieri alle 18:20 per oggi');
  check(rt11.inneschi.every(t => /^Ogni /.test(t)), 'ognuna porta il suo innesco: ' + rt11.inneschi.join(' · '));
  check(rt11.clausole.every(c => c === 'libera'), 'tutte e tre girano già con il «fai pure»');
  check(rt11.rodaggi.every(r => r.fatte < r.di), 'e nessuna ha finito il rodaggio di tre giri: ' + rt11.rodaggi.map(r => r.fatte + '/' + r.di).join(' · ') + ' — nel modello di oggi il «fai pure» non se l\'è guadagnato nessuno');
  const rt40 = await page.evaluate(() => { const m = DGT_DATI.modello(40); return { n: m.routine.length, tutteApprovate: m.routine.every(r => r.decise.every(id => (m.richieste.find(x => x.id === id) || {}).stato === 'approvata')) }; });
  check(rt40.n === 3, 'a quaranta il generatore ne ricava tre con lo stesso criterio (' + rt40.n + ')');
  check(rt40.tutteApprovate, 'e nessuna nasce da una richiesta rifiutata: quella il titolare l\'ha vista');

  console.log('\n9. i tetti di spesa (decisione 55 e le due conferme dell\'8 settembre)');
  check(rt11.modo === 'soffitto', 'il tetto di dipartimento è un soffitto, non una ripartizione: le quote possono sommare oltre 100');
  check(rt11.ferma === true, 'e il tetto si controlla prima di ogni passo, mai a metà');
  check(rt11.tetto.giorno === 115 && rt11.tetto.mese === 1580, 'il tetto d\'azienda a undici: 115 €/giorno e 1 580 €/mese, la somma dei budget (' + rt11.tetto.giorno + '/' + rt11.tetto.mese + ')');
  check(rt11.soffittoVen === 69 && rt11.soffittoSvi === null, 'Vendite ha un soffitto del 60 % (69 €), gli altri no: obbligatorio è solo il tetto d\'azienda');
  check(rt11.somma === 60, 'e la somma delle quote è 60 %: sotto il 100, nessun avviso da dare (' + rt11.somma + ')');

  /* ---- 10. che i controlli SI VEDANO (versione 21) ---- */
  console.log('\n10. i controlli dei workflow si vedono, non solo esistono');
  await page.goto(file('pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(200);
  const wid = await page.evaluate(() => { const c = document.querySelector('[data-az="workflow"]'); return c ? c.dataset.id : ''; });
  let copW = 0, mutiW = 0;
  for (const stato of ['aperta', 'chiusa']) {
    for (const q of ['pagina=workflow&dip=svi', 'pagina=workflow&dip=svi&workflow=' + wid, 'pagina=dipartimento&dip=svi']) {
      for (const n of ['11', '40']) {
        await page.goto(file(q + '&n=' + n + '&tendina=' + stato)); await page.waitForTimeout(150);
        const cop = await vis.coperti(page), mu = await vis.muti(page);
        copW += cop.length; mutiW += mu.length;
        if (cop.length) console.log('    COPERTI ' + q + '@' + n + '/' + stato + ': ' + cop.join(' | '));
        if (mu.length) console.log('    MUTI ' + q + '@' + n + '/' + stato + ': ' + mu.join(' | '));
      }
    }
  }
  check(copW === 0, 'nessun nodo e nessuna pillola nascono sotto la tendina: era il difetto che ha aperto la sessione (' + copW + ')');
  check(mutiW === 0, 'e nessun controllo sta in un contenitore che non scorre (' + mutiW + ')');
  await page.goto(file('pagina=workflow&dip=svi&workflow=' + wid + '&tendina=aperta')); await page.waitForTimeout(300);
  const cw = await page.evaluate(() => ({ main: Math.round(document.querySelector('.a-main').getBoundingClientRect().width), canvas: Math.round(document.querySelector('.wcanvas').getBoundingClientRect().width), col: [...document.querySelectorAll('.wnode')].map(n => Math.round(n.getBoundingClientRect().x)).filter((v, i, a) => a.indexOf(v) === i).length }));
  check(cw.main === 1008 && cw.canvas <= 1008, 'il canvas sta nella colonna riservata senza eccezioni (' + cw.canvas + ' px in ' + cw.main + ')');
  check(cw.col <= 4, 'su quattro colonne invece di cinque: 6 px di passo in meno, non le due colonne che la stima prometteva (' + cw.col + ')');

  /* ---- versione 22: il nodo aperto non copre piu' il nodo sotto ----
     Difetto della versione 20, trovato misurando in questa sessione: aprire un nodo ne copriva un altro **per
     intero** (18 096 px², cioe' tutti i 208×87 del nodo sotto), perche' il canvas aggiungeva 168 px in fondo
     invece di spostare in giu' le righe seguenti. Adesso le righe scendono di quanto il nodo cresce, e l'altezza
     del nodo aperto e' un conto fatto prima di stampare, non una misura presa dopo. */
  console.log('\n11. il nodo aperto non copre nessuno, e nessun nodo finisce sotto la barra');
  let stati = 0, copertiN = 0, sottoBarra = 0;
  for (const n of ['11', '40']) {
    await page.goto(file('n=' + n + '&pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(200);
    const wids = await page.evaluate(() => [...document.querySelectorAll('[data-az="workflow"]')].map(e => e.dataset.id));
    for (const id of wids.slice(0, 3)) {
      for (const modo of ['', '&ramo=1&gesto=a', '&ramo=1&gesto=b']) {
        for (let k = 0; k <= 9; k++) {
          await page.goto(file('n=' + n + '&pagina=workflow&workflow=' + id + '&nodo=' + k + modo + '&tendina=chiusa'));
          await page.waitForTimeout(45);
          const r = await page.evaluate(() => {
            const ns = [...document.querySelectorAll('.wcanvas .wnode')].map(e => { const b = e.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
            let s = 0;
            for (let i = 0; i < ns.length; i++) for (let j = i + 1; j < ns.length; j++) {
              const a = ns[i], c = ns[j];
              if (Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x) > 2 && Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y) > 2) s++;
            }
            const cv = document.querySelector('.wcanvas').getBoundingClientRect();
            return { s, fuori: ns.filter(e => e.y + e.h > cv.top + cv.height - 62 + 1).length };
          });
          stati++; copertiN += r.s; sottoBarra += r.fuori;
        }
      }
    }
  }
  check(stati >= 120, 'provati ' + stati + ' stati del canvas: ogni nodo aperto e chiuso, nei tre modi, a due taglie');
  check(copertiN === 0, 'nessun nodo ne copre un altro: era uno coperto per intero a ogni nodo aperto (' + copertiN + ')');
  check(sottoBarra === 0, 'e nessun nodo finisce sotto la barra in fondo al canvas (' + sottoBarra + ')');

  if (!errors.length) ok++; else ko++;
  console.log('\n' + ok + ' ok, ' + ko + ' ko');
  await browser.close();
  process.exit(ko ? 1 : 0);
})();
