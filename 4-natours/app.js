const express = require('express');
const fs = require('fs');
const app = express();
const port = 4200;

// creo un middleware, una funzione che mi permette di modificare i dati che arrivano con la request
// si chiama middleware perchè è in mezzo fra la request e la response
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
// tramite app.use() è una funzione che mi permette di gestire un middleware
// express.json() This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// con questo middleware i data nel body della request vengono aggiunti alla request object
// in questo modo avrò la possibilità di chiamare req.body nelle rotte, altrimenti chiamandolo avrò un undefined
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

// rotta con metodo post per aggiungere un tour
// l'url è lo stesso della chiamata get, ma cambia il metodo http
app.post('/api/v1/tours', (req, res) => {
  // per avere disponibili i dati inviati tramite request abbiamo bisogno di un middleware
  console.log(req.body);

  // dato che voglio creare un nuovo tour ho bisogno di un nuovo id
  // lo creo aggiungendo 1 all'id dell'ultimo tour nell'array tours
  const newId = tours[tours.length - 1].id + 1;

  // creo il nuovo oggetto tour, devo aggiungere la proprietà id all'oggetto che arriva con la request
  // lo faccio o con Object.assign() che mi permette di mergiare 2 oggetti
  // o con lo spread operator di JS ...
  const newTour = { ...req.body, id: newId };

  // pusho il nuovo tour nell'array tours
  tours.push(newTour);

  // riscrivo il file tours-simple.json in modo da averlo aggiornato con i nuovi tour che creo
  // per farlo lo devo riscrivere in modo asincrono in modo da non bloccare l'esecuzione del codice
  // tours è un array js, per scriverlo nel file che è un .json lo devo trasformare quindi in una stringa, lo faccio tramite metodo JSON.stringify()
  // una volta scritto il file invio una response contenente il nuovo tour aggiunto
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    () => {
      // status code 201 means the new resource was created with success
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  // res.send('done');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
