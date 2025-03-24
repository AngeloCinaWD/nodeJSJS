const dotenv = require('dotenv');

// REQUIRE DELLA CONFIGURAZIONE DELL'APP ALL'AVVIO DEL SERVER TRAMITE NODEMON
const app = require('./app');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: './production.env',
  });
} else {
  dotenv.config({
    path: './config.env',
  });
}

const port = process.env.PORT_LISTEN;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});

// ESLINT è fondamentalmente un programma che scansiona costantemente il nostro codice alla ricerca di potenziali errori o cattive partiche di codifica che ritiene sbagliate

// tutti questi pacchetti funzionano solo a livello locale, non globale, vanno installati ogni volta che voglio utilizzarli in un progetto

// voglio utilizzare eslint per la correzione degli errori e prettier per lo stile del codice
// installo sia il package di eslint che di prettier
// installo il package eslint-config-prettier che Turns off all rules that are unnecessary or might conflict with Prettier.
// installo eslint-plugin-prettier Runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
// installo eslint-config-airbnb This package provides Airbnb's .eslintrc as an extensible shared config.
// installo eslint-plugin-node che mi aggiunge delle regole eslint specifiche per node
// installo anche eslint-plugin-import, eslint-plugin-jsx-a11y e eslint-plugin-react che mi servono per far funzionare la configurazione di airbnb
// questi packages vanno tutti installati come dev depencies
// installo più packages insieme: npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react --save-dev

// creo 2 file di configurazione: uno .prettierc per prettier ed uno
