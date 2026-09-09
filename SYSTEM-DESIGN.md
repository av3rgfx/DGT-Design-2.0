# DGT — System Design

Documento unico del sistema di design di DGT (sistema operativo aziendale per agenti AI).
Raccoglie tutto ciò che serve per progettare e costruire schermate coerenti: fonti, palette,
tipografia, forme, componenti, schermate e strumenti di verifica. Aggiornato al 2026-09-07.

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
| `schermate/componenti.js` | I componenti della Console condivisi con il telefono e con le pagine degli avatar (dal 2026-09-06, versione 14): il CSS delle primitive del sistema applicate al prodotto (pulsanti rotondi, avatar e pile, pillole, chip, punti, badge, card con intaglio, righe, ripartizione, e dalla versione 15 le bolle della chat), le variabili, e le funzioni che le stampano (`av`, `pair`, `chipStato`, `messaggio`, `iconaTipo`, `eur`, `differenze`…); `window.DGT_COMPONENTI`, caricato dopo `comune.js`, con il suo CSS in pagina prima di quello della Console. |
| `schermate/direzioni/` | Schermate reali: tre direzioni per la vista principale, prova a 40, direzione scelta (`DIREZIONI.md`); dentro la direzione A le pagine Richieste, Dipartimento, Dipendente, Esecuzione, Consegna, **Workflow**, Costi, Agenda e Chat; il telefono del titolare (`mobile.html`: approvazioni, chat, agenda, dipartimenti, consegna, **workflow**); le prove cliccate in `prove/` (`console.js`, `mobile.js`, `costi.js`, `agenda-chat.js`, `workflow.js`, con il README che dice il comando); gli screenshot in `screenshot/`. |
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

