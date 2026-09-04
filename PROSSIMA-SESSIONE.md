# Prossima sessione — passaggio di consegne

Stato al 2026-09-04, fine della sessione sui **dipendenti AI** nella direzione A · Console (versione 5): niente nomi di
base, editor del dipendente, avatar generati dal kit dell'utente al posto delle iniziali. Tutto è committato e pushato
sul branch indicato sotto.

## Stato

- Branch: `claude/console-ai-employees-feebdx` (da `main`, che contiene le PR #1 e #3). Nessuna PR aperta per questo
  branch: aprirla verso `main` quando l'utente lo chiede.
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
  `schermate/direzioni/DIREZIONI.md` (sezione 4, «Versione 5» per i dipendenti).

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

Vincolo che vale sempre: nessun logo, foto o marchio di terzi; contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 10) e `schermate/direzioni/DIREZIONI.md` (sezioni 1 e 4).
2. Aprire `schermate/direzioni/direzione-a.html` (e `?n=40`, `?editor=nuovo`, `?editor=4`): è la base di codice.
   Modello dati in `dati.js` (`etichetta`, `sotto`, `semeDi`, `aggiungi`, `aggiorna`), icone e utilità in
   `comune.js`, componenti in `direzione-a.js` (`cardDipendente`, `tendinaDipendente`, `av`), avatar in `avatar/`
   (due famiglie: `avatar-orbe.js`, scelta dall'utente e predefinita; il kit resta con `?avatar=kit`; confronto in
   `confronto-avatar.html`). Le ampiezze delle animazioni dell'orbe sono in unità del viewBox (250 = il disco):
   sotto le 15 unità non si vedono.
3. Pagine fatte nella direzione A: home, Richieste, Dipartimento, tendina Dipendente. Prossime schermate possibili:
   il **dipendente** (profilo: esecuzioni, costi, configurazione; oggi la freccia nell'intaglio della card è inerte
   perché la pagina non esiste), l'**esecuzione** (passi, log, output), le **approvazioni da mobile**, i **costi**
   dell'azienda. Stessa cornice della Console.

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
  ha viewBox `0 0 268 268`, il simbolo `-134 -134 268 268`. Gli avatar vivi (animati) sostituiscono il `<use>` con i
  nodi e rimettono il viewBox centrato.
- Gli screenshot usano `reducedMotion: 'reduce'`, quindi gli avatar sono al fotogramma fisso e le catture sono
  ripetibili; la prova cliccata (Playwright con `no-preference`) verifica che gli avatar si muovano.
- La famiglia «orbe» anima con sole animazioni CSS (`transform-box:fill-box` sui gruppi SVG, fase e periodo come
  custom property dal seme): nessun ticker, e `@media (prefers-reduced-motion)` le spegne tutte.
- Il CSS di `.av` vive dentro `.dirA .a-app`: fuori dalla cornice della Console (pagine di prova) il disco va
  ridichiarato, o gli avatar restano senza disco.
- `DGT_UI.prefissa(css, '.dirA')` prefissa ogni selettore; nelle griglie con testo `nowrap` servono `minmax(0,1fr)` e
  `min-width:0`.

## Possibili prossimi passi (non decisi dall'utente)

- Pagina del dipendente (profilo) dietro la freccia della card; oggi la matita apre l'editor e la freccia è inerte.
- Pagina dell'esecuzione (passi, log, output) dal pulsante «occhio» delle card al lavoro.
- Versione mobile della vista principale (approvazioni) partendo dalle tre schermate mobile dello specimen.
- Stati vuoti, caricamento ed errori nel linguaggio della Console.
- Eliminazione o sospensione di un dipendente dall'editor (oggi non c'è: non richiesto).
- Estrarre i componenti di `direzione-a.js` in un file condiviso `schermate/componenti.js`.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Lavoriamo nella direzione A · Console
(schermate/direzioni/direzione-a.js, dati.js, comune.js, avatar/): non cambiare la cornice, i componenti o i
colori del sistema di design.

Obiettivo: la pagina del dipendente (profilo), aperta dalla freccia nell'intaglio della card: testata con
avatar grande (segue il puntatore), etichetta secondo la regola nome/ruolo, stato, dipartimento; esecuzioni
di oggi e storico; costi; configurazione (ruolo, dipartimento, avatar: riusa la tendina Dipendente).
Proponimi la struttura in poche righe, poi procedi: screenshot con design-system/tools/screenshot-page.js,
artefatto con schermate/direzioni/build-unico.js, aggiorna DIREZIONI.md, SYSTEM-DESIGN.md e
PROSSIMA-SESSIONE.md, commit e push sul branch che ti indico.
```
