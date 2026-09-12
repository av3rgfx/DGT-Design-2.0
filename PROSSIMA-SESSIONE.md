# Prossima sessione — passaggio di consegne
## Versione 33 — quello che il prodotto stampava e nessuno poteva leggere (2026-09-11)

**Nessuna funzione nuova: sei bugie misurate, chiuse.** Niente di quello che c'era è stato rifatto — la versione 32
(i limiti di spesa) resta com'era. Quello che è cambiato è che il prodotto ha **smesso di stampare cose illeggibili
o false**, e ogni correzione è tenuta da una prova che guarda la **classe** e non l'esempio. Prove **692 verdi,
0 ko** (erano 675), catture **84** di cui **33 rifatte**, artefatti ripubblicati allo stesso indirizzo.

Due dubbi progettuali sono passati dal consiglio con la revisione incrociata. **Uno è stato chiuso dal righello** e
costruito (la riga di stato); **l'altro aspetta te, ed è una parola sola**: vedi «La domanda aperta».

### Che cosa c'è adesso

**1. La pillola di stato delle card dice lo stato, e basta.** Accanto al chip c'erano **35,4 px** e «Passo 2 di 4»
ne chiede 70,2: a schermo si leggeva **«Pass…»**, su ogni card, a undici e a quaranta, da quando la card esiste. E
«Chiav…» al posto del motivo dell'errore (46,8 contro 157,6). La risposta era **già scritta** in `SYSTEM-DESIGN.md`
per le card consegna della versione 19 — «lì ci sta il solo chip» — e applicata in **un punto su sei**. Adesso vale
per tutte: In pausa · In corso · Errore · In coda · Da approvare · Libero · In ritardo · Concluso · Da iniziare. Il
passo sta nella pagina Esecuzione e nei Costi, il motivo dell'errore nella pagina Esecuzione, l'ora nella riga sotto
il titolo.

**2. Il lime ha smesso di dire due cose.** La classe `lav` dipingeva le righe di chi è **al lavoro** nella home e di
chi è **oltre il budget** nei Costi: stessa tinta, stessa taglia, due significati — e il lime è la firma del
titolare (versione 22). Nei Costi lo dice adesso la parola dentro il chip che c'era già: «84 € · **oltre**», 69,8 px,
zero tagli su dodici righe (due chip separati ne avrebbero tagliate cinque).

**3. La home ha smesso di dire «al lavoro» sulle righe di chi è fermo.** A quaranta erano **12 righe lime su 12
ferme**, mentre il primo numero della stessa pagina diceva «12 in pausa». È lo stesso difetto che la versione 31 è
servita a togliere dai numeri, sopravvissuto nella riga compatta.

**4. La richiesta che sblocca l'azienda è la prima della coda, e sa dire chi è.** Era la n. 2 di 5 a undici e la
**n. 7 di 8** a quaranta, perché cadeva dove la portava la sua ora. E stampava «**undefined** · 10:42» con l'icona
rotta (sul telefono «undefined · 0 €»), perché `tipo: 'tetto'` non stava in `iconaTipo`/`nomeTipo`; e «0 € · 0
passi», che di quella richiesta è falso due volte. Adesso: prima in coda, «Tetto d'azienda», «**+21 € per oggi**»
(29 a quaranta). L'ordine della coda è passato **nel modello** (`m.codaAttesa`), così Console e telefono non lo
ricalcolano ognuno per conto suo.

**5. I tre numeri di Impostazioni non nascono più sotto la tendina.** Il terzo stava **tutto** oltre i 1110 px dove
la tendina comincia (x 1001-1296 a undici, 1049-1343 a quaranta). La prova che tiene le intestazioni **elenca le
pagine a mano** e quella, nata nella versione 32, non c'era. Tolte dalle etichette le spese che la barra in cima
stampa già — e che contraddicevano il commento scritto due righe sopra — i tre numeri stanno in 936 px su 992.

**6. Due difetti vecchi, chiusi.** La regola `g4` era «Attiva» nelle Richieste e «Spenta» in ogni pagina Dipendente:
i dossier ne tenevano una **copia** ferma a prima della versione 22. E `a-workflow-firma.png`, l'unica cattura
instabile (2 volte su 11), esce adesso **identica 12 volte su 12**.

### La cattura instabile non era instabile: era la cattura

Misurato, non ipotizzato: il clic sulla pillola fa **scorrere la pagina di 614 px** per portarla in vista, e la
cattura a pagina intera dipinge gli elementi `position:fixed` (le due linguette del titolare) **una volta sola** —
a 240 px se è passato un fotogramma dallo scorrimento, a **854** (= 240 + 614) se no. Non è il prodotto, è Chromium.
`scatta.js` non conta più 300 ms fissi: aspetta la fine di transizioni e animazioni (solo quelle che finiscono),
riporta lo scorrimento a zero e lascia passare due fotogrammi.

### La domanda aperta — **e aspetta te, è una parola**

**Il tetto sfondato resta rosa, o va neutro come tutto il resto?**

Il consiglio si è spaccato **2 a 2** (uno per il rosa dappertutto), e lo scontro è solo sul tetto. Il colore è tuo
da decidere dalla versione 31, dove l'avevi lasciato «per non deciderlo da soli».

| | che cosa vuol dire | prezzo, contato |
|---|---|---|
| **Rosa solo al tetto** | il tetto resta rosa perché **ferma il lavoro** e rompe una promessa che hai fatto tu; i budget facoltativi, che non fermano niente, diventano neutri | 11 righe, 0 prove, **6 catture**. La regola 4 diventa «rosa = errori, cali e tetto sfondato» |
| **Neutro dappertutto** | sfondare un limite è un **fatto**, non un allarme: il segnale è la richiesta lime in coda, che c'è già | 14 righe, 0 prove, 16 catture. La regola 4 resta **intatta** |

L'argomento più forte per il neutro l'ha trovato la revisione incrociata: **la versione 32 ha già deciso che
fermarsi per il tetto non è un errore** — chip «In pausa» neutro, nessun punto sull'avatar (regola 19, «niente da
fermo»). Un prodotto con la **causa rossa e l'effetto grigio** mente in una delle due direzioni. L'argomento più
forte per il rosa: il tetto è l'unico limite che **ferma**, e togliergli il colore lo rende invisibile fuori dalle
due pagine che lo scrivono.

Intanto **una cosa è stata fatta comunque**, perché non è una scelta di colore: il badge non usa più la classe
`down`, che nei token si chiama letteralmente «badge in calo», per una **salita**. La tinta è identica; cambiarla,
quando avrai deciso, costa **una riga sola** invece di quattro.

### Che cosa ha corretto la revisione incrociata

Come sempre, ha spostato la risposta più dei pareri.

| scritto | vero |
|---|---|
| la pillola lascia al testo **45,4 px** (nel contesto che avevo scritto io) | **35,4**: gli addendi fanno 136,6, non 126,6 — e quattro consiglieri su cinque ci avevano fatto aritmetica sopra |
| «i passi non hanno **mai due cifre**», quindi «2 di 4» basta | a quaranta esiste **«Passo 7 di 10»**, e «7 di 10» chiede 37,3 px: la forma corta muore alla taglia grande |
| «l'**occhio** duplica la freccia: si può togliere» | vale solo sulle card al lavoro: su quelle in errore e in coda il cerchio nero è «Riprova»/«Avvia ora» |
| «le specie tagliate sono **tre**» | sono **sei**, e la sesta l'ha trovata la prova nuova, non il censimento: la card della richiesta |

E **due cose che le revisioni davano per vere le ha smentite il righello**, che è la ragione per cui si misura anche
quello che il consiglio afferma:

- «a quaranta il terzo numero dei **Costi** finisce 39 px sotto la tendina»: **falso**. È la *scatola* a sporgere
  (il badge è `position:absolute` e la allarga), non il testo. Sotto la tendina nasceva invece il numero di
  **Impostazioni**, che nessuno aveva guardato;
- «la **campanella** inerte viola la regola 25»: **no**. La regola 25 esenta, dichiarandoli, «i 45 indicatori
  disegnati come cerchi nell'intaglio delle card e nella cornice, che dicono uno stato e vengono dal riferimento».

### I punti ciechi che restano — **da confermare**

1. **Il colore dell'oltre** (sopra): l'unica cosa che aspetta una tua parola.
2. **Il motivo dell'errore non è più sulla card.** La pillola non lo taglia più, ma adesso non lo dice affatto: si
   legge aprendo l'esecuzione. Una revisione ha fatto notare che quel motivo **governa il pulsante che sta sulla
   stessa card** — «Chiavi di accesso scadute» dice che «Riprova» è inutile — e proponeva di metterlo nella riga
   sotto il titolo, al posto di «Zenith fallito alle 08:55». Non l'ho fatto: è provato su **una sola** stringa del
   modello (157,6 px su 196), e il primo messaggio più lungo sfonderebbe. Se lo vuoi, è una riga.
3. **Il chevron della pillola non apre niente.** Viene dal riferimento («copiato così com'è») e la regola 25 esenta
   i cerchi, non lui. È lo stesso conflitto già risolto una volta con l'emendamento del verde → lime: va deciso da
   te, non aggirato.
4. **La card in coda ha cambiato chip**: era l'ora, adesso è la parola «In coda» (l'ora la riga sotto il titolo la
   diceva già: era lo stesso numero due volte). La regola 18, che nominava «l'ora» fra i chip possibili, è stata
   aggiornata di conseguenza.
5. **Il primo numero della home a quaranta**: «12 in pausa» è giusto, ma le 12 righe della sezione Dipendenti
   adesso non sono più lime e la pagina è **più spenta**. È il vero, ma cambia il colpo d'occhio.

### Quello che resta aperto dalle versioni scorse

- la **deviazione su `attesa`** della versione 32 (chi è fermo resta in `lavoro` con `e.pausa`, non passa in
  `attesa`): le tre misure che l'hanno decisa stanno in «La deviazione, e perché», più sotto. Sempre da confermare;
- i **quattro punti ciechi** della versione 32 che non erano il lime (la richiesta del tetto che cade nel «Da
  approvare» di un dipartimento; la pausa del titolare irraggiungibile finché il tetto ferma);
- i candidati che aspettano dati: connettori, chat di dipartimento, decisioni 68, 69 e 75.

## Come riprendere (dalla versione 33)

1. **Il metodo di sempre**: rifare i font locali, lanciare le sei prove e catturare **prima** di toccare qualcosa.
   In questa sessione le 84 catture di partenza erano identiche al byte, **compresa** quella che fino a ieri era
   instabile.
2. **La prima cosa da chiedere all'utente** è il colore dell'oltre (sopra). Tutto il resto della 33 è costruito e
   verde.
3. **Dove sta cosa, adesso**:
   - la riga di stato delle card: `cardAttivita`, `cardEsecuzione`, `cardObiettivo`, `cardUltima`, `cardRichiesta`
     in `direzione-a.js` — cinque funzioni, la stessa regola;
   - l'ordine della coda: `codaAttesa` in `dati.js`, e i due chiamanti (`inAttesa` nella Console, `coda` sul
     telefono) che adesso non calcolano più niente;
   - il costo di una richiesta: `costoRichiesta` e `passiRichiesta` in `componenti.js`, condivisi dalle due
     superfici;
   - il badge di un limite sfondato: `.badge.oltre` in `componenti.js` — **una riga**, se il colore cambia;
   - le regole del dossier: `allineaPermessi` in `dati.js`, che le fa seguire a `m.regole`;
   - l'attesa delle catture: `fermo(page)` in `scatta.js`.
4. **Trappole nuove, misurate in questa sessione**:
   - **un commento con i backtick dentro un template literal CSS rompe il file in silenzio.** È scritto nel
     passaggio di consegne della versione 32 e ci sono ricascato lo stesso: `node --check` lo prende subito, il
     browser no fino al caricamento. Nei commenti del CSS si scrivono i nomi delle classi senza apici inversi;
   - **una prova che elenca le pagine a mano va allungata quando ne nasce una.** La pagina Impostazioni è rimasta
     fuori dalla verifica delle intestazioni per una versione intera;
   - **misurare la scatola non è misurare il testo.** Il badge `position:absolute` allarga `.stat` di decine di px
     oltre l'ultima lettera: la verifica delle intestazioni adesso usa un `Range` sul nodo di testo;
   - **cambiare l'ordine della coda cambia le prove che cliccano «approva»**: la prima richiesta non è più quella
     che era. Una prova dei Costi l'ha presa subito, ed è stata riscritta per firmare due volte (prima il tetto, poi
     la consegna) invece di dare per scontato chi sta in cima.
5. **Numeri da non rifidarsi a memoria** — in questa sessione ne sono risultati falsi **sei**: i 45,4 px liberi
   nella pillola, i passi «mai a due cifre», le tre specie tagliate, l'occhio che duplica la freccia su tutte le
   card, il numero dei Costi sotto la tendina e la campanella che violerebbe la regola 25. Quattro venivano dal
   contesto che avevo scritto io, due dalle revisioni.

## Stato alla fine della versione 33

- **Branch**: `claude/spending-limits-architecture-4gb9a0`, ripartito da `main` dopo l'unione delle PR #23 e #24.
- **Prove**: **692 verdi, 0 ko** (erano 675) — Console **214**, telefono **92**, Costi **53**, Agenda e Chat 56,
  Workflow 225, Routine **52**.
- **Catture**: **84**, di cui **33 rifatte**. Prima di toccare il codice erano state rifatte e confrontate una a
  una col «prima»: **84 identiche al byte**, compresa `a-workflow-firma.png`, che nella versione 31 non lo era.
- **Codice toccato**: `componenti.js` (il tipo `tetto`, `costoRichiesta`, `passiRichiesta`, `.badge.oltre`),
  `dati.js` (`codaAttesa`, `allineaPermessi`, il titolo della richiesta del tetto), `direzione-a.js` (le cinque
  card, la riga compatta della home e dei Costi, le etichette di Impostazioni, i quattro badge), `mobile.js` (la
  coda e i tre punti che stampavano il costo), `scatta.js` (l'attesa deterministica), e quattro prove più
  `visibile.js`.
- **Artefatti**: **ripubblicati allo stesso indirizzo** — la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9).
- **Quello che aspetta l'utente**: **il colore dell'oltre**, più i cinque punti ciechi qui sopra e la deviazione su
  `attesa` della versione 32.
- **La consegna allo sviluppo**: il titolare ha dichiarato il design completo e ha chiesto un pacchetto con cui
  iniziare il prodotto in un **repository nuovo**, con qualunque agente di codice e senza file di istruzioni per
  uno strumento in particolare. Sta in `consegna-sviluppo/`: `README.md` (il punto d'ingresso), il modello di
  dominio estratto da `dati.js`, le 48 regole riscritte come regole di prodotto, il sistema di design, le
  invarianti estratte dalle sei prove, le decisioni aperte, l'inventario file per file, le fixture JSON a undici e
  a quaranta, il prompt di avvio. La cartella è **autosufficiente**: contiene già le copie del sistema di design,
  dei due riferimenti e di trenta catture, 15 MB in tutto, e si porta con un `cp -r`. `aggiorna-copie.sh` serve
  solo a chi continua il design, per rinfrescare quelle copie quando una sorgente cambia. La ragione del
  repository nuovo, misurata: 275 MB di storia git e 7 792 righe di cronaca su 9 407 di documenti.

## Pronto per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 33», «La domanda aperta», «Come riprendere (dalla versione
33)» e «Stato alla fine della versione 33»). Controlla la PR aperta sul branch
claude/spending-limits-architecture-4gb9a0: se è unita riparti da main tenendo lo stesso nome di branch.

Nella versione 33 non è nata nessuna funzione: sono state chiuse SEI cose che il prodotto stampava e nessuno
poteva leggere, o che dicevano il falso. La pillola di stato delle card dice adesso lo stato e basta (accanto al
chip c'erano 35,4 px e «Passo 2 di 4» ne chiede 70,2: si leggeva «Pass…» da sempre, e la risposta era già scritta
nel sistema di design per le card consegna della versione 19). Il lime ha smesso di dire due cose: nei Costi
l'oltre lo dice la parola dentro il chip («84 € · oltre») e nella home le righe di chi il tetto ha fermato non
sono più lime. La richiesta che sblocca l'azienda è la prima della coda, si chiama «Tetto d'azienda» invece di
«undefined» e dice «+21 € per oggi» invece di «0 € · 0 passi». I tre numeri di Impostazioni non nascono più sotto
la tendina. E due difetti vecchi sono chiusi: g4 diceva «Attiva» in una pagina e «Spenta» in un'altra, e la
cattura instabile adesso esce identica 12 volte su 12. 692 prove verdi, 84 catture, artefatti ripubblicati.

