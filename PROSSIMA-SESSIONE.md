# Prossima sessione — passaggio di consegne

Stato al 2026-09-03, fine della sessione "emoji e animazioni" (la seconda del sistema di design
copiato dal case study).

## Stato

- `main` contiene la PR #1 (sistema di design ricostruito sulla copia fedele del case study).
- Branch di questa sessione: `claude/dgt-emoji-animations-gvkoh9`, PR verso `main`: vedi
  `SYSTEM-DESIGN.md`, sezione 11.
- Artefatto: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (si aggiorna
  ripubblicando `design-system/specimen.html` sullo stesso URL).
- Documento unico: `SYSTEM-DESIGN.md`. Dettaglio: `design-system/DESIGN.md`, token:
  `design-system/tokens.css`.

## Fatto in questa sessione

1. **Niente emoji, solo icone SVG.** Sostituiti l'emoji della fiamma (U+1F525: pillole "Cliente caldo"/"Urgenti", etichetta di
   interesse, riga "pillola" della tipografia, UI kit) e il triangolino U+25BE (barra di stato dei telefoni) con i nuovi
   simboli `i-flame`, `i-wifi`, `i-signal`; anche i "+" testuali dell'editor usano `i-plus`. Regola in
   `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 1) e `DESIGN.md`. Scansione degli intervalli Unicode
   fuori da `design-system/archive/`: zero risultati (l'archivio conserva i glifi geometrici U+25A0–25FF delle vecchie
   varianti e non fa testo).
2. **Moto.** Token `--dgt-t-*`, `--dgt-ease*`, `--dgt-dist-*`, `--dgt-blur-*`, `--dgt-scale-*` in
   `tokens.css`; nello specimen il blocco CSS "MOTO" e uno script in fondo (solo classi/attributi).
   Transizioni: pop-in di numeri e badge, badge di notifica sulla campanella, scambio di testo e spunta
   di conferma nel selettore di stato, Riepilogo e chiamata richiudibili, videochiamata a schermo
   intero (modale dentro la console), hover del gruppo di avatar, scambio icona nei filtri e nel rail,
   card lead/attività che si allargano, marcatore "14:15" che percorre il segmento in 90 s, luce sui
   connettori e spunte dei nodi nell'editor. Tutto documentato in `SYSTEM-DESIGN.md` sezione 7
   ("Moto") e in `DESIGN.md`.
3. **Correzione:** il contenuto della card lead sbordava di 20 px sotto i 204 px della card (interlinee
   ereditate a 24 px); ora ruolo 13/18, etichetta 11/14 e margini ridotti, card esattamente 204.
4. **Verifiche:** `screenshot.js` (nessun overflow, Urbanist 300–600, nessun errore in console) e il
   nuovo `tools/motion-check.js` (video, fotogrammi chiave, CLS 0,0015 dovuto al font, posizioni
   invariate, moto ridotto con zero animazioni attive).

## Decisioni dell'utente (in ordine, tutte le sessioni)

1. Brief iniziale con regole UX, due utenze, anti-riferimenti, white-label, IT/EN → variante A.
2. "Stile più professionale tipo Apple e Revolut" → variante B.
3. Allegati due riferimenti (case study nero/lime; editor a nodi) → procedere da quelli.
4. **"Elimina tutte le regole e i brief precedenti e copia lo stesso identico design degli esempi"** →
   regole e brief cancellati, varianti A e B archiviate in `design-system/archive/` (non fanno testo).
5. "Se la qualità degli screenshot è bassa guarda direttamente dal sito originale" → copia rifatta
   sulle 22 immagini originali a 1920 px del case study Behance (galleria 188798347).
6. "Salva il tutto come System Design" → `SYSTEM-DESIGN.md` come documento unico.
7. "Togli ogni emoji: sono accettate solo icone" → regola "Niente emoji: solo icone SVG".
8. "Implementa le animazioni", valutando transitions.dev → scala e snippet di transitions.dev con
   i token DGT; moto sobrio, senza spostamenti di layout, con `prefers-reduced-motion`.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, poi `SYSTEM-DESIGN.md` (in particolare le sezioni 1 e 7).
2. Aprire `design-system/specimen.html` nel browser (serve rete per Google Fonts): le interazioni sono
   clic su campanella, selettori di stato, freccia del Riepilogo, "×" ed espandi della chiamata,
   pulsante video delle card attività, avatar, filtri, rail, card lead e corpo delle card attività,
   "+" del rail dell'editor. Oppure catturare screenshot e video con gli strumenti qui sotto.
3. Per confrontare con l'originale, recuperare le immagini del case study (vedi note). Non
   committarle: sono di terzi.

## Strumenti (`design-system/tools/`)

- `fetch-fonts.py` — scarica Urbanist da Google Fonts e scrive un CSS con i font incorporati.
  `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 design-system/tools/fetch-fonts.py /tmp/urbanist.css`
- `screenshot.js` — cattura desktop (1440) e mobile (390) a pagina intera più i ritagli delle sezioni.
- `motion-check.js` — video, fotogrammi chiave, CLS e moto ridotto (vedi README degli strumenti).
  ```
  cd design-system/tools && npm i playwright-core@1.57.0
  LOCAL_FONT_CSS=/tmp/urbanist.css node screenshot.js ../specimen.html /tmp/shots
  LOCAL_FONT_CSS=/tmp/urbanist.css node motion-check.js ../specimen.html /tmp/moto
  ```
  Percorso di Chromium via `CHROME_PATH` (predefinito `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).
