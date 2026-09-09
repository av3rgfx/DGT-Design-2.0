/* =====================================================================
   DGT — i componenti della Console (schermate/componenti.js).

   Le primitive del sistema di design applicate al prodotto, condivise dalla
   Console (direzione-a.js), dal telefono (mobile.js) e dalle pagine di
   studio degli avatar: pulsanti rotondi, avatar e pile, pillole, chip, punti
   di interesse, badge, card con intaglio (lead, attività, Riepilogo), righe
   (crow, hrow, erow, qrow), barra di avanzamento, ripartizione con legenda,
   più le funzioni che le stampano (av, pair, dots, chipStato, chipEsito,
   iconaTipo, nomeTipo, eur, delta), le bolle della chat (messaggio) e le
   differenze fra due testi (differenze, con lcs e parole).

   Versione 14 (2026-09-06, manutenzione): estratti da direzione-a.js senza
   cambiare nulla di visibile. Le regole CSS stanno nell'ordine che avevano
   nella Console e vengono prima delle sue (DGT_UI.stile in ogni pagina), così
   la cascata non cambia. Le variabili (`variabili`) le dichiara ogni cornice
   sulla propria radice: `.a-app` nella Console, `.m-page` sul telefono.

   Stesso stile degli altri file: IIFE su window, niente moduli ESM, tutto gira
   da file:// e come file unico (build-unico.js). Va caricato dopo comune.js;
   l'avatar (av) legge window.DGT_AVATAR quando viene chiamato, non al
   caricamento.

   Versione 15 (2026-09-06): le bolle dei messaggi della chat (.msg, .bub) e
   messaggio(m, e, v), condivise dalla pagina Chat della Console e dalla tab
   Chat del telefono.

   API: DGT_COMPONENTI.css (già prefissato con .dirA), DGT_COMPONENTI.variabili,
   av(m, e, size, stato, extra, opz), pair(m, ids, size, max), dots(livello),
   chipStato(m, e), chipEsito(r), messaggio(m, e, v), iconaTipo, nomeTipo, eur(v),
   delta(ora, prima, meglioSeSale, fmt), differenze(A, B).
   ===================================================================== */
