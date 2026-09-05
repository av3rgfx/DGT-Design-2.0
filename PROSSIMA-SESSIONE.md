# Prossima sessione — passaggio di consegne

Stato al 2026-09-05, fine della sessione sull'**identità degli orbi** (versione 10 della direzione A · Console: le tinte, gli
occhi «lilguy», il punto di stato e il gesto nelle pile). Tutto è committato e pushato sul branch indicato sotto, con la
**PR #7** aperta verso `main`. **Prossimo passo deciso dall'utente: le approvazioni da mobile**, con la struttura proposta e
accettata (sotto, «Come riprendere»).

## Stato

- Branch: `claude/direzione-a-corrections-mobile-2x5j8x` (da `main`, che contiene le PR #1, #3, #4, #5 e #6). A fine sessione
  è aperta la **PR #7** verso `main` (https://github.com/av3rgfx/DGT-Design-2.0/pull/7): se all'avvio della prossima sessione
  risulta già unita, ripartire da `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si
  aggiorna da sola.
- Artefatto della **Console** (direzione A cliccabile: home, tendine, Richieste, Dipartimento, editor del dipendente, pagina
  del Dipendente, pagina dell'Esecuzione, avatar della versione 10):
  https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34 (indirizzo nuovo dal 2026-09-05; i precedenti
  93d18853 e 8a8a273e tengono le versioni con la perla nera e senza il punto di stato). Si rigenera con
  `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatto dell'**identità degli orbi** (`avatar-identita.html`: nove strade, tre varianti per lo stato, configuratore con
  corpo, palette, occhi, stato e identità, la prova sugli undici vicini e la Console vera):
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6 (il precedente 690baac8 tiene la versione prima
  della scelta dello stato).
- Artefatti precedenti, non toccati: pelli dell'orbe https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
  (`avatar-pelli.html`), le due famiglie kit/orbe https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
  (`confronto-avatar.html`), confronto A/B/C https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`confronto.html`), specimen https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (`DESIGN.md` non descrive
  ancora la sezione «moto» dello specimen: da fare). Queste pagine usano l'orbe con i predefiniti del motore (perla nera,
  pupille del kit), non l'aspetto della Console.
- Documento unico: `SYSTEM-DESIGN.md` (sezione 6, riga «Avatar del dipendente AI» riscritta per la versione 10; sezione 10,
  regole 1–19). Studio e versioni della direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4: «Versione 10» con le
  sette tornate sull'identità e le scelte; «Versione 11» con la struttura del mobile da costruire).
- Regola in `CLAUDE.md`: avatar = disco piatto nella tinta del dipendente, occhi grandi con sclera bianca e pupilla nera,
  stato dal punto sul bordo (nelle pile dal gesto). Niente emoji resta regola fondamentale.

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
    al titolare con evidenze. Costruita nella sessione precedente; **l'utente non ha ancora dato un giudizio** (in
    questa sessione ha chiesto solo l'avatar e l'esecuzione).
14. **2026-09-04, questa sessione, lavoro 1**: «l'avatar sembra un'icona animata; deve essere un avatar, senza quel
    contorno bianco; dammi più soluzioni per la visibilità sul fondo; vale per tutte le pagine». Fatto: disco e anello
    tolti; quattro pelli costruite (chiaro, perla nera, grigio, alone) più la vecchia «disco» per il confronto, nella
    pagina `avatar-pelli.html` e nel suo artefatto. **Scelta fatta in sessione: «chiaro»** (orbe chiaro con occhi
    neri sul nero, perla nera con occhi bianchi sulle superfici chiare e lime), perché è la più visibile e la più
    vicina all'orbe di riferimento. **Superata dalla decisione 16**: l'utente ha scartato «chiaro» («Chiaro non va
    bene»); la predefinita è «perla» (primo elemento di `PELLI` in `avatar-orbe.js` e `DGT_AVATAR.pelle(q.get('pelle')
    || 'perla')` in `direzione-a.html`).
15. **Lavoro 2**: la pagina dell'Esecuzione (passi, log, output) dall'«occhio» delle card al lavoro; struttura proposta
    e costruita nella stessa sessione (versione 8). **Da confermare dall'utente** (non ancora giudicata).
16. **Seconda tornata sull'avatar**: «Chiaro non va bene. Poi vorrei renderli tondi e meno ovali. E le animazioni non
    mi piacciono, sono scadenti e poco fluide». Fatto (versione 7b): pelle **perla** predefinita (nero lucido con
    riflesso, luce riflessa, orlo e bagliore, un solo colore su ogni fondo), **corpi tondi** (cerchi; via superellisse,
    inclinazione, rigonfiamento, squash e stretch), **moti continui** (via i keyframe CSS; un solo
    `requestAnimationFrame` per pagina con funzioni del tempo: respiro, galleggiamento, sguardo con proiezione sferica,
    palpebre con easing, un moto quieto per stato). Giudizio: «Così già meglio».
