
let err_modal = document.querySelectorAll('.err_modal'),
    success_modal = document.querySelectorAll('.success_modal');


/* Hide error/success models after they appear */
if(err_modal){
    for(const err of err_modal){
        if(err.style.display == 'block'){
            main_nav_bar.style.filter = 'blur(5px)';
            invitation_footer.style.filter = 'blur(5px)';
            setBlur(admin_home_main_container, 5);
            setBlur(notfound_main_container, 5);
            setBlur(pass_change_main_container, 5);
            setBlur(index_container, 5);
        }

        setTimeout(() => {
            err.style.display = 'none';
        }, 3000);
    }
}

for(const succ of success_modal){
    if(succ.style.display == 'block'){
        main_nav_bar.style.filter = 'blur(5px)';
        invitation_footer.style.filter = 'blur(5px)';
        setBlur(admin_home_main_container, 5);
        setBlur(notfound_main_container, 5);
        setBlur(pass_change_main_container, 5);
        setBlur(index_container, 5);
    }
    setTimeout(() => {
        succ.style.display = 'none';
    }, 3000);
}
 

/* Flash error/success messages */
if(err_modal !== null || success_modal !== null){
    window.onclick = (e) =>{
        for(const err of err_modal){
            if(e.target == err){
                err.style.display = 'none';
                main_nav_bar.style.filter = 'blur(0px)';
                invitation_footer.style.filter = 'blur(0px)';
                setBlur(admin_home_main_container, 0);
                setBlur(notfound_main_container, 0);
                setBlur(pass_change_main_container, 0);
                setBlur(index_container, 0);
            }
        }
        for(const succ of success_modal){
            if(e.target == succ){
                succ.style.display = 'none';
                main_nav_bar.style.filter = 'blur(0px)';
                invitation_footer.style.filter = 'blur(0px)';
                setBlur(admin_home_main_container, 0);
                setBlur(notfound_main_container, 0);
                setBlur(pass_change_main_container, 0);
                setBlur(index_container, 0);
            }    
        }
        if(e.target == profile_settings_modal){
            profile_settings_modal.style.display = 'none';
            profile_icon.style.background = "url('/images/profile_bw.png') no-repeat";
        }
    }
}