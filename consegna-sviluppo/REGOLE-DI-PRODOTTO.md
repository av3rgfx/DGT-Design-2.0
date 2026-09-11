# Regole di prodotto

Quarantotto regole che il prodotto DGT deve rispettare a schermo. Vengono dal repository di design
(`SYSTEM-DESIGN.md`, sezione 10; `CLAUDE.md`; `PRODUCT.md`) e sono riscritte qui come regole di prodotto: che cosa
impongono, a quali schermate e componenti si applicano, e il fatto misurato che le ha generate. Il numero fra
parentesi quadre è quello originale della lista di `SYSTEM-DESIGN.md`, così ogni regola resta rintracciabile.

## Come leggere

- **Che cos'è DGT.** Un sistema operativo aziendale per agenti AI, su web: il titolare crea un'azienda digitale fatta
  di dipartimenti e dipendenti AI, assegna obiettivi reali e gli agenti lavorano per ore o giorni (codice, ricerca,
  contenuti, pubblicazioni social). Due utenze nella stessa app: il titolare (risultati, costi, approvazioni) e
  l'operatore tecnico (configurazione, esecuzioni). Il cliente tipo è un'agenzia che vende software, automazioni,
  siti ed e-commerce.
- **La spina dorsale.** Il titolare approva ogni uscita; ogni euro e ogni consegna risalgono a un dipendente e a
  un'esecuzione. Molte regole qui sotto sono conseguenze di queste due frasi.
- **Le due taglie.** «A undici» e «a quaranta» sono le due taglie dell'azienda di prova (11 e 40 dipendenti AI) su
  cui ogni regola è stata misurata. Il prodotto deve reggere a tutte e due.
- **Le marcature.** **Aperta**: la decisione è del titolare e non è ancora presa (vedi `DECISIONI-APERTE.md`); il
  prodotto tiene la forma attuale finché non arriva una parola. **Emendata**: una parte della regola è stata
  superata da una regola successiva; è scritto che cosa vale ancora e che cosa no.
- Il metodo di lavoro del repository di design (ogni dubbio progettuale passa da un consiglio di pareri) non è una
  regola di prodotto e non è riportato.

I temi: accento e colore · testi e taglio · controlli e frecce · scala e taglie · approvazioni e coda · limiti e
freni · workflow e canvas · avatar · telefono · numeri e onestà di quello che si stampa · cornice e pagine (le
regole che definiscono le pagine del prodotto e non stanno in nessuno dei temi precedenti).

---

## 1. Accento e colore

### [4] Un solo accento — **aperta**, e **emendata** per il canvas

- **Impone.** Il lime `#B8FC64` è l'attenzione del titolare e nient'altro: al lavoro, da approvare, la sua firma.
  Il rosa `#F9A3A3` solo per errori e cali. Nessun secondo accento nell'applicazione. Sul lime il testo va
  all'inchiostro `#0A0A0A`, mai al bianco.
- **Dove.** Ovunque: chip, card, righe, badge, barra del giorno, canvas dei workflow, telefono.
- **Emendamento (deciso dal titolare; è l'unica eccezione al «copiato così com'è», e vale solo per il colore).** Il
  nodo selezionato e i connettori del secondo riferimento passano dal verde `#4FCB58` al lime: nodo selezionato
  `#B8FC64 → #9AD84B`, bagliore `rgb(184 252 100/.55)`, rosso `#F04848` quello del sistema. Notte, tessere, griglia
  puntinata, porte con l'etichetta e forma dei nodi restano quelli del riferimento.
- **Fatto.** Il canvas a nodi è applicato davvero nella pagina Workflow, e i sei verdi del riferimento erano
  l'unico secondo accento sopravvissuto nel repository.
- **Aperta.** Un limite sfondato non è né un errore né un calo, eppure è rosa in quattro forme (badge
  dell'intestazione, chip «oltre», barra del budget, badge del mese). La tinta resta rosa finché il titolare non
  decide; la classe è dedicata (`.badge.oltre`) così che cambiarla costi una riga.

### [48] Una forma che dice due fatti diversi nella stessa taglia è una forma sbagliata

- **Impone.** Una stessa tinta o classe non può significare due cose in due pagine dello stesso rail. Il lime
  dice «al lavoro» e «firma del titolare»; un budget sfondato lo dice la **parola dentro il chip che c'è già**
  («84 € · oltre»), non un colore.
- **Dove.** Righe della home e della pagina Costi; badge dell'intestazione; ogni chip di stato.
- **Fatto.** A quaranta la classe `lav` dipingeva di lime nella home le righe di chi è al lavoro e nei Costi quelle
  di chi è oltre il budget. «84 € · oltre» misura 69,8 px e non taglia nessuna delle dodici righe; due chip separati
  ne avrebbero tagliate cinque. La riga della home restava lime su 12 righe su 12 ferme dal tetto mentre il primo
  numero della pagina diceva «12 in pausa». Il badge di un limite sfondato usava la classe `down`, che nei token si
  chiama «badge in calo», per una salita: rinominato `oltre`.

---

## 2. Testi e taglio

### [5] Testi corti

- **Impone.** Titoli entro due righe a 24 px, ruoli in una riga a 13 px, pillole su una riga. Testi in italiano e in
  inglese della stessa lunghezza visiva: si scelgono etichette corte.
- **Dove.** Card esecuzione, card dipendente, card consegna, pillole di filtro, chip.

### [10] Il dipendente AI non ha un nome di base

- **Impone.** L'etichetta principale del dipendente è il **ruolo** (nella card a 22 px su due righe) e sotto sta il
  dipartimento. Il nome è facoltativo (alla creazione o alla modifica) e quando c'è torna la forma piena: nome a
  26 px, sotto «ruolo · dipartimento». La card dipendente è alta 240 px nei due casi.
- **Dove.** Tutte le viste: card, righe compatte, testate, pile, chat, telefono.

### [16] Niente emoji

- **Impone.** Nessuna emoji nel prodotto né nel sistema di design. Al loro posto le icone dello sprite di DGT
  (elencate in `SISTEMA-DI-DESIGN.md`). La fiamma delle pillole «caldo», «urgenti», «da approvare», «in ritardo» è
  l'icona `i-fire`.
- **Dove.** Ovunque un'icona accompagni un testo: pillole, chip, righe, tendine, telefono.

### [27] La cosa creata da un'esecuzione si chiama «consegna», ed è una sola cosa con un solo nome

- **Impone.** Una sola parola — **consegna** — nel codice, nei titoli di sezione, nei contatori, nelle richieste,
  negli obiettivi e nei costi. Le consegne vivono in una sezione della pagina Dipartimento (seconda su sei, sotto
  «Oggi in ‹dipartimento›» perché ne sono il risultato), in card 316×294 px a quattro per riga con cinque pillole
  di filtro; sul telefono la stessa sezione in righe. Nessuna pagina nuova, il rail resta a sei.
- **Tre mestieri.** **La card serve a trovare, la pagina a sapere, la tendina a decidere.** Aprire una consegna apre
  la **sua pagina** (chi l'ha fatta, il passo con durata, costo e strumenti, le voci di log, il documento vero della
  richiesta se è già uscita), non la tendina: la tendina è ancorata al pannello delle approvazioni, ha il pager
  «1 di 4» e le quattro decisioni, e serve a decidere in fretta senza perdere la coda.
- **Una card larga 316 px regge tre fatti, non cinque.** La riga di stato lascia al testo 30–52 px, quindi lì ci sta
  il solo chip; sotto il titolo la riga meta non va a capo. In una testata ci stanno solo i numeri che hanno un
  valore, e non sempre tre: la Consegna ha due numeri.
- **Fatto.** Prima servivano quattro nomi (`output`, «Consegne», `allegato`, `consegne`) e il prodotto rispondeva in
  quattro modi alla domanda «quante cose abbiamo creato»: 31 su 59, 9 su 18, 16 su 20, 318. Con tre numeri la
  testata delle consegne (titoli fino a 32 caratteri) sforava di 77 px, e nove consegne su diciotto non nascono da
  un passo dichiarato: due dei tre numeri sarebbero stati «—».

### [47] Un testo che non ci sta non è un testo: è una promessa non mantenuta

- **Impone.** Nella riga di stato delle card la pillola porta **lo stato e basta** (In pausa · In corso · Errore ·
  In coda · Da approvare · Libero · In ritardo · Concluso · Da iniziare). Il dettaglio sta dove c'è posto per
  leggerlo: il passo nella pagina Esecuzione e nei Costi, il motivo dell'errore nella pagina Esecuzione, l'ora nella
  riga sotto il titolo. Una riga d'elenco che finisce nei puntini in una colonna stretta è disegno (la sua pagina la
  apre per intero); un titolo di card tagliato è un difetto, e le prove distinguono i due casi.
