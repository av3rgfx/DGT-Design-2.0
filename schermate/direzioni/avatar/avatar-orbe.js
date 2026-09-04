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
     riflesso bianco appena accennato, occhi bianchi; lime quando serve il
     titolare (al lavoro, da approvare); rosa per gli occhi a X dell'errore;
     anelli e archi fuori dal corpo in nero sottile.
   - Dinamica: animazioni CSS deterministiche (fase e periodo dal seme) su
     tutti gli avatar, non solo su quelli al lavoro: respiro del corpo,
     deriva dello sguardo, battito delle palpebre, dondolio; al lavoro un
     arco che orbita; da approvare due onde che si allargano; in errore un
     tremito ogni tanto; libero: palpebre socchiuse e respiro lento.
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
  const VOLTO = { lavoro: '#B8FC64', attesa: '#B8FC64', errore: '#F9A3A3', pianificato: '#FCFCFC', libero: '#FCFCFC' };
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
      dist: 24 + rng() * 12,                // mezza distanza fra gli occhi
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
    if (p.occhi === 'tondo') { w = 21; h = 21; } else if (p.occhi === 'pillola') { w = 16; h = 32; } else { w = 27; h = 18; }
    if (stato === 'attesa') { w *= 1.2; h *= 1.2; }
    if (stato === 'lavoro') { h *= 0.9; }
    if (stato === 'libero') { h = Math.max(4, h * 0.3); }
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
      ? `<g class="occhio" transform="translate(${r2(x)} ${r2(y)})"><rect x="-14" y="-3.5" width="28" height="7" rx="3.5" fill="${volto}" transform="rotate(45)"/><rect x="-14" y="-3.5" width="28" height="7" rx="3.5" fill="${volto}" transform="rotate(-45)"/></g>`
      : `<rect class="occhio" x="${r2(x - o.w / 2)}" y="${r2(y - o.h / 2)}" width="${r2(o.w)}" height="${r2(o.h)}" rx="${r2(o.rx)}" fill="${volto}"/>`;
    const decoro = stato === 'lavoro'
      ? `<circle class="giro" r="112" fill="none" stroke="${TRATTO}" stroke-width="4" stroke-linecap="round" stroke-dasharray="46 660" opacity=".55"/>`
      : stato === 'attesa'
        ? `<circle class="onda" r="104" fill="none" stroke="${TRATTO}" stroke-width="3" opacity=".5"/><circle class="onda due" r="104" fill="none" stroke="${TRATTO}" stroke-width="3" opacity=".5"/>`
        : '';
    const vars = `--p:${r2(p.periodo * (stato === 'libero' ? 1.6 : stato === 'lavoro' ? 0.75 : 1))}s;--d:-${r2(p.fase)}s;--b:${r2(p.battito)}s`;
    return `<svg class="ava orbe ${stato}" viewBox="${VIEWBOX}" aria-hidden="true" focusable="false" style="${vars}" data-seme="${String(seme || '').replace(/"/g, '&quot;')}" data-stato="${stato}">`
      + `<g class="tutto"><g class="scossa">${decoro}`
      + `<g class="corpo"><path d="${contorno(p)}" fill="url(#${CORPO_ID})"/><ellipse cx="-30" cy="-40" rx="27" ry="15" transform="rotate(-28 -30 -40)" fill="#FCFCFC" opacity=".11"/></g>`
      + `<g class="mira"><g class="occhi">${occhio(-p.dist)}${occhio(p.dist)}</g></g>`
      + `</g></g></svg>`;
  }

  /* ---------- foglio di stile e gradiente, una volta per pagina ---------- */
  const CSS = `
.ava.orbe{overflow:visible}
.ava.orbe .tutto{transform-box:fill-box;transform-origin:center;animation:av-dondolo calc(var(--p,3.4s)*1.7) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .corpo{transform-box:fill-box;transform-origin:center;animation:av-respiro var(--p,3.4s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .occhi{transform-box:fill-box;transform-origin:center;animation:av-sguardo calc(var(--p,3.4s)*2.4) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe .occhio{transform-box:fill-box;transform-origin:center;animation:av-battito var(--b,5s) ease-in-out infinite;animation-delay:var(--d,0s)}
.ava.orbe.libero .occhio,.ava.orbe.errore .occhio{animation:none}
.ava.orbe .mira{transform:translate(var(--gx,0px),var(--gy,0px));transition:transform .28s cubic-bezier(.2,.8,.2,1)}
.ava.orbe .giro{transform-box:fill-box;transform-origin:center;animation:av-giro 2.6s linear infinite;animation-delay:var(--d,0s)}
.ava.orbe .onda{transform-box:fill-box;transform-origin:center;animation:av-onda 1.9s ease-out infinite}
.ava.orbe .onda.due{animation-delay:-.95s}
.ava.orbe.errore .scossa{transform-box:fill-box;transform-origin:center;animation:av-tremito 3.2s ease-in-out infinite;animation-delay:var(--d,0s)}
@keyframes av-respiro{0%,100%{transform:scale(1,1)}50%{transform:scale(1.03,.97)}}
@keyframes av-dondolo{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes av-sguardo{0%,100%{transform:translate(0,0)}28%{transform:translate(6px,-3px)}55%{transform:translate(-5px,2px)}80%{transform:translate(2px,4px)}}
@keyframes av-battito{0%,91%,100%{transform:scaleY(1)}94%{transform:scaleY(.12)}97%{transform:scaleY(1)}}
@keyframes av-giro{to{transform:rotate(360deg)}}
@keyframes av-onda{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.32);opacity:0}}
@keyframes av-tremito{0%,88%,100%{transform:translateX(0)}90%{transform:translateX(-3px)}93%{transform:translateX(3px)}96%{transform:translateX(-2px)}}
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
