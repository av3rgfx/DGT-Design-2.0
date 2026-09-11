# DGT — Modello di dominio

Questo documento descrive il dominio del prodotto DGT così com'è incarnato nel modello dati del repository di design
(`schermate/direzioni/dati.js`), nelle regole di comportamento di `SYSTEM-DESIGN.md` (sezione 10) e nelle decisioni
numerate di `PROSSIMA-SESSIONE.md`. Serve a chi deve progettare il database e le API del prodotto vero senza aver
aperto il repository di design.

Convenzioni:

- **Dato** = un campo che qualcuno scrive (il titolare, un dipendente AI, il sistema al momento del fatto) e che va
  persistito. **Derivato** = un valore che il modello calcola da altri dati e che il prodotto può ricalcolare.
- Il modello di design usa stringhe di presentazione per ore e date (`'10:42'`, `'ieri 17:30'`, `'28 ago'`) e non ha
  un orologio (`azienda.ora` è fissa). Il prodotto vero deve usare istanti reali; quando qui si scrive «ora» o
  «data» si intende un timestamp.
- Le regole numerate sono quelle di `SYSTEM-DESIGN.md`, sezione 10 (`[regola N]`); le decisioni sono quelle di
  `PROSSIMA-SESSIONE.md` (`[decisione N]`). Quando una cosa non è stabilita da codice né da documenti, è scritto
  «non definito nel design».

---

## 1. Che cos'è DGT in dieci righe

DGT è un sistema operativo aziendale per agenti AI. L'utente crea un'azienda digitale fatta di **dipartimenti** e di
**dipendenti AI**, assegna **obiettivi** reali e i dipendenti lavorano per ore o giorni: codice, ricerca, contenuti,
pubblicazioni social. Il cliente tipo è un'agenzia che vende software, automazioni, siti ed e-commerce. Il prodotto è
un'applicazione web con due pubblici nella stessa app: il **titolare** (risultati, costi, approvazioni) e
l'**operatore tecnico** (configurazione, esecuzioni). Il titolare è una persona; i dipendenti sono agenti.

La spina dorsale, che ogni entità rispetta:

1. **Il titolare approva ogni uscita.** Nulla esce dall'azienda verso un cliente senza una sua firma, o senza una
   regola o una routine che lui ha reso lecita prima. Quello che esce senza la sua firma si chiama «uscita», non
   «approvata» [regola 31].
2. **Ogni euro e ogni consegna risalgono a un dipendente e a un'esecuzione.** Un costo esiste solo come costo di un
   passo di un'esecuzione di un dipendente; una consegna è la cosa creata da un'esecuzione [regola 27, regola 40].
3. **L'attenzione del titolare è la risorsa scarsa.** La coda delle richieste si progetta per consumarne il meno
   possibile: una richiesta sola per il tetto, non una per esecuzione [regola 46]; i numeri previsti non si spacciano
   per misurati [regola 40].

---

## 2. Le entità

### 2.1 Azienda e titolare

Una sola azienda per installazione (il modello ne conosce una, «Nova Studio»). Multi-azienda: non definito nel design.

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `nome` | stringa | dato | Nome dell'azienda; usato anche come **cliente interno** («Nova Studio» è il cliente delle consegne che restano dentro). |
| `titolo` | stringa | dato | Forma in maiuscolo del nome, per la testata. |
| `titolare.nome`, `titolare.iniziali` | stringa | dato | Il titolare ha le iniziali, non un avatar in tinta [regola 11]. Un solo titolare: non definito nel design se possano essere più d'uno. |
| `ora`, `data`, `dataLunga` | stringa | dato (fisso) | L'adesso del modello. Nel prodotto: l'orologio. |
| `obiettivoMese`, `scadenzaMese` | stringa | dato | L'obiettivo del mese e la sua scadenza, mostrati nel Riepilogo. |

Derivati d'azienda: `n` (numero di dipendenti), `costoOggi` (somma di `att.costo` di tutti i dipendenti: la spesa di
oggi), `conta(stato)`, `alLavoro`, `clienti` (vedi 2.12), `costi(...)` (vedi 2.14), i tetti (vedi 2.8).

### 2.2 Dipartimento

Quattro dipartimenti fissi nel modello: `svi` Sviluppo, `mkt` Marketing, `ven` Vendite, `amm` Amministrazione. Il
dipartimento è l'**unità di scala** insieme all'esecuzione; il dipendente è la foglia [regola 1].

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `id` | stringa | dato | Chiave. |
| `nome`, `breve` | stringa | dato | Nome pieno e abbreviazione. |
| `desc` | stringa | dato | Una riga su che cosa fa («Siti, e-commerce, automazioni»). |
| `tinta` | enum (otto tinte) | dato | Tinta del dipartimento. |

Relazioni e derivati: i dipendenti del dipartimento (`perDip[id]`), gli obiettivi (`obiettiviDi`), le consegne
(`consegneDi(dip, periodo)`), i workflow (`workflowDi(dip)`), il budget facoltativo (`budgetDip(dip)`, vedi 2.8), la
spesa per periodo (`costi(periodo, dip)`).

Creazione, modifica e cancellazione di un dipartimento: non definite nel design (il modello non ha funzioni; un
dipendente nuovo senza dipartimento cade nel primo).

### 2.3 Dipendente AI

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `id` | intero | dato | Chiave; alla creazione `max + 1`. |
| `ruolo` | stringa | dato, obbligatorio | L'etichetta principale quando non c'è il nome («Copywriter») [regola 10]. |
| `nome` | stringa | dato, facoltativo | Lo dà il titolare alla creazione o dopo; assente di base. |
| `dip` | id dipartimento | dato | Appartenenza. |
| `stato` | enum | dato | Vedi tabella sotto. |
| `att` | oggetto | dato | L'attività corrente (vedi sotto). |
| `seme` | stringa | dato, facoltativo | Seme dell'avatar; assente = il ruolo. |
| `tinta` | enum (otto tinte) | dato | Tinta dell'avatar, una fra `indaco, corallo, ambra, verdeacqua, prugna, petrolio, bordeaux, neutro`; alla creazione la meno usata in azienda se non scelta [regola 19]. |
| `pausa` | booleano | dato | **Attributo ortogonale allo stato, non uno stato** [regola 46]. |
| `pausaPer` | `'tetto'` o assente | dato | Chi ha fermato: `'tetto'` se è stato il freno d'azienda; **assente** se è stato il titolare (il codice non scrive un valore per lui). |

Gli stati:

| `stato` | Significato | Come ci si arriva / se ne esce |
|---|---|---|
| `lavoro` | Sta eseguendo adesso. | Da `pianificato` con «Avvia ora», da `errore` con «Riprova»; ne esce con «Interrompi» (→ `libero`). Il passaggio a `attesa` alla consegna e da `attesa` dopo la decisione non è una funzione del modello: non definito nel design. |
| `attesa` | Ha consegnato e aspetta l'approvazione del titolare. | Le approvazioni in sospeso sono **elementi** (richieste), non stati: un dipendente può essere `lavoro` e avere una consegna precedente in coda. |
| `pianificato` | Partirà a un'ora precisa (`att.quando`). | → `lavoro` con «Avvia ora» o all'ora prevista. |
| `errore` | L'ultima esecuzione è fallita e serve un intervento (`att.errore`). | → `lavoro` con «Riprova»; → `libero` con «Interrompi». |
| `libero` | Disponibile, senza esecuzioni in corso. | Stato iniziale alla creazione. |

