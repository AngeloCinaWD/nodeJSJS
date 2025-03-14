const fs = require('fs');

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textIn);

const textOut = `This is new text: today is ${Date.now()}.\nAvocado is: ${textIn}`;
console.log(textOut);

fs.writeFileSync('./txt/output.txt', textOut);
console.log(fs.readFileSync('./txt/output.txt', 'utf-8'));

// questo codice viene eseguito in modo sincrono, linea dopo linea, quindi fino a che non è stato letto e salvato il contenuto di un file l'esecuzione del codice non va avanti. Differentemente lavora il codice in modo asincrono
// ad esempio se utilizzassi il metodo readFile che lavora in modo asincrono, il contenuto del file verrebbe letto e salvato in background, senza bloccare l'esecuzione del resto del codice
// questi metodi hanno una callback in cui viene specificato cosa fare quando l'operazione in background è terminata (nel caso di readFile() la lettura di un file)
