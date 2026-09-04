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
  };

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

  const base = [
    { id: 1,  nome: 'Leo',  ruolo: 'Sviluppatore full-stack', dip: 'svi', stato: 'lavoro',
      att: { titolo: 'Checkout e-commerce', cliente: 'Bianchi & Co.', da: '09:40', passo: [3, 7], costo: 38, prossimo: 'Pagamento con carta' } },
    { id: 2,  nome: 'Ada',  ruolo: 'Tester QA',                dip: 'svi', stato: 'pianificato',
      att: { titolo: 'Test di regressione', cliente: 'Zenith', quando: '15:00', costo: 0 } },
    { id: 3,  nome: 'Kim',  ruolo: 'DevOps',                   dip: 'svi', stato: 'errore',
      att: { titolo: 'Deploy in staging', cliente: 'Zenith', da: '08:55', errore: 'Chiavi di accesso scadute', costo: 4 } },
    { id: 4,  nome: 'Nora', ruolo: 'Copywriter',               dip: 'mkt', stato: 'lavoro',
      att: { titolo: 'Post LinkedIn 5 di 12', cliente: 'Rossi Srl', da: '10:20', passo: [2, 4], costo: 12, prossimo: 'Bozza e immagine' } },
    { id: 5,  nome: 'Ivo',  ruolo: 'Social media manager',     dip: 'mkt', stato: 'attesa',
      att: { titolo: 'Piano editoriale ottobre', cliente: 'Madira Ink', da: '09:06', fine: '09:48', costo: 9 } },
    { id: 6,  nome: 'Mia',  ruolo: 'Specialista SEO',          dip: 'mkt', stato: 'libero',
      att: { titolo: 'Audit SEO', cliente: 'Metamorfosi', fine: 'ieri 18:10', costo: 0 } },
    { id: 7,  nome: 'Sam',  ruolo: 'Ricerca lead',             dip: 'ven', stato: 'lavoro',
      att: { titolo: '200 lead e-commerce in Lombardia', cliente: 'Nova Studio', da: '08:30', passo: [5, 6], costo: 61, prossimo: 'Verifica email' } },
    { id: 8,  nome: 'Zoe',  ruolo: 'Proposte commerciali',     dip: 'ven', stato: 'libero',
      att: { titolo: 'Proposta 20.000 €', cliente: 'Metamorfosi', fine: 'ieri 17:30', costo: 0 } },
    { id: 9,  nome: 'Ugo',  ruolo: 'Follow-up clienti',        dip: 'ven', stato: 'pianificato',
      att: { titolo: 'Follow-up settimanale', cliente: '14 clienti', quando: '17:00', costo: 0 } },
    { id: 10, nome: 'Rea',  ruolo: 'Fatturazione',             dip: 'amm', stato: 'libero',
      att: { titolo: 'Fatture di agosto', cliente: 'Nova Studio', fine: 'ieri 16:00', costo: 0 } },
    { id: 11, nome: 'Teo',  ruolo: 'Report al titolare',       dip: 'amm', stato: 'pianificato',
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
        const nome = NOMI[(di * 10 + i) % NOMI.length];
        const att = { titolo: TITOLI[d.id][i], cliente: CLIENTI[(di * 3 + i) % CLIENTI.length], costo: 0 };
        if (stato === 'lavoro') { att.da = ['08:30','09:40','10:20','09:05','09:52','10:35'][(di + i) % 6]; att.passo = PASSI[k++ % PASSI.length]; att.costo = 8 + ((di * 7 + i * 13) % 60); att.prossimo = 'Prossimo passo'; }
        else if (stato === 'attesa') { att.da = '09:06'; att.fine = ['09:48','10:05','10:30'][(di + i) % 3]; att.costo = 5 + ((di + i) % 9); }
        else if (stato === 'pianificato') { att.quando = ['15:00','17:00','18:00','16:30'][(di + i) % 4]; }
        else if (stato === 'errore') { att.da = '08:55'; att.errore = 'Chiavi di accesso scadute'; att.costo = 4; }
        else { att.fine = 'ieri'; }
        dipendenti.push({ id: id++, nome, ruolo: RUOLI[d.id][i], dip: d.id, stato, att });
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
    const richieste = approvazioni.map((a, i) => ({ ...a, stato: 'attesa', costo: 3 + (i % 7), passi: ['Brief', 'Bozza', 'Revisione'], nota: NOTE[i % 3], testo: 'Contenuto della consegna «' + a.cosa + '» per ' + a.cliente + '.', allegato: 'Documento: ' + (2 + i) + ' pagine', tipo: TIPI[i % 4] }));
    dipendenti.filter(e => e.stato === 'libero').slice(0, 10).forEach((e, i) => {
      const st = i < 6 ? 'approvata' : i < 8 ? 'modifiche' : 'rifiutata';
      richieste.push({ id: 'st' + i, chi: e.id, cosa: e.att.titolo, cliente: e.att.cliente, ora: i < 4 ? '0' + (8 + i) + ':' + (10 + i * 7) : 'ieri', tipo: TIPI[i % 4], stato: st, decisa: i < 4 ? '09:' + (20 + i * 5) : 'ieri', costo: 4 + i, passi: ['Brief', 'Bozza', 'Revisione'], nota: NOTE[i % 3], testo: 'Contenuto della consegna «' + e.att.titolo + '».', allegato: 'Documento: 3 pagine', commento: st === 'modifiche' ? 'Aggiungi le priorità.' : st === 'rifiutata' ? 'Fuori brief, ripartire.' : '' });
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
    return { dipendenti, approvazioni, richieste, diario, agenda };
  }

  function modello(n) {
    const m = n >= 40 ? modello40() : { dipendenti: base, approvazioni: approvazioni11, richieste: richieste11, diario: diario11, agenda: agenda11 };
    const byId = Object.fromEntries(m.dipendenti.map(e => [e.id, e]));
    const perDip = Object.fromEntries(dipartimenti.map(d => [d.id, m.dipendenti.filter(e => e.dip === d.id)]));
    const conta = s => m.dipendenti.filter(e => e.stato === s).length;
    const costoOggi = m.dipendenti.reduce((t, e) => t + (e.att.costo || 0), 0);
    const iniziali = e => e.nome.slice(0, 2).toUpperCase();
    return {
      azienda, dipartimenti, STATI, n: m.dipendenti.length,
      dipendenti: m.dipendenti, byId, perDip, approvazioni: m.approvazioni, richieste: m.richieste, diario: m.diario, agenda: m.agenda,
      richiesteDi: st => m.richieste.filter(r => r.stato === st),
      alLavoro: m.dipendenti.filter(e => e.stato === 'lavoro'),
      conta, costoOggi, iniziali,
      avatarClasse: e => 'a' + (((e.id - 1) % 6) + 1),
      dipDi: e => dipartimenti.find(d => d.id === e.dip),
    };
  }

  function nDaUrl() {
    const n = parseInt(new URLSearchParams(location.search).get('n') || '11', 10);
    return n >= 40 ? 40 : 11;
  }

  return { modello, nDaUrl, dipartimenti, STATI };
})();
