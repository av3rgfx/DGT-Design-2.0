// Genera una copia a file unico di una pagina (script src incorporati) per la pubblicazione come artefatto.
// Uso: node build-unico.js [in.html] [out.html]   (predefinito: confronto.html → confronto-unico.html)
const fs = require('fs'), path = require('path');
const dir = __dirname;
const inFile = path.resolve(dir, process.argv[2] || 'confronto.html');
let html = fs.readFileSync(inFile, 'utf8');
html = html.replace(/<script src="([^"]+)"><\/script>/g, (m, src) => '<script>\n' + fs.readFileSync(path.join(path.dirname(inFile), src), 'utf8') + '\n</script>');
// Il link "Sorgente" del confronto non ha senso nel file unico: rimanda al repository.
html = html.replace(/apri\.innerHTML = `Sorgente: .*?`;/, "apri.innerHTML = 'Sorgenti nel repository: schermate/direzioni/';");
// L'artefatto viene avvolto in un proprio documento: si toglie lo scheletro.
html = html.replace(/^<!doctype html>\s*<html lang="it">\s*<head>\s*<meta charset="utf-8">\s*<meta name="viewport"[^>]*>\s*/i, '').replace(/<\/head>\s*<body>/i, '').replace(/<\/body>\s*<\/html>\s*$/i, '');
const out = process.argv[3] || path.join(dir, path.basename(inFile, '.html') + '-unico.html');
fs.writeFileSync(out, html);
console.log('scritto', out, fs.statSync(out).size, 'byte');
