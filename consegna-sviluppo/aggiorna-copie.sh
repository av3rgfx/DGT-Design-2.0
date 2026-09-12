#!/usr/bin/env bash
# Rinfresca le COPIE che questa cartella tiene del sistema di design, dei riferimenti e delle catture, prendendole
# dalle loro sorgenti nel repository di design. Serve solo a chi continua il design: se una sorgente cambia, questa
# cartella va riallineata. Per **usare** la consegna non serve lanciare niente: i file sono già qui, si copia la
# cartella e basta.
#
#   ./consegna-sviluppo/aggiorna-copie.sh        (dalla radice del repository)
#
# Non tocca i documenti (README, MODELLO-DI-DOMINIO, REGOLE-DI-PRODOTTO, SISTEMA-DI-DESIGN,
# INVARIANTI-DA-VERIFICARE, DECISIONI-APERTE, INVENTARIO, PROMPT-DI-AVVIO): quelli si scrivono a mano, perché sono
# un'estrazione ragionata e non una copia.
set -euo pipefail
QUI="$(cd "$(dirname "$0")" && pwd)"
R="$(cd "$QUI/.." && pwd)"
mkdir -p "$QUI"/{sistema-di-design/avatar,riferimento,catture,dati-esempio}

cp -f "$R"/design-system/tokens.css "$R"/schermate/componenti.js "$R"/schermate/direzioni/comune.js "$QUI"/sistema-di-design/
cp -f "$R"/design-system/tools/fetch-fonts.py "$QUI"/sistema-di-design/
cp -f "$R"/schermate/direzioni/dati.js "$QUI"/sistema-di-design/modello-sintetico.js
cp -f "$R"/schermate/direzioni/avatar/avatar-dgt.js "$R"/schermate/direzioni/avatar/avatar-orbe.js \
      "$R"/schermate/direzioni/avatar/avatar-motore.js "$R"/schermate/direzioni/avatar/build-motore.js "$QUI"/sistema-di-design/avatar/
cp -rf "$R"/schermate/direzioni/avatar/vendor-avatars "$QUI"/sistema-di-design/avatar/
cp -f "$R"/design-system/reference/riferimento-01-case-study.jpg "$R"/design-system/reference/riferimento-02-ui.jpg \
      "$R"/design-system/reference/README.md "$QUI"/riferimento/
for f in a-11 a-40 a-richieste a-dipartimento a-dipartimento-40 a-dipendente a-dipendente-dossier a-esecuzione \
         a-esecuzione-errore a-costi a-costi-40 a-agenda a-chat a-workflow a-workflow-canvas a-workflow-nodo a-routine \
         a-impostazioni a-impostazioni-40 a-consegna a-tendina-aperta a-tendina-estesa a-riepilogo a-barra-oggi \
         m-quadro-duedue m-quadro-duedue-40 m-dipartimento m-grafo m-grafo-nodo m-consegna; do
  cp -f "$R"/schermate/direzioni/screenshot/"$f".png "$QUI"/catture/
done

{
  echo "Copie rinfrescate il $(date -u +%Y-%m-%d) dal repository di design, commit $(git -C "$R" rev-parse --short HEAD 2>/dev/null || echo 'n/d')."
  echo
  ( cd "$QUI" && find . -type f ! -name MANIFESTO.txt | sort | while read -r f; do printf '%10d  %s\n' "$(stat -c %s "$f")" "$f"; done )
  echo
  echo "totale: $(du -sh "$QUI" | cut -f1)"
} > "$QUI"/MANIFESTO.txt
echo "fatto: $(du -sh "$QUI" | cut -f1) in $QUI"
