var invite = document.getElementById('btn4');
var invitationModel = document.getElementById('invitationModel');
var closeInvite = document.getElementById('closeinvitation');

invite.addEventListener('click', diplayInvitation);
closeInvite.addEventListener('click', closeInvitation);

function diplayInvitation() {
  invitationModel.style.display = "block";
}

function closeInvitation() {
    invitationModel.style.display = "none";
}
