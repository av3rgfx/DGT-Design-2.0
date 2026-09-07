# Prossima sessione — passaggio di consegne

Stato al 2026-09-07, fine della sessione dei **tre passi scelti dall'utente** (versione 17 della direzione A · Console).
Fatti tutti e tre: **A** il quadro del giorno anche sul telefono (tre forme disegnate nel telefono vero, catturate e messe a
confronto con i numeri; **l'utente ha scelto la seconda, «due per due»**, e applicarla ha voluto dire pagarne il contro:
vedi sotto); **B** la tab
«Dipartimenti», che era l'ultimo cerchio inerte della navigazione, in due schermate nuove (7 e 8); **C** i controlli inerti,
con una regola proposta prima di scrivere codice, fatta vedere su una sezione sola e poi applicata a tutte e trentadue.
Nel farla è venuto fuori che **il conto di 61 era sbagliato per difetto**: i controlli senza azione erano **263**, perché la
lista non contava le settantasei pillole di filtro delle intestazioni. Ne restano 128, tutti fuori dalla lista dell'utente e
dichiarati qui sotto. Tutto committato e pushato sul branch indicato sotto, con la PR aperta verso `main`.

**L'utente non ha ancora visto né giudicato niente di questa sessione.**

## Stato

- Branch: `claude/console-direzione-a-mobile-vdb1tb` (da `main`: la **PR #13 era già unita** all'inizio della sessione, quindi
  si è ripartiti da `main`, come chiedeva il prompt). A fine sessione è aperta la **PR #14** verso `main`: se all'avvio della
  prossima sessione risulta già unita, ripartire da `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso
  branch e la PR si aggiorna da sola.

### A · Il quadro del giorno sul telefono (versione 17)

- **Il nodo, con i numeri**: le quattro caselle della Console sommano **602 px**, la colonna del telefono ne dà **254,4**
  (misurata: schermo 278,4, cornice fissa 300 × 620). Non bastava riordinare. La forma in linea della Console non ci sta
  nemmeno con tre caselle (273 px).
- **Tre forme disegnate nel telefono vero e catturate** (`?quadro=1|2|3`, catture `m-quadro-*.png`): *le quattro a due piani*
  (58 px, la parola scende a 10 px), *due per due* (132 px, la più leggibile ma **la riga con approva e rifiuta finiva sotto
  la barra di navigazione**: della card da 256 px se ne vedevano 162), *la riga che parla* (54 px, tre caselle, numero e
  parola accanto). Pro e contro con le misure in `DIREZIONI.md`, «Versione 17», sezione A.
- **Scelta dell'utente: la 2, «due per due».** Le altre restano dietro `?quadro=1|3`, `?quadro=0` toglie il quadro.
- **Il contro della 2 è stato pagato, non accettato.** Due recuperi, in ordine:
  1. **Il conto ripetuto (78 px).** La casella «approvate» del quadro ripeteva il numero grande «N approvate oggi» a 60 px —
     il difetto tolto dalla correzione 16a. È caduto il numero grande e non la casella (la casella sta nella griglia scelta,
     porta un'icona e apre il Riepilogo; il numero era nudo). Rimasto un solo numero, «N da approvare», che ripeteva il
     titolo sopra, **è caduta tutta la riga e il conto è passato nel titolo**: «DA APPROVARE 4», a 26 px e non a 30 perché a
     30 va a capo (234 px liberi, titolo 214, più numero e stacco 243).
  2. **Le misure strette del quadro (14 px)**: padding 12, occhiello su una riga da 14, stacco 6, caselle da 40. Il quadro
     passa da 132 a **118 px**.
- **Risultato misurato: 248 px di card su 256**, con la riga di approva e rifiuta **sopra** la navigazione (4 px di margine).
  La forma scelta dall'utente è così **migliore di tutte e tre** sulla misura con cui la sessione aveva argomentato contro di
  lei (la 3 lasciava 240 con la riga 4 px sotto la navigazione; la 1 ne lascia 236 con 8 px sotto). **La lezione, che vale
  oltre questo caso: il costo di una forma non è una proprietà della forma, è una proprietà della forma più quello che le sta
  intorno.** Misurata dentro una schermata che ripeteva un conto, la 2 sembrava la più cara; tolta la ripetizione, la
  classifica si è rovesciata. Due verifiche nuove in `prove/mobile.js` inchiodano le due misure.
- **`gruppiOggi` è passato nel modello** (`m.gruppiOggi()` in `dati.js`): la Console e il telefono contano una volta sola.
- Il quadro sta **solo sulla schermata 1** (la home del telefono); l'Agenda è già la giornata per esteso.

### B · La tab «Dipartimenti» (schermate 7 e 8)

- **7 · l'elenco**: una riga per dipartimento con la pila dei suoi, i conti del giorno, la spesa di oggi e il numero lime di
  quante richieste di quel dipartimento aspettano. Il sottotitolo dice «N dipendenti · M al lavoro», e se c'è un errore
  «M al lavoro · K ferme» in rosa (in 130 px non stanno tutti e tre i conti).
- **8 · il dipartimento aperto**: i tre numeri della Console e le sue cinque sezioni, con **un solo spostamento** — «Da
  approvare» sale dalla quarta alla seconda posizione, e le righe sono decidibili sul posto (`m.decidi`). I dipendenti
  portano alla conversazione, l'unica pagina del dipendente che il telefono ha.
- **Un difetto trovato e corretto**: `AMMINISTRAZIONE` a 30 px chiede 292 px e la riga ne ha 234 — usciva dallo schermo.
  Oltre i dodici caratteri il titolo si stringe a 22 px.
- Aggiornati la navigazione (il secondo cerchio non è più inerte), `NOMI`, `?schermata=` (ora 1…8), `?dip=`; i telefoni
  predefiniti sono otto.

### C · I controlli inerti: la regola

**La regola, in una riga: un controllo si vede solo se fa quello che promette, con i dati che ci sono già.** Due prove —
*serve* in questa sezione? *si può fare* col modello? — e chi le passa diventa vero, chi ne fallisce una sparisce.

| Famiglia | Prima | Dopo |
|---|---|---|
| cerchio «cerca» nelle intestazioni | 22 | **7 veri**, 15 spariti |
| cerchio «filtri» (i cursori) | 22 | **0** |
| cerchio «scarica» | 6 | **0** |
| cerchi «griglia» e «righe» | 2 | **2 veri** |
| pillole di filtro nelle intestazioni | 76 inerti | **57 vere**, 19 sparite |
| «Impostazioni del dipartimento», la matita «Modifica» del prompt | 2 | **0** |
| telefono: «Cerca» ×2, «Ordina» ×2, «Ordina e filtra», «Commenta» | 6 | **2 veri**, 4 spariti |
| freccia «indietro» sulla home, i due cerchi della card obiettivo | 3 | **2 veri**, 1 sparito |

- **La soglia di «cerca»: più di dodici righe** in una delle due taglie dell'azienda. Le sette che restano, con le righe
  contate a 11 → 40: Dipendenti della home (12 → 41), Storico (16 → 28), Colloquio (16), Log (fino a 13), Costi per
  dipendente (11 → 40), Eventi di oggi (8 → 26), Conversazioni (11 → 40).
- **Come funziona**: il cerchio si apre in un campo al suo posto, filtra a ogni tasto, il conto «N di M» sta nel **contatore
  della sezione** e non anche nel campo (lo stesso numero non si scrive due volte a 300 px: regola 24), Esc o × chiudono.
  Attrezzi comuni in `direzione-a.js`: `cercaSez`, `filtraCerca`, `pilleSez`, `filtraSez`, `contoSez`; stato in `st.cerca` e
  `st.sez`.
- **Le pillole tolte e perché**: i giorni passati della sezione «Oggi» del dipendente, i 90 giorni e il «per cliente» del
  Rendimento, i mesi passati del Budget, «Esempi allegati» e «Regole del dipartimento» del soul prompt, «Questo mese» della
  settimana, «Connessioni» e «Aggiungi uno strumento», «Concluse oggi» del dipartimento e «In corso / Pianificate / Errori»
  di «Al lavoro adesso» (quelle liste contengono solo chi lavora).
- **Che cosa resta inerte, dichiarato**: **84 frecce `i-ne`** in fondo a righe e card che non aprono niente (toglierle cambia
  ogni riga e ogni card del prodotto: **da fare con una decisione dell'utente davanti**), **36 indicatori nell'intaglio delle
  card** (campanella col punto, matita, bersaglio, scarica del Riepilogo: dicono uno stato e vengono dal riferimento) e **9
  campanelle** in alto a destra della cornice. In tutto 128.

### Verifica

- **Le quattro prove cliccate passano**: `console.js` **97** (erano 82), `mobile.js` **63** (erano 39), `costi.js` 48,
  `agenda-chat.js` 54. In tutto **268** (erano 223).
- **Zero controlli inerti** nelle 72 intestazioni delle nove pagine, a undici e a quaranta, controllato dalla prova.
- Le catture della Console cambiano tutte (le intestazioni sono su ogni pagina); le catture della **sola barra**
  (`a-barra-*.png`) sono identiche byte per byte: la barra della versione 16 non è stata toccata.
- Catture nuove in `screenshot/`: `m-quadro-*.png` (la forma scelta a 11 e a 40, le due scartate, il telefono di prima), `m-dipartimenti*.png`,
  `m-dipartimento*.png`, `m-chat-cerca.png`, `a-sez-*.png` (i controlli delle sezioni). Rigenerate le 25 della Console.
- **`scatta.js` ha tre gruppi nuovi**: `quadro`, `dip`, `controlli` (48 catture in tutto, erano 32).
- **Artefatti ripubblicati allo stesso indirizzo** con la versione 17:
  [Console](https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34),
  [telefono](https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9) e
  [la pagina della scelta della barra](https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f), che cambia
  perché due delle sue otto immagini sono catture di pagina intera e portano le intestazioni nuove.
- Artefatti precedenti, non ripubblicati (le loro pagine non cambiano): identità degli orbi
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6, pelli dell'orbe
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569, le due famiglie kit/orbe
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526, confronto A/B/C
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f, specimen
  https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b.
- Documenti: `SYSTEM-DESIGN.md` (**regola 25**, riga «Intestazione di sezione» e riga «Mobile» della sezione 6, sezione 9 con
  le verifiche, sezione 11 con i branch), `schermate/direzioni/DIREZIONI.md` («Versione 17» con le tre parti e le regole di
  scala 17 e 18), i tre README.
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

32. **Fine della sessione**: alla vista del prima/dopo l'utente ha detto **«bene»** e ha chiuso la sessione, chiedendo il
    passaggio di consegne, il prompt di avvio e la PR. Ha scelto il lavoro della prossima sessione: **la barra «Oggi in azienda»**
    (la parte verde in cima alla Console). Parole sue: «non capisco a primo impatto il suo utilizzo… mi dà l'idea che dica chi sta
    lavorando e chi ha un lavoro programmato? Ma non ne sono sicuro, in ogni caso non è ben chiaro»; chiede **uno studio e
    un'analisi UX** e un modo per renderla più chiara e utile. Dettaglio in «Come riprendere».

33. **2026-09-06, questa sessione**: lo **studio UX della barra «Oggi in azienda»** chiesto dall'utente. Fatta l'analisi con i
    numeri, disegnate tre strade nella Console vera e catturate a 11 e a 40, scelta e applicata la terza («la riga di stato»)
    perché l'utente non ha risposto, come chiedeva il prompt.
    Scelte fatte in costruzione (dettaglio in `DIREZIONI.md`, «Versione 16», sezione 7):
    - le caselle e le loro parole: «approvate» (le richieste approvate oggi, la stessa parola del Riepilogo), «al lavoro»,
      «ferma/e», «dopo» (la quinta, «aspettano te», è stata tolta con la correzione 16a: decisione 35);
    - la casella «al lavoro» è l'unica bianca piena (adesso pesa più del passato e del futuro) ed è la sola con la pila di
      avatar; le altre hanno l'icona dello sprite;
    - resta una sola ripetizione, «al lavoro», e **solo nella home**: la casella porta la pila di chi lavora, che il numero
      grande non ha, ed è l'unica globale nelle altre sei pagine;
    - sopra i sedici dipendenti spariscono il nome di chi è fermo e l'ora del primo pianificato;
    - nella barra dei passi: quattro pillole è la soglia oltre cui i conclusi perdono il nome, due i passi da fare per esteso.

37. **2026-09-07, fine della sessione: si procede con i passi proposti.** Alla domanda «è rimasto qualcosa?» l'utente ha
    risposto scegliendo la lista dei lavori proposti e mai scelti: la **tab «Dipartimenti» del telefono**, la **barra nuova
    anche sul telefono** e i **controlli inerti**. È la prima scelta di lavoro fatta su una lista che avevo proposto io, non
    su una segnalazione sua: vale come mandato per la versione 17, non come brief di dettaglio. Le scelte di dettaglio dentro
    ognuno dei tre (che cosa mostra la pagina Dipartimenti, che forma prende la barra a 300 px, quali cerchi diventano veri e
    quali spariscono) restano da proporre e da fargli vedere, come sempre. **Le tre proposte sono dimensionate nella sezione
    «Il lavoro della prossima sessione»**, con i numeri contati nel codice: la terza è molto più grande di come suonava.

36. **2026-09-07: i tre artefatti allineati.** Console e telefono ripubblicati allo stesso indirizzo con la versione 16 e la
    correzione 16a (al primo tentativo il classificatore aveva negato la chiamata; rileggendo la versione pubblicata per intero
    e riprovando è passata). Nell'artefatto della scelta, che il titolare ha condiviso con un collega, le immagini della strada
    3 mostravano ancora **cinque** caselle: rifatte a quattro, aggiunto l'occhiello «Decisa: la strada 3» e, sotto la bilancia,
    il poscritto che racconta la correzione 16a. Il voto condiviso resta aperto: la pagina dice che la scelta c'è, non che il
    parere del collega non serve più.

35. **2026-09-06: tolta la casella «aspettano te» (correzione 16a).** Sulla ripetizione dei numeri l'utente ha lasciato la
    scelta a me («se ritieni giusto eliminare la ripetizione correggi, altrimenti lascia com'è»). Guardando le pagine invece
    che ragionando a memoria è venuto fuori che la linguetta lime `.a-mini` («N da approvare», fissa sul bordo destro) è su
    **tutte e sette** le pagine: il numero era già scritto ovunque, e nella home e nel Dipartimento compariva **tre volte**
    sulla stessa schermata (nel Dipartimento a 430 px di distanza). Tolta la casella; restano quattro. La regola che ne esce:
    **la barra dice che cosa fa l'azienda, la linguetta che cosa deve fare il titolare** — ed è la linguetta che apre la coda.
    Due verifiche nuove in `prove/console.js` impediscono alla barra di tornare a ripeterla. Dettaglio in `DIREZIONI.md`,
    «Correzione 16a», e nella regola 24 di `SYSTEM-DESIGN.md`.

34. **2026-09-06, fine della sessione: l'utente conferma la strada 3.** Ha chiesto un artefatto con le sole quattro scelte da
    condividere con un collega (pubblicato, con il voto condiviso:
    https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f) e subito dopo ha scritto «confermo la Strada 3».
    Il codice era già quello, quindi la conferma non ha cambiato niente: sono cambiati solo i documenti. **Attenzione**: la
    conferma è della *strada*, non delle scelte di dettaglio elencate nella decisione 33 (le parole delle caselle, quante
    caselle, la duplicazione nella home): quelle restano da confermare, e se l'utente non le solleva vanno lasciate come sono.

38. **2026-09-07, questa sessione: fatti i tre passi.** A, B e C come da decisione 37, con il metodo di sempre (prove e catture
    prima, proposta prima di scrivere, prove e catture dopo). Scelte fatte in costruzione, da confermare (dettaglio in
    `DIREZIONI.md`, «Versione 17», ultimo paragrafo):
    - **la forma 2 del quadro del giorno** («due per due»), scelta dall'utente il 2026-09-07: le altre due restano dietro
      `?quadro=1|3`, e con la 2 la riga dei due numeri grandi della schermata 1 non c'è (il conto sta nel titolo);
    - il quadro sta **solo sulla schermata 1**, non su tutte come nella Console;
    - la casella «ferma» del quadro porta alla **conversazione** con chi è fermo, non all'Agenda: dal telefono l'esecuzione
      non si riavvia;
    - nel dipartimento del telefono **«Da approvare» è la seconda sezione**, non la quarta come nella Console;
    - **la soglia dei dodici** per «cerca», e le sette sezioni che se la tengono;
    - le pillole tolte perché il modello non ha il dato (elenco nella sezione «Stato»);
    - **«scarica» sparisce da tutte e sei** le sezioni invece di scaricare davvero: nella sandbox dell'artefatto uno
      scaricamento non parte;
    - il titolo del dipartimento che si stringe oltre i dodici caratteri.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Il lavoro della prossima sessione

**Non è ancora scelto**: i tre passi della decisione 37 sono finiti tutti e tre. La prima cosa da fare all'avvio è **far
vedere all'utente che cosa è cambiato** e chiedergli il prossimo lavoro. Se non risponde e bisogna scegliere, questi sono i
candidati, dal più maturo al più discutibile, con i numeri contati il 2026-09-07.

### 1 · Le 84 frecce che non aprono niente (la coda naturale della versione 17)

È l'unica famiglia di controlli inerti rimasta che sia davvero una famiglia di *controlli*. Contate: 12 nello storico
approvato delle Richieste, 12 sui casi del colloquio, 10 sulle righe dei costi del dipendente, 5 sulle righe del rendimento,
4 sulle righe dei passi, 6 nel log, 4 sui costi, 3 sulle revisioni passate, e le altre sparse. La regola 25 dice già che cosa
farne: **la freccia resta dove la riga ha una destinazione e sparisce dove non ce l'ha.** Quello che serve prima è la
decisione dell'utente, perché toglierle cambia l'aspetto di ogni riga e ogni card del prodotto — è per questo che in questa
sessione le ho lasciate. Da fare con un prima/dopo davanti agli occhi.

### 2 · I giudizi in sospeso

L'utente non ha mai giudicato: la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8), le schermate del
telefono (11 e 12), la revisione sul telefono (14), le pagine Agenda e Chat (15), gli avatar ricentrati (15a) e adesso
tutta la versione 17. Non blocca, ma è una lista che si allunga: vale la pena chiederglielo.

### 3 · Le scelte di dettaglio della barra, mai sollevate

Le parole delle caselle («approvate» contro «consegnate», «ferma» contro «in errore»), l'ultima ripetizione «al lavoro» nella
sola home, quante caselle. La strada è confermata (decisione 34); queste no. Se non le solleva lui, vanno lasciate come sono.

### 4 · I punti aperti del modello

Le mutazioni che il modello non ha e che si vedono nell'interfaccia: «Sposta» dell'agenda non sposta davvero, i giorni della
settimana non si aprono, il dipendente non risponde da solo nella chat, il «non letto» non sopravvive al ricaricamento, lo
stato vuoto del dipendente appena creato. Sono lavori di modello, non di design.

## Come riprendere

**I tre artefatti sono in pari** (Console, telefono e pagina della scelta: vedi «Stato»), quindi non c'è niente da recuperare
prima di cominciare. Quando si ripubblica: `build-unico.js`, poi lo strumento con `url`, dopo aver letto la versione
pubblicata per intero (vedi «Note tecniche»).

**Prima cosa: mostrare all'utente che cosa è cambiato** (il quadro del giorno sul telefono, le due schermate dei
Dipartimenti, le intestazioni ripulite) e chiedere il prossimo lavoro. Se manda correzioni su questa versione, applicarle
prima di tutto il resto.

**Non rimettere in discussione**: la direzione A, la barra «Oggi in azienda» della versione 16 con la correzione 16a, gli
avatar della versione 10, la regola «niente emoji».

**Il metodo di sempre**, prima e dopo: rifare i font locali (`fetch-fonts.py`), lanciare le **quattro** prove di `prove/` e
catturare le pagine prima di toccare qualcosa (base di confronto, con `scatta.js --in <cartella>`); leggere `CLAUDE.md`,
`SYSTEM-DESIGN.md` (sezioni 2, 6, 8, 9 e 10, regole 24 e 25) e `DIREZIONI.md` (sezione 4 dalla versione 14, sezione 5);
controllare branch e PR (vedi «Stato»). Alla fine: prove aggiornate, screenshot con `scatta.js`, artefatti ripubblicati allo
stesso indirizzo, `DIREZIONI.md`, `SYSTEM-DESIGN.md`, i README, questo file, commit, push e PR.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): la tendina del passo dell'Esecuzione; le
frecce inerti delle righe (vedi «Il lavoro della prossima sessione», candidato 1); «Ripeti»; lo stato vuoto del dipendente
appena creato; il badge rosa «campanella 2» accanto al numero «da approvare» copia quello della riga WORKSPACE della Console
(`min(2, n)`) e non ha ancora un significato nel modello; il badge «↓12%» del numero «spesi oggi» nella home è decorativo;
`design-system/tokens.css` porta solo tre token di moto e un easing diverso da quello dello specimen
(`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`).
Punti aperti della versione 15: nell'agenda «Sposta» porta all'agenda ma non sposta davvero l'orario (il modello non ha una
mutazione per farlo) e i giorni della settimana non si aprono; nella chat il dipendente non risponde da solo alla nota del
titolare e non c'è ricerca dentro il filo; il «non letto» si azzera aprendo il filo e non sopravvive al ricaricamento.
Punti aperti della versione 16: la lista `m.agenda` in `dati.js` non la legge più nessuno tranne la barra di prima
(`?barra=0`); nella barra dei passi il «+N da fare» e il «+N fatti» non sono cliccabili.
Punti aperti nuovi della versione 17: le 84 frecce (candidato 1); sul telefono restano inerti il download e la matita
nell'intaglio delle card del Riepilogo (indicatori del riferimento, come le campanelle); la ricerca di sezione non ricorda il
testo cambiando pagina (lo stato è per sezione ma si azzera con `?pagina=`), e non c'è ricerca dentro il filo della chat.

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (97: tendine, Richieste, editor del dipendente, esecuzione, 40, la barra «Oggi in azienda» e la barra dei passi, e dalla versione 17 i controlli delle intestazioni di sezione), `mobile.js` (69: gli
  otto telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40, e dalla versione 17 il quadro del
  giorno e la tab Dipartimenti; a ogni passo nessuno schermo che scorre di lato e console pulita), `costi.js` (48) e `agenda-chat.js` (54: le due pagine nuove, da dove ci si arriva, i filtri, la
  scrittura nel filo, le due tab del telefono); da qualunque cartella, leggono anche `CHROME_PATH`, girano con
  `reducedMotion: 'reduce'`, escono con 1 se una verifica fallisce. Attenzione: Playwright scorre da solo per cliccare un elemento
  fuori dallo schermo, quindi una verifica sullo scorrimento va fatta con l'elemento già visibile; nella pagina Richieste le
  richieste in attesa sono card `.task[data-az="richiesta"]` (le righe `.hrow` sono lo storico); `.elenco .erow` comprende la card
  «Aggiungi» (`:not(.add)`) e, nella chat, le righe dei fili sono `.erow.filo`.
- **`schermate/direzioni/scatta.js`** (versione 17: 48 catture, cinque gruppi) — rigenera le catture di `screenshot/` dalla lista
  di parametri dichiarata nel file, così non vanno più ricostruiti a mano: `node schermate/direzioni/scatta.js` (tutto),
  `… scatta.js console` / `barra` / `quadro` / `dip` / `controlli` (un gruppo), `… scatta.js a-11 a-40` (una o più), `--in /percorso` (scrive altrove, per il confronto prima/dopo). Stesse
  variabili delle prove. Le catture che restano a mano sono elencate in `FUORI` dentro il file. **Attenzione**: quasi tutte le
  pagine della Console sono catturate con `tendina=chiusa`, e `a-1920.png` è la pagina del Dipendente a 1920×1080 solo viewport;
  ricostruirli a occhio porta a differenze enormi che non c'entrano con il lavoro (è successo in questa sessione, scoperto dal
  confronto a pixel).
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
  basta). Il file unico della Console pesa circa 444 KB (5 552 righe), quello del telefono 322 KB (4 440); la versione
  pubblicata da leggere ne ha qualcuna in più, perché l'artefatto avvolge la pagina in un suo scheletro. Mai forzare. La sottoscrizione
  agli aggiornamenti dell'artefatto non si registra da questa sessione (403): non dire che si sta «guardando».
- **Una griglia senza colonne dichiarate non vincola i figli**: `display:grid` con `grid-template-columns:none` mette gli
  elementi in una colonna implicita `auto`, che cresce a `max-content` anche oltre il contenitore. Con `overflow:hidden` sopra
  (la Console ce l'ha su `.a-app`) l'eccedenza sparisce **in silenzio**: nessuno sforo orizzontale della pagina, nessun errore,
  e le prove passano. È successo alla barra dei passi (2180 px in un contenitore da 1312, tre passi su sette invisibili). Il
  rimedio è `grid-template-columns:minmax(0,1fr)`, che `.a-main` aveva già. **Da cercare in tutte le griglie nuove.**
- **Il confronto prima/dopo a riquadro, non solo byte per byte**: quando qualcosa cambia di proposito, `cmp` dice solo «diverso».
  Un diff a pixel in Chromium che ritorna il **riquadro** dei pixel cambiati dice se la differenza sta dove deve stare: in questa
  sessione ha provato che le 25 catture della Console cambiano solo dentro `x 426–1203, y 34–85` (la barra) e ha scoperto due
  parametri di cattura ricostruiti sbagliati, che davano differenze grandi dieci volte tanto.
- **La lettura per intero dell'artefatto costa**: circa 5 500 righe, un centinaio di migliaia di token, e va fatta a blocchi di
  300–450 righe (oltre, il singolo blocco supera il limite del lettore). Da mettere in conto **prima** di arrivare a fine
  sessione. Se la chiamata di pubblicazione viene negata dal classificatore, il tempo non è perso: rileggere e riprovare ha
  funzionato (7 settembre, tutti e tre gli artefatti).
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS, la card costo su fondo lime, la striscia «chi» e il rail: come
  nelle note delle sessioni precedenti (storia di questo file in git, commit `b50f659`, `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).
