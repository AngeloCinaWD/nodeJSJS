const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7777;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// HANDLER FUNCTIONS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  const tourToDelete = tours.find(tour => tour.id === +req.params.id);

  if (!tourToDelete) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updateTours = tours.filter(tour => tour.id !== +req.params.id);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updateTours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// API ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// SERVER
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});

// MIDDLEWARE AND REQUEST-RESPONSE CYCLE
// il ciclo inizia con una request e finisce con una response, c'è un passaggio di dati. In mezzo ci sono i middleware che gestiscono questi dati, sia in entrata che prima dell'uscita con la response che è creata coi dati manipolati dai middleware per formare il response object. Anche il router è un middleware, un parser, un setting headers etc etc
// I middleware lavorano in catena, prima uno fa qualcosa e poi passa quello che ha fatto ad un altro e così via. L'ultimo middleware è quello che invia la response, ad es. res.send() e non passa i dati a nessun altro middleware.
