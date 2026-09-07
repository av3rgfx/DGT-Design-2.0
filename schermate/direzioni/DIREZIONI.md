# Tre direzioni per la vista principale dell'azienda

Stato al 2026-09-04. Prima applicazione del sistema di design al prodotto reale: la vista principale di
un'azienda DGT con quattro dipartimenti e undici dipendenti AI, tre dei quali al lavoro in questo momento.
Tre direzioni sulla stessa schermata, prova di scala a quaranta dipendenti, direzione scelta.

- Confronto interattivo (tab A/B/C, selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Direzione A cliccabile (tendine, pagine Richieste, Dipartimento, Dipendente ed Esecuzione, avatar ed editor): https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
- Sorgenti: `direzione-a.html`, `direzione-b.html`, `direzione-c.html` (aggiungere `?n=40` per la prova di scala),
  `confronto.html` (la stessa pagina dell'artefatto, con gli script separati).
- Avatar dei dipendenti, le due famiglie a confronto (kit e orbe): https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
- Le pelli dell'orbe senza disco, quattro soluzioni a confronto su tutti i fondi della Console (`avatar-pelli.html`):
  https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- Screenshot a 1440 px in `screenshot/` (`a-11.png` … `c-40.png`, `a-dipendente-nuovo.png`, `a-dipendente-modifica.png`,
  `a-11-avatar-kit.png`, `avatar-confronto.png`, `avatar-orbe-pellicola.png`, `avatar-pelli.png`; la pagina del dipendente:
  `a-dipendente.png`, `a-dipendente-ruolo.png`, `a-dipendente-dossier.png`, `a-dipendente-confronto.png`; la pagina
  dell'esecuzione: `a-esecuzione.png`, `a-esecuzione-errore.png`, `a-esecuzione-attesa.png`).

## 1. Studio del prodotto

### Che cosa deve rispondere la vista principale

DGT è un sistema operativo aziendale per agenti AI: il titolare crea un'azienda digitale fatta di dipartimenti e
dipendenti AI, assegna obiettivi reali e gli agenti lavorano per ore o giorni. La vista principale è la prima cosa
che il titolare apre al mattino e l'ultima che chiude la sera. Deve rispondere, nell'ordine, a cinque domande:

| # | Domanda | Chi la fa | Cosa serve sullo schermo |
|---|---|---|---|
| 1 | **Chi sta lavorando adesso, su cosa, da quando?** | titolare e operatore | le esecuzioni in corso con passo, cliente, ora di inizio |
| 2 | **Cosa aspetta me?** | titolare | le approvazioni in sospeso, con approva / rifiuta a portata di mano |
| 3 | **Com'è fatta l'azienda?** | titolare | i dipartimenti, i dipendenti e il loro stato |
| 4 | **Cosa è successo oggi e quanto è costato?** | titolare | consegne, spesa del giorno, obiettivo del mese |
| 5 | **Da dove riparto?** | operatore | aprire un dipartimento, un dipendente, un'esecuzione; assegnare un obiettivo |

Le due utenze (titolare: risultati, costi, approvazioni; operatore tecnico: configurazione, esecuzioni) usano la
stessa app: la vista principale è del titolare, gli approfondimenti sono dell'operatore.

### Il modello

Un solo modello dati per le tre direzioni (`dati.js`), così il confronto è sul design e non sui contenuti.

- **Azienda** Nova Studio (inventata): agenzia che vende software, automazioni, siti ed e-commerce. Titolare Marco Rossi.
- **Dipartimenti** (4): Sviluppo, Marketing, Vendite, Amministrazione.
- **Dipendenti AI** (11): di base **senza nome** (dal 2026-09-04, versione 5): li identifica il ruolo. Sviluppo:
  Sviluppatore full-stack, Tester QA, DevOps (**Kim**) · Marketing: Copywriter (**Nora**), Social media manager,
  Specialista SEO · Vendite: Ricerca lead, Proposte commerciali, Follow-up clienti · Amministrazione: Fatturazione
  (**Rea**), Report al titolare. Tre hanno un nome dato dal titolare. Ogni dipendente ha un ruolo e uno stato: `lavoro`
  (3: Sviluppatore full-stack, Nora, Ricerca lead), `attesa` di approvazione (Social media manager), `pianificato` a
  un'ora (Tester QA 15:00, Follow-up clienti 17:00, Report al titolare 18:00), `errore` (Kim: deploy fallito), `libero`
  (Specialista SEO, Proposte commerciali, Rea). Campi facoltativi: `nome`, `seme` (seme dell'avatar, di default il ruolo).
- **Approvazioni** (2): sono elementi, non stati. Nora continua a lavorare al post 5 mentre il post 4 aspetta il titolare.
- **Diario** (8 voci) e **agenda** del giorno (esecuzioni fatte, in corso, pianificate).
- **A 40**: 10 dipendenti per dipartimento, 12 al lavoro, 7 approvazioni, 1 errore, un nome ogni sette. Generato, stesso schema.

### Dove i componenti del sistema di design diventano DGT

Il sistema copia un CRM: la mappa tra i suoi componenti e i concetti di DGT è la parte di studio che ha deciso la
direzione A.

| Componente del riferimento | In DGT diventa |
|---|---|
| Barra agenda (pillola bianca + timeline lime con eventi e marcatore) | **Oggi in azienda**: le esecuzioni del giorno; il segmento verde profondo è «adesso», con gli avatar di chi lavora |
| Riga WORKSPACE (titolo con la O = marchio, «Nuova attività», tre numeri con badge) | **Nome dell'azienda** (la O di NOVA è il marchio), «Nuovo obiettivo», *al lavoro · da approvare · spesi oggi* |
| Card attività (lime / grigia / scura, striscia con avatar, intaglio con campanella, pillola «Stato») | **Card esecuzione**: chi, cosa, cliente, da quando; «Passo 3 di 7» nella pillola; lime = c'è un'approvazione in sospeso |
| Card lead (avatar, nome 26, ruolo, «Fonte», punti di interesse) | **Card dipartimento** (icona, nome, «3 dipendenti · 1 al lavoro», avatar impilati, punti = carico) e **card dipendente** (avatar, nome, ruolo, stato, punti = attività di oggi) |
| Evento dell'agenda (pillola bianca con coppia di avatar, durata, freccia) | **Riga compatta del dipendente** oltre i sedici: avatar, nome, ruolo, stato, freccia |
| Videochiamata con controlli in vetro + rosso | **Da approvare**: l'anteprima della consegna con apri, commenta, approva (lime), rifiuta (rosso) |
| Riepilogo chiaro (Documenti, Obiettivo) | **Riepilogo del giorno**: consegne, spesa di oggi, obiettivo del mese |
| Rail di quattro cerchi | Azienda · organizzazione · chat · agenda |
| Pillole filtro con l'icona fiamma (niente emoji dal 2026-09-04) | Tutte · [fiamma] Da approvare · In corso · Pianificate · Errori |

## 2. Le tre direzioni

Solo la A segue il sistema di design. B e C se ne allontanano apposta: servono a vedere cosa si esclude.

### A · Console (il sistema di design così com'è)

Nero, lime, Urbanist leggera, pillole e cerchi, card con intaglio, barra agenda in alto, Riepilogo chiaro a destra.
Tre sezioni: *Al lavoro adesso* (card esecuzione), *Dipartimenti* (quattro card), *Dipendenti* (griglia di card,
elenco di pillole oltre i sedici). A destra il pannello *Da approvare* e il *Riepilogo*.

**Guadagna**
- Identità immediata: nessun prodotto per agenti AI assomiglia a questo, il titolare lo riconosce a un metro.
- Il «adesso» è un luogo: barra delle esecuzioni e prima riga di card; tre al lavoro si vedono senza cercare.
- Un accento con un significato: lime = serve il titolare (al lavoro, da approvare). Il pannello a destra è la sua scrivania.
- Componenti già pronti per le schermate successive: card esecuzione, card lead, pillola-evento, Riepilogo.

**Perde**
- Densità: una card 240×204 per dipendente; a quaranta serve la regola «griglia → pillole».
- Confrontabilità: costi, tempi e passi stanno dentro le card, non in colonne; ordinare per costo è una vista a parte.
- Testo lungo: titoli e ruoli vanno tenuti corti, le pillole stanno su una riga o si tagliano.
- Contrasto non normato: il grigio `#9A9A9A` sul nero e il nero sul lime vengono dal riferimento, non da una regola.

### B · Registro operativo (deliberatamente lontana)

Fondo chiaro `#F5F6F8`, Inter 13 px con numeri tabulari, barra laterale testuale, cinque numeri piatti, tabella
raggruppata per dipartimento (dipendente · stato · attività e cliente · quando · avanzamento · costo · azioni),
pannello destro con approvazioni e registro. Bordi da 1 px, raggi da 6–8 px, un solo blu funzionale, colori di stato
come tag.

**Guadagna**
- Densità e confronto: undici righe in una schermata, quaranta in due; tutto ordinabile.
- Strumenti da tavolo operativo: ricerca ⌘K, raggruppa, ordina, filtri per stato.
- Stato leggibile per forma: pallino + tag; l'errore è una riga rossa, non una card da cercare.
- Il registro degli eventi racconta la giornata in ordine di tempo.

**Perde**
- L'identità: potrebbe essere qualsiasi SaaS; il riferimento nero e lime sparisce del tutto.
- Il «adesso» come luogo: chi lavora è una riga verde tra le altre, si trova filtrando.
- Il titolare: è una vista da operatore; chi vuole «approvare e andare» trova un foglio.
- Il mobile: una tabella di sette colonne non ha una versione da telefono; servirebbe un secondo linguaggio.

### C · Mappa viva (deliberatamente lontana)

Crema caldo `#F4EFE6`, Fraunces per i titoli e Instrument Sans per il resto, quattro stanze con una tinta ciascuna
(indaco, corallo, ambra, verdeacqua), i dipendenti sono cerchi nella stanza: chi lavora ha l'anello acceso e un fumetto
con attività e passo, chi è libero è tratteggiato, chi è pianificato ha l'ora, l'errore è rosso. A destra
*In attesa di te* e il *Diario di oggi*.

**Guadagna**
- Modello mentale istantaneo: quattro stanze, undici persone, tre anelli accesi; l'organico si capisce senza leggere.
- Calore: l'azienda digitale sembra una squadra, non un cruscotto.
- Il diario: la giornata raccontata come si racconta a un titolare.
- Approvazioni in vista con due soli pulsanti.

**Perde**
- Scala: a quaranta le stanze si affollano (dieci cerchi, tre fumetti per stanza), altezze disuguali, posizioni senza significato.
- Confrontabilità: nessuna colonna; costi e tempi stanno nei fumetti o nel diario.
- Cinque tinte: quattro colori di dipartimento più il rosso; il sistema a un accento salta.
- Il riferimento: niente nero, niente lime, niente pillole e cerchi.

## 3. La prova dei quaranta

Undici dipendenti stanno in qualsiasi impaginazione. Quaranta no: la domanda è quale unità cresce e quale resta ferma.
Le tre schermate sono state generate con lo stesso modello a 40 (12 al lavoro) e misurate a 1440 px.

| Direzione | Cosa resta uguale | Cosa cresce | Altezza a 11 → 40 | Il «adesso» con 12 al lavoro |
|---|---|---|---|---|
| A · Console | barra esecuzioni, numeri, 4 card dipartimento, pannello approvazioni | l'elenco dei dipendenti (card → pillole, 3 per riga) | 1.724 → 1.968 px | un luogo: la riga in alto, scorrevole, «da approvare» in testa |
| B · Registro | barra laterale, cinque numeri, pannello destro | la tabella, una riga per dipendente | 900 → 1.902 px | una colonna: si trova filtrando |
| C · Mappa | le stanze, il diario | le stanze: 10 cerchi, un fumetto per riga | 946 → 1.135 px | dodici anelli in quattro stanze: si vede chi, non cosa |

**Verdetto: regge meglio la A, a una condizione.** Regge perché l'unità che cresce non è il dipendente ma il
dipartimento e l'esecuzione: le quattro card restano quattro, la barra mostra chi lavora adesso qualunque sia
l'organico, il pannello di approvazione resta uno. L'unica parte che cresce, l'elenco dei dipendenti, il sistema la sa
già comprimere con un componente del riferimento (la pillola-evento con avatar, testo e freccia). La condizione: oltre
i sedici dipendenti la griglia diventa elenco di pillole e il filtro predefinito è il dipartimento. Senza questa regola
A è dieci righe di card e perde contro B.

B regge meccanicamente (una riga per persona, tutto confrontabile) ma il «adesso» diventa una colonna da filtrare e
l'azienda un foglio di calcolo. C si affolla: a dodici al lavoro ogni fumetto prende una riga, le stanze crescono in
modo disuguale e la posizione di un cerchio non dice niente.

## 4. Direzione scelta: A · Console

Le prossime schermate (dipartimento, dipendente, esecuzione, approvazioni da mobile, costi) nascono solo dentro questa
direzione. Regole che valgono da qui in avanti:

1. **Unità di scala**: dipartimento ed esecuzione. Il dipendente è la foglia.
2. **Il «adesso» è un luogo**: la barra in alto e la prima riga di card, ordinate con «da approvare» in testa; la riga
   scorre in orizzontale oltre le tre card.
3. **Oltre sedici elementi** ogni elenco ha una vista compatta (pillole, 3 per riga) e il filtro predefinito è il
   dipartimento. È l'unica idea che si porta da B; da C non si porta niente.
4. **Un solo accento**: lime = attenzione del titolare (al lavoro, da approvare). Rosa `#F9A3A3` solo per errori e cali.
5. **Testi corti**: titoli di attività entro due righe a 24 px, ruoli entro una riga a 13 px, pillole su una riga.
6. **Il pannello del titolare sono due tendine flottanti** (richieste dell'utente, 2026-09-04), sopra tutto, così
   la home prende tutta la larghezza. Da chiuse restano **due pillole** al bordo destro: lime «campanella · 2 · da
   approvare» e bianca «bacchetta · Riepilogo». La tendina **Da approvare** (330 px) mostra la richiesta corrente
   con apri, commenta, approva, rifiuta e le frecce, sotto la **coda** delle altre in attesa e in fondo la riga che
   porta al Riepilogo; **estesa** (840 px) mostra la richiesta per intero: contenuto a sinistra, chi la propone,
   passi, costo e nota a destra, azioni in fondo e il collegamento a «Tutte le richieste». La tendina **Riepilogo
   di oggi** mostra consegne, spesa, obiettivo del mese e le ultime voci del diario, con in fondo la riga lime
   che riporta alle richieste. Entrambe si chiudono con la freccia verso destra e sono aperte all'apertura della
   home se c'è qualcosa da approvare.
7. **Logo e titolo**: il logo del prodotto è l'acronimo **DGT** (Urbanist 600, 22 px, spaziatura .12em) in alto a
   sinistra; il titolo dell'azienda è in maiuscolo con la O normale (niente marchio al posto della O).
8. **Pagina Richieste**: tutte le richieste dell'azienda, nella stessa cornice della home (barra in alto, titolo
   RICHIESTE con tre numeri, rail con la campanella attiva). Tre sezioni: *Da approvare* (card lime con approva e
   rifiuta), *Approvate* (esito con ora e iniziali di chi ha deciso), *Con modifiche o rifiutate* (esito con il
   commento). Un clic su una card da approvare apre la tendina estesa su quella richiesta.
   Versione completa (filtri, storico, regole): vedi «Versione 3» più sotto.
9. **Il dipendente non ha un nome di base** (2026-09-04, versione 5): l'etichetta principale è il **ruolo** e sotto
   sta il **dipartimento**; il nome è facoltativo, lo dà il titolare alla creazione o dopo, e quando c'è torna la
   forma piena (nome grande, sotto «ruolo · dipartimento»). Vale in tutte le viste: card, righe compatte, striscia
   «chi» delle card esecuzione e richiesta, tendine, coda, diario, storico, filtri, agenda.
10. **Avatar generati, non iniziali**: ogni dipendente AI ha un avatar deterministico dal seme (il ruolo, o un seme
    scelto nell'editor), disegnato nel linguaggio del sistema e **senza disco** (versioni 7 e 7b): l'orbe perla
    nera, un cerchio nero lucido con riflesso, luce riflessa e orlo di luce, lo stesso su ogni fondo; occhi bianchi,
    lime quando serve il titolare (al lavoro), gialli da approvare, rosa a X per l'errore. Con l'orbe tutti gli
    avatar sono in moto (un solo motore per pagina); il kit è statico tranne le card «Al lavoro adesso» e
    l'anteprima dell'editor. Il titolare, che è una persona, tiene le iniziali su disco bianco.
11. **Creazione e modifica del dipendente in una tendina**, con la stessa forma delle tendine del titolare: anteprima
    della card, ruolo, nome facoltativo, dipartimento a pillole, scelta dell'avatar fra sei varianti, Crea/Salva e
    Annulla. Si apre dalla matita nell'intaglio della card, dalla riga compatta e dalla card «Aggiungi».
12. **La pagina del Dipendente** (versione 6) nella stessa cornice, un solo ordine per i due pubblici: prima ciò che
    legge il titolare (testata con i quattro numeri a 30 giorni, revisione di performance), poi ciò che configura
    l'operatore (oggi, rendimento, soul prompt con versioni e confronto, modello e criterio, strumenti e connessioni,
    budget e permessi, colloquio). **Una revisione di performance è una richiesta al titolare** come le altre: ha un
    dossier con evidenze, stime e rischi, quattro decisioni (prova, applica, chiedi modifiche, rifiuta con motivo) e
    una cronologia con l'effetto misurato. Le richieste decise dal titolare sono la fonte di «corretti» e «respinte».
13. **L'avatar è un avatar, non un'icona** (versioni 7 e 7b): niente disco né anello bianco dietro l'orbe; pelle
    **perla nera** su ogni fondo, che si stacca dal nero per il volume (riflesso, luce riflessa, orlo di luce,
    bagliore di pochi pixel), non per un contorno; **corpi tondi** (cerchi, niente ovali né squash e stretch) e
    **moti continui** (un solo motore per pagina, funzioni del tempo senza scatti); gli **occhi sono quelli del kit**
    (pupille grandi dipinte sulla sfera con la sua base tangente e i suoi moti dello sguardo, versione 7c). Gli avatar
    impilati (coppie,
    tendine) si sovrappongono di 6 px senza anello. Le altre pelli (grigio, chiaro, alone, disco) restano dietro
    `?pelle=` per il confronto.
14. **La pagina dell'Esecuzione** (versione 8) nella stessa cornice, aperta dall'«occhio» e dalla freccia delle card
    esecuzione: titolo = titolo dell'esecuzione, tre numeri (passi fatti, spesi, tempo); testata con avatar, chip,
    la frase «Adesso … Prossimo …», le azioni per stato (pausa, interrompi, scrivi; riprova; avvia ora; apri la
    richiesta) e la **barra dei passi**, che è la barra agenda del sistema; poi Passi, Log con la barra di scrittura
    del titolare, Output con le consegne precedenti della serie, Costo. Ogni azione cambia il modello e si vede
    subito nella home e nel dipartimento.
15. **La pagina dei Costi** (versione 13) nella stessa cornice, l'ultima pagina di prodotto: per dipartimento, per
    dipendente, per cliente, per modello, per strumento, ognuna con le pillole del periodo che i suoi dati reggono
    (oggi dalle esecuzioni, 30 giorni dal dossier, da inizio anno dalla creazione). **Un solo aggregatore** (`m.costi`
    in `dati.js`) per la pagina e per la sezione «Spesa del mese» del Dipartimento: gli stessi numeri ovunque, e le
    viste per dipartimento, dipendente, cliente e modello sommano allo stesso totale. Si arriva dal sesto cerchio del
    rail (euro), dal numero «spesi oggi» e dalle pillole «Tutti i costi dell'azienda» nelle sezioni Spesa del mese e Costo.
16. **Le pagine Agenda e Chat** (versione 15) nella stessa cornice, dai due cerchi del rail che restavano inerti. L'**Agenda**
    parte dalla barra «Oggi in azienda»: la barra agenda del riferimento allargata alla giornata (blocchi su corsie, il segno
    di «adesso», la pista chiara e il lime nei blocchi al lavoro e da approvare), le card degli eventi con le pillole che
    filtrano, le scadenze e i sette giorni. La **Chat** parte dalla barra di scrittura dell'Esecuzione: un filo per
    dipendente, le note del titolare e le risposte del dipendente, le consegne che aspettano dentro il filo con approva e
    rifiuta. **La nota scritta nell'Esecuzione entra nel log e nel filo**: è una sola conversazione. Sul telefono le stesse
    tre schermate nelle due tab della navigazione in basso. Un solo aggregatore in `dati.js` (`giornata`, `settimana`,
    `scadenze`, `filoDi`, `scrivi`) per la Console e per il telefono.
17. **Il quadro del giorno vale anche sul telefono** (versione 17): la barra «Oggi in azienda» della Console, ridotta alla
    colonna di 254 px in una griglia due per due di caselle contate (icona o pila, numero, parola), in cima alla sola
    schermata 1 — sul telefono le schermate sono destinazioni separate e il quadro appartiene alla home, mentre l'Agenda *è*
    già la giornata. I conti stanno nel modello (`m.gruppiOggi()`), uno solo per il desktop e per il telefono. Il quadro
    costa 118 px di schermo e **si pagano togliendo, non stringendo**: la riga dei due numeri grandi cade perché il quadro
    dice già «approvate» (correzione 16a) e il titolo dice già «da approvare», che si prende il conto.
18. **Un controllo si vede solo se fa quello che promette, con i dati che ci sono già** (versione 17). Due prove: *serve* in
    questa sezione? *si può fare* col modello? Chi le passa diventa vero, chi ne fallisce una sparisce; non ci sono controlli
    per figura. In concreto: «cerca» resta dove la lista può passare le **dodici righe** in una delle due taglie
    dell'azienda ed è un campo che filtra mentre si scrive; il cerchio «filtri» non resta da nessuna parte (dove ci sono le
    pillole il filtro è già lì e visibile, dove non ci sono non ha niente da aprire); una pillola resta se è un filtro su un
    campo che il modello ha; il conto «N di M» sta nel contatore della sezione e non anche nel campo di ricerca.

### Versione 2 della direzione A (2026-09-04)

Dopo la scelta l'utente ha chiesto: O normale nel titolo, logo = acronimo DGT, pannello del titolare a popup
(chiudibile verso destra, con icona e conteggio quando è chiuso, richiesta mostrata per intero quando si espande) e
una pagina per le sole richieste dell'azienda. Tutto è in `direzione-a.js` (funzioni `tendinaChiusa`,
`tendinaAperta`, `tendinaEstesa`, `richieste`) ed è cliccabile: `DIREZIONE_A.monta(radice, modello, opzioni)`.
Parametri di `direzione-a.html`: `?n=11|40`, `?tendina=chiusa|aperta|estesa`, `?pannello=richieste|riepilogo`,
`?pagina=home|richieste`, `?richiesta=0`.
Screenshot: `screenshot/a-tendina-chiusa.png`, `a-tendina-aperta.png`, `a-tendina-estesa.png`, `a-richieste.png`.
Artefatto interattivo: https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c

### Versione 3 della direzione A (2026-09-04, stessa sessione)

Risposte alle tre richieste successive dell'utente.

1. **Riepilogo separato**: mostrate le due alternative («insieme»: una tendina con richiesta sopra e Riepilogo
   sotto; «separato»: due pillole e due tendine). **L'utente ha scelto «separato»**; l'opzione «insieme» e il
   selettore di prova sono stati tolti. Da chiuso ci sono due pillole al bordo destro; la tendina delle richieste
   mostra la richiesta corrente e la **coda** (le altre in attesa, cliccabili); quella del Riepilogo mostra
   consegne, spesa, obiettivo e le ultime voci del diario; in fondo a ciascuna una riga porta all'altra.
   Screenshot: `a-tendina-chiusa.png`, `a-tendina-aperta.png`, `a-riepilogo.png`, `a-tendina-estesa.png`.
2. **Tendina aperta all'apertura della home**: confermato.
3. **Pagina Richieste completa** («pieno controllo»): barra dei filtri per **stato, tipo, periodo, cliente e
   dipendente** (pillole, funzionanti, con riepilogo «N di M richieste · filtri attivi · Azzera»); sezione *Da
   approvare* con ordinamento (più vecchie / più recenti) e **Approva tutte**; **Storico** per giorno (Oggi, Ieri,
   Ultimi 7 giorni, Ultimi 30 giorni, Prima) con righe compatte: ora, chi, cosa e cliente, tipo, esito, chi ha
   deciso o quale regola, costo; sezione **Regole di approvazione** (Uscite verso i clienti, Report interni, Liste
   di lead, Spese sopra 50 €) con modo e stato. Approva, rifiuta e chiedi modifiche cambiano davvero lo stato
   nella pagina (i dati si azzerano ricaricando). Screenshot: `a-richieste.png`.

### Versione 4 della direzione A: pagina Dipartimento (2026-09-04, «Va bene procedi»)

Si apre dalle card dei dipartimenti nella home (o dal rail, icona organizzazione) e usa la stessa cornice della
Console: titolo con il nome del dipartimento in maiuscolo, «Nuovo obiettivo», tre numeri del dipartimento (al
lavoro, da approvare, spesi oggi), cerchio delle impostazioni a destra, rail con l'organizzazione attiva. Cinque
sezioni, tutte con intestazione, conteggio e pillole:

1. **Oggi in ‹dipartimento›**: le esecuzioni di oggi come card attività, in ordine al lavoro → errore →
   pianificate. La card errore ha il triangolo nel cerchio, la pillola «Errore · motivo» e il pulsante «Riprova»;
   la card pianificata ha l'ora nella pillola, «In coda» e «Avvia ora».
2. **Dipendenti**: le card dei dipendenti del dipartimento e una card tratteggiata «Aggiungi un dipendente».
3. **Obiettivi**: card obiettivo (nuova): cliente e scadenza nella striscia, titolo, «45% · 3 di 7 consegne»,
   barra di avanzamento a pillola, «Prossima: …», stato con gli avatar di chi ci lavora. Lime = in ritardo.
4. **Da approvare**: le richieste in attesa che arrivano dal dipartimento, con il collegamento «Tutte le richieste
   di ‹dipartimento›» che apre la pagina Richieste già filtrata (nuovo filtro «Dipartimento» nella barra).
5. **Spesa del mese per cliente**: righe compatte con consegne approvate, spesa di oggi, quota del dipartimento e
   totale degli ultimi 30 giorni (calcolate dalle richieste e dalle esecuzioni del dipartimento).

Dati: `obiettivi` per dipartimento in `dati.js` (11 a mano, 3 per dipartimento a 40). Parametri:
`?pagina=dipartimento&dip=svi|mkt|ven|amm`. Screenshot: `a-dipartimento.png`.

### Versione 5 della direzione A: i dipendenti AI (2026-09-04, sessione successiva)

Tre richieste dell'utente, nell'ordine, con la proposta accettata prima di costruire.

1. **Niente nomi di base.** In `dati.js` il campo `nome` è facoltativo (a 11 lo hanno Nora, Kim e Rea; a 40 uno ogni
   sette) e il modello espone `etichetta(e)` (nome, altrimenti ruolo) e `sotto(e, breve)` («ruolo · dipartimento»
   con il nome, solo il dipartimento senza). La **card dipendente** ha due forme con la stessa altezza (**240 px**,
   da 204, con il piede Stato/Oggi ancorato in basso): senza nome il ruolo a **22/26 px su due righe** (i ruoli sono
   più lunghi dei nomi: «Sviluppatore full-stack» non sta su una riga a 26 px) e sotto il dipartimento a 13 px; con
   il nome la forma di prima (nome 26/30 su una riga, sotto «ruolo · dipartimento»). Nelle card esecuzione e richiesta
   la striscia «chi» ammette due righe. La ricerca nei filtri usa l'etichetta. L'elenco compatto oltre i sedici torna
   a **3 per riga** (come dice la regola 3; era a 4) per lasciare posto a ruolo, stato e ai due cerchi matita e freccia.
2. **Modifica del dipendente**: tendina «Dipendente» (`tendinaDipendente` in `direzione-a.js`, stato
   `tendina: 'dipendente'` con `modifica = { id, bozza }`), 330 px, chiara come le altre due. Dall'alto: intaglio con
   più/matita e titolo («Nuovo dipendente» / «Modifica dipendente»), **anteprima** della card che cambia mentre si
   scrive (l'avatar dell'anteprima segue il puntatore), campo **Ruolo** (obbligatorio: se manca, il bordo diventa
   rosso e non si salva), campo **Nome** («facoltativo: senza nome si vede il ruolo»), **Dipartimento** a pillole con
   l'icona, **Avatar** con sei cerchi (quello del ruolo più cinque varianti, il seme scelto ha l'anello nero), azioni
   «Crea dipendente»/«Salva» lime e «Annulla». Invio salva, Esc annulla; alla chiusura torna la tendina di prima. Si
   apre dalla **matita** nell'intaglio della card (accanto alla freccia), dalla riga compatta, dalla card tratteggiata
   «Aggiungi un dipendente» (ora anche nella home; nella pagina Dipartimento preimposta il dipartimento). Le
   mutazioni stanno nel modello (`m.aggiungi`, `m.aggiorna`, `m.ricalcola`) e si vedono subito in tutte le viste;
   ricaricando la pagina i dati tornano quelli sintetici. Parametro per gli screenshot: `?editor=nuovo|<id>`.
3. **Avatar dal kit dell'utente** (`avatar/`). Il motore del kit (`vendor-avatars/`, 8 moduli ESM, architettura
   adattata da bloub, MIT) è **intatto** e impacchettato in uno script classico (`build-motore.js` →
   `avatar-motore.js`) perché la Console gira da `file://` e come file unico. L'involucro `avatar-dgt.js` sostituisce
   quello del kit e decide tutto ciò che è estetica:

   | Cosa | Nel kit | Nella Console |
   |---|---|---|
   | Seme | mansione (ruoli curati + generati) | `seme` del dipendente, di default il **ruolo**; stesso seme → stesso avatar in ogni vista e sessione |
   | Forma | silhouette, pupilla, segno distintivo dal seme | uguale (deriveRole del kit, senza le regex dei ruoli curati: due ruoli diversi non collassano sulla stessa forma) |
   | Tinte | una per ruolo, ambra e rosso per gli stati | **solo palette**: disco `#E4E4E4`, corpo `#0A0A0A`, pupille `#FCFCFC`; **lime** `#B8FC64` per pupille e segni interni quando serve il titolare (al lavoro, da approvare); **rosa** `#F9A3A3` per gli occhi a X dell'errore; anelli e «z» fuori dal corpo in nero sottile |
   | Stati | working, thinking, alert, success, error, dormant, offline, idle | lavoro → working · attesa → alert · errore → error · pianificato → idle · libero → dormant (le «z» del sonno, ingrandite 1,5×) |
   | Cornice | 134 su viewBox 160 | uguale, una per tutti gli stati; il corpo occupa i 3/4 del disco; la richiesta corrente forza `attesa` (la faccia che aspetta il titolare) |
   | Moto | custom element, un rAF per pagina | statico di default: ogni (seme, stato) è un `<symbol>` disegnato una volta al fotogramma HERO_TIME e riusato con `<use>`; si animano solo `.av[data-anima]` (card «Al lavoro adesso») e `.av[data-segue]` (anteprima dell'editor), con un solo rAF; con `prefers-reduced-motion` niente si muove |
   | Accessibilità | aria-hidden | uguale: l'avatar sta accanto all'etichetta e alla pillola di stato, non porta informazione da solo |

   Misure: 48 nelle card, 40 nelle righe, 36 nelle pillole «Stato», 32 nella coda, 28 negli avatar impilati, 26 nei
   filtri, 68 nella richiesta corrente. Il titolare (persona) tiene le iniziali su disco bianco. Le classi gradiente
   `.av.a1…a6` non esistono più. Prova di lettura: 11 ruoli × 5 stati a 48 px, più 68/36/28 e i sei semi
   dell'editor, tutti leggibili; screenshot `a-11.png`, `a-40.png`, `a-dipendente-nuovo.png`, `a-dipendente-modifica.png`.
   Prova cliccata con Playwright: creazione, cambio dipartimento e avatar, salvataggio, modifica di Nora senza nome,
   ruolo vuoto bloccato, Esc, dipartimento preimpostato dalla pagina Dipartimento, tre avatar vivi nelle card al
   lavoro: tutto senza errori in console.

### Versione 5b: la variante «orbe» degli avatar (2026-09-04, richiesta successiva)

Dopo la versione 5 l'utente ha chiesto avatar **più puliti** (le forme del kit erano una diversa per ruolo: troppo
diverse fra loro) e **più dinamici**, «nello stile degli avatar di Grok AI». Interpretazione presa: l'orbe della
modalità voce di Grok, una sfera morbida e monocroma che respira e segue lo sguardo, con il volto ridotto a due
occhi. Ne è nata una **seconda famiglia**, «orbe» (`avatar/avatar-orbe.js`), accanto a quella del kit, che resta
disponibile: si sceglie con `DGT_AVATAR.usa('orbe'|'kit')`, nelle pagine con `?avatar=orbe|kit`. **Predefinita:
orbe**, in attesa della scelta dell'utente.

