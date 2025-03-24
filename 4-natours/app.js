const morgan = require('morgan');
const express = require('express');

// ROUTERS CON ROTTE E FUNZIONI DA RICHIAMARE GESTITE NEI CONTROLLERS
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// APP CONFIGURATION
const app = express();

// MOUNT DEI MIDDLEWARE DA UTILIZZARE GLOBALMENTE
app.use(morgan('dev'));
app.use(express.json());

// dato che stiamo implementando un app con dele API non abbiamo bisogno di gestire anche i file statici (un .html, un'immagine etc) questo perchè quello che ritorniamo sono sempre dati, in formato JSON
// se volessimo aprire delle rotte all'esterno per visualizzare file statici ho bisohno di utilizzare un middleware di express, express.static('path della folder da aprire all'esterno')
// ad esempio voglio permettere di navigare all'interno del file system, la cartella public
// questo middleware funziona che se passo un url che non è definito fra le rotte che ho creato va a cercare nella cartella public
// quindi se passo localhost:7777/ non ho nulla definito fra le rotte e mi va nella cartella public, naturalmente in questo modo mi restituisce un errore per chè non sto cercando nulla
// quindi mi imposta la cartella public come radice, come root
// se scrivessi localhost:7777/overview.html mi verrebbe servito il file html
// localhost:7777/img/pin.png
// con questo middleware posso servire file da folder e non da una route
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// MOUNT DEI MIDDLEWARE RELATIVI ALLA GESTIONE DELLE ROTTE, SPECIFICI PER L'URL INDICATO
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// EXPORT DI QUESTO FILE COME FILE DI CONFIGURAZIONE DELL'APP
module.exports = app;
