# Prossima sessione — passaggio di consegne

Stato al 2026-09-04, fine della sessione sui **dipendenti AI** nella direzione A · Console (versione 5 e 5b): niente
nomi di base, editor del dipendente, avatar «orbe» generati e animati. Tutto è committato e pushato sul branch
indicato sotto; la PR verso `main` è aperta. La sessione è stata chiusa dall'utente e i due lavori successivi sono
già decisi: vedi la sezione **«Prossima sessione: cosa fare»**.

## Stato

- Branch: `claude/console-ai-employees-feebdx` (da `main`, che contiene le PR #1 e #3). PR aperta verso `main` a fine
  sessione: **#4**, https://github.com/av3rgfx/DGT-Design-2.0/pull/4 («Direzione A · Console: i dipendenti AI»).
- Artefatto della direzione A cliccabile (home, tendine, Richieste, Dipartimento, editor del dipendente, avatar):
  https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
  (si aggiorna con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/a.html` e ripubblicando allo
  stesso URL).
- Artefatto del confronto A/B/C (selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`node build-unico.js confronto.html /percorso/confronto.html`).
- Artefatto delle due famiglie di avatar a confronto (kit e orbe): https://claude.ai/code/artifact/4bc0c3ee-d1a0-41dc-a6d9-ef4f2b8360bd
  (`node build-unico.js confronto-avatar.html /percorso/avatar.html`).
- Artefatto dello specimen del sistema: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Documento unico: `SYSTEM-DESIGN.md` (sezione 10, regole 1–12). Studio e versioni della direzione A:
  `schermate/direzioni/DIREZIONI.md` (sezione 4, «Versione 5» per i dipendenti, «Versione 5b» per gli avatar orbe).

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
10. **2026-09-04, i dipendenti** (questa sessione): (1) di base un dipendente **non ha un nome**, l'etichetta è il
    ruolo e sotto il dipartimento; il nome è facoltativo e si dà alla creazione o dopo; (2) **modifica del
    dipendente** (nome, ruolo, dipartimento, avatar) nel linguaggio della Console; (3) **avatar generati dal kit**
    allegato dall'utente, rivisitati sul sistema di design, deterministici, interattivi solo dove ha senso. La proposta
    fatta prima di costruire (card a due forme con altezza unica 240 px, tendina «Dipendente», disco chiaro + corpo
    nero + lime solo per il titolare) è quella realizzata.
11. **2026-09-04, subito dopo**: «avatar più clean (forme più simili) e più dinamici, stile Grok AI: fammi una
    variante». Fatta la famiglia **«orbe»** (sfere morbide, animazioni CSS, sguardo che segue il puntatore), messa
    come predefinita accanto a quella del kit (`?avatar=kit`), con la pagina di confronto.
12. **«Teniamo l'orbe, ma occhi un po' più grandi»** e animazioni di stato più visibili, «magari animando anche
    l'avatar stesso»: fatto. Occhi più grandi e un moto del corpo per ogni stato (squash al lavoro, saltello da
    approvare, tremito in errore, scorrimento da pianificato, respiro profondo con «z» da libero); pellicola in
    `screenshot/avatar-orbe-pellicola.png`. L'orbe è la famiglia scelta; il kit resta nel codice dietro `?avatar=kit`.
13. **«Animazioni meno frequenti, occhi dello stato attesa gialli»**: fatto. Cicli allungati con pause (saltello ogni
    5,5 s, tremito ogni 6 s, «z» ogni 3,5 s, battito ogni 6–10 s, moti continui a periodo doppio) e occhi gialli
    `#FCDC64` da approvare (il lime resta al lavoro).
14. **Chiusura della sessione** (2026-09-04): nella prossima (a) **togliere le animazioni dietro gli avatar**, senza
    toccare le animazioni dell'avatar stesso; (b) fare la **pagina del dipendente** partendo dal brief dell'utente
    riportato sotto, con la struttura proposta in risposta (da confermare all'avvio). PR aperta.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.

## Prossima sessione: cosa fare

### 1. Togliere le animazioni dietro gli avatar

Richiesta dell'utente: «togliere le animazioni dietro gli avatar (le animazioni degli avatar non le devi toccare)».
Nell'orbe (`schermate/direzioni/avatar/avatar-orbe.js`) i segni animati **dietro il corpo** sono due:

- al lavoro, l'**arco che orbita** (`<circle class="giro">`, keyframe `av-giro`);
- da approvare, le **due onde** che si allargano fino al bordo del disco (`<circle class="onda">` e `.onda.due`,
  keyframe `av-onda`).

Vanno tolti (markup, regole CSS e keyframe, la riga di `transform-box` che li cita). Restano intatte le animazioni
dell'avatar: respiro, dondolio, deriva dello sguardo, battito, e i moti di stato del corpo e degli occhi (squash,
saltello, scrollata, tremito, afflosciamento, lampeggio delle X, scorrimento, orologio, sonno, respirone). Le **«z»**
del sonno stanno **sopra** il corpo (partono dal volto), quindi non sono «dietro»: restano, salvo indicazione contraria
dell'utente. Il kit (`avatar-dgt.js`, `?avatar=kit`) non è toccato. Dopo: rigenerare la pellicola
(`screenshot/avatar-orbe-pellicola.png`, tecnica in «Note tecniche»), gli screenshot della Console e del confronto,
i tre file unici; aggiornare la tabella degli stati in `DIREZIONI.md` (Versione 5b), la riga «Avatar» in
`SYSTEM-DESIGN.md` (sezione 10) e questo file.

### 2. La pagina del dipendente

**Brief dell'utente** (testuale):

> **Obiettivo:** configurare un agente e capire se sta lavorando bene.
> **Pubblico:** operatore, con una vista sintetica leggibile anche dal titolare.
> **Contenuto:** identità e mansione; il *soul prompt* con cronologia delle versioni e confronto fra due versioni;
> modello assegnato e criterio di scelta automatica; strumenti e connessioni; budget e permessi; risultati degli
> eval, cioè il "colloquio" che ha superato per entrare in produzione; metriche di performance: task completati,
> costo per esito utile, quanto spesso un umano corregge il suo output, quante sue proposte vengono respinte.
>
> La parte difficile e più importante: la **revisione di performance**, dove il sistema propone di cambiare il prompt
> o il modello di questo dipendente. Deve sembrare una decisione gestionale seria, con evidenze a supporto, non una
> notifica da accettare distrattamente.

**Valutazione e proposta** (fatta a fine sessione, da confermare all'avvio della prossima). Il brief regge; le
aggiunte proposte sono quattro:

1. **Agganciarla a ciò che la Console ha già.** Le richieste del dipendente (`richieste` con `chi`) portano già
   approvata / modifiche / rifiutata e il commento del titolare: sono la fonte vera di «quanto spesso un umano lo
   corregge» e «quante proposte vengono respinte», non numeri a parte. Idem l'esecuzione di oggi (`att`), gli
   obiettivi a cui contribuisce (`obiettivi.chi`), il diario, e la tendina Dipendente per nome, ruolo, dipartimento e
   avatar (da riusare, non rifare).
2. **La revisione è una richiesta al titolare.** Il meccanismo centrale della Console è già la decisione del
   titolare su una proposta (approva / chiedi modifiche / rifiuta). Una revisione di performance è una richiesta di
   tipo «revisione»: l'operatore la prepara e la legge con le evidenze nella pagina del dipendente, il titolare la
   trova anche nella coda delle Richieste. Così non è una notifica: ha un dossier, un costo, una decisione firmata
   e una cronologia.
3. **Azioni sul dipendente** che il brief non nomina ma servono: mettere in pausa / riattivare, «ripeti il
   colloquio» (rilancia gli eval sulla versione corrente), e la modifica tramite la tendina esistente.
4. **Due pubblici, un ordine.** Il titolare legge testata e revisione; l'operatore scende nella configurazione.
   Niente pagine separate: la stessa cornice della Console, con le sezioni ordinate da chi legge prima.

**Struttura proposta (variante A, consigliata)**, stessa cornice (barra agenda, rail, numeri nella testata):

| # | Sezione | Contenuto |
|---|---|---|
| 0 | Testata | avatar grande (segue il puntatore), etichetta secondo la regola nome/ruolo, «ruolo · dipartimento», pillola di stato; pillole «Modifica» (tendina Dipendente) e «Metti in pausa»; quattro numeri a 30 giorni con confronto: task completati, costo per esito utile, corretto da un umano %, proposte respinte % |
| 1 | Revisione di performance | solo quando ce n'è una in sospeso, prima di tutto, card lime con intaglio: **Proposta** (prompt v7 → v8, o cambio di modello), **Perché** (3–4 evidenze: numeri prima/dopo, gli eval falliti, due output respinti con il commento del titolare), **Cosa ci aspettiamo** (stima da una prova su N esecuzioni), **Rischi**, **Decisione**: «Prova su 20 esecuzioni», «Applica», «Chiedi modifiche», «Rifiuta» con motivo obbligatorio. Il dettaglio con il confronto delle due versioni fianco a fianco sta nella tendina estesa (840 px). Sotto, la cronologia delle revisioni passate (chi ha deciso, quando, esito, effetto misurato) |
| 2 | Oggi | l'esecuzione in corso (stessa card della home, con l'occhio) e le richieste di oggi |
| 3 | Rendimento | i numeri a 30 giorni per esito (consegne approvate, con modifiche, rifiutate; costo; tempo medio) con badge su/giù rispetto ai 30 precedenti; le ultime richieste con la decisione del titolare (righe come in Richieste) |
| 4 | Mansione e soul prompt | il prompt corrente in una card chiara (documento), le versioni come righe (v1…v8: data, chi, nota, numeri di quella versione), «Confronta» → tendina estesa a due colonne con le differenze evidenziate |
| 5 | Modello | modello assegnato (selettore a pillola), criterio di scelta automatica scritto come regola («economico di base; potente sopra N passi o quando la consegna va al cliente»), ripartizione delle esecuzioni per modello a 30 giorni e costo |
| 6 | Strumenti e connessioni | card come quelle delle regole di approvazione: nome, descrizione, selettore, chip attiva/spenta; connessioni con l'ultimo uso |
| 7 | Budget e permessi | budget mensile con barra a pillola e speso/rimanente; permessi = regole di approvazione del dipendente (le regole generali con le eccezioni sue) |
| 8 | Colloquio (eval) | i casi superati per entrare in produzione: righe con caso, atteso, esito, punteggio; punteggio complessivo; versione di prompt e modello su cui è stato fatto; «Ripeti il colloquio»; storico dei colloqui per versione |

Varianti, se la A non convince:

- **B · due tab a pillola** («Rendimento» per il titolare, «Configurazione» per l'operatore), come le tab a pillola
  del secondo riferimento. Meno scorrimento; ma la revisione ha bisogno di entrambe le metà.
- **C · la revisione come pagina propria** (come Richieste), raggiungibile dalla pagina del dipendente e dalla coda:
  tutto lo spazio per le evidenze e il confronto delle versioni. Da fare se il dossier cresce oltre la tendina estesa.

Consiglio: **A**, con il dettaglio della revisione nella tendina estesa; se cresce, promuoverla a **C**. Modello dati
da aggiungere in `dati.js`: `prompt` con versioni, `modello` e regola, `strumenti`, `budget`, `permessi`,
`colloquio` (casi ed esiti), `metriche` a 30 e 60 giorni, `revisioni` (proposta, evidenze, stima, decisioni). Pagina
`dipendente` in `direzione-a.js`, aperta dalla **freccia nell'intaglio** della card e della riga compatta (oggi
inerte), con `?pagina=dipendente&id=<id>` per gli screenshot.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 10) e `schermate/direzioni/DIREZIONI.md` (sezioni 1 e 4).
2. Aprire `schermate/direzioni/direzione-a.html` (e `?n=40`, `?editor=nuovo`, `?editor=4`): è la base di codice.
   Modello dati in `dati.js` (`etichetta`, `sotto`, `semeDi`, `aggiungi`, `aggiorna`), icone e utilità in
   `comune.js`, componenti in `direzione-a.js` (`cardDipendente`, `tendinaDipendente`, `av`), avatar in `avatar/`
   (due famiglie: `avatar-orbe.js`, scelta dall'utente e predefinita; il kit resta con `?avatar=kit`; confronto in
   `confronto-avatar.html`). Le ampiezze delle animazioni dell'orbe sono in unità del viewBox (250 = il disco):
   sotto le 15 unità non si vedono.
3. Fare i due lavori della sezione «Prossima sessione: cosa fare», nell'ordine: prima gli avatar (piccolo), poi la
   pagina del dipendente (grande), proponendo la struttura in poche righe prima di costruire.
4. Pagine fatte nella direzione A: home, Richieste, Dipartimento, tendina Dipendente. Dopo il dipendente restano
   l'**esecuzione** (passi, log, output), le **approvazioni da mobile**, i **costi** dell'azienda. Stessa cornice.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport).
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js ../../schermate/direzioni/direzione-a.html /tmp/a.png`
- `fetch-fonts.py` — Urbanist locale per Chromium headless. Per B e C servono anche Inter, Fraunces e Instrument Sans:
  in questa sessione è stato usato un CSS con le quattro famiglie (stessa logica dello script, URL con più `family=`).
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale.
- La Console gira da `file://` e come file unico: **niente moduli ESM**. Il kit avatar è ESM, quindi è impacchettato
  in uno script classico (import/export tolti, ordine math → shape → gaze → roles → generate → states → engine →
  render, nessuna collisione di nomi).
