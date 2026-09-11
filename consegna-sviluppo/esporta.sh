#!/usr/bin/env bash
# Assembla il pacchetto di consegna in una cartella di destinazione (di solito `consegna/` nel repository del
# prodotto). Non modifica niente in questo repository. Uso:
#   ./consegna-sviluppo/esporta.sh /percorso/del/repository-nuovo/consegna
set -euo pipefail
if [ $# -ne 1 ]; then echo "uso: $0 <cartella di destinazione>"; exit 1; fi
QUI="$(cd "$(dirname "$0")" && pwd)"
RADICE="$(cd "$QUI/.." && pwd)"
DEST="$1"
mkdir -p "$DEST"/{sistema-di-design/avatar,riferimento,catture,dati-esempio}

# 1. i documenti
cp "$QUI"/README.md "$QUI"/MODELLO-DI-DOMINIO.md "$QUI"/REGOLE-DI-PRODOTTO.md "$QUI"/SISTEMA-DI-DESIGN.md \
   "$QUI"/INVARIANTI-DA-VERIFICARE.md "$QUI"/DECISIONI-APERTE.md "$QUI"/INVENTARIO.md "$QUI"/PROMPT-DI-AVVIO.md "$DEST"/

# 2. il sistema di design: token, componenti, sprite delle icone e aiutanti, avatar
cp "$RADICE"/design-system/tokens.css "$DEST"/sistema-di-design/
cp "$RADICE"/schermate/componenti.js "$DEST"/sistema-di-design/
cp "$RADICE"/schermate/direzioni/comune.js "$DEST"/sistema-di-design/
cp "$RADICE"/schermate/direzioni/avatar/avatar-dgt.js "$RADICE"/schermate/direzioni/avatar/avatar-orbe.js \
   "$RADICE"/schermate/direzioni/avatar/avatar-motore.js "$RADICE"/schermate/direzioni/avatar/build-motore.js "$DEST"/sistema-di-design/avatar/
cp -r "$RADICE"/schermate/direzioni/avatar/vendor-avatars "$DEST"/sistema-di-design/avatar/
cp "$RADICE"/design-system/tools/fetch-fonts.py "$DEST"/sistema-di-design/
# il modello sintetico, come riferimento leggibile (non da eseguire): le regole di dominio stanno nei suoi commenti
cp "$RADICE"/schermate/direzioni/dati.js "$DEST"/sistema-di-design/modello-sintetico.js

# 3. i due riferimenti visivi
cp "$RADICE"/design-system/reference/riferimento-01-case-study.jpg "$RADICE"/design-system/reference/riferimento-02-ui.jpg \
   "$RADICE"/design-system/reference/README.md "$DEST"/riferimento/

# 4. le fixture
cp "$QUI"/dati-esempio/*.json "$DEST"/dati-esempio/

# 5. una selezione delle catture (Console a 1440 px, telefono a 390 px; undici e quaranta)
for f in a-11 a-40 a-richieste a-dipartimento a-dipartimento-40 a-dipendente a-dipendente-dossier a-esecuzione \
         a-esecuzione-errore a-costi a-costi-40 a-agenda a-chat a-workflow a-workflow-canvas a-workflow-nodo a-routine \
         a-impostazioni a-impostazioni-40 a-consegna a-tendina-aperta a-tendina-estesa a-riepilogo a-barra-oggi \
         m-quadro-duedue m-quadro-duedue-40 m-dipartimento m-grafo m-grafo-nodo m-consegna; do
  cp "$RADICE"/schermate/direzioni/screenshot/"$f".png "$DEST"/catture/
done

# 6. il manifesto
echo "Consegna assemblata in $DEST" > "$DEST"/MANIFESTO.txt
echo "Origine: repository di design DGT, commit $(git -C "$RADICE" rev-parse --short HEAD 2>/dev/null || echo 'n/d'), $(date -u +%Y-%m-%d)" >> "$DEST"/MANIFESTO.txt
echo >> "$DEST"/MANIFESTO.txt
( cd "$DEST" && find . -type f ! -name MANIFESTO.txt | sort | while read -r f; do printf '%10d  %s\n' "$(stat -c %s "$f")" "$f"; done ) >> "$DEST"/MANIFESTO.txt
echo "totale: $(du -sh "$DEST" | cut -f1)" >> "$DEST"/MANIFESTO.txt
cat "$DEST"/MANIFESTO.txt
