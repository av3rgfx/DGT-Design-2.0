# DGT — System Design

Documento unico del sistema di design di DGT (sistema operativo aziendale per agenti AI).
Raccoglie tutto ciò che serve per progettare e costruire schermate coerenti: fonti, palette,
tipografia, forme, componenti, schermate e strumenti di verifica. Aggiornato al 2026-09-03.

## 1. Che cos'è e da dove viene

Il design di DGT è la **copia fedele** di due riferimenti scelti dall'utente
(`design-system/reference/`). L'utente ha annullato tutte le regole e i brief precedenti
(2026-09-03): non esistono altri vincoli di stile oltre alla fedeltà ai riferimenti.

| Riferimento | Fonte di verità | Che cosa dà al sistema |
|---|---|---|
| Case study "HubSpot CRM — SaaS UX/UI Dashboard" | Originale Behance, galleria 188798347, 22 immagini a 1920 px (lo screenshot allegato era a bassa risoluzione) | Nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio, barra agenda, pannello Riepilogo chiaro, app mobile, UI kit, sfide, processo |
| Interfaccia "AI Agent Battlecard" (editor a nodi) | `design-system/reference/riferimento-02-ui.jpg` | Rail di tessere, titolo con percorso e tag, tab a pillola, canvas puntinato, nodi con riflesso, nodo selezionato verde, connettori luminosi, barra chat |

**Vincolo fisso**: non si copiano logo, foto o marchi di terzi. Marchio DGT al posto del logo,
avatar con iniziali al posto delle foto, icona video di DGT al posto di Google Meet. Contenuti
sintetici, in italiano.

**Niente emoji: solo icone SVG.** Nell'interfaccia e nei documenti non si usano emoji né simboli
tipografici al posto delle icone: ogni segno grafico è un `<symbol id="i-*">` dello specimen, a tratto
1,3–1,8 su griglia 16 (24 per sfide e processo), colore `currentColor`. Le icone aggiunte per questa
regola sono `i-flame` (cliente caldo, urgente), `i-wifi` e `i-signal` (barra di stato dei telefoni);
anche il "+" del rail e della porta libera dell'editor usa `i-plus`. Verifica: la ricerca degli
intervalli Unicode delle emoji (U+1F000–1FAFF, U+2600–27BF, U+2B00–2BFF, U+25A0–25FF, U+FE0F)
nei file `.md`, `.html`, `.css` fuori da `design-system/archive/` deve dare zero risultati.

## 2. Dove sta cosa

| File | Ruolo |
|---|---|
| `design-system/specimen.html` | Lo specimen completo: console WORKSPACE, tre schermate mobile, colori, tipografia, UI kit, sfide, processo, editor a nodi. È anche l'artefatto pubblicato. |
| `design-system/tokens.css` | Tutti i token come custom property `--dgt-*` (colori campionati dagli originali, tipografia, raggi, misure, spazio, moto). |
| `design-system/DESIGN.md` | Descrizione strutturata (frontmatter + sezioni) dei colori, della tipografia, del layout, delle forme e di ogni componente. |
| `design-system/reference/` | I due riferimenti dell'utente e il README che dice cosa se ne copia. |
| `design-system/tools/` | `screenshot.js` (cattura desktop/mobile), `motion-check.js` (video, fotogrammi chiave, CLS e moto ridotto), `fetch-fonts.py` (Urbanist locale per gli ambienti senza Google Fonts), `wcag.py` (utilità di contrasto, non è una regola). |
| `design-system/archive/` | Varianti precedenti (A e B). **Non fanno testo.** |
| `PRODUCT.md`, `CLAUDE.md` | Contesto di prodotto e istruzioni per le sessioni. |
| `PROSSIMA-SESSIONE.md` | Passaggio di consegne: stato, decisioni, come riprendere. |

## 3. Palette

Valori campionati dalle immagini originali a 1920 px.