window.DGT_COMPONENTI = (function () {
  const { ic, esc, prefissa } = window.DGT_UI;

  /* Le variabili dei componenti: ogni cornice le dichiara sulla propria radice (.a-app, .m-page). */
  const variabili = `--black:#000;--card:#1C1C1C;--card-top:#262626;--gray-card:#4D4D4D;--round:#1E1E1E;--pill-src:#3A3A3A;--dots-box:#141414;
  --white:#FCFCFC;--summary:#F4F4F4;--docs:#E4E4E4;--thumb-pill:#A7A7A7;--lime:#B8FC64;--lime-deep:#A8E65D;--red:#F04848;--hangup:#F15E60;
  --badge-red:#F9A3A3;--badge-red-ink:#7A1F1F;--d1:#FC9498;--d2:#FCA464;--d3:#FCDC64;--d4:#A8FC64;--d5:#68FC64;--d-off:#4A4A4A;
  --t2:#9A9A9A;--t2-light:#6B6B6B;--ink:#0A0A0A;--font:"Urbanist",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --r-card:28px;--r-inner:22px;--r-pill:9999px;--behind:var(--black)`;

  const css = `
/* primitive del sistema */
.rb{width:48px;height:48px;border-radius:50%;background:var(--round);border:1px solid rgb(255 255 255/.14);display:grid;place-items:center;color:var(--white);flex:none;position:relative}
.rb svg{width:18px;height:18px}
.rb.sm{width:40px;height:40px}.rb.sm svg{width:16px;height:16px}
.rb.xs{width:32px;height:32px}.rb.xs svg{width:14px;height:14px}
.rb.ghost{background:transparent;border-color:rgb(255 255 255/.16)}
.rb.white{background:var(--white);color:var(--ink);border-color:transparent}
.rb.lime{background:var(--lime);color:var(--ink);border-color:transparent}
.rb.black{background:var(--ink);color:var(--white);border-color:transparent}
.rb.red{background:var(--hangup);color:var(--white);border-color:transparent}
.rb.glass{background:rgb(255 255 255/.22);border-color:rgb(255 255 255/.25);color:var(--white);backdrop-filter:blur(6px)}
.rb.olight{background:transparent;border-color:rgb(0 0 0/.14);color:var(--ink)}
.rb .dot{position:absolute;top:11px;right:12px;width:8px;height:8px;border-radius:50%;background:var(--red)}
/* avatar del dipendente AI: disco chiaro con la forma generata (avatar/avatar-dgt.js); .persona = iniziali del titolare */
.av{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;background:var(--docs);overflow:hidden;font-weight:500;font-size:15px;color:var(--ink);flex:none;border:2px solid transparent}
.av.persona{background:var(--white)}
.av.s{width:36px;height:36px;font-size:12px}.av.xs{width:28px;height:28px;font-size:10px}.av.lg{width:68px;height:68px}
.av svg{width:14px;height:14px}
.av svg.ava{width:100%;height:100%}
.pair{display:inline-flex;align-items:center}
/* l'anello degli avatar impilati prende il colore del fondo; con le pelli senza disco (avatar-orbe.js) sparisce (--av-anello-pelle) */
.pair .av{border:2px solid var(--av-anello-pelle,var(--white))}.pair .av+.av{margin-left:-10px}
/* il «+N» dopo la pila: un badge a sé, mai sotto gli avatar (correzione dell'utente, 2026-09-04) */
.pair .more{display:inline-grid;place-items:center;min-width:24px;height:24px;padding:0 7px;margin-left:4px;border-radius:var(--r-pill);background:rgb(255 255 255/.16);color:var(--white);font-size:11px;line-height:1;position:relative;z-index:1;flex:none}
.task .sel .pair .more{background:rgb(0 0 0/.1);color:var(--ink)}.task.gray .sel .pair .more,.task.dark .sel .pair .more{background:rgb(255 255 255/.16);color:var(--white)}
/* superfici chiare: con la pelle «chiaro» l'orbe si inverte da solo in perla nera (variabili --av-inv-* della pelle, lette da avatar-orbe.js; con le altre pelli non contano) */
.ncard.lime .av svg.orbe,.task .sel .av svg.orbe,.qrow .av svg.orbe,.hrow.attesa .av svg.orbe,.erow.lav .av svg.orbe,.pill.on .av svg.orbe{--av-c-corpo:var(--av-inv-corpo);--av-c-orlo:var(--av-inv-orlo);--av-c-orlo-w:var(--av-inv-orlo-w);--av-c-luce:var(--av-inv-luce);--av-occhi-neutri:#FCFCFC;--av-c-bordo:0;--av-c-zeta:#FCFCFC}
.task.gray .sel .av svg.orbe,.task.dark .sel .av svg.orbe{--av-c-corpo:initial;--av-c-orlo:initial;--av-c-orlo-w:initial;--av-c-luce:initial;--av-occhi-neutri:initial;--av-c-bordo:initial;--av-c-zeta:initial}
.pill{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 20px;border-radius:var(--r-pill);border:1px solid rgb(255 255 255/.14);background:transparent;color:var(--white);font-size:15px;white-space:nowrap;flex:none}
.pill.on{background:var(--white);color:var(--ink);border-color:transparent}
.pill.lime{background:var(--lime);color:var(--ink);border-color:transparent}
.pill.red{background:var(--hangup);color:var(--white);border-color:transparent}
.pill.olight{border-color:rgb(0 0 0/.14);color:var(--ink)}
.pill.sm{height:40px;padding:0 16px;font-size:14px;gap:8px}
.pill.sm .av{width:26px;height:26px;font-size:10px;margin-left:-8px}
.pill svg{width:16px;height:16px}
.chip{display:inline-flex;align-items:center;gap:6px;height:26px;padding:0 10px;border-radius:var(--r-pill);background:var(--pill-src);color:#E8E8E8;font-size:12px;white-space:nowrap}
.chip.lime{background:var(--lime);color:var(--ink)}
.chip.rosa{background:var(--badge-red);color:var(--badge-red-ink)}
.chip.onlime{background:rgb(0 0 0/.12);color:var(--ink)}
.chip.light{background:#D9D9D9;color:#3A3A3A}
.chip.ink{background:var(--ink);color:var(--white)}
.chip svg{width:11px;height:11px}
.dots{display:inline-flex;gap:5px;align-items:center;height:30px;padding:0 8px;border-radius:var(--r-pill);background:var(--dots-box)}
.dots i{width:13px;height:13px;border-radius:50%;background:var(--d-off);display:block}
.dots.l1 i:nth-child(1){background:var(--d1)}
.dots.l2 i:nth-child(1){background:var(--d1)}.dots.l2 i:nth-child(2){background:var(--d2)}
.dots.l3 i:nth-child(1){background:var(--d1)}.dots.l3 i:nth-child(2){background:var(--d2)}.dots.l3 i:nth-child(3){background:var(--d3)}
.dots.l4 i:nth-child(1){background:var(--d1)}.dots.l4 i:nth-child(2){background:var(--d2)}.dots.l4 i:nth-child(3){background:var(--d3)}.dots.l4 i:nth-child(4){background:var(--d4)}
.dots.l5 i:nth-child(1){background:var(--d1)}.dots.l5 i:nth-child(2){background:var(--d2)}.dots.l5 i:nth-child(3){background:var(--d3)}.dots.l5 i:nth-child(4){background:var(--d4)}.dots.l5 i:nth-child(5){background:var(--d5)}
.badge{display:inline-flex;align-items:center;gap:2px;height:20px;padding:0 8px;border-radius:var(--r-pill);font-size:12px;font-weight:500}
.badge.up{background:var(--lime);color:#1A2A05}.badge.down{background:var(--badge-red);color:var(--badge-red-ink)}
.badge svg{width:10px;height:10px}
/* card con intaglio */
.ncard{position:relative;border-radius:var(--r-card);background:linear-gradient(180deg,var(--card-top),var(--card));color:var(--white)}
.ncard.gray{background:var(--gray-card)}
.ncard.lime{background:var(--lime);color:var(--ink)}
.nt{position:absolute;top:0;right:0;display:flex;gap:8px;padding:0 0 12px 12px;background:var(--behind);border-bottom-left-radius:var(--r-card)}
.nt::before,.nt::after{content:"";position:absolute;width:22px;height:22px;background:radial-gradient(circle at 0 100%,transparent 21.5px,var(--behind) 22px)}
.nt::before{left:-22px;top:0}.nt::after{right:0;bottom:-22px}
.ncard .who{display:flex;align-items:center;gap:14px;padding:16px 16px 0}
.ncard .who div{min-width:0}
.ncard .who div>b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;font-weight:500;font-size:15px;line-height:20px}
.ncard .who div>span{display:block;font-size:12px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ncard.lime .who div>span{color:rgb(0 0 0/.6)}.ncard.gray .who div>span{color:#CFCFCF}
/* card dipartimento, dipendente e regola (forma della card lead) */
.lead{width:249px;height:204px;padding:20px;flex:none}
.lead .ico{width:48px;height:48px;border-radius:50%;border:1px solid rgb(255 255 255/.16);display:grid;place-items:center}
.lead .ico svg{width:20px;height:20px}
.lead .name{font-size:26px;line-height:30px;margin-top:22px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:4px}
.lead .name.md{font-size:22px;line-height:28px;margin-top:20px}
.lead .role{font-size:13px;color:var(--t2);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lead .ft{display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;gap:8px}
.lead .k{font-size:11px;color:var(--t2);display:block;margin-bottom:6px;white-space:nowrap}
.lead.spenta{opacity:.55}
/* card dipendente: senza nome il ruolo su due righe a 22 px e sotto il dipartimento; con il nome la forma piena. Stessa altezza nei due casi, piede in basso. */
.cards.dipendenti .lead{height:240px}
.lead.dip{display:flex;flex-direction:column}
.lead.dip .name{margin-top:16px}
.lead.dip .name.ruolo{font-size:22px;line-height:26px;white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;max-height:52px}
.lead .role{line-height:18px}
.lead.dip .ft{margin-top:auto}
.lead.add[data-az]{cursor:pointer}
/* card attività (esecuzione in corso) e card richiesta */
.task{width:316px;min-height:262px;display:grid;grid-template-rows:auto 1fr auto;grid-template-columns:minmax(0,1fr);flex:none}
.task>*{min-width:0}
.task .who{padding-right:120px}
.task .body{display:flex;align-items:center;gap:16px;padding:26px 20px 0}
.task .body>div{min-width:0;flex:1}
.task .ico{width:64px;height:64px;border-radius:50%;border:1px solid rgb(255 255 255/.16);display:grid;place-items:center;flex:none}
.task.lime .ico{border-color:rgb(0 0 0/.14)}
.task .ico svg{width:26px;height:26px}
.task .tt{font-size:24px;line-height:28px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.task .meta{display:flex;align-items:center;gap:8px;margin-top:6px;font-size:14px;white-space:nowrap;overflow:hidden}
.task .meta span{color:var(--t2)}.task.lime .meta span{color:rgb(0 0 0/.6)}.task.gray .meta span{color:#D0D0D0}
.task .meta b{font-weight:500}
.task .st{padding:18px 16px 16px}
.task .st .k{font-size:11px;color:var(--t2);display:block;margin-bottom:8px}
.task.lime .st .k{color:rgb(0 0 0/.6)}.task.gray .st .k{color:#D0D0D0}
.task .st .row{display:flex;gap:8px;align-items:center}
.task .sel{flex:1;height:48px;border-radius:var(--r-pill);display:flex;align-items:center;gap:10px;padding:0 16px 0 6px;font-size:14px;white-space:nowrap;min-width:0}
.task .sel span{overflow:hidden;text-overflow:ellipsis}
.task .sel svg{width:14px;height:14px;margin-left:auto;flex:none}
.task.lime .sel{background:var(--white);color:var(--ink)}
.task.gray .sel,.task.dark .sel{background:var(--ink);color:var(--white)}
.task.lime .st .rb.ghost{border-color:rgb(0 0 0/.16);color:var(--ink)}
.task .sel .chip{height:24px;font-size:11px;flex:none}
.task .sel .pair{flex:none}.task .sel .pair .av{border-color:var(--av-anello-pelle,var(--white))}.task.gray .sel .pair .av,.task.dark .sel .pair .av{border-color:var(--av-anello-pelle,var(--ink))}
.task .who .ico{width:48px;height:48px}.task .who .ico svg{width:20px;height:20px}
.task.lime .who .ico{border-color:rgb(0 0 0/.14)}
.prog{height:12px;border-radius:var(--r-pill);background:rgb(255 255 255/.12);overflow:hidden;margin-top:12px}
.prog i{display:block;height:100%;background:var(--lime);border-radius:var(--r-pill)}
.task.lime .prog{background:rgb(0 0 0/.12)}.task.lime .prog i{background:var(--ink)}
.task.gray .prog{background:rgb(0 0 0/.25)}
.task.obj .body{padding-top:22px}
.task .next{font-size:12px;color:var(--t2);margin-top:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.task.lime .next{color:rgb(0 0 0/.6)}.task.gray .next{color:#D0D0D0}
.lead.add{border:1px dashed rgb(255 255 255/.25);background:transparent;display:grid;place-items:center;align-content:center;gap:12px;text-align:center;color:var(--t2);font-size:14px}
.lead.add .rb{background:transparent}
.crow{height:56px;border-radius:var(--r-pill);background:linear-gradient(180deg,var(--card-top),var(--card));display:grid;grid-template-columns:40px minmax(0,1fr) 150px 150px 120px 32px;align-items:center;gap:12px;padding:0 8px 0 10px}
.crow>*{min-width:0}
.crow .ico{width:40px;height:40px;border-radius:50%;border:1px solid rgb(255 255 255/.16);display:grid;place-items:center}
.crow .ico svg{width:16px;height:16px}
.crow .tx b{display:block;font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.crow .tx span{display:block;font-size:11px;color:var(--t2)}
.crow .v{font-size:14px;white-space:nowrap}.crow .v small{font-size:11px;color:var(--t2);margin-left:4px}
.crow .eur{font-size:18px;font-weight:300;text-align:right;white-space:nowrap}
.crow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16)}
/* riga compatta del dipendente (elenco oltre 16 nella Console) */
.erow{height:56px;border-radius:var(--r-pill);background:linear-gradient(180deg,var(--card-top),var(--card));display:flex;align-items:center;gap:10px;padding:0 6px 0 8px;min-width:0}
.erow .av{width:40px;height:40px;font-size:13px}
.erow .tx{flex:1;min-width:0;line-height:16px}
.erow .tx b{display:block;font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.erow .tx span{display:block;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.erow .chip{height:24px;font-size:11px;max-width:150px}.erow .chip span{overflow:hidden;text-overflow:ellipsis}
.erow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16)}
.erow.lav{background:var(--lime);color:var(--ink)}.erow.lav .tx span{color:rgb(0 0 0/.6)}.erow.lav .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
.erow.add{background:transparent;border:1px dashed rgb(255 255 255/.25);color:var(--t2);font-size:14px;justify-content:center;cursor:pointer}.erow.add .rb.xs{border-color:rgb(255 255 255/.25)}
/* riga dello storico delle richieste (e, con le varianti delle pagine, dei passi e dei casi) */
.hrow{height:56px;border-radius:var(--r-pill);background:linear-gradient(180deg,var(--card-top),var(--card));display:grid;grid-template-columns:76px 40px minmax(0,1fr) 110px 132px 190px 64px 32px;align-items:center;gap:10px;padding:0 8px 0 18px;min-width:0}
.hrow>*{min-width:0}
.hrow .ora{font-size:13px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow .av{width:40px;height:40px;font-size:13px}
.hrow .tx{line-height:16px}
.hrow .tx b{display:block;font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow .tx span{display:block;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow .chip{height:24px;font-size:11px}
.hrow .chi{font-size:12px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hrow .chi b{font-weight:500;color:var(--white)}

.hrow .eur{font-size:13px;text-align:right;white-space:nowrap}
.hrow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16)}
.hrow.attesa{background:var(--lime);color:var(--ink)}.hrow.attesa .ora,.hrow.attesa .tx span,.hrow.attesa .chi{color:rgb(0 0 0/.6)}.hrow.attesa .chi b{color:var(--ink)}.hrow.attesa .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
/* regola 25, versione 18: dove nessuna riga della lista ha una destinazione cade anche la colonna da 32 px della
   freccia, e il contenuto se la riprende. In una lista mista la colonna resta e la cella è vuota, così le righe
   con e senza freccia restano allineate. Ogni variante di griglia ha il suo nofr accanto alla sua dichiarazione. */
.hrow.nofr{grid-template-columns:76px 40px minmax(0,1fr) 110px 132px 190px 64px;padding-right:18px}
.crow.nofr{grid-template-columns:40px minmax(0,1fr) 150px 150px 120px;padding-right:18px}
/* riga della coda nella tendina del titolare e sul telefono */
.qrow{height:48px;border-radius:var(--r-pill);background:var(--white);display:flex;align-items:center;gap:10px;padding:0 6px 0 8px;min-width:0;font-size:13px}
.qrow .av{width:32px;height:32px;font-size:11px}
.qrow .tx{flex:1;min-width:0;line-height:15px}
.qrow .tx b{display:block;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qrow .tx span{display:block;font-size:11px;color:var(--t2-light)}
.qrow .rb.xs{background:transparent;border-color:rgb(0 0 0/.14);color:var(--ink)}
.qrow.on{background:var(--lime)}
/* card del Riepilogo (documenti, miniature, obiettivo, coppie chiave-valore) */
.dcard{position:relative;border-radius:var(--r-inner);background:var(--docs);padding:16px;margin-right:0}
.dcard h5{font-size:18px;line-height:24px;padding-right:52px}
.dcard .nt{padding:0 0 10px 10px;border-bottom-left-radius:var(--r-inner)}
.dcard .nt::before,.dcard .nt::after{width:16px;height:16px;background:radial-gradient(circle at 0 100%,transparent 15.5px,var(--behind) 16px)}
.dcard .nt::before{left:-16px}.dcard .nt::after{bottom:-16px}
.dcard .nt .rb{border-color:rgb(0 0 0/.14);color:var(--ink);background:transparent}
.thumbs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.thumb{position:relative;height:118px;border-radius:14px;background:#D2D2D2;padding:8px 8px 0;overflow:hidden}
.thumb .pg{height:100%;background:#fff;border-radius:6px 6px 0 0;padding:8px 7px;display:grid;gap:3px;align-content:start}
.thumb .pg i{display:block;height:2px;background:#9AA0B0;border-radius:1px}
.thumb .pg i.h{height:4px;width:60%;background:#2E3A5C}.thumb .pg i.b{background:#4B5CB8;width:30%;height:3px}
.thumb .pg i.w1{width:85%}.thumb .pg i.w2{width:70%}.thumb .pg i.w3{width:90%}.thumb .pg i.w4{width:50%}
.thumb .lb{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);height:22px;padding:0 10px;border-radius:var(--r-pill);background:var(--thumb-pill);color:#fff;font-size:11px;display:flex;align-items:center;white-space:nowrap}
.goal{font-size:13px;line-height:19px;color:#3E3E3E;margin-top:12px;padding-right:20px}
.goal b{font-weight:500;color:var(--ink)}
.kv{display:flex;justify-content:space-between;font-size:12px;color:#6B6B6B;margin-top:10px;gap:10px}
.kv b{font-weight:500;color:var(--ink);text-align:right}
/* varianti aggiunte con le pagine successive: pillola nera, badge piatto, avatar grande, righe spente e «aggiungi», valore nel piede della card lead, unità nel titolo della card attività */
.pill.ink{background:var(--ink);color:var(--white);border-color:transparent}
.badge.flat{background:var(--pill-src);color:#E8E8E8}
.av.xl{width:96px;height:96px}
.crow.spenta{opacity:.55}
.crow.add{background:transparent;border:1px dashed rgb(255 255 255/.25);color:var(--t2);font-size:14px;display:flex;justify-content:center;gap:10px;cursor:pointer}
.crow.add .rb.xs{border-color:rgb(255 255 255/.25)}
.lead .v{font-size:18px;font-weight:300;white-space:nowrap}
.lead .v small{font-size:11px;color:var(--t2);margin-left:4px;font-weight:400}
/* ripartizione a barra con la legenda (per modello; per blocchi di tempo nella pagina dei Costi) */
.ripart{height:12px;border-radius:var(--r-pill);overflow:hidden;display:flex;background:rgb(255 255 255/.12);margin-top:2px}
.ripart i{display:block;height:100%}
.ripart i.rapido,.leg i.rapido{background:#6B6B6B}
.ripart i.standard,.leg i.standard{background:var(--white)}
.ripart i.esperto,.leg i.esperto{background:var(--lime)}
.leg{display:flex;gap:14px;font-size:12px;color:var(--t2);margin-top:10px;align-items:center;white-space:nowrap}
.leg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:6px;vertical-align:-1px}
.task .tt small{font-size:14px;color:var(--t2)}
.task.lime .tt small{color:rgb(0 0 0/.6)}
/* colori delle card lead lime e grigie; la pila di avatar dentro una riga; la ripartizione su fondo lime */
.ncard.lime .ico{border-color:rgb(0 0 0/.14)}.ncard.lime .role,.ncard.lime .k{color:rgb(0 0 0/.6)}.ncard.lime .rb.ghost{border-color:rgb(0 0 0/.16);color:var(--ink)}
.ncard.gray .role,.ncard.gray .k{color:#D0D0D0}
.crow .v .pair{vertical-align:middle}.crow .v .pair .av{border-color:var(--av-anello-pelle,var(--card))}
.ripart i.b1,.leg i.b1{background:var(--lime)}.ripart i.b2,.leg i.b2{background:var(--white)}.ripart i.b3,.leg i.b3{background:#6B6B6B}
.leg.wrap{flex-wrap:wrap;row-gap:4px}
.task.lime .ripart{background:rgb(0 0 0/.12)}.task.lime .ripart i.standard,.task.lime .leg i.standard{background:var(--ink)}.task.lime .ripart i.esperto,.task.lime .leg i.esperto{background:var(--white)}.task.lime .leg{color:rgb(0 0 0/.6)}
/* i messaggi del filo (versione 15, 2026-09-06): la bolla del dipendente a sinistra (scura, con l'avatar), quella del titolare
   a destra (bianca, con le iniziali), la riga di sistema al centro come chip. Le misure del telefono le rifà mobile.js. */
.msg{display:flex;align-items:flex-end;gap:10px;min-width:0}
.msg .av{width:36px;height:36px;font-size:12px}
.bub{max-width:74%;min-width:0;border-radius:22px;padding:12px 16px 10px;background:linear-gradient(180deg,var(--card-top),var(--card));color:var(--white);font-size:14px;line-height:20px;white-space:pre-line}
.bub .ora{display:block;margin-top:6px;font-size:11px;color:var(--t2);white-space:nowrap}
.msg.dip .bub{border-bottom-left-radius:8px}
.msg.io{flex-direction:row-reverse}
.msg.io .bub{background:var(--white);color:var(--ink);border-bottom-right-radius:8px}
.msg.io .bub .ora{color:var(--t2-light);text-align:right}
.msg.sistema{justify-content:center}
.msg.sistema .chip{height:28px;max-width:100%}.msg.sistema .chip span{overflow:hidden;text-overflow:ellipsis}
/* ---- Il canvas del workflow (versione 20) ----
   Il secondo riferimento portato dentro il prodotto: griglia puntinata, nodi con riflesso, connettori luminosi,
   nodo selezionato acceso, porte con l'etichetta. Due cose cambiano rispetto alla figura, e sono tutte e due
   regole gia' scritte: il verde luminoso diventa il **lime** (regola 4, un solo accento — la figura aveva sei
   verdi che non erano il lime), e **non c'e' pan ne' zoom** (regola 17: la Console si scala gia' con zoom alla
   larghezza della finestra, e due zoom annidati litigano). Il canvas non si trascina: si stende, e cresce in
   basso come tutte le altre sezioni. */
.wcanvas{position:relative;margin-top:24px;border-radius:var(--r-inner);background:var(--dots-box);overflow:hidden}
.wcanvas .grid{position:absolute;inset:0;background-image:radial-gradient(rgb(255 255 255/.14) 1px,transparent 1.4px);background-size:18px 18px;background-position:9px 9px;pointer-events:none;mask-image:radial-gradient(ellipse at 45% 35%,#000 55%,transparent 100%)}
.wcanvas svg.edges{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.wcanvas .edges path.arc{fill:none;stroke:var(--lime);stroke-width:2.2;filter:drop-shadow(0 0 6px rgb(184 252 100/.55))}
.wcanvas .edges path.arc.att{stroke-dasharray:7 6}
.wcanvas .edges path.arc.off{stroke:rgb(255 255 255/.38);stroke-dasharray:3 5;filter:none}
.wnode{position:absolute;width:208px;box-sizing:border-box;padding:12px 14px;border-radius:18px;background:var(--card);border:1px solid rgb(255 255 255/.10);box-shadow:inset 0 1px 0 rgb(255 255 255/.07),0 10px 30px rgb(0 0 0/.35);display:grid;gap:8px;align-content:start;cursor:pointer}
.wnode .hd{display:flex;align-items:center;gap:10px;min-width:0}
.wnode .nic{width:32px;height:32px;border-radius:11px;background:rgb(255 255 255/.07);display:grid;place-items:center;flex:none}
.wnode .nic svg{width:16px;height:16px;color:var(--white)}
.wnode .tt{min-width:0}
.wnode .tt b{display:block;font-weight:400;font-size:14px;line-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wnode .tt span{display:block;font-size:11px;line-height:15px;color:var(--t2)}
.wnode .ft{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden}
.wnode .ft .eur{margin-left:auto;color:var(--white)}
.wnode.on{border-color:var(--lime);box-shadow:0 0 0 1px var(--lime),0 0 44px rgb(184 252 100/.28),inset 0 1px 0 rgb(255 255 255/.18);z-index:3}
.wnode.on .nic{background:var(--lime)}.wnode.on .nic svg{color:var(--ink)}
.wnode.tit{border-style:dashed}
.wnode.tit.att{border-color:var(--lime);border-style:solid;box-shadow:0 0 0 1px var(--lime),0 0 40px rgb(184 252 100/.22)}
/* Le altezze dei campi sono **fisse** e il testo sta su una riga sola (versione 22). Prima un'etichetta o un
   valore lunghi andavano a capo — «Regola che ferma qui la consegna» su due righe, «Ambiente di test · staging»
   su tre — e il nodo aperto cresceva di un'altezza che nessuno poteva prevedere. Serviva prevederla: le posizioni
   della serpentina si calcolano nella funzione che stampa, senza misurare niente dopo il disegno (regola del
   canvas, versione 20), quindi l'altezza del nodo aperto dev'essere un conto, non una scoperta. */
.wnode .campi{display:grid;gap:6px;border-top:1px solid rgb(255 255 255/.08);padding-top:8px}
.wnode .campi .fl{height:20px;line-height:20px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wnode .campi .fv{height:32px;box-sizing:border-box;display:flex;align-items:center;gap:6px;font-size:12px;background:rgb(255 255 255/.06);border-radius:9px;padding:0 9px}
.wnode .campi .fv>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.wnode .campi .fv svg{width:12px;height:12px;margin-left:auto;flex:none;color:var(--t2)}
.wnode .hd{height:33px}
.wnode .ft{height:20px}
.wport{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--lime);box-shadow:0 0 10px rgb(184 252 100/.55);transform:translate(-50%,-50%);pointer-events:none}
.wport.off{background:rgb(255 255 255/.28);box-shadow:none}
.wplab{position:absolute;transform:translateX(-50%);font-size:10px;line-height:14px;color:var(--t2);white-space:nowrap;pointer-events:none}
.wtag{position:absolute;transform:translate(-50%,-50%);height:22px;display:inline-flex;align-items:center;gap:5px;padding:0 9px;border-radius:9999px;background:var(--round);border:1px solid rgb(255 255 255/.14);font-size:11px;color:var(--t2);white-space:nowrap;pointer-events:none}
.wtag svg{width:11px;height:11px}
.wtag.lime{border-color:var(--lime);color:var(--lime)}
/* la barra sotto il canvas: la stessa della figura (chat a sinistra, azioni a destra), ma i suoi controlli fanno
   davvero quello che dicono — regola 25 */
.wbar{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;gap:16px;padding:14px 20px;border-top:1px solid rgb(255 255 255/.08);background:rgb(10 10 10/.72);backdrop-filter:blur(10px);z-index:4}
.wbar .tx{flex:1;min-width:0}
.wbar .tx b{display:block;font-weight:400;font-size:14px}
.wbar .tx span{display:block;font-size:11px;color:var(--t2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
/* ---- Comporre (versione 22): il ramo e i tre gesti ----
   La tab a pillola sopra il canvas e' quella del riferimento, gia' copiata nello specimen: due voci, l'attiva
   piena. Non e' un componente nuovo. */
.wtabs{display:flex;gap:8px;margin-top:24px}
.wtabs .pill{height:40px;font-size:14px}
/* gesto A — il nodo aperto e' l'editor: le azioni stanno dentro il nodo, sotto i suoi campi */
.wnode .azioni-n{display:flex;gap:6px;border-top:1px solid rgb(255 255 255/.08);padding-top:8px;margin-top:2px}
.wnode .azioni-n .rb{width:28px;height:28px}
.wnode .azioni-n .rb svg{width:13px;height:13px}
.wnode .azioni-n .rb.pieno{background:var(--lime);color:var(--ink);border-color:transparent}
.wnode .azioni-n .rb[aria-disabled="true"]{opacity:.35}
/* gesto B — la barra sotto il canvas: il conto a sinistra, le azioni al centro, l'uscita a destra */
.wbar .azioni-b{display:flex;align-items:center;gap:8px}
.wbar .azioni-b .pill{height:36px;padding:0 14px;font-size:13px;gap:7px}
.wbar .azioni-b .pill svg{width:14px;height:14px}
.wbar .azioni-b .pill[aria-disabled="true"]{opacity:.4}
/* gesto C — il «+» sul connettore. Il bersaglio non e' il cerchio: e' tutto il tratto libero dell'arco, che
   misurato fa 34 px fra due nodi della stessa riga e 123 px nel salto di riga. Il cerchio si accende al
   passaggio, il bersaglio invisibile e' largo 34 e alto 40 perche' 34×2 non si centra col mouse. */
.wplus{position:absolute;transform:translate(-50%,-50%);width:38px;height:40px;display:grid;place-items:center;z-index:2;cursor:pointer}
.wplus i{width:22px;height:22px;border-radius:50%;background:var(--round);border:1px solid rgb(255 255 255/.22);display:grid;place-items:center;opacity:.55;transition:opacity .12s,background .12s}
.wplus svg{width:11px;height:11px;color:var(--white)}
.wplus:hover i{opacity:1;background:var(--lime);border-color:transparent}
.wplus:hover svg{color:var(--ink)}
/* I due comandi del collegamento (versione 24): il «+» infila un passo in mezzo, la «×» toglie il collegamento.
   La «×» si vede solo quando il mouse e' sul filo — se no ogni connettore porterebbe due cerchi, che a otto
   collegamenti fanno sedici pastiglie su un disegno che deve restare quello del riferimento. */
.warcz{position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:2px;z-index:2}
.warcz .wplus{position:static;transform:none}
.warcz .wdel{width:38px;height:40px;display:grid;place-items:center;cursor:pointer;opacity:0;transition:opacity .12s}
.warcz:hover .wdel{opacity:1}
.warcz .wdel i{width:22px;height:22px;border-radius:50%;background:var(--round);border:1px solid rgb(255 255 255/.22);display:grid;place-items:center}
.warcz .wdel:hover i{background:var(--white);border-color:transparent}
.warcz .wdel svg{width:11px;height:11px;color:var(--white)}
.warcz .wdel:hover svg{color:var(--ink)}
/* ---- Il grafo (versione 24) ----
   Dalla decisione 64 il canvas della prossima volta non e' piu' una catena disposta da sola: e' un **grafo** con
   posizioni libere, fan-out e fan-in illimitati, e il significato **sul connettore**. Quello che cambia nel CSS e'
   soltanto quello che il grafo aggiunge — la cornice che si scala («.wzoom»), le due prese del nodo («.wio»),
   l'etichetta sul collegamento («.warcl»), la mini-mappa («.wmini») e i comandi dello zoom («.wzoombar»).
   Nodo, griglia puntinata, porte con l'etichetta e bagliore restano quelli del riferimento. */
.wcanvas.comp{cursor:grab}
.wcanvas.comp.trascina{cursor:grabbing}
/* La cornice che si scala: «transform», non «zoom». La regola 17 vietava due zoom annidati perche' litigano — ed
   e' vero per «zoom»; misurato: «transform: scale()» compone esattamente (nodo 208 -> 312 a 1,5x, -> 124,8 a 0,6x,
   a 1440, 1920 e 1024) e le tendine »position:fixed« restano al bordo dello schermo. La griglia sta **dentro**, cosi'
   i punti si scalano con i nodi e l'aggancio a 18 px continua a cadere sui punti che si vedono. */
.wcanvas .wzoom{position:absolute;left:0;top:0;transform-origin:0 0}
.wcanvas .wzoom .grid{inset:0}
/* Le due prese del nodo: da quella di destra si tira un collegamento, in quella di sinistra lo si lascia. Sono la
   stessa pastiglia delle porte del riferimento (10 px, lime, bagliore), messa sul fianco invece che sotto. */
.wio{position:absolute;width:11px;height:11px;border-radius:50%;background:rgb(255 255 255/.22);border:1px solid rgb(255 255 255/.30);box-sizing:border-box;transform:translate(-50%,-50%);z-index:5;cursor:crosshair}
.wio.usc{background:var(--lime);border-color:transparent;box-shadow:0 0 10px rgb(184 252 100/.55)}
.wio:hover{background:var(--lime);border-color:transparent;box-shadow:0 0 16px rgb(184 252 100/.85);width:15px;height:15px}
.wio.ent{cursor:default}
.wcanvas.collega .wio.ent{cursor:crosshair;background:var(--lime);box-shadow:0 0 12px rgb(184 252 100/.6)}
/* Il collegamento che si sta tirando: lo stesso filo, tratteggiato finche' non ha un capo. */
.wcanvas .edges path.tira{fill:none;stroke:var(--lime);stroke-width:2.2;stroke-dasharray:6 5;opacity:.85}
.wcanvas .edges path.arc.se{stroke-dasharray:9 6}
.wcanvas .edges path.arc.insieme{stroke-width:3.4}
/* L'errore **non cambia colore**: l'emendamento dell'8 settembre ha portato al lime l'unico secondo accento che
   restava nel repository, e rimetterne uno qui — il rosa degli errori — lo riaprirebbe. Il significato lo dice
   l'etichetta sul collegamento (decisione 65), la tinta resta una sola: il tratteggio fine dice «e' una strada
   che si prende solo se qualcosa va storto», la parola dice quale. */
.wcanvas .edges path.arc.errore{stroke-dasharray:2 5;opacity:.75}
.wcanvas .edges path.arc.scelto{stroke-width:3.6}
.wcanvas .edges path.presa{fill:none;stroke:transparent;stroke-width:16;pointer-events:stroke;cursor:pointer}
/* L'etichetta sul collegamento: e' li' che sta il significato (decisione 65), non nelle porte del nodo. La pillola
   e' la ».wtag« gia' disegnata, rimpicciolita: nessun componente nuovo. */
.warcl{position:absolute;transform:translate(-50%,-50%);height:20px;display:inline-flex;align-items:center;gap:5px;padding:0 8px;border-radius:9999px;background:var(--round);border:1px solid rgb(255 255 255/.16);font-size:10px;line-height:20px;color:var(--t2);white-space:nowrap;z-index:3;cursor:pointer;max-width:150px;overflow:hidden;text-overflow:ellipsis}
.warcl:hover{border-color:var(--lime);color:var(--lime)}
.warcl.se{color:var(--lime);border-color:rgb(184 252 100/.45)}
.warcl.errore{color:var(--t2-light);border-color:rgb(255 255 255/.28)}
/* Il nodo d'innesco, in testa (idea dell'utente, decisione 66): n8n da' al trigger l'angolo arrotondato: qui il
   fianco sinistro diventa un semicerchio da 36 px, come nel loro canvas, e la presa d'entrata non c'e' — prima
   dell'innesco non c'e' lavoro. */
.wnode.inn{border-radius:44px 18px 18px 44px;padding-left:16px}
.wnode.inn .nic{border-radius:50%;background:var(--lime)}
.wnode.inn .nic svg{color:var(--ink)}
.wnode.inn.on .nic{background:var(--lime)}
/* Il nodo scelto quando ce n'e' piu' d'uno (selezione multipla): l'anello lime senza i campi aperti. */
.wnode.mult{border-color:var(--lime);box-shadow:0 0 0 1px var(--lime),0 0 26px rgb(184 252 100/.18)}
.wnode.presa{cursor:grab}
.wnode.presa:active{cursor:grabbing}
/* I comandi dello zoom e la mini-mappa: il secondo riferimento ce li ha tutti e due. */
.wzoombar{position:absolute;right:16px;bottom:78px;display:flex;align-items:center;gap:6px;z-index:6}
.wzoombar .rb{width:32px;height:32px;background:rgb(10 10 10/.72);backdrop-filter:blur(10px)}
.wzoombar .rb svg{width:13px;height:13px}
.wzoombar .zv{height:32px;padding:0 10px;border-radius:9999px;background:rgb(10 10 10/.72);backdrop-filter:blur(10px);border:1px solid rgb(255 255 255/.14);font-size:11px;color:var(--t2);display:flex;align-items:center;cursor:pointer}
.wmini{position:absolute;left:16px;bottom:78px;width:200px;height:120px;border-radius:14px;background:rgb(10 10 10/.72);backdrop-filter:blur(10px);border:1px solid rgb(255 255 255/.12);z-index:6;overflow:hidden;cursor:pointer}
.wmini i{position:absolute;background:rgb(255 255 255/.28);border-radius:2px}
.wmini i.tit{background:rgb(255 255 255/.5)}
.wmini i.inn{background:var(--lime);opacity:.75}
.wmini b{position:absolute;border:1px solid var(--lime);border-radius:3px;background:rgb(184 252 100/.10);pointer-events:none}
/* La barra del canvas quando si compone: il conto a sinistra, gli acceleratori al centro. */
.wbar .azioni-b .pill.picc{height:32px;padding:0 12px;font-size:12px}
.wsc{position:absolute;left:16px;top:16px;z-index:6;display:flex;gap:6px;align-items:center;font-size:11px;color:var(--t2)}
/* la riga in cima enuncia fatti e non si tocca: l'unica pillola che si clicca e' quella che propone (versione 30) */
.wsc .chip.vai{cursor:pointer;border-color:rgb(184 252 100/.45);color:var(--t1)}
.wsc .chip.vai:hover{background:var(--lime);color:var(--ink);border-color:transparent}
.wsc .chip{height:24px;font-size:11px}
`;

  /* Quattro colonne, non cinque (versione 21). Il consiglio aveva concesso al canvas l'eccezione alla banda
     riservata perche' la stima diceva «togliendo la banda si passa da 5 colonne a 3, e il workflow di Sviluppo
     cresce del 41 %». La stima toglieva 354 px; la banda vera ne toglie 304, e il passo fra i nodi bastava
     stringerlo di 6 px: 36·2 + 3·242 + 208 = **1006 px**, dentro i 1008 della colonna. Misurato il prezzo vero:
     **un workflow su sei cresce di 210 px a undici, due su ventisei a quaranta**. Niente eccezione, quindi:
     nessuna pagina larga, nessun nodo che nasce sotto la tendina, e il prodotto resta uno. */
  /* ---- Il passo della griglia (versione 24: 234x216, non 242x210) ----
     Il canvas aggancia i nodi ogni **18 px**, che sono i punti della griglia puntinata: i nodi cadono sui punti
     che si vedono. Ma il passo della disposizione — 242x210 — **non era un multiplo di 18**, quindi un nodo
     appena disposto (o appena riordinato) stava fra i punti, e uno trascinato ci cadeva sopra: due regole diverse
     per la stessa cosa, e una prova che non poteva passare. 234 = 13x18 e 216 = 12x18 le mettono d'accordo.
     La colonna riservata regge lo stesso: 36x2 + 3x234 + 208 = **982 px** dentro i 1008 (prima erano 1006). */
  const W_COL = 4, W_PX = 234, W_PY = 216, W_PAD = 36, W_W = 208, W_H = 96;
  /* ---- Quanto e' alto un nodo, e dove finisce quello che gli sta sotto (versione 22) ----
     Difetto trovato misurando, ed e' della versione 20: **il nodo aperto copriva per intero il nodo sotto di se'**
     — 18 096 px², cioe' 208×87, tutta la sua superficie. Il canvas aggiungeva 168 px in fondo, dove non servivano,
     invece di spostare in giu' le righe seguenti. Con una figura da leggere era gia' sbagliato; con una figura da
     **comporre** e' insostenibile, perche' il gesto che si usa di piu' e' proprio aprire un nodo.
     Adesso le righe sotto quella del nodo aperto scendono di quanto il nodo cresce. L'altezza si calcola qui, con
     le costanti che rispecchiano il CSS, e una prova verifica che il conto e la resa coincidano su ogni nodo di
     ogni workflow: se il CSS cambia, la prova se ne accorge invece di lasciar tornare le sovrapposizioni. */
  const W_H_CHIUSO = 87;              /* 12+33+8+20+12 di riempimento e figli, piu' i due bordi */
  const W_FL = 20, W_FV = 32, W_GAP = 6, W_CAMPI_SU = 9;   /* etichetta, valore, spazio fra loro, bordo + spazio in cima */
  const W_AZ = 39;                    /* la riga delle azioni del gesto A: bordo, spazio, cerchi da 28 */
  /* `sl` (sola lettura) non e' un dettaglio: in sola lettura la riga delle azioni **non viene disegnata**
     (`compone = ramo && !sl`), ma il conto la contava lo stesso. Misurato sul telefono: il conto diceva 311 px e
     la resa ne faceva 263,4 — **47,6 px di scarto**, cioe' esattamente `W_GAP + 2 + W_AZ`. Da quel conto
     dipendono l'altezza del canvas e il rettangolo della card aperta, quindi lo scarto si propagava. */
  const altNodo = (nd, on, ramo, sl) => {
    if (!on) return W_H_CHIUSO;
    const righe = nd.titolare
      ? [W_FL, W_FV, W_FL, W_FV]                                  /* regola, firma anticipata */
      : nd.innesco
        ? [W_FL, W_FV, W_FL, W_FV]                                /* quando parte, permesso */
        : [W_FL, W_FV].concat(                                     /* modello */
            [W_FL], (nd.strumenti && nd.strumenti.length ? nd.strumenti : ['x']).map(() => W_FV),
            nd.esito ? [W_FL, W_FV] : []);
    const campi = W_CAMPI_SU + righe.reduce((t, h) => t + h, 0) + W_GAP * (righe.length - 1);
    const az = !nd.titolare && ramo && !sl ? W_GAP + 2 + W_AZ : 0;
    return W_H_CHIUSO + 8 + campi + az;
  };
  /* La spinta: di quanto scendono le righe sotto quella del nodo aperto. Vale solo per «l'ultima volta», dove le
     posizioni le calcola la serpentina; nel grafo le posizioni sono dell'utente e non le sposta nessuno. */
  const spintaDi = (nodi, sel, ramo, sl) => {
    const i = nodi.findIndex(nd => nd.n === sel);
    if (i < 0) return { riga: -1, px: 0 };
    return { riga: Math.floor(i / W_COL), px: Math.max(0, altNodo(nodi[i], true, ramo, sl) - W_H_CHIUSO) };
  };
  const wpos = (i, sp, nd) => {
    /* Nel grafo la posizione la porta il nodo (versione 23: e' libera, la sposta l'utente). Nell'ultima volta la
       calcola la serpentina, come sempre: quello che e' avvenuto non si dispone. */
    if (nd && nd.x !== undefined) return { x: nd.x, y: nd.y, r: -1, c: -1 };
    const r = Math.floor(i / W_COL); const c = r % 2 ? W_COL - 1 - (i % W_COL) : i % W_COL;
    const giu = sp && sp.riga >= 0 && r > sp.riga ? sp.px : 0;
    return { x: W_PAD + c * W_PX, y: W_PAD + r * W_PY + giu, r, c };
  };
  /* ---- La geometria di un collegamento (versione 24) ----
     Esce dal fianco destro del nodo che parte, entra nel fianco sinistro del nodo che arriva, sempre all'altezza
     del nodo **chiuso** (43,5 px). Cosi' un nodo che si apre non fa saltare i suoi collegamenti: le posizioni si
     calcolano prima di stampare, mai misurando la pagina dopo averla disegnata (regola del canvas, versione 20).
     Quando il nodo d'arrivo sta **a sinistra** di quello di partenza — e con le posizioni libere succede — il filo
     esce a destra, gira e rientra da sinistra: e' la forma che n8n da' ai ritorni, e senza di essa un arco
     all'indietro passerebbe dritto sopra i due nodi. */
  const W_MEZZO = W_H_CHIUSO / 2;
  const arcoVia = (a, b) => {
    const x1 = a.x + W_W, y1 = a.y + W_MEZZO, x2 = b.x, y2 = b.y + W_MEZZO;
    if (x2 >= x1 + 24) {
      const d = Math.max(38, Math.min(150, (x2 - x1) * 0.55));
      return { d: 'M' + x1 + ' ' + y1 + ' C ' + (x1 + d) + ' ' + y1 + ', ' + (x2 - d) + ' ' + y2 + ', ' + x2 + ' ' + y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
    }
    /* Il ritorno **di riga**: il nodo d'arrivo sta a sinistra ma piu' in basso — e' il capoverso del disegno. Una
       S sola, con le maniglie tenute dentro la colonna (1008 px) perche' il canvas non scorre di lato e quello che
       esce dal bordo lo taglia `overflow:hidden`. */
    if (Math.abs(y2 - y1) >= 12) {
      /* La maniglia non va tenuta dentro la colonna: misurato, una S da (970, 79) a (36, 289) con maniglia 110
         sfonda a destra di **6 px** soli, perche' il punto d'arrivo tira la curva subito a sinistra. Tenerla corta
         faceva una diagonale dritta, che di una curva non ha niente: misurato, con maniglia 250 il punto piu' a
         destra della curva e' **996 px** e il piu' a sinistra **10**, cioe' dentro la colonna da 1008. */
      const h = Math.max(40, Math.min(150, (x1 - x2) * 0.18));
      return { d: 'M' + x1 + ' ' + y1 + ' C ' + (x1 + h) + ' ' + y1 + ', ' + (x2 - h) + ' ' + y2 + ', ' + x2 + ' ' + y2,
               mx: (x1 + x2) / 2, my: (y1 + y2) / 2 };
    }
    /* Il ritorno **sulla stessa riga**: dritto passerebbe sopra i due nodi, quindi scende e rientra da sotto —
       la forma che n8n da' ai suoi anelli. */
    const h = Math.min(90, Math.max(40, (x1 - x2) * 0.2));
    const my = Math.max(y1, y2) + 92, mx = (x1 + x2) / 2;
    return { d: 'M' + x1 + ' ' + y1 + ' C ' + (x1 + h) + ' ' + y1 + ', ' + (mx + h) + ' ' + my + ', ' + mx + ' ' + my
              + ' C ' + (mx - h) + ' ' + my + ', ' + (x2 - h) + ' ' + y2 + ', ' + x2 + ' ' + y2, mx, my };
  };
  const ICONA_NODO = { rapido: 'i-bolt', standard: 'i-bot', esperto: 'i-star' };
  /* Il numero del passo non e' piu' un identificatore: in un grafo due rami che partono dallo stesso nodo portano
     **lo stesso numero** (sono lo stesso momento del lavoro). Quindi nel grafo il nodo si sceglie dal suo `id`, e
     nell'ultima volta — che e' una catena — dal numero, come prima. */
  const nodoScelto = (nd, sel, ramo) => (ramo ? String(sel) === String(nd.id) : sel === nd.n);
  /* ---- Il flag `soloLettura` (versione 27, decisione 72) ----
     Il telefono mostra **lo stesso canvas** della Console, ma non lo compone: si guarda e si firma. Il flag non e'
     una seconda resa — e' lo stesso disegno con i **gesti spenti**: niente prese, niente «+» sull'arco, niente
     «x», niente trascinamento del nodo, niente «Riordina» ne' «Aggiungi». Restano il nodo che si apre (che e'
     lettura: dice modello, strumenti ed esito), lo zoom e lo spostamento della vista. Cosi' non ci sono due
     canvas da tenere allineati: c'e' un canvas e un interruttore. */
  function nodoWorkflow(m, w, nd, i, sel, ramo, tot, sp, multi, sl) {
    const p = wpos(i, sp, nd);
    const on = nodoScelto(nd, sel, ramo);
    const inMulti = ramo && multi.length > 1 && multi.indexOf(nd.id) >= 0;
    const compone = ramo && !sl;
    const cls = (nd.innesco ? 'wnode inn' : nd.titolare ? 'wnode tit' + (nd.stato === 'attesa' ? ' att' : '') : 'wnode')
      + (on ? ' on' : '') + (inMulti ? ' mult' : '') + (compone ? ' presa' : '');
    const icona = nd.innesco ? 'i-bolt' : nd.titolare ? 'i-hand' : ICONA_NODO[nd.modello] || 'i-bot';
    const clau = nd.innesco ? (m.RAMO_CLAUSOLE.find(c => c.id === nd.clausola) || m.RAMO_CLAUSOLE[1]) : null;
    const sotto = nd.innesco ? esc(nd.testo) : nd.titolare ? esc(nd.regola) : `Passo ${nd.n} · ${esc(nd.modello)}`;
    /* Le azioni del nodo aperto (decisione 64: «il nodo aperto e' l'editor»). Stanno dentro il nodo, sotto i suoi
       campi, e ci sono solo nella prossima volta — l'ultima volta e' successa e non si modifica. Il nodo del
       titolare non si scavalca, non si sposta e non si toglie: il divieto sta nel modello, non nel gesto. */
    const azA = on && compone && !nd.titolare ? `<div class="azioni-n">
        <span class="rb pieno" data-az="ramo-aggiungi" data-id="${esc(nd.id)}" title="Aggiungi un passo dopo questo">${ic('i-plus')}</span>
        <span class="rb"${!nd.innesco && tot > 3 ? ` data-az="ramo-togli" data-id="${esc(nd.id)}"` : ' aria-disabled="true"'} title="Toglilo">${ic('i-x')}</span>
      </div>` : '';
    const campi = on && !nd.titolare && !nd.innesco ? `<div class="campi">
        <span class="fl">Modello</span><span class="fv"${compone ? ` data-az="ramo-modello" data-id="${esc(nd.id)}" title="Cambia il modello"` : ''}><span>${esc((m.MODELLI[nd.modello] || {}).nome || nd.modello)}</span>${ic('i-chev')}</span>
        <span class="fl">Strumenti</span>${(nd.strumenti.length ? nd.strumenti : ['Nessuno']).map(s => `<span class="fv"><span>${esc(s)}</span>${ic('i-chev')}</span>`).join('')}
        ${nd.esito ? `<span class="fl">Esito dell'ultima volta</span><span class="fv"><span>${esc(nd.esito)}</span></span>` : ''}
      </div>${azA}` : '';
    /* Il nodo d'innesco apre due campi soli: quando parte, e il permesso. Il permesso e' la `clausola` che il
       modello ha gia' (decisione 66): chi autorizza in testa non deve far convergere i rami in coda. */
    const campiInn = on && nd.innesco ? `<div class="campi">
        <span class="fl">Quando parte</span><span class="fv"><span>${esc(nd.testo)}</span></span>
        <span class="fl">Permesso</span><span class="fv"${compone ? ` data-az="ramo-clausola" data-id="${esc(nd.id)}" title="${esc(clau.desc)}"` : ''}><span>${esc(clau.nome)}</span>${ic('i-chev')}</span>
      </div>${azA}` : '';
    const campiTit = on && nd.titolare ? `<div class="campi">
        <span class="fl">Regola che ferma qui la consegna</span><span class="fv"><span>${esc(nd.regola)}</span>${ic('i-chev')}</span>
        <span class="fl">Firma anticipata</span><span class="fv"><span>${w.firma ? 'Accesa' : 'Spenta — ogni uscita passa da te'}</span>${ic('i-chev')}</span>
      </div>` : '';
    /* Il piede. Nella prossima volta non porta numeri: di un passo che deve ancora succedere non si sa ne' il
       costo ne' la durata. **E nell'ultima volta nemmeno** (versione 24): fino a ieri un passo `da fare` stampava
       la sua **stima** sotto la parola «misurati» — 33,20 € su 71,20 nel primo workflow. Adesso dice «non ancora»,
       che e' la verita' e non costa un numero inventato. */
    const piede = nd.innesco
      ? `<span>${esc(ramo ? clau.nome.toLowerCase() : nd.testo)}</span>`
      : nd.titolare
        ? `<span>${esc(ramo ? 'aspetterà la tua firma' : nd.quando || 'non ancora consegnata')}</span>`
        : ramo
          ? `<span>${nd.nato ? 'passo nuovo' : 'come l\'ultima volta'}</span>`
          : nd.stato === 'da fare'
            ? `<span>non ancora${nd.stima ? ' · ≈ ' + esc(nd.stima) : ''}</span>`
            : `<span>${esc(nd.durata || '—')}</span><span class="eur">${eur(nd.costo)}</span>`;
    return `<div class="${cls}" style="left:${p.x}px;top:${p.y}px" data-az="nodo" data-n="${nd.n}"${nd.id ? ` data-id="${esc(nd.id)}"` : ''} title="${esc(nd.nome)}">
      <div class="hd"><span class="nic">${ic(icona)}</span><div class="tt"><b>${esc(nd.nome)}</b><span>${sotto}</span></div></div>
      <div class="ft">${piede}</div>
      ${campi}${campiInn}${campiTit}</div>`;
  }
  /* ---- Quanti nodi, se aperti, ne coprirebbero un altro (versione 30) ----
     Il conto che accende la pillola. Non guarda lo stato di adesso ma un'ipotesi — «se lo apri» — perche' e'
     quello che il titolare deve sapere **prima** di aprirlo, non dopo. Vale solo nel grafo: nell'«ultima volta»
     la serpentina fa scendere le righe sotto quella aperta, quindi la copertura non puo' esistere.
     Dopo il passo a 342 questo conto e' **zero** su tutti i disegni che dispone il prodotto: si accende solo se
     il titolare ha stretto due nodi trascinandoli, che e' l'unico modo rimasto — e giustamente, perche' un freno
     al trascinamento sposterebbe un nodo dove lui non l'ha messo (regola 42). */
  function canvasCoperti(nodi, ramo, sl) {
    if (!ramo) return { nodi: 0, coppie: 0 };
    let quanti = 0, coppie = 0;
    nodi.forEach(a => {
      const h = altNodo(a, true, ramo, sl);
      let n = 0;
      nodi.forEach(b => {
        if (a === b) return;
        if (Math.min(a.x + W_W, b.x + W_W) - Math.max(a.x, b.x) > 2
         && Math.min(a.y + h, b.y + W_H_CHIUSO) - Math.max(a.y, b.y) > 2) n++;
      });
      if (n) { quanti++; coppie += n; }
    });
    return { nodi: quanti, coppie };
  }
  /* ---- Le misure del disegno (versione 27) ----
     Dove comincia e dove finisce il grafo, in coordinate del canvas. Serve allo scatto «tutto dentro» del
     telefono (decisione 73) e alle prove: e' un conto sulle posizioni, **non** una posizione ricalcolata —
     regola 42, le posizioni sono dati del titolare e non le tocca nessuno. */
  function canvasMisure(m, w, ramo) {
    const nodi = ramo ? m.ramoDi(w).nodi : w.nodi;
    const pos = nodi.map((nd, i) => wpos(i, { riga: -1, px: 0 }, ramo ? nd : null));
    const sinistra = Math.min(...pos.map(p => p.x)), destra = Math.max(...pos.map(p => p.x)) + W_W;
    const alto = Math.min(...pos.map(p => p.y)), basso = Math.max(...pos.map(p => p.y)) + W_H_CHIUSO;
    return { sinistra, destra, alto, basso, largo: destra - sinistra, alto_: basso - alto };
  }
  /* Lo scatto d'ingresso «tutto dentro» (decisione 73): l'ingrandimento che fa stare **tutto il grafo** nella
     larghezza che si ha, e lo spostamento che ne appoggia il fianco sinistro al bordo. Sul telefono la larghezza
     utile e' 278,4 px e il grafo ne misura 910: 278,4 / 910 = **0,306**. Non e' una disposizione nuova — e' la
     stessa, guardata da piu' lontano. */
  const canvasTuttoDentro = (m, w, ramo, vista) => {
    const q = canvasMisure(m, w, ramo);
    const z = Math.min(1, vista / q.largo);
    return { zoom: z, pan: { x: -q.sinistra * z, y: 0 } };
  };
  /* Lo stringimento della vista, scritto una volta sola: lo usano `canvasWorkflow` per stampare, la seconda
     scala qui sotto e i gesti del telefono. Se stessero in tre posti finirebbero per dire tre cose. */
  const canvasStringi = (px, z, vista) => Math.max(Math.min(0, px), Math.min(0, vista - 1008 * z));
  /* La seconda scala (decisione 73): scala 1 centrata su un nodo. È lo stato in cui porta il tocco sul telefono,
     ed è anche quello in cui `?nodo=` apre la pagina — un indirizzo e un dito devono lasciare lo stesso schermo,
     se no la cattura non è la schermata. La posizione del nodo si legge da dov'è: nel grafo la porta il nodo
     (regola 42), nell'ultima volta la calcola la serpentina. */
  const canvasSuNodo = (m, w, ramo, chiave, vista) => {
    const nodi = ramo ? m.ramoDi(w).nodi : w.nodi;
    const i = nodi.findIndex(nd => (ramo ? String(nd.id) === String(chiave) : String(nd.n) === String(chiave)));
    if (i < 0) return null;
    const p = wpos(i, { riga: -1, px: 0 }, ramo ? nodi[i] : null);
    return { zoom: 1, pan: { x: canvasStringi(vista / 2 - (p.x + W_W / 2), 1, vista), y: 0 } };
  };
  /* opz = { soloLettura, vista (la larghezza che si vede, 1008 nella Console), barra, chips, mappa } */
  function canvasWorkflow(m, w, sel, ramo, zoom, multi, pan, opz) {
    /* ---- Un canvas, due tempi (versione 22), e dalla 24 due **forme** ----
       «L'ultima volta» e' una catena avvenuta: la serpentina la dispone da sola, gli archi vanno da un nodo al
       seguente, e non si tocca. «La prossima volta» e' il **grafo** che l'utente ha chiesto: posizioni libere,
       archi da `G.archi`, fan-out e fan-in illimitati, il significato sul collegamento e il nodo d'innesco in
       testa. Le due strade condividono nodo, griglia, porte e barra: e' lo stesso canvas, non due disegni. */
    const G = ramo ? m.ramoDi(w) : null;
    const nodiFonte = ramo ? G.nodi : w.nodi;
    const wOrig = w;
    w = Object.assign({}, w, { nodi: nodiFonte });
    const n = w.nodi.length;
    const righe = Math.ceil(n / W_COL);
    opz = opz || {};
    const sl = !!opz.soloLettura;                 /* il telefono: si guarda, non si compone (decisione 72) */
    /* la spinta si calcola **dopo** `sl`, perche' l'altezza del nodo aperto dipende da quale superficie lo mostra */
    const sp = ramo ? { riga: -1, px: 0 } : spintaDi(w.nodi, sel, ramo, sl);
    const compone = ramo && !sl;
    const vista = opz.vista || 1008;              /* quanta larghezza si vede: 1008 nella Console, 278,4 sul telefono */
    const conBarra = opz.barra !== false, conChips = opz.chips !== false, conMappa = opz.mappa !== false;
    /* ---- Lo zoom vale su tutte e due le tab (versione 27, decisione 72) ----
       Fino alla 26 era `ramo ? zoom : 1`: «L'ultima volta» — la tab dove stanno i costi, le durate e «aspetta la
       tua firma» — era a scala fissa, senza zoom e senza mappa. Se il telefono entra a 0,306 su una tab sola, la
       stessa pagina avrebbe due misure: qui lo zoom e' del canvas, non della tab. */
    const z = zoom || 1;
    /* Quanto e' alto il contenuto: nel grafo lo dice il nodo piu' in basso (le posizioni sono libere, il canvas
       cresce dietro a quello che l'utente ha disegnato), nell'ultima volta le righe della serpentina. 78: le porte
       sotto l'ultima riga. La barra in fondo (62) sta **fuori** dalla cornice che si scala: e' un comando, non
       disegno, e non si rimpicciolisce con lo zoom. */
    /* ---- La riserva in fondo, e la mini-mappa che non copre piu' un nodo (versione 29) ----
       Trovato guardando l'anteprima del passo a 342 e poi misurato: la `.wmini` da 200x120 sta a
       `left:16px; bottom:78px`, e con l'ultima riga a y=720 finiva **sopra il nodo del titolare** — 180x22 px,
       il 22 % della card, proprio la striscia dove e' scritto «aspetterà la tua firma». Chiudere una copertura
       aprendone un'altra, e per giunta sul nodo che dice chi firma, non e' un affare.
       La mappa **non si sposta**: sta dove la mette il riferimento. Si riserva lo spazio, cosi' galleggia sul
       vuoto. Quanto: la mappa e' alta 120 e sta 16 px sopra la barra da 62, quindi il suo bordo alto e' a
       `basso - 136`; sotto l'ultima riga servono ancora le porte e le loro etichette (17 + 14). Da qui i 167.
       Il conto si fa in due tempi perche' `serveMappa` guarda `basso`: prima la riserva normale, con quella si
       decide se la mappa c'e', e solo allora si allarga. */
    const RISERVA = 78 + W_PAD;            /* le porte sotto l'ultima riga, piu' il margine */
    const RISERVA_MAPPA = 136 + 31;        /* la mappa con il suo stacco, piu' porte ed etichette dell'ultima riga */
    const bassoNodi = ramo
      ? Math.max(...w.nodi.map(nd => nd.y + altNodo(nd, nodoScelto(nd, sel, ramo), ramo, sl)))
      : W_PAD + (righe - 1) * W_PY + W_H + sp.px;
    const bassoProv = bassoNodi + RISERVA;
    const serveMappa = conMappa && (z !== 1 || bassoProv > 820);
    const basso = bassoNodi + (serveMappa ? Math.max(RISERVA, RISERVA_MAPPA) : RISERVA);
    const alt = Math.round(basso * z) + (conBarra ? 62 : 0);
    const nodi = w.nodi.map((nd, i) => nodoWorkflow(m, w, nd, i, sel, ramo, n, sp, multi || [], sl)).join('');
    /* ---- Che cosa nasconde la card aperta (versione 29) ----
       Il nodo aperto ha `z-index:3` e sfondo opaco: quello che gli finisce sotto **non si vede**. Ma tre cose
       venivano disegnate lo stesso, e due di loro **sopra** di lui, perche' stanno piu' in alto nella pila:
       le **prese** del collegamento (`.wio`, z-index 5) e i **tag** del contratto. Misurato col colpo del mouse:
       aprendo un nodo, le due prese del nodo coperto erano disegnate sull'editor e **rispondevano al clic** —
       da li' nasceva un collegamento **da un nodo che non si vede**, cioe' un passo, e quindi un euro, attribuito
       a un dipendente che il titolare non ha visto. I «+» e le «x», che stanno piu' in basso nella pila, erano
       gia' morti: quelli non cambiano.
       La regola che ne esce, e vale per tutti e tre: **quello che appartiene a un nodo nascosto dalla card non si
       disegna**. Non e' un velo ne' uno spegnimento — e' non disegnare qualcosa che gia' non si vede, ma che
       rispondeva. Dalla versione 29 il caso e' comunque raro: col passo a 342 un nodo aperto non copre piu'
       nessuno, e resta solo la disposizione stretta fatta a mano. */
    const iOn = w.nodi.findIndex(nd => nodoScelto(nd, sel, ramo));
    const cardOn = iOn < 0 ? null : (() => { const q = wpos(iOn, sp, ramo ? w.nodi[iOn] : null);
      return { x: q.x, y: q.y, h: altNodo(w.nodi[iOn], true, ramo, sl) }; })();
    /* il punto sta sotto la card aperta? (1 px di tolleranza: le prese stanno **sul** fianco del nodo) */
    const nascosto = (x, y) => !!cardOn && x > cardOn.x - 1 && x < cardOn.x + W_W + 1 && y > cardOn.y && y < cardOn.y + cardOn.h;
    /* Le porte del riferimento: sotto ogni nodo che non e' il titolare, una per il modello e una per ogni
       strumento. Spente quando il passo non e' ancora stato fatto: una porta accesa dice che quello strumento e'
       stato davvero usato. Nel grafo l'innesco non ne ha — non usa modelli, dice quando si comincia. */
    const porte = w.nodi.map((nd, i) => {
      if (nd.titolare || nd.innesco) return '';
      /* ---- Le porte del nodo **aperto** non si stampano (versione 29) ----
         Scendevano con lui — altrimenti finivano dietro la sua stessa card — e cosi' andavano addosso alle
         etichette del nodo sotto: misurate **cinque** coppie sovrapposte per 6 px. Ma mentre il nodo e' aperto
         quelle porte non dicono niente di nuovo: sono la **prima parola tagliata** dei campi che la card stampa
         per esteso («Archivio» per «Archivio del cliente»), e nel grafo sono per giunta sempre spente. Un
         doppione piu' povero, che era anche l'unica cosa che si sovrapponeva: non stamparlo chiude cinque scontri
         su cinque senza spostare una coordinata. Quando il nodo si richiude, tornano. */
      if (nodoScelto(nd, sel, ramo)) return '';
      const p = wpos(i, sp, nd);
      const giu = 0;
      const corta = t => { const w0 = String(t).split(/[ ·]/)[0]; return w0.length > 11 ? w0.slice(0, 10) + '…' : w0; };
      const voci = [['Modello', true], ...nd.strumenti.slice(0, 2).map(s => [corta(s), true])];
      const spenta = ramo || nd.stato === 'da fare';
      return voci.map((v, k) => {
        const x = p.x + 34 + k * 62, y = p.y + W_H + giu;
        if (nascosto(x, y)) return '';
        return `<span class="wport${spenta ? ' off' : ''}" style="left:${x}px;top:${y}px"></span><span class="wplab" style="left:${x}px;top:${y + 8}px">${esc(v[0])}</span>`;
      }).join('');
    }).join('');
    /* ---- Gli archi ---- */
    let archi = '', prese = '', etic = '', piu = '', io = '', fuori = '';
    if (ramo) {
      const perId = {}; w.nodi.forEach(nd => { perId[nd.id] = nd; });
      const TIPI = {}; m.RAMO_TIPI.forEach(t => { TIPI[t.id] = t; });
      G.archi.forEach(a => {
        const da = perId[a.da], ab = perId[a.a];
        if (!da || !ab) return;
        const v = arcoVia(da, ab), tipo = a.tipo || 'poi';
        archi += `<path class="arc ${tipo}" data-arco="${esc(a.id)}" data-da="${esc(a.da)}" data-a="${esc(a.a)}" d="${v.d}"/>`;
        /* il bersaglio del clic e' un tratto invisibile largo 16 px sopra il filo: un filo da 2,2 px non si prende */
        if (!sl) prese += `<path class="presa" data-az="ramo-tipo" data-arco="${esc(a.id)}" data-da="${esc(a.da)}" data-a="${esc(a.a)}" d="${v.d}"><title>${esc(TIPI[tipo].nome + ' — ' + TIPI[tipo].desc)}</title></path>`;
        /* L'etichetta sta **sul collegamento**, ed e' li' che vive il significato (decisione 65): il nodo non
           cresce di porte, e il fan-out illimitato resta gratis. «poi» non si stampa: e' il caso di tutti gli
           archi di partenza (8 su 8), e scriverlo otto volte sarebbe rumore, non informazione. */
        if (tipo !== 'poi') etic += `<span class="warcl ${tipo}" style="left:${v.mx}px;top:${v.my - 20}px"${sl ? '' : ` data-az="ramo-tipo" data-arco="${esc(a.id)}"`} title="${esc(TIPI[tipo].desc)}">${esc(TIPI[tipo].nome)}${a.se ? ' ' + esc(a.se) : ''}</span>`;
        /* I due comandi del collegamento: il «+» (acceleratore 3 di n8n) infila un passo in mezzo, la «×» toglie
           il collegamento — senza di lei `ramoScollega` non aveva nessun gesto che la chiamasse. Il bersaglio e'
           38x40 px sul punto di mezzo del filo; il resto del filo (16 px di presa) gira fra i quattro
           significati, e l'etichetta sta 20 px piu' su, per non finire sotto i due cerchi. */
        if (!sl) piu += `<span class="warcz" style="left:${v.mx}px;top:${v.my}px"><span class="wplus" data-az="ramo-inserisci" data-arco="${esc(a.id)}" title="Infila un passo qui"><i>${ic('i-plus')}</i></span><span class="wdel" data-az="ramo-scollega" data-arco="${esc(a.id)}" title="Togli il collegamento"><i>${ic('i-x')}</i></span></span>`;
      });
      /* Le due prese di ogni nodo: da quella di destra si tira un collegamento nuovo, in quella di sinistra lo si
         lascia. L'innesco non ha entrata (prima di lui non c'e' lavoro) e il titolare non ha uscita (dopo la firma
         non c'e' altro lavoro): sono i due divieti del modello, disegnati. */
      if (!sl) w.nodi.forEach(nd => {
        /* La presa di un nodo che la card aperta nasconde non si disegna: stava a `z-index:5` contro il 3 della
           card, quindi si vedeva **sopra** l'editor e rispondeva al clic. Le proprie restano: la card e' la sua. */
        const suoi = nodoScelto(nd, sel, ramo);
        if (!nd.innesco && (suoi || !nascosto(nd.x, nd.y + W_MEZZO))) io += `<span class="wio ent" data-porta="ent" data-id="${esc(nd.id)}" style="left:${nd.x}px;top:${nd.y + W_MEZZO}px"></span>`;
        if (!nd.titolare && (suoi || !nascosto(nd.x + W_W, nd.y + W_MEZZO))) io += `<span class="wio usc" data-az="ramo-tira" data-porta="usc" data-id="${esc(nd.id)}" style="left:${nd.x + W_W}px;top:${nd.y + W_MEZZO}px" title="Tira un collegamento da qui"></span>`;
      });
      /* I rami che **non escono dall'azienda**: con il permesso «chiedi prima di consegnare» un ramo che non
         arriva alla firma resta dentro, e la pagina lo **dice** invece di vietarlo (nessuna validazione impone la
         convergenza: era il timore dell'utente, e non era fondato). */
      const esce = m.ramoEsce(wOrig);
      /* Anche i tag del **contratto** seguono la regola: non si stampano su una card che nasconde il nodo a cui
         appartengono. Sono `pointer-events:none` e senza `z-index`, quindi finivano sotto la card senza nemmeno
         il tooltip a recuperarli — la frase che dice che un ramo consegna **senza la firma del titolare**,
         sparita proprio dove serve. Col passo a 342 il caso non nasce piu' da solo. */
      fuori = esce.fuori.filter(nd => !nascosto(nd.x + W_W / 2, nd.y - 14)).map(nd => `<span class="wtag" style="left:${nd.x + W_W / 2}px;top:${nd.y - 14}px" title="Questo ramo non arriva alla tua firma: quello che produce resta in azienda">${ic('i-hand')}resta in azienda</span>`).join('')
        /* Con il permesso in testa gli stessi rami **escono**, senza passare dalla coda. Prima il canvas taceva
           proprio qui (decisione 71): cambiando il permesso i tag sparivano e non restava niente a dire che quel
           ramo consegnava da solo. Adesso lo dice, e dice entro che cosa. */
        + esce.anticipata.filter(nd => !nascosto(nd.x + W_W / 2, nd.y - 14)).map(nd => `<span class="wtag" style="left:${nd.x + W_W / 2}px;top:${nd.y - 14}px" title="Questo ramo consegna senza passare dalla coda: lo autorizza il permesso in testa, entro i tre freni">${ic('i-bolt')}esce senza la tua firma</span>`).join('');
    } else {
      archi = w.nodi.slice(0, -1).map((nd, i) => {
        const a = wpos(i, sp), b = wpos(i + 1, sp);
        const suc = w.nodi[i + 1];
        const cls = suc.titolare && suc.stato === 'attesa' ? 'arc att' : nd.stato === 'da fare' ? 'arc off' : 'arc';
        if (a.r === b.r) {
          const x1 = a.x + W_W, y1 = a.y + W_H / 2, x2 = b.x, y2 = b.y + W_H / 2;
          return `<path class="${cls}" d="M${x1} ${y1} C ${x1 + 22} ${y1}, ${x2 - 22} ${y2}, ${x2} ${y2}"/>`;
        }
        const x1 = a.x + W_W / 2, y1 = a.y + W_H, x2 = b.x + W_W / 2, y2 = b.y;
        return `<path class="${cls}" d="M${x1} ${y1} C ${x1} ${y1 + 74}, ${x2} ${y2 - 74}, ${x2} ${y2}"/>`;
      }).join('');
    }
    /* L'etichetta sull'arco che entra nel titolare: e' il numero che il canvas era stato scelto per far vedere —
       dove il lavoro si ferma ad aspettare una firma. */
    const ult = w.nodi[w.nodi.length - 1];
    const pb = wpos(w.nodi.length - 1, sp, ramo ? ult : null);
    const tag = !ramo && ult.stato === 'attesa'
      ? `<span class="wtag lime" style="left:${pb.x + W_W / 2}px;top:${pb.y - 15}px">${ic('i-bell')}aspetta la tua firma</span>` : '';
    /* ---- La mini-mappa (acceleratore 4) ----
       200x120 come quella di n8n. Non e' una figura: e' l'unico modo di sapere dove si e' quando il grafo esce
       dalla cornice, ed e' il secondo riferimento ad averla. Ogni nodo e' un rettangolo in scala, e il riquadro
       lime e' quello che si vede adesso. */
    /* La mini-mappa **compare quando serve** e non prima: n8n la fa comparire e sparire dopo 1 s, qui la regola e'
       che c'e' quando c'e' qualcosa da non vedere — il grafo ingrandito, o piu' alto della schermata. Cosi' non
       copre il disegno nei casi in cui il disegno si vede tutto. */
    /* La cornice sul telefono e' larga 278,4 px: la mappa da 200x120 ci coprirebbe il disegno, quindi li' non
       c'e' (`opz.mappa`). Nella Console vale su tutte e due le tab, come lo zoom. */
    const mini = serveMappa ? (() => {
      const largo = 1008, altoC = basso;
      const k = Math.min(198 / largo, 118 / altoC);
      const q = w.nodi.map((nd, i) => { const p = wpos(i, sp, ramo ? nd : null); return `<i class="${nd.innesco ? 'inn' : nd.titolare ? 'tit' : ''}" style="left:${(1 + p.x * k).toFixed(1)}px;top:${(1 + p.y * k).toFixed(1)}px;width:${Math.max(3, W_W * k).toFixed(1)}px;height:${Math.max(2, W_H_CHIUSO * k).toFixed(1)}px"></i>`; }).join('');
      const px0 = canvasStringi((pan && pan.x) || 0, z, vista);
      const vw = Math.min(198, vista * k / z), vh = 118;
      return `<div class="wmini" title="La mappa del flusso: il riquadro è quello che vedi">${q}<b style="left:${(1 + (-px0 / z) * k).toFixed(1)}px;top:1px;width:${vw.toFixed(1)}px;height:${vh.toFixed(1)}px"></b></div>`;
    })() : '';
    /* La barra dello zoom. Il tasto di mezzo dice l'ingrandimento e riporta allo **scatto d'ingresso**: nella
       Console e' il 100 %, sul telefono e' «tutto dentro» (decisione 73), che li' e' lo stato in cui la pagina si
       apre. Una parola sola, due significati veri: il tasto rimette le cose come le hai trovate. */
    const zoomBar = `<div class="wzoombar">
      <span class="rb" data-az="ramo-zoom" data-v="meno" title="Rimpicciolisci (−)">${ic('i-dn')}</span>
      <span class="zv" data-az="ramo-zoom" data-v="uno" title="${sl ? 'Rimetti tutto dentro' : 'Torna al 100 % (0)'}">${Math.round(z * 100)} %</span>
      <span class="rb" data-az="ramo-zoom" data-v="piu" title="Ingrandisci (+)">${ic('i-up')}</span>
    </div>`;
    /* Il conto in cima a sinistra: quanti passi, quanti collegamenti, quanti rami restano dentro. E' la riga che
       legge il grafo, e sostituisce il nome che il gesto non ha. */
    const passiRamo = ramo ? w.nodi.filter(nd => !nd.innesco && !nd.titolare).length : 0;
    const esceC = ramo ? m.ramoEsce(wOrig) : null;
    const fuoriN = esceC ? esceC.fuori.length : 0;
    const antN = esceC ? esceC.anticipata.length : 0;
    /* ---- La pillola che lo dice, e il gesto che c'e' gia' (versione 30, decisione del titolare) ----
       «Vorrei che il prodotto se ne accorgesse e me lo proponesse». Sta qui, nella riga che gia' enuncia i fatti
       del grafo, ed e' la **sola** pillola della riga che si clicca: le altre sono referti, questa e' una
       proposta, e l'icona `i-grid` — la stessa della pillola «Riordina» in fondo — dice che gesto innesca.
       Il gesto e' **«Riordina»**, quello che esiste gia': rimette i nodi sulla griglia al passo nuovo, e col
       passo a 342 questo **chiude la copertura**. Non si e' inventato un secondo gesto che riordina «solo un
       po'»: una parola, un significato.
       La parola dice «nodi» e non «passi», e non e' pignoleria: la barra distingue «l'innesco, 7 passi e la tua
       firma», quindi il coperto puo' essere l'innesco o **la tua firma**, e chiamarlo «passo» mentirebbe proprio
       nel caso piu' grave.
       Sul telefono non c'e' (`chips: false`), ed e' voluto: li' non si trascina, quindi il caso non si puo'
       creare, e non c'e' «Riordina» da premere. La striscia del telefono porta il **contratto**, e una faccenda
       di disposizione accanto a «esce senza la tua firma» la svaluterebbe. */
    const cop = ramo && conChips && !sl ? canvasCoperti(w.nodi, ramo, sl) : { nodi: 0 };
    const chipCop = cop.nodi
      ? `<span class="chip vai" data-az="ramo-riordina" title="Rimette i nodi in ordine sulla griglia: i collegamenti, i nomi e i numeri dei passi non cambiano">${ic('i-grid')}${cop.nodi === 1 ? '1 nodo ne copre un altro quando lo apri' : cop.nodi + ' nodi si coprono quando li apri'} · Riordina</span>`
      : '';
    const cima = ramo && conChips ? `<div class="wsc">${chipCop}<span class="chip">${ic('i-rows')}${passiRamo} passi · ${G.archi.length} collegamenti</span>${fuoriN ? `<span class="chip">${ic('i-hand')}${fuoriN} ${fuoriN === 1 ? 'ramo resta' : 'rami restano'} in azienda</span>` : ''}${antN ? `<span class="chip">${ic('i-bolt')}${antN} ${antN === 1 ? 'ramo esce' : 'rami escono'} senza la tua firma</span>` : ''}${G.ciclo ? `<span class="chip">${ic('i-warn')}il flusso si chiude ad anello</span>` : ''}</div>` : '';
    /* Lo spostamento della vista: serve quando il disegno ingrandito e' piu' largo di quello che si vede. Nella
       Console e' 1008 px, e allora serve da 1,25x in su; sul telefono sono 278,4, e allora serve **sempre** —
       sono i 632 px di scorrimento laterale che la decisione 72 ha accettato pur di non ricalcolare le posizioni
       (regola 42). In verticale non serve: il canvas cresce in basso e il verticale lo fa la pagina. */
    const px = canvasStringi((pan && pan.x) || 0, z, vista);
    return `<div class="wcanvas${compone ? ' comp' : ''}${sl ? ' sl' : ''}" style="height:${alt}px" data-zoom="${z}" data-pan="${px}" data-vista="${vista}">
      <div class="wzoom" style="width:1008px;height:${basso}px;transform:translate(${px}px,0) scale(${z})">
        <div class="grid" aria-hidden="true"></div>
        <svg class="edges" viewBox="0 0 1008 ${basso}" width="1008" height="${basso}" aria-hidden="true">${archi}<path class="tira" d="" style="display:none"/>${prese}</svg>
        ${porte}${piu}${nodi}${etic}${io}${fuori}${tag}
      </div>
      ${cima}${mini}${zoomBar}
      ${conBarra ? `<div class="wbar"><div class="tx"><b>${ramo ? `${n} nodi · l'innesco, ${passiRamo} passi e la tua firma` : `${n} nodi · ${n - 1} passi e la tua firma`}</b><span>${ramo ? `${esc(w.nome)} · ${esc(w.perimetro)} · quello che succederà la prossima volta: nessun costo misurato, perché non è ancora successo` : `${esc(w.nome)} · ${esc(w.perimetro)} · ${eur(w.costo)} · ${w.minuti} min, misurati sui passi già avvenuti`}</span></div>
        ${compone ? `<div class="azioni-b">
          <span class="pill picc" data-az="ramo-riordina" title="Rimetti in ordine il disegno (R)">${ic('i-grid')}Riordina</span>
          <span class="pill picc" data-az="ramo-aggiungi" data-id="${esc((multi && multi.length === 1 ? multi[0] : '') || 'inn')}" title="Aggiungi un passo">${ic('i-plus')}Aggiungi</span>
        </div>` : ''}
        <span class="pill" data-az="pagina" data-pagina="esecuzione" data-id="${w.chi}">Vedi l'esecuzione ${ic('i-ne')}</span></div>` : ''}
    </div>`;
  }

  /* ---------- i componenti in HTML ---------- */
  const S = n => `<i></i>`.repeat(n);
  const dots = lv => `<span class="dots l${lv}">${S(5)}</span>`;
  /* Avatar generato dal seme (ruolo o seme scelto) nello stato del dipendente; `stato` lo forza (es. la richiesta che aspetta), `extra` aggiunge attributi (data-anima, data-segue). */
  /* l'orbe riceve la tinta del dipendente e quella del suo dipartimento (versione 10): il modo con cui le usa lo decide l'aspetto della pagina */
  const av = (m, e, size, stato, extra, opz) => { const d = m.dipDi(e); return `<span class="av${size ? ' ' + size : ''}"${extra ? ' ' + extra : ''}>${window.DGT_AVATAR.html(m.semeDi(e), stato || e.stato, Object.assign({ tinta: m.tintaDi ? m.tintaDi(e) : undefined, dip: d ? d.tinta : undefined }, opz || {}))}</span>`; };
  const pair = (m, ids, size, max) => {
    const lst = ids.map(id => m.byId[id]).filter(Boolean);
    const shown = max ? lst.slice(0, max) : lst;
    const rest = lst.length - shown.length;
    /* nelle pile (card dei dipartimenti e degli obiettivi, coppie della barra agenda) lo stato è il gesto del corpo, non il punto:
       i punti si sovrapporrebbero ai vicini (scelta dell'utente, 2026-09-05) */
    return `<span class="pair">${shown.map(e => av(m, e, size, undefined, undefined, { segnale: 'gesto' })).join('')}${rest > 0 ? `<span class="more">+${rest}</span>` : ''}</span>`;
  };
  /* Un messaggio del filo (versione 15): la bolla del dipendente o quella del titolare, o la riga di sistema (una consegna
     che entra nel filo). Chi la stampa aggiunge sotto, se serve, la riga della consegna. */
  const messaggio = (m, e, v) => v.da === 'sistema'
    ? `<div class="msg sistema"><span class="chip light">${ic('i-bell')}<span>${esc(v.ora)} · ${esc(m.etichetta(e))} ${esc(v.testo)}</span></span></div>`
    : `<div class="msg ${v.da === 'io' ? 'io' : 'dip'}">${v.da === 'io' ? `<span class="av persona">${esc(m.azienda.titolare.iniziali)}</span>` : av(m, e, 's')}<div class="bub">${esc(v.testo)}<span class="ora">${esc(v.ora)}${v.passo ? ' · al passo ' + v.passo : ''}</span></div></div>`;

  const iconaTipo = { post: 'i-mega', documento: 'i-doc', lista: 'i-list', proposta: 'i-receipt', revisione: 'i-bolt' };
  const nomeTipo = { post: 'Post', documento: 'Documento', lista: 'Lista', proposta: 'Proposta', revisione: 'Revisione' };

  function chipStato(m, e) {
    const s = e.stato;
    if (e.pausa) return `<span class="chip">${ic('i-pause')}In pausa</span>`;
    if (s === 'lavoro') return `<span class="chip lime">${ic('i-play')}Al lavoro</span>`;
    if (s === 'attesa') return `<span class="chip lime">${ic('i-bell')}Da approvare</span>`;
    if (s === 'errore') return `<span class="chip rosa">${ic('i-warn')}Errore</span>`;
    if (s === 'pianificato') return `<span class="chip">${ic('i-clock')}${esc(e.att.quando)}</span>`;
    return `<span class="chip">Libero</span>`;
  }
  /* L'esito di una richiesta. **«Uscita», non «Approvata», quando non l'ha approvata il titolare** (versione 22,
     conferma b): `r.deciso` è il riferimento alla routine o alla regola che ha deciso al posto suo. Prima la riga
     diceva «Approvata» anche per `r17`, che nessuno ha approvato: l'autore era un dettaglio in fondo alla riga e il
     participio era l'affermazione principale — cioè la riga negava la spina dorsale invece di raccontarla.
     Il lime resta la firma del titolare e non si presta a nient'altro: un'uscita automatica porta la pillola neutra
     e l'icona dell'invio. */
  const chipEsito = r => r.stato === 'attesa' ? `<span class="chip ink">${ic('i-bell')}Da approvare</span>`
    : r.stato === 'approvata' ? (r.deciso ? `<span class="chip">${ic('i-send')}Uscita</span>` : `<span class="chip lime">${ic('i-check')}Approvata</span>`)
    : r.stato === 'modifiche' ? `<span class="chip">${ic('i-pen')}Modifiche</span>` : `<span class="chip rosa">${ic('i-x')}Rifiutata</span>`;

  const eur = v => (Math.round(v * 10) / 10).toString().replace('.', ',') + ' €';
  /* Badge del confronto con i 30 giorni precedenti: la freccia dice il verso, il colore se è un bene (`meglioSeSale`). */
  const delta = (ora, prima, meglioSeSale, fmt) => {
    if (prima === undefined || prima === null) return '';
    const d = Math.round((ora - prima) * 10) / 10; if (!d) return `<span class="badge flat">=</span>`;
    const bene = meglioSeSale ? d > 0 : d < 0;
    return `<span class="badge ${bene ? 'up' : 'down'}">${ic(d > 0 ? 'i-up' : 'i-dn')}${fmt ? fmt(Math.abs(d)) : Math.abs(d)}</span>`;
  };

  /* Differenze fra due elenchi (LCS): ops '=' | '-' | '+'. */
  function lcs(a, b) {
    const n = a.length, k = b.length, T = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = k - 1; j >= 0; j--) T[i][j] = a[i] === b[j] ? T[i + 1][j + 1] + 1 : Math.max(T[i + 1][j], T[i][j + 1]);
    const ops = []; let i = 0, j = 0;
    while (i < n && j < k) { if (a[i] === b[j]) { ops.push(['=', a[i]]); i++; j++; } else if (T[i + 1][j] >= T[i][j + 1]) { ops.push(['-', a[i]]); i++; } else { ops.push(['+', b[j]]); j++; } }
    while (i < n) ops.push(['-', a[i++]]); while (j < k) ops.push(['+', b[j++]]);
    return ops;
  }
  /* Differenze per parola dentro un paragrafo cambiato: parole tolte a sinistra (rosa), aggiunte a destra (lime). */
  function parole(a, b) {
    const L = [], R = [];
    /* le parole cambiate contigue stanno in un solo segno */
    const metti = (arr, cls, w) => { const u = arr[arr.length - 1]; if (u && u.cls === cls) u.w.push(w); else arr.push({ cls, w: [w] }); };
    lcs(a.split(' '), b.split(' ')).forEach(o => { if (o[0] === '=') { metti(L, '', o[1]); metti(R, '', o[1]); } else if (o[0] === '-') metti(L, 'del', o[1]); else metti(R, 'add', o[1]); });
    const testo = arr => arr.map(x => x.cls ? `<mark class="${x.cls}">${esc(x.w.join(' '))}</mark>` : esc(x.w.join(' '))).join(' ');
    return [testo(L), testo(R)];
  }
  /* Due colonne di paragrafi: uguali, cambiati (differenze per parola), tolti, aggiunti. */
  function differenze(A, B) {
    const ops = lcs(A, B), L = [], R = [];
    let i = 0;
    while (i < ops.length) {
      if (ops[i][0] === '=') { L.push(`<p>${esc(ops[i][1])}</p>`); R.push(`<p>${esc(ops[i][1])}</p>`); i++; continue; }
      const del = [], add = [];
      while (i < ops.length && ops[i][0] !== '=') { (ops[i][0] === '-' ? del : add).push(ops[i][1]); i++; }
      const k = Math.min(del.length, add.length);
      for (let j = 0; j < k; j++) { const [l, r] = parole(del[j], add[j]); L.push(`<p class="chg">${l}</p>`); R.push(`<p class="chg">${r}</p>`); }
      del.slice(k).forEach(t => L.push(`<p class="del">${esc(t)}</p>`)); add.slice(k).forEach(t => R.push(`<p class="add">${esc(t)}</p>`));
    }
    return [L.join(''), R.join('')];
  }

  return { css: prefissa(css, '.dirA'), variabili, av, pair, dots, chipStato, chipEsito, messaggio, iconaTipo, nomeTipo, eur, delta, differenze,
    canvasWorkflow, canvasMisure, canvasTuttoDentro, canvasSuNodo, canvasStringi, canvasCoperti, W_METRICHE: { COL: W_COL, PX: W_PX, PY: W_PY, PAD: W_PAD, W: W_W, H: W_H, H_CHIUSO: W_H_CHIUSO } };
})();
