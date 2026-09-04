/* =====================================================================
   Direzione B — «Registro operativo». Deliberatamente lontana dal riferimento:
   fondo chiaro, tabella densa raggruppata per dipartimento, Inter 13 px,
   bordi da 1 px, raggi piccoli, un solo blu funzionale. Il "adesso" è una
   colonna, non un luogo. Serve a vedere cosa si esclude scegliendo A.
   ===================================================================== */
window.DIREZIONE_B = (function () {
  const { ic, esc, prefissa } = window.DGT_UI;

  const css = `
.b-app{--bg:#F5F6F8;--pan:#FFFFFF;--bd:#E2E5EA;--bd2:#CBD0D8;--tx:#111827;--t2:#5B6472;--t3:#8A93A1;--blu:#2457D6;--blu-bg:#E8EEFB;
  --ver:#15803D;--ver-bg:#E4F5EA;--amb:#B45309;--amb-bg:#FDF1DC;--ros:#B91C1C;--ros-bg:#FBE4E4;--gri-bg:#EEF0F3;
  --font:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  width:1440px;min-height:900px;display:grid;grid-template-columns:208px minmax(0,1fr);background:var(--bg);color:var(--tx);font:400 13px/18px var(--font);-webkit-font-smoothing:antialiased;font-feature-settings:"tnum" 1,"cv11" 1}
.b-app *{box-sizing:border-box}
.b-app svg{display:block;width:14px;height:14px}
.b-app h1,.b-app h2,.b-app h3,.b-app p{margin:0;font-weight:500}
.b-side{background:var(--pan);border-right:1px solid var(--bd);display:flex;flex-direction:column;padding:14px 12px;gap:6px}
.b-brand{display:flex;align-items:center;gap:8px;padding:6px 8px 14px;font-weight:600;font-size:13px}
.b-brand i{width:22px;height:22px;border-radius:6px;background:var(--tx);color:#fff;display:grid;place-items:center;font-size:10px;font-weight:700}
.b-brand span{color:var(--t3);font-weight:400}
.b-nav{display:grid;gap:2px}
.b-nav a{display:flex;align-items:center;gap:10px;height:30px;padding:0 8px;border-radius:6px;color:var(--t2);text-decoration:none}
.b-nav a svg{color:var(--t3)}
.b-nav a.on{background:var(--blu-bg);color:var(--blu);font-weight:500}.b-nav a.on svg{color:var(--blu)}
.b-nav a b{margin-left:auto;font-weight:500;font-size:11px;color:var(--t3);background:var(--gri-bg);padding:1px 6px;border-radius:4px}
.b-nav a.on b{background:#fff;color:var(--blu)}
.b-nav .lb{font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;padding:14px 8px 4px}
.b-side .sp{flex:1}
.b-user{display:flex;align-items:center;gap:8px;padding:8px;border-top:1px solid var(--bd);font-size:12px;color:var(--t2)}
.b-user i{width:24px;height:24px;border-radius:50%;background:#D8E1F3;color:#25408F;display:grid;place-items:center;font-size:10px;font-weight:600}
.b-main{display:flex;flex-direction:column;min-width:0}
.b-top{height:48px;background:var(--pan);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:12px;padding:0 20px}
.b-top .crumb{color:var(--t3)}.b-top .crumb b{color:var(--tx);font-weight:500}
.b-top .search{margin-left:24px;width:320px;height:30px;border:1px solid var(--bd);border-radius:6px;background:var(--bg);display:flex;align-items:center;gap:8px;padding:0 10px;color:var(--t3)}
.b-top .search kbd{margin-left:auto;font:500 11px/1 var(--font);color:var(--t3);border:1px solid var(--bd);border-radius:4px;padding:2px 5px;background:#fff}
.b-top .r{margin-left:auto;display:flex;align-items:center;gap:8px}
.btn{height:30px;padding:0 12px;border-radius:6px;border:1px solid var(--bd2);background:var(--pan);color:var(--tx);font:500 13px/1 var(--font);display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.btn.pri{background:var(--blu);border-color:var(--blu);color:#fff}
.btn.ic{width:30px;padding:0;justify-content:center;color:var(--t2)}
.btn.xs{height:24px;padding:0 8px;font-size:12px}
.b-wrap{padding:20px;display:grid;gap:16px;grid-template-columns:minmax(0,1fr) 320px;align-items:start}
.b-col{display:grid;gap:16px;min-width:0}
.b-head{display:flex;align-items:baseline;gap:12px}
.b-head h1{font-size:20px;line-height:28px;font-weight:600;letter-spacing:-.01em}
.b-head span{color:var(--t3)}
.kpis{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
.kpi{background:var(--pan);border:1px solid var(--bd);border-radius:8px;padding:12px 14px;display:grid;gap:4px}
.kpi .l{font-size:12px;color:var(--t2)}
.kpi .v{font-size:22px;line-height:28px;font-weight:600;letter-spacing:-.02em;display:flex;align-items:baseline;gap:6px}
.kpi .v small{font-size:12px;color:var(--t3);font-weight:400}
.kpi .d{font-size:11px;color:var(--t3)}
.kpi .d.ok{color:var(--ver)}.kpi .d.no{color:var(--ros)}
.kpi .bar{height:4px;border-radius:2px;background:var(--gri-bg);overflow:hidden;margin-top:4px}
.kpi .bar i{display:block;height:100%;background:var(--blu)}
.tb{background:var(--pan);border:1px solid var(--bd);border-radius:8px;overflow:hidden}
.tbar{display:flex;align-items:center;gap:4px;padding:8px 10px;border-bottom:1px solid var(--bd)}
.tab{height:28px;padding:0 10px;border-radius:6px;display:inline-flex;align-items:center;gap:6px;color:var(--t2);font-weight:500;white-space:nowrap}
.tab.on{background:var(--gri-bg);color:var(--tx)}
.tab b{font-weight:500;font-size:11px;color:var(--t3)}
.tbar .r{margin-left:auto;display:flex;gap:6px}
table{width:100%;border-collapse:collapse;table-layout:fixed}
th{text-align:left;font-weight:500;font-size:11px;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;padding:8px 10px;border-bottom:1px solid var(--bd);white-space:nowrap;background:#FAFBFC}
th.n,td.n{text-align:right}
td{padding:0 10px;height:36px;border-bottom:1px solid var(--bd);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;vertical-align:middle}
tr.grp td{height:32px;background:#FAFBFC;font-weight:500;color:var(--tx)}
tr.grp td span{color:var(--t3);font-weight:400;margin-left:8px}
tr.grp td svg{display:inline-block;vertical-align:-3px;margin-right:6px;color:var(--t3)}
tr.lav td{background:#FBFDFB}
.who{display:flex;align-items:center;gap:8px;min-width:0}
.who i{width:22px;height:22px;border-radius:50%;background:var(--gri-bg);color:var(--t2);display:grid;place-items:center;font-size:9px;font-weight:600;flex:none}
.who b{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.who b span{font-weight:400;color:var(--t3)}
.st{display:inline-flex;align-items:center;gap:6px;height:22px;padding:0 8px;border-radius:5px;font-size:12px;font-weight:500;background:var(--gri-bg);color:var(--t2)}
.st::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor}
.st.lavoro{background:var(--ver-bg);color:var(--ver)}
.st.attesa{background:var(--amb-bg);color:var(--amb)}
.st.errore{background:var(--ros-bg);color:var(--ros)}
.st.pianificato{background:var(--blu-bg);color:var(--blu)}
.mut{color:var(--t3)}
.prog{display:flex;align-items:center;gap:8px}
.prog i{flex:1;height:4px;border-radius:2px;background:var(--gri-bg);overflow:hidden;display:block}
.prog i b{display:block;height:100%;background:var(--ver)}
.prog span{font-size:11px;color:var(--t2);width:34px;text-align:right}
td .btn.xs{color:var(--blu);border-color:var(--bd)}
.acts{display:flex;gap:4px;justify-content:flex-end}
.acts .btn.ic{width:26px;height:26px}
/* pannello destro */
.b-aside{display:grid;gap:16px}
.card{background:var(--pan);border:1px solid var(--bd);border-radius:8px}
.card .h{display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--bd);font-weight:600}
.card .h span{color:var(--t3);font-weight:400}
.card .h .btn{margin-left:auto}
.apr{padding:10px 14px;border-bottom:1px solid var(--bd);display:grid;gap:6px}
.apr:last-child{border-bottom:0}
.apr .t{display:flex;justify-content:space-between;gap:8px}
.apr .t b{font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.apr .t span{color:var(--t3);font-size:12px;flex:none}
.apr .m{font-size:12px;color:var(--t2)}
.apr .bts{display:flex;gap:6px;margin-top:2px}
.apr .bts .btn.xs.ok{background:var(--ver);border-color:var(--ver);color:#fff}
.log{padding:6px 0}
.log .e{display:grid;grid-template-columns:44px 1fr;gap:8px;padding:6px 14px;font-size:12px;line-height:17px}
.log .e span{color:var(--t3);font-variant-numeric:tabular-nums}
.log .e b{font-weight:500}
.log .e.errore b{color:var(--ros)}
.log .e.approvazione b{color:var(--amb)}
`;

  const iniz = m => e => m.iniziali(e);
  function stato(m, e) {
    const s = e.stato;
    const nomi = { lavoro: 'Al lavoro', attesa: 'Da approvare', pianificato: 'Pianificato', errore: 'Errore', libero: 'Libero' };
    return `<span class="st ${s}">${nomi[s]}</span>`;
  }
  function riga(m, e) {
    const a = e.att;
    let att = esc(a.titolo), quando = '', passo = '', azione = '';
    if (e.stato === 'lavoro') { quando = `da ${esc(a.da)}`; passo = `<div class="prog"><i><b style="width:${Math.round(100 * a.passo[0] / a.passo[1])}%"></b></i><span>${a.passo[0]}/${a.passo[1]}</span></div>`; azione = `<span class="btn xs">Apri</span>`; }
    else if (e.stato === 'attesa') { quando = `consegnato ${esc(a.fine)}`; passo = `<span class="mut">completato</span>`; azione = `<span class="btn xs">Rivedi</span>`; }
    else if (e.stato === 'errore') { quando = `fallito ${esc(a.da)}`; passo = `<span style="color:var(--ros)">${esc(a.errore)}</span>`; azione = `<span class="btn xs">Riprova</span>`; }
    else if (e.stato === 'pianificato') { quando = `alle ${esc(a.quando)}`; passo = `<span class="mut">in coda</span>`; azione = `<span class="btn xs">Avvia ora</span>`; }
    else { att = `<span class="mut">ultima: ${esc(a.titolo)}</span>`; quando = `<span class="mut">${esc(a.fine)}</span>`; passo = `<span class="mut">—</span>`; azione = `<span class="btn xs">Assegna</span>`; }
    return `<tr class="${e.stato === 'lavoro' ? 'lav' : ''}">
      <td><div class="who"><i>${m.iniziali(e)}</i><b>${esc(e.nome)} <span>· ${esc(e.ruolo)}</span></b></div></td>
      <td>${stato(m, e)}</td>
      <td>${att}<span class="mut"> · ${esc(a.cliente)}</span></td>
      <td class="mut">${quando}</td>
      <td>${passo}</td>
      <td class="n">${a.costo ? a.costo + ' €' : '<span class="mut">—</span>'}</td>
      <td class="n"><div class="acts">${azione}<span class="btn ic">${ic('i-chat')}</span><span class="btn ic">${ic('i-right')}</span></div></td>
    </tr>`;
  }
  function gruppo(m, d) {
    const lst = m.perDip[d.id];
    const lav = lst.filter(e => e.stato === 'lavoro').length;
    const cost = lst.reduce((t, e) => t + (e.att.costo || 0), 0);
    return `<tr class="grp"><td colspan="5">${ic('i-chev')}${esc(d.nome)}<span>${lst.length} dipendenti · ${lav} al lavoro</span></td><td class="n">${cost} €</td><td></td></tr>` + lst.map(e => riga(m, e)).join('');
  }

  function render(m) {
    const err = m.conta('errore');
    const consegne = m.diario.filter(x => x.tipo === 'approvazione').length;
    const budget = m.n > 16 ? 1500 : 400;
    return `<div class="b-app" role="figure" aria-label="Direzione B — Registro operativo (contenuto sintetico)">
      <aside class="b-side">
        <div class="b-brand"><i>D</i>DGT <span>· ${esc(m.azienda.nome)}</span></div>
        <nav class="b-nav">
          <a class="on">${ic('i-home')}Panoramica</a>
          <a>${ic('i-play')}Esecuzioni<b>${m.alLavoro.length}</b></a>
          <a>${ic('i-bell')}Approvazioni<b>${m.approvazioni.length}</b></a>
          <a>${ic('i-org')}Dipartimenti<b>${m.dipartimenti.length}</b></a>
          <a>${ic('i-bot')}Dipendenti<b>${m.n}</b></a>
          <a>${ic('i-doc')}Obiettivi</a>
          <a>${ic('i-euro')}Costi</a>
          <span class="lb">Azienda</span>
          <a>${ic('i-chat')}Chat</a>
          <a>${ic('i-gear')}Impostazioni</a>
        </nav>
        <span class="sp"></span>
        <div class="b-user"><i>${esc(m.azienda.titolare.iniziali)}</i>${esc(m.azienda.titolare.nome)}</div>
      </aside>
      <div class="b-main">
        <div class="b-top">
          <span class="crumb"><b>${esc(m.azienda.nome)}</b> / Panoramica</span>
          <div class="search">${ic('i-search')}Cerca dipendenti, attività, clienti…<kbd>⌘K</kbd></div>
          <div class="r"><span class="btn">${ic('i-cal')}Oggi, ${esc(m.azienda.data)}</span><span class="btn ic">${ic('i-bell')}</span><span class="btn pri">${ic('i-plus')}Nuovo obiettivo</span></div>
        </div>
        <div class="b-wrap">
          <div class="b-col">
            <div class="b-head"><h1>Panoramica</h1><span>${esc(m.azienda.dataLunga)} · aggiornato alle ${esc(m.azienda.ora)}</span></div>
            <div class="kpis">
              <div class="kpi"><span class="l">Al lavoro adesso</span><span class="v">${m.alLavoro.length}<small>di ${m.n}</small></span><span class="d ok">+1 rispetto a un'ora fa</span></div>
              <div class="kpi"><span class="l">Da approvare</span><span class="v">${m.approvazioni.length}</span><span class="d">la più vecchia alle ${esc(m.approvazioni[m.approvazioni.length - 1].ora)}</span></div>
              <div class="kpi"><span class="l">Errori</span><span class="v">${err}</span><span class="d ${err ? 'no' : ''}">${err ? 'richiede intervento' : 'nessuno'}</span></div>
              <div class="kpi"><span class="l">Costo di oggi</span><span class="v">${m.costoOggi} €<small>su ${budget} €</small></span><span class="bar"><i style="width:${Math.round(100 * m.costoOggi / budget)}%"></i></span></div>
              <div class="kpi"><span class="l">Consegne di oggi</span><span class="v">${consegne}</span><span class="d">obiettivo del mese: 39</span></div>
            </div>
            <div class="tb">
              <div class="tbar">
                <span class="tab on">Tutti <b>${m.n}</b></span><span class="tab">Al lavoro <b>${m.alLavoro.length}</b></span><span class="tab">Da approvare <b>${m.conta('attesa')}</b></span><span class="tab">Errori <b>${err}</b></span><span class="tab">Pianificati <b>${m.conta('pianificato')}</b></span><span class="tab">Liberi <b>${m.conta('libero')}</b></span>
                <div class="r"><span class="btn">${ic('i-org')}Dipartimento ${ic('i-chev')}</span><span class="btn ic">${ic('i-sort')}</span><span class="btn ic">${ic('i-sliders')}</span></div>
              </div>
              <table>
                <colgroup><col style="width:210px"><col style="width:112px"><col><col style="width:108px"><col style="width:120px"><col style="width:72px"><col style="width:112px"></colgroup>
                <thead><tr><th>Dipendente</th><th>Stato</th><th>Attività · cliente</th><th>Quando</th><th>Avanzamento</th><th class="n">Costo</th><th class="n">Azioni</th></tr></thead>
                <tbody>${m.dipartimenti.map(d => gruppo(m, d)).join('')}</tbody>
              </table>
            </div>
          </div>
          <div class="b-aside">
            <div class="card">
              <div class="h">Da approvare <span>${m.approvazioni.length}</span><span class="btn xs">Vedi tutte</span></div>
              ${m.approvazioni.slice(0, 4).map(a => { const e = m.byId[a.chi]; return `<div class="apr"><div class="t"><b>${esc(a.cosa)}</b><span>${esc(a.ora)}</span></div><div class="m">${esc(e.nome)} · ${esc(e.ruolo)} · ${esc(a.cliente)}</div><div class="bts"><span class="btn xs ok">${ic('i-check')}Approva</span><span class="btn xs">Rivedi</span><span class="btn xs">Commenta</span></div></div>`; }).join('')}
            </div>
            <div class="card">
              <div class="h">Registro di oggi <span>${m.diario.length} eventi</span><span class="btn xs">Tutto</span></div>
              <div class="log">${m.diario.slice().reverse().map(x => { const e = m.byId[x.chi]; return `<div class="e ${x.tipo}"><span>${esc(x.ora)}</span><div><b>${esc(e.nome)}</b> ${esc(x.testo)}</div></div>`; }).join('')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  return { id: 'B', nome: 'Registro operativo', css: prefissa(css, '.dirB'), render };
})();
