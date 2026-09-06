---
name: DGT — copia del case study
description: Sistema di design di DGT copiato dal case study originale (nero, lime, Urbanist, card con intaglio) e dall'editor a nodi del secondo riferimento.
colors:
  black: "#000000"
  page: "#181818"
  card: "#1C1C1C"
  card-2: "#2C2C2C"
  gray-card: "#4D4D4D"
  round: "#1E1E1E"
  pill-src: "#3A3A3A"
  white: "#FCFCFC"
  light: "#E0E0E0"
  light-card: "#F0F0F0"
  summary: "#F4F4F4"
  docs: "#E4E4E4"
  lime: "#B8FC64"
  lime-deep: "#A8E65D"
  blue: "#64FCEC"
  red: "#F04848"
  badge-red: "#F9A3A3"
  dot-1: "#FC9498"
  dot-2: "#FCA464"
  dot-3: "#FCDC64"
  dot-4: "#A8FC64"
  dot-5: "#68FC64"
  ink: "#0A0A0A"
  text-2: "#9A9A9A"
typography:
  font: Urbanist
  display: 300 88/88
  h1: 400 56/60
  number: 300 48/56
  title: 400 46/56 uppercase
  section: 400 28/34
  name: 400 26/30
  body: 400 18/24
  pill: 400 15/20
  role: 400 13/18
  label: 400 11/14
rounded:
  card: 28px
  inner: 22px
  swatch: 38px
  pill: 9999px
spacing:
  unit: 4px
  card-pad: 20px
  gap: 16px
  section: 64px
motion:
  ease: cubic-bezier(.22, 1, .36, 1)
  fast: 150ms
  base: 250ms
  medium: 350ms
  slow: 400ms
  slower: 500ms
  stagger: 40ms
  reduced-motion: "tutto fermo e visibile"
components:
  round-button: "48px, cerchio; scuro #1E1E1E su nero, bianco #FCFCFC se attivo, vuoto con bordo .14 se secondario"
  pill-filter: "44px, bordo rgb(255 255 255/.14), trasparente; attivo bianco con testo nero"
  schedule-bar: "pillola bianca 64px con titolo, pillola calendario, timeline lime con eventi bianchi e marcatore nero"
  lead-card: "260×204, r28, #262626→#1C1C1C, avatar 48 in alto a sinistra, intaglio in alto a destra con freccia, Fonte + punti di interesse"
  task-card: "336×262, lime/grigia #4D4D4D/scura, striscia con avatar e nome, intaglio con campanella e freccia, icona cerchiata + titolo, Stato con pillola selettore, mail, video nero"
  summary-panel: "#F4F4F4, r28, cerchio nero con bacchetta, timeline con orari, card Documenti #E4E4E4 e Obiettivo (lime su mobile)"
  swatch: "220×220, r38, bordo 4px #565656, nome in basso a sinistra, hex in basso a destra"
  challenge-card: "#4D4D4D r30, icona in cerchio contornato, testo centrato; una lime"
  process-step: "cerchio contornato con icona + pillola #4D4D4D; la prima lime; frecce tratteggiate"
  node-editor: "riferimento 02: rail di tessere, tab, canvas puntinato, nodi con riflesso, nodo selezionato verde, barra chat"
---

# DGT — sistema di design (copia del case study)

Questo documento descrive la copia **identica** dei due riferimenti in `design-system/reference/`.
Per il primo riferimento la fonte di verità è il case study originale su Behance
(`https://www.behance.net/gallery/188798347/HubSpot-CRM-SaaS-UX-UI-Dashboard-Design`), consultato
alle immagini piene (1920 px) perché lo screenshot allegato era a bassa risoluzione. I colori sono
campionati dagli originali. Non si copiano logo, foto o marchi di terzi: i contenuti sono di DGT,
gli avatar sono iniziali su gradiente.

Specimen: `design-system/specimen.html`. Token: `design-system/tokens.css`.

## Panoramica (Overview)