LA PRIMA COSA: ti devo una parola sola, ed è un colore. «Il tetto sfondato resta ROSA, o va NEUTRO come tutto il
resto?» Il consiglio si è spaccato 2 a 2. Per il neutro: la versione 32 ha già deciso che fermarsi per il tetto
non è un errore (chip «In pausa» neutro, nessun punto sull'avatar), e un prodotto con la causa rossa e l'effetto
grigio mente in una delle due direzioni. Per il rosa: il tetto è l'unico limite che FERMA, e senza colore diventa
invisibile fuori dalle due pagine che lo scrivono. Prezzo: rosa-solo-al-tetto 11 righe e 6 catture, neutro 14
righe e 16 catture, zero prove rotte in tutti e due i casi. Nel frattempo il badge ha una classe sua con la
stessa tinta: cambiare colore costa UNA riga.

Restano poi cinque punti ciechi (il motivo dell'errore che la card non dice più; il chevron della pillola che non
apre niente e viene dal riferimento; il chip della card in coda passato dall'ora alla parola; la home a quaranta
più spenta), la deviazione su «attesa» della versione 32, e i candidati che aspettano dati (connettori, chat di
dipartimento, decisioni 68, 69 e 75).

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura, e vale anche per quello che dice il consiglio: nella
33 il righello ha smentito DUE cose che le revisioni davano per vere. Ogni dubbio progettuale passa dal consiglio
(llm-council) con la revisione incrociata: nella 33 ha corretto quattro numeri del contesto che avevo scritto io,
compreso quello su cui quattro consiglieri su cinque avevano fatto aritmetica.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo (lo strumento vuole che si
legga per intero la copia viva: conviene farlo fare a un sottoagente), DIREZIONI.md, SYSTEM-DESIGN.md, i README,
PROSSIMA-SESSIONE.md, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
cd schermate/direzioni && node build-unico.js direzione-a.html <out>.html   # i due file unici per gli artefatti
cd schermate/direzioni && node build-unico.js mobile.html <out>.html
```

## Versione 32 — i limiti di spesa, e il prodotto che si apre fermo (2026-09-09)

**Le sette risposte della versione 31 sono state costruite tutte.** Il tetto d'azienda lo pone il titolare, esiste
la pagina **Impostazioni** (il primo posto del prodotto dove si scrive un numero), i limiti sono in euro con la
percentuale come **gesto**, il dipartimento parte senza budget, il **freno è cablato davvero** e il prodotto **si
apre fermo**, e `m.decidi` ha imparato a portare una **cifra**. Prove **675 verdi, 0 ko** (erano 638), catture
**84** (erano 82; 70 rifatte), artefatti **ripubblicati allo stesso indirizzo**.

Resta **una cosa da confermare**, ed è una deviazione consapevole da una delle sette risposte: vedi
«La deviazione, e perché».

### Che cosa c'è adesso, in ordine di costruzione

**1. Il tetto d'azienda è un numero posto, non una somma.** `tettoAzienda()` era `sommaBudget()`. Adesso è quello
che il titolare ha scritto, e la somma sopravvive solo come `propostaTetto()`, che è quello che Impostazioni
offre alla prima apertura. La differenza è una riga di prova: **si assume un dipendente e la proposta sale a
125 € mentre il tetto resta 115.**

**2. La pagina Impostazioni.** Quattro sezioni, **diciotto campi scrivibili** a undici: il tetto del giorno, il
tetto del mese, **l'eccezione di oggi**, il freno (*Ferma* / *Avverte*), la proposta con la pillola che ci
riporta; i quattro dipartimenti; le tre routine (giorno e mese, e la settimana **solo** su quella settimanale);
e un'ultima sezione che **conta e porta** agli altri due livelli invece di rifarli. Nessun settimo cerchio nel
rail: si entra dal «124 € su 115 €» della home e dai Costi, e resta acceso il cerchio dell'euro.

Gli altri due livelli non stanno lì, e non per dimenticanza: **il budget di un dipendente sta nella sua pagina**
(la foglia, regola 1) — e lì la penna ha smesso di essere decorazione, adesso ci sono i due campi — e **la soglia
di un workflow sta nel suo canvas**, dove esiste dalla versione 25. A quaranta un elenco di 40 campi cadrebbe
sulla regola 3, e la forma compatta la barra del budget non ce l'ha.

**3. La percentuale è un gesto.** Si scrive «60 %» in un campo, il prodotto risponde `69` e la riga sotto dice
«60 % di 115 € al giorno». Spariti `tetti.dip` in percentuale, `soffittoDi`, `sommaSoffitti` e `avvisoSopra100`
(che non avrebbe potuto scattare mai). Le due righe di `prove/workflow.js` che li leggevano dentro un
`page.evaluate` **senza try/catch** sono state sistemate per prime, come il passaggio di consegne avvertiva.

**4. Il dipartimento parte senza soffitto**, e `cardCostoDip` dice «61 € oggi · nessun budget» invece di «su
30 €».

**5. Il freno è cablato, e il prodotto si apre fermo.** 3 esecuzioni su 3 a undici, 12 su 12 a quaranta. Come lo
si vede:

| dove | prima | adesso |
|---|---|---|
| barra «Oggi in azienda» | «3 al lavoro» | «3 **in pausa · tetto**», stessi avatar, stesso conto |
| telefono, quadro del giorno | «3 al lavoro» | «3 **in pausa**» (53 px di etichetta: «in pausa · tetto» ne chiede 71) |
| home, primo numero e titolo | «3 al lavoro» · «Al lavoro adesso» | «3 in pausa» · «**Ferme per il tetto**» |
| card e righe | chip lime «In corso», punto lime | chip «In pausa», **nessun punto** (regola 19) |
| pagina Esecuzione | — | «Ferma per il tetto d'azienda al passo 2 di 4…» e «Alza il tetto d'azienda» |

**Niente quinta casella**, e il righello dice perché: sul telefono lo stesso quadro è una griglia due per due con
una prova che asserisce **quattro caselle esatte**, e una quinta la farebbe diventare tre righe (+57,5 px contro
14-20 px di margine).

**6. Lo sblocco porta una cifra.** `m.decidi(id, stato, commento, esitoRevisione, **importo**)`, e la richiesta ha
`importo`. È **una** richiesta per tutta l'azienda — «Tetto del giorno raggiunto: 124 € su 115 €» — e la cifra è
il **costo dichiarato del passo che sfonderebbe** (21 € a undici, 29 a quaranta). Approvandola il tetto sale
**solo per oggi**, e chi era fermo riparte da solo.

### La deviazione, e perché — **da confermare**

La quinta risposta diceva: «**nessuno stato nuovo**: chi è fermo resta in `attesa`». Il vincolo — nessuno stato
nuovo — è rispettato. Il posto dove appoggiarlo **no**: chi è fermo resta in `lavoro` con `e.pausa` e
`pausaPer: 'tetto'`, non passa in `attesa`. Tre misure hanno spostato la scelta:

1. `attesa` significa, nel modello e nelle pagine, «**ha consegnato** e aspetta l'approvazione», e la sua parola
   breve è «**Da approvare**». Su chi non ha consegnato niente sarebbe falsa, ed è la stessa specie di difetto che
   la versione 31 è servita a togliere;
2. il punto dell'avatar di `attesa` è **giallo** (regola 19: giallo = da approvare). Chi è fermo non deve avere
   nessun punto;
3. `m.alLavoro` si svuoterebbe: la sezione «Al lavoro adesso» della home sparirebbe con tutte le sue card, e cinque
   verifiche cadrebbero.

`e.pausa` invece **il prodotto ce l'aveva già**, in sette punti: il chip «In pausa» lo stampa il componente
condiviso (quindi Console e telefono dicono la stessa parola), il punto si spegne da sé, la pagina Esecuzione
aveva già la frase, la pillola e il log. Non è uno stato nuovo: è un attributo ortogonale che esisteva.
**Se preferisci `attesa` lo stesso, si cambia in poche righe — ma quelle tre conseguenze restano.**

### Il consiglio: come si vede il fermo e come si sblocca

Cinque pareri, revisione incrociata su cinque angoli (i fatti nel codice, il costo su prove e catture, le regole e
la lingua, la spina dorsale e il carico, la prova dei quaranta).

**Dove il consiglio è d'accordo**: nessuno stato nuovo; il fermo si dice con quello che il prodotto ha già; lo
sblocco non è una richiesta per esecuzione. **Dove si scontra**: se la coda lime può contenere una decisione che
non è un'uscita (due sì, tre no), e se il tetto ferma anche chi è già in volo (uno solo dice di no).

**Le quattro cose che la revisione incrociata ha corretto, tutte verificate col righello.** Tre erano numeri
scritti da me nel contesto, e tutti e cinque i consiglieri ci avevano fatto aritmetica sopra:

| scritto | vero |
|---|---|
| la quinta casella costa **107 px** | **163,4** — la prima misura aveva cancellato metà del testo prima di misurarlo |
| la barra sta su **25** catture | **41** portano quella viva (44 ne portano una in quel posto: 3 sono la barra archiviata dietro `?barra=0`) |
| finire la giornata costa **+49 €** | **+89** a undici e **+566** a quaranta: le **pianificate** valgono altri 40,80 € (144 a quaranta), e nessuno le aveva contate |
| «un sesto stato tocca **42 punti in 5 file**» (dalla versione 31) | `m.STATI[e.stato].breve` compare **una volta sola, in un file solo**. Il raggio vero di uno stato nuovo sono le **165** comparazioni `.stato === '…'` in sei file: molto di più, ma la superficie di **crash** era una |

**Quello che nessuno dei cinque aveva detto, e che ha deciso due scelte**: il costo dei passi che restano è una
**stima** (`stimaPasso` lo dichiara), e la regola 40 di questo repository dice che quello che è previsto non si
stampa come misurato. Per questo la richiesta chiede **il passo**, non la giornata. E: `chipStato` **stampa già**
«In pausa» nel componente condiviso — la parola non andava inventata.

### I punti ciechi che restano — **da confermare**

1. **La deviazione su `attesa`** (sopra): è l'unica cosa che aspetta una tua parola.
2. **Il rosa di «oltre il limite»** contro la regola 4 (rosa solo per errori e cali): resta com'era, non l'ho
   deciso da solo. Adesso però c'è un posto in più dove si vede.
3. **Il lime su chi è oltre il budget**: `rigaCostoCompatta` dipinge di lime le righe sfondate a quaranta, e il
   lime è la firma del titolare. È un difetto vivo, trovato dalla revisione incrociata, e non è di questa
   sessione.
4. **La richiesta del tetto sta nel «Da approvare» di un dipartimento** (quello del passo che sfonderebbe): è
   coerente con la regola 2 — ogni euro risale a un dipendente e a un'esecuzione — ma è la prima richiesta che
   parla dell'azienda intera, e a quaranta cade in Amministrazione invece che in Sviluppo.
5. **La pausa del titolare non è raggiungibile all'apertura**: col tetto che ferma tutto, «Metti in pausa» non
   compare finché il tetto non si alza. È una conseguenza voluta del «si apre fermo», ma va guardata.

### Quello che è rimasto aperto dalle versioni scorse, e non è stato toccato

- la riga di stato delle card «Al lavoro adesso» è **già tagliata** (39 px contro 71: si legge «Pass…») — e
  *come* sistemarla è una scelta con più risposte, quindi passa dal consiglio;
- la regola `g4` è **«Attiva»** nelle Richieste e **«Spenta»** nel Dipendente (`dati.js:1274` contro `:282/:369/:467`);
- `a-workflow-firma.png` è **instabile di suo** (2 volte su 11): è l'unica cattura che fa un clic e poi aspetta
  300 ms fissi invece della fine della transizione.

(`avvisoSopra100`, che era il terzo di questi difetti, **non esiste più**: è morto con la percentuale.)

## Come riprendere (dalla versione 32)

1. **Il metodo di sempre**: rifare i font locali, lanciare le sei prove di `prove/` e catturare **prima** di
   toccare qualcosa, poi confrontare a codice immutato. In questa sessione le 82 catture di partenza erano
   **identiche al byte**, compresa quella instabile.
2. **La prima cosa da chiedere all'utente** è la conferma della deviazione su `attesa` (sopra). Tutto il resto
   della versione 32 è costruito e verde.
3. **Dove sta cosa, adesso**:
   - il modello dei limiti: `dati.js`, `tetti` / `tettoAzienda` / `tettoOggi` / `propostaTetto` / `budgetDip` /
     `leggiLimite` / `poniLimite` / `orizzontiDi`;
   - il freno: `fermePerTetto` / `passoFermo` / `applicaTetto` / `richiestaTetto` / `aggiornaTetto`, e
     `decidi(..., importo)`;
   - la pagina: `impostazioni()` in `direzione-a.js`, con `campoLimite` e `rigaLimite`; la scrittura è
     `scriviLimite` dentro `monta`, con la guardia di rientro (senza, il `blur` del campo rientra in mezzo al
     disegno e la console prende due `pageerror`);
   - la parola: `parolaLavoro` in `direzione-a.js` **e** in `mobile.js`.
4. **Trappole nuove, misurate in questa sessione**:
   - `tutto()` rifà `radice.innerHTML`: qualunque campo di testo che scrive e ridisegna ha bisogno della guardia
     di rientro e del fuoco rimesso a mano, come fa già la ricerca di sezione;
   - un commento con i **backtick** dentro un template literal (il CSS delle pagine, il CSS dell'avatar) rompe il
     file in silenzio: `node --check` lo prende, il browser no fino al caricamento;
   - la prova degli **errori muti** del CSS chiede che nessuna variabile sia usata senza essere definita da
     qualche parte: con tutti gli avatar fermi, `--segnale-c` non era più definita da nessun elemento in linea, e
     la prova è diventata rossa. Adesso ha un valore di ripiego nel foglio;
   - `vai()` nelle prove fa `page.goto`, quindi **rifà il modello**: quello che si scrive in Impostazioni si perde.
     Per provare una scrittura bisogna **camminare dentro il prodotto** con i clic, come fa il titolare.
5. **Numeri da non rifidarsi a memoria** — in questa sessione ne sono risultati falsi **quattro**, tutti scritti
   in un documento: i px della quinta casella, le catture con la barra, il costo per finire la giornata, e i «42
   punti in 5 file». Quello che si misura si misura.

## Stato alla fine della versione 32

- **Branch**: `claude/spending-limits-company-cap-p6rjiw`, ripartito da `main` dopo l'unione della PR #23.
- **Prove**: **675 verdi, 0 ko** (erano 638) — Console **201**, mobile 91, Costi 51, Agenda e Chat 56,
  Workflow **225**, Routine **51**.
- **Catture**: **84** (erano 82), di cui **70 rifatte** e 2 nuove (`a-impostazioni`, `a-impostazioni-40`).
- **Codice toccato**: `dati.js` (i limiti, il freno, la richiesta del tetto, `decidi` col quinto parametro),
  `direzione-a.js` (la pagina Impostazioni, la barra, le card, la pagina Esecuzione, la pagina Dipendente, i
  Costi), `mobile.js` (il quadro del giorno e i due numeri), `componenti.js` (il punto dell'avatar di chi è in
  pausa, per tutte e due le superfici), `avatar-orbe.js` (il ripiego di `--segnale-c`), le cinque prove e
  `scatta.js`.
- **Artefatti**: **ripubblicati allo stesso indirizzo** — la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9).
- **Quello che aspetta l'utente**: **una cosa sola**, la deviazione su `attesa`. Più i cinque punti ciechi qui
  sopra e i tre difetti aperti dalle versioni scorse.

## Pronto per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 32», «La deviazione, e perché», «Come riprendere (dalla
versione 32)» e «Stato alla fine della versione 32»). Controlla la PR aperta sul branch
claude/spending-limits-company-cap-p6rjiw: se è unita riparti da main tenendo lo stesso nome di branch.

Nella versione 32 i limiti di spesa sono costruiti tutti e sette: il tetto d'azienda lo pongo io (e assumere non
lo muove più), c'è la pagina IMPOSTAZIONI con diciotto campi scrivibili — il primo posto del prodotto dove si
scrive un numero — la percentuale è un gesto («60 %» → 69 € con la riga che dice da dove viene), il dipartimento
parte senza budget, il freno è cablato e il prodotto SI APRE FERMO, e lo sblocco è una richiesta lime che porta
una cifra. 675 prove verdi, 84 catture, artefatti ripubblicati. Quella parte è chiusa e non va rifatta.

LA PRIMA COSA: ti devo confermare UNA deviazione. Avevo detto «chi è fermo resta in attesa»; il codice invece
lascia lo stato «lavoro» e usa e.pausa con pausaPer:'tetto', perché attesa vuol dire «ha consegnato» (chip «Da
approvare», punto giallo) e svuoterebbe la sezione «Al lavoro adesso». Le tre misure stanno in «La deviazione, e
perché». Chiedimelo prima di costruire altro.

Poi restano cinque punti ciechi e tre difetti aperti, e sono elencati là dentro: il rosa di «oltre il limite»
contro la regola 4; il LIME su chi è oltre il budget in rigaCostoCompatta a quaranta (difetto vivo, la firma del
titolare usata per un'altra cosa); la richiesta del tetto che cade nel «Da approvare» di un dipartimento; la
pausa del titolare irraggiungibile finché il tetto ferma; la riga di stato delle card «Al lavoro adesso» già
tagliata (39 px contro 71: «Pass…»), che è una scelta e quindi passa dal consiglio; la regola g4 «Attiva» nelle
Richieste e «Spenta» nel Dipendente; e a-workflow-firma.png instabile di suo.

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura. Ogni dubbio progettuale passa dal consiglio
(llm-council) con la revisione incrociata: nella 32 ha corretto QUATTRO numeri scritti nei documenti, compresi i
«42 punti in 5 file» che erano uno solo.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo (conviene farlo fare a un
sottoagente: lo strumento vuole che si legga per intero la copia viva), DIREZIONI.md, SYSTEM-DESIGN.md, i README,
PROSSIMA-SESSIONE.md, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
cd schermate/direzioni && node build-unico.js direzione-a.html <out>.html   # i due file unici per gli artefatti
cd schermate/direzioni && node build-unico.js mobile.html <out>.html
```

## Versione 31 — il tetto sfondato che la home diceva al contrario (2026-09-09)

**Due consigli, cinque decisioni dell'utente, e la parte decisa disegnata.** La domanda era «che cosa dice la home
quando 3 dipendenti su 11 hanno sfondato il tetto del giorno». La revisione incrociata l'ha spostata: **la home non
tace, parla e dice il falso**, e il tetto che dovrebbe fermare non ferma. L'utente ha deciso, e quello che le sue
risposte hanno chiuso è stato scritto: **638 verifiche verdi, 0 ko** (erano 619), **82 catture** di cui 28 rifatte,
artefatti ripubblicati. Resta aperta **la disposizione dei limiti**, su cui il consiglio è passato una seconda
volta e il verdetto aspetta conferma.

### Quello che c'era da misurare, misurato

Il fatto, rimisurato aprendo le pagine:

| | a **undici** | a **quaranta** |
|---|---|---|
| dipendenti sopra il tetto **del giorno** | **3 su 11** | **12 su 40** |
| l'azienda, sul tetto del giorno | 124 € su 115 € = **108 %** | 427 € su 400 € = **107 %** |
| sopra il tetto **del mese** | 0 | 2 |
| l'azienda, sul mese | 613 € su 1 580 € = **39 %** | 2 154 € su 5 120 € = **42 %** |

E tre incroci che nessuno aveva contato:

- **chi è oltre il tetto è chi è al lavoro**: a undici sono **le stesse tre persone** (3 su 3), a quaranta 11 su 12.
  La barra «Oggi in azienda» le conta già, sotto la parola «al lavoro»;
- **la somma degli sfondamenti individuali è nove volte quello d'azienda**: 81 € contro 9 € a undici (9,00×),
  261 € contro 27 € a quaranta (9,67×). Gli otto che non spendono assorbono quasi tutto;
- **il tetto dichiara di fermare e non ha fermato niente**: `fermaPrimaDelPasso: true` sta in `dati.js:1252` e
  **non lo legge nessuna pagina** (l'unico lettore in tutto il repository è `prove/workflow.js:182`, che lo stampa
  in un log). Lo stato «ferma per tetto» **non esiste** in `STATI`. Idem `avvisoSopra100`, che per giunta non
  potrebbe scattare mai: `sommaSoffitti()` fa 60 e la soglia è 100.

### Il difetto vero non era quello annotato

Il documento diceva «la home non lo dice». **La home lo dice, e dice il contrario del vero.**

- home, terzo numero: **«124 € spesi oggi»** con il badge **`↓ 12 %`** — freccia in giù, tono «calo». Quel 12 % è
  **scritto a mano** (`direzione-a.js:894`): nel modello `costi('oggi').prima` è `null`, non esiste nessun ieri;
- pagina Costi, **lo stesso identico numero**: «124 € spesi oggi» con **«⚠ oltre»**, calcolato.

Il numero della home è per giunta **cliccabile e porta proprio ai Costi**, cioè alla pagina che lo smentisce.

E non è un badge solo. Censiti tutti i badge dell'intestazione su undici pagine, a undici e a quaranta:
**quattro mentono e sei ripetono il numero che gli sta accanto.**

| | dove | che cosa |
|---|---|---|
| **mentono** | home ×3, Richieste ×1 | `↑1` scritto a mano (dice 1 con 12 al lavoro); `Math.min(2, att)` due volte (dice 2 con 4 in coda a undici e con 7 a quaranta); `↓12%` scritto a mano |
| **ripetono** | Richieste ×2, Dipartimento ×2, Dipendente ×1, Chat ×1 | «2 approvate oggi ↑**2**», «4 da rifare ↓**4**», «3 al lavoro ↑**3**», «40 da leggere ↓**40**» |

I sei che ripetono violano **oggi** la regola che nella versione 16 è già costata una correzione chiesta
dall'utente: non si aggiunge un numero che ne ripete un altro sulla stessa schermata.

Righe: `direzione-a.js:892, 893, 894, 1028, 1029, 1030, 1087, 1088, 1668, 2139`. E lo stesso `Math.min(2, …)` è
**anche sul telefono** (`mobile.js:565`), mentre `mobile.js:805` conta onesto per il dipartimento: **tre superfici,
tre conti dello stesso numero.**

### Le quattro cose che la revisione incrociata ha cambiato

Come nelle versioni 24-30, la revisione incrociata ha spostato la risposta più dei pareri. Tutto verificato col
righello prima di entrare qui.

**1. Il prezzo che avevo scritto nel contesto era sbagliato, e tutti e cinque l'hanno ripetuto.**
Il contesto diceva «scambiare il badge costa 9,2 px sui 322,6 liberi». Falso: `direzione-a.js:143` dice
`.stat .badge{position:absolute;right:0;top:4px}` — **il badge è fuori dal flusso**. Rimisurato cambiandogli il
testo dal vivo, il terzo numero resta **236,0 px a undici e 251,1 a quaranta con qualunque parola**, e i tre numeri
restano 685,4 e 714,5:

| testo del badge | larghezza badge | il terzo numero | i tre numeri |
|---|---|---|---|
| `12%` (oggi) | 44,6 px | 236,0 · 251,1 | 685,4 · 714,5 |
| `oltre` | 53,8 | 236,0 · 251,1 | 685,4 · 714,5 |
| `oltre il tetto` | 111,1 | 236,0 · 251,1 | 685,4 · 714,5 |
| `oltre il limite` | 116,2 | 236,0 · 251,1 | 685,4 · 714,5 |

**Costa zero, con qualunque parola.** Il badge sconfina in orizzontale sulla colonna dell'etichetta (9,8 px con
«oltre», 67,1 con «oltre il tetto») ma sta in una fascia verticale diversa — badge y 184-204, etichetta y 204-236 —
e a schermo non si toccano: verificato con le geometrie e con un ritaglio a 2×.

**2. La forma che tre consiglieri proponevano come nuova esiste già, e con la parola.**
`direzione-a.js:1912`, `cardCostoAzienda`, pagina Costi: per **l'azienda** stampa già
**«Oggi 124 € su 115 € al giorno · ⚠ oltre il limite»**. Quindi «l'azienda non ha un nome» (che avevo scritto nel
contesto) è falso, e la «terza strada» di tre consiglieri — il rapporto «124 € / 115 €» — è un componente **già in
produzione**.

**3. La strada «accendi le card» è impossibile, e non per il colore: per il righello.**
La riga di stato delle tre card «Al lavoro adesso» è **già tagliata oggi**: «Passo 2 di 4» chiede 71 px e ne ha
**39** — `overflow:hidden`, `text-overflow:ellipsis` — e a schermo si legge **«Pass…»**, su tutte e tre le card,
a undici **e** a quaranta. Con «· 38 € su 10 €» servirebbero 289,4 px su 172: sfora di **117,4**. Ed è falso che a
quaranta quelle card diventino righe compatte: restano **12 card da 316 px** (`compatto` governa solo la sezione
Dipendenti).

**4. Il censimento delle parole ribalta il voto dei consiglieri.**
Tre su cinque hanno votato «tetto» perché è la parola del modello. Contate **nelle pagine**, su dodici pagine della
Console e sul telefono:

| parola | dove appare nel prodotto | totale |
|---|---|---|
| **limite** | Dipendente 5, Esecuzione 2, Costi 1, Routine 1 | **9**, su 4 pagine |
| **budget** | Dipendente 2, Costi 1 | **3** |
| **tetto** | Routine (dettaglio) 1 — sulla stessa card intitolata «I limiti che ha» | **1** |
| **soffitto** | mai | **0** |
| il **telefono** | nessuna delle quattro | **0** |

«Quattro parole per cose vicine» è vero nel **codice**; nelle **pagine** sono due, e il conto è **9 a 1 per
"limite"**. «Limite» è anche l'unica che ha la forma positiva già disegnata («nel limite», chip con `i-check`).
«Soffitto» non l'ha mai letto nessuno: vive solo nei commenti.

### Il costo di ogni strada, contato e non stimato

| strada | px | prove che si rompono | catture da rifare |
|---|---|---|---|
| **1** · il badge della home dice quello che dicono i Costi | **0** | **0** (nessuna prova asserisce `12%`) | **11** |
| **2** · quinta casella nella barra «Oggi in azienda» | 133,2 su 182 di vuoto | `console.js:175` e `:203` (`caselle.length === 4`), `caselle[2]/[3]`, `.qua:nth-child(1)` | **44** (la barra è su ogni pagina) |
| **3** · terza riga nel Riepilogo | 20 px, resta senza scorrimento | **0** | **1** |
| **4** · l'euro nelle card «Al lavoro adesso» | **sfora di 117,4** | `routine.js:140` asserisce l'altezza della home (2388) | — |
| **5** · niente | 0 | 0 | 0 (ma il `↓12%` resta) |

**Sul telefono** il vincolo vero non era sul desktop. La fila dei tre numeri della schermata 3 ha **278 px** e
**qualunque denominatore sfora**: «⚠ oltre» −27 (−36 a quaranta), «124 € / 115 €» −37 (−62), «124 € su 115 €»
−53 (−78). L'unico posto del telefono che regge un denominatore è la riga `.kv` della card Consegne della stessa
schermata: **228 px**, e «124 € su 115 €» ne chiede **180,5**. È anche la riga che oggi stampa 124 € **una seconda
volta** (`mobile.js:481`, dopo `:464`).

### Le risposte dell'utente, date il 2026-09-09 — **sette decise, nessuna aperta**

I due verdetti sono stati portati all'utente e hanno avuto risposta su tutto: le tre domande del primo consiglio,
una quarta che il consiglio stesso aveva sollevato, una quinta aperta dall'utente (che ha convocato il consiglio
una seconda volta) e le due che quella quinta si portava dietro. **Non resta niente in attesa di una decisione.**

| domanda | risposta | stato |
|---|---|---|
| **la parola** | **«124 € su 115 € al giorno · oltre il limite»** — copiare esattamente la card che la pagina Costi già stampa per l'azienda (`direzione-a.js:1912`), invece di inventare una forma nuova | **decisa** |
| **il telefono** | **sì, nella riga `.kv` della schermata 3** (la card Consegne, 228 px: la forma ne chiede 180,5). **Non** fra i tre numeri grandi, dove ogni forma sfora da −9 a −78 px | **decisa** |
| **il freno** | **il tetto FERMA**, non avverte soltanto — **e la scelta dev'essere modificabile dalle impostazioni del prodotto**. `fermaPrimaDelPasso` va cablato davvero e nasce lo stato «ferma per tetto»; la pagina Impostazioni (decisione 56) smette di essere facoltativa, perché è il posto dove si cambia questa scelta | **decisa** |
| **il tetto d'azienda** | **lo pone il titolare**, non è più la somma dei budget dei dipendenti | **decisa** |
| **la disposizione dei limiti** | **la proposta dell'utente, migliorata**: una sola unità, gli **euro**, e la percentuale sopravvive come **gesto** nell'editor — si scrive «60 %» e il prodotto la **fissa in euro in quel momento** («60 % di 115 → 69 €»), e da lì non si muove più. Cinque livelli: azienda **obbligatoria**, dipartimento / dipendente / routine / workflow facoltativi. Orizzonti giorno e mese, la settimana **solo** dove la cadenza è settimanale. **Ferma solo l'azienda**, gli altri mandano in coda. **Nessuno stato nuovo**: chi è fermo resta in `attesa`. Tre parole: **tetto** per quello che ferma, **budget** per i facoltativi, **soglia** resta al workflow | **decisa** |
| **«il prodotto si apre fermo»** | **si apre fermo, ed è giusto così.** Col tetto già sfondato non parte nessun passo nuovo: 6 esecuzioni a undici e 20 a quaranta (al lavoro più pianificate). È la cosa più coerente con «il tetto ferma», e il prezzo è che la prima cosa che il titolare vede sono quelle esecuzioni che aspettano la sua firma | **decisa** |
| **i due soffitti di dipartimento** | **nessuno dei due, finché non lo pone il titolare.** Il dipartimento parte **senza** soffitto (è facoltativo), e la pagina Costi **smette di stampare «su 30 €»** — che era la somma dei budget e non l'aveva scelta nessuno. Stessa cura del tetto d'azienda | **decisa** |

