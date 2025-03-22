// const os = require('os');
// installo il package morgan, npm i morgan
// è un middleware che mi consente di loggare in console informazioni circa le request e le response
const morgan = require('morgan');
const express = require('express');
const fs = require('fs');
const app = express();

// console.log(os.networkInterfaces());

// MIDDLEWARE GLOBALI
// utilizzo il middleware morgan(), gli passo come parametro 'dev', un formato già pronto per vedere info in console in un certo modo, nomi colorati etc
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ARRAY CON I TOUR
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
const port = 7777;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
