# Prossima sessione — passaggio di consegne

Stato al 2026-09-05, fine della sessione sulle **approvazioni da mobile, prima metà** (versione 11 della direzione A · Console:
le schermate «Da approvare» e «Richiesta» sul telefono, per post, documento, lista e proposta, con il rifiuto con motivo). Tutto
è committato e pushato sul branch indicato sotto. **Prossimo passo**: la seconda metà del mobile (Riepilogo di oggi, la revisione
sul telefono, lo stato vuoto, la prova a quaranta), dopo il giudizio dell'utente sulle due schermate costruite.

## Stato

- Branch: `claude/approvazioni-mobile-direzione-a-t5290b` (da `main`, che contiene le PR #1, #3, #4, #5, #6 e #7; la #7 è stata
  unita all'inizio di questa sessione). A fine sessione è aperta la **PR #8** verso `main`
  (https://github.com/av3rgfx/DGT-Design-2.0/pull/8): se all'avvio della prossima sessione risulta già unita, ripartire da `main`
  con un branch nuovo; se è ancora aperta, continuare sullo stesso branch e la PR si aggiorna da sola.
- Artefatto del **mobile** (`mobile.html`: i due telefoni affiancati, «Da approvare» e «Richiesta», cliccabili; ripubblicato
  allo stesso indirizzo dopo la correzione della navigazione):
  https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9. Si rigenera con
  `node schermate/direzioni/build-unico.js mobile.html /percorso/nova-studio-mobile.html`.
- Artefatto della **Console** (direzione A cliccabile: home, tendine, Richieste, Dipartimento, editor del dipendente, pagina
  del Dipendente, pagina dell'Esecuzione, avatar della versione 10): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
  (non ripubblicato in questa sessione: la Console non cambia aspetto; `decidi` è passata nel modello senza effetti visibili).
  Si rigenera con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatti precedenti, non toccati: identità degli orbi https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6
  (`avatar-identita.html`), pelli dell'orbe https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
  (`avatar-pelli.html`), le due famiglie kit/orbe https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
  (`confronto-avatar.html`), confronto A/B/C https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`confronto.html`), specimen https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (`DESIGN.md` non descrive
  ancora la sezione «moto» dello specimen: da fare).
- Documento unico: `SYSTEM-DESIGN.md` (sezione 6, riga «Mobile» con la parte DGT; sezione 10, regole 1–20; sezione 11 con
  l'artefatto del mobile). Studio e versioni della direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4: «Versione 11»
  con quanto costruito, le correzioni e quanto resta; sezione 5, tabella dei file con `mobile.js` / `.html`).
- Screenshot nuovi in `schermate/direzioni/screenshot/`: `mobile.png` (la pagina), `mobile-1-da-approvare.png`,
  `mobile-1-coda.png`, `mobile-2-richiesta.png`, `mobile-2-richiesta-post.png`, `mobile-2-rifiuto.png`.
- Regole in `CLAUDE.md`: invariate (direzione A, avatar della versione 10, niente emoji).

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
21. **2026-09-05, questa sessione**: costruita la **prima metà del mobile** come da struttura (schermate 1 e 2 per post,
    documento, lista e proposta, rifiuto con motivo, `m.decidi` nel modello). **L'utente non ha ancora visto né giudicato le
    due schermate**: la sessione si è fermata, come chiesto, dopo averle mostrate. Scelte fatte in costruzione, da confermare:
    il rifiuto chiede sempre il motivo (anche dalla card della prima schermata); approvare è al volo; due numeri invece di tre
    sulla prima schermata («spesi oggi» va nel Riepilogo); le revisioni di performance restano fuori dalla coda del telefono
    finché il confronto non è disegnato (la Console dice 4 da approvare, il telefono 2); i due telefoni affiancati condividono
    modello e richiesta corrente.
22. **Prima correzione dell'utente sul mobile** («l'icona delle approvazioni ha lo stesso colore di alcune card e quando scorri
    non si distingue; invece di cambiare colore al pulsante, sfondo sfocato e leggermente oscurato nella parte bassa dove c'è la
    navbar»): fatto, fascia `.m-navfondo` sotto la navigazione (blur 14, nero al 16 %, bordo alto sfumato). Le due schermate
    per il resto non sono ancora state giudicate («bene» sul primo sguardo).

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere: la seconda metà del mobile

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 6 e 10, regole 19 e 20) e `schermate/direzioni/DIREZIONI.md` («Versione 11»).
   Controllare il branch (vedi «Stato»). Aprire `schermate/direzioni/mobile.html` (i due telefoni; `?schermata=2&richiesta=1`
   per il post) e `direzione-a.html` per la Console.