- **Dove.** Card esecuzione (al lavoro, in errore, in coda), card obiettivo, card «l'ultima volta», card della
  richiesta.
- **Fatto.** La riga di stato lascia al testo 35,4 px su 172 (padding 22, chip 80,6, due spazi da 10, chevron 14);
  «Passo 2 di 4» ne chiede 70,2 e si leggeva «Pass…» su ogni card. Accorciare non bastava: «2 di 4» (33,1 px)
  sarebbe entrato, ma a quaranta «7 di 10» ne chiede 37,3. La card della richiesta stampava «3 € · 3 passi · 10:12»
  (104 px in 88), con un'ora che la riga sotto il titolo diceva già.

---

## 3. Controlli e frecce

### [25] Un controllo si vede solo se fa quello che promette, con i dati che ci sono già

- **Impone.** Due prove per ogni controllo: *serve* in questa sezione? *si può fare* col modello? Chi le passa
  diventa vero, chi ne fallisce una sparisce; non esistono controlli per figura. In concreto: **«cerca»** resta
  dove la lista può passare le dodici righe in una delle due taglie (da chiuso è il cerchio 46, da aperto una
  pillola `rgb(255 255 255/.07)` con filetto `.18` alta 46: lente 16, campo 15 largo 190, cerchio × 32; filtra a
  ogni tasto). Il cerchio **«filtri»** non esiste (dove ci sono le pillole il filtro è già visibile). **«Scarica»**
  nemmeno (un pulsante che non scarica è una promessa). Una **pillola** resta se filtra un campo che il modello ha
  (stato, dipartimento, tipo, periodo, esito). Il conto «N di M» sta nel contatore della sezione, non nel campo di
  ricerca.
- **Dove.** Le intestazioni di sezione di tutte le pagine della Console. Eccezione dichiarata: gli indicatori
  disegnati come cerchi nell'intaglio delle card e nella cornice, che dicono uno stato e vengono dal riferimento.
- **Fatto.** 263 controlli contati nella Console. Da 22 cerchi «cerca» ne restano 7, da 22 «filtri» nessuno, da 6
  «scarica» nessuno, da 76 pillole inerti ne diventano vere 57.

### [26] La freccia di riga resta dove la riga ha una destinazione, e con lei la sua colonna

- **Impone.** Ogni riga (`.hrow`, `.crow`, `.lrow`) finisce con una colonna da 32 px per la freccia. Se nessuna riga
  della lista ha una destinazione, la colonna cade (classe `nofr`) e il contenuto si riprende i 42 px; se qualcuna
  ce l'ha, la colonna resta e la cella è vuota, perché due righe della stessa lista non possono avere due griglie.
  Vale anche per il gallone `i-chevr` del log. **L'intaglio è il taglio che fa posto ai pulsanti**: una card senza
  pulsanti non ha intaglio. La domanda giusta non è «questa freccia funziona?» ma «questa riga dove porterebbe?»:
  se una risposta c'è, si collega; se non c'è, sparisce.
- **Dove.** Tutte le liste; le card senza azioni (regole di approvazione, esito del colloquio, consegne senza
  destinazione, diario del Riepilogo). Eccezione dichiarata: la card del dipendente in anteprima dentro l'editor
  tiene matita e freccia, perché è il disegno di come verrà la card.
- **Fatto.** 260 frecce senza azione su tutte le pagine e tutte e due le taglie; ne restano 2, dichiarate. 65 liste
  verificate con tutte le righe sulla stessa griglia. La card dell'esito del colloquio ha restituito al sottotitolo
  i 120 px che il titolo teneva liberi per pulsanti inesistenti.

### [29] Un controllo si asserisce visibile, non presente; la colonna riserva la banda su cui la tendina galleggia