- **Il campo che filtra mentre si scrive dentro una pagina che si ridisegna tutta**: `tutto()` rifà l'HTML, quindi a ogni
  tasto il fuoco e il cursore vanno rimessi a mano (`focus({preventScroll:true})` e `setSelectionRange` sulla posizione
  salvata prima). Senza `preventScroll` la pagina salta al campo a ogni lettera.
- **Un avatar con il bordo dà un falso positivo sul taglio del testo**: `scrollWidth > clientWidth` è vero per `.av` (21
  contro 19) per via del bordo di 2 px. Le verifiche sul testo tagliato devono selezionare solo le etichette
  (`.qq > span:not(.ico):not(.pair)`), non tutti gli `span` dentro la casella.
- **I backtick dentro il CSS**: il CSS di `mobile.js` sta in un template literal, quindi un commento che cita
  `` `?quadro=1|2` `` con i backtick chiude la stringa e la pagina non carica («Unexpected identifier»). Nei commenti dentro
  il CSS si scrive `?quadro=1|2` senza apici.
- **Un commento CSS chiuso due volte mangia la regola che segue, in silenzio.** Allungando un commento dentro il CSS di
  `mobile.js` è rimasto un `*/` di troppo: il testo fra i due `*/` è diventato CSS invalido e si è portato via la regola
  `.m-h1.conta` subito sotto. Niente errore in console, niente prova rossa — solo un titolo che restava a 30 px invece di
  26. **Se una regola nuova non fa effetto, guardare i commenti sopra prima della specificità.** Si vede subito
  rileggendo il blocco, o cercando `\*/` doppi.
