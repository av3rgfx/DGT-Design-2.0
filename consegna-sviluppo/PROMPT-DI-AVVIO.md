# Prompt di avvio per il repository del prodotto

Da incollare così com'è nella prima sessione con qualunque agente di codice, dopo aver copiato la cartella
`consegna/` nel repository nuovo con `esporta.sh`. Non presuppone nessuno strumento e nessun file di
configurazione dell'agente: tutto quello che serve sta nella cartella.

```
Stai iniziando lo sviluppo di DGT, un sistema operativo aziendale per agenti AI: il titolare crea un'azienda
digitale fatta di dipartimenti e dipendenti AI, assegna obiettivi reali e gli agenti lavorano per ore o giorni.
Il design del prodotto è finito ed è stato consegnato nella cartella consegna/ di questo repository. Questo è il
repository del PRODOTTO, e parte vuoto.

Prima di scrivere una riga di codice leggi, per intero e in quest'ordine: consegna/README.md,
consegna/MODELLO-DI-DOMINIO.md, consegna/REGOLE-DI-PRODOTTO.md, consegna/SISTEMA-DI-DESIGN.md,
consegna/INVARIANTI-DA-VERIFICARE.md, consegna/DECISIONI-APERTE.md, consegna/INVENTARIO.md. Poi guarda le
catture in consegna/catture/ e apri le fixture in consegna/dati-esempio/ (azienda-11.json e azienda-40.json:
sono lo stesso modello a due taglie, e il prodotto deve reggere tutte e due).

Che cosa è vincolante: il modello di dominio, le regole di prodotto, il sistema di design (si copia così com'è:
token, componenti, icone, avatar, le due superfici), e le invarianti. Che cosa NON lo è: lo stack, che non è
stato deciso. Il tuo primo lavoro è proporre l'architettura — dati, API, frontend, esecuzione degli agenti,
autenticazione — a partire dal modello di dominio, con le alternative e il loro prezzo, e fermarti PRIMA di
costruirla: la decisione la prende il titolare.

Regole di lavoro che valgono da subito, perché sono già costate correzioni nel design:
- niente emoji, né nel prodotto né nei documenti: le icone sono quelle del sistema, in consegna/;
- un numero che il prodotto stampa deve essere vero e misurato, mai stimato o inventato; un numero che ne ripete
  un altro sulla stessa schermata non si aggiunge;
- un controllo si vede solo se fa quello che promette con i dati che ci sono; un testo che non ci sta non si
  taglia con i puntini: si cambia il posto o la forma;
- un solo accento: il lime è l'attenzione del titolare e la sua firma, il rosa è per errori e cali; il colore di
  un limite sfondato è una decisione ancora aperta, non prenderla da solo;
- il titolare approva ogni uscita; ogni euro e ogni consegna risalgono a un dipendente e a un'esecuzione; la sua
  attenzione è la risorsa scarsa: non gli si aggiungono decisioni senza dirlo;
- quello che si può misurare si misura prima di parlarne; quando una scelta ha più di una risposta difendibile
  la si porta al titolare con le strade e il loro prezzo, e non la si chiude da soli;
- i documenti del prodotto sono in italiano; gli identificatori del codice li scegli tu.

Se trovi una contraddizione fra due documenti della consegna, vale MODELLO-DI-DOMINIO.md per il comportamento e
SISTEMA-DI-DESIGN.md per la forma, e la contraddizione va segnalata al titolare, non risolta in silenzio.
```