17. **Terza tornata**: «preferivo gli occhi del kit di riferimento, nel quale hanno occhi più grossi e i movimenti
    degli occhi più carini». Fatto (versione 7c): le pupille del kit per seme (`deriveRole(seme).pupil`: tonda,
    quadrato morbido, anello; 0,16–0,185 del raggio), dipinte sulla sfera con la base tangente del kit (yaw, pitch,
    roll della testa: l'occhio lontano si stringe da solo) e con i suoi moti dello sguardo. Giudizio: «va bene adesso».
18. **Correzioni della cornice** (versione 9): le tendine e le pillole fisse «spostate» sugli schermi larghi e la Console
    che non si adattava → `zoom` alla larghezza dello schermo, in su e in giù; l'avatar ripetuto nel selettore della
    card del lavoro → chip di stato; il «+1» sotto gli avatar nella card dell'obiettivo → badge dopo la pila;
    **niente emoji** nel prodotto e nel sistema (regola fondamentale in `CLAUDE.md`, `i-fire` al posto della fiamma).

19. **2026-09-05, l'identità degli orbi** («molti avatar vicini, o piccoli in fila, non rendono l'idea di diversi
    dipendenti: sono tutti uguali; magari di diversi colori»). Prima tornata: perle colorate, tinta del dipartimento, toni
    di grigio, carattere degli occhi → **perle colorate**.
20. Seconda tornata: «colori più accesi e vivaci; gli occhi non si vedono bene, ricreare gli occhi di lilguy.net; forse
    piatti senza 3D; più opzioni e varianti» → configuratore con corpo (perla, piatto, orlo), palette (scura, vivace,
    pastello), occhi (attuali, punti grandi, lilguy, neri, colorati) e nove strade preimpostate. Il riferimento studiato dal
    widget del sito, ricostruito in locale: occhi enormi al centro, bianco colorato e pupilla a contrasto.
21. Terza tornata: ristrette a **strada 1** (vivace piatto, lilguy) e **strada 8** (nero, occhi colorati); pupille grandi
    sempre, dormiente con le palpebre chiuse ad arco, X in errore; nella 1 sclera sempre bianca. Quarta: **pupille sempre
    nere** in entrambe («troveremo un modo diverso per visualizzare lo stato»). Quinta e sesta: nella 8 pupille bianche,
    poi **senza pupille** (occhi pieni colorati).
22. **«Scelgo la 1»**: portata nel prodotto (tinta nel modello, riga «Colore» nell'editor, `av()` passa tinta e dipartimento,
    aspetto in `direzione-a.html`, dischi che riempiono la casella, pile con l'anello del fondo).
23. Lo stato: tre varianti («una come hai proposto tu, le altre con animazioni premium dinamiche dell'avatar») → **punto**
    sul bordo, **anello vivo** animato, **gesto** del corpo con squash e stretch.
24. **«Punto come standard, ma per gli avatar piccoli delle card dei dipartimenti voglio gesto»**: applicato a tutte le
    pile (card dei dipartimenti e degli obiettivi, coppie della barra agenda), che passano tutte da `pair()`.
25. La struttura delle **approvazioni da mobile** proposta all'inizio della sessione è accettata («si procederà con le
    approvazioni da mobile come proposto»). Restano non giudicate la pagina dell'Esecuzione (versione 8) e la pagina del
    Dipendente (versione 6): l'utente non ha dato correzioni.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato: occhi ridisegnati nel linguaggio del sistema);
contenuti sintetici di DGT; documenti in italiano.

## Come riprendere: le approvazioni da mobile

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 6 e 10) e `schermate/direzioni/DIREZIONI.md` («Versione 10» e «Versione
   11»). Controllare la PR #7 (vedi «Stato»).
2. Aprire `schermate/direzioni/direzione-a.html` per la Console com'è oggi; `design-system/specimen.html`, sezione «(02) DGT —
   App mobile», per le tre cornici del telefono (`.phone`, `.screen.lightbg|.daily|.callscr`, `.sb` barra di stato, `.nav`,
   `.bnav` navigazione a pillola con `.meet` lime e `.tabs`, il Riepilogo `.summary` con `.tline` e `.dcard`; i colori: `--light`
   `#E0E0E0`, `--summary` `#F4F4F4`, `--docs` `#E4E4E4`, lime `#B8FC64`, `--lime-deep` `#A8E65D`, `--hangup` `#F15E60`, `--badge-red`
   `#F9A3A3`, raggi `--r-card` 28, `--r-inner` 22). Le richieste sono in `dati.js` (`richieste11`, `m.richiesteDi('attesa')`,
   `inAttesa` ordina le più vecchie prima; i tipi post, documento, lista, proposta, revisione; `decidi()` è dentro `monta` in
   `direzione-a.js`, riga ~1425, con `m.decidiRevisione` per le revisioni); la tendina «Da approvare» e quella estesa sono
   `tendinaAperta`, `cardRichiestaCorrente`, `tendinaEstesa` in `direzione-a.js` (~riga 700).