`pausa` vale solo con esecuzione aperta (`lavoro`): chi è fermo per il tetto **resta `lavoro`** e prende
`pausa = true, pausaPer = 'tetto'`; la pausa del titolare (`pausa = true` senza `pausaPer`) si mette e si toglie da lui; la
pausa del tetto **non si toglie a mano**, si toglie alzando il tetto [regola 46]. Il tetto non sovrascrive una pausa
del titolare, e quando rientra libera solo chi era fermo per il tetto (`applicaTetto`).

L'attività corrente `att` (un solo record per dipendente; la storia sta nelle richieste decise):

| Campo | Tipo | Significato |
|---|---|---|
| `titolo` | stringa | Titolo dell'esecuzione. |
| `cliente` | stringa | Cliente dell'esecuzione (o il nome dell'azienda). |
| `da` | ora | Inizio (in `errore`: ora del guasto). |
| `fine` | ora/data | Fine (in `attesa` e `libero`). |
| `quando` | ora | Ora di partenza (in `pianificato`). |
| `passo` | `[corrente, totale]` | Passo in corso e numero di passi (in `lavoro`). |
| `costo` | numero (€) | **Costo di oggi dell'esecuzione = somma dei costi dei passi avvenuti** (derivato, tenuto qui). |
| `prossimo` | stringa | Nome del passo successivo. |
| `errore` | stringa | Motivo dell'errore. |

Mutazioni: `aggiungi({ruolo, nome, dip, seme, tinta})` crea in stato `libero` con `att` vuota; `aggiorna(id, dati)`
cambia nome, ruolo, dipartimento, seme, tinta. Cancellazione: non definita nel design. Il dipendente **propone** e non
crea routine e workflow; il titolare conferma [decisione 51].

Derivati: `etichetta(e)` (nome o ruolo), `sotto(e)` (ruolo · dipartimento, o dipartimento), `semeDi`, `tintaDi`,
`tintaLibera()`, `iniziali(e)`.

### 2.4 Dossier del dipendente

Un dossier per dipendente (`dossierDi(e)`): identità e mansione, soul prompt con le versioni, modello e criterio,
strumenti e connessioni, budget e permessi, colloquio, metriche a 30 giorni, revisioni [regola 13].

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `mansione` | stringa | dato | Che cosa fa, in una frase. |
| `dal` | data | dato | Data di creazione del dipendente. |
| `prompt.corrente` | intero | dato | Numero della versione in produzione. |
| `prompt.versioni[]` | lista | dato | Ogni versione: `v` (numero), `data`, `chi` (iniziali del titolare o «Proposta del sistema»), `nota` (che cosa cambia), `testo[]` (i paragrafi del prompt), `proposta` (vera se non ancora applicata), `numeri` (`task`, `corretti` %, `respinte` %, `costo` per esito, `prova`). |
| `modello.assegnato` | `rapido` \| `standard` \| `esperto` | dato | Il modello di base. |
| `modello.regola` | stringa | dato | Criterio di scelta automatica, in parole. |
| `modello.automatica` | booleano | dato | Se la scelta per passo è automatica. |
| `modello.uso` | mappa modello → `{esecuzioni, costo}` | dato (30 giorni) | Quanto ogni livello è stato usato; la somma dei costi = `metriche.ora.spesa`. |
| `strumenti[]` | lista | dato | `id`, `nome`, `desc`, `icona`, `attivo`, `ultimo` (ultimo uso). |
| `connessioni[]` | lista | dato | `nome`, `desc`, `stato` (`attiva` \| `scaduta`), `ultimo`. |
| `budget` | oggetto | dato | `giorno`, `mese` (e `settimana` se posto) in euro, facoltativi; `da` (traccia del gesto); `speso` (= `metriche.ora.spesa`, derivato), `oggi` (= `att.costo`, derivato). |
| `permessi[]` | lista | dato | `nome`, `modo`, `origine` («Regola generale» o eccezione), `attiva`, `eccezione`. Le righe d'origine «Regola generale» prendono `attiva` dalla regola d'azienda con lo stesso nome; le eccezioni sono del dossier. |
| `colloquio` | oggetto | dato | L'ultimo eval: `data`, `versione` (del prompt), `modello`, `punteggio`, `soglia`, `costo`, `durata`, `esito` (`superato` \| `non superato`), `casi[]` (`nome`, `atteso`, `esito` `superato`\|`parziale`, `punteggio`), `storico[]`. |
| `metriche.ora`, `metriche.prima` | oggetto | dato | Gli ultimi 30 giorni e i 30 precedenti: `task`, `approvate`, `modifiche`, `rifiutate`, `spesa`, `costo` (per esito utile), `corretti` %, `respinte` %, `tempo` (minuti medi). |
| `revisioni[]` | lista | dato | Vedi sotto. |

I tre modelli sono **livelli neutri di DGT**, non marchi di terzi [regola 13]:

| id | Nome | Listino (dato) | Uso |
|---|---|---|---|
| `rapido` | Rapido | 0,1 € per esecuzione | Verifiche, riassunti, lettura del brief. |
| `standard` | Standard | 1,5 € per esecuzione | Le consegne di ogni giorno. |
| `esperto` | Esperto | 7 € per esecuzione | Consegne lunghe, molti passi, uscite verso i clienti. |

**Revisione di performance** (`revisioni[]`):

| Campo | Tipo | Significato |
|---|---|---|
| `id` | stringa | Chiave. |
| `richiesta` | id richiesta | La richiesta al titolare di tipo `revisione` che la porta in coda (1:1 finché è in attesa). |
| `stato` | `attesa` \| `prova` \| `applicata` \| `modifiche` \| `rifiutata` | Le quattro decisioni del titolare, più l'attesa. |
| `tipo` | `prompt` \| `modello` | Che cosa cambia. |
| `da`, `a` | numero di versione o id modello | Il passaggio proposto. |
| `quando`, `decisa`, `motivo` | stringa | Quando è nata, chi e quando ha deciso, il motivo (obbligatorio per il rifiuto). |
| `titolo`, `perche[]`, `attese[]`, `rischi[]` | testo | Evidenze (`n` numero, `t` frase, `richiesta` collegata), stime, rischi. |
| `prova` | `{esecuzioni, costo, giorni}` | Il perimetro della prova. |
| `effetto`, `verso`, `fatte` | stringa/intero | L'effetto misurato dopo la decisione; esecuzioni fatte in prova. |

Regole di dominio: una revisione in attesa è **anche** una richiesta al titolare di tipo `revisione` [regola 13];
`decidiRevisione(r, esito, motivo)` scrive `stato` e `decisa`; **applicare** rende corrente la nuova versione del
prompt (`prompt.corrente = a`, la versione perde `proposta`) o assegna il nuovo modello (`modello.assegnato = a`);
**prova** azzera `fatte`. Le richieste decise dal titolare sono la fonte di «corretti da un umano» (modifiche) e
«proposte respinte» (rifiutate). Il colloquio va ripetuto quando cambia il modello o la versione del prompt (dichiarato
nei rischi delle revisioni, non codificato).

### 2.5 Esecuzione

