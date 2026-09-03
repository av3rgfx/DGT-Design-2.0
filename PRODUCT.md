# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: sistema di design espresso in CSS custom properties (`design-system/tokens.css`) e specimen HTML statici; nessun framework applicativo scelto. (Fatto inferito dal repository, non confermato dall'utente.)

## Users

- **Titolare dell'agenzia** (non tecnico). Vende software, automazioni, siti ed e-commerce ai propri clienti. Guarda risultati, costi e margine per cliente; decide se approvare. Le approvazioni avvengono davvero dal telefono, spesso fuori dall'ufficio.
- **Operatore** (tecnico). Configura dipartimenti e dipendenti AI, legge prompt, tracce di esecuzione e costo per task, mette le mani nella configurazione. Lavora al desktop, anche di sera, e deve poter fermare un agente in un tocco.

Stesso prodotto per entrambi: densità regolabile e viste predefinite per ruolo, mai due app.

## Product Purpose

DGT è un "sistema operativo aziendale per agenti AI". L'utente crea un'azienda digitale fatta di dipartimenti e dipendenti che sono agenti AI, assegna loro obiettivi reali e questi lavorano per ore o giorni: scrivono codice, fanno ricerca sui concorrenti, producono contenuti, pubblicano sui social a nome di aziende reali. Successo: il lavoro che avviene mentre l'utente non guarda è visibile, comprensibile e fermabile, e ogni schermata risponde senza cercare a quattro domande: cosa sta girando adesso, quanto sta costando, cosa ha cambiato, come lo fermo.

## Positioning

Un'organizzazione, non un flusso: DGT si presenta come un'azienda con dipartimenti e dipendenti, con costi, approvazioni e responsabilità, non come un costruttore di automazioni a nodi. Muove denaro reale a ogni secondo e pubblica a nome di clienti reali: la fiducia è il prodotto.

## Operating Context

- Lavoro lungo e non presidiato (ore o giorni per obiettivo), con costo che cresce a ogni secondo e va esposto sempre con periodo e freschezza.
- Approvazioni umane sulle azioni con effetto esterno (pubblicazioni, invii, spese), prese prevalentemente da telefono, anche da notifica push.
- Operatore che legge tracce di esecuzione e costo per passo; titolare che legge margine per cliente e budget.
- Rivendita in white-label ad altre agenzie: colore, tipografia e logo sono token sostituibili.
- Lingue: italiano e inglese; le stringhe italiane sono in media il 15–20% più lunghe (misurato: fino a +86% sulle etichette corte).

## Capabilities and Constraints

- Sei stati stabili di esecuzione più uno transitorio: In esecuzione, Da approvare, Arresto in corso, Fermato, Completato, Fallito, In coda. Lo stato non è mai comunicato dal solo colore: sempre forma, icona ed etichetta.
- Stop di un singolo agente immediato e reversibile; "Ferma tutto" armato in loco; le azioni irreversibili si confermano.
- Undo dell'approvazione reale solo se l'esecuzione è differita lato server.
- Vincoli aperti (non decisi): checkpoint del runtime (Riprendi vs Riavvia), heartbeat degli agenti, ambito di "Ferma tutto" con più aziende-cliente, permessi per ruolo, valuta e locale per tenant o per cliente.
- Terminologia: Azienda → Dipartimento → Dipendente (agente); Richiesta di approvazione; Run (esecuzione); Passo (step di traccia).

## Brand Commitments

- **Anti-riferimenti dichiarati vincoli dall'utente**: il SaaS AI generico (viola scuro, gradienti, vetro smerigliato, bagliori); un clone di Linear; un editor a nodi stile automazione (n8n); un centro di comando fantascientifico con terminali finti e forme d'onda; avatar cartoon per gli agenti.
- **Variante A (approvabile)**: registro contabile chiaro, neutri caldi, accento inchiostro, IBM Plex. Documentata in `design-system/DESIGN.md`.
- **Variante B (richiesta il 2026-09-03)**: "stile più professionale tipo Apple e Revolut", ispirata alle due immagini in `design-system/reference/` (case study dark con accento lime; UI dark con tessere, rail di icone, tab a pillola, barra di stato in basso). L'utente ha chiesto di ispirarsi al design allegato riusando le sue soluzioni UX senza inventarne di nuove. Tensione registrata: il riferimento mostra un editor a nodi e bagliori, che il brief esclude; la variante B adotta il mondo visivo e le soluzioni di interfaccia, non il canvas a nodi né vetro e gradienti.
- Nessun nome, logo o font di marca definitivo: il prodotto è white-label; "DGT" è il nome di lavoro.

## Evidence on Hand

- `design-system/reference/riferimento-01-case-study.jpg` e `riferimento-02-ui.jpg`: le due immagini di riferimento fornite dall'utente.
- `.claude/skills/ux-design-rules/reference/dgt-brief.md`: il brief scritto.
- Nessun dato reale di clienti, costi o schermate esistenti: tutti gli esempi negli specimen sono sintetici e vanno etichettati come tali.

## Product Principles

1. Le quattro domande sono cromo persistente, non contenuto di una dashboard.
2. Fermare è a un tocco e reversibile; l'irreversibile si conferma; l'undo mostrato è sempre reale.
3. Stato = forma + icona + etichetta; il colore è ridondanza.
4. Il denaro è un tipo di dato di prima classe: tabulare, con periodo e freschezza, mai animato a contatore.
5. Un'organizzazione, non un flusso: gerarchia e responsabilità, mai un grafo.

## Accessibility & Inclusion

WCAG 2.2 AA come requisito: contrasto testo ≥ 4,5:1 e glifi ≥ 3:1 verificati numericamente (`design-system/tools/wcag.py`), bersagli ≥ 44px su touch, focus visibile e mai oscurato, nessuna azione solo via trascinamento, limiti di tempo regolabili, `prefers-reduced-motion` rispettato, regioni live alimentate solo da eventi.