| | Kit (versione 5) | Orbe (versione 5b) |
|---|---|---|
| Forma | silhouette del generatore del kit: poligoni, gocce, fiori, fagioli; una per ruolo | tutte sfere morbide: superellisse da tonda a «squircle», rapporto e inclinazione leggeri, un solo rigonfiamento; il corpo occupa i 4/5 del disco |
| Cosa distingue un dipendente | la silhouette, la pupilla, il segno distintivo | gli occhi (tondi, pillola alta, pillola larga; distanza e altezza), l'inclinazione, la rotondità |
| Colori | palette: disco chiaro, corpo nero, occhi bianchi, lime e rosa per gli stati | uguali, con gli occhi **gialli** `#FCDC64` da approvare (lime resta per il lavoro), più un riflesso bianco appena accennato (11 %) in alto a sinistra e un gradiente fra i neri della palette |
| Stati | working, alert, error, idle, dormant del kit | lavoro: occhi lime e squash e stretch · da approvare: occhi grandi gialli e un saltello · errore: occhi a X rosa e un tremito ogni tanto · pianificato: occhi bianchi · libero: palpebre socchiuse, respiro lento. Nessun segno fuori dal corpo (l'arco che orbitava e le onde sono stati tolti nella versione 5c) |
| Moto | un rAF, solo le card al lavoro e l'anteprima | **animazioni CSS su tutti gli avatar**, fase e periodo dal seme (nessuno in sincrono): respiro del corpo, deriva dello sguardo, battito delle palpebre, dondolio, più il moto proprio di ogni stato (tabella sotto); niente rAF; con `prefers-reduced-motion` tutto fermo |
| Sguardo | anteprima dell'editor con il motore del kit | anteprima dell'editor: gli occhi seguono il puntatore |
| Determinismo | stesso seme → stessa forma | stesso seme → stessi parametri (mulberry32 dal FNV-1a del seme, come il kit) |

**Scelta dell'utente: l'orbe**, con due correzioni fatte subito dopo: **occhi più grandi** (tondi 27, pillola 20×40,
larga 34×22 in unità del viewBox, prima 21, 16×32, 27×18) e **animazioni di stato molto più visibili**, che muovono il
corpo stesso e non solo i segni intorno. Le ampiezze sono in unità del viewBox (250 = tutto il disco), per cui i
primi valori a 10–12 unità erano 3 px a 72 px e non si vedevano; ora:

| Stato | Che cosa fa l'orbe |
|---|---|
| lavoro | due battute di squash e stretch (1,14 × 0,88 ↔ 0,92 × 1,10, ±8°) poi una pausa, ciclo ≈ 4,3 s; lo sguardo scandisce da sinistra a destra (±16) nella stessa battuta |
| attesa | ogni 5,5 s un saltello (−28 in alto, poi un rimbalzo) con una scrollata del corpo (±14°); **occhi gialli** `#FCDC64` (terza richiesta dell'utente; il giallo è il terzo punto di interesse della palette) più grandi |
| errore | ogni 6 s un tremito (±16 con ±6°); il corpo resta un poco afflosciato (1,08 × 0,90, abbassato); gli occhi a X lampeggiano ogni 2,6 s |
| pianificato | il corpo scorre piano da un lato all'altro (±18, ±8°, ciclo ≈ 8 s) come chi aspetta; ogni ≈ 11 s lo sguardo va in alto a destra «a guardare l'orologio» e torna |
| libero | respiro profondo e lento (1,12 × 0,88 ↔ 0,96 × 1,04, ciclo ≈ 7,5 s), l'orbe si abbassa fino a 16; palpebre socchiuse; una «z» bianca ogni 3,5 s che sale dal volto verso l'alto a destra e svanisce |

Sempre, per tutti: respiro di base (4,5 %, 5–6,7 s), dondolio (−7), deriva dello sguardo (±9), battito delle palpebre
ogni 6–10 s. Fase e periodo restano dal seme. La prima versione aveva cicli di 2 s: l'utente li ha trovati troppo
frequenti, e i cicli sono stati allungati con pause (terza versione). Pellicola di sei secondi per stato (animazioni
messe in pausa a sei istanti): `screenshot/avatar-orbe-pellicola.png`.


### Versione 6: la pagina del Dipendente (2026-09-04, sessione successiva)

Brief dell'utente: «configurare un agente e capire se sta lavorando bene»; pubblico l'operatore, con una vista
sintetica leggibile anche dal titolare; contenuto: identità e mansione, soul prompt con cronologia e confronto fra
versioni, modello e criterio di scelta automatica, strumenti e connessioni, budget e permessi, eval («colloquio»),
metriche (task completati, costo per esito utile, quanto spesso un umano corregge, quante proposte respinte); la parte
più importante è la **revisione di performance**, che «deve sembrare una decisione gestionale seria, con evidenze, non
una notifica». Struttura costruita (variante A della proposta, con le quattro aggiunte: le richieste come fonte delle
metriche, la revisione come richiesta al titolare, pausa e «ripeti il colloquio», un solo ordine per i due pubblici):

| # | Sezione | Che cosa c'è |
|---|---|---|
| 0 | Cornice | titolo = etichetta in maiuscolo (36 px oltre 12 caratteri, 30 oltre 20), i tre numeri di oggi del dipendente (task oggi, da approvare, spesi oggi), indietro → il suo dipartimento, rail con l'organizzazione attiva. Niente pillola «Nuovo …»: le azioni stanno nella testata |
| 1 | Testata | avatar 96 che segue il puntatore; etichetta 28 e «ruolo · dipartimento · in produzione dal»; chip di stato, «Revisione in sospeso», «Soul prompt v7», modello, «Colloquio 91»; pillole **Modifica** (tendina Dipendente), **Metti in pausa / Riattiva**, **Ripeti il colloquio**; la mansione in una frase; i **quattro numeri a 30 giorni** (task completati, € per esito utile, corretti da un umano %, proposte respinte %) con il badge del confronto con i 30 precedenti (la freccia dice il verso, il colore se è un bene); la riga «fonte: le richieste decise dal titolare» |
| 2 | Revisione di performance | quando ce n'è una in sospeso, **card lime a tutta larghezza** con intaglio (campanella, apri il dossier): chip (tipo, da → a, proposta quando, «decide il titolare»); titolo della proposta a 26 px; tre colonne **Perché** (evidenze: numero in pillola + frase, con il collegamento alla richiesta citata), **Cosa ci aspettiamo** (stime dalla prova), **Rischi** + **La prova** (esecuzioni, costo, giorni); riga «Decisione del titolare»: **Prova su 20 esecuzioni** (nera), **Applica** (bianca), **Chiedi modifiche**, **Rifiuta…** (rosa, motivo obbligatorio) e il link al dossier. Sotto, **Revisioni passate**: quando, tipo, titolo, effetto misurato con badge, esito, chi ha deciso |
| 3 | Oggi | la card esecuzione (o l'ultima consegna: da approvare / conclusa) e le richieste di oggi come righe dello storico |
| 4 | Rendimento | cinque righe (approvate al primo colpo, corrette da un umano, respinte, spesa e costo per esito utile, tempo medio) con il valore dei 30 giorni precedenti e il badge; «Le ultime richieste decise dal titolare, la fonte dei numeri» e il link a Richieste filtrate sul dipendente |
| 5 | Mansione e soul prompt | il documento chiaro (`#F4F4F4`, r28, intaglio con matita e confronta) con la versione corrente, chi e quando, i paragrafi, i numeri di quella versione; a destra le **versioni** come righe (proposta = lime, corrente = bianca; nota, chi, data, task, % corretti, % respinte, € per esito) con «confronta» per ciascuna; pillola «Confronta v6 e v7» |
| 6 | Modello | tre card (Rapido, Standard, Esperto: descrizione, esecuzioni a 30 giorni, costo; l'assegnato è bianco; clic per assegnare) e la card del **criterio di scelta automatica** scritto come regola, con la ripartizione delle esecuzioni a pillola e la legenda; pillole «Scelta automatica / Solo il modello assegnato» |
| 7 | Strumenti e connessioni | card come le regole di approvazione (ultimo uso, chip attivo/spento; clic accende o spegne) e le connessioni come righe (stato, ultimo uso, «Rinnova» se scaduta) |
| 8 | Budget e permessi | card budget (speso su mensile, barra a pillola, rimanente; oggi su limite del giorno: **lime con «oltre il limite»** se sforato) e i permessi come righe: le regole generali con le **eccezioni** del dipendente, più «Aggiungi un'eccezione» |
| 9 | Colloquio | card esito (punteggio su 100, barra, casi superati, soglia, «vale per v7»), i casi come righe (caso, atteso, esito, punteggio), i colloqui precedenti per versione o modello; «Ripeti il colloquio» (poi «in corso · 0 di 12 casi») |

**La tendina estesa delle versioni** (`tendinaVersioni`, 840 px, fino a 980 di altezza se lo schermo lo permette) è
il dossier: due colonne bianche con le due versioni e le **differenze per paragrafo e per parola** (aggiunte in lime,
tolte in rosa barrato, paragrafi cambiati su fondo grigio), i numeri di ciascuna versione, tre card chiare Perché /
Cosa ci aspettiamo / Rischi e le decisioni; con «Rifiuta…» compare il campo del motivo (obbligatorio: senza, il bordo
diventa rosso e non si rifiuta; Invio conferma). Per una revisione del **modello** le due colonne sono i due modelli
(descrizione, costo per esecuzione, esecuzioni e costo a 30 giorni). La stessa tendina serve al confronto libero fra
due versioni (`?confronto=6,7`), senza evidenze e con «Chiudi».

**La revisione è una richiesta al titolare**: in `dati.js` le due revisioni in sospeso (`rv1`: Nora, prompt v7 → v8;
`rv2`: Social media manager, modello Standard → Esperto) sono richieste di tipo `revisione` (icona fulmine) con
`revisione` = id nel dossier: stanno nella coda della tendina «Da approvare» (ora 4), nella pagina Richieste (filtro
«Revisioni») e nello storico; dalla tendina estesa si apre il dossier. Le decisioni valgono ovunque: **Prova** =
approvata con nota «Prova su 20 esecuzioni» e stato «In prova»; **Applica** = la versione proposta diventa corrente
(o il modello assegnato); **Chiedi modifiche**; **Rifiuta** con motivo, che resta nella cronologia. La X rapida della
coda su una revisione apre il dossier con il campo del motivo invece di rifiutare al volo.

**Dati** (`dati.js`, `m.dossierDi(e)`): dossier scritto a mano per Nora (8 versioni del prompt, 12 casi di colloquio,
4 revisioni) e per il Social media manager (revisione del modello con la prova di luglio); generato dal seme del ruolo
per gli altri nove, per i 40 e per i dipendenti creati nell'editor (prompt per dipartimento, 8 casi, una revisione
passata). I numeri a 30 giorni sono coerenti fra loro (corretti = con modifiche / task; costo per esito utile = spesa /
consegne accettate anche dopo modifiche) e con le richieste del dipendente nel modello (r12 «Troppo lungo: massimo
800 battute» è la prima evidenza della revisione di Nora; r7 e r13 quelle del Social media manager). Modelli come
livelli neutri di DGT (**Rapido**, **Standard**, **Esperto**): nessun marchio di terzi. `m.decidiRevisione(r, esito,
motivo)` applica la decisione al dossier.

**Interazioni**: freccia nell'intaglio della card e della riga compatta → pagina (`?pagina=dipendente&id=4`);
Modifica → tendina Dipendente; pausa (chip «In pausa», avatar a riposo); Ripeti il colloquio; assegna un modello;
scelta automatica sì/no; accendi/spegni uno strumento; confronta due versioni; apri il dossier; le quattro decisioni;
il link alle richieste del dipendente (Richieste filtrate su di lui); indietro → dipartimento. Prova cliccata con
Playwright, 27 passi: apertura dalla card, dossier con differenze, rifiuto bloccato senza motivo e poi con motivo in
cronologia, coda che scende, pausa e riattivazione, colloquio in corso, confronto v6/v7, assegnazione di Esperto,
strumento spento, Richieste filtrate, prova su 20 dal Social media manager, applicazione dalla tendina della home
(v8 corrente), pagina a 40, pagina di un dipendente appena creato, riga compatta → pagina, indietro → dipartimento;
nessun errore in console. Screenshot: `a-dipendente.png` (Nora), `a-dipendente-ruolo.png` (Social media manager,
senza nome), `a-dipendente-dossier.png` (il dossier v7 → v8), `a-dipendente-confronto.png` (v6 e v7).

### Versione 5c: niente segni dietro l'avatar (2026-09-04, sessione successiva)

Richiesta dell'utente: «togliere le animazioni dietro gli avatar, le animazioni degli avatar non le devi toccare».
Tolti da `avatar-orbe.js` i due segni animati **dietro il corpo**: l'arco che orbitava al lavoro (`.giro`, keyframe
`av-giro`) e le due onde che si allargavano da approvare (`.onda`, `av-onda`), con il loro CSS. Restano intatte tutte
le animazioni dell'avatar stesso: respiro, dondolio, deriva dello sguardo, battito delle palpebre e i moti di stato del
corpo e degli occhi della tabella sopra; le «z» del sonno stanno sopra il volto, non dietro, e restano. Lo stato «al
lavoro» si legge ora solo dagli occhi lime e dallo squash e stretch, «da approvare» dagli occhi gialli e dal saltello.
Il kit (`?avatar=kit`) non è toccato. Pellicola rifatta (`screenshot/avatar-orbe-pellicola.png`), screenshot della
Console e del confronto rigenerati. Prova con Playwright: 37 orbi nella home, nessun nodo `.giro`/`.onda`, i corpi
cambiano trasformazione fra due fotogrammi, nessun errore in console.

Pagina di confronto `confronto-avatar.html` (artefatto: https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526):
undici ruoli per cinque stati, le card dei dipendenti, le card al lavoro (animate), le righe compatte, misure e fondi,
per entrambe le famiglie. Screenshot: `avatar-confronto.png`, `a-11.png` (orbe), `a-11-avatar-kit.png` (kit).
Prova con Playwright: 41 orbi in pagina, il corpo respira (la trasformazione cambia fra due fotogrammi), l'anteprima
segue il puntatore, creazione e scelta del seme funzionano, nessun errore in console.

### Versione 7: l'orbe senza disco, le pelli (2026-09-04, sessione successiva)

Richiesta dell'utente: «Non mi piace che l'avatar sembri un'icona animata. Deve essere un avatar, senza quel contorno
bianco. Di conseguenza potrebbero essere poco visibili per via del colore dell'avatar e dello sfondo: dammi più
soluzioni per risolvere e rendere la vista dell'avatar più bella e coerente. Vale per tutte le pagine, oltre che per
la pagina Dipendente.»

Diagnosi: il disco chiaro `#E4E4E4` con il corpo nero dentro ha la forma dei pulsanti rotondi bianchi della Console
(cerchio chiaro con un segno nero), per cui l'avatar si legge come un'icona; l'anello bianco delle coppie impilate
lo rafforza. Tolto il disco, il corpo nero sparisce sul nero della pagina e delle card scure. Quattro soluzioni,
costruite come **pelli** dell'orbe (`avatar-orbe.js`: solo variabili CSS ereditate da `[data-pelle]`, il disegno
non cambia; `DGT_AVATAR.pelle(nome)`, nelle pagine `?pelle=chiaro|perla|grigio|alone|disco`), confrontate nella
pagina `avatar-pelli.html` (artefatto https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569) su
tutti i fondi della Console (nero, card scura, card grigia, card lime, pillola bianca, tendina chiara) per cinque
stati, nelle misure (96 … 26 e impilati) e nelle viste vere (card al lavoro animate, barra «Oggi in azienda», card
dei dipendenti, righe compatte con la tendina, testata del Dipendente), con «Prova nella Console» che cambia la
pelle in tutta la pagina.

| Pelle | Che cos'è | Per | Contro |
|---|---|---|---|
| **Chiaro** (predefinita) | corpo chiaro `#E4E4E4` con occhi neri, come un'orbe di ceramica: orlo scuro sottile, riflesso forte; sulle superfici chiare e lime si inverte da solo in perla nera con gli occhi bianchi; gli occhi di stato (lime, gialli, rosa) tengono il colore con un contorno nero | la più visibile e la più «avatar» sul nero; è l'orbe di riferimento (sfera chiara sul nero); sta con le pillole bianche della Console | due corpi (chiaro sul nero, nero sul chiaro): l'avatar cambia colore fra card e pillola, come fanno i pulsanti rotondi |
| Perla nera | corpo nero lucido con la luce in alto a sinistra, un orlo di luce riflessa e l'ombra in basso: sul nero si vede per il volume, non per un contorno | un solo colore di corpo ovunque; gli occhi colorati restano il segnale; è l'orbe della modalità voce, nero lucido | sulle card scure si legge dal volume e dagli occhi, non dalla sagoma: a 26–28 px è la più discreta |
| Grigio | corpo nel grigio delle card `#4D4D4D` con lo stesso volume | si stacca da ogni fondo senza trucchi; un solo colore; il grigio è già nella palette | sulla card grigia si confonde; è la meno «viva», sembra un robot di plastica |
| Alone | corpo nero come prima, ma al posto del disco un alone morbido di luce dietro l'orbe | il passo più piccolo dal disco: stesso corpo, il fondo resta nero, niente bordo netto | l'alone è comunque un campo chiaro dietro l'avatar: a 48 px torna a somigliare a un disco sfumato |
| Disco (prima) | la versione precedente, tenuta solo per il confronto | — | il disco chiaro con il corpo dentro ha la forma dei pulsanti rotondi: sembra un'icona |

**Scelta fatta in sessione: chiaro** (da confermare dall'utente): la più vicina all'orbe di riferimento e la più
visibile sul nero. Che cosa è cambiato nella Console: `.av` senza fondo, senza ritaglio e senza bordo per gli orbi,
l'SVG disegnato al 115 % del riquadro; l'**inversione di contesto** in `direzione-a.js`: sulle superfici chiare e
lime (card lime, selettore bianco delle card attività, coda della tendina, barra agenda, righe in attesa, righe
delle versioni, tendine, documento del prompt, pillole attive, card del modello assegnato) l'orbe prende le variabili
`--av-inv-*` della pelle e diventa perla nera con occhi bianchi; sui selettori delle card grigie e scure e sulle card
scure dentro le tendine torna chiaro. Le coppie e gli avatar impilati si sovrappongono di 6 px con l'anello
trasparente (l'anello bianco del sistema resta solo per le iniziali del titolare). Il kit (`?avatar=kit`) tiene il
disco. Screenshot della Console rigenerati; pellicola `avatar-orbe-pellicola.png` e confronto `avatar-confronto.png`
rifatti con la pelle chiara; `avatar-pelli.png` la pagina delle pelli. Prova con Playwright: pelle predefinita chiaro,
nessun disco dietro gli orbi, corpo chiaro sulla card scura e perla sulla card lime, occhi lime al lavoro, occhi neri
da pianificato e libero, corpo che si muove fra due fotogrammi, anello degli impilati trasparente, `?pelle=disco`
rimette il disco, il selettore della pagina delle pelli cambia la Console, nessun errore in console.

### Versione 7b: perla, corpi tondi, moti fluidi (2026-09-04, stessa sessione, seconda tornata)

Giudizio dell'utente sulla versione 7: «Chiaro non va bene. Poi vorrei renderli tondi e meno ovali. E le animazioni
non mi piacciono, sono scadenti e poco fluide». Tre correzioni, tutte in `avatar-orbe.js` (sesta versione del file):

1. **Pelle perla** predefinita: il nero lucido dell'orbe di riferimento, un solo colore su ogni fondo. Per vederlo sul
   nero della Console il volume è più deciso: gradiente fra i neri della palette (`#7A7A7A` in alto a sinistra →
   `#050505`), riflesso morbido in alto a sinistra (gradiente radiale, niente filtri), luce riflessa in basso, orlo di
   luce lungo il bordo (4 unità, bianco `.85` → `.06` → `.34`) e un bagliore di 9 unità appena fuori dal corpo (un
   anello di gradiente, non l'alone largo). La pelle «chiaro» resta nella pagina delle pelli come scartata; la Console
   non la usa più (`?pelle=chiaro` la rimette per il confronto).
2. **Corpi tondi**: il corpo è un `<circle>` di raggio 95–100 su 125, dal seme. Via la superellisse, il rapporto,
   l'inclinazione e il rigonfiamento; via lo squash e stretch. Un dipendente si distingue dagli **occhi** (tondi,
   pillola alta o pillola larga; distanza e altezza) e dalla posizione del riflesso.
3. **Moti fluidi**: via tutti i keyframe CSS (saltelli, tremiti, scrollate, «z»). Un solo `requestAnimationFrame` per
   pagina muove gli orbi con **funzioni continue del tempo**: seni, rumore periodico (tre armoniche) e finestre
   morbide sin² per i gesti che si ripetono, così nessun movimento parte o finisce di scatto. Base per tutti: respiro
   (scala uniforme ±1,6 %, 4,6–6,2 s dal seme), galleggiamento (±2), deriva dello sguardo con **proiezione sferica**
   (l'occhio che va verso il bordo si stringe: è questo che dà volume alla sfera), battito delle palpebre con easing
   (chiusura svelta, riapertura più lenta, ogni 2,8–7 s, a volte doppio). Per stato, un solo moto quieto:

   | Stato | Che cosa fa l'orbe |
   |---|---|
   | lavoro | occhi lime; lo sguardo scandisce piano da un lato all'altro (3,4 s); respiro un poco più svelto |
   | attesa | occhi gialli più grandi; ogni ~6 s si solleva di 7 e guarda in alto verso il titolare per 1,9 s, poi torna |
   | errore | X rosa che pulsano piano (2,6 s); sta 4 più in basso e appena più piccolo; ogni ~7,5 s scuote la testa lentamente (±4,5°, due oscillazioni in 1,6 s) |
   | pianificato | dondola da un lato all'altro (±5, ±2,5°, 7,2 s); ogni ~10 s guarda in alto a destra «l'orologio» per 2 s |
   | libero | palpebre socchiuse (32 %), respiro profondo e lento (±2,6 %, ~7,5 s), sta 5 più in basso; niente «z» |

   Ogni orbe che entra nella pagina si registra da solo (`MutationObserver`), anche dentro le tendine e dopo un
   clic; si aggiornano solo quelli nel viewport (`IntersectionObserver`); con la scheda nascosta il motore si ferma;
   con `prefers-reduced-motion` gli orbi restano nella posa di riposo (è quella degli screenshot). L'anteprima
   dell'editor segue il puntatore con inseguimento morbido. `DGT_AVATAR_ORBE.fermo(t)`, `riprendi()` e
   `fotogramma(svg, t)` fermano il motore a un istante: servono alla pellicola.

Prova con Playwright (`reducedMotion: no-preference`), 22 verifiche: pelle predefinita perla, 39 orbi tutti registrati,
corpo `<circle>`, occhi e corpo che cambiano fra due fotogrammi, **salto massimo per frame 0,17 unità** su dodici frame
(continuità), nessun keyframe residuo, nessun disco, palpebre socchiuse da libero, pagina Esecuzione e orbi nuovi
dopo un'azione registrati, anteprima che segue il puntatore, 94 orbi vivi a 40, `?pelle=disco`, kit intatto, pagina
delle pelli (273 orbi, perla segnata, niente scorrimento), confronto kit/orbe, reduced motion fermo; nessun errore in
console. Pellicola `screenshot/avatar-orbe-pellicola.png` (Copywriter, cinque stati a 0…5 s con `fotogramma`).

### Versione 7c: gli occhi del kit (2026-09-04, stessa sessione, terza tornata)

Giudizio dell'utente sulla 7b: «Così già meglio, però preferivo gli occhi del kit di riferimento, nel quale hanno occhi
più grossi e i movimenti degli occhi più carini». Gli occhi dell'orbe sono ora quelli del kit (`vendor-avatars`,
`gaze.js`), portati dentro `avatar-orbe.js` (settima versione del file); corpo, pelle e moti del corpo restano quelli
della 7b.

- **La pupilla del kit per seme**: `deriveRole(seme).pupil` decide la forma (tonda, quadrato morbido, anello), la
  stessa che il seme avrebbe nel kit; grande 0,16–0,185 del raggio (il kit 0,16; prima era 0,135), da approvare ×1,25
  (il kit 0,2), al lavoro 0,97 × 0,82 (il kit 0,155 × 0,13), da libero due fessure inclinate di ±8° (il kit
  0,145 × 0,02), in errore le X sopra le pupille.
- **Dipinte sulla sfera**: la stessa base tangente proiettata del kit. Le due pupille distano 15,5–19° dal centro
  della sfera (il kit 17°) e lo sguardo di riposo ha il mento appena basso (pitch −7…−2; il kit −6). Yaw, pitch e
  roll ruotano la testa: quando lo sguardo va di lato l'occhio lontano si stringe e si inclina da solo, il roll piega
  la testa. È questo che rende i movimenti «carini»: gli occhi non scivolano sul disco, la testa gira.
- **Lo stesso repertorio di moti del kit**: deriva dello sguardo a due armoniche (yaw ±6,2°, pitch ±4,7°, roll
  ±1,6°); scansione ±13° in 1,8 s al lavoro con la deriva al 35 %; sguardo fisso e occhi grandi da approvare (deriva
  al 20 %); dondolio ±3,5° da fermo; ±2° con le fessure da libero; niente deriva né battito in errore e da libero. Il
  battito è lo schiacciamento verticale della pupilla attorno al suo centro (0,08 da chiusa), come nel kit. Il
  puntatore ruota la testa (±30° yaw, ±24° pitch) con inseguimento morbido. I gesti di stato della 7b (sollevamento
  con lo sguardo in alto da approvare, scossa in errore, dondolio e sguardo all'orologio da pianificato) restano e ora
  agiscono sullo sguardo in gradi.

Prova con Playwright, 24 verifiche (le 22 di prima più «pupille del kit: tonde, quadrate, X» e «pupilla grande: raggio
14,1 unità»), continuità 1,33 unità per frame (la scansione al lavoro è più svelta), nessun errore in console.
Pellicola `screenshot/avatar-orbe-pellicola.png` e screenshot rigenerati.

### Versione 8: la pagina dell'Esecuzione (2026-09-04, stessa sessione)

Richiesta dell'utente: la pagina dell'esecuzione (passi, log, output) dal pulsante «occhio» delle card al lavoro,
struttura proposta in poche righe e poi costruita. Domanda a cui risponde: **a che punto è, cosa sta facendo adesso,
cosa ha prodotto, quanto è costato, e cosa posso fare io** (fermarla, correggerla, approvare). Stessa cornice,
stessi componenti: la barra dei passi è la barra agenda del sistema, i passi e il log sono righe, gli output card
lead, il costo una card attività.

| # | Sezione | Che cosa c'è |
|---|---|---|
| 0 | Cornice | titolo = titolo dell'esecuzione in maiuscolo; tre numeri: **passi fatti** su totale, **spesi** (badge «oltre» se sopra il limite del giorno), **tempo** («da 10:20» al lavoro, «fermo dalle» in errore, «parte alle» se pianificata, «in tutto» se conclusa); indietro → la pagina del dipendente; rail con la home attiva |
| 1 | Testata | avatar 68 animato (a riposo se in pausa), etichetta e «ruolo · dipartimento»; chip: stato, «Passo n di N», modello del passo in corso, cliente, obiettivo (apre il dipartimento); la frase **«Adesso … Prossimo …»** che cambia per stato (in pausa, al lavoro, fermo per errore, parte alle, consegnato e aspetta il titolare, concluso); le **azioni per stato**: al lavoro = Metti in pausa · Interrompi · Scrivi a … · La pagina di …; in pausa = Riprendi · Interrompi; errore = **Riprova il passo n** (lime) · Rinnova la connessione · Interrompi; pianificata = **Avvia ora** (lime) · Sposta; da approvare = **Apri la richiesta** (lime) · Scrivi; conclusa = Ripeti; la **barra dei passi**: la barra agenda ferma nella testata, i passi fatti sono eventi bianchi con il numero in un cerchio nero e la durata, il passo in corso è il segmento «adesso» verde profondo con il marcatore dell'ora, i passi da fare sono eventi traslucidi con la stima, il passo in errore è rosa; in fondo la pillola con la stima di fine |
| 2 | Passi | righe con il cerchio 40 (spunta se fatto, play se in corso, avviso se in errore, numero se da fare), nome ed esito (o gli strumenti), chip di stato, tempi («10:20 → 10:24» con la durata; «da 10:24» con il tempo trascorso per quello in corso; «≈ 6 min» per quelli da fare), modello, costo («≈» se stimato); la riga in corso è lime, quella in errore grigia, quelle da fare al 60 % |
| 3 | Log | le voci dall'ultima alla prima: ora, chip del tipo (Passo, Strumento, Modello, Nota, **Richiesta** lime, **Errore** rosa, **Titolare** nera), testo con «passo n», costo; **filtri funzionanti** con i conteggi (Tutto, Passi, Strumenti, Richieste, Errori, Note); le voci di tipo richiesta aprono la tendina estesa; in fondo la **barra di scrittura** (la barra chat del riferimento: pillola bianca con l'avatar, campo, pulsante nero) per una nota del titolare al passo in corso, che entra nel log come voce «Titolare» (Invio o pulsante) |
| 4 | Output | card lead 224 con l'icona del tipo (post, documento, lista, immagine, codice, proposta), nome, descrizione, stato e quando: **da approvare** lime con la campanella (apre la richiesta), bozza ed errore grigie, da fare spenta; sotto, **Consegne precedenti della serie** come righe dello storico con l'esito del titolare e il link a Richieste filtrate sul dipendente |
| 5 | Costo | card «Costo dell'esecuzione» (finora su stimato a fine, ripartizione per modello a pillola con legenda, «oggi su limite del giorno» → budget e permessi; **lime con «oltre il limite»** se sforato, scura altrimenti) e gli **strumenti** come righe (chiamate, Usato / Non usato / Errore, in quali passi, costo) |

**Dati** (`dati.js`, `m.esecuzioneDi(e)`): sei esecuzioni scritte a mano per gli undici, una per stato: Nora (post
5 di 12, passo 2 di 4, con il post 4 in attesa del titolare come output e la nota del brief nel log), Sviluppatore
full-stack (checkout, passo 3 di 7), Ricerca lead (passo 5 di 6), **Kim** (deploy fermo al passo 3 con l'errore di
connessione nel log e lo strumento in errore), Social media manager (piano editoriale concluso e da approvare),
Tester QA (pianificata alle 15:00: passi tutti da fare con le stime); generate dal seme per gli altri, per i 40 e
per i dipendenti creati nell'editor (passi per dipartimento, costo ripartito, stima dei passi da fare dal costo medio
di quelli fatti). Ogni esecuzione: obiettivo, serie (le richieste precedenti della stessa serie), passi (stato, tempi,
costo, modello, strumenti, esito), log (ora, tipo, testo, passo, costo, richiesta), output, strumenti usati. La card
esecuzione della home e del dipartimento e la pagina leggono lo stesso oggetto, per cui le azioni valgono ovunque.

**Interazioni**: occhio e freccia delle card al lavoro (home, dipartimento, pagina del Dipendente), play della card in
errore o pianificata (riprova / avvia senza aprire la pagina), freccia e occhio della card «ultima consegna» → pagina
(`?pagina=esecuzione&id=4`); pausa e riprendi (chip «In pausa», voce nel log, avatar a riposo); interrompi (il passo
in corso torna da fare con l'esito «Interrotto dal titolare», il dipendente diventa libero, «al lavoro» scende nella
home); riprova (Kim riparte dal passo 3); avvia ora (Tester parte dal passo 1); nota del titolare nel log; filtri del
log; apri la richiesta dal log e dall'output; obiettivo → dipartimento; «La pagina di …» e «Budget e permessi» →
pagina del Dipendente; indietro → dipendente. Prova con Playwright, 22 verifiche: apertura dall'occhio, titolo, barra
con il segmento adesso, quattro righe di passi, pausa e ripresa con le voci nel log, filtro Strumenti, nota del
titolare in testa al log, output da approvare → tendina estesa, interruzione (frase «Concluso», al lavoro da 3 a 2),
indietro → dipendente, dalla card di Oggi alla pagina, Kim fermo con il passo in errore nella barra e riprova, Tester
avvia ora, Social consegnato con la pillola finale e «Apri la richiesta», riprova dalla card del dipartimento,
esecuzione generata a 40; nessun errore in console. Screenshot: `a-esecuzione.png` (Nora al lavoro),
`a-esecuzione-errore.png` (Kim), `a-esecuzione-attesa.png` (Social media manager, da approvare).

### Versione 9: la cornice sugli schermi grandi, le card, niente emoji (2026-09-04, stessa sessione)

Quattro correzioni dell'utente sulle schermate viste da uno schermo largo, più una regola nuova.

1. **Le tendine e le pillole fisse «spostate»**. Causa: la Console era larga 1440 px fissi, allineata a sinistra, e sotto
   i 1440 si riduceva con `transform: scale()`; le tendine e le pillole chiuse sono `position: fixed` e su uno schermo
   più largo restavano al bordo dello schermo mentre il contenuto finiva a 1440 (uno spazio nero in mezzo), e sotto un
   antenato trasformato scorrevano con la pagina invece di restare fisse. Soluzione, insieme al punto 2: la Console
   riempie sempre la larghezza, quindi il bordo del contenuto e il bordo dello schermo coincidono.
2. **Sugli schermi grandi tutto si ingrandisce**: `scala()` in `direzione-a.html` applica `zoom = larghezza / 1440` alla
   radice, in su e in giù (prima solo in giù). Con `zoom`, a differenza di `transform`, gli elementi fissi restano
   fissi e al bordo; i `100vh` delle tendine si dividono per la variabile `--z` (sotto zoom i `vh` non si riducono da
   soli: verificato in Chromium 141). Gli screenshot a 1440 sono identici a prima; `screenshot/a-1920.png` mostra la
   pagina del Dipendente a 1920 × 1080: la Console riempie lo schermo e le pillole stanno al bordo.
3. **L'avatar ripetuto nella card del lavoro di un dipendente**: nel selettore di stato («Passo 3 di 7») c'era di nuovo
   l'avatar della striscia. Ora c'è un chip di stato lime «In corso», come nelle card in errore (chip rosa «Errore») e
   pianificate (chip con l'ora): la card ha un solo avatar. La pila di avatar resta nelle card con più dipendenti.
4. **Il «+1» sopra gli avatar nella card dell'obiettivo**: il badge non aveva uno stile e stava sotto la pila con margine
   negativo. Soluzioni considerate: (a) un badge a sé dopo la pila, con un piccolo spazio; (b) il conteggio nel testo
   («3 dipendenti · In corso»); (c) solo due avatar e il numero in un chip. Fatta la (a): `.pair .more` è un badge
   24 px a pillola (grigio `.16` sul nero, `.1` sul selettore bianco) dopo la pila, mai sotto; la (b) resta possibile
   se la riga si stringe.
5. **Niente emoji**: la fiamma delle pillole «Da approvare» e «In ritardo» (e «Cliente caldo», «Urgenti» nello specimen)
   è l'icona `i-fire`, disegnata nello sprite di DGT (`comune.js`; lo specimen ha il suo sprite). Regola fondamentale
   in `CLAUDE.md` e in `SYSTEM-DESIGN.md` (regola 16).

### Versione 10: l'identità degli orbi (2026-09-05, proposta in due tornate, in attesa di scelta)

**Prima tornata.** Richiesta dell'utente: «quando ci sono molti avatar vicini, o anche quelli piccoli messi in fila, non
rendono l'idea di diversi dipendenti che lavorano, perché sono tutti uguali; magari di diversi colori». Diagnosi: dalla
versione 7b l'orbe è una sola perla nera per tutti e l'identità sta negli occhi e nel riflesso, invisibili sotto i 36 px.
Quattro modi a confronto in `avatar-identita.html`: **perle colorate** (una tinta per dipendente, otto tinte scure,
assegnate a rotazione alla creazione), **tinta del dipartimento** (le quattro tinte già nel modello: indaco Sviluppo,
corallo Marketing, ambra Vendite, verdeacqua Amministrazione), **toni di perla** (quattro grigi, quasi indistinguibili
a 26 px) e il **carattere degli occhi** (intervalli più larghi per misura, distanza, altezza e forma delle pupille del kit,
riflesso con misura e angolo propri). Scelta dell'utente: **perle colorate**.

**Seconda tornata.** «Va bene le perle colorate ma non mi piacciono i colori, li voglio più accesi e vivaci; gli occhi non
si vedono bene, vorrei ricreare gli occhi degli avatar di lilguy.net; forse è meglio tenere gli avatar piatti con un colore
unico senza l'effetto 3D; più opzioni e più varianti». Il riferimento (studiato dal widget del sito, ricostruito in
locale): dischi neri con due occhi enormi, circa un terzo del volto ciascuno, all'altezza del centro e distanti (i centri a
0,4 del raggio), il «bianco» dell'occhio in un colore vivo e la pupilla a contrasto (tonda, a fessura verticale, ovale),
forme tonde, ovali, a gatto (inclinate) e a ghianda, coppie anche asimmetriche; battito come schiacciamento verticale,
gli occhi scivolano verso lo sguardo. La pagina è diventata un **configuratore** con tre scelte indipendenti e nove strade
preimpostate:

| Scelta | Opzioni |
|---|---|
| Corpo (`finitura`) | **perla** (il volume di oggi: ombreggiatura, riflesso, luce riflessa, orlo e bagliore sopra il colore), **piatta** (disco di colore pieno), **orlo** (piatta con un orlo scuro sottile, per le superfici dello stesso colore) |
| Palette | **scura** (le perle scure della prima tornata), **vivace** (indaco `#6C6AFF`, corallo `#FF6A55`, ambra `#FFB52E`, verdeacqua `#2BD9B5`, prugna `#C66CFF`, petrolio `#3AB8FF`, bordeaux `#FF5BA6`, grigio `#5A5A5A`), **pastello** (le stesse otto, chiare e morbide) |
| Occhi | **kit** (le pupille di oggi), **punti** (le stesse, grandi il doppio e al centro, con un contorno sottile sui corpi colorati), **lilguy** («bianco» nel colore dello stato, pupilla nera, contorno sottile), **neri** (occhi neri, pupilla grande nel colore dello stato), **colorati** («bianco» nel colore del dipendente, pupilla nel colore dello stato: l'identità passa dagli occhi, il corpo resta nero) |
| Identità | tinta per dipendente (a rotazione, o scelta), tinta del dipartimento, nessuna |

Le nove strade: vivace piatto con occhi lilguy, neri o punti grandi; pastello piatto con lilguy; pastello con orlo e
occhi neri; vivace perla con lilguy; perla scura con lilguy; nero con occhi colorati (perla e piatto). In tutte lo
**stato resta negli occhi** (bianchi da fermo, lime al lavoro, gialli da approvare, rosa a X in errore, a fessura da
libero) e i moti sono quelli di sempre. Costo dichiarato: le palette vivace e pastello portano il colore in un sistema a
un solo accento; le tinte evitano lime, giallo e rosa.

**Come è fatto** (`avatar/avatar-orbe.js`, tutto opzionale e spento di default: la Console non cambia finché non si
sceglie): `TINTE` (otto tinte, tre palette), `PALETTE`, `FINITURE`, `OCCHI`, `IDENTITA`; `html(seme, stato, opz)` accetta
`identita`, `palette`, `finitura`, `occhi`, `carattere`, `tinta` (id o indice), `dip` (nome della tinta del dipartimento) e
stampa sull'SVG `data-modo`, `data-tinta`, `data-palette`, `data-finitura`, `data-occhi`, `data-dip`, `data-carattere`;
`aspetto({…}, radice)` imposta i predefiniti della pagina (`html[data-*]`) e applica subito palette, finitura e modo agli
orbi già disegnati (occhi e carattere cambiano il markup: valgono per gli orbi disegnati da lì in avanti). Il colore del
corpo nei modi con identità è `--av-base`: il cerchio `.pelle` diventa un colore pieno e sopra ci sta `.ombra`, la stessa
ombreggiatura della perla come gradiente bianco → nero trasparente (la finitura piatta la spegne insieme a luci, orlo e
bagliore). Gli occhi grandi sono `.occhio.lg` con `.sclera` (cerchio unitario o il tracciato della ghianda, con forma e
inclinazione dal seme) e `.pupilla` che il motore trasla verso lo sguardo; la geometria è piana (`posaPiana`), non sulla
sfera. `forma(seme)` estrae i parametri lilguy da un generatore a parte (`#lilguy`), così non cambiano con il carattere.
Pagina di confronto `avatar-identita.html` (`?identita=&palette=&corpo=&occhi=&carattere=`), artefatto
https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6. Screenshot: `screenshot/avatar-identita.png`.

**Terza tornata.** «Mi piacciono la 1 e la 8. Per la 8: occhi a X in errore, pupille grandi in ogni avatar, un dormiente
che si capisca. Per la 1: sclera sempre bianca e pupille sempre grandi». Fatto in entrambe: la pupilla è grande sempre
(0,6–0,7 dell'occhio, tonda o ovale piena, mai a fessura); da **libero** l'occhio è chiuso, una **palpebra ad arco** larga
quanto l'occhio nel colore della sclera (dello stato per gli occhi neri), con un lento cenno del capo oltre al respiro
profondo; con gli occhi **colorati** in errore la sclera sparisce e restano due **X rosa** grandi. Nello stile **lilguy** la
sclera è **sempre bianca** e lo stato passa alla pupilla: nera da fermo, lime al lavoro, gialla da approvare, X rosa in
errore, con un contorno sottile perché lime e giallo si leggano sul bianco (contorno anche alle pupille degli occhi
colorati). La tinta «grigio» delle palette vivace e pastello è più chiara (`#9E9E9E`, `#BEBEBE`), perché con gli occhi
colorati è il colore degli occhi sul nero. Le due opzioni riviste sono le strade 1 e 8 della pagina; **in attesa della
scelta finale**.

**Quarta tornata.** «In tutti gli stati di entrambe le scelte le pupille siano sempre nere; troveremo un modo diverso per
visualizzare lo stato». Fatto: negli stili lilguy e colorati la pupilla è nera in ogni stato, la X d'errore è nera dentro
la sclera (bianca o della tinta), le palpebre chiuse da libero restano. **Aperto: come mostrare lo stato** senza il colore
degli occhi. Candidati da proporre: (a) un punto di stato sul bordo della casella, come il punto rosso della campanella
(lime al lavoro, giallo da approvare, rosa in errore, nulla da fermo); (b) un anello sottile attorno all'avatar nel colore
dello stato; (c) solo le forme e i moti già presenti (X, palpebre, occhi più grandi, sguardo che scandisce) più i chip di
stato delle card, che è la regola scritta in `avatar-dgt.js`: «l'avatar sta sempre accanto all'etichetta e alla pillola di
stato, non porta informazione da solo».

**Quinta tornata.** «Per l'opzione 8 proviamo a mettere le pupille bianche». Fatto: nello stile colorati la pupilla è
bianca in ogni stato, X compresa; le palpebre chiuse restano nel colore della tinta.

**Sesta tornata.** «Proviamo invece a togliere le pupille all'opzione 8». Fatto: nello stile colorati l'occhio è una
forma piena nel colore del dipendente, senza pupilla; in errore l'occhio stesso è una X colorata (`.occhio.lg.x .segno`),
da libero la palpebra chiusa; la coppia scivola verso lo sguardo come nel widget del riferimento.

**Settima tornata: lo stato.** «Procediamo con lo stato: tre varianti, una come hai proposto tu, le altre con animazioni
premium dinamiche dell'avatar». Costruite come **segnale** opzionale dell'orbe (`SEGNALI`, `aspetto({ segnale })`,
`?segnale=`), sopra la strada 1, nella pagina di confronto (sezione «Tre varianti per lo stato», gruppo «Stato» nel
configuratore): **A · Punto**, un punto di stato sul bordo della casella in basso a destra (raggio 15 su 125, bordo nero di 4
che lo stacca dal disco e dalla card lime; lime al lavoro, giallo da approvare, rosa in errore, nulla da fermo e pianificato);
**B · Anello vivo**, un anello sottile a 13 unità dal disco nel colore dello stato, animato dal motore: al lavoro un arco lime
del 26 % (con un fondo nero di 9) gira a 70°/s; da approvare due onde gialle si allargano da +4 a +26 e svaniscono ogni 2,2 s;
in errore un tratteggio rosa pulsa; pianificato un anello grigio di tacche gira a 12°/s; **C · Gesto**, niente segni: il corpo
dice lo stato con squash e stretch (`scale(sx sy)` su `.tutto`): al lavoro batte un ritmo a 0,5 s con lo sguardo che scandisce
e un cenno ogni 4 s; da approvare salta ogni 3,2 s (accovacciata, salto di 18 con stiramento, atterraggio e assestamento
smorzato) guardando in alto; in errore si sgonfia al 96 %, si inclina di 5° e sospira ogni 3,4 s; pianificato oscilla come un
pendolo (±9, ±9°); da libero dorme con il respiro profondo. Il segnale sta fuori da `.tutto` (non respira né salta con il
corpo). **Scelta dell'utente**: «punto come standard, ma per gli avatar piccoli delle card dei dipartimenti voglio gesto».
Portata nel prodotto: `direzione-a.html` imposta `segnale: 'punto'`; `pair()` in `direzione-a.js` (le pile: card dei dipartimenti
e degli obiettivi, coppie della barra agenda) passa `{ segnale: 'gesto' }` a ogni avatar impilato, perché i punti si
sovrapporrebbero ai vicini. `?segnale=nessuno|anello|gesto` per provare gli altri. `SYSTEM-DESIGN.md`: riga avatar e regola 19
aggiornate. Screenshot della Console rigenerati.

**Scelta dell'utente: la strada 1** («Scelgo la 1»): vivace piatto, occhi lilguy con sclera bianca e pupilla nera.
**Portata nel prodotto** nella stessa sessione: in `dati.js` la tinta è del dipendente (`e.tinta`; `m.tintaDi(e)` la dà, a
rotazione sull'id per i dipendenti del modello; `m.tintaLibera()` è la meno usata in azienda, che `aggiungi` assegna alla
creazione; `TINTE_ID` i nomi delle otto tinte); nell'editor del dipendente la riga **Colore** (otto cerchi pieni nella palette in
uso, il proposto con l'anello nero; `scelteTinta`, `bozza.tinta`); `av()` in `direzione-a.js` passa tinta e dipartimento a
`DGT_AVATAR.html`; `direzione-a.html` imposta l'aspetto con `DGT_AVATAR_ORBE.aspetto({ identita: 'tinta', palette: 'vivace',
finitura: 'piatta', occhi: 'lilguy' })`, con i parametri `?identita= ?palette= ?corpo= ?occhi= ?carattere=` per tornare
indietro o provare altro. Con il corpo piatto il disco riempie la casella (`--av-scala: 128%`) e gli avatar impilati riprendono
l'anello del fondo con 9 px di sovrapposizione. Screenshot della Console rigenerati; artefatto della Console a un indirizzo
nuovo, https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34 (il vecchio 93d18853 tiene la versione con la perla nera). `SYSTEM-DESIGN.md`: riga «Avatar del
dipendente AI» riscritta e regola 19. **Aperto**: come mostrare lo stato (vedi «Quarta tornata»).

### Versione 11: le approvazioni da mobile, prima metà (2026-09-05, sessione successiva)

Struttura proposta all'inizio della sessione precedente e accettata dall'utente («si procederà con le approvazioni da mobile
come proposto»). Il titolare approva dal telefono. Cornice mobile dello specimen (300 × 620, bezel nero r52, schermo r44,
barra di stato con l'ora dell'azienda, isola nera, segnale, rete e batteria), navigazione a pillola nera in basso con i quattro
cerchi del rail della Console (elenco, organizzazione, chat, agenda) e, al posto del cerchio lime del video, la **campanella
lime con il numero da approvare** (badge nero come il marcatore dell'ora). Tre schermate previste; **in questa sessione le prime
due**, per post, documento, lista e proposta, con il rifiuto con motivo.

1. **Da approvare** (fondo chiaro `#E0E0E0`, la schermata WORKSPACE dello specimen): riga con il logo DGT, il cerchio bianco dei
   filtri e le iniziali del titolare; titolo «DA APPROVARE» 30/36 come WORKSPACE; due numeri 26/300 con badge (da approvare con
   la campanella rosa, approvate oggi con la freccia lime; il terzo, «spesi oggi», non sta in 256 px e va nel Riepilogo); la
   **richiesta corrente come card lime** (la card attività a misura di telefono, r24: striscia con avatar 40, etichetta e
   dipartimento; intaglio con la campanella con il punto rosso e la freccia «apri»; icona del tipo in cerchio 48, titolo 20/24
   su due righe, cliente · ora; riga «Decidi» con il chip del tipo, costo e passi; sotto i **quattro cerchi della tendina della
   Console**: apri (occhio), commenta, approva nera, rifiuta rossa, con «1 di 2» in mezzo); **«In coda»** con il conteggio e le
   richieste come righe bianche 48 (`.qrow`, la corrente lime); in fondo la riga **«Riepilogo di oggi»** (cerchio nero con la
   bacchetta, inerte fino alla sessione successiva). La card, le righe e l'occhio aprono la richiesta; la spunta approva al
   volo; la X apre la richiesta con il campo del motivo già pronto: **il rifiuto vuole sempre un motivo**.
2. **Richiesta** (la tendina estesa in colonna, su fondo nero): indietro e le frecce che scorrono la coda con «1 di 2»; chip del
   tipo, del costo e dei passi; titolo 24/28; «chi · cliente · consegnata alle»; il **documento in una card bianca** r24 (chip
   dell'allegato, o «LinkedIn · bozza» per il post, cliente, testo 14/21; per il post il riquadro dell'immagine); **«Chi la
   propone»** (card scura r24: avatar 40, etichetta, dipartimento, consegnata alle, costo, passi a chip); **la nota del
   dipendente**; in basso la **barra fissa** con Approva lime larga, il cerchio della matita (Chiedi modifiche) e il cerchio
   rosso (Rifiuta), con una dissolvenza nera sopra. **Rifiuta** trasforma la barra: etichetta «Motivo del rifiuto,
   obbligatorio», campo a pillola bianca (bordo rosso se vuoto alla conferma, Invio conferma, Esc annulla), pillole «Rifiuta»
   rossa e «Annulla». Decisa una richiesta entra la successiva; a coda finita «Niente da approvare» (lo stato vuoto disegnato è
   della sessione successiva).
3. **Riepilogo di oggi**: sessione successiva.

Dove vive: `mobile.html` + `mobile.js` (`DGT_MOBILE`), stessi `comune.js`, `dati.js`, `avatar/` e i componenti della Console
(`DIREZIONE_A.css`, classi `.dirA`: `.rb`, `.pill`, `.chip`, `.av`, `.ncard`/`.nt`, `.task`, `.qrow`, `.badge`; da `direzione-a.js`
sono esportati `av`, `iconaTipo`, `nomeTipo`; le variabili della Console sono ridichiarate su `.m-page`). La **decisione sulla
richiesta** è passata da `monta` in `direzione-a.js` a `dati.js` come **`m.decidi(id, stato, commento, esitoRevisione)`** (la
Console la chiama per approva, modifiche, rifiuta, «approva tutte» e le revisioni): telefono e Console condividono lo stato. La
pagina mostra i due telefoni affiancati come lo specimen, cliccabili; i telefoni condividono il modello e la richiesta corrente:
la riga toccata su uno si apre sull'altro, la decisione presa su uno si vede su entrambi. Parametri: `?schermata=1|2` (un solo
telefono), `?richiesta=0` (indice nella coda), `?n=40`, e i parametri dell'avatar della Console. I telefoni sono 300 × 620 come
nello specimen; la pagina li mostra con `zoom: 1.25`. Gli avatar sono gli orbi della versione 10 con lo stesso aspetto della
Console (tinta, occhi lilguy, punto di stato: nella richiesta lo stato è sempre «da approvare», punto giallo); il titolare tiene
le iniziali su disco bianco. Icone `i-signal` e `i-wifi` aggiunte allo sprite di `comune.js` per la barra di stato (dallo
specimen). **Fuori dalla coda del telefono** le richieste di tipo `revisione` (`DGT_MOBILE.coda`): la campanella e i numeri del
telefono le escludono finché le due versioni a confronto non sono disegnate sul telefono (sessione successiva); la Console le
tiene (4 da approvare nella Console, 2 sul telefono).

