// Prova cliccata delle sei conferme della versione 22: la pagina Routine (conferma e), la pillola «Uscita» al posto
// di «Approvata» (b), la precedenza fra la clausola di una routine e una regola d'azienda (c), la regola g4 accesa
// con il suo conto (d) e l'intestazione a due righe dentro la banda riservata (f).
// Sta in un file suo per la stessa ragione di workflow.js: console.js sceglie tre sezioni con nth-of-type, e ogni
// sezione nuova le sposta. Qui non c'è nessun indice di sezione da rompere.
// Uso (da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/routine.js
const path = require('path'), fs = require('fs');

const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const vis = require('./visibile.js');
const file = q => 'file://' + path.resolve(__dirname, '../direzione-a.html') + (q ? '?' + q : '');
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
  const vai = async q => { await page.goto(file(q)); await page.waitForTimeout(300); };
  const alto = () => page.evaluate(() => document.documentElement.scrollHeight);
  const modello = (n, f) => page.evaluate(([nn, ff]) => eval('(' + ff + ')')(window.DGT_DATI.modello(nn)), [n, f.toString()]);

  console.log('1. conferma b: «Uscita», non «Approvata», quando non l\'ha approvata il titolare');
  await vai('pagina=richieste&tendina=chiusa');
  /* Tre richieste del modello sono uscite senza il titolare (r8 per una regola, r16 e r17 per una routine).
     Prima dicevano tutte e tre «Approvata», e il participio era l'affermazione principale della riga: la pillola
     diceva una cosa falsa mentre l'autore vero stava in fondo, in grigio, in coda alla riga. */
  const usc = await page.evaluate(() => [...document.querySelectorAll('.hrow')].filter(el => /Uscita/.test(el.textContent)).length);
  const app = await page.evaluate(() => [...document.querySelectorAll('.hrow')].filter(el => /Approvata/.test(el.textContent)).length);
  check(usc === 3, 'tre righe dicono «Uscita»: sono le tre uscite senza la firma del titolare (' + usc + ')');
  check(app === 9, 'le altre nove dicono «Approvata», e quelle il titolare le ha approvate davvero (' + app + ')');
  const limeSuUscita = await page.evaluate(() => [...document.querySelectorAll('.hrow')].filter(el => /Uscita/.test(el.textContent)).filter(el => !![...el.querySelectorAll('.chip.lime')].find(c => /Uscita/.test(c.textContent))).length);
  check(limeSuUscita === 0, 'e nessuna porta il lime: il lime è la firma del titolare e non si presta ad altro');
  /* la consegna: la stessa frase, nella sua pagina */
  const idCons = await modello(11, m => { const c = m.consegneDi(null, 'mese').find(c => { const r = c.richiesta ? m.richieste.find(x => x.id === c.richiesta) : null; return r && r.deciso; }); return c ? c.id : ''; });
  check(!!idCons, 'nel modello c\'è una consegna di una richiesta decisa senza il titolare: ' + idCons);
  await vai('pagina=consegna&consegna=' + idCons + '&tendina=chiusa');
  const fr = await txt('.etesta .adesso');
  check(/Uscita senza la tua firma/.test(fr), 'e la sua pagina dice «Uscita senza la tua firma», non «Approvata dal titolare»');
  check(/routine/.test(fr), 'dicendo anche chi l\'ha decisa al posto suo');

  console.log('\n2. conferma c: la precedenza — una routine esegue, non decide');
  /* La regola d'azienda attiva vince sulla clausola della routine, e la clausola può solo stringere. Scritta la
     precedenza, il modello mostra i casi che la violano: a undici nessuno, a quaranta due (un post e una lista
     verso clienti veri, usciti da una routine mentre g1 dice «Sempre da approvare»). Non si corregge il dato di
     nascosto: la riga lo dice e questa prova ne fissa il conto. */
  for (const [n, atteso] of [[11, 0], [40, 2]]) {
    const c = await modello(n, m => m.richieste.filter(r => m.contrastoDi(r)).map(r => r.id + '→' + m.contrastoDi(r).id));
    check(c.length === atteso, 'a ' + n + ' i contrasti fra una routine e una regola «Sempre da approvare» sono ' + atteso + ' (' + JSON.stringify(c) + ')');
  }
  await vai('n=40&pagina=richieste&tendina=chiusa');
  /* `.chip.rosa` lo porta anche «Rifiutata»: il contrasto si conta dal testo, non dalla classe. */
  const contro = await page.evaluate(() => [...document.querySelectorAll('.hrow .chip.rosa')].filter(c => /^contro /.test(c.textContent.trim())).length);
  check(contro === 2, 'e a quaranta la pagina li segna tutti e due, in pillola rosa (' + contro + ')');
  const testoContro = await page.evaluate(() => { const c = [...document.querySelectorAll('.hrow .chip.rosa')].find(c => /^contro /.test(c.textContent.trim())); return c ? c.textContent.trim() : ''; });
  check(/^contro /.test(testoContro), 'la pillola dice contro quale regola: «' + testoContro + '»');
  const soloSuUscite = await page.evaluate(() => [...document.querySelectorAll('.hrow')]
    .filter(r => [...r.querySelectorAll('.chip.rosa')].some(c => /^contro /.test(c.textContent.trim())))
    .every(r => /Uscita/.test(r.textContent)));
  check(soloSuUscite, 'e sta solo su righe che dicono «Uscita»: un contrasto è per definizione una cosa uscita senza firma');
  /* ogni richiesta è governata da una regola sola, e la somma torna: nessuna scoperta, nessuna contata due volte */
  for (const n of [11, 40]) {
    /* Versione 32: il conto si fa sulle **uscite**. La richiesta del tetto non è un'uscita verso un cliente — è una
       decisione sull'azienda — e nessuna regola d'approvazione la governa: senza questa distinzione cadrebbe su
       «Report interni: automatica», e la pagina Richieste stamperebbe che un rendiconto governa il tetto di spesa. */
    const r = await modello(n, m => ({ tot: m.richieste.filter(x => x.tipo !== 'tetto').length, tetto: m.richieste.filter(x => x.tipo === 'tetto').length, somma: m.regole.reduce((t, g) => t + m.contaRegola(g), 0), senza: m.richieste.filter(x => x.tipo !== 'tetto' && !m.regolaPer(x)).length }));
    check(r.somma === r.tot && r.senza === 0, 'a ' + n + ' ogni uscita ha una regola e una sola: ' + r.somma + ' su ' + r.tot);
    check(r.tetto === 1, 'e la richiesta del tetto non ne ha nessuna, perché non è un\'uscita: è una decisione sull\'azienda');
  }

  console.log('\n3. conferma d: g4 accesa, e il numero che dice che cosa trattiene');
  for (const n of [11, 40]) {
    const g = await modello(n, m => m.regole.map(x => ({ id: x.id, attiva: x.attiva, conta: m.contaRegola(x) })));
    check(g.every(x => x.attiva), 'a ' + n + ' tutte e quattro le regole sono accese: nessuna card spenta che finge di essere una regola');
    check(g.find(x => x.id === 'g4').conta === 0, 'e «Spese sopra 50 €» ne governa zero: la consegna più cara del modello costa 33,80 € e la soglia sta a 50');
  }
  await vai('pagina=richieste&tendina=chiusa');
  const gov = await page.evaluate(() => [...document.querySelectorAll('.regole .ncard')].map(e => (e.textContent.match(/Governa(\d+)/) || [])[1]));
  check(gov.join(',') === '13,4,3,0', 'la card di ogni regola stampa il suo conto: ' + gov.join(', '));
  check(await conta('.regole .ncard .chip.rosa') === 1, 'e lo zero è in rosa: accenderla non trattiene niente finché la soglia resta a 50 €');
  check(await conta('.regole .ncard.spenta') === 0, 'nessuna card spenta in pagina');

  console.log('\n4. conferma e: la pagina delle routine — fuori dal rail, dentro le due strade che già c\'erano');
  await vai('pagina=routine&tendina=chiusa');
  check(await txt('.a-title') === 'ROUTINE', 'l\'elenco si apre e si chiama «Routine»');
  check(await conta('.crow[data-az="routine"]') === 3, 'tre righe: le routine dell\'azienda sono tre, non otto');
  check(await conta('.a-rail .rb') === 6, 'il rail resta a sei cerchi: con tre voci non ne merita un settimo');
  /* la strada 1: il nome nella colonna «chi ha deciso» dello storico, che dalla versione 21 era testo morto */
  await vai('pagina=richieste&tendina=chiusa');
  const righeRt = await conta('.hrow[data-az="routine"]');
  check(righeRt === 2, 'nello storico due righe portano alla loro routine (' + righeRt + ')');
  await page.locator('.hrow[data-az="routine"]').first().click(); await page.waitForTimeout(300);
  check(await conta('.a-main > section') === 4, 'e la routine si apre nella sua pagina, a quattro sezioni');
  const passi = await conta('.a-main > section:nth-of-type(2) .crow');
  check(passi === 3, 'i passi dichiarati sono tre: due nomi più la firma del titolare (' + passi + ')');
  check(/non ancora misurato/.test(await txt('.a-main > section:nth-of-type(2) .crow .chip')), 'e dicono di non essere misurati: la routine dichiara, non misura');
  check(/non se l\'è ancora guadagnato/.test(await txt('.etesta .adesso')), 'la testata dice che il «fai pure» non se l\'è guadagnato: 1 richiesta su 3 di rodaggio');
  check(/vince sulla clausola/.test(await txt('.etesta .adesso')), 'e che la regola d\'azienda vince sulla clausola (conferma c, scritta dove si legge)');
  /* la strada 2: la pillola nell'intestazione del Dipartimento, accanto a quella dei workflow */
  await vai('pagina=dipartimento&dip=amm&tendina=chiusa');
  check(await conta('.shead [data-az="routine"]') === 1, 'il Dipartimento ha la pillola «Routine» accanto a quella «Workflow»');
  check(/Il lavoro avvenuto/.test(await page.locator('.shead [data-az="pagina"][data-pagina="workflow"]').first().getAttribute('title')), 'e la pillola dei workflow adesso dice «avvenuto»: il dichiarato è la routine');
  await page.locator('.shead [data-az="routine"]').first().click(); await page.waitForTimeout(300);
  check(await txt('.a-title') === 'ROUTINE', 'e porta all\'elenco');
  /* la routine con un workflow lo mostra, quelle senza dicono perché non ce l'hanno */
  await vai('pagina=routine&routine=rt3&tendina=chiusa');
  check(await conta('[data-az="workflow"]') === 1, 'rt3 «Fatture ricorrenti» ha un workflow e la pagina ci porta');
  await vai('pagina=routine&routine=rt1&tendina=chiusa');
  check(await conta('[data-az="workflow"]') === 0, 'rt1 non ce l\'ha, e nessuna freccia lo promette (regola 26)');
  check(/non esiste ancora un workflow/.test(await txt('.a-main > section:nth-of-type(2) .adesso')), 'la pagina dice perché: il dipendente è pianificato, zero passi conclusi');

  console.log('\n5. conferma f: l\'intestazione a due righe, dentro la banda riservata');
  /* Il difetto dichiarato della versione 21: `.a-head` arrivava a x 1414 e i suoi ultimi numeri — cliccabili —
     nascevano sotto la tendina aperta. Adesso sta nei 1008 px della colonna, su ogni pagina e a tutte e due le
     taglie, e sotto la tendina non nasce più niente. */
  const PAGINE = ['', 'pagina=richieste', 'pagina=dipartimento&dip=svi', 'pagina=dipendente&id=4', 'pagina=esecuzione&id=4',
    'pagina=costi', 'pagina=agenda', 'pagina=chat', 'pagina=consegna&consegna=c1-0', 'pagina=workflow&workflow=w1',
    'pagina=routine', 'pagina=routine&routine=rt1'];
  let sforo = 0, coperti = 0, aria = [];
  for (const q of PAGINE) {
    for (const n of ['11', '40']) {
      await page.goto(file(q + (q ? '&' : '') + 'n=' + n + '&tendina=aperta')); await page.waitForTimeout(120);
      coperti += (await vis.copertiIntestazione(page)).length;
      const g = await page.evaluate(() => {
        const h = document.querySelector('.a-head').getBoundingClientRect(), mn = document.querySelector('.a-main').getBoundingClientRect();
        return { dx: Math.round(h.right), aria: Math.round(mn.top - (h.top + h.height)) };
      });
      if (g.dx > 1110) sforo++;
      aria.push(g.aria);
    }
  }
  check(sforo === 0, 'su ' + (PAGINE.length * 2) + ' pagine per due taglie l\'intestazione non esce mai dalla banda (sfori: ' + sforo + ')');
  check(coperti === 0, 'e nessuno dei suoi numeri nasce sotto la tendina aperta: erano 4 (' + coperti + ')');
  check(Math.min(...aria) >= 64, 'l\'aria fra intestazione e prima sezione non scende sotto i 64 px di prima (minimo ' + Math.min(...aria) + ')');
  /* il prezzo, misurato e non stimato: la stima diceva 64 px, la misura ne dice 68 */
  await vai('pagina=dipartimento&dip=svi&tendina=chiusa');
  check(await alto() === 3396, 'Sviluppo è alta 3 396 px: i 3 198 di prima più i 198 della card della richiesta del tetto (' + await alto() + ')');
  await vai('tendina=chiusa');
  check(await alto() === 2388, 'la home 2 388: 2 320 più gli stessi 68 (' + await alto() + ')');

  console.log('\n6. niente si è rotto attorno');
  for (const n of ['11', '40']) {
    await page.goto(file('n=' + n + '&pagina=routine&tendina=aperta')); await page.waitForTimeout(200);
    check((await vis.coperti(page)).length === 0, 'a ' + n + ' nessun controllo della pagina Routine nasce sotto la tendina');
    check((await vis.muti(page)).length === 0, 'a ' + n + ' nessun controllo della pagina Routine sta in un contenitore che non scorre');
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), 'a ' + n + ' la pagina Routine non scorre di lato');
    const rotti = await vis.riferimentiRotti(page);
    check(rotti.length === 0, 'a ' + n + ' nessun riferimento rotto (' + rotti.length + ')');
  }
  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})();
