# DGT-Design-2.0

Repository di design del prodotto DGT (sistema operativo aziendale per agenti AI).

## Regole di lavoro

- Prima di progettare, costruire, rivedere o criticare qualsiasi interfaccia, carica la skill `ux-design-rules` (`.claude/skills/ux-design-rules/SKILL.md`) e leggi `reference/dgt-brief.md` nella stessa cartella. Le quattro domande (cosa gira, quanto costa, cosa ha cambiato, come lo fermo) e gli anti-riferimenti sono vincoli.
- Il sistema di design vive in `design-system/`: variante A in `DESIGN.md` + `tokens.css`, variante B in `variants/b-dark-lime/` (`DESIGN-B.md`, `tokens-b.css`, `specimen-b.html`). Riferimenti visivi dell'utente in `design-system/reference/`. I componenti usano solo token semantici; il marchio si cambia solo in `brand.css`.
- Per lavoro visivo usare anche la skill `impeccable` (PRODUCT.md è la verità di prodotto; il brief di superficie con il contratto di direzione sta in `design-system/.impeccable/surfaces/`).
- Lingua dei documenti di design: italiano. Le stringhe UI vanno sempre pensate in italiano e inglese (l'italiano è il 15-20% più lungo).
- Non generare schermate finché il sistema di design non è stato approvato.
