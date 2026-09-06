# Prossima sessione — passaggio di consegne

Stato al 2026-09-06, fine della sessione delle **pagine Agenda e Chat** (versione 15 della direzione A · Console: i due cerchi del
rail che erano inerti ora aprono due pagine vere, e sul telefono ci sono le tab corrispondenti più la conversazione), più la
**correzione degli avatar decentrati** chiesta dall'utente a fine sessione (15a: l'avatar torna al centro della sua casella in tutto
il prodotto). Le pagine che già esistevano non sono cambiate a parte quello: verificato byte per byte prima e dopo. Tutto è committato e pushato sul branch indicato sotto, con
la PR aperta verso `main`. **Prossimo passo**: da scegliere (proposta in «Come riprendere»).

## Stato

- Branch: `claude/direzione-a-agenda-chat-l1z8tr` (da `main`, che contiene le PR da #1 a #11; la **#11 era già unita** all'inizio di
  questa sessione, quindi si è ripartiti da `main` con questo branch nuovo, come chiedeva il prompt). A fine sessione è aperta la
  **PR #12** verso `main` (https://github.com/av3rgfx/DGT-Design-2.0/pull/12): se all'avvio della prossima sessione risulta già
  unita, ripartire da `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si aggiorna da sola.
- **La pagina Agenda** (`?pagina=agenda`, quinto cerchio del rail): il giorno dell'azienda in quattro sezioni — la **barra del
  giorno** (la barra agenda del riferimento allargata a tutta la larghezza: le ore, i blocchi delle esecuzioni con la pila degli
  avatar, «adesso» sulla linea del presente, il blocco in errore rosa), le **esecuzioni di oggi** come card, la **settimana**
  (sette righe da giovedì 4 a mercoledì 10 settembre: i pianificati «ogni …», le prossime consegne, le scadenze) e le **scadenze**
  degli obiettivi, dalla più vicina. Filtri a pillola sopra la barra (tutti · al lavoro · da approvare · pianificati · in errore).
  Un blocco o una card aprono l'Esecuzione.
- **La pagina Chat** (`?pagina=chat&filo=<id>`, quarto cerchio del rail): a sinistra l'elenco dei fili (uno per dipendente, i non
  letti prima, poi per ora dell'ultimo messaggio), a destra il filo aperto con i messaggi (dipendente a sinistra, titolare a
  destra, sistema al centro come chip), le consegne in attesa come righe decidibili dentro il filo e la barra di scrittura del
  riferimento in fondo. Filtri a pillola (tutti · non letti · al lavoro · da approvare).
- **La conversazione è una sola**: una nota scritta nella barra dell'Esecuzione finisce nel log **e** nel filo del dipendente; una
  scritta nella chat resta nel filo. Il modello ha `m.scrivi(id, testo)`, `m.filoDi(e)`, `m.ultimoDi(e)`, `m.nonLetti(e)`,
  `m.fili()`; i fili di quattro dipendenti (Nora, Kim, Social media manager, Ricerca lead) sono scritti a mano, gli altri sono
  generati dai passi dell'esecuzione corrente.
- **Sul telefono** tre schermate nuove: «Chat» (4, l'elenco dei fili), «Conversazione» (5, il filo aperto in fondo con la barra di
  scrittura) e «Agenda» (6, il giorno sulla linea del tempo del Riepilogo e poi la settimana); le due tab in basso sono accese.
  `mobile.html` mostra sei telefoni (`?schermata=1…6`, `?filo=<id>`). La tab «Dipartimenti» resta l'unica inerte.
- **Componenti**: una sola primitiva nuova, `messaggio(m, e, v)` in `schermate/componenti.js` (la bolla del messaggio, condivisa
  fra Console e telefono). Cornice, colori e icone del sistema non sono cambiati; nessuna emoji.
- **Le quattro prove cliccate** passano tutte: `prove/console.js` (64 verifiche), `mobile.js` (39, ora sui sei telefoni),
  `costi.js` (48) e la nuova `agenda-chat.js` (54: da dove ci si arriva, la barra del giorno, i filtri, il filo, la scrittura, le
  due tab del telefono, i 40).
- **Niente di visibile è cambiato nelle pagine che già esistevano**: le 25 catture della Console e delle sue pagine sono identiche
  byte per byte prima e dopo; i quattro telefoni delle schermate 1, 2, 3 e della revisione sono identici all'albero di partenza
  (`git archive HEAD`) una volta tolta l'intestazione della pagina di studio, che cambia di proposito (il testo più lungo sposta i
  telefoni di una frazione di pixel sotto `zoom: 1.25`).
- **La correzione degli avatar (15a)**: l'orbe cresce oltre la casella con la proprietà `scale` (attorno al centro) e non più
  con `width`/`height` in percentuale, che dentro la griglia di `.av` facevano crescere la riga e cadere l'avatar verso il basso
  di `(scala − 1) / 2` (3,4 px a 28, 6,2 a 48, 9,5 sul grande). Una riga in `avatar/avatar-orbe.js`; il disco resta della stessa
  misura. Misurato su ogni avatar di ogni pagina: mille avatar, scarto massimo 0 px. Dettaglio in `DIREZIONI.md`,
  «Correzione 15a», e regola 23 in `SYSTEM-DESIGN.md`.
- Screenshot nuovi in `schermate/direzioni/screenshot/`: `a-agenda.png`, `a-agenda-giorno.png`, `a-agenda-settimana.png`,
  `a-agenda-scadenze.png`, `a-agenda-40.png`, `a-chat.png`, `a-chat-nora.png`, `a-chat-filo.png`, `mobile-4-chat.png`,
  `mobile-5-filo.png`, `mobile-5-filo-kim.png`, `mobile-6-agenda.png`, `mobile-6-agenda-giorni.png`; `mobile.png` rifatto (sei
  telefoni invece di tre). Con la correzione 15a sono state **rigenerate 56 delle 71 catture** (cambia solo la posizione degli
  avatar); otto non hanno avatar e sono venute identiche byte per byte. Non rigenerate: `b-11`, `b-40`, `c-11`, `c-40` (lo studio
  delle direzioni B e C del 2026-09-04, lasciato com'era: rifarlo oggi cambierebbe anche il testo, che è stato catturato con un
  altro font locale) e `avatar-orbe-pellicola.png` (la pellicola del moto, fatta con uno script mai entrato nel repository).
- Artefatto della **Console** (ripubblicato allo stesso indirizzo, etichette «Versione 15: agenda e chat» e «Avatar centrati nella casella»; il file unico è 447 KB):
  https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34. Si rigenera con
  `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatto del **telefono** (ripubblicato allo stesso indirizzo, etichette «Versione 15: chat e agenda» e «Avatar centrati nella casella»; 330 KB):
  https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
  (`node schermate/direzioni/build-unico.js mobile.html /percorso/nova-studio-mobile.html`).
