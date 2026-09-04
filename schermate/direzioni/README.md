# Direzioni per la vista principale

Tre direzioni sulla stessa schermata (vista principale dell'azienda: 4 dipartimenti, 11 dipendenti AI, 3 al lavoro),
prova di scala a 40, direzione scelta: **A · Console**. Lo studio e la decisione sono in `DIREZIONI.md`.

- Aprire `confronto.html` nel browser (serve rete per Google Fonts) oppure l'artefatto pubblicato:
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Schermate singole: `direzione-a.html`, `direzione-b.html`, `direzione-c.html`; con `?n=40` la prova di scala.
- La direzione A è cliccabile (due tendine del titolare, pagina Richieste, pagina Dipartimento, tendina Dipendente per
  creare e modificare i dipendenti). Parametri:
  `?pagina=dipartimento&dip=svi|mkt|ven|amm`, `?tendina=chiusa|aperta|estesa`, `?pannello=richieste|riepilogo`,
  `?pagina=home|richieste`, `?richiesta=0`, `?editor=nuovo|<id dipendente>`. Artefatto:
  https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
- Avatar dei dipendenti AI in `avatar/`: `avatar-dgt.js` (involucro della Console), `avatar-motore.js` (motore del kit
  impacchettato: rigenerare con `node avatar/build-motore.js` dopo aver toccato `avatar/vendor-avatars/`).
- File unico per l'artefatto: `node build-unico.js /percorso/confronto-unico.html`.
- Screenshot: `LOCAL_FONT_CSS=/tmp/fonts.css node ../../design-system/tools/screenshot-page.js "direzione-a.html?n=40" out.png`.
