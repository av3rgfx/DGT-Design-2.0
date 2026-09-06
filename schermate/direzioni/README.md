# Direzioni per la vista principale

Tre direzioni sulla stessa schermata (vista principale dell'azienda: 4 dipartimenti, 11 dipendenti AI, 3 al lavoro),
prova di scala a 40, direzione scelta: **A · Console**. Lo studio e la decisione sono in `DIREZIONI.md`.

- Aprire `confronto.html` nel browser (serve rete per Google Fonts) oppure l'artefatto pubblicato:
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Schermate singole: `direzione-a.html`, `direzione-b.html`, `direzione-c.html`; con `?n=40` la prova di scala.
- La direzione A è cliccabile (due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente per
  creare e modificare i dipendenti, pagina Dipendente con la revisione di performance, pagina Esecuzione, pagina Costi). Parametri:
  `?pagina=dipartimento&dip=svi|mkt|ven|amm`, `?pagina=dipendente&id=4` (con `&tendina=dossier` il dossier della
  revisione in sospeso, con `&confronto=6,7` due versioni del prompt a confronto), `?pagina=esecuzione&id=4` (Nora al
  lavoro; `id=3` Kim in errore, `id=5` Social media manager da approvare, `id=2` Tester QA pianificata), `?pagina=costi` (i
  costi dell'azienda: per dipartimento, dipendente, cliente, modello e strumento, con le pillole del periodo in ogni sezione;
  dal sesto cerchio del rail, dal numero «spesi oggi» e dalle sezioni Spesa del mese e Costo),
  `?tendina=chiusa|aperta|estesa`, `?pannello=richieste|riepilogo`, `?pagina=home|richieste`, `?richiesta=0`,
  `?editor=nuovo|<id dipendente>`, `?avatar=orbe|kit`, `?pelle=perla|grigio|chiaro|alone|disco` (la pelle dell'orbe
  senza disco; predefinita perla). Artefatto:
  https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
- **Le approvazioni da mobile** (versioni 11 e 12, 2026-09-05/06): `mobile.html` + `mobile.js`, la direzione A sul telefono
  nella cornice dello specimen: schermate «Da approvare», «Richiesta» (post, documento, lista, proposta e la revisione di
  performance con le due versioni a confronto e le quattro decisioni) e «Riepilogo di oggi» (linea del tempo; a coda finita è lo
  stato vuoto della prima schermata), con il rifiuto con motivo; tre telefoni affiancati, cliccabili, che condividono il modello
  e la richiesta corrente con la Console (`m.decidi` in `dati.js`). Parametri: `?schermata=1|2|3` (uno o più telefoni, es.
  `?schermata=2`), `?richiesta=0` (a 11: 2 e 3 sono le due revisioni), `?n=40`, più quelli dell'avatar.
  Artefatto: https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
- Avatar dei dipendenti AI in `avatar/`: `avatar-dgt.js` (involucro della Console, sceglie la famiglia con
  `usa('orbe'|'kit')` e la pelle con `pelle('chiaro'|…)`), `avatar-orbe.js` (la famiglia «orbe», predefinita, senza
  disco), `avatar-motore.js` (motore del kit impacchettato: rigenerare con `node avatar/build-motore.js` dopo aver
  toccato `avatar/vendor-avatars/`). Le due famiglie a confronto: `confronto-avatar.html`, artefatto
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526. Le pelli dell'orbe a confronto su tutti i
  fondi della Console: `avatar-pelli.html`, artefatto https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- Prove cliccate in `prove/`: `costi.js` (la pagina dei Costi, 48 verifiche con Playwright):
  `PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css node schermate/direzioni/prove/costi.js`.
- File unico per l'artefatto: `node build-unico.js /percorso/confronto-unico.html`.
- Screenshot: `LOCAL_FONT_CSS=/tmp/fonts.css node ../../design-system/tools/screenshot-page.js "direzione-a.html?n=40" out.png`.
- L'identità degli orbi (versione 10, proposta in attesa di scelta): `avatar-identita.html`, un configuratore con corpo
  (perla, piatta, con orlo), palette (scura, vivace, pastello), occhi (attuali, punti grandi, lilguy, neri, colorati) e
  identità (tinta per dipendente, dipartimento, nessuna), nove strade preimpostate e la Console vera;
  `?identita=tinta&palette=vivace&corpo=piatta&occhi=lilguy`. Artefatto
  https://claude.ai/code/artifact/1fc2ee53-3c23-4462-922a-cd581a90b6d6
