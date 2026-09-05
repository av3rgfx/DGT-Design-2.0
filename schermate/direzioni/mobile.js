/* =====================================================================
   Direzione A — «Console» sul telefono: le approvazioni da mobile
   (versione 11, 2026-09-05, struttura proposta e accettata dall'utente).

   Il titolare approva dal telefono. Cornice mobile dello specimen (300 × 620,
   barra di stato, navigazione a pillola nera in basso con i quattro cerchi del
   rail della Console e, al posto del cerchio lime del video, la campanella lime
   con il numero da approvare). Prima metà (questa sessione): due schermate.

   1. «Da approvare» (fondo chiaro #E0E0E0 come la schermata WORKSPACE): titolo
      e i due numeri del titolare; la richiesta corrente come card lime (avatar,
      cosa, cliente · ora, chip del tipo) con i quattro cerchi della tendina della
      Console (apri, commenta, approva, rifiuta); «In coda» con le richieste come
      righe; in fondo la riga «Riepilogo di oggi».
   2. «Richiesta» (la tendina estesa in colonna, su fondo nero): indietro, le
      frecce che scorrono la coda, chip del tipo, titolo; il documento in una card
      bianca (testo e allegato); «Chi la propone» (avatar, consegnata alle, costo,
      passi a chip); la nota del dipendente; barra fissa in basso con Approva lime
      larga, Chiedi modifiche, Rifiuta rossa. Rifiuta apre il campo del motivo,
      obbligatorio. Decisa una richiesta entra la successiva.

   Stessi componenti della Console (classi .dirA di direzione-a.js: .rb, .pill,
   .chip, .av, .ncard/.nt, .qrow, .badge), stesso modello (dati.js): la decisione
   è m.decidi, così quello che si decide qui vale anche nella Console. Gli avatar
   sono gli orbi della versione 10 (tinta, occhi lilguy, punto di stato).

   Rimandato alla sessione successiva: la revisione di performance sul telefono
   (le richieste di tipo `revisione` restano fuori dalla coda del telefono), la
   schermata «Riepilogo di oggi», lo stato vuoto disegnato, la prova a quaranta.

   API: DGT_MOBILE.render(m, tel, st) → HTML di un telefono; DGT_MOBILE.monta(radice, m, opz)
   disegna i telefoni e collega i clic. opz = { schermate: [1, 2], richiesta: 0 }.
   ===================================================================== */