- **Uno spazio fra due elementi flex non è cosmetico**: `<h3>DA APPROVARE <b>4</b></h3>` con `white-space:nowrap` allarga il
  nodo di testo quanto basta a mandare il titolo a capo. Il testo del DOM resta «DA APPROVARE4» ed è giusto così; è la
  verifica che si adatta, non il markup.
- **Le misure prese con `getBoundingClientRect` sui telefoni vanno divise per 1,25**: `.m-phones` ha `zoom:1.25`. Senza
  dividere sembra che la barra di navigazione stia fuori dallo schermo.
- **Un `const` usato prima della sua riga dentro la stessa funzione non è hoisting ma zona morta**: spostando un blocco di
  calcolo sopra `perModello` la pagina falliva a ogni render. Le funzioni si possono chiamare prima, i `const` no.
- **Contare i controlli inerti a `grep` porta fuori strada**: la lista di 61 veniva da lì. Il conto giusto si fa aprendo le
  pagine e prendendo `.rb` e `.pill` senza `data-az` **e senza un antenato con `data-az`** (una freccia dentro una riga
  cliccabile non è inerte). Lo script è in `scratchpad` ma la ricetta è questa; le prove ora tengono il conto a zero nelle
  intestazioni.

## Cosa manca

1. **Il lavoro della prossima sessione non è scelto**: i tre passi della decisione 37 sono finiti. Vedi la sezione «Il lavoro
   della prossima sessione» per i quattro candidati, e chiedere all'utente.
