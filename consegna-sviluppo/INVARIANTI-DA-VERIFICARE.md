# Invarianti da verificare

Catalogo delle proprietà che il prodotto vero deve continuare a garantire. Sono le proprietà che le sei suite Playwright
di questo repository (`schermate/direzioni/prove/{console,mobile,costi,agenda-chat,workflow,routine}.js`, con il modulo
condiviso `visibile.js`) tengono oggi con **692 verifiche** sulle pagine statiche. Le suite **non si portano**: aprono
`direzione-a.html` e `mobile.html` da `file://`, leggono un modello che vive nella pagina (`modello`, `DGT_DATI.modello(n)`)
e misurano pixel su una cornice fissa (Console 1440 × 1100; telefono 300 × 620 dentro `zoom: 1.25`). Le proprietà sì:
il team del prodotto scrive prove sue per tenerle, sul suo DOM, sul suo modello, sulle sue taglie.

Come leggere ogni riga:

- **Cosa deve essere vero** è la proprietà, scritta perché la si possa asserire in qualunque stack.
- **Dove** dice le superfici (Console, telefono), le pagine e le taglie. «Undici e quaranta» sono i due modelli di
  prova (11 e 40 dipendenti): ogni proprietà che qui vale alle due taglie va provata a **tutte e due** anche nel prodotto,
  perché a quaranta la Console passa alla vista compatta e i numeri cambiano forma.
- **Perché** è il difetto che ha generato l'invariante, con i numeri quando ci sono. Le versioni fra parentesi quadre
  sono solo un riferimento al repository di design.
- **Come si misura** dice la famiglia di misura: **DOM** (presenza, classe, testo, conteggio), **modello** (stato letto
  dal modello dati, non dalla pagina), **DOM = modello** (il numero stampato rifatto sul modello), **pixel**
  (`getBoundingClientRect`, `scrollWidth`/`clientWidth`, `getComputedStyle`), **console** (nessun `pageerror` né
  `console.error`).

Il conto delle verifiche per tema, nella tabella finale, conta le esecuzioni: una verifica dentro un ciclo su undici e
quaranta conta due. Le due lezioni di metodo che valgono più delle singole righe: quello che si conta si conta su
**tutte** le pagine e a **tutte e due** le taglie, non sull'esempio che ha fatto scoprire il difetto; e una prova che
elenca le pagine a mano va allungata quando ne nasce una (la pagina Impostazioni è rimasta fuori da una lista e i suoi
tre numeri nascevano sotto la tendina senza che nulla lo dicesse).

## 1. Il titolare decide

La tendina è l'anteprima e il luogo della decisione; ogni uscita passa da lì o da una delle strade equivalenti (card,
riga nel filo, riga del dipartimento sul telefono). Approvare, rifiutare con motivo e giudicare una revisione devono
cambiare il modello, non solo la pagina.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 1.1 | La tendina si apre da sola sulla richiesta in attesa più vecchia; decisa quella, resta aperta sulla successiva, e resta estesa se era estesa | Console, tendina; undici e quaranta | Regola: la coda si smaltisce senza cercarla | modello (`codaAttesa()[0]`, stato) + DOM (aperta, estesa) |
| 1.2 | La coda è tutta in vista: tante righe quante le richieste in attesa (5 a undici, 8 a quaranta); la pillola sul bordo e la campanella contano quelle rimaste (3, poi 0) | Console tendina e pillola; telefono campanella e righe | Regola | DOM = modello |
| 1.3 | Approvare cambia il modello e la coda cala di uno, da ogni superficie: tendina, card della pagina Richieste, riga della consegna dentro il filo della chat, riga «Da approvare» del dipartimento sul telefono, card del telefono; «Approva tutte» svuota la coda e lo storico sale (16 → 21 righe) | Console (home, Richieste, Chat, Costi), telefono (1, 8) | Regola: ogni strada decide con la stessa funzione | modello (`stato === 'approvata'`, `richiesteDi('attesa')` −1) |
| 1.4 | Rifiutare vuole un motivo: il campo appare con il fuoco; la conferma vuota lascia la richiesta in attesa e segna il campo in rosso; motivo + Invio la rifiuta con il motivo salvato, anche nella revisione collegata | Console tendina estesa; telefono schermata «motivo» | Regola: nessun rifiuto muto | modello (`stato`, `commento`, `revisioneDi(r).stato`) + DOM (`activeElement`, bordo o classe `manca`) |
| 1.5 | Una revisione si giudica sul confronto: due versioni affiancate; il soul prompt con le differenze per paragrafo e per parola; «Prova» approva con il commento «Prova su 20 esecuzioni» e mette la revisione in prova | Console tendina; telefono schermata 2 | Regola | DOM (`.cmp .doc` = 2, `mark.add`) + modello |
| 1.6 | La revisione passata che ha una destinazione apre il confronto giusto (v6 e v7, due documenti) | Console, pagina Dipendente | Regola 25 | DOM |
| 1.7 | Ridurre, chiudere, riaprire: «riduci» lascia la tendina aperta e non estesa; «chiudi» lascia due pillole sul bordo; la pillola riapre; il Riepilogo di oggi ha le sue card (3 nella Console; 2 card e 5 voci sul telefono) | Console; telefono 3 | Regola | DOM |
| 1.8 | Lo stato vuoto si dice: a coda zero «Niente da approvare» sul fondo del Riepilogo, campanella senza numero, Riepilogo «niente in attesa», la navigazione in basso porta alla schermata vuota | Telefono | Regola | DOM + modello |
| 1.9 | Sul telefono la richiesta si sfoglia: «n di 5», le frecce avanti e indietro ciclano, «indietro» torna alla coda | Telefono 2 | Regola | DOM |
| 1.10 | Nella pagina Richieste le card da approvare stanno in cima e lo storico deciso sotto | Console Richieste | Regola | DOM |
| 1.11 | Una consegna già uscita offre tre strade per decidere (pillola in testata, pillola della sezione, riga della richiesta) e ognuna apre la tendina estesa; la card della consegna invece apre la sua pagina, non la tendina | Console, Consegna e Dipartimento | Scelta dell'utente [19]: la tendina resta l'anteprima delle approvazioni | DOM |
| 1.12 | La linguetta lime o la tendina aperta c'è sempre | Console home | Regola | DOM |
| 1.13 | Approvare dalla tendina non cambia pagina | Console Costi | Regola | DOM (titolo) |

## 2. Coerenza fra superfici

