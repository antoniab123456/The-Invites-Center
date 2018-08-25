
/* Profile settings menu display*/
let profile_icon = select('#profile_icon');
let profile_settings_modal = select('#profile_settings_modal');


let openProfileMenu = () => {
    setDisplay(profile_settings_modal, 'block');
    profile_icon.style.background = "url('/images/profile.png') no-repeat";
}

executeEvent(profile_icon, openProfileMenu);

if(profile_icon !== null){
    window.onclick = (e) => { 
        if(e.target == profile_settings_modal){
            setDisplay(profile_settings_modal, 'none');
            profile_icon.style.background = "url('/images/profile_bw.png') no-repeat";
        }
    } 
}