# Strumenti

- `wcag.py` — calcola il rapporto di contrasto WCAG 2.x (luminanza relativa) per le coppie in `pairs.json`:
  `python3 design-system/tools/wcag.py design-system/tools/pairs.json`
  Ogni coppia dichiara il contesto, i colori e la soglia (4.5 testo, 3.0 glifi e bordi funzionali). Il comando fallisce se una coppia non passa.
- `pairs.json` — l'elenco delle coppie che il sistema promette (tema chiaro e scuro). Va aggiornato quando si aggiunge un token di colore.
- `validate-brand` (da implementare) — verifica un `brand.css`/`brand.json` contro il contratto della sezione 9 di `DESIGN.md`.