L'esecuzione **corrente** del dipendente (`esecuzioneDi(e)`), una per dipendente. Le esecuzioni passate esistono solo
come richieste decise: uno storico delle esecuzioni non è definito nel design.

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `obiettivo` | id obiettivo \| null | dato | L'obiettivo a cui l'esecuzione contribuisce. |
| `serie[]` | id richieste | dato | Le consegne precedenti della stessa serie, sempre dello **stesso** dipendente. |
| `passi[]` | lista | dato | Vedi sotto. |
| `log[]` | lista | dato | Vedi sotto. |
| `output[]` | lista | dato | Le consegne dell'esecuzione (vedi 2.13). |
| `strumentiUso[]` | lista | dato | Per strumento: `nome`, `icona`, `chiamate`, `costo`, `errore`. |

Il passo (il nodo del workflow, vedi 2.9):

| Campo | Tipo | Significato |
|---|---|---|
| `n` | intero | Numero, da 1. |
| `nome` | stringa | Nome del passo. |
| `stato` | `fatto` \| `corso` \| `da fare` \| `errore` | Stato. |
| `inizio`, `fine`, `durata` | ora, ora, stringa | Presenti se avvenuto. |
| `stima` | stringa | Durata prevista, solo se `da fare`. |
| `costo` | numero (€) | **Misurato** se avvenuto; **stima** se `da fare` [regola 40]. |
| `modello` | id modello | Il modello usato per il passo. |
| `strumenti[]` | nomi | Gli strumenti usati. |
| `esito` | stringa | Che cosa ha prodotto, o il motivo dell'errore. |

La voce di log: `ora`, `tipo` (`passo` \| `strumento` \| `modello` \| `nota` \| `richiesta` \| `errore` \| `titolare`),
`testo`, `passo` (numero, facoltativo), `costo` (facoltativo), `richiesta` (id, facoltativo). Le voci di tipo `titolare`
sono gli interventi del titolare (pausa, ripresa, interruzione, riprova, avvio, nota).

Le azioni del titolare (nel design vivono nel codice delle pagine, ma mutano il modello):

| Azione | Precondizione | Effetto |
|---|---|---|
| Pausa / Riprendi | `pausaPer` non è `tetto` | Inverte `pausa` senza scrivere `pausaPer`; voce di log. |
| Interrompi | esecuzione aperta | Il passo in corso torna `da fare` con esito «Interrotto dal titolare»; `stato = libero`, `pausa = false`, `att.fine = ora`, via `passo` ed `errore`; voce di log. |
| Riprova | un passo in `errore` | Il passo torna `corso` con `inizio = ora`; `stato = lavoro`, `att.da = ora`, via `errore`; voce di log con il passo. |
| Avvia ora | un passo `da fare` | Il primo passo da fare va in `corso`; `stato = lavoro`, `att.da = ora`, via `quando`; voce di log. |
| Nota | testo non vuoto | Voce di log `titolare` legata al passo in corso **e** messaggio nel filo della chat (vedi 2.16) [regola 22]. |

Regole di dominio: il costo dell'esecuzione è la **somma dei passi** (`att.costo`); il tetto si controlla **prima di
ogni passo, mai a metà** [decisione 58, regola 46]; un passo da fare porta una stima che non si somma al misurato
[regola 40]; il passaggio di mano fra due dipendenti dentro un'esecuzione non esiste (zero casi contati) [regola 28].

### 2.6 Richiesta al titolare

Tutto quello che aspetta una decisione del titolare è una richiesta: le consegne da approvare, le revisioni di
performance, la richiesta del tetto.

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `id` | stringa | dato | Chiave. |
| `chi` | id dipendente | dato | Il dipendente che l'ha prodotta (per il tetto: quello del passo che sfonderebbe). Deve risolvere sempre. |
| `cosa` | stringa | dato | Titolo. |
| `cliente` | stringa | dato | Cliente, o il nome dell'azienda. |
| `ora` | ora/data | dato | Quando è stata consegnata. |
| `tipo` | `post` \| `documento` \| `lista` \| `proposta` \| `revisione` \| `tetto` | dato | Tipo. |
| `stato` | `attesa` \| `approvata` \| `modifiche` \| `rifiutata` | dato | Stato. |
| `costo` | numero (€) | dato | Costo della consegna (0 per il tetto). |
| `passi[]` | nomi | dato | I nomi dei passi che l'hanno prodotta (solo nomi, senza numeri). |
| `nota` | stringa | dato | La nota del dipendente al titolare. |
| `testo` | stringa | dato | Il contenuto (o un estratto). |
| `allegato` | stringa | dato | Descrizione dell'allegato («Documento: 4 pagine»). |
| `commento` | stringa | dato | Il commento del titolare alla decisione; **obbligatorio per il rifiuto** [regola 20]. |
| `decisa` | ora/data | dato | Quando è stata decisa. |
| `deciso` | `{tipo: 'regola' \| 'routine', id}` \| assente | dato | **Chi ha deciso al posto del titolare**; assente = ha deciso lui. Deve risolvere a un record esistente [regola 30]. |
| `revisione` | id revisione | dato | Solo per `tipo = revisione`. |
| `importo` | numero (€) | dato | Solo per `tipo = tetto`: gli euro da aggiungere al tetto di oggi. |
| `giorno`, `min` | intero | derivato | Giorni fa (0 = oggi) e minuti del giorno, da `ora`; servono a ordinare e raggruppare. |

Transizioni: `attesa` → `approvata` \| `modifiche` \| `rifiutata`, una volta sola, con `decidi(id, stato, commento,
esitoRevisione, importo)`: scrive `stato`, `decisa = ora`, `giorno = 0`, `min`, `commento`, `importo`; se il tipo è
`revisione` chiama `decidiRevisione` con `esitoRevisione` (`prova` \| `applicata` \| `modifiche` \| `rifiutata`;
predefinito `applicata` se approvata, altrimenti lo stato); se il tipo è `tetto` e lo stato è `approvata` aggiunge
`importo` all'eccezione di oggi e riallinea il freno (vedi 2.8). Riaprire una richiesta decisa: non definito nel design.
«Approva tutte» [regola 8] è un gesto di pagina: il modello espone solo la decisione singola.

La coda (`codaAttesa()`): le richieste in `attesa`, **prima quella del tetto**, poi dalla più vecchia (giorno più
lontano, poi minuto più basso); un solo ordine per tutte le superfici [regola 46]. Derivati sulla richiesta:
`periodoDi` (`oggi` \| `ieri` \| `settimana` ≤ 7 \| `mese` ≤ 31 \| `prima`), `regolaPer`, `contrastoDi`, `autoreDi`
(`{tipo, id, nome, rec}`; `nome` vuoto se il riferimento non risolve), `richiesteFiltrate({stato, tipo, chi, dip,
cliente, periodo, q})`, `richiesteDi(stato)`.

Regole di dominio: «Approvata» si dice solo se l'ha approvata il titolare; con `deciso` presente la richiesta è
un'«uscita» [regola 31]; una richiesta uscita da una routine è sempre `approvata` (una rifiutata l'ha vista il
titolare); un rifiuto porta sempre il motivo [regola 20]; ogni richiesta è governata da una regola e una sola,
tranne quella del tetto (vedi 2.7).

### 2.7 Regole di approvazione

Le quattro regole d'azienda (`regole`):

