# Prossima sessione — passaggio di consegne

Stato al 2026-09-05, fine della sessione sull'**orbe senza disco** (versione 7 della direzione A · Console: le pelli;
7b: perla, corpi tondi, moti fluidi; 7c: gli occhi del kit), sulla **pagina dell'Esecuzione** (versione 8) e sulle
**correzioni della cornice** (versione 9: zoom, card, niente emoji). Tutto è committato e pushato sul branch indicato sotto.

## Stato

- Branch: `claude/avatar-execution-page-nv8dm4` (da `main`, che contiene le PR #1, #3, #4 e #5). A fine sessione è
  aperta la **PR #6** verso `main` (https://github.com/av3rgfx/DGT-Design-2.0/pull/6): se all'avvio della prossima
  sessione risulta già unita, ripartire da `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso
  branch e la PR si aggiorna da sola.
- I tre artefatti della direzione A qui sotto sono stati ripubblicati a fine sessione e corrispondono all'ultimo
  commit del branch.
- Artefatto della direzione A cliccabile (home, tendine, Richieste, Dipartimento, editor del dipendente, pagina del
  Dipendente, **pagina dell'Esecuzione**, orbe senza disco): https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
  (si aggiorna con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/a.html` e ripubblicando allo
  stesso URL).
- Artefatto delle **pelli dell'orbe** (le quattro soluzioni senza disco a confronto su tutti i fondi della Console, con
  il selettore che cambia la pelle in tutta la pagina): https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
  (`node build-unico.js avatar-pelli.html /percorso/pelli.html`; è un URL nuovo: il primo,
  https://claude.ai/code/artifact/a196c232-35ce-4bf0-ae6c-e472ca0c87f3, tiene la prima versione con «chiaro» e non si
  aggiorna senza rileggere per intero la copia salvata dallo strumento).
- Artefatto delle due famiglie di avatar a confronto (kit e orbe perla): https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
  (`node build-unico.js confronto-avatar.html /percorso/avatar.html`; indirizzo nuovo dal 2026-09-05: il vecchio
  4bc0c3ee non si aggiornava senza rileggere per intero la copia live, come era successo per le pelli).
- Artefatto del confronto A/B/C (selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`node build-unico.js confronto.html /percorso/confronto.html`; non ripubblicato in questa sessione: le direzioni B
  e C non usano gli orbi).