| Token | Valore | Uso |
|---|---|---|
| `--dgt-black` | `#000000` | sfondo dell'app, navigazione mobile, pulsante video, marcatori |
| `--dgt-page` | `#181818` | sfondo della presentazione |
| `--dgt-card` / `--dgt-card-top` | `#1C1C1C` / `#262626` | card lead sul nero (riflesso verticale) |
| `--dgt-card-2` / `--dgt-card-2-top` | `#2C2C2C` / `#353535` | card sul fondo `#181818` |
| `--dgt-gray-card` | `#4D4D4D` | card attività grigia, sfide, pillole del processo, pulsanti video/mic/audio |
| `--dgt-round` | `#1E1E1E` | pulsanti rotondi scuri |
| `--dgt-pill-src` | `#3A3A3A` | pillole "Fonte" |
| `--dgt-dots-box` | `#141414` | contenitore dei punti di interesse |
| `--dgt-white` | `#FCFCFC` | barra agenda, "Nuova attività", filtro attivo, rail attivo |
| `--dgt-light` / `--dgt-light-card` | `#E0E0E0` / `#F0F0F0` | app mobile chiara e sue card |
| `--dgt-summary` / `--dgt-docs` | `#F4F4F4` / `#E4E4E4` | pannello Riepilogo e card Documenti |
| `--dgt-lime` / `--dgt-lime-deep` | `#B8FC64` / `#A8E65D` | accento: CTA, card attività, agenda, badge in crescita; segmento in corso |
| `--dgt-blue` | `#64FCEC` | secondario |
| `--dgt-red` / `--dgt-hangup` | `#F04848` / `#F15E60` | tag, chiudi chiamata |
| `--dgt-badge-red` / `--dgt-badge-red-ink` | `#F9A3A3` / `#7A1F1F` | badge in calo |
| `--dgt-dot-1…5` | `#FC9498 #FCA464 #FCDC64 #A8FC64 #68FC64` | interesse a 5 livelli (spento `#4A4A4A`) |
| `--dgt-ink` | `#0A0A0A` | testo su lime e su chiaro |
| `--dgt-t2` / `--dgt-t2-light` | `#9A9A9A` / `#6B6B6B` | testo secondario su scuro / su chiaro |
| `--dgt-border` / `--dgt-border-light` | `rgb(255 255 255/.14)` / `rgb(0 0 0/.14)` | bordi di pillole e pulsanti vuoti |

L'editor a nodi ha una palette propria (`--dgt-ed-*`): neri `#0A0A0A…#1A1A1A`, verde `#4FCB58`
con bagliore, nodo selezionato `#2F8F3E → #1C5A22`, rosso `#F05A50`.

## 4. Tipografia

Urbanist (Google Fonts), pesi 300–600. I titoli non sono mai bold.

| Ruolo | Peso · corpo/interlinea | Esempio |
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

## 5. Forme e profondità

- Card: raggio **28** (22 dentro il Riepilogo, 24 su mobile). Tutto il resto: pillole (`9999px`) e cerchi.
- **Intaglio**: blocco del colore di sfondo nell'angolo in alto a destra della card, raggio 28 in
  basso a sinistra, due angoli concavi da 22 px (gradiente radiale). Ospita i pulsanti rotondi da
  48 px con 12 px di respiro. Nell'agenda mobile lo stesso intaglio è in alto a sinistra, attorno alla data.
- Nessuna ombra sulle card: la profondità nasce dal contrasto nero / `#1C1C1C` / `#4D4D4D` / lime /
  bianco e dal riflesso verticale. Ombre solo sul dispositivo (`0 60px 120px rgb(0 0 0/.6)`) e sui
  campioni colore (`0 30px 60px rgb(0 0 0/.45)`).
- Campioni colore: 220×220, raggio 38, bordo 4 px `#565656`, nome in basso a sinistra, hex in basso a destra.

## 6. Componenti