Fondo nero assoluto per l'app, `#181818` per la presentazione. Un solo accento: il verde lime
`#B8FC64`. Tutto è una **pillola** o un **cerchio**; le card hanno raggio 28 e un **intaglio**
(notch) nell'angolo in alto a destra in cui si appoggiano i pulsanti rotondi. Tipografia Urbanist
leggera e grande: i titoli sono in peso 300–400, mai bold. Le foto del case study sono sostituite
da avatar con iniziali; le icone di terzi da un'icona video di DGT.

## Colori (Colors)

| Ruolo | Valore | Dove |
|---|---|---|
| Nero | `#000000` | sfondo dell'app, barra di navigazione mobile, pulsante video, marcatori |
| Pagina | `#181818` | sfondo della presentazione |
| Card | `#1C1C1C` (riflesso da `#262626`) | card lead sul nero |
| Card 2 | `#2C2C2C` (da `#353535`) | card sul fondo `#181818` |
| Grigio | `#4D4D4D` | card attività grigia, sfide, pillole del processo, pulsanti video/mic/audio |
| Rotondo | `#1E1E1E` | pulsanti rotondi scuri |
| Pillola Fonte | `#3A3A3A` | "Linkedin", "Email", "Modulo web" |
| Bianco | `#FCFCFC` | barra agenda, "Nuova attività", filtro attivo, rail attivo |
| Chiaro | `#E0E0E0` / `#F0F0F0` | app mobile chiara e sue card |
| Riepilogo | `#F4F4F4` / `#E4E4E4` | pannello e card Documenti |
| Verde | `#B8FC64` (profondo `#A8E65D`) | CTA, card attività, agenda, badge ↑, Facebook |
| Blu | `#64FCEC` | secondario, campione |
| Rosso | `#F04848` (chiudi `#F15E60`, badge ↓ `#F9A3A3`) | tag, chiudi chiamata, badge in calo |
| Punti | `#FC9498 #FCA464 #FCDC64 #A8FC64 #68FC64`, spento `#4A4A4A` | interesse a 5 livelli |
| Testo 2 | `#9A9A9A` (su chiaro `#6B6B6B`) | ruoli, etichette, orari |

## Tipografia (Typography)

Urbanist, pesi 300–600 caricato da Google Fonts. Nessun bold nei titoli.

| Ruolo | Peso / corpo | Esempio |
|---|---|---|
| display | 300 · 88/88 | Non perderti |
| h1 | 400 · 56/60 | Agenti AI al lavoro |
| numero | 300 · 48/56 | 34 |
| titolo app | 400 · 46/56 · maiuscolo · tracking .02em | WORKSPACE (la O è il marchio lime) |
| sezione | 400 · 28/34 | Nuovi lead · Riepilogo |
| nome | 400 · 26/30 | Giulia Bianchi · Videochiamata |
| corpo | 400 · 18/24 | La tua agenda · Documenti: |
| pillola | 400 · 15/20 | Tutti · [fiamma] Cliente caldo (icona `i-fire`, niente emoji) |
| ruolo | 400 · 13/18 · `#9A9A9A` | Direttrice marketing, Bianchi & Co. |
| etichetta | 400 · 11/14 · `#9A9A9A` | Fonte · Stato · 14:15 |

## Impaginazione (Layout)

- **Console** (1224×912 nella cornice): logo a 34/44; barra agenda a 102/28 larga 960; riga
  WORKSPACE a 118; rail a sinistra (26px) da 260 in giù; sezioni a 232 e 546; card a 302 e 616;
  pannello di chiamata + Riepilogo sovrapposto a destra da 436 (largo 330).
- **Card lead**: 4 per riga, 260×204, gap 16. **Card attività**: 3 per riga, 336×262.
- **Mobile**: cornice 300×620 (bezel nero, raggio 52); barra di stato "9:41"; navigazione in
  basso come pillola nera con 4 cerchi, il primo bianco; cerchio lime "video" a sinistra.
- **Presentazione**: contenitore 1300, etichette di sezione "(01) …" in `#BDBDBD` 14px, titoli a
  due colonne (h2 56/60 a sinistra, paragrafo 24/32 a destra), sezioni con padding 64.

## Profondità (Elevation & Depth)

