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
`;

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

  return { css: prefissa(css, '.dirA'), variabili, av, pair, dots, chipStato, chipEsito, messaggio, iconaTipo, nomeTipo, eur, delta, differenze };
})();