Correzioni fatte costruendo: il chip del tipo è nella riga «Decidi» (nella riga cliente · ora sforava); con il campo del motivo
la barra delle azioni sforava di 18 px e il fuoco sull'input faceva scorrere lo schermo di lato (colonna `minmax(0,1fr)`,
«Rifiuta» al posto di «Conferma il rifiuto», `focus({ preventScroll: true })`; la prova cliccata controlla lo sforo orizzontale
di ogni schermo a ogni passo). A quaranta l'allegato generato segue il tipo (immagine, foglio, documento).

**Correzione dell'utente alla prima vista** («l'icona delle approvazioni ha lo stesso colore di alcune card e quando scorri capita
di non riuscire a distinguerla; invece di cambiare colore al pulsante, mettere lo sfondo sfocato e leggermente oscurato nella
parte bassa dove c'è la navbar»): sotto la navigazione una fascia di 112 px (`.m-navfondo`) con il contenuto che scorre
**sfocato** (`backdrop-filter: blur(14px)`) e **appena scurito** (nero al 16 %), con il bordo alto sfumato in 40 px
(`mask-image`), sotto la campanella e la pillola nera, che non cambiano. Il vetro sfocato è già nel sistema (i pulsanti «glass»
della videochiamata). La barra delle azioni della seconda schermata tiene la sua dissolvenza nera.

