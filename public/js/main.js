

function openModal(){
   document.getElementById('modal').style.display = "block";
}

function closeModal(){
  document.getElementById('modal').style.display = "none";
}

var errorVar;

function closeThis(){
   errorVar = setTimeout(messageFunc, 1500);
}

function messageFunc(){
  document.getElementById('message').style.display = "none";
}

var successVar;

function closeSuccess(){
 successVar = setTimeout(messageFunc, 1500);
}


function successFunc(){
  document.getElementById('success').style.display = "none";
}
