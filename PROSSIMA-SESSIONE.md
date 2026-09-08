# Prossima sessione — passaggio di consegne

## Versione 23 — le decisioni sono prese, il disegno è da fare (2026-09-08, fine sessione)

**Questa sessione si è fermata dopo le decisioni, per scelta dell'utente**: il contesto era lungo, e il lavoro di
disegno comincia la prossima volta. Qui c'è tutto quello che serve per non rifare niente.

### Le tre decisioni dell'utente

| | Domanda | Risposta |
|---|---|---|
| **64** | Il gesto per comporre (era la domanda 1 del consiglio della versione 22) | **A · il nodo aperto è l'editor** — ma con una ragione che cambia tutto: *«voglio letteralmente la complessità di n8n per creare flussi, con una UX che aiuta e semplifica. Poter spostare liberamente ogni card nel canvas e connettere e biforcare più connettori anche a un singolo task»* |
| **65** | Che cosa dicono due connettori che escono dallo stesso nodo | **Tutte e tre come n8n**: condizione, parallelo ed errore |
| **66** | Dove va la firma quando la catena si biforca | Il titolare **resta un nodo**, e in più — **idea dell'utente** — l'autorizzazione va **in testa** al flusso, così non c'è l'obbligo di far convergere i rami |
| **67** | Gli acceleratori da portare da n8n | **Tutti e quattro**: «Riordina», il rilascio del connettore nel vuoto, il «+» sul connettore, e selezione multipla + scorciatoie + zoom e mini-mappa |

### La risposta al dubbio dell'utente sulla convergenza, verificata nel codice

Il timore era: *«obbligare tutti i nodi a convergere alla fine mi dà l'idea di limitare la creazione dei flussi»*.
**Non limita, e la sua idea aveva già un nome nel prodotto.**

- La convergenza è **permessa, non obbligata**: nessuna validazione la impone. Il vincolo non è «tutto finisce sul
  nodo firma», è «tutto ciò che **esce dall'azienda** passa dalla firma». Un ramo che resta dentro (un controllo,
  un test) finisce dove vuole.
- L'idea dell'autorizzazione in testa **esiste già**: è la `clausola` della routine (`avvio` = *chiede prima di
  partire*, `uscita` = *chiede prima di consegnare*, `libera` = *fai pure*) e la **firma anticipata** del workflow
  con i suoi tre freni, decise nella versione 20 e oggi spente. L'utente ha chiesto di promuoverle da interruttore
  a **forma del canvas** — ed è esattamente il *trigger node* che n8n mette in testa a ogni flusso.
- **Misurato**: con la clausola `uscita` un ramo staccato **non esce** (e la pagina lo dice); con `avvio` escono
  tutti e la convergenza non serve. L'idea dell'utente fa quello che sperava.

### Che cosa è già costruito (modello, nessun disegno)

In `dati.js`, il ramo è passato da **catena** a **grafo**:
- `ramoDi(w)` → `{ nodi, archi, seq }`; i nodi hanno `id`, `x`, `y` (posizione **libera**, che nasce dalla
  serpentina così il ramo si apre come stava prima); gli archi sono `{ id, da, a, tipo, se }`;
- `ramoPosiziona` (aggancio a **18 px**, cioè i punti che il canvas già disegna — n8n usa 16 ma la sua griglia è
  invisibile; qui i nodi cadono sui punti che si vedono), `ramoCollega`, `ramoScollega`, `ramoAggiungi`,
  `ramoTogli` (ricuce la catena), `ramoCampo`, `ramoArco`, `ramoGradi`, `ramoNumera` (il numero del passo diventa
  la **distanza dall'inizio**: su una catena dà 1, 2, 3… come prima; su una biforcazione i due rami portano lo
  stesso numero, ed è giusto — sono lo stesso momento del lavoro), `ramoTerminali`, `ramoEsce`;
- **fan-out e fan-in illimitati**, come n8n. Vietati soltanto: l'arco verso se stessi, l'arco doppio, e l'arco **in
  uscita dal titolare** (dopo la firma non c'è altro lavoro). Il titolare non si toglie;
- il **nodo d'innesco** in testa (`id: 'inn'`) con la sua `clausola`;
- i **quattro tipi di arco** (`RAMO_TIPI`): `poi`, `se…`, `insieme`, `se si ferma`. **L'errore non è una verità
  nuova**: è lo stato `errore` che la pagina Esecuzione mostra già, a cui qui si dà una strada — una sola fonte,
  due letture. Era la ragione per cui il consiglio scartava il ramo d'errore, e così non si corre il rischio;
- `r.ciclo` dice se il grafo si chiude ad anello (n8n li ammette; qui almeno si sanno).

Nel canvas: `wpos` legge `x`/`y` dal nodo quando c'è (l'ultima volta resta la serpentina calcolata — è avvenuta,
non si dispone), e l'altezza del canvas segue il nodo più in basso.

### Che cosa manca, ed è tutto disegno

1. **Il disegno del grafo**: archi fra posizioni libere (non più serpentina), le porte, l'etichetta sull'arco, il
   nodo d'innesco con la sua forma (n8n dà al trigger un angolo arrotondato da 36 px), il nodo terminale che non
   esce dall'azienda.
2. **I gesti**: trascinare (la matematica è misurata: 1 px del canvas = `zoom` px di schermo, esatto, a ogni
   viewport), collegare tirando da una porta, il rilascio nel vuoto che crea il passo già collegato.
3. **I quattro acceleratori** scelti, e il primo è il più importante per una ragione misurata dalla revisione
   incrociata: **il trascinamento libero senza un «Riordina» rende il canvas più lento, non più veloce.**
4. **Lo zoom interno e la mini-mappa.** Il secondo riferimento **ce li ha**; la regola 17 li aveva tolti perché
   «due zoom annidati litigano». **Misurato: vale per `zoom`, non per `transform`** — `transform: scale()` dentro
   la cornice compone esattamente (nodo 208 → 312 a 1,5×, → 124,8 a 0,6×, a 1440, 1920 e 1024) e la tendina
   `position:fixed` resta al bordo dello schermo. La regola 17 va emendata di conseguenza.
5. **Il telefono**: la schermata 10 mostra il workflow **in colonna**, e una colonna rappresenta una catena, non un
   grafo. **Misurato**: la colonna è larga **348 px** e una card **318** — ce ne sta **una**, quindi due rami
   affiancati lì non esistono. Va deciso che cosa mostra: la strada percorsa, o un blocco «2 passi insieme».

### Che cosa ha detto il consiglio, e che cosa la revisione incrociata gli ha demolito

Cinque pareri, poi revisione incrociata. **Domanda «che cos'è una biforcazione»: 3 condizione, 2 parallelo.**
**Domanda «la firma»: 3 il confine, 1 una sola, 1 una per ramo.** L'utente ha poi scelto altro su entrambe, e la
revisione spiega perché aveva ragione a farlo:

- **il telefono ha ribaltato il voto sulla firma.** Tre consiglieri su cinque volevano trasformare il titolare in
  una **linea di confine** in fondo al canvas. Un revisore ha aperto `mobile.js`: sulla schermata 10 il nodo del
  titolare è la riga «aspetta te» col chip lime, ed è **l'unica superficie da cui il titolare firma dal telefono**.
  Il confine la cancella, e **nessuno dei tre se n'era accorto**;
- **«il parallelo è gratis, due nodi scollegati sono già paralleli»** (l'argomento migliore del consiglio) è
  **falso**: due nodi scollegati non hanno antenato, sono **orfani**, non simultanei;
- **«due biforcazioni annidate riempiono la banda»** è **falso**: ne danno tre, e due rami affiancati lasciano
  **520 px liberi**. Quindi la biforcazione **non** obbliga allo zoom (che serve per altre ragioni);
- **«il parallelo ha già un dato dietro»** è **falso**: i parallelismi misurati sono **zero**, esattamente come le
  condizioni — 43 passi a undici, 156 a quaranta, **zero** condizioni, **zero** duplicati, **zero** parallelismi.
  La biforcazione non svela un dato che c'è: **aggiunge una capacità che non c'è**, ed è la stessa lezione della
  versione 20 (dove «il nodo è un dipendente» cadde contando zero passaggi di mano);
- **quattro consiglieri su cinque hanno proposto la stessa terza strada con quattro nomi diversi** (etichetta,
  attributo, riga di testo, domanda **sul connettore**), e nessuno l'aveva scelta come risposta principale perché
  la domanda chiedeva *che tipo* di biforcazione mentre quella risponde a *dove vive*. È la forma adottata;
- **il buco più grosso, e nessuno dei cinque l'ha visto: 5 su 5 hanno risposto alla prima metà della frase
  dell'utente** (che cos'è una biforcazione) **e 0 su 5 alla seconda** (una UX che aiuta e semplifica, più veloce
  ed efficace). Da lì è nata la terza domanda all'utente, quella sugli acceleratori.

**Punti ciechi rimasti aperti, da decidere prima o durante il disegno:**
- che aspetto ha, nella tab **«l'ultima volta»** che è misurata, un **ramo mai percorso**: non ha esecuzione, non
  ha euro, non ha dipendente. Se lo si disegna spento si inventa un terzo stato che il riferimento non ha; se lo si
  nasconde, le due tab mostrano grafi di forma diversa e la pillola smette di essere due tempi della stessa cosa;
- **la tendina delle approvazioni**: un flusso biforcato produce una voce o *n*? Nessuno dei cinque l'ha guardata;
- un ramo che gira e **non arriva alla firma** ha speso euro che non risalgono a nessuna uscita: il titolare
  **smette di vedere lavoro pagato e scartato**;
- **la condizione stessa va approvata?** Se la si scrive a mano, il flusso può prendere una strada che il titolare
  non ha mai visto;
- i **cicli**: trascinamento libero e fan-in li rendono disegnabili, e un anello non ha ultimo nodo. Il modello li
  rileva (`r.ciclo`), il disegno non li dice ancora;
- **le parole**: ne girano sei per il connettore e quattro per la firma-confine. Vanno fissate quelle che il
  prodotto stampa. «Biforcazione» e «condizione» sono parole da progettista: sull'interfaccia il consiglio
  suggerisce **«insieme»** e **«se…»**.

### Che cosa fa n8n, letto nel suo repository (non a memoria)

Serve per non rileggerlo. Sorgente: `n8n-io/n8n`, canvas in
`packages/frontend/editor-ui/src/features/workflows/canvas/`, modello in `packages/workflow/src/interfaces.ts`.

- **Modello**: `connections[nomeNodoSorgente][tipoConnessione][indiceUscita] = [{node, type, index}]` — tre livelli,
  perché n8n ha **13 tipi di connessione** (`main` più 12 di AI) e porte multiple per lato. Fan-out **illimitato**,
  fan-in pure, **cicli ammessi** (rilevati con Tarjan). `position: [x, y]` interi, anche negativi.
