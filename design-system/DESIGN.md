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
  duration-fast: 150ms
  duration-base: 250ms
  duration-medium: 350ms
  duration-slow: 400ms
  duration-slower: 500ms
  ease: "cubic-bezier(.22, 1, .36, 1)"
  ease-spring: "cubic-bezier(.34, 1.36, .64, 1)"
  distance: "4 / 8 / 16px"
  blur: "2 / 8px"
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
| Verde | `#B8FC64` (profondo `#A8E65D`) | CTA, card attività, agenda, badge in crescita, Facebook |
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
| pillola | 400 · 15/20 | Tutti · Cliente caldo (con icona fiamma `i-flame`) |
| ruolo | 400 · 13/18 · `#9A9A9A` | Direttrice marketing, Bianchi & Co. |
| etichetta | 400 · 11/14 · `#9A9A9A` | Fonte · Stato · 14:15 |

## Impaginazione (Layout)

- **Console** (1224×912 nella cornice): logo a 34/44; barra agenda a 102/28 larga 960; riga
  WORKSPACE a 118; rail a sinistra (26px) da 260 in giù; sezioni a 232 e 546; card a 302 e 616;
  pannello di chiamata + Riepilogo sovrapposto a destra da 436 (largo 330).
- **Card lead**: 4 per riga, 260×204, gap 16. **Card attività**: 3 per riga, 336×262.
- **Mobile**: cornice 300×620 (bezel nero, raggio 52); barra di stato "9:41" con `i-signal`,
  `i-wifi` e batteria; navigazione in
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
- **Pillola filtro** 44: bordo `.14`, trasparente; "Tutti" bianca. Dove l'originale usa un'emoji
  ("Cliente caldo", "Urgenti") DGT usa l'icona SVG a tratto `i-flame` 16 prima del testo: niente emoji.
- **Barra agenda**: pillola bianca 64 → titolo, pillola calendario con cerchio grigio, timeline
  lime 52 con eventi bianchi (coppia di avatar, durata, freccia), separatori, orari, segmento in
  corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale.
- **WORKSPACE**: cerchio indietro, titolo con la O sostituita dal marchio lime, "Nuova attività"
  bianca con cerchio grigio `i-plus`, tre numeri 48/300 con etichetta 19px grigia e badge lime con
  freccia su / rosa con freccia giù.
- **Card lead**: avatar 48, nome 26/30, ruolo 13/18, "Fonte" con pillole `#3A3A3A`, etichetta di
  interesse 11/14 (con `i-flame` per "Cliente caldo") + contenitore nero con 5 punti; tutto dentro i
  204 px; il blocco `.more` ("Prossimo passo") compare quando la card è aperta.
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

Sobrio, al servizio del cambio di stato, coerente con pillole e cerchi. Token in `tokens.css`
(`--dgt-t-*`, `--dgt-ease*`, `--dgt-dist-*`, `--dgt-blur-*`, `--dgt-scale-*`); scala presa da
transitions.dev, snippet `t-*` adattati ai token. Regole: si animano solo `transform`, `opacity`,
`filter` e i tratti SVG; le dimensioni cambiano solo su azione dell'utente, con righe di griglia
`0fr → 1fr`, senza spostare i vicini; ogni transizione ha la guardia `prefers-reduced-motion`
(tutto fermo e visibile); senza JavaScript lo specimen è una figura statica.

| Durata | Token | Uso |
|---|---|---|
| 150 ms | `--dgt-t-fast` | scambio di testo, chiusura della modale, spegnimento del badge, hover |
| 250 ms | `--dgt-t-base` | scambio icona, apertura della modale, card che si allarga, scivolata del badge |
| 350 / 400 ms | `--dgt-t-medium` / `--dgt-t-slow` | chiusura / apertura del Riepilogo e della chiamata |
| 500 ms | `--dgt-t-slower` | pop-in di cifre e badge, spunta di conferma, spunte dei nodi |
| 320 ms | `--dgt-t-avatar` | gruppo di avatar |
| 2,4 s · 90 s | `--dgt-t-flow`, `--dgt-t-pulse` · `--dgt-t-marker` | luce sui connettori e respiro delle porte · marcatore della timeline |

