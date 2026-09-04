# DGT — System Design

Documento unico del sistema di design di DGT (sistema operativo aziendale per agenti AI).
Raccoglie tutto ciò che serve per progettare e costruire schermate coerenti: fonti, palette,
tipografia, forme, componenti, schermate e strumenti di verifica. Aggiornato al 2026-09-04.

## 1. Che cos'è e da dove viene

Il design di DGT è la **copia fedele** di due riferimenti scelti dall'utente
(`design-system/reference/`). L'utente ha annullato tutte le regole e i brief precedenti
(2026-09-03): non esistono altri vincoli di stile oltre alla fedeltà ai riferimenti.

| Riferimento | Fonte di verità | Che cosa dà al sistema |
|---|---|---|
| Case study "HubSpot CRM — SaaS UX/UI Dashboard" | Originale Behance, galleria 188798347, 22 immagini a 1920 px (lo screenshot allegato era a bassa risoluzione) | Nero `#000000`/`#181818`, lime `#B8FC64`, Urbanist leggero, pillole e cerchi, card con intaglio, barra agenda, pannello Riepilogo chiaro, app mobile, UI kit, sfide, processo |
| Interfaccia "AI Agent Battlecard" (editor a nodi) | `design-system/reference/riferimento-02-ui.jpg` | Rail di tessere, titolo con percorso e tag, tab a pillola, canvas puntinato, nodi con riflesso, nodo selezionato verde, connettori luminosi, barra chat |

**Vincolo fisso**: non si copiano logo, foto o marchi di terzi. Marchio DGT al posto del logo,
avatar generati per i dipendenti AI e iniziali per le persone al posto delle foto, icona video di
DGT al posto di Google Meet. Contenuti sintetici, in italiano.

## 2. Dove sta cosa

| File | Ruolo |
|---|---|
| `design-system/specimen.html` | Lo specimen completo: console WORKSPACE, tre schermate mobile, colori, tipografia, UI kit, sfide, processo, editor a nodi. È anche l'artefatto pubblicato. |
| `design-system/tokens.css` | Tutti i token come custom property `--dgt-*` (colori campionati dagli originali, tipografia, raggi, misure, spazio, moto). |
| `design-system/DESIGN.md` | Descrizione strutturata (frontmatter + sezioni) dei colori, della tipografia, del layout, delle forme e di ogni componente. |
| `design-system/reference/` | I due riferimenti dell'utente e il README che dice cosa se ne copia. |
| `design-system/tools/` | `screenshot.js` (cattura desktop/mobile), `fetch-fonts.py` (Urbanist locale per gli ambienti senza Google Fonts), `wcag.py` (utilità di contrasto, non è una regola). |
| `design-system/archive/` | Varianti precedenti (A e B). **Non fanno testo.** |
| `schermate/direzioni/` | Prime schermate reali: tre direzioni per la vista principale, prova a 40, direzione scelta (`DIREZIONI.md`). |
| `schermate/direzioni/avatar/` | Avatar dei dipendenti AI: motore del kit (verbatim in `vendor-avatars/`, impacchettato in `avatar-motore.js`) e involucro `avatar-dgt.js` con colori, stati e animazione della Console. |
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
| `--dgt-lime` / `--dgt-lime-deep` | `#B8FC64` / `#A8E65D` | accento: CTA, card attività, agenda, badge ↑; segmento in corso |
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
| pillola | 400 · 15/20 | Tutti · 🔥 Cliente caldo |
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
| Pillola filtro | 44 di altezza, bordo `.14`, trasparente; "Tutti" bianca con testo nero; emoji 🔥 nel testo |
| Barra agenda | pillola bianca 64 → titolo 18, pillola calendario con cerchio grigio, timeline lime 52 con eventi bianchi 40 (coppia di avatar, durata, freccia), separatori, orari 14, segmento in corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale 52 |
| Riga WORKSPACE | cerchio indietro 48, titolo 46 con la O sostituita dal marchio lime, "Nuova attività" bianca 52 con cerchio grigio "+", tre numeri 48/300 con etichetta 19 grigia e badge ↑ lime / ↓ rosa |
| Rail | 4 cerchi 48 a sinistra: elenco (attivo, bianco), organizzazione, chat, calendario |
| Intestazione di sezione | titolo 28, conteggio sottolineato (numero 20 + parola 13), cerchi cerca e filtri 46, pillole filtro |
| Card lead | 260×204, r28, `#262626→#1C1C1C`; avatar 48 in alto a sinistra; intaglio con freccia; nome 26; ruolo 13; "Fonte" + pillole `#3A3A3A` 26; etichetta di interesse + contenitore nero con 5 punti 13 |
| Avatar del dipendente AI | disco 48 (40, 36, 32, 28, 26; 68 nella richiesta corrente) `#E4E4E4`; dentro la forma generata dal seme (ruolo, o seme scelto): corpo `#0A0A0A`, occhi `#FCFCFC`, lime `#B8FC64` per occhi e segni quando serve il titolare (al lavoro, da approvare), rosa `#F9A3A3` per gli occhi a X dell'errore, anelli e archi fuori dal corpo in nero sottile; aria-hidden. Due famiglie: **orbe** (predefinita, da confermare): sfere morbide che respirano, battono le palpebre e seguono lo sguardo, animazioni CSS su tutti gli avatar; **kit**: le silhouette del generatore del kit, statiche tranne le card al lavoro. Le persone (titolare) tengono le iniziali su disco bianco |
| Tendina Dipendente | 330, `#F4F4F4`, r28 a sinistra; intaglio con più/matita e titolo 22; anteprima della card; campi a pillola bianca 48 (Ruolo, Nome facoltativo) con etichetta 11 maiuscola; dipartimento a pillole 36 (scelta = nera); sei cerchi 36 per l'avatar (scelto con anello nero); azioni «Crea dipendente»/«Salva» lime 44 e «Annulla» |
| Card attività | 336×262, lime / `#4D4D4D` / scura; striscia con avatar 48, nome 15/500, ruolo 12; intaglio con campanella (punto rosso) e freccia; cerchio contornato 64 con icona; titolo 26; riga meta (coppia di avatar, data 500, "alle"); "Stato" 11; selettore a pillola 48 (bianca su lime, nera su grigio/scuro) con avatar, testo e chevron; mail vuota; video nero |
| Videochiamata | 240 di altezza, gradiente grigio-caldo, avatar grande, controlli in vetro + rosso, espandi e chiudi |
| Riepilogo | `#F4F4F4`, r28; cerchio nero con bacchetta, "Riepilogo" 26, freccia vuota; colonna orari 12 con badge rotondi 22 (lime "mi piace", rosa "stella") e linea `#C8C8C8`; card Documenti `#E4E4E4` r22 con intaglio per il download e due miniature 118 (`#D2D2D2`, foglio bianco, etichetta `#A7A7A7`); card Obiettivo con matita, testo 13/19 con parti in 500 (lime su mobile) |
| Mobile | cornice 300×620 (bezel nero, r52), barra di stato "9:41", navigazione in basso a pillola nera 64 con quattro cerchi 44 (il primo bianco) e cerchio lime "video" a sinistra; WORKSPACE chiaro `#E0E0E0`; agenda nera con pannello lime, ore 38/300 ("14:00"), eventi bianchi, marcatore nero, blocco tratteggiato; videochiamata con Riepilogo |
| Campione colore | 220×220 r38, bordo 4 `#565656`, cursore con etichetta bianca |
| Card sfida | `#4D4D4D` r30, icona in cerchio contornato 80 (lime), testo 14/20 centrato; una lime |
| Passo del processo | cerchio contornato 64 con icona + pillola `#4D4D4D` 64; il primo lime; frecce tratteggiate |
| Editor a nodi | rail di tessere 44 r14 (attiva verde luminosa), titolo 26 con percorso e tag rosso, tab a pillola, canvas puntinato 18, nodi 96 r18 con riflesso, nodo agente 208×100, nodo selezionato verde con campi, nodo disattivato con cestino, connettori `#4FCB58` con bagliore, mini-mappa, zoom, pillole in basso a destra (ora in lime), barra chat con ID monospazio |

