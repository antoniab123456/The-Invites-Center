
let profile_icon = document.querySelector('#profile_icon'),
    profile_icon_picture = document.querySelector('#profile_icon_picture');
    profile_settings_modal = document.querySelector('#profile_settings_modal');


/* Profile settings menu display*/
if(profile_icon_picture){
    profile_icon_picture.onclick = () =>{
        profile_settings_modal.style.display = 'block';
        profile_settings_modal.style.marginTop = '5px';
    }
}

if(profile_icon){
    profile_icon.onclick = () => {
        profile_settings_modal.style.display = 'block';
        profile_icon.style.background = "url('/images/profile.png') no-repeat";
    }
}
 


