# Prossima sessione — passaggio di consegne

Stato al 2026-09-04, fine della sessione sulla **pagina del Dipendente** (versione 6 della direzione A · Console) e
sugli avatar orbe senza segni dietro (versione 5c). Tutto è committato e pushato sul branch indicato sotto.

## Stato

- Branch: `claude/avatar-orbe-employee-page-3nhqmk` (da `main`, che contiene le PR #1, #3 e #4). A fine sessione è
  aperta la **PR #5** verso `main` (https://github.com/av3rgfx/DGT-Design-2.0/pull/5): se all'avvio della prossima
  sessione risulta già unita, ripartire da `main` con un branch nuovo; se è ancora aperta, continuare sullo stesso branch
  e la PR si aggiorna da sola.
- I tre artefatti qui sotto sono stati ripubblicati a fine sessione e corrispondono al commit `0745f0a`.
- Artefatto della direzione A cliccabile (home, tendine, Richieste, Dipartimento, editor del dipendente, avatar, pagina
  del Dipendente con la revisione di performance): https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
  (si aggiorna con `node schermate/direzioni/build-unico.js direzione-a.html /percorso/a.html` e ripubblicando allo
  stesso URL).
- Artefatto del confronto A/B/C (selettore 11/40): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
  (`node build-unico.js confronto.html /percorso/confronto.html`).
- Artefatto delle due famiglie di avatar a confronto (kit e orbe): https://claude.ai/code/artifact/4bc0c3ee-d1a0-41dc-a6d9-ef4f2b8360bd
  (`node build-unico.js confronto-avatar.html /percorso/avatar.html`).
- Artefatto dello specimen del sistema: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Documento unico: `SYSTEM-DESIGN.md` (sezione 10, regole 1–13; sezione 6 con le righe «Pagina Dipendente», «Card
  revisione di performance», «Tendina versioni / dossier»). Studio e versioni della direzione A:
  `schermate/direzioni/DIREZIONI.md` (sezione 4: «Versione 6» per la pagina del Dipendente, «Versione 5c» per gli avatar).

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
12. **2026-09-04, questa sessione, lavoro 1**: «togliere le animazioni dietro gli avatar (le animazioni degli avatar non
    le devi toccare)». Fatto: tolti l'arco che orbitava al lavoro e le onde da approvare (`avatar-orbe.js`), il resto è
    intatto. Pellicola, screenshot e file unici rigenerati.
13. **Lavoro 2**: la pagina del Dipendente dal brief dell'utente (configurare un agente e capire se lavora bene;
    operatore con vista sintetica per il titolare; identità e mansione, soul prompt con versioni e confronto, modello e
    criterio automatico, strumenti e connessioni, budget e permessi, colloquio, metriche; la revisione di performance
    come decisione gestionale seria con evidenze). Struttura costruita: la variante A della proposta con le quattro
    aggiunte (le richieste come fonte delle metriche, la revisione come richiesta al titolare, pausa e «ripeti il
    colloquio», un solo ordine per i due pubblici). Dettaglio in `DIREZIONI.md`, «Versione 6». **Da confermare
    dall'utente all'avvio della prossima sessione**: la struttura è stata proposta e costruita nella stessa sessione.

Vincolo che vale sempre: nessun logo, foto o marchio di terzi (i modelli sono livelli neutri di DGT: Rapido, Standard,
Esperto); contenuti sintetici di DGT; documenti in italiano.

## Come riprendere

1. Leggere `CLAUDE.md`, `SYSTEM-DESIGN.md` (sezione 10) e `schermate/direzioni/DIREZIONI.md` (sezioni 1 e 4, in
   particolare «Versione 6»). Controllare lo stato della PR #5 (vedi «Stato»).
2. Aprire `schermate/direzioni/direzione-a.html`: `?pagina=dipendente&id=4` (Nora, con la revisione del prompt in
   sospeso), `&id=5` (Social media manager, revisione del modello), `&tendina=dossier` (il dossier esteso),
   `&confronto=6,7` (due versioni a confronto), `?n=40&pagina=dipendente&id=17` (dossier generato). Modello dati in
   `dati.js` (`dossierDi`, `revisioneDi`, `decidiRevisione`, `MODELLI`, le richieste di tipo `revisione`), pagina e
   tendina in `direzione-a.js` (`dipendente`, `testataDipendente`, `cardRevisione`, `sezione*`, `tendinaVersioni`,
   `differenze`), avatar in `avatar/`.
3. Raccogliere il giudizio dell'utente sulla pagina del Dipendente e correggere. Punti aperti che possono uscire:
   - la **tendina estesa del dossier** arriva a 980 px di altezza solo se lo schermo lo permette; a 900 px di viewport
     scorre dentro (le decisioni stanno in fondo). Se il dossier deve crescere (più evidenze, il confronto per
     esecuzione), promuoverlo a pagina propria (variante C della proposta), come la pagina Richieste;
   - il **titolo lungo** nella cornice (ruoli senza nome: «SOCIAL MEDIA MANAGER») scende a 36 px sopra i 12 caratteri
     e a 30 sopra i 20: se non piace, l'alternativa è il nome/ruolo a 46 px con i numeri di oggi a capo;
   - «Modifica» del prompt (matita sul documento) e «Aggiungi uno strumento / un'eccezione» sono inerti: non era chiesto
     un editor del prompt;
   - le pillole di filtro delle sezioni (Ultimi 90 giorni, Per cliente, Esempi allegati…) sono inerti come nelle altre
     pagine.
