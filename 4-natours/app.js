const { error } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();
const port = 7777;

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// creo una rotta get per fetchare i dati di un singolo tour
// l'id del tour viene passato dal client ed è variabile
// per definire un parametro variabile come path parameter utilizzo i 2 punti
// per fare in modo che un path parameter sia opzionale utilizzo il ? alla fine, es. :id?
app.get('/api/v1/tours/:id?', (req, res) => {
  // per avere i path params chiamo la proprietà params della request
  // non ho bisogno del middleware express.json() per accedere ai path params della request, ma solo per accedere ai query params che sono nel body della request

  console.log(typeof req.params.id);

  // per trovare un elemento in un array che contiene oggetti secondo il valore di una proprietà utilizzo il metodo .find()
  // questo ha una callback che chiama elemento per elemento e prende quello che soddisfa la condizione che gli passo
  // il parametro passato è di tipo stringa, nell'oggetto tour è number, quindi se metto uguaglianza stretta === non me lo trova, lo devo prima convertire in number
  const tour = tours.find(tour => tour.id === +req.params.id);

  // se non c'è nessun tour con l'id passato torno un errore 404 e messaggio not found
  if (!tour) {
    res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

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
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
