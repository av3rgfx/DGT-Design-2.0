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
- `motion-check.js` — verifica del moto: registra un video (webm) della console, salva i fotogrammi chiave
  di ogni transizione (pop-in, badge, scambio di testo, spunta, pannelli, modale, avatar, scambio icona,
  card che si allarga, marcatore a 0/30/60/90 s, connettori dell'editor), misura il CLS e le posizioni
  degli elementi prima e dopo le interazioni, poi ripete il giro con `prefers-reduced-motion: reduce`
  (attese: zero animazioni attive, tutto visibile, stati istantanei).
  ```
  LOCAL_FONT_CSS=/tmp/urbanist.css node motion-check.js ../specimen.html /tmp/moto
  ```
- `wcag.py` — calcola il rapporto di contrasto WCAG 2.x per un file di coppie JSON
  (`[{ctx, fg, bg, req}]`). Utilità facoltativa: dal 2026-09-03 il contrasto non è una regola del
  sistema, che copia i riferimenti così come sono. Le coppie della vecchia variante A stanno in
  `design-system/archive/variante-a/pairs.json`.