Quindi **tutte e sette le domande hanno risposta, e niente aspetta più l'utente.** Quello che resta è
**costruzione**: la pagina Impostazioni e i limiti, che è il lavoro della prossima sessione.

La quinta domanda l'aveva riaperta l'utente stesso, notando una contraddizione vera: **come si dispongono i
limiti** fra azienda, dipartimento, dipendente e routine.
L'ha riaperta il titolare notando una contraddizione vera — se i limiti di dipartimento sono una **percentuale
del tetto d'azienda** e il tetto d'azienda era una somma calcolata, quella percentuale non significava niente.
Adesso che il tetto lo pone lui, la domanda si riapre per davvero.

### La contraddizione, misurata: quattro livelli, quattro unità, quattro orizzonti

| livello | unità | orizzonti | chi ce l'ha | lo disegna una pagina? |
|---|---|---|---|---|
| **azienda** | euro — oggi la **somma** dei budget, da oggi **posta dal titolare** | giorno, mese | sempre | sì, come «spesi oggi» |
| **dipartimento** | **% del tetto d'azienda** | **solo giorno** | **1 su 4** (Vendite, 60 %) | **no, mai** |
| **dipendente** | euro assoluti | giorno, mese | 11 su 11 | sì |
| **routine** | euro assoluti | giorno, **settimana**, mese | 3 su 3 | sì |

**Cinque difetti misurati:**

1. **Il soffitto di dipartimento non può scattare mai.** Vendite ha il 60 % = **69 €**, ma i budget dei suoi tre
   dipendenti sommano **30 €**: il soffitto è **2,3 volte** quello che i suoi possono spendere in tutto. A
   quaranta: **240 € contro 100**, 2,4 volte. Scattano prima tutti i tetti individuali.
2. **Il soffitto di un dipartimento si muove se assumi in un altro.** Misurato: assunto un dipendente in
   **Amministrazione**, il soffitto di **Vendite** passa da **69 a 75 €** — Vendite non è cambiata di niente.
3. **Nessuna pagina disegna il soffitto di dipartimento.** `soffittoDi` è letto solo da sé stesso in `dati.js` e
   da una prova: la proposta del titolare è nel modello dalla decisione 55 e **il prodotto non la mostra**.
4. **Il dipartimento ha solo il giorno**, mentre azienda e dipendenti hanno giorno e mese e le routine hanno
   anche la settimana.
5. **La percentuale era la percentuale di una somma** — e questo lo chiude la decisione di oggi.

### Il secondo consiglio: come si dispongono i limiti — **CONFERMATO** (e migliorato dall'utente)

L'utente ha riaperto la domanda notando una contraddizione vera: *«io avevo già proposto di impostare i limiti dei
dipartimenti per % del tetto aziendale o trovare un modo migliore per disporre i limiti (in modo opzionale, non è
obbligatorio impostare un limite del dipartimento). fai una analisi e proponi scelte migliori o migliora la mia»*.
Cinque pareri, revisione incrociata su cinque angoli (i fatti nel codice, il costo su prove e catture, le regole e
la lingua, la spina dorsale e il carico, la prova dei quaranta).

#### Il fatto che riformula la domanda: i soffitti di dipartimento sono **due**, e si contraddicono

La pagina Costi **disegna già** un soffitto per tutti e quattro i dipartimenti, in euro. Misurato:

| dipartimento | disegnato a schermo | nel modello (la quota %) |
|---|---|---|
| Sviluppo | «42 € su **30 €** al giorno» | — |
| Marketing | «21 € su **35 €** al giorno» | — |
| **Vendite** | «61 € su **30 €** al giorno» + chip «oltre il limite» | **69 €** (60 %) |
| Amministrazione | «0 € su **20 €** al giorno» | — |

**Vendite ne ha due, distanti 2,3 volte**, che dicono cose opposte: quello a schermo «oltre il limite», quello nel
modello «dentro». E quello a schermo non l'ha scelto nessuno: è **la somma dei budget dei suoi dipendenti**, la
stessa malattia del tetto d'azienda che la decisione di oggi ha appena curato. Quindi il lavoro non è **creare** un
limite di dipartimento: è **riconciliarne due che ci sono già**.

(Correzione a quanto scritto sopra: «nessuna pagina disegna il soffitto di dipartimento» vale **solo** per
`soffittoDi`, la percentuale. Il secondo lo disegna `cardCostoDip`, `direzione-a.js:1893`.)

#### Dove il consiglio è d'accordo, cinque su cinque

1. **La percentuale muore.** Non per gusto: perché `soffittoDi(dip) = round(tettoAzienda().giorno × quota / 100)`
   fa muovere il soffitto di **Vendite** da 69 a 75 € quando si assume in **Amministrazione**. Un limite che
   cambia per fatti altrui non è un limite.
2. **Una sola unità: euro**, a tutti i livelli.
3. **Un solo fermo: l'azienda.** Gli altri livelli non fermano il lavoro: mandano la cosa nella coda che esiste
   già, col lime e con `m.decidi`.
4. **Sblocca solo il titolare.** Nessun dipendente AI, nessuna routine, nessun orologio.
5. `avvisoSopra100` muore con la percentuale (non potrebbe scattare mai: la somma delle quote fa 60, la soglia
   è 100).

#### Dove si scontra

- **Se il dipartimento ferma o solo chiede la firma.** Tre dicono che ferma, due che è solo una soglia. Chi dice
  «solo soglia» ammette da sé che il dipartimento diventa «un cartello con dei numeri sopra», il giorno dopo che
  il titolare ha deciso che il tetto **ferma**.
- **Se nasce un sesto stato** («ferma per tetto») o si riusa `attesa`. Il conto qui sotto dice che la seconda è
  molto più a buon mercato, e la lingua dice che «ferma» è già occupata.
- **Se restano tre orizzonti** (giorno, settimana, mese) o due. La settimana esiste solo nelle routine, e ha una
  ragione: rt2 scatta **il venerdì**.

#### Le sei cose che la revisione incrociata ha corretto, tutte verificate col righello

1. **Un secondo numero del contesto era sbagliato, e tutti e cinque ci hanno fatto aritmetica sopra.** Il
   «13 firme al giorno a undici, 58 a quaranta» **non è una misura**: veniva da questo documento, e i due revisori
   che l'hanno ricontato hanno ottenuto numeri diversi fra loro (7 contro 13; 58 contro 61). Ricontato:

   | | a undici | a quaranta |
   |---|---|---|
   | esecuzioni al lavoro | 3 | 12 |
   | passi in tutto | 17 | 72 |
   | passi non ancora **finiti** | 10 | 44 |
   | passi non ancora **partiti** | **7** | **32** |
   | esecuzioni bloccate dal solo tetto d'azienda, **comprese le pianificate** | **6** | **20** |

   Le **pianificate** (3 a undici, 8 a quaranta) non le aveva contate nessuno dei cinque: col tetto già sfondato
   non partono nemmeno quelle.
2. **Col tetto che ferma davvero, il prodotto si apre fermo.** Il tetto d'azienda è superato (124 su 115) *prima*
   di qualunque passo nuovo: si fermerebbero **3 esecuzioni su 3** a undici e **12 su 12** a quaranta, **6 e 20**
   contando le pianificate. Va deciso: o il tetto vale solo per quello che parte da adesso, o il valore d'apertura
   sta sopra la spesa già fatta.
3. **Il sesto stato non è un chip, è una superficie di crash.** `m.STATI[e.stato].breve` (`direzione-a.js:1920`)
   accede diretto: su uno stato ignoto lancia, e `scatta.js` e tutte e sei le prove escono 1 su `pageerror`. Il
   raggio contato è di **42 punti in 5 file**.
4. **«ferma/ferme» è già occupata, e in rosa**: la barra «Oggi in azienda» stampa già «1 ferma · Kim» per il
   gruppo **errore** (`.qua.err` su `--badge-red`). E un **punto di stato lime** su chi è fermo direbbe il
   contrario del vero: `SEGC = { lavoro: lime, attesa: giallo, errore: rosa }`, e la regola 19 dice «niente da
   fermo».
5. **Esiste già un quinto limite in euro che il contesto non aveva contato**: `w.soglia`, «**Soglia di costo**»
   del workflow (`dati.js:1562`), uno dei tre freni della decisione 71, con la descrizione *«Sopra la soglia
   l'uscita torna in coda»*. È esattamente la «soglia di firma» che tre consiglieri credevano di inventare.
6. **Nessun limite è modificabile, oggi, da nessuna parte.** L'editor del dipendente ha tre chiavi (`dip`, `seme`,
   `tinta`) e **nessun campo budget**; le penne sulle card dei budget sono `rb ghost` **senza `data-az`**:
   decorazione. Quindi i 22 numeri a undici (44 a quaranta) sono assegnati senza che il titolare li veda mai, e
   **Impostazioni sarebbe il primo numero scrivibile del prodotto**.

#### Quello che nessuno dei cinque ha detto

**Nessuna delle cinque proposte toglie al titolare una sola approvazione.** Tutte le «smette di» sono cose che
smette di *impostare* (percentuali, unità, budget preassegnati): zero decisioni tolte. Il bilancio è **additivo**
a tutte e cinque, e il criterio scritto in questo repository è che l'attenzione del titolare è la risorsa scarsa.

E un corollario tecnico: **la coda che tutte e cinque riusano non regge quello che le chiedono.** `m.decidi(id,
stato, commento, esitoRevisione)` non ha un parametro per una **cifra**, e una richiesta ha `cliente`, `testo`,
`allegato` — non `importo`. Quattro proposte su cinque pretendono «alza il tetto di X € per oggi».

#### Che cosa raccomando, e come migliorerei la proposta dell'utente

**La percentuale non va buttata: va spostata da dato a gesto.** L'intenzione dietro la proposta dell'utente — «io
metto un numero per l'azienda e i reparti seguono» — è giusta, ed è la comodità che si perde passando agli euro.
Si tiene tutta **scrivendo la percentuale nell'editor e fissandola in euro nel momento in cui la scrivi**:
«60 % di 115 → **69 €**», e da lì è 69 € e non si muove più. Si ha la comodità del gesto e un numero che non
cambia quando assumi altrove. È l'unica delle cinque proposte che migliora la tua invece di sostituirla.

Il resto della raccomandazione, in ordine di quanto è misurato:

| | raccomandazione | perché, misurato |
|---|---|---|
| **unità** | **euro** dappertutto; la percentuale resta solo come modo di scrivere il numero | il soffitto di Vendite si muove da 69 a 75 € per un'assunzione in Amministrazione |
| **livelli** | azienda (**obbligatorio**), dipartimento, dipendente, routine (facoltativi) — e il **workflow** ha già la sua soglia: sono **cinque**, non quattro | `w.soglia` esiste, è disegnata e dichiara già che cosa fa |
| **orizzonti** | **giorno e mese**; la settimana resta **solo** dove la cadenza è settimanale (rt2, il venerdì) | il tetto del **mese non è mai sfondato** (39 %, 42 %): prescriverlo ovunque aggiunge decorazione |
| **chi ferma** | **solo l'azienda**; gli altri mandano in coda | il fermo a ogni livello produce 7 (32) interruzioni al giorno su una coda che ne ha 4 (7) |
| **lo stato** | **nessuno stato nuovo**: chi è fermo resta in `attesa`, che è letteralmente ciò che è | il sesto stato tocca 42 punti in 5 file e `STATI[...].breve` lancia; «ferma» è già la parola dell'errore, in rosa |
| **le parole** | **tetto** = quello che ferma (l'azienda) · **budget** = i facoltativi · **soglia** = resta al workflow | i cinque ne hanno proposte **sette** (tetto, soffitto, budget, limite, autonomia, soglia di firma, delega). Tre lavori, tre parole |
| **prima di tutto** | **riconciliare i due soffitti di dipartimento** (30 € a schermo, 69 € nel modello) | è la stessa malattia del tetto d'azienda, e sta già in pagina |

**Dove starebbe, misurato**: l'intestazione della pagina Dipartimento ha **326 px liberi** a 1440 (249 a 1100) e
un quarto numero ne costa 282: ci sta. L'intestazione dei **Costi** no: ha 95 px liberi a undici e **25 a
quaranta**.

#### Che cosa ha deciso l'utente

**La proposta dell'utente, migliorata**: la percentuale non si butta, si sposta da **dato** a **gesto** — si
scrive nell'editor e il prodotto **la fissa in euro in quel momento** («60 % di 115 → 69 €»), e da lì non si
muove più. Si tiene la comodità di impostare i reparti in proporzione al tetto e si perde il difetto.
Con lei: **euro** dappertutto, **cinque livelli** (azienda obbligatoria, dipartimento / dipendente / routine /
workflow facoltativi), **giorno e mese** con la settimana solo dove la cadenza è settimanale, **ferma solo
l'azienda**, **nessuno stato nuovo** (chi è fermo resta in `attesa`), **tre parole** (tetto, budget, soglia).

E le due domande che quella si portava dietro:

- **«il prodotto si apre fermo»**: sì, **ed è giusto così**. Col tetto già sfondato non parte nessun passo nuovo:
  6 esecuzioni a undici, 20 a quaranta. È la cosa più coerente con «il tetto ferma», e il prezzo — la prima cosa
  che il titolare vede sono quelle esecuzioni che aspettano la sua firma — è accettato.
- **i due soffitti di dipartimento**: **nessuno dei due**, finché non lo pone il titolare. Il dipartimento parte
  senza soffitto, e la pagina Costi smette di stampare «su 30 €», che era la somma dei budget e non l'aveva
  scelta nessuno. Stessa cura del tetto d'azienda.

#### I punti ciechi che restano — **da confermare**

1. **Il prodotto si apre fermo** (punto 2 qui sopra): va sciolto prima di disegnare qualunque cosa.
2. **Il bilancio è additivo**: nessuna proposta toglie una decisione al titolare. Se questo non va bene, la
   domanda da fare non è «come si dispongono i limiti» ma «che cosa il titolare smette di firmare».
3. **La coda non sa portare una cifra**: `m.decidi` non ha un importo. Uno sblocco «alza di X €» richiede di
   cambiarla.
4. **A quaranta Amministrazione spende più di Vendite** (137 € contro 122): la storia con cui la decisione 55 è
   stata scritta regge solo a undici.
5. **`rigaCostoCompatta` butta via la barra del budget**: nella forma che il prodotto usa a quaranta (regola 3) il
   limite non ha dove stare.
6. **Nessun limite è scrivibile**: la pagina Impostazioni non è un contorno, è il primo posto del prodotto dove si
   scrive un numero.

### Il verdetto del consiglio — che ha portato a quelle risposte

**Dove il consiglio è d'accordo (cinque su cinque).** La strada 1: la home smette di inventare e dice quello che
la pagina Costi già dice. Nessuno ha scelto la 5 (il silenzio), perché il silenzio qui non è silenzio — è il
`↓12%` che resta. Nessuno ha scelto la 2: conterebbe le stesse persone che la barra conta già come «al lavoro»,
ed è precisamente l'errore della versione 16.

**Dove si scontra.** Sulla **parola**: tre per «tetto» (la parola del modello), uno per «limite» (la parola delle
pagine), uno per nessuna parola (solo il rapporto «124 € su 115 €»). Il censimento dà 9 a 1 per «limite», e la
forma col rapporto **esiste già insieme alla parola**: le due strade non sono alternative. Sul **telefono**: due
sì, tre no — ma i tre «no» dicono tutti che la schermata 3 deve almeno smettere di stampare 124 € due volte senza
il suo denominatore.

**Il punto che nessuno dei cinque aveva messo al centro, e che la revisione incrociata ha portato lì.**
**La home tace sullo sfondamento perché il freno non è cablato.** Se il tetto fermasse davvero, le tre esecuzioni
sarebbero ferme e la casella rosa che la barra ha già direbbe «4 ferme» invece di «1 ferma · Kim»: la home lo
starebbe già dicendo, con un elemento che è già in pagina. Quattro consiglieri su cinque, indipendentemente,
hanno detto la stessa cosa: **il modello va chiuso prima**, perché decide la forma. Se il tetto ferma, il segnale
è lime e passa dall'approvazione; se avverte soltanto, è un avviso e il prodotto è un altro.

E c'è una premessa sotto, trovata da un consigliere e verificata: **il titolare non ha mai scelto 115 €.**
`tettoAzienda()` è la **somma** di undici budget che la decisione 55 dichiara **facoltativi**, e per i dossier
generati quel budget è `10` scritto nel generatore (`dati.js:463`). Nessuna pagina chiede mai al titolare quanto
vuole spendere in un giorno. Un allarme su un impegno mai preso è la stessa specie di difetto del `↓12%`.

**Quello che il titolare smette di vedere**, se si fa la strada 1: il calo del 12 % che non è mai esistito, e la
fatica di riconciliare due pagine che dicono il contrario sullo stesso numero. Non perde nessuna informazione:
non ce n'era.

**La proposta che cambierebbe la spina dorsale senza dichiararlo**, e che il consiglio ha demolito da sé: fare
dello sfondamento una **richiesta** nella coda lime. Contata: con un freno che controlla prima di ogni passo, le
tre esecuzioni che sfondano produrrebbero **6 + 3 + 4 = 13 firme in più al giorno** a undici e **58** a quaranta;
la coda passerebbe da **4 a 17** e da **7 a 65**. Il consigliere l'aveva prezzata «da 2 a 5». E il lime della
spina dorsale è «il titolare approva ogni **uscita**»: uno sblocco di budget non è un'uscita verso un cliente.

### Che cosa raccomando, e che cosa devi decidere tu

**Raccomando di dividere la risposta in due, perché sono due cose diverse.**

**(a) Quello che non è un dubbio progettuale e si fa e basta** — sono numeri inventati, e la regola del
repository dice che un numero che il prodotto stampa e non sa usare è un difetto:

1. il `↓12%` della home sparisce; al suo posto quello che i Costi dicono già dello stesso numero;
2. `Math.min(2, att)` sparisce dalle tre superfici (home, Richieste, telefono): il badge dice il numero vero, o
   non c'è;
3. l'`↑1` scritto a mano della home sparisce;
4. i sei badge che ripetono il numero accanto spariscono (regola della versione 16);
5. la schermata 3 del telefono smette di stampare 124 € due volte.

**(b) Quello che decidi tu**, e sono tre domande:

| | la domanda | la mia raccomandazione |
|---|---|---|
| **1** ✅ *decisa: la prima* | **la parola**: «oltre il limite» (9 a 1 nelle pagine, ha la forma positiva già disegnata), «oltre il tetto» (la parola del modello, e allora «nel limite» diventa «sotto il tetto» su tre pagine), o **nessuna parola** e solo il rapporto | **«124 € su 115 € al giorno · oltre il limite»**, cioè copiare esattamente la card che la pagina Costi già stampa per l'azienda. Non si inventa niente: si smette di avere due forme per lo stesso fatto |
| **2** ✅ *decisa: la riga `.kv` della schermata 3* | **il telefono**: si porta o no | **sì, ma solo nella riga `.kv` della schermata 3** (228 px, la forma ci sta a 180,5), che è la riga che oggi ripete 124 € senza denominatore. **Non** fra i tre numeri: lì sfora sempre |
| **3** ⏳ *aperta: «decidiamolo prima di disegnare»* | **il freno**: `fermaPrimaDelPasso` diventa vero (con lo stato «ferma per tetto»), oppure si toglie dal modello perché il tetto avverte e non ferma | **decidilo prima di disegnare qualunque segnale nuovo**: se il tetto ferma, il segnale è l'esecuzione ferma e la casella rosa della barra lo dice già; se avverte, il segnale è il badge. Sono due prodotti diversi, non due pixel diversi |

**Non raccomando** la quinta casella nella barra (conta le stesse persone di «al lavoro»: 3 su 3 a undici,
11 su 12 a quaranta; 44 catture e due prove), né l'euro nelle card (sfora di 117,4 px, e la riga è già tagliata).
La terza riga nel Riepilogo costa poco (20 px, 1 cattura, 0 prove) ma vive solo a tendina aperta: la tengo come
opzione, non come raccomandazione.

### I punti ciechi che restano — **da confermare**

1. **Il tetto d'azienda non è un impegno del titolare**, è la somma di budget facoltativi che nessuno ha scelto.
   Finché resta così, «oltre il tetto» dice che è stata superata una somma, non che è stata rotta una promessa.
   Serve una pagina Impostazioni (decisione 56, che non esiste) o una domanda una volta sola.
2. **Tre livelli, tre verdetti**, e nessuna pagina li mette insieme: a undici «Ricerca lead» è a **610 %** del
   proprio tetto (61 € su 10), il suo dipartimento **Vendite è dentro** il suo soffitto (61 € su 69), e l'azienda
   è al **108 %**. A quaranta Vendite cade (122 € su 240): il quadro cambia con la taglia.
3. **Il rosa**. `.badge.down` è `--badge-red`, che nei token si chiama letteralmente «badge in calo», e la
   regola 4 dice **rosa solo per errori e cali**. Sfondare un tetto non è né un errore né un calo. Il badge
   «⚠ oltre» dei Costi è già rosa per un fatto che non lo è: portarlo in home allarga la falla invece di chiuderla.
   Va deciso: sfondare è errore (rosa), attenzione del titolare (lime) o nessuno dei due?
4. **Una contraddizione viva, fuori tema ma reale**: la regola `g4` («Spese sopra 50 €») è **«Attiva»** nella
   pagina Richieste e **«Spenta»** nella pagina Dipendente. `dati.js:1274` dice `attiva: true`, i dossier
   (`:282, :369, :467`) dicono `attiva: false`. Stessa regola, due pagine, due stati opposti.
5. **`avvisoSopra100` non potrebbe scattare mai** (`sommaSoffitti()` = 60, soglia 100): è la terza promessa
   dichiarata e non cablata, dopo `fermaPrimaDelPasso` e il `↓12%`.

### Una cattura instabile, trovata rifacendo il prima/dopo

Rifacendo le 82 catture a codice **immutato**, una è uscita diversa: **`a-workflow-firma.png`**, e la differenza
sta tutta nella **tendina del titolare** (x 1232-1439, quattro fasce di ~56 px a y 240-295, 308-364, 854-910,
922-978; 0,214 % dei byte). Rilanciata da sola undici volte: **9 uguali alla committata, 2 diverse** — una su
cinque, poi una su sei.

La causa sta nella riga della cattura (`scatta.js:100`): è l'unica del gruppo che fa un **clic**
(`[data-az="firma"]`) e poi aspetta **300 ms** fissi prima di scattare. Il clic rifà la tendina, e ogni tanto lo
scatto prende un fotogramma intermedio. Non è un difetto del prodotto e non c'entra con questa sessione — il file
committato è quello che esce 9 volte su 11, e non è stato toccato. Ma è una cattura che non è deterministica, e
finché resta così un prima/dopo su di lei non prova niente: va aspettata la fine della transizione invece di
contare 300 ms.

### Che cosa è stato disegnato, dopo le decisioni

Le quattro risposte dell'utente hanno chiuso il dubbio, quindi la parte che era **il lavoro di questa sessione**
è stata scritta. Prove **638 verdi, 0 ko** (erano 619: **+19**), catture **82**, di cui **28 rifatte**.

**1. La home dice quello che la pagina Costi dice già.** Il terzo numero dell'intestazione passa da

> «124 € **spesi oggi** · `↓ 12 %`»  →  «124 € **su 115 € al giorno** · ⚠ **oltre il limite**»

ed è **la stessa forma** che `cardCostoAzienda` stampa già per l'azienda nella pagina Costi (`direzione-a.js:1912`):
non è stato inventato né un componente né una parola. A quaranta dice «427 € su 400 € al giorno · oltre il limite».
Il badge di `.stat` è `position:absolute`, quindi **il cambio è costato zero px**: il terzo numero resta 236,0 px a
undici e 251,1 a quaranta, e l'intestazione ha 269,8 px liberi (229,1 a quaranta). Il ramo opposto («nel limite»,
`badge flat`) esiste e regge, anche se nel modello di oggi non si vede mai.

