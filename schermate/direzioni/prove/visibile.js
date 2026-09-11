/* Asserzioni di visibilità, condivise dalle cinque prove (versione 21, 2026-09-08).
 *
 * Perché esiste questo file. Le 385 verifiche della versione 20 asserivano la **presenza nel DOM**
 * (`conta('…') === 1`) e il **clic**. Non basta: prima di cliccare, Playwright porta l'elemento al centro del
 * viewport, quindi un controllo coperto da un elemento `position:fixed` **passa la prova e resta invisibile
 * all'utente**. È successo con la pillola d'ingresso ai workflow e con le pillole del periodo delle Consegne,
 * tutte e due sotto la tendina del titolare. Misurato allora, prima della cura: **66 controlli coperti** dalla
 * tendina e dal badge lime su dieci pagine per due taglie, più **40** tagliati da un contenitore che non
 * scorreva, cioè irraggiungibili in ogni caso.
 *
 * Due difetti diversi, e vanno contati separatamente, perché uno è un difetto e l'altro no:
 *   - COPERTO: il centro del controllo cade sotto un elemento fisso (`.a-tend`, `.a-mini`). È un difetto sempre:
 *     l'utente non lo vede e non lo può cliccare senza chiudere prima il cassetto.
 *   - TAGLIATO: il controllo esce dal proprio contenitore. È un difetto **solo se quel contenitore non scorre**:
 *     le strisce di pillole e le file di card sono scorrevoli per disegno (sfumano con una maschera), e lì il
 *     controllo si raggiunge scorrendo la striscia.
 *
 * `elementFromPoint` non basta da solo: ritorna il figlio più profondo, che spesso è l'`svg` dentro il controllo.
 * Qui si guarda la geometria degli elementi fissi, che è la domanda vera («è sotto il cassetto?»).
 */
'use strict';

/* Tutti i controlli della colonna che nascono coperti da un elemento fisso, allo scroll 0.
   Ritorna stringhe già leggibili, così il messaggio della prova dice quale controllo e dove.

   **Perché `.a-main` e non `.a-app`.** Allargando la verifica a tutta la cornice salta fuori un difetto vero e
   **preesistente**: `.a-head` arriva a x 1414 e il suo ultimo numero è cliccabile («spesi oggi» apre i Costi),
   quindi sotto la tendina aperta ci finisce. Non si chiude riservando la banda anche lì: misurato, le intestazioni
   sforerebbero su 13 pagine su 18, da 143 a 351 px, e le tre statistiche delle Richieste ne vogliono 733 in 526
   disponibili. Serve rifare l'intestazione, ed è una scelta di progetto dell'utente — scritta in
   PROSSIMA-SESSIONE.md con i numeri. Finché non è presa, la verifica dichiara il suo perimetro invece di far finta
   che il difetto non esista: `coperti` guarda la colonna, `copertiIntestazione` conta quello che resta fuori. */
async function coperti(page) {
  return page.evaluate(() => {
    const main = document.querySelector('.a-main');
    if (!main) return [];
    const fissi = [...document.querySelectorAll('.a-tend, .a-mini')].map(el => el.getBoundingClientRect());
    const out = [];
    const dentroIFissi = [...document.querySelectorAll('.a-tend, .a-mini')];
    [...main.querySelectorAll('[data-az]')].forEach(el => {
      /* i controlli della tendina stanno DENTRO la tendina: non sono coperti da se stessi */
      if (dentroIFissi.some(f => f.contains(el))) return;
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      /* fuori dal contenitore che lo taglia: è l'altro difetto, non questo */
      let c = el.parentElement, tagliato = false;
      while (c && c !== document.body) {
        const cs = getComputedStyle(c);
        if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          const cb = c.getBoundingClientRect();
          if (b.right > cb.right + 1 || b.left < cb.left - 1 || b.bottom > cb.bottom + 1 || b.top < cb.top - 1) { tagliato = true; break; }
        }
        c = c.parentElement;
      }
      if (tagliato) return;
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      if (cy < 0 || cy > innerHeight) return;
      if (fissi.some(f => cx > f.left && cx < f.right && cy > f.top && cy < f.bottom)) {
        out.push(el.dataset.az + ' (' + String(el.className || '').slice(0, 24) + ') a x' + Math.round(b.x));
      }
    });
    return out;
  });
}

