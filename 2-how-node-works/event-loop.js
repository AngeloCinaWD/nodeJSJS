const fs = require('fs');

// con delay 0 la callback viene eseguita subito
// eseguita per seconda
setTimeout(() => console.log('timer 1 finished'), 0);

// metodo deprecato da molti browser
// eseguita per terza
setImmediate(() => console.log('immediate 1 finished'));

// leggo un file
// riguarda una callback I/O
// eseguita per quarta
fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  console.log('I/O finished');

  // eseguite per ultime, essendo all'interno di una callback vengono gestite nell'event-loop, non top level code
  setTimeout(() => console.log('timer 2 finished'), 0);
  setTimeout(() => console.log('timer 3 finished'), 3000);
  setImmediate(() => console.log('immediate 2 finished'));
});

// top level code
// eseguita per prima
console.log('hello from top level code');

// l'ordine di esecuzione è dato dal fatto che il single thread esegue prima il top level code, poi i moduli, poi parte l'event-loop
