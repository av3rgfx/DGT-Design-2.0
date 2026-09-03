---
name: DGT Design System
description: Copia dei due riferimenti forniti dall'utente. Fondo nero, verde e lime, tessere con riflesso e bagliore, griglia puntinata, canvas a nodi con connettori luminosi, font Urbanist.
colors:
  black-0: "#0A0A0A"
  black-1: "#0F0F0F"
  black-2: "#151515"
  black-3: "#1A1A1A"
  black-4: "#1C1C1C"
  page: "#111111"
  gray-1: "#3A3A3A"
  gray-2: "#6B6B6B"
  gray-3: "#8E8E8E"
  gray-4: "#B5B5B5"
  white: "#F5F5F5"
  lime: "#B8F860"
  green: "#4FCB58"
  green-2: "#2F8F3E"
  green-3: "#1C5A22"
  green-4: "#174A1C"
  teal: "#5EEAD4"
  red: "#F05A50"
typography:
  display:
    fontFamily: "Urbanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "56px"
    fontWeight: 500
    lineHeight: "60px"
    letterSpacing: "-0.01em"
  h1:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "40px"
    fontWeight: 500
    lineHeight: "46px"
  h2:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: "34px"
  title:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: "30px"
  body:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
  label:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
  small:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
rounded:
  button: "12px"
  field: "12px"
  tab: "14px"
  tile: "18px"
  card: "20px"
  panel: "24px"
  pill: "9999px"
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
  node:
    backgroundColor: "{colors.black-1}"
    rounded: "{rounded.tile}"
    size: "96px"
  node-wide:
    backgroundColor: "{colors.black-1}"
    rounded: "{rounded.tile}"
    width: "208px"
    height: "100px"
    padding: "0 18px"
  node-selected:
    backgroundColor: "{colors.green-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.tile}"
    width: "216px"
    padding: "16px 16px 14px"
  node-selected-field:
    backgroundColor: "{colors.green-4}"
    textColor: "{colors.white}"
    rounded: "{rounded.field}"
    height: "38px"
    padding: "0 12px 0 14px"
  rail-tile:
    backgroundColor: "{colors.black-1}"
    textColor: "{colors.gray-4}"
    rounded: "{rounded.tab}"
    size: "44px"
  rail-tile-active:
    backgroundColor: "{colors.green}"
    textColor: "#0A2A0F"
    rounded: "{rounded.tab}"
    size: "44px"
  tabs:
    backgroundColor: "{colors.black-0}"
    rounded: "{rounded.tab}"
    padding: "4px"
  tab-active:
    backgroundColor: "{colors.black-3}"
    textColor: "{colors.white}"
    rounded: "11px"
    height: "36px"
    padding: "0 18px"
  pill:
    backgroundColor: "{colors.black-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
    typography: "{typography.label}"
  pill-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.black-0}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
  tag-red:
    backgroundColor: "rgb(240 90 80 / .08)"
    textColor: "{colors.red}"
    rounded: "{rounded.pill}"
    height: "26px"
    padding: "0 12px"
  chip:
    backgroundColor: "{colors.black-3}"
    textColor: "{colors.gray-4}"
    rounded: "{rounded.pill}"
    height: "24px"
    padding: "0 10px"
  button-new:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.black-0}"
    rounded: "{rounded.pill}"
    height: "36px"
    padding: "0 16px"
  square-button:
    backgroundColor: "{colors.black-1}"
    textColor: "{colors.gray-4}"
    rounded: "{rounded.button}"
    size: "40px"
  card:
    backgroundColor: "{colors.black-4}"
    rounded: "{rounded.card}"
    padding: "20px"
  card-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.black-0}"
    rounded: "{rounded.card}"
    padding: "16px"
  bottombar:
    backgroundColor: "{colors.black-0}"
    height: "68px"
    padding: "0 20px 0 24px"
---

# DGT Design System

## Overview

