const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `This is new text: today is ${new Date()}.\nAvocado is: ${textIn}`;
console.log(textOut);

fs.writeFileSync('./txt/output.txt', textOut);
console.log(fs.readFileSync('./txt/output.txt', 'utf-8'));

// non-blocking code, asynchronous way
// questo metodo accetta 3 parametri: il path al file, l'encoding e la callback da eseguire
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
  // la callback ha 2 parametri: il primo è l'eventuale errore ed il secondo i dati letti dal file
  console.log('1😶: ' + data);
  // chiamo di nuovo il metodo .readFile(), leggo il file read-this.txt, read-this è il contenuto del file start.text, quindi quando ho letto il primo file leggo il secondo
  fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
    console.log('2😍: ' + data2);
    // leggo un altro file
    fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
      console.log('3: ' + data3);
      // dopo che ho letto tutti i file ne creo uno nuovo col metodo asincrono writeFile()
      fs.writeFile('./txt/nuovo.txt', data + data2 + data3, 'utf-8', err => {
        // una volta creato lo leggo
        fs.readFile('./txt/nuovo.txt', 'utf-8', (err, data4) => {
          console.log('4: ' + data4);
        });
      });
    });
  });
});
