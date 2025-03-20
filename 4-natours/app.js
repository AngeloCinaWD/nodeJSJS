const express = require('express');
const app = express();
const port = 4200;

// web API: costruiamo un'app che gestisca le request provenienti da un client
// la nostra app gira su un server
// un'API è un pezzo di software che può essere utilizzato da un altro pezzo di software, un mezzo di comunicazione tra software differenti (es. un'app in angular che da client comunica con il server, oppure in un'app stessa che utilizza API di altri moduli es. node ed il modulo http che ha le sue API, i suoi metodi)
// REST (REpresentational States Transfer), ci dà i principi secondo cui costruire le RESTful API:
// separare le API secondo resources logiche (cioè secondo tipi di informazioni che possono essere raggruppate secondo nome, es: tours, users, reviews)
// esporre le API secondo resources-based URLs (localhost:4200/users, users è l'ENDPOINT che chiamo tramite l'API, posso avere più endpoints es. addNewUser, getTourssByUser, getTours etc)
// utilizzare gli HTTP methods (get, post, put, patch, delete) per fare cose diverse, cioè il modo di indicare gli endpoints scritto prima è sbagliato perchè difficile da gestire e mantenere, devono essere i metodi http ad indicare quello che si vuole fare (get per fetchare dati, post per creare un qualcosa di nuovo, put per modificare, delete per cancellare la resource etc). Non ci devono essere verbi negli endpoint perchè l'action la indica il metodo http. Ad esempio voglio fetchare tutti gli users avrò una rotta con metodo get ed endpoint users, se volessi fetchare i dati di un determinato user metodo get endpoint /users/idUser. se volessi creare un nuovo utente metodo post /users, per modificare un utente metodo put o patch endpoint /users/idUser, se lo volessi eliminare metodo delete endpoint /users/userId. In tutti i casi quello che cambia è il metodo http, quello che definisce l'action, l'endpoint rimane sempre uguale. CRUD operations (Create, Read, Update, Delete resources). Se volessi fetchare tutti i tours di un determinato user metodo get /users/userId/tours. Per eliminare un tour di un determinato user metodo delete /users/userId/tours/tourId
// utilizzare il JSON format per comunicare tra app: formato molto semplice da comprendere e scrivere sia per gli umani che per le macchine. In un json object tutte le keys devono essere stringhe
// le API devono essere stateless: lo state deve essere gestito dal client che fa la request e non dal server, questo deve solo inviare dati, poi è il client a sapere cosa ci deve fare, ad es. se un utente è loggato o no. Un server non deve gestire una response ricordando cosa ha fatto con l'ultima request. Ad esempio se ho bisogno di avere dati paginati, devo mandare dal client la request col numero di pagina che mi serve, non deve essere il server ad avere in memoria l'ultima pagina chiesta.

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from the server side!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App is running on port ${port}...`);
});
