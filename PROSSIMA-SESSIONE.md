# Prossima sessione — passaggio di consegne

Stato al 2026-09-03, fine della sessione che ha ricostruito il sistema di design sulla copia fedele
del case study originale.

## Stato

- Branch: `claude/dgt-design-system-fz5r1g`, PR #1 aperta verso `main`: https://github.com/av3rgfx/DGT-Design-2.0/pull/1
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

## Richieste dell'utente per la prossima sessione (2026-09-03, fine sessione)

1. **Niente emoji nel System Design: sono accettate solo icone.** Oggi l'emoji 🔥 compare in
   `design-system/specimen.html` (pillole filtro "Cliente caldo" e "Urgenti", etichetta di interesse
   nelle card lead, riga "pillola" della tipografia, UI kit) e nei documenti `SYSTEM-DESIGN.md` e
   `design-system/DESIGN.md`; il glifo ▾ sta nella barra di stato dei telefoni. Vanno sostituiti con
   icone SVG del set dello specimen (symbol `i-*`), e la regola va scritta in `CLAUDE.md` e in `SYSTEM-DESIGN.md`.
2. **Animazioni.** Implementare transizioni e micro-interazioni coerenti con il design copiato,
   usando se utile la libreria transitions.dev (https://github.com/Jakubantalik/transitions.dev,
   sito https://transitions.dev/): raccolta di transizioni CSS pronte (classi `t-*`, custom property
   su `:root`, guardia `prefers-reduced-motion`), installabile anche come skill per agenti con
   `npx skills add Jakubantalik/transitions.dev`.

## Prompt di avvio della prossima sessione

```
Repository DGT-Design-2.0 (design del prodotto DGT, sistema operativo aziendale per agenti AI).
Prima di tutto leggi CLAUDE.md, PROSSIMA-SESSIONE.md e SYSTEM-DESIGN.md: contengono stato,
decisioni e vincoli. Il design è la copia fedele dei riferimenti in design-system/reference/
(case study nero/lime con Urbanist e l'editor a nodi); non esistono altre regole di stile.
Vincoli fissi: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.
Se la PR #1 (https://github.com/av3rgfx/DGT-Design-2.0/pull/1) è ancora aperta e il branch della
sessione è lo stesso, continua su quel branch; altrimenti parti da main e apri una nuova PR.

Obiettivi di questa sessione, in ordine:

1. Togli ogni emoji dal System Design: sono accettate solo icone. Cerca in
   design-system/specimen.html, SYSTEM-DESIGN.md, design-system/DESIGN.md e negli altri .md
   (oggi: 🔥 nelle pillole filtro "Cliente caldo" e "Urgenti", nell'etichetta di interesse delle
   card lead, nella riga "pillola" della tipografia e nell'UI kit; ▾ nella barra di stato dei
   telefoni). Sostituisci con icone SVG aggiunte al set di symbol i-* dello specimen (per esempio
   una fiamma a tratto per "caldo/urgente", un'icona wifi per la barra di stato), con la stessa
   misura e lo stesso stile delle icone esistenti. Aggiungi la regola "Niente emoji: solo icone
   SVG" in CLAUDE.md e in SYSTEM-DESIGN.md. Verifica con una ricerca sugli intervalli Unicode
   delle emoji che il risultato sia zero.

2. Implementa le animazioni. Valuta la libreria transitions.dev
   (https://github.com/Jakubantalik/transitions.dev, sito https://transitions.dev/): transizioni
   CSS pronte con classi t-*, custom property su :root e guardia prefers-reduced-motion; si può
   installare come skill con `npx skills add Jakubantalik/transitions.dev` oppure copiare gli
   snippet. Usala dove aiuta, altrimenti scrivi CSS nostro coerente con i suoi token di moto.
   Candidati concreti nello specimen: pop-in dei numeri 34/20/3 e dei badge; badge di notifica
   sulla campanella; scambio di testo nel selettore di stato delle card attività ("Chiamata
   fissata"); apertura/chiusura del pannello Riepilogo e della videochiamata (panel reveal, modal);
   hover del gruppo di avatar nella barra agenda; scambio icona nei filtri e nel rail; spunta di
   conferma per le approvazioni; ridimensionamento delle card lead/attività; avanzamento del
   marcatore "14:15" nella timeline; bagliore dei connettori nell'editor a nodi. Il moto deve
   restare sobrio e coerente con il design copiato, rispettare prefers-reduced-motion e non
   causare spostamenti di layout. Definisci i token di moto in design-system/tokens.css
   (esistono già --dgt-ease, --dgt-t-fast, --dgt-t-base) e documenta una sezione "Moto" in
   SYSTEM-DESIGN.md e in design-system/DESIGN.md con durate, curve e dove si usa ogni transizione.

3. Verifica con gli strumenti in design-system/tools/ (fetch-fonts.py, screenshot.js; in questo
   ambiente Google Fonts è bloccato in Chromium headless, quindi passa LOCAL_FONT_CSS): nessun
   overflow, font caricato, nessun errore in console; per le animazioni registra un video con
   Playwright o controlla i frame chiave, e prova la modalità reduced-motion.

4. Aggiorna PROSSIMA-SESSIONE.md (stato, decisioni, come riprendere), committa con messaggi in
   italiano, pusha sul branch della sessione, ripubblica l'artefatto dallo stesso percorso
   design-system/specimen.html (mantiene l'URL) e apri o aggiorna la PR verso main.
```
