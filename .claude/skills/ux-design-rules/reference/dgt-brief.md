# DGT - brief di prodotto e vincoli di design

DGT è un "sistema operativo aziendale per agenti AI". L'utente crea un'azienda digitale composta da dipartimenti e dipendenti che sono agenti AI, assegna loro obiettivi reali, e questi lavorano per ore o giorni: scrivono codice, fanno ricerca sui concorrenti, producono contenuti, pubblicano sui social. Il cliente tipo è un'agenzia che vende software, automazioni, siti web ed e-commerce.

## Il problema di design centrale

Rendere visibile, comprensibile e fermabile un lavoro che avviene mentre l'utente non guarda, che costa denaro a ogni secondo, e che è svolto da entità che l'utente ha creato ma non controlla momento per momento.

In qualsiasi punto dell'interfaccia l'utente deve poter rispondere a quattro domande senza cercare:

1. **Cosa sta girando adesso**
2. **Quanto sta costando**
3. **Cosa ha cambiato**
4. **Come lo fermo**

Ogni schermata, componente e stato va verificato contro queste quattro domande.

## Due pubblici, stessa app

- **Titolare dell'agenzia**: non tecnico. Guarda risultati, costi e margine per cliente, decide se approvare.
- **Operatore**: tecnico. Guarda prompt, tracce di esecuzione, costo per task, mette le mani nella configurazione.

L'interfaccia serve entrambi senza diventare due prodotti: densità regolabile e viste predefinite per ruolo, non due app.

## Anti-riferimenti (vincoli, non gusti)

- **Il SaaS AI generico**: viola scuro, gradienti, vetro smerigliato, bagliori. Segnala "fatto in fretta con un modello".
- **Un clone di Linear.**
- **Un editor a nodi in stile automazione.** Non è un costruttore di flussi: è un'organizzazione. Se sembra n8n, è sbagliato.
- **Un "centro di comando" fantascientifico** con terminali finti e forme d'onda decorative.
- **Avatar cartoon per i dipendenti AI.** Il prodotto muove denaro reale e pubblica a nome di aziende reali: se sembra un giocattolo, nessuno gli affida un budget.

## Vincoli di sistema

- **White-label**: colore, tipografia e logo sono token sostituibili. Nessun elemento del marchio cablato nei componenti.
- **Italiano e inglese**: le stringhe italiane sono in media il 15-20% più lunghe. I layout non devono rompersi.
- **Stato di un agente mai comunicato dal solo colore**: serve sempre forma, etichetta o icona.
- **Le approvazioni devono essere eccellenti su telefono**, perché è lì che avvengono davvero.

## Riferimento visivo

L'utente ha indicato un'immagine di riferimento da seguire "per filo e segno": dove quel design presenta già soluzioni UX, riusarle senza inventare. Se l'immagine non è disponibile nella sessione, dirlo esplicitamente e segnare come "assunzione da riallineare" ogni scelta puramente visiva (tinte, famiglia tipografica, raggi).

## Dove vive il sistema di design

`design-system/` nel repository: `DESIGN.md` (decisioni e motivazioni), `tokens.css` (token a tre livelli: primitivi, semantici, componente) e `brand.css` (unico punto di override white-label).