- **Impone.** La tendina del titolare è fissa sui 330 px di destra; la colonna dei contenuti finisce dove comincia
  la tendina (**1008 px**) e non dipende dallo stato del cassetto, così la pagina è la stessa aperta e chiusa.
  *Coperto* da un elemento fisso è sempre un difetto; *tagliato* dal proprio contenitore lo è solo se quel
  contenitore non scorre. Le strisce di pillole e le file di card scorrono con una maschera che sfuma e la barra
  nascosta: una maschera non è un modo di nascondere un controllo. Quando lo spazio si stringe, la regola di
  condensazione che il componente ha già si stringe con lui.
- **Dove.** Tutte le pagine della Console; la barra dei passi dell'Esecuzione (pista da 670–760 px: per esteso il
  passo in corso e il primo successivo, i conclusi lasciano il nome oltre i tre, nomi troncati a 140 px).
- **Fatto.** 66 controlli nascevano coperti e altri 40 in una striscia che non scorreva, su dieci pagine per due
  taglie e due stati della tendina; 385 prove non ne avevano preso nessuno perché asserivano la presenza nel DOM e
  il clic. Sette esecuzioni su undici sforavano nella barra dei passi; zero adesso.
- **Per le prove del prodotto.** Ogni controllo cliccabile vuole un'asserzione di visibilità
  (`document.elementFromPoint` sul centro del suo rettangolo, allo scroll in cui la pagina si apre), non solo di
  esistenza.

### [34] L'intestazione sta nella banda riservata anche lei, e i suoi numeri vanno a capo

- **Impone.** L'intestazione della pagina (titolo, pillola «Nuovo…», tre numeri) non esce dai 1008 px; se non ci
  stanno, i numeri vanno a capo. Nascondere un numero è peggio che nascondere un filtro, e tenerne meno di tre
  toglie informazione al titolare.
- **Dove.** L'intestazione di tutte le pagine della Console (alta 124 px).
- **Fatto.** Quattro numeri cliccabili nascevano sotto la tendina aperta; zero su 24 pagine per due taglie.
  L'intestazione è passata da 56 a 124 px e ogni pagina è scesa di 68.

---

## 4. Scala e taglie

### [1] Unità di scala

- **Impone.** Le unità di scala del prodotto sono il **dipartimento** e l'**esecuzione**; il dipendente è la
  foglia. Le pagine si organizzano attorno alle prime due.

### [3] Oltre sedici elementi, vista compatta

- **Impone.** Oltre sedici elementi ogni elenco ha una vista compatta a pillole (tre per riga) e il filtro
  predefinito è il dipartimento. Sopra i sedici dipendenti i dettagli cedono il posto ai numeri.
- **Dove.** Dipendenti (righe compatte e pillole), Costi per dipendente (pillole compatte con la spesa in un chip),
  barra «Oggi in azienda».

### [17] La Console riempie sempre lo schermo — **emendata** da [38]

- **Impone.** La Console è progettata a 1440 px e si scala alla larghezza della finestra, in su sugli schermi grandi
  e in giù su quelli piccoli. Le tendine e le pillole fisse («da approvare», «Riepilogo») restano al bordo destro
  dello schermo e non scorrono con la pagina. Le altezze a `100vh` delle tendine si dividono per il fattore di
  scala.
- **Emendamento.** Il divieto originale («niente `transform`») valeva per due `zoom` annidati, non per un
  `transform: scale()` dentro la cornice: il canvas dei workflow ha il suo zoom interno (vedi [38]).
- **Corollario (da [45]).** Un controllo che sembra scrivere e non scrive è peggio di un controllo assente: è
  questa regola applicata ai numeri.

### [23] Un elemento che sfora la sua casella si scala, non si allarga

