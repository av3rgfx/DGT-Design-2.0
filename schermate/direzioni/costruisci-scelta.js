// Costruisce la pagina della scelta della barra «Oggi in azienda» (artefatto con il voto condiviso,
// https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f) dal suo sorgente.
//
// Il sorgente `scelta-barra.src.html` non si apre da solo: porta le catture come segnaposto `IMG:<nome>`,
// che qui diventano il PNG di `screenshot/<nome>.png` incorporato come data URI. In testa entra anche
// `window.__BARRE__`, le otto catture delle quattro barre a undici e a quaranta dipendenti, che il
// commutatore della pagina scambia senza chiedere niente alla rete: l'artefatto è un file solo e la
// CSP dell'artefatto lascia passare, fra le immagini, solo quelle incorporate.
//
// Uso (dalla radice o da qualunque cartella):
//   node schermate/direzioni/costruisci-scelta.js               → scelta-barra.html qui accanto
//   node schermate/direzioni/costruisci-scelta.js /tmp/out.html → altrove
// Le catture le rigenera `scatta.js` (gruppo `barra`); le due strade scartate stanno in `FUORI`, lì dentro.
const fs = require('fs'), path = require('path');
const QUI = __dirname, SCATTI = path.join(QUI, 'screenshot');
const SRC = path.join(QUI, 'scelta-barra.src.html');
const OUT = process.argv[2] ? path.resolve(process.argv[2]) : path.join(QUI, 'scelta-barra.html');

const BARRE = ['oggi', 'momenti', 'misura', 'stato'];
const uri = nome => 'data:image/png;base64,' + fs.readFileSync(path.join(SCATTI, nome + '.png')).toString('base64');

let html = fs.readFileSync(SRC, 'utf8');
const usati = [...new Set(html.match(/IMG:[a-z0-9-]+/g) || [])];
usati.forEach(seg => { html = html.split(seg).join(uri(seg.slice(4))); });

const mappa = BARRE.flatMap(k => ['', '40'].map(suf =>
  JSON.stringify(k + suf) + ': ' + JSON.stringify(uri('a-barra-' + k + (suf ? '-40' : ''))))).join(', ');
html = '<script>window.__BARRE__={' + mappa + '};</script>\n' + html;

fs.writeFileSync(OUT, html);
console.log(path.basename(OUT), '·', usati.length, 'catture nella pagina,', BARRE.length * 2, 'nel commutatore ·',
  (fs.statSync(OUT).size / 1048576).toFixed(1), 'MB');
