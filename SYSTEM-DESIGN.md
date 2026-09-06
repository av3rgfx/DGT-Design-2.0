# DGT — System Design

Documento unico del sistema di design di DGT (sistema operativo aziendale per agenti AI).
Raccoglie tutto ciò che serve per progettare e costruire schermate coerenti: fonti, palette,
tipografia, forme, componenti, schermate e strumenti di verifica. Aggiornato al 2026-09-06.

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
| `design-system/tools/` | `screenshot.js` (cattura desktop/mobile dello specimen), `screenshot-page.js` e `screenshot-elementi.js` (cattura di una pagina o di elementi per selettore), `fetch-fonts.py` (Urbanist locale per gli ambienti senza Google Fonts), `wcag.py` (utilità di contrasto, non è una regola). |
| `design-system/archive/` | Varianti precedenti (A e B). **Non fanno testo.** |
| `schermate/componenti.js` | I componenti della Console condivisi con il telefono e con le pagine degli avatar (dal 2026-09-06, versione 14): il CSS delle primitive del sistema applicate al prodotto (pulsanti rotondi, avatar e pile, pillole, chip, punti, badge, card con intaglio, righe, ripartizione), le variabili, e le funzioni che le stampano (`av`, `pair`, `chipStato`, `iconaTipo`, `eur`, `differenze`…); `window.DGT_COMPONENTI`, caricato dopo `comune.js`, con il suo CSS in pagina prima di quello della Console. |
| `schermate/direzioni/` | Schermate reali: tre direzioni per la vista principale, prova a 40, direzione scelta (`DIREZIONI.md`); dentro la direzione A le pagine Richieste, Dipartimento, Dipendente, Esecuzione e Costi; le approvazioni da mobile (`mobile.html`); le prove cliccate in `prove/` (`console.js`, `mobile.js`, `costi.js`, con il README che dice il comando); gli screenshot in `screenshot/`. |
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
| pillola | 400 · 15/20 | Tutti · [fiamma] Cliente caldo (icona `i-fire`, niente emoji) |
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
| Pillola filtro | 44 di altezza, bordo `.14`, trasparente; "Tutti" bianca con testo nero; l'icona fiamma `i-fire` (16) davanti al testo delle pillole «caldo / urgenti / da approvare / in ritardo»: **niente emoji** (regola 16) |
| Barra agenda | pillola bianca 64 → titolo 18, pillola calendario con cerchio grigio, timeline lime 52 con eventi bianchi 40 (coppia di avatar, durata, freccia), separatori, orari 14, segmento in corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale 52 |
| Riga WORKSPACE | cerchio indietro 48, titolo 46 con la O sostituita dal marchio lime, "Nuova attività" bianca 52 con cerchio grigio "+", tre numeri 48/300 con etichetta 19 grigia e badge ↑ lime / ↓ rosa |
| Rail | 4 cerchi 48 a sinistra: elenco (attivo, bianco), organizzazione, chat, calendario. Nel prodotto (direzione A) i cerchi sono sei: elenco, organizzazione, campanella (Richieste), chat, calendario ed euro (i Costi, dal 2026-09-06) |
| Intestazione di sezione | titolo 28, conteggio sottolineato (numero 20 + parola 13), cerchi cerca e filtri 46, pillole filtro |
| Card lead | 260×204, r28, `#262626→#1C1C1C`; avatar 48 in alto a sinistra; intaglio con freccia; nome 26; ruolo 13; "Fonte" + pillole `#3A3A3A` 26; etichetta di interesse + contenitore nero con 5 punti 13 |
| Avatar del dipendente AI | misure 48 (40, 36, 32, 28, 26; 68 nella richiesta corrente e nella testata dell'esecuzione; 96 nella pagina del Dipendente). **Dal 2026-09-05 (versione 10, «strada 1»)**: un **disco piatto** nella **tinta del dipendente**, otto tinte della palette vivace (indaco `#6C6AFF`, corallo `#FF6A55`, ambra `#FFB52E`, verdeacqua `#2BD9B5`, prugna `#C66CFF`, petrolio `#3AB8FF`, bordeaux `#FF5BA6`, grigio `#9E9E9E`), assegnata da DGT alla creazione come la meno usata in azienda e cambiabile nell'editor del dipendente (riga «Colore»); il disco riempie la casella, senza volume, luci né orlo; impilati con l'anello del fondo e 9 px di sovrapposizione. **Occhi «lilguy»** (dal riferimento lilguy.net, ridisegnati): due occhi grandi (raggio 0,29–0,34 del corpo) all'altezza del centro, distanti (centri a 0,39–0,43 del raggio), sclera **sempre bianca** con contorno sottile e **pupilla sempre nera**, grande (0,6–0,7 dell'occhio), tonda o ovale; forma della sclera dal seme (cerchio, ovale, a gatto inclinato, a ghianda). Lo stato **non** passa dal colore degli occhi: è un **punto di stato** sul bordo della casella in basso a destra (raggio 15 su 125, bordo nero di 4; lime al lavoro, giallo da approvare, rosa in errore, nulla da fermo e pianificato); nelle **pile** (card dei dipartimenti e degli obiettivi, coppie della barra agenda) niente punto, lo stato è il **gesto** del corpo con squash e stretch (al lavoro un ritmo, da approvare un salto ogni 3,2 s, in errore si sgonfia e si inclina, pianificato un pendolo, da libero il respiro del sonno). Restano le forme: in errore la pupilla è una X, da libero l'occhio è chiuso con una palpebra ad arco e la testa fa un lento cenno, da approvare gli occhi crescono del 15 %, al lavoro lo sguardo scandisce. Moto: un solo `requestAnimationFrame` per pagina, respiro, galleggiamento, sguardo (la coppia scivola di poco, la pupilla si sposta dentro l'occhio), palpebre con easing; solo gli orbi nel viewport si aggiornano; con `prefers-reduced-motion` posa di riposo. La perla nera con le pupille del kit (versioni 7b e 7c) resta dietro `?identita=nessuna&occhi=kit&corpo=perla`; le pelli (`?pelle=`) valgono per il corpo senza tinta; la famiglia **kit** con `?avatar=kit`. Le persone (titolare) tengono le iniziali su disco bianco; aria-hidden |
| Pagina Dipendente | stessa cornice (titolo = etichetta in maiuscolo, 36 px oltre 12 caratteri; tre numeri di oggi); testata con avatar 96 che segue il puntatore, etichetta 28, «ruolo · dipartimento · in produzione dal», chip (stato, revisione in sospeso, prompt vN, modello, colloquio), pillole Modifica / Metti in pausa / Ripeti il colloquio a 40, mansione 17, quattro numeri 48/300 a 30 giorni con badge del confronto; sezioni con intestazione e pillole: revisione di performance, oggi, rendimento (righe 56 con due valori e badge), soul prompt (documento `#F4F4F4` r28 con intaglio, 17/26; versioni come righe 56: proposta lime, corrente bianca), modello (tre card lead 236 di altezza, l'assegnato bianco; card criterio 517 con ripartizione a pillola 12: grigio `#6B6B6B` / bianco / lime), strumenti (card come le regole), budget (card attività, lime se oltre il limite del giorno) e permessi (righe con chip «Regola generale» / «Eccezione» lime), colloquio (card grigia con punteggio e barra, righe dei casi) |
| Pagina Esecuzione | stessa cornice (titolo = titolo dell'esecuzione in maiuscolo; tre numeri: passi fatti su totale, spesi con badge «oltre», tempo); testata: avatar 68 animato, etichetta 18 e «ruolo · dipartimento», chip (stato, passo n di N, modello, cliente, obiettivo), la frase «Adesso … Prossimo …» 17/25 con le parti in 500, pillole d'azione 40 (lime la principale: riprova, avvia ora, apri la richiesta), la **barra dei passi** = barra agenda 64 ferma nella testata: passi fatti come eventi bianchi 40 con il numero in cerchio nero 32 e la durata, passo in corso come segmento «adesso» `#A8E65D` con il marcatore dell'ora, passi da fare traslucidi con la stima, passo in errore rosa, pillola finale bianca con la stima di fine; Passi come righe 56 (cerchio 40 con spunta / play / avviso / numero; in corso lime, errore grigia, da fare al 60 %); Log come righe 48 (ora, chip del tipo: Passo chiaro, Strumento, Modello, Nota, Richiesta lime, Errore rosa, Titolare nera; costo) con i filtri contati e in fondo la **barra di scrittura** (pillola bianca 56 con avatar 36, campo 15, pulsante nero 40); Output come card lead 224 (icona del tipo; da approvare lime, bozza ed errore grigie, da fare spenta) e le consegne precedenti della serie come righe dello storico; Costo: card attività 517 scura (lime se oltre il limite) con finora su stimato, ripartizione per modello a pillola e legenda, oggi su limite del giorno; strumenti come righe (chiamate, Usato / Non usato / Errore, passi, costo) |
| Pagina Costi | stessa cornice (titolo COSTI; tre numeri: spesi oggi con il badge rosa «oltre» se sopra la somma dei limiti del giorno, in 30 giorni con il badge del confronto con i 30 precedenti, «restano di N €» del budget del mese; niente pillola «Nuovo…»); cinque sezioni con l'intestazione e le **pillole del periodo** (Oggi · Ultimi 30 giorni · Da inizio anno; per modello senza l'anno, per strumento solo Oggi), ognuna con il suo stato. **Per dipartimento**: quattro card costo 316 in fila (la card Costo dell'esecuzione: spesa su limite, ripartizione a pillola 12 per modello grigio `#6B6B6B` / bianco / lime con la legenda a capo, da inizio anno per blocchi di tempo lime / bianco / grigio; riga «Quota e consegne» con il chip della quota e l'occhio; nell'intaglio un solo pulsante: la freccia, o la campanella con il punto se oltre il limite, e allora la card è lime con la ripartizione nero / bianco / grigio). **Per dipendente**: righe 56 (avatar 40, etichetta, valore del periodo, budget a barra 8 px lime o rosa se oltre, spesa con il badge del confronto, freccia), oltre sedici le pillole compatte a tre per riga con la spesa in un chip. **Per cliente**: le righe della spesa del mese (consegne approvate, oggi, quota, spesa, freccia → Richieste filtrate). **Per modello**: la card costo 517 dell'azienda e tre righe (listino, esecuzioni e quota, costo medio, totale). **Per strumento**: righe con chip Usato / Errore, la pila di chi lo ha usato con il «+N» e il costo |
| Card revisione di performance | `ncard.lime` a tutta larghezza, padding 22/24, intaglio con campanella (punto rosso) e «apri»; chip `onlime`; titolo 26/32 entro 38 caratteri per riga; tre colonne 1,25 / 1 / 1 con etichetta 11 maiuscola, evidenze come elenco (numero in pillola `rgb(0 0 0/.1)` 22 + frase 14/19, cerchietto con freccia verso la richiesta), paragrafi 13/18; riga «Decisione del titolare» separata da una linea `.12`: pillole 48 nera (prova), bianca (applica), vuota scura (modifiche), rossa (rifiuta…), link al dossier a destra |
| Tendina versioni / dossier | tendina estesa 840 (fino a 980 di altezza), chiara; riga «chi» con avatar 36; due colonne bianche r22 con chip della versione (`ink` corrente, `lime` proposta, `light` altre), paragrafi 14/21 su pillole r10: aggiunti su lime, tolti su rosa `#F9A3A3` barrati, cambiati su grigio `.045` con le parole in `mark` lime / rosa; riga dei numeri sotto una linea `.08`; tre `dcard` (Perché, Cosa ci aspettiamo, Rischi) con elenco numero + frase 12/17; azioni come nella richiesta estesa più il campo del motivo (pillola bianca 44, bordo nero a fuoco, rosso se vuoto) |
| Tendina Dipendente | 330, `#F4F4F4`, r28 a sinistra; intaglio con più/matita e titolo 22; anteprima della card; campi a pillola bianca 48 (Ruolo, Nome facoltativo) con etichetta 11 maiuscola; dipartimento a pillole 36 (scelta = nera); sei cerchi 36 per l'avatar (scelto con anello nero); azioni «Crea dipendente»/«Salva» lime 44 e «Annulla» |
| Card attività | 336×262, lime / `#4D4D4D` / scura; striscia con avatar 48, nome 15/500, ruolo 12; intaglio con campanella (punto rosso) e freccia; cerchio contornato 64 con icona; titolo 26; riga meta (coppia di avatar, data 500, "alle"); "Stato" 11; selettore a pillola 48 (bianca su lime, nera su grigio/scuro) con testo e chevron: nella card di un solo dipendente un chip di stato («In corso» lime, «Errore» rosa, l'ora) al posto dell'avatar, che sta già nella striscia; nelle card con più dipendenti (obiettivi) la pila di avatar e il badge «+N» dopo la pila, mai sotto (2026-09-04); mail vuota; video nero |
| Videochiamata | 240 di altezza, gradiente grigio-caldo, avatar grande, controlli in vetro + rosso, espandi e chiudi |
| Riepilogo | `#F4F4F4`, r28; cerchio nero con bacchetta, "Riepilogo" 26, freccia vuota; colonna orari 12 con badge rotondi 22 (lime "mi piace", rosa "stella") e linea `#C8C8C8`; card Documenti `#E4E4E4` r22 con intaglio per il download e due miniature 118 (`#D2D2D2`, foglio bianco, etichetta `#A7A7A7`); card Obiettivo con matita, testo 13/19 con parti in 500 (lime su mobile) |
| Mobile | cornice 300×620 (bezel nero, r52), barra di stato "9:41", navigazione in basso a pillola nera 64 con quattro cerchi 44 (il primo bianco) e cerchio lime "video" a sinistra; WORKSPACE chiaro `#E0E0E0`; agenda nera con pannello lime, ore 38/300 ("14:00"), eventi bianchi, marcatore nero, blocco tratteggiato; videochiamata con Riepilogo. **DGT sul telefono (2026-09-05, versione 11, prima metà)**: la stessa cornice con l'ora dell'azienda; navigazione con i quattro cerchi del rail della Console e, al posto del video, la **campanella lime con il numero da approvare** (badge nero); **Da approvare** chiara (logo DGT, cerchio bianco dei filtri, iniziali del titolare; titolo 30/36; due numeri 26/300 con badge; la richiesta corrente come card lime r24 con striscia avatar 40, intaglio con campanella e freccia, icona del tipo 48, titolo 20/24, cliente · ora, riga «Decidi» con il chip tipo · costo · passi e i quattro cerchi 44 apri / commenta / approva nera / rifiuta rossa; «In coda» a righe bianche 48 con la corrente lime; riga «Riepilogo di oggi»; sotto la navigazione una fascia di 112 px con il contenuto che scorre sfocato (blur 14) e appena scurito (nero .16), sfumata in alto, perché la campanella lime resti distinta dalle card lime che le passano sotto); **Richiesta** nera (indietro e frecce della coda 44, chip 24, titolo 24/28, riga «chi · cliente · consegnata alle», documento bianco r24 con chip dell'allegato e testo 14/21, card scure r24 «Chi la propone» e «Nota del dipendente», barra fissa in basso: Approva lime 48 larga, matita, X rossa, con dissolvenza nera; il rifiuto trasforma la barra in etichetta 11 maiuscola, campo a pillola bianca 48 e pillole «Rifiuta» rossa / «Annulla»). **Seconda metà (2026-09-06, versione 12)**: **Riepilogo di oggi** sul fondo del Riepilogo `#F4F4F4` (indietro `olight` 44 e chip della data 32; cerchio nero 44 con la bacchetta e titolo 22/26; tre numeri 26/300 al lavoro / da approvare / spesi oggi; linea del tempo con colonna 36, ora 11, badge rotondi 22 lime / nero / bianco / rosa e segmenti `#C8C8C8`; `dcard` r20 con intaglio 36: Consegne con due miniature 96 e le righe approvate e spesa, Obiettivo del mese lime con la matita, «Diario di oggi» a voci 12/16 con l'etichetta in 500 e linee `.08`; riga lime «Da approvare» in fondo); **stato vuoto** a coda finita: la prima schermata prende il fondo `#F4F4F4`, card bianca r24 con cerchio nero 48 e spunta, «Niente da approvare» 20/24, riga 13/18, e sotto il riepilogo; **revisione**: chip «Revisione del soul prompt / del modello» e chip lime «decide il titolare», titolo corto 24/28, due card bianche r24 una sotto l'altra con il chip della versione (nero corrente, lime proposta) e le differenze 13/19 su pillole r10 (lime aggiunti, rosa barrati, grigio `.045` con `mark`), tre righe di numeri; tre card scure Perché / Cosa ci aspettiamo / Rischi con le evidenze (pillola 22 `rgb(255 255 255/.1)` sopra la frase 12/17), «Chi riguarda», «Nota del sistema»; barra a due righe: «Prova su 20 esecuzioni» bianca 48 larga, poi Applica lime 48 larga, matita, X rossa, con dissolvenza di 190 |
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
- Nel prodotto le stesse primitive stanno in `schermate/componenti.js` (`window.DGT_COMPONENTI`: CSS già prefissato
  `.dirA`, variabili e funzioni che le stampano), condivise dalla Console, dal telefono e dalle pagine degli avatar. Una
  schermata nuova carica `comune.js`, `componenti.js` e poi il proprio file, dichiara `variabili` sulla propria radice e
  mette in pagina il CSS dei componenti prima del proprio.

## 9. Verifiche fatte

- Screenshot desktop (1440) e mobile (390) con Chromium: nessun overflow orizzontale, font Urbanist
  caricato (300–600), nessun errore in console.
- Confronto visivo sezione per sezione con le immagini originali a 1920 px.
- Differenza voluta: le card delle sfide sono su una griglia regolare invece che sparse attorno al
  titolo, per restare leggibili su mobile.
- Le schermate del prodotto hanno tre prove cliccate con Playwright in `schermate/direzioni/prove/` (Console, mobile,
  Costi) e gli screenshot in `schermate/direzioni/screenshot/`. La manutenzione del 2026-09-06 (versione 14) è stata
  verificata con trentuno catture identiche byte per byte prima e dopo e con le impronte degli stili calcolati di ogni
  elemento (`DIREZIONI.md`, «Versione 14»).

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
    sistema (orbe perla nera, lo stesso su ogni fondo; occhi bianchi, lime se serve il titolare, gialli da
    approvare, rosa per l'errore). Due famiglie, con la stessa API: «orbe» (scelta dall'utente: sfere tonde con
    occhi grandi, un solo motore che muove tutti gli avatar con funzioni continue del tempo e un moto quieto per
    stato, sguardo che segue il puntatore nell'editor) e «kit» (le silhouette del kit, statiche tranne le card al
    lavoro, con `?avatar=kit`). Il titolare tiene le iniziali.
12. Creazione e modifica del dipendente in una tendina «Dipendente» (anteprima, ruolo, nome facoltativo,
    dipartimento, avatar a scelta fra sei), aperta dalla matita nell'intaglio della card, dalla riga compatta e
    dalla card «Aggiungi». Niente finestre generiche.
13. Pagina del Dipendente nella stessa cornice, aperta dalla freccia nell'intaglio della card e della riga compatta,
    con un solo ordine per i due pubblici: testata (avatar grande, etichetta, azioni, quattro numeri a 30 giorni
    confrontati con i 30 precedenti) e revisione di performance per il titolare; oggi, rendimento, soul prompt con
    versioni e confronto, modello e criterio di scelta automatica, strumenti e connessioni, budget e permessi,
    colloquio (eval) per l'operatore. La revisione di performance è una richiesta al titolare come le altre (tipo
    «revisione», nella coda e in Richieste): dossier con evidenze, stime e rischi, quattro decisioni (prova, applica,
    chiedi modifiche, rifiuta con motivo obbligatorio) e cronologia con l'effetto misurato. Le richieste decise dal
    titolare sono la fonte di «corretti da un umano» e «proposte respinte». I modelli sono livelli neutri di DGT
    (Rapido, Standard, Esperto), non marchi di terzi.
14. L'avatar è un avatar, non un'icona (2026-09-04, versioni 7 e 7b): niente disco né anello bianco dietro l'orbe.
    La pelle è «perla»: nero lucido, lo stesso su ogni fondo, che si stacca dal nero per il volume (riflesso in
    alto a sinistra, luce riflessa in basso, orlo di luce lungo il bordo, un bagliore di pochi pixel fuori dal
    corpo). Il corpo è un cerchio: niente ovali, niente squash e stretch; un dipendente si distingue dagli occhi:
    le pupille del kit (tonde, quadrate, ad anello, più grandi), dipinte sulla sfera con la base tangente del kit e
    con i suoi moti dello sguardo (versione 7c). I moti sono continui: un solo `requestAnimationFrame` per pagina
    muove gli orbi visibili con funzioni del tempo (respiro, galleggiamento, sguardo, battito delle palpebre) e un
    solo moto quieto per stato. Gli avatar impilati si sovrappongono di 6 px senza anello. Le altre pelli (grigio,
    chiaro, alone, disco) restano dietro `?pelle=` per il confronto (`schermate/direzioni/avatar-pelli.html`).
15. Pagina dell'Esecuzione nella stessa cornice, aperta dall'«occhio» e dalla freccia delle card esecuzione: titolo
    = titolo dell'esecuzione, tre numeri (passi fatti, spesi, tempo); testata con avatar, chip, la frase «Adesso …
    Prossimo …», le azioni per stato (pausa, interrompi, scrivi; riprova; avvia ora; apri la richiesta) e la barra
    dei passi, che è la barra agenda del sistema (passi fatti = eventi, passo in corso = segmento «adesso», da fare
    = eventi traslucidi con la stima, errore = rosa); poi Passi come righe, Log con filtri e la barra di scrittura
    del titolare, Output come card con le consegne precedenti della serie, Costo per modello e per strumento. Le
    azioni cambiano il modello e si vedono subito nella home e nel dipartimento.
16. **Niente emoji**, nel prodotto e nel sistema di design (2026-09-04, regola fondamentale chiesta dall'utente): al loro
    posto le icone del sistema, disegnate per DGT nello sprite (`schermate/direzioni/comune.js`; lo specimen ha il suo).
    La fiamma delle pillole «caldo», «urgenti», «da approvare», «in ritardo» è l'icona `i-fire`.
17. **La Console riempie sempre lo schermo** (2026-09-04): è progettata a 1440 px e si scala con `zoom` alla larghezza
    della finestra, in su sugli schermi grandi e in giù su quelli piccoli (`scala()` in `direzione-a.html`). Niente
    `transform`: così le tendine e le pillole fisse («da approvare», «Riepilogo») restano al bordo destro dello schermo
    e non scorrono con la pagina; i `100vh` delle tendine si dividono per `--z`.
18. **Nessuna ripetizione dell'avatar dentro una card di un solo dipendente**: l'avatar sta nella striscia in alto; il
    selettore di stato porta un chip («In corso», «Errore», l'ora), non l'avatar. La pila di avatar resta dove i
    dipendenti sono più d'uno (obiettivi, dipartimenti), con il badge «+N» dopo la pila.
19. **Il colore distingue i dipendenti** (2026-09-05, versione 10): ogni dipendente AI ha una tinta fra otto, sul disco
    piatto del suo avatar, assegnata alla creazione e cambiabile nell'editor. È l'unica eccezione alla regola del solo
    accento e non usa il lime, il giallo né il rosa, che restano ai segnali (al lavoro, da approvare, errore). Gli occhi
    non portano lo stato: sclera bianca e pupilla nera sempre; lo stato si legge dai chip e dalle forme (X in errore,
    palpebre chiuse da libero) e dal **punto di stato** sul bordo della casella (lime, giallo, rosa; niente da fermo). Nelle
    **pile** di avatar il punto non c'è: lo stato lo dice il **gesto** del corpo (scelta del 2026-09-05, «settima tornata» in
    `DIREZIONI.md`).
20. **Le approvazioni da mobile** (2026-09-05, versione 11, prima metà): il titolare approva dal telefono nella cornice mobile
    dello specimen, con gli stessi componenti e lo stesso modello della Console (la decisione è `m.decidi` in `dati.js`: quello
    che si decide sul telefono vale nella Console e viceversa). La navigazione in basso porta i quattro cerchi del rail e la
    campanella lime con il numero da approvare; «Da approvare» è chiara come WORKSPACE, con la richiesta corrente come card
    lime e la coda a righe; «Richiesta» è la tendina estesa in colonna su nero, con la barra fissa Approva / Chiedi modifiche /
    Rifiuta. Approvare è al volo; **rifiutare chiede sempre il motivo** (anche dalla card: la X apre la richiesta con il campo
    pronto). Sotto la navigazione il contenuto che scorre è sfocato e appena scurito, con il bordo sfumato: un pulsante lime
    non cambia colore per distinguersi dalle card lime, è il fondo sotto la barra a farsi da parte (correzione dell'utente).
    **Seconda metà (2026-09-06, versione 12)**: la terza schermata è il **Riepilogo di oggi**, il pannello Riepilogo dello
    specimen in colonna (bacchetta, tre numeri, linea del tempo con i badge rotondi: consegne con le miniature, obiettivo del
    mese in lime, diario) con la riga lime che riporta alle richieste; a coda finita la prima schermata **diventa il riepilogo**
    (card «Niente da approvare» sul fondo del Riepilogo, poi la linea del tempo): lo stato vuoto non è un riquadro tratteggiato.
    Le **revisioni di performance entrano nella coda del telefono**: nella schermata Richiesta le due versioni una sotto l'altra
    con le stesse differenze della tendina delle versioni, i tre blocchi di evidenze, e nella barra le quattro decisioni (Prova
    bianca sopra; Applica lime, chiedi modifiche, rifiuta con motivo sotto), con lo stesso `m.decidi` della Console. Sul telefono
    i titoli sono corti (chip per il tipo, titolo per il cambiamento) e le evidenze stanno in colonna: numero in pillola, poi la
    frase. La prova a quaranta regge (7 in coda, titoli troncati con i puntini, badge a due cifre).
21. **La pagina dei Costi** (2026-09-06, versione 13): l'ultima pagina di prodotto, nella stessa cornice (titolo COSTI; spesi
    oggi, in 30 giorni con il confronto, quanto resta del budget), con cinque sezioni (per dipartimento, dipendente, cliente,
    modello, strumento) e **le pillole del periodo in ogni sezione**, indipendenti e solo per i periodi che i dati reggono
    (oggi dalle esecuzioni, 30 giorni dal dossier, da inizio anno dalla creazione; per modello senza l'anno, per strumento
    solo oggi). **Un solo aggregatore** (`m.costi` in `dati.js`) alimenta la pagina e la sezione «Spesa del mese» del
    Dipartimento, e le viste per dipartimento, dipendente, cliente e modello sommano allo stesso totale (per cliente la spesa
    del dipendente si ripartisce in proporzione alle sue richieste). Nessun componente nuovo: la card costo dell'esecuzione, le
    righe della spesa del mese, i badge del confronto, la vista compatta oltre sedici. Ci si arriva dal **sesto cerchio del
    rail** (euro), dal numero «spesi oggi» (home, Dipartimento, Dipendente) e dalle pillole «Tutti i costi dell'azienda» nelle
    sezioni Spesa del mese e Costo.

Mappa dei componenti sui concetti di DGT (barra agenda → esecuzioni del giorno, card attività → esecuzione, card lead →
dipartimento e dipendente, videochiamata → approvazione, Riepilogo → consegne/spesa/obiettivo): tabella in
`schermate/direzioni/DIREZIONI.md`, sezione 1. Sorgenti in `schermate/direzioni/` (`dati.js`, `comune.js`,
`../componenti.js`, `direzione-a.js`, `mobile.js`, `avatar/`). Dettaglio della versione 5 (dipendenti, editor, avatar), 5b/5c (orbe), 6 (pagina del
Dipendente, revisione di performance), 7, 7b e 7c (orbe senza disco, le pelli; poi perla, corpi tondi e moti fluidi; poi
gli occhi del kit), 8 (pagina dell'Esecuzione), 10 (l'identità degli orbi), 11 e 12 (le approvazioni da mobile), 13 (la pagina dei Costi), 14 (la manutenzione: i componenti in `componenti.js`, le prove nel
repository, la sezione «moto» in `DESIGN.md`; niente di visibile cambiato, tranne una perdita di stile sulla schermata della
revisione del telefono, corretta e da confermare) in `DIREZIONI.md`, sezione 4.

## 11. Collegamenti

- Confronto delle tre direzioni (artefatto): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Direzione A cliccabile, tendine, pagine Richieste, Dipartimento, Dipendente (revisione di performance), Esecuzione e Costi, avatar ed editor (artefatto, ripubblicato il 2026-09-06 con la manutenzione della versione 14): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
- Le approvazioni da mobile, schermate «Da approvare», «Richiesta» (anche la revisione di performance) e «Riepilogo di oggi» sul telefono, cliccabili, con lo stato vuoto (artefatto, ripubblicato il 2026-09-06 con la versione 14): https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
- Avatar dei dipendenti, le due famiglie a confronto (artefatto): https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
- Le pelli dell'orbe senza disco, quattro soluzioni a confronto (artefatto): https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- PR #3 verso `main` con schermate e documenti (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/3
- Branch dei dipendenti AI (versione 5 della direzione A): `claude/console-ai-employees-feebdx`, PR #4 (unita)
- Branch della pagina del Dipendente e degli avatar senza segni dietro (versioni 5c e 6): `claude/avatar-orbe-employee-page-3nhqmk`, PR #5 (unita)
- Branch dell'orbe senza disco, della pagina dell'Esecuzione e della cornice a tutto schermo (versioni 7–9): `claude/avatar-execution-page-nv8dm4`, PR #6: https://github.com/av3rgfx/DGT-Design-2.0/pull/6
- Branch delle approvazioni da mobile, seconda metà (versione 12): `claude/mobile-approvals-v11-mgqf5d`, PR #9 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/9
- Branch della pagina dei Costi (versione 13): `claude/company-costs-page-llxcix`, PR #10 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/10
- Branch della manutenzione (versione 14): `claude/console-mobile-maintenance-gwnihs`, PR #11: https://github.com/av3rgfx/DGT-Design-2.0/pull/11

- Artefatto pubblicato: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Branch di lavoro: `claude/dgt-design-system-fz5r1g`, PR #1 verso `main`: https://github.com/av3rgfx/DGT-Design-2.0/pull/1
