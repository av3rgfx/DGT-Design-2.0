// Prova cliccata della Console (direzione A): le tendine del titolare, la pagina Richieste, l'editor del dipendente, le azioni dell'esecuzione, quaranta, la barra «Oggi in azienda».
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

  console.log('6. la barra «Oggi in azienda» (versione 16): le caselle contate, dove portano, la barra dei passi');
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
  check(caselle.length === 5, 'cinque caselle: approvate, al lavoro, ferme, aspettano te, dopo');
  check(caselle[0] === c.approvate + 'approvate' && caselle[1].includes(c.lavoro + 'al lavoro'), 'i primi due numeri sono quelli del modello (' + c.approvate + ', ' + c.lavoro + ')');
  check(caselle[2].startsWith(c.errore + 'ferm') && caselle[3] === c.attesa + 'aspettano te' && caselle[4].startsWith(c.piani + 'dopo'), 'ferme, aspettano te e dopo sono quelli del modello (' + c.errore + ', ' + c.attesa + ', ' + c.piani + ')');
  check(await conta('.a-sched .tl .qua.err') === 1, 'la casella di chi è fermo è rosa: la barra di prima non lo diceva');
  check(await conta('.a-sched .tl .now') === 0 && await conta('.a-sched .tl .ev') === 0, 'niente marcatore dell\'ora né blocchi: la barra non finge più una linea del tempo');
  await clic('.a-sched .tl .qua.err');
  check(await titolo().then(t => t.length > 0) && await conta('.etesta .a-sched') === 1, 'la casella rosa apre l\'esecuzione ferma: ' + await titolo());
  await vai('');
  await clic('.a-sched .tl .qua.poi');
  check(await titolo() === 'AGENDA', 'la casella «dopo» apre l\'agenda');
  await vai('');
  await clic('.a-sched .tl .qua:nth-child(4)');
  check(await titolo() === 'RICHIESTE', 'la casella «aspettano te» apre le richieste');
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
  check(caselle.length === 5 && caselle[1].includes(c.lavoro + 'al lavoro') && caselle[3] === c.attesa + 'aspettano te', 'a quaranta la barra ha le stesse cinque caselle, con i numeri di quaranta');
  check(await page.evaluate(() => { const t = document.querySelector('.a-sched .tl'); return t.scrollWidth - t.clientWidth; }) === 0, 'a quaranta la barra non sfora');

  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
