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

## Overview

Fondo nero assoluto per l'app, `#181818` per la presentazione. Un solo accento: il verde lime
`#B8FC64`. Tutto è una **pillola** o un **cerchio**; le card hanno raggio 28 e un **intaglio**
(notch) nell'angolo in alto a destra in cui si appoggiano i pulsanti rotondi. Tipografia Urbanist
leggera e grande: i titoli sono in peso 300–400, mai bold. Le foto del case study sono sostituite
da avatar con iniziali; le icone di terzi da un'icona video di DGT.

## Colors

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

## Typography

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
| pillola | 400 · 15/20 | Tutti · 🔥 Cliente caldo |
| ruolo | 400 · 13/18 · `#9A9A9A` | Direttrice marketing, Bianchi & Co. |
| etichetta | 400 · 11/14 · `#9A9A9A` | Fonte · Stato · 14:15 |

## Layout

- **Console** (1224×912 nella cornice): logo a 34/44; barra agenda a 102/28 larga 960; riga
  WORKSPACE a 118; rail a sinistra (26px) da 260 in giù; sezioni a 232 e 546; card a 302 e 616;
  pannello di chiamata + Riepilogo sovrapposto a destra da 436 (largo 330).
- **Card lead**: 4 per riga, 260×204, gap 16. **Card attività**: 3 per riga, 336×262.
- **Mobile**: cornice 300×620 (bezel nero, raggio 52); barra di stato "9:41"; navigazione in
  basso come pillola nera con 4 cerchi, il primo bianco; cerchio lime "video" a sinistra.
- **Presentazione**: contenitore 1300, etichette di sezione "(01) …" in `#BDBDBD` 14px, titoli a
  due colonne (h2 56/60 a sinistra, paragrafo 24/32 a destra), sezioni con padding 64.

## Elevation & Depth

Nessuna ombra sulle card: la profondità nasce dal contrasto tra nero, `#1C1C1C`, `#4D4D4D`, lime e
bianco, e dal **riflesso** verticale (`#262626 → #1C1C1C`). Le uniche ombre sono quelle del
dispositivo (`0 60px 120px rgb(0 0 0/.6)`) e dei campioni colore. Il pannello di chiamata è un
gradiente radiale grigio-caldo con pulsanti in vetro (`rgb(255 255 255/.22)`).

## Shapes

- Card: raggio 28 (22 dentro il Riepilogo, 24 su mobile).
- **Intaglio**: blocco del colore di sfondo in alto a destra, raggio 28 in basso a sinistra, con
  due angoli concavi da 22px (gradiente radiale). I pulsanti rotondi 48px ci stanno dentro con 12px
  di respiro. Su mobile l'agenda lime ha lo stesso intaglio in alto a sinistra attorno alla data.
- Tutto il resto: pillole (`9999px`) e cerchi.
- Campioni colore: 220×220, raggio 38, bordo 4px `#565656`.

## Components

- **Pulsante rotondo** 48 (40, 32): scuro `#1E1E1E`; bianco se attivo; vuoto con bordo `.14`;
  nero pieno per il video; rosso `#F15E60` per chiudere la chiamata; vetro nella chiamata.
- **Pillola filtro** 44: bordo `.14`, trasparente; "Tutti" bianca. Emoji 🔥 nel testo come
  nell'originale.
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
- **Mobile**: WORKSPACE chiaro; agenda nera con pannello lime, ore 38/300 ("2 pm"), eventi bianchi,
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

## Do's and Don'ts

- Sì: nero, `#1C1C1C`, `#4D4D4D`, lime, bianco. No: altri accenti oltre a verde/blu/rosso.
- Sì: pillole e cerchi. No: angoli vivi, rettangoli con raggio piccolo.
- Sì: Urbanist 300–400 nei titoli, 500 solo per nomi e valori in evidenza. No: bold, condensati.
- Sì: intaglio per ospitare i pulsanti sulle card. No: pulsanti appoggiati sopra la card senza intaglio.
- Sì: avatar con iniziali e icone di DGT. No: foto, logo o marchi del case study originale.
- Sì: contenuti in italiano e inglese della stessa lunghezza visiva (le pillole devono restare su una riga).