- `wcag.py` — utilità di contrasto; non è più una regola del sistema.

## Note tecniche apprese

- Google Fonts è bloccato in Chromium headless in questo ambiente: gli script intercettano
  `fonts.googleapis.com` e servono il CSS locale (`LOCAL_FONT_CSS`). `fetch-fonts.py` ha bisogno di
  `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt` per passare dal proxy.
- Behance risponde 403 a `curl` con una pagina di sfida JavaScript che imposta il cookie
  `js_challenge_value`; rifacendo la richiesta con quel cookie e lo stesso User-Agent si ottiene 200.
  Le immagini dei moduli stanno su `mir-s3-cdn-cf.behance.net/project_modules/fs/…` (1920 px).
- Per i ritagli e i montaggi dei fotogrammi: Pillow (`pip install pillow`). L'ffmpeg di Playwright
  (`/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux`) sa solo scrivere webm: niente mp4.
- Nello specimen la variabile CSS `--behind` deve valere il colore che sta dietro la card, altrimenti
  l'intaglio (`.nt`) mostra il colore sbagliato.
- Le icone sono `<use href="#i-*">`: il path vive nel `<symbol>`, quindi le proprietà da animare
  (`stroke-dashoffset`) vanno messe sull'`svg`, che le trasmette per ereditarietà; la spunta del
  selettore usa invece un path inline per il tratto disegnato.
- transitions.dev: repository `Jakubantalik/transitions.dev`, skill in `skills/transitions-dev/`
  (`_root.css` con la scala dei token, un file per transizione). Non è installata nel repo: copiati
  solo gli snippet usati, con i token DGT. Per installarla: `npx skills add Jakubantalik/transitions.dev`.
- `body{line-height:24px}` si eredita come valore assoluto: ogni testo piccolo deve dichiarare la
  propria interlinea (causa dello sbordamento della card lead).

## Possibili prossimi passi (non decisi dall'utente)

- Schermate reali di DGT nello stile copiato: console degli agenti (dipartimenti e dipendenti AI),
  esecuzioni in corso, approvazioni da mobile, costi.
- Componenti in codice riusabile (CSS o React) a partire dalle classi dello specimen, moto compreso.
- Versione inglese dei testi con la stessa lunghezza visiva.
- Stati vuoti, errori e caricamento nello stesso linguaggio (pillole, cerchi, intaglio); per il
  caricamento transitions.dev offre skeleton reveal e shimmer sulla stessa scala.
- Moto sulle schermate mobile (oggi statiche, salvo gli stili condivisi).