- Artefatti precedenti, non ripubblicati (le loro pagine non cambiano): identità degli orbi
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6 (`avatar-identita.html`), pelli dell'orbe
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569 (`avatar-pelli.html`), le due famiglie kit/orbe
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526 (`confronto-avatar.html`), confronto A/B/C
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f (`confronto.html`), specimen
  https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b.
- Documento unico: `SYSTEM-DESIGN.md` (sezione 2 «Dove sta cosa»; sezione 6 con le righe «Pagina Agenda» e «Pagina Chat» e il rail
  senza cerchi inerti; sezione 9 con le quattro prove; sezione 10, regola 22 e la versione 15; sezione 11 con il branch). Studio e
  versioni della direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4, «Versione 15»: le due pagine, la tabella di dove ci si
  arriva, il telefono, la verifica, i punti aperti nuovi; sezione 5, tabella dei file).
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
25. **Fine della sessione**: l'utente ha scelto **la pagina dei costi dell'azienda** come lavoro della sessione successiva; il
    giudizio sulle tre schermate del mobile resta in sospeso e non blocca.
26. **2026-09-06**: costruita la **pagina dei Costi** (versione 13) con le scelte che il prompt lasciava a me. Scelte fatte in
    costruzione, da confermare (dettaglio in `DIREZIONI.md`, «Versione 13»): il sesto cerchio del rail, il numero «spesi oggi»
    cliccabile e la pillola «Tutti i costi dell'azienda» come strade per arrivarci; le pillole del periodo per sezione,
    indipendenti; un solo aggregatore (`m.costi`) per la pagina e per la sezione «Spesa del mese» del Dipartimento, con la spesa
    per cliente ripartita in proporzione alle richieste; due correzioni di coerenza nei dati (budget speso del Social media
    manager, costi per modello dei dossier generati).
