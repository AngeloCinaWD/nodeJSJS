const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7777;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// per avere un codice più pulito e chiaro salvo la callback di ogni rotta in una const che richiamo in ogni rotta
// essendo funzioni da chiamare come callbacks non le devo chiamare con le tonde perchè vorrebbe dire eseguirle quando il codice viene letto
// devono invece essere eseguite solo quando viene chiamata la rotta
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
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id?', getTour);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);

// col metodo .route() è possibile indicare un url e poi definire concatenandoli tutti i metodi http e la funzione che invocano per quell'url
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
