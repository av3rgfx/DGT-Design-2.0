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

   API: DIREZIONE_A.render(m, opz) → HTML; DIREZIONE_A.monta(radice, m, opz)
   disegna e collega i clic. opz = { pagina: 'home'|'richieste'|'dipartimento',
   dip: 'svi'|'mkt'|'ven'|'amm', tendina: 'chiusa'|'aperta'|'estesa',
   richiesta: indice, pannello: 'richieste'|'riepilogo' }.
   ===================================================================== */
window.DIREZIONE_A = (function () {
  const { ic, esc, prefissa, iconaDip } = window.DGT_UI;

  const css = `
.a-app{--black:#000;--card:#1C1C1C;--card-top:#262626;--gray-card:#4D4D4D;--round:#1E1E1E;--pill-src:#3A3A3A;--dots-box:#141414;
  --white:#FCFCFC;--summary:#F4F4F4;--docs:#E4E4E4;--thumb-pill:#A7A7A7;--lime:#B8FC64;--lime-deep:#A8E65D;--red:#F04848;--hangup:#F15E60;
  --badge-red:#F9A3A3;--badge-red-ink:#7A1F1F;--d1:#FC9498;--d2:#FCA464;--d3:#FCDC64;--d4:#A8FC64;--d5:#68FC64;--d-off:#4A4A4A;
  --t2:#9A9A9A;--t2-light:#6B6B6B;--ink:#0A0A0A;--font:"Urbanist",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;
  --r-card:28px;--r-inner:22px;--r-pill:9999px;--behind:var(--black);
  position:relative;width:1440px;min-height:900px;background:var(--black);color:var(--white);font:400 15px/20px var(--font);-webkit-font-smoothing:antialiased;padding-bottom:72px;overflow:hidden}
.a-app *{box-sizing:border-box}
.a-app h3,.a-app h4,.a-app h5,.a-app p{margin:0;font-weight:400}
.a-app svg{display:block}
.a-app [data-az]{cursor:pointer}
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
.av{width:48px;height:48px;border-radius:50%;display:grid;place-items:center;font-weight:500;font-size:15px;color:#2A2A2A;flex:none;border:2px solid transparent}
.av.a1{background:linear-gradient(135deg,#F7D9C4,#E7B49A)}.av.a2{background:linear-gradient(135deg,#D8E9F7,#A9C7E3)}.av.a3{background:linear-gradient(135deg,#E9DFF7,#C6B4E8)}
.av.a4{background:linear-gradient(135deg,#D9F0D3,#A8D7A2)}.av.a5{background:linear-gradient(135deg,#F9E5C4,#EAC48A)}.av.a6{background:linear-gradient(135deg,#F7D2DA,#E4A5B4)}
.av.s{width:36px;height:36px;font-size:12px}.av.xs{width:28px;height:28px;font-size:10px}
.av svg{width:14px;height:14px}
.pair{display:inline-flex;align-items:center}
.pair .av{border:2px solid var(--white)}.pair .av+.av,.pair .av+.more{margin-left:-10px}
.pair .more{height:28px;padding:0 9px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);font-size:11px;display:inline-flex;align-items:center;border:2px solid var(--white)}
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
.ncard .who div>b{display:block;font-weight:500;font-size:15px;line-height:20px}
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
.task .sel .pair{flex:none}.task .sel .pair .av{border-color:var(--white)}.task.gray .sel .pair .av,.task.dark .sel .pair .av{border-color:var(--ink)}
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
.tl .live .pair .av{border-color:var(--lime-deep)}
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
.elenco{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:24px}
.erow{height:56px;border-radius:var(--r-pill);background:linear-gradient(180deg,var(--card-top),var(--card));display:flex;align-items:center;gap:10px;padding:0 6px 0 8px;min-width:0}
.erow .av{width:40px;height:40px;font-size:13px}
.erow .tx{flex:1;min-width:0;line-height:16px}
.erow .tx b{display:block;font-weight:500;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.erow .tx span{display:block;font-size:11px;color:var(--t2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.erow .chip{height:24px;font-size:11px;max-width:150px}.erow .chip span{overflow:hidden;text-overflow:ellipsis}
.erow .rb.xs{background:transparent;border-color:rgb(255 255 255/.16)}
.erow.lav{background:var(--lime);color:var(--ink)}.erow.lav .tx span{color:rgb(0 0 0/.6)}.erow.lav .rb.xs{border-color:rgb(0 0 0/.16);color:var(--ink)}
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
.regole .lead .sel{height:40px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);display:inline-flex;align-items:center;gap:8px;padding:0 12px 0 14px;font-size:13px;white-space:nowrap;max-width:100%}
.regole .lead .sel svg{width:12px;height:12px}
/* ===== tendina del titolare: chiusa / aperta / estesa ===== */
.a-mini{position:fixed;right:0;top:240px;z-index:30;height:56px;padding:0 20px 0 12px;border-radius:var(--r-pill) 0 0 var(--r-pill);background:var(--lime);color:var(--ink);display:flex;align-items:center;gap:10px;box-shadow:0 20px 50px rgb(0 0 0/.6);font-size:14px;white-space:nowrap}
.a-mini .rb{width:36px;height:36px;background:var(--ink);color:var(--white);border-color:transparent}
.a-mini .rb svg{width:15px;height:15px}
.a-mini b{font-weight:500;font-size:22px;line-height:1}
.a-mini svg.ch{width:14px;height:14px;opacity:.7}
.a-mini.rie{top:308px;background:var(--white)}
.a-tend{position:fixed;right:0;top:112px;height:calc(100vh - 136px);max-height:764px;width:330px;z-index:30;background:var(--summary);color:var(--ink);border-radius:var(--r-card) 0 0 var(--r-card);box-shadow:0 30px 80px rgb(0 0 0/.7);display:grid;grid-template-rows:auto 1fr;grid-template-columns:minmax(0,1fr);--behind:var(--summary)}
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
.appr .face{position:absolute;left:50%;top:50px;transform:translateX(-50%);width:68px;height:68px;border-radius:50%;display:grid;place-items:center;font-size:24px;color:#3A2A22;border:0}
.appr .cap{position:absolute;left:14px;right:14px;top:126px;text-align:center;font-size:13px;line-height:17px;color:#EDEDED;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.appr .cap b{display:block;font-weight:500;font-size:15px;color:var(--white);overflow:hidden;text-overflow:ellipsis}
.appr .ctl{position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:8px}
.a-tend .sub{display:flex;align-items:center;gap:12px;padding:8px 0 0}
.a-tend .sub h5{font-size:18px;line-height:24px;flex:1}
.a-tend .sub .rb{width:36px;height:36px}.a-tend .sub .rb svg{width:14px;height:14px}
.qrow{height:48px;border-radius:var(--r-pill);background:var(--white);display:flex;align-items:center;gap:10px;padding:0 6px 0 8px;min-width:0;font-size:13px}
.qrow .av{width:32px;height:32px;font-size:11px}
.qrow .tx{flex:1;min-width:0;line-height:15px}
.qrow .tx b{display:block;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.qrow .tx span{display:block;font-size:11px;color:var(--t2-light)}
.qrow .rb.xs{background:transparent;border-color:rgb(0 0 0/.14);color:var(--ink)}
.qrow.on{background:var(--lime)}
.drow{display:grid;grid-template-columns:44px 1fr;gap:8px;font-size:12px;line-height:16px;color:#3E3E3E;padding:6px 0;border-top:1px solid rgb(0 0 0/.08)}
.drow span{color:var(--t2-light)}
.drow b{font-weight:500;color:var(--ink)}
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
`;

  const S = n => `<i></i>`.repeat(n);
  const dots = lv => `<span class="dots l${lv}">${S(5)}</span>`;
  const av = (m, e, size) => `<span class="av ${m.avatarClasse(e)}${size ? ' ' + size : ''}">${m.iniziali(e)}</span>`;
  const pair = (m, ids, size, max) => {
    const lst = ids.map(id => m.byId[id]).filter(Boolean);
    const shown = max ? lst.slice(0, max) : lst;
    const rest = lst.length - shown.length;
    return `<span class="pair">${shown.map(e => av(m, e, size)).join('')}${rest > 0 ? `<span class="more">+${rest}</span>` : ''}</span>`;
  };
  const iconaTipo = { post: 'i-mega', documento: 'i-doc', lista: 'i-list', proposta: 'i-receipt' };
  const nomeTipo = { post: 'Post', documento: 'Documento', lista: 'Lista', proposta: 'Proposta' };
  const nomePeriodo = { oggi: 'Oggi', ieri: 'Ieri', settimana: 'Ultimi 7 giorni', mese: 'Ultimi 30 giorni', prima: 'Prima' };
  /* in attesa: le più vecchie prima */
  const inAttesa = m => m.richiesteDi('attesa').slice().sort((a, b) => (b.giorno - a.giorno) || (a.min - b.min));

  function chipStato(m, e) {
    const s = e.stato;
    if (s === 'lavoro') return `<span class="chip lime">${ic('i-play')}Al lavoro</span>`;
    if (s === 'attesa') return `<span class="chip lime">${ic('i-bell')}Da approvare</span>`;
    if (s === 'errore') return `<span class="chip rosa">${ic('i-warn')}Errore</span>`;
    if (s === 'pianificato') return `<span class="chip">${ic('i-clock')}${esc(e.att.quando)}</span>`;
    return `<span class="chip">Libero</span>`;
  }
  const chipEsito = r => r.stato === 'attesa' ? `<span class="chip ink">${ic('i-bell')}Da approvare</span>`
    : r.stato === 'approvata' ? `<span class="chip lime">${ic('i-check')}Approvata</span>`
    : r.stato === 'modifiche' ? `<span class="chip">${ic('i-pen')}Modifiche</span>` : `<span class="chip rosa">${ic('i-x')}Rifiutata</span>`;
  const livelloOggi = e => ({ lavoro: e.att.da <= '09:00' ? 5 : 4, attesa: 3, errore: 1, pianificato: 0, libero: 0 })[e.stato];

  /* ---------- pezzi della home ---------- */
  function cardAttivita(m, e, i) {
    const pend = m.richiesteDi('attesa').some(a => a.chi === e.id);
    const tono = pend ? 'lime' : (i % 2 ? 'dark' : 'gray');
    const d = m.dipDi(e);
    return `<div class="ncard task ${tono}">
      <div class="who">${av(m, e)}<div><b>${esc(e.nome)}</b><span>${esc(e.ruolo)} · ${esc(d.nome)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${pend ? '<i class="dot"></i>' : ''}</span><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaDip[e.dip])}</span><div><div class="tt">${esc(e.att.titolo)}</div><div class="meta"><b>${esc(e.att.cliente)}</b><span>da</span><b>${esc(e.att.da)}</b></div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${av(m, e, 's')}<span>Passo ${e.att.passo[0]} di ${e.att.passo[1]}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  function cardEsecuzione(m, e, i) {
    if (e.stato === 'lavoro') return cardAttivita(m, e, i);
    const d = m.dipDi(e);
    const a = e.att;
    const err = e.stato === 'errore';
    const tono = err ? 'gray' : 'dark';
    const meta = err ? `<b>${esc(a.cliente)}</b><span>fallito alle</span><b>${esc(a.da)}</b>` : `<b>${esc(a.cliente)}</b><span>parte alle</span><b>${esc(a.quando)}</b>`;
    const sel = err ? `<span class="chip rosa">${ic('i-warn')}Errore</span><span>${esc(a.errore)}</span>` : `<span class="chip">${ic('i-clock')}${esc(a.quando)}</span><span>In coda</span>`;
    return `<div class="ncard task ${tono}">
      <div class="who">${av(m, e)}<div><b>${esc(e.nome)}</b><span>${esc(e.ruolo)} · ${esc(d.nome)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${err ? '<i class="dot"></i>' : ''}</span><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(err ? 'i-warn' : iconaDip[e.dip])}</span><div><div class="tt">${esc(a.titolo)}</div><div class="meta">${meta}</div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${sel}${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black" title="${err ? 'Riprova' : 'Avvia ora'}">${ic('i-play')}</span></div></div>
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
  function cardDipendente(m, e) {
    const d = m.dipDi(e);
    return `<div class="ncard lead">
      ${av(m, e)}
      <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="name">${esc(e.nome)}</div>
      <div class="role">${esc(e.ruolo)} · ${esc(d.breve)}</div>
      <div class="ft"><div><span class="k">Stato</span>${chipStato(m, e)}</div><div><span class="k">Oggi</span>${dots(livelloOggi(e))}</div></div>
    </div>`;
  }
  function rigaDipendente(m, e) {
    const d = m.dipDi(e);
    return `<div class="erow${e.stato === 'lavoro' ? ' lav' : ''}">${av(m, e)}<div class="tx"><b>${esc(e.nome)}</b><span>${esc(e.ruolo)} · ${esc(d.breve)}</span></div>${e.stato === 'lavoro' ? `<span class="chip onlime"><span>${esc(e.att.titolo)}</span></span>` : chipStato(m, e)}<span class="rb xs">${ic('i-ne')}</span></div>`;
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
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-ne')}</span></div><h5>Ultime voci del diario:</h5><div style="margin-top:10px">${ultime.map(x => `<div class="drow"><span>${esc(x.ora)}</span><div><b>${esc(m.byId[x.chi].nome)}</b> ${esc(x.testo)}</div></div>`).join('')}</div></div>`;
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
      <span class="face av ${m.avatarClasse(chi)}">${m.iniziali(chi)}</span>
      <div class="cap"><b>${esc(r.cosa)}</b>${esc(chi.nome)} · ${esc(r.cliente)} · ${idx + 1} di ${n}</div>
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
    const coda = att.length > 1 ? `<div class="sub"><h5>In coda</h5><span class="chip light">${att.length}</span></div>` + att.map((x, i) => { const c = m.byId[x.chi]; return `<div class="qrow${i === idx ? ' on' : ''}" data-az="vai" data-idx="${i}">${av(m, c, 'xs')}<div class="tx"><b>${esc(x.cosa)}</b><span>${esc(c.nome)} · ${esc(x.cliente)} · ${esc(x.ora)}</span></div><span class="rb xs">${ic('i-chevr')}</span></div>`; }).join('') : '';
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
    const d = m.dipDi(chi);
    const doc = r.tipo === 'post'
      ? `<div class="lb"><span class="chip light">${ic('i-mega')}LinkedIn · bozza</span>${esc(r.cliente)}</div><div class="tx">${esc(r.testo)}</div><div class="img">${ic('i-doc')}${esc(r.allegato)}</div>`
      : `<div class="lb"><span class="chip light">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span>${esc(r.cliente)} · ${esc(r.allegato)}</div><div class="tx mono">${esc(r.testo)}</div>`;
    return `<div class="a-tend estesa" role="dialog" aria-label="Richiesta">
      <div class="th"><span class="rb olight sm" data-az="riduci" title="Riduci">${ic('i-left')}</span><span class="rb black">${ic(iconaTipo[r.tipo])}</span><h4>${esc(r.cosa)}</h4>${pager(m, idx, att.length)}<span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
      <div class="tb"><div class="rx">
        <div class="doc">${doc}</div>
        <div class="det">
          <div class="dcard"><h5>Chi la propone</h5><div class="who">${av(m, chi)}<div><b>${esc(chi.nome)}</b><span>${esc(chi.ruolo)} · ${esc(d.nome)}</span></div></div>
            <div class="kv"><span>Consegnata alle</span><b>${esc(r.ora)}</b></div><div class="kv"><span>Costo della consegna</span><b>${r.costo} €</b></div>
            <div class="passi">${r.passi.map(p => `<span class="chip light">${ic('i-check')}${esc(p)}</span>`).join('')}</div></div>
          <div class="dcard"><h5>Nota del dipendente</h5><p class="nota">${esc(r.nota)}</p></div>
        </div>
        <div class="azioni"><span class="pill lime" data-az="approva" data-id="${r.id}">${ic('i-check')}Approva</span><span class="pill olight" data-az="modifiche" data-id="${r.id}">${ic('i-pen')}Chiedi modifiche</span><span class="pill olight">${ic('i-chat')}Commenta</span><span class="pill red" data-az="rifiuta" data-id="${r.id}">${ic('i-x')}Rifiuta</span><span class="link" data-az="pagina" data-pagina="richieste">Tutte le richieste ${ic('i-ne')}</span></div>
      </div></div>
    </div>`;
  }
  function tendina(m, opz) {
    if (opz.tendina === 'chiusa') return tendinaChiusa(m, opz);
    if (opz.tendina === 'estesa') return tendinaEstesa(m, opz);
    return tendinaAperta(m, opz);
  }

  /* ---------- cornice comune ---------- */
  function cornice(m, opz, titolo, stats, railAttivo, corpo, nuovo) {
    return `<div class="a-app" role="figure" aria-label="Direzione A — ${esc(titolo)} (contenuto sintetico)">
      <span class="a-logo">DGT</span>
      ${barraAgenda(m)}
      <div class="a-tr"><span class="rb">${ic('i-bell')}<i class="dot"></i></span><span class="av a2">${esc(m.azienda.titolare.iniziali)}</span></div>
      <span class="rb a-back" ${opz.pagina !== 'home' ? 'data-az="pagina" data-pagina="home"' : ''}>${ic('i-left')}</span>
      <div class="a-head">
        <h3 class="a-title">${esc(titolo)}</h3>
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
      <div class="stat"><b>${m.costoOggi} €</b><span>spesi oggi</span><span class="badge down">${ic('i-dn')}12%</span></div>`;
    const corpo = `
      <section>
        <div class="shead"><h3>Al lavoro adesso</h3><span class="cnt"><b>${lav.length}</b><span>Esecuzioni</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">🔥 Da approvare</span><span class="pill">In corso</span><span class="pill">Pianificate</span><span class="pill">Errori</span></div></div>
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
        ${compatto ? `<div class="elenco">${m.dipendenti.map(e => rigaDipendente(m, e)).join('')}</div>` : `<div class="cards">${m.dipendenti.map(e => cardDipendente(m, e)).join('')}</div>`}
      </section>`;
    return cornice(m, opz, m.azienda.titolo, stats, 'home', corpo, 'Nuovo obiettivo');
  }

  /* ---------- pagina Richieste ---------- */
  function cardRichiesta(m, r, i) {
    const chi = m.byId[r.chi];
    const d = m.dipDi(chi);
    const idx = inAttesa(m).indexOf(r);
    return `<div class="ncard task lime" data-az="richiesta" data-idx="${idx}">
      <div class="who">${av(m, chi)}<div><b>${esc(chi.nome)}</b><span>${esc(chi.ruolo)} · ${esc(d.nome)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaTipo[r.tipo])}</span><div><div class="tt">${esc(r.cosa)}</div><div class="meta"><b>${esc(r.cliente)}</b><span>·</span><b>${esc(r.ora)}</b></div></div></div>
      <div class="st"><span class="k">Decidi</span><div class="row"><span class="sel"><span class="av xs" style="background:var(--ink);color:var(--white)">${ic(iconaTipo[r.tipo])}</span><span>${r.costo} € · ${r.passi.length} passi · ${esc(r.ora)}</span>${ic('i-chev')}</span><span class="rb black" data-az="approva" data-id="${r.id}" title="Approva">${ic('i-check')}</span><span class="rb red" data-az="rifiuta" data-id="${r.id}" title="Rifiuta">${ic('i-x')}</span></div></div>
    </div>`;
  }
  function rigaStorico(m, r) {
    const chi = m.byId[r.chi];
    const decisa = r.stato === 'attesa' ? `in attesa da ${esc(r.ora)}` : r.regola ? `regola · <b>${esc(r.regola)}</b>` : `<b>${esc(m.azienda.titolare.iniziali)}</b> · ${esc(r.decisa)}${r.commento ? ' · «' + esc(r.commento) + '»' : ''}`;
    const idx = r.stato === 'attesa' ? inAttesa(m).indexOf(r) : -1;
    return `<div class="hrow ${r.stato}" ${idx >= 0 ? `data-az="richiesta" data-idx="${idx}"` : ''}><span class="ora">${esc(r.ora)}</span>${av(m, chi)}<div class="tx"><b>${esc(r.cosa)}</b><span>${esc(chi.nome)} · ${esc(r.cliente)}</span></div><span class="chip light">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]}</span>${chipEsito(r)}<span class="chi">${decisa}</span><span class="eur">${r.costo} €</span><span class="rb xs">${ic('i-ne')}</span></div>`;
  }
  function barraFiltri(m, f, tot, filtrate) {
    const p = (k, v, testo, extra) => `<span class="pill sm${(f[k] || 'tutti') === String(v) ? ' on' : ''}" data-az="filtro" data-k="${k}" data-v="${esc(String(v))}">${extra || ''}${testo}</span>`;
    const conRichieste = m.dipendenti.filter(e => m.richieste.some(r => r.chi === e.id));
    const attivi = Object.keys(f).filter(k => f[k] && f[k] !== 'tutti').length;
    return `<div class="fbar">
      <div class="frow"><span class="k">Stato</span><div class="pills due">${p('stato', 'tutti', 'Tutte')}${p('stato', 'attesa', 'Da approvare')}${p('stato', 'approvata', 'Approvate')}${p('stato', 'modifiche', 'Con modifiche')}${p('stato', 'rifiutata', 'Rifiutate')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Tipo</span><div class="pills due">${p('tipo', 'tutti', 'Tutti')}${p('tipo', 'post', 'Post')}${p('tipo', 'documento', 'Documenti')}${p('tipo', 'lista', 'Liste')}${p('tipo', 'proposta', 'Proposte')}</div></div>
      <div class="frow"><span class="k">Periodo</span><div class="pills due">${p('periodo', 'tutti', 'Tutto')}${p('periodo', 'oggi', 'Oggi')}${p('periodo', 'ieri', 'Ieri')}${p('periodo', 'settimana', '7 giorni')}${p('periodo', 'mese', '30 giorni')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Cliente</span><div class="pills">${p('cliente', 'tutti', 'Tutti')}${m.clienti.map(c => p('cliente', c, esc(c))).join('')}</div></div>
      <div class="frow"><span class="k">Dipartim.</span><div class="pills due">${p('dip', 'tutti', 'Tutti')}${m.dipartimenti.map(d => p('dip', d.id, esc(d.nome))).join('')}</div>
        <span class="sep"></span><span class="k" style="width:auto">Dipendente</span><div class="pills">${p('chi', 'tutti', 'Tutti')}${conRichieste.filter(e => !f.dip || f.dip === 'tutti' || e.dip === f.dip).map(e => p('chi', e.id, esc(e.nome), av(m, e, 'xs'))).join('')}</div></div>
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
      <div class="stat"><b>${costoOggi} €</b><span>spesi oggi</span></div>`;
    // spesa del mese per cliente: richieste degli ultimi 30 giorni + esecuzioni di oggi
    const perCliente = {};
    m.richieste.filter(r => ids.includes(r.chi) && r.giorno <= 31).forEach(r => { const c = perCliente[r.cliente] = perCliente[r.cliente] || { cliente: r.cliente, consegne: 0, mese: 0, oggi: 0 }; c.mese += r.costo; if (r.stato === 'approvata') c.consegne++; if (r.giorno === 0) c.oggi += r.costo; });
    lst.forEach(e => { const c = perCliente[e.att.cliente] = perCliente[e.att.cliente] || { cliente: e.att.cliente, consegne: 0, mese: 0, oggi: 0 }; c.mese += e.att.costo || 0; c.oggi += e.att.costo || 0; });
    const costi = Object.values(perCliente).filter(c => c.mese > 0).sort((a, b) => b.mese - a.mese);
    const totMese = costi.reduce((t, c) => t + c.mese, 0);
    const corpo = `
      <section>
        <div class="shead"><h3>Oggi in ${esc(d.nome)}</h3><span class="cnt"><b>${esec.length}</b><span>Esecuzioni</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutte</span><span class="pill">In corso</span><span class="pill">Pianificate</span><span class="pill">Errori</span><span class="pill">Concluse oggi</span></div></div>
        ${esec.length ? `<div class="cards riga">${esec.map((e, i) => cardEsecuzione(m, e, i)).join('')}</div>` : `<div class="vuoto">Nessuna esecuzione oggi in ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Dipendenti</h3><span class="cnt"><b>${lst.length}</b><span>Dipendenti</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">Al lavoro</span><span class="pill">Liberi</span><span class="pill">Con errori</span></div></div>
        <div class="cards">${lst.map(e => cardDipendente(m, e)).join('')}<div class="ncard lead add"><span class="rb ghost">${ic('i-plus')}</span>Aggiungi un dipendente<br>a ${esc(d.nome)}</div></div>
      </section>
      <section>
        <div class="shead"><h3>Obiettivi</h3><span class="cnt"><b>${ob.length}</b><span>Obiettivi</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
          <div class="filters"><span class="pill on">Tutti</span><span class="pill">🔥 In ritardo</span><span class="pill">In corso</span><span class="pill">Da iniziare</span><span class="pill">Conclusi</span></div></div>
        ${ob.length ? `<div class="cards">${ob.map((o, i) => cardObiettivo(m, o, i)).join('')}</div>` : `<div class="vuoto">Nessun obiettivo assegnato a ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Da approvare</h3><span class="cnt"><b>${att.length}</b><span>Richieste</span></span><span class="rb sm ghost">${ic('i-search')}</span>
          <div class="filters"><span class="pill" data-az="pagina" data-pagina="richieste" data-dip="${d.id}">Tutte le richieste di ${esc(d.nome)} ${ic('i-ne')}</span></div></div>
        ${att.length ? `<div class="cards">${att.map((r, i) => cardRichiesta(m, r, i)).join('')}</div>` : `<div class="vuoto">Niente da approvare da ${esc(d.nome)}</div>`}
      </section>
      <section>
        <div class="shead"><h3>Spesa del mese</h3><span class="cnt"><b>${totMese} €</b><span>per cliente</span></span><span class="rb sm ghost">${ic('i-down')}</span>
          <div class="filters"><span class="pill on">Ultimi 30 giorni</span><span class="pill">Oggi</span><span class="pill">Da inizio anno</span></div></div>
        <div class="hlist">${costi.map(c => `<div class="crow"><span class="ico">${ic('i-euro')}</span><div class="tx"><b>${esc(c.cliente)}</b><span>${c.consegne} consegne approvate</span></div><span class="v">${c.oggi} €<small>oggi</small></span><span class="v">${Math.round(100 * c.mese / Math.max(1, totMese))}%<small>del dipartimento</small></span><span class="eur">${c.mese} €</span><span class="rb xs">${ic('i-ne')}</span></div>`).join('')}</div>
      </section>`;
    return cornice(m, opz, d.nome.toUpperCase(), stats, 'org', corpo, 'Nuovo obiettivo');
  }

  function render(m, opz) {
    opz = Object.assign({ pagina: 'home', dip: 'svi', tendina: 'aperta', richiesta: 0, pannello: 'richieste', filtri: {}, ordine: 'vecchie' }, opz || {});
    return opz.pagina === 'richieste' ? richieste(m, opz) : opz.pagina === 'dipartimento' ? dipartimento(m, opz) : home(m, opz);
  }

  /* Disegna e collega i clic: tendina, cambio pagina, filtri, decisioni. Ritorna lo stato. */
  function monta(radice, m, opz) {
    const st = Object.assign({ pagina: 'home', dip: 'svi', tendina: 'aperta', richiesta: 0, pannello: 'richieste', filtri: {}, ordine: 'vecchie' }, opz || {});
    const n = () => m.richiesteDi('attesa').length;
    const tutto = () => { const y = window.scrollY; radice.innerHTML = render(m, st); window.scrollTo(0, y); };
    const soloTendina = () => { const t = radice.querySelector('#a-tendina'); if (t) t.innerHTML = tendina(m, st); else tutto(); };
    const decidi = (id, stato, commento) => {
      const r = m.richieste.find(x => x.id === id); if (!r) return;
      r.stato = stato; r.decisa = m.azienda.ora; r.giorno = 0; r.min = 10 * 60 + 42; if (commento) r.commento = commento;
      if (st.richiesta >= n()) st.richiesta = Math.max(0, n() - 1);
      if (!n() && st.tendina === 'estesa') st.tendina = 'aperta';
      tutto();
    };
    tutto();
    radice.addEventListener('click', ev => {
      const el = ev.target.closest('[data-az]'); if (!el || !radice.contains(el)) return;
      const az = el.dataset.az;
      if (az === 'chiudi') { st.tendina = 'chiusa'; soloTendina(); }
      else if (az === 'apri') { st.tendina = 'aperta'; if (el.dataset.pannello) st.pannello = el.dataset.pannello; soloTendina(); }
      else if (az === 'pannello') { st.pannello = el.dataset.pannello; soloTendina(); }
      else if (az === 'espandi') { st.tendina = 'estesa'; soloTendina(); }
      else if (az === 'riduci') { st.tendina = 'aperta'; soloTendina(); }
      else if (az === 'prec') { if (n()) st.richiesta = (st.richiesta - 1 + n()) % n(); soloTendina(); }
      else if (az === 'succ') { if (n()) st.richiesta = (st.richiesta + 1) % n(); soloTendina(); }
      else if (az === 'vai') { st.richiesta = +el.dataset.idx; soloTendina(); }
      else if (az === 'richiesta') { if (ev.target.closest('[data-az="approva"],[data-az="rifiuta"]')) return; st.richiesta = +el.dataset.idx; st.tendina = 'estesa'; st.pannello = 'richieste'; soloTendina(); }
      else if (az === 'pagina') { st.pagina = el.dataset.pagina; if (el.dataset.dip) { st.dip = el.dataset.dip; if (st.pagina === 'richieste') st.filtri = { dip: el.dataset.dip }; } tutto(); window.scrollTo(0, 0); }
      else if (az === 'filtro') { const k = el.dataset.k, v = el.dataset.v; st.filtri[k] = (st.filtri[k] === v || v === 'tutti') ? undefined : v; tutto(); }
      else if (az === 'azzera') { st.filtri = {}; tutto(); }
      else if (az === 'ordina') { st.ordine = el.dataset.v; tutto(); }
      else if (az === 'approva') { ev.stopPropagation(); decidi(el.dataset.id, 'approvata'); }
      else if (az === 'rifiuta') { ev.stopPropagation(); decidi(el.dataset.id, 'rifiutata', 'Rifiutata dal titolare'); }
      else if (az === 'modifiche') { decidi(el.dataset.id, 'modifiche', 'Modifiche chieste dal titolare'); }
      else if (az === 'approva-tutte') { inAttesa(m).forEach(r => { r.stato = 'approvata'; r.decisa = m.azienda.ora; r.giorno = 0; r.min = 10 * 60 + 42; }); st.richiesta = 0; if (st.tendina === 'estesa') st.tendina = 'aperta'; tutto(); }
    });
    return st;
  }

  return { id: 'A', nome: 'Console', css: prefissa(css, '.dirA'), render, monta };
})();
