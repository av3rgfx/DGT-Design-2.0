/* =====================================================================
   DGT — avatar «orbe»: la seconda famiglia di avatar dei dipendenti AI.

   Richiesta dell'utente (2026-09-04, dopo la versione 5): avatar più puliti
   (forme simili fra loro, non una silhouette diversa per ciascuno) e più
   dinamici, nello stile dell'orbe della modalità voce di Grok: una sfera
   morbida e monocroma che respira, sbatte le palpebre e segue lo sguardo.

   Come funziona:
   - Forma: tutti sono orbi. Dal seme (ruolo, o seme scelto nell'editor) escono
     pochi parametri dentro intervalli stretti: quanto l'orbe è tondo o
     «squircle», il suo rapporto, una leggera inclinazione, un solo
     rigonfiamento morbido, e gli occhi (tondi, a pillola alta o a pillola
     larga; distanza e altezza). Stesso seme → stesso avatar.
   - Colori solo dalla palette: disco chiaro (CSS di .av), corpo nero con un
     riflesso bianco appena accennato, occhi bianchi; lime al lavoro, giallo
     #FCDC64 da approvare (terza richiesta dell'utente), rosa per gli occhi a
     X dell'errore;
     anelli e archi fuori dal corpo in nero sottile.
   - Dinamica: animazioni CSS deterministiche (fase e periodo dal seme) su
     tutti gli avatar, e per ogni stato si muove il corpo stesso (seconda
     versione, chiesta dall'utente perché la prima si vedeva poco):
       lavoro       squash e stretch ritmico con inclinazione, sguardo che
                    scandisce a destra e a sinistra, due archi che orbitano;
       attesa       saltello con scossa ogni due secondi, occhi grandi, onde
                    che si allargano fino al bordo del disco;
       errore       tremito frequente con il corpo un poco afflosciato, gli
                    occhi a X che lampeggiano;
       pianificato  dondolio da un lato all'altro, sguardo che va in alto a
                    destra «a guardare l'orologio» e torna;
       libero       respiro profondo e lento, l'orbe si abbassa, palpebre
                    socchiuse, due «z» che salgono e svaniscono.
     Sempre: respiro, deriva dello sguardo, battito delle palpebre.
     Terza versione: cicli più lunghi e con pause (chiesto dall'utente: «meno
     frequenti»): il saltello ogni ~5,5 s, il tremito ogni 6 s, le «z» ogni
     3,5 s, il battito ogni 6–10 s; i moti continui hanno periodi doppi.
     Nessun requestAnimationFrame. Con prefers-reduced-motion niente si muove.
   - L'anteprima dell'editor (.av[data-segue]) segue il puntatore con gli occhi.

   API (stessa dell'involucro del kit): html(seme, stato), anima(radice),
   semi(ruolo, n). Si attiva con DGT_AVATAR.usa('orbe').
   ===================================================================== */
