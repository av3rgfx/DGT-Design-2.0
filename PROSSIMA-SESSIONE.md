# Prossima sessione — passaggio di consegne

Stato al 2026-09-06, fine della sessione sulla **pagina dei Costi dell'azienda** (versione 13 della direzione A · Console: l'ultima
pagina di prodotto, per dipartimento, dipendente, cliente, modello e strumento, con le pillole del periodo per sezione e un solo
aggregatore dei costi nel modello). Tutto è committato e pushato sul branch indicato sotto, con la **PR #10** aperta verso
`main`. Alla vista delle schermate l'utente ha detto «bene» (decisione 27). **Prossimo passo**: la manutenzione (vedi «Come
riprendere»), poi le pagine chat e agenda del rail.

## Stato

- Branch: `claude/company-costs-page-llxcix` (da `main`, che contiene le PR #1, #3, #4, #5, #6, #7, #8 e #9; la #9 era già unita
  all'inizio di questa sessione). A fine sessione è aperta la **PR #10** verso `main`
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/10): se all'avvio della prossima sessione risulta già unita, ripartire da `main`
  con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si aggiorna da sola.
- La **prova cliccata della pagina dei Costi è nel repository**: `schermate/direzioni/prove/costi.js` (48 verifiche; è la prima
  prova a stare nel repository, quelle della Console e del mobile sono ancora da riscrivere: vedi «Come riprendere», punto 4).
- Artefatto della **Console** (direzione A cliccabile, ora con la pagina Costi; ripubblicato allo stesso indirizzo con l'etichetta
  «Versione 13: la pagina dei Costi»): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34. Si rigenera con
  `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatto del **mobile** (`mobile.html`, non toccato in questa sessione): https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
  (`node schermate/direzioni/build-unico.js mobile.html /percorso/nova-studio-mobile.html`).
- Artefatti precedenti, non toccati: identità degli orbi https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6
  (`avatar-identita.html`), pelli dell'orbe https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
  (`avatar-pelli.html`), le due famiglie kit/orbe https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
  (`confronto-avatar.html`), confronto A/B/C https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`confronto.html`), specimen https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (`DESIGN.md` non descrive
  ancora la sezione «moto» dello specimen: da fare).
- Documento unico: `SYSTEM-DESIGN.md` (sezione 6, riga «Pagina Costi» e la riga «Rail» con i sei cerchi; sezione 10, regola 21;
  sezione 11 con il branch). Studio e versioni della direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4: regola 15 e
  «Versione 13» con quanto costruito e le scelte da confermare; sezione 5, tabella dei file).
- Screenshot in `schermate/direzioni/screenshot/`: `a-costi.png` (la pagina a 11, tendina aperta), `a-costi-40.png`,
  `a-costi-testata.png`, e le sezioni a due volte: `a-costi-dipartimenti.png`, `-dipartimenti-oggi`, `-dipartimenti-anno`,
  `a-costi-dipendenti.png`, `-dipendenti-oggi`, `-dipendenti-anno`, `a-costi-clienti.png`, `-clienti-oggi`, `-clienti-anno`,
  `a-costi-modelli.png`, `-modelli-oggi`, `a-costi-strumenti.png`.
- Regole in `CLAUDE.md`: invariate (direzione A, avatar della versione 10, niente emoji).

## Decisioni dell'utente (in ordine)

1. Brief iniziale con regole UX → variante A (archiviata).
2. "Stile più professionale tipo Apple e Revolut" → variante B (archiviata).
3. Due riferimenti (case study nero/lime; editor a nodi) → procedere da quelli.
4. **"Elimina tutte le regole e i brief precedenti e copia lo stesso identico design degli esempi"** (2026-09-03).
5. Copia rifatta sulle immagini originali a 1920 px del case study; `SYSTEM-DESIGN.md` come documento unico.
6. **2026-09-04**: tre direzioni sulla vista principale, scelta la **direzione A · Console**.
7. Miglioramenti alla A: O normale, logo DGT, pannello del titolare a tendina, pagina Richieste.
8. Riepilogo separato (`Va bene separato`), tendina aperta all'apertura, pagina Richieste completa.
9. Pagina Dipartimento (`Va bene procedi`).
10. **I dipendenti**: di base senza nome (etichetta = ruolo, sotto il dipartimento; nome facoltativo); tendina
    «Dipendente» per creare e modificare; avatar generati dal kit dell'utente nel linguaggio del sistema.
11. Avatar «più clean e più dinamici, stile Grok»: famiglia **orbe**, poi scelta (`Teniamo l'orbe`), occhi più grandi,
    moti del corpo per stato, cicli meno frequenti, occhi gialli da approvare. Il kit resta dietro `?avatar=kit`.
