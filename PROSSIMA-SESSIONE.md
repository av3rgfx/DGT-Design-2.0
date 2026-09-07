# Prossima sessione — passaggio di consegne

Stato al 2026-09-07, fine della sessione del **candidato 1: le frecce di riga** (versione 18 della direzione A · Console).

Il lavoro era già deciso e la regola pure (regola 25 della versione 17, che qui passa dalle intestazioni alle righe e
diventa la **regola 26**: *la freccia resta dove la riga ha una destinazione e sparisce dove non ce l'ha*). Quello che il
prompt chiedeva non era decidere la regola ma **far vedere che cosa diventa il prodotto quando la si applica**. Fatto in
tre passi come chiesto: censimento per famiglia con il verdetto sulla destinazione, una famiglia sola col prima/dopo
catturato, poi tutte.

**Nel censimento è venuto fuori che 84 era sbagliato per difetto**: le frecce senza azione erano **260** su tutte le
pagine e tutte e due le taglie dell'azienda (**86** sull'insieme di riferimento, cioè le nove pagine della Console a
undici più tendina, Riepilogo ed editor). **Ne restano 2**, ed è l'anteprima dell'editor, dichiarata. Le frecce vive
salgono da 492 a **496**: una famiglia su diciotto una destinazione ce l'aveva davvero e non era collegata.

Tutto committato e pushato sul branch indicato sotto, con la PR aperta verso `main`.

## Stato

- Branch: `claude/candidato-1-frecce-riga-nmd2pt` (da `main`: la **PR #14 era già unita** all'inizio della sessione,
  quindi si è ripartiti da `main`, come chiedeva il prompt). A fine sessione è aperta la **PR #15** verso `main`: se
  all'avvio della prossima sessione risulta già unita, ripartire da `main` con un branch nuovo; se è ancora aperta,
  continuare sullo stesso branch e la PR si aggiorna da sola.

### Il censimento: 260, non 84

Contate aprendo le pagine e prendendo ogni `i-ne` senza `data-az` **né su di sé né su un antenato** (una freccia dentro
una riga cliccabile non è inerte — è la stessa ricetta della versione 17):

| | Frecce inerti |
|---|---|
| L'insieme di riferimento (nove pagine della Console a undici, più tendina, Riepilogo ed editor) | **86** |
| Tutte le pagine e tutte e due le taglie (28 viste della Console + le 8 del telefono) | **260** |
| Sul telefono | **0** — il telefono ha una freccia sola, ed è viva |

Il prodotto aveva **752** frecce in tutto e una su tre non apriva niente. Adesso ne ha **498**, di cui 2 dichiarate.

### Le diciotto famiglie e il verdetto

Sull'insieme di riferimento (a quaranta i numeri crescono, le famiglie no). Tabella per esteso, con le motivazioni, in
`DIREZIONI.md`, «Versione 18», sezione 2.

| Famiglia | N | Destinazione? |
|---|---|---|
| Storico delle Richieste (`rigaStorico`, in quattro punti) | 22 | **No** per le decise (una richiesta decisa non ha una pagina); **sì** per quelle in attesa, che la freccia la tengono |
| Casi del colloquio | 12 | No |
| Log dell'esecuzione | 9 | No per passi, strumenti, modello, note; **sì** per la voce che apre una richiesta in attesa (che già oggi la apre) |
| Rendimento, righe delle metriche | 5 | No: sono misure, non oggetti |
| Colloqui precedenti · Regole di approvazione · Budget e permessi · Passi | 4 ognuna | No |
| Revisioni passate | 3 | **Sì, una su tre**: la revisione del *soul prompt* con due versioni ancora nel dossier apre il confronto (`confronta`), che nel prodotto esiste già |
| Strumenti e connessioni · Costo dell'esecuzione · Costi per modello · Obiettivi del dipartimento | 3 ognuna | No |
| Consegne dell'esecuzione (card) | 2 | Come il log: sì solo se la consegna è una richiesta in attesa |
| Per cliente (Costi e Spesa del mese) | 2 | Sì per i clienti veri — e lì era già viva; no per le voci che clienti non sono |
| Esito del colloquio (card) · Diario del Riepilogo (card) | 1 ognuna | No |
| **Anteprima della card del dipendente, dentro l'editor** | 1 | **Eccezione dichiarata**: non è un controllo, è il disegno di come verrà la card. Toglierle matita e freccia farebbe mentire l'anteprima |

### Le tre cose imparate applicandola (sono la regola 26)

1. **La colonna segue la freccia, ma la decide la lista, non la riga.** Ogni riga finisce con 32 px di colonna più 10 di
   gap: togliere la freccia e lasciare la colonna vuol dire 42 px di niente in fondo a ogni riga, che in dodici casi si
   legge come un errore. Ma toglierla riga per riga disallineerebbe le liste miste. Quindi: **se nessuna riga della
   lista ha una destinazione cade anche la colonna** (classe `nofr`) e il contenuto se la riprende; **se qualcuna ce
   l'ha la colonna resta per tutte** e la cella è vuota dove la destinazione non c'è. Le liste miste sono quattro (lo
   storico dentro «Oggi» del dipendente, le consegne precedenti, il log, la spesa per cliente) e sono le più belle da
   guardare: nel log **nove righe su dieci perdono la freccia e una la tiene**, e per la prima volta si vede a colpo
   d'occhio qual è l'unica cosa cliccabile della sezione.
2. **L'intaglio è il taglio che fa posto ai pulsanti: senza pulsanti è un buco per niente.** Otto card avevano
   nell'intaglio la sola freccia inerte (le quattro regole di approvazione, l'esito del colloquio, due consegne, il
   diario del Riepilogo): hanno perso la freccia e con lei l'intaglio, e sono tornate card intere. **Un difetto trovato
   per caso**: la card dell'esito del colloquio teneva liberi 120 px per due pulsanti che non ci sono, e il sottotitolo
   ci finiva tagliato («v7 · Standard · 18 min…»); i 120 px sono tornati al sottotitolo, che adesso si legge intero.