- **Impone.** Ciò che deve sforare la propria casella (l'avatar cresce oltre la casella: 128 % con il corpo piatto)
  si scala **dal centro** con la proprietà `scale`, non con larghezza e altezza in percentuale dentro una riga
  automatica di griglia: lì la percentuale in altezza è ciclica, la riga cresce con l'immagine e l'eccedenza cade
  solo in basso.
- **Dove.** Avatar in ogni taglia e in ogni pagina; qualunque elemento che debba sforare.
- **Fatto.** Scarto fra centro del disco e centro della casella fino a 9,5 px sull'avatar grande; dopo la
  correzione, misurati mille avatar: scarto massimo 0.

### [38] `transform` non è `zoom`: il canvas può avere il suo zoom e la sua mini-mappa

- **Impone.** La cornice si scala con `zoom`; un `transform: scale()` dentro di essa compone esattamente, e le
  tendine fisse restano al bordo. Quindi zoom interno (0,6–1,5) e mini-mappa del canvas rientrano, e il secondo
  riferimento torna copiato com'è. 1 px del canvas vale esattamente `zoom` px di schermo: uno spostamento del mouse
  diviso per `zoom` dà lo spostamento nel canvas, esatto a ogni taglia.
- **Fatto.** Nodo di 208 px → 312 a 1,5× e 124,8 a 0,6×, a viewport 1440, 1920 e 1024.

---

## 5. Approvazioni e coda

### [2] Il «adesso» è un luogo

- **Impone.** La barra «Oggi in azienda» sta in alto; la prima riga della home sono le card esecuzione, con «da
  approvare» in testa.
- **Dove.** Home e ogni pagina interna (la barra è nella cornice).

### [6] Il pannello del titolare: due tendine flottanti — **emendata** da [29]

- **Impone.** Due tendine sopra tutto, sul lato destro: **«Da approvare»** (pillola lime con campanella e numero;
  aperta mostra la richiesta corrente e la coda; estesa mostra la richiesta per intero con le azioni, larga 840)
  e **«Riepilogo di oggi»** (pillola bianca con bacchetta: consegne, spesa, obiettivo, diario). Si chiudono verso
  destra. Nella tendina si decide (pager «1 di 4», quattro decisioni) senza perdere la coda [27]; rifiutare chiede
  sempre il motivo [20].
- **Emendamento.** «La home prende tutta la larghezza» non vale più: la colonna dei contenuti è sempre 1008 px,
  con la tendina aperta o chiusa [29].

### [31] Una routine esegue, non decide: vince la regola d'azienda; «Approvata» solo se l'ha approvata il titolare

- **Impone.** Per ogni richiesta una funzione dice quale regola **attiva** la governa (la più stretta prima: sopra
  la soglia si approva sempre, poi le uscite verso i clienti, poi le liste, poi i report), e un'altra individua un
  **contrasto**: una richiesta uscita senza il titolare mentre la sua regola dice «Sempre da approvare». Il dato
  non si corregge di nascosto: la riga porta una pillola rosa che dice contro quale regola. Ogni richiesta è
  governata da una regola e una sola, e la somma dei conti fa il totale. Una regola spenta che resta in pagina è
  decorazione: accesa, la card stampa quante richieste governa. Una richiesta uscita per una regola o una routine
  dice **«Uscita»** (pillola neutra con l'icona dell'invio), non «Approvata»; la pagina della consegna dice «Uscita
  senza la tua firma». **Il lime resta la firma del titolare e non si presta a nient'altro.**
- **Dove.** Richieste (storico, regole di approvazione), tendina, pagina della consegna, telefono.
- **Fatto.** A undici nessun contrasto, a quaranta due (un post e una lista verso clienti veri, decisi da una
  routine); i conti tornano 20 su 20 e 35 su 35. La regola «Spese sopra 50 €» accesa governa **zero** richieste,
  perché la richiesta più cara costa 10 € e la consegna più cara 33,80: la soglia, non lo stato, è la cosa da
  sistemare. Tre richieste uscite senza il titolare dicevano «Approvata» in lime.

---

## 6. Limiti e freni

### [41] Due strade per la stessa autorizzazione portano gli stessi freni, e la pagina dice quale è accesa

- **Impone.** Dove due controlli diversi concedono la stessa cosa, i limiti stanno in un posto solo e valgono per
  tutti e due. La firma anticipata di un workflow si accende dalla pillola (che dichiara tre freni: soglia di
  costo, perimetro, scadenza) e dal permesso sul nodo d'innesco: i tre freni sono una funzione sola, letta da
  entrambe le strade, dalla Console e dal telefono. La pagina **nomina la strada accesa** («Dal permesso», non
  solo «Accesa»).
- **Dove.** Pagina Workflow (nodo del titolare, nodo d'innesco, riga in cima al canvas), telefono.
- **Fatto.** Il permesso sul nodo d'innesco non applicava nessun freno ed era la strada più nascosta; la
  descrizione di «Fai pure» prometteva «esce da solo entro i tre freni» e il codice non li applicava.

### [45] Un limite che nessuno ha scelto non è una promessa, e un limite che cambia per fatti altrui non è un limite

- **Impone.** (a) Il limite che ferma lo pone una persona; una somma calcolata resta solo come **proposta** alla
  prima apertura, e dopo assumere muove la proposta, non il limite. (b) Una sola unità, gli euro, a tutti i livelli;
  la percentuale sopravvive come **gesto** di scrittura: si scrive «60 %», il prodotto la fissa in euro in quel
  momento e stampa da dove viene («60 % di 115 € al giorno»). (c) Un limite facoltativo nasce **vuoto**: finché
  nessuno l'ha posto, la pagina dice la spesa e basta. Il primo posto dove si scrive un numero è una pagina, non
  una penna disegnata.
- **Dove.** Tetto d'azienda, soffitti di dipartimento, budget dei dipendenti; card dei budget (Costi, Dipendente).
- **Fatto.** Il tetto d'azienda era la somma di budget facoltativi che nel generatore valevano 10 ciascuno: «oltre
  il tetto» diceva che era stata superata una somma, non rotta una promessa. Il soffitto di Vendite, percentuale
  di quella somma, passava da 69 a 75 € assumendo in Amministrazione; a schermo diceva 30 € contro 69 nel modello
  (2,3 volte, con verdetti opposti). Le penne sulle card dei budget erano cerchi senza azione.

### [46] Un freno dichiarato e non cablato è un difetto, e cablarlo cambia il prodotto: va disegnato, non aggirato

- **Impone.** Il tetto ferma davvero prima del passo che lo sfonderebbe, e siccome è già consumato prima di
  qualunque passo nuovo, il prodotto può aprirsi fermo: è una schermata diversa, non un dettaglio del modello.
  **Prima di inventare uno stato si guarda se il prodotto ce l'ha già**: chi è fermo non cambia stato (la sua
  esecuzione è aperta) e prende `pausa` con il **motivo** (`pausaPer`), che distingue la mano del titolare dal
  tetto; il chip «In pausa», il punto dell'avatar spento, la frase e il log esistono già.
- **Corollari.** La barra «Oggi in azienda» non prende una quinta casella: la seconda cambia parola («3 al lavoro» →
  «3 in pausa · tetto») tenendo avatar e conto; sul telefono la parola è «in pausa» e basta. Sulla pagina di chi è
  fermo per il tetto **non c'è «Riprendi»**: c'è «Alza il tetto d'azienda», che porta nell'unico posto dove il
  tetto si alza. Lo sblocco è **una** richiesta (tipo `tetto`) e porta il **costo dichiarato del passo che
  sfonderebbe**, non la stima di quanto costa finire la giornata; è un supplemento di oggi che scade, e quante
  volte è servito misura se il tetto è tarato male. La richiesta del tetto non ha costo né passi: ha un importo
  («+N € per oggi») e l'icona dell'euro.
- **Fatto.** Il campo del freno esisteva e nessuna pagina lo leggeva. Cablato, si apre fermo 3 esecuzioni su 3 a
  undici e 12 su 12 a quaranta (confermato dal titolare). La casella che cambia parola costa +32,5 px invece di
  169,4. Un «Riprendi» sarebbero sei clic a undici e venti a quaranta. Una richiesta per esecuzione ferma porterebbe
  la coda da 4 a 10 e da 7 a 27; una sola la porta da 4 a 5 e da 7 a 8, con 21 € a undici e 29 a quaranta (la stima
  di fine giornata direbbe +89 e +566).

---

## 7. Workflow e canvas

### [28] Un workflow è il lavoro dichiarato di un dipartimento, disegnato a nodi; un nodo è un passo — **emendata** in parte

- **Impone.** La parola è **workflow**. Il nodo è un **passo** (modello, strumenti, costo, durata, esito), non un
  dipendente. **L'ultimo nodo è il titolare** e porta il nome della regola di approvazione che ferma lì la
  consegna: il workflow non sostituisce le regole, le fa vedere; il nodo del titolare non porta un avatar in tinta
  [19]. **La delega si dichiara prima di essere accesa e nasce spenta** («firma anticipata», un workflow alla volta;
  i tre freni si disegnano sempre, anche da spenta, con numeri misurati). L'ingresso ai workflow è una **pillola
  nell'intestazione** della prima sezione del Dipartimento: zero sezioni, zero voci nel rail. Il modello non ha un
  orologio: il «tempo reale» che il prodotto promette è lo stato al momento in cui si apre la pagina.
- **Emendamento.** «Niente pan, niente zoom, niente mini-mappa» è superato da [37] e [38]; la serpentina resta
  solo per «l'ultima volta», il grafo si dispone da sinistra a destra [39].
- **Fatto.** Passaggi di mano fra due dipendenti nei dati: zero, in tutte e due le taglie. Passi: 43 a undici, 156 a
  quaranta. Workflow: 6 e 26, da 4 a 11 nodi, fino a 36 elementi sul canvas contro i 17 della figura di
  riferimento. Una settima sezione sarebbe costata ~700 px.

### [32] Il lavoro dichiarato e il lavoro avvenuto sono un oggetto solo visto in due tempi

- **Impone.** Stesso canvas, una tab a pillola sopra, due tempi: **«L'ultima volta»** (misurata, immutabile) e
  **«La prossima volta»** (dichiarata, componibile). Zero pagine nuove, zero parole nuove. I due numeri in cima
  restano dell'ultima volta, sempre; un passo che deve ancora succedere non ha costo né durata e il suo piede dice
  «passo nuovo» o «come l'ultima volta». **Il nodo del titolare non si toglie, non si sposta e non si scavalca**, e
  il divieto sta nel modello, non nel gesto. Le porte della prossima volta sono tutte spente: una porta accesa dice
  che quello strumento è stato usato davvero.
- **Dove.** Pagina Workflow della Console; schermata Workflow del telefono.

### [33] L'altezza di un nodo aperto è un conto, non una scoperta; quello che cresce spinge, non copre

- **Impone.** Etichette e valori dei campi del nodo hanno **altezza fissa** e stanno su una riga sola, così
  l'altezza del nodo aperto si calcola prima di stampare. Nell'«ultima volta» le righe sotto quella del nodo
  aperto scendono di quanto lui cresce.
- **Fatto.** Aprire un nodo ne copriva un altro per intero: 18 096 px², tutti i 208×87 del nodo sotto. Una prova
  confronta il conto con la resa su 792 stati del canvas: nessun nodo coperto, nessuno sotto la barra.

### [36] Il canvas del workflow è un grafo, e il significato sta sul connettore

- **Impone.** Posizioni libere agganciate a 18 px (i punti della griglia), fan-out e fan-in illimitati. I quattro
  significati — `poi`, `se…`, `insieme`, `se si ferma` — stanno **sull'arco**: il nodo non cresce di porte. Il ramo
  d'errore è lo stato `errore` che la pagina Esecuzione mostra già, a cui il canvas dà una strada: una sola fonte,
  due letture. **Il titolare resta un nodo** (sul telefono è l'unica superficie da cui firma) e in testa c'è un
  **nodo d'innesco** con la sua clausola. La convergenza non è obbligatoria: il vincolo è «tutto ciò che esce
  dall'azienda passa dalla firma», un ramo che resta dentro finisce dove vuole. La biforcazione vive solo nella
  «prossima volta»: «l'ultima volta» è e resta una catena.
- **Fatto.** 43 passi a undici e 156 a quaranta: zero condizioni, zero duplicati, zero parallelismi.

### [37] Un canvas che si compone a mano ha bisogno di un «Riordina», o diventa più lento

- **Impone.** La disposizione automatica non si butta: diventa il pulsante «Riordina» che rimette dritto il
  disegno. Con lui: il rilascio del connettore nel vuoto che crea il passo già collegato, il «+» sul connettore,
  selezione multipla, scorciatoie, zoom e mini-mappa.
- **Fatto.** Il trascinamento libero, da solo, sposta sull'utente un lavoro che prima faceva la macchina.

### [39] Le prese stanno sui fianchi, quindi le righe del grafo vanno tutte da sinistra a destra

- **Impone.** Nel grafo le righe vanno da sinistra a destra come le righe di un testo; l'unico ritorno è quello
  che va a capo, una S sola con la maniglia a 150 px. Il passo della disposizione è un multiplo dell'aggancio:
  234×216 (13×18 e 12×18). I due capi di ogni filo si calcolano dalla posizione del nodo all'altezza del nodo
  chiuso (43,5 px): un nodo che si apre non fa saltare i suoi collegamenti. Sul connettore stanno tre cose e
  nessuna sul nodo: l'etichetta del significato («poi» non si stampa), il «+» che infila un passo e la «×» che lo
  toglie, visibile solo al passaggio; il clic sul filo (16 px di presa invisibile) gira fra i quattro significati.
  **L'errore non cambia colore**: il tratteggio fine dice che è una strada d'eccezione, la parola dice quale.
- **Fatto.** Con la serpentina riusata nel grafo: 9 nodi, 8 collegamenti, 4 all'indietro. La colonna regge:
  36×2 + 3×234 + 208 = 982 px dentro i 1008. Il punto più a destra della S è 981 px, il più a sinistra 25.

### [42] Dove il titolare ha disposto qualcosa con le mani, quella disposizione è un dato: nessuna superficie la ricalcola

- **Impone.** Le coordinate dei nodi trascinati dal titolare (agganciate a 18 px, dentro la banda) sono una cosa
  che lui ha detto, non impaginazione. La regola protegge la **mano**, non il **seme**: una funzione semina le
  posizioni quando un grafo nasce e quando si preme «Riordina», un'altra scrive quelle trascinate; cambiare il seme
  non ricalcola niente di nessuno, cambiare quelle del titolare è vietato. Il criterio generale: prima di
  ricalcolare una posizione, una scelta o un ordine su una superficie nuova, guardare se quel valore è generato o
  è stato messo lì da qualcuno; se è stato messo, si trasporta. Cambiando permesso, il canvas non smette di dire
  che cosa succede a un ramo («esce senza la tua firma», «resta in azienda»), e la riga in cima lo conta.
- **Dove.** Pagina Workflow; il telefono mostra il canvas così com'è.
- **Fatto.** Il telefono paga 632 px di scorrimento laterale a scala 1 invece di guadagnarseli con una posa sua.
  «Esce senza la tua firma» misura 148 px, dentro i 208 del nodo.

### [44] Quello che appartiene a un oggetto nascosto non si disegna sopra ciò che lo nasconde

- **Impone.** Se un oggetto è coperto (il nodo aperto ha `z-index:3` e sfondo opaco), quello che è suo — porte,
  prese, etichette, tag — non compare finché resta coperto, e torna appena si scopre. Non velare, non spegnere:
  **non disegnare**. Quando un'informazione della spina dorsale può sparire dal disegno, deve restare detta fuori
  dal disegno (il conto in cima continua a dire «1 ramo resta in azienda»). **Corollario delle parole**: quando due
  parti del prodotto contano la stessa cosa, la contano nello stesso modo (l'innesco non è un passo; un gesto sul
  disegno non cambia mai i nomi). **Corollario dei conti**: un conto che decide una posizione misura quello che si
  disegna davvero.
- **Fatto.** Le prese del nodo coperto (`z-index:5`) erano disegnate sull'editor e rispondevano al clic: da lì
  nasceva un collegamento da un nodo che non si vede. «Riordina» rinominava ogni passo («Passo 1» → «Passo 2»,
  a cascata su sette). Il conto dell'altezza contava la riga delle azioni anche in sola lettura (47,6 px di
  scarto sul telefono) e il freno che cerca un posto libero misurava il nodo chiuso mentre i gesti lo lasciano
  aperto. La mini-mappa finiva sopra il nodo del titolare (180×22 px): si riserva lo spazio in fondo, la mappa non
  si sposta.

---

## 8. Avatar

### [19] Il colore distingue i dipendenti

- **Impone.** Ogni dipendente AI ha una **tinta fra otto** (palette vivace: indaco `#6C6AFF`, corallo `#FF6A55`,
  ambra `#FFB52E`, verdeacqua `#2BD9B5`, prugna `#C66CFF`, petrolio `#3AB8FF`, bordeaux `#FF5BA6`, grigio
  `#9E9E9E`), assegnata alla creazione come la meno usata in azienda e cambiabile nell'editor del dipendente (riga
  «Colore»). L'avatar è un **disco piatto** in quella tinta, che riempie la casella senza volume, luci né orlo, con
  **due occhi grandi**: sclera sempre bianca con contorno sottile, pupilla sempre nera. È l'unica eccezione al solo
  accento e non usa il lime, il giallo né il rosa, che restano ai segnali. **Gli occhi non portano lo stato**: lo
  stato è un **punto sul bordo della casella** in basso a destra (raggio 15 su 125, bordo nero di 4; lime al
  lavoro, giallo `#FCDC64` da approvare, rosa in errore; niente da libero, da pianificato e in pausa) e nelle
  **pile** il punto non c'è: lo dice il **gesto** del corpo. Restano le forme: X in errore, palpebre chiuse da
  libero, occhi più grandi da approvare, sguardo che scandisce al lavoro. Le persone (titolare) tengono le
  iniziali su disco bianco. L'avatar è `aria-hidden`: sta sempre accanto all'etichetta e al chip di stato.
