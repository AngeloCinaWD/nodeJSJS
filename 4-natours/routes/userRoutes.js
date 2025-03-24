const express = require('express');

// IMPORT DEL CONTROLLER CON LE HANDLER FUNCTIONS
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

// CREAZIONE OGGETTO ROUTER
const router = express.Router();

// DEFINIZIONE DELLE ROTTE E DELL'HANDLER FUNCTION DA RICHIAMARE
router.route('/').get(getAllUsers).post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// EXPORTS DELL'OGGETTO ROUTER CREATO
module.exports = router;