/* I controlli tagliati da un contenitore che NON scorre: esistono, e non c'è nessun gesto che li raggiunga. */
async function muti(page) {
  return page.evaluate(() => {
    const main = document.querySelector('.a-main');
    if (!main) return [];
    const out = [];
    [...main.querySelectorAll('[data-az]')].forEach(el => {
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      let c = el.parentElement;
      while (c && c !== document.body) {
        const cs = getComputedStyle(c);
        if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
          const cb = c.getBoundingClientRect();
          if (b.right > cb.right + 1 || b.left < cb.left - 1 || b.bottom > cb.bottom + 1 || b.top < cb.top - 1) {
            const scorre = (c.scrollWidth > c.clientWidth + 1 && (cs.overflowX === 'auto' || cs.overflowX === 'scroll'))
              || (c.scrollHeight > c.clientHeight + 1 && (cs.overflowY === 'auto' || cs.overflowY === 'scroll'));
            if (!scorre) out.push(el.dataset.az + ' dentro .' + String(c.className || '').slice(0, 24));
            return;
          }
        }
        c = c.parentElement;
      }
    });
    return out;
  });
}

/* La stessa cosa per una schermata del telefono: lì l'elemento che copre è la navigazione in basso (`.m-bnav`,
   `position:absolute` e `z-index:3`, alta 64 px a 14 px dal fondo). `.m-navfondo` è la sfumatura sopra cui la barra
   galleggia e ha `pointer-events:none`, quindi non copre niente.
   La barra galleggia sopra `.m-scroll`, che scorre: un controllo che allo scroll 0 finisce sotto la barra si
   raggiunge lo stesso, **purché** ci sia abbastanza spazio in fondo alla lista per portarcelo sopra (è a questo
   che serve il `padding-bottom:96px` di `.m-scroll`, contro i 78 px di banda della barra). Quindi la domanda non è
   «è sotto la barra adesso?» ma «esiste UNO scorrimento in cui non lo è?». Senza questa distinzione la verifica
   segnalava tre righe che invece si raggiungono benissimo. */
async function copertiMobile(page) {
  return page.evaluate(() => {
    const out = [];
    document.querySelectorAll('.m-scr').forEach(scr => {
      const sb = scr.getBoundingClientRect();
      const barre = [...scr.querySelectorAll('.m-bnav')];
      const fissi = barre.map(el => el.getBoundingClientRect());
      if (!fissi.length) return;
      scr.querySelectorAll('[data-az]').forEach(el => {
        /* i bottoni della barra stanno DENTRO la barra: non sono coperti da se stessi */
        if (barre.some(bar => bar.contains(el))) return;
        const b = el.getBoundingClientRect();
        if (!b.width || !b.height) return;
        const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        const sotto = f => cx > f.left && cx < f.right && cy > f.top && cy < f.bottom;
        if (!fissi.some(sotto)) return;
        /* è sotto la barra adesso: c'è uno scorrimento che lo libera? */
        const sc = el.closest('.m-scroll');
        if (sc && sc.scrollHeight > sc.clientHeight + 1) {
          const cb = sc.getBoundingClientRect();
          const alto = cy - cb.top + sc.scrollTop;            /* posizione del centro dentro il contenuto */
          const max = sc.scrollHeight - sc.clientHeight;
          let libero = false;
          for (let t = 0; t <= max; t += 8) {
            const y = cb.top + alto - t;
            if (y < cb.top + 4 || y > cb.bottom - 4) continue;
            if (!fissi.some(f => cx > f.left && cx < f.right && y > f.top && y < f.bottom)) { libero = true; break; }
          }
          if (libero) return;
        }
        out.push(el.dataset.az + ' (' + String(el.className || '').slice(0, 20) + ')');
      });
    });
    return out;
  });
}

