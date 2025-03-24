// REQUIRE DELLA CONFIGURAZIONE DELL'APP ALL'AVVIO DEL SERVER TRAMITE NODEMON
const app = require('./app');

const port = 7777;
app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
