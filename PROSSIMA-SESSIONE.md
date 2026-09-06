# Prossima sessione — passaggio di consegne

Stato al 2026-09-06, fine della sessione della **manutenzione** (versione 14 della direzione A · Console: i componenti della
Console in `schermate/componenti.js` con il telefono che importa quello e non più la Console; le prove cliccate della Console e del
mobile nel repository accanto a quella dei Costi; la sezione «moto» dello specimen in `DESIGN.md`). Niente di visibile è cambiato,
con un'eccezione da confermare (decisione 28). Tutto è committato e pushato sul branch indicato sotto, con la PR aperta verso
`main`. **Prossimo passo**: le pagine chat e agenda del rail (vedi «Come riprendere»).

## Stato

- Branch: `claude/console-mobile-maintenance-gwnihs` (da `main`, che contiene le PR #1, #3, #4, #5, #6, #7, #8, #9 e #10; la #10
  era già unita all'inizio di questa sessione). A fine sessione è aperta la **PR #11** verso `main`
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/11): se all'avvio della prossima sessione risulta già unita, ripartire da
  `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si aggiorna da sola.
- **`schermate/componenti.js`** (`window.DGT_COMPONENTI`): il CSS delle primitive (già prefissato `.dirA`), `variabili` (le custom
  property che ogni cornice dichiara sulla propria radice: `.a-app` nella Console, `.m-page` sul telefono) e le funzioni `av`,
  `pair`, `dots`, `chipStato`, `chipEsito`, `iconaTipo`, `nomeTipo`, `eur`, `delta`, `differenze`. `direzione-a.js` le riprende
  con una riga e tiene la cornice, le pagine, le tendine e `monta`; `mobile.js` carica `componenti.js` e non più la Console. Le sei
  pagine (`direzione-a.html`, `mobile.html`, `confronto.html`, `avatar-identita.html`, `avatar-pelli.html`, `confronto-avatar.html`)
  caricano `../componenti.js` dopo `comune.js` e mettono in pagina `DGT_COMPONENTI.css` (stile `css-componenti`) prima del CSS
  della Console. `build-unico.js` non è cambiato. Che cosa sta dove, e come si è tenuta ferma la cascata: `DIREZIONI.md`,
  «Versione 14».
- **Le tre prove cliccate sono nel repository**: `schermate/direzioni/prove/console.js` (64 verifiche), `mobile.js` (39),
  `costi.js` (48), con `prove/README.md` che dice il comando. Passano tutte.
- Artefatto della **Console** (ripubblicato allo stesso indirizzo con l'etichetta «Versione 14: la manutenzione»; il file unico
  ora incorpora anche `componenti.js`, 408 KB): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34. Si rigenera
  con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatto del **mobile** (ripubblicato allo stesso indirizzo con la stessa etichetta; senza la Console il file unico è sceso da
  420 a 301 KB): https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
  (`node schermate/direzioni/build-unico.js mobile.html /percorso/nova-studio-mobile.html`).
- Artefatti precedenti, non ripubblicati (le loro pagine caricano `componenti.js` ma non cambiano di aspetto: identità degli orbi
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6 (`avatar-identita.html`), pelli dell'orbe
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569 (`avatar-pelli.html`), le due famiglie kit/orbe
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526 (`confronto-avatar.html`), confronto A/B/C
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f (`confronto.html`)), specimen
  https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (`DESIGN.md` ora descrive anche la sezione «moto»).
- Documento unico: `SYSTEM-DESIGN.md` (sezione 2 «Dove sta cosa» con `componenti.js` e `prove/`; sezione 8, la riga sui componenti
  del prodotto; sezione 9, le prove; sezione 10, il richiamo alla versione 14; sezione 11 con il branch). Studio e versioni della
  direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4, «Versione 14»: che cosa è stato spostato e dove, la verifica,
  l'eccezione; sezione 5, tabella dei file). `design-system/DESIGN.md`: il blocco `motion` nel frontmatter e la sezione «Moto».
- Screenshot in `schermate/direzioni/screenshot/`: invariati, tranne le quattro catture della revisione sul telefono
  (`mobile-2-revisione.png`, `-differenze`, `-perche`, `-modello`), rifatte per la decisione 28.
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
28. **2026-09-06, questa sessione**: fatta la **manutenzione** (versione 14) come da passaggio di consegne, con la regola «prima e
    dopo gli screenshot devono essere identici e le prove devono passare»: trentuno catture identiche byte per byte, impronte degli
    stili calcolati identiche per la Console e per le pagine degli avatar. **L'unica cosa visibile che cambia, da confermare**: la
    schermata «Richiesta» di una **revisione sul telefono**. Finché il telefono caricava tutta la Console, lo schermo `.m-scr.rev`
    riceveva per errore le regole della card revisione della pagina del Dipendente (`.rev{padding:22px 24px 20px}`, `.rev p`,
    `.rev ul/li`, `.rev .k`): un padding sull'intero schermo, il titolo «Soul prompt v7 → v8» spezzato, il testo del prompt più
    grande. Con il telefono che carica solo i componenti la perdita sparisce e la schermata è come la descrive `mobile.js`. Tenuto
    come correzione (dettaglio e confronto in `DIREZIONI.md`, «Versione 14»); per tornare all'aspetto di prima basterebbe
    `.m-scr.rev{padding:22px 24px 20px}` in `mobile.js`, ma sarebbe copiare un errore. **L'utente non ha ancora visto il
    risultato.**

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere: le pagine chat e agenda del rail

Il lavoro di prodotto successivo, deciso dall'utente a fine sessione precedente (decisione 27) per dopo la manutenzione: i due cerchi
ancora inerti del rail della Console (`i-chat` e `i-cal`, i cerchi 4 e 5 in `cornice` di `direzione-a.js`, senza `data-az`) e le tab
corrispondenti in basso sul telefono (`navigazione` in `mobile.js`: «Chat» e «Agenda», senza `data-az`).

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 2, 6, 8 e 10) e `schermate/direzioni/DIREZIONI.md` (sezione 4 dalla versione 13,
   sezione 5 con la tabella dei file). Controllare il branch e la PR (vedi «Stato»). Rifare i font locali (`fetch-fonts.py`) e
   lanciare le tre prove di `prove/` prima di toccare qualcosa: sono la base di confronto, insieme agli screenshot delle pagine.
2. **Se l'utente manda correzioni** (la revisione sul telefono della decisione 28, la pagina dei Costi, il mobile, altre pagine),
   applicarle prima: le scelte da confermare stanno nelle decisioni 23, 26 e 28.
3. **L'agenda** parte dalla barra «Oggi in azienda» (`.a-sched`, la barra agenda del riferimento, con il cerchio `.go` inerte): gli
   eventi della giornata (le esecuzioni al lavoro, in attesa e in errore), i pianificati (`stato: 'pianificato'` con il loro orario),
   le scadenze degli obiettivi e del mese (Riepilogo, `.goal`). Stessa cornice (titolo AGENDA, tre numeri), stessi componenti: la
   barra agenda a segmenti per il giorno, le card attività per gli eventi, le righe per la settimana; il quinto cerchio del rail
   acceso. Da dove ci si arriva: il cerchio del rail, il cerchio `.go` della barra «Oggi in azienda», la pillola «Sposta» delle
   esecuzioni pianificate (oggi inerte).
4. **La chat** parte dalla barra di scrittura dell'Esecuzione (`.chat`, `esec-invia`: oggi la nota del titolare finisce nel log come
   riga «MR: …»): un filo per dipendente, le note del titolare e le risposte del dipendente (sintetiche, nel modello), la barra chat
   del riferimento in fondo; il quarto cerchio del rail acceso. Da dove ci si arriva: il cerchio del rail, i cerchi `i-chat` inerti
   delle card attività e delle tendine («Commenta»), la pillola «Scrivi a …» dell'Esecuzione (`esec-scrivi`).
5. **Sul telefono** le due tab «Chat» e «Agenda» della navigazione in basso, con lo stesso modello (`dati.js`) e gli stessi
   componenti (`componenti.js`); la tab «Dipartimenti» resta inerte se non richiesta.
6. Modello: quello che serve va in `dati.js` (eventi, fili della chat), senza toccare i numeri che le prove verificano; componenti
   nuovi solo se davvero mancano, e allora in `componenti.js` se servono anche al telefono. Poi come sempre: le prove (`prove/`,
   aggiornarle o aggiungerne), screenshot delle pagine nuove in `screenshot/`, gli artefatti rigenerati e ripubblicati allo stesso
   indirizzo (lettura per intero prima, vedi «Note tecniche»), `DIREZIONI.md` (versione 15), `SYSTEM-DESIGN.md` (sezioni 6, 10, 11),
   i README, questo file, commit, push e PR.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): i filtri inerti delle sezioni Passi, Output e
Costo dell'Esecuzione e le tre pillole inerti della sezione «Spesa del mese» del Dipartimento (la pagina dei Costi ha le sue,
funzionanti); i cerchi cerca / filtri / scarica delle intestazioni; le frecce inerti delle righe per modello; «Sposta», «Ripeti» e
le frecce dei passi senza tendina del passo; lo stato vuoto del dipendente appena creato («Nessuna esecuzione», con un dossier
generato che gli attribuisce una spesa dei 30 giorni); la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8),
le tre schermate del mobile (11 e 12) e la revisione sul telefono dopo la manutenzione (14) mai giudicate; sul telefono i cerchi
«commenta», «filtri» e «ordina», la tab organizzazione, il download e la matita delle card del Riepilogo sono inerti; il badge rosa
«campanella 2» accanto al numero «da approvare» copia quello della riga WORKSPACE della Console (`min(2, n)`) e non ha ancora un
significato nel modello; il badge «↓12%» del numero «spesi oggi» nella home è decorativo (nella pagina dei Costi lo stesso numero
ha il badge «oltre» solo sopra la somma dei limiti del giorno); `design-system/tokens.css` porta solo tre token di moto e un easing
diverso da quello dello specimen (`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`): notato nella sezione «Moto» di `DESIGN.md`,
non toccato.

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (64: tendine, Richieste, editor del dipendente, esecuzione, 40), `mobile.js` (39: i tre
  telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40; a ogni passo nessuno schermo che scorre di
  lato e console pulita) e `costi.js` (48); da qualunque cartella, leggono anche `CHROME_PATH`, girano con `reducedMotion: 'reduce'`,
  escono con 1 se una verifica fallisce. Attenzione: Playwright scorre da solo per cliccare un elemento fuori dallo schermo, quindi
  una verifica sullo scorrimento va fatta con l'elemento già visibile; nella pagina Richieste le richieste in attesa sono card
  `.task[data-az="richiesta"]` (le righe `.hrow` sono lo storico); `.elenco .erow` comprende la card «Aggiungi» (`:not(.add)`).
- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `node design-system/tools/screenshot-page.js "schermate/direzioni/direzione-a.html?pagina=costi" /percorso/a-costi.png 1440 900`
  (dalla radice, con percorsi assoluti: nel Bash della sessione la cartella di lavoro può cambiare fra un comando e l'altro).
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, `H=1100` (l'altezza del viewport: va alzata finché la
  pagina non scorre, altrimenti le catture dopo un clic si spostano; per la pagina dei Costi `H=3200`), `CLICK="sel|sel"`,
  `EVAL="codice"` (per le catture del telefono: scorrere lo schermo con `EVAL` prima della cattura, `SCALE=2 H=1100`).
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora ogni `<script src>` nell'ordine dei tag, anche
  `../componenti.js` e gli script in `avatar/`).
- **Il confronto «niente di visibile cambia»** (usato nella manutenzione, gli script erano fuori dal repository): catturare le stesse
  pagine con gli stessi parametri prima e dopo (`screenshot-page.js`) e confrontare i PNG byte per byte (`cmp`); in più, per ogni
  stato di pagina anche dopo i clic, un'impronta degli stili calcolati di ogni elemento (`getComputedStyle`, i nomi delle proprietà
  ordinati, valori non vuoti, custom property comprese; senza l'indice dell'elemento e senza gli `<style>` in testa, perché uno
  script o uno stile in più spostano gli indici) da confrontare con quella dell'albero originale (`git archive HEAD`). Le differenze
  di un PNG si vedono con un diff a pixel in Chromium (canvas) ritagliato sulla zona che cambia.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script vanno
  lanciati con percorsi assoluti: nel Bash della sessione la cartella di lavoro può restare su una sottocartella dopo un `cd`.
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**. `componenti.js` è un'IIFE come gli altri.
- **La cascata dopo lo spostamento**: le regole spostate stanno in `componenti.js` nello stesso ordine che avevano nella Console e il
  suo `<style>` viene prima di quello della Console, quindi fra due regole di pari specificità vince la stessa di prima. Per ogni
  regola spostata «da dietro» (le varianti aggiunte con le pagine successive) si controlla che nessuna regola rimasta nella Console
  e prima di lei abbia la stessa specificità sulle stesse proprietà per uno stesso elemento. Una regola con selettori misti
  (componenti e cornice, come l'inversione dell'orbe sulle superfici chiare) si divide in due, purché tocchi solo proprietà che
  nessun'altra regola dichiara. Quando si aggiunge una primitiva nuova: il CSS in fondo a `componenti.js`, la funzione nel suo
  `return`, e la riga di destrutturazione in `direzione-a.js` (e in `mobile.js` se serve al telefono).
- **Il telefono non deve caricare la Console**: finché lo faceva, una classe con lo stesso nome (`.rev`) prendeva regole di una pagina
  della Console (decisione 28). Le classi del telefono hanno il prefisso `m-`; le classi condivise sono solo quelle di
  `componenti.js`.
- **L'aggregatore dei costi** (`m.costi(periodo, dip)`): un solo calcolo per la pagina dei Costi e per la sezione «Spesa del mese»
  del Dipartimento; le richieste sono un campione, non il registro (a 11 sommano 233 € in 30 giorni contro i 613 € dei dossier). Se
  un giorno il modello avesse un registro completo delle esecuzioni, l'aggregatore è il solo posto da cambiare.
- L'artefatto si ripubblica allo stesso indirizzo passando `url` allo strumento, dopo averlo letto con `action: read`: lo strumento
  salva il file e chiede che sia letto **per intero** (a blocchi di 250–300 righe nelle zone dense, ognuno sotto i 25 000 token; il
  `grep` non basta). Il file unico della Console pesa circa 408 KB (5 300 righe), quello del mobile 301 KB. Mai forzare. La
  sottoscrizione agli aggiornamenti dell'artefatto non si registra da questa sessione (403): non dire che si sta «guardando».
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS, la card costo su fondo lime, la striscia «chi» e il rail: come
  nelle note delle sessioni precedenti (storia di questo file in git, commit `b50f659`, `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca

