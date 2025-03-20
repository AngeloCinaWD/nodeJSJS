const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject({ message: 'An error in reading occurred: ' + err.message });
      }
      resolve(data);
    });
  });
};

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

// readFilePromise(`${__dirname}/dog.txt`)
//   .then(risultatoPromiseFullfilledLetturaFile =>
//     superagent.get(
//       `https://dog.ceo/api/breed/${risultatoPromiseFullfilledLetturaFile}/images/random`
//     )
//   )
//   .then(res => writeFilePromise(`${__dirname}/dog-img.txt`, res.body.message))
//   .then(risultatoScritturaFile => console.log(risultatoScritturaFile))
//   .catch(err => console.log(err.message));

// un altro modo per gestire le promises è utilizzare lo statement async await
// si crea un metodo dichiarato async (cioè il metodo eseguirà del codice asincrono)
// all'interno del metodo si salvano i risultati delle promises in const dichiarate await, cioè prima di eseguire il codice che viene dopo si aspetta che la promise venga risolta e diventi fullfilled, il risulato della promise è salvato nella const che ho dichiarato
// un metodo dichiarato async ritorna una promise

const fileDaLeggere = `${__dirname}/dog.txt`;
const fileDaScrivere = `${__dirname}/dog-img.txt`;

const readAndWrite = async (fileLettura, fileScrittura) => {
  // per gestire gli errori si utilizza il try catch block di JS
  // gli dico di provare ad eseguire qualcosa
  try {
    const risultatoLettura = await readFilePromise(fileLettura);
    const responseSuperAgent = await superagent.get(
      `https://dog.ceo/api/breed/${risultatoLettura}/images/random`
    );
    const risultatoScrittura = await writeFilePromise(
      fileScrittura,
      responseSuperAgent.body.message
    );
    return risultatoScrittura;
  } catch (err) {
    // in caso di un errore nell'esecuzione del codice in try, in una qualsiasi delle promise, catturo l'errore e lo ritorno
    return err.message;
  }
};

// sto utilizzando il .then() perchè il metodo readAndWrite() è async e quindi ritorna una promise
// se facessi così: console.log(readAndWrite(fileDaLeggere, fileDaScrivere)) avrei come log Promise: pending
// il .catch() mi va a prendere un eventuale errore di una delle promise chiamate nel metodo async
// se utilizzo il try catch block nel metodo async che mi fa il return dell'error non utilizzo il .catch() qui
readAndWrite(fileDaLeggere, fileDaScrivere)
  // utilizzando il try catch block il metodo ritorna sempre qualcosa che viene passato al .then()
  // vuol dire che la promise che ritorno è sempre fullfilled e mai rejected
  .then(risultato => console.log('La promise è fullfilled: ' + risultato));

// .catch(err => console.log(err.message));
