const fs = require('fs');
const superagent = require('superagent');

// costruisco un metodo che mi ritorni una Promise dopo aver letto un file
// accetta come parametro un file
const readFilePromise = file => {
  // ritorna un oggetto Promise disponibile dalla versione ES6 di JS
  // l'oggetto Promise nel suo constructor chiama un metodo chiamato Executor Function che vuole 2 parametri: resolve e reject
  // sono 2 funzioni, una viene eseguita in caso la Promise ha successo ed una in caso di errore
  // il codice eseguito nella Promise è asincrono
  // quando creo la Promise questa ha valore Pending
  return new Promise((resolve, reject) => {
    // leggo il file che passo alla funzione
    fs.readFile(file, (err, data) => {
      // in caso di errore restituisco un messaggio chiamando il metodo reject(), la Promise è rejected, disponibile tramite metodo .catch()
      if (err) {
        reject({ message: 'An error in reading occurred: ' + err.message });
      }
      // in caso vada tutto bene, tramite metdodo resolve() ritorno il contenuto del file nella Promise fullfilled, disponibile tramite metodo .then()
      resolve(data);
    });
  });
};

// costruisco un metodo che mi ritorni una promise dopo aver scritto un file
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject({ message: 'An error  in writing occurred: ' + err.message });
      }
      resolve('Url image saved in ' + file);
    });
  });
};

// riscrivo tutto chiamando il metodo readFilePromise() e gestendo il tutto tramite .then() e .catch()
// readFilePromise(`${__dirname}/dog.txt`)
//   .then(risultatoPromiseFullfilled => {
//     superagent
//       .get(
//         `https://dog.ceo/api/breed/${risultatoPromiseFullfilled}/images/random`
//       )
//       .then(res => {
//         // riscrivo chiamando il metodo writeFilePromise()
//         // fs.writeFile(
//         //   `${__dirname}/dog-img.txt`,
//         //   res.body.message,
//         //   'utf-8',
//         //   err => {
//         //     if (err) {
//         //       return console.log(err.message);
//         //     }
//         //     console.log('url image saved!');
//         //   }
//         // );
//         // provoco errore in scrittura passando un oggetto e non un stringa
//         // writeFilePromise(`${__dirname}/dog-img.txt`, res)
//         writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message)
//           .then(risolto => console.log(risolto))
//           .catch(err => console.log('Errore in scrittura: ' + err));
//       })
//       .catch(error => console.log('catch error: ' + error.message));
//   })
//   // gestisco l'errore della Promise che ho creato
//   // quello che ritornavo come errore era una stringa
//   .catch(err => {
//     console.log('Error Promise creata: ' + err);
//   });

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       fs.writeFile(
//         `${__dirname}/dog-img.txt`,
//         res.body.message,
//         'utf-8',
//         err => {
//           if (err) {
//             return console.log(err.message);
//           }
//           console.log('url image saved!');
//         }
//       );
//     })
//     .catch(error => console.log('catch error: ' + error.message));
// });

// riscrivo tutto concatenando i .then()
// il codice così scritto non assume la forma triangolare tipica delle callbacs innestate, ma è tutto dritto
// funziona anche senza return in ogni .then() perchè sono arrow function con una sola riga di esecuzione di codice, se aggiungessi un console.log del risultato dovrei mettere le graffe e fare il return del metodo che chiamo
readFilePromise(`${__dirname}/dog.txt`)
  // readFilePromise() mi ritorna una Promise quindi concateno un .then() in cui effettuo la request con superagent.get()
  .then(risultatoPromiseFullfilledLetturaFile => {
    console.log('prova console log per utilizzare il return');

    return superagent.get(
      `https://dog.ceo/api/breed/${risultatoPromiseFullfilledLetturaFile}/images/random`
    );
  })
  // superagent.get() mi ritorna una promise quindi con un altro .then() ne posso gestire il risultato e chiamo il metodo writeFilePromise()
  .then(res => writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message))
  // writeFilePromise() mi ritorna una Promise e quindi con un altro .then() loggo il risultato di scrittura
  .then(risultatoScritturaFile => console.log(risultatoScritturaFile))
  // il metodo .catch() alla fine intercetta un errore lanciato in qualsiasi .then()
  .catch(err => console.log(err.message));
