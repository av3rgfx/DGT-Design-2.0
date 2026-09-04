# Tre direzioni per la vista principale dell'azienda

Stato al 2026-09-04. Prima applicazione del sistema di design al prodotto reale: la vista principale di
un'azienda DGT con quattro dipartimenti e undici dipendenti AI, tre dei quali al lavoro in questo momento.
Tre direzioni sulla stessa schermata, prova di scala a quaranta dipendenti, direzione scelta.

- Confronto interattivo (tab A/B/C, selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Direzione A cliccabile (tendine, pagine Richieste e Dipartimento, dipendenti con avatar ed editor): https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
- Sorgenti: `direzione-a.html`, `direzione-b.html`, `direzione-c.html` (aggiungere `?n=40` per la prova di scala),
  `confronto.html` (la stessa pagina dell'artefatto, con gli script separati).
- Avatar dei dipendenti, le due famiglie a confronto (kit e orbe): https://claude.ai/code/artifact/4bc0c3ee-d1a0-41dc-a6d9-ef4f2b8360bd
- Screenshot a 1440 px in `screenshot/` (`a-11.png` … `c-40.png`, `a-dipendente-nuovo.png`, `a-dipendente-modifica.png`,
  `a-11-avatar-kit.png`, `avatar-confronto.png`).

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
| Pillole filtro con emoji | Tutte · 🔥 Da approvare · In corso · Pianificate · Errori |

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
    scelto nell'editor), disegnato nel linguaggio del sistema: disco chiaro, corpo nero, pupille bianche, lime solo
    quando serve il titolare (al lavoro, da approvare), rosa per l'errore. Statico ovunque tranne le card «Al lavoro
    adesso» e l'anteprima dell'editor. Il titolare, che è una persona, tiene le iniziali su disco bianco.
11. **Creazione e modifica del dipendente in una tendina**, con la stessa forma delle tendine del titolare: anteprima
    della card, ruolo, nome facoltativo, dipartimento a pillole, scelta dell'avatar fra sei varianti, Crea/Salva e
    Annulla. Si apre dalla matita nell'intaglio della card, dalla riga compatta e dalla card «Aggiungi».

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
| Stati | working, alert, error, idle, dormant del kit | lavoro: occhi lime e un arco che orbita · da approvare: occhi grandi lime e due onde che si allargano · errore: occhi a X rosa e un tremito ogni tanto · pianificato: occhi bianchi · libero: palpebre socchiuse, respiro lento |
| Moto | un rAF, solo le card al lavoro e l'anteprima | **animazioni CSS su tutti gli avatar**, fase e periodo dal seme (nessuno in sincrono): respiro del corpo, deriva dello sguardo, battito delle palpebre, dondolio, più il moto proprio di ogni stato (tabella sotto); niente rAF; con `prefers-reduced-motion` tutto fermo |
| Sguardo | anteprima dell'editor con il motore del kit | anteprima dell'editor: gli occhi seguono il puntatore |
| Determinismo | stesso seme → stessa forma | stesso seme → stessi parametri (mulberry32 dal FNV-1a del seme, come il kit) |

**Scelta dell'utente: l'orbe**, con due correzioni fatte subito dopo: **occhi più grandi** (tondi 27, pillola 20×40,
larga 34×22 in unità del viewBox, prima 21, 16×32, 27×18) e **animazioni di stato molto più visibili**, che muovono il
corpo stesso e non solo i segni intorno. Le ampiezze sono in unità del viewBox (250 = tutto il disco), per cui i
primi valori a 10–12 unità erano 3 px a 72 px e non si vedevano; ora:

| Stato | Che cosa fa l'orbe |
|---|---|
| lavoro | due battute di squash e stretch (1,14 × 0,88 ↔ 0,92 × 1,10, ±8°) poi una pausa, ciclo ≈ 4,3 s; lo sguardo scandisce da sinistra a destra (±16) nella stessa battuta; due archi spessi che orbitano in 3,6 s |
| attesa | ogni 5,5 s un saltello (−28 in alto, poi un rimbalzo) con una scrollata del corpo (±14°); **occhi gialli** `#FCDC64` (terza richiesta dell'utente; il giallo è il terzo punto di interesse della palette) più grandi; due onde spesse che partono con il saltello e si allargano fino al bordo del disco |
| errore | ogni 6 s un tremito (±16 con ±6°); il corpo resta un poco afflosciato (1,08 × 0,90, abbassato); gli occhi a X lampeggiano ogni 2,6 s |
| pianificato | il corpo scorre piano da un lato all'altro (±18, ±8°, ciclo ≈ 8 s) come chi aspetta; ogni ≈ 11 s lo sguardo va in alto a destra «a guardare l'orologio» e torna |
| libero | respiro profondo e lento (1,12 × 0,88 ↔ 0,96 × 1,04, ciclo ≈ 7,5 s), l'orbe si abbassa fino a 16; palpebre socchiuse; una «z» bianca ogni 3,5 s che sale dal volto verso l'alto a destra e svanisce |

Sempre, per tutti: respiro di base (4,5 %, 5–6,7 s), dondolio (−7), deriva dello sguardo (±9), battito delle palpebre
ogni 6–10 s. Fase e periodo restano dal seme. La prima versione aveva cicli di 2 s: l'utente li ha trovati troppo
frequenti, e i cicli sono stati allungati con pause (terza versione). Pellicola di sei secondi per stato (animazioni
messe in pausa a sei istanti): `screenshot/avatar-orbe-pellicola.png`.

Deciso a fine sessione (da fare nella prossima): **si tolgono i segni animati dietro l'avatar**, cioè l'arco che
orbita al lavoro e le onde da approvare; le animazioni dell'avatar stesso (corpo, occhi, sguardo, battito, moti di
stato) restano. Dettagli e brief della pagina del dipendente in `PROSSIMA-SESSIONE.md`.

Pagina di confronto `confronto-avatar.html` (artefatto: https://claude.ai/code/artifact/4bc0c3ee-d1a0-41dc-a6d9-ef4f2b8360bd):
undici ruoli per cinque stati, le card dei dipendenti, le card al lavoro (animate), le righe compatte, misure e fondi,
per entrambe le famiglie. Screenshot: `avatar-confronto.png`, `a-11.png` (orbe), `a-11-avatar-kit.png` (kit).
Prova con Playwright: 41 orbi in pagina, il corpo respira (la trasformazione cambia fra due fotogrammi), l'anteprima
segue il puntatore, creazione e scelta del seme funzionano, nessun errore in console.

## 5. File

| File | Ruolo |
|---|---|
| `dati.js` | modello sintetico (11 e 40) condiviso |
| `comune.js` | sprite di icone di DGT, prefisso CSS, utilità |
| `direzione-a.js` / `.html` | Console (direzione scelta): home, due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente (creazione e modifica); cliccabile |
| `avatar/avatar-dgt.js` | involucro degli avatar nel linguaggio della Console (colori, stati, simboli statici, animazione); `usa('orbe'|'kit')` sceglie la famiglia |
| `avatar/avatar-orbe.js` | la famiglia «orbe» (versione 5b): sfere morbide dal seme, animazioni CSS, sguardo che segue il puntatore |
| `confronto-avatar.html` | le due famiglie a confronto nelle viste della Console |
| `avatar/avatar-motore.js` | motore del kit impacchettato (generato da `build-motore.js`, non si modifica a mano) |
| `avatar/vendor-avatars/` | sorgenti del motore del kit, verbatim |
| `direzione-b.js` / `.html` | Registro operativo |
| `direzione-c.js` / `.html` | Mappa viva |
| `confronto.html` | pagina di confronto con tab e selettore 11/40 |
| `build-unico.js` | genera il file unico per l'artefatto (`node build-unico.js direzione-a.html out.html`) |
| `screenshot/` | catture a 1440 px |

Per gli screenshot: `design-system/tools/screenshot-page.js` (vedi `design-system/tools/README.md`).
