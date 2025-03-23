// importo il modulo fs
const fs = require('fs');

// array con i tour
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    'utf-8'
  )
);

// handler functions per i tour
// le devo esportare tutte
// const getAllTours = (req, res) => {
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// const getTour = (req, res) => {
exports.getTour = (req, res) => {
  const tour = tours.find(
    tour => tour.id === +req.params.id
  );

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// const createTour = (req, res) => {
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

// const updateTour = (req, res) => {
exports.updateTour = (req, res) => {
  const tourIndex = tours.findIndex(
    tour => tour.id === +req.params.id
  );

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

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

// const deleteTour = (req, res) => {
exports.deleteTour = (req, res) => {
  const tourToDelete = tours.find(
    tour => tour.id === +req.params.id
  );

  if (!tourToDelete) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updateTours = tours.filter(
    tour => tour.id !== +req.params.id
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(updateTours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