- **Le biforcazioni sono tre nodi diversi**: `IF` ha **2 uscite** (`true`/`false`); `Switch` ne ha *n* (4 di
  default, una per regola, più `Fallback`); `Merge` ha fino a **10 entrate**. La porta d'errore è **in più** e
  compare solo con `onError: 'continueErrorOutput'`.
- **Canvas**: griglia e snap a **16 px**; `connection-radius` **60**; selezione multipla e trascinamento di gruppo;
  **rilasciando il connettore nel vuoto si apre il pannello dei nodi già collegato** (la loro idea di UX migliore);
  «+» sul connettore che infila un nodo in mezzo, spostando i nodi a valle **solo se non c'è spazio**; **«Tidy up»**
  con **dagre** (`shift+alt+T`, `rankdir LR`, `nodesep 96`, `ranksep 128`); zoom da **0 a 4**; **mini-mappa**
  200×120 che compare e si nasconde dopo **1 s**; **una quarantina di scorciatoie**.
- Nessuna validazione «nodo scollegato»: un ramo non cablato perde il lavoro in silenzio.


Stato al 2026-09-08, fine della sessione della **versione 22**: le **sei conferme** prese come raccomandato, il
**ramo** (un canvas, due tempi) scelto dall'utente, e i **tre gesti del comporre** costruiti tutti e tre perché
l'utente li vedesse invece di sceglierli sulla carta.

## Versione 22 (2026-09-08, questa sessione)

### Che cosa è aperto, e viene prima di tutto

**La domanda 1 del consiglio aspetta la risposta dell'utente.** Alla domanda «con che gesto si compone senza
trascinare» ha risposto **«fammi delle anteprime delle 3 opzioni così scelgo meglio»**: le tre strade sono
costruite nella pagina vera (`?pagina=workflow&workflow=w1&ramo=1&gesto=a|b|c`) e messe a confronto con i numeri
misurati nella pagina della scelta — artefatto
<https://claude.ai/code/artifact/523d0e19-8bc8-4721-8027-8734086fdc5b>. **Quando la scelta è fatta, le due strade
non scelte si tolgono dal codice** (`gesto` in `direzione-a.js`, il CSS `.azioni-n` / `.azioni-b` / `.wplus`, e il
parametro `?gesto=` nella pagina e in `scatta.js`).

| | A · nel nodo aperto | B · nella barra | C · sul connettore |
|---|---|---|---|
| Altezza del nodo aperto | 311 px | 264 px | non serve aprirlo |
| …contro il nodo aperto di oggi | **328**: meno di adesso | **328**: meno di adesso | — |
| Distanza dal nodo che modifica | **149 px** | **497 px** | zero: nasce lì |
| Bersaglio più piccolo | 28 × 28 px | 2 361 px² | 38 × 40 px |
| Controlli sul canvas | 4, col nodo aperto | 4, sempre visibili | **7** su 8 nodi (n − 1) |
| Pixel in più sulla pagina | nessuno | nessuno | nessuno |

**Il verdetto del consiglio era A**, e vale la pena sapere perché prima di guardare: il consiglio si era spaccato
2–2–1, e la revisione incrociata ha sciolto il pareggio smontando due fatti falsi — «rt1 e rt2 hanno zero nodi»
(ne hanno **3**: due passi dichiarati più il titolare) che era l'argomento decisivo di B, e «il bersaglio del “+” è
tutto l'arco, 242 px» che era la difesa di C: misurato, **l'arco libero è 34 px** in orizzontale.

### Che cosa ha deciso l'utente in questa sessione

| Domanda | Risposta |
|---|---|
| Su che cosa si compone (domanda 2) | **Il ramo**: un canvas, due tempi — «L'ultima volta» misurata, «La prossima volta» dichiarata e componibile |
| Con che gesto (domanda 1) | **Aperta**: ha chiesto le anteprime, che adesso ci sono |
| Le sei conferme | Prese come raccomandato, senza richiederle (era nel prompt) |

### 1. La misura che il prompt chiedeva in apertura

Quanto costa un nodo in più sulla serpentina a quattro colonne, misurato aggiungendone davvero uno, due, tre e
quattro su tutti i workflow, a undici e a quaranta — 160 misure:

- **0 px oppure 210, mai altro**: 210 solo quando il nodo apre una riga nuova;
- oggi **4 workflow su 6** a undici e **20 su 26** a quaranta stanno sul salto (hanno 4 o 8 nodi);
- **quattro nodi in più costano 210 px in tutto**, cioè una riga: **52,5 px a nodo**;
- la **larghezza non cambia mai** (1008 px, zero scorrimenti laterali in 160 misure), e non c'è un soffitto: a 39
  nodi il canvas è alto 2 198 px e cresce di 210 ogni quattro;
- **inserire a metà catena** fa scorrere di **una casella** tutti i nodi che vengono dopo (8 su 8 se in testa, solo
  il titolare se in coda): è il prezzo vero di un inserimento, e nessuno dei cinque consiglieri l'aveva citato.

### 2. Le sei conferme, costruite

| | Cosa | Fatto |
|---|---|---|
| a | Le due regole fantasma | **Lasciate come sono**. Nessun codice |
| b | «Approvata» falso su `r17` | Le tre uscite senza il titolare dicono **«Uscita»**, pillola neutra: il lime resta la sua firma. Corretta anche la pagina della consegna (1 consegna a undici, 2 a quaranta) |
| c | La regola di precedenza | Scritta: **una routine esegue, non decide** — vince la regola d'azienda, la clausola può solo stringere. `regolaPer` e `contrastoDi` nel modello. Trova quello che nega: **0 contrasti a undici, 2 a quaranta**, segnati in pagina |
| d | `g4` spenta | **Accesa**, e la card stampa quante richieste governa: **zero**. La consegna più cara costa 33,80 € e la soglia sta a 50 — il problema è la soglia, non lo stato |
| e | La pagina delle routine | Costruita, **fuori dal rail** (sei cerchi). Da due strade che c'erano già: il nome nello storico (era testo morto) e una pillola nel Dipartimento |
| f | L'intestazione fuori dalla banda | **A capo sotto il titolo**: da 56 a 124 px, ogni pagina scende di **68** (la stima diceva 64). I numeri sotto la tendina: da **4 a 0**, su 24 pagine per due taglie |

### 3. Un difetto della versione 20 trovato e chiuso

**Aprire un nodo ne copriva un altro per intero** — 18 096 px², cioè tutti i 208 × 87 del nodo sotto: il canvas
aggiungeva 168 px in fondo invece di spostare in giù le righe seguenti. Adesso le righe scendono di quanto il nodo
cresce, l'altezza del nodo aperto è un **conto fatto prima di stampare** (i campi hanno altezza fissa e stanno su
una riga sola, se no cresce di un'altezza imprevedibile) e una prova verifica **792 stati** del canvas: zero nodi
coperti, zero sotto la barra.

### 4. Un artefatto non ripubblicato, e perché

L'artefatto della **Console** (<https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34>) è rimasto
alla **versione 21**. Non è una dimenticanza: per ripubblicare sopra un artefatto il servizio chiede di averne
letto la versione viva riga per riga, e sono 6 416 righe — circa 275 000 token di codice generato. Prima di
cominciare ho verificato che la versione viva è **identica byte per byte** a quello che `build-unico.js` produce
da `origin/main`, quindi non c'era niente da salvare: solo un costo. Si ripubblica in due comandi, all'inizio
della prossima sessione, quando la lettura non toglie spazio al lavoro:

```
cd schermate/direzioni && node build-unico.js direzione-a.html /tmp/console-unico.html
# poi Artifact publish con url=…e6699f3a… (leggendo prima la versione viva, come chiede il servizio)
```

L'artefatto del **telefono** (…34192ba0…) non ne ha bisogno: le sue venti schermate non mostrano nessuna delle
richieste toccate dalla conferma b, e le sue catture sono identiche byte per byte.
**Nuovo, e pubblicato**: la pagina della scelta del gesto, <https://claude.ai/code/artifact/523d0e19-8bc8-4721-8027-8734086fdc5b>.

### 5. Il prezzo, misurato

