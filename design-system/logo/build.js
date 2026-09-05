// Scrive i file SVG del logo a partire da logo.js. Uso: node build.js
const fs = require('fs'), path = require('path');
const L = require('./logo.js');
const out = (nome, svg) => { fs.writeFileSync(path.join(__dirname, nome), svg + '\n'); console.log('scritto', nome, svg.length, 'byte'); };
for (const id of ['filo', 'catena', 'innesto', 'monogramma']) out(`dgt-${id}.svg`, L.svg(L.V[id](), { label: `DGT · ${id}` }));
out('dgt-marchio-lime.svg', L.marchio());
out('dgt-marchio-scuro.svg', L.marchio({ fondo: '#1E1E1E', fill: '#FCFCFC' }));
out('dgt-tessera.svg', L.marchio({ tessera: true }));
out('dgt-favicon.svg', L.marchio({ size: 32 }));
