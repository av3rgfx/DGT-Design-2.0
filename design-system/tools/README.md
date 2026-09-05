# Strumenti

- `fetch-fonts.py` — scarica Urbanist (pesi 300–600) da Google Fonts e scrive un CSS con i font
  incorporati come data URI, per gli ambienti in cui Chromium headless non raggiunge Google Fonts.
  `python3 design-system/tools/fetch-fonts.py /tmp/urbanist.css`
- `screenshot.js` — cattura `specimen.html` a pagina intera su desktop (1440×900) e mobile (390×844),
  più i ritagli delle sezioni principali; stampa larghezza di scorrimento, font caricati ed errori di console.
  ```
  cd design-system/tools && npm i playwright-core@1.57.0
  LOCAL_FONT_CSS=/tmp/urbanist.css node screenshot.js ../specimen.html /tmp/shots
  ```
  `CHROME_PATH` indica l'eseguibile di Chromium (predefinito `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
  Senza `LOCAL_FONT_CSS` la pagina prova a caricare Google Fonts dalla rete.
- `screenshot-page.js` — cattura una pagina qualsiasi a pagina intera a una larghezza data (predefinita 1440);
  accetta una query (`file.html?n=40`). Con `PLAYWRIGHT_MODULE=playwright` usa il pacchetto globale.
  ```
  LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js ../../schermate/direzioni/direzione-a.html /tmp/a.png 1440 900
  ```
  Per un CSS locale con più famiglie (Urbanist, Inter, Fraunces, Instrument Sans) si può adattare `fetch-fonts.py`.
- `wcag.py` — calcola il rapporto di contrasto WCAG 2.x per un file di coppie JSON
  (`[{ctx, fg, bg, req}]`). Utilità facoltativa: dal 2026-09-03 il contrasto non è una regola del
  sistema, che copia i riferimenti così come sono. Le coppie della vecchia variante A stanno in
  `design-system/archive/variante-a/pairs.json`.

## screenshot-elementi.js (2026-09-05)

Cattura uno o più elementi di una pagina, per selettore, a piena risoluzione: `node screenshot-elementi.js <file.html[?query]> <prefisso-out> <selettore1> [selettore2 ...]` scrive `prefisso-0.png`, `prefisso-1.png`, …
Stesse variabili di `screenshot-page.js` (`PLAYWRIGHT_MODULE`, `NODE_PATH`, `LOCAL_FONT_CSS`), più `MOTION=no-preference` per avere gli avatar in moto (poi si fermano con `DGT_AVATAR_ORBE.fermo(t)` o `fotogramma(svg, t)` nella pagina), `SCALE=2`, `W=1440`, `CLICK="sel1|sel2"` per cliccare prima della cattura. Serve per le card, le tendine e le cornici del telefono del mobile.