/* L'invariante che avrebbe preso le due regole fantasma un anno prima: ogni riferimento a chi ha deciso
   al posto del titolare deve risolvere a un record che esiste. Prima erano stringhe libere, e due su tre
   nominavano regole che in `m.regole` non ci sono. */
async function riferimentiRotti(page, n) {
  return page.evaluate((n) => {
    const m = DGT_DATI.modello(n);
    const rotti = [];
    m.richieste.forEach(r => {
      if (!r.deciso) return;
      const a = m.autoreDi(r);
      if (!a || !a.nome) rotti.push(r.id + ' → ' + r.deciso.tipo + ' «' + r.deciso.id + '» non esiste');
    });
    (m.routine || []).forEach(rt => {
      if (rt.regola && !m.regole.some(g => g.id === rt.regola)) rotti.push(rt.id + ' → regola «' + rt.regola + '» non esiste');
      (rt.decise || []).forEach(id => { if (!m.richieste.some(r => r.id === id)) rotti.push(rt.id + ' → richiesta «' + id + '» non esiste'); });
      if (!m.byId[rt.chi]) rotti.push(rt.id + ' → dipendente ' + rt.chi + ' non esiste');
    });
    return rotti;
  }, n);
}

/* Il difetto preesistente dell'intestazione, contato e non nascosto: i controlli di `.a-head` che stanno sotto la
   tendina aperta. Oggi è 1 per pagina (l'ultima statistica, quella cliccabile) sulle pagine che ne hanno tre. */
async function copertiIntestazione(page) {
  return page.evaluate(() => {
    const h = document.querySelector('.a-head');
    if (!h) return [];
    const fissi = [...document.querySelectorAll('.a-tend, .a-mini')].map(el => el.getBoundingClientRect());
    const out = [];
    h.querySelectorAll('[data-az]').forEach(el => {
      const b = el.getBoundingClientRect();
      if (!b.width || !b.height) return;
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      if (fissi.some(f => cx > f.left && cx < f.right && cy > f.top && cy < f.bottom)) {
        out.push(el.dataset.az + ' (' + String(el.className || '').slice(0, 20) + ') a x' + Math.round(b.x));
      }
    });
    return out;
  });
}

/* I **testi** dell'intestazione che nascono sotto un elemento fisso. `copertiIntestazione` guarda i controlli
   (`[data-az]`) e li giudica dal loro centro: un numero largo che sporge solo per meta' gli sfugge, e cosi' e'
   sfuggita la pagina Impostazioni della versione 32, dove tutto il terzo numero («20 budget facoltativi posti»,
   x 1001-1296 a undici e 1049-1343 a quaranta) nasceva oltre i 1110 px dove comincia la tendina. Qui si misura il
   rettangolo del **testo** — con un Range, non con la scatola, che per via del badge `position:absolute` e' piu'
   larga di quello che si legge — e si guarda se tocca un fisso. */
async function testiCopertiIntestazione(page) {
  return page.evaluate(() => {
    const head = document.querySelector('.a-head');
    if (!head) return [];
    const fissi = [...document.querySelectorAll('.a-tend, .a-mini')].map(el => el.getBoundingClientRect());
    if (!fissi.length) return [];
    const out = [];
    const w = document.createTreeWalker(head, NodeFilter.SHOW_TEXT);
    let nodo;
    while ((nodo = w.nextNode())) {
      if (!nodo.textContent.trim()) continue;
      const rg = document.createRange(); rg.selectNodeContents(nodo);
      const b = rg.getBoundingClientRect();
      if (!b.width || !b.height) continue;
      if (fissi.some(f => b.right > f.left && b.left < f.right && b.bottom > f.top && b.top < f.bottom)) {
        out.push('«' + nodo.textContent.trim().slice(0, 28) + '» a x ' + Math.round(b.left) + '-' + Math.round(b.right));
      }
    }
    return out;
  });
}

module.exports = { coperti, muti, copertiMobile, copertiIntestazione, testiCopertiIntestazione, riferimentiRotti };
