# DGT-Design-2.0

Repository di design di DGT, sistema operativo aziendale per agenti AI.

- **`SYSTEM-DESIGN.md`** — il documento unico del sistema di design (fonti, palette, tipografia, forme, componenti, schermate, uso).
- `design-system/specimen.html` — lo specimen completo (anche artefatto pubblicato).
- `design-system/tokens.css` — i token `--dgt-*`.
- `design-system/DESIGN.md` — descrizione strutturata.
- `design-system/reference/` — i due riferimenti da copiare così come sono.
- `design-system/tools/` — screenshot, font locali, contrasto.
- `schermate/componenti.js` — i componenti della Console condivisi con il telefono e con le pagine degli avatar (il CSS delle primitive, le variabili, le funzioni che le stampano).
- `schermate/direzioni/` — prime schermate reali: tre direzioni per la vista principale dell'azienda, prova a 40 dipendenti, direzione scelta (A · Console) con home, pagine Richieste, Dipartimento, Dipendente, Esecuzione, Costi, Agenda e Chat, e il telefono del titolare (`mobile.html`: Da approvare, Richiesta con la revisione di performance, Riepilogo di oggi, Chat, Conversazione, Agenda, Dipartimenti e Dipartimento). Dal 2026-09-06 la barra «Oggi in azienda» in cima alla Console è il quadro del giorno in quattro caselle contate (studio UX, versione 16 con la correzione 16a); dal 2026-09-07 il quadro c'è anche in cima al telefono, ridotto a una griglia due per due (versione 17), e **i controlli si vedono solo se fanno quello che promettono**: la ricerca di sezione filtra davvero dove serve, le pillole filtrano, i cerchi vuoti sono spariti. Dal 2026-09-07 la stessa regola vale per le **frecce di riga** (versione 18): la freccia resta dove la riga porta da qualche parte e sparisce dove non ce l'ha — da 260 frecce che non aprivano niente a 2, dichiarate — e una card che non ha più pulsanti perde anche l'intaglio. Studio in `DIREZIONI.md`. Le prove cliccate con Playwright in `schermate/direzioni/prove/` e le catture rigenerabili con `schermate/direzioni/scatta.js`. Il 2026-09-07, senza toccare il prodotto, sono state **analizzate le tre proposte nuove** dell'utente — il lavoro del dipartimento che si tiene d'occhio, l'editor di workflow, i connettori — aprendo le pagine e contando, con le ultime due passate dal consiglio (`llm-council`): `DIREZIONI.md`, sezione 6. Le decisioni sono dell'utente e sono ancora da prendere.
- `PROSSIMA-SESSIONE.md` — passaggio di consegne per la prossima sessione.
- `PRODUCT.md`, `CLAUDE.md` — contesto di prodotto e istruzioni.
