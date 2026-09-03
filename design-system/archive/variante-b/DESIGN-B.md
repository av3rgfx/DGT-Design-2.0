---
name: DGT — Variante B "Console nera e lime"
description: Sistema di design scuro-prima con un solo colore vivo (lime = acceso), tessere, capsule, rail e dock, in finitura Apple/Revolut.
colors:
  canvas: "#0B0B0C"
  surface: "#141416"
  surface-raised: "#1C1C1F"
  surface-overlay: "#242428"
  border: "rgb(255 255 255 / .08)"
  border-strong: "rgb(255 255 255 / .14)"
  border-input: "#73737B"
  text: "#F2F2F2"
  text-secondary: "#9C9CA3"
  icon: "#D9D9DE"
  lime: "#B8F860"
  lime-text: "#CFFB8A"
  lime-tint: "#2A3521"
  amber: "#F2B544"
  amber-text: "#F7C96B"
  amber-tint: "#3A2F19"
  coral: "#FF6B5C"
  coral-text: "#FFA79C"
  coral-tint: "#3C221F"
  stop-all: "#FF8A7A"
  danger: "#C93A2C"
  light-canvas: "#F5F5F7"
  light-surface: "#FFFFFF"
  light-text: "#111114"
  light-text-secondary: "#6B6B73"
  light-lime-text: "#4F7A00"
typography:
  display-lg:
    fontFamily: "Manrope, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "44px"
    fontWeight: 600
    lineHeight: "56px"
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: "34px"
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: "28px"
  title-sm:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: "24px"
  body-lg:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: "18px"
  caption:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
rounded:
  badge: "6px"
  field: "10px"
  tile: "14px"
  overlay: "20px"
  capsule: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.capsule}"
    height: "40px"
    padding: "6px 20px"
    typography: "{typography.label}"
  button-primary-lg:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.capsule}"
    height: "50px"
    padding: "12px 20px"
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.capsule}"
    height: "40px"
    padding: "6px 20px"
  button-stop-all:
    backgroundColor: "transparent"
    textColor: "{colors.stop-all}"
    rounded: "{rounded.capsule}"
    height: "40px"
  button-stop-all-armed:
    backgroundColor: "{colors.stop-all}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.capsule}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#FFFFFF"
    rounded: "{rounded.capsule}"
  chip-status:
    rounded: "{rounded.capsule}"
    height: "26px"
    padding: "4px 10px"
    typography: "{typography.label}"
  tile:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.tile}"
    padding: "20px"
  tile-selected:
    backgroundColor: "{colors.lime-tint}"
    rounded: "{rounded.tile}"
    padding: "14px"
  field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.field}"
    height: "40px"
    padding: "0 14px"
  rail-tile:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.field}"
    size: "40px"
  rail-tile-active:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.field}"
    size: "40px"
  tabs:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.capsule}"
    padding: "3px"
  dock-pill:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.capsule}"
    height: "36px"
    padding: "8px 14px"
  dock-pill-money:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.capsule}"
    height: "36px"
  agent-mark:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.badge}"
    size: "32px"
  person-mark:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.capsule}"
    size: "32px"
---

# DGT — Variante B "Console nera e lime"

## Overview

Variante scuro-prima del sistema di design DGT, costruita dal mondo dei due riferimenti forniti (`design-system/reference/`): fondo quasi nero, tessere con bordo sottile, un solo colore vivo, rail di icone a sinistra, tab a pillola, dock di stato in basso, ID in mono. Finitura Apple/Revolut: piatta, precisa, capsule per i pulsanti, nessun vetro, nessun gradiente, nessun bagliore decorativo.

La **struttura** è identica alla variante A (`design-system/DESIGN.md`) e non è ridiscussa qui: le quattro domande come cromo persistente, sei stati stabili più uno transitorio con forma + icona + etichetta, stop singolo immediato e "Ferma tutto" armato in loco per 5 s, undo dell'approvazione reale solo con esecuzione differita, denaro con periodo e freschezza, i due assi `data-density` e `data-detail`, il contratto white-label e la verifica numerica del contrasto. Cambiano il mondo visivo e la cornice applicativa.

Strategia cromatica: **Restrained**, spinta al limite. Neri tonali e un solo colore vivo, il lime, che ha un solo significato: *acceso* (sta consumando o sta per farlo). Ambra e corallo esistono solo per "da approvare" e "fallito". Tema chiaro derivato, con la stessa grammatica.

Scena fisica che decide lo scuro: l'operatore che controlla gli agenti di sera dal desktop e il titolare che apre l'app in ufficio; per il telefono in pieno giorno esiste il tema chiaro come preferenza personale, non come preset di ruolo.

