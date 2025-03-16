const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
};

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
  // const urlRequest = req.url;
  const path = req.url;

  // il metodo .parse() del modulo url mi restituisce un oggetto contenente le proprietà ricavate dal request url (che sarebbe la path che chiamo dopo l'host, comprende la path e i query params), ad esempio la pathname, la path, l'host, la port, i query params ed altri.
  // passando il secondo parametro true vuol dire che il valore di query viene parsato in un oggetto js (altrimenti sarebbe una stringa)
  // dato che è un oggetto posso destrutturarlo ed ottenere delle const che mi interessano: query e pathName (mi interessa la pathname perchè è la parte di path senza i query parmas ed è importante perchè se faccio l'equivalenza tra la path e ad esempio /product&id=0 avrò sempre una pagina non trovata, devo invece fare l'equivalenza con la pathName che è solo /product e poi renderizzare il template del prodotto tramite id passato come query params)
  console.log(url.parse(path, true));

  const { query, pathname } = url.parse(path, true);

  // Overview page
  // ritorniamo un html, quindi content-type: text/html
  // if (urlRequest === '/' || urlRequest === '/overview') {
  // if (path === '/' || path === '/overview') {
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, 'Overview', {
      'content-type': 'text/html',
    });

    const cardsHtml = dataProducts
      .map(product => replaceTemplate(templateCard, product))
      .join('');

    res.end(templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml));
  }

  // Product page
  // else if (urlRequest === '/product') {
  // else if (path === '/product') {
  else if (pathname === '/product') {
    // quando la pathname è product ci sarà anche un query params id
    // questo id è l'id del prodotto che voglio renderizzare
    // vado quindi a prendere il prodotto con quell'id (che corrisponde all'index che ha il prodotto nell'array dataProducts)
    const product = dataProducts[query.id];

    // chiamo la funzione per sostituire i valori del prodotto ai placeholder nell'html product
    const templateHtmlProduct = replaceTemplate(templateProduct, product);

    // dchiaro nell'header che sto rispondendo con un html
    res.writeHead(200, `Product: ${product.productName}`, {
      'content-type': 'text/html',
    });
    console.log(product);
    console.log(templateHtmlProduct);

    // res.end('You called product');
    res.end(templateHtmlProduct);
  }
  // API
  // else if (urlRequest === '/api') {
  // else if (path === '/api') {
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
