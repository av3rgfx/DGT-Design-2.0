// Prova cliccata delle approvazioni da mobile (versioni 11 e 12): i tre telefoni, la riga della revisione, le frecce, il rifiuto con motivo,
// la prova della revisione del soul prompt, le approvazioni fino allo stato vuoto, quaranta. A ogni passo: nessuno schermo che scorre di lato, console pulita.
// Uso (dalla radice o da qualunque cartella): PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/mobile.js
const path = require('path'), fs = require('fs');

// Font locali: LOCAL_FONT_CSS (vedi design-system/tools/fetch-fonts.py); Playwright globale: PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
const css = process.env.LOCAL_FONT_CSS ? fs.readFileSync(process.env.LOCAL_FONT_CSS, 'utf8') : '';
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const file = q => 'file://' + path.resolve(__dirname, '../mobile.html') + (q ? '?' + q : '');
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
  const clic = async (sel, ms) => { await page.click(sel); await page.waitForTimeout(ms || 250); };
  const tel = k => `.m-tel[data-n="${k}"] `;
  const schermata = k => page.getAttribute(tel(k) + '.m-scr', 'data-schermata');
  /* lo schermo del telefono non deve poter scorrere di lato: nessun .m-scr con scrollWidth > clientWidth */
  const sfori = () => page.evaluate(() => [...document.querySelectorAll('.m-scr')].filter(s => s.scrollWidth > s.clientWidth).length);
  const passo = async msg => check(await sfori() === 0 && errors.length === 0, msg + ': nessuno schermo scorre di lato, console pulita' + (errors.length ? ' ' + JSON.stringify(errors) : ''));
  /* la coda del telefono (DGT_MOBILE.coda sul `modello` di mobile.html), con il tipo della revisione */
  const coda = () => page.evaluate(() => DGT_MOBILE.coda(modello).map(r => ({ id: r.id, tipo: r.tipo, cosa: r.cosa, rv: r.tipo === 'revisione' ? modello.revisioneDi(r).tipo : null })));
  const richiesta = id => page.evaluate(id => { const r = modello.richieste.find(x => x.id === id); return { stato: r.stato, commento: r.commento || '', rv: r.tipo === 'revisione' ? modello.revisioneDi(r).stato : null }; }, id);

  console.log('1. gli otto telefoni');
  await page.goto(file('')); await page.waitForTimeout(500);
  check(await conta('.m-tel') === 8, 'otto telefoni');
  check((await Promise.all([1, 2, 3, 4, 5, 6, 7, 8].map(schermata))).join(',') === '1,2,3,4,5,6,7,8', 'schermate da 1 a 8');
  let c = await coda(); console.log('    coda:', c.map(r => r.cosa).join(' | '));
  check(c.length === 4, 'quattro richieste in coda');
  /* dalla versione 17 il conto sta nel titolo, non più nella riga dei due numeri grandi (vedi la sezione 6) */
  check(await txt(tel(1) + '.m-h1') === 'DA APPROVARE4', 'titolo e numero «da approvare»');
  check(await txt(tel(1) + '.meet .n') === '4' && await conta(tel(1) + '.m-coda .qrow[data-az="apri"]') === 4, 'campanella con 4, quattro righe in coda');
  check(await conta(tel(1) + '.task.lime') === 1 && (await txt(tel(1) + '.task .tt')) === c[0].cosa, 'la card lime della richiesta corrente');
  check(await txt(tel(2) + '.m-tit h2') === c[0].cosa, 'il telefono 2 mostra la stessa richiesta: ' + c[0].cosa);
  check(await txt(tel(3) + '.m-rh h4') === 'Riepilogo di oggi' && await conta(tel(3) + '.m-rie .voce') === 5 && await conta(tel(3) + '.dcard') === 2, 'il Riepilogo: due card e cinque voci del diario');
  await passo('apertura');

  console.log('2. la riga della revisione e le frecce');
  const iMod = c.findIndex(r => r.rv === 'modello'); check(iMod >= 0, 'in coda c\'è la revisione del modello');
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iMod}"]`);
  check(await schermata(1) === '2' && await conta(tel(1) + '.m-scr.rev') === 1, 'la riga apre la revisione sul telefono 1');
  check(await conta(tel(2) + '.m-scr.rev') === 1 && (await txt(tel(2) + '.m-tit h2')).includes('Standard'), 'il telefono 2 segue: «Da Standard a Esperto»');
  check(await conta(tel(2) + '.m-doc.ver') === 2 && await conta(tel(2) + '.m-det') === 5 && await conta(tel(2) + '.m-bar .pill.on') === 1, 'due versioni, cinque card, la pillola «Prova»');
  check((await txt(tel(2) + '.m-pager')) === `${iMod + 1} di 4`, 'contatore ' + (iMod + 1) + ' di 4');
  await clic(tel(2) + '[data-az="succ"]');
  check((await txt(tel(2) + '.m-pager')) === `${(iMod + 1) % 4 + 1} di 4`, 'la freccia avanti');
  await clic(tel(2) + '[data-az="prec"]');
  check((await txt(tel(2) + '.m-pager')) === `${iMod + 1} di 4`, 'la freccia indietro');
  await passo('revisione e frecce');

  console.log('3. il rifiuto con motivo');
  await clic(tel(2) + '.m-bar [data-az="rifiuta"]');
  check(await conta(tel(2) + '.m-scr.motivo') === 1 && await page.evaluate(() => document.activeElement && document.activeElement.dataset.campo === 'motivo'), 'il campo del motivo appare con il fuoco');
  await clic(tel(2) + '[data-az="rifiuta-conferma"]');
  check(await conta(tel(2) + 'input.manca') === 1 && (await richiesta(c[iMod].id)).stato === 'attesa', 'conferma vuota: bordo rosso, la richiesta resta in attesa');
  await page.type(tel(2) + 'input[data-campo="motivo"]', 'Prima una prova su venti'); await page.keyboard.press('Enter'); await page.waitForTimeout(300);
  const rif = await richiesta(c[iMod].id);
  check(rif.stato === 'rifiutata' && rif.commento === 'Prima una prova su venti' && rif.rv === 'rifiutata', 'motivo + Invio: rifiutata con il motivo, anche nella revisione');
  check(await conta('.m-scr.motivo') === 0 && (await coda()).length === 3, 'il campo si chiude, tre in coda');
  await passo('rifiuto');

  console.log('4. la prova della revisione del soul prompt');
  c = await coda(); const iPr = c.findIndex(r => r.rv === 'prompt'); check(iPr >= 0, 'in coda c\'è la revisione del soul prompt');
  await clic(tel(1) + '[data-az="indietro"]');
  check(await schermata(1) === '1', 'indietro: il telefono 1 torna alla coda');
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iPr}"]`);
  check((await txt(tel(2) + '.m-tit h2')).includes('v7') && await conta(tel(2) + '.m-doc .dif p.chg') > 0 && await conta(tel(2) + '.m-doc mark.add') > 0, 'il soul prompt v7 → v8 con le differenze per paragrafo e per parola');
  await clic(tel(2) + '[data-az="prova"]');
  const pr = await richiesta(c[iPr].id);
  check(pr.stato === 'approvata' && pr.commento === 'Prova su 20 esecuzioni' && pr.rv === 'prova', 'prova: approvata con «Prova su 20 esecuzioni», la revisione è in prova');
  check((await coda()).length === 2, 'due in coda');
  await passo('prova');

  console.log('5. approva le altre fino allo stato vuoto');
  await clic(tel(1) + '[data-az="indietro"]');
  for (let i = 0; i < 4 && (await coda()).length; i++) await clic(tel(1) + '.task [data-az="approva"]');
  check((await coda()).length === 0, 'coda vuota');
  check(await conta(tel(1) + '.m-vuoto') === 1 && await conta(tel(1) + '.m-scr.rie') === 1 && await conta(tel(1) + '.m-rie') === 1, 'telefono 1: «Niente da approvare» sul fondo del Riepilogo, con la linea del tempo sotto');
  check(await conta(tel(1) + '.meet .n') === 0 && await conta(tel(2) + '.m-vuoto') === 1, 'niente numero sulla campanella, telefono 2 vuoto');
  check((await txt(tel(3) + '.m-coda .qrow')).includes('niente in attesa') && (await txt(tel(3) + '.m-stat:nth-child(2) .num')) === '0', 'il Riepilogo dice «niente in attesa»');
  await clic(tel(2) + '.m-bnav [data-az="schermata"][data-s="1"]');
  check(await schermata(2) === '1' && await conta(tel(2) + '.m-vuoto') === 1, 'la navigazione in basso porta a «Da approvare» (vuoto)');
  await passo('stato vuoto');

  console.log('6. il quadro del giorno (versione 17)');
  await page.goto(file('')); await page.waitForTimeout(500);
  const quadro = tel(1) + '.m-quadro';
  check(await conta(quadro + '.duedue') === 1 && await conta(quadro + ' .qq') === 4, 'la schermata 1 porta il quadro: quattro caselle in griglia (la forma scelta)');
  /* solo le parole delle caselle: `> span` senza l'icona e senza la pila, che dentro ha i suoi span (avatar e «+N») */
  const parole = await page.locator(quadro + ' .qq > span:not(.ico):not(.pair)').allTextContents();
  check(parole.join(' ') === 'approvate al lavoro ferma dopo', 'le quattro parole: ' + parole.join(' · '));
  /* la regola della correzione 16a: un elemento fisso non ripete quello che un altro dice già sulla stessa schermata.
     La forma 2 tiene la casella «approvate», quindi cade la riga dei due numeri grandi: «approvate oggi» era lo stesso
     conto a 60 px di distanza, «da approvare» è passato nel titolo. */
  check(await conta(tel(1) + '.m-stats') === 0, 'col quadro «due per due» la riga dei due numeri grandi non c\'è: nessun conto ripetuto');
  check((await txt(tel(1) + '.m-h1.conta b')) === String((await coda()).length), 'il titolo porta il conto delle richieste da approvare');
  check(await page.evaluate(s => { const h = document.querySelector(s); return h.scrollWidth <= h.clientWidth + 1 && h.getBoundingClientRect().height / 1.25 < 60; }, tel(1) + '.m-h1.conta'), 'il titolo col conto sta su una riga sola, senza andare a capo');
  /* niente caselle tagliate: ogni parola sta dentro la sua casella */
  check(await page.evaluate(s => [...document.querySelectorAll(s + ' .qq > span:not(.ico):not(.pair)')].every(e => e.scrollWidth <= e.clientWidth + 1), tel(1) + '.m-quadro'), 'nessuna parola tagliata nelle caselle');
  const gruppi = await page.evaluate(() => modello.gruppiOggi());
  check(await txt(quadro + ' .qq.viva b') === String(gruppi.corso.length) && await txt(quadro + ' .qq.err b') === String(gruppi.errore.length), 'i conti sono quelli del modello, gli stessi della Console');
  await clic(tel(1) + '.m-quadro .qq.viva');
  check(await schermata(1) === '6', 'la casella «al lavoro» apre l\'Agenda');
  await page.goto(file('')); await page.waitForTimeout(500);
  await clic(tel(1) + '.m-quadro .qq.err');
  check(await schermata(1) === '5' && (await txt(tel(1) + '.m-nav .chi b')) === await page.evaluate(() => modello.etichetta(modello.gruppiOggi().errore[0])), 'la casella «ferma» apre la conversazione con chi è fermo');
  await page.goto(file('quadro=0')); await page.waitForTimeout(500);
  check(await conta('.m-quadro') === 0, '?quadro=0 rimette il telefono di prima');
  check(await conta(tel(1) + '.m-stats .m-stat') === 2, 'senza quadro i due numeri grandi tornano: niente da ripetere');
  await page.goto(file('quadro=1')); await page.waitForTimeout(500);
  check(await conta(tel(1) + '.m-quadro.piani .qq') === 4, '?quadro=1 disegna la forma scartata «le quattro a due piani»');
  await page.goto(file('quadro=3')); await page.waitForTimeout(500);
  check(await conta(tel(1) + '.m-quadro.riga .qq') === 3, '?quadro=3 disegna la forma scartata «la riga che parla»');
  await page.goto(file('n=40')); await page.waitForTimeout(600);
  check(await conta(tel(1) + '.m-quadro.duedue .qq') === 4 && await page.evaluate(() => [...document.querySelectorAll('.m-quadro .qq > span:not(.ico):not(.pair)')].every(e => e.scrollWidth <= e.clientWidth + 1)), 'il quadro «due per due» regge anche a quaranta, senza tagli');
  /* Il prezzo della forma 2: è alta 118 px e spinge giù la card della richiesta. Le due misure che contano, sulla schermata
     che serve a decidere: quanta card resta visibile sopra la barra di navigazione (senza quadro 256 su 256, con la 2
     misurati 248; la forma 3, scartata, ne lasciava 240) e se la riga con approva e rifiuta ci sta sopra — prima di
     togliere la riga dei due numeri grandi finiva sotto. Se un domani il quadro cresce, queste due lo dicono subito. */
  await page.goto(file('')); await page.waitForTimeout(600);
  const misure = await page.evaluate(() => {
    const Z = 1.25, tel = document.querySelector('.m-tel'), nav = tel.querySelector('.m-bnav').getBoundingClientRect();
    const card = tel.querySelector('.ncard.task').getBoundingClientRect();
    const riga = tel.querySelector('.ncard.task .st .row').getBoundingClientRect();
    return { visibile: Math.round((Math.min(card.bottom, nav.top) - card.top) / Z), sopra: riga.bottom <= nav.top, spazio: Math.round((nav.top - riga.bottom) / Z) };
  });
  check(misure.visibile >= 245, `della card della richiesta restano visibili ${misure.visibile} px su 256 sopra la navigazione`);
  check(misure.sopra, `la riga con approva e rifiuta sta sopra la navigazione (${misure.spazio} px di margine)`);
  /* Lo studio della misura del conto nel titolo (2026-09-07): `?conta=` mette a confronto le tre forme. Quella scelta
     resta la 1 (numero a 26, come il titolo); la 2 è la strada di mezzo (numero a 36) e costa 4 px di card; la 0 rimette
     la riga dei due numeri grandi e fa ricadere la riga di approva e rifiuta sotto la navigazione — è il prezzo che la
     forma 2 del quadro ha già pagato una volta, e questa prova impedisce di ripagarlo per sbaglio. */
  const cardVisibile = () => page.evaluate(() => {
    const Z = 1.25, tel = document.querySelector('.m-tel'), nav = tel.querySelector('.m-bnav').getBoundingClientRect();
    const card = tel.querySelector('.ncard.task').getBoundingClientRect();
    const riga = tel.querySelector('.ncard.task .st .row').getBoundingClientRect();
    const h1 = tel.querySelector('.m-h1'), num = h1.querySelector('b');
    return { visibile: Math.round((Math.min(card.bottom, nav.top) - card.top) / Z), sopra: riga.bottom <= nav.top,
      misura: num ? getComputedStyle(num).fontSize : '', righe: Math.round((h1.getBoundingClientRect().height / Z - 12) / (parseFloat(getComputedStyle(h1).lineHeight) / Z)) };
  });
  await page.goto(file('conta=2')); await page.waitForTimeout(600);
  const mezzo = await cardVisibile();
  check(mezzo.misura === '36px' && mezzo.righe === 1, 'la strada di mezzo: il conto sale a 36 e il titolo resta su una riga');
  check(mezzo.sopra && mezzo.visibile >= 240, `e costa 4 px: della card ne restano ${mezzo.visibile}, con la riga di approva e rifiuta ancora sopra la navigazione`);
  /* il titolo non va a capo con nessun conto: a undici sono 4, ma il numero non ha un tetto nel modello */
  check(await page.evaluate(() => {
    const h1 = document.querySelector('.m-tel .m-h1.conta'), num = h1.querySelector('b'), era = num.textContent;
    const ok = ['4', '47', '147'].every(t => { num.textContent = t; const r = num.getBoundingClientRect(), c = h1.getBoundingClientRect();
      return r.right <= c.right + 0.5 && c.height / 1.25 <= 50; });
    num.textContent = era; return ok;
  }), 'e regge fino a tre cifre senza sforare né andare a capo');
  await page.goto(file('conta=0')); await page.waitForTimeout(600);
  const riga0 = await cardVisibile();
  check(await conta(tel(1) + '.m-stats .m-stat') === 2 && !riga0.sopra, `?conta=0 rimette la riga dei due numeri grandi, e la riga di approva e rifiuta ritorna sotto la navigazione (${riga0.visibile} px di card su 256): è il prezzo che la forma 2 ha pagato`);
  await passo('il quadro del giorno');

  console.log('7. la tab Dipartimenti (versione 17)');
  await page.goto(file('')); await page.waitForTimeout(500);
  check(await schermata(7) === '7' && await schermata(8) === '8', 'il settimo e l\'ottavo telefono sono le due schermate nuove');
  check(await txt(tel(7) + '.m-h1') === 'DIPARTIMENTI' && await conta(tel(7) + '.m-coda .qrow.dip') === 4, 'l\'elenco: quattro dipartimenti');
  check(await page.evaluate(s => [...document.querySelectorAll(s + ' .qrow.dip .tx span')].every(e => e.scrollWidth <= e.clientWidth + 1), tel(7) + '.m-coda'), 'nessun sottotitolo tagliato nell\'elenco');
  /* il cerchio della navigazione non è più inerte */
  check(await conta(tel(1) + '.m-bnav .tabs .rb[data-az="schermata"]') === 4, 'i quattro cerchi della navigazione portano tutti a una schermata');
  await clic(tel(1) + '.m-bnav .tabs [data-az="schermata"][data-s="7"]');
  check(await schermata(1) === '7', 'il secondo cerchio della navigazione apre i Dipartimenti');
  await clic(tel(7) + '.m-coda .qrow.dip:nth-child(2)');
  const nomeDip = await page.evaluate(() => modello.dipartimenti[1].nome.toUpperCase());
  check(await schermata(7) === '8' && await txt(tel(7) + '.m-h1') === nomeDip, 'la riga apre il dipartimento: ' + nomeDip);
  check(await conta(tel(8) + '.m-h1') === 1 && await txt(tel(8) + '.m-h1') === nomeDip, 'il dipartimento scelto è condiviso fra i telefoni, come la richiesta');
  const sezioni = await page.locator(tel(7) + '.m-sh h4').allTextContents();
  check(sezioni.length === 5 && sezioni[1] === 'Da approvare', 'cinque sezioni, «Da approvare» seconda: ' + sezioni.join(' · '));
  /* le righe da approvare del dipartimento decidono davvero: la stessa m.decidi di tutte le altre pagine */
  const primaAtt = await page.evaluate(() => { const d = modello.dipartimenti[1]; const ids = modello.perDip[d.id].map(e => e.id); return (DGT_MOBILE.coda(modello).filter(r => ids.includes(r.chi))[0] || {}).id; });
  const nPrima = (await coda()).length;
  await clic(tel(7) + '.m-coda .qrow [data-az="approva"]');
  check((await richiesta(primaAtt)).stato === 'approvata' && (await coda()).length === nPrima - 1, 'dal dipartimento si approva davvero: ' + primaAtt);
  await clic(tel(7) + '.m-coda .qrow[data-az="filo"]');
  check(await schermata(7) === '5', 'la riga di un dipendente apre la conversazione');
  await page.goto(file('n=40')); await page.waitForTimeout(700);
  check(await page.evaluate(() => [...document.querySelectorAll('.m-tel[data-n="7"] .qrow.dip .tx span, .m-tel[data-n="8"] .m-h1')].every(e => e.scrollWidth <= e.clientWidth + 1)), 'a quaranta niente tagli nell\'elenco né nel titolo lungo');
  await page.goto(file('schermata=8&dip=amm')); await page.waitForTimeout(600);
  check((await txt(tel(1) + '.m-h1')) === 'AMMINISTRAZIONE' && await conta(tel(1) + '.m-h1.stretta') === 1, 'il nome lungo si stringe e sta nello schermo');
  await passo('i Dipartimenti');

  console.log('8. quaranta');
  await page.goto(file('n=40')); await page.waitForTimeout(600);
  c = await coda(); console.log('    in coda a 40:', c.length);
  check(c.length === 7 && await txt(tel(1) + '.meet .n') === '7' && await conta(tel(1) + '.m-coda .qrow[data-az="apri"]') === 7, 'sette in coda, «7» sulla campanella');
  /* il numero a due cifre sulla campanella: scritto a mano, deve stare nel badge senza sforare */
  const badge = await page.evaluate(() => { const b = document.querySelector('.m-tel[data-n="1"] .meet .n'); b.textContent = '12'; return { largo: b.scrollWidth <= b.clientWidth + 1, w: b.getBoundingClientRect().width }; });
  check(badge.largo && badge.w >= 22, '«12» sta nel badge della campanella (larghezza ' + Math.round(badge.w) + ')');
  const iLungo = c.reduce((b, r, i) => r.cosa.length > c[b].cosa.length ? i : b, 0);
  await clic(tel(1) + `.m-coda .qrow[data-idx="${iLungo}"]`);
  check(await txt(tel(2) + '.m-tit h2') === c[iLungo].cosa, 'il titolo più lungo: ' + c[iLungo].cosa);
  await passo('quaranta');

  console.log('\nle frecce di riga sul telefono (versione 18, regola 25)');
  /* Sul telefono la freccia è una sola, nell'intaglio della card della richiesta corrente, e apre la richiesta.
     La verifica tiene il conto a zero inerti su tutte e otto le schermate, a undici e a quaranta. */
  let inertiM = 0, viveM = 0;
  for (const n of ['11', '40']) for (let s = 1; s <= 8; s++) {
    await page.goto(file('schermata=' + s + '&n=' + n)); await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
      let i = 0, v = 0;
      document.querySelectorAll('svg use').forEach(u => {
        if ((u.getAttribute('href') || '') !== '#i-ne') return;
        u.closest('svg').parentElement.closest('[data-az]') ? v++ : i++;
      });
      return { i, v };
    });
    inertiM += r.i; viveM += r.v;
  }
  check(inertiM === 0, 'nessuna freccia inerte sulle otto schermate, a undici e a quaranta (' + viveM + ' vive)');

  check(errors.length === 0, 'nessun errore in console: ' + JSON.stringify(errors));
  console.log(`\n${ok} ok, ${ko} ko`);
  await browser.close(); process.exit(ko ? 1 : 0);
})().catch(e => { console.error('FALLITO', e); process.exit(1); });