27. **Fine della sessione**: alla vista delle schermate della pagina dei Costi l'utente ha detto **«bene»**, senza correzioni; ha
    scelto la **manutenzione** come lavoro della sessione successiva e ha chiesto la PR (#10). Le pagine chat e agenda del rail
    vengono dopo la manutenzione.
28. **2026-09-06**: fatta la **manutenzione** (versione 14), con la regola «prima e dopo gli screenshot devono essere identici e le
    prove devono passare». **L'unica cosa visibile che cambia, da confermare**: la schermata «Richiesta» di una **revisione sul
    telefono** (finché il telefono caricava tutta la Console, `.m-scr.rev` riceveva per errore le regole della card revisione della
    pagina del Dipendente). Tenuta come correzione; dettaglio e confronto in `DIREZIONI.md`, «Versione 14».
29. **Fine della sessione**: l'utente ha chiuso senza correzioni («bene, sessione conclusa») e ha chiesto il passaggio di consegne,
    il prompt di avvio e la PR (#11).
30. **2026-09-06, questa sessione**: costruite le **pagine Agenda e Chat** (versione 15) come da passaggio di consegne, con le
    scelte che il prompt lasciava a me («proponimi da dove ci si arriva e scegli tu se non rispondo»; la revisione sul telefono
    della decisione 28 non è stata rimessa in discussione). **L'utente non ha ancora visto né giudicato le due pagine.** Scelte
    fatte in costruzione, da confermare (dettaglio in `DIREZIONI.md`, «Versione 15»):
    - **da dove si arriva all'agenda**: il quinto cerchio del rail, il cerchio `.go` della barra «Oggi in azienda» (che era
      inerte) e la pillola «Sposta» delle esecuzioni pianificate;
    - **da dove si arriva alla chat**: il quarto cerchio del rail, i cerchi `i-chat` delle card (attività, esecuzione, ultima
      consegna), «Commenta» nelle due tendine del titolare e la pillola «Scrivi a …» dell'Esecuzione;
    - **una sola conversazione**: la nota scritta nell'Esecuzione va nel log e nel filo, quella scritta nella chat solo nel filo;
      il filo non è un canale a parte ma la stessa voce del titolare;
    - **l'agenda è il giorno, non il calendario**: la barra delle ore con i blocchi (il componente del riferimento allargato), poi
      le esecuzioni di oggi, la settimana come righe e le scadenze; niente vista mensile, che il modello non ha;
    - **i fili si ordinano per attenzione**: i non letti prima, poi per ora dell'ultimo messaggio; il «non letto» è il messaggio
      del dipendente che il titolare non ha ancora aperto;
    - le consegne in attesa compaiono dentro il filo come righe decidibili: si approva dalla chat con la stessa `m.decidi` di
      tutte le altre pagine;
    - sul telefono la conversazione è una schermata a sé (5) che si apre già scorsa in fondo, e la riga di navigazione sta fuori
      dal corpo che scorre.

31. **Correzione dell'utente a fine sessione**: «in ogni pagina (nell'intero prodotto) gli avatar piccoli sono decentrati e
    spostati un po' verso il basso». Era vero e valeva per tutti gli avatar, non solo i piccoli: la casella li spingeva in basso
    di `(scala − 1) / 2` (vedi «Stato» e `DIREZIONI.md`, «Correzione 15a»). Corretto con una riga (`scale` al posto delle
    percentuali), screenshot e artefatti rifatti. **L'utente non ha ancora visto il risultato.**

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere: il lavoro non è ancora scelto