**2. I quattordici badge che mentivano o ripetevano se ne sono andati.** Cinque **mentivano** (`↑1` scritto a mano;
`Math.min(2, att)` nella home, nelle Richieste e sul telefono; `↓12%`) e nove **ripetevano il numero che gli stava
accanto** — «2 approvate oggi ↑2», «4 da rifare ↓4», «3 al lavoro ↑3», «40 da leggere ↓40» — cioè violavano la
regola della versione 16 in quattro pagine della Console e in tre schermate del telefono. Nella home ne resta
**uno solo**: quello che dice il tetto. Gli altri badge del prodotto non sono stati toccati, perché sono onesti:
i due confronti veri dei Costi, i quattro a 30 giorni del Dipendente, i due dell'Agenda, e i due del telefono
(«3» al lavoro su 11 dipendenti, «15:00» del prossimo) — che sono numeri **diversi** da quello accanto.

**3. Il telefono porta il denominatore dove ci sta.** La riga `.kv` della card Consegne della schermata 3 dice
adesso «Spesa di oggi **124 € su 115 €**»: 228 px di riga, e la forma ne chiede 180,5 — non tagliata, e nessuno
degli otto telefoni scorre di lato. **Non** fra i tre numeri grandi, dove ogni forma sfora (da −9 a −78 px su
278 px di colonna). La stessa riga del **Riepilogo della Console** è stata allineata: cambiarne una sola avrebbe
creato una nuova incoerenza fra le due superfici.

**4. Le prove non verificano l'elemento, verificano l'invariante.** Le +19 verifiche chiedono due cose: che la
home e i Costi dicano **la stessa cosa dello stesso numero** (se un giorno divergono, la prova cade) e che
**nessun badge dell'intestazione ripeta il numero accanto**, su dieci pagine per due taglie. Il difetto non era il
singolo badge: era la classe, ed è la classe che adesso è tenuta — come per gli errori muti del CSS.

## Come riprendere (dalla versione 31)

1. **La parte decisa della prima domanda è disegnata**: la home dice «124 € su 115 € al giorno · oltre il limite»,
   il telefono e il Riepilogo portano il denominatore, e i quattordici badge che mentivano o ripetevano sono
   spariti. Prove **638 verdi, 0 ko**, catture **82** (28 rifatte), artefatti ripubblicati.
2. **Tutte e sette le domande hanno risposta** (vedi «Le risposte dell'utente»): non resta niente da decidere.
   Quello che resta è **costruire i limiti**, ed è il lavoro della prossima sessione.
3. **L'ordine di costruzione**, che non è arbitrario — ogni passo dipende dal precedente:
   1. **`tettoAzienda` smette di essere una somma** (`dati.js:1259`) e diventa il numero che il titolare pone.
      `sommaBudget` ha **un solo chiamante**: tolto quello diventa codice morto, e la somma resta solo come
      **proposta** alla prima apertura.
   2. **La pagina Impostazioni** (decisione 56). Non è un contorno: oggi **nessun limite è scrivibile da nessuna
      parte** — l'editor del dipendente ha tre chiavi (`dip`, `seme`, `tinta`) e le penne sulle card dei budget
      sono `rb ghost` **senza `data-az`**. Sarebbe **il primo numero scrivibile del prodotto**. Nessun settimo
      cerchio nel rail: ci si entra dal «124 € su 115 €» della home e dai Costi.
   3. **I limiti in euro**, con la percentuale come **gesto** («60 % di 115 → 69 €», fissata in euro quando la
      scrivi). Spariscono `tetti.dip` in %, `soffittoDi`, `sommaSoffitti`, `avvisoSopra100`: l'unico lettore in
      tutto il repository è `prove/workflow.js:181-182`, dentro un `page.evaluate` **senza try/catch** — toccarli
      senza sistemare quelle due righe fa rigettare l'IIFE e **159 verifiche non partono**.
   4. **Il dipartimento parte senza soffitto**, e `cardCostoDip` (`direzione-a.js:1893`) smette di stampare
      «su 30 €», che era la somma dei budget e non l'aveva scelta nessuno.
   5. **Il freno cablato davvero** (`fermaPrimaDelPasso`, oggi letto solo da una prova) e il prodotto che
      **si apre fermo**: 6 esecuzioni a undici, 20 a quaranta. Va disegnato **come lo si vede e come lo si
      sblocca**. **Nessuno stato nuovo**: chi è fermo resta in `attesa`.
   6. **La coda deve saper portare una cifra**: `m.decidi(id, stato, commento, esitoRevisione)` non ha un
      parametro per un importo e una richiesta non ha `importo`. Uno sblocco «alza di X € per oggi» lo richiede.
4. **Cinque difetti misurati, aperti e piccoli**, indipendenti dai limiti:
   - la riga di stato delle card «Al lavoro adesso» è **già tagliata** (39 px contro 71: si legge «Pass…») — e
     *come* sistemarla è una scelta con più risposte, quindi passa dal consiglio;
   - la regola `g4` è **«Attiva»** nelle Richieste e **«Spenta»** nel Dipendente (`dati.js:1274` contro
     `:282/:369/:467`);
   - `avvisoSopra100` non potrebbe scattare mai (la somma delle quote fa 60, la soglia è 100);
   - il **rosa** di «oltre il limite»: la regola 4 dice rosa solo per errori e cali, e sfondare non è né l'uno né
     l'altro. Il colore è stato lasciato com'era per non deciderlo da soli;
   - `a-workflow-firma.png` è **instabile di suo** (2 volte su 11): è l'unica cattura che fa un clic e poi aspetta
     300 ms fissi.
5. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono su `section:nth-of-type(2)` per le
   consegne del Dipartimento; le sezioni 25, 26 e 31 di `prove/workflow.js` vogliono `hasTouch` o un telefono a
   parte; le prove che trascinano chiamano `canvasInVista()`; e c'è la prova che prende gli errori muti del CSS.
6. **Numeri da non rifidarsi a memoria**, perché in questa sessione **tre** sono risultati falsi:
   - il badge di `.stat` è `position:absolute` e **non occupa larghezza** — il «costo in px» di un badge è sempre 0;
   - la riga di stato delle card «Al lavoro adesso» è **già tagliata**, e a quaranta quelle card **non** diventano
     righe compatte: restano 12 card da 316 px;
   - il «13 firme al giorno a undici, 58 a quaranta» **non è una misura**: i passi non ancora partiti sono
     **7 e 32**, le esecuzioni bloccate **6 e 20**, la coda di oggi è **4 e 7**.
7. **Tre cose che il prodotto ha già e che è facile credere di dover inventare**: la forma
   «124 € su 115 € al giorno · oltre il limite» (adesso in due pagine); la **soglia di costo** del workflow
   (`dati.js:1562`, «Sopra la soglia l'uscita torna in coda»), che è la «soglia di firma» che tre consiglieri
   credevano nuova; e il **soffitto di dipartimento** disegnato dalla pagina Costi.
8. **Un sesto stato non è un chip, è una superficie di crash**: `m.STATI[e.stato].breve` (`direzione-a.js:1920`)
   accede diretto e lancia su uno stato ignoto — `scatta.js` e tutte e sei le prove escono 1 su `pageerror`. Il
   raggio contato è di **42 punti in 5 file**. E «ferma» è già la parola del gruppo **errore** nella barra, in
   rosa; il punto di stato dell'avatar è lime = al lavoro, giallo = da approvare, rosa = errore, **niente da
   fermo** (regola 19).

## Stato alla fine della versione 31

- **Branch**: `claude/home-daily-limit-display-9v2v1b`, ripartito da `main` dopo l'unione della PR #22.
- **Prove**: **638 verdi, 0 ko** (erano 619) — Console **171**, mobile **91**, Costi 50, Agenda e Chat 56,
  Workflow 221, Routine 49. Le 19 nuove verificano due **invarianti**, non due elementi.
- **Catture**: **82**, di cui **28 rifatte**. Prima di toccare il codice erano state rifatte e confrontate una a
  una col «prima»: 81 identiche al byte, e la restante (`a-workflow-firma.png`) è **instabile di suo** — vedi
  sopra.
- **Codice toccato**: `direzione-a.js` (l'aiutante `chipTetto`, il terzo numero della home, i dieci badge tolti,
  la riga del Riepilogo), `mobile.js` (i quattro badge tolti, la riga della schermata 3), `prove/console.js`
  (sezione 14) e `prove/mobile.js`. In `prove/README.md` c'era anche un conto fermo alla versione 27: dichiarava
  **587** verifiche («Workflow 189») invece di 619.
- **Artefatti**: **ripubblicati allo stesso indirizzo** — la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). Lo strumento rifiuta la pubblicazione
  finché non si è letta per intero la copia salvata della versione viva (7 639 righe la Console): conviene farlo
  fare a un sottoagente, come questa nota dice da tre versioni.
- **Due consigli in una sessione**: il primo sul tetto sfondato che la home non dice, il secondo sulla
  disposizione dei limiti. Tutti e due con la revisione incrociata, che ha corretto **tre numeri del contesto**
  scritti da me e ha trovato quattro cose che i pareri non avevano visto.
- **Quello che resta aperto**: **niente che aspetti una decisione** — tutte e sette hanno risposta. Resta la
  **costruzione dei limiti**, che è il lavoro della prossima sessione e ha il suo ordine in «Come riprendere»:
  il tetto d'azienda posto dal titolare, la **pagina Impostazioni** (decisione 56, che sarebbe il primo numero
  scrivibile del prodotto), i limiti in euro, il freno cablato, e la coda che deve saper portare una cifra. Più
  cinque difetti piccoli e indipendenti (la riga «Pass…», `g4` che si contraddice, `avvisoSopra100` morto, il
  rosa contro la regola 4, la cattura instabile) e i candidati della versione 30 che aspettano dati (decisione
  75, decisioni 68 e 69, connettori, chat di dipartimento).

## Pronto per la prossima sessione

Da incollare così com'è: porta già dentro tutte e sette le decisioni, quindi la sessione parte senza dover
chiedere niente.

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 31», «Le risposte dell'utente», «Il secondo consiglio»,
«Come riprendere (dalla versione 31)» e «Stato alla fine della versione 31»). Controlla la PR #23: se è unita
riparti da main tenendo lo stesso nome di branch, altrimenti continua su quello.

Nella versione 31 la home ha smesso di dire il contrario del vero: dice «124 € su 115 € al giorno · oltre il
limite», la stessa forma che la pagina Costi stampava già per l'azienda; il telefono e il Riepilogo portano il
denominatore; e i quattordici badge delle intestazioni che mentivano o ripetevano il numero accanto sono
spariti. 638 prove verdi, 82 catture, artefatti ripubblicati. Quella parte è chiusa e non va rifatta.

IL PROSSIMO LAVORO SONO I LIMITI DI SPESA, e non c'è niente da decidere: le sette risposte sono già mie e stanno
in «Le risposte dell'utente». In sintesi: una sola unità, gli EURO, con la percentuale che sopravvive solo come
GESTO nell'editor (si scrive «60 %» e il prodotto lo fissa in euro in quel momento: «60 % di 115 → 69 €», e da lì
non si muove più); cinque livelli, azienda OBBLIGATORIA e dipartimento/dipendente/routine/workflow facoltativi;
orizzonti giorno e mese, la settimana solo dove la cadenza è settimanale; FERMA SOLO L'AZIENDA e gli altri
mandano in coda; NESSUNO stato nuovo, chi è fermo resta in «attesa»; tre parole soltanto — tetto per quello che
ferma, budget per i facoltativi, soglia resta al workflow. Il tetto d'azienda lo pongo io e non è più la somma
dei budget. Il dipartimento parte SENZA soffitto. E il prodotto SI APRE FERMO (6 esecuzioni a undici, 20 a
quaranta): è voluto, va disegnato, non aggirato.

Costruisci in quest'ordine, che non è arbitrario:
1. tettoAzienda smette di essere sommaBudget (dati.js:1259) e diventa il numero che pongo io; la somma resta solo
   come proposta alla prima apertura. sommaBudget ha UN SOLO chiamante: tolto quello è codice morto.
2. la pagina IMPOSTAZIONI (decisione 56). Oggi nessun limite è scrivibile da nessuna parte — l'editor ha tre
   chiavi (dip, seme, tinta) e le penne sulle card dei budget sono rb ghost SENZA data-az. È il primo numero
   scrivibile del prodotto. Nessun settimo cerchio nel rail: ci si entra dal «124 € su 115 €» della home e dai
   Costi.
3. i limiti in euro, con la percentuale come gesto. Spariscono tetti.dip in %, soffittoDi, sommaSoffitti e
   avvisoSopra100 (che non potrebbe scattare mai: 60 contro 100).
4. cardCostoDip (direzione-a.js:1893) smette di stampare «su 30 €», che era la somma dei budget dei suoi e non
   l'aveva scelta nessuno.
5. fermaPrimaDelPasso cablato davvero (oggi lo legge solo una prova) e il prodotto che si apre fermo: come lo si
   vede, e come lo si sblocca.
6. m.decidi deve saper portare una CIFRA: oggi non ha un parametro per un importo e una richiesta non ha
   «importo». Uno sblocco «alza di X € per oggi» lo richiede.

TRAPPOLE MISURATE, tutte verificate col righello nella versione 31:
- soffittoDi e sommaSoffitti stanno in prove/workflow.js:181-182 dentro un page.evaluate SENZA try/catch:
  toccarli senza sistemare quelle due righe fa rigettare l'IIFE e 159 verifiche NON PARTONO (sembrano passate);
- un sesto stato non è un chip ma una superficie di crash: m.STATI[e.stato].breve (direzione-a.js:1920) accede
  diretto e lancia su uno stato ignoto — scatta.js e tutte e sei le prove escono 1 su pageerror. Raggio: 42 punti
  in 5 file. Per questo chi è fermo resta in «attesa»;
- «ferma/ferme» è GIÀ la parola del gruppo ERRORE nella barra «Oggi in azienda», in rosa. Non riusarla per il
  tetto senza accorgersene;
- il punto di stato dell'avatar: lime = al lavoro, giallo = da approvare, rosa = errore, NIENTE da fermo
  (regola 19). Un punto lime su chi è fermo direbbe il contrario del vero;
- il badge di .stat è position:absolute (direzione-a.js:143): NON occupa larghezza, il «costo in px» di un badge
  è sempre zero;
- l'intestazione della pagina Dipartimento ha 326 px liberi a 1440 (249 a 1100) e un quarto numero ne costa 282:
  ci sta. Quella dei Costi no: 95 px liberi a undici, 25 a quaranta;
- rigaCostoCompatta (la forma che il prodotto usa a quaranta, regola 3) BUTTA VIA la barra del budget: lì il
  limite non ha dove stare;
