# Prossima sessione — passaggio di consegne

Stato al 2026-09-06, fine della sessione sulle **approvazioni da mobile, seconda metà** (versione 12 della direzione A · Console:
la schermata «Riepilogo di oggi», lo stato vuoto a coda finita, la revisione di performance sul telefono con le due versioni a
confronto e le quattro decisioni, le revisioni nella coda del telefono, la prova a quaranta). Tutto è committato e pushato sul
branch indicato sotto. **Prossimo passo**: il giudizio dell'utente sulle tre schermate (nessuna è ancora stata giudicata), poi
la pagina dei costi o la manutenzione (vedi «Cosa manca»).

## Stato

- Branch: `claude/mobile-approvals-v11-mgqf5d` (da `main`, che contiene le PR #1, #3, #4, #5, #6, #7 e #8; la #8 era già unita
  all'inizio di questa sessione). **Nessuna PR è stata aperta** per questo branch (non era chiesto): all'avvio della prossima
  sessione controllare su GitHub se l'utente l'ha aperta e unita; se è unita ripartire da `main` con un branch nuovo, altrimenti
  continuare su questo branch.
- Artefatto del **mobile** (`mobile.html`: i tre telefoni affiancati, «Da approvare», «Richiesta», «Riepilogo di oggi»,
  cliccabili; ripubblicato allo stesso indirizzo con l'etichetta «Versione 12: seconda metà»):
  https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9. Si rigenera con
  `node schermate/direzioni/build-unico.js mobile.html /percorso/nova-studio-mobile.html`.
- Artefatto della **Console** (direzione A cliccabile): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
  (non ripubblicato: la Console non cambia aspetto; `direzione-a.js` esporta in più `differenze`, `dati.js` ha
  `azienda.scadenzaMese`). Si rigenera con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/console.html`.
- Artefatti precedenti, non toccati: identità degli orbi https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6
  (`avatar-identita.html`), pelli dell'orbe https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
  (`avatar-pelli.html`), le due famiglie kit/orbe https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
  (`confronto-avatar.html`), confronto A/B/C https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`confronto.html`), specimen https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b (`DESIGN.md` non descrive
  ancora la sezione «moto» dello specimen: da fare).
- Documento unico: `SYSTEM-DESIGN.md` (sezione 6, riga «Mobile» con le due metà; sezione 10, regola 20 aggiornata; sezione 11
  con l'artefatto del mobile). Studio e versioni della direzione A: `schermate/direzioni/DIREZIONI.md` (sezione 4: «Versione 12»
  con quanto costruito e le scelte da confermare; sezione 5, tabella dei file).
- Screenshot in `schermate/direzioni/screenshot/`: `mobile.png` (la pagina con i tre telefoni) e le cornici `mobile-1-da-approvare`,
  `mobile-1-coda`, `mobile-1-vuoto`, `mobile-1-vuoto-fondo`, `mobile-2-richiesta`, `mobile-2-richiesta-post`, `mobile-2-rifiuto`,
  `mobile-2-revisione`, `mobile-2-revisione-differenze`, `mobile-2-revisione-perche`, `mobile-2-revisione-modello`,
  `mobile-3-riepilogo`, `mobile-3-riepilogo-fondo`, `mobile-40-coda`, `mobile-40-riepilogo` (`.png`).
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
21. **2026-09-05**: costruita la **prima metà del mobile** (schermate 1 e 2 per post, documento, lista e proposta, rifiuto con
    motivo, `m.decidi` nel modello). Scelte fatte in costruzione, da confermare: il rifiuto chiede sempre il motivo (anche dalla
    card della prima schermata); approvare è al volo; due numeri invece di tre sulla prima schermata («spesi oggi» va nel
    Riepilogo); i telefoni affiancati condividono modello e richiesta corrente.
22. **Prima correzione dell'utente sul mobile** («l'icona delle approvazioni ha lo stesso colore di alcune card e quando scorri
    non si distingue; invece di cambiare colore al pulsante, sfondo sfocato e leggermente oscurato nella parte bassa dove c'è la
    navbar»): fatto, fascia `.m-navfondo` sotto la navigazione (blur 14, nero al 16 %, bordo alto sfumato). La regola che ne
    esce: un pulsante non cambia colore per distinguersi, è il fondo a farsi da parte.
23. **2026-09-06, questa sessione**: costruita la **seconda metà del mobile** come da struttura (Riepilogo di oggi, stato vuoto,
    revisione sul telefono, revisioni in coda, prova a quaranta). **L'utente non ha ancora visto né giudicato le tre schermate**:
    la sessione si è fermata, come chiesto, dopo averle mostrate. Scelte fatte in costruzione, da confermare (dettaglio in
    `DIREZIONI.md`, «Versione 12»): a coda finita la prima schermata prende il fondo del Riepilogo `#F4F4F4` (le card `#E4E4E4`
    sul chiaro `#E0E0E0` non si vedrebbero) e la card «Niente da approvare» è bianca con il cerchio nero della spunta; nel
    Riepilogo la data sta nella riga di navigazione come chip e sotto il titolo stanno i tre numeri della riga WORKSPACE (al
    lavoro, da approvare, spesi oggi); le miniature delle consegne sono le due consegne di oggi più recenti; il diario mostra le
    ultime cinque voci; nella revisione il titolo è corto («Soul prompt v7 → v8», «Da Standard a Esperto») e le evidenze stanno in
    colonna (pillola del numero sopra la frase); la spunta della card di una revisione applica al volo, come nella Console; la
    prova è la pillola bianca sopra l'applica lime.

24. **Correzione dell'utente sulla versione 12** («ci sono componenti che si sovrappongono», cattura della campanella lime della
    navigazione con sopra l'ora e il badge della linea del tempo): fatto. L'ora e i badge della linea del tempo hanno
    `z-index: 1` (la linea grigia deve passarci dietro) e scavalcavano la barra in basso; ora il corpo che scorre è un piano a
    sé (`.m-scroll` con `position: relative` e `z-index: 0`) e la fascia sfocata, la navigazione, la dissolvenza e la barra
    delle azioni hanno z-index 2 e 3. Regola: la barra in basso sta sempre sopra il contenuto, che le passa sotto sfocato.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto; il riferimento lilguy.net è stato studiato, non copiato); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezioni 6 e 10, regole 19 e 20) e `schermate/direzioni/DIREZIONI.md` («Versione 11»
   e «Versione 12»). Controllare il branch e la PR (vedi «Stato»). Aprire `schermate/direzioni/mobile.html` (i tre telefoni;
   `?richiesta=2` per la revisione del soul prompt, `?richiesta=3` per quella del modello; `?n=40` per la prova a quaranta) e
   `direzione-a.html` per la Console.
