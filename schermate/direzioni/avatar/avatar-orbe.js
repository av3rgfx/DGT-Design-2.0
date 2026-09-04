/* =====================================================================
   DGT — avatar «orbe»: la seconda famiglia di avatar dei dipendenti AI.

   Richiesta dell'utente (2026-09-04, dopo la versione 5): avatar più puliti
   (forme simili fra loro, non una silhouette diversa per ciascuno) e più
   dinamici, nello stile dell'orbe della modalità voce di Grok: una sfera
   morbida e monocroma che respira, sbatte le palpebre e segue lo sguardo.

   Storia breve: prima versione con superellissi e animazioni CSS; seconda e
   terza con moti di stato più visibili e cicli più lunghi; quarta senza segni
   dietro il corpo; quinta (sessione successiva) senza disco, con le pelli.

   Sesta versione (stessa sessione, tre correzioni dell'utente):
   1. «Chiaro non va bene»: la pelle predefinita è «perla», il nero lucido
      dell'orbe di riferimento, resa più visibile sul nero della Console da
      tre luci dentro la palette: il riflesso in alto a sinistra, la luce
      riflessa in basso e un orlo di luce che segue il bordo (più un bagliore
      di pochi pixel appena fuori dal corpo). Le altre pelli restano dietro
      pelle(nome) / ?pelle=… per il confronto.
   2. «Tondi e meno ovali»: il corpo è un cerchio, sempre (raggio 95–100 dal
      seme). Niente superellisse, inclinazione o rigonfiamento; niente squash e
      stretch. Un dipendente si distingue dagli occhi: forma (tondi, pillola
      alta, pillola larga), distanza, altezza; e dalla posizione del riflesso.
   3. «Le animazioni sono scadenti e poco fluide»: via i keyframe CSS (i
      saltelli, i tremiti, le scrollate, le «z»). Un solo requestAnimationFrame
      per pagina muove tutti gli orbi visibili con funzioni continue del tempo
      (seni, rumore periodico, finestre morbide sin²): niente scatti, niente
      pause secche. Base per tutti: respiro (scala uniforme ±1,6 %), leggero
      galleggiamento, deriva dello sguardo con proiezione sferica (l'occhio che
      va verso il bordo si stringe: è questo che dà volume), battito delle
      palpebre con easing e calendario dal seme. Per stato, un solo moto quieto:
        lavoro       occhi lime, lo sguardo scandisce piano da un lato all'altro,
                     il respiro è un poco più svelto;
        attesa       occhi gialli più grandi; ogni ~6 s l'orbe si solleva di poco
                     e guarda in alto verso il titolare, poi torna;
        errore       occhi a X rosa che pulsano piano; l'orbe sta un poco più in
                     basso e ogni ~7 s scuote la testa lentamente (±4,5°);
        pianificato  dondola lentamente da un lato all'altro; ogni ~10 s guarda
                     in alto a destra «l'orologio» e torna;
        libero       palpebre socchiuse, respiro profondo e lento, l'orbe si
                     abbassa un poco.
      Fase e periodi dal seme (nessuno in sincrono). Solo gli orbi nel viewport
      si aggiornano (IntersectionObserver); con la scheda nascosta si ferma;
      con prefers-reduced-motion niente si muove (posa di riposo).
   - L'anteprima dell'editor (.av[data-segue]) segue il puntatore con gli
     occhi, con inseguimento morbido.

   API (stessa dell'involucro del kit): html(seme, stato), anima(radice),
   semi(ruolo, n), più pelle(nome), PELLI, fermo(t) / riprendi() e
   fotogramma(svg, t) per gli screenshot. Si attiva con DGT_AVATAR.usa('orbe').
   ===================================================================== */
