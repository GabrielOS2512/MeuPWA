function sum() {
  var n1=parseFloat(document.getElementById("n1").value);
  var n2=parseFloat(document.getElementById("n2").value);
  var soma = n1 + n2 ;
  document.getElementById('res').value = soma;
}

function sub() {
  var n1=parseFloat(document.getElementById("n1").value);
  var n2=parseFloat(document.getElementById("n2").value);
  var sub = n1 - n2 ;
  document.getElementById('res').value = sub;
}

function mult() {
  var n1=parseFloat(document.getElementById("n1").value);
  var n2=parseFloat(document.getElementById("n2").value);
  var multi = n1 * n2 ;
  document.getElementById('res').value = multi;
}

function div() {
  var n1=parseFloat(document.getElementById("n1").value);
  var n2=parseFloat(document.getElementById("n2").value);
  var div = n1 / n2 ;
  document.getElementById('res').value = div;
}
