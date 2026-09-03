# DGT — Sistema di design v1

> Stato: **proposta per approvazione**. Nessuna schermata è stata disegnata. Questo documento fissa i token e i componenti di base che ogni schermata dovrà usare. I valori vivono in `tokens.css`; il marchio si cambia solo in `brand.css` / `brand.json`.

## Nota preliminare: l'immagine di riferimento non è arrivata

Nella sessione non è presente alcuna immagine allegata (né negli upload, né nel repository, né nel messaggio). Il sistema qui sotto è quindi costruito **solo sul brief scritto**: le quattro domande, i due pubblici, gli anti-riferimenti e i vincoli di sistema.

Per rispettare l'istruzione "per filo e segno, non inventare nulla di nuovo se il design allegato presenta già soluzioni", tutte le scelte **puramente visive** sono confinate in token singoli e marcate come *assunzione da riallineare* (sezione 12): tinta dei neutri, accento di default, famiglia tipografica, set di icone, raggi. Le scelte **strutturali** (grammatica degli stati, architettura dei token, componenti, regole di densità e accessibilità) derivano dal brief e restano valide con qualunque immagine.

---

## 0. Principi

Ogni principio nasce da un vincolo del brief e da una legge UX della skill `ux-design-rules`.

| # | Principio | Perché (due righe) |
|---|---|---|
| P1 | **Le quattro domande sono cromo, non contenuto.** "Cosa gira · quanto costa · cosa ha cambiato · come lo fermo" vivono in una barra persistente (ControlStrip) presente in ogni schermata. | Il brief chiede risposta "senza cercare": solo un elemento fisso soddisfa Serial Position (sempre primo) e Fitts (sempre nello stesso posto). Un widget di dashboard sparisce appena si naviga altrove. |
| P2 | **Sembra un registro contabile, non un SaaS AI.** Superfici chiare e piatte, bordi 1px, un solo accento, numeri tabulari, nessun gradiente, vetro, bagliore o viola. | Il prodotto muove denaro reale: Jakob dice che il titolare si fida di ciò che assomiglia a home banking e gestionali. Prägnanz: meno decorazione, gerarchia più leggibile. |
| P3 | **È un'organizzazione, non un flusso.** Azienda → Dipartimento → Dipendente è un organigramma a indentazione con liste e schede; mai un canvas a nodi. | Anti-riferimento n8n: un grafo comunica "automazione", una gerarchia comunica "responsabilità". Jakob: il titolare conosce organigrammi e rubriche, non editor di flussi. |
| P4 | **Fermare è a un tocco, riprendere è sempre possibile; l'irreversibile si conferma.** Stop singolo immediato; "Ferma tutto" si arma sul posto (due tocchi sullo stesso bersaglio); eliminare richiede dialogo. | Postel + Parkinson: lo stop è protettivo e reversibile, quindi senza conferma; l'asimmetria dei costi (secondi di spesa vs riavvio) lo giustifica. La conferma resta solo dove il danno non si annulla. |
| P5 | **Stato = forma + icona + etichetta; il colore è ridondanza.** Ogni stato ha un glifo distinto in monocromia e un'etichetta sempre adiacente. | Vincolo di sistema del brief e WCAG 1.4.1. Similarità: una forma = un significato in tutto il prodotto, anche quando il rivenditore cambia colori. |
| P6 | **Stessi componenti, due assi regolabili.** `data-density` (comfortable/compact) governa geometria; `data-detail` (business/technical) governa quali informazioni si rendono. Preset "Titolare" e "Operatore" sono solo combinazioni di default. | Il brief vieta due prodotti. Tesler: la complessità tecnica si rivela quando serve, non si duplica in un'altra app. Hick: il preset per ruolo toglie decisioni all'utente. |
| P7 | **Il denaro è un tipo di dato di prima classe.** Sempre tabulare, sempre con periodo di riferimento, sempre con indicatore di freschezza quando è live, mai animato "a contatore". | Domanda 2 del brief. Miller: il periodo accanto al numero evita di ricordarlo da un'altra schermata. Doherty onesta: la freschezza dichiara che il sistema risponde senza inventare movimento. |
| P8 | **Grammatica delle forme: cerchio = persona, quadrato arrotondato = agente, rombo = decisione umana richiesta.** Nessun avatar illustrato: monogramma a due lettere + nome + ruolo. | Anti-riferimento avatar cartoon. Von Restorff: l'unico rombo in una lista è ciò che richiede l'umano. Similarità: la forma distingue umano/agente anche in bianco e nero. |

### 0.1 Firme del sistema (sopravvivono al rebrand)

Con il white-label l'identità non può vivere nella tinta o nel font. Vive in tre mosse strutturali, non sovrascrivibili dal rivenditore.

| Firma | Regola | Perché |
|---|---|---|
| F1 **Riga di registro** | Ogni riga che contiene denaro (RunRow, DataTable, ControlStrip, ApprovalCard, StopReceipt) ha il costo allineato a destra in una colonna fissa `--sys-size-col-money` (112px comfortable / 96px compact), cifre tabulari, separato da un filetto 1px. | Serial Position: il costo è l'ultimo elemento della riga, quindi ricordato. Prossimità e Similarità: l'occhio trova "quanto costa" sempre nello stesso punto, in ogni schermata. |
| F2 **Tre forme** | Cerchio = persona, quadrato arrotondato (raggio 4, mai scalato oltre) = agente, rombo = richiesta di approvazione. Mai illustrazioni, mai foto per gli agenti. | P8 reso verificabile. Il rivenditore può cambiare tutto il colore e il prodotto resta riconoscibile per grammatica, non per palette. |
| F3 **Il numero è il titolo** | Una sola cifra in `display-lg` per schermata (la risposta a "quanto sta costando" nel periodo corrente), con etichetta+periodo sopra e freschezza sotto. Tutti gli altri KPI in `display` o `title-num`. | Von Restorff: un solo numero domina. Hick: il titolare non deve scegliere quale cifra è "la risposta". Evita la dashboard-vetrina con quattro numeri enormi che nessuno legge. |

---

## 1. Tipografia

### 1.1 Famiglie