12. «Togliere le animazioni dietro gli avatar (le animazioni degli avatar non le devi toccare)»: tolti l'arco e le
    onde (versione 5c).
13. La pagina del Dipendente dal brief dell'utente (versione 6): identità, soul prompt con versioni e confronto,
    modello e criterio, strumenti, budget e permessi, colloquio, metriche; la revisione di performance come richiesta
    al titolare con evidenze. **L'utente non ha ancora dato un giudizio.**
14. **2026-09-04, lavoro 1**: «l'avatar sembra un'icona animata; deve essere un avatar, senza quel contorno bianco»: disco
    e anello tolti; quattro pelli a confronto (`avatar-pelli.html`). Scelta «chiaro», poi superata dalla decisione 16.
15. **Lavoro 2**: la pagina dell'Esecuzione (passi, log, output) dall'«occhio» delle card al lavoro (versione 8). **Da
    confermare dall'utente** (non ancora giudicata).
16. **Seconda tornata sull'avatar**: «Chiaro non va bene. Poi vorrei renderli tondi e meno ovali. E le animazioni non
    mi piacciono, sono scadenti e poco fluide» → pelle **perla**, **corpi tondi**, **moti continui** (versione 7b). «Così
    già meglio».
17. **Terza tornata**: «preferivo gli occhi del kit di riferimento» → le pupille del kit sulla sfera (versione 7c). «va
    bene adesso».
18. **Correzioni della cornice** (versione 9): la Console si scala con `zoom` alla larghezza dello schermo; chip di stato al
    posto dell'avatar ripetuto; il «+N» dopo la pila; **niente emoji** nel prodotto e nel sistema (regola fondamentale in
    `CLAUDE.md`, `i-fire` al posto della fiamma).
19. **2026-09-05, l'identità degli orbi**: perle colorate → colori vivaci, occhi di lilguy.net ricreati, corpi piatti →
    strade 1 e 8 → pupille sempre nere → **«Scelgo la 1»** (vivace piatto, occhi lilguy con sclera bianca e pupilla nera,
    tinta del dipendente). Lo stato: tre varianti → **punto** sul bordo come standard, **gesto** nelle pile (versione 10).
20. La struttura delle **approvazioni da mobile** proposta è accettata («si procederà con le approvazioni da mobile come
    proposto»).
21. **2026-09-05**: costruita la **prima metà del mobile** (schermate 1 e 2 per post, documento, lista e proposta, rifiuto con
    motivo, `m.decidi` nel modello). Scelte fatte in costruzione, da confermare: il rifiuto chiede sempre il motivo (anche dalla
    card della prima schermata); approvare è al volo; due numeri invece di tre sulla prima schermata («spesi oggi» va nel
    Riepilogo); i telefoni affiancati condividono modello e richiesta corrente.
22. **Prima correzione dell'utente sul mobile** («l'icona delle approvazioni ha lo stesso colore di alcune card e quando scorri
    non si distingue; invece di cambiare colore al pulsante, sfondo sfocato e leggermente oscurato nella parte bassa dove c'è la
    navbar»): fatto, fascia `.m-navfondo` sotto la navigazione (blur 14, nero al 16 %, bordo alto sfumato). La regola che ne
    esce: un pulsante non cambia colore per distinguersi, è il fondo a farsi da parte.
