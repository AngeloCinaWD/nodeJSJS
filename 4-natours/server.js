// una volta installato dotenv lo importo
const dotenv = require('dotenv');

// REQUIRE DELLA CONFIGURAZIONE DELL'APP ALL'AVVIO DEL SERVER TRAMITE NODEMON
const app = require('./app');

// nodejs o express, come tanti altri framework, possono essere eseguiti, runnati, in diversi ambienti. I più importanti sono development environment e production environment
console.log(app.get('env'));
// a seconda dell'ambiente possiamo utilizzare diversi db, o diverse impostazioni per runnare il codice
// nel file process.env sono contenute delle variabili di sistema che node utilizza all'avvio dell'app o durante l'esecuzione della stessa
// in express molti packages dipendono dal valore di una proprietà chiamata per convenzione NODE_ENV
// questa variabile non è settata di default da node
// per settarla lo posso fare tramite scriprt di npm "start": "SET NODE_ENV=development&& nodemon server.js"
// attenzione al fatto che in windows il comando è diverso che in linux o mac
// dato che non è pratico inserire i valori delle variabili d'ambiente in questo modo, si utilizza per convenzione un file .env in cui le andiamo ad inserire
// creo un file config.env
// a questo punto la variabile NODE_ENV non la definisco più al momento dell'avvio dell'app ma mi basta definirla in questo file
// per fare in modo che le variabili che vengono definite in un file .env vengano importate nel process.env, devo installare il package dotenv e configurarlo, andandogli a passare la path del file .env che deve utilizzare

// dotenv.config({
//   path: './config.env',
// });

// potrei creare un file tipo production.env e dirgli di andare a d utilizzare quelle tramite config di dotenv se ad esempio la variabile NODE_ENV è uguale a production
// per farlo posso creare un npm script: "start:prod": "SET NODE_ENV=production&& nodemon server.js"
// quando runno questo comando mi viene settata la property NODE_ENV su production e potrei fare così
// in questo modo se lancio l'app tramite npm run start:prod il mio server si avvierà sulla porta 7778

if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: './production.env',
  });
} else {
  dotenv.config({
    path: './config.env',
  });
}

console.log(process.env);
console.log(process.env.NODE_ENV);
console.log(process.env.PORT_LISTEN);

// const port = 7777;
const port = process.env.PORT_LISTEN;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
