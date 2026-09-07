// Prova cliccata della Console (direzione A): le tendine del titolare, la pagina Richieste, l'editor del dipendente, le azioni dell'esecuzione, quaranta, la barra «Oggi in azienda», le frecce di riga e (versione 19) le consegne del dipartimento.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/console.js
const path = require('path'), fs = require('fs');

// Font locali: LOCAL_FONT_CSS (vedi design-system/tools/fetch-fonts.py); Playwright globale: PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
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
  const titolo = () => txt('.a-title');
  const vai = async (q, ms) => { await page.goto(file(q)); await page.waitForTimeout(ms || 400); };
  const clic = async (sel, ms) => { await page.click(sel); await page.waitForTimeout(ms || 250); };
  const largo = () => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  /* Il selettore di una sezione dal suo titolo. Gli indici `nth-of-type` si spostano appena si aggiunge una sezione
     (successo con «Consegne di oggi», versione 19: tre prove rosse per niente), quindi non si indovinano: si cercano. */
  const sez = async re => page.evaluate(re => {
    const i = [...document.querySelectorAll('.a-main section')].findIndex(s => new RegExp(re).test(((s.querySelector('h3') || {}).textContent || '').trim()));
    return i < 0 ? null : '.a-main section:nth-of-type(' + (i + 1) + ')';
  }, re);
  /* il modello della pagina (`modello` in direzione-a.html): le richieste in attesa nell'ordine della tendina (le più vecchie prima) */
  const inAttesa = () => page.evaluate(() => modello.richiesteDi('attesa').slice().sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min)).map(r => ({ id: r.id, tipo: r.tipo, cosa: r.cosa })));
  const richiesta = id => page.evaluate(id => { const r = modello.richieste.find(x => x.id === id); return { stato: r.stato, commento: r.commento || '' }; }, id);
  const logTitolare = () => page.locator('.lrow.titolare').allTextContents().then(a => a.map(t => t.replace(/\s+/g, ' ').trim()));

  console.log('1. la tendina del titolare: approva, apri la revisione ed estendi, rifiuta con motivo, riduci, riepilogo, chiudi');
  await vai('');
  check(await conta('.a-tend.aperta') === 1 && await conta('.appr') === 1, 'la tendina è aperta all\'apertura, con la richiesta corrente');
  let coda = await inAttesa(); console.log('    in attesa:', coda.map(r => r.cosa).join(' | '));
  check(coda.length === 4 && await conta('.a-tend .qrow[data-az="vai"]') === 4, 'quattro richieste in attesa, quattro righe in coda');
  check((await txt('.a-tend')).includes(coda[0].cosa), 'la richiesta corrente è la più vecchia: ' + coda[0].cosa);
  await clic('.appr [data-az="approva"]');
  check((await richiesta(coda[0].id)).stato === 'approvata', 'approva dalla tendina: la prima richiesta è approvata');
  coda = await inAttesa();
  check(coda.length === 3 && await conta('.a-tend.aperta') === 1, 'tre in attesa, la tendina resta aperta sulla successiva');
  const iRev = coda.findIndex(r => r.tipo === 'revisione');
  check(iRev >= 0, 'in coda c\'è una revisione di performance');
  await clic(`.a-tend .qrow[data-az="vai"][data-idx="${iRev}"]`);
  check(await conta(`.a-tend .qrow.on[data-idx="${iRev}"]`) === 1, 'la riga della revisione diventa la corrente');
  await clic('.a-tend [data-az="espandi"]');
  check(await conta('.a-tend.estesa') === 1, 'la tendina si estende');
  check(await conta('.a-tend.estesa .cmp .doc') === 2, 'le due versioni a confronto');
  await clic('.a-tend.estesa [data-az="rifiuta-motivo"]');
  check(await conta('input[data-campo="motivo"]') === 1 && await page.evaluate(() => document.activeElement && document.activeElement.dataset.campo === 'motivo'), 'rifiuta: il campo del motivo appare con il fuoco');
  await clic('[data-az="rifiuta-conferma"]');
  check((await richiesta(coda[iRev].id)).stato === 'attesa', 'conferma vuota: la revisione resta in attesa');
  check(await page.evaluate(() => document.querySelector('input[data-campo="motivo"]').style.borderColor !== ''), 'il campo si segna in rosso');
  await page.fill('input[data-campo="motivo"]', 'Prima una prova più lunga'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const rif = await richiesta(coda[iRev].id);
  check(rif.stato === 'rifiutata' && rif.commento === 'Prima una prova più lunga', 'motivo + Invio: rifiutata con il motivo');
  check(await conta('.a-tend.estesa') === 1, 'la tendina resta estesa sulla richiesta successiva (comportamento della Console)');
  await clic('.a-tend [data-az="riduci"]');
  check(await conta('.a-tend.aperta') === 1 && await conta('.a-tend.estesa') === 0, 'riduci: tendina aperta');
  await clic('.a-tend [data-az="pannello"][data-pannello="riepilogo"]');
  check(await conta('.a-tend .dcard') === 3 && (await txt('.a-tend')).includes('Obiettivo del mese'), 'il Riepilogo di oggi: tre card');
  await clic('.a-tend [data-az="chiudi"]');
  check(await conta('.a-tend') === 0 && await conta('.a-mini') === 2, 'chiudi: le due pillole sul bordo');
  check(await txt('.a-mini b') === '2', 'la pillola conta le due richieste rimaste');
  await clic('.a-mini[data-pannello="richieste"]');
  check(await conta('.a-tend.aperta') === 1, 'la pillola riapre la tendina');
  check(await largo(), 'nessuno sforo orizzontale');

  console.log('2. la pagina Richieste: filtri e «Approva tutte»');
  await vai('pagina=richieste&tendina=chiusa');
  check(await titolo() === 'RICHIESTE', 'titolo RICHIESTE');
  const righe = await conta('.hrow');
  check(await conta('.task[data-az="richiesta"]') === 4 && await conta('.hrow') === 16, 'quattro card lime da approvare in cima, sedici righe decise nello storico');
  await clic('[data-az="filtro"][data-k="tipo"][data-v="post"]');
  check((await txt('.fsum')).includes('1 filtro attivo') && await conta('.hrow') < righe, 'filtro per tipo: un filtro attivo, meno righe');
  await clic('[data-az="azzera"]');
  check((await txt('.fsum')).includes('nessun filtro') && await conta('.hrow') === righe, 'azzera: nessun filtro, tutte le righe');
  await clic('[data-az="approva-tutte"]');
  check((await inAttesa()).length === 0 && await conta('.task[data-az="richiesta"]') === 0 && await conta('.hrow') === 20, '«Approva tutte»: nessuna card in attesa, venti righe nello storico');
  check(await txt('.a-mini b') === '0', 'la pillola sul bordo dice 0');

  console.log('3. l\'editor del dipendente: crea, modifica, tinta');
  await vai('pagina=dipartimento&dip=svi&tendina=chiusa');
  const nDip = await page.evaluate(() => modello.dipendenti.length);
  await clic('.lead.add[data-az="nuovo"]');
  check(await conta('.a-tend.dip') === 1, 'la card «Aggiungi» apre la tendina Dipendente');
  check(await page.evaluate(() => document.activeElement && document.activeElement.dataset.campo === 'ruolo'), 'il fuoco è sul ruolo');
  check(await conta('.a-tend.dip .pill.on[data-k="dip"][data-v="svi"]') === 1, 'il dipartimento proposto è quello della pagina (Sviluppo)');
  await clic('.a-tend.dip [data-az="salva"]');
  check(await page.evaluate(() => modello.dipendenti.length) === nDip && await conta('.a-tend.dip') === 1, 'senza ruolo non salva');
  check(await page.evaluate(() => document.querySelector('input[data-campo="ruolo"]').style.borderColor !== ''), 'il campo del ruolo si segna in rosso');
  await page.fill('input[data-campo="ruolo"]', 'Analista dati'); await page.waitForTimeout(250);
  check(await txt('#a-anteprima .name') === 'Analista dati', 'l\'anteprima segue il ruolo');
  await clic('.a-tend.dip [data-az="bozza"][data-k="dip"][data-v="mkt"]');
  check(await txt('#a-anteprima .role') === 'Marketing', 'l\'anteprima segue il dipartimento');
  check(await conta('.tinte .dot') === 8, 'otto tinte');
  await clic('.tinte .dot[data-v="prugna"]');
  check(await conta('.tinte .dot.on[data-v="prugna"]') === 1, 'la tinta scelta si segna');
  await clic('.a-tend.dip [data-az="salva"]');
  const nuovo = await page.evaluate(() => { const e = modello.dipendenti[modello.dipendenti.length - 1]; return { id: e.id, nome: e.nome, ruolo: e.ruolo, dip: e.dip, tinta: e.tinta }; });
  check(await page.evaluate(() => modello.dipendenti.length) === nDip + 1 && nuovo.ruolo === 'Analista dati' && nuovo.dip === 'mkt' && nuovo.tinta === 'prugna', 'salva: un dipendente in più con ruolo, dipartimento e tinta: ' + JSON.stringify(nuovo));
  check(await conta('.a-tend.dip') === 0, 'l\'editor si chiude');
  await clic('.a-rail [data-pagina="home"]');
  await clic('[data-az="pagina"][data-pagina="dipartimento"][data-dip="mkt"]');
  check(await titolo() === 'MARKETING' && (await page.locator('.cards.dipendenti .lead').allTextContents()).some(t => t.includes('Analista dati')), 'il nuovo dipendente sta fra le card di Marketing');
  await clic(`.lead.dip [data-az="modifica"][data-id="${nuovo.id}"]`);
  check(await conta('.a-tend.dip') === 1 && await page.inputValue('input[data-campo="ruolo"]') === 'Analista dati', 'la matita apre l\'editor sul dipendente');
  await page.fill('input[data-campo="nome"]', 'Vera'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  check(await page.evaluate(id => modello.byId[id].nome, nuovo.id) === 'Vera', 'Invio salva il nome');
  check((await page.locator('.cards.dipendenti .lead').allTextContents()).some(t => t.includes('Vera') && t.includes('Analista dati')), 'la card mostra nome e ruolo');
  await clic(`.lead.dip [data-az="modifica"][data-id="${nuovo.id}"]`);
  await page.fill('input[data-campo="nome"]', 'Zoe'); await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  check(await page.evaluate(id => modello.byId[id].nome, nuovo.id) === 'Vera' && await conta('.a-tend.dip') === 0, 'Esc chiude senza salvare');
  check(await largo(), 'nessuno sforo orizzontale');

  console.log('4. l\'esecuzione: pausa, interrompi, riprova, avvia, nota del titolare');
  await vai('pagina=esecuzione&id=4&tendina=chiusa');
  console.log('    pagina:', await titolo());
  const log0 = await conta('.lrow');
  await clic('[data-az="esec-pausa"]');
  check(await page.evaluate(() => modello.byId[4].pausa === true), 'pausa: il dipendente è in pausa');
  check((await txt('[data-az="esec-pausa"]')).includes('Riprendi') && (await logTitolare()).some(t => t.includes('in pausa')), 'la pillola dice «Riprendi» e la pausa è nel log');
  await clic('[data-az="esec-pausa"]');
  check(await page.evaluate(() => !modello.byId[4].pausa) && (await txt('[data-az="esec-pausa"]')).includes('Metti in pausa'), 'riprendi');
  await clic('[data-az="esec-stop"]');
  check(await page.evaluate(() => modello.byId[4].stato === 'libero'), 'interrompi: il dipendente è libero');
  check((await logTitolare()).some(t => t.includes('interrotto')), 'l\'interruzione è nel log');
  check(await conta('.lrow') === log0 + 3, 'tre voci del titolare in più nel log');
  await vai('pagina=esecuzione&id=3&tendina=chiusa');
  check(await conta('.hrow.passo.errore') === 1 && await conta('[data-az="esec-riprova"]') === 1, 'Kim in errore: un passo in errore e la pillola «Riprova»');
  await clic('[data-az="esec-riprova"]');
  check(await page.evaluate(() => modello.byId[3].stato === 'lavoro') && await conta('.hrow.passo.corso') === 1 && await conta('.hrow.passo.errore') === 0, 'riprova: il passo è in corso, il dipendente al lavoro');
  await vai('pagina=esecuzione&id=2&tendina=chiusa');
  check(await conta('[data-az="esec-avvia"]') === 1, 'Tester QA pianificata: la pillola «Avvia ora»');
  await clic('[data-az="esec-avvia"]');
  check(await page.evaluate(() => modello.byId[2].stato === 'lavoro') && await conta('.hrow.passo.corso') === 1, 'avvia: il primo passo è in corso');
  check((await logTitolare()).some(t => t.includes('avviato')), 'l\'avvio è nel log');
  await page.fill('.chat input', 'Controlla il tono con il cliente'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  check((await logTitolare()).some(t => t.includes('MR: Controlla il tono con il cliente')), 'la nota del titolare entra nel log');
  check(await page.inputValue('.chat input') === '', 'la barra di scrittura si svuota');
  if (await conta('[data-az="filtro-log"][data-v="titolare"]')) {
    await clic('[data-az="filtro-log"][data-v="titolare"]');
    check(await conta('.lrow') === await conta('.lrow.titolare') && await conta('.lrow') === 2, 'il filtro del log «Titolare»: solo le due voci del titolare');
  }
  check(await largo(), 'nessuno sforo orizzontale');

  console.log('5. quaranta');
  await vai('n=40&tendina=chiusa', 600);
  check(await conta('.elenco .erow:not(.add)') === 40 && await conta('.elenco .erow.add') === 1 && await conta('.cards.dipendenti .lead') === 0, 'vista compatta: 40 righe più «Aggiungi», niente card');
  check(await largo(), 'nessuno sforo orizzontale a 40');
  const n40 = (await inAttesa()).length; console.log('    in attesa a 40:', n40);
  await clic('.a-mini[data-pannello="richieste"]');
  check(await conta('.a-tend.aperta') === 1 && await conta('.a-tend .qrow[data-az="vai"]') === n40, 'la tendina a 40 elenca tutta la coda (' + n40 + ')');
  await clic(`.a-tend .qrow[data-az="vai"][data-idx="${n40 - 1}"]`);
  await clic('.a-tend [data-az="espandi"]');
  check(await conta('.a-tend.estesa') === 1, 'l\'ultima della coda si estende');
  await clic('.a-rail [data-pagina="richieste"]');
  check(await titolo() === 'RICHIESTE' && await conta('.task[data-az="richiesta"]') === n40, 'pagina Richieste a 40: ' + n40 + ' card da approvare');
  check(await largo(), 'nessuno sforo orizzontale nella pagina Richieste a 40');

  console.log('6. la barra «Oggi in azienda» (versione 16): le caselle contate, che non ripetono la linguetta, dove portano, la barra dei passi');
  await vai('');
  const barra = () => page.evaluate(() => [...document.querySelectorAll('.a-sched .tl .qua')].map(e => e.textContent.replace(/\s+/g, ' ').trim()));
  const conteggi = () => page.evaluate(() => ({
    lavoro: modello.dipendenti.filter(e => e.stato === 'lavoro').length,
    errore: modello.dipendenti.filter(e => e.stato === 'errore').length,
    piani: modello.dipendenti.filter(e => e.stato === 'pianificato').length,
    attesa: modello.richiesteDi('attesa').length,
    approvate: modello.richieste.filter(r => r.giorno === 0 && r.stato === 'approvata').length }));
  let c = await conteggi(), caselle = await barra();
  console.log('    caselle:', caselle.join(' | '));
  check(caselle.length === 4, 'quattro caselle: approvate, al lavoro, ferme, dopo');
  check(!caselle.some(t => /aspettano te/.test(t)), 'la barra non ripete «da approvare»: lo dice la linguetta lime');
  check(await conta('.a-mini[data-pannello="richieste"], .a-tend.aperta') >= 1, 'la linguetta lime (o la tendina aperta) c\'è sempre');
  check(caselle[0] === c.approvate + 'approvate' && caselle[1].includes(c.lavoro + 'al lavoro'), 'i primi due numeri sono quelli del modello (' + c.approvate + ', ' + c.lavoro + ')');
  check(caselle[2].startsWith(c.errore + 'ferm') && caselle[3].startsWith(c.piani + 'dopo'), 'ferme e dopo sono quelli del modello (' + c.errore + ', ' + c.piani + ')');
  check(await conta('.a-sched .tl .qua.err') === 1, 'la casella di chi è fermo è rosa: la barra di prima non lo diceva');
  check(await conta('.a-sched .tl .now') === 0 && await conta('.a-sched .tl .ev') === 0, 'niente marcatore dell\'ora né blocchi: la barra non finge più una linea del tempo');
  await clic('.a-sched .tl .qua.err');
  check(await titolo().then(t => t.length > 0) && await conta('.etesta .a-sched') === 1, 'la casella rosa apre l\'esecuzione ferma: ' + await titolo());
  await vai('');
  await clic('.a-sched .tl .qua.poi');
  check(await titolo() === 'AGENDA', 'la casella «dopo» apre l\'agenda');
  await vai('');
  await clic('.a-sched .tl .qua:nth-child(1)');
  check(await titolo() === 'RICHIESTE', 'la casella «approvate» apre le richieste');
  /* la barra dei passi dell'Esecuzione: sta dentro la pagina e non taglia niente (prima cresceva a 2180 px su 1440) */
  const pista = () => page.evaluate(() => { const t = document.querySelector('.etesta .a-sched .tl'); return { sforo: t.scrollWidth - t.clientWidth, barra: Math.round(document.querySelector('.etesta .a-sched').getBoundingClientRect().width) }; });
  for (const id of [1, 3, 5, 7]) {
    await vai('pagina=esecuzione&id=' + id);
    const p = await pista();
    check(p.sforo === 0 && p.barra <= 1312, 'esecuzione ' + id + ': la barra dei passi sta nella pagina (' + p.barra + ' px, sforo ' + p.sforo + ')');
  }
  await vai('pagina=esecuzione&id=1');
  check(await conta('.etesta .tl .live') === 1 && (await txt('.etesta .tl .live')).includes('passo 3'), 'il passo in corso resta per esteso nella barra');
  check(await conta('.etesta .tl .ev.resto') === 1, 'i passi da fare oltre i due successivi si contano in una pillola');
  await vai('n=40');
  c = await conteggi(); caselle = await barra();
  console.log('    caselle a 40:', caselle.join(' | '));
  check(caselle.length === 4 && caselle[1].includes(c.lavoro + 'al lavoro') && caselle[3].startsWith(c.piani + 'dopo'), 'a quaranta la barra ha le stesse quattro caselle, con i numeri di quaranta');
  check(await page.evaluate(() => { const t = document.querySelector('.a-sched .tl'); return t.scrollWidth - t.clientWidth; }) === 0, 'a quaranta la barra non sfora');

  console.log('\n8. i controlli delle intestazioni di sezione (versione 17)');
  /* la regola: un controllo si vede solo se fa quello che promette. Nessuna intestazione, su nessuna pagina e a nessuna
     delle due taglie, deve avere un cerchio o una pillola senza azione. */
  const PAGINE = ['', 'pagina=richieste', 'pagina=dipartimento&dip=svi', 'pagina=dipendente&id=4', 'pagina=esecuzione&id=4', 'pagina=esecuzione&id=3', 'pagina=costi', 'pagina=agenda', 'pagina=chat'];
  let sezioni = 0, inerti = 0; const conCerca = new Set();
  for (const n of ['11', '40']) for (const q of PAGINE) {
    await vai(q + '&n=' + n + '&tendina=chiusa');
    const r = await page.evaluate(() => ({
      sez: document.querySelectorAll('.shead').length,
      inerti: document.querySelectorAll('.shead .rb:not([data-az]), .shead .pill:not([data-az])').length,
      cerca: [...document.querySelectorAll('.shead [data-az="cerca"]')].map(e => e.dataset.sez),
    }));
    sezioni += r.sez; inerti += r.inerti; r.cerca.forEach(k => conCerca.add(k));
  }
  check(inerti === 0, 'nessun controllo inerte nelle ' + sezioni + ' intestazioni delle nove pagine, a undici e a quaranta');
  check(conCerca.size === 7, 'il cerchio «cerca» resta in sette sezioni su ventidue (le liste che passano le dodici righe): ' + [...conCerca].sort().join(' '));

  console.log('\n9. la ricerca di una sezione filtra davvero');
  await vai('n=40&tendina=chiusa');
  check(await conta('.cards.dipendenti .ncard.dip, .elenco .erow:not(.add)') === 40, 'a quaranta la sezione Dipendenti mostra tutti i quaranta');
  await clic('[data-az="cerca"][data-sez="home.dipendenti"]');
  check(await conta('input[data-cerca="home.dipendenti"]') === 1, 'il cerchio apre il campo al suo posto');
  await page.fill('input[data-cerca="home.dipendenti"]', 'seo'); await page.waitForTimeout(350);
  const visti = await conta('.cards.dipendenti .ncard.dip, .elenco .erow:not(.add)');
  const attesi = await page.evaluate(() => modello.dipendenti.filter(e => (modello.etichetta(e) + ' ' + modello.sotto(e, true) + ' ' + e.ruolo).toLowerCase().includes('seo')).length);
  check(visti === attesi && visti > 0 && visti < 40, 'la ricerca filtra la sezione: ' + visti + ' di 40');
  check((await txt('.a-main section:nth-of-type(3) .cnt')).startsWith(visti + ' di 40'), 'il contatore della sezione dice «' + visti + ' di 40»');
  check(!(await txt('.a-main section:nth-of-type(3) .shead')).includes(visti + ' di 40' + ' ' + visti + ' di 40'), 'il conto non è scritto due volte nella stessa intestazione');
  check(await page.evaluate(() => document.activeElement && document.activeElement.dataset.cerca === 'home.dipendenti'), 'il fuoco resta nel campo mentre si scrive');
  await page.keyboard.press('Escape'); await page.waitForTimeout(300);
  check(await conta('input[data-cerca="home.dipendenti"]') === 0 && await conta('.cards.dipendenti .ncard.dip, .elenco .erow:not(.add)') === 40, 'Esc chiude la ricerca e la sezione torna intera');

  console.log('\n10. le pillole di una sezione filtrano davvero, e le due forme della card');
  await vai('tendina=chiusa');
  await clic('[data-az="sez"][data-sez="home.dipendenti"][data-v="mkt"]');
  const nMkt = await page.evaluate(() => modello.perDip.mkt.length);
  check(await conta('.cards.dipendenti .ncard.dip') === nMkt, 'la pillola «Marketing» lascia i ' + nMkt + ' del dipartimento');
  await clic('[data-az="forma"][data-v="righe"]');
  check(await conta('.elenco .erow:not(.add)') === nMkt && await conta('.cards.dipendenti') === 0, 'il cerchio «righe» passa alla forma compatta');
  await clic('[data-az="forma"][data-v="card"]');
  check(await conta('.cards.dipendenti .ncard.dip') === nMkt, 'il cerchio «griglia» torna alle card');
  await vai('pagina=dipartimento&dip=svi&tendina=chiusa');
  const sSpesa = await sez('^Spesa');
  const totMese = await txt(sSpesa + ' .cnt b');
  await clic('[data-az="periodo"][data-sez="dip.spesa"][data-v="oggi"]');
  check((await txt(sSpesa + ' h3')) === 'Spesa di oggi' && (await txt(sSpesa + ' .cnt b')) !== totMese, 'le tre pillole della «Spesa del mese» cambiano davvero il periodo: ' + totMese + ' → ' + await txt(sSpesa + ' .cnt b'));
  await clic('[data-az="sez"][data-sez="dip.obiettivi"][data-v="ritardo"]');
  const nRit = await page.evaluate(() => modello.obiettiviDi('svi').filter(o => o.stato === 'ritardo').length);
  check(await conta((await sez('^Obiettivi')) + ' .ncard.obj') === nRit, 'la pillola «In ritardo» degli obiettivi lascia i ' + nRit + ' in ritardo');
  check(await largo(), 'la pagina non scorre di lato dopo i filtri');

  console.log('\n11. le frecce di riga (versione 18, regola 25)');
  /* La freccia resta dove la riga ha una destinazione e sparisce dove non ce l'ha. Qui si conta che di frecce inerti
     non ne resti nessuna in tutto il prodotto, che nessuna riga viva l'abbia persa, e che una lista mista resti
     allineata (le righe con e senza freccia devono avere la stessa griglia). L'unica eccezione dichiarata è la card
     del dipendente in anteprima dentro l'editor: non è un controllo, è il disegno di come verrà la card. */
  const PAG_FRECCE = PAGINE.concat(['pagina=dipendente&id=5', 'pagina=esecuzione&id=5', 'pagina=chat&filo=4', 'pagina=dipartimento&dip=mkt', 'pagina=dipartimento&dip=amm']);
  const VISTE = ['tendina=chiusa', 'tendina=aperta', 'tendina=estesa', 'pannello=riepilogo'];
  const frecce = () => page.evaluate(() => {
    const out = { inerti: 0, vive: 0, dentroEditor: 0, liste: 0, disallineate: [] };
    document.querySelectorAll('svg use').forEach(u => {
      if ((u.getAttribute('href') || '') !== '#i-ne') return;
      const host = u.closest('svg').parentElement;
      if (host.closest('[data-az]')) { out.vive++; return; }
      if (host.closest('.anteprima')) { out.dentroEditor++; return; }
      out.inerti++;
    });
    /* una lista è allineata quando tutte le sue righe hanno la stessa griglia; la riga «Aggiungi» in fondo non è una
       griglia ma una fila centrata (display:flex), quindi non conta */
    document.querySelectorAll('.hlist, .elenco').forEach(l => {
      const righe = [...l.querySelectorAll('.hrow, .crow, .lrow')].filter(r => getComputedStyle(r).display === 'grid');
      if (righe.length < 2) return;
      out.liste++;
      const g = new Set(righe.map(r => getComputedStyle(r).gridTemplateColumns));
      if (g.size > 1) out.disallineate.push(l.parentElement.querySelector('h3') ? l.parentElement.querySelector('h3').textContent : '?');
    });
    return out;
  });
  let inerteF = 0, viveF = 0, listeF = 0, editorF = 0; const disall = [];
  for (const n of ['11', '40']) for (const q of PAG_FRECCE) {
    await vai(q + '&n=' + n + '&tendina=chiusa');
    const r = await frecce(); inerteF += r.inerti; viveF += r.vive; listeF += r.liste; editorF += r.dentroEditor; disall.push(...r.disallineate);
  }
  for (const v of VISTE.concat(['editor=nuovo', 'editor=4'])) {
    await vai(v);
    const r = await frecce(); inerteF += r.inerti; viveF += r.vive; editorF += r.dentroEditor;
  }
  check(inerteF === 0, 'nessuna freccia inerte in tutto il prodotto (' + viveF + ' vive contate sulle pagine e sulle viste)');
  check(editorF === 2, 'le uniche due frecce senza azione sono nella card in anteprima dell\'editor, dichiarate: ' + editorF);
  check(disall.length === 0, listeF + ' liste con più di una riga, tutte allineate: ' + (disall.length ? disall.join(', ') : 'nessuna disallineata'));

  /* la famiglia dove la freccia resta perché una destinazione c'è: la revisione passata del soul prompt apre il
     confronto fra le due versioni; quella del modello e quella che punta a una versione mai entrata nel dossier no. */
  await vai('pagina=dipendente&id=4&tendina=chiusa');
  const rev = await page.evaluate(() => [...document.querySelectorAll('.hrow.rev')].map(r => ({
    testo: r.textContent.replace(/\s+/g, ' ').trim().slice(0, 40), az: r.dataset.az || '', a: r.dataset.a || '', b: r.dataset.b || '',
    freccia: !!r.querySelector('.rb.xs'),
  })));
  console.log('    revisioni passate:', rev.map(r => (r.az ? '→v' + r.a + '/v' + r.b : 'ferma')).join(' | '));
  check(rev.length === 3 && rev.filter(r => r.az === 'confronta').length === 1, 'delle tre revisioni passate di Nora una sola porta al confronto (prompt v6 → v7)');
  check(rev.every(r => r.freccia === (r.az === 'confronta')), 'la freccia sta su quella e solo su quella');
  await clic('.hrow.rev[data-az="confronta"]');
  check(await conta('.a-tend.vers') === 1 && (await txt('.a-tend.vers .th h4')).includes('v6 e v7'), 'la riga apre davvero il confronto fra la v6 e la v7');
  check((await txt('.a-tend.vers .cmp')).length > 40 && await conta('.a-tend.vers .cmp .doc') === 2, 'il confronto mostra le due versioni affiancate');

  /* la lista mista: le consegne precedenti della serie tengono la colonna, la riga in attesa tiene la freccia */
  await vai('pagina=esecuzione&id=4&tendina=chiusa');
  const serie = await page.evaluate(() => [...document.querySelectorAll('.a-main section:nth-of-type(4) .hlist .hrow')].map(r => ({ attesa: r.classList.contains('attesa'), freccia: !!r.querySelector('.rb.xs'), nofr: r.classList.contains('nofr') })));
  check(serie.length > 1 && serie.some(r => r.attesa) && serie.some(r => !r.attesa), 'le consegne precedenti sono una lista mista: ' + serie.length + ' righe');
  check(serie.every(r => r.freccia === r.attesa) && serie.every(r => !r.nofr), 'la freccia solo sulla riga che aspetta il titolare, e la colonna resta per tutte');
  /* la lista sola: lo storico delle Richieste non ha nessuna destinazione, quindi cade anche la colonna */
  await vai('pagina=richieste&tendina=chiusa');
  const sto2 = await page.evaluate(() => [...document.querySelectorAll('.hlist .hrow')].map(r => ({ freccia: !!r.querySelector('.rb.xs'), nofr: r.classList.contains('nofr') })));
  check(sto2.length > 8 && sto2.every(r => !r.freccia && r.nofr), 'nello storico (' + sto2.length + ' righe decise) nessuna freccia e nessuna colonna sprecata');

  /* ---- versione 19: le consegne del dipartimento ---- */
  console.log('\n11. le consegne del dipartimento: la sesta sezione, i filtri, la ricerca, la tendina che apre una consegna');
  await vai('pagina=dipartimento&dip=svi&tendina=chiusa');
  const sezTit = () => page.evaluate(() => [...document.querySelectorAll('.a-main section h3')].map(h => h.textContent.trim()));
  let tit = await sezTit();
  check(tit.length === 6 && tit[1] === 'Consegne di oggi', 'la pagina Dipartimento ha sei sezioni e la seconda è «Consegne di oggi»: ' + tit.join(' · '));
  const sezCn = await sez('^Consegne di oggi');
  check(await conta(sezCn + ' .ncard[data-az="consegna"]') === 7, 'Sviluppo a undici: sette consegne, tutte cliccabili');
  /* i numeri vengono dal modello, non dalla pagina: la sezione non inventa niente */
  const dalModello = await page.evaluate(() => modello.consegneDi('svi').length);
  check(dalModello === 7, 'le sette sono quelle del modello (`consegneDi`), non un conto a parte');
  check((await txt(sezCn + ' .cnt')).includes('7') && (await txt(sezCn + ' .cnt')).includes('3 fatte'), 'il contatore dice quante sono e quante sono fatte: ' + (await txt(sezCn + ' .cnt')));
  /* le pillole filtrano davvero */
  await clic(sezCn + ' .pill[data-v="fatte"]');
  check(await conta(sezCn + ' .ncard[data-az="consegna"]') === 3, 'la pillola «Fatte» lascia le tre fatte');
  check((await txt(sezCn + ' .cnt')).includes('3 di 7'), 'e il contatore dice «3 di 7»');
  await clic(sezCn + ' .pill[data-v="dafare"]');
  check(await conta(sezCn + ' .ncard[data-az="consegna"]') === 3, 'la pillola «Da fare» lascia le tre non ancora fatte (due da fare più quella in errore)');
  await clic(sezCn + ' .pill[data-v="tutte"]');
  check(await conta(sezCn + ' .ncard[data-az="consegna"]') === 7, 'e «Tutte» le rimette');
  /* niente ricerca: la soglia del prodotto è dodici righe e le consegne arrivano a dieci */
  check(await conta(sezCn + ' [data-az="cerca"]') === 0, 'e la sezione non ha il cerchio «cerca»: dieci righe al massimo stanno in una schermata');
  /* la tendina: che cosa vuol dire aprire una consegna */
  await clic(sezCn + ' .ncard[data-az="consegna"]', 400);
  check(await conta('.a-tend.estesa') === 1, 'un clic sulla card apre la tendina larga, la stessa della richiesta');
  const tc = await txt('.a-tend.estesa');
  check(tc.includes('Pagina del carrello'), 'la tendina porta il nome della consegna');
  check(tc.includes("Chi l'ha fatta") && tc.includes('Sviluppatore full-stack'), 'dice chi l\'ha fatta');
  check(tc.includes("Il passo che l'ha prodotta") && tc.includes('Passo 2') && tc.includes('31 min') && tc.includes('14 €'), 'dice il passo, la durata e il costo, che la card non poteva reggere');
  check(tc.includes('Repository') && tc.includes('Ambiente di test'), 'e gli strumenti di quel passo');
  check(await conta('.a-tend .voci .v') === 3, 'e le tre voci di log di quel passo, che finora leggeva solo la pagina Esecuzione');
  check(await conta('.a-tend [data-az="pagina"][data-pagina="esecuzione"]') === 1, 'porta all\'esecuzione che l\'ha prodotta');
  await clic('.a-tend [data-az="riduci"]', 350);
  check(await conta('.a-tend.aperta') === 1 && await conta('.a-tend.estesa') === 0, '«Riduci» torna alla coda del titolare, come dalla richiesta');
  /* la consegna già uscita porta alla sua richiesta */
  await vai('pagina=dipartimento&dip=mkt&consegna=c4-2');
  const tc2 = await txt('.a-tend.estesa');
  check(await conta('.a-tend.estesa') === 1 && tc2.includes('Post LinkedIn 4 di 12'), 'una consegna già uscita si apre con il suo nome');
  check(tc2.includes('Il carrello abbandonato'), 'e mostra il documento vero della richiesta, non una descrizione');
  check(await conta('.a-tend [data-az="richiesta"]') === 1, 'e ha il pulsante che apre la richiesta in coda');
  await clic('.a-tend [data-az="richiesta"]', 350);
  check((await txt('.a-tend.estesa .th')).includes('Post LinkedIn 4 di 12'), 'che apre davvero la richiesta');
  /* la scala: a quaranta la sezione regge dieci card in tre righe, e le pagine non scorrono di lato */
  await vai('pagina=dipartimento&dip=ven&n=40&tendina=chiusa');
  const sezCn40 = await sez('^Consegne di oggi');
  check(await conta(sezCn40 + ' .ncard[data-az="consegna"]') === 10, 'a quaranta il dipartimento ha dieci consegne');
  check(await largo(), 'e la pagina non scorre di lato');
  /* regola 26: nessuna freccia inerte nelle card nuove */
  const frecceCn = await page.evaluate(sel => [...document.querySelectorAll(sel + ' svg use[href="#i-ne"]')].filter(u => !u.closest('[data-az]')).length, sezCn40);
  check(frecceCn === 0, 'e nessuna freccia della sezione è inerte (regola 26)');
  /* il vuoto: un dipartimento senza consegne con quel filtro lo dice */
  await vai('pagina=dipartimento&dip=amm&tendina=chiusa');
  const sezCnA = await sez('^Consegne di oggi');
  await clic(sezCnA + ' .pill[data-v="attesa"]');
  check((await txt(sezCnA)).includes('Nessuna consegna'), 'e con un filtro che non pesca niente la sezione lo dice invece di restare vuota');

  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
