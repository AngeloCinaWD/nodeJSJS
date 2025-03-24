const fs = require('fs');

// ARRAY CON GLI USER
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/users.json`,
    'utf-8'
  )
);

// EXPORT DELLE FUNZIONI IN UN OGGETTO
// NELL'IMPORT POSSO IMPORTARE UN OGGETTO CON PROPRIETA' CON NOME DELLA FUNZIONE O TRAMITE DESTRUTTURAZIONE DELL'OGGETTO AVERE TANTE CONST PER OGNI FUNZIONE
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

const getUser = (req, res) => {
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