## 7. Schermate

1. **Console WORKSPACE** (1224×912 nella cornice): logo a 34/44; barra agenda a 102/28 larga 960;
   riga WORKSPACE a 118; rail da 260; sezioni a 232 e 546; card a 302 e 616; videochiamata +
   Riepilogo sovrapposti a destra da 436 (largo 330).
2. **App mobile**: WORKSPACE chiaro · Agenda del giorno · Videochiamata.
3. **Presentazione**: contenitore 1300, etichette "(01) …" in `#BDBDBD` 14, titoli a due colonne
   (h2 56/60 + paragrafo 24/32), sezioni con padding 64, chiusura "Non perderti il prossimo passo" 88.

## 8. Come si usa

- Importare `design-system/tokens.css` e usare le custom property `--dgt-*`.
- Le classi dello specimen sono il riferimento di implementazione: `.rb` (pulsante rotondo, varianti
  `.sm .xs .ghost .white .lime .black .red .glass`), `.pill` (`.on .white .lime .gray .dark`),
  `.chip`, `.dots` (`.l2 .l4 .l5 .light`), `.badge.up/.down`, `.ncard` + `.nt` (card con intaglio;
  la variabile `--behind` deve valere il colore che sta dietro la card), `.lead`, `.task`
  (`.lime .gray .dark`), `.sched`/`.tl`, `.stats`/`.stat`, `.shead`, `.call`, `.summary`/`.dcard`/`.thumb`,
  `.phone`/`.screen` (`.lightbg .daily .callscr`), `.sw`, `.ch`, `.step`, `.editor`.
- Testi in italiano e inglese devono stare su una riga nelle pillole: scegliere etichette corte.

## 9. Verifiche fatte

- Screenshot desktop (1440) e mobile (390) con Chromium: nessun overflow orizzontale, font Urbanist
  caricato (300–600), nessun errore in console.
- Confronto visivo sezione per sezione con le immagini originali a 1920 px.
- Differenza voluta: le card delle sfide sono su una griglia regolare invece che sparse attorno al
  titolo, per restare leggibili su mobile.