- la soglia di costo del workflow (dati.js:1562, «Sopra la soglia l'uscita torna in coda») esiste già ed è il
  quinto limite in euro: non inventarne un sesto con un altro nome.

CINQUE DIFETTI APERTI, piccoli e indipendenti dai limiti: la riga di stato delle card «Al lavoro adesso» è già
tagliata (39 px contro 71: si legge «Pass…») e COME sistemarla è una scelta, quindi passa dal consiglio; la
regola g4 è «Attiva» nelle Richieste e «Spenta» nel Dipendente; avvisoSopra100 non può scattare; il rosa di
«oltre il limite» contro la regola 4 (rosa solo per errori e cali, e sfondare non è né l'uno né l'altro);
a-workflow-firma.png è instabile di suo (2 volte su 11: è l'unica cattura che fa un clic e poi aspetta 300 ms
fissi invece della fine della transizione).

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura, e una diagnosi a occhio va verificata col righello
prima di diventare una correzione. Ogni dubbio progettuale passa dal consiglio (llm-council) con la revisione
incrociata: nella 31 ha corretto TRE numeri del contesto che avevo scritto io, e la risposta finale è stata la
sintesi di tre pareri diversi, non il migliore dei cinque.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo (lo strumento vuole che si
legga per intero la copia viva: conviene farlo fare a un sottoagente), DIREZIONI.md, SYSTEM-DESIGN.md, i README,
PROSSIMA-SESSIONE.md, commit, push e PR.
```

### Pronto breve, se vuoi solo tirare dritto

```
Leggi CLAUDE.md e PROSSIMA-SESSIONE.md («Versione 31», «Le risposte dell'utente», «Come riprendere»). Controlla
la PR #23: se è unita riparti da main con lo stesso nome di branch. La home adesso dice «124 € su 115 € al giorno
· oltre il limite» e i badge inventati sono spariti: quella parte è chiusa (638 prove, 82 catture). Il prossimo
lavoro sono I LIMITI DI SPESA, e le sette decisioni sono già prese: euro dappertutto con la percentuale come
gesto, cinque livelli con la sola azienda obbligatoria, ferma solo l'azienda, nessuno stato nuovo, e la pagina
Impostazioni che sarà il primo numero scrivibile del prodotto. Ordine e trappole misurate in «Come riprendere».
Il metodo di sempre, e alla fine prove, screenshot, artefatti, documenti, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
cd schermate/direzioni && node build-unico.js direzione-a.html <out>.html   # i due file unici per gli artefatti
cd schermate/direzioni && node build-unico.js mobile.html <out>.html
```

Nota: `export SC=… PLAYWRIGHT_MODULE=…` sulla **stessa riga** non funziona — la shell espande `$SC` prima di
assegnarlo. Vanno su righe separate. E `build-unico.js` vuole i percorsi **relativi alla sua cartella**.


## Versione 30 — il prodotto se ne accorge e lo propone (2026-09-09)

**Le tre risposte dell'utente alla versione 29 sono disegnate**, e la terza ha scoperto un difetto che nessuno
aveva visto. **619 verifiche verdi**, 0 ko (erano 605). **82 catture** (era 81). Il canvas del workflow è chiuso:
non resta niente di misurato e aperto.

### Le tre risposte, e che cosa ne è uscito

| domanda | risposta | fatto |
|---|---|---|
| il segnale lo costruiamo? | **«si costruiamolo»** | pillola nella riga in cima al canvas |
| che gesto? | **«riusiamo riordina che già esiste no?»** | la pillola chiama `ramo-riordina`, nessun gesto nuovo |
| perché Riordina riscriverebbe tutto? | *«Non sposta semplicemente la posizione e l'ordine dei nodi?»* | **aveva ragione**, e la verifica ha trovato un difetto |

### La terza domanda ha trovato un difetto

Nella 29 avevo scritto che «Riordina» **riscrive tutte le posizioni**, e detto così suonava come «ti disfa il
flusso». Misurato spostando due nodi a mano e confrontando tutto prima e dopo: **i collegamenti non cambiano, i
nomi non cambiano, si muove solo la posizione dei nodi fuori posto** — nella prova, 1 su 9. L'utente aveva ragione
e la mia parola era imprecisa.

**Ma la verifica ha trovato altro: premere «Riordina» una volta rinumerava tutti i passi.** «Passo 1» → «Passo 2»,
a cascata su tutti e sette, su un grafo **intonso**; poi si fermava. La causa: `ramoNumera` dà il livello
topologico, e l'innesco — che non ha niente in entrata — sta al livello 1 e ruba il numero al primo passo. Ma nel
prodotto **l'innesco non è un passo**: lo dice la barra, «9 nodi · l'innesco, 7 passi e la tua firma». Due
numerazioni che si contraddicevano, e un gesto che serviva a rimettere in ordine il **disegno** cambiava il
**nome** di ogni passo. Corretto togliendo lo scalino dell'innesco; il livello resta, perché serve al grafo
(due rami dallo stesso nodo portano lo stesso numero, decisione 65).

### La pillola

> **1 nodo ne copre un altro quando lo apri · Riordina** — al plurale «2 nodi si coprono quando li apri»

Nella riga in cima, con l'icona `i-grid`, **unica cliccabile della riga**: le altre sono referti, questa è una
proposta. Dice **«nodi» e non «passi»** perché il coperto può essere l'innesco o **la tua firma**, e «passo»
mentirebbe nel caso più grave. Il conto è un'ipotesi — «se lo apri» — perché è quello che serve sapere **prima**.

- grafo appena aperto: **non c'è** (col passo a 342 non c'è niente da dire);
- dopo aver stretto due nodi a mano: **c'è**;
- dopo averla premuta: **non c'è più**, e numeri e collegamenti sono intatti.

Riga in cima con la pillola: **422 px sui 992 utili**. **Sul telefono non c'è**, ed è voluto: lì non si trascina,
il caso non si può creare, non c'è «Riordina» da premere, e la striscia di quello schermo porta il **contratto**.

### La cattura che non si poteva fare

`a-grafo-coperti.png` **trascina davvero** `p7` sotto `p3` con eventi del mouse veri, poi scatta: col passo a 342
nessun grafo seminato si copre, e nel modello nessuno è mai stato trascinato, quindi da un indirizzo la pillola
non è raggiungibile.

## Come riprendere (dalla versione 30)

1. **Il canvas del workflow è chiuso.** Il difetto della versione 24 è finito, e con lui i cinque conti sbagliati
   che ha fatto emergere. Non c'è niente di misurato che resti aperto lì.
2. **Il prossimo passo lo sceglie l'utente**, fra quello che resta: la **decisione 75** (il modo semplificato per
   le routine con inneschi) aspetta i dati — tutti e 3 gli inneschi sono di tipo `ora`, nessuna routine ha un
   workflow dietro, e il vero primo passo è che un workflow possa **nascere dal nulla** (oggi nasce solo da
   un'esecuzione riuscita); le **decisioni 68 e 69** aspettano le biforcazioni (nel modello: 0); la **pagina
   Impostazioni** (decisione 56) non esiste; restano il **candidato 8** (connettori) e il **candidato 5** (chat di
   dipartimento, decisioni 41 e 42). E i numeri che il prodotto dice ma non sa ancora usare: la **soglia di `g4`**,
   i **due contrasti a quaranta**, e il **tetto giornaliero sfondato** — vedi la raccomandazione qui sotto, dove
   la vecchia frase «nessuna pagina lo dice» è stata **corretta misurando**: due pagine su cinque lo dicono.
3. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono su `section:nth-of-type(2)` per le
   consegne del Dipartimento; le sezioni 25, 26 e 31 di `prove/workflow.js` vogliono un contesto `hasTouch` o un
   telefono a parte; e dalla 29 le prove che trascinano chiamano `canvasInVista()` prima di prendere le misure.
4. **Gli indirizzi del canvas**, che il consiglio ha sbagliato due volte: il passo del **grafo** è `RAMO_PASSO` in
   `dati.js`; `W_PY` in `componenti.js` governa **solo** la serpentina dell'«ultima volta».

## Stato alla fine della versione 30

- **Branch**: `claude/node-overlap-issue-ccwwgu`, **PR #22**.
- **Prove**: **619 verdi, 0 ko** — Console 160, mobile 83, Costi 50, Agenda e Chat 56, Workflow **221**, Routine 49.
- **Catture**: **82**, con `a-grafo-coperti.png` nuova.
- **Codice toccato nella 30**: `dati.js` (`ramoNumera`: l'innesco non è un passo), `componenti.js`
  (`canvasCoperti`, la pillola nella riga in cima, il suo CSS, l'export), `prove/workflow.js` (sezione 31),
  `scatta.js` (la cattura che trascina).
- **Artefatti**: **da ripubblicare** allo stesso indirizzo — la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). Lo strumento rifiuta la pubblicazione
  finché non si è letta per intero la copia salvata della versione viva: conviene farlo fare a un sottoagente.
- **Quello che resta aperto**: niente sul canvas. Il resto è nell'elenco di «Come riprendere», punto 2.

## Il prossimo passo, raccomandato — e la frase che ho dovuto correggere

Chiudendo la sessione ho contato lo stato dei candidati aperti invece di ricordarlo, e **una frase che questo
documento si porta dietro dalla versione 21 è risultata falsa**.

Diceva: «il tetto giornaliero è già sfondato e **nessuna pagina lo dice**». Misurato aprendo le pagine:

| pagina | dice «oltre il limite»? |
|---|---|
| Console · **home** | **no** |
| Console · Dipendente | **sì**, per il dipendente che stai guardando |
| Console · Dipartimento | **no** |
| Console · Costi | **sì**, una volta, per l'azienda |
| Console · Richieste | **no** |
| **telefono**, tutte e tre le schermate provate | **no**, mai |

Quindi non è vero che nessuno lo dice: **lo dicono due pagine su cinque**, e tutte e due solo se ci vai apposta.
Tacciono la **home** — il posto dove il titolare guarda l'azienda — e **tutto il telefono**, che è la superficie
da cui firma.

> **Corretto nella versione 31, rimisurando su tutte e undici le pagine e su tutte e otto le schermate del
> telefono.** Le pagine che lo dicono sono **tre, non due**: si era dimenticata la **pagina Esecuzione**, che
> stampa lo stesso chip per il dipendente dell'esecuzione. E la frase «la home non lo dice» è **troppo generosa**:
> la home stampa già «124 € spesi oggi» con il badge `↓ 12 %`, cioè **dice il contrario del vero**, con un numero
> scritto a mano. Vedi la versione 31, «Il difetto vero non era quello annotato».

E il fatto è grosso, contato nel modello vivo:

| | a undici | a quaranta |
|---|---|---|
| dipendenti sopra il tetto **del giorno** | **3 su 11** | **12 su 40** |
| l'azienda, sul tetto del giorno | **108 %** | **107 %** |
| sopra il tetto **del mese** | 0 | 2 |
| l'azienda, sul tetto del mese | 39 % | 42 % |

Il giorno è sfondato, il mese no: sono due storie diverse, e il prodotto oggi le tratta uguale.

**Perché raccomando questo e non gli altri.** È l'unico dei candidati aperti che **non aspetta dati**: la
decisione 75 vuole routine con un workflow dietro (oggi: 0 su 3, e tutti e tre gli inneschi sono di tipo `ora`);
le decisioni 68 e 69 vogliono le biforcazioni (nel modello: 0). Questo invece è già tutto nel modello, è
misurato, e tocca la spina dorsale: **ogni euro risale a un dipendente**, e il titolare non lo vede dove guarda.

**Ed è un dubbio progettuale**, quindi passa dal consiglio: che cosa dice la home quando 3 dipendenti su 11 hanno
sfondato il tetto del giorno? È un conto in più nella barra «Oggi in azienda», una casella che si accende, una
riga nel Riepilogo, o niente — perché il titolare non deve decidere lui su ogni euro? E che parola: «oltre il
limite» esiste già, ma dice il caso singolo, non l'azienda. E sul telefono: lo si porta, o lì si firma e basta?

## Pronto per la prossima sessione

Da incollare così com'è: porta già il prossimo lavoro, raccomandato qui sopra. Se ne vuoi un altro fra
quelli del punto 2, cambia il paragrafo che comincia con «Il prossimo lavoro è».

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 30», «Come riprendere (dalla versione 30)» e «Stato alla
fine della versione 30»). Controlla la PR #22: se è unita riparti da main tenendo lo stesso nome di branch,
altrimenti continua su quello.

Il canvas dei workflow è chiuso e non va rifatto: 619 verifiche verdi in sei prove, 82 catture, il passo di riga
a 342, il nodo aperto che non copre più nessuno, e la pillola che lo dice quando sei tu a stringere due nodi.

Il prossimo lavoro è il **tetto giornaliero sfondato che la home non dice**. Misurato chiudendo la sessione
scorsa: 3 dipendenti su 11 (12 su 40) hanno superato il tetto del giorno, e l'azienda è al 108 % (107 % a
quaranta); il mese invece è al 39 %, quindi giorno e mese sono due storie diverse. Attenzione: la frase «nessuna
pagina lo dice», che il documento si portava dietro dalla versione 21, è FALSA e l'ho corretta — lo dicono la
pagina Dipendente e la pagina Costi, ma solo se ci vai apposta. Tacciono la home, il Dipartimento, le Richieste
e TUTTO il telefono, che è la superficie da cui il titolare firma.

È un dubbio progettuale, quindi NON scrivere codice prima della decisione: passalo dal consiglio con il contesto
scritto per esteso e i prezzi in numeri, misurati aprendo le pagine. La domanda: che cosa dice la home quando 3
dipendenti su 11 hanno sfondato il tetto del giorno? Un conto in più nella barra «Oggi in azienda», una casella
che si accende, una riga nel Riepilogo, o niente — perché il titolare non deve decidere lui su ogni euro? Quale
parola: «oltre il limite» esiste già ma dice il caso singolo, non l'azienda. E sul telefono: si porta o no?
Chiedi a ogni consigliere l'obiezione più forte alla propria scelta, una terza strada e le conseguenze concrete
sull'interfaccia già costruita; NON saltare la revisione incrociata. Poi porta il verdetto all'utente: la
decisione la prende lui, e va scritta in PROSSIMA-SESSIONE.md marcata «da confermare» finché non risponde.

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura, e una diagnosi a occhio va verificata col righello
prima di diventare una correzione. Ogni dubbio progettuale passa dal consiglio (llm-council) con il contesto
scritto per esteso e i prezzi in numeri, e la revisione incrociata non si salta: nelle versioni 24-30 è sempre
stata lei a cambiare la risposta.

Da sapere prima di toccare il canvas:
- il passo di riga del GRAFO è RAMO_PASSO in dati.js; W_PY in componenti.js governa SOLO la serpentina
  dell'«ultima volta», dove il difetto non esiste. Il consiglio ha sbagliato questo indirizzo due volte;
- la regola 42 protegge la MANO (ramoPosiziona), non il SEME (ramoPosa): il seme si può cambiare;
- regola 44: quello che appartiene a un nodo nascosto dalla card non si disegna sopra la card che lo nasconde;
- un conto che decide una posizione deve misurare quello che si disegna davvero (altNodo conosce la sola
  lettura, e il freno ramoOccupato vuole l'altezza del nodo APERTO, RAMO_ALT_APERTO);
- scatta.js e prove/console.js si reggono ancora su section:nth-of-type(2) per le consegne del Dipartimento;
- le sezioni 25, 26 e 31 di prove/workflow.js vogliono un contesto hasTouch o un telefono a parte, e le prove che
  trascinano chiamano canvasInVista() prima di prendere le misure (col canvas più alto un nodo della seconda riga
  cade fuori dalla finestra, e un rilascio fuori dalla finestra non trova nessun nodo);
- c'è una prova che prende gli errori muti del CSS: nessuna variabile usata SENZA valore di ripiego può essere
  mai definita. In questa sessione ne ha presi due, tutti e due miei.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo, DIREZIONI.md,
SYSTEM-DESIGN.md, i README, PROSSIMA-SESSIONE.md, commit, push e PR.
```

### Pronto breve, se vuoi solo tirare dritto

```
Leggi CLAUDE.md e PROSSIMA-SESSIONE.md («Versione 30», «Come riprendere»). Controlla la PR #22: se è unita
riparti da main con lo stesso nome di branch. Il canvas dei workflow è chiuso (619 prove, 82 catture): non
rifarlo. Il prossimo lavoro è il tetto giornaliero sfondato che la home non dice: 3 dipendenti su 11 sopra il tetto del
giorno, l'azienda al 108 %, e tacciono la home e tutto il telefono (la pagina Dipendente e la pagina Costi invece
lo dicono — la frase «nessuna pagina lo dice» nei vecchi documenti è falsa e l'ho corretta). È un dubbio
progettuale: consiglio con la revisione incrociata, poi la decisione la prende l'utente. Il metodo di sempre, e
alla fine prove, screenshot, artefatti, documenti, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
cd schermate/direzioni && node build-unico.js direzione-a.html <out>.html   # i due file unici per gli artefatti
cd schermate/direzioni && node build-unico.js mobile.html <out>.html
```

Nota: `export SC=… PLAYWRIGHT_MODULE=…` sulla **stessa riga** non funziona — la shell espande `$SC` prima di
assegnarlo, e le prove partono cercando `/fonts.css`. Vanno su righe separate. E `build-unico.js` vuole i
percorsi **relativi alla sua cartella**: si lancia da `schermate/direzioni`.


## Versione 29 — il passo a 342, e il consiglio su come il prodotto lo dice (2026-09-09)

**Le due decisioni dell'utente della versione 28 sono in opera per la metà che non era un dubbio.** I grafi nascono
con le righe a **342 px**, il nodo aperto non copre più niente, e cinque conti sbagliati trovati misurando sono
corretti. La seconda metà — «vorrei che il prodotto se ne accorgesse e me lo proponesse» — è **una forma nuova e
una parola nuova**, quindi è passata da un secondo consiglio: il verdetto è qui sotto, **da confermare**.

**605 verifiche verdi** (erano 587), 0 ko. **81 catture**, 10 cambiate.

### Che cosa c'è adesso

| | prima | adesso |
|---|---|---|
| nodi che, aperti, ne coprono un altro | **5 su 9** | **0** (su 31 nodi, 6 workflow, 2 taglie) |
| coperti per intero | 3 | 0 |
| scontri fra etichette di porta | 5, sovrapposte per 6 px | 0 |
| prese cliccabili sopra la card aperta | 2 per nodo coperto | 0 |
| altezza del canvas | 731 px | 1036 px |
| mini-mappa | solo ingrandendo | **sempre**, e non copre più niente |

Il dettaglio sta in `DIREZIONI.md`, «Versione 29». Le cose che contano:

1. **Il passo è in `ramoPosa` (`dati.js`), non in `W_PY`**: `wpos` esce alla prima riga quando il nodo porta già la
   sua `x`, e nel grafo la porta sempre. `W_PY` governa solo la serpentina dell'«ultima volta».
2. **La mini-mappa non si è spostata: le si è riservato lo spazio.** A 342 copriva il 22 % del nodo del titolare.
3. **Quello che appartiene a un nodo nascosto dalla card non si disegna più** — prese, tag, porte. Le prese
   stavano a `z-index:5` contro il 3 della card, ed erano **cliccabili**: da lì nasceva un collegamento da un nodo
   invisibile.
4. **Le porte del nodo aperto erano un doppione troncato dei suoi campi**, e nel grafo sono sempre spente.
5. **Tre conti sbagliati**: `ramoAggiungi` posava a `+210` (fuori griglia e sotto la card); `altNodo` contava la
   riga delle azioni anche in sola lettura (47,6 px di scarto sul telefono); il freno non sapeva che un passo nuovo
   **nasce aperto** (273 px), quindi il «+» sull'arco ne posava uno che copriva due nodi, e il «+» dentro l'innesco
   uno che copriva il **titolare**.

### Quello che resta possibile, di proposito

**`ramoPosiziona` non ha freno**: il titolare può ancora trascinare un nodo sotto un altro. Non è una
dimenticanza — un freno che sposta il nodo dove lui non l'ha messo è quello che la regola 42 vieta. **È il caso
per cui serve la decisione che aspetta.**

## Il verdetto del secondo consiglio — **CONFERMATO nella versione 30**

> L'utente ha risposto: **«si costruiamolo»**, **«riusiamo riordina che già esiste no?»**, e sulla terza domanda
> *«Perché riordina dovrebbe riscrivere tutto? Non sposta semplicemente la posizione e l'ordine dei nodi?»* —
> aveva ragione, e la verifica che ne è seguita ha trovato un difetto. Tutto disegnato: vedi «Versione 30».


Domanda: **che forma prende «il prodotto se ne accorge e te lo propone»?** Tre strade: (a) una pillola nella riga
in cima al canvas; (b) un segno sui nodi interessati; (c) il prodotto lo dice solo al momento dell'apertura.

**Sui cinque pareri**: due per (a), uno per (c), zero per (b), **due per una quarta strada** — la «spinta»: mentre
un nodo è aperto, i nodi che coprirebbe scendono da soli e risalgono alla chiusura, come resa e non come dato.

### La quarta strada è stata demolita dalla revisione incrociata, con i numeri

Sarebbe stata la più elegante: niente parole, niente pillole, e — dicevano — la regola 42 intatta perché non si
scrive nessuna posizione. **Non regge, e per una ragione che vale la pena di ricordare:**

- **«Più in basso» non è definibile in un grafo a posizioni libere.** `spintaDi` ritorna un **indice di riga**, e le
  righe esistono solo perché le ha seminate il codice: al primo trascinamento la `y` è un multiplo qualsiasi di 18.
  Le due definizioni possibili muovono nodi **senza motivo**: «tutto ciò che ha y maggiore» sposta nodi in **120
  aperture su 160**, con delta fino a **224 px**, e in **120 coppie arco-apertura su 938** un capo dell'arco si
  sposta e l'altro no: il filo si sforbicia.
- **Nel grafo lo schermo torna indietro nel dato**, e questo la 22 non lo aveva. Cinque punti di `direzione-a.js`
  mappano pixel→modello: la presa del trascinamento fotografa `{x: nd.x, y: nd.y}` mentre il mouse sta sul pixel
  **spinto**, e `ramoNuovo` **scrive** una coordinata resa. La spinta scriverebbe fino a **224 px di errore** dentro
  posizioni protette dalla regola 42: **la viola, non la salva.**
- **E non copre il caso vero**: due nodi impilati alla **stessa** y si coprono anche da chiusi, e lì `y maggiore` è
  falso — la spinta muove **zero** nodi.

Un consigliere aveva scritto «non scrive nessuna `x` e nessuna `y`, quindi la regola 42 non si tocca». È falso in
cinque punti. Il suo gemello, invece, aveva contato i punti da toccare (6, ne mancavano 10) e aveva dichiarato da
sé che rimetteva in causa i 342 appena pagati: onesto.

### Le altre cose che la revisione incrociata ha corretto, tutte verificate

1. **«(a) è muta sul telefono» era falso.** `.m-wcon` esiste già (versione 27, decisione 74): una striscia di chip
   **fuori** dal canvas, a grandezza piena. E `.wsc`, la riga in cima, è **fratello** di `.wzoom`: non si scala con
   lo zoom, resta a 11 px a ogni ingrandimento. La strada (b), che vive dentro il disegno, a 0,306 diventa 3,4 px.
2. **«(b) non ci sta, servono 215 px» era falso.** Misurato in pagina: «2 passi si coprono quando li apri» in un
   `.wtag` fa **177,8 px**, dentro i 208 del nodo con 30 px di margine. L'unico argomento tecnico che uccideva (b)
   non regge.
3. **«La riga in cima è già piena» era falso.** Quattro pillole fanno 686 px sui 992 utili; ma `ramoEsce` rende
   «resta in azienda» e «esce senza la tua firma» **mutuamente esclusive**, quindi oggi il massimo è **tre**
   pillole (520 px), e una quarta porterebbe a **766 su 992**. C'è spazio.
4. **Il prezzo di (c) è al millimetro.** Una riga in più **dentro** i campi porta la card a 337-341 px; il blocco
   sotto i campi la porta a **343**, cioè un pixel oltre il passo: la copertura appena pagata tornerebbe. Se si
   sceglie (c), la riga va dentro `.campi`, mai sotto.
5. **La parola.** Nel prodotto «passo» **non** è sinonimo di «nodo»: la barra dice «9 nodi · l'innesco, 7 passi e
   la tua firma», e i passi sono i nodi che non sono né l'innesco né il titolare. Quindi «2 **passi** si coprono»
   **mente** proprio nel caso più grave, quando il coperto è la **Firma del titolare**. I cinque hanno usato
   cinque verbi (fare spazio, riordinare, scostare, tenere lo spazio) e due modi di dire il fatto.
6. **Nel canvas non esiste nessun annullo.** Le uniche «Annulla» del prodotto stanno nell'editor del dipendente e
   nel rifiuto. Un tasto che riscrive nove posizioni **senza ritorno** è il vero pericolo, non due card sovrapposte
   per il tempo in cui le tieni aperte.
7. **`ramoIncroci` ha tuttora zero letture** fuori da `dati.js`: esiste un contatore scritto apposta per decidere
   se «Riordina» serve, e nessuna pagina lo legge.

### Che cosa raccomando, e che cosa devi decidere tu

La raccomandazione è **(a) la pillola nella riga in cima, con tre correzioni** — ma con una premessa onesta: dopo
il passo a 342 questo segnale **non si accende mai** su un disegno che fa il prodotto (0 su 26 workflow). Si
accende solo se sei tu a stringere due nodi trascinandoli. È poco, e uno dei consiglieri ha detto che la risposta
onesta potrebbe essere **niente**.

Le tre correzioni, se scegli (a):
- **la parola dice il fatto in «nodi», non in «passi»**, perché il coperto può essere la tua firma:
  **«2 nodi si coprono quando li apri»**, e l'azione all'imperativo della famiglia che c'è già: **«Fai spazio»**;
- **«Fai spazio» non è «Riordina»**: abbassa **solo** i nodi coperti, del minimo, e il numero sta scritto nella
  pillola **prima** del clic. «Riordina» resta dov'è, e riscrive tutto solo se lo chiedi tu;
- la stessa pillola scende sul telefono nella striscia `.m-wcon`. **Ma attenzione**: oggi quella striscia porta
  **solo il contratto** («esce senza la tua firma», «resta in azienda», «aspetterà la tua firma»), ed è l'unica
  riga del telefono che parla di firma. Metterci una faccenda di pixel accanto la svaluta — e sul telefono non
  puoi nemmeno trascinare, quindi leggeresti un rimprovero su cui lì non puoi fare niente. **La mia
  raccomandazione è di NON metterla sul telefono**: lì il caso non si può creare.

**Le due domande per te:**

1. **Vale la pena?** Il segnale si accenderebbe quasi mai. Le alternative sono: (a) farlo comunque, perché quando
   serve è l'unico modo di accorgersene; oppure **niente**, e il caso resta uno di quelli che si vedono a occhio.
2. **Se sì: «Fai spazio» abbassa solo i nodi coperti, oppure vuoi che «Riordina» resti l'unico gesto?** Il primo
   rispetta la tua disposizione, il secondo la butta tutta — e non c'è modo di tornare indietro.

E una terza, che il consiglio ha sollevato e non riguarda questa scelta: **«Riordina» oggi non ti avverte che
riscrive tutte le posizioni.** Il suo titolo dice solo «Rimetti in ordine il disegno». Vuoi che lo dica?

### I punti ciechi che restano — **da confermare**

- **Nessuno ha contato quante volte all'anno** questo segnale si accenderebbe. Il numero misurabile è: 0 su 26
  workflow disposti dal prodotto; tutto il resto dipende da quanto trascini, e non c'è nessun dato.
- **Il caso non è fotografabile**: nel modello nessun grafo è mai stato trascinato, quindi in nessuna delle 81
  catture questa pillola comparirebbe. Per vederla bisognerebbe seminare in `dati.js` un grafo già stretto a mano.
- **Nessuna persistenza**: il repository non ha `localStorage`, quindi le posizioni che trascini non sopravvivono
  a un ricaricamento. Un eventuale «Rimetti com'era» sarebbe una promessa che oggi il prodotto non può mantenere.
- **Spostare un nodo può coprirne un terzo**: nessuna delle strade prevede la cascata.

## Come riprendere (dalla versione 29)

1. **La prima cosa è la risposta dell'utente alle due domande qui sopra.** Finché non c'è, la pillola non si scrive.
2. **Se la risposta è «niente»**, il lavoro della 29 è completo e si passa oltre: il difetto misurato è chiuso.
3. **Se la risposta è «(a)»**, gli indirizzi sono: la riga in cima è `cima` in `canvasWorkflow` (`componenti.js`);
   il conto dei coperti si fa col rettangolo del nodo aperto, che c'è già (`cardOn`/`nascosto`, stessa funzione);
   «Fai spazio» va in `dati.js` accanto a `ramoInserisci`, riusando il `while (ramoOccupato(...))` già scritto tre
   volte — e ricordando che il freno adesso vuole **anche** l'altezza (`RAMO_ALT_APERTO`).
4. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono su `section:nth-of-type(2)` per le
   consegne del Dipartimento; le sezioni 25 e 26 di `prove/workflow.js` vogliono un contesto `hasTouch`. E dalla
   29 le prove che trascinano chiamano `canvasInVista()` prima di prendere le misure: col canvas più alto un nodo
   della seconda riga cade fuori dalla finestra, e un rilascio fuori dalla finestra non trova nessun nodo.

## Stato alla fine della versione 29

- **Branch**: `claude/node-overlap-issue-ccwwgu`, **PR #22**.
- **Prove**: **605 verdi, 0 ko** — Console 160, mobile 83, Costi 50, Agenda e Chat 56, Workflow **207**, Routine 49.
  Quattro sezioni nuove (27-30) verificano il passo, le porte, quello che sta sotto la card e il freno.
- **Catture**: 81, di cui **10 cambiate**: `a-grafo*`, `a-workflow-canvas`, `a-workflow-nodo`, `a-ramo-ultima`,
  `m-grafo*`, `m-workflow-nodo`.
- **Codice toccato**: `dati.js` (`RAMO_PASSO`, `ramoPosa`, `ramoAggiungi`, `ramoOccupato` con l'altezza,
  `RAMO_ALT_APERTO`), `componenti.js` (`altNodo` con la sola lettura, `cardOn`/`nascosto`, porte, prese, tag, la
  riserva della mini-mappa), `prove/workflow.js` (sezioni 27-30, `canvasInVista`, la prova della mappa riscritta,
  il titolo della sezione 11 corretto). **Non toccati**: `direzione-a.js`, `mobile.js`, `comune.js`, `avatar/`, lo
  specimen e i token.
- **Artefatti**: da ripubblicare allo stesso indirizzo — la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). Lo strumento rifiuta la pubblicazione
  finché non si è letta per intero la copia salvata della versione viva: conviene farlo fare a un sottoagente.
- **Quello che resta aperto**:
  1. **Le due domande del verdetto** qui sopra.
  2. **La decisione 75** aspetta i dati; **le 68 e 69** aspettano le biforcazioni (nel modello: 0).
  3. La **soglia di `g4`**, i **due contrasti a quaranta**, il **tetto giornaliero già sfondato**, la **pagina
     Impostazioni** (decisione 56) che non esiste, il **candidato 8** (connettori) e il **candidato 5** (chat di
     dipartimento).

## Versione 28 — il consiglio sul nodo che copre, e nessun codice scritto (2026-09-09)

**Nessuna riga di codice è stata toccata**, come chiedeva il prompt: il difetto del §8 è un dubbio progettuale,
quindi è passato dal consiglio e adesso aspetta la decisione dell'utente. Le prove restano **587 verdi, 0 ko** e le
catture **81** (rilanciate e ricontate all'inizio della sessione, prima di misurare). Gli artefatti non sono stati
ripubblicati perché il sorgente non è cambiato: si rigenerano da `build-unico.js` e sarebbero identici al byte.

### Il difetto è più largo di come era annotato

Misurato su **tutti e nove** i nodi di `w1`, e non solo su `p3`:

| nodo aperto | alto (Console) | copre | alto (telefono) | copre |
|---|---|---|---|---|
| `inn` | 273 px | `p4` per 208×57 | 225 px | `p4` per 208×9 |
| `p1` | 311 px | `p5` per **208×87 — INTERO** | 263 px | `p5` per 208×47 |
| `p2` | 311 px | `p6` per **208×87 — INTERO** | 263 px | `p6` per 208×47 |
| `p3` | 311 px | `p7` per **208×87 — INTERO** | 263 px | `p7` per 208×47 |
| `p4` | 273 px | `tit` per 208×57 | 225 px | `tit` per 208×9 |
| `p5` `p6` `p7` `tit` | 273 / 226 px | nessuno | 225 px | nessuno |

**5 nodi su 9 coprono qualcuno, 3 per intero.** E le due etichette di porta non sono «a 8 px l'una dall'altra»: si
**sovrappongono per 6 px**, e sono **5 scontri**, non uno (2 aprendo `p1`, 2 aprendo `p2`, 1 aprendo `p3`).

Altre misure di contorno: nell'**«ultima volta» il difetto non esiste** (0 coperture: lì `spintaDi` si applica); è
**indipendente dalla scala** (a 0,5x, 0,8x, 1x, 1,25x e 1,5x copre sempre); alla scala d'ingresso del telefono
(0,306) **non si vede**, perché lì nessun nodo è aperto. Il nodo aperto più alto di **tutto il modello** — 6
workflow, 37 nodi, tutte e due le taglie — è **311 px**, e **tutti e 37 superano sia 216 sia 185**.

### Le tre strade, misurate

- **(a) l'editor in un pannello**: chiude tutto (0 coperture, 0 scontri), ma il canvas si stringe. Con un pannello
  da 320 px restano **5 nodi interi su 9** e «tutto dentro» scende a 0,701, cioè il testo da 14 px va a **9,8**.
  Sul telefono non ci sta: 278,4 − 280 = **−1,6 px**.
- **(b) spegnere quello che sta sotto**: non chiude il difetto, lo dichiara. Sotto il nodo aperto finiscono fino a
  **5 coppie «+»/«×»** e 2 prese per volta.
- **(c) stringere il nodo**: **non basta**. Servono ≤216 px perché non copra il nodo, e ≤185 perché non ci vadano
  nemmeno le sue etichette. Campi su una riga sola: 259 px (copre ancora 43). Una riga sola più via le azioni:
  212 px (nodo salvo, etichette no, mancano 27). L'unica variante che chiude è **«solo il campo Modello»** — cioè
  togliere **Strumenti**, il campo che dice quali strumenti aziendali un dipendente AI ha davvero usato.

## Il verdetto del consiglio — **DA CONFERMARE**

**Nessuna delle tre come sono poste.** Sui cinque pareri: uno per (a), due per (b), zero per (c), due per «nessuna
delle tre, il difetto è il passo verticale». Ma la cosa che ha spostato la risposta l'ha portata, come nelle
versioni 24, 25, 26 e 27, **la revisione incrociata** — e stavolta ha demolito affermazioni di fatto dei pareri,
verificate una per una col righello.

### Le otto cose che la revisione incrociata ha preso, tutte verificate

1. **`W_PY` non dispone un solo nodo del grafo.** Due consiglieri hanno proposto di alzare il passo cambiando
   `W_PY` in `componenti.js:428`. Ma `wpos` esce alla prima riga — `if (nd && nd.x !== undefined) return {x: nd.x,
   y: nd.y…}` — e nel grafo **tutti** i nodi portano `x`/`y`. `W_PY` governa **solo la serpentina**, cioè l'unico
   posto dove il difetto non c'è. L'indirizzo giusto è **`ramoPosa` in `dati.js:1350`** (`PX = 234, PY = 216`).
2. **La regola 42 non protegge il 216.** La 42 dice: *«guardare se quel valore è generato o è stato messo lì da
   qualcuno»*. Le posizioni di `w1` **le semina il codice** (`ramoPosa`); la mano del titolare passa da
   `ramoPosiziona`, che aggancia alla griglia da 18 px. Quindi il seme si può cambiare; le disposizioni fatte a
   mano no. Le tre prove della 42 confrontano prima e dopo un **gesto**: cambiare il seme non ne rompe nessuna.
3. **La finestra aritmetica è vuota, ed è il compromesso vero.** `basso = 2·PY + 237` (verificato: a PY 216 fa
   **669 px**, esattamente la misura della pagina). La mini-mappa compare quando `basso > 820`, cioè **da PY 292 in
   su**. Ma per chiudere il difetto serve **PY ≥ 324** (nodo) o **≥ 342** (anche le etichette). Non esiste un passo
   che chiuda il difetto e lasci la mini-mappa nascosta: il massimo compatibile è **288**, che lascia 23 px di
   copertura. **Verificato sul vivo trascinando i nodi col gesto vero a passo 342: 0 coperture, 0 scontri, canvas
   983 px, mini-mappa permanente** (e la prova `workflow.js:320`, che verifica `g.mappa === 0`, andrebbe rifatta).
4. **Il «+» del prodotto ricrea il difetto da solo.** `ramoAggiungi` (`dati.js:1372`) posa il passo nuovo a
   `base.y + 210`: **210 non è multiplo di 18** (contro la ragione stessa per cui la 24 scelse 216 e 234) ed è
   **meno del passo**, quindi il passo nuovo nasce **sotto la card aperta che l'ha creato**. Alzare il passo non lo
   tocca: è una terza costante, separata.
5. **Il trascinamento del titolare non ha nessun freno.** `ramoOccupato` (`dati.js:1466`) controlla la
   sovrapposizione con `87 + 18`, cioè sul nodo **chiuso**, e lo chiamano `ramoInserisci` e `ramoNuovo` — **ma non
   `ramoPosiziona`**. Il titolare può impilare due nodi a 0 px di distanza e nessuno glielo dice.
6. **La spina dorsale finisce sotto la card.** Il `wtag` che dice **«esce senza la tua firma»** e **«resta in
   azienda»** — la frase che dichiara che un ramo consegna senza la firma del titolare — ha `pointer-events:none` e
   **nessuno `z-index`**, contro una card aperta a `z-index:3`. Appena il titolare biforca, quella frase sparisce
   sotto il nodo aperto, e non c'è nemmeno il tooltip a recuperarla.
7. **Un difetto nuovo, che nessuno dei cinque aveva nominato — e uno dei cinque aveva affermato il contrario.**
   `.wio` (le due maniglie del collegamento) sta a **`z-index:5`**, la card aperta a **3**. Misurato col colpo del
   mouse: aprendo `p1`, `p2` o `p3`, le **due prese del nodo coperto sono disegnate SOPRA la card aperta e
   rispondono al clic**. Sono due pallini lime da 11 px posati sull'editor, che appartengono a un nodo che non si
   vede: **tirando da lì nasce un collegamento da un nodo invisibile**, cioè un passo — e quindi un euro —
   attribuito a un dipendente che il titolare non ha visto. Invece i «+» e le «×» finiti sotto la card sono
   **già morti** (`z-index:2` sotto 3, e la card ha sfondo opaco): lì (b) non toglierebbe niente, dichiarerebbe.
8. **I 5 scontri contesi sono fra decorazioni.** Nel grafo **tutte** le porte sono sempre spente
   (`const spenta = ramo || nd.stato === 'da fare'`), e le etichette del nodo aperto ripetono, **troncate**, i
   campi che la card stampa per esteso: porta «Archivio» contro campo «Archivio del cliente». Finché il nodo è
   aperto, le sue porte non aggiungono niente — e sono esattamente quelle che vanno addosso al nodo sotto.

E una nona, sul repository più che sul disegno: la sezione 11 di `prove/workflow.js` **si intitola «il nodo aperto
non copre nessuno»** ma misura `.wnode:not(.on)`, cioè solo i nodi chiusi; e un commento della versione 23 dichiara
che il nodo aperto «galleggia sopra gli altri». Il difetto era **già scritto nel repository come voluto**: quel
titolo afferma una cosa che la prova non verifica, e va corretto su qualunque strada si scelga.

### Quello che il consiglio ha demolito da sé

- **(a) poggiava su una misura falsa.** Il suo sostenitore proponeva una «lastra sopra» che lascia il canvas a
  1008 px «spostando la vista». Ma `canvasStringi(px, z, vista) = max(min(0,px), min(0, vista − 1008·z))`: con
  vista 1008 e zoom 1 lo scorrimento possibile è **0 px** (lo diventa 252 solo da 1,25x). Quindi la lastra **è**
  lo split della tabella, con il testo a 9,8 px — cioè proprio il prezzo che dichiarava di rifiutare.
- **(c) è caduta senza appello.** Nessuno dei cinque l'ha scelta.
- **La proposta di far crescere il nodo verso l'alto non regge**: `.wcanvas` ha `overflow:hidden`, e un nodo della
  prima riga partirebbe a **y = −188**, con i campi tagliati. La prima riga contiene 3 dei 5 nodi che coprono.

### Che cosa raccomando, e che cosa devi decidere tu

La raccomandazione è **spezzare la domanda in due**, perché tre delle cose trovate non sono un dubbio progettuale:
si misurano, e vanno chiuse comunque, qualunque strada scegli.

**Parte 1 — non è un dubbio, è una correzione** (nessuna delle tre strade, nessuna decisione da prendere):
- le porte del **nodo aperto** non si stampano finché è aperto: sono un doppione troncato dei suoi campi e nel
  grafo sono sempre spente → **chiude 5 scontri su 5** senza toccare una coordinata;
- le prese (`.wio`) di un nodo coperto non galleggiano più sopra la card aperta → chiude il difetto nuovo del
  punto 7, quello che fa nascere un collegamento da un nodo invisibile;
- il `wtag` della spina dorsale non finisce mai sotto una card;
- `ramoAggiungi` posa il passo nuovo sulla griglia da 18 e **sotto** l'ingombro del nodo aperto, non a `+210`;
- `ramoPosiziona` riceve lo stesso freno che `ramoInserisci` e `ramoNuovo` già hanno.

**Parte 2 — questo lo decidi tu**, ed è una domanda sola, con un prezzo misurato:

> Il passo verticale del grafo (oggi 216, seminato da `ramoPosa`) va portato a **342**, così che un nodo aperto non
> copra mai più quello sotto? Il prezzo misurato è che **la mini-mappa diventa permanente** (il canvas passa da
> 669 a 921 px e supera la soglia degli 820) e che il grafo non sta più in una schermata sola. E la mappa
> permanente, misurata sull'anteprima, **copre il 22 % del nodo del titolare** (180×22 px: la striscia dove sta
> scritto «aspetterà la tua firma»), perché sta a `left:16px; bottom:78px` e a passo 342 l'ultima riga arriva
> proprio lì. Il centro della card resta cliccabile. Se la parte 2 passa, la mappa va spostata o il canvas
> allungato sotto l'ultima riga: è una correzione piccola, ma va fatta insieme, se no si chiude una copertura e
> se ne apre un'altra proprio sul nodo che dice chi firma.

E, attaccata a quella, una seconda domanda che nessuno ti ha ancora messo davanti: **i grafi che hai già disposto a
mano restano al passo vecchio** — la regola 42 li trasporta e non li tocca. L'unico modo per portarli al passo
nuovo è **«Riordina»**, che oggi riscrive tutte le posizioni ed è l'unica eccezione ammessa alla 42. Va bene che
resti così (i vecchi restano come li hai messi, e li allinei tu quando vuoi), oppure vuoi che il prodotto te lo
proponga?

Se rispondi **no** alla parte 2, la strada che resta è **(b) nella forma minima**: velare quello che è
materialmente coperto, per la durata dell'apertura — che, misurato, toglierebbe pochissimo, perché i «+» e le «×»
lì sotto sono già morti.

### I punti ciechi che restano aperti — **da confermare**

- **Nessuno ha misurato che cosa succede a 40 dipendenti** su un grafo davvero denso: `w1` è una catena di 9 nodi
  in tre righe, e tutte le misure di questa sessione vengono da lì. A taglia 40 i workflow sono 6, ma il nodo
  aperto più alto resta 311.
- **Il gesto che decide il costo di (b) non è stato osservato**: se il titolare tiene un nodo aperto *mentre* ne
  collega altri, (b) gli rompe il flusso; se lo apre, legge, chiude, non gli toglie niente. Verificato come si
  chiude: si riclicca il nodo o si preme **Escape** (Console), si ritocca (telefono). Quindi **l'apertura dura
  finché vuoi tu**, non è momentanea — ma quanto la tieni aperta non lo sa nessuno.
- **Il numero degli strumenti**: `altNodo` cresce con `nd.strumenti.length`. Oggi il massimo misurato è 311 px (2
  strumenti), ma con 4 strumenti il nodo aperto sarebbe **387 px** e sfonderebbe anche il passo 342. Nessuna
  correzione del passo è una garanzia: è un buon valore predefinito.
- **Le parole**: i cinque consiglieri hanno usato **cinque nomi** per la stessa superficie nuova (lastra,
  pannello, scheda, riquadro, piano sopra) e **tre valori** per la stessa costante (324, 342, 360). Se la parte 2
  passa, il nome va scelto una volta sola.

## Come riprendere (dalla versione 28)

1. **La prima cosa è la risposta dell'utente alla parte 2** (il passo a 342, e che cosa fare dei grafi già
   disposti a mano). Finché non c'è, il canvas non si tocca.