1. **Le pagine chat e agenda del rail** (i due cerchi ancora inerti nella Console e le tab del telefono): il prossimo lavoro di
   prodotto (vedi «Come riprendere»).
2. **Il giudizio dell'utente** sulla revisione sul telefono dopo la manutenzione (decisione 28), sulle tre schermate del mobile
   (versioni 11 e 12, decisione 23), sulla pagina del Dipendente (versione 6) e su quella dell'Esecuzione (versione 8): in sospeso,
   non blocca. La pagina dei Costi ha avuto un «bene» (decisione 27).
3. Tendina del passo; stato vuoto del dipendente nuovo; sul telefono le tab e i cerchi inerti; le pillole inerti della sezione
   «Spesa del mese» del Dipartimento; i token di moto di `tokens.css` (vedi «Punti aperti ereditati»).

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #11: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/componenti.js, schermate/direzioni/direzione-a.js,
dati.js, comune.js, avatar/, mobile.js): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji, solo
le icone dello sprite; gli avatar sono quelli della versione 10 (tinta, occhi lilguy, punto di stato, gesto nelle pile).

Costruisci le pagine agenda e chat del rail (PROSSIMA-SESSIONE.md «Come riprendere», punti 3, 4 e 5): l'agenda dalla barra «Oggi
in azienda», la chat dalla barra di scrittura dell'Esecuzione, con le tab corrispondenti sul telefono; proponimi da dove ci si arriva
e scegli tu se non rispondo. Prima lancia le tre prove di prove/ e fai gli screenshot delle pagine che esistono: non devono cambiare.
Poi prove, screenshot, artefatti della Console e del mobile ripubblicati allo stesso indirizzo, DIREZIONI.md (versione 15),
SYSTEM-DESIGN.md, README e PROSSIMA-SESSIONE.md, commit, push e PR. Alla fine mostrami cosa è cambiato e fermati.
```