- Artefatto dello specimen del sistema: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b.
  **Scoperto in questa sessione**: la copia live conteneva una sezione «moto» (token `--dgt-t-*`, classi `t-*`, script di
  interazione, card che si allargano, marcatore che avanza) e la fiamma come icona, mai committate nel repository;
  `design-system/specimen.html` è stato allineato alla copia live (con l'icona rinominata `i-fire`). `DESIGN.md` non
  descrive ancora la sezione «moto»: da fare.
- Documento unico: `SYSTEM-DESIGN.md` (sezione 10, regole 1–18; sezione 6 con le righe «Avatar del dipendente AI»
  riscritta senza disco e «Pagina Esecuzione»). Studio e versioni della direzione A: `schermate/direzioni/DIREZIONI.md`
  (sezione 4: regole 13 e 14, «Versione 7» per le pelli, «Versione 7b» per perla, tondi e moti fluidi, «Versione 7c» per gli occhi del kit, «Versione 8»
  per la pagina dell'Esecuzione, «Versione 9» per la cornice, le card e le emoji).

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

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 10) e `schermate/direzioni/DIREZIONI.md` (sezioni 1 e 4, in
   particolare «Versione 7c», «Versione 8» e «Versione 9»). Controllare se questo branch è stato unito (vedi «Stato»).
2. Aprire `schermate/direzioni/direzione-a.html`: la home con gli orbi perla tondi in moto; `?pelle=grigio|chiaro|alone|disco`
   per le altre pelli; `?pagina=esecuzione&id=4` (Nora al lavoro, passo 2 di 4), `&id=3` (Kim in errore: «Riprova il
   passo 3»), `&id=5` (Social media manager: consegnato, «Apri la richiesta»), `&id=2` (Tester QA pianificata: «Avvia
   ora»), `?n=40&pagina=esecuzione&id=1` (esecuzione generata, al lavoro); `avatar-pelli.html` per il confronto delle pelli.
   Modello dati in `dati.js` (`ESEC11`, `esecuzioneGenerata`, `esecuzioneDi`), pagina in `direzione-a.js`
   (`esecuzione`, `testataEsecuzione`, `barraPassi`, `rigaPasso`, `rigaLog`, `cardOutput`, `riepilogoEsecuzione`;
   azioni in `monta`: `esecAzione`, `inviaNota`, filtro `filtro-log`), pelli in `avatar/avatar-orbe.js` (`PELLI`,
   `pelle`, il CSS `[data-pelle=…]`, il motore: `registra`, `posa`, `palpebra`, `ciclo`, `fermo`, `fotogramma`; gli
   occhi del kit: `posaOcchi`, `matrice`, `occhiConf`) e
   l'inversione di contesto in `direzione-a.js` (le regole `… .av svg.orbe`, che contano solo per la pelle «chiaro»).
3. Raccogliere il giudizio dell'utente su tre cose: l'**orbe perla tondo con gli occhi del kit** (versioni 7b e 7c), la
   **pagina dell'Esecuzione**, la **pagina del Dipendente** (versione 6, mai giudicata). Punti aperti che possono
   uscire:
   - i moti sono volutamente **quieti** (respiro ±1,6 %, sguardo, palpebre, un gesto ogni 6–10 s per stato): se
     l'utente li vuole più visibili si alzano le ampiezze in `posa()` (`amp`, `impulso`, i coefficienti di `gx/gy`),
     senza toccare la struttura;
   - a 26–28 px (coda, diario, storico) la perla si legge dagli occhi e dall'orlo di luce: è la più discreta delle
     pelli; se serve più stacco, alzare `--av-bagliore` o `--av-orlo-w` nella pelle «perla»;
   - i **filtri delle sezioni Passi, Output e Costo** (Fatti / Da fare / Con strumenti; Da approvare / In corso /
     Approvate; Per passo / Per strumento) sono inerti come nelle altre pagine; quelli del Log funzionano;
   - «Sposta» (esecuzione pianificata), «Ripeti» (conclusa) e le frecce nell'intaglio delle righe dei passi e degli
     strumenti sono inerti: non c'è una tendina del passo. Se serve, la tendina estesa può mostrare un passo (log
     filtrato, strumenti, output di quel passo);
   - «Rinnova la connessione» (Kim) porta alla pagina del Dipendente, dove c'è il pulsante «Rinnova» della connessione
     scaduta: non rinnova da sola;
   - le esecuzioni generate a 40 hanno passi e log generici (nomi dei passi per dipartimento); quelle concluse ieri
     senza costo nel modello prendono un costo dal seme;
   - un dipendente appena creato ha come «ultima consegna» il segnaposto «Nessuna esecuzione»: la sua pagina Esecuzione
     si apre (tre passi generici, 0 €) ma non ha senso; manca uno stato vuoto («Nessuna esecuzione ancora»).
4. Pagine fatte nella direzione A: home, Richieste, Dipartimento, tendina Dipendente, pagina Dipendente, pagina
   Esecuzione. Restano le **approvazioni da mobile** e i **costi** dell'azienda. Stessa cornice.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza
  del viewport: 1120 per far stare il dossier).
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js "../../schermate/direzioni/direzione-a.html?pagina=esecuzione&id=4&tendina=chiusa" /tmp/a.png`
  (esportare le tre variabili con `export` se si lanciano più catture nella stessa shell: senza, Node non trova
  `playwright-core`).
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py /tmp/fonts.css`).
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Pellicola degli avatar: una pagina di prova con sei copie di un orbe per stato, `DGT_AVATAR_ORBE.fermo(0)` e poi
  `fotogramma(svg, t)` con t = 0…5 s per colonna, uno screenshot solo (800×560 a 2×). Lo script è stato tenuto fuori
  dal repository: rifarlo in dieci righe se serve.
- Prova cliccata: uno script Playwright (`reducedMotion: 'no-preference'`) che apre la Console, clicca le azioni e
  verifica il DOM e gli errori di console; anche questo fuori dal repository, da rifare al bisogno (le verifiche fatte
  sono elencate in `DIREZIONI.md`, «Versione 7» e «Versione 8»).

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale.
- La Console gira da `file://` e come file unico: **niente moduli ESM**. Il kit avatar è impacchettato in uno script
  classico.
