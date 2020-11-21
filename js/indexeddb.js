// Abrir o BD
var DBOpenRequest = window.indexedDB.open("TesteBD", 1);

//Se der um erro no bd
DBOpenRequest.onerror = function(event) {
  document.getElementById("lista").innerHTML += '<li class="list-group-item">Erro ao carregar o BD.</li>';
};

//Se abrir corretamente
DBOpenRequest.onsuccess = function(event) {
  document.getElementById("lista").innerHTML += '<li class="list-group-item">BD inicializado.</li>';

  // guarda o resultado do bd aberto na variavel
  // db, que sera usada para fazer muitas operacoes
  db = DBOpenRequest.result;

};
// This event handles the event whereby a new version of
// the database needs to be created Either one has not
// been created before, or a new version number has been
// submitted via the window.indexedDB.open line above

//Criar "tabela"
DBOpenRequest.onupgradeneeded = function(event) {
  var db = event.target.result;

  db.onerror = function(event) {
    note.innerHTML += '<li class="list-group-item">Erro ao carregar o BD.</li>';
  };

  // Create an objectStore for this database using
  // IDBDatabase.createObjectStore
  //Nova tabela com a chave id
  var objectStore = db.createObjectStore("Pessoa", {keyPath: 'id', autoIncrement: true});

  // Criar novo index para busca/insert
  objectStore.createIndex("nome", "nome", { unique: false });
  objectStore.createIndex("idade", "idade", { unique: false });
  objectStore.createIndex("cidade", "cidade", { unique: false });

  document.getElementById("lista").innerHTML += '<li class="list-group-item">Object store criado.</li>';
};

function insert() {
  console.log('Inserir');
  //Inserir no BD

  var n = document.getElementById("nome").value;
  var i = document.getElementById("idade").value;
  var c = document.getElementById("cidade").value;

  var novo = [ { nome: n, idade: i, cidade: c } ];

  var transaction = db.transaction(["Pessoa"], "readwrite");

  // report on the success of opening the transaction
  transaction.oncomplete = function(event) {
    document.getElementById("lista").innerHTML += '<li>Transaction completed: database modification finished.</li>';
    alert("Nova Inserção Concluida");
  };


  transaction.onerror = function(event) {
  document.getElementById("lista").innerHTML += '<li>Transaction not opened due to error.</li>';
  };

  // create an object store on the transaction
  var objectStore = transaction.objectStore("Pessoa");

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(novo[0]);

  objectStoreRequest.onsuccess = function(event) {
    // report the success of the request (this does not mean the item
    // has been stored successfully in the DB - for that you need transaction.oncomplete)
    document.getElementById("lista").innerHTML += '<li>Request successful.</li>';
  };
}