3. **La struttura accettata** (dettagli in `DIREZIONI.md`, «Versione 11»): cornice del telefono dello specimen con la
   navigazione a pillola (quattro cerchi del rail + campanella lime con il numero da approvare); tre schermate: **Da
   approvare** (fondo chiaro, card lime della richiesta corrente con i quattro cerchi apri/commenta/approva/rifiuta, «In
   coda», riga «Riepilogo di oggi»), **Richiesta** (la tendina estesa in colonna su fondo nero: documento, chi la propone,
   nota, barra fissa Approva/Chiedi modifiche/Rifiuta con il motivo obbligatorio; per una revisione le due versioni con le
   differenze), **Riepilogo di oggi** (il pannello Riepilogo dello specimen; anche stato vuoto). Un file a parte
   (`mobile.html` + `mobile.js`) con gli stessi `comune.js`, `dati.js`, `avatar/`; `decidi` spostata in `dati.js` come `m.decidi`
   così telefono e Console condividono lo stato; i tre telefoni affiancati come lo specimen, tutti cliccabili,
   `?schermata=1|2|3&richiesta=0`.
4. **Divisione**: in questa sessione le schermate 1 e 2 per post, documento, lista e proposta, con il rifiuto con motivo;
   screenshot delle cornici con `design-system/tools/screenshot-elementi.js`; artefatto (`build-unico.js mobile.html`);
   `DIREZIONI.md` (Versione 11), `SYSTEM-DESIGN.md` (sezione 6 riga «Mobile», sezione 10), README, questo file; commit e
   push. Nella sessione successiva la revisione sul telefono, il Riepilogo, la prova a quaranta e lo stato vuoto.
5. Gli avatar nel mobile: gli stessi orbi della Console (`DGT_AVATAR.html(seme, stato, { tinta, dip })` via una `av()` come
   quella di `direzione-a.js`), con l'aspetto impostato all'apertura come in `direzione-a.html` (`DGT_AVATAR_ORBE.aspetto({
   identita: 'tinta', palette: 'vivace', finitura: 'piatta', occhi: 'lilguy', segnale: 'punto' })`); nelle pile `{ segnale:
   'gesto' }`. Il CSS di `.av` vive dentro `.dirA .a-app`: fuori dalla Console va ridichiarato (vedi `avatar-identita.html`).

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): i filtri inerti delle sezioni Passi,
Output e Costo dell'Esecuzione; «Sposta», «Ripeti» e le frecce dei passi senza tendina del passo; lo stato vuoto del
dipendente appena creato («Nessuna esecuzione»); la pagina del Dipendente (versione 6) e quella dell'Esecuzione (versione
8) mai giudicate.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier).
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node screenshot-page.js "../../schermate/direzioni/direzione-a.html?pagina=esecuzione&id=4&tendina=chiusa" /percorso/a.png`.
- `screenshot-elementi.js` (nuovo, 2026-09-05) — cattura elementi per selettore (`node screenshot-elementi.js pagina.html
  prefisso '#sel1' '.sel2'`); `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `CLICK="sel|sel"`. Per le cornici del
  telefono e le card.
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Pellicola degli avatar: una pagina con più copie di un orbe per stato e un `data-t` per copia, `DGT_AVATAR_ORBE.fermo(0)` e
  poi `fotogramma(svg, t)`; cattura con `screenshot-elementi.js` e `MOTION=no-preference`. Tenuta fuori dal repository:
  dieci righe da rifare al bisogno.
- Prova cliccata: uno script Playwright (`reducedMotion: 'no-preference'`) che apre la Console, clicca le azioni e verifica il
  DOM e gli errori di console; fuori dal repository, da rifare al bisogno.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. La
  navigazione di Chromium verso siti esterni attraverso il proxy viene resettata: per studiare un sito si scaricano gli
  asset con `curl` e si serve la copia in locale (`http-server` su localhost, che è fuori dal proxy).
- La Console gira da `file://` e come file unico: **niente moduli ESM**. Il kit avatar è impacchettato in uno script classico.
- Gli screenshot usano `reducedMotion: 'reduce'`, quindi gli avatar sono al fotogramma fisso; il gesto nelle pile e il moto
  in genere si vedono solo nell'artefatto o con `MOTION=no-preference`.
