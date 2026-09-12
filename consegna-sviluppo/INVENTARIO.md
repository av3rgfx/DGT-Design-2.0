# Inventario: che cosa si porta e che cosa resta

File per file, con il peso, se va nel repository del prodotto e in che forma. **I file elencati come "si porta"
sono già copiati in questa cartella**: si prende com'è, 15 MB. Il repository di design pesa 317 MB, di cui 275 MB
di storia git (trentatré versioni di catture rifatte): **non si clona nel prodotto**.

## Si porta

| file, in questo repository | peso | che cos'è | nel prodotto |
|---|---|---|---|
| `design-system/tokens.css` | 5,5 KB | i token: colori, tipografia, raggi, ombre, spaziature | `sistema-di-design/tokens.css`. È **la** sorgente dei colori: non si ricopiano gli esadecimali altrove |
| `schermate/componenti.js` | 85 KB | le primitive applicate: pulsanti rotondi, avatar e pile, pillole, chip, badge, card con intaglio, righe, barra di avanzamento, ripartizione, bolle della chat, il canvas del workflow, e le funzioni che le stampano | `sistema-di-design/componenti.js`. Il CSS dentro è vincolante; il modo in cui è impacchettato (funzione immediata su `window`) no: si riscrive nel formato del prodotto tenendo classi e misure |
| `schermate/direzioni/comune.js` | 13 KB | lo sprite delle 48 icone del sistema (disegnate per DGT: niente emoji, niente librerie di icone) e tre aiutanti (`ic`, `esc`, `prefissa`) | `sistema-di-design/comune.js`. Le icone si portano come sono; gli aiutanti si sostituiscono con quelli dello stack |
| `schermate/direzioni/avatar/avatar-dgt.js` | 11 KB | l'avatar del dipendente: disco in tinta, occhi, punto di stato, animazione con `prefers-reduced-motion` | `sistema-di-design/avatar/`. Vincolante nella forma (regola 19) |
| `schermate/direzioni/avatar/avatar-orbe.js` | 54 KB | la pelle «orbe» dell'avatar (la scelta del titolare fra le famiglie studiate) | idem |
| `schermate/direzioni/avatar/avatar-motore.js` + `build-motore.js` | 59 KB + 2 KB | il motore delle pose, generato da `vendor-avatars` con `build-motore.js` | idem. **Attenzione alla licenza**: il motore è «adattato da bloub (MIT), vedi NOTICE», ma il file NOTICE **non è nel repository**: il prodotto deve aggiungere l'avviso MIT con l'attribuzione prima di distribuire |
| `schermate/direzioni/avatar/vendor-avatars/` | 84 KB | il kit d'origine del motore (core: engine, gaze, generate, math, render, roles, shape, states), a zero dipendenze | `sistema-di-design/avatar/vendor-avatars/`, con la stessa avvertenza sulla licenza |
| `design-system/tools/fetch-fonts.py` | 4 KB | scarica Urbanist da Google Fonts e la incorpora in un CSS | `sistema-di-design/`. Il prodotto sceglierà come servire il font; il file dice quali pesi servono |
| `schermate/direzioni/dati.js` | 79 KB | il modello sintetico: entità, regole di dominio e i loro perché nei commenti | `sistema-di-design/modello-sintetico.js`, **in sola lettura**: è il riferimento leggibile da cui è stato estratto `MODELLO-DI-DOMINIO.md`. Non si esegue e non si estende: il prodotto ha il suo modello |
| `consegna-sviluppo/dati-esempio/azienda-11.json`, `azienda-40.json` | 464 KB, 1,4 MB | lo stesso modello serializzato, senza funzioni: azienda, dipartimenti, dipendenti, dossier, esecuzioni, richieste con l'ordine della coda, regole, tetti, routine, workflow per dipartimento, obiettivi, costi per periodo, agenda, fili della chat, diario | `dati-esempio/`. Fixture per le prove e per popolare un ambiente di sviluppo; **il prodotto deve reggere tutte e due le taglie** |
| `design-system/reference/*.jpg` + `README.md` | 556 KB | i due riferimenti visivi che il design copia «così com'è» | `riferimento/`. **Sono opere di terzi** (un case study Behance e un'interfaccia pubblica): servono a confrontare, non entrano nel prodotto e non si redistribuiscono. Il `README.md` dice che cosa se ne copia e che cosa no |
| 30 catture scelte fra le 84 di `schermate/direzioni/screenshot/` | circa 9 MB | la Console a 1440 px e il telefono a 390 px, a undici e a quaranta: home, Richieste, Dipartimento, Dipendente, Esecuzione, Costi, Agenda, Chat, Workflow, Routine, Impostazioni, Consegna, tendine, barra del giorno | `catture/`. La verità visiva da confrontare, insieme ai due artefatti pubblicati |
| i documenti di questa cartella | 220 KB | gli otto estratti | la radice della cartella |

