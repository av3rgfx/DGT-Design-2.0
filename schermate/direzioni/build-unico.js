// Genera una copia a file unico di confronto.html (script incorporati) per la pubblicazione come artefatto.
// Uso: node build-unico.js [out.html]
const fs = require('fs'), path = require('path');
const dir = __dirname;
let html = fs.readFileSync(path.join(dir, 'confronto.html'), 'utf8');
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => '<script>\n' + fs.readFileSync(path.join(dir, src), 'utf8') + '\n</script>');
// Il link "Sorgente" non ha senso nel file unico: rimanda al repository.
html = html.replace(/apri\.innerHTML = `Sorgente: .*?`;/, "apri.innerHTML = 'Sorgenti nel repository: schermate/direzioni/';");
// L'artefatto viene avvolto in un proprio documento: si toglie lo scheletro.
html = html.replace(/^<!doctype html>\s*<html lang="it">\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/i, '').replace(/<\/head>\s*<body>/i, '').replace(/<\/body>\s*<\/html>\s*$/i, '');
const out = process.argv[2] || path.join(dir, 'confronto-unico.html');
fs.writeFileSync(out, html);
console.log('scritto', out, fs.statSync(out).size, 'byte');