Screenshot: `screenshot/mobile.png` (la pagina), `mobile-1-da-approvare.png`, `mobile-1-coda.png` (scorsa alla coda),
`mobile-2-richiesta.png` (documento), `mobile-2-richiesta-post.png`, `mobile-2-rifiuto.png` (cornici catturate con
`design-system/tools/screenshot-elementi.js`, `SCALE=2 H=1100`, `CLICK` per il rifiuto, `EVAL` per lo scorrimento). Artefatto:
https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9. **Sessione successiva**: la schermata Riepilogo di oggi (anche come stato
vuoto, a coda finita), la revisione di performance sul telefono (le due versioni una sotto l'altra con le differenze e le
quattro decisioni; poi le revisioni entrano nella coda del telefono), la prova a quaranta, il giudizio dell'utente su queste due
schermate. (Fatto nella versione 12, sotto.)

### Versione 12: le approvazioni da mobile, seconda metà (2026-09-06, sessione successiva)

La seconda metà della struttura accettata: la terza schermata, la revisione di performance sul telefono, lo stato vuoto, la
prova a quaranta. La pagina mostra ora **tre telefoni** affiancati (Da approvare, Richiesta, Riepilogo di oggi), che condividono
il modello e la richiesta corrente.

1. **Riepilogo di oggi** (schermata 3, fondo `#F4F4F4`: il pannello Riepilogo dello specimen in colonna). Riga di navigazione con
   il cerchio «indietro» vuoto a bordo scuro (`olight`, come nella tendina chiara della Console) e a destra il **chip della data**
   («4 settembre», con il calendario: la data della barra agenda). Intestazione come il pannello dello specimen: **cerchio nero 44
   con la bacchetta** e «Riepilogo di oggi» 22/26; sotto, i **tre numeri della riga WORKSPACE** della Console (al lavoro, da
   approvare, spesi oggi, 26/300 con l'etichetta 12). Poi la **linea del tempo** dello specimen: colonna di 36 px con l'ora 11 e
   il **badge rotondo 22** (lime «mi piace» per la card delle consegne, nero con il mirino per l'obiettivo del mese; per le voci
   del diario lime con la campanella = consegna e richiesta di approvazione, nero con il triangolo = inizio, bianco con la
   spunta = passo, rosa con il triangolo = errore) e la linea `#C8C8C8` fra un badge e il seguente (un segmento per marcatore,
   non una linea unica: così si ferma da sola all'ultima voce); a destra la pila: la **card Consegne** (`.dcard` `#E4E4E4` r20 con
   l'intaglio del download: due miniature 96 con l'etichetta delle due consegne di oggi più recenti, «Approvate oggi», «Spesa di
   oggi»), la **card lime dell'obiettivo del mese** con la matita nell'intaglio (il testo 13/18 con le parti in 500, come nello
   specimen mobile), «Diario di oggi» con le **ultime cinque voci** (12/16, l'etichetta del dipendente in 500, righe separate da
   una linea `.08`). In fondo la **riga lime «Da approvare · N richieste in attesa»** che riporta alla prima schermata (bianca e
   «niente in attesa» a coda finita). La campanella e i quattro cerchi restano sotto, con la fascia sfocata.
2. **Lo stato vuoto**: a coda finita la prima schermata **prende il fondo del Riepilogo** (`#F4F4F4`) e mostra, sotto il titolo e
   i due numeri (0 da approvare, N approvate oggi), la **card bianca «Niente da approvare»** (cerchio nero 48 con la spunta,
   titolo 20/24, «Hai deciso tutto. Le prossime consegne arriveranno qui.» 13/18) e sotto il riepilogo di oggi (intestazione
   con la bacchetta e la linea del tempo, senza i tre numeri che stanno già sopra). Sul nero (schermata Richiesta a coda
   finita) la stessa card è scura con il cerchio bianco. Niente più riquadro tratteggiato.
3. **La revisione di performance sul telefono**: le richieste di tipo `revisione` **entrano nella coda** (`DGT_MOBILE.coda`
   senza filtro: la Console e il telefono contano le stesse richieste, 4 a 11). Nella prima schermata la card lime e le righe
   sono quelle di sempre (fulmine, «Revisione · 2 € · 3 passi», «Nova Studio · 10:30»; la spunta della card applica). Nella
   schermata Richiesta: chip «Revisione del soul prompt» / «Revisione del modello» e chip lime «decide il titolare»; **titolo
   corto** («Soul prompt v7 → v8» con la freccia legata; «Da Standard a Esperto»: il titolo lungo del modello a 24 px si
   troncava sulla seconda riga); «chi · dipartimento · proposta oggi 10:30». Poi **le due versioni una sotto l'altra** in card
   bianche r24: per il soul prompt il chip della versione (nero «v7 · in produzione», lime «v8 · proposta») e chi/quando, i
   paragrafi 13/19 con le **differenze della tendina delle versioni** (`A.differenze`, ora esportata da `direzione-a.js`:
   paragrafi tolti su rosa barrati, aggiunti su lime, cambiati su grigio `.045` con le parole in `mark`), tre righe di numeri
   (task, corretti · respinte, costo per esito utile); per il modello le due card con il chip del modello (nero «assegnato
   oggi», lime «proposto»), descrizione, costo, esecuzioni e costo in 30 giorni. Poi le **tre card scure** Perché / Cosa ci
   aspettiamo / Rischi con le evidenze del dossier (il numero in una pillola 22 sopra la frase 12/17: in colonna, perché in
   due colonne la frase restava su 150 px) e la riga della prova; **«Chi riguarda»** (avatar nello stato vero, proposta dal
   sistema, costo dell'analisi, passi a chip); **«Nota del sistema»**. La barra fissa ha **due righe**: sopra **«Prova su 20
   esecuzioni»** bianca larga (la strada sicura: la versione attuale resta in produzione), sotto **Applica** lime larga con la
   matita (chiedi modifiche) e la X rossa (rifiuta: il campo del motivo, come per le altre richieste; il segnaposto cambia).
   Le quattro decisioni passano da `m.decidi(id, stato, motivo, esito)` con esito prova / applicata / modifiche / rifiutata:
   quello che si decide qui si vede nella Console (dossier del dipendente, cronologia delle revisioni).
4. **La prova a quaranta** (`mobile.html?n=40`): 7 in coda, i tipi ruotano, i titoli lunghi delle righe si troncano con i puntini
   («Sequenza email di benve…»), la riga sotto si tronca dopo il cliente; il badge della campanella a due cifre (provato con «12»)
   resta una pillola. Il Riepilogo a quaranta: 12 al lavoro, 427 € spesi, le miniature delle due consegne più recenti, il diario
   generato (cinque voci). Nessuno sforo orizzontale in nessuna schermata, nessun errore di console.

**Correzione dell'utente alla prima vista** («ci sono componenti che si sovrappongono», con la cattura della campanella lime
della navigazione sopra l'ora e il badge della linea del tempo): l'ora e i badge rotondi della linea del tempo hanno
`z-index: 1` (serve perché la linea grigia passi dietro), e siccome il corpo che scorre non era un piano a sé finivano
**sopra** la barra in basso invece che sotto la fascia sfocata. Ora il corpo che scorre è un piano a sé
(`.m-scroll` con `position: relative` e `z-index: 0`: gli z-index di dentro restano dentro) e la fascia sfocata, la pillola
della navigazione, la dissolvenza e la barra delle azioni hanno uno z-index esplicito (2 e 3). La regola che ne esce: **la
barra in basso sta sempre sopra il contenuto che scorre**, e il contenuto le passa sotto sfocato.

Scelte fatte costruendo, da confermare: lo stato vuoto prende il fondo del Riepilogo (le `dcard` `#E4E4E4` sul chiaro `#E0E0E0`
non si vedrebbero); la data sta nella riga di navigazione e non nell'intestazione (con il chip accanto, «Riepilogo di oggi» a
22 px si troncava); i tre numeri sotto l'intestazione al posto di una riga di testo (andava a capo); la spunta della card di una
revisione applica al volo, come nella Console; la prova è la pillola bianca sopra l'applica; le miniature sono le due consegne di
oggi più recenti (in attesa o approvate) invece delle etichette fisse della Console; il diario mostra le ultime cinque voci, le
più recenti prima. Nel modello (`dati.js`) solo `azienda.scadenzaMese` («30 set») per il marcatore dell'obiettivo.

Screenshot (cornici con `screenshot-elementi.js`, `SCALE=2 H=1100`, `EVAL` per lo scorrimento e per approvare tutto): `mobile.png`
(la pagina con i tre telefoni), `mobile-1-da-approvare.png`, `mobile-1-coda.png`, `mobile-1-vuoto.png`, `mobile-1-vuoto-fondo.png`,
`mobile-2-richiesta.png`, `mobile-2-richiesta-post.png`, `mobile-2-rifiuto.png`, `mobile-2-revisione.png`,
`mobile-2-revisione-differenze.png`, `mobile-2-revisione-perche.png`, `mobile-2-revisione-modello.png`, `mobile-3-riepilogo.png`,
`mobile-3-riepilogo-fondo.png`, `mobile-40-coda.png`, `mobile-40-riepilogo.png`. Artefatto (stesso indirizzo, ripubblicato):
https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9. **L'utente non ha ancora giudicato nessuna delle tre
schermate** (solo la correzione della fascia sfocata, versione 11).

### Versione 13: la pagina dei Costi (2026-09-06, sessione successiva)

L'ultima pagina di prodotto della direzione A, costruita come da passaggio di consegne («Come riprendere», punti 3 e 4): stessa
cornice, titolo **COSTI**, tre numeri, cinque sezioni con le pillole del periodo. Domanda a cui risponde: **dove vanno i soldi
(dipartimento, dipendente, cliente, modello, strumento), oggi e nel mese, e se stiamo dentro il budget.** Nessun componente nuovo:
la card costo dell'esecuzione, le righe della spesa del mese, i badge del confronto, la vista compatta oltre sedici.

| # | Sezione | Che cosa c'è |
|---|---|---|
| 0 | Cornice | titolo COSTI; tre numeri: **spesi oggi** (`m.costoOggi`, lo stesso della home; badge rosa «oltre» se sopra la somma dei limiti del giorno, 124 su 115 € a 11), **in 30 giorni** (613 €; badge del confronto con i 30 precedenti, rosa se la spesa sale: +106 €), **restano di 1580 €** (quanto resta della somma dei budget del mese: 967 €; rosa «oltre» se negativo); niente pillola «Nuovo…» (come nelle pagine Dipendente ed Esecuzione: è una pagina che si legge); indietro → home; rail con il **sesto cerchio** (euro) attivo |
| 1 | Per dipartimento | quattro **card costo** (la card Costo dell'esecuzione, 316: quattro in fila fanno i 1312 della griglia): icona e nome del dipartimento, dipendenti; spesa del periodo con il limite («su 30 € al giorno», «di 320 € al mese», «dal 1 lug»); **ripartizione a pillola** per modello con la legenda a capo, o **per blocchi di tempo** da inizio anno (ultimi 30 giorni lime, 30 precedenti bianco, prima grigio); riga «Quota e consegne»: chip della quota sull'azienda, consegne approvate, occhio → pagina del Dipartimento. Nell'intaglio un solo pulsante (la striscia «chi» ha bisogno dello spazio: «Amministrazione» non si tronca): la freccia verso il dipartimento, oppure la **campanella con il punto** se oltre il limite, e allora la card è lime con la ripartizione nero / bianco / grigio |
| 2 | Per dipendente | righe 56 (`.crow.sp`) dal più caro: avatar 40, etichetta e «ruolo · dipartimento», un valore del periodo (oggi l'esecuzione con il passo o lo stato; nei 30 giorni il **costo per esito utile**; dalla creazione «dal 12 giu»), il **budget a barra** (8 px: del giorno per oggi, del mese altrimenti; rosa se oltre), la spesa con il **badge del confronto** con i 30 precedenti (oggi: «oltre» se sopra il limite del giorno), freccia → pagina del Dipendente; a 0 € la riga è spenta. **Oltre sedici** la vista compatta (regola 3): pillole a tre per riga con la spesa in un chip, lime chi è oltre il budget |
| 3 | Per cliente | le **righe della spesa del mese** del Dipartimento, sull'azienda: cliente, consegne approvate, spesa di oggi (oggi: quanti dipendenti), quota, spesa; la freccia apre **Richieste filtrate sul cliente**, solo se ne ha (Zenith a 11 spende solo in esecuzioni: freccia inerte). La stessa riga e lo stesso aggregatore ora anche nella pagina Dipartimento, con la pillola «Tutti i costi dell'azienda» a destra |
| 4 | Per modello | la **card costo dell'azienda** (517, la card Costo dell'esecuzione: totale su budget, ripartizione per modello, esecuzioni; riga «Oggi» sul limite del giorno con «nel limite» / «oltre il limite», freccia → Richieste per la regola «Spese sopra 50 €») e **tre righe**, una per modello: listino, esecuzioni (oggi: passi) con la quota, costo medio, costo totale. Periodi: oggi e 30 giorni (dalla creazione l'uso per modello non c'è nel modello) |
| 5 | Per strumento | righe per strumento sommate per nome dalle esecuzioni di oggi: chiamate ed esecuzioni, chip Usato / Errore, **pila** di chi lo ha usato (dal più caro, con il «+N»), costo, freccia → l'esecuzione di chi ha speso di più. Solo oggi: il modello non tiene lo storico degli strumenti |

**Da dove ci si arriva** (decisione presa costruendo, da confermare): il **sesto cerchio del rail** (euro, dopo il calendario:
i cinque di prima non cambiano posto); il numero **«spesi oggi»** cliccabile nella home, nel Dipartimento e nel Dipendente; la
pillola **«Tutti i costi dell'azienda»** a destra nella sezione «Spesa del mese» del Dipartimento e nella sezione «Costo»
dell'Esecuzione.

**I periodi** (scelta fatta costruendo, da confermare). Ogni sezione ha le sue pillole, **indipendenti** (cambiare il periodo di una
non tocca le altre; lo scorrimento resta dov'è), e offre solo i periodi che i suoi dati reggono: **Oggi** (le esecuzioni di oggi,
`e.att.costo`: lo stesso numero della home), **Ultimi 30 giorni** (il dossier del dipendente, `metriche.ora.spesa`, confrontato con
i 30 precedenti; è il predefinito, come nella sezione «Spesa del mese») e **Da inizio anno** (dalla creazione del dipendente, a
giugno: i 30 giorni, i 30 precedenti e le versioni del prompt più vecchie, task × costo per esito; per le consegne, task meno le
respinte). Niente «7 giorni», proposto nel passaggio di consegne: il modello non ha una spesa settimanale per dipendente (le
richieste sono un campione, non il registro, e a sette giorni avrebbero superato i 30). Per modello niente anno; per strumento solo
oggi (una pillola sola, accesa).

**L'aggregatore** (`m.costi(periodo, dip)` in `dati.js`, accanto a `costoOggi`): per dipendente, dipartimento, cliente, modello e
strumento, con totali, budget, limiti del giorno e consegne. **Per cliente la spesa (e le consegne) di ogni dipendente si ripartisce
fra i suoi clienti in proporzione alle richieste del periodo** (oggi: il cliente dell'esecuzione in corso; senza richieste il
cliente dell'ultima esecuzione, altrimenti Nova Studio), con un arrotondamento che tiene esatta la somma: così le quattro viste
sommano allo stesso totale (613 € a 11, 2154 € a 40), che è quello della testata. Prima la sezione «Spesa del mese» del
Dipartimento contava le sole richieste (233 € per tutta l'azienda contro i 613 € dei dossier): ora legge lo stesso aggregatore, per
cui i suoi numeri sono cambiati. Due correzioni di coerenza nei dati, necessarie perché la pagina mette i numeri uno accanto
all'altro: il **budget speso del Social media manager** era 140 € contro i 43 € di spesa dei 30 giorni (ora 43, anche nel testo
della revisione «+18 € al mese sul budget»); nei **dossier generati i costi per modello** ora ripartiscono la spesa dei 30 giorni
(prima erano numeri a sé e non tornavano con la spesa né con il budget).

**Prova cliccata** (Playwright, 48 verifiche, nessun errore di console, nessuno sforo orizzontale): sei cerchi nel rail e il sesto
attivo; i tre numeri; le quattro sezioni allo stesso totale; pillole per sezione con lo scorrimento che resta dov'era e i periodi
indipendenti; oggi 124 € (Sviluppo 42, Vendite 61), da inizio anno 1356 € con i blocchi di tempo; per dipendente oggi il primo è
Ricerca lead con «passo 5 di 6»; per modello oggi 17 passi e la card «Spesa di oggi», niente anno; la card Marketing → Dipartimento
con «Spesa del mese» = 135 € come nella card → «Tutti i costi» → Costi; riga del dipendente → pagina → «spesi oggi» → Costi; riga
cliente → Richieste con il filtro «Rossi Srl» attivo (Zenith inerte); home «spesi oggi» → Costi; riga «Ricerca web» → l'esecuzione
di Ricerca lead → «Tutti i costi» → Costi; indietro → home; approvare dalla tendina (il piano editoriale, primo in coda) lascia la
pagina e Madira Ink ha una consegna approvata oggi; a 40 la vista compatta (40 pillole, 427 € oggi, 2154 € in 30 giorni) e dalla
pillola alla pagina del dipendente; il telefono carica ancora la Console.

Screenshot: `a-costi.png` (la pagina a 11, tendina aperta), `a-costi-40.png`, `a-costi-testata.png`, e le sezioni a due volte
(`screenshot-elementi.js`, `SCALE=2 H=3200`, `CLICK` sulle pillole): `a-costi-dipartimenti.png`, `-dipartimenti-oggi`,
`-dipartimenti-anno`, `a-costi-dipendenti.png`, `-dipendenti-oggi`, `-dipendenti-anno`, `a-costi-clienti.png`, `-clienti-oggi`,
`-clienti-anno`, `a-costi-modelli.png`, `-modelli-oggi`, `a-costi-strumenti.png`. Artefatto della Console ripubblicato allo stesso
indirizzo: https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34. Alla vista delle schermate **l'utente ha detto
«bene»**, senza correzioni, e ha scelto la manutenzione come lavoro successivo (PR #10: https://github.com/av3rgfx/DGT-Design-2.0/pull/10).
La prova cliccata è nel repository: `prove/costi.js`.

### Versione 14: la manutenzione (2026-09-06, sessione successiva)

Nessuna pagina nuova e niente di visibile cambiato (con un'eccezione, sotto): i tre lavori scelti dall'utente a fine sessione
precedente (decisione 27), fatti con la regola «prima e dopo gli screenshot devono essere identici e le prove devono passare».

**1. I componenti della Console in `schermate/componenti.js`** (`window.DGT_COMPONENTI`, un'IIFE come gli altri file, niente
moduli ESM, gira da `file://` e nel file unico). Da `direzione-a.js` sono passati lì **il CSS delle primitive** e **le funzioni che
le stampano**; `direzione-a.js` le riprende con una sola riga (`const { av, pair, … } = window.DGT_COMPONENTI`) e tiene le pagine,
la cornice, le tendine e `monta`; `mobile.js` carica `componenti.js` **e non più la Console**.

| Dove | Che cosa |
|---|---|
| `componenti.js`, CSS | `.rb` (con il punto rosso), `.av` (misure, `.persona`, `.xl`), `.pair` (con il «+N»), l'inversione dell'orbe sulle superfici chiare **dei componenti** (card lime, selettore, riga della coda, riga in attesa, riga al lavoro, pillola accesa), `.pill` (con `.ink`), `.chip`, `.dots`, `.badge` (con `.flat`), `.ncard` / `.nt` / `.who`, `.lead` (dipartimento, dipendente, «aggiungi», il valore nel piede), `.task` (attività e richiesta: selettore, `.prog`, `.next`, l'unità nel titolo), `.crow` (con `.spenta`, `.add`, la pila nel valore), `.erow`, `.hrow` (la base), `.qrow`, `.dcard` / `.thumbs` / `.thumb` / `.goal` / `.kv`, `.ripart` / `.leg` (per modello, per blocchi di tempo, a capo, su fondo lime), i colori delle card lead lime e grigie |
| `componenti.js`, funzioni | `av`, `pair`, `dots`, `chipStato`, `chipEsito`, `iconaTipo`, `nomeTipo`, `eur`, `delta`, `differenze` (con `lcs` e `parole`, private); `variabili`, la stringa delle custom property dei componenti, che ogni cornice dichiara sulla propria radice (`.a-app` nella Console, `.m-page` sul telefono, che vi aggiunge `--light` e `--light-card`) |
| `direzione-a.js` | la cornice (`.a-*`, `.shead`, `.cards`, `.stat`, la barra agenda `.a-sched` / `.tl`, `.elenco`, `.vuoto`), le pagine (Richieste `.fbar` / `.frow` / `.fsum` / `.hgroup`; Dipendente `.dtesta` / `.rev` / `.pdoc` / `.vrow` / `.prompt`; Esecuzione `.etesta` / `.lrow` / `.chat`; Costi `.crow.sp` / `.costo`), le tendine (`.a-mini`, `.a-tend`, `.appr`, `.rx`, l'editor `.campo` / `.scelte` / `.tinte`, le versioni `.cmp` / `.ev3` / `.who2`), l'inversione dell'orbe sulle superfici chiare **della cornice** (barra agenda, tendina, documento del prompt, righe delle versioni, card del modello scelto) e le varianti di pagina delle righe e delle card (`.hrow.rev` / `.caso` / `.passo`, `.crow.rend`, `.lead.mod` / `.out`, `.task.regola` / `.spesa` / `.budget` / `.esito`) |
| pagine | `direzione-a.html`, `mobile.html`, `confronto.html`, `avatar-identita.html`, `avatar-pelli.html`, `confronto-avatar.html` caricano `../componenti.js` subito dopo `comune.js` e mettono in pagina `DGT_COMPONENTI.css` (stile `css-componenti`) **prima** del CSS della Console; `mobile.html` non carica più `direzione-a.js`. `build-unico.js` non cambia: incorpora ogni `<script src>` nell'ordine dei tag (il file unico della Console pesa 408 KB, quello del mobile 301 KB: prima 404 e 420) |

Come si è tenuta ferma la cascata: le regole spostate stanno in `componenti.js` **nello stesso ordine che avevano** nella Console e
vengono messe in pagina prima delle sue, quindi fra due regole di pari specificità vince la stessa di prima; per ogni regola
spostata «da dietro» (le varianti aggiunte con le pagine successive: `.pill.ink`, `.badge.flat`, `.av.xl`, `.crow.spenta` /
`.add`, `.lead .v`, `.ripart` / `.leg`, `.task .tt small`, i colori delle card lime e grigie, la pila nella riga, la ripartizione su
lime) si è controllato che nessuna regola rimasta nella Console e prima di lei avesse la stessa specificità sulle stesse proprietà
per uno stesso elemento. La regola dell'orbe sulle superfici chiare è divisa in due: i selettori dei componenti in `componenti.js`,
quelli della cornice in `direzione-a.js` (toccano solo variabili `--av-*` che nessun'altra regola dichiara).

**Verifica.** Trentuno catture a pagina intera (`screenshot-page.js`, stesse pagine e stessi parametri: home e tendine, Richieste,
Dipartimento, Dipendente con dossier e confronto, editor nuovo e modifica, quattro Esecuzioni, Costi, le prove a 40, il kit, il
telefono in quattro stati, le quattro pagine degli avatar e del confronto, lo specimen) **identiche byte per byte prima e dopo**,
tranne le due del telefono con una revisione aperta (sotto). In più un'impronta degli **stili calcolati di ogni elemento** (tutte le
proprietà più le custom property) su trentacinque stati di pagina, anche dopo i clic: identica per la Console e per le pagine
degli avatar; sul telefono cambiano solo le sei variabili dei punti di interesse (`--d1`…`--d-off`, che il telefono non usa: ora
le eredita da `variabili`) e gli elementi della perdita qui sotto. Le tre prove cliccate passano (Costi 48, Console 64, mobile 39).

**L'eccezione: la schermata «Richiesta» di una revisione sul telefono.** Finché il telefono caricava tutta la Console, la classe
`rev` dello schermo (`.m-scr.rev`, che serve solo al fondo sfumato e al padding in basso) riceveva anche le regole della **card
revisione** della pagina del Dipendente: `.rev{padding:22px 24px 20px}` sull'intero schermo, `.rev p` (13/18, nero al 70 %),
`.rev ul / li / li b / li span` sulle evidenze, `.rev .k` sull'etichetta del motivo. Era una perdita, non una scelta: la schermata
di una consegna non aveva quel padding. Con il telefono che carica solo i componenti la perdita sparisce e la schermata è come la
descrive `mobile.js`: niente padding, «Soul prompt v7 → v8» su una riga, il testo del prompt a 13 px su tre righe. Le quattro
catture della revisione (`mobile-2-revisione.png`, `-differenze`, `-perche`, `-modello`) sono state rifatte. **Da confermare
dall'utente** (l'unica cosa visibile che cambia): per tornare all'aspetto di prima basterebbe una riga
(`.m-scr.rev{padding:22px 24px 20px}` in `mobile.js`), ma sarebbe copiare un errore.

**2. Le prove cliccate nel repository** (`prove/`, con `prove/README.md` che dice il comando): `console.js` (64 verifiche: la
tendina del titolare con approva, apri la revisione ed estendi, rifiuta con motivo, riduci, Riepilogo, chiudi e riapri; la pagina
Richieste con un filtro, azzera e «Approva tutte»; l'editor del dipendente che crea con ruolo, dipartimento e tinta, non salva senza
ruolo, modifica con Invio e chiude con Esc; l'esecuzione con pausa e riprendi, interrompi, riprova, avvia, la nota del titolare e il
filtro del log; quaranta) e `mobile.js` (39: i tre telefoni, la riga della revisione che apre la schermata su entrambi, le frecce, il
rifiuto con motivo, la prova della revisione del prompt, le approvazioni fino allo stato vuoto, la navigazione in basso, `?n=40` con
sette in coda e «12» scritto nel badge; a ogni passo nessuno schermo che scorre di lato e console pulita), accanto a `costi.js` (48).
Stesse variabili d'ambiente (`LOCAL_FONT_CSS`, `PLAYWRIGHT_MODULE`, `CHROME_PATH`), `reducedMotion: 'reduce'`, escono con 1 se una
verifica fallisce.

**3. La sezione «moto» dello specimen in `design-system/DESIGN.md`**: il blocco `motion` nel frontmatter e la sezione «Moto» (la
scala dei tempi e degli easing, le distanze, le sfocature e le scale, gli undici moti nell'ordine dello specimen, l'hover, che cosa
resta fermo, il moto ridotto), nello stile delle altre sezioni; lo specimen non è cambiato. Notato e non toccato: `tokens.css` porta
solo tre token di moto e un easing diverso da quello dello specimen (`cubic-bezier(.2,.8,.2,1)` contro `(.22,1,.36,1)`).

### Versione 15: le pagine Agenda e Chat del rail (2026-09-06, sessione successiva)

I due cerchi ancora inerti del rail della Console (`i-chat` e `i-cal`) e le due tab corrispondenti sul telefono, come da
passaggio di consegne. Niente di visibile cambia nelle pagine che c'erano: **venticinque catture identiche byte per byte**
prima e dopo (Console, tendine, Richieste, Dipartimento, Dipendente con dossier, confronto ed editor, quattro Esecuzioni,
Costi, le prove a 40, il kit, il telefono in quattro stati) e le quattro cornici del telefono (schermate 1, 2, 3 e la
revisione) identiche byte per byte all'albero precedente (`git archive HEAD`, con l'intestazione della pagina di studio
tolta da entrambe le catture: è l'unica cosa che cambia lì, vedi sotto).

**Il modello** (`dati.js`), un solo aggregatore per la Console e per il telefono, come per i costi:

| Che cosa | Come |
|---|---|
| `giornata()` | Gli eventi di oggi, costruiti dall'attività corrente di ogni dipendente: le ore, i titoli, i clienti e i costi sono quelli di `e.att` (**nessun numero nuovo**). Al lavoro va da `att.da` ad «adesso»; consegnato da `att.da` a `att.fine`; l'errore dal **primo passo** al passo fallito (`att.da` è l'ora del guasto, non dell'avvio: le ore vengono da `esecuzioneDi`, lo stesso calcolo della pagina Esecuzione); il pianificato dall'ora alla somma delle stime dei suoi passi; concluso oggi chi ha `att.fine` di oggi. A 11 sono otto eventi, a 40 ventisei. |
| `settimana()` | I sette giorni da oggi. Il numero e il mese vengono da `azienda.data`, il nome del giorno da `azienda.dataLunga` e poi si contano in avanti (il calendario del modello è quello del prodotto, non quello vero: 4 settembre è giovedì). Ogni giorno porta i **pianificati che si ripetono** (obiettivi con scadenza «ogni giorno» / «ogni venerdì»: il report delle 18:00 e il follow-up del venerdì), le **prossime consegne** degli obiettivi (`prossima`, quando porta una data: «Checkout · 8 set») e le **scadenze** che cadono in quel giorno. |
| `scadenze()` | Gli obiettivi con una data, dalla più vicina, con quanti giorni mancano. |
| `filoDi(e)`, `scrivi`, `fili()`, `nonLetti` | I fili della chat: un filo per dipendente, una sola copia (i messaggi restano), scritti a mano a 11 per Nora, Kim, il Social media manager e Ricerca lead, **generati** per gli altri dallo stato e dai passi dell'esecuzione (le ore sono quelle del passo in corso, non «adesso», così l'ordine della chat è quello vero). Un messaggio è `{ da: 'io' \| 'dip' \| 'sistema', ora, testo }`, con `richiesta` quando porta una consegna che aspetta il titolare e `passo` quando la nota è consegnata a un passo. `fili()` ordina: prima quelli con messaggi da leggere, poi per ultimo messaggio. |

**La pagina Agenda** (Console, `agenda` in `direzione-a.js`), stessa cornice: titolo AGENDA, tre numeri (eventi oggi con
quanti al lavoro, ancora da partire con l'ora del primo, scadenze in settimana con quante in ritardo), quinto cerchio del
rail acceso. Quattro sezioni:

1. **Oggi in azienda**: la barra agenda del riferimento allargata a tutta la giornata. Card bianca con il titolo, la data
   lunga in pillola e la legenda; dentro, la **pista** da un'ora tonda all'altra con le ore sopra, un **blocco** per evento
   sulla prima corsia libera (i blocchi non si sovrappongono mai) e il segno di **«adesso»** con il marcatore nero, come
   nella barra della cornice. Un blocco porta l'avatar (con il suo punto di stato), il titolo e le ore, e apre la sua
   esecuzione. *Scelta fatta in costruzione*: la pista è **chiara** (`#EDEDED`) e sono i blocchi a portare il colore —
   lime al lavoro e da approvare, bianco concluso, tratteggiato pianificato, rosa in errore. Con la pista lime del
   riferimento i blocchi «in corso» (`#A8E65D` su `#B8FC64`) sparivano dentro la pista; così il lime resta quello che è
   nel sistema, l'attenzione del titolare.
2. **Eventi di oggi**: le card attività della home (`cardEsecuzione` e `cardUltima`), con le **pillole che filtrano
   davvero** (Tutti · In corso · Da approvare · Pianificati · Errori). Il filtro vale per le card: la barra del giorno
   resta intera.
3. **Scadenze**: a sinistra la card del Riepilogo con l'obiettivo del mese (scadenza, scadenze entro sette giorni, in
   ritardo), a destra le righe degli obiettivi con una data, dalla più vicina: data e giorni che mancano (lime entro
   sette giorni), consegne e prossima, avanzamento a barra, chip «In ritardo» / «Concluso» / percentuale, freccia al
   dipartimento.
4. **La settimana**: sette righe, una per giorno, con il nome e la data (oggi ha il chip lime). Oggi porta due voci
   riassuntive (quanti al lavoro, quanti da partire e a che ora); gli altri giorni le voci del modello: pianificati che si
   ripetono, prossime consegne (bianche), scadenze (bianche, rosa se l'obiettivo è in ritardo).

**La pagina Chat** (Console, `chat` in `direzione-a.js`), stessa cornice: titolo CHAT, tre numeri (conversazioni, da
leggere, messaggi di oggi), quarto cerchio acceso. Due colonne: a sinistra i **fili** come righe compatte (avatar 52,
etichetta, ultimo messaggio con «Tu:» quando è del titolare, ora e il numero da leggere in pillola lime; la riga aperta è
bianca), con le pillole che filtrano (Tutte · Da leggere · Al lavoro · Da approvare · Errori); a destra il **filo aperto**:
testata con avatar 68, chip di stato e conteggio, pillole «L'esecuzione» e «La sua pagina»; il corpo in un riquadro
contornato con le **bolle** (dipendente a sinistra scura con l'avatar, titolare a destra bianca con le iniziali, la riga di
sistema al centro come chip) e, sotto la riga di sistema, la **consegna** come riga bianca con approva e rifiuta — decidere
di lì è la stessa decisione di tutte le altre (`m.decidi`); in fondo la riga che dice quando il dipendente legge e la
**barra di scrittura del riferimento**.

**La barra di scrittura dell'Esecuzione e quella della chat sono la stessa conversazione**: la nota scritta
nell'Esecuzione entra nel log come prima («MR: …») **e** nel filo; quella scritta nella chat entra solo nel filo. Era il
punto di partenza chiesto dal passaggio di consegne.

**Da dove ci si arriva** (scelte fatte in costruzione, il prompt le lasciava a me):

| Pagina | Ingressi |
|---|---|
| Agenda | il quinto cerchio del rail; il **cerchio della barra «Oggi in azienda»** in ogni pagina; la pillola **«Sposta»** di un'esecuzione pianificata (prima inerte) |
| Chat | il quarto cerchio del rail; i **cerchi «commenta»** delle card attività, delle card esecuzione e della card ultima (prima inerti); **«Commenta»** nelle due tendine del titolare (cerchio di vetro e pillola); la pillola **«Scrivi a …»** dell'Esecuzione, che prima portava il fuoco sulla barra del log |

**Il telefono** (`mobile.js`): le due tab della navigazione in basso non sono più inerti e portano a tre schermate nuove.

- **4 · Chat**: schermo chiaro, titolo CHAT, due numeri (conversazioni, da leggere), l'elenco dei fili come righe della
  coda (avatar 38, etichetta, ultimo messaggio, ora e il numero da leggere; nera sulla riga accesa).
- **5 · Conversazione**: schermo nero. La riga di navigazione sta **fuori dal corpo che scorre** (indietro, avatar e nome
  di chi parla, campanella), perché il filo si apre in fondo, sull'ultimo messaggio; le bolle dei componenti a misura di
  telefono, le consegne come riga bianca con approva e rifiuta, e in fondo la barra di scrittura (pillola bianca e cerchio
  lime «invia»). Quello che si scrive qui sta anche nella chat della Console.
- **6 · Agenda**: schermo sul fondo del Riepilogo. Titolo AGENDA, due numeri (eventi oggi, da partire con l'ora del
  primo), la **linea del tempo del Riepilogo** (la stessa colonna di marcatori: ora, badge rotondo con l'icona dello
  stato, linea) con una card per evento — lime al lavoro e da approvare, rosa in errore, tratteggiata pianificata —, poi
  «Prossimi giorni» (sei righe con quanti impegni) e «Scadenze» (entro sette giorni, con il chip della data, rosa se in
  ritardo).

Sul telefono la navigazione accende la tab della schermata aperta (1 per le approvazioni, 4 per la chat, 6 per l'agenda);
la tab «Dipartimenti» resta inerte, come da passaggio di consegne. **La pagina di studio del telefono ora mostra sei
telefoni** (1…6) invece di tre e ha un titolo nuovo («Il telefono del titolare»): è l'unica cosa che cambia nelle pagine
che c'erano, ed è il motivo per cui le catture del telefono si confrontano con l'intestazione tolta.

**Verifica.** Le tre prove di prima passano invariate (Console 64, mobile 39 con i sei telefoni, Costi 48) e ce n'è una
**quarta**, `prove/agenda-chat.js` (54 verifiche): gli ingressi, la barra del giorno (un blocco per evento, gli stati, il
segno di «adesso»), le pillole che filtrano, le scadenze e la settimana, i fili e il filo aperto, scrivere dalla chat e
dall'Esecuzione (la nota entra nel log **e** nel filo), approvare dalla riga della consegna, le due pagine a 40, e sul
telefono le due tab, la riga che apre il filo, scrivere, indietro; a ogni passo nessuno sforo orizzontale e console pulita.

**Punti aperti nuovi** (non chiesti, da non toccare senza richiesta): nell'Agenda i cerchi cerca e filtri delle
intestazioni, le pillole «Per data / Per dipartimento» delle scadenze e «Sette giorni / Questo mese» della settimana, e la
pillola «Nuovo evento» della testata; nella Chat i cerchi cerca e filtri; sul telefono il cerchio «cerca» della chat e
quello «ordina». Il dipendente non risponde da solo a una nota nuova: le risposte stanno nel modello, e sotto il filo c'è
la riga che dice quando la leggerà.

### Correzione 15a: gli avatar centrati nella casella (2026-09-06, stessa sessione)

Correzione dell'utente: «in ogni pagina (nell'intero prodotto) gli avatar piccoli sono decentrati e spostati un po' verso
il basso».

**Il perché.** L'orbe cresce oltre la casella (`--av-scala`: 115 % con la perla, 128 % con il corpo piatto di oggi) e lo
faceva con `width` e `height` in percentuale sull'SVG (`avatar/avatar-orbe.js`). La casella `.av` è una griglia con
`place-items:center` e una riga automatica: la percentuale in altezza è ciclica, quindi Chromium la risolve dal rapporto
1:1 e dalla larghezza, la riga cresce fino a quell'altezza e **sfora solo in basso**. Risultato: l'SVG restava alto quanto
1,28 volte la riga e il disco scendeva di `(scala − 1) / 2` dell'altezza utile — 3,4 px su un avatar da 28, 6,2 px su uno
da 48, 9,5 px sul grande della pagina del Dipendente. Orizzontalmente era centrato: si vedeva solo la caduta.

**La correzione.** Una riga sola: l'SVG torna a riempire la casella (`width:100%;height:100%`) e la crescita passa alla
proprietà `scale`, che scala **attorno al centro** e non tocca la griglia.

```css
[data-pelle] .av:has(>svg.orbe)>svg.ava.orbe{width:100%;height:100%;scale:var(--av-scala,115%)}
```

Il disco resta grande esattamente come prima (misurato: 24,45 px su una casella da 28, 32,43 su 36, 44,6 su 48, 68,88 sul
grande): cambia solo dove sta. Verificato con uno script che confronta il centro del disco disegnato (`circle.pelle`) con
il centro della casella su ogni avatar di ogni pagina — Console (home, Richieste, Dipartimento, Dipendente, Esecuzione,
Costi, Agenda, Chat, editor, 40), telefono, confronto delle direzioni e le tre pagine di studio degli avatar: **1 000
avatar, scarto massimo 0 px** (prima fino a 9,5 px). Le quattro prove cliccate passano invariate.

Screenshot rigenerati: 56 delle 71 catture cambiano (solo la posizione degli avatar); otto non hanno avatar e restano
identiche byte per byte. Non rigenerate: `b-11`, `b-40`, `c-11`, `c-40` (lo studio delle direzioni B e C del 2026-09-04,
tenuto com'era), `avatar-orbe-pellicola.png` (la pellicola del moto, fatta con uno script fuori dal repository) e le due
catture della revisione sul telefono senza avatar.

**La regola che ne esce** (regola 23 in `SYSTEM-DESIGN.md`): quando un elemento deve sforare la sua casella, si scala
attorno al centro (`scale`), non si allarga con una percentuale dentro una griglia; una percentuale in altezza dentro una
riga automatica cresce solo verso il basso.

**Prossimo lavoro, scelto dall'utente a fine sessione**: la **barra «Oggi in azienda»** (`barraAgenda` in `direzione-a.js`,
`.a-sched` e `.tl`), la barra verde in cima alla Console. «Non capisco a primo impatto il suo utilizzo… mi dà l'idea che dica
chi sta lavorando e chi ha un lavoro programmato? Ma non ne sono sicuro, in ogni caso non è ben chiaro»: la prossima sessione
fa uno **studio e un'analisi UX** della barra e propone come renderla più chiara e utile. Il brief sta in
`PROSSIMA-SESSIONE.md`, «Come riprendere». Da tenere presente: la barra viene dal riferimento e vale anche come **barra dei
passi** nella pagina Esecuzione (dove, avendo le etichette, si legge molto meglio), e dalla versione 15 c'è la pagina Agenda
con una pista proporzionale alle ore.

### Versione 16: la barra «Oggi in azienda» (2026-09-06, sessione successiva)

Lavoro chiesto dall'utente: «non capisco a primo impatto il suo utilizzo… mi dà l'idea che dica chi sta lavorando e chi ha un
lavoro programmato? Ma non ne sono sicuro, in ogni caso non è ben chiaro». Prima uno **studio**, poi **tre strade disegnate nella
Console vera** e catturate, con pro e contro, poi una **raccomandazione**, applicata perché l'utente non ha risposto.
Catture: `a-barra-oggi.png` (la barra di prima), `a-barra-momenti.png`, `a-barra-misura.png`, `a-barra-stato.png` (le tre strade),
le stesse con `-40`, e le quattro nella Console (`a-barra-console-*.png`).

#### 1 · Che cosa dice oggi la barra

La barra viene dal riferimento (case study, `design-system/reference/`) ed è copiata così com'è dalla versione 1. Nel riferimento
è l'**agenda personale di una persona**: eventi tutti dello stesso tipo (appuntamenti), la coppia di avatar è chi partecipa, il
segmento «adesso» è la videochiamata in corso (icona video), e chi guarda è dentro quegli appuntamenti. In DGT la stessa forma
porta un contenuto diverso: **le esecuzioni dei dipendenti AI**, di tipi e stati diversi, e chi guarda non partecipa, sorveglia.

Il testo che la barra stampa oggi, per intero: `38 min · 10:42 · 3 al lavoro · 15:00 · 17:00`. Cinque numeri e **nessun
sostantivo**: nessun evento è nominato. Da lì nasce la lettura dell'utente.

Misure (pista larga 790 px a 1440, modello a 11):

| pezzo | larghezza | copre | scala |
|---|---|---|---|
| pillola bianca «38 min» | 128 px | 38 minuti | 3,4 px/min |
| segmento «in corso» | 402 px (51 % della pista) | 30 minuti | **13,4 px/min** |
| «15:00» + pillola | 95 px | ~30 minuti stimati | 1,7 px/min |
| separatore fra «adesso» e le 15:00 | **1 px** | **4 h 18** | 0,004 px/min |

La scala cambia di **otto volte** fra un blocco e l'altro, e il vuoto più lungo della giornata (le quattro ore e mezza fra
mezzogiorno e le 15:00) è l'elemento più piccolo della barra. **Non è una linea del tempo**, ma ne ha la forma.

Il segno di «adesso» non sta a un'ora: sta al **bordo sinistro del segmento verde**, cioè in una posizione decisa dal layout. La
prova: a 11 dipendenti è a 142 px dall'inizio della pista, a 40 è a 130 px — **lo stesso orario si sposta di 12 px** solo perché la
pillola che lo precede si è stretta.

Gli stati sono codificati nel **riempimento**, e i riempimenti hanno lo stesso valore: pista lime `#B8FC64`, evento concluso
bianco, «in corso» `#A8E65D`, pianificato bianco al 55 %. I contrasti fra loro: **1,19 : 1** (bianco su lime), **1,21 : 1**
(in corso su pista), **1,11 : 1** (pianificato su pista), **1,08 : 1** (concluso contro pianificato). Sotto la soglia del colpo
d'occhio: la categoria non si legge, restano le forme.

**Che cosa non dice.** La barra legge `m.agenda`, una lista scritta a mano e parallela al modello, che ha solo tre stati (fatto,
in corso, pianificato). La giornata vera (`m.giornata()`, l'aggregatore della versione 15) a 11 dipendenti ha **8 esecuzioni**:
3 in corso, **1 ferma per errore**, **1 che aspetta l'approvazione**, 3 pianificate. La barra ne mostra 4 (una conclusa, il
gruppo «in corso», due pianificate su tre) e **tace proprio sulle due su cui il titolare deve fare qualcosa**. A 40 la giornata
ha 26 esecuzioni e la barra mostra sempre le stesse quattro caselle: **non scala**.

Un dettaglio che chiude il ragionamento: la pillola bianca «38 min» **è** una delle quattro cose che aspettano il titolare (il
post 4 di 12 consegnato da Nora alle 10:12, in coda per l'approvazione). La barra ce l'ha e la chiama «38 min».

#### 2 · Che cosa dovrebbe capire il titolare in un colpo d'occhio

Aprendo la Console: **che cosa è fermo** (l'errore), **che cosa aspetta lui**, **chi lavora adesso e su cosa**, **che cosa parte
dopo**. Delle quattro, la barra risponde bene solo alla terza, e con un numero già scritto in 48 px sessanta pixel più sotto.
La prima — l'errore — **non è in nessun punto sintetico della Console**: Kim in errore si trova solo scorrendo la griglia dei
dipendenti, come un chip rosa piccolo.

**Il confronto in casa.** La stessa barra, nella pagina Esecuzione (`barraPassi`), si legge molto meglio: ogni segmento ha
un'etichetta («Struttura approvata e catalogo · 7 min», «passo 3 · Carrello collegato al magazzino · 24 min»). È la stessa forma
con il contenuto nominato: la prova che il problema non è la forma, è che i blocchi non dicono che cosa sono.

#### 3 · Le tre strade (disegnate nella Console, catturate a 11 e a 40)

Tutte e tre leggono il modello vero (stati dei dipendenti e richieste in attesa) invece della lista parallela `m.agenda`: così
l'errore e le approvazioni esistono.

**Strada 1 · «I tre momenti»** (`a-barra-momenti.png`) — la forma del riferimento, il contenuto nominato: la pillola bianca
diventa l'ultima consegna con il suo titolo e la campanella «da approvare», il segmento verde dice «adesso · 3 al lavoro», si
aggiunge una pillola **rosa** per chi è fermo, e i pianificati si contano in «15:00 · e 3 da fare».
*Risolve*: ogni blocco dice che cos'è; l'errore entra in cima; scostamento minimo dal riferimento; usa la lezione della barra dei
passi, che è già in casa. *Perde*: resta la falsa linea del tempo (le larghezze non dicono niente); i titoli si tagliano già a 11
(«Piano editoriale otto…») e **a 40 si tagliano in tre punti** («Cons…», «12 …», «Documen…»): 790 px non bastano per quattro
blocchi nominati. *Costa*: poco — la stessa cornice, quattro classi nuove.

**Strada 2 · «La giornata a misura»** (`a-barra-misura.png`) — la pista diventa chiara e **proporzionale alle ore** (08–19), con
le fasce che dicono che cosa succede in quel momento, l'errore come riga sottile sotto la fascia (una sola esecuzione ferma
tingerebbe di rosso tutta la mattina), le finestre dei pianificati tratteggiate al loro posto e «adesso» alla sua ora vera.
*Risolve*: la barra diventa onesta; «10:42» significa qualcosa; si vede il buco del pomeriggio e il picco del mattino; scala a 40
senza cambiare, perché è una densità e non un elenco. *Perde*: **resta muta** — in 24 px di fascia non c'è posto per un nome, e
serve una legenda che mangia 215 px di pista; non dice che cosa aspetta il titolare; duplica in piccolo e in peggio la barra del
giorno della pagina Agenda, che ha quattro corsie e i titoli. *Costa*: medio (un calcolo per minuto e una legenda).

**Strada 3 · «La riga di stato»** (`a-barra-stato.png`) — la barra smette di fingersi una linea del tempo e diventa il **quadro
del giorno**: quattro caselle contate e nominate — `2 approvate`, `3 al lavoro` (con la pila di chi), `1 ferma · Kim` (rosa),
`3 dopo · dalle 15:00` — ognuna cliccabile verso il posto giusto (le richieste, l'agenda, l'esecuzione ferma). Quello che
aspetta il titolare **non** ci sta: lo dice già la linguetta lime (vedi la correzione 16a).
Con l'azienda grande i dettagli cedono il posto ai numeri (il nome di chi è fermo e l'ora del prossimo spariscono sopra i sedici
dipendenti). *Risolve*: risponde alle quattro domande del colpo d'occhio; scala a 40 senza tagliare niente; porta l'errore in
cima, dove oggi manca del tutto; niente marcatore dell'ora, quindi sulla pagina Esecuzione non ci sono più due «10:42» a 250 px
di distanza. *Perde*: l'asse del tempo (la barra non dice più *quando*, lo dice l'Agenda) e, **sulla sola home**, ripete due
numeri già grandi lì sotto («al lavoro», «da approvare»). *Costa*: poco.

#### 4 · Raccomandazione, applicata e poi confermata: la strada 3

**Esito.** L'utente ha confermato la strada 3 a fine sessione («confermo la Strada 3», 2026-09-06), dopo aver visto le quattro
scelte in un artefatto con il voto condiviso (https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f) da
condividere con un collega. La conferma riguarda la **strada**, non le scelte di dettaglio della sezione 7, che restano aperte.

Le ragioni, in ordine:

1. **Risponde alla domanda dell'utente.** «Non capisco a cosa serve» si chiude solo nominando le cose: la 3 le nomina tutte e
   quattro, la 1 solo in parte (e tagliate), la 2 non le nomina affatto.
2. **Copre un buco vero.** L'errore non ha oggi nessun posto sintetico nella Console. La barra è l'unico elemento presente in
   tutte e sette le pagine: è il posto giusto.
3. **Scala.** A 40 la 1 taglia tre etichette, la 3 cambia solo i numeri.
4. **La duplicazione costa poco e vale.** I due numeri ripetuti si vedono **solo nella home**: nelle altre sei pagine i numeri
   grandi sono quelli della pagina (passi dell'esecuzione, costi, dipartimento) e la barra è l'unico posto dove lo stato
   dell'azienda resta scritto. Un elemento fisso che ripete il titolo della pagina d'ingresso è ridondanza voluta, non rumore.
   *(Vale ancora per «al lavoro». Per «aspettano te» no: guardando le pagine invece che ragionando a memoria si è visto che il
   numero era ripetuto in tutte e sette, non nella sola home — vedi la sezione 6a.)*
5. **La proporzionalità della 2 è già in casa e sta meglio dov'è**: la pagina Agenda ha la pista vera, con le ore, le corsie e i
   titoli. La barra in cima deve dire *meno* e portare lì.

**Dove ci si scosta dal riferimento, e perché.** Resta tutto quello che il riferimento dà come forma: pillola bianca 64,
titolo 18, chip del calendario, pista lime 52, blocchi come pillole con le pile di avatar, cerchio 52 in fondo. Cade **l'asse del
tempo**: gli orari fra i blocchi, i separatori e il marcatore nero dell'ora. È legittimo nel riferimento — l'agenda personale di
una giornata di appuntamenti *è* una linea del tempo — e non lo è in DGT, dove i blocchi non stanno in scala e il marcatore non
sta a un'ora (vedi i numeri della sezione 1). Il resto del sistema non cambia: nessuna emoji, solo le icone dello sprite
(`i-check`, `i-warn`, `i-bell`, `i-clock`), il lime resta l'attenzione del titolare, il rosa `--badge-red` resta l'errore come in
tutte le altre pagine, gli avatar sono quelli della versione 10.

`?barra=0` rimette la barra di prima, per il confronto (stessa abitudine di `?avatar=kit` e `?pelle=`); verificato che con quel
parametro la pagina è identica byte per byte a quella di prima. Le due strade scartate non restano nel codice: stanno qui e nelle
catture.

#### 5 · La barra dei passi dell'Esecuzione (lo stesso componente)

Guardandola come chiedeva il prompt sono venuti fuori due difetti, corretti tutti e due.

**a. Con sette passi la barra usciva dalla pagina e veniva tagliata in silenzio.** `.etesta` è una griglia senza colonne
dichiarate: la colonna implicita cresce a `max-content` e con l'esecuzione «Checkout e-commerce» arrivava a **2180 px** dentro un
contenitore da 1312; `.a-app` ha `overflow:hidden`, quindi gli ultimi tre passi non erano semplicemente sullo schermo, e nessuna
prova se ne accorgeva (la pagina non scorreva di lato, il contenuto era tagliato). Rimedio: `grid-template-columns:minmax(0,1fr)`
su `.etesta`, lo stesso che `.a-main` ha già.

**b. Sette passi per esteso chiedono 1600 px e la pista ne ha 990.** Ora la barra si stringe da sola: i passi **conclusi** di
un'esecuzione lunga (oltre quattro pillole) tengono la spunta e la durata e lasciano il nome, che sta nella lista dei Passi lì
sotto; oltre tre conclusi restano gli ultimi due e gli altri si contano (`+3 fatti`); i passi **da fare** oltre i due successivi
si contano in una pillola sola (`+2 da fare`). Il passo **in corso** e quello **in errore** restano sempre per esteso.
Verificato su tutte e **51 le esecuzioni** del modello (11 e 40): nessuna sfora la pista. Prima e dopo in
`a-barra-passi-prima.png` e `a-barra-passi.png`.

Con la barra nuova in cima, le due barre della pagina Esecuzione non si confondono più: quella dell'intestazione è fatta di
caselle contate, quella dei passi è una successione con il marcatore nero dell'ora.

#### 6 · Verifica

- Le quattro prove cliccate passano: `console.js` **82** (erano 64: diciotto verifiche nuove sulla barra — le caselle, i
  numeri contro il modello, dove portano, che non ripetano la linguetta, la barra dei passi dentro la pagina su quattro
  esecuzioni, i quaranta), `mobile.js` 39,
  `costi.js` 48, `agenda-chat.js` 54. In tutto 221 — **223 dopo la correzione 16a** (due verifiche in più, sezione 6a).
- **Le 25 catture della Console cambiano solo nella barra**: confronto a pixel di ogni pagina prima e dopo, il riquadro delle
  differenze è sempre `x 426–1203, y 34–85` (esattamente la pista) e le differenze sono ~29 500 pixel su ognuna; le uniche due
  eccezioni sono `a-esecuzione.png` e `a-esecuzione-attesa.png`, che cambiano anche nella barra dei passi (il difetto corretto
  qui sopra). `a-1920.png` cambia nello stesso riquadro scalato di 1,333.
- Il telefono non è toccato: `mobile.png` rigenerato è **identico byte per byte**; `mobile.js` e `componenti.js` non cambiano.
- `?barra=0` (la barra di prima) rende la home **identica byte per byte** a quella di prima della sessione.
- I parametri delle catture non stavano più in nessun posto: ora c'è `scatta.js`, che li dichiara e le rigenera
  (`node schermate/direzioni/scatta.js`, oppure `console` / `barra` per un gruppo solo, `--in <cartella>` per il confronto
  prima/dopo). Le catture che restano fuori sono dichiarate nel file (direzioni B e C, pellicola del moto, cornici del telefono,
  sezioni per elemento, le due strade scartate).

#### 6a · Correzione 16a: la barra non ripete quello che dice già la linguetta (2026-09-06, stessa sessione)

Alla conferma della strada l'utente ha lasciato a me la scelta sulla ripetizione dei numeri («se ritieni giusto eliminare la
ripetizione correggi»). **Tolta la casella «aspettano te».** Il motivo, guardando le pagine invece che ragionando a memoria: la
linguetta lime `.a-mini` («N da approvare», `position:fixed` sul bordo destro) è su **tutte e sette le pagine**, e quando la
tendina è aperta al suo posto c'è la testata «Da approvare N». Quindi il numero delle richieste in attesa era già scritto
ovunque, e la barra ne faceva un secondo — **un terzo** nella home e nel Dipartimento, dove c'è anche il numero grande della
pagina: sulla schermata del Dipartimento «4 aspettano te» e «4 da approvare» distavano 430 px.

Restano quattro caselle. La divisione che ne esce, e che vale come regola: **la barra dice che cosa fa l'azienda** (approvate,
al lavoro, ferme, dopo), **la linguetta lime dice che cosa devi fare tu** — ed è anche quella che apre la coda, cosa che la
barra non faceva. La casella «al lavoro» resta anche se il numero grande della home la ripete: porta la **pila di chi** sta
lavorando, che il numero non ha, ed è l'unico posto globale nelle altre sei pagine.

**Artefatti allineati (2026-09-07).** Le trentadue catture di `screenshot/` sono state rigenerate con `scatta.js`, e i tre
artefatti ripubblicati allo stesso indirizzo: la [Console](https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34),
il [telefono](https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9) e la
[pagina della scelta](https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f) che il titolare ha condiviso con un
collega — quest'ultima con le immagini della strada 3 rifatte a quattro caselle, l'occhiello «Decisa: la strada 3» e il
poscritto che racconta questa correzione. Il voto sulla pagina resta aperto.

#### 7 · Scelte di dettaglio, ancora da confermare

(La strada è confermata, vedi la sezione 4; queste no, perché l'utente non le ha sollevate.)

- Le quattro caselle e le loro parole: «approvate» (le richieste approvate oggi, la stessa parola del Riepilogo), «al lavoro»,
  «ferma/e», «dopo».
- La casella «al lavoro» è l'unica bianca piena: adesso pesa più del passato e del futuro.
- La pila di avatar resta solo su «al lavoro» (chi sta lavorando); le altre caselle hanno l'icona dello sprite.
- Sopra i sedici dipendenti spariscono il nome di chi è fermo e l'ora del primo pianificato (restano i numeri).
- Le caselle traslucide hanno il filetto `inset 0 0 0 1px rgb(0 0 0/.1)`, lo stesso del chip della data: senza, il contrasto con
  la pista sarebbe 1,1 : 1, l'errore che l'analisi contesta alla barra di prima.
- Nella barra dei passi: quattro pillole è la soglia oltre cui i conclusi perdono il nome; due i passi da fare mostrati per esteso.


### Versione 17: il telefono prende il quadro del giorno, la tab Dipartimenti, i controlli inerti (2026-09-07, sessione successiva)

Tre lavori scelti dall'utente (decisione 37), in quest'ordine.

#### A · Il quadro del giorno sul telefono

Il telefono non aveva nessun quadro dell'azienda: la prima schermata partiva dal titolo «DA APPROVARE». La Console, dalla
versione 16, ce l'ha su tutte e sette le pagine.

**Il nodo, misurato nel telefono vero.** Le quattro caselle della Console sommano 584 px più tre spazi da 6 = **602 px**; la
colonna del telefono è larga **254,4 px** (misurata sulla card della richiesta, con lo schermo a 278,4 e la cornice fissa a
300 × 620). Servono due volte e mezzo lo spazio che c'è: non bastava riordinare, le caselle andavano rimpicciolite. La forma
in linea della Console (icona + numero + parola, con la pila) non ci sta nemmeno con tre caselle: sommano 273 px. Quindi o si
va su due piani, o si va su due righe, o si tolgono caselle.

**Le tre forme disegnate nel telefono vero e catturate** (`?quadro=1|2|3`, catture `m-quadro-*.png`):

| | Forma | Alto | Card della richiesta visibile | Pro | Contro |
|---|---|---|---|---|---|
| 1 | **Le quattro a due piani** — una riga, quattro caselle da 60 px, il numero sopra la parola | 58 px | 236 di 256 px | tiene tutti e quattro i conti della Console; caselle uguali, nessuna pesa più per caso | la parola scende a **10 px**, il testo più piccolo del telefono (tutto il resto parte da 11); niente icone né pila |
| 2 | **Due per due** — la forma della Console quasi intera: icone, pila di avatar, occhiello «Oggi in azienda» e data | 132 px | **162 di 256 px** | la più leggibile, e la sola che dica *di chi* si parla | costa quasi un quarto dello schermo: la card scende da 226 a 358 px dalla cima e **la riga con approva e rifiuta finisce sotto la barra di navigazione**. Sulla schermata che serve a decidere, la decisione va cercata scorrendo |
| 3 | **La riga che parla** — le tre caselle che chiedono un'azione, numero e parola accanto | 54 px | 240 di 256 px | la più economica; si legge come una frase, «3 al lavoro · 1 ferma · 3 dopo»; tutto a 11 px come il resto | cade «approvate», la sola che guarda al passato; niente pila (con la pila le tre caselle fanno 273 px) |

**Scelta dell'utente: la 2, «due per due»** (2026-09-07, alla fine della sessione; la sessione aveva applicato in via
provvisoria la 3, che il prompt autorizzava in mancanza di risposta). Le due scartate restano dietro `?quadro=1|3` (come
`?barra=0`), `?quadro=0` toglie il quadro.

**Applicare la 2 ha voluto dire pagarne il contro, e la colonna «card visibile» della tabella è cambiata.** Il contro non era
un'opinione: era una misura, 162 px su 256, con la riga di approva e rifiuta sotto la barra di navigazione. Due recuperi, in
questo ordine:

1. **Il conto ripetuto.** Sulla schermata 1 i due numeri grandi erano «N da approvare» e «N approvate oggi»; la casella
   «approvate» del quadro ripete il secondo a 60 px di distanza — è il difetto tolto dalla correzione 16a nella Console
   («un elemento fisso non ripete quello che un altro dice già»). Poteva cadere la casella o il numero grande: **cade il
   numero grande**, perché la casella sta dentro la griglia scelta, porta un'icona e apre il Riepilogo, mentre il numero era
   nudo. A quel punto nella riga dei due numeri ne resta uno solo, «N da approvare», che dice quello che dice già il titolo
   sopra: **la riga intera cade e il conto passa nel titolo** («DA APPROVARE 4», a 26 px perché a 30 andrebbe a capo —
   la riga ha 234 px liberi e il titolo a 30 ne chiede 214, che col numero fanno 243). Sono **78 px**.
2. **Le misure strette del quadro**: padding 12 invece di 14, occhiello su una riga da 14, stacco 6, caselle da 40 invece di
   42. Il quadro passa da 132 a **118 px**. Sono altri 14.

**Risultato misurato: 248 px di card su 256, e la riga con approva e rifiuta torna sopra la barra di navigazione** (4 px di
margine). La forma scelta dall'utente finisce così **migliore di tutte e tre le forme dello studio** sulla misura con cui
avevo argomentato contro di lei — la 3 ne lasciava 240 con la riga 4 px *sotto* la navigazione, la 1 ne lascia 236 con 8 px
sotto. Il quadro «due per due» resta quello scelto: griglia 2×2, icone, pila di avatar, occhiello e data.

La lezione, che vale oltre questo caso: **il costo di una forma non è una proprietà della forma, è una proprietà della forma
più quello che le sta intorno.** Avevo misurato la 2 dentro una schermata che ripeteva un conto; tolta la ripetizione, la
classifica si è rovesciata. Due verifiche nuove in `prove/mobile.js` inchiodano le due misure, così non possono peggiorare in
silenzio.

**Dettagli.**
- I conti sono quelli della Console: `gruppiOggi` è passato da `direzione-a.js` al modello (`m.gruppiOggi()` in `dati.js`),
  così il desktop e il telefono contano una volta sola.
- Dove porta ogni casella: «al lavoro» e «dopo» all'**Agenda**; «ferma» alla **conversazione con chi è fermo**, perché dal
  telefono l'esecuzione non si riavvia e parlargli è l'unica cosa che si può fare (la Console apre l'Esecuzione, che il
  telefono non ha); «approvate» al **Riepilogo di oggi**, dove sta il passato della giornata.
- Sul telefono cadono sempre i dettagli della Console («· Kim», «· dalle 15:00»): 254 px non li reggono a nessuna delle tre.
- Il quadro sta **solo sulla schermata 1**: sul telefono le schermate sono destinazioni separate e il quadro del giorno
  appartiene alla home; l'Agenda (schermata 6) *è* già la giornata per esteso.
- Nella forma scelta la pila non porta il «+N»: il numero della casella è a due centimetri e sarebbe lo stesso conto due
  volte (ancora la 16a). A quaranta, con il «+10», «al lavoro» si tagliava.

#### B · La tab «Dipartimenti» (schermate 7 e 8)

Era l'ultimo cerchio inerte della navigazione in basso. Due schermate, sul modello della pagina Dipartimento della Console.

- **7 · Dipartimenti**: titolo, due numeri (*N dipartimenti*, *N dipendenti* col badge di quanti lavorano), poi una riga per
  dipartimento con la pila dei suoi, il nome, i conti del giorno, la spesa di oggi e — a destra — il numero lime di quante
  richieste di quel dipartimento aspettano il titolare. Il sottotitolo dice «N dipendenti · M al lavoro»; se c'è
  un'esecuzione ferma dice «M al lavoro · K ferm\*» in rosa, perché l'errore è la cosa che chiede attenzione e in 130 px non
  stanno tutti e tre i conti. La pila non porta il «+N»: il conto è già nel sottotitolo (a quaranta i 27 px del badge
  tagliavano la riga).
- **8 · Il dipartimento aperto**: i **tre numeri della Console** (al lavoro, da approvare, spesi oggi) e le sue cinque
  sezioni, con **un solo spostamento**: «Da approvare» sale dalla quarta alla seconda posizione, perché il telefono è
  l'attrezzo con cui si decide e le righe sono decidibili sul posto (la stessa `m.decidi` di tutte le altre pagine). Le
  esecuzioni di oggi sono le card dell'Agenda (lime in corso, rosa ferma, tratteggiata pianificata); i dipendenti portano
  alla conversazione, l'unica pagina del dipendente che il telefono ha; gli obiettivi hanno l'avanzamento e la scadenza a
  chip (rosa con la fiamma se in ritardo); la spesa per cliente viene dallo stesso `m.costi('mese', dip)` della Console.
- Niente di nuovo nel modello: tutto da `m.perDip`, `m.obiettiviDi`, `m.costi`.
- **Un difetto trovato e corretto**: `AMMINISTRAZIONE` a 30 px chiede 292 px e la riga del titolo ne ha 234 — usciva dallo
  schermo. Oltre i dodici caratteri il titolo si stringe a 22 px (214 px), gli altri tre nomi restano a 30.
- La navigazione in basso, `NOMI`, `?schermata=` (ora 1…8) e `?dip=` sono aggiornati; i telefoni predefiniti sono otto.

#### C · I controlli inerti: la regola

**Il conto della lista era sbagliato per difetto, e di parecchio.** Contati aprendo le otto pagine della Console e gli otto
telefoni e prendendo solo i controlli senza azione *e senza un antenato cliccabile*: **263**, non 61. La lista contava i 52
cerchi delle intestazioni ma non le **76 pillole di filtro** delle stesse intestazioni, che sono la stessa famiglia (le tre
pillole della «Spesa del mese» che la lista citava erano tre di settantasei).

**La regola, in una riga: un controllo si vede solo se fa quello che promette, con i dati che ci sono già.** Due prove —
*serve* in questa sezione? *si può fare* col modello? — e chi le passa diventa vero, chi ne fallisce una sparisce.

Applicata:

| Famiglia | Prima | Dopo |
|---|---|---|
| cerchio «cerca» nelle intestazioni | 22 | **7 veri** (un campo che filtra mentre si scrive), 15 spariti |
| cerchio «filtri» (i cursori) | 22 | **0**: dove ci sono le pillole il filtro è già lì e visibile, dove non ci sono il cerchio non ha niente da aprire |
| cerchio «scarica» | 6 | **0**: la pagina gira anche come artefatto, in una sandbox dove uno scaricamento non parte, e un pulsante che non scarica è una promessa |
| cerchi «griglia» e «righe» | 2 | **2 veri**: scelgono la forma della card dipendente, che la Console aveva già in due varianti |
| pillole di filtro nelle intestazioni | 76 inerti | **57 vere**, 19 sparite |
| «Impostazioni del dipartimento», la matita «Modifica» del soul prompt | 2 | **0**: il modello non ha impostazioni di dipartimento né un editor del prompt |
| telefono: «Cerca» ×2, «Ordina» ×2, «Ordina e filtra», «Commenta» | 6 | **2 veri** (la ricerca fra le conversazioni, che a quaranta sono 40; «Commenta», che ora apre la conversazione), 4 spariti |
| freccia «indietro» sulla home | 1 | **0**: dalla home non si torna indietro |
| i due cerchi in fondo alla card obiettivo | 2 | **2 veri**: la conversazione con chi ci lavora, le richieste di quel cliente |

**La soglia di «cerca»: più di dodici righe in una delle due taglie dell'azienda.** Sotto, la lista sta in una schermata e si
legge; un cerchio «cerca» su una sezione di quattro card non serve a niente, e farlo funzionare sarebbe onesto quanto
toglierlo ma costerebbe di più. Le sette che restano, con le righe contate a 11 → 40: Dipendenti della home (12 → 41),
Storico delle richieste (16 → 28), Colloquio (16), Log dell'esecuzione (fino a 13), Costi per dipendente (11 → 40), Eventi di
oggi dell'agenda (8 → 26), Conversazioni della chat (11 → 40).

**Le pillole sparite e perché**: i giorni passati della sezione «Oggi» del dipendente, i 90 giorni e il «per cliente» del
Rendimento (il dossier ha solo i 30 giorni e i 30 precedenti), i mesi passati del Budget, «Esempi allegati» e «Regole del
dipartimento» del soul prompt, «Questo mese» della settimana dell'Agenda (il modello non ha una vista mensile), «Connessioni»
e «Aggiungi uno strumento» degli Strumenti (la prima è un'altra lista, la seconda è un'azione), «Concluse oggi» delle
esecuzioni del dipartimento e «In corso / Pianificate / Errori» di «Al lavoro adesso» — quelle due sezioni elencano solo chi
sta lavorando o ha un'esecuzione oggi, e quei valori non ci sono dentro.

**Come funziona la ricerca**: il cerchio si apre in un campo al suo posto dentro l'intestazione; si filtra a ogni tasto; il
conto «N di M» sta nel **contatore della sezione** e non anche nel campo (lo stesso numero non si scrive due volte a 300 px di
distanza: la regola della correzione 16a); Esc o la × chiudono. Lo stato è `st.cerca` (per sezione) e `st.sez` (la pillola
scelta, per sezione); gli attrezzi comuni sono `cercaSez`, `filtraCerca`, `pilleSez`, `filtraSez`, `contoSez` in
`direzione-a.js`.

**Che cosa resta inerte, e perché non l'ho toccato** (128 elementi, tutti fuori dalla lista dell'utente):
- **84 frecce `i-ne`** in fondo a righe e card che non aprono niente (12 nello storico approvato delle Richieste, 12 sui casi
  del colloquio, 10 sulle righe dei costi del dipendente, e così via). Sono la stessa forma su ogni riga del prodotto:
  toglierle cambia l'aspetto di ogni riga e ogni card, che è più di quello che il lavoro chiedeva. **Da fare, con una
  decisione dell'utente davanti.**
- **36 indicatori nell'intaglio delle card** (la campanella col punto rosa, la matita, il bersaglio, lo scarica del
  Riepilogo): sono disegnati come cerchi ma dicono uno stato, non sono controlli, e vengono dal riferimento.
- **9 campanelle** in alto a destra della cornice (una per pagina): stesso caso.

#### Verifica

- Le quattro prove cliccate passano: `console.js` **97** (erano 82: quindici verifiche nuove sui controlli delle sezioni),
  `mobile.js` **69** (erano 39: trenta sul quadro del giorno e sui Dipartimenti), `costi.js` 48, `agenda-chat.js` 54.
  In tutto **268**.
- Zero controlli inerti nelle **72 intestazioni** delle nove pagine, a undici e a quaranta, controllato dalla prova.
- Nessuno schermo del telefono scorre di lato, a undici e a quaranta; nessuna parola tagliata nelle caselle del quadro né nei
  sottotitoli dell'elenco dei dipartimenti.
- Le catture della Console cambiano tutte, come deve essere: le intestazioni di sezione sono su ogni pagina. Le catture della
  sola barra (`a-barra-*.png`) sono identiche byte per byte: la barra non è stata toccata.

#### Scelte fatte in costruzione, da confermare

- La forma 2 del quadro del giorno, «due per due» (scelta dall'utente il 2026-09-07).
- «Da approvare» seconda invece che quarta nel dipartimento del telefono.
- La casella «ferma» del quadro porta alla conversazione e non all'Agenda.
- La soglia dei dodici per «cerca», e le sette sezioni che se la tengono.
- Le pillole tolte perché il modello non ha il dato (elenco qui sopra).
- Il titolo del dipartimento che si stringe oltre i dodici caratteri.
- «scarica» sparisce da tutte e sei le sezioni invece di scaricare davvero.


### Versione 18: le frecce di riga (2026-09-07, sessione successiva)

Il candidato 1 del passaggio di consegne, scelto dall'utente. La regola c'era già (regola 25 della versione 17, portata
qui dalle intestazioni alle righe e diventata la **regola 26**): *la freccia resta dove la riga ha una destinazione e
sparisce dove non ce l'ha*. Il lavoro non era decidere la regola ma **far vedere che cosa diventa il prodotto quando la
si applica**, perché tocca ogni riga e ogni card.

#### 1 · Il censimento: 260, non 84

Il conto di 84 del passaggio di consegne era fatto su un insieme ridotto di pagine. Contando aprendo le pagine e
prendendo ogni `i-ne` che non ha `data-az` **né su di sé né su un antenato**, le frecce senza azione erano:

| | Frecce inerti |
|---|---|
| L'insieme di riferimento (le nove pagine della Console a undici, più tendina, Riepilogo ed editor) | **86** |
| Tutte le pagine e tutte e due le taglie dell'azienda (28 viste della Console + le 8 del telefono) | **260** |
| Sul telefono | **0** — il telefono ha una freccia sola, ed è viva |

Le frecce vive erano 492: il prodotto ne aveva **752** in tutto, e una su tre non apriva niente.

#### 2 · Le diciotto famiglie, e per ognuna se la riga una destinazione ce l'ha

Contate sull'insieme di riferimento (a quaranta i numeri crescono, le famiglie no).

| Famiglia | N | La riga ha una destinazione? |
|---|---|---|
| Storico delle Richieste (`rigaStorico`, in quattro punti: Richieste, «Oggi» e «Rendimento» del dipendente, «Consegne precedenti» dell'esecuzione) | 22 | **No** per le richieste decise: il pannello della richiesta si apre solo per quelle in attesa, e una richiesta decisa non ha una pagina. Le righe in attesa una destinazione ce l'hanno e la freccia la tengono |
| Casi del colloquio | 12 | No: un caso è un nome, un atteso, un esito e un punteggio; non esiste una pagina del caso |
| Log dell'esecuzione | 9 | **No** per passi, strumenti, modello e note; **sì** per la voce che parla di una richiesta in attesa, che la apre già oggi (e mostra il gallone, non la freccia) |
| Rendimento, le righe delle metriche | 5 | No: sono misure, non oggetti. La strada verso le richieste che le producono sta già nell'intestazione della sezione |
| Colloqui precedenti | 4 | No |
| Regole di approvazione (card) | 4 | No: non c'è una pagina della regola |
| Budget e permessi | 4 | No |
| Passi dell'esecuzione | 4 | No: la tendina del passo è un punto aperto mai costruito |
| Revisioni passate | 3 | **Sì, per una su tre**: la revisione del *soul prompt* con due versioni ancora nel dossier apre il confronto fra le due, che nel prodotto esiste già (`confronta`). Non ce l'hanno la revisione del *modello* (il confronto è solo fra versioni del prompt) né quella che punta a una versione mai entrata nel dossier |
| Strumenti e connessioni | 3 | No |
| Costo dell'esecuzione (per passo, strumento, modello) | 3 | No: è la stessa cosa vista in tre modi, nessuno dei tre ha una pagina |
| Costi · per modello | 3 | No: i livelli si scelgono nel dossier del dipendente, non si aprono |
| Obiettivi del dipartimento (card) | 3 | No, e la freccia ripeteva l'occhio che sta già nella card |
| Consegne dell'esecuzione (card) | 2 | Come il log: sì solo quando la consegna è una richiesta in attesa |
| Per cliente (Costi e Spesa del mese) | 2 | Sì per i clienti del modello — e lì la freccia era già viva; no per le voci che clienti non sono |
| Esito del colloquio (card) | 1 | No |
| Diario nel Riepilogo (card) | 1 | No: non c'è una pagina del diario |
| **Card del dipendente in anteprima, dentro l'editor** | 1 | **Eccezione**: non è un controllo, è il disegno di come verrà la card. Toglierle matita e freccia farebbe mentire l'anteprima. Resta, dichiarata |

**Il conto: 86 → 2** sull'insieme di riferimento, **260 → 2** su tutto (le due sono le anteprime dell'editor, contate una
per ognuna delle due viste). Le frecce vive salgono da 492 a **496**: le quattro sono la revisione passata del prompt,
che prima era ferma e adesso apre il confronto.

#### 3 · Le tre cose che si sono imparate applicandola

**a. La colonna segue la freccia, ma la decide la lista, non la riga.** Ogni riga del prodotto finisce con una colonna
da 32 px (più 10 di gap) che tiene la freccia. Togliere la freccia e lasciare la colonna vuol dire lasciare 42 px di
niente in fondo a ogni riga: in una lista di dodici casi si legge come un errore. Ma toglierla riga per riga
disallineerebbe le liste in cui qualche riga la freccia ce l'ha ancora. Quindi:

> Se **nessuna** riga della lista ha una destinazione, cade anche la colonna (classe `nofr`) e il contenuto si riprende
> i 42 px. Se **qualcuna** ce l'ha, la colonna resta per tutte e la cella è vuota dove la destinazione non c'è.

Le liste miste sono quattro (lo storico dentro «Oggi» del dipendente, le consegne precedenti della serie, il log, la
spesa per cliente) e sono le più interessanti da guardare: nel log **nove righe su dieci perdono la freccia e una la
tiene**, e per la prima volta si vede a colpo d'occhio qual è l'unica cosa cliccabile di quella sezione. La prova
controlla che tutte e **65** le liste con più di una riga abbiano le righe sulla stessa griglia.

**b. L'intaglio è il taglio che fa posto ai pulsanti: senza pulsanti è un buco per niente.** Otto card avevano
nell'intaglio la sola freccia inerte (le quattro regole di approvazione, l'esito del colloquio, due consegne, il diario
del Riepilogo): hanno perso la freccia e con lei l'intaglio, e sono tornate card intere. È fedele al riferimento, dove
l'intaglio c'è perché ci sono i pulsanti. Un guadagno inatteso: la card dell'esito del colloquio teneva liberi 120 px
sotto il titolo per due pulsanti che adesso non ci sono, e il sottotitolo ci finiva tagliato («v7 · Standard · 18 min…»);
i 120 px sono tornati al sottotitolo, che adesso si legge intero. Le card che nell'intaglio hanno ancora qualcosa
(la campanella degli obiettivi, la campanella con il punto delle consegne da approvare) l'intaglio se lo tengono.

**c. Applicare la regola non è solo togliere.** Una famiglia su diciotto una destinazione ce l'aveva e non era
collegata. La domanda giusta non è «questa freccia funziona?» ma «questa riga dove porterebbe?»: se una risposta c'è si
collega, se non c'è sparisce. Su diciotto famiglie la risposta è stata sì una volta sola — ed è un buon segno, non un
cattivo segno: vuol dire che il prodotto non aveva pagine nascoste da collegare, aveva promesse da ritirare.

#### 4 · Che cosa cambia sullo schermo, in numeri

Delle quarantotto catture di `scatta.js`, **trentaquattro sono identiche byte per byte**: tutte e dieci quelle del
telefono, la home a undici e a quaranta, la Chat, l'Agenda, le tendine, la barra e l'editor. Le quattordici che cambiano
sono le pagine che hanno righe o card senza destinazione, e il riquadro delle differenze sta sempre dove stanno quelle:

| Cattura | Riquadro dei pixel cambiati |
|---|---|
| `a-riepilogo.png` | `x 1363–1425, y 567–630` — 62×63 px, l'intaglio della card del diario e basta |
| `a-sez-spesa-oggi.png` | `x 2544–2607, y 264–327` — una freccia sola, quella della riga «per cliente» che cliente non è |
| `a-costi.png`, `a-costi-40.png` | solo la fascia destra delle righe (`x 917–1405`) |
| `a-richieste.png`, `a-dipartimento.png`, `a-dipendente*.png`, `a-esecuzione*.png`, `a-sez-costo-passo.png` | le liste e le card delle famiglie qui sopra |

#### Verifica

- Le quattro prove cliccate passano: `console.js` **107** (erano 97: dieci verifiche nuove sulle frecce),
  `mobile.js` **70** (era 69), `costi.js` 48, `agenda-chat.js` 54. In tutto **279** (erano 268).
- Zero frecce senza azione su tredici pagine, quattro viste e le due taglie, controllato dalla prova; le due
  dell'anteprima dell'editor sono contate a parte e dichiarate.
- Sessantacinque liste con più di una riga, tutte allineate.
- La revisione passata del prompt apre davvero il confronto v6/v7, con le due versioni affiancate.

#### Le catture del prima/dopo

`a-frecce-storico.png` (la famiglia scelta per il punto 2), `a-frecce-log.png` (la lista mista), `a-frecce-colloquio.png`
(i casi, i colloqui precedenti e la card dell'esito che si riprende il sottotitolo), `a-frecce-revisioni.png` (l'unica
freccia che resta) e `a-frecce-card.png` (le card che perdono l'intaglio). Si compongono con
`design-system/tools/affianca.js` dalle stesse sezioni catturate nelle due copie dell'albero (`git archive HEAD` per il
«prima»), quindi stanno in `FUORI` dentro `scatta.js`: non si rifanno da sole.

#### Scelte fatte in costruzione, da confermare

- **La famiglia mostrata per prima è lo storico delle Richieste** (punto 2 del prompt, scelta mia perché l'utente non ha
  risposto): è la più numerosa, sta su una pagina intera di righe, e nella stessa sezione contiene sia righe con una
  destinazione sia righe senza — quindi mostra la regola tutta in una schermata.
- La colonna decisa dalla lista e non dalla riga (punto 3a): l'alternativa era lasciarla sempre, e le liste uniformi
  sarebbero rimaste con 42 px vuoti in fondo a ogni riga.
- L'intaglio che cade con l'ultimo pulsante (punto 3b), e i 120 px restituiti al sottotitolo dell'esito.
- La revisione passata del prompt che apre il confronto (punto 3c): è l'unica freccia nuova del prodotto.
- L'anteprima dell'editor che tiene matita e freccia, dichiarata come i 45 indicatori della versione 17.
- Il gallone `i-chevr` del log resta dov'è (la riga che apre una richiesta): la regola dice dove sta una freccia, non
  quale freccia.


## 5. File

| File | Ruolo |
|---|---|
| `dati.js` | modello sintetico (11 e 40) condiviso; dalla versione 17 anche i gruppi del giorno (`gruppiOggi`), letti dalla barra della Console e dal quadro del telefono; dal 2026-09-04 anche il dossier del dipendente (`dossierDi`, `revisioneDi`, `decidiRevisione`, `MODELLI`), le richieste di tipo `revisione` e l'esecuzione (`esecuzioneDi`: sei scritte a mano, le altre generate); dal 2026-09-05 la decisione del titolare (`decidi`), condivisa fra Console e telefono; `azienda.scadenzaMese` per la linea del tempo del mobile; dal 2026-09-06 l'aggregatore dei costi (`costi(periodo, dip)`, `spesaDi`) per la pagina Costi e la sezione «Spesa del mese», e (versione 15) l'agenda (`giornata`, `settimana`, `scadenze`) e i fili della chat (`filoDi`, `scrivi`, `fili`, `nonLetti`) per la Console e per il telefono |
| `comune.js` | sprite di icone di DGT, prefisso CSS, utilità |
| `../componenti.js` (`schermate/componenti.js`) | dal 2026-09-06 (versione 14) i componenti della Console condivisi con il telefono e con le pagine degli avatar: il CSS delle primitive (`.rb`, `.av`, `.pair`, `.pill`, `.chip`, `.dots`, `.badge`, `.ncard`/`.nt`, `.lead`, `.task`, `.crow`, `.hrow`, `.erow`, `.qrow`, `.dcard`, `.ripart`/`.leg`, e dalla versione 15 le bolle della chat `.msg`/`.bub`), `variabili`, e `av`, `pair`, `dots`, `chipStato`, `chipEsito`, `messaggio`, `iconaTipo`, `nomeTipo`, `eur`, `delta`, `differenze`; `window.DGT_COMPONENTI`, va caricato dopo `comune.js` e il suo CSS messo in pagina prima di quello della Console |
| `direzione-a.js` / `.html` | Console (direzione scelta): home, due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente (creazione e modifica), pagina Dipendente con la revisione di performance e la tendina delle versioni, pagina Esecuzione (passi, log, output, costo), pagina Costi (per dipartimento, dipendente, cliente, modello, strumento, con le pillole del periodo per sezione; `?pagina=costi`), pagina Agenda (barra del giorno, eventi, scadenze, settimana; `?pagina=agenda`) e pagina Chat (fili, filo aperto, barra di scrittura; `?pagina=chat&filo=4`, versione 15); dalla versione 16 la barra «Oggi in azienda» è il quadro del giorno in caselle contate (`barraStato`, che legge `m.gruppiOggi()`; `?barra=0` rimette quella di prima) e la barra dei passi si stringe da sola; dalla versione 17 i controlli delle intestazioni di sezione seguono la regola «un controllo si vede solo se fa quello che promette» (`cercaSez`, `filtraCerca`, `pilleSez`, `filtraSez`, `contoSez`, stato in `st.cerca` e `st.sez`) e dalla versione 18 la stessa regola vale per le **frecce di riga** (regola 26: la freccia sta solo dove la riga ha una destinazione; `soloDecise`, `logSolo` e `versoConfronto` dicono per lista se la colonna da 32 px cade, classe `nofr`); cliccabile; dalla versione 14 prende le primitive da `../componenti.js` e tiene la cornice, le pagine, le tendine e `monta` |
| `mobile.js` / `.html` | il telefono del titolare: le approvazioni (versioni 11 e 12, schermate «Da approvare», «Richiesta» — anche la revisione di performance con le due versioni a confronto e le quattro decisioni — e «Riepilogo di oggi», con il rifiuto con motivo e lo stato vuoto a coda finita) e, dalla versione 15, le due tab «Chat» (elenco dei fili e conversazione con la barra di scrittura) e «Agenda» (la giornata sulla linea del tempo, i prossimi giorni, le scadenze); dalla versione 17 il **quadro del giorno** in cima alla schermata 1 (`quadroGiorno`, tre forme dietro `?quadro=0|1|2|3`, la 2 è quella scelta) e la tab **Dipartimenti** (schermate 7 e 8: l'elenco e il dipartimento aperto); otto telefoni affiancati che condividono il modello, la richiesta corrente, il filo aperto e il dipartimento scelto; `DGT_MOBILE.monta`, `coda`; `?schermata=1…8&richiesta=0&filo=4&dip=mkt&quadro=`, `?n=40`; dalla versione 14 carica `../componenti.js` e non più `direzione-a.js` |
| `avatar/avatar-dgt.js` | involucro degli avatar nel linguaggio della Console (colori, stati, simboli statici, animazione); `usa('orbe'|'kit')` sceglie la famiglia |
| `avatar/avatar-orbe.js` | la famiglia «orbe» (versioni 5b, 5c, 7, 7b, 7c): cerchi dal seme con le pupille e lo sguardo del kit, un solo motore `requestAnimationFrame` con funzioni continue del tempo, sguardo che segue il puntatore; senza disco, con le pelli (`pelle('perla'|'grigio'|'chiaro'|'alone'|'disco')`, solo variabili CSS; perla predefinita); `fermo(t)`, `riprendi()`, `fotogramma(svg, t)` per gli screenshot |
| `confronto-avatar.html` | le due famiglie a confronto nelle viste della Console |
| `avatar-pelli.html` | le quattro pelli dell'orbe senza disco a confronto su tutti i fondi della Console, con il selettore che cambia la pelle |
| `avatar-identita.html` | l'identità degli orbi (versione 10, proposta): perle colorate, tinta del dipartimento, toni, carattere degli occhi a confronto sugli undici vicini, sui fondi e nella Console |
| `avatar/avatar-motore.js` | motore del kit impacchettato (generato da `build-motore.js`, non si modifica a mano) |
| `avatar/vendor-avatars/` | sorgenti del motore del kit, verbatim |
| `direzione-b.js` / `.html` | Registro operativo |
| `direzione-c.js` / `.html` | Mappa viva |
| `confronto.html` | pagina di confronto con tab e selettore 11/40 |
| `build-unico.js` | genera il file unico per l'artefatto (`node build-unico.js direzione-a.html out.html`) |
| `scelta-barra.src.html` | la pagina delle quattro scelte per la barra «Oggi in azienda», con il voto condiviso: quella che il titolare ha mandato al collega. Sorgente, non pagina: le catture sono segnaposto `IMG:<nome>`, quindi non si apre da sola |
| `costruisci-scelta.js` | costruisce `scelta-barra.html` dal sorgente, incorporando i PNG di `screenshot/` come data URI, più le otto catture del commutatore undici / quaranta (`node costruisci-scelta.js [out.html]`). Il risultato non entra nel repository (megabyte di base64): si rifà in un comando |
| `scatta.js` | rigenera le catture di `screenshot/` dalla lista di parametri dichiarata nel file (`node scatta.js`, `console` / `barra` / `quadro` / `dip` / `controlli` per un gruppo, `--in <cartella>` per il confronto prima/dopo); le catture che restano fuori sono elencate in `FUORI`, e dalla versione 18 ci sono anche i prima/dopo `a-frecce-*.png` e `m-conta-titolo.png`, che vogliono l'albero della versione precedente e si compongono con `design-system/tools/affianca.js` |
| `screenshot/` | catture a 1440 px (`design-system/tools/screenshot-page.js`); le cornici del telefono (`mobile-*.png`: le versioni 11 e 12, le quattro della revisione rifatte nella versione 14 e le tre schermate nuove `mobile-4-chat`, `mobile-5-filo`, `mobile-6-agenda` della versione 15) e le sezioni delle pagine Costi (`a-costi-*.png`, versione 13), Agenda e Chat (`a-agenda-*.png`, `a-chat-*.png`, versione 15) con `screenshot-elementi.js`; le catture dello studio della barra (`a-barra-*.png`, versione 16) e quelle della versione 17: la forma scelta del quadro del giorno e le due scartate, le due schermate dei Dipartimenti (`m-*.png`), i controlli delle sezioni (`a-sez-*.png`); della versione 18 i prima/dopo delle frecce di riga (`a-frecce-*.png`) e il confronto del conto nel titolo del telefono (`m-conta-titolo.png`), composti con `affianca.js`. Si rigenerano con `scatta.js`, tranne quelli elencati in `FUORI` |
| `prove/` | le prove cliccate con Playwright, con il `README.md` che dice il comando: `console.js` (107 verifiche: tendine, Richieste, editor, esecuzione, 40, la barra «Oggi in azienda» e la barra dei passi, dalla versione 17 i controlli delle intestazioni di sezione e dalla 18 le frecce di riga), `mobile.js` (70: le schermate delle approvazioni, revisione, rifiuto con motivo, prova, stato vuoto, 40, dalla versione 17 il quadro del giorno e la tab Dipartimenti e dalla 18 il conto delle frecce), `costi.js` (48: la pagina dei Costi) e `agenda-chat.js` (54: le pagine Agenda e Chat della Console e le due tab del telefono, versione 15); leggono `LOCAL_FONT_CSS`, `PLAYWRIGHT_MODULE`, `CHROME_PATH` |

Per gli screenshot: `design-system/tools/screenshot-page.js` (vedi `design-system/tools/README.md`).
