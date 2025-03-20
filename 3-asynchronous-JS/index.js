const fs = require('fs');
// installiamo il package superagent via npm, per le chiamate ajax
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
  console.log(data);
  // una volta letto il testo inviamo una request GET per ricevere una immagine random secondo la razza del cane
  // per inviare la request si utilizza il metodo .end() che ha una callback con errorre e response
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      // in caso di errore lo loggo e blocco tutto col return
      if (err) {
        return console.log(err.message);
      }

      // nel body della response trovo un oggetto con message (l'url dell'immagine) e status (stringa)
      console.log(res.body.message);
      // salvo l'url dell'immagine in un nuovo file di testo
      fs.writeFile(
        `${__dirname}/dog-img.txt`,
        res.body.message,
        'utf-8',
        err => {
          console.log('url image saved!');
        }
      );
    });
});
