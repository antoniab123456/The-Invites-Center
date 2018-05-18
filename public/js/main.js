
function openModal(){
   document.getElementById('modal').style.display = "block";
   document.getElementById('blur').style.filter = "blur(5px)";
}

function closeModal(){
  document.getElementById('modal').style.display = "none";
   document.getElementById('blur').style.filter = "blur(0px)";
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
 successVar = setTimeout(successFunc, 1500);
}

function successFunc(){
  document.getElementById('success').style.display = "none";

}




var profile = document.getElementById('profile');
var menu = document.getElementById('menu');

 profile.addEventListener('mouseover', openMenu);
 window.addEventListener('click', closeMenu);

function openMenu(){
  menu.style.display = "block";
  profile.style.background = "url('/images/profile.png') no-repeat";
}

function closeMenu(e){
  if(e.target == menu){
    menu.style.display = "none";
    profile.style.background = "url('/images/profile_bw.png') no-repeat";
 }
}