Il rail della Console non ha più cerchi inerti e il telefono ha una sola tab spenta. Il prossimo lavoro lo sceglie l'utente; se non
risponde, l'ordine proposto è questo.

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 2, 6, 8 e 10) e `schermate/direzioni/DIREZIONI.md` (sezione 4 dalla versione 13,
   sezione 5 con la tabella dei file). Controllare il branch e la PR (vedi «Stato»). Rifare i font locali (`fetch-fonts.py`) e
   lanciare le **quattro** prove di `prove/` prima di toccare qualcosa: sono la base di confronto, insieme agli screenshot.
2. **Se l'utente manda correzioni** (le pagine Agenda e Chat, la revisione sul telefono, la pagina dei Costi, il mobile),
   applicarle prima: le scelte da confermare stanno nelle decisioni 23, 26, 28 e 30.
3. **Proposta A — la tab «Dipartimenti» del telefono** (l'ultima inerte): l'organizzazione sul telefono, i quattro dipartimenti
   come righe con la pila degli avatar e il numero al lavoro, e il dipartimento aperto con i suoi dipendenti; stesso modello,
   stessi componenti, la pagina Dipartimento della Console come riferimento.
4. **Proposta B — la tendina del passo** nell'Esecuzione (le frecce dei passi oggi non aprono niente): che cosa ha fatto il
   dipendente in quel passo, gli strumenti chiamati con il costo, l'uscita del passo; è il punto aperto più vecchio.
5. **Proposta C — i controlli ancora inerti**: cerca / filtri / scarica delle intestazioni, i filtri delle sezioni Passi, Output e
   Costo dell'Esecuzione, le tre pillole della sezione «Spesa del mese» del Dipartimento, le frecce delle righe per modello.
   Lavoro di rifinitura, tutto già disegnato: si tratta di collegarlo.
6. Comunque vada: modello in `dati.js` senza toccare i numeri che le prove verificano; componenti nuovi solo se davvero mancano, e
   allora in `componenti.js` se servono anche al telefono. Poi le prove (aggiornarle o aggiungerne), gli screenshot in
   `screenshot/`, gli artefatti rigenerati e ripubblicati allo stesso indirizzo (lettura per intero prima, vedi «Note tecniche»),
   `DIREZIONI.md` (versione 16), `SYSTEM-DESIGN.md`, i README, questo file, commit, push e PR.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): la tendina del passo e i filtri inerti