- **Dove.** Ogni avatar del prodotto: card, righe, testate, pile, chat, telefono, editor.

### [18] Nessuna ripetizione dell'avatar dentro una card di un solo dipendente

- **Impone.** L'avatar sta nella striscia in alto della card; il selettore di stato porta un chip con una **parola
  di stato** [47] e accanto al chip non c'è nient'altro. La pila di avatar resta dove i dipendenti sono più d'uno
  (obiettivi, dipartimenti), con il badge «+N» **dopo** la pila, mai sotto.
- **Fatto.** L'ora, che era il chip della card in coda, stava già nella riga sotto il titolo: lo stesso numero due
  volte sulla stessa card.

### [11] Avatar generati, deterministici dal seme — **emendata** da [19]

- **Vale ancora.** L'avatar è generato, deterministico dal seme (il ruolo, o un seme scelto): stesso seme, stesso
  avatar in ogni vista e in ogni sessione. Il titolare tiene le iniziali. Due famiglie con la stessa API: «orbe»
  (scelta) e «kit» (le silhouette del kit, tenute per il confronto).
- **Superato.** L'orbe «perla nera con occhi che cambiano colore per stato» è sostituito dal disco in tinta con
  sclera bianca e pupilla nera; lo stato non passa più dagli occhi [19].

