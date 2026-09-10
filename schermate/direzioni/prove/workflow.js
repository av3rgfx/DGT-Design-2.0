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
  /* Versione 32: 3 396 px, cioè 3 198 più i 198 della card della richiesta del tetto. Il tetto ferma il passo di
     un dipendente di Sviluppo, quindi la richiesta che lo sblocca sta fra le sue: ogni euro risale a un dipendente
     e a un'esecuzione, anche quando è un euro di budget. */
  check(altOggi === 3396, 'Sviluppo a «oggi» è alta 3 396 px: i 3 198 di prima più i 198 della richiesta del tetto (' + altOggi + ')');
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
  check(archi === nodi - 1, "nell'ultima volta i connettori sono uno in meno dei nodi: è una catena avvenuta (" + archi + ')');
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

  /* ---- 11. il telefono: la schermata 10 (riscritta alla versione 27) ----
     Fino alla 26 questa sezione contava «.m-wn», le card della colonna. La colonna non c'è più: il telefono
     mostra **lo stesso canvas** della Console, in sola lettura (decisione 72), quindi si contano i «.wnode» —
     gli stessi nodi, la stessa classe, lo stesso componente. È il conto che dice se telefono e Console sono
     davvero un oggetto solo: se un giorno divergessero, questa riga sarebbe la prima a saperlo. */
  console.log('11. il telefono: la schermata 10, il canvas vero in sola lettura');
  await page.goto(tel('schermata=8,10&dip=mkt&workflow=w5')); await page.waitForTimeout(500);
  const schermi = await page.locator('.m-scr').evaluateAll(a => a.map(x => x.dataset.schermata));
  check(schermi.join(',') === '8,10', 'le due schermate: il dipartimento e il workflow');
  check(await conta('.m-scr[data-schermata="8"] [data-az="workflow"]') === 2, 'dal dipartimento si arriva ai due workflow, senza una sezione nuova');
  check(await conta('.m-scr[data-schermata="10"] .wcanvas') === 1, 'il telefono porta il canvas, non una colonna di card');
  check(await conta('.m-wn') === 0, 'e la colonna della versione 20 non c\'è più da nessuna parte (0 «.m-wn»)');
  check(await conta('.m-scr[data-schermata="10"] .wnode') === 5, 'cinque nodi, gli stessi della Console e con la stessa classe');
  check(await conta('.m-scr[data-schermata="10"] .wnode.tit') === 1, 'e l\'ultimo è il titolare');
  check(await conta('.m-scr[data-schermata="10"] .wport') > 0, 'le porte con l\'etichetta sono quelle del riferimento, non chip dentro la card');
  const lato = await page.evaluate(() => [...document.querySelectorAll('.m-scroll')].every(s => s.scrollWidth <= s.clientWidth));
  check(lato, 'nessuno schermo scorre di lato: a scorrere è la vista **dentro** il canvas, non lo schermo');
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
      /* versione 32: gli euro dappertutto. `soffittoDi`, `sommaSoffitti` e `tetti.modo` non esistono piu' —
         stavano qui dentro un `page.evaluate` **senza try/catch**, e toccarli senza sistemare queste due righe
         avrebbe fatto rigettare l'IIFE con 159 verifiche che non partono e sembrano passate. */
      tetto: m.tettoAzienda(), proposta: m.propostaTetto(), budgetVen: m.budgetDip('ven'), budgetSvi: m.budgetDip('svi'),
      ferma: m.tetti.fermaPrimaDelPasso, quote: m.tetti.dip,
      /* il tetto e' un numero posto, non una somma: si assume e non si muove */
      dopoAssunzione: (() => { const q = DGT_DATI.modello(11); q.aggiungi({ ruolo: 'Prova' }); return { tetto: q.tettoAzienda().giorno, proposta: q.propostaTetto().giorno }; })(),
      /* la percentuale come gesto: si scrive, si fissa in euro, e da li' non si muove */
      gesto: m.leggiLimite('60 %', 'giorno'), gestoEuro: m.leggiLimite('69'), gestoRotto: m.leggiLimite('ciao'),
      orizzontiRt: m.routine.map(r => m.orizzontiDi(r).join('+')),
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

  console.log('\n9. i limiti di spesa (versione 32: gli euro, e il tetto posto dal titolare)');
  check(rt11.ferma === true, 'il tetto si controlla prima di ogni passo, mai a metà');
  check(rt11.tetto.giorno === 115 && rt11.tetto.mese === 1580, 'il tetto d\'azienda a undici: 115 €/giorno e 1 580 €/mese (' + rt11.tetto.giorno + '/' + rt11.tetto.mese + ')');
  check(rt11.proposta.giorno === 115, 'e alla prima apertura la proposta era la somma dei budget, 115 €: il titolare l\'ha accettata, e da lì il numero è suo');
  check(rt11.dopoAssunzione.tetto === 115 && rt11.dopoAssunzione.proposta === 125, 'assumendo un dipendente la proposta sale a 125 € e il tetto resta 115: un limite che cambia per fatti altrui non è un limite (' + rt11.dopoAssunzione.tetto + '/' + rt11.dopoAssunzione.proposta + ')');
  check(rt11.budgetVen === null && rt11.budgetSvi === null && Object.keys(rt11.quote).length === 0, 'nessun dipartimento nasce con un budget: è facoltativo, e i due soffitti che si contraddicevano (30 € a schermo, 69 € nel modello) non ci sono più');
  check(rt11.gesto && rt11.gesto.v === 69 && /60 % di 115/.test(rt11.gesto.da), 'la percentuale è un gesto, non un dato: «60 %» diventa 69 € e porta scritto da dove viene («' + (rt11.gesto || {}).da + '»)');
  check(rt11.gestoEuro && rt11.gestoEuro.v === 69 && rt11.gestoEuro.da === '', 'e «69» resta 69 € senza traccia: la traccia c\'è solo se il gesto c\'è stato');
  check(rt11.gestoRotto === null, 'quello che non è un numero non scrive niente');
  check(rt11.orizzontiRt.join(' · ') === 'giorno+mese · giorno+settimana+mese · giorno+mese', 'giorno e mese dappertutto, la settimana solo dove la cadenza è settimanale: la sola settimanale è rt2, il venerdì (' + rt11.orizzontiRt.join(' · ') + ')');

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
  /* Il titolo diceva «il nodo aperto non copre nessuno» ma la misura sotto guarda `.wnode:not(.on)`, cioe' i
     soli nodi **chiusi**: affermava piu' di quello che verificava, e nella versione 24 il nodo aperto ha davvero
     cominciato a coprire. Corretto nella versione 29, dove il caso vero e' verificato dalla sezione 27. */
  console.log('\n11. due nodi chiusi non si coprono mai, e nessun nodo finisce sotto la barra');
  let stati = 0, copertiN = 0, sottoBarra = 0;
  for (const n of ['11', '40']) {
    await page.goto(file('n=' + n + '&pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(200);
    const wids = await page.evaluate(() => [...document.querySelectorAll('[data-az="workflow"]')].map(e => e.dataset.id));
    for (const id of wids.slice(0, 3)) {
      for (const modo of ['', '&ramo=1', '&ramo=1&zoom=0.8']) {
        for (let k = 0; k <= 9; k++) {
          /* nel grafo il nodo si sceglie dall'id (due rami portano lo stesso numero), nell'ultima volta dal numero */
          const scelto = modo ? (k === 0 ? 'inn' : k === 9 ? 'tit' : 'p' + k) : k;
          await page.goto(file('n=' + n + '&pagina=workflow&workflow=' + id + '&nodo=' + scelto + modo + '&tendina=chiusa'));
          await page.waitForTimeout(45);
          const r = await page.evaluate(() => {
            /* Versione 23: nel **ramo** le posizioni sono libere, quindi niente puo' spingere in giu' quello che
               sta sotto senza spostare il disegno dell'utente. Il nodo aperto **galleggia** sopra gli altri
               (`.wnode.on` ha z-index 3), come la card selezionata di qualunque canvas. La regola che resta, e
               che qui si verifica, e' che **due nodi chiusi non si coprono mai**: quella e' la disposizione, e la
               disposizione dev'essere leggibile. Nell'ultima volta, dove la serpentina dispone da sola, il nodo
               aperto continua a spingere (regola 33) e infatti li' non ci sono sovrapposizioni di nessun tipo. */
            const ns = [...document.querySelectorAll('.wcanvas .wnode:not(.on)')].map(e => { const b = e.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
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
  check(stati >= 120, 'provati ' + stati + ' stati del canvas: ogni nodo aperto e chiuso, nei tre modi (ultima volta, grafo, grafo ingrandito), a due taglie');
  check(copertiN === 0, 'due nodi chiusi non si coprono mai: la disposizione resta leggibile (' + copertiN + ')');
  check(sottoBarra === 0, 'e nessun nodo finisce sotto la barra in fondo al canvas (' + sottoBarra + ')');


  /* ================= 12. Il grafo e i suoi gesti (versione 24) =================
     La versione 23 aveva costruito il **modello** del grafo e lasciato il disegno. Qui si verifica il disegno: che
     gli archi vengano da `G.archi` e non dall'ordine dell'array, che i gesti chiesti dall'utente («spostare
     liberamente ogni card, collegare e biforcare piu' connettori anche su un singolo task») facciano davvero
     quello che dicono, e che i quattro acceleratori di n8n ci siano. Ogni verifica e' una **misura**: si legge il
     DOM, non il modello — `DGT_DATI.modello()` costruisce un modello nuovo a ogni chiamata, quindi interrogarlo da
     fuori direbbe sempre lo stato di partenza (lezione di questa sessione, presa sbattendoci la testa). */
  console.log('\n12. il grafo: gli archi vengono dagli archi, non dall\'ordine dell\'array');
  const grafo = () => page.evaluate(() => {
    const pos = {}, arc = [];
    document.querySelectorAll('.wcanvas .wnode').forEach(n => { pos[n.dataset.id] = [parseFloat(n.style.left), parseFloat(n.style.top)]; });
    document.querySelectorAll('.wcanvas path.arc').forEach(a => arc.push({ da: a.dataset.da, a: a.dataset.a, tipo: (a.getAttribute('class') || '').replace('arc', '').trim() }));
    const seg = arc.filter(x => pos[x.da] && pos[x.a]).map(x => ({ x1: pos[x.da][0] + 208, y1: pos[x.da][1] + 43.5, x2: pos[x.a][0], y2: pos[x.a][1] + 43.5 }));
    const sg = (a, b, c) => Math.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    let k = 0;
    for (let i = 0; i < seg.length; i++) for (let j = i + 1; j < seg.length; j++) {
      const P = { x: seg[i].x1, y: seg[i].y1 }, Q = { x: seg[i].x2, y: seg[i].y2 }, U = { x: seg[j].x1, y: seg[j].y1 }, V = { x: seg[j].x2, y: seg[j].y2 };
      if (sg(P, Q, U) * sg(P, Q, V) < 0 && sg(U, V, P) * sg(U, V, Q) < 0) k++;
    }
    /* i due capi di ogni filo devono cadere sulle prese dei due nodi: e' la prova che archi e nodi leggono la
       stessa posizione — nella versione 23 i nodi la leggevano dal nodo e gli archi dalla serpentina */
    let scollati = 0;
    document.querySelectorAll('.wcanvas path.arc').forEach(a => {
      const L = a.getTotalLength(), p0 = a.getPointAtLength(0), p1 = a.getPointAtLength(L);
      const d = pos[a.dataset.da], b = pos[a.dataset.a];
      if (!d || !b) { scollati++; return; }
      if (Math.abs(p0.x - (d[0] + 208)) > 1 || Math.abs(p0.y - (d[1] + 43.5)) > 1) scollati++;
      else if (Math.abs(p1.x - b[0]) > 1 || Math.abs(p1.y - (b[1] + 43.5)) > 1) scollati++;
    });
    /* nessun filo esce dalla colonna: il canvas non scorre di lato */
    let fuori = 0;
    document.querySelectorAll('.wcanvas path.arc').forEach(a => {
      const L = a.getTotalLength();
      for (let i = 0; i <= 60; i++) { const q = a.getPointAtLength(L * i / 60); if (q.x < 0 || q.x > 1008) { fuori++; break; } }
    });
    return { nodi: Object.keys(pos).length, archi: arc.length, pos, tipi: arc.map(x => x.tipo), incroci: k, scollati, fuori,
      etichette: [...document.querySelectorAll('.warcl')].map(e => e.textContent.trim()),
      piu: document.querySelectorAll('.warcz .wplus').length, ics: document.querySelectorAll('.warcz .wdel').length,
      prese: document.querySelectorAll('.wio').length, usc: document.querySelectorAll('.wio.usc').length,
      ent: document.querySelectorAll('.wio.ent').length, mappa: document.querySelectorAll('.wmini').length };
  });
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(400);
  let g = await grafo();
  check(g.nodi === 9 && g.archi === 8, 'il grafo di partenza: 9 nodi (l\'innesco, 7 passi e la firma) e 8 collegamenti (' + g.nodi + '/' + g.archi + ')');
  check(g.scollati === 0, 'ogni filo parte dalla presa del nodo che parte e arriva a quella del nodo che arriva: zero capi scollati (' + g.scollati + ')');
  check(g.fuori === 0, 'e nessun filo esce dalla colonna da 1008 px (' + g.fuori + ')');
  check(await conta('.wnode.inn') === 1, 'il nodo d\'innesco c\'è, ed è uno solo');
  check(await txt('.wnode.inn .tt b') === 'Quando parte', 'e si chiama «Quando parte»');
  check(g.usc === 8 && g.ent === 8, 'le prese: 8 uscite (tutti tranne il titolare) e 8 entrate (tutti tranne l\'innesco) — sono i due divieti del modello, disegnati (' + g.usc + '/' + g.ent + ')');
  check(g.piu === 8 && g.ics === 8, 'ogni collegamento porta il suo «+» e la sua «×»: ' + g.piu + ' e ' + g.ics);
  check(g.etichette.length === 0, '«poi» non si stampa: gli 8 archi di partenza sono tutti «poi», e scriverlo otto volte sarebbe rumore');
  check(g.incroci === 0, 'la disposizione di partenza non ha nessun incrocio (' + g.incroci + ')');
  /* ---- La mini-mappa, dalla versione 29 ----
     Fino alla 28 il grafo stava tutto nella cornice e la mappa non serviva. Col passo di riga a 342 il disegno
     e' alto 974 px contro gli 820 della soglia, quindi la mappa **c'e' sempre**, anche al 100 %: e' il prezzo
     che il titolare ha accettato per non avere piu' un nodo aperto sopra quello sotto. Quello che si verifica
     adesso non e' piu' la sua assenza, ma che non **copra** niente: la riserva in fondo esiste apposta. */
  check(g.mappa === 1, 'la mini-mappa c\'è anche al 100 %: col passo a 342 il grafo non sta più in una schermata (' + g.mappa + ')');
  const mappaSopra = await page.evaluate(() => {
    const mi = document.querySelector('.wmini'); if (!mi) return -1;
    const M = mi.getBoundingClientRect(); let n = 0;
    document.querySelectorAll('.wnode, .wplab, .wtag').forEach(e => { const q = e.getBoundingClientRect();
      if (Math.min(M.right, q.right) - Math.max(M.left, q.left) > 0.5 && Math.min(M.bottom, q.bottom) - Math.max(M.top, q.top) > 0.5) n++; });
    return n;
  });
  check(mappaSopra === 0, 'e non copre nessun nodo, nessuna etichetta e nessun tag: in fondo le è riservato lo spazio (' + mappaSopra + ')');
  const raggio = await page.evaluate(() => getComputedStyle(document.querySelector('.wnode.inn')).borderTopLeftRadius);
  check(parseInt(raggio, 10) >= 36, 'il nodo d\'innesco ha il fianco arrotondato, come il trigger di n8n (' + raggio + ')');

  console.log('\n13. il trascinamento: 1 px del canvas = zoom px di schermo, a ogni larghezza');
  const scatolaDi = sel => page.locator(sel).first().boundingBox();
  /* Il canvas si porta **tutto** sotto gli occhi prima di trascinare. Dalla versione 29 il passo di riga e' 342
     e il canvas e' piu' alto: un nodo della seconda riga puo' cadere fuori dalla finestra della prova, e un
     rilascio fuori dalla finestra non trova nessun nodo — nasce un passo nel vuoto invece del collegamento. Non
     e' un difetto del prodotto, e' la prova che deve guardare dove trascina. Si scorre **una volta sola**, prima
     di prendere le misure: se si scorresse a ogni misura, le coordinate prese prima diventerebbero vecchie. */
  const canvasInVista = async () => { await page.locator('.wcanvas').first().scrollIntoViewIfNeeded().catch(() => {}); await page.waitForTimeout(80); };
  let esatti = 0, agganci = 0;
  for (const [W, zo] of [[1440, '1'], [1920, '1'], [1024, '1'], [1440, '1.5'], [1440, '0.6']]) {
    await page.setViewportSize({ width: W, height: 1100 });
    await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&zoom=' + zo + '&tendina=chiusa')); await page.waitForTimeout(300);
    await canvasInVista();
    const prima = (await grafo()).pos.p2;
    const b1 = await scatolaDi('.wnode[data-id="p2"]');
    /* il fattore composto si **misura**, non si indovina: e' il rapporto fra il rettangolo sullo schermo e la
       larghezza dichiarata della cornice che si scala */
    const f = await page.evaluate(() => { const z = document.querySelector('.wzoom'); return z.getBoundingClientRect().width / z.offsetWidth; });
    const dxS = 180, dyS = 90;            /* pixel di schermo */
    await page.mouse.move(b1.x + b1.width / 2, b1.y + 20);
    await page.mouse.down();
    await page.mouse.move(b1.x + b1.width / 2 + dxS, b1.y + 20 + dyS, { steps: 10 });
    await page.mouse.up(); await page.waitForTimeout(250);
    const dopo = (await grafo()).pos.p2;
    /* la stessa formula del modello, clamp compreso: la colonna e' larga 1008 e un nodo non ne esce */
    const atteso = [Math.max(0, Math.min(1008 - 208 - 8, Math.round((prima[0] + dxS / f) / 18) * 18)), Math.max(0, Math.round((prima[1] + dyS / f) / 18) * 18)];
    if (dopo[0] === atteso[0] && dopo[1] === atteso[1]) esatti++;
    if (dopo[0] % 18 === 0 && dopo[1] % 18 === 0) agganci++;
  }
  await page.setViewportSize({ width: 1440, height: 1100 });
  check(esatti === 5, 'il nodo finisce esattamente dove lo si è lasciato, a 1440, 1920 e 1024 px e con lo zoom a 1,5 e 0,6: ' + esatti + ' su 5');
  check(agganci === 5, 'e sempre agganciato ai 18 px della griglia, cioè ai punti che il canvas disegna: ' + agganci + ' su 5');

  console.log('\n14. «Riordina»: la misura per cui viene subito dopo il trascinamento, non alla fine');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  /* si scompiglia il disegno come lo scompiglia l'uso: tre nodi trascinati a caso */
  for (const [id, dx, dy] of [['p2', 240, 250], ['p5', -300, -190], ['p7', -420, 120]]) {
    const b1 = await scatolaDi('.wnode[data-id="' + id + '"]');
    await page.mouse.move(b1.x + b1.width / 2, b1.y + 20); await page.mouse.down();
    await page.mouse.move(b1.x + b1.width / 2 + dx, b1.y + 20 + dy, { steps: 8 }); await page.mouse.up();
    await page.waitForTimeout(150);
  }
  const sporco = await grafo();
  await page.click('[data-az="ramo-riordina"]'); await page.waitForTimeout(300);
  const pulito = await grafo();
  check(sporco.incroci > 0, 'trascinando tre nodi il canvas accumula ' + sporco.incroci + ' incroci di collegamenti: è la misura che dice perché «Riordina» non può aspettare');
  check(pulito.incroci < sporco.incroci, 'e «Riordina» li porta a ' + pulito.incroci);
  check(Object.values(pulito.pos).every(p => p[0] % 18 === 0 && p[1] % 18 === 0), 'il riordino lascia ogni nodo sulla griglia');
  check(Object.values(pulito.pos).every(p => p[0] >= 0 && p[0] <= 1008 - 208), 'e nessun nodo fuori dalla colonna');

  console.log('\n15. collegare: dalla presa, e il rilascio nel vuoto che crea il passo già collegato');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  await canvasInVista();
  const tira = async (daId, dove) => {
    const pu = await scatolaDi('.wio.usc[data-id="' + daId + '"]');
    await page.mouse.move(pu.x + pu.width / 2, pu.y + pu.height / 2); await page.mouse.down();
    await page.mouse.move(dove.x, dove.y, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(250);
  };
  const n4 = await scatolaDi('.wnode[data-id="p4"]');
  await tira('p1', { x: n4.x + 60, y: n4.y + 30 });
  let g2 = await grafo();
  check(g2.archi === 9, 'tirando dalla presa di un passo a un altro nasce un collegamento: 8 → ' + g2.archi);
  check(g2.pos.p1 && g2.archi === 9 && g2.scollati === 0, 'e il filo nuovo è attaccato alle prese come gli altri');
  const cvBox = await scatolaDi('.wcanvas');
  await tira('p3', { x: cvBox.x + 700, y: cvBox.y + cvBox.height - 170 });
  let g3 = await grafo();
  check(g3.nodi === 10 && g3.archi === 10, 'lasciando il filo nel vuoto nasce un passo **già collegato** (l\'idea di UX migliore di n8n): ' + g3.nodi + ' nodi, ' + g3.archi + ' collegamenti');
  check(await conta('.wnode') === 10, 'e il passo nuovo è sul canvas');

  console.log('\n16. il significato sta sul collegamento, non sulle porte del nodo (decisione 65)');
  const arcoNuovo = await page.evaluate(() => { const a = [...document.querySelectorAll('path.presa')].find(x => x.dataset.da === 'p1' && x.dataset.a === 'p4'); return a ? a.dataset.arco : ''; });
  const clicSulFilo = async (id, frazione) => {
    const pt = await page.evaluate(([i, fr]) => {
      const e = document.querySelector('path.presa[data-arco="' + i + '"]'); const q = e.getPointAtLength(e.getTotalLength() * fr);
      const r = document.querySelector('.wzoom').getBoundingClientRect(); const f = r.width / 1008;
      return { x: r.left + q.x * f, y: r.top + q.y * f };
    }, [id, frazione]);
    await page.mouse.click(pt.x, pt.y); await page.waitForTimeout(220);
  };
  const giro = [];
  for (let i = 0; i < 4; i++) { await clicSulFilo(arcoNuovo, 0.25); giro.push((await grafo()).etichette.join('|')); }
  check(giro[0] === 'se…' && giro[1] === 'insieme' && giro[2] === 'se si ferma' && giro[3] === '', 'il clic sul filo gira fra i quattro significati e torna a «poi», che non si stampa: ' + JSON.stringify(giro));
  const conteggio = await page.evaluate(() => document.querySelectorAll('.wnode .porta-tipo, .wnode [data-porta-tipo]').length);
  check(conteggio === 0, 'e il nodo non guadagna nessuna porta nuova: il fan-out illimitato resta gratis');
  await clicSulFilo(arcoNuovo, 0.25);
  const etic = await page.locator('.warcl').first().boundingBox();
  check(etic.width <= 150 * 1.01, 'l\'etichetta sul filo sta nei 150 px che si è dichiarata (' + Math.round(etic.width) + ')');

  console.log('\n17. il «+» e la «×» sul collegamento');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  await page.locator('.warcz .wplus').first().click({ force: true }); await page.waitForTimeout(280);
  let g4 = await grafo();
  check(g4.nodi === 10 && g4.archi === 9, 'il «+» infila un passo **in mezzo** al collegamento: 9 nodi/8 archi → ' + g4.nodi + '/' + g4.archi);
  await page.locator('.warcz .wdel').first().click({ force: true }); await page.waitForTimeout(280);
  let g5 = await grafo();
  check(g5.archi === 8, 'la «×» toglie il collegamento: ' + g4.archi + ' → ' + g5.archi);

  console.log('\n18. lo zoom interno e la mini-mappa: transform, non zoom (misurato)');
  const zoomMisure = [];
  for (const W of [1440, 1920, 1024]) {
    await page.setViewportSize({ width: W, height: 1100 });
    for (const z of ['1', '1.5', '0.6']) {
      await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&zoom=' + z + '&tendina=chiusa')); await page.waitForTimeout(220);
      const r = await page.evaluate(() => { const n = document.querySelector('.wnode'), c = document.querySelector('.a-main');
        return { nodo: n.getBoundingClientRect().width, main: c.getBoundingClientRect().width, mappa: !!document.querySelector('.wmini') }; });
      zoomMisure.push({ W, z, atteso: Math.round(208 * (W / 1440) * parseFloat(z) * 10) / 10, avuto: Math.round(r.nodo * 10) / 10, mappa: r.mappa });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1100 });
  check(zoomMisure.every(x => Math.abs(x.atteso - x.avuto) < 0.6), 'lo zoom interno compone esattamente con quello della cornice: ' + zoomMisure.map(x => x.W + '@' + x.z + '→' + x.avuto).join(' · '));
  check(zoomMisure.filter(x => x.z !== '1').every(x => x.mappa), 'e la mini-mappa compare quando si ingrandisce o si rimpicciolisce, cioè quando c\'è qualcosa che non si vede');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&zoom=1.5&tendina=chiusa')); await page.waitForTimeout(250);
  const tend = await page.evaluate(() => { const t = document.querySelector('#a-tendina .a-tend, #a-tendina > *'); return t ? Math.round(t.getBoundingClientRect().right) : 0; });
  check(tend > 0 && tend <= 1441, 'e la tendina resta al bordo dello schermo anche con il canvas ingrandito: la regola 17 valeva per «zoom», non per «transform» (' + tend + ')');

  console.log('\n19. la selezione multipla e le scorciatoie');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  await canvasInVista();
  await page.click('.wnode[data-id="p1"]');
  await page.click('.wnode[data-id="p2"]', { modifiers: ['Shift'] }); await page.waitForTimeout(250);
  check(await conta('.wnode.mult') === 2, 'col maiuscolo si scelgono due passi (' + await conta('.wnode.mult') + ')');
  check(await conta('.wnode.on') === 0, 'e nessuno dei due si apre: con più di un passo scelto l\'editor non ha senso');
  const p1a = (await grafo()).pos.p1, p2a = (await grafo()).pos.p2;
  const bb = await scatolaDi('.wnode[data-id="p1"]');
  await page.mouse.move(bb.x + 100, bb.y + 20); await page.mouse.down();
  await page.mouse.move(bb.x + 100, bb.y + 20 + 108, { steps: 8 }); await page.mouse.up(); await page.waitForTimeout(280);
  const gg = await grafo();
  check(gg.pos.p1[1] === p1a[1] + 108 && gg.pos.p2[1] === p2a[1] + 108, 'e si trascinano insieme, dello stesso spostamento (' + (gg.pos.p1[1] - p1a[1]) + '/' + (gg.pos.p2[1] - p2a[1]) + ' px)');
  await page.keyboard.press('Escape'); await page.waitForTimeout(200);
  check(await conta('.wnode.mult') === 0, '«Esc» lascia andare la scelta');
  await page.click('.wnode[data-id="p2"]'); await page.waitForTimeout(200);
  await page.keyboard.press('Delete'); await page.waitForTimeout(250);
  check((await grafo()).nodi === 8, '«Canc» toglie il passo scelto e ricuce la catena (9 → ' + (await grafo()).nodi + ')');
  await page.keyboard.press('r'); await page.waitForTimeout(250);
  check(Object.values((await grafo()).pos).every(p => p[0] % 18 === 0), '«R» rimette in ordine');
  await page.keyboard.press('+'); await page.waitForTimeout(250);
  check(await page.evaluate(() => document.querySelector('.wcanvas').dataset.zoom) === '1.25', '«+» ingrandisce');
  await page.keyboard.press('0'); await page.waitForTimeout(250);
  check(await page.evaluate(() => document.querySelector('.wcanvas').dataset.zoom) === '1', 'e «0» torna al 100 %');

  console.log('\n20. il titolare e l\'innesco: i due divieti restano dove stanno, nel modello');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&nodo=tit&tendina=chiusa')); await page.waitForTimeout(300);
  check(await conta('.wnode.tit .azioni-n') === 0, 'il nodo del titolare non ha le azioni del comporre: non si toglie e non si scavalca');
  check(await conta('.wio.usc[data-id="tit"]') === 0, 'e non ha la presa d\'uscita: dopo la firma non c\'è altro lavoro');
  check(await conta('.wio.ent[data-id="inn"]') === 0, 'l\'innesco non ha la presa d\'entrata: prima di lui non c\'è lavoro');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&nodo=inn&tendina=chiusa')); await page.waitForTimeout(300);
  check((await txt('.wnode.inn .campi')).includes('Chiedi prima di'), 'l\'innesco aperto porta il **permesso** (la clausola della decisione 66): ' + await txt('.wnode.inn .campi'));
  await page.click('[data-az="ramo-clausola"]'); await page.waitForTimeout(250);
  check((await txt('.wnode.inn .campi')).includes('Fai pure') || (await txt('.wnode.inn .campi')).includes('Chiedi prima di partire'), 'e il permesso si cambia dal canvas');

  console.log('\n21. i rami che non escono dall\'azienda si dicono, non si vietano');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  check(await conta('.wcanvas .wtag') === 0, 'con la catena di partenza tutto arriva alla firma: nessun avviso');
  const arcoUlt = await page.evaluate(() => { const a = [...document.querySelectorAll('path.presa')].find(x => x.dataset.a === 'tit'); return a ? a.dataset.arco : ''; });
  await page.evaluate(id => document.querySelector('.warcz .wdel[data-arco="' + id + '"]').click(), arcoUlt); await page.waitForTimeout(280);
  check(await conta('.wcanvas .wtag') === 1, 'staccando l\'ultimo collegamento il ramo non arriva più alla firma, e la pagina lo **dice**: ' + await txt('.wcanvas .wtag'));
  check((await txt('.wsc')).includes('resta in azienda'), 'e il conto in cima lo ripete: ' + await txt('.wsc'));

  console.log('\n22. i numeri dell\'ultima volta sono avvenuti, non previsti (difetto della versione 20)');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&tendina=chiusa')); await page.waitForTimeout(300);
  const piedi = await page.evaluate(() => [...document.querySelectorAll('.wnode .ft')].map(e => e.textContent.replace(/\\s+/g, ' ').trim()));
  check(!piedi.some(t => /0 €/.test(t)), 'nessun nodo stampa «0 €»: uno zero su un passo che non è successo sarebbe inventato (' + piedi.filter(t => /€/.test(t)).join(' · ') + ')');
  check(piedi.filter(t => /non ancora/.test(t)).length >= 4, 'i passi ancora da fare dicono «non ancora» e la stima con il ≈, non un costo misurato');
  const numeri = await page.evaluate(() => {
    const m = DGT_DATI.modello(11);
    return m.workflowDi(null).map(w => ({ id: w.id, costo: w.costo, minuti: w.minuti, previsto: w.previsto,
      somma: Math.round(10 * w.nodi.filter(n => n.stato !== 'da fare' && !n.titolare).reduce((t, n) => t + n.costo, 0)) / 10,
      zeri: w.nodi.filter(n => n.stato === 'da fare' && n.costo !== 0).length }));
  });
  check(numeri.every(w => w.costo === w.somma), 'il costo di un workflow è la somma dei soli passi **avvenuti**');
  check(numeri.every(w => w.zeri === 0), 'e un passo da fare non porta più il costo stimato dentro il nodo');
  check(numeri.some(w => w.previsto > 0), 'la stima non è sparita: sta in un campo suo (`previsto`), separata dal misurato — ' + numeri.map(w => w.id + ': ' + w.costo + ' € avvenuti, ' + w.previsto + ' € previsti').slice(0, 3).join(' · '));

  /* ---- 23. il telefono porta il canvas vero (versione 27, decisioni 72-74) ----
     Questa sezione contava la colonna: la card che prendeva tutta la larghezza, una per riga, e i chip che
     dicevano la topologia. La colonna è caduta con la decisione 72, e con lei le sue asserzioni. Al suo posto si
     misura quello che la decisione ha promesso, e ognuna delle righe qui sotto è un numero, non un'impressione:
     che sia **lo stesso** canvas della Console (le stesse classi), che i gesti del comporre siano **spenti**,
     che si entri a «tutto dentro» con il grafo che tocca tutti e due i fianchi, che il tocco su un nodo porti a
     scala 1 centrato su quello, e — la più importante — che le posizioni dei nodi **non si muovano mai**
     (regola 42: sono dati del titolare, non una disposizione da rifare per far stare il disegno nello schermo). */
  console.log('\n23. il telefono: il canvas vero, in sola lettura, e lo scatto d\'ingresso');
  await page.goto(tel('schermata=10&dip=svi&workflow=w1&ramo=1')); await page.waitForTimeout(450);
  const cv0 = await page.evaluate(() => {
    const cv = document.querySelector('.wcanvas'), zl = cv.querySelector('.wzoom');
    const r = cv.getBoundingClientRect(), s = r.width / cv.offsetWidth;
    const nodi = [...cv.querySelectorAll('.wnode')].map(n => n.getBoundingClientRect());
    return { vista: +cv.dataset.vista, zoom: +cv.dataset.zoom, pan: +cv.dataset.pan,
      largoCSS: cv.offsetWidth, zlW: zl.offsetWidth, altezza: cv.offsetHeight, s,
      sinistra: +(Math.min(...nodi.map(n => n.left)) - r.left).toFixed(1),
      destra: +(Math.max(...nodi.map(n => n.right)) - r.left).toFixed(1), largoSchermo: +r.width.toFixed(1) };
  });
  check(Math.abs(cv0.vista - 278.4) < 0.6, 'la colonna del telefono misura 278,4 px, il numero su cui è scelto lo scatto d\'ingresso (' + cv0.vista + ')');
  check(Math.abs(cv0.zoom - 278.4 / 910) < 0.002, 'si entra a «tutto dentro»: 278,4 / 910 = 0,306 (' + cv0.zoom.toFixed(4) + ')');
  check(cv0.sinistra <= 0.6 && Math.abs(cv0.destra - cv0.largoSchermo) < 0.6, 'e «tutto dentro» vuol dire tutto: il grafo tocca tutti e due i fianchi (' + cv0.sinistra + ' → ' + cv0.destra + ' su ' + cv0.largoSchermo + ')');
  check(cv0.zlW === 1008, 'la cornice che si scala resta larga 1008 px come nella Console: quello che cambia è da quanto lontano la si guarda, non il disegno');
  check(await conta('.m-scr[data-schermata="10"] .wnode') === 9, 'nove nodi: l\'innesco, i sette passi e la firma');
  check(await conta('.m-scr[data-schermata="10"] .wnode.inn') === 1, 'la prossima volta comincia dall\'innesco, come nella Console');
  check(await conta('.m-scr[data-schermata="10"] svg.edges path.arc') === 8, 'e gli otto collegamenti sono le curve luminose del riferimento, non barrette dritte');
  /* La sola lettura: cinque gesti spenti, contati uno per uno. */
  const spenti = await page.evaluate(() => ({
    prese: document.querySelectorAll('.wcanvas .wio').length,
    piu: document.querySelectorAll('.wcanvas .wplus').length,
    ics: document.querySelectorAll('.wcanvas .wdel').length,
    trascina: document.querySelectorAll('.wcanvas .wnode.presa').length,
    riordina: document.querySelectorAll('[data-az="ramo-riordina"]').length,
    aggiungi: document.querySelectorAll('[data-az="ramo-aggiungi"]').length,
    tipo: document.querySelectorAll('[data-az="ramo-tipo"]').length,
    comp: document.querySelectorAll('.wcanvas.comp').length, sl: document.querySelectorAll('.wcanvas.sl').length,
  }));
  check(spenti.prese === 0 && spenti.piu === 0 && spenti.ics === 0, 'sola lettura: niente prese, niente «+» sull\'arco, niente «×» (' + spenti.prese + ', ' + spenti.piu + ', ' + spenti.ics + ')');
  check(spenti.trascina === 0 && spenti.riordina === 0 && spenti.aggiungi === 0 && spenti.tipo === 0, 'e niente trascinamento del nodo, «Riordina», «Aggiungi» o cambio di significato sul collegamento');
  check(spenti.comp === 0 && spenti.sl === 1, 'il canvas si dichiara: «.sl» e non «.comp» — è un interruttore, non un secondo disegno');
  /* Le etichette del contratto (decisione 74): stanno fuori dal canvas, quindi non si rimpiccioliscono con lui. */
  const cont74 = await page.evaluate(() => {
    const s = [...document.querySelectorAll('.m-wcon .chip')];
    return { n: s.length, testi: s.map(c => c.textContent.trim()), px: s.length ? parseFloat(getComputedStyle(s[0]).fontSize) : 0,
      dentro: s.filter(c => c.closest('.wcanvas')).length };
  });
  check(cont74.n >= 1 && cont74.dentro === 0, 'il contratto è scritto fuori dal canvas: non si rimpicciolisce con lo zoom (' + cont74.n + ' etichette)');
  check(cont74.px >= 10, 'e si legge davvero: ' + cont74.px + ' px, non i 4,3 px che avrebbe dentro il disegno a 0,306');
  check(cont74.testi.join(' ').includes('firma'), 'e dice la firma, che è il contratto: «' + cont74.testi.join(' · ') + '»');
  check(await conta('.m-wcon .chip:has-text("2 rami")') === 0, 'la topologia invece non si scrive più: «2 rami» e «arriva da 2» adesso sono disegno');
  /* Il tocco su un nodo: scala 1, centrato su quello. */
  const prima42 = await page.evaluate(() => [...document.querySelectorAll('.wcanvas .wnode')].map(n => n.dataset.id + ':' + n.offsetLeft + ',' + n.offsetTop).join(' '));
  await page.click('.wnode[data-id="p3"]', { force: true }); await page.waitForTimeout(300);
  const dopoTocco = await page.evaluate(() => {
    const cv = document.querySelector('.wcanvas'), on = cv.querySelector('.wnode.on'), r = cv.getBoundingClientRect();
    const a = on.getBoundingClientRect();
    return { zoom: +cv.dataset.zoom, id: on.dataset.id, campi: on.querySelectorAll('.campi .fv').length,
      fuoriCentro: +((a.left + a.width / 2) - (r.left + r.width / 2)).toFixed(1) };
  });
  check(dopoTocco.zoom === 1 && dopoTocco.id === 'p3', 'il tocco su un nodo porta a scala 1 su quel nodo (decisione 73)');
  check(Math.abs(dopoTocco.fuoriCentro) < 1.5, 'e lo mette al centro della vista (' + dopoTocco.fuoriCentro + ' px dal centro)');
  check(dopoTocco.campi === 3, 'a scala 1 il nodo apre i suoi campi: modello e strumenti, che la colonna diceva in chip');
  /* ---- Regola 42, la riga che conta più di tutte ---- */
  const dopo42 = await page.evaluate(() => [...document.querySelectorAll('.wcanvas .wnode')].map(n => n.dataset.id + ':' + n.offsetLeft + ',' + n.offsetTop).join(' '));
  check(prima42 === dopo42, 'regola 42: dopo lo zoom le posizioni dei nodi sono **le stesse**, al pixel — sono dati del titolare, non una disposizione da rifare');
  const scorri = await page.evaluate(() => {
    const cv = document.querySelector('.wcanvas'), z = +cv.dataset.zoom;
    return Math.round(1008 * z - cv.offsetWidth);
  });
  check(scorri === 730, 'e il prezzo accettato si vede in faccia: a scala 1 il disegno esce di 730 px dalla cornice, e si raggiunge trascinando (' + scorri + ')');
  await page.click('.wnode[data-id="p3"]', { force: true }); await page.waitForTimeout(300);
  const tornato = await page.evaluate(() => +document.querySelector('.wcanvas').dataset.zoom);
  check(Math.abs(tornato - 278.4 / 910) < 0.002, 'toccare di nuovo lo stesso nodo rimette tutto dentro: è la strada di ritorno, e non è nascosta');
  /* Lo zoom vale su tutte e due le tab (decisione 72), non solo sulla prossima volta. */
  await page.click('.m-wtabs .pill[data-v="0"]'); await page.waitForTimeout(350);
  check(await conta('.m-wtabs .pill') === 2, 'la schermata 10 ha le due tab della Console: le stesse due parole');
  const ultima = await page.evaluate(() => {
    const cv = document.querySelector('.wcanvas');
    return { zoom: +cv.dataset.zoom, barra: cv.querySelectorAll('.wzoombar').length, nodi: cv.querySelectorAll('.wnode').length };
  });
  check(ultima.barra === 1 && Math.abs(ultima.zoom - 278.4 / 910) < 0.002, 'anche «L\'ultima volta» si ingrandisce e entra a «tutto dentro»: fino alla 26 era `ramo ? zoom : 1`, cioè metà pagina senza zoom');
  check(ultima.nodi === 8, 'e mostra gli otto nodi avvenuti — i sette passi e il titolare — non i nove dichiarati, che contano anche l\'innesco');
  const euri = await page.evaluate(() => [...document.querySelectorAll('.wcanvas .wnode .eur')].map(e => e.textContent.trim()));
  check(!euri.includes('0 €'), 'nessun nodo stampa «0 €»: era lo zero inventato del telefono (' + (euri.join(' · ') || 'nessun costo stampato') + ')');
  const latoTel = await page.evaluate(() => [...document.querySelectorAll('.m-scroll')].every(s => s.scrollWidth <= s.clientWidth));
  check(latoTel, 'e lo schermo non scorre di lato in nessuno di questi stati');

  /* ---- 24. i tre freni valgono anche per il permesso in testa (decisione 71, 2026-09-09) ----
     La revisione incrociata della versione 24 aveva trovato che la clausola dell'innesco faceva uscire le
     consegne senza nessuno dei tre freni che la firma anticipata dichiara — e che «Fai pure» li prometteva
     gia' nella sua descrizione. La decisione dell'utente: gli stessi tre freni.
     Attenzione al caso: nel grafo di partenza OGNI nodo arriva al titolare, quindi non esiste un ramo
     terminale e i due conti sono zero contro zero. Un confronto fra zeri non prova niente: qui il ramo
     terminale si crea prima, col gesto vero (si tira dalla presa e si rilascia nel vuoto). */
  await page.goto(file('pagina=workflow&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(400);
  const fr = await page.evaluate(() => {
    const m = DGT_DATI.modello(11), w = m.workflowIdDi('w1');
    const r = m.ramoDi(w), inn = r.nodi.find(n => n.innesco);
    const padre = r.nodi.find(n => !n.innesco && !n.titolare);
    m.ramoNuovo(w, padre.id, 700, 400);
    const o = { terminali: m.ramoTerminali(w).filter(n => !n.titolare).length };
    ['uscita', 'avvio', 'libera'].forEach(cl => {
      inn.clausola = cl;
      const e = m.ramoEsce(w);
      o[cl] = { fuori: e.fuori.length, esce: e.anticipata.length, freni: e.freni.length, da: m.ramoRegime(w).da };
    });
    o.nomi = m.ramoFreni(w).map(f => f.id).join(',');
    return o;
  });
  check(fr.terminali === 1, 'il rilascio nel vuoto crea un ramo che non arriva al titolare (' + fr.terminali + '): senza, i due conti sarebbero zero contro zero e non proverebbero niente');
  check(fr.uscita.fuori === 1 && fr.uscita.esce === 0, 'con «chiedi prima di consegnare» quel ramo RESTA in azienda');
  check(fr.avvio.esce === 1 && fr.avvio.fuori === 0, 'con «chiedi prima di partire» lo stesso ramo ESCE senza passare dalla coda');
  check(fr.libera.esce === 1, 'e con «fai pure» anche');
  check(fr.avvio.freni === 3 && fr.libera.freni === 3, 'e in tutti e due i casi porta i tre freni (' + fr.avvio.freni + ' e ' + fr.libera.freni + '): prima erano zero, ed era la seconda strada per spegnere la firma');
  check(fr.nomi === 'soglia,perimetro,scadenza', 'i tre freni sono quelli della firma anticipata, dalla stessa funzione (' + fr.nomi + ')');
  check(fr.avvio.da === 'clausola' && fr.libera.da === 'clausola', 'e il regime dice che a firmare e\' il permesso, non la pillola');

  /* Lo stesso, disegnato: il gesto vero sulla pagina, non il modello. */
  const presa = page.locator('.wio.usc').nth(1);
  const bp = await presa.boundingBox();
  await page.mouse.move(bp.x + bp.width / 2, bp.y + bp.height / 2);
  await page.mouse.down(); await page.mouse.move(bp.x + 260, bp.y + 250, { steps: 12 }); await page.mouse.up();
  await page.waitForTimeout(350);
  const tagPrima = await page.locator('.wtag').allTextContents();
  check(tagPrima.some(x => /resta in azienda/.test(x)), 'sul canvas il ramo nuovo dice «resta in azienda»');
  await page.click('.wnode.inn'); await page.waitForTimeout(250);
  await page.click('[data-az="ramo-clausola"]'); await page.waitForTimeout(350);
  const tagDopo = await page.locator('.wtag').allTextContents();
  check(tagDopo.some(x => /esce senza la tua firma/.test(x)), 'cambiato il permesso lo stesso ramo dice «esce senza la tua firma»: prima il canvas taceva, ed era il posto dove serviva di piu\'');
  const cima = await page.locator('.wsc').first().innerText();
  check(/senza la tua firma/.test(cima), 'e la riga in cima lo conta (' + cima.replace(/\n/g, ' · ') + ')');
  const sezF = await page.locator('section').filter({ hasText: 'La firma anticipata' }).first().innerText();
  check(/Dal permesso/.test(sezF), 'la sezione della firma dice che a firmare e\' il permesso, anche con la pillola spenta');
  check(/tre freni/.test(sezF), 'e dice entro che cosa');
  check(await conta('.wfirma .fcard') === 3, 'i tre freni restano disegnati con ogni permesso');

  /* Il difetto trovato disegnando la 71: il rilascio nel vuoto posava il passo **sopra** un altro nodo, e con
     lui il suo tag. Il gesto gemello (il «+» sul connettore) la spinta giu' ce l'aveva gia': adesso ce l'hanno
     tutti e due. Si contano le coppie di nodi sovrapposti, escluso il nodo aperto — che e' l'editor e copre
     per mestiere. */
  const sovr = await page.evaluate(() => {
    const nod = [...document.querySelectorAll('.wnode:not(.on)')].map(t => t.getBoundingClientRect());
    let n = 0;
    for (let i = 0; i < nod.length; i++) for (let j = i + 1; j < nod.length; j++) {
      const a = nod[i], b = nod[j];
      if (!(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom)) n++;
    }
    return n;
  });
  check(sovr === 0, 'e il passo nato dal rilascio non si posa sopra un altro nodo (' + sovr + ' coppie sovrapposte): prima ne copriva due, e con loro il proprio tag');
  const largTag = await page.evaluate(() => [...document.querySelectorAll('.wtag')].map(t => Math.round(t.getBoundingClientRect().width)));
  check(largTag.every(x => x <= 208), 'e il tag sta dentro la larghezza del nodo (' + largTag.join(', ') + ' su 208): misurato, non stimato');

  /* E sul telefono, che e\' il posto da cui il titolare firma davvero. */
  await page.goto(tel('schermata=10&dip=svi&workflow=w1&ramo=1')); await page.waitForTimeout(500);
  const telFreni = await page.evaluate(() => [...document.querySelectorAll('.m-coda .qrow .tx b')].map(e => e.textContent.trim()));
  check(telFreni.some(x => /^Soglia /.test(x)), 'il telefono legge i tre freni dalla stessa funzione della Console (' + telFreni.slice(0, 4).join(' · ') + ')');
  const latoF = await page.evaluate(() => [...document.querySelectorAll('.m-scroll')].every(s => s.scrollWidth <= s.clientWidth));
  check(latoF, 'e lo schermo non scorre di lato');

  /* ---- 25. i due gesti touch, e il canvas che è uno solo (versione 27, decisioni 72-73) ----
     **Prima di oggi nel repository non c'era nessun ascoltatore `touch` o `pointer`**: era tutto mouse, perché
     fino alla 26 sul telefono non c'era niente da spostare. Adesso ce ne sono due, e vanno provati col gesto
     vero — un tocco simulato che parte, si muove e si stacca — non guardando se la funzione esiste.
     I gesti si costruiscono con `TouchEvent` invece che con `page.touchscreen`, perché il pinch vuole **due**
     dita insieme e la scorciatoia di Playwright ne muove una sola. */
  console.log('\n25. i due gesti del dito: trascina-la-vista e pinch');
  const ctxT = await browser.newContext({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'reduce', hasTouch: true });
  const pt = await ctxT.newPage();
  await pt.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  pt.on('pageerror', e => errors.push(e.message)); pt.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const gesto = (tipo, punti) => pt.evaluate(({ tipo, punti }) => {
    const cv = document.querySelector('.wcanvas');
    const ts = punti.map((q, i) => new Touch({ identifier: i, target: cv, clientX: q[0], clientY: q[1] }));
    cv.dispatchEvent(new TouchEvent(tipo, { bubbles: true, cancelable: true, touches: ts, targetTouches: ts, changedTouches: ts }));
  }, { tipo, punti });
  const statoT = () => pt.evaluate(() => {
    const cv = document.querySelector('.wcanvas');
    return { zoom: +cv.dataset.zoom, pan: +cv.dataset.pan, alt: cv.offsetHeight,
      pos: [...cv.querySelectorAll('.wnode')].map(n => n.dataset.id + ':' + n.offsetLeft + ',' + n.offsetTop).join(' ') };
  });
  await pt.goto(tel('schermata=10&dip=svi&workflow=w1&ramo=1&nodo=p3')); await pt.waitForTimeout(450);
  const t0 = await statoT();
  check(t0.zoom === 1, 'la schermata si apre a scala 1 sul nodo chiesto dall\'indirizzo (?nodo=p3)');
  const box = await pt.locator('.wcanvas').boundingBox();
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
  /* Primo gesto: un dito che va a destra di 160 px di schermo. I telefoni stanno dentro `zoom:1.25`, quindi nel
     disegno sono 128 px: se il conto non dividesse per la scala della cornice, la vista correrebbe più del dito —
     ed è l'errore che questa riga prende. Si tira **verso destra** apposta: aperti su `p3`, che è il nodo più a
     destra del grafo, dall'altra parte la vista è già in fondo alla sua corsa e misurerebbe lo stringimento
     invece del gesto. */
  await gesto('touchstart', [[cx, cy]]); await gesto('touchmove', [[cx + 60, cy]]); await gesto('touchmove', [[cx + 160, cy]]);
  await gesto('touchend', [[cx + 160, cy]]); await pt.waitForTimeout(250);
  const t1 = await statoT();
  check(Math.abs((t1.pan - t0.pan) - 128) < 3, 'trascina-la-vista: 160 px di dito muovono la vista di 128 px di disegno, cioè 160 / 1,25 (' + Math.round(t1.pan - t0.pan) + ')');
  check(t1.zoom === t0.zoom, 'e trascinare non cambia l\'ingrandimento');
  check(t1.pos === t0.pos, 'regola 42: trascinando la vista i nodi **non si spostano** — si sposta quello che si guarda, non il disegno');
  /* Un dito in verticale non è un gesto del canvas: è la pagina che scorre, e il canvas non se ne appropria. */
  const t1b = await statoT();
  await gesto('touchstart', [[cx, cy]]); await gesto('touchmove', [[cx, cy - 120]]); await gesto('touchend', [[cx, cy - 120]]);
  await pt.waitForTimeout(200);
  check((await statoT()).pan === t1b.pan, 'un dito in su non muove la vista: il verticale resta della pagina (è `touch-action:pan-y`)');
  /* Secondo gesto: due dita che si avvicinano da 120 a 40 px, cioè un terzo. */
  await gesto('touchstart', [[cx - 60, cy], [cx + 60, cy]]);
  await gesto('touchmove', [[cx - 20, cy], [cx + 20, cy]]); await gesto('touchend', []);
  await pt.waitForTimeout(250);
  const t2 = await statoT();
  check(Math.abs(t2.zoom - 1 / 3) < 0.02, 'pinch: due dita che si avvicinano a un terzo portano l\'ingrandimento a un terzo (' + t2.zoom.toFixed(3) + ')');
  check(t2.alt < t1.alt, 'e la card si abbassa con lui: l\'altezza è `basso × zoom`, quindi in verticale non resta mai niente fuori dalla cornice (' + t1.alt + ' → ' + t2.alt + ' px)');
  check(t2.pos === t0.pos, 'regola 42 di nuovo: nemmeno il pinch tocca le posizioni');
  /* Il fondo dell'ingrandimento è «tutto dentro»: sotto non c'è disegno, c'è vuoto. */
  await gesto('touchstart', [[cx - 90, cy], [cx + 90, cy]]);
  await gesto('touchmove', [[cx - 4, cy], [cx + 4, cy]]); await gesto('touchend', []);
  await pt.waitForTimeout(250);
  const t3 = await statoT();
  check(Math.abs(t3.zoom - 278.4 / 910) < 0.002, 'e non si scende sotto «tutto dentro»: più in là non c\'è disegno da vedere (' + t3.zoom.toFixed(4) + ')');
  console.log('\n27. il conto dell\'altezza combacia con la resa anche in sola lettura');
  const scarti = [];
  for (const nid of ['p1', 'p3', 'inn', 'tit']) {
    await pt.goto(tel('schermata=10&dip=svi&workflow=w1&ramo=1&nodo=' + nid)); await pt.waitForTimeout(320);
    const q = await pt.evaluate(() => {
      const on = document.querySelector('.wnode.on'); if (!on) return null;
      const C = window.DGT_COMPONENTI;
      return { reso: +(on.getBoundingClientRect().height / 1.25).toFixed(1) };
    });
    if (q) scarti.push(nid + ':' + q.reso);
  }
  check(scarti.length === 4, 'i quattro nodi si aprono anche sul telefono (' + scarti.join(' ') + ')');
  const altezzeTel = scarti.map(s => +s.split(':')[1]);
  check(Math.max(...altezzeTel) === 263.4, 'e in sola lettura il nodo aperto è alto 263,4 px, non 311: la riga delle azioni non c\'è, e adesso il conto lo sa (' + Math.max(...altezzeTel) + ')');

  await ctxT.close();

  /* ---- 26. il canvas è uno solo, e adesso vive in componenti.js ---- */
  console.log('\n26. un canvas solo: la Console e il telefono chiamano la stessa funzione');
  await page.goto(file('pagina=workflow&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(400);
  const dove = await page.evaluate(() => ({
    inComponenti: typeof DGT_COMPONENTI.canvasWorkflow === 'function',
    misure: typeof DGT_COMPONENTI.canvasMisure === 'function' && typeof DGT_COMPONENTI.canvasTuttoDentro === 'function',
    cssCanvas: [...document.querySelectorAll('style')].filter(s => s.id === 'css-componenti' && s.textContent.includes('.wcanvas')).length,
    cssConsole: [...document.querySelectorAll('style')].filter(s => s.id === 'css-a' && s.textContent.includes('.wnode{')).length,
  }));
  check(dove.inComponenti && dove.misure, 'il canvas e le sue misure stanno in DGT_COMPONENTI: il telefono lo prende da lì, non da una copia');
  check(dove.cssCanvas === 1 && dove.cssConsole === 0, 'e anche il suo CSS si è spostato con lui: sta nel foglio dei componenti, non più in quello della Console');
  /* Lo zoom sulle due tab, nella Console (decisione 72): fino alla 26 «L'ultima volta» era `ramo ? zoom : 1`. */
  await page.click('.wtabs .pill[data-v="0"]'); await page.waitForTimeout(350);
  const ult27 = await page.evaluate(() => ({ barra: document.querySelectorAll('.wzoombar').length, zoom: +document.querySelector('.wcanvas').dataset.zoom }));
  check(ult27.barra === 1 && ult27.zoom === 1, '«L\'ultima volta» ha la sua barra dello zoom: prima era la metà di pagina senza zoom né mappa');
  await page.click('.wzoombar [data-v="piu"]'); await page.waitForTimeout(300);
  const ing = await page.evaluate(() => {
    const cv = document.querySelector('.wcanvas');
    return { zoom: +cv.dataset.zoom, mappa: cv.querySelectorAll('.wmini').length, largoNodo: Math.round(cv.querySelector('.wnode').getBoundingClientRect().width) };
  });
  check(ing.zoom === 1.25 && ing.largoNodo === 260, 'e si ingrandisce davvero: 208 px di nodo diventano 260 a 1,25x (' + ing.largoNodo + ')');
  check(ing.mappa === 1, 'con la mini-mappa, che compare quando c\'è qualcosa fuori dalla cornice — anche qui, adesso');
  const prima42c = await page.evaluate(() => [...document.querySelectorAll('.wnode')].map(n => n.offsetLeft + ',' + n.offsetTop).join(' '));
  await page.click('.wzoombar [data-v="uno"]'); await page.waitForTimeout(300);
  const dopo42c = await page.evaluate(() => [...document.querySelectorAll('.wnode')].map(n => n.offsetLeft + ',' + n.offsetTop).join(' '));
  check(prima42c === dopo42c, 'e nemmeno nella Console lo zoom sposta un nodo di un pixel');

  /* ================= versione 29: il nodo aperto non copre piu' quello sotto ================= */
  console.log('\n28. il passo di riga a 342, e il nodo aperto che non copre più nessuno');
  await page.setViewportSize({ width: 1440, height: 1100 });
  let apCopre = 0, apScontri = 0, apStati = 0, altoMax = 0;
  for (const n of ['11', '40']) {
    await page.goto(file('n=' + n + '&pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(200);
    const wids = await page.evaluate(() => [...document.querySelectorAll('[data-az="workflow"]')].map(e => e.dataset.id));
    for (const wid of wids.slice(0, 3)) {
      await page.goto(file('n=' + n + '&pagina=workflow&dip=svi&workflow=' + wid + '&ramo=1&tendina=chiusa')); await page.waitForTimeout(200);
      const ids = await page.evaluate(() => [...document.querySelectorAll('.wnode')].map(e => e.dataset.id));
      for (const nid of ids) {
        await page.goto(file('n=' + n + '&pagina=workflow&dip=svi&workflow=' + wid + '&ramo=1&nodo=' + nid + '&tendina=chiusa'));
        await page.waitForTimeout(50);
        const r = await page.evaluate(() => {
          const on = document.querySelector('.wnode.on'); if (!on) return null;
          const A = on.getBoundingClientRect();
          const ov = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5;
          let c = 0; document.querySelectorAll('.wnode:not(.on)').forEach(e => { if (ov(A, e.getBoundingClientRect())) c++; });
          const L = [...document.querySelectorAll('.wplab')].map(e => e.getBoundingClientRect());
          let s = 0; for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) if (ov(L[i], L[j])) s++;
          return { c, s, h: Math.round(A.height) };
        });
        if (!r) continue;
        apStati++; apCopre += r.c; apScontri += r.s; altoMax = Math.max(altoMax, r.h);
      }
    }
  }
  check(apStati >= 30, 'provati ' + apStati + ' nodi aperti, su sei workflow e due taglie');
  check(apCopre === 0, 'il nodo aperto non copre nessun altro nodo: era 5 su 9, con 3 coperti per intero (' + apCopre + ')');
  check(apScontri === 0, 'e nessuna etichetta di porta si sovrappone a un\'altra: erano 5 scontri da 6 px (' + apScontri + ')');
  check(altoMax === 311, 'il nodo aperto più alto resta 311 px: si è mosso il passo, non il nodo (' + altoMax + ')');

  console.log('\n29. le porte del nodo aperto, e quello che sta sotto la sua card');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  const porteChiuse = await conta('.wport');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&nodo=p3&tendina=chiusa')); await page.waitForTimeout(300);
  const porteAperto = await conta('.wport');
  check(porteChiuse === 16 && porteAperto === 13, 'aprendo un nodo le sue tre porte non si stampano: sono la prima parola tagliata dei campi che la card mostra per esteso (' + porteChiuse + ' → ' + porteAperto + ')');
  /* La verifica giusta e' **posizionale**, non sulle parole: le etichette di porta di un nodo stanno al centro di
     `x + 34 + 62k`, quindi si riconosce a chi appartengono senza indovinare. Nessuna deve essere del nodo aperto. */
  const sue = await page.evaluate(() => {
    const zw = document.querySelector('.wzoom').getBoundingClientRect();
    const on = document.querySelector('.wnode.on'); const A = on.getBoundingClientRect();
    const x0 = A.left - zw.left, y0 = A.top - zw.top;
    /* La sola x non basta: i nodi della stessa **colonna** la condividono (p3 e p7 stanno tutti e due a 738).
       L'etichetta di un nodo sta al centro di `x + 34 + 62k` **e** a `y + 104`: servono tutte e due. */
    return [...document.querySelectorAll('.wplab')].filter(e => { const q = e.getBoundingClientRect();
      const d = (q.left - zw.left) + q.width / 2 - 34 - x0;
      const dy = (q.top - zw.top) - (y0 + 104);
      return d > -1.5 && d < 190 && Math.abs(d - Math.round(d / 62) * 62) < 1.5 && Math.abs(dy) < 1.5; }).length;
  });
  check(sue === 0, 'e nessuna delle etichette rimaste appartiene al nodo aperto (' + sue + ')');

  /* Il caso vero della copertura, dalla 29 in poi: non lo produce piu' il prodotto, lo produce la mano. Si
     stringono due nodi trascinando, e si verifica che sotto la card non resti niente di cliccabile. */
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  await canvasInVista();
  const b7 = await scatolaDi('.wnode[data-id="p7"]');
  const b3 = await scatolaDi('.wnode[data-id="p3"]');
  await page.mouse.move(b7.x + 100, b7.y + 20); await page.mouse.down();
  await page.mouse.move(b7.x + 100, b3.y + 20 + 108, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(250);
  await page.click('.wnode[data-id="p3"]', { force: true }); await page.waitForTimeout(300);
  const sotto = await page.evaluate(() => {
    const on = document.querySelector('.wnode.on'); if (!on) return { err: 1 };
    const A = on.getBoundingClientRect();
    const dentro = e => { const q = e.getBoundingClientRect(); const cx = q.left + q.width / 2, cy = q.top + q.height / 2;
      return cx > A.left - 1 && cx < A.right + 1 && cy > A.top && cy < A.bottom; };
    const vivo = e => { const q = e.getBoundingClientRect(); const t2 = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
      return t2 === e || e.contains(t2); };
    const coperti = [...document.querySelectorAll('.wnode:not(.on)')].filter(e => {
      const q = e.getBoundingClientRect();
      return Math.min(A.right, q.right) - Math.max(A.left, q.left) > 0.5 && Math.min(A.bottom, q.bottom) - Math.max(A.top, q.top) > 0.5;
    }).length;
    /* le prese del nodo **aperto** stanno dentro la sua stessa card ed e' giusto che restino: la card e' sua.
       Quelle che non devono restare sono quelle di un nodo che lui nasconde. */
    const mio = on.dataset.id;
    const preseVive = [...document.querySelectorAll('.wio')].filter(e => e.dataset.id !== mio && dentro(e) && vivo(e)).length;
    const tagSopra = [...document.querySelectorAll('.wtag')].filter(dentro).length;
    const labSopra = [...document.querySelectorAll('.wplab')].filter(dentro).length;
    return { coperti, preseVive, tagSopra, labSopra };
  });
  check(sotto.coperti > 0, 'trascinando un nodo sotto un altro la copertura si può ancora fare: le posizioni restano del titolare (' + sotto.coperti + ' coperto)');
  check(sotto.preseVive === 0, 'ma nessuna presa di un nodo nascosto resta cliccabile sopra la card: prima ce n\'erano due, e da lì nasceva un collegamento da un nodo che non si vede (' + sotto.preseVive + ')');
  check(sotto.tagSopra === 0 && sotto.labSopra === 0, 'e sulla card non finisce nessun tag né etichetta di un nodo che nasconde (' + sotto.tagSopra + '/' + sotto.labSopra + ')');

  console.log('\n30. il passo nuovo nasce sulla griglia, e non sotto la card che lo ha creato');
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&nodo=p3&tendina=chiusa')); await page.waitForTimeout(300);
  const primaAgg = await page.evaluate(() => document.querySelectorAll('.wnode').length);
  await page.click('.wnode.on [data-az="ramo-aggiungi"]'); await page.waitForTimeout(350);
  const nato = await page.evaluate(() => {
    const q = [...document.querySelectorAll('.wnode')];
    const nuovo = q.find(e => (e.querySelector('.tt b') || {}).textContent === 'Passo nuovo');
    if (!nuovo) return { err: 1 };
    const zw = document.querySelector('.wzoom').getBoundingClientRect();
    const b = nuovo.getBoundingClientRect();
    const y = Math.round(b.top - zw.top), x = Math.round(b.left - zw.left);
    return { x, y, n: q.length, grigliaX: x % 18, grigliaY: y % 18 };
  });
  check(nato.n === primaAgg + 1, 'il «+» dentro il nodo aperto crea un passo (' + primaAgg + ' → ' + nato.n + ')');
  check(nato.grigliaX === 0 && nato.grigliaY === 0, 'e nasce **sui punti della griglia** da 18 px: era a +210, che multiplo di 18 non è (' + nato.x + ',' + nato.y + ')');
  check(nato.y >= 36 + 342, 'e un passo di riga più in basso del suo riferimento, non sotto la card che lo ha creato (y ' + nato.y + ')');

  /* ---- Il freno sa che il passo nuovo nasce **aperto** (versione 29) ----
     I tre gesti che creano un passo lo lasciano aperto (`st.nodo` diventa il suo id), ma il freno misurava il
     nodo **chiuso**: 87 + 18. Misurato prima della correzione: il «+» sull'arco posava un passo che, aperto, ne
     copriva **due**; il «+» dentro l'innesco copriva il nodo del **titolare**. Adesso il posto e' libero solo se
     ci sta la card aperta (273 px per un passo appena nato), e si verifica sui tre gesti. */
  let natiCoprono = 0, natiProvati = 0, natoPiuLontano = 0;
  for (const nid of ['inn', 'p1', 'p2', 'p3']) {
    for (const modo of ['dentro', 'arco']) {
      await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&nodo=' + nid + '&tendina=chiusa')); await page.waitForTimeout(260);
      await canvasInVista();
      let creato = false;
      if (modo === 'dentro') { await page.click('.wnode.on [data-az="ramo-aggiungi"]', { force: true }); creato = true; }
      else {
        creato = await page.evaluate(() => { const e = [...document.querySelectorAll('.wplus')].find(x => {
            const q = x.getBoundingClientRect(); const t2 = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2);
            return t2 === x || x.contains(t2); });
          if (e) { e.click(); return true; } return false; });
      }
      if (!creato) continue;
      await page.waitForTimeout(300);
      const q = await page.evaluate(() => {
        const tutti = [...document.querySelectorAll('.wnode')];
        const nuovo = tutti.find(e => (e.querySelector('.tt b') || {}).textContent === 'Passo nuovo');
        if (!nuovo) return null;
        const B = nuovo.getBoundingClientRect();
        const zw = document.querySelector('.wzoom').getBoundingClientRect();
        const copre = tutti.filter(e => e !== nuovo).filter(e => { const A = e.getBoundingClientRect();
          return Math.min(A.right, B.right) - Math.max(A.left, B.left) > 0.5 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 0.5; }).length;
        return { copre, y: Math.round(B.top - zw.top), aperto: nuovo.classList.contains('on') };
      });
      if (!q) continue;
      natiProvati++; natiCoprono += q.copre; natoPiuLontano = Math.max(natoPiuLontano, q.y);
    }
  }
  check(natiProvati >= 6, 'provati ' + natiProvati + ' modi di creare un passo, con un nodo già aperto');
  check(natiCoprono === 0, 'il passo appena nato — che nasce **aperto** — non ne copre nessun altro: il freno misura la card aperta, non il nodo chiuso (' + natiCoprono + ')');
  /* Il prezzo, dichiarato: il posto libero si cerca scendendo di 36 px alla volta, quindi con un grafo fitto il
     passo nuovo puo' nascere lontano da dove si e' premuto. Il numero sta qui perche' si veda, non per farlo passare. */
  check(natoPiuLontano <= 900, 'e il più lontano nasce a y ' + natoPiuLontano + ': il posto libero si cerca scendendo, e con un grafo fitto è lontano da dove hai premuto');

  /* ================= versione 30: il prodotto se ne accorge e lo propone ================= */
  /* il contesto del telefono di prima e' stato chiuso: se ne apre uno per l'ultima verifica */
  const ctxT2 = await browser.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const pt2 = await ctxT2.newPage();
  await pt2.route('https://fonts.googleapis.com/**', r => r.fulfill({ status: 200, contentType: 'text/css', body: css }));
  console.log('\n31. la pillola che dice che due nodi si coprono, e «Riordina» che la chiude');
  await page.setViewportSize({ width: 1440, height: 1600 });
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(350);
  const rigaCima = () => page.evaluate(() => ({
    testi: [...document.querySelectorAll('.wsc .chip')].map(e => e.textContent.trim()),
    cliccabili: document.querySelectorAll('.wsc .chip[data-az]').length,
    largo: Math.round([...document.querySelectorAll('.wsc .chip')].reduce((s, e) => s + e.getBoundingClientRect().width + 6, -6)),
  }));
  const c0 = await rigaCima();
  check(c0.cliccabili === 0, 'su un disegno disposto dal prodotto la pillola non c\'è: col passo a 342 non c\'è niente da dire (' + c0.cliccabili + ')');
  check(c0.testi.every(x => !/copr/.test(x)), 'e la riga in cima resta quella dei fatti del grafo: ' + JSON.stringify(c0.testi));

  /* il caso vero: lo crea la mano del titolare, non il prodotto */
  await canvasInVista();
  const q7 = await scatolaDi('.wnode[data-id="p7"]');
  const q3 = await scatolaDi('.wnode[data-id="p3"]');
  await page.mouse.move(q7.x + 100, q7.y + 20); await page.mouse.down();
  await page.mouse.move(q7.x + 100, q3.y + 20 + 108, { steps: 10 }); await page.mouse.up(); await page.waitForTimeout(280);
  await page.keyboard.press('Escape'); await page.waitForTimeout(250);
  const c1 = await rigaCima();
  check(c1.cliccabili === 1, 'stringendo due nodi a mano la pillola compare, ed è l\'unica della riga che si clicca (' + c1.cliccabili + ')');
  check(/^1 nodo ne copre un altro quando lo apri · Riordina$/.test(c1.testi[0]), 'e dice il fatto al singolare, in «nodi» e non in «passi» — perché il coperto può essere l\'innesco o la tua firma: «' + c1.testi[0] + '»');
  check(c1.largo <= 992, 'la riga in cima ci sta: ' + c1.largo + ' px sui 992 utili');
  const tinte = await page.evaluate(() => {
    const vai = document.querySelector('.wsc .chip.vai');
    const altra = document.querySelector('.wsc .chip:not(.vai)');
    return { vai: getComputedStyle(vai).color, altra: getComputedStyle(altra).color, cursore: getComputedStyle(vai).cursor };
  });
  check(tinte.vai === 'rgb(184, 252, 100)' && tinte.vai !== tinte.altra && tinte.cursore === 'pointer',
    'e si distingue dai referti con l\'accento, non con un colore nuovo: ' + tinte.vai + ' contro ' + tinte.altra);

  /* ---- Nessuna variabile CSS usata e mai definita ----
     Questa prova nasce da un errore vero: la pillola era scritta `color:var(--t1)`, e `--t1` **non esiste** in
     tutto il repository — esistono `--t2` e `--t2-light`. Senza valore di ripiego il colore cadeva
     sull'ereditato, quindi la pillola era identica alle altre e non si vedeva che era l'unica da cliccare.
     Un errore muto: nessun avviso, nessuna prova rossa, solo un disegno che non fa quello che dice. */
  const varMancanti = await page.evaluate(() => {
    const testo = [...document.querySelectorAll('style')].map(e => e.textContent).join('\n');
    /* Le definizioni stanno nei fogli **e** negli attributi `style` degli elementi (il canvas ne scrive parecchie). */
    const inline = [...document.querySelectorAll('[style]')].map(e => e.getAttribute('style')).join(';');
    const definite = new Set(((testo + ';' + inline).match(/--[a-zA-Z0-9-]+\s*:/g) || []).map(s => s.replace(/\s*:$/, '')));
    /* Si guardano solo gli usi **senza valore di ripiego**: `var(--x,1)` dichiara da sé che --x può mancare,
       `var(--x)` no — e se manca, il valore cade sull'ereditato in silenzio. È il caso di `--t1`. */
    const senzaRipiego = new Set((testo.match(/var\(\s*--[a-zA-Z0-9-]+\s*\)/g) || [])
      .map(s => s.replace(/var\(\s*/, '').replace(/\s*\)$/, '')));
    return [...senzaRipiego].filter(v => !definite.has(v));
  });
  check(varMancanti.length === 0, 'nessuna variabile CSS usata **senza valore di ripiego** e mai definita: quelle cadono sull\'ereditato in silenzio (' + (varMancanti.join(', ') || 'zero') + ')');

  /* i numeri dei passi **prima** di premere: è la cosa che «Riordina» non deve toccare */
  const numeriPrima = await page.evaluate(() => { const o = {}; document.querySelectorAll('.wnode').forEach(e => {
    o[e.dataset.id] = ((e.querySelector('.tt span') || {}).textContent || '').split(' · ')[0]; }); return o; });
  const archiPrima = await page.evaluate(() => [...document.querySelectorAll('path.arc')].map(e => e.dataset.da + '→' + e.dataset.a).sort().join(','));
  await page.click('.wsc .chip[data-az="ramo-riordina"]'); await page.waitForTimeout(400);
  const c2 = await rigaCima();
  check(c2.cliccabili === 0, 'premendola, «Riordina» rimette i nodi sulla griglia e la copertura sparisce (' + c2.cliccabili + ')');
  const numeriDopo = await page.evaluate(() => { const o = {}; document.querySelectorAll('.wnode').forEach(e => {
    o[e.dataset.id] = ((e.querySelector('.tt span') || {}).textContent || '').split(' · ')[0]; }); return o; });
  const archiDopo = await page.evaluate(() => [...document.querySelectorAll('path.arc')].map(e => e.dataset.da + '→' + e.dataset.a).sort().join(','));
  check(JSON.stringify(numeriPrima) === JSON.stringify(numeriDopo), '«Riordina» non tocca i numeri dei passi: prima lo faceva, e Passo 1 diventava Passo 2 a cascata su tutti e sette');
  check(archiPrima === archiDopo, 'e non tocca nessun collegamento: sposta il disegno, non il flusso');

  /* la rinumerazione, verificata dove nasce: l'innesco non e' un passo */
  await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&tendina=chiusa')); await page.waitForTimeout(300);
  const n1 = await page.evaluate(() => [...document.querySelectorAll('.wnode')].map(e => ((e.querySelector('.tt span') || {}).textContent || '').split(' · ')[0]).join('|'));
  await page.click('[data-az="ramo-riordina"]'); await page.waitForTimeout(350);
  const n2 = await page.evaluate(() => [...document.querySelectorAll('.wnode')].map(e => ((e.querySelector('.tt span') || {}).textContent || '').split(' · ')[0]).join('|'));
  check(n1 === n2, 'e su un grafo intonso premere «Riordina» non cambia una parola: l\'innesco non è un passo, e non ruba più il numero 1');
  check(/Passo 1\|Passo 2\|Passo 3\|Passo 4\|Passo 5\|Passo 6\|Passo 7/.test(n2), 'i sette passi si chiamano da 1 a 7, come dice la barra («l\'innesco, 7 passi e la tua firma»)');

  /* sul telefono la pillola non c'e', ed e' voluto */
  await pt2.goto(tel('schermata=10&dip=svi&workflow=w1&ramo=1')); await pt2.waitForTimeout(400);
  const telFin = await pt2.evaluate(() => ({ wsc: document.querySelectorAll('.wsc').length,
    contratto: [...document.querySelectorAll('.m-wcon .chip')].map(e => e.textContent.trim()) }));
  check(telFin.wsc === 0, 'sul telefono la riga in cima non c\'è, quindi nemmeno la pillola: lì non si trascina, e non c\'è «Riordina» da premere');
  check(telFin.contratto.length >= 1, 'e la striscia del telefono resta quella del contratto, senza faccende di disposizione accanto: ' + JSON.stringify(telFin.contratto));

  if (!errors.length) ok++; else ko++;
  console.log('\n' + ok + ' ok, ' + ko + ' ko');
  await browser.close();
  process.exit(ko ? 1 : 0);
})();
