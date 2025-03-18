// LECTURE25. An Overview of How the Web Works

// request <-> response model (client-server architecture): un client invia una request ad un server che risponde
/*
    domain name: nome facile da ricordare, non è il reale indirizzo del server. Il domain name viene convertito tramite DNS (Domain Name Server) nel reale indirizzo che è un IP (es. 216.58.211.206)
    un IP address ha una porta 216.58.211.206:443 che indica dove sta runnando uno specifico service sul server
    dopo che il Domain name è stato convertito dal DNS si ha la connessione col server, TCP/IP socket connection
    TCP: Transmission Control Protocol, protocollo di trasmissione dati (set di regole), ha il compito di dividere i dati inviati in tanti pacchetti e riassemblarli al momento di arrivo
    IP: Internet Protocol, protocollo di trasmissione dati (set di regole), ha il compito di far arrivare i dati a destinazione
    definiscono insieme come i dati viaggiano attraverso il web 
    a request effettuata dal client è una HTTP REQUEST, HyperText Transfer Protocol, protocollo di trasmissione dati (set di regole). Ci dice che si ha una comunicazione di tipo request-response
    Una request è composta da: start line, header ed eventuale body
    La start line di una request contiene l'HTTP method, il request target e l'http version (es: GET /maps HTTP/1.1)
    L'header contiene diverse informazioni che possono variare in base alla request effettuata (ad es. l'host, lo user-agent, l'accept-language...)
    Il Body è presente se inviamo dati al server tramite rquest, ad esempio col metodo http POST
    Il server risponde con una HTTP RESPONSE, molto simile alla request come struttura
    La start line di una response contiene l'http version, lo status code (es: 200, 404 etc) ed uno status message (es. HTTP/1.1 200 OK)
    Il body contiene i dati mandati in risposta (es. l'html da renderizzare, un json etc)

    Quando i dati arrivano al client vengono interpretati attraverso HTML, CSS e JS
*/

// LECTURE27. Front-End vs. Back-End Web Development
/*
    In generale per Fronte-End ci si riferisce a tutto quello che accade nel web browser, quindi design e building, tutto ciò che è visibile allo user.
    Per Back-End ci si riferisce a tutto quello che è invisibile allo user. Un web server non è altro che un computer che ha installato un HTTP Server, cioè qualcosa in grado di capire le request che arrivano e gestire le response (è lui che comunica col browser).
    Nel web server sono salvati i files che servono per costruire una pagina web (immagini, html, css, js etc) e un'app che gestisce questi dat e quelli possibilmente salvati in un database (contiene i dati per riempire i files tipo le stringhe dei titoli, i dati dello user etc) 
    NodeJS è un'app che ci aiuta a gestire il nostro web server e comunica con un database tipo MongoDB
 */

// LECTURE28. Static vs Dynamic vs API
/*
    Static WebSites: il server risponde coi files HTML, CSS e JS per costruire il sito nel browser. Non ci sono app che gestiscono i dati che vengono inviati (invia Static Files secondo una determinata request)
    
    Dynamic WebSites: gestiscono il processo SSR (Server Side Rendering), c'è un'app (ad esempio NodeJS) che prende i dati da un db e li usa per costruire i template (HTML, CSS e JS) che vengono restituiti al browser. I dati possono cambiare ad ogni request (ad esempio quando apro una pagina di tweeter trovo nuovi tweet che sono stati salvati nel db). Costruisce dynamic pages.

    API: un API WebSite è sempre dinamico (detto CSR, Client Side Rendered), ma quello che invia al browser sono solo dati, solitamente in formato JSON e non l'intero website. Non vengono inviati file HTML, CSS e JS. Il website viene assemblato nel Client, di solito utilizzando framework come Angular, React o Vue (i templates vengono assemblati nel browser e avviene l'Hydration). I dati restituiti da una API possono essere utilizzati da chiunque la chiami, chiunque ne fa richiesta, non solo un browser, ma anche un'app android, ios, una desktop-app. Questo non avviene con il SSR o con uno static websites perchè solo un browser è in grado di gestire i templates HTML, CSS e JS.
*/