L'editor a nodi ha una palette propria (`--dgt-ed-*`): neri `#0A0A0A…#1A1A1A`. **Dal 2026-09-08 (versione 20) il suo
accento è il lime `#B8FC64`, non più il verde `#4FCB58`**: il canvas a nodi non è più solo una figura — il prodotto lo
applica nella pagina Workflow, e due accenti nella stessa applicazione violerebbero la regola 4. Nodo selezionato
`#B8FC64 → #9AD84B` con il **testo all'inchiostro** (sul lime il bianco non si legge), bagliore
`rgb(184 252 100/.55)`, rosso `#F04848`, quello del sistema. È l'emendamento a `CLAUDE.md` deciso dall'utente, e vale
solo per il colore. I 18 token non li importa nessun file: restano inerti, ma non più sbagliati.

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
| Barra agenda | **Nel riferimento**: pillola bianca 64 → titolo 18, pillola calendario con cerchio grigio, timeline lime 52 con eventi bianchi 40 (coppia di avatar, durata, freccia), separatori, orari 14, segmento in corso `#A8E65D` con icona video, marcatore nero "14:15" con linea e punto bianco, freccia finale 52. Lì è l'agenda personale di una persona: eventi tutti dello stesso tipo, gli avatar sono chi partecipa, «adesso» è la chiamata in corso. **Nel prodotto, dal 2026-09-06 (versione 16, regola 24)**: la stessa cornice, ma dentro la pista ci sono le **caselle contate del giorno** (approvate · al lavoro con la pila · ferme in rosa · dopo), non più i blocchi con l'asse del tempo. La forma del riferimento resta (pillola 64, titolo, chip della data, pista lime 52, pillole con gli avatar, cerchio 52); cadono gli orari fra i blocchi, i separatori e il marcatore nero dell'ora, che in DGT non stavano in scala. La versione precedente resta dietro `?barra=0` |
| Riga WORKSPACE | cerchio indietro 48, titolo 46 con la O sostituita dal marchio lime, "Nuova attività" bianca 52 con cerchio grigio "+", tre numeri 48/300 con etichetta 19 grigia e badge ↑ lime / ↓ rosa |
| Rail | 4 cerchi 48 a sinistra: elenco (attivo, bianco), organizzazione, chat, calendario. Nel prodotto (direzione A) i cerchi sono sei e portano tutti a una pagina: elenco (home), organizzazione (Dipartimento), campanella (Richieste), chat (Chat, dal 2026-09-06), calendario (Agenda, dal 2026-09-06) ed euro (Costi) |
| Intestazione di sezione | titolo 28, conteggio sottolineato (numero 20 + parola 13), cerchi cerca e filtri 46, pillole filtro. **Nel prodotto, dal 2026-09-07 (versione 17, regola 25)**: i cerchi ci sono solo dove fanno qualcosa. Resta «cerca» nelle sette sezioni che possono passare le dodici righe, e da chiuso è il cerchio 46, da aperto una pillola `rgb(255 255 255/.07)` con filetto `.18` alta 46: lente 16, campo 15 largo 190, cerchio × 32; filtra a ogni tasto e il conto «N di M» va nel contatore della sezione. Il cerchio «filtri» e il cerchio «scarica» non ci sono più; «griglia» e «righe» scelgono la forma della card dipendente. Le pillole restano solo dove filtrano davvero |
| Riga di elenco | tre griglie a pillola alte 56 (`.hrow` storico, `.crow` voci, `.lrow` log, r24 e alta 48): ora / icona / avatar, testo su due livelli, chip, valori, importo, e in fondo una colonna da 32 px con la freccia. **Nel prodotto, dal 2026-09-07 (versione 18, regola 26)**: la freccia c'è solo dove la riga ha una destinazione. Se non ce l'ha nessuna riga della lista, cade anche la colonna (`nofr`) e il contenuto si riprende i 42 px; se qualcuna ce l'ha, la colonna resta e la cella è vuota, perché due righe della stessa lista non possono avere due griglie. Vale anche per il gallone `i-chevr` del log |
| Card lead | 260×204, r28, `#262626→#1C1C1C`; avatar 48 in alto a sinistra; intaglio con freccia; nome 26; ruolo 13; "Fonte" + pillole `#3A3A3A` 26; etichetta di interesse + contenitore nero con 5 punti 13. **Dal 2026-09-07 (versione 18, regola 26)**: l'intaglio è il taglio che fa posto ai pulsanti, quindi una card che non ne ha nessuno non ce l'ha (le regole di approvazione, le consegne senza destinazione, l'esito del colloquio, il diario del Riepilogo) |
| Avatar del dipendente AI | misure 48 (40, 36, 32, 28, 26; 68 nella richiesta corrente e nella testata dell'esecuzione; 96 nella pagina del Dipendente). **Dal 2026-09-05 (versione 10, «strada 1»)**: un **disco piatto** nella **tinta del dipendente**, otto tinte della palette vivace (indaco `#6C6AFF`, corallo `#FF6A55`, ambra `#FFB52E`, verdeacqua `#2BD9B5`, prugna `#C66CFF`, petrolio `#3AB8FF`, bordeaux `#FF5BA6`, grigio `#9E9E9E`), assegnata da DGT alla creazione come la meno usata in azienda e cambiabile nell'editor del dipendente (riga «Colore»); il disco riempie la casella, senza volume, luci né orlo; impilati con l'anello del fondo e 9 px di sovrapposizione. **Occhi «lilguy»** (dal riferimento lilguy.net, ridisegnati): due occhi grandi (raggio 0,29–0,34 del corpo) all'altezza del centro, distanti (centri a 0,39–0,43 del raggio), sclera **sempre bianca** con contorno sottile e **pupilla sempre nera**, grande (0,6–0,7 dell'occhio), tonda o ovale; forma della sclera dal seme (cerchio, ovale, a gatto inclinato, a ghianda). Lo stato **non** passa dal colore degli occhi: è un **punto di stato** sul bordo della casella in basso a destra (raggio 15 su 125, bordo nero di 4; lime al lavoro, giallo da approvare, rosa in errore, nulla da fermo e pianificato); nelle **pile** (card dei dipartimenti e degli obiettivi, coppie della barra agenda) niente punto, lo stato è il **gesto** del corpo con squash e stretch (al lavoro un ritmo, da approvare un salto ogni 3,2 s, in errore si sgonfia e si inclina, pianificato un pendolo, da libero il respiro del sonno). Restano le forme: in errore la pupilla è una X, da libero l'occhio è chiuso con una palpebra ad arco e la testa fa un lento cenno, da approvare gli occhi crescono del 15 %, al lavoro lo sguardo scandisce. Moto: un solo `requestAnimationFrame` per pagina, respiro, galleggiamento, sguardo (la coppia scivola di poco, la pupilla si sposta dentro l'occhio), palpebre con easing; solo gli orbi nel viewport si aggiornano; con `prefers-reduced-motion` posa di riposo. La perla nera con le pupille del kit (versioni 7b e 7c) resta dietro `?identita=nessuna&occhi=kit&corpo=perla`; le pelli (`?pelle=`) valgono per il corpo senza tinta; la famiglia **kit** con `?avatar=kit`. Le persone (titolare) tengono le iniziali su disco bianco; aria-hidden |
| Pagina Dipendente | stessa cornice (titolo = etichetta in maiuscolo, 36 px oltre 12 caratteri; tre numeri di oggi); testata con avatar 96 che segue il puntatore, etichetta 28, «ruolo · dipartimento · in produzione dal», chip (stato, revisione in sospeso, prompt vN, modello, colloquio), pillole Modifica / Metti in pausa / Ripeti il colloquio a 40, mansione 17, quattro numeri 48/300 a 30 giorni con badge del confronto; sezioni con intestazione e pillole: revisione di performance, oggi, rendimento (righe 56 con due valori e badge), soul prompt (documento `#F4F4F4` r28 con intaglio, 17/26; versioni come righe 56: proposta lime, corrente bianca), modello (tre card lead 236 di altezza, l'assegnato bianco; card criterio 517 con ripartizione a pillola 12: grigio `#6B6B6B` / bianco / lime), strumenti (card come le regole), budget (card attività, lime se oltre il limite del giorno) e permessi (righe con chip «Regola generale» / «Eccezione» lime), colloquio (card grigia con punteggio e barra, righe dei casi) |
| Pagina Esecuzione | stessa cornice (titolo = titolo dell'esecuzione in maiuscolo; tre numeri: passi fatti su totale, spesi con badge «oltre», tempo); testata: avatar 68 animato, etichetta 18 e «ruolo · dipartimento», chip (stato, passo n di N, modello, cliente, obiettivo), la frase «Adesso … Prossimo …» 17/25 con le parti in 500, pillole d'azione 40 (lime la principale: riprova, avvia ora, apri la richiesta), la **barra dei passi** = barra agenda 64 ferma nella testata: passi fatti come eventi bianchi 40 con il numero in cerchio nero 32 e la durata, passo in corso come segmento «adesso» `#A8E65D` con il marcatore dell'ora, passi da fare traslucidi con la stima, passo in errore rosa, pillola finale bianca con la stima di fine. Dal 2026-09-06 la barra **sta sempre dentro la pagina e si stringe da sola** (regola 24): i passi conclusi di un'esecuzione lunga (oltre quattro pillole) lasciano il nome e tengono spunta e durata, oltre tre conclusi restano gli ultimi due e gli altri si contano («+3 fatti»), i passi da fare oltre i due successivi si contano in una pillola («+2 da fare»); il passo in corso e quello in errore restano sempre per esteso; Passi come righe 56 (cerchio 40 con spunta / play / avviso / numero; in corso lime, errore grigia, da fare al 60 %); Log come righe 48 (ora, chip del tipo: Passo chiaro, Strumento, Modello, Nota, Richiesta lime, Errore rosa, Titolare nera; costo) con i filtri contati e in fondo la **barra di scrittura** (pillola bianca 56 con avatar 36, campo 15, pulsante nero 40); Output come card lead 224 (icona del tipo; da approvare lime, bozza ed errore grigie, da fare spenta) e le consegne precedenti della serie come righe dello storico; Costo: card attività 517 scura (lime se oltre il limite) con finora su stimato, ripartizione per modello a pillola e legenda, oggi su limite del giorno; strumenti come righe (chiamate, Usato / Non usato / Errore, passi, costo) |
| Pagina Costi | stessa cornice (titolo COSTI; tre numeri: spesi oggi con il badge rosa «oltre» se sopra la somma dei limiti del giorno, in 30 giorni con il badge del confronto con i 30 precedenti, «restano di N €» del budget del mese; niente pillola «Nuovo…»); cinque sezioni con l'intestazione e le **pillole del periodo** (Oggi · Ultimi 30 giorni · Da inizio anno; per modello senza l'anno, per strumento solo Oggi), ognuna con il suo stato. **Per dipartimento**: quattro card costo 316 in fila (la card Costo dell'esecuzione: spesa su limite, ripartizione a pillola 12 per modello grigio `#6B6B6B` / bianco / lime con la legenda a capo, da inizio anno per blocchi di tempo lime / bianco / grigio; riga «Quota e consegne» con il chip della quota e l'occhio; nell'intaglio un solo pulsante: la freccia, o la campanella con il punto se oltre il limite, e allora la card è lime con la ripartizione nero / bianco / grigio). **Per dipendente**: righe 56 (avatar 40, etichetta, valore del periodo, budget a barra 8 px lime o rosa se oltre, spesa con il badge del confronto, freccia), oltre sedici le pillole compatte a tre per riga con la spesa in un chip. **Per cliente**: le righe della spesa del mese (consegne approvate, oggi, quota, spesa, freccia → Richieste filtrate). **Per modello**: la card costo 517 dell'azienda e tre righe (listino, esecuzioni e quota, costo medio, totale). **Per strumento**: righe con chip Usato / Errore, la pila di chi lo ha usato con il «+N» e il costo |
| Card revisione di performance | `ncard.lime` a tutta larghezza, padding 22/24, intaglio con campanella (punto rosso) e «apri»; chip `onlime`; titolo 26/32 entro 38 caratteri per riga; tre colonne 1,25 / 1 / 1 con etichetta 11 maiuscola, evidenze come elenco (numero in pillola `rgb(0 0 0/.1)` 22 + frase 14/19, cerchietto con freccia verso la richiesta), paragrafi 13/18; riga «Decisione del titolare» separata da una linea `.12`: pillole 48 nera (prova), bianca (applica), vuota scura (modifiche), rossa (rifiuta…), link al dossier a destra |
| Tendina versioni / dossier | tendina estesa 840 (fino a 980 di altezza), chiara; riga «chi» con avatar 36; due colonne bianche r22 con chip della versione (`ink` corrente, `lime` proposta, `light` altre), paragrafi 14/21 su pillole r10: aggiunti su lime, tolti su rosa `#F9A3A3` barrati, cambiati su grigio `.045` con le parole in `mark` lime / rosa; riga dei numeri sotto una linea `.08`; tre `dcard` (Perché, Cosa ci aspettiamo, Rischi) con elenco numero + frase 12/17; azioni come nella richiesta estesa più il campo del motivo (pillola bianca 44, bordo nero a fuoco, rosso se vuoto) |
| Tendina Dipendente | 330, `#F4F4F4`, r28 a sinistra; intaglio con più/matita e titolo 22; anteprima della card; campi a pillola bianca 48 (Ruolo, Nome facoltativo) con etichetta 11 maiuscola; dipartimento a pillole 36 (scelta = nera); sei cerchi 36 per l'avatar (scelto con anello nero); azioni «Crea dipendente»/«Salva» lime 44 e «Annulla» |
| Card attività | 336×262, lime / `#4D4D4D` / scura; striscia con avatar 48, nome 15/500, ruolo 12; intaglio con campanella (punto rosso) e freccia; cerchio contornato 64 con icona; titolo 26; riga meta (coppia di avatar, data 500, "alle"); "Stato" 11; selettore a pillola 48 (bianca su lime, nera su grigio/scuro) con testo e chevron: nella card di un solo dipendente un chip di stato («In corso» lime, «Errore» rosa, l'ora) al posto dell'avatar, che sta già nella striscia; nelle card con più dipendenti (obiettivi) la pila di avatar e il badge «+N» dopo la pila, mai sotto (2026-09-04); mail vuota; video nero |
| Videochiamata | 240 di altezza, gradiente grigio-caldo, avatar grande, controlli in vetro + rosso, espandi e chiudi |
| Riepilogo | `#F4F4F4`, r28; cerchio nero con bacchetta, "Riepilogo" 26, freccia vuota; colonna orari 12 con badge rotondi 22 (lime "mi piace", rosa "stella") e linea `#C8C8C8`; card Documenti `#E4E4E4` r22 con intaglio per il download e due miniature 118 (`#D2D2D2`, foglio bianco, etichetta `#A7A7A7`); card Obiettivo con matita, testo 13/19 con parti in 500 (lime su mobile) |
| Mobile | cornice 300×620 (bezel nero, r52), barra di stato "9:41", navigazione in basso a pillola nera 64 con quattro cerchi 44 (il primo bianco) e cerchio lime "video" a sinistra; WORKSPACE chiaro `#E0E0E0`; agenda nera con pannello lime, ore 38/300 ("14:00"), eventi bianchi, marcatore nero, blocco tratteggiato; videochiamata con Riepilogo. **DGT sul telefono (2026-09-05, versione 11, prima metà)**: la stessa cornice con l'ora dell'azienda; navigazione con i quattro cerchi del rail della Console e, al posto del video, la **campanella lime con il numero da approvare** (badge nero); **Da approvare** chiara (logo DGT, cerchio bianco dei filtri, iniziali del titolare; titolo 30/36; due numeri 26/300 con badge; la richiesta corrente come card lime r24 con striscia avatar 40, intaglio con campanella e freccia, icona del tipo 48, titolo 20/24, cliente · ora, riga «Decidi» con il chip tipo · costo · passi e i quattro cerchi 44 apri / commenta / approva nera / rifiuta rossa; «In coda» a righe bianche 48 con la corrente lime; riga «Riepilogo di oggi»; sotto la navigazione una fascia di 112 px con il contenuto che scorre sfocato (blur 14) e appena scurito (nero .16), sfumata in alto, perché la campanella lime resti distinta dalle card lime che le passano sotto); **Richiesta** nera (indietro e frecce della coda 44, chip 24, titolo 24/28, riga «chi · cliente · consegnata alle», documento bianco r24 con chip dell'allegato e testo 14/21, card scure r24 «Chi la propone» e «Nota del dipendente», barra fissa in basso: Approva lime 48 larga, matita, X rossa, con dissolvenza nera; il rifiuto trasforma la barra in etichetta 11 maiuscola, campo a pillola bianca 48 e pillole «Rifiuta» rossa / «Annulla»). **Seconda metà (2026-09-06, versione 12)**: **Riepilogo di oggi** sul fondo del Riepilogo `#F4F4F4` (indietro `olight` 44 e chip della data 32; cerchio nero 44 con la bacchetta e titolo 22/26; tre numeri 26/300 al lavoro / da approvare / spesi oggi; linea del tempo con colonna 36, ora 11, badge rotondi 22 lime / nero / bianco / rosa e segmenti `#C8C8C8`; `dcard` r20 con intaglio 36: Consegne con due miniature 96 e le righe approvate e spesa, Obiettivo del mese lime con la matita, «Diario di oggi» a voci 12/16 con l'etichetta in 500 e linee `.08`; riga lime «Da approvare» in fondo); **stato vuoto** a coda finita: la prima schermata prende il fondo `#F4F4F4`, card bianca r24 con cerchio nero 48 e spunta, «Niente da approvare» 20/24, riga 13/18, e sotto il riepilogo; **revisione**: chip «Revisione del soul prompt / del modello» e chip lime «decide il titolare», titolo corto 24/28, due card bianche r24 una sotto l'altra con il chip della versione (nero corrente, lime proposta) e le differenze 13/19 su pillole r10 (lime aggiunti, rosa barrati, grigio `.045` con `mark`), tre righe di numeri; tre card scure Perché / Cosa ci aspettiamo / Rischi con le evidenze (pillola 22 `rgb(255 255 255/.1)` sopra la frase 12/17), «Chi riguarda», «Nota del sistema»; barra a due righe: «Prova su 20 esecuzioni» bianca 48 larga, poi Applica lime 48 larga, matita, X rossa, con dissolvenza di 190. **Versione 17 (2026-09-07)**: in cima alla prima schermata il **quadro del giorno**, la barra «Oggi in azienda» ridotta ai 254 px della colonna — una griglia due per due (118 px in tutto) con l'occhiello «OGGI IN AZIENDA» e la data 10/14 maiuscoletto, e quattro caselle a pillola alte 40 (icona cerchiata 30 o pila di avatar 22 senza «+N», numero 18, parola 11): traslucida con filetto `.09` «approvate» e «dopo», bianca piena «al lavoro», rosa `#F9A3A3` «ferma». Il quadro porta via 118 px e **si pagano togliendo**: la riga dei due numeri grandi sparisce, perché «approvate oggi» è lo stesso conto della casella «approvate» a 60 px (correzione 16a) e «da approvare» lo dice il titolo, che se lo prende accanto (26/32 con il numero 26/300 a destra, non 30: a 30 andrebbe a capo). Restano visibili 248 px della card della richiesta su 256, con la riga di approva e rifiuta sopra la navigazione. Le tab della navigazione sono tutte e quattro vive: la seconda apre **Dipartimenti**, l'elenco dei quattro con la pila dei suoi e il numero lime di chi aspetta, e il **dipartimento aperto**, che è la pagina Dipartimento della Console con i suoi tre numeri e le sue cinque sezioni, «Da approvare» seconda invece che quarta; il titolo si stringe a 22 px oltre i dodici caratteri |
| Pagina Agenda | stessa cornice (titolo AGENDA; tre numeri: eventi di oggi con quanti al lavoro, ancora da partire con l'ora del primo, scadenze in settimana con quante in ritardo). **Barra del giorno**: card bianca r28 con titolo 22, data lunga in pillola 44 e legenda; dentro, la **pista** r26 chiara `#EDEDED` da un'ora tonda all'altra, con le ore 11 sopra e le linee `.07`, i **blocchi** 36 a pillola su corsie (il blocco va nella prima corsia libera, larghezza minima 3,5 % perché ci stia l'avatar 28): lime al lavoro e da approvare, bianco concluso, tratteggiato `rgb(0 0 0/.3)` pianificato, rosa in errore, ognuno con avatar, titolo in 500 e le ore; il segno di **«adesso»** come nella barra della cornice (linea nera, marcatore 22 con l'ora, punto in fondo). Poi le card attività degli eventi con le pillole che filtrano; le **scadenze** (a sinistra la `dcard` dell'obiettivo del mese, a destra righe 56 con data e giorni che mancano, consegne e prossima, avanzamento a barra 8, chip di stato); **la settimana**: sette righe r26 con nome del giorno e data (chip lime «Oggi») e le voci come pillole 40 (pianificati che si ripetono, consegne e scadenze bianche, rosa se l'obiettivo è in ritardo) |
| Pagina Chat | stessa cornice (titolo CHAT; tre numeri: conversazioni, da leggere con il badge, messaggi di oggi). Due colonne 396 + resto: a sinistra i **fili** come righe 76 (avatar 52, etichetta 15, ultimo messaggio 12 con «Tu:» quando è del titolare, a destra ora 11 e il numero da leggere in pillola lime; la riga aperta è bianca e il numero diventa nero), con le pillole che filtrano; a destra il **filo aperto**: testata (avatar 68, etichetta 18, chip di stato e conteggio, pillole «L'esecuzione» e «La sua pagina»), corpo in un riquadro r28 contornato `.1` con le **bolle** (dipendente a sinistra scura con avatar 36, titolare a destra bianca con le iniziali; testo 14/20, ora 11 sotto; la riga di sistema al centro come chip chiaro) e le consegne come riga bianca 52 con approva nera e rifiuta rossa; sotto, la riga che dice quando il dipendente legge e la **barra di scrittura** del riferimento (la stessa dell'Esecuzione) |
| Campione colore | 220×220 r38, bordo 4 `#565656`, cursore con etichetta bianca |
| Card sfida | `#4D4D4D` r30, icona in cerchio contornato 80 (lime), testo 14/20 centrato; una lime |
| Passo del processo | cerchio contornato 64 con icona + pillola `#4D4D4D` 64; il primo lime; frecce tratteggiate |
| Editor a nodi (specimen, sezione 07) | rail di tessere 44 r14 (attiva lime luminosa), titolo 26 con percorso e tag rosso, tab a pillola, canvas puntinato 18, nodi 96 r18 con riflesso, nodo agente 208×100, nodo selezionato lime con i campi e il testo all'inchiostro, nodo disattivato con cestino, connettori `#B8FC64` con bagliore, mini-mappa, zoom, pillole in basso a destra, barra chat con ID monospazio |
| **Canvas del workflow** (prodotto, versioni 20, 24 e 27) | il precedente portato dentro la Console. Griglia puntinata 18 su `--dots-box`; nodi 208×96 r18 su `--card` con riflesso; porte 10 px con l'etichetta 10/14 sotto il nodo (spente se il passo non è ancora stato fatto); nodo aperto con l'orlo lime e i suoi campi — altezza **calcolata**; ultimo nodo **il titolare**, orlo tratteggiato, lime pieno quando aspetta; sopra il canvas la **tab a pillola dei due tempi**; barra in fondo con il conto e l'uscita all'esecuzione. **Due forme, un canvas**: «l'ultima volta» è una catena avvenuta, disposta da sola su una **serpentina** di quattro nodi per riga (la riga dispari all'indietro), connettori da un nodo al seguente, punteggiati e chiari per i passi da fare, tratteggiati verso il titolare. «La prossima volta» è un **grafo** (versione 24): **posizioni libere** agganciate a 18 px, righe tutte da sinistra a destra (passo **234**×216, multipli dei 18 px della griglia), **nodo d'innesco** in testa col fianco arrotondato a 44 e senza presa d'entrata, **prese sui fianchi** (a destra si esce, a sinistra si entra; il titolare non ha uscita), archi da `G.archi` con l'etichetta **sul connettore** e i due comandi «+» e «×» sul punto di mezzo, chip del conto in alto a sinistra, **zoom interno** (0,6–1,5 con `transform`) e **mini-mappa** 200×120 che compare quando serve. Dalla **versione 27** lo zoom e la mappa valgono su **tutte e due le tab** (prima erano `ramo ? zoom : 1`, cioè metà pagina senza zoom), e il canvas ha un interruttore **`soloLettura`** che spegne prese, «+» e «×» sull'arco, trascinamento del nodo, «Riordina» e «Aggiungi» lasciando in piedi il nodo che si apre, lo zoom e lo spostamento della vista. **Sul telefono è lo stesso canvas**, in sola lettura, come card dentro la pagina che scorre: si entra a «tutto dentro» (278,4 / 910 = **0,306**, tutto il grafo nella larghezza che c'è) e il tocco su un nodo porta a **scala 1 centrato su quello**, dove il testo torna a 14 px e il nodo apre i suoi campi. Due gesti del dito: trascina-la-vista in orizzontale e pinch (`touch-action:pan-y` lascia il verticale alla pagina, perché la card è alta `basso × zoom` e in verticale non resta mai niente fuori). Le posizioni **non si ricalcolano mai** (regola 42): il prezzo è 632 px di scorrimento laterale a scala 1 |

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
- **Prima di scrivere, il dubbio progettuale passa dal consiglio** (regola fondamentale del 2026-09-07, per esteso in
  `CLAUDE.md`): una scelta che cambia che cosa il prodotto è o come lo si usa, e che ha più di una risposta difendibile,
  va portata alla skill `llm-council` con il contesto scritto per esteso, e il verdetto va in `PROSSIMA-SESSIONE.md`
  marcato «da confermare» finché l'utente non risponde. Quello che si può misurare o contare non è un dubbio
  progettuale: lì si guarda la pagina.

## 9. Verifiche fatte

> **Lacuna del metodo, trovata l'8 settembre 2026 e da colmare.** Le 385 verifiche asserivano che un controllo
> **esistesse nel DOM** e che il clic funzionasse, mai che si **vedesse**. Playwright, prima di cliccare, porta
> l'elemento al centro del viewport: così un controllo coperto da un elemento `position:fixed` passa la prova e
> resta invisibile all'utente. È successo davvero: la pillola d'ingresso ai workflow della versione 20 e le pillole
> del periodo delle Consegne sono **invisibili allo stato predefinito**, coperte dalla tendina del titolare (330 px
> fissi a destra contro una `.a-main` larga 1312 che finisce a x 1414: **gli ultimi ~304 px di ogni pagina le
> stanno sotto**). Lo era anche un controllo precedente alla versione 20. **Da qui in avanti ogni controllo
> cliccabile vuole un'asserzione di visibilità** (`document.elementFromPoint` sul centro del suo rettangolo, allo
> scroll in cui la pagina si apre), non solo di esistenza. Vedi `DIREZIONI.md` 7.1.

- Screenshot desktop (1440) e mobile (390) con Chromium: nessun overflow orizzontale, font Urbanist
  caricato (300–600), nessun errore in console.
- Confronto visivo sezione per sezione con le immagini originali a 1920 px.
- Differenza voluta: le card delle sfide sono su una griglia regolare invece che sparse attorno al
  titolo, per restare leggibili su mobile.
- Le schermate del prodotto hanno **sei** prove cliccate con Playwright in `schermate/direzioni/prove/` (Console
  160, mobile 83, Costi 50, Agenda e Chat 56, Workflow 80, **Routine 49**; **478 verifiche** in tutto — erano 385 alla
  versione 20 e 421 alla 21) e gli screenshot in `schermate/direzioni/screenshot/` (**77 catture**). La quinta e la
  sesta stanno in un file loro perché `console.js` sceglie tre sezioni con `nth-of-type`: aggiungerle una prova che ne
  aggiunge una li sposterebbe. La manutenzione del
  2026-09-06 (versione 14) è stata verificata con trentuno catture identiche byte per byte prima e dopo e con le impronte
  degli stili calcolati di ogni elemento (`DIREZIONI.md`, «Versione 14»); le pagine Agenda e Chat (versione 15) con
  venticinque catture identiche byte per byte e le cornici del telefono confrontate con l'albero precedente. La
  barra «Oggi in azienda» (versione 16) confrontando a pixel le venticinque catture della Console prima e dopo: il riquadro
  delle differenze è sempre quello della barra (`x 426–1203, y 34–85`), tranne le due pagine dell'Esecuzione, dove cambia anche
  la barra dei passi, corretta nella stessa sessione; il telefono è identico byte per byte. La
  correzione degli avatar decentrati (15a) è stata verificata misurando, su ogni avatar di ogni pagina, lo scarto fra il
  centro del disco disegnato e il centro della casella: mille avatar, scarto massimo 0 px (prima fino a 9,5). La versione 17
  è verificata con un censimento automatico dei controlli senza azione: **zero** nelle settantadue intestazioni di sezione
  delle nove pagine, a undici e a quaranta; la ricerca e le pillole di sezione sono provate cliccando (filtrano davvero, il
  fuoco resta nel campo, Esc chiude); le catture della sola barra `a-barra-*.png` restano identiche byte per byte, prova che
  la barra della versione 16 non è stata toccata. La versione 18 (le frecce di riga, regola 26) è verificata con lo stesso
  censimento portato sulle righe: **zero** frecce senza azione su tredici pagine, quattro viste e le due taglie dell'azienda
  (erano 260), le sole due dichiarate stanno nell'anteprima dell'editor; **65 liste** con più di una riga hanno tutte le
  righe sulla stessa griglia; la revisione passata del prompt apre davvero il confronto v6/v7. E dal confronto a pixel delle
  quarantotto catture: **trentaquattro identiche byte per byte** — fra queste tutte e dieci quelle del telefono, la home, la
  Chat, l'Agenda, la barra e l'editor, che non avevano frecce inerti — e quattordici cambiate, ognuna solo dove stanno le
  righe e le card toccate (`a-riepilogo.png` cambia in un riquadro di 62×63 px: l'intaglio della card del diario).

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
9. Pagina Dipartimento nella stessa cornice, **sei sezioni** (dalla versione 19): Oggi in ‹dipartimento› (esecuzioni:
   al lavoro, errore, pianificate) · **Consegne di oggi** (le cose create dalle sue esecuzioni, che si aprono nella
   tendina larga; regola 27) · Dipendenti (+ card «Aggiungi») · Obiettivi (card con barra di avanzamento a pillola;
   lime = in ritardo) · Da approvare dal dipartimento · Spesa del mese per cliente. Una consegna si apre nella **sua pagina** (regola 27), non in una tendina. Ogni pagina interna ripete la cornice: barra in alto,
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
22. **Le pagine Agenda e Chat** (2026-09-06, versione 15): i due cerchi del rail che restavano inerti. L'**Agenda** parte
    dalla barra «Oggi in azienda»: la barra agenda del riferimento allargata alla giornata (i blocchi su corsie che non si
    sovrappongono, il segno di «adesso», la pista chiara perché il lime resti l'attenzione del titolare: al lavoro e da
    approvare), le card degli eventi con le pillole che filtrano davvero, le scadenze con l'obiettivo del mese e i sette
    giorni a righe. La **Chat** parte dalla barra di scrittura dell'Esecuzione: un filo per dipendente (le note del titolare
    a destra bianche, le risposte del dipendente a sinistra scure, la riga di sistema al centro), con le consegne che
    aspettano dentro il filo e le stesse decisioni di sempre. **Una nota scritta nell'Esecuzione entra nel log e nel filo**:
    è una sola conversazione. Un solo aggregatore in `dati.js` (`giornata`, `settimana`, `scadenze`, `filoDi`, `scrivi`)
    alimenta la Console e il telefono, dove le due tab della navigazione in basso portano alle stesse tre schermate (elenco
    dei fili, conversazione con la barra di scrittura, agenda sulla linea del tempo del Riepilogo). Ci si arriva dal quarto
    e dal quinto cerchio del rail, dal cerchio della barra «Oggi in azienda», dalla pillola «Sposta» delle esecuzioni
    pianificate, dai cerchi «commenta» delle card e delle tendine e dalla pillola «Scrivi a …» dell'Esecuzione.

23. **Un elemento che sfora la sua casella si scala, non si allarga** (2026-09-06, correzione dell'utente: «in ogni pagina
    gli avatar piccoli sono decentrati e spostati un po' verso il basso»). L'avatar cresce oltre la casella (115 % con la
    perla, 128 % con il corpo piatto) e lo faceva con `width` e `height` in percentuale: dentro una griglia con la riga
    automatica la percentuale in altezza è ciclica, la riga cresce con l'immagine e l'eccedenza cade **solo in basso**
    (fino a 9,5 px sull'avatar grande). Ora l'SVG riempie la casella e la crescita passa alla proprietà `scale`, che
    scala attorno al centro e non tocca la griglia: stessa misura del disco, centrato. La regola vale per qualunque
    elemento che debba sforare: si scala dal centro, non si allarga in percentuale dentro una riga automatica.

24. **La barra «Oggi in azienda» è il quadro del giorno, non una linea del tempo** (2026-09-06, versione 16, dopo lo studio UX
    chiesto dall'utente: «non capisco a primo impatto il suo utilizzo»; strada confermata dall'utente lo stesso giorno). La barra del riferimento *sembra* una linea del tempo
    e in DGT non lo era: la scala cambiava di otto volte fra un blocco e l'altro (3,4 px/min su una consegna, 13,4 sul segmento
    in corso, 0,004 sulle quattro ore e mezza di vuoto del pomeriggio, rappresentate da 1 px di separatore), il marcatore
    dell'ora stava al bordo del segmento verde e non a un'ora (a 40 dipendenti lo stesso «10:42» si spostava di 12 px), gli
    stati erano codificati in riempimenti che distano 1,1–1,2 : 1 di contrasto, e la lista che leggeva non conosceva né gli
    errori né le consegne da approvare: **delle 8 esecuzioni della giornata ne mostrava 4, e tacevano proprio le due su cui il
    titolare deve agire**. Ora dentro la pista ci sono cinque **caselle contate e nominate**, lette dal modello vero:
    *N approvate*, *N al lavoro* (bianca piena, con la pila di chi lavora), *N ferma · nome* (rosa `#F9A3A3`),
    *N dopo · dalle HH:MM*; ognuna porta dove si agisce (le richieste, l'esecuzione ferma, l'Agenda) e sopra i sedici dipendenti
    i dettagli cedono il posto ai numeri. Le caselle traslucide hanno il filetto `inset 0 0 0 1px rgb(0 0 0/.1)` del chip della
    data, perché un oggetto si deve staccare dal suo fondo anche quando il significato sta nelle parole. Il *quando* lo dice la
    pagina Agenda, che ha la pista vera con le ore proporzionali. **Scostamento dal riferimento**, dichiarato: cade l'asse del
    tempo (orari fra i blocchi, separatori, marcatore dell'ora); resta tutta la forma. Lo studio, le due strade scartate («i tre
    momenti», «la giornata a misura») e i numeri stanno in `schermate/direzioni/DIREZIONI.md`, «Versione 16»; `?barra=0` rimette
    la barra di prima. Stessa sessione, sullo **stesso componente**: la barra dei passi dell'Esecuzione con sette passi cresceva
    a 2180 px dentro un contenitore da 1312 e `.a-app` la tagliava in silenzio (una griglia senza colonne dichiarate porta la
    colonna implicita a `max-content`: si vincola con `grid-template-columns:minmax(0,1fr)`), e adesso si stringe da sola invece
    di uscire. **Un elemento fisso non ripete quello che un altro elemento fisso dice già** (correzione 16a, stessa sessione):
    la casella «aspettano te» è stata tolta perché la linguetta lime «N da approvare» (`.a-mini`, `position:fixed`) è su tutte
    e sette le pagine e per giunta apre la coda — nella home e nel Dipartimento lo stesso numero compariva tre volte sulla
    stessa schermata. La divisione: **la barra dice che cosa fa l'azienda, la linguetta che cosa deve fare il titolare.**
25. **Un controllo si vede solo se fa quello che promette, con i dati che ci sono già** (2026-09-07, versione 17). Due prove:
    *serve* in questa sezione? *si può fare* col modello? Chi le passa diventa vero, chi ne fallisce una sparisce; non ci
    sono controlli per figura. Nella Console valeva per 263 elementi contati (non 61 come diceva la lista: mancavano le
    settantasei pillole di filtro delle intestazioni). In concreto: **«cerca» resta dove la lista può passare le dodici
    righe** in una delle due taglie dell'azienda — sotto, la lista sta in una schermata e si legge — ed è un campo che filtra
    mentre si scrive, aperto al posto del cerchio; **il cerchio «filtri» non resta da nessuna parte**, perché dove ci sono le
    pillole il filtro è già lì e visibile e dove non ci sono non ha niente da aprire; **«scarica» nemmeno**, perché la pagina
    gira anche come artefatto, in una sandbox dove uno scaricamento non parte, e un pulsante che non scarica è una promessa;
    **una pillola resta se è un filtro su un campo che il modello ha** (stato, dipartimento, tipo, periodo, esito) e sparisce
    se chiede un dato che non esiste o se filtrerebbe una lista che quel valore non contiene. Corollario della regola 24: il
    conto «N di M» sta nel **contatore della sezione**, non anche nel campo di ricerca a trecento pixel. Da 22 cerchi «cerca»
    ne restano 7, da 22 «filtri» nessuno, da 6 «scarica» nessuno, da 76 pillole inerti ne diventano vere 57. Restano fuori,
    dichiarati, i 45 indicatori disegnati come cerchi nell'intaglio delle card e nella cornice, che dicono uno stato e
    vengono dal riferimento.

26. **La freccia di riga resta dove la riga ha una destinazione e sparisce dove non ce l'ha; e con lei se ne va la sua
    colonna, se in quella lista non ce l'ha nessuna riga** (2026-09-07, versione 18: la regola 25 portata dalle
    intestazioni alle righe). Contate aprendo le pagine, le frecce senza azione erano **260** su tutte le pagine e tutte
    e due le taglie dell'azienda (86 sull'insieme di riferimento: le nove pagine a undici, più la tendina, il Riepilogo e
    l'editor); ne restano **2**, dichiarate. Tre conseguenze che valgono oltre questo caso:
    - **la colonna segue la freccia, ma la decide la lista, non la riga.** Ogni riga del prodotto (`.hrow`, `.crow`,
      `.lrow`) finisce con una colonna da 32 px per la freccia. Se nessuna riga della lista ha una destinazione la colonna
      cade (classe `nofr`) e il contenuto si riprende i 42 px; se qualcuna ce l'ha la colonna resta e la cella è vuota,
      perché due righe della stessa lista non possono avere due griglie. La prova lo controlla su 65 liste.
    - **l'intaglio è il taglio che fa posto ai pulsanti: senza pulsanti è un buco per niente.** Otto card (le quattro
      regole di approvazione, l'esito del colloquio, due consegne, il diario del Riepilogo) avevano nell'intaglio solo la
      freccia inerte: hanno perso la freccia e con lei l'intaglio. Alla card dell'esito i 120 px che il titolo teneva
      liberi per i pulsanti sono tornati al sottotitolo, che prima finiva tagliato.
    - **applicare la regola non è solo togliere.** Una famiglia su diciotto una destinazione ce l'aveva e non era
      collegata: la revisione passata del soul prompt apre il confronto fra le due versioni, che nel prodotto esiste già.
      Lì la freccia resta e diventa vera. La domanda giusta non è «questa freccia funziona?» ma «questa riga dove
      porterebbe?»: se una risposta c'è, si collega; se non c'è, sparisce.
    L'eccezione dichiarata: la card del dipendente **in anteprima** dentro l'editor tiene la matita e la freccia, perché
    non è un controllo ma il disegno di come verrà la card — toglierle farebbe mentire l'anteprima.

27. **La cosa creata da un'esecuzione si chiama «consegna», ed è una sola cosa con un solo nome** (2026-09-07,
    versione 19). Prima ne servivano quattro — `output` nel codice e nel titolo di sezione, «Consegne» nel contatore
    della *stessa* intestazione, `allegato` nella richiesta, `consegne` negli obiettivi e nei costi — e il prodotto
    rispondeva in **quattro modi diversi** alla domanda «quante cose abbiamo creato» (gli obiettivi 31 su 59, gli
    output 9 su 18, le richieste decise 16 su 20, l'aggregatore dei costi 318). Le consegne vivono in una **sezione
    della pagina Dipartimento**, seconda su sei, subito sotto «Oggi in ‹dipartimento›» perché ne sono il risultato:
    18 a undici dipendenti (7 di Sviluppo, 5 di Marketing, 4 di Vendite, 2 di Amministrazione) e 40 a quaranta, in
    card di 316×294 px, quattro per riga, con cinque pillole di filtro. Nessuna pagina nuova, il rail resta a sei voci,
    e sul telefono la stessa sezione in righe. Tre conseguenze che valgono oltre questo caso:
    - **quello che si legge ha una pagina; la tendina serve a decidere.** Aprire una consegna apre la **sua pagina**
      (`?pagina=consegna&consegna=c1-0`, sul telefono la schermata 9), non la tendina: la tendina è ancorata al
      pannello delle approvazioni, ha il pager «1 di 4» e le quattro decisioni, e serve a decidere in fretta **senza
      perdere la coda**. Sono due mestieri e vanno tenuti separati (scelta dell'utente, che la prima versione aveva
      sbagliato). La pagina porta quello che la card non regge — chi l'ha fatta, il passo con durata, costo e
      strumenti, le voci di log di mentre la faceva — e, se la consegna è già uscita, il **documento vero della
      richiesta**, con tre strade per andare a decidere. **La card serve a trovare, la pagina a sapere, la tendina a
      decidere.**
    - **una card larga 316 px regge tre fatti, non cinque, e i tre si scelgono misurando.** La riga di stato lascia al
      testo **30–52 px** («Passo 3 · 23,6 €» ne chiede 89), quindi lì ci sta il solo chip; sotto il titolo `.meta` non
      va a capo e sfora di 29 px, quindi il verbo che il chip dice già si toglie e resta l'ora. Quello che avanza
      scende nella tendina.
    - **in una testata ci stanno solo i numeri che hanno un valore, e non sempre tre.** La Consegna ha i titoli più
      lunghi del prodotto (32 caratteri) e con tre numeri la testata sfora di 77 px; e nove consegne su diciotto non
      nascono da un passo dichiarato, quindi due dei tre numeri sarebbero «—». Due numeri, e solo quelli che ci sono:
      provato su tutte e 58 le pagine, il caso peggiore ha 118 px di margine.
    - **una sezione nuova sposta gli indici di tutte quelle dopo.** Aggiungendo la sesta si sono rotte tre prove e una
      cattura che puntavano a `section:nth-of-type(5)`: da qui in avanti prove e catture cercano la sezione **dal
      titolo**, non dalla posizione.

28. **Un workflow è il lavoro dichiarato di un dipartimento, disegnato a nodi; e un nodo è un passo, non un
    dipendente** (2026-09-08, versione 20). L'utente ha scelto **l'editor a nodi vero** del secondo riferimento,
    contro il parere unanime di un consiglio; la parola è **workflow**, sua. Che cosa ci sta dentro l'ha deciso una
    misura contro un 5-0: il consiglio voleva il **nodo-dipendente**, e tutti e cinque i consiglieri hanno poi scritto
    da soli l'obiezione giusta — il passaggio di mano fra due dipendenti nei dati non c'è. Contato: **zero casi**, in
    tutte e due le taglie (quello che esiste sono 4 riferimenti alla *propria* consegna passata e 11 `serie`, tutte
    dello stesso dipendente). **Il nodo è un passo**, che nel modello c'è per davvero — 43 a undici, 156 a quaranta,
    con modello, strumenti, costo, durata ed esito — e i workflow sono **6 a undici** e **26 a quaranta**, da 4 a 11
    nodi, fino a **36 elementi** sul canvas contro i 17 della figura di riferimento. Quattro conseguenze:
    - **l'ultimo nodo è il titolare, e porta la regola che ferma lì la consegna.** Non è un dipendente in più:
      l'ultimo passo di ogni dipartimento è già «Consegna al titolare», e la consegna lì si ferma davvero. Il nodo
      porta il nome di una delle quattro regole di `m.regole`, quindi **il workflow non sostituisce le regole di
      approvazione: le fa vedere**. È così che il canvas mostra il punto in cui il titolare è il collo di bottiglia
      della sua azienda, senza inventare un secondo lavoratore. Il nodo del titolare **non porta un avatar in tinta**:
      la regola 19 dice che il disco in tinta è un dipendente AI.
    - **la delega si dichiara prima di essere accesa, e nasce spenta.** «Firma anticipata» vuol dire firmare in
      anticipo le uscite che rispettano quel workflow, e si accende **un workflow alla volta**. I tre freni —
      soglia di costo, perimetro, scadenza — si disegnano sempre, anche da spenta, e portano numeri misurati (la
      soglia dal costo vero del workflow, il perimetro dal cliente dell'esecuzione). Finché è spenta la coda resta
      esattamente com'è: **la spina dorsale non si riscrive per costruire il posto dove un giorno la si riscriverà.**
    - **un canvas dentro una cornice che si scala non si trascina: si stende.** Niente pan, niente zoom, niente
      mini-mappa (regola 17: due zoom annidati litigano). I nodi si dispongono su una **serpentina** calcolata nella
      funzione che stampa — **quattro** per riga dalla versione 21 (erano cinque), la riga dispari all'indietro così i
      connettori non si incrociano — e gli
      archi rileggono le stesse coordinate: nessuna misura presa dopo il disegno, quindi la pagina è identica a ogni
      giro. Su uno schermo stretto lo stesso oggetto **si gira di novanta gradi** e diventa una colonna: non un
      canvas rimpicciolito, la stessa cosa letta per lungo.
    - **una pagina nuova non deve costare una sezione.** L'ingresso ai workflow è una **pillola nell'intestazione**
      della prima sezione del Dipartimento: zero sezioni aggiunte, zero pixel, zero voci nel rail, e gli indici
      `nth-of-type` di tre prove e due catture restano al loro posto. Una settima sezione sarebbe costata ~700 px
      misurati e li avrebbe spostati tutti.
    Il perimetro dichiarato: la sezione dice «di oggi» e mostra le consegne delle esecuzioni correnti. Il modello non
    ha un orologio (`azienda.ora` è fisso), quindi il «tempo reale» che il prodotto può promettere è *lo stato al
    momento in cui si apre la pagina*, con i quattro stati che `giornata()` distingue — e va detto così, non di più.

29. **Un controllo si asserisce visibile, non presente; e la colonna riserva la banda su cui la tendina galleggia**
    (2026-09-08, versione 21). La tendina del titolare è `position:fixed` sui 330 px di destra e `.a-main` le passava
    sotto per 304 px: contati su dieci pagine per due taglie e due stati della tendina, **66 controlli nascevano
    coperti** e altri **40 stavano in una striscia che non scorreva**, cioè non li raggiungeva nessun gesto. Le 385
    prove non ne avevano preso nemmeno uno, perché asserivano la presenza nel DOM e il clic — e **Playwright porta
    l'elemento al centro del viewport prima di cliccarlo**, quindi lo scopre da solo. La colonna adesso finisce dove
    comincia la tendina (**1008 px**, non 1312) e non dipende dallo stato del cassetto, così la pagina è la stessa
    aperta e chiusa. Tre conseguenze che valgono oltre questo caso:
    - **due difetti diversi, contati separatamente.** *Coperto* da un elemento fisso è sempre un difetto. *Tagliato*
      dal proprio contenitore lo è **solo se quel contenitore non scorre**: le strisce di pillole e le file di card
      sfumano con una maschera e si scorrono, ed è disegno, non difetto. La domanda giusta non è «è coperto adesso?»
      ma «esiste **uno** scorrimento in cui non lo è?»: senza quella distinzione la verifica del telefono segnalava
      tre righe che invece si raggiungono benissimo.
    - **una maschera che sfuma non è un modo di nascondere un controllo.** `.shead .filters` e `.frow .pills` erano
      `overflow:hidden`: quello che non ci stava spariva, ed erano 40 pillole di filtro già irraggiungibili prima
      della banda. Adesso scorrono, con la stessa maschera e la barra nascosta — lo schema che `.cards.riga` usava
      già nel repository.
    - **quando lo spazio si stringe, la regola di condensazione che il componente ha già si stringe con lui.** La
      pista della barra dei passi scende da ~990 a 670–760 px: restano per esteso il passo in corso e **il primo**
      successivo (erano due), i conclusi lasciano il nome oltre i **tre** (erano quattro), i nomi si troncano a
      140 px (erano 190). Sette esecuzioni su undici sforavano; zero adesso, a tutte e due le taglie.

30. **Chi ha deciso al posto del titolare è un riferimento che deve risolvere, mai una stringa libera** (2026-09-08,
    versione 21). Tre consegne del prodotto sono uscite senza la firma del titolare, e **due su tre erano firmate da
    una regola che non esiste**: il campo diceva `regola: 'Follow-up'` e in `m.regole` non c'era niente con quel nome.
    Un difetto vecchio che nessuna delle 385 prove poteva prendere, perché nessuna leggeva quel campo. Adesso è
    `deciso: { tipo: 'regola' | 'routine', id }`, la riga stampa **la parola che corrisponde a quello che il
    riferimento apre**, e se non risolve non stampa un nome inventato: dice che non si sa quale, e un'invariante nelle
    prove lo prende a undici e a quaranta. Due conseguenze:
    - **la regola permette, la routine agisce.** Sono due autori diversi e vanno distinti: `g2` «Report interni» non
      ha *deciso* il report di ieri, ha reso lecito che la routine delle 18:00 lo mandasse. Perciò `r8` resta una
      regola — è l'unico dei tre casi in cui il campo diceva il vero — e le altre due diventano routine.
    - **si nomina, ma non si promette una porta che non c'è.** La riga dice il nome della routine e **non porta la
      freccia**: la pagina delle routine non esiste, e la regola 26 vieta di promettere una destinazione che non c'è.

31. **Una routine esegue, non decide: vince la regola d'azienda, e la clausola può solo stringere** (2026-09-08,
    versione 22, conferma c). Il consiglio della versione 21 aveva nominato la precedenza e **nessuno l'aveva
    scritta**: quattro pareri su cinque lasciavano vincere la routine senza accorgersene. Scritta, la precedenza
    trova nel modello i casi che nega: `regolaPer(r)` dice quale regola **attiva** governa una richiesta (la più
    stretta prima: sopra la soglia si approva sempre, poi le uscite verso i clienti, poi le liste, poi i report), e
    `contrastoDi(r)` è una richiesta uscita **senza** il titolare mentre la sua regola dice «Sempre da approvare». A
    undici non ne esiste nessuno; **a quaranta ne escono due** — un post e una lista verso clienti veri, decisi da una
    routine. Il dato non si corregge di nascosto: la riga porta una pillola rosa che dice contro quale regola, e una
    prova ne fissa il conto a 0 e a 2. Due conseguenze:
    - **una regola spenta che resta in pagina è decorazione** (conferma d). `g4` «Spese sopra 50 €» era spenta.
      Accesa, la card adesso stampa quante richieste governa — e sono **zero**, perché la richiesta più cara del
      modello costa 10 € e la consegna più cara 33,80. Il numero dice la verità che l'accensione da sola nascondeva:
      la soglia, non lo stato, è la cosa da sistemare. Ogni richiesta è governata da **una regola e una sola**, e la
      somma dei quattro conti fa il totale: 20 su 20 a undici, 35 su 35 a quaranta.
    - **«Approvata» si dice solo se l'ha approvata il titolare** (conferma b). Tre richieste erano uscite senza di lui
      e la riga diceva lo stesso «Approvata», in lime: l'autore vero stava in fondo in grigio, e il participio era
      l'affermazione principale. Adesso dicono **«Uscita»**, in pillola neutra con l'icona dell'invio, e la pagina
      della consegna dice «Uscita senza la tua firma» invece di «Approvata dal titolare». **Il lime resta la firma del
      titolare e non si presta a nient'altro.**

32. **Il lavoro dichiarato e il lavoro avvenuto sono un oggetto solo visto in due tempi** (2026-09-08, versione 22,
    scelta dell'utente sulla domanda 2 del consiglio). Comporre vuol dire scrivere passi non ancora eseguiti, e la
    domanda era su quale oggetto scriverli. La risposta non era fra le tre strade proposte: l'ha portata la revisione
    incrociata, e tutti e cinque i revisori l'hanno indicata come l'idea migliore emersa. **Il ramo**: stesso canvas,
    una tab a pillola sopra, due tempi — «L'ultima volta» (misurata, immutabile) e «La prossima volta» (dichiarata,
    componibile). Zero pagine nuove, zero parole nuove — e la parola nuova era il pericolo vero, perché il consiglio
    aveva già usato **cinque nomi** (routine, workflow, esecuzione, copia, ramo) per una sequenza di passi. Tre
    conseguenze:
    - **i due numeri in cima alla pagina restano dell'ultima volta, sempre**, e nella prossima volta la parola lo
      dice. Un passo che deve ancora succedere non ha costo né durata, e il suo piede dice «passo nuovo» o «come
      l'ultima volta» invece di uno zero inventato: è così che comporre non sporca «misurati, non stimati».
    - **il nodo del titolare non si toglie, non si sposta e non si scavalca.** Nessuno dei cinque consiglieri
      l'aveva detto: così com'erano proposte, tutte e tre le strade lasciavano cancellare la firma dalla catena.
      Il divieto sta nel **modello**, non nel gesto, così vale per qualunque gesto si scelga.
    - **le porte della prossima volta sono tutte spente.** Una porta accesa dice che quello strumento è stato usato
      davvero: nel tempo futuro non lo è stato ancora nessuno.

33. **L'altezza di un nodo aperto è un conto, non una scoperta; e quello che cresce spinge, non copre** (2026-09-08,
    versione 22). Difetto della versione 20 trovato costruendo le anteprime: aprire un nodo ne copriva un altro **per
    intero** — 18 096 px², cioè tutti i 208 × 87 del nodo sotto — perché il canvas aggiungeva 168 px in fondo, dove
    non servivano, invece di spostare in giù le righe seguenti. Con una figura da leggere era già sbagliato; con una
    da **comporre** è insostenibile, perché il gesto che si usa di più è proprio aprire un nodo. Adesso le righe sotto
    quella del nodo aperto scendono di quanto lui cresce. Perché il conto si potesse fare **prima** di stampare — la
    serpentina si calcola nella funzione che disegna e non misura niente dopo (regola 28) — le etichette e i valori
    dei campi hanno un'**altezza fissa e stanno su una riga sola**: prima «Regola che ferma qui la consegna» andava a
    capo e il nodo cresceva di un'altezza che nessuno poteva prevedere. Una prova confronta il conto con la resa su
    **792 stati** del canvas (ogni nodo, aperto e chiuso, nei quattro modi, a due taglie): nessun nodo coperto,
    nessuno sotto la barra.

34. **L'intestazione sta nella banda riservata anche lei, e i suoi numeri vanno a capo** (2026-09-08, versione 22,
    conferma f). Era il difetto dichiarato e non corretto della versione 21: `.a-head` si stendeva fino a x 1414 e i
    suoi ultimi numeri — che sono cliccabili — nascevano sotto la tendina aperta, **4 in tutto**. Delle tre strade
    misurate (farli scorrere come le strisce di pillole, mandarli a capo, tenerne meno di tre) vale la seconda:
    nascondere un numero è peggio che nascondere un filtro, e tenerne meno di tre toglie informazione al titolare.
    L'intestazione passa da **56 a 124 px** e ogni pagina scende di **68** — la stima ne diceva 64, e come sempre la
    misura ha l'ultima parola. Adesso su **24 pagine per due taglie** l'intestazione non esce mai dai 1008 px e sotto
    la tendina non nasce più niente: da 4 a **zero**.

35. **Una pagina che serve a tre oggetti non merita un cerchio nel rail: si raggiunge da dove il suo nome già
    compariva** (2026-09-08, versione 22, conferma e). Le routine sono **tre**, non otto, e adesso hanno la loro
    pagina: innesco, clausola, rodaggio, i passi dichiarati e che cosa hanno deciso. Il rail resta a **sei** cerchi.
    Ci si arriva da due strade che esistevano già: il nome nella colonna «chi ha deciso» dello storico delle
    Richieste — che dalla versione 21 era **testo morto** e adesso apre la routine, quindi la riga guadagna la sua
    freccia per la regola 26 — e una pillola nell'intestazione del Dipartimento, accanto a quella dei workflow. Non
    si è aggiunta nessuna freccia nuova: se n'è **resa vera una che c'era già**. La pagina dice anche la differenza
    che il modello nasconde: i passi di una routine sono **nomi**, senza modello, strumenti, costo né durata, e dove
    un workflow non esiste la pagina dice perché (il dipendente è pianificato, zero passi conclusi) invece di lasciare
    un buco.

36. **Il canvas del workflow è un grafo, e il significato sta sul connettore** (2026-09-08, versione 23, decisioni
    64–67 dell'utente). La richiesta: *«letteralmente la complessità di n8n per creare flussi, ma con una UX che
    aiuta e semplifica; poter spostare liberamente ogni card e connettere e biforcare più connettori anche su un
    singolo task»*. Il canvas passa da **catena** a **grafo**: posizioni libere, **fan-out e fan-in illimitati**.
    Quattro conseguenze, tutte con un numero dietro:
    - **il significato di un connettore sta sul connettore, non nelle porte del nodo.** n8n lo distribuisce su tre
      tipi di nodo (`IF` con 2 uscite, `Switch` con *n*, `Merge` con fino a 10 entrate) più una porta d'errore che
      compare solo con `onError`. In DGT i quattro significati — `poi`, `se…`, `insieme`, `se si ferma` — stanno
      sull'arco: il nodo non cresce di porte e il fan-out illimitato resta gratis. È la forma su cui **quattro
      consiglieri su cinque erano arrivati indipendentemente**, con quattro nomi diversi, senza che nessuno la
      scegliesse come risposta principale — perché la domanda chiedeva *che tipo* di biforcazione, e quella
      risponde a *dove vive*.
    - **il ramo d'errore non è una verità nuova**: è lo stato `errore` che la pagina Esecuzione mostra già, a cui
      il canvas dà una strada. Una sola fonte, due letture. Duplicarlo come porta autonoma sarebbe stato due verità
      sullo stesso fatto, ed è la ragione per cui il consiglio lo scartava.
    - **il titolare resta un nodo, e l'autorizzazione va anche in testa.** Tre consiglieri su cinque volevano
      trasformarlo in una **linea di confine** in fondo al canvas; un revisore ha aperto `mobile.js` e ha trovato
      che sulla schermata 10 il nodo del titolare è la riga «aspetta te» col chip lime, cioè **l'unica superficie
      da cui il titolare firma dal telefono**. Il confine la cancellava e nessuno dei tre se n'era accorto. In più,
      per idea dell'utente, il canvas prende un **nodo d'innesco in testa** con la sua clausola — come il *trigger*
      di n8n. Non è un concetto nuovo: sono la `clausola` della routine e la firma anticipata della versione 20,
      promosse da interruttore a forma del canvas. **La convergenza non è obbligatoria**: il vincolo non è «tutto
      finisce sul nodo firma» ma «tutto ciò che **esce dall'azienda** passa dalla firma», e un ramo che resta
      dentro finisce dove vuole.
    - **la biforcazione aggiunge una capacità, non svela un dato.** Contati: **43 passi a undici e 156 a quaranta,
      zero condizioni, zero duplicati, zero parallelismi.** È la stessa lezione della versione 20, dove «il nodo è
      un dipendente» cadde contando zero passaggi di mano. Quindi la biforcazione vive **solo nel dichiarato**
      («la prossima volta»); «l'ultima volta» è e resta una catena, perché è quello che è successo.
    L'aggancio è a **18 px**, i punti che il canvas già disegna (n8n usa 16, ma la sua griglia è invisibile).

37. **Un canvas che si compone a mano ha bisogno di un «Riordina», o diventa più lento** (2026-09-08, versione 23).
    È il corollario che **nessuno dei cinque consiglieri aveva visto** e che la revisione incrociata ha nominato:
    il consiglio ha risposto in cinque su cinque alla prima metà della richiesta (*che cosa è una biforcazione*) e
    **zero su cinque alla seconda** (*una UX che aiuta e semplifica, più veloce ed efficace*). Il trascinamento
    libero, da solo, sposta sull'utente un lavoro che prima faceva la macchina. Quindi la **serpentina che il
    canvas già calcola non si butta: diventa il pulsante** che rimette dritto il disegno — il «Tidy up» di n8n, che
    lì usa dagre con `rankdir LR`, `nodesep 96`, `ranksep 128`. Con lui entrano gli altri tre acceleratori scelti:
    il **rilascio del connettore nel vuoto** che crea il passo già collegato (la migliore idea di UX di n8n), il
    **«+» sul connettore**, e **selezione multipla, scorciatoie, zoom e mini-mappa**.

38. **`transform` non è `zoom`: il canvas può avere il suo zoom e la sua mini-mappa** (2026-09-08, versione 23,
    emendamento alla regola 17). La regola 28 diceva «niente pan, niente zoom, niente mini-mappa, perché due zoom
    annidati litigano», e il **secondo riferimento di disegno la mini-mappa e le pillole dello zoom ce le ha**.
    Misurato: la cornice si scala con `zoom`, ma un `transform: scale()` **dentro** di essa compone esattamente —
    nodo 208 px → **312 a 1,5×** e **124,8 a 0,6×**, a viewport 1440, 1920 e 1024, e la tendina `position:fixed`
    resta al bordo dello schermo. Il divieto valeva per `zoom` annidato, non per `transform`: quindi zoom interno e
    mini-mappa **rientrano**, e con loro il riferimento torna copiato com'è. Resta vero che **1 px del canvas vale
    esattamente `zoom` px di schermo**, ed è la ragione per cui il trascinamento è possibile: uno spostamento del
    mouse diviso per `zoom` dà lo spostamento nel canvas, esatto a ogni taglia.

39. **Il grafo disegnato: le prese stanno sui fianchi, quindi le righe vanno tutte da sinistra a destra**
    (2026-09-08, versione 24). Il primo disegno del grafo ha riusato la **serpentina** che «l'ultima volta» usa da
    sempre — quattro nodi per riga, la riga dispari all'indietro — e il risultato è illeggibile: con le prese sui
    fianchi del nodo (a destra si esce, a sinistra si entra), una riga che torna indietro rende **ogni suo arco un
    ritorno**. Misurato: 9 nodi, 8 collegamenti, **4 all'indietro**. Nel grafo le righe vanno quindi tutte da
    sinistra a destra, come le righe di un testo, e l'unico ritorno è quello che va a capo. La serpentina resta
    dov'era giusta: nell'**ultima volta**, che è una catena avvenuta e disegna gli archi da un nodo al seguente.
    Tre conseguenze misurate:
    - **il passo della disposizione è diventato un multiplo dell'aggancio**: era 242×210, l'aggancio è a 18 px, e
      così un nodo appena disposto stava **fra** i punti mentre uno trascinato ci cadeva sopra — due regole per la
      stessa cosa. Ora 234 = 13×18 e 216 = 12×18, e la colonna riservata regge lo stesso: 36×2 + 3×234 + 208 =
      **982 px** dentro i 1008 (erano 1006);
    - **i due capi di ogni filo si calcolano dalla posizione del nodo**, all'altezza del nodo **chiuso** (43,5 px):
      un nodo che si apre non fa saltare i suoi collegamenti, e una prova verifica su ogni arco che i due capi
      cadano sulle prese (nella versione 23 i nodi leggevano la posizione libera e gli archi la serpentina:
      coincidevano solo perché la posa di partenza era la stessa, e al primo trascinamento si staccavano);
    - **il ritorno di riga è una S sola** con la maniglia a 150 px: misurato, il punto più a destra della curva è
      **981 px** e il più a sinistra **25**, cioè dentro la colonna. Con la maniglia corta diventava una diagonale
      dritta, che di una curva non ha niente.
    Sul **connettore** stanno tre cose e nessuna sul nodo (decisione 65): l'**etichetta** del significato — e «poi»
    **non si stampa**, perché è il caso di tutti gli 8 archi di partenza e scriverlo otto volte è rumore — il
    **«+»** che infila un passo in mezzo e la **«×»** che lo toglie, che si vede solo passandoci sopra. Il clic sul
    filo (16 px di presa invisibile) gira fra i quattro significati. **L'errore non cambia colore**: il rosa
    sarebbe un secondo accento, e l'emendamento dell'8 settembre aveva appena tolto l'ultimo che restava; il
    tratteggio fine dice che è una strada d'eccezione, la parola dice quale.

40. **Un numero previsto non si stampa dove è scritto «misurato»** (2026-09-08, versione 24). Difetto della
    versione 20, trovato dal consiglio e verificato contando: il costo di un workflow sommava **anche i passi
    ancora da fare**, e il costo di un passo da fare è una **stima** — lo dice il codice che la genera. Sul primo
    workflow **33,20 € su 71,20 erano stimati (47 %)** e **83 minuti su 121**; su tutti e sei, 83,80 € su 168. La
    pagina stampava quella somma sotto la parola «misurati». Adesso costo e minuti sommano solo quello che è
    avvenuto (fatto, in corso, rotto), il nodo di un passo da fare dice **«non ancora»** con la stima marcata dal
    `≈`, e la previsione vive in un campo suo (`previsto`), separata. Il corollario vale ovunque: `eur(0)` stampa
    «0 €», quindi **uno zero non si stampa mai** su una cosa che non è successa — sul canvas come sul telefono,
    dove lo stesso zero era rimasto vivo.

41. **Due strade per la stessa autorizzazione portano gli stessi freni, e la pagina dice quale delle due è
    accesa** (2026-09-09, versione 25, decisione 71). Trovato dalla **revisione incrociata** della versione 24, e
    da nessuno dei cinque pareri: firmare in anticipo si poteva già in due modi — la pillola «firma anticipata»,
    che dichiara tre freni (soglia, perimetro, scadenza), e il **permesso sul nodo d'innesco**, che non ne aveva
    nessuno. La seconda strada era la più nascosta delle due (si accende **dentro il canvas**, non nel pannello
    dove il titolare guarda le approvazioni) ed era la più permissiva. Peggio: la descrizione di «Fai pure»
    **prometteva già** i tre freni — «esce da solo entro i tre freni» — che il codice non applicava. La parola
    diceva una cosa e la funzione ne faceva un'altra.
    La regola che ne esce vale oltre questo caso: **dove due controlli diversi concedono la stessa cosa, i limiti
    stanno in un posto solo e valgono per tutti e due**. Qui i tre freni sono una funzione sola (`ramoFreni`), che
    leggono la firma anticipata, il permesso, la Console e il telefono; prima erano scritti a mano in due pagine e
    non governavano niente. E la pagina **nomina la strada accesa** («Dal permesso», e non solo «Accesa»), perché
    con due interruttori per la stessa luce dire che è accesa non basta a dire chi l'ha accesa.

42. **Dove il titolare ha disposto qualcosa con le mani, quella disposizione è un dato: nessuna superficie la
    ricalcola** (2026-09-09, versione 26, decisione 72). Trovato dalla **revisione incrociata**, e da nessuno dei
    cinque pareri. Nel canvas dei workflow il titolare trascina i nodi dove vuole, e `ramoPosiziona` (`dati.js`)
    **scrive `nd.x` e `nd.y` dentro il nodo**, agganciati alla griglia da 18 px e tenuti dentro la banda
    (`1008 - 208 - 8`). Quelle coordinate non sono impaginazione: sono una cosa che il titolare ha detto.
    Due proposte del consiglio volevano «riposare» il grafo sul telefono — ricalcolare x e y sullo schermo stretto,
    così da togliere ogni scorrimento laterale. Il conto tornava; il prodotto no. Una seconda geometria per lo
    stesso oggetto mostra al titolare **una disposizione che lui non ha scelto**, e gli fa perdere l'unica cosa che
    il canvas gli aveva dato: la memoria di dove ha messo le cose. È la stessa malattia della regola 41 — due
    strade per la stessa cosa, con regole diverse — spostata dalla creazione alla forma.

    **Chiarimento della versione 28** (2026-09-09; non è una decisione nuova, è una misura che evita un errore già
    fatto due volte). La regola protegge la **mano**, non il **seme**, e nel codice sono due funzioni diverse:
    `ramoPosa` (`dati.js`) **semina** le posizioni quando un grafo nasce e quando si preme «Riordina»;
    `ramoPosiziona` (`dati.js`) scrive quelle che il titolare ha messo **trascinando**. Cambiare il seme non
    ricalcola niente di nessuno — è proprio la distinzione che la regola già enuncia («guardare se quel valore è
    generato o è stato messo lì da qualcuno»); cambiare quelle del titolare è vietato. Corollario per chi cerca
    il passo della griglia: quello del **grafo** è in `ramoPosa`, mentre `W_PY` in `componenti.js` governa
    **solo** la serpentina dell'«ultima volta», perché `wpos` esce alla prima riga quando il nodo porta già la sua
    `x` — e nel grafo la porta sempre. Un consiglio di cinque, nella versione 28, ha proposto due volte di
    correggere il grafo cambiando `W_PY`: non avrebbe toccato un solo nodo del grafo.
    Il criterio generale: **prima di ricalcolare una posizione, una scelta o un ordine su una superficie nuova,
    guardare se quel valore è generato o è stato messo lì da qualcuno.** Se è stato messo, si trasporta; non si
    rifà. Il corollario pratico che ne discende: il telefono mostra il canvas **così com'è**, e paga i 632 px di
    scorrimento laterale invece di guadagnarseli con una posa sua.
    Il corollario disegnato: cambiando permesso, il canvas **non smette di dire** che cosa succede a un ramo. Prima
    con «chiedi prima di consegnare» un ramo che non arriva alla firma diceva «resta in azienda», e con gli altri
    due permessi non diceva **niente** — l'informazione spariva proprio dove serviva di più. Ora dice «esce senza
    la tua firma» (misurato: 148 px, dentro i 208 del nodo), e la riga in cima lo conta.

43. **Lo stesso oggetto su due schermi è lo stesso componente con i gesti spenti, non un secondo disegno**
    (2026-09-09, versione 27, decisioni 72-74). Il workflow sul telefono era una **colonna di card**: gli stessi
    dati, un disegno diverso. Giudizio del titolare: «dà un'anteprima del workflow sbagliata». Verificato guardando
    le due catture, ed era vero — fondo chiaro contro notte, card da 348 px contro nodo da 208, una colonna dritta
    contro una serpentina su tre righe, chip dentro la card contro porte con l'etichetta sotto il nodo, barretta
    dritta contro curva luminosa. Chi guardava il telefono si figurava *un elenco di cinque passi*, poi apriva la
    Console e trovava *una lavagna notturna*.
    La regola: quando una superficie stretta deve mostrare quello che una larga già mostra, **la prima strada da
    provare è lo stesso componente a un'altra scala**, non un secondo componente con gli stessi dati. Qui il
    canvas si è spostato in `schermate/componenti.js` — codice **e** CSS, trasportati e non riscritti, perché
    Console e telefono fanno tutti e due `prefissa(css, '.dirA')` — e il telefono lo chiama con un interruttore
    (`soloLettura`) e la larghezza che ha. Un canvas e un interruttore, non due canvas da tenere allineati: se un
    giorno divergessero, il conto dei `.wnode` nelle prove sarebbe il primo a saperlo.
    Il corollario delle **due scale**: se a scala d'insieme il testo scende sotto il leggibile (misurato: 4,3 px),
    non si rimpicciolisce la scrittura che conta — si dà un secondo ingrandimento (il tocco sul nodo porta a scala
    1) e si tirano **fuori dal disegno** le poche etichette che devono restare leggibili sempre. Quali: quelle che
    dicono il **contratto** — dove finisce quello che il flusso produce e chi lo firma («esce senza la tua firma»,
    «resta in azienda») — non quelle che dicono la topologia («2 rami», «arriva da 2»), che il disegno mostra da sé.
    Il corollario dei **gesti**: sola lettura non vuol dire una resa più povera, vuol dire meno gesti. Il nodo che
    si apre resta (è lettura: dice modello, strumenti ed esito), spariscono prese, «+», «×», trascinamento del
    nodo e «Riordina» — cinque, contati da una prova.

Mappa dei componenti sui concetti di DGT (barra agenda → esecuzioni del giorno, card attività → esecuzione, card lead →
dipartimento e dipendente, videochiamata → approvazione, Riepilogo → consegne/spesa/obiettivo): tabella in
`schermate/direzioni/DIREZIONI.md`, sezione 1. Sorgenti in `schermate/direzioni/` (`dati.js`, `comune.js`,
`../componenti.js`, `direzione-a.js`, `mobile.js`, `avatar/`). Dettaglio della versione 5 (dipendenti, editor, avatar), 5b/5c (orbe), 6 (pagina del
Dipendente, revisione di performance), 7, 7b e 7c (orbe senza disco, le pelli; poi perla, corpi tondi e moti fluidi; poi
gli occhi del kit), 8 (pagina dell'Esecuzione), 10 (l'identità degli orbi), 11 e 12 (le approvazioni da mobile), 13 (la pagina dei Costi), 14 (la manutenzione: i componenti in `componenti.js`, le prove nel
repository, la sezione «moto» in `DESIGN.md`; niente di visibile cambiato, tranne una perdita di stile sulla schermata della
revisione del telefono, corretta e da confermare) 15 (le pagine Agenda e Chat del rail e le due tab del telefono), 15a (gli avatar di nuovo centrati nella casella), 16 (la
barra «Oggi in azienda» come quadro del giorno), 17 (il quadro del giorno anche sul telefono, la tab Dipartimenti, i
controlli inerti) 18 (le frecce di riga: la regola 25 portata dalle intestazioni alle righe), 19 (le consegne del dipartimento), 20 (il canvas
a nodi), 21 (il record della routine e la banda riservata) e 22 (le sei conferme, il ramo e i tre gesti del comporre) in
`DIREZIONI.md`, sezione 4; l'analisi delle tre proposte nella sezione 6; i due consigli sul canvas componibile nella sezione 7.


### Che cosa il prodotto ancora non ha (2026-09-07, analizzato e contato)

Tre zone segnalate dall'utente. Il 2026-09-07 sono state **analizzate aprendo le pagine e contando**, e le due con più
di una risposta difendibile sono passate dal consiglio (`llm-council`). Analisi per esteso in
`schermate/direzioni/DIREZIONI.md`, **sezione 6**; verdetti e domande aperte in `PROSSIMA-SESSIONE.md`. **Le decisioni
sono dell'utente e sono ancora da prendere.**

- ~~**Le cose create non si guardano insieme, e si chiamano in quattro modi.**~~ **Costruito il 2026-09-07**
  (versione 19, regola 27): la parola è **«consegna»** e le consegne hanno una sezione sulla pagina Dipartimento, in
  Console e sul telefono, e si aprono nella tendina larga. Restano fuori, dichiarati, «che cosa ha creato l'azienda» e
  «che cosa abbiamo fatto per un cliente»: sono il prezzo della strada scelta. Il conto di partenza, per memoria: La parola «Output» compare in **4 viste su
  20** e sono sempre la stessa pagina, l'Esecuzione; «artefatto» **zero volte** in tutto il prodotto. Gli output sono
  **18** a undici dipendenti e **40** a quaranta; di questi **9** e **19** sono già creati, e **3** e **0** si aprono.
  Per vederli tutti servono **11 pagine** a undici e **40** a quaranta. E il prodotto risponde in **quattro modi
  diversi** alla domanda «quante cose abbiamo creato» — gli obiettivi dicono 31 consegne su 59, gli output 9 su 18, le
  richieste decise 16 su 20, l'aggregatore dei costi 318 — perché «consegna» copre quattro oggetti su quattro periodi e
  nessuna pagina dice quale sta contando. Nella stessa intestazione di sezione convivono già due parole: `<h3>Output</h3>`
  con il contatore «Consegne».
- ~~**L'editor di workflow è solo una figura**~~ — **fatto nella versione 20** (2026-09-08): il canvas a nodi è la
  pagina **Workflow** della Console (la decima superficie) e la schermata 10 del telefono, e legge il modello vero.
  Quello che restava aperto è stato risolto così: i **sei verdi** sono diventati il lime (emendamento a `CLAUDE.md`,
  regola 4), il **secondo rail** non c'è (l'ingresso è una pillola nell'intestazione di sezione, il rail resta a sei),
  il **pan/zoom** non c'è (regola 17: il canvas si stende invece di trascinarsi), e le icone nuove sono zero — i nodi
  usano lo sprite che c'era (`i-bolt`, `i-bot`, `i-star`, `i-hand`, `i-rows`, `i-gear`). Le tre porte e le due tab che
  già corrispondevano a cose del prodotto non sono state reinventate. **Restano fuori**: il trascinamento dei nodi, il
  collegamento di un nodo a un altro con il mouse, e la mini-mappa.
- **I connettori stanno sul dipendente, e il modello ha già una faglia che nessuno aveva visto.** Strumenti e
  connessioni vivono nel dossier di ogni dipendente: **46 istanze per 17 nomi** a undici, **160 per 14** a quaranta, e
  **40 copie di una sola connessione** («Drive di Nova Studio»). Ma **quattro nomi su quattordici sono spenti su ogni
  dipendente e non sono mai stati usati** — Deploy in produzione, Pubblicazione diretta, Invio e-mail, Banca — e sono
  gli unici quattro la cui descrizione parla di **permesso** («Solo con approvazione», «Sola lettura») invece che di
  contenuto: la divisione fra **accesso** e **capacità** è già scritta, sono i 4 spenti contro i 10 accesi. Tre
  difetti aperti: il chip **«Rinnova»** della connessione scaduta è **inerte**; l'errore di Kim «Chiavi di accesso
  scadute» **non è attaccato a nessuna connessione**; il permesso «Strumenti e connessioni» ce l'hanno **2 dipendenti
  su 11**. E lo sprite **non ha** busta, chiave, nuvola né immagine, mentre la scorciatoia delle iniziali in un disco
  colorato è vietata dalla regola 19: serve una regola nuova per disegnare un servizio senza il suo marchio.

44. **Quello che appartiene a un oggetto nascosto non si disegna sopra ciò che lo nasconde** (2026-09-09,
    versione 29). Nel canvas il nodo aperto ha `z-index:3` e sfondo opaco: quello che gli finisce sotto non si
    vede. Ma tre cose venivano disegnate lo stesso, e **due sopra di lui**, perché stavano più in alto nella pila:
    le **prese** del collegamento (`z-index:5`) e i **tag** del contratto. Misurato col colpo del mouse: le due
    prese del nodo coperto erano disegnate sull'editor e **rispondevano al clic** — e da lì nasceva un
    collegamento **da un nodo che non si vede**, cioè un passo, e quindi un euro, attribuito a un dipendente che
    il titolare non ha mai visto. Un comando che appartiene a qualcosa di invisibile è peggio di un comando
    assente: promette un'azione su un oggetto che chi clicca non sta guardando.
    La regola non è «velare» né «spegnere» — è **non disegnare**: se un oggetto è coperto, quello che è suo
    (porte, prese, etichette, tag) non compare finché resta coperto, e torna appena si scopre. Il prezzo va
    dichiarato dove tocca la spina dorsale: se il coperto porta un tag del contratto, quel tag sparisce dal
    disegno — ma **il conto in cima continua a dirlo** («1 ramo resta in azienda»), quindi si perde *quale*, non
    *che c'è*. Quando un'informazione della spina dorsale può sparire dal disegno, deve restare detta **fuori** dal
    disegno: è lo stesso corollario della regola 43 sulle etichette del contratto.
    Il corollario dei conti: **un conto che decide una posizione deve misurare quello che si disegna davvero.**
    Due errori dello stesso stampo, trovati insieme: `altNodo` contava la riga delle azioni anche dove la sola
    lettura non la disegna (47,6 px di scarto sul telefono), e il freno che cerca un posto libero misurava il nodo
    **chiuso** mentre i tre gesti che creano un passo lo lasciano **aperto** — così il prodotto stesso posava un
    passo che, aperto, ne copriva due, e in un caso copriva il nodo del titolare. Il conto diceva «libero», la
    resa copriva.

## 11. Collegamenti

- Confronto delle tre direzioni (artefatto): https://claude.ai/code/artifact/e7334087-3fc8-4ec9-86f7-bd9fa387bd8f
- Direzione A cliccabile, tendine, pagine Richieste, Dipartimento, Dipendente (revisione di performance), Esecuzione, Costi, Agenda e Chat, avatar ed editor (artefatto, ripubblicato il 2026-09-07 con la versione 18): https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
- Il telefono del titolare, schermate «Da approvare», «Richiesta» (anche la revisione di performance), «Riepilogo di oggi», «Chat», «Conversazione», «Agenda», «Dipartimenti» e «Dipartimento», cliccabili, con il quadro del giorno in cima e lo stato vuoto (artefatto, ripubblicato il 2026-09-07 con la versione 18 e il conto nel titolo a 36): https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9
- Le quattro scelte per la barra «Oggi in azienda» con il voto condiviso, da leggere insieme a chi decide (artefatto, versione 16 e correzione 16a): https://claude.ai/code/artifact/3a3fcb9e-c894-4a83-9cdb-54820f65756f
- Avatar dei dipendenti, le due famiglie a confronto (artefatto): https://claude.ai/code/artifact/22823dc3-4c9e-4874-92ec-2007b3a95526
- Le pelli dell'orbe senza disco, quattro soluzioni a confronto (artefatto): https://claude.ai/code/artifact/c68a8d4e-488f-40c3-ab36-038dd49b9569
- PR #3 verso `main` con schermate e documenti (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/3
- Branch dei dipendenti AI (versione 5 della direzione A): `claude/console-ai-employees-feebdx`, PR #4 (unita)
- Branch della pagina del Dipendente e degli avatar senza segni dietro (versioni 5c e 6): `claude/avatar-orbe-employee-page-3nhqmk`, PR #5 (unita)
- Branch dell'orbe senza disco, della pagina dell'Esecuzione e della cornice a tutto schermo (versioni 7–9): `claude/avatar-execution-page-nv8dm4`, PR #6: https://github.com/av3rgfx/DGT-Design-2.0/pull/6
- Branch delle approvazioni da mobile, seconda metà (versione 12): `claude/mobile-approvals-v11-mgqf5d`, PR #9 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/9
- Branch della pagina dei Costi (versione 13): `claude/company-costs-page-llxcix`, PR #10 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/10
- Branch della manutenzione (versione 14): `claude/console-mobile-maintenance-gwnihs`, PR #11 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/11
- Branch delle pagine Agenda e Chat (versione 15): `claude/direzione-a-agenda-chat-l1z8tr`, PR #12: https://github.com/av3rgfx/DGT-Design-2.0/pull/12 (unita)
- Branch della barra «Oggi in azienda» (versione 16): `claude/console-oggi-azienda-bar-kzetlz`, PR #13 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/13
- Branch del quadro del giorno sul telefono, della tab Dipartimenti e dei controlli inerti (versione 17): `claude/console-direzione-a-mobile-vdb1tb`, PR #14 (unita): https://github.com/av3rgfx/DGT-Design-2.0/pull/14
- Branch delle frecce di riga (versione 18): `claude/candidato-1-frecce-riga-nmd2pt`, PR #15 (unita)
- Branch dell'analisi delle tre proposte (candidati 6, 7 e 8) e della **versione 19** (le consegne del dipartimento: candidato 6, strada A, parola «consegna»): `claude/analisi-proposte-direzione-a-vxpham`, PR #16: https://github.com/av3rgfx/DGT-Design-2.0/pull/16

- Artefatto pubblicato: https://claude.ai/code/artifact/8835669b-c385-4039-88e9-e252f619442b
- Branch di lavoro: `claude/dgt-design-system-fz5r1g`, PR #1 verso `main`: https://github.com/av3rgfx/DGT-Design-2.0/pull/1