Console e telefono sono due viste dello stesso modello: lo stesso numero, la stessa parola, lo stesso componente. Il
prototipo lo misurava con otto telefoni affiancati che leggono lo stesso stato; nel prodotto la proprietà è che lo stato
sia uno e ogni vista lo legga.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 2.1 | Lo stato è uno: la richiesta corrente, il filo aperto e il dipartimento aperto sono un dato solo e ogni vista mostra lo stesso (il telefono 2 mostra la richiesta del telefono 1, l'8 il dipartimento del 7, i fili aperti coincidono) | Telefono, tutte le schermate | Regola | DOM di due viste = modello |
| 2.2 | La barra «Oggi in azienda» (Console) e il quadro del giorno (telefono) hanno le stesse quattro caselle, approvate · al lavoro o in pausa · ferme · dopo, con gli stessi conti presi dal modello (`gruppiOggi`, stati dei dipendenti); nessuna quinta casella a nessuna taglia; la casella di chi è fermo è rosa | Console home; telefono 1; undici e quaranta | Sul telefono la griglia è 2 × 2 e l'etichetta ha 53 px misurati: «in pausa · tetto» ne chiede 71, quindi il perché lo porta solo la Console | DOM = modello |
| 2.3 | Il telefono mostra le stesse consegne della Console (`consegneDi(dip)`), ogni riga con l'avatar di chi l'ha fatta e il chip dello stato; le stesse sei sezioni del dipartimento, con «Consegne di oggi» seconda | Telefono 8; Console Dipartimento | Regola | DOM = modello |
| 2.4 | Il canvas dei workflow è una funzione sola (`canvasWorkflow`, con `canvasMisure` e `canvasTuttoDentro` nei componenti) e il suo CSS sta nel foglio dei componenti, non in quello della Console: Console e telefono stampano gli stessi nodi con la stessa classe (5 su un workflow, 9 sul grafo), lo stesso nodo del titolare, le stesse porte, le stesse due tab; la colonna di card del telefono non esiste più | Console Workflow; telefono 10 | Fino alla [26] il telefono aveva una colonna di card al posto del canvas | DOM (classi identiche, `typeof`, id del foglio) |
| 2.5 | La firma anticipata accesa dal telefono è lo stesso stato della Console; i tre freni sul telefono vengono dalla stessa funzione della Console («Soglia …») | Telefono 10 | Decisione 71 | DOM + modello |
| 2.6 | La spesa del giorno sul telefono porta lo stesso numero e lo stesso tetto della Console («N € su T €», riga della card Consegne) | Telefono 3; undici e quaranta | La schermata stampava la spesa due volte senza mai dire il tetto [31] | DOM = modello |
| 2.7 | Un messaggio scritto dal telefono entra nello stesso filo (una sola occorrenza in tutti i fili) e la sua bolla è l'ultima | Telefono 5 | Regola | modello (`filoDi`) + DOM |
| 2.8 | Le strade del quadro del giorno coincidono con quelle della barra: «al lavoro» apre l'Agenda, «ferma» apre la conversazione con chi è fermo | Telefono 1 | Regola | DOM |

Sei verifiche di `mobile.js` (`?quadro=0|1|3`, `?conta=0|1`) disegnano le forme scartate del quadro e del titolo per
tenerne la misura: non sono invarianti del prodotto e non si portano.

## 3. Onestà dei numeri

Nessun numero stampato che il modello non conosca, nessun numero che ne ripete un altro sulla stessa schermata, e lo
stesso numero con lo stesso verdetto su ogni pagina che lo mostra.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 3.1 | Home, Costi e Riepilogo del titolare dicono la stessa cosa dello stesso numero: «N € su T € al giorno» con la stessa parola («oltre il limite» o «nel limite»); se una pagina diverge, la prova cade | Console home, Costi, Riepilogo; undici e quaranta | Fino alla [30] la home stampava «124 € spesi oggi ↓ 12 %» scritto a mano (nel modello `costi('oggi').prima` è `null`) mentre i Costi marcavano lo stesso numero «oltre», e la home era cliccabile proprio verso la pagina che la smentiva | DOM di tre superfici = `costoOggi`, `tettoAzienda().giorno` |
| 3.2 | Nessun badge ripete il numero che gli sta accanto, su dieci pagine per due taglie nella Console e su tutte le schermate del telefono | Console `.a-stats`; telefono `.m-stat` | Ne aveva presi sei in quattro pagine («2 approvate oggi ↑2», «4 da rifare ↓4», «3 al lavoro ↑3», «40 da leggere ↓40») più cinque che mentivano (`↑1` letterale, `Math.min(2, att)` in tre posti): quattordici in tutto [31] | DOM (testo del badge confrontato con il numero) |
| 3.3 | Nessun badge è un letterale che il modello non conosce: nella home ne resta uno solo, quello del tetto; il confronto dei 30 giorni (+106 €) c'è solo dove esiste un «prima» | Console home, Costi | Come 3.1 | DOM |
| 3.4 | Un elemento fisso non ripete quello che un altro dice già sulla stessa schermata: la barra non dice «aspettano te» (lo dice la linguetta lime); sul telefono il conto sta nel titolo («DA APPROVARE 5») e la riga dei due numeri grandi non c'è; la schermata della spesa stampa il numero senza tetto una volta sola; il contatore di una sezione non è scritto due volte | Console home; telefono 1 e 3 | Correzione 16a: «approvate oggi» era lo stesso conto a 60 px di distanza | DOM |
| 3.5 | I conti vengono dal modello, non dalla pagina: le caselle della barra (approvate, al lavoro, ferme, dopo), i conti delle consegne («7 · 3 fatte», «3 di 7» = `consegneDi`), il contatore della ricerca («n di 40»), il conto nella pillola «Workflow (2)» | Console home, Dipartimento | Regola: la sezione non inventa niente | DOM = conto rifatto sul modello |
| 3.6 | La barra «Oggi in azienda» non finge una linea del tempo: niente marcatore dell'ora, niente blocchi | Console home | [16]: la barra di prima fingeva | DOM |
| 3.7 | I Costi tornano: le quattro sezioni a 30 giorni sommano allo stesso totale (613 €); la card di un dipartimento dice lo stesso numero della sua pagina (Marketing 135 €); i tre numeri della testata (124 / 613 / 967; 427 / 2154 a quaranta); una decisione cambia i costi (dopo l'approvazione il cliente ha «1 consegna approvata» oggi) | Console Costi, Dipartimento | Regola | DOM fra pagine + modello |
| 3.8 | Le consegne dei giorni scorsi sono richieste decise, non dati inventati: i loro stati sono le parole dello storico («Modifiche», «Rifiutata») | Console Dipartimento, perimetro 30 giorni | [20] | DOM |

## 4. Niente controlli inerti e niente frecce senza destinazione

Un controllo si vede solo se fa quello che promette (regola 25); una freccia sta solo su una riga che porta da qualche
parte (regola 26). Si conta su tutto il prodotto, non sulla pagina dove il difetto è comparso.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 4.1 | Nessun cerchio né pillola senza azione in nessuna intestazione di sezione (72 intestazioni, nove pagine, due taglie) | Console, tutte le pagine; undici e quaranta | [17] | DOM (`.shead .rb` e `.shead .pill` senza `data-az` = 0) |
| 4.2 | Nessuna freccia di riga senza destinazione: zero frecce `i-ne` fuori da un controllo con azione su 13 pagine, 4 viste della tendina e 2 taglie; le sole due dichiarate stanno nella card in anteprima dell'editor (non è un controllo, è il disegno di come verrà la card); sul telefono zero su 8 schermate per 2 taglie, zero nelle righe delle consegne | Console; telefono | [18], regola 25 | DOM (`use href` della freccia, antenato `[data-az]`) |
| 4.3 | La freccia sta esattamente sulle righe con destinazione, mai sulle altre: revisioni passate (una su tre, quella del confronto), consegne precedenti (solo quella in attesa del titolare), storico delle Richieste (solo le due righe che portano alla loro routine), cliente senza richieste (nessuna freccia), routine senza workflow (nessuna freccia lo promette) | Console Dipendente, Esecuzione, Richieste, Costi, Routine | Regola 26: non promettere una destinazione che non c'è, non toglierne una che c'è | DOM (freccia presente se e solo se `data-az`) |
| 4.4 | Le liste miste restano allineate: 65 liste con più di una riga, tutte con la stessa griglia; la colonna della freccia cade per gruppo, mai una riga con destinazione dentro un gruppo che l'ha tolta; i gruppi di sole righe senza destinazione non la sprecano | Console, tutte le liste | [18] | pixel (`grid-template-columns` uguale su tutte le righe) |
| 4.5 | I quattro cerchi della navigazione del telefono portano tutti a una schermata; zero controlli inerti nella pagina del workflow, canvas compreso | Telefono; Console Workflow | Il secondo cerchio della navigazione era inerte [17] | DOM |

## 5. Ogni strada porta dove dice

Ogni controllo con una destinazione apre proprio quella: si verifica il titolo della pagina d'arrivo, non la presenza
del bottone.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 5.1 | Il rail ha sei cerchi e non ne guadagna un settimo (Costi ci arriva dal cerchio dell'euro; Routine, Consegna, Impostazioni da altre strade); il cerchio della pagina aperta è acceso | Console, tutte le pagine | Conferma e [22]: con tre routine la pagina non merita un cerchio | DOM (conteggio, classe accesa) |
| 5.2 | Le caselle della barra portano dove dicono: «approvate» alle Richieste, la casella rosa all'esecuzione ferma, «dopo» all'Agenda; il cerchio della barra all'Agenda | Console home | Regola | DOM (titolo dopo il clic) |
| 5.3 | Il numero del tetto nella home porta a Impostazioni, dove il tetto si pone, non ai Costi, dove si consuma; da Impostazioni si va ai Costi | Console home, Impostazioni | Porta chiesta dal titolare insieme al «nessun settimo cerchio» [32] | DOM (titolo) |
| 5.4 | Da e verso i Costi: card di un dipartimento → Dipartimento; «Tutti i costi dell'azienda» (da Dipartimento, Esecuzione, Impostazioni) → Costi; riga o pillola compatta di un dipendente → Dipendente; «spesi oggi» del dipendente → Costi; riga di un cliente → Richieste con il filtro cliente già attivo e «1 filtro attivo»; riga di uno strumento → l'esecuzione che l'ha usato; indietro dai Costi → home | Console Costi e pagine collegate; undici e quaranta | [13] | DOM (titolo, filtro attivo) |
| 5.5 | Verso Chat e Agenda: il cerchio «commenta» di una card apre la Chat sul filo di quel dipendente; «Scrivi a …» dell'Esecuzione apre il suo filo; «Sposta» di una pianificata apre l'Agenda; un blocco della barra del giorno apre la sua esecuzione | Console home, Esecuzione, Agenda | [15] | DOM (titolo, nome nel filo) |
| 5.6 | Dal Dipartimento: la pillola «Workflow (n)» apre l'elenco dei workflow del dipartimento («WORKFLOW · MARKETING», n card); la pillola «Routine» apre l'elenco; dal workflow «Vedi l'esecuzione» apre l'esecuzione; sul telefono dal dipartimento si arriva ai suoi workflow senza una sezione nuova | Console Dipartimento, Workflow; telefono 8 | [20], [22] | DOM |
| 5.7 | Lo storico porta alla routine giusta: la riga «routine · X» apre la pagina il cui titolo è X | Console Richieste | Fino alla [21] il nome era testo morto | DOM (titolo = nome estratto dalla riga) |
| 5.8 | Indietro torna da dove si è venuti: dalla consegna al dipartimento (Console e telefono), dal filo all'elenco dei fili, dalla revisione alla coda; le tab del telefono aprono la schermata dichiarata | Console; telefono | Regola | DOM (`data-schermata`, titolo) |
| 5.9 | Sul telefono la riga di un dipendente apre la sua conversazione, quella di un dipartimento apre il dipartimento, quella di una consegna apre la schermata della consegna | Telefono 7, 8 | [17], [19] | DOM |

## 6. Niente controlli coperti dagli elementi fissi

Un controllo può esistere nel DOM, essere cliccabile da uno strumento (che scorre prima di cliccare) e restare
invisibile all'utente sotto un elemento `position: fixed`. «Coperto» e «tagliato» sono difetti diversi: tagliato è un
difetto solo se il contenitore non scorre.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 6.1 | Nessun controllo della colonna nasce sotto la tendina o sotto il badge lime, allo scroll di apertura, con la tendina aperta e chiusa, su tutte le pagine e a tutte e due le taglie | Console, 14 pagine; undici e quaranta; tendina aperta e chiusa | Erano 66 [21]: la pillola d'ingresso ai workflow e le pillole del periodo passavano la prova e restavano invisibili; il badge chiuso sta a `top: 240px`, proprio nella fascia delle intestazioni | pixel: il centro del controllo contro i rettangoli degli elementi fissi (non `elementFromPoint`, che ritorna l'`svg` interno) |
| 6.2 | Nessun controllo muto: un controllo che esce dal proprio contenitore è raggiungibile solo se quel contenitore scorre | Console, stesse pagine | Erano 40 [21]; le strisce di pillole e le file di card scorrono per disegno e non contano | pixel + `overflow` + `scrollWidth`/`scrollHeight` |
| 6.3 | La colonna finisce a 1008 px, dove comincia la tendina, su ogni pagina senza eccezioni, canvas compreso (quattro colonne di nodi invece di cinque, passo 242) | Console, tutte le pagine | Il canvas era l'unica eccezione dichiarata [20] | pixel (`.a-main` = 1008, canvas ≤ 1008) |
| 6.4 | L'intestazione sta nella banda: su 13 pagine per due taglie non supera x 1110; nessun suo controllo e nessun suo **testo** nasce sotto la tendina aperta; l'aria fra intestazione e prima sezione non scende sotto 64 px | Console, 13 pagine (Impostazioni compresa); undici e quaranta; tendina aperta | Fino alla [21] l'intestazione arrivava a x 1414 e i suoi ultimi numeri, cliccabili, nascevano sotto la tendina (4); i tre numeri di Impostazioni (x 1001–1296) nascevano coperti e la scatola, allargata dal badge assoluto, li nascondeva | pixel su un `Range` dei nodi di testo, non sulla scatola |
| 6.5 | Sul telefono nessun controllo sta sotto la navigazione in basso senza uno scorrimento che lo liberi (otto schermi, due taglie); della card della richiesta restano almeno 240 px su 256 sopra la barra, e la riga con approva e rifiuta sta sopra la barra | Telefono, tutte le schermate | La riga dei due numeri grandi spingeva la riga di approva e rifiuta sotto la navigazione (misurati 244 con la forma scelta, 240 con quella scartata) | pixel + scansione dello scroll a passi di 8 px |
| 6.6 | La tendina resta al bordo dello schermo anche con il canvas ingrandito: lo zoom interno è un `transform`, non `zoom` | Console Workflow | Regola 17 valeva per `zoom` | pixel (`right` ≤ larghezza) |
| 6.7 | Il prezzo di un cambiamento di layout si misura e si fissa: le pagine di prova hanno un'altezza nota (Sviluppo 3396, Marketing 3594, home 2388 px) e ogni cambiamento la sposta di un numero dichiarato (banda riservata, intestazione a due righe +68, card del tetto +198, ingresso ai workflow 0) | Console | La stima diceva 64 px, la misura 68 | pixel (`scrollHeight`) |

## 7. Niente testo tagliato

Niente di quello che il prodotto scrive deve uscire dai puntini. Le righe d'elenco strette che finiscono nei puntini
sono disegno e la loro pagina le apre per intero; i titoli e le pillole di stato no.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 7.1 | Nella riga di stato delle card nessun testo è più largo di quello che si vede (190 pillole su 8 pagine per 2 taglie), e nella pillola resta **solo uno stato**: In pausa · In corso · Errore · In coda · Da approvare · Libero · In ritardo · Concluso · Da iniziare | Console, otto pagine; undici e quaranta (dove esiste «Passo 7 di 10») | «Pass…» al posto di «Passo 2 di 4» (35,4 px di posto, 70,2 chiesti), «Chiav…» al posto del motivo dell'errore (46,8 contro 157,6), «3 € · 3 passi · 10:12» in 88 px [33] | pixel (`scrollWidth ≤ clientWidth` su ogni foglia di testo) + DOM (lista chiusa di parole) |
| 7.2 | Nessun titolo di card del telefono chiede più righe di quante ne ha | Telefono, tutte le schermate; undici e quaranta | «Tetto del giorno raggiunto: 124 € su 115 €» chiedeva tre righe da 162 px e ne aveva due: la card d'apertura si apriva mozzata [33] | pixel (`scrollHeight ≤ clientHeight` dove c'è `line-clamp`) |
| 7.3 | Titoli e parole del telefono: il titolo con il conto sta su una riga e regge tre cifre; le parole del quadro non si tagliano, nemmeno a quaranta; i sottotitoli dell'elenco dei dipartimenti e il titolo lungo non si tagliano; il nome lungo si stringe («AMMINISTRAZIONE»); «12» sta nel badge della campanella (≥ 22 px); la riga della spesa con il tetto sta nei 278 px senza puntini | Telefono 1, 3, 7, 8 | Ogni forma della spesa fra i tre numeri grandi sforava da −9 a −78 px | pixel |
| 7.4 | Titoli e testata della Console: il titolo più lungo del prodotto (32 caratteri) si stringe invece di sforare e i numeri della testata restano nella cornice; la pagina della consegna ha due numeri, non tre | Console Consegna, a quaranta | Con tre numeri la testata sforava di 77 px | pixel + DOM |
| 7.5 | Nel canvas: l'etichetta sul filo sta nei 150 px dichiarati; il tag di un ramo sta nei 208 px del nodo; la riga in cima sta nei 992 px utili; sul telefono le etichette del contratto stanno fuori dal canvas e si leggono a ≥ 10 px | Console Workflow; telefono 10 | Dentro il canvas a 0,306 le etichette avrebbero 4,3 px | pixel |

## 8. Scala

Undici e quaranta dipendenti, la vista compatta, e mai uno scorrimento laterale.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 8.1 | Ogni proprietà vale a undici e a quaranta: il modello a quaranta è generato con lo stesso criterio (3 routine, 8 in coda, 40 fili, 6 workflow in Sviluppo) e ogni verifica si ripete alle due taglie | Console e telefono | Regola | modello |
| 8.2 | A quaranta la Console passa alla vista compatta: righe più «Aggiungi» e niente card; nei Costi 40 pillole e nessuna riga larga; la sezione Dipendenti mostra tutti i quaranta | Console home, Costi | Regola di scala | DOM |
| 8.3 | Nessuno scorrimento laterale della Console: su ogni pagina, dopo i filtri, con il perimetro largo, con i workflow più lunghi, a quaranta | Console, tutte le pagine | Regola | pixel (`documentElement.scrollWidth ≤ clientWidth`) |
| 8.4 | Nessuno schermo del telefono scorre di lato, a ogni passo (apertura, revisione, rifiuto, prova, stato vuoto, quadro, dipartimenti, quaranta, chat, canvas in ogni stato); nel canvas a scorrere è la vista dentro, non lo schermo | Telefono, tutte le schermate | Regola | pixel (nessuno schermo con `scrollWidth > clientWidth`) |
| 8.5 | La tendina a quaranta elenca tutta la coda e anche l'ultima si estende; la pagina Richieste ha tante card quante le richieste in coda | Console, a quaranta | Regola | DOM = modello |
| 8.6 | La barra dei passi dell'Esecuzione sta nella pagina (≤ 1312 px, sforo 0) su ogni esecuzione; la barra «Oggi in azienda» non sfora a quaranta; il quadro 2 × 2 regge a quaranta | Console Esecuzione, home; telefono 1 | La barra cresceva a 2180 px su 1440 | pixel |
| 8.7 | Agenda e Chat reggono la scala: un blocco per evento, sette righe della settimana, quaranta fili con uno aperto | Console Agenda, Chat, a quaranta | Regola | DOM = modello |
| 8.8 | La soglia della ricerca decide da sola: il cerchio «cerca» compare quando la lista passa le dodici righe (17 consegne a quaranta; sette sezioni su ventidue) e non prima (7 o 10 righe) | Console, tutte le sezioni | Regola [17] | DOM |

## 9. Filtri, ricerca e periodi

Una pillola che filtra lascia esattamente le righe che il modello dice; un periodo cambia titolo e totale; un vuoto si
dice.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 9.1 | Ogni pillola di sezione filtra davvero: Marketing lascia i dipendenti del dipartimento, «In ritardo» gli obiettivi in ritardo, «Fatte» 3 di 7, «Da fare» 3, «Tutte» 7, «Da rifare» un sottoinsieme non vuoto, Pianificati 3 / Errori 1 / Tutti 8 in Agenda; il contatore dice «3 di 7» | Console home, Dipartimento, Agenda | [17] | DOM = filtro rifatto sul modello |
| 9.2 | Il filtro della pagina Richieste: un filtro attivo dà «1 filtro attivo» e meno righe; «azzera» dà «nessun filtro» e tutte le righe | Console Richieste | Regola | DOM |
| 9.3 | La ricerca di sezione filtra davvero: il cerchio apre il campo al suo posto, il conto (uguale al filtro sul modello, fra 0 e il totale) sta nel contatore, il fuoco resta nel campo mentre si scrive, Esc chiude e la sezione torna intera | Console, sezioni con più di dodici righe | [17] | DOM = modello + `activeElement` |
| 9.4 | Le due forme della card: «righe» passa alla forma compatta, «griglia» torna alle card, stesso conto | Console home | [17] | DOM |
| 9.5 | Le pillole del periodo cambiano davvero titolo e totale («Spesa del mese» → «Spesa di oggi»; 124 / 613 / 1356 €), i periodi sono indipendenti per sezione, lo scorrimento resta dov'era dopo il clic, per modello non c'è l'anno, per strumento solo oggi, la card dell'azienda dice «Spesa di oggi»; le consegne a oggi / sette / trenta giorni cambiano titolo e conto (7 / 9 / 12; 10 / 17 a quaranta) | Console Costi, Dipartimento | [13], [20] | DOM + `scrollY` |
| 9.6 | Il filtro dell'agenda è delle card: la barra del giorno resta intera | Console Agenda | Regola | DOM |
| 9.7 | Il vuoto si dice: un filtro che non pesca niente stampa «Nessuna consegna» invece di lasciare la sezione vuota | Console Dipartimento | [19] | DOM |

## 10. Limiti e freno

Il tetto ha una sorgente sola, il prodotto si apre fermo e lo dice, nessun «Riprendi» aggira il tetto, una sola richiesta
di tetto in coda, la percentuale è un gesto, i limiti si scrivono davvero.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 10.1 | Il tetto ha una sorgente sola: è il numero posto dal titolare (`tettoAzienda()`: 115 €/giorno, 1580 €/mese) e home, Costi, Riepilogo e telefono lo leggono da lì; assumendo un dipendente la proposta sale (115 → 125) e il tetto resta 115 | Console home, Costi, Riepilogo; telefono 3; undici e quaranta | Fino alla [31] il tetto era la somma dei budget: un limite che cambia per fatti altrui non è un limite | modello (`tettoAzienda`, `propostaTetto` dopo `aggiungi`) + DOM = modello |
| 10.2 | Il freno agisce prima di ogni passo, mai a metà | Modello | Decisione [32] | modello (`fermaPrimaDelPasso`) |
| 10.3 | Il prodotto si apre fermo, e nessuna superficie dice «al lavoro» mentre nessuno lavora: le ferme per il tetto sono tutte le esecuzioni aperte; il primo numero della home dice «in pausa»; la sezione si intitola «Ferme per il tetto»; la barra dice «in pausa · tetto»; il telefono «approvate · in pausa · ferma · dopo»; quando il tetto molla torna «Al lavoro adesso» | Console home; telefono 1; undici e quaranta | Lo stesso difetto tolto dalla home in [31] poteva rinascere col freno cablato | DOM = `fermePerTetto()`, `alLavoro` |
| 10.4 | Chi è fermo per il tetto resta in stato «lavoro» con la causa («tetto»), senza uno stato nuovo; la sua pagina dice «Ferma per il tetto d'azienda» con parole sue; non esiste nessun «Riprendi»: c'è «Alza il tetto d'azienda», che porta a Impostazioni senza ricaricare | Console Esecuzione | Sei clic a undici (venti a quaranta) farebbero del tetto un suggerimento | modello (`pausa`, `pausaPer`) + DOM |
| 10.5 | La coda cresce di uno, non di sei: una sola richiesta di tetto per tutta l'azienda (5 in coda a undici, 8 a quaranta), prima della coda, nominata dal chip («Tetto d'azienda», mai «undefined»), con la card che dice «+N € per oggi» e non «0 € · 0 passi»; nessuna regola d'approvazione la governa; sparisce quando il tetto si alza; firmarla fa ripartire le esecuzioni | Console tendina, Richieste, Costi; telefono 1 | Senza la distinzione cadeva su «Report interni: automatica»; il tipo non stava in `nomeTipo` e la card stampava «undefined» [33] | modello + DOM |
| 10.6 | Il numero si scrive davvero: Impostazioni ha diciotto campi; scritto 200 € nel tetto del giorno il freno molla e la home dice subito «124 € su 200 € al giorno · nel limite» e «al lavoro»; scritta l'eccezione di oggi (+60 €) il tetto di oggi fa 175, chi era fermo riparte da solo e il tetto di ogni giorno resta 115 | Console Impostazioni, home | Il ramo «nel limite» non si vedeva mai nel modello di prima | modello (`tettoOggi`, `tettoAzienda().giorno`, `pausa`) + DOM |
| 10.7 | La percentuale è un gesto, non un dato: «60 %» diventa 69 € con la traccia «60 % di 115 € al giorno»; «69» resta 69 senza traccia; quello che non è un numero non scrive niente | Console Impostazioni; modello | Decisione [32] | modello (`leggiLimite`) + DOM (valore del campo, riga sotto) |
| 10.8 | I budget sotto il tetto sono facoltativi: nessun dipartimento nasce con un soffitto (la card dice «nessun budget», non la somma dei budget dei suoi); si può togliere; il budget del dipendente si scrive dalla sua pagina (due campi) e finisce nel dossier dove i Costi lo leggono | Console Costi, Impostazioni, Dipendente | Due soffitti si contraddicevano (30 € a schermo, 69 € nel modello); la penna era decorazione | modello (`budgetDip`, dossier) + DOM |
| 10.9 | Gli orizzonti: giorno e mese dappertutto, la settimana solo dove la cadenza è settimanale | Modello, routine | Decisione [32] | modello (`orizzontiDi`) |

