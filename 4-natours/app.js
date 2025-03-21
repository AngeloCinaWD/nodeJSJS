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

app.patch('/api/v1/tours/:id', (req, res) => {
  const tourIndex = tours.findIndex(tour => tour.id === +req.params.id);

  if (tourIndex === -1) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  };

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

// metodo delete per eliminare una resource
app.delete('/api/v1/tours/:id', (req, res) => {
  // trovo il tour con quell'id
  const tourToDelete = tours.find(tour => tour.id === +req.params.id);

  // se non c'è invio response con status code 404
  if (!tourToDelete) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // tramite .filter creo un nuovo array di tour con tutti tranne quello con l'id da eliminare
  const updateTours = tours.filter(tour => tour.id !== +req.params.id);

  // riscrivo il file passando il json del nuovo array di tour, senza quello eliminato
  // rimando tutti i tours senza quello eliminato come response
  // se non avessi mandato nulla nei data della response avrei utilizzato lo status code 204 NO CONTENT
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updateTours),
    () => {
      // res.status(200).json({
      //   status: 'success',
      //   results: updateTours.length,
      //   data: {
      //     tours: updateTours,
      //   },
      // });
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