- Un `<use>` che riusa un `<symbol>` con viewBox si posiziona a (0,0) del viewBox esterno: l'SVG esterno degli avatar
  del kit ha viewBox `0 0 268 268`, il simbolo `-134 -134 268 268`. Gli avatar vivi (animati) sostituiscono il `<use>`
  con i nodi e rimettono il viewBox centrato.
- Gli screenshot usano `reducedMotion: 'reduce'`, quindi gli avatar sono al fotogramma fisso e le catture sono
  ripetibili; la prova cliccata (Playwright con `no-preference`) verifica che gli avatar si muovano.
- La famiglia «orbe» anima con sole animazioni CSS (`transform-box:fill-box` sui gruppi SVG, fase e periodo come
  custom property dal seme): nessun ticker, e `@media (prefers-reduced-motion)` le spegne tutte. Con i cicli a pause
  è normale che in un dato istante non tutti i corpi si muovano.
- Pellicola delle animazioni: una pagina di prova con un avatar per stato, `document.getAnimations()` messe in pausa
  e portate a `currentTime` fissi (0, 1, 2, … s), uno screenshot per istante, poi le colonne affiancate.
- Il CSS di `.av` vive dentro `.dirA .a-app`: fuori dalla cornice della Console (pagine di prova) il disco va
  ridichiarato, o gli avatar restano senza disco.