## 10. Schermate del prodotto: direzione scelta

Il 2026-09-04 il sistema è stato applicato alla prima schermata reale (vista principale dell'azienda: 4 dipartimenti,
11 dipendenti AI, 3 al lavoro) in tre direzioni, con prova di scala a 40. Studio, confronto e verdetto in
`schermate/direzioni/DIREZIONI.md`. **Direzione scelta: A · Console**, cioè questo sistema applicato senza sconti.
Le schermate successive nascono solo dentro questa direzione, con queste regole:

1. Unità di scala: dipartimento ed esecuzione; il dipendente è la foglia.
2. Il «adesso» è un luogo: barra «Oggi in azienda» in alto e prima riga di card esecuzione, «da approvare» in testa.
3. Oltre sedici elementi ogni elenco ha una vista compatta a pillole (3 per riga) e il filtro predefinito è il dipartimento.
4. Un solo accento: lime = attenzione del titolare (al lavoro, da approvare); rosa solo per errori e cali.
5. Testi corti: titoli entro due righe a 24 px, ruoli in una riga a 13 px, pillole su una riga.
6. Il pannello del titolare sono due tendine flottanti sopra tutto: «Da approvare» (pillola lime con campanella e
   numero; aperta mostra la richiesta corrente e la coda; estesa mostra la richiesta per intero con le azioni) e
   «Riepilogo di oggi» (pillola bianca con bacchetta; consegne, spesa, obiettivo, diario). Si chiudono verso destra;
   la home prende tutta la larghezza.
7. Logo del prodotto = acronimo DGT in alto a sinistra; titolo dell'azienda in maiuscolo con la O normale.
8. Pagina Richieste nella stessa cornice, con pieno controllo: filtri per stato, tipo, periodo, dipartimento,
   cliente e dipendente; Da approvare con ordinamento e «Approva tutte»; Storico per giorno a righe compatte;
   Regole di approvazione.
9. Pagina Dipartimento nella stessa cornice: Oggi in ‹dipartimento› (esecuzioni: al lavoro, errore, pianificate) ·
   Dipendenti (+ card «Aggiungi») · Obiettivi (card con barra di avanzamento a pillola; lime = in ritardo) · Da
   approvare dal dipartimento · Spesa del mese per cliente. Ogni pagina interna ripete la cornice: barra in alto,
   titolo con numeri, rail, sezioni con intestazione e pillole, tendine del titolare.
10. Il dipendente AI non ha un nome di base: l'etichetta principale è il ruolo (nella card a 22 px su due righe) e
    sotto sta il dipartimento; il nome è facoltativo (creazione o modifica) e quando c'è torna la forma piena (nome
    26 px, sotto «ruolo · dipartimento»). La card dipendente è alta 240 px nei due casi. Vale in tutte le viste.
11. Avatar generati al posto delle iniziali: deterministici dal seme (ruolo, o seme scelto), nel linguaggio del
    sistema (disco chiaro, corpo nero, occhi bianchi; lime solo se serve il titolare; rosa per l'errore). Due
    famiglie, con la stessa API: «orbe» (predefinita, da confermare: sfere morbide, animazioni CSS su tutti gli
    avatar, sguardo che segue il puntatore nell'editor) e «kit» (le silhouette del kit, statiche tranne le card al
    lavoro). Il titolare tiene le iniziali.
12. Creazione e modifica del dipendente in una tendina «Dipendente» (anteprima, ruolo, nome facoltativo,
    dipartimento, avatar a scelta fra sei), aperta dalla matita nell'intaglio della card, dalla riga compatta e
    dalla card «Aggiungi». Niente finestre generiche.

Mappa dei componenti sui concetti di DGT (barra agenda → esecuzioni del giorno, card attività → esecuzione, card lead →
dipartimento e dipendente, videochiamata → approvazione, Riepilogo → consegne/spesa/obiettivo): tabella in
`schermate/direzioni/DIREZIONI.md`, sezione 1. Sorgenti in `schermate/direzioni/` (`dati.js`, `comune.js`,
`direzione-a.js`, `avatar/`). Dettaglio della versione 5 (dipendenti, editor, avatar) in `DIREZIONI.md`, sezione 4.

## 11. Collegamenti

- Confronto delle tre direzioni (artefatto): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Direzione A cliccabile, tendine, pagine Richieste e Dipartimento, dipendenti con avatar ed editor (artefatto): https://claude.ai/code/artifact/93d18853-06f7-4e68-a903-fdc9b97eb37c
- Avatar dei dipendenti, le due famiglie a confronto (artefatto): https://claude.ai/code/artifact/4bc0c3ee-d1a0-41dc-a6d9-ef4f2b8360bd
- PR #3 verso `main` con schermate e documenti (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/3
- Branch dei dipendenti AI (versione 5 della direzione A): `claude/console-ai-employees-feebdx`

- Artefatto pubblicato: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Branch di lavoro: `claude/dgt-design-system-fz5r1g`, PR #1 verso `main`: https://github.com/av3rgfx/DGT-Design-2.0/pull/1
