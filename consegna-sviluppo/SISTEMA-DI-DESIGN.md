# Sistema di design

Il sistema di design di DGT, riscritto per chi costruisce il prodotto. Fonti nel repository di design:
`design-system/DESIGN.md`, `design-system/tokens.css`, `SYSTEM-DESIGN.md` (sezioni 1–9), `schermate/componenti.js`,
`schermate/direzioni/comune.js`, `schermate/direzioni/avatar/avatar-dgt.js`, `design-system/reference/README.md`.

Il design di DGT è la **copia fedele** di due riferimenti (cartella `riferimento/` di questo pacchetto):

| Riferimento | Fonte di verità | Che cosa dà al sistema |
|---|---|---|
| Case study «HubSpot CRM — SaaS UX/UI Dashboard» (studio ARTEMIS SOLUTIONS) | Originale Behance, galleria 188798347, 22 immagini a 1920 px (lo screenshot allegato è a bassa risoluzione: i colori sono campionati dagli originali) | Nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio, barra agenda, pannello Riepilogo chiaro, app mobile |
| Interfaccia «AI Agent Battlecard» (editor a nodi, quarn.com) | `riferimento-02-ui.jpg` | Rail di tessere, titolo con percorso e tag, tab a pillola, canvas puntinato, nodi con riflesso, nodo selezionato acceso, connettori luminosi, barra chat |

Vincolo fisso: **non si copiano logo, foto o marchi di terzi**. Marchio DGT al posto del logo, avatar generati per i
dipendenti AI e iniziali per le persone al posto delle foto, icona video di DGT al posto di Google Meet. Contenuti
in italiano.

---

## 1. Token

Nel repository di design i token sono custom property `--dgt-*` (`tokens.css`); nel prodotto le stesse primitive
usano nomi corti dichiarati sulla radice di ogni cornice (`variabili` in `componenti.js`). La tabella dà tutti e due
i nomi dove esistono.

### 1.1 Colori: fondi scuri

| Token | Nel prodotto | Valore | Uso |
|---|---|---|---|
| `--dgt-black` | `--black` | `#000000` | sfondo dell'app, navigazione mobile, pulsante video, marcatori |
| `--dgt-page` | — | `#181818` | sfondo della presentazione (specimen) |
| `--dgt-bezel` | — | `#3A3A3A` | cornice del dispositivo nello specimen |
| `--dgt-card` / `--dgt-card-top` | `--card` / `--card-top` | `#1C1C1C` / `#262626` | card sul nero: riflesso verticale dall'alto (`#262626`) al basso (`#1C1C1C`) |
| `--dgt-card-2` / `--dgt-card-2-top` | — | `#2C2C2C` / `#353535` | card sul fondo `#181818` (specimen) |
| `--dgt-gray-card` | `--gray-card` | `#4D4D4D` | card attività grigia, sfide, pillole del processo, pulsanti video/mic/audio |
| `--dgt-round` | `--round` | `#1E1E1E` | pulsanti rotondi scuri (rail, indietro, campanella) |
| `--dgt-pill-src` | `--pill-src` | `#3A3A3A` | pillole «Fonte» e chip neutri |
| `--dgt-dots-box` | `--dots-box` | `#141414` | contenitore dei punti di interesse; fondo del canvas dei workflow |

### 1.2 Colori: chiari

| Token | Nel prodotto | Valore | Uso |
|---|---|---|---|
| `--dgt-white` | `--white` | `#FCFCFC` | barra agenda, «Nuova attività», filtro attivo, rail attivo, pillole bianche |
| `--dgt-light` / `--dgt-light-card` | `--light` / `--light-card` (solo telefono) | `#E0E0E0` / `#F0F0F0` | app mobile chiara e sue card |
| `--dgt-summary` | `--summary` | `#F4F4F4` | pannello Riepilogo, tendine del titolare, documento del soul prompt |
| `--dgt-docs` | `--docs` | `#E4E4E4` | card Documenti dentro il Riepilogo; fondo dell'avatar |
| `--dgt-thumb-pill` | `--thumb-pill` | `#A7A7A7` | etichetta grigia sulle miniature |

### 1.3 Colori: accenti

| Token | Nel prodotto | Valore | Uso |
|---|---|---|---|
| `--dgt-lime` | `--lime` | `#B8FC64` | l'unico accento: CTA, card attività, agenda, badge in crescita, attenzione del titolare, canvas |
| `--dgt-lime-deep` | `--lime-deep` | `#A8E65D` | segmento in corso nella barra agenda («adesso») |
| `--dgt-blue` | — | `#64FCEC` | secondario (campione dello specimen; non usato nel prodotto) |
| `--dgt-red` | `--red` | `#F04848` | tag, punto rosso della campanella |
| `--dgt-hangup` | `--hangup` | `#F15E60` | chiudi chiamata, pulsanti e pillole «rifiuta» |
| `--dgt-badge-red` / `--dgt-badge-red-ink` | `--badge-red` / `--badge-red-ink` | `#F9A3A3` / `#7A1F1F` | badge in calo, chip «Errore», casella «ferma», limite sfondato (aperto, vedi regola 4) |

### 1.4 Colori: punti di interesse (5 livelli)

| Token | Nel prodotto | Valore |
|---|---|---|
| `--dgt-dot-1` … `--dgt-dot-5` | `--d1` … `--d5` | `#FC9498` `#FCA464` `#FCDC64` `#A8FC64` `#68FC64` |
| `--dgt-dot-off` | `--d-off` | `#4A4A4A` |

Il terzo punto (`#FCDC64`) è anche il giallo del punto di stato «da approvare» degli avatar.

### 1.5 Colori: testo e bordi

| Token | Nel prodotto | Valore | Uso |
|---|---|---|---|
| `--dgt-ink` | `--ink` | `#0A0A0A` | testo su lime e su chiaro; pillole e cerchi neri |
| `--dgt-t2` | `--t2` | `#9A9A9A` | ruoli, etichette, orari su scuro |
| `--dgt-t3` | — | `#6E6E6E` | terziario |
| `--dgt-t2-light` | `--t2-light` | `#6B6B6B` | secondario su chiaro; segmento «Rapido» della ripartizione |
| `--dgt-border` | (in linea) | `rgb(255 255 255/.14)` | bordi di pillole e pulsanti vuoti su scuro (`.16` sui cerchi ghost, `.32` al passaggio) |
| `--dgt-border-light` | (in linea) | `rgb(0 0 0/.14)` | pulsanti vuoti su bianco e lime |
| — | `--behind` | il colore che sta dietro la card | variabile obbligatoria delle card con intaglio: l'intaglio è dipinto con questo colore |

