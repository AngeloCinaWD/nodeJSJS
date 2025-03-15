const fs = require('fs');
// per creare e gestire un webserver si utilizza il modulo http
const http = require('http');

// creo un server
// la callback di questo metodo accetta 2 parametri: request e response, request in arrivo e response da dare
// The requestListener is a function which is automatically added to the 'request' event.
// lo salvo in una const
const server = http.createServer((req, res) => {
  // creo una risposta generale ogni volta che si invia una request al server
  // metodo .end della response
  console.log(req.headers.host);

  res.end('Hello from server!');
});

// metto in ascolto su una determinata porta il server che ho creato
// di default, se non lo specifico, l'host è il localhost, con 0.0.0.0 metto in ascolto in remoto sulla rete
// il metodo .listen ha una callback
server.listen(9200, '0.0.0.0', () => {
  console.log('Listening to requests on port 9200');
});
