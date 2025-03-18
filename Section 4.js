// Lecture30. Node, V8, Libuv and C++

/*
    Node per lavorare dipende da diverse librerie. le 2 più importanti: V8 e libuv.
    V8: scritto in js e C++, permette a node di capire il javascript. Converte il codice JS nel codice macchina in cui utilizziamo node
    libuv: scritto in C++ consente a node l'accesso al fyle sistem del computer, al networking ed altro. Inoltre gestisce l'event loop (esegue semplici compiti come l'esecuzione delle callback) ed il thread pool (compiti più pesanti come l'accesso ai files o la compressione)
    Quindi Node è scritto in JS ed in C++.
    Node ci permette di accedere alle funzionalità di queste librerie in puro JS
*/
