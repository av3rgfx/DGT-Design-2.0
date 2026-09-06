/* =====================================================================
   Direzione A — «Console». Il sistema di design (case study nero/lime,
   Urbanist, pillole e cerchi, card con intaglio, barra agenda, pannello
   chiaro) applicato alla vista principale dell'azienda e alla pagina Richieste.

   Versione 2 (2026-09-04): titolo con la O normale, logo = DGT, tendina del
   titolare flottante a tre stati (chiusa / aperta / estesa), home a tutta
   larghezza, pagina Richieste.
   Versione 3 (stessa data): Riepilogo separato (scelta dell'utente): due
   pillole e due tendine, «Da approvare» con la coda e «Riepilogo di oggi»;
   pagina Richieste completa: filtri per stato, tipo, periodo, cliente e
   dipendente, storico per giorno, approva/rifiuta anche in blocco, regole di
   approvazione.

   Versione 4 (stessa data): pagina Dipartimento (esecuzioni di oggi,
   dipendenti, obiettivi con avanzamento, richieste in attesa, spesa del mese
   per cliente), raggiungibile dalle card dei dipartimenti nella home.

   Versione 5 (stessa data): i dipendenti AI. Di base un dipendente non ha un
   nome: etichetta principale = ruolo (22 px, due righe) e sotto il
   dipartimento; con il nome torna la forma piena (nome 26 px, «ruolo ·
   dipartimento»). Avatar generati (avatar/avatar-dgt.js) al posto delle
   iniziali su gradiente, in tutte le viste. Tendina «Dipendente» per creare e
   modificare (nome, ruolo, dipartimento, avatar), aperta dalla matita nella
   card, dalla riga compatta e dalla card «Aggiungi».

   Versione 6 (2026-09-04, sessione successiva): la pagina del Dipendente,
   aperta dalla freccia nell'intaglio della card e della riga compatta.
   Testata (avatar grande, etichetta, azioni, quattro numeri a 30 giorni),
   revisione di performance (card lime con proposta, evidenze, attese, rischi
   e decisione del titolare; il dossier con le due versioni a confronto nella
   tendina estesa), oggi, rendimento, soul prompt con le versioni, modello e
   criterio di scelta, strumenti e connessioni, budget e permessi, colloquio.
   La revisione è anche una richiesta al titolare (tipo `revisione`).

   Versione 8 (stessa sessione): la pagina dell'Esecuzione, aperta dall'«occhio»
   e dalla freccia delle card esecuzione: testata con la barra dei passi (la
   barra agenda del sistema), passi come righe, log con filtri e barra di
   scrittura, output come card, costo per modello e per strumento; azioni
   pausa, interrompi, riprova, avvia ora, nota del titolare. Dati in
   m.esecuzioneDi(e). Avatar senza disco (avatar-orbe.js, pelli); poi, su
   giudizio dell'utente, pelle perla, corpi tondi e un motore di moto fluido.

   Versione 11 (2026-09-05, sessione successiva): le approvazioni da mobile
   in mobile.js + mobile.html, con gli stessi componenti (classi .dirA) e lo
   stesso modello: la decisione sulla richiesta passa da qui a dati.js come
   m.decidi, così telefono e Console condividono lo stato.

   Versione 13 (2026-09-06, sessione successiva): la pagina dei Costi
   dell'azienda (per dipartimento, dipendente, cliente, modello, strumento,
   con le pillole del periodo), aperta dal sesto cerchio del rail, dal numero
   «spesi oggi» e dalle sezioni Spesa del mese e Costo. Dati in m.costi.

   API: DIREZIONE_A.render(m, opz) → HTML; DIREZIONE_A.monta(radice, m, opz)
   disegna e collega i clic. opz = { pagina: 'home'|'richieste'|'dipartimento'|'dipendente'|'esecuzione'|'costi',
   dip: 'svi'|'mkt'|'ven'|'amm', id: id del dipendente, tendina: 'chiusa'|'aperta'|'estesa'|'dipendente'|'confronto'|'dossier',
   richiesta: indice, pannello: 'richieste'|'riepilogo', editor: 'nuovo'|id, confronto: 'a,b',
   periodo: { dipartimenti, dipendenti, clienti, modelli: 'oggi'|'mese'|'anno' } (pagina Costi) }.
   ===================================================================== */
