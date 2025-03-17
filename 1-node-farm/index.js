// coi moduli creati fs qui non lo utilizzo più
// const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');
// creo un nuovo modulo con un oggetto che contiene i 3 template html, destrutturo l'oggetto ed ottengo 3 const col nome di ogni template html che sto esportando dasl modulo
const {
  templateOverview,
  templateProduct,
  templateCard,
} = require('./modules/templatesHtml');
// creo un modulo coi dati dei prodotti, il json e l'oggetto js
const { data, dataProducts } = require('./modules/dataProducts');

// const templateOverview = fs.readFileSync(
//   `${__dirname}/templates/overview.html`,
//   'utf-8'
// );
// const templateProduct = fs.readFileSync(
//   `${__dirname}/templates/product.html`,
//   'utf-8'
// );
// const templateCard = fs.readFileSync(
//   `${__dirname}/templates/card.html`,
//   'utf-8'
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataProducts = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, 'Overview', {
      'content-type': 'text/html',
    });

    res.end(
      templateOverview.replace(
        /{%PRODUCT_CARDS%}/g,
        dataProducts
          .map(product => replaceTemplate(templateCard, product))
          .join('')
      )
    );
  }

  // Product page
  else if (pathname === '/product') {
    res.writeHead(200, `Product: ${dataProducts[query.id].productName}`, {
      'content-type': 'text/html',
    });

    res.end(replaceTemplate(templateProduct, dataProducts[query.id]));
  }
  // API
  else if (pathname === '/api') {
    res.writeHead(200, 'Lista prodotti', {
      'content-type': 'application/json',
    });
    res.end(data);
  }
  // Page not found
  else {
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

// NPM: manager for the third party Open Source packages
// in un nuovo progetto in cui non è installato va runnato il comando: npm init
// ci vengono chieste una serie di info e viene creato il file package.json
