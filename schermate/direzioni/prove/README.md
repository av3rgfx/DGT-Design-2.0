# Prove cliccate

Quattro prove con Playwright che aprono le pagine da `file://`, cliccano e verificano il DOM, il modello e la console. Tutte leggono
le stesse variabili d'ambiente:

- `LOCAL_FONT_CSS` — il CSS con Urbanist incorporata (`design-system/tools/fetch-fonts.py`), servito al posto di Google Fonts;
- `PLAYWRIGHT_MODULE` — il modulo Playwright da caricare (`playwright` per il pacchetto globale, con `NODE_PATH`);
- `CHROME_PATH` — l'eseguibile di Chromium (predefinito `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`).

```
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python3 design-system/tools/fetch-fonts.py /percorso/fonts.css
export PLAYWRIGHT_MODULE=playwright NODE_PATH=/opt/node22/lib/node_modules LOCAL_FONT_CSS=/percorso/fonts.css
node schermate/direzioni/prove/console.js
node schermate/direzioni/prove/mobile.js
node schermate/direzioni/prove/costi.js
node schermate/direzioni/prove/agenda-chat.js
```

Si lanciano da qualunque cartella (i percorsi sono relativi al file della prova). Ogni prova stampa `ok` / `KO` per verifica e
finisce con il conteggio; esce con codice 1 se una verifica fallisce.

| Prova | Pagina | Che cosa verifica |
|---|---|---|
| `console.js` | `direzione-a.html` | la tendina del titolare (approva dalla tendina, apre la revisione ed estende, rifiuta con motivo con la conferma vuota segnata in rosso, riduce, apre il Riepilogo, chiude e riapre dalla pillola); la pagina Richieste (un filtro, azzera, «Approva tutte»); l'editor del dipendente (crea dalla card «Aggiungi» con ruolo, dipartimento e tinta, l'anteprima che segue, salva bloccato senza ruolo, modifica dalla matita con Invio, Esc senza salvare); l'esecuzione (pausa e riprendi, interrompi, riprova il passo in errore, avvia la pianificata, nota del titolare dalla barra di scrittura, filtro del log); quaranta (vista compatta, tendina con tutta la coda, pagina Richieste) |
| `mobile.js` | `mobile.html` | i sei telefoni (numeri, coda, card corrente, Riepilogo con cinque voci); la riga della revisione che apre la schermata «Richiesta» su entrambi i telefoni, le frecce; il rifiuto con motivo (conferma vuota = bordo rosso, poi motivo + Invio); la prova della revisione del soul prompt (differenze per paragrafo e per parola, «Prova su 20 esecuzioni»); le approvazioni dalla card fino allo stato vuoto (fondo del Riepilogo, campanella senza numero, navigazione in basso); `?n=40` (sette in coda, «12» scritto a mano nella campanella per vedere che ci sta, il titolo più lungo). A ogni passo nessun `.m-scr` con `scrollWidth > clientWidth` e console pulita |
| `costi.js` | `direzione-a.html?pagina=costi` | il sesto cerchio del rail; i tre numeri; le quattro sezioni allo stesso totale; le pillole del periodo per sezione (lo scorrimento resta dov'era, i periodi sono indipendenti); i collegamenti da e verso Dipartimento, Dipendente, Richieste, home, Esecuzione; approvare dalla tendina; la vista compatta a 40; il telefono che carica |
| `agenda-chat.js` | `direzione-a.html?pagina=agenda`, `?pagina=chat`, `mobile.html` | l'agenda: il quinto cerchio del rail, il cerchio della barra «Oggi in azienda» e la pillola «Sposta»; la barra del giorno (i blocchi in ordine, l'errore rosa, «adesso»), i filtri del giorno, il blocco che apre l'Esecuzione, la settimana e le scadenze. La chat: il quarto cerchio del rail, i cerchi «commenta» delle card, «Commenta» nelle due tendine, la pillola «Scrivi a …» dell'Esecuzione; i fili (non letti prima), il filtro, il filo aperto in fondo, scrivere (il messaggio in fondo al filo e il filo in cima all'elenco), approvare dal filo; la nota scritta nell'Esecuzione che finisce nel log **e** nel filo. Quaranta: le due pagine. Il telefono: le tab Chat e Agenda, il filo che si apre dall'elenco e la scrittura, senza scorrimento laterale |

Attenzione: Playwright scorre da solo per cliccare un elemento fuori dallo schermo, quindi una verifica sullo scorrimento va fatta
con l'elemento già visibile. Le prove girano con `reducedMotion: 'reduce'`, così gli avatar stanno fermi e il DOM è stabile.