## 11. L'esecuzione e il suo log

Ogni gesto del titolare su un'esecuzione cambia lo stato del dipendente e lascia una voce nel log.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 11.1 | Pausa e ripresa del titolare (distinte dalla pausa per il tetto): la pillola dice «Riprendi» e poi «Metti in pausa», la pausa è nel log | Console Esecuzione | Regola | modello (`pausa`) + DOM |
| 11.2 | Interrompi lascia il dipendente libero, scrive «interrotto» nel log; pausa, ripresa e interruzione fanno tre voci del titolare | Console Esecuzione | Regola | modello + DOM (conteggio voci) |
| 11.3 | Riprova sul passo in errore: il passo torna in corso, il dipendente al lavoro, nessun passo in errore | Console Esecuzione | Regola | modello + DOM |
| 11.4 | Avvia ora una pianificata: il primo passo in corso, «avviato» nel log | Console Esecuzione | Regola | modello + DOM |
| 11.5 | La nota del titolare dalla barra entra nel log con la sigla («MR: …») e la barra si svuota | Console Esecuzione | Regola | DOM |
| 11.6 | La barra dei passi tiene per esteso il passo in corso e conta in una pillola i passi oltre i due successivi | Console Esecuzione | [16] | DOM |

## 12. L'editor del dipendente

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 12.1 | «Aggiungi» apre l'editor con il fuoco sul ruolo e il dipartimento della pagina già proposto | Console Dipartimento | Regola | DOM (`activeElement`, pillola accesa) |
| 12.2 | Senza ruolo non si salva: il campo si segna in rosso, il modello non cresce, l'editor resta aperto | Console editor | Regola | modello + DOM |
| 12.3 | L'anteprima segue ruolo e dipartimento mentre si scrive | Console editor | Regola | DOM |
| 12.4 | Salvare aggiunge un dipendente con ruolo, dipartimento e tinta scelti, chiude l'editor, e la card compare fra quelle del dipartimento scelto | Console editor, Dipartimento | Regola | modello + DOM |
| 12.5 | La matita apre l'editor con i valori del dipendente; Invio salva e la card cambia; Esc chiude senza salvare | Console Dipartimento | Regola | modello + DOM |

