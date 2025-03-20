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
    // posso risolvere più promise insieme invece che una alla volta utilizzando il metodo Promise.all() con l'await
    // vale solo per le promises che non prendono dati da altre promises non precedentemente risolte
    // per farlo salvo direttamente le promises in const senza await
    const risultatoLettura = await readFilePromise(fileLettura);

    // const responseSuperAgent = await superagent.get(
    //   `https://dog.ceo/api/breed/${risultatoLettura}/images/random`
    // );
    const responseSuperAgent = superagent.get(
      `https://dog.ceo/api/breed/${risultatoLettura}/images/random`
    );
    const responseSuperAgent2 = superagent.get(
      `https://dog.ceo/api/breed/${risultatoLettura}/images/random`
    );
    const responseSuperAgent3 = superagent.get(
      `https://dog.ceo/api/breed/${risultatoLettura}/images/random`
    );

    // e poi le metto in un array passato come parametro al metodo Promise.all()
    // questo mi restituisce un array contenente in ordine le promises risolte
    const allResponses = await Promise.all([
      responseSuperAgent,
      responseSuperAgent2,
      responseSuperAgent3,
    ]);

    // creo un array con gli url di ogni immagine
    const imgsUrl = allResponses.map(res => res.body.message);

    console.log(imgsUrl);

    const risultatoScrittura = await writeFilePromise(
      fileScrittura,
      // responseSuperAgent.body.message
      // uso il .join() per creare 3 stringhe separate da un new line
      imgsUrl.join('\n')
    );

    return risultatoScrittura;
  } catch (err) {
    throw err.message;
  }
};

(async () => {
  try {
    console.log(`IIFE: ${await readAndWrite(fileDaLeggere, fileDaScrivere)}`);
  } catch (err) {
    console.log('Error in IIFE: ' + err);
  }
})();
