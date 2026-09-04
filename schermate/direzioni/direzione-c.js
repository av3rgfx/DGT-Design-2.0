/* =====================================================================
   Direzione C — «Mappa viva». Deliberatamente lontana dal riferimento:
   crema caldo, quattro stanze con una tinta ciascuna, i dipendenti sono
   cerchi dentro la stanza, chi lavora ha l'anello acceso e un fumetto,
   il diario a destra racconta la giornata. Serif per i titoli.
   Serve a vedere cosa si esclude scegliendo A.
   ===================================================================== */
window.DIREZIONE_C = (function () {
  const { ic, esc, prefissa } = window.DGT_UI;

  const css = `
.c-app{--bg:#F4EFE6;--carta:#FFFDF9;--ink:#2B2622;--t2:#7A716A;--t3:#A79E95;--bd:rgb(43 38 34/.1);
  --indaco:#4C57C8;--indaco-bg:#E6E8F7;--corallo:#E0603F;--corallo-bg:#FBE3DA;--ambra:#D99A1E;--ambra-bg:#FBEFD0;--verdeacqua:#2E9E8A;--verdeacqua-bg:#DCEFEA;
  --serif:"Fraunces","Iowan Old Style",Georgia,serif;--sans:"Instrument Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  width:1440px;min-height:900px;background:var(--bg);color:var(--ink);font:400 14px/20px var(--sans);-webkit-font-smoothing:antialiased;padding:0 0 40px;position:relative;overflow:hidden}
.c-app *{box-sizing:border-box}
.c-app svg{display:block;width:16px;height:16px}
.c-app h1,.c-app h2,.c-app h3,.c-app p{margin:0;font-weight:400}
.c-top{display:flex;align-items:flex-end;gap:24px;padding:36px 40px 12px}
.c-top h1{font:500 40px/44px var(--serif);letter-spacing:-.02em}
.c-top h1 em{font-style:italic;font-weight:400;color:var(--corallo)}
.c-top .sub{font-size:15px;color:var(--t2);padding-bottom:6px}
.c-top .sub b{font-weight:600;color:var(--ink)}
.c-top .r{margin-left:auto;display:flex;gap:10px;align-items:center;padding-bottom:4px}
.cbtn{height:40px;padding:0 16px;border-radius:12px;background:var(--ink);color:#fff;display:inline-flex;align-items:center;gap:8px;font-weight:500;white-space:nowrap}
.cbtn.g{background:var(--carta);color:var(--ink);border:1px solid var(--bd)}
.cbtn.ic{width:40px;padding:0;justify-content:center}
.c-me{width:40px;height:40px;border-radius:12px;background:#E9DCC9;color:#5A4630;display:grid;place-items:center;font-weight:600;font-size:13px}
.c-body{display:grid;grid-template-columns:minmax(0,1fr) 352px;gap:20px;padding:8px 40px 0}
.rooms{display:grid;grid-template-columns:1fr 1fr;gap:16px;min-width:0}
.room{position:relative;border-radius:24px;padding:18px 20px 22px;min-height:280px;background:var(--rbg);border:1px solid rgb(43 38 34/.06)}
.room .rh{display:flex;align-items:baseline;gap:10px;margin-bottom:14px}
.room .rh h2{font:500 24px/28px var(--serif);color:var(--rc)}
.room .rh span{color:var(--t2);font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.room .rh .n{margin-left:auto;font:500 13px/1 var(--sans);color:var(--rc);background:#fff;border-radius:999px;padding:6px 10px;display:inline-flex;align-items:center;gap:6px;white-space:nowrap;flex:none}
.room .rh .n i{width:8px;height:8px;border-radius:50%;background:var(--rc);display:block}
.floor{display:flex;flex-wrap:wrap;gap:22px 26px;align-items:flex-start;padding:6px 4px 0}
.desk{position:relative;width:96px;display:grid;grid-template-columns:96px;justify-items:center;gap:8px;text-align:center}
.desk.lavoro{width:auto;grid-template-columns:96px 176px;column-gap:10px}
.desk.lavoro .av{grid-column:1}.desk.lavoro .nm,.desk.lavoro .rl{grid-column:1}
.desk .av{width:60px;height:60px;border-radius:50%;background:#fff;border:3px solid rgb(43 38 34/.1);display:grid;place-items:center;font-weight:600;font-size:15px;color:var(--ink);position:relative}
.desk .nm{font-size:13px;line-height:16px;font-weight:600;white-space:nowrap}
.desk .rl{font-size:11px;line-height:14px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:96px}
.desk.libero .av{opacity:.55;border-style:dashed}
.desk.libero .nm,.desk.libero .rl{opacity:.6}
.desk.pianificato .av{border-color:var(--rc);border-style:dotted}
.desk .tag{position:absolute;right:-6px;top:-4px;height:20px;padding:0 6px;border-radius:999px;background:#fff;border:1px solid var(--bd);font-size:10px;font-weight:600;display:inline-flex;align-items:center;gap:3px;color:var(--t2)}
.desk .tag svg{width:10px;height:10px}
.desk.errore .av{border-color:#D8402A}
.desk.errore .tag{background:#D8402A;color:#fff;border-color:#D8402A}
.desk.attesa .tag{background:var(--ambra);color:#fff;border-color:var(--ambra)}
.desk.lavoro .av{border-color:var(--rc);box-shadow:0 0 0 5px color-mix(in srgb,var(--rc) 22%,transparent)}
.desk.lavoro .av::after{content:"";position:absolute;inset:-9px;border-radius:50%;border:2px solid var(--rc);opacity:.35;animation:c-pulse 2.2s ease-out infinite}
.desk .bub{position:relative;grid-column:2;grid-row:1/4;align-self:start;justify-self:start;margin-top:-2px;width:176px;background:#fff;border-radius:12px;padding:8px 10px;text-align:left;font-size:12px;line-height:15px;box-shadow:0 6px 18px rgb(43 38 34/.12);z-index:2}
.desk .bub::before{content:"";position:absolute;left:-6px;top:22px;width:12px;height:12px;background:#fff;transform:rotate(45deg);border-radius:2px}
.desk .bub b{display:block;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.desk .bub span{color:var(--t2)}
.desk .bub i{display:block;height:3px;border-radius:2px;background:var(--rbg);margin-top:6px;overflow:hidden}
.desk .bub i b{display:block;height:100%;background:var(--rc)}
.floor.compatto{gap:14px 14px}
.floor.compatto .desk{width:64px;gap:4px}
.floor.compatto .desk.lavoro{width:auto}
.floor.compatto .desk .av{width:44px;height:44px;font-size:12px;border-width:2px}
.floor.compatto .desk .nm{font-size:11px}
.floor.compatto .desk .rl{display:none}
.floor.compatto .desk.lavoro{grid-template-columns:64px 150px;column-gap:8px}
.floor.compatto .desk .bub{width:150px;padding:6px 8px;font-size:11px;line-height:14px}
.legend{display:flex;gap:18px;padding:16px 4px 0;color:var(--t2);font-size:12px;align-items:center}
.legend i{display:inline-block;width:12px;height:12px;border-radius:50%;border:2px solid var(--t3);vertical-align:-2px;margin-right:6px}
.legend i.on{border-color:var(--indaco);box-shadow:0 0 0 3px rgb(76 87 200/.2)}
.legend i.dash{border-style:dashed}.legend i.dot{border-style:dotted;border-color:var(--verdeacqua)}
.legend i.err{background:#D8402A;border-color:#D8402A}
/* diario */
.diary{display:grid;gap:16px;align-content:start}
.dcard{background:var(--carta);border:1px solid var(--bd);border-radius:20px;padding:16px 18px}
.dcard h3{font:500 20px/24px var(--serif);display:flex;align-items:baseline;gap:8px}
.dcard h3 span{font:400 13px/1 var(--sans);color:var(--t2)}
.ap{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--bd)}
.ap:last-of-type{border-bottom:0;padding-bottom:4px}
.ap .t{display:flex;align-items:center;gap:10px}
.ap .t i{width:32px;height:32px;border-radius:50%;background:#fff;border:2px solid var(--rc);display:grid;place-items:center;font-size:11px;font-weight:600;flex:none}
.ap .t b{font-weight:600;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ap .t span{display:block;font-size:12px;color:var(--t2)}
.ap .bts{display:flex;gap:6px}
.ap .bts .cbtn{height:32px;padding:0 12px;border-radius:10px;font-size:13px}
.ap .bts .cbtn.ok{background:var(--rc)}
.feed{display:grid;gap:0;margin-top:4px}
.feed .e{display:grid;grid-template-columns:42px 28px 1fr;gap:8px;align-items:start;padding:8px 0;border-bottom:1px dashed var(--bd);font-size:13px;line-height:17px}
.feed .e:last-child{border-bottom:0}
.feed .e span{color:var(--t3);font-size:12px;padding-top:2px}
.feed .e i{width:28px;height:28px;border-radius:50%;background:#fff;border:2px solid var(--rc);display:grid;place-items:center;font-size:10px;font-weight:600}
.feed .e b{font-weight:600}
.feed .e.errore b{color:#D8402A}
.feed .e.approvazione b{color:var(--ambra)}
.feed .hdr{font:500 15px/20px var(--serif);color:var(--t2);padding:10px 0 4px}
`;
  const cssRaw = `@keyframes c-pulse{0%{transform:scale(.85);opacity:.5}100%{transform:scale(1.35);opacity:0}}`;

  const tinte = { indaco: ['--indaco', '--indaco-bg'], corallo: ['--corallo', '--corallo-bg'], ambra: ['--ambra', '--ambra-bg'], verdeacqua: ['--verdeacqua', '--verdeacqua-bg'] };
  const varsDip = d => `--rc:var(${tinte[d.tinta][0]});--rbg:var(${tinte[d.tinta][1]})`;

  function desk(m, e, compatto) {
    const a = e.att;
    let tag = '';
    if (e.stato === 'errore') tag = `<span class="tag">${ic('i-warn')}errore</span>`;
    else if (e.stato === 'attesa') tag = `<span class="tag">${ic('i-bell')}approva</span>`;
    else if (e.stato === 'pianificato') tag = `<span class="tag">${ic('i-clock')}${esc(a.quando)}</span>`;
    const bub = e.stato === 'lavoro' ? `<div class="bub"><b>${esc(a.titolo)}</b><span>${esc(a.cliente)} · passo ${a.passo[0]} di ${a.passo[1]}</span><i><b style="width:${Math.round(100 * a.passo[0] / a.passo[1])}%"></b></i></div>` : '';
    return `<div class="desk ${e.stato}"><span class="av">${m.iniziali(e)}${tag}</span><span class="nm">${esc(e.nome)}</span>${compatto ? '' : `<span class="rl">${esc(e.ruolo)}</span>`}${bub}</div>`;
  }
  function stanza(m, d, compatto) {
    const lst = m.perDip[d.id];
    const lav = lst.filter(e => e.stato === 'lavoro').length;
    // Chi lavora va per primo, così i fumetti non si accavallano sui vicini.
    const ord = lst.slice().sort((a, b) => (b.stato === 'lavoro') - (a.stato === 'lavoro'));
    return `<div class="room" style="${varsDip(d)}">
      <div class="rh"><h2>${esc(d.nome)}</h2><span>${esc(d.desc)}</span><span class="n"><i></i>${lav} al lavoro · ${lst.length}</span></div>
      <div class="floor${compatto ? ' compatto' : ''}">${ord.map(e => desk(m, e, compatto)).join('')}</div>
    </div>`;
  }

  function render(m) {
    const compatto = m.n > 16;
    const feed = m.diario.slice().reverse();
    return `<div class="c-app" role="figure" aria-label="Direzione C — Mappa viva (contenuto sintetico)">
      <div class="c-top">
        <h1>${esc(m.azienda.nome)}, <em>adesso</em></h1>
        <p class="sub">${esc(m.azienda.dataLunga)} · <b>${esc(m.azienda.ora)}</b> · <b>${m.alLavoro.length} al lavoro</b> su ${m.n} · ${m.approvazioni.length} in attesa di te · ${m.costoOggi} € spesi oggi</p>
        <div class="r"><span class="cbtn g">${ic('i-search')}Cerca</span><span class="cbtn g ic">${ic('i-bell')}</span><span class="cbtn">${ic('i-plus')}Nuovo obiettivo</span><span class="c-me">${esc(m.azienda.titolare.iniziali)}</span></div>
      </div>
      <div class="c-body">
        <div>
          <div class="rooms">${m.dipartimenti.map(d => stanza(m, d, compatto)).join('')}</div>
          <div class="legend"><span><i class="on"></i>al lavoro</span><span><i class="dash"></i>libero</span><span><i class="dot"></i>pianificato</span><span><i class="err"></i>errore</span><span style="margin-left:auto">${m.dipartimenti.length} stanze · ${m.n} dipendenti</span></div>
        </div>
        <div class="diary">
          <div class="dcard">
            <h3>In attesa di te <span>${m.approvazioni.length}</span></h3>
            ${m.approvazioni.slice(0, 3).map(a => { const e = m.byId[a.chi]; const d = m.dipDi(e); return `<div class="ap" style="${varsDip(d)}"><div class="t"><i>${m.iniziali(e)}</i><div style="min-width:0"><b>${esc(a.cosa)}</b><span>${esc(e.nome)} · ${esc(a.cliente)} · ${esc(a.ora)}</span></div></div><div class="bts"><span class="cbtn ok">${ic('i-check')}Approva</span><span class="cbtn g">Rivedi</span></div></div>`; }).join('')}
          </div>
          <div class="dcard">
            <h3>Diario di oggi <span>${m.diario.length} voci</span></h3>
            <div class="feed">${feed.map((x, i) => { const e = m.byId[x.chi]; const d = m.dipDi(e); return `${i === 0 ? '<div class="hdr">Ultima ora</div>' : ''}${x.ora < '10:00' && (i === 0 || feed[i - 1].ora >= '10:00') ? '<div class="hdr">Stamattina</div>' : ''}<div class="e ${x.tipo}" style="${varsDip(d)}"><span>${esc(x.ora)}</span><i>${m.iniziali(e)}</i><div><b>${esc(e.nome)}</b> ${esc(x.testo)}</div></div>`; }).join('')}</div>
          </div>
        </div>
      </div>
    </div>`;
  }
  return { id: 'C', nome: 'Mappa viva', css: prefissa(css, '.dirC') + cssRaw, render };
})();
