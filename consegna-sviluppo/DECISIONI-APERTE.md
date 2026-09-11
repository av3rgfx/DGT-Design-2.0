# Decisioni aperte

Quello che il design ha lasciato al titolare, e che il prodotto **non deve decidere da solo**. Ogni voce dice che
cosa è in gioco, le strade con il loro prezzo (misurato sulle schermate di design, dove c'è) e che cosa fa il
design oggi, che è la forma da tenere finché non arriva una parola.

## Da decidere con una parola

### 1. Il colore di un limite sfondato

La regola 4 dice «un solo accento: lime = attenzione del titolare; rosa solo per errori e cali». Sfondare un
limite non è né un errore né un calo, eppure oggi è **rosa** in quattro forme (il badge accanto ai numeri
dell'intestazione, i chip «oltre il limite», la barra del budget, il badge del mese). Il consiglio di design si è
spaccato due a due.

| strada | che cosa vuol dire | prezzo nel design |
|---|---|---|
| **rosa solo al tetto** | il tetto d'azienda resta rosa perché è l'unico limite che **ferma** il lavoro e rompe una promessa del titolare; i budget facoltativi, che non fermano niente, diventano neutri | 11 righe, 6 catture; la regola 4 diventa «rosa = errori, cali e tetto sfondato» |
| **neutro dappertutto** | sfondare è un **fatto**, non un allarme: il segnale è la richiesta lime in coda, che c'è già; la versione 32 ha già deciso che fermarsi per il tetto non è un errore (chip «In pausa» neutro, nessun punto sull'avatar), e una causa rossa con un effetto grigio mente in una delle due direzioni | 14 righe, 16 catture; la regola 4 resta intatta |

**Oggi**: rosa, con una classe dedicata (`.badge.oltre`, stessa tinta del calo) così che il cambio costi una riga.

### 2. Dove sta il motivo di un errore

La card di un'esecuzione in errore non dice più il motivo («Chiavi di accesso scadute»): lo tagliava in 46,8 px su
157,6 e adesso la pillola porta il solo stato. Il motivo si legge aprendo l'esecuzione. Ma quel motivo **governa
il pulsante «Riprova» che sta sulla stessa card**: «chiavi scadute» dice che riprovare è inutile.

- **nella pagina Esecuzione e basta** (oggi): la card resta pulita, «Riprova» è cieco;
- **nella riga sotto il titolo**, al posto di «cliente · fallito alle 08:55»: 157,6 px su 196, ma è provato su
  **una sola** stringa del modello, e un messaggio più lungo sfonda.

### 3. Il chevron della pillola di stato

La pillola di stato delle card ha un chevron che **non apre niente**. Viene dal riferimento («copiato così com'è»)
e la regola 25 esenta i cerchi dell'intaglio, non lui. È lo stesso conflitto fra riferimento e regola già risolto
una volta con l'emendamento del verde in lime: va deciso, non aggirato. Strade: tenerlo come forma; toglierlo;
farlo aprire davvero qualcosa (che cosa, il design non lo dice).

### 4. Chi è fermo per il tetto: in quale stato

Il titolare aveva detto «nessuno stato nuovo: chi è fermo resta in `attesa`». Il design ha rispettato il vincolo
(nessuno stato nuovo) ma **non il posto**: chi è fermo resta in `lavoro` con `pausa: true` e `pausaPer: 'tetto'`,
perché `attesa` significa «ha consegnato e aspetta la firma» (chip «Da approvare», punto giallo sull'avatar), che
di chi non ha consegnato niente è falso, e perché svuoterebbe la sezione «Al lavoro adesso». È marcata **da
confermare** dalla versione 32. Se il titolare preferisce `attesa`, il cambio è di poche righe ma quelle tre
conseguenze restano.

### 5. La richiesta del tetto: di chi è

La richiesta che chiede di alzare il tetto d'azienda è attribuita al dipendente il cui passo sfonderebbe, e quindi
cade nel «Da approvare» **di quel dipartimento** (a quaranta: Amministrazione, non Sviluppo). È coerente con la
spina dorsale (ogni euro risale a un dipendente e a un'esecuzione), ma è la prima richiesta che parla dell'azienda
intera. Alternativa: una richiesta d'azienda senza dipartimento. Il design non l'ha deciso.

### 6. La pausa del titolare mentre il tetto ferma

Col tetto che ferma tutto, «Metti in pausa» non compare finché il tetto non si alza: è una conseguenza voluta del
«si apre fermo», ma va guardata. Alternativa: la pausa a mano resta sempre disponibile e si somma al tetto.

## Effetti collaterali da guardare

- **La home a quaranta è più spenta**: le dodici righe di chi è fermo per il tetto non sono più lime (dicevano «al
  lavoro» su gente ferma). È il vero, ma cambia il colpo d'occhio della pagina d'apertura.
- **La card in coda ha cambiato chip**: era l'ora, adesso è la parola «In coda»; l'ora sta nella riga sotto il
  titolo, dove già stava.

## Candidati che aspettano dati

Sono funzioni che il titolare ha proposto e che il design non ha disegnato, perché nel modello sintetico non c'è
ancora il dato che le giustifica. Il prodotto le incontrerà appena avrà dati veri.

| candidato | che cosa vuole | che cosa manca |
|---|---|---|
| **connettori** (candidato 8) | le connessioni del dipendente verso servizi esterni (oggi nel dossier: nome, descrizione, stato attiva/scaduta, ultimo uso) come oggetto di prima classe, con una pagina | una definizione di che cosa è un connettore nel prodotto vero; il design lo ha analizzato e contato in `DIREZIONI.md`, sezione 6, senza costruirlo |
| **chat di dipartimento** (candidato 5, decisioni 41 e 42) | un filo di conversazione per dipartimento, oltre a quello per dipendente | un caso d'uso misurato: oggi ogni filo è di un dipendente |
| **biforcazioni nel workflow** (decisioni 68 e 69) | nodi con più di un'uscita nel canvas | nel modello ci sono zero biforcazioni; il canvas oggi disegna catene e grafi senza rami condizionali |
| **routine dal nulla** (decisione 75) | creare una routine con un innesco e un workflow senza partire da un'esecuzione riuscita | tutti e tre gli inneschi del modello sono di tipo «ora» e nessuna routine ha un workflow dietro; il primo passo vero è che un workflow possa nascere dal nulla |
| **la soglia della regola g4** | «Spese sopra 50 €: sempre da approvare» governa oggi **zero** consegne, perché la più cara costa 33,80 € | dati veri di spesa: se il titolare la vuole efficace, la soglia va abbassata e la card lo mostrerà |

## Quello che il modello non ha, e che il prodotto dovrà avere

Sono assenze **dichiarate** nel design, non dimenticanze: il modello sintetico è una fotografia di un giorno.

- **Nessun ieri**: la spesa di oggi non ha un giorno prima con cui confrontarsi (`costi('oggi').prima` è nullo);
  esistono solo «30 giorni» e «i 30 precedenti».
- **Nessun legame fra un budget e una richiesta**: un budget facoltativo sfondato non genera niente nel modello;
  le consegne vanno in coda perché ogni uscita ci va. Se il prodotto vuole che un budget sfondato lasci una
  traccia, è una cosa nuova.
- **Nessun tempo che passa**: l'ora è fissa alle 10:42 del 4 settembre; gli agenti non avanzano davvero. Tutto ciò
  che è «in corso» è una posa.
- **Nessuna persona oltre al titolare**: l'operatore tecnico è nominato in `PRODUCT.md` e non ha una superficie.
- **Nessun dato di autenticazione, permessi fra persone, fatturazione, multi-azienda**: fuori dal perimetro del
  design.
