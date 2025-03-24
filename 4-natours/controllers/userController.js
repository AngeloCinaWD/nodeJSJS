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

const checkId = (req, res, next, val) => {
  const user = users.find(user => user._id === val);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

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
  const updatedUsers = users.filter(
    user => user._id !== req.params.id
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(updatedUsers),
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
  checkId,
};
