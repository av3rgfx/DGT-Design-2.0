# Prossima sessione — passaggio di consegne

Stato al 2026-09-07, fine della sessione della **barra «Oggi in azienda»** (versione 16 della direzione A · Console): lo studio UX
chiesto dall'utente, tre strade disegnate nella Console vera e la terza applicata — la barra non finge più una linea del tempo e
dice il giorno in quattro caselle contate e nominate. Nella stessa sessione, sullo stesso componente, sono stati corretti due
difetti della **barra dei passi** dell'Esecuzione (usciva dalla pagina e veniva tagliata in silenzio). Tutto è committato e
pushato sul branch indicato sotto, con la PR aperta verso `main`. **L'utente ha visto la barra nuova e ha confermato la
strada 3** («confermo la Strada 3», 2026-09-06): il codice era già quello, quindi non è cambiato niente dopo la conferma.
Il 7 settembre, con la scelta a lui, è stata tolta la casella che ripeteva la linguetta lime (correzione 16a) e i **tre
artefatti** sono stati ripubblicati allo stesso indirizzo: Console, telefono e la pagina della scelta condivisa col collega.

## Stato

- Branch: `claude/console-oggi-azienda-bar-kzetlz` (da `main`: la **PR #12 era già unita** all'inizio della sessione, quindi si è
  ripartiti da `main`, come chiedeva il prompt). A fine sessione è aperta la **PR #13** verso `main`
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/13): se all'avvio della prossima sessione risulta già unita, ripartire da `main`
  con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si aggiorna da sola.