- Le **sei** prove: **478 verifiche, 0 ko** (erano 421 su cinque). La sesta è `prove/routine.js`, 49 verifiche.
- Le catture: **23 su 70 identiche** byte per byte, **47 cambiate** (tutte per i 68 px dell'intestazione), **7 nuove**.
- Le pagine: home 2 320 → 2 388, Richieste 3 033 → 3 101, Dipartimento 3 130 → 3 198.

---

Stato al 2026-09-08, fine della sessione della **versione 21**: il **record della routine**, la **banda riservata**
dei 304 px, le **asserzioni di visibilità** e le **due regole fantasma** — il primo giro deciso dall'analisi.
Nessuna interfaccia nuova, come chiedeva il prompt: modello, CSS di due colonne, prove.

## Versione 21 (2026-09-08, questa sessione)

### Le tre risposte dell'utente, prese all'avvio

| Domanda | Risposta |
|---|---|
| Tetto di dipartimento: soffitto o ripartizione | **Soffitto, con l'avviso quando le quote sommano oltre il 100 %** |
| Che cosa fa il tetto quando lo si tocca | **Ferma prima del passo** (stato «ferma per tetto», richiesta in coda) |
| Giudizio sulla versione 20 | **Il canvas deve diventare componibile** — è l'unica cosa che non convince |

La terza è la più pesante e **non è stata costruita in questo giro**: vedi «Cosa manca», punto 1. Ma il giro le ha
messo sotto la cosa che le serviva — un record su cui si possa scrivere. Prima non c'era: `workflowDi()` era una
derivazione e `firme` un oggetto in memoria che si perdeva ricaricando.

### 1. Le otto routine erano tre — ed è l'informazione che il giro doveva produrre

Il prompt diceva: *se etichettando le 8 la lista sta in piedi, la funzione ha contenuto; se non sta in piedi, lo
scopriamo prima di costruire una pagina.* Etichettate, le **otto voci sono tre routine viste da otto lati**:

| routine | dip. | innesco | da quali lati si vedeva |
|---|---|---|---|
| Report giornaliero al titolare | amm | ogni giorno alle 18:00 | obiettivo `o11` + dipendente 11 pianificato + `r8` |
| Follow-up settimanale ai clienti | ven | ogni venerdì alle 17:00 | obiettivo `o9` + dipendente 9 pianificato + `r17` |
| Fatture ricorrenti | amm | ogni mese, il 1º alle 09:00 | **solo** `r16` |

La quarta voce, il Tester QA delle 15:00, **non è una routine**: il diario dice che l'ha pianificato MR ieri alle
18:20, per oggi. **La lista sta in piedi ed è corta: tre righe.** Due numeri che ne escono e che contano:

- `fatte` (le richieste che ogni routine ha davvero prodotto) fa **1** per tutte e tre. Il rodaggio ne vuole **3**,
  la prova non l'ha fatta nessuna, e **tutte e tre girano già con il «fai pure»**. La decisione 54 trova nei dati
  esattamente il caso che era stata scritta per impedire.
- Delle tre, **solo una ha un workflow** (dip. 10): le altre due sono `pianificato`, zero passi conclusi. «Un
  oggetto, due tempi» oggi ha due facce **in un caso su tre**. La forma dichiarata viene dai `passi` della richiesta
  che la routine ha deciso l'ultima volta — nessun dato inventato.

A quaranta il generatore ne ricava **tre** con lo stesso criterio. Erano cinque finché non guardava lo stato: due
erano rifiutate, e una richiesta rifiutata il titolare l'ha vista.

### 2. Il consiglio sulle regole fantasma, e la cosa che ha spostato la domanda

Tre strade difendibili (due regole nuove, +220 px misurati; due eccezioni nei dossier, +56 px l'una; il campo che
dice la routine, zero px) → **è passata dal consiglio**. Primo giro **3–2** per la terza strada; la revisione
incrociata ha ribaltato: **4 revisori su 5** hanno indicato come più forte il parere che sposta la domanda dal
lessico all'autorità — *una routine esegue, non decide* — e propone che `g1` conti dentro di sé le proprie eccezioni.

**Ma la cosa che ha davvero spostato la domanda non era in nessuno dei cinque pareri**, ed è venuta di nuovo dalla
revisione incrociata, da due revisori indipendentemente: *«i due nomi fantasma sono i nomi delle due routine» è una
**deduzione, non una misura**: nel modello nessun campo lega `r17` alla routine del follow-up, se non il nome e il
dipendente. Il campo va creato prima di stamparne il nome.* E: *la causa non è la parola, è che il campo era una
**stringa libera che non risolveva a nessun oggetto**, e nessuna delle 385 prove lo leggeva.*

Quindi il giro ha fatto la parte che nessuno contesta e che era comunque il primo lavoro: **il riferimento**.
`deciso: { tipo, id }` deve risolvere a un record che esiste; `r8` resta una **regola** (`g2` esiste, ed è l'unico
dei tre casi in cui il campo diceva il vero), `r16` e `r17` diventano **routine**; se non risolve, la riga dice
«non si sa quale» invece di un nome inventato, e **un'invariante nelle prove lo prende**. Niente freccia: la pagina
delle routine non esiste e la regola 26 vieta di prometterla.

**Da confermare** (il consiglio prepara la domanda, non la chiude): se `r16` e `r17` debbano invece diventare
**eccezioni nei dossier** dei dipendenti 9 e 10, con il **contatore dentro `g1`** («2 eccezioni ›») — la strada che
la revisione incrociata preferisce, e che costa una riga-contatore da costruire.

**I punti ciechi che il consiglio ha nominato e che non erano la domanda** (nessuno toccato, tutti misurati):
- la colonna **Stato dice «Approvata» per `r17`, e nessuno l'ha approvata**. Tre revisori su cinque l'hanno indicata
  come più grave della domanda stessa: l'autore è in fondo alla riga, il participio è l'affermazione principale;
- **`g4` «Spese sopra 50 €» è spenta** mentre `r16` fa uscire 14.200 € di fatture;
- **nessuno ha scritto la regola di precedenza**: chi vince fra la clausola di una routine e una regola d'azienda
  attiva. Quattro pareri su cinque la applicano di fatto — routine batte regola — senza dirlo;
- i cinque hanno usato **sette parole diverse** per lo stesso oggetto: routine, eccezione, permesso, delega, deroga,
  provenienza, «firma data in anticipo». È la stessa trappola della prima applicazione del metodo.

### 3. La banda riservata: 106 controlli irraggiungibili → zero

| | prima | dopo |
|---|---|---|
| **Coperti** dalla tendina o dal badge, allo scroll 0 | **66** | **0** |
| **Tagliati** da un contenitore che non scorreva (irraggiungibili in ogni caso) | **40** | **0** |
| Tagliati ma raggiungibili scorrendo la striscia | 108 | 192 |

`.a-main` passa da **1312 a 1008 px** e non dipende dallo stato della tendina. Le pagine si allungano dallo 0 al
26 % (home 1 844 → 2 320, Richieste 2 503 → 3 033, Dipartimento 2 594 → 3 130; Esecuzione, Costi e Chat invariate).
**1008 batte i 958 della stima**: a 958 il Dipartimento arriva a 3 786 px perché una griglia perde una colonna.

Tre cose rotte dalla colonna più stretta e rimesse: le **strisce di pillole** adesso scorrono invece di nascondere
(erano 40 pillole già irraggiungibili); la **barra dei passi** stringe di un passo la regola che aveva già (sette
esecuzioni su undici sforavano, adesso zero); la **colonna destra dei Costi** stringe di 30 px le tre colonne di
valore.

### 4. Il canvas non ha avuto l'eccezione: una misura ha battuto il consiglio, di nuovo

Il consiglio gli aveva concesso di restare a 1312 px, perché la stima diceva «da cinque colonne a tre, +41 %».
**La stima toglieva 354 px; la banda vera ne toglie 304**, e bastava stringere il passo fra i nodi da 248 a 242
perché **quattro** colonne stessero in 1006 px. Prezzo vero, misurato su tutti i workflow: **un workflow su sei
cresce di 210 px a undici, due su ventisei a quaranta**. Niente eccezione: nessuna pagina larga, nessun nodo sotto
la tendina, il prodotto resta uno.

### 5. I tetti (decisione 55 e le due conferme)

Nel modello, non ancora in nessuna pagina: `m.tetti.modo === 'soffitto'`, `avvisoSopra100`, `fermaPrimaDelPasso`,
`tettoAzienda()` (115 €/giorno e 1 580 €/mese a undici — **già sfondato**, 124 € spesi), `soffittoDi(dip)` (solo
Vendite ne ha uno, 60 % = 69 €), `sommaSoffitti()` (60 %, sotto il 100: nessun avviso da dare oggi).

## Sessione di analisi dell'8 settembre 2026 — nessun codice toccato

Dopo la versione 20 l'utente **non ha trovato l'ingresso ai workflow**. Da lì è nata una sessione di sola analisi:
il difetto misurato, la ricerca sui concorrenti, il consiglio con la revisione incrociata, e dieci decisioni nuove.
**Tutto sta in `schermate/direzioni/DIREZIONI.md`, sezioni 7.1–7.10.** Il codice non è stato toccato: la prossima
sessione parte da qui.

### Il difetto che ha aperto tutto (misurato)

`.a-main` è larga 1312 px e finisce a x 1414, ma la tendina del titolare è `position:fixed` sui 330 px di destra:
**gli ultimi ~304 px di ogni pagina le stanno sotto.** La pillola «Workflow» e le pillole del periodo delle Consegne
sono **invisibili allo stato predefinito**; lo è anche «Tutti i costi dell'azienda», che è precedente alla versione 20.
Le 385 prove non l'hanno preso perché asserivano la presenza nel DOM e il clic, e **Playwright centra l'elemento prima
di cliccarlo**. Da qui in avanti ogni controllo nuovo vuole un'asserzione di **visibilità** (`elementFromPoint`).

### Decisioni 47–56

| # | Decisione |
|---|---|
| 47 | La pillola d'ingresso ai workflow **si sposta**: un controllo che apre una pagina non è un filtro (e sta nella fascia morta) |
| 48 | La parola è **«routine»** (libera: «mansione» è occupata 16 volte, «regola» da 4 record); l'innesco si chiama **«innesco»**; «workflow» smette di essere una *modalità* e diventa una **vista** |
| 49 | **Un oggetto solo**: la routine è un workflow con un innesco in testa. Due stati della stessa figura: «come lavora» (dichiarato) e «com'è andata» (eseguito) |
| 50 | Il riferimento è **n8n**, non Zapier: **la forma è n8n, la porta è Zapier**. Il canvas **diventerà modificabile**, non resterà una lente — su questo il consiglio aveva torto |
| 51 | Chi scrive: il **dipendente propone**, non crea. Il titolare conferma e sceglie «chiedi prima di procedere» / «fai pure» |
| 52 | Ogni routine porta **la sua clausola e i suoi limiti** (giorno, settimana, mese), con piena personalizzazione |
| 53 | Inneschi **anche esterni**, con **rodaggio**: le prime **3** volte producono una richiesta, non un'uscita |
| 54 | Una sezione dove **provare** la routine (e i workflow) prima del «fai pure». Il **«fai pure» si guadagna, non si sceglie** |
| 55 | **Tetto di azienda** obbligatorio; dipartimento (in % dell'azienda), dipendente e routine **facoltativi** |
| 56 | Servono **sia** «approvazione a ogni avvio» **sia** «approvazione dell'uscita», con la preferenza in una pagina **Impostazioni** che non esiste ancora |

### Le tre cose che il modello ha già e che nessuno aveva collegato

1. **Le routine esistono già**, in tre forme senza un nome comune: 2 obiettivi che si ripetono, 3 dipendenti
   pianificati a un'ora fissa, 3 richieste decise da una regola invece che dal titolare. Otto voci distinte.
2. **Il modo di provare esiste già due volte**: il **colloquio** del dipendente (Nora: 12 casi, 91 su soglia 85,
   4 €, 18 min) e la **prova** di una revisione (20 esecuzioni, 30 €, 5 giorni; una è già in `stato: 'prova'`).
   La prova della routine è il **terzo uso della stessa forma**.
3. **Il tetto esiste già ed è per dipendente** (`budget.giorno`, `budget.mese`) — ed è **già sfondato**: 3 dipendenti
   su 11 e 12 su 40 sono oltre il tetto del giorno, l'azienda è al 108 % a undici e al 107 % a quaranta, e **nessuna
   pagina della Console lo dice**.

## Che cosa ha scelto l'utente

Sette risposte, date **prima** che scrivessi una riga di codice (il prompt diceva di chiederle):

| Domanda | Risposta |
|---|---|
| La consegna in attesa che compare due volte | **Resta com'è**: due volte, lime tutte e due |
| Il perimetro di «Consegne di oggi» | **Pillole del periodo**, come nei Costi |
| Quale candidato | Il **7**, l'editor di workflow |
| La forma | **L'editor a nodi vero**, come la sezione 07 — contro il 5-0 di un consiglio precedente |
| La delega | **Nasce spenta**: i tre freni si disegnano, la firma anticipata è una pillola che accende lui |
| La sezione 07 dello specimen | **Si ripunta con la palette del sistema** (emenda `CLAUDE.md`) |
| La parola | **Workflow** — «è un termine informatico e non credo abbia una vera traduzione» |

## Che cosa è stato costruito (versione 20)

### 1. Il perimetro: le consegne passate c'erano già

Il passaggio di consegne diceva che le pillole del periodo avrebbero richiesto di **inventare dati storici**. Non era
vero, e bastava guardare: le **richieste decise** sono le consegne uscite in passato, e portano già `giorno`, `tipo`,
`costo`, `testo`, `allegato` e la data della decisione. **Zero dati inventati.**

| Consegne | oggi | sette giorni | trenta giorni |
|---|---|---|---|
| Azienda, a undici | **18** | **30** | **31** |
| Sviluppo · Marketing · Vendite · Amministrazione | 7 · 5 · 4 · 2 | 9 · 11 · 8 · 2 | 9 · 12 · 8 · 2 |
| Marketing a quaranta | 10 | 13 | 17 |

Tre cose decise dalla misura: il filtro parte da **ieri** (`giorno >= 1`) perché le decise di oggi sono già nella
lista corrente — e la conseguenza voluta è che **con «oggi» la pagina è identica alla versione 19**, 2 594 px su
Sviluppo; il cerchio **«cerca» lo decide il numero** (`SOGLIA_CERCA`, che finalmente serve a qualcosa invece di
stare in un commento) e compare da solo quando la lista passa le dodici; e una pillola in più, **«Da rifare»**, per
le consegne che il titolare ha rimandato indietro, che esistono solo nei giorni scorsi.

### 2. I workflow: una misura ha battuto un 5-0

Le tre domande residue — che cos'è un nodo, dove vive il canvas, da dove nasce — sono passate dal consiglio.
**Cinque pareri su cinque: «il nodo è un dipendente»**, e tutti e cinque hanno poi scritto da soli l'obiezione
giusta: il passaggio di mano fra due dipendenti non sta nei dati. **L'ho misurato: zero casi**, in tutte e due le
taglie (esistono 4 riferimenti alla *propria* consegna passata e 11 `serie`, tutte dello stesso dipendente).

Quindi **il nodo è un passo** — 43 a undici, 156 a quaranta, con modello, strumenti, costo, durata ed esito — e
**l'ultimo nodo è il titolare**, che nei dati c'è pure: l'ultimo passo di ogni dipartimento è già «Consegna al
titolare». Il nodo del titolare porta la **regola** di `m.regole` che ferma lì la consegna: il workflow non
sostituisce le quattro regole, **le fa vedere**.

| | Numero |
|---|---|
| Workflow (Sviluppo · Marketing · Vendite · Amministrazione) | **6** a undici (1·2·2·1), **26** a quaranta (6·7·7·6) |
| Nodi per workflow | 4–8 a undici, 4–11 a quaranta |
| Elementi sul canvas | fino a **24** a undici, **36** a quaranta — la figura di riferimento ne ha **17** |
| Sezioni aggiunte al Dipartimento · voci nel rail | **zero** · **zero** (resta a sei) |
| Altezza della pagina Dipartimento | **2 594 / 2 960 px, invariata** |

**L'ingresso è una pillola nell'intestazione di «Oggi in ‹dip›»**, non una settima sezione: una sezione sarebbe
costata ~700 px e avrebbe spostato gli indici `nth-of-type` su cui si reggono tre prove e **due catture**. **Niente
pan, zoom e mini-mappa** (regola 17): il canvas si stende su una serpentina calcolata nella funzione che stampa, e
gli archi rileggono le stesse coordinate. **Il nodo si apre** e mostra modello, strumenti ed esito: è il gesto con
cui si modifica il workflow. **La firma anticipata nasce spenta**, e i tre freni portano numeri misurati.

**Sul telefono la schermata 10**: lo stesso canvas **girato di novanta gradi**, perché lo schermo è 300×620 px
dentro `zoom:1.25` e non deve poter scorrere di lato. Nessuno dei cinque consiglieri aveva nominato il telefono.

### 3. La sezione 07 dello specimen, ripuntata

Dodici occorrenze dei sei verdi che non erano il lime → **zero**. Cambia solo la tinta: notte, tessere, griglia
puntinata, forma dei nodi e porte restano quelle del riferimento. **Una cosa che il verde nascondeva**: sul lime il
testo bianco non si legge, quindi il nodo selezionato porta il testo all'inchiostro.

### 4. Che cosa ha trovato la revisione incrociata (di nuovo la parte che ha cambiato la risposta)

- **La premessa del contesto era sbagliata, ed era mia**: avevo scritto che le 4 regole di approvazione stanno nella
  pagina Dipendente. Stanno in **Richieste** (`direzione-a.js:989`), e sono **card**, non righe. Tutti e cinque i
  consiglieri hanno costruito sulla pagina sbagliata.
- La Console ha **nove** pagine, non sette: il canvas è la **decima** superficie.
- **Due regole fantasma**, difetto preesistente e **non corretto**: `r16` «Fatture ricorrenti» e `r17` «Follow-up»
  sono citate su richieste decise ma non esistono in `m.regole`.
- `scatta.js` inchioda `section:nth-of-type(2)` sul Dipartimento: una sezione nuova rompe **le catture**.
- Rendere cliccabili le 4 card delle regole **riaprirebbe la regola 26**; un nodo-titolare col disco in tinta
  **violerebbe la regola 19**.
- **Due affermazioni dei revisori erano false**, trovate controllandole: «il titolare non compare mai
  nell'Esecuzione» (`tipo:'titolare'` e `.lrow.titolare` esistono) e «il passaggio di mano esiste, `dati.js:482`»
  (quella riga sta nell'esecuzione del dipendente 1 e `r5` ha `chi: 1` — è la stessa mano).

## Stato

- **Branch**: `claude/direzione-a-console-primo-giro-j2n1xm`, **PR #18**
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/18), aperta e non ancora unita a fine sessione. La **PR #17 era
  già unita** all'avvio, quindi si è ripartiti da `main` come chiedeva il prompt. Se all'avvio della prossima la #18
  risulta unita, ripartire da `main` con un branch nuovo.
- **Artefatti ripubblicati allo stesso indirizzo**: la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9), tutti e due con l'etichetta «Versione 21».
  Nota per chi ripubblica: lo strumento rifiuta la pubblicazione finché non si è **letta per intero** la copia
  salvata della versione viva (525 KB la Console, 390 KB il telefono). Conviene farlo fare a un sottoagente, che ci
  mette il suo contesto invece del tuo.
- **Codice toccato**: `dati.js` (il record `routine11` con le tre routine, il generatore delle routine a quaranta,
  `routine`/`routineDi`/`routineIdDi`/`autoreDi`/`rodaggioDi`, `tetti`/`tettoAzienda`/`soffittoDi`/`sommaSoffitti`,
  il campo `deciso` al posto di `regola` su `r8`/`r16`/`r17` e sulle generate); `direzione-a.js` (la banda riservata
  su `.a-main` e su `.a-head`, le strisce di pillole che scorrono, la barra dei passi che stringe di un passo, la
  colonna destra dei Costi, il canvas a quattro colonne, la riga dello storico che legge il riferimento);
  `prove/visibile.js` (**nuovo**), e le cinque prove. **Non toccati**: `componenti.js`, `comune.js`, `avatar/`,
  `mobile.js`, `direzione-a.html`, `mobile.html`, `scatta.js`, lo specimen e i token.
- **Le cinque prove passano: 155 + 83 + 50 + 56 + 77 = 421 verifiche, 0 ko** (erano 385).
- **Le catture: 25 su 70 identiche byte per byte, 45 cambiano, 0 nascono.** Le 25 identiche sono **tutte** le
  schermate del telefono (il codice del mobile non è stato toccato), i sei ritagli della barra «Oggi in azienda»
  (che sta fuori da `.a-main`) e lo specimen. Le 45 che cambiano sono tutte e sole le pagine della Console, e
  cambiano per una ragione sola: la colonna è passata da 1312 a 1008 px.
- **Difetto noto, non corretto**: le pagine della Console sono più alte dal 4 al 26 %. È il prezzo dichiarato della
  banda, e la stima migliore (958 px) l'avrebbe fatto pagare di più.
- **Difetto preesistente trovato e NON corretto: l'intestazione della pagina.** `.a-head` sta a y 112 — esattamente
  dove comincia la tendina — e arriva a x 1414, quindi il suo **ultimo numero, che è cliccabile** («spesi oggi» apre
  i Costi), nasce sotto la tendina aperta. Vale su home e Dipartimento, alle due taglie: **4 controlli**. Non è un
  danno della banda, c'era prima; ma la banda non lo chiude, e **allargare la verifica a tutta la cornice l'ha fatto
  saltare fuori**. Riservare la banda anche lì non basta, misurato: le intestazioni sforerebbero su **13 pagine su
  18**, da 143 px (Dipartimento) a **351** (Richieste), e le sole tre statistiche delle Richieste ne vogliono **733
  in 526 disponibili**. Quattro varianti di tipografia più stretta provate: la migliore resta a 351 px di sforo.
  **Per chiuderlo serve rifare l'intestazione, ed è una scelta di progetto che spetta all'utente.** Le tre strade:
  far scorrere i numeri come le strisce di pillole (ma nascondere un numero è peggio che nascondere un filtro);
  mandare i numeri a capo sotto il titolo (l'intestazione passa da 56 a ~120 px e spinge giù ogni pagina di 64 px);
  o tenerne meno di tre. La prova ne fissa il conto a 4, così se cresce ce ne accorgiamo.

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

42. **2026-09-07: l'utente conferma le due cose che erano rimaste aperte.**
    - **Il conto nel titolo è la 36**, «la strada di mezzo»: `CONTA = 2` in `mobile.js`, il conto a 26 resta dietro
      `?conta=1` come forma scartata. Cambiano due catture su 51 e la riga della decisione resta sopra la barra con 0 px
      di margine — vedi «Coda» nello Stato.
    - **Chi parla nel filo del dipartimento: confermata la proposta del consiglio**, cioè **DGT che indossa il
      dipartimento** (disco con l'icona del dipartimento, nome «Coordinamento ‹dipartimento›»; il prompt di
      coordinamento è una proprietà del dipartimento, versionato; il costo va sulla riga «coordinamento» del
      dipartimento). Niente Coordinatore come dipendente nuovo: il conto dei dipendenti non cambia. **Questa è una
      decisione di progetto, non codice scritto**: il candidato 5 resta da costruire.

43. **2026-09-07, fine della sessione: tre proposte nuove dell'utente, e il lavoro della prossima sessione è
    ANALIZZARLE, non costruirle.** Parole sue: «nella prossima sessione voglio venga fatta una analisi delle proposte che
    ho fatto adesso». Le tre stanno per esteso nella sezione «Il lavoro della prossima sessione» (candidati 6, 7 e 8):
    - **il lavoro del dipartimento che si tiene d'occhio**: «non c'è una schermata dove si veda chiaramente il lavoro che
      ogni dipartimento sta svolgendo e tenerlo d'occhio vedendo cosa è stato fatto, cosa è stato creato, con possibilità
      di aprire file, artefatti e compiti svolti, anche in tempo reale»;
    - **l'editor di workflow**: esiste come bozza (la sezione 07 dello specimen) e «va solo implementata in modo
      intelligente (seguendo le regole UX corrette) e aggiornata»;
    - **i connettori** (Gmail, Drive, YouTube, Instagram, Slack, Figma, Hostinger…): «il come tecnico non ci interessa
      ora, ci interessa solo la UI e UX». Con un dubbio dichiarato da lui: **ai dipendenti o ai dipartimenti?** «Secondo
      me è meglio i dipartimenti.»
    Quest'ultimo è un dubbio progettuale nel senso della regola fondamentale (decisione 41): **va passato dal consiglio**
    prima di scrivere codice, con il suo parere già dentro il contesto come ipotesi da pressare, non da confermare.

44. **2026-09-07, sessione successiva: le tre proposte sono state ANALIZZATE, non costruite** (come chiedeva la
    decisione 43). Nessuna riga di codice di prodotto. L'analisi per esteso sta in `schermate/direzioni/DIREZIONI.md`,
    **sezione 6**; qui sotto, nei candidati 6, 7 e 8, ci sono i numeri e i verdetti. I numeri sono stati presi
    **aprendo venti viste della Console e due del telefono con Playwright e contando nel DOM**, più tre letture del
    modello dentro la pagina: non a `grep`. Le due domande con più di una risposta difendibile — la forma dell'editor
    e il livello dei connettori — **sono passate dal consiglio** (`llm-council`): cinque pareri indipendenti, revisione
    incrociata anonima, sintesi del presidente. Il candidato 6 **non** è passato dal consiglio, e la ragione è la
    regola stessa: tutto quello che decide è misurabile.
    **I due verdetti sono `da confermare`: la decisione la prende l'utente, e il consiglio prepara la domanda.**
    Alla fine dell'analisi la proposta è di **cominciare dal candidato 6** (le ragioni in `DIREZIONI.md`, 6.4), e
    l'utente non ha ancora scelto.

45. **2026-09-07, dopo l'analisi: si comincia dal candidato 6, strada A, e la parola è «consegna».** Parole
    dell'utente: «partiamo dalla 1, strada A … «consegna»». Quindi: una **sezione in più sulla pagina Dipartimento**,
    nessuna pagina nuova nel rail, e un solo nome per la cosa creata da un'esecuzione. Costruita nella stessa
    sessione (versione 19, `DIREZIONI.md` sezione 4; regola 27 in `SYSTEM-DESIGN.md`).
    - **La sua domanda**: «avrebbe senso poter espandere la sezione mostrando per intero tutti gli output con più
      dettagli?». **Risposta, misurando**: la sezione non ha bisogno di espandersi (dieci righe al massimo, e la
      soglia del prodotto è dodici); quello che si espande è **la singola consegna**, nella tendina larga che il
      titolare usa già per le richieste. La sua idea e la domanda sull'«aprire» erano la stessa cosa vista dai due
      lati.
    - **Resta da decidere**: se la consegna in attesa deve restare **lime** anche nella sezione nuova (compare due
      volte sulla pagina, a 1 988–2 302 px di distanza) e se il perimetro resta «di oggi».

46. **2026-09-08: sette risposte in una volta, e una di queste ribalta un consiglio.** All'avvio della sessione
    l'utente ha risposto alle domande che il passaggio di consegne segnava come necessarie (tabella in cima a questo
    file). Le tre che pesano:
    - **la consegna in attesa resta due volte, lime tutte e due**: la ripetizione della versione 19 non si tocca;
    - **il candidato 7, e con il canvas a nodi vero** — «l'editor a nodi vero, come la sezione 07» — cioè **contro
      il verdetto 5-0** del consiglio della sessione precedente, che aveva raccomandato la sequenza di righe. Il
      consiglio aveva scritto da solo, nella revisione incrociata, che quel 5-0 era «in parte un artefatto del
      contesto»: l'utente ha deciso di conseguenza;
    - **la delega nasce spenta**: i tre freni si disegnano, ma la firma anticipata è una pillola che accende lui,
      un workflow alla volta. **La spina dorsale non si riscrive in questa versione.**
    Più: la sezione 07 **si ripunta con la palette del sistema** (che emenda `CLAUDE.md`, unica eccezione al
    «copiato così com'è», e vale solo per il colore), il perimetro delle consegne prende le **pillole del periodo**,
    e la parola è **workflow**: «è un termine informatico e non credo abbia una vera traduzione».
    **Costruito nella stessa sessione** (versione 20, `DIREZIONI.md` sezione 4; regola 28 in `SYSTEM-DESIGN.md`).

57. **2026-09-08** (versione 21, prese all'avvio della sessione): il tetto di dipartimento è un **soffitto** — ogni
    quota è un limite a sé, possono sommare oltre 100, il tetto d'azienda è il fermo vero — **con l'avviso quando la
    somma supera il 100 %**. Misurato: oggi i tetti di dipartimento sommano esattamente a quello d'azienda
    (30+35+30+20 = 115), cioè sono una ripartizione, e con quella Vendite si sarebbe fermata a 30 € uccidendo a metà
    l'esecuzione dei 200 lead mentre Amministrazione teneva fermi 20 € non spesi. **Nel modello** (`m.tetti`), non
    ancora in nessuna pagina.
58. **2026-09-08**: il tetto **ferma prima del passo**, mai a metà. Un solo passo dei 200 lead costa 23 €, più del
    doppio dell'intero tetto giornaliero di Nora (10 €): il passo che sfonderebbe non parte e l'esecuzione va in
    «ferma per tetto», la stessa forma dello stato `errore` che esiste già. **Nel modello**
    (`m.tetti.fermaPrimaDelPasso`), non ancora in nessuna pagina.
59. **2026-09-08**: giudizio sulla versione 20 — **il canvas deve diventare componibile**. È l'unica cosa che non
    convince; il resto della versione 20 (i nodi che sono passi, il nodo del titolare in fondo, la firma anticipata
    spenta) va bene così. Vedi «Cosa manca», punto 1.
60. **2026-09-08** (versione 21, presa dal consiglio e **da confermare**): chi ha deciso al posto del titolare è un
    **riferimento che deve risolvere**, mai una stringa libera; la riga stampa la parola che corrisponde a quello
    che il riferimento apre. `r8` resta una regola, `r16` e `r17` diventano routine. La revisione incrociata
    preferiva le eccezioni nei dossier con il contatore dentro `g1`: da confermare.

61. **2026-09-08** (versione 22): sulle **sei conferme** aperte, prendere la raccomandazione già scritta accanto a
    ognuna, senza richiederle. La numero 60 è quindi **confermata come stava**: `r16` e `r17` restano attribuite
    alla routine, e le eccezioni nei dossier col contatore dentro `g1` sono scartate.

62. **2026-09-08** (versione 22, domanda 2 del consiglio): su che cosa si compone → **il ramo**. Un canvas solo,
    due tempi, con la tab a pillola: «L'ultima volta» misurata e immutabile, «La prossima volta» dichiarata e
    componibile. Non era fra le tre strade proposte — l'ha portata la revisione incrociata, e tutti e cinque i
    revisori l'hanno indicata come l'idea migliore emersa. Zero pagine nuove, zero parole nuove.

63. **2026-09-08** (versione 22, domanda 1 del consiglio): **ancora aperta**. Alla domanda «con che gesto si
    compone» l'utente ha risposto «fammi delle anteprime delle 3 opzioni così scelgo meglio». Le tre strade sono
    costruite nella pagina vera e messe a confronto nell'artefatto della scelta. Il verdetto del consiglio era **A ·
    il nodo aperto è l'editor**, dopo che la revisione incrociata ha smontato l'argomento decisivo di B (falso: le
    routine hanno 3 nodi, non zero) e una misura ha tolto di mezzo la difesa di C (l'arco libero è 34 px, non 242).

    **I punti ciechi che il consiglio ha nominato e che restano aperti** (nessuno deciso, tutti scritti):
    - **che cosa vuol dire salvare** una prossima volta: routine, workflow, o proposta da approvare;
    - **chi approva un passo scritto a mano**, e che cosa il titolare *smette* di firmare — è la domanda che tocca
      la spina dorsale, e l'ha nominata solo la revisione incrociata;
    - **che cosa vede il titolare** quando il dichiarato e il misurato non coincidono;
    - **le parole**: il consiglio ne ha usate cinque per la stessa cosa (routine, workflow, esecuzione, copia,
      ramo). «Ramo» è la parola del codice, non del prodotto: sull'interfaccia si leggono solo «l'ultima volta» e
      «la prossima volta», ed è voluto.

64. **2026-09-08** (versione 23): il gesto per comporre è **A, il nodo aperto è l'editor** — con la ragione che
    cambia la portata del lavoro: *«voglio letteralmente la complessità di n8n per poter creare flussi ma con una
    UX che aiuta e semplifica il processo. Di conseguenza voglio poter spostare liberamente ogni card nel canvas e
    poter connettere e biforcare più connettori anche a un singolo task»*. Quindi: **posizioni libere**, **fan-out
    e fan-in illimitati**, e il canvas passa da catena a **grafo**.

65. **2026-09-08**: due connettori che escono dallo stesso nodo possono dire **tutte e tre le cose di n8n** —
    condizione, parallelo ed errore. Stanno **sul connettore**, non come porte del nodo (la forma su cui quattro
    consiglieri su cinque erano arrivati da soli). **L'errore non è una verità nuova**: è lo stato `errore` che la
    pagina Esecuzione mostra già, a cui si dà una strada.

66. **2026-09-08**: il titolare **resta un nodo** (il confine votato da tre consiglieri cancellava l'unica
    superficie da cui si firma dal telefono, e nessuno dei tre se n'era accorto). In più, **idea dell'utente**:
    l'autorizzazione va anche **in testa** al flusso, come il trigger di n8n — così le biforcazioni non hanno
    l'obbligo di convergere su un nodo finale. Non è un concetto nuovo: è la `clausola` della routine e la firma
    anticipata, promosse da interruttore a forma del canvas.

67. **2026-09-08**: si portano dentro **tutti e quattro** gli acceleratori di n8n — «Riordina», il rilascio del
    connettore nel vuoto che crea il passo già collegato, il «+» sul connettore, e selezione multipla +
    scorciatoie + **zoom interno e mini-mappa** (che il riferimento ha già, e che la regola 17 aveva tolto per un
    motivo misurato non valido: `transform` non è `zoom`).

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Il lavoro della prossima sessione

**Due delle tre proposte sono state costruite**: il candidato 6 nella versione 19 (le consegne) e il **candidato 7
nella versione 20** (i workflow). L'analisi per esteso sta in `schermate/direzioni/DIREZIONI.md`, **sezione 6**; le
due versioni nella sezione 4 dello stesso file.

**Quello che manca adesso**, in ordine di quello che aspetta una risposta:

1. **Il giudizio sulla versione 20** — e in particolare sulle due cose che la misura non ha deciso al posto mio: il
   **nodo che è un passo e non un dipendente** (l'ho scelto contro il 5-0 del consiglio, perché i passaggi di mano
   nei dati sono zero: se lui vuole il nodo-dipendente, va prima inventato il passaggio di mano nel modello) e i
   **due soli numeri della versione che non vengono da una misura** — la soglia arrotondata ai 5 € e la scadenza a
   10 esecuzioni.
2. **Il candidato 8, i connettori**, ultimo dei tre: aspetta ancora le sue risposte, elencate sotto.
3. **Il candidato 5, la chat di dipartimento**: non manca una decisione, manca il codice.

### 6 · Il lavoro del dipartimento — **scelto e costruito** (versioni 19 e 20)

Scelta dell'utente: **strada A**, parola **«consegna»**. Fatto nella versione 19 (la sezione, la pagina della
consegna, la schermata 9 del telefono) e completato nella **versione 20** con il **perimetro**: tre pillole
oggi · sette giorni · trenta giorni, con le consegne passate lette dalle richieste decise — **nessun dato
inventato**. Regola 27 in `SYSTEM-DESIGN.md`.

**Che cosa resta aperto su questo candidato:**
- **La ripetizione della consegna in attesa**: l'utente ha deciso, **resta com'è** (decisione 46). Chiuso.
- **Il perimetro**: fatto (versione 20). Chiuso.
- **Il «tempo reale»**: il modello non ha un orologio (`azienda.ora` è `'10:42'` fisso), quindi la promessa
  mantenuta è «lo stato al momento in cui apri la pagina». **Ancora aperto**: va detta così nell'interfaccia, o va
  tolta.
- **Restano fuori**, dichiarati e col prezzo pagato scegliendo la strada A: «che cosa ha creato l'azienda» e «che
  cosa abbiamo fatto per Rossi Srl». Chiederebbero la strada B (una pagina nel rail).

### 7 · L'editor di workflow — **scelto e costruito** (versione 20)

Scelta dell'utente: **il canvas a nodi vero**, la parola **workflow**, la **delega spenta**, la sezione 07
**ripuntata**. Fatto: la pagina Workflow della Console (elenco + canvas), la schermata 10 del telefono, la firma
anticipata con i tre freni, e lo specimen ripuntato con il lime. Dettaglio in `DIREZIONI.md`, «Versione 20»; la
regola in `SYSTEM-DESIGN.md`, **regola 28**.

**Che cosa resta aperto su questo candidato:**
- **Il nodo è un passo, non un dipendente** — scelto contro il 5-0 del consiglio, per una misura (zero passaggi di
  mano nei dati). Se l'utente vuole il nodo-dipendente, il modello va cambiato prima.
- **I due numeri non misurati**: la soglia arrotondata ai **5 €** e la scadenza a **10 esecuzioni**.
- **Restano fuori dal canvas**: il **trascinamento** dei nodi, il **collegamento** di un nodo a un altro col mouse,
  e la **mini-mappa**. Il canvas si legge e si apre nodo per nodo, non si ricompone col mouse. È il prezzo
  dichiarato della regola 17 (niente zoom annidati) e va confermato guardandolo.
- **La spina dorsale non è stata riscritta**: la firma anticipata esiste come oggetto ma nasce spenta, e finché lo
  è la coda è quella di sempre. Accenderla per davvero — cioè far uscire una consegna senza la firma — è la
  decisione grossa che resta.
- **Due regole fantasma nel modello**, difetto preesistente trovato dalla revisione incrociata e **non corretto**:
  `r16` cita la regola «Fatture ricorrenti» e `r17` «Follow-up», che in `m.regole` non esistono (ci sono «Uscite
  verso i clienti», «Report interni», «Liste di lead», «Spese sopra 50 €»). Da sistemare quando si tocca la coda.

### 7bis · L'analisi del candidato 7, per memoria


**I numeri, contati:** la bozza (specimen, sezione 07) ha **5 nodi, 5 porte, 7 archi**; usa **20 icone**, **14 non
nello sprite** (12 da disegnare); **19 colori**, **16 fuori palette**, fra cui **sei verdi che non sono il lime**
(deroga alla regola 4); disegna un **secondo rail** accanto a quello di 6 voci; e chiederebbe un pan/zoom dentro una
pagina che si scala già con `zoom` (regola 17). «Workflow» compare **0 volte** nel prodotto: **non c'è nessun oggetto
da editare**. I passi reali sono **43** a undici (da 3 a 7, media **3,91**; **2 esecuzioni su 11** sopra i 4) e **156**
a quaranta (fino a 10).

**Controllato durante la revisione incrociata**: i **18 token `--dgt-ed-*`** di `tokens.css` **non li usa nessuno** —
lo specimen non importa `tokens.css` e ridichiara variabili sue, inchiodando `#4FCB58` cinque volte nel markup.
Cancellarli o tenerli **non cambia un pixel**. Era una cosa da contare, e cinque consiglieri ci hanno litigato sopra.

**Il verdetto del consiglio (da confermare)**: la **procedura** come **sequenza di righe dichiarate dentro la pagina
Dipartimento**, nata da un'esecuzione riuscita («rifallo sempre così»), con costo e durata **misurati**. Ogni riga
dichiara chi, modello, strumenti, costo previsto e **la condizione di uscita in italiano**. Il passaggio di mano si
risolve dentro la riga: il passo del titolare è una fascia lime che spezza la colonna. Cinque su cinque: **lo usa il
titolare**, l'oggetto è **del dipartimento**, la forma è la sequenza. Quattro su cinque sulla parola: **procedura**.

**I punti ciechi colti dalla revisione incrociata, da presidiare:**
- **Il consenso 5-0 contro il canvas è in parte un artefatto del contesto**, che aveva già pesato le strade. Il
  migliore argomento **a favore** del canvas, che nessun consigliere ha fatto: *non serve a comporre, serve a mostrare
  che ci sono due lavoratori diversi e che fra loro c'è un'attesa*. E nessuno ha distinto un **canvas modificabile** da
  un **diagramma in sola lettura**: tutti i costi contati sono costi dell'editing, non del disegno. **Il diagramma in
  sola lettura resta una domanda aperta e legittima, ma è la seconda cosa**: è una resa della procedura.
- **I rami non servono, e si vede dai numeri** (media 3,91 passi): l'unico ramo vero è l'errore, che è già uno stato del
  passo. Cade anche l'ultimo argomento funzionale del canvas.
- **Che cosa il titolare smette di approvare**: approvare una procedura è **approvare in anticipo le uscite che la
  rispettano**; la coda resta per le eccezioni. **Il prezzo è una riscrittura della spina dorsale** («nulla esce senza
  una firma — sull'uscita, o sulla procedura che la produce») e chiede tre freni: una **soglia di costo** dichiarata,
  un **perimetro**, una **scadenza**. È la decisione di prodotto più grossa emersa in questa sessione.

**Decisione che è dell'utente e non del consiglio**: che cosa succede alla **sezione 07 dello specimen**. `SYSTEM-DESIGN.md`
le concede una palette propria, cioè una deroga scritta alla regola 4; se il prodotto non la applica mai, il sistema
tiene un'eccezione che nessuna pagina giustifica. C'è una quarta uscita — **ripuntare la 07** (stessa notte, stesse
tessere, stesso bagliore, sei verdi morti) a rendere la procedura in righe — ma declassarla o ripuntarla significa
**emendare `CLAUDE.md`**, che dice che il design dei due riferimenti «va copiato così com'è».

### 8 · I connettori — **analizzato, passato dal consiglio, in attesa di scelta**

**I numeri, contati:** strumenti **46 istanze / 17 nomi** a undici, **160 / 14** a quaranta (11,4 copie per nome);
connessioni **14 / 4** a undici, **40 / 1** a quaranta — cioè **40 copie della stessa connessione**, e 40 posti dove
rinnovare un token. Compaiono in **3 pagine** (Dipendente, Esecuzione, Costi) e la pagina Dipartimento ne sa **zero**.
Tre difetti già presenti: il chip **«Rinnova»** è **inerte**; l'errore di Kim «Chiavi di accesso scadute» **non è
attaccato a nessuna connessione**; il permesso «Strumenti e connessioni» ce l'hanno **2 dipendenti su 11**.

**Una correzione a questo stesso file**: diceva che «l'Archivio del cliente compare **15 volte** nel modello — lo
stesso strumento ripetuto su quindici dipendenti». Il 15 era un conto a `grep` sul testo di `dati.js`, e a undici
dipendenti quindici dipendenti non esistono: il numero vero, letto dai dossier, è **6 a undici** e **20 a quaranta**.
L'argomento regge (a quaranta è più forte), ma è la terza volta che un conto a `grep` finisce sbagliato in un documento.

**Il fatto che nessuno aveva nominato**: le tre connessioni scritte a mano si chiamano **LinkedIn · Rossi Srl**,
**Analytics · Rossi Srl**, **Instagram · Madira Ink** — **tre su quattro portano nel nome il cliente**, e il
dipartimento in nessuna.

**La misura che chiude la domanda (chiesta dal presidente del consiglio, fatta dopo):** **quattro nomi su quattordici
sono spenti su ogni dipendente, in tutte e due le taglie, e non sono mai stati usati** — **Deploy in produzione**,
**Pubblicazione diretta**, **Invio e-mail**, **Banca**. Sono **tutte** le istanze spente del prodotto (11 su 46, **40
su 160**), stanno tutte in quarta posizione, una per dipartimento, e sono **gli unici quattro la cui descrizione parla
di permesso** («Solo con approvazione», «Sola lettura») invece che di contenuto. **La divisione fra accesso e capacità
è già scritta nel modello: 4 spenti contro 10 accesi.**

**Il verdetto del consiglio (da confermare)**: **l'utente ha ragione a metà, sulla metà che il consiglio non ha mai
votato.** La **credenziale è dell'azienda, nominata per cliente**; il **permesso d'uso è del dipartimento** — cioè
**l'ipotesi dell'utente**, che nessuno aveva votato perché nessuno aveva separato i due oggetti. Il dipendente eredita;
l'eccezione passa da una richiesta, che è letteralmente «dare ai dipendenti gli strumenti per lavorare». La
**superficie è il guasto, non l'inventario**: un accesso scaduto entra in Richieste con il danno in euro e le
esecuzioni bloccate, in una corsia sua; nessuna voce nuova nel rail, per ora.

**Che cosa il titolare smette di vedere**: la stessa credenziale 40 volte; un «Rinnova» che non fa niente; 40 assensi
per dipendente che diventano 4 per dipartimento; i **12 interruttori decorativi** delle capacità. **In cambio acquista**
un'approvazione che oggi non ha: i **3 accessi irreversibili** escono dall'interruttore del dipendente.

**La parola: accesso** — l'unica che copre tutti e due gli oggetti (l'accesso *a* un servizio, l'accesso *di* un
dipartimento) e l'unica che porta il verbo (si dà, si revoca, **scade**). Sopravvive «strumento», rimpicciolito a
capacità. Muoiono «connettore» ed «estensione». Muore «connessione», e costa **4 etichette** in interfaccia più 14
righe del modello (40 a quaranta), generate da una funzione sola.

**I punti ciechi colti dalla revisione incrociata, da presidiare:**
- **Il rifiuto unanime del dipartimento è in parte un artefatto** del modo in cui il contesto era scritto. L'argomento
  a favore che nessun consigliere ha fatto: **il dipartimento è l'unico livello che ha un capo**; cliente e azienda non
  hanno un responsabile, e i clienti crescono mentre i dipartimenti restano quattro.
- **Nessuno ha disegnato il gesto di collegare**, che è quello che l'utente ha chiesto: manca il «+ Collega», manca il
  catalogo, e manca l'unico schermo dove il marchio di terzi sarebbe inevitabile.
- **Lo sprite non ha le icone**: contate, mancano busta, chiave, nuvola e immagine. E la scorciatoia ovvia — iniziali
  in un disco colorato — **è vietata dalla regola 19**: il disco in tinta è una persona. Serve **una regola nuova**:
  l'accesso si disegna **quadrato e monocromo, mai tondo**; l'icona dice la **funzione**, il nome in testo porta il
  marchio. E **il colore dello «scaduto» non è deciso**: lime è l'attenzione del titolare, rosa l'errore, e un accesso
  scaduto è tutti e due.

**Restano scelte dell'utente**: se il Dipartimento spende la sua sesta sezione per «che cosa può toccare»; se Richieste
ospita i guasti o ha una corsia separata; e la parola.

### 5 · La chat di dipartimento (decisa, da costruire)

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

**Tutte e due le domande hanno risposta (2026-09-07): non si riaprono.** La prima è passata da un consiglio di cinque
pareri indipendenti con revisione incrociata anonima (`llm-council`) e **l'utente ha confermato il verdetto**
(decisione 42); la seconda l'ha decisa lui con i nomi che ha scelto (decisione 41). Quello che resta da fare è
**costruirlo**. Il verdetto, adesso vincolante:

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

**Le due domande per esteso, con la risposta data** (restano scritte perché la risposta si capisca):

1. **Chi parla nel filo del dipartimento? RISPOSTA: DGT che indossa il dipartimento** (confermata dall'utente, decisione
   42). Un dipartimento non è una persona. Risposta economica: parla **DGT**, con i
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

### 9 · I giudizi in sospeso

L'utente non ha mai giudicato: la pagina del Dipendente (versione 6), quella dell'Esecuzione (versione 8), le schermate del
telefono (11 e 12), la revisione sul telefono (14), le pagine Agenda e Chat (15), gli avatar ricentrati (15a), la
versione 17 (Dipartimenti e controlli) e adesso la 18. Non blocca, ma è una lista che si allunga: vale la pena
chiederglielo.

### 10 · Le scelte di dettaglio della barra, mai sollevate

Le parole delle caselle («approvate» contro «consegnate», «ferma» contro «in errore»), l'ultima ripetizione «al lavoro» nella
sola home, quante caselle. La strada è confermata (decisione 34); queste no. Se non le solleva lui, vanno lasciate come sono.

### 11 · I punti aperti del modello

Le mutazioni che il modello non ha e che si vedono nell'interfaccia: «Sposta» dell'agenda non sposta davvero, i giorni della
settimana non si aprono, il dipendente non risponde da solo nella chat, il «non letto» non sopravvive al ricaricamento, lo
stato vuoto del dipendente appena creato. Sono lavori di modello, non di design.

### 12 · La tendina del passo dell'esecuzione

È l'unica destinazione che il censimento delle frecce ha trovato **mancante e sensata**: i quattro passi dell'esecuzione
hanno adesso righe senza freccia perché la tendina del passo non è mai stata costruita. Se un giorno si costruisce, le
frecce dei passi tornano da sole (la regola 26 dice che una riga con una destinazione la freccia ce l'ha).

## Come riprendere

**Tutte le decisioni sono prese** (64–67, qui sopra): non c'è niente da chiedere prima di cominciare. La prossima
sessione è **di disegno**, e l'ordine è questo:

1. **Il disegno del grafo**: gli archi fra posizioni libere, il nodo d'innesco in testa, le porte, l'etichetta
   sull'arco, il nodo terminale che non esce. Il modello c'è tutto e le prove sono verdi: si disegna soltanto.
2. **Il trascinamento**, che è la richiesta dell'utente: la matematica è già misurata (1 px del canvas = `zoom` px
   di schermo, esatto), l'aggancio è a 18 px sui punti che il canvas già disegna, i limiti sono la banda da 1008.
3. **«Riordina» subito dopo**, non alla fine: la revisione incrociata ha misurato che **il trascinamento libero
   senza riordino rende il canvas più lento, non più veloce**. La serpentina che c'è già diventa il pulsante.
4. **Collegare**: tirare da una porta, e il rilascio nel vuoto che crea il passo già collegato (l'idea di UX
   migliore di n8n).
5. **Lo zoom interno e la mini-mappa**, che il riferimento ha già ed è misurato si possano fare.
6. **Il «+» sul connettore**, la selezione multipla e le scorciatoie.
7. **Il telefono**, per ultimo, e con una misura in mano: la colonna è 348 px, una card 318, quindi i rami lì non
   si affiancano.

**Prima di disegnare, tre punti ciechi da chiudere** (stanno per esteso nella «Versione 23»): che aspetto ha un
ramo mai percorso nella tab misurata; se un flusso biforcato produce una voce o *n* nella tendina; e le parole che
il prodotto stampa (ne girano sei per il connettore).

**Che cosa c'è già, e non va rifatto**: il ramo (`ramoDi`, `ramoAggiungi`, `ramoSposta`, `ramoTogli`, `ramoCampo` in
`dati.js`), la tab a pillola dei due tempi, i tre gesti, e il divieto che vale per tutti e tre — **il nodo del
titolare non si toglie, non si sposta e non si scavalca**, e sta nel modello, non nel gesto.

**Le tre domande che l'editor lascia aperte** (nessuna è stata decisa, e almeno le prime due sono dubbi progettuali):
1. **Che cosa vuol dire salvare una prossima volta.** Diventa una routine? Cambia il workflow? Resta una proposta
   che il titolare approva? Oggi non c'è nessun pulsante e nessuna promessa: la regola 26 lo vieta finché non si sa.
2. **Chi approva un passo scritto a mano.** La revisione incrociata l'ha chiesto e nessuno dei cinque consiglieri
   l'aveva detto: comporre una routine con la clausola «libera» vuol dire che il titolare **smette** di firmare
   quelle uscite. Tocca la spina dorsale, non solo il canvas.
3. **Che cosa vede il titolare quando il dichiarato e il misurato non coincidono** — cioè quando la prossima volta
   è andata diversamente da come era scritta.

**Poi il candidato 8, i connettori** — l'ultimo dei tre, e il più lungo. Aspetta ancora le sue risposte: se il
verdetto va bene (**credenziale dell'azienda nominata per cliente**, **permesso d'uso del dipartimento** — cioè la
sua ipotesi, sulla metà che il consiglio non aveva votato), se la parola è **«accesso»**, e se il Dipartimento
spende una sezione per «che cosa può toccare». Prima del codice servono una **regola di disegno nuova** (l'accesso
quadrato e monocromo, mai tondo — la regola 19 vieta il disco in tinta per un oggetto che non è una persona) e due
icone che nello sprite non ci sono (**chiave**, **busta**).

**Poi il candidato 5, la chat di dipartimento**: le due domande che lo bloccavano hanno risposta (decisioni 41 e
42). Non manca una decisione, manca il codice.

**Resta da sentire il giudizio sulle versioni 17, 18 e 19** (mai dato), e sulla **21**: le pagine della Console sono
più strette e più alte, ed è un cambiamento che si vede su tutte e nove. Se manda correzioni, quelle vengono prima.

**Non rimettere in discussione**: la direzione A, la barra «Oggi in azienda» della versione 16 con la correzione
16a, la versione 17, la regola 26 delle frecce, il conto nel titolo a 36, le due risposte del candidato 5
(decisioni 41 e 42), gli avatar della versione 10, la regola «niente emoji», la **decisione 45** (candidato 6,
strada A, parola «consegna»), la **decisione 46** (canvas a nodi vero, parola «workflow», delega spenta, specimen
ripuntato, ripetizione della consegna lasciata com'è) e le **decisioni 57 e 58** (soffitto con avviso, ferma prima
del passo).

**Il metodo di sempre**, con quattro lezioni fresche (le tre della versione 20, più una della 21):
- **Una misura batte un consiglio unanime, e va cercata prima di votare.** Cinque consiglieri su cinque hanno
  risposto «il nodo è un dipendente» e tutti e cinque hanno poi scritto da soli l'obiezione giusta. Bastava
  contare: **zero passaggi di mano nei dati**. La regola «quello che si misura si misura» vale anche *dentro* una
  domanda che sembrava tutta di opinione. **Nella versione 21 è successo di nuovo**: il consiglio aveva concesso al
  canvas l'eccezione alla banda («da cinque colonne a tre, +41 %»), e bastava misurare — la banda toglie 304 px, non
  i 354 della stima, e stringendo il passo fra i nodi di **6 px** quattro colonne ci stanno. Prezzo vero: un
  workflow su sei cresce di 210 px.
- **Una stima non è una misura, nemmeno se sta in un documento del repository.** È la terza volta che un numero
  scritto a memoria (o stimato una volta e mai riaperto) risulta sbagliato quando si apre la pagina. I 354 px, i
  958 px «migliori dei 1008», le «otto routine» che erano tre: tre numeri, tre errori, tutti e tre in documenti
  scritti bene.
- **Il contesto del consiglio va verificato nel codice prima di scriverlo, non solo scritto per esteso.** Avevo
  messo le quattro regole di approvazione nella pagina sbagliata (Dipendente invece di Richieste) e tutti e cinque
  ci hanno costruito sopra. Il contesto è la parte che decide la qualità della risposta: se è falso, cinque pareri
  valgono zero.
- **Non credere ai revisori più che ai consiglieri.** Due affermazioni della revisione incrociata erano false, e
  sono venute fuori solo aprendo il codice. È la quarta volta in questo repository che un conto fatto a memoria
  finisce sbagliato in un documento.

Prima e dopo, come sempre: rifare i font locali (`fetch-fonts.py`), lanciare le **cinque** prove di `prove/` e
catturare le pagine prima di toccare qualcosa (`scatta.js --in <cartella>`); dalla versione 22 le prove sono **sei**
e le catture **77**; leggere `CLAUDE.md`,
`SYSTEM-DESIGN.md` (sezioni 2, 6, 8, 9 e 10, regole 24–**28**) e `DIREZIONI.md` (sezione 4 dalla versione 14,
**sezione 6** per l'analisi delle tre proposte, sezione 5 per i file); controllare branch e PR. Alla fine: prove
aggiornate, screenshot con `scatta.js`, artefatti ripubblicati allo stesso indirizzo, i documenti, commit, push e
PR.

**Attenzione, la trappola di questa sessione**: `scatta.js` e `prove/console.js` si reggono su
`section:nth-of-type(2)` per la sezione delle consegne del Dipartimento. Hanno tenuto **perché la versione 20 non
ha aggiunto nessuna sezione** — l'ingresso ai workflow è una pillola dentro un'intestazione. La prossima sezione
che si aggiunge lì rompe tre prove **e due catture**: prima di aggiungerla, spostare quei selettori sul titolo.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): la tendina del passo
dell'Esecuzione; «Ripeti»; lo stato vuoto del dipendente appena creato; il badge rosa «campanella 2» accanto al
numero «da approvare»; il badge «↓12%» del numero «spesi oggi» nella home; `design-system/tokens.css` porta un
easing diverso da quello dello specimen.
Punti aperti della versione 15: nell'agenda «Sposta» porta all'agenda ma non sposta davvero l'orario e i giorni
della settimana non si aprono; nella chat il dipendente non risponde da solo e non c'è ricerca dentro il filo; il
«non letto» si azzera aprendo il filo e non sopravvive al ricaricamento.
Punti aperti della versione 16: la lista `m.agenda` non la legge più nessuno tranne la barra di prima (`?barra=0`);
nella barra dei passi il «+N da fare» e il «+N fatti» non sono cliccabili.
Punti aperti della versione 17: restano inerti i **36 indicatori** nell'intaglio delle card e le **9 campanelle**
in alto a destra della cornice, 45 in tutto; sul telefono il download e la matita nell'intaglio delle card del
Riepilogo; la ricerca di sezione non ricorda il testo cambiando pagina.
Punti aperti della versione 18: **le 2 frecce dell'anteprima dell'editor** (dichiarate) e le quattro liste miste.
Punti aperti nuovi della versione 20: il canvas **non si trascina e non si collega col mouse** (niente
mini-mappa); i **due numeri non misurati** (soglia ai 5 €, scadenza a 10 esecuzioni); le **due regole fantasma**
del modello (`r16`, `r17`); e a «trenta giorni» **Amministrazione mostra sempre 2 consegne** in tutti e tre i
perimetri, perché le sue richieste decise stanno a giorno 0 e a giorno 34 — è vero, ma fa sembrare le pillole
inerti su quella pagina.

## Strumenti (`design-system/tools/` e `schermate/direzioni/prove/`)

- **Le prove cliccate** (`schermate/direzioni/prove/`, con il README che dice il comando):
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node schermate/direzioni/prove/console.js` (**141**: tendine, Richieste, editor del dipendente, esecuzione, 40, la barra
  «Oggi in azienda» e la barra dei passi, i controlli delle intestazioni di sezione e, dalla versione 18, **le frecce di
  riga**: zero inerti su tredici pagine, le 65 liste allineate, il confronto che si apre dalla revisione passata),
  `mobile.js` (**82**: gli otto telefoni, la revisione, le frecce, il rifiuto con motivo, la prova, lo stato vuoto, 40, il
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
  sottoscrizione agli aggiornamenti dell'artefatto **non si registra da questa sessione** (`mint_failed`, e in questa
  sessione `subscribe_forbidden` con un 403: «subscribing requires a session credential», per tutti gli artefatti fino
  alla fine della sessione): non dire che si sta «guardando». La pubblicazione riesce lo stesso.
- **Il conto vero della rilettura, misurato in questa sessione**: la Console 5 713 righe, il telefono 4 700. Blocchi da
  900 righe passano finché le righe sono corte (il motore degli avatar), ma appena si arriva al CSS e alle funzioni
  della Console il limite dei 25 000 token obbliga a scendere a 400–450. In tutto sono servite **13 letture** e circa
  **200 000 token** per i due artefatti: da mettere in conto prima, non alla fine.
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

### 1. Il canvas componibile — metà costruito, e la metà che manca è una domanda sola

**Che cosa c'è**: il ramo (la scelta dell'utente sulla domanda 2), la tab a pillola dei due tempi, i tre gesti
costruiti tutti e tre, e le tre azioni del comporre nel modello — aggiungi, sposta, togli — con il divieto che
protegge il nodo del titolare. Si compone davvero: si aggiunge un passo, lo si sposta, lo si toglie, gli si cambia
il modello, e il canvas si ridisegna con la serpentina che spinge invece di coprire.

**Che cosa manca**, in ordine:
- **la scelta del gesto** (domanda 1), che è dell'utente e ha le sue anteprime;
- **che cosa vuol dire salvare**: oggi `m.rami` vive in memoria e si perde ricaricando, come `m.decidi` e `firme`.
  Nessun pulsante «salva» e nessuna promessa, perché la regola 26 vieta di prometterlo prima di sapere che cosa fa;
- **chi approva un passo scritto a mano**, e che cosa il titolare smette di firmare quando una prossima volta parte
  da sola. È la domanda che tocca la spina dorsale, e la revisione incrociata l'ha nominata mentre i cinque pareri
  no;
- **il telefono**: la schermata 10 mostra il canvas in colonna e **non ha il ramo**. Va deciso se comporre dal
  telefono ha senso, o se lì si legge soltanto.

### 2. Le sei conferme: chiuse

Erano da confermare dalla versione 21 e il prompt di questa sessione diceva di prendere la raccomandazione scritta
accanto a ognuna. Fatto: (a) le regole fantasma restano attribuite alla routine; (b) «Uscita» al posto di
«Approvata»; (c) la precedenza scritta — vince la regola d'azienda; (d) `g4` accesa, e il suo conto dice zero;
(e) la pagina delle routine, fuori dal rail; (f) l'intestazione a due righe dentro la banda. I dettagli con i numeri
stanno qui sopra, in «Versione 22», e le regole **31–35** in `SYSTEM-DESIGN.md`.

**Quello che le conferme hanno aperto, e che nessuno ha ancora deciso**:
- **la soglia di `g4`**. Accenderla non trattiene niente finché resta a 50 €, perché la consegna più cara del
  modello ne costa 33,80. La card adesso lo dice («governa 0 richieste»), ma il numero giusto è una scelta
  dell'utente;
- **i due contrasti a quaranta**. Due richieste sono uscite senza il titolare mentre `g1` dice «Sempre da
  approvare». La pagina li segna in rosa; che cosa il prodotto debba *fare* quando succede — rimandarle in coda,
  spegnere la routine, avvisare — non è deciso.

### 3. Rimasto dalle sessioni precedenti

- Il **tetto giornaliero è già sfondato** (3 dipendenti su 11, 12 su 40; l'azienda al 108 % a undici, 107 % a
  quaranta) e **nessuna pagina lo dice**. I tetti adesso sono nel modello; l'interfaccia no.
- La **pagina Impostazioni** non esiste e la decisione 56 la richiede.
- Il **candidato 8** (i connettori) e il **candidato 5** (la chat di dipartimento, decisioni 41 e 42: risposte date,
  codice mai scritto).
- I giudizi in sospeso delle versioni 6, 8, 11, 12, 14, 15, 15a, 17, 18 e 19; le decisioni 33 e 34 della barra.
- **Che cosa succede quando la firma anticipata si accende davvero**: la riscrittura della spina dorsale.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 23» e «Come riprendere»). Controlla la PR #20: se è unita
riparti da main con un branch nuovo, altrimenti continua sullo stesso branch.

Le decisioni sono già prese e NON si rimettono in discussione (sono le 64–67): il canvas dei workflow diventa un
GRAFO con la complessità di n8n — posizioni libere, fan-out e fan-in illimitati; due connettori dallo stesso nodo
possono dire condizione, parallelo o errore, e il significato sta SUL CONNETTORE, non come porte del nodo; il
titolare resta un nodo e in più l'autorizzazione sta anche in testa al flusso (il nodo d'innesco), così i rami non
devono convergere per forza; e si portano dentro tutti e quattro gli acceleratori di n8n.

Il modello è GIÀ COSTRUITO in dati.js e le sei prove sono verdi (478 verifiche): ramoDi restituisce {nodi, archi},
i nodi hanno id/x/y, gli archi {id, da, a, tipo, se}, più ramoPosiziona (aggancio 18 px), ramoCollega, ramoScollega,
ramoAggiungi, ramoTogli, ramoArco, ramoGradi, ramoNumera, ramoTerminali, ramoEsce, il nodo d'innesco con la
clausola, i quattro RAMO_TIPI e le tre RAMO_CLAUSOLE. Non rifarlo: manca solo il DISEGNO.

Fai il disegno nell'ordine di «Come riprendere»: (1) il grafo disegnato dalle posizioni libere e dagli archi, con
il nodo d'innesco in testa; (2) il trascinamento (la matematica è misurata: 1 px del canvas = zoom px di schermo);
(3) «Riordina» SUBITO DOPO, perché è misurato che il trascinamento libero senza riordino rende il canvas più
lento; (4) collegare tirando da una porta, col rilascio nel vuoto che crea il passo già collegato; (5) zoom interno
e mini-mappa (il riferimento ce li ha, e transform non è zoom: misurato); (6) il «+» sul connettore, selezione
multipla e scorciatoie; (7) il telefono per ultimo (colonna 348 px, card 318: i rami non si affiancano).

Prima di disegnare chiudi i tre punti ciechi che stanno in «Versione 23»: che aspetto ha un ramo mai percorso nella
tab «l'ultima volta», che è misurata; se un flusso biforcato produce una voce o n nella tendina delle approvazioni;
e quali parole stampa il prodotto (ne girano sei per il connettore — il consiglio suggerisce «insieme» e «se…»,
mai «biforcazione»). Sono dubbi progettuali: passali dal consiglio e poi chiedimi la decisione.

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
prima di toccare qualcosa; quello che si misura si misura — in questa sessione la revisione incrociata ha demolito
quattro affermazioni del consiglio aprendo il codice (il telefono che cancellava la firma da mobile, «il parallelo
è gratis», «due biforcazioni riempiono la banda», «il parallelo ha già un dato dietro»). Attenzione: scatta.js e
prove/console.js si reggono ancora su section:nth-of-type(2) per le consegne del Dipartimento. Alla fine: prove
aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo, DIREZIONI.md, SYSTEM-DESIGN.md, i README,
PROSSIMA-SESSIONE.md, commit, push e PR.
```

### Prompt breve, se vuoi solo tirare dritto

```
Leggi CLAUDE.md e PROSSIMA-SESSIONE.md («Versione 23», «Come riprendere»). Controlla la PR #20: se è unita riparti
da main con un branch nuovo. Le decisioni 64–67 sono prese e il modello a grafo è già in dati.js con le prove
verdi: manca solo il disegno. Fallo nell'ordine di «Come riprendere», cominciando dal grafo disegnato e dal
trascinamento, e mettendo «Riordina» subito dopo. Il metodo di sempre, e alla fine prove, screenshot, artefatti,
documenti, commit, push e PR.
```
