const express = require('express');

// IMPORT DEL CONTROLLER CON LE HANDLER FUNCTIONS
const tourController = require('../controllers/tourController');

// CREAZIONE OGGETTO ROUTER
const router = express.Router();

// PARAM MIDDLEWARE
router.param('id', tourController.checkId);

// DEFINIZIONE DELLE ROTTE E DELL'HANDLER FUNCTION DA RICHIAMARE
router
  .route('/')
  .get(tourController.getAllTours)
  // posso utilizzare più middleware per una rotta
  // vengono chiamati nell'ordine in cui li indico
  // creo un middleware che controlli se il body che contiene i dati per creare un nuovo tour contenga per forza le properties name e price
  // quindi sto creando una validation dei dati ingresso con name e price required
  // .post(tourController.createTour);
  .post(tourController.checkBodyReq, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// EXPORTS DELL'OGGETTO ROUTER CREATO
module.exports = router;