dell'Esecuzione; le tre pillole della sezione «Spesa del mese» del Dipartimento (la pagina dei Costi ha le sue, funzionanti); i
cerchi cerca / filtri / scarica delle intestazioni; le frecce inerti delle righe per modello; «Ripeti»; lo stato vuoto del
dipendente appena creato; la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8), le schermate del mobile
(11 e 12) e la revisione sul telefono (14) mai giudicate; sul telefono la tab «Dipartimenti», i cerchi «filtri» e «ordina», il
download e la matita delle card del Riepilogo sono inerti; il badge rosa «campanella 2» accanto al numero «da approvare» copia
quello della riga WORKSPACE della Console (`min(2, n)`) e non ha ancora un significato nel modello; il badge «↓12%» del numero
«spesi oggi» nella home è decorativo; `design-system/tokens.css` porta solo tre token di moto e un easing diverso da quello dello
specimen (`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`).
Punti aperti nuovi della versione 15: nell'agenda «Sposta» porta all'agenda ma non sposta davvero l'orario (il modello non ha una
mutazione per farlo) e i giorni della settimana non si aprono; nella chat il dipendente non risponde da solo alla nota del titolare
(il filo aggiunge solo la voce del titolare) e non c'è ricerca dentro il filo; il «non letto» si azzera aprendo il filo e non
sopravvive al ricaricamento della pagina.

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (64: tendine, Richieste, editor del dipendente, esecuzione, 40), `mobile.js` (39: i
  sei telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40; a ogni passo nessuno schermo che
  scorre di lato e console pulita), `costi.js` (48) e `agenda-chat.js` (54: le due pagine nuove, da dove ci si arriva, i filtri, la
  scrittura nel filo, le due tab del telefono); da qualunque cartella, leggono anche `CHROME_PATH`, girano con
  `reducedMotion: 'reduce'`, escono con 1 se una verifica fallisce. Attenzione: Playwright scorre da solo per cliccare un elemento
  fuori dallo schermo, quindi una verifica sullo scorrimento va fatta con l'elemento già visibile; nella pagina Richieste le
  richieste in attesa sono card `.task[data-az="richiesta"]` (le righe `.hrow` sono lo storico); `.elenco .erow` comprende la card
  «Aggiungi» (`:not(.add)`) e, nella chat, le righe dei fili sono `.erow.filo`.
- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `node design-system/tools/screenshot-page.js "schermate/direzioni/direzione-a.html?pagina=agenda" /percorso/a-agenda.png 1440 900`
  (dalla radice, con percorsi assoluti: nel Bash della sessione la cartella di lavoro può cambiare fra un comando e l'altro).
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, `H=1100` (l'altezza del viewport: va alzata finché la
  pagina non scorre, altrimenti le catture dopo un clic si spostano; per la pagina dei Costi `H=3200`), `CLICK="sel|sel"`,
  `EVAL="codice"` (per le catture del telefono: scorrere lo schermo con `EVAL` prima della cattura, `SCALE=2 H=1100`).
  Attenzione: il selettore va scelto sulla pagina d'arrivo (l'agenda ha quattro sezioni, non cinque) e un `data-az` letto **prima**
  del clic, perché dopo la pagina è un'altra.
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora ogni `<script src>` nell'ordine dei tag, anche
  `../componenti.js` e gli script in `avatar/`).
- **Il confronto «niente di visibile cambia»**: catturare le stesse pagine con gli stessi parametri prima e dopo
  (`screenshot-page.js`) e confrontare i PNG byte per byte (`cmp`); l'albero di partenza si tira fuori con `git archive HEAD`. Le
  differenze di un PNG si vedono con un diff a pixel in Chromium (canvas) ritagliato sulla zona che cambia; serve a distinguere una
  regressione da uno spostamento di frazioni di pixel (una pagina di studio con l'intestazione più lunga, sotto `zoom`, muove tutto
  il contenuto di poco).

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script vanno
  lanciati con percorsi assoluti: nel Bash della sessione la cartella di lavoro può restare su una sottocartella dopo un `cd`.
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**. `componenti.js` è un'IIFE come gli altri.
- **I nomi delle classi si scontrano**: `.drow` era già delle righe del diario nella tendina Riepilogo, e riusarla per le righe
  della settimana ha cambiato una pagina che doveva restare ferma (se ne è accorto il confronto byte per byte). Le righe nuove sono
  `.grow`. Prima di scegliere un nome, cercarlo in `componenti.js` e in `direzione-a.js`.
