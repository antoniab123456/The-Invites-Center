
let flash = () => {
    let err_modal = document.querySelectorAll('.err_modal'),
    success_modal = document.querySelectorAll('.success_modal'),
    home_main_container = document.querySelector('#home_main_container'),
    notfound_main_container = document.querySelector('#notfound_main_container'),
    pass_change_main_container = document.querySelector('#pass_change_main_container'),
    index_container = document.querySelector('#index_container'),
    profile_settings_modal = document.querySelector('#profile_settings_modal'),
    profile_icon = document.querySelector('#profile_icon');




    /* Make sure the elements that you blur are on the screen */ 
    let setBlur = (el, blur) => { if(el){el.style.filter = `blur(${blur}px)`}};

    /* Hide error/success models after they appear */
    if(err_modal){
        for(const err of err_modal){
            setTimeout(() => {
                err.style.display = 'none';
            }, 3000);
        }
    }

    for(const succ of success_modal){
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
                    setBlur(home_main_container, 0);
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
                    setBlur(home_main_container, 0);
                    setBlur(notfound_main_container, 0);
                    setBlur(pass_change_main_container, 0);
                    setBlur(index_container, 0);
                }    
            }
            if(e.target == profile_settings_modal){
                profile_settings_modal.style.display = 'none';
                if(profile_icon){
                    profile_icon.style.background = "url('/images/profile_bw.png') no-repeat";
                }
            }
        }
    }

}

module.exports = flash();