window.DIREZIONE_A = (function () {
  const { ic, esc, prefissa, iconaDip } = window.DGT_UI;
  const C = window.DGT_COMPONENTI;
  /* le primitive condivise stanno in schermate/componenti.js (versione 14): qui le pagine, la cornice, le tendine e monta */
  const { variabili, av, pair, dots, chipStato, chipEsito, iconaTipo, nomeTipo, eur, delta, differenze } = C;

  const css = `
.a-app{${variabili};
  position:relative;width:1440px;min-height:900px;background:var(--black);color:var(--white);font:400 15px/20px var(--font);-webkit-font-smoothing:antialiased;padding-bottom:72px;overflow:hidden}
.a-app *{box-sizing:border-box}
.a-app h3,.a-app h4,.a-app h5,.a-app p{margin:0;font-weight:400}
.a-app svg{display:block}
.a-app [data-az]{cursor:pointer}
/* le superfici chiare della cornice (barra agenda, tendina, documento del prompt, righe delle versioni, card del modello scelto): l'orbe si inverte come sulle superfici chiare dei componenti (schermate/componenti.js) */
.a-sched .av svg.orbe,.vrow.on .av svg.orbe,.vrow.prop .av svg.orbe,.a-tend .av svg.orbe,.pdoc .av svg.orbe,.lead.mod.on .av svg.orbe{--av-c-corpo:var(--av-inv-corpo);--av-c-orlo:var(--av-inv-orlo);--av-c-orlo-w:var(--av-inv-orlo-w);--av-c-luce:var(--av-inv-luce);--av-occhi-neutri:#FCFCFC;--av-c-bordo:0;--av-c-zeta:#FCFCFC}
.a-tend .ncard .av svg.orbe,.a-tend .appr .av svg.orbe{--av-c-corpo:initial;--av-c-orlo:initial;--av-c-orlo-w:initial;--av-c-luce:initial;--av-occhi-neutri:initial;--av-c-bordo:initial;--av-c-zeta:initial}
.a-head .impost{margin-left:auto}
/* impaginazione della console */
.a-logo{position:absolute;left:28px;top:40px;height:40px;display:flex;align-items:center;font-weight:600;font-size:22px;letter-spacing:.12em;color:var(--white)}
.a-sched{position:absolute;left:102px;top:28px;right:158px;height:64px;border-radius:var(--r-pill);background:var(--white);color:var(--ink);display:flex;align-items:center;gap:14px;padding:6px 6px 6px 22px}
.a-sched .t{font-size:18px;white-space:nowrap}
.a-sched .cal{display:flex;align-items:center;gap:10px;height:44px;padding:0 20px 0 6px;border-radius:var(--r-pill);border:1px solid rgb(0 0 0/.14);font-size:14px;white-space:nowrap}
.a-sched .cal i{width:32px;height:32px;border-radius:50%;background:#EDEDED;display:grid;place-items:center}
.a-sched .cal svg{width:14px;height:14px}
.tl{flex:1;height:52px;border-radius:var(--r-pill);background:var(--lime);display:flex;align-items:center;gap:8px;padding:0 6px;position:relative;min-width:0;overflow:hidden}
.tl .ev{height:40px;border-radius:var(--r-pill);background:var(--white);display:flex;align-items:center;gap:8px;padding:0 6px 0 4px;font-size:12px;color:#6B6B6B;white-space:nowrap;flex:none}
.tl .ev .rb{border-color:rgb(0 0 0/.14);background:transparent;color:var(--ink)}
.tl .ev.plan{background:rgb(255 255 255/.55)}
.tl .tm{font-size:14px;padding:0 6px;white-space:nowrap;color:var(--ink)}
.tl .sep{width:1px;height:28px;background:rgb(0 0 0/.35);flex:none}
.tl .live{flex:1;height:40px;border-radius:var(--r-pill);background:var(--lime-deep);display:flex;align-items:center;justify-content:space-between;padding:0 4px 0 12px;position:relative;min-width:150px}
.tl .live .lbl{font-size:12px;color:rgb(0 0 0/.65);white-space:nowrap;margin-left:24px}
.tl .live .rb{width:32px;height:32px;background:rgb(0 0 0/.06);border-color:transparent;color:var(--ink)}
.tl .live .rb svg{width:14px;height:14px}
.tl .live .pair{margin-left:auto;margin-right:6px}
.tl .live .pair .av{border-color:var(--av-anello-pelle,var(--lime-deep))}
.tl .now{position:absolute;left:0;top:2px;bottom:-8px;width:1px;background:var(--ink)}
.tl .now b{position:absolute;left:0;top:0;transform:translate(-50%,-50%);height:22px;padding:0 10px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);font-size:11px;font-weight:400;display:flex;align-items:center;white-space:nowrap}
.tl .now i{position:absolute;left:0;bottom:0;width:8px;height:8px;border-radius:50%;background:var(--white);transform:translateX(-50%)}
.a-sched .go{border-color:rgb(0 0 0/.14);background:transparent;color:var(--ink);width:52px;height:52px}
.a-tr{position:absolute;right:26px;top:36px;display:flex;gap:10px;align-items:center}
.a-back{position:absolute;left:26px;top:128px}
.a-head{position:absolute;left:102px;top:112px;right:26px;display:flex;align-items:center;gap:40px}
.a-title{font-size:46px;line-height:56px;letter-spacing:.02em;white-space:nowrap}
.a-new{height:52px;padding:0 24px 0 6px;border-radius:var(--r-pill);background:var(--white);color:var(--ink);display:flex;align-items:center;gap:14px;font-size:14px;white-space:nowrap;flex:none}
.a-new i{width:40px;height:40px;border-radius:50%;background:#EDEDED;display:grid;place-items:center}
.a-new svg{width:16px;height:16px}
.a-stats{display:flex;gap:56px;margin-left:16px}
.stat{display:flex;align-items:flex-end;gap:8px;position:relative;padding-right:44px;white-space:nowrap}
.stat b{font-weight:300;font-size:48px;line-height:56px}
.stat span{font-size:19px;color:var(--t2);line-height:32px}
.stat .badge{position:absolute;right:0;top:4px}
.a-rail{position:absolute;left:26px;top:260px;display:grid;gap:12px}
.a-main{position:relative;margin:232px 0 0 102px;width:1312px;display:grid;grid-template-columns:minmax(0,1fr);gap:40px}
.a-main>section{min-width:0}
.shead{display:flex;align-items:center;gap:14px;white-space:nowrap;height:46px}
.shead h3{font-size:28px;line-height:34px;margin-right:22px}
.shead .cnt{display:inline-flex;align-items:baseline;gap:5px;border-bottom:1px solid var(--white);padding-bottom:2px;margin-right:24px}
.shead .cnt b{font-weight:400;font-size:20px}.shead .cnt span{font-size:13px;color:#DADADA}
.shead .rb.sm{width:46px;height:46px}
.shead .filters{display:flex;gap:8px;margin-left:8px;overflow:hidden;mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent);flex:1;min-width:0}
.shead .destra{margin-left:auto;display:flex;gap:8px;flex:none}
.cards{display:flex;gap:16px;margin-top:24px;flex-wrap:wrap}
.cards.riga{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-right:-26px;padding-right:26px}
.cards.riga::-webkit-scrollbar{display:none}
.vuoto{margin-top:24px;height:96px;border-radius:var(--r-card);border:1px dashed rgb(255 255 255/.2);display:flex;align-items:center;justify-content:center;color:var(--t2);font-size:15px}
/* elenco compatto dei dipendenti (oltre 16) */
.elenco{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:24px}
/* ===== pagina Richieste: barra dei filtri, storico, regole ===== */
.fbar{display:grid;gap:10px;margin-top:-8px;padding-right:220px}
.frow{display:flex;align-items:center;gap:8px;min-width:0}
.frow .k{width:92px;flex:none;font-size:11px;color:var(--t2);text-transform:uppercase;letter-spacing:.06em}
.frow .pills{display:flex;gap:8px;overflow:hidden;mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent);min-width:0;flex:1}
.frow .pills.due{flex:none;mask-image:none;overflow:visible}
.frow .sep{width:1px;height:28px;background:rgb(255 255 255/.16);margin:0 8px;flex:none}
.fsum{display:flex;align-items:center;gap:12px;font-size:14px;color:var(--t2);margin-top:4px}
.fsum b{color:var(--white);font-weight:400}
.fsum .pill{height:36px;padding:0 14px;font-size:13px}
.hgroup{margin-top:18px;font-size:13px;color:var(--t2);display:flex;align-items:baseline;gap:8px}
.hgroup b{font-weight:400;color:var(--white);font-size:16px}
.hlist{display:grid;gap:8px;margin-top:10px}
.regole .lead .sel{height:40px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);display:inline-flex;align-items:center;gap:8px;padding:0 12px 0 14px;font-size:13px;white-space:nowrap;max-width:100%}
.regole .lead .sel svg{width:12px;height:12px}
/* ===== tendina del titolare: chiusa / aperta / estesa ===== */
.a-mini{position:fixed;right:0;top:240px;z-index:30;height:56px;padding:0 20px 0 12px;border-radius:var(--r-pill) 0 0 var(--r-pill);background:var(--lime);color:var(--ink);display:flex;align-items:center;gap:10px;box-shadow:0 20px 50px rgb(0 0 0/.6);font-size:14px;white-space:nowrap}
.a-mini .rb{width:36px;height:36px;background:var(--ink);color:var(--white);border-color:transparent}
.a-mini .rb svg{width:15px;height:15px}
.a-mini b{font-weight:500;font-size:22px;line-height:1}
.a-mini svg.ch{width:14px;height:14px;opacity:.7}
.a-mini.rie{top:308px;background:var(--white)}
.a-tend{position:fixed;right:0;top:112px;height:calc((100vh / var(--z,1)) - 136px);max-height:764px;width:330px;z-index:30;background:var(--summary);color:var(--ink);border-radius:var(--r-card) 0 0 var(--r-card);box-shadow:0 30px 80px rgb(0 0 0/.7);display:grid;grid-template-rows:auto 1fr;grid-template-columns:minmax(0,1fr);--behind:var(--summary)}
.a-tend>*{min-width:0}
.a-tend.estesa{width:840px}
.a-tend .th{display:flex;align-items:center;gap:10px;padding:14px 14px 0 14px}
.a-tend .th h4{font-size:26px;line-height:30px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.a-tend .th .chip{height:28px;font-size:13px}
.a-tend.aperta .th .rb.olight.sm{width:34px;height:34px}.a-tend.aperta .th .rb.olight.sm svg{width:14px;height:14px}
.a-tend .th .rb.olight.n{padding:0 10px 0 6px;width:auto;border-radius:var(--r-pill);gap:6px;font-size:13px;display:inline-flex}
.a-tend .tb{overflow:auto;padding:12px 14px 18px 14px;display:grid;grid-template-columns:minmax(0,1fr);gap:10px;align-content:start;scrollbar-width:thin}
/* richiesta corrente (forma della videochiamata) */
.appr{position:relative;height:240px;border-radius:var(--r-inner);background:radial-gradient(120% 90% at 60% 30%,#8E8E86,#5C5C57 55%,#3D3D3A);overflow:hidden;color:var(--white)}
.appr .top{position:absolute;left:12px;right:12px;top:12px;display:flex;justify-content:space-between;align-items:center}
.appr .top .chip{background:rgb(0 0 0/.35);color:var(--white);height:28px;padding:0 12px}
.appr .top .r{display:flex;gap:6px}
.appr .top .r .rb{width:36px;height:36px}.appr .top .r .rb svg{width:14px;height:14px}
.appr .face{position:absolute;left:50%;top:50px;transform:translateX(-50%);border:0}
.appr .cap{position:absolute;left:14px;right:14px;top:126px;text-align:center;font-size:13px;line-height:17px;color:#EDEDED;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.appr .cap b{display:block;font-weight:500;font-size:15px;color:var(--white);overflow:hidden;text-overflow:ellipsis}
.appr .ctl{position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:8px}
.a-tend .sub{display:flex;align-items:center;gap:12px;padding:8px 0 0}
.a-tend .sub h5{font-size:18px;line-height:24px;flex:1}
.a-tend .sub .rb{width:36px;height:36px}.a-tend .sub .rb svg{width:14px;height:14px}
.drow{display:grid;grid-template-columns:44px 1fr;gap:8px;font-size:12px;line-height:16px;color:#3E3E3E;padding:6px 0;border-top:1px solid rgb(0 0 0/.08)}
.drow span{color:var(--t2-light)}
.drow b{font-weight:500;color:var(--ink)}
/* richiesta estesa */
.rx{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px}
.rx .doc{background:var(--white);border-radius:var(--r-inner);padding:20px 22px 22px;display:grid;gap:14px;align-content:start}
.rx .doc .lb{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--t2-light)}
.rx .doc .lb .chip{height:24px;font-size:11px}
.rx .doc .tx{font-size:16px;line-height:24px;color:#1E1E1E;white-space:pre-line}
.rx .doc .tx.mono{font-size:14px;line-height:22px}
.rx .doc .img{height:150px;border-radius:14px;background:#E4E4E4;display:grid;place-items:center;color:#8A8A8A;font-size:12px;gap:6px}
.rx .doc .img svg{width:22px;height:22px;color:#8A8A8A}
.rx .det{display:grid;gap:10px;align-content:start}
.rx .det .dcard{padding:14px 16px}
.rx .det .dcard h5{font-size:15px;line-height:20px;padding-right:0;color:var(--t2-light)}
.rx .det .who{display:flex;align-items:center;gap:12px;padding:0;margin-top:10px}
.rx .det .who b{display:block;font-weight:500;font-size:15px}.rx .det .who span{display:block;font-size:12px;color:var(--t2-light)}
.rx .det .passi{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.rx .det .nota{font-size:13px;line-height:19px;color:#3E3E3E;margin-top:8px}
.rx .azioni{grid-column:1/3;display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:4px 0 6px}
.rx .azioni .pill{height:48px}
.rx .azioni .link{margin-left:auto;color:var(--t2-light);font-size:14px;display:inline-flex;align-items:center;gap:8px}
.rx .azioni .link svg{width:14px;height:14px}
.pager{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--t2-light);white-space:nowrap}
.pager .rb{width:32px;height:32px}.pager .rb svg{width:13px;height:13px}
/* ===== tendina Dipendente: creazione e modifica nel linguaggio della Console ===== */
.a-tend.dip .tb{gap:14px}
.a-tend.dip .th h4{font-size:22px}
.anteprima{display:grid;place-items:center;padding:2px 0 0}
.anteprima .nt .rb{border-color:rgb(0 0 0/.14);color:var(--ink)}
.campo{display:grid;gap:6px}
.campo .k{font-size:11px;color:var(--t2-light);text-transform:uppercase;letter-spacing:.06em;padding-left:6px;display:flex;justify-content:space-between}
.campo .k i{font-style:normal;text-transform:none;letter-spacing:0;color:#8A8A8A}
.campo input{height:48px;border-radius:var(--r-pill);background:var(--white);border:1px solid transparent;padding:0 18px;font:400 15px/20px var(--font);color:var(--ink);width:100%;outline:none;-webkit-font-smoothing:antialiased}
.campo input:focus{border-color:var(--ink)}
.campo input::placeholder{color:#A7A7A7}
.campo .pills{display:flex;flex-wrap:wrap;gap:6px}
.campo .pill{height:36px;padding:0 14px;font-size:13px;border-color:rgb(0 0 0/.14);color:var(--ink);cursor:pointer}
.campo .pill.on{background:var(--ink);color:var(--white);border-color:transparent}
.scelte{display:flex;gap:6px;flex-wrap:wrap;padding-left:2px}
.scelte .av{cursor:pointer;border:2px solid transparent}
.scelte .av.on{border-color:var(--ink)}
.tinte{display:flex;gap:8px;flex-wrap:wrap;padding:2px 0 0 2px}
.tinte .dot{width:30px;height:30px;border-radius:50%;cursor:pointer;border:2px solid var(--summary);box-shadow:0 0 0 2px transparent;flex:none}
.tinte .dot.on{box-shadow:0 0 0 2px var(--ink)}
.a-tend .azioni{display:flex;gap:8px;padding-top:2px;flex-wrap:wrap}
.a-tend .azioni .pill{height:44px;cursor:pointer}
.a-tend .azioni .pill.olight{color:var(--ink)}
/* ===== pagina Dipendente (versione 6): testata, revisione di performance, rendimento, soul prompt, modello, strumenti, budget, colloquio ===== */
.a-title.lungo{font-size:36px;line-height:44px}
.a-title.lunghissimo{font-size:30px;line-height:40px}
.dtesta{display:grid;gap:20px;margin-top:-8px}
.dtesta .ident{display:flex;align-items:flex-start;gap:22px;min-width:0}
.dtesta .ident>.av{margin-top:8px}
.dtesta .ident .tx{min-width:0;display:grid;gap:4px}
.dtesta .ident .tx>b{font-weight:400;font-size:28px;line-height:34px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dtesta .ident .tx>span{font-size:14px;color:var(--t2);white-space:nowrap}
.dtesta .chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
.dtesta .azioni{display:flex;gap:8px;margin-top:12px}
.dtesta .azioni .pill{cursor:pointer}
.dtesta .mans{font-size:17px;line-height:25px;color:#DADADA;max-width:66ch;margin:0}
.dtesta .numeri{margin-left:0;gap:48px}
.dtesta .k30{font-size:12px;color:var(--t2);margin-top:-8px}
.rev{padding:22px 24px 20px;--behind:var(--black)}
.rev .rhead{display:flex;gap:6px;flex-wrap:wrap;padding-right:130px}
.rev .rtit{font-size:26px;line-height:32px;margin-top:14px;max-width:38ch;font-weight:400}
.rev .rcols{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:28px;margin-top:20px}
.rev .k{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:rgb(0 0 0/.6);display:block;margin-bottom:8px}
.rev ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.rev li{display:grid;grid-template-columns:auto 1fr;gap:10px;font-size:14px;line-height:19px;align-items:start}
.rev li b{font-weight:500;white-space:nowrap;background:rgb(0 0 0/.1);border-radius:var(--r-pill);padding:0 8px;height:22px;display:inline-flex;align-items:center;font-size:12px}
.rev li span{min-width:0}
.rev li i{display:inline-grid;place-items:center;width:18px;height:18px;border-radius:50%;background:rgb(0 0 0/.1);vertical-align:-4px;margin-left:4px;cursor:pointer}
.rev li i svg{width:10px;height:10px}
.rev p{font-size:13px;line-height:18px;color:rgb(0 0 0/.7);margin:0}
.rev .rdec{margin-top:22px;padding-top:16px;border-top:1px solid rgb(0 0 0/.12)}
.rev .rdec .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.rev .rdec .pill{height:48px;cursor:pointer}
.rev .rdec .pill.olight{color:var(--ink)}
.rev .rdec .link{margin-left:auto;font-size:14px;color:rgb(0 0 0/.7);display:inline-flex;align-items:center;gap:8px;cursor:pointer}
.rev .rdec .link svg{width:14px;height:14px}
.hrow.rev{grid-template-columns:90px 200px minmax(0,1fr) 110px 210px 32px;padding-right:8px}
.hrow .tx .badge{height:16px;font-size:10px;padding:0 5px;vertical-align:middle}
.oggi{display:grid;grid-template-columns:316px minmax(0,1fr);gap:16px;margin-top:24px;align-items:start}
.hgroup .link{margin-left:auto;font-size:13px;color:var(--white);display:inline-flex;align-items:center;gap:8px;cursor:pointer}
.hgroup .link svg{width:13px;height:13px}
.crow.rend{grid-template-columns:40px minmax(0,1fr) 170px 150px 110px 32px}
.crow .v .chip,.crow .eur .chip{height:24px;font-size:11px;font-weight:400}
.prompt{display:grid;grid-template-columns:minmax(0,1fr) 490px;gap:16px;margin-top:24px;align-items:start}
.pdoc{position:relative;background:var(--summary);color:var(--ink);border-radius:var(--r-card);padding:22px 24px 18px;--behind:var(--black)}
.pdoc .nt .rb{border-color:rgb(255 255 255/.16);color:var(--white);background:transparent;cursor:pointer}
.pdoc .lb{display:flex;gap:10px;align-items:center;font-size:12px;color:var(--t2-light);margin-bottom:16px;padding-right:120px;min-width:0}
.pdoc .lb span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pdoc p{font-size:17px;line-height:26px;color:#1E1E1E;margin:0 0 12px}
.pdoc .kv{border-top:1px solid rgb(0 0 0/.1);padding-top:12px;margin-top:6px}
.vlist{display:grid;gap:8px}
.vrow{height:56px;border-radius:var(--r-pill);background:linear-gradient(180deg,var(--card-top),var(--card));display:flex;align-items:center;gap:12px;padding:0 8px 0 18px;min-width:0}
.vrow>.v{font-weight:300;font-size:22px;width:36px;flex:none}
.vrow .tx{flex:1;min-width:0;line-height:16px}
.vrow .tx b{display:block;font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vrow .tx span{display:block;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vrow .chip{height:24px;font-size:11px;flex:none}
.vrow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16);flex:none;cursor:pointer}
.vrow.on{background:var(--white);color:var(--ink)}
.vrow.prop{background:var(--lime);color:var(--ink)}
.vrow.on .tx span,.vrow.prop .tx span{color:rgb(0 0 0/.6)}
.vrow.on .rb.xs,.vrow.prop .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
.cards.modelli .lead{height:236px;cursor:pointer}
.lead.mod .role{white-space:normal;line-height:17px;height:34px;overflow:hidden}
.lead.mod.on{background:var(--white);color:var(--ink)}
.lead.mod.on .role,.lead.mod.on .k,.lead.mod.on .v small{color:var(--t2-light)}
.lead.mod.on .ico{border-color:rgb(0 0 0/.14)}
.task.regola{width:517px;min-height:236px}
.task.regola .body{padding-top:16px}
.task.regola .rtx{font-size:17px;line-height:25px;margin:0}
.task.regola .rtx b{font-weight:500}
.bp,.coll{display:grid;grid-template-columns:316px minmax(0,1fr);gap:16px;margin-top:24px;align-items:start}
.task.budget .prog,.task.esito .prog{margin-top:14px}
.task.budget .meta,.task.esito .meta{margin-top:10px}
.hrow.caso{grid-template-columns:40px minmax(0,1fr) 110px 64px 32px}
.hrow.caso .ora{text-align:center}
/* tendina estesa delle versioni: dossier della revisione o confronto fra due versioni */
.a-tend.vers{max-height:980px}
.a-tend.vers .tb{gap:12px}
.who2{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--t2-light);min-width:0}
.who2 b{color:var(--ink);font-weight:500;font-size:15px}
.who2 .chip{height:24px;font-size:11px;margin-left:auto}
.cmp{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.cmp .doc{background:var(--white);border-radius:var(--r-inner);padding:16px 18px;display:grid;gap:8px;align-content:start;min-width:0}
.cmp .doc .lb{display:flex;gap:8px;align-items:center;font-size:12px;color:var(--t2-light);min-width:0;margin-bottom:4px}
.cmp .doc .lb .chip{height:24px;font-size:11px;flex:none}
.cmp .doc .lb span:last-child{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cmp .doc p{font-size:14px;line-height:21px;color:#1E1E1E;margin:0;padding:3px 8px;border-radius:10px}
.cmp .doc p.add{background:var(--lime)}
.cmp .doc p.del{background:var(--badge-red);color:var(--badge-red-ink);text-decoration:line-through}
.cmp .doc p.chg{background:rgb(0 0 0/.045)}
.cmp mark{border-radius:5px;padding:0 3px;background:var(--lime);color:var(--ink)}
.cmp mark.del{background:var(--badge-red);color:var(--badge-red-ink);text-decoration:line-through}
.cmp .doc .kv{border-top:1px solid rgb(0 0 0/.08);padding-top:10px;margin-top:4px}
.ev3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.ev3 .dcard{padding:14px 16px}
.ev3 .dcard h5{font-size:15px;line-height:20px;color:var(--t2-light);padding-right:0}
.ev3 ul{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:8px}
.ev3 li{display:grid;grid-template-columns:auto 1fr;gap:8px;font-size:12px;line-height:17px;color:#3E3E3E}
.ev3 li b{font-weight:500;color:var(--ink);white-space:nowrap}
.ev3 li span{min-width:0}
.ev3 .nota{font-size:12px;line-height:17px;color:#3E3E3E;margin-top:10px}
.a-tend.vers .azioni{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:4px 0 6px}
.a-tend.vers .azioni .pill{height:44px;cursor:pointer}
.a-tend.vers .azioni .link{margin-left:auto;color:var(--t2-light);font-size:14px;display:inline-flex;align-items:center;gap:8px;cursor:pointer}
.a-tend.vers .azioni .link svg{width:14px;height:14px}
.a-tend.vers .azioni.motivo .k{font-size:11px;color:var(--t2-light);text-transform:uppercase;letter-spacing:.06em;width:100%}
.a-tend.vers .azioni.motivo input{flex:1;height:44px;border-radius:var(--r-pill);background:var(--white);border:1px solid transparent;padding:0 16px;font:400 14px/20px var(--font);color:var(--ink);outline:none;min-width:240px}
.a-tend.vers .azioni.motivo input:focus{border-color:var(--ink)}
/* ===== pagina Esecuzione (versione 8): testata con la barra dei passi, passi, log con la barra di scrittura, output, costo ===== */
.etesta{display:grid;gap:18px;margin-top:-8px}
.etesta .ident{display:flex;align-items:center;gap:18px;min-width:0;flex-wrap:wrap}
.etesta .ident .tx{min-width:0;display:grid;gap:2px}
.etesta .ident .tx>b{font-weight:500;font-size:18px;line-height:22px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.etesta .ident .tx>span{font-size:13px;color:var(--t2);white-space:nowrap}
.etesta .chips{display:flex;gap:6px;flex-wrap:wrap;margin-left:14px}
.etesta .chips .chip[data-az]{cursor:pointer}
.etesta .adesso{font-size:17px;line-height:25px;color:#DADADA;max-width:78ch;margin:0}
.etesta .adesso b{font-weight:500;color:var(--white)}
.etesta .azioni{display:flex;gap:8px;flex-wrap:wrap}
.etesta .azioni .pill{cursor:pointer}
/* la barra dei passi: la barra agenda del sistema, ferma nella testata; i passi fatti sono eventi bianchi, quello in corso è il segmento «adesso», quelli da fare sono eventi traslucidi */
.etesta .a-sched{position:static;height:64px;margin-top:4px;padding-left:22px}
.etesta .a-sched .t{font-size:18px}
.etesta .tl{overflow-x:auto}
.etesta .tl .ev{gap:8px;padding:0 12px 0 4px;color:#6B6B6B}
.etesta .tl .ev .n{width:32px;height:32px;border-radius:50%;background:var(--ink);color:var(--white);display:grid;place-items:center;font-size:12px;flex:none}
.etesta .tl .ev .n svg{width:14px;height:14px}
.etesta .tl .ev.plan .n{background:transparent;border:1px solid rgb(0 0 0/.3);color:var(--ink)}
.etesta .tl .ev.err{background:var(--badge-red);color:var(--badge-red-ink)}
.etesta .tl .ev.err .n{background:var(--badge-red-ink);color:var(--white)}
.etesta .tl .ev .nm{max-width:190px;overflow:hidden;text-overflow:ellipsis;color:var(--ink)}
.etesta .tl .ev.plan .nm{color:rgb(0 0 0/.55)}
.etesta .tl .ev b{font-weight:500;color:var(--ink)}
.etesta .tl .live .lbl{overflow:hidden;text-overflow:ellipsis;margin-right:8px}
.etesta .tl .live .lbl b{font-weight:500;color:var(--ink)}
.etesta .tl .fine{height:40px;border-radius:var(--r-pill);background:var(--white);display:flex;align-items:center;gap:8px;padding:0 14px 0 6px;font-size:12px;color:#6B6B6B;white-space:nowrap;flex:none;margin-left:auto}
.etesta .tl .fine b{color:var(--ink);font-weight:500}
.etesta .tl .fine .rb{width:28px;height:28px;background:var(--ink);color:var(--white);border-color:transparent}.etesta .tl .fine .rb svg{width:12px;height:12px}
/* i passi come righe */
.hrow.passo{grid-template-columns:40px minmax(0,1fr) 120px 170px 110px 64px 32px}
.hrow.passo .n{width:40px;height:40px;border-radius:50%;border:1px solid rgb(255 255 255/.16);display:grid;place-items:center;font-size:14px}
.hrow.passo .n svg{width:16px;height:16px}
.hrow.passo.corso{background:var(--lime);color:var(--ink)}.hrow.passo.corso .tx span,.hrow.passo.corso .chi{color:rgb(0 0 0/.6)}.hrow.passo.corso .n{border-color:rgb(0 0 0/.2)}.hrow.passo.corso .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
.hrow.passo.errore{background:var(--gray-card)}.hrow.passo.errore .tx span,.hrow.passo.errore .chi{color:#D0D0D0}
.hrow.passo.dafare{opacity:.6}
.hrow.passo .tx b{font-weight:500}
.hrow.passo .chi small{margin-left:6px;font-size:11px}
.hrow.passo.corso .chi small{color:rgb(0 0 0/.6)}
/* il log: righe più basse, il testo può stare su due righe; la barra di scrittura in fondo (barra chat del riferimento) */
.lrow{min-height:48px;border-radius:24px;background:linear-gradient(180deg,var(--card-top),var(--card));display:grid;grid-template-columns:64px 118px minmax(0,1fr) 64px 32px;align-items:center;gap:10px;padding:6px 8px 6px 18px}
.lrow>*{min-width:0}
.lrow .ora{font-size:13px;color:var(--t2);white-space:nowrap}
.lrow .chip{height:24px;font-size:11px}
.lrow .tx{font-size:14px;line-height:18px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.lrow .tx small{color:var(--t2);font-size:12px;margin-left:6px}
.lrow .eur{font-size:13px;text-align:right;white-space:nowrap;color:var(--t2)}
.lrow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16)}
.lrow.errore{background:var(--gray-card)}
.lrow.titolare{background:var(--white);color:var(--ink)}.lrow.titolare .ora,.lrow.titolare .eur{color:var(--t2-light)}.lrow.titolare .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
.chat{height:56px;border-radius:var(--r-pill);background:var(--white);color:var(--ink);display:flex;align-items:center;gap:12px;padding:0 6px 0 8px;margin-top:8px}
.chat input{flex:1;height:44px;border:0;background:transparent;font:400 15px/20px var(--font);color:var(--ink);outline:none;min-width:0}
.chat input::placeholder{color:#8A8A8A}
.chat .rb.sm{background:var(--ink);color:var(--white);border-color:transparent;cursor:pointer}
/* gli output come card lead: da approvare = lime, in corso = grigia, fatto e approvato = scura, da fare = spenta */
.lead.out .name.md{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:26px;max-height:52px;font-size:22px}
.lead.out .role{white-space:normal;line-height:17px;height:34px;overflow:hidden}
.lead.out{display:flex;flex-direction:column;height:224px}
.lead.out .ft{margin-top:auto}
.lead.out .ft>div{min-width:0}
.lead.out .ft .v{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.costo{display:grid;grid-template-columns:517px minmax(0,1fr);gap:16px;margin-top:24px;align-items:start}
.task.spesa .body{padding-top:16px}
.task.spesa .tt small{font-size:14px}
.task.spesa .ripart{margin-top:14px}
/* ===== pagina Costi (versione 13, 2026-09-06): righe della spesa per dipendente con il budget a barra, ripartizione per blocchi di tempo, legenda a capo nelle card strette ===== */
.crow.sp{grid-template-columns:40px minmax(0,1fr) minmax(0,210px) 190px 130px 32px}
.crow.sp .av{width:40px;height:40px}
.crow.sp .v.mezzo{overflow:hidden;text-overflow:ellipsis}
.crow.sp .bud{display:grid;gap:6px;align-content:center}
.crow.sp .bud small{margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.crow.sp .bud .prog{margin:0;height:8px}
.crow.sp .bud .prog.oltre i{background:var(--badge-red)}
.crow.sp .eur .badge{margin-right:10px;vertical-align:3px}
.task.spesa.dpt .who{padding-right:72px}
`;

  const nomePeriodo = { oggi: 'Oggi', ieri: 'Ieri', settimana: 'Ultimi 7 giorni', mese: 'Ultimi 30 giorni', prima: 'Prima' };
  /* in attesa: le più vecchie prima */
  const inAttesa = m => m.richiesteDi('attesa').slice().sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min));

  const livelloOggi = e => ({ lavoro: e.att.da <= '09:00' ? 5 : 4, attesa: 3, errore: 1, pianificato: 0, libero: 0 })[e.stato];

  /* ---------- pezzi della home ---------- */
  function cardAttivita(m, e, i) {
    const pend = m.richiesteDi('attesa').some(a => a.chi === e.id);
    const tono = pend ? 'lime' : (i % 2 ? 'dark' : 'gray');
    const d = m.dipDi(e);
    return `<div class="ncard task ${tono}">
      <div class="who">${av(m, e, '', null, 'data-anima="1"')}<div><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${pend ? '<i class="dot"></i>' : ''}</span><span class="rb ghost" data-az="pagina" data-pagina="esecuzione" data-id="${e.id}" title="Apri l'esecuzione">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaDip[e.dip])}</span><div><div class="tt">${esc(e.att.titolo)}</div><div class="meta"><b>${esc(e.att.cliente)}</b><span>da</span><b>${esc(e.att.da)}</b></div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel"><span class="chip lime">${ic('i-play')}In corso</span><span>Passo ${e.att.passo[0]} di ${e.att.passo[1]}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black" data-az="pagina" data-pagina="esecuzione" data-id="${e.id}" title="Passi, log e output">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  function cardEsecuzione(m, e, i) {
    if (e.stato === 'lavoro') return cardAttivita(m, e, i);
    const a = e.att;
    const err = e.stato === 'errore';
    const tono = err ? 'gray' : 'dark';
    const meta = err ? `<b>${esc(a.cliente)}</b><span>fallito alle</span><b>${esc(a.da)}</b>` : `<b>${esc(a.cliente)}</b><span>parte alle</span><b>${esc(a.quando)}</b>`;
    const sel = err ? `<span class="chip rosa">${ic('i-warn')}Errore</span><span>${esc(a.errore)}</span>` : `<span class="chip">${ic('i-clock')}${esc(a.quando)}</span><span>In coda</span>`;
    return `<div class="ncard task ${tono}">
      <div class="who">${av(m, e)}<div><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${err ? '<i class="dot"></i>' : ''}</span><span class="rb ghost" data-az="pagina" data-pagina="esecuzione" data-id="${e.id}" title="Apri l'esecuzione">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(err ? 'i-warn' : iconaDip[e.dip])}</span><div><div class="tt">${esc(a.titolo)}</div><div class="meta">${meta}</div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${sel}${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black" data-az="${err ? 'esec-riprova' : 'esec-avvia'}" data-id="${e.id}" title="${err ? 'Riprova' : 'Avvia ora'}">${ic('i-play')}</span></div></div>
    </div>`;
  }
  function cardObiettivo(m, o, i) {
    const tono = o.stato === 'ritardo' ? 'lime' : (i % 2 ? 'dark' : 'gray');
    const st = { corso: 'In corso', ritardo: 'In ritardo', concluso: 'Concluso', nuovo: 'Da iniziare' }[o.stato];
    return `<div class="ncard task ${tono} obj">
      <div class="who"><span class="ico">${ic('i-target')}</span><div><b>${esc(o.cliente)}</b><span>scadenza ${esc(o.scadenza)} · ${o.chi.length} dipendent${o.chi.length === 1 ? 'e' : 'i'}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${o.stato === 'ritardo' ? '<i class="dot"></i>' : ''}</span><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><div><div class="tt">${esc(o.titolo)}</div><div class="meta"><b>${o.avanz}%</b><span>·</span><b>${o.consegne[0]} di ${o.consegne[1]}</b><span>consegne</span></div><div class="prog"><i style="width:${o.avanz}%"></i></div><div class="next">Prossima: ${esc(o.prossima)}</div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${pair(m, o.chi, 'xs', 2)}<span>${st}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  function cardDipartimento(m, d) {
    const lst = m.perDip[d.id];
    const lav = lst.filter(e => e.stato === 'lavoro').length;
    const occ = lst.filter(e => e.stato === 'lavoro' || e.stato === 'attesa').length;
    const lv = lst.length ? Math.min(5, Math.round(5 * occ / lst.length)) : 0;
    const err = lst.filter(e => e.stato === 'errore').length;
    return `<div class="ncard lead" data-az="pagina" data-pagina="dipartimento" data-dip="${d.id}">
      <span class="ico">${ic(iconaDip[d.id])}</span>
      <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="name">${esc(d.nome)}</div>
      <div class="role">${lst.length} dipendenti · ${lav} al lavoro${err ? ' · ' + err + ' errore' : ''}</div>
      <div class="ft"><div><span class="k">Dipendenti</span>${pair(m, lst.map(e => e.id), 'xs', 4)}</div><div><span class="k">Carico</span>${dots(lv)}</div></div>
    </div>`;
  }
  /* Card dipendente nelle due forme: senza nome (ruolo grande su due righe, sotto il dipartimento) e con nome (nome grande, sotto «ruolo · dipartimento»). `anteprima` = dentro l'editor, senza azioni. */
  function cardDipendente(m, e, anteprima) {
    return `<div class="ncard lead dip">
      ${av(m, e, '', anteprima ? (e.stato === 'libero' ? 'pianificato' : e.stato) : null, anteprima ? 'data-segue="1"' : '')}
      <div class="nt"><span class="rb ghost" ${anteprima ? '' : `data-az="modifica" data-id="${e.id}"`} title="Modifica">${ic('i-pen')}</span><span class="rb ghost" ${anteprima ? '' : `data-az="pagina" data-pagina="dipendente" data-id="${e.id}"`} title="Apri">${ic('i-ne')}</span></div>
      <div class="name${e.nome ? '' : ' ruolo'}">${esc(m.etichetta(e))}</div>
      <div class="role">${esc(m.sotto(e, true))}</div>
      <div class="ft"><div><span class="k">Stato</span>${chipStato(m, e)}</div><div><span class="k">Oggi</span>${dots(livelloOggi(e))}</div></div>
    </div>`;
  }
  const cardAggiungi = (m, dip) => `<div class="ncard lead add" data-az="nuovo" data-dip="${dip || ''}"><span class="rb ghost">${ic('i-plus')}</span>Aggiungi un dipendente${dip ? `<br>a ${esc(m.dipartimenti.find(d => d.id === dip).nome)}` : ''}</div>`;
  function rigaDipendente(m, e) {
    return `<div class="erow${e.stato === 'lavoro' ? ' lav' : ''}">${av(m, e)}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e, true))}</span></div>${e.stato === 'lavoro' ? `<span class="chip onlime"><span>${esc(e.att.titolo)}</span></span>` : chipStato(m, e)}<span class="rb xs" data-az="modifica" data-id="${e.id}" title="Modifica">${ic('i-pen')}</span><span class="rb xs" data-az="pagina" data-pagina="dipendente" data-id="${e.id}" title="Apri">${ic('i-ne')}</span></div>`;
  }
  function barraAgenda(m) {
    const fatti = m.agenda.filter(a => a.stato === 'fatto').slice(-1);
    const live = m.agenda.filter(a => a.stato === 'in corso');
    const piani = m.agenda.filter(a => a.stato === 'pianificato').slice(0, 2);
    const ev = [...fatti, ...live, ...piani].map(a => {
      if (a.stato === 'in corso') return `<div class="live"><span class="now"><b>${esc(m.azienda.ora)}</b><i></i></span><span class="lbl">${a.chi.length} al lavoro</span>${pair(m, a.chi, 'xs', 3)}<span class="rb">${ic('i-play')}</span></div>`;
      if (a.stato === 'fatto') return `<span class="ev">${pair(m, a.chi, 's', m.n > 16 ? 1 : 2)}${esc(a.durata)}${m.n > 16 ? '' : `<span class="rb xs">${ic('i-ne')}</span>`}</span>`;
      return `<span class="sep"></span><span class="tm">${esc(a.ora)}</span><span class="ev plan" style="padding-right:12px">${pair(m, a.chi, 's', m.n > 16 ? 1 : 2)}</span>`;
    }).join('');
    return `<div class="a-sched"><span class="t">Oggi in azienda</span><span class="cal"><i>${ic('i-cal')}</i>${esc(m.azienda.data)}</span><div class="tl">${ev}</div><span class="rb go">${ic('i-ne')}</span></div>`;
  }

  /* ---------- tendina del titolare ---------- */
  function riepilogo(m) {
    const oggi = m.richieste.filter(r => r.giorno === 0 && r.stato === 'approvata').length;
    const ultime = m.diario.slice(-3).reverse();
    return `<div class="dcard"><div class="nt"><span class="rb sm">${ic('i-down')}</span></div><h5>Consegne:</h5>
        <div class="thumbs">
          <div class="thumb"><div class="pg"><i class="h"></i><i class="w1"></i><i class="w2"></i><i class="b"></i><i class="w3"></i><i class="w1"></i><i class="w4"></i><i class="b"></i><i class="w2"></i></div><span class="lb">Post 4 di 12</span></div>
          <div class="thumb"><div class="pg"><i class="h"></i><i class="b"></i><i class="w1"></i><i class="w3"></i><i class="w2"></i><i class="b"></i><i class="w1"></i><i class="w4"></i></div><span class="lb">Piano ottobre</span></div>
        </div>
        <div class="kv"><span>Approvate oggi</span><b>${oggi}</b></div>
        <div class="kv"><span>Spesa di oggi</span><b>${m.costoOggi} €</b></div>
      </div>
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-pen')}</span></div><h5>Obiettivo del mese:</h5><p class="goal">${m.azienda.obiettivoMese}</p></div>
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-ne')}</span></div><h5>Ultime voci del diario:</h5><div style="margin-top:10px">${ultime.map(x => `<div class="drow"><span>${esc(x.ora)}</span><div><b>${esc(m.etichetta(m.byId[x.chi]))}</b> ${esc(x.testo)}</div></div>`).join('')}</div></div>`;
  }
  const pager = (m, idx, n) => `<span class="pager"><span class="rb olight" data-az="prec">${ic('i-left')}</span>${idx + 1} di ${n}<span class="rb olight" data-az="succ">${ic('i-right')}</span></span>`;
  function tendinaChiusa(m, opz) {
    const n = m.richiesteDi('attesa').length;
    return `<div class="a-mini" data-az="apri" data-pannello="richieste" role="button" aria-label="Apri le richieste da approvare">${ic('i-left', 'ch')}<span class="rb">${ic('i-bell')}</span><b>${n}</b><span>da approvare</span></div>`
      + `<div class="a-mini rie" data-az="apri" data-pannello="riepilogo" role="button" aria-label="Apri il riepilogo">${ic('i-left', 'ch')}<span class="rb">${ic('i-wand')}</span><span>Riepilogo</span></div>`;
  }
  function cardRichiestaCorrente(m, r, idx, n) {
    const chi = m.byId[r.chi];
    return `<div class="appr">
      <div class="top"><span class="chip">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]} · ${esc(r.ora)}</span><span class="r"><span class="rb glass" data-az="prec">${ic('i-left')}</span><span class="rb glass" data-az="succ">${ic('i-right')}</span></span></div>
      ${av(m, chi, 'lg face', 'attesa')}
      <div class="cap"><b>${esc(r.cosa)}</b>${esc(m.etichetta(chi))} · ${esc(r.cliente)} · ${idx + 1} di ${n}</div>
      <div class="ctl"><span class="rb glass" data-az="espandi" title="Apri">${ic('i-eye')}</span><span class="rb glass" title="Commenta">${ic('i-chat')}</span><span class="rb lime" data-az="approva" data-id="${r.id}" title="Approva">${ic('i-check')}</span><span class="rb red" data-az="rifiuta" data-id="${r.id}" title="Rifiuta">${ic('i-x')}</span></div>
    </div>`;
  }
  function tendinaAperta(m, opz) {
    const att = inAttesa(m);
    const idx = Math.min(opz.richiesta || 0, Math.max(0, att.length - 1));
    const r = att[idx];
    if (opz.pannello === 'riepilogo') {
      return `<div class="a-tend aperta" role="dialog" aria-label="Riepilogo di oggi">
        <div class="th"><span class="rb black">${ic('i-wand')}</span><h4>Riepilogo di oggi</h4><span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
        <div class="tb">${riepilogo(m)}<div class="qrow on" data-az="pannello" data-pannello="richieste"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-bell')}</span><div class="tx"><b>Da approvare</b><span>${att.length} richieste in attesa</span></div><span class="rb xs">${ic('i-chevr')}</span></div></div>
      </div>`;
    }
    const coda = att.length > 1 ? `<div class="sub"><h5>In coda</h5><span class="chip light">${att.length}</span></div>` + att.map((x, i) => { const c = m.byId[x.chi]; return `<div class="qrow${i === idx ? ' on' : ''}" data-az="vai" data-idx="${i}">${av(m, c, 'xs')}<div class="tx"><b>${esc(x.cosa)}</b><span>${esc(m.etichetta(c))} · ${esc(x.cliente)} · ${esc(x.ora)}</span></div><span class="rb xs">${ic('i-chevr')}</span></div>`; }).join('') : '';
    return `<div class="a-tend aperta" role="dialog" aria-label="Da approvare">
      <div class="th"><h4>Da approvare</h4><span class="chip lime">${att.length}</span><span class="rb olight sm" data-az="espandi" title="Apri la richiesta">${ic('i-expand')}</span><span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
      <div class="tb">
        ${r ? cardRichiestaCorrente(m, r, idx, att.length) : `<div class="vuoto" style="margin:0;border-color:rgb(0 0 0/.16)">Niente da approvare</div>`}
        ${coda}
        <div class="qrow" data-az="pannello" data-pannello="riepilogo" style="margin-top:6px"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic('i-wand')}</span><div class="tx"><b>Riepilogo di oggi</b><span>consegne, spesa, obiettivo, diario</span></div><span class="rb xs">${ic('i-chevr')}</span></div>
      </div>
    </div>`;
  }
  function tendinaEstesa(m, opz) {
    const att = inAttesa(m);
    if (!att.length) return tendinaAperta(m, opz);
    const idx = Math.min(opz.richiesta || 0, att.length - 1);
    const r = att[idx];
    const chi = m.byId[r.chi];
    if (r.tipo === 'revisione') { const rv = m.revisioneDi(r); if (rv) return tendinaVersioni(m, Object.assign({}, opz, { confronto: { id: r.chi, a: rv.da, b: rv.a, rev: rv, richiesta: r } })); }
    const doc = r.tipo === 'post'
      ? `<div class="lb"><span class="chip light">${ic('i-mega')}LinkedIn · bozza</span>${esc(r.cliente)}</div><div class="tx">${esc(r.testo)}</div><div class="img">${ic('i-doc')}${esc(r.allegato)}</div>`
      : `<div class="lb"><span class="chip light">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span>${esc(r.cliente)} · ${esc(r.allegato)}</div><div class="tx mono">${esc(r.testo)}</div>`;
    return `<div class="a-tend estesa" role="dialog" aria-label="Richiesta">
      <div class="th"><span class="rb olight sm" data-az="riduci" title="Riduci">${ic('i-left')}</span><span class="rb black">${ic(iconaTipo[r.tipo])}</span><h4>${esc(r.cosa)}</h4>${pager(m, idx, att.length)}<span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
      <div class="tb"><div class="rx">
        <div class="doc">${doc}</div>
        <div class="det">
          <div class="dcard"><h5>Chi la propone</h5><div class="who">${av(m, chi)}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
            <div class="kv"><span>Consegnata alle</span><b>${esc(r.ora)}</b></div><div class="kv"><span>Costo della consegna</span><b>${r.costo} €</b></div>
            <div class="passi">${r.passi.map(p => `<span class="chip light">${ic('i-check')}${esc(p)}</span>`).join('')}</div></div>
          <div class="dcard"><h5>Nota del dipendente</h5><p class="nota">${esc(r.nota)}</p></div>
        </div>
        <div class="azioni"><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Approva</span><span class="pill olight" data-az="modifiche" data-id="${r.id}">${ic('i-pen')}Chiedi modifiche</span><span class="pill olight">${ic('i-chat')}Commenta</span><span class="pill red" data-az="rifiuta" data-id="${r.id}">${ic('i-x')}Rifiuta</span><span class="link" data-az="pagina" data-pagina="richieste">Tutte le richieste ${ic('i-ne')}</span></div>
      </div></div>
    </div>`;
  }
  /* ---------- tendina Dipendente: creazione e modifica ---------- */
  /* opz.modifica = { id?: dipendente esistente, bozza: { nome, ruolo, dip, seme|null, tinta|null } }.
     Il dipendente «di prova» dell'anteprima: la bozza sopra il dipendente vero (o uno nuovo, libero). */
  function dipendenteBozza(m, mod) {
    const base = mod.id ? m.byId[mod.id] : { id: 0, stato: 'libero', att: { titolo: 'Nessuna esecuzione', costo: 0 } };
    const b = mod.bozza;
    const e = Object.assign({}, base, { ruolo: (b.ruolo || '').trim() || (mod.id ? base.ruolo : 'Nuovo dipendente'), dip: b.dip || base.dip || m.dipartimenti[0].id });
    if ((b.nome || '').trim()) e.nome = b.nome.trim(); else delete e.nome;
    if (b.seme) e.seme = b.seme; else delete e.seme;
    e.tinta = b.tinta || (mod.id ? m.tintaDi(base) : (b.tintaProposta || (b.tintaProposta = m.tintaLibera())));
    return e;
  }
  /* le otto tinte dell'avatar come cerchi pieni nella palette in uso; quella del dipendente ha l'anello nero */
  function scelteTinta(m, mod) {
    const e = dipendenteBozza(m, mod), O = window.DGT_AVATAR_ORBE, pal = O ? O.aspetto().palette : 'vivace';
    const tinte = O ? O.TINTE : m.TINTE_ID.map(id => ({ id, nome: id, [pal]: '#4D4D4D' }));
    return `<div class="tinte">${tinte.map(t => `<span class="dot${t.id === e.tinta ? ' on' : ''}" style="background:${t[pal] || t.c}" data-az="bozza" data-k="tinta" data-v="${t.id}" title="${esc(t.nome)}"></span>`).join('')}</div>`;
  }
  const anteprimaDipendente = (m, mod) => `<div class="anteprima">${cardDipendente(m, dipendenteBozza(m, mod), true)}</div>`;
  function scelteAvatar(m, mod) {
    const e = dipendenteBozza(m, mod);
    const semi = window.DGT_AVATAR.semi(e.ruolo, 6);
    const scelto = e.seme || e.ruolo;
    return `<div class="scelte">${semi.map(sm => `<span class="av s${sm === scelto ? ' on' : ''}" data-az="bozza" data-k="seme" data-v="${esc(sm)}" title="${sm === e.ruolo ? 'Avatar del ruolo' : 'Variante'}">${window.DGT_AVATAR.html(sm, 'pianificato')}</span>`).join('')}</div>`;
  }
  function tendinaDipendente(m, opz) {
    const mod = opz.modifica;
    const b = mod.bozza;
    const nuovo = !mod.id;
    const dipSel = b.dip || (mod.id ? m.byId[mod.id].dip : m.dipartimenti[0].id);
    return `<div class="a-tend aperta dip" role="dialog" aria-label="${nuovo ? 'Nuovo dipendente' : 'Modifica dipendente'}">
      <div class="th"><span class="rb black">${ic(nuovo ? 'i-plus' : 'i-pen')}</span><h4>${nuovo ? 'Nuovo dipendente' : 'Modifica dipendente'}</h4><span class="rb olight sm" data-az="annulla" title="Chiudi senza salvare">${ic('i-right')}</span></div>
      <div class="tb">
        <div id="a-anteprima">${anteprimaDipendente(m, mod)}</div>
        <div class="campo"><span class="k">Ruolo</span><input type="text" data-campo="ruolo" value="${esc(b.ruolo || '')}" placeholder="Es. Sviluppatore full-stack" maxlength="40" ${nuovo ? 'autofocus' : ''}></div>
        <div class="campo"><span class="k">Nome <i>facoltativo: senza nome si vede il ruolo</i></span><input type="text" data-campo="nome" value="${esc(b.nome || '')}" placeholder="Nessun nome" maxlength="24"></div>
        <div class="campo"><span class="k">Dipartimento</span><div class="pills">${m.dipartimenti.map(d => `<span class="pill${d.id === dipSel ? ' on' : ''}" data-az="bozza" data-k="dip" data-v="${d.id}">${ic(iconaDip[d.id])}${esc(d.nome)}</span>`).join('')}</div></div>
        <div class="campo"><span class="k">Avatar <i>dal ruolo, o una variante</i></span><div id="a-scelte">${scelteAvatar(m, mod)}</div></div>
        <div class="campo"><span class="k">Colore <i>${nuovo ? 'proposto da DGT: il meno usato in azienda' : 'della perla'}</i></span><div id="a-tinte">${scelteTinta(m, mod)}</div></div>
        <div class="azioni"><span class="pill lime" data-az="salva">${ic('i-check')}${nuovo ? 'Crea dipendente' : 'Salva'}</span><span class="pill olight" data-az="annulla">Annulla</span></div>
      </div>
    </div>`;
  }
  function tendina(m, opz) {
    if (opz.tendina === 'dipendente' && opz.modifica) return tendinaDipendente(m, opz);
    if (opz.tendina === 'confronto' && opz.confronto) return tendinaVersioni(m, opz);
    if (opz.tendina === 'chiusa') return tendinaChiusa(m, opz);
    if (opz.tendina === 'estesa') return tendinaEstesa(m, opz);
    return tendinaAperta(m, opz);
  }

  /* ---------- cornice comune ---------- */
  function cornice(m, opz, titolo, stats, railAttivo, corpo, nuovo) {
    /* dal dipendente si torna al suo dipartimento, dall'esecuzione al dipendente; dalle altre pagine alla home */
    const e = (opz.pagina === 'dipendente' || opz.pagina === 'esecuzione') ? m.byId[opz.id] : null;
    const indietro = e && opz.pagina === 'esecuzione' ? `data-az="pagina" data-pagina="dipendente" data-id="${e.id}"` : e ? `data-az="pagina" data-pagina="dipartimento" data-dip="${e.dip}"` : opz.pagina !== 'home' ? 'data-az="pagina" data-pagina="home"' : '';
    const lungo = e ? (titolo.length > 20 ? ' lunghissimo' : titolo.length > 12 ? ' lungo' : '') : '';
    return `<div class="a-app" role="figure" aria-label="Direzione A — ${esc(titolo)} (contenuto sintetico)">
      <span class="a-logo">DGT</span>
      ${barraAgenda(m)}
      <div class="a-tr"><span class="rb">${ic('i-bell')}<i class="dot"></i></span><span class="av persona">${esc(m.azienda.titolare.iniziali)}</span></div>
      <span class="rb a-back" ${indietro}>${ic('i-left')}</span>
      <div class="a-head">
        <h3 class="a-title${lungo}">${esc(titolo)}</h3>
        ${nuovo ? `<span class="a-new"><i>${ic('i-plus')}</i>${nuovo}</span>` : ''}
        <div class="a-stats">${stats}</div>
        ${opz.pagina === 'dipartimento' ? `<span class="rb ghost impost" title="Impostazioni del dipartimento">${ic('i-sliders')}</span>` : ''}
      </div>
      <div class="a-rail">
        <span class="rb ${railAttivo === 'home' ? 'white' : ''}" data-az="pagina" data-pagina="home">${ic('i-list')}</span>
        <span class="rb ${railAttivo === 'org' ? 'white' : ''}" data-az="pagina" data-pagina="dipartimento">${ic('i-org')}</span>
        <span class="rb ${railAttivo === 'richieste' ? 'white' : ''}" data-az="pagina" data-pagina="richieste">${ic('i-bell')}</span>
        <span class="rb">${ic('i-chat')}</span>
        <span class="rb">${ic('i-cal')}</span>
        <span class="rb ${railAttivo === 'costi' ? 'white' : ''}" data-az="pagina" data-pagina="costi" title="I costi dell'azienda">${ic('i-euro')}</span>
      </div>
      <div class="a-main">${corpo}</div>
      <div id="a-tendina">${tendina(m, opz)}</div>
    </div>`;
  }

  function home(m, opz) {
    const lav = m.alLavoro.slice().sort((a, b) => (m.richiesteDi('attesa').some(x => x.chi === b.id) ? 1 : 0) - (m.richiesteDi('attesa').some(x => x.chi === a.id) ? 1 : 0));
    const compatto = m.n > 16;
    const att = m.richiesteDi('attesa').length;
    const stats = `<div class="stat"><b>${lav.length}</b><span>al lavoro</span><span class="badge up">${ic('i-up')}1</span></div>
      <div class="stat"><b>${att}</b><span>da approvare</span><span class="badge down">${ic('i-bell')}${Math.min(2, att)}</span></div>
      <div class="stat" data-az="pagina" data-pagina="costi" title="I costi dell'azienda"><b>${m.costoOggi} €</b><span>spesi oggi</span><span class="badge down">${ic('i-dn')}12%</span></div>`;
    const corpo = `
      <section>
        <div class="shead"><h3>Al lavoro adesso</h3><span class="cnt"><b>${lav.length}</b><span>Esecuzioni</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">${ic('i-fire')}Da approvare</span><span class="pill">In corso</span><span class="pill">Pianificate</span><span class="pill">Errori</span></div></div>
        <div class="cards riga">${lav.map((e, i) => cardAttivita(m, e, i)).join('')}</div>
      </section>
      <section>
        <div class="shead"><h3>Dipartimenti</h3><span class="cnt"><b>${m.dipartimenti.length}</b><span>Dipartimenti</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">Al lavoro</span><span class="pill">Con approvazioni</span><span class="pill">Con errori</span></div></div>
        <div class="cards">${m.dipartimenti.map(d => cardDipartimento(m, d)).join('')}</div>
      </section>
      <section>
        <div class="shead"><h3>Dipendenti</h3><span class="cnt"><b>${m.n}</b><span>Dipendenti</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span><span class="rb sm ${compatto ? 'ghost' : 'white'}">${ic('i-grid')}</span><span class="rb sm ${compatto ? 'white' : 'ghost'}">${ic('i-rows')}</span>
          <div class="filters"><span class="pill on">Tutti</span>${m.dipartimenti.map(d => `<span class="pill">${esc(d.nome)}</span>`).join('')}</div></div>
        ${compatto ? `<div class="elenco">${m.dipendenti.map(e => rigaDipendente(m, e)).join('')}<div class="erow add" data-az="nuovo"><span class="rb xs">${ic('i-plus')}</span>Aggiungi un dipendente</div></div>` : `<div class="cards dipendenti">${m.dipendenti.map(e => cardDipendente(m, e)).join('')}${cardAggiungi(m)}</div>`}
      </section>`;
    return cornice(m, opz, m.azienda.titolo, stats, 'home', corpo, 'Nuovo obiettivo');
  }

  /* ---------- pagina Richieste ---------- */
  function cardRichiesta(m, r, i) {
    const chi = m.byId[r.chi];
    const idx = inAttesa(m).indexOf(r);
    return `<div class="ncard task lime" data-az="richiesta" data-idx="${idx}">
      <div class="who">${av(m, chi)}<div><b>${esc(m.etichetta(chi))}</b><span>${esc(m.sotto(chi))}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaTipo[r.tipo])}</span><div><div class="tt">${esc(r.cosa)}</div><div class="meta"><b>${esc(r.cliente)}</b><span>·</span><b>${esc(r.ora)}</b></div></div></div>
      <div class="st"><span class="k">Decidi</span><div class="row"><span class="sel"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic(iconaTipo[r.tipo])}</span><span>${r.costo} € · ${r.passi.length} passi · ${esc(r.ora)}</span>${ic('i-chev')}</span><span class="rb black" data-az="approva" data-id="${r.id}" title="Approva">${ic('i-check')}</span><span class="rb red" data-az="rifiuta" data-id="${r.id}" title="Rifiuta">${ic('i-x')}</span></div></div>
    </div>`;
  }
  function rigaStorico(m, r) {
    const chi = m.byId[r.chi];
    const decisa = r.stato === 'attesa' ? `in attesa da ${esc(r.ora)}` : r.regola ? `regola · <b>${esc(r.regola)}</b>` : `<b>${esc(m.azienda.titolare.iniziali)}</b> · ${esc(r.decisa)}${r.commento ? ' · «' + esc(r.commento) + '»' : ''}`;
    const idx = r.stato === 'attesa' ? inAttesa(m).indexOf(r) : -1;
    return `<div class="hrow ${r.stato}" ${idx >= 0 ? `data-az="richiesta" data-idx="${idx}"` : ''}><span class="ora">${esc(r.ora)}</span>${av(m, chi)}<div class="tx"><b>${esc(r.cosa)}</b><span>${esc(m.etichetta(chi))} · ${esc(r.cliente)}</span></div><span class="chip light">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span>${chipEsito(r)}<span class="chi">${decisa}</span><span class="eur">${r.costo} €</span><span class="rb xs">${ic('i-ne')}</span></div>`;
  }
  function barraFiltri(m, f, tot, filtrate) {
    const p = (k, v, testo, extra) => `<span class="pill sm${(f[k] || 'tutti') === String(v) ? ' on' : ''}" data-az="filtro" data-k="${k}" data-v="${esc(String(v))}">${extra || ''}${testo}</span>`;
    const conRichieste = m.dipendenti.filter(e => m.richieste.some(r => r.chi === e.id));
    const attivi = Object.keys(f).filter(k => f[k] && f[k] !== 'tutti').length;
    return `<div class="fbar">
      <div class="frow"><span class="k">Stato</span><div class="pills due">${p('stato', 'tutti', 'Tutte')}${p('stato', 'attesa', 'Da approvare')}${p('stato', 'approvata', 'Approvate')}${p('stato', 'modifiche', 'Con modifiche')}${p('stato', 'rifiutata', 'Rifiutate')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Tipo</span><div class="pills due">${p('tipo', 'tutti', 'Tutti')}${p('tipo', 'post', 'Post')}${p('tipo', 'documento', 'Documenti')}${p('tipo', 'lista', 'Liste')}${p('tipo', 'proposta', 'Proposte')}${p('tipo', 'revisione', 'Revisioni')}</div></div>
      <div class="frow"><span class="k">Periodo</span><div class="pills due">${p('periodo', 'tutti', 'Tutto')}${p('periodo', 'oggi', 'Oggi')}${p('periodo', 'ieri', 'Ieri')}${p('periodo', 'settimana', '7 giorni')}${p('periodo', 'mese', '30 giorni')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Cliente</span><div class="pills">${p('cliente', 'tutti', 'Tutti')}${m.clienti.map(c => p('cliente', c, esc(c))).join('')}</div></div>
      <div class="frow"><span class="k">Dipartim.</span><div class="pills due">${p('dip', 'tutti', 'Tutti')}${m.dipartimenti.map(d => p('dip', d.id, esc(d.nome))).join('')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Dipendente</span><div class="pills">${p('chi', 'tutti', 'Tutti')}${conRichieste.filter(e => !f.dip || f.dip === 'tutti' || e.dip === f.dip).map(e => p('chi', e.id, esc(m.etichetta(e)), av(m, e, 'xs'))).join('')}</div></div>
      <div class="fsum"><span><b>${filtrate}</b> di ${tot} richieste</span>${attivi ? `<span>· ${attivi} filtr${attivi === 1 ? 'o attivo' : 'i attivi'}</span><span class="pill" data-az="azzera">${ic('i-x')}Azzera</span>` : `<span>· nessun filtro</span>`}</div>
    </div>`;
  }
  function richieste(m, opz) {
    const f = opz.filtri || {};
    const tutte = m.richiesteFiltrate(f);
    const att = tutte.filter(r => r.stato === 'attesa').sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min));
    if (opz.ordine === 'recenti') att.reverse();
    const storico = tutte.filter(r => r.stato !== 'attesa').sort((a, b) => (a.giorno - b.giorno) || (b.min - a.min));
    const oggiOk = m.richieste.filter(r => r.giorno === 0 && r.stato === 'approvata').length;
    const daRifare = m.richieste.filter(r => r.giorno <= 7 && (r.stato === 'modifiche' || r.stato === 'rifiutata')).length;
    const stats = `<div class="stat"><b>${m.richiesteDi('attesa').length}</b><span>da approvare</span><span class="badge down">${ic('i-bell')}${Math.min(2, m.richiesteDi('attesa').length)}</span></div>
      <div class="stat"><b>${oggiOk}</b><span>approvate oggi</span><span class="badge up">${ic('i-up')}${oggiOk}</span></div>
      <div class="stat"><b>${daRifare}</b><span>da rifare</span><span class="badge down">${ic('i-dn')}${daRifare}</span></div>
      <div class="stat"><b>${m.richieste.length}</b><span>in tutto</span></div>`;
    const gruppi = ['oggi', 'ieri', 'settimana', 'mese', 'prima'].map(per => ({ per, lst: storico.filter(r => m.periodoDi(r) === per) })).filter(g => g.lst.length);
    const corpo = `
      <section>${barraFiltri(m, f, m.richieste.length, tutte.length)}</section>
      <section>
        <div class="shead"><h3>Da approvare</h3><span class="cnt"><b>${att.length}</b><span>Richieste</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill${opz.ordine === 'recenti' ? '' : ' on'}" data-az="ordina" data-v="vecchie">Più vecchie prima</span><span class="pill${opz.ordine === 'recenti' ? ' on' : ''}" data-az="ordina" data-v="recenti">Più recenti prima</span></div>
          <div class="destra">${att.length ? `<span class="pill lime" data-az="approva-tutte">${ic('i-check')}Approva tutte (${att.length})</span>` : ''}</div></div>
        ${att.length ? `<div class="cards">${att.map((r, i) => cardRichiesta(m, r, i)).join('')}</div>` : `<div class="vuoto">Niente da approvare con questi filtri</div>`}
      </section>
      <section>
        <div class="shead"><h3>Storico</h3><span class="cnt"><b>${storico.length}</b><span>Decise</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span><span class="rb sm ghost">${ic('i-down')}</span>
          <div class="filters"><span class="pill on">Per giorno</span><span class="pill">Per dipendente</span><span class="pill">Per cliente</span></div></div>
        ${gruppi.length ? gruppi.map(g => `<div class="hgroup"><b>${nomePeriodo[g.per]}</b>${g.lst.length} richieste · ${g.lst.reduce((t, r) => t + r.costo, 0)} €</div><div class="hlist">${g.lst.map(r => rigaStorico(m, r)).join('')}</div>`).join('') : `<div class="vuoto">Nessuna richiesta decisa con questi filtri</div>`}
      </section>
      <section class="regole">
        <div class="shead"><h3>Regole di approvazione</h3><span class="cnt"><b>${m.regole.length}</b><span>Regole</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">Attive</span><span class="pill">Spente</span></div></div>
        <div class="cards">${m.regole.map(g => `<div class="ncard lead${g.attiva ? '' : ' spenta'}"><span class="ico">${ic(g.icona)}</span><div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div><div class="name md">${esc(g.nome)}</div><div class="role">${esc(g.desc)}</div><div class="ft"><div><span class="k">Modo</span><span class="sel">${esc(g.modo)}${ic('i-chev')}</span></div><div><span class="k">Stato</span>${g.attiva ? `<span class="chip lime">${ic('i-check')}Attiva</span>` : `<span class="chip">Spenta</span>`}</div></div></div>`).join('')}</div>
      </section>`;
    return cornice(m, opz, 'RICHIESTE', stats, 'richieste', corpo, 'Nuova regola');
  }

  /* ---------- pagina Dipartimento ---------- */
  function dipartimento(m, opz) {
    const d = m.dipartimenti.find(x => x.id === opz.dip) || m.dipartimenti[0];
    const lst = m.perDip[d.id];
    const ids = lst.map(e => e.id);
    const ordine = { lavoro: 0, errore: 1, pianificato: 2 };
    const esec = lst.filter(e => e.stato in ordine).sort((a, b) => ordine[a.stato] - ordine[b.stato]);
    const att = inAttesa(m).filter(r => ids.includes(r.chi));
    const ob = m.obiettiviDi(d.id);
    const costoOggi = lst.reduce((t, e) => t + (e.att.costo || 0), 0);
    const lav = lst.filter(e => e.stato === 'lavoro').length;
    const stats = `<div class="stat"><b>${lav}</b><span>al lavoro</span><span class="badge up">${ic('i-up')}${lav}</span></div>
      <div class="stat"><b>${att.length}</b><span>da approvare</span>${att.length ? `<span class="badge down">${ic('i-bell')}${att.length}</span>` : ''}</div>
      <div class="stat" data-az="pagina" data-pagina="costi" title="I costi dell'azienda"><b>${costoOggi} €</b><span>spesi oggi</span></div>`;
    // spesa del mese per cliente: l'aggregatore dei costi (m.costi in dati.js, versione 13), lo stesso della pagina Costi
    const cm = m.costi('mese', d.id);
    const corpo = `
      <section>
        <div class="shead"><h3>Oggi in ${esc(d.nome)}</h3><span class="cnt"><b>${esec.length}</b><span>Esecuzioni</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">In corso</span><span class="pill">Pianificate</span><span class="pill">Errori</span><span class="pill">Concluse oggi</span></div></div>
        ${esec.length ? `<div class="cards riga">${esec.map((e, i) => cardEsecuzione(m, e, i)).join('')}</div>` : `<div class="vuoto">Nessuna esecuzione oggi in ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Dipendenti</h3><span class="cnt"><b>${lst.length}</b><span>Dipendenti</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">Al lavoro</span><span class="pill">Liberi</span><span class="pill">Con errori</span></div></div>
        <div class="cards dipendenti">${lst.map(e => cardDipendente(m, e)).join('')}${cardAggiungi(m, d.id)}</div>
      </section>
      <section>
        <div class="shead"><h3>Obiettivi</h3><span class="cnt"><b>${ob.length}</b><span>Obiettivi</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">${ic('i-fire')}In ritardo</span><span class="pill">In corso</span><span class="pill">Da iniziare</span><span class="pill">Conclusi</span></div></div>
        ${ob.length ? `<div class="cards">${ob.map((o, i) => cardObiettivo(m, o, i)).join('')}</div>` : `<div class="vuoto">Nessun obiettivo assegnato a ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Da approvare</h3><span class="cnt"><b>${att.length}</b><span>Richieste</span></span><span class="rb sm ghost">${ic('i-search')}</span>
          <div class="filters"><span class="pill" data-az="pagina" data-pagina="richieste" data-dip="${d.id}">Tutte le richieste di ${esc(d.nome)} ${ic('i-ne')}</span></div></div>
        ${att.length ? `<div class="cards">${att.map((r, i) => cardRichiesta(m, r, i)).join('')}</div>` : `<div class="vuoto">Niente da approvare da ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Spesa del mese</h3><span class="cnt"><b>${eur(cm.totale)}</b><span>per cliente</span></span><span class="rb sm ghost">${ic('i-down')}</span>
          <div class="filters"><span class="pill on">Ultimi 30 giorni</span><span class="pill">Oggi</span><span class="pill">Da inizio anno</span></div>
          <div class="destra"><span class="pill" data-az="pagina" data-pagina="costi">Tutti i costi dell'azienda ${ic('i-ne')}</span></div></div>
        <div class="hlist">${cm.perCliente.map(c => rigaCliente(m, c, 'mese', cm.totale, 'del dipartimento', d.id)).join('')}</div>
      </section>`;
    return cornice(m, opz, d.nome.toUpperCase(), stats, 'org', corpo, 'Nuovo obiettivo');
  }

  /* ---------- pagina Dipendente (versione 6, 2026-09-04) ----------
     Si apre dalla freccia nell'intaglio della card e della riga compatta. Un solo ordine per i due
     pubblici: testata e revisione per il titolare, poi oggi, rendimento, soul prompt, modello,
     strumenti, budget e permessi, colloquio per l'operatore. Dati in m.dossierDi(e). */
  function testataDipendente(m, e, d) {
    const mo = d.metriche.ora, mp = d.metriche.prima;
    const rev = d.revisioni.find(r => r.stato === 'attesa');
    const md = m.MODELLI[d.modello.assegnato];
    return `<section class="dtesta">
      <div class="ident">
        ${av(m, e, 'xl', e.pausa ? 'libero' : null, 'data-segue="1"')}
        <div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))} · in produzione dal ${esc(d.dal)}</span>
          <div class="chips">${chipStato(m, e)}${rev ? `<span class="chip lime">${ic('i-bolt')}Revisione in sospeso</span>` : ''}<span class="chip">${ic('i-doc')}Soul prompt v${d.prompt.corrente}</span><span class="chip">${ic(md.icona)}${esc(md.nome)}</span><span class="chip">${ic('i-target')}Colloquio ${d.colloquio.punteggio}</span></div>
          <div class="azioni"><span class="pill sm" data-az="modifica" data-id="${e.id}">${ic('i-pen')}Modifica</span><span class="pill sm${e.pausa ? ' on' : ''}" data-az="pausa" data-id="${e.id}">${ic(e.pausa ? 'i-play' : 'i-pause')}${e.pausa ? 'Riattiva' : 'Metti in pausa'}</span><span class="pill sm" data-az="colloquio" data-id="${e.id}">${ic('i-target')}Ripeti il colloquio</span></div></div>
      </div>
      <p class="mans">${esc(d.mansione)}</p>
      <div class="a-stats numeri">
        <div class="stat"><b>${mo.task}</b><span>task completati</span>${delta(mo.task, mp.task, true)}</div>
        <div class="stat"><b>${eur(mo.costo)}</b><span>per esito utile</span>${delta(mo.costo, mp.costo, false, eur)}</div>
        <div class="stat"><b>${mo.corretti}%</b><span>corretti da un umano</span>${delta(mo.corretti, mp.corretti, false, v => v + ' pt')}</div>
        <div class="stat"><b>${mo.respinte}%</b><span>proposte respinte</span>${delta(mo.respinte, mp.respinte, false, v => v + ' pt')}</div>
      </div>
      <span class="k30">Ultimi 30 giorni, confronto con i 30 precedenti · fonte: le richieste decise dal titolare</span>
    </section>`;
  }
  /* La revisione in sospeso: card lime a tutta larghezza con proposta, evidenze, attese, rischi e la decisione. */
  function cardRevisione(m, e, d, rv) {
    const r = m.richieste.find(x => x.id === rv.richiesta);
    const idx = r ? inAttesa(m).indexOf(r) : -1;
    const rid = r ? r.id : '';
    const daA = rv.tipo === 'prompt' ? `soul prompt v${rv.da} → v${rv.a}` : `modello ${m.MODELLI[rv.da].nome} → ${m.MODELLI[rv.a].nome}`;
    const li = x => `<li><b>${esc(x.n)}</b><span>${esc(x.t)}${x.richiesta ? `<i data-az="pagina" data-pagina="richieste" data-chi="${e.id}" title="Apri le richieste di ${esc(m.etichetta(e))}">${ic('i-ne')}</i>` : ''}</span></li>`;
    return `<div class="ncard lime rev">
      <div class="nt"><span class="rb ghost">${ic('i-bell')}<i class="dot"></i></span><span class="rb ghost" data-az="dossier" data-idx="${idx}" data-id="${e.id}" title="Apri il dossier">${ic('i-expand')}</span></div>
      <div class="rhead"><span class="chip onlime">${ic('i-bolt')}Revisione di performance</span><span class="chip onlime">${esc(daA)}</span><span class="chip onlime">proposta ${esc(rv.quando)}</span><span class="chip onlime">${ic('i-bell')}decide il titolare</span></div>
      <h4 class="rtit">${esc(rv.titolo)}</h4>
      <div class="rcols">
        <div><span class="k">Perché</span><ul>${rv.perche.map(li).join('')}</ul></div>
        <div><span class="k">Cosa ci aspettiamo</span><ul>${rv.attese.map(li).join('')}</ul></div>
        <div><span class="k">Rischi</span><ul>${rv.rischi.map(t => `<li><span>${esc(t)}</span></li>`).join('')}</ul><span class="k" style="margin-top:14px">La prova</span><p>${rv.prova.esecuzioni} esecuzioni, circa ${rv.prova.costo} €, esito in ${rv.prova.giorni} giorni. La versione attuale resta in produzione finché il titolare non decide.</p></div>
      </div>
      <div class="rdec"><span class="k">Decisione del titolare</span>
        <div class="row"><span class="pill ink" data-az="prova" data-id="${rid}">${ic('i-play')}Prova su ${rv.prova.esecuzioni} esecuzioni</span><span class="pill on" data-az="approva" data-id="${rid}">${ic('i-check')}Applica</span><span class="pill olight" data-az="modifiche" data-id="${rid}">${ic('i-pen')}Chiedi modifiche</span><span class="pill red" data-az="rifiuta-motivo" data-id="${rid}">${ic('i-x')}Rifiuta…</span><span class="link" data-az="dossier" data-idx="${idx}" data-id="${e.id}">Il dossier: ${rv.tipo === 'prompt' ? `v${rv.da} e v${rv.a}` : `${m.MODELLI[rv.da].nome} ed ${m.MODELLI[rv.a].nome}`} a confronto ${ic('i-ne')}</span></div>
      </div>
    </div>`;
  }
  function rigaRevisione(m, rv) {
    const nomeMod = x => (m.MODELLI[x] || {}).nome || x;
    const tipo = rv.tipo === 'prompt' ? `<span class="chip light">${ic('i-doc')}Prompt v${rv.da} → v${rv.a}</span>` : `<span class="chip light">${ic('i-bot')}Modello ${nomeMod(rv.da)} → ${nomeMod(rv.a)}</span>`;
    const esito = { applicata: `<span class="chip lime">${ic('i-check')}Applicata</span>`, prova: `<span class="chip ink">${ic('i-play')}In prova</span>`, modifiche: `<span class="chip">${ic('i-pen')}Modifiche</span>`, rifiutata: `<span class="chip rosa">${ic('i-x')}Rifiutata</span>` }[rv.stato] || '';
    const verso = rv.verso === 'su' ? `<span class="badge up">${ic('i-up')}</span> ` : rv.verso === 'giu' ? `<span class="badge down">${ic('i-dn')}</span> ` : '';
    return `<div class="hrow rev"><span class="ora">${esc(rv.quando)}</span>${tipo}<div class="tx"><b>${esc(rv.titolo)}</b><span>${verso}${esc(rv.effetto || '')}</span></div>${esito}<span class="chi">${esc(rv.decisa || '')}</span><span class="rb xs">${ic('i-ne')}</span></div>`;
  }
  /* L'ultima esecuzione di chi non sta lavorando adesso: consegnata (da approvare) o conclusa (libero). */
  function cardUltima(m, e) {
    const a = e.att, att = e.stato === 'attesa';
    return `<div class="ncard task ${att ? 'lime' : 'dark'}">
      <div class="who">${av(m, e)}<div><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${att ? '<i class="dot"></i>' : ''}</span><span class="rb ghost" data-az="pagina" data-pagina="esecuzione" data-id="${e.id}" title="Apri l'esecuzione">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaDip[e.dip])}</span><div><div class="tt">${esc(a.titolo)}</div><div class="meta"><b>${esc(a.cliente || '—')}</b><span>${att ? 'consegnato alle' : 'concluso'}</span><b>${esc(a.fine || '')}</b></div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${att ? `<span class="chip ink">${ic('i-bell')}Da approvare</span><span>aspetta il titolare</span>` : `<span class="chip">Libero</span><span>nessuna esecuzione in corso</span>`}${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black" data-az="pagina" data-pagina="esecuzione" data-id="${e.id}" title="Passi, log e output">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  function sezioneOggi(m, e) {
    const oggi = m.richieste.filter(r => r.chi === e.id && r.giorno === 0).sort((a, b) => b.min - a.min);
    const card = (e.stato === 'lavoro' || e.stato === 'errore' || e.stato === 'pianificato') ? cardEsecuzione(m, e, 0) : cardUltima(m, e);
    return `<section>
      <div class="shead"><h3>Oggi</h3><span class="cnt"><b>${oggi.length}</b><span>Richieste</span></span><span class="rb sm ghost">${ic('i-search')}</span>
        <div class="filters"><span class="pill on">Oggi</span><span class="pill">Ieri</span><span class="pill">Questa settimana</span></div></div>
      <div class="oggi"><div class="cards riga" style="margin:0">${card}</div><div class="hlist" style="margin-top:0">${oggi.length ? oggi.map(r => rigaStorico(m, r)).join('') : `<div class="vuoto" style="margin:0;height:56px">Nessuna richiesta oggi</div>`}</div></div>
    </section>`;
  }
  function sezioneRendimento(m, e, d) {
    const o = d.metriche.ora, p = d.metriche.prima;
    const q = (n, t) => `${Math.round(100 * n / Math.max(1, t))}%`;
    const riga = (icona, nome, sub, v1, v2, badge) => `<div class="crow rend"><span class="ico">${ic(icona)}</span><div class="tx"><b>${nome}</b><span>${sub}</span></div><span class="v">${v1}</span><span class="v">${v2}</span><span class="eur">${badge}</span><span class="rb xs">${ic('i-ne')}</span></div>`;
    const decise = m.richieste.filter(r => r.chi === e.id && r.stato !== 'attesa').sort((a, b) => (a.giorno - b.giorno) || (b.min - a.min)).slice(0, 6);
    return `<section>
      <div class="shead"><h3>Rendimento</h3><span class="cnt"><b>${o.task}</b><span>Task in 30 giorni</span></span><span class="rb sm ghost">${ic('i-sliders')}</span><span class="rb sm ghost">${ic('i-down')}</span>
        <div class="filters"><span class="pill on">Ultimi 30 giorni</span><span class="pill">Ultimi 90 giorni</span><span class="pill">Da inizio anno</span><span class="pill">Per cliente</span></div></div>
      <div class="hlist" style="margin-top:24px">
        ${riga('i-check', 'Approvate al primo colpo', 'consegne accettate senza modifiche', `${o.approvate}<small>${q(o.approvate, o.task)}</small>`, `${p.approvate}<small>nei 30 precedenti</small>`, delta(o.approvate, p.approvate, true))}
        ${riga('i-pen', 'Corrette da un umano', 'il titolare ha chiesto modifiche', `${o.modifiche}<small>${q(o.modifiche, o.task)}</small>`, `${p.modifiche}<small>nei 30 precedenti</small>`, delta(o.modifiche, p.modifiche, false))}
        ${riga('i-x', 'Respinte', 'rifiutate dal titolare', `${o.rifiutate}<small>${q(o.rifiutate, o.task)}</small>`, `${p.rifiutate}<small>nei 30 precedenti</small>`, delta(o.rifiutate, p.rifiutate, false))}
        ${riga('i-euro', 'Spesa e costo per esito utile', 'spesa dei 30 giorni / consegne accettate, anche dopo modifiche', `${o.spesa} €<small>spesi</small>`, `${eur(o.costo)}<small>per esito · era ${eur(p.costo)}</small>`, delta(o.costo, p.costo, false, eur))}
        ${riga('i-clock', 'Tempo medio per task', 'dall\'avvio alla consegna', `${o.tempo} min`, `${p.tempo} min<small>nei 30 precedenti</small>`, delta(o.tempo, p.tempo, false, v => v + ' min'))}
      </div>
      <div class="hgroup"><b>Le ultime richieste</b>decise dal titolare · la fonte dei numeri qui sopra<span class="link" data-az="pagina" data-pagina="richieste" data-chi="${e.id}">Tutte le richieste di ${esc(m.etichetta(e))} ${ic('i-ne')}</span></div>
      <div class="hlist">${decise.length ? decise.map(r => rigaStorico(m, r)).join('') : `<div class="vuoto" style="margin:0;height:56px">Nessuna richiesta decisa</div>`}</div>
    </section>`;
  }
  function rigaVersione(m, e, d, v) {
    const cur = v.v === d.prompt.corrente, c = d.prompt.corrente;
    const stato = v.proposta ? `<span class="chip lime">${ic('i-bolt')}Proposta</span>` : cur ? `<span class="chip ink">${ic('i-check')}Corrente</span>` : '';
    const n = v.numeri;
    const [a, b] = cur ? [Math.max(1, v.v - 1), v.v] : [Math.min(v.v, c), Math.max(v.v, c)];
    return `<div class="vrow${cur ? ' on' : ''}${v.proposta ? ' prop' : ''}"><b class="v">v${v.v}</b><div class="tx"><b>${esc(v.nota)}</b><span>${esc(v.chi)} · ${esc(v.data)}${n ? ` · ${n.task} task${n.prova ? ' in prova' : ''} · ${n.corretti}% corretti · ${n.respinte}% respinte · ${eur(n.costo)}` : ''}</span></div>${stato}${a !== b ? `<span class="rb xs" data-az="confronta" data-id="${e.id}" data-a="${a}" data-b="${b}" title="Confronta v${a} e v${b}">${ic('i-expand')}</span>` : ''}</div>`;
  }
  function sezionePrompt(m, e, d) {
    const cur = d.prompt.versioni.find(v => v.v === d.prompt.corrente) || d.prompt.versioni[0];
    const prec = d.prompt.versioni.find(v => v.v === cur.v - 1);
    return `<section>
      <div class="shead"><h3>Mansione e soul prompt</h3><span class="cnt"><b>v${cur.v}</b><span>Corrente dal ${esc(cur.data)}</span></span><span class="rb sm ghost">${ic('i-search')}</span>
        <div class="filters"><span class="pill on">Testo</span><span class="pill">Esempi allegati</span><span class="pill">Regole del dipartimento</span></div>
        <div class="destra">${prec ? `<span class="pill" data-az="confronta" data-id="${e.id}" data-a="${prec.v}" data-b="${cur.v}">${ic('i-expand')}Confronta v${prec.v} e v${cur.v}</span>` : ''}</div></div>
      <div class="prompt">
        <div class="pdoc"><div class="nt"><span class="rb sm" title="Modifica">${ic('i-pen')}</span>${prec ? `<span class="rb sm" data-az="confronta" data-id="${e.id}" data-a="${prec.v}" data-b="${cur.v}" title="Confronta con la v${prec.v}">${ic('i-expand')}</span>` : ''}</div>
          <div class="lb"><span class="chip ink">${ic('i-doc')}Soul prompt · v${cur.v}</span><span>${esc(cur.chi)} · ${esc(cur.data)} · ${esc(cur.nota)}</span></div>
          ${cur.testo.map(p => `<p>${esc(p)}</p>`).join('')}
          <div class="kv"><span>Con questa versione</span><b>${cur.numeri.task} task · ${cur.numeri.corretti}% corretti · ${cur.numeri.respinte}% respinte · ${eur(cur.numeri.costo)} per esito</b></div>
        </div>
        <div class="vlist">${d.prompt.versioni.map(v => rigaVersione(m, e, d, v)).join('')}</div>
      </div>
    </section>`;
  }
  function sezioneModello(m, e, d) {
    const mo = d.modello, uso = mo.uso;
    const tot = Object.values(uso).reduce((t, u) => t + u.esecuzioni, 0), costoTot = Object.values(uso).reduce((t, u) => t + u.costo, 0);
    const cardMod = md => { const u = uso[md.id] || { esecuzioni: 0, costo: 0 }; const on = md.id === mo.assegnato; return `<div class="ncard lead mod${on ? ' on' : ''}" data-az="assegna" data-id="${e.id}" data-v="${md.id}" title="${on ? 'Assegnato' : 'Assegna ' + md.nome}"><span class="ico">${ic(md.icona)}</span><div class="nt"><span class="rb ghost">${ic(on ? 'i-check' : 'i-ne')}</span></div><div class="name md">${esc(md.nome)}</div><div class="role">${esc(md.desc)}</div><div class="ft"><div><span class="k">30 giorni</span><span class="v">${u.esecuzioni}<small>esecuzioni · ${Math.round(100 * u.esecuzioni / Math.max(1, tot))}%</small></span></div><div><span class="k">Costo</span><span class="v">${u.costo} €<small>${esc(md.costo.split(' ')[0])} l'una</small></span></div></div></div>`; };
    return `<section>
      <div class="shead"><h3>Modello</h3><span class="cnt"><b>${esc(m.MODELLI[mo.assegnato].nome)}</b><span>Assegnato</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
        <div class="filters"><span class="pill${mo.automatica ? ' on' : ''}" data-az="auto" data-id="${e.id}" data-v="1">Scelta automatica</span><span class="pill${mo.automatica ? '' : ' on'}" data-az="auto" data-id="${e.id}" data-v="0">Solo il modello assegnato</span></div></div>
      <div class="cards modelli">
        ${Object.values(m.MODELLI).map(cardMod).join('')}
        <div class="ncard task dark regola"><div class="who"><span class="ico">${ic('i-wand')}</span><div><b>Criterio di scelta automatica</b><span>${mo.automatica ? 'attivo: il modello cambia da solo secondo la regola' : 'spento: si usa solo il modello assegnato'}</span></div></div><div class="nt"><span class="rb ghost">${ic('i-pen')}</span></div>
          <div class="body"><p class="rtx">${mo.regola}</p></div>
          <div class="st"><span class="k">Ripartizione delle esecuzioni · 30 giorni</span><div class="ripart">${Object.values(m.MODELLI).map(md => `<i class="${md.id}" style="width:${100 * (uso[md.id] || { esecuzioni: 0 }).esecuzioni / Math.max(1, tot)}%" title="${md.nome}"></i>`).join('')}</div><div class="leg">${Object.values(m.MODELLI).map(md => `<span><i class="${md.id}"></i>${md.nome} ${(uso[md.id] || { esecuzioni: 0 }).esecuzioni}</span>`).join('')}<span style="margin-left:auto">${tot} esecuzioni · ${costoTot} €</span></div></div></div>
      </div>
    </section>`;
  }
  function sezioneStrumenti(m, e, d) {
    const attivi = d.strumenti.filter(s => s.attivo).length;
    return `<section>
      <div class="shead"><h3>Strumenti e connessioni</h3><span class="cnt"><b>${attivi}</b><span>Attivi su ${d.strumenti.length}</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
        <div class="filters"><span class="pill on">Tutti</span><span class="pill">Attivi</span><span class="pill">Spenti</span><span class="pill">Connessioni</span></div>
        <div class="destra"><span class="pill">${ic('i-plus')}Aggiungi uno strumento</span></div></div>
      <div class="cards regole">${d.strumenti.map(s => `<div class="ncard lead${s.attivo ? '' : ' spenta'}" data-az="strumento" data-id="${e.id}" data-v="${s.id}" title="${s.attivo ? 'Spegni' : 'Accendi'}"><span class="ico">${ic(s.icona)}</span><div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div><div class="name md">${esc(s.nome)}</div><div class="role">${esc(s.desc)}</div><div class="ft"><div><span class="k">Ultimo uso</span><span class="sel">${esc(s.ultimo)}${ic('i-chev')}</span></div><div><span class="k">Stato</span>${s.attivo ? `<span class="chip lime">${ic('i-check')}Attivo</span>` : `<span class="chip">Spento</span>`}</div></div></div>`).join('')}</div>
      <div class="hgroup"><b>Connessioni</b>${d.connessioni.length} · con l'ultimo uso</div>
      <div class="hlist">${d.connessioni.map(c => `<div class="crow"><span class="ico">${ic('i-org')}</span><div class="tx"><b>${esc(c.nome)}</b><span>${esc(c.desc)}</span></div><span class="v">${c.stato === 'attiva' ? `<span class="chip lime">${ic('i-check')}Attiva</span>` : `<span class="chip rosa">${ic('i-warn')}Scaduta il ${esc(c.ultimo)}</span>`}</span><span class="v">${esc(c.ultimo)}<small>ultimo uso</small></span><span class="eur">${c.stato === 'attiva' ? '' : `<span class="chip ink">${ic('i-bolt')}Rinnova</span>`}</span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}</div>
    </section>`;
  }
  function sezioneBudget(m, e, d) {
    const b = d.budget, q = Math.min(100, Math.round(100 * b.speso / Math.max(1, b.mese))), oltre = b.oggi > b.giorno;
    return `<section>
      <div class="shead"><h3>Budget e permessi</h3><span class="cnt"><b>${b.speso} €</b><span>Spesi su ${b.mese} € al mese</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
        <div class="filters"><span class="pill on">Settembre</span><span class="pill">Agosto</span><span class="pill">Da inizio anno</span></div></div>
      <div class="bp">
        <div class="ncard task ${oltre ? 'lime' : 'dark'} budget">
          <div class="who"><span class="ico">${ic('i-euro')}</span><div><b>Budget del mese</b><span>${b.mese} €/mese · ${b.giorno} €/giorno</span></div></div>
          <div class="nt"><span class="rb ghost">${ic('i-pen')}</span></div>
          <div class="body"><div><div class="tt">${b.speso} € <small>di ${b.mese} €</small></div><div class="prog"><i style="width:${q}%"></i></div><div class="meta"><b>${q}%</b><span>speso</span><b>${Math.max(0, b.mese - b.speso)} €</b><span>per 26 giorni</span></div></div></div>
          <div class="st"><span class="k">Oggi</span><div class="row"><span class="sel"><span>${b.oggi} € su ${b.giorno} €</span>${oltre ? `<span class="chip rosa">${ic('i-warn')}oltre il limite</span>` : `<span class="chip">${ic('i-check')}nel limite</span>`}${ic('i-chev')}</span><span class="rb ${oltre ? 'black' : 'ghost'}">${ic('i-bell')}${oltre ? '<i class="dot"></i>' : ''}</span></div></div>
        </div>
        <div class="hlist" style="margin-top:0">${d.permessi.map(p => `<div class="crow${p.attiva ? '' : ' spenta'}"><span class="ico">${ic(p.eccezione ? 'i-star' : 'i-bell')}</span><div class="tx"><b>${esc(p.nome)}</b><span>${esc(p.origine)}</span></div><span class="v">${esc(p.modo)}</span><span class="v">${p.eccezione ? `<span class="chip lime">${ic('i-star')}Eccezione</span>` : `<span class="chip">Regola generale</span>`}</span><span class="eur">${p.attiva ? `<span class="chip lime">${ic('i-check')}Attiva</span>` : `<span class="chip">Spenta</span>`}</span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}<div class="crow add" data-az="pagina" data-pagina="richieste"><span class="rb xs">${ic('i-plus')}</span>Aggiungi un'eccezione · le regole generali stanno in Richieste</div></div>
      </div>
    </section>`;
  }
  function sezioneColloquio(m, e, d) {
    const c = d.colloquio, ok = c.casi.filter(x => x.esito === 'superato').length, sup = c.esito === 'superato';
    const chipEs = x => x.esito === 'superato' ? `<span class="chip lime">${ic('i-check')}Superato</span>` : x.esito === 'parziale' ? `<span class="chip">${ic('i-pen')}Parziale</span>` : `<span class="chip rosa">${ic('i-x')}Fallito</span>`;
    const ripeti = c.inCorso ? `<span class="pill lime">${ic('i-play')}Colloquio in corso · 0 di ${c.casi.length} casi</span>` : `<span class="pill" data-az="colloquio" data-id="${e.id}">${ic('i-target')}Ripeti il colloquio</span>`;
    return `<section>
      <div class="shead"><h3>Colloquio</h3><span class="cnt"><b>${c.punteggio}</b><span>Su 100 · soglia ${c.soglia}</span></span><span class="rb sm ghost">${ic('i-search')}</span>
        <div class="filters"><span class="pill on">Ultimo colloquio</span><span class="pill">Tutti i casi</span><span class="pill">Solo falliti</span></div>
        <div class="destra">${ripeti}</div></div>
      <div class="coll">
        <div class="ncard task ${sup ? 'gray' : 'lime'} esito">
          <div class="who"><span class="ico">${ic('i-target')}</span><div><b>${sup ? 'Superato' : 'Non superato'} il ${esc(c.data)}</b><span>v${c.versione} · ${esc(m.MODELLI[c.modello].nome)} · ${esc(c.durata)} · ${c.costo} €</span></div></div>
          <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
          <div class="body"><div><div class="tt">${c.punteggio} <small>su 100</small></div><div class="prog"><i style="width:${c.punteggio}%"></i></div><div class="meta"><b>${ok} di ${c.casi.length}</b><span>casi superati</span><b>soglia ${c.soglia}</b></div></div></div>
          <div class="st"><span class="k">Vale per</span><div class="row"><span class="sel"><span class="chip ink">${ic('i-doc')}v${c.versione}</span><span>${c.versione === d.prompt.corrente ? 'la versione corrente' : 'una versione precedente: da ripetere'}</span>${ic('i-chev')}</span><span class="rb black" data-az="colloquio" data-id="${e.id}" title="Ripeti il colloquio">${ic('i-play')}</span></div></div>
        </div>
        <div class="hlist" style="margin-top:0">${c.casi.map((x, i) => `<div class="hrow caso"><span class="ora">${i + 1}</span><div class="tx"><b>${esc(x.nome)}</b><span>atteso: ${esc(x.atteso)}</span></div>${chipEs(x)}<span class="eur">${x.punteggio}</span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}</div>
      </div>
      <div class="hgroup"><b>Colloqui precedenti</b>${c.storico.length} · uno per versione o modello</div>
      <div class="hlist">${c.storico.map(s => `<div class="crow"><span class="ico">${ic('i-target')}</span><div class="tx"><b>${esc(s.data)} · prompt v${s.versione}</b><span>${esc(m.MODELLI[s.modello].nome)}</span></div><span class="v">${s.punteggio}<small>su 100</small></span><span class="v">${s.esito === 'superato' ? `<span class="chip lime">${ic('i-check')}Superato</span>` : `<span class="chip rosa">${ic('i-x')}Non superato</span>`}</span><span class="eur"></span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}</div>
    </section>`;
  }
  function dipendente(m, opz) {
    const e = m.byId[opz.id] || m.dipendenti[0];
    const d = m.dossierDi(e);
    const att = inAttesa(m).filter(r => r.chi === e.id);
    const oggiN = m.richieste.filter(r => r.chi === e.id && r.giorno === 0).length + (e.stato === 'lavoro' || e.stato === 'errore' ? 1 : 0);
    const stats = `<div class="stat"><b>${oggiN}</b><span>task oggi</span></div>
      <div class="stat"><b>${att.length}</b><span>da approvare</span>${att.length ? `<span class="badge down">${ic('i-bell')}${att.length}</span>` : ''}</div>
      <div class="stat" data-az="pagina" data-pagina="costi" title="I costi dell'azienda"><b>${e.att.costo || 0} €</b><span>spesi oggi</span></div>`;
    const rev = d.revisioni.find(r => r.stato === 'attesa');
    const passate = d.revisioni.filter(r => r.stato !== 'attesa');
    const corpo = `
      ${testataDipendente(m, e, d)}
      <section>
        <div class="shead"><h3>Revisione di performance</h3><span class="cnt"><b>${rev ? 1 : 0}</b><span>In sospeso</span></span><span class="rb sm ghost">${ic('i-search')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">Soul prompt</span><span class="pill">Modello</span></div></div>
        ${rev ? `<div class="cards" style="display:block">${cardRevisione(m, e, d, rev)}</div>` : `<div class="vuoto">Nessuna revisione in sospeso: il sistema ne propone una quando i numeri dei 30 giorni peggiorano rispetto ai 30 precedenti</div>`}
        ${passate.length ? `<div class="hgroup"><b>Revisioni passate</b>${passate.length} · chi ha deciso, quando, con quale effetto misurato</div><div class="hlist">${passate.map(r => rigaRevisione(m, r)).join('')}</div>` : ''}
      </section>
      ${sezioneOggi(m, e)}
      ${sezioneRendimento(m, e, d)}
      ${sezionePrompt(m, e, d)}
      ${sezioneModello(m, e, d)}
      ${sezioneStrumenti(m, e, d)}
      ${sezioneBudget(m, e, d)}
      ${sezioneColloquio(m, e, d)}`;
    return cornice(m, opz, m.etichetta(e).toUpperCase(), stats, 'org', corpo, '');
  }

  /* ---------- pagina Esecuzione (versione 8, 2026-09-04) ----------
     Si apre dall'«occhio» e dalla freccia nell'intaglio delle card esecuzione. Stessa cornice
     (titolo = titolo dell'esecuzione, tre numeri: passi fatti, spesi, tempo). Testata con chi,
     chip, la frase «adesso / prossimo», le azioni e la barra dei passi (la barra agenda del
     sistema); poi Passi, Log (con la barra di scrittura), Output e Costo. Dati in m.esecuzioneDi(e). */
  const minuti = t => { const k = /(\d\d):(\d\d)/.exec(t || ''); return k ? +k[1] * 60 + +k[2] : null; };
  const durataFra = (da, a) => { const x = minuti(da), y = minuti(a); if (x === null || y === null) return ''; const d = Math.max(0, y - x); return d >= 60 ? `${Math.floor(d / 60)} h ${String(d % 60).padStart(2, '0')}` : `${d} min`; };
  const TIPO_LOG = { passo: ['i-check', 'Passo'], strumento: ['i-bolt', 'Strumento'], modello: ['i-bot', 'Modello'], nota: ['i-doc', 'Nota'], richiesta: ['i-bell', 'Richiesta'], errore: ['i-warn', 'Errore'], titolare: ['i-hand', 'Titolare'] };
  const ICONA_OUT = { post: 'i-mega', documento: 'i-doc', lista: 'i-list', immagine: 'i-grid', codice: 'i-code', proposta: 'i-receipt' };
  const chipPasso = p => p.stato === 'fatto' ? `<span class="chip">${ic('i-check')}Fatto</span>` : p.stato === 'corso' ? `<span class="chip ink">${ic('i-play')}In corso</span>` : p.stato === 'errore' ? `<span class="chip rosa">${ic('i-warn')}Errore</span>` : `<span class="chip">${ic('i-clock')}Da fare</span>`;
  const chipOut = o => ({ attesa: `<span class="chip ink">${ic('i-bell')}Da approvare</span>`, approvata: `<span class="chip lime">${ic('i-check')}Approvata</span>`, fatto: `<span class="chip lime">${ic('i-check')}Fatto</span>`, bozza: `<span class="chip lime">${ic('i-play')}In corso</span>`, errore: `<span class="chip rosa">${ic('i-warn')}Non fatto</span>` })[o.stato] || `<span class="chip">${ic('i-clock')}Da fare</span>`;
  /* Riepilogo dell'esecuzione: passi fatti, il passo corrente (in corso o in errore), il prossimo, costo finora e stima a fine. */
  function riepilogoEsecuzione(m, e, x) {
    const a = e.att;
    const fatti = x.passi.filter(p => p.stato === 'fatto').length;
    const cur = x.passi.find(p => p.stato === 'corso' || p.stato === 'errore');
    const prossimo = x.passi.find(p => p.stato === 'da fare');
    const costo = Math.round(10 * x.passi.reduce((t, p) => t + (p.stato === 'da fare' ? 0 : p.costo), 0)) / 10;
    const stima = Math.round(10 * x.passi.reduce((t, p) => t + p.costo, 0)) / 10;
    const durata = (e.stato === 'lavoro' || e.stato === 'errore') ? durataFra(a.da, m.azienda.ora) : durataFra(a.da, a.fine);
    return { fatti, cur, prossimo, costo, stima, durata, n: x.passi.length };
  }
  /* La barra dei passi: eventi bianchi = fatti, segmento «adesso» = in corso, rosa = errore, traslucidi = da fare. */
  function barraPassi(m, e, x, r) {
    const a = e.att;
    const ev = x.passi.map(p => {
      const num = p.stato === 'fatto' ? `<i class="n">${ic('i-check')}</i>` : `<i class="n">${p.n}</i>`;
      if (p.stato === 'corso') return `<div class="live"><span class="now"><b>${esc(m.azienda.ora)}</b><i></i></span><span class="lbl"><b>passo ${p.n}</b> · ${esc(p.nome)} · ${durataFra(p.inizio, m.azienda.ora)}</span><span class="rb">${ic('i-play')}</span></div>`;
      if (p.stato === 'errore') return `<span class="ev err"><i class="n">${ic('i-warn')}</i><span class="nm">${esc(p.nome)}</span><b>${esc(p.fine || '')}</b></span>`;
      if (p.stato === 'fatto') return `<span class="ev">${num}<span class="nm">${esc(p.nome)}</span><b>${esc(p.durata || '')}</b></span>`;
      return `<span class="ev plan">${num}<span class="nm">${esc(p.nome)}</span>${p.stima ? `<b>≈ ${esc(p.stima)}</b>` : ''}</span>`;
    }).join('');
    const fine = e.stato === 'attesa' ? `<span class="fine"><span class="rb">${ic('i-bell')}</span><b>consegnato alle ${esc(a.fine)}</b>aspetta il titolare</span>`
      : e.stato === 'libero' ? `<span class="fine"><span class="rb">${ic('i-check')}</span><b>concluso ${esc(a.fine || '')}</b></span>`
      : e.stato === 'pianificato' ? `<span class="fine"><span class="rb">${ic('i-clock')}</span><b>parte alle ${esc(a.quando)}</b>${r.n} passi · circa ${eur(r.stima)}</span>` : '';
    const cal = e.stato === 'lavoro' ? `da ${esc(a.da)} · ${r.durata}` : e.stato === 'errore' ? `fermo dalle ${esc(a.da)}` : e.stato === 'pianificato' ? `alle ${esc(a.quando)}` : `${esc(a.da || '')}${a.da && a.fine ? ' → ' : ''}${esc(a.fine || '')}`;
    return `<div class="a-sched"><span class="t">Passi</span><span class="cal"><i>${ic('i-clock')}</i>${cal}</span><div class="tl">${ev}${fine}</div><span class="rb go" data-az="pagina" data-pagina="dipendente" data-id="${e.id}" title="La pagina del dipendente">${ic('i-ne')}</span></div>`;
  }
  function testataEsecuzione(m, e, x, r) {
    const a = e.att, d = m.dossierDi(e);
    const md = m.MODELLI[r.cur ? r.cur.modello : d.modello.assegnato];
    const ob = x.obiettivo ? m.obiettivi.find(o => o.id === x.obiettivo) : null;
    const richiesta = x.output.find(o => o.stato === 'attesa' && o.richiesta);
    const idx = richiesta ? inAttesa(m).findIndex(q => q.id === richiesta.richiesta) : -1;
    const frase = e.pausa ? `<b>In pausa</b> dal titolare al passo ${r.cur ? r.cur.n : r.fatti} di ${r.n}: ${eur(r.costo)} spesi finora. Riprendi per continuare${r.cur ? ' con «' + esc(r.cur.nome) + '»' : ''}.`
      : e.stato === 'lavoro' && r.cur ? `<b>Adesso</b> passo ${r.cur.n} di ${r.n}, ${esc(r.cur.nome)}: ${esc(r.cur.esito || 'in corso')}. ${r.prossimo ? `<b>Prossimo</b> ${esc(r.prossimo.nome)}${r.prossimo.stima ? ', circa ' + esc(r.prossimo.stima) : ''}.` : ''}`
      : e.stato === 'errore' && r.cur ? `<b>Fermo</b> al passo ${r.cur.n} di ${r.n}, ${esc(r.cur.nome)}: ${esc(r.cur.esito || a.errore)}. Serve un intervento del titolare o dell'operatore.`
      : e.stato === 'pianificato' ? `<b>Parte alle ${esc(a.quando)}</b>: ${r.n} passi, circa ${eur(r.stima)}. ${x.log.length ? esc(x.log[x.log.length - 1].testo) : ''}`
      : e.stato === 'attesa' ? `<b>Consegnato alle ${esc(a.fine)}</b> e aspetta l'approvazione del titolare: ${r.n} passi in ${r.durata || '—'}, ${eur(r.costo)}.`
      : `<b>Concluso ${esc(a.fine || '')}</b>: ${r.n} passi${r.durata ? ' in ' + r.durata : ''}, ${eur(r.costo)}.`;
    const pillDip = `<span class="pill sm" data-az="pagina" data-pagina="dipendente" data-id="${e.id}">${ic('i-ne')}La pagina di ${esc(m.etichetta(e))}</span>`;
    const azioni = e.pausa ? `<span class="pill sm on" data-az="esec-pausa" data-id="${e.id}">${ic('i-play')}Riprendi</span><span class="pill sm" data-az="esec-stop" data-id="${e.id}">${ic('i-x')}Interrompi</span>${pillDip}`
      : e.stato === 'lavoro' ? `<span class="pill sm" data-az="esec-pausa" data-id="${e.id}">${ic('i-pause')}Metti in pausa</span><span class="pill sm" data-az="esec-stop" data-id="${e.id}">${ic('i-x')}Interrompi</span><span class="pill sm" data-az="esec-scrivi">${ic('i-chat')}Scrivi a ${esc(m.etichetta(e))}</span>${pillDip}`
      : e.stato === 'errore' ? `<span class="pill sm lime" data-az="esec-riprova" data-id="${e.id}">${ic('i-play')}Riprova il passo ${r.cur ? r.cur.n : ''}</span><span class="pill sm" data-az="pagina" data-pagina="dipendente" data-id="${e.id}">${ic('i-org')}Rinnova la connessione</span><span class="pill sm" data-az="esec-stop" data-id="${e.id}">${ic('i-x')}Interrompi</span>`
      : e.stato === 'pianificato' ? `<span class="pill sm lime" data-az="esec-avvia" data-id="${e.id}">${ic('i-play')}Avvia ora</span><span class="pill sm">${ic('i-cal')}Sposta</span>${pillDip}`
      : e.stato === 'attesa' ? `${idx >= 0 ? `<span class="pill sm lime" data-az="richiesta" data-idx="${idx}">${ic('i-bell')}Apri la richiesta</span>` : ''}<span class="pill sm" data-az="esec-scrivi">${ic('i-chat')}Scrivi a ${esc(m.etichetta(e))}</span>${pillDip}`
      : `<span class="pill sm">${ic('i-play')}Ripeti</span>${pillDip}`;
    return `<section class="etesta">
      <div class="ident">${av(m, e, 'lg', e.pausa ? 'libero' : null, 'data-anima="1"')}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span></div>
        <div class="chips">${chipStato(m, e)}${r.cur ? `<span class="chip">${ic('i-rows')}Passo ${r.cur.n} di ${r.n}</span>` : `<span class="chip">${ic('i-rows')}${r.fatti} di ${r.n} passi</span>`}<span class="chip">${ic(md.icona)}${esc(md.nome)}</span><span class="chip">${ic('i-hand')}${esc(a.cliente || 'Nova Studio')}</span>${ob ? `<span class="chip" data-az="pagina" data-pagina="dipartimento" data-dip="${e.dip}" title="Apri il dipartimento">${ic('i-target')}${esc(ob.titolo)}</span>` : ''}</div>
      </div>
      <p class="adesso">${frase}</p>
      <div class="azioni">${azioni}</div>
      ${barraPassi(m, e, x, r)}
    </section>`;
  }
  function rigaPasso(m, e, p) {
    const tempo = p.stato === 'fatto' || p.stato === 'errore' ? `${esc(p.inizio)} → ${esc(p.fine)}<small>${esc(p.durata || '')}</small>` : p.stato === 'corso' ? `da ${esc(p.inizio)}<small>${durataFra(p.inizio, m.azienda.ora)}</small>` : (p.stima ? `≈ ${esc(p.stima)}` : '—');
    const cls = p.stato === 'corso' ? ' corso' : p.stato === 'errore' ? ' errore' : p.stato === 'da fare' ? ' dafare' : '';
    const num = p.stato === 'fatto' ? ic('i-check') : p.stato === 'corso' ? ic('i-play') : p.stato === 'errore' ? ic('i-warn') : p.n;
    return `<div class="hrow passo${cls}"><span class="n">${num}</span><div class="tx"><b>${p.n}. ${esc(p.nome)}</b><span>${esc(p.esito || (p.strumenti.length ? 'Strumenti: ' + p.strumenti.join(', ') : 'Nessuno strumento'))}</span></div>${chipPasso(p)}<span class="chi">${tempo}</span><span class="chip light">${ic(m.MODELLI[p.modello].icona)}${esc(m.MODELLI[p.modello].nome)}</span><span class="eur">${p.stato === 'da fare' ? '≈ ' : ''}${eur(p.costo)}</span><span class="rb xs">${ic('i-ne')}</span></div>`;
  }
  function rigaLog(m, e, v) {
    const [icona, nome] = TIPO_LOG[v.tipo] || TIPO_LOG.nota;
    const r = v.richiesta ? m.richieste.find(q => q.id === v.richiesta) : null;
    const idx = r && r.stato === 'attesa' ? inAttesa(m).indexOf(r) : -1;
    const chip = v.tipo === 'errore' ? `<span class="chip rosa">${ic(icona)}${nome}</span>` : v.tipo === 'richiesta' ? `<span class="chip lime">${ic(icona)}${nome}</span>` : v.tipo === 'titolare' ? `<span class="chip ink">${ic(icona)}${nome}</span>` : `<span class="chip${v.tipo === 'passo' ? ' light' : ''}">${ic(icona)}${nome}</span>`;
    return `<div class="lrow ${v.tipo}" ${idx >= 0 ? `data-az="richiesta" data-idx="${idx}"` : ''}><span class="ora">${esc(v.ora)}</span>${chip}<div class="tx">${esc(v.testo)}${v.passo ? `<small>passo ${v.passo}</small>` : ''}</div><span class="eur">${v.costo ? eur(v.costo) : ''}</span><span class="rb xs">${ic(idx >= 0 ? 'i-chevr' : 'i-ne')}</span></div>`;
  }
  function cardOutput(m, e, o) {
    const r = o.richiesta ? m.richieste.find(q => q.id === o.richiesta) : null;
    const idx = r && r.stato === 'attesa' ? inAttesa(m).indexOf(r) : -1;
    const tono = o.stato === 'attesa' ? ' lime' : (o.stato === 'bozza' || o.stato === 'errore') ? ' gray' : o.stato === 'da fare' ? ' spenta' : '';
    return `<div class="ncard lead out${tono}" ${idx >= 0 ? `data-az="richiesta" data-idx="${idx}"` : ''}>
      <span class="ico">${ic(ICONA_OUT[o.tipo] || 'i-doc')}</span>
      <div class="nt">${o.stato === 'attesa' ? `<span class="rb ghost">${ic('i-bell')}<i class="dot"></i></span>` : ''}<span class="rb ghost">${ic(idx >= 0 ? 'i-eye' : 'i-ne')}</span></div>
      <div class="name md">${esc(o.nome)}</div>
      <div class="role">${esc(o.desc)}</div>
      <div class="ft"><div><span class="k">Stato</span>${chipOut(o)}</div><div><span class="k">Quando</span><span class="v">${esc(o.quando)}</span></div></div>
    </div>`;
  }
  function esecuzione(m, opz) {
    const e = m.byId[opz.id] || m.alLavoro[0] || m.dipendenti[0];
    const x = m.esecuzioneDi(e), a = e.att, d = m.dossierDi(e);
    const r = riepilogoEsecuzione(m, e, x);
    const stats = `<div class="stat"><b>${r.fatti}</b><span>di ${r.n} passi</span></div>
      <div class="stat"><b>${eur(r.costo)}</b><span>spesi</span>${r.costo > d.budget.giorno ? `<span class="badge down">${ic('i-warn')}oltre</span>` : ''}</div>
      <div class="stat"><b>${r.durata || '—'}</b><span>${e.stato === 'lavoro' ? 'da ' + esc(a.da) : e.stato === 'errore' ? 'fermo dalle ' + esc(a.da) : e.stato === 'pianificato' ? 'parte alle ' + esc(a.quando) : 'in tutto'}</span></div>`;
    const filtro = opz.log || 'tutto';
    const voci = x.log.filter(v => filtro === 'tutto' || v.tipo === filtro || (filtro === 'nota' && v.tipo === 'titolare')).slice().reverse();
    const conta = t => x.log.filter(v => v.tipo === t).length;
    const pillLog = (v, testo) => `<span class="pill${filtro === v ? ' on' : ''}" data-az="filtro-log" data-v="${v}">${testo}</span>`;
    const serie = x.serie.map(id => m.richieste.find(q => q.id === id)).filter(Boolean).sort((p, q) => (p.giorno - q.giorno) || (q.min - p.min));
    const perModello = {}; x.passi.forEach(p => { if (p.stato !== 'da fare') perModello[p.modello] = Math.round(10 * ((perModello[p.modello] || 0) + p.costo)) / 10; });
    const oltre = r.costo > d.budget.giorno;
    const corpo = `
      ${testataEsecuzione(m, e, x, r)}
      <section>
        <div class="shead"><h3>Passi</h3><span class="cnt"><b>${r.fatti}</b><span>Fatti su ${r.n}</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">Fatti</span><span class="pill">Da fare</span><span class="pill">Con strumenti</span></div></div>
        <div class="hlist" style="margin-top:24px">${x.passi.map(p => rigaPasso(m, e, p)).join('')}</div>
      </section>
      <section>
        <div class="shead"><h3>Log</h3><span class="cnt"><b>${x.log.length}</b><span>Voci</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-down')}</span>
          <div class="filters">${pillLog('tutto', 'Tutto')}${pillLog('passo', `Passi · ${conta('passo')}`)}${pillLog('strumento', `Strumenti · ${conta('strumento')}`)}${pillLog('richiesta', `Richieste · ${conta('richiesta')}`)}${pillLog('errore', `Errori · ${conta('errore')}`)}${pillLog('nota', `Note · ${conta('nota') + conta('titolare')}`)}</div></div>
        <div class="hlist" style="margin-top:24px">${voci.length ? voci.map(v => rigaLog(m, e, v)).join('') : `<div class="vuoto" style="margin:0;height:56px">Nessuna voce di questo tipo</div>`}</div>
        <div class="chat">${av(m, e, 's')}<input type="text" data-campo="chat" placeholder="Scrivi a ${esc(m.etichetta(e))}: una nota per ${r.cur ? 'il passo in corso' : 'la prossima esecuzione'}…" maxlength="160"><span class="rb sm" data-az="esec-invia" data-id="${e.id}" title="Invia">${ic('i-send')}</span></div>
      </section>
      <section>
        <div class="shead"><h3>Output</h3><span class="cnt"><b>${x.output.length}</b><span>Consegne</span></span><span class="rb sm ghost">${ic('i-search')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">${ic('i-fire')}Da approvare</span><span class="pill">In corso</span><span class="pill">Approvate</span></div></div>
        <div class="cards">${x.output.map(o => cardOutput(m, e, o)).join('')}</div>
        ${serie.length ? `<div class="hgroup"><b>Consegne precedenti della serie</b>${serie.length} · con l'esito del titolare<span class="link" data-az="pagina" data-pagina="richieste" data-chi="${e.id}">Tutte le richieste di ${esc(m.etichetta(e))} ${ic('i-ne')}</span></div><div class="hlist">${serie.map(q => rigaStorico(m, q)).join('')}</div>` : ''}
      </section>
      <section>
        <div class="shead"><h3>Costo</h3><span class="cnt"><b>${eur(r.costo)}</b><span>Finora · stima a fine ${eur(r.stima)}</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Per modello</span><span class="pill">Per passo</span><span class="pill">Per strumento</span></div>
          <div class="destra"><span class="pill" data-az="pagina" data-pagina="costi">Tutti i costi dell'azienda ${ic('i-ne')}</span></div></div>
        <div class="costo">
          <div class="ncard task ${oltre ? 'lime' : 'dark'} regola spesa">
            <div class="who"><span class="ico">${ic('i-euro')}</span><div><b>Costo dell'esecuzione</b><span>${r.n} passi · ${r.durata || '—'} · limite del giorno ${d.budget.giorno} €</span></div></div>
            <div class="nt"><span class="rb ghost">${ic('i-bell')}${oltre ? '<i class="dot"></i>' : ''}</span></div>
            <div class="body"><div><div class="tt">${eur(r.costo)} <small>di ${eur(r.stima)} stimati</small></div><div class="ripart">${Object.values(m.MODELLI).map(md => `<i class="${md.id}" style="width:${100 * (perModello[md.id] || 0) / Math.max(0.1, r.costo)}%" title="${md.nome}"></i>`).join('')}</div><div class="leg">${Object.values(m.MODELLI).map(md => `<span><i class="${md.id}"></i>${md.nome} ${eur(perModello[md.id] || 0)}</span>`).join('')}</div></div></div>
            <div class="st"><span class="k">Oggi</span><div class="row"><span class="sel"><span>${d.budget.oggi} € su ${d.budget.giorno} € al giorno</span>${oltre ? `<span class="chip rosa">${ic('i-warn')}oltre il limite</span>` : `<span class="chip">${ic('i-check')}nel limite</span>`}${ic('i-chev')}</span><span class="rb ghost" data-az="pagina" data-pagina="dipendente" data-id="${e.id}" title="Budget e permessi">${ic('i-ne')}</span></div></div>
          </div>
          <div class="hlist" style="margin-top:0">${x.strumentiUso.map(s => `<div class="crow${s.chiamate ? '' : ' spenta'}"><span class="ico">${ic(s.icona)}</span><div class="tx"><b>${esc(s.nome)}</b><span>${s.chiamate ? s.chiamate + ' chiamat' + (s.chiamate === 1 ? 'a' : 'e') : 'non usato'}</span></div><span class="v">${s.errore ? `<span class="chip rosa">${ic('i-warn')}Errore</span>` : s.chiamate ? `<span class="chip lime">${ic('i-check')}Usato</span>` : `<span class="chip">Non usato</span>`}</span><span class="v">${x.passi.filter(p => p.strumenti.includes(s.nome)).map(p => 'passo ' + p.n).join(', ') || '—'}</span><span class="eur">${eur(s.costo)}</span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}</div>
        </div>
      </section>`;
    return cornice(m, opz, a.titolo.toUpperCase(), stats, 'home', corpo, '');
  }

  /* ---------- pagina Costi (versione 13, 2026-09-06) ----------
     I costi dell'azienda: per dipartimento, per dipendente, per cliente, per modello, per strumento. Stessa cornice
     (titolo COSTI; tre numeri: spesi oggi, spesa dei 30 giorni con il confronto con i 30 precedenti, quanto resta del
     budget del mese). Si arriva dal sesto cerchio del rail (euro), dal numero «spesi oggi» della home, del dipartimento
     e del dipendente, dalla sezione «Spesa del mese» del Dipartimento e da «Costo» dell'Esecuzione. Ogni sezione ha le
     pillole dei periodi che i suoi dati reggono (oggi · ultimi 30 giorni · da inizio anno; per modello senza l'anno; per
     strumento solo oggi). Dati in m.costi(periodo) (dati.js); riusa la card costo dell'esecuzione (.task.spesa), le
     righe della spesa del mese (.crow) e i badge del confronto (delta). */
  const PERIODO_COSTI = { oggi: 'Oggi', mese: 'Ultimi 30 giorni', anno: 'Da inizio anno' };
  const PERIODO_LB = { oggi: 'oggi', mese: 'in 30 giorni', anno: 'da inizio anno' };
  const pillePeriodo = (sez, cur, lista) => `<div class="filters">${lista.map(p => `<span class="pill${cur === p ? ' on' : ''}" data-az="periodo" data-sez="${sez}" data-v="${p}">${PERIODO_COSTI[p]}</span>`).join('')}</div>`;
  const plurale = (n, uno, piu) => n === 1 ? uno : piu;
  const consegneTx = n => `${n} ${plurale(n, 'consegna approvata', 'consegne approvate')}`;
  /* ripartizione a pillola con la legenda: per modello (grigio / bianco / lime) o per blocchi di tempo (ultimi 30 giorni lime, 30 precedenti bianco, prima grigio) */
  const ripartModelli = (lista, tot, extra, wrap) => `<div class="ripart">${lista.map(x => `<i class="${x.id}" style="width:${100 * x.costo / Math.max(0.1, tot)}%" title="${esc(x.nome)}"></i>`).join('')}</div><div class="leg${wrap ? ' wrap' : ''}">${lista.map(x => `<span><i class="${x.id}"></i>${esc(x.nome)} ${eur(x.costo)}</span>`).join('')}${extra || ''}</div>`;
  const ripartBlocchi = b => ripartModelli([{ id: 'b1', nome: 'Ultimi 30 giorni', costo: b.ora }, { id: 'b2', nome: '30 precedenti', costo: b.prima }, { id: 'b3', nome: 'Prima', costo: b.prima2 }], b.ora + b.prima + b.prima2, '', true);
  /* La card costo di un dipartimento: la card costo dell'esecuzione con la spesa del periodo, la ripartizione, la quota e le consegne; lime se oltre il limite del giorno (oggi) o il budget del mese. */
  function cardCostoDip(m, x, periodo, tot, i) {
    const d = x.d;
    const oltre = periodo === 'oggi' ? x.oggi > x.budgetGiorno : x.budgetSpeso > x.budgetMese;
    const tono = oltre ? 'lime' : (i % 2 ? 'dark' : 'gray');
    const small = periodo === 'oggi' ? `su ${x.budgetGiorno} € al giorno` : periodo === 'mese' ? `di ${x.budgetMese} € al mese` : `dal ${esc(x.dal)}`;
    const pct = Math.round(100 * x.spesa / Math.max(1, tot));
    const k = periodo === 'anno' ? `Quota e consegne dal ${esc(x.dal)}` : periodo === 'oggi' ? 'Quota e consegne di oggi' : 'Quota e consegne approvate';
    return `<div class="ncard task ${tono} spesa dpt">
      <div class="who"><span class="ico">${ic(iconaDip[d.id])}</span><div><b>${esc(d.nome)}</b><span>${x.n} dipendent${plurale(x.n, 'e', 'i')}</span></div></div>
      <div class="nt">${oltre ? `<span class="rb ghost" title="Oltre il limite">${ic('i-bell')}<i class="dot"></i></span>` : `<span class="rb ghost" data-az="pagina" data-pagina="dipartimento" data-dip="${d.id}" title="Apri ${esc(d.nome)}">${ic('i-ne')}</span>`}</div>
      <div class="body"><div><div class="tt">${eur(x.spesa)} <small>${small}</small></div>${periodo === 'anno' ? ripartBlocchi(x.blocchi) : ripartModelli(x.modelli, x.spesa, '', true)}</div></div>
      <div class="st"><span class="k">${k}</span><div class="row"><span class="sel"><span class="chip">${pct}%</span><span>${x.consegne} consegn${plurale(x.consegne, 'a', 'e')}</span>${ic('i-chev')}</span><span class="rb black" data-az="pagina" data-pagina="dipartimento" data-dip="${d.id}" title="Apri ${esc(d.nome)}">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  /* La card costo dell'azienda (sezione Per modello): la stessa card, a 517, con il totale, la ripartizione per modello e la riga di oggi sul limite del giorno. */
  function cardCostoAzienda(m, c, periodo) {
    const oltre = c.oggi > c.budgetGiorno, oltreMese = c.budgetSpeso > c.budgetMese;
    return `<div class="ncard task ${(periodo === 'oggi' ? oltre : oltreMese) ? 'lime' : 'dark'} regola spesa">
      <div class="who"><span class="ico">${ic('i-euro')}</span><div><b>${periodo === 'oggi' ? 'Spesa di oggi' : 'Spesa dei 30 giorni'}</b><span>${m.n} dipendenti · ${consegneTx(c.consegne)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${oltre ? '<i class="dot"></i>' : ''}</span></div>
      <div class="body"><div><div class="tt">${eur(c.totale)} <small>${periodo === 'oggi' ? `su ${c.budgetGiorno} € al giorno` : `di ${c.budgetMese} € di budget al mese`}</small></div>${ripartModelli(c.perModello, c.totale, `<span style="margin-left:auto">${c.esecuzioni} ${periodo === 'oggi' ? 'passi' : 'esecuzioni'}</span>`)}</div></div>
      <div class="st"><span class="k">Oggi</span><div class="row"><span class="sel"><span>${c.oggi} € su ${c.budgetGiorno} € al giorno</span>${oltre ? `<span class="chip rosa">${ic('i-warn')}oltre il limite</span>` : `<span class="chip">${ic('i-check')}nel limite</span>`}${ic('i-chev')}</span><span class="rb ghost" data-az="pagina" data-pagina="richieste" title="Le regole di approvazione: spese sopra 50 €">${ic('i-ne')}</span></div></div>
    </div>`;
  }
  /* La riga della spesa di un dipendente: avatar, etichetta, un valore del periodo (oggi l'esecuzione, nei 30 giorni il costo per esito utile, dalla creazione la data), il budget a barra (del giorno o del mese), la spesa con il badge del confronto, la freccia verso la pagina. */
  function rigaCostoDipendente(m, x, periodo) {
    const e = x.e, b = x.budget;
    const lim = periodo === 'oggi' ? { v: b.oggi, di: b.giorno, lb: 'al giorno' } : { v: b.speso, di: b.mese, lb: 'al mese' };
    const q = Math.min(100, Math.round(100 * lim.v / Math.max(1, lim.di))), oltre = lim.v > lim.di;
    const mezzo = periodo === 'oggi' ? `${esc(e.att.titolo)}<small>${e.stato === 'lavoro' && e.att.passo ? `passo ${e.att.passo[0]} di ${e.att.passo[1]}` : esc(m.STATI[e.stato].breve.toLowerCase())}</small>`
      : periodo === 'mese' ? `${eur(x.esito)}<small>per esito utile</small>` : `dal ${esc(x.d.dal)}<small>in produzione</small>`;
    const badge = periodo === 'mese' ? delta(x.spesa, x.prima, false, v => v + ' €') : (periodo === 'oggi' && oltre ? `<span class="badge down">${ic('i-warn')}oltre</span>` : '');
    return `<div class="crow sp${x.spesa ? '' : ' spenta'}">${av(m, e)}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e, true))}</span></div><span class="v mezzo">${mezzo}</span><span class="v bud"><small>${lim.v} di ${lim.di} € ${lim.lb}</small><span class="prog${oltre ? ' oltre' : ''}"><i style="width:${q}%"></i></span></span><span class="eur">${badge}${eur(x.spesa)}</span><span class="rb xs" data-az="pagina" data-pagina="dipendente" data-id="${e.id}" title="Apri">${ic('i-ne')}</span></div>`;
  }
  /* Oltre sedici dipendenti la vista compatta (regola 3): pillole a tre per riga, con la spesa in un chip; lime chi è oltre il budget. */
  function rigaCostoCompatta(m, x, periodo) {
    const e = x.e, b = x.budget, oltre = periodo === 'oggi' ? b.oggi > b.giorno : b.speso > b.mese;
    return `<div class="erow${oltre ? ' lav' : ''}">${av(m, e)}<div class="tx"><b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e, true))}${periodo === 'mese' ? ` · ${eur(x.esito)} per esito` : ''}</span></div><span class="chip${oltre ? ' onlime' : ''}"><span>${eur(x.spesa)}</span></span><span class="rb xs" data-az="pagina" data-pagina="dipendente" data-id="${e.id}" title="Apri">${ic('i-ne')}</span></div>`;
  }
  /* La riga della spesa per cliente (la stessa della sezione «Spesa del mese» del Dipartimento): consegne approvate, oggi, quota, spesa; la freccia apre le richieste del cliente (se ne ha: la spesa può venire solo da esecuzioni, come Zenith a 11). */
  function rigaCliente(m, c, periodo, tot, ambito, dip) {
    const pct = Math.round(100 * c.spesa / Math.max(1, tot));
    const v1 = periodo === 'oggi' ? `${c.chi.length}<small>dipendent${plurale(c.chi.length, 'e', 'i')}</small>` : `${c.oggi} €<small>oggi</small>`;
    return `<div class="crow"><span class="ico">${ic('i-euro')}</span><div class="tx"><b>${esc(c.cliente)}</b><span>${consegneTx(c.consegne)}</span></div><span class="v">${v1}</span><span class="v">${pct}%<small>${ambito}</small></span><span class="eur">${eur(c.spesa)}</span><span class="rb xs"${m.clienti.includes(c.cliente) ? ` data-az="pagina" data-pagina="richieste" data-cliente="${esc(c.cliente)}"${dip ? ` data-dip="${dip}"` : ''} title="Le richieste di ${esc(c.cliente)}"` : ''}>${ic('i-ne')}</span></div>`;
  }
  function rigaModello(m, md, periodo, totN) {
    const medio = md.n ? md.costo / md.n : 0, unita = periodo === 'oggi' ? 'passi' : 'esecuzioni';
    return `<div class="crow${md.n ? '' : ' spenta'}"><span class="ico">${ic(md.icona)}</span><div class="tx"><b>${esc(md.nome)}</b><span>listino ${esc(md.listino)}</span></div><span class="v">${md.n}<small>${unita} · ${Math.round(100 * md.n / Math.max(1, totN))}%</small></span><span class="v">${eur(medio)}<small>${periodo === 'oggi' ? 'per passo' : 'per esecuzione'}</small></span><span class="eur">${eur(md.costo)}</span><span class="rb xs">${ic('i-ne')}</span></div>`;
  }
  function rigaStrumento(m, s) {
    return `<div class="crow"><span class="ico">${ic(s.icona)}</span><div class="tx"><b>${esc(s.nome)}</b><span>${s.chiamate} chiamat${plurale(s.chiamate, 'a', 'e')} in ${s.chi.length} esecuzion${plurale(s.chi.length, 'e', 'i')}</span></div><span class="v">${s.errore ? `<span class="chip rosa">${ic('i-warn')}Errore</span>` : `<span class="chip lime">${ic('i-check')}Usato</span>`}</span><span class="v">${pair(m, s.chi, 'xs', 3)}</span><span class="eur">${eur(s.costo)}</span><span class="rb xs" data-az="pagina" data-pagina="esecuzione" data-id="${s.chi[0]}" title="Apri l'esecuzione di ${esc(m.etichetta(m.byId[s.chi[0]]))}">${ic('i-ne')}</span></div>`;
  }
  function paginaCosti(m, opz) {
    const per = Object.assign({ dipartimenti: 'mese', dipendenti: 'mese', clienti: 'mese', modelli: 'mese' }, opz.periodo || {});
    const c30 = m.costi('mese'), resta = c30.budgetMese - c30.budgetSpeso;
    const stats = `<div class="stat"><b>${m.costoOggi} €</b><span>spesi oggi</span>${m.costoOggi > c30.budgetGiorno ? `<span class="badge down">${ic('i-warn')}oltre</span>` : ''}</div>
      <div class="stat"><b>${c30.totale} €</b><span>in 30 giorni</span>${delta(c30.totale, c30.prima, false, v => v + ' €')}</div>
      <div class="stat"><b>${resta} €</b><span>restano di ${c30.budgetMese} €</span>${resta < 0 ? `<span class="badge down">${ic('i-warn')}oltre</span>` : ''}</div>`;
    const cD = m.costi(per.dipartimenti), cE = m.costi(per.dipendenti), cC = m.costi(per.clienti), cM = m.costi(per.modelli), cS = m.costi('oggi');
    const compatto = m.n > 16;
    const corpo = `
      <section>
        <div class="shead"><h3>Per dipartimento</h3><span class="cnt"><b>${eur(cD.totale)}</b><span>${PERIODO_LB[per.dipartimenti]}</span></span><span class="rb sm ghost">${ic('i-sliders')}</span><span class="rb sm ghost">${ic('i-down')}</span>
          ${pillePeriodo('dipartimenti', per.dipartimenti, ['oggi', 'mese', 'anno'])}</div>
        <div class="cards riga">${cD.perDipartimento.map((x, i) => cardCostoDip(m, x, per.dipartimenti, cD.totale, i)).join('')}</div>
      </section>
      <section>
        <div class="shead"><h3>Per dipendente</h3><span class="cnt"><b>${m.n}</b><span>Dipendenti · ${eur(cE.totale)} ${PERIODO_LB[per.dipendenti]}</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>${compatto ? `<span class="rb sm ghost">${ic('i-grid')}</span><span class="rb sm white">${ic('i-rows')}</span>` : ''}
          ${pillePeriodo('dipendenti', per.dipendenti, ['oggi', 'mese', 'anno'])}</div>
        ${compatto ? `<div class="elenco">${cE.perDipendente.map(x => rigaCostoCompatta(m, x, per.dipendenti)).join('')}</div>` : `<div class="hlist" style="margin-top:24px">${cE.perDipendente.map(x => rigaCostoDipendente(m, x, per.dipendenti)).join('')}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Per cliente</h3><span class="cnt"><b>${cC.perCliente.length}</b><span>Clienti · ${eur(cC.totale)} ${PERIODO_LB[per.clienti]}</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-down')}</span>
          ${pillePeriodo('clienti', per.clienti, ['oggi', 'mese', 'anno'])}</div>
        ${cC.perCliente.length ? `<div class="hlist" style="margin-top:24px">${cC.perCliente.map(c => rigaCliente(m, c, per.clienti, cC.totale, "dell'azienda")).join('')}</div>` : `<div class="vuoto">Nessuna spesa ${PERIODO_LB[per.clienti]}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Per modello</h3><span class="cnt"><b>${cM.esecuzioni}</b><span>${per.modelli === 'oggi' ? 'Passi oggi' : 'Esecuzioni in 30 giorni'} · ${eur(cM.totale)}</span></span><span class="rb sm ghost">${ic('i-sliders')}</span>
          ${pillePeriodo('modelli', per.modelli, ['oggi', 'mese'])}</div>
        <div class="costo">${cardCostoAzienda(m, cM, per.modelli)}<div class="hlist" style="margin-top:0">${cM.perModello.map(md => rigaModello(m, md, per.modelli, cM.esecuzioni)).join('')}</div></div>
      </section>
      <section>
        <div class="shead"><h3>Per strumento</h3><span class="cnt"><b>${cS.chiamate}</b><span>Chiamate oggi · ${eur(cS.costoStrumenti)}</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          ${pillePeriodo('strumenti', 'oggi', ['oggi'])}</div>
        ${cS.perStrumento.length ? `<div class="hlist" style="margin-top:24px">${cS.perStrumento.map(s => rigaStrumento(m, s)).join('')}</div>` : `<div class="vuoto">Nessuno strumento usato oggi</div>`}
      </section>`;
    return cornice(m, opz, 'COSTI', stats, 'costi', corpo, '');
  }

  /* ---------- tendina estesa delle versioni: dossier di una revisione, o confronto fra due versioni ---------- */
  function tendinaVersioni(m, opz) {
    const c = opz.confronto, e = m.byId[c.id], d = m.dossierDi(e), rv = c.rev, r = c.richiesta;
    let colA, colB, titolo;
    if (rv && rv.tipo === 'modello') {
      const ma = m.MODELLI[rv.da], mb = m.MODELLI[rv.a];
      const col = (md, tag, testo) => { const u = d.modello.uso[md.id] || { esecuzioni: 0, costo: 0 }; return `<div class="doc"><div class="lb"><span class="chip ${tag}">${ic(md.icona)}${esc(md.nome)}</span><span>${testo}</span></div><p>${esc(md.desc)}.</p><p>${esc(md.costo)}.</p><div class="kv"><span>Esecuzioni in 30 giorni</span><b>${u.esecuzioni}</b></div><div class="kv"><span>Costo in 30 giorni</span><b>${u.costo} €</b></div></div>`; };
      colA = col(ma, 'ink', 'assegnato oggi'); colB = col(mb, 'lime', 'proposto');
      titolo = `Modello: ${ma.nome} → ${mb.nome}`;
    } else {
      const va = d.prompt.versioni.find(v => v.v === c.a) || d.prompt.versioni[0], vb = d.prompt.versioni.find(v => v.v === c.b) || va;
      const [L, R] = differenze(va.testo, vb.testo);
      const capo = (v, testo, tag) => `<div class="lb"><span class="chip ${tag}">${ic('i-doc')}v${v.v}</span><span>${esc(v.chi)} · ${esc(v.data)} · ${esc(v.nota)}</span></div>${testo}${v.numeri ? `<div class="kv"><span>${v.numeri.task} task${v.numeri.prova ? ' in prova' : ''}</span><b>${v.numeri.corretti}% corretti · ${v.numeri.respinte}% respinte · ${eur(v.numeri.costo)} per esito</b></div>` : ''}`;
      const tag = v => v.proposta ? 'lime' : v.v === d.prompt.corrente ? 'ink' : 'light';
      colA = `<div class="doc">${capo(va, L, tag(va))}</div>`; colB = `<div class="doc">${capo(vb, R, tag(vb))}</div>`;
      titolo = `Soul prompt: v${va.v} e v${vb.v} a confronto`;
    }
    const li = x => `<li><b>${esc(x.n)}</b><span>${esc(x.t)}</span></li>`;
    const ev = rv ? `<div class="ev3">
        <div class="dcard"><h5>Perché</h5><ul>${rv.perche.map(li).join('')}</ul></div>
        <div class="dcard"><h5>Cosa ci aspettiamo</h5><ul>${rv.attese.map(li).join('')}</ul></div>
        <div class="dcard"><h5>Rischi</h5><ul>${rv.rischi.map(t => `<li><span>${esc(t)}</span></li>`).join('')}</ul><p class="nota">La prova: ${rv.prova.esecuzioni} esecuzioni, circa ${rv.prova.costo} €, esito in ${rv.prova.giorni} giorni.</p></div>
      </div>` : '';
    const pagina = `<span class="link" data-az="pagina" data-pagina="dipendente" data-id="${e.id}">La pagina di ${esc(m.etichetta(e))} ${ic('i-ne')}</span>`;
    const azioni = rv && rv.stato === 'attesa' && r
      ? (opz.motivo
        ? `<div class="azioni motivo"><span class="k">Motivo del rifiuto, obbligatorio: resta nella cronologia delle revisioni</span><input type="text" data-campo="motivo" placeholder="Es. il limite di 800 battute non vale per i casi cliente" maxlength="120"><span class="pill red" data-az="rifiuta-conferma" data-id="${r.id}">${ic('i-x')}Conferma il rifiuto</span><span class="pill olight" data-az="rifiuta-annulla">Annulla</span></div>`
        : `<div class="azioni"><span class="pill ink" data-az="prova" data-id="${r.id}">${ic('i-play')}Prova su ${rv.prova.esecuzioni} esecuzioni</span><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Applica</span><span class="pill olight" data-az="modifiche" data-id="${r.id}">${ic('i-pen')}Chiedi modifiche</span><span class="pill red" data-az="rifiuta-motivo" data-id="${r.id}">${ic('i-x')}Rifiuta…</span>${opz.pagina === 'dipendente' ? '' : pagina}</div>`)
      : `<div class="azioni"><span class="pill olight" data-az="chiudi">Chiudi</span>${rv && rv.decisa ? `<span class="chip light">${esc(rv.decisa)}${rv.motivo ? ' · «' + esc(rv.motivo) + '»' : ''}</span>` : ''}${opz.pagina === 'dipendente' ? '' : pagina}</div>`;
    const att = inAttesa(m);
    const pag = r ? pager(m, att.indexOf(r), att.length) : '';
    return `<div class="a-tend estesa vers" role="dialog" aria-label="${esc(titolo)}">
      <div class="th"><span class="rb olight sm" data-az="${r ? 'riduci' : 'chiudi'}" title="${r ? 'Riduci' : 'Chiudi'}">${ic('i-left')}</span><span class="rb black">${ic(rv ? 'i-bolt' : 'i-doc')}</span><h4>${esc(titolo)}</h4>${rv && rv.stato === 'attesa' ? `<span class="chip lime">${ic('i-bell')}decide il titolare</span>` : ''}${pag}<span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
      <div class="tb"><div class="who2">${av(m, e, 's')}<b>${esc(m.etichetta(e))}</b><span>${esc(m.sotto(e))}</span>${rv ? `<span class="chip light">${rv.tipo === 'prompt' ? 'Revisione del soul prompt' : 'Revisione del modello'} · proposta ${esc(rv.quando)}</span>` : `<span class="chip light">Confronto fra versioni</span>`}</div>
        <div class="cmp">${colA}${colB}</div>${ev}${azioni}</div>
    </div>`;
  }

  function render(m, opz) {
    opz = Object.assign({ pagina: 'home', dip: 'svi', id: 0, tendina: 'aperta', richiesta: 0, pannello: 'richieste', filtri: {}, ordine: 'vecchie', modifica: null, confronto: null, motivo: false, periodo: {} }, opz || {});
    return opz.pagina === 'richieste' ? richieste(m, opz) : opz.pagina === 'dipartimento' ? dipartimento(m, opz) : opz.pagina === 'dipendente' ? dipendente(m, opz) : opz.pagina === 'esecuzione' ? esecuzione(m, opz) : opz.pagina === 'costi' ? paginaCosti(m, opz) : home(m, opz);
  }

  /* Disegna e collega i clic: tendina, cambio pagina, filtri, decisioni. Ritorna lo stato. */
  function monta(radice, m, opz) {
    const st = Object.assign({ pagina: 'home', dip: 'svi', id: 0, tendina: 'aperta', richiesta: 0, pannello: 'richieste', filtri: {}, ordine: 'vecchie', modifica: null, editor: null, confronto: null, motivo: false, log: 'tutto', periodo: { dipartimenti: 'mese', dipendenti: 'mese', clienti: 'mese', modelli: 'mese' } }, opz || {});
    const n = () => m.richiesteDi('attesa').length;
    /* parametri di avvio della pagina del dipendente: ?tendina=dossier (la revisione in sospeso del dipendente, estesa) e ?confronto=a,b (due versioni del prompt) */
    const idxRevisione = id => inAttesa(m).findIndex(r => r.tipo === 'revisione' && r.chi === id);
    if (st.tendina === 'dossier') { const i = idxRevisione(st.id); st.tendina = i >= 0 ? 'estesa' : 'aperta'; if (i >= 0) st.richiesta = i; }
    if (typeof st.confronto === 'string') { const [a, b] = st.confronto.split(',').map(Number); st.confronto = { id: st.id, a, b }; st.tendina = 'confronto'; }
    const vivi = () => window.DGT_AVATAR.anima(radice);
    const tutto = () => { const y = window.scrollY; radice.innerHTML = render(m, st); vivi(); window.scrollTo(0, y); };
    const soloTendina = () => { const t = radice.querySelector('#a-tendina'); if (t) { t.innerHTML = tendina(m, st); vivi(); } else tutto(); };
    /* editor del dipendente: apre sopra la tendina corrente e la ricorda per il ritorno */
    const apriEditor = (id, dip) => {
      const e = id ? m.byId[id] : null;
      st.modifica = { id: e ? e.id : 0, bozza: e ? { nome: e.nome || '', ruolo: e.ruolo, dip: e.dip, seme: e.seme || null, tinta: e.tinta || null } : { nome: '', ruolo: '', dip: dip || (st.pagina === 'dipartimento' ? st.dip : m.dipartimenti[0].id), seme: null, tinta: null } };
      if (st.tendina !== 'dipendente') st.tendinaPrima = st.tendina;
      st.tendina = 'dipendente';
      soloTendina();
      const inp = radice.querySelector('.a-tend.dip input[data-campo="ruolo"]'); if (inp && !e) inp.focus();
    };
    const chiudiEditor = () => { st.modifica = null; st.tendina = st.tendinaPrima || 'chiusa'; };
    const aggiornaAnteprima = () => {
      const a = radice.querySelector('#a-anteprima'), sc = radice.querySelector('#a-scelte'), tn = radice.querySelector('#a-tinte');
      if (a) { a.innerHTML = anteprimaDipendente(m, st.modifica); } if (sc) sc.innerHTML = scelteAvatar(m, st.modifica); if (tn) tn.innerHTML = scelteTinta(m, st.modifica);
      vivi();
    };
    const salva = () => {
      const b = st.modifica.bozza;
      if (!(b.ruolo || '').trim()) { const inp = radice.querySelector('.a-tend.dip input[data-campo="ruolo"]'); if (inp) { inp.focus(); inp.style.borderColor = 'var(--hangup)'; } return; }
      const dati = { nome: (b.nome || '').trim(), ruolo: b.ruolo.trim(), dip: b.dip, seme: b.seme && b.seme !== b.ruolo.trim() ? b.seme : '', tinta: b.tinta || b.tintaProposta || '' };
      if (st.modifica.id) m.aggiorna(st.modifica.id, dati); else m.aggiungi(dati);
      chiudiEditor(); tutto();
    };
    /* la decisione vive nel modello (m.decidi, dati.js, versione 11): qui solo lo stato della tendina */
    const decidi = (id, stato, commento, esitoRevisione) => {
      if (!m.decidi(id, stato, commento, esitoRevisione)) return;
      st.motivo = false;
      if (st.richiesta >= n()) st.richiesta = Math.max(0, n() - 1);
      if (!n() && st.tendina === 'estesa') st.tendina = 'aperta';
      tutto();
    };
    /* ---- azioni sull'esecuzione (pagina Esecuzione e card): pausa, interrompi, riprova, avvia, nota del titolare ---- */
    const voce = (testo, extra) => Object.assign({ ora: m.azienda.ora, tipo: 'titolare', testo }, extra || {});
    const esecAzione = (id, az) => {
      const e = m.byId[id]; if (!e) return;
      const x = m.esecuzioneDi(e), r = riepilogoEsecuzione(m, e, x), ora = m.azienda.ora;
      if (az === 'esec-pausa') { e.pausa = !e.pausa; x.log.push(voce(e.pausa ? 'MR ha messo in pausa l\'esecuzione' : 'MR ha ripreso l\'esecuzione')); }
      else if (az === 'esec-stop') { if (r.cur) { r.cur.stato = 'da fare'; delete r.cur.inizio; r.cur.esito = 'Interrotto dal titolare alle ' + ora; } e.stato = 'libero'; e.pausa = false; e.att.fine = ora; delete e.att.passo; delete e.att.errore; x.log.push(voce(`MR ha interrotto l'esecuzione al passo ${r.cur ? r.cur.n : r.fatti}`)); }
      else if (az === 'esec-riprova') { const cur = x.passi.find(p => p.stato === 'errore'); if (!cur) return; cur.stato = 'corso'; cur.inizio = ora; delete cur.fine; delete cur.durata; cur.esito = 'Riprovato dal titolare alle ' + ora; e.stato = 'lavoro'; e.att.da = ora; delete e.att.errore; e.att.passo = [cur.n, x.passi.length]; const pr = x.passi.find(p => p.stato === 'da fare'); e.att.prossimo = pr ? pr.nome : ''; x.log.push(voce(`MR ha riprovato il passo ${cur.n} · ${cur.nome}`, { passo: cur.n })); }
      else if (az === 'esec-avvia') { const p0 = x.passi.find(p => p.stato === 'da fare'); if (!p0) return; p0.stato = 'corso'; p0.inizio = ora; e.stato = 'lavoro'; const quando = e.att.quando; e.att.da = ora; delete e.att.quando; e.att.passo = [p0.n, x.passi.length]; const pr = x.passi.find(p => p.stato === 'da fare'); e.att.prossimo = pr ? pr.nome : ''; x.log.push(voce(`MR ha avviato l'esecuzione${quando ? ' (era pianificata alle ' + quando + ')' : ''}`)); }
      m.ricalcola(); tutto();
    };
    const inviaNota = id => {
      const inp = radice.querySelector('.chat input'); const v = inp ? inp.value.trim() : ''; const e = m.byId[id];
      if (!v) { if (inp) inp.focus(); return; } if (!e) return;
      const x = m.esecuzioneDi(e), r = riepilogoEsecuzione(m, e, x);
      x.log.push(voce('MR: ' + v, r.cur ? { passo: r.cur.n } : {})); st.log = 'tutto'; tutto();
    };
    tutto();
    if (st.editor) apriEditor(st.editor === 'nuovo' ? 0 : +st.editor);
    radice.addEventListener('input', ev => {
      const inp = ev.target.closest('input[data-campo]'); if (!inp || !st.modifica || inp.dataset.campo === 'motivo') return;
      const k = inp.dataset.campo, b = st.modifica.bozza;
      if (k === 'ruolo' && b.seme && b.seme.indexOf(b.ruolo) === 0) b.seme = null;   // il seme seguiva il ruolo: torna a seguirlo
      b[k] = inp.value; inp.style.borderColor = '';
      aggiornaAnteprima();
    });
    radice.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' && ev.target.closest('input[data-campo="motivo"]')) { ev.preventDefault(); const b = radice.querySelector('[data-az="rifiuta-conferma"]'); if (b) b.click(); return; }
      if (ev.key === 'Enter' && ev.target.closest('input[data-campo="chat"]')) { ev.preventDefault(); const b = radice.querySelector('[data-az="esec-invia"]'); if (b) inviaNota(+b.dataset.id); return; }
      if (ev.key === 'Enter' && st.modifica && ev.target.closest('input[data-campo]')) { ev.preventDefault(); salva(); }
      if (ev.key === 'Escape' && st.modifica) { chiudiEditor(); soloTendina(); }
    });
    radice.addEventListener('click', ev => {
      const el = ev.target.closest('[data-az]'); if (!el || !radice.contains(el)) return;
      const az = el.dataset.az;
      if (az === 'modifica') { ev.stopPropagation(); apriEditor(+el.dataset.id); }
      else if (az === 'nuovo') { apriEditor(0, el.dataset.dip || ''); }
      else if (az === 'bozza') { const k = el.dataset.k, v = el.dataset.v; st.modifica.bozza[k] = (k === 'seme' && v === dipendenteBozza(m, st.modifica).ruolo) ? null : v; if (k === 'dip') soloTendina(); else aggiornaAnteprima(); }
      else if (az === 'salva') { salva(); }
      else if (az === 'annulla') { chiudiEditor(); soloTendina(); }
      else if (az === 'chiudi') { st.tendina = st.tendina === 'confronto' ? (st.tendinaPrima === 'confronto' ? 'chiusa' : st.tendinaPrima || 'chiusa') : 'chiusa'; st.motivo = false; soloTendina(); }
      else if (az === 'apri') { st.tendina = 'aperta'; if (el.dataset.pannello) st.pannello = el.dataset.pannello; soloTendina(); }
      else if (az === 'pannello') { st.pannello = el.dataset.pannello; soloTendina(); }
      else if (az === 'espandi') { st.tendina = 'estesa'; soloTendina(); }
      else if (az === 'riduci') { st.tendina = 'aperta'; st.motivo = false; soloTendina(); }
      else if (az === 'prec') { if (n()) st.richiesta = (st.richiesta - 1 + n()) % n(); soloTendina(); }
      else if (az === 'succ') { if (n()) st.richiesta = (st.richiesta + 1) % n(); soloTendina(); }
      else if (az === 'vai') { st.richiesta = +el.dataset.idx; soloTendina(); }
      else if (az === 'richiesta') { if (ev.target.closest('[data-az="approva"],[data-az="rifiuta"]')) return; st.richiesta = +el.dataset.idx; st.tendina = 'estesa'; st.pannello = 'richieste'; soloTendina(); }
      else if (az === 'pagina') { ev.stopPropagation(); st.pagina = el.dataset.pagina; if (el.dataset.dip) { st.dip = el.dataset.dip; if (st.pagina === 'richieste') st.filtri = { dip: el.dataset.dip }; } if (el.dataset.id) st.id = +el.dataset.id; if (el.dataset.chi) st.filtri = { chi: el.dataset.chi }; if (el.dataset.cliente) st.filtri = Object.assign(st.pagina === 'richieste' && el.dataset.dip ? { dip: el.dataset.dip } : {}, { cliente: el.dataset.cliente }); if (st.tendina === 'confronto' || st.tendina === 'estesa') st.tendina = 'aperta'; st.motivo = false; tutto(); window.scrollTo(0, 0); }
      else if (az === 'filtro') { const k = el.dataset.k, v = el.dataset.v; st.filtri[k] = (st.filtri[k] === v || v === 'tutti') ? undefined : v; tutto(); }
      /* ---- pagina dei costi: il periodo di una sezione ---- */
      else if (az === 'periodo') { st.periodo = Object.assign({}, st.periodo, { [el.dataset.sez]: el.dataset.v }); tutto(); }
      else if (az === 'azzera') { st.filtri = {}; tutto(); }
      else if (az === 'ordina') { st.ordine = el.dataset.v; tutto(); }
      else if (az === 'approva') { ev.stopPropagation(); decidi(el.dataset.id, 'approvata'); }
      else if (az === 'rifiuta') { ev.stopPropagation(); const r = m.richieste.find(x => x.id === el.dataset.id); if (r && r.tipo === 'revisione') { const i = inAttesa(m).indexOf(r); if (i >= 0) { st.richiesta = i; st.tendina = 'estesa'; st.pannello = 'richieste'; st.motivo = true; soloTendina(); } return; } decidi(el.dataset.id, 'rifiutata', 'Rifiutata dal titolare'); }
      else if (az === 'modifiche') { decidi(el.dataset.id, 'modifiche', 'Modifiche chieste dal titolare'); }
      else if (az === 'approva-tutte') { inAttesa(m).forEach(r => m.decidi(r.id, 'approvata')); st.richiesta = 0; if (st.tendina === 'estesa') st.tendina = 'aperta'; tutto(); }
      /* ---- pagina del dipendente ---- */
      else if (az === 'pausa') { const e = m.byId[+el.dataset.id]; if (e) { e.pausa = !e.pausa; tutto(); } }
      else if (az === 'colloquio') { const e = m.byId[+el.dataset.id]; if (e) { m.dossierDi(e).colloquio.inCorso = true; tutto(); } }
      else if (az === 'assegna') { const e = m.byId[+el.dataset.id]; if (e) { m.dossierDi(e).modello.assegnato = el.dataset.v; tutto(); } }
      else if (az === 'auto') { const e = m.byId[+el.dataset.id]; if (e) { m.dossierDi(e).modello.automatica = el.dataset.v === '1'; tutto(); } }
      else if (az === 'strumento') { const e = m.byId[+el.dataset.id]; const s = e && m.dossierDi(e).strumenti.find(x => x.id === el.dataset.v); if (s) { s.attivo = !s.attivo; tutto(); } }
      else if (az === 'confronta') { st.confronto = { id: +el.dataset.id, a: +el.dataset.a, b: +el.dataset.b }; if (st.tendina !== 'confronto') st.tendinaPrima = st.tendina; st.tendina = 'confronto'; soloTendina(); }
      else if (az === 'dossier') { const i = +el.dataset.idx >= 0 ? +el.dataset.idx : idxRevisione(+el.dataset.id); if (i >= 0) { st.richiesta = i; st.tendina = 'estesa'; st.pannello = 'richieste'; st.motivo = false; } soloTendina(); }
      else if (az === 'prova') { decidi(el.dataset.id, 'approvata', 'Prova su 20 esecuzioni', 'prova'); }
      else if (az === 'rifiuta-motivo') { const r = m.richieste.find(x => x.id === el.dataset.id); const i = r ? inAttesa(m).indexOf(r) : -1; if (i >= 0) { st.richiesta = i; st.tendina = 'estesa'; st.pannello = 'richieste'; st.motivo = true; soloTendina(); const inp = radice.querySelector('input[data-campo="motivo"]'); if (inp) inp.focus(); } }
      else if (az === 'rifiuta-annulla') { st.motivo = false; soloTendina(); }
      /* ---- esecuzione ---- */
      else if (az === 'filtro-log') { st.log = el.dataset.v; tutto(); }
      else if (az === 'esec-scrivi') { const inp = radice.querySelector('.chat input'); if (inp) { inp.scrollIntoView({ block: 'center' }); inp.focus(); } }
      else if (az === 'esec-invia') { inviaNota(+el.dataset.id); }
      else if (az === 'esec-pausa' || az === 'esec-stop' || az === 'esec-riprova' || az === 'esec-avvia') { ev.stopPropagation(); esecAzione(+el.dataset.id, az); }
      else if (az === 'rifiuta-conferma') { const inp = radice.querySelector('input[data-campo="motivo"]'); const v = inp ? inp.value.trim() : ''; if (!v) { if (inp) { inp.focus(); inp.style.borderColor = 'var(--hangup)'; } return; } decidi(el.dataset.id, 'rifiutata', v, 'rifiutata'); }
    });
    return st;
  }

  /* av, iconaTipo, nomeTipo e differenze stanno in schermate/componenti.js (DGT_COMPONENTI): il telefono le prende da lì (versione 14) */
  return { id: 'A', nome: 'Console', css: prefissa(css, '.dirA'), render, monta };
})();
