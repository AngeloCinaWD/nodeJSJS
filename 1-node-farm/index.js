const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
const {
  templateOverview,
  templateProduct,
  templateCard,
} = require('./modules/templatesHtml');
const { data, dataProducts } = require('./modules/dataProducts');

const slugs = dataProducts.map(product =>
  slugify(product.productName, { lower: true })
);

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
