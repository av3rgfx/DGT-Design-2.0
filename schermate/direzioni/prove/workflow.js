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
  check(g.mappa === 0, 'e la mini-mappa non c\'è: il grafo si vede tutto, non c\'è niente da non vedere');
  const raggio = await page.evaluate(() => getComputedStyle(document.querySelector('.wnode.inn')).borderTopLeftRadius);
  check(parseInt(raggio, 10) >= 36, 'il nodo d\'innesco ha il fianco arrotondato, come il trigger di n8n (' + raggio + ')');

  console.log('\n13. il trascinamento: 1 px del canvas = zoom px di schermo, a ogni larghezza');
  const scatolaDi = sel => page.locator(sel).first().boundingBox();
  let esatti = 0, agganci = 0;
  for (const [W, zo] of [[1440, '1'], [1920, '1'], [1024, '1'], [1440, '1.5'], [1440, '0.6']]) {
    await page.setViewportSize({ width: W, height: 1100 });
    await page.goto(file('pagina=workflow&dip=svi&workflow=w1&ramo=1&zoom=' + zo + '&tendina=chiusa')); await page.waitForTimeout(300);
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

  console.log('\n23. il telefono: la colonna legge il grafo, e i rami non si affiancano');
  await page.goto(tel('schermata=10&dip=svi&workflow=w1')); await page.waitForTimeout(400);
  const larghezze = await page.evaluate(() => ({
    colonna: Math.round(document.querySelector('.m-wf').getBoundingClientRect().width),
    card: Math.round(document.querySelector('.m-wn').getBoundingClientRect().width),
    perRiga: (() => { const c = [...document.querySelectorAll('.m-wn')].map(e => Math.round(e.getBoundingClientRect().top)); return Math.max(...Object.values(c.reduce((o, y) => { o[y] = (o[y] || 0) + 1; return o; }, {}))); })(),
  }));
  check(larghezze.card >= larghezze.colonna - 2, 'una card prende tutta la colonna (' + larghezze.card + ' su ' + larghezze.colonna + '): due rami non si affiancano, mai');
  check(larghezze.perRiga === 1, 'e infatti c\'è una card per riga (' + larghezze.perRiga + ')');
  const euri = await page.evaluate(() => [...document.querySelectorAll('.m-wn .eur')].map(e => e.textContent.trim()));
  check(!euri.includes('0 €'), 'e nessuna card stampa «0 €»: era lo zero inventato del telefono (' + euri.join(' · ') + ')');
  check(await conta('.m-wtabs .pill') === 2, 'la schermata 10 ha le due tab della Console: le stesse due parole');
  await page.click('.m-wtabs .pill[data-v="1"]'); await page.waitForTimeout(350);
  check(await conta('.m-wn.inn') === 1, 'la prossima volta si guarda anche dal telefono, e comincia dall\'innesco');
  check(await conta('.m-wn') === 9, 'nove card: l\'innesco, i sette passi e la firma (' + await conta('.m-wn') + ')');
  const latoTel = await page.evaluate(() => [...document.querySelectorAll('.m-scroll')].every(s => s.scrollWidth <= s.clientWidth));
  check(latoTel, 'e nessuno schermo scorre di lato');

  if (!errors.length) ok++; else ko++;
  console.log('\n' + ok + ' ok, ' + ko + ' ko');
  await browser.close();
  process.exit(ko ? 1 : 0);
})();
