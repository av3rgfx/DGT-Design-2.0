/* =====================================================================
   DGT — utilità comuni alle tre direzioni: sprite di icone (disegnate
   per DGT, nessuna icona di terzi), prefisso CSS, montaggio.
   ===================================================================== */
window.DGT_UI = (function () {
  const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<symbol id="i-mark" viewBox="0 0 44 44"><circle cx="22" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="22" cy="24" r="3" fill="currentColor"/><path d="M22 12V5M12 15 7 10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="22" cy="4" r="3.5" fill="currentColor"/><circle cx="6" cy="9" r="3" fill="currentColor"/></symbol>
<symbol id="i-logo" viewBox="0 0 32 32"><circle cx="16" cy="18" r="8" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="16" cy="18" r="2.2" fill="currentColor"/><path d="M16 10V4M9.5 12 5 7.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="16" cy="3.5" r="2.4" fill="currentColor"/><circle cx="4.5" cy="7" r="2.2" fill="currentColor"/></symbol>
<symbol id="i-ne" viewBox="0 0 16 16"><path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-left" viewBox="0 0 16 16"><path d="M13 8H3M7 4 3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-right" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-plus" viewBox="0 0 16 16"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
<symbol id="i-x" viewBox="0 0 16 16"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
<symbol id="i-search" viewBox="0 0 16 16"><circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></symbol>
<symbol id="i-sliders" viewBox="0 0 16 16"><path d="M4 2v12M8 2v12M12 2v12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="4" cy="6" r="1.8" fill="currentColor"/><circle cx="8" cy="10" r="1.8" fill="currentColor"/><circle cx="12" cy="5" r="1.8" fill="currentColor"/></symbol>
<symbol id="i-cal" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M2 6.5h12M5 1.5v3M11 1.5v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="5.5" cy="10" r=".9" fill="currentColor"/><circle cx="8" cy="10" r=".9" fill="currentColor"/><circle cx="10.5" cy="10" r=".9" fill="currentColor"/></symbol>
<symbol id="i-bell" viewBox="0 0 16 16"><path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3L4 11Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M6.5 14a1.5 1.5 0 0 0 3 0" fill="none" stroke="currentColor" stroke-width="1.4"/></symbol>
<symbol id="i-list" viewBox="0 0 16 16"><rect x="2" y="2.5" width="12" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M5 6.5h1M8 6.5h3M5 9.5h1M8 9.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-org" viewBox="0 0 16 16"><circle cx="5" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="11" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="5" cy="11" r="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M9 11h4M11 9v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-chat" viewBox="0 0 16 16"><path d="M8 2.5c3.6 0 6 2.2 6 5s-2.4 5-6 5c-.7 0-1.3-.1-1.9-.2L3 13.5l.8-2.4C2.7 10.2 2 8.9 2 7.5c0-2.8 2.4-5 6-5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="5.5" cy="7.5" r=".8" fill="currentColor"/><circle cx="8" cy="7.5" r=".8" fill="currentColor"/><circle cx="10.5" cy="7.5" r=".8" fill="currentColor"/></symbol>
<symbol id="i-chev" viewBox="0 0 16 16"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-chevr" viewBox="0 0 16 16"><path d="m6 4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-down" viewBox="0 0 16 16"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-pen" viewBox="0 0 16 16"><path d="M3 13h3l7-7-3-3-7 7v3Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8.5 4.5 11.5 7.5" stroke="currentColor" stroke-width="1.3"/></symbol>
<symbol id="i-wand" viewBox="0 0 16 16"><path d="m2.5 13.5 8-8M10 3l1 1M13 6l1 1M13 2l-1 1M6 3.5 5 2.5M4 6 3 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
<symbol id="i-expand" viewBox="0 0 16 16"><path d="M9 2.5h4.5V7M7 13.5H2.5V9M13.5 2.5 9 7M2.5 13.5 7 9" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-doc" viewBox="0 0 16 16"><path d="M4 1.5h5l3.5 3.5v9.5H4V1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 1.5V5h3.5M6 8h4M6 10.5h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-star" viewBox="0 0 16 16"><path d="m8 1.5 2 4.2 4.5.6-3.3 3.1.9 4.6L8 11.8 3.9 14l.9-4.6L1.5 6.3 6 5.7 8 1.5Z" fill="currentColor"/></symbol>
<symbol id="i-like" viewBox="0 0 16 16"><path d="M5 7.5v6H3v-6h2Zm1 6h5.2c.7 0 1.3-.5 1.4-1.2l.8-4c.1-.9-.5-1.6-1.4-1.6H9.5V4.2C9.5 3 8.6 2.5 8 2.5L6 7.5v6Z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></symbol>
<symbol id="i-up" viewBox="0 0 10 10"><path d="M5 8.5v-7M2 4.5 5 1.5l3 3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-dn" viewBox="0 0 10 10"><path d="M5 1.5v7M2 5.5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-check" viewBox="0 0 16 16"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-clock" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 4.5V8l2.5 1.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
<symbol id="i-code" viewBox="0 0 16 16"><path d="m5 4-3.5 4L5 12M11 4l3.5 4L11 12M9.5 2.5l-3 11" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-mega" viewBox="0 0 16 16"><path d="M2.5 6.5v3h2l6 3.5v-10l-6 3.5h-2Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M12.5 6a2.5 2.5 0 0 1 0 4M4.5 9.5l1 4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-hand" viewBox="0 0 16 16"><path d="M2 8.5 5 5.5l3 1.5 3-1.5 3 3-4.5 4.5a1.5 1.5 0 0 1-2 0L2 8.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="m7 9 2.5 2.5M8.5 7.5 11 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-receipt" viewBox="0 0 16 16"><path d="M4 2h8v12l-2-1.2L8 14l-2-1.2L4 14V2Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 5.5h4M6 8h4M6 10.5h2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-play" viewBox="0 0 16 16"><path d="M5 3.5v9l7-4.5-7-4.5Z" fill="currentColor"/></symbol>
<symbol id="i-pause" viewBox="0 0 16 16"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></symbol>
<symbol id="i-warn" viewBox="0 0 16 16"><path d="M8 2.5 14 13H2L8 2.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 6.5v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="11.2" r=".8" fill="currentColor"/></symbol>
<symbol id="i-grid" viewBox="0 0 16 16"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="9" width="4.5" height="4.5" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.3"/></symbol>
<symbol id="i-rows" viewBox="0 0 16 16"><path d="M3 4.5h10M3 8h10M3 11.5h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
<symbol id="i-eye" viewBox="0 0 16 16"><path d="M1.5 8s2.5-4.5 6.5-4.5S14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/></symbol>
<symbol id="i-euro" viewBox="0 0 16 16"><path d="M12 4.5A4.5 4.5 0 0 0 4 8a4.5 4.5 0 0 0 8 3.5M2.5 7h6M2.5 9h6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></symbol>
<symbol id="i-bolt" viewBox="0 0 16 16"><path d="M9 1.5 3.5 9H8l-1 5.5L12.5 7H8l1-5.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
<symbol id="i-bot" viewBox="0 0 16 16"><rect x="3" y="5.5" width="10" height="7.5" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 5.5V3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="8" cy="2.3" r="1" fill="currentColor"/><circle cx="6" cy="9.2" r=".9" fill="currentColor"/><circle cx="10" cy="9.2" r=".9" fill="currentColor"/></symbol>
<symbol id="i-home" viewBox="0 0 16 16"><path d="m2.5 8 5.5-5 5.5 5M4 7v6.5h8V7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
<symbol id="i-gear" viewBox="0 0 16 16"><circle cx="8" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6l1.4 1.4M11 11l1.4 1.4M3.6 12.4 5 11M11 5l1.4-1.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></symbol>
<symbol id="i-sort" viewBox="0 0 16 16"><path d="M5 3v10M3 11l2 2 2-2M11 13V3M9 5l2-2 2 2" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></symbol>
<symbol id="i-send" viewBox="0 0 16 16"><path d="M2.5 8 13.5 3l-3 10-2.5-4.5L2.5 8Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></symbol>
</defs></svg>`;

  function iconeInserisci() {
    if (document.getElementById('dgt-sprite')) return;
    const d = document.createElement('div'); d.id = 'dgt-sprite'; d.innerHTML = sprite; document.body.prepend(d);
  }
  const ic = (id, cls) => `<svg${cls ? ' class="' + cls + '"' : ''}><use href="#${id}"/></svg>`;
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* Prefissa ogni selettore di un CSS senza @-regole con un selettore radice. */
  function prefissa(css, radice) {
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    return css.replace(/(^|\})\s*([^@{}]+?)\s*\{/g, (m, pre, sel) => pre + sel.split(',').map(s => radice + ' ' + s.trim()).join(',') + '{');
  }
  function stile(id, css) {
    let s = document.getElementById(id);
    if (!s) { s = document.createElement('style'); s.id = id; document.head.appendChild(s); }
    s.textContent = css;
  }
  const iconaDip = { svi: 'i-code', mkt: 'i-mega', ven: 'i-hand', amm: 'i-receipt' };
  return { iconeInserisci, ic, esc, prefissa, stile, iconaDip };
})();
