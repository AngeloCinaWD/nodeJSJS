const express = require('express');
// importo il modulo fs
const fs = require('fs');
const app = express();
const port = 4200;

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server side!' });
// });

// leggo il file che voglio inviare nella response e lo salvo in una cons
// lo faccio come top level code in modo da leggerlo una sola volta e in modo sincrono
// lo salvo come oggetto JS, quindi utilizzo il metodo .parse() dell'oggetto JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// creiamo una rotta che ci renda tutti i tours disponibili
// per convenzione le rotte che puntano a delle API iniziano con la path /api
// seguita da una path che indica la versione delle api, /v1 (versione 1, se nel tempo farò delle modifiche diventerà v2 etc)
// la rotta per fetchare tutti i tours sarà una get con endpoint /api/v1/tours
app.get('/api/v1/tours', (req, res) => {
  // res.header({
  //   'content-type': 'application/json',
  // });
  // res.send(
  //   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
  // );
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