- **La barra «Oggi in azienda»** (`barraStato` e `gruppiOggi` in `direzione-a.js`): dentro la pista lime, quattro caselle contate
  e nominate — *2 approvate*, *3 al lavoro* (bianca piena, con la pila di chi lavora), *1 ferma · Kim* (rosa),
  *3 dopo · dalle 15:00* — ognuna cliccabile verso il posto giusto (Richieste, Esecuzione ferma, Agenda). **Quello che aspetta
  il titolare non sta nella barra**: lo dice la linguetta lime «N da approvare» (`.a-mini`), fissa su tutte e sette le pagine e
  l'unica che apre la coda (correzione 16a, vedi la decisione 35). Legge il modello vero
  (stati dei dipendenti e richieste in attesa), non più la lista parallela `m.agenda`, che non conosceva gli errori. Sopra i
  sedici dipendenti i dettagli (il nome di chi è fermo, l'ora del prossimo) cedono il posto ai numeri. `?barra=0` rimette la
  barra di prima, e con quel parametro la pagina è **identica byte per byte** a prima della sessione.
- **Che cosa si è scostato dal riferimento, e perché**: resta tutta la forma (pillola bianca 64, titolo 18, chip della data,
  pista lime 52, pillole con le pile di avatar, cerchio 52 in fondo); cade **l'asse del tempo** — gli orari fra i blocchi, i
  separatori e il marcatore nero dell'ora. Motivo, con i numeri: in DGT la scala cambiava di otto volte fra un blocco e l'altro
  (3,4 px/min su una consegna, 13,4 sul segmento in corso, 1 px per le quattro ore e mezza di vuoto del pomeriggio), il
  marcatore stava al bordo del segmento verde e non a un'ora (a 40 lo stesso «10:42» si spostava di 12 px), i quattro stati
  distavano 1,1–1,2 : 1 di contrasto e la barra mostrava 4 delle 8 esecuzioni della giornata, tacendo **proprio sulle due su cui
  il titolare deve agire**. Nel riferimento l'asse del tempo è legittimo: lì la barra è l'agenda personale di una giornata di
  appuntamenti. Tutto in `DIREZIONI.md`, «Versione 16», sezioni 1 e 4; regola 24 in `SYSTEM-DESIGN.md`.
- **Le due strade scartate** restano scritte in `DIREZIONI.md` e catturate, non nel codice: «i tre momenti» (la forma del
  riferimento con i blocchi nominati: a 40 taglia tre etichette) e «la giornata a misura» (la pista proporzionale alle ore:
  onesta ma muta, e duplica in peggio la barra del giorno della pagina Agenda).
- **La barra dei passi dell'Esecuzione** (stesso componente): due difetti trovati e corretti. (a) `.etesta` era una griglia senza
  colonne dichiarate, la colonna implicita cresceva a `max-content` e con sette passi la barra arrivava a **2180 px** dentro un
  contenitore da 1312; `.a-app` ha `overflow:hidden`, quindi tre passi su sette non erano sullo schermo e nessuna prova se ne
  accorgeva. Rimedio: `grid-template-columns:minmax(0,1fr)`, lo stesso che `.a-main` ha già. (b) Sette passi per esteso chiedono
  1600 px e la pista ne ha 990: ora i passi conclusi di un'esecuzione lunga lasciano il nome (tengono spunta e durata), oltre tre
  conclusi restano gli ultimi due e gli altri si contano («+3 fatti»), i passi da fare oltre i due successivi si contano
  («+2 da fare»); il passo in corso e quello in errore restano sempre per esteso. Verificato su **tutte e 51 le esecuzioni** del
  modello (11 e 40): nessuna sfora.
- **Le quattro prove cliccate** passano: `prove/console.js` **82** (erano 64: diciotto verifiche nuove sulla barra e sulla barra
  dei passi, comprese le due che impediscono alla barra di tornare a ripetere la linguetta), `mobile.js` 39, `costi.js` 48,
  `agenda-chat.js` 54. In tutto **223**.
- **Niente altro è cambiato**: confronto a pixel delle venticinque catture della Console prima e dopo — il riquadro delle
  differenze è sempre quello della barra (`x 426–1203, y 34–85`, circa 29 500 pixel), tranne `a-esecuzione.png` e
  `a-esecuzione-attesa.png`, che cambiano anche nella barra dei passi (il difetto corretto qui sopra). `a-1920.png` cambia nello
  stesso riquadro scalato di 1,333. Il telefono non è toccato: `mobile.png` rigenerato è identico byte per byte.
- **Strumento nuovo: `schermate/direzioni/scatta.js`.** I parametri con cui erano state fatte le catture di `screenshot/` non
  stavano scritti in nessun posto e andavano ricostruiti a mano ogni sessione (in questa, due sono stati ricostruiti sbagliati e
  scoperti solo dal confronto a pixel: quasi tutte le pagine erano state catturate con `tendina=chiusa`, e `a-1920.png` è la
  pagina del Dipendente, non la home). Ora la lista è dichiarata nel file: `node schermate/direzioni/scatta.js` rigenera tutto,
  `console` o `barra` un gruppo solo, `--in <cartella>` scrive altrove per il confronto prima/dopo. Le catture che restano a mano
  sono elencate in `FUORI` dentro il file (direzioni B e C, pellicola del moto, cornici del telefono, sezioni per elemento, le
  due strade scartate).
- Screenshot nuovi in `schermate/direzioni/screenshot/`: `a-barra-oggi.png` (la barra di prima), `a-barra-momenti.png`,
  `a-barra-misura.png`, `a-barra-stato.png` (le tre strade), le stesse con `-40`, le quattro nella Console
  (`a-barra-console-*.png`), `a-barra-passi-prima.png` e `a-barra-passi.png`. Rigenerate le 25 catture della Console.
- **Artefatti ripubblicati allo stesso indirizzo, con la versione 16 e la correzione 16a:**
  [Console](https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) (444 KB) e
  [telefono](https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9) (322 KB). I due file unici si rigenerano in
  un comando (`node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html` e `… mobile.html /percorso/…`).
  Al primo tentativo la chiamata era stata **negata dal classificatore dei permessi** della modalità automatica dopo la lettura
  per intero della versione pubblicata; ripetuta dopo la stessa lettura è passata. Se ricapita: rileggere e riprovare.
- **Artefatto della scelta ripubblicato** (https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f): le immagini
  della strada 3 sono quelle a quattro caselle, l'occhiello dice «Decisa: la strada 3» e sotto la bilancia c'è il poscritto
  sulla correzione 16a. Il voto condiviso resta aperto. **Sorgente e costruttore stanno nel repository** (richiesta
  dell'utente): `schermate/direzioni/scelta-barra.src.html` — che non si apre da solo, le catture sono segnaposto `IMG:<nome>` —
  e `node schermate/direzioni/costruisci-scelta.js`, che ci incorpora i PNG di `screenshot/`. La pagina costruita
  (`scelta-barra.html`, 1,8 MB di base64) è in `.gitignore` come i file unici degli altri artefatti.
- Artefatti precedenti, non ripubblicati (le loro pagine non cambiano): identità degli orbi
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6 (`avatar-identita.html`), pelli dell'orbe
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569 (`avatar-pelli.html`), le due famiglie kit/orbe
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526 (`confronto-avatar.html`), confronto A/B/C
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f (`confronto.html`), specimen
  https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b.
- Documento unico: `SYSTEM-DESIGN.md` (riga «Barra agenda» della sezione 6 riscritta con il prima e il dopo, riga «Pagina
  Esecuzione» con la barra che si stringe, **regola 24**, sezione 9 con le verifiche, sezione 11 con il branch). Studio e
  versioni della direzione A: `schermate/direzioni/DIREZIONI.md`, «Versione 16» (sette sezioni: che cosa dice oggi la barra con
  le misure, che cosa dovrebbe dire, le tre strade con pro e contro, la raccomandazione con lo scostamento dichiarato, la barra
  dei passi, la verifica, le scelte da confermare) e sezione 5 con `scatta.js`.
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

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

**I tre artefatti sono in pari** (Console, telefono e pagina della scelta: vedi «Stato»), quindi non c'è niente da recuperare
prima di cominciare. Quando si ripubblica: `build-unico.js`, poi lo strumento con `url`, dopo aver letto la versione pubblicata
per intero (vedi «Note tecniche»).

**La strada è confermata** (decisione 34), quindi non c'è niente da rifare sulla barra. I lavori proposti e non ancora scelti
sono: la tab
«Dipartimenti» del telefono (l'ultima inerte); la tendina del passo nell'Esecuzione; i controlli ancora inerti (cerca, filtri,
scarica delle intestazioni, le pillole della «Spesa del mese» del Dipartimento); portare la barra nuova anche sul telefono, che
oggi non ha nessun quadro del giorno in cima (ha la linea del tempo del Riepilogo).

Se l'utente chiede **correzioni di dettaglio sulla barra** (la strada resta la 3), i punti su cui è più probabile che voglia
intervenire, in ordine:
- **le parole**: «approvate» contro «consegnate», «ferma» contro «in errore»;
- **l'ultima ripetizione**, «al lavoro» nella sola home: se dà fastidio si toglie anche quella casella, ma si perde la pila di
  chi lavora, che il numero grande non ha; l'alternativa è cambiare i numeri grandi, che però vengono dal riferimento;
- **il tempo che manca**: se vuole rivedere *quando*, la strada 2 («la giornata a misura») è disegnata e catturata, e si può
  rimettere in due modi — al posto delle caselle, o come seconda riga sotto di esse (la barra passerebbe da 64 a 96 px e
  scenderebbe tutta la cornice, che è fissa: `.a-head` a 112, `.a-rail` a 260, `.a-main` a 232);
- **le caselle sono cinque**: se ne vuole meno, la prima a cadere è «approvate» (è la sola che guarda al passato).

**Il metodo di sempre**, prima e dopo: rifare i font locali (`fetch-fonts.py`), lanciare le **quattro** prove di `prove/` e
catturare le pagine prima di toccare qualcosa (base di confronto, ora con `scatta.js --in <cartella>`); leggere `CLAUDE.md`,
`SYSTEM-DESIGN.md` (sezioni 2, 6, 8, 9 e 10, regola 24) e `DIREZIONI.md` (sezione 4 dalla versione 14, sezione 5); controllare
branch e PR (vedi «Stato»). **Se l'utente manda correzioni** su lavori precedenti (le pagine Agenda e Chat, gli avatar
ricentrati, il mobile), applicarle prima: le scelte da confermare stanno nelle decisioni 23, 26, 28, 30, 31 e 33. Alla fine:
prove aggiornate, screenshot con `scatta.js`, artefatti ripubblicati allo stesso indirizzo, `DIREZIONI.md` (versione 17),
`SYSTEM-DESIGN.md`, i README, questo file, commit, push e PR.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): la tendina del passo e i filtri inerti
dell'Esecuzione; le tre pillole della sezione «Spesa del mese» del Dipartimento (la pagina dei Costi ha le sue, funzionanti); i
cerchi cerca / filtri / scarica delle intestazioni; le frecce inerti delle righe per modello; «Ripeti»; lo stato vuoto del
dipendente appena creato; la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8), le schermate del mobile
(11 e 12) e la revisione sul telefono (14) mai giudicate; sul telefono la tab «Dipartimenti», i cerchi «filtri» e «ordina», il
download e la matita delle card del Riepilogo sono inerti; il badge rosa «campanella 2» accanto al numero «da approvare» copia
quello della riga WORKSPACE della Console (`min(2, n)`) e non ha ancora un significato nel modello; il badge «↓12%» del numero
«spesi oggi» nella home è decorativo; `design-system/tokens.css` porta solo tre token di moto e un easing diverso da quello dello
specimen (`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`).
Punti aperti della versione 15: nell'agenda «Sposta» porta all'agenda ma non sposta davvero l'orario (il modello non ha una
mutazione per farlo) e i giorni della settimana non si aprono; nella chat il dipendente non risponde da solo alla nota del
titolare e non c'è ricerca dentro il filo; il «non letto» si azzera aprendo il filo e non sopravvive al ricaricamento.
Punti aperti nuovi della versione 16: la lista `m.agenda` in `dati.js` non la legge più nessuno tranne la barra di prima
(`?barra=0`). Ora che la strada è confermata si potrebbe togliere, ma toglierebbe anche il confronto con la barra vecchia:
farlo solo se l'utente lo chiede; il telefono non ha il quadro del giorno in cima; nella barra
dei passi il «+N da fare» e il «+N fatti» non sono cliccabili (la lista dei Passi qui sotto li ha tutti).

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (80: tendine, Richieste, editor del dipendente, esecuzione, 40, e dalla versione 16 la barra «Oggi in azienda» e la barra dei passi), `mobile.js` (39: i
  sei telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40; a ogni passo nessuno schermo che
  scorre di lato e console pulita), `costi.js` (48) e `agenda-chat.js` (54: le due pagine nuove, da dove ci si arriva, i filtri, la
  scrittura nel filo, le due tab del telefono); da qualunque cartella, leggono anche `CHROME_PATH`, girano con
  `reducedMotion: 'reduce'`, escono con 1 se una verifica fallisce. Attenzione: Playwright scorre da solo per cliccare un elemento
  fuori dallo schermo, quindi una verifica sullo scorrimento va fatta con l'elemento già visibile; nella pagina Richieste le
  richieste in attesa sono card `.task[data-az="richiesta"]` (le righe `.hrow` sono lo storico); `.elenco .erow` comprende la card
  «Aggiungi» (`:not(.add)`) e, nella chat, le righe dei fili sono `.erow.filo`.