window.DGT_MOBILE = (function () {
  const { ic, esc, prefissa } = window.DGT_UI;
  const A = window.DIREZIONE_A;

  const css = `
/* la pagina: nero, come la Console; i telefoni affiancati come nello specimen */
.m-page{--black:#000;--card:#1C1C1C;--card-top:#262626;--gray-card:#4D4D4D;--round:#1E1E1E;--pill-src:#3A3A3A;--dots-box:#141414;
  --white:#FCFCFC;--light:#E0E0E0;--light-card:#F0F0F0;--summary:#F4F4F4;--docs:#E4E4E4;--thumb-pill:#A7A7A7;--lime:#B8FC64;--lime-deep:#A8E65D;--red:#F04848;--hangup:#F15E60;
  --badge-red:#F9A3A3;--badge-red-ink:#7A1F1F;--t2:#9A9A9A;--t2-light:#6B6B6B;--ink:#0A0A0A;--font:"Urbanist",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --r-card:28px;--r-inner:22px;--r-pill:9999px;--behind:var(--black);
  min-height:100vh;background:var(--black);color:var(--white);font:400 15px/20px var(--font);-webkit-font-smoothing:antialiased;padding:48px 40px 96px;display:grid;gap:36px;align-content:start;justify-items:center}
.m-page *{box-sizing:border-box}
.m-page h1,.m-page h2,.m-page h3,.m-page h4,.m-page h5,.m-page p{margin:0;font-weight:400}
.m-page svg{display:block}
.m-page [data-az]{cursor:pointer}
.m-hd{display:grid;gap:8px;max-width:920px;text-align:center}
.m-hd h1{font-size:28px;line-height:34px}
.m-hd p{font-size:14px;line-height:20px;color:var(--t2)}
.m-hd p b{color:var(--white);font-weight:500}
/* i telefoni restano 300 × 620 come nello specimen; la pagina li mostra un quarto più grandi (zoom, come la Console) perché si leggano */
.m-phones{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;align-items:flex-start;zoom:1.25}
.m-cap{margin-top:22px;text-align:center;font-size:12px;color:var(--t2);letter-spacing:.06em;text-transform:uppercase}
/* la cornice del telefono (specimen, sezione 02): bezel nero r52, schermo r44 */
.m-tel{width:300px;height:620px;border-radius:52px;background:#0B0B0B;border:1px solid #3F3F3F;padding:10px;box-shadow:0 40px 80px rgb(0 0 0/.55);flex:none}
.m-scr{position:relative;height:100%;border-radius:44px;overflow:hidden;background:var(--black);color:var(--white);font-size:13px;display:flex;flex-direction:column;--behind:var(--black)}
.m-scr.chiara{background:var(--light);color:var(--ink);--behind:var(--light)}
/* barra di stato: l'ora dell'azienda, l'isola nera, segnale, rete, batteria */
.m-sb{position:relative;display:flex;justify-content:space-between;align-items:center;padding:14px 26px 0;font-weight:600;font-size:14px;flex:none}
.m-sb .isl{position:absolute;left:50%;top:10px;transform:translateX(-50%);width:84px;height:24px;border-radius:14px;background:#000}
.m-sb .sig{display:flex;gap:4px;align-items:center}
.m-sb .sig svg{width:14px;height:14px}
.m-sb .sig i{display:block;height:9px;width:18px;border-radius:3px;border:1px solid currentColor}
.m-sb .sig i::after{content:"";display:block;height:100%;width:80%;background:currentColor;border-radius:2px}
/* il corpo scorre sotto la navigazione (o sotto la barra delle azioni) */
.m-scroll{flex:1;min-height:0;overflow:auto;scrollbar-width:none;padding-bottom:96px}
.m-scroll::-webkit-scrollbar{display:none}
.m-scr.motivo .m-scroll{padding-bottom:200px}
/* riga di navigazione: logo DGT e persona sul chiaro; indietro e le frecce della coda sul nero */
.m-nav{display:flex;justify-content:space-between;align-items:center;padding:18px 18px 0}
.m-nav .r{display:flex;gap:8px;align-items:center}
.m-nav .rb{width:44px;height:44px}.m-nav .rb svg{width:16px;height:16px}
.m-nav .av.persona{width:44px;height:44px;font-size:14px}
.m-logo{font-weight:600;font-size:18px;letter-spacing:.12em;padding-left:6px}
.m-pager{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--t2);white-space:nowrap}
.m-pager .rb{width:44px;height:44px}.m-pager .rb svg{width:15px;height:15px}
/* titolo e numeri della schermata «Da approvare» (la riga WORKSPACE della Console, in colonna) */
.m-h1{font-size:30px;line-height:36px;padding:18px 22px 0;letter-spacing:.02em}
.m-stats{display:flex;gap:26px;padding:10px 22px 0}
.m-stat{display:grid;gap:2px;white-space:nowrap}
.m-stat .num{display:flex;align-items:center;gap:8px;font-weight:300;font-size:26px;line-height:30px}
.m-stat .num .badge{font-weight:500}
.m-stat span{font-size:12px;color:var(--t2-light)}
/* intestazione di sezione dentro lo schermo (specimen .sh) */
.m-sh{display:flex;align-items:center;gap:8px;padding:20px 18px 10px}
.m-sh h4{font-size:20px;line-height:24px;flex:1;min-width:0}
.m-sh .chip{height:24px;font-size:11px}
.m-sh .rb{width:36px;height:36px}.m-sh .rb svg{width:14px;height:14px}
/* la card lime della richiesta corrente: la card attività a misura di telefono */
.m-scr .task{width:auto;min-height:0;margin:14px 12px 0;border-radius:24px;grid-template-rows:auto auto auto}
.m-scr .task .who{padding:12px 108px 0 12px;gap:12px}
.m-scr .task .who .av{width:40px;height:40px}
.m-scr .task .who div>b{font-size:14px;line-height:18px}
.m-scr .task .who div>span{font-size:11px}
.m-scr .task .nt{padding:0 0 8px 8px;border-bottom-left-radius:24px}
.m-scr .task .nt .rb{width:40px;height:40px;background:transparent;border-color:rgb(0 0 0/.14);color:var(--ink)}
.m-scr .task .nt .rb svg{width:15px;height:15px}
.m-scr .task .nt .rb .dot{top:8px;right:9px}
.m-scr .task .body{padding:14px 16px 0;gap:12px}
.m-scr .task .ico{width:48px;height:48px}.m-scr .task .ico svg{width:20px;height:20px}
.m-scr .task .tt{font-size:20px;line-height:24px}
.m-scr .task .meta{font-size:13px;gap:6px;margin-top:6px}
.m-scr .task .st{padding:12px 12px 12px}
.m-scr .task .st .k{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.m-scr .task .st .k .chip{height:22px;font-size:11px;padding:0 9px}
.m-scr .task .st .row .rb{width:44px;height:44px}.m-scr .task .st .row .rb svg{width:16px;height:16px}
.m-scr .task .st .row .rb.olight{border-color:rgb(0 0 0/.16)}
.m-scr .task .st .pag{flex:1;text-align:center;font-size:12px;color:rgb(0 0 0/.6);white-space:nowrap}
/* la coda e la riga del riepilogo: le righe della tendina della Console */
.m-coda{display:grid;gap:8px;padding:0 12px}
.m-coda .qrow .tx span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-vuoto{margin:16px 12px 0;height:120px;border-radius:24px;border:1px dashed rgb(0 0 0/.2);display:grid;place-items:center;align-content:center;gap:4px;color:var(--t2-light);font-size:14px;text-align:center;padding:0 24px}
.m-vuoto b{font-weight:400;font-size:18px;color:var(--ink)}
.m-scr:not(.chiara) .m-vuoto{border-color:rgb(255 255 255/.2);color:var(--t2)}
.m-scr:not(.chiara) .m-vuoto b{color:var(--white)}
/* navigazione in basso: campanella lime con il numero, pillola nera con i quattro cerchi del rail */
.m-bnav{position:absolute;left:14px;right:14px;bottom:14px;height:64px;display:flex;align-items:center;gap:10px}
.m-bnav .meet{position:relative;width:52px;height:52px;border-radius:50%;background:var(--lime);display:grid;place-items:center;color:var(--ink);flex:none}
.m-bnav .meet svg{width:20px;height:20px}
.m-bnav .meet .n{position:absolute;top:-5px;right:-5px;min-width:22px;height:22px;padding:0 6px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);font-size:12px;font-weight:500;display:grid;place-items:center;border:2px solid var(--light)}
.m-bnav .tabs{flex:1;height:64px;border-radius:var(--r-pill);background:var(--ink);display:flex;align-items:center;justify-content:space-around;padding:0 8px}
.m-bnav .tabs .rb{width:44px;height:44px;background:#1F1F1F;border-color:transparent}
.m-bnav .tabs .rb.white{background:var(--white);color:var(--ink)}
.m-bnav .tabs .rb svg{width:16px;height:16px}
/* schermata «Richiesta»: titolo, documento bianco, card scure, barra delle azioni */
.m-tit{padding:16px 22px 0;display:grid;gap:8px}
.m-tit .chips{display:flex;gap:6px;flex-wrap:wrap}
.m-tit .chip{height:24px;font-size:11px}
.m-tit h2{font-size:24px;line-height:28px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.m-tit .sotto{font-size:13px;line-height:18px;color:var(--t2)}
.m-tit .sotto b{color:var(--white);font-weight:500}
.m-corpo{display:grid;gap:10px;padding:16px 12px 0}
.m-doc{background:var(--white);color:var(--ink);border-radius:24px;padding:16px;display:grid;gap:12px;align-content:start}
.m-doc .lb{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--t2-light);min-width:0}
.m-doc .lb .chip{height:24px;font-size:11px;flex:none}
.m-doc .lb span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m-doc .tx{font-size:14px;line-height:21px;color:#1E1E1E;white-space:pre-line}
.m-doc .tx.mono{font-size:13px;line-height:20px}
.m-doc .img{height:110px;border-radius:14px;background:#E4E4E4;display:grid;place-items:center;align-content:center;gap:6px;color:#8A8A8A;font-size:12px;text-align:center;padding:0 12px}
.m-doc .img svg{width:22px;height:22px;color:#8A8A8A}
.m-det{border-radius:24px;padding:14px 16px 16px;background:linear-gradient(180deg,var(--card-top),var(--card));display:grid;gap:10px}
.m-det h5{font-size:15px;line-height:20px;color:var(--t2)}
.m-det .who{display:flex;align-items:center;gap:12px;min-width:0}
.m-det .who .av{width:40px;height:40px}
.m-det .who div{min-width:0}
.m-det .who b{display:block;font-weight:500;font-size:15px;line-height:20px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-det .who span{display:block;font-size:12px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-det .kv{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:var(--t2)}
.m-det .kv b{font-weight:500;color:var(--white);text-align:right}
.m-det .passi{display:flex;flex-wrap:wrap;gap:6px}
.m-det .passi .chip{height:24px;font-size:11px}
.m-det p{font-size:13px;line-height:19px;color:#DADADA}
.m-fade{position:absolute;left:0;right:0;bottom:0;height:130px;background:linear-gradient(180deg,transparent,var(--black) 45%);pointer-events:none}
.m-scr.motivo .m-fade{height:230px;background:linear-gradient(180deg,transparent,var(--black) 32%)}
/* la barra delle azioni: una colonna a larghezza vincolata (niente sfori orizzontali: lo schermo non deve poter scorrere di lato) */
.m-bar{position:absolute;left:14px;right:14px;bottom:14px;display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
.m-bar>*{min-width:0}
.m-bar .row{display:flex;gap:8px;align-items:center;min-width:0}
.m-bar .pill{height:48px;flex:1;justify-content:center;cursor:pointer;min-width:0;padding:0 16px}
.m-bar .pill.ghost{border-color:rgb(255 255 255/.16);flex:none}
.m-bar .rb{cursor:pointer}
.m-bar .k{font-size:11px;line-height:14px;color:var(--t2);text-transform:uppercase;letter-spacing:.06em;padding-left:8px}
.m-bar input{height:48px;border-radius:var(--r-pill);background:var(--white);border:1px solid transparent;padding:0 18px;font:400 14px/20px var(--font);color:var(--ink);outline:none;width:100%;-webkit-font-smoothing:antialiased}
.m-bar input:focus{border-color:var(--ink)}
.m-bar input::placeholder{color:#A7A7A7}
.m-bar input.manca{border-color:var(--hangup)}
`;

  const av = (m, e, size, stato, extra, opz) => A.av(m, e, size, stato, extra, opz);
  const iconaTipo = A.iconaTipo, nomeTipo = A.nomeTipo;
  /* La coda del telefono: le richieste in attesa, le più vecchie prima (come nella Console). Le revisioni di performance
     restano fuori fino alla sessione successiva (le due versioni a confronto sul telefono sono ancora da disegnare). */
  const coda = m => m.richiesteDi('attesa').filter(r => r.tipo !== 'revisione').sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min));
  const corrente = (m, st) => { const c = coda(m); const idx = Math.min(st.richiesta || 0, Math.max(0, c.length - 1)); return { c, idx, r: c[idx] }; };

  /* ---------- pezzi comuni ---------- */
  const barraStato = m => `<div class="m-sb"><span>${esc(m.azienda.ora)}</span><span class="isl"></span><span class="sig">${ic('i-signal')}${ic('i-wifi')}<i></i></span></div>`;
  const navigazione = (m, n, attiva) => `<div class="m-bnav">
      <span class="meet" data-az="schermata" data-s="1" title="Da approvare">${ic('i-bell')}${n ? `<span class="n">${n}</span>` : ''}</span>
      <div class="tabs"><span class="rb${attiva === 1 ? ' white' : ''}" data-az="schermata" data-s="1" title="Da approvare">${ic('i-list')}</span><span class="rb" title="Dipartimenti">${ic('i-org')}</span><span class="rb" title="Chat">${ic('i-chat')}</span><span class="rb" title="Agenda">${ic('i-cal')}</span></div>
    </div>`;
  const vuoto = () => `<div class="m-vuoto"><b>Niente da approvare</b><span>Le prossime consegne arriveranno qui</span></div>`;

  /* ---------- schermata 1: Da approvare ---------- */
  function cardCorrente(m, r, idx, n) {
    const chi = m.byId[r.chi];
    return `<div class="ncard task lime" data-az="apri" data-idx="${idx}">
      <div class="who">${av(m, chi, '', 'attesa')}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
      <div class="nt"><span class="rb olight">${ic('i-bell')}<i class="dot"></i></span><span class="rb olight" data-az="apri" data-idx="${idx}" title="Apri la richiesta">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaTipo[r.tipo])}</span><div><div class="tt">${esc(r.cosa)}</div><div class="meta"><b>${esc(r.cliente)}</b><span>·</span><b>${esc(r.ora)}</b></div></div></div>
      <div class="st"><span class="k">Decidi<span class="chip onlime">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]} · ${r.costo} € · ${r.passi.length} passi</span></span><div class="row"><span class="rb olight" data-az="apri" data-idx="${idx}" title="Apri">${ic('i-eye')}</span><span class="rb olight" title="Commenta">${ic('i-chat')}</span><span class="pag">${idx + 1} di ${n}</span><span class="rb black" data-az="approva" data-id="${r.id}" title="Approva">${ic('i-check')}</span><span class="rb red" data-az="rifiuta" data-idx="${idx}" title="Rifiuta con un motivo">${ic('i-x')}</span></div></div>
    </div>`;
  }
  function daApprovare(m, tel, st) {
    const { c, idx, r } = corrente(m, st);
    const oggiOk = m.richieste.filter(x => x.giorno === 0 && x.stato === 'approvata').length;
    return `<div class="m-scr chiara" data-schermata="1">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="m-logo">DGT</span><span class="r"><span class="rb white" title="Ordina e filtra">${ic('i-sliders')}</span><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></span></div>
        <h3 class="m-h1">DA APPROVARE</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${c.length}${c.length ? `<span class="badge down">${ic('i-bell')}${Math.min(2, c.length)}</span>` : ''}</span><span>da approvare</span></div>
          <div class="m-stat"><span class="num">${oggiOk}${oggiOk ? `<span class="badge up">${ic('i-up')}${oggiOk}</span>` : ''}</span><span>approvate oggi</span></div>
        </div>
        ${r ? cardCorrente(m, r, idx, c.length) : vuoto()}
        ${c.length ? `<div class="m-sh"><h4>In coda</h4><span class="chip light">${c.length}</span><span class="rb olight" title="Ordina">${ic('i-sort')}</span></div>
        <div class="m-coda">${c.map((x, i) => { const e = m.byId[x.chi]; return `<div class="qrow${i === idx ? ' on' : ''}" data-az="apri" data-idx="${i}">${av(m, e, 'xs', 'attesa')}<div class="tx"><b>${esc(x.cosa)}</b><span>${esc(m.etichetta(e))} · ${esc(x.cliente)} · ${esc(x.ora)}</span></div><span class="rb xs">${ic('i-chevr')}</span></div>`; }).join('')}</div>` : ''}
        <div class="m-coda" style="margin-top:${c.length ? 18 : 16}px"><div class="qrow" data-az="schermata" data-s="3"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-wand')}</span><div class="tx"><b>Riepilogo di oggi</b><span>consegne, spesa, obiettivo, diario</span></div><span class="rb xs">${ic('i-chevr')}</span></div></div>
      </div>
      ${navigazione(m, c.length, 1)}
    </div>`;
  }

  /* ---------- schermata 2: Richiesta ---------- */
  function richiesta(m, tel, st) {
    const { c, idx, r } = corrente(m, st);
    const pag = `<span class="m-pager"><span class="rb" data-az="prec" title="Precedente">${ic('i-left')}</span>${c.length ? `${idx + 1} di ${c.length}` : '0 di 0'}<span class="rb" data-az="succ" title="Successiva">${ic('i-right')}</span></span>`;
    if (!r) return `<div class="m-scr" data-schermata="2">${barraStato(m)}<div class="m-scroll"><div class="m-nav"><span class="rb" data-az="indietro" title="Indietro">${ic('i-left')}</span>${pag}</div>${vuoto()}</div>${navigazione(m, 0, 1)}</div>`;
    const chi = m.byId[r.chi];
    const doc = r.tipo === 'post'
      ? `<div class="lb"><span class="chip light">${ic('i-mega')}LinkedIn · bozza</span><span>${esc(r.cliente)}</span></div><div class="tx">${esc(r.testo)}</div><div class="img">${ic('i-doc')}${esc(r.allegato)}</div>`
      : `<div class="lb"><span class="chip light">${ic(iconaTipo[r.tipo])}${esc(r.allegato)}</span><span>${esc(r.cliente)}</span></div><div class="tx mono">${esc(r.testo)}</div>`;
    const azioni = tel.motivo
      ? `<div class="m-bar motivo"><span class="k">Motivo del rifiuto, obbligatorio</span><input type="text" data-campo="motivo" placeholder="Es. fuori tono: ripartire dai casi cliente" maxlength="120" autocomplete="off"><div class="row"><span class="pill red" data-az="rifiuta-conferma" data-id="${r.id}">${ic('i-x')}Rifiuta</span><span class="pill ghost" data-az="rifiuta-annulla">Annulla</span></div></div>`
      : `<div class="m-bar"><div class="row"><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Approva</span><span class="rb ghost" data-az="modifiche" data-id="${r.id}" title="Chiedi modifiche">${ic('i-pen')}</span><span class="rb red" data-az="rifiuta" data-idx="${idx}" title="Rifiuta con un motivo">${ic('i-x')}</span></div></div>`;
    return `<div class="m-scr${tel.motivo ? ' motivo' : ''}" data-schermata="2">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="rb" data-az="indietro" title="Da approvare">${ic('i-left')}</span>${pag}</div>
        <div class="m-tit">
          <div class="chips"><span class="chip">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span><span class="chip">${r.costo} €</span><span class="chip">${r.passi.length} passi</span></div>
          <h2>${esc(r.cosa)}</h2>
          <div class="sotto"><b>${esc(m.etichetta(chi))}</b> · ${esc(r.cliente)} · consegnata alle ${esc(r.ora)}</div>
        </div>
        <div class="m-corpo">
          <div class="m-doc">${doc}</div>
          <div class="m-det"><h5>Chi la propone</h5><div class="who">${av(m, chi, '', 'attesa')}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
            <div class="kv"><span>Consegnata alle</span><b>${esc(r.ora)}</b></div><div class="kv"><span>Costo della consegna</span><b>${r.costo} €</b></div>
            <div class="passi">${r.passi.map(p => `<span class="chip">${ic('i-check')}${esc(p)}</span>`).join('')}</div></div>
          <div class="m-det"><h5>Nota del dipendente</h5><p>${esc(r.nota)}</p></div>
        </div>
      </div>
      <div class="m-fade"></div>
      ${azioni}
    </div>`;
  }

  /* Un telefono: tel = { n, schermata, motivo }; st = { richiesta } condiviso fra i telefoni. */
  function render(m, tel, st) {
    const scr = tel.schermata === 2 ? richiesta(m, tel, st) : daApprovare(m, tel, st);
    return `<div class="m-tel" data-n="${tel.n}" role="figure" aria-label="Telefono ${tel.n} — ${tel.schermata === 2 ? 'Richiesta' : 'Da approvare'} (contenuto sintetico)">${scr}</div>`;
  }
  const NOMI = { 1: 'Da approvare', 2: 'Richiesta', 3: 'Riepilogo di oggi' };

  /* Disegna la pagina con i telefoni e collega i clic. I telefoni condividono il modello e la richiesta corrente:
     quello che si decide su uno si vede subito sugli altri (e nella Console, che legge lo stesso modello). */
  function monta(radice, m, opz) {
    opz = opz || {};
    const st = { richiesta: opz.richiesta || 0 };
    const tels = (opz.schermate && opz.schermate.length ? opz.schermate : [1, 2]).map((s, i) => ({ n: i + 1, schermata: s === 2 ? 2 : 1, motivo: false }));
    const n = () => coda(m).length;
    radice.innerHTML = `<div class="m-page">
      <div class="m-hd"><h1>Le approvazioni da mobile</h1><p>Prima metà: <b>Da approvare</b> e <b>Richiesta</b> per post, documento, lista e proposta, con il rifiuto con motivo. I telefoni condividono il modello della Console: la richiesta scelta su uno si apre sull'altro, e quello che si decide qui vale anche lì.</p></div>
      <div class="m-phones"></div>
    </div>`;
    const cont = radice.querySelector('.m-phones');
    const tutto = () => {
      const scroll = [...cont.querySelectorAll('.m-tel')].map(t => { const s = t.querySelector('.m-scroll'); return s ? s.scrollTop : 0; });
      cont.innerHTML = tels.map(t => `<div>${render(m, t, st)}<div class="m-cap">${t.n} · ${NOMI[t.schermata]}</div></div>`).join('');
      cont.querySelectorAll('.m-tel').forEach((t, i) => { const s = t.querySelector('.m-scroll'); if (s && scroll[i]) s.scrollTop = scroll[i]; });
      window.DGT_AVATAR.anima(radice);
    };
    const telDi = el => { const t = el.closest('.m-tel'); return t ? tels[+t.dataset.n - 1] : tels[0]; };
    const decidi = (id, stato, commento) => {
      if (!m.decidi(id, stato, commento)) return;
      tels.forEach(t => { t.motivo = false; });
      if (st.richiesta >= n()) st.richiesta = Math.max(0, n() - 1);
      tutto();
    };
    const apriMotivo = (tel, idx) => {
      if (idx !== undefined && idx >= 0) st.richiesta = idx;
      tel.schermata = 2; tel.motivo = true; tutto();
      const inp = cont.querySelector(`.m-tel[data-n="${tel.n}"] input[data-campo="motivo"]`);
      if (inp) inp.focus({ preventScroll: true });   // il fuoco non deve far scorrere lo schermo del telefono
    };
    tutto();
    radice.addEventListener('keydown', ev => {
      const inp = ev.target.closest('input[data-campo="motivo"]'); if (!inp) return;
      if (ev.key === 'Enter') { ev.preventDefault(); const b = inp.closest('.m-bar').querySelector('[data-az="rifiuta-conferma"]'); if (b) b.click(); }
      if (ev.key === 'Escape') { ev.preventDefault(); telDi(inp).motivo = false; tutto(); }
    });
    radice.addEventListener('input', ev => { const inp = ev.target.closest('input[data-campo="motivo"]'); if (inp) inp.classList.remove('manca'); });
    radice.addEventListener('click', ev => {
      const el = ev.target.closest('[data-az]'); if (!el || !radice.contains(el)) return;
      const az = el.dataset.az, tel = telDi(el);
      if (az === 'apri') { ev.stopPropagation(); if (el.dataset.idx !== undefined) st.richiesta = +el.dataset.idx; tel.schermata = 2; tel.motivo = false; tutto(); }
      else if (az === 'indietro') { tel.schermata = 1; tel.motivo = false; tutto(); }
      else if (az === 'schermata') { ev.stopPropagation(); const s = +el.dataset.s; if (s === 1 || s === 2) { tel.schermata = s; tel.motivo = false; tutto(); } /* la 3 (Riepilogo di oggi) è della sessione successiva */ }
      else if (az === 'prec') { if (n()) st.richiesta = (st.richiesta - 1 + n()) % n(); tel.motivo = false; tutto(); }
      else if (az === 'succ') { if (n()) st.richiesta = (st.richiesta + 1) % n(); tel.motivo = false; tutto(); }
      else if (az === 'approva') { ev.stopPropagation(); decidi(el.dataset.id, 'approvata'); }
      else if (az === 'modifiche') { ev.stopPropagation(); decidi(el.dataset.id, 'modifiche', 'Modifiche chieste dal titolare'); }
      /* il rifiuto vuole sempre un motivo: dalla card della prima schermata si apre la richiesta con il campo pronto */
      else if (az === 'rifiuta') { ev.stopPropagation(); apriMotivo(tel, el.dataset.idx !== undefined ? +el.dataset.idx : undefined); }
      else if (az === 'rifiuta-annulla') { tel.motivo = false; tutto(); }
      else if (az === 'rifiuta-conferma') {
        const inp = el.closest('.m-bar').querySelector('input[data-campo="motivo"]'); const v = inp ? inp.value.trim() : '';
        if (!v) { if (inp) { inp.classList.add('manca'); inp.focus(); } return; }
        decidi(el.dataset.id, 'rifiutata', v);
      }
    });
    return { st, tels, tutto };
  }

  return { id: 'M', nome: 'Mobile', css: prefissa(css, '.dirA'), render, monta, coda };
})();