Nessuna ombra sulle card: la profondità nasce dal contrasto tra nero, `#1C1C1C`, `#4D4D4D`, lime e
bianco, e dal **riflesso** verticale (`#262626 → #1C1C1C`). Le uniche ombre sono quelle del
dispositivo (`0 60px 120px rgb(0 0 0/.6)`) e dei campioni colore. Il pannello di chiamata è un
gradiente radiale grigio-caldo con pulsanti in vetro (`rgb(255 255 255/.22)`).

## Forme (Shapes)

- Card: raggio 28 (22 dentro il Riepilogo, 24 su mobile).
- **Intaglio**: blocco del colore di sfondo in alto a destra, raggio 28 in basso a sinistra, con
  due angoli concavi da 22px (gradiente radiale). I pulsanti rotondi 48px ci stanno dentro con 12px
  di respiro. Su mobile l'agenda lime ha lo stesso intaglio in alto a sinistra attorno alla data.
- Tutto il resto: pillole (`9999px`) e cerchi.
- Campioni colore: 220×220, raggio 38, bordo 4px `#565656`.

## Componenti (Components)

- **Pulsante rotondo** 48 (40, 32): scuro `#1E1E1E`; bianco se attivo; vuoto con bordo `.14`;
  nero pieno per il video; rosso `#F15E60` per chiudere la chiamata; vetro nella chiamata.
- **Pillola filtro** 44: bordo `.14`, trasparente; "Tutti" bianca. L'icona fiamma `i-fire` nel testo (niente emoji, regola
  dal 2026-09-04) come nell'originale.
- **Barra agenda**: pillola bianca 64 → titolo, pillola calendario con cerchio grigio, timeline
  lime 52 con eventi bianchi (coppia di avatar, durata, freccia), separatori, orari, segmento in
  corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale.
- **WORKSPACE**: cerchio indietro, titolo con la O sostituita dal marchio lime, "Nuova attività"
  bianca con cerchio grigio "+", tre numeri 48/300 con etichetta 19px grigia e badge ↑ lime / ↓ rosa.
- **Card lead**: avatar 48, nome 26, ruolo 13, "Fonte" con pillole `#3A3A3A`, etichetta di
  interesse + contenitore nero con 5 punti.
- **Card attività**: striscia avatar 48 + nome 15/500 + ruolo 12; intaglio con campanella (punto
  rosso) e freccia; cerchio contornato 64 con icona; titolo 26; riga meta (coppia di avatar, data
  in 500, "alle"); "Stato" 11; selettore a pillola 48 (bianca su lime, nera su grigio/scuro) con
  avatar, testo e chevron; mail vuota; video nero.
- **Riepilogo**: `#F4F4F4`, cerchio nero con bacchetta, "Riepilogo" 26, freccia vuota; colonna
  orari con badge rotondi (lime "mi piace", rosa "stella") e linea verticale; card Documenti con
  intaglio per il download e due miniature (`#D2D2D2`, foglio bianco, etichetta `#A7A7A7`); card
  Obiettivo con matita, testo 13/19 con parti in 500.
- **Chiamata**: gradiente grigio, avatar grande, controlli in vetro + rosso.
- **Mobile**: WORKSPACE chiaro; agenda nera con pannello lime, ore 38/300 ("14:00"), eventi bianchi,
  marcatore nero, blocco tratteggiato; videochiamata con Riepilogo (Obiettivo lime).
- **Kit**: stessi componenti ingranditi (pillole 68, cerchi 68–88, card lead 490) e conteggio
  "189+ componenti" in lime 88px.
