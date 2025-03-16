const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (template, product) => {
  // per rimpiazzare i placeholder si utilizza il metodo js per le stringhe .replace('searchValue', 'newValue')
  // per cercare tutti i placeholder con quel nome (altrimenti il metodo sostituisce solo il primo che trova nella stringa) utilizziamo una regex col flag g (global)
  // oppure potremmo utilizzare il metodo .replaceAll() è case-sensitive
  // creo una let con la nuova stringa col primo placeholder sostituito ed ogni volta la sovrascrivo sostituendo u altro placeholder

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

// leggo i templates html all'avvio dell'app e li salvo in delle const
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

// data products, string json e object jss
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataProducts = JSON.parse(data);

// funzione per sostituire i placeholder con i valori di ogni prodotto
// questa funzione ritorna una stringa col codice html coi placeholder sostituiti con i valori di ogni singolo prodotto

const server = http.createServer((req, res) => {
  const urlRequest = req.url;

  // Overview page
  // ritorniamo un html, quindi content-type: text/html
  if (urlRequest === '/' || urlRequest === '/overview') {
    res.writeHead(200, 'Overview', {
      'content-type': 'text/html',
    });

    // devo sostituire il placeholder (%PRODUCT_CARDS%) che è nel template overview.html
    // lo faccio col metodo .map() sull'array dataProducts, per ogni elemento presente nell'array richiamo una funzione che creo replaceTemplate() a cui passo il template card.html e l'elemento dell'array (un prodotto), nella funzione andrò a sostiture i valori delle proprietà id, price, quantity etc al posto dei placeholder che ho messo in card.html
    // il risultato del .map() è un nuovo array che salvo in una const
    // tramite .join() ottengo una stringa composta da tutti gli elementi dell'array, con separatore '' empty string
    const cardsHtml = dataProducts
      .map(product => replaceTemplate(templateCard, product))
      .join('');

    // console.log(cardsHtml);

    // sopstituisco la stringa al posto del placeholder >{%PRODUCT_CARDS%} nel template overview

    res.end(templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml));
  }

  // Product page
  else if (urlRequest === '/product') {
    res.end('You called product');
  }
  // API
  else if (urlRequest === '/api') {
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