| Componente | Misure e regole |
|---|---|
| Pulsante rotondo | 48 (40, 32); scuro `#1E1E1E`; bianco se attivo; vuoto con bordo `.14`; nero pieno per il video; rosso `#F15E60` per chiudere la chiamata; vetro `rgb(255 255 255/.22)` nella videochiamata |
| Pillola filtro | 44 di altezza, bordo `.14`, trasparente; "Tutti" bianca con testo nero; icona SVG 16 (`i-flame` per "Cliente caldo" e "Urgenti") prima del testo, mai emoji |
| Barra agenda | pillola bianca 64 → titolo 18, pillola calendario con cerchio grigio, timeline lime 52 con eventi bianchi 40 (coppia di avatar, durata, freccia), separatori, orari 14, segmento in corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale 52 |
| Riga WORKSPACE | cerchio indietro 48, titolo 46 con la O sostituita dal marchio lime, "Nuova attività" bianca 52 con cerchio grigio `i-plus`, tre numeri 48/300 con etichetta 19 grigia e badge lime con freccia su (`i-up`) / rosa con freccia giù (`i-dn`) |
| Rail | 4 cerchi 48 a sinistra: elenco (attivo, bianco), organizzazione, chat, calendario |
| Intestazione di sezione | titolo 28, conteggio sottolineato (numero 20 + parola 13), cerchi cerca e filtri 46, pillole filtro |
| Card lead | 260×204 (min-height: cresce di 28 se aperta), r28, `#262626→#1C1C1C`; avatar 48 in alto a sinistra; intaglio con freccia; nome 26/30 a 12 dall'avatar; ruolo 13/18; "Fonte" + pillole `#3A3A3A` 26; etichetta di interesse 11/14 (con `i-flame` 12 se "Cliente caldo") + contenitore nero con 5 punti 13; riga "Prossimo passo" 13/18 nel blocco `.more` |
| Card attività | 336×262, lime / `#4D4D4D` / scura; striscia con avatar 48, nome 15/500, ruolo 12; intaglio con campanella (punto rosso) e freccia; cerchio contornato 64 con icona; titolo 26; riga meta (coppia di avatar, data 500, "alle"); "Stato" 11; selettore a pillola 48 (bianca su lime, nera su grigio/scuro) con avatar, testo e chevron; mail vuota; video nero |
| Videochiamata | 240 di altezza, gradiente grigio-caldo, avatar grande, controlli in vetro + rosso, espandi e chiudi |
| Riepilogo | `#F4F4F4`, r28; cerchio nero con bacchetta, "Riepilogo" 26, freccia vuota; colonna orari 12 con badge rotondi 22 (lime "mi piace", rosa "stella") e linea `#C8C8C8`; card Documenti `#E4E4E4` r22 con intaglio per il download e due miniature 118 (`#D2D2D2`, foglio bianco, etichetta `#A7A7A7`); card Obiettivo con matita, testo 13/19 con parti in 500 (lime su mobile) |
| Mobile | cornice 300×620 (bezel nero, r52), barra di stato "9:41" con `i-signal`, `i-wifi` e batteria, navigazione in basso a pillola nera 64 con quattro cerchi 44 (il primo bianco) e cerchio lime "video" a sinistra; WORKSPACE chiaro `#E0E0E0`; agenda nera con pannello lime, ore 38/300 ("14:00"), eventi bianchi, marcatore nero, blocco tratteggiato; videochiamata con Riepilogo |
| Campione colore | 220×220 r38, bordo 4 `#565656`, cursore con etichetta bianca |
| Card sfida | `#4D4D4D` r30, icona in cerchio contornato 80 (lime), testo 14/20 centrato; una lime |
| Passo del processo | cerchio contornato 64 con icona + pillola `#4D4D4D` 64; il primo lime; frecce tratteggiate |
| Editor a nodi | rail di tessere 44 r14 (attiva verde luminosa), titolo 26 con percorso e tag rosso, tab a pillola, canvas puntinato 18, nodi 96 r18 con riflesso, nodo agente 208×100, nodo selezionato verde con campi, nodo disattivato con cestino, connettori `#4FCB58` con bagliore, mini-mappa, zoom, pillole in basso a destra (ora in lime), barra chat con ID monospazio |

