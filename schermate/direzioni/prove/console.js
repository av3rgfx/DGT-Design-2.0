// Prova cliccata della Console (direzione A): le tendine del titolare, la pagina Richieste, l'editor del dipendente, le azioni dell'esecuzione, quaranta, la barra «Oggi in azienda», le frecce di riga e (versione 19) le consegne del dipartimento.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/console.js
const path = require('path'), fs = require('fs');

// Font locali: LOCAL_FONT_CSS (vedi design-system/tools/fetch-fonts.py); Playwright globale: PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
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
  const inAttesa = () => page.evaluate(() => modello.codaAttesa().map(r => ({ id: r.id, tipo: r.tipo, cosa: r.cosa })));
  const richiesta = id => page.evaluate(id => { const r = modello.richieste.find(x => x.id === id); return { stato: r.stato, commento: r.commento || '' }; }, id);
  const logTitolare = () => page.locator('.lrow.titolare').allTextContents().then(a => a.map(t => t.replace(/\s+/g, ' ').trim()));

  console.log('1. la tendina del titolare: approva, apri la revisione ed estendi, rifiuta con motivo, riduci, riepilogo, chiudi');
  await vai('');
  check(await conta('.a-tend.aperta') === 1 && await conta('.appr') === 1, 'la tendina è aperta all\'apertura, con la richiesta corrente');
  let coda = await inAttesa(); console.log('    in attesa:', coda.map(r => r.cosa).join(' | '));
  /* Versione 32: le richieste in attesa sono **cinque**, non quattro. La quinta e' quella del tetto: il freno e'
     cablato davvero, il tetto d'azienda e' gia' consumato all'apertura (124 € su 115) e il prodotto si apre fermo.
     E' **una** richiesta al giorno, non una per esecuzione ferma: sei a undici e venti a quaranta spenderebbero
     l'attenzione del titolare, che questo repository chiama la risorsa scarsa. */
  check(coda.length === 5 && await conta('.a-tend .qrow[data-az="vai"]') === 5, 'cinque richieste in attesa, cinque righe in coda: la quinta è quella del tetto');
  check(coda.filter(r => r.tipo === 'tetto').length === 1, 'e ce n\'è una sola per il tetto, non una per esecuzione ferma');
  check((await txt('.a-tend')).includes(coda[0].cosa), 'la richiesta corrente è la più vecchia: ' + coda[0].cosa);
  await clic('.appr [data-az="approva"]');
  check((await richiesta(coda[0].id)).stato === 'approvata', 'approva dalla tendina: la prima richiesta è approvata');
  coda = await inAttesa();
  check(coda.length === 4 && await conta('.a-tend.aperta') === 1, 'quattro in attesa, la tendina resta aperta sulla successiva');
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
  check(await txt('.a-mini b') === '3', 'la pillola conta le tre richieste rimaste');
  await clic('.a-mini[data-pannello="richieste"]');
  check(await conta('.a-tend.aperta') === 1, 'la pillola riapre la tendina');
  check(await largo(), 'nessuno sforo orizzontale');

  console.log('2. la pagina Richieste: filtri e «Approva tutte»');
  await vai('pagina=richieste&tendina=chiusa');
  check(await titolo() === 'RICHIESTE', 'titolo RICHIESTE');
  const righe = await conta('.hrow');
  check(await conta('.task[data-az="richiesta"]') === 5 && await conta('.hrow') === 16, 'cinque card lime da approvare in cima, sedici righe decise nello storico');
  await clic('[data-az="filtro"][data-k="tipo"][data-v="post"]');
  check((await txt('.fsum')).includes('1 filtro attivo') && await conta('.hrow') < righe, 'filtro per tipo: un filtro attivo, meno righe');
  await clic('[data-az="azzera"]');
  check((await txt('.fsum')).includes('nessun filtro') && await conta('.hrow') === righe, 'azzera: nessun filtro, tutte le righe');
  await clic('[data-az="approva-tutte"]');
  check((await inAttesa()).length === 0 && await conta('.task[data-az="richiesta"]') === 0 && await conta('.hrow') === 21, '«Approva tutte»: nessuna card in attesa, ventuno righe nello storico');
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

  /* ---- versione 32: il prodotto si apre fermo, e questa e' la prima cosa che si incontra ----
     Il tetto d'azienda e' cablato davvero e all'apertura e' gia' consumato: le esecuzioni aperte sono in pausa
     **per il tetto**, e da li' non si «riprende» — sei clic su «Riprendi» (venti a quaranta) farebbero del tetto
     che ferma un suggerimento. L'unica strada e' alzarlo, e si alza in un posto solo. Il resto della sezione 4
     prova la pausa **del titolare**, che e' un'altra cosa: quindi prima si toglie il fermo del tetto. */
  console.log('4. il tetto che ferma, e poi l\'esecuzione: pausa, interrompi, riprova, avvia, nota del titolare');
  await vai('pagina=esecuzione&id=4&tendina=chiusa');
  check(await page.evaluate(() => modello.byId[4].pausa === true && modello.byId[4].pausaPer === 'tetto'), 'all\'apertura l\'esecuzione è ferma per il tetto, e lo stato resta «lavoro»: nessuno stato nuovo');
  check((await txt('.a-main')).includes('Ferma per il tetto d\'azienda'), 'la pagina lo dice con le sue parole, non con quelle della pausa del titolare');
  check(await conta('[data-az="esec-pausa"]') === 0 && await conta('.a-main [data-pagina="impostazioni"]') >= 1, 'e non c\'è nessun «Riprendi»: c\'è «Alza il tetto d\'azienda», che porta dove il tetto si pone');
  /* La pillola porta a Impostazioni **senza ricaricare**: si cammina dentro il prodotto, come farebbe il titolare,
     e il modello (che vive nella pagina) si porta dietro quello che si scrive. Una `page.goto` qui rifarebbe il
     modello da zero e il fermo tornerebbe: non e' un difetto, e' il prodotto. */
  await clic('.a-main [data-pagina="impostazioni"]');
  check(await titolo() === 'IMPOSTAZIONI' && await conta('input[data-lim]') === 18, 'si arriva a Impostazioni, che ha diciotto campi scrivibili: il primo posto del prodotto dove si scrive un numero');
  await page.fill('input[data-lim="azienda"][data-per="oggi"]', '60');
  await page.press('input[data-lim="azienda"][data-per="oggi"]', 'Enter'); await page.waitForTimeout(300);
  check(await page.evaluate(() => modello.tettoOggi() === 175 && !modello.byId[4].pausa), 'scritta l\'eccezione di oggi (+60 €), il tetto di oggi fa 175 € e chi era fermo riparte da solo');
  check(await page.evaluate(() => modello.tettoAzienda().giorno === 115), 'e il tetto di ogni giorno resta 115 €: l\'eccezione è di oggi, la promessa non si tocca');
  check(await page.evaluate(() => modello.richiestaTetto() === null && modello.richiesteDi('attesa').length === 4), 'e la richiesta del tetto sparisce dalla coda, che torna a quattro: non c\'è più niente da sbloccare');
  await clic('.a-rail [data-pagina="home"]');
  check((await txt('.a-main .shead h3')) === 'Al lavoro adesso', 'la home torna a dire «Al lavoro adesso», che adesso è vero');
  await clic('.cards.riga [data-az="pagina"][data-pagina="esecuzione"][data-id="4"]');
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
  /* Versione 32: la seconda casella dice **l'altra verita' con la stessa forma**. Il conto e gli avatar sono
     quelli delle esecuzioni aperte; la parola e' «al lavoro» finche' lavorano e «in pausa · tetto» quando il
     tetto d'azienda le ha fermate tutte. Non nasce una quinta casella: sul telefono lo stesso quadro e' una
     griglia due per due con quattro caselle esatte, e l'etichetta ha 53 px misurati. */
  const fermiT = await page.evaluate(() => modello.dipendenti.filter(e => e.pausaPer === 'tetto').length);
  check(caselle[0] === c.approvate + 'approvate' && caselle[1].includes(String(c.lavoro)) && caselle[1].includes(fermiT === c.lavoro ? 'in pausa · tetto' : 'al lavoro'), 'i primi due numeri sono quelli del modello (' + c.approvate + ', ' + c.lavoro + ') e la seconda casella dice «' + (fermiT === c.lavoro ? 'in pausa · tetto' : 'al lavoro') + '»');
  check(fermiT === c.lavoro && fermiT > 0, 'e all\'apertura sono ferme per il tetto tutte e ' + fermiT + ': il prodotto si apre fermo, ed è voluto');
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
  check(caselle.length === 4 && caselle[1].includes('in pausa · tetto') && caselle[3].startsWith(c.piani + 'dopo'), 'a quaranta la barra ha le stesse quattro caselle, con i numeri di quaranta: nessuna quinta, a nessuna delle due taglie');
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
  /* Lo storico delle Richieste: fino alla versione 21 nessuna riga aveva una destinazione e la colonna cadeva.
     Dalla 22 le richieste decise da una **routine** ne hanno una — la routine ha la sua pagina — quindi la colonna
     torna e la freccia sta esattamente sulle righe che portano da qualche parte, come vuole la regola 25. */
  await vai('pagina=richieste&tendina=chiusa');
  const sto2 = await page.evaluate(() => [...document.querySelectorAll('.hlist .hrow')].map(r => ({ freccia: !!r.querySelector('.rb.xs'), nofr: r.classList.contains('nofr'), routine: r.dataset.az === 'routine' })));
  const conDest = sto2.filter(r => r.routine).length;
  check(sto2.length > 8 && conDest === 2, 'nello storico (' + sto2.length + ' righe decise) due portano alla loro routine (' + conDest + ')');
  check(sto2.every(r => r.freccia === r.routine), 'e la freccia sta solo su quelle due: nessuna riga senza destinazione la porta');
  /* La colonna cade **per gruppo**, non per pagina: lo storico è raggruppato per periodo, e un gruppo in cui
     nessuna riga porta da qualche parte continua giustamente a non sprecare la colonna. Quello che non deve mai
     succedere è una riga con destinazione dentro un gruppo che la colonna l'ha tolta. */
  check(sto2.every(r => !(r.routine && r.nofr)), 'nessuna riga con destinazione finisce in un gruppo che ha tolto la colonna');
  check(sto2.some(r => r.nofr), 'e i gruppi di sole righe senza destinazione la colonna continuano a non sprecarla');

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
  /* la pagina: che cosa vuol dire aprire una consegna (scelta dell'utente: una pagina dedicata, non la tendina) */
  await clic(sezCn + ' .ncard[data-az="consegna"]', 450);
  check(await titolo() === 'PAGINA DEL CARRELLO', 'un clic sulla card apre la pagina della consegna, con il suo titolo: ' + await titolo());
  check(await conta('.a-tend.estesa') === 0, 'e NON la tendina: la tendina resta l\'anteprima delle approvazioni');
  const titCn = await sezTit();
  /* quattro `section`: la testata (che non ha un h3, come nell'Esecuzione) piu' le tre con il titolo */
  check(await conta('.a-main section') === 4 && titCn.length === 3 && titCn[0] === 'Il contenuto', 'la pagina ha la testata più tre sezioni, e la prima è «Il contenuto»: ' + titCn.join(' · '));
  const tc = await txt('.a-main');
  check(tc.includes('Sviluppatore full-stack'), 'dice chi l\'ha fatta');
  check(tc.includes('Carrello con quantità'), 'e mostra il contenuto: l\'esito del passo che l\'ha prodotta');
  check(tc.includes('Passo 2') && tc.includes('31 min') && tc.includes('14 €'), 'la sezione del passo dice numero, durata e costo');
  check(tc.includes('Repository') && tc.includes('Ambiente di test'), 'e gli strumenti di quel passo');
  check(await conta('.a-main .hgroup') >= 1 && tc.includes('Mentre la faceva'), 'e le voci di log di quel passo, che finora leggeva solo la pagina Esecuzione');
  check(await conta('.a-main [data-az="pagina"][data-pagina="esecuzione"]') >= 1, 'porta all\'esecuzione che l\'ha prodotta');
  check(await conta('.a-main section:last-of-type .ncard[data-az="consegna"]') === 2, 'e in fondo le altre due consegne della stessa esecuzione');
  /* si torna al dipartimento, che e' da dove ci si arriva */
  await clic('.a-back', 400);
  check(await titolo() === 'SVILUPPO', 'la freccia della cornice torna al dipartimento: ' + await titolo());
  /* la consegna gia' uscita porta alla sua richiesta, e mostra il documento vero */
  await vai('pagina=consegna&consegna=c4-2&tendina=chiusa');
  const tc2 = await txt('.a-main');
  check(await titolo() === 'POST LINKEDIN 4 DI 12', 'una consegna già uscita ha la sua pagina: ' + await titolo());
  check(tc2.includes('Il carrello abbandonato'), 'e mostra il documento vero della richiesta, non una descrizione');
  check(tc2.includes('mock-up del carrello'), 'con il suo allegato');
  const titCn2 = await sezTit();
  check(await conta('.a-main [data-az="richiesta"]') === 3, 'e tre strade per decidere: la pillola in testata, quella della sezione e la riga della richiesta');
  check(titCn2.length === 3 && titCn2[1] === 'La richiesta al titolare', 'la seconda sezione è la richiesta, perché questa consegna non nasce da un passo dichiarato: ' + titCn2.join(' · '));
  check((await sezTit()).includes('La richiesta al titolare'), 'e una sezione che riporta la richiesta con la nota del dipendente');
  await clic('.a-main [data-az="richiesta"]', 400);
  check(await conta('.a-tend.estesa') === 1, 'da lì si apre la tendina per decidere, che è il suo mestiere');
  /* il titolo lungo si stringe: la Consegna ha i titoli piu' lunghi del prodotto */
  await vai('n=40&pagina=consegna&consegna=c21-0&tendina=chiusa');
  check(await conta('.a-title.lunghissimo') === 1, 'il titolo più lungo del prodotto (32 caratteri) si stringe invece di sforare');
  check(await page.evaluate(() => { const st = document.querySelector('.a-stats'), a = document.querySelector('.a-app'); return st.getBoundingClientRect().right <= a.getBoundingClientRect().right; }), 'e i numeri della testata restano dentro la cornice');
  check(await conta('.a-stats .stat') === 2, 'due numeri e non tre: con tre la testata sforava di 77 px');

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

  /* ---- 12. che i controlli SI VEDANO, non solo che esistano (versione 21) ----
     Le nove pagine, le due taglie, la tendina aperta (lo stato predefinito) e chiusa: nessun controllo deve
     nascere sotto la tendina o sotto il badge lime, e nessuno deve stare in un contenitore che non scorre.
     Prima della banda riservata questa verifica trovava 66 controlli coperti e 40 muti. */
  console.log('\n12. i controlli si vedono, non solo esistono (versione 21)');
  const PAGINE_VIS = [['home', ''], ['richieste', 'pagina=richieste'], ['dipartimento', 'pagina=dipartimento&dip=svi'],
    ['dipendente', 'pagina=dipendente&id=4'], ['esecuzione', 'pagina=esecuzione&id=4'], ['costi', 'pagina=costi'],
    ['agenda', 'pagina=agenda'], ['chat', 'pagina=chat'], ['workflow', 'pagina=workflow&dip=svi']];
  let copTot = 0, mutiTot = 0;
  for (const stato of ['aperta', 'chiusa']) {
    for (const [nome, q] of PAGINE_VIS) {
      for (const n of ['11', '40']) {
        await page.goto(file(q + (q ? '&' : '') + 'n=' + n + '&tendina=' + stato)); await page.waitForTimeout(120);
        const cop = await vis.coperti(page), mu = await vis.muti(page);
        copTot += cop.length; mutiTot += mu.length;
        if (cop.length) console.log('    COPERTI ' + nome + '@' + n + '/' + stato + ': ' + cop.join(' | '));
        if (mu.length) console.log('    MUTI ' + nome + '@' + n + '/' + stato + ': ' + mu.join(' | '));
      }
    }
  }
  check(copTot === 0, 'nessun controllo della colonna nasce sotto la tendina o sotto il badge, su nove pagine per due taglie e due stati (' + copTot + ')');
  check(mutiTot === 0, 'nessun controllo sta in un contenitore che non scorre: quello che si taglia si raggiunge scorrendo (' + mutiTot + ')');
  /* Il difetto preesistente dell'intestazione, contato e dichiarato invece che nascosto: `.a-head` arriva a x 1414
     e il suo ultimo numero è cliccabile, quindi sotto la tendina aperta ci finisce. Non si chiude riservando la
     banda anche lì (le intestazioni sforerebbero su 13 pagine su 18, fino a 351 px): serve rifare l'intestazione,
     ed è una scelta dell'utente. La prova ne fissa il conto, così se cresce ce ne accorgiamo. */
  let copHead = 0;
  for (const [nome, q] of PAGINE_VIS) {
    for (const n of ['11', '40']) {
      await page.goto(file(q + (q ? '&' : '') + 'n=' + n + '&tendina=aperta')); await page.waitForTimeout(120);
      const c = await vis.copertiIntestazione(page);
      copHead += c.length;
    }
  }
  /* Era 4, ed era il difetto dichiarato della versione 21: l'intestazione si stendeva fino a x 1414 e i suoi ultimi
     numeri — cliccabili — nascevano sotto la tendina aperta. La versione 22 (conferma f) l'ha rifatta a due righe
     dentro i 1008 px della colonna: adesso è **zero**, e non su una pagina sola ma su tutte, a undici e a quaranta. */
  check(copHead === 0, 'nessun numero dell\'intestazione nasce sotto la tendina aperta: il difetto della versione 21 è chiuso (' + copHead + ')');

  /* Nessuna eccezione, nemmeno il canvas: ci sta anche lui, a quattro colonne invece di cinque. */
  await page.goto(file('pagina=workflow&dip=svi&tendina=chiusa')); await page.waitForTimeout(200);
  const idW = await page.evaluate(() => { const c = document.querySelector('[data-az="workflow"]'); return c ? c.dataset.id : ''; });
  await page.goto(file('pagina=workflow&dip=svi&workflow=' + idW + '&tendina=aperta')); await page.waitForTimeout(300);
  const cv = await page.evaluate(() => ({ main: Math.round(document.querySelector('.a-main').getBoundingClientRect().width), canvas: Math.round(document.querySelector('.wcanvas').getBoundingClientRect().width), larghe: document.querySelectorAll('.a-main.larga').length }));
  check(cv.larghe === 0 && cv.main === 1008, 'il canvas non ha nessuna eccezione: sta nei 1008 px come tutte le altre pagine (' + cv.main + ')');
  check(cv.canvas <= 1008, 'e il canvas ci sta dentro: quattro colonne a 242 px di passo (' + cv.canvas + ')');
  check((await vis.coperti(page)).length === 0, 'con la tendina aperta nessun nodo nasce coperto, che era il motivo dell\'eccezione');
  await page.goto(file('pagina=richieste&tendina=chiusa')); await page.waitForTimeout(200);
  check(await page.evaluate(() => Math.round(document.querySelector('.a-main').getBoundingClientRect().width)) === 1008, 'la colonna finisce dove comincia la tendina, su ogni pagina');

  /* ---- 13. l'invariante che avrebbe preso le due regole fantasma (versione 21) ---- */
  console.log('\n13. chi ha deciso al posto del titolare risolve a un record che esiste');
  for (const n of [11, 40]) {
    const rotti = await vis.riferimentiRotti(page, n);
    if (rotti.length) console.log('    ROTTI a ' + n + ': ' + rotti.join(' | '));
    check(rotti.length === 0, 'a ' + n + ' nessun riferimento rotto: prima «Fatture ricorrenti» e «Follow-up» non esistevano in m.regole (' + rotti.length + ')');
  }
  const rDecise = await page.evaluate(() => [...document.querySelectorAll('.hrow')].filter(el => /(regola|routine) ·/.test(el.textContent)).map(el => el.textContent.replace(/\s+/g, ' ').trim()));
  check(rDecise.length === 3, 'tre consegne sono uscite senza la firma del titolare, e lo dicono nella riga (' + rDecise.length + ')');
  check(rDecise.filter(t => /routine ·/.test(t)).length === 2, 'due le ha decise una routine');
  check(rDecise.filter(t => /regola ·/.test(t)).length === 1, 'una la regola «Report interni», che esiste davvero');
  check(rDecise.every(t => !/non si sa quale/.test(t)), 'e nessuna dice «non si sa quale»');
  /* Dalla versione 22 la pagina della routine esiste (conferma e), quindi la riga ci porta davvero: la regola 26
     vieta di promettere una destinazione che non c'è, non di mantenerne una che c'è. La si clicca per essere
     sicuri che apra la routine giusta, e non solo che il bottone ci sia. */
  const rigaRt = page.locator('.hrow[data-az="routine"]').first();
  check(await page.locator('.hrow[data-az="routine"]').count() === 2, 'due righe dello storico portano alla loro routine');
  const nomeRt = await rigaRt.evaluate(el => (el.textContent.match(/routine · ([^·]+?)\s*\d/) || [])[1] || '');
  await rigaRt.click(); await page.waitForTimeout(300);
  check((await txt('.a-title')).toUpperCase() === nomeRt.trim().toUpperCase(), 'e apre proprio quella: «' + (await txt('.a-title')) + '»');
  check(await conta('.a-rail .rb') === 6, 'il rail resta a sei cerchi: con tre routine la pagina non ne merita un settimo (conferma e)');

  /* ---- 14. il tetto del giorno accanto al numero che lo consuma, e i badge che mentivano (versione 31) ----
     Fino alla 30 la home stampava «124 € spesi oggi» con un badge `↓12%` **scritto a mano** (nel modello
     `costi('oggi').prima` e' `null`: non esiste nessun ieri) mentre la pagina Costi marcava lo stesso identico
     numero «oltre»: due pagine, un numero, due verdetti opposti — e il numero della home era cliccabile proprio
     verso la pagina che lo smentiva. Adesso la home porta la **stessa forma** che la card «Spesa» dei Costi
     stampa gia' per l'azienda. Il badge di `.stat` e' `position:absolute`: il cambio costa zero px, e la prova
     lo rimisura invece di lasciarlo a memoria. */
  console.log('\n14. il tetto del giorno nella home, e i badge inventati');
  for (const n of ['11', '40']) {
    await vai('n=' + n + '&tendina=chiusa');
    const m = await page.evaluate(nn => { const q = DGT_DATI.modello(+nn); return { speso: q.costoOggi, tetto: q.tettoAzienda().giorno }; }, n);
    const terzo = await txt('.a-stats .stat:nth-child(3)');
    check(terzo.includes(m.speso + ' €') && terzo.includes('su ' + m.tetto + ' € al giorno'),
      `a ${n} la home dice il numero col suo tetto, presi dal modello: «${terzo}»`);
    check(m.speso > m.tetto && terzo.includes('oltre il limite'),
      `e quando e' oltre lo dice con la parola della pagina Costi (${m.speso} € su ${m.tetto} €)`);
    check(!/12\s*%/.test(await txt('.a-stats')), `a ${n} il «12 %» scritto a mano non c'e' piu'`);
    /* la stessa forma su due pagine: se un giorno divergono, questa cade */
    await vai('pagina=costi&n=' + n + '&tendina=chiusa');
    const card = await txt('.ncard.regola.spesa .st');
    check(card.includes(m.speso + ' € su ' + m.tetto + ' € al giorno') && card.includes('oltre il limite'),
      `e la card dei Costi dice la stessa cosa con le stesse parole: «${card.slice(0, 60)}…»`);
  }
  /* L'invariante, non il caso singolo: **nessun badge dell'intestazione ripete il numero che gli sta accanto**.
     E' la regola gia' costata una correzione nella versione 16 («non si aggiunge un numero che ne ripete un
     altro sulla stessa schermata»), che pero' nessuna prova teneva: ne aveva presi sei, in quattro pagine. */
  const PAGINE_31 = ['', 'pagina=richieste', 'pagina=dipartimento&dip=svi', 'pagina=dipendente&id=4',
    'pagina=costi', 'pagina=agenda', 'pagina=chat', 'pagina=esecuzione&id=4', 'pagina=workflow', 'pagina=routine'];
  const ripetuti = [];
  for (const n of ['11', '40']) for (const q of PAGINE_31) {
    await vai((q ? q + '&' : '') + 'n=' + n + '&tendina=chiusa', 250);
    const r = await page.evaluate(() => [...document.querySelectorAll('.a-stats .stat')].map(s => {
      const b = s.querySelector('.badge'); if (!b) return null;
      const num = ((s.querySelector('b') || {}).textContent || '').replace(/\s*€$/, '').trim();
      return b.textContent.trim() === num ? (num + ' / ' + s.innerText.replace(/\s+/g, ' ')) : null;
    }).filter(Boolean));
    r.forEach(x => ripetuti.push((q || 'home') + ' @' + n + ': ' + x));
  }
  check(ripetuti.length === 0, 'nessun badge dell\'intestazione ripete il numero che gli sta accanto, su dieci pagine per due taglie (' + ripetuti.length + ')' + (ripetuti.length ? ': ' + ripetuti.join(' | ') : ''));
  /* e nessun badge dell'intestazione e' un letterale che il modello non conosce */
  await vai('');
  const badgeHome = await page.evaluate(() => [...document.querySelectorAll('.a-stats .badge')].map(b => b.textContent.trim()));
  check(badgeHome.length === 1 && badgeHome[0] === 'oltre il limite',
    'e nella home ne resta uno solo, quello che dice il tetto: ' + JSON.stringify(badgeHome));
  /* il Riepilogo del titolare: lo stesso numero porta lo stesso tetto (era «124 €» e basta) */
  await vai('pannello=riepilogo');
  const kvRie = await page.evaluate(() => [...document.querySelectorAll('.a-tend.aperta .kv')].map(e => e.innerText.replace(/\s+/g, ' ')));
  const mm = await page.evaluate(() => { const q = DGT_DATI.modello(11); return q.costoOggi + ' € su ' + q.tettoAzienda().giorno + ' €'; });
  check(kvRie.some(x => x.includes(mm)), 'e il Riepilogo del titolare dice lo stesso numero con lo stesso tetto: ' + JSON.stringify(kvRie));

  /* ================= 15. i limiti di spesa (versione 32) =================
     Le verifiche non guardano un elemento, guardano un **invariante**: che il tetto abbia una sorgente sola, che
     nessuna superficie dica «al lavoro» mentre nessuno lavora, e che chi e' fermo non porti il punto di stato che
     la regola 19 riserva a chi lavora. Se un domani una pagina diverge, cadono. */
  console.log('\n15. i limiti di spesa: una sorgente sola, nessuna parola falsa, nessun punto di troppo');
  for (const n of ['11', '40']) {
    const q = n === '40' ? 'n=40&' : '';
    await vai(q + 'tendina=chiusa');
    const home = await page.evaluate(() => {
      const st = [...document.querySelectorAll('.a-stats .stat')].map(e => e.innerText.replace(/\s+/g, ' ').trim());
      return { st, titolo: (document.querySelector('.a-main section .shead h3') || {}).textContent };
    });
    const mod = await page.evaluate(() => ({ tetto: modello.tettoAzienda().giorno, speso: modello.costoOggi, ferme: modello.fermePerTetto().length, lav: modello.alLavoro.length }));
    check(home.st[2].includes(mod.speso + ' € su ' + mod.tetto + ' € al giorno'), 'a ' + n + ' la home dice il tetto che il titolare ha posto (' + mod.speso + ' su ' + mod.tetto + ')');
    check(mod.ferme === mod.lav && mod.ferme > 0, 'a ' + n + ' il tetto ha fermato tutte le esecuzioni aperte (' + mod.ferme + ' su ' + mod.lav + '): il prodotto si apre fermo, ed è voluto');
    check(!home.st[0].includes('al lavoro') && home.st[0].includes('in pausa'), 'a ' + n + ' il primo numero della home non dice «al lavoro» mentre nessuno lavora: dice «in pausa»');
    check(home.titolo === 'Ferme per il tetto', 'a ' + n + ' e la sezione si intitola «Ferme per il tetto», che è l\'unico posto della card con lo spazio per dirlo');
    /* la regola 19: lime = al lavoro, giallo = da approvare, rosa = errore, niente da fermo */
    const punti = await page.evaluate(() => [...document.querySelectorAll('.a-main .ava.orbe')].filter(a => a.querySelector('.segnale') && modello.byId[+((a.closest('[data-id]') || {}).dataset || {}).id] && modello.byId[+a.closest('[data-id]').dataset.id].pausa).length);
    check(punti === 0, 'a ' + n + ' nessun avatar di chi è fermo porta il punto di stato (regola 19: niente da fermo)');
    /* il tetto e i Costi: lo stesso numero, una sorgente sola */
    await vai(q + 'pagina=costi&tendina=chiusa');
    const cst = await page.evaluate(() => [...document.querySelectorAll('.a-stats .stat')].map(e => e.innerText.replace(/\s+/g, ' ').trim()));
    check(cst[0].includes(mod.speso + ' € su ' + mod.tetto + ' € al giorno'), 'a ' + n + ' i Costi dicono lo stesso numero con lo stesso tetto: ' + cst[0]);
    /* il dipartimento senza soffitto: la card della spesa non stampa piu' la somma dei budget dei suoi */
    const dip = await page.evaluate(() => { const b = [...document.querySelectorAll('[data-az="periodo"][data-sez="dipartimenti"]')].find(e => e.dataset.v === 'oggi'); if (b) b.click(); return null; });
    await page.waitForTimeout(300);
    const cardDip = await page.evaluate(() => [...document.querySelectorAll('.task.spesa.dpt .tt')].map(e => e.innerText.replace(/\s+/g, ' ').trim()));
    check(cardDip.every(t => /nessun budget$/.test(t)), 'a ' + n + ' nessun dipartimento nasce con un soffitto: le card dicono «nessun budget» invece della somma dei budget dei suoi (' + cardDip.join(' | ') + ')');
  }
  /* Impostazioni: il numero si scrive, e quello che si scrive lo dicono tutte le pagine */
  await vai('pagina=impostazioni&tendina=chiusa');
  await page.fill('input[data-lim="azienda"][data-per="giorno"]', '200');
  await page.press('input[data-lim="azienda"][data-per="giorno"]', 'Enter'); await page.waitForTimeout(300);
  check(await page.evaluate(() => modello.tettoAzienda().giorno === 200 && modello.fermePerTetto().length === 0), 'scritto 200 € nel tetto del giorno, il freno molla: 124 € stanno sotto 200');
  await clic('.a-rail [data-pagina="home"]');
  const st200 = await page.evaluate(() => [...document.querySelectorAll('.a-stats .stat')].map(e => e.innerText.replace(/\s+/g, ' ').trim()));
  check(st200[2].includes('124 € su 200 € al giorno') && st200[2].includes('nel limite') && st200[0].includes('al lavoro'), 'e la home lo dice subito, col ramo positivo che nel modello di prima non si vedeva mai: ' + st200[2]);
  /* il gesto della percentuale, sulla pagina viva */
  await vai('pagina=impostazioni&tendina=chiusa');
  await page.fill('input[data-lim="dip:ven"][data-per="giorno"]', '60 %');
  await page.press('input[data-lim="dip:ven"][data-per="giorno"]', 'Enter'); await page.waitForTimeout(300);
  const gesto = await page.evaluate(() => { const i = document.querySelector('input[data-lim="dip:ven"][data-per="giorno"]'); return { v: i.value, riga: i.closest('.crow').querySelector('.tx span').textContent.trim() }; });
  check(gesto.v === '69' && /60 % di 115 € al giorno/.test(gesto.riga), 'la percentuale è un gesto: si scrive «60 %», resta 69 € e la riga dice da dove viene («' + gesto.riga + '»)');
  await page.fill('input[data-lim="dip:ven"][data-per="giorno"]', '');
  await page.press('input[data-lim="dip:ven"][data-per="giorno"]', 'Enter'); await page.waitForTimeout(300);
  check(await page.evaluate(() => modello.budgetDip('ven') === null || modello.budgetDip('ven').giorno == null), 'e si può togliere: il budget di un dipartimento è facoltativo');
  /* il budget del dipendente si scrive nella sua pagina: la penna non e' piu' decorazione */
  await vai('pagina=dipendente&id=4&tendina=chiusa');
  check(await conta('input[data-lim="dipendente:4"]') === 2, 'la pagina del dipendente ha i due campi del suo budget: la penna non è più decorazione');
  await page.fill('input[data-lim="dipendente:4"][data-per="giorno"]', '25');
  await page.press('input[data-lim="dipendente:4"][data-per="giorno"]', 'Enter'); await page.waitForTimeout(300);
  check(await page.evaluate(() => modello.dossierDi(modello.byId[4]).budget.giorno === 25), 'e scrive davvero nel modello, dove la pagina Costi lo legge');

  console.log('\n16. la riga di stato delle card, e le due forme che dicevano il contrario del vero (versione 33)');
  /* **La pillola porta il solo chip.** Non e' una scelta nuova: `SYSTEM-DESIGN.md` lo scrive gia' («la riga di
     stato lascia al testo 30-52 px, quindi li' ci sta il solo chip») e `cardConsegna` lo fa dalla versione 19. Le
     altre cinque specie di card no, e il testo usciva tagliato da sempre: «Pass…» al posto di «Passo 2 di 4»
     (35,4 px disponibili contro 70,2 chiesti), «Chiav…» al posto del motivo dell'errore (46,8 contro 157,6). La
     verifica non guarda una card: chiede che **nessun testo dentro `.sel`, su nessuna pagina e a nessuna delle due
     taglie, sia piu' largo di quello che si vede** — e che a quaranta, dove esiste «Passo 7 di 10», resti vero. */
  const PAG_CARD = ['', 'pagina=dipartimento&dip=svi', 'pagina=dipartimento&dip=mkt', 'pagina=dipartimento&dip=ven',
    'pagina=dipartimento&dip=amm', 'pagina=dipendente&id=4', 'pagina=richieste', 'pagina=agenda'];
  let tagliati = [], viste = 0;
  for (const q of PAG_CARD) for (const n of ['11', '40']) {
    await vai(q + (q ? '&' : '') + 'n=' + n + '&tendina=chiusa', 250);
    const r = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.ncard.task .st .sel').forEach(sel => {
        sel.querySelectorAll('span, b').forEach(el => {
          if (el.querySelector('span, b, svg')) return;
          if (!el.textContent.trim()) return;
          if (el.scrollWidth > el.clientWidth + 1) out.push(el.textContent.trim().slice(0, 24) + ' (' + el.scrollWidth + ' in ' + el.clientWidth + ')');
        });
      });
      return { out, n: document.querySelectorAll('.ncard.task .st .sel').length };
    });
    viste += r.n; tagliati = tagliati.concat(r.out.map(t => (q || 'home') + ' a ' + n + ': ' + t));
  }
  check(tagliati.length === 0, 'su ' + viste + ' pillole di stato, in 8 pagine per due taglie, nessun testo è tagliato: erano «Pass…» e «Chiav…» (' + tagliati.slice(0, 4).join(' · ') + ')');
  await vai('tendina=chiusa');
  const selHome = await page.locator('.ncard.task .st .sel').allTextContents().then(a => a.map(t => t.replace(/\s+/g, ' ').trim()));
  check(selHome.every(t => /^(In pausa|In corso|Errore|In coda|Da approvare|Libero|In ritardo|Concluso|Da iniziare)$/.test(t)), 'e quello che resta è lo stato e basta: ' + [...new Set(selHome)].join(' | '));

  /* **Il lime dice «al lavoro», e nient'altro** (regola 4, e la versione 22: «il lime resta la sua firma, mai
     altro»). Due forme lo tradivano, tutte e due alla taglia grande: la riga compatta della home restava lime su
     chi il tetto aveva fermato (12 su 12), e quella dei Costi la usava per dire «oltre il budget» — la **stessa
     classe**, nella stessa taglia, per due fatti diversi. */
  await vai('n=40&tendina=chiusa');
  const limeHome = await page.evaluate(() => ({
    righe: document.querySelectorAll('.elenco .erow.lav').length,
    fermi: modello.dipendenti.filter(e => e.stato === 'lavoro' && e.pausa).length,
    lavoro: modello.dipendenti.filter(e => e.stato === 'lavoro' && !e.pausa).length,
  }));
  check(limeHome.righe === limeHome.lavoro, 'a quaranta le righe lime della home sono quante le persone che lavorano davvero: ' + limeHome.righe + ' righe, ' + limeHome.lavoro + ' al lavoro, ' + limeHome.fermi + ' ferme per il tetto');
  await vai('n=40&pagina=costi&tendina=chiusa');
  await clic('[data-az="periodo"][data-sez="dipendenti"][data-v="oggi"]', 300);
  const costi40 = await page.evaluate(() => ({
    lime: document.querySelectorAll('.elenco .erow.lav').length,
    oltre: [...document.querySelectorAll('.elenco .erow .chip')].filter(c => /· oltre$/.test(c.textContent.trim())).length,
    modello: modello.costi('oggi').perDipendente.filter(x => x.budget.oggi > x.budget.giorno).length,
  }));
  check(costi40.lime === 0, 'e nei Costi il lime non dice più «oltre il budget»: zero righe lime (' + costi40.lime + ')');
  check(costi40.oltre === costi40.modello && costi40.oltre > 0, 'lo dice la parola dentro il chip che c\'era già, su tutte quelle oltre: ' + costi40.oltre + ' di ' + costi40.modello);

  /* La richiesta che sblocca il lavoro di tutta l'azienda sta **in cima** alla coda, e dice il suo importo invece
     di «0 € · 0 passi» (`tipo: 'tetto'` non stava in `iconaTipo`/`nomeTipo`: la card stampava «undefined»). */
  for (const n of ['11', '40']) {
    await vai('n=' + n + '&tendina=aperta', 300);
    const prima = await page.evaluate(() => modello.codaAttesa()[0]);
    check(prima.tipo === 'tetto', 'a ' + n + ' la richiesta del tetto è la prima della coda: prima cadeva dove la portava la sua ora (' + prima.cosa + ')');
    const corrente = await txt('.appr .top .chip');
    check(/Tetto d'azienda/.test(corrente) && !/undefined/.test(corrente), 'e la tendina la sa nominare: «' + corrente + '»');
    await vai('n=' + n + '&pagina=richieste&tendina=chiusa', 300);
    const cardT = await page.evaluate(() => { const c = [...document.querySelectorAll('.ncard.task')].find(e => /Tetto del giorno/.test(e.textContent)); return c ? c.querySelector('.st .sel span:not(.av)').textContent.replace(/\s+/g, ' ').trim() : null; });
    check(cardT && /^\+\d+ € per oggi$/.test(cardT) && !/0 passi/.test(cardT), 'e la sua card dice di quanto alza il tetto, non «0 € · 0 passi»: «' + cardT + '»');
  }

  /* Una regola d'azienda ha **uno** stato, non due: `g4` era «Attiva» nelle Richieste e «Spenta» in ogni pagina
     Dipendente, perche' i dossier ne tenevano una copia ferma a prima della versione 22. */
  for (const n of ['11', '40']) {
    await vai('n=' + n + '&pagina=richieste&tendina=chiusa', 250);
    const inRic = await page.evaluate(() => { const c = [...document.querySelectorAll('.regole .ncard')].find(e => /Spese sopra 50/.test(e.textContent)); return /Spenta/.test(c.textContent) ? 'Spenta' : 'Attiva'; });
    await vai('n=' + n + '&pagina=dipendente&id=1&tendina=chiusa', 250);
    const inDip = await page.evaluate(() => { const r = [...document.querySelectorAll('.crow')].find(e => /Spese sopra 50/.test(e.textContent)); return r ? (/Spenta/.test(r.textContent) ? 'Spenta' : 'Attiva') : 'assente'; });
    check(inRic === inDip, 'a ' + n + ' «Spese sopra 50 €» ha lo stesso stato nelle due pagine che la stampano: Richieste «' + inRic + '», Dipendente «' + inDip + '»');
  }

  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