2. **Il giudizio dell'utente sul resto della versione 17** (i Dipartimenti, i controlli) e sulle scelte di dettaglio della
   decisione 38. Del quadro del giorno l'utente ha già scelto la forma (la 2, «due per due», il 2026-09-07); resta da
   sentire se gli va bene il prezzo pagato per applicarla, cioè la riga dei due numeri grandi caduta e il conto passato
   nel titolo della schermata 1.
3. **Le 84 frecce che non aprono niente**: la coda dichiarata della regola 25, da fare con una decisione dell'utente davanti.
4. I giudizi in sospeso delle versioni 6, 8, 11, 12, 14, 15 e 15a; le scelte di dettaglio della barra (decisioni 33 e 34).
5. I punti aperti elencati in «Come riprendere».

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md (in particolare «Stato» e «Il lavoro della prossima sessione»). Controlla la
PR #14: se è unita riparti da main con un branch nuovo, altrimenti continua sullo stesso branch.

Lavoriamo nella direzione A · Console (schermate/componenti.js, schermate/direzioni/direzione-a.js, dati.js, comune.js,
avatar/, mobile.js): niente emoji, solo le icone dello sprite; gli avatar sono quelli della versione 10; i colori restano
quelli del sistema. La barra «Oggi in azienda» della versione 16 con la correzione 16a è decisa, e così la versione 17
(il quadro del giorno sul telefono, la tab Dipartimenti, la regola dei controlli): non rimetterle in discussione.

Prima cosa: fammi vedere che cosa è cambiato nella versione 17 e aspetta il mio giudizio. Se non rispondo, scegli tu il
lavoro fra i candidati della sezione «Il lavoro della prossima sessione» e dimmi quale hai scelto e perché.

Il metodo di sempre: prima lancia le quattro prove di prove/ e cattura le pagine con scatta.js (base di confronto). Alla
fine prove aggiornate, screenshot, i tre artefatti ripubblicati allo stesso indirizzo, DIREZIONI.md (versione 18),
SYSTEM-DESIGN.md, i README e PROSSIMA-SESSIONE.md, commit, push e PR. Alla fine mostrami cosa è cambiato e fermati.
```
