# Prompt: analisi del design prima di costruire

Da incollare così com'è nella **prima sessione** del repository del prodotto, con qualunque agente di codice. Chiede
di leggere la consegna dal repository di design (pubblico) e di produrre **un'analisi**, non del codice: serve a
scoprire errori e incongruenze finché costano poco, cioè prima che diventino un prodotto.

Il prompt che segue si ferma dopo l'analisi. I passi successivi li dà il titolare.

```
Stai iniziando lo sviluppo di DGT, un sistema operativo aziendale per agenti AI: il titolare crea un'azienda
digitale fatta di dipartimenti e dipendenti AI, assegna obiettivi reali e gli agenti lavorano per ore o giorni
(codice, ricerca, contenuti, pubblicazioni). Il cliente tipo è un'agenzia. Questo repository è quello del
PRODOTTO e parte vuoto: non c'è niente da leggere qui dentro.

Il design è finito ed è stato costruito in trentatré versioni in un repository separato e pubblico:

    https://github.com/av3rgfx/DGT-Design-2.0

PRIMO PASSO — leggere. Clona quel repository (o scarica i file grezzi da raw.githubusercontent.com, ramo main) e
leggi PER INTERO, in quest'ordine, gli otto documenti della cartella `consegna-sviluppo/`:

    consegna-sviluppo/README.md                      il punto d'ingresso: che cosa è vincolante e che cosa no
    consegna-sviluppo/MODELLO-DI-DOMINIO.md          sedici entità, stati, relazioni, trentuno invarianti
    consegna-sviluppo/REGOLE-DI-PRODOTTO.md          le 48 regole, ognuna con il fatto misurato che l'ha generata
    consegna-sviluppo/SISTEMA-DI-DESIGN.md           token, componenti, icone, avatar, le due superfici
    consegna-sviluppo/INVARIANTI-DA-VERIFICARE.md    137 proprietà che il prodotto dovrà continuare a garantire
    consegna-sviluppo/DECISIONI-APERTE.md            quello che il titolare non ha ancora deciso
    consegna-sviluppo/INVENTARIO.md                  file per file: che cosa si porta e che cosa resta
    consegna-sviluppo/PROMPT-DI-AVVIO.md             le regole di lavoro che valgono da subito

Nella stessa cartella ci sono anche i file da guardare, non da leggere a voce: `dati-esempio/azienda-11.json` e
`azienda-40.json` (il modello dei dati serializzato a due taglie d'azienda, undici e quaranta dipendenti: il
prodotto dovrà reggerle entrambe), `sistema-di-design/` (token, componenti, le 48 icone, gli avatar e
`modello-sintetico.js`, cioè il modello del design in sola lettura, con le ragioni di ogni regola nei commenti),
`riferimento/` (le due immagini che il design copia) e `catture/` (trenta schermate).

Le schermate vere, cliccabili, sono pubblicate qui e conviene aprirle:

    Console (desktop):  https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
    Telefono:           https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9

Nel repository di design c'è anche il codice completo delle schermate (`schermate/direzioni/direzione-a.js` per la
Console, `mobile.js` per il telefono, `dati.js` per il modello, `prove/` per le 692 verifiche). Usalo per
VERIFICARE un fatto quando serve, non leggerlo tutto. NON leggere `PROSSIMA-SESSIONE.md`,
`schermate/direzioni/DIREZIONI.md` e `design-system/archive/`: sono la cronaca delle trentatré versioni, con
numeri corretti più volte e decisioni intermedie poi cambiate, e ti porterebbero fuori strada.

SECONDO PASSO — l'analisi, ed è tutto quello che devi fare in questa sessione.

Fai un'analisi completa del design e cerca tre cose distinte, tenendole separate nel rapporto:

1. ERRORI: cose oggettivamente sbagliate. Un numero che non torna; una regola che contraddice il modello; un
   riferimento a un file, a una funzione o a una decisione che non esiste; un'invariante che il modello viola già;
   un campo descritto in un modo e usato in un altro; un conto rifatto che dà un risultato diverso.
2. INCONGRUENZE: cose che non sono false ma non stanno insieme. Due documenti che dicono la stessa cosa in modi
   diversi; due regole che si sovrappongono o si contraddicono ai bordi; una parola usata per due oggetti o due
   parole per lo stesso oggetto; un comportamento che vale su una superficie e non sull'altra; una regola scritta
   per il desktop che sul telefono non è applicabile.
3. MIGLIORAMENTI POSSIBILI: dove il design regge ma si può fare meglio. Semplificazioni, cose che il titolare
   dovrebbe poter fare e non può, passaggi in cui il prodotto chiede attenzione senza darne indietro, punti in cui
   la copia del riferimento visivo costa più di quanto renda, e ogni assenza che diventerà un problema appena i
   dati saranno veri invece che sintetici.

METODO, e non è negoziabile:

- quello che si può misurare si misura: apri le schermate pubblicate, apri le fixture JSON, conta nel codice.
  NON fidarti dei numeri scritti nei documenti, nemmeno di quelli che sembrano definitivi: nelle ultime due
  versioni del design sei numeri scritti nei documenti sono risultati falsi al ricontrollo, e quattro venivano
  proprio dai documenti di consegna;
- ogni voce del rapporto porta la sua PROVA: file e riga, oppure il numero che hai ricontato, oppure la schermata
  in cui si vede. Una voce senza prova non entra nel rapporto: entra in una lista a parte, «da verificare»;
- distingui il FATTO dalla PREFERENZA. «Questo numero è falso» è un fatto. «Questa parola non mi piace» è una
  preferenza, e va dichiarata come tale;
- se una cosa ti sembra sbagliata ma il documento spiega perché è così, quella spiegazione va citata e
  contestata nel merito, non ignorata. Quasi ogni scelta del design ha dietro una misura;
- non correggere niente. Non scrivere codice, non creare la struttura del prodotto, non scegliere lo stack, non
  chiudere nessuna delle decisioni aperte: quelle sono del titolare.

IL RAPPORTO, in italiano, in un solo file `analisi-del-design.md` in questo repository:

- un sommario di dieci righe: che cosa hai guardato, quanto regge il design, e le tre cose più gravi;
- le tre sezioni (errori, incongruenze, miglioramenti), ognuna ordinata per gravità, in tabella o a voci brevi;
  per ogni voce: che cos'è, dove (file, riga, schermata), la prova, che effetto ha sul prodotto da costruire, e
  la correzione che proponi (senza applicarla);
- una sezione «da verificare»: i sospetti senza prova, con quello che servirebbe per confermarli;
- una sezione «che cosa regge»: le parti del design su cui non hai trovato niente, perché sapere che cosa è
  solido vale quanto sapere che cosa non lo è;
- in fondo, le domande che hai per il titolare, in ordine di importanza, formulate in modo che si possa
  rispondere con una parola o una frase.

Quando il rapporto è pronto fermati e aspetta: i passi successivi te li do io.
```

## Perché questo passo prima di costruire

Il design è stato verificato dall'interno, con 692 prove e il righello, ma **da chi lo ha scritto**. Un lettore
nuovo, che non ha visto nascere nessuna di quelle decisioni, trova cose che chi c'era non vede più: è successo
dentro il design stesso, dove la revisione incrociata ha spostato la risposta più dei pareri, e dove il righello ha
smentito sia i documenti sia le revisioni.

Il rapporto che questo prompt chiede costa poche ore e si legge in una volta. Le stesse scoperte, fatte a prodotto
avviato, costano una migrazione.
