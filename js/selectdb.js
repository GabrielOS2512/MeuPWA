// Abrir o BD
var DBOpenRequest = window.indexedDB.open("TesteBD", 1);

DBOpenRequest.onerror = function(event) {
  document.getElementById("lista").innerHTML += '<li class="list-group-item">Erro ao carregar o BD.</li>';
};

//Se sucesso
DBOpenRequest.onsuccess = function(event) {
  document.getElementById("lista").innerHTML += '<li class="list-group-item">BD inicializado.</li>';
  db = DBOpenRequest.result;
  var objectStore = db.transaction("Pessoa").objectStore("Pessoa");

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      console.log('Select');
      document.getElementById("tabela").innerHTML += '<tr> <td>'+ cursor.value.nome +'</td> <td>'+ cursor.value.idade +'</td> <td>'+ cursor.value.cidade +'</td> </tr>'
      cursor.continue();
    }
    else {
        console.log('Final');
    }
  };
};
