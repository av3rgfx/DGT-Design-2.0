# Prove cliccate

**Sei** prove con Playwright che aprono le pagine da `file://`, cliccano e verificano il DOM, il modello e la console — **535
verifiche in tutto** (Console 160, mobile 83, Costi 50, Agenda e Chat 56, Workflow 80, Routine 49). Tutte leggono
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
node schermate/direzioni/prove/workflow.js
node schermate/direzioni/prove/routine.js
```

`visibile.js` non è una prova: è il modulo che le sei condividono per asserire che un controllo **si veda**
(`coperti`, `muti`, `copertiMobile`, `riferimentiRotti`).

Si lanciano da qualunque cartella (i percorsi sono relativi al file della prova). Ogni prova stampa `ok` / `KO` per verifica e
finisce con il conteggio; esce con codice 1 se una verifica fallisce.

| Prova | Pagina | Che cosa verifica |
|---|---|---|
| `console.js` | `direzione-a.html` | la tendina del titolare (approva dalla tendina, apre la revisione ed estende, rifiuta con motivo con la conferma vuota segnata in rosso, riduce, apre il Riepilogo, chiude e riapre dalla pillola); la pagina Richieste (un filtro, azzera, «Approva tutte»); l'editor del dipendente (crea dalla card «Aggiungi» con ruolo, dipartimento e tinta, l'anteprima che segue, salva bloccato senza ruolo, modifica dalla matita con Invio, Esc senza salvare); l'esecuzione (pausa e riprendi, interrompi, riprova il passo in errore, avvia la pianificata, nota del titolare dalla barra di scrittura, filtro del log); quaranta (vista compatta, tendina con tutta la coda, pagina Richieste); la barra «Oggi in azienda» e la barra dei passi (versione 16); dalla **versione 17** i controlli delle intestazioni di sezione: nessun cerchio né pillola senza azione nelle 72 intestazioni delle nove pagine a undici e a quaranta, «cerca» in sette sezioni su ventidue, la ricerca che filtra davvero (il conto nel contatore, il fuoco che resta nel campo, Esc che chiude), le pillole che filtrano, le due forme della card dipendente, le tre pillole della «Spesa del mese» che cambiano il periodo; dalla **versione 18** le frecce di riga: nessuna freccia `i-ne` senza azione su tredici pagine, quattro viste e le due taglie (le sole due dichiarate stanno nell'anteprima dell'editor), le 65 liste con più di una riga tutte allineate sulla stessa griglia, la revisione passata del prompt che apre il confronto v6/v7, la lista mista delle consegne che tiene la colonna e lo storico che la perde |
| `mobile.js` | `mobile.html` | gli otto telefoni (numeri, coda, card corrente, Riepilogo con cinque voci); la riga della revisione che apre la schermata «Richiesta» su entrambi i telefoni, le frecce; il rifiuto con motivo (conferma vuota = bordo rosso, poi motivo + Invio); la prova della revisione del soul prompt (differenze per paragrafo e per parola, «Prova su 20 esecuzioni»); le approvazioni dalla card fino allo stato vuoto (fondo del Riepilogo, campanella senza numero, navigazione in basso); `?n=40` (sette in coda, «12» scritto a mano nella campanella per vedere che ci sta, il titolo più lungo). Dalla **versione 17**: il quadro del giorno (le quattro caselle della griglia e le loro parole, la riga dei due numeri grandi che non c'è più perché ripeterebbe «approvate», il conto nel titolo su una riga sola, i conti presi dal modello, le due strade che portano all'Agenda e alla conversazione, `?quadro=0|1|3` con le due forme scartate, nessuna parola tagliata anche a quaranta, e le due misure che dicono quanta card resta sopra la navigazione) e la tab Dipartimenti (l'elenco, il cerchio della navigazione che non è più inerte, il dipartimento che si apre ed è condiviso fra i telefoni, le cinque sezioni con «Da approvare» seconda, approvare davvero da lì, la riga del dipendente che apre la conversazione, il nome lungo che si stringe). A ogni passo nessun `.m-scr` con `scrollWidth > clientWidth` e console pulita; dalla **versione 18** il conto delle frecce inerte sulle otto schermate, a undici e a quaranta (zero) |
| `costi.js` | `direzione-a.html?pagina=costi` | il sesto cerchio del rail; i tre numeri; le quattro sezioni allo stesso totale; le pillole del periodo per sezione (lo scorrimento resta dov'era, i periodi sono indipendenti); i collegamenti da e verso Dipartimento, Dipendente, Richieste, home, Esecuzione; approvare dalla tendina; la vista compatta a 40; gli otto telefoni che caricano |
| `agenda-chat.js` | `direzione-a.html?pagina=agenda`, `?pagina=chat`, `mobile.html` | l'agenda: il quinto cerchio del rail, il cerchio della barra «Oggi in azienda» e la pillola «Sposta»; la barra del giorno (i blocchi in ordine, l'errore rosa, «adesso»), i filtri del giorno, il blocco che apre l'Esecuzione, la settimana e le scadenze. La chat: il quarto cerchio del rail, i cerchi «commenta» delle card, «Commenta» nelle due tendine, la pillola «Scrivi a …» dell'Esecuzione; i fili (non letti prima), il filtro, il filo aperto in fondo, scrivere (il messaggio in fondo al filo e il filo in cima all'elenco), approvare dal filo; la nota scritta nell'Esecuzione che finisce nel log **e** nel filo. Quaranta: le due pagine. Il telefono: le tab Chat e Agenda, il filo che si apre dall'elenco e la scrittura, senza scorrimento laterale |
| `workflow.js` | `direzione-a.html?pagina=workflow`, `?pagina=dipartimento`, `mobile.html?schermata=10` | **versione 20**. Il perimetro delle consegne: le tre pillole del periodo, il titolo che cambia, «oggi» che ritorna esattamente la pagina della versione 19 (2 594 px su Sviluppo), le consegne dei giorni scorsi che sono richieste decise, la pillola «Da rifare», e il cerchio «cerca» che compare da solo quando la lista passa le dodici righe. I workflow: la pillola d'ingresso nell'intestazione (con la pagina Dipartimento che resta a 2 960 px e il rail a sei), l'elenco del dipartimento, il canvas (nodi, connettori, porte, il nodo del titolare senza avatar in tinta), il nodo che si apre con i suoi campi e il canvas che cresce, la firma anticipata che nasce spenta e si accende un workflow alla volta, i tre freni con i loro numeri, zero controlli inerti, quaranta, e la schermata 10 del telefono (i nodi in colonna, nessuno scorrimento laterale, la firma condivisa con la Console). Legge anche il modello: costo uguale alla somma dei passi, nessun passo rotto, almeno due conclusi, nodi = passi + 1 |
| `routine.js` | `direzione-a.html?pagina=routine`, `?pagina=richieste`, `?pagina=consegna` | **versione 22**, le sei conferme. La pillola **«Uscita»** al posto di «Approvata» sulle tre richieste uscite senza il titolare (e il lime che resta la sua firma, mai altro), più la stessa correzione nella pagina della consegna. La **precedenza** fra la clausola di una routine e una regola d'azienda: `contrastoDi` fa 0 a undici e **2 a quaranta**, la pagina li segna in rosa, e ogni richiesta è governata da una regola e una sola (la somma dei quattro conti fa il totale). `g4` **accesa** e il suo conto a zero sulla card. La **pagina delle routine**: l'elenco a tre righe, il rail che resta a sei cerchi, le due strade che ci portano (il nome nello storico e la pillola del Dipartimento), i tre passi dichiarati che dicono di non essere misurati, e la routine senza workflow che dice perché non ce l'ha. L'**intestazione a due righe**: su 24 pagine per due taglie non esce mai dai 1008 px, nessun numero nasce sotto la tendina (erano 4), l'aria resta 64 px e le pagine crescono di 68 |

Attenzione: Playwright scorre da solo per cliccare un elemento fuori dallo schermo, quindi una verifica sullo scorrimento va fatta
con l'elemento già visibile. Le prove girano con `reducedMotion: 'reduce'`, così gli avatar stanno fermi e il DOM è stabile.

## Asserire che un controllo si veda, non solo che esista (2026-09-08, fatto nella versione 21)

Le cinque suite asserivano la **presenza nel DOM** (`conta('…') === 1`) e il **clic**. Non basta: prima di
cliccare, Playwright porta l'elemento al centro del viewport, quindi un controllo coperto da un elemento
`position:fixed` **passa la prova e resta invisibile all'utente**. È successo con la pillola d'ingresso ai
workflow della versione 20 e con le pillole del periodo delle Consegne, tutte e due sotto la tendina del titolare.

Da qui in avanti, per ogni controllo cliccabile nuovo, accanto alla verifica di esistenza va questa:

```js
const visibile = await page.evaluate(sel => {
  const el = document.querySelector(sel); if (!el) return 'assente';
  const r = el.getBoundingClientRect();
  if (r.bottom < 0 || r.top > innerHeight) return 'fuori schermo';
  const sopra = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
  return sopra && el.contains(sopra) ? 'visibile' : 'coperto da .' + ((sopra && sopra.className) || '?');
}, '.shead [data-pagina="workflow"]');
check(visibile === 'visibile', 'la pillola si vede davvero, non solo esiste nel DOM');
```

Va eseguita **allo scroll in cui la pagina si apre** (0) e con la tendina nei suoi stati (`aperta`, `chiusa`):
il badge lime della tendina chiusa è fisso a `top:240px` e copre esattamente la fascia dove cadono le
intestazioni di sezione.

**Come è stato fatto davvero (versione 21).** Lo schizzo qui sopra è il punto di partenza, e nell'uso ha mostrato
due limiti che vale la pena conoscere prima di riscriverlo:

1. **`elementFromPoint` da solo non basta**: ritorna il figlio più profondo, che quasi sempre è l'`svg` dentro il
   controllo, e allora `el.contains(sopra)` è vero anche quando il controllo sta sotto la tendina. `visibile.js`
   confronta invece la **geometria** degli elementi fissi (`.a-tend`, `.a-mini`), che è la domanda vera.
2. **«coperto» e «tagliato» non sono la stessa cosa.** Un controllo che esce dal proprio contenitore è un difetto
   *solo se quel contenitore non scorre*: le strisce di pillole e le file di card sfumano con una maschera e si
   scorrono, ed è disegno. La domanda giusta è «esiste **uno** scorrimento in cui non è coperto?». Senza questa
   distinzione la verifica del telefono ha segnalato tre righe che invece si raggiungono benissimo.

Il conto, prima della cura, su dieci pagine per due taglie e due stati della tendina: **66 controlli coperti** e
**40 in una striscia che non scorreva**. Adesso zero e zero, e le cinque suite lo rifanno a ogni giro.