| Token | Default (assunzione) | Requisiti per il font di brand | Uso |
|---|---|---|---|
| `--sys-font-family-sans` | IBM Plex Sans, poi `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | pesi 400/500/600; copertura Latin-1 + Latin Extended-A; file woff2 ≤ 120 KB per peso | tutta l'interfaccia |
| `--sys-font-family-numeric` | = sans | **deve** avere `tnum` e `lnum`; se il sans di brand non li ha, il validatore lascia qui IBM Plex Sans | Money, DataTable numerica, BudgetBar, contatori, orari |
| `--sys-font-family-mono` | IBM Plex Mono, poi `ui-monospace, "SF Mono", Menlo, Consolas, monospace` | — | **solo** codice, ID, payload delle tracce, diff. Mai etichette UI, mai importi |

**Perché IBM Plex.** È una famiglia disegnata per strumenti di lavoro, con cifre tabulari e un mono gemello, e non è il font "sicuro" del SaaS AI (Inter, Space Grotesk). Resta un'assunzione: si sostituisce cambiando un solo token in `brand.css`.
**Perché tre ruoli e non due.** Un font di brand senza cifre tabulari fa saltellare le colonne di costo a ogni tick: `--sys-font-family-numeric` isola il rischio (Prägnanz, Doherty) senza vietare il font al rivenditore.

### 1.2 Scala

Valori in px (in produzione `rem`, così il font scale di sistema li muove). Peso massimo 600. Minimo 12px, mai per gli importi.

| Token | Desktop | Mobile (<600) | Peso | Uso | Perché |
|---|---|---|---|---|---|
| `display-lg` | 40/44, tracking −0.015em | 32/36 | 600 | **Una** cifra per schermata (F3) | Un solo numero domina (Von Restorff); su 360px "12.480,00 €" deve entrare con l'etichetta. |
| `display` | 28/32 | 24/28 | 600 | KPI secondari, max 3 per riga | Rapporto 1.43 con display-lg: la gerarchia si legge a colpo d'occhio (Prägnanz); 4 numeri per riga è il limite di Miller. |
| `headline` | 24/32 | 22/28 | 600 | titolo pagina | Un solo headline per pagina: dice dove si è (Jakob). |
| `title` | 20/28 | 20/28 | 600 | titolo sezione, titolo Sheet/Dialog | Stacca le sezioni senza bordi (Prossimità). |
| `title-num` | 20/28, tnum | 20/28 | 600 | totali di tabella, importo nell'ApprovalCard, segmento denaro della ControlStrip | Il totale è il numero che si controlla per primo: peso del titolo, metrica del numero. |
| `title-sm` | 18/24 | 18/24 | 600 | titolo scheda, titolo richiesta | Sotto il titolo di sezione, sopra il corpo: tre livelli bastano (Hick). |
| `body-lg` | 16/24 | 16/24 | 400 | testo primario mobile, anteprime nelle approvazioni, input | Sotto 16px iOS ingrandisce gli input; la decisione dal telefono merita il corpo più leggibile (Fitts visivo). |
| `body` | 14/20 (compact 13/18) | 16/24 | 400 | testo UI di default | 14 è il compromesso densità/leggibilità degli strumenti operativi; compact non scende sotto 13. |
| `label` | 13/16 | 14/20 (pulsanti 16/20) | 500 | pulsanti, tab, intestazioni tabella, chip | Peso 500 distingue "azionabile" da "leggibile" senza grassetto pesante (Similarità). |
| `label-sm` | 12/16 | — | 500 | chip in compact, StateBadge | Il minimo della scala, solo dove l'etichetta è accanto a un glifo. |
| `caption` | 12/16 | 12/16 | 400 | meta, periodo, freschezza, unità | Mai per una cifra di denaro: 0,12 e 0,72 a 12px si confondono. |
| `mono` | 13/20 | 13/20 | 400 | codice, ID, tracce | Stessa taglia del corpo compact: il payload non "grida" (anti-terminale). |
| `mono-sm` | 12/18 | — | 400 | log densi in `technical` | Solo per l'operatore, mai per il titolare (Tesler). |

### 1.3 Regole

- **Cifre**: `font-variant-numeric: tabular-nums lining-nums` (`--sys-font-feature-numeric`) in colonne, contatori, orari, importi. Vietati `oldstyle-nums` e `slashed-zero` fuori da `technical`. *Perché*: le colonne di numeri devono formare una figura leggibile (Prägnanz); lo zero barrato sembra codice.
- **Importi**: mai sotto 13px su desktop e 14px su mobile. *Perché*: il numero è il bersaglio visivo primario del titolare (Fitts applicato alla lettura).
- **Maiuscole**: nessun all-caps in tutto il sistema, nemmeno nelle intestazioni di tabella. Lessico degli stop: "Ferma", "Ferma tutto", "Arresto in corso", "Forza arresto"; mai "Kill", "Abort", "Terminate" nell'interfaccia. *Perché*: l'all-caps allunga l'italiano di un altro 10% e appartiene al centro di comando, non a un prodotto professionale.
- **Misura**: testo corrente max 70ch; titoli `text-wrap: balance`. *Perché*: leggibilità e nessuna riga orfana nelle intestazioni italiane più lunghe.
- **Stringhe di sistema vs dati**: etichette, stati e azioni **non si troncano mai**; nomi, titoli di task, titoli di modifiche e URL sono dati e si troncano con tooltip. *Perché*: Postel, un'etichetta troncata cambia significato ("Ferma tut…"); un titolo troncato no.
- **Etichette a capo**: pulsanti `height: auto; min-height` (40/32/48), massimo 2 righe, `hyphens: manual`; in una barra d'azione i fratelli si allineano con `align-items: stretch`. Compact (32px) non ammette il wrap. *Perché*: le stringhe italiane corte sono fino a +86% rispetto all'inglese (misurato: "In esecuzione" vs "Running"); la media +18% nasconde gli outlier.
- **Budget di caratteri** (sezione 10.4) valida ogni stringa di sistema sul font di default prima del rilascio.

---

## 2. Colore

### 2.0 Architettura dei token

Quattro livelli, nome che dichiara il livello: `--{tier}-{categoria}-{ruolo}[-{variante}][-{stato}]`.

| Tier | Prefisso | Chi lo legge | Esempio |
|---|---|---|---|
| Primitivi | `--ref-` | solo `sys` | `--ref-color-neutral-500` |
| Semantici | `--sys-` | componenti e `cmp`; unico livello ridefinito da tema e densità | `--sys-color-status-running-fg` |
| Componente | `--cmp-` | il singolo componente; esiste solo se varia per densità/tema/brand | `--cmp-button-primary-bg-hover` |
| Brand | `--brand-` | solo `sys`, sempre con fallback `var(--brand-x, default)` | `--brand-accent` |

*Perché*: un componente che legge `--ref-` o `--brand-` cabla il marchio o la palette. Il prefisso rende la regola verificabile da lint in CI (Similarità: stesso nome = stesso ruolo ovunque; Tesler: il theming vive nel build, non nel componente).
*Regola di dipendenza*: `brand` non dipende da nulla; `sys` legge `ref` e `brand`; `cmp` legge solo `sys`; i componenti leggono solo `sys` e `cmp`. Colori di stato, feedback, pericolo e focus **non** hanno un input `brand`.

### 2.1 Neutri (tema chiaro, "carta")

Rampa generata in OKLCH a luminosità fissa per gradino, tinta `--brand-neutral-hue` (default 80°, carta calda) e croma `--brand-neutral-chroma` (default 0.008, massimo 0.02). I gradini di luminosità non sono sovrascrivibili: garantiscono i contrasti.

| Token `--ref-color-neutral-*` | Hex (default) | Ruolo semantico | Contrasto verificato |
|---|---|---|---|
| 0 | `#FFFFFF` | `surface` (schede, righe, fogli) | — |
| 50 | `#F8F7F4` | `canvas` (sfondo pagina), blocchi codice | — |
| 100 | `#F1EFEA` | `surface-sunken`, `surface-hover`, `accent-subtle` (default) | — |
| 200 | `#E6E3DC` | `border` (divisori, schede) — decorativo | — |
| 300 | `#D3CFC6` | `border-strong` (divisori forti, chip queued tratteggiato) — decorativo | — |
| 400 | `#A8A39A` | `text-disabled`, `icon-disabled` — non informativo | — |
| 450 | `#8A857C` | `border-input`, `text-placeholder` (solo esempi di formato) | 3,67:1 su bianco · 3,19:1 su n100 |
| 500 | `#6F6A61` | `text-secondary`, `icon-secondary`, stato queued | 5,37:1 su bianco · 5,01:1 su canvas · 4,67:1 su n100 |
| 600 | `#5C574F` | `icon`, `border-input-hover` | 7,16:1 su bianco |
| 700 | `#3F3B35` | testo forte alternativo, `budget-used` | 11,1:1 su bianco |
| 750 | `#3A362F` | dark: `surface-overlay`, `border` | — |
| 800 | `#29261F` | dark: `surface-raised` | — |
| 850 | `#221F1A` | dark: `surface` | — |
| 900 | `#1A1814` | `text`, `focus-ring`, `shadow`; dark: `canvas` | 17,7:1 su bianco |

*Perché caldi e non freddi*: il grigio bluastro è il passaggio che trasforma la "carta" nel look SaaS AI; un neutro con lieve tinta calda legge come registro (P2). *Perché il gradino 450*: il bordo di un campo è l'unico indicatore del suo confine e WCAG 1.4.11 chiede 3:1; i neutri 200/300 restano decorativi. *Perché 500 = #6F6A61 e non #7C776E*: la bozza iniziale falliva AA (4,45:1) proprio sul testo che certifica la freschezza dei numeri; corretto e verificato numericamente su tutte le superfici chiare.

### 2.2 Accento (white-label; default "Inchiostro")

Il rivenditore fornisce **un** valore, `--brand-accent`. Il sistema deriva i ruoli.

| Token `--sys-color-*` | Default | Derivazione | Uso |
|---|---|---|---|
| `accent` | `#2B2823` | `var(--brand-accent, #2B2823)` | pulsante primario, NavItem attivo (barra), tab attiva |
| `accent-hover` | `#1A1814` | `oklch(from accent calc(l - .05) c h)` | hover primario |
| `accent-active` | `#111008` | `oklch(from accent calc(l - .10) c h)` | pressione |
| `accent-subtle` | `#F1EFEA` | `color-mix(in oklch, accent 10%, surface)` | riga selezionata, sfondo tab attiva |
| `accent-subtle-hover` | `#E6E3DC` | `… 16% …` | hover riga selezionata |
| `accent-text` | `#2B2823` | `oklch(from accent min(l, .45) c h)` | link nel testo (sempre sottolineati) |
| `on-accent` | `#FFFFFF` | `var(--brand-on-accent, #FFFFFF)` | testo sul primario (verificato 14,7:1) |

*Perché l'accento di default è acromatico*: la prima bozza usava un blu scuro; con lo stato "in esecuzione" blu il prodotto aveva due blu, cioè il "blu da SaaS". Con l'inchiostro, il blu di running è **l'unica tinta fredda** dell'interfaccia (Von Restorff: "sta girando" salta all'occhio) e il primario nero-inchiostro è la grammatica di Stripe/Basecamp che l'utente riconosce (Jakob).
*Perché un solo input*: sei gradini scaricano sei decisioni e quattro verifiche di contrasto sul rivenditore, che sbaglia (Hick, Postel). Il validatore (sezione 9) impone: `on-accent` su `accent` ≥ 4,5:1, `accent-text` su `surface` ≥ 4,5:1, distanza di tinta dall'azzurro running ≥ 40° oppure attivazione automatica della variante running alternativa (petrolio).

### 2.3 Stati dell'esecuzione (run)

Sei stati stabili più uno transitorio. Ogni stato ha cinque token (`bg`, `border`, `fg`, `solid`, `on-solid`), un glifo, un'etichetta corta (≤ 14 caratteri IT) e un modello di etichetta lunga. **Non sono sovrascrivibili dal white-label.**

| Stato | Glifo (forma) | `bg` | `border` | `fg` (testo su bg) | `solid` (glifo su bianco) | IT corta / lunga | EN corta / lunga |
|---|---|---|---|---|---|---|---|
| `running` | ● punto con anello (◉) | `#E6F0FB` | `#B7D0F0` | `#1D4F9C` (6,9:1) | `#2B6CD4` (5,0:1) | **In esecuzione** / In esecuzione da {durata} · passo {n}/{m} | **Running** / Running for {duration} · step {n}/{m} |
| `approval` | ◆ rombo | `#FBF1DC` | `#EFD59A` | `#7A4E00` (6,4:1) | `#B8740A` (3,8:1) | **Da approvare** / In attesa della tua approvazione da {durata} | **Needs approval** / Awaiting your approval for {duration} |
| `stopping` (transitorio) | ■ in anello che ruota | = stopped | = stopped | = stopped | = stopped | **Arresto…** / Arresto in corso da {durata} | **Stopping…** / Stopping for {duration} |
| `stopped` | ■ quadrato pieno | `#E6E3DC` | `#D3CFC6` | `#3F3B35` (8,7:1) | `#5C574F` (7,2:1) | **Fermato** / Fermato: {motivo} · {ora} | **Stopped** / Stopped: {reason} · {time} |
| `completed` | ✓ spunta | `#E4F3E9` | `#ABD8BA` | `#1B6B3A` (5,7:1) | `#2E8B57` (4,3:1) | **Completato** / Completato alle {ora} · {n} modifiche | **Completed** / Completed at {time} · {n} changes |
| `failed` | ⊗ croce in cerchio (croce nuda a 12px) | `#FBE7E5` | `#F0B7B1` | `#9B2A1F` (6,4:1) | `#C93A2C` (5,1:1) | **Fallito** / Fallito: {causa} — {azione} | **Failed** / Failed: {cause} — {action} |
| `queued` | ○ cerchio vuoto, chip a contorno tratteggiato | trasparente | `#D3CFC6` tratteggiato | `#6F6A61` (5,4:1) | `#6F6A61` | **In coda** / In coda, parte alle {ora} | **Queued** / Queued, starts at {time} |

Il glifo ▲ è **riservato agli avvisi** che si sovrappongono a uno stato (budget ≥ 80%, nessun segnale, dati stantii), mai a uno stato.

Regole:
- **Chip = solo etichetta corta**, `white-space: nowrap`, altezza 24 (compact 20), raggio 4 (mai pillola). L'etichetta lunga è testo adiacente in `caption` o va nell'intestazione di dettaglio. *Perché*: "In attesa di approvazione" a 13px è una frase, non un chip; un chip su due righe sembra rotto (Prägnanz). Misurato: la corta italiana peggiore, "In esecuzione", è ≈ 100px a 14px.
- **Il punto da solo (8px) è ammesso solo per `running`** nei contatori (ControlStrip, sidebar) e sempre con il numero accanto. Tutti gli altri stati si rendono con glifo ≥ 12px + etichetta. *Perché*: a 8px cerchio pieno, vuoto e spunta sono indistinguibili; il punto trasmette solo colore (P5).
- **Un solo elemento animato per regione di viewport**: pulsa il ● aggregato della ControlStrip e, se aperto, quello del dettaglio agente. Nelle liste `running` è statico; la "vita" la comunica la durata che avanza al minuto. Anello 1px, offset 2px, opacità .4→1 in 1,8 s, **senza** `box-shadow` né blur. `stopping` usa una rotazione di 1 s, non una pulsazione. Con `prefers-reduced-motion` tutto è statico. *Perché*: venti righe che respirano sono la firma del centro di comando; se tutto pulsa nulla emerge (Von Restorff). Il glifo ◉ non cambia disegno senza animazione, quindi l'informazione non si perde.
- **`stopping` è obbligatorio**: al tocco su "Ferma" il chip passa a "Arresto…" entro 100 ms e il pulsante si disabilita con la stessa etichetta; il Money della riga congela l'ultimo valore. Dopo `--sys-behavior-stop-grace` (10 s) la riga espone "Forza arresto" (pieno rosso, con dialogo: è l'unica eccezione, perché irreversibile). *Perché*: un agente non si ferma in 0 ms; mostrare subito "Fermato" mentre il costo fa un altro tick distrugge la fiducia nel pulsante più importante (Doherty onesta, Postel).
- **Etichetta lunga di `stopped` e `failed` obbligatoria** con motivo tipizzato: `user` ("Fermato da Marco · 14:32"), `stop_all` ("Fermato con Ferma tutto"), `budget` ("Fermato: budget raggiunto (50,00 € / 50,00 €)"), `timeout`, `rejected` ("Fermato: richiesta rifiutata"). Per `failed`: causa in linguaggio piano + azione ("Fallito: credito API esaurito — Ricarica"); l'errore grezzo sta nel disclosure tecnico. Il motivo cambia l'azione di ripresa: `budget` → "Alza il budget e riprendi". *Perché*: per un prodotto che muove denaro "Fermato" senza chi/perché/quando è un buco di audit; Postel chiede di spiegare e dire come rimediare; Hick di raccomandare l'azione giusta.
- **"Riprendi" solo se il runtime riparte dal checkpoint**; altrimenti l'azione si chiama "Riavvia" e non è presentata come undo. *Perché*: un "Annulla" che fa perdere lavoro è una promessa falsa; l'utente smetterebbe di usare lo stop (Postel, Peak-End).
- **Ordine canonico per stato** (liste, sidebar, notifiche): approval → failed → stopping → running → queued → completed → stopped; a parità, per costo live decrescente. *Perché*: "cosa gira adesso" mette in cima ciò che richiede l'umano (Serial Position, default sensato di Hick).
- **Modificatore `stale`** su `running`: nessun evento da `--sys-behavior-stale-after` (120 s) → glifo ▲ 12px dopo l'etichetta, bordo chip ambra, etichetta lunga "In esecuzione · nessun segnale da 6 min"; oltre 600 s la riga raccomanda "Ferma". *Perché*: è lo stato più pericoloso di una console (dichiara di lavorare, forse consuma, non produce); Postel avvisa prima che il danno cresca.