### [14] L'avatar è un avatar, non un'icona — **emendata** da [19]

- **Vale ancora.** Niente disco né anello bianco dietro il corpo; il corpo è un cerchio. I moti sono continui: un
  solo `requestAnimationFrame` per pagina muove gli avatar visibili con funzioni del tempo (respiro,
  galleggiamento, sguardo, battito delle palpebre), un solo moto quieto per stato; con `prefers-reduced-motion`
  posa di riposo.
- **Superato.** La pelle «perla» (nero lucido con riflessi) è sostituita dal disco piatto in tinta; «niente squash
  e stretch» non vale nelle pile, dove il gesto del corpo dice lo stato [19]; la sovrapposizione nelle pile è di
  10 px con l'anello del colore del fondo.

---

## 9. Telefono

### [20] Le approvazioni da mobile

- **Impone.** Il titolare approva dal telefono con gli **stessi componenti e lo stesso modello** della Console:
  quello che si decide sul telefono vale nella Console e viceversa. La navigazione in basso porta i quattro cerchi
  del rail e la **campanella lime con il numero da approvare** (badge nero). **Da approvare** è chiara, con la
  richiesta corrente come card lime e la coda a righe; **Richiesta** è la tendina estesa in colonna su nero, con la
  barra fissa Approva / Chiedi modifiche / Rifiuta. Approvare è al volo; **rifiutare chiede sempre il motivo**
  (anche dalla card: la X apre la richiesta con il campo pronto). Sotto la navigazione il contenuto che scorre è
  sfocato e appena scurito (112 px, sfocatura 14, nero .16) con il bordo sfumato: un pulsante lime non cambia
  colore per distinguersi dalle card lime, è il fondo sotto la barra a farsi da parte. Terza schermata il
  **Riepilogo di oggi**; a coda finita la prima schermata **diventa il riepilogo** (card «Niente da approvare» sul
  fondo del Riepilogo): lo stato vuoto non è un riquadro tratteggiato. Le revisioni di performance entrano nella
  coda con titoli corti (chip per il tipo, titolo per il cambiamento) ed evidenze in colonna. In cima alla prima
  schermata il **quadro del giorno** (griglia due per due, 118 px) si paga togliendo la riga dei due numeri grandi;
  il titolo prende il conto accanto (26/32 con il numero a 36, non a 30). Le quattro tab sono tutte vive: la
  seconda apre Dipartimenti e il dipartimento aperto; i titoli si stringono a 22 px oltre i dodici caratteri.
