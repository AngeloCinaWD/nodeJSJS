const express = require('express');

// IMPORT DEL CONTROLLER CON LE HANDLER FUNCTIONS
const tourController = require('./../controllers/tourController');

// CREAZIONE OGGETTO ROUTER
const router = express.Router();

// PARAM MIDDLEWARE: sono dei middleware che runnano solo per alcuni parametri, quindi quando ci sono determinati parametri nell'url.
// ad esempio per la rotta con /:id abbiamo un path parameters id
// creo un param middleware dall'oggetto router con metodo .param(), questo middleware ha un quarto argomento che è il valore del parametro in ingresso con la request
// questo middleware è specifico per le request indirizzate alle rotte per i tour perchè è definito nel router dei tour, non funzionerebbe anche per gli user
// router.param('id', (req, res, next, val) => {
//   console.log(val);
//   next();
// });
// richiamo la funzione checkId che ho definito ed implementato nel controller, viene chiamata prima di tutte le rotte per un determinato url e che hanno un determinato path param
router.param('id', tourController.checkId);

// DEFINIZIONE DELLE ROTTE E DELL'HANDLER FUNCTION DA RICHIAMARE
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

// EXPORTS DELL'OGGETTO ROUTER CREATO
module.exports = router;
