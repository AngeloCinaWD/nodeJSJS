// installo express con npm i express
// mi istalla la più recente versione 4, per istallare la 5 devo runnare npm i express@5
// salvo express in una const
const express = require('express');

// per utilizzare express è convenzione salvare il metodo express() in una const app
// questo metodo mi permette di accedere alle funzionalità di express
const app = express();

// per definire una route utilizzo il metodo con il nome del metodo HTTP che mi interessa per quella rotta (ad es. per una rotta GET utilizzo app.get())
// al metodo vanno passai 2 parametri, il primo è l'url ed il secondo la callback da chiamare con i 2 parametri request e response
app.get('/', (req, res) => {
  // posso inviare una response definendo prima lo status col metodo .status() e poi concatenando il .send()
  //   res.status(200).send('Hello from the server side!');
  // per inviare un json utilizzo il metodo .json() (mi converte in json quello che gli passo)
  // express mette gli headers in automatico, nel caso del json nell'header ci sarà content-type application/json
  res.status(200).json({ message: 'Hello from the server side!' });
});
// porta su cui avviare il server
const port = 4200;
// avvio un server con express
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
