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

const fileDaLeggere = `${__dirname}/dog.txt`;
const fileDaScrivere = `${__dirname}/dog-img.txt`;

const readAndWrite = async (fileLettura, fileScrittura) => {
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
    // se voglio che il metodo async mi lanci un errore in caso di errore, devo utilizzare lo statement throw
    // è bloccante quindi non serve il return
    // return err.message;
    throw err.message;
  }
};

// utilizzando il throw la promise che viene ritornata dal metodo async non sarà fullfilled in caso di errore ma sarà rejected, quindi posso catchare l'errore col metodo .catch()
readAndWrite(fileDaLeggere, fileDaScrivere)
  .then(risultatoScrittura =>
    console.log('Promise fullfilled: ' + risultatoScrittura)
  )
  .catch(err => console.log('Promise rejected: ' + err));

// in questo modo stiamo gestendo un metodo async await con il .then() ed il .catch()
// per utilizzare sempre async await si possono utilizzare le IIFE
// cioè funzioni invocate immediatamente da JS, sono dette anche funzioni anonime autoeseguenti (cioè vengono invocate da JS)
// per definire una IIFE si mette la funzione tra parentesi tonde e viene invocata normalmente con le parentesi tonde (funzione da eseguire)()
// dichiaro la IIFE async e quello che deve essere eeguito await
(async () => {
  // utilizzo il try catch block per gestire un eventuale error+
  try {
    console.log(`IIFE: ${await readAndWrite(fileDaLeggere, fileDaScrivere)}`);
  } catch (err) {
    console.log('Error in IIFE: ' + err);
  }
})();
