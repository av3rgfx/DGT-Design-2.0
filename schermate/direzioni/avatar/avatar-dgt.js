/* =====================================================================
   DGT — avatar dei dipendenti AI nel linguaggio della Console.

   Involucro del motore del kit (avatar-motore.js, generato da vendor-avatars/):
   il kit dà la forma (silhouette, pupilla, segno distintivo), deterministica
   dal seme; qui si decidono colori, misura, cornice e quando si anima.

   Regole (2026-09-04):
   - Seme = il ruolo del dipendente, o un seme scelto nell'editor. Stesso seme →
     stesso avatar, in ogni vista e in ogni sessione.
   - Colori solo dalla palette: disco chiaro #E4E4E4 (CSS di .av), corpo nero
     #0A0A0A, pupille bianche; lime #B8FC64 per pupille e segni quando serve il
     titolare (al lavoro, da approvare); rosa #F9A3A3 per gli occhi a X
     dell'errore; i tratti fuori dal corpo (anelli, «z») in nero sottile.
     Le tinte del kit (una per ruolo, ambra e rosso per gli stati) non entrano.
   - Stati del prodotto → stati del kit: lavoro → working, attesa → alert,
     errore → error, pianificato → idle, libero → dormant.
   - Statico di default: ogni (seme, stato) è un <symbol> disegnato una volta al
     fotogramma più leggibile del kit (HERO_TIME) e riusato con <use>. Si anima
     solo dove ha senso (.av[data-anima]): un solo requestAnimationFrame per
     pagina; con prefers-reduced-motion niente si muove. L'anteprima
     dell'editor (.av[data-segue]) segue il puntatore.
   - L'avatar è aria-hidden: sta sempre accanto all'etichetta e alla pillola di
     stato, non porta informazione da solo.

   API: DGT_AVATAR.html(seme, stato) → markup SVG da mettere dentro <span class="av">
        DGT_AVATAR.anima(radice) → avvia gli avatar [data-anima] dentro radice
        DGT_AVATAR.semi(ruolo, n) → n semi candidati per l'editor
        DGT_AVATAR.statoKit(stato) → id di stato del kit
        DGT_AVATAR.usa('kit'|'orbe') → sceglie la famiglia di avatar; 'orbe' è la
        variante pulita e dinamica (avatar-orbe.js), 'kit' le forme del kit.
   ===================================================================== */