window.DGT_AVATAR_ORBE = (function () {
  const M = window.DGT_AVATAR_MOTORE;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const CORNICE = 125;
  const VIEWBOX = `${-CORNICE} ${-CORNICE} ${CORNICE * 2} ${CORNICE * 2}`;
  const CORPO_ID = 'av-orbe-corpo';
  const TAU = Math.PI * 2;
  /* occhi: lime al lavoro, giallo (il terzo punto di interesse della palette) da approvare, rosa in errore */
  const VOLTO = { lavoro: '#B8FC64', attesa: '#FCDC64', errore: '#F9A3A3', pianificato: '#FCFCFC', libero: '#FCFCFC' };
  /* le pelli: nome, etichetta e descrizione per la pagina di confronto; la prima è quella predefinita */
  const PELLI = [
    { id: 'perla',  nome: 'Perla nera',   desc: 'Corpo nero lucido, come l\'orbe di riferimento: il riflesso in alto a sinistra, la luce riflessa in basso, un orlo di luce lungo il bordo e un bagliore di pochi pixel fuori dal corpo. Sul nero si vede per il volume, non per un contorno; un solo colore su ogni fondo. Gli occhi colorati dallo stato restano il segnale.' },
    { id: 'grigio', nome: 'Grigio',       desc: 'Corpo nel grigio delle card (#4D4D4D) con lo stesso volume: si stacca da ogni fondo, nero, chiaro e lime, senza orli forti. Più neutro, meno «creatura».' },
    { id: 'chiaro', nome: 'Chiaro',       desc: 'Corpo chiaro (#E4E4E4) con occhi neri, come un\'orbe di ceramica; sulle superfici chiare e lime si inverte da sola in perla nera. Scartata dall\'utente («Chiaro non va bene»), tenuta per il confronto.' },
    { id: 'alone',  nome: 'Alone',        desc: 'Corpo nero come la perla, ma con un alone morbido di luce dietro l\'orbe al posto del disco: niente bordo netto, il fondo resta nero.' },
    { id: 'disco',  nome: 'Disco (prima)', desc: 'La versione precedente: disco chiaro #E4E4E4 con il corpo nero dentro. Tenuta solo per il confronto.' },
  ];
  const r2 = M.r2;
  const pelleDi = () => (typeof document !== 'undefined' && document.documentElement.dataset.pelle) || PELLI[0].id;

  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /** Rumore periodico 1D in [-1, 1]: tre seni in rapporto armonico, quindi continuo e senza cuciture. */
  const rumore = (t, per, seme) => { const p = t / per * TAU; return 0.55 * Math.sin(p + seme) + 0.3 * Math.sin(2 * p + seme * 1.7 + 1.1) + 0.15 * Math.sin(3 * p + seme * 2.3 + 2.4); };
  /** Finestra morbida: ogni `per` secondi un impulso lungo `dur`, che sale e scende come sin² (mai uno scatto). */
  const impulso = (t, per, dur) => { const f = ((t % per) + per) % per; if (f >= dur) return 0; const s = Math.sin(Math.PI * f / dur); return s * s; };
  const liscia = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);

  /** I parametri dell'orbe dal seme: tutti cerchi, si distinguono per gli occhi e per il riflesso. */
  function forma(seme) {
    const rng = M.createRng(hash((seme || 'dipendente').trim().toLowerCase()));
    const occhi = ['tondo', 'pillola', 'largo'][Math.floor(rng() * 3)];
    return {
      r: 95 + rng() * 5,                    // raggio del cerchio
      occhi,
      dist: 27 + rng() * 11,                // mezza distanza fra gli occhi
      alt: -12 + rng() * 12,                // altezza degli occhi (negativo = più in alto)
      luce: -36 + rng() * 12,               // dove sta il riflesso
      fase: rng() * 40,                     // nessun orbe in sincrono con un altro
      periodo: 4.6 + rng() * 1.6,           // respiro
      s1: rng() * TAU, s2: rng() * TAU, s3: rng() * TAU,   // semi del rumore
    };
  }

  /** Gli occhi per tipo e stato: larghezza, altezza, raggio. */
  function occhi(p, stato) {
    let w, h;
    if (p.occhi === 'tondo') { w = 27; h = 27; } else if (p.occhi === 'pillola') { w = 20; h = 40; } else { w = 34; h = 22; }
    if (stato === 'attesa') { w *= 1.2; h *= 1.2; }
    if (stato === 'lavoro') { h *= 0.88; }
    return { w, h, rx: Math.min(w, h) / 2 };
  }

  /** Il markup dell'orbe: un <svg> inline nella posa di riposo; il motore sotto lo muove. Colori e volume della pelle stanno nel CSS (variabili --av-*). */
  function html(seme, stato) {
    const p = forma(seme);
    const volto = VOLTO[stato] || VOLTO.libero;
    const o = occhi(p, stato);
    const lid0 = stato === 'libero' ? 0.32 : 1;
    const occhio = lato => {
      const dentro = stato === 'errore'
        ? `<rect x="-17" y="-4.5" width="34" height="9" rx="4.5" transform="rotate(45)"/><rect x="-17" y="-4.5" width="34" height="9" rx="4.5" transform="rotate(-45)"/>`
        : `<rect x="${r2(-o.w / 2)}" y="${r2(-o.h / 2)}" width="${r2(o.w)}" height="${r2(o.h)}" rx="${r2(o.rx)}"/>`;
      return `<g class="occhio" transform="translate(${r2(lato * p.dist)} ${r2(p.alt)}) scale(1 ${lid0})">${dentro}</g>`;
    };
    /* --volto colore degli occhi (i neutri leggono --av-occhi-neutri: neri sul corpo chiaro), --bordo-c 4 se l'occhio è colorato (contorno nero sul corpo chiaro) */
    const neutro = volto === '#FCFCFC';
    const vars = `--volto:${neutro ? 'var(--av-occhi-neutri,#FCFCFC)' : volto};--bordo-c:${neutro ? 0 : 4}`;
    const lx = r2(p.luce), ly = r2(-0.42 * p.r);
    return `<svg class="ava orbe ${stato}" viewBox="${VIEWBOX}" aria-hidden="true" focusable="false" style="${vars}" data-seme="${String(seme || '').replace(/"/g, '&quot;')}" data-stato="${stato}">`
      + `<circle class="alone" r="122"/>`
      + `<g class="tutto">`
      + `<circle class="bagliore" r="${r2(p.r + 9)}"/>`
      + `<g class="corpo"><circle class="pelle" r="${r2(p.r)}"/><circle class="orlo" r="${r2(p.r)}"/>`
      + `<ellipse class="luce" cx="${lx}" cy="${ly}" rx="${r2(p.r * 0.3)}" ry="${r2(p.r * 0.17)}" transform="rotate(-30 ${lx} ${ly})"/>`
      + `<ellipse class="riflesso" cx="0" cy="${r2(p.r * 0.66)}" rx="${r2(p.r * 0.5)}" ry="${r2(p.r * 0.16)}"/></g>`
      + `<g class="occhi">${occhio(-1)}${occhio(1)}</g>`
      + `</g></svg>`;
  }

  /* ---------- foglio di stile e gradienti, una volta per pagina ---------- */
  const CSS = `
.ava.orbe{overflow:visible}
/* ---- la pelle: corpo, orlo di luce, riflessi, bagliore, occhi, alone e disco. Ogni differenza fra le pelli è una variabile --av-*
   dichiarata su [data-pelle] (l'html per la pagina, o un contenitore nella pagina di confronto): vince il più vicino.
   Le variabili --av-c-* le mette il CSS della Console sulle superfici chiare (direzione-a.js): con la pelle «chiaro»
   valgono (--av-inv-*: il corpo torna perla nera), con le altre sono invalide e non contano. ---- */
.ava.orbe .corpo>.pelle{fill:var(--av-c-corpo,var(--av-corpo,url(#av-orbe-corpo-perla)))}
.ava.orbe .corpo>.orlo{fill:none;stroke:var(--av-c-orlo,var(--av-orlo,url(#av-orbe-orlo)));stroke-width:var(--av-c-orlo-w,var(--av-orlo-w,4))}
.ava.orbe .corpo>.luce{fill:url(#av-orbe-luce);opacity:var(--av-c-luce,var(--av-luce,.55))}
.ava.orbe .corpo>.riflesso{fill:url(#av-orbe-riflesso);opacity:var(--av-c-riflesso,var(--av-riflesso,.22))}
.ava.orbe .bagliore{fill:url(#av-orbe-bagliore);opacity:var(--av-c-bagliore,var(--av-bagliore,.6))}
.ava.orbe .occhio rect{fill:var(--volto);stroke:#0A0A0A;stroke-width:calc(var(--bordo-c,0) * var(--av-c-bordo,var(--av-bordo,0)));paint-order:stroke}
.ava.orbe .alone{display:var(--av-alone,none);fill:url(#av-orbe-alone)}
/* la casella: con il disco (pelle «disco») è chiara e taglia; senza disco è trasparente, non taglia i moti e l'orbe cresce dall'80 al 92 % */
[data-pelle] .av:has(>svg.orbe){background:var(--av-fondo,transparent);border-color:transparent;overflow:var(--av-taglio,visible)}
[data-pelle] .av:has(>svg.orbe)>svg.ava.orbe{width:var(--av-scala,115%);height:var(--av-scala,115%)}
/* impilati senza disco: si toccano appena invece di sovrapporsi */
[data-pelle]:not([data-pelle="disco"]) .pair .av:has(>svg.orbe)+.av{margin-left:-6px}
[data-pelle="perla"],[data-pelle="grigio"],[data-pelle="chiaro"],[data-pelle="alone"]{--av-fondo:transparent;--av-taglio:visible;--av-scala:115%;--av-anello-pelle:transparent}
[data-pelle="disco"]{--av-fondo:#E4E4E4;--av-taglio:hidden;--av-scala:100%;--av-anello-pelle:initial;--av-corpo:url(#av-orbe-corpo);--av-orlo-w:0;--av-luce:.2;--av-riflesso:0;--av-bagliore:0;--av-occhi-neutri:#FCFCFC;--av-bordo:0;--av-alone:none}
[data-pelle="perla"]{--av-corpo:url(#av-orbe-corpo-perla);--av-orlo:url(#av-orbe-orlo);--av-orlo-w:4;--av-luce:.55;--av-riflesso:.22;--av-bagliore:.6;--av-occhi-neutri:#FCFCFC;--av-bordo:0;--av-alone:none}
[data-pelle="grigio"]{--av-corpo:url(#av-orbe-corpo-grigio);--av-orlo:url(#av-orbe-orlo);--av-orlo-w:3;--av-luce:.4;--av-riflesso:.16;--av-bagliore:.3;--av-occhi-neutri:#FCFCFC;--av-bordo:0;--av-alone:none}
[data-pelle="alone"]{--av-corpo:url(#av-orbe-corpo-perla);--av-orlo:url(#av-orbe-orlo);--av-orlo-w:2;--av-luce:.4;--av-riflesso:.16;--av-bagliore:0;--av-occhi-neutri:#FCFCFC;--av-bordo:0;--av-alone:block}
[data-pelle="chiaro"]{--av-corpo:url(#av-orbe-corpo-chiaro);--av-orlo:url(#av-orbe-orlo-scuro);--av-orlo-w:3;--av-luce:.9;--av-riflesso:0;--av-bagliore:0;--av-occhi-neutri:#0A0A0A;--av-bordo:1;--av-alone:none;--av-inv-corpo:url(#av-orbe-corpo-perla);--av-inv-orlo:url(#av-orbe-orlo);--av-inv-orlo-w:4;--av-inv-luce:.55}
`;
  let pronto = false;
  function prepara() {
    if (pronto || typeof document === 'undefined') return;
    pronto = true;
    if (!document.getElementById('dgt-avatar-orbe-css')) { const s = document.createElement('style'); s.id = 'dgt-avatar-orbe-css'; s.textContent = CSS; document.head.appendChild(s); }
    if (!document.getElementById(CORPO_ID)) {
      const svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true'); svg.style.position = 'absolute';
      /* i corpi: sfere lucide con la luce in alto a sinistra e l'ombra in basso a destra, tutto dentro la palette;
         gli orli: luce riflessa (bianca) o, sul corpo chiaro, un bordo d'ombra (nero); il riflesso e la luce riflessa
         sono gradienti morbidi (niente filtri: sono più leggeri con quaranta orbi in moto); il bagliore è un anello di
         luce appena fuori dal corpo; l'alone un campo di luce largo */
      svg.innerHTML = `<defs>
<radialGradient id="${CORPO_ID}" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#2A2A2A"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient>
<radialGradient id="av-orbe-corpo-perla" cx="34%" cy="26%" r="84%"><stop offset="0" stop-color="#7A7A7A"/><stop offset=".28" stop-color="#3A3A3A"/><stop offset=".62" stop-color="#171717"/><stop offset="1" stop-color="#050505"/></radialGradient>
<radialGradient id="av-orbe-corpo-grigio" cx="36%" cy="28%" r="82%"><stop offset="0" stop-color="#8A8A8A"/><stop offset=".45" stop-color="#4D4D4D"/><stop offset="1" stop-color="#2A2A2A"/></radialGradient>
<radialGradient id="av-orbe-corpo-chiaro" cx="36%" cy="28%" r="82%"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#E4E4E4"/><stop offset="1" stop-color="#BDBDBD"/></radialGradient>
<linearGradient id="av-orbe-orlo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FCFCFC" stop-opacity=".85"/><stop offset=".5" stop-color="#FCFCFC" stop-opacity=".06"/><stop offset="1" stop-color="#FCFCFC" stop-opacity=".34"/></linearGradient>
<linearGradient id="av-orbe-orlo-scuro" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0A0A0A" stop-opacity=".04"/><stop offset="1" stop-color="#0A0A0A" stop-opacity=".28"/></linearGradient>
<radialGradient id="av-orbe-luce" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FCFCFC"/><stop offset=".5" stop-color="#FCFCFC" stop-opacity=".55"/><stop offset="1" stop-color="#FCFCFC" stop-opacity="0"/></radialGradient>
<radialGradient id="av-orbe-riflesso" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FCFCFC" stop-opacity=".9"/><stop offset="1" stop-color="#FCFCFC" stop-opacity="0"/></radialGradient>
<radialGradient id="av-orbe-bagliore" cx="50%" cy="50%" r="50%"><stop offset=".84" stop-color="#FCFCFC" stop-opacity="0"/><stop offset=".9" stop-color="#FCFCFC" stop-opacity=".5"/><stop offset="1" stop-color="#FCFCFC" stop-opacity="0"/></radialGradient>
<radialGradient id="av-orbe-alone" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FCFCFC" stop-opacity=".2"/><stop offset=".55" stop-color="#FCFCFC" stop-opacity=".1"/><stop offset="1" stop-color="#FCFCFC" stop-opacity="0"/></radialGradient>
</defs>`;
      document.body ? document.body.prepend(svg) : document.addEventListener('DOMContentLoaded', () => document.body.prepend(svg));
    }
    if (!document.documentElement.dataset.pelle) document.documentElement.dataset.pelle = PELLI[0].id;
    if (!ridotto) {
      io = typeof IntersectionObserver === 'function' ? new IntersectionObserver(voci => voci.forEach(en => { const v = vivi.get(en.target); if (v) v.visibile = en.isIntersecting; }), { rootMargin: '80px' }) : null;
      const avvia = () => {
        /* ogni orbe che entra nella pagina (anche via innerHTML) si registra da solo */
        const mo = new MutationObserver(recs => { for (const r of recs) r.addedNodes.forEach(n => { if (n.nodeType !== 1) return; if (n.matches('svg.orbe')) registra(n); else n.querySelectorAll('svg.orbe').forEach(registra); }); });
        mo.observe(document.body, { childList: true, subtree: true });
        document.querySelectorAll('svg.orbe').forEach(registra);
      };
      document.body ? avvia() : document.addEventListener('DOMContentLoaded', avvia);
      window.addEventListener('pointermove', segui, { passive: true });
      document.addEventListener('visibilitychange', () => { if (!document.hidden) riprendi(); });
    }
  }
  /** Sceglie la pelle (perla, grigio, chiaro, alone, disco): vale per tutta la pagina, anche per gli orbi già disegnati. */
  function pelle(nome) {
    if (typeof document === 'undefined') return PELLI[0].id;
    if (nome !== undefined) document.documentElement.dataset.pelle = PELLI.some(p => p.id === nome) ? nome : PELLI[0].id;
    return pelleDi();
  }

  /* ---------- il motore: un solo requestAnimationFrame, funzioni continue del tempo ---------- */
  const ridotto = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vivi = new Map();   // svg → stato vivo
  let io = null, avviato = false, fermoA = null;
  const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
  const ora = () => (performance.now() - t0) / 1000;

  function registra(svg) {
    if (vivi.has(svg) || !svg.isConnected || !svg.classList.contains('orbe')) return;
    const seme = svg.dataset.seme, stato = svg.dataset.stato, p = forma(seme);
    const oc = svg.querySelectorAll('.occhio');
    const v = { svg, p, stato, tutto: svg.querySelector('.tutto'), corpo: svg.querySelector('.corpo'), occhi: svg.querySelector('.occhi'), oS: oc[0], oD: oc[1],
      rng: M.createRng(hash((seme || '') + '#battito')), inizio: -1, visibile: true,
      segue: !!(svg.parentElement && svg.parentElement.hasAttribute('data-segue')), tgx: 0, tgy: 0, fgx: 0, fgy: 0 };
    if (!v.tutto || !v.corpo || !v.oS || !v.oD) return;
    v.prossimo = ora() + 1.2 + v.rng() * 3.4;   // primo battito
    vivi.set(svg, v);
    if (io) io.observe(svg);
    posa(v, fermoA === null ? ora() : fermoA);
    if (!avviato && fermoA === null) { avviato = true; requestAnimationFrame(ciclo); }
  }

  /** Palpebre: 1 aperte … 0,08 chiuse; chiusura svelta e riapertura più lenta, entrambe con easing; ogni tanto un battito doppio. */
  function palpebra(v, t) {
    if (v.inizio < 0 && t >= v.prossimo) v.inizio = v.prossimo;
    if (v.inizio < 0) return 1;
    const k = (t - v.inizio) / 0.24;
    if (k >= 1) { v.inizio = -1; v.prossimo = t + (v.rng() < 0.14 ? 0.3 : 2.8 + v.rng() * 4.4); return 1; }
    const a = k < 0.42 ? 1 - liscia(k / 0.42) : liscia((k - 0.42) / 0.58);
    return 0.08 + 0.92 * a;
  }

  /** La posa dell'orbe al tempo t: tutto continuo, niente scatti. */
  function posa(v, t) {
    const p = v.p, st = v.stato, T = t + p.fase;
    let per = p.periodo, amp = 0.016, tx = 0, ty = 2.2 * rumore(T, 5.7, p.s3), rot = 0, sc = 1, lid = 1, op = 1, apre = 1;
    let gx = 6 * rumore(T, 6.3, p.s1), gy = 4 * rumore(T, 7.9, p.s2);
    if (st === 'lavoro') { per *= 0.72; gx += 11 * Math.sin(TAU * T / 3.4); gy += 1.5 * Math.sin(TAU * T / 1.7); }
    else if (st === 'attesa') { const k = impulso(T, 6.2, 1.9); ty -= 7 * k; gy -= 6 * k; apre = 1 + 0.14 * k; }
    else if (st === 'errore') { sc = 0.975; ty += 4; gx *= 0.5; gy *= 0.5; const k = impulso(T, 7.5, 1.6); rot = 4.5 * k * Math.sin(TAU * (((T % 7.5) + 7.5) % 7.5) / 0.8); op = 0.78 + 0.22 * Math.sin(TAU * T / 2.6); }
    else if (st === 'pianificato') { tx = 5 * Math.sin(TAU * T / 7.2); rot = 2.5 * Math.sin(TAU * T / 7.2); const k = impulso(T, 10.5, 2.2); gx += 8 * k; gy -= 7 * k; }
    else if (st === 'libero') { per *= 1.45; amp = 0.026; ty += 5; lid = 0.32; gx *= 0.5; gy *= 0.5; }
    const respiro = 1 + amp * Math.sin(TAU * T / per);
    if (v.segue) { v.fgx += (v.tgx - v.fgx) * 0.14; v.fgy += (v.tgy - v.fgy) * 0.14; gx += v.fgx; gy += v.fgy; }
    lid *= palpebra(v, t);
    v.tutto.setAttribute('transform', `translate(${r2(tx)} ${r2(ty)}) rotate(${r2(rot)}) scale(${r2(sc)})`);
    v.corpo.setAttribute('transform', `scale(${r2(respiro)})`);
    v.occhi.setAttribute('opacity', r2(op));
    /* proiezione sferica: l'occhio che va verso il bordo si stringe (normalizzata: a riposo scala 1) */
    const base = Math.sqrt(1 - (p.dist / p.r) ** 2);
    const occhio = (el, lato) => {
      const x = lato * p.dist + gx, y = p.alt + gy;
      const sx = Math.max(0.55, Math.sqrt(Math.max(0.05, 1 - (x / p.r) ** 2)) / base);
      el.setAttribute('transform', `translate(${r2(x)} ${r2(y)}) scale(${r2(sx)} ${r2(lid * apre)})`);
    };
    occhio(v.oS, -1); occhio(v.oD, 1);
  }

  function ciclo() {
    if (fermoA !== null) { avviato = false; return; }
    if (!document.hidden) {
      const t = ora();
      for (const [svg, v] of vivi) {
        if (!svg.isConnected) { vivi.delete(svg); if (io) io.unobserve(svg); continue; }
        if (v.visibile) posa(v, t);
      }
    }
    if (vivi.size) requestAnimationFrame(ciclo); else avviato = false;
  }
  /** Ferma tutto al tempo t (per screenshot e pellicola); riprendi() riparte. fotogramma(svg, t) disegna un orbe solo a un istante. */
  function fermo(t) { fermoA = t === undefined ? ora() : t; for (const [svg, v] of vivi) if (svg.isConnected) posa(v, fermoA); return fermoA; }
  function riprendi() { fermoA = null; if (!ridotto && vivi.size && !avviato) { avviato = true; requestAnimationFrame(ciclo); } }
  function fotogramma(svg, t) { const v = vivi.get(svg); if (v) posa(v, t); }

  /* ---------- lo sguardo segue il puntatore (solo [data-segue]) ---------- */
  function segui(ev) {
    for (const [svg, v] of vivi) {
      if (!v.segue) continue;
      const r = svg.getBoundingClientRect(); if (!r.width) continue;
      const dx = (ev.clientX - (r.left + r.width / 2)) / Math.max(r.width * 3, 220);
      const dy = (ev.clientY - (r.top + r.height / 2)) / Math.max(r.height * 3, 220);
      const c = x => Math.max(-1, Math.min(1, x));
      v.tgx = c(dx) * 16; v.tgy = c(dy) * 12;
    }
  }
  function anima(radice) {
    prepara();
    if (ridotto || !radice) return;
    radice.querySelectorAll('svg.orbe').forEach(registra);
  }

  const semi = (ruolo, n) => Array.from({ length: n || 6 }, (_, i) => i ? `${ruolo} ·${i + 1}` : ruolo);

  return { html: (seme, stato) => { prepara(); return html(seme, stato); }, anima, semi, forma, pelle, PELLI, CORNICE, fermo, riprendi, fotogramma, vivi: () => vivi.size };
})();
