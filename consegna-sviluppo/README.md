# Consegna per lo sviluppo del prodotto

Questo pacchetto è il ponte fra il **repository di design** di DGT (questo) e il **repository del prodotto** (da
creare). Contiene tutto quello che serve a un team di persone e di agenti di codice — di qualunque fornitore,
senza nessun file di istruzioni specifico per uno strumento — per costruire il prodotto **senza dover leggere il
resto di questo repository**, che è per due terzi il racconto di come si è arrivati qui.

## Da dove viene, e che cosa è vincolante

DGT è un sistema operativo aziendale per agenti AI: il titolare crea un'azienda digitale fatta di dipartimenti e
dipendenti AI, assegna obiettivi reali e gli agenti lavorano per ore o giorni. Il design è stato costruito in
trentatré versioni come **schermate HTML/JS cliccabili su un modello dati sintetico**, con 692 verifiche
automatiche e 84 catture. Quelle schermate sono la specifica eseguibile: si aprono nel browser e si usano.

Sono **vincolanti**:

- il **modello di dominio** (`MODELLO-DI-DOMINIO.md`): le entità, gli stati, le relazioni e le regole che il
  prodotto deve incarnare. Le fixture in `dati-esempio/` sono lo stesso modello, serializzato a undici e a
  quaranta dipendenti;
- le **regole di prodotto** (`REGOLE-DI-PRODOTTO.md`): quarantotto regole, ognuna nata da un fatto misurato;
- il **sistema di design** (`SISTEMA-DI-DESIGN.md` e i file elencati in `INVENTARIO.md`): il design si copia
  «così com'è» dai due riferimenti in `riferimento/`, e i token, i componenti e le icone sono già codice;
- le **invarianti** (`INVARIANTI-DA-VERIFICARE.md`): le proprietà che le verifiche di questo repository tengono e
  che il prodotto dovrà tenere con verifiche sue.

**Non** sono vincolanti, e sono scelte di questo repository che il prodotto non deve ereditare: lo stack (qui non
c'è: pagine statiche, nessun server, nessun database), il modo in cui il codice è organizzato (funzioni immediate
su `window`, tutto gira da `file://`, un solo file per gli artefatti), le prove Playwright che misurano pixel su
pagine statiche, e la lingua del codice.

## Ordine di lettura

1. questo file;
2. `MODELLO-DI-DOMINIO.md` — che cosa esiste e come si comporta;
3. `REGOLE-DI-PRODOTTO.md` — che cosa il prodotto deve e non deve fare a schermo;
4. `SISTEMA-DI-DESIGN.md` — token, componenti, icone, avatar, le due superfici;
5. `INVARIANTI-DA-VERIFICARE.md` — che cosa le prove del prodotto dovranno tenere;
6. `DECISIONI-APERTE.md` — quello che il titolare non ha ancora deciso, e i candidati che aspettano dati;
7. `INVENTARIO.md` — file per file, che cosa si porta nel repository nuovo e che cosa no.

`PROMPT-DI-AVVIO.md` è il testo da incollare all'agente di codice, qualunque sia, nella prima sessione del
repository nuovo.

9. `MANIFESTO.txt` dice da quale commit vengono le copie.

## Come si porta

**I file sono già tutti qui.** Questa cartella è autosufficiente: si copia com'è nel repository del prodotto, e non
serve leggere né copiare nient'altro di questo repository.

```bash
cp -r consegna-sviluppo /percorso/del/repository-nuovo/consegna
```

Che cosa contiene, 15 MB in tutto:

| | |
|---|---|
| otto documenti in Markdown | quello che c'è da sapere, nell'ordine di lettura qui sotto |
| `sistema-di-design/` | i token, i componenti, lo sprite delle icone, gli avatar con il loro motore, lo strumento del font, e `modello-sintetico.js`, il modello di design in sola lettura |
| `dati-esempio/` | il modello serializzato a undici e a quaranta dipendenti |
| `riferimento/` | le due immagini che il design copia, con la nota su che cosa se ne copia |
| `catture/` | trenta schermate, la Console a 1440 px e il telefono, a undici e a quaranta |
| `MANIFESTO.txt` | l'elenco dei file con i pesi e il commit da cui vengono |

`aggiorna-copie.sh` serve solo a chi continua il **design**: rinfresca le copie quando una sorgente cambia in
questo repository. Per usare la consegna non va lanciato.

## Le due verità visive

Le schermate pubblicate, che restano la forma di riferimento finché il prodotto non le sostituisce:

- la Console: https://claude.ai/code/artifact/e6699f3a-879b-4bce-a9d8-6fc21ed84e34
- il telefono: https://claude.ai/code/artifact/34192ba0-51da-4f02-9e64-3a6d698a44e9

E le catture in `catture/` (una selezione delle 84 di questo repository, a 1440 px la Console e a 390 px il
telefono, a undici e a quaranta dipendenti).

## Che cosa non leggere

`PROSSIMA-SESSIONE.md`, `schermate/direzioni/DIREZIONI.md` e `design-system/archive/` sono la cronaca delle
trentatré versioni: numeri corretti più volte, decisioni intermedie poi cambiate, misure di pagine che non esistono
più. Servono a chi continua il **design**, non a chi costruisce il prodotto. Se una cosa manca in questa cartella,
il posto dove cercarla è `SYSTEM-DESIGN.md` (sezione 10, le regole) e `schermate/direzioni/dati.js` (il modello),
non la cronaca.

## Una regola di manutenzione

Il design system non si copia una volta e basta: **una modifica visiva nasce nel repository di design e arriva al
prodotto**, mai il contrario. Se il prodotto ha bisogno di un componente o di una regola che qui non c'è, la cosa
giusta è farla nascere qui, misurata sulle schermate, e poi portarla.