| id | Nome | Che cosa copre | `modo` | `attiva` |
|---|---|---|---|---|
| `g1` | Uscite verso i clienti | Post, proposte e documenti per i clienti | Sempre da approvare | sì |
| `g2` | Report interni | Report giornalieri e rendiconti | Automatica | sì |
| `g3` | Liste di lead | Liste e ricerche senza invio | Automatica sotto 20 € | sì |
| `g4` | Spese sopra 50 € | Qualsiasi consegna che costa più di 50 € | Sempre da approvare | sì |

Campi della regola: `id`, `nome`, `desc`, `modo` (testo), `attiva` (booleano), `icona`. Creazione, modifica e
spegnimento dalla pagina: non definiti nel design (`attiva` è un dato senza funzione di scrittura). Il `modo` è un
testo: nessuna funzione del modello applica la soglia dei 20 € di `g3`; l'applicazione del modo è del prodotto.

`regolaPer(r)` — la regola che governa una richiesta, **una sola**, scelta dalla più stretta e solo fra le attive:

1. `tipo = tetto` → **nessuna** (è una decisione sull'azienda, non un'uscita);
2. `costo > 50` → `g4`;
3. `cliente` diverso dal nome dell'azienda → `g1`;
4. `tipo = lista` → `g3`;
5. altrimenti → `g2`.

`contaRegola(g)` conta le richieste che ogni regola governa (la somma dei quattro conti è il totale delle richieste;
`g4` ne governa zero perché la consegna più cara del modello costa 33,80 €) [regola 31]. `contrastoDi(r)` è una
richiesta approvata **senza** il titolare (`deciso` presente) mentre la sua regola dice «Sempre da approvare»: il dato
non si corregge, si mostra (zero casi a undici, due a quaranta) [regola 31].

Regole di dominio: **una routine esegue, non decide** — vince la regola d'azienda attiva e la clausola della routine
può solo stringere, mai allargare [regola 31]; **la regola permette, la routine agisce** — chi ha deciso è la
regola quando la regola ha reso lecita l'uscita, la routine quando è stata lei a mandarla [regola 30]. Il nodo del
titolare nel workflow porta il nome della regola che ferma lì la consegna: il workflow non sostituisce le regole, le fa
vedere [regola 28]. Le **eccezioni del dossier** (permessi con `eccezione = true`) sono del singolo dipendente e non
seguono le regole d'azienda; le righe «Regola generale» del dossier sono la stessa regola, non una copia.

### 2.8 Limiti di spesa

Una sola unità, **gli euro**, a tutti i livelli [regola 45, decisione 55]. Tre parole per tre lavori: **tetto** per
quello che ferma (azienda), **budget** per i facoltativi (dipartimento, dipendente, routine), **soglia** per il
workflow. Due orizzonti dappertutto, **giorno** e **mese**; la **settimana** solo dove la cadenza è settimanale
(`orizzontiDi(rt)`).

| Livello | Dove sta | Obbligatorio | Effetto dichiarato |
|---|---|---|---|
| Azienda | `tetti.azienda { giorno, mese, dal, da, oggi }` | sì, non si toglie | **L'unico che ferma**: sopra di lui non parte nessun passo nuovo. |
| Dipartimento | `tetti.dip[id] { giorno, mese, da }` | no, nasce vuoto | Manda in coda (dichiarato; nessuna funzione lo fa scattare). |
| Dipendente | `dossier.budget { giorno, mese, settimana?, da }` | no | Manda in coda (dichiarato; nessuna funzione lo fa scattare). Il confronto spesa/budget («oltre») è un derivato di pagina. |
| Routine | `routine.limiti { giorno, settimana, mese, da }` | no | Manda in coda (dichiarato; nessuna funzione lo fa scattare). |
| Workflow | `w.soglia` (€) | derivato | Uno dei tre freni della firma anticipata (vedi 2.9). |

Campi del tetto d'azienda: `giorno` e `mese` in euro, posti dal titolare; `dal` (data in cui è stato posto); `da`
(traccia del gesto, es. «60 % di 115 € al giorno»); `oggi` = **l'eccezione di oggi**, gli euro aggiunti solo per oggi,
che scadono a mezzanotte (la scadenza è dichiarata; il modello non ha orologio). `fermaPrimaDelPasso` è vero.

Funzioni:

| Funzione | Che cosa fa |
|---|---|
| `tettoAzienda()` | `{giorno, mese}`: la promessa. |
| `tettoOggi()` | `giorno + oggi`: il tetto che vale oggi, quello che il freno guarda. |
| `propostaTetto()` | La somma dei budget dei dipendenti: **proposta** alla prima apertura, mai il tetto. Alla prima apertura il tetto viene posto uguale alla proposta; da lì assumere muove la proposta e non il tetto [regola 45]. |
| `budgetDip(dip)` | Il budget del dipartimento o `null`. |
| `leggiLimite(testo, per)` | **La percentuale come gesto**: «60 %» diventa `round(tetto × 60 / 100)` euro fissati in quel momento, con la traccia `da`; «69» diventa 69 € senza traccia; altro → `null` [regola 45]. |
| `poniLimite(dove, per, v, da)` | Scrive un limite: `dove` ∈ `azienda` \| `dip:<id>` \| `dipendente:<id>` \| `routine:<id>`; `per` ∈ `giorno` \| `settimana` \| `mese` \| `oggi` (solo azienda). `v = null` toglie un budget facoltativo; l'azienda non si toglie. Dopo una scrittura sull'azienda chiama `aggiornaTetto()`. |
| `fermePerTetto()` | Le esecuzioni ferme per il tetto: se la spesa di oggi supera `tettoOggi()`, **tutti** i dipendenti in `lavoro`; altrimenti nessuno. |
| `passoFermo()` | Il passo che sfonderebbe: il primo passo `da fare` dell'esecuzione ferma più cara (`{e, p, n}`). |
| `applicaTetto()` | Mette `pausa/pausaPer = 'tetto'` a chi è fermo (senza toccare la pausa del titolare) e libera chi non lo è più. |
| `aggiornaTetto()` | `applicaTetto()`, poi crea o aggiorna **l'unica** richiesta di tipo `tetto` (id `tt1`) se c'è un passo fermo, o la toglie se non c'è più. |
| `richiestaTetto()` | La richiesta del tetto in attesa, o `null`. |

La richiesta del tetto: `chi` = il dipendente del passo fermo; `importo` = `ceil(costo del passo)`, cioè **il costo
dichiarato di quel passo**, misurato, non la stima di finire la giornata [regola 40, regola 46]; `cosa` = «Tetto del
giorno: spesa € su tetto €»; approvandola il titolare alza il tetto **solo per oggi** (`tetti.azienda.oggi += importo`),
e la promessa di ogni giorno non cambia [regola 46]. Sulla pagina di chi è fermo per il tetto non c'è «Riprendi»: c'è
solo «Alza il tetto d'azienda».

Differenza fra dichiarato e codificato, da chiudere nel prodotto: la regola dice «il passo che sfonderebbe non parte»
(spesa di oggi + costo del passo > tetto di oggi) [decisione 58]; il modello di design confronta solo la spesa già
fatta con il tetto e ferma tutte le esecuzioni aperte insieme. Il tetto del **mese** è un dato che nessuna funzione fa
scattare.

### 2.9 Workflow

Un workflow è il lavoro **avvenuto** di un'esecuzione, disegnato a nodi; **un nodo è un passo, non un dipendente**
[regola 28]. Nel modello è interamente **derivato** (`workflowDi(dip)`, `workflowIdDi(id)`) da un'esecuzione che ha
almeno **due passi conclusi e nessun passo in errore**.

