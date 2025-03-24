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

// nelle funzioni che gestiscono un id, che lavorano su una determinata resource, l'utilizzo di un param middleware è perfetto per non ripetere il codice in ogni funzione
// mi basta creare un middleware che faccia un controllo se la resource esiste o no prima di arrivare alla funzione, in caso negativo invia una res con errore
// per creare il middleware esporto una funzione ad esempio checkId che ha come struttura quella del middleware con 4 parametri, un return in caso di errore e un next() in modo da permettere, in caso tutto vada bene, di proseguire nel request-response cycle
exports.checkId = (req, res, next, val) => {
  console.log('sto passando da qui');

  const tour = tours.find(tour => tour.id === +val);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
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

  // questo controllo lo faccio nel middleware prima di arrivare alla funzione getTour()
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

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

  // il controllo se il tour esiste lo faccio nel param middleware checkId, quindi se il tour esiste arrivo in questa funzione e trovo l'index del tour, se il tour con quell'id non esiste qui non ci arrivo proprio

  // if (tourIndex === -1) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

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
  // facendo il controllo nel middleware se il tour esista o no non ho problemi ad eseguire questo codice

  const tourToDelete = tours.find(
    tour => tour.id === +req.params.id
  );

  // if (!tourToDelete) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }

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