Curve: `--dgt-ease` `cubic-bezier(.22,1,.36,1)` per aperture, chiusure e spostamenti; `ease-in-out`
per scambio icona e testo; `--dgt-ease-spring` `(.34,1.36,.64,1)` per pop e rimbalzi (`-digit`
`1.45` per le cifre, `-strong` `3.85` per il ritorno degli avatar); `--dgt-ease-close`
`(.4,0,.2,1)` per lo spegnimento del badge. Distanze 4 / 8 / 16 px, sfocature 2 / 8 px, scale
.96 (modale) e .25 (icona in uscita).

Dove si usa:

- **Numeri e badge** (`.t-digit-group`, `.t-pop`): 34 · 20 · 3, conteggi e "189+" entrano cifra per
  cifra dal basso, sfocati, con scarto 70 ms; i badge seguono da scala .6.
- **Campanella** (`.t-badge`): il punto rosso scivola in diagonale e fa pop; clic per spegnere.
- **Selettore di stato** (`.t-text-swap` + `.t-success-check`): testo che esce in alto ed entra dal
  basso; negli stati di approvazione l'avatar lascia il posto a un cerchio lime con la spunta
  disegnata (fade, rotazione, sfocatura, rimbalzo, tratto).
- **Riepilogo e chiamata** (`.sbody`, `.callwrap`): pannelli che scivolano di 16 px e sfumano mentre
  la riga di griglia si chiude; la freccia del Riepilogo ruota.
- **Videochiamata** (`.modal`): sfondo scuro sfocato e scheda da scala .96; Esc, "×" e sfondo chiudono
  e riaprono il pannello chiamata.
- **Avatar** (`.pair`): sollevamento di 4 px con decadimento .45 sui vicini e ritorno elastico.
- **Filtri e rail** (`.t-icon-swap`): cursori ↔ chiudi nei filtri, più ↔ chiudi nel rail dell'editor;
  nel rail della console lo stato bianco si sposta e l'icona rientra.
- **Card lead e attività** (`.more`): una riga in più ("Prossimo passo", "Note") con la card che
  cresce di 24–28 px; i vicini restano fermi.
- **Timeline**: il marcatore "14:15" percorre il segmento in corso in 90 s e l'ora sale fino a 15:00.
- **Editor a nodi**: tratto chiaro che scorre sui connettori verdi (14 su 120, ciclo 2,4 s), porte che
  respirano, spunte dei nodi disegnate una dopo l'altra.

Verifica con `tools/motion-check.js` (video, fotogrammi, CLS, moto ridotto).

## Sì e no (Do's and Don'ts)

- Sì: nero, `#1C1C1C`, `#4D4D4D`, lime, bianco. No: altri accenti oltre a verde/blu/rosso.
- Sì: pillole e cerchi. No: angoli vivi, rettangoli con raggio piccolo.
- Sì: Urbanist 300–400 nei titoli, 500 solo per nomi e valori in evidenza. No: bold, condensati.
- Sì: intaglio per ospitare i pulsanti sulle card. No: pulsanti appoggiati sopra la card senza intaglio.
- Sì: avatar con iniziali e icone di DGT. No: foto, logo o marchi del case study originale.
- Sì: icone SVG a tratto dal set `i-*` dello specimen. No: emoji o simboli tipografici al posto
  delle icone, nemmeno dove l'originale li usa.
- Sì: moto su `transform`/`opacity`/`filter` con i token `--dgt-*` e la guardia reduced-motion. No:
  animazioni che spostano il layout, durate fuori scala, moto decorativo continuo fuori dall'editor.
- Sì: contenuti in italiano e inglese della stessa lunghezza visiva (le pillole devono restare su una riga).