- Gli screenshot usano `reducedMotion: 'reduce'`, quindi gli avatar sono al fotogramma fisso; la prova cliccata
  (Playwright con `no-preference`) verifica che si muovano e che ogni azione della pagina funzioni.
- La famiglia «orbe» (dalla versione 7b) non ha più animazioni CSS: un solo `requestAnimationFrame` per pagina
  (`ciclo`) chiama `posa(v, t)` per ogni orbe visibile e scrive gli attributi `transform` di `.tutto`, `.corpo` e dei
  due `.occhio` (origine al centro del viewBox: scala e rotazione sono attorno al centro). Tutto è funzione continua
  del tempo (`rumore` a tre armoniche, `impulso` sin², `liscia` smoothstep); fase e periodi dal seme. Gli orbi si
  registrano da soli con un `MutationObserver` sul body (anche via `innerHTML`), si aggiornano solo nel viewport
  (`IntersectionObserver`), si fermano con la scheda nascosta; con `prefers-reduced-motion` non si registrano e restano
  nella posa di riposo del markup. `fermo(t)` / `riprendi()` / `fotogramma(svg, t)` servono agli screenshot.
- Gli **occhi sono quelli del kit** (7c): `posaOcchi(gaze, R, split)` è `eyePoses` di `gaze.js` (base tangente della
  sfera proiettata in ortografico), `matrice(e, w, h, tilt, k, R)` la stessa matrice che il kit dà alla pupilla
  (`[ax·w·R, ay·w·R·k, cx·h·R, cy·h·R·k, x, y]`, con k lo schiacciamento del battito); la pupilla è un path unitario
  (`M.UNIT_CIRCLE` / `M.UNIT_SQUARE`, anello = cerchio con solo il tratto), le X dell'errore due tacche unitarie.
  Lo sguardo si esprime in gradi (yaw, pitch, roll): per ampliarlo o attenuarlo si toccano i coefficienti in `posa()`.
- **Le pelli dell'orbe sono solo variabili CSS** (`--av-corpo`, `--av-orlo`, `--av-orlo-w`, `--av-luce`,
  `--av-occhi-neutri`, `--av-bordo`, `--av-zeta`, `--av-alone`, `--av-fondo`, `--av-taglio`, `--av-scala`,
  `--av-anello-pelle`) dichiarate su `[data-pelle="…"]` ed ereditate: vale l'antenato più vicino, così una cella o una
  card può avere una pelle diversa dalla pagina. L'SVG legge `--av-c-*` prima di `--av-*`: le regole di contesto in
  `direzione-a.js` (`.ncard.lime .av svg.orbe` ecc.) impostano `--av-c-*` a `var(--av-inv-*)`, che solo la pelle
  «chiaro» definisce (per le altre pelli il valore è non valido e cade sul fallback). Le regole vanno messe
  **sull'SVG**, non sul contenitore: una `var()` dichiarata sul contenitore non vede le variabili dell'SVG.
- `.av:has(>svg.orbe)` distingue gli orbi dal kit, che tiene il disco; il kit non ha pelli.
- Il CSS di `.av` vive dentro `.dirA .a-app`: fuori dalla cornice della Console il disco (o la sua assenza) va
  ridichiarato, come in `avatar-pelli.html` e `confronto-avatar.html`.
- `DGT_UI.prefissa(css, '.dirA')` prefissa ogni selettore; nelle griglie con testo `nowrap` servono `minmax(0,1fr)` e
  `min-width:0`.
- Gli **intagli** (`.nt`) prendono il colore di `--behind`: sulle card chiare messe sul nero (documento del prompt,
  card del modello assegnato) i pulsanti dentro l'intaglio restano bianchi su nero, non neri.
- Le **tendine coprono la destra della pagina** (330 px aperte, 840 estese): nelle pagine del Dipendente e
  dell'Esecuzione i numeri e le azioni stanno a sinistra apposta.