## Resta qui

| file | perché resta |
|---|---|
| `schermate/direzioni/direzione-a.js` (2 781 righe), `mobile.js` (1 191) | le due superfici del design. Sono la specifica eseguibile, e si guardano **aperte nel browser** (gli artefatti pubblicati) o nelle catture: il prodotto non le porta come codice, perché sono scritte per girare da `file://` su un modello sintetico. Ogni pagina è descritta in `REGOLE-DI-PRODOTTO.md` e `SISTEMA-DI-DESIGN.md` |
| `schermate/direzioni/direzione-b.js`, `direzione-c.js`, `confronto.html`, `scelta-*.html`, `avatar-*.html` | le direzioni scartate e le pagine di studio |
| `design-system/specimen.html` | lo specimen del sistema di design: utile da guardare, superato da `componenti.js` come codice |
| `design-system/archive/` | varianti precedenti, che «non fanno testo» |
| `schermate/direzioni/prove/` (sei suite, 692 verifiche) | misurano pixel su pagine statiche da `file://`. Le **proprietà** che tengono sono in `INVARIANTI-DA-VERIFICARE.md`: il prodotto scrive prove sue |
| `schermate/direzioni/scatta.js`, `build-unico.js`, `costruisci-*.js` | strumenti di questo repository |
| `schermate/direzioni/screenshot/` (144 file, 40 MB) | le 84 catture correnti e 60 archiviate; se ne portano 30 |
| `SYSTEM-DESIGN.md` (919 righe) | sostituito da `REGOLE-DI-PRODOTTO.md` e `SISTEMA-DI-DESIGN.md`, che ne sono l'estratto senza cronaca. Resta la fonte se serve il perché lungo di una regola |
| `schermate/direzioni/DIREZIONI.md` (4 183 righe), `PROSSIMA-SESSIONE.md` (3 609) | la cronaca delle versioni: per chi continua il design |
| `CLAUDE.md`, `PRODUCT.md`, `README.md` | istruzioni e descrizione di questo repository. Il prodotto non eredita nessun file di istruzioni per agenti: il suo punto d'ingresso è `consegna/README.md` e il prompt in `PROMPT-DI-AVVIO.md` |

## Che cosa cambia forma passando

- **Il CSS di `componenti.js` è prefissato con `.dirA`** (la cornice della Console) e le variabili le dichiara ogni
  cornice sulla propria radice: nel prodotto si toglie il prefisso e si dichiarano una volta.
- **Gli identificatori sono in italiano** (`av`, `chipStato`, `costoRichiesta`, `erow`, `hrow`): il prodotto può
  rinominarli; quello che deve restare sono le misure, le classi visive e i significati.
- **Il modello sintetico calcola tutto in memoria** a partire da undici o quaranta dipendenti generati: nel
  prodotto le stesse grandezze (costi per periodo, coda, freno del tetto) diventano letture da un database e da un
  motore di esecuzione veri. `MODELLO-DI-DOMINIO.md` dice per ogni grandezza se è dato o derivato.
