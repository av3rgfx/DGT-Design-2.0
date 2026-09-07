# DGT-Design-2.0

Repository di design del prodotto DGT (sistema operativo aziendale per agenti AI).

- Il design da seguire è quello delle due immagini in `design-system/reference/`: va copiato così com'è. Per il primo riferimento (case study) fa fede l'originale ad alta risoluzione su Behance (galleria 188798347): nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio per i pulsanti, barra agenda, pannello Riepilogo chiaro, app mobile. Per il secondo: rail di icone, tab a pillola, canvas a nodi con connettori luminosi, nodo selezionato verde, barra chat.
- Documento unico: `SYSTEM-DESIGN.md`. Il sistema di design vive in `design-system/` (`DESIGN.md`, `tokens.css`, `specimen.html`, `tools/`). Le varianti precedenti sono archiviate in `design-system/archive/` e non fanno testo.
- All'inizio di una nuova sessione leggere `PROSSIMA-SESSIONE.md` (stato, decisioni, strumenti, come riprendere).
- Le schermate reali del prodotto stanno in `schermate/`. Direzione scelta il 2026-09-04: **A · Console** (il sistema di design applicato senza sconti). Le schermate successive si generano solo dentro quella direzione, con le regole di scala in `schermate/direzioni/DIREZIONI.md` (sezione 4) e in `SYSTEM-DESIGN.md` (sezione 10). Modello dati e componenti in codice: `schermate/direzioni/dati.js`, `comune.js`, `direzione-a.js` (home, Richieste, Dipartimento; tutto cliccabile).
- Non copiare logo, foto o marchi di terzi: contenuti di DGT, avatar con iniziali per le persone.
- **Avatar dei dipendenti AI** (scelta del 2026-09-05, «strada 1» in `schermate/direzioni/DIREZIONI.md`, versione 10): disco
  piatto nella tinta del dipendente (otto tinte vivaci, assegnate alla creazione, cambiabili nell'editor) con due occhi grandi,
  sclera bianca e pupilla nera sempre; lo stato non passa dal colore degli occhi ma da un punto sul bordo della casella
  (lime, giallo, rosa), e nelle pile di avatar dal gesto del corpo. Regola 19 in `SYSTEM-DESIGN.md`.
- **Niente emoji**, né nel prodotto né nel sistema di design (regola fondamentale, 2026-09-04): al loro posto le icone del
  sistema, disegnate per DGT nello sprite (`schermate/direzioni/comune.js`; lo specimen ha il suo). La fiamma delle pillole
  «caldo», «urgenti», «da approvare», «in ritardo» è l'icona `i-fire`.
- **Ogni dubbio progettuale passa dal consiglio** (regola fondamentale, 2026-09-07): quando c'è una scelta di progetto con
  più di una risposta difendibile, prima di scrivere codice va passata dalla skill `llm-council` — cinque pareri
  indipendenti, revisione incrociata anonima, sintesi. Poi la decisione la prende l'utente: il consiglio prepara la
  domanda, non la chiude.
  - **È un dubbio progettuale** una scelta che cambia che cosa il prodotto è o come lo si usa e che ha più di una
    risposta sensata: chi parla in una schermata, se un'azione passa per l'approvazione, che forma prende un componente
    nuovo, quale parola nomina un oggetto nuovo, che cosa il titolare smette di vedere.
  - **Non lo è** quello che si può misurare (aprire la pagina e prendere le misure), quello che si può contare nel
    codice, quello che una regola già scritta decide, e le scelte con un valore ovvio. Lì si guarda, non si vota.
  - **Il contesto va scritto per esteso e uguale per tutti**, ed è la parte che decide la qualità della risposta: che cos'è
    DGT, la sua spina dorsale (il titolare approva ogni uscita; ogni euro e ogni consegna risalgono a un dipendente e a
    un'esecuzione), che cosa esiste già nel modello e nelle pagine, le due o tre strade con il loro prezzo **in numeri**,
    e il criterio con cui giudicare, con le parole dell'utente. A ogni consigliere si chiede anche l'obiezione più forte
    alla propria scelta, una terza strada, e le conseguenze concrete sull'interfaccia già costruita.
  - **La revisione incrociata non si salta**: nella prima applicazione (7 settembre, la chat di dipartimento) le cose che
    hanno cambiato la risposta sono venute da lì e non dai pareri — una proposta che violava la regola 19 degli avatar,
    il fatto che nessuno avesse detto che cosa il titolare *smette* di approvare, e quattro parole diverse usate per lo
    stesso oggetto nuovo.
  - Il verdetto e i punti ciechi si scrivono in `PROSSIMA-SESSIONE.md` accanto alla decisione, marcati **da confermare**
    finché l'utente non risponde.
- Le regole UX e i brief precedenti sono stati eliminati su richiesta dell'utente (2026-09-03).
- Lingua dei documenti: italiano.
