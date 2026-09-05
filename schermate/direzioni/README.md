# Direzioni per la vista principale

Tre direzioni sulla stessa schermata (vista principale dell'azienda: 4 dipartimenti, 11 dipendenti AI, 3 al lavoro),
prova di scala a 40, direzione scelta: **A · Console**. Lo studio e la decisione sono in `DIREZIONI.md`.

- Aprire `confronto.html` nel browser (serve rete per Google Fonts) oppure l'artefatto pubblicato:
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Schermate singole: `direzione-a.html`, `direzione-b.html`, `direzione-c.html`; con `?n=40` la prova di scala.
- La direzione A è cliccabile (due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente per
  creare e modificare i dipendenti, pagina Dipendente con la revisione di performance, pagina Esecuzione). Parametri:
  `?pagina=dipartimento&dip=svi|mkt|ven|amm`, `?pagina=dipendente&id=4` (con `&tendina=dossier` il dossier della
  revisione in sospeso, con `&confronto=6,7` due versioni del prompt a confronto), `?pagina=esecuzione&id=4` (Nora al
  lavoro; `id=3` Kim in errore, `id=5` Social media manager da approvare, `id=2` Tester QA pianificata),
  `?tendina=chiusa|aperta|estesa`, `?pannello=richieste|riepilogo`, `?pagina=home|richieste`, `?richiesta=0`,
  `?editor=nuovo|<id dipendente>`, `?avatar=orbe|kit`, `?pelle=perla|grigio|chiaro|alone|disco` (la pelle dell'orbe
  senza disco; predefinita perla). Artefatto:
  https://claude.ai/code/artifact/8a8a273e-882b-4ef8-8e9b-f9270628e149
- Avatar dei dipendenti AI in `avatar/`: `avatar-dgt.js` (involucro della Console, sceglie la famiglia con
  `usa('orbe'|'kit')` e la pelle con `pelle('chiaro'|…)`), `avatar-orbe.js` (la famiglia «orbe», predefinita, senza
  disco), `avatar-motore.js` (motore del kit impacchettato: rigenerare con `node avatar/build-motore.js` dopo aver
  toccato `avatar/vendor-avatars/`). Le due famiglie a confronto: `confronto-avatar.html`, artefatto
  https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526. Le pelli dell'orbe a confronto su tutti i
  fondi della Console: `avatar-pelli.html`, artefatto https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- File unico per l'artefatto: `node build-unico.js /percorso/confronto-unico.html`.
- Screenshot: `LOCAL_FONT_CSS=/tmp/fonts.css node ../../design-system/tools/screenshot-page.js "direzione-a.html?n=40" out.png`.
- L'identità degli orbi (versione 10, proposta in attesa di scelta): `avatar-identita.html`, un configuratore con corpo
  (perla, piatta, con orlo), palette (scura, vivace, pastello), occhi (attuali, punti grandi, lilguy, neri, colorati) e
  identità (tinta per dipendente, dipartimento, nessuna), nove strade preimpostate e la Console vera;
  `?identita=tinta&palette=vivace&corpo=piatta&occhi=lilguy`. Artefatto
  https://claude.ai/code/artifact/690baac8-2de3-48e3-bb98-98024bc7312f