- `DGT_UI.prefissa(css, '.dirA')` prefissa ogni selettore; nelle griglie con testo `nowrap` servono `minmax(0,1fr)` e
  `min-width:0`.
- Gli artefatti si ripubblicano allo stesso URL; se lo strumento rifiuta perché «esiste una versione più recente»,
  rileggere la copia salvata per intero (blocchi da 300 righe) e rifare `read` sull'URL, mai forzare.

## Possibili prossimi passi (non decisi dall'utente)

- Pagina dell'esecuzione (passi, log, output) dal pulsante «occhio» delle card al lavoro.
- Versione mobile della vista principale (approvazioni) partendo dalle tre schermate mobile dello specimen.
- Stati vuoti, caricamento ed errori nel linguaggio della Console.
- Eliminazione di un dipendente (la pausa entra nella pagina del dipendente; l'eliminazione no, non richiesta).
- Estrarre i componenti di `direzione-a.js` in un file condiviso `schermate/componenti.js`.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md (soprattutto «Prossima sessione: cosa fare»). Lavoriamo nella
direzione A · Console (schermate/direzioni/direzione-a.js, dati.js, comune.js, avatar/): non cambiare la
cornice, i componenti o i colori del sistema di design.

Due lavori, in ordine.

1. Avatar orbe (schermate/direzioni/avatar/avatar-orbe.js): togli le animazioni dietro gli avatar, cioè
   l'arco che orbita al lavoro e le onde da approvare. Non toccare le animazioni dell'avatar stesso (corpo,
   occhi, sguardo, battito, moti di stato). Rigenera la pellicola, gli screenshot e i file unici, aggiorna
   DIREZIONI.md e SYSTEM-DESIGN.md.

2. La pagina del dipendente, aperta dalla freccia nell'intaglio della card e della riga compatta.
   Obiettivo: configurare un agente e capire se sta lavorando bene. Pubblico: operatore, con una vista
   sintetica leggibile anche dal titolare. Contenuto: identità e mansione; soul prompt con cronologia delle
   versioni e confronto fra due versioni; modello assegnato e criterio di scelta automatica; strumenti e
   connessioni; budget e permessi; risultati degli eval (il «colloquio» superato per entrare in produzione);
   metriche: task completati, costo per esito utile, quanto spesso un umano corregge l'output, quante
   proposte vengono respinte. La parte più importante è la revisione di performance, dove il sistema propone
   di cambiare prompt o modello: deve sembrare una decisione gestionale seria, con evidenze, non una
   notifica. Parti dalla struttura proposta in PROSSIMA-SESSIONE.md (variante A: testata con i quattro
   numeri, revisione in sospeso come card lime con decisione nella tendina estesa, oggi, rendimento, soul
   prompt con versioni e confronto, modello, strumenti, budget e permessi, colloquio) e dalle quattro
   aggiunte (le richieste esistenti come fonte delle metriche, la revisione come richiesta al titolare,
   pausa e «ripeti il colloquio», un solo ordine per i due pubblici). Proponimi la struttura definitiva in
   poche righe, poi procedi: dati in dati.js, pagina in direzione-a.js, screenshot con
   design-system/tools/screenshot-page.js, artefatto con schermate/direzioni/build-unico.js, aggiorna
   DIREZIONI.md, SYSTEM-DESIGN.md e PROSSIMA-SESSIONE.md, commit e push sul branch che ti indico.
```
