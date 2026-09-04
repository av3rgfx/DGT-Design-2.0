# Direzioni per la vista principale

Tre direzioni sulla stessa schermata (vista principale dell'azienda: 4 dipartimenti, 11 dipendenti AI, 3 al lavoro),
prova di scala a 40, direzione scelta: **A · Console**. Lo studio e la decisione sono in `DIREZIONI.md`.

- Aprire `confronto.html` nel browser (serve rete per Google Fonts) oppure l'artefatto pubblicato:
  https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Schermate singole: `direzione-a.html`, `direzione-b.html`, `direzione-c.html`; con `?n=40` la prova di scala.
- La direzione A è cliccabile (tendina del titolare a tre stati, pagina Richieste). Parametri:
  `?tendina=chiusa|aperta|estesa`, `?pagina=home|richieste`, `?richiesta=0`, `?riepilogo=insieme|separato`,
  `?pannello=richieste|riepilogo`, `?controlli=0` (nasconde il selettore di prova). Artefatto:
  https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
- File unico per l'artefatto: `node build-unico.js /percorso/confronto-unico.html`.
- Screenshot: `LOCAL_FONT_CSS=/tmp/fonts.css node ../../design-system/tools/screenshot-page.js "direzione-a.html?n=40" out.png`.