23. **2026-09-06**: costruita la **seconda metà del mobile** come da struttura (Riepilogo di oggi, stato vuoto, revisione sul
    telefono, revisioni in coda, prova a quaranta). **L'utente non ha ancora visto né giudicato le tre schermate.** Scelte fatte in
    costruzione, da confermare (dettaglio in `DIREZIONI.md`, «Versione 12»): a coda finita la prima schermata prende il fondo del
    Riepilogo `#F4F4F4` e la card «Niente da approvare» è bianca con il cerchio nero della spunta; nel Riepilogo la data sta nella
    riga di navigazione come chip e sotto il titolo stanno i tre numeri della riga WORKSPACE; le miniature delle consegne sono le
    due consegne di oggi più recenti; il diario mostra le ultime cinque voci; nella revisione il titolo è corto e le evidenze
    stanno in colonna; la spunta della card di una revisione applica al volo; la prova è la pillola bianca sopra l'applica lime.
24. **Correzione dell'utente sulla versione 12** («ci sono componenti che si sovrappongono»): fatto, il corpo che scorre del
    telefono è un piano a sé (`.m-scroll` con `z-index: 0`) e la barra in basso sta sempre sopra il contenuto.
25. **Fine della sessione precedente**: l'utente ha scelto **la pagina dei costi dell'azienda** come lavoro della sessione
    successiva; il giudizio sulle tre schermate del mobile resta in sospeso e non blocca.