3. **Applicare la regola non è solo togliere.** La domanda giusta non è «questa freccia funziona?» ma «questa riga dove
   porterebbe?». Su diciotto famiglie la risposta è stata sì una volta sola, ed è un buon segno: il prodotto non aveva
   pagine nascoste da collegare, aveva promesse da ritirare.

### Verifica

- **Le quattro prove cliccate passano**: `console.js` **107** (erano 97: dieci verifiche nuove sulle frecce),
  `mobile.js` **74** (era 69: una sulle frecce e quattro sullo studio del conto nel titolo), `costi.js` 48, `agenda-chat.js` 54. In tutto **283** (erano 268).
- Zero frecce senza azione su tredici pagine, quattro viste e le due taglie; le due dell'anteprima dell'editor sono
  contate a parte e dichiarate.
- **Sessantacinque liste** con più di una riga, tutte con le righe sulla stessa griglia (è la prova che tiene in piedi
  la scelta 1 qui sopra).
- La revisione passata del prompt apre davvero il confronto v6/v7, con le due versioni affiancate.
- **Il cambiamento è chirurgico**: delle 48 catture di `scatta.js`, **34 sono identiche byte per byte** — tutte e dieci
  quelle del telefono, la home a undici e a quaranta, la Chat, l'Agenda, le tendine, la barra e l'editor. Delle
  quattordici che cambiano, `a-riepilogo.png` cambia in un riquadro di **62×63 px** (l'intaglio della card del diario) e
  `a-sez-spesa-oggi.png` in una freccia sola. Tabella dei riquadri in `DIREZIONI.md`, «Versione 18», sezione 4.
- Catture nuove del prima/dopo: `a-frecce-storico.png` (la famiglia del punto 2), `a-frecce-log.png` (la lista mista),
  `a-frecce-colloquio.png`, `a-frecce-revisioni.png`, `a-frecce-esecuzione.png`, `a-frecce-card.png`. Si compongono con
  **`design-system/tools/affianca.js`** (strumento nuovo) dalle stesse sezioni catturate nelle due copie dell'albero, e
  stanno in `FUORI` dentro `scatta.js`: non si rifanno da sole.
- **Artefatti ripubblicati allo stesso indirizzo** con la versione 18:
  [Console](https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e
  [telefono](https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). **La terza**,
  [la pagina della scelta della barra](https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f), **non è
  stata toccata perché non cambia**: tutte e otto le immagini che incorpora sono identiche byte per byte dopo la
  modifica (controllato, non dato per scontato).
- Artefatti precedenti, non ripubblicati (le loro pagine non cambiano): identità degli orbi
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6, pelli dell'orbe
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569, le due famiglie kit/orbe
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526, confronto A/B/C
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f, specimen
  https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b.
- Documenti: `SYSTEM-DESIGN.md` (**regola 26**, riga «Riga di elenco» nella tabella dei componenti, riga «Card lead»
  allungata, sezione 9 con le verifiche a 279, sezione 11 con i branch), `schermate/direzioni/DIREZIONI.md`
  («Versione 18» con il censimento, le diciotto famiglie, le tre lezioni, i riquadri dei pixel e le scelte da
  confermare), i quattro README.
- Regole in `CLAUDE.md`: invariate (direzione A, avatar della versione 10, niente emoji).

### Coda: la misura del conto nel titolo (studio del 2026-09-07)

Alla vista della versione 18 l'utente ha chiesto di rivedere il prezzo pagato nella versione 17 per far stare il quadro
«due per due» (la riga dei due numeri grandi tolta e il conto passato nel titolo). Tre forme dietro `?conta=`, catturate
e affiancate in `m-conta-titolo.png`:

| `?conta=` | Che cos'è | Card visibile | La riga di approva e rifiuta |
|---|---|---|---|
| **1** (la scelta di adesso) | conto a 26, come il titolo | 248 px su 256 | sopra, 4 px di margine |
| **2** (la strada di mezzo) | titolo a 26, conto a **36** | 244 px su 256 | sopra |
| **0** (com'era prima) | la riga dei due numeri grandi | 176 px su 256 | **sotto** |

**La strada di mezzo costa 4 px** e nessuna delle due va a capo, nemmeno con un conto a tre cifre. Una correzione a
quello che diceva la versione 17: il titolo sta a 26 px per la larghezza della *parola*, non per la misura del numero.
Quattro verifiche nuove in `prove/mobile.js`. **`CONTA = 1` resta la forma attiva** finché l'utente non sceglie: le
undici catture del telefono sono identiche byte per byte.

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
30. **2026-09-06**: costruite le **pagine Agenda e Chat** (versione 15) come da passaggio di consegne, con le
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
    di `(scala − 1) / 2` (vedi `DIREZIONI.md`, «Correzione 15a»). Corretto con una riga (`scale` al posto delle
    percentuali), screenshot e artefatti rifatti.
32. **Fine della sessione**: alla vista del prima/dopo l'utente ha detto **«bene»** e ha chiuso la sessione, chiedendo il
    passaggio di consegne, il prompt di avvio e la PR. Ha scelto il lavoro della prossima sessione: **la barra «Oggi in azienda»**
    (la parte verde in cima alla Console). Parole sue: «non capisco a primo impatto il suo utilizzo… mi dà l'idea che dica chi sta
    lavorando e chi ha un lavoro programmato? Ma non ne sono sicuro, in ogni caso non è ben chiaro»; chiede **uno studio e
    un'analisi UX** e un modo per renderla più chiara e utile.
33. **2026-09-06**: lo **studio UX della barra «Oggi in azienda»**. Fatta l'analisi con i
    numeri, disegnate tre strade nella Console vera e catturate a 11 e a 40, scelta e applicata la terza («la riga di stato»)
    perché l'utente non ha risposto, come chiedeva il prompt.
    Scelte fatte in costruzione (dettaglio in `DIREZIONI.md`, «Versione 16», sezione 7):
    - le caselle e le loro parole: «approvate» (le richieste approvate oggi, la stessa parola del Riepilogo), «al lavoro»,
      «ferma/e», «dopo» (la quinta, «aspettano te», è stata tolta con la correzione 16a: decisione 35);
    - la casella «al lavoro» è l'unica bianca piena (adesso pesa più del passato e del futuro) ed è la sola con la pila di
      avatar; le altre hanno l'icona dello sprite;
    - resta una sola ripetizione, «al lavoro», e **solo nella home**;
    - sopra i sedici dipendenti spariscono il nome di chi è fermo e l'ora del primo pianificato;
    - nella barra dei passi: quattro pillole è la soglia oltre cui i conclusi perdono il nome, due i passi da fare per esteso.
34. **2026-09-06, fine della sessione: l'utente conferma la strada 3.** Ha chiesto un artefatto con le sole quattro scelte da
    condividere con un collega (pubblicato, con il voto condiviso:
    https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f) e subito dopo ha scritto «confermo la Strada 3».
    Il codice era già quello, quindi la conferma non ha cambiato niente: sono cambiati solo i documenti. **Attenzione**: la
    conferma è della *strada*, non delle scelte di dettaglio elencate nella decisione 33 (le parole delle caselle, quante
    caselle, la duplicazione nella home): quelle restano da confermare, e se l'utente non le solleva vanno lasciate come sono.
35. **2026-09-06: tolta la casella «aspettano te» (correzione 16a).** Sulla ripetizione dei numeri l'utente ha lasciato la
    scelta a me («se ritieni giusto eliminare la ripetizione correggi, altrimenti lascia com'è»). Guardando le pagine invece
    che ragionando a memoria è venuto fuori che la linguetta lime `.a-mini` («N da approvare», fissa sul bordo destro) è su
    **tutte e sette** le pagine: il numero era già scritto ovunque, e nella home e nel Dipartimento compariva **tre volte**
    sulla stessa schermata. Tolta la casella; restano quattro. La regola che ne esce:
    **la barra dice che cosa fa l'azienda, la linguetta che cosa deve fare il titolare** — ed è la linguetta che apre la coda.
36. **2026-09-07: i tre artefatti allineati.** Console e telefono ripubblicati allo stesso indirizzo con la versione 16 e la
    correzione 16a (al primo tentativo il classificatore aveva negato la chiamata; rileggendo la versione pubblicata per intero
    e riprovando è passata). Nell'artefatto della scelta, che il titolare ha condiviso con un collega, le immagini della strada
    3 mostravano ancora **cinque** caselle: rifatte a quattro, aggiunto l'occhiello «Decisa: la strada 3» e il poscritto sulla
    correzione 16a. Il voto condiviso resta aperto.
37. **2026-09-07: si procede con i passi proposti.** Alla domanda «è rimasto qualcosa?» l'utente ha
    risposto scegliendo la lista dei lavori proposti e mai scelti: la **tab «Dipartimenti» del telefono**, la **barra nuova
    anche sul telefono** e i **controlli inerti**. È la prima scelta di lavoro fatta su una lista che avevo proposto io, non
    su una segnalazione sua: vale come mandato per la versione 17, non come brief di dettaglio.
38. **2026-09-07: fatti i tre passi** (versione 17), con il metodo di sempre. Scelte fatte in costruzione, da confermare
    (dettaglio in `DIREZIONI.md`, «Versione 17», ultimo paragrafo):
    - **la forma 2 del quadro del giorno** («due per due»), scelta dall'utente: le altre due restano dietro
      `?quadro=1|3`, e con la 2 la riga dei due numeri grandi della schermata 1 non c'è (il conto sta nel titolo);
    - il quadro sta **solo sulla schermata 1**, non su tutte come nella Console;
    - la casella «ferma» del quadro porta alla **conversazione** con chi è fermo, non all'Agenda;
    - nel dipartimento del telefono **«Da approvare» è la seconda sezione**, non la quarta come nella Console;
    - **la soglia dei dodici** per «cerca», e le sette sezioni che se la tengono;
    - le pillole tolte perché il modello non ha il dato; «scarica» sparisce da tutte e sei le sezioni;
    - il titolo del dipartimento che si stringe oltre i dodici caratteri.
39. **2026-09-07, fine della sessione: l'utente ha scelto la forma 2 del quadro del giorno e il lavoro delle prossime
    sessioni.** Tre cose decise in una volta:
    - **il quadro del giorno è la forma 2, «due per due»** (la sessione aveva applicato in via provvisoria la 3, come il
      prompt autorizzava in mancanza di risposta). Applicarla ha voluto dire pagarne il contro misurato;
    - **il lavoro riparte dal candidato 1** (le frecce) e prosegue nell'ordine dei candidati;
    - **la chat di dipartimento entra come candidato 5**, da approfondire con lui quando toccherà, non da scrivere di
      slancio: sue parole, «poi lo approfondiremo quando sarà il suo momento».
40. **2026-09-07, questa sessione: il candidato 1, le frecce di riga** (versione 18). Fatto nei tre passi del prompt.
    **Al punto 2 l'utente non ha risposto, quindi la famiglia l'ho scelta io**, come il prompt autorizzava. Scelte fatte in
    costruzione, da confermare (dettaglio in `DIREZIONI.md`, «Versione 18», ultimo paragrafo):
    - **la famiglia mostrata per prima è lo storico delle Richieste**: è la più numerosa (22 righe), sta su una pagina
      intera di righe, e nella stessa sezione contiene sia righe con una destinazione (quelle in attesa) sia righe senza —
      quindi mostra la regola tutta in una schermata sola;
    - **la colonna la decide la lista, non la riga** (classe `nofr`): l'alternativa era lasciarla sempre, e le liste
      uniformi sarebbero rimaste con 42 px vuoti in fondo a ogni riga;
    - **l'intaglio cade con l'ultimo pulsante**, e i 120 px liberati tornano al sottotitolo della card dell'esito del
      colloquio, che prima era tagliato;
    - **la revisione passata del prompt apre il confronto**: è l'unica freccia *nuova* del prodotto;
    - **l'anteprima dell'editor tiene matita e freccia**, dichiarata come i 45 indicatori della versione 17;
    - il gallone `i-chevr` del log resta dov'è: la regola dice dove sta una freccia, non quale freccia.

41. **2026-09-07, dopo la versione 18: due decisioni dell'utente in una volta.**
    - **I nomi delle due modalità della distribuzione**: `Fai pure` e `Chiedimi prima`, scelti fra le coppie proposte
      (l'altra era «Distribuisci / Proponi»). Sono parole sue: non si cambiano. Il dettaglio di come funziona la pillola
      sta nel candidato 5 qui sotto.
    - **Regola fondamentale nuova, scritta in `CLAUDE.md`: ogni dubbio progettuale passa dal consiglio.** Sue parole:
      «ogni volta che c'è un dubbio progettuale passalo tramite llm-council dando ad ogni consigliere il contesto adatto
      per poter dare un giudizio reale». Nasce dalla prima applicazione della stessa giornata (la domanda su chi parla
      nel filo del dipartimento), dove il consiglio ha ribaltato una scelta che sembrava un aut-aut. La regola dice anche
      che cosa **non** è un dubbio progettuale — quello che si può misurare o contare — e che il contesto va scritto per
      esteso, perché è la parte che decide la qualità della risposta.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Il lavoro della prossima sessione

**L'ordine è quello scelto dall'utente il 2026-09-07 (decisione 39): i candidati in fila.** Il candidato 1 è fatto,
quindi si scende. Il **5** è suo e va approfondito con lui prima di scriverlo — e le due domande da portargli sono qui
sotto, già pronte.

### 1 · La chat di dipartimento (candidato 5, proposta dell'utente)

È il candidato che l'utente ha proposto lui e il più interessante dei cinque, ma **non si scrive di slancio**: le due
domande qui sotto sono decisioni sue, non di design, e vanno fatte prima del codice.

**L'idea, in due parti**: (a) scrivere *al dipartimento* e non solo al singolo — dargli un obiettivo, una correzione, un
appunto; (b) un agente che da quella nota distribuisce da solo i compiti ai dipendenti. E, a parte, (c) far comunicare i
dipendenti fra loro e condividere memorie e conoscenze per un obiettivo comune.

**Il giudizio già dato in conversazione** (da riportargli):

- **(a) Il filo di dipartimento: sì, ed è la parte che vale.** Il livello esiste già nel modello e non ha voce: gli
  obiettivi sono già di dipartimento e hanno già una squadra (`chi: [1, 2, 3]` in `dati.js`), ma al dipartimento non si
  può parlare — se un obiettivo è in ritardo bisogna scegliere uno dei suoi e ripetere la stessa cosa agli altri. E la
  pagina Dipartimento (Console e telefono) oggi è un rapporto da leggere: un filo la renderebbe il posto da cui si guida.
- **(b) La distribuzione automatica: sì, ma come proposta da approvare, non in silenzio.** La spina dorsale del prodotto
  è «il titolare approva ogni uscita». Il pattern esiste già e non va inventato: **la distribuzione diventa una richiesta
  come la revisione di performance** (si approva, si chiedono modifiche, si rifiuta). Poi i compiti compaiono nei fili
  dei singoli **citando la nota di dipartimento da cui vengono**.
- **(c) Dipendenti che parlano fra loro: separare le due cose.** *Condividere conoscenza* sì — e per metà c'è già: lo
  strumento «Archivio del cliente» compare 15 volte nel modello. *Farli chiacchierare* no: è traffico macchina-macchina
  che nessuno leggerà, e soprattutto **indebolisce la cosa che il prodotto fa meglio, l'attribuzione**. Quindi:
  l'archivio come **oggetto di prima classe** con l'interfaccia che mostra chi ci ha messo cosa e chi l'ha usata; le
  dipendenze come **legame sull'obiettivo o sull'esecuzione**.

**Le due domande sono state portate all'utente il 2026-09-07 e la prima è passata da un consiglio di cinque pareri
indipendenti con revisione incrociata anonima** (`llm-council`). Il verdetto, da confermare con lui:

- **Chi parla nel filo: DGT che indossa il dipartimento** (la strada «economica», ma non nella forma nuda). Tre
  consiglieri su cinque avevano scelto il Coordinatore-dipendente; tutti e cinque però hanno proposto una terza strada, e
  le terze strade convergono su due requisiti che la scelta secca non soddisfa: la distribuzione **costa e può
  sbagliare**, quindi va attribuita; e va **correggibile**, quindi la sua logica deve essere un prompt versionato con un
  posto dove stare. La sintesi che li soddisfa senza inventare una specie nuova: nel filo parla il **dipartimento**
  (disco con l'icona del dipartimento, nome «Coordinamento Marketing» — non un avatar con gli occhi: la regola 19 vale
  per i dipendenti, e il prodotto ha già il disco nero con l'icona per chi non è una persona); il **prompt di
  coordinamento è una proprietà del dipartimento**, versionato e modificabile nella pagina Dipartimento come il soul
  prompt lo è in quella del Dipendente; il **costo va sulla riga «coordinamento» del dipartimento**, che in `m.costi` è
  già un'entità di costo. Conto dei dipendenti invariato, rendimento non inquinato, e la frase che il prodotto può dire
  di sé: *DGT non assume manager, il management è il software*.
- **Una parola sola per l'oggetto nuovo**: il consiglio ha notato che «piano / assegnazione / revisione / distribuzione»
  sono quattro parole per una cosa. Proposta: **il piano** (`tipo: 'piano'` accanto a post, documento, lista, revisione),
  che contiene **compiti**, uno per dipendente.
- **Punti ciechi segnalati dalla revisione incrociata, da presidiare quando si scrive**: nessuno aveva detto che cosa il
  titolare **smette** di approvare (senza una risposta il lavoro *aggiunge* approvazioni invece di toglierle); annullare
  una distribuzione non restituisce i token già spesi, quindi serve un **preventivo prima**, non un rollback dopo; il
  filo non deve nascere vuoto («Nessuno coordina il Marketing» è una funzione di punta che chiede un rito prima di
  servire); e va deciso se i dipendenti **possono rispondere** nel filo del dipartimento — se no non è una chat, è un
  modulo.

**Le due domande, per esteso** (se l'utente non le conferma, vanno rifatte prima di scrivere):

1. **Chi parla nel filo del dipartimento?** Un dipartimento non è una persona. Risposta economica: parla **DGT**, con i
   messaggi `sistema` che già esistono e che il filo sa già disegnare — zero personaggi nuovi. Risposta ambiziosa: un
   **Coordinatore** di dipartimento, un dipendente vero con avatar, tinta e voce (il ruolo esiste già nel vocabolario
   degli avatar, `avatar-motore.js`: «il fulcro stabile della squadra») — più caldo, ma è un personaggio nuovo nel
   prodotto e cambia il conto dei dipendenti, i costi e la pagina Dipartimento.
2. **La distribuzione dei compiti passa per l'approvazione? RISPOSTA DELL'UTENTE, 2026-09-07: sceglie lui, ogni volta.**
   Non una delle due modalità ma **tutte e due, con una pillola nella barra di scrittura**: `Fai pure` (il piano parte) e
   `Chiedimi prima` (il piano diventa una richiesta da approvare). **Le due parole sono scelte sue** fra le coppie
   proposte, e non si cambiano. Tre cose da rispettare quando si scriverà:
   - **la scelta vale sulla distribuzione, mai sulle consegne**: chi fa cosa può partire da solo, quello che esce va
     approvato come sempre. In una riga: *smetti di approvare chi fa cosa, non che cosa esce.* Senza questo confine
     «Fai pure» spegne in silenzio la spina dorsale del prodotto;
   - **il valore di partenza è `Chiedimi prima`**, e la scelta si ricorda **per dipartimento** (uno di cui ti fidi resta
     su «Fai pure», uno nuovo resta su «Chiedimi prima»): la pillola nella barra serve all'eccezione, a un tocco;
   - **anche con `Fai pure` il piano si vede e si ferma**: compare nel filo con chi ha preso cosa, porta il suo
     **preventivo prima** («4 compiti a 3 dipendenti, circa 12 €») ed è revocabile su quello che non è ancora partito.
     Il preventivo prima e non il rimborso dopo, perché annullare non restituisce i token già spesi (punto cieco colto
     dalla revisione incrociata del consiglio).

**Ordine consigliato quando toccherà**: prima il filo, poi la distribuzione. `filoDi` è indicizzato per dipendente e
andrebbe indicizzato per soggetto (`dip:mkt`); l'interfaccia della chat esiste già su Console e telefono.

**Da sistemare quando si tocca questa zona**: l'obiettivo `o2` («Area riservata Zenith») dichiara `chi: [1, 2]`, ma
**Kim (id 3) ci lavora** — la sua esecuzione dichiara `obiettivo: 'o2'` — e non è nell'elenco. Squadra dichiarata e
squadra reale già non coincidono; un filo di dipartimento renderebbe questo scarto visibile.

### 2 · I giudizi in sospeso

L'utente non ha mai giudicato: la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8), le schermate del
telefono (11 e 12), la revisione sul telefono (14), le pagine Agenda e Chat (15), gli avatar ricentrati (15a), la
versione 17 (Dipartimenti e controlli) e adesso la 18. Non blocca, ma è una lista che si allunga: vale la pena
chiederglielo.

### 3 · Le scelte di dettaglio della barra, mai sollevate

Le parole delle caselle («approvate» contro «consegnate», «ferma» contro «in errore»), l'ultima ripetizione «al lavoro» nella
sola home, quante caselle. La strada è confermata (decisione 34); queste no. Se non le solleva lui, vanno lasciate come sono.

### 4 · I punti aperti del modello

Le mutazioni che il modello non ha e che si vedono nell'interfaccia: «Sposta» dell'agenda non sposta davvero, i giorni della
settimana non si aprono, il dipendente non risponde da solo nella chat, il «non letto» non sopravvive al ricaricamento, lo
stato vuoto del dipendente appena creato. Sono lavori di modello, non di design.

### 5 · La tendina del passo dell'esecuzione

È l'unica destinazione che il censimento delle frecce ha trovato **mancante e sensata**: i quattro passi dell'esecuzione
hanno adesso righe senza freccia perché la tendina del passo non è mai stata costruita. Se un giorno si costruisce, le
frecce dei passi tornano da sole (la regola 26 dice che una riga con una destinazione la freccia ce l'ha).

## Come riprendere

**Due artefatti su tre sono stati ripubblicati con la versione 18** (Console e telefono); il terzo non cambia e non è
stato toccato, con la verifica byte per byte alle spalle (vedi «Stato»). Quindi non c'è niente da recuperare prima di
cominciare. Quando si ripubblica: `build-unico.js`, poi lo strumento con `url`, dopo aver letto la versione pubblicata
per intero (vedi «Note tecniche»).

**Prima cosa: sentire l'utente sulla versione 18.** Le frecce toccano ogni riga e ogni card, ed è il primo lavoro in cui
il prodotto *perde* qualcosa da tutte le parti: le catture del prima/dopo (`a-frecce-*.png`) sono fatte apposta per
questo. Se manda correzioni, quelle vengono prima di tutto il resto.

**Poi il candidato 5, la chat di dipartimento**, che è il prossimo nell'ordine che ha scelto lui. **Le due domande sopra
vanno risposte prima di scrivere codice**: chi parla nel filo, e se la distribuzione passa dall'approvazione.

**Non rimettere in discussione**: la direzione A, la barra «Oggi in azienda» della versione 16 con la correzione 16a, la
versione 17 (il quadro «due per due», i Dipartimenti, la regola 25), la regola 26 delle frecce, gli avatar della versione
10, la regola «niente emoji».

**Il metodo di sempre**, e da adesso con una regola in più: **ogni dubbio progettuale passa dal consiglio prima del
codice** (`llm-council`, regola fondamentale in `CLAUDE.md`, decisione 41). Non tutto è un dubbio progettuale: quello che
si misura si misura. Per il resto, prima e dopo: rifare i font locali (`fetch-fonts.py`), lanciare le **quattro** prove di `prove/` e
catturare le pagine prima di toccare qualcosa (base di confronto, con `scatta.js --in <cartella>`); leggere `CLAUDE.md`,
`SYSTEM-DESIGN.md` (sezioni 2, 6, 8, 9 e 10, regole 24, 25 e 26) e `DIREZIONI.md` (sezione 4 dalla versione 14, sezione 5);
controllare branch e PR (vedi «Stato»). Alla fine: prove aggiornate, screenshot con `scatta.js`, artefatti ripubblicati allo
stesso indirizzo, `DIREZIONI.md`, `SYSTEM-DESIGN.md`, i README, questo file, commit, push e PR.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): la tendina del passo dell'Esecuzione
(è anche l'ultima voce della lista qui sopra); «Ripeti»; lo stato vuoto del dipendente appena creato; il badge rosa
«campanella 2» accanto al numero «da approvare» copia quello della riga WORKSPACE della Console (`min(2, n)`) e non ha
ancora un significato nel modello; il badge «↓12%» del numero «spesi oggi» nella home è decorativo;
`design-system/tokens.css` porta solo tre token di moto e un easing diverso da quello dello specimen
(`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`).
Punti aperti della versione 15: nell'agenda «Sposta» porta all'agenda ma non sposta davvero l'orario e i giorni della
settimana non si aprono; nella chat il dipendente non risponde da solo alla nota del titolare e non c'è ricerca dentro il
filo; il «non letto» si azzera aprendo il filo e non sopravvive al ricaricamento.
Punti aperti della versione 16: la lista `m.agenda` in `dati.js` non la legge più nessuno tranne la barra di prima
(`?barra=0`); nella barra dei passi il «+N da fare» e il «+N fatti» non sono cliccabili.
Punti aperti della versione 17: restano inerti i **36 indicatori** nell'intaglio delle card (campanella col punto, matita,
bersaglio, scarica del Riepilogo: dicono uno stato e vengono dal riferimento) e le **9 campanelle** in alto a destra della
cornice, 45 in tutto; sul telefono restano inerti il download e la matita nell'intaglio delle card del Riepilogo; la
ricerca di sezione non ricorda il testo cambiando pagina.
Punti aperti nuovi della versione 18: **le 2 frecce dell'anteprima dell'editor** (dichiarate: sono il disegno della card,
non un controllo) e le quattro liste miste, in cui la colonna resta e qualche cella è vuota — è la scelta 1 della decisione
40 e si può ribaltare, ma allora vanno ribaltate tutte e 65 le liste insieme.

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (**107**: tendine, Richieste, editor del dipendente, esecuzione, 40, la barra
  «Oggi in azienda» e la barra dei passi, i controlli delle intestazioni di sezione e, dalla versione 18, **le frecce di
  riga**: zero inerti su tredici pagine, le 65 liste allineate, il confronto che si apre dalla revisione passata),
  `mobile.js` (**74**: gli otto telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40, il
  quadro del giorno e la tab Dipartimenti; a ogni passo nessuno schermo che scorre di lato e console pulita), `costi.js`
  (48) e `agenda-chat.js` (54); da qualunque cartella, leggono anche `CHROME_PATH`, girano con `reducedMotion: 'reduce'`,
  escono con 1 se una verifica fallisce. Attenzione: Playwright scorre da solo per cliccare un elemento fuori dallo
  schermo, quindi una verifica sullo scorrimento va fatta con l'elemento già visibile; nella pagina Richieste le richieste
  in attesa sono card `.task[data-az="richiesta"]` (le righe `.hrow` sono lo storico); `.elenco .erow` comprende la card
  «Aggiungi» (`:not(.add)`) e, nella chat, le righe dei fili sono `.erow.filo`.
- **`schermate/direzioni/scatta.js`** (48 catture, cinque gruppi) — rigenera le catture di `screenshot/` dalla lista
  di parametri dichiarata nel file: `node schermate/direzioni/scatta.js` (tutto),
  `… scatta.js console` / `barra` / `quadro` / `dip` / `controlli` (un gruppo), `… scatta.js a-11 a-40` (una o più),
  `--in /percorso` (scrive altrove, per il confronto prima/dopo). Stesse variabili delle prove. Le catture che restano a
  mano sono elencate in `FUORI` dentro il file (dalla versione 18 anche le `a-frecce-*.png`, che sono composizioni).
  **Attenzione**: quasi tutte le pagine della Console sono catturate con `tendina=chiusa`, e `a-1920.png` è la pagina del
  Dipendente a 1920×1080 solo viewport.
- **`design-system/tools/affianca.js`** (nuovo, versione 18) — compone due o più catture in un'immagine sola con le
  etichette sopra: `node affianca.js uscita.png prima.png dopo.png`, `COL="Prima|Dopo"` per le etichette delle colonne,
  `TIT="…"` per il titolo, `FONDO=#111` per il fondo. È lo strumento con cui si fanno i prima/dopo da mostrare
  all'utente, e non serve nient'altro: le due catture si prendono dalle due copie dell'albero (`git archive HEAD` per il
  «prima»).
- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `node design-system/tools/screenshot-page.js "schermate/direzioni/direzione-a.html?pagina=agenda" /percorso/a-agenda.png 1440 900`
  (dalla radice, con percorsi assoluti: nel Bash della sessione la cartella di lavoro può cambiare fra un comando e l'altro).
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, `H=1100` (l'altezza del viewport: va alzata finché la
  pagina non scorre, altrimenti le catture dopo un clic si spostano; per la pagina dei Costi `H=3200`), `CLICK="sel|sel"`,
  `EVAL="codice"`. Attenzione: il selettore va scelto sulla pagina d'arrivo e un `data-az` letto **prima** del clic, perché
  dopo la pagina è un'altra; gli indici `nth-of-type` delle sezioni **vanno enumerati con uno script**, non indovinati (in
  questa sessione tre su cinque erano sbagliati al primo colpo).
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora ogni `<script src>` nell'ordine dei tag, anche
  `../componenti.js` e gli script in `avatar/`).
- **Il confronto «niente di visibile cambia»**: catturare le stesse pagine con gli stessi parametri prima e dopo
  (`screenshot-page.js`) e confrontare i PNG byte per byte (`cmp`); l'albero di partenza si tira fuori con `git archive HEAD`. Le
  differenze di un PNG si vedono con un diff a pixel in Chromium (canvas) ritagliato sulla zona che cambia.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script vanno
  lanciati con percorsi assoluti: nel Bash della sessione la cartella di lavoro può restare su una sottocartella dopo un `cd`.
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**. `componenti.js` è un'IIFE come gli altri.
- **I nomi delle classi si scontrano**: `.drow` era già delle righe del diario nella tendina Riepilogo, e riusarla per le righe
  della settimana ha cambiato una pagina che doveva restare ferma. Prima di scegliere un nome, cercarlo in `componenti.js` e in
  `direzione-a.js`.
- **Ogni variante di griglia vuole la sua variante `nofr` accanto** (versione 18): `.hrow`, `.crow` e `.lrow` hanno una
  dichiarazione di colonne per ogni contesto (`.hrow.caso`, `.hrow.passo`, `.crow.rend`…), e la variante senza freccia va
  scritta **accanto a quella da cui deriva**, non tutte insieme in fondo: se ne dimentichi una, la lista perde la freccia ma
  tiene la colonna e nessuno se ne accorge finché non lo guardi. La prova sulle 65 liste è lì per questo.
- **Chi sfora la casella si scala, non si allarga**: `width`/`height` in percentuale su un figlio di una griglia con la riga
  automatica è una percentuale ciclica. Per far sforare un elemento si usa la proprietà `scale`.
- **Il testo eredita il colore della cornice**: una primitiva scura (`.qrow`) messa su una superficie chiara resta bianca su bianco.
- **Il fondo di una barra a segmenti non può essere lime**: la pista del giorno è `#EDEDED` e sono i blocchi a portare il colore.
- **Le date del modello non si ricavano da `new Date`**: la giornata dell'azienda è giovedì 4 settembre 2026 e va letta da
  `azienda.data` / `azienda.dataLunga`.
- **Il telefono non deve caricare la Console**: le classi del telefono hanno il prefisso `m-`; le condivise sono solo quelle di
  `componenti.js`.
- **L'aggregatore dei costi** (`m.costi(periodo, dip)`): un solo calcolo per la pagina dei Costi e per la sezione «Spesa del mese»
  del Dipartimento; le richieste sono un campione, non il registro.
- L'artefatto si ripubblica allo stesso indirizzo passando `url` allo strumento, dopo averlo letto con `action: read`: lo strumento
  salva il file e chiede che sia letto **per intero** (a blocchi di 250–450 righe, ognuno sotto i 25 000 token; il `grep` non
  basta). Il file unico della Console pesa circa 460 KB (5 710 righe), quello del telefono 345 KB (4 679). Mai forzare. La
  sottoscrizione agli aggiornamenti dell'artefatto **non si registra da questa sessione** (`mint_failed`): non dire che si sta
  «guardando».
- **Prima di ripubblicare, controllare se serve**: la pagina della scelta della barra incorpora otto catture; in questa
  sessione sono risultate tutte identiche byte per byte, quindi l'artefatto non è stato toccato e non è costato la
  rilettura. Il controllo è un `cmp` per immagine, un minuto.
- **Una griglia senza colonne dichiarate non vincola i figli**: `display:grid` con `grid-template-columns:none` mette gli
  elementi in una colonna implicita `auto`, che cresce a `max-content` anche oltre il contenitore. Con `overflow:hidden` sopra
  l'eccedenza sparisce **in silenzio**. Il rimedio è `grid-template-columns:minmax(0,1fr)`.
- **Il confronto prima/dopo a riquadro, non solo byte per byte**: quando qualcosa cambia di proposito, `cmp` dice solo «diverso».
  Un diff a pixel in Chromium che ritorna il **riquadro** dei pixel cambiati dice se la differenza sta dove deve stare: in questa
  sessione ha provato che `a-riepilogo.png` cambia in 62×63 px e basta.
- **La lettura per intero dell'artefatto costa**: 4 700–5 600 righe, un centinaio di migliaia di token, a blocchi di
  300–450 righe. Da mettere in conto **prima** di arrivare a fine sessione.
- **I backtick dentro il CSS**: il CSS sta in un template literal, quindi un commento che cita `` `nofr` `` con i backtick
  chiude la stringa e la pagina non carica («Unexpected identifier»). Nei commenti dentro il CSS si scrive `nofr` senza
  apici. **Ci si cade a ogni sessione**: succede appena si scrive un commento che nomina una classe.
- **Un commento CSS chiuso due volte mangia la regola che segue, in silenzio.** Se una regola nuova non fa effetto,
  guardare i commenti sopra prima della specificità.
- **Una verifica che conta righe deve filtrare per `display`**: `.crow.add` («Aggiungi un'eccezione») è una `.crow` ma è
  `display:flex`, e in una prova sull'allineamento delle griglie dà quattro falsi positivi. `getComputedStyle(r).display
  === 'grid'` prima di confrontare `grid-template-columns`.
- **I selettori si controllano sulla pagina, non a memoria**: l'anteprima dell'editor è `.anteprima` (non `.a-edit`), il
  pannello Riepilogo è `.a-tend` (non `.a-side`). Due prove rosse per niente, in questa sessione.
- **Uno spazio fra due elementi flex non è cosmetico**: `<h3>DA APPROVARE <b>4</b></h3>` con `white-space:nowrap` allarga il
  nodo di testo quanto basta a mandare il titolo a capo.
- **Le misure prese con `getBoundingClientRect` sui telefoni vanno divise per 1,25**: `.m-phones` ha `zoom:1.25`.
- **Un `const` usato prima della sua riga dentro la stessa funzione non è hoisting ma zona morta.**
- **Contare i controlli inerti a `grep` porta fuori strada**: la lista di 61 della versione 17 e le 84 frecce di questo
  passaggio di consegne venivano da lì, e tutte e due erano sbagliate per difetto. Il conto giusto si fa aprendo le pagine
  e prendendo `.rb`, `.pill` o `i-ne` senza `data-az` **e senza un antenato con `data-az`**, su tutte le pagine e tutte e
  due le taglie.
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS, la card costo su fondo lime, la striscia «chi» e il rail: come
  nelle note delle sessioni precedenti (storia di questo file in git, commit `b50f659`, `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca

1. **Il giudizio dell'utente sulla versione 18**: le frecce toccano ogni riga e ogni card, e le catture del prima/dopo
   sono pronte. In particolare va risollevata la scelta della decisione 40 sulle **liste miste** (la colonna che resta
   con la cella vuota): è l'unica che si vede e si può ribaltare.
2. **La chat di dipartimento (candidato 5)**: la seconda domanda ha risposta (la pillola `Fai pure` / `Chiedimi prima`,
   decisione 41). **Resta aperta la prima**: chi parla nel filo. Il consiglio ha dato il suo verdetto — DGT che indossa
   il dipartimento — ma l'utente non l'ha ancora confermato, e finché non lo fa non si scrive.
3. **La scelta fra le tre misure del conto nel titolo** (`?conta=0|1|2`, studio del 2026-09-07): l'utente ha visto le tre
   forme affiancate in `m-conta-titolo.png` e deve dire quale tiene. Finché non decide resta la 1. Resta anche da sentire
   il **giudizio sulla versione 17** (i Dipartimenti, i controlli).
4. I giudizi in sospeso delle versioni 6, 8, 11, 12, 14, 15 e 15a; le scelte di dettaglio della barra (decisioni 33 e 34).
5. I punti aperti elencati in «Come riprendere».

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md (in particolare «Stato», «Il lavoro della prossima sessione» e «Come
riprendere»). Controlla la PR #15: se è unita riparti da main con un branch nuovo, altrimenti continua sullo stesso branch.

Lavoriamo nella direzione A · Console (schermate/componenti.js, schermate/direzioni/direzione-a.js, dati.js, comune.js,
avatar/, mobile.js): niente emoji, solo le icone dello sprite; gli avatar sono quelli della versione 10; i colori
restano quelli del sistema. Sono decise e non si rimettono in discussione: la direzione A, la barra «Oggi in azienda»
della versione 16 con la correzione 16a, la versione 17 (quadro «due per due», Dipartimenti, regola 25) e la regola 26
delle frecce di riga della versione 18.

Vale la regola fondamentale nuova: ogni dubbio progettuale passa dal consiglio (llm-council) prima del codice, con il
contesto scritto per esteso a ogni consigliere. Quello che si può misurare o contare non è un dubbio progettuale: lì
misuri.

Questa sessione facciamo il candidato 5, la chat di dipartimento. Della seconda domanda ho già deciso: la pillola nella
barra di scrittura con «Fai pure» e «Chiedimi prima», predefinito «Chiedimi prima», ricordata per dipartimento, e vale
sulla distribuzione dei compiti, mai sulle consegne. Resta aperta la prima: chi parla nel filo. Riportami il verdetto
del consiglio (DGT che indossa il dipartimento) con le sue conseguenze, e aspetta che scelga.

Poi costruisci nell'ordine che consigli tu: prima il filo di dipartimento (scrivere al dipartimento, i messaggi che
arrivano ai fili dei singoli citando l'origine), poi la distribuzione. Prima di scrivere fammi vedere che forma prende
sulla pagina Dipartimento della Console e sul telefono.

Il metodo di sempre: prima lancia le quattro prove di prove/ e cattura le pagine con scatta.js (base di confronto). Alla
fine prove aggiornate, screenshot, gli artefatti ripubblicati allo stesso indirizzo (solo quelli che cambiano
davvero), DIREZIONI.md (versione 19), SYSTEM-DESIGN.md, i README e PROSSIMA-SESSIONE.md, commit, push e PR. Alla fine
mostrami cosa è cambiato e fermati.
```