- **Fatto.** La prova a quaranta regge: 7 in coda, titoli troncati con i puntini, badge a due cifre.

### [43] Lo stesso oggetto su due schermi è lo stesso componente con i gesti spenti, non un secondo disegno

- **Impone.** Quando una superficie stretta deve mostrare quello che una larga già mostra, la prima strada è **lo
  stesso componente a un'altra scala**. Il canvas dei workflow è un componente condiviso (codice e CSS); il telefono
  lo chiama con l'interruttore `soloLettura` e la larghezza che ha. Si entra a «tutto dentro» (tutto il grafo nella
  larghezza che c'è) e il tocco su un nodo porta a scala 1 centrato su quello, dove il testo torna a 14 px e il
  nodo apre i suoi campi; due gesti (trascina la vista in orizzontale, pinch; il verticale resta alla pagina). Se
  a scala d'insieme il testo scende sotto il leggibile non si rimpicciolisce la scrittura che conta: si dà un
  secondo ingrandimento e si tirano **fuori dal disegno** le etichette del **contratto** («esce senza la tua
  firma», «resta in azienda»), non quelle della topologia. Sola lettura vuol dire meno gesti, non una resa più
  povera: il nodo che si apre resta; spariscono prese, «+», «×», trascinamento e «Riordina» (cinque, contati da
  una prova).
- **Fatto.** La versione a colonna di card dava «un'anteprima del workflow sbagliata»: fondo chiaro contro notte,
  card da 348 px contro nodo da 208, colonna dritta contro serpentina, chip contro porte, barretta contro curva
  luminosa. Sul telefono l'ingresso è 278,4 / 910 = 0,306; a quella scala il testo misura 4,3 px.

---

## 10. Numeri e onestà di quello che si stampa

### [24] La barra «Oggi in azienda» è il quadro del giorno, non una linea del tempo

- **Impone.** Dentro la pista lime della barra del riferimento stanno **caselle contate e nominate**, lette dal
  modello vero: *N approvate*, *N al lavoro* (bianca piena, con la pila di chi lavora), *N ferma · nome* (rosa
  `#F9A3A3`), *N dopo · dalle HH:MM*; ognuna porta dove si agisce (le richieste, l'esecuzione ferma, l'Agenda).
  Le caselle traslucide hanno il filetto `inset 0 0 0 1px rgb(0 0 0/.1)`: un oggetto si stacca dal suo fondo anche
  quando il significato sta nelle parole. Il *quando* lo dice la pagina Agenda, che ha la pista con le ore
  proporzionali. Scostamento dal riferimento, dichiarato: cade l'asse del tempo (orari fra i blocchi, separatori,
  marcatore dell'ora), resta tutta la forma. **Un elemento fisso non ripete quello che un altro elemento fisso dice
  già**: la barra dice che cosa fa l'azienda, la linguetta lime «N da approvare» dice che cosa deve fare il
  titolare. **Nessun badge dell'intestazione ripete il numero che gli sta accanto**; il terzo numero della home
  porta la forma della card Spesa dei Costi: «124 € su 115 € al giorno · oltre il limite» (427 su 400 a quaranta).
  Un elemento in un contenitore stretto si stringe da solo invece di uscire (la barra dei passi; le griglie
  senza colonne dichiarate si vincolano con `minmax(0,1fr)`).
- **Dove.** La barra nella cornice di ogni pagina; le intestazioni di tutte le pagine; la barra dei passi.
- **Fatto.** La barra a linea del tempo cambiava scala di otto volte fra un blocco e l'altro (3,4 px/min, 13,4,
  0,004), il marcatore dell'ora si spostava di 12 px a quaranta, gli stati distavano 1,1–1,2 : 1 di contrasto, e
  delle 8 esecuzioni della giornata ne mostrava 4, tacendo le due su cui il titolare deve agire. Lo stesso numero
  compariva tre volte sulla stessa schermata. Dei dieci badge delle intestazioni, sei ripetevano il numero accanto
  e quattro mentivano (un «↑1» scritto a mano, un `Math.min(2, att)` due volte, un «↓12 %» scritto a mano che
  dichiarava un calo su un numero che i Costi marcano «oltre»); i quattordici badge, telefono compreso, sono stati
  tolti e i confronti onesti (30 giorni del Dipendente, Costi, Agenda) restano. Il badge è fuori dal flusso
  (`position:absolute`): cambiargli il testo costa zero px. La barra dei passi con sette passi cresceva a 2180 px
  dentro un contenitore da 1312.

### [30] Chi ha deciso al posto del titolare è un riferimento che deve risolvere, mai una stringa libera

- **Impone.** Il campo è `deciso: { tipo: 'regola' | 'routine', id }`; la riga stampa la parola che corrisponde a
  quello che il riferimento apre, e se non risolve non stampa un nome inventato: dice che non si sa quale.
  **La regola permette, la routine agisce**: sono due autori diversi. Non si promette una porta che non c'è: la
  riga porta la freccia solo se la pagina esiste (la pagina delle routine ora esiste, vedi [35]).
- **Dove.** Storico delle Richieste, pagina della consegna, telefono.
- **Fatto.** Tre consegne uscite senza la firma del titolare, e due su tre firmate da una regola («Follow-up») che
  nel modello non esisteva. Un'invariante nelle prove lo prende a undici e a quaranta.

### [40] Un numero previsto non si stampa dove è scritto «misurato»

- **Impone.** Costo e minuti di un workflow sommano solo quello che è avvenuto (fatto, in corso, rotto); il nodo di
  un passo da fare dice **«non ancora»** con la stima marcata dal `≈`, e la previsione vive in un campo suo
  (`previsto`), separata. Corollario generale: **uno zero non si stampa mai** su una cosa che non è successa —
  sul canvas come sul telefono.
- **Fatto.** Sul primo workflow 33,20 € su 71,20 erano stimati (47 %) e 83 minuti su 121; su tutti e sei,
  83,80 € su 168: stampati sotto la parola «misurati».

---

## 11. Cornice e pagine

### [7] Logo e titolo

- **Impone.** Il logo del prodotto è l'acronimo **DGT** in alto a sinistra; il titolo dell'azienda è in maiuscolo
  con la O normale (nel riferimento la O era il marchio).

### [8] Pagina Richieste

- **Impone.** Nella stessa cornice, con pieno controllo: filtri per stato, tipo, periodo, dipartimento, cliente e
  dipendente; «Da approvare» con ordinamento e «Approva tutte»; storico per giorno a righe compatte; le regole di
  approvazione.

