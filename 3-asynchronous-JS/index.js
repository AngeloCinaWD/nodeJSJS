const fs = require('fs');
// installiamo il package superagent via npm, per le chiamate ajax
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         return console.log(err.message);
//       }
//       console.log(res.body.message);
//       fs.writeFile(
//         `${__dirname}/dog-img.txt`,
//         res.body.message,
//         'utf-8',
//         err => {
//           console.log('url image saved!');
//         }
//       );
//     });
// });

// in questo modo stiamo eseguendo codice asincrono ogni volta che viene chiamata una callback, in ogni callback viene fatto qualcosa, questo modo di scrivere porta a quello che viene chiamato Callbacks Hell (callbacks innestate una nell'altra)
// questo modo di scrivere codice risulta poco chiaro ed illegibile man mano che aumenta il numero delle callbacks innestate
// per evitarlo si possono utilizzare le Promises di JS (A promise represents the eventual completion (or failure) of an asynchronous operation and its resulting value.)
// il metod .get() di superagent ritorna una promise, se invece voglio gestire con una promise qualcosa come il fs.writefile() non con callback ma con promise devo crearla io la promise, perchè questi metodi non la ritornano di default
// una promise all'inizio ha valore pending (non contiene nessun dato) perchè conterrà la risposta di un qualcosa che non è ancora avvenuto, un qualcosa di asincrono

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  superagent
    // dato che il metodo get ritorna una promise, questa viene già creata ma ha valore pending, non contiene nessun dato
    // un oggetto Promise contiene diverse metodi: il .then() viene invocato quando la request va a buon fine e la promise assume valore fullfilled. Il metodo .catch() viene invocato in caso di fallimento della request e la promise assume valore rejected
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    // chiamata con errore nell'url che viene catchato dal .catch()
    // .get(`https://dog.ceo/api/bre/${data}/images/random`)
    // una promise fullfilled viene gestita col metodo .then() che ha una callback che viene eseguita quando arriva la risposta dal server
    // il parametro della callback è la response
    .then(res => {
      // aspetto che arrivi la response e salvo l'url dell'image in un file di testo
      // la promise passa da pending a fullfilled (resolved) quando arriva la risposta
      fs.writeFile(
        `${__dirname}/dog-img.txt`,
        res.body.message,
        'utf-8',
        err => {
          if (err) {
            return console.log(err.message);
          }
          console.log('url image saved!');
        }
      );
    })
    // il metodo .then() non fa nulla se c'è un errore nella chiamata perchè viene invocato solo se la request è andata a buon fine
    // per gestire gli errori abbiamo bisogno di un altro metodo il .catch() che viene conacatenato agli eventuali .then() e viene invocato in caso di fallimento della request
    // in caso di errore il valore della promise è rejected
    .catch(error => console.log('catch error: ' + error.message));
  // .end((err, res) => {
  //   if (err) {
  //     return console.log(err.message);
  //   }
  //   console.log(res.body.message);
  // fs.writeFile(
  //   `${__dirname}/dog-img.txt`,
  //   res.body.message,
  //   'utf-8',
  //   err => {
  //     console.log('url image saved!');
  //   }
  // );
  // });
});
