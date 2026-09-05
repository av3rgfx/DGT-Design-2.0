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

Screenshot: `screenshot/mobile.png` (la pagina), `mobile-1-da-approvare.png`, `mobile-1-coda.png` (scorsa alla coda),
`mobile-2-richiesta.png` (documento), `mobile-2-richiesta-post.png`, `mobile-2-rifiuto.png` (cornici catturate con
`design-system/tools/screenshot-elementi.js`, `SCALE=2 H=1100`, `CLICK` per il rifiuto, `EVAL` per lo scorrimento). Artefatto:
https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9. **Sessione successiva**: la schermata Riepilogo di oggi (anche come stato
vuoto, a coda finita), la revisione di performance sul telefono (le due versioni una sotto l'altra con le differenze e le
quattro decisioni; poi le revisioni entrano nella coda del telefono), la prova a quaranta, il giudizio dell'utente su queste due
schermate.

## 5. File

| File | Ruolo |
|---|---|
| `dati.js` | modello sintetico (11 e 40) condiviso; dal 2026-09-04 anche il dossier del dipendente (`dossierDi`, `revisioneDi`, `decidiRevisione`, `MODELLI`), le richieste di tipo `revisione` e l'esecuzione (`esecuzioneDi`: sei scritte a mano, le altre generate); dal 2026-09-05 la decisione del titolare (`decidi`), condivisa fra Console e telefono |
| `comune.js` | sprite di icone di DGT, prefisso CSS, utilità |
| `direzione-a.js` / `.html` | Console (direzione scelta): home, due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente (creazione e modifica), pagina Dipendente con la revisione di performance e la tendina delle versioni, pagina Esecuzione (passi, log, output, costo); cliccabile |
| `mobile.js` / `.html` | le approvazioni da mobile (versione 11, prima metà): cornice del telefono dello specimen, schermate «Da approvare» e «Richiesta» con il rifiuto con motivo, due telefoni affiancati che condividono il modello e la richiesta corrente; `DGT_MOBILE.monta`, `coda`; `?schermata=1|2&richiesta=0` |
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
| `screenshot/` | catture a 1440 px (`design-system/tools/screenshot-page.js`); le cornici del telefono (`mobile-*.png`) con `screenshot-elementi.js` |

Per gli screenshot: `design-system/tools/screenshot-page.js` (vedi `design-system/tools/README.md`).