Tensione dichiarata: il riferimento è un editor a nodi con bagliori, che il brief esclude. La variante B ne riusa la finitura e le soluzioni di interfaccia (rail, tab, tessere, stato nell'etichetta, dock, composer, ID mono); non riusa il canvas a nodi, la griglia puntinata né i connettori luminosi. L'unica luce ammessa è l'alone dell'indicatore "in esecuzione".

Valori normativi: `tokens-b.css` (stessi nomi di token della variante A). Coppie di contrasto: `pairs-b.json`, 65 coppie chiaro/scuro, 0 fallimenti (`python3 design-system/tools/wcag.py design-system/variants/b-dark-lime/pairs-b.json`).

## Colors

- **Canvas** `#0B0B0C`, **tessera** `#141416`, **rialzo** (campi, pulsanti secondari, pillole del dock) `#1C1C1F`, **overlay** (popover, toast, tab attiva) `#242428`. La profondità è tono, non ombra: ogni livello è un nero leggermente più chiaro.
- **Bordi**: bianco al 8% sulle tessere, 14% sui bordi forti; bordo dei campi `#73737B` (3,1:1 su tessera, 3,6:1 su canvas: WCAG 1.4.11). Nessun bordo colorato sui lati.
- **Testo**: `#F2F2F2` (15:1 su tessera), secondario `#9C9CA3` (6,2:1), icone `#D9D9DE`, segnaposto `#8E8E96` solo per esempi di formato, disabilitato `#4A4A52` (esente).
- **Lime `#B8F860` = acceso**: pulsante primario (testo nero, 15,6:1), tessera attiva del rail, pillola del denaro live nel dock, glifo e alone dell'indicatore "in esecuzione", testo `#CFFB8A` su tinta `#2A3521` (10,9:1) per il chip "In esecuzione" e la tessera selezionata. I link **non** sono lime: sono testo sottolineato. Una sola regola: se è lime, sta consumando o sta per farlo.
- **Ambra** `#F2B544` / testo `#F7C96B` su `#3A2F19`: solo "Da approvare" e avvisi di budget (◔, ▲).
- **Corallo** `#FF6B5C` / testo `#FFA79C` su `#3C221F`: "Fallito", "oltre budget", glifo del pulsante "Ferma" di riga. **Stop-all** `#FF8A7A`: contorno di "Ferma tutto" (7,4:1), pieno con testo nero quando armato (8,6:1). **Pericolo** `#C93A2C` pieno con testo bianco (5,1:1): solo per l'irreversibile con dialogo.
- **Completato** è neutro (spunta `#D9D9DE` su `#242428`): sul nero due verdi (acceso e finito) si confonderebbero. **Fermato/Arresto** grigio `#B4B4BC` su `#26262B`; **In coda** contorno tratteggiato `#4A4A52`, testo `#9C9CA3`.
- **Tema chiaro**: canvas `#F5F5F7`, tessere bianche senza ombra, testo `#111114`, secondario `#6B6B73` (5,3:1), lime come pieno del primario con testo nero, lime scuro `#4F7A00` per testo e glifo "in esecuzione" (5,1:1), ambra e corallo nelle versioni scure della variante A.
- **White-label**: un solo input `--brand-accent` (più opzionali hover/subtle/text e le varianti chiare); stati, feedback, pericolo, focus e neutri sono chiusi. Con un accento blu di rivenditore (`#5B9CFF`, testo nero 8:1) i chip di stato e i rossi non cambiano.

## Typography

- Famiglia: **Manrope** (Google Fonts, `tnum` verificato sul file; Hanken Grotesk, scartata, non lo ha), con `-apple-system`/SF Pro in fallback: su Apple il prodotto usa il font di sistema, altrove Manrope. Mono di sistema solo per ID e tracce (`run_7f3a·b2c9`).
- Scala fissa in px (rem in produzione), rapporto ≈ 1,2 tra i gradini: display-lg 44/56 (una sola cifra per schermata, tracking −0,02em), display 30/40, headline 26/34 in peso **500** (il titolo di pagina è leggero come nel riferimento, con il percorso "/cliente" in grigio e un tag a capsula), title 20/28, title-sm 17/24, body-lg 16/24, body 14/20 (compatta 13/18; mobile 16/24), label 13/18 peso 600 (pulsanti, chip, tab, pillole), caption 12/16, mono 12/16.
- Pesi: 400 corpo, 500 titoli di pagina, 600 etichette e numeri, 700 solo per il monogramma. Cifre tabulari ovunque ci sia denaro o tempo. Nessun all-caps. Minimo 12px; gli importi mai sotto 13px (14 su mobile).
- Budget di caratteri e regole IT/EN identici alla variante A (sezione 10.4 di `DESIGN.md`).

## Layout

- Base 4px. Tessere con 20px di imbottitura (16 in compatta), righe di lista 52px (40), righe di tabella 44px (32), gap tra sezioni 32px (20), gutter di pagina 24px (16). Colonna fissa del denaro 120px (100) a destra con filetto: firma F1 della variante A.
- **Cornice applicativa**: rail a sinistra da 64px con tessere 40×40 a raggio 10 (attiva = lime con glifo nero, "+" tratteggiata in cima, persona in cerchio in fondo); intestazione con titolo + percorso + tag e tab a pillola; contenuto in griglia di tessere (min 210px); **dock** in basso da 56px con composer (testo, ID in mono, invio) e pillole di stato. Le quattro domande vivono nel dock su desktop; su mobile (<600) salgono in una riga da 44px in alto e il rail sparisce, perché la zona pollice appartiene all'approvazione.
- Densità: `data-density="compact"` riduce controlli 40→32, righe 52→40, imbottitura 20→16, dock 56→48, corpo 14→13. Su puntatore grossolano i bersagli restano ≥ 44px qualunque densità; il primario mobile è 50px (Apple).
- Breakpoint: sm <600 (una colonna, ControlStrip in alto, tessera selezionata a colonna singola), md 600–899 (rail nascosto nella cornice, griglie a due), lg ≥900 (rail + dock), contenuto max 1120px.
- Il corpo della pagina non scorre mai in orizzontale: le tab a pillola scorrono nel proprio contenitore, i figli di griglia hanno `min-width: 0`.

## Elevation & Depth

- Piatto: le tessere non hanno ombra, solo tono (`#141416` su `#0B0B0C`) e bordo bianco 8%. Il rialzo (`#1C1C1F`) è un tono più chiaro, non un'ombra.
- Ombre **solo** sugli overlay: livello 2 (popover, toast) `0 8px 24px rgb(0 0 0 / .45)` + anello 1px bianco 6%; livello 3 (fogli, dialoghi) `0 24px 64px rgb(0 0 0 / .6)` + anello 8% + scrim nero 64%. In chiaro le stesse ombre con alpha .10 e .18.
- **Un solo alone** in tutto il sistema: l'indicatore "in esecuzione", punto 8px lime con anello di 3px al 22% (nessun blur) e pulsazione di 2 s dell'anello esterno; statico con `prefers-reduced-motion`. La pillola lime del dock lo porta in nero.
- Niente vetro, niente `backdrop-filter`, niente gradienti (l'unica eccezione tecnica è il tratteggio della quota stimata nella BudgetBar, che è un pattern, non un gradiente di colore).

## Shapes

- **Capsule** (9999px) per pulsanti, chip, pillole, tab, tag, segmenti del selettore: la forma di Apple e Revolut per i controlli.
- **Campi** a raggio 10, **tessere** a raggio 14 (come i nodi del riferimento), **fogli e dialoghi** a raggio 20, **rail tile** a raggio 10.
- **Badge** (AgentMark, marchio del prodotto) a raggio 6, mai oltre 8 anche con `--brand-radius-scale` 1,25: l'agente è un quadrato arrotondato ("icona app"), la persona un cerchio ("foto di contatto"), la richiesta di approvazione un rombo. Grammatica delle forme F2 invariata.
- Glifi di stato: ◉ in esecuzione, ◆ da approvare, ■ con anello che ruota per l'arresto, ■ fermato, ✓ completato, ⊗ fallito, ○ tratteggiato in coda; ▲ riservato agli avvisi. Set outline a 1,5px (SF Symbols su Apple, Phosphor sul web), mai emoji.

## Components

- **Button**: primario lime pieno con testo nero; secondario su rialzo con bordo 14%; terziario solo testo; **stop** di riga su rialzo con bordo neutro e glifo ■ corallo (unico rosso per riga); **stop-all** contorno corallo 1,5px, unico per schermata, si arma sul posto (pieno corallo, testo nero, "Confermi: ferma 3") per 5 s; **danger** rosso pieno con testo bianco, sempre con dialogo. Altezze 40/32/50, `min-width` 96px, mai larghezza fissa, etichetta fino a 2 righe.
- **StatusChip**: capsula 26px (22 compatta), glifo 12px + etichetta corta ≤ 14 caratteri, `nowrap`, bordo 1px; la variante "In coda" ha bordo tratteggiato e sfondo trasparente. L'etichetta lunga è testo adiacente.
- **Tessera agente** (dal riferimento): icona del ruolo o monogramma in un quadratino su rialzo in alto a sinistra, glifo di stato in alto a destra, nome in 14/600 e stato scritto nell'etichetta sotto ("In esecuzione da 12 min · passo 4/7", "(Disattivato)"). **Selezionata**: sfondo `#2A3521`, bordo lime, righe interne su rialzo (Costo · questo task, Budget · oggi). **Disattivata**: bordo tratteggiato, nome in grigio.
- **AgentMark / PersonMark**: 32px, su rialzo con bordo 14%, raggio 6 per l'agente e cerchio per la persona; monogramma 12/700 o icona 16px; disattivato tratteggiato.
- **Rail**: colonna 64px, tessere 40×40 a raggio 10; attiva = lime; "+" tratteggiata in cima; PersonMark in fondo. Su mobile scompare: la navigazione passa alla ControlStrip e a una barra inferiore fuori da questo specimen.
- **Tabs**: contenitore a capsula su rialzo con 3px di imbottitura, voce attiva su tono overlay; scorrono in orizzontale senza troncare ("Configurazione").
- **Dock** (ControlStrip desktop): 56px, sopra un filetto; a sinistra il **composer** a capsula (segnaposto, ID mono, invio 32px); a destra le pillole `[◉ 3 in esecuzione] [Pubblicato · 14:32] [4,82 € oggi]` (la pillola del denaro è lime pieno) e `[■ Ferma tutto (3)]`. Ambito sempre globale. Su mobile: una riga in alto `[◉ 3] [4,82 € oggi] [■ Ferma tutto]`.
- **Field**: etichetta sopra 13/600, campo 40px a raggio 10 su rialzo con bordo `#73737B`, aiuto 12px, errore = bordo 2px corallo + ▲ + testo `#FFA79C`, mai solo colore, valore mai cancellato.
- **Money / KPI / BudgetBar / FreshnessMark / RunRow / ApprovalCard / ResolvedBar / Toast**: comportamento identico alla variante A. Aspetto: KPI in display-lg 44/56 con periodo sopra e freschezza sotto (punto lime "live"); BudgetBar 6px con traccia bianca 10%, consumato `#D9D9DE`, tacca all'80%, oltre budget corallo; RunRow su tessera con stop a fine riga; ApprovalCard con footer su due righe (secondario + terziario sopra, primario lime 50px a tutta larghezza sotto) e riga di irreversibilità in capsula ambra; ResolvedBar con "Annulla approvazione · 8 s"; Toast su overlay con l'unica ombra di livello 2.
- **MessageBar** (dal riferimento): capsula su rialzo con testo, ID in mono e pulsante di invio; è il modo in cui l'utente parla a un dipendente.

## Do's and Don'ts

- Usa il lime solo per ciò che è acceso: primario, indicatore live, "in esecuzione", tessera attiva del rail. Non usarlo per link, completato, successo o decorazione.
- Un solo alone per schermata (l'indicatore live). Nessun bagliore su bordi, connettori o pulsanti; nessun `box-shadow` colorato.
- Profondità con il tono, non con l'ombra: le tessere non proiettano ombra; le ombre esistono solo su popover, toast, fogli e dialoghi.
- Niente vetro smerigliato, niente gradienti, niente griglia puntinata, niente canvas a nodi: l'organizzazione è una griglia o una lista di tessere, mai un grafo con connettori.
- Lo stato si scrive nell'etichetta della tessera ("(Disattivato)", "Da approvare · deploy su staging"), oltre al glifo: mai il solo colore.
- "Ferma tutto" è l'unico contorno corallo della schermata; lo stop di riga ha contorno neutro e glifo corallo; il rosso pieno è solo per l'irreversibile.
- Capsule per i controlli, tessere a 14, badge mai oltre 8: la grammatica quadrato/cerchio/rombo sopravvive a qualsiasi `--brand-radius-scale`.
- Su mobile la zona pollice è dell'approvazione: la ControlStrip sta in alto, il rail sparisce, il primario è 50px a tutta larghezza.
- Testo secondario `#9C9CA3` su tessera e rialzo; su overlay resta leggibile (5,7:1). Il grigio `#4A4A52` è solo per il disabilitato.
- Non canonizzato: il tema chiaro derivato è verificato nei token ma non ancora in una matrice di snapshot; il rail su mobile non è disegnato in questo specimen (fuori scope: navigazione mobile).
