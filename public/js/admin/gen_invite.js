
/* Invitation Generation link */
let invite_users_btn = document.querySelector('#invite_users_btn'),
    gen_link_model = document.querySelector('#gen_link_model'),
    get_link_close = document.querySelector('#get_link_close');

if(invite_users_btn){
    invite_users_btn.onclick = () =>{
        gen_link_model.style.display = 'block';
        admin_home_main_container.style.filter = 'blur(5px)'
        main_nav_bar.style.filter = 'blur(5px)';
    }    
}

get_link_close.onclick = () => {
    gen_link_model.style.display = 'none';
    admin_home_main_container.style.filter = 'blur(0px)'
    invitation_footer.style.filter = 'blur(0px)'
    main_nav_bar.style.filter = 'blur(0px)';
}