### 2.4 Stati della richiesta di approvazione

Riusano i token di run: stessa grammatica, nessun colore nuovo. Etichette al femminile ("richiesta"), nel file lingua, mai composte a runtime.

| Stato richiesta | Token riusati | Glifo | IT / EN |
|---|---|---|---|
| `pending` | approval | ◆ | In attesa / Pending |
| `changes_requested` | approval | ✎ | Modifiche richieste / Changes requested |
| `approved` | completed | ✓ | Approvata / Approved |
| `executing` (durante e dopo la grazia) | running | ◉ | In pubblicazione / Publishing |
| `rejected` | stopped | ■ | Rifiutata / Rejected |
| `expired` | queued | ⌛ | Scaduta / Expired |

*Perché*: rifiutare è un esito normale, non un errore, quindi neutro e non rosso; la run collegata passa a `stopped` con motivo `rejected`, così esiste un solo modo per dire "non sta più lavorando" (Similarità).

### 2.5 Stato del dipendente (agente), distinto dalla run

| Stato | Glifo | Tinta | IT / EN |
|---|---|---|---|
| `idle` | — trattino | nessuna (testo `text-secondary`) | Inattivo / Idle |
| `busy` | ● + contatore (da running) | running | 2 in esecuzione / 2 running |
| `approval` | ◆ + contatore | approval | 1 da approvare / 1 needs approval |
| `disabled` | ⊘, bordo AgentMark tratteggiato | nessuna | Disattivato / Disabled |

*Perché*: la sidebar mostra persone-agenti, non run: un agente senza lavoro non è "in coda" né "fermato". Solo `busy` e `approval` hanno tinta (Von Restorff: la sidebar resta piatta e si accende solo dove serve attenzione).

### 2.6 Feedback di sistema

`--sys-color-feedback-{info|success|warning|danger}-{bg|border|fg|solid|on-solid}`: alias rispettivamente delle rampe running, completed, approval, failed. Usati per validazione, toast, soglie di budget e banner. *Perché nomi separati se i valori coincidono*: "budget all'80%" e "da approvare" non devono sembrare imparentati; con nomi distinti si possono divaricare senza toccare i componenti (Similarità: stesso aspetto solo per stesso significato).

### 2.7 Denaro

| Token | Valore | Uso |
|---|---|---|
| `--sys-color-money` | = `text` `#1A1814` | consuntivi |
| `--sys-color-money-muted` | = `text-secondary` `#6F6A61` | stime (`≈`), valori secondari |
| `--sys-color-money-warn` | `#7A4E00` (7,2:1 su bianco) | solo testo + icona ◔ o ▲, **mai** sfondo tinta |
| `--sys-color-money-over` | `#9B2A1F` (7,7:1) | oltre budget, margine negativo: colora anche le cifre, con ▲ e prefisso testuale |
| `--sys-color-money-positive` | `#1B6B3A` (6,5:1) | solo margine e ricavo nei report, mai "costo basso" |
| `--sys-color-budget-used` | `#3F3B35` | segmento consumato della BudgetBar (non blu: il blu è "running") |

Regole (dettaglio nel componente Money, sezione 8):
- **Valore e giudizio separati**: le cifre restano in `money`/`money-muted`; il giudizio (entro/oltre budget, margine basso) vive in un elemento adiacente con icona + etichetta. Unica eccezione `over`, perché è l'unico stato che richiede azione. *Perché*: colorare le cifre fa leggere i colori invece dei numeri; ambra sul costo accanto a un chip ambra "Da approvare" fa leggere un problema dove c'è una soglia.
- **Formato solo via `Intl.NumberFormat`** con `useGrouping: 'always'`, valuta e locale da configurazione tenant (non token CSS). Canonici: it-IT `4,82 €` · `1.234,56 €` · `0,11 €/min` · `−38,00 €`; en `€4.82` · `€1,234.56` · `€0.11/min` · `−€38.00`. Mai stringhe composte a mano, mai parentesi contabili, mai `notation: compact` per il denaro. *Perché*: "€ 4,82" non esiste in nessun locale ed è il dettaglio che fa dire a un commercialista "questo software non sa contare" (Jakob).
- **Precisione per contesto**, non per grandezza: totali/KPI/budget/margine 2 decimali fissi; tasso 2 decimali + unità obbligatoria e prefisso `≈`; micro-costi (task, passo, chiamata) 4 decimali fissi **solo** in `technical`; in `business` sotto 0,01 → "< 0,01 €" con valore esatto nel tooltip. *Perché*: decimali variabili nella stessa colonna disallineano le virgole e comunicano approssimazione (Prägnanz); i millesimi sono rumore per il titolare (Tesler).
- **Stima → consuntivo**: finché la run è `running`/`approval` il costo è `kind=estimate` (prefisso ≈, `money-muted`, FreshnessMark); alla chiusura diventa `cost` senza prefisso e con ora di chiusura. Nei totali di periodo "4,40 € + ≈ 0,42 € in corso" restano due segmenti. *Perché*: un numero provvisorio con l'autorità del definitivo genera "ieri diceva 4,82 e oggi 4,91" (Postel, Zeigarnik).
- **Simbolo in intestazione nelle tabelle** ("Costo (€)"), celle in `style: 'decimal'`; nei KPI, chip e ControlStrip il simbolo sta nel numero. *Perché*: in italiano il simbolo va dopo il numero: in ogni cella allarga la colonna del 15–20% e la sporca (convenzione contabile, Prägnanz).
- **Periodo sempre visibile** con vocabolario fisso: `adesso` (solo tasso), `questo task`, `oggi`, `questa settimana`, `questo mese`, `Cliente X · questo mese`, intervallo via `formatRange`. Vietato "ultime 24 ore" nei KPI. *Perché*: il titolare ragiona per giorni di calendario come il commercialista; un ordine fisso numero → periodo → freschezza si legge per pattern (Similarità, Miller).
- **Riconciliazione**: ogni KPI monetario è un link al dettaglio il cui totale coincide alla cifra; somme lato server in unità minime, arrotondamento una volta in visualizzazione, eventuale "differenza di arrotondamento ±0,01 €" dichiarata. *Perché*: la fiducia in un registro nasce dal poter verificare (Connessione uniforme, Jakob).
- **Ordine contabile fisso per il margine**: Ricavo · Costo · Margine (€) · Margine (%); soglia `--sys-behavior-margin-warn` 20% → ◔ "margine basso"; negativo → ▲ "in perdita" in `money-over`. *Perché*: è la domanda numero uno del titolare; se l'ordine cambia tra schermate rilegge le intestazioni ogni volta (Serial Position).

### 2.8 Azioni: stop e pericolo

Grammatica unica: **contorno = reversibile, pieno = impegna**.

