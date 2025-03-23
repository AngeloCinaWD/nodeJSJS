// importo il modulo express
const express = require('express');
// imposrto il modulo fs
// mi serve nel controller
// const fs = require('fs');

// importo il controller
const tourController = require('./../controllers/tourController');

// array con i tour
// lo sposto nel controller
// const tours = JSON.parse(
//   fs.readFileSync(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     'utf-8'
//   )
// );

// per convenzione il router si chiama router
// const tourRouter = express.Router();
const router = express.Router();

// handler functions per i tour
// è meglio mettere le funzioni che vengono chiamate quando si chiama una rotta in file differenti: i controllers
// creo quindi una nuova folder controller e creo 2 file .js: tourController e userController
// const getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// const getTour = (req, res) => {
//   const tour = tours.find(
//     tour => tour.id === +req.params.id
//   );

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   return res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };

// const createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = { ...req.body, id: newId };
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     () => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };

// const updateTour = (req, res) => {
//   const tourIndex = tours.findIndex(
//     tour => tour.id === +req.params.id
//   );

//   if (tourIndex === -1) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   tours[tourIndex] = {
//     ...tours[tourIndex],
//     ...req.body,
//   };

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     () => {
//       res.status(200).json({
//         status: 'success',
//         data: {
//           tour: tours[tourIndex],
//         },
//       });
//     }
//   );
// };

// const deleteTour = (req, res) => {
//   const tourToDelete = tours.find(
//     tour => tour.id === +req.params.id
//   );

//   if (!tourToDelete) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }

//   const updateTours = tours.filter(
//     tour => tour.id !== +req.params.id
//   );

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(updateTours),
//     () => {
//       res.status(204).json({
//         status: 'success',
//         data: null,
//       });
//     }
//   );
// };

// tourRouter.route('/').get(getAllTours).post(createTour);
// richiamo le funzioni dall'oggetto tourController
// router.route('/').get(getAllTours).post(createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// tourRouter
router
  .route('/:id')
  //   .get(getTour)
  .get(tourController.getTour)
  //   .patch(updateTour)
  .patch(tourController.updateTour)
  //   .delete(deleteTour);
  .delete(tourController.deleteTour);

// a questo punto esporto il router per importarlo ed utilizzarlo dove voglio
module.exports = router;