| Campo | Tipo | Significato |
|---|---|---|
| `id` | `'w' + id dipendente` | Chiave (un workflow per esecuzione corrente). |
| `nome`, `dip`, `chi`, `cliente` | stringa | Dall'esecuzione. |
| `nodi[]` | lista | I passi, più **l'ultimo nodo che è il titolare** (`titolare: true`, nome «Firma del titolare», `stato` `attesa` \| `fatto` \| `da fare` dalla consegna, `regola` = nome della regola che ferma lì la consegna, `quando`). |
| `costo`, `minuti` | numero | **Somma dei soli passi avvenuti** (fatto, in corso, errore) [regola 40]. |
| `previsto` | numero | La somma delle stime dei passi da fare, separata. |
| `passi`, `conclusi`, `consegna` | intero, intero, stringa | Conteggi e nome della consegna. |
| `firma` | booleano | **Firma anticipata**, nasce spenta; si accende un workflow alla volta [regola 28]. |
| `soglia` | numero (€) | Freno 1: `max(5, ceil(costo / 5) × 5)`; l'arrotondamento ai 5 € è un numero non misurato. |
| `perimetro` | stringa | Freno 2: il cliente dell'esecuzione (o l'azienda). |
| `scadenza` | intero | Freno 3: 10 esecuzioni (numero non misurato), «poi torna in coda da sola, e anche prima se cambia il soul prompt o il modello di un passo» (dichiarato, non codificato). |

Il **ramo** (`ramoDi(w)`) è «la prossima volta» dello stesso workflow: lo stesso oggetto nel tempo futuro, dichiarato e
componibile, contro «l'ultima volta» misurata e immutabile [regola 32, decisione 49]. Nasce come copia dei passi
dell'ultima volta con i numeri misurati **tolti**, e diventa un **grafo** [regola 36]:

| Struttura | Campi |
|---|---|
| Nodo d'innesco | `id = 'inn'`, `innesco: true`, `n = 0`, `nome`, `chi`, `testo` (quando parte), `clausola` (`avvio` \| `uscita` \| `libera`), `x`, `y`. **Non è un passo** [regola 44]. |
| Nodo passo | `id` (`'p' + seq`), `n` (numero = distanza topologica dall'inizio, derivato), `nome`, `chi`, `modello`, `strumenti[]`, `stato = 'da fare'`, `costo = 0`, `durata = ''`, `esito`, `nato` (vero se creato a mano), `x`, `y`. |
| Nodo titolare | `id = 'tit'`, `titolare: true`, resta l'ultimo. |
| Arco | `id`, `da`, `a`, `tipo` (`poi` \| `se` \| `insieme` \| `errore`; assente = `poi`), `se` (etichetta della condizione, scritta dal titolare). |
| Ramo | `nodi[]`, `archi[]`, `seq` (contatore degli id), `ciclo` (derivato: vero se il grafo ha un ciclo). |

Le **posizioni** `x`, `y` sono **un dato del titolare**: quelle messe trascinando (`ramoPosiziona`) non le ricalcola
nessuna superficie; solo il seme iniziale (`ramoPosa`) e «Riordina» (`ramoRiordina`, che il titolare chiede) le
scrivono [regola 42, decisione 72]. Nel design l'aggancio è a 18 px e la banda è larga 1008 px: costanti di
presentazione, non di dominio.

Le funzioni del ramo: `ramoPosa(i)` (posizione seme), `ramoPosiziona(w, id, x, y)`, `ramoAggiungi(w, dopoId)` (un
passo nuovo dopo un nodo; dopo il titolare nasce prima di lui), `ramoNuovo(w, daId, x, y)` (rilascio del connettore
nel vuoto: il passo nasce già collegato), `ramoInserisci(w, arcoId)` (un passo in mezzo a un arco; il primo tratto
tiene il suo significato, il secondo nasce `poi`), `ramoCollega(w, da, a)`, `ramoScollega(w, arcoId)`,
`ramoTogli(w, id)` (ricuce entranti e uscenti; rifiutata sul titolare e quando il ramo ha due nodi o meno),
`ramoCampo(w, id, k, v)` e `ramoArco(w, arcoId, k, v)` (modifica di un campo; il titolare non si modifica),
`ramoRiordina(w)`, `ramoIncroci(w)`, `ramoNumera(r)`, `ramoGradi(w, id)`, `ramoOccupato(...)`, `ramoTerminali(w)` (i
nodi senza archi in uscita, innesco escluso), `ramoFreni(w)`, `ramoRegime(w)`, `ramoEsce(w)`. Il modello protegge il
nodo del titolare; una protezione del nodo d'innesco (rimozione, archi in entrata) non è definita nel design.

I tre significati del connettore stanno **sul connettore**, non su porte del nodo [regola 36, decisione 65]: `poi` (il
lavoro prosegue), `se…` (parte solo se la condizione è vera), `insieme` (parte con gli altri `insieme` dello stesso
nodo), `se si ferma` (parte solo se il passo è andato in `errore`: lo stesso stato dell'esecuzione, non una verità
nuova). Fan-out e fan-in illimitati.

**Chi firma quello che esce** — tre regimi, e i due che firmano in anticipo portano **gli stessi tre freni**
(`ramoFreni`: soglia, perimetro, scadenza) [regola 41, decisione 71]:

| Regime | Quando | Che cosa esce |
|---|---|---|
| Firma in coda | `clausola = uscita` e `firma = false` | Ogni ramo che arriva al titolare passa da lui; i terminali che non lo raggiungono **restano in azienda**. |
| Permesso in testa | `clausola = avvio` o `libera` | Il titolare autorizza prima; i terminali che non raggiungono il titolare **escono senza la sua firma entro i tre freni**. La convergenza sul nodo firma non è obbligatoria [regola 36]. |
| Firma anticipata | `clausola = uscita` e `firma = true` | Come sopra, entro i tre freni. |

`ramoEsce(w)` restituisce i terminali «fuori» (restano in azienda) o «anticipata» (escono con i freni), sempre gli
stessi nodi con ogni regime: cambia chi li firma. Finché la firma è spenta e la clausola è `uscita`, la coda resta
quella di sempre: la spina dorsale non si riscrive [regola 28].

Persistenza: nel design `firme` e `rami` vivono in memoria e si perdono ricaricando; nel prodotto sono dati.

### 2.10 Routine

Una routine è **un workflow con un innesco in testa**: il lavoro dichiarato, contro il workflow che è il lavoro
avvenuto [decisione 49]. La parola è «routine»; l'innesco si chiama «innesco» [decisione 48].

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `id`, `nome` | stringa | dato | Chiave e nome. |
| `chi` | id dipendente | dato | Il dipendente che la esegue (una routine, un dipendente). |
| `innesco` | `{tipo, ogni, ora, testo}` | dato | `tipo` ∈ `ora` \| `evento` \| `soglia` \| `esterno`; per `ora`: `ogni` (`giorno` \| nome del giorno \| `mese`) e `ora`. Solo `ora` ha istanze nel modello. L'innesco esterno **vuole il rodaggio** [decisione 53]. |
| `clausola` | `avvio` \| `uscita` \| `libera` | dato | `avvio` chiede prima di partire, `uscita` prima di consegnare, `libera` è «fai pure» [decisione 56]. |
| `origine` | `dichiarata` \| `derivata` | dato | Scritta dal titolare, o promossa da un fatto già accaduto. |
| `autore`, `dal` | stringa, data | dato | Chi l'ha confermata e da quando. |
| `obiettivo` | id obiettivo \| null | dato | L'obiettivo che la routine serve. |
| `regola` | id regola \| null | dato | La regola d'azienda che rende lecita l'uscita, se c'è. |
| `decise[]` | id richieste | dato | Le richieste che la routine ha **prodotto** (non necessariamente deciso: `r8` l'ha prodotta `rt1` e l'ha decisa la regola `g2`). |
| `passi[]` | nomi | dato | La forma dichiarata: solo nomi, senza modello, strumenti, costo né durata [regola 35]. |
| `limiti` | `{giorno, settimana, mese, da}` | dato, facoltativi | Il budget della routine [decisione 52]. |
| `stato` | stringa | dato | Solo `attiva` ha istanze; altri valori non definiti nel design. |

Derivati: `routineDi(e)`, `routineIdDi(id)`, `rodaggioDi(rt)` → `{fatte, di: 3}` con `fatte` = quante richieste in
`decise` risolvono davvero; `orizzontiDi(rt)`; il workflow collegato è `workflowDi` del suo dipendente quando
l'esecuzione corrente lo regge, altrimenti la forma viene dai `passi` dell'ultima richiesta decisa.

Regole di dominio: **rodaggio** — le prime **3** volte producono una richiesta al titolare, non un'uscita [decisione
53]; il «fai pure» **si guadagna, non si sceglie**: prima una sezione dove provare la routine [decisione 54] (nel
modello nessuna delle routine ha fatto il rodaggio e tutte girano con `libera`: è un difetto dichiarato, non un
permesso); una routine **esegue, non decide** [regola 31]; il dipendente propone, il titolare conferma [decisione 51];
ogni routine porta la sua clausola e i suoi limiti [decisione 52]. Creazione e modifica di una routine, e il passaggio
da `derivata` a `dichiarata`: non definiti nel design (il modello scrive solo `limiti`).