2. **Raccogliere il giudizio dell'utente** sulle due schermate (screenshot in `schermate/direzioni/screenshot/mobile-*.png`,
   artefatto in «Stato») e correggere prima di andare avanti. Una correzione è già arrivata e fatta (decisione 22: la fascia
   sfocata sotto la navigazione); la regola che ne esce: un pulsante non cambia colore per distinguersi, è il fondo a farsi da
   parte.
3. **Riepilogo di oggi** (schermata 3, `#F4F4F4`): il pannello Riepilogo dello specimen sul telefono (`.summary`, `.tline` con i
   badge rotondi, `.dcard`), con consegne (miniature), approvate oggi, spesa di oggi, obiettivo del mese nella card lime con la
   matita, le voci del diario sulla linea del tempo, e la riga lime che riporta alle richieste. In `direzione-a.js` c'è già
   `riepilogo(m)` (tendina della Console) da tradurre in colonna. La riga «Riepilogo di oggi» della prima schermata e la
   campanella/tab già portano `data-az="schermata" data-s="3"`: basta aggiungere il ramo in `monta` e il terzo telefono
   (`schermate: [1, 2, 3]`, `NOMI[3]`). È anche lo **stato vuoto**: a coda finita la prima schermata mostra «Niente da
   approvare» (oggi un riquadro tratteggiato, `.m-vuoto`) e sotto il riepilogo.
4. **La revisione sul telefono**: le richieste di tipo `revisione` entrano nella coda (`DGT_MOBILE.coda` toglie il filtro);
   nella schermata Richiesta le due versioni una sotto l'altra con le differenze (`lcs`, `parole`, `differenze` sono dentro
   `direzione-a.js`: esportarle o spostarle in `comune.js`), i tre blocchi Perché / Cosa ci aspettiamo / Rischi (`rv.perche`,
   `rv.attese`, `rv.rischi`, `rv.prova`) e le quattro decisioni (prova, applica, modifiche, rifiuta con motivo) via
   `m.decidi(id, stato, motivo, esito)`. Le due revisioni del modello: `rv1` (prompt v7 → v8 di Nora) e `rv2` (modello
   Standard → Esperto del Social media manager).
