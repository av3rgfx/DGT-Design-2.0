/* =====================================================================
   DGT — costruzione del logo (giochi di lettere su D, G, T)
   Le lettere sono ricostruite in unità del font Urbanist (2000/em, altezza
   delle maiuscole 1400) al peso 600: asta 208, D = asta + mezzo cerchio
   di raggio 700, G = cerchio di raggio 700 aperto in alto a destra (40°)
   con la barra, T = traversa 1099 + asta. Ogni variante è un solo
   <path> a riempimento non-zero: tutte le sottotracce girano nello stesso
   verso, così le parti che si sovrappongono si fondono in una forma sola.
   Script classico: `window.DGT_LOGO` nel browser, `module.exports` in Node.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DGT_LOGO = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  const H = 1400;              // altezza delle maiuscole
  const R = 700;               // raggio esterno del cerchio (D e G sono lo stesso cerchio)
  const TR = 240;              // spaziatura .12em (come il logo di testo di oggi)
  const f = n => (Math.round(n * 10) / 10).toString();
  const rad = a => a * Math.PI / 180;

  /* primitive: tutte percorse in senso antiorario (y verso l'alto) */
  const rect = (x, y, w, h) => `M${f(x)} ${f(y)}H${f(x + w)}V${f(y + h)}H${f(x)}Z`;
  const pt = (cx, cy, r, a) => `${f(cx + r * Math.cos(rad(a)))} ${f(cy + r * Math.sin(rad(a)))}`;
  /* settore di corona circolare da a a b (gradi, antiorario), raggi r e Rr */
  const sector = (cx, cy, r, Rr, a, b) => {
    const big = (b - a) > 180 ? 1 : 0;
    return `M${pt(cx, cy, Rr, a)}A${f(Rr)} ${f(Rr)} 0 ${big} 1 ${pt(cx, cy, Rr, b)}L${pt(cx, cy, r, b)}A${f(r)} ${f(r)} 0 ${big} 0 ${pt(cx, cy, r, a)}Z`;
  };

  /* --- lettere: restituiscono {d, x0, x1} nelle coordinate date --- */
  /* D: asta a sinistra, tratti piatti sopra e sotto lunghi 463, mezzo cerchio a destra */
  function D(x, s) {
    const cx = x + 463;
    return { d: rect(x, 0, s, H) + rect(x, 0, 465, s) + rect(x, H - s, 465, s) + sector(cx, R, R - s, R, -90, 90), x0: x, x1: cx + R, cx };
  }
  /* G: corona da `ap` (apertura) fino a 360°, barra che entra da destra a metà altezza */
  function G(cx, s, ap, barra) {
    const tb = Math.round(s * 0.88);
    return { d: sector(cx, R, R - s, R, ap, 360) + rect(cx + R - (barra || 542), R - tb, (barra || 542), tb), x0: cx - R, x1: cx + R, cx };
  }
  /* T: traversa e asta centrata */
  function T(x, s, w) {
    w = w || 1099;
    return { d: rect(x, H - s, w, s) + rect(x + w / 2 - s / 2, 0, s, H - s + 2), x0: x, x1: x + w, cx: x + w / 2 };
  }

  /* --- varianti --- */
  const V = {};

  /* 0 · Oggi: le tre lettere come stanno nel logo di testo (Urbanist 600, .12em) */
  V.oggi = (s = 208) => {
    const d = D(120, s);
    const g = G(d.x1 + 60 + TR + 80 + R, s, 40);
    const t = T(g.x1 + 80 + TR + 80, s);
    return { d: d.d + g.d + t.d, x0: d.x0, x1: t.x1 };
  };

  /* 1 · Filo: l'arco della G prosegue dritto e diventa la traversa della T */
  V.filo = (s = 208, gap = 200) => {
    const d = D(120, s);
    const g = G(d.x1 + 60 + TR + 80 + R, s, 90);          // la G finisce nel suo punto più alto
    const asta = g.x1 + gap;                               // asta della T dopo la barra della G
    const cxT = asta + s / 2;
    const fine = cxT + 549.5;
    const t = rect(g.cx, H - s, fine - g.cx, s) + rect(asta, 0, s, H - s + 2);
    return { d: d.d + g.d + t, x0: d.x0, x1: fine, cerchi: [d.cx, g.cx], asta: cxT };
  };

  /* 2 · Tetto: una sola traversa sopra D, G e T (scartata: la D perde la spalla tonda; resta per il confronto) */
  V.tetto = (s = 208, gap = 200) => {
    const d = D(120, s);
    const g = G(d.x1 + 60 + TR + 80 + R, s, 90);
    const asta = g.x1 + gap;
    const cxT = asta + s / 2;
    const fine = cxT + 549.5;
    const t = rect(d.x0, H - s, fine - d.x0, s) + rect(asta, 0, s, H - s + 2);
    return { d: d.d + g.d + t, x0: d.x0, x1: fine };
  };

  /* 3 · Catena: la pancia della D e la schiena della G condividono un tratto; poi la G prosegue nella T */
  V.catena = (s = 208, gap = 200) => {
    const d = D(120, s);
    const g = G(d.cx + 2 * R - s, s, 90);                 // i due cerchi si sovrappongono di un'asta
    const asta = g.x1 + gap;
    const cxT = asta + s / 2;
    const fine = cxT + 549.5;
    const t = rect(g.cx, H - s, fine - g.cx, s) + rect(asta, 0, s, H - s + 2);
    return { d: d.d + g.d + t, x0: d.x0, x1: fine, cerchi: [d.cx, g.cx], asta: cxT };
  };

  /* 4 · Innesto: la barra della G esce a destra e diventa la traversa di una T a mezza altezza */
  V.innesto = (s = 208, larg = 760) => {
    const d = D(120, s);
    const g = G(d.x1 + 60 + TR + 80 + R, s, 40);
    const tb = Math.round(s * 0.88);
    const cxT = g.x1 + larg / 2;
    const t = rect(g.x1 - 2, R - tb, larg + 2, tb) + rect(cxT - s / 2, 0, s, R - tb + 2);
    return { d: d.d + g.d + t, x0: d.x0, x1: g.x1 + larg, cerchi: [d.cx, g.cx], asta: cxT };
  };

  /* 5 · Tre in uno (monogramma): una lettera sola. L'asta è della T e della D, la traversa
     della T è il tratto alto della D, la pancia della D si apre come una G con la sua barra */
  V.monogramma = (s = 208, braccio = 463, ap = 40, barra = 542) => {
    const x = 0, cx = x + 463;
    const tb = Math.round(s * 0.88);
    const d = rect(x, 0, s, H) + rect(x - braccio, H - s, braccio + 465, s) + rect(x, 0, 465, s)
      + sector(cx, R, R - s, R, -90, 0) + (ap > 0 ? sector(cx, R, R - s, R, ap, 90) : sector(cx, R, R - s, R, 0.01, 90))
      + rect(cx + R - barra, R - tb, barra, tb);
    return { d, x0: x - braccio, x1: cx + R, cerchi: [cx], asta: x + s / 2 };
  };

  /* --- confezione SVG --- */
  const PAD = 40;
  function svg(v, opz = {}) {
    const w = v.x1 - v.x0 + 2 * PAD, h = H + 2 * PAD;
    const fill = opz.fill || 'currentColor';
    const attr = opz.attr || '';
    const vb = `${f(v.x0 - PAD)} ${f(-H - PAD)} ${f(w)} ${f(h)}`;
    const dim = opz.height ? ` height="${opz.height}" width="${f(opz.height * w / h)}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"${dim} ${attr} role="img" aria-label="${opz.label || 'DGT'}"><path fill="${fill}" fill-rule="nonzero" transform="scale(1,-1)" d="${v.d}"/></svg>`;
  }
  /* monogramma dentro un cerchio o una tessera (per pulsanti rotondi, favicon, icona dell'app) */
  function marchio(opz = {}) {
    const v = V.monogramma(opz.s || 208);
    const w = v.x1 - v.x0, box = Math.max(w, H) * 1.5;       // il glifo occupa i 2/3 del tondo
    const cx = (v.x0 + v.x1) / 2, cy = H / 2;
    const forma = opz.tessera
      ? `<rect x="${f(cx - box / 2)}" y="${f(-(cy + box / 2))}" width="${f(box)}" height="${f(box)}" rx="${f(box * 0.28)}" fill="${opz.fondo || '#B8FC64'}"/>`
      : `<circle cx="${f(cx)}" cy="${f(-cy)}" r="${f(box / 2)}" fill="${opz.fondo || '#B8FC64'}"/>`;
    const dim = opz.size ? ` width="${opz.size}" height="${opz.size}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${f(cx - box / 2)} ${f(-(cy + box / 2))} ${f(box)} ${f(box)}"${dim} role="img" aria-label="DGT">${forma}<path fill="${opz.fill || '#0A0A0A'}" fill-rule="nonzero" transform="scale(1,-1)" d="${v.d}"/></svg>`;
  }

  const VARIANTI = [
    { id: 'oggi', nome: 'Oggi', sotto: 'Il logo di testo attuale: Urbanist 600, spaziatura .12em. È il punto di partenza, non una proposta.' },
    { id: 'filo', nome: 'Filo', sotto: 'L\'arco della G non si chiude: prosegue dritto e diventa la traversa della T. Due lettere, un tratto solo.' },
    { id: 'catena', nome: 'Catena', sotto: 'La pancia della D e la schiena della G sono lo stesso cerchio e condividono un tratto; la G prosegue nella T. Un\'unica forma.' },
    { id: 'innesto', nome: 'Innesto', sotto: 'La barra della G esce dalla lettera e diventa la traversa di una T a mezza altezza: la T è innestata sulla G.' },
    { id: 'monogramma', nome: 'Tre in uno', sotto: 'Una lettera sola: l\'asta è della T e della D, la traversa della T è il tratto alto della D, la pancia della D si apre come una G con la sua barra.' },
  ];

  return { H, V, VARIANTI, svg, marchio };
});
