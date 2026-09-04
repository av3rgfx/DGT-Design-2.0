# Prossima sessione — passaggio di consegne

Stato al 2026-09-04, fine della sessione che ha applicato il sistema di design alla prima schermata reale.

## Stato

- Branch: `claude/dgt-design-directions-iv0ntf` (da `main`, che contiene il sistema di design della PR #1).
- Artefatto del confronto (tab A/B/C, selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (si aggiorna ricostruendo il file unico con `schermate/direzioni/build-unico.js` e ripubblicandolo).
- Artefatto dello specimen del sistema: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Documento unico: `SYSTEM-DESIGN.md` (sezione 10: direzione scelta e regole). Studio delle direzioni:
  `schermate/direzioni/DIREZIONI.md`.

## Decisioni dell'utente (in ordine)

1. Brief iniziale con regole UX → variante A (archiviata).
2. "Stile più professionale tipo Apple e Revolut" → variante B (archiviata).
3. Due riferimenti (case study nero/lime; editor a nodi) → procedere da quelli.
4. **"Elimina tutte le regole e i brief precedenti e copia lo stesso identico design degli esempi"** (2026-09-03).
5. Copia rifatta sulle immagini originali a 1920 px del case study; `SYSTEM-DESIGN.md` come documento unico.
6. **2026-09-04**: "applichiamo il design system al prodotto reale": tre direzioni sulla vista principale
   (4 dipartimenti, 11 dipendenti, 3 al lavoro), solo la A fedele ai riferimenti, guadagni/perdite per ognuna,
   consiglio su quale regge a 40. Scelta fatta in questa sessione: **direzione A · Console**. Le schermate
   successive vanno generate solo dentro la A.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 10) e `schermate/direzioni/DIREZIONI.md` (sezioni 1 e 4).
2. Aprire `schermate/direzioni/direzione-a.html` (e `?n=40`): è la base di codice delle prossime schermate.
   Il modello dati è `dati.js`, le icone e le utilità sono in `comune.js`, i componenti in `direzione-a.js`.
3. Prossima schermata prevista: il **dipartimento** (Sviluppo: 3 dipendenti, esecuzioni, obiettivi, costi), poi
   dipendente, esecuzione, approvazioni da mobile, costi. Stessa cornice della Console: barra in alto, riga con
   titolo e numeri, rail, sezioni con intestazione e pillole, pannello del titolare a destra.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura qualsiasi pagina a pagina intera (`file.html?n=40`, larghezza, altezza).
  `PLAYWRIGHT_MODULE=playwright LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js ../../schermate/direzioni/direzione-a.html /tmp/a.png`
- `fetch-fonts.py` — Urbanist locale per Chromium headless (in questa sessione è stato usato un CSS con anche
  Inter, Fraunces, Instrument Sans per B e C; lo script si adatta cambiando l'URL di Google Fonts).
- `screenshot.js` — cattura dello specimen; `wcag.py` — contrasto, non è una regola.

## Note tecniche apprese

- In questo ambiente Playwright è installato globalmente (`NODE_PATH=/opt/node22/lib/node_modules`,
  `PLAYWRIGHT_MODULE=playwright`) e Chromium sta in `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Google Fonts è bloccato in Chromium headless: gli script intercettano `fonts.googleapis.com` e servono il CSS locale.
- `DGT_UI.prefissa(css, '.dirA')` prefissa ogni selettore per far convivere più schermate in una pagina; toglie
  prima i commenti CSS (un commento davanti a un selettore lo faceva saltare).
- Nelle griglie e nei flex con testo `nowrap` servono `minmax(0,1fr)` e `min-width:0`, altrimenti le card sfondano.
- La pagina di confronto usa classi con prefisso `p-` per non collidere con quelle delle schermate.

## Possibili prossimi passi (non decisi dall'utente)

- Schermata del dipartimento nella direzione A.
- Stati vuoti, caricamento ed errori nel linguaggio della Console.
- Versione mobile della vista principale (approvazioni) partendo dalle tre schermate mobile dello specimen.
- Estrarre i componenti di `direzione-a.js` in un file condiviso `schermate/componenti.js`.
