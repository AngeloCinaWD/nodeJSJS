const http = require('http');
const url = require('url');

// per utilizzare un package installato tramite npm utilizzo sempre la funzione require('nomePackage')
// slugify mi permette di creare degli slug, delle stringhe uniche che rappresentano l'ultima parte di un url
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
const {
  templateOverview,
  templateProduct,
  templateCard,
} = require('./modules/templatesHtml');
const { data, dataProducts } = require('./modules/dataProducts');

// per utilizzare slugify si passa una stringa alla funzione slugify()
// posso aggiungere delle opzioni ad esempio lowercase, replacement degli spaces (di default -), trim ed altre
console.log(slugify('Fresh Avocados', { lower: true, replacement: '*' }));

// creo un array con lo slug per ogni prodotto in base al suo nome
const slugs = dataProducts.map(product =>
  slugify(product.productName, { lower: true })
);

console.log(slugs);

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

// con NPM possiamo installare 2 tipi di packages: dependencies e development dependencies
// il primo package che installiamo è slugify
// il comando per installare un package con npm è npm install (npm i) nomePackage
// prima si aggiungeva --save come flag ora non più, questo perchè prima della versione 5 npm installava un package in node_modules senza salvarlo nelle dependencies, cosa che avveniva col flag --save
// una volta installato il package con npm i slugify viene aggiunto un campo nuovo nel package.json, la proprietà dependencies con valore un oggetto col nome e la versione del package installato
// alcuni packages vengono installati come dev-dependencies, cioè utilizzati solo per lo sviluppo, non vengono buildati per la production dell'app, ad esempio nodemon
// per installare un package come dev-dependencies si utilizza il flag --save-dev: npm i nomePackage --save-dev
// nodemon è un tool che riavvia l'app ogni volta che c'è un cambiamento, non devo ogni volta chiudere e riavviare il server
// installati in questo modo i packages sono utilizzabili solo in questo progetto, sono stati installati localmente
// un package installato globalmente non può essere utilizzato da linea di comando, cioè il comando nodemon non esiste nelle path del sistema, quindi se runnassi nodemon index.js avrei un errore. Per avviarlo in locale o eseguo il comando preceduto da npx: npx nodemon index.js oppure creo un comando runnabile da npm, andandolo a d aggiungere nell'oggetto scripts del package.json: "start": "nodemon index.js". Per avviare il server con node ora posso runnare npm run start (o anche solo npm start) e verrà eseguito il comando nodemon index.js. In questo modo gli sto dicendo di utilizzare il nodemon che è installato nelle dev-dependencies
// per farlo funzionare devo utilizzare il comando npx nodemon index.js oppure installare nodemon in maniera globale: nom i nodemon --global
// nodemon è un wrapper, infatti runna sempre: [nodemon] starting `node .\index.js`
