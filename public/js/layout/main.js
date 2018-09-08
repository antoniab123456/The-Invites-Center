
let login_main_button = document.querySelector('#login_main_button'),
    reg_exiting_acc_login = document.querySelector('#reg_exiting_acc_login'),
    login_modal = document.querySelector('#login_modal'),
    close_login_modal = document.querySelector('#close_login_modal'),
    suc_login_btn = document.querySelector('.suc_login_btn'),
    main_nav_bar = document.querySelector('#main_nav_bar'),
    index_container = document.querySelector('#index_container'),
    admin_home_main_container = document.querySelector('#admin_home_main_container'),
    notfound_main_container = document.querySelector('#notfound_main_container'),
    invitation_footer = document.querySelector('#invitation_footer'),
    pass_change_main_container = document.querySelector('#pass_change_main_container');
    
/* Make sure the elements that you blur are on the screen */ 
let setBlur = (el, blur) => { if(el){el.style.filter = `blur(${blur}px)`}};

let openLoginModal = () => {
    login_modal.style.display = 'block';
    main_nav_bar.style.filter = 'blur(5px)';
    invitation_footer.style.filter = 'blur(5px)';
    setBlur(admin_home_main_container, 5);
    setBlur(notfound_main_container, 5);
    setBlur(pass_change_main_container, 5);
    setBlur(index_container, 5);
    
}

if(login_main_button){
    login_main_button.onclick = () =>{ openLoginModal(); }
}

if(reg_exiting_acc_login){
    reg_exiting_acc_login.onclick = (e) =>{ openLoginModal(); e.preventDefault()}};

if(suc_login_btn){
    suc_login_btn.onclick = () =>{ openLoginModal();}
}

if(close_login_modal){
    close_login_modal.onclick = () =>{
        login_modal.style.display = 'none';
        main_nav_bar.style.filter = 'blur(0px)';
        invitation_footer.style.filter = 'blur(0px)';
        setBlur(admin_home_main_container, 0);
        setBlur(notfound_main_container, 0);
        setBlur(pass_change_main_container, 0);
        setBlur(index_container, 0);
    }
}