Il sistema di design di DGT copia i due riferimenti forniti dall'utente (`design-system/reference/`): il case study (presentazione scura con accento lime, titoli Urbanist, schede con avatar e pillole, schede lime in evidenza) e l'interfaccia dell'agente (rail di icone, titolo con percorso e tag rosso, tab a pillola, canvas con griglia puntinata, nodi scuri con riflesso, connettori verdi luminosi, nodo selezionato verde con campi interni, mini-mappa e zoom, barra chat in basso con ID in mono e pillole).

Le regole e i brief precedenti sono stati eliminati su richiesta dell'utente; le varianti costruite su di essi sono archiviate in `design-system/archive/` e non fanno testo. Non vengono copiati loghi, foto o marchi di terzi: contenuti e nomi sono di DGT e sintetici.

Valori normativi in `tokens.css`; riproduzione completa in `specimen.html` (interfaccia agente, workspace, palette, tipografia, UI kit, componenti del canvas).

## Colors

- **Neri**: `#0A0A0A` app e barra in basso; `#0F0F0F` nodi e tessere; `#151515` pillole, tab e campi; `#1A1A1A` tab attiva e rialzi; `#1C1C1C` card della presentazione; `#111111` sfondo pagina. Bordi bianco 8% (14% forti), riflesso bianco 7% sul bordo superiore delle tessere, punti della griglia `#3A3A3A` ogni 18px.
- **Grigi**: `#6B6B6B` etichette dei connettori, `#8E8E8E` testo secondario e porte, `#B5B5B5` testo secondario chiaro e icone, `#F5F5F5` testo.
- **Verde lime `#B8F860`**: colore del case study. Pulsante "Nuova attività", scheda lime in evidenza, pillola dell'ora, chip "Nuovo", parole evidenziate nei titoli, bottone di invio del campo.
- **Verde interfaccia `#4FCB58`**: tessera attiva del rail (sfumata `#6BDD72 → #3FB847` con bagliore verde al 55%), spunte sui nodi, porte e connettori con bagliore (blur 3px).
- **Nodo selezionato**: sfumatura `#2F8F3E → #1C5A22`, bordo verde chiaro al 55%, bagliore verde morbido, campi interni scuri (`#174A1C`, nero al 28%) con chevron.
- **Azzurro `#5EEAD4`** e **rosso `#F05A50`**: gli altri due colori del case study; il rosso per il tag "Marketing", il cestino e il chip "Urgente".
- **Connettore verso un nodo disattivato**: bianco `#D9D9D9`; moncone non collegato grigio `#8E8E8E` con cerchio "+".

## Typography

- **Urbanist** (Google Fonts, pesi 300–700), come dichiarato nel case study; monospazio di sistema solo per gli ID nella barra chat.
- Ruoli: display 56/60 peso 500 (titoli della presentazione, con una parola in lime); h1 40/46; h2 28/34; titolo dell'app 26/30 peso 400 con percorso "/cliente" in 15px grigio; body 15/22; label 13/18 peso 500 (tab, pillole, etichette dei nodi, chip); small 12/16 (porte, "1 elemento", sottotitoli); mono 12/16.
- Il titolo "WORKSPACE" è in maiuscolo con spaziatura .08em e peso 600, come nel riferimento.

## Layout

