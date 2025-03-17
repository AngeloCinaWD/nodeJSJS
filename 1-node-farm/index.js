const fs = require('fs');
const http = require('http');
const url = require('url');

// importo la funzione replaceTemplate e la salvo in una const in modo da poterla riutilizzare normalmente
const replaceTemplate = require('./modules/replaceTemplate');

// creo una cartella modules nella root e dentro ci vado a mettere i miei moduli
// un modulo è un file .js di cui viene esportato il contenuto in modo da poterlo riutilizzare  ovunque nel progetto importandolo tramite require
// sposto la funzione in modules/replaceTemplate.js
// const replaceTemplate = (template, product) => {
//   let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%ID%}/g, product.id);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);

//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//   }

//   return output;
// };

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataProducts = JSON.parse(data);

const server = http.createServer((req, res) => {
  // const path = req.url;

  // const { query, pathname } = url.parse(path, true);
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, 'Overview', {
      'content-type': 'text/html',
    });

    // const cardsHtml = dataProducts
    //   .map(product => replaceTemplate(templateCard, product))
    //   .join('');

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
    // const product = dataProducts[query.id];

    // const templateHtmlProduct = replaceTemplate(templateProduct, product);

    res.writeHead(200, `Product: ${dataProducts[query.id].productName}`, {
      'content-type': 'text/html',
    });

    // res.end(templateHtmlProduct);
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
