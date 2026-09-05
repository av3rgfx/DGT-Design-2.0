# Logo DGT

Proposte di logo per il prodotto (2026-09-05): quattro giochi di lettere sull'acronimo DGT, in cui una o più lettere
cambiano struttura per unirsi alle altre, più il marchio per i tondi. **Scelta dell'utente ancora da raccogliere.**

- Pagina di presentazione: `logo.html` (apre `logo.js`; serve rete per Google Fonts, oppure il CSS locale di
  `tools/fetch-fonts.py`). Artefatto pubblicato: https://claude.ai/code/artifact/84f57660-741c-421a-bd56-7aaafbf52953
- Costruzione: `logo.js` ricostruisce D, G e T in unità di Urbanist (2000/em, maiuscole 1400, asta 208 come il peso
  600 del logo di testo di oggi) su un cerchio solo di raggio 700: la pancia della D e la G sono lo stesso cerchio,
  senza overshoot. Ogni variante è un solo `<path>` a riempimento non-zero con tutte le sottotracce nello stesso verso,
  così le parti che si sovrappongono si fondono. `DGT_LOGO.V[id](spessore)` dà la geometria, `DGT_LOGO.svg(v, opz)` la
  confeziona (riempimento `currentColor`), `DGT_LOGO.marchio(opz)` mette il monogramma in un cerchio o in una tessera.
- File SVG (rigenerare con `node build.js`): `dgt-filo.svg`, `dgt-catena.svg`, `dgt-innesto.svg`, `dgt-monogramma.svg`
  (prendono il colore del testo); `dgt-marchio-lime.svg`, `dgt-marchio-scuro.svg`, `dgt-tessera.svg`, `dgt-favicon.svg`
  (colori fissi).
- Nella Console: `schermate/direzioni/direzione-a.html?logo=filo|catena|innesto|monogramma` mostra la proposta al posto
  del testo DGT (misura reale: maiuscole 18 px; il monogramma in un cerchio lime da 32).
- Screenshot in `screenshot/`: `logo.png` (la pagina intera), `console-filo.png`, `console-catena.png`,
  `console-mono.png` (l'angolo in alto a sinistra della Console).

## Le proposte

| Id | Nome | Gioco di lettere |
|---|---|---|
| `filo` | Filo | L'arco della G non si chiude: prosegue dritto e diventa la traversa della T. |
| `catena` | Catena | La pancia della D e la schiena della G condividono un tratto; la G prosegue nella T. Un'unica forma. |
| `innesto` | Innesto | La barra della G esce dalla lettera e diventa la traversa di una T a mezza altezza. |
| `monogramma` | Tre in uno | Una lettera sola: l'asta è della T e della D, la traversa della T è il tratto alto della D, la pancia si apre come una G. |

`tetto` (una traversa sola sopra le tre lettere) resta in `logo.js` per il confronto ma è stata scartata: la D perde la
spalla tonda.

Raccomandazione a fine sessione: **Filo** per il logo (il più leggibile, un solo intervento sulle lettere, tiene a
12 px) e **Tre in uno** per il marchio nei tondi (pulsanti, rail, favicon, icona dell'app), sapendo che da lontano il
monogramma si legge «TG» con la D data dall'asta. Colori: bianco su nero nella Console, nero su lime e su bianco; lime
su nero solo fuori dalla Console (un solo accento: il lime è l'attenzione del titolare).
