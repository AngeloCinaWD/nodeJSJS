const fs = require('fs');
const http = require('http');

// ROUTING: implementare diverse azioni per diversi url
// per implementare un router con nodejs si utilizza il modulo URL
const url = require('url');

const server = http.createServer((req, res) => {
  // loggo l'url della request che arriva, se chiamo localhost:9200 sarà /, l'host è localhost:9200
  // localhost:9200?ciao=ciao sarà /?ciao=ciao
  // localhost:9200/overview?ciao=ciao sarà /overview?ciao=ciao
  console.log(req.url);

  // creo un piccolo router
  // salvo l'url della request
  const urlRequest = req.url;

  switch (urlRequest) {
    case '/':
      res.end('You called home');
      break;
    case '/overview':
      res.end('You called overview');
      break;
    case '/products':
      res.end('You called products');
      break;
    default:
      // in caso una rotta chiamata non sia fra quelle note ritorno un header con codice di errore 404
      // utilizzo il metodo dells response .writeHead(statuscode, statusmessage, {headers})
      // tramite header posso passare info con la response al client che ha effettuato la request
      // ad esempio indicando il content-type come text/html informo il browser che sta ricevendo una stringa che deve essere trattata come HTML
      res.writeHead(404, 'PageNotFound', {
        'content-type': 'text/html',
        // posso passare tutte le info che voglio
        'info-che-voglio': 'ciao, sono una info che voglio',
      });
      // passo una stringa con tag html che il browser interpretrà come tali
      res.end('<h1>404 page not found</h1>');
  }
});

server.listen(9200, '0.0.0.0', () => {
  console.log('Listening to requests on port 9200');
});
