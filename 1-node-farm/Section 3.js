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
