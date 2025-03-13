// Tramite il comando node in console è possibile aprire Node REPL (Read Eval Print Loop)
// Qui è possibile scrivere codice JS direttamente nel terminale
// Per uscire da REPL: exit, .exit, ctrl + c o ctrl + D

// premendo Tab vengono visualizzate tutte le variabili globali disponibili in Node ed i suoi moduli

// _ l'underscore equivale all'ultimo risultato ottenuto (es. faccio 8 + 8 = 16 e dopo _ + 6 = 22, in questo caso _ è 16)

// digitando il nome di una classe col punto e poi tab ho tutti i metodi disponibili per quella classe (es. String.)

// se creo ad esempio un array e poi array. (prova = [1,2] e poi prova.) ho tutti i metodi disponibili che posso eseguire (ad esempio il .map())

// creo una const
// const hello = 'hello world';
// console.log(hello);

// normalmente linko il file .js nell'html
// in node lo posso runnare col comando node nome fileDaRunnare

// i metodi e le funzionalità di node sono all'interno di moduli
// per utilizzare un modulo devo utilizzare il metodo require() di node (è la stessa cosa del import and export di js, ma js è considerato un modulo all'interno di node)
// per esportare un modulo utilzzo module.exports: exports.nomeModulo = function () {}; in questo modo esporto come modulo una funzione che fa qualcosa, dove lo devo utilizzare lo importo col require: const nomeCheVoglio = require('path/nomeModulo');
// per lavorare con il FileSystem del pc ho bisogno del modulo fs di node, un oggetto contenente metodi e proprietà per leggere e scrivere i file nel pc
// lo salvo in una const
const fs = require('fs');