| Token / variante | Valore | Uso |
|---|---|---|
| `Button variant=stop` (riga) | contorno `border-input`, testo `text`, glifo ■ in `#C93A2C` | "Ferma" nella RunRow, nel dettaglio agente, nell'header di dipartimento ("Ferma Marketing (2)") |
| `Button variant=stop-all` | contorno `#9B2A1F` 1,5px, testo `#9B2A1F`, glifo ■ | **solo** "Ferma tutto (n)" nella ControlStrip: l'unico contorno rosso per schermata |
| stato **armato** di stop-all | pieno `#9B2A1F`, testo bianco (7,7:1), etichetta "Confermi: ferma 3" | dopo il primo tocco, per 4 s |
| `Button variant=danger` | pieno `#C93A2C`, testo bianco (5,1:1); hover `#B0301F`; active `#9B2A1F` | Elimina, Forza arresto: sempre con Dialog |

*Perché il rosso non è su ogni riga*: in una lista di 12 run ci sarebbero 13 elementi rossi e il segnale d'emergenza si diluisce (Von Restorff); il glifo rosso sul contorno neutro resta trovabile senza gridare. *Perché lo stesso rosso di `failed`*: un'azione (pulsante) e uno stato (chip) hanno grammatica diversa e non compaiono mai nello stesso contenitore con lo stesso trattamento; i token restano distinti (`--sys-color-danger-*` vs `--sys-color-status-failed-*`) così il tema scuro o un futuro riallineamento possono separarli.
*Perché "Ferma tutto" si arma e non apre un dialogo*: un tocco accidentale su un pulsante persistente su ogni schermata fermerebbe l'intera azienda, ma un modale porta fuori contesto in emergenza. Il secondo tocco è sullo stesso bersaglio (spostamento zero, Fitts), il tempo totale è < 1 s (Parkinson), e il pattern "tocca di nuovo per confermare" è noto (Jakob). Si arma solo se le run interessate sono ≥ 2; con 1 si comporta come lo stop singolo. Mai press-and-hold (inaccessibile, trope da centro di comando).

### 2.9 Focus e selezione

- `--sys-color-focus-ring` `#1A1814` (chiaro) / `#F1EFEA` (scuro); `--sys-color-focus-halo` = `surface`. Anello doppio: `outline: 2px solid ring; outline-offset: 2px; box-shadow: 0 0 0 2px halo`. Solo `:focus-visible`. Un solo colore di focus per tutti i controlli, "Ferma" compreso. **Non** deriva dal brand. *Perché*: il ring agganciato all'accento sparisce con un accento chiaro o sul pulsante primario; l'alone interno garantisce 3:1 su qualunque superficie (WCAG 2.4.11/2.4.13). Il focus è accessibilità, non identità.
- Riga selezionata: `accent-subtle` + barra sinistra 2px `accent` + `aria-selected`. NavItem attivo: stessa barra + peso 600 + `aria-current="page"`. Tab attiva: sottolineatura 2px + peso 600. Link nel testo: sempre sottolineati. *Perché*: ogni stato interattivo ha un indicatore di forma oltre al colore (P5, WCAG 1.4.1) e la barra sinistra è una sola grammatica per nav e selezione (Connessione uniforme).

### 2.10 Tema scuro (derivato, opzionale, non legato al ruolo)

Il tema scuro è una **preferenza personale** (`data-theme`, assente = sistema), non parte del preset "Operatore": densità e dettaglio bastano a servire il tecnico. Ridefinisce solo token `--sys-*`, mai `ref` o `cmp`, e usa gli stessi neutri caldi: vietata una tinta separata per il dark (impedisce la deriva verso il viola).

| Ruolo | Chiaro | Scuro |
|---|---|---|
| canvas / surface / surface-raised / surface-overlay | n50 / n0 / n0 / n0 | n900 / n850 / n800 / n750 |
| text / text-secondary / icon | n900 / n500 / n600 | n100 `#F1EFEA` (14,3:1) / n300 `#B5AFA5` (6,9:1) / n300 |
| border / border-input | n200 / n450 | n750 / n500 (3,1:1) |
| accent / on-accent (default inchiostro) | `#2B2823` / bianco | `#F1EFEA` / `#1A1814` (15,4:1) — primario "inverso" |
| stato: bg / fg / solid | 100 / 700 / 500 della rampa | `color-mix(solid 18%, surface)` / gradino 300 / 500 (stopped e queued solid → `#A8A39A`) |
| focus-ring | n900 | n100 |
| elevazione | ombre | superficie più chiara + stesse ombre con alpha ×2,5 |

Tutte le coppie scure sono verificate: fg di stato su bg ≥ 5,4:1, solid su canvas ≥ 3,2:1. *Perché "inverso" per l'accento*: l'inchiostro scuro su superficie scura sparirebbe (1,4:1); un primario chiaro su fondo scuro è la convenzione (Jakob) e mantiene il peso visivo (Similarità tra temi). Un accento di brand cromatico viene invece schiarito a L ≥ 0,68 mantenendo tinta e croma, con `on-accent` ricalcolato dal validatore.
*Perché non è nel preset Operatore*: "tracce mono su fondo scuro" è esattamente il terminale finto dell'anti-riferimento; un tema legato al ruolo sdoppia il prodotto.

---

## 3. Spaziatura, densità e dettaglio

### 3.1 Scala

Base 4px. `--sys-space-{0, 050, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16}` = 0 / 2 / 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64.
*Perché*: una sola base rende ogni distanza un multiplo riconoscibile (Prossimità: 8 dentro un gruppo, 24 tra gruppi) e i componenti non inventano valori intermedi.

### 3.2 Densità (solo geometria, solo CSS)

`data-density` sull'elemento radice o su un sottoalbero; i componenti leggono token, mai l'attributo.

| Token `--sys-*` | comfortable (default Titolare) | compact (default Operatore) | Perché |
|---|---|---|---|
| `size-control` | 40 | 32 | altezza di pulsanti, campi, select |
| `size-row-list` | 48 (56 con seconda riga) | 36 | RunRow, righe di nav |
| `size-row-table` | 44 | 32 | DataTable |
| `space-card-padding` | 16 | 12 | interno di schede e fogli |
| `space-section-gap` | 24 | 16 | tra gruppi (Prossimità) |
| `space-page-gutter` | 24 (sm: 16) | 16 (sm: 12) | margini di pagina |
| `space-stack-gap` / `space-inline-gap` | 12 / 8 | 8 / 6 | tra elementi impilati / tra icona ed etichetta |
| `type-body-size` | 14 | 13 | corpo del testo |
| `size-col-money` | 112 | 96 | colonna fissa del denaro (F1) |

Invarianti che **non** seguono la densità: `size-control-lg` 48 (primario mobile), `size-target-min` 24 su puntatore fine e **44 su puntatore grossolano**, `space-target-gap` 8, `space-target-gap-opposing` 12 (tra azioni di segno opposto), ogni pulsante di stop ≥ 32×32 (44×44 su touch), ControlStrip 40 (compact 36) con "Ferma tutto" sempre etichettato, chip ≥ 20px.
*Perché le invarianti*: il preset Operatore è quello che ferma più spesso; se lo stop rimpicciolisse con il resto, la densità peggiorerebbe la fermabilità (Fitts). *Perché il clamp sul puntatore*: `@media (pointer: coarse)` forza `min-height: max(size-control, 44px)` su ogni controllo, qualunque densità: le approvazioni avvengono su telefono, e nulla impedisce all'operatore di aprire compact dal telefono (WCAG 2.5.8).

### 3.3 Dettaglio (contenuto, non CSS)

`data-detail="business|technical"` decide **cosa si rende**, non cosa si nasconde: i sottoalberi `minDetail="technical"` (payload delle tracce, diff, tab Tracce/Configurazione, costo per passo, micro-costi a 4 decimali) non vengono montati in `business`. Ogni RunRow/ChangeCard/ApprovalCard ha però **sempre** un disclosure "Dettagli tecnici" (chiuso in business, aperto in technical) che carica il contenuto alla richiesta.
*Perché*: nascondere con `display:none` scarica payload pesanti e li legge lo screen reader; ma eliminare l'accesso per ruolo viola Tesler: il titolare che vede "Fallito" deve avere la causa in linguaggio piano **e** un varco verso il dettaglio. La preferenza vive nel profilo utente; l'override per schermata su un contenitore figlio, non persistente salvo "fissa questa vista".

### 3.4 Breakpoint e layout

| Nome | Larghezza | Regole |
|---|---|---|
| sm | < 600 | una colonna; ControlStrip a una riga da 44px; RunRow a 2 righe; tabelle → liste; ApprovalCard a schermo intero; footer fisso nella zona pollice |
| md | 600–899 | sidebar collassata a 56px (solo AgentMark); DataTable con colonne a priorità |
| lg | 900–1279 | sidebar 264px; Sheet laterale 480px |
| xl | ≥ 1280 | contenuto principale `max-width: 1120px` centrato |

*Perché il max-width*: in compact su xl lo stop a fine riga può distare 1000px dal nome dell'agente; il limite e l'hover di riga (sfondo condiviso) tengono insieme ciò che il pulsante ferma (Connessione uniforme).
*Zona pollice*: le azioni primarie stanno nel 30% inferiore dello schermo; **la possiede l'ApprovalCard**. "Ferma tutto" su mobile sta in alto a destra nella ControlStrip, mai accanto ad "Approva" (distanza minima tra un'azione rossa e un primario: 24px). *Perché*: due bersagli ad alto impatto e segno opposto a 8px sono un mis-tap garantito (Postel); lo stop d'emergenza in alto a destra è la posizione iOS dell'azione di barra (Jakob).

### 3.5 Offset delle barre fisse

