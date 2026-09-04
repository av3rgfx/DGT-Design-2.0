/* =====================================================================
   Direzione A — «Console». Il sistema di design (case study nero/lime,
   Urbanist, pillole e cerchi, card con intaglio, barra agenda, pannello
   chiaro) applicato alla vista principale dell'azienda e alla pagina Richieste.

   Versione 2 (2026-09-04, richieste dell'utente):
   - titolo dell'azienda con la O normale; logo del prodotto = acronimo DGT;
   - il pannello del titolare (Da approvare + Riepilogo) è una tendina
     flottante sopra tutto, con tre stati: chiusa (icona + conteggio al bordo
     destro), aperta (richiesta corrente + Riepilogo), estesa (la richiesta
     mostrata per intero); la home prende tutta la larghezza;
   - pagina Richieste (tutte le richieste dell'azienda).

   API: DIREZIONE_A.render(m, opz) → HTML; DIREZIONE_A.monta(radice, m, opz)
   disegna e collega i clic. opz = { pagina: 'home'|'richieste',
   tendina: 'chiusa'|'aperta'|'estesa', richiesta: indice }.
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
.pair{display:inline-flex;align-items:center}
.pair .av{border:2px solid var(--white)}.pair .av+.av,.pair .av+.more{margin-left:-10px}
.pair .more{height:28px;padding:0 9px;border-radius:var(--r-pill);background:var(--ink);color:var(--white);font-size:11px;display:inline-flex;align-items:center;border:2px solid var(--white)}
.pill{display:inline-flex;align-items:center;gap:10px;height:44px;padding:0 20px;border-radius:var(--r-pill);border:1px solid rgb(255 255 255/.14);background:transparent;color:var(--white);font-size:15px;white-space:nowrap;flex:none}
.pill.on{background:var(--white);color:var(--ink);border-color:transparent}
.pill.lime{background:var(--lime);color:var(--ink);border-color:transparent}
.pill.red{background:var(--hangup);color:var(--white);border-color:transparent}
.pill.olight{border-color:rgb(0 0 0/.14);color:var(--ink)}
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
/* card dipartimento e dipendente (forma della card lead) */
.lead{width:249px;height:204px;padding:20px;flex:none}
.lead .ico{width:48px;height:48px;border-radius:50%;border:1px solid rgb(255 255 255/.16);display:grid;place-items:center}
.lead .ico svg{width:20px;height:20px}
.lead .name{font-size:26px;line-height:30px;margin-top:22px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:4px}
.lead .role{font-size:13px;color:var(--t2);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lead .ft{display:flex;justify-content:space-between;align-items:flex-end;margin-top:16px;gap:8px}
.lead .k{font-size:11px;color:var(--t2);display:block;margin-bottom:6px;white-space:nowrap}
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
.shead .filters{display:flex;gap:8px;margin-left:8px;overflow:hidden;mask-image:linear-gradient(90deg,#000 calc(100% - 48px),transparent)}
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
/* ===== tendina del titolare: chiusa / aperta / estesa ===== */
.a-mini{position:fixed;right:0;top:240px;z-index:30;height:56px;padding:0 20px 0 12px;border-radius:var(--r-pill) 0 0 var(--r-pill);background:var(--lime);color:var(--ink);display:flex;align-items:center;gap:10px;box-shadow:0 20px 50px rgb(0 0 0/.6);font-size:14px;white-space:nowrap}
.a-mini .rb{width:36px;height:36px;background:var(--ink);color:var(--white);border-color:transparent}
.a-mini .rb svg{width:15px;height:15px}
.a-mini b{font-weight:500;font-size:22px;line-height:1}
.a-mini svg.ch{width:14px;height:14px;opacity:.7}
.a-tend{position:fixed;right:0;top:112px;height:calc(100vh - 136px);max-height:764px;width:330px;z-index:30;background:var(--summary);color:var(--ink);border-radius:var(--r-card) 0 0 var(--r-card);box-shadow:0 30px 80px rgb(0 0 0/.7);display:grid;grid-template-rows:auto 1fr;grid-template-columns:minmax(0,1fr);--behind:var(--summary)}
.a-tend>*{min-width:0}
.a-tend.estesa{width:840px}
.a-tend .th{display:flex;align-items:center;gap:10px;padding:14px 14px 0 14px}
.a-tend .th h4{font-size:26px;line-height:30px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.a-tend .th .chip{height:28px;font-size:13px}
.a-tend .tb{overflow:auto;padding:12px 14px 18px 14px;display:grid;grid-template-columns:minmax(0,1fr);gap:10px;align-content:start;scrollbar-width:thin}
.a-tend .tb>*{margin-right:0}
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

  function chipStato(m, e) {
    const s = e.stato;
    if (s === 'lavoro') return `<span class="chip lime">${ic('i-play')}Al lavoro</span>`;
    if (s === 'attesa') return `<span class="chip lime">${ic('i-bell')}Da approvare</span>`;
    if (s === 'errore') return `<span class="chip rosa">${ic('i-warn')}Errore</span>`;
    if (s === 'pianificato') return `<span class="chip">${ic('i-clock')}${esc(e.att.quando)}</span>`;
    return `<span class="chip">Libero</span>`;
  }
  const livelloOggi = e => ({ lavoro: e.att.da <= '09:00' ? 5 : 4, attesa: 3, errore: 1, pianificato: 0, libero: 0 })[e.stato];

  /* ---------- pezzi della home ---------- */
  function cardAttivita(m, e, i) {
    const pend = m.approvazioni.some(a => a.chi === e.id);
    const tono = pend ? 'lime' : (i % 2 ? 'dark' : 'gray');
    const d = m.dipDi(e);
    return `<div class="ncard task ${tono}">
      <div class="who">${av(m, e)}<div><b>${esc(e.nome)}</b><span>${esc(e.ruolo)} · ${esc(d.nome)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-bell')}${pend ? '<i class="dot"></i>' : ''}</span><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaDip[e.dip])}</span><div><div class="tt">${esc(e.att.titolo)}</div><div class="meta"><b>${esc(e.att.cliente)}</b><span>da</span><b>${esc(e.att.da)}</b></div></div></div>
      <div class="st"><span class="k">Stato</span><div class="row"><span class="sel">${av(m, e, 's')}<span>Passo ${e.att.passo[0]} di ${e.att.passo[1]}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-chat')}</span><span class="rb black">${ic('i-eye')}</span></div></div>
    </div>`;
  }
  function cardDipartimento(m, d) {
    const lst = m.perDip[d.id];
    const lav = lst.filter(e => e.stato === 'lavoro').length;
    const occ = lst.filter(e => e.stato === 'lavoro' || e.stato === 'attesa').length;
    const lv = lst.length ? Math.min(5, Math.round(5 * occ / lst.length)) : 0;
    const err = lst.filter(e => e.stato === 'errore').length;
    return `<div class="ncard lead">
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
    const consegne = m.richiesteDi('approvata').length;
    return `<div class="sub"><span class="rb black">${ic('i-wand')}</span><h5>Riepilogo di oggi</h5><span class="rb olight">${ic('i-ne')}</span></div>
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-down')}</span></div><h5>Consegne:</h5>
        <div class="thumbs">
          <div class="thumb"><div class="pg"><i class="h"></i><i class="w1"></i><i class="w2"></i><i class="b"></i><i class="w3"></i><i class="w1"></i><i class="w4"></i><i class="b"></i><i class="w2"></i></div><span class="lb">Post 4 di 12</span></div>
          <div class="thumb"><div class="pg"><i class="h"></i><i class="b"></i><i class="w1"></i><i class="w3"></i><i class="w2"></i><i class="b"></i><i class="w1"></i><i class="w4"></i></div><span class="lb">Piano ottobre</span></div>
        </div>
        <div class="kv"><span>Approvate oggi</span><b>${consegne}</b></div>
        <div class="kv"><span>Spesa di oggi</span><b>${m.costoOggi} €</b></div>
      </div>
      <div class="dcard"><div class="nt"><span class="rb sm">${ic('i-pen')}</span></div><h5>Obiettivo del mese:</h5><p class="goal">${m.azienda.obiettivoMese}</p></div>`;
  }
  function pager(m, idx, n) {
    return `<span class="pager"><span class="rb olight" data-az="prec">${ic('i-left')}</span>${idx + 1} di ${n}<span class="rb olight" data-az="succ">${ic('i-right')}</span></span>`;
  }
  function tendinaChiusa(m) {
    const n = m.richiesteDi('attesa').length;
    return `<div class="a-mini" data-az="apri" role="button" aria-label="Apri le richieste da approvare">${ic('i-left', 'ch')}<span class="rb">${ic('i-bell')}</span><b>${n}</b><span>da approvare</span></div>`;
  }
  function tendinaAperta(m, idx) {
    const att = m.richiesteDi('attesa');
    const r = att[idx] || att[0];
    const chi = r ? m.byId[r.chi] : null;
    return `<div class="a-tend aperta" role="dialog" aria-label="Da approvare">
      <div class="th"><h4>Da approvare</h4><span class="chip lime">${ic('i-bell')}${att.length}</span><span class="rb olight sm" data-az="espandi" title="Apri la richiesta">${ic('i-expand')}</span><span class="rb olight sm" data-az="chiudi" title="Chiudi">${ic('i-right')}</span></div>
      <div class="tb">
        ${r ? `<div class="appr">
          <div class="top"><span class="chip">${ic(iconaTipo[r.tipo])}${nomeTipo[r.tipo]} · ${esc(r.ora)}</span><span class="r"><span class="rb glass" data-az="prec">${ic('i-left')}</span><span class="rb glass" data-az="succ">${ic('i-right')}</span></span></div>
          <span class="face av ${m.avatarClasse(chi)}">${m.iniziali(chi)}</span>
          <div class="cap"><b>${esc(r.cosa)}</b>${esc(chi.nome)} · ${esc(r.cliente)} · ${idx + 1} di ${att.length}</div>
          <div class="ctl"><span class="rb glass" data-az="espandi" title="Apri">${ic('i-eye')}</span><span class="rb glass" title="Commenta">${ic('i-chat')}</span><span class="rb lime" title="Approva">${ic('i-check')}</span><span class="rb red" title="Rifiuta">${ic('i-x')}</span></div>
        </div>` : `<div class="vuoto" style="margin:0;border-color:rgb(0 0 0/.16)">Niente da approvare</div>`}
        ${riepilogo(m)}
      </div>
    </div>`;
  }
  function tendinaEstesa(m, idx) {
    const att = m.richiesteDi('attesa');
    const r = att[idx] || att[0];
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
        <div class="azioni"><span class="pill lime">${ic('i-check')}Approva</span><span class="pill olight">${ic('i-pen')}Chiedi modifiche</span><span class="pill olight">${ic('i-chat')}Commenta</span><span class="pill red">${ic('i-x')}Rifiuta</span><span class="link" data-az="pagina" data-pagina="richieste">Tutte le richieste ${ic('i-ne')}</span></div>
      </div></div>
    </div>`;
  }
  function tendina(m, opz) {
    if (opz.tendina === 'chiusa') return tendinaChiusa(m);
    if (opz.tendina === 'estesa') return tendinaEstesa(m, opz.richiesta || 0);
    return tendinaAperta(m, opz.richiesta || 0);
  }

  /* ---------- cornice comune ---------- */
  function cornice(m, opz, titolo, stats, railAttivo, corpo) {
    return `<div class="a-app" role="figure" aria-label="Direzione A — ${esc(titolo)} (contenuto sintetico)">
      <span class="a-logo">DGT</span>
      ${barraAgenda(m)}
      <div class="a-tr"><span class="rb">${ic('i-bell')}<i class="dot"></i></span><span class="av a2">${esc(m.azienda.titolare.iniziali)}</span></div>
      <span class="rb a-back" ${opz.pagina === 'richieste' ? 'data-az="pagina" data-pagina="home"' : ''}>${ic('i-left')}</span>
      <div class="a-head">
        <h3 class="a-title">${esc(titolo)}</h3>
        ${opz.pagina === 'richieste' ? '' : `<span class="a-new"><i>${ic('i-plus')}</i>Nuovo obiettivo</span>`}
        <div class="a-stats">${stats}</div>
      </div>
      <div class="a-rail">
        <span class="rb ${railAttivo === 'home' ? 'white' : ''}" data-az="pagina" data-pagina="home">${ic('i-list')}</span>
        <span class="rb">${ic('i-org')}</span>
        <span class="rb ${railAttivo === 'richieste' ? 'white' : ''}" data-az="pagina" data-pagina="richieste">${ic('i-bell')}</span>
        <span class="rb">${ic('i-chat')}</span>
        <span class="rb">${ic('i-cal')}</span>
      </div>
      <div class="a-main">${corpo}</div>
      <div id="a-tendina">${tendina(m, opz)}</div>
    </div>`;
  }

  function home(m, opz) {
    const lav = m.alLavoro.slice().sort((a, b) => (m.approvazioni.some(x => x.chi === b.id) ? 1 : 0) - (m.approvazioni.some(x => x.chi === a.id) ? 1 : 0));
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
    return cornice(m, opz, m.azienda.titolo, stats, 'home', corpo);
  }

  /* ---------- pagina Richieste ---------- */
  function cardRichiesta(m, r, i) {
    const chi = m.byId[r.chi];
    const d = m.dipDi(chi);
    const tono = r.stato === 'attesa' ? 'lime' : (i % 2 ? 'dark' : 'gray');
    let esito = '';
    if (r.stato === 'attesa') esito = `<span class="sel"><span class="chip ink">${nomeTipo[r.tipo]}</span><span>alle ${esc(r.ora)}</span>${ic('i-chev')}</span><span class="rb black" title="Approva">${ic('i-check')}</span><span class="rb red" title="Rifiuta">${ic('i-x')}</span>`;
    else if (r.stato === 'approvata') esito = `<span class="sel"><span class="chip lime">${ic('i-check')}Approvata</span><span>${esc(r.decisa)} · ${esc(m.azienda.titolare.iniziali)}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-eye')}</span>`;
    else if (r.stato === 'modifiche') esito = `<span class="sel"><span class="chip">${ic('i-pen')}Modifiche</span><span>${esc(r.commento)}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-eye')}</span>`;
    else esito = `<span class="sel"><span class="chip rosa">${ic('i-x')}Rifiutata</span><span>${esc(r.commento)}</span>${ic('i-chev')}</span><span class="rb ghost">${ic('i-eye')}</span>`;
    const idx = r.stato === 'attesa' ? m.richiesteDi('attesa').indexOf(r) : -1;
    return `<div class="ncard task ${tono}" ${idx >= 0 ? `data-az="richiesta" data-idx="${idx}"` : ''}>
      <div class="who">${av(m, chi)}<div><b>${esc(chi.nome)}</b><span>${esc(chi.ruolo)} · ${esc(d.nome)}</span></div></div>
      <div class="nt"><span class="rb ghost">${ic('i-ne')}</span></div>
      <div class="body"><span class="ico">${ic(iconaTipo[r.tipo])}</span><div><div class="tt">${esc(r.cosa)}</div><div class="meta"><b>${esc(r.cliente)}</b><span>·</span><b>${esc(r.ora)}</b></div></div></div>
      <div class="st"><span class="k">${r.stato === 'attesa' ? 'Decidi' : 'Esito'}</span><div class="row">${esito}</div></div>
    </div>`;
  }
  function richieste(m, opz) {
    const att = m.richiesteDi('attesa'), appr = m.richiesteDi('approvata'), rif = [...m.richiesteDi('modifiche'), ...m.richiesteDi('rifiutata')];
    const stats = `<div class="stat"><b>${att.length}</b><span>da approvare</span><span class="badge down">${ic('i-bell')}${Math.min(2, att.length)}</span></div>
      <div class="stat"><b>${appr.length}</b><span>approvate</span><span class="badge up">${ic('i-up')}${appr.length}</span></div>
      <div class="stat"><b>${rif.length}</b><span>da rifare</span><span class="badge down">${ic('i-dn')}${rif.length}</span></div>`;
    const sez = (titolo, lst, filtri, vuoto) => `<section>
      <div class="shead"><h3>${titolo}</h3><span class="cnt"><b>${lst.length}</b><span>Richieste</span></span><span class="rb sm ghost">${ic('i-search')}</span><span class="rb sm ghost">${ic('i-sliders')}</span>
        <div class="filters">${filtri.map((f, i) => `<span class="pill${i ? '' : ' on'}">${f}</span>`).join('')}</div></div>
      ${lst.length ? `<div class="cards">${lst.map((r, i) => cardRichiesta(m, r, i)).join('')}</div>` : `<div class="vuoto">${vuoto}</div>`}
    </section>`;
    const corpo = sez('Da approvare', att, ['Tutte', '🔥 Più vecchie', 'Post', 'Documenti', 'Liste', 'Proposte'], 'Niente da approvare')
      + sez('Approvate', appr, ['Oggi', 'Ieri', 'Questa settimana', 'Tutte'], 'Nessuna approvazione oggi')
      + sez('Con modifiche o rifiutate', rif, ['Tutte', 'Con modifiche', 'Rifiutate'], 'Niente da rifare');
    return cornice(m, opz, 'RICHIESTE', stats, 'richieste', corpo);
  }

  function render(m, opz) {
    opz = Object.assign({ pagina: 'home', tendina: 'aperta', richiesta: 0 }, opz || {});
    return opz.pagina === 'richieste' ? richieste(m, opz) : home(m, opz);
  }

  /* Disegna e collega i clic (tendina e cambio pagina). Ritorna lo stato. */
  function monta(radice, m, opz) {
    const st = Object.assign({ pagina: 'home', tendina: 'aperta', richiesta: 0 }, opz || {});
    const n = () => m.richiesteDi('attesa').length;
    const tutto = () => { radice.innerHTML = render(m, st); };
    const soloTendina = () => { const t = radice.querySelector('#a-tendina'); if (t) t.innerHTML = tendina(m, st); else tutto(); };
    tutto();
    radice.addEventListener('click', ev => {
      const el = ev.target.closest('[data-az]'); if (!el || !radice.contains(el)) return;
      const az = el.dataset.az;
      if (az === 'chiudi') { st.tendina = 'chiusa'; soloTendina(); }
      else if (az === 'apri') { st.tendina = 'aperta'; soloTendina(); }
      else if (az === 'espandi') { st.tendina = 'estesa'; soloTendina(); }
      else if (az === 'riduci') { st.tendina = 'aperta'; soloTendina(); }
      else if (az === 'prec') { st.richiesta = (st.richiesta - 1 + n()) % n(); soloTendina(); }
      else if (az === 'succ') { st.richiesta = (st.richiesta + 1) % n(); soloTendina(); }
      else if (az === 'richiesta') { st.richiesta = +el.dataset.idx; st.tendina = 'estesa'; soloTendina(); }
      else if (az === 'pagina') { st.pagina = el.dataset.pagina; tutto(); window.scrollTo(0, 0); }
    });
    return st;
  }

  return { id: 'A', nome: 'Console', css: prefissa(css, '.dirA'), render, monta };
})();
