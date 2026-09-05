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
      stretch. Un dipendente si distingue dagli occhi e dal riflesso.
   3. «Le animazioni sono scadenti e poco fluide»: via i keyframe CSS (i
      saltelli, i tremiti, le scrollate, le «z»). Un solo requestAnimationFrame
      per pagina muove tutti gli orbi visibili con funzioni continue del tempo
      (seni, rumore periodico, finestre morbide sin²): niente scatti, niente
      pause secche. Base per tutti: respiro (scala uniforme ±1,6 %), leggero
      galleggiamento, sguardo che deriva, battito delle palpebre con easing e
      calendario dal seme. Per stato, un solo moto quieto:
        lavoro       occhi lime, lo sguardo scandisce da un lato all'altro,
                     il respiro è un poco più svelto;
        attesa       occhi gialli più grandi; ogni ~6 s l'orbe si solleva di poco
                     e guarda in alto verso il titolare, poi torna;
        errore       occhi a X rosa che pulsano piano; l'orbe sta un poco più in
                     basso e ogni ~7 s scuote la testa lentamente (±4,5°);
        pianificato  dondola lentamente da un lato all'altro; ogni ~10 s guarda
                     in alto a destra «l'orologio» e torna;
        libero       palpebre chiuse a fessura, respiro profondo e lento,
                     l'orbe si abbassa un poco.
      Fase e periodi dal seme (nessuno in sincrono). Solo gli orbi nel viewport
      si aggiornano (IntersectionObserver); con la scheda nascosta si ferma;
      con prefers-reduced-motion niente si muove (posa di riposo).

   Settima versione (stessa sessione): «preferivo gli occhi del kit di
   riferimento: più grossi e con movimenti più carini». Gli occhi sono ora
   quelli del kit (vendor-avatars, gaze.js), portati dentro l'orbe:
   - la pupilla del kit per il seme (deriveRole: tonda, quadrato morbido o
     anello), grande 0,16–0,185 del raggio (il kit: 0,16; da approvare 0,2;
     al lavoro 0,155 × 0,13; libero fessure 0,145 × 0,02 inclinate di 8°);
   - le pupille sono DIPINTE SULLA SFERA: la stessa base tangente proiettata
     del kit (yaw, pitch, roll ruotano la testa, le due pupille distano
     15,5–19° dal centro), per cui quando lo sguardo va di lato l'occhio
     lontano si stringe e si inclina da solo, e il roll fa piegare la testa;
   - lo stesso repertorio di moti del kit: deriva dello sguardo a due armoniche
     (yaw ±6, pitch ±5, roll ±1,6), scansione ±13° al lavoro, sguardo fisso e
     occhi grandi da approvare, dondolio ±3,5° da fermo, ±2° con le palpebre a
     fessura da libero; il battito è uno schiacciamento verticale attorno al
     centro della pupilla, come nel kit. Il puntatore ruota la testa (±30° yaw,
     ±24° pitch) con inseguimento morbido.
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
  /* ---- l'identità dell'orbe (proposta 2026-09-05, in confronto in avatar-identita.html; spenta di default) ----
     Richiesta dell'utente: «molti avatar vicini, o piccoli in fila, non rendono l'idea di diversi dipendenti: sono tutti
     uguali». Quattro modi, tutti con lo stesso volume della perla (il corpo diventa un colore pieno e sopra ci sta la
     stessa ombreggiatura): tinta assegnata al dipendente (TINTE, a rotazione alla creazione o scelta nell'editor), tinta
     del dipartimento (le quattro tinte già nel modello: indaco, corallo, ambra, verdeacqua), toni di grigio dal seme
     (TONI) e nessuna (la perla di oggi). A parte, gli occhi e il riflesso «con carattere» (forma(seme, true)). */
  /* otto tinte, ognuna in tre palette (seconda tornata, 2026-09-05: «colori più accesi e vivaci»): scura = perle scure della
     prima proposta; vivace = colori pieni e saturi; pastello = chiari e morbidi. `c` è la scura, per compatibilità. */
  const TINTE = [
    { id: 'indaco',     nome: 'Indaco',     scura: '#2F3574', vivace: '#6C6AFF', pastello: '#A3A1FF' },
    { id: 'corallo',    nome: 'Corallo',    scura: '#7A3A2A', vivace: '#FF6A55', pastello: '#FFB09E' },
    { id: 'ambra',      nome: 'Ambra',      scura: '#66531B', vivace: '#FFB52E', pastello: '#FFDC8C' },
    { id: 'verdeacqua', nome: 'Verdeacqua', scura: '#1F5A3F', vivace: '#2BD9B5', pastello: '#A8F0DE' },
    { id: 'prugna',     nome: 'Prugna',     scura: '#4B2A6B', vivace: '#C66CFF', pastello: '#E0B7FF' },
    { id: 'petrolio',   nome: 'Petrolio',   scura: '#174C5F', vivace: '#3AB8FF', pastello: '#A8D8FF' },
    { id: 'bordeaux',   nome: 'Bordeaux',   scura: '#6A2445', vivace: '#FF5BA6', pastello: '#FFB4D5' },
    { id: 'neutro',     nome: 'Grigio',     scura: '#2A2A2A', vivace: '#5A5A5A', pastello: '#9C9C9C' },
  ].map(t => Object.assign(t, { c: t.scura }));
  const PALETTE = [
    { id: 'scura',    nome: 'Scura',    desc: 'Le perle scure della prima proposta: colore appena percepibile, il nero resta il tono dominante.' },
    { id: 'vivace',   nome: 'Vivace',   desc: 'Colori pieni e saturi: la fila si legge al primo sguardo; il lime e il rosa degli stati non sono più i soli colori vivi.' },
    { id: 'pastello', nome: 'Pastello', desc: 'Chiari e morbidi, come le pillole bianche della Console: si staccano dal nero senza urlare.' },
  ];
  const FINITURE = [
    { id: 'perla',  nome: 'Perla',            desc: 'Il volume di oggi: ombreggiatura, riflesso, luce riflessa, orlo di luce e bagliore sopra il colore.' },
    { id: 'piatta', nome: 'Piatta',           desc: 'Un disco di colore pieno, senza volume né luci: come il riferimento, e come i cerchi e le pillole della Console.' },
    { id: 'orlo',   nome: 'Piatta con orlo',  desc: 'Il disco piatto con un orlo scuro sottile, che lo separa dalle superfici dello stesso colore (card lime, pillole chiare).' },
  ];
  const OCCHI = [
    { id: 'kit',      nome: 'Attuali',        desc: 'Le pupille del kit dipinte sulla sfera, piccole e appena sotto il centro.' },
    { id: 'punti',    nome: 'Punti grandi',   desc: 'Le stesse pupille di un solo colore, ma grandi il doppio e all\'altezza del centro, distanti: si leggono anche a 26 px.' },
    { id: 'lilguy',   nome: 'Lilguy',         desc: 'Come il riferimento: occhi grandi un terzo del volto, «bianco» nel colore dello stato (bianco, lime, giallo, rosa) con la pupilla nera; forma dal seme (tondi, ovali, a gatto, a ghianda) e pupilla tonda, a fessura o larga.' },
    { id: 'neri',     nome: 'Neri',           desc: 'Le stesse forme del riferimento ma invertite: occhi neri con la pupilla grande nel colore dello stato. Si vedono su qualunque corpo, anche vivace.' },
    { id: 'colorati', nome: 'Colorati',       desc: 'Il riferimento alla lettera: occhi nel colore del dipendente sul corpo nero, pupilla nel colore dello stato. L\'identità passa dagli occhi, il corpo resta la perla nera.' },
  ];
  const TONI = [
    { id: 'nero',    c: '#2A2A2A', nome: 'Perla nera' },
    { id: 'grafite', c: '#404040', nome: 'Grafite' },
    { id: 'piombo',  c: '#565656', nome: 'Piombo' },
    { id: 'argento', c: '#6E6E6E', nome: 'Argento' },
  ];
  const IDENTITA = [
    { id: 'nessuna',      nome: 'Oggi: una perla sola',     desc: 'Tutti gli orbi hanno lo stesso corpo nero lucido; un dipendente si distingue solo dagli occhi e dal riflesso, che a 26–32 px non si vedono.' },
    { id: 'tinta',        nome: 'Perle colorate',            desc: 'Ogni dipendente ha la sua perla: otto tinte scure della stessa famiglia (indaco, corallo, ambra, verdeacqua, prugna, petrolio, bordeaux, nera), assegnate a rotazione alla creazione, cambiabili nell\'editor. Il volume, le luci e l\'orlo restano quelli della perla; gli occhi di stato restano il segnale.' },
    { id: 'dipartimento', nome: 'La tinta del dipartimento', desc: 'Quattro perle, una per dipartimento, con le tinte già nel modello: indaco Sviluppo, corallo Marketing, ambra Vendite, verdeacqua Amministrazione. Il colore dice qualcosa; dentro un dipartimento gli orbi restano uguali.' },
    { id: 'toni',         nome: 'Toni di perla',             desc: 'Niente colore: quattro perle dal nero al grigio argento, dal seme. Resta dentro il sistema a un solo accento, ma distingue meno e le più chiare abbassano il contrasto degli occhi bianchi.' },
  ];
  const r2 = M.r2;
  const pelleDi = () => (typeof document !== 'undefined' && document.documentElement.dataset.pelle) || PELLI[0].id;

  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /** Rumore periodico 1D in [-1, 1]: tre seni in rapporto armonico, quindi continuo e senza cuciture (come loopNoise del kit). */
  const rumore = (t, per, seme) => { const p = t / per * TAU; return 0.55 * Math.sin(p + seme) + 0.3 * Math.sin(2 * p + seme * 1.7 + 1.1) + 0.15 * Math.sin(3 * p + seme * 2.3 + 2.4); };
  /** Finestra morbida: ogni `per` secondi un impulso lungo `dur`, che sale e scende come sin² (mai uno scatto). */
  const impulso = (t, per, dur) => { const f = ((t % per) + per) % per; if (f >= dur) return 0; const s = Math.sin(Math.PI * f / dur); return s * s; };
  const liscia = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);

  /** I parametri dell'orbe dal seme: tutti cerchi, si distinguono per gli occhi (la pupilla del kit) e per il riflesso.
      Con `car` («carattere», proposta 2026-09-05) le stesse estrazioni coprono intervalli più larghi (occhi grandi o
      piccoli, vicini o distanti, alti o bassi) e due estrazioni in più danno la forma degli occhi e il riflesso;
      fase, periodi e semi del rumore restano quelli di prima. */
  function forma(seme, car) {
    const chiave = (seme || 'dipendente').trim().toLowerCase();
    const rng = M.createRng(hash(chiave));
    rng(); rng(); rng();   // (i tre estratti della vecchia forma, per tenere fase e periodi di prima)
    const r = 95 + rng() * 5;                        // raggio del cerchio
    const pupilla = M.deriveRole(chiave).pupil;      // dot | square | ring: la stessa pupilla del kit per questo seme
    const eSplit = rng(), ePitch = rng(), eMisura = rng(), eLuce = rng();
    const p = {
      r, pupilla,
      split: car ? 12.5 + eSplit * 9 : 15.5 + eSplit * 3.5,      // semi-distanza delle pupille sulla sfera, in gradi (il kit: 17)
      pitch: car ? -12 + ePitch * 13 : -7 + ePitch * 5,          // sguardo di riposo: mento appena basso, come il kit (-6)
      misura: car ? 0.13 + eMisura * 0.085 : 0.16 + eMisura * 0.025,   // raggio della pupilla in frazione del raggio (il kit: 0,16)
      luce: -36 + eLuce * 12,               // dove sta il riflesso
      fase: rng() * 40,                     // nessun orbe in sincrono con un altro
      periodo: 4.6 + rng() * 1.6,           // respiro
      s1: rng() * TAU, s2: rng() * TAU, s3: rng() * TAU,   // semi del rumore
      ratio: 1, luceR: 0.3, luceA: -30, car: !!car,       // forma degli occhi (alti/larghi) e misura e angolo del riflesso
    };
    if (car) { p.ratio = 0.78 + rng() * 0.42; p.luceR = 0.22 + rng() * 0.18; p.luceA = -52 + rng() * 34; }
    /* gli occhi grandi del riferimento (stili punti, lilguy, neri, colorati): forma del «bianco», pupilla, misura, inclinazione */
    const lg = M.createRng(hash(chiave + '#lilguy'));
    const f = lg(), q = lg();
    p.lgForma = f < 0.4 ? 'cerchio' : f < 0.65 ? 'ovale' : f < 0.85 ? 'gatto' : 'ghianda';
    p.lgPup = q < 0.5 ? 'tonda' : q < 0.8 ? 'fessura' : 'larga';
    p.lgMis = 0.29 + lg() * 0.05;            // raggio dell'occhio in frazione del raggio del corpo (il riferimento: circa un terzo)
    p.lgPupMis = 0.36 + lg() * 0.16;         // raggio della pupilla in frazione dell'occhio
    p.lgTilt = 9 + lg() * 7;                 // inclinazione degli occhi a gatto
    p.lgSplit = 23 + lg() * 2.5;             // semi-distanza degli occhi grandi, in gradi (sin → 0,39–0,43 del raggio)
    p.occhi = 'kit';
    return p;
  }
  const GRANDI = { punti: 1, lilguy: 1, neri: 1, colorati: 1 };
  const famLG = p => p.occhi === 'lilguy' || p.occhi === 'neri' || p.occhi === 'colorati';
  /** La geometria degli occhi per stile: le pupille del kit stanno appena sotto il centro; quelli grandi al centro e più distanti. */
  const geom = p => GRANDI[p.occhi] ? { split: p.occhi === 'punti' ? 20 + (p.split - 15.5) * 0.6 : p.lgSplit, pitch: 0 } : { split: p.split, pitch: p.pitch };
  /** Posizione degli occhi grandi sul disco: piana, la coppia scivola un poco verso lo sguardo (come il widget del riferimento) e ruota col roll. */
  function posaPiana(g, R, split) {
    const sx = Math.sin(deg(split)) * R, dx = g.yaw / 30 * 0.06 * R, dy = -g.pitch / 30 * 0.06 * R;
    const c = Math.cos(deg(g.roll)), s = Math.sin(deg(g.roll));
    const mk = lato => { const x0 = sx * lato + dx, y0 = dy; return { x: x0 * c - y0 * s, y: x0 * s + y0 * c, a: c, b: s, c: -s, d: c, depth: 1 }; };
    return [mk(-1), mk(1)];
  }
  const posaOcchiDi = (p, g) => famLG(p) ? posaPiana(g, p.r, geom(p).split) : posaOcchi(g, p.r, geom(p).split);
  /** Lo spostamento della pupilla dentro l'occhio grande (spazio unitario dell'occhio), dallo sguardo. */
  const pupillaXY = (p, g) => { const c = x => Math.max(-1, Math.min(1, x)); const r = (1 - p.lgPupMis) * 0.72; return [c(g.yaw / 30) * r, c(-g.pitch / 30) * r]; };
  const SCLERA = { cerchio: null, ovale: null, gatto: null, ghianda: 'M0 -1.18C.62 -1.02 1 -.42 1 .18C1 .78 .58 1 0 1C-.58 1 -1 .78 -1 .18C-1 -.42 -.62 -1.02 0 -1.18Z' };

  /* ---------- gli occhi del kit: pupille dipinte su una sfera (base tangente proiettata in ortografico) ---------- */
  const deg = d => d * Math.PI / 180;
  function spin(u, v, a) { const c = Math.cos(a), s = Math.sin(a); return [[u[0] * c + v[0] * s, u[1] * c + v[1] * s, u[2] * c + v[2] * s], [v[0] * c - u[0] * s, v[1] * c - u[1] * s, v[2] * c - u[2] * s]]; }
  /** Posizione e base tangente delle due pupille per una posa di sguardo (yaw, pitch, roll in gradi). x a destra, y in basso. */
  function posaOcchi(g, R, split) {
    let f = [0, 0, 1], right = [1, 0, 0], down = [0, 1, 0];
    [f, right] = spin(f, right, deg(g.yaw));
    [down, f] = spin(down, f, deg(g.pitch));
    [right, down] = spin(right, down, deg(g.roll));
    const build = lato => { const [ef, er] = spin(f, right, deg(split * lato)); return { x: ef[0] * R, y: ef[1] * R, a: er[0], b: er[1], c: down[0], d: down[1], depth: ef[2] }; };
    return [build(-1), build(1)];
  }
  /** La matrice di una pupilla: base tangente × misura (w, h in frazione del raggio) × inclinazione × battito k (schiacciamento verticale, come nel kit). */
  function matrice(e, w, h, tilt, k, R) {
    const phi = deg(tilt), cp = Math.cos(phi), sp = Math.sin(phi);
    const ax = e.a * cp + e.c * sp, ay = e.b * cp + e.d * sp, cx2 = -e.a * sp + e.c * cp, cy2 = -e.b * sp + e.d * cp;
    return `matrix(${r2(ax * w * R)} ${r2(ay * w * R * k)} ${r2(cx2 * h * R)} ${r2(cy2 * h * R * k)} ${r2(e.x)} ${r2(e.y)})`;
  }
  /** Misura e inclinazione delle pupille per stato (rapporti del kit). */
  function occhiConf(p, stato) {
    if (famLG(p)) {
      /* gli occhi grandi: il bianco ha la forma del seme; da approvare crescono, da libero si chiudono a fessura (tutto l'occhio si schiaccia) */
      const e = p.lgMis, sh = p.lgForma === 'ovale' ? 1.15 : p.lgForma === 'gatto' ? 1.2 : 1, sw = p.lgForma === 'gatto' ? 0.9 : 1;
      const tilt = p.lgForma === 'gatto' ? [p.lgTilt, -p.lgTilt] : [0, 0];
      if (stato === 'attesa') return { w: e * sw * 1.15, h: e * sh * 1.15, tilt };
      if (stato === 'libero') return { w: e * sw, h: e * sh * 0.4, tilt };
      return { w: e * sw, h: e * sh, tilt };
    }
    const m = p.misura * (p.pupilla === 'ring' ? 1.12 : 1) * (p.occhi === 'punti' ? 1.75 : 1), q = p.ratio || 1;
    if (stato === 'lavoro') return { w: m * 0.97, h: m * 0.82 * q, tilt: [0, 0] };
    if (stato === 'attesa') return { w: m * 1.25, h: m * 1.25 * q, tilt: [0, 0] };
    if (stato === 'libero') return { w: m * 0.9, h: 0.028, tilt: [8, -8] };
    if (stato === 'errore') return { w: m * 1.1, h: m * 1.1, tilt: [0, 0] };
    return { w: m, h: m * q, tilt: [0, 0] };
  }
  /** Lo sguardo di riposo per stato (senza vita): quello del markup e degli screenshot. */
  const sguardoRiposo = (p, stato) => ({ yaw: 0, pitch: geom(p).pitch + (stato === 'lavoro' ? 3 : stato === 'libero' ? -3 : 0), roll: 0 });

  /** La tinta di un dipendente: per id ('indaco'), per indice (a rotazione: il modello assegna la meno usata alla creazione) o dal seme. */
  const tintaDi = x => typeof x === 'number' ? TINTE[((Math.round(x) % TINTE.length) + TINTE.length) % TINTE.length] : TINTE.find(t => t.id === x) || null;
  const tonoDi = x => typeof x === 'number' ? TONI[((Math.round(x) % TONI.length) + TONI.length) % TONI.length] : TONI.find(t => t.id === x) || null;
  const chiaveDi = seme => (seme || 'dipendente').trim().toLowerCase();
  const tintaSeme = (seme, scelta) => (scelta !== undefined && scelta !== null && tintaDi(scelta)) || TINTE[hash(chiaveDi(seme) + '#tinta') % TINTE.length];
  const tonoSeme = (seme, scelta) => ((scelta !== undefined && scelta !== null && tonoDi(scelta)) || TONI[hash(chiaveDi(seme) + '#tono') % TONI.length]).c;
  const fra = (lista, id, pred) => lista.some(x => x.id === id) ? id : pred;

  /** Il markup dell'orbe: un <svg> inline nella posa di riposo; il motore sotto lo muove. Colori e volume della pelle stanno nel CSS (variabili --av-*). */
  /** opz (facoltativo, proposta 2026-09-05): identita 'nessuna'|'tinta'|'dipartimento'|'toni' (predefinito: quello della
      pagina, html[data-identita]); carattere true/false (predefinito: html[data-carattere]); tinta = id o indice in TINTE
      (predefinito: dal seme); tono = id o indice in TONI; dip = nome della tinta del dipartimento. */
  function html(seme, stato, opz) {
    opz = opz || {};
    const ds = typeof document !== 'undefined' ? document.documentElement.dataset : {};
    const car = opz.carattere !== undefined ? !!opz.carattere : ds.carattere === '1';
    const modo = opz.identita !== undefined ? opz.identita : (ds.identita || 'nessuna');
    const palette = fra(PALETTE, opz.palette !== undefined ? opz.palette : ds.palette, 'scura');
    const finitura = fra(FINITURE, opz.finitura !== undefined ? opz.finitura : ds.finitura, 'perla');
    const stile = fra(OCCHI, opz.occhi !== undefined ? opz.occhi : ds.occhi, 'kit');
    const p = forma(seme, car); p.occhi = stile;
    const volto = VOLTO[stato] || VOLTO.libero;
    const o = occhiConf(p, stato), poses = posaOcchiDi(p, sguardoRiposo(p, stato));
    const X = `<rect x="-.9" y="-.2" width="1.8" height=".4" rx=".2" transform="rotate(45)"/><rect x="-.9" y="-.2" width="1.8" height=".4" rx=".2" transform="rotate(-45)"/>`;
    let occhio;
    if (famLG(p)) {
      /* gli occhi grandi: il «bianco» (sclera) in spazio unitario e dentro la pupilla, che si sposta con lo sguardo; le X dell'errore al posto della pupilla */
      const pm = p.lgPupMis;
      const pup = stato === 'errore' ? `<g transform="scale(${r2(pm * 1.15)})">${X}</g>`
        : p.lgPup === 'fessura' ? `<ellipse rx="${r2(pm * 0.42)}" ry="${r2(pm * 1.05)}"/>`
        : p.lgPup === 'larga' ? `<ellipse rx="${r2(pm * 1.05)}" ry="${r2(pm * 0.68)}"/>` : `<circle r="${r2(pm)}"/>`;
      const sclera = SCLERA[p.lgForma] ? `<path class="sclera" d="${SCLERA[p.lgForma]}"/>` : `<circle class="sclera" r="1"/>`;
      occhio = i => `<g class="occhio lg" transform="${matrice(poses[i], o.w, o.h, o.tilt[i], 1, p.r)}">${sclera}<g class="pupilla">${pup}</g></g>`;
    } else {
      /* la pupilla del kit in spazio unitario (raggio 1): la matrice la porta a misura; le X dell'errore sono due tacche 1,8 × 0,4 */
      const dentro = stato === 'errore' ? X : `<path d="${p.pupilla === 'square' ? M.UNIT_SQUARE : M.UNIT_CIRCLE}"/>`;
      const anello = p.pupilla === 'ring' && stato !== 'errore' && stato !== 'libero';
      occhio = i => `<g class="occhio${anello ? ' anello' : ''}" transform="${matrice(poses[i], o.w, o.h, o.tilt[i], 1, p.r)}">${dentro}</g>`;
    }
    /* --volto colore degli occhi (i neutri leggono --av-occhi-neutri: neri sul corpo chiaro), --bordo-c contorno nero (in spazio unitario) se l'occhio è colorato sul corpo chiaro */
    const neutro = volto === '#FCFCFC';
    const tinta = tintaSeme(seme, opz.tinta);
    const vars = `--volto:${neutro ? 'var(--av-occhi-neutri,#FCFCFC)' : volto};--bordo-c:${neutro ? 0 : 0.25};--av-tono:${tonoSeme(seme, opz.tono)}`;
    const attrs = (modo && modo !== 'nessuna' ? ` data-modo="${modo}"` : '') + ` data-tinta="${tinta.id}"` + (opz.dip ? ` data-dip="${String(opz.dip).replace(/"/g, '&quot;')}"` : '')
      + (palette !== 'scura' ? ` data-palette="${palette}"` : '') + (finitura !== 'perla' ? ` data-finitura="${finitura}"` : '') + (stile !== 'kit' ? ` data-occhi="${stile}"` : '') + (car ? ' data-carattere="1"' : '');
    const lx = r2(p.luce), ly = r2(-0.42 * p.r);
    return `<svg class="ava orbe ${stato}" viewBox="${VIEWBOX}" aria-hidden="true" focusable="false" style="${vars}" data-seme="${String(seme || '').replace(/"/g, '&quot;')}" data-stato="${stato}"${attrs}>`
      + `<circle class="alone" r="122"/>`
      + `<g class="tutto">`
      + `<circle class="bagliore" r="${r2(p.r + 9)}"/>`
      + `<g class="corpo"><circle class="pelle" r="${r2(p.r)}"/><circle class="ombra" r="${r2(p.r)}"/><circle class="orlo" r="${r2(p.r)}"/>`
      + `<ellipse class="luce" cx="${lx}" cy="${ly}" rx="${r2(p.r * p.luceR)}" ry="${r2(p.r * p.luceR * 0.57)}" transform="rotate(${r2(p.luceA)} ${lx} ${ly})"/>`
      + `<ellipse class="riflesso" cx="0" cy="${r2(p.r * 0.66)}" rx="${r2(p.r * 0.5)}" ry="${r2(p.r * 0.16)}"/></g>`
      + `<g class="occhi">${occhio(0)}${occhio(1)}</g>`
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
.ava.orbe .occhio path,.ava.orbe .occhio rect{fill:var(--volto);stroke:#0A0A0A;stroke-width:calc(var(--bordo-c,0) * var(--av-c-bordo,var(--av-bordo,0)));paint-order:stroke}
.ava.orbe .occhio.anello path{fill:none;stroke:var(--volto);stroke-width:.34;paint-order:normal}
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
/* ---- l'identità (proposta 2026-09-05, opzionale): data-modo sull'SVG, dato da identita() o da html(seme, stato, {identita}).
   Il corpo diventa un colore pieno (--av-base) e sopra ci sta la stessa ombreggiatura della perla (gradiente bianco → nero
   trasparente): volume, luci, orlo e bagliore restano quelli. Tinta del dipendente (--av-tinta, inline: dal seme o assegnata),
   tono di grigio (--av-tono, inline), tinta del dipartimento (data-dip = nome della tinta). ---- */
.ava.orbe .corpo>.ombra{display:none;fill:url(#av-orbe-ombra)}
svg.ava.orbe[data-modo] .corpo>.ombra{display:block}
svg.ava.orbe[data-modo] .corpo>.pelle{fill:var(--av-base,#2A2A2A)}
svg.ava.orbe[data-modo="tinta"]{--av-base:var(--av-tinta-c)}
svg.ava.orbe[data-modo="toni"]{--av-base:var(--av-tono)}
svg.ava.orbe[data-modo="dipartimento"]{--av-base:var(--av-dip-c,#2A2A2A)}
/* il colore della tinta (--av-tinta-c) e del dipartimento (--av-dip-c) per palette: scura senza attributo, vivace e pastello con data-palette */
${PALETTE.map(pl => TINTE.map(t => `svg.ava.orbe${pl.id === 'scura' ? ':not([data-palette])' : `[data-palette="${pl.id}"]`}[data-tinta="${t.id}"]{--av-tinta-c:${t[pl.id]}}svg.ava.orbe${pl.id === 'scura' ? ':not([data-palette])' : `[data-palette="${pl.id}"]`}[data-dip="${t.id}"]{--av-dip-c:${t[pl.id]}}`).join('\n')).join('\n')}
/* ---- la finitura: piatta = un disco di colore pieno senza volume né luci; orlo = piatta con un orlo scuro sottile ---- */
svg.ava.orbe[data-finitura] .corpo>.ombra,svg.ava.orbe[data-finitura] .corpo>.luce,svg.ava.orbe[data-finitura] .corpo>.riflesso,svg.ava.orbe[data-finitura] .bagliore{display:none}
svg.ava.orbe[data-finitura] .corpo>.orlo{stroke:none}
svg.ava.orbe[data-finitura]:not([data-modo]) .corpo>.pelle{fill:#1E1E1E}
svg.ava.orbe[data-finitura="orlo"] .corpo>.orlo{stroke:rgb(0 0 0/.3);stroke-width:5}
/* ---- gli occhi grandi (stili lilguy, neri, colorati): sclera e pupilla dai colori dello stile; un contorno sottile alla sclera perché si legga su ogni corpo ---- */
.ava.orbe .occhio.lg .sclera{fill:var(--sclera,var(--volto));stroke:#0A0A0A;stroke-width:var(--av-sclera-bordo,.07);paint-order:stroke}
.ava.orbe .occhio.lg .pupilla circle,.ava.orbe .occhio.lg .pupilla ellipse,.ava.orbe .occhio.lg .pupilla rect{fill:var(--pupilla,#0A0A0A);stroke:none}
svg.ava.orbe[data-occhi="lilguy"]{--sclera:var(--volto);--pupilla:#0A0A0A}
svg.ava.orbe[data-occhi="neri"]{--sclera:#0A0A0A;--pupilla:var(--volto);--av-sclera-bordo:0}
svg.ava.orbe[data-occhi="colorati"]{--sclera:var(--av-tinta-c,#FCFCFC);--pupilla:var(--volto)}
svg.ava.orbe[data-occhi="colorati"].errore{--pupilla:#F9A3A3}
/* i punti grandi su un corpo colorato: un contorno sottile perché bianco e rosa si leggano anche sulle tinte chiare */
svg.ava.orbe[data-occhi="punti"][data-modo] .occhio path,svg.ava.orbe[data-occhi="punti"][data-modo] .occhio rect{stroke:#0A0A0A;stroke-width:.14;paint-order:stroke}
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
<radialGradient id="av-orbe-ombra" cx="34%" cy="26%" r="84%"><stop offset="0" stop-color="#FCFCFC" stop-opacity=".38"/><stop offset=".28" stop-color="#FCFCFC" stop-opacity=".08"/><stop offset=".62" stop-color="#050505" stop-opacity=".5"/><stop offset="1" stop-color="#050505" stop-opacity=".85"/></radialGradient>
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

  /** Il modo dell'identità (nessuna, tinta, dipartimento, toni): diventa il predefinito della pagina (html[data-identita])
      e si applica subito agli orbi già disegnati dentro `radice` (tutto il documento se manca). */
  function identita(nome, radice) {
    if (typeof document === 'undefined') return 'nessuna';
    if (nome !== undefined) {
      const id = IDENTITA.some(x => x.id === nome) ? nome : 'nessuna';
      document.documentElement.dataset.identita = id;
      (radice || document).querySelectorAll('svg.orbe').forEach(s => { if (id === 'nessuna') delete s.dataset.modo; else s.dataset.modo = id; });
    }
    return document.documentElement.dataset.identita || 'nessuna';
  }
  /** L'aspetto della pagina in un colpo: { identita, palette, finitura, occhi, carattere }. Palette e finitura si applicano subito agli orbi
      in `radice` (sono attributi); lo stile degli occhi e il carattere cambiano il markup e valgono per gli orbi disegnati da qui in avanti. */
  function aspetto(o, radice) {
    if (typeof document === 'undefined') return {};
    const ds = document.documentElement.dataset;
    if (o) {
      if (o.identita !== undefined) identita(o.identita, radice);
      if (o.palette !== undefined) { ds.palette = fra(PALETTE, o.palette, 'scura'); (radice || document).querySelectorAll('svg.orbe').forEach(s => { if (ds.palette === 'scura') delete s.dataset.palette; else s.dataset.palette = ds.palette; }); }
      if (o.finitura !== undefined) { ds.finitura = fra(FINITURE, o.finitura, 'perla'); (radice || document).querySelectorAll('svg.orbe').forEach(s => { if (ds.finitura === 'perla') delete s.dataset.finitura; else s.dataset.finitura = ds.finitura; }); }
      if (o.occhi !== undefined) ds.occhi = fra(OCCHI, o.occhi, 'kit');
      if (o.carattere !== undefined) ds.carattere = o.carattere ? '1' : '0';
    }
    return { identita: ds.identita || 'nessuna', palette: ds.palette || 'scura', finitura: ds.finitura || 'perla', occhi: ds.occhi || 'kit', carattere: ds.carattere === '1' };
  }
  /** Gli occhi e il riflesso «con carattere» per gli orbi disegnati da qui in avanti (quelli già in pagina vanno ridisegnati). */
  function carattere(on) {
    if (typeof document === 'undefined') return false;
    if (on !== undefined) document.documentElement.dataset.carattere = on ? '1' : '0';
    return document.documentElement.dataset.carattere === '1';
  }

  /* ---------- il motore: un solo requestAnimationFrame, funzioni continue del tempo ---------- */
  const ridotto = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vivi = new Map();   // svg → stato vivo
  let io = null, avviato = false, fermoA = null;
  const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
  const ora = () => (performance.now() - t0) / 1000;

  function registra(svg) {
    if (vivi.has(svg) || !svg.isConnected || !svg.classList.contains('orbe')) return;
    const seme = svg.dataset.seme, stato = svg.dataset.stato, p = forma(seme, svg.dataset.carattere === '1');
    p.occhi = fra(OCCHI, svg.dataset.occhi, 'kit');
    const oc = svg.querySelectorAll('.occhio');
    const v = { svg, p, stato, tutto: svg.querySelector('.tutto'), corpo: svg.querySelector('.corpo'), occhi: svg.querySelector('.occhi'), oS: oc[0], oD: oc[1],
      rng: M.createRng(hash((seme || '') + '#battito')), inizio: -1, visibile: true,
      segue: !!(svg.parentElement && svg.parentElement.hasAttribute('data-segue')), tyaw: 0, tpit: 0, fyaw: 0, fpit: 0 };
    if (!v.tutto || !v.corpo || !v.oS || !v.oD) return;
    v.prossimo = ora() + 1.2 + v.rng() * 3.4;   // primo battito
    vivi.set(svg, v);
    if (io) io.observe(svg);
    posa(v, fermoA === null ? ora() : fermoA);
    if (!avviato && fermoA === null) { avviato = true; requestAnimationFrame(ciclo); }
  }

  /** Palpebre: 1 aperte … 0 chiuse; chiusura svelta e riapertura più lenta, entrambe con easing; ogni tanto un battito doppio. */
  function palpebra(v, t) {
    if (v.inizio < 0 && t >= v.prossimo) v.inizio = v.prossimo;
    if (v.inizio < 0) return 1;
    const k = (t - v.inizio) / 0.24;
    if (k >= 1) { v.inizio = -1; v.prossimo = t + (v.rng() < 0.14 ? 0.3 : 2.8 + v.rng() * 4.4); return 1; }
    return k < 0.42 ? 1 - liscia(k / 0.42) : liscia((k - 0.42) / 0.58);
  }

  /** La posa dell'orbe al tempo t: tutto continuo, niente scatti. Lo sguardo è quello del kit: yaw, pitch, roll della testa. */
  function posa(v, t) {
    const p = v.p, st = v.stato, T = t + p.fase;
    let per = p.periodo, amp = 0.016, tx = 0, ty = 2.2 * rumore(T, 5.7, p.s3), rot = 0, sc = 1, op = 1, apre = 1;
    let yaw = 0, pitch = p.pitch, roll = 0, deriva = 1, batte = true;
    const o = occhiConf(p, st);
    if (st === 'lavoro') { per *= 0.72; yaw = Math.sin(TAU * T / 1.8) * 13; pitch += 3; deriva = 0.35; }
    else if (st === 'attesa') { deriva = 0.2; const g = impulso(T, 6.2, 1.9); ty -= 7 * g; pitch += 12 * g; apre = 1 + 0.12 * g; }
    else if (st === 'errore') { sc = 0.975; ty += 4; deriva = 0; batte = false; const g = impulso(T, 7.5, 1.6); rot = 4.5 * g * Math.sin(TAU * (((T % 7.5) + 7.5) % 7.5) / 0.8); op = 0.78 + 0.22 * Math.sin(TAU * T / 2.6); }
    else if (st === 'pianificato') { tx = 5 * Math.sin(TAU * T / 7.2); rot = 2.5 * Math.sin(TAU * T / 7.2); yaw = Math.sin(TAU * T / 4) * 3.5; pitch += Math.sin(TAU * T / 2) * 1.5; const g = impulso(T, 10.5, 2.2); yaw += 14 * g; pitch += 10 * g; }
    else if (st === 'libero') { per *= 1.45; amp = 0.026; ty += 5; yaw = Math.sin(TAU * T / 3) * 2; pitch -= 3; deriva = 0; batte = false; }
    /* la vita del kit: deriva dello sguardo a due armoniche e un roll leggero */
    yaw += (rumore(T, 10.7, p.s1) * 4.8 + rumore(T, 3.9, p.s2) * 1.4) * deriva;
    pitch += (rumore(T, 8.7, p.s2) * 3.6 + rumore(T, 4.7, p.s3) * 1.1) * deriva;
    roll += rumore(T, 12.9, p.s3) * 1.6 * deriva;
    if (v.segue) { v.fyaw += (v.tyaw - v.fyaw) * 0.14; v.fpit += (v.tpit - v.fpit) * 0.14; yaw += v.fyaw; pitch += v.fpit; }
    const k = batte ? 0.08 + 0.92 * palpebra(v, t) : 1;
    const respiro = 1 + amp * Math.sin(TAU * T / per);
    v.tutto.setAttribute('transform', `translate(${r2(tx)} ${r2(ty)}) rotate(${r2(rot)}) scale(${r2(sc)})`);
    v.corpo.setAttribute('transform', `scale(${r2(respiro)})`);
    v.occhi.setAttribute('opacity', r2(op));
    const g = { yaw, pitch, roll }, poses = posaOcchiDi(p, g);
    v.oS.setAttribute('transform', matrice(poses[0], o.w * apre, o.h * apre, o.tilt[0], k, p.r));
    v.oD.setAttribute('transform', matrice(poses[1], o.w * apre, o.h * apre, o.tilt[1], k, p.r));
    if (famLG(p)) {
      /* la pupilla scivola dentro l'occhio grande verso lo sguardo (spazio unitario dell'occhio) */
      const [px, py] = pupillaXY(p, g), tr = `translate(${r2(px)} ${r2(py)})`;
      if (!v.pS) { v.pS = v.oS.querySelector('.pupilla'); v.pD = v.oD.querySelector('.pupilla'); }
      if (v.pS) v.pS.setAttribute('transform', tr);
      if (v.pD) v.pD.setAttribute('transform', tr);
    }
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

  /* ---------- lo sguardo segue il puntatore (solo [data-segue]): la testa ruota, come nel kit ---------- */
  function segui(ev) {
    for (const [svg, v] of vivi) {
      if (!v.segue) continue;
      const r = svg.getBoundingClientRect(); if (!r.width) continue;
      const dx = (ev.clientX - (r.left + r.width / 2)) / Math.max(r.width * 4, 260);
      const dy = (ev.clientY - (r.top + r.height / 2)) / Math.max(r.height * 4, 260);
      const c = x => Math.max(-1, Math.min(1, x));
      v.tyaw = c(dx) * 30; v.tpit = c(-dy) * 24;
    }
  }
  function anima(radice) {
    prepara();
    if (ridotto || !radice) return;
    radice.querySelectorAll('svg.orbe').forEach(registra);
  }

  const semi = (ruolo, n) => Array.from({ length: n || 6 }, (_, i) => i ? `${ruolo} ·${i + 1}` : ruolo);

  return { html: (seme, stato, opz) => { prepara(); return html(seme, stato, opz); }, anima, semi, forma, pelle, PELLI, identita, carattere, aspetto, IDENTITA, PALETTE, FINITURE, OCCHI, TINTE, TONI, tintaDi, tonoDi, CORNICE, fermo, riprendi, fotogramma, vivi: () => vivi.size };
})();
