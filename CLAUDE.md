# DGT-Design-2.0

Repository di design del prodotto DGT (sistema operativo aziendale per agenti AI).

- Il design da seguire è quello delle due immagini in `design-system/reference/`: va copiato così com'è. Per il primo riferimento (case study) fa fede l'originale ad alta risoluzione su Behance (galleria 188798347): nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio per i pulsanti, barra agenda, pannello Riepilogo chiaro, app mobile. Per il secondo: rail di icone, tab a pillola, canvas a nodi con connettori luminosi, nodo selezionato verde, barra chat.
- Documento unico: `SYSTEM-DESIGN.md`. Il sistema di design vive in `design-system/` (`DESIGN.md`, `tokens.css`, `specimen.html`, `tools/`). Le varianti precedenti sono archiviate in `design-system/archive/` e non fanno testo.
- All'inizio di una nuova sessione leggere `PROSSIMA-SESSIONE.md` (stato, decisioni, strumenti, come riprendere).
- Non copiare logo, foto o marchi di terzi: contenuti di DGT, avatar con iniziali.
- Niente emoji: solo icone SVG. Ogni segno grafico è un `<symbol id="i-*">` dello specimen (tratto, `currentColor`); vale per lo specimen, i documenti e le schermate future. Verifica: ricerca degli intervalli Unicode delle emoji nei file `.md`/`.html`/`.css` fuori da `design-system/archive/` = zero.
- Il moto è definito dai token `--dgt-t-*`, `--dgt-ease*`, `--dgt-dist-*`, `--dgt-blur-*` in `design-system/tokens.css` e documentato nella sezione "Moto" di `SYSTEM-DESIGN.md`: sobrio, senza spostamenti di layout, sempre con la guardia `prefers-reduced-motion`.
- Le regole UX e i brief precedenti sono stati eliminati su richiesta dell'utente (2026-09-03).
- Lingua dei documenti: italiano.