26. **2026-09-06, questa sessione**: costruita la **pagina dei Costi** (versione 13) come da passaggio di consegne, con le
    scelte che il prompt lasciava a me («proponimi da dove ci si arriva e scegli tu se non rispondo»). **L'utente non ha ancora
    visto né giudicato la pagina.** Scelte fatte in costruzione, da confermare (dettaglio in `DIREZIONI.md`, «Versione 13»):
    - **da dove ci si arriva**: il sesto cerchio del rail (euro, dopo il calendario), il numero «spesi oggi» cliccabile nella
      home, nel Dipartimento e nel Dipendente, la pillola «Tutti i costi dell'azienda» nelle sezioni «Spesa del mese» del
      Dipartimento e «Costo» dell'Esecuzione;
    - **i periodi**: pillole per sezione, indipendenti, solo per i periodi che i dati reggono (Oggi · Ultimi 30 giorni · Da
      inizio anno; per modello senza l'anno; per strumento solo oggi); niente «7 giorni», che il modello non ha;
    - **un solo aggregatore** (`m.costi` in `dati.js`) per la pagina e per la sezione «Spesa del mese» del Dipartimento, con la
      spesa per cliente ripartita in proporzione alle richieste: le quattro viste sommano allo stesso totale (613 € a 11);
      i numeri della sezione «Spesa del mese» del Dipartimento sono quindi cambiati (prima contava le sole richieste);
    - **due correzioni di coerenza nei dati**: il budget speso del Social media manager da 140 a 43 € (la sua spesa dei 30
      giorni, anche nel testo della revisione) e i costi per modello dei dossier generati che ora ripartiscono la spesa;
    - niente pillola «Nuovo…» nella testata (è una pagina che si legge), «restano di N €» come terzo numero;
    - la freccia della riga di un cliente apre Richieste filtrate solo se il cliente ha richieste (Zenith a 11 no).
27. **Fine della sessione**: alla vista delle schermate della pagina dei Costi l'utente ha detto **«bene»**, senza correzioni
    (le scelte della decisione 26 restano segnate come fatte in costruzione: si riaprono solo se l'utente le rimette in
    discussione); ha scelto la **manutenzione** come lavoro della prossima sessione e ha chiesto la PR (#10). Le pagine chat e
    agenda del rail vengono dopo la manutenzione.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere: la manutenzione

Scelta dall'utente a fine sessione (decisione 27). Tre lavori, **senza cambiare nulla di visibile**: prima e dopo, gli screenshot
delle pagine devono essere identici (`screenshot-page.js`, stesse pagine e parametri, confronto a occhio o con un diff delle
immagini) e le prove cliccate devono passare.

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 2 «Dove sta cosa», sezioni 6 e 10) e `schermate/direzioni/DIREZIONI.md`
   (sezione 5, la tabella dei file). Controllare il branch e la PR (vedi «Stato»). Rifare i font locali (`fetch-fonts.py`) e
   lanciare `prove/costi.js` prima di toccare qualcosa: è la base di confronto, insieme agli screenshot delle pagine.
2. **Se l'utente manda correzioni** (pagina dei Costi, mobile, altre pagine), applicarle prima: le scelte da confermare stanno
   nelle decisioni 23 e 26.
3. **I componenti della Console in `schermate/componenti.js`**. Oggi `mobile.js` importa tutta `direzione-a.js` per usarne il CSS
   (classi `.dirA`) e quattro funzioni (`av`, `iconaTipo`, `nomeTipo`, `differenze`). Spostare in `componenti.js` (stesso stile:
   IIFE su `window`, niente moduli ESM, tutto gira da `file://` e come file unico) le primitive condivise: il CSS delle primitive
   (`.rb`, `.av`, `.pair`, `.pill`, `.chip`, `.dots`, `.badge`, `.ncard`, `.nt`, `.lead`, `.task`, `.crow`, `.hrow`, `.erow`,
   `.ripart`, `.leg`, `.prog`, `.dcard`, `.kv`, le variabili di `.a-app`) e le funzioni `av`, `pair`, `chipStato`, `chipEsito`,
   `iconaTipo`, `nomeTipo`, `eur`, `delta`, `differenze` (con `lcs` e `parole`). `direzione-a.js` le riprende da
   `window.DGT_COMPONENTI` e tiene le pagine, la cornice, le tendine e `monta`; `mobile.js` importa `componenti.js` e non più la
   Console. Aggiornare i tag `<script>` di `direzione-a.html`, `mobile.html`, `confronto.html`, `avatar-identita.html`,
   `avatar-pelli.html`, `confronto-avatar.html` e `build-unico.js` (incorpora ogni `<script src>`: basta l'ordine dei tag).
   Verificare con gli screenshot identici (Console: home, dipartimento, dipendente, esecuzione, costi, 40; mobile) e con la prova
   dei Costi.
4. **Le prove cliccate nel repository** (`schermate/direzioni/prove/`): accanto a `costi.js` riscrivere `console.js` (tendine:
   approva dalla tendina, apre la revisione ed estende, rifiuta con motivo, riduce, apre il riepilogo; pagina Richieste con
   «Approva tutte»; editor del dipendente: crea, modifica, tinta; esecuzione: pausa, interrompi, riprova, avvia, nota del
   titolare; 40) e `mobile.js` (le tre schermate; a ogni passo nessun `.m-scr` con `scrollWidth > clientWidth` e console pulita;
   la riga della revisione, le frecce, il rifiuto con motivo (conferma vuota = bordo rosso, poi motivo + Invio), la prova della
   revisione del prompt, approva le altre fino allo stato vuoto; `?n=40`: conta la coda, badge «12», il titolo più lungo), con un
   `prove/README.md` che dice il comando. Le prove leggono `LOCAL_FONT_CSS`, `PLAYWRIGHT_MODULE`, `CHROME_PATH` come `costi.js`.
5. **La sezione «moto» dello specimen in `design-system/DESIGN.md`**: leggere `specimen.html` (la sezione moto: che cosa si muove,
   durate, easing, cosa resta fermo con `prefers-reduced-motion`) e descriverla nello stesso stile delle altre sezioni di
   `DESIGN.md`; niente cambi allo specimen.
6. Poi come sempre: prove, screenshot solo per il confronto (non devono cambiare), artefatti: il file unico cambia perché
   incorpora un file in più, quindi rigenerare e ripubblicare Console e mobile allo stesso indirizzo (lettura per intero prima,
   vedi «Note tecniche»); `DIREZIONI.md` (versione 14, «manutenzione»: che cosa è stato spostato e dove), `SYSTEM-DESIGN.md`
   (sezione 2 «Dove sta cosa»), i README (`design-system/tools/README.md` per le prove), questo file, commit, push e PR.

Dopo la manutenzione, il lavoro di prodotto successivo: **le pagine chat e agenda del rail**, i due cerchi ancora inerti nella
Console e le tab corrispondenti sul telefono. L'agenda parte dalla barra «Oggi in azienda» (gli eventi della giornata, i
pianificati, le scadenze degli obiettivi e del mese); la chat dalla barra di scrittura dell'Esecuzione (un filo per dipendente,
le note del titolare che oggi finiscono nel log).

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): i filtri inerti delle sezioni Passi, Output e
Costo dell'Esecuzione e le tre pillole inerti della sezione «Spesa del mese» del Dipartimento (la pagina dei Costi ha le sue,
funzionanti); i cerchi cerca / filtri / scarica delle intestazioni; le frecce inerti delle righe per modello; «Sposta», «Ripeti» e
le frecce dei passi senza tendina del passo; lo stato vuoto del dipendente appena creato («Nessuna esecuzione», con un dossier
generato che gli attribuisce una spesa dei 30 giorni); la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8),
le tre schermate del mobile (11 e 12) e la pagina dei Costi (13) mai giudicate; sul telefono i cerchi «commenta», «filtri» e
«ordina», le tab organizzazione / chat / agenda, il download e la matita delle card del Riepilogo sono inerti; il badge rosa
«campanella 2» accanto al numero «da approvare» copia quello della riga WORKSPACE della Console (`min(2, n)`) e non ha ancora un
significato nel modello; il badge «↓12%» del numero «spesi oggi» nella home è decorativo (nella pagina dei Costi lo stesso numero
ha il badge «oltre» solo sopra la somma dei limiti del giorno).

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node design-system/tools/screenshot-page.js "schermate/direzioni/direzione-a.html?pagina=costi" /percorso/a-costi.png 1440 900`
  (dalla radice, con percorsi assoluti: nel Bash della sessione la cartella di lavoro può cambiare fra un comando e l'altro).
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, `H=1100` (l'altezza del viewport: va alzata finché la
  pagina non scorre, altrimenti le catture dopo un clic si spostano; per la pagina dei Costi `H=3200`), `CLICK="sel|sel"`,
  `EVAL="codice"`. Per le sezioni della pagina dei Costi: `'.a-main > section:nth-child(1)'` … `nth-child(5)`, con
  `CLICK='[data-az="periodo"][data-sez="dipartimenti"][data-v="oggi"]'` per cambiare periodo prima della cattura.
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Prove cliccate: **`schermate/direzioni/prove/costi.js`** è nel repository (48 verifiche della pagina dei Costi:
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node
  schermate/direzioni/prove/costi.js`, da qualunque cartella; legge anche `CHROME_PATH`). Che cosa verifica: sei cerchi nel rail e
  il sesto attivo; i tre numeri; le quattro sezioni allo stesso totale; le pillole per sezione (lo scorrimento resta dov'era, i
  periodi sono indipendenti); i collegamenti da e verso Dipartimento, Dipendente, Richieste (filtro cliente), home, Esecuzione;
  approvare dalla tendina; la vista compatta a 40; il telefono che carica ancora la Console. Attenzione: Playwright scorre da solo
  per cliccare una pillola fuori dallo schermo, quindi la verifica dello scorrimento va fatta con la pillola già visibile.
  **Console** e **mobile**: ancora fuori dal repository, da riscrivere nella manutenzione (vedi «Come riprendere», punto 4) dalle
  descrizioni delle sessioni precedenti (storia di questo file in git, commit `d2b625c`).

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script vanno
  lanciati con percorsi assoluti: nel Bash della sessione la cartella di lavoro può restare su una sottocartella dopo un `cd`.
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**.
- **L'aggregatore dei costi** (`m.costi(periodo, dip)`): un solo calcolo per la pagina dei Costi e per la sezione «Spesa del mese»
  del Dipartimento. I tre periodi leggono fonti diverse del modello (oggi `e.att.costo`, 30 giorni `metriche.ora.spesa`, dalla
  creazione anche `metriche.prima` e le versioni vecchie del prompt); la ripartizione per cliente pesa le richieste del periodo
  (oggi solo il cliente dell'esecuzione) e arrotonda a interi che sommano al totale (`interi`); per modello oggi contano i passi
  fatti, in corso e in errore delle esecuzioni con un costo (`oggiConta`), nei 30 giorni `modello.uso`; per strumento solo oggi.
  Se un giorno il modello avesse un registro completo delle esecuzioni, l'aggregatore è il solo posto da cambiare.
- **Le richieste sono un campione, non il registro**: a 11 sommano 233 € in 30 giorni contro i 613 € dei dossier. Per questo la
  spesa non si calcola più dalle richieste (come faceva la sezione «Spesa del mese») e non c'è la pillola «7 giorni».
- **Coerenza dei dati scritti a mano**: quando due numeri finiscono uno accanto all'altro (spesa dei 30 giorni e budget speso) le
  incoerenze del modello si vedono; le due correzioni della versione 13 sono nel `dati.js` e in `DIREZIONI.md`.
- **La card costo su fondo lime**: la ripartizione per modello passa a nero (Standard) / bianco (Esperto) / grigio (Rapido), e il
  fondo della pillola a `rgb(0 0 0/.12)`, altrimenti il lime sparisce sul lime (`.task.lime .ripart`).
- **La striscia «chi» della card attività** ha 120 px di spazio a destra per i due pulsanti dell'intaglio: «Amministrazione» non ci
  sta. Con un solo pulsante nell'intaglio (`.task.spesa.dpt .who{padding-right:72px}`) il nome del dipartimento sta intero; il
  selettore in basso ha 172 px, tolto il cerchio «commenta» ne ha 228 e «243 consegne» non si tronca.
- **Il rail** è una griglia con gap 12: sei cerchi occupano 348 px da 260, sotto l'ultimo la pagina continua senza problemi.
- L'artefatto si ripubblica allo stesso indirizzo passando `url` allo strumento, dopo averlo letto con `action: read`: lo strumento
  salva il file e chiede che sia letto **per intero** (a blocchi di 300–1000 righe, ognuno sotto i 25 000 token; il `grep` non
  basta più). Il file unico della Console pesa circa 404 KB. Mai forzare.
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS: come nelle note delle sessioni precedenti (storia di questo file
  in git, commit `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca

1. **Manutenzione** (scelta dall'utente per la prossima sessione, vedi «Come riprendere»): i componenti della Console in
   `schermate/componenti.js` con il mobile che importa quello; le prove cliccate della Console e del mobile nel repository (quella
   dei Costi c'è già); la sezione «moto» dello specimen in `DESIGN.md`.
2. **Le pagine chat e agenda del rail** (i due cerchi ancora inerti nella Console e le tab del telefono), dopo la manutenzione.
3. **Il giudizio dell'utente** sulle tre schermate del mobile (versioni 11 e 12, decisione 23), sulla pagina del Dipendente
   (versione 6) e su quella dell'Esecuzione (versione 8): in sospeso, non blocca. La pagina dei Costi ha avuto un «bene»
   (decisione 27).
4. Tendina del passo; stato vuoto del dipendente nuovo; sul telefono le tab e i cerchi inerti; le pillole inerti della sezione
   «Spesa del mese» del Dipartimento (vedi «Punti aperti ereditati»).

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #10: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/direzioni/direzione-a.js, dati.js, comune.js,
avatar/, mobile.js): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji, solo le icone dello
sprite; gli avatar sono quelli della versione 10 (tinta, occhi lilguy, punto di stato, gesto nelle pile).

Fai la manutenzione (PROSSIMA-SESSIONE.md «Come riprendere», punti 3, 4 e 5) senza cambiare nulla di visibile: i componenti
della Console in schermate/componenti.js, con il mobile che importa quello e non più la Console; le prove cliccate della Console
e del mobile nel repository accanto a prove/costi.js; la sezione «moto» dello specimen in DESIGN.md. Prima e dopo gli screenshot
devono essere identici e le prove devono passare. Poi rigenera e ripubblica gli artefatti della Console e del mobile, aggiorna
DIREZIONI.md, SYSTEM-DESIGN.md, README e PROSSIMA-SESSIONE.md, commit, push e PR. Alla fine mostrami cosa è cambiato e fermati.
```