2. **La parte 1 si può fare subito**, perché non è un dubbio progettuale: sono cinque correzioni misurate, tutte
   in `componenti.js` e `dati.js`, e nessuna cambia come si usa il prodotto. Se l'utente dà il via libera, si
   comincia da lì: chiudono 5 scontri su 5, il difetto delle prese sopra la card, e la frase della spina dorsale
   che sparisce.
3. **La sezione 11 di `prove/workflow.js` va rititolata comunque**: dice «il nodo aperto non copre nessuno» e
   misura solo i nodi chiusi. Il titolo afferma più di quello che verifica.
4. **Gli indirizzi giusti**, che il consiglio ha sbagliato due volte: il passo del **grafo** è `ramoPosa` in
   `dati.js:1350`; `W_PY` in `componenti.js:428` governa **solo** la serpentina dell'«ultima volta».
5. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono ancora su `section:nth-of-type(2)` per
   le consegne del Dipartimento; le sezioni 25 e 26 di `prove/workflow.js` vogliono un contesto `hasTouch` e
   costruiscono `TouchEvent` a mano.

## Stato alla fine della versione 28

- **Branch**: `claude/node-overlap-issue-ccwwgu`. La **PR #21 era unita** all'avvio, quindi si è ripartiti da
  `main` sullo stesso nome di branch, come chiede il prompt.
- **Codice**: **nessun file toccato.** Il prompt chiedeva esplicitamente di non scrivere codice prima della
  decisione, e la decisione è dell'utente.
- **Prove**: **587 verifiche verdi, 0 ko** — Console 160, mobile 83, Costi 50, Agenda e Chat 56, Workflow 189,
  Routine 49. Rilanciate all'inizio della sessione, prima di misurare. **Catture: 81**, ricontate.
- **Artefatti**: **non ripubblicati**, e per una ragione, non per dimenticanza: si rigenerano da `build-unico.js`
  a partire da un sorgente che non è cambiato, quindi sarebbero identici al byte. Restano quelli della 27 — la
  Console (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9).
- **Documenti toccati**: `PROSSIMA-SESSIONE.md` (questa sezione) e `schermate/direzioni/DIREZIONI.md`
  («Versione 28»).
- **Quello che resta aperto**, in ordine:
  1. **La decisione della parte 2** (il passo a 342 e i grafi già disposti): è la sola cosa che blocca il resto.
  2. **La parte 1**, cinque correzioni misurate che aspettano solo il via libera.
  3. **La decisione 75** (il modo semplificato per le routine con inneschi) aspetta i dati: i 3 inneschi sono
     tutti di tipo `ora`, nessuna routine ha un workflow dietro, il record non ha né `nodi` né `archi`.
  4. **Le decisioni 68 e 69** aspettano le biforcazioni (nel modello: 0).
  5. **La soglia di `g4`**, i **due contrasti a quaranta**, il **tetto giornaliero già sfondato** e la **pagina
     Impostazioni** (decisione 56) che non esiste. Restano il **candidato 8** (connettori) e il **candidato 5**
     (chat di dipartimento, decisioni 41 e 42).

## Pronto per la prossima sessione

Da incollare così com'è, **dopo aver risposto alle due domande della parte 2**.

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 28», «Come riprendere (dalla versione 28)» e «Stato alla
fine della versione 28»). Controlla la PR di quel branch: se è unita riparti da main tenendo lo stesso nome di
branch, altrimenti continua su quello.

Nella 28 non è stato scritto codice: il difetto del nodo che copre è passato dal consiglio, e il verdetto sta in
PROSSIMA-SESSIONE.md marcato «da confermare». Le prove sono 587 verdi e le catture 81: non rifare il canvas.

Ho risposto alle due domande: <QUI LA RISPOSTA SUL PASSO A 342 E SUI GRAFI GIÀ DISPOSTI A MANO>.

Fai prima la PARTE 1, che non è un dubbio progettuale ma cinque correzioni misurate: le porte del nodo aperto non
si stampano finché è aperto (doppione troncato dei suoi campi, e nel grafo sempre spente: chiude 5 scontri su 5);
le prese .wio di un nodo coperto non galleggiano più sopra la card aperta (oggi z-index 5 contro 3, e rispondono
al clic: si tira un collegamento da un nodo invisibile); il wtag «esce senza la tua firma» non finisce mai sotto
una card; ramoAggiungi posa il passo nuovo sulla griglia da 18 e sotto l'ingombro del nodo aperto, non a +210;
ramoPosiziona riceve il freno che ramoInserisci e ramoNuovo già hanno. Poi la PARTE 2, secondo la mia risposta.

