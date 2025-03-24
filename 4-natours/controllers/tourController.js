const fs = require('fs');

// ARRAY CON I TOUR
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    'utf-8'
  )
);

// EXPORT SINGOLO DI OGNI FUNZIONE
// NELL'IMPORT POSSO IMPORTARE UN OGGETTO CON PROPRIETA' CON NOME DELLA FUNZIONE O TRAMITE DESTRUTTURAZIONE DELL'OGGETTO AVERE TANTE CONST PER OGNI FUNZIONE
exports.checkId = (req, res, next, val) => {
  const tour = tours.find(tour => tour.id === +val);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

// creazione middleware per controllare che il body contenga le properties name e price
// se non le contiene devo restituire un errore
exports.checkBodyReq = (req, res, next) => {
  if (
    !Object.hasOwn(req.body, 'name') ||
    !Object.hasOwn(req.body, 'price')
  ) {
    return res.status(422).json({
      status: 'fail',
      message: 'Missing name or price property',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find(
    tour => tour.id === +req.params.id
  );

  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
  const tourIndex = tours.findIndex(
    tour => tour.id === +req.params.id
  );

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.deleteTour = (req, res) => {
  const updatedTours = tours.filter(
    tour => tour.id !== +req.params.id
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
