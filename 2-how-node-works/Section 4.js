// Lecture30. Node, V8, Libuv and C++

/*
    Node per lavorare dipende da diverse librerie. le 2 più importanti: V8 e libuv.
    V8: scritto in js e C++, permette a node di capire il javascript. Converte il codice JS nel codice macchina in cui utilizziamo node
    libuv: scritto in C++ consente a node l'accesso al fyle sistem del computer, al networking ed altro. Inoltre gestisce l'event loop (esegue semplici compiti come l'esecuzione delle callback) ed il thread pool (compiti più pesanti come l'accesso ai files o la compressione)
    Quindi Node è scritto in JS ed in C++.
    Node ci permette di accedere alle funzionalità di queste librerie in puro JS
*/

// Lecture31. Processes, Threads and the Thread Pool

/*
    Process: programma in esecuzione, node ha una classe Process che ci permette di accedere al processo in esecuzione
    Thread: sequenza di istruzioni, Node lavora in single thread, quindi è facilmente bloccabile se c'è qualche errore. Sequenza di esecuzione del thread: Inizializzazione del programma -> esecuzione top-level code (proprietà e metodi legati all'oggetto globale) -> caricamento dei moduli -> registro delle callback -> inizia l'event-loop. L'event loop non riesce a gestire tutti i tasks e quindi alcuni (quelli più pesanti) vengono dirottati al thread pool, un'architettura fornita da libuv che gestisce 4 Thread separati. Questo avviene per evitare che tasks difficili e pesanti possano bloccare l'esecuzione del programma che runna nel single thread.
*/

// Lecture32. The Node.js Event Loop

/*
    Tutto il codice all'interno delle funzioni di callback è considerato "Non top level code". Le callback vengono gestite dall'event-loop tramite Event-driven architecture: evento emesso -> raccolto dall'event loop -> callback eseguita
    Le callback vengono gestite dall'event loop in diverse fasi, secondo una Callback Queue, cioè secondo un ordine di tipo di callback (quelle che riguardano i timer nella prima fase), poi quelle che riguardano l'I/O (seconda fase, quelle che riguardano il sistema, come file e networking). La terza fase è per le setImmediate callbacks (quelle immediatamente dopo le I/O). Nella quarta fase vengono gestite le Close callbacks, quelle che riguardano la chiusura o lo spegnimento del processo.
*/
