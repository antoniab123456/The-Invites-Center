var errorVar;
var successVar;

function closeThis(){
   errorVar = setTimeout(messageFunc, 1500);
}

function messageFunc(){
  document.getElementById('message').style.display = "none";
}

function closeSuccess(){
 successVar = setTimeout(messageFunc, 1500);
}

function successFunc(){
  document.getElementById('success').style.display = "none";
}
