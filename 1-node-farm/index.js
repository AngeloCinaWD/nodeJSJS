const fs = require('fs');
const http = require('http');
const url = require('url');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
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
    case '/api':
      res.writeHead(200, 'Lista prodotti', {
        'content-type': 'application/json',
      });
      res.end(data);
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
