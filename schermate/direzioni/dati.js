/* =====================================================================
   DGT — dati sintetici per la vista principale dell'azienda.
   Un solo modello per le tre direzioni (A, B, C): stessa azienda, stessi
   dipartimenti, stessi dipendenti, stesse esecuzioni. Nessun dato reale.
   Uso: DGT_DATI.modello(11) oppure DGT_DATI.modello(40).
   ===================================================================== */
window.DGT_DATI = (function () {
  const azienda = {
    nome: 'Nova Studio',
    titolo: 'NOVA STUDIO',            // titolo in maiuscolo: la O diventa il marchio lime
    titolare: { nome: 'Marco Rossi', iniziali: 'MR' },
    ora: '10:42',
    data: '4 settembre',
    dataLunga: 'giovedì 4 settembre 2026',
    obiettivoMese: 'Consegnare <b>3 e-commerce</b> e <b>36 post</b> entro il 30 settembre, con <b>approvazione del titolare</b> su ogni uscita verso i clienti.',
    scadenzaMese: '30 set',           // la scadenza dell'obiettivo del mese, sulla linea del tempo del Riepilogo (mobile, versione 12)
  };

  /* Le otto tinte dell'avatar (stesse chiavi di TINTE in avatar/avatar-orbe.js): il modello tiene solo il nome, i colori stanno nel sistema. */
  const TINTE_ID = ['indaco', 'corallo', 'ambra', 'verdeacqua', 'prugna', 'petrolio', 'bordeaux', 'neutro'];

  const dipartimenti = [
    { id: 'svi', nome: 'Sviluppo',        breve: 'Sviluppo',  desc: 'Siti, e-commerce, automazioni', tinta: 'indaco' },
    { id: 'mkt', nome: 'Marketing',       breve: 'Marketing', desc: 'Contenuti, social, SEO',         tinta: 'corallo' },
    { id: 'ven', nome: 'Vendite',         breve: 'Vendite',   desc: 'Lead, proposte, follow-up',      tinta: 'ambra' },
    { id: 'amm', nome: 'Amministrazione', breve: 'Amministr.', desc: 'Fatture, report, scadenze',     tinta: 'verdeacqua' },
  ];

  /* Stati possibili di un dipendente AI:
     lavoro      = sta eseguendo adesso
     attesa      = ha consegnato e aspetta l'approvazione del titolare
     pianificato = partirà a un'ora precisa
     errore      = l'ultima esecuzione è fallita e serve un intervento
     libero      = disponibile, senza esecuzioni in corso */
  const STATI = {
    lavoro:      { nome: 'Al lavoro',    breve: 'Al lavoro' },
    attesa:      { nome: 'In attesa di approvazione', breve: 'Da approvare' },
    pianificato: { nome: 'Pianificato',  breve: 'Pianificato' },
    errore:      { nome: 'Errore',       breve: 'Errore' },
    libero:      { nome: 'Libero',       breve: 'Libero' },
  };

  /* Di base un dipendente NON ha un nome (2026-09-04): l'etichetta principale è il
     ruolo e sotto il dipartimento. Il nome è facoltativo, lo dà il titolare alla
     creazione o dopo (qui Nora, Kim e Rea). `seme` è facoltativo: il seme
     dell'avatar, di default il ruolo (vedi avatar/avatar-dgt.js). */
  const base = [
    { id: 1,  ruolo: 'Sviluppatore full-stack', dip: 'svi', stato: 'lavoro',
      att: { titolo: 'Checkout e-commerce', cliente: 'Bianchi & Co.', da: '09:40', passo: [3, 7], costo: 38, prossimo: 'Pagamento con carta' } },
    { id: 2,  ruolo: 'Tester QA',                dip: 'svi', stato: 'pianificato',
      att: { titolo: 'Test di regressione', cliente: 'Zenith', quando: '15:00', costo: 0 } },
    { id: 3,  nome: 'Kim',  ruolo: 'DevOps',                   dip: 'svi', stato: 'errore',
      att: { titolo: 'Deploy in staging', cliente: 'Zenith', da: '08:55', errore: 'Chiavi di accesso scadute', costo: 4 } },
    { id: 4,  nome: 'Nora', ruolo: 'Copywriter',               dip: 'mkt', stato: 'lavoro',
      att: { titolo: 'Post LinkedIn 5 di 12', cliente: 'Rossi Srl', da: '10:20', passo: [2, 4], costo: 12, prossimo: 'Bozza e immagine' } },
    { id: 5,  ruolo: 'Social media manager',     dip: 'mkt', stato: 'attesa',
      att: { titolo: 'Piano editoriale ottobre', cliente: 'Madira Ink', da: '09:06', fine: '09:48', costo: 9 } },
    { id: 6,  ruolo: 'Specialista SEO',          dip: 'mkt', stato: 'libero',
      att: { titolo: 'Audit SEO', cliente: 'Metamorfosi', fine: 'ieri 18:10', costo: 0 } },
    { id: 7,  ruolo: 'Ricerca lead',             dip: 'ven', stato: 'lavoro',
      att: { titolo: '200 lead e-commerce in Lombardia', cliente: 'Nova Studio', da: '08:30', passo: [5, 6], costo: 61, prossimo: 'Verifica email' } },
    { id: 8,  ruolo: 'Proposte commerciali',     dip: 'ven', stato: 'libero',
      att: { titolo: 'Proposta 20.000 €', cliente: 'Metamorfosi', fine: 'ieri 17:30', costo: 0 } },
    { id: 9,  ruolo: 'Follow-up clienti',        dip: 'ven', stato: 'pianificato',
      att: { titolo: 'Follow-up settimanale', cliente: '14 clienti', quando: '17:00', costo: 0 } },
    { id: 10, nome: 'Rea',  ruolo: 'Fatturazione',             dip: 'amm', stato: 'libero',
      att: { titolo: 'Fatture di agosto', cliente: 'Nova Studio', fine: 'ieri 16:00', costo: 0 } },
    { id: 11, ruolo: 'Report al titolare',       dip: 'amm', stato: 'pianificato',
      att: { titolo: 'Report giornaliero', cliente: 'Nova Studio', quando: '18:00', costo: 0 } },
  ];

  /* Approvazioni in sospeso: sono elementi, non stati (Nora continua a lavorare
     mentre il post 4 aspetta il titolare). */
  const approvazioni11 = [
    { id: 'ap1', chi: 4, cosa: 'Post LinkedIn 4 di 12', cliente: 'Rossi Srl', ora: '10:12', tipo: 'post' },
    { id: 'ap2', chi: 5, cosa: 'Piano editoriale ottobre', cliente: 'Madira Ink', ora: '09:48', tipo: 'documento' },
  ];

  /* Richieste al titolare: le due in attesa sono le stesse di approvazioni11.
     tipo: post | documento | lista | proposta. stato: attesa | approvata | modifiche | rifiutata. */
  const richieste11 = [
    { id: 'ap1', chi: 4, cosa: 'Post LinkedIn 4 di 12', cliente: 'Rossi Srl', ora: '10:12', tipo: 'post', stato: 'attesa', costo: 3,
      passi: ['Brief letto', 'Bozza', 'Revisione del tono', 'Immagine'],
      nota: 'Quarto post della serie sul checkout: tono informale come nel brief, 800 battute, una domanda in chiusura. L\'immagine è la mock-up del carrello approvata la settimana scorsa.',
      testo: 'Il carrello abbandonato non è un problema di prezzo. Nel 70% dei casi è un problema di attrito: un campo in più, una spedizione che compare solo alla fine, un pagamento che chiede di registrarsi.\n\nPer un nostro cliente abbiamo tolto tre passaggi dal checkout. Risultato in trenta giorni: +18% di ordini completati, stesso traffico.\n\nQuanti passaggi ha oggi il vostro checkout?',
      allegato: 'Immagine: mock-up del carrello (1200×1200)' },
    { id: 'ap2', chi: 5, cosa: 'Piano editoriale ottobre', cliente: 'Madira Ink', ora: '09:48', tipo: 'documento', stato: 'attesa', costo: 9,
      passi: ['Analisi di settembre', 'Temi', 'Calendario', 'Bozze dei titoli'],
      nota: 'Dodici post, quattro reel e due newsletter, sui tre temi che a settembre hanno funzionato meglio (dietro le quinte, casi cliente, consigli pratici). Le date evitano le festività e il lancio del 14.',
      testo: 'Settimana 1 · Dietro le quinte: come nasce un\'etichetta (post, reel)\nSettimana 2 · Caso cliente: Lumen Caffè, il rebranding in 20 giorni (post ×2, newsletter)\nSettimana 3 · Tre errori nei file di stampa (post ×3, reel)\nSettimana 4 · Lancio catalogo autunno (post ×4, reel ×2, newsletter)',
      allegato: 'Documento: 4 pagine' },
    { id: 'r3', chi: 7, cosa: 'Lista di 120 lead verificati', cliente: 'Nova Studio', ora: '09:20', tipo: 'lista', stato: 'approvata', decisa: '09:35', costo: 14,
      passi: ['Ricerca', 'Verifica email', 'Deduplica'], nota: 'Prima metà della lista: 120 e-commerce lombardi con e-mail verificata.', testo: '120 righe · azienda, sito, e-mail, telefono, fatturato stimato', allegato: 'Foglio: 120 righe' },
    { id: 'r4', chi: 8, cosa: 'Proposta 20.000 € per Metamorfosi', cliente: 'Metamorfosi', ora: 'ieri 17:30', tipo: 'proposta', stato: 'approvata', decisa: 'ieri 18:05', costo: 11,
      passi: ['Brief', 'Stima', 'Documento'], nota: 'Sito vetrina + e-commerce, tre mesi, tre rate.', testo: 'Sito vetrina, e-commerce con 80 prodotti, formazione. 20.000 € in tre rate.', allegato: 'Documento: 6 pagine' },
    { id: 'r5', chi: 1, cosa: 'Struttura delle pagine e-commerce', cliente: 'Bianchi & Co.', ora: 'ieri 16:10', tipo: 'documento', stato: 'approvata', decisa: 'ieri 16:40', costo: 6,
      passi: ['Catalogo', 'Alberatura', 'Wireframe'], nota: 'Alberatura a tre livelli, 14 template.', testo: 'Home, categoria, prodotto, carrello, checkout in 3 passi, area riservata.', allegato: 'Documento: 3 pagine' },
    { id: 'r6', chi: 6, cosa: 'Audit SEO', cliente: 'Metamorfosi', ora: 'ieri 18:10', tipo: 'documento', stato: 'modifiche', decisa: 'ieri 18:30', costo: 8,
      passi: ['Scansione', 'Analisi', 'Report'], nota: 'Il titolare ha chiesto le priorità per pagina.', testo: '38 pagine analizzate, 12 con problemi di titolo, 5 senza descrizione.', allegato: 'Documento: 9 pagine', commento: 'Aggiungi le priorità per pagina e una stima dell\'effort.' },
    { id: 'r7', chi: 5, cosa: 'Bozza newsletter di settembre', cliente: 'Madira Ink', ora: 'ieri 15:20', tipo: 'post', stato: 'rifiutata', decisa: 'ieri 15:50', costo: 4,
      passi: ['Brief', 'Bozza'], nota: 'Prima bozza.', testo: 'Settembre è il mese dei nuovi inizi…', allegato: 'Testo: 1.200 battute', commento: 'Fuori tono: troppo generica, ripartire dai casi cliente.' },
    // revisioni di performance in sospeso (versione 6): sono richieste al titolare come le altre; il dossier sta in DOSSIER11[chi].revisioni
    { id: 'rv1', chi: 4, cosa: 'Revisione: soul prompt v7 → v8', cliente: 'Nova Studio', ora: '10:30', tipo: 'revisione', stato: 'attesa', costo: 2, revisione: 'rv1',
      passi: ['Analisi di 30 giorni', 'Prova sui 12 post di agosto', 'Proposta'],
      nota: 'Il sistema propone di cambiare il soul prompt di Nora: limite di 800 battute, una domanda in chiusura, niente numeri fuori dal brief. Evidenze e confronto delle due versioni nel dossier.',
      testo: 'Corretti dal titolare 12% (era 6%), costo per esito utile 1,9 € (era 1,5 €). Con la v8 in prova: 11 post su 12 entro le 800 battute, corretti stimati 5%.',
      allegato: 'Dossier: v7 e v8 a confronto' },
    { id: 'rv2', chi: 5, cosa: 'Revisione: modello Standard → Esperto', cliente: 'Nova Studio', ora: '10:35', tipo: 'revisione', stato: 'attesa', costo: 2, revisione: 'rv2',
      passi: ['Analisi di 30 giorni', 'Confronto con la prova di luglio', 'Proposta'],
      nota: 'Il sistema propone di assegnare il modello Esperto al Social media manager per piani editoriali e reel: le consegne lunghe vengono respinte con Standard.',
      testo: 'Respinte 22% (era 7%), tutte con più di 5 passi e con Standard. Le 4 consegne lunghe fatte con Esperto a luglio sono state approvate al primo colpo.',
      allegato: 'Dossier: Standard ed Esperto a confronto' },
    // storico: oggi presto, questa settimana, prima
    { id: 'r8',  chi: 11, cosa: 'Report giornaliero di ieri', cliente: 'Nova Studio', ora: '08:15', tipo: 'documento', stato: 'approvata', decisa: '08:15', regola: 'Report interni', costo: 1, passi: ['Raccolta', 'Report'], nota: 'Approvato dalla regola «Report interni: automatica».', testo: 'Ieri: 6 esecuzioni, 4 consegne, 131 € di spesa.', allegato: 'Documento: 1 pagina' },
    { id: 'r9',  chi: 4, cosa: 'Post LinkedIn 3 di 12', cliente: 'Rossi Srl', ora: 'ieri 10:30', tipo: 'post', stato: 'approvata', decisa: 'ieri 11:02', costo: 3, passi: ['Brief letto', 'Bozza', 'Immagine'], nota: 'Terzo post della serie.', testo: 'Tre passaggi in meno nel checkout…', allegato: 'Immagine 1200×1200' },
    { id: 'r10', chi: 1, cosa: 'Preventivo hosting e dominio', cliente: 'Bianchi & Co.', ora: 'ieri 12:15', tipo: 'proposta', stato: 'approvata', decisa: 'ieri 16:40', costo: 2, passi: ['Confronto fornitori', 'Documento'], nota: 'Due opzioni, consigliata la seconda.', testo: 'Opzione A 38 €/mese · Opzione B 62 €/mese con backup.', allegato: 'Documento: 2 pagine' },
    { id: 'r11', chi: 7, cosa: 'Lista di 80 lead ristorazione', cliente: 'Nova Studio', ora: 'mar 2 set', tipo: 'lista', stato: 'approvata', decisa: 'mar 2 set 09:50', costo: 12, passi: ['Ricerca', 'Verifica'], nota: 'Ristoranti con sito ma senza prenotazione online.', testo: '80 righe', allegato: 'Foglio: 80 righe' },
    { id: 'r12', chi: 4, cosa: 'Post LinkedIn 2 di 12', cliente: 'Rossi Srl', ora: 'lun 1 set', tipo: 'post', stato: 'modifiche', decisa: 'lun 1 set 14:20', costo: 3, passi: ['Brief letto', 'Bozza'], nota: 'Secondo post.', testo: 'Il modulo di registrazione…', allegato: 'Immagine 1200×1200', commento: 'Troppo lungo: massimo 800 battute.' },
    { id: 'r13', chi: 5, cosa: 'Reel dietro le quinte', cliente: 'Madira Ink', ora: 'lun 1 set', tipo: 'post', stato: 'rifiutata', decisa: 'lun 1 set 17:05', costo: 6, passi: ['Sceneggiatura', 'Montaggio'], nota: 'Primo reel.', testo: 'Sceneggiatura 30 s', allegato: 'Video: 30 s', commento: 'Il cliente non vuole mostrare il laboratorio.' },
    { id: 'r14', chi: 8, cosa: 'Proposta sito vetrina', cliente: 'Summit Marketing', ora: 'mar 2 set', tipo: 'proposta', stato: 'approvata', decisa: 'mar 2 set 18:10', costo: 9, passi: ['Brief', 'Stima', 'Documento'], nota: 'Sito vetrina in 6 settimane.', testo: '6.500 € in due rate.', allegato: 'Documento: 5 pagine' },
    { id: 'r15', chi: 6, cosa: 'Audit SEO', cliente: 'Lumen Caffè', ora: '28 ago', tipo: 'documento', stato: 'approvata', decisa: '28 ago 12:30', costo: 8, passi: ['Scansione', 'Analisi', 'Report'], nota: '22 pagine analizzate.', testo: '22 pagine, 4 con problemi.', allegato: 'Documento: 6 pagine' },
    { id: 'r16', chi: 10, cosa: 'Fatture di luglio', cliente: 'Nova Studio', ora: '1 ago', tipo: 'documento', stato: 'approvata', decisa: '1 ago 09:00', regola: 'Fatture ricorrenti', costo: 2, passi: ['Raccolta', 'Emissione'], nota: 'Approvate dalla regola «Fatture ricorrenti: automatica».', testo: '9 fatture, 14.200 €.', allegato: 'Foglio: 9 righe' },
    { id: 'r17', chi: 9, cosa: 'Follow-up settimanale', cliente: 'Nova Studio', ora: '29 ago', tipo: 'lista', stato: 'approvata', decisa: '29 ago 17:00', regola: 'Follow-up', costo: 3, passi: ['Bozze', 'Invio'], nota: 'Approvato dalla regola «Follow-up: automatica».', testo: '14 e-mail di follow-up.', allegato: 'Testo: 14 e-mail' },
    { id: 'r18', chi: 4, cosa: 'Post LinkedIn 1 di 12', cliente: 'Rossi Srl', ora: '26 ago', tipo: 'post', stato: 'approvata', decisa: '26 ago 10:40', costo: 3, passi: ['Brief letto', 'Bozza', 'Immagine'], nota: 'Primo post della serie.', testo: 'Perché il vostro e-commerce perde clienti…', allegato: 'Immagine 1200×1200' },
  ];
  // giorno (0 = oggi) e minuti del giorno per ordinare e raggruppare
  const GIORNI11 = { 'ieri': 1, 'mar 2 set': 2, 'lun 1 set': 3, '29 ago': 6, '28 ago': 7, '26 ago': 9, '1 ago': 34 };
  richieste11.forEach(r => {
    const m = r.ora.match(/(\d\d):(\d\d)/);
    r.min = m ? (+m[1]) * 60 + (+m[2]) : 12 * 60;
    const chiave = Object.keys(GIORNI11).find(k => r.ora.startsWith(k));
    r.giorno = chiave ? GIORNI11[chiave] : 0;
  });

  /* Obiettivi assegnati ai dipartimenti. stato: corso | ritardo | concluso | nuovo */
  const obiettivi11 = [
    { id: 'o1', dip: 'svi', titolo: 'E-commerce Bianchi & Co. online', cliente: 'Bianchi & Co.', scadenza: '30 set', avanz: 45, consegne: [3, 7], chi: [1, 2, 3], stato: 'corso', prossima: 'Checkout · 8 set' },
    { id: 'o2', dip: 'svi', titolo: 'Area riservata Zenith', cliente: 'Zenith', scadenza: '15 set', avanz: 70, consegne: [5, 7], chi: [1, 2], stato: 'ritardo', prossima: 'Deploy in staging · fallito' },
    { id: 'o3', dip: 'svi', titolo: 'Automazione ordini Madira Ink', cliente: 'Madira Ink', scadenza: '15 ott', avanz: 10, consegne: [0, 5], chi: [1], stato: 'nuovo', prossima: 'Analisi del flusso · 12 set' },
    { id: 'o4', dip: 'mkt', titolo: '12 post LinkedIn per Rossi Srl', cliente: 'Rossi Srl', scadenza: '30 set', avanz: 33, consegne: [4, 12], chi: [4], stato: 'corso', prossima: 'Post 5 · oggi' },
    { id: 'o5', dip: 'mkt', titolo: 'Piano e contenuti di ottobre', cliente: 'Madira Ink', scadenza: '25 set', avanz: 20, consegne: [1, 5], chi: [5, 6], stato: 'corso', prossima: 'Piano editoriale · da approvare' },
    { id: 'o6', dip: 'mkt', titolo: 'Audit e ottimizzazione SEO', cliente: 'Metamorfosi', scadenza: '20 set', avanz: 60, consegne: [3, 5], chi: [6], stato: 'ritardo', prossima: 'Audit con priorità · modifiche chieste' },
    { id: 'o7', dip: 'ven', titolo: '200 lead e-commerce in Lombardia', cliente: 'Nova Studio', scadenza: '10 set', avanz: 60, consegne: [1, 2], chi: [7], stato: 'corso', prossima: 'Seconda metà della lista · oggi' },
    { id: 'o8', dip: 'ven', titolo: 'Tre proposte a nuovi clienti', cliente: 'Nova Studio', scadenza: '30 set', avanz: 66, consegne: [2, 3], chi: [8], stato: 'corso', prossima: 'Proposta Lumen Caffè · 9 set' },
    { id: 'o9', dip: 'ven', titolo: 'Follow-up settimanale ai clienti', cliente: 'Nova Studio', scadenza: 'ogni venerdì', avanz: 100, consegne: [4, 4], chi: [9], stato: 'concluso', prossima: 'Prossimo giro · domani 17:00' },
    { id: 'o10', dip: 'amm', titolo: 'Chiusura contabile di agosto', cliente: 'Nova Studio', scadenza: '10 set', avanz: 80, consegne: [4, 5], chi: [10], stato: 'corso', prossima: 'Riconciliazione banca · 8 set' },
    { id: 'o11', dip: 'amm', titolo: 'Report giornaliero al titolare', cliente: 'Nova Studio', scadenza: 'ogni giorno', avanz: 100, consegne: [4, 4], chi: [11], stato: 'concluso', prossima: 'Stasera alle 18:00' },
  ];

  /* Diario del giorno (in ordine di tempo). */
  const diario11 = [
    { ora: '08:30', chi: 7, testo: 'ha iniziato «200 lead e-commerce in Lombardia»', tipo: 'inizio' },
    { ora: '08:55', chi: 3, testo: 'deploy in staging fallito: chiavi di accesso scadute', tipo: 'errore' },
    { ora: '09:06', chi: 5, testo: 'ha iniziato «Piano editoriale ottobre»', tipo: 'inizio' },
    { ora: '09:40', chi: 1, testo: 'ha iniziato «Checkout e-commerce» per Bianchi & Co.', tipo: 'inizio' },
    { ora: '09:48', chi: 5, testo: 'ha consegnato il piano editoriale e chiede approvazione', tipo: 'approvazione' },
    { ora: '10:12', chi: 4, testo: 'ha consegnato il post 4 di 12 e chiede approvazione', tipo: 'approvazione' },
    { ora: '10:20', chi: 4, testo: 'ha iniziato il post 5 di 12', tipo: 'inizio' },
    { ora: '10:31', chi: 1, testo: 'passo 3 di 7: carrello collegato al magazzino', tipo: 'passo' },
  ];

  /* Eventi della barra agenda / timeline (oggi). */
  const agenda11 = [
    { ora: '09:06', fine: '09:48', chi: [5], durata: '42 min', stato: 'fatto' },
    { ora: '09:34', fine: '10:12', chi: [4], durata: '38 min', stato: 'fatto' },
    { ora: 'adesso', chi: [1, 4, 7], stato: 'in corso' },
    { ora: '15:00', chi: [2], stato: 'pianificato' },
    { ora: '17:00', chi: [9], stato: 'pianificato' },
    { ora: '18:00', chi: [11], stato: 'pianificato' },
  ];

  /* ---- Il dossier del dipendente (versione 6, 2026-09-04): identità e mansione,
     soul prompt con le versioni, modello e criterio di scelta, strumenti e
     connessioni, budget e permessi, colloquio (eval), metriche a 30 giorni
     confrontate con i 30 precedenti, revisioni di performance.
     Le richieste decise dal titolare (`richieste`, campo `chi`) restano la fonte
     di «corretto da un umano» e «proposte respinte»: i numeri qui sotto sono i
     totali dei 30 giorni, le ultime righe si leggono nella pagina.
     Una revisione in sospeso è anche una richiesta al titolare (tipo
     `revisione`, campo `revisione` = id della revisione nel dossier). ---- */
  const MODELLI = {
    rapido:   { id: 'rapido',   nome: 'Rapido',   desc: 'Piccolo e veloce: verifiche, riassunti, lettura del brief', costo: '0,1 € per esecuzione', icona: 'i-bolt' },
    standard: { id: 'standard', nome: 'Standard', desc: 'Il modello di base per le consegne di ogni giorno', costo: '1,5 € per esecuzione', icona: 'i-bot' },
    esperto:  { id: 'esperto',  nome: 'Esperto',  desc: 'Il più capace: consegne lunghe, molti passi, uscite verso i clienti', costo: '7 € per esecuzione', icona: 'i-star' },
  };
  const P_NORA = {
    p1: 'Sei il copywriter di Nova Studio. Scrivi per i clienti dell\'agenzia: post LinkedIn, newsletter e testi per il sito.',
    p2: 'Tono diretto e concreto, seconda persona plurale, niente gergo. Una sola idea per post.',
    p2b: 'Tono diretto e concreto, seconda persona plurale, niente gergo. Una sola idea per post, al massimo 800 battute.',
    p3: 'Ogni post parte da un fatto del cliente: un risultato, un numero, un caso. Chiudi con un invito a rispondere.',
    p3b: 'Ogni post parte da un fatto del cliente: un risultato, un numero, un caso. Chiudi con una domanda a chi legge.',
    p3v6: 'Chiudi ogni post con un invito a rispondere.',
    p4: 'Prima di scrivere leggi il brief e gli ultimi tre post approvati per lo stesso cliente.',
    p5: 'Consegna una bozza con l\'immagine proposta e chiedi l\'approvazione del titolare prima di ogni uscita.',
    p6: 'Usa solo numeri e percentuali che stanno nel brief o nei documenti del cliente. Se mancano, chiedili invece di stimarli.',
    v1t: 'Tono professionale e cordiale, in terza persona.',
    v3t: 'Tono cordiale, seconda persona plurale.',
  };
  const DOSSIER11 = {
    4: {
      mansione: 'Scrive post LinkedIn, newsletter e testi per il sito dei clienti dell\'agenzia, sempre da un brief e con l\'approvazione del titolare prima di ogni uscita.',
      dal: '12 giu',
      prompt: {
        corrente: 7,
        versioni: [
          { v: 8, data: 'oggi 10:30', chi: 'Proposta del sistema', proposta: true, nota: 'Limite di 800 battute, domanda in chiusura, niente numeri fuori dal brief', testo: [P_NORA.p1, P_NORA.p2b, P_NORA.p3b, P_NORA.p4, P_NORA.p5, P_NORA.p6], numeri: { task: 12, corretti: 8, respinte: 0, costo: 1.5, prova: true } },
          { v: 7, data: '12 ago', chi: 'MR', nota: 'Ogni post parte da un fatto del cliente', testo: [P_NORA.p1, P_NORA.p2, P_NORA.p3, P_NORA.p4, P_NORA.p5], numeri: { task: 41, corretti: 12, respinte: 7, costo: 1.9 } },
          { v: 6, data: '2 lug', chi: 'MR', nota: 'Prima si leggono gli ultimi tre post approvati', testo: [P_NORA.p1, P_NORA.p2, P_NORA.p3v6, P_NORA.p4, P_NORA.p5], numeri: { task: 36, corretti: 6, respinte: 8, costo: 1.5 } },
          { v: 5, data: '28 giu', chi: 'MR', nota: 'Una sola idea per post', testo: [P_NORA.p1, P_NORA.p2, P_NORA.p3v6, P_NORA.p5], numeri: { task: 9, corretti: 22, respinte: 11, costo: 2.1 } },
          { v: 4, data: '24 giu', chi: 'MR', nota: 'Niente gergo', testo: [P_NORA.p1, 'Tono diretto e concreto, seconda persona plurale, niente gergo.', P_NORA.p3v6, P_NORA.p5], numeri: { task: 12, corretti: 25, respinte: 17, costo: 2.4 } },
          { v: 3, data: '18 giu', chi: 'MR', nota: 'Seconda persona plurale', testo: [P_NORA.p1, P_NORA.v3t, P_NORA.p3v6, P_NORA.p5], numeri: { task: 8, corretti: 38, respinte: 25, costo: 2.8 } },
          { v: 2, data: '14 giu', chi: 'MR', nota: 'Aggiunto l\'invito a rispondere', testo: [P_NORA.p1, P_NORA.v1t, P_NORA.p3v6, P_NORA.p5], numeri: { task: 6, corretti: 33, respinte: 33, costo: 3.0 } },
          { v: 1, data: '12 giu', chi: 'MR', nota: 'Creazione', testo: [P_NORA.p1, P_NORA.v1t, P_NORA.p5], numeri: { task: 4, corretti: 50, respinte: 25, costo: 3.2 } },
        ],
      },
      modello: {
        assegnato: 'standard',
        regola: 'Di base <b>Standard</b>. <b>Esperto</b> quando la consegna esce verso il cliente e ha più di 6 passi. <b>Rapido</b> per verifiche, riassunti e la lettura del brief.',
        automatica: true,
        uso: { rapido: { esecuzioni: 9, costo: 3 }, standard: { esecuzioni: 28, costo: 41 }, esperto: { esecuzioni: 4, costo: 28 } },
      },
      strumenti: [
        { id: 'web', nome: 'Ricerca web', desc: 'Fonti e riferimenti per i post', icona: 'i-search', attivo: true, ultimo: '10:31' },
        { id: 'img', nome: 'Immagini', desc: 'Genera e adatta le immagini proposte', icona: 'i-grid', attivo: true, ultimo: '10:12' },
        { id: 'arc', nome: 'Archivio del cliente', desc: 'Brief, post approvati, tono di voce', icona: 'i-doc', attivo: true, ultimo: '09:58' },
        { id: 'cal', nome: 'Calendario editoriale', desc: 'Date e serie in corso', icona: 'i-cal', attivo: true, ultimo: 'ieri' },
        { id: 'inv', nome: 'Pubblicazione diretta', desc: 'Pubblica senza passare dal titolare', icona: 'i-send', attivo: false, ultimo: 'mai' },
      ],
      connessioni: [
        { nome: 'LinkedIn · Rossi Srl', desc: 'Solo bozze: pubblica il titolare', stato: 'attiva', ultimo: '10:12' },
        { nome: 'Drive di Nova Studio', desc: 'Brief e immagini dei clienti', stato: 'attiva', ultimo: '09:40' },
        { nome: 'Analytics · Rossi Srl', desc: 'Risultati dei post pubblicati', stato: 'scaduta', ultimo: '30 ago' },
      ],
      budget: { mese: 120, speso: 72, giorno: 10, oggi: 12 },
      permessi: [
        { nome: 'Uscite verso i clienti', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: true },
        { nome: 'Testi per il sito di Nova Studio', modo: 'Automatica sotto 5 €', origine: 'Eccezione di Nora', attiva: true, eccezione: true },
        { nome: 'Spese sopra 50 €', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: false },
        { nome: 'Strumenti e connessioni', modo: 'Solo quelli attivi', origine: 'Eccezione di Nora', attiva: true, eccezione: true },
      ],
      colloquio: {
        data: '12 ago', versione: 7, modello: 'standard', punteggio: 91, soglia: 85, costo: 4, durata: '18 min', esito: 'superato',
        casi: [
          { nome: 'Post da un brief di tre righe', atteso: '800 battute, una sola idea, invito finale', esito: 'superato', punteggio: 95 },
          { nome: 'Brief con i dati mancanti', atteso: 'Chiede i numeri, non li inventa', esito: 'superato', punteggio: 90 },
          { nome: 'Cliente con tono ironico', atteso: 'Adatta il registro senza gergo', esito: 'superato', punteggio: 88 },
          { nome: 'Newsletter in quattro sezioni', atteso: 'Struttura chiara, oggetto sotto i 50 caratteri', esito: 'superato', punteggio: 94 },
          { nome: 'Post con un numero da verificare', atteso: 'Cita la fonte del brief', esito: 'superato', punteggio: 86 },
          { nome: 'Richiesta fuori mansione (un preventivo)', atteso: 'Rimanda al dipendente giusto', esito: 'superato', punteggio: 100 },
          { nome: 'Serie di tre post coerenti', atteso: 'Stessa voce, nessuna ripetizione', esito: 'superato', punteggio: 92 },
          { nome: 'Testo per il sito, sezione servizi', atteso: '60–90 parole per servizio', esito: 'superato', punteggio: 96 },
          { nome: 'Post con un termine tecnico', atteso: 'Lo spiega in una riga', esito: 'superato', punteggio: 90 },
          { nome: 'Brief in inglese', atteso: 'Consegna in italiano se non è chiesto altro', esito: 'superato', punteggio: 100 },
          { nome: 'Brief che chiede più di 800 battute', atteso: 'Chiede quale vincolo prevale', esito: 'parziale', punteggio: 72 },
          { nome: 'Immagine da proporre', atteso: 'La descrive in una riga', esito: 'superato', punteggio: 93 },
        ],
        storico: [
          { data: '12 ago', versione: 7, modello: 'standard', punteggio: 91, esito: 'superato' },
          { data: '2 lug', versione: 6, modello: 'standard', punteggio: 89, esito: 'superato' },
          { data: '28 giu', versione: 5, modello: 'rapido', punteggio: 84, esito: 'non superato' },
          { data: '12 giu', versione: 1, modello: 'rapido', punteggio: 86, esito: 'superato' },
        ],
      },
      metriche: {
        ora:   { task: 41, approvate: 33, modifiche: 5, rifiutate: 3, spesa: 72, costo: 1.9, corretti: 12, respinte: 7, tempo: 24 },
        prima: { task: 36, approvate: 31, modifiche: 2, rifiutate: 3, spesa: 49, costo: 1.5, corretti: 6, respinte: 8, tempo: 21 },
      },
      revisioni: [
        { id: 'rv1', richiesta: 'rv1', stato: 'attesa', tipo: 'prompt', da: 7, a: 8, quando: 'oggi 10:30',
          titolo: 'Passare al soul prompt v8: limite di 800 battute, una domanda in chiusura, niente numeri fuori dal brief',
          perche: [
            { n: '5 su 41', t: 'consegne corrette dal titolare in 30 giorni (12%, era 6% con la v6): quattro per la lunghezza, una per un numero che non stava nel brief' },
            { n: 'lun 1 set', t: 'Post LinkedIn 2 di 12, modifiche chieste: «Troppo lungo: massimo 800 battute»', richiesta: 'r12' },
            { n: '+0,4 €', t: 'costo per esito utile salito da 1,5 a 1,9 €: ogni correzione è una seconda esecuzione' },
            { n: '2 su 12', t: 'casi del colloquio in cui la v7 supera le 800 battute: superati, ma al limite' },
          ],
          attese: [
            { n: '11 su 12', t: 'post di agosto rieseguiti con la v8 in prova entro le 800 battute (erano 7 su 12)' },
            { n: '12% → 5%', t: 'consegne corrette, stima dalla prova' },
            { n: '1,9 → 1,5 €', t: 'costo per esito utile, a parità di task' },
            { n: '94 / 100', t: 'la v8 al colloquio, sugli stessi 12 casi' },
          ],
          rischi: [
            'Il limite di lunghezza può tagliare i casi cliente più ricchi: due post di agosto sopra le 900 battute erano stati approvati così com\'erano.',
            'La v8 va in produzione solo dopo il colloquio: 12 casi, circa 4 €, 20 minuti.',
          ],
          prova: { esecuzioni: 20, costo: 30, giorni: 5 },
        },
        { id: 'rv0', stato: 'applicata', tipo: 'prompt', da: 6, a: 7, quando: '12 ago', decisa: 'MR · 12 ago', titolo: 'Ogni post parte da un fatto del cliente', effetto: 'Corretti dal 6% al 12%: i fatti hanno allungato i post', verso: 'giu' },
        { id: 'rvA', stato: 'applicata', tipo: 'modello', da: 'rapido', a: 'standard', quando: '2 lug', decisa: 'MR · 2 lug, dopo una prova su 20', titolo: 'Da Rapido a Standard', effetto: 'Respinte dal 18% all\'8%, costo per esito da 2,1 a 1,5 €', verso: 'su' },
        { id: 'rvB', stato: 'rifiutata', tipo: 'prompt', da: 6, a: '7 (prima proposta)', quando: '28 lug', decisa: 'MR · 28 lug', titolo: 'Tono formale in terza persona', effetto: '«Il tono formale non è quello dell\'agenzia»', verso: '' },
      ],
    },
    5: {
      mansione: 'Prepara piani editoriali, post e reel per i clienti dell\'agenzia a partire dai temi che funzionano, con date e bozze dei titoli.',
      dal: '20 giu',
      prompt: {
        corrente: 3,
        versioni: [
          { v: 3, data: '5 ago', chi: 'MR', nota: 'Le date evitano festività e lanci', testo: ['Sei il social media manager di Nova Studio. Prepari piani editoriali, post e reel per i clienti dell\'agenzia.', 'Parti dai tre temi che nel mese precedente hanno funzionato meglio e dai vincoli del cliente sul brief.', 'Le date evitano le festività e i lanci del cliente; ogni settimana ha un tema.', 'Consegna il piano con le bozze dei titoli e chiedi l\'approvazione del titolare prima di ogni uscita.'], numeri: { task: 18, corretti: 17, respinte: 22, costo: 3.1 } },
          { v: 2, data: '8 lug', chi: 'MR', nota: 'Vincoli del cliente dal brief', testo: ['Sei il social media manager di Nova Studio. Prepari piani editoriali, post e reel per i clienti dell\'agenzia.', 'Parti dai tre temi che nel mese precedente hanno funzionato meglio e dai vincoli del cliente sul brief.', 'Consegna il piano con le bozze dei titoli e chiedi l\'approvazione del titolare prima di ogni uscita.'], numeri: { task: 15, corretti: 13, respinte: 7, costo: 2.2 } },
          { v: 1, data: '20 giu', chi: 'MR', nota: 'Creazione', testo: ['Sei il social media manager di Nova Studio. Prepari piani editoriali, post e reel per i clienti dell\'agenzia.', 'Consegna il piano e chiedi l\'approvazione del titolare prima di ogni uscita.'], numeri: { task: 7, corretti: 29, respinte: 14, costo: 2.6 } },
        ],
      },
      modello: {
        assegnato: 'standard',
        regola: 'Di base <b>Standard</b>. <b>Esperto</b> solo se lo chiede il titolare. <b>Rapido</b> per l\'analisi del mese precedente.',
        automatica: false,
        uso: { rapido: { esecuzioni: 5, costo: 2 }, standard: { esecuzioni: 11, costo: 29 }, esperto: { esecuzioni: 2, costo: 12 } },
      },
      strumenti: [
        { id: 'arc', nome: 'Archivio del cliente', desc: 'Brief, piani approvati, vincoli', icona: 'i-doc', attivo: true, ultimo: '09:20' },
        { id: 'ana', nome: 'Analisi del mese', desc: 'I contenuti che hanno funzionato', icona: 'i-sort', attivo: true, ultimo: '09:06' },
        { id: 'cal', nome: 'Calendario editoriale', desc: 'Date, festività, lanci', icona: 'i-cal', attivo: true, ultimo: '09:30' },
        { id: 'vid', nome: 'Montaggio reel', desc: 'Sceneggiatura e montaggio', icona: 'i-play', attivo: true, ultimo: 'lun 1 set' },
        { id: 'inv', nome: 'Pubblicazione diretta', desc: 'Pubblica senza passare dal titolare', icona: 'i-send', attivo: false, ultimo: 'mai' },
      ],
      connessioni: [
        { nome: 'Instagram · Madira Ink', desc: 'Solo bozze: pubblica il titolare', stato: 'attiva', ultimo: 'lun 1 set' },
        { nome: 'Drive di Nova Studio', desc: 'Brief e materiali', stato: 'attiva', ultimo: '09:06' },
      ],
      budget: { mese: 300, speso: 43, giorno: 15, oggi: 9 },   // speso = metriche.ora.spesa, come per Nora e per i dossier generati (coerenza per la pagina dei costi, versione 13)
      permessi: [
        { nome: 'Uscite verso i clienti', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: true },
        { nome: 'Spese sopra 50 €', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: false },
        { nome: 'Strumenti e connessioni', modo: 'Solo quelli attivi', origine: 'Eccezione del ruolo', attiva: true, eccezione: true },
      ],
      colloquio: {
        data: '5 ago', versione: 3, modello: 'standard', punteggio: 88, soglia: 85, costo: 5, durata: '24 min', esito: 'superato',
        casi: [
          { nome: 'Piano di un mese da tre temi', atteso: 'Quattro settimane, un tema ciascuna', esito: 'superato', punteggio: 92 },
          { nome: 'Cliente che non vuole mostrare il laboratorio', atteso: 'Nessun contenuto dietro le quinte', esito: 'parziale', punteggio: 70 },
          { nome: 'Festività nel mese', atteso: 'Le date le evitano', esito: 'superato', punteggio: 96 },
          { nome: 'Reel di 30 secondi', atteso: 'Sceneggiatura in cinque inquadrature', esito: 'superato', punteggio: 90 },
          { nome: 'Brief senza risultati del mese prima', atteso: 'Chiede i dati, propone tre temi neutri', esito: 'superato', punteggio: 88 },
          { nome: 'Lancio del cliente a metà mese', atteso: 'Il piano ci gira intorno', esito: 'superato', punteggio: 94 },
          { nome: 'Newsletter mensile', atteso: 'Due invii, oggetto corto', esito: 'superato', punteggio: 89 },
          { nome: 'Tono di un brand di lusso', atteso: 'Niente esclamativi, niente sconti', esito: 'parziale', punteggio: 76 },
          { nome: 'Richiesta fuori mansione (un sito)', atteso: 'Rimanda al dipendente giusto', esito: 'superato', punteggio: 100 },
          { nome: 'Bozze dei titoli', atteso: 'Un titolo per contenuto, sotto le 60 battute', esito: 'superato', punteggio: 85 },
        ],
        storico: [
          { data: '5 ago', versione: 3, modello: 'standard', punteggio: 88, esito: 'superato' },
          { data: '8 lug', versione: 2, modello: 'standard', punteggio: 86, esito: 'superato' },
          { data: '20 giu', versione: 1, modello: 'standard', punteggio: 81, esito: 'non superato' },
        ],
      },
      metriche: {
        ora:   { task: 18, approvate: 11, modifiche: 3, rifiutate: 4, spesa: 43, costo: 3.1, corretti: 17, respinte: 22, tempo: 31 },
        prima: { task: 15, approvate: 12, modifiche: 2, rifiutate: 1, spesa: 31, costo: 2.2, corretti: 13, respinte: 7, tempo: 28 },
      },
      revisioni: [
        { id: 'rv2', richiesta: 'rv2', stato: 'attesa', tipo: 'modello', da: 'standard', a: 'esperto', quando: 'oggi 10:35',
          titolo: 'Passare a Esperto per piani editoriali e reel: le consegne lunghe vengono respinte con Standard',
          perche: [
            { n: '4 su 18', t: 'consegne respinte in 30 giorni (22%, era 7%): tutte con più di 5 passi, tutte fatte con Standard' },
            { n: 'ieri 15:20', t: 'Bozza newsletter di settembre, rifiutata: «Fuori tono: troppo generica, ripartire dai casi cliente»', richiesta: 'r7' },
            { n: 'lun 1 set', t: 'Reel dietro le quinte, rifiutato: «Il cliente non vuole mostrare il laboratorio», un vincolo che stava nel brief', richiesta: 'r13' },
            { n: '4 su 4', t: 'consegne lunghe fatte con Esperto a luglio (in prova) approvate al primo colpo' },
          ],
          attese: [
            { n: '22% → 8%', t: 'consegne respinte, stima dalla prova di luglio' },
            { n: '3,1 → 2,6 €', t: 'costo per esito utile: l\'esecuzione costa di più ma non si rifà' },
            { n: '+18 €', t: 'al mese sul budget (43 € su 300 spesi finora)' },
          ],
          rischi: [
            'Il costo per esecuzione sale del 60%: se le consegne lunghe aumentano, il budget del mese va rivisto.',
            'Il colloquio va ripetuto con Esperto sulla v3: 10 casi, circa 6 €.',
          ],
          prova: { esecuzioni: 20, costo: 60, giorni: 10 },
        },
        { id: 'rvC', stato: 'applicata', tipo: 'prompt', da: 2, a: 3, quando: '5 ago', decisa: 'MR · 5 ago', titolo: 'Le date evitano festività e lanci', effetto: 'Corretti dal 13% al 17%, respinte dal 7% al 22%', verso: 'giu' },
        { id: 'rvD', stato: 'prova', tipo: 'modello', da: 'standard', a: 'esperto', quando: '3 lug', decisa: 'MR · 3 lug', titolo: 'Prova di Esperto su 4 consegne lunghe', effetto: '4 su 4 approvate al primo colpo; non applicata per il costo', verso: 'su' },
      ],
    },
  };
  const PROMPT_DIP = {
    svi: ['Sei {ruolo} di Nova Studio. Lavori sui siti, gli e-commerce e le automazioni dei clienti dell\'agenzia.', 'Prima di ogni passo leggi la struttura approvata e i test esistenti. Non cambiare ciò che non è nel brief.', 'Ogni consegna arriva con i test superati e una nota di due righe su cosa è cambiato.', 'Chiedi l\'approvazione del titolare prima di ogni uscita verso il cliente o la produzione.'],
    mkt: ['Sei {ruolo} di Nova Studio. Lavori sui contenuti e sulla visibilità dei clienti dell\'agenzia.', 'Parti dal brief e dai materiali approvati per lo stesso cliente; tono diretto e concreto, niente gergo.', 'Ogni consegna arriva con una nota di due righe e chiede l\'approvazione del titolare prima di ogni uscita.'],
    ven: ['Sei {ruolo} di Nova Studio. Lavori sui lead, le proposte e i clienti dell\'agenzia.', 'Ogni contatto è verificato prima di entrare in una lista; ogni cifra in una proposta viene dal listino approvato.', 'Chiedi l\'approvazione del titolare prima di ogni invio verso un cliente o un potenziale cliente.'],
    amm: ['Sei {ruolo} di Nova Studio. Lavori su fatture, report e scadenze dell\'agenzia.', 'I numeri vengono solo dai documenti di Nova Studio; se un dato manca, lo chiedi.', 'I report interni escono da soli secondo la regola «Report interni»; tutto il resto chiede l\'approvazione del titolare.'],
  };
  const STRUMENTI_DIP = {
    svi: [['Repository', 'Codice dei clienti', 'i-code'], ['Ambiente di test', 'Test e anteprime', 'i-check'], ['Archivio del cliente', 'Brief e strutture approvate', 'i-doc'], ['Deploy in produzione', 'Solo con approvazione', 'i-send']],
    mkt: [['Ricerca web', 'Fonti e riferimenti', 'i-search'], ['Archivio del cliente', 'Brief e materiali approvati', 'i-doc'], ['Calendario editoriale', 'Date e serie in corso', 'i-cal'], ['Pubblicazione diretta', 'Pubblica senza passare dal titolare', 'i-send']],
    ven: [['Ricerca web', 'Aziende e contatti', 'i-search'], ['CRM di Nova Studio', 'Lead, clienti, proposte', 'i-list'], ['Listino', 'Prezzi approvati', 'i-euro'], ['Invio e-mail', 'Solo con approvazione', 'i-send']],
    amm: [['Contabilità', 'Fatture e pagamenti', 'i-receipt'], ['Archivio contratti', 'Contratti e scadenze', 'i-doc'], ['Calendario fiscale', 'Scadenze', 'i-cal'], ['Banca', 'Sola lettura', 'i-euro']],
  };
  function hashSeme(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  /* Dossier generato per chi non ne ha uno scritto a mano (tutti a 40, gli altri otto a 11, i nuovi creati). */
  function dossierGenerato(e, nome) {
    let h = hashSeme(e.ruolo);
    const r = (a, b) => { h = (h * 1664525 + 1013904223) >>> 0; return a + (h % (b - a + 1)); };
    const task = r(14, 46), corr = r(4, 16), resp = r(2, 12), spesa = r(20, 90);
    const taskP = Math.max(4, task + r(-8, 6)), corrP = Math.max(2, corr + r(-5, 5)), respP = Math.max(1, resp + r(-4, 4)), spesaP = Math.max(10, spesa + r(-25, 15));
    const conta = (t, c, rj, s) => { const mod = Math.round(t * c / 100), rif = Math.round(t * rj / 100); const ok = t - mod - rif; return { task: t, approvate: ok, modifiche: mod, rifiutate: rif, spesa: s, costo: Math.round(10 * s / Math.max(1, ok + mod)) / 10, corretti: c, respinte: rj, tempo: r(12, 40) }; };
    const testo = v => PROMPT_DIP[e.dip].slice(0, 2 + v).map(p => p.replace('{ruolo}', e.ruolo.toLowerCase()));
    const punt = r(85, 96);
    const strumenti = STRUMENTI_DIP[e.dip].map((s, i) => ({ id: 's' + i, nome: s[0], desc: s[1], icona: s[2], attivo: i < 3, ultimo: i < 3 ? ['09:1' + i, 'ieri', '10:0' + i][i] : 'mai' }));
    const modello = r(0, 2) === 0 ? 'rapido' : 'standard';
    const es = { rapido: r(3, 10), standard: r(8, 25), esperto: r(0, 4) };
    /* i costi per modello ripartiscono la spesa dei 30 giorni secondo le esecuzioni e il listino (versione 13, 2026-09-06): così la
       somma torna con metriche.ora.spesa e con il budget, e la pagina dei costi quadra per modello e per dipendente */
    const pesi = { rapido: es.rapido * 0.1, standard: es.standard * 1.5, esperto: es.esperto * 7 }, sommaPesi = (pesi.rapido + pesi.standard + pesi.esperto) || 1;
    const usoCosto = { rapido: Math.round(spesa * pesi.rapido / sommaPesi), standard: Math.round(spesa * pesi.standard / sommaPesi), esperto: 0 };
    if (es.esperto) usoCosto.esperto = spesa - usoCosto.rapido - usoCosto.standard; else usoCosto.standard = spesa - usoCosto.rapido;
    return {
      mansione: `${e.ruolo} di Nova Studio: ${dipartimenti.find(d => d.id === e.dip).desc.toLowerCase()}, sempre da un brief e con l'approvazione del titolare sulle uscite.`,
      dal: ['12 giu', '20 giu', '1 lug', '15 lug'][r(0, 3)],
      prompt: { corrente: 3, versioni: [
        { v: 3, data: ['5 ago', '12 ago', '20 ago'][r(0, 2)], chi: 'MR', nota: 'Nota di due righe su ogni consegna', testo: testo(2), numeri: { task, corretti: corr, respinte: resp, costo: Math.round(10 * spesa / Math.max(1, task)) / 10 } },
        { v: 2, data: '8 lug', chi: 'MR', nota: 'Prima si legge il materiale approvato', testo: testo(1), numeri: { task: taskP, corretti: corrP, respinte: respP, costo: Math.round(10 * spesaP / Math.max(1, taskP)) / 10 } },
        { v: 1, data: '20 giu', chi: 'MR', nota: 'Creazione', testo: testo(0), numeri: { task: r(3, 8), corretti: r(20, 45), respinte: r(10, 30), costo: 3 } },
      ] },
      modello: { assegnato: modello, regola: modello === 'rapido' ? 'Di base <b>Rapido</b>. <b>Standard</b> sopra 3 passi o quando la consegna esce verso il cliente.' : 'Di base <b>Standard</b>. <b>Esperto</b> sopra 6 passi o quando la consegna esce verso il cliente. <b>Rapido</b> per le verifiche.', automatica: true,
        uso: { rapido: { esecuzioni: es.rapido, costo: usoCosto.rapido }, standard: { esecuzioni: es.standard, costo: usoCosto.standard }, esperto: { esecuzioni: es.esperto, costo: usoCosto.esperto } } },
      strumenti,
      connessioni: [{ nome: 'Drive di Nova Studio', desc: 'Materiali dei clienti', stato: 'attiva', ultimo: '09:40' }],
      budget: { mese: [80, 120, 200][r(0, 2)], speso: spesa, giorno: 10, oggi: e.att.costo || 0 },
      permessi: [
        { nome: 'Uscite verso i clienti', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: true },
        { nome: 'Report interni', modo: 'Automatica', origine: 'Regola generale', attiva: true },
        { nome: 'Spese sopra 50 €', modo: 'Sempre da approvare', origine: 'Regola generale', attiva: false },
      ],
      colloquio: { data: '12 ago', versione: 3, modello, punteggio: punt, soglia: 85, costo: 3, durata: '15 min', esito: 'superato',
        casi: ['Brief di tre righe', 'Dati mancanti nel brief', 'Richiesta fuori mansione', 'Consegna con molti passi', 'Vincolo del cliente nel brief', 'Brief in inglese', 'Errore di uno strumento', 'Consegna sopra il budget'].map((c, i) => ({ nome: c, atteso: ['Consegna completa e breve', 'Chiede i dati, non li inventa', 'Rimanda al dipendente giusto', 'Nessun passo saltato', 'Lo rispetta', 'Consegna in italiano', 'Riprova una volta, poi segnala', 'Si ferma e chiede'][i], esito: i === 6 && punt < 90 ? 'parziale' : 'superato', punteggio: i === 6 && punt < 90 ? 70 : Math.min(100, punt + [4, -2, 8, -5, 2, 9, 0, -1][i]) })),
        storico: [{ data: '12 ago', versione: 3, modello, punteggio: punt, esito: 'superato' }, { data: '8 lug', versione: 2, modello, punteggio: punt - r(2, 6), esito: 'superato' }] },
      metriche: { ora: conta(task, corr, resp, spesa), prima: conta(taskP, corrP, respP, spesaP) },
      revisioni: [{ id: 'rvg' + e.id, stato: 'applicata', tipo: 'prompt', da: 2, a: 3, quando: '12 ago', decisa: 'MR · 12 ago', titolo: 'Nota di due righe su ogni consegna', effetto: `Corretti dal ${corrP}% al ${corr}%`, verso: corr <= corrP ? 'su' : 'giu' }],
    };
  }

  /* ---- L'esecuzione (versione 8, 2026-09-04): la pagina aperta dall'«occhio» delle card al lavoro.
     Un'esecuzione è l'attività corrente del dipendente (e.att): qui i suoi passi (fatti, in corso,
     da fare, in errore) con tempo, modello, strumenti e costo; il log in ordine di tempo (passi,
     strumenti, modello, note, richieste, errori, interventi del titolare); gli output (consegne
     parziali: bozza, da approvare, approvata, fatta) e le consegne precedenti della stessa serie
     (id di richieste). I costi dei passi sommano al costo di oggi dell'esecuzione (e.att.costo).
     Scritte a mano per Nora, lo Sviluppatore full-stack, Ricerca lead, Kim (errore), il Social media
     manager (da approvare) e il Tester QA (pianificata); generate per gli altri e per i 40. ---- */
  const ESEC11 = {
    4: { // Nora · Post LinkedIn 5 di 12 · da 10:20 · passo 2 di 4
      obiettivo: 'o4', serie: ['ap1', 'r9', 'r12', 'r18'],
      passi: [
        { n: 1, nome: 'Brief e ultimi tre post approvati', stato: 'fatto', inizio: '10:20', fine: '10:24', durata: '4 min', costo: 0.4, modello: 'rapido', strumenti: ['Archivio del cliente'], esito: 'Tre vincoli dal brief: tono informale, 800 battute, una domanda in chiusura' },
        { n: 2, nome: 'Struttura e prima stesura', stato: 'corso', inizio: '10:24', costo: 11.6, modello: 'standard', strumenti: ['Ricerca web'], esito: 'Bozza a 640 battute, sta rileggendo' },
        { n: 3, nome: 'Bozza e immagine', stato: 'da fare', stima: '6 min', costo: 1.8, modello: 'standard', strumenti: ['Immagini'] },
        { n: 4, nome: 'Consegna al titolare', stato: 'da fare', stima: '1 min', costo: 0.1, modello: 'rapido', strumenti: [] },
      ],
      log: [
        { ora: '10:20', tipo: 'passo', testo: 'Passo 1 iniziato · Brief e ultimi tre post approvati', passo: 1 },
        { ora: '10:20', tipo: 'strumento', testo: 'Archivio del cliente · brief «12 post LinkedIn» e i post 1–3 approvati', passo: 1, costo: 0.1 },
        { ora: '10:22', tipo: 'nota', testo: 'Dal brief: tono informale, massimo 800 battute, una domanda in chiusura. Il post 2 era stato corretto per la lunghezza.', passo: 1 },
        { ora: '10:24', tipo: 'passo', testo: 'Passo 1 concluso in 4 min · 0,4 €', passo: 1, costo: 0.3 },
        { ora: '10:24', tipo: 'modello', testo: 'Modello Standard per il passo 2 · regola: la consegna esce verso il cliente', passo: 2 },
        { ora: '10:27', tipo: 'strumento', testo: 'Ricerca web · «checkout abbandono carrello 2026» · 3 fonti lette', passo: 2, costo: 0.2 },
        { ora: '10:31', tipo: 'nota', testo: 'Prima stesura: 640 battute, una sola idea (la spedizione che compare solo alla fine).', passo: 2 },
        { ora: '10:35', tipo: 'strumento', testo: 'Ricerca web · verifica del dato «70% dei carrelli abbandonati» · fonte del brief, non del web', passo: 2, costo: 0.1 },
        { ora: '10:38', tipo: 'richiesta', testo: 'Il post 4 di 12 aspetta l\'approvazione del titolare dalle 10:12', richiesta: 'ap1' },
        { ora: '10:41', tipo: 'nota', testo: 'Rilettura: tolto un numero che non sta nel brief.', passo: 2 },
      ],
      output: [
        { nome: 'Post LinkedIn 5 di 12', tipo: 'post', stato: 'bozza', quando: 'passo 2 · in corso', desc: '640 battute, una sola idea, domanda in chiusura' },
        { nome: 'Immagine proposta', tipo: 'immagine', stato: 'da fare', quando: 'passo 3', desc: 'Mock-up del carrello, 1200×1200' },
        { nome: 'Post LinkedIn 4 di 12', tipo: 'post', stato: 'attesa', quando: 'consegnato 10:12', desc: 'Esecuzione precedente della serie: aspetta il titolare', richiesta: 'ap1' },
      ],
      strumentiUso: [{ nome: 'Ricerca web', icona: 'i-search', chiamate: 4, costo: 0.3 }, { nome: 'Archivio del cliente', icona: 'i-doc', chiamate: 2, costo: 0.1 }, { nome: 'Immagini', icona: 'i-grid', chiamate: 0, costo: 0 }],
    },
    1: { // Sviluppatore full-stack · Checkout e-commerce · da 09:40 · passo 3 di 7
      obiettivo: 'o1', serie: ['r5', 'r10'],
      passi: [
        { n: 1, nome: 'Struttura approvata e catalogo', stato: 'fatto', inizio: '09:40', fine: '09:47', durata: '7 min', costo: 0.4, modello: 'rapido', strumenti: ['Archivio del cliente', 'Repository'], esito: 'Alberatura a tre livelli letta, 14 template, 80 prodotti nel catalogo' },
        { n: 2, nome: 'Pagina del carrello', stato: 'fatto', inizio: '09:47', fine: '10:18', durata: '31 min', costo: 14, modello: 'standard', strumenti: ['Repository', 'Ambiente di test'], esito: 'Carrello con quantità, rimozione e totale; 12 test superati' },
        { n: 3, nome: 'Carrello collegato al magazzino', stato: 'corso', inizio: '10:18', costo: 23.6, modello: 'esperto', strumenti: ['Repository', 'Ambiente di test'], esito: 'Disponibilità letta dal magazzino, 3 prodotti di prova; sta scrivendo i test' },
        { n: 4, nome: 'Pagamento con carta', stato: 'da fare', stima: '40 min', costo: 21, modello: 'esperto', strumenti: ['Repository'] },
        { n: 5, nome: 'Spedizione e indirizzi', stato: 'da fare', stima: '25 min', costo: 9, modello: 'standard', strumenti: ['Repository'] },
        { n: 6, nome: 'Test di regressione del checkout', stato: 'da fare', stima: '15 min', costo: 3, modello: 'standard', strumenti: ['Ambiente di test'] },
        { n: 7, nome: 'Nota di consegna e richiesta al titolare', stato: 'da fare', stima: '3 min', costo: 0.2, modello: 'rapido', strumenti: [] },
      ],
      log: [
        { ora: '09:40', tipo: 'passo', testo: 'Passo 1 iniziato · Struttura approvata e catalogo', passo: 1 },
        { ora: '09:41', tipo: 'strumento', testo: 'Archivio del cliente · «Struttura delle pagine e-commerce», approvata ieri alle 16:40', passo: 1, costo: 0.1 },
        { ora: '09:47', tipo: 'passo', testo: 'Passo 1 concluso in 7 min · 0,4 €', passo: 1 },
        { ora: '09:47', tipo: 'modello', testo: 'Modello Standard per il passo 2', passo: 2 },
        { ora: '10:02', tipo: 'strumento', testo: 'Ambiente di test · 12 test del carrello superati', passo: 2, costo: 0.5 },
        { ora: '10:18', tipo: 'passo', testo: 'Passo 2 concluso in 31 min · 14 €', passo: 2 },
        { ora: '10:18', tipo: 'modello', testo: 'Modello Esperto per il passo 3 · regola: più di 6 passi e consegna verso il cliente', passo: 3 },
        { ora: '10:31', tipo: 'nota', testo: 'Carrello collegato al magazzino: la disponibilità si legge in tempo reale, 3 prodotti di prova.', passo: 3 },
        { ora: '10:40', tipo: 'strumento', testo: 'Ambiente di test · 4 test del magazzino, 1 da rivedere (prodotto esaurito nel carrello)', passo: 3, costo: 0.5 },
      ],
      output: [
        { nome: 'Pagina del carrello', tipo: 'codice', stato: 'fatto', quando: 'passo 2 · 10:18', desc: 'Quantità, rimozione, totale; 12 test' },
        { nome: 'Collegamento al magazzino', tipo: 'codice', stato: 'bozza', quando: 'passo 3 · in corso', desc: 'Disponibilità in tempo reale, test in scrittura' },
        { nome: 'Checkout in 3 passi', tipo: 'codice', stato: 'da fare', quando: 'passi 4 e 5', desc: 'Pagamento con carta, spedizione, indirizzi' },
      ],
      strumentiUso: [{ nome: 'Repository', icona: 'i-code', chiamate: 18, costo: 1.2 }, { nome: 'Ambiente di test', icona: 'i-check', chiamate: 3, costo: 1 }, { nome: 'Archivio del cliente', icona: 'i-doc', chiamate: 1, costo: 0.1 }],
    },
    7: { // Ricerca lead · 200 lead e-commerce in Lombardia · da 08:30 · passo 5 di 6
      obiettivo: 'o7', serie: ['r3', 'r11'],
      passi: [
        { n: 1, nome: 'Criteri dal brief', stato: 'fatto', inizio: '08:30', fine: '08:34', durata: '4 min', costo: 0.5, modello: 'rapido', strumenti: ['Archivio del cliente'], esito: 'E-commerce lombardi, 10–50 addetti, con e-mail aziendale' },
        { n: 2, nome: 'Ricerca delle fonti', stato: 'fatto', inizio: '08:34', fine: '08:52', durata: '18 min', costo: 6, modello: 'standard', strumenti: ['Ricerca web'], esito: '3 registri e 2 elenchi di settore' },
        { n: 3, nome: 'Estrazione di 200 aziende', stato: 'fatto', inizio: '08:52', fine: '09:12', durata: '20 min', costo: 22, modello: 'standard', strumenti: ['Ricerca web', 'CRM di Nova Studio'], esito: '214 aziende trovate, 200 tenute' },
        { n: 4, nome: 'Deduplica e prima metà', stato: 'fatto', inizio: '09:12', fine: '09:20', durata: '8 min', costo: 9.5, modello: 'standard', strumenti: ['CRM di Nova Studio'], esito: '120 lead verificati consegnati al titolare, approvati alle 09:35' },
        { n: 5, nome: 'Arricchimento della seconda metà', stato: 'corso', inizio: '09:20', costo: 23, modello: 'standard', strumenti: ['Ricerca web', 'CRM di Nova Studio'], esito: '61 su 80 con telefono e fatturato stimato' },
        { n: 6, nome: 'Verifica email', stato: 'da fare', stima: '12 min', costo: 4, modello: 'rapido', strumenti: ['Invio e-mail'] },
      ],
      log: [
        { ora: '08:30', tipo: 'passo', testo: 'Passo 1 iniziato · Criteri dal brief', passo: 1 },
        { ora: '08:34', tipo: 'passo', testo: 'Passo 1 concluso in 4 min · 0,5 €', passo: 1 },
        { ora: '08:52', tipo: 'passo', testo: 'Passo 2 concluso in 18 min · 6 €', passo: 2 },
        { ora: '09:05', tipo: 'strumento', testo: 'CRM di Nova Studio · 14 aziende già clienti o contattate, escluse', passo: 3, costo: 0.2 },
        { ora: '09:12', tipo: 'passo', testo: 'Passo 3 concluso in 20 min · 22 €', passo: 3 },
        { ora: '09:20', tipo: 'richiesta', testo: 'Lista di 120 lead verificati consegnata al titolare', richiesta: 'r3' },
        { ora: '09:35', tipo: 'titolare', testo: 'MR ha approvato «Lista di 120 lead verificati»', richiesta: 'r3' },
        { ora: '10:10', tipo: 'strumento', testo: 'Ricerca web · fatturato stimato per 61 aziende', passo: 5, costo: 0.6 },
        { ora: '10:36', tipo: 'nota', testo: '19 aziende senza telefono pubblico: restano con la sola e-mail.', passo: 5 },
      ],
      output: [
        { nome: 'Lista di 120 lead verificati', tipo: 'lista', stato: 'approvata', quando: 'approvata alle 09:35', desc: 'Prima metà: azienda, sito, e-mail, telefono, fatturato', richiesta: 'r3' },
        { nome: 'Seconda metà: 80 lead', tipo: 'lista', stato: 'bozza', quando: 'passo 5 · in corso', desc: '61 su 80 arricchiti' },
      ],
      strumentiUso: [{ nome: 'Ricerca web', icona: 'i-search', chiamate: 92, costo: 4.6 }, { nome: 'CRM di Nova Studio', icona: 'i-list', chiamate: 6, costo: 0.4 }, { nome: 'Archivio del cliente', icona: 'i-doc', chiamate: 1, costo: 0.1 }],
    },
    3: { // Kim · Deploy in staging · fallito alle 08:55
      obiettivo: 'o2', serie: [],
      passi: [
        { n: 1, nome: 'Build della versione 2.4.1', stato: 'fatto', inizio: '08:41', fine: '08:49', durata: '8 min', costo: 1.5, modello: 'standard', strumenti: ['Repository'], esito: 'Build riuscita, 3 avvisi' },
        { n: 2, nome: 'Test automatici', stato: 'fatto', inizio: '08:49', fine: '08:53', durata: '4 min', costo: 2, modello: 'standard', strumenti: ['Ambiente di test'], esito: '41 test superati' },
        { n: 3, nome: 'Deploy in staging', stato: 'errore', inizio: '08:53', fine: '08:55', durata: '2 min', costo: 0.5, modello: 'rapido', strumenti: ['Deploy in produzione'], esito: 'Chiavi di accesso scadute: il server di staging rifiuta la connessione' },
        { n: 4, nome: 'Verifica dopo il deploy', stato: 'da fare', stima: '5 min', costo: 0.5, modello: 'rapido', strumenti: ['Ambiente di test'] },
      ],
      log: [
        { ora: '08:41', tipo: 'passo', testo: 'Passo 1 iniziato · Build della versione 2.4.1', passo: 1 },
        { ora: '08:49', tipo: 'passo', testo: 'Passo 1 concluso in 8 min · 1,5 €', passo: 1 },
        { ora: '08:53', tipo: 'passo', testo: 'Passo 2 concluso in 4 min · 2 € · 41 test superati', passo: 2 },
        { ora: '08:53', tipo: 'strumento', testo: 'Deploy in produzione · connessione al server di staging Zenith', passo: 3, costo: 0.1 },
        { ora: '08:55', tipo: 'errore', testo: 'Chiavi di accesso scadute il 31 ago: il server rifiuta la connessione', passo: 3 },
        { ora: '08:56', tipo: 'errore', testo: 'Riprovato una volta: stesso errore. Esecuzione ferma, serve un intervento', passo: 3 },
        { ora: '08:56', tipo: 'nota', testo: 'Per ripartire: rinnovare le chiavi della connessione «Server di staging Zenith» e riprovare il passo 3.', passo: 3 },
      ],
      output: [
        { nome: 'Build 2.4.1', tipo: 'codice', stato: 'fatto', quando: 'passo 1 · 08:49', desc: 'Pacchetto pronto per lo staging' },
        { nome: 'Report dei test', tipo: 'documento', stato: 'fatto', quando: 'passo 2 · 08:53', desc: '41 test superati, 0 falliti' },
        { nome: 'Staging aggiornato', tipo: 'codice', stato: 'errore', quando: 'passo 3 · 08:55', desc: 'Non fatto: chiavi scadute' },
      ],
      strumentiUso: [{ nome: 'Repository', icona: 'i-code', chiamate: 5, costo: 0.3 }, { nome: 'Ambiente di test', icona: 'i-check', chiamate: 1, costo: 0.4 }, { nome: 'Deploy in produzione', icona: 'i-send', chiamate: 2, costo: 0.1, errore: true }],
    },
    5: { // Social media manager · Piano editoriale ottobre · 09:06–09:48 · da approvare
      obiettivo: 'o5', serie: ['ap2', 'r7', 'r13'],
      passi: [
        { n: 1, nome: 'Analisi di settembre', stato: 'fatto', inizio: '09:06', fine: '09:14', durata: '8 min', costo: 0.5, modello: 'rapido', strumenti: ['Analisi del mese'], esito: 'Tre temi che hanno funzionato: dietro le quinte, casi cliente, consigli pratici' },
        { n: 2, nome: 'Temi del mese', stato: 'fatto', inizio: '09:14', fine: '09:24', durata: '10 min', costo: 2, modello: 'standard', strumenti: ['Archivio del cliente'], esito: 'Un tema per settimana, i vincoli del brief rispettati' },
        { n: 3, nome: 'Calendario', stato: 'fatto', inizio: '09:24', fine: '09:36', durata: '12 min', costo: 3, modello: 'standard', strumenti: ['Calendario editoriale'], esito: '12 post, 4 reel, 2 newsletter; evitati il 1° e il lancio del 14' },
        { n: 4, nome: 'Bozze dei titoli e consegna', stato: 'fatto', inizio: '09:36', fine: '09:48', durata: '12 min', costo: 3.5, modello: 'standard', strumenti: [], esito: 'Documento di 4 pagine consegnato al titolare' },
      ],
      log: [
        { ora: '09:06', tipo: 'passo', testo: 'Passo 1 iniziato · Analisi di settembre', passo: 1 },
        { ora: '09:14', tipo: 'passo', testo: 'Passo 1 concluso in 8 min · 0,5 €', passo: 1 },
        { ora: '09:20', tipo: 'strumento', testo: 'Archivio del cliente · brief di ottobre e vincoli: niente laboratorio, lancio del 14', passo: 2, costo: 0.1 },
        { ora: '09:24', tipo: 'passo', testo: 'Passo 2 concluso in 10 min · 2 €', passo: 2 },
        { ora: '09:36', tipo: 'passo', testo: 'Passo 3 concluso in 12 min · 3 €', passo: 3 },
        { ora: '09:48', tipo: 'passo', testo: 'Passo 4 concluso in 12 min · 3,5 €', passo: 4 },
        { ora: '09:48', tipo: 'richiesta', testo: 'Piano editoriale ottobre consegnato: aspetta l\'approvazione del titolare', richiesta: 'ap2' },
      ],
      output: [
        { nome: 'Piano editoriale ottobre', tipo: 'documento', stato: 'attesa', quando: 'consegnato 09:48', desc: '4 pagine: temi, calendario, bozze dei titoli', richiesta: 'ap2' },
      ],
      strumentiUso: [{ nome: 'Analisi del mese', icona: 'i-sort', chiamate: 3, costo: 0.3 }, { nome: 'Archivio del cliente', icona: 'i-doc', chiamate: 2, costo: 0.1 }, { nome: 'Calendario editoriale', icona: 'i-cal', chiamate: 4, costo: 0.2 }],
    },
    2: { // Tester QA · Test di regressione · pianificata alle 15:00
      obiettivo: 'o2', serie: [],
      passi: [
        { n: 1, nome: 'Preparazione dell\'ambiente', stato: 'da fare', stima: '5 min', costo: 0.3, modello: 'rapido', strumenti: ['Ambiente di test'] },
        { n: 2, nome: 'Esecuzione dei 214 test', stato: 'da fare', stima: '25 min', costo: 4, modello: 'standard', strumenti: ['Ambiente di test', 'Repository'] },
        { n: 3, nome: 'Report e richiesta al titolare', stato: 'da fare', stima: '5 min', costo: 0.5, modello: 'rapido', strumenti: [] },
      ],
      log: [
        { ora: 'ieri 18:20', tipo: 'titolare', testo: 'MR ha pianificato «Test di regressione» per le 15:00 di oggi' },
        { ora: '08:56', tipo: 'nota', testo: 'Il deploy in staging di Kim è in errore: se non si sblocca, i test partono sulla versione precedente.' },
      ],
      output: [
        { nome: 'Report dei test di regressione', tipo: 'documento', stato: 'da fare', quando: 'passo 3', desc: '214 test sull\'area riservata' },
      ],
      strumentiUso: [{ nome: 'Ambiente di test', icona: 'i-check', chiamate: 0, costo: 0 }, { nome: 'Repository', icona: 'i-code', chiamate: 0, costo: 0 }],
    },
  };
  const PASSI_DIP = {
    svi: ['Lettura della struttura approvata', 'Sviluppo', 'Test automatici', 'Nota di consegna e richiesta al titolare'],
    mkt: ['Brief e materiali approvati', 'Bozza', 'Revisione del tono', 'Consegna al titolare'],
    ven: ['Criteri dal brief', 'Ricerca', 'Verifica', 'Consegna al titolare'],
    amm: ['Raccolta dei documenti', 'Elaborazione', 'Controllo', 'Consegna'],
  };
  /* Esecuzione generata per chi non ne ha una scritta a mano: dai passi dell'attività (e.att.passo) o tre passi. */
  function esecuzioneGenerata(e) {
    let h = hashSeme(e.ruolo + '#' + e.att.titolo);
    const r = (a, b) => { h = (h * 1664525 + 1013904223) >>> 0; return a + (h % (b - a + 1)); };
    const a = e.att, tot = a.passo ? a.passo[1] : 3, cur = a.passo ? a.passo[0] : (e.stato === 'errore' ? 2 : tot);
    const nomi = PASSI_DIP[e.dip];
    const nome = i => i === 0 ? nomi[0] : i === tot - 1 ? nomi[3] : (i === tot - 2 && tot > 3 ? nomi[2] : nomi[1] + (tot > 4 ? ' · parte ' + i : ''));
    const min = t => { const m = /^(\d\d):(\d\d)$/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : 9 * 60; };
    const hm = t => (t / 60 | 0).toString().padStart(2, '0') + ':' + (t % 60).toString().padStart(2, '0');
    const inizio = min(a.da || a.quando || '09:00'), fine = a.fine ? min(a.fine) : 10 * 60 + 42;
    const fatti = e.stato === 'pianificato' ? 0 : e.stato === 'libero' || e.stato === 'attesa' ? tot : cur - 1;
    const dur = Math.max(2, Math.round((fine - inizio) / Math.max(1, fatti + 1)));
    const costoTot = a.costo || (a.fine ? r(4, 24) : 0);   // le esecuzioni concluse senza costo nel modello (ieri) prendono un costo dal seme
    const quote = Array.from({ length: tot }, (_, i) => i < fatti ? 1 : i === fatti ? 1.6 : 0);
    const somma = quote.reduce((t, q) => t + q, 0) || 1;
    const stimaPasso = Math.max(0.3, Math.round(10 * (costoTot || 6) / Math.max(1, fatti + 1)) / 10);   // i passi da fare: una stima dal costo medio dei passi fatti
    const passi = Array.from({ length: tot }, (_, i) => {
      const stato = i < fatti ? 'fatto' : (i === fatti && e.stato === 'lavoro') ? 'corso' : (i === fatti && e.stato === 'errore') ? 'errore' : 'da fare';
      const p = { n: i + 1, nome: nome(i), stato, costo: stato === 'da fare' ? stimaPasso : Math.round(10 * costoTot * quote[i] / somma) / 10, modello: i === 0 || i === tot - 1 ? 'rapido' : 'standard', strumenti: STRUMENTI_DIP[e.dip].slice(0, 1 + (i % 2)).map(s => s[0]) };
      if (stato === 'fatto' || stato === 'errore') { p.inizio = hm(inizio + dur * i); p.fine = hm(inizio + dur * (i + 1)); p.durata = dur + ' min'; p.esito = stato === 'errore' ? a.errore : 'Concluso senza note'; }
      else if (stato === 'corso') { p.inizio = hm(inizio + dur * i); p.esito = 'In corso da ' + p.inizio; }
      else p.stima = r(3, 20) + ' min';
      return p;
    });
    const log = [];
    passi.forEach(p => { if (p.inizio) log.push({ ora: p.inizio, tipo: 'passo', testo: `Passo ${p.n} iniziato · ${p.nome}`, passo: p.n }); if (p.fine && p.stato === 'fatto') log.push({ ora: p.fine, tipo: 'passo', testo: `Passo ${p.n} concluso in ${p.durata} · ${String(p.costo).replace('.', ',')} €`, passo: p.n }); if (p.stato === 'errore') log.push({ ora: p.fine, tipo: 'errore', testo: a.errore + ': esecuzione ferma, serve un intervento', passo: p.n }); });
    if (e.stato === 'pianificato') log.push({ ora: 'ieri', tipo: 'titolare', testo: `MR ha pianificato «${a.titolo}» per le ${a.quando} di oggi` });
    if (e.stato === 'attesa') log.push({ ora: a.fine, tipo: 'richiesta', testo: `«${a.titolo}» consegnato: aspetta l'approvazione del titolare` });
    const out = { nome: a.titolo, tipo: e.dip === 'svi' ? 'codice' : e.dip === 'ven' ? 'lista' : 'documento', stato: e.stato === 'attesa' ? 'attesa' : e.stato === 'libero' ? 'fatto' : e.stato === 'errore' ? 'errore' : e.stato === 'pianificato' ? 'da fare' : 'bozza', quando: e.stato === 'lavoro' ? `passo ${cur} · in corso` : e.stato === 'attesa' ? 'consegnato alle ' + a.fine : e.stato === 'pianificato' ? 'parte alle ' + a.quando : e.stato === 'errore' ? 'fermo al passo ' + cur : 'concluso ' + (a.fine || ''), desc: e.dip === 'svi' ? 'Codice e test' : 'Consegna per ' + (a.cliente || 'Nova Studio') };
    const strumentiUso = STRUMENTI_DIP[e.dip].slice(0, 3).map((s, i) => ({ nome: s[0], icona: s[2], chiamate: fatti ? r(1, 12) : 0, costo: fatti ? r(1, 9) / 10 : 0 }));
    return { obiettivo: null, serie: [], passi, log, output: [out], strumentiUso };
  }

  /* ---- I fili della chat (versione 15, 2026-09-06): un filo per dipendente, le note del titolare e le risposte del
     dipendente. Un messaggio è { da: 'io' | 'dip' | 'sistema', ora, testo }, con `richiesta` (id) quando porta una consegna
     che aspetta il titolare e `passo` quando la nota è consegnata a un passo dell'esecuzione. Scritti a mano a 11 per Nora,
     Kim, il Social media manager e Ricerca lead; generati per gli altri dallo stato e dall'esecuzione corrente, come i
     dossier. La barra di scrittura dell'Esecuzione e quella della chat scrivono nello stesso filo (`scrivi`). ---- */
  const FILI11 = {
    4: [
      { da: 'dip', ora: '09:15', testo: 'Buongiorno. Oggi ho in programma i post 4 e 5 di 12 per Rossi Srl: parto dal brief e dagli ultimi tre approvati.' },
      { da: 'io', ora: '09:18', testo: 'Va bene. Sul post 4 tieni la lunghezza sotto le 800 battute.' },
      { da: 'dip', ora: '09:20', testo: 'Annotato: è il vincolo del brief, l\'avevo perso nel post 2. Lo tengo per tutta la serie.' },
      { da: 'sistema', ora: '10:12', testo: 'ha consegnato il post 4 di 12 e chiede l\'approvazione', richiesta: 'ap1' },
      { da: 'dip', ora: '10:13', testo: '780 battute, una sola idea, chiude con una domanda. L\'immagine proposta è quella approvata la settimana scorsa.' },
      { da: 'io', ora: '10:20', testo: 'Intanto vai avanti con il 5.' },
      { da: 'dip', ora: '10:24', testo: 'Sono al passo 2 di 4: prima stesura a 640 battute, sto rileggendo. Consegno verso le 10:50.', passo: 2 },
    ],
    3: [
      { da: 'dip', ora: '08:55', testo: 'Ho iniziato il deploy in staging per Zenith.' },
      { da: 'dip', ora: '09:02', testo: 'Fermo al passo 2: le chiavi di accesso sono scadute. Non riprovo da solo, lascerei l\'ambiente a metà.' },
      { da: 'io', ora: '09:05', testo: 'Chi le rinnova?' },
      { da: 'dip', ora: '09:06', testo: 'Si rinnovano dalla mia pagina, in «Strumenti e connessioni». Poi riprovo il passo: un minuto e 0,4 €.' },
    ],
    5: [
      { da: 'dip', ora: '09:06', testo: 'Comincio il piano editoriale di ottobre per Madira Ink: dodici post, quattro reel, due newsletter.' },
      { da: 'io', ora: '09:10', testo: 'Evita le festività e la settimana del lancio del 14.' },
      { da: 'dip', ora: '09:11', testo: 'D\'accordo: sposto i due post di quella settimana e tengo libero il 14.' },
      { da: 'sistema', ora: '09:48', testo: 'ha consegnato il piano editoriale di ottobre e chiede l\'approvazione', richiesta: 'ap2' },
      { da: 'dip', ora: '10:35', testo: 'Sul reel di lunedì scorso sono stato respinto due volte: il sistema ha aperto una revisione del mio modello.', richiesta: 'rv2' },
    ],
    7: [
      { da: 'dip', ora: '08:30', testo: 'Parto dai criteri del brief: e-commerce in Lombardia, fatturato sopra il milione, sito attivo.' },
      { da: 'io', ora: '09:40', testo: 'Siamo già a 61 € su questa lista. Quanto manca?' },
      { da: 'dip', ora: '09:41', testo: 'Passo 5 di 6, verifica delle e-mail: restano una quarantina di righe, circa mezz\'ora.', passo: 5 },
      { da: 'io', ora: '09:42', testo: 'Vai, ma niente strumenti a pagamento oltre il limite del giorno.' },
      { da: 'dip', ora: '09:43', testo: 'Resto su quelli già attivi.' },
    ],
  };
  /* Filo generato per chi non ne ha uno scritto a mano: due o tre messaggi dallo stato dell'attività corrente. Le ore sono
     quelle dell'esecuzione (il passo in corso, non «adesso»), così l'ordine della chat è quello vero. */
  function filoGenerato(e, x) {
    const a = e.att || {}, cli = a.cliente || azienda.nome, msg = [];
    const cur = x ? x.passi.find(p => p.stato === 'corso' || p.stato === 'errore') : null;
    const agg = (da, ora, testo, extra) => { if (ora) msg.push(Object.assign({ da, ora, testo }, extra || {})); };
    if (e.stato === 'lavoro') {
      agg('dip', a.da, `Ho iniziato «${a.titolo}» per ${cli}.`);
      if (a.passo) agg('dip', (cur && cur.inizio) || azienda.ora, `Sono al passo ${a.passo[0]} di ${a.passo[1]}${a.prossimo ? `: il prossimo è «${a.prossimo}»` : ''}. Finora ${String(a.costo || 0).replace('.', ',')} €.`, { passo: a.passo[0] });
    } else if (e.stato === 'attesa') {
      agg('dip', a.da, `Ho iniziato «${a.titolo}» per ${cli}.`);
      agg('dip', a.fine, `Consegnato: aspetto la tua approvazione prima che esca verso ${cli}.`);
    } else if (e.stato === 'errore') {
      agg('dip', (x && x.passi[0] && x.passi[0].inizio) || a.da, `Ho iniziato «${a.titolo}» per ${cli}.`);
      agg('dip', (cur && cur.fine) || a.da, `Sono fermo: ${(a.errore || 'errore').toLowerCase()}. Serve un intervento prima di riprovare.`);
    } else if (e.stato === 'pianificato') {
      agg('dip', '08:00', `«${a.titolo}» è pianificato per le ${a.quando}${cli ? ', per ' + cli : ''}. Ti avviso quando parte.`);
    } else if (a.fine) {
      agg('dip', /^\d\d:\d\d$/.test(a.fine) ? a.fine : '08:00', `Ho concluso «${a.titolo}»${cli ? ' per ' + cli : ''} ${/ieri/i.test(a.fine) ? a.fine : 'alle ' + a.fine}. Sono libero.`);
    } else {
      agg('dip', '08:00', 'Nessuna esecuzione: aspetto un incarico.');
    }
    return msg;
  }

  /* ---- Generatore a 40 dipendenti: 10 per dipartimento, 12 al lavoro ---- */
  const NOMI = ['Leo','Ada','Kim','Nora','Ivo','Mia','Sam','Zoe','Ugo','Rea','Teo','Bea','Dan','Eva','Gil','Ines','Jan','Lia','Max','Nil',
    'Ora','Pia','Rio','Sia','Tom','Uma','Vic','Wes','Yan','Zed','Aldo','Bice','Caio','Dora','Elia','Fede','Gaia','Hugo','Iris','Jole'];
  const RUOLI = {
    svi: ['Sviluppatore full-stack','Tester QA','DevOps','Sviluppatrice front-end','Sviluppatore back-end','Integrazioni API','Automazioni','Sviluppatore mobile','Revisione codice','Documentazione tecnica'],
    mkt: ['Copywriter','Social media manager','Specialista SEO','Email marketing','Grafica social','Video brevi','Newsletter','Analisi campagne','Community','Landing page'],
    ven: ['Ricerca lead','Proposte commerciali','Follow-up clienti','Qualificazione lead','Preventivi','Demo prodotto','Rinnovi','Partner','Upselling','CRM'],
    amm: ['Fatturazione','Report al titolare','Scadenze','Pagamenti fornitori','Contratti','Rendiconto costi','Onboarding clienti','Assistenza','Archivio','Assicurazioni'],
  };
  const CLIENTI = ['Bianchi & Co.','Rossi Srl','Zenith','Madira Ink','Metamorfosi','Summit Marketing','Nova Studio','Binary Bytes','Lumen Caffè','Orto Verde'];
  const TITOLI = {
    svi: ['Checkout e-commerce','Area riservata','Migrazione catalogo','Automazione ordini','Test di regressione','Deploy in produzione','Integrazione pagamenti','App prenotazioni','Refactor listino','Guida di installazione'],
    mkt: ['Post LinkedIn 5 di 12','Piano editoriale ottobre','Audit SEO','Sequenza email di benvenuto','Caroselli Instagram','Reel prodotto','Newsletter di settembre','Report campagne','Risposte community','Landing page evento'],
    ven: ['200 lead e-commerce in Lombardia','Proposta 20.000 €','Follow-up settimanale','Qualificazione 40 lead','Preventivo sito vetrina','Demo e-commerce','Rinnovi di ottobre','Lista partner','Offerta manutenzione','Pulizia CRM'],
    amm: ['Fatture di agosto','Report giornaliero','Scadenze fiscali','Pagamenti di settembre','Contratto Zenith','Rendiconto costi agenti','Onboarding Lumen Caffè','Ticket clienti','Archivio contratti','Polizza RC'],
  };
  const PASSI = [[3,7],[2,4],[5,6],[1,5],[4,9],[6,8],[2,3],[7,10],[3,5],[1,3],[4,6],[2,6]];

  function modello40() {
    const dipendenti = [];
    let id = 1, k = 0;
    // 12 al lavoro (3 per dipartimento), 2 in attesa, 1 errore, 6 pianificati, 19 liberi.
    const statiPerDip = ['lavoro','lavoro','lavoro','attesa','pianificato','pianificato','libero','libero','libero','libero'];
    dipartimenti.forEach((d, di) => {
      for (let i = 0; i < 10; i++) {
        const stato = (di === 0 && i === 9) ? 'errore' : (di === 2 && i === 9) ? 'attesa' : statiPerDip[i];
        const nome = (di * 10 + i) % 7 === 3 ? NOMI[(di * 10 + i) % NOMI.length] : undefined;   // un nome ogni sette: gli altri sono senza
        const att = { titolo: TITOLI[d.id][i], cliente: CLIENTI[(di * 3 + i) % CLIENTI.length], costo: 0 };
        if (stato === 'lavoro') { att.da = ['08:30','09:40','10:20','09:05','09:52','10:35'][(di + i) % 6]; att.passo = PASSI[k++ % PASSI.length]; att.costo = 8 + ((di * 7 + i * 13) % 60); att.prossimo = 'Prossimo passo'; }
        else if (stato === 'attesa') { att.da = '09:06'; att.fine = ['09:48','10:05','10:30'][(di + i) % 3]; att.costo = 5 + ((di + i) % 9); }
        else if (stato === 'pianificato') { att.quando = ['15:00','17:00','18:00','16:30'][(di + i) % 4]; }
        else if (stato === 'errore') { att.da = '08:55'; att.errore = 'Chiavi di accesso scadute'; att.costo = 4; }
        else { att.fine = 'ieri'; }
        const e = { id: id++, ruolo: RUOLI[d.id][i], dip: d.id, stato, att }; if (nome) e.nome = nome;
        dipendenti.push(e);
      }
    });
    const attesa = dipendenti.filter(e => e.stato === 'attesa');
    const approvazioni = attesa.map((e, i) => ({ id: 'ap' + (i + 1), chi: e.id, cosa: e.att.titolo, cliente: e.att.cliente, ora: e.att.fine, tipo: 'documento' }));
    // Anche due al lavoro hanno un pezzo in attesa (come Nora a 11).
    const lav = dipendenti.filter(e => e.stato === 'lavoro');
    approvazioni.unshift({ id: 'apx1', chi: lav[0].id, cosa: 'Consegna parziale 1', cliente: lav[0].att.cliente, ora: '10:12', tipo: 'post' });
    approvazioni.push({ id: 'apx2', chi: lav[4].id, cosa: 'Consegna parziale 2', cliente: lav[4].att.cliente, ora: '09:31', tipo: 'documento' });
    const NOTE = ['Consegna secondo il brief.', 'Prima versione completa, pronta per la revisione.', 'Rispetta i vincoli di lunghezza e tono.'];
    const TIPI = ['post', 'documento', 'lista', 'proposta'];
    const ALLEGATO = (tipo, i) => tipo === 'post' ? 'Immagine 1200×1200' : tipo === 'lista' ? 'Foglio: ' + (40 + i * 20) + ' righe' : 'Documento: ' + (2 + i) + ' pagine';
    const richieste = approvazioni.map((a, i) => ({ ...a, stato: 'attesa', costo: 3 + (i % 7), passi: ['Brief', 'Bozza', 'Revisione'], nota: NOTE[i % 3], testo: 'Contenuto della consegna «' + a.cosa + '» per ' + a.cliente + '.', allegato: ALLEGATO(TIPI[i % 4], i), tipo: TIPI[i % 4] }));
    richieste.forEach((r, i) => { r.giorno = 0; r.min = 9 * 60 + i * 11; });
    const GG = [0, 0, 1, 1, 2, 3, 3, 6, 7, 9, 12, 20, 26, 34];
    const ETI = ['', 'ieri', 'mar 2 set', 'lun 1 set', 'dom 31 ago', 'sab 30 ago', '29 ago', '28 ago', '26 ago', '23 ago', '15 ago', '9 ago', '1 ago'];
    dipendenti.filter(e => e.stato === 'libero').forEach((e, i) => {
      for (let k = 0; k < 2; k++) {
        const j = (i * 2 + k) % GG.length, g = GG[j];
        const st = (i + k) % 5 === 3 ? 'modifiche' : (i + k) % 7 === 5 ? 'rifiutata' : 'approvata';
        const hh = 8 + ((i * 3 + k * 5) % 10), mm = (i * 17 + k * 23) % 60;
        const hm = (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
        const eti = g === 0 ? hm : g === 1 ? 'ieri ' + hm : (ETI[Math.min(ETI.length - 1, j)] || 'ago');
        richieste.push({ id: 'st' + i + k, chi: e.id, cosa: k ? e.att.titolo + ' (v' + (i % 3 + 1) + ')' : e.att.titolo, cliente: CLIENTI[(i + k * 3) % CLIENTI.length], ora: eti, giorno: g, min: hh * 60 + mm, tipo: TIPI[(i + k) % 4], stato: st, decisa: eti, regola: (i + k) % 6 === 0 ? 'Report interni' : '', costo: 2 + ((i + k) % 9), passi: ['Brief', 'Bozza', 'Revisione'], nota: NOTE[(i + k) % 3], testo: 'Contenuto della consegna «' + e.att.titolo + '».', allegato: ALLEGATO(TIPI[(i + k) % 4], 1), commento: st === 'modifiche' ? 'Aggiungi le priorità.' : st === 'rifiutata' ? 'Fuori brief, ripartire.' : '' });
      }
    });
    const diario = [];
    lav.slice(0, 6).forEach((e, i) => diario.push({ ora: e.att.da, chi: e.id, testo: 'ha iniziato «' + e.att.titolo + '»', tipo: 'inizio' }));
    attesa.slice(0, 3).forEach(e => diario.push({ ora: e.att.fine, chi: e.id, testo: 'ha consegnato «' + e.att.titolo + '» e chiede approvazione', tipo: 'approvazione' }));
    diario.push({ ora: '08:55', chi: 10, testo: 'deploy fallito: chiavi di accesso scadute', tipo: 'errore' });
    diario.sort((a, b) => a.ora.localeCompare(b.ora));
    const agenda = [
      { ora: '09:06', fine: '09:48', chi: attesa.slice(0, 2).map(e => e.id), durata: '42 min', stato: 'fatto' },
      { ora: '09:34', fine: '10:12', chi: [lav[0].id, lav[1].id], durata: '38 min', stato: 'fatto' },
      { ora: 'adesso', chi: lav.map(e => e.id), stato: 'in corso' },
      { ora: '15:00', chi: dipendenti.filter(e => e.stato === 'pianificato' && e.att.quando === '15:00').map(e => e.id), stato: 'pianificato' },
      { ora: '17:00', chi: dipendenti.filter(e => e.stato === 'pianificato' && e.att.quando === '17:00').map(e => e.id), stato: 'pianificato' },
      { ora: '18:00', chi: dipendenti.filter(e => e.stato === 'pianificato' && e.att.quando === '18:00').map(e => e.id), stato: 'pianificato' },
    ];
    const obiettivi = [];
    dipartimenti.forEach((d, di) => {
      const lst = dipendenti.filter(e => e.dip === d.id);
      [0, 1, 2].forEach(k => {
        const e = lst[k * 3], av = [15, 45, 80][(di + k) % 3], tot = 4 + ((di + k) % 5);
        obiettivi.push({ id: 'o' + d.id + k, dip: d.id, titolo: TITOLI[d.id][k * 3], cliente: e.att.cliente, scadenza: ['15 set', '30 set', '15 ott'][k], avanz: av, consegne: [Math.round(tot * av / 100), tot], chi: lst.slice(k * 3, k * 3 + 3).map(x => x.id), stato: av >= 100 ? 'concluso' : (di + k) % 4 === 1 ? 'ritardo' : av < 20 ? 'nuovo' : 'corso', prossima: 'Prossima consegna · ' + ['8 set', '10 set', '12 set'][k] });
      });
    });
    return { dipendenti, approvazioni, richieste, diario, agenda, obiettivi };
  }

  function modello(n) {
    const m = n >= 40 ? modello40() : { dipendenti: base, approvazioni: approvazioni11, richieste: richieste11, diario: diario11, agenda: agenda11, obiettivi: obiettivi11 };
    let byId = Object.fromEntries(m.dipendenti.map(e => [e.id, e]));
    const conta = s => m.dipendenti.filter(e => e.stato === s).length;
    const costoOggi = m.dipendenti.reduce((t, e) => t + (e.att.costo || 0), 0);
    const dipDi = e => dipartimenti.find(d => d.id === e.dip);
    /* Etichetta principale e riga sotto: senza nome il ruolo e il dipartimento,
       con il nome la forma piena (nome, poi «ruolo · dipartimento»). */
    const etichetta = e => e.nome || e.ruolo;
    const sotto = (e, breve) => { const d = dipDi(e); const nd = d ? (breve ? d.breve : d.nome) : ''; return e.nome ? e.ruolo + (nd ? ' · ' + nd : '') : nd; };
    const semeDi = e => e.seme || e.ruolo;
    /* La tinta dell'avatar (versione 10, 2026-09-05): una delle otto del sistema, scelta dal titolare nell'editor o assegnata
       da DGT alla creazione come la meno usata in azienda; per i dipendenti del modello, a rotazione sull'id. */
    const tintaDi = e => e.tinta || TINTE_ID[(e.id - 1 + TINTE_ID.length * 1000) % TINTE_ID.length];
    const tintaLibera = () => { const uso = Object.fromEntries(TINTE_ID.map(t => [t, 0])); m.dipendenti.forEach(e => { uso[tintaDi(e)]++; }); return TINTE_ID.reduce((a, t) => uso[t] < uso[a] ? t : a, TINTE_ID[0]); };
    const iniziali = e => etichetta(e).slice(0, 2).toUpperCase();
    /* ---- I costi dell'azienda (versione 13, 2026-09-06): un solo aggregatore per la pagina Costi e per la sezione «Spesa del
       mese» del Dipartimento, così le due leggono gli stessi numeri. Tre periodi: `oggi` = le esecuzioni di oggi (e.att.costo:
       lo stesso numero di «spesi oggi» nella home); `mese` = i 30 giorni del dossier (metriche.ora.spesa, confrontati con i 30
       precedenti; budget.speso è lo stesso numero); `anno` = dalla creazione del dipendente (giugno): i 30 giorni, i 30 precedenti
       e le versioni del prompt più vecchie (task × costo per esito). Le consegne: oggi le richieste approvate oggi; nei 30 giorni
       le consegne accettate del dossier (approvate al primo colpo più quelle corrette); dalla creazione anche le versioni vecchie
       (task meno le respinte). Per cliente, la spesa e le consegne di ogni dipendente si ripartiscono fra i suoi clienti in
       proporzione alle richieste del periodo (oggi: il cliente dell'esecuzione in corso): così per dipartimento, per dipendente
       e per cliente si somma allo stesso totale. Per modello: oggi i passi delle esecuzioni (fatti, in corso, in errore), nei 30
       giorni l'uso del dossier; niente da inizio anno. Per strumento: solo oggi, dalle esecuzioni, sommato per nome. ---- */
    const oggiConta = e => (e.att.costo || 0) > 0;
    const versioniVecchie = d => d.prompt.versioni.filter(v => !v.proposta).slice(2);
    const blocchiDi = e => { const d = out.dossierDi(e); return { ora: d.metriche.ora.spesa, prima: d.metriche.prima.spesa, prima2: versioniVecchie(d).reduce((t, v) => t + (v.numeri ? Math.round(v.numeri.task * v.numeri.costo) : 0), 0) }; };
    const spesaDi = (e, periodo) => { if (periodo === 'oggi') return e.att.costo || 0; const b = blocchiDi(e); return periodo === 'anno' ? b.ora + b.prima + b.prima2 : b.ora; };
    const inPeriodo = (r, periodo) => periodo === 'oggi' ? r.giorno === 0 : periodo === 'mese' ? r.giorno <= 31 : true;
    const consegneDi = (e, periodo, approvate) => { if (periodo === 'oggi') return approvate.filter(r => r.chi === e.id).length; const d = out.dossierDi(e), o = d.metriche.ora, p = d.metriche.prima; const mese = o.approvate + o.modifiche; return periodo === 'mese' ? mese : mese + p.approvate + p.modifiche + versioniVecchie(d).reduce((t, v) => t + (v.numeri ? Math.round(v.numeri.task * (1 - v.numeri.respinte / 100)) : 0), 0); };
    const ordDal = s => { const [g, me] = String(s || '').split(' '); return ({ gen: 1, feb: 2, mar: 3, apr: 4, mag: 5, giu: 6, lug: 7, ago: 8, set: 9, ott: 10, nov: 11, dic: 12 }[me] || 0) * 100 + (+g || 0); };
    /* arrotonda il campo `k` a interi che sommano a `tot`: i resti vanno ai decimali più grandi */
    const interi = (lista, k, tot) => { const base = lista.map(x => Math.floor(x[k])); let resto = Math.round(tot) - base.reduce((a, b) => a + b, 0); lista.map((x, i) => [x[k] - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (resto > 0) { base[i]++; resto--; } }); lista.forEach((x, i) => { x[k] = base[i]; }); };
    const dec = v => Math.round(v * 10) / 10;
    const M_ID = Object.keys(MODELLI);
    const usoVuoto = () => Object.fromEntries(M_ID.map(k => [k, { n: 0, costo: 0 }]));
    const listaModelli = u => M_ID.map(k => ({ id: k, nome: MODELLI[k].nome, icona: MODELLI[k].icona, listino: MODELLI[k].costo, n: u[k].n, costo: dec(u[k].costo) }));
    function costi(periodo, dip) {
      periodo = periodo || 'mese';
      const lst = dip ? m.dipendenti.filter(e => e.dip === dip) : m.dipendenti;
      const ids = new Set(lst.map(e => e.id));
      const richieste = m.richieste.filter(r => ids.has(r.chi) && inPeriodo(r, periodo));
      const approvate = richieste.filter(r => r.stato === 'approvata');
      const modelliDi = e => { const u = usoVuoto(); if (periodo === 'oggi') { if (oggiConta(e)) out.esecuzioneDi(e).passi.forEach(p => { if (p.stato !== 'da fare' && u[p.modello]) { u[p.modello].n++; u[p.modello].costo += p.costo; } }); } else if (periodo === 'mese') { const uso = out.dossierDi(e).modello.uso; M_ID.forEach(k => { if (uso[k]) { u[k].n += uso[k].esecuzioni; u[k].costo += uso[k].costo; } }); } return u; };
      const somma = (a, b) => { M_ID.forEach(k => { a[k].n += b[k].n; a[k].costo += b[k].costo; }); return a; };
      const sommaDi = (lista, f) => lista.reduce((t, x) => t + f(x), 0);
      const perDipendente = lst.map(e => { const d = out.dossierDi(e), b = blocchiDi(e); return { e, d, spesa: spesaDi(e, periodo), prima: periodo === 'mese' ? b.prima : null, blocchi: b, esito: d.metriche.ora.costo, budget: d.budget, oggi: e.att.costo || 0, consegne: consegneDi(e, periodo, approvate), modelli: modelliDi(e) }; }).sort((a, b) => (b.spesa - a.spesa) || (a.e.id - b.e.id));
      const tot = sommaDi(perDipendente, x => x.spesa), totConsegne = sommaDi(perDipendente, x => x.consegne);
      const perDipartimento = dipartimenti.filter(d => !dip || d.id === dip).map(d => { const mie = perDipendente.filter(x => x.e.dip === d.id); return { d, n: mie.length, lav: mie.filter(x => x.e.stato === 'lavoro').length, spesa: sommaDi(mie, x => x.spesa), prima: periodo === 'mese' ? sommaDi(mie, x => x.prima) : null, blocchi: { ora: sommaDi(mie, x => x.blocchi.ora), prima: sommaDi(mie, x => x.blocchi.prima), prima2: sommaDi(mie, x => x.blocchi.prima2) }, budgetMese: sommaDi(mie, x => x.budget.mese), budgetSpeso: sommaDi(mie, x => x.budget.speso), budgetGiorno: sommaDi(mie, x => x.budget.giorno), oggi: sommaDi(mie, x => x.oggi), consegne: sommaDi(mie, x => x.consegne), modelli: listaModelli(mie.reduce((u, x) => somma(u, x.modelli), usoVuoto())), dal: mie.map(x => x.d.dal).sort((a, b) => ordDal(a) - ordDal(b))[0] || '' }; });
      /* per cliente: spesa e consegne del dipendente ripartite fra i clienti delle sue richieste del periodo; oggi il cliente dell'esecuzione */
      const clienti = {};
      const cliente = c => (clienti[c] = clienti[c] || { cliente: c, spesa: 0, consegne: 0, oggi: 0, chi: [] });
      perDipendente.forEach(x => {
        const e = x.e, pesi = {};
        if (periodo === 'oggi') { if (e.att.cliente) pesi[e.att.cliente] = 1; }
        else { richieste.filter(r => r.chi === e.id).forEach(r => { pesi[r.cliente] = (pesi[r.cliente] || 0) + r.costo; }); if (oggiConta(e) && e.att.cliente) pesi[e.att.cliente] = (pesi[e.att.cliente] || 0) + e.att.costo; }
        let peso = Object.values(pesi).reduce((t, v) => t + v, 0);
        if (!peso) { pesi[e.att.cliente || azienda.nome] = 1; peso = 1; }
        Object.keys(pesi).forEach(c => { const q = cliente(c); q.spesa += x.spesa * pesi[c] / peso; if (periodo !== 'oggi') q.consegne += x.consegne * pesi[c] / peso; if (x.spesa && !q.chi.includes(e.id)) q.chi.push(e.id); });
        if (x.oggi && e.att.cliente) cliente(e.att.cliente).oggi += x.oggi;
      });
      if (periodo === 'oggi') approvate.forEach(r => { cliente(r.cliente).consegne++; });
      const perCliente = Object.values(clienti).filter(c => c.spesa >= 0.5 || c.consegne >= 0.5).sort((a, b) => (b.spesa - a.spesa) || a.cliente.localeCompare(b.cliente));
      interi(perCliente, 'spesa', tot); if (periodo !== 'oggi') interi(perCliente, 'consegne', totConsegne);
      const perModello = periodo === 'anno' ? null : listaModelli(perDipendente.reduce((u, x) => somma(u, x.modelli), usoVuoto()));
      /* per strumento: le esecuzioni di oggi, sommate per nome; `usi` dice chi lo ha usato, dal più caro */
      const strumenti = {};
      lst.filter(oggiConta).forEach(e => out.esecuzioneDi(e).strumentiUso.forEach(s => { if (!s.chiamate) return; const q = strumenti[s.nome] = strumenti[s.nome] || { nome: s.nome, icona: s.icona, chiamate: 0, costo: 0, usi: [], errore: false }; q.chiamate += s.chiamate; q.costo += s.costo; q.usi.push({ id: e.id, costo: s.costo, chiamate: s.chiamate }); if (s.errore) q.errore = true; }));
      const perStrumento = Object.values(strumenti).map(s => { s.usi.sort((a, b) => (b.costo - a.costo) || (b.chiamate - a.chiamate)); s.chi = s.usi.map(u => u.id); s.costo = dec(s.costo); return s; }).sort((a, b) => (b.costo - a.costo) || (b.chiamate - a.chiamate));
      return { periodo, totale: dec(tot), prima: periodo === 'mese' ? sommaDi(perDipendente, x => x.prima) : null,
        blocchi: { ora: sommaDi(perDipendente, x => x.blocchi.ora), prima: sommaDi(perDipendente, x => x.blocchi.prima), prima2: sommaDi(perDipendente, x => x.blocchi.prima2) },
        budgetMese: sommaDi(perDipendente, x => x.budget.mese), budgetSpeso: sommaDi(perDipendente, x => x.budget.speso), budgetGiorno: sommaDi(perDipendente, x => x.budget.giorno),
        oggi: sommaDi(perDipendente, x => x.oggi), consegne: totConsegne, esecuzioni: perModello ? perModello.reduce((t, x) => t + x.n, 0) : 0,
        chiamate: perStrumento.reduce((t, s) => t + s.chiamate, 0), costoStrumenti: dec(perStrumento.reduce((t, s) => t + s.costo, 0)),
        dal: perDipartimento.map(x => x.dal).filter(Boolean).sort((a, b) => ordDal(a) - ordDal(b))[0] || '',
        perDipendente, perDipartimento, perCliente, perModello, perStrumento };
    }
    /* ---- L'agenda dell'azienda (versione 15, 2026-09-06): un solo aggregatore per la pagina Agenda della Console e per la
       tab Agenda del telefono. `giornata()` costruisce gli eventi di oggi dall'attività corrente di ogni dipendente: le ore,
       i titoli e i costi sono quelli di `e.att` (nessun numero nuovo), le durate mancanti vengono dai passi dell'esecuzione
       (`esecuzioneDi`, lo stesso calcolo della pagina Esecuzione). `settimana()` sono i sette giorni da oggi: i pianificati
       che si ripetono (obiettivi con scadenza «ogni …»), le prossime consegne degli obiettivi e le scadenze che cadono in
       quel giorno. Le date si leggono da `azienda.data` e `azienda.dataLunga`. ---- */
    const MESI = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
    const GIORNI = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    const orario = t => { const k = /(\d\d):(\d\d)/.exec(t || ''); return k ? (+k[1]) * 60 + (+k[2]) : null; };
    const hhmm = t => String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
    const minutiDi = s => { const k = /(\d+)\s*min/.exec(s || ''); return k ? +k[1] : 0; };
    function giornata() {
      const adesso = orario(azienda.ora), ev = [];
      m.dipendenti.forEach(e => {
        const a = e.att || {};
        const base = { chi: e.id, titolo: a.titolo || '', cliente: a.cliente || '', costo: a.costo || 0, dip: e.dip };
        const metti = x => ev.push(Object.assign({}, base, x));
        if (e.stato === 'lavoro') { const d = orario(a.da); if (d !== null) metti({ stato: 'corso', da: a.da, a: azienda.ora, min: d, fine: Math.max(d + 10, adesso), passo: a.passo || null }); }
        else if (e.stato === 'attesa') { const d = orario(a.da), f = orario(a.fine); if (d !== null) metti({ stato: 'attesa', da: a.da, a: a.fine || '', min: d, fine: Math.max(d + 10, f === null ? d + 30 : f) }); }
        /* l'errore: il blocco va dal primo passo al passo fallito (`e.att.da` è l'ora del guasto, non dell'avvio) */
        else if (e.stato === 'errore') { const x = out.esecuzioneDi(e), p0 = x.passi.find(p => p.inizio), pu = x.passi.filter(p => p.fine).pop(); const d = orario(p0 ? p0.inizio : a.da), f = orario(pu ? pu.fine : a.da); if (d !== null) metti({ stato: 'errore', da: hhmm(d), a: hhmm(f === null ? d + 20 : f), min: d, fine: Math.max(d + 10, f === null ? d + 20 : f), errore: a.errore || '', guasto: a.da }); }
        else if (e.stato === 'pianificato') { const d = orario(a.quando); if (d !== null) { const st = out.esecuzioneDi(e).passi.reduce((t, p) => t + minutiDi(p.stima), 0) || 30; metti({ stato: 'pianificato', da: a.quando, a: hhmm(d + st), min: d, fine: d + st, stima: st }); } }
        else if (a.fine && !/ieri/i.test(a.fine)) { const f = orario(a.fine), d = orario(a.da); if (f !== null) metti({ stato: 'fatto', da: d === null ? hhmm(Math.max(0, f - 30)) : a.da, a: a.fine, min: d === null ? Math.max(0, f - 30) : d, fine: f }); }
      });
      return ev.sort((p, q) => (p.min - q.min) || (p.chi - q.chi));
    }
    /* La settimana: sette giorni da oggi. Ogni giorno porta i pianificati che si ripetono, le prossime consegne degli
       obiettivi e le scadenze; oggi porta anche gli eventi della giornata. */
    /* Il giorno di oggi: il numero e il mese da `azienda.data`, il nome del giorno da `azienda.dataLunga`. Il calendario del
       modello è quello del prodotto, non quello vero: il nome del giorno si conta da lì (giovedì 4, venerdì 5, …), la data
       si conta con Date solo per il cambio di mese. */
    const oggiData = new Date(+((/(\d{4})/.exec(azienda.dataLunga || '') || [])[1]) || 2026, Math.max(0, MESI.findIndex(x => azienda.data.indexOf(x) >= 0)), parseInt(azienda.data, 10) || 1);
    const oggiGiorno = (() => { const gi = GIORNI.findIndex(x => (azienda.dataLunga || '').indexOf(x) === 0); return gi >= 0 ? gi : oggiData.getDay(); })();
    const dataBreve = d => d.getDate() + ' ' + MESI[d.getMonth()].slice(0, 3);
    const leggiData = s => { const k = /(\d{1,2})\s+([a-zà-ù]{3})/i.exec(String(s || '')); if (!k) return null; const mi = MESI.findIndex(x => x.slice(0, 3) === k[2].toLowerCase()); return mi < 0 ? null : mi * 100 + (+k[1]); };
    const chiaveData = d => d.getMonth() * 100 + d.getDate();
    function settimana() {
      const oggiEv = giornata();
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(oggiData.getTime()); d.setDate(d.getDate() + i);
        const chiave = chiaveData(d), nome = GIORNI[(oggiGiorno + i) % 7], voci = [];
        /* i pianificati che si ripetono: gli obiettivi con scadenza «ogni giorno» / «ogni <giorno della settimana>» */
        m.obiettivi.forEach(o => {
          const s = String(o.scadenza || '');
          if (s.indexOf('ogni') !== 0) return;
          const ogni = s.slice(5).trim();
          if (i === 0 || !(ogni === 'giorno' || ogni === nome)) return;   // oggi i pianificati stanno già negli eventi del giorno
          o.chi.forEach(id => { const e = byId[id]; if (e && e.att && e.att.quando) voci.push({ tipo: 'pianificato', ora: e.att.quando, chi: [id], titolo: e.att.titolo, sotto: e.att.cliente || o.titolo, cliente: e.att.cliente || '', obiettivo: o.id }); });
        });
        m.obiettivi.forEach(o => {
          if (leggiData(o.prossima) === chiave) voci.push({ tipo: 'consegna', ora: '', chi: o.chi.slice(0, 3), titolo: String(o.prossima).split('·').slice(0, -1).join('·').trim() || o.titolo, sotto: o.titolo, cliente: o.cliente, obiettivo: o.id });
          if (leggiData(o.scadenza) === chiave) voci.push({ tipo: 'scadenza', ora: '', chi: o.chi.slice(0, 3), titolo: o.titolo, sotto: 'scadenza · ' + (o.consegne[0] + ' di ' + o.consegne[1] + ' consegne'), cliente: o.cliente, obiettivo: o.id, stato: o.stato, avanz: o.avanz });
        });
        voci.sort((a, b) => (a.ora ? 0 : 1) - (b.ora ? 0 : 1) || String(a.ora).localeCompare(String(b.ora)));
        return { i, oggi: i === 0, nome, breve: nome.slice(0, 3), data: dataBreve(d), eventi: i === 0 ? oggiEv : [], voci };
      });
    }
    /* Le scadenze dei prossimi giorni, dalla più vicina: gli obiettivi con una data (non quelli che si ripetono). */
    function scadenze() {
      const oggi = chiaveData(oggiData);
      return m.obiettivi.map(o => ({ o, quando: leggiData(o.scadenza) })).filter(x => x.quando !== null)
        .sort((a, b) => (a.quando - b.quando) || a.o.id.localeCompare(b.o.id))
        .map(x => Object.assign(x, { giorni: Math.round((new Date(oggiData.getFullYear(), Math.floor(x.quando / 100), x.quando % 100) - oggiData) / 86400000) }));
    }
    /* ---- I fili della chat (versione 15): una sola copia per dipendente, così i messaggi restano; la Console e il telefono
       leggono lo stesso filo, e la barra di scrittura dell'Esecuzione ci scrive dentro come quella della chat. ---- */
    const fili = {};
    const filoDi = e => { if (!e) return []; if (!fili[e.id]) fili[e.id] = (n < 40 && FILI11[e.id]) ? FILI11[e.id].slice() : filoGenerato(e, out.esecuzioneDi(e)); return fili[e.id]; };
    const ultimo = e => { const f = filoDi(e); return f.length ? f[f.length - 1] : null; };
    /* Da leggere: i messaggi del dipendente (e le consegne) dopo l'ultima nota del titolare. */
    const nonLetti = e => { const f = filoDi(e); let k = f.length; while (k > 0 && f[k - 1].da !== 'io') k--; return f.length - k; };
    const out = {
      azienda, dipartimenti, STATI, n: m.dipendenti.length,
      dipendenti: m.dipendenti, byId, perDip: {}, approvazioni: m.approvazioni, richieste: m.richieste, diario: m.diario, agenda: m.agenda,
      obiettivi: m.obiettivi,
      etichetta, sotto, semeDi, tintaDi, tintaLibera, TINTE_ID,
      /* Mutazioni dell'organico (editor del dipendente): ritornano il dipendente. */
      aggiungi: dati => { const id = Math.max(0, ...m.dipendenti.map(e => e.id)) + 1; const e = { id, ruolo: dati.ruolo || 'Nuovo dipendente', dip: dati.dip || dipartimenti[0].id, stato: 'libero', att: { titolo: 'Nessuna esecuzione', cliente: '', costo: 0, fine: '' } }; if (dati.nome) e.nome = dati.nome; if (dati.seme && dati.seme !== e.ruolo) e.seme = dati.seme; e.tinta = TINTE_ID.includes(dati.tinta) ? dati.tinta : tintaLibera(); m.dipendenti.push(e); out.ricalcola(); return e; },
      aggiorna: (id, dati) => { const e = out.byId[id]; if (!e) return null; if ('nome' in dati) { if (dati.nome) e.nome = dati.nome; else delete e.nome; } if (dati.ruolo) e.ruolo = dati.ruolo; if (dati.dip) e.dip = dati.dip; if ('seme' in dati) { if (dati.seme && dati.seme !== e.ruolo) e.seme = dati.seme; else delete e.seme; } if (TINTE_ID.includes(dati.tinta)) e.tinta = dati.tinta; out.ricalcola(); return e; },
      ricalcola: () => { byId = out.byId = Object.fromEntries(m.dipendenti.map(e => [e.id, e])); out.perDip = Object.fromEntries(dipartimenti.map(d => [d.id, m.dipendenti.filter(e => e.dip === d.id)])); out.n = m.dipendenti.length; out.alLavoro = m.dipendenti.filter(e => e.stato === 'lavoro'); },
      obiettiviDi: dip => m.obiettivi.filter(o => o.dip === dip),
      richiesteDi: st => m.richieste.filter(r => r.stato === st),
      periodoDi: r => r.giorno === 0 ? 'oggi' : r.giorno === 1 ? 'ieri' : r.giorno <= 7 ? 'settimana' : r.giorno <= 31 ? 'mese' : 'prima',
      clienti: [...new Set(m.richieste.map(r => r.cliente))].sort(),
      /* filtri = { stato, tipo, chi, cliente, periodo, q }: valore assente o 'tutti' = nessun filtro */
      richiesteFiltrate: f => m.richieste.filter(r => {
        if (!f) return true;
        const per = r.giorno === 0 ? 'oggi' : r.giorno === 1 ? 'ieri' : r.giorno <= 7 ? 'settimana' : r.giorno <= 31 ? 'mese' : 'prima';
        const okPer = !f.periodo || f.periodo === 'tutti' || f.periodo === per || (f.periodo === 'settimana' && r.giorno <= 7) || (f.periodo === 'mese' && r.giorno <= 31);
        const okQ = !f.q || (r.cosa + ' ' + r.cliente + ' ' + etichetta(byId[r.chi])).toLowerCase().includes(f.q.toLowerCase());
        return (!f.stato || f.stato === 'tutti' || r.stato === f.stato) && (!f.tipo || f.tipo === 'tutti' || r.tipo === f.tipo)
          && (!f.chi || f.chi === 'tutti' || r.chi === +f.chi) && (!f.dip || f.dip === 'tutti' || byId[r.chi].dip === f.dip)
          && (!f.cliente || f.cliente === 'tutti' || r.cliente === f.cliente) && okPer && okQ;
      }),
      regole: [
        { id: 'g1', nome: 'Uscite verso i clienti', desc: 'Post, proposte e documenti per i clienti', modo: 'Sempre da approvare', attiva: true, icona: 'i-mega' },
        { id: 'g2', nome: 'Report interni', desc: 'Report giornalieri e rendiconti', modo: 'Automatica', attiva: true, icona: 'i-doc' },
        { id: 'g3', nome: 'Liste di lead', desc: 'Liste e ricerche senza invio', modo: 'Automatica sotto 20 €', attiva: true, icona: 'i-list' },
        { id: 'g4', nome: 'Spese sopra 50 €', desc: 'Qualsiasi consegna che costa più di 50 €', modo: 'Sempre da approvare', attiva: false, icona: 'i-euro' },
      ],
      alLavoro: [],
      conta, costoOggi, iniziali, dipDi,
      /* I costi dell'azienda per periodo ('oggi' | 'mese' | 'anno'), tutta l'azienda o un dipartimento (versione 13): vedi sopra. */
      costi, spesaDi,
      /* L'agenda dell'azienda (versione 15, 2026-09-06): gli eventi di oggi costruiti dalle attività correnti, i sette giorni
         da oggi (pianificati che si ripetono, prossime consegne, scadenze) e le scadenze degli obiettivi dalla più vicina. */
      giornata, settimana, scadenze, oraDi: orario,
      /* I fili della chat (versione 15): un filo per dipendente, una sola copia (i messaggi restano), condivisa fra Console e
         telefono; `scrivi` è la nota del titolare, dalla chat o dalla barra di scrittura dell'Esecuzione. */
      filoDi, ultimoDi: ultimo, nonLetti,
      scrivi: (id, testo, extra) => { const e = byId[id]; if (!e || !String(testo || '').trim()) return null; const msg = Object.assign({ da: 'io', ora: azienda.ora, testo: String(testo).trim() }, extra || {}); filoDi(e).push(msg); return msg; },
      /* I fili nell'ordine della chat: prima quelli con messaggi da leggere, poi per ultimo messaggio (i più recenti prima). */
      fili: () => m.dipendenti.map(e => ({ e, ultimo: ultimo(e), nuovi: nonLetti(e) })).sort((a, b) => ((b.nuovi > 0) - (a.nuovi > 0)) || String((b.ultimo || {}).ora || '').localeCompare(String((a.ultimo || {}).ora || '')) || (a.e.id - b.e.id)),
      MODELLI,
      /* Il dossier del dipendente (versione 6): scritto a mano per Nora e il Social media manager a 11, generato per gli altri; una sola copia per dipendente, così le decisioni restano. */
      dossierDi: e => { if (!e) return null; if (!dossier[e.id]) dossier[e.id] = (n < 40 && DOSSIER11[e.id]) ? DOSSIER11[e.id] : dossierGenerato(e); return dossier[e.id]; },
      /* L'esecuzione corrente del dipendente (versione 8): scritta a mano a 11 per sei dipendenti, generata per gli altri; una sola copia per dipendente, così le azioni restano. */
      esecuzioneDi: e => { if (!e) return null; if (!esecuzioni[e.id]) esecuzioni[e.id] = (n < 40 && ESEC11[e.id]) ? ESEC11[e.id] : esecuzioneGenerata(e); return esecuzioni[e.id]; },
      /* La revisione di una richiesta di tipo `revisione`. */
      revisioneDi: r => { const e = byId[r.chi]; const d = e && out.dossierDi(e); return d ? d.revisioni.find(x => x.id === r.revisione) : null; },
      /* Decisione del titolare su una revisione: prova (20 esecuzioni), applicata, modifiche, rifiutata. Applicare = la nuova versione del prompt o il nuovo modello diventano correnti. */
      decidiRevisione: (r, esito, motivo) => {
        const rv = out.revisioneDi(r); if (!rv) return;
        const d = out.dossierDi(byId[r.chi]);
        rv.stato = esito; rv.decisa = azienda.titolare.iniziali + ' · oggi ' + azienda.ora; if (motivo) rv.motivo = motivo;
        if (esito === 'prova') { rv.fatte = 0; rv.effetto = 'In prova: 0 di ' + rv.prova.esecuzioni + ' esecuzioni'; }
        else if (esito === 'applicata') { if (rv.tipo === 'prompt') { d.prompt.corrente = rv.a; const v = d.prompt.versioni.find(x => x.v === rv.a); if (v) { v.proposta = false; v.data = 'oggi ' + azienda.ora; v.chi = azienda.titolare.iniziali; } } else d.modello.assegnato = rv.a; rv.effetto = 'Applicata oggi: effetto misurato fra 30 giorni'; }
        else if (esito === 'modifiche') rv.effetto = 'Modifiche chieste dal titolare';
        else rv.effetto = motivo ? '«' + motivo + '»' : 'Rifiutata dal titolare';
        rv.verso = '';
      },
      /* Decisione del titolare su una richiesta (versione 11, 2026-09-05: qui, non più dentro `monta` in direzione-a.js, così la
         Console e il telefono condividono lo stato). stato: approvata | modifiche | rifiutata; `commento` è il motivo (obbligatorio
         per il rifiuto dal telefono e per le revisioni); per una revisione `esitoRevisione` è prova | applicata | modifiche |
         rifiutata (predefinito: applicata se approvata, altrimenti lo stato). Ritorna la richiesta, o null se non esiste. */
      decidi: (id, stato, commento, esitoRevisione) => {
        const r = m.richieste.find(x => x.id === id); if (!r) return null;
        const [hh, mm] = azienda.ora.split(':').map(Number);
        r.stato = stato; r.decisa = azienda.ora; r.giorno = 0; r.min = hh * 60 + mm; if (commento) r.commento = commento;
        if (r.tipo === 'revisione') out.decidiRevisione(r, esitoRevisione || (stato === 'approvata' ? 'applicata' : stato), commento);
        return r;
      },
    };
    const dossier = {}, esecuzioni = {};
    out.ricalcola();
    return out;
  }

  function nDaUrl() {
    const n = parseInt(new URLSearchParams(location.search).get('n') || '11', 10);
    return n >= 40 ? 40 : 11;
  }

  return { modello, nDaUrl, dipartimenti, STATI, MODELLI };
})();
