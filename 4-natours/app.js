const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7777;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id?', (req, res) => {
  const tour = tours.find(tour => tour.id === +req.params.id);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// metodi per l'update delle resources: PUT e PATCH
// con PUT ci aspettiamo l'intero oggetto con tutte le proprietà
// con PATCH solo le proprietà con i nuovi valori
// la rotta è sempre la stessa con path variable :id
app.patch('/api/v1/tours/:id', (req, res) => {
  // per i query params e per i path variables non cè bisogno del middleware express.json()
  console.log(req.query);
  console.log(req.params);

  // trovo l'indice che ha nell'array tours il tour che voglio modificare
  const tourIndex = tours.findIndex(tour => tour.id === +req.params.id);

  // se non c'è un tour con quell'id il metodo .finfIndex() mi torna un -1
  // invio una risposta con status code 404
  if (tourIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // se il tour esiste lo modifico nell'array richiamandolo per index
  // utilizzo lo spread operator per ricreare un oggetto prendendo tutte le proprietà vecchie dell'oggetto tour e quelle nuove inviate in un oggetto tramite request.body (come nella post)
  // le proprietà vecchie con lo stesso nome di quelle in quello inviato vengono sovrascritte coi nuovi valori
  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  };

  // riscrivo il file json dei tours col json ricavato dal nuovo array tours
  // in questo modo ho il tour sempre aggiornato quando riavvio il server
  // nella callback invio una response con status code 200
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours[tourIndex],
        },
      });
    }
  );
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
