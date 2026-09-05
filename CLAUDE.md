# DGT-Design-2.0

Repository di design del prodotto DGT (sistema operativo aziendale per agenti AI).

- Il design da seguire è quello delle due immagini in `design-system/reference/`: va copiato così com'è. Per il primo riferimento (case study) fa fede l'originale ad alta risoluzione su Behance (galleria 188798347): nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio per i pulsanti, barra agenda, pannello Riepilogo chiaro, app mobile. Per il secondo: rail di icone, tab a pillola, canvas a nodi con connettori luminosi, nodo selezionato verde, barra chat.
- Documento unico: `SYSTEM-DESIGN.md`. Il sistema di design vive in `design-system/` (`DESIGN.md`, `tokens.css`, `specimen.html`, `tools/`). Le varianti precedenti sono archiviate in `design-system/archive/` e non fanno testo.
- All'inizio di una nuova sessione leggere `PROSSIMA-SESSIONE.md` (stato, decisioni, strumenti, come riprendere).
- Le schermate reali del prodotto stanno in `schermate/`. Direzione scelta il 2026-09-04: **A · Console** (il sistema di design applicato senza sconti). Le schermate successive si generano solo dentro quella direzione, con le regole di scala in `schermate/direzioni/DIREZIONI.md` (sezione 4) e in `SYSTEM-DESIGN.md` (sezione 10). Modello dati e componenti in codice: `schermate/direzioni/dati.js`, `comune.js`, `direzione-a.js` (home, Richieste, Dipartimento; tutto cliccabile).
- Non copiare logo, foto o marchi di terzi: contenuti di DGT, avatar con iniziali.
- **Niente emoji**, né nel prodotto né nel sistema di design (regola fondamentale, 2026-09-04): al loro posto le icone del
  sistema, disegnate per DGT nello sprite (`schermate/direzioni/comune.js`; lo specimen ha il suo). La fiamma delle pillole
  «caldo», «urgenti», «da approvare», «in ritardo» è l'icona `i-fire`.
- Le regole UX e i brief precedenti sono stati eliminati su richiesta dell'utente (2026-09-03).
- Lingua dei documenti: italiano.