### 2.11 Obiettivo

| Campo | Tipo | Dato/derivato | Significato |
|---|---|---|---|
| `id` | stringa | dato | Chiave. |
| `dip` | id dipartimento | dato | Dipartimento. |
| `titolo`, `cliente` | stringa | dato | Titolo e cliente. |
| `scadenza` | data breve o `ogni giorno` \| `ogni <giorno>` | dato | Una data, oppure una cadenza (obiettivo che si ripete). |
| `avanz` | intero 0–100 | dato | Avanzamento; come si calcola non è definito nel design. |
| `consegne` | `[fatte, totali]` | dato | Conteggio dichiarato, separato da quello delle consegne (2.13). |
| `chi[]` | id dipendenti | dato | I dipendenti coinvolti. |
| `stato` | `corso` \| `ritardo` \| `concluso` \| `nuovo` | dato | Stato. |
| `prossima` | stringa «cosa · data» | dato | La prossima consegna; la data viene letta dall'agenda. |

Relazioni: `esecuzione.obiettivo`, `routine.obiettivo`. Derivati: `obiettiviDi(dip)`, `scadenze()` (gli obiettivi con una
data, dal più vicino, con i giorni mancanti), le voci della settimana (2.15). Creazione e modifica: non definite nel
design.

### 2.12 Cliente

Il cliente **non è un record**: è una stringa (`cliente`) su richieste, attività, obiettivi, e `clienti` è l'elenco
distinto e ordinato dei nomi presenti nelle richieste (derivato). Il nome dell'azienda vale come cliente interno: una
consegna con `cliente` uguale al nome dell'azienda non è un'uscita verso un cliente (`regolaPer`, `REGOLA_NODO`). La
spesa e le consegne per cliente sono derivate per ripartizione (2.14). Un'anagrafica del cliente non è definita nel
design; nel prodotto conviene un'entità con id, perché tre regole di dominio si decidono sul cliente.

### 2.13 Consegna

«Consegna» è **l'unica parola** per la cosa creata da un'esecuzione [regola 27]. Nel modello è interamente derivata
(`consegneDi(dip, periodo)`, `consegnaDi(id)`) da due fonti:

| Fonte | Id | Che cosa porta |
|---|---|---|
| Gli `output[]` dell'esecuzione corrente | `c<idDipendente>-<indice>` | `nome`, `tipo` (`post` \| `immagine` \| `codice` \| `documento` \| `lista`), `stato` (`bozza` \| `da fare` \| `attesa` \| `approvata` \| `fatto` \| `errore`), `quando`, `desc`, `chi`, `dip`, `cliente`, `richiesta` (se è già uscita), `passo` (il passo che l'ha prodotta: `n`, `nome`, `stato`, `esito`, `strumenti`, `costo`, `durata`), `esecuzione`, `voci[]` (le voci di log di quel passo). |
| Le richieste già decise, da ieri fino al periodo (`settimana` = 7 giorni, `mese` = 31) | `cr-<idRichiesta>` | Gli stessi campi con `stato` della richiesta (`approvata` \| `modifiche` \| `rifiutata`), `passo = null`, `passata = true`, `giorno`. |

Le decise di **oggi** non entrano dalla seconda fonte perché sono già puntate dagli output della prima (non si contano
due volte). Ordine: fatte/approvate, poi in attesa, poi in corso, poi da fare, poi errore, poi modifiche/rifiutate;
le passate dopo quelle di oggi a parità di stato. Uno storico delle consegne in un record proprio non è definito nel
design: nel prodotto la consegna è l'entità che unisce output e richiesta.

### 2.14 Costi

Un solo aggregatore (`costi(periodo, dip)`) per tutte le pagine [regola 21]; interamente derivato.

| Periodo | Spesa (per dipendente) | Consegne | Per modello | Per strumento |
|---|---|---|---|---|
| `oggi` | `att.costo` | richieste approvate oggi | dai passi avvenuti delle esecuzioni | dalle esecuzioni di oggi (`strumentiUso`) |
| `mese` (30 giorni) | `metriche.ora.spesa` (confrontata con `metriche.prima.spesa`) | `approvate + modifiche` del dossier | `modello.uso` del dossier | non disponibile |
| `anno` (dalla creazione) | 30 giorni + 30 precedenti + versioni vecchie del prompt (`task × costo`) | come sopra, più le versioni vecchie (`task × (1 − respinte)`) | non disponibile | non disponibile |

Il risultato porta: `totale`, `prima` (solo mese), `blocchi {ora, prima, prima2}`, `budgetMese`, `budgetSpeso`,
`budgetGiorno`, `oggi`, `consegne`, `esecuzioni`, `chiamate`, `costoStrumenti`, `dal`, e le viste `perDipendente[]`,
`perDipartimento[]`, `perCliente[]`, `perModello[]` (null per anno), `perStrumento[]` (`nome`, `chiamate`, `costo`,
`usi[]`, `chi[]`, `errore`).