- La **barra dei passi** riusa `.a-sched` con `position:static` dentro `.etesta`: gli eventi (`.ev`) sono i passi,
  `.live` è il passo in corso, `.ev.plan` quelli da fare, `.ev.err` l'errore, `.fine` la pillola con la stima; la
  timeline scorre in orizzontale se i passi non stanno.
- L'**esecuzione** è un oggetto in cache per dipendente (`esecuzioni[id]`): la pagina, le card della home e del
  dipartimento e la card «Oggi» del Dipendente leggono lo stesso oggetto; le azioni (`esecAzione`) cambiano i passi e
  `e.stato`/`e.att`, poi `m.ricalcola()` rifà i conteggi.
- Le **differenze** fra due versioni sono un LCS per paragrafo e poi per parola dentro i paragrafi appaiati.
- La Console si scala con `zoom` (`scala()` in `direzione-a.html`): sopra i 1440 si ingrandisce, sotto si riduce; le
  tendine e le pillole `position: fixed` restano al bordo dello schermo (con `transform` scorrerebbero con la pagina);
  i `100vh` si dividono per `--z`, perché sotto `zoom` i `vh` non si riducono da soli (Chromium 141).
- Gli artefatti si ripubblicano allo stesso URL; se lo strumento rifiuta perché «esiste una versione più recente»,
  rifare `read` sull'URL (e leggere per intero la copia salvata se lo chiede) e poi pubblicare di nuovo, mai forzare.

## Cosa manca e prossimo passo (da decidere con l'utente all'avvio)

Pagine fatte nella direzione A: home, Richieste, Dipartimento, tendina Dipendente, pagina Dipendente, pagina
Esecuzione. Candidati per la prossima sessione, in ordine di priorità proposto a fine sessione (l'utente sceglie):

1. **Giro di correzioni su Esecuzione e Dipendente** (mai giudicate): mezza sessione, correzioni probabili e poco
   costose adesso; poi si chiude il primo blocco di pagine. Da qui possono uscire la tendina del passo e lo stato
   vuoto del dipendente appena creato (vedi «Come riprendere», punto 3).
2. **Le approvazioni da mobile**: la promessa del prodotto (il titolare approva dal telefono), nella cornice mobile
   delle tre schermate dello specimen (barra di stato, navigazione a pillola in basso, agenda). È la pagina più
   grande fra quelle rimaste: struttura da proporre in poche righe prima di costruire.
3. **La pagina dei costi dell'azienda**: per dipartimento, dipendente, cliente, modello, strumento; riusa la card
   costo dell'esecuzione e le righe della spesa del mese. Più piccola della 2.
4. **Manutenzione**: descrivere la sezione «moto» dello specimen in `DESIGN.md`; estrarre i componenti di
   `direzione-a.js` in `schermate/componenti.js` (utile prima di aggiungere il mobile, che riusa card e pillole).

Raccomandazione: 1 e poi 2 nella stessa sessione se il giro di correzioni è breve; altrimenti 1 e 4, e il mobile
nella successiva con una sessione intera.

## Possibili prossimi passi (non decisi dall'utente)

- Tendina del passo (dall'intaglio delle righe dei passi): log filtrato, strumenti, output di quel passo.
- Editor del soul prompt (dalla matita sul documento): nuova versione, nota, colloquio prima della produzione.
- Versione mobile della vista principale (approvazioni) partendo dalle tre schermate mobile dello specimen.
- Pagina dei costi dell'azienda (per dipartimento, dipendente, cliente, modello, strumento).
- Stati vuoti, caricamento ed errori nel linguaggio della Console.
- Eliminazione di un dipendente (la pausa c'è; l'eliminazione no, non richiesta).
- Estrarre i componenti di `direzione-a.js` in un file condiviso `schermate/componenti.js`.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Lavoriamo nella direzione A · Console (schermate/direzioni/direzione-a.js,
dati.js, comune.js, avatar/): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji.
Controlla lo stato della PR #6. Apri la pagina dell'Esecuzione (direzione-a.html?pagina=esecuzione&id=4) e la pagina
del Dipendente (?pagina=dipendente&id=4): ecco le mie correzioni: […]. Poi il prossimo passo scelto è [le approvazioni
da mobile / la pagina dei costi / la manutenzione]: proponimi la struttura in poche righe, poi procedi con screenshot,
artefatto, documenti, commit e push.
```