- **L'orbe della versione 10** (`avatar/avatar-orbe.js`): l'aspetto della pagina sta in `html[data-identita|palette|finitura|
  occhi|segnale|carattere]` (`aspetto({…}, radice)`), e `html(seme, stato, opz)` lo stampa sull'SVG (`data-modo`, `data-tinta`,
  `data-palette`, `data-finitura`, `data-occhi`, `data-segnale`, `data-dip`). Il corpo con identità è un colore pieno (`--av-base`
  da `--av-tinta-c` per palette e tinta, generato nel CSS per le otto tinte × tre palette) con sopra `.ombra` (l'ombreggiatura
  della perla), che la finitura piatta spegne insieme a luci, orlo e bagliore; con il corpo piatto `--av-scala` è 128 % (il
  disco riempie la casella) e le pile riprendono l'anello del fondo con 9 px di sovrapposizione. Gli occhi grandi sono
  `.occhio.lg` con `.sclera` (cerchio unitario o il tracciato della ghianda) e `.pupilla` traslata verso lo sguardo
  (`pupillaXY`), in geometria piana (`posaPiana`: la coppia scivola di poco verso lo sguardo); `forma(seme)` estrae i
  parametri lilguy da un generatore a parte (`#lilguy`). Da libero l'occhio è la palpebra ad arco (`.palpebra`); in errore la
  pupilla è una X. Il segnale di stato sta fuori da `.tutto` (`.segnale`: `.punto`, o `.giro/.arco`, `.onda`, `.tratto`, `.tacche`
  per l'anello vivo); il gesto è un ramo di `posa()` che aggiunge squash e stretch (`scale(sx sy)` su `.tutto`).
- Il modello dà la tinta con `m.tintaDi(e)` (`e.tinta` o rotazione sull'id) e la meno usata con `m.tintaLibera()`; `TINTE_ID`
  in `dati.js` ha gli stessi nomi di `TINTE` in `avatar-orbe.js`, i colori stanno solo nel sistema.
- Gli occhi del kit (7c), le pelli (variabili CSS su `[data-pelle]`), `.av:has(>svg.orbe)`, il CSS di `.av` dentro `.dirA .a-app`,
  `DGT_UI.prefissa`, gli intagli con `--behind`, le tendine che coprono la destra, la barra dei passi, l'esecuzione in cache,
  le differenze LCS e la Console che si scala con `zoom`: come nelle note della sessione precedente (vedi la storia di
  questo file in git, commit `f3a5d53`).
- Gli artefatti si ripubblicano allo stesso URL solo se lo strumento accetta; in questa sessione ha rifiutato ogni
  aggiornamento in loco chiedendo di rileggere per intero la copia live (300–400 KB): si è scelto di pubblicare a un
  indirizzo nuovo e aggiornare i collegamenti nei documenti (Console: 93d18853 → 8a8a273e → e6699f3a; identità degli orbi:
  690baac8 → 1fc2ee53). Per un artefatto nuovo serve un percorso di file nuovo e un `favicon`. Mai forzare.

## Cosa manca

1. **Le approvazioni da mobile** (deciso): vedi «Come riprendere».
2. **La pagina dei costi dell'azienda**: per dipartimento, dipendente, cliente, modello, strumento; riusa la card costo
   dell'esecuzione e le righe della spesa del mese.
3. **Manutenzione**: descrivere la sezione «moto» dello specimen in `DESIGN.md`; estrarre i componenti di `direzione-a.js` in
   `schermate/componenti.js` (il mobile riusa card, pillole e tendine: potrebbe essere il momento).
4. Giudizio dell'utente sulle pagine dell'Esecuzione e del Dipendente; tendina del passo; stato vuoto del dipendente nuovo.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #7: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/direzioni/direzione-a.js, dati.js, comune.js,
avatar/): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji, solo le icone dello sprite;
gli avatar sono quelli della versione 10 (tinta, occhi lilguy, punto di stato, gesto nelle pile).

Costruisci le approvazioni da mobile con la struttura già accettata (PROSSIMA-SESSIONE.md «Come riprendere», DIREZIONI.md
«Versione 11»): prima metà, le schermate «Da approvare» e «Richiesta» per post, documento, lista e proposta, con il rifiuto
con motivo, in mobile.html + mobile.js, la decisione spostata in dati.js come m.decidi. Poi screenshot delle cornici con
design-system/tools/screenshot-elementi.js, artefatto con build-unico.js, aggiornamento di DIREZIONI.md, SYSTEM-DESIGN.md,
README e PROSSIMA-SESSIONE.md, commit e push. Alla fine mostrami le schermate e fermati: il Riepilogo, la revisione sul
telefono, la prova a quaranta e lo stato vuoto sono per la sessione dopo.
```