`--sys-size-sticky-top` (ControlStrip + eventuale intestazione tabella) e `--sys-size-sticky-bottom` (footer approvazione + `env(safe-area-inset-bottom)`) alimentano `scroll-padding-top/bottom` su `html` e l'ancoraggio dei Toast (sempre sopra il footer, mai sovrapposti).
*Perché*: WCAG 2.4.11 "focus non oscurato": con barre persistenti il focus da tastiera finirebbe sotto la ControlStrip o sotto "Approva" (Fitts: il focus è dove l'utente guarda).

---

## 4. Raggi

Semantici, mai numerici nei componenti. Il rivenditore imposta `--brand-radius-scale` ∈ [0, 1.25], clampato.

| Token | px | Uso | Scala col brand? |
|---|---|---|---|
| `--sys-radius-badge` | 4 | chip, tag, AgentMark, StateBadge | sì, ma **mai oltre 4** (`min(calc(4px*scale), 4px)`) |
| `--sys-radius-control` | 6 | pulsanti, campi | sì |
| `--sys-radius-container` | 8 | schede, blocchi codice | sì |
| `--sys-radius-overlay` | 12 | Sheet, Dialog, Popover | sì |
| `--sys-radius-round` | 9999 | PersonMark, punto di stato, BudgetBar | **no** |

*Perché raggi piccoli*: un raggio contenuto legge "strumento serio"; le pillole a 999px sono la firma del SaaS AI generico. *Perché il clamp*: a 1,5 il quadrato dell'agente diventava quasi un cerchio e la grammatica delle forme (F2) si perdeva; a 0 (banche, studi legali) l'agente è un quadrato netto e la persona resta un cerchio. Regola concentrica per elementi a filo bordo: `inner = max(0, container − padding)`.

---

## 5. Elevazione

Piatto prima di tutto. Ombre neutre derivate da `--sys-color-shadow` (= neutral-900 con la tinta del brand), mai colorate, mai bagliori.

| Livello | Uso | Trattamento (chiaro) | Scuro |
|---|---|---|---|
| 0 | schede sul canvas, righe | bordo 1px `border`, nessuna ombra | idem |
| 1 | barre sticky, scheda in evidenza | bordo + `0 1px 2px shadow/.06` | superficie n800 + alpha ×2,5 |
| 2 | Popover, menu, Toast | bordo + `0 4px 12px shadow/.10, 0 1px 2px shadow/.06` | superficie n750 |
| 3 | Dialog, Sheet | `0 16px 40px shadow/.16` + scrim `shadow/.40` (.60 scuro) | superficie n750 |

Z-index: `--sys-z-{base, sticky, overlay, modal, toast}` = 0 / 10 / 20 / 30 / 40.
*Perché quattro livelli*: bastano a dire "sta sopra" (Prägnanz); ogni ombra in più è decorazione. *Perché il bordo anche sul livello 0*: i chip tinta sono quasi invisibili sul fondo di hover (misurato 1,0:1): il bordo 1px li tiene leggibili senza scurire le tinte.

---

## 6. Movimento

| Token | Valore | Uso |
|---|---|---|
| `--sys-motion-duration-fast` | 120 ms | hover, toggle, cambio stato di un pulsante |
| `--sys-motion-duration-base` | 200 ms | menu, popover, chip |
| `--sys-motion-duration-slow` | 300 ms | Sheet, Dialog |
| `--sys-motion-easing-standard` | `cubic-bezier(.2, 0, 0, 1)` | tutto |
| `--sys-motion-pulse` | 1800 ms, opacità .4→1 | **solo** il LiveIndicator autorizzato della regione |
| `--sys-motion-spin` | 1000 ms lineare | solo `stopping` e loading |

Regole: ogni tocco produce uno stato visibile entro 100 ms e un esito (o uno stato "in corso" con testo) entro 400 ms; le cifre non si animano mai a contatore; con `prefers-reduced-motion` pulsazioni e rotazioni diventano statiche e il loading mostra un glifo statico + etichetta variante ("Fermo…", "Approvo…") + `aria-busy`.
*Perché*: Doherty vale anche per chi ha ridotto il movimento: uno spinner fermo senza testo non è feedback. *Perché niente contatori*: un numero che scorre è la firma del cruscotto finto e mente sul valore reale (P7).

---

## 7. Iconografia

- Un solo set outline (assunzione: **Lucide**), tratto 1,5px, griglie 16/20/24, `currentColor`, `aria-hidden` quando l'etichetta è adiacente, altrimenti `role="img"` + etichetta localizzata.
- Mai emoji, mai glifi di font per gli stati, mai icone piene colorate salvo i sette glifi di stato (sezione 2.3) resi come SVG monolinea.
- Glifi di stato come token `--sys-icon-status-*`, così l'intero set si riallinea all'immagine di riferimento senza toccare i componenti.

*Perché*: la mano ✋ della prima bozza renderizza come emoji colorata su iOS e riporta il prodotto al giocattolo; un set unico con tratto uniforme è ciò che rende i chip coerenti in ogni tenant (Similarità).

---

## 8. Componenti di base

Tre livelli, ciascuno ≤ 9 voci (Miller). I compositi sono fatti **solo** di primitivi: il segmento "cosa gira" della ControlStrip *è* uno StatusChip in variante contatore, il segmento denaro *è* un Money in variante compatta.

### 8.1 Primitivi

**Button** — varianti `primary` (pieno accento), `secondary` (contorno `border-input`, testo), `tertiary` (solo testo), `stop` (contorno neutro + ■ rosso), `stop-all` (contorno rosso, si arma), `danger` (pieno rosso). Altezze 40/32/48, `min-width: 88px`, mai larghezza fissa; loading = lo spinner sostituisce l'icona e l'etichetta resta (larghezza stabile). Un solo `primary` e un solo contorno rosso per contenitore. Etichetta = verbo + oggetto quando l'azione impegna ("Approva e pubblica", "Elimina dipartimento"), mai "OK".
*Perché*: Von Restorff funziona solo se c'è un solo dominante; Postel chiede che la conseguenza si legga sul pulsante stesso; il `min-width` senza `width` è l'unica regola che regge l'italiano.

**Field** (input, select, textarea, toggle) — etichetta **sopra**, sempre visibile, `<label for>`; helper e errore sotto, collegati con `aria-describedby`; errore = icona ▲ + testo `failed-fg` + bordo 2px + `aria-invalid`, mai solo colore; obbligatorio scritto "(obbligatorio)"; input ≥ 16px su touch. Accetta varianti ragionevoli e riformatta al blur: importi "1.200,50" / "1200.50" / "€ 1200" / "1,2k"; durate "2h", "90 min", "1:30"; date relative "domani 9:00". Il valore digitato non si cancella mai in caso di errore.
*Perché*: l'etichetta a sinistra a 360px mangia metà riga in italiano (Prossimità, Postel); l'errore deve dire cosa e come ("Importo non valido. Usa la virgola per i decimali, es. 12,50").

**StatusChip** — glifo 12/16 + etichetta corta, altezza 24/20, raggio 4, `nowrap`, bordo 1px; `data-status` seleziona i cinque token; variante `count` ("● 3") per barre e sidebar; l'etichetta lunga è testo adiacente, mai dentro il chip. Colonna Stato in compact: `min-width: 128px` (misura italiana peggiore + padding).
*Perché*: un chip è un'etichetta, non una frase; la stessa altezza per tutti i chip è ciò che fa leggere la colonna Stato come figura (Similarità, Prägnanz).

**AgentMark / PersonMark** — quadrato arrotondato (raggio 4) con monogramma a due lettere dal nome dell'agente, sfondo `surface-sunken`, testo `#3F3B35` peso 600, taglie 20/24/32/40, bordo sinistro 2px nel colore del dipartimento (`--sys-color-dept-1..6`, sei tinte desaturate, token chiusi); disattivato = bordo tratteggiato. PersonMark = cerchio, stesse taglie. Sempre accompagnato da "Nome · Ruolo".
*Perché*: nessuna illustrazione (anti-riferimento); il bordo di dipartimento aiuta a scansionare quindici agenti tutti grigi senza colorare gli sfondi (Von Restorff moderato, Connessione uniforme).

**Money** — prop obbligatoria `kind`: `cost | estimate | budget | margin | rate | revenue`; rende `{prefisso}{valore}{unità} · {periodo} · {freschezza}`; `.num` (font numerico, tnum); precisione dalla sezione 2.7; `aria-label` statico con il valore per intero ("4,82 euro oggi"), **nessun** `aria-live` sul valore che ticka; variante `live` = FreshnessMark, senza anello; aggiornamento a tick ≥ 5 s, nessuna transizione di colore al cambio.
*Perché*: senza `kind` "4,82 €" è ambiguo (speso? previsto? disponibile?); un valore live in una live region interrompe lo screen reader ogni secondo su ogni schermata (Miller, accessibilità).

**BudgetBar** — tre segmenti: consumato (pieno `budget-used`), stimato in corso (tratteggio leggero), residuo (traccia `border`); tacca verticale fissa all'80% sempre visibile; etichetta numerica obbligatoria adiacente ("482,00 € di 600,00 € · 80 %"); oltre il 100% la barra si ferma piena in `money-over` e compare il chip "+38,00 € oltre"; altezza 6/4, raggio round; `role="progressbar"` con `aria-valuetext` localizzato.
*Perché*: una barra senza cifre è decorazione, non registro (Prossimità); la soglia deve esistere anche per chi non distingue l'ambra (P5, Goal-Gradient); una barra che sfonda il 100% rompe la lettura proporzionale (Postel).

**FreshnessMark** — livelli discreti: `fresh` ≤ 10 s → ● 6px verde + "live"; `recent` ≤ 60 s → "aggiornato 45 s fa" (ri-render ogni 10 s, mai al secondo); `stale` > 60 s → ⟳ + ora assoluta "dati alle 14:32" + "Aggiorna", cifre in `money-muted`; `disconnected` → banner "Connessione persa, ultimi dati alle 14:32". `<time datetime>` con `min-width` in `ch`.
*Perché*: la freschezza è la firma di attendibilità del numero (Doherty onesta); un contatore di secondi accanto ai KPI è un tassametro ansiogeno e fa ballare la barra (Prägnanz); un registro cita l'ora, non "qualche minuto fa".

**Icon + LiveIndicator** — Icon: set unico (sezione 7). LiveIndicator: anello 1px, offset 2px, `motion: pulse | spin | static`, `size: 8 | 12 | 16`; il contenitore `data-live-region` anima solo il primo LiveIndicator, gli altri cadono a statico; reduced-motion → tutti statici.
*Perché*: la regola "un solo elemento animato per regione" è applicabile solo se l'anello è una primitiva unica (Similarità, Prägnanz).

**Skeleton / InlineError / EmptyState** — skeleton della stessa altezza delle righe (nessun salto), `aria-busy` sul contenitore, oltre 1 s testo "Caricamento attività…", oltre 5 s InlineError con "Riprova"; InlineError = ▲ + causa + azione, mai solo colore; EmptyState = una frase + una sola azione primaria.
*Perché*: Doherty senza salti di layout; Postel: l'errore dice come rimediare; Hick: uno stato vuoto propone una cosa sola.

### 8.2 Overlay

**Sheet** — pannello laterale 480px (≥ lg) o bottom sheet (sm/md), raggio 12, elevazione 3; `role="dialog" aria-modal`, titolo `title`, pulsante "Chiudi" 44×44 sempre visibile (alternativa allo swipe: WCAG 2.5.7), Escape chiude, focus torna all'origine. Usato per dettaglio agente, "Adesso" (le quattro risposte su mobile), StopReceipt, sotto-flussi dell'approvazione. **Non** per l'ApprovalCard su mobile (che è una pagina).
*Perché*: il dettaglio resta ancorato al contesto (Connessione uniforme); ma un'approvazione aperta da notifica non ha nulla "sotto": un bottom sheet sopra una dashboard non caricata disorienta (Jakob).

**Dialog** — solo per conferme irreversibili (Elimina, Forza arresto). Titolo con l'oggetto ("Eliminare il dipartimento Marketing?"), corpo con conseguenza e conteggio ("4 dipendenti e 12 attività verranno eliminati. Non è annullabile."), primario `danger` verbo+oggetto ("Elimina dipartimento"), secondario "Annulla"; se ci sono run attive il primario è disabilitato con spiegazione e pulsante "Ferma prima i 2 agenti". Sopra N figli: digitare il nome.
*Perché*: "OK/Annulla" si clicca per abitudine e non protegge; Postel vuole rendere l'errore impossibile prima che confermabile.

**Popover** — elevazione 2, raggio 12, per dettagli di un segmento (tasso, freschezza, tooltip ricchi); chiude con Escape e click fuori.
*Perché*: espone la seconda cifra senza metterla nella barra (Miller: un numero per segmento).

**Toast** — entro 400 ms da ogni azione; uno alla volta (coda); mobile ancorato sopra `sticky-bottom`, desktop in basso a sinistra; informativo 4 s; con undo dura quanto la finestra di undo, il countdown si ferma su hover/focus, azione ≥ 44×96px, dismissibile; `role="status"`. L'undo **non vive solo nel toast**: resta anche nella scheda dell'oggetto.
*Perché*: Doherty per la conferma; Fitts per il bersaglio dell'undo; WCAG 2.2.1: un limite di tempo che impegna denaro deve essere raggiungibile anche da chi è lento.

### 8.3 Compositi

**ControlStrip** — la barra delle quattro domande, sticky in alto su ogni schermata, elevazione 1, ambito **sempre globale** (l'azienda selezionata).
Desktop: `[◆ 1 da approvare · ⊗ 1 fallito · ● 3 in esecuzione] [4,82 € oggi  ≈ 0,11 €/min · agg. 2 s fa] [Pubblicato · Post LinkedIn per Rossi Srl · 14:32] [■ Ferma tutto (3)]`. Segmento 1: contatori di attenzione in quest'ordine, mostrati solo se > 0, ognuno è un link filtrato; a zero "○ Nessun agente in esecuzione"; con ◆ > 0 il segmento prende lo sfondo ambra, altrimenti la barra è tutta neutra. Segmento 2: totale di periodo in `title-num`, tasso e freschezza in caption (in `technical` il tasso sale a label). Segmento 3: tipo di modifica come etichetta di sistema (mai troncata) + titolo (dato, troncabile) + ora assoluta oltre i 60 min. Segmento 4: `stop-all` con conteggio.
Mobile (sm): una riga 44px: `[◆1 · ●3] [4,82 € oggi] [■ Ferma tutto]`; il tocco sulla striscia apre il foglio "Adesso" con le quattro risposte complete; "ultima modifica" è a un tocco.
*Perché*: Serial Position (attenzione a sinistra, stop a destra), Miller (quattro segmenti, un numero ciascuno), Von Restorff (la barra si colora solo quando serve). Il conteggio nell'etichetta di "Ferma tutto (3)" e l'ambito fisso evitano l'errore più grave: credere di fermare un cliente e fermare l'azienda (Postel). Su 360px il segmento "cosa ha cambiato" a zero tocchi non entra: compromesso dichiarato, a un tocco.

**RunRow** — la risposta a "cosa gira adesso". Desktop: `[StatusChip] [AgentMark · Nome · Ruolo] [Task · Passo 4/7 · Ricerca web] [durata] [Money estimate ≈] [■ Ferma]`; compact: il passo in colonna propria, stop come sola icona 32×32 con `aria-label` "Ferma Copywriter". Mobile: due righe, stop 44×44 a destra nella seconda. Durata: "42 s" / "12 min" / "2 h 14 min" / "1 g 3 h", aggiornata al minuto nelle liste, al secondo solo nel dettaglio. Il pulsante cambia con lo stato: `running` → Ferma; `queued` → Togli dalla coda; `failed` → Riprova; `stopped` → Riprendi/Riavvia; `completed` → nessuno.
*Perché*: per l'operatore "cosa gira" è il passo, non il titolo (come lo step in una console CI); Postel: non mostrare azioni impossibili; Fitts: lo stop a fine riga, isolato, non scala sotto 32.

**ChangeCard** — la risposta a "cosa ha cambiato": tipo (Codice · Contenuto · Pubblicazione · Ricerca), dove (repo, canale, documento) con link, chi (AgentMark), quando (ora assoluta), costo, e l'azione di ritorno: "Annulla modifica" se il rollback esiste, altrimenti il percorso alternativo esplicito ("Non annullabile da qui — apri su LinkedIn"). Diff in mono solo dentro il disclosure tecnico.
*Perché*: omettere il pulsante quando non si può annullare lascia l'utente senza via d'uscita (Postel: dire come rimediare); il tipo come etichetta di sistema rende la lista scansionabile (Similarità).

**ApprovalCard** — su mobile è una **pagina** a schermo intero con barra "‹ Approvazioni · Richiesta 2 di 5". Ordine del contenuto (Serial Position, Miller ≤ 5 blocchi): 1) StatusChip lungo + "da 35 min"; 2) titolo `title-sm`, max 3 righe; 3) richiedente (AgentMark 32 + Nome · Ruolo + Cliente); 4) anteprima di **cosa cambierà** (sempre un riassunto testuale, media `max-height: 45vh` con "Espandi"); 5) blocco impegno, ultimo prima del footer: destinazione, `Money estimate`, "L'agente è fermo e non consuma in attesa", chip di reversibilità (↺ "Annullabile dopo" / ⊘ "Non annullabile dopo la pubblicazione"); 6) disclosure "Dettagli tecnici".
Footer fisso, sfondo pieno (niente blur), `padding-bottom: max(12px, safe-area)`: riga superiore `[Chiedi modifiche]` secondario flex + `[Rifiuta]` terziario; riga inferiore `[Approva e pubblica]` primario 48px a tutta larghezza. L'etichetta primaria porta la conseguenza: "Approva e pubblica" / "Approva e invia" / "Approva la spesa" / "Approva" (≤ 22 caratteri). Sopra il 130% di scala testo la riga superiore si impila.
Esiti: **Approva** → il footer diventa la ResolvedBar "✓ Approvata · il post verrà pubblicato tra 10 s" con "Annulla approvazione · 8 s" (anello determinato + numero); l'esecuzione parte **davvero** a `effective_at = ricezione + grazia` lato server, l'annullo vale da qualunque dispositivo; poi "Pubblicato su LinkedIn alle 15:04 · Vedi" e "Costo effettivo 3,14 €" e il pulsante "Prossima richiesta (2)". **Chiedi modifiche** → bottom sheet con nota obbligatoria, tre chip rapidi, "costo stimato +0,40 €", invio 48px. **Rifiuta** → bottom sheet con motivo facoltativo e conseguenza ("La richiesta si chiude e l'agente si ferma su questo task"). Nessuna decisione via swipe o long-press; notifica push con **una** sola azione "Apri richiesta", mai approvare dalla lock screen.
*Perché*: tre pulsanti in riga non entrano a 360px (misurato 345–381px su 328 disponibili); il primario a tutta larghezza è l'ultimo elemento e il più vicino al pollice (Fitts, Serial Position). L'undo è reale solo se l'esecuzione è differita (Postel: un "Annulla" che non annulla è il modo più rapido per far percepire il prodotto come giocattolo). Il flusso finisce con cosa è successo e quanto è costato (Peak-End) e con la prossima richiesta (Goal-Gradient).

