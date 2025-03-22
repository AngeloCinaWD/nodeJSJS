const morgan = require('morgan');
const express = require('express');
const fs = require('fs');
const app = express();

// app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ARRAY CON I TOUR
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    'utf-8'
  )
);

// ARRAY CON GLI USERS
const users = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/users.json`,
    'utf-8'
  )
);

// HANDLER FUNCTIONS
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
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

const getTour = (req, res) => {
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

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
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

const createUser = (req, res) => {
  // per creare l'id dello user nuovo creo un timestamp e lo trasformo in stringa
  const newUser = {
    ...req.body,
    _id: `${new Date().getTime()}`,
  };

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
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

const updateTour = (req, res) => {
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
    `${__dirname}/dev-data/data/tours-simple.json`,
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
    `${__dirname}/dev-data/data/users.json`,
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

const deleteTour = (req, res) => {
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
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updateTours),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
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
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(updateUsers),
    () => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// API ROUTES
//  TOURS
app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);
// USERS
app
  .route('/api/v1/users')
  .get(getAllUsers)
  .post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

// SERVER
const port = 7777;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