Gli indirizzi giusti, che il consiglio ha sbagliato due volte: il passo del GRAFO è ramoPosa in dati.js:1350;
W_PY in componenti.js:428 governa solo la serpentina dell'ultima volta, dove il difetto non esiste. E rititola
comunque la sezione 11 di prove/workflow.js: dice «il nodo aperto non copre nessuno» e misura solo i nodi chiusi.

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura. Attenzione: scatta.js e prove/console.js si reggono
ancora su section:nth-of-type(2) per le consegne del Dipartimento; le sezioni 25 e 26 di prove/workflow.js
vogliono un contesto hasTouch e costruiscono TouchEvent a mano. Se il passo cambia, la prova workflow.js:320
(g.mappa === 0) va rifatta: a passo 342 la mini-mappa diventa permanente.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo, DIREZIONI.md,
SYSTEM-DESIGN.md, i README, PROSSIMA-SESSIONE.md, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
node schermate/direzioni/build-unico.js              # i due file unici per gli artefatti
```

Nota: `export SC=… PLAYWRIGHT_MODULE=…` sulla **stessa riga** non funziona — la shell espande `$SC` prima di
assegnarlo, e le prove partono cercando `/fonts.css`. Vanno su righe separate.

## Versione 27 — il canvas passa al telefono e diventa un componente (2026-09-09)

**Le decisioni 72-74 della versione 26 sono disegnate.** Erano prese e non toccavano codice: adesso ci sono. La
75 (il modo semplificato per le routine con inneschi) resta ferma dov'era — aspetta i dati, e i dati non ci sono.
**587 verifiche verdi** (erano 552), **81 catture** (erano 79), 0 ko.

### Che cosa c'è adesso

1. **Il canvas si è spostato, non riscritto.** `canvasWorkflow` con tutto il suo CSS è passato da
   `direzione-a.js` a `schermate/componenti.js`, che `mobile.html` carica già. Il CSS è **lo stesso**, riga per
   riga: tutti e due i file fanno `prefissa(css, '.dirA')`, quindi si trasporta. Con lui il conto della griglia
   (`W_COL`, `W_PX`, `W_PY`…), `altNodo`, `wpos`, `arcoVia`, `nodoWorkflow`, più tre funzioni nuove che le due
   superfici condividono: `canvasMisure`, `canvasTuttoDentro`, `canvasSuNodo` (e `canvasStringi`, `W_METRICHE`).
   Nella Console restano la pagina e i suoi gesti. **La prova che è un trasporto e non una riscrittura**: delle
   79 catture della Console ne sono cambiate **sei** — le sole che portano la barra dello zoom, arrivata dal
   punto 3 — e `a-grafo*.png` sono identiche al byte.
2. **`soloLettura`: un interruttore, non un secondo canvas.** Sul telefono vanno a zero le 16 prese `.wio`, gli
   8 «+» sull'arco, le 8 «×», il trascinamento dei 9 nodi e le due azioni della barra («Riordina», «Aggiungi»).
   Restano il nodo che si apre (è lettura) e lo zoom. Cadono anche la barra in fondo, il conto in cima e la
   mini-mappa da 200×120, che a 278,4 px coprirebbe il disegno che dovrebbe aiutare a leggere. La classe lo dice:
   `.wcanvas.comp` si compone, `.wcanvas.sl` si legge. **Regola 43** in `SYSTEM-DESIGN.md`.
3. **Lo zoom vale su tutte e due le tab.** Era `const z = ramo ? zoom : 1`: «L'ultima volta» — dove stanno costi,
   durate e «aspetta la tua firma» — era a scala fissa. Adesso lo zoom è del **canvas**, non della tab.
4. **Le due scale, misurate**: ingresso «tutto dentro» = 278,4 / 910 = **0,306** (testo a 4,3 px, card alta 205
   px); tocco su un nodo = **scala 1** (testo a 14 px, card alta 669 px). «Tutto dentro» vuol dire tutto: il
   grafo va da 0 a 348 px di schermo su 348, tocca tutti e due i fianchi. La seconda scala centra il nodo
   toccato: misurato **0,0 px** dal centro visibile.
5. **I due gesti del dito.** Nel repository non c'era **nessun** ascoltatore `touch` o `pointer`: era tutto
   mouse. Adesso due, e non uno di più: trascina-la-vista in orizzontale (160 px di dito = **128 px di disegno**,
   cioè 160 / 1,25) e pinch (due dita a un terzo portano lo zoom a 0,333, e il punto fra le dita resta fermo).
   Il verticale non è un gesto del canvas: `touch-action:pan-y` lo lascia alla pagina, e una prova verifica che
   un dito in su **non** muove la vista.
6. **La colonna è caduta, le etichette del contratto no.** Spariti `.m-wf`, `.m-wn`, `.m-warc`, `.m-wgo` e con
   loro i chip della topologia, che adesso è disegno. Restano quelli del contratto («esce senza la tua firma»,
   «resta in azienda»), **fuori** dal canvas così non si rimpiccioliscono con lui: 10 px invece di 4,3.

### Le tre misure che hanno cambiato il disegno

Sono le cose che il righello ha trovato e che a occhio non si vedevano.

1. **Su `w1` la striscia del contratto sarebbe nata vuota.** `ramoEsce` sul grafo di partenza — una catena —
   ritorna `fuori: []` e `anticipata: []`: una striscia costruita sulle sole eccezioni non avrebbe stampato
   niente. Il contratto però c'è, ed è il più forte dei tre: tutto arriva alla firma. Quando non ci sono
   eccezioni la striscia dice la **regola**, con le parole che il nodo del titolare stampa già dentro il canvas —
   «aspetterà la tua firma».
2. **Il centro verticale non era dove sembrava.** I rettangoli della pagina sono in pixel di **schermo** (i
   telefoni stanno dentro `zoom:1.25`) mentre `scrollTop` è in pixel **CSS**; e il centro non è quello della
   cornice ma quello della parte che si **vede**, perché in basso la navigazione ne copre una fascia — che è il
   `padding-bottom` che lo scorrevole già dichiara. Prima della correzione lo scarto era −59,1 px in un caso e
   −38,9 in un altro; dopo è **0**.
3. **`?nodo=` entrava alla scala sbagliata.** L'indirizzo calcolava sempre «tutto dentro», quindi la cattura
   della seconda scala non sarebbe stata la schermata ma la schermata scorsa a caso. Adesso un indirizzo e un
   dito lasciano **la stessa schermata**.

E una che ha **evitato** una correzione sbagliata: in un piede di nodo si leggeva «12 min2 €» e sembrava una
sovrapposizione fra durata e costo. Misurati gli spazi: **126-233 px**, nessuna sovrapposizione — erano i testi
di due nodi diversi concatenati da `textContent`. Niente da correggere.

### Regola 42, verificata

Tre prove confrontano `offsetLeft`/`offsetTop` dei nodi **prima e dopo**: dopo lo zoom sul telefono, dopo il
trascinamento della vista, dopo il pinch, dopo lo zoom nella Console. Identici al pixel. Il prezzo accettato sta
scritto in una prova: a scala 1 il disegno esce di **730 px** dalla cornice del telefono, e si raggiunge
trascinando.

### Un difetto misurato che non è di questa versione, e resta aperto — **da confermare**

Aprendo un nodo a scala 1, il nodo aperto **copre quello sotto**: nella Console `p3` copre `p7` per **208×87 px**
(il nodo intero), sul telefono per 208×47; due etichette di porte finiscono a **8 px** l'una dall'altra.

È un difetto della **versione 24**: nel grafo le posizioni sono libere e la spinta della serpentina (`spintaDi`,
versione 22) lì non si applica — a ragione, perché spostare i nodi violerebbe la regola 42. La 27 lo rende solo
più visibile, perché sul telefono si guarda un nodo alla volta. **Non è stato toccato**: le tre strade per
chiuderlo (l'editor in un pannello invece che dentro il nodo; le porte che si spengono sotto il nodo aperto; il
nodo aperto che si stringe) cambiano **come si usa il prodotto**, quindi è un dubbio progettuale — passa dal
consiglio e poi dall'utente. Sta anche in `DIREZIONI.md`, «Versione 27», §8.

## Come riprendere (dalla versione 27)

1. **Il difetto del §8 è la prima cosa da mettere davanti all'utente**, e con il consiglio: è l'unica cosa aperta
   che si vede a occhio nudo aprendo un nodo.
2. **La decisione 75 aspetta ancora i dati**: tutti e 3 gli inneschi delle routine sono di tipo `ora`, nessuna
   routine ha un workflow dietro, e il record non ha né `nodi` né `archi`. Il vero primo passo è che un workflow
   possa **nascere dal nulla**: oggi nasce solo da un'esecuzione riuscita (`workflowDi`), né sul telefono né
   nell'editor. **Le decisioni 68 e 69 restano in attesa dei dati** (biforcazioni: 0), come dalla versione 25.
3. **Il canvas adesso è in `componenti.js`**: chi lo tocca cambia tutte e due le superfici insieme. La Console
   passa `soloLettura: false` (predefinito), il telefono `true` con `vista: 278.4` e `barra/chips/mappa: false`.
4. **Le prove touch** (`prove/workflow.js`, sezioni 25 e 26) vogliono un contesto `hasTouch` e costruiscono
   `TouchEvent` a mano: `page.touchscreen` muove un dito solo e il pinch ne vuole due.
5. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono ancora su `section:nth-of-type(2)`
   per le consegne del Dipartimento.

## Stato alla fine della versione 27

- **Branch**: `claude/canvas-mobile-workflow-da5j4j`, **PR #21**
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/21), aperta a fine sessione. La **PR #20 era già unita**
  all'avvio, quindi si è ripartiti da `main` sullo stesso nome di branch, come chiede il prompt. Se all'avvio
  della prossima la #21 risulta unita, ripartire da `main`
  (`git fetch origin main && git checkout -B <branch> origin/main`).
- **Prove**: 587 verifiche verdi, 0 ko — Console 160, mobile 83, Costi 50, Agenda e Chat 56, Workflow 189,
  Routine 49. **Catture**: 81.
- **Artefatti ripubblicati allo stesso indirizzo**, tutti e due con l'etichetta «Versione 27»: la Console
  (https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e il telefono
  (https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). Nota per chi ripubblica: lo strumento
  rifiuta la pubblicazione finché non si è **letta per intero** la copia salvata della versione viva (7 420 righe
  la Console, 6 116 il telefono). Conviene farlo fare a un sottoagente, che ci mette il suo contesto invece del tuo.
- **Codice toccato**: `componenti.js` (il canvas trasportato con il suo CSS, `soloLettura`, `canvasMisure`,
  `canvasTuttoDentro`, `canvasSuNodo`, `canvasStringi`, `W_METRICHE`), `direzione-a.js` (il canvas tolto, lo zoom
  su tutte e due le tab, i gesti che leggono `.wcanvas`), `mobile.js` (la schermata 10 rifatta sul canvas vero, i
  due gesti touch, `entraCanvas`/`toccaNodo`/`centraNodo`/`zoomM`), `mobile.html` (`?nodo=`),
  `prove/workflow.js` (sezioni 11 e 23 riscritte su `.wnode`, nuove la 25 e la 26), `scatta.js` (due catture
  nuove). **Non toccati**: `dati.js`, `comune.js`, `avatar/`, `direzione-a.html`, lo specimen e i token.
- **Quello che resta aperto**, in ordine di quanto si vede:
  1. **Il nodo aperto copre quello sotto** — Console `p3` su `p7` = 208×87 px, telefono 208×47, due etichette di
     porte a 8 px. È della versione 24, misurato e lasciato aperto perché le tre strade per chiuderlo cambiano
     come si usa il prodotto: dubbio progettuale, consiglio e poi utente. `DIREZIONI.md`, «Versione 27», §8.
  2. **La decisione 75** (il modo semplificato per le routine con inneschi) aspetta i dati: i 3 inneschi sono
     tutti di tipo `ora`, nessuna routine ha un workflow dietro, il record non ha né `nodi` né `archi`. Il vero
     primo passo è che un workflow possa **nascere dal nulla**: oggi nasce solo da un'esecuzione riuscita.
  3. **Le decisioni 68 e 69** aspettano le biforcazioni (nel modello: 0).
  4. **La soglia di `g4`** (a 50 € non trattiene niente: la consegna più cara costa 33,80) e **i due contrasti a
     quaranta** (uscite senza il titolare mentre `g1` dice «Sempre da approvare»): la pagina li dice, il prodotto
     non sa ancora che cosa farne.
  5. **Il tetto giornaliero è già sfondato** (3 dipendenti su 11, 12 su 40; l'azienda al 108 % e al 107 %) e
     nessuna pagina lo dice. La **pagina Impostazioni** (decisione 56) non esiste. Restano il **candidato 8**
     (connettori) e il **candidato 5** (chat di dipartimento, decisioni 41 e 42).

## Pronto per la prossima sessione

Da incollare così com'è.

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 27», «Come riprendere (dalla versione 27)» e «Stato alla
fine della versione 27»). Controlla la PR #21: se è unita riparti da main tenendo lo stesso nome di branch,
altrimenti continua su quello.

Il codice della versione 27 è verde e completo: il canvas vive in schermate/componenti.js ed è LO STESSO
componente per la Console (che lo compone) e per il telefono (che lo legge, con soloLettura), 587 verifiche in
sei prove e 81 catture. Non rifarlo.

Il prossimo passo è UNO, ed è il difetto misurato che sta in DIREZIONI.md, «Versione 27», §8: aprendo un nodo, il
nodo aperto COPRE quello sotto — nella Console p3 copre p7 per 208x87 px, cioè il nodo intero, sul telefono per
208x47, e due etichette di porte finiscono a 8 px l'una dall'altra. È della versione 24, non della 27: nel grafo
le posizioni sono libere e la spinta della serpentina (spintaDi) lì non si applica, a ragione, perché spostare i
nodi violerebbe la regola 42 (le posizioni sono DATI del titolare e non si ricalcolano mai).

È un dubbio progettuale, quindi NON scrivere codice prima della decisione: passalo dalla skill llm-council con il
contesto scritto per esteso — che cos'è DGT e la sua spina dorsale, che cosa il canvas è già oggi, e le tre
strade con il loro prezzo IN NUMERI, misurato aprendo le pagine, non stimato:
  (a) l'editor in un pannello accanto al canvas invece che dentro il nodo — il nodo resta alto 87 px sempre;
  (b) le porte e i nodi sotto quello aperto che si spengono o si nascondono finché resta aperto;
  (c) il nodo aperto che si stringe — meno campi, o i campi su una riga sola.
Chiedi a ogni consigliere l'obiezione più forte alla propria scelta, una terza strada e le conseguenze concrete
sull'interfaccia già costruita; NON saltare la revisione incrociata, che nelle versioni 24, 25, 26 e 27 è quella
che ha cambiato la risposta. Poi porta a me il verdetto e i punti ciechi: la decisione la prendo io. Scrivili in
PROSSIMA-SESSIONE.md marcati «da confermare» finché non rispondo.

Da sapere prima di misurare: la regola 42 non si viola nemmeno per chiudere questo difetto, e tre prove la
verificano confrontando offsetLeft/offsetTop prima e dopo ogni ingrandimento, trascinamento e pinch. Sul telefono
il canvas è in sola lettura (.wcanvas.sl) e la vista è 278,4 px, con lo scatto d'ingresso «tutto dentro» a 0,306
e il tocco sul nodo che porta a scala 1 centrata: qualunque strada si scelga deve reggere tutte e due le scale e
tutte e due le superfici, perché adesso sono un componente solo (regola 43).

Il metodo di sempre: prima e dopo, rifare i font locali, lanciare le SEI prove di prove/ e catturare le pagine
PRIMA di toccare qualcosa; quello che si misura si misura, e una diagnosi a occhio va verificata col righello
prima di diventare una correzione. Attenzione: scatta.js e prove/console.js si reggono ancora su
section:nth-of-type(2) per le consegne del Dipartimento; le sezioni 25 e 26 di prove/workflow.js vogliono un
contesto hasTouch e costruiscono TouchEvent a mano, perché page.touchscreen muove un dito solo e il pinch ne
vuole due.

Alla fine: prove aggiornate, screenshot, artefatti ripubblicati allo stesso indirizzo, DIREZIONI.md,
SYSTEM-DESIGN.md, i README, PROSSIMA-SESSIONE.md, commit, push e PR.
```

### Pronto breve, se vuoi solo tirare dritto

```
Leggi CLAUDE.md e PROSSIMA-SESSIONE.md («Versione 27», «Come riprendere (dalla versione 27)»). Controlla la PR
#21: se è unita riparti da main tenendo lo stesso nome di branch. Il codice della 27 è verde (587 verifiche, 81
catture) e il canvas è un componente solo per Console e telefono: non rifarlo. Prossimo passo: il difetto del §8
di DIREZIONI.md — il nodo aperto copre quello sotto (208x87 px nella Console). È un dubbio progettuale: passalo
dal consiglio con le tre strade misurate in numeri, non violare la regola 42, e portami il verdetto perché
decida io. Il metodo di sempre, e alla fine prove, screenshot, artefatti, documenti, commit, push e PR.
```

### I comandi che servono subito

```bash
export SC=<cartella-di-lavoro>                       # es. lo scratchpad della sessione
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules
export LOCAL_FONT_CSS=$SC/fonts.css                  # i font locali vanno rifatti a ogni sessione
node schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js
node schermate/direzioni/scatta.js [--in <cartella>] [gruppo…]
node schermate/direzioni/build-unico.js              # i due file unici per gli artefatti
```

Nota: `export SC=… PLAYWRIGHT_MODULE=…` sulla **stessa riga** non funziona — la shell espande `$SC` prima di
assegnarlo, e le prove partono cercando `/fonts.css`. Vanno su righe separate.

## Versione 26 — il workflow sul telefono diventa il canvas, e le posizioni sono dati (2026-09-09)

Quattro decisioni prese dall'utente, tutte sulla raccomandazione del consiglio. **Nessuna è ancora in codice**:
questa sessione ha misurato, consultato e deciso; il disegno si fa nella prossima. Il codice del prodotto è quello
della versione 25 (552 verifiche verdi, 79 catture).

### Da dove nasce

Giudizio dell'utente sulla schermata 10 del telefono: «come è stato fatto adesso non mi piace per niente perché
dà un'anteprima del workflow sbagliata». **Verificato guardando le due catture, ed è vero.** Telefono e Console
oggi non sono lo stesso oggetto a due misure, sono **due disegni diversi**: fondo chiaro contro notte; card a
tutta larghezza (348 px) contro nodo da 208; una colonna dritta contro una serpentina su tre righe; porte come
chip dentro la card contro pallini con etichetta sotto il nodo; barretta dritta contro curva luminosa. Chi guarda
il telefono si figura *un elenco di cinque passi*, poi apre la Console e trova *una lavagna notturna*.

### Le quattro decisioni

| n. | domanda | decisione |
|---|---|---|
| **72** | che forma prende il workflow sul telefono | **il canvas vero, in sola lettura**, con tre condizioni: resta una **card dentro la pagina** (non una schermata intera, così firma, freni e tab non si spostano); lo zoom vale su **tutte e due le tab**, non solo «La prossima volta»; le posizioni **non si ricalcolano mai** (regola 42) |
| **73** | con quale ingrandimento si apre | **«tutto dentro» (0,306) come stato d'ingresso**, e il tocco su un nodo porta a scala 1 centrato su quello. Un oggetto a due scale invece di due oggetti: la mappa non è un componente nuovo, è lo stesso canvas rimpicciolito |
| **74** | che fine fa la colonna di oggi | **sparisce, il canvas la sostituisce**. I chip che dicono la topologia («2 rami», «arriva da 2») diventano disegno; quelli che dicono il **contratto** («esce senza la tua firma», «resta in azienda») restano come etichette, perché dicono la firma e la firma non si legge a 4,3 px |
| **75** | il modo semplificato per creare routine con trigger | **prima i dati, poi il modo.** Si costruisce quando esistono gli inneschi veri. Vincoli già decisi: stesso oggetto dell'editor, apribile lì; può solo **stringere**, mai allargare; **non può accendere una firma anticipata senza i tre freni**; se il flusso esce dalla catena, il modulo si rifiuta di aprirlo e manda al canvas, **mai appiattire in silenzio**. Il nome è **«routine»**: esiste già, niente parole nuove |

### Le misure che hanno deciso, e quella che avevo sbagliato

Quanto grafo entra nella larghezza utile dello schermo (278,4 px), a scala 1:

| | scala | testo da 14 px |
|---|---|---|
| 1 colonna di nodi (208 px) | **1** | **14 px** |
| 2 colonne (una biforcazione, 442 px) | 0,6 | 8,8 px |
| 3 colonne (676 px) | 0,4 | 5,8 px |
| 4 colonne = tutto il grafo (910 px) | **0,306** | **4,3 px** |

**Il numero che avevo sbagliato io, e che i revisori hanno corretto.** Nel contesto passato al consiglio avevo
scritto «~5,6 schermate di trascinamento» per attraversare un grafo. È falso: `direzione-a.js:1680` fa
`translate(${px}px, 0)` — il pan è **solo orizzontale** — e la card del canvas cresce in altezza
(`alt = basso * z + 62`), quindi il verticale lo fa il normale scorrimento della pagina. Il prezzo vero della
strada scelta è **632 px di scorrimento laterale** (910 − 278,4). Metà del consiglio ha discusso un costo che non
esiste, e la strada dell'utente ne è uscita più forte di come io l'avevo presentata.

### Che cosa ha trovato la revisione incrociata, e i pareri no

Come nella versione 24 e nella 25, le cose che hanno cambiato la risposta vengono da qui.

1. **Le posizioni dei nodi sono dati del titolare** (`ramoPosiziona`, `dati.js:1357`, scrive `nd.x`/`nd.y` con il
   vincolo `1008 - 208 - 8`). Due pareri proponevano di «riposare» il grafo sul telefono per azzerare lo
   scorrimento laterale: mostrerebbe una disposizione che il titolare non ha scelto. **È diventata la regola 42**,
   ed è l'argomento più forte a favore della strada dell'utente — che nessuno dei cinque pareri aveva.
2. **Lo zoom esiste in una tab su due.** `const z = ramo ? zoom : 1` (`direzione-a.js:1566`), e lo stesso per la
   mini-mappa (1655) e la barra dello zoom (1664). «L'ultima volta» — la tab dove stanno costi, durate e «aspetta
   la tua firma» — è a scala fissa, senza zoom e senza mappa. Ogni parere era scritto per metà della pagina.
3. **Il canvas è una card, non una schermata** (`direzione-a.js:1679`). Il parere che rifiutava la strada
   dell'utente lo faceva su un costo inventato («il titolare smette di firmare dal telefono»): come card, la
   pillola della firma e i tre freni restano dove sono. L'argomento decisivo contro spariva.
4. **Un parere aveva inventato un numero**: «26 routine a quaranta». Contate: **3 a undici e 3 a quaranta**; 26 è
   il numero dei *workflow*. Verificato a mano prima di usarlo.
5. **278,4 px non è un telefono vero**: è la cornice 300×620 dello specimen mostrata a `zoom:1.25`. Su un telefono
   reale (390-430 px CSS) la scala «tutto dentro» sarebbe ~0,43. Le decisioni restano prese nel sistema di misura
   dello specimen, che è quello del repository, ma va saputo.

### Perché la 75 non tocca codice oggi

Contato nel modello: **tutti e 3 gli inneschi delle routine sono di tipo `ora`** (evento, soglia ed esterno hanno
zero record); **nessuna delle 3 routine ha un workflow dietro**; il record `routine` **non ha né `nodi` né
`archi`** (ha `passi`, che sono nomi) e tutte sono `origine: 'derivata'`. Il «trigger event» che l'utente vuole
**non esiste nei dati**, e nemmeno l'oggetto su cui il modo semplificato dovrebbe scrivere. Regola 26: non si
promette quello che non c'è. Da segnalare per chi la costruirà: oggi un workflow **nasce da un'esecuzione
riuscita** (`workflowDi`), quindi «creare un flusso dal nulla» è un gesto che nel prodotto non esiste ancora —
né sul telefono né nell'editor. È il vero primo passo della 75, prima di qualunque modulo.

## Come riprendere (dalla versione 26)

1. **Il disegno della 72-74 è tutto da fare.** Il metodo di sempre: rifare i font locali, lanciare le sei prove di
   `prove/` e catturare le pagine **prima** di toccare qualcosa.
2. **L'ordine suggerito**: (a) spostare il canvas da `direzione-a.js` a `componenti.js` — che `mobile.html` carica
   già — insieme al suo CSS, che **non va riscritto** perché tutti e due i file fanno `prefissa(css, '.dirA')`;
   (b) il flag `soloLettura` che spegne prese, `+` sull'arco, `×`, trascinamento del nodo e «Riordina»; (c) lo
   zoom esteso alla tab «L'ultima volta»; (d) lo scatto d'ingresso «tutto dentro»; (e) i gesti touch — **oggi nel
   repository non ce n'è nessuno, è tutto mouse**: ne servono due, trascina-la-vista e pinch.
3. **Le prove che moriranno**: le sezioni di `prove/workflow.js` che contano `.m-wn` vanno riscritte su `.wnode`.
   La sezione dei freni (versione 25) sopravvive.
4. **Attenzione**, come sempre: `scatta.js` e `prove/console.js` si reggono ancora su `section:nth-of-type(2)` per
   le consegne del Dipartimento.
5. **Le decisioni 68 e 69 restano in attesa dei dati** (biforcazioni: 0), come dalla versione 25.


## Versione 25 — le quattro decisioni prese, e il permesso che non aveva freni (2026-09-09)

Le tre domande della versione 24 e la quarta che solo la revisione incrociata aveva sollevato sono **decise**
dall'utente, tutte e quattro sulla raccomandazione del consiglio. Tre non toccano codice oggi; la quarta era un
difetto vivo, ed è chiusa. **552 verifiche verdi** (erano 535), 79 catture.

### Le quattro decisioni