window.DGT_AVATAR = (function () {
  const M = window.DGT_AVATAR_MOTORE;
  const SVGNS = 'http://www.w3.org/2000/svg';
  let STILE = 'kit';
  const orbe = () => STILE === 'orbe' && window.DGT_AVATAR_ORBE;
  const usa = s => { STILE = s === 'orbe' && window.DGT_AVATAR_ORBE ? 'orbe' : 'kit'; return STILE; };

  const STATO_KIT = { lavoro: 'working', attesa: 'alert', errore: 'error', pianificato: 'idle', libero: 'dormant' };
  const CORPO = '#0A0A0A';
  const VOLTO = { lavoro: '#B8FC64', attesa: '#B8FC64', errore: '#F9A3A3', pianificato: '#FCFCFC', libero: '#FCFCFC' };
  const FUORI = '#0A0A0A';
  /* Il kit disegna in un viewBox di mezzo lato 160 con il corpo di raggio 100:
     nel disco della Console il corpo occupa i 3/4 del diametro (cornice 134,
     una sola per tutti gli stati, come chiede il kit). */
  const CORNICE = 134;
  const VIEWBOX = `${-CORNICE} ${-CORNICE} ${CORNICE * 2} ${CORNICE * 2}`;
  /* Le «z» del sonno il kit le disegna piccole: nel disco si ingrandiscono un
     poco (misura e distanza, così la scia resta quella). */
  const ZZZ = 1.5;
  const statoKit = s => STATO_KIT[s] || (M.HERO_TIME[s] !== undefined ? s : 'idle');
  const r2 = M.r2;

  /* ---------- un fotogramma → elementi SVG ---------- */
  function elementi(f, stato, kit, clipId, el) {
    const volto = VOLTO[stato] || VOLTO.libero;
    const zz = kit === 'dormant' ? ZZZ : 1;
    const punto = d => el('circle', { cx: r2(d.x), cy: r2(d.y), r: r2(d.r), fill: d.outside ? FUORI : volto, opacity: r2(d.opacity) });
    const anello = g => el('path', { d: M.arcPath(g), fill: 'none', stroke: g.outside ? FUORI : volto, 'stroke-width': r2(g.width), 'stroke-linecap': 'round', opacity: r2(g.opacity) });
    const caret = c => {
      const k = c.outside ? zz : 1, w = c.w * k, h = c.h * k;
      return el('rect', { x: r2(-w / 2), y: r2(-h / 2), width: r2(w), height: r2(h), rx: r2(h / 2), fill: c.outside ? FUORI : volto, opacity: r2(c.opacity), transform: `translate(${r2(c.x * k)} ${r2(c.y * k)}) rotate(${r2(c.rot)})` });
    };
    const pupilla = p => p.shape === 'ring'
      ? el('path', { d: M.UNIT_CIRCLE, fill: 'none', stroke: volto, 'stroke-width': 0.3, opacity: r2(p.alpha), transform: `matrix(${p.m.map(r2).join(' ')})` })
      : el('path', { d: p.shape === 'square' ? M.UNIT_SQUARE : M.UNIT_CIRCLE, fill: volto, opacity: r2(p.alpha), transform: `matrix(${p.m.map(r2).join(' ')})` });
    const fuori = [...f.dots.filter(d => d.outside).map(punto), ...f.rings.filter(g => g.outside).map(anello), ...f.carets.filter(c => c.outside).map(caret)];
    const dentro = [...f.dots.filter(d => !d.outside).map(punto), ...f.rings.filter(g => !g.outside).map(anello), ...f.carets.filter(c => !c.outside).map(caret), ...f.pupils.map(pupilla)];
    const corpo = el('path', { d: f.bodyPath, fill: CORPO, opacity: r2(f.bodyAlpha) });
    return { fuori, corpo, dentro, clip: f.bodyPath };
  }
  const elStr = (tag, attrs) => `<${tag}${Object.keys(attrs).map(k => ` ${k}="${attrs[k]}"`).join('')}/>`;
  const elDom = (tag, attrs) => { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  function motore(seme, stato, vivo) {
    const kit = statoKit(stato);
    return { kit, engine: new M.AvatarEngine(M.deriveRole(seme || 'dipendente'), kit, 100, { liveliness: !!vivo }) };
  }

  /* ---------- simboli statici (uno per seme e stato) ---------- */
  const simboli = new Map();
  let sprite = null;
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); }
  function simbolo(seme, stato) {
    const key = (seme || 'dipendente').trim().toLowerCase() + '@' + stato;
    let id = simboli.get(key);
    if (id) return id;
    id = 'av-' + hash(key);
    const { kit, engine } = motore(seme, stato, false);
    const f = engine.sample(M.HERO_TIME[kit] || 0);
    const p = elementi(f, stato, kit, id + '-c', elStr);
    const markup = `<clipPath id="${id}-c"><path d="${p.clip}"/></clipPath>`
      + `<symbol id="${id}" viewBox="${VIEWBOX}" overflow="visible">${p.fuori.join('')}${p.corpo}<g clip-path="url(#${id}-c)">${p.dentro.join('')}</g></symbol>`;
    if (typeof document !== 'undefined') {
      if (!sprite) {
        sprite = document.getElementById('dgt-avatar-sprite');
        if (!sprite) { sprite = document.createElementNS(SVGNS, 'svg'); sprite.id = 'dgt-avatar-sprite'; sprite.setAttribute('width', '0'); sprite.setAttribute('height', '0'); sprite.setAttribute('aria-hidden', 'true'); sprite.style.position = 'absolute'; sprite.append(document.createElementNS(SVGNS, 'defs')); document.body.prepend(sprite); }
      }
      sprite.firstElementChild.insertAdjacentHTML('beforeend', markup);
    }
    simboli.set(key, id);
    return id;
  }
  /** Markup da mettere dentro <span class="av">: un <svg> che riusa il simbolo. */
  function html(seme, stato) {
    if (orbe()) return window.DGT_AVATAR_ORBE.html(seme, stato);
    const id = simbolo(seme, stato);
    /* il <use> di un simbolo si posiziona a (0,0) del viewBox esterno: qui parte da 0 */
    return `<svg class="ava" viewBox="0 0 ${CORNICE * 2} ${CORNICE * 2}" aria-hidden="true" focusable="false" data-seme="${String(seme || '').replace(/"/g, '&quot;')}" data-stato="${stato}"><use href="#${id}"/></svg>`;
  }

  /* ---------- animazione: un solo ticker per pagina ---------- */
  const ridotto = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vivi = new Set();
  let avviato = false, seq = 0;
  const t0 = typeof performance !== 'undefined' ? performance.now() : 0;
  const ora = () => (performance.now() - t0) / 1000;
  function sincronizza(gruppo, voci) {
    while (gruppo.childElementCount > voci.length) gruppo.lastElementChild.remove();
    voci.forEach((n, i) => {
      const c = gruppo.children[i];
      if (!c) gruppo.append(n);
      else if (c.localName !== n.localName) c.replaceWith(n);
      else for (const a of n.attributes) c.setAttribute(a.name, a.value);
    });
  }
  function disegna(v, t) {
    const f = v.engine.sample(t);
    const p = elementi(f, v.stato, v.kit, v.clipId, elDom);
    v.clipPath.setAttribute('d', p.clip);
    for (const a of p.corpo.attributes) v.corpo.setAttribute(a.name, a.value);
    sincronizza(v.gFuori, p.fuori);
    sincronizza(v.gDentro, p.dentro);
  }
  function battito() {
    if (!document.hidden) {
      const t = ora();
      for (const v of vivi) { if (!v.svg.isConnected) { vivi.delete(v); continue; } disegna(v, t); }
    }
    if (vivi.size) requestAnimationFrame(battito); else avviato = false;
  }
  function segui(ev) {
    for (const v of vivi) {
      if (!v.segue) continue;
      const r = v.svg.getBoundingClientRect(); if (!r.width) continue;
      const dx = (ev.clientX - (r.left + r.width / 2)) / Math.max(r.width * 4, 260);
      const dy = (ev.clientY - (r.top + r.height / 2)) / Math.max(r.height * 4, 260);
      const c = x => Math.max(-1, Math.min(1, x));
      v.engine.setLook({ yaw: c(dx) * 30, pitch: c(-dy) * 24, mix: 1 }, ora());
    }
  }
  let seguo = false;
  /** Sostituisce il <use> con nodi vivi negli avatar [data-anima] e li anima. */
  function anima(radice) {
    if (orbe()) return window.DGT_AVATAR_ORBE.anima(radice);
    if (ridotto || typeof document === 'undefined') return;
    radice.querySelectorAll('.av[data-anima] svg, .av[data-segue] svg').forEach(svg => {
      if (svg.dataset.vivo) return;
      const span = svg.parentElement;
      const seme = svg.dataset.seme, stato = svg.dataset.stato;
      const { kit, engine } = motore(seme, stato, true);
      const id = 'avl-' + (++seq);
      const clipPath = elDom('path', {});
      const clip = elDom('clipPath', { id: id + '-c' }); clip.append(clipPath);
      const defs = elDom('defs', {}); defs.append(clip);
      const gFuori = elDom('g', {}), corpo = elDom('path', {}), gDentro = elDom('g', { 'clip-path': `url(#${id}-c)` });
      svg.replaceChildren(defs, gFuori, corpo, gDentro);
      svg.setAttribute('viewBox', VIEWBOX);
      svg.dataset.vivo = '1';
      const v = { svg, seme, stato, kit, engine, clipId: id + '-c', clipPath, corpo, gFuori, gDentro, segue: span.hasAttribute('data-segue') };
      vivi.add(v);
      disegna(v, ora());
    });
    if (vivi.size && !avviato) { avviato = true; requestAnimationFrame(battito); }
    if (!seguo) { seguo = true; window.addEventListener('pointermove', segui, { passive: true }); }
  }

  /** Semi candidati per l'editor: il ruolo e cinque varianti numerate. */
  const semi = (ruolo, n) => Array.from({ length: n || 6 }, (_, i) => i ? `${ruolo} ·${i + 1}` : ruolo);

  return { html, anima, semi, statoKit, simbolo, usa, stile: () => STILE, STATO_KIT, VOLTO, CORPO, FUORI, CORNICE };
})();