- **Interfaccia agente**: cornice 1132×760 a raggio 24; rail sinistro 72px con tessere 44×44 (la "+" in cima, tre strumenti piccoli 40×40 e l'avatar 40×40 a raggio 12 in fondo); intestazione a 30px dall'alto con titolo, percorso e tag; tab a 110px; canvas da 170px in giù con griglia puntinata sfumata ai bordi; mini-mappa 150×72 e quattro pulsanti di zoom in basso a sinistra; pillole in basso a destra; barra in basso 68px con "Chat", ID mono, pulsante freccia e "Più tardi".
- **Nodi**: quadrati 96×96 con icona in un quadratino 40×40 e spunta verde in alto a destra; nodo agente 208×100 con icona 44 e due righe di testo; nodo selezionato 216px con titolo, due etichette e due campi; porte a 10px sotto il nodo agente con etichette a 12px; etichette dei connettori ("1 elemento") su fondo nero.
- **Workspace**: pannello a raggio 24 con intestazione (titolo, pulsante lime, pillola budget, contatori a destra), righe di quattro schede a raggio 20 (due su tablet, una su telefono).
- Sugli schermi stretti l'interfaccia scorre in orizzontale dentro la sua cornice; il resto della pagina è a una colonna.

## Elevation & Depth

- Tessere e nodi: riflesso bianco 7% in alto, bordo bianco 8%, ombra `0 12px 30px` nero 55%.
- Cornici (app, workspace): ombra `0 40px 100px` nero 70%.
- Bagliori: tessera attiva del rail `0 0 26px` verde 55%; porte `0 0 10px`; connettori con sfocatura gaussiana 3px; nodo selezionato `0 0 44px` verde 28%; pillola lime `0 0 18px` lime 25%.
- Griglia puntinata: punti 1px `#3A3A3A` ogni 18px, mascherata a ellisse verso i bordi.

## Shapes

- Pillole (9999px) per pulsanti, tag, chip, pillole del dock, contenitore del campo.
- Tessere e nodi a raggio 18; card a raggio 20; cornici e mini-mappa a raggio 24; tab e tessere del rail a raggio 14 (tab attiva 11); pulsanti quadrati e campi interni a raggio 12; avatar a raggio 12 nel rail, tondi nelle schede.
- Icone piene bianche nei quadratini dei nodi; icone a tratto 1,4–1,6px altrove; spunta verde a tratto 2px.

## Components

- **Rail**: colonna di tessere 44×44; attiva = verde con bagliore e icona scura; "+" tratteggiata no: piena come le altre, con segno più bianco.
- **Titolo con percorso e tag**: titolo 26px regolare, percorso "/cliente" grigio sotto, tag rosso a pillola a destra.
- **Tab**: contenitore nero a raggio 14 con 4px di imbottitura; voce attiva su `#1A1A1A` con riflesso.
- **Nodo / Nodo agente / Nodo selezionato / Nodo disattivato**: come in Layout; il disattivato ha il cestino rosso al posto della spunta e "(Disattivata)" nell'etichetta.
- **Porte e connettori**: cerchi verdi da 10px con bagliore; curve di Bézier verdi 2,2px con bagliore; triangolo verde di ingresso sopra il nodo di destinazione; etichetta "1 elemento" al centro del tratto; verso un nodo disattivato il connettore è bianco; moncone grigio con cerchio "+".
- **Mini-mappa e zoom**: tessera 150×72 con rettangoli bianchi al 16%; quattro pulsanti quadrati 40×40 (adatta, ingrandisci, riduci, annulla).
- **Barra in basso**: "Chat" + ID mono grigio; pulsante freccia quadrato; "Più tardi" oltre un filetto; a destra le pillole "Prova il flusso", "Nascondi chat" e la pillola lime con l'ora e l'icona.
- **Workspace**: intestazione WORKSPACE, pulsante lime "+ Nuova attività", pillola con barra di avanzamento lime, contatori con suffisso lime; schede cliente (avatar tondo, nome, ruolo, chip con punto verde, gruppo di avatar, freccia tonda); schede attività (una lime con chip scuri).
- **UI Kit**: pillola con gruppo di avatar e chip lime "+4"; chip neutri, lime e rosso; pulsanti lime e neutri; campo a pillola con bottone lime; pulsanti tondi; schede persona con avatar; scheda documenti con anteprime bianche; scheda obiettivo.

## Do's and Don'ts

- Usa il lime per ciò che chiama l'azione (nuova attività, scheda in evidenza, pillola dell'ora) e il verde saturo per ciò che è attivo o collegato (rail, spunte, connettori).
- Ogni tessera porta riflesso in alto, bordo sottile e ombra; ogni elemento verde attivo porta il suo bagliore.
- Il canvas ha sempre la griglia puntinata; i connettori sono curve luminose con etichetta; il nodo selezionato è l'unico pieno verde.
- Titoli in Urbanist medio, testo regolare, ID in monospazio; il percorso "/cliente" è grigio e più piccolo del titolo.
- Non introdurre altri colori vivi oltre a lime, verde, azzurro e rosso; non usare sfondi chiari.
- Non copiare loghi, foto o marchi di terzi: avatar con iniziali, nomi e dati sintetici.