window.DGT_AVATAR_ORBE = (function () {
  const M = window.DGT_AVATAR_MOTORE;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const CORNICE = 125, R = 100;
  const VIEWBOX = `${-CORNICE} ${-CORNICE} ${CORNICE * 2} ${CORNICE * 2}`;
  const CORPO_ID = 'av-orbe-corpo';
  /* occhi: lime al lavoro, giallo (il terzo punto di interesse della palette) da approvare, rosa in errore */
  const VOLTO = { lavoro: '#B8FC64', attesa: '#FCDC64', errore: '#F9A3A3', pianificato: '#FCFCFC', libero: '#FCFCFC' };
  const TRATTO = '#0A0A0A';
  const r2 = M.r2;

  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  /** I parametri dell'orbe dal seme: intervalli stretti, così le forme restano una famiglia. */
  function forma(seme) {
    const rng = M.createRng(hash((seme || 'dipendente').trim().toLowerCase()));
    const occhi = ['tondo', 'pillola', 'largo'][Math.floor(rng() * 3)];
    return {
      n: 2.3 + rng() * 1.1,                 // 2.3 = quasi tondo, 3.4 = squircle morbido
      sx: 0.93 + rng() * 0.14, sy: 0.93 + rng() * 0.14,
      rot: (rng() - 0.5) * 16,              // inclinazione in gradi
      bump: 0.02 + rng() * 0.05, bumpA: rng() * Math.PI * 2,
      occhi,
      dist: 27 + rng() * 12,                // mezza distanza fra gli occhi
      alt: -12 + rng() * 12,                // altezza degli occhi (negativo = più in alto)
      fase: rng() * 10, periodo: 3.1 + rng() * 1.1, battito: 3.8 + rng() * 2.6,
    };
  }

  /** Il contorno: superellisse con un rigonfiamento morbido, chiusa con curve. */
  function contorno(p) {
    const N = 56, pts = [];
    const rot = p.rot * Math.PI / 180, cr = Math.cos(rot), sr = Math.sin(rot);
    for (let i = 0; i < N; i++) {
      const a = i / N * Math.PI * 2;
      const c = Math.cos(a), s = Math.sin(a);
      const base = Math.pow(Math.pow(Math.abs(c / p.sx), p.n) + Math.pow(Math.abs(s / p.sy), p.n), -1 / p.n);
      const r = base * (1 + p.bump * Math.cos(a - p.bumpA)) * R;
      const x = r * c, y = r * s;
      pts.push({ x: x * cr - y * sr, y: x * sr + y * cr });
    }
    let d = `M${r2(pts[0].x)} ${r2(pts[0].y)}`;
    const t = 1 / 6;
    for (let i = 0; i < N; i++) {
      const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
      d += `C${r2(p1.x + (p2.x - p0.x) * t)} ${r2(p1.y + (p2.y - p0.y) * t)} ${r2(p2.x - (p3.x - p1.x) * t)} ${r2(p2.y - (p3.y - p1.y) * t)} ${r2(p2.x)} ${r2(p2.y)}`;
    }
    return d + 'Z';
  }

  /** Gli occhi per tipo e stato: larghezza, altezza, raggio. */
  function occhi(p, stato) {
    let w, h;
    if (p.occhi === 'tondo') { w = 27; h = 27; } else if (p.occhi === 'pillola') { w = 20; h = 40; } else { w = 34; h = 22; }
    if (stato === 'attesa') { w *= 1.25; h *= 1.25; }
    if (stato === 'lavoro') { h *= 0.85; }
    if (stato === 'libero') { h = Math.max(5, h * 0.25); }
    return { w, h, rx: Math.min(w, h) / 2 };
  }

  const attrs = a => Object.keys(a).map(k => ` ${k}="${a[k]}"`).join('');

  /** Il markup dell'orbe: un <svg> inline, animato dal foglio di stile. */
  function html(seme, stato) {
    const p = forma(seme);
    const volto = VOLTO[stato] || VOLTO.libero;
    const o = occhi(p, stato);
    const y = p.alt;
    const occhio = x => stato === 'errore'
      ? `<g class="occhio" transform="translate(${r2(x)} ${r2(y)})"><rect x="-17" y="-4.5" width="34" height="9" rx="4.5" fill="${volto}" transform="rotate(45)"/><rect x="-17" y="-4.5" width="34" height="9" rx="4.5" fill="${volto}" transform="rotate(-45)"/></g>`
      : `<rect class="occhio" x="${r2(x - o.w / 2)}" y="${r2(y - o.h / 2)}" width="${r2(o.w)}" height="${r2(o.h)}" rx="${r2(o.rx)}" fill="${volto}"/>`;
    /* i segni dello stato fuori dal corpo: archi che orbitano, onde, «z» */
    const decoro = stato === 'lavoro'
      ? `<circle class="giro" r="113" fill="none" stroke="${TRATTO}" stroke-width="6" stroke-linecap="round" stroke-dasharray="60 295" opacity=".7"/>`
      : stato === 'attesa'
        ? `<circle class="onda" r="104" fill="none" stroke="${TRATTO}" stroke-width="5" opacity=".7"/><circle class="onda due" r="104" fill="none" stroke="${TRATTO}" stroke-width="5" opacity=".7"/>`
        : '';
    /* le «z» del sonno stanno SOPRA il corpo, bianche: partono dal volto e salgono verso l'alto a destra */
    const zeta = stato === 'libero'
      ? `<text class="zeta" x="30" y="-12" font-family="Urbanist, sans-serif" font-weight="600" font-size="38" fill="#FCFCFC">z</text><text class="zeta due" x="30" y="-12" font-family="Urbanist, sans-serif" font-weight="600" font-size="38" fill="#FCFCFC">z</text>`
      : '';
    /* --p periodo di base (5–6,7 s; più lento da libero), --b battito delle palpebre (6–10 s), --d fase dal seme */
    const vars = `--p:${r2(p.periodo * (stato === 'libero' ? 2.2 : 1.6))}s;--d:-${r2(p.fase)}s;--b:${r2(p.battito * 1.6)}s`;
    return `<svg class="ava orbe ${stato}" viewBox="${VIEWBOX}" aria-hidden="true" focusable="false" style="${vars}" data-seme="${String(seme || '').replace(/"/g, '&quot;')}" data-stato="${stato}">`
      + `<g class="tutto"><g class="scossa">${decoro}`
      + `<g class="corpo"><path d="${contorno(p)}" fill="url(#${CORPO_ID})"/><ellipse cx="-30" cy="-40" rx="27" ry="15" transform="rotate(-28 -30 -40)" fill="#FCFCFC" opacity=".11"/></g>`
      + `<g class="mira"><g class="occhi">${occhio(-p.dist)}${occhio(p.dist)}</g></g>${zeta}`
      + `</g></g></svg>`;
  }

  /* ---------- foglio di stile e gradiente, una volta per pagina ---------- */
  const CSS = `
.ava.orbe{overflow:visible}
.ava.orbe .tutto,.ava.orbe .scossa,.ava.orbe .corpo,.ava.orbe .occhi,.ava.orbe .occhio,.ava.orbe .giro,.ava.orbe .onda,.ava.orbe .zeta{transform-box:fill-box;transform-origin:center}
/* base, per tutti: dondolio, respiro, deriva dello sguardo, battito */
.ava.orbe .tutto{animation:av-dondolo calc(var(--p,5.4s)*1.7) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .corpo{animation:av-respiro var(--p,5.4s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .occhi{animation:av-sguardo calc(var(--p,5.4s)*2.2) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .occhio{animation:av-battito var(--b,5s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .mira{transform:translate(var(--gx,0px),var(--gy,0px));transition:transform .28s cubic-bezier(.2,.8,.2,1)}
/* al lavoro: due battute di squash e stretch, poi una pausa; sguardo che scandisce; due archi che orbitano */
.ava.orbe.lavoro .corpo{animation:av-lavoro calc(var(--p,5.4s)*.8) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.lavoro .occhi{animation:av-scansione calc(var(--p,5.4s)*.8) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .giro{animation:av-giro 3.6s linear infinite;animation-delay:var(--d,0s)}
/* da approvare: ogni 5,5 s un saltello con scossa; le onde partono con il saltello */
.ava.orbe.attesa .tutto{animation:av-richiamo 5.5s ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.attesa .corpo{animation:av-scrollata 5.5s ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .onda{animation:av-onda 5.5s ease-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .onda.due{animation-delay:calc(var(--d,0s) - .5s)}
/* errore: ogni 6 s un tremito; corpo afflosciato; X che lampeggiano piano */
.ava.orbe.errore .scossa{animation:av-tremito 6s ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.errore .corpo{animation:av-affloscio calc(var(--p,5.4s)*.8) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.errore .occhio{animation:av-lampeggio 2.6s ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.errore .occhi{animation:none}
/* pianificato: dondola piano da un lato all'altro e ogni tanto guarda l'orologio */
.ava.orbe.pianificato .corpo{animation:av-dondolio calc(var(--p,5.4s)*1.5) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.pianificato .occhi{animation:av-orologio calc(var(--p,5.4s)*2) ease-in-out infinite;animation-delay:var(--d,0s)}
/* libero: respiro profondo e lento, si abbassa, una «z» ogni 3,5 s */
.ava.orbe.libero .tutto{animation:av-sonno var(--p,7.4s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.libero .corpo{animation:av-respirone var(--p,7.4s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.libero .occhio,.ava.orbe.libero .occhi{animation:none}
.ava.orbe .zeta{opacity:0;animation:av-zeta 7s ease-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .zeta.due{animation-delay:calc(var(--d,0s) - 3.5s)}
@keyframes av-respiro{0%,100%{transform:scale(1,1)}50%{transform:scale(1.045,.955)}}
@keyframes av-dondolo{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes av-sguardo{0%,100%{transform:translate(0,0)}28%{transform:translate(9px,-5px)}55%{transform:translate(-8px,3px)}80%{transform:translate(3px,6px)}}
@keyframes av-battito{0%,91%,100%{transform:scaleY(1)}94%{transform:scaleY(.1)}97%{transform:scaleY(1)}}
@keyframes av-lavoro{0%,60%,100%{transform:scale(1,1) rotate(0)}12%{transform:scale(1.14,.88) rotate(-8deg)}25%{transform:scale(.92,1.1) rotate(0)}37%{transform:scale(1.12,.9) rotate(8deg)}50%{transform:scale(.95,1.06) rotate(0)}}
@keyframes av-scansione{0%,60%,100%{transform:translate(0,0)}15%{transform:translate(-16px,0)}45%{transform:translate(16px,0)}}
@keyframes av-giro{to{transform:rotate(360deg)}}
@keyframes av-richiamo{0%,78%,100%{transform:translateY(0) scale(1)}82%{transform:translateY(-28px) scale(1.1)}87%{transform:translateY(2px) scale(1.06,.92)}91%{transform:translateY(-14px) scale(1.04)}95%{transform:translateY(0) scale(1)}}
@keyframes av-scrollata{0%,80%,100%{transform:rotate(0)}83%{transform:rotate(-14deg)}86%{transform:rotate(14deg)}89%{transform:rotate(-9deg)}92%{transform:rotate(5deg)}95%{transform:rotate(0)}}
@keyframes av-onda{0%,80%{transform:scale(1);opacity:0}81%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}
@keyframes av-tremito{0%,86%,100%{transform:translateX(0) rotate(0)}88%{transform:translateX(-16px) rotate(-6deg)}90%{transform:translateX(16px) rotate(6deg)}92%{transform:translateX(-13px) rotate(-4deg)}94%{transform:translateX(13px) rotate(4deg)}96%{transform:translateX(-7px) rotate(0)}98%{transform:translateX(0)}}
@keyframes av-affloscio{0%,100%{transform:scale(1.08,.9) translateY(6px)}50%{transform:scale(1.03,.95) translateY(3px)}}
@keyframes av-lampeggio{0%,100%{opacity:1}50%{opacity:.3}}
@keyframes av-dondolio{0%,100%{transform:translateX(-18px) rotate(-8deg)}50%{transform:translateX(18px) rotate(8deg)}}
@keyframes av-orologio{0%,55%,100%{transform:translate(0,0)}62%,85%{transform:translate(16px,-13px)}}
@keyframes av-sonno{0%,100%{transform:translateY(4px)}50%{transform:translateY(16px)}}
@keyframes av-respirone{0%,100%{transform:scale(.96,1.04)}50%{transform:scale(1.12,.88)}}
@keyframes av-zeta{0%,55%{transform:translate(0,0) scale(.5);opacity:0}65%{opacity:.95}100%{transform:translate(34px,-70px) scale(1.3);opacity:0}}
@media (prefers-reduced-motion:reduce){.ava.orbe *{animation:none!important;transition:none!important}}
`;
  let pronto = false;
  function prepara() {
    if (pronto || typeof document === 'undefined') return;
    pronto = true;
    if (!document.getElementById('dgt-avatar-orbe-css')) { const s = document.createElement('style'); s.id = 'dgt-avatar-orbe-css'; s.textContent = CSS; document.head.appendChild(s); }
    if (!document.getElementById(CORPO_ID)) {
      const svg = document.createElementNS(SVGNS, 'svg'); svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.setAttribute('aria-hidden', 'true'); svg.style.position = 'absolute';
      /* il corpo: nero con un riflesso morbido in alto a sinistra, tutto dentro la palette dei neri */
      svg.innerHTML = `<defs><radialGradient id="${CORPO_ID}" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#2A2A2A"/><stop offset=".55" stop-color="#121212"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient></defs>`;
      document.body.prepend(svg);
    }
  }

  /* ---------- lo sguardo segue il puntatore (solo [data-segue]) ---------- */
  let seguo = false;
  function segui(ev) {
    document.querySelectorAll('.av[data-segue] svg.orbe').forEach(svg => {
      const r = svg.getBoundingClientRect(); if (!r.width) return;
      const dx = (ev.clientX - (r.left + r.width / 2)) / Math.max(r.width * 3, 220);
      const dy = (ev.clientY - (r.top + r.height / 2)) / Math.max(r.height * 3, 220);
      const c = v => Math.max(-1, Math.min(1, v));
      svg.style.setProperty('--gx', r2(c(dx) * 16) + 'px');
      svg.style.setProperty('--gy', r2(c(dy) * 12) + 'px');
    });
  }
  function anima(radice) {
    prepara();
    if (!seguo && typeof window !== 'undefined' && !(matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      seguo = true; window.addEventListener('pointermove', segui, { passive: true });
    }
  }

  const semi = (ruolo, n) => Array.from({ length: n || 6 }, (_, i) => i ? `${ruolo} ·${i + 1}` : ruolo);

  return { html: (seme, stato) => { prepara(); return html(seme, stato); }, anima, semi, forma, CORNICE };
})();
