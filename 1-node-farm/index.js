// importo il FileSystem module
const fs = require('fs');

// leggo un file tramite readFileSync() (leggo il suo contenuto), api che lavora in modo sincrono
// primo argomento path del file che mi interessa
// il secondo sono options, devo specificare l'encoding del file altrimenti mi verrà restituito il file come Buffer (binary data directly)
// leggo il file di testo e salvo il contenuto in una const
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

// scrivo in un file
// \n new line: manda a capo
const textOut = `This is new text: today is ${Date.now()}.\nAvocado is: ${textIn}`;
console.log(textOut);
// per scrivere in un file utilizzo l'API di fs writeFileSync(), indico il path e cosa scrivere. se il file non esiste viene creato
// devo eseguire il comando e basta, non salvo nulla
fs.writeFileSync('./txt/output.txt', textOut);
console.log(fs.readFileSync('./txt/output.txt', 'utf-8'));
