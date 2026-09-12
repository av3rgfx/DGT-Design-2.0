// Impacchetta il motore del kit avatar (vendor-avatars/, 8 moduli ESM) in uno script
// classico: la Console gira da file:// e come file unico, dove i moduli ESM non si caricano.
// Uso: node build-motore.js   →  scrive avatar-motore.js (non modificarlo a mano).
// I sorgenti in vendor-avatars/ restano verbatim, come chiede il kit.
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, 'vendor-avatars', 'core');
const ordine = ['math', 'shape', 'gaze', 'roles', 'generate', 'states', 'engine', 'render'];
const parti = ordine.map(n => {
  let src = fs.readFileSync(path.join(dir, n + '.js'), 'utf8');
  src = src.replace(/^import\s[^\n]*?from\s+'[^']+';\s*$/gm, '');
  src = src.replace(/^export\s+(const|function|class)\s/gm, '$1 ');
  if (/^\s*(import|export)\s/m.test(src)) throw new Error('import/export non gestito in ' + n);
  return `/* ---- vendor-avatars/core/${n}.js ---- */\n${src.trim()}\n`;
});
const out = `/* =====================================================================
   DGT — motore degli avatar (bundle generato da build-motore.js).
   Sorgenti: vendor-avatars/core/*.js (kit "pacchetto avatar dipendenti",
   architettura adattata da bloub, MIT). NON MODIFICARE A MANO: rigenerare con
   \`node build-motore.js\`. Espone window.DGT_AVATAR_MOTORE.
   ===================================================================== */
window.DGT_AVATAR_MOTORE = (function () {
${parti.join('\n')}
return { AvatarEngine, deriveRole, resolveRole, ROLES, ROLE_BY_ID, STATES, STATE_BY_ID, HERO_TIME,
  arcPath, renderSvg, SCALE, VIEW, UNIT_CIRCLE, UNIT_SQUARE, rgbCss, r2, createRng };
})();
`;
const dest = path.join(__dirname, 'avatar-motore.js');
fs.writeFileSync(dest, out);
console.log('scritto', dest, fs.statSync(dest).size, 'byte');