Colori di dettaglio che compaiono nei componenti senza token: `#E8E8E8` (testo dei chip neutri), `#D9D9D9`/`#3A3A3A`
(chip chiaro), `#1A2A05` (testo del badge in crescita), `#D2D2D2` e `#9AA0B0`/`#2E3A5C`/`#4B5CB8` (miniature),
`#C8C8C8` (linea della colonna orari del Riepilogo), `#EDEDED` (pista della barra del giorno dell'Agenda),
`#565656` (bordo dei campioni colore), `#0B0B0B`/`#3F3F3F` (cornice del telefono).

### 1.6 Colori: editor a nodi (secondo riferimento)

Palette propria `--dgt-ed-*`. Nessun file la importa: il canvas del prodotto usa le variabili di `componenti.js`
(fondo `--dots-box`, nodi `--card`, accento `--lime`). Resta come documentazione del riferimento.

| Token | Valore |
|---|---|
| `--dgt-ed-black-0…3` | `#0A0A0A` `#0F0F0F` `#151515` `#1A1A1A` |
| `--dgt-ed-gray-1…4` | `#3A3A3A` `#6B6B6B` `#8E8E8E` `#B5B5B5` |
| `--dgt-ed-white` | `#F5F5F5` |
| `--dgt-ed-green` / `-2` / `-3` | `#B8FC64` / `#9AD84B` / `#5F8A2E` (dopo l'emendamento verde → lime; il riferimento aveva `#4FCB58`) |
| `--dgt-ed-red` | `#F04848` |
| `--dgt-ed-glow` | `rgb(184 252 100/.55)` |
| `--dgt-ed-r-tile` / `-r-panel` / `-r-button` / `-grid` | 18 px / 24 px / 12 px / 18 px |

### 1.7 Tipografia

Famiglia **Urbanist** (Google Fonts), pesi **300–600**. I titoli non sono mai bold: 300–400; 500 solo per nomi e
valori in evidenza; 600 per il logo DGT (tracking `.12em`) e per la barra di stato del telefono. Testo base del
prodotto: `400 15px/20px`.

| Ruolo | Token | Peso · corpo/interlinea | Esempio |
|---|---|---|---|
| display | `--dgt-display` | 300 · 88/88 | «Non perderti» (specimen) |
| h1 | `--dgt-h1` | 400 · 56/60 | titoli di sezione della presentazione |
| numero | `--dgt-number` | 300 · 48/56 | i tre numeri dell'intestazione |
| titolo app | `--dgt-title` | 400 · 46/56 · maiuscolo · tracking `.02em` | NOVA STUDIO (36 px oltre i 12 caratteri) |
| sezione | `--dgt-section` | 400 · 28/34 | «Riepilogo», titoli di sezione |
| nome | `--dgt-name` | 400 · 26/30 | nome nella card, titolo attività |
| corpo | `--dgt-body` | 400 · 18/24 | «Documenti:», etichette dei numeri (19 px grigia) |
| pillola | `--dgt-pill` | 400 · 15/20 | filtri, pulsanti |
| ruolo | `--dgt-role` | 400 · 13/18 · `#9A9A9A` | ruolo, data |
| etichetta | `--dgt-label` | 400 · 11/14 · `#9A9A9A` | «Fonte», «Stato», ora del marcatore |

Altre misure fisse nei componenti del prodotto: titolo di card 24/28 (due righe), chip 12 (11 nelle righe), badge
12/500, titolo del nodo 14/18 con sottotitolo 11/15, etichette dei campi del nodo 10 maiuscole con tracking `.04em`,
bolle della chat 14/20 con ora 11.

### 1.8 Raggi

| Token | Nel prodotto | Valore | Uso |
|---|---|---|---|
| `--dgt-r-card` | `--r-card` | 28 px | card lead, attività, consegna; tendine |
| `--dgt-r-inner` | `--r-inner` | 22 px | card dentro il Riepilogo (`dcard`); canvas dei workflow; bolle della chat |
| — | — | 24 px | card sul telefono; `dcard` del telefono a 20 |
| `--dgt-r-swatch` | — | 38 px | campioni colore (specimen) |
| `--dgt-r-pill` | `--r-pill` | 9999 px | tutto il resto è una pillola o un cerchio |
| — | — | 18 px | nodi del canvas (tessere del riferimento); 44 sul fianco arrotondato del nodo d'innesco |
| — | — | 14 px | miniature, mini-mappa |
| — | — | 52 / 44 px | cornice del telefono (bezel) / suo schermo |

### 1.9 Misure

| Token | Valore | Uso |
|---|---|---|
| `--dgt-round-btn` / `-sm` / `-xs` | 48 / 40 / 32 px | pulsanti rotondi; 44 nella navigazione del telefono; 46 i cerchi delle intestazioni di sezione; 28 le azioni dentro il nodo |
| `--dgt-pill-h` | 44 px | pillole di filtro (40 le `.sm`, 36 e 32 nella barra del canvas) |
| `--dgt-bar-h` | 64 px | barra agenda / «Oggi in azienda» e navigazione del telefono; «Nuova attività» 52 |
| `--dgt-avatar` | 48 px | avatar standard (vedi 4 per le altre taglie) |
| `--dgt-dot` | 13 px | punti di interesse |
| `--dgt-notch-pad` | 12 px | respiro dell'intaglio attorno ai pulsanti |
| `--dgt-lead-w` | 260 px | card lead nello specimen; nel prodotto 249×204 (240 di altezza la card dipendente) |
| `--dgt-task-w` | 336 px | card attività nello specimen; nel prodotto 316 (min 262 di altezza; 294 la card consegna) |

### 1.10 Spaziature

| Token | Valore |
|---|---|
| `--dgt-s-1` … `--dgt-s-16` | 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 · 64 px |
| unità / padding card / gap / sezione (DESIGN.md) | 4 / 20 / 16 / 64 px |
| griglia del canvas | 18 px (aggancio dei nodi e passo 234×216 = 13×18 e 12×18) |

### 1.11 Ombre

Nessuna ombra sulle card: la profondità nasce dal contrasto nero / `#1C1C1C` / `#4D4D4D` / lime / bianco e dal
riflesso verticale.

| Token | Valore | Dove |
|---|---|---|
| `--dgt-shadow-device` | `0 60px 120px rgb(0 0 0/.6)` | il dispositivo nello specimen (`0 40px 80px rgb(0 0 0/.55)` sul telefono del prodotto) |
| `--dgt-shadow-swatch` | `0 30px 60px rgb(0 0 0/.45)` | campioni colore |
| — | `0 30px 80px rgb(0 0 0/.7)` | tendina del titolare |
| — | `0 20px 50px rgb(0 0 0/.6)` | linguetta lime «N da approvare» |
| — | `inset 0 1px 0 rgb(255 255 255/.07), 0 10px 30px rgb(0 0 0/.35)` | nodi del canvas (riflesso e ombra del riferimento) |
| — | `0 0 0 1px lime, 0 0 44px rgb(184 252 100/.28)` | nodo aperto; bagliore delle porte `0 0 10px rgb(184 252 100/.55)`; connettori `drop-shadow(0 0 6px rgb(184 252 100/.55))` |

### 1.12 Moto

In `tokens.css` stanno tre token; la scala completa è dichiarata nel `:root` dello specimen e descritta in
`DESIGN.md`. Nel prodotto oggi si muovono solo gli avatar (un solo `requestAnimationFrame` per pagina) e gli hover
(150 ms); con `prefers-reduced-motion: reduce` tutto è fermo e tutto è visibile.

| Token | Valore | Dove |
|---|---|---|
| `--dgt-ease` | `cubic-bezier(.2,.8,.2,1)` in `tokens.css`; `cubic-bezier(.22,1,.36,1)` nello specimen | quasi tutto: partenza decisa, arrivo morbido |
| `--dgt-t-fast` / `-base` | 150 / 250 ms | hover; badge che compare, scambio icona, card che si allargano |
| `--dgt-t-medium` / `-slow` / `-slower` | 350 / 400 / 500 ms | pannelli che si richiudono; contenuto che scivola; pop-in di cifre e badge |
| `--dgt-t-avatar` / `-stagger` / `-digit-stagger` | 320 / 40 / 70 ms | gruppo di avatar; scarto fra passi; scarto fra cifre |
| `--dgt-t-flow`, `--dgt-t-pulse` | 2400 ms | flusso lungo i connettori e respiro delle porte |
| `--dgt-ease-close`, `-spring`, `-spring-digit`, `-spring-strong` | `cubic-bezier(.4,0,.2,1)`, `(.34,1.36,.64,1)`, `(.34,1.45,.64,1)`, `(.34,3.85,.64,1)` | chiusura; rimbalzi |
| distanze / sfocatura / scala | 4-8-16 px / 2-8 px / .96 .25 .6 | di quanto si sposta, quanto è sfocato, da dove parte ciò che entra |

### 1.13 Tinte degli avatar

Otto tinte, una per dipendente (palette **vivace**, quella del prodotto; le colonne «scura» e «pastello» esistono nel
motore ma non sono usate).

| Id | Nome | Vivace |
|---|---|---|
| `indaco` | Indaco | `#6C6AFF` |
| `corallo` | Corallo | `#FF6A55` |
| `ambra` | Ambra | `#FFB52E` |
| `verdeacqua` | Verdeacqua | `#2BD9B5` |
| `prugna` | Prugna | `#C66CFF` |
| `petrolio` | Petrolio | `#3AB8FF` |
| `bordeaux` | Bordeaux | `#FF5BA6` |
| `neutro` | Grigio | `#9E9E9E` |

Colori del punto di stato dell'avatar: al lavoro `#B8FC64`, da approvare `#FCDC64`, in errore `#F9A3A3`; nessun
punto da libero, pianificato e in pausa.

---

## 2. Inventario dei componenti

### 2.1 Dal riferimento a DGT

| Componente del riferimento | In DGT diventa |
|---|---|
| Barra agenda (pillola bianca, timeline lime con eventi e marcatore) | **Oggi in azienda**: il quadro del giorno con le caselle contate (approvate · al lavoro · ferma · dopo); la stessa forma è la **barra dei passi** dell'Esecuzione e la **barra del giorno** dell'Agenda |
| Riga WORKSPACE (titolo, «Nuova attività», tre numeri con badge) | **Intestazione di pagina**: nome dell'azienda o della pagina in maiuscolo, «Nuovo obiettivo», tre numeri (al lavoro · da approvare · spesi oggi nella home) |
| Card attività (lime / grigia / scura, striscia con avatar, intaglio, pillola «Stato») | **Card esecuzione** e **card richiesta**; lime = c'è un'approvazione in sospeso |
| Card lead (avatar, nome 26, ruolo, «Fonte», punti di interesse) | **Card dipartimento**, **card dipendente**, card delle regole, card del modello |
| Evento dell'agenda (pillola bianca con avatar, durata, freccia) | **Righe** compatte (dipendente, storico, voci, coda) |
| Videochiamata con controlli in vetro e rosso | **Da approvare**: l'anteprima della consegna con apri, commenta, approva (nero/lime), rifiuta (rosso) |
| Riepilogo chiaro (Documenti, Obiettivo) | **Riepilogo di oggi**: consegne, spesa, obiettivo del mese, diario; le tendine chiare del titolare |
| Rail di quattro cerchi | Rail di **sei** cerchi: elenco (home) · organizzazione (Dipartimento) · campanella (Richieste) · chat · calendario (Agenda) · euro (Costi) |
| Pillole filtro con la fiamma | Pillole di sezione che filtrano davvero |
| Editor a nodi | **Canvas del workflow** (vedi 2.4) |

### 2.2 Primitive condivise (`componenti.js`, CSS prefissato `.dirA`)

Le primitive sono le stesse nella Console, sul telefono e nelle pagine degli avatar. Le funzioni sono esposte da
`window.DGT_COMPONENTI`.

| Classe | Che cos'è | Misure | Varianti | Chi la stampa |
|---|---|---|---|---|
| `.rb` | pulsante rotondo | 48, icona 18; `.sm` 40/16; `.xs` 32/14 | `.ghost` (trasparente, bordo `.16`), `.white`, `.lime`, `.black`, `.red` (`#F15E60`), `.glass` (vetro `.22`, blur 6), `.olight` (vuoto su chiaro); `.dot` = punto rosso 8 px in alto a destra | markup diretto |
| `.av` | avatar del dipendente (disco in tinta) o della persona | 48; `.s` 36; `.xs` 28; `.lg` 68; `.xl` 96; 40 nelle righe, 32 nella coda, 26 nelle `.pill.sm` | `.persona` = iniziali su bianco (15/500, 12, 10) | `av(m, e, size, stato, extra, opz)` |
| `.pair` | pila di avatar | sovrapposizione −10 px, anello 2 px del colore del fondo | `.more` = badge «+N» **dopo** la pila (24 px, 11) | `pair(m, ids, size, max)` |
| `.pill` | pillola di filtro e di azione | 44 di altezza, padding 20, testo 15, bordo `.14`, gap 10 | `.on` (bianca, attiva), `.lime`, `.red`, `.ink` (nera), `.olight` (vuota su chiaro), `.sm` (40, 14) | markup diretto |
| `.chip` | chip di stato o di tipo | 26, padding 10, testo 12, icona 11; 24/11 nelle righe e nel selettore | neutro `#3A3A3A`; `.lime`, `.rosa`, `.onlime` (nero `.12` su lime), `.light` (`#D9D9D9`), `.ink` | `chipStato(m, e)`, `chipEsito(r)` |
| `.dots` | i cinque punti di interesse | contenitore 30 su `#141414`, punti 13 | `.l1` … `.l5` accendono i primi N | `dots(livello)` |
| `.badge` | badge di confronto | 20, padding 8, 12/500, icona 10 | `.up` (lime), `.down` (rosa: calo), `.oltre` (rosa: limite sfondato, classe separata), `.flat` (grigio: «=») | `delta(ora, prima, meglioSeSale, fmt)` |
| `.ncard` + `.nt` | card con intaglio | r28; l'intaglio `.nt` in alto a destra, angoli concavi 22 px, dipinto con `--behind` | `.gray`, `.lime` (testo all'inchiostro); `.who` = striscia con avatar, nome 15/500 su due righe e ruolo 12 | markup diretto |
| `.lead` | card a forma di lead: dipartimento, dipendente, regola, modello | 249×204, padding 20; `.dip` 240 di altezza | `.name` 26/30 (`.md` 22/28; `.ruolo` 22/26 su due righe), `.role` 13, `.ico` cerchio 48, `.ft`/`.k`/`.v` piede; `.spenta` (55 %), `.add` (tratteggiata) | markup diretto |
| `.task` | card attività: esecuzione, richiesta, obiettivo, consegna | 316, min 262; `.ico` 64/26; `.tt` 24/28 su due righe; `.meta` 14; `.sel` selettore 48 | `.lime`, `.gray`, `.dark`, `.obj`; `.prog` barra 12; `.next` 12 | markup diretto |
| `.crow` | riga delle voci (passi, casi, strumenti) | 56, griglia 40 / 1fr / 150 / 150 / 120 / 32 | `.nofr` (senza colonna della freccia), `.spenta`, `.add` | markup diretto |
| `.erow` | riga compatta del dipendente | 56, avatar 40, chip 24 | `.lav` (lime), `.add` | markup diretto |
| `.hrow` | riga dello storico delle richieste | 56, griglia 76 / 40 / 1fr / 110 / 132 / 190 / 64 / 32 | `.attesa` (lime), `.nofr` | markup diretto |
| `.qrow` | riga della coda (tendina, telefono) | 48, bianca, avatar 32, 13 | `.on` (lime = richiesta corrente) | markup diretto |
| `.dcard` | card del Riepilogo | r22 su `#E4E4E4`, padding 16, titolo 18/24; intaglio ridotto (angoli 16) | `.thumbs`/`.thumb` (miniature 118, r14), `.goal` 13/19, `.kv` coppie chiave-valore 12 | markup diretto |
| `.ripart` + `.leg` | ripartizione a barra con legenda | 12 di altezza; legenda 12 con dischi 10 | per modello `.rapido` `#6B6B6B` / `.standard` bianco / `.esperto` lime; per blocchi di tempo `.b1` lime / `.b2` bianco / `.b3` grigio; su lime nero / bianco / grigio; `.leg.wrap` | markup diretto |
| `.msg` + `.bub` | bolla della chat | avatar 36; bolla r22 (angolo in basso 8), max 74 %, 14/20, ora 11 | `.dip` (scura, a sinistra), `.io` (bianca, a destra, iniziali), `.sistema` (chip chiaro al centro) | `messaggio(m, e, v)` |

Funzioni di supporto: `iconaTipo` e `nomeTipo` (tipo di richiesta → icona e nome: post `i-mega`, documento `i-doc`,
lista `i-list`, proposta `i-receipt`, revisione `i-bolt`, tetto `i-euro`), `costoRichiesta(r)` («N €» oppure
«+N € per oggi» per la richiesta del tetto), `passiRichiesta(r)` (« · N passi»), `eur(v)` (una cifra decimale con la
virgola, «0 €» per zero: da non stampare su cose non avvenute), `differenze(A, B)` (due colonne di paragrafi:
uguali, cambiati con le parole marcate, tolti in rosa barrati, aggiunti in lime).

### 2.3 Componenti composti (cornice e pagine)

| Componente | Misure e regole |
|---|---|
| **Intestazione di pagina** | cerchio indietro 48, titolo 46 maiuscolo (36 oltre 12 caratteri), pillola «Nuovo…» bianca 52 con cerchio grigio «+», tre numeri 48/300 con etichetta 19 grigia e badge; alta 124, larga 1008, i numeri vanno a capo. Ogni pagina ha i suoi tre numeri (nella Consegna due) |
| **Barra «Oggi in azienda»** | pillola bianca 64 con titolo 18, chip della data, pista lime 52 con le caselle contate (traslucide con filetto `inset 0 0 0 1px rgb(0 0 0/.1)`; «al lavoro» bianca piena con la pila; «ferma» rosa) e cerchio finale 52; niente asse del tempo |
| **Barra dei passi** (Esecuzione) | la stessa barra, ferma nella testata: passi fatti come eventi bianchi 40 con numero in cerchio nero 32 e durata; passo in corso segmento `#A8E65D` con marcatore dell'ora; da fare traslucidi con la stima; errore rosa; pillola finale bianca. Si stringe da sola: conclusi oltre tre contati («+3 fatti»), da fare oltre il primo contati, nomi troncati a 140 px |
| **Barra del giorno** (Agenda) | card bianca r28, titolo 22, data in pillola 44, legenda; pista r26 `#EDEDED` con ore 11 e linee `.07`; blocchi 36 a pillola su corsie (min 3,5 %), lime al lavoro e da approvare, bianco concluso, tratteggiato pianificato, rosa in errore; segno di «adesso» (linea nera, marcatore 22, punto) |
| **Rail** | cerchi 48 a sinistra (x 26, da y 260, gap 12), bianco quello attivo |
| **Intestazione di sezione** | titolo 28, conteggio (numero 20 + parola 13), cerchio «cerca» 46 solo dove la lista può passare le dodici righe (aperto: pillola `rgb(255 255 255/.07)` con filetto `.18`, campo 15 largo 190, cerchio × 32), pillole 44 solo dove filtrano davvero; «griglia» e «righe» scelgono la forma della card dipendente |
| **Tendina «Da approvare»** | fissa a destra, 330 px, `#F4F4F4`, r28 a sinistra, altezza `100vh/--z − 136` (max 764); richiesta corrente e coda; estesa 840 (fino a 980 di altezza) con documento, pager «1 di 4» e le quattro decisioni; la linguetta lime 56 con campanella e numero quando è chiusa |
| **Tendina «Riepilogo di oggi»** | stessa cornice, pillola bianca con bacchetta: cerchio nero con bacchetta, titolo 26, colonna orari 12 con badge rotondi 22 (lime, rosa, nero, bianco) e linea `#C8C8C8`, card Documenti con due miniature 118, card Obiettivo con matita, diario |
| **Tendina «Dipendente»** (editor) | 330, `#F4F4F4`; intaglio con più/matita e titolo 22; anteprima della card; campi a pillola bianca 48 con etichetta 11 maiuscola; dipartimento a pillole 36 (scelta = nera); sei cerchi 36 per l'avatar (scelto con anello nero); riga «Colore»; «Crea dipendente»/«Salva» lime 44 e «Annulla» |
| **Tendina versioni / dossier** | 840, chiara; riga «chi» con avatar 36; due colonne bianche r22 con chip della versione (`ink` corrente, `lime` proposta, `light` altre); paragrafi 14/21 su pillole r10: aggiunti su lime, tolti su rosa barrati, cambiati su grigio `.045` con `mark`; tre `dcard` (Perché, Cosa ci aspettiamo, Rischi); azioni più il campo del motivo (pillola bianca 44, bordo nero a fuoco, rosso se vuoto) |
| **Card revisione di performance** | `ncard.lime` a tutta larghezza, padding 22/24, intaglio con campanella e «apri»; titolo 26/32 entro 38 caratteri per riga; tre colonne 1,25 / 1 / 1 con etichetta 11 maiuscola; evidenze numerate (pillola 22 + frase 14/19); riga «Decisione del titolare»: pillole 48 nera (prova), bianca (applica), vuota (modifiche), rossa (rifiuta) |
| **Card costo** | 316 (517 la card dell'azienda): spesa su limite, ripartizione a pillola 12 per modello con legenda, blocchi di tempo; nell'intaglio un solo pulsante (freccia, o campanella con il punto se oltre il limite, e allora la card è lime) |
| **Fili e conversazione** (Chat) | fili come righe 76 (avatar 52, etichetta 15, ultimo messaggio 12, ora 11, numero da leggere in pillola lime; la riga aperta è bianca); filo aperto in riquadro r28 contornato `.1` con le bolle; consegne come riga bianca 52 con approva nera e rifiuta rossa |
| **Barra di scrittura** | pillola bianca 56 con avatar 36, campo 15, pulsante nero 40 (Esecuzione, Chat, telefono) |
| **Pagina Dipendente** | testata con avatar 96 che segue il puntatore, etichetta 28, «ruolo · dipartimento · in produzione dal», chip, pillole d'azione 40, quattro numeri 48/300 a 30 giorni con badge; documento del soul prompt `#F4F4F4` r28 con intaglio, 17/26; versioni come righe 56 (proposta lime, corrente bianca); tre card modello 236 di altezza; card criterio 517 |
| **Videochiamata** (specimen) | 240 di altezza, gradiente grigio-caldo, avatar grande, controlli in vetro + rosso |
| **Campione colore, card sfida, passo del processo** (specimen) | 220×220 r38 bordo 4 `#565656`; `#4D4D4D` r30 con icona in cerchio contornato 80; cerchio contornato 64 + pillola `#4D4D4D` 64, la prima lime |

### 2.4 Il canvas del workflow (componente condiviso)

Il secondo riferimento portato dentro il prodotto, in `componenti.js`: lo stesso codice e lo stesso CSS servono la
Console (larghezza 1008) e il telefono (278,4, in sola lettura). Due forme, un canvas: **«L'ultima volta»** è una
catena avvenuta disposta su una serpentina (quattro nodi per riga, la riga dispari all'indietro, connettori da un
nodo al seguente); **«La prossima volta»** è un grafo a posizioni libere, righe da sinistra a destra, nodo d'innesco
in testa, prese sui fianchi, archi con l'etichetta del significato.

| Elemento | Classe | Misure e regole |
|---|---|---|
| contenitore | `.wcanvas` (`.comp` componibile, `.trascina`, `.collega`, `.sl` sola lettura) | r22 su `--dots-box`, `overflow:hidden`; altezza calcolata dal nodo più in basso + riserva (78 + 36; 167 se c'è la mappa) + barra 62 |
| griglia | `.grid` | punti `rgb(255 255 255/.14)` ogni 18 px, maschera radiale |
| cornice che si scala | `.wzoom` | 1008 px di larghezza, `transform: translate(pan) scale(zoom)`, zoom 0,6–1,5 |
| nodo | `.wnode` (`.on` aperto, `.tit` titolare, `.tit.att` titolare in attesa, `.inn` innesco, `.mult` selezione multipla, `.presa` trascinabile) | 208 di larghezza, 87 chiuso (96 il passo della serpentina), r18, `--card` con riflesso; `.hd` 33 (icona `.nic` 32 r11, titolo 14/18, sottotitolo 11/15), `.ft` 20 (durata e `.eur`); aperto: orlo lime e `.campi` con `.fl` 20 e `.fv` 32 a una riga (altezza calcolata da `altNodo`); `.azioni-n` cerchi 28 (solo componendo) |
| porte del riferimento | `.wport` (`.off` spenta) + `.wplab` | 10 px lime con bagliore sotto il nodo, etichetta 10/14; spente se il passo non è stato fatto; non si stampano sul nodo aperto |
| prese del grafo | `.wio` (`.usc` uscita, `.ent` entrata) | 11 px sul fianco; l'innesco non ha entrata, il titolare non ha uscita |
| archi | `svg.edges path.arc` (`.att` verso il titolare in attesa, `.off` da fare, `.se`, `.insieme` 3,4 px, `.errore` tratteggio fine, `.scelto` 3,6, `.tira` in trascinamento) + `.presa` | lime 2,2 px con `drop-shadow`; presa invisibile 16 px sul filo |
| etichetta sull'arco | `.warcl` (`.se`, `.errore`) | 20 di altezza, 10, max 150; «poi» non si stampa |
| comandi sull'arco | `.warcz` > `.wplus` («+»), `.wdel` («×», visibile al passaggio) | bersaglio 38×40 sul punto di mezzo |
| tag del contratto | `.wtag` (`.lime`) | pillola 22 sopra il nodo: «aspetta la tua firma», «resta in azienda», «esce senza la tua firma»; non si disegna se il nodo è coperto |
| riga dei conti | `.wsc` con `.chip` (`.vai` = l'unica cliccabile, testo lime) | in alto a sinistra: «N passi · N collegamenti», rami che restano, rami che escono, «il flusso si chiude ad anello», proposta «Riordina» |
| zoom e mappa | `.wzoombar` (cerchi 32 e `.zv`), `.wmini` (200×120 r14, riquadro lime = la vista) | in basso a destra e a sinistra, sopra la barra; la mappa compare solo quando serve (zoom ≠ 1 o canvas più alto di 820); sul telefono non c'è |
| barra | `.wbar` con `.tx` e `.azioni-b` (`.pill.picc` 32) | fondo `rgb(10 10 10/.72)` con blur, fuori dalla cornice che si scala: conto e nome a sinistra, «Riordina» e «Aggiungi» al centro, «Vedi l'esecuzione» a destra |
| tab dei due tempi | `.wtabs .pill` | pillole 40/14 sopra il canvas: «L'ultima volta» · «La prossima volta» |

API: `canvasWorkflow(m, w, sel, ramo, zoom, multi, pan, opz)` con `opz = { soloLettura, vista, barra, chips, mappa }`;
`canvasMisure` (i limiti del disegno), `canvasTuttoDentro` (lo scatto d'ingresso: tutto il grafo nella larghezza
che c'è), `canvasSuNodo` (scala 1 centrata su un nodo), `canvasStringi` (lo spostamento della vista, scritto una
volta sola), `canvasCoperti` (quanti nodi, se aperti, ne coprirebbero un altro); `W_METRICHE = { COL 4, PX 234, PY
216, PAD 36, W 208, H 96, H_CHIUSO 87 }`. Le icone dei nodi: innesco `i-bolt`, titolare `i-hand`, passo per modello
(Rapido `i-bolt`, Standard `i-bot`, Esperto `i-star`).

### 2.5 Le classi dello specimen (riferimento di implementazione)

`.rb` (`.sm .xs .ghost .white .lime .black .red .glass`), `.pill` (`.on .white .lime .gray .dark`), `.chip`, `.dots`
(`.l2 .l4 .l5 .light`), `.badge.up/.down`, `.ncard` + `.nt` (con `--behind`), `.lead`, `.task` (`.lime .gray .dark`),
`.sched`/`.tl` (barra agenda), `.stats`/`.stat` (i tre numeri), `.shead` (intestazione di sezione), `.call`,
`.summary`/`.dcard`/`.thumb`, `.phone`/`.screen` (`.lightbg .daily .callscr`), `.sw` (campione), `.ch` (sfida),
`.step` (processo), `.editor` (editor a nodi). Lo specimen (`specimen.html`) è la pagina che le mostra tutte.

---

## 3. Icone

Lo sprite di DGT (`comune.js`, `DGT_UI.iconeInserisci()` lo mette in pagina; `DGT_UI.ic(id, cls)` stampa
`<svg><use href="#id"/></svg>`). Quarantotto simboli disegnati per DGT, tutti in `currentColor`, tratto 1,3–1,5;
viewBox 16 salvo dove indicato. Nessuna icona di terzi, nessuna emoji.

| Id | Disegno | Significato e uso noto |
|---|---|---|
| `i-mark` | cerchio con punto centrale e due scintille (viewBox 44) | il marchio DGT grande (nello specimen sostituisce la O del titolo) |
| `i-logo` | lo stesso marchio in piccolo (viewBox 32) | il marchio nel logo |
| `i-ne` | freccia verso l'alto a destra | apri, vai alla pagina («Vedi l'esecuzione»); la freccia degli intagli |
| `i-left` | freccia a sinistra | indietro |
| `i-right` | freccia a destra | avanti; freccia di riga |
| `i-plus` | più | aggiungi, «Nuovo…», «+» sul connettore |
| `i-x` | croce | chiudi, rifiuta, togli il collegamento |
| `i-search` | lente | cerca |
| `i-sliders` | tre cursori | filtri (non più in pagina: regola 25) |
| `i-cal` | calendario | Agenda; rail; chip della data |
| `i-bell` | campanella | Richieste; da approvare; «aspetta la tua firma»; riga di sistema nella chat |
| `i-list` | riquadro con righe | elenco (home nel rail); richiesta di tipo «lista» |
| `i-org` | tre cerchi e un più | organizzazione: Dipartimento nel rail |
| `i-chat` | fumetto con tre punti | Chat nel rail |
| `i-chev` | gallone in giù | selettore, campo a tendina |
| `i-chevr` | gallone a destra | gallone del log |
| `i-down` | freccia in giù su una linea | scarica (non più in pagina: regola 25) |
| `i-pen` | matita | modifica; «Modifiche» |
| `i-wand` | bacchetta con scintille | Riepilogo |
| `i-expand` | due frecce opposte | espandi |
| `i-doc` | foglio con righe | documento; richiesta di tipo «documento» |
| `i-star` | stella piena | modello Esperto |
| `i-like` | pollice in su | «mi piace» (badge del Riepilogo) |
| `i-up` | freccia in su (viewBox 10) | badge in crescita; zoom + |
| `i-dn` | freccia in giù (viewBox 10) | badge in calo; zoom − |
| `i-check` | spunta | fatto, approvata |
| `i-clock` | orologio | pianificato, ora |
| `i-code` | parentesi angolari con barra | dipartimento Sviluppo |
| `i-mega` | megafono | dipartimento Marketing; richiesta di tipo «post» |
| `i-hand` | stretta di mano | dipartimento Vendite; il nodo del titolare; «resta in azienda» |
| `i-receipt` | scontrino | dipartimento Amministrazione; richiesta di tipo «proposta» |
| `i-play` | triangolo | al lavoro; avvia |
| `i-pause` | due barre | in pausa; metti in pausa |
| `i-warn` | triangolo con punto esclamativo | errore, avviso, «oltre» |
| `i-grid` | quattro riquadri | vista a griglia; «Riordina» |
| `i-rows` | tre righe | vista a righe; conto dei passi |
| `i-eye` | occhio | apri l'esecuzione (l'«occhio» delle card) |
| `i-euro` | simbolo dell'euro | Costi nel rail; richiesta del tetto |
| `i-bolt` | fulmine | innesco; modello Rapido; revisione; «esce senza la tua firma» |
| `i-bot` | testa di robot con antenna | modello Standard; il nodo passo |
| `i-home` | casa | home |
| `i-gear` | ingranaggio | impostazioni, strumenti |
| `i-sort` | due frecce verticali | ordinamento |
| `i-target` | bersaglio | obiettivo |
| `i-send` | aeroplanino | invio; «Uscita» |
| `i-signal` | quattro barre | barra di stato del telefono |
| `i-wifi` | archi con punto | barra di stato del telefono |
| `i-fire` | fiamma | le pillole «caldo», «urgenti», «da approvare», «in ritardo» |

La mappa dipartimento → icona è `DGT_UI.iconaDip`: `svi` → `i-code`, `mkt` → `i-mega`, `ven` → `i-hand`, `amm` →
`i-receipt`.

---

## 4. Avatar

### 4.1 Che cos'è

L'avatar di un dipendente AI è un **disco piatto nella tinta del dipendente** (una delle otto, tabella 1.13),
che riempie la casella senza volume, luci né orlo, con **due occhi grandi** («lilguy», dal riferimento lilguy.net,
ridisegnati): raggio 0,29–0,34 del corpo, all'altezza del centro, distanti (centri a 0,39–0,43 del raggio), sclera
**sempre bianca** con contorno sottile, pupilla **sempre nera** e grande (0,6–0,7 dell'occhio), tonda o ovale. La
forma della sclera viene dal seme (cerchio, ovale, a gatto inclinato, a ghianda). È deterministico: stesso seme
(il ruolo, o un seme scelto nell'editor), stesso avatar in ogni vista e in ogni sessione. È `aria-hidden`: sta
sempre accanto all'etichetta e al chip di stato, non porta informazione da solo.

Le persone (il titolare) hanno le **iniziali su disco bianco** (`.av.persona`), nessun disco in tinta: il disco in
tinta è un dipendente AI, e il nodo del titolare nel canvas non ne porta uno.

### 4.2 Lo stato

Gli occhi **non** portano lo stato. Lo stato è:

| Dove | Come |
|---|---|
| avatar singolo | un **punto sul bordo della casella**, in basso a destra (raggio 15 su 125, bordo nero di 4 che lo stacca dal disco e dalla card lime): lime al lavoro, giallo `#FCDC64` da approvare, rosa `#F9A3A3` in errore; **nessun punto** da libero, pianificato e in pausa |
| pila di avatar (card dei dipartimenti e degli obiettivi, coppie della barra) | nessun punto (si sovrapporrebbe ai vicini): lo stato è il **gesto** del corpo con squash e stretch — al lavoro un ritmo, da approvare un salto ogni 3,2 s, in errore si sgonfia e si inclina, pianificato un pendolo, da libero il respiro del sonno |
| forme, in tutti e due i casi | in errore la pupilla è una X; da libero l'occhio è chiuso con una palpebra ad arco e la testa fa un lento cenno; da approvare gli occhi crescono del 15 %; al lavoro lo sguardo scandisce |

### 4.3 Il moto

Un solo `requestAnimationFrame` per pagina; respiro, galleggiamento, sguardo (la coppia scivola di poco, la pupilla
si sposta dentro l'occhio), palpebre con easing, fase e periodi dal seme (nessuno in sincrono). Solo gli avatar nel
viewport si aggiornano; con la scheda nascosta si ferma; con `prefers-reduced-motion` posa di riposo.
L'anteprima nell'editor (`.av[data-segue]`) segue il puntatore; l'avatar 96 della pagina Dipendente anche. Si
anima solo dove c'è `[data-anima]`.

### 4.4 Le taglie e le pile

48 di base; 40 nelle righe; 36 nella chat e nella barra di scrittura; 32 nella coda; 28 (`.xs`) nei blocchi
dell'Agenda; 26 nelle pillole piccole; 68 nella richiesta corrente e nella testata dell'Esecuzione; 96 nella pagina
del Dipendente. L'avatar cresce oltre la casella (128 % con il corpo piatto) con la proprietà `scale`, dal centro:
mai con larghezza e altezza in percentuale (regola 23). Nelle pile gli avatar si sovrappongono di 10 px con un
anello di 2 px del colore del fondo; il badge «+N» sta **dopo** la pila, mai sotto.

### 4.5 Il motore e le sue dipendenze

| File | Ruolo |
|---|---|
| `avatar/vendor-avatars/` | il kit di riferimento, verbatim |
| `avatar/avatar-motore.js` | il motore del kit impacchettato (`build-motore.js`): forma, pupilla, sguardo, fotogrammi deterministici dal seme (`AvatarEngine`, `deriveRole`, `HERO_TIME`) |
| `avatar/avatar-dgt.js` | l'involucro con l'API del prodotto (`window.DGT_AVATAR`): sceglie la famiglia, mappa gli stati del prodotto sugli stati del kit (lavoro → working, attesa → alert, errore → error, pianificato → idle, libero → dormant), gestisce i simboli statici e il ticker |
| `avatar/avatar-orbe.js` | la famiglia **orbe**, quella del prodotto (`window.DGT_AVATAR_ORBE`): tinte, palette, finiture, stili degli occhi, segnali di stato, moti continui |

API (`avatar-dgt.js`): `DGT_AVATAR.html(seme, stato, opz)` → markup SVG da mettere dentro `<span class="av">`;
`DGT_AVATAR.anima(radice)` → avvia gli avatar `[data-anima]` dentro la radice; `DGT_AVATAR.semi(ruolo, n)` → n semi
candidati per l'editor; `DGT_AVATAR.statoKit(stato)`; `DGT_AVATAR.usa('orbe'|'kit')` → la famiglia;
`DGT_AVATAR.pelle(nome)` → la pelle dell'orbe quando il corpo non ha tinta.

Aspetto del prodotto, dichiarato una volta per pagina: `DGT_AVATAR.usa('orbe')`, `DGT_AVATAR.pelle('perla')`,
`DGT_AVATAR_ORBE.aspetto({ identita: 'tinta', palette: 'vivace', finitura: 'piatta', occhi: 'lilguy', segnale:
'punto' })`. La funzione `av()` dei componenti passa la tinta del dipendente e, nelle pile, `segnale: 'gesto'`; chi
è in pausa non porta il punto in nessuna vista. Le altre varianti (famiglia «kit» con le silhouette del kit; pelli
perla, grigio, chiaro, alone, disco; occhi del kit; segnale ad anello) restano nel motore per il confronto e **non
sono forme del prodotto**.

---

## 5. Le due superfici

### 5.1 La Console (1440 px)

| Elemento | Misure |
|---|---|
| radice `.a-app` | larga **1440**, min 900 di altezza, fondo nero, testo 15/20; si scala con `zoom` alla larghezza della finestra (`scala()`: `clientWidth / 1440`, salvato in `--z`), in su e in giù; con `zoom` e non `transform`, così le tendine fisse restano al bordo dello schermo |
| logo | «DGT» 22/600 con tracking `.12em`, a x 28 / y 40 |
| barra «Oggi in azienda» `.a-sched` | pillola bianca 64 a x 102 / y 28, fino a 158 dal bordo destro |
| intestazione `.a-head` | a x 102 / y 112, larga **1008**, alta 124: titolo 46 maiuscolo, pillola «Nuovo…» 52, tre numeri 48/300 con etichetta 19 e badge (a capo se non ci stanno) |
| rail `.a-rail` | a x 26 / y 260, sei cerchi 48 con gap 12: elenco · organizzazione · campanella · chat · calendario · euro; bianco quello attivo |
| colonna `.a-main` | margine 300 in alto e 102 a sinistra, larga **1008**, sezioni con gap 40; finisce dove comincia la tendina (x 1110) e non dipende dal suo stato |
| linguetta `.a-mini` | `position:fixed` a destra, y 240, alta 56, lime, r-pillola sul lato sinistro: «N da approvare» con campanella |
| tendina `.a-tend` | `position:fixed` a destra, y 112, larga **330**, `#F4F4F4`, r28 a sinistra, alta `100vh/--z − 136` (max 764), `--behind: --summary`; estesa 840 |
| sezioni | intestazione (titolo 28, conteggio, cerca 46, pillole 44) e contenuto: file di card (4 per riga le card 249 e 316; 3 per riga le card 336 dello specimen) o righe 56; le strisce di pillole e le file di card scorrono con una maschera che sfuma |
| liste | tre griglie a pillola: `.hrow` (storico), `.crow` (voci), `.lrow` (log, r24, alta 48), tutte con la colonna della freccia da 32 in fondo (o `nofr`) |

Le pagine: home, Richieste, Dipartimento, Dipendente, Esecuzione, Consegna, Workflow, Routine, Costi, Agenda, Chat.
Tutte ripetono la cornice: barra in alto, intestazione con i tre numeri, rail, sezioni con intestazione e pillole,
le due tendine del titolare. Due taglie dell'azienda di prova: 11 e 40 dipendenti.

### 5.2 Il telefono

| Elemento | Misure |
|---|---|
| cornice `.m-tel` | **300×620** (la cornice mobile dello specimen): bezel `#0B0B0B` con bordo `#3F3F3F`, r52, padding 10, ombra `0 40px 80px rgb(0 0 0/.55)`; schermo `.m-scr` r44; la pagina che mostra i telefoni li scala al 125 %; le catture del telefono sono a **390 px** di viewport |
| fondi dello schermo | nero (Richiesta, Chat, Agenda, Dipartimenti); chiaro `#E0E0E0` (`.chiara`: Da approvare, come il WORKSPACE del riferimento); `#F4F4F4` (`.rie`: Riepilogo di oggi e stato vuoto) |
| barra di stato `.m-sb` | l'ora dell'azienda 14/600, l'isola nera 84×24, segnale `i-signal`, rete `i-wifi`, batteria |
| riga di navigazione `.m-nav` | in alto: logo DGT 18/600 e le iniziali del titolare 44 sul chiaro; indietro e le frecce della coda 44 sul nero; chip 32 |
| corpo `.m-scroll` | scorre sotto la navigazione, barra nascosta, padding in fondo 96 (150 con la revisione, 200 con il motivo del rifiuto) |
| navigazione in basso `.m-bnav` | a 14 px dai bordi, alta **64**: pillola nera con i **quattro cerchi 44** del rail (elenco, organizzazione, chat, calendario; il primo bianco) e, a fianco, la **campanella lime** con il numero da approvare in badge nero |
| fascia sotto la navigazione `.m-navfondo` | 112 px, nero `.16` con sfocatura 14 e maschera sfumata in alto: il contenuto lime che passa sotto si fa da parte, la campanella resta distinta |
| barra fissa delle azioni `.m-bar` | a 14 px dai bordi, in basso: Approva lime 48 larga, matita, X rossa (con dissolvenza nera `.m-fade`); il rifiuto la trasforma in etichetta 11 maiuscola, campo a pillola bianca 48 e pillole «Rifiuta» rossa / «Annulla»; per la revisione due righe («Prova su 20 esecuzioni» bianca, poi Applica lime, matita, X) |
| card | r24 (la richiesta corrente lime, con striscia avatar 40, intaglio, icona del tipo 48, titolo 20/24, riga «Decidi» con i quattro cerchi 44); `dcard` r20 con intaglio 36; titoli 30/36, numeri 26/300, quadro del giorno 118 px con caselle 40 |

Le schermate: 1 Da approvare (con il quadro del giorno; a coda finita diventa il Riepilogo) · 2 Richiesta (anche la
revisione di performance) · 3 Riepilogo di oggi · 4 Chat · 5 Conversazione · 6 Agenda · 7 Dipartimenti · 8 Dipartimento
· 9 Consegna · 10 Workflow (lo stesso canvas della Console in sola lettura, a «tutto dentro» 0,306 e a scala 1 sul
nodo toccato). Lo stesso modello e le stesse decisioni della Console (`m.decidi`): quello che si decide sul telefono
vale nella Console e viceversa.

---

## 6. Che cosa è vincolante e che cosa no

Il design va copiato **«così com'è»** dai due riferimenti. Questi sono i vincoli visivi che il prodotto deve
rispettare; il modo in cui il repository di design li ha ottenuti in codice non lo è.

### 6.1 Vincoli visivi (da rispettare)

| Vincolo | In breve |
|---|---|
| Palette | i colori delle tabelle 1.1–1.5, campionati dagli originali; nessun altro colore di accento oltre lime, rosa e rosso; le otto tinte degli avatar sono l'unica eccezione |
| Un solo accento | lime = attenzione del titolare (al lavoro, da approvare, la sua firma); rosa = errori e cali (il limite sfondato è una decisione aperta); sul lime il testo è all'inchiostro, mai bianco |
| Emendamento verde → lime | nel canvas a nodi il nodo selezionato e i connettori sono lime, non il verde del riferimento; tutto il resto del canvas (notte, tessere, griglia puntinata, bagliore, porte con l'etichetta, forma dei nodi) resta com'è |
| Tipografia | Urbanist 300–600; titoli 300–400, mai bold; 500 solo per nomi e valori; la scala della tabella 1.7 |
| Forme | tutto è una pillola o un cerchio; card r28 (22 nel Riepilogo, 24 sul telefono, 18 i nodi); l'**intaglio** ospita i pulsanti rotondi, e senza pulsanti non c'è; nessun angolo vivo, nessun raggio piccolo |
| Profondità | nessuna ombra sulle card: contrasto e riflesso verticale; ombre solo su dispositivo, tendine, nodi del canvas e campioni |
| Icone | solo lo sprite di DGT (sezione 3); niente emoji; niente icone, logo, foto o marchi di terzi; i modelli sono livelli neutri (Rapido, Standard, Esperto) |
| Avatar | disco piatto in tinta, occhi lilguy con sclera bianca e pupilla nera, punto di stato sul bordo, gesto nelle pile, iniziali su bianco per le persone; deterministico dal seme; un solo `requestAnimationFrame` per pagina e rispetto di `prefers-reduced-motion` |
| La Console | progettata a 1440 px, riempie sempre lo schermo scalandosi alla larghezza della finestra; le tendine e la linguetta restano al bordo destro; la colonna dei contenuti è 1008 px e nasce fuori dalla banda della tendina; l'intestazione di 124 px con i numeri a capo |
| Il telefono | la cornice mobile dello specimen; navigazione in basso a pillola nera 64 con i quattro cerchi del rail e la campanella lime; fascia sfocata sotto la navigazione; gli stessi componenti e le stesse decisioni della Console |
| Il canvas | il secondo riferimento: griglia puntinata 18, nodi 208 r18 con riflesso, porte con l'etichetta, connettori luminosi, nodo aperto acceso, tab a pillola, mini-mappa e zoom, barra in fondo; un solo componente per Console e telefono, con i gesti spenti in sola lettura |
| Le regole di prodotto | le 48 di `REGOLE-DI-PRODOTTO.md`: quello che ogni schermata deve e non deve fare (controlli veri, frecce con destinazione, numeri onesti, freni cablati…) |
| Testi | italiano; etichette corte, pillole su una riga; le parole del prodotto (consegna, workflow, routine, esecuzione, richiesta, tetto…) sono una per oggetto |

### 6.2 Scelte tecniche del repository di design (non vincolanti)

| Scelta di questo repository | Perché non è un vincolo |
|---|---|
| Funzioni immediate su `window` (`DGT_UI`, `DGT_COMPONENTI`, `DGT_AVATAR`, `DGT_AVATAR_ORBE`, `DGT_DATI`, `DIREZIONE_A`, `DGT_MOBILE`), niente moduli ESM | serviva a far girare le pagine da `file://` senza build; il prodotto sceglie il suo modo di organizzare il codice |
| Tutto gira da `file://` e come file unico (`build-unico.js` incorpora gli script per pubblicare l'artefatto) | vincolo della pubblicazione delle schermate, non del prodotto |
| CSS come stringhe JS prefissate con `prefissa(css, '.dirA')` e messe in pagina con `DGT_UI.stile(id, css)`, variabili dichiarate sulla radice di ogni cornice (`.a-app`, `.m-page`) | un modo di condividere le stesse regole fra Console e telefono senza un bundler; conta la cascata (i componenti prima del CSS della pagina), non il meccanismo |
| Ordine di caricamento: `comune.js`, `componenti.js`, `avatar-motore.js`, `avatar-dgt.js`, `avatar-orbe.js`, `dati.js`, poi la pagina | descrive le dipendenze (i componenti leggono lo sprite; l'avatar è letto quando `av()` viene chiamata, non al caricamento), non il modo di risolverle |
| Lo sprite delle icone e quello degli avatar inseriti nel `body` come `<svg>` nascosti, con `<symbol>` e `<use>` | l'inventario delle icone è vincolante (sezione 3); la tecnica di inclusione no |
| `zoom` CSS sulla radice per riempire lo schermo, con `--z` per dividere i `100vh` | vincolante è il comportamento (la Console riempie lo schermo, le tendine restano al bordo, 1 px del canvas vale `zoom` px di schermo); il prodotto può ottenerlo come vuole purché lo misuri |
| I parametri in query string (`?n=`, `?pagina=`, `?tendina=`, `?schermata=`, `?avatar=`…) | sono gli interruttori delle schermate di studio e dei confronti, non un'API del prodotto |
| Il modello dati sintetico di `dati.js` (Nova Studio, undici e quaranta dipendenti, l'ora fissa) | il modello di dominio è in `MODELLO-DI-DOMINIO.md` e nelle fixture; la fotografia di un giorno e i generatori a 40 sono strumenti di misura |
| Le prove Playwright che misurano pixel sulle pagine statiche e le catture byte per byte | il prodotto dovrà tenere le stesse invarianti (`INVARIANTI-DA-VERIFICARE.md`) con verifiche sue; restano valide due pratiche: ogni controllo cliccabile si asserisce **visibile** e non solo presente, e prove e catture cercano una sezione **dal titolo**, non dalla posizione |
| Le varianti tenute per il confronto (famiglia «kit», pelli dell'orbe, barra a linea del tempo, forme scartate del quadro del giorno) | non sono forme del prodotto |
| Google Fonts come sorgente di Urbanist (`fetch-fonts.py` per gli ambienti senza rete) | il font è vincolante, la sorgente no |
| La lingua del codice (italiano) | scelta di questo repository |