| n. | domanda | decisione |
|---|---|---|
| **68** | che aspetto ha un ramo mai percorso nell'«ultima volta» | **spento, e a dirlo è il collegamento**: il nodo resta quello che è (`.arc.off`, porte spente: zero stati nuovi) e il filo non percorso porta l'etichetta **«non è passato di qui»**. La parola separa «non ancora» da «mai», che sarebbero lo stesso grigio su 9 nodi a undici e 40 a quaranta |
| **69** | un flusso biforcato produce una voce o *n* nella coda | ***n* voci, vicine e legate**: una per uscita, perché la responsabilità è per uscita; consecutive in coda, e ognuna dice «2 di 3 · stessa esecuzione». Prezzo misurato: da 4 voci a 6-8 a undici, da 7 a 10-12 a quaranta |
| **70** | quale parola per il quarto tipo di connettore | **«se si ferma»**, la parola del modello. Misurata nel canvas vero, Urbanist 10 px: **65,67 px**, dentro i 150 dell'etichetta — e smonta l'obiezione di chi voleva portare il canvas da quattro colonne a tre stimandola ~95 |
| **71** | la clausola dell'innesco prende i tre freni della firma anticipata | **sì, gli stessi tre** |

### La 71 era un difetto vivo, e adesso è chiuso

Firmare in anticipo si poteva in **due modi**: la pillola «firma anticipata», che dichiara soglia, perimetro e
scadenza, e il **permesso sul nodo d'innesco**, che non aveva **nessun** freno. La seconda era la più nascosta
(si accende dentro il canvas, non nel pannello dove il titolare guarda le approvazioni) ed era la più permissiva.
E la descrizione di «Fai pure» **prometteva già** i tre freni che il codice non applicava: la parola diceva una
cosa e la funzione ne faceva un'altra.

Che cosa è cambiato:
- i tre freni stanno in **una funzione sola** (`ramoFreni`), che leggono la firma anticipata, il permesso, la
  Console e il telefono. Prima erano scritti a mano in due pagine e non governavano niente;
- `ramoRegime(w)` dice **quale delle due strade** firma, e la sezione lo stampa («Dal permesso», non solo
  «Accesa»): con due interruttori per la stessa luce, dire che è accesa non dice chi l'ha accesa;
- `ramoEsce` **non tace più** cambiando permesso. Prima un ramo che non arriva alla firma diceva «resta in
  azienda» con «chiedi prima di consegnare» e **niente** con gli altri due — l'informazione spariva dove serviva
  di più. Ora dice «esce senza la tua firma», e la riga in cima lo conta.

**La prova era tautologica, e me ne sono accorto solo eseguendola.** Nel grafo di partenza *ogni* nodo arriva al
titolare, quindi i rami terminali sono **zero** e il confronto «con il permesso escono tanti rami quanti ne
restavano senza» era `0 === 0`: verde, e non provava niente. La prova adesso **costruisce il caso** col gesto
vero — si tira dalla presa e si rilascia nel vuoto — e allora i numeri sono 1 contro 0 e 0 contro 1.

### Un secondo difetto, trovato disegnando

Il rilascio nel vuoto posava il passo nuovo **sopra un altro nodo**: nella prima cattura ne copriva due, e con
loro il proprio tag. Il gesto gemello (il «+» sul connettore) la spinta verso il basso ce l'aveva già dalla
versione 24 (`ramoOccupato`); a `ramoNuovo` mancava, ed erano le stesse due righe. Adesso: **0 coppie di nodi
sovrapposti**, e una prova lo fissa.

Da segnalare: la prima diagnosi era **sbagliata** — avevo scritto che a coprire fosse il tag, troppo lungo.
Misurato: «esce senza la tua firma» sta in **148 px** contro i 208 del nodo, quindi il tag non sborda affatto.
A coprire era il nodo. La misura ha corretto la diagnosi prima che diventasse una correzione inutile.

### Le tre decisioni che non toccano codice oggi, e perché

68 e 69 descrivono cose che nei dati **non esistono ancora**: le condizioni sui connettori sono **zero** e i
flussi biforcati sono **zero**, quindi non c'è un ramo mai percorso da spegnere né una biforcazione che produca
più voci in coda. Si costruiscono insieme alla prima esecuzione biforcata, non prima (regola 26: non si promette
quello che non c'è). La 70 era già in codice dalla versione 24, e la decisione la conferma.

## Come riprendere (dalla versione 25)

1. **Le decisioni 68 e 69 aspettano i dati, non una risposta.** Sono decise; quello che manca è la prima
   esecuzione **biforcata** nel modello — oggi le condizioni sono zero e i flussi biforcati sono zero. Chi la
   costruisce porta con sé: il filo mai percorso spento con l'etichetta «non è passato di qui» (68), e le *n*
   voci consecutive in coda con «2 di 3 · stessa esecuzione» (69). Sono già scritte: non si ridiscutono, si
   disegnano.
2. **Il candidato 8, i connettori** — l'ultimo dei tre, e il più lungo. Aspetta ancora le sue risposte
   (credenziale nominata per cliente, permesso d'uso del dipartimento, la parola «accesso», la sezione nel
   Dipartimento). Prima del codice servono una regola di disegno nuova (l'accesso quadrato e monocromo, mai
   tondo — la regola 19 vieta il disco in tinta per un oggetto che non è una persona) e due icone che nello
   sprite non ci sono (**chiave**, **busta**).
3. **Il candidato 5, la chat di dipartimento**: le due domande che lo bloccavano hanno risposta (decisioni 41 e
   42). Non manca una decisione, manca il codice.
4. **Il metodo non cambia**: font locali, sei prove e catture **prima** di toccare, e le stesse dopo. Due
   trappole viste in questa sessione, tutte e due costate poco solo perché la misura è arrivata prima del codice:
   una prova che confronta **zero con zero** è verde e non prova niente (costruisci il caso, poi misura), e una
   **diagnosi a occhio** («il tag è troppo lungo») può essere falsa — 148 px contro 208, non sbordava.
5. **Attenzione, ancora vera**: `scatta.js` e `prove/console.js` si reggono su `section:nth-of-type(2)` per le
   consegne del Dipartimento. Aggiungere una sezione prima di quella le rompe tutte e due.

---



## Versione 24 — il grafo disegnato, e le tre domande (2026-09-08; le risposte sono nella versione 25)

**Fatto tutto l'ordine di «Come riprendere»**, i sette punti: il grafo, il trascinamento, «Riordina», il collegare,
lo zoom con la mini-mappa, il «+» sul connettore con la selezione multipla e le scorciatoie, e il telefono.
**535 verifiche verdi** (erano 478), **79 catture** (erano 77). Più due difetti chiusi che sono venuti fuori
disegnando, e che nessuno aveva visto perché nessuno aveva ancora disegnato.

### Che cosa c'è adesso nel canvas

| | |
|---|---|
| **Il grafo** | archi da `G.archi`, non dall'ordine dell'array; posizioni libere; nodo d'innesco in testa col fianco arrotondato a 44 e senza presa d'entrata; prese sui fianchi (a destra si esce, a sinistra si entra); il titolare senza presa d'uscita |
| **Trascinare** | esatto a 1440, 1920 e 1024 px e con lo zoom a 1,5 e 0,6 — **5 su 5** — sempre agganciato ai 18 px |
| **«Riordina»** | tre nodi trascinati fanno **5 incroci** di collegamenti; «Riordina» li porta a **0** |
| **Collegare** | si tira dalla presa; il **rilascio nel vuoto** crea il passo già collegato (9/9 → 10/10) |
| **Sul collegamento** | l'etichetta del significato (e **«poi» non si stampa**), il **«+»** che infila un passo, la **«×»** che lo toglie |
| **Zoom e mini-mappa** | 208 px → **312** a 1,5× e **124,8** a 0,6×, a tre larghezze; la mini-mappa compare quando serve |
| **Selezione multipla** | maiuscolo o riquadro sul fondo; due nodi si spostano dello stesso spostamento (108/108) |
| **Scorciatoie** | sei, non quaranta: `R`, `+`/`−`, `0`, `Canc`, `Esc`, `Ctrl/Cmd+A` |
| **Il telefono** | le due tab della Console; la colonna in ordine topologico; i chip «2 rami», «se… → *passo*», «arriva da 2», «resta in azienda» |

### I due difetti chiusi

1. **Il 47 % del «costo misurato» era una stima.** Il costo di un workflow sommava anche i passi da fare, e quello
   di un passo da fare è una stima — lo dice il codice che la genera. w1 stampava **71,20 €** «misurati», di cui
   **33,20 stimati**, e 121 minuti di cui 83. Adesso: **38 € e 38 minuti** avvenuti, la previsione in un campo suo.
   Corollario: `eur(0)` stampa «0 €», quindi un passo non avvenuto stampava uno zero inventato — sul canvas **e sul
   telefono**, dove era rimasto vivo anche dopo la correzione della Console. Adesso in nessuno dei due.
2. **Nodi e archi leggevano due posizioni diverse.** I nodi la posizione libera, gli archi la serpentina:
   coincidevano solo perché la posa di partenza era la stessa, e **al primo trascinamento il connettore restava
   indietro**. Una prova adesso verifica su ogni arco che i due capi cadano sulle prese, a meno di 1 px.

### La disposizione ha dovuto cambiare, e non è un'opinione

Il primo disegno ha riusato la serpentina (riga dispari all'indietro). Con le prese sui **fianchi**, una riga che
torna indietro rende **ogni suo arco un ritorno**: 8 collegamenti, **4 all'indietro**. Nel grafo le righe vanno
tutte da sinistra a destra; la serpentina resta nell'**ultima volta**, che è una catena avvenuta. E il passo è
diventato **234×216** (13×18 e 12×18) perché l'aggancio è a 18 px e il passo vecchio (242×210) non lo era: un nodo
appena disposto stava *fra* i punti, uno trascinato *sopra*. La colonna regge: 982 px dentro i 1008.

---

## Il consiglio sulle tre domande — **tutte e quattro decise il 9 settembre** (decisioni 68-71)

Cinque pareri indipendenti, cinque revisioni incrociate anonime. **Come sempre, la parte che ha cambiato la
risposta è venuta dalla revisione**, e stavolta ha corretto anche me:

- **una premessa del contesto era falsa, e l'avevo scritta io**: «la coda mostra già più voci per la stessa
  esecuzione». Verificato: le consegne **in attesa** per esecuzione sono **una**, a undici e a quaranta. Le tre
  uscite di un'esecuzione stanno in `bozza`/`da fare`/`fatto`/`errore` e **non entrano mai in coda**. Tutti e
  cinque i consiglieri ci hanno costruito sopra. È la terza volta: il contesto va **verificato nel codice**, non
  solo scritto per esteso;
- **un numero l'ho sbagliato io**: «49 nodi spenti a quaranta». Sono **40**; 49 erano 9+40, due caselle sommate;
- **le parole collidono**, e solo la revisione l'ha contato (vedi domanda 3);
- **una misura ha battuto un'obiezione strutturale**: «se si ferma» misura **65,67 px**, non ~95 come sosteneva
  chi voleva portare il canvas da quattro colonne a tre. Nessuna ristrutturazione.

### Domanda 1 · Che aspetto ha un ramo mai percorso nell'«ultima volta»

**Voti**: 2 «spento», 2 «nascosto», 1 «un terzo aspetto». Ma **tutti e cinque** sono poi arrivati alla stessa
terza strada, con cinque parole diverse: il fatto sta **sul collegamento**, non sul nodo.

**Verdetto, confermato dall'utente il 9 settembre** — **lo si disegna spento, e a dirlo è il collegamento.** Il nodo resta quello che è
già (`.arc.off`, porte spente: bianco 38 %, tratteggio 3-5, niente bagliore: **zero stati nuovi**), e il
collegamento non percorso porta l'etichetta **«non è passato di qui»**. Perché:
- la strada «nascondere» aveva un prezzo che **è già pagato**: le due tab mostrano già grafi diversi (8 nodi
  contro 9, per via dell'innesco), quindi non è quello a rompere la pillola dei due tempi;
- «spento» da solo non basta: «non ancora» e «mai» diventerebbero lo stesso grigio su **9 nodi a undici e 40 a
  quaranta**. La parola li separa, e non costa uno stato;
- sul telefono funziona: la colonna ha già i chip sul collegamento, costruiti in questa versione.

**Il punto cieco che resta**: un'esecuzione conclusa e una in corso hanno lo stesso grigio per motivi diversi. Un
revisore propone di dirlo **una volta sola in testa al canvas** («esecuzione conclusa» / «in corso») invece che
su ogni nodo.

### Domanda 2 · Un flusso biforcato produce una voce o *n* nella tendina?

**Voti: 5 su 5 «n voci»**, una per uscita. Ma la revisione ha demolito la ragione con cui lo dicevano («il
modello lo fa già»): **non lo fa** — oggi un'esecuzione produce **una** voce in coda, quindi *n* voci è una
**capacità nuova**, non un riuso. Il verdetto non cambia, la ragione sì.

**Verdetto, confermato dall'utente il 9 settembre** — **n voci, una per uscita, ma consecutive e riconoscibili.** La firma è per uscita
perché la responsabilità è per uscita (spina dorsale 1: «il titolare approva ogni uscita», non ogni flusso), e
raggrupparle in una voce sola creerebbe in coda un oggetto — «il flusso» — che il modello non ha e che non si può
né aprire né consegnare. Quello che si aggiunge è: le uscite della stessa esecuzione stanno **vicine** in coda, e
ognuna dice «2 di 3 · stessa esecuzione». Prezzo misurato: da 4 voci a undici si va a 6-8 con due flussi
biforcati; da 7 a 10-12 a quaranta.

**Il punto cieco che la revisione ha trovato, e che nessuno dei cinque aveva visto — e che secondo me viene prima
di questa domanda**: **la clausola dell'innesco è un interruttore della firma senza freni.** `ramoEsce` fa
`if (clausola !== 'uscita') return { tutti: true }`: appena il titolare mette il permesso in testa («chiedi prima
di partire» o «fai pure»), la funzione che gli dice quali rami escono **senza** la sua firma tace, e per quel
flusso la coda va a **zero voci**. I tre freni (soglia, perimetro, scadenza a 10 esecuzioni) stanno su
`w.firma`, **non sulla clausola**. Cioè: la domanda 2 svanisce proprio sui flussi per cui è stata posta, e il
permesso in testa diventa una seconda strada per spegnere la firma — accesa **dentro il canvas**, non nel
pannello delle approvazioni dove il titolare guarda. **Va deciso se la clausola prende gli stessi tre freni.**

### Domanda 3 · Quali parole stampa il prodotto

**Convergenza quasi piena su tre punti su quattro**, e la revisione ha contato le collisioni che nessun
consigliere aveva visto:

| parola proposta | collisione trovata contando |
|---|---|
| «freccia» | è già la **freccia di riga** (regole 25-26, 22 occorrenze) |
| «ramo» | è già **tutto il grafo** della prossima volta (207 occorrenze) |
| «collegamento» | è già il nome di una **consegna** dentro w1 (`Collegamento al magazzino`) |
| «uscita» | `Uscita` è già un chip di `chipEsito`, col significato **opposto**: già uscita, senza la tua firma |

**Verdetto, confermato dall'utente il 9 settembre, e già in codice** perché senza parole non si poteva disegnare:
- **(b) i quattro tipi restano quelli**: `poi`, `se…`, `insieme`, `se si ferma`. Misurati nel canvas vero, in
  Urbanist a 10 px: 31,31 · 32,89 · 51,25 · **65,67 px** — tutti dentro i 150 px dichiarati dall'etichetta. E
  **«poi» non si stampa**: è il caso di tutti gli 8 archi di partenza;
- **(c) il gesto non si nomina.** Niente «biforcazione», niente «dividi»: si tira un secondo collegamento e basta.
  Dove serve un conto, il canvas stampa una **riga che legge il grafo**: «7 passi · 8 collegamenti»;
- **(d) l'innesco resta «Quando parte»**, con il **permesso** sulla seconda riga;
- **(a) il nome della linea è «collegamento»** — è il sostantivo del verbo che il codice già usa
  (`ramoCollega`/`ramoScollega`), e sta nei comandi («Togli il collegamento»), non come etichetta sul disegno.
  La collisione con `Collegamento al magazzino` è con **un dato**, non con un termine del prodotto.

**Le due parole su cui vale la pena che tu dica la tua**: «se si ferma» (l'Estraneo la legge come «se lo metto in
pausa io» e propone **«se sbaglia»**: misurata 61,61 px, ci sta uguale) e «collegamento» contro il non nominarlo
affatto.

---

## Come si riprendeva dalla versione 24 (fatto)

1. ~~Le tre risposte qui sopra, più la quarta che la revisione ha sollevato.~~ **Arrivate il 9 settembre**, tutte
   e quattro sulla raccomandazione: decisioni 68-71, in cima a questo documento.
2. **Il ramo mai percorso non è disegnabile finché non c'è**: nei dati le condizioni sono **zero**, quindi la
   domanda 1 si costruisce insieme alla prima esecuzione biforcata, non prima (regola 26: non si promette quello
   che non c'è).
3. **Il candidato 8, i connettori** — l'ultimo dei tre, e il più lungo. Aspetta ancora le sue risposte
   (credenziale nominata per cliente, permesso d'uso del dipartimento, la parola «accesso», la sezione nel
   Dipartimento). Prima del codice servono una regola di disegno nuova (l'accesso quadrato e monocromo, mai
   tondo — la regola 19 vieta il disco in tinta per un oggetto che non è una persona) e due icone che nello
   sprite non ci sono (**chiave**, **busta**).
4. **Il candidato 5, la chat di dipartimento**: le due domande che lo bloccavano hanno risposta (decisioni 41 e
   42). Non manca una decisione, manca il codice.
5. **Le tre domande che l'editor lascia aperte** e che nessuno ha ancora deciso: che cosa vuol dire **salvare**
   una prossima volta (diventa una routine? cambia il workflow? resta una proposta?); **chi approva un passo
   scritto a mano**; che cosa vede il titolare quando **il dichiarato e il misurato non coincidono**.

**Non rimettere in discussione**: la direzione A, la versione 16 con la correzione 16a, la 17, la regola 26 delle
frecce, il conto nel titolo a 36, le decisioni 41, 42, 45, 46, 57 e 58, gli avatar della versione 10, «niente
emoji», e le **decisioni 64–67** (il grafo, i tre significati sul connettore, il titolare nodo più il permesso in
testa, i quattro acceleratori).

**Il metodo, con due lezioni nuove:**
- **Se il codice cambia mentre il consiglio gira, la revisione giudica un albero diverso da quello che i
  consiglieri hanno letto.** È successo qui: il difetto dei numeri stimati era vero, l'ho corretto durante la
  sessione, e due revisori l'hanno poi bocciato come «premessa falsa» leggendo il file già corretto. Il consiglio
  va fatto girare su un albero **fermo**, o va detto ai revisori a quale commit guardare.
- **Il disegno trova difetti che il modello non può trovare.** Le due posizioni divergenti (nodi dalla posizione
  libera, archi dalla serpentina) erano invisibili finché la posa di partenza le faceva coincidere: solo il primo
  trascinamento le ha separate. Un modello con le prove verdi non è un disegno che funziona.

**Prima e dopo, come sempre**: rifare i font locali (`fetch-fonts.py`), lanciare le **sei** prove di `prove/`
(**535 verifiche**) e catturare le pagine prima di toccare qualcosa (`scatta.js --in <cartella>`, **79 catture**);
leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 2, 6, 8, 9 e 10, regole 24–**40**) e `DIREZIONI.md` (sezione 4,
sezione 6, sezione 5 per i file); controllare branch e PR.

**Attenzione, le due trappole**: `scatta.js` e `prove/console.js` si reggono ancora su `section:nth-of-type(2)`
per le consegne del Dipartimento — la prossima sezione che si aggiunge lì rompe tre prove e due catture. E
**`DGT_DATI.modello(n)` costruisce un modello nuovo a ogni chiamata**: interrogarlo da una prova per sapere lo
stato del canvas dice sempre lo stato di partenza. Si misura il **DOM**.

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

## Stato (alla versione 21 — quello di adesso sta in cima)

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

## Il lavoro della prossima sessione (scritto alla versione 20)

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

## Come riprendere (scritto alla versione 23, fatto)

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
- **Centrare qualcosa dentro il telefono vuole due divisioni, non una** (versione 27): i rettangoli di
  `getBoundingClientRect` sono in pixel di **schermo** (`.m-phones` ha `zoom:1.25`) mentre `scrollTop` è in pixel
  **CSS**, quindi si divide per la scala misurata (`b.width / sc.clientWidth`); e il centro non è quello della
  cornice ma quello della parte che si **vede**, perché in basso la navigazione ne copre una fascia — che è il
  `padding-bottom` che lo scorrevole già dichiara. Senza la seconda divisione lo scarto era −59,1 px in un caso e
  −38,9 in un altro, cioè sbagliato **e** incoerente: due sintomi diversi dello stesso errore.
- **Il pinch si prova solo con `TouchEvent` costruito a mano** (versione 27): `page.touchscreen` di Playwright
  muove **un dito solo**, e il pinch ne vuole due insieme. Il contesto va aperto con `hasTouch: true`, se no gli
  ascoltatori `touchstart` non ricevono niente e la prova passa per il motivo sbagliato. `touch-action: pan-y`
  divide i due mondi: il verticale resta al browser, l'orizzontale e il pinch sono nostri — e va provato anche
  che un dito in su **non** muova la vista, se no la regola si scopre rotta il giorno che qualcuno scorre.
- **Il CSS si trasporta fra due file solo se tutti e due lo prefissano allo stesso modo** (versione 27):
  `componenti.js` e `direzione-a.js` fanno tutti e due `prefissa(css, '.dirA')`, quindi le 148 righe del canvas
  sono passate senza toccarne una. La prova che è un trasporto e non una riscrittura non è la lettura del diff:
  sono le catture: sei cambiate su 79, e quelle sono le sei che portano una cosa nuova.
- **`export A=… B=$A` sulla stessa riga non funziona**: la shell espande `$A` prima di assegnarlo, e le prove
  partono cercando `/fonts.css` invece del file vero. Due righe, sempre.
- Lo z-index del telefono, la linea del tempo a segmenti, `m.decidi`, l'orbe della versione 10, gli intagli con `--behind`, le
  tendine, la Console che si scala con `zoom`, le differenze LCS, la card costo su fondo lime, la striscia «chi» e il rail: come
  nelle note delle sessioni precedenti (storia di questo file in git, commit `b50f659`, `d2b625c`, `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca (alla versione 22 — i punti ancora aperti stanno in cima, in «Stato alla fine della versione 27»)

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
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md («Versione 23» e «Come riprendere»). Controlla la PR #19: se è unita
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
Leggi CLAUDE.md e PROSSIMA-SESSIONE.md («Versione 23», «Come riprendere»). Controlla la PR #19: se è unita riparti
da main con un branch nuovo. Le decisioni 64–67 sono prese e il modello a grafo è già in dati.js con le prove
verdi: manca solo il disegno. Fallo nell'ordine di «Come riprendere», cominciando dal grafo disegnato e dal
trascinamento, e mettendo «Riordina» subito dopo. Il metodo di sempre, e alla fine prove, screenshot, artefatti,
documenti, commit, push e PR.
```
