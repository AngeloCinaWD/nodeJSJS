const fs = require('fs');
const http = require('http');
const url = require('url');

// leggo il file json coi prodotti all'inizio e lo salvo in una const disponibile per tutta l'app
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// creo un oggetto js coi prodotti
const dataProducts = JSON.parse(data);

const server = http.createServer((req, res) => {
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
    // url api, quando chiamo questa rotta voglio restituire i dati che sono nel file /dev-data/data.json
    case '/api':
      // leggo il contenuto del file
      // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
      //   // il file che leggo contiene un json, lo parso in un oggetto js tramite metodo JSON.parse() e lo salvo in una const
      //   const products = JSON.parse(data);
      //   console.log(products);
      //   // restituisco al browser il json coi prodotti, quindi devo creare un header in cui lo avverto che nella response arriva un json
      //   res.writeHead(200, 'Lista prodotti', {
      //     'content-type': 'application/json',
      //   });
      //   res.end(data);
      // });
      // scritto in questo modo il file json viene letto tutte le volte che viene chiamata la rotta api, lo tolgo da qui ed eseguo l'operazione una volta sola in sincrono all'inizio del codice, in modo da vare a disposizione sempre il file ed averlo caricato una volta sola, all'avvio dell'app
      res.writeHead(200, 'Lista prodotti', {
        'content-type': 'application/json',
      });
      // sto restituendo il json che ho letto all'avvio dell'app
      res.end(data);
      //res.end('API Products');
      break;
    default:
      res.writeHead(404, 'PageNotFound', {
        'content-type': 'text/html',
        'info-che-voglio': 'ciao, sono una info che voglio',
      });
      res.end('<h1>404 page not found</h1>');
  }
});

server.listen(9200, '0.0.0.0', () => {
  console.log('Listening to requests on port 9200');
});