- **Chi sfora la casella si scala, non si allarga**: `width`/`height` in percentuale su un figlio di una griglia con la riga
  automatica è una percentuale ciclica; Chromium la risolve dal rapporto, la riga cresce e l'eccedenza cade tutta in basso. Per
  far sforare un elemento (l'orbe oltre `.av`) si usa la proprietà `scale`, che scala attorno al centro e non tocca la griglia.
  Per accorgersene basta misurare il centro del disegno contro il centro della casella (`getBoundingClientRect` su
  `circle.pelle` e su `.av`): è il controllo da rifare dopo ogni cambio di misura degli avatar.
- **Il testo eredita il colore della cornice**: una primitiva scura (`.qrow`) messa su una superficie chiara resta bianca su bianco.
  Le due pagine nuove lo correggono con una regola sul contenitore (`.fcorpo .qrow{color:var(--ink)}`), non toccando la primitiva.
- **Il fondo di una barra a segmenti non può essere lime**: la pista del giorno è `#EDEDED` e sono i blocchi a portare il colore,
  altrimenti «in corso» sparisce dentro la pista.
- **Le date del modello non si ricavano da `new Date`**: la giornata dell'azienda è giovedì 4 settembre 2026 e va letta da
  `azienda.data` / `azienda.dataLunga`; la settimana conta i nomi dei giorni in avanti da lì.
- **Il telefono non deve caricare la Console**: finché lo faceva, una classe con lo stesso nome (`.rev`) prendeva regole di una
  pagina della Console (decisione 28). Le classi del telefono hanno il prefisso `m-`; le condivise sono solo quelle di
  `componenti.js`.
- **L'aggregatore dei costi** (`m.costi(periodo, dip)`): un solo calcolo per la pagina dei Costi e per la sezione «Spesa del mese»
  del Dipartimento; le richieste sono un campione, non il registro (a 11 sommano 233 € in 30 giorni contro i 613 € dei dossier).
- L'artefatto si ripubblica allo stesso indirizzo passando `url` allo strumento, dopo averlo letto con `action: read`: lo strumento
  salva il file e chiede che sia letto **per intero** (a blocchi di 250–450 righe, ognuno sotto i 25 000 token; il `grep` non
  basta). Il file unico della Console pesa circa 447 KB (5 475 righe), quello del telefono 330 KB. Mai forzare. La sottoscrizione
  agli aggiornamenti dell'artefatto non si registra da questa sessione (403): non dire che si sta «guardando».
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS, la card costo su fondo lime, la striscia «chi» e il rail: come
  nelle note delle sessioni precedenti (storia di questo file in git, commit `b50f659`, `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca

1. **Il lavoro della prossima sessione**: lo sceglie l'utente; le tre proposte stanno in «Come riprendere» (la tab «Dipartimenti»
   del telefono, la tendina del passo, i controlli ancora inerti).
2. **Il giudizio dell'utente** sulle pagine Agenda e Chat (versione 15, decisione 30), sugli avatar ricentrati (15a, decisione 31), sulla revisione sul telefono (decisione 28),
   sulle schermate del mobile (versioni 11 e 12, decisione 23), sulla pagina del Dipendente (versione 6) e su quella
   dell'Esecuzione (versione 8): in sospeso, non blocca. La pagina dei Costi ha avuto un «bene» (decisione 27).
3. I punti aperti ereditati e quelli nuovi della versione 15 (vedi «Come riprendere»).

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #12: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/componenti.js, schermate/direzioni/direzione-a.js,
dati.js, comune.js, avatar/, mobile.js): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji, solo
le icone dello sprite; gli avatar sono quelli della versione 10 (tinta, occhi lilguy, punto di stato, gesto nelle pile).

Guarda le pagine Agenda e Chat della versione 15 e gli avatar (ricentrati nella casella, correzione 15a) e dimmi se vanno bene;
se ci sono correzioni, falle prima di tutto il resto. Poi
prendi il lavoro dalle proposte in «Come riprendere» (A: la tab Dipartimenti del telefono; B: la tendina del passo dell'Esecuzione;
C: i controlli ancora inerti): scegli tu se non rispondo. Prima lancia le quattro prove di prove/ e fai gli screenshot delle pagine
che esistono: non devono cambiare. Poi prove, screenshot, artefatti della Console e del mobile ripubblicati allo stesso indirizzo,
DIREZIONI.md (versione 16), SYSTEM-DESIGN.md, README e PROSSIMA-SESSIONE.md, commit, push e PR. Alla fine mostrami cosa è cambiato
e fermati.
```