- **`schermate/direzioni/scatta.js`** (versione 16) — rigenera le catture di `screenshot/` dalla lista di parametri dichiarata
  nel file, così non vanno più ricostruiti a mano: `node schermate/direzioni/scatta.js` (tutto), `… scatta.js console` o `barra`
  (un gruppo), `… scatta.js a-11 a-40` (una o più), `--in /percorso` (scrive altrove, per il confronto prima/dopo). Stesse
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
  basta). Il file unico della Console pesa circa 447 KB (5 475 righe), quello del telefono 330 KB. Mai forzare. La sottoscrizione
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

## Cosa manca

1. **Le scelte di dettaglio della barra**, mai sollevate dall'utente e quindi ancora da confermare (decisioni 33 e 34): le
   parole delle caselle, l'ultima ripetizione («al lavoro», nella sola home), quante caselle. La strada, invece, è confermata,
   e la ripetizione più grossa è già stata tolta con la correzione 16a (decisione 35).
2. **Il giudizio dell'utente** sulle pagine Agenda e Chat (versione 15, decisione 30), sugli avatar ricentrati (15a, decisione
   31), sulla revisione sul telefono (decisione 28), sulle schermate del mobile (versioni 11 e 12, decisione 23), sulla pagina
   del Dipendente (versione 6) e su quella dell'Esecuzione (versione 8): in sospeso, non blocca. La pagina dei Costi ha avuto un
   «bene» (decisione 27).
3. I punti aperti ereditati e quelli nuovi della versione 16 (vedi «Come riprendere»).

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #13: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/componenti.js, schermate/direzioni/direzione-a.js,
dati.js, comune.js, avatar/, mobile.js): niente emoji, solo le icone dello sprite; gli avatar sono quelli della versione 10; i
colori restano quelli del sistema.

La barra «Oggi in azienda» della versione 16, con la correzione 16a, è confermata: non rimetterla in discussione.

Poi lancia le quattro prove di prove/ e cattura le pagine con scatta.js: sono la base di confronto. Alla fine prove, screenshot,
artefatti, DIREZIONI.md (versione 17), SYSTEM-DESIGN.md, README e PROSSIMA-SESSIONE.md, commit, push e PR.
```
