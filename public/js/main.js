

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



var open;
function openProfile(){
  open = setTimeout(showProfile, 500);
}



function showProfile(){
var shown =  document.getElementById('menu').style.display = "block";
  document.getElementById('profile').style.background =  "url('/images/profile.png') no-repeat";
}

var close;
function closeProfile(){
  close = setTimeout(hideProfile, 400);
}

function hideProfile(){
  var hidden = document.getElementById('menu').style.display = "none";
  document.getElementById('profile').style.background =  "url('/images/profile_bw.png') no-repeat";
}