## 7. Moto

Il moto di DGT è sobrio e serve a spiegare un cambio di stato, mai a decorare. Regole fisse:

- Si animano solo `transform`, `opacity`, `filter` e i tratti SVG; le dimensioni cambiano solo su
  azione dell'utente e con righe di griglia `0fr → 1fr`, così nulla intorno si sposta. CLS misurato
  al caricamento: 0,0015, dovuto al ricaricamento del font (identico senza animazioni).
- Ogni transizione ha la guardia `@media (prefers-reduced-motion: reduce)`: con il moto ridotto tutto è
  fermo e visibile (numeri, badge, spunte, marcatore a inizio segmento, connettori senza luce), gli
  stati cambiano all'istante.
- Lo specimen resta una figura statica senza JavaScript: lo script (in fondo a `specimen.html`)
  aggiunge solo classi e attributi; il CSS fa il resto.
- I valori vengono dalla scala di [transitions.dev](https://transitions.dev/) (Jakub Antalík): gli
  snippet ripresi tengono le classi `t-*` e leggono i token `--dgt-*`; si può installare la libreria
  come skill con `npx skills add Jakubantalik/transitions.dev`, non è una dipendenza.

### Token (in `design-system/tokens.css`)

| Token | Valore | Dove |
|---|---|---|
| `--dgt-t-stagger` | 40 ms | scarto tra le spunte dei nodi (×3), ritardo del tratto della spunta (×2) |
| `--dgt-digit-stagger` | 70 ms | scarto tra le cifre; tra i tre numeri il doppio |
| `--dgt-t-fast` | 150 ms | scambio di testo, chiusura della modale, spegnimento del badge, hover |
| `--dgt-t-base` | 250 ms | scambio icona, apertura della modale, ridimensionamento card, scivolata del badge |
| `--dgt-t-medium` | 350 ms | chiusura del Riepilogo e della chiamata |
| `--dgt-t-slow` | 400 ms | apertura del Riepilogo e della chiamata |
| `--dgt-t-slower` | 500 ms | pop-in delle cifre e dei badge, spunta di conferma, spunte dei nodi |
| `--dgt-t-avatar` | 320 ms | sollevamento del gruppo di avatar |
| `--dgt-t-flow` / `--dgt-t-pulse` | 2400 ms | ciclo della luce sui connettori / respiro delle porte |
| `--dgt-t-marker` | 90 s | corsa del marcatore "14:15" fino a fine segmento (l'ora sale fino a 15:00) |
| `--dgt-ease` | `cubic-bezier(.22,1,.36,1)` | curva di base: aperture, chiusure, spostamenti, tratti |
| `--dgt-ease-in-out` | `ease-in-out` | scambio icona e testo, respiro delle porte |
| `--dgt-ease-close` | `cubic-bezier(.4,0,.2,1)` | spegnimento del badge |
| `--dgt-ease-spring` / `-digit` / `-strong` | `(.34,1.36,.64,1)` / `(.34,1.45,.64,1)` / `(.34,3.85,.64,1)` | pop del badge e rimbalzo della spunta / pop-in delle cifre / ritorno degli avatar |
| `--dgt-dist-micro` / `-base` / `-panel` | 4 / 8 / 16 px | scambio di testo / cifre, badge, spunta / corsa dei pannelli |
| `--dgt-blur-sm` / `--dgt-blur-lg` | 2 / 8 px | sfocatura di transito / sfocatura iniziale della spunta |
| `--dgt-scale-modal` / `--dgt-scale-icon` | .96 / .25 | modale / icona in uscita |

### Transizioni e dove si usano

| Transizione | Innesco | Che cosa si muove | Durata · curva | Origine |
|---|---|---|---|---|
| Pop-in dei numeri (`.t-digit-group`) | la console entra nel viewport | ogni cifra di 34 · 20 · 3, "7 Lead", "16 Attività", "189+" sale di 8 px da sfocata a nitida, con scarto per cifra e per numero | 500 ms · spring-digit | transitions.dev 02 |
| Pop-in dei badge (`.t-pop`) | dopo le cifre | badge in crescita/calo da scala .6 e sfocati | 500 ms · spring | DGT (stessa scala) |
| Badge di notifica (`.t-badge`) | comparsa; clic sulla campanella lo spegne e riaccende | il punto rosso scivola in diagonale (8 px) e fa pop; il pulsante non si muove | 250 ms scivolata · 500 ms pop · 150 ms spegnimento | transitions.dev 03 |
| Scambio di testo (`.t-text-swap`) | clic sul selettore di stato | il testo esce verso l'alto sfocato, il nuovo entra dal basso: "Chiamata fissata → In corso → Approvata" | 150 ms · in-out | transitions.dev 04 |
| Spunta di conferma (`.t-success-check`) | stato di approvazione (`Approvata`, `Confermata`) | l'avatar sfuma, un cerchio lime con la spunta si accende: fade, rotazione da 80°, sfocatura, rimbalzo 8 px e tratto disegnato (dasharray 16) | 500 ms · ease + spring | transitions.dev 10 |
| Riepilogo richiudibile (`.sbody`) | freccia in alto a destra del Riepilogo | il corpo scivola di 16 px, sfuma e si sfoca mentre la riga di griglia va a 0; la freccia ruota di 180° | 400 ms apertura · 350 ms chiusura | transitions.dev 07 |
| Chiamata richiudibile (`.callwrap`) | "×" della chiamata | stesso pannello: il Riepilogo risale con la riga di griglia | 400 / 350 ms | transitions.dev 07 |
| Videochiamata a schermo intero (`.modal`) | espandi nella chiamata, pulsante video delle card attività | sfondo scuro sfocato, scheda da scala .96 a 1; chiusura più rapida, che riapre il pannello chiamata; Esc e sfondo chiudono | 250 ms apertura · 150 ms chiusura | transitions.dev 06 |
| Gruppo di avatar (`.pair`) | puntatore su un avatar | l'avatar si solleva di 4 px e cresce a 1.05, i vicini seguono con decadimento .45; ritorno elastico | 320 ms · ease / spring-strong | transitions.dev 11 |
| Scambio icona (`.t-icon-swap`) | clic su "filtri" e sul "+" del rail dell'editor | due icone nella stessa cella: quella in uscita scende a scala .25 sfocata, l'altra sale | 250 ms · in-out | transitions.dev 09 |
| Rail della console | clic su un cerchio | lo stato bianco passa al cerchio scelto e l'icona rientra con lo stesso scambio | 250 ms | DGT |
| Card che si allarga (`.more`) | clic sulla card lead o sul corpo della card attività | una riga in più ("Prossimo passo", "Note") con riga di griglia 0fr → 1fr e opacità; i vicini non si spostano | 250 ms · ease | transitions.dev 01/21 (riga di griglia) |
| Marcatore della timeline (`.tl .now`) | la console entra nel viewport | il marcatore "14:15" percorre il segmento in corso da sinistra a destra e l'ora sale di un minuto ogni 2 s fino a 15:00 | 90 s · lineare | DGT |
| Connettori dell'editor (`.edges .flow`) | sempre | sopra ai connettori verdi scorre un tratto chiaro (14 su 120) con bagliore; le porte respirano da 6 a 16 px di alone | 2,4 s · lineare / in-out | DGT |
| Spunte dei nodi (`.node .ok`) | l'editor entra nel viewport | il tratto di ogni spunta si disegna, una dopo l'altra | 500 ms · ease, scarto 120 ms | DGT (stesso tratto della spunta) |
| Stati hover | puntatore | bordo dei cerchi e delle pillole a `.32`, tessere dell'editor a `.14` | 150 ms | DGT |

Verifica: `design-system/tools/motion-check.js` registra un video, salva i fotogrammi chiave di ogni
transizione, misura il CLS e ripete il giro con `prefers-reduced-motion`.

## 8. Schermate

1. **Console WORKSPACE** (1224×912 nella cornice): logo a 34/44; barra agenda a 102/28 larga 960;
   riga WORKSPACE a 118; rail da 260; sezioni a 232 e 546; card a 302 e 616; videochiamata +
   Riepilogo sovrapposti a destra da 436 (largo 330).
2. **App mobile**: WORKSPACE chiaro · Agenda del giorno · Videochiamata.
3. **Presentazione**: contenitore 1300, etichette "(01) …" in `#BDBDBD` 14, titoli a due colonne
   (h2 56/60 + paragrafo 24/32), sezioni con padding 64, chiusura "Non perderti il prossimo passo" 88.

## 9. Come si usa

- Importare `design-system/tokens.css` e usare le custom property `--dgt-*`.
- Le classi dello specimen sono il riferimento di implementazione: `.rb` (pulsante rotondo, varianti
  `.sm .xs .ghost .white .lime .black .red .glass`), `.pill` (`.on .white .lime .gray .dark`),
  `.chip`, `.dots` (`.l2 .l4 .l5 .light`), `.badge.up/.down`, `.ncard` + `.nt` (card con intaglio;
  la variabile `--behind` deve valere il colore che sta dietro la card), `.lead`, `.task`
  (`.lime .gray .dark`), `.sched`/`.tl`, `.stats`/`.stat`, `.shead`, `.call`, `.summary`/`.dcard`/`.thumb`,
  `.phone`/`.screen` (`.lightbg .daily .callscr`), `.sw`, `.ch`, `.step`, `.editor`.
- Testi in italiano e inglese devono stare su una riga nelle pillole: scegliere etichette corte.
- Moto: usare i token `--dgt-t-*`/`--dgt-ease*` e le classi della sezione 7 (`.t-digit-group`,
  `.t-badge`, `.t-text-swap`, `.t-success-check`, `.t-icon-swap`, `.more`, `.sbody`, `.callwrap`,
  `.modal`); lo script in fondo allo specimen mostra i ganci (classi e `data-*`) da riprodurre.

## 10. Verifiche fatte

- Screenshot desktop (1440) e mobile (390) con Chromium: nessun overflow orizzontale, font Urbanist
  caricato (300–600), nessun errore in console.
- Confronto visivo sezione per sezione con le immagini originali a 1920 px.
- Differenza voluta: le card delle sfide sono su una griglia regolare invece che sparse attorno al
  titolo, per restare leggibili su mobile.
- Emoji: ricerca degli intervalli Unicode nei file `.md`/`.html`/`.css` fuori dall'archivio = 0.
- Moto (`motion-check.js`, Chromium 1440×1000): video di 18 s, fotogrammi chiave di tutte le
  transizioni, posizioni degli elementi invariate dopo le interazioni, CLS 0,0015 (solo font), nessun
  errore in console; con `prefers-reduced-motion: reduce` zero animazioni attive, tutto visibile.
- Card lead: il contenuto ora sta nei 204 px (prima sbordava di 20 px sotto la card).

## 11. Collegamenti

- Artefatto pubblicato: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- PR #1 (sistema di design copiato dal case study, fusa in `main`): https://github.com/av3rgfx/DGT-Design-2.0/pull/1
- Branch di lavoro: `claude/dgt-emoji-animations-gvkoh9`, PR #2 verso `main` (niente emoji, moto): https://github.com/av3rgfx/DGT-Design-2.0/pull/2