## 13. Le consegne e la loro pagina

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 13.1 | La pagina Dipartimento ha sei sezioni e «Consegne di oggi» è la seconda; sul telefono le stesse sei, con «Da approvare» terza | Console Dipartimento; telefono 8 | [19] | DOM |
| 13.2 | Una consegna ha una pagina sua: titolo, chi l'ha fatta, il contenuto (l'esito del passo che l'ha prodotta), il passo con numero, durata e costo, gli strumenti di quel passo, le voci di log di quel passo, il collegamento all'esecuzione, le altre consegne della stessa esecuzione; sul telefono la schermata della consegna con titolo e contenuto su superficie chiara | Console Consegna; telefono 9 | Scelta dell'utente [19]: una pagina dedicata, non la tendina | DOM |
| 13.3 | Una consegna già uscita mostra il documento vero con il suo allegato e una sezione «La richiesta al titolare» con la nota del dipendente | Console Consegna | [19] | DOM |
| 13.4 | A «oggi» la pagina del dipartimento è quella di sempre; le consegne dei giorni scorsi entrano solo allargando il perimetro e «Da rifare» le raggiunge | Console Dipartimento | [20] | DOM + pixel (altezza) |

## 14. Agenda e Chat

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 14.1 | L'agenda dice la giornata del modello: un blocco per evento, il segno di «adesso» all'ora dell'azienda (10:42), i blocchi con lo stato (in corso, errore, pianificato, consegnato), «8 eventi oggi», una card per evento, sette righe della settimana con oggi in testa, le scadenze della settimana fra le righe, le scadenze ordinate con la più vicina in testa; sul telefono una card per evento e i sei giorni dopo oggi | Console Agenda; telefono 6 | [15] | DOM = `giornata()` |
| 14.2 | La chat: un filo per dipendente, il filo aperto è quello acceso nell'elenco, con i suoi messaggi e le sue consegne; i fili con messaggi da leggere stanno prima | Console Chat; telefono 4 | [15] | DOM = `filoDi` |
| 14.3 | Scrivere entra nel filo: il messaggio in fondo, del titolare, con l'ora dell'azienda; la bolla in pagina; la barra svuotata; il filo senza più non letti; l'elenco porta l'ultima nota («Tu: …») | Console Chat; telefono 5 | Regola | modello + DOM |
| 14.4 | Una nota scritta nella barra dell'Esecuzione entra nel log **e** nel filo della chat (senza il passo): una nota, due posti | Console Esecuzione, Chat | [15] | modello + DOM |
| 14.5 | Dal filo si approva: la riga della consegna decide (attesa −1) e mostra l'esito | Console Chat | Regola | modello + DOM |