- **Sfide**: card `#4D4D4D` r30 con icona in cerchio contornato lime e testo centrato; una lime.
- **Processo**: cerchio contornato + pillola `#4D4D4D`; la prima lime; frecce tratteggiate.
- **Editor a nodi** (riferimento 02): invariato — rail di tessere 44 r14 con tessera attiva verde
  luminosa, titolo 26 con percorso e tag rosso, tab a pillola, canvas puntinato 18px, nodi 96 r18
  con riflesso, nodo agente 208×100, nodo selezionato verde `#2F8F3E→#1C5A22` con campi, nodo
  disattivato con cestino, connettori `#4FCB58` con bagliore, mini-mappa, zoom, pillole in basso a
  destra (l'ora in lime), barra chat con ID monospazio.

## Moto (Motion)

Lo specimen si muove poco e sempre allo stesso modo: la sezione «MOTO» del suo CSS (`specimen.html`, dopo i componenti) e lo
script in fondo alla pagina. **Lo script mette solo classi e attributi, il CSS fa il resto**; senza script la pagina resta una
figura statica (gli stati iniziali nascosti valgono solo con la classe `js` sulla radice). Le classi `t-*` riprendono nove
snippet di transitions.dev con i token di DGT; il resto è CSS sulla stessa scala. In `tokens.css` stanno solo `--dgt-ease`,
`--dgt-t-fast` e `--dgt-t-base`: la scala completa è dichiarata nel `:root` dello specimen.

| Token | Valore | Dove |
|---|---|---|
| `--dgt-t-fast` | 150 ms | hover di cerchi e pillole, scambio di testo, badge che si spegne, videochiamata che si chiude |
| `--dgt-t-base` | 250 ms | badge che compare, scambio icona, card che si allargano, videochiamata che si apre |
| `--dgt-t-medium` | 350 ms | Riepilogo e chiamata che si richiudono (le righe della griglia), la freccia che ruota |
| `--dgt-t-slow` | 400 ms | il contenuto del pannello che scivola e sfuma quando si riapre |
| `--dgt-t-slower` | 500 ms | pop-in di cifre e badge, spunta di conferma, spunte dei nodi |
| `--dgt-t-avatar` | 320 ms | il gruppo di avatar che si solleva |
| `--dgt-t-stagger` | 40 ms | scarto fra passi: la spunta si disegna dopo 2 scarti, le spunte dei nodi a 3 scarti l'una dall'altra |
| `--dgt-digit-stagger` | 70 ms | scarto fra le cifre di un numero, 2 scarti in più per ogni numero della riga, il badge a 3 |
| `--dgt-t-flow`, `--dgt-t-pulse` | 2400 ms | il flusso lungo i connettori e il respiro delle porte dell'editor a nodi |
| `--dgt-t-marker` | 90 000 ms | il marcatore «14:15» che attraversa la timeline fino a «15:00» |
| `--dgt-ease` | `cubic-bezier(.22,1,.36,1)` | quasi tutto: partenza decisa, arrivo morbido |
| `--dgt-ease-in-out` | `ease-in-out` | scambi di testo e di icona, respiro delle porte |
| `--dgt-ease-close` | `cubic-bezier(.4,0,.2,1)` | il badge che si spegne |
| `--dgt-ease-spring`, `-spring-digit`, `-spring-strong` | `cubic-bezier(.34,1.36,.64,1)`, `(.34,1.45,.64,1)`, `(.34,3.85,.64,1)` | rimbalzo di badge e spunta, delle cifre, degli avatar che tornano a posto |
| distanze | micro 4, base 8, pannello 16 px | di quanto si sposta ciò che entra o esce |
| sfocatura | piccola 2 px, grande 8 px | ciò che entra parte sfocato |
| scala | videochiamata .96, icona .25, badge .6 | da dove parte ciò che si apre |

Che cosa si muove, nell'ordine dello specimen:

1. **Cifre e badge (pop-in).** Ogni cifra dei numeri (WORKSPACE, conteggi delle sezioni, «189+») è uno span che entra da 8 px
   sotto, sfocato, con la molla delle cifre in 500 ms; le cifre si susseguono a 70 ms, ogni numero della riga parte 140 ms dopo
   il precedente; il badge ↑/↓ scala da .6 con la molla dopo tre scarti. Parte quando la console entra nello schermo (un quinto
   visibile).
2. **Badge sulla campanella.** Il punto rosso arriva da in basso a sinistra (−8, +12 px) in 250 ms; al clic si spegne scalando
   a zero, sfocato, in 150 ms con l'easing di chiusura, e si riaccende con la molla.
3. **Scambio di testo nel selettore di stato.** Il testo esce verso l'alto di 4 px sfocandosi (150 ms, ease-in-out) e il nuovo
   entra dal basso; gli stati che confermano mostrano la spunta.
4. **Spunta di conferma.** L'avatar del selettore sfuma e al suo posto il cerchio lime con la spunta: ruota da 80°, da sfocata
   (8 px) a nitida, sale di 8 px con la molla, e il segno si disegna (tratto da 16 a 0) dopo due scarti; tutto in 500 ms.
5. **Riepilogo e chiamata richiudibili.** La freccia in alto a destra chiude e riapre il pannello: le righe della griglia
   passano da `1fr` a `0fr` in 350 ms, il contenuto sale di 16 px sfumando e sfocandosi (350 ms a chiudere, 400 ms a
   riaprire); la stessa cosa per il pannello della chiamata, che si richiude con la X.
6. **Videochiamata a schermo intero.** Dal cerchio nero del video o dall'espandi della chiamata: il fondo nero al 62 % con
   sfocatura 6 sfuma in 250 ms, la finestra scala da .96 a 1 nello stesso tempo; si chiude in 150 ms, anche con Esc.
7. **Gruppo di avatar.** L'avatar sotto il puntatore si solleva di 4 px e scala 1,05, i vicini seguono con decadimento
   (.45 per ogni posto di distanza), in 320 ms; all'uscita tutti tornano giù con la molla forte.
8. **Scambio icona nei filtri e nel rail.** Le due icone stanno sovrapposte: quella che esce scala a .25 sfocandosi, quella che
   entra fa il contrario, 250 ms ease-in-out; nel rail il cerchio cliccato diventa bianco e la sua icona rientra.
9. **Card che si allargano.** Un clic sulla card lead o sul corpo della card attività apre una riga in più (`0fr` → `1fr`
   in 250 ms, con il testo che sfuma).
10. **Marcatore della timeline.** «14:15» attraversa la barra fino alla fine in 90 secondi lineari, e l'ora sale di un minuto
    ogni due secondi fino a «15:00».
11. **Editor a nodi.** Il flusso lungo i connettori (tratteggio 14 su 120, 2,4 s lineari, all'infinito), il respiro delle porte
    (ombra da 6 a 16 px, 2,4 s avanti e indietro), le spunte dei nodi che si disegnano all'ingresso (500 ms, tre scarti per
    nodo).

Hover: cerchi, pillole, tessere del rail, selettori e filtri cambiano solo fondo, colore e bordo in 150 ms; al passaggio il bordo
sale a `.32`. Niente si muove da solo a parte il marcatore, il flusso e il respiro delle porte; le forme, i colori e
l'impaginazione non cambiano mai durante un moto (le due griglie che si richiudono spostano solo ciò che sta sotto).

**Con `prefers-reduced-motion: reduce` tutto è fermo e tutto è visibile**: animazioni e transizioni spente (`!important`), la
spunta e i tratti disegnati, il flusso dei connettori nascosto, gli avatar a riposo; lo script lo rispetta a sua volta (i badge
restano accesi, il marcatore non avanza, il testo cambia senza scambio, i numeri compaiono subito). Le schermate della
direzione A (`schermate/direzioni/`) non usano ancora questi moti: lì si muovono solo gli avatar (regola 19 di
`SYSTEM-DESIGN.md`) e gli screenshot si fanno con il moto ridotto.

## Sì e no (Do's and Don'ts)

- Sì: nero, `#1C1C1C`, `#4D4D4D`, lime, bianco. No: altri accenti oltre a verde/blu/rosso.
- Sì: pillole e cerchi. No: angoli vivi, rettangoli con raggio piccolo.
- Sì: Urbanist 300–400 nei titoli, 500 solo per nomi e valori in evidenza. No: bold, condensati.
- Sì: intaglio per ospitare i pulsanti sulle card. No: pulsanti appoggiati sopra la card senza intaglio.
- Sì: avatar con iniziali e icone di DGT. No: foto, logo o marchi del case study originale.
- Sì: contenuti in italiano e inglese della stessa lunghezza visiva (le pillole devono restare su una riga).
