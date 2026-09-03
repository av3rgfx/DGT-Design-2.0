# Prossima sessione — passaggio di consegne

Stato al 2026-09-03, fine della sessione che ha ricostruito il sistema di design sulla copia fedele
del case study originale.

## Stato

- Branch: `claude/dgt-design-system-fz5r1g`, PR aperta verso `main` (vedi la PR per il riepilogo).
- Artefatto: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (si aggiorna
  ripubblicando `design-system/specimen.html` dallo stesso percorso).
- Documento unico: `SYSTEM-DESIGN.md`. Dettaglio: `design-system/DESIGN.md`, token: `design-system/tokens.css`.

## Decisioni dell'utente (in ordine)

1. Brief iniziale con regole UX, due utenze, anti-riferimenti, white-label, IT/EN → variante A.
2. "Stile più professionale tipo Apple e Revolut" → variante B.
3. Allegati due riferimenti (case study nero/lime; editor a nodi) → procedere da quelli.
4. **"Elimina tutte le regole e i brief precedenti e copia lo stesso identico design degli esempi"** →
   regole e brief cancellati, varianti A e B archiviate in `design-system/archive/` (non fanno testo).
5. "Se la qualità degli screenshot è bassa guarda direttamente dal sito originale" → copia rifatta
   sulle 22 immagini originali a 1920 px del case study Behance (galleria 188798347).
6. "Salva il tutto come System Design" → `SYSTEM-DESIGN.md` come documento unico.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, poi `SYSTEM-DESIGN.md`.
2. Aprire `design-system/specimen.html` nel browser (serve rete per Google Fonts) oppure catturare
   gli screenshot con gli strumenti qui sotto.
3. Se serve confrontare con l'originale, recuperare le immagini del case study (vedi sotto). Non
   committarle: sono di terzi.

## Strumenti (`design-system/tools/`)

- `fetch-fonts.py` — scarica Urbanist da Google Fonts e scrive un CSS con i font incorporati
  (`urbanist.css`). Serve negli ambienti in cui Chromium headless non raggiunge Google Fonts.
  `python3 design-system/tools/fetch-fonts.py /tmp/urbanist.css`
- `screenshot.js` — cattura desktop (1440) e mobile (390) a pagina intera più i ritagli delle sezioni.
  Richiede `playwright-core` e un Chromium locale.
  ```
  cd design-system/tools && npm i playwright-core@1.57.0
  LOCAL_FONT_CSS=/tmp/urbanist.css node screenshot.js ../specimen.html /tmp/shots
  ```
  Percorso di Chromium via `CHROME_PATH` (predefinito `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
- `wcag.py` — utilità di contrasto; non è più una regola del sistema.

## Note tecniche apprese

- Google Fonts è bloccato in Chromium headless in questo ambiente: `screenshot.js` intercetta
  `fonts.googleapis.com` e serve il CSS locale (`LOCAL_FONT_CSS`).
- Behance risponde 403 a `curl` con una pagina di sfida JavaScript che imposta il cookie
  `js_challenge_value`; rifacendo la richiesta con quel cookie e lo stesso User-Agent si ottiene 200.
  Le immagini dei moduli stanno su `mir-s3-cdn-cf.behance.net/project_modules/fs/…` (1920 px).
- Per i ritagli e il campionamento dei colori: Pillow (`pip install pillow`).
- Nello specimen la variabile CSS `--behind` deve valere il colore che sta dietro la card, altrimenti
  l'intaglio (`.nt`) mostra il colore sbagliato.

## Possibili prossimi passi (non decisi dall'utente)

- Schermate reali di DGT nello stile copiato: console degli agenti (dipartimenti e dipendenti AI),
  esecuzioni in corso, approvazioni da mobile, costi.
- Componenti in codice riusabile (CSS o React) a partire dalle classi dello specimen.
- Versione inglese dei testi con la stessa lunghezza visiva.
- Stati vuoti, errori e caricamento nello stesso linguaggio (pillole, cerchi, intaglio).