## 15. Workflow e canvas

Il canvas è un componente solo per Console e telefono. Le posizioni dei nodi sono dati del titolare e non si
ricalcolano mai (regola 42); sul telefono si guarda e non si compone; i tre freni della firma anticipata valgono anche
per il permesso in testa.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 15.1 | Un workflow nasce da un'esecuzione riuscita: nessun passo rotto, almeno due passi conclusi, firma anticipata spenta; i nodi sono i passi più uno (il titolare); il costo è la somma dei passi, non una stima; sei workflow a undici | Modello | [20] | modello (`workflowDi`) |
| 15.2 | «L'ultima volta» è una catena avvenuta: i connettori sono uno in meno dei nodi; otto nodi avvenuti (i sette passi e il titolare, non i nove dichiarati che contano l'innesco); un solo nodo del titolare, l'ultimo, «Firma del titolare», **senza avatar in tinta**; le porte (modello, strumenti) sotto i nodi | Console Workflow; telefono 10 | Regola 19: il disco in tinta è un dipendente AI | DOM |
| 15.3 | I numeri dell'ultima volta sono avvenuti, non previsti: nessun nodo stampa «0 €»; i passi da fare dicono «non ancora» e la stima con «≈»; il costo del workflow è la somma dei soli passi avvenuti; la stima sta in un campo suo (`previsto`), separata dal misurato | Console Workflow; telefono 10 | Uno zero su un passo che non è successo sarebbe inventato [20]; il telefono stampava «0 €» | modello + DOM |
| 15.4 | Il nodo si apre uno alla volta: all'apertura nessuno è selezionato; il clic apre un solo nodo con i suoi campi (modello e strumenti); il canvas cresce per farci posto; «Tutto il disegno» richiude; le tre porte del nodo aperto non si stampano (16 → 13) e nessuna etichetta rimasta è sua | Console Workflow | Le porte sono la prima parola tagliata dei campi che la card mostra per esteso | DOM + pixel (etichetta di porta al centro di `x + 34 + 62k`, `y + 104`) |
| 15.5 | La firma anticipata nasce «Spenta», dichiara tre freni con i loro numeri (soglia in €, perimetro, scadenza in esecuzioni), si accende e si spegne con un clic, un workflow alla volta; il nodo del titolare resta | Console Workflow; telefono 10 | [20] | DOM |
| 15.6 | Il grafo di partenza: 9 nodi (l'innesco «Quando parte», uno solo, con il fianco arrotondato ≥ 36 px; sette passi; la firma) e 8 archi che vengono dagli archi del modello, non dall'ordine dell'array; ogni filo parte dalla presa d'uscita del nodo che parte e arriva a quella del nodo che arriva (zero capi scollati); nessun filo esce dai 1008 px; 8 prese d'uscita (tutti tranne il titolare) e 8 d'entrata (tutti tranne l'innesco); ogni arco porta il suo «+» e la sua «×»; «poi» non si stampa; zero incroci | Console Workflow, grafo | [23]: i nodi leggevano la posizione dal nodo e gli archi dalla serpentina | DOM + pixel (`getPointAtLength` agli estremi del filo) |
| 15.7 | I due divieti stanno nel modello e si vedono: il nodo del titolare non ha le azioni del comporre né la presa d'uscita; l'innesco non ha la presa d'entrata; l'innesco aperto porta il permesso («Chiedi prima di …» / «Fai pure») e lo si cambia dal canvas | Console Workflow | Decisione 66 | DOM |
| 15.8 | Trascinare: un pixel del canvas vale zoom pixel di schermo, a 1440, 1920 e 1024 px e con lo zoom a 1,5 e 0,6; il nodo finisce esattamente dove lo si lascia, agganciato ai 18 px della griglia e dentro la colonna (0 ≤ x ≤ 1008 − 208 − 8) | Console Workflow, tre larghezze, tre zoom | Il fattore composto si misura sul rettangolo della cornice, non si indovina | pixel + DOM (`style.left/top` multipli di 18) |
| 15.9 | **Regola 42**: le posizioni dei nodi non si ricalcolano mai. Sono identiche al pixel dopo lo zoom (Console e telefono), dopo il trascinamento della vista e dopo il pinch | Console Workflow; telefono 10 | Sono dati del titolare, non una disposizione da rifare per far stare il disegno nello schermo (decisioni 72–73) | DOM (`offsetLeft`,`offsetTop` di ogni nodo prima e dopo) |
| 15.10 | «Riordina» riduce gli incroci (tre nodi trascinati a caso ne creano più di zero), rimette ogni nodo sulla griglia e nella colonna, e non tocca né i numeri dei passi né gli archi; su un grafo intonso non cambia una parola; i sette passi si chiamano da 1 a 7 e l'innesco non è un passo | Console Workflow | Prima Passo 1 diventava Passo 2 a cascata su tutti e sette; l'innesco rubava il numero 1 | DOM (numeri e archi prima e dopo) + geometria (incroci fra segmenti) |
| 15.11 | Collegare: tirare da una presa a un nodo crea un arco (8 → 9) attaccato alle prese come gli altri; rilasciare nel vuoto crea un passo **già collegato** (10 nodi, 10 archi); il «+» sull'arco infila un passo in mezzo (10 / 9); la «×» toglie l'arco; Canc toglie il passo scelto e ricuce la catena (9 → 8) | Console Workflow | [24] | DOM (conteggi di nodi e archi) |
| 15.12 | Il significato sta sul collegamento, non sulle porte del nodo: il clic sul filo gira fra se… → insieme → se si ferma → poi (che non si stampa); il nodo non guadagna nessuna porta; l'etichetta sta nei 150 px | Console Workflow | Decisione 65: il fan-out illimitato resta gratis | DOM + pixel |
| 15.13 | Un passo nuovo nasce sui punti della griglia (18 px), un passo di riga (342) sotto il suo riferimento, e — poiché nasce **aperto** — non copre nessun altro nodo: su otto modi di crearlo (dentro il nodo aperto, sul filo, da innesco e tre passi) zero coperture; il posto libero si cerca scendendo, e il più lontano nasce entro y 900 (prezzo dichiarato) | Console Workflow | Nasceva a +210, che multiplo di 18 non è; il freno misurava il nodo chiuso (87 + 18) invece della card aperta (273): il «+» sull'arco posava un passo che aperto ne copriva due, il «+» nell'innesco copriva il titolare [29] | pixel (sovrapposizioni fra rettangoli) |
| 15.14 | Niente si copre per mano del prodotto: due nodi chiusi non si sovrappongono mai (≥ 120 stati: ogni nodo aperto e chiuso, ultima volta / grafo / grafo ingrandito, due taglie); nessun nodo finisce sotto la barra in fondo (62 px); il nodo aperto non copre nessun altro (≥ 30 nodi aperti su sei workflow); nessuna etichetta di porta si sovrappone a un'altra; il nodo aperto più alto è 311 px (263,4 in sola lettura, senza la riga delle azioni) | Console Workflow; telefono 10; undici e quaranta | Il nodo aperto copriva 5 nodi su 9, 3 per intero (18 096 px²); 5 scontri di etichette da 6 px; il passo di riga è passato a 342 [29] | pixel |
| 15.15 | Se la copertura la fa la mano del titolare (un nodo trascinato sotto un altro), il prodotto se ne accorge: nessuna presa, tag o etichetta di un nodo nascosto resta viva sopra la card aperta; la riga in cima mostra «1 nodo ne copre un altro quando lo apri · Riordina» (al singolare, in «nodi» perché il coperto può essere l'innesco o la firma), unica pillola cliccabile, in lime, dentro i 992 px; premerla chiude la copertura. Sul telefono la riga in cima non c'è e nemmeno la pillola | Console Workflow; telefono 10 | Due prese restavano cliccabili sotto la card e nasceva un collegamento da un nodo che non si vede [29]; [30] | pixel (`elementFromPoint` sul centro della presa) + DOM |
| 15.16 | Zoom e mini-mappa: lo zoom interno è un `transform` che compone esattamente con la cornice (nodo = 208 × larghezza/1440 × zoom, a tre larghezze e tre zoom); «+» porta a 1,25 (208 → 260 px), «0» torna a 1; la mini-mappa c'è quando qualcosa esce dalla cornice (col passo a 342 sempre: 974 px di disegno su 820) e non copre nessun nodo, etichetta o tag; lo zoom vale anche su «L'ultima volta», con la sua barra | Console Workflow | Fino alla [26] «L'ultima volta» era `ramo ? zoom : 1`, metà pagina senza zoom né mappa | pixel + DOM |
| 15.17 | Selezione multipla e scorciatoie: Shift sceglie due passi senza aprirne nessuno; si trascinano insieme dello stesso spostamento; Esc lascia; Canc toglie; R riordina; + e 0 sullo zoom | Console Workflow | [24]: i quattro acceleratori di n8n | DOM |
| 15.18 | I rami che non arrivano alla firma si dicono, non si vietano: con la catena di partenza nessun avviso; staccato l'ultimo arco compare il tag «resta in azienda» e la riga in cima lo ripete | Console Workflow | [24] | DOM |
| 15.19 | I tre freni valgono anche per il permesso in testa: su un ramo terminale costruito con il gesto vero (si tira dalla presa e si rilascia nel vuoto, perché nel grafo di partenza i rami terminali sono zero e un confronto fra zeri non prova niente), «chiedi prima di consegnare» lo tiene in azienda; «chiedi prima di partire» e «fai pure» lo fanno uscire senza passare dalla coda ma con i tre freni (soglia, perimetro, scadenza, dalla stessa funzione della firma); il regime dice che a firmare è il permesso; il tag diventa «esce senza la tua firma», la riga in cima lo conta, la sezione della firma dice «Dal permesso» e «tre freni», le tre card restano | Console Workflow; telefono 10 | Decisione 71: la clausola faceva uscire le consegne con zero freni, ed era la seconda strada per spegnere la firma | modello (`ramoEsce`, `ramoFreni`, `ramoRegime`) + DOM |
| 15.20 | Sul telefono il canvas è in **sola lettura**: zero prese, zero «+» sull'arco, zero «×», zero nodi trascinabili, zero «Riordina», «Aggiungi» o cambio di significato; il canvas si dichiara con un interruttore, non con un secondo disegno; le etichette del contratto stanno fuori dal canvas, dicono la firma e non la topologia («2 rami» è disegno) | Telefono 10 | Decisioni 72 e 74 | DOM (conteggio dei cinque gesti) |
| 15.21 | Lo scatto d'ingresso del telefono: si entra a «tutto dentro» (colonna 278,4 px su 910 = 0,306) con il grafo che tocca tutti e due i fianchi; la cornice scalata resta 1008 px come nella Console (cambia da quanto lontano la si guarda, non il disegno); il tocco su un nodo porta a scala 1 centrato su quello (< 1,5 px dal centro) e ne apre i campi; a scala 1 il disegno esce di 730 px e si raggiunge trascinando; un secondo tocco rimette tutto dentro; `?nodo=` apre a scala 1; anche «L'ultima volta» entra a tutto dentro | Telefono 10 | Decisione 73 | pixel + DOM (`data-zoom`, `data-vista`) |
| 15.22 | I due gesti del dito: trascina-la-vista con 160 px di dito muove la vista di 128 px di disegno (160 / 1,25 della cornice) senza cambiare lo zoom; un dito in verticale è della pagina (`touch-action: pan-y`), non del canvas; il pinch a un terzo porta lo zoom a un terzo e la card si abbassa con lui (altezza = basso × zoom); il fondo dello zoom è «tutto dentro», sotto non c'è disegno | Telefono 10, con tocco | Fino alla [26] nel repository non c'era nessun ascoltatore touch; il pinch vuole due dita, costruite con `TouchEvent` | DOM (`data-pan`, `data-zoom`, altezza) |

## 16. Routine e regole

Una routine esegue, non decide: la regola d'azienda vince sulla clausola. Quello che è uscito senza il titolare si chiama
«Uscita». Ogni riferimento a chi ha deciso risolve a un record che esiste.

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 16.1 | «Uscita», non «Approvata», su ciò che è uscito senza il titolare (3 righe su 12; le altre nove le ha approvate davvero); la pagina della consegna dice «Uscita senza la tua firma» e chi l'ha decisa | Console Richieste, Consegna | Il participio era l'affermazione principale della riga e diceva il falso, con l'autore vero in grigio in coda [22] | DOM |
| 16.2 | La precedenza: la regola d'azienda attiva vince sulla clausola della routine, che può solo stringere; i contrasti si contano (0 a undici, 2 a quaranta: un post e una lista verso clienti veri usciti da una routine mentre la regola dice «Sempre da approvare»), la pagina li segna in pillola rosa «contro <regola>», solo su righe «Uscita»; il dato non si corregge di nascosto | Modello; Console Richieste; undici e quaranta | Conferma c [22] | modello (`contrastoDi`) + DOM (testo della pillola, non la classe: la rosa la porta anche «Rifiutata») |
| 16.3 | Ogni uscita ha una regola e una sola: la somma dei conti delle regole è il totale delle richieste che non sono il tetto, nessuna senza regola; la richiesta del tetto non ne ha nessuna, perché non è un'uscita ma una decisione sull'azienda | Modello; undici e quaranta | Senza la distinzione la pagina stamperebbe che un rendiconto governa il tetto di spesa | modello (`contaRegola`, `regolaPer`) |
| 16.4 | Le regole sono accese e dicono che cosa trattengono: tutte e quattro attive, nessuna card spenta; ogni card stampa il suo conto («Governa 13, 4, 3, 0»); lo zero di «Spese sopra 50 €» è in rosa (la consegna più cara costa 33,80 €); una regola ha **uno** stato solo, lo stesso nelle Richieste e nella pagina Dipendente | Console Richieste, Dipendente; undici e quaranta | g4 era «Attiva» nelle Richieste e «Spenta» in ogni Dipendente: i dossier ne tenevano una copia ferma [22]–[33] | modello + DOM su due pagine |
| 16.5 | Chi ha deciso al posto del titolare risolve a un record che esiste: ogni decisione ha un autore con un nome; ogni routine punta a una regola, a richieste e a un dipendente esistenti; le righe dicono «regola · …» o «routine · …», mai «non si sa quale» | Modello; Console Richieste; undici e quaranta | «Fatture ricorrenti» e «Follow-up» erano stringhe libere che in `m.regole` non esistevano [21] | modello (`autoreDi`, join sugli id) |
| 16.6 | Il record della routine: tre, non otto (gli otto lati — obiettivi che si ripetono, pianificati, richieste decise — restano); un lavoro pianificato dal titolare per oggi non è una routine; ognuna porta il suo innesco («Ogni …»), la clausola e il rodaggio di tre giri, che nessuna ha finito; a quaranta tre con lo stesso criterio e nessuna nata da una richiesta rifiutata | Modello; undici e quaranta | [21] | modello (`routine`, `routineDi`, `rodaggioDi`) |
| 16.7 | La pagina delle routine: «ROUTINE» con tre righe, quattro sezioni; i passi dichiarati (due nomi più la firma) dicono «non ancora misurato»; la testata dice che il «fai pure» non se l'è ancora guadagnato e che la regola vince sulla clausola; nel Dipartimento la pillola dei workflow dice «Il lavoro avvenuto» (il dichiarato è la routine); la routine con un workflow ci porta, quella senza dice perché non ce l'ha | Console Routine, Dipartimento | Conferma e [22]: la routine dichiara, non misura | DOM |

## 17. Avatar

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 17.1 | Otto tinte; quella scelta si segna e si salva sul dipendente | Console editor | Regola 19 | DOM + modello |
| 17.2 | Nessun punto di stato su chi è fermo: gli avatar con il segnale che appartengono a un dipendente in pausa sono zero | Console home; undici e quaranta | Regola 19: lime = al lavoro, giallo = da approvare, rosa = errore, niente da fermo | DOM + modello |
| 17.3 | Il nodo del titolare non porta un avatar in tinta | Console Workflow | Regola 19: il disco in tinta è un dipendente AI | DOM |

Non tenuto dalle suite: «nessun avatar ripetuto nella card». Se il prodotto lo vuole, la prova va scritta da zero.

## 18. Il lime dice una cosa sola

Il lime è la firma del titolare e il segno di chi lavora davvero; non si presta ad altro (regola 4).

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 18.1 | Le righe lime della home a quaranta sono quante le persone che lavorano davvero (zero, col tetto che ferma tutte) | Console home, a quaranta | La riga compatta restava lime su chi il tetto aveva fermato: 12 su 12 [33] | DOM = modello |
| 18.2 | Nei Costi nessuna riga lime: l'oltre budget lo dice la parola nel chip («· oltre»), su tutte le righe oltre | Console Costi, a quaranta | La stessa classe, nella stessa taglia, per due fatti diversi [33] | DOM = modello |
| 18.3 | «Uscita» non è mai in lime | Console Richieste | [22] | DOM |
| 18.4 | Nella riga in cima del canvas l'unica pillola cliccabile si distingue con l'accento lime e il cursore, non con un colore nuovo | Console Workflow | Regola 4 | `getComputedStyle` (colore, cursore) |

## 19. CSS e console

| # | Cosa deve essere vero | Dove | Perché | Come si misura |
|---|---|---|---|---|
| 19.1 | Nessuna variabile CSS usata **senza valore di ripiego** (`var(--x)`) e mai definita, nei fogli e negli attributi `style` | Tutte le pagine | La pillola era `color: var(--t1)` e `--t1` non esisteva: il colore cadeva sull'ereditato in silenzio e l'unica pillola cliccabile era identica alle altre. Errore muto: nessun avviso, nessuna prova rossa [30] | scansione dei fogli: usi senza ripiego meno definizioni |
| 19.2 | Console pulita: nessun `pageerror` né `console.error` alla fine di ogni suite, a ogni passo del telefono, dopo ogni decisione; e un'eccezione in una verifica non deve far sembrare passate le verifiche che non partono | Console e telefono | Toccare funzioni rimosse dentro un `evaluate` senza `try/catch` faceva rigettare l'intera suite con 159 verifiche che sembravano passate | console |

Non tenuto dalle suite: la risoluzione dei riferimenti dello sprite (`use href="#i-…"` verso un `symbol` esistente).
La cosa più vicina è il conteggio delle frecce per `href` (4.2), che non verifica l'esistenza del simbolo. Anche il
filtro «Titolare» del log dell'Esecuzione è dentro un `if` che nel modello di prova non si accende: la sua verifica non
è mai stata eseguita.

## Riepilogo

| Tema | Invarianti | Verifiche che le tenevano qui |
|---|---|---|
| 1. Il titolare decide | 13 | 51 |
| 2. Coerenza fra superfici | 8 | 41 |
| 3. Onestà dei numeri | 8 | 37 |
| 4. Niente controlli inerti, niente frecce senza destinazione | 5 | 19 |
| 5. Ogni strada porta dove dice | 9 | 57 |
| 6. Niente controlli coperti | 7 | 34 |
| 7. Niente testo tagliato | 5 | 20 |
| 8. Scala | 8 | 51 |
| 9. Filtri, ricerca e periodi | 7 | 48 |
| 10. Limiti e freno | 9 | 48 |
| 11. L'esecuzione e il suo log | 6 | 15 |
| 12. L'editor del dipendente | 5 | 14 |
| 13. Le consegne e la loro pagina | 4 | 21 |
| 14. Agenda e Chat | 5 | 20 |
| 15. Workflow e canvas | 22 | 151 |
| 16. Routine e regole | 7 | 47 |
| 17. Avatar | 3 | 5 |
| 18. Il lime dice una cosa sola | 4 | 5 |
| 19. CSS e console | 2 | 8 |
| **Totale** | **137** | **692** |

Le 692 sono le verifiche eseguite (Console 214, telefono 92, Costi 53, Agenda e Chat 56, Workflow 225, Routine 52),
attribuite al tema della proprietà che tengono; sei di esse misurano forme scartate (tema 2) e si contano ma non si
portano. Fonti: `schermate/direzioni/prove/README.md`, le **sei** suite nella stessa cartella e il modulo che condividono,
`visibile.js`, che non è una prova.
