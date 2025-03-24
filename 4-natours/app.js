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
