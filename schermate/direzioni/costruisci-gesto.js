// Costruisce la pagina della scelta del gesto con cui si compone il canvas (versione 22) dal suo sorgente.
//
// Come `costruisci-scelta.js` per la barra: il sorgente `scelta-gesto.src.html` non si apre da solo, porta le
// catture come segnaposto `IMG:<nome>` che qui diventano il PNG di `screenshot/<nome>.png` incorporato come data
// URI. L'artefatto è un file solo, e la sua CSP lascia passare, fra le immagini, solo quelle incorporate.
//
// Uso (dalla radice o da qualunque cartella):
//   node schermate/direzioni/costruisci-gesto.js               → scelta-gesto.html qui accanto
//   node schermate/direzioni/costruisci-gesto.js /tmp/out.html → altrove
// Le tre catture le rifà `scatta.js` (gruppo `gesto`).
const fs = require('fs'), path = require('path');
const QUI = __dirname, SCATTI = path.join(QUI, 'screenshot');
const SRC = path.join(QUI, 'scelta-gesto.src.html');
const OUT = process.argv[2] ? path.resolve(process.argv[2]) : path.join(QUI, 'scelta-gesto.html');

const uri = nome => 'data:image/png;base64,' + fs.readFileSync(path.join(SCATTI, nome + '.png')).toString('base64');

let html = fs.readFileSync(SRC, 'utf8');
const usati = [...new Set(html.match(/IMG:[a-z0-9-]+/g) || [])];
usati.forEach(seg => { html = html.split(seg).join(uri(seg.slice(4))); });

fs.writeFileSync(OUT, html);
console.log(path.basename(OUT), '·', usati.length, 'catture incorporate ·', (fs.statSync(OUT).size / 1048576).toFixed(1), 'MB');