4. Pagine fatte nella direzione A: home, Richieste, Dipartimento, tendina Dipendente, pagina Dipendente. Restano
   l'**esecuzione** (passi, log, output: dal pulsante «occhio» delle card al lavoro), le **approvazioni da mobile**,
   i **costi** dell'azienda. Stessa cornice.

## Strumenti (`design-system/tools/`)

- `screenshot-page.js` — cattura a pagina intera (`FULL_PAGE=0` per il solo viewport; il quarto argomento è l'altezza
  del viewport: 1120 per far stare il dossier).
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/tmp/fonts.css node screenshot-page.js "../../schermate/direzioni/direzione-a.html?pagina=dipendente&id=4&tendina=chiusa" /tmp/a.png`
- `fetch-fonts.py` — Urbanist locale per Chromium headless (`SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 fetch-fonts.py /tmp/fonts.css`).
- `schermate/direzioni/avatar/build-motore.js` — rigenera `avatar-motore.js` dai sorgenti del kit.
- `schermate/direzioni/build-unico.js` — file unico per gli artefatti (incorpora anche gli script in `avatar/`).
- Pellicola degli avatar: una pagina di prova con sei copie di un orbe per stato, `document.getAnimations()` in pausa
  con `currentTime` a 0…5 s per colonna, uno screenshot solo (800×560). Lo script è stato tenuto fuori dal repository:
  rifarlo in dieci righe se serve.

## Note tecniche apprese

- Playwright globale (`NODE_PATH=/opt/node22/lib/node_modules`, `PLAYWRIGHT_MODULE=playwright`), Chromium in
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`; Google Fonts bloccato: gli script servono un CSS locale.
- La Console gira da `file://` e come file unico: **niente moduli ESM**. Il kit avatar è impacchettato in uno script
  classico.
- Gli screenshot usano `reducedMotion: 'reduce'`, quindi gli avatar sono al fotogramma fisso; la prova cliccata
  (Playwright con `no-preference`) verifica che si muovano e che ogni azione della pagina funzioni.
- La famiglia «orbe» anima con sole animazioni CSS (`transform-box:fill-box`); con `prefers-reduced-motion` tutto fermo.
  Dal 2026-09-04 non ha segni fuori dal corpo (niente `.giro` e `.onda`).
- Il CSS di `.av` vive dentro `.dirA .a-app`: fuori dalla cornice della Console il disco va ridichiarato.
- `DGT_UI.prefissa(css, '.dirA')` prefissa ogni selettore; nelle griglie con testo `nowrap` servono `minmax(0,1fr)` e
  `min-width:0`.
- Gli **intagli** (`.nt`) prendono il colore di `--behind`: sulle card chiare messe sul nero (documento del prompt,
  card del modello assegnato) i pulsanti dentro l'intaglio restano bianchi su nero, non neri.
- Le **tendine coprono la destra della pagina** (330 px aperte, 840 estese): nella pagina del Dipendente i numeri e
  le azioni stanno a sinistra apposta; le card di destra restano sotto la tendina come nelle altre pagine.
- Il **dossier** di una richiesta di tipo `revisione` si ottiene da `tendinaEstesa` → `tendinaVersioni`; il confronto
  libero fra versioni usa lo stato `tendina: 'confronto'` con `confronto = { id, a, b }` e torna alla tendina di prima.
- Le **differenze** fra due versioni sono un LCS per paragrafo e poi per parola dentro i paragrafi appaiati (una
  cancellazione con un'aggiunta); le parole cambiate contigue stanno in un solo `mark`.
- Gli artefatti si ripubblicano allo stesso URL; se lo strumento rifiuta perché «esiste una versione più recente»,
  rileggere la copia salvata per intero e rifare `read` sull'URL, mai forzare.

## Possibili prossimi passi (non decisi dall'utente)

- Pagina dell'esecuzione (passi, log, output) dal pulsante «occhio» delle card al lavoro.
- Editor del soul prompt (dalla matita sul documento): nuova versione, nota, colloquio prima della produzione.
- Versione mobile della vista principale (approvazioni) partendo dalle tre schermate mobile dello specimen.
- Stati vuoti, caricamento ed errori nel linguaggio della Console.
- Eliminazione di un dipendente (la pausa c'è; l'eliminazione no, non richiesta).
- Estrarre i componenti di `direzione-a.js` in un file condiviso `schermate/componenti.js`.

### Prompt di avvio suggerito per la prossima sessione

```
Leggi CLAUDE.md, poi PROSSIMA-SESSIONE.md. Lavoriamo nella direzione A · Console (schermate/direzioni/direzione-a.js,
dati.js, comune.js, avatar/): non cambiare la cornice, i componenti o i colori del sistema di design.
Apri la pagina del Dipendente (direzione-a.html?pagina=dipendente&id=4) e DIREZIONI.md «Versione 6»: ecco le mie
correzioni: […]. Poi la pagina dell'esecuzione (passi, log, output) dal pulsante «occhio» delle card al lavoro:
proponimi la struttura in poche righe, poi procedi con screenshot, artefatto, documenti, commit e push.
```
