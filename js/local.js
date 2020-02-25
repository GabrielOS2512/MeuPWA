//function that gets the location and returns it
function getLocation() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Navegador Incompativel!");
  }
}
//function that retrieves the position
function showPosition(position) {
  var location = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude
  }
  var long = position.coords.longitude
  var lat = position.coords.latitude

  document.getElementById('long').value = long;
  document.getElementById('lat').value = lat;

  console.log(location);
}
//request for location
getLocation();

//Tratar erros depois
function locationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return "Usuário não deu permisão"
            break;
        case error.POSITION_UNAVAILABLE:
            return "Informações sobre a localização inválida."
            break;
        case error.TIMEOUT:
            return "Timedout"
            break;
        case error.UNKNOWN_ERROR:
            return "Erro desconhecido"
            break;
    }
}

//mostrar no mapa