**StopReceipt** — Sheet aperta dopo "Ferma tutto" con n ≥ 2 (con n = 1 basta il Toast): "Fermati 3 agenti", lista di RunRow con costo finale congelato e totale ("Costo finale 1,84 € · oggi 4,82 €"), cosa **non** è stato toccato ("1 richiesta da approvare resta aperta", "2 run in coda annullate"), footer `[Riprendi tutto · 28 s]` (solo se ripristinabili dal checkpoint) e `[Chiudi]`; dopo i 30 s restano "Riprendi"/"Riavvia" per riga e "Riprendi tutti (3)" in testa; la ControlStrip mostra "■ 0 in esecuzione · 3 fermati" finché uno non riparte.
*Perché*: un flusso di emergenza deve finire con una ricevuta di cosa è successo, non con una barra che mostra zero (Peak-End); ciò che resta aperto è dichiarato (Zeigarnik); l'undo di gruppo scade, la ripresa no (P4).

**DataTable** — intestazioni sticky in `label` sentence case; numeri a destra in `.num` con l'unità in intestazione ("Costo (€)"); colonna Stato = StatusChip corto; colonne con priorità: le meno importanti spariscono prima sotto md, poi la tabella diventa lista di RunRow/ChangeCard; riga di totale con bordo superiore 1px, peso 600, etichetta "Totale" a sinistra; hover riga = sfondo `surface-hover` condiviso; `max-width: 1120px`.
*Perché*: convenzione contabile universale (Jakob); le colonne di cifre formano una figura leggibile (Prägnanz); la priorità delle colonne è l'unica regola che regge l'italiano senza troncare.

