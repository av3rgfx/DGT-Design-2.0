/* =====================================================================
   Direzione A — «Console» sul telefono: le approvazioni da mobile
   (versione 11, 2026-09-05, prima metà; versione 12, 2026-09-06, seconda metà).

   Il titolare approva dal telefono. Cornice mobile dello specimen (300 × 620,
   barra di stato, navigazione a pillola nera in basso con i quattro cerchi del
   rail della Console e, al posto del cerchio lime del video, la campanella lime
   con il numero da approvare). Tre schermate.

   1. «Da approvare» (fondo chiaro #E0E0E0 come la schermata WORKSPACE): titolo
      e i due numeri del titolare; la richiesta corrente come card lime (avatar,
      cosa, cliente · ora, chip del tipo) con i quattro cerchi della tendina della
      Console (apri, commenta, approva, rifiuta); «In coda» con le richieste come
      righe; in fondo la riga «Riepilogo di oggi». Sotto la navigazione il
      contenuto che scorre è sfocato e appena scurito (correzione dell'utente).
      A coda finita è lo stato vuoto: la card «Niente da approvare» e sotto il
      riepilogo di oggi, sul fondo del Riepilogo (#F4F4F4).
   2. «Richiesta» (la tendina estesa in colonna, su fondo nero): indietro, le
      frecce che scorrono la coda, chip del tipo, titolo; il documento in una card
      bianca (testo e allegato); «Chi la propone» (avatar, consegnata alle, costo,
      passi a chip); la nota del dipendente; barra fissa in basso con Approva lime
      larga, Chiedi modifiche, Rifiuta rossa. Rifiuta apre il campo del motivo,
      obbligatorio. Decisa una richiesta entra la successiva.
      Per una revisione di performance (versione 12): le due versioni del soul
      prompt una sotto l'altra con le differenze per paragrafo e per parola (o i
      due modelli), i tre blocchi Perché / Cosa ci aspettiamo / Rischi, «Chi
      riguarda», la nota del sistema; nella barra le quattro decisioni: Prova
      (bianca), Applica (lime), Chiedi modifiche, Rifiuta con motivo.
   3. «Riepilogo di oggi» (fondo #F4F4F4, il pannello Riepilogo dello specimen in
      colonna): intestazione con la bacchetta e la data, i tre numeri del giorno,
      la linea del tempo con i badge rotondi: la card Consegne (miniature,
      approvate oggi, spesa di oggi), la card lime dell'obiettivo del mese con la
      matita, le voci del diario; la riga lime che riporta a «Da approvare».

   Stessi componenti della Console (schermate/componenti.js, classi .dirA: .rb,
   .pill, .chip, .av, .ncard/.nt, .qrow, .badge, .dcard, .thumb; dalla versione
   14 il telefono carica quello e non più direzione-a.js), stesso modello
   (dati.js): la decisione è m.decidi, così quello che si decide qui vale anche
   nella Console. Le differenze fra le versioni sono DGT_COMPONENTI.differenze.
   Gli avatar sono gli orbi della versione 10 (tinta, occhi lilguy, punto di stato).

   API: DGT_MOBILE.render(m, tel, st) → HTML di un telefono; DGT_MOBILE.monta(radice, m, opz)
   disegna i telefoni e collega i clic. opz = { schermate: [1, 2, 3], richiesta: 0 }.
   ===================================================================== */
