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
freccia che resta), `a-frecce-esecuzione.png` (i passi e i tre modi di guardare il costo) e `a-frecce-card.png` (le card
che perdono l'intaglio). Si compongono con
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

#### Coda: la misura del conto nel titolo (studio del 2026-09-07)

Alla vista della versione 18 l'utente ha chiesto di rivedere il prezzo pagato nella versione 17 per far stare il quadro
«due per due»: la riga dei due numeri grandi tolta dalla schermata 1 e il conto passato dentro il titolo. Tre forme
disegnate nel telefono vero dietro `?conta=`, catturate e affiancate in `m-conta-titolo.png`:

| `?conta=` | Che cos'è | Card visibile sopra la navigazione | La riga di approva e rifiuta |
|---|---|---|---|
| **1** (la scelta di adesso) | conto a 26, come il titolo | **248** px su 256 | sopra, 4 px di margine |
| **2** (la strada di mezzo) | titolo a 26, conto a **36** | **244** px su 256 | sopra |
| **0** (com'era prima) | la riga dei due numeri grandi | **176** px su 256 | **sotto**: la decisione va cercata scorrendo |

**La strada di mezzo costa 4 px.** Il numero torna a essere la prima cosa che si vede — quello che faceva la riga dei due
numeri grandi — senza ricomprarne i 78 px di altezza: il conto eredita l'interlinea del titolo e le cifre non hanno
discendenti, quindi la riga cresce di 4 px e basta. Misurato: nessuna delle due forme va a capo o sfora, **nemmeno con un
conto a tre cifre** (il modello ne fa 4 a undici dipendenti e 7 a quaranta, ma il numero non ha un tetto).

Una correzione a quello che diceva la versione 17: il commento nel codice motivava il titolo a 26 px con lo spazio che
resta al conto a due cifre. Il conto non c'entra — a 26 come a 36 ci stanno tre cifre senza sforare. **Quello che manda
il titolo a capo è la parola**: «DA APPROVARE» a 30 px chiede 214 px su 222 di riga libera, e col numero e lo stacco non
ci sta. Il titolo sta a 26 per la sua larghezza, non per la misura del numero.

Quattro verifiche nuove in `prove/mobile.js` inchiodano le tre misure, e la terza (`?conta=0` che rifà cadere la riga di
approva e rifiuta sotto la navigazione) impedisce di ripagare per sbaglio un prezzo già pagato una volta.

**La scelta dell'utente è la 2** (2026-09-07): `CONTA = 2` in `mobile.js`, le altre due restano dietro il parametro come
`?quadro=1|3`. La ragione, con i tre telefoni affiancati davanti: **a 26 il numero si legge come la coda del titolo, a 36
torna a essere un conto** — che è quello che faceva la riga dei due numeri grandi, e che le costava 78 px di altezza. Qui
ne costa 4.

Il prezzo vero della scelta non sono i 4 px di card ma il margine sotto: la riga con approva e rifiuta passa da 4 px di
stacco sopra la barra di navigazione a **0**. Ci sta ancora tutta — la prova lo controlla a ogni giro — ma non c'è più
niente da spendere: se un domani il quadro o la card crescono di un pixel, la riga della decisione finisce sotto, ed è la
prova a dirlo prima delle catture.


### Versione 19: le consegne del dipartimento (2026-09-07, sessione successiva)

**La scelta dell'utente**, dopo l'analisi della sezione 6: si comincia dal **candidato 6**, **strada A** (una sezione in
più sulla pagina Dipartimento, nessuna pagina nuova nel rail), e la parola è **«consegna»**.

#### 1. La parola prima della forma

L'analisi aveva contato che il prodotto usava **quattro parole per la stessa cosa**: `output` (nel codice e nel titolo
di sezione), «Consegne» (nel contatore della stessa intestazione), `allegato` (nella richiesta), `consegne` (negli
obiettivi e nei costi). Adesso ce n'è una, ed è **consegna**: *la cosa creata da un'esecuzione*.

Sceglierla ha costretto a due rinomine, tutte e due dentro il codice e invisibili sulla pagina:

| Prima | Adesso | Perché |
|---|---|---|
| `consegneDi(e, periodo, approvate)` in `dati.js` — **conta** le consegne di un dipendente per l'aggregatore dei costi | **`contaConsegne`** | ritorna un numero, non un elenco; e il nome buono serviva all'elenco |
| `rigaConsegna(m, r)` in `mobile.js` — la riga di una **richiesta** in coda | **`rigaRichiesta`** | prende una richiesta, non una consegna |

`consegneDi(dip)` è adesso l'elenco delle consegne di un dipartimento. **Il primo tentativo è finito in
`SyntaxError: Identifier 'consegneDi' has already been declared`**: è la nota tecnica già scritta («i nomi si
scontrano: prima di sceglierne uno, cercarlo») che vale per le funzioni e non solo per le classi.

#### 2. Che cosa mostra, e da dove viene

`consegneDi(dip)` non porta **nessun numero nuovo**: raccoglie gli `output` delle esecuzioni dei dipendenti del
dipartimento, quelli che la pagina Esecuzione disegna già nella sua sezione. In più collega due cose che il modello
aveva e nessuno leggeva insieme:

- **il passo che l'ha prodotta**, letto da `quando` («passo 2 · 10:18»), con il suo esito, i suoi strumenti, la sua
  durata e il suo costo;
- **le voci di log di quel passo** (`x.log`, campo `passo`), che finora leggeva solo la sezione «Log».

| | Sviluppo | Marketing | Vendite | Amministr. | In tutto |
|---|---|---|---|---|---|
| Consegne a undici | **7** | 5 | 4 | 2 | **18** |
| Consegne a quaranta | 10 | 10 | 10 | 10 | **40** |

#### 3. Che cosa costa, in pixel

La sezione sta **seconda su sei**, subito sotto «Oggi in ‹dipartimento›», perché ne è il risultato: la pagina si legge
*adesso → uscito → chi → obiettivi → da approvare → spesa*, e la regola 2 dice che il «adesso» apre la pagina.

| | Prima | Dopo | Costo |
|---|---|---|---|
| Sezioni della pagina Dipartimento (Console e telefono) | 5 | **6** | — |
| Pagina Sviluppo, a undici | 1 880 px | **2 594 px** | +714 |
| Pagina Marketing, a undici | 2 258 px | **2 960 px** | +702 |
| Pagina Sviluppo, a quaranta | 2 882 px | **3 894 px** | +1 012 |
| La sezione da sola | — | **674 px** (7 card in 2 righe), **972 px** (10 card in 3 righe) | — |

Card di **316×294 px**, quattro per riga, la stessa griglia di «Da approvare». **Zero pagine nuove, zero voci nel rail**
(resta a sei), **zero schermate nuove sul telefono**.

#### 4. Le tre cose che la misura ha deciso al posto di un'opinione

1. **Niente cerchio «cerca» nell'intestazione.** Ce l'avevo messo, e **la prova delle intestazioni mi ha colto in
   fallo**: la soglia del prodotto è **dodici righe** (`SOGLIA_CERCA`) e le consegne di un dipartimento arrivano a
   **dieci** a quaranta dipendenti. Una lista che sta in una schermata si legge, non si cerca. Le cinque pillole
   (Tutte · Da approvare · In corso · Fatte · Da fare) bastano, e sono le stesse quattro parole della pagina
   Esecuzione più una.
2. **Nella riga di stato ci sta il solo chip.** Misurato: `.sel` è `flex:1` accanto a due pulsanti, e quello che resta
   al testo va da **30 a 52 px** — «Passo 3 · 23,6 €» ne chiede 89. Qualunque testo lì finisce nei puntini (succede
   già alle card che c'erano: «Passo 3 di 7», «Chiavi di accesso scadute»), e un testo che non si legge mai è una
   promessa non mantenuta. Il passo, il costo e gli strumenti stanno nella tendina, che è larga il doppio.
3. **Sotto il titolo, il «quando» senza il verbo.** `.meta` non va a capo (primitiva condivisa) e a 316 px
   «Summit Marketing · parte alle 17:00» sforava di **29 px**. Il verbo che il chip di stato dice già
   («consegnato», «approvata», «concluso», «parte», «fermo al») si toglie e resta l'ora.

#### 5. Che cosa vuol dire «aprire una consegna»: una pagina, non la tendina

La domanda che l'analisi aveva lasciato aperta, e su cui l'utente ha corretto la prima risposta. **La prima proposta
era la tendina larga** (quella con cui il titolare apre una richiesta). Il suo giudizio, testuale: *«la tendina per me
è in anteprima presente nel popup a notifica delle approvazioni. Voglio che si apra una pagina dedicata quando si apre
una consegna.»*

**Ha ragione, e la ragione è un confine fra due mestieri.** La tendina serve a **decidere in fretta senza perdere la
coda**: è ancorata al pannello delle approvazioni, ha il pager «1 di 4» e le quattro decisioni, e quando la chiudi sei
ancora nella coda. Una consegna invece **si legge**, e nel prodotto tutto quello che si legge ha una pagina: il
Dipartimento, il Dipendente, l'Esecuzione, i Costi. Mettere una cosa da leggere dentro l'attrezzo per decidere le
confonde tutte e due.

Quindi: **`?pagina=consegna&consegna=c1-0`**, nella stessa cornice delle altre — barra in cima, titolo con i numeri,
rail, sezioni — e la freccia della cornice torna al dipartimento, che è da dove ci si arriva. Sul telefono la stessa
cosa è la **schermata 9** (le altre otto restano quelle che erano).

**Le sezioni, e perché sono quelle:**

| Sezione | Che cosa porta | Quando c'è |
|---|---|---|
| Testata | chi l'ha fatta, i chip (stato, tipo, cliente, esecuzione), la frase che dice dov'è arrivata, e le azioni | sempre |
| **Il contenuto** | il documento vero della richiesta se la consegna è già uscita (testo e allegato), altrimenti l'esito del passo che l'ha prodotta | sempre |
| **Il passo che l'ha prodotta** | numero, nome, durata, costo, gli strumenti, e le **voci di log** di mentre la faceva | quando la consegna nasce da un passo dichiarato: **9 su 18** a undici |
| **La richiesta al titolare** | la riga della richiesta con il suo esito, e la nota del dipendente | quando la consegna è già uscita: **3 su 18** a undici, 0 a quaranta |
| **Le altre consegne** | dell'esecuzione se ce ne sono, se no quattro del dipartimento | sempre |

**Due misure hanno deciso la testata:**
- **Due numeri e non tre.** La Consegna ha i titoli più lunghi del prodotto (32 caratteri, «200 lead e-commerce in
  Lombardia») e con tre la testata **sforava di 77 px**. La durata è il terzo che si toglie: sta già nella sezione del
  passo, con il suo contesto. Provata su tutte e **58 le pagine** (18 a undici, 40 a quaranta): il peggior caso ha
  **118 px di margine**, nessuna scorre di lato, **zero controlli inerti**.
- **Solo i numeri che hanno un valore.** Nove consegne su diciotto nascono da un passo dichiarato e nove no; scrivere
  «—» due volte in cima a una pagina è rumore. Lo stato c'è sempre, il costo viene dal passo o dalla richiesta.

**E una sull'ultima sezione**: a quaranta dipendenti **27 consegne su 40** nascono da un'esecuzione con un solo output,
quindi «le altre consegne dell'esecuzione» sarebbe vuota e la pagina finirebbe dopo il contenuto, mezza nera. Lì la
sezione diventa «le altre consegne di ‹dipartimento›», quattro, una riga, con la pillola che porta alla lista intera.

#### 6. Una ripetizione, misurata

Una consegna che aspetta il titolare compare due volte sulla stessa pagina: in «Consegne di oggi» e in «Da approvare».
Contate: **1 o 2 card per pagina**, e stanno a **1 988–2 302 px di distanza**, cioè due schermate piene — non si vedono
mai insieme. Restano lime tutte e due perché la regola 4 dice che il lime è l'attenzione del titolare e una consegna in
attesa la aspetta davvero. **Si toglie in una riga** (`TONO_CONSEGNA.attesa`) se l'utente preferisce.

#### 7. Verifica

- **Le quattro prove cliccate passano: 141 + 82 + 48 + 54 = 325 verifiche, 0 ko** (erano 284). `console.js` da 107 a
  **141** (la sezione, i filtri, la pagina della consegna, il ritorno al dipartimento, il titolo lungo, i due numeri
  della testata), `mobile.js` da 75 a **82** (la sezione e la schermata 9), `costi.js` e `agenda-chat.js` invariate.
- **La pagina della consegna provata su tutte e 58**, a undici e a quaranta: nessuna sfora (peggior margine 118 px),
  nessuna scorre di lato, **zero controlli inerti**, nessun errore in console.
- **Le prove non si legano più agli indici delle sezioni.** Aggiungere la sesta sezione ha spostato
  `section:nth-of-type(5)` e ne ha rotte tre: adesso un aiutante (`sez('^Spesa')`) cerca la sezione **dal titolo**.
  Stessa correzione in `scatta.js`, dove `a-sez-spesa-oggi` puntava alla quinta sezione.
- Catture nuove nel gruppo `consegne` di `scatta.js`: `a-sez-consegne`, `a-sez-consegne-fatte`, `a-consegna`,
  `a-consegna-richiesta`, `a-consegna-sola`, `a-dipartimento-40`, `m-consegne`, `m-consegna`, `m-consegna-post`.
  **50 su 57 restano identiche byte per byte.** Due delle sette che cambiano sono di sola resa: `a-sez-spesa-oggi`
  (348 pixel su 923 000, la sezione sta 714 px più in basso) e **`a-costi.png`, che cambia in 6 pixel nel riquadro
  `x 1136–1415, y 173–175`** — esattamente quello che la sessione precedente aveva segnalato come instabile per
  `a-11.png`. Dentro una sessione le catture sono stabili (due giri dello stesso codice danno file identici); fra
  sessioni quel riquadro no. La pagina dei Costi non è stata toccata e i suoi numeri non si muovono.
- **Due trappole del repository, tutte e due già scritte nelle note e tutte e due ricadute**: un **backtick dentro un
  commento CSS** (`.doc` fra apici inversi) ha chiuso il template literal e la pagina non caricava; e un nome nuovo che
  esisteva già (`consegneDi`) ha fatto morire il primo tentativo in `SyntaxError`. La nota dice «ci si cade a ogni
  sessione» ed è vero.

#### 8. Che cosa resta da decidere

- **Il perimetro**: la sezione dice «di oggi» e mostra le consegne delle esecuzioni correnti. Il mese non c'è.
- **Il «tempo reale»**: il modello non ha un orologio (`azienda.ora` è `'10:42'` fisso), quindi la promessa che la
  sezione mantiene è «lo stato al momento in cui apri la pagina», con i quattro stati che `giornata()` distingue.
- **La ripetizione** del punto 6.
- Restano fuori, come diceva l'analisi, «che cosa ha creato l'azienda» e «che cosa abbiamo fatto per Rossi Srl»: sono
  il prezzo dichiarato della strada A, e chiederebbero la strada B (una pagina nel rail).

#### 9. Gli artefatti

Console e telefono sono stati ricostruiti con `build-unico.js` (492 292 byte / 5 926 righe la Console, 365 413 / 4 793
il telefono), provati headless — zero errori in console, le sei sezioni del Dipartimento, il clic sulla consegna che
apre la pagina con le sue tre sezioni, il telefono con nove schermate — e **ripubblicati allo stesso indirizzo**:
[Console](https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34) e
[telefono](https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9). Il terzo (la scelta della barra) non
è stato toccato: incorpora otto catture, tutte fra le 50 rimaste identiche. La rilettura obbligatoria della versione
pubblicata è costata **13 letture e circa 200 000 token**: con il CSS e le funzioni della Console i blocchi non
possono superare le 400–450 righe.

### Versione 20: i workflow e il perimetro delle consegne (2026-09-08, sessione successiva)

**Le scelte dell'utente**, prese prima di scrivere una riga di codice (il prompt diceva di chiederle): la consegna in
attesa **resta due volte e lime tutte e due**; il perimetro della sezione prende le **pillole del periodo**; si
costruisce il **candidato 7**; la forma è **l'editor a nodi vero**, contro il 5-0 di un consiglio precedente; la delega
**nasce spenta**; la sezione 07 dello specimen **si ripunta con la palette del sistema**; e la parola è **workflow**
(«è un termine informatico e non credo abbia una vera traduzione»).

#### 1. Il perimetro: le consegne passate esistevano già

La domanda l'aveva posta il passaggio di consegne come «pillole del periodo = inventare dati storici». **Non era
vero, e bastava guardare**: le richieste **decise** sono le consegne uscite in passato, e portano già `giorno`,
`tipo`, `costo`, `testo`, `allegato` e la data della decisione. Il filtro per periodo (`giorno <= 7`, `<= 31`) era
scritto da tre versioni. Zero dati inventati.

| Consegne | oggi | sette giorni | trenta giorni |
|---|---|---|---|
| Tutta l'azienda, a undici | **18** | **30** | **31** |
| Sviluppo · Marketing · Vendite · Amministrazione | 7 · 5 · 4 · 2 | 9 · 11 · 8 · 2 | 9 · 12 · 8 · 2 |
| Marketing a quaranta | 10 | 13 | 17 |

Tre cose decise dalla misura, non da un'opinione:

1. **Il filtro parte da ieri (`giorno >= 1`), non da oggi.** Le decise di oggi sono già nella lista corrente — `r3`,
   «Lista di 120 lead verificati», è puntata da una consegna in corso — e contarle due volte le raddoppierebbe.
   Conseguenza voluta e verificata: **con «oggi» la pagina è identica alla versione 19**, 7 card e 2 594 px su
   Sviluppo, 2 960 su Marketing. Il perimetro non costa niente a chi non lo tocca.
2. **Il cerchio «cerca» lo decide il numero, non io.** `SOGLIA_CERCA` era una costante che nessuno leggeva: adesso la
   ricerca compare quando la lista passa davvero le dodici righe. A «oggi» non compare mai (dieci al massimo); a
   quaranta e trenta giorni Marketing arriva a diciassette e compare da sola. Nella versione 19 il cerchio ce l'avevo
   messo a mano ed era stata una prova a cogliermi in fallo: adesso non può più succedere.
3. **Una pillola in più, «Da rifare».** Le consegne che il titolare ha rimandato indietro (`modifiche`, `rifiutata`)
   esistono solo nei giorni scorsi e nessuna delle cinque pillole le prendeva: sarebbero state raggiungibili solo da
   «Tutte». La parola è quella che la pagina Richieste usa già nel suo terzo numero. E i due stati nuovi dicono
   «Modifiche» e «Rifiutata» come nello storico: `chipOut` prende le parole di `chipEsito`, non ne inventa altre.

#### 2. Il workflow: che cosa il consiglio ha detto, e che cosa la misura ha corretto

Le tre domande residue — che cos'è un nodo, dove vive il canvas, da dove nasce un workflow — sono passate dal
consiglio (regola fondamentale). **Cinque pareri su cinque hanno risposto «il nodo è un dipendente»**, e tutti e
cinque hanno poi scritto, come obiezione a sé stessi, che il passaggio di mano fra due dipendenti non sta nei dati.

**L'ho misurato: zero casi, in tutte e due le taglie.** Non «pochi»: zero. Quello che esiste sono **4 riferimenti alla
propria consegna passata** (a undici; zero a quaranta) e **11 `serie`**, tutte dello stesso dipendente. Un canvas di
nodi-dipendente avrebbe chiesto di inventare la relazione che lo regge, nella pagina che deve dimostrare che i numeri
sono veri. **Quello che si misura si misura, non si vota** — e qui la misura ha battuto un 5-0.

Quindi: **il nodo è un passo**, che nel modello c'è davvero (43 a undici, 156 a quaranta, con modello, strumenti,
costo, durata ed esito), e **l'ultimo nodo è il titolare**, che nei dati c'è pure — l'ultimo passo di ogni
dipartimento è già «Consegna al titolare» (`PASSI_DIP`), e la consegna lì si ferma per davvero. Il nodo del titolare
porta la **regola** di `m.regole` che l'ha fermata: il workflow non sostituisce le quattro regole, **le fa vedere**.

L'attesa che il canvas era stato scelto per mostrare c'è, e senza inventare un secondo dipendente.

#### 3. Che cosa ha trovato la revisione incrociata (ed è di nuovo la parte che ha cambiato la risposta)

| Trovato | Verificato nel codice |
|---|---|
| **La premessa del contesto era sbagliata, ed era mia**: avevo scritto che le 4 regole di approvazione stanno nella pagina Dipendente | **Vero, sbagliavo io**: stanno in **Richieste**, terza sezione (`direzione-a.js:989`), e sono **card** `ncard lead`, non righe. Tutti e cinque i consiglieri hanno costruito sulla pagina sbagliata |
| La Console ha **nove** pagine, non sette: il canvas è la **decima** superficie | Vero, `render()` ne smista nove |
| **Due regole fantasma**: `r16` «Fatture ricorrenti» e `r17` «Follow-up» sono citate su richieste decise ma non esistono in `m.regole` | Vero. Difetto del modello, **preesistente e non corretto qui**: sta nei punti aperti |
| `scatta.js` inchioda `section:nth-of-type(2)` sul Dipartimento: una settima sezione romperebbe **le catture**, non solo le prove | Vero |
| Rendere cliccabili le 4 card delle regole **riaprirebbe la regola 26** (hanno perso freccia e intaglio nella versione 18 proprio perché non avevano destinazione) | Vero |
| Un nodo-titolare col disco in tinta **violerebbe la regola 19** (il disco in tinta è un dipendente AI) | Vero: il nodo del titolare non porta avatar, e una prova lo controlla |
| «Il titolare non compare mai nelle righe dell'Esecuzione» (detto da tre pareri) | **Falso**: `tipo: 'titolare'` e `.lrow.titolare` esistono |
| «Il passaggio di mano esiste, `dati.js:482`» (detto da una revisione) | **Falso**: quella riga sta nell'esecuzione del dipendente 1 e `r5` ha `chi: 1` — è la stessa mano che rilegge sé stessa |
| **Il telefono: zero menzioni** in cinque pareri su cinque | Vero, e da lì è nata la schermata 10 |

Due delle otto sono affermazioni **sbagliate dei revisori**, trovate controllandole: è la quarta volta in questo
repository che un conto fatto senza aprire il codice finisce in un documento. La regola tiene: si guarda, non si crede.

#### 4. Che cosa è stato costruito, e a che prezzo

**La pagina Workflow** (`?pagina=workflow&dip=…` per l'elenco, `&workflow=w1&nodo=n` per il canvas), decima superficie
della Console. Tre sezioni: il canvas, la firma anticipata con i suoi tre freni, gli altri workflow del dipartimento.

| | Numero |
|---|---|
| Workflow a undici (Sviluppo · Marketing · Vendite · Amministrazione) | **6** (1 · 2 · 2 · 1) |
| Workflow a quaranta | **26** (6 · 7 · 7 · 6) |
| Nodi per workflow | da **4** a **8** a undici, da 4 a **11** a quaranta |
| Elementi sul canvas (nodi + porte) | fino a **24** a undici, **36** a quaranta — la figura di riferimento ne ha **17** |
| Sezioni aggiunte alla pagina Dipartimento | **zero** |
| Voci aggiunte al rail | **zero** (resta a sei) |
| Altezza della pagina Dipartimento | **2 594 / 2 960 px, invariata** |

**L'ingresso è una pillola nell'intestazione di «Oggi in ‹dip›»**, non una settima sezione: una sezione sarebbe
costata ~700 px misurati e avrebbe spostato gli indici `nth-of-type` su cui si reggono tre prove e due catture. È la
quarta strada proposta da un consigliere, e l'unica delle cinque che teneva conto dell'impianto di prova.

**Il canvas si dispone da solo**: cinque nodi per riga su una griglia a serpentina (la riga dispari va all'indietro,
così i connettori non si incrociano mai), passo 248×210 px, nodi 208×96. Le posizioni si calcolano nella funzione che
stampa e gli archi le rileggono: **nessuna misura presa dopo il disegno**, quindi la pagina è identica a ogni giro.

**Due cose della figura non ci sono, e sono due regole già scritte, non due rinunce:**
- **niente pan e niente zoom** (regola 17: la Console si scala già con `zoom` alla larghezza della finestra, e due
  zoom annidati litigano). Il canvas non si trascina: si stende, e cresce in basso come ogni altra sezione;
- **il verde diventa lime** (regola 4, un solo accento). È l'emendamento a `CLAUDE.md` deciso dall'utente.

**Il nodo si apre** e mostra i suoi campi — modello, strumenti, esito dell'ultima volta — come il nodo selezionato
della figura: è il gesto con cui si modifica il workflow. Il canvas cresce di 168 px quando un nodo è aperto, se no i
campi finirebbero sotto la barra.

**La firma anticipata nasce spenta**, e i suoi tre freni portano numeri misurati: la soglia dal costo vero del
workflow (arrotondato ai 5 € sopra), il perimetro dal cliente dell'esecuzione, la scadenza in esecuzioni. Finché è
spenta la coda resta esattamente com'è: la spina dorsale non si riscrive in questa versione.

**Un workflow nasce da un'esecuzione riuscita**, e «riuscita» vuol dire due cose insieme: almeno due passi conclusi
**e nessun passo rotto**. Senza la seconda, l'esecuzione ferma di Kim («Chiavi di accesso scadute») sarebbe diventata
un modo di lavorare da ripetere. Costo e durata sono **sommati dai passi**, e una prova lo verifica su tutti e sei.

**Sul telefono la schermata 10**: il canvas **girato di novanta gradi**. Lo schermo è 300×620 px dentro `zoom:1.25` e
la regola del telefono dice che non deve poter scorrere di lato: quindi gli stessi nodi, uno sopra l'altro, con lo
stesso connettore lime, le porte come chip e in fondo il nodo del titolare. Non è un canvas ridotto, è lo stesso
oggetto letto in colonna. La firma si accende anche da lì, ed è lo stesso stato della Console.

#### 5. La sezione 07 dello specimen, ripuntata

Dodici occorrenze dei sei verdi che non erano il lime → **zero**. `--egreen` diventa `#B8FC64`, le due tinte del nodo
selezionato `#9AD84B` e `#5F8A2E`, il bagliore `rgb(184 252 100/.55)`, la tessera attiva del rail `#C8FF7E→#A2E052`,
il rosso del tag passa da `#F05A50` al `#F04848` del sistema. Notte, tessere, griglia puntinata, forma dei nodi e
porte con l'etichetta restano quelli del riferimento: **cambia solo la tinta**.

**Una cosa che il verde nascondeva**: sul lime il testo bianco non si legge. Il nodo selezionato porta adesso il testo
all'inchiostro e i suoi campi su bianco al 72 % — è la stessa regola delle pillole lime del prodotto.

I **18 token `--dgt-ed-*`** di `tokens.css` erano morti (nessun file li importa) e restano morti, ma adesso dicono il
vero: tenerli sbagliati sarebbe stato peggio che tenerli inutili.

#### 6. Verifica

- **Le cinque prove cliccate passano: 141 + 82 + 48 + 54 + 60 = 385 verifiche, 0 ko** (erano 325). La quinta,
  `prove/workflow.js`, sta in un file suo apposta: `console.js` sceglie tre sezioni con `nth-of-type` e ogni prova
  nuova che ne aggiungesse una li sposterebbe.
- **Le catture: 52 su 70 identiche byte per byte**, 8 cambiano e 10 nascono. Le 8 sono tutte e sole le pagine
  Dipartimento (Console e telefono). `a-dipartimento.png` cambia in **5 196 px su 3 735 360 (lo 0,14 %)**, nel
  riquadro **`x 986–1412, y 233–680`** — le due intestazioni di sezione — e **l'altezza non si muove** (2 594 →
  2 594). Sul telefono il riquadro è più grande perché le righe dei workflow spingono giù quello che segue.
- **`a-costi.png` è stata riportata com'era**: cambiava di 13 px nel riquadro `x 1136–1425, y 136–175`, cioè
  esattamente la zona che le due sessioni precedenti avevano già segnalato come instabile fra sessioni. La pagina dei
  Costi non è stata toccata.
- Zero errori in console su tutte le pagine nuove, a undici e a quaranta; nessuna scorre di lato; zero controlli
  inerti nella pagina del workflow.

#### 7. Scelte fatte in costruzione, da confermare

- **il nodo è un passo e non un dipendente** (contro il 5-0 del consiglio, per una misura: zero passaggi di mano nei
  dati). Se l'utente vuole il nodo-dipendente, va prima inventato il passaggio di mano nel modello;
- **l'ultimo nodo è il titolare**, e porta la regola che ferma lì la consegna;
- **l'ingresso è una pillola**, non una settima sezione;
- **niente pan, zoom e minimappa** (regola 17), e il canvas che cresce invece di scorrere;
- **la soglia dei 5 €** per arrotondare la soglia di costo, e la **scadenza a 10 esecuzioni**: sono due numeri scelti
  da me, gli unici due della versione che non vengono da una misura;
- **«Da rifare»** come sesta pillola delle consegne;
- sul telefono il workflow è **una colonna**, non un canvas stretto.

## 5. File

| File | Ruolo |
|---|---|
| `dati.js` | modello sintetico (11 e 40) condiviso; dalla versione 17 anche i gruppi del giorno (`gruppiOggi`), letti dalla barra della Console e dal quadro del telefono; dal 2026-09-04 anche il dossier del dipendente (`dossierDi`, `revisioneDi`, `decidiRevisione`, `MODELLI`), le richieste di tipo `revisione` e l'esecuzione (`esecuzioneDi`: sei scritte a mano, le altre generate); dal 2026-09-05 la decisione del titolare (`decidi`), condivisa fra Console e telefono; `azienda.scadenzaMese` per la linea del tempo del mobile; dalla versione 19 le **consegne del dipartimento** (`consegneDi(dip)`, `consegnaDi(id)`: gli `output` delle esecuzioni con il passo che li ha prodotti e le sue voci di log; l'aiutante che le *conta* per i costi si chiama adesso `contaConsegne`); dal 2026-09-06 l'aggregatore dei costi (`costi(periodo, dip)`, `spesaDi`) per la pagina Costi e la sezione «Spesa del mese», e (versione 15) l'agenda (`giornata`, `settimana`, `scadenze`) e i fili della chat (`filoDi`, `scrivi`, `fili`, `nonLetti`) per la Console e per il telefono |
| `comune.js` | sprite di icone di DGT, prefisso CSS, utilità |
| `../componenti.js` (`schermate/componenti.js`) | dal 2026-09-06 (versione 14) i componenti della Console condivisi con il telefono e con le pagine degli avatar: il CSS delle primitive (`.rb`, `.av`, `.pair`, `.pill`, `.chip`, `.dots`, `.badge`, `.ncard`/`.nt`, `.lead`, `.task`, `.crow`, `.hrow`, `.erow`, `.qrow`, `.dcard`, `.ripart`/`.leg`, e dalla versione 15 le bolle della chat `.msg`/`.bub`), `variabili`, e `av`, `pair`, `dots`, `chipStato`, `chipEsito`, `messaggio`, `iconaTipo`, `nomeTipo`, `eur`, `delta`, `differenze`; `window.DGT_COMPONENTI`, va caricato dopo `comune.js` e il suo CSS messo in pagina prima di quello della Console |
| `direzione-a.js` / `.html` | Console (direzione scelta): home, due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente (creazione e modifica), pagina Dipendente con la revisione di performance e la tendina delle versioni, pagina Esecuzione (passi, log, output, costo), pagina Costi (per dipartimento, dipendente, cliente, modello, strumento, con le pillole del periodo per sezione; `?pagina=costi`), pagina Agenda (barra del giorno, eventi, scadenze, settimana; `?pagina=agenda`) e pagina Chat (fili, filo aperto, barra di scrittura; `?pagina=chat&filo=4`, versione 15); dalla versione 16 la barra «Oggi in azienda» è il quadro del giorno in caselle contate (`barraStato`, che legge `m.gruppiOggi()`; `?barra=0` rimette quella di prima) e la barra dei passi si stringe da sola; dalla versione 17 i controlli delle intestazioni di sezione seguono la regola «un controllo si vede solo se fa quello che promette» (`cercaSez`, `filtraCerca`, `pilleSez`, `filtraSez`, `contoSez`, stato in `st.cerca` e `st.sez`) e dalla versione 18 la stessa regola vale per le **frecce di riga** (regola 26: la freccia sta solo dove la riga ha una destinazione; `soloDecise`, `logSolo` e `versoConfronto` dicono per lista se la colonna da 32 px cade, classe `nofr`); dalla versione 19 la sezione **«Consegne di oggi»** della pagina Dipartimento (`cardConsegna`, `PILLE_CONSEGNE`) e la **pagina della consegna** (`paginaConsegna`, `testataConsegna`, `chipPassoStato`, azione `consegna`, `?pagina=consegna&consegna=c1-0`: la tendina resta l'anteprima delle approvazioni, la pagina è dove si legge); cliccabile; dalla versione 14 prende le primitive da `../componenti.js` e tiene la cornice, le pagine, le tendine e `monta` |
| `mobile.js` / `.html` | il telefono del titolare: le approvazioni (versioni 11 e 12, schermate «Da approvare», «Richiesta» — anche la revisione di performance con le due versioni a confronto e le quattro decisioni — e «Riepilogo di oggi», con il rifiuto con motivo e lo stato vuoto a coda finita) e, dalla versione 15, le due tab «Chat» (elenco dei fili e conversazione con la barra di scrittura) e «Agenda» (la giornata sulla linea del tempo, i prossimi giorni, le scadenze); dalla versione 17 il **quadro del giorno** in cima alla schermata 1 (`quadroGiorno`, tre forme dietro `?quadro=0|1|2|3`, la 2 è quella scelta) e la tab **Dipartimenti** (schermate 7 e 8: l'elenco e il dipartimento aperto); dalla versione 19 la sezione **«Consegne di oggi»** anche nella schermata 8, in righe (`rigaConsegna`; la riga della richiesta in coda si chiama adesso `rigaRichiesta`), e la **schermata 9**, la pagina della consegna (`consegna(m, tel, st)`, `?schermata=9&consegna=c1-0`); nove telefoni affiancati che condividono il modello, la richiesta corrente, il filo aperto e il dipartimento scelto; `DGT_MOBILE.monta`, `coda`; `?schermata=1…8&richiesta=0&filo=4&dip=mkt&quadro=`, `?n=40`; dalla versione 14 carica `../componenti.js` e non più `direzione-a.js` |
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
| `scatta.js` | rigenera le catture di `screenshot/` dalla lista di parametri dichiarata nel file (`node scatta.js`, `console` / `barra` / `quadro` / `dip` / `controlli` per un gruppo, `--in <cartella>` per il confronto prima/dopo); le catture che restano fuori sono elencate in `FUORI`, dalla versione 19 c'è il gruppo `consegne` (`a-sez-consegne`, `a-sez-consegne-fatte`, `a-consegna`, `a-consegna-richiesta`, `a-dipartimento-40`, `m-consegne`) e dalla versione 18 ci sono anche i prima/dopo `a-frecce-*.png` e `m-conta-titolo.png`, che vogliono l'albero della versione precedente e si compongono con `design-system/tools/affianca.js` |
| `screenshot/` | catture a 1440 px (`design-system/tools/screenshot-page.js`); le cornici del telefono (`mobile-*.png`: le versioni 11 e 12, le quattro della revisione rifatte nella versione 14 e le tre schermate nuove `mobile-4-chat`, `mobile-5-filo`, `mobile-6-agenda` della versione 15) e le sezioni delle pagine Costi (`a-costi-*.png`, versione 13), Agenda e Chat (`a-agenda-*.png`, `a-chat-*.png`, versione 15) con `screenshot-elementi.js`; le catture dello studio della barra (`a-barra-*.png`, versione 16) e quelle della versione 17: la forma scelta del quadro del giorno e le due scartate, le due schermate dei Dipartimenti (`m-*.png`), i controlli delle sezioni (`a-sez-*.png`); della versione 18 i prima/dopo delle frecce di riga (`a-frecce-*.png`) e il confronto del conto nel titolo del telefono (`m-conta-titolo.png`), composti con `affianca.js`. Si rigenerano con `scatta.js`, tranne quelli elencati in `FUORI` |
| `prove/` | le prove cliccate con Playwright, con il `README.md` che dice il comando: `console.js` (141 verifiche: tendine, Richieste, editor, esecuzione, 40, la barra «Oggi in azienda» e la barra dei passi, dalla versione 17 i controlli delle intestazioni di sezione, dalla 18 le frecce di riga e dalla 19 le consegne del dipartimento; le sezioni si cercano **dal titolo** e non più dall'indice), `mobile.js` (82: le schermate delle approvazioni, revisione, rifiuto con motivo, prova, stato vuoto, 40, dalla versione 17 il quadro del giorno e la tab Dipartimenti, dalla 18 il conto delle frecce e dalla 19 le consegne del dipartimento), `costi.js` (48: la pagina dei Costi) e `agenda-chat.js` (54: le pagine Agenda e Chat della Console e le due tab del telefono, versione 15); leggono `LOCAL_FONT_CSS`, `PLAYWRIGHT_MODULE`, `CHROME_PATH` |

Per gli screenshot: `design-system/tools/screenshot-page.js` (vedi `design-system/tools/README.md`).


## 6. Analisi delle tre proposte nuove (2026-09-07, sessione successiva)

Sessione di **analisi, non di costruzione** (decisione 43): l'utente ha fatto tre proposte e ha chiesto che venissero
analizzate prima di scrivere codice. Per ognuna: che cosa esiste già **contato aprendo le pagine**, che cosa manca
davvero, le strade con il prezzo in numeri, la parola, le conseguenze su quello che è costruito. Le due domande con più
di una risposta difendibile sono passate dal **consiglio** (`llm-council`, regola fondamentale in `CLAUDE.md`): cinque
pareri indipendenti, revisione incrociata anonima, sintesi del presidente. **I verdetti sono da confermare: la
decisione la prende l'utente.**

**Come sono stati presi i numeri.** Un attrezzo di censimento che apre venti viste della Console e due del telefono con
Playwright e conta nel DOM (sezioni, card, righe, frecce, parole), più tre letture del modello dentro la pagina
(`DGT_DATI.modello(11)` e `(40)`). Non un `grep`: la lezione della versione 18 è che a `grep` i conti vengono
**sbagliati per difetto**, due volte su due.

### 6.1 · Il lavoro del dipartimento che si tiene d'occhio (candidato 6)

**Parole dell'utente**: «non c'è una schermata dove si veda chiaramente il lavoro che ogni dipartimento sta svolgendo e
tenerlo d'occhio vedendo cosa è stato fatto, cosa è stato creato, con possibilità di aprire file, artefatti e compiti
svolti, anche in tempo reale».

#### Che cosa esiste già, contato

| | Contato |
|---|---|
| Sezioni della pagina **Dipartimento** (Console) | **5**: Oggi in ‹dip›, Dipendenti, Obiettivi, Da approvare, Spesa del mese |
| Sezioni della stessa pagina sul **telefono** (schermata 8) | **5**, con «Da approvare» spostata in seconda posizione |
| Viste in cui compare la parola **«Output»** | **4 su 20** aperte, e sono sempre la stessa pagina: l'**Esecuzione**. Zero in home, Richieste, Dipartimento, Costi, Agenda, Chat, Riepilogo, tendine, editor. **Zero sul telefono** |
| Occorrenze di **«artefatto»** in tutto il prodotto | **0** (Console e telefono) |
| Output nel modello | **18** a undici, **40** a quaranta |
| Di questi, **già creati** (fatto, approvata, attesa) | **9** a undici, **19** a quaranta |
| Di questi, **apribili** (portano da qualche parte) | **3** a undici, **0** a quaranta |
| Aggregatori che esistono già | `giornata()` → **8 eventi** a undici, **26** a quaranta, con quattro stati (in corso, errore, attesa, pianificato); `m.costi(periodo, dip)` per la spesa |
| Vocabolario già scritto (dentro l'Esecuzione) | `ICONA_OUT`: **6 tipi** (post, documento, lista, immagine, codice, proposta) · `chipOut`: **6 stati** · `PILLE_OUTPUT`: **4 filtri** |

#### Che cosa manca davvero: due fatti, non un'impressione

**1. Per vedere quello che l'azienda ha creato bisogna aprire una pagina per dipendente.** Gli output vivono in un
punto solo, la sezione «Output» della pagina Esecuzione, e ci si arriva un'esecuzione alla volta.

| | Sviluppo | Marketing | Vendite | Amministr. | Azienda |
|---|---|---|---|---|---|
| Output, a undici | 7 | 5 | 4 | 2 | **18** |
| Pagine Esecuzione da aprire | 3 | 3 | 3 | 2 | **11** |
| Output, a quaranta | 10 | 10 | 10 | 10 | **40** |
| Pagine Esecuzione da aprire | 10 | 10 | 10 | 10 | **40** |

**2. Il prodotto risponde in quattro modi diversi alla domanda «quante cose abbiamo creato», e nessuno dei quattro
elenchi si apre.** Non è un errore di calcolo: è che la parola «consegna» copre quattro oggetti su quattro periodi
diversi, e nessuna pagina dice quale sta contando.

| Dove | Che cosa conta | A undici | A quaranta |
|---|---|---|---|
| Card **Obiettivo** («3 di 7 consegne») | consegne dell'obiettivo | **31 su 59** | **34 su 73** |
| Sezione **Output** dell'Esecuzione | output già creati | **9 su 18** | **19 su 40** |
| Pagina **Richieste** | richieste decise | **16 su 20** | **28 su 35** |
| `m.costi('mese').perCliente` | consegne dei 30 giorni | **318** su 8 clienti | **1 179** su 10 clienti |

E il difetto più piccolo è il più eloquente: **la stessa intestazione di sezione usa due parole per la stessa cosa** —
`<h3>Output</h3>` con accanto il contatore `contoSez(…, 'Consegne')`. Titolo in inglese, contatore in italiano, stessa
riga.

**3. I file sono già nominati e nessuno si apre.** Tutte le richieste hanno un `allegato` dichiarato — **20 su 20** a
undici, **35 su 35** a quaranta: «Documento: 4 pagine», «Immagine 1200×1200», «Foglio: 120 righe». È una riga di testo
accanto a un'icona, mai un oggetto. E la card Obiettivo che dice «3 di 7 consegne» porta a «Le richieste di ‹cliente›»,
che è un **elenco diverso**.

#### «In tempo reale»: che cosa può voler dire qui

Il modello **non ha un orologio**: `azienda.ora` è `'10:42'` fisso e la giornata è giovedì 4 settembre 2026 (nota
tecnica già scritta: «le date del modello non si ricavano da `new Date`»). L'unica promessa onesta in un prototipo è:
*la sezione mostra lo stato al momento in cui si apre la pagina*, con i quattro stati che `giornata()` già distingue.
O si dice così, o si toglie dalla proposta.

#### Le tre strade, con il prezzo

| | Che cos'è | Prezzo in numeri | Che cosa non risolve |
|---|---|---|---|
| **A · sesta sezione del Dipartimento** | «Fatto oggi in Sviluppo» sotto le cinque che ci sono | La pagina passa da 5 a **6 sezioni** e da 1 880 a circa 2 200 px (Marketing è già a 2 258; a quaranta Sviluppo è a 2 882). **Zero pagine nuove, zero voci nel rail, zero schermate nuove sul telefono** | Resta per dipartimento: «che cosa ha creato l'azienda» e «che cosa abbiamo fatto per Rossi Srl» restano senza risposta |
| **B · una pagina nuova nel rail** | Un archivio filtrabile per dipartimento, cliente, tipo e periodo | **+1 voce nel rail** (oggi 6), **+1 vista** sulle 28, **+1 schermata** sulle 8 del telefono. La forma esiste già ed è la pagina **Costi**: 6 sezioni, 30 righe, pillole di periodo per sezione | Rischia di ripetere Richieste, che è già un elenco filtrabile di cose consegnate |
| **C · un oggetto, non una vista** | La «cosa creata» diventa di prima classe e si apre da tutti i punti dove è **già nominata** | Tocca **4 punti già costruiti** (la card output, la voce del log, l'allegato della richiesta, la consegna dell'obiettivo) invece di aggiungerne uno. Obbliga a dire che cosa vuol dire «aprire» in un prototipo: la tendina con l'anteprima esiste già (`.a-tend`, la richiesta) | È la più lunga, e da sola non fa nascere nessuna schermata: l'utente ha chiesto una schermata |

#### La parola

Il prodotto ne usa già **quattro** per lo stesso oggetto: `output` (nel codice e nel titolo di sezione), **«Consegne»**
(nel contatore della stessa intestazione), `allegato` (nella richiesta), `consegne` (negli obiettivi e nei costi). Non è
un dubbio progettuale con più risposte difendibili: è un difetto contato, e la parola che sopravvive va scelta **prima**
della forma. **«Consegna» è la candidata forte**: è già italiana, è già quella del contatore, ed è la sola che dice il
gesto (una cosa consegnata *a qualcuno*, che è la spina dorsale del prodotto). «Output» va tolto dal titolo di sezione.

**Questo candidato non è passato dal consiglio**, ed è la ragione per cui: tutto quello che decide è misurabile (quante
pagine si aprono, quante volte compare una parola, quali conti non tornano) e le regole già scritte fanno il resto. La
regola del progetto dice che quello che si misura si misura, non si vota.

### 6.2 · L'editor di workflow (candidato 7) — **passato dal consiglio**

**Parole dell'utente**: «una l'abbiamo già creata (ma è una bozza e non rispecchia a pieno il design system), ovvero
l'editor di workflow: va solo implementata in modo intelligente (seguendo le regole UX corrette) e aggiornata».

#### Dov'è la bozza e quanto si scosta, contato

La bozza è la **sezione 07 dello specimen** («Interfaccia agente — editor a nodi»), resa fedele del secondo
riferimento. Contata aprendo il file: **5 nodi**, **5 porte** (tre con etichetta: Modello, Memoria, Strumento),
**7 archi**, una minimappa, 4 strumenti di zoom, 3 pillole, una barra chat, un rail di 7 tessere più l'avatar, e tre tab
*Editor · Esecuzioni · Test*.

| Scostamento | Contato |
|---|---|
| Icone usate dalla figura | **20**, di cui **14 non sono nello sprite del prodotto** (48 icone). Due sono varianti di icone che ci sono (chat, organizzazione): **12 da disegnare da zero** |
| Colori nel CSS dell'editor | **19**, di cui **16 fuori dalla palette del sistema** — fra questi **sei verdi** (`#4FCB58, #6BDD72, #3FB847, #2F8F3E, #1C5A22, #0A2A0F`) che **non sono il lime** `#B8FC64`. È lo scostamento più grosso e sta al centro della figura: la **regola 4** dice un solo accento |
| Rail | La Console ne ha già uno, di **6 voci**. Lo specimen ne disegna un altro, di 7 tessere. Due rail non stanno nella stessa applicazione |
| Zoom | La **regola 17** scala la Console con `zoom` alla larghezza della finestra. Un canvas con pan e zoom propri dentro una pagina che si scala con `zoom` sono due zoom annidati |
| La parola «workflow» nel prodotto | **0 occorrenze** in `dati.js`, `direzione-a.js`, `mobile.js`, `componenti.js`. Non c'è nessun oggetto da editare: va inventato l'oggetto prima dell'editor |

**Un fatto controllato durante la revisione incrociata, che cambia una delle domande**: i **18 token `--dgt-ed-*`** di
`tokens.css` **non sono usati da nessun file**. `specimen.html` non importa `tokens.css` (è un file autonomo) e
ridichiara variabili sue (`--egreen`, `--eglow`), inchiodando `#4FCB58` cinque volte nel markup. Cancellare quei token
o tenerli **non cambia un pixel**: è una cosa da contare, non da votare, e i cinque consiglieri ci hanno litigato sopra
per niente.

#### Che cosa il workflow non deve reinventare

Le **tre porte** del nodo agente esistono già: **Modello** (Rapido/Standard/Esperto con la regola di scelta automatica),
**Memoria** («Archivio del cliente», lo strumento più usato del prodotto), **Strumento** (gli strumenti del dossier).
Le tre tab pure: **Esecuzioni** è la pagina Esecuzione (5 sezioni), **Test** è il **colloquio** (8 casi con atteso,
esito, punteggio, soglia 85, costo 4 €, durata 18 min, storico). Solo **Editor** non esiste.

E i **passi** sono già una sequenza dichiarata, disegnata due volte nella stessa pagina (righe e barra dei passi).

| La scala vera | A undici | A quaranta |
|---|---|---|
| Passi in tutto | **43** | **156** |
| Per esecuzione | da **3** a **7**, media **3,91** | da **3** a **10**, media 3,90 |
| Esecuzioni con più di 4 passi | **2 su 11** | **9 su 40** |

La figura ne disegna 5. L'esecuzione più grande a undici (Sviluppatore full-stack, «Checkout e-commerce») ha 7 passi,
9 usi di strumento e 3 modelli: **23 elementi** se ogni passo diventa un nodo con le sue porte.

#### Il consiglio, in breve

**Cinque pareri su cinque**, per strade diverse: lo usa il **titolare** (nel prodotto non esiste una scrivania del
dipendente: inventarla vuol dire inventare un secondo utente); l'oggetto è del **dipartimento** (del dipendente è già il
dossier; dell'azienda è troppo largo per essere firmato in blocco; l'unico caso che giustifica l'oggetto — copywriter
scrive, titolare approva, social pubblica — attraversa due caselle); la forma è la **sequenza dichiarata**, non il
canvas come strumento di composizione. **Quattro su cinque**, indipendentemente: non si parte dal foglio bianco, la cosa
nasce da un'esecuzione riuscita, e così costo e durata nascono **misurati**. **Quattro su cinque** sulla parola:
**procedura**.

**Quello che la revisione incrociata ha colto e i pareri no** (è la parte che ha cambiato la risposta, come già la
prima volta):

1. **Il consenso 5-0 contro il canvas è in parte un artefatto del contesto.** La sezione delle strade dava al canvas due
   voci di costo in numeri e un solo guadagno scritto come gusto. Va detto, e va detto il migliore argomento **a
   favore** del canvas, che nessun consigliere ha fatto: *il canvas non serve a comporre, serve a mostrare che ci sono
   due lavoratori diversi e che fra loro c'è un'attesa*. Una lista dice «poi, poi, poi»; una superficie a nodi dice «qui
   aspetta te» — cioè rende visibile il punto in cui il titolare è il collo di bottiglia della sua stessa azienda. E
   nessuno ha distinto un **canvas modificabile** da un **diagramma in sola lettura**: tutti i costi contati (pan e
   zoom annidati, minimappa, nodi trascinabili, 12 icone) sono costi dell'**editing**, non del **disegno**.
2. **I rami non servono, e si vede dai numeri.** Media 3,91 passi, 2 esecuzioni su 11 sopra i 4: una sequenza di quattro
   passi non ha topologia. L'unico ramo vero è l'**errore**, che è già uno stato del passo e che la barra agenda già
   disegna in rosa; «se il brief manca, chiedi» non è un ramo, è la spina dorsale. Conseguenza: **cade anche l'ultimo
   argomento funzionale del canvas**, e resta solo quello di leggibilità del punto 1.
3. **La delega.** Tutti hanno detto «il titolare approva la procedura», nessuno che cosa la procedura gli **toglie**.

**Verdetto del presidente (da confermare)**: la procedura come **sequenza di righe dichiarate dentro la pagina
Dipartimento**, nata da un'esecuzione riuscita («rifallo sempre così»), con costo e durata misurati. Ogni riga dichiara
chi, modello, strumenti, costo previsto e **la condizione di uscita in italiano** (riuscito → passo seguente; errore o
materiale mancante → si ferma e diventa una Richiesta). Il passaggio di mano si risolve **dentro la riga**: il passo del
titolare è una fascia lime che spezza la colonna e dice «qui si ferma finché non firmi tu». Il **diagramma in sola
lettura resta una domanda aperta e legittima, ma è la seconda cosa**: è una resa della procedura, si aggiunge dopo senza
rifare niente.

**Che cosa il titolare smette di approvare (obbligatorio, e qui è la decisione più grossa)**: approvare una procedura è
**approvare in anticipo le uscite che la rispettano**. Firmata una volta, un'esecuzione che non se ne scosta — stessi
passi, stesso modello, strumenti dichiarati, entro la soglia di costo dichiarata — esce senza passare dalla coda e
compare nel Riepilogo come «a norma»; la coda resta per le eccezioni (passo saltato o aggiunto, costo oltre soglia,
strumento non previsto, errore). **Il prezzo, in chiaro**: la spina dorsale oggi dice «il titolare approva ogni uscita
verso i clienti» e diventerebbe «nulla esce senza una firma del titolare — sull'uscita, o sulla procedura che la
produce». È una riscrittura della spina dorsale, non un dettaglio, e chiede tre freni che nessun parere aveva nominato:
una **soglia di costo** dichiarata, un **perimetro** (quali clienti, quali canali) e una **scadenza** (la procedura
torna in coda dopo N esecuzioni, o quando cambia il soul prompt o il modello di un suo passo).

**La parola: procedura.** Non per il 4 a 1, ma perché dopo la risposta qui sopra l'oggetto *è* una delega firmata, e
«procedura» è l'unica delle candidate che porta con sé l'approvazione. «Flusso» convive male con «flusso di cassa» in
un'applicazione che ha una pagina Costi, e nomina insieme il dichiarato, l'accaduto e il carico del dipartimento.
«Piano» è già preso (la distribuzione dei compiti, decisione 41).

**Che cosa succede alla sezione 07 dello specimen — decisione dell'utente, non del consiglio.** I 18 token sono già
morti e la loro sorte non cambia un pixel. La domanda vera è che `SYSTEM-DESIGN.md` concede all'editor **una palette
propria**: è una deroga scritta alla regola 4. Se il prodotto non applica mai la 07, il sistema conserva un'eccezione
che nessuna pagina giustifica e lo specimen smette di essere uno specimen. Esiste una quarta uscita, la migliore sul
piano tecnico: **ripuntare la 07** — stessa notte, stesse tessere, stesso bagliore, sei verdi morti, lime unico accento
— a rendere la procedura in righe. Ma declassare o ripuntare la 07 significa **emendare `CLAUDE.md`**, che dice che il
design dei due riferimenti «va copiato così com'è», e la 07 è l'unico posto dove il secondo riferimento vive. **Il
consiglio può dire che cosa costa; non può revocare metà del mandato di design.**

### 6.3 · I connettori (candidato 8) — **passato dal consiglio**

**Parole dell'utente**: poter «connettere estensioni (connettori, per esempio MCP) come Gmail, Drive, YouTube,
Instagram, Slack, Figma, Hostinger, etc… così da dare agli agenti/dipendenti gli strumenti per lavorare. Il come tecnico
non ci interessa ora, ci interessa solo la UI e UX». E: «se dare i connettori ai dipendenti o ai dipartimenti — secondo
me è meglio i dipartimenti». Con la richiesta esplicita di **pressare l'ipotesi invece di confermarla**.

#### Che cosa esiste già, contato

| | A undici | A quaranta |
|---|---|---|
| **Strumenti**: istanze / nomi distinti | **46** (35 accesi) / **17** | **160** (120 accesi) / **14** — *11,4 copie per nome* |
| **Connessioni**: istanze / nomi distinti | **14** (13 attive, 1 scaduta) / **4** | **40** (tutte attive) / **1** — *40 copie di una cosa sola* |

A quaranta dipendenti il prodotto tiene **quaranta copie della stessa connessione** («Drive di Nova Studio», una per
dipendente): se scade il token, ci sono **40 posti** dove rinnovarlo.

**Una correzione al passaggio di consegne, ed è di nuovo la stessa lezione.** Il passaggio di consegne diceva che
«l'Archivio del cliente compare **15 volte** nel modello — lo stesso strumento ripetuto su quindici dipendenti», e lo
dava come «il primo argomento a favore del livello dipartimento». Il 15 è un conto a `grep` sul testo di `dati.js`
(dove il nome ricorre anche dentro i passi e in `strumentiUso`), e a undici dipendenti **quindici dipendenti non
esistono**. Il numero vero, letto dai dossier aprendo la pagina, è **6 istanze a undici** e **20 a quaranta**.
L'argomento regge lo stesso — anzi a quaranta è più forte — ma è la terza volta che un conto a `grep` entra in un
documento sbagliato.

**Dove compaiono nell'interfaccia**: la pagina **Dipendente** (sezione «Strumenti e connessioni»: 5 card cliccabili
accendi/spegni più 3 righe connessione — è l'**unico posto del prodotto dove un connettore si guarda o si spegne**); la
pagina **Esecuzione** (righe di costo «Per strumento» e voci del log, in sola lettura); la pagina **Costi** (sezione
«Per strumento»). La pagina **Dipartimento**: **zero**. Il telefono: la parola compare **una volta sola**, dentro un
messaggio di chat.

**Tre difetti già presenti**: il chip **«Rinnova»** della connessione scaduta di Nora è **inerte** (controllato: nessuna
azione né su di sé né su un antenato); l'errore più visibile del prodotto, le **«Chiavi di accesso scadute»** di Kim,
è un guasto di credenziali che **non è attaccato a nessuna connessione** (è testo dentro un passo più una bandiera
d'errore su uno strumento); il permesso «Strumenti e connessioni: solo quelli attivi» ce l'hanno **2 dipendenti su 11**.

#### Il fatto che nessuno aveva nominato: il terzo asse è il cliente

Le tre connessioni **scritte a mano** si chiamano **LinkedIn · Rossi Srl**, **Analytics · Rossi Srl** (scaduta il 30
ago) e **Instagram · Madira Ink**. La quarta è **Drive di Nova Studio**, cioè dell'azienda. **Tre su quattro portano nel
nome il cliente**; il dipartimento non compare in nessuna. Il cliente è già un'entità di prima classe: sezione «Per
cliente» nei Costi, «Spesa del mese» nel Dipartimento.

#### La misura che chiude la domanda: il modello ha già la faglia

Il presidente del consiglio ha chiesto una misura, non un voto: dividere i nomi di strumento fra quelli che **toccano
il mondo fuori** e quelli che sono **capacità del dipendente**. Il modello lo ha già fatto, e nessuno se n'era accorto.

**Quattro nomi su quattordici sono spenti su ogni dipendente, in tutte e due le taglie, e non sono mai stati usati**
(`ultimo: 'mai'`). Sono **tutte** le istanze spente del prodotto: 11 su 46 a undici, **40 su 160** a quaranta.

| Nome | Dipartimento | Istanze (11 / 40) | Accesi | Descrizione, scritta nel modello |
|---|---|---|---|---|
| **Deploy in produzione** | Sviluppo | 3 / 10 | **0** | «Solo con approvazione» |
| **Pubblicazione diretta** | Marketing | 3 / 10 | **0** | «Pubblica senza passare dal titolare» |
| **Invio e-mail** | Vendite | 3 / 10 | **0** | «Solo con approvazione» |
| **Banca** | Amministrazione | 2 / 10 | **0** | «Sola lettura» |

Gli altri dieci sono accesi al 100 % e usati, e le loro descrizioni parlano di **contenuto** («Codice dei clienti»,
«Brief e strutture approvate», «Prezzi approvati», «Date e serie in corso»). I quattro spenti sono **gli unici quattro
la cui descrizione parla di permesso**, e stanno tutti e quattro in **quarta posizione** nel proprio dipartimento, uno
per dipartimento. La divisione fra **accesso** e **capacità** è già scritta: sono i **4 spenti** contro i **10 accesi**.

#### Il consiglio, in breve

**Cinque pareri su cinque tolgono la credenziale dal dipendente**, e nessuno difende lo stato attuale. **Quattro su
cinque arrivano al cliente da soli**, leggendo gli stessi quattro nomi: era un fatto nel contesto, non una
raccomandazione, e ci sono inciampati sopra. Cinque su cinque tengono le 5 card strumento cliccabili e trasformano le
3 righe connessione in lettura (la pagina più lunga del prodotto **si accorcia** invece di allungarsi); cinque su cinque
non toccano «Per strumento» nei Costi; cinque su cinque non aggiungono schermate al telefono; cinque su cinque dicono
che l'errore di Kim va agganciato a un oggetto vero, perché è **una rottura dell'attribuzione**. Le cinque revisioni
indicano all'unanimità lo stesso parere più forte e lo stesso punto cieco.

**Quello che la revisione incrociata ha colto e i pareri no:**

1. **Sono due oggetti, non uno**, e da lì venivano le quattro parole diverse: la **credenziale** («Drive di Nova
   Studio», una sola, che scade, che si rinnova in un posto) e il **permesso d'uso** (che Nora possa toccarla). **Su
   questo secondo oggetto l'ipotesi dell'utente è giusta — e nessuno l'aveva votata perché nessuno l'aveva separata.**
2. **Il difetto contato è sugli strumenti, non sulle connessioni**: 160 righe per 14 nomi contro 40 copie di una cosa. E
   tutti e cinque archiviano il problema più grosso con la stessa formula («le card restano, sono capacità») — mentre
   «Deploy in produzione», «Banca» e «Pubblicazione diretta» non sono capacità. **È esattamente la faglia che la misura
   qui sopra ha poi trovato scritta nel modello.**
3. **Il rifiuto unanime del dipartimento è in parte un artefatto**: il contesto aveva messo il colpo mortale dentro la
   descrizione di quella strada e aveva regalato all'altra l'unico fatto nuovo. **L'argomento a favore del dipartimento
   che nessun consigliere ha fatto**: *il dipartimento è l'unico livello che ha un capo*. Cliente e azienda non hanno un
   responsabile; un accesso attaccato a Rossi Srl non dice **chi** lo rinnova, e la coda finisce sul titolare, cioè sul
   collo di bottiglia che il prodotto cerca di alleggerire. I clienti crescono, i dipartimenti restano quattro.
4. **Nessuno ha disegnato il gesto di collegare**, che è quello che l'utente ha chiesto: manca il «+ Collega», manca il
   catalogo, e manca l'unico schermo dove il marchio di terzi sarebbe inevitabile.
5. **Lo sprite non ha le icone**: contate, non ci sono busta, chiave, nuvola né immagine. E la scorciatoia ovvia —
   iniziali dentro un disco colorato — **è vietata dalla regola 19**: il disco in tinta è una persona. Serve una regola
   nuova: **l'accesso si disegna quadrato e monocromo, mai tondo**; l'icona dice la **funzione**, non il marchio; il
   nome in testo porta il marchio. E il colore dello «scaduto» non è deciso: lime è l'attenzione del titolare, rosa
   l'errore, e un accesso scaduto è tutti e due.

**Verdetto del presidente (da confermare)**: nessuna delle tre strade, e **l'utente ha ragione a metà — sulla metà che
il consiglio non ha mai votato**. La **credenziale è dell'azienda, nominata per cliente**; il **permesso d'uso è del
dipartimento** (l'ipotesi dell'utente), con il dipendente che eredita e l'eccezione che passa da una richiesta — che è
letteralmente «dare ai dipendenti gli strumenti per lavorare». La **superficie è il guasto, non l'inventario**: un
accesso scaduto entra in Richieste con il danno in euro e le esecuzioni bloccate, in una corsia sua, e nessuna voce
nuova nel rail per ora.

**Che cosa il titolare smette di vedere**: la stessa credenziale 40 volte e 40 posti dove rinnovarla (uno); un chip
«Rinnova» che non fa niente (sparisce invece di fingere); 40 assensi per dipendente diventano 4 per dipartimento; i **12
interruttori decorativi** delle capacità escono dalle sue mani. In cambio **acquista** un'approvazione che oggi non ha:
i **3 accessi irreversibili** (Banca, Deploy in produzione, Pubblicazione diretta) escono dall'interruttore del
dipendente. È uno scambio, non un'aggiunta.

**La parola: accesso.** È l'unica che copre tutti e due gli oggetti — l'accesso *a* un servizio e l'accesso *di* un
dipartimento — e l'unica che porta il verbo con sé: si dà, si revoca, **scade**. Sopravvive **«strumento»**, ma
rimpicciolito a capacità del dipendente. Muoiono **«connettore»** ed **«estensione»**. Muore **«connessione»**, ed è la
sola morte che costa: 4 etichette in interfaccia (la sezione «Strumenti e connessioni», che si spacca in due; la riga di
permesso omonima; le 3 righe di stato) più 14 righe del modello a undici (40 a quaranta), tutte generate da una funzione
sola.

**Restano scelte dell'utente**: se il Dipartimento spende la sua sesta sezione per la lettura «che cosa può toccare»; se
Richieste ospita i guasti o ha una corsia separata; e la parola.

### 6.4 · Quale prima, e perché

**Il candidato 6.** Tre ragioni, in ordine di peso:

1. **È l'unico dei tre che non aspetta una decisione.** Il 7 chiede all'utente di emendare `CLAUDE.md` (la sezione 07 e
   il mandato «copiare così com'è») e di riscrivere la spina dorsale delle approvazioni. L'8 chiede di spaccare in due
   una parola del prodotto e di inventare una regola di disegno che non esiste. Il 6 chiede una scelta fra tre forme, e
   tutte e tre stanno dentro regole già scritte.
2. **Gli altri due ci si appoggiano.** La procedura ha bisogno di un posto dove mostrare che cosa ha prodotto; l'accesso
   rotto ha bisogno di un posto dove mostrare che cosa ha fermato. Oggi quel posto non c'è: la «cosa creata» è nominata
   in quattro modi e si apre in nessuno. Farlo per primo rende gli altri due più corti; farlo per ultimo li fa nascere
   con un buco al centro.
3. **Il materiale c'è già tutto**: 18 output a undici e 40 a quaranta, sei tipi con la loro icona, sei stati con il loro
   chip, quattro filtri, e due aggregatori (`giornata()`, `m.costi`) che nessuno ha ancora puntato sulle cose create.

**Poi il 7, e per ultimo l'8.** Il 7 prima dell'8 perché la procedura dichiara **quali strumenti** un passo usa: chi
decide la forma della procedura ha già in mano metà della domanda sugli accessi. E perché l'8, per come è uscito dal
consiglio, non è più «dove metto i connettori» ma «spacco `strumenti` in due e invento come si disegna un servizio senza
il suo marchio»: è il lavoro più lungo dei tre, ed è quello che cambia più righe di quelle già scritte.

## 7. Workflow, routine e inneschi: ricerca e analisi (2026-09-08)

Nasce da tre domande dell'utente, dopo che la pillola d'ingresso ai workflow della versione 20 si è
rivelata invisibile: **(a)** ha senso tenere i workflow a destra, se aprono una pagina e non una tendina?
**(b)** i workflow vanno tenuti per azienda o per dipartimento? **(c)** vuole aggiungere **routine e
inneschi** — un modo più semplice e veloce dei workflow per dire «quando succede X, fai Y», creabile
**anche dal telefono**, e poi visualizzabile in modalità workflow.

### 7.1 Il difetto che ha aperto la discussione (misurato)

`.a-main` è larga 1312 px e finisce a x 1414; la tendina del titolare è `position:fixed` sui 330 px di
destra (x 1110–1440, `z-index:30`). **Gli ultimi ~304 px di ogni pagina stanno sotto la tendina.**

| Pillola «Workflow · N», 1440 × 900 | scroll 0 | 100 | 200 | 300 |
|---|---|---|---|---|
| tendina aperta (predefinito) | coperta (`.appr`) | coperta (`.th`) | visibile | fuori schermo |
| tendina chiusa | coperta (`.a-mini`) | visibile | visibile | fuori schermo |

Chiusa, il badge lime `.a-mini` è fisso a `top:240px` e cade esattamente sulla pillola (y 233–277).
Colpite anche le **pillole del periodo** di «Consegne di oggi» (visibili solo oltre scroll ~600) e la
pre-esistente **«Tutti i costi dell'azienda»** di «Spesa del mese»: il difetto è del layout, ereditato,
non introdotto dalla versione 20 — che però ci ha messo dentro due controlli nuovi.

**Perché le prove non l'hanno preso**: asserivano la presenza nel DOM e il clic. Playwright, prima di
cliccare, porta l'elemento al centro del viewport, e così esce da sotto il badge fisso. Nessuna delle
385 verifiche controllava che si **vedesse** nello stato in cui la pagina si apre. Da qui in avanti ogni
controllo nuovo vuole un'asserzione di visibilità (`elementFromPoint`), non solo di esistenza.

### 7.2 Che cosa esiste già nel modello (misurato)

Le routine **ci sono già**, in tre forme che non portano lo stesso nome:

| Forma | Dove | Quante (a 11) |
|---|---|---|
| Obiettivi che si ripetono (`scadenza: 'ogni giorno'`, `'ogni venerdì'`) | `dati.js`, letti da `settimana()` | 2 |
| Dipendenti `pianificato` a un'ora fissa (15:00, 17:00, 18:00) | `dati.js`, `e.att.quando` | 3 |
| Regole di approvazione (evento → condizione → esito) | `m.regole` | 4 |
| Richieste **già decise da una regola** e non dal titolare | `regola:` in `richieste11` | 3 (Report interni, Fatture ricorrenti, Follow-up) |

Gli **inneschi** possibili sono anch'essi già nei dati: un'ora; un evento del diario (`inizio` 5,
`errore` 5, `approvazione` 3, `passo` 20); una soglia di spesa (`budget.mese`, `budget.giorno`).
Manca solo l'innesco «arriva qualcosa da fuori» (un lead, un'e-mail), che andrebbe inventato.

**Conseguenza**: la proposta dell'utente non aggiunge un concetto nuovo — **dà un nome e una casa a una
cosa che il prodotto fa già in tre posti diversi**. È l'argomento più forte a suo favore, ed è misurato.

### 7.3 Ricerca sui prodotti che hanno affrontato lo stesso bivio

1. **monday.com ha costruito tutti e due, e non si parlano.** Le *automations* («when this happens…»)
   stanno a livello di board, i *Workflows* (rami, condizioni, approvazioni) a livello di workspace e su
   piani più alti; **non sono convertibili l'uno nell'altro**, e l'articolo che analizza la tensione la
   descrive come fonte di confusione, proponendo una via di mezzo. → *Se DGT costruisce la routine
   semplice e il canvas, devono essere **lo stesso oggetto a due altezze**, mai due sistemi.* È
   esattamente l'intuizione dell'utente («poi con la possibilità di visualizzarli in modalità workflow»).
2. **Zapier sta chiudendo lo stesso divario dal lato opposto.** L'editor degli Zap è una lista lineare;
   *Canvas* (2025, ampliato nel 2026) è la superficie visuale, con **conversione in un clic da diagramma
   a Zap**. → Due viste di un oggetto solo è dove il settore sta convergendo.
3. **IFTTT: un innesco e un'azione, per scelta — ed è per questo che funziona sul telefono.** È
   dichiaratamente mobile-first; Zapier è multi-passo con filtri e rami, ed è un attrezzo da scrivania.
   La rassegna sugli altri (Airtable, Notion, monday) conferma che **creare automatismi è un'attività da
   desktop**. → *La «modalità più semplice e veloce, pure da mobile» è possibile **solo** se l'oggetto è
   costretto a un innesco e un'azione. Appena si ammettono i rami si è ricostruito il canvas e si è perso
   il telefono.* È il vincolo più duro di tutta l'analisi.
4. **Lindy 2.0: costringere l'agente lo rende più affidabile *e* più comprensibile.** Sono passati da un
   grande campo di prompt libero a un canvas con componenti espliciti (innesco, azioni obbligatorie), e
   «il costruttore visuale ha migliorato molto l'ingresso dei nuovi utenti». L'adozione è arrivata da
   **agenti specializzati già pronti**, non dalla libertà di comporre. → *Il canvas si guadagna il posto
   come superficie di **lettura**. Non conviene scommettere che il titolare componga flussi complessi.*
5. **Gli automatismi stanno dove stanno gli oggetti su cui agiscono**: board in monday, base in Airtable,
   progetto in Asana (o workspace con una condizione che lo restringe), team in Linear. In DGT gli
   oggetti (dipendenti, esecuzioni, consegne, richieste) stanno nei **dipartimenti**.

Fonti: [monday: la tensione fra automations e workflows](https://dev.to/piotrdiuk/the-product-tension-between-automations-and-workflows-in-mondaycom-3if5) ·
[monday: guida alle automations](https://support.monday.com/hc/en-us/articles/360001222900-Get-started-with-monday-automations) ·
[Zapier Canvas](https://growwstacks.com/blog/zapier-canvas-review-2026) ·
[Zapier vs IFTTT](https://www.cloudwards.net/zapier-vs-ifttt/) ·
[IFTTT: un innesco, un'azione](https://www.lowcode.agency/blog/zapier-vs-ifttt) ·
[Lindy: da agenti liberi a workflow guidati](https://www.zenml.io/llmops-database/evolution-from-open-ended-llm-agents-to-guided-workflows) ·
[Lindy: struttura di un agente](https://docs.lindy.ai/fundamentals/lindy-101/introduction) ·
[Airtable/Notion/monday: gli automatismi si creano da desktop](https://www.gapconsulting.io/blog/when-and-how-to-use-airtable-automation-vs-zapier-or-make)

### 7.4 Le tre risposte che la ricerca rende difendibili

- **(a) La destra è sbagliata, e non serve il consiglio per dirlo.** Un controllo che apre una *pagina* è
  navigazione, non un filtro; tutto il resto in `.destra` è un filtro o un rimando. Che poi finisca nella
  fascia morta è un difetto in più, non la ragione principale.
- **(b) Non è «azienda o dipartimento», è «un oggetto, due indici».** L'atomo è già **per dipendente**
  (un workflow della versione 20 nasce dai passi di *una* esecuzione: svi 1, mkt 2, ven 2, amm 1 = 6 a
  undici, 26 a quaranta). Il dipartimento è dove si lavora, l'azienda è dove si governa — e le regole di
  approvazione che il nodo del titolare mostra sono **già di azienda** (`m.regole`).
- **(c) Routine e workflow devono essere lo stesso oggetto a due altezze.** La routine è ciò che si
  **scrive** (un innesco, un dipendente, un compito, e la clausola di approvazione); il workflow è come
  si **legge** (il canvas, coi nodi non ancora eseguiti «da fare»). La clausola di approvazione non è
  facoltativa: la spina dorsale scritta in `CLAUDE.md` dice che il titolare approva ogni uscita, e una
  routine senza quella clausola sarebbe il modo di aggirarla.

### 7.5 Dove possono vivere (da pressare col consiglio)

- **A · Un settimo cerchio nel rail.** Oggi sono sei: home, dipartimento, richieste, chat, agenda, costi.
  Routine e workflow insieme sono un dominio («come lavora l'azienda») e un dominio merita una casa.
- **B · Dentro Agenda.** È già la superficie del tempo, e mostra già «i pianificati che si ripetono».
  Una routine è una voce d'agenda che torna. Zero cerchi nuovi.
- **C · Per dipartimento, con un indice in azienda.** Segue la regola 5 della ricerca (gli automatismi
  stanno dove stanno gli oggetti), ma sparpaglia il governo su quattro pagine.

**Da confermare dall'utente** (il consiglio prepara la domanda, non la chiude).

### 7.6 Il verdetto del consiglio (2026-09-08)

Cinque pareri indipendenti, revisione incrociata anonima, e **verifica nel codice di ogni affermazione
verificabile** — perché nella prima applicazione del metodo due affermazioni dei revisori erano false.

#### Dove il consiglio converge (e la convergenza è il verdetto vero)

- **La pillola a destra è sbagliata**: 5 su 5. Un controllo che apre una pagina non è un filtro.
- **Un oggetto solo, mai due sistemi**: 5 su 5 scartano la strada di monday.
- **Il canvas è una lente, non un editor**: 4 su 5, e il quinto lo concede da sé. La ragione è tecnica e
  non estetica: il canvas legge un **consuntivo** (costo, durata, esito per passo), e una routine mai
  eseguita ha quei campi vuoti — nodi coi trattini violerebbero la regola «un controllo si mostra solo se
  fa quello che promette».
- **Non si crea da un modulo vuoto: si promuove un fatto già accaduto**: **5 su 5**, con cinque nomi
  diversi per lo stesso gesto («Ripeti questo», «Fallo sempre», «rendila una regola», «d'ora in poi fai
  così», «promuovi»). È la convergenza più forte del consiglio ed è ciò che rende possibili i tre tocchi
  sul telefono: chi, che cosa, quanto costa e quale clausola si applica sono **già noti dal fatto**.
- **La fascia morta si cura riservando lo spazio, non spostando i controlli**: 5 su 5.
- Nella revisione incrociata, **5 revisori su 5** hanno indicato lo stesso parere come il più forte:
  quello che ordina i lavori e dichiara che cosa misurare invece di discuterne.

#### Dove il consiglio si spacca

- **Dove vive**: quattro dicono una pagina d'azienda (settimo cerchio del rail), uno dice «sul
  dipendente». Ma chi sceglie il rail lo smonta da sé: «il rail sono i sei posti dove Marco va ogni
  giorno; le routine si aprono due volte l'anno».
- **Il titolare continua a VEDERE le uscite automatiche?** Due dicono sì («smette di firmare, non di
  vedere, o la spina dorsale si rompe in silenzio»), uno dice che escono dalla coda. **Si compongono**:
  escono dalla *coda delle firme* (che promette «da fare») ed entrano in una striscia «fatto senza di
  te». Vedere sì, firmare no.

#### Le cose che solo la revisione incrociata ha trovato — verificate nel codice

| Affermazione | Verifica | Esito |
|---|---|---|
| «Mansione» è già occupata | 16 occorrenze: è la **mansione del dossier** del dipendente, stampata come `<p class="mans">`, più «Richiesta fuori mansione» nel colloquio | **VERA** — e 3 consiglieri su 5 proponevano quella parola |
| «Regola» è occupata | 4 record in `m.regole` | **VERA** |
| «Routine» è libera | 0 occorrenze in tutto il repository | **VERA** |
| Solo 3 delle 4 regole sono attive | `g4` «Spese sopra 50 €» ha `attiva: false` — ed è proprio quella a soglia in euro | **VERA** — 3 consiglieri fondavano una strada su «le 4 regole» |
| La tendina estesa è larga 840 px | `.a-tend.estesa{width:840px}` | **VERA**: farla colonna della griglia rifluirebbe la pagina di 510 px a ogni apertura |
| Due regole fantasma | le richieste citano `Fatture ricorrenti` e `Follow-up`, che **non esistono** in `m.regole` | **VERA**: 2 delle 3 richieste «già automatiche» puntano al nulla |
| Non esiste un record su cui scrivere | `workflowDi()` è una **derivazione** su `esecuzioneDi(e)`; `firme` è un oggetto in memoria che si perde ricaricando | **VERA**: tutti e cinque promettono «tre tocchi» su un modello in cui non si può scrivere niente |
| Le 8 routine preesistenti sono un conto gonfiato | 2 ricorrenze distinte, 3 ore distinte, 3 nomi di regola distinti | **FALSA**: sono otto voci diverse |

**La misura che cambia la correzione.** Riservare la banda costa più di quanto il consiglio credesse:
il canvas è largo **1272 px** su una serpentina a 5 colonne (`W_PAD·2 + 4·W_PX + W_W`), e `.a-main` ne ha
1312. Togliendo 354 px restano 958 px utili e **ci stanno solo 3 colonne**: il workflow di Sviluppo
passerebbe da 518 a **728 px di altezza, +41 %**. Nessun consigliere l'aveva contato.

#### Che cosa nessuno ha detto, e va deciso

1. **Chi vince** quando la clausola della routine contraddice la regola d'azienda.
2. **Un dipendente può scriversi una routine che salta l'approvazione?** Se sì, la spina dorsale la
   scavalca l'autore, non l'innesco.
3. **Chi paga e chi ferma.** Una routine spende senza gesto umano: serve un **tetto di spesa per
   routine** (la clausola vista dal lato dei soldi) e uno stato di guasto con quarantena.
4. **L'innesco esterno inverte la direzione**: crea un'esecuzione che nessuno ha chiesto. Minimo: la
   prima volta produce una **richiesta**, non un'uscita.

#### La raccomandazione

1. **La parola è «routine»** (libera, e già dell'utente), l'innesco si chiama **«innesco»**. Non
   «mansione» (occupata), non «regola» (occupata). «Workflow» resta, ma smette di essere una *modalità*:
   diventa una **vista** — «vedi a nodi».
2. **Un oggetto, due tempi**: routine = esecuzione *dichiarata*; workflow = esecuzione *avvenuta*.
   Nel codice è un record solo con `innesco`, `clausola`, `autore` e `origine: dichiarata | derivata`.
3. **Si promuove, non si compone.** «Ripeti questo» su una consegna approvata o su un'esecuzione.
4. **Dove vive**: pagina di **azienda** con filtro per dipartimento, raggiunta dalle Richieste (dove le
   clausole già vivono) e dal Dipartimento. Il settimo cerchio del rail **solo se** la pagina lo
   giustifica — la soglia proposta dal consiglio è misurabile: sotto ~900 px di pagina non lo merita.
5. **La fascia morta**: riservare la banda su tutte le pagine **tranne il canvas**, dove la tendina si
   richiude da sola — su quella pagina non si firma, si legge. Più asserzioni **geometriche**
   (`elementFromPoint`) su ogni controllo cliccabile nelle cinque suite.

**Il primo lavoro**: non l'interfaccia, il **record**. Dare alla routine un record vero in `dati.js`
(`id`, `autore`, `innesco`, `clausola`, `origine`) ed etichettarci dentro le 8 che esistono già; nello
stesso giro, la fascia morta, le asserzioni geometriche e le 2 regole fantasma. Se etichettando le 8 la
lista sta in piedi, la funzione ha contenuto; se non sta in piedi, lo si scopre prima di costruire una
pagina.

**Da confermare dall'utente**: i 4 punti aperti qui sopra e la scelta 4 (dove vive).

### 7.7 Correzione: il riferimento è n8n, non Zapier (2026-09-08)

L'utente ha chiarito: «per la mia idea io mi ispiravo a **n8n**, che permette di creare automazioni di
ogni tipo anche di livello complesso». Il consiglio aveva ricevuto un contesto costruito su Zapier e
IFTTT, e su quel contesto **una delle sue conclusioni cade**. Le altre reggono.

#### Che cosa fa n8n, verificato

1. **L'innesco è un NODO, il primo del grafo.** Ogni workflow di n8n comincia con un nodo di innesco:
   Schedule (a intervalli o cron), Webhook (il workflow diventa un indirizzo HTTP che chiunque può
   chiamare), Form, Manual, o un evento di un'applicazione. I nodi di innesco hanno un'uscita e
   **nessuna entrata**. → In n8n **non esiste un oggetto «routine»**: una routine è semplicemente un
   workflow che ha uno Schedule Trigger in testa. È esattamente la **strada Z**, e non come compromesso
   di implementazione: come modello.
2. **È lo STESSO canvas a fare l'editor e il consuntivo.** Si apre il workflow nell'editor e si passa
   alla linguetta *Executions* in cima al canvas: la stessa figura mostra, nodo per nodo, i dati entrati
   e usciti, con il **contorno verde** se è andata e **rosso** dove si è rotta; cliccando il nodo rotto
   si leggono errore e dati che l'hanno causato.
3. **Nessun editor ufficiale sul telefono.** L'app mobile ufficiale **tiene l'editor nel browser**: mostra
   salute delle esecuzioni, attività recente e grafici. Sono nate app di terzi che provano il canvas a
   dita — segno che la domanda esiste, e che il prodotto ufficiale si rifiuta di rispondere così.
4. **La composizione si fa con i sotto-workflow** (nodo *Execute Workflow*): un workflow autonomo che un
   altro chiama, con ingressi e uscite. La regola pratica: se ricopi la stessa sequenza in più workflow,
   quella sequenza è un sotto-workflow.
5. **2 709 modelli pronti** nella libreria. È la lezione di Lindy una seconda volta.
6. **L'organizzazione è per cartelle e progetti**, piatta con raggruppamento — non per «reparto».

#### Che cosa cade del verdetto

**«Il canvas è una lente, non un editor» (4 consiglieri su 5) cade.** Era fondata su un'osservazione
giusta — una routine mai eseguita ha costo, durata ed esito vuoti — ma con una conclusione sbagliata:
quei campi vuoti non sono «nodi coi trattini» su un diagramma di sola lettura, sono **lo stato di
modifica**. n8n lo dimostra: una figura, due stati.

> **Il canvas della versione 20 è già la vista *Executions* di n8n** — disegna costo, durata, esito e
> strumenti per passo. Quello che manca non è una pagina diversa: è **l'altro stato della stessa
> figura**, quello in cui si scrive.

Quindi la coppia non è «routine (frase) ↔ workflow (canvas)», è:

| | Stato | Che cosa mostra |
|---|---|---|
| **Come lavora** | dichiarato, modificabile | i nodi, l'innesco in testa, la clausola sul nodo del titolare |
| **Com'è andata** | eseguito | la stessa figura con costo, durata, esito, verde e rosso |

#### Che cosa regge

- **Si promuove un fatto invece di comporre da vuoto** (5 su 5) **regge, e diventa più importante**: è
  la *strada veloce*, quella che n8n non ha e che l'utente ha chiesto per nome («una modalità più
  semplice e veloce»). Non sostituisce il canvas: è l'altra estremità dello stesso oggetto.
- **Il telefono non compone** regge, e n8n lo conferma dal lato più forte: il prodotto più capace del
  campo **non ci prova nemmeno**. Il telefono di DGT deve fare quello che fa l'app di n8n — guardare,
  far partire, decidere — più l'unico gesto di scrittura che il telefono regge davvero: promuovere.
- **La parola** regge: «routine» è libera, «mansione» e «regola» sono occupate.
- **Un oggetto solo** regge, e n8n lo rende letterale: la routine **è** un workflow con un innesco in
  testa. Non due altezze di un oggetto: un oggetto.
- **La fascia morta** e le sue misure non c'entrano con n8n: restano com'erano.

#### Che cosa n8n aggiunge, che nessun consigliere aveva sul tavolo

- **Il sotto-workflow è il posto dove nascerà il passaggio di mano.** Oggi nei dati i passaggi fra due
  dipendenti sono **zero**, ed è per questo che il nodo è un passo e non un dipendente. Il giorno in cui
  un dipendente ne chiama un altro, quella è la chiamata a un sotto-workflow — non un nodo-dipendente
  dentro lo stesso grafo. La versione 20 non va rifatta per farcelo stare.
- **I modelli pronti**: se n8n ne ha 2 709 e l'adozione di Lindy è venuta dagli agenti già pronti,
  DGT deve spedire routine già scritte, non un foglio bianco.
- **Le cartelle** confermano la pagina di azienda con filtro, contro i silos per dipartimento.

Fonti: [n8n: i tipi di innesco](https://n8n.spot/n8n-trigger-types-webhook-schedule-app-event-manual-explained/) ·
[n8n: Schedule Trigger](https://madebyaime.com/blog/n8n-schedule-trigger/) ·
[n8n docs: vedere le esecuzioni di un workflow](https://docs.n8n.io/build/understand-workflows/understand-executions/view-executions-for-a-single-workflow) ·
[n8n: canvas, nodi ed esecuzioni](https://aiworkflowsautomation.com/understanding-the-n8n-interface-canvas-nodes-and-executions/) ·
[n8n: il nodo Execute Workflow](https://synta.io/blog/n8n-execute-workflow-node-guide-2026) ·
[n8n: l'app mobile tiene l'editor nel browser](https://www.n8n-hub.site/)

**Da confermare dall'utente**: che il canvas diventi modificabile (e non solo una lente), e in quale
ordine rispetto alla strada veloce.

### 7.8 Decisioni dell'utente sul governo delle routine (2026-09-08)

**Deciso — chi scrive.** Il dipendente **propone**, non crea. La proposta arriva al titolare come una
richiesta (stesso schema delle revisioni di performance). Se il titolare conferma la creazione, decide
in quel momento **come parte**: automatica, oppure con **richiesta di approvazione a ogni avvio**.

**Deciso — i limiti.** Ogni routine può portare i suoi limiti, e l'utente li vuole personalizzabili per
intero: **tetto di spesa giornaliero, settimanale o mensile**. «Voglio piena customizzabilità.»

#### Domanda 1: quattro contraddizioni possibili fra clausola e regola (tutte dai dati veri)

1. **La routine è più permissiva della regola** — il caso pericoloso. `g1` «Uscite verso i clienti:
   sempre da approvare» è attiva. Una routine «ogni venerdì alle 17:00, Follow-up clienti manda le 14
   e-mail, automatica sotto 20 €» costa 3 €: sotto soglia. Il follow-up **è** un'uscita verso i clienti.
   Se vince la routine, `g1` è spenta per quel caso senza che nessuno l'abbia toccata, e la pagina Regole
   continua a dire «sempre da approvare» — che è falso. *Nel modello questo caso esiste già*: la
   richiesta `r17` risulta decisa dalla regola «Follow-up», che in `m.regole` **non esiste**.
2. **La routine è più stretta della regola** — il caso facile. `g3` «Liste di lead: automatica sotto
   20 €»; la lista di 120 lead costa 14 €, quindi uscirebbe da sola. La routine dice «voglio firmarla
   sempre». Qui non c'è dubbio: vince la più stretta.
3. **La regola cambia dopo che la routine è scritta.** Oggi `g4` «Spese sopra 50 €: sempre da approvare»
   è **spenta** (`attiva: false`, misurato). Si scrivono dieci routine, tre automatiche con tetto 80 €.
   Domani si accende `g4`: quelle tre continuano a girare com'erano, o si fermano e vanno riconfermate?
   È il caso che decide se la pagina Regole governa davvero o è decorazione.
4. **Il tetto contro il costo vero.** Una routine con tetto 10 €/giorno su «Ricerca lead»: l'esecuzione
   vera «200 lead e-commerce in Lombardia» costa **61 €** (misurato). Non parte? Parte e si ferma a 10 €
   lasciando mezza lista e 10 € spesi per niente? Parte e chiede? Il tetto va deciso **insieme a che cosa
   fa quando lo tocca** — altrimenti è un numero che non promette niente.

**Fatto misurato che indica la risposta.** Il modello ha **già** un posto dove una regola d'azienda si
allenta: le **eccezioni** nel dossier del dipendente (`eccezione: true`), per esempio «Testi per il sito
di Nova Studio: Automatica sotto 5 €, Eccezione di Nora». Quindi la proposta è: **la clausola della
routine può solo stringere**, mai allentare; per allentare si aggiunge un'eccezione, che è il meccanismo
che esiste già e che si legge in **un posto solo**. Così «piena customizzabilità» resta, ma la risposta
alla domanda «che cosa può uscire senza di me?» non si sparpaglia su N routine.

#### Domanda 4: perché l'innesco esterno è diverso dagli altri

Oggi tutto quello che succede in DGT parte **da dentro**: o lo chiedi tu, o parte un lavoro che avevi
pianificato. Ogni euro risale a una decisione presa da qualcuno dell'azienda.

L'innesco esterno rovescia il verso: **qualcuno fuori dall'azienda fa lavorare e spendere la tua
azienda**. Uno sconosciuto compila il modulo del sito alle 3 di notte, la routine sveglia un dipendente,
il dipendente spende, e se la clausola dice «automatica» il risultato torna a quello sconosciuto senza
che nessuno di Nova Studio l'abbia visto. Due conseguenze:

- **La frequenza non è più tua.** «Ogni venerdì» sono al massimo 52 volte l'anno e le hai scelte tu.
  «Quando arriva un lead» sono tante quante volte bussano: 200 moduli in una notte fanno 200 esecuzioni,
  e col modello Esperto a 7 € sono 1 400 €. È qui che il tetto conta più che altrove, e serve **per
  periodo e per singolo avvio**.
- **Non puoi giudicare quello che non hai mai visto.** Scrivendo la clausola decidi su un tipo di evento
  che non è ancora successo: non sai se il modulo riceve 2 richieste a settimana o 200 in una notte, né
  che cosa il dipendente ne farà.

**Proposta**: le prime N volte un innesco esterno produce una **richiesta**, non un'uscita. Vedi che cosa
è arrivato e che cosa il dipendente ha fatto, e firmi. Dopo N volte che sei d'accordo, la clausola che
avevi scritto entra in vigore e va da sola. È un **rodaggio dell'innesco**, non del dipendente.

**Da confermare dall'utente**: la regola «la clausola può solo stringere», il rodaggio degli inneschi
esterni (e con quale N), e che cosa fa una routine quando tocca il tetto.

### 7.9 Le tre risposte dell'utente, verificate (2026-09-08)

#### 1 · «Fai pure» con una sezione dove provare la routine — l'idea è giusta, e il prodotto la fa già due volte

L'utente scarta (correttamente) la proposta «la clausola può solo stringere»: bloccherebbe proprio ciò
per cui le routine esistono. Accetta il rischio delle uscite non controllate e chiede in cambio **un
posto dove provare la routine prima di darle il «fai pure»**, e lo stesso per i workflow.

**Misurato: non è un meccanismo nuovo, è il terzo uso di uno schema che c'è già.**

| Meccanismo | Che cosa mette alla prova | Numeri veri nel modello |
|---|---|---|
| **Colloquio** | un dipendente, prima che lavori | Nora: **12 casi** con l'esito atteso, punteggio **91** su **soglia 85**, **4 €**, 18 min. Social media manager: 10 casi, 88 su 85, 5 €, 24 min |
| **Prova** (di una revisione) | un cambiamento, prima che si applichi | **20 esecuzioni, 30 €, 5 giorni** (rv1) e **20 esecuzioni, 60 €, 10 giorni** (rv2); una revisione è **già** in `stato: 'prova'` |
| **Prova della routine** (da fare) | una routine, prima del «fai pure» | — |

Quindi la sezione non va inventata: si applica a un terzo oggetto la forma che il prodotto usa già per i
dipendenti e per i cambiamenti, con lo stesso vocabolario (casi, soglia, esito, costo, durata).

**Proposta che affina l'idea: il «fai pure» non si sceglie, si guadagna.** La routine nasce «chiedi
prima»; la pillola «fai pure» si accende solo dopo che la routine ha passato la sua prova — N avvii che
il titolare ha firmato senza cambiare niente. È esattamente la forma della revisione (`prova` →
`applicata`), ed è coerente con la decisione della versione 20, dove **la delega nasce spenta**.
Chi vuole il «fai pure» subito lo può ancora forzare, ma è una scelta esplicita e non il valore di
partenza.

#### 2 · «Più stretta» e «più permissiva», in parole semplici

La regola d'azienda dice **quanto controllo serve**. Una routine può chiederne **di più** (stretta) o
**di meno** (permissiva).

- **Più stretta = chiedi più controllo di quanto la regola pretenda.** `g3` dice «le liste di lead
  escono da sole sotto i 20 €»; la lista dei 120 lead costa **14 €**, quindi uscirebbe da sola. Se la
  routine dice «questa voglio vederla sempre», stai chiedendo *più* firme del minimo. Non fa danni:
  al massimo firmi una cosa che potevi non firmare.
- **Più permissiva = chiedi meno controllo di quanto la regola pretenda.** `g1` dice «uscite verso i
  clienti: sempre da approvare»; se la routine del follow-up dice «esce da sola», stai togliendo una
  firma che la regola pretendeva. Qui il danno è possibile, ed è il caso che l'utente ha deciso di
  accettare — in cambio della prova.

#### 3 · Il tetto e l'avviso: l'idea regge, ma va corretta su due punti misurati

**Il buco.** L'avviso proposto confronta la routine nuova con *un'altra* routine che ha un tetto più
alto. Ma il rischio vero è la **somma**: tre routine da 30 € al giorno sullo stesso dipendente non
scattano in nessun confronto a due a due, e insieme espongono **90 € al giorno**.

**Il tetto esiste già, ed è per dipendente.** Nel dossier: `budget: { mese: 120, speso: 72, giorno: 10,
oggi: 12 }` per Nora, `{ mese: 300, …, giorno: 15, oggi: 9 }` per il Social media manager. Quindi la
domanda giusta non è «c'è un'altra routine con un tetto più alto?» ma **«i tetti delle routine di questo
dipendente, sommati, sfondano il suo budget del giorno o del mese?»**.

**Un difetto che salta fuori da questa verifica**: il `oggi` di Nora è **12 €** contro un `giorno` di
**10 €**. È già oltre il suo tetto giornaliero, e in tutta la Console non c'è un posto che lo dica.

**Tetto e soglia non sono la stessa cosa.** `g4` «Spese sopra 50 €: sempre da approvare» **non è un
tetto**: è una soglia di approvazione, e per giunta oggi è **spenta** (`attiva: false`). Un tetto
*ferma*, una soglia *chiede*. Da qui tre livelli distinti:

| Livello | Che cos'è | Che cosa fa |
|---|---|---|
| Azienda · `g4` | soglia | sopra 50 € **chiede** al titolare |
| Dipendente · `budget.giorno` / `.mese` | tetto | **ferma** il dipendente |
| Routine · il suo tetto | tetto | **ferma** quella routine, prima degli altri due |

L'avviso allora dice una cosa vera e utile: «questa routine porta Nora a 45 € al giorno, ma il suo tetto
è 10 € — sospendo, abbasso, o alzo il tetto di Nora?».

#### 4 · Rodaggio approvato

Le prime N volte un innesco esterno produce una richiesta. Proposta: **N = 3**, e il conto è lo stesso
della prova del punto 1 — non due meccanismi, uno solo.

#### Nuova pagina in arretrato: **Impostazioni**

L'utente vuole sia «approvazione a ogni avvio» sia «approvazione dell'uscita», con la preferenza
modificabile in una schermata Impostazioni **che non esiste ancora**. Sono due porte diverse: la prima
sta *prima* che i soldi si spendano, la seconda *dopo*. Oggi DGT ha solo la seconda.

**Da confermare dall'utente**: il «fai pure» che si guadagna invece di sceglierlo, N = 3, e l'avviso
sulla somma invece che sul confronto a due a due.

### 7.10 Il tetto a cascata: misurato sui budget veri (2026-09-08)

Proposta dell'utente: **un tetto di azienda**, e in modo **facoltativo** un tetto di dipartimento
espresso **in percentuale** di quello aziendale, «così il dipartimento si gestisce il suo budget, il
tetto diventa dinamico e non si creano contrasti».

#### I numeri di oggi

| | 11 dipendenti | 40 dipendenti |
|---|---|---|
| Tetto del mese (somma dei budget) | **1 580 €** — spesi 613 € (39 %) | **5 120 €** — spesi 2 154 € (42 %) |
| Tetto del giorno | **115 €** — spesi oggi **124 €** → **108 %** | **400 €** — spesi oggi **427 €** → **107 %** |
| Dipendenti già oltre il proprio tetto del giorno | **3 su 11** | **12 su 40** |

Quote per dipartimento (mese): a undici svi 20 %, mkt 32 %, ven 23 %, amm 25 %; a quaranta
svi 22 %, mkt 23 %, ven 22 %, amm 33 %.

**Difetto misurato, e non piccolo**: il tetto giornaliero è **già sfondato a tutte e due le taglie**, e
in nessuna pagina della Console c'è qualcosa che lo dica. Il caso peggiore è Vendite a undici: **61 €
spesi oggi contro un tetto di dipartimento di 30 €, il 203 %** — un solo dipendente («Ricerca lead»,
l'esecuzione dei 200 lead) si mangia la giornata di tutto il dipartimento.

#### Che cosa regge dell'idea, e la correzione che la fa funzionare

L'idea è buona e la percentuale è il modo giusto di renderla dinamica: si alza il tetto di azienda e
tutto sale con lui, senza rifare N numeri. Ma **«non si creano contrasti» dipende da una scelta che la
proposta non fa**, e le due strade si comportano in modo opposto:

- **Ripartizione** (le percentuali **devono sommare a 100**): i contrasti li crea eccome. Per dare 5
  punti a Sviluppo bisogna toglierli a qualcuno. E i numeri di oggi lo mostrano: le quote sommano a 100
  solo perché sono calcolate come quote; scelte a mano non ci arriveranno quasi mai.
- **Soffitto** (ogni percentuale è **un limite a sé**, e possono sommare oltre 100): nessun contrasto.
  Sviluppo 50 %, Marketing 50 % e Vendite 50 % convivono: ciascuno è limitato, e **il tetto di azienda è
  il fermo vero**, primo arrivato primo servito.

**La misura sceglie il soffitto.** Oggi i tetti di dipartimento sommano esattamente al tetto di azienda
(30+35+30+20 = 115): è una ripartizione. Con quella, Vendite si sarebbe fermata a 30 € e l'esecuzione
dei 200 lead sarebbe morta a metà, **mentre Amministrazione teneva fermi 20 € non spesi** (oggi spende
0 €). È esattamente lo spreco che l'utente vuole evitare. Col soffitto, Vendite arriva a 61 € finché
l'azienda ha capienza.

#### Quattro livelli, ma **uno solo obbligatorio**

| Livello | Obbligatorio | Che cos'è |
|---|---|---|
| **Azienda** | **sì** | il tetto vero: quando è pieno, si ferma tutto |
| Dipartimento (% del tetto d'azienda) | no | quanto può concentrare un dipartimento da solo |
| Dipendente | no | oggi ce l'hanno tutti; diventa l'eccezione, per chi va tenuto a freno |
| Routine | no | ferma quella routine prima di tutti gli altri |

Così «piena customizzabilità» resta, ma chi non tocca niente ha **un numero solo** da capire.

#### Che cosa fa il tetto quando lo si tocca: **ferma prima di partire, mai a metà**

I passi dell'esecuzione dei 200 lead costano **0,5 · 6 · 22 · 9,5 · 23 · 4 €**: **un singolo passo può
costare 23 €, più del doppio dell'intero tetto giornaliero di Nora (10 €)**. Quindi il tetto va
controllato **prima di ogni passo**, non alla fine: il passo che sfonderebbe non parte, e l'esecuzione
va in uno stato **«ferma per tetto»** — la stessa forma dello stato `errore` che esiste già («Esecuzione
ferma, serve un intervento», il deploy di Kim) — e compare nella coda come richiesta: «Nora ha finito il
budget di oggi: alzo, aspetto domani, o la lascio ferma?».

Fermarsi a metà sarebbe il peggio dei due mondi: soldi spesi e niente consegnato.

**Da confermare dall'utente**: soffitto invece di ripartizione, e «ferma prima del passo».
