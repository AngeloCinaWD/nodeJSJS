const app = require('./app');

// il server in questo modo non viene più avviato da nodemon, perchè non si trova più l'indicazione di farlo partire nel file app.js
// va creato un comando apposta negli scripts di npm e nodemon non chiama più app.js ma server.js che si porterà dentro anche app.js tramite require

const port = 7777;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
