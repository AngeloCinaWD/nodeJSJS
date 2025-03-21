const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7777;

// il metodo .use() ci permette di aggiungere un middleware al middleware stack
app.use(express.json());

// se voglio creare un middleware globale, attraversato da tutte le request, lo devo posizionare in cima al codice
// ne creo uno che aggiunga una property requestTime ad ogni oggetto request che arriva
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// HANDLER FUNCTIONS
const getAllTours = (req, res) => {
  // loggo la property requestTime aggiunta all'oggetto request con il middleware
  console.log(req.requestTime);

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

// in un middleware ci passa sempre una request (primo argomento) ed una response (secondo argomento) ed in più c'è un argomento next (può chiamarsi come si vuole, l'importante è che sia il terzo argomento della funzione)
// creo un middlewaree custom
// utilizzo il metodo .use() passandogli una funzione coi 3 parametri req, res e next
app.use((req, res, next) => {
  // il middleware così definito viene applicato a qualsiasi request in entrata perchè si trova prima di tutti i middleware finali, quelli che chiudono il ciclo request-response, res.send() o res.json() etc
  // faccio un log ad ogi request che arriva
  console.log('Hello from middleware for all routes!');
  // per far andare avanti il ciclo ho bisogno di richiamare il metodo next()
  next();
});

// API ROUTES
app.route('/api/v1/tours').get(getAllTours).post(createTour);

// questo middleware viene visto solo dalle request che puntano all'url '/api/v1/tours/:id'
// perchè sono dopo il middleware
app.use((req, res, next) => {
  console.log('Hello from middleware /api/v1/tours/:id!');
  next();
});

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// SERVER
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