Regole: per dipartimento, per dipendente e per cliente si somma allo **stesso totale**; per cliente la spesa e le
consegne di un dipendente si ripartiscono fra i suoi clienti in proporzione al costo delle sue richieste del periodo
(oggi: il cliente dell'esecuzione in corso), con arrotondamento a interi che conserva il totale; `budget.speso` è lo
stesso numero di `metriche.ora.spesa`; il costo per modello nel mese è `modello.uso` e la sua somma torna con la spesa.
`spesaDi(e, periodo)` è la spesa di un dipendente nel periodo.

### 2.15 Agenda

Derivata da `att` dei dipendenti e dagli obiettivi; nessun dato proprio (la lista scritta `agenda` è superata da
`giornata()`).

| Funzione | Ritorna |
|---|---|
| `giornata()` | Gli eventi di oggi, uno per dipendente con attività: `chi`, `titolo`, `cliente`, `costo`, `dip`, `stato` (`corso` \| `attesa` \| `errore` \| `pianificato` \| `fatto`), `da`, `a`, `min`, `fine`, `passo`, `errore`, `guasto`, `stima`. In `errore` il blocco va dal primo passo al passo fallito; in `pianificato` la durata è la somma delle stime dei passi. |
| `settimana()` | Sette giorni da oggi; ogni giorno porta `voci[]` di tipo `pianificato` (obiettivi con cadenza «ogni …», dal secondo giorno), `consegna` (obiettivi con `prossima` in quel giorno), `scadenza` (obiettivi con `scadenza` in quel giorno); oggi porta anche gli eventi della giornata. |
| `scadenze()` | Gli obiettivi con una data, dal più vicino, con `giorni` mancanti. |
| `gruppiOggi()` | Il quadro del giorno: chi è in corso, chi in errore, i pianificati in ordine d'ora, le approvate di oggi [regola 24]. |

Il **diario** del giorno (`diario[]`: `ora`, `chi`, `testo`, `tipo` ∈ `inizio` \| `errore` \| `approvazione` \| `passo`)
è una lista scritta nel modello; nel prodotto è derivabile dal log delle esecuzioni e dalle richieste.

### 2.16 Chat

Un **filo per dipendente** (`filoDi(e)`), una sola copia condivisa da tutte le superfici [regola 22].

| Campo del messaggio | Tipo | Significato |
|---|---|---|
| `da` | `io` \| `dip` \| `sistema` | Il titolare, il dipendente, la riga di sistema. |
| `ora` | ora | Quando. |
| `testo` | stringa | Il testo. |
| `richiesta` | id richiesta | Presente quando il messaggio porta una consegna che aspetta il titolare (la decisione si prende dal filo con lo stesso `decidi`). |
| `passo` | intero | Presente quando la nota è consegnata a un passo dell'esecuzione. |

`scrivi(id, testo, extra)` aggiunge la nota del titolare (`da = 'io'`); una nota scritta dalla pagina Esecuzione entra
**nel log dell'esecuzione (voce `titolare`, con il passo in corso) e nel filo**; dalla chat entra solo nel filo: è una
sola conversazione [regola 22]. Derivati: `ultimoDi(e)`, `nonLetti(e)` (i messaggi dopo l'ultima nota del titolare),
`fili()` (prima i fili con messaggi da leggere, poi per ultimo messaggio). Le risposte del dipendente sono dati generati
dall'agente. La chat di dipartimento non esiste (vedi 5).

---

## 3. Le invarianti di dominio

Cose che devono restare sempre vere, estratte dal codice e dai commenti:

1. **Ogni richiesta ha un `chi` che risolve a un dipendente**, anche quella del tetto (il dipendente del passo che
   sfonderebbe).
2. **Una sola richiesta di tipo `tetto` viva**: nasce quando il tetto ferma, sparisce quando non ferma più; una al
   giorno, non una per esecuzione [regola 46].
3. **Il tetto si controlla prima di ogni passo, mai a metà**; il passo che sfonderebbe non parte [decisione 58].
4. **Il tetto d'azienda è obbligatorio, non si toglie ed è l'unico limite che ferma**; assumere un dipendente non lo
   muove (muove la proposta) [regola 45].
5. **L'eccezione di oggi non cambia il tetto di ogni giorno** e scade a mezzanotte [regola 46].
6. **Chi è fermo per il tetto resta in stato `lavoro`** con `pausa = true, pausaPer = 'tetto'`: nessuno stato nuovo;
   la pausa del tetto non si toglie a mano; il tetto non sovrascrive la pausa del titolare [regola 46].
7. **Il costo di un'esecuzione è la somma dei costi dei passi avvenuti**; il costo di un passo da fare è una stima e
   non si somma né si stampa come misurato [regola 40].
8. **Un workflow ha nodi = passi + 1**: l'ultimo nodo è il titolare, con la regola che ferma lì la consegna; nasce solo
   da un'esecuzione con almeno due passi conclusi e nessun passo in errore [regola 28].
9. **Nel ramo il nodo del titolare resta l'ultimo, non si toglie e non si scavalca: non ha archi in uscita**
   [regola 32]; nessun arco verso sé stesso, nessun arco doppio; la rimozione di un passo è rifiutata quando il ramo ha
   due nodi o meno.
10. **I nodi della prossima volta non portano numeri misurati** (costo 0, durata vuota) e hanno le porte spente
    [regola 32]; il numero del passo è la distanza topologica dall'inizio e **l'innesco non è un passo** [regola 44].
11. **Le posizioni messe dal titolare sono un dato**: nessuna superficie le ricalcola; solo il seme e «Riordina» le
    scrivono [regola 42].
12. **Ogni richiesta è governata da una regola e una sola**, scelta dalla più stretta e solo fra le attive, tranne quella
    del tetto che non ne ha; la somma dei conti delle regole è il totale delle richieste [regola 31].
13. **Una routine esegue, non decide**: vince la regola d'azienda attiva e la clausola può solo stringere [regola 31].
14. **«Approvata» solo se l'ha approvata il titolare**; una richiesta con `deciso` è un'«uscita»; `deciso` deve
    risolvere a una regola o a una routine esistente, mai una stringa libera [regola 30, regola 31].
15. **Una richiesta uscita da una routine è `approvata`**: una rifiutata o corretta l'ha vista il titolare.
16. **Il rifiuto porta sempre il motivo**, per le consegne e per le revisioni [regola 20].
17. **Una revisione in attesa è anche una richiesta di tipo `revisione`**, e il legame è reciproco
    (`revisione.richiesta` ↔ `richiesta.revisione`) [regola 13].
18. **Le righe «Regola generale» del dossier sono la stessa regola d'azienda**, non una copia: `attiva` si legge da lì;
    le eccezioni sono del dossier.
19. **Una consegna ha un solo nome e una sola cosa la conta**; una consegna dei giorni scorsi è una richiesta decisa;
    le decise di oggi non si contano due volte [regola 27].
20. **Per dipartimento, per dipendente e per cliente i costi sommano allo stesso totale**; `budget.speso` =
    `metriche.ora.spesa`; il costo per modello nel mese torna con la spesa [regola 21].
21. **La proposta del tetto è la somma dei budget dei dipendenti; il tetto posto no** [regola 45].
22. **Un solo filo per dipendente**; una nota dall'Esecuzione entra nel log e nel filo [regola 22].
23. **Le approvazioni in sospeso sono elementi, non stati del dipendente**: un dipendente al lavoro può avere una
    consegna in coda.
24. **La coda ha un solo ordine**: prima il tetto, poi dalla più vecchia [regola 46].
25. **Il dipendente senza nome è etichettato dal ruolo**; la tinta è una delle otto e alla creazione è la meno usata
    [regola 10, regola 19].
26. **Una sola unità, gli euro**; la percentuale è un gesto di scrittura e viene fissata in euro nel momento in cui si
    scrive, con la traccia di dove viene [regola 45].
27. **Gli orizzonti sono giorno e mese; la settimana solo dove la cadenza è settimanale.**
28. **Rodaggio di tre**: le prime tre volte una routine produce una richiesta, non un'uscita [decisione 53]; il «fai
    pure» si guadagna con una prova [decisione 54].
29. **La firma anticipata nasce spenta e si accende un workflow alla volta**; i tre freni sono uno solo per la firma e
    per il permesso in testa [regola 41, decisione 71].
30. **Il cliente uguale al nome dell'azienda non è un'uscita verso un cliente.**
31. **Il passaggio di mano fra due dipendenti non esiste**: un'esecuzione, una `serie`, un workflow appartengono a un
    dipendente solo [regola 28].

---

## 4. Le taglie

Il modello si costruisce con `modello(11)` o `modello(40)`, e il prodotto deve reggere tutte e due le taglie: le regole
di scala dicono che oltre sedici elementi un elenco ha una vista compatta e il filtro predefinito è il dipartimento
[regola 3].

**Undici dipendenti** (scritti a mano): 4 dipartimenti; 11 dipendenti di cui 3 al lavoro, 1 in attesa, 3 pianificati,
1 in errore, 3 liberi; 3 con un nome; 20 richieste (di cui in attesa: 2 consegne, 2 revisioni, più quella del tetto
che nasce all'apertura); 3 routine; 11 obiettivi; 2 dossier scritti a mano (Copywriter e Social media manager) e 9
generati; 6 esecuzioni scritte a mano e 5 generate; 4 fili scritti a mano; 43 passi; 6 workflow; 18 consegne di oggi,
30 nella settimana, 31 nel mese; proposta del tetto 115 €/giorno e 1 580 €/mese; spesa di oggi 124 € (il prodotto si
apre fermo, 3 esecuzioni su 3) [regola 46]; contrasti regola/routine: 0.

**Quaranta dipendenti** (generati): 10 per dipartimento; per ogni dipartimento 3 al lavoro, 1 in attesa, 2 pianificati
e 4 liberi, con due eccezioni (un errore in Sviluppo, una seconda attesa in Vendite): 12 al lavoro, 5 in attesa, 8
pianificati, 1 in errore, 14 liberi (conteggio dal codice; il commento nel file riporta numeri diversi e non fa
testo); un nome ogni sette; 35 richieste (le attese, due consegne parziali di chi lavora, due storiche per ogni
libero); routine ricavate con lo stesso criterio delle undici — una richiesta approvata senza il titolare è l'ombra di
una routine — quindi tante quante quelle richieste (tre); 3 obiettivi per dipartimento; tutti i dossier, le esecuzioni
e i fili generati; 156 passi; 26 workflow; 40 consegne di oggi, 55 nella settimana, 61 nel mese; proposta del tetto
400 €/giorno e 5 120 €/mese; spesa di oggi 427 € (12 esecuzioni su 12 ferme); contrasti regola/routine: 2.

Che cosa cambia nel modello con la taglia: nulla nelle entità e nelle regole; cambia solo la densità. I generatori
(`dossierGenerato`, `esecuzioneGenerata`, `filoGenerato`) sono deterministici dal ruolo e servono a coprire chi non ha
un record scritto a mano: nel prodotto ogni dipendente nuovo nasce **senza** storia, e il dossier vuoto (nessuna
metrica a 30 giorni, nessun colloquio) non è definito nel design.

---

## 5. Quello che il modello NON ha

Dichiarato nei commenti del modello, nelle regole o nelle domande aperte, così il prodotto lo sappia prima di
progettare:

- **Un orologio.** `azienda.ora` è fissa: il «tempo reale» che il design promette è «lo stato al momento in cui si apre
  la pagina», e la scadenza a mezzanotte dell'eccezione di oggi è dichiarata, non eseguita.
- **Ieri per il confronto della spesa di oggi.** `costi('oggi').prima` è nullo: il confronto esiste solo a 30 giorni.
  Per modello manca l'anno, per strumento esistono solo le esecuzioni di oggi [regola 21].
- **Un dato che colleghi un budget facoltativo a una richiesta.** I budget di dipartimento, dipendente e routine
  «mandano in coda» per dichiarazione, ma nessuna funzione produce una richiesta da loro; solo il tetto d'azienda
  ferma e genera la sua richiesta. Il tetto del mese è un dato che nessuna funzione fa scattare.
- **Il controllo del singolo passo contro il tetto.** La regola dice «il passo che sfonderebbe non parte»; il modello
  confronta la spesa già fatta con il tetto e ferma tutte le esecuzioni aperte insieme.
- **I connettori come entità.** Strumenti e connessioni vivono nel dossier di ogni dipendente (46 istanze per 17 nomi a
  undici, 40 copie della stessa connessione a quaranta); «Rinnova» sulla connessione scaduta è inerte; l'errore
  «Chiavi di accesso scadute» non è attaccato a nessuna connessione; la divisione fra accesso (i quattro spenti «Solo
  con approvazione», «Sola lettura») e capacità è scritta solo nelle descrizioni.
- **La chat di dipartimento.** Esiste solo il filo per dipendente; il canale di dipartimento manca del codice.
- **Lo storico delle esecuzioni.** Esiste solo l'esecuzione corrente per dipendente; il passato è leggibile dalle
  richieste decise, che portano solo i nomi dei passi. I passi delle routine sono nomi senza modello, strumenti, costo
  né durata.
- **La persistenza delle decisioni.** Nel design `decidi`, le pause, i limiti, `firme` e `rami` vivono in memoria e si
  perdono ricaricando: nel prodotto sono tutti dati.
- **La creazione e la modifica** di dipartimenti, regole di approvazione, routine, obiettivi e clienti; la cancellazione
  di un dipendente; la riapertura di una richiesta decisa; il passaggio del dipendente da `attesa` dopo la decisione.
- **Gli inneschi `evento`, `soglia`, `esterno`**: nominati, senza istanze e senza semantica oltre «l'esterno vuole il
  rodaggio» [decisione 53].
- **La prova della routine** prima del «fai pure» [decisione 54]: dichiarata, senza record; nel modello nessuna routine
  ha fatto il rodaggio e tutte girano con `libera`.
- **La scadenza del workflow** (10 esecuzioni, e prima se cambia il prompt o il modello di un passo) e l'arrotondamento
  della soglia ai 5 €: i due numeri non misurati; il conteggio delle esecuzioni fatte con la firma anticipata non esiste.
- **L'applicazione del `modo` delle regole** («Automatica sotto 20 €»): il modo è un testo; nessuna funzione lo esegue.
- **La preferenza fra «approvazione a ogni avvio» e «approvazione dell'uscita»** in una pagina Impostazioni
  [decisione 56]: la pagina Impostazioni esiste per il tetto, la preferenza no.
- **Il passaggio di mano fra dipendenti** dentro un workflow: zero casi; se il prodotto lo vuole, va prima inventata
  la relazione nel modello [regola 28].
- **«Che cosa ha creato l'azienda» e «che cosa abbiamo fatto per un cliente»** come viste: dichiarate fuori dal
  perimetro scelto [regola 27].
- **Un'azienda con più titolari, più aziende per installazione, ruoli e permessi delle persone**: non definiti nel
  design.