### [9] Pagina Dipartimento

- **Impone.** Nella stessa cornice, **sei sezioni**: Oggi in ‹dipartimento› (esecuzioni: al lavoro, errore,
  pianificate) · Consegne di oggi · Dipendenti (con la card «Aggiungi») · Obiettivi (card con barra di avanzamento
  a pillola; lime = in ritardo) · Da approvare dal dipartimento · Spesa del mese per cliente. Ogni pagina interna
  ripete la cornice: barra in alto, titolo con numeri, rail, sezioni con intestazione e pillole, tendine del
  titolare.

### [12] Creazione e modifica del dipendente in una tendina

- **Impone.** Una tendina «Dipendente» (anteprima della card, ruolo, nome facoltativo, dipartimento, avatar a
  scelta fra sei semi, colore fra le otto tinte), aperta dalla matita nell'intaglio della card, dalla riga compatta
  e dalla card «Aggiungi». Niente finestre generiche. Misure: 330 px, fondo `#F4F4F4`, campi a pillola bianca 48,
  dipartimento a pillole 36 (la scelta è nera), sei cerchi 36 per l'avatar, azioni «Crea dipendente» / «Salva»
  lime 44 e «Annulla».

### [13] Pagina del Dipendente

- **Impone.** Nella stessa cornice, aperta dalla freccia nell'intaglio della card e della riga compatta, con **un
  solo ordine per i due pubblici**: testata (avatar 96, etichetta, azioni, quattro numeri a 30 giorni confrontati
  con i 30 precedenti) e revisione di performance per il titolare; oggi, rendimento, soul prompt con versioni e
  confronto, modello e criterio di scelta automatica, strumenti e connessioni, budget e permessi, colloquio (eval)
  per l'operatore. **La revisione di performance è una richiesta al titolare come le altre** (tipo «revisione», nella
  coda e in Richieste): dossier con evidenze, stime e rischi; quattro decisioni (prova, applica, chiedi modifiche,
  rifiuta con motivo obbligatorio); cronologia con l'effetto misurato. Le richieste decise dal titolare sono la
  fonte di «corretti da un umano» e «proposte respinte». **I modelli sono livelli neutri di DGT** (Rapido,
  Standard, Esperto), non marchi di terzi.

### [15] Pagina dell'Esecuzione

- **Impone.** Nella stessa cornice, aperta dall'«occhio» e dalla freccia delle card esecuzione: titolo =
  titolo dell'esecuzione; tre numeri (passi fatti su totale, spesi con il badge «oltre», tempo); testata con
  avatar 68, chip (stato, passo n di N, modello, cliente, obiettivo), la frase «Adesso … Prossimo …», le azioni per
  stato (pausa, interrompi, scrivi; riprova; avvia ora; apri la richiesta) e la **barra dei passi**, che è la barra
  agenda del sistema (passi fatti = eventi bianchi, passo in corso = segmento «adesso», da fare = eventi traslucidi
  con la stima, errore = rosa); poi Passi come righe, Log con filtri e la barra di scrittura del titolare, Output
  come card con le consegne precedenti della serie, Costo per modello e per strumento. Le azioni cambiano il
  modello e si vedono subito nella home e nel dipartimento.

### [21] Pagina Costi

- **Impone.** Titolo COSTI; tre numeri (spesi oggi con il badge «oltre» se sopra la somma dei limiti del giorno,
  in 30 giorni con il confronto con i 30 precedenti, «restano di N €» del budget del mese; niente pillola
  «Nuovo…»). Cinque sezioni — per dipartimento, dipendente, cliente, modello, strumento — con le **pillole del
  periodo in ogni sezione**, indipendenti e solo per i periodi che i dati reggono (oggi dalle esecuzioni, 30 giorni
  dal dossier, da inizio anno dalla creazione; per modello senza l'anno, per strumento solo oggi). **Un solo
  aggregatore** alimenta la pagina e la sezione «Spesa del mese» del Dipartimento, e le viste per dipartimento,
  dipendente, cliente e modello sommano allo stesso totale (per cliente la spesa del dipendente si ripartisce in
  proporzione alle sue richieste). Nessun componente nuovo. Ci si arriva dal sesto cerchio del rail (euro), dal
  numero «spesi oggi» (home, Dipartimento, Dipendente) e dalle pillole «Tutti i costi dell'azienda».

### [22] Pagine Agenda e Chat

- **Impone.** L'**Agenda** parte dalla barra «Oggi in azienda»: la barra agenda del riferimento allargata alla
  giornata (blocchi su corsie che non si sovrappongono, il segno di «adesso», la pista chiara perché il lime
  resti l'attenzione del titolare), le card degli eventi con le pillole che filtrano davvero, le scadenze con
  l'obiettivo del mese e i sette giorni a righe. La **Chat** parte dalla barra di scrittura dell'Esecuzione: un
  filo per dipendente (le note del titolare a destra bianche, le risposte del dipendente a sinistra scure, la riga
  di sistema al centro), con le consegne che aspettano dentro il filo e le stesse decisioni di sempre. **Una nota
  scritta nell'Esecuzione entra nel log e nel filo: è una sola conversazione.** Un solo aggregatore (giornata,
  settimana, scadenze, filo, scrivi) alimenta Console e telefono. Ci si arriva dal quarto e dal quinto cerchio del
  rail, dal cerchio della barra «Oggi in azienda», dalla pillola «Sposta» delle esecuzioni pianificate, dai cerchi
  «commenta» delle card e delle tendine e dalla pillola «Scrivi a …» dell'Esecuzione.

### [35] Una pagina che serve a tre oggetti non merita un cerchio nel rail

- **Impone.** Le routine sono tre e hanno la loro pagina (innesco, clausola, rodaggio, i passi dichiarati e che
  cosa hanno deciso). Il rail resta a **sei** cerchi; ci si arriva da dove il nome già compariva: la colonna «chi
  ha deciso» dello storico delle Richieste (che diventa una freccia vera, per [26]) e una pillola
  nell'intestazione del Dipartimento accanto a quella dei workflow. La pagina dice la differenza che il modello
  nasconde: i passi di una routine sono **nomi**, senza modello, strumenti, costo né durata; dove un workflow non
  esiste, la pagina dice perché (il dipendente è pianificato, zero passi conclusi) invece di lasciare un buco.
