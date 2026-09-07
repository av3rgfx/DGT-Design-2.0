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
Stesse variabili di `screenshot-page.js` (`PLAYWRIGHT_MODULE`, `NODE_PATH`, `LOCAL_FONT_CSS`), più `MOTION=no-preference` per avere gli avatar in moto (poi si fermano con `DGT_AVATAR_ORBE.fermo(t)` o `fotogramma(svg, t)` nella pagina), `SCALE=2`, `W=1440`, `H=900` (altezza del viewport: alzarla finché la pagina non scorre, altrimenti le catture dopo un clic si spostano), `CLICK="sel1|sel2"` per cliccare prima della cattura, `EVAL="codice"` per eseguire JavaScript nella pagina prima della cattura (per esempio scorrere lo schermo di un telefono). Serve per le card, le tendine e le cornici del telefono del mobile (2026-09-05: `mobile.html`, `H=1100`).

## affianca.js (2026-09-07)

Mette due o più catture in una sola immagine, ognuna con il suo occhiello: serve per i prima/dopo da far vedere
all'utente, che altrimenti vanno guardati uno alla volta.

```
node design-system/tools/affianca.js /percorso/uscita.png "Prima|/percorso/a.png" "Dopo|/percorso/b.png"
```

L'occhiello sta prima della barra verticale, il file dopo. Il secondo di ogni coppia prende la pillola lime, così in
una griglia si legge a colpo d'occhio quale colonna è il «dopo». `COL=2` dispone le catture in due colonne (per più
coppie una sotto l'altra), `TIT="…"` mette un titolo in cima, `FONDO=#0A0A0A` cambia il fondo (predefinito il nero
della Console). Stesse variabili degli altri strumenti (`PLAYWRIGHT_MODULE`, `NODE_PATH`, `CHROME_PATH`,
`LOCAL_FONT_CSS`: senza quest'ultima gli occhielli non sono in Urbanist).

Il «prima» si tira fuori dall'albero della versione precedente: `git archive HEAD | tar -x -C /percorso/base`, poi si
cattura la stessa sezione dalle due copie con `screenshot-elementi.js` e si affiancano. È il modo con cui sono fatte
le catture `a-frecce-*.png` della versione 18.

## Le prove cliccate delle schermate

Stanno in `schermate/direzioni/prove/` (`console.js`, `mobile.js`, `costi.js`), con il loro `README.md` che dice il comando; usano il CSS
locale di `fetch-fonts.py` e le stesse variabili di `screenshot-page.js` (`LOCAL_FONT_CSS`, `PLAYWRIGHT_MODULE`, `NODE_PATH`,
`CHROME_PATH`). Per la manutenzione del 2026-09-06 il confronto prima/dopo è stato fatto con `screenshot-page.js` (stesse pagine e
parametri, confronto byte per byte dei PNG) e con un'impronta degli stili calcolati di ogni elemento (`DIREZIONI.md`, «Versione 14»).
