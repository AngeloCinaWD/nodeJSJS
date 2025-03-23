// ho bisogno del modulo fs
const fs = require('fs');

// array con gli user
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    'utf-8'
  )
);

// handler functions
// le esporto tutte
const getAllUsers = (req, res) => {
  // exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

const getUser = (req, res) => {
  // exports.getUser = (req, res) => {
  const user = users.find(
    user => user._id === req.params.id
  );

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

const createUser = (req, res) => {
  // exports.createUser = (req, res) => {
  const newUser = {
    ...req.body,
    _id: `${new Date().getTime()}`,
  };

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    () => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    }
  );
};

const updateUser = (req, res) => {
  // exports.updateUser = (req, res) => {
  const userIndex = users.findIndex(
    user => user._id === req.params.id
  );

  if (userIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  };

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    () => {
      res.status(200).json({
        status: 'success',
        data: {
          user: users[userIndex],
        },
      });
    }
  );
};

const deleteUser = (req, res) => {
  // exports.deleteUser = (req, res) => {
  const userToDelete = users.find(
    user => user._id === req.params.id
  );

  if (!userToDelete) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updateUsers = users.filter(
    user => user._id !== req.params.id
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(updateUsers),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

// posso esportare un oggetto con tutte le const che voglio siano utilizzabili dove lo importo
// dove importo posso utilizzarle o importando l'intero oggetto oppure destrutturandolo con il nome esatto di ogni funzione esportata:
// const {
//   getAllUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } = require('./../controllers/userController');
// oppure esportare ogni funzione con un exports.funzione e dove importo o importo tutto l'oggetto e poi richiamare la funzione dove mi serve (const userController = require('./../controllers/userController'); userController.nomeFunzione), oppure come prima destrutturare l'oggetto e richiamare la funzione solo col suo nome dove mi serve