2. **Raccogliere il giudizio dell'utente** sulle tre schermate (screenshot in `schermate/direzioni/screenshot/mobile-*.png`,
   artefatto in «Stato») e correggere prima di andare avanti. Le scelte da confermare sono nella decisione 23.
3. Poi una delle cose in «Cosa manca», nell'ordine che l'utente sceglie.

Punti aperti ereditati (non chiesti dall'utente, da non toccare senza richiesta): i filtri inerti delle sezioni Passi, Output e
Costo dell'Esecuzione; «Sposta», «Ripeti» e le frecce dei passi senza tendina del passo; lo stato vuoto del dipendente appena
creato («Nessuna esecuzione»); la pagina del Dipendente (versione 6) e quella dell'Esecuzione (versione 8) mai giudicate; sul
telefono i cerchi «commenta», «filtri» e «ordina», le tab organizzazione / chat / agenda, il download e la matita delle card del
Riepilogo sono inerti; il badge rosa «campanella 2» accanto al numero «da approvare» copia quello della riga WORKSPACE della
Console (`min(2, n)`) e non ha ancora un significato nel modello.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza del
  viewport: 1120 per far stare il dossier, 1100 per la pagina del mobile).
  `export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css` e poi
  `node design-system/tools/screenshot-page.js schermate/direzioni/mobile.html /percorso/mobile.png 1440 1100` (dalla radice).