window.DGT_MOBILE = (function () {
  const { ic, esc, prefissa } = window.DGT_UI;
  const C = window.DGT_COMPONENTI;
  const { av, pair, iconaTipo, nomeTipo, chipStato, chipEsito, eur, differenze } = C;   // i componenti condivisi con la Console (schermate/componenti.js)

  const css = `
/* la pagina: nero, come la Console; le variabili dei componenti (DGT_COMPONENTI.variabili) più --light e --light-card del telefono; i telefoni affiancati come nello specimen */
.m-page{${C.variabili};--light:#E0E0E0;--light-card:#F0F0F0;
  min-height:100vh;background:var(--black);color:var(--white);font:400 15px/20px var(--font);-webkit-font-smoothing:antialiased;padding:48px 40px 96px;display:grid;gap:36px;align-content:start;justify-items:center}
.m-page *{box-sizing:border-box}
.m-page h1,.m-page h2,.m-page h3,.m-page h4,.m-page h5,.m-page p{margin:0;font-weight:400}
.m-page svg{display:block}
.m-page [data-az]{cursor:pointer}
.m-hd{display:grid;gap:8px;max-width:980px;text-align:center}
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
/* il Riepilogo (e lo stato vuoto) sta sul fondo del pannello Riepilogo dello specimen */
.m-scr.rie{background:var(--summary);--behind:var(--summary)}
/* barra di stato: l'ora dell'azienda, l'isola nera, segnale, rete, batteria */
.m-sb{position:relative;display:flex;justify-content:space-between;align-items:center;padding:14px 26px 0;font-weight:600;font-size:14px;flex:none}
.m-sb .isl{position:absolute;left:50%;top:10px;transform:translateX(-50%);width:84px;height:24px;border-radius:14px;background:#000}
.m-sb .sig{display:flex;gap:4px;align-items:center}
.m-sb .sig svg{width:14px;height:14px}
.m-sb .sig i{display:block;height:9px;width:18px;border-radius:3px;border:1px solid currentColor}
.m-sb .sig i::after{content:"";display:block;height:100%;width:80%;background:currentColor;border-radius:2px}
/* il corpo scorre sotto la navigazione (o sotto la barra delle azioni). position:relative con z-index 0 lo rende un piano a sé:
   gli z-index di dentro (i badge e le ore della linea del tempo) restano dentro e non scavalcano la barra in basso. */
.m-scroll{position:relative;z-index:0;flex:1;min-height:0;overflow:auto;scrollbar-width:none;padding-bottom:96px}
.m-scroll::-webkit-scrollbar{display:none}
.m-scr.rev .m-scroll{padding-bottom:150px}
.m-scr.motivo .m-scroll{padding-bottom:200px}
/* riga di navigazione: logo DGT e persona sul chiaro; indietro e le frecce della coda sul nero */
.m-nav{display:flex;justify-content:space-between;align-items:center;padding:18px 18px 0}
.m-nav .r{display:flex;gap:8px;align-items:center}
.m-nav .rb{width:44px;height:44px}.m-nav .rb svg{width:16px;height:16px}
.m-nav .av.persona{width:44px;height:44px;font-size:14px}
.m-nav .chip{height:32px;font-size:12px;padding:0 12px}
.m-scr.rie .m-nav .av.persona{border-color:rgb(0 0 0/.14)}
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
/* lo stato vuoto (versione 12): una card bianca con il cerchio nero della spunta; sul nero, la card scura */
.m-vuoto{margin:14px 12px 0;border-radius:24px;background:var(--white);padding:22px 20px 20px;display:grid;justify-items:center;gap:4px;text-align:center;color:var(--t2-light);font-size:13px;line-height:18px}
.m-vuoto .rb{margin-bottom:10px}
.m-vuoto b{font-weight:400;font-size:20px;line-height:24px;color:var(--ink)}
.m-scr:not(.chiara) .m-vuoto{background:linear-gradient(180deg,var(--card-top),var(--card));color:var(--t2)}
.m-scr:not(.chiara) .m-vuoto b{color:var(--white)}
.m-scr:not(.chiara) .m-vuoto .rb{background:var(--white);color:var(--ink)}
/* il Riepilogo di oggi (versione 12): intestazione come il pannello dello specimen (cerchio nero con la bacchetta e il titolo); sotto, i tre numeri della riga WORKSPACE */
.m-rh{display:flex;align-items:center;gap:12px;padding:16px 18px 0;min-width:0}
.m-rh .rb{width:44px;height:44px}.m-rh .rb svg{width:16px;height:16px}
.m-rh h4{font-size:22px;line-height:26px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-rh+.m-stats{padding-top:12px}
/* la linea del tempo: colonna dei marcatori (ora e badge rotondo 22, la linea #C8C8C8 fra un badge e il seguente) e la pila delle card e delle voci */
.m-rie{display:grid;grid-template-columns:36px minmax(0,1fr);gap:10px 8px;padding:16px 12px 0;align-items:start}
.m-rie>*{min-width:0}
.m-rie .m{position:relative;align-self:stretch;display:grid;gap:4px;justify-items:start;align-content:start;font-size:11px;line-height:14px;color:var(--t2-light)}
.m-rie .m span{position:relative;z-index:1;background:var(--summary);padding-right:3px;white-space:nowrap}
.m-rie .m i{position:relative;z-index:1;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--white);color:var(--ink);border:1px solid rgb(0 0 0/.14)}
.m-rie .m i svg{width:11px;height:11px}
.m-rie .m i.lime{background:var(--lime);border-color:transparent}
.m-rie .m i.rosa{background:var(--badge-red);color:var(--badge-red-ink);border-color:transparent}
.m-rie .m i.ink{background:var(--ink);color:var(--white);border-color:transparent}
.m-rie .m::after{content:"";position:absolute;left:11px;top:40px;bottom:-10px;width:1px;background:#C8C8C8}
.m-rie .m.linea::after{top:-10px}
.m-rie .m.ult::after{display:none}
.m-rie .m-rie-h{font-size:15px;line-height:20px;color:var(--t2-light);padding-top:6px}
.m-rie .voce{font-size:12px;line-height:16px;color:#3E3E3E;padding:3px 0 10px;border-bottom:1px solid rgb(0 0 0/.08)}
.m-rie .voce b{font-weight:500;color:var(--ink)}
/* le card del Riepilogo a misura di telefono */
.m-scr .dcard{padding:14px;border-radius:20px}
.m-scr .dcard h5{font-size:16px;line-height:22px;padding-right:44px}
.m-scr .dcard .nt{padding:0 0 8px 8px;border-bottom-left-radius:20px}
.m-scr .dcard .nt .rb{width:36px;height:36px}.m-scr .dcard .nt .rb svg{width:14px;height:14px}
.m-scr .dcard.lime{background:var(--lime)}
.m-scr .dcard.lime .goal{color:rgb(0 0 0/.72)}
.m-scr .dcard .kv{margin-top:8px}
.m-scr .thumbs{gap:8px;margin-top:12px}
.m-scr .thumb{height:96px;padding:7px 7px 0}
.m-scr .thumb .lb{font-size:10px;height:20px;max-width:calc(100% - 12px);display:block;line-height:20px;overflow:hidden;text-overflow:ellipsis}
.m-scr .goal{font-size:13px;line-height:18px;margin-top:10px;padding-right:0}
/* navigazione in basso: campanella lime con il numero, pillola nera con i quattro cerchi del rail.
   Sotto la navigazione il contenuto che scorre è sfocato e appena scurito, con il bordo alto sfumato (correzione dell'utente,
   2026-09-05): la campanella lime resta distinta anche quando sotto passano la card lime o la riga lime della coda. Il vetro
   sfocato è già nel sistema (i pulsanti «glass» della videochiamata). */
.m-navfondo{position:absolute;left:0;right:0;bottom:0;z-index:2;height:112px;background:rgb(0 0 0/.16);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);-webkit-mask-image:linear-gradient(180deg,transparent,#000 40px);mask-image:linear-gradient(180deg,transparent,#000 40px);pointer-events:none}
.m-bnav{position:absolute;left:14px;right:14px;bottom:14px;z-index:3;height:64px;display:flex;align-items:center;gap:10px}
.m-bnav .meet{position:relative;width:52px;height:52px;border-radius:50%;background:var(--lime);display:grid;place-items:center;color:var(--ink);flex:none}
.m-bnav .meet svg{width:20px;height:20px}
.m-bnav .meet .n{position:absolute;top:-5px;right:-5px;min-width:22px;height:22px;padding:0 6px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);font-size:12px;font-weight:500;display:grid;place-items:center;border:2px solid var(--light)}
.m-scr.rie .m-bnav .meet .n{border-color:var(--summary)}
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
.m-doc.ver .lb{flex-wrap:wrap;row-gap:6px}
.m-doc.ver .lb span:last-child{overflow:visible}
.m-doc .tx{font-size:14px;line-height:21px;color:#1E1E1E;white-space:pre-line}
.m-doc .tx.mono{font-size:13px;line-height:20px}
.m-doc .img{height:110px;border-radius:14px;background:#E4E4E4;display:grid;place-items:center;align-content:center;gap:6px;color:#8A8A8A;font-size:12px;text-align:center;padding:0 12px}
.m-doc .img svg{width:22px;height:22px;color:#8A8A8A}
/* la revisione (versione 12): le due versioni una sotto l'altra, con i colori delle differenze della tendina delle versioni */
.m-doc.ver{gap:10px}
.m-doc .p{font-size:13px;line-height:19px;color:#1E1E1E}
.m-doc .dif{display:grid;gap:4px}
.m-doc .dif p{font-size:13px;line-height:19px;color:#1E1E1E;padding:3px 8px;border-radius:10px}
.m-doc .dif p.add{background:var(--lime)}
.m-doc .dif p.del{background:var(--badge-red);color:var(--badge-red-ink);text-decoration:line-through}
.m-doc .dif p.chg{background:rgb(0 0 0/.045)}
.m-doc mark{border-radius:5px;padding:0 3px;background:var(--lime);color:var(--ink)}
.m-doc mark.del{background:var(--badge-red);color:var(--badge-red-ink);text-decoration:line-through}
.m-doc .kvs{display:grid;gap:6px;padding-top:10px;border-top:1px solid rgb(0 0 0/.08)}
.m-doc .kv{display:flex;justify-content:space-between;gap:10px;font-size:12px;color:var(--t2-light);margin:0}
.m-doc .kv b{font-weight:500;color:var(--ink);text-align:right}
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
/* le evidenze della revisione: il numero in una pillola 22 (come nella card revisione della Console) sopra la frase 12/17, in colonna perché lo schermo è stretto */
.m-det ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.m-det li{display:grid;grid-template-columns:minmax(0,1fr);gap:5px;font-size:12px;line-height:17px;color:#DADADA}
.m-det li b{justify-self:start;font-weight:500;color:var(--white);white-space:nowrap;background:rgb(255 255 255/.1);border-radius:var(--r-pill);padding:0 8px;height:22px;display:inline-flex;align-items:center;font-size:12px}
.m-fade{position:absolute;left:0;right:0;bottom:0;z-index:2;height:130px;background:linear-gradient(180deg,transparent,var(--black) 45%);pointer-events:none}
.m-scr.rev .m-fade{height:190px;background:linear-gradient(180deg,transparent,var(--black) 38%)}
.m-scr.motivo .m-fade{height:230px;background:linear-gradient(180deg,transparent,var(--black) 32%)}
/* la barra delle azioni: una colonna a larghezza vincolata (niente sfori orizzontali: lo schermo non deve poter scorrere di lato) */
/* le azioni in fondo alla schermata della consegna (versione 19): in linea con lo scorrimento, non la barra fissa
   della decisione — qui non si decide sempre, si decide solo quando la consegna aspetta il titolare */
.m-azioni{display:flex;gap:8px;margin-top:4px}
.m-azioni .pill{height:48px;flex:1;justify-content:center;cursor:pointer;min-width:0;padding:0 16px}
.m-bar{position:absolute;left:14px;right:14px;bottom:14px;z-index:3;display:grid;grid-template-columns:minmax(0,1fr);gap:8px}
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
/* ===== tab Dipartimenti (versione 17, 2026-09-07): l'elenco (7) e il dipartimento aperto (8) =====
   La pagina Dipartimento della Console ridotta al telefono: stessi dati (m.perDip, m.obiettiviDi, m.costi), stesse righe
   della coda e stesse card dell'agenda; niente componente nuovo se non l'importo in fondo alla riga. */
.m-coda .qrow.dip{height:58px}
.m-coda .qrow.dip .pair{flex:none}
.m-coda .qrow.dip .pair .av{width:26px;height:26px;font-size:9px}
.m-coda .qrow.dip .pair .av+.av{margin-left:-9px}
/* la pila non porta il «+N»: il conto sta già nel sottotitolo («10 dipendenti»), e a quaranta i 27 px del badge tagliavano
   la riga (la stessa regola della correzione 16a: la pila dice chi, il testo dice quanti) */
.m-coda .qrow.dip .pair .more{display:none}
.m-coda .qrow .dx{display:grid;justify-items:end;gap:3px;flex:none}
.m-coda .qrow .dx .eur{font-size:12px;font-weight:500;color:var(--ink);white-space:nowrap}
.m-coda .qrow .tx span.ferma{color:var(--badge-red-ink)}
/* le sezioni del dipartimento aperto: le stesse card dell'agenda, senza la linea del tempo */
.m-lista{display:grid;gap:8px;padding:0 12px}
.m-lista>*{min-width:0}
.m-lista .m-ev{border:1px solid rgb(0 0 0/.06)}
.m-lista .m-ev.corso,.m-lista .m-ev.attesa,.m-lista .m-ev.errore{border-color:transparent}
/* la riga di un obiettivo: la barra di avanzamento sotto il titolo, come la card obiettivo della Console */
.m-coda .qrow.ob{height:auto;padding-top:9px;padding-bottom:9px;align-items:flex-start}
.m-coda .qrow.ob .tx{display:grid;gap:5px}
.m-coda .qrow.ob .tx .barra{height:4px;border-radius:2px;background:rgb(0 0 0/.1);overflow:hidden}
.m-coda .qrow.ob .tx .barra i{display:block;height:100%;background:var(--ink);border-radius:2px}
.m-coda .qrow.ob.ritardo .tx .barra i{background:var(--hangup)}
.m-coda .qrow.ob .chip{flex:none;align-self:center}
/* il titolo di un dipartimento è un nome, non un'etichetta di sezione, e può essere lungo: a 30 px la riga del titolo ha
   234 px liberi e «AMMINISTRAZIONE» ne chiede 292 (a 22 px ne chiede 214). Oltre i dodici caratteri il titolo si stringe. */
.m-h1.stretta{font-size:22px;line-height:28px}
/* ===== il quadro del giorno sul telefono (versione 17, 2026-09-07): lo studio delle tre forme =====
   La barra «Oggi in azienda» della Console (versione 16) chiede 602 px di caselle e la colonna del telefono ne dà 254: non
   basta riordinare, le caselle vanno rimpicciolite. Il parametro ?quadro=1|2|3 disegna le tre forme dello studio, ?quadro=0
   toglie il quadro (il telefono di prima). La forma scelta dall'utente è la 2, «due per due». I conti sono quelli della
   Console: un aggregatore solo per tutti e due. */
.m-quadro{padding:14px 12px 0;display:grid;gap:6px;min-width:0}
.m-quadro>*{min-width:0}
.m-quadro .qq{border-radius:var(--r-pill);background:rgb(255 255 255/.5);box-shadow:inset 0 0 0 1px rgb(0 0 0/.09);color:var(--t2-light);white-space:nowrap;min-width:0}
.m-quadro .qq b{font-weight:400;color:var(--ink);line-height:1}
.m-quadro .qq.viva{background:var(--white);box-shadow:none}
.m-quadro .qq.err{background:var(--badge-red);color:var(--badge-red-ink);box-shadow:none}
.m-quadro .qq.err b{color:var(--badge-red-ink)}
.m-quadro .qq .ico{border-radius:50%;background:rgb(0 0 0/.06);display:grid;place-items:center;flex:none;color:var(--ink)}
.m-quadro .qq.err .ico{background:rgb(122 31 31/.16);color:var(--badge-red-ink)}
/* forma 1 «le quattro a due piani»: una riga sola, quattro caselle, il numero sopra la parola.
   44 di altezza e non 52: a 52 la casella larga 60 diventa un cerchio e si legge come un pulsante, non come un conto. */
.m-quadro.piani .riga{display:flex;gap:5px;min-width:0}
.m-quadro.piani .qq{flex:1 1 0;display:grid;justify-items:center;align-content:center;gap:0;height:44px;padding:0 4px;font-size:10px;line-height:13px;overflow:hidden}
.m-quadro.piani .qq b{font-size:17px}
.m-quadro.piani .qq span{overflow:hidden;text-overflow:ellipsis;max-width:100%}
/* forma 2 «due per due» (LA SCELTA DELL'UTENTE, 2026-09-07): quattro caselle su due righe, la forma della Console quasi
   intera (icona o pila, numero, parola), con l'occhiello e la data sopra.
   La pila sta a 22 e non a 28: la casella è larga 124 e a 28 «al lavoro» si tagliava. */
/* Le misure strette della forma 2 (padding 12 invece di 14, occhiello su una riga da 14, stacco 6, caselle da 40 invece di
   42) fanno 20 px: sono quelli che riportano la riga «approva e rifiuta» sopra la barra di navigazione. Il quadro passa da
   132 a 112 px e resta quello scelto: griglia due per due, icone, pila, occhiello e data. */
.m-quadro.duedue{gap:6px;padding-top:12px}
.m-quadro.duedue .cap{font-size:10px;line-height:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--t2-light);display:flex;justify-content:space-between;align-items:center;gap:8px;padding:0 4px}
.m-quadro.duedue .griglia{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:6px}
.m-quadro.duedue .qq{height:40px;display:flex;align-items:center;gap:6px;padding:0 9px 0 5px;font-size:11px}
.m-quadro.duedue .qq b{font-size:18px;flex:none}
.m-quadro.duedue .qq .ico{width:30px;height:30px}
.m-quadro.duedue .qq .ico svg{width:14px;height:14px}
.m-quadro.duedue .qq .pair{flex:none}
.m-quadro.duedue .qq .pair .av{width:22px;height:22px;font-size:9px;border-width:2px}
.m-quadro.duedue .qq .pair .av+.av{margin-left:-8px}
/* la pila non porta il «+N»: il numero della casella è a due centimetri e sarebbe lo stesso conto due volte (la regola della
   correzione 16a). La pila dice chi, il numero dice quanti. */
.m-quadro.duedue .qq .pair .more{display:none}
.m-quadro.duedue .qq span{overflow:hidden;text-overflow:ellipsis}
/* Il prezzo della forma 2, pagato dove costa meno. Il quadro «due per due» partiva a 132 px: la card della richiesta
   scendeva così in basso che ne restavano visibili 162 px su 256 e la riga con approva e rifiuta finiva sotto la barra di
   navigazione — sulla schermata che serve a decidere, la decisione andava cercata scorrendo. Due recuperi:
   1. le misure strette qui sopra portano il quadro da 132 a 118 px;
   2. cade la riga dei due numeri grandi (78 px). «Approvate oggi» era lo stesso conto della casella «approvate» del
      quadro a 60 px di distanza (correzione 16a: un elemento fisso non ripete quello che un altro dice già); «da
      approvare» resta, ma dentro il titolo, che diceva già la stessa parola.
   Risultato misurato: della card restano visibili 244 px su 256 col conto a 36 (la scelta), 248 col conto a 26; erano 176
   con la riga dei due numeri grandi, e la forma 3 del quadro, scartata, ne lasciava 240.
   Col quadro 0, 1 o 3 la riga dei due numeri grandi resta com'era.
   Il titolo sta a 26 px e non a 30 per la larghezza della PAROLA, non per la misura del numero: la riga ha 222 px liberi e
   a 30 «DA APPROVARE» ne chiede 214, che col numero e lo stacco mandano il titolo a capo; a 26 ne chiede 186. Il conto
   invece ci sta a 26 come a 36, e fino a tre cifre, senza sforare né andare a capo (misurato: la prova lo controlla). */
.m-h1.conta{display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-size:26px;line-height:32px;white-space:nowrap;padding-top:12px}
.m-h1.conta b{font-weight:300;font-size:26px;line-height:30px;flex:none;letter-spacing:0}
/* la strada di mezzo (?conta=2, LA SCELTA DELL'UTENTE del 2026-09-07): il titolo resta a 26 e il conto sale a 36, così
   il numero torna a essere la prima cosa che si vede — quello che faceva la riga dei due numeri grandi — senza
   ricomprarne i 78 px di altezza. La riga cresce di 4 px e basta, perché il numero eredita l'interlinea del titolo e le
   cifre non hanno discendenti; e regge fino a tre cifre senza sforare né andare a capo (misurato). Il conto a 26,
   dietro ?conta=1, è la forma scartata. */
.m-h1.conta.grande b{font-size:36px;line-height:32px}
/* forma 3 «la riga che parla» (scartata): una riga sola, le tre caselle che chiedono un'azione, numero e parola accanto.
   Niente pila: con la pila le tre caselle sommano 273 px e la colonna ne dà 254. */
.m-quadro.riga .riga{display:flex;gap:6px;min-width:0}
.m-quadro.riga .qq{flex:none;display:flex;align-items:center;gap:6px;height:40px;padding:0 13px;font-size:11px;overflow:hidden}
.m-quadro.riga .qq b{font-size:17px;flex:none}
.m-quadro.riga .qq.viva{flex:1 1 auto;min-width:0;justify-content:center}   /* la casella del presente pesa di più, come nella Console: prende lo spazio che avanza e tiene il contenuto al centro */
.m-quadro.riga .qq span{overflow:hidden;text-overflow:ellipsis}
/* ===== tab Chat e Agenda (versione 15, 2026-09-06) ===== */
/* l'elenco dei fili: le righe della coda con l'ultimo messaggio e quanti ne restano da leggere */
.m-coda .qrow.on .n{background:var(--ink);color:var(--white)}
.m-coda .qrow .n{min-width:22px;height:22px;padding:0 7px;border-radius:var(--r-pill);background:var(--lime);color:var(--ink);font-size:11px;font-weight:500;display:grid;place-items:center;flex:none}
.m-coda .qrow .ora{font-size:10px;color:var(--t2-light);white-space:nowrap;flex:none}
.m-nav.cerca{padding-bottom:0}
.m-cerca{flex:1;display:flex;align-items:center;gap:8px;height:44px;padding:0 6px 0 14px;border-radius:var(--r-pill);background:var(--white);color:var(--ink);min-width:0}
.m-cerca>i{display:grid;place-items:center;color:var(--t2-light);flex:none}
.m-cerca>i svg{width:15px;height:15px}
.m-cerca input{flex:1;min-width:0;background:transparent;border:0;outline:none;color:var(--ink);font:400 14px/18px var(--font);-webkit-font-smoothing:antialiased}
.m-cerca input::placeholder{color:#9A9A9A}
.m-cerca .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink);flex:none}
.m-coda .qrow.filo{height:56px}
.m-coda .qrow.filo .av{width:38px;height:38px}
.m-coda .qrow.filo .dx{display:grid;justify-items:end;gap:4px;flex:none}
/* il filo aperto: le bolle dei componenti a misura di telefono, la barra di scrittura in fondo */
.m-scr.filo .m-nav{flex:none;padding-bottom:12px}
.m-scr.filo .m-scroll{padding-bottom:96px}
.m-fili{display:grid;gap:10px;padding:14px 12px 0}
.m-fili .bub{max-width:82%;border-radius:18px;padding:10px 13px 8px;font-size:13px;line-height:18px}
.m-fili .bub .ora{margin-top:4px;font-size:10px}
.m-fili .msg .av{width:28px;height:28px}
.m-fili .msg{gap:8px}
.m-fili .msg.sistema .chip{height:24px;font-size:10px}
.m-fili .qrow{height:46px;font-size:12px;color:var(--ink)}
.m-fili .qrow .rb.xs.black{background:var(--ink);color:var(--white);border-color:transparent}
.m-fili .qrow .rb.xs.red{background:var(--hangup);color:var(--white);border-color:transparent}
.m-fili .stato{font-size:11px;line-height:15px;color:var(--t2);text-align:center;padding:4px 10px 0}
.m-nav .chi{display:flex;align-items:center;gap:10px;min-width:0;flex:1}
.m-nav .chi .av{width:36px;height:36px}
.m-nav .chi div{min-width:0}
.m-nav .chi b{display:block;font-weight:500;font-size:14px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-nav .chi span{display:block;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-bar.scrivi input{flex:1;width:auto;min-width:0}
/* l'agenda: la linea del tempo del Riepilogo con una card per evento, poi i prossimi giorni */
.m-ev{background:var(--white);border-radius:20px;padding:10px 12px;display:flex;align-items:center;gap:10px;min-width:0}
.m-ev .av{width:36px;height:36px}
.m-ev .tx{flex:1;min-width:0}
.m-ev .tx b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-weight:500;font-size:13px;line-height:17px}
.m-ev .tx span{display:block;font-size:11px;color:var(--t2-light);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-ev.corso,.m-ev.attesa{background:var(--lime)}
.m-ev.corso .tx span,.m-ev.attesa .tx span{color:rgb(0 0 0/.6)}
.m-ev.errore{background:var(--badge-red)}.m-ev.errore .tx span{color:rgb(0 0 0/.55)}
.m-ev.pianificato{background:transparent;border:1px dashed rgb(0 0 0/.25)}
.m-ev.pianificato .tx b{color:rgb(0 0 0/.75)}
.m-gg{display:flex;align-items:center;gap:10px;min-width:0;font-size:12px}
.m-gg .gg{flex:1;min-width:0;line-height:15px}
.m-gg .gg b{display:block;font-weight:500;font-size:13px;text-transform:capitalize}
.m-gg .gg span{display:block;font-size:11px;color:var(--t2-light);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`;

  /* La coda del telefono: le richieste in attesa, le più vecchie prima (come nella Console). Dalla versione 12 anche le
     revisioni di performance: la Console e il telefono contano le stesse richieste. */
  const coda = m => m.richiesteDi('attesa').sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min));
  const corrente = (m, st) => { const c = coda(m); const idx = Math.min(st.richiesta || 0, Math.max(0, c.length - 1)); return { c, idx, r: c[idx] }; };
  const approvateOggi = m => m.richieste.filter(x => x.giorno === 0 && x.stato === 'approvata').length;

  /* ---------- pezzi comuni ---------- */
  const barraStato = m => `<div class="m-sb"><span>${esc(m.azienda.ora)}</span><span class="isl"></span><span class="sig">${ic('i-signal')}${ic('i-wifi')}<i></i></span></div>`;
  const navigazione = (m, n, attiva) => `<div class="m-navfondo"></div><div class="m-bnav">
      <span class="meet" data-az="schermata" data-s="1" title="Da approvare">${ic('i-bell')}${n ? `<span class="n">${n}</span>` : ''}</span>
      <div class="tabs"><span class="rb${attiva === 1 ? ' white' : ''}" data-az="schermata" data-s="1" title="Da approvare">${ic('i-list')}</span><span class="rb${attiva === 7 ? ' white' : ''}" data-az="schermata" data-s="7" title="Dipartimenti">${ic('i-org')}</span><span class="rb${attiva === 4 ? ' white' : ''}" data-az="schermata" data-s="4" title="Chat">${ic('i-chat')}</span><span class="rb${attiva === 6 ? ' white' : ''}" data-az="schermata" data-s="6" title="Agenda">${ic('i-cal')}</span></div>
    </div>`;
  /* i nomi degli stati dell'agenda e la riga di una consegna dentro il filo (gli stessi della Console) */
  const NOME_EV = { corso: 'In corso', attesa: 'Da approvare', errore: 'Errore', pianificato: 'Pianificato', fatto: 'Concluso' };
  /* La riga di una richiesta in coda (approva/rifiuta sul posto). Si chiamava «rigaConsegna» e dalla versione 19 si
     chiama `rigaRichiesta`: «consegna» adesso e' la cosa creata da un'esecuzione e ha una riga sua qui sotto. */
  const rigaRichiesta = (m, r) => { const i = coda(m).indexOf(r); return `<div class="qrow${r.stato === 'attesa' ? ' on' : ''}"${i >= 0 ? ` data-az="apri" data-idx="${i}"` : ''}><span class="av xs" style="background:var(--ink);color:var(--white)">${ic(iconaTipo[r.tipo])}</span><div class="tx"><b>${esc(r.cosa)}</b><span>${nomeTipo[r.tipo]} · ${r.costo} €</span></div>${r.stato === 'attesa' ? `<span class="rb xs black" data-az="approva" data-id="${r.id}" title="${r.tipo === 'revisione' ? 'Applica' : 'Approva'}">${ic('i-check')}</span><span class="rb xs red" data-az="rifiuta" data-idx="${i}" title="Rifiuta con un motivo">${ic('i-x')}</span>` : chipEsito(r)}</div>`; };
  /* La riga di una consegna (versione 19, 2026-09-07): la cosa creata da un'esecuzione, sul telefono in riga e non in
     card — la colonna e' larga 254 px e le card della Console non ci stanno. Porta l'avatar di chi l'ha fatta (regola
     19: il disco nella sua tinta), il nome, chi e per chi, e il chip dello stato. Il tocco apre la **schermata della
     consegna** (la 9), come nella Console apre la sua pagina: la freccia c'e' su tutte perche' la destinazione c'e'
     per tutte (regola 26). */
  const rigaConsegna = (m, c) => {
    const e = m.byId[c.chi];
    const chip = { attesa: `<span class="chip lime">${ic('i-bell')}Da approvare</span>`, approvata: `<span class="chip lime">${ic('i-check')}Approvata</span>`, fatto: `<span class="chip lime">${ic('i-check')}Fatta</span>`, bozza: `<span class="chip light">${ic('i-play')}In corso</span>`, errore: `<span class="chip rosa">${ic('i-warn')}Non fatta</span>` }[c.stato] || `<span class="chip light">${ic('i-clock')}Da fare</span>`;
    return `<div class="qrow${c.stato === 'attesa' ? ' on' : ''}" data-az="consegna" data-id="${esc(c.id)}">${av(m, e, 'xs')}<div class="tx"><b>${esc(c.nome)}</b><span>${esc(m.etichetta(e))}${c.cliente ? ' · ' + esc(c.cliente) : ''}</span></div>${chip}<span class="rb xs">${ic('i-chevr')}</span></div>`;
  };
  const vuoto = () => `<div class="m-vuoto"><span class="rb black">${ic('i-check')}</span><b>Niente da approvare</b><span>Hai deciso tutto. Le prossime consegne arriveranno qui.</span></div>`;

  /* ---------- il Riepilogo di oggi: intestazione e linea del tempo (schermata 3 e stato vuoto della 1) ---------- */
  function riepilogoTesta(m, senzaNumeri) {
    const n = coda(m).length;
    return `<div class="m-rh"><span class="rb black">${ic('i-wand')}</span><h4>Riepilogo di oggi</h4></div>
      ${senzaNumeri ? '' : `<div class="m-stats">
        <div class="m-stat"><span class="num">${m.alLavoro.length}</span><span>al lavoro</span></div>
        <div class="m-stat"><span class="num">${n}</span><span>da approvare</span></div>
        <div class="m-stat"><span class="num">${m.costoOggi} €</span><span>spesi oggi</span></div>
      </div>`}`;
  }
  function riepilogoLinea(m) {
    /* le miniature: le consegne di oggi, le più recenti prima (in attesa o approvate) */
    const consegne = m.richieste.filter(r => r.giorno === 0 && r.tipo !== 'revisione' && r.stato !== 'rifiutata').sort((a, b) => String(b.ora).localeCompare(String(a.ora))).slice(0, 2);
    const PG = ['<i class="h"></i><i class="w1"></i><i class="w2"></i><i class="b"></i><i class="w3"></i><i class="w1"></i><i class="w4"></i>', '<i class="h"></i><i class="b"></i><i class="w1"></i><i class="w3"></i><i class="w2"></i><i class="b"></i><i class="w1"></i>'];
    const thumb = (r, k) => `<div class="thumb"><div class="pg">${PG[k]}</div><span class="lb">${esc(r ? r.cosa : k ? 'Piano ottobre' : 'Post 4 di 12')}</span></div>`;
    /* i badge della linea del tempo: lime per le consegne e le approvazioni, nero per gli inizi, bianco per i passi, rosa per gli errori */
    const BADGE = { approvazione: ['lime', 'i-bell'], inizio: ['ink', 'i-play'], passo: ['', 'i-check'], errore: ['rosa', 'i-warn'] };
    const voci = m.diario.slice(-5).reverse();
    const marker = (t, cls, icona, ult) => `<div class="m${ult ? ' ult' : ''}"><span>${esc(t)}</span><i class="${cls}">${ic(icona)}</i></div>`;
    return `<div class="m-rie">
      ${marker(m.azienda.ora, 'lime', 'i-like')}
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-down')}</span></div><h5>Consegne:</h5>
        <div class="thumbs">${thumb(consegne[0], 0)}${thumb(consegne[1], 1)}</div>
        <div class="kv"><span>Approvate oggi</span><b>${approvateOggi(m)}</b></div>
        <div class="kv"><span>Spesa di oggi</span><b>${m.costoOggi} €</b></div>
      </div>
      ${marker(m.azienda.scadenzaMese || '', 'ink', 'i-target')}
      <div class="dcard lime"><div class="nt"><span class="rb sm">${ic('i-pen')}</span></div><h5>Obiettivo del mese:</h5><p class="goal">${m.azienda.obiettivoMese}</p></div>
      <div class="m linea"></div><h5 class="m-rie-h">Diario di oggi</h5>
      ${voci.map((x, i) => { const b = BADGE[x.tipo] || ['', 'i-check']; return marker(x.ora, b[0], b[1], i === voci.length - 1) + `<div class="voce"><b>${esc(m.etichetta(m.byId[x.chi]))}</b> ${esc(x.testo)}</div>`; }).join('')}
    </div>`;
  }

  /* La forma scelta dall'utente: «due per due» (2026-09-07). Le altre due restano dietro ?quadro=1|3 per il confronto, come
     ?barra=0 nella Console; ?quadro=0 toglie il quadro e rimette il telefono di prima. */
  const QUADRO = 2;

  /* La misura del conto nel titolo della schermata 1 (studio del 2026-09-07, dopo la scelta della forma 2). Col quadro
     «due per due» la riga dei due numeri grandi è caduta e «da approvare» è passato nel titolo, e restava da decidere
     quanto grande fosse quel numero. Tre forme messe a confronto nel telefono vero, `?conta=` le sceglie: 1 = come il
     titolo (26); 2 = la strada di mezzo, titolo 26 e numero 36; 0 = la riga dei due numeri grandi torna al suo posto.
     LA SCELTA DELL'UTENTE È LA 2 (2026-09-07): a 26 il numero si legge come la coda del titolo, a 36 torna a essere un
     conto — quello che faceva la riga dei due numeri grandi, e che le costava 78 px di altezza. Qui ne costa 4. */
  const CONTA = 2;

  /* ---------- il quadro del giorno (versione 17, 2026-09-07) ----------
     La barra «Oggi in azienda» della Console sul telefono. Stessi conti (`m.gruppiOggi()`), tre forme messe a confronto
     nello studio; `?quadro=` sceglie (0 = niente, il telefono di prima). Sul telefono cadono sempre i dettagli della
     Console («· Kim», «· dalle 15:00»): 254 px di colonna non li reggono a nessuna delle tre.
     Dove porta ogni casella: «approvate» al Riepilogo di oggi (è lì che sta il passato della giornata: la Console la manda
     alle Richieste, che sul telefono sono la schermata da cui si parte); «al lavoro» e «dopo» all'Agenda; «ferma» alla
     conversazione con chi è fermo, perché dal telefono l'esecuzione non si riavvia e parlargli è l'unica cosa che si può
     fare (la Console apre l'Esecuzione, che il telefono non ha). */
  function quadroGiorno(m, forma) {
    const g = m.gruppiOggi(), e0 = g.errore[0];
    /* le quattro caselle, ognuna con la sua strada: [classe, icona, numero, parola, azione] */
    const caselle = [];
    if (g.fatte) caselle.push({ cls: '', ic: 'i-check', n: g.fatte, tx: 'approvate', az: 'data-az="schermata" data-s="3"', ti: 'Il riepilogo di oggi' });
    caselle.push({ cls: 'viva', pila: g.corso.map(x => x.id), n: g.corso.length, tx: 'al lavoro', az: 'data-az="schermata" data-s="6"', ti: "L'agenda dell'azienda" });
    if (g.errore.length) caselle.push({ cls: 'err', ic: 'i-warn', n: g.errore.length, tx: 'ferm' + (g.errore.length === 1 ? 'a' : 'e'), az: `data-az="filo" data-id="${e0.id}"`, ti: 'Scrivi a chi è fermo' });
    if (g.piani.length) caselle.push({ cls: 'poi', ic: 'i-clock', n: g.piani.length, tx: 'dopo', az: 'data-az="schermata" data-s="6"', ti: "L'agenda dell'azienda" });

    const conIcona = (c, nPila) => c.pila ? pair(m, c.pila, 'xs', nPila) : `<span class="ico">${ic(c.ic)}</span>`;
    /* 1 · le quattro a due piani: una riga sola, il numero sopra la parola. Niente icone, niente pila: solo i conti. */
    if (forma === 1) return `<div class="m-quadro piani"><div class="riga">${caselle.map(c =>
      `<span class="qq ${c.cls}" ${c.az} title="${esc(c.ti)}"><b>${c.n}</b><span>${esc(c.tx)}</span></span>`).join('')}</div></div>`;
    /* 2 · due per due (la forma scelta): la Console quasi intera (icona o pila, numero, parola), con l'occhiello e la data */
    if (forma === 2) return `<div class="m-quadro duedue"><div class="cap"><span>Oggi in azienda</span><span>${esc(m.azienda.data)}</span></div>
      <div class="griglia">${caselle.map(c => `<span class="qq ${c.cls}" ${c.az} title="${esc(c.ti)}">${conIcona(c, 2)}<b>${c.n}</b><span>${esc(c.tx)}</span></span>`).join('')}</div></div>`;
    /* 3 · la riga che parla (scartata): le tre che chiedono un'azione (via «approvate», la sola che guarda al passato) */
    return `<div class="m-quadro riga"><div class="riga">${caselle.filter(c => c.tx !== 'approvate').map(c =>
      `<span class="qq ${c.cls}" ${c.az} title="${esc(c.ti)}"><b>${c.n}</b><span>${esc(c.tx)}</span></span>`).join('')}</div></div>`;
  }

  /* ---------- schermata 1: Da approvare ---------- */
  function cardCorrente(m, r, idx, n) {
    const chi = m.byId[r.chi];
    return `<div class="ncard task lime" data-az="apri" data-idx="${idx}">
      <div class="who">${av(m, chi, '', 'attesa')}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
      <div class="nt"><span class="rb olight">${ic('i-bell')}<i class="dot"></i></span><span class="rb olight" data-az="apri" data-idx="${idx}" title="Apri la richiesta">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaTipo[r.tipo])}</span><div><div class="tt">${esc(r.cosa)}</div><div class="meta"><b>${esc(r.cliente)}</b><span>·</span><b>${esc(r.ora)}</b></div></div></div>
      <div class="st"><span class="k">Decidi<span class="chip onlime">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]} · ${r.costo} € · ${r.passi.length} passi</span></span><div class="row"><span class="rb olight" data-az="apri" data-idx="${idx}" title="Apri">${ic('i-eye')}</span><span class="rb olight" data-az="filo" data-id="${r.chi}" title="Scrivi a ${esc(m.etichetta(chi))}">${ic('i-chat')}</span><span class="pag">${idx + 1} di ${n}</span><span class="rb black" data-az="approva" data-id="${r.id}" title="${r.tipo === 'revisione' ? 'Applica' : 'Approva'}">${ic('i-check')}</span><span class="rb red" data-az="rifiuta" data-idx="${idx}" title="Rifiuta con un motivo">${ic('i-x')}</span></div></div>
    </div>`;
  }
  function daApprovare(m, tel, st) {
    const { c, idx, r } = corrente(m, st);
    const oggiOk = approvateOggi(m);
    const codaHtml = c.length
      ? `<div class="m-sh"><h4>In coda</h4><span class="chip light">${c.length}</span></div>
        <div class="m-coda">${c.map((x, i) => { const e = m.byId[x.chi]; return `<div class="qrow${i === idx ? ' on' : ''}" data-az="apri" data-idx="${i}">${av(m, e, 'xs', 'attesa')}<div class="tx"><b>${esc(x.cosa)}</b><span>${esc(m.etichetta(e))} · ${esc(x.cliente)} · ${esc(x.ora)}</span></div><span class="rb xs">${ic('i-chevr')}</span></div>`; }).join('')}</div>
        <div class="m-coda" style="margin-top:18px"><div class="qrow" data-az="schermata" data-s="3"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-wand')}</span><div class="tx"><b>Riepilogo di oggi</b><span>consegne, spesa, obiettivo, diario</span></div><span class="rb xs">${ic('i-chevr')}</span></div></div>`
      /* lo stato vuoto: la card «Niente da approvare» e sotto il riepilogo di oggi, sul fondo del Riepilogo */
      : `${vuoto()}${riepilogoTesta(m, true)}${riepilogoLinea(m)}`;
    return `<div class="m-scr chiara${r ? '' : ' rie'}" data-schermata="1">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="m-logo">DGT</span><span class="r"><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></span></div>
        ${st.quadro ? quadroGiorno(m, st.quadro) : ''}
        ${st.quadro === 2 && st.conta
          /* con il quadro «due per due» il titolo porta il conto e la riga dei due numeri grandi cade: «approvate oggi» lo
             dice già la casella del quadro (correzione 16a) e «da approvare» lo dice il titolo. Vedi il commento sotto.
             ?conta= sceglie la misura del numero: 2 la strada di mezzo (36, la scelta dell'utente), 1 come il titolo (26,
             la forma scartata), 0 rimette la riga dei due numeri grandi anche col quadro 2, per il confronto. */
          /* niente spazio fra la parola e il numero: sono due elementi flex e lo spazio, con nowrap, allarga il primo
             quanto basta a mandare il titolo a capo (misurato: 234 px liberi, 222 senza spazio, oltre con) */
          ? `<h3 class="m-h1 conta${st.conta === 2 ? ' grande' : ''}">DA APPROVARE<b>${c.length}</b></h3>`
          : `<h3 class="m-h1">DA APPROVARE</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${c.length}${c.length ? `<span class="badge down">${ic('i-bell')}${Math.min(2, c.length)}</span>` : ''}</span><span>da approvare</span></div>
          <div class="m-stat"><span class="num">${oggiOk}${oggiOk ? `<span class="badge up">${ic('i-up')}${oggiOk}</span>` : ''}</span><span>approvate oggi</span></div>
        </div>`}
        ${r ? cardCorrente(m, r, idx, c.length) : ''}
        ${codaHtml}
      </div>
      ${navigazione(m, c.length, 1)}
    </div>`;
  }

  /* ---------- schermata 2: Richiesta ---------- */
  /* Il corpo di una consegna: il documento in una card bianca, «Chi la propone», la nota del dipendente. */
  function corpoConsegna(m, r, chi) {
    const doc = r.tipo === 'post'
      ? `<div class="lb"><span class="chip light">${ic('i-mega')}LinkedIn · bozza</span><span>${esc(r.cliente)}</span></div><div class="tx">${esc(r.testo)}</div><div class="img">${ic('i-doc')}${esc(r.allegato)}</div>`
      : `<div class="lb"><span class="chip light">${ic(iconaTipo[r.tipo])}${esc(r.allegato)}</span><span>${esc(r.cliente)}</span></div><div class="tx mono">${esc(r.testo)}</div>`;
    return `<div class="m-doc">${doc}</div>
      <div class="m-det"><h5>Chi la propone</h5><div class="who">${av(m, chi, '', 'attesa')}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
        <div class="kv"><span>Consegnata alle</span><b>${esc(r.ora)}</b></div><div class="kv"><span>Costo della consegna</span><b>${r.costo} €</b></div>
        <div class="passi">${r.passi.map(p => `<span class="chip">${ic('i-check')}${esc(p)}</span>`).join('')}</div></div>
      <div class="m-det"><h5>Nota del dipendente</h5><p>${esc(r.nota)}</p></div>`;
  }
  /* Il corpo di una revisione di performance (versione 12): le due versioni una sotto l'altra (soul prompt con le differenze,
     o i due modelli), Perché / Cosa ci aspettiamo / Rischi, «Chi riguarda», la nota del sistema. Gli stessi dati della tendina
     delle versioni della Console. */
  function corpoRevisione(m, r, rv, chi) {
    const d = m.dossierDi(chi);
    let colA, colB;
    if (rv.tipo === 'modello') {
      const col = (md, tag, testo) => { const u = d.modello.uso[md.id] || { esecuzioni: 0, costo: 0 }; return `<div class="m-doc ver"><div class="lb"><span class="chip ${tag}">${ic(md.icona)}${esc(md.nome)}</span><span>${testo}</span></div><p class="p">${esc(md.desc)}.</p><p class="p">${esc(md.costo)}.</p><div class="kvs"><div class="kv"><span>Esecuzioni in 30 giorni</span><b>${u.esecuzioni}</b></div><div class="kv"><span>Costo in 30 giorni</span><b>${u.costo} €</b></div></div></div>`; };
      colA = col(m.MODELLI[rv.da], 'ink', 'assegnato oggi'); colB = col(m.MODELLI[rv.a], 'lime', 'proposto');
    } else {
      const va = d.prompt.versioni.find(v => v.v === rv.da) || d.prompt.versioni[0], vb = d.prompt.versioni.find(v => v.v === rv.a) || va;
      const [L, R] = differenze(va.testo, vb.testo);
      const tag = v => v.proposta ? 'lime' : v.v === d.prompt.corrente ? 'ink' : 'light';
      const col = (v, testo) => `<div class="m-doc ver"><div class="lb"><span class="chip ${tag(v)}">${ic('i-doc')}v${v.v}${v.proposta ? ' · proposta' : v.v === d.prompt.corrente ? ' · in produzione' : ''}</span><span>${v.proposta ? 'dal sistema' : esc(v.chi)} · ${esc(v.data)}</span></div><div class="dif">${testo}</div>${v.numeri ? `<div class="kvs"><div class="kv"><span>Task</span><b>${v.numeri.task}${v.numeri.prova ? ' in prova' : ''}</b></div><div class="kv"><span>Corretti · respinte</span><b>${v.numeri.corretti}% · ${v.numeri.respinte}%</b></div><div class="kv"><span>Costo per esito utile</span><b>${eur(v.numeri.costo)}</b></div></div>` : ''}</div>`;
      colA = col(va, L); colB = col(vb, R);
    }
    const li = x => `<li><b>${esc(x.n)}</b><span>${esc(x.t)}</span></li>`;
    return `${colA}${colB}
      <div class="m-det"><h5>Perché</h5><ul>${rv.perche.map(li).join('')}</ul></div>
      <div class="m-det"><h5>Cosa ci aspettiamo</h5><ul>${rv.attese.map(li).join('')}</ul></div>
      <div class="m-det"><h5>Rischi</h5><ul>${rv.rischi.map(t => `<li><span>${esc(t)}</span></li>`).join('')}</ul><p>La prova: ${rv.prova.esecuzioni} esecuzioni, circa ${rv.prova.costo} €, esito in ${rv.prova.giorni} giorni. La versione attuale resta in produzione finché non decidi.</p></div>
      <div class="m-det"><h5>Chi riguarda</h5><div class="who">${av(m, chi)}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
        <div class="kv"><span>Proposta dal sistema</span><b>${esc(rv.quando)}</b></div><div class="kv"><span>Costo dell'analisi</span><b>${r.costo} €</b></div>
        <div class="passi">${r.passi.map(p => `<span class="chip">${ic('i-check')}${esc(p)}</span>`).join('')}</div></div>
      <div class="m-det"><h5>Nota del sistema</h5><p>${esc(r.nota)}</p></div>`;
  }
  function richiesta(m, tel, st) {
    const { c, idx, r } = corrente(m, st);
    const pag = `<span class="m-pager"><span class="rb" data-az="prec" title="Precedente">${ic('i-left')}</span>${c.length ? `${idx + 1} di ${c.length}` : '0 di 0'}<span class="rb" data-az="succ" title="Successiva">${ic('i-right')}</span></span>`;
    if (!r) return `<div class="m-scr" data-schermata="2">${barraStato(m)}<div class="m-scroll"><div class="m-nav"><span class="rb" data-az="indietro" title="Indietro">${ic('i-left')}</span>${pag}</div>${vuoto()}</div>${navigazione(m, 0, 1)}</div>`;
    const chi = m.byId[r.chi];
    const rv = r.tipo === 'revisione' ? m.revisioneDi(r) : null;
    const testa = rv
      ? `<div class="chips"><span class="chip">${ic('i-bolt')}Revisione${rv.tipo === 'prompt' ? ' del soul prompt' : ' del modello'}</span><span class="chip lime">${ic('i-bell')}decide il titolare</span></div>
          <h2>${rv.tipo === 'prompt' ? `Soul prompt v${rv.da}&nbsp;→&nbsp;v${rv.a}` : `Da ${esc(m.MODELLI[rv.da].nome)} a ${esc(m.MODELLI[rv.a].nome)}`}</h2>
          <div class="sotto"><b>${esc(m.etichetta(chi))}</b> · ${esc(m.sotto(chi))} · proposta ${esc(rv.quando)}</div>`
      : `<div class="chips"><span class="chip">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span><span class="chip">${r.costo} €</span><span class="chip">${r.passi.length} passi</span></div>
          <h2>${esc(r.cosa)}</h2>
          <div class="sotto"><b>${esc(m.etichetta(chi))}</b> · ${esc(r.cliente)} · consegnata alle ${esc(r.ora)}</div>`;
    const azioni = tel.motivo
      ? `<div class="m-bar motivo"><span class="k">Motivo del rifiuto, obbligatorio</span><input type="text" data-campo="motivo" placeholder="${rv ? 'Es. il limite di 800 battute non vale per i casi cliente' : 'Es. fuori tono: ripartire dai casi cliente'}" maxlength="120" autocomplete="off"><div class="row"><span class="pill red" data-az="rifiuta-conferma" data-id="${r.id}">${ic('i-x')}Rifiuta</span><span class="pill ghost" data-az="rifiuta-annulla">Annulla</span></div></div>`
      : rv
        /* le quattro decisioni della revisione: Prova (bianca, sopra), Applica lime, Chiedi modifiche, Rifiuta con motivo */
        ? `<div class="m-bar"><div class="row"><span class="pill on" data-az="prova" data-id="${r.id}">${ic('i-play')}Prova su ${rv.prova.esecuzioni} esecuzioni</span></div><div class="row"><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Applica</span><span class="rb ghost" data-az="modifiche" data-id="${r.id}" title="Chiedi modifiche">${ic('i-pen')}</span><span class="rb red" data-az="rifiuta" data-idx="${idx}" title="Rifiuta con un motivo">${ic('i-x')}</span></div></div>`
        : `<div class="m-bar"><div class="row"><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Approva</span><span class="rb ghost" data-az="modifiche" data-id="${r.id}" title="Chiedi modifiche">${ic('i-pen')}</span><span class="rb red" data-az="rifiuta" data-idx="${idx}" title="Rifiuta con un motivo">${ic('i-x')}</span></div></div>`;
    return `<div class="m-scr${tel.motivo ? ' motivo' : ''}${rv ? ' rev' : ''}" data-schermata="2">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="rb" data-az="indietro" title="Da approvare">${ic('i-left')}</span>${pag}</div>
        <div class="m-tit">${testa}</div>
        <div class="m-corpo">${rv ? corpoRevisione(m, r, rv, chi) : corpoConsegna(m, r, chi)}</div>
      </div>
      <div class="m-fade"></div>
      ${azioni}
    </div>`;
  }

  /* ---------- schermata 3: Riepilogo di oggi ---------- */
  function riepilogo(m, tel, st) {
    const n = coda(m).length;
    return `<div class="m-scr chiara rie" data-schermata="3">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="rb olight" data-az="indietro" title="Da approvare">${ic('i-left')}</span><span class="chip light">${ic('i-cal')}${esc(m.azienda.data)}</span></div>
        ${riepilogoTesta(m)}
        ${riepilogoLinea(m)}
        <div class="m-coda" style="margin-top:14px"><div class="qrow${n ? ' on' : ''}" data-az="schermata" data-s="1"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-bell')}</span><div class="tx"><b>Da approvare</b><span>${n ? `${n} richieste in attesa` : 'niente in attesa'}</span></div><span class="rb xs">${ic('i-chevr')}</span></div></div>
      </div>
      ${navigazione(m, n, 1)}
    </div>`;
  }

  /* ---------- schermata 4: Chat, l'elenco dei fili (versione 15, 2026-09-06) ----------
     Le stesse conversazioni della Console (`m.fili`, `m.filoDi`): una riga per dipendente con l'ultimo messaggio, l'ora e
     quanti messaggi restano da leggere. Si apre dalla tab «Chat» della navigazione in basso. */
  function chatElenco(m, tel, st) {
    const tutti = m.fili();
    /* la ricerca dell'elenco dei fili (versione 17): passa la soglia dei dodici (11 a undici dipendenti, 40 a quaranta),
       quindi resta e diventa vera. Sul telefono prende tutta la riga di navigazione, che è il posto che c'è. */
    const q = (st.cerca || '').trim().toLowerCase();
    const lst = q ? tutti.filter(x => (m.etichetta(x.e) + ' ' + m.sotto(x.e, true) + ' ' + ((x.ultimo || {}).testo || '')).toLowerCase().indexOf(q) >= 0) : tutti;
    const daLeggere = lst.filter(x => x.nuovi > 0).length;
    return `<div class="m-scr chiara" data-schermata="4">
      ${barraStato(m)}
      <div class="m-scroll">
        ${st.cerca === undefined
          ? `<div class="m-nav"><span class="m-logo">DGT</span><span class="r"><span class="rb white" data-az="mcerca" title="Cerca fra ${lst.length} conversazioni">${ic('i-search')}</span><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></span></div>`
          : `<div class="m-nav cerca"><span class="m-cerca"><i>${ic('i-search')}</i><input type="text" data-mcerca="1" value="${esc(st.cerca)}" placeholder="Cerca fra ${tutti.length} conversazioni" autocomplete="off" spellcheck="false"><span class="rb xs" data-az="mcerca-chiudi" title="Chiudi la ricerca">${ic('i-x')}</span></span></div>`}
        <h3 class="m-h1">CHAT</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${lst.length === tutti.length ? tutti.length : lst.length + ' di ' + tutti.length}</span><span>conversazioni</span></div>
          <div class="m-stat"><span class="num">${daLeggere}${daLeggere ? `<span class="badge down">${ic('i-bell')}${daLeggere}</span>` : ''}</span><span>da leggere</span></div>
        </div>
        <div class="m-sh"><h4>Dipendenti</h4><span class="chip light">${lst.length}</span></div>
        <div class="m-coda">${lst.length ? lst.map(x => { const e = x.e, u = x.ultimo; return `<div class="qrow filo${x.e.id === st.filo ? ' on' : ''}" data-az="filo" data-id="${e.id}">${av(m, e, 'xs')}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${u ? (u.da === 'io' ? 'Tu: ' : '') + esc(u.testo) : 'Nessun messaggio'}</span></div><span class="dx"><span class="ora">${u ? esc(u.ora) : ''}</span>${x.nuovi ? `<span class="n">${x.nuovi}</span>` : `<span class="rb xs">${ic('i-chevr')}</span>`}</span></div>`; }).join('') : `<div class="qrow"><div class="tx"><b>Nessuna conversazione</b><span>con «${esc(st.cerca || '')}»</span></div></div>`}</div>
      </div>
      ${navigazione(m, coda(m).length, 4)}
    </div>`;
  }

  /* ---------- schermata 5: il filo di un dipendente ----------
     Le bolle dei componenti (DGT_COMPONENTI.messaggio), le consegne che aspettano come riga bianca con approva e rifiuta,
     la barra di scrittura in fondo: quello che si scrive qui sta anche nella chat della Console (`m.scrivi`). */
  function filo(m, tel, st) {
    const e = m.byId[st.filo] || (m.fili()[0] || {}).e || m.dipendenti[0];
    const f = m.filoDi(e);
    const righe = f.map(v => {
      const r = v.richiesta ? m.richieste.find(t => t.id === v.richiesta) : null;
      return C.messaggio(m, e, v) + (r ? rigaRichiesta(m, r) : '');
    }).join('');
    const stato = e.stato === 'lavoro' ? `Al lavoro: legge le tue note fra un passo e l'altro.`
      : e.stato === 'errore' ? 'Fermo per un errore: risponde quando riparte.'
      : e.stato === 'pianificato' ? `Parte alle ${esc(e.att.quando)}: legge le tue note alla partenza.`
      : e.stato === 'attesa' ? 'Ha consegnato e aspetta la tua decisione.'
      : 'Libero: legge le tue note alla prossima esecuzione.';
    return `<div class="m-scr filo" data-schermata="5">
      ${barraStato(m)}
      <div class="m-nav"><span class="rb" data-az="indietro" data-s="4" title="Chat">${ic('i-left')}</span>
        <span class="chi">${av(m, e, 's')}<div><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div></span>
        <span class="rb" data-az="schermata" data-s="1" title="Da approvare">${ic('i-bell')}</span></div>
      <div class="m-scroll">
        <div class="m-fili">${righe}<p class="stato">${stato}</p></div>
      </div>
      <div class="m-fade"></div>
      <div class="m-bar scrivi"><div class="row"><input type="text" data-campo="mchat" placeholder="Scrivi a ${esc(m.etichetta(e))}…" maxlength="120" autocomplete="off"><span class="rb lime" data-az="mchat-invia" data-id="${e.id}" title="Invia">${ic('i-send')}</span></div></div>
    </div>`;
  }

  /* ---------- schermata 6: Agenda ----------
     La giornata dell'azienda sulla linea del tempo del Riepilogo (`m.giornata`): un marcatore per ora, una card per evento;
     sotto, i prossimi giorni con quanti impegni portano (`m.settimana`). Si apre dalla tab «Agenda». */
  function agenda(m, tel, st) {
    const ev = m.giornata(), set = m.settimana().slice(1), scad = m.scadenze().filter(s => s.giorni <= 7);
    const piani = ev.filter(x => x.stato === 'pianificato');
    const BADGE = { corso: ['lime', 'i-play'], attesa: ['lime', 'i-bell'], errore: ['rosa', 'i-warn'], pianificato: ['', 'i-clock'], fatto: ['', 'i-check'] };
    const card = x => { const e = m.byId[x.chi]; const b = BADGE[x.stato] || ['', 'i-check'];
      return `<div class="m"><span>${esc(x.da)}</span><i class="${b[0]}">${ic(b[1])}</i></div>
        <div class="m-ev ${x.stato}">${av(m, e, 's')}<div class="tx"><b>${esc(x.titolo)}</b><span>${esc(m.etichetta(e))} · ${esc(x.cliente || m.azienda.nome)}</span></div></div>`; };
    return `<div class="m-scr chiara rie" data-schermata="6">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="m-logo">DGT</span><span class="r"><span class="chip light">${ic('i-cal')}${esc(m.azienda.data)}</span><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></span></div>
        <h3 class="m-h1">AGENDA</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${ev.length}</span><span>eventi oggi</span></div>
          <div class="m-stat"><span class="num">${piani.length}${piani.length ? `<span class="badge flat">${ic('i-clock')}${esc(piani[0].da)}</span>` : ''}</span><span>da partire</span></div>
        </div>
        <div class="m-rie">${ev.length ? ev.map(card).join('') : `<div class="m linea ult"></div><div class="voce">Nessun evento oggi</div>`}</div>
        <div class="m-sh"><h4>Prossimi giorni</h4><span class="chip light">${set.reduce((t, g) => t + g.voci.length, 0)}</span></div>
        <div class="m-coda">${set.map(g => `<div class="m-gg qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic(g.voci.some(v => v.tipo === 'scadenza') ? 'i-target' : 'i-clock')}</span><div class="gg"><b>${esc(g.nome)} ${esc(g.data)}</b><span>${g.voci.length ? esc(g.voci.map(v => v.titolo).join(' · ')) : 'niente in programma'}</span></div><span class="chip light">${g.voci.length}</span></div>`).join('')}</div>
        ${scad.length ? `<div class="m-sh"><h4>Scadenze</h4><span class="chip light">${scad.length}</span></div>
        <div class="m-coda">${scad.map(s => `<div class="qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-target')}</span><div class="tx"><b>${esc(s.o.titolo)}</b><span>${esc(s.o.cliente)} · ${s.o.consegne[0]} di ${s.o.consegne[1]} consegne</span></div><span class="chip${s.o.stato === 'ritardo' ? ' rosa' : ' light'}">${esc(s.o.scadenza)}</span></div>`).join('')}</div>` : ''}
      </div>
      ${navigazione(m, coda(m).length, 6)}
    </div>`;
  }

  /* ---------- schermata 7: Dipartimenti, l'elenco (versione 17, 2026-09-07) ----------
     Era l'ultimo cerchio inerte della navigazione. Una riga per dipartimento: la pila dei suoi, il nome, i conti del giorno
     e la spesa di oggi; il numero lime a destra è quello che aspetta il titolare da quel dipartimento. Il sottotitolo dice
     «N dipendenti · M al lavoro», ma se c'è un'esecuzione ferma dice «M al lavoro · K ferm*»: l'errore è la cosa che chiede
     attenzione, e in 130 px non stanno tutti e tre i conti. */
  function contiDip(m, d) {
    const lst = m.perDip[d.id] || [];
    const ids = lst.map(e => e.id);
    return { lst, ids, lav: lst.filter(e => e.stato === 'lavoro').length, err: lst.filter(e => e.stato === 'errore').length,
      att: coda(m).filter(r => ids.includes(r.chi)), oggi: lst.reduce((t, e) => t + (e.att.costo || 0), 0) };
  }
  function dipartimenti(m, tel, st) {
    const lst = m.dipartimenti.map(d => Object.assign({ d }, contiDip(m, d)));
    const lav = lst.reduce((t, x) => t + x.lav, 0);
    return `<div class="m-scr chiara" data-schermata="7">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="m-logo">DGT</span><span class="r"><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></span></div>
        <h3 class="m-h1">DIPARTIMENTI</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${lst.length}</span><span>dipartimenti</span></div>
          <div class="m-stat"><span class="num">${m.n}${lav ? `<span class="badge up">${ic('i-up')}${lav}</span>` : ''}</span><span>dipendenti</span></div>
        </div>
        <div class="m-sh"><h4>Oggi in azienda</h4><span class="chip light">${esc(m.azienda.data)}</span></div>
        <div class="m-coda">${lst.map(x => {
          const sotto = x.err ? `${x.lav} al lavoro · ${x.err} ferm${x.err === 1 ? 'a' : 'e'}` : `${x.lst.length} dipendent${x.lst.length === 1 ? 'e' : 'i'} · ${x.lav} al lavoro`;
          return `<div class="qrow dip${x.d.id === st.dip ? ' on' : ''}" data-az="dip" data-dip="${x.d.id}">${pair(m, x.ids, 'xs', 3)}<div class="tx"><b>${esc(x.d.nome)}</b><span${x.err ? ' class="ferma"' : ''}>${esc(sotto)}</span></div><span class="dx"><span class="eur">${x.oggi} €</span>${x.att.length ? `<span class="n">${x.att.length}</span>` : `<span class="rb xs">${ic('i-chevr')}</span>`}</span></div>`;
        }).join('')}</div>
      </div>
      ${navigazione(m, coda(m).length, 7)}
    </div>`;
  }

  /* ---------- schermata 8: il dipartimento aperto ----------
     La pagina Dipartimento della Console (le sue cinque sezioni e i suoi tre numeri) ridotta al telefono, con un solo
     spostamento: «Da approvare» sale dalla quarta alla seconda posizione, perché il telefono è l'attrezzo con cui si decide
     e le righe sono decidibili sul posto (la stessa m.decidi di tutte le altre pagine). «Dipendenti» porta alla
     conversazione, l'unica pagina del dipendente che il telefono ha. */
  function dipartimento(m, tel, st) {
    const d = m.dipartimenti.find(x => x.id === st.dip) || m.dipartimenti[0];
    const { lst, ids, lav, att, oggi } = contiDip(m, d);
    const ordine = { lavoro: 0, errore: 1, pianificato: 2 };
    const esec = lst.filter(e => e.stato in ordine).sort((a, b) => ordine[a.stato] - ordine[b.stato]);
    const ob = m.obiettiviDi(d.id);
    const cm = m.costi('mese', d.id);
    const cn = m.consegneDi(d.id);   /* le consegne del dipartimento, lo stesso aggregatore della Console (versione 19) */
    const STATO_EV = { lavoro: 'corso', errore: 'errore', pianificato: 'pianificato' };
    const cardEsec = e => `<div class="m-ev ${STATO_EV[e.stato]}" data-az="filo" data-id="${e.id}" title="Scrivi a ${esc(m.etichetta(e))}">${av(m, e, 's')}<div class="tx"><b>${esc(e.att.titolo)}</b><span>${esc(m.etichetta(e))} · ${esc(e.stato === 'lavoro' ? 'da ' + e.att.da : e.stato === 'errore' ? 'ferma dalle ' + e.att.da : 'alle ' + e.att.quando)}</span></div></div>`;
    const rigaOb = o => `<div class="qrow ob ${esc(o.stato)}"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-target')}</span><div class="tx"><b>${esc(o.titolo)}</b><span>${esc(o.cliente)} · ${o.consegne[0]} di ${o.consegne[1]} consegne</span><span class="barra"><i style="width:${Math.max(2, Math.min(100, o.avanz))}%"></i></span></div><span class="chip${o.stato === 'ritardo' ? ' rosa' : o.stato === 'concluso' ? ' lime' : ' light'}">${o.stato === 'ritardo' ? ic('i-fire') : ''}${esc(o.scadenza)}</span></div>`;
    const rigaCliente = c => `<div class="qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-euro')}</span><div class="tx"><b>${esc(c.cliente)}</b><span>${c.consegne} consegn${c.consegne === 1 ? 'a' : 'e'} · ${Math.round(100 * c.spesa / Math.max(1, cm.totale))}% del dipartimento</span></div><span class="dx"><span class="eur">${eur(c.spesa)}</span></span></div>`;
    const sez = (titolo, n, dentro, vuoto) => `<div class="m-sh"><h4>${esc(titolo)}</h4><span class="chip light">${n}</span></div>${n ? dentro : `<div class="m-lista"><div class="m-ev pianificato"><div class="tx"><b>${esc(vuoto)}</b></div></div></div>`}`;
    return `<div class="m-scr chiara rie" data-schermata="8">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="rb olight" data-az="indietro" data-s="7" title="Dipartimenti">${ic('i-left')}</span><span class="chip light">${ic('i-org')}${esc(d.desc)}</span></div>
        <h3 class="m-h1${d.nome.length > 12 ? ' stretta' : ''}">${esc(d.nome.toUpperCase())}</h3>
        <div class="m-stats">
          <div class="m-stat"><span class="num">${lav}</span><span>al lavoro</span></div>
          <div class="m-stat"><span class="num">${att.length}${att.length ? `<span class="badge down">${ic('i-bell')}${att.length}</span>` : ''}</span><span>da approvare</span></div>
          <div class="m-stat"><span class="num">${oggi} €</span><span>spesi oggi</span></div>
        </div>
        ${sez('Oggi in ' + d.nome, esec.length, `<div class="m-lista">${esec.map(cardEsec).join('')}</div>`, 'Nessuna esecuzione oggi')}
        ${sez('Consegne di oggi', cn.length, `<div class="m-coda">${cn.map(c => rigaConsegna(m, c)).join('')}</div>`, 'Nessuna consegna oggi')}
        ${sez('Da approvare', att.length, `<div class="m-coda">${att.map(r => rigaRichiesta(m, r)).join('')}</div>`, 'Niente da approvare da ' + d.nome)}
        ${sez('Dipendenti', lst.length, `<div class="m-coda">${lst.map(e => `<div class="qrow" data-az="filo" data-id="${e.id}">${av(m, e, 'xs')}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div>${chipStato(m, e)}</div>`).join('')}</div>`, 'Nessun dipendente')}
        ${sez('Obiettivi', ob.length, `<div class="m-coda">${ob.map(rigaOb).join('')}</div>`, 'Nessun obiettivo assegnato')}
        ${sez('Spesa del mese', cm.perCliente.length, `<div class="m-coda">${cm.perCliente.map(rigaCliente).join('')}</div>`, 'Nessuna spesa nel mese')}
      </div>
      ${navigazione(m, coda(m).length, 7)}
    </div>`;
  }

  /* ---------- schermata 9: la consegna aperta (versione 19, 2026-09-07) ----------
     La pagina Consegna della Console ridotta al telefono. «Aprire una consegna» vuol dire una schermata sua anche qui:
     sul telefono non c'e' una tendina larga da usare, e la riga della sezione portava alla richiesta solo quando la
     consegna aspettava il titolare — le altre non portavano da nessuna parte.
     Il contenuto sulla superficie chiara (e' un documento), poi il passo con i suoi strumenti e le voci di log, e le
     azioni: decidere se aspetta il titolare, scrivere a chi l'ha fatta. Si torna al dipartimento. */
  function consegna(m, tel, st) {
    const c = m.consegnaDi(st.consegna) || m.consegneDi(st.dip)[0];
    if (!c) return dipartimento(m, tel, st);
    const e = m.byId[c.chi];
    const r = c.richiesta ? m.richieste.find(x => x.id === c.richiesta) : null;
    const i = r ? coda(m).indexOf(r) : -1;
    const stato = { fatto: 'Fatta', approvata: 'Approvata', attesa: 'Da approvare', bozza: 'In corso', errore: 'Non fatta' }[c.stato] || 'Da fare';
    const chip = c.stato === 'errore' ? `<span class="chip rosa">${ic('i-warn')}${stato}</span>` : c.stato === 'da fare' ? `<span class="chip light">${ic('i-clock')}${stato}</span>` : `<span class="chip lime">${ic(c.stato === 'attesa' ? 'i-bell' : c.stato === 'bozza' ? 'i-play' : 'i-check')}${stato}</span>`;
    const corpo = r ? r.testo : (c.passo && c.passo.esito ? c.passo.esito : (c.desc || 'Non ancora prodotta.'));
    const eti = r ? r.allegato : (c.desc && c.desc !== corpo ? c.desc : (c.cliente || m.etichetta(e)));
    const sez = (titolo, n, dentro) => n ? `<div class="m-sh"><h4>${esc(titolo)}</h4><span class="chip light">${n}</span></div>${dentro}` : '';
    return `<div class="m-scr chiara rie" data-schermata="9">
      ${barraStato(m)}
      <div class="m-scroll">
        <div class="m-nav"><span class="rb olight" data-az="indietro" data-s="8" title="${esc(m.dipDi(e).nome)}">${ic('i-left')}</span><span class="chip light">${ic(iconaTipo[c.tipo] || 'i-doc')}${esc(c.tipo)}</span></div>
        <h3 class="m-h1${c.nome.length > 12 ? ' stretta' : ''}">${esc(c.nome.toUpperCase())}</h3>
        <div class="m-coda"><div class="qrow" data-az="filo" data-id="${e.id}">${av(m, e, 'xs')}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}${c.cliente ? ' · ' + esc(c.cliente) : ''}</span></div>${chip}<span class="rb xs">${ic('i-chevr')}</span></div></div>
        <div class="m-doc"><div class="lb">${esc(eti)}</div><div class="tx">${esc(corpo)}</div></div>
        ${sez('Il passo che l\'ha prodotta', c.passo ? 1 : 0, c.passo ? `<div class="m-coda"><div class="qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-rows')}</span><div class="tx"><b>${c.passo ? c.passo.n + '. ' + esc(c.passo.nome) : ''}</b><span>${c.passo ? esc(c.passo.durata || '—') + ' · ' + eur(c.passo.costo) : ''}</span></div></div>${(c.passo && c.passo.strumenti || []).map(x => `<div class="qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-gear')}</span><div class="tx"><b>${esc(x)}</b><span>strumento</span></div></div>`).join('')}</div>` : '')}
        ${sez('Mentre la faceva', (c.voci || []).length, `<div class="m-coda">${(c.voci || []).map(v => `<div class="qrow"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic(v.tipo === 'strumento' ? 'i-gear' : v.tipo === 'nota' ? 'i-pen' : v.tipo === 'errore' ? 'i-warn' : 'i-rows')}</span><div class="tx"><b>${esc(v.testo)}</b><span>${esc(v.ora)}${v.costo ? ' · ' + eur(v.costo) : ''}</span></div></div>`).join('')}</div>`)}
        ${i >= 0 ? `<div class="m-azioni"><span class="pill lime" data-az="apri" data-idx="${i}">${ic('i-bell')}Decidi</span></div>` : ''}
      </div>
      ${navigazione(m, coda(m).length, 7)}
    </div>`;
  }

  const NOMI = { 1: 'Da approvare', 2: 'Richiesta', 3: 'Riepilogo di oggi', 4: 'Chat', 5: 'Conversazione', 6: 'Agenda', 7: 'Dipartimenti', 8: 'Dipartimento', 9: 'Consegna' };
  /* Un telefono: tel = { n, schermata, motivo }; st = { richiesta } condiviso fra i telefoni. */
  function render(m, tel, st) {
    const scr = tel.schermata === 2 ? richiesta(m, tel, st) : tel.schermata === 3 ? riepilogo(m, tel, st)
      : tel.schermata === 4 ? chatElenco(m, tel, st) : tel.schermata === 5 ? filo(m, tel, st) : tel.schermata === 6 ? agenda(m, tel, st)
      : tel.schermata === 7 ? dipartimenti(m, tel, st) : tel.schermata === 8 ? dipartimento(m, tel, st) : tel.schermata === 9 ? consegna(m, tel, st)
      : daApprovare(m, tel, st);
    return `<div class="m-tel" data-n="${tel.n}" role="figure" aria-label="Telefono ${tel.n} — ${NOMI[tel.schermata] || NOMI[1]} (contenuto sintetico)">${scr}</div>`;
  }

  /* Disegna la pagina con i telefoni e collega i clic. I telefoni condividono il modello e la richiesta corrente:
     quello che si decide su uno si vede subito sugli altri (e nella Console, che legge lo stesso modello). */
  function monta(radice, m, opz) {
    opz = opz || {};
    const st = { richiesta: opz.richiesta || 0, filo: opz.filo || ((m.fili()[0] || {}).e || m.dipendenti[0]).id, quadro: opz.quadro === undefined ? QUADRO : opz.quadro, conta: opz.conta === undefined ? CONTA : opz.conta, dip: opz.dip || m.dipartimenti[0].id, consegna: opz.consegna || '', cerca: undefined };
    const tels = (opz.schermate && opz.schermate.length ? opz.schermate : [1, 2, 3, 4, 5, 6, 7, 8]).map((s, i) => ({ n: i + 1, schermata: s >= 2 && s <= 9 ? s : 1, motivo: false }));
    const n = () => coda(m).length;
    radice.innerHTML = `<div class="m-page">
      <div class="m-hd"><h1>Il telefono del titolare</h1><p><b>Da approvare</b>, <b>Richiesta</b> e <b>Riepilogo di oggi</b>: post, documenti, liste, proposte e le revisioni di performance (le due versioni a confronto e le quattro decisioni), il rifiuto con motivo, il riepilogo che a coda finita prende il posto della coda. Poi le due tab della navigazione in basso: <b>Chat</b> (l'elenco dei fili e la conversazione con un dipendente, con la barra di scrittura) e <b>Agenda</b> (la giornata sulla linea del tempo, i prossimi giorni, le scadenze). I telefoni condividono il modello della Console: la richiesta scelta su uno si apre sull'altro, e quello che si decide o si scrive qui vale anche lì.</p></div>
      <div class="m-phones"></div>
    </div>`;
    const cont = radice.querySelector('.m-phones');
    const tutto = () => {
      const scroll = [...cont.querySelectorAll('.m-tel')].map(t => { const s = t.querySelector('.m-scroll'); return s ? s.scrollTop : 0; });
      cont.innerHTML = tels.map(t => `<div>${render(m, t, st)}<div class="m-cap">${t.n} · ${NOMI[t.schermata]}</div></div>`).join('');
      cont.querySelectorAll('.m-tel').forEach((t, i) => { const s = t.querySelector('.m-scroll'); if (!s) return; if (scroll[i]) s.scrollTop = scroll[i]; else if (t.querySelector('.m-scr.filo')) s.scrollTop = s.scrollHeight; });   // il filo si apre sull'ultimo messaggio
      window.DGT_AVATAR.anima(radice);
    };
    const telDi = el => { const t = el.closest('.m-tel'); return t ? tels[+t.dataset.n - 1] : tels[0]; };
    /* la decisione vive nel modello (m.decidi); per una revisione `esito` è prova | applicata | modifiche | rifiutata */
    const decidi = (id, stato, commento, esito) => {
      if (!m.decidi(id, stato, commento, esito)) return;
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
      if (ev.key === 'Escape' && ev.target.closest('input[data-mcerca]')) { ev.preventDefault(); st.cerca = undefined; tutto(); return; }
      const chat = ev.target.closest('input[data-campo="mchat"]');
      if (chat) { if (ev.key === 'Enter') { ev.preventDefault(); const b = chat.closest('.m-bar').querySelector('[data-az="mchat-invia"]'); if (b) b.click(); } return; }
      const inp = ev.target.closest('input[data-campo="motivo"]'); if (!inp) return;
      if (ev.key === 'Enter') { ev.preventDefault(); const b = inp.closest('.m-bar').querySelector('[data-az="rifiuta-conferma"]'); if (b) b.click(); }
      if (ev.key === 'Escape') { ev.preventDefault(); telDi(inp).motivo = false; tutto(); }
    });
    radice.addEventListener('input', ev => {
      const cer = ev.target.closest('input[data-mcerca]');
      if (cer) { const pos = cer.selectionStart; st.cerca = cer.value; tutto(); const j = cont.querySelector('input[data-mcerca]'); if (j) { j.focus({ preventScroll: true }); j.setSelectionRange(pos, pos); } return; }
      const inp = ev.target.closest('input[data-campo="motivo"],input[data-campo="mchat"]'); if (inp) inp.classList.remove('manca');
    });
    radice.addEventListener('click', ev => {
      const el = ev.target.closest('[data-az]'); if (!el || !radice.contains(el)) return;
      const az = el.dataset.az, tel = telDi(el);
      if (az === 'apri') { ev.stopPropagation(); if (el.dataset.idx !== undefined) st.richiesta = +el.dataset.idx; tel.schermata = 2; tel.motivo = false; tutto(); }
      else if (az === 'indietro') { tel.schermata = +(el.dataset.s || 1); tel.motivo = false; tutto(); }
      /* la consegna apre la sua schermata, come nella Console apre la sua pagina (versione 19) */
      else if (az === 'consegna') { ev.stopPropagation(); st.consegna = el.dataset.id; tel.schermata = 9; tel.motivo = false; tutto(); }
      /* la chat (versione 15): la riga apre il filo, la barra di scrittura ci scrive dentro (`m.scrivi`, lo stesso filo della Console) */
      else if (az === 'filo') { ev.stopPropagation(); st.filo = +el.dataset.id; tel.schermata = 5; tel.motivo = false; tutto(); }
      else if (az === 'mchat-invia') {
        const inp = el.closest('.m-bar').querySelector('input[data-campo="mchat"]'); const v = inp ? inp.value.trim() : '';
        if (!v) { if (inp) { inp.classList.add('manca'); inp.focus({ preventScroll: true }); } return; }
        m.scrivi(+el.dataset.id, v); tutto();
        const sc = cont.querySelector(`.m-tel[data-n="${tel.n}"] .m-scroll`); if (sc) sc.scrollTop = sc.scrollHeight;
      }
      else if (az === 'schermata') { ev.stopPropagation(); const s = +el.dataset.s; if (s >= 1 && s <= 9) { tel.schermata = s; tel.motivo = false; tutto(); } }
      /* la tab Dipartimenti (versione 17): la riga dell'elenco apre il dipartimento, che è condiviso fra i telefoni come la richiesta */
      else if (az === 'dip') { ev.stopPropagation(); st.dip = el.dataset.dip; tel.schermata = 8; tel.motivo = false; tutto(); }
      /* la ricerca fra le conversazioni (versione 17) */
      else if (az === 'mcerca') { st.cerca = ''; tutto(); const i = cont.querySelector('input[data-mcerca]'); if (i) i.focus({ preventScroll: true }); }
      else if (az === 'mcerca-chiudi') { st.cerca = undefined; tutto(); }
      else if (az === 'prec') { if (n()) st.richiesta = (st.richiesta - 1 + n()) % n(); tel.motivo = false; tutto(); }
      else if (az === 'succ') { if (n()) st.richiesta = (st.richiesta + 1) % n(); tel.motivo = false; tutto(); }
      else if (az === 'approva') { ev.stopPropagation(); decidi(el.dataset.id, 'approvata'); }
      else if (az === 'modifiche') { ev.stopPropagation(); decidi(el.dataset.id, 'modifiche', 'Modifiche chieste dal titolare'); }
      /* la prova di una revisione: la richiesta è approvata con esito «prova», la versione attuale resta in produzione */
      else if (az === 'prova') { ev.stopPropagation(); const r = m.richieste.find(x => x.id === el.dataset.id); const rv = r && m.revisioneDi(r); decidi(el.dataset.id, 'approvata', `Prova su ${rv ? rv.prova.esecuzioni : 20} esecuzioni`, 'prova'); }
      /* il rifiuto vuole sempre un motivo: dalla card della prima schermata si apre la richiesta con il campo pronto */
      else if (az === 'rifiuta') { ev.stopPropagation(); apriMotivo(tel, el.dataset.idx !== undefined ? +el.dataset.idx : undefined); }
      else if (az === 'rifiuta-annulla') { tel.motivo = false; tutto(); }
      else if (az === 'rifiuta-conferma') {
        const inp = el.closest('.m-bar').querySelector('input[data-campo="motivo"]'); const v = inp ? inp.value.trim() : '';
        if (!v) { if (inp) { inp.classList.add('manca'); inp.focus({ preventScroll: true }); } return; }
        decidi(el.dataset.id, 'rifiutata', v, 'rifiutata');
      }
    });
    return { st, tels, tutto };
  }

  return { id: 'M', nome: 'Mobile', css: prefissa(css, '.dirA'), render, monta, coda };
})();