5. **Prova a quaranta**: `mobile.html?n=40` (7 in coda, i tipi ruotano; l'allegato segue il tipo). Controllare le righe della
   coda, i titoli lunghi, i numeri a due cifre nel badge della campanella.
6. Poi: screenshot delle cornici (`screenshot-elementi.js`, `SCALE=2 H=1100`, `CLICK`/`EVAL`), artefatto (`build-unico.js
   mobile.html`; pubblicare a un indirizzo nuovo se l'aggiornamento in loco viene rifiutato), `DIREZIONI.md` (Versione 11 o 12),
   `SYSTEM-DESIGN.md` (riga Mobile, regola 20), README, questo file, commit e push.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): i filtri inerti delle sezioni Passi, Output e
Costo dell'Esecuzione; «Sposta», «Ripeti» e le frecce dei passi senza tendina del passo; lo stato vuoto del dipendente appena
creato («Nessuna esecuzione»); la pagina del Dipendente (versione 6) e quella dell'Esecuzione (versione 8) mai giudicate; sul
telefono i cerchi «commenta», «filtri» e «ordina» e le tab organizzazione / chat / agenda sono inerti.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node screenshot-page.js "../../schermate/direzioni/mobile.html" /percorso/mobile.png 1440 1100`.
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, **`H=1100`** (nuovo: l'altezza del viewport; va alzata
  finché la pagina non scorre, altrimenti le catture dopo un clic si spostano), `CLICK="sel|sel"`, **`EVAL="codice"`** (nuovo:
  JavaScript eseguito prima della cattura, per esempio `document.querySelector('.m-tel[data-n="1"] .m-scroll').scrollTop = 9999`
  per la coda). Le cornici del telefono: `'.m-tel[data-n="1"]'`, `'.m-tel[data-n="2"]'`.
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Prova cliccata del mobile: uno script Playwright (`reducedMotion: 'no-preference'`) che apre `mobile.html`, tocca la riga della
  coda, indietro, le frecce, rifiuta dalla card (campo del motivo a fuoco), conferma vuota (bordo rosso), motivo + Invio,
  approva dall'altro telefono (coda vuota), e a ogni passo controlla che nessun `.m-scr` abbia `scrollWidth > clientWidth`
  (sforo orizzontale) e che la console sia pulita. Prova di regressione della Console: approva dalla tendina, rifiuta una
  revisione con motivo, «approva tutte». Entrambi fuori dal repository: venti righe da rifare al bisogno.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script di
  prova vanno lanciati dalla radice del repository (i percorsi sono relativi).
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**.
- **Il mobile riusa la Console**: `mobile.html` carica `direzione-a.js` e mette in pagina `DIREZIONE_A.css` (classi `.dirA`) e
  poi `DGT_MOBILE.css` (prefissato anch'esso con `.dirA`, così `.dirA .m-scr .task` vince su `.dirA .task`). Le variabili della
  Console (`--lime`, `--ink`, `--docs`…) vivono su `.a-app`: il mobile le ridichiara su `.m-page` (più `--light`), e ridichiara
  `box-sizing`, `svg{display:block}` e il cursore su `[data-az]`. `--behind` è `--light` sullo schermo chiaro e `--black` sul nero
  (serve all'intaglio `.nt`).
- **Lo schermo del telefono non deve poter scorrere di lato**: `.m-scr` ha `overflow:hidden`, ma un contenuto più largo lo rende
  comunque scorrevole e il fuoco su un input lo scorre (è successo con la barra del motivo: pillole troppo larghe). Griglie con
  `minmax(0,1fr)`, `min-width:0` sui figli, `focus({ preventScroll: true })`, e il controllo nella prova cliccata.
- Le catture per elemento con `zoom` sulla pagina funzionano (Playwright legge il riquadro già scalato); il problema visto nelle
  prime catture del rifiuto era lo scorrimento laterale dello schermo, non la cattura.
- `m.decidi` mette `r.giorno = 0` e `r.min` dall'ora dell'azienda (prima era `10 * 60 + 42` scritto a mano in `direzione-a.js`).
- L'orbe della versione 10 (`avatar/avatar-orbe.js`), le tinte (`m.tintaDi`, `TINTE_ID`), il CSS di `.av` sotto `.dirA`, gli
  intagli con `--behind`, le tendine, la Console che si scala con `zoom`, le differenze LCS: come nelle note delle sessioni
  precedenti (vedi la storia di questo file in git, commit `044e363` e `f3a5d53`).
- Gli artefatti si ripubblicano allo stesso URL solo se lo strumento accetta; per un artefatto nuovo serve un percorso di file
  nuovo e un `favicon`. Il file unico del mobile pesa circa 400 KB. Mai forzare.

## Cosa manca

1. **La seconda metà del mobile**: vedi «Come riprendere».
2. **La pagina dei costi dell'azienda**: per dipartimento, dipendente, cliente, modello, strumento; riusa la card costo
   dell'esecuzione e le righe della spesa del mese.
3. **Manutenzione**: descrivere la sezione «moto» dello specimen in `DESIGN.md`; estrarre i componenti di `direzione-a.js` in
   `schermate/componenti.js` (il mobile oggi importa tutta la Console per usarne il CSS e tre funzioni: è il momento buono).
4. Giudizio dell'utente sulle pagine dell'Esecuzione e del Dipendente e sulle due schermate del mobile; tendina del passo;
   stato vuoto del dipendente nuovo.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla la PR #8: se è unita riparti da main con un branch nuovo, altrimenti
continua sullo stesso branch. Lavoriamo nella direzione A · Console (schermate/direzioni/direzione-a.js, dati.js, comune.js,
avatar/, mobile.js): non cambiare la cornice, i componenti o i colori del sistema di design; niente emoji, solo le icone dello
sprite; gli avatar sono quelli della versione 10 (tinta, occhi lilguy, punto di stato, gesto nelle pile).

Costruisci la seconda metà delle approvazioni da mobile (PROSSIMA-SESSIONE.md «Come riprendere», DIREZIONI.md «Versione 11»):
il Riepilogo di oggi come terza schermata, che è anche lo stato vuoto a coda finita; la revisione di performance sul telefono
con le due versioni a confronto e le quattro decisioni, e le revisioni che entrano nella coda del telefono; la prova a quaranta.
Poi screenshot delle cornici con design-system/tools/screenshot-elementi.js, artefatto con build-unico.js, aggiornamento di
DIREZIONI.md, SYSTEM-DESIGN.md, README e PROSSIMA-SESSIONE.md, commit e push. Alla fine mostrami le schermate e fermati.
```
