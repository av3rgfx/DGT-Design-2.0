# Direzioni per la vista principale

Tre direzioni sulla stessa schermata (vista principale dell'azienda: 4 dipartimenti, 11 dipendenti AI, 3 al lavoro),
prova di scala a 40, direzione scelta: **A · Console**. Lo studio e la decisione sono in `DIREZIONI.md`.

**Sezione 6 di `DIREZIONI.md` (2026-09-07): l'analisi delle tre proposte nuove** — il lavoro del dipartimento che si
tiene d'occhio, l'editor di workflow, i connettori. Numeri presi aprendo le pagine, strade con il prezzo, la parola, e
per le ultime due il verdetto del consiglio (`llm-council`) con i punti ciechi della revisione incrociata.
**L'editor e i connettori aspettano ancora una decisione dell'utente.**

**Versione 19 (2026-09-07): le consegne del dipartimento.** La prima proposta è stata scelta (strada A, parola
«consegna») e costruita: la pagina Dipartimento ha **sei sezioni** invece di cinque, in Console e sul telefono, e la
seconda è **«Consegne di oggi»** — le cose create dalle esecuzioni del dipartimento (18 a undici dipendenti, 40 a
quaranta), con cinque pillole di filtro. Una consegna si apre nella **tendina larga**, la stessa della richiesta
(`?consegna=c1-0`): dentro ci sono chi l'ha fatta, il passo che l'ha prodotta con durata, costo e strumenti, le voci
di log di quel passo, e — se è già uscita al titolare — il documento vero della richiesta. Studio e misure in
`DIREZIONI.md`, «Versione 19»; la regola in `SYSTEM-DESIGN.md`, regola 27.

- Aprire `confronto.html` nel browser (serve rete per Google Fonts) oppure l'artefatto pubblicato:
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Schermate singole: `direzione-a.html`, `direzione-b.html`, `direzione-c.html`; con `?n=40` la prova di scala.
- La direzione A è cliccabile (due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente per
  creare e modificare i dipendenti, pagina Dipendente con la revisione di performance, pagina Esecuzione, pagina Costi,
  pagina Agenda, pagina Chat). Parametri:
  `?pagina=dipartimento&dip=svi|mkt|ven|amm`, `?pagina=dipendente&id=4` (con `&tendina=dossier` il dossier della
  revisione in sospeso, con `&confronto=6,7` due versioni del prompt a confronto), `?pagina=esecuzione&id=4` (Nora al
  lavoro; `id=3` Kim in errore, `id=5` Social media manager da approvare, `id=2` Tester QA pianificata), `?pagina=costi` (i
  costi dell'azienda: per dipartimento, dipendente, cliente, modello e strumento, con le pillole del periodo in ogni sezione;
  dal sesto cerchio del rail, dal numero «spesi oggi» e dalle sezioni Spesa del mese e Costo),
  `?pagina=agenda` (il giorno dell'azienda: la barra delle ore con i blocchi, le esecuzioni di oggi, la settimana e le
  scadenze; dal quinto cerchio del rail, dal cerchio della barra «Oggi in azienda» e dalla pillola «Sposta»),
  `?pagina=chat&filo=<id dipendente>` (le conversazioni con i dipendenti: l'elenco dei fili e il filo aperto con la barra di
  scrittura; dal quarto cerchio del rail, dai cerchi «commenta» delle card, da «Commenta» nelle due tendine e dalla pillola
  «Scrivi a …» dell'Esecuzione),
  `?consegna=<id, es. c1-0>` (apre una consegna nella tendina larga, versione 19),
  `?tendina=chiusa|aperta|estesa`, `?pannello=richieste|riepilogo`, `?pagina=home|richieste`, `?richiesta=0`,
  `?barra=0` (la barra «Oggi in azienda» di prima dello studio, versione 16),
  `?editor=nuovo|<id dipendente>`, `?avatar=orbe|kit`, `?pelle=perla|grigio|chiaro|alone|disco` (la pelle dell'orbe
  senza disco; predefinita perla). Artefatto:
  https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
- **Il telefono del titolare** (versioni 11 e 12, 2026-09-05/06; versione 15, 2026-09-06): `mobile.html` + `mobile.js` (che carica
  `../componenti.js` e non la Console), la direzione A sul telefono
  nella cornice dello specimen: schermate «Da approvare», «Richiesta» (post, documento, lista, proposta e la revisione di
  performance con le due versioni a confronto e le quattro decisioni), «Riepilogo di oggi» (linea del tempo; a coda finita è lo
  stato vuoto della prima schermata), «Chat» (l'elenco dei fili, i non letti prima), «Conversazione» (il filo aperto in fondo,
  con la barra di scrittura) e «Agenda» (il giorno dell'azienda sulla linea del tempo del Riepilogo, poi la settimana), con il
  rifiuto con motivo; dalla **versione 17** (2026-09-07) anche «Dipartimenti» (l'elenco dei quattro, dal secondo cerchio della
  navigazione, che era l'ultimo inerte) e «Dipartimento» (la pagina Dipartimento della Console ridotta: oggi, da approvare
  decidibili sul posto, dipendenti, obiettivi, spesa del mese), e in cima alla prima schermata il **quadro del giorno**, la
  barra «Oggi in azienda» della Console ridotta alla colonna di 254 px in una **griglia due per due** (e la riga dei due
  numeri grandi che cade, perché il quadro e il titolo dicono già quei conti); otto telefoni affiancati, cliccabili, che condividono
  il modello, la richiesta corrente, i fili e il dipartimento scelto con la
  Console (`m.decidi` e `m.scrivi` in `dati.js`). Parametri: `?schermata=1|…|8` (uno o più telefoni, es.
  `?schermata=2`), `?richiesta=0` (a 11: 2 e 3 sono le due revisioni), `?filo=<id dipendente>`, `?dip=svi|mkt|ven|amm`,
  `?quadro=0|1|2|3` (0 toglie il quadro, 2 è la forma scelta, 1 e 3 le due scartate dello studio), `?n=40`, più quelli
  dell'avatar.
  Artefatto: https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
- Avatar dei dipendenti AI in `avatar/`: `avatar-dgt.js` (involucro della Console, sceglie la famiglia con
  `usa('orbe'|'kit')` e la pelle con `pelle('chiaro'|…)`), `avatar-orbe.js` (la famiglia «orbe», predefinita, senza
  disco), `avatar-motore.js` (motore del kit impacchettato: rigenerare con `node avatar/build-motore.js` dopo aver
  toccato `avatar/vendor-avatars/`). Le due famiglie a confronto: `confronto-avatar.html`, artefatto
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526. Le pelli dell'orbe a confronto su tutti i
  fondi della Console: `avatar-pelli.html`, artefatto https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- I componenti condivisi stanno in `../componenti.js` (`schermate/componenti.js`, `window.DGT_COMPONENTI`, dalla versione 14):
  il CSS delle primitive, le variabili e le funzioni che le stampano (`av`, `pair`, `chipStato`, `iconaTipo`, `eur`,
  `differenze`…). Ogni pagina lo carica subito dopo `comune.js` e mette in pagina `DGT_COMPONENTI.css` prima del CSS della
  Console (`direzione-a.js`, che tiene la cornice, le pagine, le tendine e `monta`).
- Prove cliccate in `prove/` (con il `README.md` che dice il comando): `console.js` (132 verifiche: tendine, Richieste, editor del
  dipendente, esecuzione, 40, la barra «Oggi in azienda», la barra dei passi, i controlli delle intestazioni e le frecce di
  riga), `mobile.js` (78: le otto schermate, la revisione, il rifiuto con motivo, la prova, lo stato vuoto,
  40, il quadro del giorno, i Dipartimenti e il conto delle frecce), `costi.js` (48: la pagina dei Costi) e `agenda-chat.js` (54: le due pagine nuove, da dove ci si arriva, i filtri, la
  scrittura nel filo e le due tab del telefono):
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/console.js`
  (e così `mobile.js`, `costi.js`, `agenda-chat.js`).
- File unico per l'artefatto: `node build-unico.js /percorso/confronto-unico.html`.
- La pagina delle quattro scelte per la barra, con il voto condiviso: sorgente `scelta-barra.src.html` (le catture sono
  segnaposto `IMG:<nome>`, quindi non si apre da sola), `node costruisci-scelta.js` la costruisce incorporando i PNG di
  `screenshot/`. Artefatto: https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f
- Screenshot: `LOCAL_FONT_CSS=/tmp/fonts.css node ../../design-system/tools/screenshot-page.js "direzione-a.html?n=40" out.png`.
  Le catture di `screenshot/` si rigenerano tutte con `scatta.js`, che ne dichiara i parametri:
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/scatta.js`
  (`console` o `barra` per un gruppo solo, `--in <cartella>` per il confronto prima/dopo). Le catture che restano a mano
  sono dichiarate in `FUORI` dentro il file.
- La barra «Oggi in azienda» (versione 16): dentro la pista ci sono le caselle contate del giorno (approvate, al lavoro,
  ferme, dopo), non più i blocchi con l'asse del tempo; quello che aspetta il titolare lo dice la linguetta lime, non la
  barra (correzione 16a). `?barra=0` rimette quella di prima. Studio, strade
  scartate e numeri in `DIREZIONI.md`, «Versione 16».
- L'identità degli orbi (versione 10, proposta in attesa di scelta): `avatar-identita.html`, un configuratore con corpo
  (perla, piatta, con orlo), palette (scura, vivace, pastello), occhi (attuali, punti grandi, lilguy, neri, colorati) e
  identità (tinta per dipendente, dipartimento, nessuna), nove strade preimpostate e la Console vera;
  `?identita=tinta&palette=vivace&corpo=piatta&occhi=lilguy`. Artefatto
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6
