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

// nel package.json le dependencies vengono salvate indicando anche la versione
// si utilizza la cosiddetta semantic version notation, ad es: ^1.18.11
// la versione è sempre espressa con 3 numeri
// il primo numero indica la major version, il secondo la minor version ed il terzo la patch version
// patch version: versione rilasciata per fixare i bugs (ho la versione 1.18, trovo un bug e lo fixo avrò la 1.18.1, ne trovo un altro e lo fixo 1.18.2 e così via)
// minor version: vengono rilasciate nuove features nella major, non ci sono breaking changes, cioè le features sono compatibili con le versioni precedenti ad esempio con la 1.17, la 1.16 etc
// major version viene rilasciata quando alcune nuove features implementate potrebbero non essere compatibili, quindi non funzionare, con le precedenti versioni (ad esempio slugify ora utilizza con la major 1 la funzione slugify(), magari esce la 2 in cui questa funzione ha cambiato nome tipo slugify2() o i parametri che si aspetta sono diversi anche nel nome, ad es. lower diventa lowercase)
// ^ (accento circonflesso) indica che si accettano minor version e patch differenti della stessa major
// il comando npm outdated mi dà una tabella coi packages obsoleti
// per installare una specifica versione di un package runno il comando nom i namePackage@x.x.x
// se installo slugify tramite npm i slugify avrò l'ultima versione, con la tilde che indica che però accetto anche minor e patch precedenti, ad esempio posso installare npm i slugify@1.0.0
// se però cambio ^ con la tilde ~ accetto solo patch version
// esempio installo slugify 1.0.0, la più recente è la 1.6.6, se ho ^1.0.0 e runno npm outdated mi dice che slugify è obsoleto perchè è la versione 1.0.0 e che la voluta sarebbe 1.6.6 (stessa major, accetto tutte le minor e le patch in un eventuale update)
// se sostituisco ^ con ~ e runno npm outdated mi dice che la voulta (la massima che posso accettare in un eventuale update) è la 1.0.2, accetto solo patch maggiori
// per aggiornare un package npm update nomePackage, per visualizzare la nuova versione devo runnare npm i
// l'* prima indica che in caso di update va bene qualsiasi versione, la più aggiornata anche per la major
// per disinstallare un package npm uninstall namePackage