**TraceStep** (in `technical`) — lista verticale con connettore 1px a sinistra (linea continua, niente frecce né rami); delega a sotto-agente = indentazione 16px, profondità massima 3, oltre collassata "… 4 passi"; riga passo 40/32: `[glifo di run] [#n] [tipo: LLM · Strumento · Delega · Approvazione · Attesa] [nome] [modello in caption] [durata] [token] [costo 4 decimali]`; il passo `running` è espanso con header sticky; marcatore sintetico "■ Fermato qui da Marco · 14:32:07". Payload: mono 13/20 su `canvas` con bordo, a capo automatico, `max-height: 320px` + "Mostra tutto", Copia; niente cursore, niente fondo scuro nel tema chiaro, niente colorazione sintattica oltre due neutri; log live con "Segui" che si disattiva allo scroll.
*Perché*: la trace è una timeline, non un grafo (anti-riferimento n8n; Connessione uniforme: linea = sequenza); il payload è il punto dove la UI scivola nel terminale finto, quindi le regole anti-terminale sono esplicite.

**Nav** (NavItem · Tabs · Breadcrumb) — sidebar = organigramma a indentazione: Azienda → Dipartimento → Dipendente, ogni riga con AgentMark e StateBadge (glifo + numero, max tre: ◆ → ⊗ → ●, solo ◆ ha sfondo) e denaro del periodo ("Marketing · ● 2 · 1,20 €"); attivo = barra sinistra 2px + peso 600. Tabs della pagina agente: `business` mostra Risultati · Costi; `technical` aggiunge Tracce · Configurazione; scorrevoli con snap su mobile, mai troncate, attiva = sottolineatura 2px + 600. Breadcrumb solo da md in su. Nessuna command palette come navigazione primaria (se esiste è ricerca, mai l'unico modo per fermare o approvare).
*Perché*: la sidebar risponde a Q1 e Q2 nel punto in cui Linear mostra il conteggio delle issue: è un organigramma, non una lista di viste (P3, anti-clone); i badge senza sfondo tengono la sidebar piatta (Von Restorff).

---

## 9. White-label: il contratto

**Aperto** (allowlist, unici `--brand-*` accettati; tutto il resto è rifiutato dal validatore):

| Input | Vincolo | Cosa ne deriva |
|---|---|---|
| `--brand-accent` (obbligatorio) | `on-accent` su di esso ≥ 4,5:1; `accent-text` su surface ≥ 4,5:1; tinta a ≥ 40° dall'azzurro running, altrimenti il sistema attiva la variante running "petrolio" (`--ref-color-teal-*`) | primario, hover, active, subtle, link, selezione |
| `--brand-on-accent`, `--brand-accent-dark` (opz.) | verificati | testo sul primario; primario nel tema scuro |
| `--brand-neutral-hue` 0–360, `--brand-neutral-chroma` 0–0,02 (clampato) | i gradini di luminosità restano chiusi | tutta la rampa neutra, ombre e scrim |
| `--brand-font-sans`, `--brand-font-numeric`, `--brand-font-mono` | pesi 400/500/600; Latin-1 + Latin Extended-A + €; `tnum` (altrimenti il numerico resta IBM Plex Sans); woff2 ≤ 120 KB/peso; `font-display: swap` + `size-adjust` | tutta la tipografia |
| `--brand-radius-scale` 0–1,25 | chip e AgentMark restano ≤ 4px | raggi di controlli, schede, overlay |
| `brand.json`: `name` (≤ 24), `shortName` (≤ 12), `logo.{wordmark, wordmarkDark, mark, markDark, alt{it,en}}`, `themes`, `defaults.{density, detail}`, `allowDetailToggle`, `supportEmail`, `legalUrls`, `senderName` | SVG con viewBox, senza font incorporati, ≤ 40 KB; nome verificato nei pulsanti a 360px | Logo, favicon/PWA, email, testi legali, `{{brandName}}` nelle stringhe |

**Chiuso** (semantica di prodotto e accessibilità, uguali in ogni installazione): colori di stato e feedback, danger/stop, focus, gradini dei neutri, scala tipografica, spazi e misure, target minimi, elevazione, z-index, moto, breakpoint, forma persona/agente/rombo, set di icone, testo dei chip. In `tokens.css` gli stati vivono in `@layer tokens.status` caricato dopo `@layer brand`: anche un override fuori validatore perde la cascata.

*Perché la distinzione*: chi rivende deve poter fidarsi che "■ Fermato" e "⊗ Fallito" abbiano lo stesso aspetto in ogni tenant (Similarità tra installazioni, Jakob); l'identità è nell'accento, nel font, nel logo e nelle forme (F1–F3), non nel significato. *Perché un solo file concettuale*: `brand.css` è generato da `brand.json`; in produzione multi-tenant il manifest viene serializzato negli stessi `--brand-*` sull'attributo `style` di `<html>`, quindi CSS arbitrario è impossibile per costruzione (Postel: tollerante sui valori, rigido sulla forma).

Meccanismi:
- **Validatore** (`tools/validate-brand`, in CI e in locale): contrasti su tutte le coppie dichiarate per entrambi i temi, distanza accento/running, controlli sul font (tabella `tnum`, copertura, pesi), asset SVG, lunghezza del nome; report tabellare con il gradino più vicino che passa; `WARNING` (non blocco) se l'accento cade in tinta 265–305° con croma > 0,12 ("viola SaaS").
- **Lint nei componenti**: `color-no-hex`, `font-family` letterali vietati, `url()` vietato, `var(--ref-` e `var(--brand-` vietati in `src/components/**`; il pacchetto token esporta solo `sys` e `cmp`; le stringhe non possono contenere "DGT" (usano `{{brandName}}`).
- **Test "brand veleno"**: `--brand-accent: #FF00AA; --brand-neutral-hue: 300; --brand-radius-scale: 0; --brand-font-sans: 'Courier New'`: gli snapshot devono cambiare nelle aree accento/raggi/font e restare pixel-identici su StatusChip, BudgetBar, Ferma/Elimina e focus ring. Se non cambiano dove devono, qualcosa è cablato; se cambiano dove non devono, il brand filtra dove non deve.
- **Logo**: `<Logo>` è l'unico componente che rende `<img>` dal manifest: wordmark da lg in su (altezza 24, max 160), mark quadrato nella sidebar collassata e nella ControlStrip mobile; se manca la variante scura si usa la chiara su una placca `surface-raised` con padding 4, mai `filter: invert()`.
- **PWA e notifiche**: dal mark si generano favicon (SVG con `prefers-color-scheme`), apple-touch-icon 180, maskable 192/512, icona monocroma Android; `theme-color` = canvas chiaro/scuro (mai l'accento: la barra di sistema si fonde con la pagina); badge dell'icona = solo approvazioni in attesa (`setAppBadge`).
- **Email**: i client non leggono variabili CSS né webfont. Template tabellari con valori esadecimali risolti dal build (`tokens.email.json`), font di sistema, logo PNG 2x su sfondo pieno (Gmail dark non inverte), **un** pulsante primario "Rivedi e approva" a tutta larghezza (48px) e prima del pulsante, in testo, le quattro risposte: chi chiede, cosa cambierà, costo stimato, scadenza. Mai approvare dall'email.

---

## 10. Accessibilità e localizzazione

### 10.1 WCAG 2.2 AA, verificato

- Contrasto: testo ≥ 4,5:1, glifi e bordi funzionali ≥ 3:1, su bianco, canvas e superficie di hover; tutte le coppie di `tokens.css` sono calcolate da `tools/wcag.py` (86 coppie, chiaro e scuro). I `*-solid` sono ammessi solo per glifi, mai per testo; i `*-fg` solo per testo.
- Target: 44×44 su puntatore grossolano qualunque densità; 24×24 minimo su puntatore fine; 8px tra bersagli, 12px tra bersagli di segno opposto (Approva / Rifiuta, Approva / Ferma).
- Focus visibile con anello doppio; mai oscurato da barre fisse (`scroll-padding`); mai clippato (`overflow: hidden` → `outline-offset: -2px`).
- Nessuna azione solo via trascinamento: Sheet chiudibile con pulsante, slider di budget con campo numerico equivalente.
- Stato mai solo colore: glifo distinto + etichetta per ogni stato, tacca e cifre sulla BudgetBar, sottolineatura per i link, barra per nav e selezione, tratteggio per "in coda" e per "oltre budget".
- Movimento: `prefers-reduced-motion` rende statici pulsazioni, rotazioni e skeleton; il feedback resta testuale.

### 10.2 Regioni live (Money e ControlStrip)

Il valore che ticka **non** è in una live region: porta `aria-label` statico con il valore intero ("4,82 euro oggi"). Una sola regione `role="status"` (`aria-live="polite"`, `aria-atomic`) a livello di app riceve **solo eventi**: "Fermati 3 agenti. Costo fermo a 4,82 euro" · "Approvata. Puoi annullare entro 10 secondi" · "Budget all'80 per cento: 40,00 euro su 50,00" · "Copywriter chiede approvazione". I fallimenti usano `role="alert"`. Il countdown dell'undo non è annunciato. La freschezza "aggiornato 45 s fa" cambia ogni 10 s ed è fuori dalla regione.
*Perché*: come scritto nella prima bozza, uno screen reader sarebbe stato interrotto ogni secondo su ogni schermata; il visivo resta identico (Doherty senza sacrificare la comprensibilità).

### 10.3 Limiti di tempo e undo

Finestre: approvazione 10 s (regolabile dall'utente 10–30 s), "Ferma tutto" 30 s. Il countdown si ferma su hover/focus; l'undo non vive solo nel Toast: resta nella scheda dell'oggetto finché il server non conferma l'inizio dell'esecuzione, e "Riprendi tutto" resta nella StopReceipt. L'esecuzione è **differita** di tutta la finestra: un undo mostrato è sempre reale; se il backend non può differire, l'undo non compare e il primario porta una conferma esplicita.
*Perché*: WCAG 2.2.1 e Postel: un limite di tempo che impegna denaro deve essere raggiungibile da chi usa uno screen reader o è lento, e un "Annulla" che non annulla è la via più rapida al giocattolo.

### 10.4 Localizzazione IT/EN

- **Etichette lunghe come template ICU** con segnaposto tipizzati: `stopped.long = "Fermato da {actor} alle {time, time, short}"`; durate via `Intl.DurationFormat`; plurali via ICU (`{n, plural, one {# modifica} other {# modifiche}}`); orari in `<time datetime>` con formato 24h/12h dal locale, relativo solo sotto i 60 min. Vietate stringhe orarie letterali nei componenti.
- **Valuta e numeri** solo via `Intl.NumberFormat` (sezione 2.7); percentuali it-IT "12 %" (spazio), en "12%"; segno meno U+2212 via `signDisplay`.
- **`lang`**: `<html lang>` segue il locale; blocchi mono e ID portano `lang="zxx"` così lo screen reader non legge codice con pronuncia italiana.
- **A capo**: `hyphens: manual` su etichette e pulsanti; `overflow-wrap: anywhere` solo su dati (URL, nomi repo).
- **Troncabili**: nomi, titoli di task e di modifiche, URL. **Non troncabili**: etichette, stati, azioni, periodi.
- **Budget di caratteri per slot**, misurato su IBM Plex Sans (≈ 0,55 em per carattere; un font di brand più largo va riverificato dal validatore a 360px e al 130% di scala):

| Slot | Budget IT | Esempi misurati (IT · EN · Δ) |
|---|---|---|
| chip corto | ≤ 14 car. (≈ 100px a 13/14px) | In esecuzione · Running · +86% — Da approvare · Needs approval · −14% — Fermato · Stopped · 0% |
| chip lungo (solo intestazioni) | ≤ 45 car. | In attesa della tua approvazione da 18 min · Awaiting your approval for 18 min · +27% |
| pulsante primario mobile (48px, tutta larghezza) | ≤ 22 car. | Approva e pubblica · Approve & publish · +6% |
| pulsante secondario | ≤ 18 car. | Chiedi modifiche · Request changes · +7% |
| pulsante stop | ≤ 18 car. | Ferma tutto (3) · Stop all (3) · +25% — Confermi: ferma 3 · Confirm: stop 3 · +13% |
| toast con azione | ≤ 34 car. | 3 agenti fermati · Riprendi tutto · 3 agents stopped · Resume all · +14% |
| segmento ControlStrip | ≤ 36 car. | ◆ 1 da approvare · ● 3 in esecuzione · +12% |
| titolo push | ≤ 30 car. | Copywriter chiede approvazione · Copywriter needs your approval · 0% |
| corpo push | ≤ 120 car. | — |
| tab | ≤ 14 car. | Configurazione · Settings · +75% (tab scorrevoli, mai troncate) |
| riga di irreversibilità | ≤ 40 car. | Non annullabile dopo la pubblicazione · Cannot be undone after publishing · +12% |

Media misurata su 45 stringhe: **+18%**, con outlier fino a +86%: ogni componente si dimensiona sulla stringa italiana più lunga del proprio set, non sulla media.

### 10.5 Stampa ed esportazione

In `@media print`: sfondi tinta rimossi, chip resi come testo tra parentesi quadre "[oltre budget]", glifi ▲/◔ mantenuti, righe di totale con bordo, timestamp assoluti, fuso orario e periodo nell'intestazione, valuta nell'intestazione di colonna. *Perché*: un registro che il titolare gira al commercialista deve sopravvivere al bianco e nero; la regola verifica di riflesso che nessun significato monetario dipenda dal solo colore.

---

## 11. Decisioni prese e alternative scartate

| Decisione | Alternativa scartata | Perché |
|---|---|---|
| Accento di default acromatico (inchiostro) | Blu scuro desaturato (`#1B3A66`) | Due blu = "blu da SaaS" e collisione con running (1,3:1 tra link e punto running). Con l'inchiostro il blu di running è l'unica tinta fredda (Von Restorff). |
| 6 stati stabili + `stopping` transitorio | 6 stati con modificatore `pending`; 8 stati (con `paused`) | Serve mostrare "Arresto…" entro 100 ms (Doherty); un modificatore era la stessa cosa con meno nome; "in pausa" = "fermato" (non consuma, riprendibile) per Hick. |
| ◆ rombo per "Da approvare" | ✋ mano; ◐; orologio | La mano renderizza come emoji (giocattolo); ◐ è un terzo cerchio; il rombo è il nodo-decisione dei diagrammi e l'unica forma del set che "chiede l'umano". |
| ⊗ per "Fallito", ▲ riservato agli avvisi | ▲! per fallito | In ogni console ▲ è avviso e ✕ è fallimento; DGT ha bisogno di entrambi (budget ≥ 80%, nessun segnale). |
| Etichetta corta "Da approvare" | "In attesa" / "In attesa di te" | "In attesa" è ambiguo con la coda; "In attesa di te" supera il budget di 14 caratteri (misurato 116px). |
| Stop singolo immediato; "Ferma tutto" armato in loco (2 tocchi, 4 s) | Dialogo di conferma; nessuna protezione; press-and-hold | Il dialogo porta fuori contesto in emergenza; nessuna protezione = un tocco accidentale ferma l'azienda; press-and-hold è inaccessibile. |
| Stop di riga con contorno neutro e glifo rosso | Contorno rosso su ogni riga | 12 righe = 13 elementi rossi: il segnale si diluisce (Von Restorff). "Ferma tutto" resta l'unico contorno rosso per schermata. |
| Footer approvazione su due righe, primario a tutta larghezza in basso | Tre pulsanti in riga | Misurato: 345–381px su 328 disponibili a 360px. |
| "Chiedi modifiche" secondario, "Rifiuta" terziario | Rifiuta secondario | Dopo "Approva" l'esito frequente è chiedere modifiche (come "Request changes" nella code review); rifiutare è raro e finale (Hick, Jakob). |
| Undo reale con esecuzione differita lato server | Toast "Annulla 10 s" con esecuzione immediata | Un "Annulla" che non annulla un post già pubblicato è una bugia (Postel, Peak-End). |
| ApprovalCard = pagina su mobile | Bottom sheet | Da un deep link non c'è nulla sotto il foglio; "indietro" porterebbe a una schermata mai chiesta (Jakob, Zeigarnik). |
| Chip = solo etichetta corta, `nowrap` | Chip a 2 righe | Un chip su due righe sembra rotto e allarga le righe in modo irregolare (Prägnanz). |
| Un solo elemento animato per regione | Anello pulsante su ogni chip e sul Money | Venti pulsazioni = centro di comando; se tutto pulsa nulla emerge. |
| Valore e giudizio del denaro separati; precisione per contesto | Cifre colorate; 3 cifre significative | Colorare le cifre fa leggere i colori; decimali variabili disallineano le colonne. |
| Tema scuro derivato, opzionale, preferenza personale | Tema scuro "per operatori" | Tracce mono su fondo scuro = terminale finto; un tema per ruolo sdoppia il prodotto. |
| Un solo input di accento, ruoli derivati | Sei gradini `--brand-accent-{50…800}` | Sei decisioni e quattro verifiche di contrasto scaricate sul rivenditore; nessuno dei sei funzionava nel tema scuro. |
| `--brand-radius-scale` continuo 0–1,25 con tetto a 4px su chip e marchi | Tre preset (sharp/soft/round) | Il continuo dà più fedeltà al brand; il tetto protegge la grammatica delle forme. I preset restano una semplificazione possibile. |
| Tinta dei neutri aperta ma clampata (croma ≤ 0,02) | Neutri chiusi | Un po' di fedeltà al brand senza poter arrivare ai grigi violacei del SaaS AI. |
| IBM Plex Sans/Mono | Inter, Geist, Source Sans | Famiglia da strumento di lavoro con `tnum` e mono gemello, non il font "sicuro" del SaaS AI. Resta un'assunzione. |
| Token `--ref/--sys/--cmp/--brand` | `--p/--c/--btn` | Il prefisso di livello rende le dipendenze verificabili da lint. |

---

## 12. Assunzioni da riallineare quando arriva l'immagine di riferimento

Ognuna è un solo token o un solo file. Il resto del sistema non cambia.

| Assunzione | Dove si cambia |
|---|---|
| Tinta calda dei neutri ("carta") | `--brand-neutral-hue`, `--brand-neutral-chroma` |
| Accento di default inchiostro | `--brand-accent` (+ `--brand-accent-dark`) |
| IBM Plex Sans / Mono | `--brand-font-sans`, `--brand-font-numeric`, `--brand-font-mono` |
| Raggi 4/6/8/12 | `--brand-radius-scale` (0–1,25) |
| Set di icone Lucide e i sette glifi di stato | `--sys-icon-status-*` |
| Simbolo di valuta in intestazione di colonna (non in cella) | regola in Money/DataTable |
| Sei tinte di dipartimento | `--ref-color-dept-1..6` |
| Ombre neutre a quattro livelli | `--sys-elevation-*` (entro gli anti-riferimenti: niente ombre colorate, gradienti, vetro) |

Se l'immagine impone gradienti, vetro o bagliori, entra in conflitto con gli anti-riferimenti del brief: la scelta è del titolare, non del sistema.

---

## 13. Domande aperte per il prodotto

1. **Checkpoint**: il runtime riparte dal passo interrotto? Decide se dopo lo stop l'azione è "Riprendi" (undo) o "Riavvia".
2. **Heartbeat**: il runtime emette eventi a intervalli regolari? Senza, il modificatore "nessun segnale" diventa solo "ultimo evento alle hh:mm".
3. **Ambito di "Ferma tutto"** per un'agenzia con più aziende-cliente: l'azienda selezionata o tutte? La ControlStrip assume l'azienda selezionata.
4. **Permessi**: chi può fermare tutto e chi può approvare; il pulsante disabilitato deve spiegare perché.
5. **Ultimo tick di costo** dopo lo stop (chiamata in volo fatturata): mostrare "costo finale in aggiornamento…" per pochi secondi?
6. **Autenticazione biometrica** prima di "Approva" sopra una soglia: convenzione bancaria (Jakob) ma un passo in più (Parkinson). Proposta: disattivata, soglia per tenant.
7. **Più approvatori**: "primo che decide vince" e stato "Già approvata da Giulia alle 15:02".
8. **Scadenza della richiesta**: l'agente resta fermo o la richiesta si riapre?
9. **Valuta e locale**: per tenant, per cliente o per progetto; tasso di cambio congelato alla chiusura del task.
10. **Costo interno vs prezzo al cliente** con markup del rivenditore: cambia `kind` e la riga margine.
11. **Soglie** (budget 80%, margine 20%) configurabili per tenant/cliente e dove il titolare le vede.
12. **Theming a runtime o a build** per rivenditore; piano browser minimo per `oklch(from …)` (fallback statico comunque generato).
13. **Tema scuro in v1** (matrice di test ×2) o solo derivabile.
14. **Palette categoriale** per i grafici di costo per cliente (`--sys-color-data-1..6`, indipendente dal brand, distinguibile per luminosità).