- `screenshot-elementi.js` — cattura elementi per selettore (`node screenshot-elementi.js pagina.html prefisso '#sel1' '.sel2'`);
  `MOTION=no-preference` per gli avatar in moto, `SCALE=2`, `W=1440`, `H=1100` (l'altezza del viewport: va alzata finché la
  pagina non scorre, altrimenti le catture dopo un clic si spostano), `CLICK="sel|sel"`, `EVAL="codice"` (JavaScript eseguito
  prima della cattura). Le cornici del telefono: `'.m-tel[data-n="1"]'`, `'.m-tel[data-n="2"]'`, `'.m-tel[data-n="3"]'`. Esempi
  usati in questa sessione: lo scorrimento `EVAL='document.querySelector(".m-tel[data-n=\"1\"] .m-scroll").scrollTop = 9999'`; lo
  stato vuoto `EVAL='for (let i = 0; i < 4; i++) document.querySelector(".m-tel[data-n=\"1\"] [data-az=\"approva\"]").click()'`
  (ogni clic ridisegna, il selettore resta valido); il rifiuto `CLICK='.m-tel[data-n="2"] .m-bar [data-az="rifiuta"]'`.
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py
  /percorso/fonts.css`): va rifatto a ogni sessione, il file non è nel repository.
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Prove cliccate, fuori dal repository (trenta righe da rifare al bisogno, Playwright con `reducedMotion: 'reduce'`, font locali
  via `page.route` su Google Fonts): **mobile** — apre `mobile.html`, controlla a ogni passo che nessun `.m-scr` abbia
  `scrollWidth > clientWidth` e che la console sia pulita; tocca la riga della revisione, le frecce, rifiuta la revisione del
  modello con motivo (conferma vuota = bordo rosso, poi motivo + Invio), prova la revisione del prompt, approva le altre due dalla
  card fino allo stato vuoto, cattura le cornici. **Quaranta** — `?n=40`, conta la coda, scrive «12» nel badge della campanella,
  apre la richiesta con il titolo più lungo. **Console** — approva dalla tendina, apre la revisione ed estende, rifiuta con motivo
  (la tendina resta estesa sulla revisione successiva: comportamento della Console), riduce, apre il riepilogo, «Approva tutte»
  dalla pagina Richieste.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale. Gli script vanno
  lanciati dalla radice del repository (i percorsi sono relativi); nel Bash della sessione la cartella di lavoro può cambiare fra
  un comando e l'altro: usare percorsi assoluti.
- La Console e il mobile girano da `file://` e come file unico: **niente moduli ESM**.
- **Il mobile riusa la Console**: `mobile.html` carica `direzione-a.js` e mette in pagina `DIREZIONE_A.css` (classi `.dirA`) e
  poi `DGT_MOBILE.css` (prefissato anch'esso con `.dirA`, così `.dirA .m-scr .task` vince su `.dirA .task`). Le variabili della
  Console vivono su `.a-app`: il mobile le ridichiara su `.m-page` (più `--light`). `--behind` (l'intaglio `.nt`) è `--light`
  sullo schermo chiaro, `--summary` sul Riepilogo e sullo stato vuoto (`.m-scr.rie`), `--black` sul nero.
- **Lo z-index dentro lo schermo del telefono**: tutto quello che sta in basso fisso (fascia sfocata, navigazione, dissolvenza,
  barra delle azioni) ha uno z-index esplicito (2 e 3) e il corpo che scorre è un piano a sé (`.m-scroll` con
  `position: relative` e `z-index: 0`). Senza il piano, un qualsiasi `z-index` dentro il contenuto (i badge della linea del
  tempo) scavalca la barra, che è solo `position: absolute` senza z-index.
- Le classi del mobile possono **incrociare per caso quelle della Console**: `.m-scr.rev` (la schermata della revisione) faceva
  scattare `.dirA .rev li b` (la pillola del numero nella card revisione della Console). Ora la pillola è dichiarata in
  `.m-det li b`; quando si aggiunge una classe corta al telefono, cercarla prima in `direzione-a.js`.
- **Lo schermo del telefono non deve poter scorrere di lato**: `.m-scr` ha `overflow:hidden`, ma un contenuto più largo lo rende
  comunque scorrevole e il fuoco su un input lo scorre. Griglie con `minmax(0,1fr)`, `min-width:0` sui figli,
  `focus({ preventScroll: true })`, e il controllo nella prova cliccata (nessuno sforo in questa sessione).
- Titoli a 24 px con `-webkit-line-clamp: 2` su 256 px: una freccia «→» fra due parole spezza la riga e l'ellissi mangia la
  seconda; legare con `&nbsp;` («v7&nbsp;→&nbsp;v8») o riscrivere («Da Standard a Esperto»). Nel `.lb` delle versioni il chip
  lungo («v7 · in produzione») e il testo stanno su due righe con `flex-wrap`, non troncati.
- La linea del tempo del Riepilogo è **un segmento per marcatore** (`.m::after` da sotto il badge al bordo della riga più il
  gap; `.m.ult` senza segmento; `.m.linea` vuoto per continuare la linea accanto a un'intestazione): niente altezze a mano, la
  linea finisce da sola all'ultima voce. L'ora ha lo sfondo del pannello, così la linea le passa dietro.
- `m.decidi(id, stato, commento, esito)`: sul telefono la prova passa `esito = 'prova'` con il commento «Prova su N esecuzioni»
  (N da `rv.prova.esecuzioni`); l'applica è `approvata` senza esito (predefinito `applicata`); il rifiuto passa `'rifiutata'`.
- L'artefatto si ripubblica allo stesso indirizzo passando `url` allo strumento, dopo averlo letto con `action: read` (lo
  strumento salva il file e chiede di averlo visto; la versione in linea era il build della sessione precedente, verificato con
  `grep` sulle stringhe della versione). Il file unico del mobile pesa circa 420 KB. Mai forzare.
- L'orbe della versione 10, le tinte, gli intagli con `--behind`, le tendine, la Console che si scala con `zoom`, le differenze
  LCS (`differenze` ora esportata da `DIREZIONE_A`): come nelle note delle sessioni precedenti (storia di questo file in git,
  commit `044e363`, `f3a5d53`, `5d20ff9`).

## Cosa manca

1. **Il giudizio dell'utente** sulle tre schermate del mobile (versioni 11 e 12) e sulle scelte della decisione 23.
2. **La pagina dei costi dell'azienda**: per dipartimento, dipendente, cliente, modello, strumento; riusa la card costo
   dell'esecuzione e le righe della spesa del mese.
3. **Manutenzione**: descrivere la sezione «moto» dello specimen in `DESIGN.md`; estrarre i componenti di `direzione-a.js` in
   `schermate/componenti.js` (il mobile oggi importa tutta la Console per usarne il CSS e quattro funzioni: `av`, `iconaTipo`,
   `nomeTipo`, `differenze`); mettere nel repository le prove cliccate (oggi rifatte a ogni sessione).
4. Giudizio dell'utente sulle pagine dell'Esecuzione e del Dipendente; tendina del passo; stato vuoto del dipendente nuovo; sul
   telefono le tab e i cerchi inerti (vedi «Punti aperti ereditati»).

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Controlla il branch claude/mobile-approvals-v11-mgqf5d: se la sua PR è unita riparti
da main con un branch nuovo, altrimenti continua sullo stesso branch. Lavoriamo nella direzione A · Console
(schermate/direzioni/direzione-a.js, dati.js, comune.js, avatar/, mobile.js): non cambiare la cornice, i componenti o i colori
del sistema di design; niente emoji, solo le icone dello sprite; gli avatar sono quelli della versione 10 (tinta, occhi lilguy,
punto di stato, gesto nelle pile).

Le tre schermate del mobile sono in schermate/direzioni/screenshot/mobile-*.png e nell'artefatto: ecco le mie correzioni: […].
Applicale, poi [la pagina dei costi dell'azienda | la manutenzione], screenshot, artefatto, documenti, commit e push. Alla fine
mostrami le schermate e fermati.
```
